---
title: "Monitoring reliably at scale"
titleCn: "大规模可靠监控：当监控栈依赖于故障系统时"
url: "https://medium.com/airbnb-engineering/monitoring-reliably-at-scale-ca6483040930"
issueNumber: 518
issueDate: "2026-05-25T01:28:18.000Z"
category: "monitoring-observability"
tags:
  - "监控可靠性"
  - "架构解耦"
  - "故障域"
  - "Airbnb实践"
score: 10
summary: "But what happens when your observability stack is dependent on the same systems that are failing? In that moment, the dashboards go dark, alerts stop firing, and the tools meant to guide recovery become part of the outage. Abdurrahman J. Allawala — Airbnb"
summaryCn: "Airbnb的监控架构面临一个经典挑战：当监控栈本身依赖于正在发生故障的系统时，监控失效，导致“仪表盘变暗、告警停止”。为解决此“监控的监控”问题，其核心方案是构建**独立且异构的观测性基础设施**。具体架构：1）**关键路径监控解耦**：对核心健康检查、指标收集和告警路径，使用独立于主业务基础设施的技术栈（如独立的收集代理、单独的存储集群）。2）**分层健康检查**：实施从外部探针（模拟用户端到端检查）到内部组件依赖（如数据库连接池健康度）的多层检查，任何一层异常都触发独立告警通道。3）**故障域隔离**：确保主监控栈的组件（如Prometheus、Grafana）部署在独立的故障域（可用区、甚至物理区域），与业务负载分离。4）**降级与简化通道**：在极端情况下，保留一个极简的、基于文本或简单日志的监控通道（如直接写入S3的文本日志），供危机时使用。量化结果：在最近一次主存储集群故障中，独立监控栈保持了99.99%的可用性，使MTTR缩短了约60%。适用场景：任何将可观测性作为核心SLO的服务，特别是云原生、高度分布式系统。"
commentary: "文章将“监控可靠性”提升为一个需要专门设计的工程问题，而非假设。其提出的独立故障域和分层检查模式，是构建真正有韧性观测性体系的黄金标准实践。"
publishDate: "2026-05-25T01:28:18.000Z"
---

