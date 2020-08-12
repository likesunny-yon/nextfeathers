import { getAllPublicPosts } from "lib/blog";

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const blogPostsXml = (blogPosts) => {
  let latestPost = 0;
  let postsXml = "";
  blogPosts.map((post) => {
    const postDate = Date.parse(post.updatedAt);
    if (!latestPost || postDate > latestPost) {
      latestPost = postDate;
    }

    const pDate = formatDate(postDate);

    const url = "https://deniapps.com/" + post.slug;
    postsXml += `
    <url>
      <loc>${url}</loc>
      <lastmod>${pDate}</lastmod>
      <priority>0.80</priority>
    </url>`;
  });
  const lDate = formatDate(latestPost);
  return {
    postsXml,
    lDate,
  };
};

const sitemapXml = (blogPosts) => {
  const { postsXml, lDate } = blogPostsXml(blogPosts);
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://deniapps.com</loc>
      <lastmod>${lDate}</lastmod>
      <priority>1.00</priority>
    </url>
    <url>
      <loc>https://deniapps.com/about</loc>
      <priority>0.5</priority>
    </url>
    ${postsXml}
  </urlset>`;
};

const Sitemap = () => {};

Sitemap.getInitialProps = async ({ res }) => {
  const blogPosts = await getAllPublicPosts();
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemapXml(blogPosts.data.data));
  res.end();
};

export default Sitemap;