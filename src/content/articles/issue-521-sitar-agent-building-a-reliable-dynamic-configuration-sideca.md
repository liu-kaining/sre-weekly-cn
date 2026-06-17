---
title: "Sitar-agent: Building a reliable dynamic configuration sidecar at scale"
titleCn: "Sitar-agent：大规模构建可靠的动态配置Sidecar"
url: "https://medium.com/airbnb-engineering/sitar-agent-building-a-reliable-dynamic-configuration-sidecar-at-scale-b7e00c152068"
issueNumber: 521
issueDate: "2026-06-15T01:50:24.000Z"
category: "platform-engineering"
tags:
  - "配置管理"
  - "Sidecar"
  - "Kubernetes"
  - "平台工程"
  - "Airbnb"
score: 9
summary: "How Airbnb built a Kubernetes sidecar to deliver dynamic configuration reliably at scale. Bo Teng — Airbnb"
summaryCn: "Airbnb为解决大规模Kubernetes环境中动态配置（如功能开关、灰度发布策略、服务参数）的可靠分发问题，构建了名为Sitar-agent的专用Sidecar。核心挑战在于保证配置变更的最终一致性、低延迟推送以及与容器生命周期的优雅协同。技术架构包含：1）控制平面：一个高可用配置服务，存储配置版本和发布策略，通过Watch机制监听变更；2）数据平面：作为Sidecar部署的Sitar-agent，与配置服务建立长连接或使用推送/拉取混合模式获取更新，并在本地缓存；3）可靠性设计：采用基于Quorum的配置版本校验，防止脑裂；实现优雅的配置回滚机制，当新配置导致健康检查失败时自动回退；通过与Kubernetes的Readiness Probe集成，确保配置未就绪的应用Pod不会接收流量。该方案在Airbnb数千个服务、数万个Pod的规模下运行，实现了配置变更的秒级传播和99.99%的分发可靠性，并显著降低了因手动配置错误导致的事故。"
commentary: "Airbnb的Sitar-agent是平台工程领域的优秀实践。它将动态配置管理这一常见需求，通过Sidecar模式抽象为标准化、高可靠的平台服务。其关键设计点——版本校验、优雅回滚与探针集成——是构建任何关键业务配置下发系统都值得参考的模式。"
publishDate: "2026-06-15T01:50:24.000Z"
---

