import { sortedPosts } from "@/app/data/writing";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/app/lib/site";

/**
 * RSS feed.
 *
 * Built from the same data as the pages, so a post can never appear in the feed
 * and be missing from the site. Dates are emitted as RFC 822 (`toUTCString`),
 * which is what an RSS reader expects — the human-readable format used in the
 * UI would silently break every client that parses it.
 */
export const dynamic = "force-static";

const escape = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function GET() {
  const posts = sortedPosts();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/writing/${post.slug}`;
      const published = new Date(`${post.date}T09:00:00Z`).toUTCString();
      return [
        "    <item>",
        `      <title>${escape(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${published}</pubDate>`,
        `      <description>${escape(post.summary)}</description>`,
        ...post.tags.map((tag) => `      <category>${escape(tag)}</category>`),
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escape(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
