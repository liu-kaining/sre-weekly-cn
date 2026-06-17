# SRE Weekly CN

AI驱动的 [SRE Weekly](https://sreweekly.com) 中文内容聚合站点。

本站自动抓取 SRE Weekly RSS，通过 LLM 进行翻译、点评、评分和分类，输出为 Astro 静态站点部署在 GitHub Pages。

> **声明**: 本站内容来源于 [SRE Weekly](https://sreweekly.com)，为非官方二次加工站点，仅供中文读者参考学习。建议同时关注原站获取第一手英文内容。

## Tech Stack

- **Frontend**: Astro 5 + Tailwind CSS 4 + TypeScript
- **AI Processing**: OpenAI SDK (兼容 Claude/OpenAI，通过 base URL 配置)
- **CI/CD**: GitHub Actions (每日定时)
- **Hosting**: GitHub Pages

## Quick Start

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 抓取 RSS 并处理
npm run sync

# 构建静态站点
npm run build
```

## Environment Variables

复制 `.env.example` 为 `.env` 并填入:

```
OPENAI_API_KEY=your-api-key
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o
```

## Project Structure

```
├── src/
│   ├── content/        # Markdown articles & issues
│   ├── pages/          # Astro pages
│   ├── components/     # UI components
│   └── layouts/        # Page layouts
├── scripts/            # RSS fetch & AI processing
├── data/               # Processing state
└── .github/workflows/  # CI/CD
```

## License

MIT
