---
title: "When failover isn’t safe: Building high-availability PostgreSQL on Kubernetes"
titleCn: "当故障转移不安全：在Kubernetes上构建高可用PostgreSQL"
url: "https://www.datadoghq.com/blog/engineering/postgresql-ha-kubernetes/"
issueNumber: 521
issueDate: "2026-06-15T01:50:24.000Z"
category: "reliability-engineering"
tags:
  - "PostgreSQL"
  - "Kubernetes"
  - "高可用"
  - "同步复制"
  - "SLO"
  - "故障转移"
score: 9
summary: "In this post, we’ll walk through how we redesigned our Kubernetes-based PostgreSQL clusters for failover safety, how we balanced durability against latency, and what we learned while validating this approach through benchmarking and failure testing. Shree Sampath — Datadog"
summaryCn: "Datadog针对K8s上PostgreSQL故障转移的潜在数据丢失风险，设计并实现了新一代高可用方案。核心挑战在于平衡数据持久性（Durability）与写入延迟（Latency），传统异步复制在主节点故障时可能导致数据丢失。其架构核心创新包括：1）引入基于同步复制（Synchronous Replication）的强一致性模式，通过仲裁节点（Quorum）确保写入在从节点确认后才返回成功，实现RPO=0；2）为降低同步延迟影响，设计了自适应降级策略，将Replication Lag SLO（例如P99 < 100ms）作为关键监控指标，当延迟超SLO时自动、安全地临时切换回异步模式，避免写入阻塞；3）故障检测采用多层级健康检查栈，从TCP存活检查到PostgreSQL `pg_isready`、WAL复制延迟监控乃至查询响应时间，将故障检测窗口从传统30秒优化至5秒内。通过Chaos Engineering模拟节点宕机、网络分区等场景进行验证，该方案实现了主从切换的MTTR从分钟级降至15秒以内，且保证了数据零丢失。此模式适用于对数据一致性要求严苛、可接受短暂写入延迟优化的OLTP数据库场景。"
commentary: "本文提供了一套在Kubernetes环境中平衡数据库强一致性与高可用的完整工程方案。其引入Replication Lag SLO并实现自动降级的策略，是SRE理念在数据库层的精妙落地，为运行关键业务数据库的平台团队提供了可复用的模式。"
publishDate: "2026-06-15T01:50:24.000Z"
---

