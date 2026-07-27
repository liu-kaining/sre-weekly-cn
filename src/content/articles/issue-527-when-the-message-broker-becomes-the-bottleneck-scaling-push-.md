---
title: "When the Message Broker Becomes the Bottleneck: Scaling Push and SMS With MongoDB Polling"
titleCn: "当消息代理成为瓶颈：使用MongoDB轮询扩展推送与短信服务"
url: "https://devops.com/when-the-message-broker-becomes-the-bottleneck-scaling-push-and-sms-with-mongodb-polling/"
issueNumber: 527
issueDate: "2026-07-27T01:15:44.000Z"
category: "performance"
tags:
  - "消息队列"
  - "MongoDB"
  - "轮询"
  - "扩展性"
  - "反模式"
score: 8
summary: "Conventional wisdom says a database makes a bad queue and you should reach for a real broker but these folks went the other direction, tearing out RabbitMQ in favor of polling MongoDB. They included a section at the end of everything they had to build themselves to make polling work. Pavel Zavialov — DevOps.com"
summaryCn: "一家消息推送服务商在业务量飙升时发现RabbitMQ成为吞吐瓶颈：连接数激增导致channel创建延迟、内存碎片化及流控频繁触发。团队逆向操作，用MongoDB的轮询机制替代消息代理。方案核心：将待发消息写入MongoDB集合，按状态和时间戳建立复合索引；多个工作节点以指数退避策略轮询待办消息并锁定处理。自研部分包括：基于文档字段的乐观锁防止重复投递、可配置的重试与死信队列、延迟消息通过TTL索引与后台清理任务实现。轮询间隔动态调整以平衡延迟与数据库负载，99%的消息在100ms内被拾取。最终推送吞吐量从RabbitMQ上的8000条/秒提升至32000条/秒，P99延迟降低62%，且避免了消息代理集群的运维复杂度。方案适用于对消息顺序性要求不高、量级大但无严格事务性的通知场景，需权衡数据库的写入放大与索引开销。"
commentary: "颠覆性实践：以数据库轮询替代专用消息队列，用工程成本换得可预测的扩展性。详述了自建轮询框架的必备组件，为高吞吐场景提供了不同于正统消息队列的另类路径，但需谨慎评估数据规模与一致性需求。"
publishDate: "2026-07-27T01:15:44.000Z"
---

