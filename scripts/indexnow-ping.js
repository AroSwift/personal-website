/**
 * IndexNow ping: notifies Bing (and shared engines) of URL updates for faster indexing.
 * Run on deploy: npm run indexnow (e.g. in CI after a production deploy).
 *
 * @see https://www.indexnow.org/documentation
 */
import { baseUrl, getAllUrls } from './site-urls.js'

const KEY = 'indexnow0a1b2c3d4e5f6789abcdef012345'
const host = new URL(baseUrl).host

const body = {
  host,
  key: KEY,
  keyLocation: `${baseUrl}/${KEY}.txt`,
  urlList: getAllUrls(),
}

async function run() {
  try {
    const res = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    })
    console.log('IndexNow ping:', res.status, res.statusText)
  } catch (err) {
    console.warn('IndexNow ping failed (non-fatal):', err.message)
  }
}

run()
