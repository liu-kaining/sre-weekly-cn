---
title: "The Code Nobody Read Is Already in Production"
titleCn: "无人审查的代码正在生产环境中运行"
url: "https://www.runllm.com/blog/the-code-nobody-read-is-already-in-production"
issueNumber: 517
issueDate: "2026-05-18T02:29:57.000Z"
category: "reliability-engineering"
tags:
  - "AI代码生成"
  - "变更管理"
  - "可观测性"
  - "渐进式交付"
  - "SLO"
score: 9
summary: "[…] because AI tools continue to make it cheaper to write (and rewrite) code on demand, production environments will become the primary place to evaluate whether software is correct or incorrect. Peter Farago — RunLLM"
summaryCn: "随着AI代码生成工具（如Copilot）的普及，代码产出速度与成本大幅下降，导致传统的人工代码审查流程成为交付瓶颈。这引发了一个核心矛盾：生产环境正在逐步取代代码审查，成为验证软件正确性的主要场所。这一转变源于AI工具的特性——它们可以低成本、快速地生成和重写代码，但无法保证逻辑的绝对正确性。从SRE角度看，这直接威胁到变更管理（Change Management）的核心控制点。为应对此挑战，文章提出了一个关键理念：将验证流程从开发阶段左移至部署后。这意味着需要构建更强大的生产环境可观测性（Observability）体系，包括：1) 基于SLO的实时错误预算（Error Budget）监控，对异常变更触发即时回滚；2) 实施精细化的金丝雀发布（Canary Release）和渐进式交付（Progressive Delivery），将爆炸半径（Blast Radius）控制在最小范围；3) 利用特性开关（Feature Flags）实现动态代码隔离。量化目标是将错误引入生产环境的检测时间（MTTD）从小时级降至分钟级，并将错误变更的恢复时间（MTTR）控制在SLO消耗的速度之内。该模式适用于采用高频部署（如每日数十次）且拥有成熟CI/CD管道和强大可观测性基建的团队。"
commentary: "本文点出了AI时代软件工程的核心挑战——质量保证的重心后移。其提出的以生产环境监控为核心的验证模式，是传统“左移”理念的有力补充，对构建韧性交付体系有重要参考价值。"
publishDate: "2026-05-18T02:29:57.000Z"
---

