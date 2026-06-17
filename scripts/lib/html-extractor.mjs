import * as cheerio from 'cheerio';

/**
 * Extract articles from SRE Weekly HTML content.
 * SRE Weekly uses div.sreweekly-entry structure with title links and descriptions.
 */
export function extractArticles(htmlContent) {
  const $ = cheerio.load(htmlContent);
  const articles = [];

  $('.sreweekly-entry').each((_, el) => {
    const $entry = $(el);
    const $titleLink = $entry.find('.sreweekly-title a').first();
    const url = $titleLink.attr('href');
    const title = $titleLink.text().trim();

    if (!url || !title) return;

    // Get description text
    const $desc = $entry.find('.sreweekly-description');
    const description = $desc.text().trim().replace(/\s+/g, ' ');

    // Get author if present (usually in <small> tag)
    const author = $desc.find('small').text().trim().replace(/^[—–-]\s*/, '');

    articles.push({
      title,
      url,
      description,
      author: author || undefined,
    });
  });

  // Fallback: try h2/h3 link-based structure
  if (articles.length === 0) {
    $('h2 a, h3 a').each((_, el) => {
      const $link = $(el);
      const url = $link.attr('href');
      const title = $link.text().trim();

      if (!url || !title) return;
      if (url.startsWith('#') || url.includes('sreweekly.com')) return;

      const $heading = $link.closest('h2, h3');
      let description = '';
      let $next = $heading.next();
      while ($next.length && !$next.is('h2, h3, hr')) {
        description += $next.text().trim() + ' ';
        $next = $next.next();
      }

      articles.push({
        title,
        url,
        description: description.trim(),
      });
    });
  }

  return articles;
}

/**
 * Extract issue metadata from RSS item
 */
export function extractIssueMeta(item) {
  const numberMatch = item.title?.match(/#(\d+)/);
  const issueNumber = numberMatch ? parseInt(numberMatch[1]) : null;

  return {
    issueNumber,
    title: item.title || '',
    date: item.isoDate || item.pubDate || new Date().toISOString(),
    url: item.link || '',
    content: item['content:encoded'] || item.content || '',
  };
}
