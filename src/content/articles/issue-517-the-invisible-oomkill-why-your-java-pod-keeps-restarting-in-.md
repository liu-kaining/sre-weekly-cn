---
title: "The Invisible OOMKill: Why Your Java Pod Keeps Restarting in Kubernetes"
titleCn: "隐形的OOMKill：为何你的Java Pod在Kubernetes中不断重启"
url: "https://feeds.dzone.com/link/23568/17323659/java-pod-oomkill-kubernetes"
issueNumber: 517
issueDate: "2026-05-18T02:29:57.000Z"
category: "performance"
tags:
  - "Kubernetes"
  - "Java"
  - "OOMKill"
  - "内存管理"
  - "容器化"
  - "故障排查"
score: 8
summary: "Java uses memory outside of the heap, so it can OOM in a container even if the heap size is well below the container’s memory limit. Ramya vani Rayala — DZone"
summaryCn: "本文解释了在Kubernetes环境中，Java应用Pod频繁因OOM（内存不足）被杀死的一个常见却易被忽视的原因：Java进程使用的内存不仅仅包括堆内存，还包含大量的非堆内存（如Metaspace、线程栈、JIT编译缓存等）。仅监控堆内存并设置容器内存限制，很可能导致容器总内存超限而被kubelet终止。文章提供了诊断和规避此问题的具体方法，例如使用Native Memory Tracking工具。"
commentary: "这是一篇非常实用的故障排查指南，针对容器化Java应用的常见陷阱。它提醒SRE在配置资源限制和监控时，必须理解应用（特别是JVM）的完整内存模型，而不仅仅是应用层面的堆设置，具有很强的实践指导意义。"
publishDate: "2026-05-18T02:29:57.000Z"
---
