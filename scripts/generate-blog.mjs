// Vystra blog + sitemap generator
// Reads Markdown posts from content/blog/*.md and writes fully static, crawlable
// HTML pages into public/blog/, plus public/blog/index.html, public/rss.xml and
// a regenerated public/sitemap.xml. Only posts whose `date` is today or earlier
// are published — future-dated posts go live automatically when their day arrives.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { marked } from 'marked'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SITE = 'https://vystra.in'
const CONTENT_DIR = path.join(ROOT, 'content', 'blog')
const PUBLIC_DIR = path.join(ROOT, 'public')
const BLOG_OUT = path.join(PUBLIC_DIR, 'blog')

const BRAND = {
  name: 'Vystra',
  email: 'admin@vystra.in',
  logo: `${SITE}/favicon.svg`,
}

marked.setOptions({ mangle: false, headerIds: true })

function esc(s = '') {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
}

const STYLE = `
:root{--bg:#08090e;--card:#101119;--border:#1a1c28;--text:#edeef2;--muted:#8a8d9e;--gold:#d4a853}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans',system-ui,sans-serif;background:var(--bg);color:var(--text);line-height:1.75;-webkit-font-smoothing:antialiased}
a{color:var(--gold);text-decoration:none}
a:hover{text-decoration:underline}
.wrap{width:min(760px,90vw);margin:0 auto;padding:48px 0 96px}
.topnav{display:flex;align-items:center;justify-content:space-between;padding:20px 0;border-bottom:1px solid var(--border);margin-bottom:48px}
.logo{display:flex;align-items:center;gap:10px;font-weight:800;font-size:20px;color:var(--text)}
.logo:hover{text-decoration:none}
.mark{display:grid;place-items:center;width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,#f0d08a,#c79a45);color:#0b0c12;font-family:Georgia,serif;font-weight:700}
.eyebrow{color:var(--gold);font-size:13px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700}
h1{font-size:clamp(1.9rem,4.5vw,2.9rem);line-height:1.15;font-weight:800;margin:14px 0 16px}
h2{font-size:1.5rem;font-weight:700;margin:40px 0 12px}
h3{font-size:1.2rem;font-weight:700;margin:28px 0 10px}
p,ul,ol{color:#c9cbd6;margin:0 0 18px}
ul,ol{padding-left:22px}
li{margin-bottom:8px}
strong{color:var(--text)}
.meta{color:var(--muted);font-size:14px;margin-bottom:8px}
hr{border:none;border-top:1px solid var(--border);margin:36px 0}
.card{display:block;background:var(--card);border:1px solid var(--border);border-radius:16px;padding:24px 26px;margin-bottom:16px;transition:border-color .2s}
.card:hover{border-color:var(--gold);text-decoration:none}
.card h2{margin:0 0 8px;font-size:1.35rem;color:var(--text)}
.card p{margin:0 0 10px;color:var(--muted);font-size:.98rem}
.tag{display:inline-block;font-size:12px;color:var(--gold);border:1px solid var(--border);border-radius:999px;padding:3px 10px;margin:2px 6px 2px 0}
.back{display:inline-block;margin-bottom:24px;font-size:14px}
.cta{margin-top:48px;padding:28px;border:1px solid var(--border);border-radius:16px;background:radial-gradient(120% 140% at 100% 0,rgba(212,168,83,.12),transparent)}
.btn{display:inline-block;background:linear-gradient(135deg,#f0d08a,#c79a45);color:#0b0c12;font-weight:700;padding:12px 22px;border-radius:10px;margin-top:12px}
.btn:hover{text-decoration:none;opacity:.92}
.footer{border-top:1px solid var(--border);margin-top:64px;padding-top:24px;color:var(--muted);font-size:14px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px}
`

