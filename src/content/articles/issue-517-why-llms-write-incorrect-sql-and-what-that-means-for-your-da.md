---
title: "Why LLMs Write Incorrect SQL (and What That Means for Your Database)"
titleCn: "LLM生成SQL的静默错误风险及数据库防线构建"
url: "https://readyset.io/blog/why-llms-write-incorrect-sql-and-what-that-means-for-your-database"
issueNumber: 517
issueDate: "2026-05-18T02:29:57.000Z"
category: "security-reliability"
tags:
  - "LLM"
  - "SQL"
  - "数据库可靠性"
  - "查询性能"
  - "安全护栏"
score: 7
summary: "It’s not about obviously wrong stuff — it’s the queries that look good on the surface that can bet you in trouble, per this article. They also share methods to vet LLM-generated SQL. Readyset"
summaryCn: "大型语言模型（LLM）生成的SQL可能包含逻辑正确但性能或安全性堪忧的“静默错误”，如缺少索引提示、产生隐式笛卡尔积或忽略事务隔离级别。这些查询在测试数据集上能返回正确结果，但在生产环境的大数据量和并发负载下会导致性能劣化（如全表扫描）或数据不一致。风险根因在于LLM缺乏对具体数据库schema、数据分布、索引策略和业务约束的上下文理解。防御体系需构建多层验证：1) 静态分析层，使用SQLlint工具（如sqlfluff）检查语法和最佳实践；2) 模拟执行层，在数据库只读副本或影子环境（Shadowing）中执行查询，评估执行计划（EXPLAIN）和资源消耗，设置查询延迟（P99）和扫描行数的SLO告警；3) 权限与护栏层，为AI生成的查询应用最小权限原则，并设置查询超时和结果集大小限制。例如，一个由LLM生成的连接查询因未指定索引导致生产数据库CPU飙升90%，通过在影子环境中执行并分析执行计划，可在部署前识别此类风险。该模式适用于任何使用AI辅助生成数据库查询的场景。"
commentary: "文章揭示了在AI生成代码时代，传统代码审查之外新增的“查询验证”防线的重要性。提出的三层防御（静态、模拟、权限）是保障数据库可靠性的实用框架，尤其对探索AI编程助手的团队具有警示和指导意义。"
publishDate: "2026-05-18T02:29:57.000Z"
---

