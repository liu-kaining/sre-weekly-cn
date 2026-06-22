---
title: "Meet Alice. Alice is impatient."
titleCn: "重新定义MTTR：用户感知与平均故障时长的偏差"
url: "http://brooker.co.za/blog/2026/06/19/waiting.html"
issueNumber: 522
issueDate: "2026-06-22T02:28:00.000Z"
category: "reliability-engineering"
tags:
  - "MTTR"
  - "SLO"
  - "User Perception"
  - "Reliability Metrics"
score: 9
summary: "An important concept: a user’s perception of your average outage duration is weighted and won’t match a flat average MTTR. Marc Brooker"
summaryCn: "传统上用于衡量服务可靠性的平均恢复时间（MTTR）指标，在统计上存在一个关键盲区：它无法准确反映终端用户的真实体验。本文通过“不耐烦的Alice”这一思想实验指出，用户感知到的服务中断时长是一个加权平均值，而非简单的算术平均值。具体而言，一次持续24小时的严重故障，其对用户体验的负面影响远超24次持续1小时的轻微故障。这意味着，即使一个服务的数学平均MTTR很低，如果其故障模式是“少数长尾、重大中断”，用户的满意度（可能关联到SLO违约）会急剧下降。技术上，这挑战了仅依赖单一平均值进行可靠性目标设定的做法。更科学的度量应结合故障的**爆炸半径（Blast Radius）**和**影响时长分布**，例如采用P90或P99的MTTR，或直接使用“每年总中断分钟数”等SLO/SLI。该分析对容量规划、错误预算（Error Budget）消耗模型和故障注入（Chaos Engineering）策略制定均有深远影响：测试应更侧重于重大故障场景的恢复能力。"
commentary: "文章用一个简洁的模型揭示了传统可靠性度量指标的根本缺陷。它迫使SRE重新思考如何定义和度量‘可靠性’，对于设计真正以用户为中心（User-centric）的SLO和优化故障恢复优先级具有颠覆性的实用价值。"
publishDate: "2026-06-22T02:28:00.000Z"
---

