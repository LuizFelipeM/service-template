import fs from 'node:fs/promises'
import { Express } from 'express'
import { Transform } from 'node:stream'
import { ViteDevServer } from 'vite'

// Constants
const isProduction = process.env.NODE_ENV === 'production'

const base = process.env.BASE || '/'
const ABORT_DELAY = 10000

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''
const ssrManifest = isProduction
  ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
  : undefined

export const ssrServer = async (app: Express) => {
  // Add Vite or respective production middlewares
  let vite: ViteDevServer
  if (!isProduction) {
    const { createServer } = await import('vite')
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
    })
    app.use(vite.middlewares)
  } else {
    const compression = (await import('compression')).default
    const sirv = (await import('sirv')).default
    app.use(compression())
    app.use(base, sirv('./dist/client', { extensions: [] }))
  }

  // Serve HTML
  app.use('*all', async (req, res) => {
    try {
      const url = req.originalUrl.replace(base, '')

      let template
      let render
      if (!isProduction) {
        // Always read fresh template in development
        template = await fs.readFile('./index.html', 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/views/entry-server.tsx')).render
      } else {
        template = templateHtml
        // @ts-ignore
        render = (await import('../dist/server/views/entry-server.js') as Record<string, any>).render
      }

      let didError = false

      const { pipe, abort } = render(url, ssrManifest, {
        onShellError() {
          res.status(500)
          res.set({ 'Content-Type': 'text/html' })
          res.send('<h1>Something went wrong</h1>')
        },
        onShellReady() {
          res.status(didError ? 500 : 200)
          res.set({ 'Content-Type': 'text/html' })

          const transformStream = new Transform({
            transform(chunk, encoding, callback) {
              res.write(chunk, encoding)
              callback()
            },
          })

          const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`)

          res.write(htmlStart)

          transformStream.on('finish', () => {
            res.end(htmlEnd)
          })

          pipe(transformStream)
        },
        onError(error: any) {
          didError = true
          console.error(error)
        },
      })

      setTimeout(() => {
        abort()
      }, ABORT_DELAY)
    } catch (e) {
      if (e instanceof Error) {
        vite?.ssrFixStacktrace(e)
        console.log(e.stack)
        res.status(500).end(e.stack)
      }
    }
  })
}
