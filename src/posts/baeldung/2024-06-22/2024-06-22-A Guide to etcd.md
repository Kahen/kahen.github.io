---
date: 2024-06-22
category:
  - Java
  - etcd
tag:
  - 分布式系统
  - 键值存储
head:
  - - meta
    - name: keywords
      content: etcd, 分布式键值存储, Java, 分布式系统
---
# etcd 指南

在分布式系统的复杂世界中，确保高效的数据管理至关重要。分布式可靠的键值存储在维护分布式环境中的数据一致性和可扩展性方面发挥着关键作用。

在这篇全面的教程中，我们将深入探讨 etcd，这是一个开源的分布式键值存储。我们将探索它的基本概念、特性和用例，并提供一个实践快速入门指南。最后，我们将比较 etcd 与其他几种分布式键值存储，以了解它的优势和独特之处。

## 2. 分布式键值存储是什么？

**分布式键值存储是一种 NoSQL 数据库，它将数据存储为跨多个物理或虚拟机的键值对。**

这种分布本质上增强了可扩展性、容错性和性能。此外，每个数据片段（值）都与一个唯一的标识符（键）相关联。这种模型对于某些用例非常高效，例如缓存、配置管理和快速数据检索。

Apache Zookeeper、Consul 和 Redis 是一些提供可靠键值存储的例子。

分布式键值存储是许多分布式系统的支柱，提供了一个简单但强大的机制来存储和检索数据。

以下是分布式键值存储的一些重要关键方面：

- **简单性：** 基本数据结构由键值对组成，使其易于理解和用于特定类型的应用程序。
- **可扩展性：** 这些系统可以通过跨多个节点分布工作负载来有效处理日益增长的数据量和增加的负载。
- **可靠性：** 它们确保数据一致性、容错性和可扩展性。
- **性能：** 键值机制提供快速高效的数据访问。此外，通过跨多个节点分布，它减少了单个机器的负载。
- **分布：** 由于数据分布在多个节点上，我们获得了增强的性能。

**分布式键值存储在各种场景中都有应用，例如配置管理、缓存、会话存储、服务发现、领导者选举等。**

## 3. etcd 是什么？

etcd 是一个分布式、可靠的键值存储，用于分布式系统中最关键的数据。**它是一个简单、安全、快速且可靠的键值存储，专为配置管理、服务发现和分布式系统的协调而设计。**

由 CoreOS 团队开发，现在是一个 CNCF（Cloud Native Computing Foundation）项目，etcd 提供了一个可靠且分布式的数据存储，使得在动态和可扩展的环境中协调配置和服务发现成为可能。

etcd 用 Go 语言开发，并在内部使用 Raft 一致性算法来管理一个高度可用的复制日志。

全球许多公司，如百度、华为、Salesforce、Ticketmaster 等，在生产中使用 etcd。它经常与 Kubernetes、Locksmith、Vulcand、Doorman 等应用程序集成。

**etcd 的丰富功能使其成为分布式系统的多功能和可靠选择，为云原生环境中的配置管理、服务发现和协提供了基本构建块。** 它对分布式一致性、高可用性和强数据完整性的承诺，使其成为现代、可扩展和弹性应用程序领域的基础组件。

## 4. etcd 的特性

etcd 的丰富功能使其成为分布式系统的多功能和可靠选择，为云原生环境中的配置管理、服务发现和协调提供了基本构建块。在某些情况下，它可能达到每秒 10,000 次写入。

让我们了解一些它的主要特点：

