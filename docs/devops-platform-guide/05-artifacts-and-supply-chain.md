# 05｜制品管理与软件供应链

[返回阅读入口](README.md) · [下一章：测试与验收](06-testing-and-acceptance.md)

## 1. 输入、产出与重点

输入是某次可信构建的输出；产出是可以准确定位、校验、授权访问、关联验证结果并再次部署的制品。

制品可以是 JAR、二进制、前端资源包、容器镜像或 Helm Chart。它是 CI 与 CD 交接的关键对象。

本文采用“构建一次，把同一份制品晋级到不同环境”的教学模型。环境差异由配置、密钥和运行资源表达，避免测试与生产分别构建而产生无法解释的差异。

## 2. 谁负责

业务开发定义打包方式与依赖。平台或仓库团队提供上传、下载、授权、保留和可用性能力。安全团队制定风险规则。发布负责人确认指定制品具备进入目标环境的证据。

## 3. Tag 和 Digest 为什么不同

例如：

```text
registry.example.com/team/order-service:git-a1b2c3d
registry.example.com/team/order-service@sha256:<完整摘要>
```

第一种使用人类可读的标签，第二种按内容摘要寻址。标签是否可覆盖取决于仓库策略；摘要用于固定具体内容。正式记录应保存完整摘要，不能只保存缩写或 `latest`。

OCI 的内容描述及摘要约束见 [OCI Image Specification](https://github.com/opencontainers/image-spec/blob/main/descriptor.md)。[Harbor](https://goharbor.io/docs/main/working-with-projects/working-with-images/create-tag-immutability-rules/)提供标签不可变策略，实施前需要检查匹配规则。

多架构镜像还要记录目标平台，区分镜像索引摘要与平台镜像摘要。示例中的摘要表达的是引用方式，尖括号部分需替换为真实值。

## 4. 一份制品需要关联什么

建议的最小元数据：

| 字段 | 用途 |
|---|---|
| 服务、仓库与 commit | 关联来源和负责人 |
| 流水线运行与定义版本 | 找到生成过程 |
| 制品地址、类型、完整摘要 | 固定内容、正确下载 |
| 运行平台与架构 | 避免构建与部署目标不匹配 |
| 测试与扫描结果 | 解释为什么允许晋级 |
| 构建时间、构建器与依赖信息 | 排查来源和环境差异 |
| 签名／证明及验证结果 | 对来源与策略提供额外证据 |
| 部署和发布引用 | 追踪哪些环境正在使用 |

这是平台设计建议，不要求自建仓库实现全部存储格式。平台可以在自己的数据库保存关联关系，制品内容继续放在专业仓库中。

## 5. 供应链相关概念

| 概念 | 解决的问题 | 局限 |
|---|---|---|
| 漏洞扫描 | 已知依赖或镜像内容有什么风险 | 未发现风险不等于没有风险，结果依赖扫描器和漏洞库 |
| SBOM | 这份软件包含哪些组件 | 清单需要准确生成，不能单独证明安全 |
| 签名 | 内容或声明由什么身份签署 | 要验证身份、信任根、范围和策略 |
| Provenance | 由哪些输入、什么构建过程产生 | 可信程度取决于生成与验证链路 |
| 访问控制 | 谁能上传、读取、删除或晋级 | 需要在 API 和存储层真正执行 |

[SLSA Provenance](https://slsa.dev/spec/v1.1/provenance)说明构建来源证明；[Sigstore Cosign](https://docs.sigstore.dev/cosign/signing/overview/)提供容器签名相关能力；[Dependency-Track](https://github.com/DependencyTrack/dependency-track)关注组件清单及供应链风险分析。它们各自提供证据与工具，业务仍需制定接受规则。

## 6. 晋级、隔离与保留

晋级表示这份制品满足进入下一环境的条件。可以通过元数据、仓库分区或镜像复制表达，关键是明确源摘要、目标摘要和验证证据。

需要防止以下情况：

- 未通过测试的分支产物进入生产候选列表。
- 标签被覆盖后，发布记录仍显示旧测试结果。
- 仓库清理删除了正在运行或回滚所需的版本。
- 漏洞库更新后发现新风险，但无法定位受影响的生产版本。

保留策略需要结合运行引用、回滚窗口、审计和存储成本。删除前核对引用关系；垃圾回收和业务删除是不同层面的动作。

## 7. 平台后端的典型开发任务

1. 封装仓库适配器，完成上传登记、摘要校验和状态查询。
2. 建立 commit、PipelineRun、Artifact、Deployment、Release 的关联。
3. 根据制品、环境、规则版本和证据计算是否允许晋级。
4. 接收异步扫描结果，处理重复事件与旧结果覆盖。
5. 查询某个漏洞涉及哪些制品、服务和部署。
6. 实现带引用保护的保留策略及可审计的操作记录。

扫描服务不可用时，应表达“结果未知”或“检查失败”，并按规则阻断或走显式例外，不能当成“没有漏洞”。

## 8. 技术栈与代表性项目

| 项目 | 在本阶段的位置 | 不应混淆的边界 |
|---|---|---|
| [Harbor](https://goharbor.io/docs/main/) | OCI 制品仓库、权限及相关策略 | 不替代业务测试和发布判断 |
| [Gitea Packages](https://docs.gitea.com/usage/packages/overview) | 与代码平台结合的包管理 | 支持格式和限制看所选版本 |
| [Dependency-Track](https://github.com/DependencyTrack/dependency-track) | 基于组件清单的风险分析 | 不承担容器执行和部署编排 |
| [Cosign](https://docs.sigstore.dev/cosign/signing/overview/) | 签名与验证工具 | 需要配套身份、密钥或无密钥信任策略 |

## 9. 核心技能与案例验收

| 深度 | 本章应掌握 |
|---|---|
| 理解 | 制品、标签、摘要、SBOM、扫描和来源证明的区别 |
| 使用 | 推拉镜像、查询摘要、查看扫描结果，按固定版本部署 |
| 开发平台 | 制品登记、证据关联、晋级规则、异步事件和引用保护 |

本案例从主干构建候选镜像，记录完整摘要。测试、预发和模拟生产使用同一摘要，并各自记录配置版本。找到其中任一运行实例，都应能追溯到代码和测试报告。

自测：测试环境和生产环境都用了 `v1.2.0`，为什么仍不能证明它们运行相同内容？

## 官方资料

- [OCI Descriptor](https://github.com/opencontainers/image-spec/blob/main/descriptor.md)：内容摘要和描述。
- [Harbor Documentation](https://goharbor.io/docs/main/)：仓库能力入口。
- [Harbor Tag Immutability](https://goharbor.io/docs/main/working-with-projects/working-with-images/create-tag-immutability-rules/)：不可变标签。
- [SLSA Provenance](https://slsa.dev/spec/v1.1/provenance)：构建来源证明。
- [Cosign Signing Overview](https://docs.sigstore.dev/cosign/signing/overview/)：签名模型。
- [Dependency-Track](https://github.com/DependencyTrack/dependency-track)：组件分析与 SBOM。
