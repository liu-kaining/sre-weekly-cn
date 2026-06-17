---
title: "When failover isn’t safe: Building high-availability PostgreSQL on Kubernetes"
titleCn: "当故障转移不安全时：在Kubernetes上构建高可用PostgreSQL"
url: "https://www.datadoghq.com/blog/engineering/postgresql-ha-kubernetes/"
issueNumber: 521
issueDate: "2026-06-15T01:50:24.000Z"
category: "reliability-engineering"
tags:
  - "PostgreSQL"
  - "高可用"
  - "Kubernetes"
  - "故障转移"
  - "性能优化"
  - "数据库"
score: 9
summary: "In this post, we’ll walk through how we redesigned our Kubernetes-based PostgreSQL clusters for failover safety, how we balanced durability against latency, and what we learned while validating this approach through benchmarking and failure testing. Shree Sampath — Datadog"
summaryCn: "Datadog团队分享了在Kubernetes上重新设计PostgreSQL高可用集群以提升故障转移安全性的经验。文章详细探讨了如何在数据持久性与访问延迟之间取得平衡，并通过基准测试和故障注入验证了设计方法的有效性。文中总结了在复杂环境中保障数据库服务连续性所面临的核心挑战与实践心得。"
commentary: "本文是极具实践价值的架构案例，深入剖析了状态化服务在Kubernetes中实现高可用的典型难题。其通过故障测试验证设计的方法，为SRE团队处理类似场景提供了可复制的工程范式，对提升系统韧性有直接指导意义。"
publishDate: "2026-06-15T01:50:24.000Z"
---

Datadog团队分享了在Kubernetes上重新设计PostgreSQL高可用集群以提升故障转移安全性的经验。文章详细探讨了如何在数据持久性与访问延迟之间取得平衡，并通过基准测试和故障注入验证了设计方法的有效性。文中总结了在复杂环境中保障数据库服务连续性所面临的核心挑战与实践心得。
