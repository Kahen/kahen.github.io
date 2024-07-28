import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-DzJ3ruqA.js";const t={},p=e(`<h1 id="spring-data-与-arangodb-baeldung" tabindex="-1"><a class="header-anchor" href="#spring-data-与-arangodb-baeldung"><span>Spring Data 与 ArangoDB | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将学习如何使用 Spring Data 模块和 ArangoDB 数据库进行操作。ArangoDB 是一个免费且开源的多模型数据库系统。它支持键值对、文档和图形数据模型，具有统一的查询语言：AQL（ArangoDB 查询语言）。</p><p>我们将涵盖所需的配置、基本的 CRUD 操作、自定义查询和实体关系。</p><h2 id="_2-arangodb-安装" tabindex="-1"><a class="header-anchor" href="#_2-arangodb-安装"><span>2. ArangoDB 安装</span></a></h2><p>要安装 ArangoDB，我们首先需要从官方 ArangoDB 网站的下载页面下载软件包。</p><p>为了本教程的目的，我们将安装 ArangoDB 的社区版。详细的安装步骤可以在这里找到。</p><p>默认安装包含一个名为 <code>_system</code> 的数据库和一个 <code>root</code> 用户，该用户可以访问所有数据库。</p><p>根据软件包的不同，安装程序在安装过程中可能会要求输入 root 密码，或者会设置一个随机密码。</p><p>默认配置下，我们将看到 ArangoDB 服务器在 <code>8529</code> 端口上运行。</p><p>安装完成后，我们可以使用 <code>http://localhost:8529</code> 上的 Web 界面与服务器交互。我们将在本教程后面的 Spring Data 配置中使用此主机和端口。</p><p>我们也可以另外使用 <code>arangosh</code>，这是一个与服务器交互的同步 shell。</p><p>让我们开始启动 <code>arangosh</code> 创建一个名为 <code>baeldung-database</code> 的新数据库，并为这个新创建的数据库创建一个用户 <code>baeldung</code>。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>arangosh<span class="token operator">&gt;</span> db._createDatabase<span class="token punctuation">(</span><span class="token string">&quot;baeldung-database&quot;</span>, <span class="token punctuation">{</span><span class="token punctuation">}</span>, <span class="token punctuation">[</span><span class="token punctuation">{</span> username: <span class="token string">&quot;baeldung&quot;</span>, passwd: <span class="token string">&quot;password&quot;</span>, active: true<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-依赖关系" tabindex="-1"><a class="header-anchor" href="#_3-依赖关系"><span>3. 依赖关系</span></a></h2><p>要在应用程序中使用 Spring Data 与 ArangoDB，我们需要以下依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`com.arangodb\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`arangodb-spring-data\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`3.5.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-配置" tabindex="-1"><a class="header-anchor" href="#_4-配置"><span>4. 配置</span></a></h2><p>在我们开始使用数据之前，我们需要设置与 ArangoDB 的连接。我们应该通过创建一个实现 <em>ArangoConfiguration</em> 接口的配置类来实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ArangoDbConfiguration</span> <span class="token keyword">implements</span> <span class="token class-name">ArangoConfiguration</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在内部，我们需要实现两个方法。第一个方法应该创建一个 <em>ArangoDB.Builder</em> 对象，该对象将生成我们数据库的接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">ArangoDB<span class="token punctuation">.</span>Builder</span> <span class="token function">arango</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ArangoDB<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">host</span><span class="token punctuation">(</span><span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span> <span class="token number">8529</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">user</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">password</span><span class="token punctuation">(</span><span class="token string">&quot;password&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建连接需要四个必需参数：主机、端口、用户名和密码。</p><p>另外，我们可以跳过在配置类中设置这些参数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">ArangoDB<span class="token punctuation">.</span>Builder</span> <span class="token function">arango</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ArangoDB<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为我们可以将它们存储在 <em>arango.properties</em> 资源文件中：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">arangodb.host</span><span class="token punctuation">=</span><span class="token value attr-value">127.0.0.1</span>
<span class="token key attr-name">arangodb.port</span><span class="token punctuation">=</span><span class="token value attr-value">8529</span>
<span class="token key attr-name">arangodb.user</span><span class="token punctuation">=</span><span class="token value attr-value">baeldung</span>
<span class="token key attr-name">arangodb.password</span><span class="token punctuation">=</span><span class="token value attr-value">password</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是 Arango 寻找的默认位置。它可以通过向自定义属性文件传递 <em>InputStream</em> 来重写：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">InputStream</span> in <span class="token operator">=</span> <span class="token class-name">MyClass</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span><span class="token string">&quot;my.properties&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ArangoDB<span class="token punctuation">.</span>Builder</span> arango <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArangoDB<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">loadProperties</span><span class="token punctuation">(</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要实现的第二个方法是简单地提供我们应用程序所需的数据库名称：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">database</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;baeldung-database&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，配置类需要 <em>@EnableArangoRepositories</em> 注解，这告诉 Spring Data 在哪里查找 ArangoDB 仓库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@EnableArangoRepositories</span><span class="token punctuation">(</span>basePackages <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;com.baeldung&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-数据模型" tabindex="-1"><a class="header-anchor" href="#_5-数据模型"><span>5. 数据模型</span></a></h2><p>作为下一步，我们将创建一个数据模型。对于这部分，我们将使用一个包含 <em>name</em>、<em>author</em> 和 <em>publishDate</em> 字段的文章表示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Document</span><span class="token punctuation">(</span><span class="token string">&quot;articles&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Article</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@ArangoId</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> arangoId<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">ZonedDateTime</span> publishDate<span class="token punctuation">;</span>

    <span class="token comment">// 构造函数</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>ArangoDB</em> 实体必须具有 <em>@Document</em> 注解，该注解以集合名称作为参数。默认情况下，它是小写的类名。</p><p>接下来，我们有两个 id 字段。一个带有 Spring 的 <em>@Id</em> 注解，另一个带有 Arango 的 <em>@ArangoId</em> 注解。第一个存储生成的实体 id。第二个存储相同的 id，但是具有数据库中的正确位置。在我们的例子中，这些值可能分别是 <em>1</em> 和 <em>articles/1</em>。</p><p>现在，当我们定义了实体之后，我们可以为数据访问创建一个仓库接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ArticleRepository</span> <span class="token keyword">extends</span> <span class="token class-name">ArangoRepository</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>它应该扩展 <em>ArangoRepository</em> 接口，带有两个泛型参数。在我们的例子中，它是带有类型为 <em>String</em> 的 id 的 <em>Article</em> 类。</p><h2 id="_6-crud-操作" tabindex="-1"><a class="header-anchor" href="#_6-crud-操作"><span>6. CRUD 操作</span></a></h2><p>最后，我们可以创建一些具体数据。</p><p>作为一个起点，我们需要对文章仓库的依赖：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token class-name">ArticleRepository</span> articleRepository<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>以及 <em>Article</em> 类的一个简单实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Article</span> newArticle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span>
  <span class="token string">&quot;ArangoDb with Spring Data&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;Baeldung Writer&quot;</span><span class="token punctuation">,</span>
  <span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，如果我们想将这篇文章存储在我们的数据库中，我们应该简单地调用 <em>save</em> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Article</span> savedArticle <span class="token operator">=</span> articleRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>newArticle<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>之后，我们可以确保 <em>id</em> 和 <em>arangoId</em> 字段已经被生成：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertNotNull</span><span class="token punctuation">(</span>savedArticle<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertNotNull</span><span class="token punctuation">(</span>savedArticle<span class="token punctuation">.</span><span class="token function">getArangoId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>要从数库中获取文章，我们需要先获取它的 id：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> articleId <span class="token operator">=</span> savedArticle<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后简单地调用 <em>findById</em> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>\`\`\`\` articleOpt <span class="token operator">=</span> articleRepository<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>articleId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>articleOpt<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>有了文章实体，我们可以更改它的属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Article</span> article <span class="token operator">=</span> articleOpt<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
article<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;New Article Name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
articleRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>article<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，再次调用 <em>save</em> 方法以更新数据库条目。它不会创建新条目，因为 id 已经被分配给了实体。</p><p>删除条目也是一个简单的操作。我们只需调用仓库的 <em>delete</em> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>articleRepository<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>article<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>按 id 删除也是可能的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>articleRepository<span class="token punctuation">.</span><span class="token function">deleteById</span><span class="token punctuation">(</span>articleId<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_7-自定义查询" tabindex="-1"><a class="header-anchor" href="#_7-自定义查询"><span>7. 自定义查询</span></a></h2><p>使用 <em>Spring Data</em> 和 <em>ArangoDB</em>，我们可以利用派生仓库，并简单地通过方法名定义查询：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ArticleRepository</span> <span class="token keyword">extends</span> <span class="token class-name">ArangoRepository</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token punctuation">{</span>
    <span class="token class-name">Iterable</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">findByAuthor</span><span class="token punctuation">(</span><span class="token class-name">String</span> author<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二个选项是使用 AQL（ArangoDb 查询语言）。这是一个自定义的语法语言，我们可以使用 <em>@Query</em> 注解来应用它。</p><p>现在，让我们看看一个基本的 AQL 查询，它将找到所有给定作者的文章，并按发布日期排序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Query</span><span class="token punctuation">(</span><span class="token string">&quot;FOR a IN articles FILTER a.author == @author SORT a.publishDate ASC RETURN a&quot;</span><span class="token punctuation">)</span>
<span class="token class-name">Iterable</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">getByAuthor</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">&quot;author&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> author<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-关系" tabindex="-1"><a class="header-anchor" href="#_8-关系"><span>8. 关系</span></a></h2><p><em>ArangoDB</em> 允许我们在实体之间创建关系。</p><p>例如，让我们在 <em>Author</em> 类和它的文章之间创建一个关系。</p><p>为此，我们需要定义一个新的集合属性，带有 <em>@Relations</em> 解，其中包含链接到给定作者编写的每篇文章：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Relations</span><span class="token punctuation">(</span>edges <span class="token operator">=</span> <span class="token class-name">ArticleLink</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> lazy <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">Collection</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>\`\`\`\` articles<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，<em>ArangoDB</em> 中的关系是通过一个单独的类来定义的，该类带有 @Edge 注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Edge</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ArticleLink</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@From</span>
    <span class="token keyword">private</span> <span class="token class-name">Article</span> article<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@To</span>
    <span class="token keyword">private</span> <span class="token class-name">Author</span> author<span class="token punctuation">;</span>

    <span class="token comment">// 构造函数，getter 和 setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它带有两个字段，分别带有 <em>@From</em> 和 <em>@To</em> 注解。它们定义了进入和出去的关系。</p><h2 id="_9-结论" tabindex="-1"><a class="header-anchor" href="#_9-结论"><span>9. 结论</span></a></h2><p>在本教程中，我们学习了如何配置 ArangoDB 并使用 Spring Data。我们涵盖了基本的 CRUD 操作、自定义查询和实体关系。</p><p>像往常一样，所有源代码都可以在 GitHub 上找到。</p>`,79),o=[p];function c(i,l){return s(),n("div",null,o)}const d=a(t,[["render",c],["__file","2024-07-26-Spring Data with ArangoDB.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-26/2024-07-26-Spring%20Data%20with%20ArangoDB.html","title":"Spring Data 与 ArangoDB | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Data","ArangoDB"],"tag":["Spring Data","ArangoDB","Java","Database"],"head":[["meta",{"name":"keywords","content":"Spring Data, ArangoDB, Java, Database"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-26/2024-07-26-Spring%20Data%20with%20ArangoDB.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Data 与 ArangoDB | Baeldung"}],["meta",{"property":"og:description","content":"Spring Data 与 ArangoDB | Baeldung 1. 引言 在本教程中，我们将学习如何使用 Spring Data 模块和 ArangoDB 数据库进行操作。ArangoDB 是一个免费且开源的多模型数据库系统。它支持键值对、文档和图形数据模型，具有统一的查询语言：AQL（ArangoDB 查询语言）。 我们将涵盖所需的配置、基本的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-26T22:59:57.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Data"}],["meta",{"property":"article:tag","content":"ArangoDB"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Database"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-26T22:59:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Data 与 ArangoDB | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-26T22:59:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Data 与 ArangoDB | Baeldung 1. 引言 在本教程中，我们将学习如何使用 Spring Data 模块和 ArangoDB 数据库进行操作。ArangoDB 是一个免费且开源的多模型数据库系统。它支持键值对、文档和图形数据模型，具有统一的查询语言：AQL（ArangoDB 查询语言）。 我们将涵盖所需的配置、基本的..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. ArangoDB 安装","slug":"_2-arangodb-安装","link":"#_2-arangodb-安装","children":[]},{"level":2,"title":"3. 依赖关系","slug":"_3-依赖关系","link":"#_3-依赖关系","children":[]},{"level":2,"title":"4. 配置","slug":"_4-配置","link":"#_4-配置","children":[]},{"level":2,"title":"5. 数据模型","slug":"_5-数据模型","link":"#_5-数据模型","children":[]},{"level":2,"title":"6. CRUD 操作","slug":"_6-crud-操作","link":"#_6-crud-操作","children":[]},{"level":2,"title":"7. 自定义查询","slug":"_7-自定义查询","link":"#_7-自定义查询","children":[]},{"level":2,"title":"8. 关系","slug":"_8-关系","link":"#_8-关系","children":[]},{"level":2,"title":"9. 结论","slug":"_9-结论","link":"#_9-结论","children":[]}],"git":{"createdTime":1722034797000,"updatedTime":1722034797000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.51,"words":1652},"filePathRelative":"posts/baeldung/2024-07-26/2024-07-26-Spring Data with ArangoDB.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将学习如何使用 Spring Data 模块和 ArangoDB 数据库进行操作。ArangoDB 是一个免费且开源的多模型数据库系统。它支持键值对、文档和图形数据模型，具有统一的查询语言：AQL（ArangoDB 查询语言）。</p>\\n<p>我们将涵盖所需的配置、基本的 CRUD 操作、自定义查询和实体关系。</p>\\n<h2>2. ArangoDB 安装</h2>\\n<p>要安装 ArangoDB，我们首先需要从官方 ArangoDB 网站的下载页面下载软件包。</p>\\n<p>为了本教程的目的，我们将安装 ArangoDB 的社区版。详细的安装步骤可以在这里找到。</p>","autoDesc":true}');export{d as comp,k as data};
