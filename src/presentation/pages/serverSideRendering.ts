import fs from 'node:fs/promises'
import { Express } from 'express'
import { ViteDevServer } from 'vite'
import { isProduction } from '../../shared/contants'

// Constants
const base = process.env.BASE || '/'

export const pageRender = async (app: Express) => {
  // Cached production assets
  const ssrManifest = isProduction
    ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
    : undefined

  // Add Vite or respective production middlewares
  const vite = await setMiddlewares(app)

  // Serve HTML
  app.use('*all', async (req, res) => {
    try {
      const url = req.originalUrl.replace(base, '')

      const { template, render } = await getTemplateAndRender(vite, url)

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

async function getTemplateAndRender(vite: ViteDevServer, url: string): Promise<{ template: string, render: any }> {
  if (!isProduction) {
    // Always read fresh template in development
    const index = await fs.readFile('./src/presentation/pages/index.html', 'utf-8')
    const template = await vite.transformIndexHtml(url, index)
    const render = (await vite.ssrLoadModule('/src/presentation/pages/entry-server.tsx')).render
    return { template, render }
  } else {
    // Cached production assets
    const template = isProduction
      ? await fs.readFile('./dist/client/index.html', 'utf-8')
      : ''
    return {
      template,
      // @ts-ignore
      render: (await import('./dist/server/entry-server.js')).render
    }
  }
}

async function setMiddlewares(app: Express): Promise<ViteDevServer | undefined> {
  if (!isProduction) {
    const { createServer } = await import('vite')
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
    })
    app.use(vite.middlewares)
    return vite
  } else {
    const compression = (await import('compression')).default
    const sirv = (await import('sirv')).default
    app.use(compression())
    app.use(base, sirv('./dist/client', { extensions: [] }))
  }
}