- **HTTP/gRPC API：** etcd 提供了 HTTP 和 gRPC API，使其可以与各种编程语言互操作，并轻松集成到不同类型的应用程序和框架中。
- **分布式一致性：** 它在分布式设置中保持强一致性，确保集群中的所有节点对数据有一致的视图。
- **高可用性：** etcd 设计为高可用性，具有自动领导者选举和故障转移机制。因此，即使在节点故障的情况下，etcd 集群仍然保持运行，有助于系统弹性。
- **监视支持：** etcd 支持强一致性监视，允许应用程序实时监控特定键值存储的更改。
- **原子事务：** 它支持原子事务，允许我们将多个键值操作组合在一起，并作为一个单一的原子单元执行，从而保持数据一致性。
- **租约管理：** etcd 引入了租约的概念，允许键具有关联的生命周期（TTL）值，因此在指定期限后自动删除它们。
- **基于角色的访问控制 (RBAC)：** 它支持 RBAC，允许管理员为与集群交互的用户和应用程序定义角色和权限。
- **快照和备份：** 它提供了创建集群状态快照的机制，并支持备份和恢复过程。因此，它确保了灾难恢复和数据持久性。
- **可插拔存储后端：** etcd 提供了一个可插拔的存储后端，使用户可以选择最适合其要求的底层存储引擎（例如，etcd 的默认存储引擎、LevelDB 或 RocksDB）。因此，它提供了灵活性，并允许根据特定用例和性能考虑进行优化。
- **与 Kubernetes 的集成：** etcd 是 Kubernetes 的关键组件，作为配置和状态信息的主要数据存储。这使 etcd 成为容器编排的核心部分，确保分布式系统可以有效地管理配置并进行扩展。
- **etcdctl：** 这是一个命令行客户端工具，专为与 etcd 集群交互和管理而设计。

## 5. 安装

让我们了解如何配置和设置 etcd 以使其运行。etcd 与 Ubuntu、CentOS 等 Linux 发行版兼容，也兼容 Windows。

我们可以从更新 Ubuntu 上的软件包列表开始：

```
$ sudo apt update
```

然后，我们可以安装 etcd：

```
$ sudo apt install etcd
```

同样，在 CentOS 上，我们首先需要启用 EPEL 存储库，然后安装 etcd：

```
$ sudo yum install epel-release
$ sudo yum install etcd
```

或者，我们可以访问 etcd 的官方 GitHub 版本页面下载最新版本。否则，我们可以使用以下命令克隆存储库：

```
$ git clone -b v3.5.11 https://github.com/etcd-io/etcd.git
```

对于克隆最新版本，我们可以省略 _-b v3.5.11_ 标志。

然后，我们可以解压缩下载的存档并导航到 etcd 目录：

```
$ tar xvf etcd-v3.5.11-linux-amd64.tar.gz
$ cd etcd
```

接下来，我们可以运行构建脚本：

```
$ ./build.sh
```

我们可以在 _bin_ 目录下找到二进制文件。然后我们需要将 bin 目录的完整路径添加到我们的路径中：

```
$ export PATH="$PATH:`pwd`/bin"
```

在这里，_pwd_ 是一个 UNIX 命令，用于获取当前目录的完整路径名。最后，我们可以通过检查版本来确保我们的 _PATH_ 包含 etcd：

```
$ etcd --version
```

## **6. 使用配置文件进行配置**

我们有多种方式配置 etcd。然而，在本教程中，我们将创建一个包含基本设置的配置文件。

etcd 配置文件是一个 YAML 文件，包含用于配置 etcd 节点行为的设置和参数。**此文件对于自定义 etcd 的各个方面至关重要，例如网络设置、集群信息、身份验证和存储选项。** 让我们看一个例子：

```yaml
# 示例 etcd-config.yml
# 节点名称，在 etcd 集群中的唯一标识符
name: node-1

# etcd 将存储其数据的数据目录
data-dir: /var/lib/etcd/default.etcd

# 客户端通信的监听地址
listen-client-urls: http://127.0.0.1:2379,http://``````<NODE-IP>``````:2379

# 客户端通信的广告地址
advertise-client-urls: http://``````<NODE-IP>``````:2379

# 对等通信的监听地址
listen-peer-urls: http://``````<NODE-IP>``````:2380

# 对等通信的广告地址
initial-advertise-peer-urls: http://``````<NODE-IP>``````:2380

# 初始集群配置
initial-cluster: node-1=http://``````<NODE-IP>``````:2380,node-2=http://``````<NODE-IP>``````:2380

# etcd 集群的唯一令牌
initial-cluster-token: etcd-cluster-1

# 初始集群状态（新、现有或待机）
initial-cluster-state: new

# 使用共享密钥令牌启用身份验证
auth-token: "some-secret-token"

# 启用 RBAC 授权
enable-authorization: true

# 启用 etcd 键值存储的自动压缩
auto-compaction-mode: periodic
auto-compaction-retention: "1h"

# 安全通信设置（TLS）
client-transport-security:
  cert-file: /etc/etcd/server.crt
  key-file: /etc/etcd/server.key
  client-cert-auth: true
  trusted-ca-file: /etc/etcd/ca.crt

peer-transport-security:
  cert-file: /etc/etcd/peer.crt
  key-file: /etcpeer.key
  client-cert-auth: true
  trusted-ca-file: /etc/etcd/ca.crt
```

