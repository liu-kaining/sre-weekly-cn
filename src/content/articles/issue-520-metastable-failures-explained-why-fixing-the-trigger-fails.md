---
title: "Metastable Failures Explained: Why Fixing the Trigger Fails"
titleCn: "解析亚稳态故障：为何修复触发点往往无效"
url: "https://read.thecoder.cafe/p/metastable-failures"
issueNumber: 520
issueDate: "2026-06-08T01:21:57.000Z"
category: "incident-report"
tags:
  - "亚稳态故障"
  - "故障模式"
  - "正反馈循环"
  - "混沌工程"
  - "系统韧性"
score: 10
summary: "A great into to the concept of metastable failures — and I recommend reading the original paper as well. Teiva Harsanyi"
summaryCn: "亚稳态故障是一类特殊且棘手的系统故障模式：一个短暂的触发事件（如网络闪断、一次配置推送）将系统推入一个“病态”的稳定状态，即使触发条件消除，系统也无法自愈。其根本原因在于系统内部存在正反馈循环或资源耗尽的“吸引子”状态。例如，一次网络抖动导致请求超时，客户端开始重试，重试流量进一步挤占带宽，导致更多超时和重试，形成雪崩。修复触发点（如修复网络）无法打破这个循环。识别亚稳态故障的关键指标是观察系统在触发事件消失后是否持续处于高错误率或高延迟状态。解决方案必须针对打破病态循环：1) 设计“熔断-重置”机制，当检测到可能进入亚稳态时（如重试风暴），主动切断正反馈循环（如暂停重试、丢弃队列）；2) 引入容量“安全边际”，确保在触发事件期间系统有足够缓冲吸收冲击；3) 使用混沌工程注入典型的触发事件（如短暂的服务降级），验证系统能否快速恢复而非陷入亚稳态。该模式适用于分布式缓存、消息队列、连接池管理等容易形成资源竞争的场景。"
commentary: "对亚稳态故障的深入理解是高级SRE的必备技能。本文清晰地解释了其机制，并指出了常见误区（只修触发点）。文中提出的“打破正反馈循环”是解决此类故障的核心模式，对于设计有韧性的分布式系统具有极高的参考价值。"
publishDate: "2026-06-08T01:21:57.000Z"
---

