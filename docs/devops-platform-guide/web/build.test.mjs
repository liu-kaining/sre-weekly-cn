import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { load } from 'cheerio';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(here);
const normalize = (value) => value.normalize('NFKC').replace(/\s+/g, '');

test('生成一份保留全部正文、可独立阅读的单页 HTML', async (t) => {
  const result = spawnSync(process.execPath, [path.join(here, 'build.mjs')], {
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, `页面生成失败：${result.stderr || result.stdout}`);
  const html = await fs.readFile(path.join(root, 'index.html'), 'utf8');
  const $ = load(html);

  await t.test('全部源文档的段落、表格单元格、代码和标题均保留', async () => {
    const files = (await fs.readdir(root)).filter((file) => file.endsWith('.md'));
    assert.equal(files.length, 15);
    assert.equal($('article.chapter').length, 15);
    const processor = await createMarkdownProcessor({ syntaxHighlight: false });
    for (const file of files) {
      const source = await fs.readFile(path.join(root, file), 'utf8');
      const rendered = load((await processor.render(source)).code);
      const article = $(`article[data-source="${file}"]`);
      assert.equal(article.length, 1, `缺失章节 ${file}`);
      const actual = normalize(article.text());
      rendered('p, td, th, pre, h1, h2, h3, h4').each((_, element) => {
        const expected = normalize(rendered(element).text());
        assert.ok(actual.includes(expected), `${file} 遗漏正文：${expected.slice(0, 100)}`);
      });
    }
  });

  await t.test('原文交叉链接均指向存在且唯一的页面锚点', () => {
    const seen = new Set();
    $('[id]').each((_, element) => {
      const id = $(element).attr('id');
      assert.ok(!seen.has(id), `重复锚点 ${id}`);
      seen.add(id);
    });
    $('a[href^="#"]').each((_, element) => {
      const href = decodeURIComponent($(element).attr('href').slice(1));
      assert.ok(href && seen.has(href), `无效锚点 ${href}`);
    });
    $('article a[href]').each((_, element) => {
      const href = $(element).attr('href');
      assert.ok(/^https?:/.test(href) || !/\.md(?:#|$)/.test(href), `原文链接未转为页内链接：${href}`);
    });
  });

  await t.test('正文、样式和图示不需要网络或旁边的资源文件', () => {
    assert.equal($('script[src], link[rel="stylesheet"], img[src], iframe').length, 0);
    assert.ok($('style').text().length > 1000);
    assert.ok($('script:not([type="application/json"])').text().length > 1000);
    assert.ok($('article svg[role="img"]').length >= 3);
    assert.ok(!/@import|url\(\s*["']?https?:/i.test($('style').text()));
    assert.equal($('article[hidden]').length, 0);
  });

  await t.test('搜索包含章内正文与可定位的目标，而不止章节名', () => {
    const index = JSON.parse($('#search-index').text());
    assert.ok(index.length > 100);
    const match = index.find((entry) => entry.text.includes('创建响应丢失'));
    assert.ok(match, '遗漏平台后端故障处理正文');
    assert.equal($(`[id="${match.id}"]`).length, 1);
    assert.ok(index.some((entry) => entry.text.includes('1000')));
  });
});