让我们了解一些关于这个配置的注意事项：

**添加 TLS 证书：** 安全配置（client-transport-security 和 peer-transport-security）是可选的，但建议在生产部署中使用，以提供加密通信。

**添加 RBAC：** 基于角色的访问控制通过基于用户角色和权限控制对 etcd 操作的访问，增加了一层安全性。

**启用自动压缩：** 通过定期（每小时）删除不必要的数据，帮助管理 etcd 数据存储的大小。

最后，我们应该确保我们根据我们的特定需求和安全考虑自定义配置文件。编辑文件后，我们可以重新启动 etcd 服务以使更改生效。

## 7. 启动和与 etcd 交互

我们可以使用以下命令使用指定的配置启动 etcd：

```
$ ./etcd --config-file=etcd-config.yml
```

**此外，我们可以使用 etcdctl 命令行工具与 etcd 交互，该工具专为与 etcd 集群交互和管理而设计。** 它使管理员和开发人员能够直接从命令行在 etcd 集群上执行各种操作。

让我们通过一些示例来理解：

我们可以设置一个键值对如下：

```
$ etcdctl put mykey "Hello, etcd!"
```

这里，_mykey_ 是键，_“Hello, etcd!”_ 是相应的值。随后，我们可以检索 _mykey_ 的值如下：

```
$ etcdctl get mykey
mykey
Hello, etcd!
```

要监视 _mykey_ 的更改，我们可以简单地执行：

```
$ etcdctl watch mykey
```

监视 etcd 中的键允许我们接收有关键更改的实时通知，无论是值被修改还是键被删除。监视事件提供了有关更改性质的详细信息，使应用程序能够动态地对 etcd 键值存储中的更新做出反应。

需要注意的是，监视键不会阻止它被删除。监视是观察更改的机制，而不是控制或限制它们。

最后，我们可以使用以下命令检查 etcd 集群的健康状况：

```
$ etcdctl endpoint health
```

如果我们正在使用安全的 etcd 集群工作，那么可能需要提供额外的身份验证和安全选项，例如指定 _–cacert_、_–cert_ 和 _–key_ 标志以指向证书和密钥文件，同时检查健康状况。

## **8. 代码示例**

要使用 Java 与 etcd 交互，我们可以使用像 _jetcd_ 或 _etcd4j_ 这样的 Java 客户端库。在我们的示例中，我们将使用 _jetcd_，因为它是 etcd v3 的官方 Java 客户端。

_jetcd_ 建立在 Java 11 之上。它支持所有基于键的 etcd 请求，并提供 SSL 安全性。此外，它允许定义多个连接 URL 并提供同步和异步 API，为我们提供了选择最适合我们应用程序的编程模型的灵活性。

我们可以将 _jetcd-core_ 依赖项添加到我们的项目中，如下所示：

```xml
`<dependency>`
    `<groupId>`io.etcd`</groupId>`
    `<artifactId>`jetcd-core`</artifactId>`
    `<version>`0.7.7`</version>`
`</dependency>`
```

现在，让我们看一个使用 _jetcd_ 演示 put、检索和删除操作的基本示例：

