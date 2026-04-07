export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve robots.txt
    if (url.pathname === '/robots.txt') {
      return new Response(
        `User-agent: *\nAllow: /\n\nSitemap: https://www.teamroping.ai/sitemap.xml\n`,
        { headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'public, max-age=86400' } }
      );
    }

    // Serve sitemap.xml
    if (url.pathname === '/sitemap.xml') {
      const today = new Date().toISOString().split('T')[0];
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.teamroping.ai/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.teamroping.ai/?filter=AZ</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.teamroping.ai/?filter=TX</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.teamroping.ai/?filter=NM</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.teamroping.ai/?filter=OK</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.teamroping.ai/?filter=NV</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.teamroping.ai/?filter=CA</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`,
        { headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' } }
      );
    }

    // Serve all other assets with cache headers
    const response = await env.ASSETS.fetch(request);
    const cached = new Response(response.body, response);
    cached.headers.set('Cache-Control', 'public, max-age=86400');
    cached.headers.set('X-Robots-Tag', 'index, follow');
    return cached;
  }
};
