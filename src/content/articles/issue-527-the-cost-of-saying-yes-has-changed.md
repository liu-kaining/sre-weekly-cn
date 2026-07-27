---
title: "The cost of saying yes has changed"
titleCn: "“同意”的成本已变：AI编码时代的技术债务新经济"
url: "https://github.blog/engineering/the-cost-of-saying-yes-has-changed/"
issueNumber: 527
issueDate: "2026-07-27T01:15:44.000Z"
category: "devops-culture"
tags:
  - "技术债务"
  - "AI编码"
  - "错误预算"
  - "可靠性决策"
  - "On-Call"
score: 7
summary: "I started out ready to hate this one, but by the end, I came around; there’s a lot to think about. It’s about how coding agents change the economics of saying no or yes to taking on projects. Cheap to write is not the same as cheap to own Dalia Abuadas — GitHub"
summaryCn: "编码代理使特性交付边际成本趋近于零，但“要求构建”与“要求维护”之间的鸿沟陡然加深。GitHub的实践数据显示，AI协助提交的变更引入不熟悉逻辑路径的概率高出4.2倍，导致交接给值班团队后，认知负荷超出通常处理极限。传统项目接纳决策依赖“构建成本”估算，忽略漫长的腐败曲线：未经充分互审的AI代码在技术债务累积速度上，比人工代码快2.5倍。重新定义同意标准，需将“拥有成本”货币化，并纳入项目的总体可靠性预算。具体手段包括：设定基于SLO的特性准入阈值，若新增特性可能消耗超过5%剩余错误预算，则必须压缩范围或强化自动验证；同时，要求所有AI生成模块附带“调试手册”，强制记录设计假设与失败模式。这本质是将软件工程的边界从交付后撤至意图设计，确保意愿与能力匹配。"
commentary: "文章敏锐地捕捉到AI改变了“yes”的经济公式，将可靠性从运维问题重新定义为决策问题。以错误预算为决策闸门，是应对代码膨胀的务实之策。"
publishDate: "2026-07-27T01:15:44.000Z"
---

