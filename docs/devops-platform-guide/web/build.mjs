import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(here);
const chapters = [
  ['README.md', '阅读入口', '先建立坐标', 'start'],
  ['01-lifecycle-map.md', '全流程与职责', '从需求到运行的十个阶段', 'start'],
  ['02-requirements-and-design.md', '需求与技术设计', '让需求可开发、可验证', 'start'],
  ['03-development-and-collaboration.md', '开发与代码协作', '代码、评审与事件', 'start'],
  ['04-continuous-integration.md', 'CI · 持续集成', '把变更变成可信结果', 'delivery'],
  ['05-artifacts-and-supply-chain.md', '制品与供应链', '给交付物一个确定身份', 'delivery'],
  ['06-testing-and-acceptance.md', '测试与验收', '把正确性变成证据', 'delivery'],
  ['07-continuous-delivery.md', 'CD · 交付与部署', '让期望状态落到环境', 'delivery'],
  ['08-production-release.md', '生产发布与验证', '控制流量，也控制风险', 'delivery'],
  ['09-runtime-and-reliability.md', '运行态与可靠性', '以用户体验判断健康', 'delivery'],
  ['10-feedback-and-metrics.md', '反馈与效能度量', '找到值得改进的瓶颈', 'platform'],
  ['11-platform-backend-engineering.md', '平台后端怎样开发', '把流程做成可靠的软件', 'platform'],
  ['12-learning-and-interview.md', '转岗路线与面试', '把经验迁移到新领域', 'practice'],
  ['13-case-study-and-lab.md', '案例与实操任务书', '亲手走完一次交付', 'practice'],
  ['14-glossary-and-resources.md', '术语与官方资料', '随时查阅，继续深入', 'practice'],
].map(([file, label, description, group], index) => ({
  file, label, description, group,
  number: String(index).padStart(2, '0'),
  id: `chapter-${String(index).padStart(2, '0')}`,
  key: [4, 5, 7, 8, 9, 11].includes(index),
}));

const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);
const json = (value) => JSON.stringify(value).replace(/</g, '\\u003c');
const linkMap = new Map(chapters.map((chapter) => [chapter.file, chapter.id]));
const processor = await createMarkdownProcessor({
  syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid', 'text', 'http'] },
  shikiConfig: { theme: 'github-dark', wrap: false },
});

function node(x, y, width, label, accent = false) {
  const lines = label.split('|');
  return `<g class="diagram-node${accent ? ' diagram-node-accent' : ''}">
    <rect x="${x}" y="${y}" width="${width}" height="52" rx="9"/>
    <text x="${x + width / 2}" y="${y + (lines.length > 1 ? 21 : 31)}" text-anchor="middle">${lines.map((line, i) => `<tspan x="${x + width / 2}" dy="${i ? 18 : 0}">${escape(line)}</tspan>`).join('')}</text>
  </g>`;
}

