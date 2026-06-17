---
title: "A postmortem of our May 7, 2026 outage"
titleCn: "Coinbase 2026年5月7日服务中断事后复盘"
url: "https://www.coinbase.com/blog/a-postmortem-of-our-may-7-2026-outage"
issueNumber: 520
issueDate: "2026-06-08T01:21:57.000Z"
category: "incident-report"
tags:
  - "事后复盘"
  - "可用区"
  - "故障转移"
  - "架构决策"
  - "Coinbase"
score: 9
summary: "I enjoyed learning about their deliberate architectural choice to keep their central service in a single AZ. This incident highlighted a need for a fast failover plan. Coinbase"
summaryCn: "本文是Coinbase对其2026年5月7日发生的一次重大服务中断事件的详细事后复盘。文章深入剖析了导致中断的根本原因，并特别提到了一个关键的、经过深思熟虑的架构决策：将其核心服务集中部署在单个可用区（AZ）。该事件暴露了在现有架构下，缺乏快速故障转移计划所带来的风险。复盘内容涵盖了事件时间线、影响范围、根本原因分析以及后续的改进措施，为业界提供了宝贵的实战经验。"
commentary: "这是一篇典型且有价值的事故报告，其核心价值在于坦诚地揭示了在追求极致性能或简化运维时，架构选择（单AZ）与系统韧性之间的权衡。它强调了即使是有意为之的设计，也需要配套的、经过演练的应急方案，对SRE团队审视自身系统的故障恢复能力具有直接参考意义。"
publishDate: "2026-06-08T01:21:57.000Z"
---

本文是Coinbase对其2026年5月7日发生的一次重大服务中断事件的详细事后复盘。文章深入剖析了导致中断的根本原因，并特别提到了一个关键的、经过深思熟虑的架构决策：将其核心服务集中部署在单个可用区（AZ）。该事件暴露了在现有架构下，缺乏快速故障转移计划所带来的风险。复盘内容涵盖了事件时间线、影响范围、根本原因分析以及后续的改进措施，为业界提供了宝贵的实战经验。