```java
public class JetcdExample {
    public static void main(String[] args) {
        String etcdEndpoint = "http://localhost:2379";
        ByteSequence key = ByteSequence.from("/mykey".getBytes());
        ByteSequence value = ByteSequence.from("Hello, etcd!".getBytes());

        try (Client client = Client.builder().endpoints(etcdEndpoint).build()) {
            KV kvClient = client.getKVClient();

            // 放置一个键值对
            kvClient.put(key, value).get();

            // 使用 CompletableFuture 检索值
            CompletableFuture`<GetResponse>` getFuture = kvClient.get(key);
            GetResponse response = getFuture.get();

            // 删除键
            kvClient.delete(key).get();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## 9. 与 Apache Zookeeper 和 Consul 的比较

作为分布式系统工具，etcd、Apache Zookeeper 和 Consul 旨在管理配置、协调，并为构建分布式应用程序提供可靠的基础。然而，它们在设计哲学、架构和用例上有着显著的差异：

| 特性/方面 | etcd | Apache ZooKeeper | Consul |
| --- | --- | --- | --- |
| 一致性算法 | Raft | Zab (ZooKeeper 原子广播) | Consul Raft |
| 数据模型 | 键值存储 | ZNodes 层次结构 | 键值存储 |
| 用例 | 云原生，Kubernetes | 各种分布式系统 | 服务发现，网络 |
| 一致性模型 | 强一致性 | 强一致性 | 一致的，最终一致性 |
| 安全特性 | TLS 支持，AuthN 和 AuthZ | 有限的内置安全 | ACLs，TLS，基于令牌的访问 |
| 领导者选举 | Raft 一致性中固有的领导者选举。节点参与选举以选择领导者。 | 通过 Zab 协议集中化的领导者选举。节点选举一个协调操作的领导者。 | 基于 Raft 的领导者选举。每个 Consul 服务器都参与 Raft 一致性算法以选举领导者。 |
| 领导者特性 | 领导者拥有决策和协调集群的权威。 | 领导者管理分布式系统的状态并协调行动。 | 领导者负责集群协调和决策。 |
| 性能 | 通常良好 | 良好，用于大型部署 | 高性能，可扩展 |
| 生态系统集成 | 与 CNCF 项目集成 | 与 Apache 项目集成 | 与 HashiCorp 栈集成 |
| 监控和可观察性 | etcd 指标，Prometheus 支持 | 有限的内置监控 | 集成指标，Prometheus |
| 配置管理 | 配置 API | 在 Hadoop、Kafka 等中用于配置 | 动态配置管理 |
| 服务发现 | 有限 | 作为分布式系统的一部分使用 | 核心特性，基于 DNS 的发现 |
| 商业支持 | 有限 | 提供商业支持 | 企业版和开源版 |
| 易用性 | 以简单著称 | 可能更复杂 | 易于使用和配置 |
| 许可证 | Apache 许可证 2.0 | Apache 许可证 2.0 | MPLv2.0 |

选择 etcd、Apache ZooKeeper 和 Consul 取决于特定项目需求。

etcd，以其简单性和 Cloud Native Computing Foundation (CNCF) 支持，适合像 Kubernetes 这样的云原生环境。Apache ZooKeeper，作为大型部署的强大选择，提供强一致性，但带有增加的复杂性。另一方面，Consul 以其简单性和有效的服务发现而闻名，与 HashiCorp 栈无缝集成。

安全性、易用性和集成要求在决策过程中起着关键作用。每个工具都有其优势，因此根据所需的特性和用例做出明智的选择至关重要。

## 10. 结论

在本文中，我们全面探讨了 etcd，讨论了其基本概念、关键特性和实际应用。快速入门指南将帮助我们快速设置 etcd 并与其进行程序化交互。此外，与其他分布式键值存储的比较突出了 etcd 的独特优势，使其成为各种分布式系统场景的可靠选择。

了解分布式可靠的键值存储、分布式系统中数据的关键性以及 etcd 的能力将帮助我们在设计和实现分布式应用程序时做出明智的决策。最后，作为许多分布式系统的支柱，etcd 的简单性、一致性和高可用性使其成为开发人员在应对分布式环境复杂性时的有价值工具。

一如既往，伴随本文的源代码可在 GitHub 上获得。
```

OK