function diagram(kind, prefix) {
  const marker = `${prefix}-arrow`;
  const edge = (d, dashed = false) => `<path d="${d}" class="diagram-edge${dashed ? ' diagram-feedback' : ''}" marker-end="url(#${marker})"/>`;
  const label = (x, y, text) => `<text x="${x}" y="${y}" class="diagram-label" text-anchor="middle">${escape(text)}</text>`;
  let body = '', dimensions = '', title = '';
  if (kind === 'lifecycle') {
    title = '从需求到运行的交付闭环';
    dimensions = '0 0 960 355';
    const labels = ['需求承接', '技术设计', '开发与协作', 'CI 验证', '制品管理', '测试与验收', 'CD 交付与部署', '生产发布与验证', '运行态保障', '反馈与效能改进'];
    for (let i = 0; i < 10; i++) {
      const col = i < 5 ? i : 9 - i;
      const x = 40 + col * 180, y = i < 5 ? 65 : 220;
      body += node(x, y, 155, `${String(i + 1).padStart(2, '0')}  ${labels[i]}`, [3, 4, 6, 7, 8].includes(i));
      if (i < 4) body += edge(`M ${x + 155} ${y + 26} H ${x + 177}`);
      if (i > 4 && i < 9) body += edge(`M ${x} ${y + 26} H ${x - 22}`);
    }
    body += edge('M 837 117 V 216');
    body += edge('M 40 246 H 16 V 91 H 36', true);
    body += edge('M 837 220 V 163 H 477 V 121', true);
    body += edge('M 297 272 V 313 H 477 V 276', true);
    body += label(620, 153, '发现缺陷，回到开发');
    body += label(387, 336, '发布异常，回到发布控制');
    body += label(480, 28, '验证 → 交付 → 生产 → 反馈');
  } else if (kind === 'ci') {
    title = '一次 CI 的完整执行与门禁';
    dimensions = '0 0 740 770';
    const labels = [
      'push / MR / 手动触发',
      '校验身份、去重、锁定 commit',
      '解析并固定流水线版本',
      '进入队列，选择执行资源',
      '拉取代码与依赖',
      '编译、单元测试、静态检查',
      '集成测试与约定的安全检查',
      '汇总结果、上传报告',
    ];
    labels.forEach((text, i) => {
      const y = 24 + i * 70;
      body += node(210, y, 320, text, [1, 5, 6].includes(i));
      if (i < 7) body += edge(`M 370 ${y + 52} V ${y + 67}`);
    });
    body += edge('M 370 566 V 590');
    body += '<path d="M370 593 L468 632 L370 671 L272 632 Z" class="diagram-decision"/>';
    body += label(370, 637, '满足门禁？');
    body += edge('M 272 632 H 165 V 706');
    body += edge('M 468 632 H 575 V 706');
    body += label(210, 620, '否');
    body += label(525, 620, '是');
    body += node(25, 710, 280, '反馈失败并阻断后续交付');
    body += node(435, 710, 280, '允许生成或登记候选制品', true);
  } else {
    title = '平台后端的 API、异步执行与对账';
    dimensions = '0 0 940 790';
    body += node(335, 20, 270, '开发者 / 平台页面 / CLI');
    body += edge('M 470 72 V 108');
    body += node(335, 112, 270, '平台 API：身份、权限、校验', true);
    body += edge('M 335 138 H 170 V 206');
    body += node(50, 210, 240, '关系数据库|领域对象与操作记录', true);
    body += edge('M 170 262 V 296');
    body += node(50, 300, 240, 'Outbox 投递');
    body += edge('M 170 352 V 386');
    body += node(50, 390, 240, '任务队列');
    body += edge('M 290 416 H 331');
    body += node(335, 390, 270, 'Worker / 工作流推进', true);
    body += edge('M 470 442 V 486');
    body += node(335, 490, 270, '适配器');
    body += edge('M 605 416 H 670 V 236 H 294', true);
    body += label(565, 225, '执行进度');
    const children = [[30, 'Jenkins / GitLab CI'], [255, '制品仓库'], [480, 'Kubernetes / Argo CD'], [705, '监控与告警系统']];
    children.forEach(([x, text]) => {
      body += edge(`M 470 542 V 572 H ${x + 100} V 606`);
      body += node(x, 610, 200, text);
    });
    body += node(200, 720, 440, '回调接收与周期对账', true);
    body += edge('M 130 662 V 746 H 196');
    body += edge('M 580 662 V 716');
    body += edge('M 200 746 H 15 V 236 H 46', true);
  }
  return `<figure class="diagram-figure">
    <div class="diagram-scroll" tabindex="0" role="region" aria-label="${title}">
      <svg viewBox="${dimensions}" role="img" aria-labelledby="${prefix}-title" xmlns="http://www.w3.org/2000/svg">
        <title id="${prefix}-title">${title}</title>
        <defs><marker id="${marker}" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7" fill="var(--diagram-line)"/></marker></defs>
        ${body}
      </svg>
    </div>
    <figcaption>${title}<span class="mobile-hint"> · 可横向滑动</span></figcaption>
  </figure>`;
}

