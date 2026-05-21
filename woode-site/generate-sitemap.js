import fs from "fs";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "1zhhp7qc",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-02-09",
});

const SITE_URL = "https://woode.studiojemd.com";

async function generateSitemap() {
  try {
    const staticPages = ["", "/contact", "/privacy-policy"];

    const categories = ["living", "dining", "bedroom", "collections"];

    const query = `*[_type == "product" && defined(slug.current)]{
      "slug": slug.current,
      _updatedAt
    }`;
    const products = await client.fetch(query);

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    staticPages.forEach((page) => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${SITE_URL}${page}</loc>\n`;
      sitemap += `    <changefreq>monthly</changefreq>\n`;
      sitemap += `  </url>\n`;
    });

    products.forEach((product) => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${SITE_URL}/product-page.html?slug=${product.slug}</loc>\n`;
      sitemap += `    <lastmod>${product._updatedAt.split("T")[0]}</lastmod>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `  </url>\n`;
    });

    categories.forEach((categorySlug) => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${SITE_URL}/product-categories.html?category=${categorySlug}</loc>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `  </url>\n`;
    });

    sitemap += `</urlset>`;

    fs.writeFileSync("./public/sitemap.xml", sitemap);
    console.log("Sitemap generated successfully!");
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }
}

generateSitemap();
