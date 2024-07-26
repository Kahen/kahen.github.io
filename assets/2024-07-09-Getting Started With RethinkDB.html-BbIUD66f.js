import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-8nJ1rqSf.js";const i={},s=a('<h1 id="rethinkdb-入门指南" tabindex="-1"><a class="header-anchor" href="#rethinkdb-入门指南"><span>RethinkDB 入门指南</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本文中，我们将了解 RethinkDB。这是一个为实时应用程序设计的开源 NoSQL 数据库。我们将看到它为我们的应用程序带来了哪些特性，我们可以用它做什么，以及如何与它交互。</p><h2 id="_2-rethinkdb-是什么" tabindex="-1"><a class="header-anchor" href="#_2-rethinkdb-是什么"><span>2. RethinkDB 是什么？</span></a></h2><p>RethinkDB 是一个强调可扩展性和高可用性的开源 NoSQL 数据库。它允许我们存储 JSON 文档，然后稍后进行查询。我们还能够在数据库中跨多个表执行联接，并对我们的数据执行 map-reduce 函数。</p><p>然而，<strong>使 RethinkDB 脱颖而出的是其实时流式传输能力</strong>。我们可以对数据库执行查询，以便结果集的更改不断流式传输回客户端，允许我们获取数据的实时更新。这意味着我们的应用程序可以在任何更改时立即向用户更新。</p><h2 id="_3-运行和使用-rethinkdb" tabindex="-1"><a class="header-anchor" href="#_3-运行和使用-rethinkdb"><span>3. 运行和使用 RethinkDB</span></a></h2><p>RethinkDB 是用 C++ 编写的原生应用程序。大多数平台都有预构建的包。还有一个官方的 Docker 镜像。</p><p>安装后，我们可以通过简单地运行可执行文件来启动数据库。如果需要，我们可以告诉它存储数据文件的位置，但如果不指定，它将有一个合理的默认值。我们还可以配置它监听的端口，甚至可以运行多个服务器以集群配置进行扩展和可用性。所有这些以及更多内容都可以在官方文档中看到。</p><p>然后，我们需要从我们的应用程序中实际使用数据库。这将需要我们使用适当的客户端连接到它 - 许多语言都有选项。然而，对于本文，我们将使用 Java 客户端。</p><p>向我们的应用程序添加客户端就像添加一个依赖项一样简单：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependency&gt;`\n    `&lt;groupId&gt;`com.rethinkdb`&lt;/groupId&gt;`\n    `&lt;artifactId&gt;`rethinkdb-driver`&lt;/artifactId&gt;`\n    `&lt;version&gt;`2.4.4`&lt;/version&gt;`\n`&lt;/dependency&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们实际上需要连接到数据库。为此，我们需要一个 <em>Connection</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Connection conn = RethinkDB.r.connection()\n  .hostname(&quot;localhost&quot;)\n  .port(28015)\n  .connect();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-与-rethinkdb-交互" tabindex="-1"><a class="header-anchor" href="#_4-与-rethinkdb-交互"><span>4. 与 RethinkDB 交互</span></a></h2><p>现在我们已经连接到 RethinkDB，我们需要知道如何使用它。<strong>在数据库的基本层面上，这意味着我们需要能够创建、操作和检索数据。</strong></p><p>与 RethinkDB 的所有交互都是通过程序化接口完成的。我们不是用自定义查询语言编写查询，而是使用标准 Java 使用更丰富的类型模型。这使我们能够利用编译器确保我们的查询是有效的，而不是在运行时发现我们有问题。</p><h3 id="_4-1-使用表" tabindex="-1"><a class="header-anchor" href="#_4-1-使用表"><span>4.1. 使用表</span></a></h3><p><strong>RethinkDB 实例公开了几个数据库，每个数据库都在表中存储数据。</strong> 这些在概念上类似于 SQL 数据库中的表。然而，RethinkDB 不强制执行表上的模式，而是将此留给应用程序。</p><p>我们可以使用我们的连接创建一个新表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>r.db(&quot;test&quot;).tableCreate(tableName).run(conn);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同样，我们可以使用 <em>Db.tableDrop()</em> 删除表。我们还可以使用 <em>Db.tableList()</em> 列出所有已知的表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>List`&lt;String&gt;` tables = r.db(dbName).tableList().run(conn, List.class).first();\nassertTrue(tables.contains(tableName));\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-插入数据" tabindex="-1"><a class="header-anchor" href="#_4-2-插入数据"><span>4.2. 插入数据</span></a></h3><p>一旦我们有了可以工作的表，我们需要能够填充它们。<strong>我们可以通过使用 <em>Table.insert()</em> 并提供数据来实现这一点。</strong></p><p>让我们通过提供由 RethinkDB API 本身构建的对象来向我们的表中插入一些数据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>r.db(DB_NAME).table(tableName)\n  .insert(r.hashMap().with(&quot;name&quot;, &quot;Baeldung&quot;))\n  .run(conn);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，我们可以提供标准的 Java 集合：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>r.db(DB_NAME).table(tableName)\n  .insert(Map.of(&quot;name&quot;, &quot;Baeldung&quot;))\n  .run(conn);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们插入的数据可以简单到只有一个键/值对，也可以复杂到需要的程度。</strong> 这可以包括嵌套结构、数组或任何所需的内容：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>r.db(DB_NAME).table(tableName)\n  .insert(\n    r.hashMap()\n      .with(&quot;name&quot;, &quot;Baeldung&quot;)\n      .with(&quot;articles&quot;, r.array(\n        r.hashMap()\n          .with(&quot;id&quot;, &quot;article1&quot;)\n          .with(&quot;name&quot;, &quot;Java 中的字符串插值&quot;)\n          .with(&quot;url&quot;, &quot;https://www.baeldung.com/java-string-interpolation&quot;),\n        r.hashMap()\n          .with(&quot;id&quot;, &quot;article2&quot;)\n          .with(&quot;name&quot;, &quot;使用 Spring RestTemplate 访问 HTTPS REST 服务&quot;)\n          .with(&quot;url&quot;, &quot;https://www.baeldung.com/spring-resttemplate-secure-https-service&quot;)\n      ))\n).run(conn);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个插入的记录都会有一个唯一的 ID —— 要么是我们在记录上的“id”字段提供的，要么是数据库随机生成的。</p><h3 id="_4-3-检索数据" tabindex="-1"><a class="header-anchor" href="#_4-3-检索数据"><span>4.3. 检索数据</span></a></h3><p><strong>现在我们有一个包含一些数据的数据库，我们需要能够再次获取它。</strong> 像所有数据库一样，我们通过查询数据库来实现这一点。</p><p>我们可以做的最简单的事情是对表进行查询，不做任何额外的事情：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Result`````&lt;Map&gt;````` results = r.db(DB_NAME).table(tableName).run(conn, Map.class);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们的结果对象提供了几种访问结果的方式，包括直接将其作为迭代器处理：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>for (Map result : results) {\n    // 处理结果\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还可以将结果转换为 <em>List</em> 或 <em>Stream</em> —— 包括并行流 —— 如果我们想将结果作为常规 Java 集合处理。</p><p><strong>如果我们只想检索结果的子集，我们可以在运行查询时应用过滤器。</strong> 这是通过提供一个 Java lambda 来执行查询来完成的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Result`````&lt;Map&gt;````` results = r.db(DB_NAME)\n  .table(tableName)\n  .filter(r -&gt; r.g(&quot;name&quot;).eq(&quot;Java 中的字符串插值&quot;))\n  .run(conn, Map.class);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的过滤器针对表中的行进行评估，只有匹配的行才会返回到我们的结果集中。</p><p><strong>我们还可以通过 ID 值直接访问单行，如果我们知道它的话：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Result`````&lt;Map&gt;````` results = r.db(DB_NAME).table(tableName).get(id).run(conn, Map.class);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-4-更新和删除数据" tabindex="-1"><a class="header-anchor" href="#_4-4-更新和删除数据"><span>4.4. 更新和删除数据</span></a></h3><p>一个一旦插入数据就不能更改的数据库只有有限的用途，那么我们如何更新我们的数据呢？** RethinkDB API 为我们提供了一个 <em>update()</em> 方法，我们可以将其链在查询语句的末尾** 以便将这些更新应用到查询匹配的每一条记录上。</p><p><strong>这些更新是补丁，而不是完全替换</strong>，所以我们只指定我们想要进行的更改：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>r.db(DB_NAME).table(tableName).update(r.hashMap().with(&quot;site&quot;, &quot;Baeldung&quot;)).run(conn);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>像查询一样，我们可以通过使用过滤器来选择我们想要更新的确切记录。</strong> 这些需要在更新指定之前完成。这是因为过滤器实际上是应用于选择要更新的记录的查询，然后更新就应用到所有匹配的内容上：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>r.db(DB_NAME).table(tableName)\n  .filter(r -&gt; r.g(&quot;name&quot;).eq(&quot;Java 中的字符串插值&quot;))\n  .update(r.hashMap().with(&quot;category&quot;, &quot;java&quot;))\n  .run(conn);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们还可以通过在查询末尾使用 <em>delete()</em> 调用而不是 <em>update()</em> 来删除记录：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>r.db(DB_NAME).table(tableName)\n  .filter(r -&gt; r.g(&quot;name&quot;).eq(&quot;Java 中的字符串插值&quot;))\n  .delete()\n  .run(conn);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-实时更新" tabindex="-1"><a class="header-anchor" href="#_5-实时更新"><span>5. 实时更新</span></a></h2><p>到目前为止，我们已经看到了一些如何与 RethinkDB 交互的例子，但这些并没有什么特别的。我们看到的所有内容也可以通过大多数其他数据库系统实现。</p><p><strong>使 RethinkDB 特别之处在于能够在不需要应用程序轮询的情况下获得数据的实时更新。</strong> 相反，我们可以以这样的方式执行查询，即游标将保持打开状态，数据库将在每次更改发生时将任何更改推送给我们：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Result`````&lt;Map&gt;````` cursor = r.db(DB_NAME).table(tableName).changes().run(conn, Map.class);\ncursor.stream().forEach(record -&gt; System.out.println(&quot;Record: &quot; + record));\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这在编写实时应用程序时非常强大，我们希望立即获得更新 —— 例如显示实时股票价格、比赛得分或其他许多事情。</p><p>当我们像这样执行查询时，我们会像以前一样得到一个游标。然而，添加 <em>changes()</em> 将意味着我们不会查询已经存在的记录。相反，<strong>游标将给我们一个无界的更改集合，这些更改发生在匹配查询的记录上。</strong> 这包括插入、更新和删除。</p><p>游标是无界的意味着我们对其执行的任何迭代，无论是使用普通的 <em>for</em> 循环还是流，都会根据我们需要持续进行。我们不能安全地将其收集到列表中，因为列表没有结束。</p><p>我们在游标中返回的记录包括更改记录的新旧值。然后我们可以确定如果更改是插入因为没有旧值，是删除因为没有新值，或者是更新因为既有旧值又有新值。我们还可以查看更新中旧值和新值之间的差异，并据此做出相应的反应。</p><p>与所有查询一样，当我们获取记录的更改时，我们也可以应用过滤器。<strong>这将导致我们的游标只包括与此过滤器匹配的记录。</strong> 这甚至适用于插入，即在执行时记录不存在的情况：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Result`````&lt;Map&gt;````` cursor = r.db(DB_NAME).table(tableName)\n  .filter(r -&gt; r.g(&quot;index&quot;).eq(5))\n  .changes()\n  .run(conn, Map.class);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p><strong>在这里，我们对 RethinkDB 数据库引擎进行了非常简短的介绍</strong>，展示了我们如何用它来完成所有的传统数据库任务，以及如何利用它自动推送更改给我们的客户的独特功能。这只是一次快速的浏览，这个系统还有更多内容，所以为什么不亲自尝试一下呢？</p><p>本文的所有代码示例都可以在 GitHub 上找到。</p><p>OK</p>',66),l=[s];function d(r,o){return n(),t("div",null,l)}const p=e(i,[["render",d],["__file","2024-07-09-Getting Started With RethinkDB.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Getting%20Started%20With%20RethinkDB.html","title":"RethinkDB 入门指南","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Database","NoSQL"],"tag":["RethinkDB","Real-time"],"head":[["meta",{"name":"keywords","content":"RethinkDB, NoSQL, Real-time, Database"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Getting%20Started%20With%20RethinkDB.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"RethinkDB 入门指南"}],["meta",{"property":"og:description","content":"RethinkDB 入门指南 1. 引言 在本文中，我们将了解 RethinkDB。这是一个为实时应用程序设计的开源 NoSQL 数据库。我们将看到它为我们的应用程序带来了哪些特性，我们可以用它做什么，以及如何与它交互。 2. RethinkDB 是什么？ RethinkDB 是一个强调可扩展性和高可用性的开源 NoSQL 数据库。它允许我们存储 JS..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T05:00:46.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"RethinkDB"}],["meta",{"property":"article:tag","content":"Real-time"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T05:00:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"RethinkDB 入门指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T05:00:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"RethinkDB 入门指南 1. 引言 在本文中，我们将了解 RethinkDB。这是一个为实时应用程序设计的开源 NoSQL 数据库。我们将看到它为我们的应用程序带来了哪些特性，我们可以用它做什么，以及如何与它交互。 2. RethinkDB 是什么？ RethinkDB 是一个强调可扩展性和高可用性的开源 NoSQL 数据库。它允许我们存储 JS..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. RethinkDB 是什么？","slug":"_2-rethinkdb-是什么","link":"#_2-rethinkdb-是什么","children":[]},{"level":2,"title":"3. 运行和使用 RethinkDB","slug":"_3-运行和使用-rethinkdb","link":"#_3-运行和使用-rethinkdb","children":[]},{"level":2,"title":"4. 与 RethinkDB 交互","slug":"_4-与-rethinkdb-交互","link":"#_4-与-rethinkdb-交互","children":[{"level":3,"title":"4.1. 使用表","slug":"_4-1-使用表","link":"#_4-1-使用表","children":[]},{"level":3,"title":"4.2. 插入数据","slug":"_4-2-插入数据","link":"#_4-2-插入数据","children":[]},{"level":3,"title":"4.3. 检索数据","slug":"_4-3-检索数据","link":"#_4-3-检索数据","children":[]},{"level":3,"title":"4.4. 更新和删除数据","slug":"_4-4-更新和删除数据","link":"#_4-4-更新和删除数据","children":[]}]},{"level":2,"title":"5. 实时更新","slug":"_5-实时更新","link":"#_5-实时更新","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720501246000,"updatedTime":1720501246000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.92,"words":2375},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Getting Started With RethinkDB.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本文中，我们将了解 RethinkDB。这是一个为实时应用程序设计的开源 NoSQL 数据库。我们将看到它为我们的应用程序带来了哪些特性，我们可以用它做什么，以及如何与它交互。</p>\\n<h2>2. RethinkDB 是什么？</h2>\\n<p>RethinkDB 是一个强调可扩展性和高可用性的开源 NoSQL 数据库。它允许我们存储 JSON 文档，然后稍后进行查询。我们还能够在数据库中跨多个表执行联接，并对我们的数据执行 map-reduce 函数。</p>\\n<p>然而，<strong>使 RethinkDB 脱颖而出的是其实时流式传输能力</strong>。我们可以对数据库执行查询，以便结果集的更改不断流式传输回客户端，允许我们获取数据的实时更新。这意味着我们的应用程序可以在任何更改时立即向用户更新。</p>","autoDesc":true}');export{p as comp,h as data};
