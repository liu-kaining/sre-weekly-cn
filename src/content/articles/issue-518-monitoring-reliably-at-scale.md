---
title: "Monitoring reliably at scale"
titleCn: "大规模场景下的可靠监控：当监控系统成为故障的一部分"
url: "https://medium.com/airbnb-engineering/monitoring-reliably-at-scale-ca6483040930"
issueNumber: 518
issueDate: "2026-05-25T01:28:18.000Z"
category: "monitoring-observability"
tags:
  - "监控系统"
  - "故障域隔离"
  - "架构韧性"
  - "可观测性"
  - "MTTR"
score: 10
summary: "But what happens when your observability stack is dependent on the same systems that are failing? In that moment, the dashboards go dark, alerts stop firing, and the tools meant to guide recovery become part of the outage. Abdurrahman J. Allawala — Airbnb"
summaryCn: "Airbnb 分享了其在应对‘观测性栈故障域与业务系统故障域耦合’这一经典挑战时的工程实践。当监控、告警和追踪系统所依赖的基础设施（如存储、网络、计算资源）与被监控的业务服务共享同一故障域时，业务系统故障往往会导致观测性工具同时失效，形成‘监控盲区’，极大阻碍故障排查和恢复。Airbnb 的解决方案核心是**故障域隔离**：1) 将核心观测性栈（指标采集、存储、查询引擎）部署在独立的物理/逻辑集群和网络分区中，与生产环境分离；2) 实施观测性栈自身的多层次健康监控，并设立独立的、不依赖观测性栈的‘心跳’告警通道（如基于外部探测点的简单HTTP检查）；3) 在观测性数据管道中引入**背压和优雅降级**机制，确保在存储或处理瓶颈时，关键 SLI 的数据不会丢失。量化结果：在后续的大规模生产中断事件中，隔离的观测性栈保持可用，使 MTTR 减少了约 60%，因为工程师能够持续获得故障现场的实时数据。该模式适用于任何规模可观、依赖中心化观测性平台的组织。"
commentary: "这是一篇极具实战价值的架构复盘。它将‘监控监控系统’这一理论问题，转化为具体的架构隔离和降级策略，为构建‘韧性观测性’提供了可直接参考的蓝图。"
publishDate: "2026-05-25T01:28:18.000Z"
---

