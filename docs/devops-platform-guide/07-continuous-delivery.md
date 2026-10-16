# 07｜CD：持续交付、环境与部署

[返回阅读入口](README.md) · [下一章：生产发布](08-production-release.md)

## 1. 输入、产出与重点

输入是已识别的制品、目标环境、部署定义、配置与授权；产出是目标环境中的实际版本及其状态证据。

本章采用可保留人工生产决策的持续交付模型。持续部署进一步把满足条件的变更自动送入生产。是否全自动取决于风险、验证能力和团队选择。

平台研发要保证“发布哪个内容、到哪个环境、使用什么配置、结果怎样”都明确可查。

## 2. 谁负责

业务团队确认部署内容、配置需求和业务风险。平台团队维护环境模型、部署入口、编排和状态反馈。基础设施团队管理集群、网络、存储等底座。SRE 按组织分工参与运行标准、容量和生产稳定性。

生产操作的发起人、批准人和执行身份需要可识别。审批应绑定具体变更内容，制品或配置变化后应重新判断审批是否有效。

## 3. 先分清四种对象

| 对象 | 表达什么 | 本案例 |
|---|---|---|
| 制品 | 要运行的内容 | `order-service` 的镜像摘要 |
| 环境 | 运行在哪里、依赖什么 | 测试／预发／生产，各自的集群、权限与数据库 |
| 部署定义与配置 | 怎样运行 | 副本数、资源、端口、探针、数据库连接和配置版本 |
| 部署执行 | 一次从当前状态到目标状态的操作 | 某次把测试环境切换到指定摘要 |

镜像相同而配置不同，行为仍然可能不同。因此交付证据应覆盖“制品＋部署定义＋配置引用＋环境”这组组合。

## 4. Kubernetes 中先学哪些概念

| 概念 | 对平台研发的意义 |
|---|---|
| Pod | 应用容器的运行单元之一，检查状态、日志和事件的入口 |
| Deployment／ReplicaSet | 期望副本和更新过程 |
| Service | 服务发现和流量到实例的连接 |
| Gateway／Ingress 及其控制器 | 外部访问与路由；具体能力依实现 |
| Namespace | 资源与权限组织边界之一 |
| ConfigMap／Secret | 配置与敏感数据注入机制 |
| ServiceAccount／RBAC | 平台或工作负载能执行什么操作 |
| Requests／Limits | 资源调度和约束 |
| Probe | 启动、就绪和存活判断 |
| Event／Status | 解释调度、拉镜像和运行失败的证据 |

