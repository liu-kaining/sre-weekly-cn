---
title: "Minus Two Minutes"
titleCn: "负两分钟：事故预测性检测的前置思维"
url: "https://read.zerosevzero.com/p/minus-two-minutes"
issueNumber: 527
issueDate: "2026-07-27T01:15:44.000Z"
category: "monitoring-observability"
tags:
  - "预测性告警"
  - "MTTD"
  - "SLO燃烧率"
  - "事故管理流程"
score: 7
summary: "Amazing idea: negative time to detection. It’s when you know an incident is coming even before the impact actually begins. Some incident management and metrics systems aren’t designed to track it, and some incident processes ignore or even penalize it. Tim Irving"
summaryCn: "传统监控的MTTD（平均检测时间）始终大于零，但“负两分钟”概念提出：通过预测性信号，在用户感知影响前即触发告警。实现依赖多维度的SLO燃烧率异常检测：当错误预算消耗速率出现非预期增长时，即便当前指标正常，也视为事故迫近。技术落地上，需将时间序列预测模型（如Holt-Winters、Prophet）与实时指标结合，在服务降级阈值前生成预警。然而，多数事故管理系统仅支持 “触发-响应” 模式，负时间检测容易被忽略或视为误报，部分流程甚至惩罚“过早”预警，压制了预防性行动。对此，需调整值班流程，将负向告警纳入低优先响应，并通过组合告警降噪，避免告警疲劳。该思维将可靠性实践从被动应急推向主动干预，尤其适用于流量脉冲型或依赖链复杂的系统，但要求团队具备成熟的指标预测能力与流程包容度。"
commentary: "该文提出的负向检测时间切中了传统监控的盲区，将预防置于响应之上，极具前瞻性。但落地关键不在于模型精度，而在于流程变革：如何让团队信任并积极处理“未发生的故障”信号，避免狼来了效应。"
publishDate: "2026-07-27T01:15:44.000Z"
---

