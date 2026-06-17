---
title: "On benchmarking"
titleCn: "论基准测试：策略、陷阱与工程实践"
url: "https://planetscale.com/blog/on-benchmarking"
issueNumber: 519
issueDate: "2026-06-01T02:22:16.000Z"
category: "performance"
tags:
  - "基准测试"
  - "容量规划"
  - "性能优化"
  - "延迟分析"
score: 7
summary: "A useful guide that covers strategies for benchmarking, along with pitfalls to avoid. Ben Dicken — PlanetScale"
summaryCn: "有效的基准测试是容量规划和性能优化的基础，但常因方法不当导致误导性结论。PlanetScale的指南强调，基准测试必须明确目标（是测吞吐量、延迟还是资源效率？），并构建贴近生产负载的工作负载模型，避免使用静态数据。关键策略包括：1）测试环境隔离，消除“邻居噪音”；2）预热（Warm-up）阶段，确保系统状态稳定；3）运行足够长时间以捕获稳态性能和垃圾回收等瞬态行为；4）测量百分位延迟（P99、P999）而非仅看平均值。常见陷阱包括：忽视冷启动成本、未模拟真实并发模式、以及忽略网络和存储IO瓶颈。文章建议使用迭代测试，逐步增加负载直至系统饱和，以找到性能拐点和潜在的单点故障。例如，在数据库基准测试中，应监控查询计划缓存、连接池饱和度和复制延迟等多个维度。这为SRE提供了科学评估系统性能、识别瓶颈并制定合理容量规划的实证方法。"
commentary: "这是一份非常实用的工程指南，将基准测试从“跑个数字”提升到系统性工程实践的高度，其强调的贴近生产、多维度测量和迭代分析对所有SRE都有指导意义。"
publishDate: "2026-06-01T02:22:16.000Z"
---

