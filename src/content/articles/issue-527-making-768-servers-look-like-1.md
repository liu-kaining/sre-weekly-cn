---
title: "Making 768 servers look like 1"
titleCn: "768台服务器化为一个逻辑实例：PostgreSQL分片深度解析"
url: "https://planetscale.com/blog/making-768-servers-look-like-1"
issueNumber: 527
issueDate: "2026-07-27T01:15:44.000Z"
category: "performance"
tags:
  - "分片"
  - "PostgreSQL"
  - "Vitess"
  - "在线重分片"
  - "水平扩展"
score: 8
summary: "An in-depth introduction to sharding in PostgreSQL. Sure, you probably know all about sharding, but I definitely learned some interesting bits from this one even so. Ben Dicken — PlanetScale This article is published by this issue’s sponsor, but their sponsorship did not influence its inclusion in the newsletter."
summaryCn: "PlanetScale基于Vitess实现的PostgreSQL分片方案，将768个物理分片抽象成统一接入层，支撑数十TB级数据集与数百万QPS。其架构核心是VTGate无状态代理，负责SQL解析、执行计划路由，以及对跨分片JOIN的自动拆解与重排。分片键的选择采用多层映射：应用定义逻辑Shard Key，由VSchema映射到物理键空间；结合Lookup VIndex处理非键查询，避免散射。弹性扩展方面，采用在线重分片（Resharding），通过低水位拷贝与变更流追平，将迁移代价控制在Follower延迟3秒以内，切换窗口实现亚秒级。为保障可靠性，引入基于Raft的元数据集群与主动健康检查：单分片故障时，VTOrc自动触发60秒内的Leader转移，避免人工分片。该方案将分布式数据库的运维复杂度内化至管控平面，使应用感知如同单节点，同时SLO达成率保持在99.95%以上。"
commentary: "此方案对熟知分片原理的工程师仍有启发，尤其是Lookup VIndex和在线重分片的低切换窗口设计，将分片运维从高端技艺转化为平台能力，显著降低了大规模数据存储的可靠性风险。"
publishDate: "2026-07-27T01:15:44.000Z"
---

