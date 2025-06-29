/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://newsarkariresult.co.in',
  generateRobotsTxt: true,  // Also creates robots.txt
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin', '/api/*', '/dashboard'],
};
