export async function onRequest(context) {
  const url = new URL(context.request.url);
  const origin = url.origin; // e.g., "https://tsew.com", "https://tsew.net", "https://tsew.co.uk"

  const robotsContent = `# Allow all web crawlers complete access
User-agent: *
Allow: /

# Sitemap location
Sitemap: ${origin}/sitemap.xml

# LLM metadata location
# ${origin}/llms.txt
`;

  return new Response(robotsContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}

