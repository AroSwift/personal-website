/**
 * Build-time sitemap generator. Uses site-urls for routes and PDFs. Writes dist/sitemap.xml with ISO 8601 lastmod.
 * Run after vite build (see package.json "build" script).
 */
import { writeFileSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { baseUrl, routes, getPresentationEntries } from './site-urls.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const cwd = join(__dirname, '..')
const buildTime = new Date().toISOString().replace(/\.\d{3}Z$/, '+00:00')

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const urlParts = routes.map(
  (r) =>
    `  <url>
    <loc>${escapeXml(baseUrl + (r.path === '/' ? '/' : r.path))}</loc>
    <lastmod>${escapeXml(buildTime)}</lastmod>
    <changefreq>${escapeXml(r.changefreq)}</changefreq>
    <priority>${escapeXml(r.priority)}</priority>
  </url>`
)

for (const { url, fullPath } of getPresentationEntries()) {
  let lastmod = buildTime
  try {
    const m = statSync(fullPath).mtime
    lastmod = new Date(m).toISOString().replace(/\.\d{3}Z$/, '+00:00')
  } catch {
    /* use buildTime */
  }
  urlParts.push(
    `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
  </url>`
  )
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlParts.join('\n')}
</urlset>
`

const distPath = join(cwd, 'dist', 'sitemap.xml')
writeFileSync(distPath, xml, 'utf-8')
console.log('Wrote', distPath)
