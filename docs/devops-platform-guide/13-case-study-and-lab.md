# 13｜贯穿案例与分层实操任务书

[返回阅读入口](README.md) · [下一章：术语与资料](14-glossary-and-resources.md)

## 1. 练习目标与范围

另建一个 `delivery-lab` 练习仓库，用自己熟悉的语言，实现“当前用户查询已支付订单”，再完成 CI、制品、部署、发布验证和基础监控。

本文是一份任务书，包含设计、配置示例、检查方法和验收要求。需要在练习仓库中实现应用、测试和环境接入；本目录本身是学习文档，不是一套已经部署的实验环境。

依次完成三个层次：

| 层次 | 前提 | 练习成果 |
|---|---|---|
| A：代码与容器 | Git、语言工具链、容器运行环境 | 接口、测试、镜像和本地运行 |
| B：CI 与仓库 | 一个可用的 CI 执行环境、制品仓库与必要凭据 | 提交触发、失败阻断、摘要与报告 |
| C：部署与运行 | 测试集群或既有部署环境、可观测组件 | 部署、业务验证、失败演练与运行证据 |

资源有限时分层完成，不必把代码托管、CI、仓库、集群和监控全部装在同一台电脑。所有演练都在个人或授权的测试环境中进行。

## 2. 推荐的一套练习组合

选择熟悉的工具即可，下面只提供一套参考：

- 代码：已有的 Git 托管服务。
- CI：Jenkins；已有 GitLab CI 时可以直接使用。
- 应用：熟悉的 Java、Go 或 Python 框架。
- 制品：一个支持 OCI 镜像的仓库；有条件时用 Harbor。
- 部署：本地 Kubernetes，例如 kind；先完成普通滚动更新。
- 观测：Prometheus＋Grafana，日志先用容器标准输出。
- 进阶：Argo CD、Argo Rollouts、链路后端和发布任务 API。

CI 执行器需要明确的构建方式。容器镜像构建权限、仓库访问和集群访问分别配置，避免把个人管理员凭据直接塞进流水线。

