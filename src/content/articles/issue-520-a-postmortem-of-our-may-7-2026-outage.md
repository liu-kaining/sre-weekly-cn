---
title: "A postmortem of our May 7, 2026 outage"
titleCn: "Coinbase 2026年5月7日故障事后复盘报告"
url: "https://www.coinbase.com/blog/a-postmortem-of-our-may-7-2026-outage"
issueNumber: 520
issueDate: "2026-06-08T01:21:57.000Z"
category: "incident-report"
tags:
  - "故障复盘"
  - "高可用设计"
  - "故障转移"
  - "可用区"
  - "架构权衡"
score: 8
summary: "I enjoyed learning about their deliberate architectural choice to keep their central service in a single AZ. This incident highlighted a need for a fast failover plan. Coinbase"
summaryCn: "Coinbase在2026年5月7日发生了一次影响广泛的可用性故障，其核心根因暴露了有意为之的架构设计在故障场景下的脆弱性。团队为了简化运维和保持数据强一致性，主动将核心交易服务部署在单可用区（AZ）内。当该AZ发生网络分区或底层硬件故障时，该服务完全不可用，导致交易中断。此次故障凸显了缺乏快速故障转移（Failover）预案的严重风险。复盘的关键技术方案包括：1) 制定并演练基于DNS或负载均衡器的、分钟级完成的AZ切换预案；2) 在单AZ部署模式下，强化跨AZ的依赖服务（如数据库）的异步复制，以减少数据丢失风险（RPO）；3) 引入更精细的、基于服务级别的SLO监控，而非仅依赖基础设施指标。此次故障的量化影响是核心交易服务不可用约35分钟，Error Budget完全耗尽。该案例的工程价值在于警示：在简化架构与故障域隔离之间必须做出明确权衡，并为任何单点故障都需准备可快速执行的、经过演练的降级或转移方案。"
commentary: "此复盘报告直指分布式系统设计中一个经典且高风险的权衡：为一致性或复杂性而牺牲故障域隔离。其价值不在于提出了新理论，而在于用一次真实的大规模故障，强制团队补全了关键的快速故障转移能力。对所有将关键服务置于单AZ/Region的团队都是一个严肃警示。"
publishDate: "2026-06-08T01:21:57.000Z"
---

