import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as t,a}from"./app-BOJj4F50.js";const e={},p=a(`<h1 id="etcd-指南" tabindex="-1"><a class="header-anchor" href="#etcd-指南"><span>etcd 指南</span></a></h1><p>在分布式系统的复杂世界中，确保高效的数据管理至关重要。分布式可靠的键值存储在维护分布式环境中的数据一致性和可扩展性方面发挥着关键作用。</p><p>在这篇全面的教程中，我们将深入探讨 etcd，这是一个开源的分布式键值存储。我们将探索它的基本概念、特性和用例，并提供一个实践快速入门指南。最后，我们将比较 etcd 与其他几种分布式键值存储，以了解它的优势和独特之处。</p><h2 id="_2-分布式键值存储是什么" tabindex="-1"><a class="header-anchor" href="#_2-分布式键值存储是什么"><span>2. 分布式键值存储是什么？</span></a></h2><p><strong>分布式键值存储是一种 NoSQL 数据库，它将数据存储为跨多个物理或虚拟机的键值对。</strong></p><p>这种分布本质上增强了可扩展性、容错性和性能。此外，每个数据片段（值）都与一个唯一的标识符（键）相关联。这种模型对于某些用例非常高效，例如缓存、配置管理和快速数据检索。</p><p>Apache Zookeeper、Consul 和 Redis 是一些提供可靠键值存储的例子。</p><p>分布式键值存储是许多分布式系统的支柱，提供了一个简单但强大的机制来存储和检索数据。</p><p>以下是分布式键值存储的一些重要关键方面：</p><ul><li><strong>简单性：</strong> 基本数据结构由键值对组成，使其易于理解和用于特定类型的应用程序。</li><li><strong>可扩展性：</strong> 这些系统可以通过跨多个节点分布工作负载来有效处理日益增长的数据量和增加的负载。</li><li><strong>可靠性：</strong> 它们确保数据一致性、容错性和可扩展性。</li><li><strong>性能：</strong> 键值机制提供快速高效的数据访问。此外，通过跨多个节点分布，它减少了单个机器的负载。</li><li><strong>分布：</strong> 由于数据分布在多个节点上，我们获得了增强的性能。</li></ul><p><strong>分布式键值存储在各种场景中都有应用，例如配置管理、缓存、会话存储、服务发现、领导者选举等。</strong></p><h2 id="_3-etcd-是什么" tabindex="-1"><a class="header-anchor" href="#_3-etcd-是什么"><span>3. etcd 是什么？</span></a></h2><p>etcd 是一个分布式、可靠的键值存储，用于分布式系统中最关键的数据。<strong>它是一个简单、安全、快速且可靠的键值存储，专为配置管理、服务发现和分布式系统的协调而设计。</strong></p><p>由 CoreOS 团队开发，现在是一个 CNCF（Cloud Native Computing Foundation）项目，etcd 提供了一个可靠且分布式的数据存储，使得在动态和可扩展的环境中协调配置和服务发现成为可能。</p><p>etcd 用 Go 语言开发，并在内部使用 Raft 一致性算法来管理一个高度可用的复制日志。</p><p>全球许多公司，如百度、华为、Salesforce、Ticketmaster 等，在生产中使用 etcd。它经常与 Kubernetes、Locksmith、Vulcand、Doorman 等应用程序集成。</p><p><strong>etcd 的丰富功能使其成为分布式系统的多功能和可靠选择，为云原生环境中的配置管理、服务发现和协提供了基本构建块。</strong> 它对分布式一致性、高可用性和强数据完整性的承诺，使其成为现代、可扩展和弹性应用程序领域的基础组件。</p><h2 id="_4-etcd-的特性" tabindex="-1"><a class="header-anchor" href="#_4-etcd-的特性"><span>4. etcd 的特性</span></a></h2><p>etcd 的丰富功能使其成为分布式系统的多功能和可靠选择，为云原生环境中的配置管理、服务发现和协调提供了基本构建块。在某些情况下，它可能达到每秒 10,000 次写入。</p><p>让我们了解一些它的主要特点：</p><ul><li><strong>HTTP/gRPC API：</strong> etcd 提供了 HTTP 和 gRPC API，使其可以与各种编程语言互操作，并轻松集成到不同类型的应用程序和框架中。</li><li><strong>分布式一致性：</strong> 它在分布式设置中保持强一致性，确保集群中的所有节点对数据有一致的视图。</li><li><strong>高可用性：</strong> etcd 设计为高可用性，具有自动领导者选举和故障转移机制。因此，即使在节点故障的情况下，etcd 集群仍然保持运行，有助于系统弹性。</li><li><strong>监视支持：</strong> etcd 支持强一致性监视，允许应用程序实时监控特定键值存储的更改。</li><li><strong>原子事务：</strong> 它支持原子事务，允许我们将多个键值操作组合在一起，并作为一个单一的原子单元执行，从而保持数据一致性。</li><li><strong>租约管理：</strong> etcd 引入了租约的概念，允许键具有关联的生命周期（TTL）值，因此在指定期限后自动删除它们。</li><li><strong>基于角色的访问控制 (RBAC)：</strong> 它支持 RBAC，允许管理员为与集群交互的用户和应用程序定义角色和权限。</li><li><strong>快照和备份：</strong> 它提供了创建集群状态快照的机制，并支持备份和恢复过程。因此，它确保了灾难恢复和数据持久性。</li><li><strong>可插拔存储后端：</strong> etcd 提供了一个可插拔的存储后端，使用户可以选择最适合其要求的底层存储引擎（例如，etcd 的默认存储引擎、LevelDB 或 RocksDB）。因此，它提供了灵活性，并允许根据特定用例和性能考虑进行优化。</li><li><strong>与 Kubernetes 的集成：</strong> etcd 是 Kubernetes 的关键组件，作为配置和状态信息的主要数据存储。这使 etcd 成为容器编排的核心部分，确保分布式系统可以有效地管理配置并进行扩展。</li><li><strong>etcdctl：</strong> 这是一个命令行客户端工具，专为与 etcd 集群交互和管理而设计。</li></ul><h2 id="_5-安装" tabindex="-1"><a class="header-anchor" href="#_5-安装"><span>5. 安装</span></a></h2><p>让我们了解如何配置和设置 etcd 以使其运行。etcd 与 Ubuntu、CentOS 等 Linux 发行版兼容，也兼容 Windows。</p><p>我们可以从更新 Ubuntu 上的软件包列表开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ sudo apt update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，我们可以安装 etcd：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ sudo apt install etcd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同样，在 CentOS 上，我们首先需要启用 EPEL 存储库，然后安装 etcd：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ sudo yum install epel-release
$ sudo yum install etcd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，我们可以访问 etcd 的官方 GitHub 版本页面下载最新版本。否则，我们可以使用以下命令克隆存储库：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ git clone -b v3.5.11 https://github.com/etcd-io/etcd.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对于克隆最新版本，我们可以省略 <em>-b v3.5.11</em> 标志。</p><p>然后，我们可以解压缩下载的存档并导航到 etcd 目录：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ tar xvf etcd-v3.5.11-linux-amd64.tar.gz
$ cd etcd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们可以运行构建脚本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ ./build.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以在 <em>bin</em> 目录下找到二进制文件。然后我们需要将 bin 目录的完整路径添加到我们的路径中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ export PATH=&quot;$PATH:\`pwd\`/bin&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，<em>pwd</em> 是一个 UNIX 命令，用于获取当前目录的完整路径名。最后，我们可以通过检查版本来确保我们的 <em>PATH</em> 包含 etcd：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ etcd --version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_6-使用配置文件进行配置" tabindex="-1"><a class="header-anchor" href="#_6-使用配置文件进行配置"><span><strong>6. 使用配置文件进行配置</strong></span></a></h2><p>我们有多种方式配置 etcd。然而，在本教程中，我们将创建一个包含基本设置的配置文件。</p><p>etcd 配置文件是一个 YAML 文件，包含用于配置 etcd 节点行为的设置和参数。<strong>此文件对于自定义 etcd 的各个方面至关重要，例如网络设置、集群信息、身份验证和存储选项。</strong> 让我们看一个例子：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token comment"># 示例 etcd-config.yml</span>
<span class="token comment"># 节点名称，在 etcd 集群中的唯一标识符</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> node<span class="token punctuation">-</span><span class="token number">1</span>

<span class="token comment"># etcd 将存储其数据的数据目录</span>
<span class="token key atrule">data-dir</span><span class="token punctuation">:</span> /var/lib/etcd/default.etcd

<span class="token comment"># 客户端通信的监听地址</span>
<span class="token key atrule">listen-client-urls</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//127.0.0.1<span class="token punctuation">:</span><span class="token number">2379</span><span class="token punctuation">,</span>http<span class="token punctuation">:</span>//\`\`\`\`\`\`&lt;NODE<span class="token punctuation">-</span>IP<span class="token punctuation">&gt;</span>\`\`\`\`\`\`<span class="token punctuation">:</span><span class="token number">2379</span>

<span class="token comment"># 客户端通信的广告地址</span>
<span class="token key atrule">advertise-client-urls</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//\`\`\`\`\`\`&lt;NODE<span class="token punctuation">-</span>IP<span class="token punctuation">&gt;</span>\`\`\`\`\`\`<span class="token punctuation">:</span><span class="token number">2379</span>

<span class="token comment"># 对等通信的监听地址</span>
<span class="token key atrule">listen-peer-urls</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//\`\`\`\`\`\`&lt;NODE<span class="token punctuation">-</span>IP<span class="token punctuation">&gt;</span>\`\`\`\`\`\`<span class="token punctuation">:</span><span class="token number">2380</span>

<span class="token comment"># 对等通信的广告地址</span>
<span class="token key atrule">initial-advertise-peer-urls</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//\`\`\`\`\`\`&lt;NODE<span class="token punctuation">-</span>IP<span class="token punctuation">&gt;</span>\`\`\`\`\`\`<span class="token punctuation">:</span><span class="token number">2380</span>

<span class="token comment"># 初始集群配置</span>
<span class="token key atrule">initial-cluster</span><span class="token punctuation">:</span> node<span class="token punctuation">-</span>1=http<span class="token punctuation">:</span>//\`\`\`\`\`\`&lt;NODE<span class="token punctuation">-</span>IP<span class="token punctuation">&gt;</span>\`\`\`\`\`\`<span class="token punctuation">:</span><span class="token number">2380</span><span class="token punctuation">,</span>node<span class="token punctuation">-</span>2=http<span class="token punctuation">:</span>//\`\`\`\`\`\`&lt;NODE<span class="token punctuation">-</span>IP<span class="token punctuation">&gt;</span>\`\`\`\`\`\`<span class="token punctuation">:</span><span class="token number">2380</span>

<span class="token comment"># etcd 集群的唯一令牌</span>
<span class="token key atrule">initial-cluster-token</span><span class="token punctuation">:</span> etcd<span class="token punctuation">-</span>cluster<span class="token punctuation">-</span><span class="token number">1</span>

<span class="token comment"># 初始集群状态（新、现有或待机）</span>
<span class="token key atrule">initial-cluster-state</span><span class="token punctuation">:</span> new

<span class="token comment"># 使用共享密钥令牌启用身份验证</span>
<span class="token key atrule">auth-token</span><span class="token punctuation">:</span> <span class="token string">&quot;some-secret-token&quot;</span>

<span class="token comment"># 启用 RBAC 授权</span>
<span class="token key atrule">enable-authorization</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

<span class="token comment"># 启用 etcd 键值存储的自动压缩</span>
<span class="token key atrule">auto-compaction-mode</span><span class="token punctuation">:</span> periodic
<span class="token key atrule">auto-compaction-retention</span><span class="token punctuation">:</span> <span class="token string">&quot;1h&quot;</span>

<span class="token comment"># 安全通信设置（TLS）</span>
<span class="token key atrule">client-transport-security</span><span class="token punctuation">:</span>
  <span class="token key atrule">cert-file</span><span class="token punctuation">:</span> /etc/etcd/server.crt
  <span class="token key atrule">key-file</span><span class="token punctuation">:</span> /etc/etcd/server.key
  <span class="token key atrule">client-cert-auth</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">trusted-ca-file</span><span class="token punctuation">:</span> /etc/etcd/ca.crt

<span class="token key atrule">peer-transport-security</span><span class="token punctuation">:</span>
  <span class="token key atrule">cert-file</span><span class="token punctuation">:</span> /etc/etcd/peer.crt
  <span class="token key atrule">key-file</span><span class="token punctuation">:</span> /etcpeer.key
  <span class="token key atrule">client-cert-auth</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">trusted-ca-file</span><span class="token punctuation">:</span> /etc/etcd/ca.crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们了解一些关于这个配置的注意事项：</p><p><strong>添加 TLS 证书：</strong> 安全配置（client-transport-security 和 peer-transport-security）是可选的，但建议在生产部署中使用，以提供加密通信。</p><p><strong>添加 RBAC：</strong> 基于角色的访问控制通过基于用户角色和权限控制对 etcd 操作的访问，增加了一层安全性。</p><p><strong>启用自动压缩：</strong> 通过定期（每小时）删除不必要的数据，帮助管理 etcd 数据存储的大小。</p><p>最后，我们应该确保我们根据我们的特定需求和安全考虑自定义配置文件。编辑文件后，我们可以重新启动 etcd 服务以使更改生效。</p><h2 id="_7-启动和与-etcd-交互" tabindex="-1"><a class="header-anchor" href="#_7-启动和与-etcd-交互"><span>7. 启动和与 etcd 交互</span></a></h2><p>我们可以使用以下命令使用指定的配置启动 etcd：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ ./etcd --config-file=etcd-config.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>此外，我们可以使用 etcdctl 命令行工具与 etcd 交互，该工具专为与 etcd 集群交互和管理而设计。</strong> 它使管理员和开发人员能够直接从命令行在 etcd 集群上执行各种操作。</p><p>让我们通过一些示例来理解：</p><p>我们可以设置一个键值对如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ etcdctl put mykey &quot;Hello, etcd!&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里，<em>mykey</em> 是键，<em>“Hello, etcd!”</em> 是相应的值。随后，我们可以检索 <em>mykey</em> 的值如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ etcdctl get mykey
mykey
Hello, etcd!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要监视 <em>mykey</em> 的更改，我们可以简单地执行：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ etcdctl watch mykey
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>监视 etcd 中的键允许我们接收有关键更改的实时通知，无论是值被修改还是键被删除。监视事件提供了有关更改性质的详细信息，使应用程序能够动态地对 etcd 键值存储中的更新做出反应。</p><p>需要注意的是，监视键不会阻止它被删除。监视是观察更改的机制，而不是控制或限制它们。</p><p>最后，我们可以使用以下命令检查 etcd 集群的健康状况：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ etcdctl endpoint health
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们正在使用安全的 etcd 集群工作，那么可能需要提供额外的身份验证和安全选项，例如指定 <em>–cacert</em>、<em>–cert</em> 和 <em>–key</em> 标志以指向证书和密钥文件，同时检查健康状况。</p><h2 id="_8-代码示例" tabindex="-1"><a class="header-anchor" href="#_8-代码示例"><span><strong>8. 代码示例</strong></span></a></h2><p>要使用 Java 与 etcd 交互，我们可以使用像 <em>jetcd</em> 或 <em>etcd4j</em> 这样的 Java 客户端库。在我们的示例中，我们将使用 <em>jetcd</em>，因为它是 etcd v3 的官方 Java 客户端。</p><p><em>jetcd</em> 建立在 Java 11 之上。它支持所有基于键的 etcd 请求，并提供 SSL 安全性。此外，它允许定义多个连接 URL 并提供同步和异步 API，为我们提供了选择最适合我们应用程序的编程模型的灵活性。</p><p>我们可以将 <em>jetcd-core</em> 依赖项添加到我们的项目中，如下所示：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`io.etcd\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`jetcd-core\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`0.7.7\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们看一个使用 <em>jetcd</em> 演示 put、检索和删除操作的基本示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JetcdExample</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> etcdEndpoint <span class="token operator">=</span> <span class="token string">&quot;http://localhost:2379&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">ByteSequence</span> key <span class="token operator">=</span> <span class="token class-name">ByteSequence</span><span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;/mykey&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ByteSequence</span> value <span class="token operator">=</span> <span class="token class-name">ByteSequence</span><span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, etcd!&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Client</span> client <span class="token operator">=</span> <span class="token class-name">Client</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">endpoints</span><span class="token punctuation">(</span>etcdEndpoint<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">KV</span> kvClient <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">getKVClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 放置一个键值对</span>
            kvClient<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 使用 CompletableFuture 检索值</span>
            <span class="token class-name">CompletableFuture</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">GetResponse</span><span class="token punctuation">&gt;</span></span>\` getFuture <span class="token operator">=</span> kvClient<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">GetResponse</span> response <span class="token operator">=</span> getFuture<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 删除键</span>
            kvClient<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-与-apache-zookeeper-和-consul-的比较" tabindex="-1"><a class="header-anchor" href="#_9-与-apache-zookeeper-和-consul-的比较"><span>9. 与 Apache Zookeeper 和 Consul 的比较</span></a></h2><p>作为分布式系统工具，etcd、Apache Zookeeper 和 Consul 旨在管理配置、协调，并为构建分布式应用程序提供可靠的基础。然而，它们在设计哲学、架构和用例上有着显著的差异：</p><table><thead><tr><th>特性/方面</th><th>etcd</th><th>Apache ZooKeeper</th><th>Consul</th></tr></thead><tbody><tr><td>一致性算法</td><td>Raft</td><td>Zab (ZooKeeper 原子广播)</td><td>Consul Raft</td></tr><tr><td>数据模型</td><td>键值存储</td><td>ZNodes 层次结构</td><td>键值存储</td></tr><tr><td>用例</td><td>云原生，Kubernetes</td><td>各种分布式系统</td><td>服务发现，网络</td></tr><tr><td>一致性模型</td><td>强一致性</td><td>强一致性</td><td>一致的，最终一致性</td></tr><tr><td>安全特性</td><td>TLS 支持，AuthN 和 AuthZ</td><td>有限的内置安全</td><td>ACLs，TLS，基于令牌的访问</td></tr><tr><td>领导者选举</td><td>Raft 一致性中固有的领导者选举。节点参与选举以选择领导者。</td><td>通过 Zab 协议集中化的领导者选举。节点选举一个协调操作的领导者。</td><td>基于 Raft 的领导者选举。每个 Consul 服务器都参与 Raft 一致性算法以选举领导者。</td></tr><tr><td>领导者特性</td><td>领导者拥有决策和协调集群的权威。</td><td>领导者管理分布式系统的状态并协调行动。</td><td>领导者负责集群协调和决策。</td></tr><tr><td>性能</td><td>通常良好</td><td>良好，用于大型部署</td><td>高性能，可扩展</td></tr><tr><td>生态系统集成</td><td>与 CNCF 项目集成</td><td>与 Apache 项目集成</td><td>与 HashiCorp 栈集成</td></tr><tr><td>监控和可观察性</td><td>etcd 指标，Prometheus 支持</td><td>有限的内置监控</td><td>集成指标，Prometheus</td></tr><tr><td>配置管理</td><td>配置 API</td><td>在 Hadoop、Kafka 等中用于配置</td><td>动态配置管理</td></tr><tr><td>服务发现</td><td>有限</td><td>作为分布式系统的一部分使用</td><td>核心特性，基于 DNS 的发现</td></tr><tr><td>商业支持</td><td>有限</td><td>提供商业支持</td><td>企业版和开源版</td></tr><tr><td>易用性</td><td>以简单著称</td><td>可能更复杂</td><td>易于使用和配置</td></tr><tr><td>许可证</td><td>Apache 许可证 2.0</td><td>Apache 许可证 2.0</td><td>MPLv2.0</td></tr></tbody></table><p>选择 etcd、Apache ZooKeeper 和 Consul 取决于特定项目需求。</p><p>etcd，以其简单性和 Cloud Native Computing Foundation (CNCF) 支持，适合像 Kubernetes 这样的云原生环境。Apache ZooKeeper，作为大型部署的强大选择，提供强一致性，但带有增加的复杂性。另一方面，Consul 以其简单性和有效的服务发现而闻名，与 HashiCorp 栈无缝集成。</p><p>安全性、易用性和集成要求在决策过程中起着关键作用。每个工具都有其优势，因此根据所需的特性和用例做出明智的选择至关重要。</p><h2 id="_10-结论" tabindex="-1"><a class="header-anchor" href="#_10-结论"><span>10. 结论</span></a></h2><p>在本文中，我们全面探讨了 etcd，讨论了其基本概念、关键特性和实际应用。快速入门指南将帮助我们快速设置 etcd 并与其进行程序化交互。此外，与其他分布式键值存储的比较突出了 etcd 的独特优势，使其成为各种分布式系统场景的可靠选择。</p><p>了解分布式可靠的键值存储、分布式系统中数据的关键性以及 etcd 的能力将帮助我们在设计和实现分布式应用程序时做出明智的决策。最后，作为许多分布式系统的支柱，etcd 的简单性、一致性和高可用性使其成为开发人员在应对分布式环境复杂性时的有价值工具。</p><p>一如既往，伴随本文的源代码可在 GitHub 上获得。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
OK</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,83),c=[p];function l(i,o){return t(),s("div",null,c)}const r=n(e,[["render",l],["__file","2024-06-22-A Guide to etcd.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-A%20Guide%20to%20etcd.html","title":"etcd 指南","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Java","etcd"],"tag":["分布式系统","键值存储"],"head":[["meta",{"name":"keywords","content":"etcd, 分布式键值存储, Java, 分布式系统"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-A%20Guide%20to%20etcd.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"etcd 指南"}],["meta",{"property":"og:description","content":"etcd 指南 在分布式系统的复杂世界中，确保高效的数据管理至关重要。分布式可靠的键值存储在维护分布式环境中的数据一致性和可扩展性方面发挥着关键作用。 在这篇全面的教程中，我们将深入探讨 etcd，这是一个开源的分布式键值存储。我们将探索它的基本概念、特性和用例，并提供一个实践快速入门指南。最后，我们将比较 etcd 与其他几种分布式键值存储，以了解它..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T05:50:49.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"分布式系统"}],["meta",{"property":"article:tag","content":"键值存储"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T05:50:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"etcd 指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T05:50:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"etcd 指南 在分布式系统的复杂世界中，确保高效的数据管理至关重要。分布式可靠的键值存储在维护分布式环境中的数据一致性和可扩展性方面发挥着关键作用。 在这篇全面的教程中，我们将深入探讨 etcd，这是一个开源的分布式键值存储。我们将探索它的基本概念、特性和用例，并提供一个实践快速入门指南。最后，我们将比较 etcd 与其他几种分布式键值存储，以了解它..."},"headers":[{"level":2,"title":"2. 分布式键值存储是什么？","slug":"_2-分布式键值存储是什么","link":"#_2-分布式键值存储是什么","children":[]},{"level":2,"title":"3. etcd 是什么？","slug":"_3-etcd-是什么","link":"#_3-etcd-是什么","children":[]},{"level":2,"title":"4. etcd 的特性","slug":"_4-etcd-的特性","link":"#_4-etcd-的特性","children":[]},{"level":2,"title":"5. 安装","slug":"_5-安装","link":"#_5-安装","children":[]},{"level":2,"title":"6. 使用配置文件进行配置","slug":"_6-使用配置文件进行配置","link":"#_6-使用配置文件进行配置","children":[]},{"level":2,"title":"7. 启动和与 etcd 交互","slug":"_7-启动和与-etcd-交互","link":"#_7-启动和与-etcd-交互","children":[]},{"level":2,"title":"8. 代码示例","slug":"_8-代码示例","link":"#_8-代码示例","children":[]},{"level":2,"title":"9. 与 Apache Zookeeper 和 Consul 的比较","slug":"_9-与-apache-zookeeper-和-consul-的比较","link":"#_9-与-apache-zookeeper-和-consul-的比较","children":[]},{"level":2,"title":"10. 结论","slug":"_10-结论","link":"#_10-结论","children":[]}],"git":{"createdTime":1719035449000,"updatedTime":1719035449000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":12.89,"words":3866},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-A Guide to etcd.md","localizedDate":"2024年6月22日","excerpt":"\\n<p>在分布式系统的复杂世界中，确保高效的数据管理至关重要。分布式可靠的键值存储在维护分布式环境中的数据一致性和可扩展性方面发挥着关键作用。</p>\\n<p>在这篇全面的教程中，我们将深入探讨 etcd，这是一个开源的分布式键值存储。我们将探索它的基本概念、特性和用例，并提供一个实践快速入门指南。最后，我们将比较 etcd 与其他几种分布式键值存储，以了解它的优势和独特之处。</p>\\n<h2>2. 分布式键值存储是什么？</h2>\\n<p><strong>分布式键值存储是一种 NoSQL 数据库，它将数据存储为跨多个物理或虚拟机的键值对。</strong></p>\\n<p>这种分布本质上增强了可扩展性、容错性和性能。此外，每个数据片段（值）都与一个唯一的标识符（键）相关联。这种模型对于某些用例非常高效，例如缓存、配置管理和快速数据检索。</p>","autoDesc":true}');export{r as comp,k as data};
