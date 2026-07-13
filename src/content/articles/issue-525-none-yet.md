---
title: "None Yet"
titleCn: "从零构建事件管理流程：什么不应该一开始就做"
url: "https://read.zerosevzero.com/p/none-yet"
issueNumber: 525
issueDate: "2026-07-13T01:37:17.000Z"
category: "on-call-response"
tags:
  - "事件管理"
  - "初创团队"
  - "流程演进"
  - "最小可行流程"
  - "事后复盘"
score: 8
summary: "A guide for building an incident management process at a small company, with a focus on what not to include from the start. Tim Irving"
summaryCn: "针对员工数 30 人以下、尚未专职 SRE 的初创团队，过度设计的事件管理流程（如要求填写长篇事故报告、定义复杂指挥层级、接入重量级监控工具）往往适得其反，拖慢响应速度并侵蚀工程师能动性。作者基于亲身经验，提炼出一套极简启动模型：初始阶段仅需明确一个即时通讯群组作为战时沟通渠道、一名轮值事件协调员（IC）负责同步状态与决策记录，以及一条硬性规则——事故发生后必须先恢复服务再启动简易复盘。复盘初期只聚焦时间线重建和关键决策点，避免深挖根因或追责。工具方面，放弃 PagerDuty 等专业值守系统，改用 Slack + Google Doc 等团队已在用的工具，降低认知负荷。随着组织扩张，逐步引入自动化告警、SLO 监控和事后分析模板。该方案核心思想是“流程匹配团队成熟度”，避免过早优化，将有限精力集中在响应速度和知识沉淀上。"
commentary: "对于资源受限的初创公司，本文给出的“减法思维”极具现实意义。它颠覆了“事件管理必须一步到位”的误区，提供了与团队规模同步演进的可操作路径，有效平衡了可靠性诉求与工程效率。"
publishDate: "2026-07-13T01:37:17.000Z"
---

