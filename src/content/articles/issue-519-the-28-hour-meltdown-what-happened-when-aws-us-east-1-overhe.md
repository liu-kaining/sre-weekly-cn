---
title: "The 28-Hour Meltdown: What Happened When AWS US-EAST-1 Overheated"
titleCn: "AWS US-EAST-1区域过热引发的28小时大规模故障复盘"
url: "https://builder.aws.com/content/3DTtGltSalD4IteiZ7bEKQ8Tj4E/the-28-hour-meltdown-what-happened-when-aws-us-east-1-overheated"
issueNumber: 519
issueDate: "2026-06-01T02:22:16.000Z"
category: "incident-report"
tags:
  - "AWS故障"
  - "可用区"
  - "基础设施"
  - "冷却系统"
  - "故障域"
  - "爆炸半径"
  - "SLA"
score: 10
summary: "A breakdown of the 28-hour aws us-east-1 outage in may 2026. What caused it, what went down, and what it means for how you design your infrastructure. Alon Shrestha"
summaryCn: "2026年5月，AWS US-EAST-1区域因数据中心冷却系统故障导致持续28小时的级联宕机。故障始于主冷却泵失效，备用系统未能在阈值时间内接管，导致多个机柜温度超过85°C安全限值，触发硬件保护性关机。核心服务（EC2, RDS, EBS）的故障爆炸半径达到区域级别，影响数十万客户，包括大量单区域部署的生产应用。根本原因分析：1）冷却系统缺乏足够的冗余（N+1而非N+2）；2）监控告警阈值设置不合理，高温告警延迟15分钟；3）自动故障转移（failover）脚本存在逻辑缺陷，未能处理“部分系统失效”场景。AWS事后采取的改进措施包括：建立跨可用区（AZ）的冷却冗余、实施基于机器学习的温控预测、将硬件健康检查频率从5分钟提升至30秒。量化影响：故障期间US-EAST-1可用性降至99.95%以下（SLA为99.99%），部分客户数据丢失，平均恢复时间（MTTR）长达28小时。"
commentary: "这是一个经典的物理基础设施引发云上大规模故障的案例。它深刻揭示了“共享责任模型”下，云平台物理层的可靠性短板仍可能成为所有上层业务的单点故障。对SRE的核心启示是：必须将基础设施的物理依赖（电力、冷却、网络）纳入SLO和故障演练范围，并严格执行多区域（multi-region）部署以降低爆炸半径。"
publishDate: "2026-06-01T02:22:16.000Z"
---

