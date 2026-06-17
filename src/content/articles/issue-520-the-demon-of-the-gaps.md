---
title: "The demon of the gaps"
titleCn: "差距中的恶魔"
url: "https://surfingcomplexity.blog/2026/06/06/the-demon-of-the-gaps/"
issueNumber: 520
issueDate: "2026-06-08T01:21:57.000Z"
category: "reliability-engineering"
tags:
  - "resilience-engineering"
  - "systems-thinking"
  - "postmortem"
  - "human-error"
  - "complexity"
  - "culture"
score: 8
summary: "I’m not gonna spoil this one for you by writing a summary. Just read it, trust me. Lorin Hochstein"
summaryCn: "本文深入探讨了复杂系统故障分析中一个根本性挑战：我们常将未知或未充分理解的故障原因归咎于一个模糊的“差距”（Gaps），并试图通过增加更多控制、监控或流程来“填补”它，却可能引入新的复杂性和未知风险。作者类比“神明的差距”（God of the gaps）这一概念，指出在SRE实践中，我们有时会创造一个“差距中的恶魔”，即简单地将人因失误（Human Error）、流程漏洞或未知故障模式归为一个笼统的类别，然后施加标准化的修复方案（如增加审批、加更严的变更管理）。这种做法可能掩盖了系统内在的复杂性、非线性交互以及组织文化等深层因素。文章主张，有效的故障分析应超越寻找单一的“根本原因”，转而采用“系统性思维”和“韧性工程”（Resilience Engineering）视角，关注系统各组件（包括人）之间如何协作、适应和演变。具体方法包括：1）在事故复盘中探索“工作如想象”（Work as Imagined）与“工作如实践”（Work as Done）之间的差距；2）分析决策链条中的信息流和约束条件；3）承认并研究系统的“正常工作”（Normal Work）以理解其如何在日常变化中保持稳定。此理念适用于成熟SRE团队进行深度事故复盘，以避免落入“ blame culture”和表面化修复的陷阱。"
commentary: "Lorin Hochstein 的文章总是直击SRE哲学的核心。本文挑战了我们在事故后急于寻找“简单答案”和“快速修补”的本能，倡导对复杂系统进行更深入、更具同理心的分析，这对于构建真正有韧性的组织文化至关重要。"
publishDate: "2026-06-08T01:21:57.000Z"
---

