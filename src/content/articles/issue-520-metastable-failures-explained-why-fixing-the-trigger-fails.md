---
title: "Metastable Failures Explained: Why Fixing the Trigger Fails"
titleCn: "解读亚稳态故障：为何仅修复触发条件无法根治问题"
url: "https://read.thecoder.cafe/p/metastable-failures"
issueNumber: 520
issueDate: "2026-06-08T01:21:57.000Z"
category: "reliability-engineering"
tags:
  - "亚稳态故障"
  - "根因分析"
  - "负载削减"
  - "重试风暴"
  - "系统韧性"
score: 9
summary: "A great into to the concept of metastable failures — and I recommend reading the original paper as well. Teiva Harsanyi"
summaryCn: "亚稳态故障是一类特殊的系统故障模式，其特征是：系统因一个临时扰动（触发器，如瞬间流量尖峰）进入一种高资源消耗或功能降级的“亚稳态”，即使触发器消失，系统也无法自动恢复，反而维持在该故障状态。这种现象的根因在于系统内部存在正反馈循环。例如，请求延迟增加 → 客户端重试 → 负载进一步增加 → 延迟更高，形成一个自持的恶性循环。文章以排队论和缓存雪崩为例进行说明：当一个缓存层失效时，请求直接穿透至数据库，导致数据库CPU飙升、查询延迟剧增。此时，即使缓存恢复，大量因超时而重试的请求仍持续冲击数据库，使系统无法回落至正常状态。仅修复触发器（如缓存预热）是无效的，因为正反馈循环已建立。根本解决方案是打破正反馈循环：1）引入随机化的、指数退避的重试机制；2）实施严格的、基于过载信号的全局负载削减（Load Shedding）；3）设计容量恢复机制，如分阶段逐步恢复流量而非一次性切换。该概念对理解云原生环境中因自动扩缩、重试风暴等引发的级联故障至关重要。"
commentary: "对亚稳态故障的清晰阐释是高级SRE必须掌握的核心概念。文章从系统理论角度分析了根因，并给出的打破反馈循环的具体工程模式（退避、负载削减）是预防此类灾难性故障的关键，实践指导性极强。"
publishDate: "2026-06-08T01:21:57.000Z"
---

