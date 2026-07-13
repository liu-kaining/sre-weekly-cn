---
title: "Core dump epidemiology: fixing an 18-year-old bug"
titleCn: "核心转储流行病学：如何修复一个潜伏18年的bug"
url: "https://openai.com/index/core-dump-epidemiology-data-infrastructure-bug/"
issueNumber: 525
issueDate: "2026-07-13T01:37:17.000Z"
category: "reliability-engineering"
tags:
  - "debugging"
  - "core dump analysis"
  - "kernel bug"
  - "fleet observability"
  - "netfilter"
score: 9
summary: "They had a weird problem, and they only really got to the bottom of it when they zoomed out and looked at the effects at the fleet level. Nathan Bronson — OpenAI"
summaryCn: "OpenAI的数据基础设施集群长期被间歇性的进程core dump困扰，单个节点的崩溃看似随机，频率低且难以复现。Nathan Bronson团队采用“流行病学”方法，从集群维度收集了数千份core dump进行分析，通过聚合崩溃栈、主机内核版本、时序模式等特征，发现了一个具有高度统计相关性的模式：崩溃集中发生在使用特定TCP选项的节点上，且系统日志中出现“kernel: nf_conntrack: table full”的罕见告警。进一步深挖，定位到Linux内核中一个自2.6时代就存在的netfilter conntrack竞争条件：当连接跟踪表满载时，某些竞态操作会导致引用计数错误，进而引发随机内存损坏和进程崩溃。该bug潜伏18年未被发现，是因为触发条件苛刻：需要极高的连接速率、特定的网络命名空间配置以及正好填满的连接跟踪表。修复后，集群中此类崩溃从每周数百次降为零，同时将netfilter conntrack相关内核参数（如nf_conntrack_max、hashsize）纳入基础设施的标准化配置基线。该案例揭示了大规模环境下的调试必须超越单机视角，利用海量集体数据才能捕获稀有事件的根本原因。"
commentary: "教科书级的大规模系统调试案例。将core dump作为“流行病”进行流行病学分析，提供了在复杂分布式系统中寻找长尾bug的工程范式，值得所有SRE借鉴。"
publishDate: "2026-07-13T01:37:17.000Z"
---

