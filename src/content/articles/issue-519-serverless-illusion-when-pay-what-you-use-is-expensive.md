---
title: "Serverless Illusion: When “Pay What You Use” is Expensive"
titleCn: "Serverless的错觉：“按使用付费”可能更昂贵"
url: "https://feeds.dzone.com/link/23568/17338596/serverless-illusion-when-you-pay-what-you-use"
issueNumber: 519
issueDate: "2026-06-01T02:22:16.000Z"
category: "platform-engineering"
tags:
  - "Serverless"
  - "成本优化"
  - "架构选型"
  - "容量规划"
score: 7
summary: "Serverless isn’t inherently cheaper. Hidden costs add up, and at scale it’s often pricier than containers — best for sporadic, not steady workloads. David Iyanu Jonathan — DZone"
summaryCn: "本文剖析了Serverless架构在成本方面的常见误区。Serverless的“按使用付费”模型在低流量或突发性工作负载下具有成本优势，但其总拥有成本（TCO）在高、稳定流量场景下通常高于容器化方案。成本膨胀的根因在于：1) 隐性成本，如函数冷启动（Cold Start）带来的额外延迟和资源开销，以及为减少冷启动而配置的并发实例（Provisioned Concurrency）费用；2) 高频调用模式下，函数执行时长和内存配置的微小单位费用累积显著；3) 生态锁定导致的迁移成本。文章通过对比一个日均稳定处理千万请求的API服务，分别采用AWS Lambda（持续预置并发模式）和托管在ECS上的容器化服务，发现后者的月度计算成本可能低40-60%。其核心决策点在于工作负载的负载因子（Utilization Factor）：对于负载因子持续高于70-80%的稳态业务，容器或虚拟机方案在成本上更具可预测性和优势。Serverless更适合事件驱动、负载因子波动大或较低的场景。"
commentary: "这篇文章为SRE和架构师提供了关键的架构选型成本洞察。它打破了Serverless“天然便宜”的迷思，强调基于实际负载模式的量化成本建模是避免技术债务的关键。"
publishDate: "2026-06-01T02:22:16.000Z"
---

