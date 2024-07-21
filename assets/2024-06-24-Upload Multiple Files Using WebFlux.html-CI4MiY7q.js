import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CXN34Kw1.js";const e={},p=t('<hr><h1 id="spring-webflux-多文件上传指南" tabindex="-1"><a class="header-anchor" href="#spring-webflux-多文件上传指南"><span>Spring WebFlux 多文件上传指南</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Spring WebFlux 是一个响应式的 Web 框架，它提供了一个非阻塞事件循环来异步处理 I/O 操作。此外，它使用 <em>Mono</em> 和 <em>Flux</em> 反应式流发布者在订阅时发出数据。</p><p>这种响应式方法有助于应用程序在不分配大量资源的情况下处理大量请求和数据。</p><p>在本教程中，我们将学习如何通过 Spring WebFlux 逐步将多个文件上传到目录。此外，我们将把文件名映射到实体类，以便于检索。</p><h2 id="_2-项目设置" tabindex="-1"><a class="header-anchor" href="#_2-项目设置"><span>2. 项目设置</span></a></h2><p>让我们创建一个简单的反应式 Spring Boot 项目，将多个文件上传到目录。为了简单起见，我们将使用项目的根目录来存储文件。<strong>在生产环境中，我们可以使用像 AWS S3、Azure Blob Storage、Oracle Cloud Infrastructure 存储等文件系统</strong>。</p><h3 id="_2-1-maven-依赖" tabindex="-1"><a class="header-anchor" href="#_2-1-maven-依赖"><span>2.1. Maven 依赖</span></a></h3><p>首先，让我们通过向 <em>pom.xml</em> 添加 <em>spring-boot-starter-webflux</em> 依赖来启动一个 Spring WebFlux 应用程序：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````org.springframework.boot````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````spring-boot-starter-webflux````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````3.2.0````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这提供了构建反应式 Web 应用程序的核心 Spring WebFlux API 和嵌入式 Netty 服务器</strong>。</p><p>同时，让我们向 <em>pom.xml</em> 文件添加 <em>spring-boot-starter-data-r2dbc</em> 和 H2 数据库依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````org.springframework.boot````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````spring-boot-starter-data-r2dbc````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````3.2.0````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````com.h2database````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````h2````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````2.2.224````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Spring WebFlux R2DBC 是一个反应式数据库连接器，H2 数据库是一个内存数据库。</p><p>最后，让我们向 <em>pom.xml</em> 添加 R2DBC 原生驱动依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````io.r2dbc````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````r2dbc-h2````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````1.0.0.RELEASE````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个原生驱动是为 H2 数据库实现的。</p><h3 id="_2-2-实体、仓库和控制器" tabindex="-1"><a class="header-anchor" href="#_2-2-实体、仓库和控制器"><span>2.2. 实体、仓库和控制器</span></a></h3><p>让我们创建一个名为 <em>FileRecord</em> 的实体类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">FileRecord</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Id</span>\n    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` filenames<span class="token punctuation">;</span>\n\n    <span class="token comment">// 标准的 getter, setter, 构造函数</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们创建一个名为 <em>FileRecordRepository</em> 的仓库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>\n<span class="token keyword">interface</span> <span class="token class-name">FileRecordRepository</span> <span class="token keyword">extends</span> <span class="token class-name">R2dbcRepository</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FileRecord</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>` <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们创建一个控制器类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>\n<span class="token keyword">class</span> <span class="token class-name">FileRecordController</span> <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在后续部分中，我们将把文件名及其扩展名映射到 <em>fileName</em> 字段。</p><h2 id="_3-将文件上传到目录" tabindex="-1"><a class="header-anchor" href="#_3-将文件上传到目录"><span>3. 将文件上传到目录</span></a></h2><p>有时，我们可能会将多个文件上传到文件系统，而不将文件名映射到数据库实体。<strong>在这种情况下，以后检索文件可能会有挑战</strong>。</p><p>让我们看一个示例代码，它将多个文件上传到我们的根目录，而不映射文件名到实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/upload-files&quot;</span><span class="token punctuation">)</span>\n<span class="token class-name">Mono</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` <span class="token function">uploadFileWithoutEntity</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestPart</span><span class="token punctuation">(</span><span class="token string">&quot;files&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Flux</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FilePart</span><span class="token punctuation">&gt;</span></span>`` filePartFlux<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> filePartFlux<span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>file <span class="token operator">-&gt;</span>\n        file<span class="token punctuation">.</span><span class="token function">transferTo</span><span class="token punctuation">(</span><span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">filename</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token class-name">Mono</span><span class="token punctuation">.</span><span class="token function">just</span><span class="token punctuation">(</span><span class="token string">&quot;OK&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">onErrorResume</span><span class="token punctuation">(</span>error <span class="token operator">-&gt;</span> <span class="token class-name">Mono</span><span class="token punctuation">.</span><span class="token function">just</span><span class="token punctuation">(</span><span class="token string">&quot;Error uploading files&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们创建了一个名为 <em>uploadFileWithoutEntity()</em> 的方法，它接受 <em>FilePart</em> 对象的 <em>Flux</em>。<strong>然后，我们对每个 <em>FilePart</em> 对象调用 <em>flatMap()</em> 方法来传输文件并返回一个 <em>Mono</em></strong>。这为每个文件传输操作创建了一个单独的 <em>Mono</em>，并将 <em>Mono</em> 流展平为一个单一的 <em>Mono</em>。</p><p>让我们通过 Postman 测试端点：</p><p>在上面的图片中，我们将三个文件上传到项目根目录。端点返回 <em>OK</em> 以显示操作已成功完成。</p><p><strong>值得注意的是，我们使用 <em>onErrorResume()</em> 方法来显式处理与文件上传相关的错误。如果上传过程中发生失败，端点将返回错误消息</strong>。</p><p>然而，在失败之前上传的文件可能已经成功传输。在这种情况下，可能需要清理以删除错误时的部分上传文件。为了简单起见，我们没有涵盖清理过程。</p><h2 id="_4-将上传的文件映射到数据库实体" tabindex="-1"><a class="header-anchor" href="#_4-将上传的文件映射到数据库实体"><span>4. 将上传的文件映射到数据库实体</span></a></h2><p>此外，我们可以将文件名映射到数据库实体。这使我们以后可以通过它们的 <em>Id</em> 检索文件。当我们想要显示图像或执行进一步计算时，这很有用。</p><h3 id="_4-1-数据库配置" tabindex="-1"><a class="header-anchor" href="#_4-1-数据库配置"><span>4.1. 数据库配置</span></a></h3><p>首先，让我们在资源文件夹中创建一个 <em>schema.sql</em> 文件来定义数据库表结构：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> file_record <span class="token punctuation">(</span>\n    id <span class="token keyword">INT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>\n    filenames <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>id<span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个文件记录表来存储上传的文件名及其扩展名。接下来，让我们编写一个配置来在启动时初始化模式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>\n<span class="token class-name">ConnectionFactoryInitializer</span> <span class="token function">initializer</span><span class="token punctuation">(</span><span class="token class-name">ConnectionFactory</span> connectionFactory<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ConnectionFactoryInitializer</span> initializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConnectionFactoryInitializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    initializer<span class="token punctuation">.</span><span class="token function">setConnectionFactory</span><span class="token punctuation">(</span>connectionFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    initializer<span class="token punctuation">.</span><span class="token function">setDatabasePopulator</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ResourceDatabasePopulator</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ClassPathResource</span><span class="token punctuation">(</span><span class="token string">&quot;schema.sql&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> initializer<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时，让我们在 <em>application.properties</em> 文件中定义数据库 URL：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.r2dbc.url</span><span class="token punctuation">=</span><span class="token value attr-value">r2dbc:h2:file:///./testdb</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，我们定义了 R2DBC URL 以连接到 H2 数据库。为了简单起见，数据库没有用密码保护。</p><h3 id="_4-2-服务层" tabindex="-1"><a class="header-anchor" href="#_4-2-服务层"><span>4.2. 服务层</span></a></h3><p>首先，让我们创建一个服务类并添加处理数据持久性的逻辑：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FileRecordService</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">FileRecordRepository</span> fileRecordRepository<span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">FileRecordService</span><span class="token punctuation">(</span><span class="token class-name">FileRecordRepository</span> fileRecordRepository<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>fileRecordRepository <span class="token operator">=</span> fileRecordRepository<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">Mono</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FileRecord</span><span class="token punctuation">&gt;</span></span>```` <span class="token function">save</span><span class="token punctuation">(</span><span class="token class-name">FileRecord</span> fileRecord<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> fileRecordRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>fileRecord<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在这里，我们在服务类中注入了 <em>FileRecordRepository</em> 接口，并定义了保存文件名及其扩展名到数据库的逻辑</strong>。</p><p>接下来，让我们将 <em>FileRecordService</em> 类注入到控制器类中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">FileRecordService</span> fileRecordService<span class="token punctuation">;</span>\n\n<span class="token keyword">public</span> <span class="token class-name">FileRecordController</span><span class="token punctuation">(</span><span class="token class-name">FileRecordService</span> fileRecordService<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>fileRecordService <span class="token operator">=</span> fileRecordService<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码使持久化数据的逻辑在控制器类中可用。</p><h3 id="_4-3-上传端点" tabindex="-1"><a class="header-anchor" href="#_4-3-上传端点"><span>4.3. 上传端点</span></a></h3><p>最后，让我们编写一个端点，将多个文件上传到根目录，并将文件名及其扩展名映射到实体类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/upload-files-entity&quot;</span><span class="token punctuation">)</span>\n<span class="token class-name">Mono</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FileRecord</span><span class="token punctuation">&gt;</span></span>```` <span class="token function">uploadFileWithEntity</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestPart</span><span class="token punctuation">(</span><span class="token string">&quot;files&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Flux</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FilePart</span><span class="token punctuation">&gt;</span></span>`` filePartFlux<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">FileRecord</span> fileRecord <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileRecord</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> filePartFlux<span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>filePart <span class="token operator">-&gt;</span>\n        filePart<span class="token punctuation">.</span><span class="token function">transferTo</span><span class="token punctuation">(</span><span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>filePart<span class="token punctuation">.</span><span class="token function">filename</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token class-name">Mono</span><span class="token punctuation">.</span><span class="token function">just</span><span class="token punctuation">(</span>filePart<span class="token punctuation">.</span><span class="token function">filename</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">collectList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>filenames <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        fileRecord<span class="token punctuation">.</span><span class="token function">setFilenames</span><span class="token punctuation">(</span>filenames<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> fileRecordService<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>fileRecord<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">onErrorResume</span><span class="token punctuation">(</span>error <span class="token operator">-&gt;</span> <span class="token class-name">Mono</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个发出 <em>Mono</em> 的端点。<strong>它接受 <em>FilePart</em> 的 <em>Flux</em> 并上传每个文件。接下来，它收集文件名及其扩展名，并将它们映射到 <em>FileRecord</em> 实体</strong>。</p><p>让我们使用 Postman 测试端点：</p><p>在这里，我们将名为 <em>spring-config.xml</em> 和 <em>server_name.png</em> 的两个文件上传到服务器。POST 请求发出一个 <em>Mono</em>，显示请求的详细信息。</p><p>为了简单起见，我们没有验证文件名、类型和大小。</p><h3 id="_4-4-通过-id-检索文件" tabindex="-1"><a class="header-anchor" href="#_4-4-通过-id-检索文件"><span>4.4. 通过 <em>Id</em> 检索文件</span></a></h3><p>让我们实现一个端点，通过其 <em>Id</em> 检索存储的文件记录以查看关联的文件名。</p><p>首先，让我们将通过其 <em>Id</em> 检索文件记录的逻辑添加到服务类中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Mono</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FileRecord</span><span class="token punctuation">&gt;</span></span>```` <span class="token function">findById</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> fileRecordRepository<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们调用 <em>bookRepository</em> 上的 <em>findById()</em> 来检索存储的书籍。</p><p>接下来，让我们编写一个检索文件记录的端点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/files/{id}&quot;</span><span class="token punctuation">)</span>\n<span class="token class-name">Mono</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FileRecord</span><span class="token punctuation">&gt;</span></span>```` <span class="token function">getFilesById</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token keyword">int</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span>```java\nfileRecordService<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">onErrorResume</span><span class="token punctuation">(</span>error <span class="token operator">-&gt;</span> <span class="token class-name">Mono</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个端点返回一个包含文件 <em>Id</em> 和文件名的 <em>Mono</em>。</p><p>让我们看看使用 Postman 的端点操作：</p><p>上面的图片显示了返回的文件信息。<strong>可以在 API 响应中返回图片文件的 URL。客户端可以使用这些 URL 来检索和显示图片</strong>。通过将文件传递给处理服务，可以实现对图片的额外处理和编辑。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何使用 Spring WebFlux 将多个文件上传到服务器文件系统。我们还看到了如何带或不带将文件名和扩展名映射到数据库实体来上传文件。</p><p>最后，我们看到了一种将文件上传并将其名称和扩展名持久化到数据库的方法。</p><p>如往常一样，示例的完整源代码可在 GitHub 上找到。</p><p>OK</p>',74),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-24-Upload Multiple Files Using WebFlux.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Upload%20Multiple%20Files%20Using%20WebFlux.html","title":"Spring WebFlux 多文件上传指南","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Spring WebFlux","文件上传"],"tag":["Spring WebFlux","文件上传","异步I/O","非阻塞"],"head":[["meta",{"name":"keywords","content":"Spring WebFlux, 文件上传, 异步I/O, 非阻塞"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Upload%20Multiple%20Files%20Using%20WebFlux.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring WebFlux 多文件上传指南"}],["meta",{"property":"og:description","content":"Spring WebFlux 多文件上传指南 1. 概述 Spring WebFlux 是一个响应式的 Web 框架，它提供了一个非阻塞事件循环来异步处理 I/O 操作。此外，它使用 Mono 和 Flux 反应式流发布者在订阅时发出数据。 这种响应式方法有助于应用程序在不分配大量资源的情况下处理大量请求和数据。 在本教程中，我们将学习如何通过 Spr..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T06:08:20.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring WebFlux"}],["meta",{"property":"article:tag","content":"文件上传"}],["meta",{"property":"article:tag","content":"异步I/O"}],["meta",{"property":"article:tag","content":"非阻塞"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T06:08:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring WebFlux 多文件上传指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T06:08:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring WebFlux 多文件上传指南 1. 概述 Spring WebFlux 是一个响应式的 Web 框架，它提供了一个非阻塞事件循环来异步处理 I/O 操作。此外，它使用 Mono 和 Flux 反应式流发布者在订阅时发出数据。 这种响应式方法有助于应用程序在不分配大量资源的情况下处理大量请求和数据。 在本教程中，我们将学习如何通过 Spr..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 项目设置","slug":"_2-项目设置","link":"#_2-项目设置","children":[{"level":3,"title":"2.1. Maven 依赖","slug":"_2-1-maven-依赖","link":"#_2-1-maven-依赖","children":[]},{"level":3,"title":"2.2. 实体、仓库和控制器","slug":"_2-2-实体、仓库和控制器","link":"#_2-2-实体、仓库和控制器","children":[]}]},{"level":2,"title":"3. 将文件上传到目录","slug":"_3-将文件上传到目录","link":"#_3-将文件上传到目录","children":[]},{"level":2,"title":"4. 将上传的文件映射到数据库实体","slug":"_4-将上传的文件映射到数据库实体","link":"#_4-将上传的文件映射到数据库实体","children":[{"level":3,"title":"4.1. 数据库配置","slug":"_4-1-数据库配置","link":"#_4-1-数据库配置","children":[]},{"level":3,"title":"4.2. 服务层","slug":"_4-2-服务层","link":"#_4-2-服务层","children":[]},{"level":3,"title":"4.3. 上传端点","slug":"_4-3-上传端点","link":"#_4-3-上传端点","children":[]},{"level":3,"title":"4.4. 通过 Id 检索文件","slug":"_4-4-通过-id-检索文件","link":"#_4-4-通过-id-检索文件","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719209300000,"updatedTime":1719209300000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.31,"words":1893},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Upload Multiple Files Using WebFlux.md","localizedDate":"2024年6月24日","excerpt":"<hr>\\n<h1>Spring WebFlux 多文件上传指南</h1>\\n<h2>1. 概述</h2>\\n<p>Spring WebFlux 是一个响应式的 Web 框架，它提供了一个非阻塞事件循环来异步处理 I/O 操作。此外，它使用 <em>Mono</em> 和 <em>Flux</em> 反应式流发布者在订阅时发出数据。</p>\\n<p>这种响应式方法有助于应用程序在不分配大量资源的情况下处理大量请求和数据。</p>\\n<p>在本教程中，我们将学习如何通过 Spring WebFlux 逐步将多个文件上传到目录。此外，我们将把文件名映射到实体类，以便于检索。</p>\\n<h2>2. 项目设置</h2>","autoDesc":true}');export{d as comp,k as data};
