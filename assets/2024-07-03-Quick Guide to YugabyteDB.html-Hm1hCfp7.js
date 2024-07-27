import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-CBerKIce.js";const t={},p=e(`<h1 id="yugabytedb-快速指南" tabindex="-1"><a class="header-anchor" href="#yugabytedb-快速指南"><span>YugabyteDB 快速指南</span></a></h1><p>在本文中，我们将探讨YugabyteDB。**YugabyteDB是一个为解决当今分布式云原生应用程序所面临困难而创建的SQL数据库。**Yugabyte DB为企业和开发人员提供了一个开源的高性能数据库。</p><h2 id="_2-yugabytedb架构" tabindex="-1"><a class="header-anchor" href="#_2-yugabytedb架构"><span>2. YugabyteDB架构</span></a></h2><p>**YugabyteDB是一个分布式SQL数据库。**更准确地说，它是一个关系型数据库，提供了一个逻辑上的单一数据库，部署在网络服务器集群中。</p><p>大多数关系型数据库的工作原理如下：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/07/spa-2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>上面的图片代表了单一主复制。你可以看到在图片中，多个设备通过负载均衡器发出请求。此外，我们有多个Web节点连接到几个数据库节点。一个主节点向数据库写入数据，而其他副本只接受只读事务。这个原则运作良好。一个真实来源（一个主节点）允许我们避免数据冲突。但这并不是YugabyteDB的情况：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/07/img_64aafe2a6cc86." alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>**与传统数据库复制系统不同，YugabyteDB利用分片来确保高可用性和容错性。**分片涉及将数据分布在集群的多个节点上，每个节点负责存储数据的一部分。通过将数据分割成更小的部分并将其分布到多个节点，YugabyteDB实现了并行性和负载均衡。如果一个节点失败，YugabyteDB的分片特性确保其余节点可以无缝接管服务数据的责任，保持不间断的可用性。</p><h2 id="_3-数据库示例" tabindex="-1"><a class="header-anchor" href="#_3-数据库示例"><span>3. 数据库示例</span></a></h2><h3 id="_3-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_3-1-maven依赖"><span>3.1. <strong>Maven依赖</strong></span></a></h3><p>我们将从向我们的Maven项目添加以下依赖开始：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.postgresql\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`postgresql\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.springframework.boot\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`spring-boot-starter-data-jpa\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>YugabyteDB与PostgreSQL兼容，因此我们可以轻松地使用PostgreSQL连接器作为我们的示例。</p><h3 id="_3-2-数据库配置" tabindex="-1"><a class="header-anchor" href="#_3-2-数据库配置"><span>3.2. <strong>数据库配置</strong></span></a></h3><p>根据我们的应用程序需求，有多种方式安装Yugabyte。但是，为了简单起见，我们将使用Docker镜像来启动我们的YugabyteDB实例。</p><p>我们将从本地拉取Docker镜像开始：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> pull yugabytedb/yugabyte:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>之后，我们可以启动我们的YugabyteDB实例：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> yugabyte <span class="token parameter variable">-p7000:7000</span> <span class="token parameter variable">-p9000:9000</span> <span class="token parameter variable">-p5433:5433</span> yugabytedb/yugabyte:latest bin/yugabyted start <span class="token parameter variable">--daemon</span><span class="token operator">=</span>false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在我们有一个全功能的YugabyteDB实例。我们可以通过访问_http://localhost:7000/_来查看管理员Web服务器UI：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/07/admin-ui.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>现在我们可以开始在_application.properties_文件中配置数据库连接。</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.datasource.url</span><span class="token punctuation">=</span><span class="token value attr-value">jdbc:postgresql://localhost:5433/yugabyte</span>
<span class="token key attr-name">spring.datasource.username</span><span class="token punctuation">=</span><span class="token value attr-value">yugabyte</span>
<span class="token key attr-name">spring.datasource.password</span><span class="token punctuation">=</span><span class="token value attr-value">yugabyte</span>
<span class="token key attr-name">spring.jpa.hibernate.ddl-auto</span><span class="token punctuation">=</span><span class="token value attr-value">create</span>
<span class="token key attr-name">spring.jpa.database-platform</span><span class="token punctuation">=</span><span class="token value attr-value">org.hibernate.dialect.PostgreSQLDialect</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到配置是最小的，并且类似于PostgreSQL数据库的连接。我们还设置了_spring.jpa.hibernate.ddl-auto_属性值为_create_。这意味着Hibernate将负责创建与我们的实体匹配的表。我们坚持使用最少的配置。</p><h3 id="_3-3-创建表" tabindex="-1"><a class="header-anchor" href="#_3-3-创建表"><span>3.3. 创建表</span></a></h3><p>配置数据库后，我们可以开始创建实体。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;users&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token comment">// getters, setters, toString()</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以运行我们的应用程序，并且用户表将自动创建。我们可以通过进入管理员UI并选择表格部分来检查它：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/07/admin_ui_table.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在这里我们可以看到创建了一个表。此外，我们还可以通过点击表名来获取有关表的更多信息。</p><p>我们还可以使用任何与PostgreSQL兼容的管理工具连接到我们的数据库，比如pgAdmin。</p><h3 id="_3-4-读写数据" tabindex="-1"><a class="header-anchor" href="#_3-4-读写数据"><span>3.4. 读写数据</span></a></h3><p>配置和创建表后，我们需要创建一个仓库—扩展现有的_JPARepository_接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><em>JPARepository_是Spring Data JPA框架的一部分，它为我们提供了一组抽象和实用工具，以简化数据库访问。此外，它还带有诸如_save()</em>、_findById()_和_delete()_等方法，允许我们快速简单地与数据库交互。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenTwoUsers_whenPersistUsingJPARepository_thenUserAreSaved</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">User</span> user1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    user1<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;Alex&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">User</span> user2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    user2<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    userRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>user1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    userRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>user2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>\` allUsers <span class="token operator">=</span> userRepository<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> allUsers<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述示例展示了在数据库中进行两个简单的插入操作以及从表中检索所有数据的查询。为了简单起见，我们编写了一个测试来检查用户是否成功地保存在数据库中。</p><p>运行测试后，我们将得到测试通过的确认，这意味着我们成功地插入并查询了我们的用户。</p><h3 id="_3-5-使用多个集群写数据" tabindex="-1"><a class="header-anchor" href="#_3-5-使用多个集群写数据"><span>3.5. 使用多个集群写数据</span></a></h3><p>**这个数据库的一个优势是其高容错性和弹性。**我们在前面的示例中看到了一个简单的场景，但我们都知道我们通常需要运行数据库的多个实例。我们将在以下示例中看到YugabyteDB是如何管理的。</p><p>我们将从为我们的集群创建一个Docker网络开始：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> network create yugabyte-network
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>之后，我们将创建我们的主要YugabyteDB节点：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> yugabyte1 <span class="token parameter variable">--net</span><span class="token operator">=</span>yugabyte-network <span class="token parameter variable">-p7000:7000</span> <span class="token parameter variable">-p9000:9000</span> <span class="token parameter variable">-p5433:5433</span> yugabytedb/yugabyte:latest bin/yugabyted start <span class="token parameter variable">--daemon</span><span class="token operator">=</span>false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>除此之外，我们可以添加两个更多的节点，这样我们就有一个三节点集群：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> yugabyte2 <span class="token parameter variable">--net</span><span class="token operator">=</span>yugabyte-network yugabytedb/yugabyte:latest bin/yugabyted start <span class="token parameter variable">--join</span><span class="token operator">=</span>yugabyte1 <span class="token parameter variable">--daemon</span><span class="token operator">=</span>false
$ <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> yugabyte3 <span class="token parameter variable">--net</span><span class="token operator">=</span>yugabyte-network yugabytedb/yugabyte:latest bin/yugabyted start <span class="token parameter variable">--join</span><span class="token operator">=</span>yugabyte1 <span class="token parameter variable">--daemon</span><span class="token operator">=</span>false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，如果我们打开在7000端口运行的管理员UI，我们可以看到副本因子是3。这意味着数据在所有三个数据库集群节点上共享。更准确地说，如果一个节点包含一个对象的主副本，其他两个节点将保留该对象的副本。</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/07/admin-ui-3-nodes.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>对于这个示例，我们将实现_CommandLineRunner_接口。通过覆盖_run(String…args)_方法，我们可以编写将在Spring应用程序上下文实例化后，在应用程序启动时调用的代码。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>

    <span class="token keyword">int</span> iterationCount <span class="token operator">=</span> <span class="token number">1_000</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> elementsPerIteration <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> iterationCount<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">long</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> elementsPerIteration<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            userRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这个脚本，我们将按顺序插入一系列元素批次，每批之间暂停一秒钟。我们希望观察数据库如何在节点之间分割负载。</p><p>首先，我们将运行脚本，进入管理员控制台并导航到_Tablet Servers_标签页。</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/07/balanced-load-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在这里我们可以看到，即使在最小的负载均衡配置下，YugabyteDB也可以在集群之间分割所有的负载。</p><h3 id="_3-6-容错性" tabindex="-1"><a class="header-anchor" href="#_3-6-容错性"><span>3.6. 容错性</span></a></h3><p>我们知道事情不可能总是完美的。因此，我们将模拟数据库集群的故障。现在，我们可以再次运行应用程序，但这次我们将在执行过程中停止一个集群：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> stop yugabyte2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，如果我们稍等片刻并再次访问Tablet Servers页面，我们可以看到已停止的容器被标记为死亡。之后，所有的负载将在剩余的集群之间平衡。</p><p>这是通过YugabyteDB基于心跳的机制实现的。这个心跳机制涉及不同节点之间的定期通信，每个节点向其对等节点</p>`,60),o=[p];function l(i,c){return s(),n("div",null,o)}const d=a(t,[["render",l],["__file","2024-07-03-Quick Guide to YugabyteDB.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Quick%20Guide%20to%20YugabyteDB.html","title":"YugabyteDB 快速指南","lang":"zh-CN","frontmatter":{"date":"2023-07-31T00:00:00.000Z","category":["Database","Spring"],"tag":["YugabyteDB","SQL","Distributed SQL"],"head":[["meta",{"name":"keywords","content":"YugabyteDB, SQL, Database, Distributed, Spring Data"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Quick%20Guide%20to%20YugabyteDB.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"YugabyteDB 快速指南"}],["meta",{"property":"og:description","content":"YugabyteDB 快速指南 在本文中，我们将探讨YugabyteDB。**YugabyteDB是一个为解决当今分布式云原生应用程序所面临困难而创建的SQL数据库。**Yugabyte DB为企业和开发人员提供了一个开源的高性能数据库。 2. YugabyteDB架构 **YugabyteDB是一个分布式SQL数据库。**更准确地说，它是一个关系型数..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/07/spa-2.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T11:29:26.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"YugabyteDB"}],["meta",{"property":"article:tag","content":"SQL"}],["meta",{"property":"article:tag","content":"Distributed SQL"}],["meta",{"property":"article:published_time","content":"2023-07-31T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T11:29:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"YugabyteDB 快速指南\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/07/spa-2.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/07/img_64aafe2a6cc86.\\",\\"https://www.baeldung.com/wp-content/uploads/2023/07/admin-ui.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/07/admin_ui_table.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/07/admin-ui-3-nodes.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/07/balanced-load-1.png\\"],\\"datePublished\\":\\"2023-07-31T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T11:29:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"YugabyteDB 快速指南 在本文中，我们将探讨YugabyteDB。**YugabyteDB是一个为解决当今分布式云原生应用程序所面临困难而创建的SQL数据库。**Yugabyte DB为企业和开发人员提供了一个开源的高性能数据库。 2. YugabyteDB架构 **YugabyteDB是一个分布式SQL数据库。**更准确地说，它是一个关系型数..."},"headers":[{"level":2,"title":"2. YugabyteDB架构","slug":"_2-yugabytedb架构","link":"#_2-yugabytedb架构","children":[]},{"level":2,"title":"3. 数据库示例","slug":"_3-数据库示例","link":"#_3-数据库示例","children":[{"level":3,"title":"3.1. Maven依赖","slug":"_3-1-maven依赖","link":"#_3-1-maven依赖","children":[]},{"level":3,"title":"3.2. 数据库配置","slug":"_3-2-数据库配置","link":"#_3-2-数据库配置","children":[]},{"level":3,"title":"3.3. 创建表","slug":"_3-3-创建表","link":"#_3-3-创建表","children":[]},{"level":3,"title":"3.4. 读写数据","slug":"_3-4-读写数据","link":"#_3-4-读写数据","children":[]},{"level":3,"title":"3.5. 使用多个集群写数据","slug":"_3-5-使用多个集群写数据","link":"#_3-5-使用多个集群写数据","children":[]},{"level":3,"title":"3.6. 容错性","slug":"_3-6-容错性","link":"#_3-6-容错性","children":[]}]}],"git":{"createdTime":1720006166000,"updatedTime":1720006166000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.15,"words":1845},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Quick Guide to YugabyteDB.md","localizedDate":"2023年7月31日","excerpt":"\\n<p>在本文中，我们将探讨YugabyteDB。**YugabyteDB是一个为解决当今分布式云原生应用程序所面临困难而创建的SQL数据库。**Yugabyte DB为企业和开发人员提供了一个开源的高性能数据库。</p>\\n<h2>2. YugabyteDB架构</h2>\\n<p>**YugabyteDB是一个分布式SQL数据库。**更准确地说，它是一个关系型数据库，提供了一个逻辑上的单一数据库，部署在网络服务器集群中。</p>\\n<p>大多数关系型数据库的工作原理如下：</p>\\n<figure><img src=\\"https://www.baeldung.com/wp-content/uploads/2023/07/spa-2.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>","autoDesc":true}');export{d as comp,g as data};
