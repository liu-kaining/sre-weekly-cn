import { readFileSync, writeFileSync, readdirSync, mkdirSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { chatCompletion } from './lib/llm-client.mjs';
import { buildSystemPrompt, buildArticlePrompt } from './lib/prompts.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA_DIR = join(ROOT, 'data');
const PENDING_DIR = join(DATA_DIR, 'pending');
const STATE_FILE = join(DATA_DIR, 'processed-issues.json');
const ARTICLES_DIR = join(ROOT, 'src', 'content', 'articles');
const ISSUES_DIR = join(ROOT, 'src', 'content', 'issues');

// Process articles in batches to avoid token limits
const BATCH_SIZE = 5;

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

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

function generateArticleMarkdown(article, issueNumber, issueDate) {
  const frontmatter = {
    title: article.originalTitle || article.title,
    titleCn: article.titleCn,
    url: article.url,
    issueNumber,
    issueDate,
    category: article.category,
    tags: article.tags,
    score: article.score,
    summary: article.description || '',
    summaryCn: article.summaryCn,
    commentary: article.commentary,
    publishDate: issueDate,
  };

  const yaml = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}:\n${value.map((v) => `  - "${v}"`).join('\n')}`;
      }
      if (typeof value === 'number') {
        return `${key}: ${value}`;
      }
      // Escape quotes in strings
      const escaped = String(value).replace(/"/g, '\\"');
      return `${key}: "${escaped}"`;
    })
    .join('\n');

  return `---\n${yaml}\n---\n\n`;
}

function generateIssueMarkdown(issue, articleCount) {
  return `---
issueNumber: ${issue.issueNumber}
title: "${issue.title.replace(/"/g, '\\"')}"
date: "${issue.date}"
url: "${issue.url}"
articleCount: ${articleCount}
---

# ${issue.title}

本期共收录 ${articleCount} 篇文章。
`;
}

async function processIssue(issueFile) {
  const issueData = JSON.parse(readFileSync(issueFile, 'utf-8'));
  const { issueNumber, title, date, url, articles } = issueData;

  console.log(`\nProcessing Issue #${issueNumber}: ${title}`);
  console.log(`  ${articles.length} articles to process`);

  if (articles.length === 0) {
    console.log('  No articles found, skipping.');
    return { issueNumber, articleCount: 0 };
  }

  const systemPrompt = buildSystemPrompt();
  const processedArticles = [];

  // Process in batches
  for (let i = 0; i < articles.length; i += BATCH_SIZE) {
    const batch = articles.slice(i, i + BATCH_SIZE);
    console.log(`  Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(articles.length / BATCH_SIZE)}...`);

    try {
      const userPrompt = buildArticlePrompt(batch);
      const result = await chatCompletion([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ]);

      if (result.articles && Array.isArray(result.articles)) {
        // Merge original data with LLM results
        for (let j = 0; j < result.articles.length; j++) {
          const processed = result.articles[j];
          const original = batch[j];
          processedArticles.push({
            ...processed,
            url: original?.url || processed.url,
            title: original?.title || processed.originalTitle,
            description: original?.description || '',
          });
        }
      }
    } catch (err) {
      console.error(`  Batch failed: ${err.message}`);
      // Degradation: use original data with placeholder translations
      for (const article of batch) {
        processedArticles.push({
          originalTitle: article.title,
          titleCn: article.title, // Fallback to English
          url: article.url,
          summaryCn: article.description || '暂无摘要',
          commentary: '处理失败，请查看原文。',
          score: 5,
          category: 'misc',
          tags: ['sre'],
          description: article.description || '',
        });
      }
    }
  }

  // Write article markdown files
  mkdirSync(ARTICLES_DIR, { recursive: true });
  for (const article of processedArticles) {
    const slug = `issue-${issueNumber}-${slugify(article.originalTitle || article.title || 'untitled')}`;
    const filePath = join(ARTICLES_DIR, `${slug}.md`);
    const content = generateArticleMarkdown(article, issueNumber, date);
    writeFileSync(filePath, content);
  }

  // Write issue markdown file
  mkdirSync(ISSUES_DIR, { recursive: true });
  const issueContent = generateIssueMarkdown(issueData, processedArticles.length);
  writeFileSync(join(ISSUES_DIR, `issue-${issueNumber}.md`), issueContent);

  console.log(`  Written ${processedArticles.length} article files and 1 issue file`);
  return { issueNumber, articleCount: processedArticles.length };
}

async function main() {
  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY environment variable is required');
    process.exit(1);
  }

  mkdirSync(PENDING_DIR, { recursive: true });

  const pendingFiles = readdirSync(PENDING_DIR).filter((f) => f.endsWith('.json'));

  if (pendingFiles.length === 0) {
    console.log('No pending issues to process.');
    return;
  }

  console.log(`Found ${pendingFiles.length} pending issue(s)`);

  const state = loadState();

  for (const file of pendingFiles) {
    const filePath = join(PENDING_DIR, file);
    try {
      const result = await processIssue(filePath);
      state.processedIssues.push(result.issueNumber);
      saveState(state);
      // Remove processed file
      unlinkSync(filePath);
      console.log(`  Issue #${result.issueNumber} completed (${result.articleCount} articles)`);
    } catch (err) {
      console.error(`  Failed to process ${file}:`, err.message);
    }
  }

  console.log('\nAll done!');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
