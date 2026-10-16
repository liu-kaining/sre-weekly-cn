# 14｜术语与官方学习资料

[返回阅读入口](README.md)

资料核对日期：2026-10-16。下面以官方规范、产品文档和项目仓库为入口。使用 `stable`、`latest` 或 `main` 的页面会随时间变化，实际操作时切换到已安装版本。

## 1. 术语速查

| 术语 | 本指南中的含义 | 相关章节 |
|---|---|---|
| DevOps | 强调开发与运维协作、自动化与反馈的一组实践；岗位范围需看实际职责 | 01、11 |
| 研发效能平台 | 支撑开发、测试、交付与反馈的内部平台，可覆盖多个系统 | 01、11 |
| 平台工程 | 把公共能力作为面向内部用户的产品持续提供和改进 | 11 |
| IDP | Internal Developer Platform；具体包含什么需看团队定义 | 11 |
| 开发者门户 | 集中发现服务、文档、工具和流程的入口 | 11 |
| PR／MR | 提议合并代码的协作对象 | 03 |
| Webhook | 外部系统在事件发生时向约定入口推送通知 | 03、04 |
| CI | Continuous Integration，持续集成 | 04 |
| CD：持续交付 | Continuous Delivery，变更保持可交付，生产决策可人工执行 | 07 |
| CD：持续部署 | Continuous Deployment，满足规则的变更自动进入生产 | 07 |
| Pipeline | 流水线；要区分定义和一次执行 | 04 |
| Runner／Agent | 执行具体任务的资源或进程，术语依产品 | 04 |
| DAG | 有向无环图，表达任务依赖 | 04 |
| Artifact | 构建或任务产生、需要保存和传递的制品 | 05 |
| OCI | 容器相关规范体系，本指南主要涉及镜像与仓库交互 | 05 |
| Tag | 便于阅读的制品标签，是否可变取决于策略 | 05 |
| Digest | 内容摘要，用于固定具体内容 | 05 |
| SBOM | Software Bill of Materials，软件组件清单 | 05 |
| Provenance | 关于构建来源、过程和输入的证明信息 | 05 |
| Gate | 进入下一步必须满足的门禁条件 | 04、06、08 |
| IaC | Infrastructure as Code，基础设施即代码 | 07 |
| GitOps | 以版本管理中的声明式期望状态等机制驱动运行状态对齐的实践 | 07 |
| Reconciliation | 对账／调谐：比较已知、期望和实际状态并推进收敛 | 07、11 |
| Rolling | 逐批替换实例的滚动更新 | 08 |
| Blue-green | 蓝绿：准备两组版本并切换入口 | 08 |
| Canary | 金丝雀／灰度：先对部分流量或用户验证 | 08 |
| Feature Flag | 功能开关，控制已部署功能的开放 | 08 |
| Smoke Test | 冒烟测试，验证少量关键路径 | 06、08 |
| Probe | 探针，对启动、就绪或存活状态做特定检查 | 07、09 |
| Metrics／Logs／Traces | 指标、日志、链路，三类常用可观测数据 | 09 |
| SLI／SLO／SLA | 服务指标、内部目标、对外服务约定 | 09 |
| P95 | 95 分位值；尾延迟的估计依赖样本与统计方式 | 09 |
| Cardinality | 基数；指标标签组合会影响时间序列数量 | 09 |
| On-call | 值班响应机制 | 09 |
| Runbook | 可执行的排障、恢复与升级操作说明 | 09 |
| DORA | 软件交付研究及相应绩效度量体系 | 10 |
| Idempotency | 幂等：重复处理同一操作意图时，按定义避免重复副作用 | 03、11 |
| Outbox | 把领域变化和待发事件在同一数据库事务中保存，再可靠投递的设计 | 07、11 |
| Fencing Token | 区分新旧执行权限的递增标识等机制，用于拒绝过期执行者 | 07、11 |

## 2. 按阶段查官方资料

### 需求、设计与代码协作

