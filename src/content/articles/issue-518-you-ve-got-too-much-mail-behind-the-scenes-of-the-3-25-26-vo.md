---
title: "You’ve Got (Too Much) Mail: Behind the Scenes of the 3/25/26 Voice Outage"
titleCn: "邮件泛滥：Discord 3/25-26语音服务中断事故深度复盘"
url: "https://discord.com/blog/behind-the-scenes-of-the-3-25-26-voice-outage"
issueNumber: 518
issueDate: "2026-05-25T01:28:18.000Z"
category: "incident-report"
tags:
  - "级联故障"
  - "协议健壮性"
  - "限流"
  - "混沌工程"
  - "长尾依赖"
score: 9
summary: "In this post, we’ll peek behind the curtain and see how one seemingly innocuous change overwhelmed a system multiple hops away and how our not-fun afternoon helped us improve Discord. Discord"
summaryCn: "Discord在一次看似无害的变更后，遭遇了级联式故障，导致其核心语音服务长时间中断。事故根因是一个旨在优化连接的客户端变更，在特定网络条件下触发了海量的、格式错误的STUN（会话穿越工具）重试请求。这些无效请求并未被源头系统拦截，反而穿透多个网络跳数，最终汇聚并压垮了负责分配语音服务器的中央调度系统（Router）。调度系统在过载后无法响应新的语音连接请求，造成服务完全不可用。此次事件暴露了深层次的架构风险：缺乏有效的跨系统请求协议版本校验、源端对畸形数据包的防御不足，以及关键基础设施（调度器）缺乏按客户端来源进行流量隔离和限流的能力。MTTR（平均修复时间）主要耗费在定位这个跨越了客户端、网络和核心服务多个领域的非直觉性故障模式上。解决方案包括在客户端和服务器端增加严格的协议验证、为调度器实施基于源IP或客户端ID的精细化限流策略，并加强全链路混沌工程测试，模拟上游组件产生畸形流量的场景。此案例凸显了在分布式系统中，一个微小的、未经充分隔离测试的变更，如何通过长尾的依赖链演变为全局性故障。"
commentary: "这是一个经典的“蝴蝶效应”式故障案例，深刻展示了协议健壮性、端到端验证和基础设施韧性的重要性。它提醒SRE，任何变更的风险评估都必须考虑其潜在的下游放大效应，尤其要为关键服务组件设计防火隔离墙。"
publishDate: "2026-05-25T01:28:18.000Z"
---