官方参考：[Jenkins](https://www.jenkins.io/doc/book/pipeline/)、[kind](https://kind.sigs.k8s.io/docs/user/quick-start/)、[Harbor](https://goharbor.io/docs/main/)、[Prometheus](https://prometheus.io/docs/introduction/overview/)。

## 3. 练习仓库应包含什么

```text
delivery-lab/
  README.md               # 环境、构建、测试、运行和恢复说明
  app/                    # 业务实现
  tests/                  # 自动化测试与合成数据
  Dockerfile              # 镜像构建定义
  .dockerignore           # 排除密钥、临时文件等
  Jenkinsfile             # 或选用工具的 CI 定义
  deploy/                 # 部署定义和环境配置
  observability/          # 指标说明、告警或看板配置
  evidence/
    traceability.md       # 提交→构建→摘要→部署
    failure-drill.md      # 故障时间线与恢复证据
    decisions.md          # 关键设计选择与剩余问题
```

这是建议结构，按语言习惯调整即可。不要把真实令牌、个人订单或未脱敏日志提交进仓库。

## 4. 第一阶段：定义需求并实现接口

### 任务

实现：

```http
GET /orders?status=paid&limit=20
GET /healthz
GET /readyz
GET /version
GET /metrics
```

认证由所选框架的认证层处理，业务从身份上下文取当前用户。测试中构造合成身份，不接受用户随意指定一个 `userId` 就读取对应订单。

准备两个用户、多种状态和足够的分页边界数据。初步可以用内存或轻量数据库，随后用真实数据库完成集成测试。

`/version` 返回构建时注入的非敏感版本标识，帮助检查实例。镜像完整摘要由部署平台或容器运行元数据核对，不要求应用在镜像构建前知道自身最终摘要。

### 验收

- [ ] 合法身份只能获得自己的已支付订单。
- [ ] 未认证、非法状态、过大 limit 均有明确行为。
- [ ] 空数据、排序和分页测试通过。
- [ ] `healthz` 与 `readyz` 的判断范围有文字说明。
- [ ] 有统一的构建、测试和启动命令。

## 5. 第二阶段：接入 CI，并演练失败阻断

### 任务

按第 04 章配置流水线：

```text
提交触发 → 固定 commit → 构建与测试 → 报告 → 结果回写
```

先完成验证，合并到主干后再对确定提交生成可信候选制品。使用独立的练习分支故意破坏一项权限测试，确认失败不会生成可晋级版本。

记录排队、执行、依赖下载和测试耗时。触发一次重复事件或手动重跑，说明两者分别应该产生什么记录。

### 验收

- [ ] 流水线能定位到确切提交。
- [ ] 失败日志指出具体任务与测试。
- [ ] 报告缺失不会被展示成测试全通过。
- [ ] 有一条成功运行和一条被阻断的运行记录。
- [ ] 能解释主干候选与普通分支产物的区别。

## 6. 第三阶段：生成、保存并固定制品

### 任务

在练习项目已提供 Dockerfile 的前提下，可以用以下命令表达打包与上传。仓库地址、标签及登录凭据需要按自己的环境配置：

```sh
docker build -t registry.example.com/lab/order-service:lab-v1 .
docker push registry.example.com/lab/order-service:lab-v1
```

从仓库或推送结果取得完整摘要，登记它与 commit、CI 运行的关系。配置不可变标签或采用不会覆盖的标签策略；生产式部署记录使用完整摘要。

多架构场景明确选定目标平台。如果使用 kind 的本地镜像导入路径，则它只是本地替代；另外练习一次真实仓库推拉，才能验证凭据和仓库链路。

### 验收

- [ ] 能解释标签和摘要的区别。
- [ ] 能从摘要找到来源 commit 与测试报告。
- [ ] 拉取同一摘要后可以运行并验证版本。
- [ ] 仓库凭据不会出现在日志或提交内容中。

## 7. 第四阶段：部署并区分“请求成功”与“业务成功”

### 部署定义示例

下面是 Kubernetes 核心结构示例。应用需要监听 `8080` 并实现对应探针。`<完整摘要>` 是替换标记，需要替换为真实摘要；示例没有包含数据库配置、镜像凭据和外部路由。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
  namespace: delivery-lab
spec:
  replicas: 2
  selector:
    matchLabels:
      app: order-service
  template:
    metadata:
      labels:
        app: order-service
    spec:
      containers:
        - name: app
          image: registry.example.com/lab/order-service@sha256:<完整摘要>
          ports:
            - name: http
              containerPort: 8080
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 512Mi
          startupProbe:
            httpGet:
              path: /healthz
              port: http
            periodSeconds: 2
            failureThreshold: 30
          readinessProbe:
            httpGet:
              path: /readyz
              port: http
          livenessProbe:
            httpGet:
              path: /healthz
              port: http
---
apiVersion: v1
kind: Service
metadata:
  name: order-service
  namespace: delivery-lab
spec:
  selector:
    app: order-service
  ports:
    - port: 80
      targetPort: http
```

资源值和探针时长仅用于说明字段，按语言启动特性与实测内存调整。命名空间需提前创建或写入独立配置。

### 检查方法

在自己已经创建的练习集群中：

```sh
kubectl config current-context
kubectl get deployment,pods,service -n delivery-lab
kubectl rollout status deployment/order-service -n delivery-lab --timeout=120s
kubectl describe deployment/order-service -n delivery-lab
kubectl logs -l app=order-service -n delivery-lab --all-containers=true --tail=100
```

检查目标环境后再执行变更。使用 `port-forward` 可以从本机验证 Service：

```sh
kubectl port-forward service/order-service 8080:80 -n delivery-lab
```

另开终端访问版本、探针和业务接口。业务接口需要测试身份；本地端口转发通过后，还应在配置了正式入口时单独验证路由和认证。

### 验收

- [ ] 实际运行镜像与目标摘要一致，配置版本可查。
- [ ] 能解释 Pod、Service、探针和实际入口各自验证什么。
- [ ] 故意配置错误镜像地址，能从事件判断原因。
- [ ] 部署成功后业务冒烟通过。

## 8. 第五阶段：运行观测与失败演练

### 任务

让应用输出结构化日志，并通过 Prometheus 采集请求数和耗时等指标。指标名、标签和单位在仓库中写明；如采用第 09 章查询，先匹配它要求的直方图定义。

通过已认证的合成请求产生负载，记录负载参数和时间窗口。k6 的脚本需要同时检查 HTTP 和响应内容，并定义明确阈值；具体写法见 [k6 Thresholds](https://grafana.com/docs/k6/latest/using-k6/thresholds/)。

选择一项受控故障：

| 演练 | 观察目标 | 预期判断 |
|---|---|---|
| 在练习代码引入可控延迟 | 业务延迟与探针是否出现差异 | Ready 不代表业务延迟达标 |
| 配置错误依赖地址 | 应用日志、调用错误和就绪行为 | 能区分依赖不可用与进程退出 |
| 配置错误镜像 | Pod 事件和更新状态 | 不应显示成业务发布成功 |
| 暂停指标采集 | 无数据与告警／发布判定 | 不能把缺失数据当作健康 |

故障注入仅存在于练习版本或受控测试配置中，普通调用者不应有切换故障的权限。

### 验收

- [ ] 看板能展示流量、失败和延迟。
- [ ] 指标、日志、版本与发布时间能互相定位。
- [ ] 能解释故障影响和至少一个备选假设。
- [ ] 恢复后从业务入口和指标确认结果。

## 9. 第六阶段：做一次发布与恢复

### 基础练习

先用普通滚动更新发布第二个版本，观察新旧实例共存和状态变化。保留旧制品、配置与回退记录。

用前一阶段的故障版本演练暂停与恢复。直接部署的练习模式下可以把部署定义恢复到先前的明确摘要；GitOps 模式则通过恢复期望配置并同步实现。

只执行 `rollout undo` 不能证明数据、配置、业务和 GitOps 期望状态已经恢复。记录实际动作与验证结果。

### 进阶练习

选择 Argo Rollouts，配置分阶段推进与指标分析。如果没有可控制权重的路由底座，明确说明实际采用的分流方式，不声称已经精确控制请求比例。

### 验收

- [ ] 有目标版本、发布策略、观察条件和恢复方案。
- [ ] 失败时停止继续扩大。
- [ ] 指标缺失时不自动判定通过。
- [ ] 恢复后确认流量、实例和业务均符合目标。

## 10. 第七阶段：选择一个平台后端模块

在交付主链完成后，任选一项深入：

| 选题 | 最小能力 | 关键失败测试 |
|---|---|---|
| 发布任务 API | 创建、查询、幂等键、状态、异步执行 | 重复请求、内容冲突、外部超时、乱序回调 |
| CI 事件接入 | 验签、去重、触发、结果回写 | 重复事件、回写失败、旧提交结果 |
| 临时环境管理 | 创建、归属、状态、到期回收 | 半创建、重复回收、资源失联 |
| 制品证据登记 | 摘要、来源、报告和晋级规则 | 旧结果覆盖、未授权访问、制品缺失 |

先设计领域对象、状态与允许操作，再实现接口。可用假的外部适配器演练超时和乱序，但要说明哪些场景已接入真实系统。

## 11. 最终成果与复盘

完成练习后，把证据整理成：

```text
需求与设计
  → MR 与提交
  → 成功 / 失败 CI 运行
  → 测试报告与制品摘要
  → 环境配置和部署记录
  → 发布与恢复
  → 指标、日志和故障时间线
```

每个箭头至少有可点击记录、文件或可复现命令。最后写清：

- 做成了什么，哪些仍是设计或模拟。
- 哪一步最难，怎样得到证据。
- 哪项平台能力可以减少业务开发的重复劳动。
- 如果成为团队共享平台，下一步要补哪些权限、隔离、可靠性和体验。

这些成果可以支撑第 12 章的面试演示。
