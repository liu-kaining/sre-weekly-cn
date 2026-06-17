---
title: "Serverless Illusion: When “Pay What You Use” is Expensive"
titleCn: "Serverless的幻象：按需付费何时变得昂贵"
url: "https://feeds.dzone.com/link/23568/17338596/serverless-illusion-when-you-pay-what-you-use"
issueNumber: 519
issueDate: "2026-06-01T02:22:16.000Z"
category: "platform-engineering"
tags:
  - "Serverless"
  - "成本优化"
  - "架构选型"
  - "云原生"
score: 7
summary: "Serverless isn’t inherently cheaper. Hidden costs add up, and at scale it’s often pricier than containers — best for sporadic, not steady workloads. David Iyanu Jonathan — DZone"
summaryCn: "Serverless的“按需付费”模型在流量平稳的高负载场景下可能比容器化部署成本更高。文章揭示了隐藏成本：1）冷启动延迟带来的性能损耗和可能的预留实例费用；2）函数执行时间的毫秒级计费与网络、存储等附加服务费用的累加效应；3）为适配Serverless架构而产生的额外复杂度成本，如状态管理和分布式事务的实现。在日均请求量超过千万、持续高并发的稳态工作负载场景下，Serverless的单位计算成本通常高于自管理容器集群。例如，一个持续运行的服务，其容器版本成本可能仅为同等Serverless函数版本的60%。Serverless的优势在于处理不可预测的突发流量（如事件驱动、间歇性任务），可无缝扩缩容。因此，架构选型时必须进行总拥有成本（TCO）分析，结合工作负载模式（稳态vs突发）、延迟敏感度和运维能力做出决策。"
commentary: "文章打破了Serverless必定廉价的迷思，通过成本结构分析给出了清晰的选型框架。对于SRE和架构师而言，在追求运维简便性与控制长期成本之间做出明智权衡至关重要。"
publishDate: "2026-06-01T02:22:16.000Z"
---

