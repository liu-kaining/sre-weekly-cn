---
title: "Why post-mortem action items die"
titleCn: "为何事后复盘（Post-mortem）的待办事项（Action Items）总是不了了之"
url: "https://incident.io/blog/why-post-mortem-action-items-die"
issueNumber: 517
issueDate: "2026-05-18T02:29:57.000Z"
category: "incident-report"
tags:
  - "事后复盘"
  - "改进措施"
  - "项目管理"
  - "持续改进"
  - "SRE文化"
score: 9
summary: "There’s some great advice in here. My favorite: be explicit about choosing or not choosing to do something. incident.io"
summaryCn: "SRE实践中，事后复盘提出的改进措施（Action Items）常常因优先级冲突、责任不清、缺乏跟进机制而被搁置或遗忘，这削弱了故障复盘的长期价值。文章深入剖析了根本原因：1) 目标模糊：行动项描述笼统（如“改进监控”），缺乏可衡量的成功指标（如“将X服务的告警误报率从15%降至5%”）和明确的SLO关联；2) 资源归属不清：未明确指定单一责任人（DRI）及所需工程资源（人/日），导致多方推诿；3) 与业务优先级脱节：行动项未与团队/公司的季度OKR对齐，容易在资源争夺中落败。文章提出可落地的工程实践：a) 采用“SMART”原则定义行动项，明确具体、可衡量、可达成、相关且有时限的目标；b) 在复盘记录中显式决策“做”或“不做”，并记录商业理由，避免模糊的“考虑中”状态；c) 将行动项集成到项目管理工具（如Jira）并设置自动提醒，纳入团队迭代回顾会议（Sprint Retrospective）进行跟踪。这些措施旨在将事后复盘从“事件记录”转变为持续改进（Continuous Improvement）的驱动力。"
commentary: "本文切中了SRE文化落地的核心痛点——改进措施执行难。其价值在于提供了从流程到工具的具体解决方案，强调显式决策和系统化跟踪，这对提升团队执行力与系统长期可靠性至关重要。"
publishDate: "2026-05-18T02:29:57.000Z"
---