- [OpenProject](https://www.openproject.org/)：项目与工作管理。
- [Plane Open Source](https://plane.so/open-source)：开源项目管理版本及功能边界。
- [OpenAPI Initiative](https://www.openapis.org/what-is-openapi)：API 契约规范与定位。
- [Mermaid](https://mermaid.js.org/intro/)：文本图示。
- [Gitea](https://docs.gitea.com/)：代码托管、协作与集成。
- [GitLab FOSS](https://gitlab.com/gitlab-org/gitlab-foss)：GitLab 开源部分说明。
- [GitLab MR Pipelines](https://docs.gitlab.com/ci/pipelines/merge_request_pipelines/)：MR 验证对象与相关能力。

### CI 与制品

- [Jenkins Pipeline](https://www.jenkins.io/doc/book/pipeline/)：概念。
- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)：配置语法。
- [GitLab Pipelines](https://docs.gitlab.com/ci/pipelines/)：任务、执行器与类型。
- [GitLab Pipeline Security](https://docs.gitlab.com/ci/pipeline_security/)：代码信任与凭据。
- [Tekton](https://tekton.dev/docs/)：云原生流水线。
- [Harbor](https://goharbor.io/docs/main/)：OCI 仓库与策略。
- [Harbor 不可变标签](https://goharbor.io/docs/main/working-with-projects/working-with-images/create-tag-immutability-rules/)。
- [Gitea Packages](https://docs.gitea.com/usage/packages/overview)：包管理。
- [OCI Image Specification](https://github.com/opencontainers/image-spec/blob/main/descriptor.md)：摘要与内容描述。
- [Dependency-Track](https://github.com/DependencyTrack/dependency-track)：SBOM 与组件风险。
- [SLSA Provenance](https://slsa.dev/spec/v1.1/provenance)：构建来源证明规范。
- [Sigstore Cosign](https://docs.sigstore.dev/cosign/signing/overview/)：签名与验证。

### 测试

- [Testcontainers](https://testcontainers.com/)：测试依赖。
- [Pact](https://docs.pact.io/)：契约测试。
- [k6](https://grafana.com/docs/k6/latest/)：负载与性能验证。
- [k6 Thresholds](https://grafana.com/docs/k6/latest/using-k6/thresholds/)：阈值判断。
- [Playwright](https://playwright.dev/docs/intro)：浏览器端到端测试。

### 部署与生产发布

- [Kubernetes Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)：更新与状态。
- [Kubernetes Probes](https://kubernetes.io/docs/concepts/workloads/pods/probes/)：探针。
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)：敏感配置。
- [Kustomize](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/)：配置覆盖。
- [Helm Charts](https://helm.sh/docs/topics/charts/)：应用打包与参数。
- [Argo CD Auto Sync](https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/)：GitOps 同步。
- [Argo Rollouts Analysis](https://argoproj.github.io/argo-rollouts/features/analysis/)：渐进发布分析。
- [Argo Rollouts Traffic Management](https://argoproj.github.io/argo-rollouts/features/traffic-management/)：流量管理。
- [Apache APISIX](https://apisix.apache.org/docs/apisix/getting-started/README/)：网关。
- [Unleash](https://docs.getunleash.io/)：功能开关。
- [Ansible](https://docs.ansible.com/projects/ansible/latest/getting_started/index.html)：主机与系统自动化。
- [OpenTofu](https://opentofu.org/docs/)：基础设施即代码。
- [kind Quick Start](https://kind.sigs.k8s.io/docs/user/quick-start/)：本地 Kubernetes 练习。

### 运行态、平台与效能

- [Google SRE：Service Level Objectives](https://sre.google/sre-book/service-level-objectives/)：服务目标。
- [OpenTelemetry](https://opentelemetry.io/docs/what-is-opentelemetry/)：可观测数据的生成与传递。
- [Prometheus Overview](https://prometheus.io/docs/introduction/overview/)：指标系统。
- [Prometheus Instrumentation](https://prometheus.io/docs/practices/instrumentation/)：插桩原则。
- [Prometheus Histograms](https://prometheus.io/docs/practices/histograms/)：延迟分布与统计。
- [Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/)：告警通知。
- [Grafana OSS](https://grafana.com/oss/)：可视化与开源产品入口。
- [Jaeger](https://www.jaegertracing.io/docs/)：链路后端。
- [Backstage Software Catalog](https://backstage.io/docs/features/software-catalog/)：服务目录。
- [DORA Metrics](https://dora.dev/guides/dora-metrics/)：五项交付绩效指标及使用建议。
- [DORA Metrics History](https://dora.dev/insights/dora-metrics-history/)：指标演变。
- [Apache DevLake](https://github.com/apache/devlake)：研发数据集成与度量。

## 3. 选择项目时怎样核对

先看项目承担的能力，再检查：

1. 使用的版本、开源许可证和商业功能边界。
2. 身份、权限、执行隔离和凭据管理。
3. 外部 API、事件、状态和恢复机制。
4. 自己团队的环境、规模、维护成本与升级路径。
5. 是否需要整个平台，还是只需接入其中一个模块。

本文优先介绍能力与概念，没有指定“所有团队都应该使用”的统一工具栈。正式选型还应根据实际约束单独评估。
