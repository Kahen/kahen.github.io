import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-_uhw5edP.js";const e={},p=t('<h1 id="如何为集成测试模拟amazon-s3-baeldung" tabindex="-1"><a class="header-anchor" href="#如何为集成测试模拟amazon-s3-baeldung"><span>如何为集成测试模拟Amazon S3 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本文中，我们将学习如何模拟Amazon S3（简单存储服务）以运行Java应用程序的集成测试。</p><p>为了演示它的工作原理，我们将创建一个使用AWS SDK与S3交互的CRUD（创建、读取、更新、删除）服务。然后，我们将使用模拟的S3服务为每个操作编写集成测试。</p><h2 id="_2-s3概述" tabindex="-1"><a class="header-anchor" href="#_2-s3概述"><span>2. S3概述</span></a></h2><p>Amazon Simple Storage Service（S3）是由Amazon Web Services（AWS）提供的高可扩展性和安全的云存储服务。它使用<strong>对象存储模型，允许用户从网络上的任何地方存储和检索数据</strong>。</p><p>该服务可通过REST风格的API访问，AWS为Java应用程序提供了一个SDK，以执行创建、列出和删除S3存储桶和对象等操作。</p><p>接下来，让我们开始使用AWS SDK创建Java S3 CRUD服务，并实现创建、读取、更新和删除操作。</p><h2 id="_3-演示s3-crud-java服务" tabindex="-1"><a class="header-anchor" href="#_3-演示s3-crud-java服务"><span>3. 演示S3 CRUD Java服务</span></a></h2><p>在我们开始使用S3之前，我们需要向我们的项目添加AWS SDK的依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````software.amazon.awssdk````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````s3````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````2.20.52````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要查看最新版本，我们可以检查Maven Central。</p><p>接下来，我们创建了使用<code>software.amazon.awssdk.services.s3.S3Client</code>作为依赖项的<code>S3CrudService</code>类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">S3CrudService</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">S3Client</span> s3Client<span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">S3CrudService</span><span class="token punctuation">(</span><span class="token class-name">S3Client</span> s3Client<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>s3Client <span class="token operator">=</span> s3Client<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们已经创建了服务，<strong>让我们使用AWS SDK提供的<code>S3Client</code> API实现<code>createBucket()</code>、<code>createObject()</code>、<code>getObject()</code>和<code>deleteObject()</code>操作</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">createBucket</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 构建bucketRequest</span>\n    s3Client<span class="token punctuation">.</span><span class="token function">createBucket</span><span class="token punctuation">(</span>bucketRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">void</span> <span class="token function">createObject</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">,</span> <span class="token class-name">File</span> inMemoryObject<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 构建putObjectRequest</span>\n    s3Client<span class="token punctuation">.</span><span class="token function">putObject</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> <span class="token class-name">RequestBody</span><span class="token punctuation">.</span><span class="token function">fromByteBuffer</span><span class="token punctuation">(</span>inMemoryObject<span class="token punctuation">.</span><span class="token function">getContent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token class-name">Optional</span>`<span class="token operator">&lt;</span><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>` <span class="token function">getObject</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">,</span> <span class="token class-name">String</span> objectKey<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 构建getObjectRequest</span>\n        <span class="token class-name">ResponseBytes</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">GetObjectResponse</span><span class="token punctuation">&gt;</span></span>` responseResponseBytes <span class="token operator">=</span> s3Client<span class="token punctuation">.</span><span class="token function">getObjectAsBytes</span><span class="token punctuation">(</span>getObjectRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>responseResponseBytes<span class="token punctuation">.</span><span class="token function">asByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">S3Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">boolean</span> <span class="token function">deleteObject</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">,</span> <span class="token class-name">String</span> objectKey<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 构建deleteObjectRequest</span>\n        s3Client<span class="token punctuation">.</span><span class="token function">deleteObject</span><span class="token punctuation">(</span>deleteObjectRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">S3Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们已经创建了S3操作，让我们学习如何使用模拟的S3服务实现集成测试。</p><h2 id="_4-使用s3mock库进行集成测试" tabindex="-1"><a class="header-anchor" href="#_4-使用s3mock库进行集成测试"><span>4. 使用S3Mock库进行集成测试</span></a></h2><p>对于本教程，<strong>我们选择使用Adobe提供的S3Mock库，该库在开源Apache V2许可下提供</strong>。S3Mock是一个轻量级服务器，实现了Amazon S3 API中最常用的操作。对于支持的S3操作，我们可以在S3Mock存储库的自述文件的专用部分中进行检查。</p><p>库的开发者建议在隔离环境中运行S3Mock服务，最好使用提供的Docker容器。</p><p>按照建议，<strong>让我们使用Docker和Testcontainers为集成测试运行S3Mock服务</strong>。</p><h3 id="_4-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_4-1-依赖项"><span>4.1. 依赖项</span></a></h3><p>接下来，让我们添加运行S3Mock以及Testcontainers所需的依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````com.adobe.testing````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````s3mock````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````3.3.0````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````com.adobe.testing````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````s3mock-testcontainers````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````3.3.0````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````org.testcontainers````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````junit-jupiter````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````1.19.4````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以在Maven Central上查看_s3mock_、<em>s3mock-testcontainers</em>、_junit-jupiter_的最新版本。</p><h3 id="_4-2-设置" tabindex="-1"><a class="header-anchor" href="#_4-2-设置"><span>4.2. 设置</span></a></h3><p><strong>作为先决条件，我们必须有一个运行中的Docker环境，以确保可以启动Test Containers。</strong></p><p>当我们在集成测试类上使用_@TestConainers_和_@Container_注解时，将从注册表中拉取_S3MockContainer_的最新Docker镜像，并在本地Docker环境中启动：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Testcontainers</span>\n<span class="token keyword">class</span> <span class="token class-name">S3CrudServiceIntegrationTest</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Container</span>\n    <span class="token keyword">private</span> <span class="token class-name">S3MockContainer</span> s3Mock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">S3MockContainer</span><span class="token punctuation">(</span><span class="token string">&quot;latest&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在运行集成测试之前，让我们在_@BeforeEach_生命周期方法中创建一个_S3Client_实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@BeforeEach</span>\n<span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> endpoint <span class="token operator">=</span> s3Mock<span class="token punctuation">.</span><span class="token function">getHttpsEndpoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">var</span> serviceConfig <span class="token operator">=</span> <span class="token class-name">S3Configuration</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">pathStyleAccessEnabled</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">var</span> httpClient <span class="token operator">=</span> <span class="token class-name">UrlConnectionHttpClient</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">buildWithDefaults</span><span class="token punctuation">(</span><span class="token class-name">AttributeMap</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token constant">TRUST_ALL_CERTIFICATES</span><span class="token punctuation">,</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token constant">TRUE</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    s3Client <span class="token operator">=</span> <span class="token class-name">S3Client</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">endpointOverride</span><span class="token punctuation">(</span><span class="token constant">URI</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>endpoint<span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">serviceConfiguration</span><span class="token punctuation">(</span>serviceConfig<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">httpClient</span><span class="token punctuation">(</span>httpClient<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在_setup()_方法中，我们使用_S3Client_接口提供的构建器初始化了一个_S3Client_实例。在此初始化中，我们为以下参数指定了配置：</p><ul><li><strong><em>endpointOverwrite</em></strong>：此参数配置为定义模拟服务的地址。</li><li><strong><em>pathStyleAccessEnabled</em></strong>：我们在服务配置中将此参数设置为_true_。</li><li><em><strong>TRUST_ALL_CERTIFICATES</strong></em>：此外，我们配置了一个_httpClient_实例，通过将_TRUST_ALL_CERTIFICATES_设置为_true_，信任所有证书。</li></ul><h3 id="_4-3-为-s3crudservice-编写集成测试" tabindex="-1"><a class="header-anchor" href="#_4-3-为-s3crudservice-编写集成测试"><span>4.3. 为_S3CrudService_编写集成测试</span></a></h3><p>完成基础设施设置后，让我们为_S3CrudService_操作编写一些集成测试。</p><p>首先，让我们创建一个存储桶并验证其成功创建：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">var</span> s3CrudService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">S3CrudService</span><span class="token punctuation">(</span>s3Client<span class="token punctuation">)</span><span class="token punctuation">;</span>\ns3CrudService<span class="token punctuation">.</span><span class="token function">createBucket</span><span class="token punctuation">(</span><span class="token constant">TEST_BUCKET_NAME</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> createdBucketName <span class="token operator">=</span> s3Client<span class="token punctuation">.</span><span class="token function">listBuckets</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">buckets</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token constant">TEST_BUCKET_NAME</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>createdBucketName<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>成功创建存储桶后，让我们在S3中上传一个新对象。</p><p>为此，首先使用_FileGenerator_生成一个字节数组，然后使用已创建的存储桶中的_createObject()_方法将其保存为对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">var</span> fileToSave <span class="token operator">=</span> <span class="token class-name">FileGenerator</span><span class="token punctuation">.</span><span class="token function">generateFiles</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ns3CrudService<span class="token punctuation">.</span><span class="token function">createObject</span><span class="token punctuation">(</span><span class="token constant">TEST_BUCKET_NAME</span><span class="token punctuation">,</span> fileToSave<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们使用已保存文件的文件名调用_getObject()_方法，以确认对象确实保存在S3中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">var</span> savedFileContent <span class="token operator">=</span> s3CrudService<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token constant">TEST_BUCKET_NAME</span><span class="token punctuation">,</span> fileToSave<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>fileToSave<span class="token punctuation">.</span><span class="token function">getContent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">array</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> savedFileContent<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们测试_deleteObject()_是否也按预期工作。首先，我们使用存储桶名称和目标文件名调用_deleteObject()_方法。随后，我们再次调用_getObject()_并检查结果是否为空：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>s3CrudService<span class="token punctuation">.</span><span class="token function">deleteObject</span><span class="token punctuation">(</span><span class="token constant">TEST_BUCKET_NAME</span><span class="token punctuation">,</span> fileToSave<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> deletedFileContent <span class="token operator">=</span> s3CrudService<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token constant">TEST_BUCKET_NAME</span><span class="token punctuation">,</span> fileToSave<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>deletedFileContent<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，<strong>我们学习了如何使用_S3Mock_库模拟真实的S3服务来编写依赖于AWS S3服务的集成测试</strong>。</p><p>为了演示这一点，我们首先实现了一个基本的CRUD服务，用于在S3中创建、读取和删除对象。然后，我们使用S3Mock库实现了集成测试。</p><p>如常，本文的完整实现可以在GitHub上找到。</p>',48),c=[p];function o(l,i){return a(),s("div",null,c)}const r=n(e,[["render",o],["__file","2024-06-21-How to Mock Amazon S3 for Integration Test.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-21/2024-06-21-How%20to%20Mock%20Amazon%20S3%20for%20Integration%20Test.html","title":"如何为集成测试模拟Amazon S3 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java","AWS"],"tag":["S3","Mock","Testing"],"head":[["meta",{"name":"keywords","content":"Java, AWS S3, Mock, Testing, Integration Testing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-21/2024-06-21-How%20to%20Mock%20Amazon%20S3%20for%20Integration%20Test.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何为集成测试模拟Amazon S3 | Baeldung"}],["meta",{"property":"og:description","content":"如何为集成测试模拟Amazon S3 | Baeldung 1. 引言 在本文中，我们将学习如何模拟Amazon S3（简单存储服务）以运行Java应用程序的集成测试。 为了演示它的工作原理，我们将创建一个使用AWS SDK与S3交互的CRUD（创建、读取、更新、删除）服务。然后，我们将使用模拟的S3服务为每个操作编写集成测试。 2. S3概述 Ama..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T11:49:33.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"S3"}],["meta",{"property":"article:tag","content":"Mock"}],["meta",{"property":"article:tag","content":"Testing"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T11:49:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何为集成测试模拟Amazon S3 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T11:49:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何为集成测试模拟Amazon S3 | Baeldung 1. 引言 在本文中，我们将学习如何模拟Amazon S3（简单存储服务）以运行Java应用程序的集成测试。 为了演示它的工作原理，我们将创建一个使用AWS SDK与S3交互的CRUD（创建、读取、更新、删除）服务。然后，我们将使用模拟的S3服务为每个操作编写集成测试。 2. S3概述 Ama..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. S3概述","slug":"_2-s3概述","link":"#_2-s3概述","children":[]},{"level":2,"title":"3. 演示S3 CRUD Java服务","slug":"_3-演示s3-crud-java服务","link":"#_3-演示s3-crud-java服务","children":[]},{"level":2,"title":"4. 使用S3Mock库进行集成测试","slug":"_4-使用s3mock库进行集成测试","link":"#_4-使用s3mock库进行集成测试","children":[{"level":3,"title":"4.1. 依赖项","slug":"_4-1-依赖项","link":"#_4-1-依赖项","children":[]},{"level":3,"title":"4.2. 设置","slug":"_4-2-设置","link":"#_4-2-设置","children":[]},{"level":3,"title":"4.3. 为_S3CrudService_编写集成测试","slug":"_4-3-为-s3crudservice-编写集成测试","link":"#_4-3-为-s3crudservice-编写集成测试","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718970573000,"updatedTime":1718970573000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.54,"words":1363},"filePathRelative":"posts/baeldung/2024-06-21/2024-06-21-How to Mock Amazon S3 for Integration Test.md","localizedDate":"2024年6月21日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本文中，我们将学习如何模拟Amazon S3（简单存储服务）以运行Java应用程序的集成测试。</p>\\n<p>为了演示它的工作原理，我们将创建一个使用AWS SDK与S3交互的CRUD（创建、读取、更新、删除）服务。然后，我们将使用模拟的S3服务为每个操作编写集成测试。</p>\\n<h2>2. S3概述</h2>\\n<p>Amazon Simple Storage Service（S3）是由Amazon Web Services（AWS）提供的高可扩展性和安全的云存储服务。它使用<strong>对象存储模型，允许用户从网络上的任何地方存储和检索数据</strong>。</p>","autoDesc":true}');export{r as comp,d as data};
