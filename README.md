# dynamic

Dynamic content for website crawlers including LLMs, served as Cloudflare Pages Functions.

## What it does

This repository provides dynamically generated files for web crawlers and AI models. Because the files are generated at request time, URLs are always host-aware — the same codebase works correctly across multiple domains (e.g. `tsew.com`, `tsew.net`, `tsew.co.uk`) without any per-domain configuration.

| Endpoint | Content-Type | Purpose |
|---|---|---|
| `/robots.txt` | `text/plain` | Tells crawlers they are welcome and points them to the sitemap |
| `/sitemap.xml` | `application/xml` | Lists the canonical URLs for the site |
| `/llms.txt` | `text/markdown` | Structured overview of the site formatted for AI/LLM indexers |

## How it works on Cloudflare

The project uses **Cloudflare Pages Functions** — serverless JavaScript that runs at the edge on every Cloudflare data centre worldwide.

### File layout

```
functions/
  robots.txt.js     →  handles requests to /robots.txt
  sitemap.xml.js    →  handles requests to /sitemap.xml
  llms.txt.js       →  handles requests to /llms.txt
```

Each file exports a single `onRequest(context)` function. Cloudflare Pages automatically maps the file name to a URL path, so no routing configuration is needed.

### Host-aware URL generation

Every handler reads the host from the incoming request:

```js
const url = new URL(context.request.url);
const host = url.host; // e.g. "tsew.com"
```

This means the generated `robots.txt`, `sitemap.xml`, and `llms.txt` all contain fully-qualified URLs that match whichever domain the request arrived on.

### Caching

All responses include `Cache-Control: public, max-age=3600`, so Cloudflare's CDN caches each response for one hour before re-running the function.

## Deployment

1. Connect this repository to a **Cloudflare Pages** project.
2. No build command or output directory is required — the `functions/` directory is deployed automatically.
3. The functions will be live at `https://<your-domain>/<endpoint>` immediately after deployment.

## Customisation

Edit the content inside any of the `functions/*.js` files to update the pages, links, or metadata returned to crawlers. The host injection happens automatically at runtime, so no hardcoded domain names are needed.
