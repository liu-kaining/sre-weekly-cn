---
title: "Why LLMs Write Incorrect SQL (and What That Means for Your Database)"
titleCn: "为何LLM会生成错误的SQL（以及这对你的数据库意味着什么）"
url: "https://readyset.io/blog/why-llms-write-incorrect-sql-and-what-that-means-for-your-database"
issueNumber: 517
issueDate: "2026-05-18T02:29:57.000Z"
category: "reliability-engineering"
tags:
  - "LLM"
  - "SQL优化"
  - "数据库可靠性"
  - "查询代理"
  - "AI安全"
score: 7
summary: "It’s not about obviously wrong stuff — it’s the queries that look good on the surface that can bet you in trouble, per this article. They also share methods to vet LLM-generated SQL. Readyset"
summaryCn: "大语言模型（LLM）辅助生成SQL已成为趋势，但其生成的查询往往存在隐蔽性错误，可能引发数据库性能骤降甚至数据不一致风险。文章分析了LLM生成错误SQL的深层原因：1) 上下文缺失：LLM无法获知实时的表统计信息（如行数、数据分布）、索引详情和查询计划，可能生成看似正确但执行效率极低的查询（如全表扫描、缺失索引的JOIN）；2) 语法与语义混淆：LLM擅长生成语法正确的SQL，但对业务逻辑的微妙区别（如NULL值处理、边界条件）理解不足；3) 幻觉：可能虚构不存在的表名或函数名。这为SRE和DBA带来了新的可靠性挑战——如何审计和保障AI生成的查询。文章提出可行的保障策略：a) 在数据库前部署查询代理或优化器（如ReadySet），对LLM生成的SQL进行自动分析、重写和优化，强制应用最佳执行计划；b) 建立“AI生成SQL”的沙箱环境，进行影响分析和性能基准测试；c) 将查询审查集成到CI/CD流水线，通过静态分析工具检查潜在问题。该方法旨在为LLM与数据库的交互建立一道“可靠性防火墙”。"
commentary: "文章前瞻性地指出了LLM应用落地中的可靠性盲区。其提出的“查询代理”模式，为如何安全地将AI融入核心数据链路提供了具体的工程思路，对保障数据库层SLO具有现实意义。"
publishDate: "2026-05-18T02:29:57.000Z"
---

