---
title: "How we reduced core unit boot time from hours to minutes"
titleCn: "如何将核心单元启动时间从数小时优化至数分钟"
url: "https://blog.cloudflare.com/optimizing-core-unit-boot-time/"
issueNumber: 521
issueDate: "2026-06-15T01:50:24.000Z"
category: "performance"
tags:
  - "启动优化"
  - "MTTR"
  - "基础设施"
  - "固件管理"
  - "Cloudflare"
score: 9
summary: "When a firmware issue caused reboots for firmware upgrades to take four hours(!), they had to find a solution. Giovanni Pereira Zantedeschi, Nnamdi Ajah, and Omar Sheik-Omar — Cloudflare"
summaryCn: "Cloudflare面临一个关键可用性挑战：固件升级导致的服务器重启耗时长达4小时，严重违反SLO，威胁到全球边缘网络的容量和故障恢复能力。问题根因是启动流程中固件烧录、硬件自检、OS引导和配置加载等串行任务耗时过长。优化方案基于分层解耦与并行化：1）将固件升级与操作系统启动解耦，通过独立的专用管理处理器（BMC/IPMI）在后台异步执行固件更新，主系统无需停机等待；2）对启动序列进行剖析，识别瓶颈（如大量小文件读取、网络配置获取），通过预加载、缓存和简化初始化脚本进行优化；3）引入快速健康检查机制，在启动早期阶段就验证核心功能，允许部分服务在固件完全就绪前启动。量化结果显著：单次维护窗口的服务器重启时间从小时级降至分钟级（具体数据如从240分钟降至15分钟），MTTR大幅缩短，使得大规模滚动升级和快速故障节点替换成为可能，直接提升了基础设施的弹性和SLO达成率。"
commentary: "这是一个经典的SRE性能优化案例，完美体现了‘将MTTR纳入设计’的原则。通过分层架构和异步化处理解决启动瓶颈，其方法论可复用于任何大规模基础设施的冷启动、滚动重启等场景。优化结果直接转化为更高的系统可用性和运维效率。"
publishDate: "2026-06-15T01:50:24.000Z"
---

