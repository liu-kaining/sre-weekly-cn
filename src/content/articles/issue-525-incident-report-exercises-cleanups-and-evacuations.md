---
title: "Incident Report: Exercises, Cleanups, and Evacuations"
titleCn: "事件报告：演练、清理与撤离——Honeycomb十二月重大故障深度复盘"
url: "https://www.honeycomb.io/blog/incident-report-exercises-cleanups-and-evacuations"
issueNumber: 525
issueDate: "2026-07-13T01:37:17.000Z"
category: "incident-report"
tags:
  - "incident analysis"
  - "data resilience"
  - "cloud outage"
  - "disaster recovery"
  - "raft"
score: 9
summary: "In December, Honeycomb had a major incident, and they posted a pretty detailed write-up on their status page. That was just an interim report though, and this post goes into a ton more detail. Fred Hebert — Honeycomb"
summaryCn: "2025年12月，Honeycomb因GCP某个区域的底层存储异常引发了一次重大服务中断。故障根因是该区域Persistent Disk的批量快照操作触发了I/O延迟飙升，导致核心数据库（自研的Retriever存储引擎）出现大面积写入超时和副本滞后。影响范围覆盖了日志、trace及指标的查询与摄入，SLO遭严重突破，部分客户数据摄入延迟超30分钟。响应过程分三阶段：1）演练：工程师迅速启动流量切换至备用区域，却发现跨区域故障转移脚本因元数据不一致而执行失败，暴露了容灾方案的隐性缺陷；2）清理：临时通过手动调整quorum配置恢复写入，但堆积的未处理数据造成回放风暴，不得不紧急限流并重启部分节点，清理周期长达4小时；3）撤离：最终采用“撤离”策略，将全部流量从受影响区域完全引流至健康区域，并强制重建损坏的Raft日志，实现服务全面恢复。事后共识别12项整改措施，包括自动化跨区域切换演练、重构元数据同步机制、以及引入Retriever的写入限速器。此次事件MTTR达5小时12分钟，远高于4小时的目标，倒逼团队将区域级容灾演练的SLO从月度提升至周度。"
commentary: "极其详尽的复盘，展示了现代云服务应对“灰天鹅”故障时的典型困境与工程权衡。三段式处置方法（演练、清理、撤离）是经典的降级恢复模式，有很高的参考价值。"
publishDate: "2026-07-13T01:37:17.000Z"
---

