import Parser from 'rss-parser';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { extractArticles, extractIssueMeta } from './lib/html-extractor.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA_DIR = join(ROOT, 'data');
const STATE_FILE = join(DATA_DIR, 'processed-issues.json');
const PENDING_DIR = join(DATA_DIR, 'pending');

const RSS_URL = 'https://sreweekly.com/feed/';

function loadState() {
  try {
    return JSON.parse(readFileSync(STATE_FILE, 'utf-8'));
  } catch {
    return { lastChecked: null, processedIssues: [] };
  }
}

function saveState(state) {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

async function fetchRSS() {
  const parser = new Parser({
    customFields: {
      item: ['content:encoded'],
    },
  });

  console.log(`Fetching RSS from ${RSS_URL}...`);
  const feed = await parser.parseURL(RSS_URL);
  console.log(`Found ${feed.items.length} items in feed`);
  return feed;
}

async function main() {
  const state = loadState();
  const feed = await fetchRSS();

  mkdirSync(PENDING_DIR, { recursive: true });

  let newCount = 0;

  for (const item of feed.items) {
    const meta = extractIssueMeta(item);

    if (!meta.issueNumber) {
      console.log(`Skipping item without issue number: ${meta.title}`);
      continue;
    }

    if (state.processedIssues.includes(meta.issueNumber)) {
      console.log(`Skipping already processed issue #${meta.issueNumber}`);
      continue;
    }

    const articles = extractArticles(meta.content);
    console.log(`Issue #${meta.issueNumber}: found ${articles.length} articles`);

    const issueData = {
      issueNumber: meta.issueNumber,
      title: meta.title,
      date: meta.date,
      url: meta.url,
      articles,
    };

    const outFile = join(PENDING_DIR, `issue-${meta.issueNumber}.json`);
    writeFileSync(outFile, JSON.stringify(issueData, null, 2));
    newCount++;
  }

  state.lastChecked = new Date().toISOString();
  saveState(state);

  console.log(`\nDone. ${newCount} new issue(s) written to ${PENDING_DIR}`);
  if (newCount === 0) {
    console.log('No new issues to process.');
  }
}

main().catch((err) => {
  console.error('Error fetching RSS:', err);
  process.exit(1);
});
