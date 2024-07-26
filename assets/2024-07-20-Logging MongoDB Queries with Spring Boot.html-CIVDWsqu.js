import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-8nJ1rqSf.js";const o={},e=t(`<hr><h1 id="使用spring-boot记录mongodb查询" tabindex="-1"><a class="header-anchor" href="#使用spring-boot记录mongodb查询"><span>使用Spring Boot记录MongoDB查询</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在使用Spring Data MongoDB时，我们可能需要将日志级别提高到默认级别以上。通常，我们可能需要查看例如语句执行或查询参数等额外信息。</p><p>在这个简短的教程中，我们将看到如何修改MongoDB查询的日志级别。</p><h2 id="_2-配置mongodb查询日志" tabindex="-1"><a class="header-anchor" href="#_2-配置mongodb查询日志"><span>2. 配置MongoDB查询日志</span></a></h2><p>MongoDB支持提供了_MongoOperations_接口或其主要的_MongoTemplate_实现来访问数据，因此我们所需要做的就是为_MongoTemplate_类配置一个调试级别。</p><p><strong>像任何Spring或Java应用程序一样，我们可以使用日志库并为_MongoTemplate_定义一个日志级别。</strong></p><p>通常，我们可以在配置文件中写入类似以下内容：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;logger name=&quot;org.springframework.data.mongodb.core.MongoTemplate&quot; level=&quot;DEBUG&quot; /&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>然而，如果我们正在运行一个Spring Boot应用程序</strong>，<strong>我们可以在我们的_application.properties_文件中配置这一点</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>logging.level.org.springframework.data.mongodb.core.MongoTemplate=DEBUG
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同样，我们可以使用_YAML_语法：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">logging</span><span class="token punctuation">:</span>
  <span class="token key atrule">level</span><span class="token punctuation">:</span>
    <span class="token key atrule">org</span><span class="token punctuation">:</span>
      <span class="token key atrule">springframework</span><span class="token punctuation">:</span>
        <span class="token key atrule">data</span><span class="token punctuation">:</span>
          <span class="token key atrule">mongodb</span><span class="token punctuation">:</span>
            <span class="token key atrule">core</span><span class="token punctuation">:</span>
              <span class="token key atrule">MongoTemplate</span><span class="token punctuation">:</span> DEBUG
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-日志测试类" tabindex="-1"><a class="header-anchor" href="#_3-日志测试类"><span>3. 日志测试类</span></a></h2><p>首先，让我们创建一个_Book_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Document</span><span class="token punctuation">(</span>collection <span class="token operator">=</span> <span class="token string">&quot;book&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@MongoId</span>
    <span class="token keyword">private</span> <span class="token class-name">ObjectId</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> bookName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> authorName<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们想创建一个简单的测试类并检查日志。</p><p><strong>为了演示这一点，我们使用嵌入式MongoDB。为了确保，让我们首先检查我们的依赖项</strong>：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.springframework.boot\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`spring-boot-starter-data-mongodb\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`de.flapdoodle.embed\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`de.flapdoodle.embed.mongo\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\${embed.mongo.version}\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>\`test\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们使用Spring Boot Test定义我们的测试类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token annotation punctuation">@TestPropertySource</span><span class="token punctuation">(</span>properties <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token string">&quot;logging.level.org.springframework.data.mongodb.core.MongoTemplate=DEBUG&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LoggingUnitTest</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">CONNECTION_STRING</span> <span class="token operator">=</span> <span class="token string">&quot;mongodb://%s:%d&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">MongodExecutable</span> mongodExecutable<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">MongoTemplate</span> mongoTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@AfterEach</span>
    <span class="token keyword">void</span> <span class="token function">clean</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mongodExecutable<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@BeforeEach</span>
    <span class="token keyword">void</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> ip <span class="token operator">=</span> <span class="token string">&quot;localhost&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> port <span class="token operator">=</span> <span class="token number">27017</span><span class="token punctuation">;</span>

        <span class="token class-name">ImmutableMongodConfig</span> mongodbConfig <span class="token operator">=</span> <span class="token class-name">MongodConfig</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token class-name">Version<span class="token punctuation">.</span>Main</span><span class="token punctuation">.</span><span class="token constant">PRODUCTION</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">net</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Net</span><span class="token punctuation">(</span>ip<span class="token punctuation">,</span> port<span class="token punctuation">,</span> <span class="token class-name">Network</span><span class="token punctuation">.</span><span class="token function">localhostIsIPv6</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">MongodStarter</span> starter <span class="token operator">=</span> <span class="token class-name">MongodStarter</span><span class="token punctuation">.</span><span class="token function">getDefaultInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        mongodExecutable <span class="token operator">=</span> starter<span class="token punctuation">.</span><span class="token function">prepare</span><span class="token punctuation">(</span>mongodbConfig<span class="token punctuation">)</span><span class="token punctuation">;</span>
        mongodExecutable<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        mongoTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MongoTemplate</span><span class="token punctuation">(</span><span class="token class-name">MongoClients</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token constant">CONNECTION_STRING</span><span class="token punctuation">,</span> ip<span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// tests</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-日志样本" tabindex="-1"><a class="header-anchor" href="#_4-日志样本"><span>4. 日志样本</span></a></h2><p>在这一部分，我们将定义一些简单的测试用例并显示相关的日志，以测试最常见的场景，如查找、插入、更新或聚合_Document_。</p><h3 id="_4-1-插入" tabindex="-1"><a class="header-anchor" href="#_4-1-插入"><span>4.1. 插入</span></a></h3><p>首先，让我们从插入一个_Document_开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Book</span> book <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
book<span class="token punctuation">.</span><span class="token function">setBookName</span><span class="token punctuation">(</span><span class="token string">&quot;Book&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
book<span class="token punctuation">.</span><span class="token function">setAuthorName</span><span class="token punctuation">(</span><span class="token string">&quot;Author&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

mongoTemplate<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>日志显示我们在哪个集合中插入。在查找_Document_时，id也会被记录：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[2022-03-20 17:42:47,093]-[main] DEBUG MongoTemplate - Inserting Document containing fields: [bookName, authorName, _class] in collection: book
...
[2022-03-20 17:42:47,144]-[main] DEBUG MongoTemplate - findOne using query: { &quot;id&quot; : { &quot;$oid&quot; : &quot;623759871ff6275fe96a5ecb&quot;}} fields: Document{{}} for class: class com.baeldung.mongodb.models.Book in collection: book
[2022-03-20 17:42:47,149]-[main] DEBUG MongoTemplate - findOne using query: { &quot;_id&quot; : { &quot;$oid&quot; : &quot;623759871ff6275fe96a5ecb&quot;}} fields: {} in db.collection: test.book
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-更新" tabindex="-1"><a class="header-anchor" href="#_4-2-更新"><span>4.2. 更新</span></a></h3><p>同样，当更新一个_Document_时：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Book</span> book <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
book<span class="token punctuation">.</span><span class="token function">setBookName</span><span class="token punctuation">(</span><span class="token string">&quot;Book&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
book<span class="token punctuation">.</span><span class="token function">setAuthorName</span><span class="token punctuation">(</span><span class="token string">&quot;Author&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

mongoTemplate<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> authorNameUpdate <span class="token operator">=</span> <span class="token string">&quot;AuthorNameUpdate&quot;</span><span class="token punctuation">;</span>

book<span class="token punctuation">.</span><span class="token function">setAuthorName</span><span class="token punctuation">(</span>authorNameUpdate<span class="token punctuation">)</span><span class="token punctuation">;</span>
mongoTemplate<span class="token punctuation">.</span><span class="token function">updateFirst</span><span class="token punctuation">(</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">&quot;bookName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">is</span><span class="token punctuation">(</span><span class="token string">&quot;Book&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token string">&quot;authorName&quot;</span><span class="token punctuation">,</span> authorNameUpdate<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Book</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到日志中实际更新的_Document_字段：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[2022-03-20 17:48:31,759]-[main] DEBUG MongoTemplate - Calling update using query: { &quot;bookName&quot; : &quot;Book&quot;} and update: { &quot;$set&quot; : { &quot;authorName&quot; : &quot;AuthorNameUpdate&quot;}} in collection: book
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-3-批量插入" tabindex="-1"><a class="header-anchor" href="#_4-3-批量插入"><span>4.3. 批量插入</span></a></h3><p>让我们添加一个批量插入的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Book</span> book <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
book<span class="token punctuation">.</span><span class="token function">setBookName</span><span class="token punctuation">(</span><span class="token string">&quot;Book&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
book<span class="token punctuation">.</span><span class="token function">setAuthorName</span><span class="token punctuation">(</span><span class="token string">&quot;Author&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Book</span> book1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
book1<span class="token punctuation">.</span><span class="token function">setBookName</span><span class="token punctuation">(</span><span class="token string">&quot;Book1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
book1<span class="token punctuation">.</span><span class="token function">setAuthorName</span><span class="token punctuation">(</span><span class="token string">&quot;Author1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

mongoTemplate<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>book<span class="token punctuation">,</span> book1<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Book</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到日志中插入的_Document_数量：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[2022-03-20 17:52:00,564]-[main] DEBUG MongoTemplate - Inserting list of Documents containing 2 items
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-4-删除" tabindex="-1"><a class="header-anchor" href="#_4-4-删除"><span>4.4. 删除</span></a></h3><p>同样，让我们添加一个删除的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Book</span> book <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
book<span class="token punctuation">.</span><span class="token function">setBookName</span><span class="token punctuation">(</span><span class="token string">&quot;Book&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
book<span class="token punctuation">.</span><span class="token function">setAuthorName</span><span class="token punctuation">(</span><span class="token string">&quot;Author&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

mongoTemplate<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">;</span>

mongoTemplate<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到日志中，这种情况下被删除的_Document_的id：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[2022-03-20 17:56:42,151]-[main] DEBUG MongoTemplate - Remove using query: { &quot;_id&quot; : { &quot;$oid&quot; : &quot;62375cca2a2cba4db774d8c1&quot;}} in collection: book.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-5-聚合" tabindex="-1"><a class="header-anchor" href="#_4-5-聚合"><span>4.5. 聚合</span></a></h3><p>让我们看看聚合的示例。在这种情况下，我们需要定义一个结果类。例如，我们将按作者名称进行聚合：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GroupByAuthor</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> authorName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> authCount<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们定义一个分组的测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Book</span> book <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
book<span class="token punctuation">.</span><span class="token function">setBookName</span><span class="token punctuation">(</span><span class="token string">&quot;Book&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
book<span class="token punctuation">.</span><span class="token function">setAuthorName</span><span class="token punctuation">(</span><span class="token string">&quot;Author&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Book</span> book1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
book1<span class="token punctuation">.</span><span class="token function">setBookName</span><span class="token punctuation">(</span><span class="token string">&quot;Book1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
book1<span class="token punctuation">.</span><span class="token function">setAuthorName</span><span class="token punctuation">(</span><span class="token string">&quot;Author&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Book</span> book2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
book2<span class="token punctuation">.</span><span class="token function">setBookName</span><span class="token punctuation">(</span><span class="token string">&quot;Book2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
book2<span class="token punctuation">.</span><span class="token function">setAuthorName</span><span class="token punctuation">(</span><span class="token string">&quot;Author&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

mongoTemplate<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>book<span class="token punctuation">,</span> book1<span class="token punctuation">,</span> book2<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Book</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">GroupOperation</span> groupByAuthor <span class="token operator">=</span> <span class="token function">group</span><span class="token punctuation">(</span><span class="token string">&quot;authorName&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span><span class="token string">&quot;authCount&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Aggregation</span> aggregation <span class="token operator">=</span> <span class="token function">newAggregation</span><span class="token punctuation">(</span>groupByAuthor<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">AggregationResults</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">GroupByAuthor</span><span class="token punctuation">&gt;</span></span>\` aggregationResults <span class="token operator">=</span> mongoTemplate<span class="token punctuation">.</span><span class="token function">aggregate</span><span class="token punctuation">(</span>aggregation<span class="token punctuation">,</span> <span class="token string">&quot;book&quot;</span><span class="token punctuation">,</span> <span class="token class-name">GroupByAuthor</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到日志中通过哪个字段进行了聚合以及聚合管道的类型：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[2022-03-20 17:58:51,237]-[main] DEBUG MongoTemplate - Executing aggregation: [{ &quot;$group&quot; : { &quot;_id&quot; : &quot;$authorName&quot;, &quot;authCount&quot; : { &quot;$sum&quot; : 1}}}] in collection book
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了如何为Spring Data MongoDB启用调试日志级别。</p><p>我们定义了一些常见的查询场景，并在进行一些实时测试时查看了它们的相关日志。</p>`,54),p=[e];function c(l,i){return a(),s("div",null,p)}const r=n(o,[["render",c],["__file","2024-07-20-Logging MongoDB Queries with Spring Boot.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Logging%20MongoDB%20Queries%20with%20Spring%20Boot.html","title":"使用Spring Boot记录MongoDB查询","lang":"zh-CN","frontmatter":{"date":"2022-03-20T00:00:00.000Z","category":["Spring Boot","MongoDB"],"tag":["Logging","Debugging"],"head":[["meta",{"name":"keywords","content":"MongoDB, Spring Boot, Logging, Debugging"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Logging%20MongoDB%20Queries%20with%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring Boot记录MongoDB查询"}],["meta",{"property":"og:description","content":"使用Spring Boot记录MongoDB查询 1. 概述 在使用Spring Data MongoDB时，我们可能需要将日志级别提高到默认级别以上。通常，我们可能需要查看例如语句执行或查询参数等额外信息。 在这个简短的教程中，我们将看到如何修改MongoDB查询的日志级别。 2. 配置MongoDB查询日志 MongoDB支持提供了_MongoOp..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T11:15:52.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Logging"}],["meta",{"property":"article:tag","content":"Debugging"}],["meta",{"property":"article:published_time","content":"2022-03-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T11:15:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring Boot记录MongoDB查询\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-03-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T11:15:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring Boot记录MongoDB查询 1. 概述 在使用Spring Data MongoDB时，我们可能需要将日志级别提高到默认级别以上。通常，我们可能需要查看例如语句执行或查询参数等额外信息。 在这个简短的教程中，我们将看到如何修改MongoDB查询的日志级别。 2. 配置MongoDB查询日志 MongoDB支持提供了_MongoOp..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 配置MongoDB查询日志","slug":"_2-配置mongodb查询日志","link":"#_2-配置mongodb查询日志","children":[]},{"level":2,"title":"3. 日志测试类","slug":"_3-日志测试类","link":"#_3-日志测试类","children":[]},{"level":2,"title":"4. 日志样本","slug":"_4-日志样本","link":"#_4-日志样本","children":[{"level":3,"title":"4.1. 插入","slug":"_4-1-插入","link":"#_4-1-插入","children":[]},{"level":3,"title":"4.2. 更新","slug":"_4-2-更新","link":"#_4-2-更新","children":[]},{"level":3,"title":"4.3. 批量插入","slug":"_4-3-批量插入","link":"#_4-3-批量插入","children":[]},{"level":3,"title":"4.4. 删除","slug":"_4-4-删除","link":"#_4-4-删除","children":[]},{"level":3,"title":"4.5. 聚合","slug":"_4-5-聚合","link":"#_4-5-聚合","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721474152000,"updatedTime":1721474152000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.7,"words":1110},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Logging MongoDB Queries with Spring Boot.md","localizedDate":"2022年3月20日","excerpt":"<hr>\\n<h1>使用Spring Boot记录MongoDB查询</h1>\\n<h2>1. 概述</h2>\\n<p>在使用Spring Data MongoDB时，我们可能需要将日志级别提高到默认级别以上。通常，我们可能需要查看例如语句执行或查询参数等额外信息。</p>\\n<p>在这个简短的教程中，我们将看到如何修改MongoDB查询的日志级别。</p>\\n<h2>2. 配置MongoDB查询日志</h2>\\n<p>MongoDB支持提供了_MongoOperations_接口或其主要的_MongoTemplate_实现来访问数据，因此我们所需要做的就是为_MongoTemplate_类配置一个调试级别。</p>","autoDesc":true}');export{r as comp,d as data};
