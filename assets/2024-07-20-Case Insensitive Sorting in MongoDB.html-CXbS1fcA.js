import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BkL9UgS7.js";const e={},p=t(`<h1 id="mongodb中不区分大小写的排序-baeldung" tabindex="-1"><a class="header-anchor" href="#mongodb中不区分大小写的排序-baeldung"><span>MongoDB中不区分大小写的排序 | Baeldung</span></a></h1><ol><li>概述</li></ol><p>默认情况下，MongoDB引擎在排序提取的数据时会考虑字符的大小写。<strong>通过指定聚合(<em>Aggregations</em>)或排序规则(<em>Collations</em>)，可以执行不区分大小写的排序查询。</strong></p><p>在这个简短的教程中，我们将使用MongoDB Shell和Java来探讨这两种解决方案。</p><ol start="2"><li>设置环境</li></ol><p>首先，我们需要运行一个MongoDB服务器。让我们使用一个Docker镜像：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">27017</span>:27017 <span class="token parameter variable">--name</span> example-mongo mongo:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将创建一个名为“<em>example-mongo</em>”的新临时Docker容器，开放端口_27017_。现在，我们需要创建一个基本的Mongo数据库，其中包含我们需要测试解决方案的数据。</p><p>首先，让我们在容器内打开Mongo Shell：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> example-mongo mongosh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一旦我们进入shell，让我们切换上下文并进入名为“<em>sorting</em>”的数据库：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> use sorting
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，让我们插入一些数据供我们尝试排序操作：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.users.insertMany<span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>name: <span class="token string">&quot;ben&quot;</span>, surname: <span class="token string">&quot;ThisField&quot;</span><span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>name: <span class="token string">&quot;aen&quot;</span>, surname: <span class="token string">&quot;Does&quot;</span><span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>name: <span class="token string">&quot;Aen&quot;</span>, surname: <span class="token string">&quot;Not&quot;</span><span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>name: <span class="token string">&quot;Ben&quot;</span>, surname: <span class="token string">&quot;Matter&quot;</span><span class="token punctuation">}</span>,
<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在一些文档的_name_字段中插入了相似的值。唯一的区别是第一个字母的大小写。此时，数据库已创建并适当插入了数据，所以我们准备开始行动。</p><ol start="3"><li>默认排序</li></ol><p>让我们运行没有定制的标准查询：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.getCollection<span class="token punctuation">(</span><span class="token string">&#39;users&#39;</span><span class="token punctuation">)</span>.find<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>.sort<span class="token punctuation">(</span><span class="token punctuation">{</span>name:1<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>返回的数据将考虑大小写进行排序。这意味着，例如，大写字母“_B”将被认为在小写字母“_a”之前：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    _id<span class="token operator">:</span> ...<span class="token punctuation">,</span> name<span class="token operator">:</span> &#39;Aen&#39;<span class="token punctuation">,</span> surname<span class="token operator">:</span> &#39;Not&#39;
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    _id<span class="token operator">:</span> ...<span class="token punctuation">,</span> name<span class="token operator">:</span> &#39;Ben&#39;<span class="token punctuation">,</span> surname<span class="token operator">:</span> &#39;Matter&#39;
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    _id<span class="token operator">:</span> ...<span class="token punctuation">,</span> name<span class="token operator">:</span> &#39;aen&#39;<span class="token punctuation">,</span> surname<span class="token operator">:</span> &#39;Does&#39;
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    _id<span class="token operator">:</span> ...<span class="token punctuation">,</span> name<span class="token operator">:</span> &#39;ben&#39;<span class="token punctuation">,</span> surname<span class="token operator">:</span> &#39;ThisField&#39;
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们来看看如何使我们的排序不区分大小写，以便_Ben_和_ben_会一起出现。</p><ol start="4"><li>Mongo Shell中的不区分大小写的排序</li></ol><h3 id="_4-1-使用-collation-排序" tabindex="-1"><a class="header-anchor" href="#_4-1-使用-collation-排序"><span>4.1. 使用_Collation_排序</span></a></h3><p>让我们尝试使用MongoDB排序规则。仅在MongoDB 3.4及更高版本中可用，它允许使用特定于语言的字符串比较规则。</p><p>**排序规则ICU _locale_参数驱动数据库如何进行排序。**让我们使用“<em>en</em>”（英语）<em>locale</em>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.getCollection<span class="token punctuation">(</span><span class="token string">&#39;users&#39;</span><span class="token punctuation">)</span>.find<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>.collation<span class="token punctuation">(</span><span class="token punctuation">{</span>locale: <span class="token string">&quot;en&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>.sort<span class="token punctuation">(</span><span class="token punctuation">{</span>name:1<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将产生按字母聚集的输出：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    _id<span class="token operator">:</span> ...<span class="token punctuation">,</span> name<span class="token operator">:</span> &#39;aen&#39;<span class="token punctuation">,</span> surname<span class="token operator">:</span> &#39;Does&#39;
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    _id<span class="token operator">:</span> ...<span class="token punctuation">,</span> name<span class="token operator">:</span> &#39;Aen&#39;<span class="token punctuation">,</span> surname<span class="token operator">:</span> &#39;Not&#39;
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    _id<span class="token operator">:</span> ...<span class="token punctuation">,</span> name<span class="token operator">:</span> &#39;ben&#39;<span class="token punctuation">,</span> surname<span class="token operator">:</span> &#39;ThisField&#39;
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    _id<span class="token operator">:</span> ...<span class="token punctuation">,</span> name<span class="token operator">:</span> &#39;Ben&#39;<span class="token punctuation">,</span> surname<span class="token operator">:</span> &#39;Matter&#39;
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-使用-aggregation-排序" tabindex="-1"><a class="header-anchor" href="#_4-2-使用-aggregation-排序"><span>4.2. 使用_Aggregation_排序</span></a></h3><p>现在让我们使用_Aggregation_函数：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.getCollection<span class="token punctuation">(</span><span class="token string">&#39;users&#39;</span><span class="token punctuation">)</span>.aggregate<span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token string">&quot;<span class="token variable">$project</span>&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
        <span class="token string">&quot;surname&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
        <span class="token string">&quot;lowerName&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;<span class="token variable">$toLower</span>&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;<span class="token variable">$name</span>&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>,
    <span class="token punctuation">{</span>
      <span class="token string">&quot;<span class="token variable">$sort</span>&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;lowerName&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用_$project_功能，我们添加了一个_lowerName_字段作为_name_字段的小写版本。这允许我们使用该字段进行排序。它将给我们一个包含额外字段的结果对象，按期望的排序顺序排列：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    _id<span class="token operator">:</span> ...<span class="token punctuation">,</span> name<span class="token operator">:</span> &#39;aen&#39;<span class="token punctuation">,</span> surname<span class="token operator">:</span> &#39;Does&#39;<span class="token punctuation">,</span> lowerName<span class="token operator">:</span> &#39;aen&#39;
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    _id<span class="token operator">:</span> ...<span class="token punctuation">,</span> name<span class="token operator">:</span> &#39;Aen&#39;<span class="token punctuation">,</span> surname<span class="token operator">:</span> &#39;Not&#39;<span class="token punctuation">,</span> lowerName<span class="token operator">:</span> &#39;aen&#39;
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    _id<span class="token operator">:</span> ...<span class="token punctuation">,</span> name<span class="token operator">:</span> &#39;ben&#39;<span class="token punctuation">,</span> surname<span class="token operator">:</span> &#39;ThisField&#39;<span class="token punctuation">,</span> lowerName<span class="token operator">:</span> &#39;ben&#39;
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    _id<span class="token operator">:</span> ...<span class="token punctuation">,</span> name<span class="token operator">:</span> &#39;Ben&#39;<span class="token punctuation">,</span> surname<span class="token operator">:</span> &#39;Matter&#39;<span class="token punctuation">,</span> lowerName<span class="token operator">:</span> &#39;ben&#39;
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>Java中的不区分大小写的排序</li></ol><h3 id="_5-1-配置样板代码" tabindex="-1"><a class="header-anchor" href="#_5-1-配置样板代码"><span>5.1. 配置样板代码</span></a></h3><p>让我们首先添加mongo-java-driver依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.mongodb\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`mongo-java-driver\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`3.12.10\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们使用_MongoClient_进行连接：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">MongoClient</span> mongoClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MongoClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">MongoDatabase</span> db <span class="token operator">=</span> mongoClient<span class="token punctuation">.</span><span class="token function">getDatabase</span><span class="token punctuation">(</span><span class="token string">&quot;sorting&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">MongoCollection</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>\`\`\` collection <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">getCollection</span><span class="token punctuation">(</span><span class="token string">&quot;users&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-java中使用-collation-排序" tabindex="-1"><a class="header-anchor" href="#_5-2-java中使用-collation-排序"><span>5.2. Java中使用_Collation_排序</span></a></h3><p>让我们看看如何在Java中实现“<em>Collation</em>”解决方案：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">FindIterable</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>\`\`\` nameDoc <span class="token operator">=</span> collection<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token function">ascending</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collation</span><span class="token punctuation">(</span><span class="token class-name">Collation</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">locale</span><span class="token punctuation">(</span><span class="token string">&quot;en&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用“<em>en</em>”locale构建了排序规则。然后，我们将创建的_Collation_对象传递给_FindIterable_对象的_collation_方法。</p><p>接下来，让我们使用_MongoCursor_逐个读取结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">MongoCursor</span> cursor <span class="token operator">=</span> nameDoc<span class="token punctuation">.</span><span class="token function">cursor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span> expectedNamesOrdering <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;aen&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Aen&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ben&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Ben&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;cen&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Cen&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span> actualNamesOrdering <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>cursor<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Document</span> document <span class="token operator">=</span> cursor<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    actualNamesOrdering<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedNamesOrdering<span class="token punctuation">,</span> actualNamesOrdering<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-java中使用-aggregations-排序" tabindex="-1"><a class="header-anchor" href="#_5-3-java中使用-aggregations-排序"><span>5.3. Java中使用_Aggregations_排序</span></a></h3><p>我们还可以使用_Aggregation_对集合进行排序。让我们使用Java API重新创建我们的命令行版本。</p><p>首先，我们依赖于_project_方法来创建一个_Bson_对象。这个对象还将包括通过使用_Projection_类将名称中的每个字符转换为小写来计算的_lowerName_字段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Bson</span> projectBson <span class="token operator">=</span> <span class="token function">project</span><span class="token punctuation">(</span>
  <span class="token class-name">Projections</span><span class="token punctuation">.</span><span class="token function">fields</span><span class="token punctuation">(</span>
    <span class="token class-name">Projections</span><span class="token punctuation">.</span><span class="token function">include</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;surname&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token class-name">Projections</span><span class="token punctuation">.</span><span class="token function">computed</span><span class="token punctuation">(</span><span class="token string">&quot;lowerName&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Projections</span><span class="token punctuation">.</span><span class="token function">computed</span><span class="token punctuation">(</span><span class="token string">&quot;$toLower&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;$name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将_aggregate_方法与包含前面代码片段中_Bson_的对象的列表以及_sort_方法一起提供：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">AggregateIterable</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>\`\`\` nameDoc <span class="token operator">=</span> collection<span class="token punctuation">.</span><span class="token function">aggregate</span><span class="token punctuation">(</span>
  <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>projectBson<span class="token punctuation">,</span>
  <span class="token function">sort</span><span class="token punctuation">(</span><span class="token class-name">Sorts</span><span class="token punctuation">.</span><span class="token function">ascending</span><span class="token punctuation">(</span><span class="token string">&quot;lowerName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，就像前一个例子一样，我们可以很容易地使用_MongoCursor_读取结果。</p><ol start="6"><li>结论</li></ol><p>在本文中，我们看到了如何对MongoDB集合进行简单的不区分大小写的排序。</p><p>我们在MongoDB shell中使用了_Aggregation_和_Collation_方法。最后，我们翻译了这些查询，并提供了一个简单的Java实现，使用_mongo-java-driver_库。</p><p>如往常一样，文章的完整源代码可在GitHub上找到。</p>`,56),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-20-Case Insensitive Sorting in MongoDB.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Case%20Insensitive%20Sorting%20in%20MongoDB.html","title":"MongoDB中不区分大小写的排序 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-21T00:00:00.000Z","category":["MongoDB","Java"],"tag":["MongoDB","Java","Case Insensitive Sorting"],"head":[["meta",{"name":"keywords","content":"MongoDB, Java, Case Insensitive Sorting, Collation, Aggregation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Case%20Insensitive%20Sorting%20in%20MongoDB.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"MongoDB中不区分大小写的排序 | Baeldung"}],["meta",{"property":"og:description","content":"MongoDB中不区分大小写的排序 | Baeldung 概述 默认情况下，MongoDB引擎在排序提取的数据时会考虑字符的大小写。通过指定聚合(Aggregations)或排序规则(Collations)，可以执行不区分大小写的排序查询。 在这个简短的教程中，我们将使用MongoDB Shell和Java来探讨这两种解决方案。 设置环境 首先，我们需..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T22:40:02.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MongoDB"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Case Insensitive Sorting"}],["meta",{"property":"article:published_time","content":"2024-07-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T22:40:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MongoDB中不区分大小写的排序 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T22:40:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"MongoDB中不区分大小写的排序 | Baeldung 概述 默认情况下，MongoDB引擎在排序提取的数据时会考虑字符的大小写。通过指定聚合(Aggregations)或排序规则(Collations)，可以执行不区分大小写的排序查询。 在这个简短的教程中，我们将使用MongoDB Shell和Java来探讨这两种解决方案。 设置环境 首先，我们需..."},"headers":[{"level":3,"title":"4.1. 使用_Collation_排序","slug":"_4-1-使用-collation-排序","link":"#_4-1-使用-collation-排序","children":[]},{"level":3,"title":"4.2. 使用_Aggregation_排序","slug":"_4-2-使用-aggregation-排序","link":"#_4-2-使用-aggregation-排序","children":[]},{"level":3,"title":"5.1. 配置样板代码","slug":"_5-1-配置样板代码","link":"#_5-1-配置样板代码","children":[]},{"level":3,"title":"5.2. Java中使用_Collation_排序","slug":"_5-2-java中使用-collation-排序","link":"#_5-2-java中使用-collation-排序","children":[]},{"level":3,"title":"5.3. Java中使用_Aggregations_排序","slug":"_5-3-java中使用-aggregations-排序","link":"#_5-3-java中使用-aggregations-排序","children":[]}],"git":{"createdTime":1721515202000,"updatedTime":1721515202000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.08,"words":1224},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Case Insensitive Sorting in MongoDB.md","localizedDate":"2024年7月21日","excerpt":"\\n<ol>\\n<li>概述</li>\\n</ol>\\n<p>默认情况下，MongoDB引擎在排序提取的数据时会考虑字符的大小写。<strong>通过指定聚合(<em>Aggregations</em>)或排序规则(<em>Collations</em>)，可以执行不区分大小写的排序查询。</strong></p>\\n<p>在这个简短的教程中，我们将使用MongoDB Shell和Java来探讨这两种解决方案。</p>\\n<ol start=\\"2\\">\\n<li>设置环境</li>\\n</ol>\\n<p>首先，我们需要运行一个MongoDB服务器。让我们使用一个Docker镜像：</p>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code>$ <span class=\\"token function\\">docker</span> run <span class=\\"token parameter variable\\">-d</span> <span class=\\"token parameter variable\\">-p</span> <span class=\\"token number\\">27017</span>:27017 <span class=\\"token parameter variable\\">--name</span> example-mongo mongo:latest\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
