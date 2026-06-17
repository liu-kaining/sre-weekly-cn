---
title: "Customers over control: how we measure On-call reliability"
titleCn: "客户体验优于控制：我们如何衡量值班可靠性"
url: "https://incident.io/blog/customers-over-control"
issueNumber: 520
issueDate: "2026-06-08T01:21:57.000Z"
category: "reliability-engineering"
tags:
  - "on-call"
  - "sla"
  - "slo"
  - "error-budget"
  - "customer-experience"
  - "product-design"
  - "saas"
score: 8
summary: "I like the balance between ensuring 99.99% reliability and designing their product to encourage customers to use their platform in a way that effectively manages the 0.01% case. Reliability is a customer experience problem Mike Fisher — incident.io"
summaryCn: "本文探讨了将值班（On-call）可靠性从内部运营指标提升为客户体验度量的实践。incident.io 团队认为，单纯追求内部系统的99.99%可用性（如内部工具、监控系统本身）并非终极目标，真正的可靠性应体现在保障其客户的业务连续性上。他们为此设计了独特的度量框架：一方面严格保障自身平台99.99%的SLA，确保核心告警、事件管理流程不受影响；另一方面，将产品设计引导客户更有效地管理剩余0.01%的不可用窗口。例如，产品内建了降级模式下的自动化处理、客户侧的告警回退（Fallback）通知渠道（如短信、电话）配置引导，以及基于SLO（服务等级目标）的错误预算（Error Budget）消耗可视化，帮助客户提前感知风险。这种方法将SRE的Error Budget理念延伸至客户层面，让客户成为可靠性保障的参与者而非被动承受者。技术实现上，可能涉及对客户关键流程（如告警投递、On-call轮班调度）的端到端SLI（服务等级指标）监控，以及将自身系统的状态健康度透明地同步给客户。此模式适用于ToB的SaaS或平台类产品，能将可靠性转化为竞争优势。"
commentary: "这篇文章将SRE思维从内部运维提升到产品设计层面，具有前瞻性。它主张可靠性是客户共同体验，并提出了通过产品化手段来管理“残差风险”的实用方法，为平台型产品的可靠性价值主张提供了新思路。"
publishDate: "2026-06-08T01:21:57.000Z"
---

