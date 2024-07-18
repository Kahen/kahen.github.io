import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as l}from"./app-C6rqSDgP.js";const n={},i=l('<h1 id="scylladb与java入门指南" tabindex="-1"><a class="header-anchor" href="#scylladb与java入门指南"><span>ScyllaDB与Java入门指南</span></a></h1><p>在这个教程中，我们将探索ScyllaDB——一个快速且可扩展的NoSQL数据库。我们将看到它的特性以及如何与之交互。</p><h2 id="_2-scylladb是什么" tabindex="-1"><a class="header-anchor" href="#_2-scylladb是什么"><span>2. ScyllaDB是什么？</span></a></h2><p>**ScyllaDB是一个开源的分布式NoSQL数据库。**它支持与Cassandra相同的协议，但具有更高的吞吐量和更低的延迟。它使用C++语言开发。</p><p>ScyllaDB有三个变体：</p><ul><li>ScyllaDB开源版：这是一个免费的开源版本。我们将拥有完全所有权，需要自己进行维护</li><li>ScyllaDB企业版：这是一个付费版本，我们将获得一些高级功能和全天候支持。我们需要使用自己的基础设施来安装这个版本</li><li>ScyllaDB云服务：这是ScyllaDB提供的基于云的服务，我们不需要拥有自己的基础设施或进行任何安装和维护</li></ul><h3 id="_2-1-安装" tabindex="-1"><a class="header-anchor" href="#_2-1-安装"><span>2.1. 安装</span></a></h3><p>我们将使用开源版本，并使用以下命令在Docker容器上运行它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ docker run --name scylla -p 9042:9042 -d scylladb/scylla\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们在这里暴露了9042号端口。我们将使用此端口连接到数据库。</p><p>现在，让我们连接到数据库，创建一个表并插入一些数据。我们将编写Java代码来获取这些数据。</p><p>让我们执行以下命令以连接到数据库：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ docker exec -it scylla cqlsh\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在让我们创建一个具有简单复制策略和3个复制因子的命名空间：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CREATE KEYSPACE IF NOT EXISTS baeldung WITH replication = {&#39;class&#39;: &#39;SimpleStrategy&#39;, &#39;replication_factor&#39; : 3};\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们执行以下查询以创建一个表并插入数据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CREATE COLUMNFAMILY IF NOT EXISTS baeldung.User (id bigint PRIMARY KEY, name text);\nINSERT INTO baeldung.User (id, name) values (1, &#39;john doe&#39;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-java代码实现" tabindex="-1"><a class="header-anchor" href="#_3-java代码实现"><span>3. Java代码实现</span></a></h2><p>我们将编写一个简单的Java程序，它将连接到我们本地部署的Scylla DB并执行查询。</p><h3 id="_3-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_3-1-maven依赖"><span>3.1. Maven依赖</span></a></h3><p>让我们在_pom.xml_文件中添加Scylla核心库依赖：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``com.scylladb``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``java-driver-core``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``4.14.1.0``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-java代码" tabindex="-1"><a class="header-anchor" href="#_3-2-java代码"><span>3.2. Java代码</span></a></h3><p>让我们首先将连接URL添加到_application.yml_文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>datastax-java-driver:\n  basic:\n    contact-points: 127.0.0.1:9042\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以查看此文档以获取有关所有可配置值的更多详细信息。</p><p>现在让我们获取我们之前添加的用户名称：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>try (CqlSession session = CqlSession.builder().build()) {\n    ResultSet rs = session.execute(&quot;select * from baeldung.User&quot;);\n    Row row = rs.one();\n    return row.getString(&quot;name&quot;);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还可以使用查询构建器来插入和获取数据。我们首先需要在_pom.xml_文件中添加_java-driver-query-builder_ Maven依赖：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``com.scylladb``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``java-driver-query-builder``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``4.14.1.0``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们将在我们的代码中编写SELECT和INSERT构建器语句以获取和插入据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>try (CqlSession session = CqlSession.builder().build()) {\n    InsertInto insert = insertInto(&quot;baeldung&quot;, &quot;User&quot;);\n    SimpleStatement statement = insert.value(&quot;id&quot;, literal(2))\n      .value(&quot;name&quot;, literal(&quot;dev user&quot;))\n      .build();\n    ResultSet rs = session.execute(statement);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它将在命名空间baeldung的User表中插入一个新用户，id = 2，名称 = &quot;dev user&quot;。现在让我们创建一个SELECT语句，通过名称查找此用户：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>try (CqlSession session = CqlSession.builder().build()) {\n    Select query = selectFrom(&quot;baeldung&quot;, &quot;User&quot;).all()\n      .whereColumn(&quot;name&quot;).isEqualTo(literal(&quot;dev user&quot;))\n      .allowFiltering();\n    SimpleStatement statement = query.build();\n    ResultSet rs = session.execute(statement);\n    Row row = rs.one();\n    assertEquals(2, row.getLong(&quot;id&quot;));\n    assertEquals(&quot;dev user&quot;, row.getString(&quot;name&quot;);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到，它将返回我们插入的数据，id = 2。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在这里，我们对ScyllaDB进行了快速介绍，学习了如何安装、连接和执行查询，以及我们如何从应用程序与之交互。</p><p>一如既往，示例的完整源代码可在GitHub上找到。</p>',38),s=[i];function d(r,c){return t(),a("div",null,s)}const v=e(n,[["render",d],["__file","2024-07-10-Introduction to ScyllaDB with Java.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Introduction%20to%20ScyllaDB%20with%20Java.html","title":"ScyllaDB与Java入门指南","lang":"zh-CN","frontmatter":{"date":"2024-07-10T00:00:00.000Z","category":["ScyllaDB","Java"],"tag":["NoSQL","Database","Java Driver"],"head":[["meta",{"name":"keywords","content":"ScyllaDB, Java, NoSQL, Database, Java Driver"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Introduction%20to%20ScyllaDB%20with%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"ScyllaDB与Java入门指南"}],["meta",{"property":"og:description","content":"ScyllaDB与Java入门指南 在这个教程中，我们将探索ScyllaDB——一个快速且可扩展的NoSQL数据库。我们将看到它的特性以及如何与之交互。 2. ScyllaDB是什么？ **ScyllaDB是一个开源的分布式NoSQL数据库。**它支持与Cassandra相同的协议，但具有更高的吞吐量和更低的延迟。它使用C++语言开发。 ScyllaD..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T06:45:57.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"NoSQL"}],["meta",{"property":"article:tag","content":"Database"}],["meta",{"property":"article:tag","content":"Java Driver"}],["meta",{"property":"article:published_time","content":"2024-07-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T06:45:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ScyllaDB与Java入门指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-10T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T06:45:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"ScyllaDB与Java入门指南 在这个教程中，我们将探索ScyllaDB——一个快速且可扩展的NoSQL数据库。我们将看到它的特性以及如何与之交互。 2. ScyllaDB是什么？ **ScyllaDB是一个开源的分布式NoSQL数据库。**它支持与Cassandra相同的协议，但具有更高的吞吐量和更低的延迟。它使用C++语言开发。 ScyllaD..."},"headers":[{"level":2,"title":"2. ScyllaDB是什么？","slug":"_2-scylladb是什么","link":"#_2-scylladb是什么","children":[{"level":3,"title":"2.1. 安装","slug":"_2-1-安装","link":"#_2-1-安装","children":[]}]},{"level":2,"title":"3. Java代码实现","slug":"_3-java代码实现","link":"#_3-java代码实现","children":[{"level":3,"title":"3.1. Maven依赖","slug":"_3-1-maven依赖","link":"#_3-1-maven依赖","children":[]},{"level":3,"title":"3.2. Java代码","slug":"_3-2-java代码","link":"#_3-2-java代码","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720593957000,"updatedTime":1720593957000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.97,"words":891},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Introduction to ScyllaDB with Java.md","localizedDate":"2024年7月10日","excerpt":"\\n<p>在这个教程中，我们将探索ScyllaDB——一个快速且可扩展的NoSQL数据库。我们将看到它的特性以及如何与之交互。</p>\\n<h2>2. ScyllaDB是什么？</h2>\\n<p>**ScyllaDB是一个开源的分布式NoSQL数据库。**它支持与Cassandra相同的协议，但具有更高的吞吐量和更低的延迟。它使用C++语言开发。</p>\\n<p>ScyllaDB有三个变体：</p>\\n<ul>\\n<li>ScyllaDB开源版：这是一个免费的开源版本。我们将拥有完全所有权，需要自己进行维护</li>\\n<li>ScyllaDB企业版：这是一个付费版本，我们将获得一些高级功能和全天候支持。我们需要使用自己的基础设施来安装这个版本</li>\\n<li>ScyllaDB云服务：这是ScyllaDB提供的基于云的服务，我们不需要拥有自己的基础设施或进行任何安装和维护</li>\\n</ul>","autoDesc":true}');export{v as comp,p as data};
