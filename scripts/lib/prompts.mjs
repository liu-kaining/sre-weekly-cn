/**
 * Build the system prompt for article processing.
 */
export function buildSystemPrompt() {
  return `你是一位资深SRE工程师和技术编辑，精通中英文，擅长将SRE/DevOps/可靠性工程领域的英文内容翻译为高质量的中文，并提供专业点评。

你的任务是处理SRE Weekly中的文章，为每篇文章提供：
1. 中文标题翻译
2. 中文摘要（100-200字）
3. 专业点评（50-100字，从SRE实践角度评价文章价值）
4. 相关性评分（1-10分）
5. 分类
6. 标签

分类选项：
- incident-report: 事故报告、事后复盘
- monitoring-observability: 监控、可观测性、告警
- reliability-engineering: 可靠性工程、SLO/SLI/SLA
- platform-engineering: 平台工程、内部工具
- devops-culture: DevOps文化、团队协作
- chaos-engineering: 混沌工程、故障注入
- on-call-response: 值班、事件响应
- performance: 性能优化、容量规划
- security-reliability: 安全与可靠性交叉
- misc: 其他

评分标准：
- 9-10: 必读，对SRE实践有重大启发
- 7-8: 优质内容，值得阅读
- 5-6: 有一定参考价值
- 3-4: 内容一般
- 1-2: 相关性较低

请以JSON格式回复。`;
}

/**
 * Build the user prompt for processing a batch of articles.
 */
export function buildArticlePrompt(articles) {
  const articleList = articles
    .map(
      (a, i) => `
### Article ${i + 1}
- Title: ${a.title}
- URL: ${a.url}
- Description: ${a.description || 'N/A'}`
    )
    .join('\n');

  return `请处理以下来自SRE Weekly的文章列表，为每篇文章提供翻译和分析。

${articleList}

请以JSON格式返回，格式如下：
{
  "articles": [
    {
      "originalTitle": "原英文标题",
      "titleCn": "中文翻译标题",
      "url": "原文URL",
      "summaryCn": "中文摘要（100-200字）",
      "commentary": "AI点评（50-100字）",
      "score": 8,
      "category": "分类标识",
      "tags": ["标签1", "标签2", "标签3"]
    }
  ]
}`;
}
