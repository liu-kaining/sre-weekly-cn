# SRE Weekly 中文版

> AI 驱动的 [SRE Weekly](https://sreweekly.com) 中文内容聚合站点

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)](https://liu-kaining.github.io/sre-weekly-cn/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 简介

SRE Weekly 是业界知名的 SRE/DevOps/可靠性工程周刊，每周精选高质量的技术文章。本站通过 AI 自动完成：

- **内容抓取**：每日自动从 RSS 获取最新文章
- **智能翻译**：将英文标题和摘要翻译为专业中文
- **深度评析**：AI 从 SRE 实践角度提供专业点评
- **自动分类**：按事故报告、监控可观测、可靠性工程等维度分类
- **质量评分**：1-10 分评估文章对 SRE 实践的参考价值

> **声明**：本站内容来源于 [SRE Weekly](https://sreweekly.com)，为非官方二次加工站点，仅供中文读者参考学习。建议同时关注原站获取第一手英文内容。

## 功能特性

- 📰 **期刊浏览**：按期查看 SRE Weekly 历史文章
- 🏷️ **分类筛选**：10 大 SRE 领域分类
- 🏷️ **标签聚合**：多维度标签云
- 📊 **数据统计**：首页展示文章、期数、分类、标签统计
- 🤖 **AI 点评**：每篇文章配有专业 SRE 视角的点评
- 📱 **响应式设计**：支持移动端访问

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | [Astro 5](https://astro.build/) |
| 样式 | [Tailwind CSS 4](https://tailwindcss.com/) |
| 类型系统 | TypeScript |
| AI 处理 | OpenAI SDK (兼容 Claude/OpenAI) |
| CI/CD | GitHub Actions |
| 托管 | GitHub Pages |

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/liu-kaining/sre-weekly-cn.git
cd sre-weekly-cn
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入你的 API 配置：

```env
OPENAI_API_KEY=your-api-key
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o
```

### 4. 本地开发

```bash
# 启动开发服务器
npm run dev

# 抓取最新 RSS 并处理
npm run sync

# 构建静态站点
npm run build
```

## 自动化流程

项目通过 GitHub Actions 实现每日自动化：

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  RSS 抓取   │ ──→ │  AI 处理    │ ──→ │  自动部署   │
│ (fetch-rss) │     │(process-art)│     │   (build)   │
└─────────────┘     └─────────────┘     └─────────────┘
```

- **触发时间**：每日 UTC 01:00 (北京时间 09:00)
- **处理流程**：
  1. 从 SRE Weekly RSS 获取最新内容
  2. 调用 LLM 生成中文摘要和点评
  3. 生成 Markdown 文件
  4. 构建并部署到 GitHub Pages

## 项目结构

```
sre-weekly-cn/
├── src/
│   ├── content/
│   │   ├── articles/      # 文章 Markdown 文件
│   │   └── issues/        # 期数 Markdown 文件
│   ├── components/        # UI 组件
│   ├── layouts/           # 页面布局
│   ├── pages/             # 路由页面
│   └── styles/            # 全局样式
├── scripts/
│   ├── fetch-rss.mjs      # RSS 抓取脚本
│   ├── process-articles.mjs # AI 处理脚本
│   └── lib/               # 工具库
├── data/
│   └── pending/           # 待处理数据
├── .github/
│   └── workflows/         # CI/CD 配置
└── public/                # 静态资源
```

## 内容分类

| 分类 | 说明 |
|------|------|
| incident-report | 事故报告、事后复盘 |
| monitoring-observability | 监控、可观测性、告警 |
| reliability-engineering | 可靠性工程、SLO/SLI/SLA |
| platform-engineering | 平台工程、内部工具 |
| devops-culture | DevOps 文化、团队协作 |
| chaos-engineering | 混沌工程、故障注入 |
| on-call-response | 值班、事件响应 |
| performance | 性能优化、容量规划 |
| security-reliability | 安全与可靠性交叉 |

## 评分标准

| 分数 | 含义 |
|------|------|
| 9-10 | 必读，对 SRE 实践有重大启发 |
| 7-8 | 优质内容，值得阅读 |
| 5-6 | 有一定参考价值 |
| 3-4 | 内容一般 |
| 1-2 | 相关性较低 |

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

[MIT License](LICENSE)

---

**数据来源**：[SRE Weekly](https://sreweekly.com) | **GitHub**：[liu-kaining/sre-weekly-cn](https://github.com/liu-kaining/sre-weekly-cn)
