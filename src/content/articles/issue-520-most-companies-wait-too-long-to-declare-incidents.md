---
title: "Most Companies Wait Too Long to Declare Incidents"
titleCn: "多数公司宣布事故过迟：降低事故宣布门槛的工程实践"
url: "https://greatcircle.com/blog/2026/03/17/when-to-declare-an-incident/"
issueNumber: 520
issueDate: "2026-06-08T01:21:57.000Z"
category: "on-call-response"
tags:
  - "事件响应"
  - "事故宣布"
  - "MTTR"
  - "无责复盘"
  - "SRE文化"
score: 8
summary: "The real issue is that your company has made declaring an incident costly and risky for the person who does it. Brent Chapman"
summaryCn: "延迟宣布事故（Incident）会显著增加MTTR、扩大爆炸半径并损害团队信任。根本原因在于公司文化将“宣布事故”与“失败”、“问责”绑定，导致工程师在不确定或早期阶段不愿或不敢启动事件响应流程。这违背了SRE核心原则：事故响应的目标是尽快恢复服务，而非追究责任。有效的工程实践是降低宣布门槛和成本：1) 定义清晰、客观的启动标准，如“违反关键SLO”、“影响超过X个用户”、“手动干预必要”，并将其工具化，支持一键启动；2) 建立“事故模拟”或“灰度事故”机制，鼓励在未完全确认影响时就启动流程，后续可降级或关闭；3) 文化上，将事故响应视为学习机会而非污点，通过Blameless Postmortem（无责复盘）强化这一理念。量化改进可跟踪“平均宣布延迟时间”、“事故扩大率”等指标。该实践尤其适用于高变化频率、复杂依赖关系的互联网服务。"
commentary: "这篇文章直击事件响应流程中最关键但最软性的一环：宣布（Declaration）的时机与文化。它强调了将事故管理流程“产品化”、降低使用门槛的重要性，为优化MTTR提供了从文化到工具的完整思路，是SRE团队建设韧性文化的优秀指南。"
publishDate: "2026-06-08T01:21:57.000Z"
---

