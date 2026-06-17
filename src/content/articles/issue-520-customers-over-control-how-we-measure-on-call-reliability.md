---
title: "Customers over control: how we measure On-call reliability"
titleCn: "客户体验优于绝对控制：incident.io如何衡量On-call可靠性"
url: "https://incident.io/blog/customers-over-control"
issueNumber: 520
issueDate: "2026-06-08T01:21:57.000Z"
category: "reliability-engineering"
tags:
  - "SLO"
  - "客户体验"
  - "值班可靠性"
  - "Error Budget"
  - "可观测性"
score: 9
summary: "I like the balance between ensuring 99.99% reliability and designing their product to encourage customers to use their platform in a way that effectively manages the 0.01% case. Reliability is a customer experience problem Mike Fisher — incident.io"
summaryCn: "incident.io提出了一种以客户体验为核心来度量和管理值班（On-call）可靠性的创新方法。传统SRE实践聚焦于控制内部系统指标，但该文指出，可靠性本质上是客户体验问题。其核心架构是将可观测性数据与客户影响直接关联。具体实践：1) 定义“客户导向”的SLO，例如“客户创建的告警在30秒内被确认的概率”，而非单纯的“系统API延迟”。2) 将内部Error Budget的剩余量，转化为面向客户的沟通材料，主动透明化那0.01%不可用时间的原因与恢复进展。3) 设计产品功能（如状态页面集成、自动化事件沟通）来引导客户在故障期间的行为，从而管理客户预期，将故障的“体验爆炸半径”降至最低。量化结果体现在客户满意度和续约率的提升上。该模式适用于SaaS或平台型产品，其核心方法论是：将SRE的可靠性目标从技术语言翻译为业务和客户价值语言，并将控制点从单纯的技术修复扩展到客户沟通与体验管理。"
commentary: "这篇文章将SRE的可靠性理念向前推进了一步，从‘保障系统在线’升维到‘保障客户体验可控’。它提供了一套可操作的、将内部SLO与外部客户感知对齐的框架，对于任何直接面向外部用户提供服务的SRE团队都具有很高的启发价值。"
publishDate: "2026-06-08T01:21:57.000Z"
---

