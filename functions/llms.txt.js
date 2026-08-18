export async function onRequest(context) {
  // Get the host (e.g., "tsew.com", "tsew.net", or "tsew.co.uk") from the incoming request
  const url = new URL(context.request.url);
  const host = url.host;

  const markdownContent = `# TSEW

> Overview of TSEW services, documentation, and primary web resources formatted for AI models and web crawlers.

## Main Pages

- [Home](https://${host}/): Official homepage and general platform overview.
- [About Us](https://${host}/about): Information about TSEW, mission statement, and team details.
- [Services](https://${host}/services): Overview of primary services, offerings, and solutions.
- [Contact](https://${host}/contact): Contact channels, support options, and location details.

## Resources & Legal

- [Documentation](https://${host}/docs): Technical guides, FAQs, and developer documentation.
- [Privacy Policy](https://${host}/privacy): Data privacy terms and regulatory compliance disclosures.
- [Terms of Service](https://${host}/terms): Guidelines and legal terms governing the use of the site.
`;

  return new Response(markdownContent, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}

