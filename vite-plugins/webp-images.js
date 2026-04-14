import { globSync } from 'glob'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const PASSTHROUGH = new Set(['.svg', '.webp'])
const RASTER = new Set(['.png', '.jpg', '.jpeg'])
const ANIMATED = new Set(['.gif'])
const ALL_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']

export default function webpImages({
  srcDir,
  urlPrefix = 'assets/images',
  quality = 70,
  cacheDir,
}) {
  fs.mkdirSync(cacheDir, { recursive: true })
  const manifestPath = path.join(cacheDir, 'manifest.json')
  const manifest = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    : {}

  const encodeToWebp = async (absPath) => {
    const buf = fs.readFileSync(absPath)
    const hash = crypto.createHash('md5').update(buf).digest('hex')
    const cached = path.join(cacheDir, `${hash}.webp`)
    if (fs.existsSync(cached)) return fs.readFileSync(cached)

    const ext = path.extname(absPath).toLowerCase()
    const pipeline = ANIMATED.has(ext)
      ? sharp(buf, { animated: true })
      : sharp(buf)
    const out = await pipeline.webp({ quality }).toBuffer()

    fs.writeFileSync(cached, out)
    manifest[absPath] = hash
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
    return out
  }

  const outputFileName = (relPath) => {
    const ext = path.extname(relPath).toLowerCase()
    if (PASSTHROUGH.has(ext)) return `${urlPrefix}/${relPath}`
    return `${urlPrefix}/${relPath.slice(0, -ext.length)}.webp`
  }

  const findSourceForWebp = (relWithoutExt) => {
    for (const ext of ['.png', '.jpg', '.jpeg', '.gif']) {
      const abs = path.join(srcDir, `${relWithoutExt}${ext}`)
      if (fs.existsSync(abs)) return abs
    }
    return null
  }

  let isBuild = false

  return {
    name: 'webp-images',
    configResolved(config) {
      isBuild = config.command === 'build'
    },
    async buildStart() {
      if (!isBuild) return
      const pattern = `**/*{${ALL_EXTS.join(',')}}`
      const files = globSync(pattern, { cwd: srcDir, nodir: true })
      for (const rel of files) {
        const abs = path.join(srcDir, rel)
        const ext = path.extname(rel).toLowerCase()
        const source = PASSTHROUGH.has(ext)
          ? fs.readFileSync(abs)
          : await encodeToWebp(abs)
        this.emitFile({
          type: 'asset',
          fileName: outputFileName(rel),
          source,
        })
      }
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0]
        if (!url || !url.startsWith(`/${urlPrefix}/`)) return next()

        const rel = url.slice(urlPrefix.length + 2)
        const ext = path.extname(rel).toLowerCase()

        if (ext === '.svg') {
          const abs = path.join(srcDir, rel)
          if (!fs.existsSync(abs)) return next()
          res.setHeader('Content-Type', 'image/svg+xml')
          return fs.createReadStream(abs).pipe(res)
        }

        if (ext !== '.webp') return next()

        const direct = path.join(srcDir, rel)
        if (fs.existsSync(direct)) {
          res.setHeader('Content-Type', 'image/webp')
          return fs.createReadStream(direct).pipe(res)
        }

        const abs = findSourceForWebp(rel.slice(0, -'.webp'.length))
        if (!abs) return next()

        try {
          const buf = await encodeToWebp(abs)
          res.setHeader('Content-Type', 'image/webp')
          res.end(buf)
        } catch (err) {
          next(err)
        }
      })
    },
  }
}
