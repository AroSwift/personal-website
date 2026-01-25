/**
 * Single source of truth for indexable site URLs. Used by generate-sitemap.js and indexnow-ping.js.
 */
import { readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const cwd = join(__dirname, '..')

export const baseUrl = 'https://aaronbarlow.dev'

export const routes = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/projects', changefreq: 'weekly', priority: '0.9' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
]

const presDir = join(cwd, 'public', 'presentations')

/**
 * Returns { url, fullPath } for each PDF in public/presentations. fullPath is for stat()/lastmod.
 */
export function getPresentationEntries() {
  try {
    return readdirSync(presDir)
      .filter((f) => f.endsWith('.pdf'))
      .map((f) => ({
        url: `${baseUrl}/presentations/${f}`,
        fullPath: join(presDir, f),
      }))
  } catch {
    return []
  }
}

/** Absolute URLs for presentation PDFs. */
export function getPresentationUrls() {
  return getPresentationEntries().map((e) => e.url)
}

/**
 * All indexable URLs (page routes + presentation PDFs). For IndexNow urlList.
 */
export function getAllUrls() {
  const fromRoutes = routes.map((r) =>
    r.path === '/' ? `${baseUrl}/` : `${baseUrl}${r.path}`
  )
  return [...fromRoutes, ...getPresentationUrls()]
}