Namespace 并不自动提供完整租户隔离，还需要结合权限、网络、资源配额和安全策略。Kubernetes Secret 的编码也不等于加密；存储保护和访问权限需要单独配置，见 [Secrets 官方说明](https://kubernetes.io/docs/concepts/configuration/secret/)。

虚拟机部署场景则要学习进程管理、软件包分发、服务配置和主机编排；[Ansible](https://docs.ansible.com/projects/ansible/latest/getting_started/index.html) 是这类自动化的代表性工具。DevOps 平台不一定都以 Kubernetes 为底座。

## 5. 两种常见部署路径

### 路径 A：平台驱动执行

```text
平台校验发布请求
  → 创建部署任务
  → 执行器调用部署工具或 Kubernetes API
  → 查询资源与探针
  → 汇总部署结果
```

这一路径便于把审批、命令和状态放在同一工作流，但需要严格管理执行凭据、权限、超时和补偿。

### 路径 B：GitOps

```text
生成目标环境配置变更
  → 配置仓库评审并合并
  → Argo CD 发现期望状态变化
  → 与集群实际状态比较并同步
  → 平台读取同步与健康结果
```

[Argo CD 自动同步](https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/)围绕 Git 中的期望配置与集群状态工作。生产是否自动同步、是否允许删除、是否启用自愈，都需要明确配置。

GitOps 让变更来源更清楚，也带来一致性要求：直接在集群手工回退后，如果 Git 仍指向新版本，自动对齐可能覆盖临时操作。恢复时要协同更新期望状态或采用团队约定的受控暂停流程。

## 6. Helm、Kustomize 和 Argo CD 的边界

| 工具 | 核心位置 |
|---|---|
| [Helm](https://helm.sh/docs/topics/charts/) | 将 Kubernetes 应用组织成 Chart，通过参数渲染和管理 |
| [Kustomize](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/) | 以基础配置和覆盖表达差异 |
| [Argo CD](https://argo-cd.readthedocs.io/en/stable/) | GitOps 交付、差异比较、同步和状态观察 |
| [OpenTofu](https://opentofu.org/docs/) | 基础设施声明与变更管理，可用于环境底座准备 |

不要为了技术名词齐全同时引入所有工具。先选一种环境配置表达方式，再确定交付控制方式。基础设施变更和应用发布可以关联，但应有各自清晰的权限与状态。

## 7. 怎样判断部署完成

至少区分四层证据：

1. **请求被接受**：API 已接收清单或任务。
2. **资源达到目标**：控制器观察到目标配置，副本逐步更新。
3. **实例可以接收流量**：探针、服务端点和依赖满足就绪条件。
4. **业务验证通过**：从实际入口执行必要冒烟，结果符合预期。

前三层属于部署控制与资源健康证据，第四层开始连接业务验证。平台应明确展示当前到哪一层，不能把执行命令返回 0 直接解释成用户可用。

具体字段和更新条件依 Kubernetes 资源类型而异，见 [Deployment 官方资料](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)。观察一个 Deployment 时，需要确认状态对应本次目标版本，避免误读旧状态。

## 8. 平台后端的典型实现

### 请求与校验

教学请求可以包含：

```json
{
  "applicationId": "order-service",
  "environmentId": "staging",
  "artifactId": "artifact-123",
  "configurationRevision": "config-42",
  "strategy": "rolling",
  "idempotencyKey": "request-20261016-001"
}
```

服务端解析制品完整摘要，校验环境权限、证据、配置兼容与并发变更。调用者提交 ID 不代表已获得授权。

### 异步执行

API 创建任务后返回任务 ID，由 Worker 执行或推进期望状态。数据库状态与队列投递应设计一致性保证，例如事务性 Outbox：先在同一事务保存任务和待发事件，再可靠投递。

### 并发与对账

同一应用、同一环境的变更可能冲突。平台可以排队、拒绝或显式替代，关键是规则可解释。锁失效后还要防止旧执行者继续写入，可结合操作版本或 fencing token。

外部系统超时后先查询真实状态；记录已执行步骤和外部 ID。调用前就持久化内部操作 ID，并按外部能力设置确定性资源名、标签、幂等令牌或可查询关联字段，以便创建响应丢失时仍能定位任务。

如果外部系统无法可靠定位这次操作，应保留“结果未知”并转受控人工核对，避免盲目重试。具备足够证据时，平台重启后通过对账恢复推进，防止重复执行迁移或覆盖新的发布。

## 9. 核心技能与案例验收

| 深度 | 本章应掌握 |
|---|---|
| 理解 | 持续交付／部署、环境、声明式配置、期望与实际状态 |
| 使用 | 部署应用，检查 Pod、Service、事件和探针；解释配置差异 |
| 开发平台 | 环境模型、权限、编排、适配器、并发互斥、Outbox 与状态对账 |

本案例把同一镜像摘要部署到测试和预发，保存各自配置版本。故意写错镜像地址，观察平台能否报告拉取失败；修正后再验证业务入口。

自测：平台调用 Kubernetes API 超时了，但集群可能已经开始更新。此时为什么不能直接再次创建一个全新发布？

## 官方资料

- [Kubernetes Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)：应用更新与状态。
- [Kubernetes Probes](https://kubernetes.io/docs/concepts/workloads/pods/probes/)：不同健康判断。
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)：敏感配置和保护边界。
- [Argo CD Auto Sync](https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/)：自动同步、自愈及回退限制。
- [Helm Charts](https://helm.sh/docs/topics/charts/)：Chart 与配置。
- [Kustomize](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/)：声明式配置覆盖。
- [OpenTofu](https://opentofu.org/docs/)：基础设施管理。
