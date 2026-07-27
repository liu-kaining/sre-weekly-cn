---
title: "The on-call cost of AI-generated code"
titleCn: "AI生成代码的On-Call隐形成本"
url: "https://greatcircle.com/blog/2026/06/09/on-call-cost-of-ai-generated-code/"
issueNumber: 527
issueDate: "2026-07-27T01:15:44.000Z"
category: "reliability-engineering"
tags:
  - "AI代码生成"
  - "On-Call"
  - "MTTR"
  - "可维护性"
  - "错误预算"
score: 8
summary: "The key question is, when that new code breaks in production at 3am, how well can the on-call engineers debug it? Brent Chapman"
summaryCn: "AI编码代理大幅提升功能交付速度，却将运维债务转移至值班团队。核心矛盾在于：机器生成的代码缺乏设计意图和背景注释，结构往往异常复杂，当凌晨3点生产环境出现故障时，值班工程师难以快速构建心智模型，导致MTTR陡增。大型代码库中，由AI协助提交的代码占比超过30%后，首次响应时间中位数上升了38%。此外，自动生成的重复模式代码容易放大单点故障的影响半径。降低该成本需从几点入手：1）将“可调试性”作为CI门禁，检查代码的Cyclomatic Complexity和日志完备率；2）强制AI生成部分附带测试用例和说明性注释；3）在SLO框架中引入“新代码SLO”，限制未经人工审查的特性的错误预算。此举本质是将可靠性责任前移，确保代码的“可拥有性”不因来源而妥协。"
commentary: "AI编码效率的背面是运维可理解性的缺失。文章尖锐地指出“廉价编写不等于廉价拥有”，警示组织在引入AI工具时必须同步升级可观测性与编码规范，否则MTTR的失控会吞噬所有速度红利。"
publishDate: "2026-07-27T01:15:44.000Z"
---

