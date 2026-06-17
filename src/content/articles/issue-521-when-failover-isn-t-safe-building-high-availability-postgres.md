---
title: "When failover isn’t safe: Building high-availability PostgreSQL on Kubernetes"
titleCn: "当故障转移不安全时：在Kubernetes上构建高可用PostgreSQL集群"
url: "https://www.datadoghq.com/blog/engineering/postgresql-ha-kubernetes/"
issueNumber: 521
issueDate: "2026-06-15T01:50:24.000Z"
category: "reliability-engineering"
tags:
  - "PostgreSQL"
  - "高可用"
  - "故障转移"
  - "Kubernetes"
  - "同步复制"
  - "SLO"
  - "混沌工程"
score: 9
summary: "In this post, we’ll walk through how we redesigned our Kubernetes-based PostgreSQL clusters for failover safety, how we balanced durability against latency, and what we learned while validating this approach through benchmarking and failure testing. Shree Sampath — Datadog"
summaryCn: "Datadog针对K8s上原生PostgreSQL故障转移存在的数据丢失与脑裂风险，提出了基于同步复制与仲裁节点的HA方案。核心设计：1) 引入Replication Lag SLO（P99 < 100ms），写操作在同步复制超时时自动降级为异步模式，平衡数据持久性与写入延迟；2) 基于Patroni + etcd实现强一致性leader选举，通过raft共识协议防护脑裂；3) 构建多层次健康检查体系，从TCP存活、PostgreSQL pg_isready到WAL复制延迟与查询响应时间，将故障检测窗口从30秒优化至5秒。通过混沌工程测试验证，该方案在主节点故障时实现RPO=0的数据无损切换，平均MTTR从分钟级降至15秒以内。方案适用于对数据一致性要求高、可接受写入短暂延迟的OLTP场景，为在K8s上运行有状态数据库提供了可复用的工程模式。"
commentary: "本文是SRE领域处理有状态服务高可用的典范，将数据库可靠性要求（RPO=0）与分布式系统约束（K8s故障域）相结合。其‘SLO驱动降级’和‘分层健康检查’模式具有高复用价值，尤其适用于金融、交易等核心业务系统。"
publishDate: "2026-06-15T01:50:24.000Z"
---

