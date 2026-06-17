---
title: "The 28-Hour Meltdown: What Happened When AWS US-EAST-1 Overheated"
titleCn: "28小时熔断：AWS US-EAST-1区域过热事件深度剖析"
url: "https://builder.aws.com/content/3DTtGltSalD4IteiZ7bEKQ8Tj4E/the-28-hour-meltdown-what-happened-when-aws-us-east-1-overheated"
issueNumber: 519
issueDate: "2026-06-01T02:22:16.000Z"
category: "incident-report"
tags:
  - "AWS"
  - "云原生"
  - "高可用架构"
  - "故障域"
  - "灾备"
  - "重大事故"
score: 10
summary: "A breakdown of the 28-hour aws us-east-1 outage in may 2026. What caused it, what went down, and what it means for how you design your infrastructure. Alon Shrestha"
summaryCn: "2026年5月，AWS US-EAST-1区域发生长达28小时的重大中断，根因是数据中心物理冷却系统故障导致机房过热。此次事件深刻暴露了单一云区域（Region）的致命弱点：尽管AWS宣称其可用区（AZ）间物理隔离，但区域级的基础设施（如供电、冷却、网络骨干）仍存在共因故障（Common Cause Failure）风险。当冷却系统失效时，服务器因过热触发硬件保护性关机，引发连锁反应，导致依赖该区域核心服务（如EBS、EC2控制面、特定底层网络服务）的大规模计算资源不可用。影响范围不仅限于直接使用US-EAST-1的客户，更波及了许多将其作为主要区域或未实施跨区域架构的全球性服务。事件凸显了在云原生架构设计中，必须将“云区域级故障”纳入故障域（Failure Domain）设计，并强制实施跨区域（Multi-Region）或至少跨可用区（Multi-AZ）的高可用与灾备策略。对于SRE团队，关键启示是定期进行“区域级降级”演练，并确保业务流量调度和数据复制策略能够真正实现故障隔离。"
commentary: "这是一份极具价值的云平台级故障报告。它迫使所有SRE重新审视其架构的“单点故障”范围是否已扩大到云区域级别，并提供了进行跨区域架构演进的强烈动机。"
publishDate: "2026-06-01T02:22:16.000Z"
---

