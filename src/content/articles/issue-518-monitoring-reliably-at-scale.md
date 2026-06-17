---
title: "Monitoring reliably at scale"
titleCn: "规模化下的可靠监控"
url: "https://medium.com/airbnb-engineering/monitoring-reliably-at-scale-ca6483040930"
issueNumber: 518
issueDate: "2026-05-25T01:28:18.000Z"
category: "monitoring-observability"
tags:
  - "监控可靠性"
  - "可观测性"
  - "Airbnb"
  - "架构设计"
  - "故障隔离"
score: 9
summary: "But what happens when your observability stack is dependent on the same systems that are failing? In that moment, the dashboards go dark, alerts stop firing, and the tools meant to guide recovery become part of the outage. Abdurrahman J. Allawala — Airbnb"
summaryCn: "本文来自Airbnb工程团队，探讨了一个经典且棘手的监控可靠性问题：当你的可观测性技术栈（监控、告警、仪表盘）依赖于正在发生故障的系统本身时，会发生什么？文章描述了在故障发生时，监控面板变暗、告警停止触发、本应指引恢复的工具成为故障一部分的恶性循环。文章分享了Airbnb为解决这一“监控可靠性”问题所采取的架构设计和实践。"
commentary: "这是SRE领域的经典挑战，即“监控监控系统”。Airbnb的实践分享极具价值，因为它来自超大规模的真实生产环境。文章强调的解耦、冗余和独立故障域原则，是构建真正有韧性的可观测性系统的基石。对于任何负责大型分布式系统监控的SRE团队来说，这都是必读材料。"
publishDate: "2026-05-25T01:28:18.000Z"
---
