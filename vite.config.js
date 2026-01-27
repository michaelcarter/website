import { defineConfig } from 'vite'
import vitePluginPugStatic from '@macropygia/vite-plugin-pug-static'
import Sitemap from 'vite-plugin-sitemap'
import { glob } from 'glob'
import path from 'path'
import fs from 'fs'

const rootDir = import.meta.dirname
const pagesDir = path.resolve(rootDir, 'src/pages')
const pages = glob.sync('**/*.pug', {
  cwd: pagesDir,
  ignore: ['**/mixins/**'],
})

const input = {
  ...Object.fromEntries(
    pages.map((page) => {
      const name = page.replace('.pug', '') || 'index'
      return [name, path.resolve(pagesDir, page)]
    })
  ),
  main: path.resolve(rootDir, 'src/assets/styles/main.css'),
}

function devServerMiddleware() {
  return {
    name: 'dev-server-middleware',
    enforce: 'pre',
    configureServer(server) {
      // Serve CSS from src/assets/styles
      server.middlewares.use('/assets/styles', (req, res, next) => {
        const cssPath = path.join(rootDir, 'src/assets/styles', req.url)
        if (fs.existsSync(cssPath)) {
          res.setHeader('Content-Type', 'text/css')
          fs.createReadStream(cssPath).pipe(res)
        } else {
          next()
        }
      })

      // Clean URL rewriting - add .html to extensionless paths (pre-handler)
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0]
        if (url && !path.extname(url) && url !== '/' && !url.startsWith('/@')) {
          req.url = req.url.replace(url, `${url}.html`)
        }
        next()
      })
    },
  }
}

export default defineConfig({
  root: 'src/pages',
  publicDir: '../../public',
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
    rollupOptions: {
      input,
      output: {
        assetFileNames: 'assets/styles/[name][extname]',
      },
    },
  },
  plugins: [
    devServerMiddleware(),
    vitePluginPugStatic({
      buildOptions: { basedir: path.resolve(rootDir, 'src') },
      serveOptions: { basedir: path.resolve(rootDir, 'src') },
    }),
    Sitemap({
      hostname: 'https://mcarter.me',
      exclude: ['/404'],
    }),
  ],
  server: {
    port: 3000,
  },
  css: {
    devSourcemap: true,
  },
})
