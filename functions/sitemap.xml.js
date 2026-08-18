export async function onRequest(context) {
  const url = new URL(context.request.url);
  const origin = url.origin;

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Homepage -->
  <url>
    <loc>${origin}/</loc>
    <lastmod>2026-08-18</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- LLMs Text Metadata File -->
  <url>
    <loc>${origin}/llms.txt</loc>
    <lastmod>2026-08-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}

