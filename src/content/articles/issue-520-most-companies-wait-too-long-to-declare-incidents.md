---
title: "Most Companies Wait Too Long to Declare Incidents"
titleCn: "多数公司宣布事故的时间点过晚"
url: "https://greatcircle.com/blog/2026/03/17/when-to-declare-an-incident/"
issueNumber: 520
issueDate: "2026-06-08T01:21:57.000Z"
category: "on-call-response"
tags:
  - "事故宣布"
  - "事件响应"
  - "无指责文化"
  - "MTTR"
  - "SLO管理"
score: 8
summary: "The real issue is that your company has made declaring an incident costly and risky for the person who does it. Brent Chapman"
summaryCn: "文章指出，许多公司事故宣布机制失效的核心原因并非缺乏定义，而是组织文化使得宣布事故对个人而言成为一件高成本、高风险的行为。员工担心被贴上“问题制造者”标签、影响绩效评估或触发冗长的官僚流程。这种文化导致宣布时机被人为推迟，错过了集结资源、控制爆炸半径的最佳窗口期，MTTR显著增加。从工程角度看，这直接违背了“快速失败、快速恢复”的原则，并可能违反SLO/Error Budget的管理初衷。解决方案需从文化和流程双管齐下：文化上，管理层必须明确宣布事故是“中性信息汇报而非指责”，并通过无惩罚性的事后复盘（Blameless PIR）来强化；流程上，必须降低宣布成本，例如：1）定义清晰、易于操作的宣布阈值（如：任何影响客户的、非计划内的服务降级）；2）建立一键式、模板化的宣布通道（如Slack命令）；3）实施“事故响应者”角色轮换，分散个人风险。量化改进指标包括：从异常检测到正式宣布的平均时间差（MTTD to Declare）、以及宣布时事故平均影响范围。"
commentary: "这篇文章直击SRE实践中常见的组织文化痛点。它将事故管理从纯技术问题提升至社会技术系统问题，提出的简化流程和无指责文化方案对于提升事件响应敏捷性、保护Error Budget具有直接意义。"
publishDate: "2026-06-08T01:21:57.000Z"
---

