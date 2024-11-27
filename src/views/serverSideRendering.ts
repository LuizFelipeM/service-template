import fs from 'node:fs/promises'
import { Express } from 'express'
import { ViteDevServer } from 'vite'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const base = process.env.BASE || '/'

export const serverSideRendering = async (app: Express) => {
  // Cached production assets
  const templateHtml = isProduction
    ? await fs.readFile('./dist/client/index.html', 'utf-8')
    : ''
  const ssrManifest = isProduction
    ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
    : undefined

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

      let template: string
      let render: any
      if (!isProduction) {
        // Always read fresh template in development
        template = await fs.readFile('./src/views/index.html', 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/views/entry-server.tsx')).render
      } else {
        template = templateHtml
        // @ts-ignore
        render = (await import('./dist/server/entry-server.js')).render
      }

      const rendered = await render(url, ssrManifest)

      const html = template
        .replace(`<!--app-head-->`, rendered.head ?? '')
        .replace(`<!--app-html-->`, rendered.html ?? '')

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
    } catch (e) {
      if (e instanceof Error) {
        vite?.ssrFixStacktrace(e)
        console.log(e.stack)
        res.status(500).end(e.stack)
      }
    }
  })
}