function pageShell({ title, description, canonical, jsonld, body }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#08090E" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${SITE}/og.png" />
  <meta property="og:site_name" content="Vystra" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${SITE}/og.png" />
  <link rel="alternate" type="application/rss+xml" title="Vystra Blog" href="${SITE}/rss.xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>${STYLE}</style>
  ${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>
<body>
  <div class="wrap">
    <nav class="topnav">
      <a class="logo" href="/"><span class="mark">V</span> Vystra</a>
      <a href="/blog/">All articles</a>
    </nav>
    ${body}
    <div class="footer">
      <span>© ${new Date().getFullYear()} Vystra. All rights reserved.</span>
      <span><a href="/">Home</a> · <a href="/#contact">Start a project</a> · <a href="mailto:${BRAND.email}">${BRAND.email}</a></span>
    </div>
  </div>
</body>
</html>`
}

function loadPosts() {
  if (!fs.existsSync(CONTENT_DIR)) return []
  const now = new Date()
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')
      const { data, content } = matter(raw)
      const slug = data.slug || file.replace(/\.md$/, '')
      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date || new Date().toISOString().slice(0, 10),
        updated: data.updated || data.date,
        author: data.author || 'Vystra',
        tags: data.tags || [],
        cover: data.cover || '/og.png',
        html: marked.parse(content),
        url: `${SITE}/blog/${slug}/`,
      }
    })
    .filter((p) => new Date(p.date) <= now) // future-dated posts stay unpublished
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

function renderPost(p) {
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    image: `${SITE}${p.cover}`,
    datePublished: new Date(p.date).toISOString(),
    dateModified: new Date(p.updated || p.date).toISOString(),
    author: { '@type': 'Person', name: p.author },
    publisher: { '@type': 'Organization', name: BRAND.name, logo: { '@type': 'ImageObject', url: BRAND.logo } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': p.url },
    keywords: (p.tags || []).join(', '),
  }
  const body = `
    <a class="back" href="/blog/">← All articles</a>
    <article>
      <span class="eyebrow">Vystra Journal</span>
      <h1>${esc(p.title)}</h1>
      <p class="meta">By ${esc(p.author)} · ${fmtDate(p.date)}</p>
      <div>${(p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      <hr />
      ${p.html}
    </article>
    <div class="cta">
      <span class="eyebrow">Work with us</span>
      <h2 style="margin-top:6px">Need a website that actually sells?</h2>
      <p>Vystra builds high-converting websites, apps and SaaS products for ambitious brands — shipped in weeks, fixed pricing.</p>
      <a class="btn" href="/#contact">Start a project →</a>
    </div>`
  return pageShell({ title: `${p.title} — Vystra`, description: p.description, canonical: p.url, jsonld, body })
}

function renderIndex(posts) {
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Vystra Journal',
    url: `${SITE}/blog/`,
    description: 'Practical guides on web design, conversion, SEO and building digital products that grow revenue.',
    publisher: { '@type': 'Organization', name: BRAND.name, logo: { '@type': 'ImageObject', url: BRAND.logo } },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: p.url,
      image: `${SITE}${p.cover}`,
      datePublished: new Date(p.date).toISOString(),
      author: { '@type': 'Person', name: p.author },
    })),
  }
  const body = `
    <a class="back" href="/">← Back to Vystra</a>
    <span class="eyebrow">Vystra Journal</span>
    <h1>Ideas on web design, conversion &amp; growth</h1>
    <p class="meta">Practical, no-fluff guides from the studio — on building websites and products that print revenue.</p>
    <hr />
    ${posts
      .map(
        (p) => `<a class="card" href="/blog/${p.slug}/">
      <h2>${esc(p.title)}</h2>
      <p>${esc(p.description)}</p>
      <span class="meta">${fmtDate(p.date)} · ${esc(p.author)}</span>
    </a>`,
      )
      .join('\n')}`
  return pageShell({
    title: 'Vystra Journal — Web Design, Conversion & Growth Guides',
    description: 'Practical guides on web design, conversion optimization, SEO and building digital products that grow revenue — from the Vystra studio.',
    canonical: `${SITE}/blog/`,
    jsonld,
    body,
  })
}

function renderRss(posts) {
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${p.url}</link>
      <guid>${p.url}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>Vystra Journal</title>
  <link>${SITE}/blog/</link>
  <description>Web design, conversion and growth guides from Vystra.</description>
  <language>en</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
</channel></rss>`
}

function renderSitemap(posts) {
  const today = new Date().toISOString().slice(0, 10)
  const staticUrls = [
    { loc: `${SITE}/`, changefreq: 'weekly', priority: '1.0', img: `${SITE}/og.png` },
    { loc: `${SITE}/blog/`, changefreq: 'daily', priority: '0.8' },
    { loc: `${SITE}/privacy.html`, changefreq: 'yearly', priority: '0.3' },
  ]
  const urls = [
    ...staticUrls.map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${
        u.img
          ? `
    <image:image><image:loc>${u.img}</image:loc><image:title>Vystra - Digital product studio</image:title></image:image>`
          : ''
      }
  </url>`,
    ),
    ...posts.map(
      (p) => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${new Date(p.updated || p.date).toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`,
    ),
  ]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>`
}

function main() {
  const posts = loadPosts()
  fs.mkdirSync(BLOG_OUT, { recursive: true })

  // Per-post pages at /blog/<slug>/index.html for clean URLs
  for (const p of posts) {
    const dir = path.join(BLOG_OUT, p.slug)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'index.html'), renderPost(p))
  }

  fs.writeFileSync(path.join(BLOG_OUT, 'index.html'), renderIndex(posts))
  fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), renderRss(posts))
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), renderSitemap(posts))

  console.log(`[blog] Generated ${posts.length} post(s), blog index, rss.xml and sitemap.xml`)
}

main()
