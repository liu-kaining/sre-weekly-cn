---
title: "How incidents can teach us about what’s already working well"
titleCn: "如何从事故中洞察系统已有的韧性设计"
url: "https://surfingcomplexity.blog/2026/05/02/how-incidents-can-teach-us-about-whats-already-working-well/"
issueNumber: 517
issueDate: "2026-05-18T02:29:57.000Z"
category: "reliability-engineering"
tags:
  - "事故复盘"
  - "韧性工程"
  - "故障域"
  - "架构评估"
  - "积极信号"
score: 8
summary: "I had to read this one twice before I had my galaxy-brain moment in the second-to-last paragraph. Lorin Hochstein"
summaryCn: "传统的事故复盘（Post-mortem）聚焦于“什么出了故障”，本文则提供了一种逆向分析框架：通过事故，反向识别系统中“已经运行良好”的机制。作者Lorin Hochstein指出，事故的发生往往不是因为所有防御都失效了，而是某些防御机制成功地限制了爆炸半径，避免了更严重的后果。SRE工程师应关注这些“沉默的胜利”（Silent Wins）。例如，一个数据库主节点故障导致了性能降级，但读写分离架构（Read-Write Splitting）和缓存层（Cache Layer）成功地将服务维持在可用状态，这就是一个积极信号。工程实践上，这意味着事后复盘的文档模板（Post-mortem Template）应增加一个固定章节：“系统韧性表现”（Resilience Performance），专门记录在事故期间，哪些预设的故障域（Fault Domain）隔离、降级开关（Degradation Switches）、冗余路径（Redundant Paths）或自动恢复机制（Auto-healing）起到了积极作用。通过积累此类数据，团队可以量化评估现有架构的韧性资产（Resilience Assets），为未来的容量规划（Capacity Planning）和架构演进提供可靠依据，而非仅仅关注缺陷。该方法论适用于所有拥有复杂分布式系统的组织。"
commentary: "这篇反思性文章为SRE的事故复盘文化提供了至关重要的补充视角。它倡导从单纯的“找问题”转向“验证设计”，有助于培养更全面、更积极的系统认知，是构建工程信心的高级实践。"
publishDate: "2026-05-18T02:29:57.000Z"
---

