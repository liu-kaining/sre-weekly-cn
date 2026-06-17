---
title: "A postmortem of our May 7, 2026 outage"
titleCn: "Coinbase 2026年5月7日宕机事故复盘"
url: "https://www.coinbase.com/blog/a-postmortem-of-our-may-7-2026-outage"
issueNumber: 520
issueDate: "2026-06-08T01:21:57.000Z"
category: "incident-report"
tags:
  - "postmortem"
  - "high-availability"
  - "fault-domain"
  - "failover"
  - "single-az"
  - "financial-systems"
score: 9
summary: "I enjoyed learning about their deliberate architectural choice to keep their central service in a single AZ. This incident highlighted a need for a fast failover plan. Coinbase"
summaryCn: "Coinbase 2026年5月7日发生的大规模服务中断，根源在于其核心交易服务被有意设计部署在单个可用区（AZ）。该设计初衷是利用AZ内网络延迟最低的优势，优化交易撮合性能，但将故障域（Blast Radius）限制在单一AZ内，导致该AZ内的网络故障（可能是底层ToR交换机或链路问题）直接引发全局服务不可用。此次事件暴露了在性能优化与可靠性保障之间的关键权衡。团队在事故后启动了快速故障转移（Fast Failover）方案的建设，目标是将主备AZ的切换时间从分钟级压缩至秒级。具体架构演进方向包括：1）在灾备AZ部署热备服务实例，通过持续数据同步（如基于WAL或消息日志）保持状态一致性；2）设计基于健康检查（如TCP连接、API端点延迟、错误率SLO）的自动故障检测与切换机制，避免依赖单一指标；3）引入流量控制，确保故障转移期间新交易请求能被安全路由至备用AZ。此案例为金融级交易系统在单AZ性能与多AZ高可用间的选择提供了经典参考，适用于对延迟极度敏感但需平衡可用性要求的场景。"
commentary: "此次复盘坦诚地揭示了有意识的架构权衡及其后果。它强调了即使是“有意为之”的单点故障域，也必须配备经过充分演练的、快速的故障转移预案。这是SRE关于故障域管理和“故障不可避免，响应决定成败”理念的生动实践。"
publishDate: "2026-06-08T01:21:57.000Z"
---

