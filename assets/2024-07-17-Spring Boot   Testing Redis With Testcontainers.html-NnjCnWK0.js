import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CtR6X2Br.js";const e={},p=t('<hr><h1 id="spring-boot-–-使用-testcontainers-测试-redis" tabindex="-1"><a class="header-anchor" href="#spring-boot-–-使用-testcontainers-测试-redis"><span>Spring Boot – 使用 Testcontainers 测试 Redis</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Testcontainers 是一个用于创建临时 Docker 容器以进行单元测试的 Java 库。当我们希望避免使用实际服务器进行测试时，它非常有用。</p><p>在本教程中，<strong>我们将学习如何在测试使用 Redis 的 Spring Boot 应用程序时使用 Testcontainers。</strong></p><h2 id="_2-项目设置" tabindex="-1"><a class="header-anchor" href="#_2-项目设置"><span>2. 项目设置</span></a></h2><p>使用任何测试容器的首要前提是<strong>在运行测试的机器上安装 Docker。</strong></p><p>一旦我们安装了 Docker，我们就可以开始设置我们的 Spring Boot 应用程序。</p><p>在这个应用程序中，我们将设置一个 Redis 哈希表、一个仓库和一个服务，该服务将使用仓库与 Redis 进行交互。</p><h3 id="_2-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-依赖项"><span>2.1. 依赖项</span></a></h3><p>让我们首先向项目添加所需的依赖项。</p><p>首先，我们将添加 Spring Boot Starter Test 和 Spring Boot Starter Data Redis 依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````org.springframework.boot`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````spring-boot-starter-test`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`````\n`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````org.springframework.boot`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````spring-boot-starter-data-redis`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们添加 Testcontainers 依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````org.testcontainers`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````testcontainers`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```1.19.7```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-自动配置" tabindex="-1"><a class="header-anchor" href="#_2-2-自动配置"><span>2.2. 自动配置</span></a></h3><p>由于我们不需要任何高级配置，我们可以使用自动配置来设置与 Redis 服务器的连接。</p><p>为此，我们需要将 Redis 连接详细信息添加到 <em>application.properties</em> 文件中：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.redis.host</span><span class="token punctuation">=</span><span class="token value attr-value">127.0.0.1</span>\n<span class="token key attr-name">spring.redis.port</span><span class="token punctuation">=</span><span class="token value attr-value">6379</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-应用程序设置" tabindex="-1"><a class="header-anchor" href="#_3-应用程序设置"><span>3. 应用程序设置</span></a></h2><p>让我们从我们的主应用程序代码开始。我们将构建一个小型应用程序，该应用程序读取并写入产品到 Redis 数据库。</p><h3 id="_3-1-实体" tabindex="-1"><a class="header-anchor" href="#_3-1-实体"><span>3.1. 实体</span></a></h3><p>让我们从 <em>Product</em> 类开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RedisHash</span><span class="token punctuation">(</span><span class="token string">&quot;product&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Product</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">double</span> price<span class="token punctuation">;</span>\n\n    <span class="token comment">// 构造函数，getter 和 setter</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>@RedisHash</em> 注解用于告诉 Spring Data Redis 这个类应该存储在 Redis 哈希表中。将实体存储为哈希表对于不包含嵌套对象的实体是有好处的。</p><h3 id="_3-2-仓库" tabindex="-1"><a class="header-anchor" href="#_3-2-仓库"><span>3.2. 仓库</span></a></h3><p>接下来，我们可以为我们的 <em>Product</em> 哈希定义一个仓库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ProductRepository</span> <span class="token keyword">extends</span> <span class="token class-name">CrudRepository</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CRUD 仓库接口已经实现了我们需要保存、更新、删除和查找产品的方法。所以我们不需要自己定义任何方法。</p><h3 id="_3-3-服务" tabindex="-1"><a class="header-anchor" href="#_3-3-服务"><span>3.3. 服务</span></a></h3><p>最后，让我们创建一个服务，使用 <em>ProductRepository</em> 执行读写操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProductService</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ProductRepository</span> productRepository<span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">ProductService</span><span class="token punctuation">(</span><span class="token class-name">ProductRepository</span> productRepository<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>productRepository <span class="token operator">=</span> productRepository<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">Product</span> <span class="token function">getProduct</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> productRepository<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// 其他方法</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，这个服务可以被控制器或服务用来对产品执行 CRUD 操作。</p><p>在实际应用程序中，这些方法可能包含更复杂的逻辑，但为了本教程的目的，我们将只关注 Redis 交互。</p><p>现在，我们将为我们的 <em>ProductService</em> 编写测试，以测试 CRUD 操作。</p><h3 id="_4-1-测试服务" tabindex="-1"><a class="header-anchor" href="#_4-1-测试服务"><span>4.1. 测试服务</span></a></h3><p>让我们为 <em>ProductService</em> 编写一个集成测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenProductCreated_whenGettingProductById_thenProductExistsAndHasSameProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Product</span> product <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Test Product&quot;</span><span class="token punctuation">,</span> <span class="token number">10.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    productService<span class="token punctuation">.</span><span class="token function">createProduct</span><span class="token punctuation">(</span>product<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Product</span> productFromDb <span class="token operator">=</span> productService<span class="token punctuation">.</span><span class="token function">getProduct</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> productFromDb<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Test Product&quot;</span><span class="token punctuation">,</span> productFromDb<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">10.0</span><span class="token punctuation">,</span> productFromDb<span class="token punctuation">.</span><span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这假设 Redis 数据库在属性中指定的 URL 上运行。如果我们没有运行 Redis 实例或我们的服务器无法连接到它，测试将遇到错误。</strong></p><h3 id="_4-2-使用-testcontainers-启动-redis-容器" tabindex="-1"><a class="header-anchor" href="#_4-2-使用-testcontainers-启动-redis-容器"><span>4.2. 使用 Testcontainers 启动 Redis 容器</span></a></h3><p>让我们通过在测试运行时运行 Redis 测试容器来解决这个问题。然后，我们将从代码本身更改连接详细信息。</p><p>让我们看看创建和运行测试容器的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token punctuation">{</span>\n    <span class="token class-name">GenericContainer</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>`` redis <span class="token operator">=</span>\n      <span class="token keyword">new</span> <span class="token class-name">GenericContainer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">DockerImageName</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;redis:5.0.3-alpine&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withExposedPorts</span><span class="token punctuation">(</span><span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    redis<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们理解这段代码的不同部分：</p><ul><li>我们从 <em>redis:5.0.3-alpine</em> 镜像创建了一个新的容器</li><li>默认情况下，Redis 实例将在端口 <em>6379</em> 上运行。为了暴露这个端口，我们可以使用 <em>withExposedPorts()</em> 方法。<strong>它将暴露这个端口并将其映射到主机机器上的一个随机端口</strong></li><li><em>start()</em> 方法将启动容器并等待其准备就绪</li><li><strong>我们将此代码添加到 <em>static</em> 代码块中，以便在依赖注入和测试运行之前运行</strong></li></ul><h3 id="_4-3-更改连接详细信息" tabindex="-1"><a class="header-anchor" href="#_4-3-更改连接详细信息"><span>4.3. 更改连接详细信息</span></a></h3><p>此时，我们有一个正在运行的 Redis 容器，但我们还没有更改应用程序使用的连接详细信息。为此，我们所要做的就是<strong>使用系统属性覆盖 <em>application.properties</em> 文件中的连接详细信息</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token punctuation">{</span>\n    <span class="token class-name">GenericContainer</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>`` redis <span class="token operator">=</span>\n      <span class="token keyword">new</span> <span class="token class-name">GenericContainer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">DockerImageName</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;redis:5.0.3-alpine&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withExposedPorts</span><span class="token punctuation">(</span><span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    redis<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;spring.redis.host&quot;</span><span class="token punctuation">,</span> redis<span class="token punctuation">.</span><span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;spring.redis.port&quot;</span><span class="token punctuation">,</span> redis<span class="token punctuation">.</span><span class="token function">getMappedPort</span><span class="token punctuation">(</span><span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们<strong>将 <em>spring.redis.host</em> 属性设置为容器的 IP 地址。</strong></p><p>我们可以<strong>获取端口 <em>6379</em> 的映射端口以设置 <em>spring.redis.port</em> 属性。</strong></p><p>现在当测试运行时，它们将连接到运行在容器上的 Redis 数据库。</p><h3 id="_4-4-redis-容器的替代配置" tabindex="-1"><a class="header-anchor" href="#_4-4-redis-容器的替代配置"><span>4.4. Redis 容器的替代配置</span></a></h3><p>另外，我们可以使用通过 <em>@Testcontainers</em> 注解管理 Redis 容器的生命周期的 Jupiter 集成。当使用此集成时，我们可以使用 <em>@Container</em> 注解标记容器以进行生命周期管理。让我们继续使用这种方法为我们的测试配置 Redis 容器。</p><p>首先，我们必须在项目的 <em>pom.xml</em> 文件中添加 <em>junit-jupiter</em> 和 <em>testcontainers-redis-junit-jupiter</em> 依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````org.testcontainers`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````junit-jupiter`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```1.17.6```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`````\n\n`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````com.redis.testcontainers`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````testcontainers-redis-junit-jupiter`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```1.4.6```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们使用 <em>@Container</em> 注解定义 <em>REDIS_CONTAINER</em> 静态字段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Container</span>\n<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">RedisContainer</span> <span class="token constant">REDIS_CONTAINER</span> <span class="token operator">=</span>\n  <span class="token keyword">new</span> <span class="token class-name">RedisContainer</span><span class="token punctuation">(</span><span class="token class-name">DockerImageName</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;redis:5.0.3-alpine&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withExposedPorts</span><span class="token punctuation">(</span><span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们必须注意，定义为静态字段的容器将在测试方法之间共享，并且只启动一次。</p><p>此外，<strong>让我们使用 <em>@DynamicPropertySource</em> 注解定义 <em>registerRedisProperties()</em> 方法来为应用程序配置连接属性</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@DynamicPropertySource</span>\n<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">registerRedisProperties</span><span class="token punctuation">(</span><span class="token class-name">DynamicPropertyRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    registry<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;spring.redis.host&quot;</span><span class="token punctuation">,</span> <span class="token constant">REDIS_CONTAINER</span><span class="token operator">::</span><span class="token function">getHost</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    registry<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;spring.redis.port&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token constant">REDIS_CONTAINER</span><span class="token punctuation">.</span><span class="token function">getMappedPort</span><span class="token punctuation">(</span><span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们验证我们的配置是否按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenRedisContainerConfiguredWithDynamicProperties_whenCheckingRunningStatus_thenStatusIsRunning</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token constant">REDIS_CONTAINER</span><span class="token punctuation">.</span><span class="token function">isRunning</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完美！我们可以看到 Redis 容器对测试方法可用。此外，我们不必更改其他测试方法，可以像以前一样使用它们。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何使用 Redis Testcontainer 运行测试。我们还查看了 Spring Data Redis 的某些方面，以了解如何使用它。</p><p>一如既往，示例的源代码可以在 GitHub 上找到。</p>',66),o=[p];function c(i,l){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-17-Spring Boot   Testing Redis With Testcontainers.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Spring%20Boot%20%20%20Testing%20Redis%20With%20Testcontainers.html","title":"Spring Boot – 使用 Testcontainers 测试 Redis","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Boot","Redis"],"tag":["Testcontainers","Java"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Redis, Testcontainers, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Spring%20Boot%20%20%20Testing%20Redis%20With%20Testcontainers.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Boot – 使用 Testcontainers 测试 Redis"}],["meta",{"property":"og:description","content":"Spring Boot – 使用 Testcontainers 测试 Redis 1. 概述 Testcontainers 是一个用于创建临时 Docker 容器以进行单元测试的 Java 库。当我们希望避免使用实际服务器进行测试时，它非常有用。 在本教程中，我们将学习如何在测试使用 Redis 的 Spring Boot 应用程序时使用 Testco..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T05:08:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Testcontainers"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T05:08:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot – 使用 Testcontainers 测试 Redis\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T05:08:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Boot – 使用 Testcontainers 测试 Redis 1. 概述 Testcontainers 是一个用于创建临时 Docker 容器以进行单元测试的 Java 库。当我们希望避免使用实际服务器进行测试时，它非常有用。 在本教程中，我们将学习如何在测试使用 Redis 的 Spring Boot 应用程序时使用 Testco..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 项目设置","slug":"_2-项目设置","link":"#_2-项目设置","children":[{"level":3,"title":"2.1. 依赖项","slug":"_2-1-依赖项","link":"#_2-1-依赖项","children":[]},{"level":3,"title":"2.2. 自动配置","slug":"_2-2-自动配置","link":"#_2-2-自动配置","children":[]}]},{"level":2,"title":"3. 应用程序设置","slug":"_3-应用程序设置","link":"#_3-应用程序设置","children":[{"level":3,"title":"3.1. 实体","slug":"_3-1-实体","link":"#_3-1-实体","children":[]},{"level":3,"title":"3.2. 仓库","slug":"_3-2-仓库","link":"#_3-2-仓库","children":[]},{"level":3,"title":"3.3. 服务","slug":"_3-3-服务","link":"#_3-3-服务","children":[]},{"level":3,"title":"4.1. 测试服务","slug":"_4-1-测试服务","link":"#_4-1-测试服务","children":[]},{"level":3,"title":"4.2. 使用 Testcontainers 启动 Redis 容器","slug":"_4-2-使用-testcontainers-启动-redis-容器","link":"#_4-2-使用-testcontainers-启动-redis-容器","children":[]},{"level":3,"title":"4.3. 更改连接详细信息","slug":"_4-3-更改连接详细信息","link":"#_4-3-更改连接详细信息","children":[]},{"level":3,"title":"4.4. Redis 容器的替代配置","slug":"_4-4-redis-容器的替代配置","link":"#_4-4-redis-容器的替代配置","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721192886000,"updatedTime":1721192886000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.23,"words":1570},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Spring Boot   Testing Redis With Testcontainers.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Spring Boot – 使用 Testcontainers 测试 Redis</h1>\\n<h2>1. 概述</h2>\\n<p>Testcontainers 是一个用于创建临时 Docker 容器以进行单元测试的 Java 库。当我们希望避免使用实际服务器进行测试时，它非常有用。</p>\\n<p>在本教程中，<strong>我们将学习如何在测试使用 Redis 的 Spring Boot 应用程序时使用 Testcontainers。</strong></p>\\n<h2>2. 项目设置</h2>\\n<p>使用任何测试容器的首要前提是<strong>在运行测试的机器上安装 Docker。</strong></p>","autoDesc":true}');export{d as comp,k as data};