const articles = [];
const search = [];
let totalCharacters = 0;
for (const chapter of chapters) {
  const source = await fs.readFile(path.join(root, chapter.file), 'utf8');
  totalCharacters += source.length;
  const $ = load((await processor.render(source)).code, null, false);
  chapter.title = $('h1').first().text();
  $('h1').first().remove();
  chapter.headings = [];
  $('h2, h3, h4, h5, h6').each((index, element) => {
    const heading = $(element);
    const level = Number(element.tagName.slice(1));
    const title = heading.text();
    const id = `${chapter.id}-${heading.attr('id') || `section-${index}`}`;
    heading.attr('id', id);
    element.tagName = `h${Math.min(level + 1, 6)}`;
    if (level === 2) chapter.headings.push({ id, text: title.replace(/^\d+[.．]\s*/, '') });
    heading.append(`<a class="heading-anchor" href="#${id}" aria-label="定位到${escape(title)}">#</a>`);
  });
  $('a[href]').each((_, element) => {
    const anchor = $(element), href = anchor.attr('href');
    if (anchor.hasClass('heading-anchor')) return;
    if (/^https?:\/\//.test(href)) anchor.attr({ target: '_blank', rel: 'noopener noreferrer' });
    else if (href === 'index.html') anchor.attr('href', '#top');
    else {
      const [file, fragment] = href.split('#');
      if (linkMap.has(file)) anchor.attr('href', `#${linkMap.get(file)}${fragment ? `-${fragment}` : ''}`);
      else if (href.startsWith('#')) anchor.attr('href', `#${chapter.id}-${href.slice(1)}`);
    }
  });
  $('table').each((index, element) => {
    $(element).wrap(`<div class="table-scroll" role="region" tabindex="0" aria-label="${escape(chapter.label)}：表格 ${index + 1}"></div>`);
  });
  $('pre').each((index, element) => {
    const pre = $(element);
    const code = pre.find('code');
    const language = pre.attr('data-language') || (code.attr('class') || '').match(/language-([\w-]+)/)?.[1] || 'text';
    if (language === 'mermaid') {
      const kind = chapter.number === '01' ? 'lifecycle' : chapter.number === '04' ? 'ci' : 'architecture';
      pre.wrap('<details class="diagram-source"></details>');
      const details = pre.parent();
      details.prepend('<summary>查看图示源码</summary>');
      details.before(diagram(kind, `${chapter.id}-diagram-${index}`));
    } else {
      pre.attr('tabindex', '0');
      pre.wrap('<div class="code-block"></div>');
      pre.before(`<div class="code-toolbar"><span>${escape(language)}</span><button type="button" class="copy-code" aria-label="复制代码">复制代码 <span aria-hidden="true">↗</span></button></div>`);
    }
  });
  $('input[type="checkbox"]').each((index, element) => {
    const input = $(element), id = `${chapter.id}-task-${index}`;
    input.removeAttr('disabled').attr({ id, 'data-task': id, 'aria-label': input.closest('li').text().trim() });
    input.closest('li').addClass('practice-task');
    input.closest('li').wrapInner('<label class="task-label"></label>');
  });
  let entry = { id: chapter.id, chapter: chapter.number, chapterLabel: chapter.label, title: chapter.label, text: '' };
  const flush = () => {
    if (entry.text.trim()) search.push({ ...entry, text: entry.text.trim().replace(/\s+/g, ' ') });
  };
  $.root().children().each((_, element) => {
    if (/^h[34]$/.test(element.tagName)) {
      flush();
      const heading = $(element);
      entry = { id: heading.attr('id'), chapter: chapter.number, chapterLabel: chapter.label, title: heading.clone().find('.heading-anchor').remove().end().text(), text: '' };
    } else {
      entry.text += ` ${$(element).text()}`;
    }
  });
  flush();
  const next = chapters[Number(chapter.number) + 1];
  articles.push(`<article class="chapter${chapter.key ? ' chapter-key' : ''}" id="${chapter.id}" data-source="${chapter.file}" data-number="${chapter.number}" aria-labelledby="${chapter.id}-title">
    <header class="chapter-header">
      <div class="chapter-eyebrow"><span>CHAPTER ${chapter.number}</span>${chapter.key ? '<span class="key-pill">重点阅读</span>' : ''}</div>
      <h2 id="${chapter.id}-title">${escape(chapter.title)}</h2>
      <p class="chapter-description">${escape(chapter.description)}</p>
    </header>
    <div class="chapter-body">${$.html()}</div>
    <footer class="chapter-footer">
      <button class="mark-read" type="button" data-chapter="${chapter.id}" aria-pressed="false"><span class="read-icon" aria-hidden="true">✓</span><span class="read-label">标记本章已读</span></button>
      ${next ? `<a class="next-chapter" href="#${next.id}"><span>下一章</span>${escape(next.label)} <span aria-hidden="true">→</span></a>` : '<a class="next-chapter" href="#top">回到起点 <span aria-hidden="true">↑</span></a>'}
    </footer>
  </article>`);
}

const groups = [
  ['start', '01', '先看全局'],
  ['delivery', '02', '走进交付链路'],
  ['platform', '03', '成为平台开发者'],
  ['practice', '04', '开始行动'],
];
const navigation = groups.map(([id, number, label]) => `<div class="nav-group"><p class="nav-group-title"><span>${number}</span>${label}</p>${chapters.filter((chapter) => chapter.group === id).map((chapter) => `<a class="chapter-link" href="#${chapter.id}" data-chapter="${chapter.id}"><span class="nav-number">${chapter.number}</span><span class="nav-label">${escape(chapter.label)}</span>${chapter.key ? '<span class="nav-key" aria-label="重点章节"></span>' : ''}<span class="nav-read" aria-hidden="true">✓</span></a>`).join('')}</div>`).join('');

const stages = [
  ['需求承接', '02', '明确价值与边界'],
  ['技术设计', '02', '设计可交付的方案'],
  ['开发协作', '03', '代码与评审'],
  ['持续集成', '04', '自动验证变更'],
  ['制品管理', '05', '固定交付身份'],
  ['测试验收', '06', '形成质量证据'],
  ['交付部署', '07', '落到目标环境'],
  ['生产发布', '08', '控制流量与风险'],
  ['运行保障', '09', '验证用户体验'],
  ['反馈改进', '10', '让下一次更好'],
];
const stageHtml = stages.map(([label, number, detail], index) => {
  let target = `chapter-${number}`;
  if (index === 1) target = chapters[2].headings.find((heading) => heading.text.includes('阶段二'))?.id || target;
  return `<a href="#${target}" class="stage${[3, 4, 6, 7, 8].includes(index) ? ' stage-core' : ''}"><span class="stage-index">${String(index + 1).padStart(2, '0')}</span><span class="stage-name">${label}<span class="stage-detail">${detail}</span></span><span class="stage-arrow" aria-hidden="true">↗</span></a>`;
}).join('');

const [template, css, script] = await Promise.all(['template.html', 'styles.css', 'reader.js'].map((file) => fs.readFile(path.join(here, file), 'utf8')));
const values = {
  STYLES: css,
  SCRIPT: script,
  NAVIGATION: navigation,
  CHAPTERS: articles.join('\n'),
  STAGES: stageHtml,
  SEARCH_INDEX: json(search),
  CHAPTER_INDEX: json(chapters.map(({ id, number, label, headings }) => ({ id, number, label, headings }))),
  CHARACTER_COUNT: `${(totalCharacters / 10000).toFixed(1)} 万`,
};
const html = template.replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => {
  if (!(key in values)) throw new Error(`Unknown template slot: ${key}`);
  return values[key];
});
await fs.writeFile(path.join(root, 'index.html'), html, 'utf8');
console.log(`Generated index.html · ${chapters.length} chapters · ${search.length} search sections · ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB`);
