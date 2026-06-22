---
title: "Scaling Security Insights: how we achieved a 10x increase in global扫描能力"
titleCn: "安全洞察的规模化：Cloudflare如何实现全球扫描能力10倍提升"
url: "https://blog.cloudflare.com/scaling-security-scans/"
issueNumber: 522
issueDate: "2026-06-22T02:28:00.000Z"
category: "performance"
tags:
  - "系统扩展性"
  - "性能优化"
  - "Kafka"
  - "架构设计"
  - "安全扫描"
score: 9
summary: "A satisfying scaling story where every fix came from looking more closely at the system — Kafka head-of-line blocking, a clumpy scheduler, and an active-active API that silently doubled latency for half of all partitions. Dave Baxter — Cloudflare"
summaryCn: "Cloudflare面临其全球安全扫描管道吞吐量瓶颈，目标是将容量提升10倍。通过深入系统分析，团队定位到三个关键瓶颈：1) Kafka消息队列的头部阻塞（Head-of-Blocking）问题，单个慢分区会拖累整个消费者组；2) 扫描任务调度器存在“调度聚集”（Clumpy Scheduler）现象，导致资源分配不均和瞬时过载；3) 采用Active-Active架构的API层因跨区域请求路由策略，无意中为近半数分区引入了双倍延迟。解决方案是架构性的：重构Kafka消费者以实现分区级隔离与弹性伸缩；设计负载感知的任务调度器，实现资源的动态均衡；优化API的流量管理策略，消除跨区延迟惩罚。最终，在没有线性增加硬件成本的情况下，实现了全球扫描能力的10倍提升，同时保障了扫描结果的低延迟交付。"
commentary: "这是一个典型的通过深度可观测性和针对性调优解决规模化瓶颈的案例。它展示了在复杂分布式系统中，性能瓶颈往往隐藏在看似正常的组件交互之中，需要从系统视角而非单一组件视角进行诊断。"
publishDate: "2026-06-22T02:28:00.000Z"
---

