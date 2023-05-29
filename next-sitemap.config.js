/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://sunys.co.kr/",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 1,
  exclude: [
    "/magazine/**",
    "/account/**",
    "brandform/**",
    "/server-sitemap.xml",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/magazine", "/account", "/brandform"],
      },
    ],
    additionalSitemaps: ["https://sunys.co.kr/server-sitemap.xml"],
  },
};
