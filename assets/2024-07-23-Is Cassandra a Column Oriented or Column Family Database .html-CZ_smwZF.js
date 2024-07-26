import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as s}from"./app-DpYLEM_u.js";const n={},r=s(`<h1 id="apache-cassandra-是列式还是列族数据库" tabindex="-1"><a class="header-anchor" href="#apache-cassandra-是列式还是列族数据库"><span>Apache Cassandra 是列式还是列族数据库？</span></a></h1><p>Apache Cassandra 是一个开源的分布式 NoSQL 数据库，它被构建用于在多个数据中心处理大量数据。Cassandra 的数据模型在多个文档和论文中是讨论的话题，常常导致混淆或矛盾的信息。这是因为 Cassandra 能够分别存储和访问列族，这导致它被错误地分类为列式而不是列族。</p><p>在本教程中，我们将查看数据模型之间的差异，并确定 Cassandra 分区行存储数据模型的性质。</p><h2 id="_2-数据库数据模型" tabindex="-1"><a class="header-anchor" href="#_2-数据库数据模型"><span>2. 数据库数据模型</span></a></h2><p>Apache Cassandra git 仓库上的 README 说明如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Cassandra 是一个分区行存储。行被组织成带有必需主键的表。

分区意味着 Cassandra 可以在应用透明的条件下跨多台机器分布您的数据。Cassandra 将自动重新分区，当集群中添加或移除机器时。

行存储意味着像关系数据库一样，Cassandra 按行和列组织数据。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从这，我们可以得出结论，<strong>Cassandra 是一个 <em>分区行</em> 存储</strong>。然而，列族或宽列也是合适的名字，正如我们下面将要发现的。</p><p><strong>列族数据模型与列式模型不同</strong>。列族数据库存储一行及其所有列族在一起，而列式数据库简单地按列而不是按行存储数据表。</p><h3 id="_2-1-行式和列式数据存储" tabindex="-1"><a class="header-anchor" href="#_2-1-行式和列式数据存储"><span>2.1. 行式和列式数据存储</span></a></h3><p>让我们以一个 <em>Employees</em> 表为例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>  ID         Last    First   Age
  1          Cooper  James   32
  2          Bell    Lisa    57
  3          Young   Joseph  45
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>行式数据库存储上述数据为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>1,Cooper,James,32;2,Bell,Lisa,57;3,Young,Joseph,45;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>而列式数据库存储数据为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>1,2,3;Cooper,Bell,Young;James,Lisa,Joseph;32,57,45;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Cassandra 不像行式或列式数据库那样存储其数据</strong>。</p><h3 id="_2-2-分区行存储" tabindex="-1"><a class="header-anchor" href="#_2-2-分区行存储"><span>2.2. 分区行存储</span></a></h3><p><strong>Cassandra 使用一个 <em>分区行存储</em></strong>，这意味着行包含列。列族数据库存储数据，键映射到值，并将值分组到多个列族中。</p><p>在 <em>分区行存储</em> 中，《Employees》数据看起来像这样：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;Employees&quot; : {
           row1 : { &quot;ID&quot;:1, &quot;Last&quot;:&quot;Cooper&quot;, &quot;First&quot;:&quot;James&quot;, &quot;Age&quot;:32},
           row2 : { &quot;ID&quot;:2, &quot;Last&quot;:&quot;Bell&quot;, &quot;First&quot;:&quot;Lisa&quot;, &quot;Age&quot;:57},
           row3 : { &quot;ID&quot;:3, &quot;Last&quot;:&quot;Young&quot;, &quot;First&quot;:&quot;Joseph&quot;, &quot;Age&quot;:45},
           ...
      }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>分区行存储有包含列的行，但每行的列数不必相同</strong>（像 big-table）。一些行可能有数千列，而一些行可能只限于一列。</p><p>我们可以将 <em>分区行存储</em> 想象为 <em>二维键值存储</em>，使用行键和列键来访问数据。<strong>要访问最小的数据单元（一列），我们首先必须指定行名（键），然后是列名</strong>。</p><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在本文中，我们了解到 Cassandra 的 <em>分区行存储</em> 意味着它是 <strong>列族</strong> 而不是 <strong>列式</strong>。定义 <em>列族</em> 的主要特征是 <strong>列信息是数据的一部分</strong>。这是列族模型与行式和列式模型之间的主要区别。术语 <em>宽列</em> 来自于这样一个概念：持有无限列数的表本质上是宽的。</p><p>我们还探讨了列族数据存储中的行不需要共享列名或列数。这使得 <em>无模式</em> 或 <em>半结构化</em> 表成为可能。Apache Cassandra 是一个开源的分布式 NoSQL 数据库，它被设计用来在多个数据中心处理大量数据。Cassandra 的数据模型在多个文档和论文中经常被讨论，但往往会导致混淆或矛盾的信息。这是因为 Cassandra 能够独立地存储和访问列族，这常常导致人们错误地将其分类为列式数据库，而不是列族数据库。</p><p>在本教程中，我们将探讨数据模型之间的差异，并确定 Cassandra 的分区行存储数据模型的本质。</p><h2 id="数据库数据模型" tabindex="-1"><a class="header-anchor" href="#数据库数据模型"><span>数据库数据模型</span></a></h2><p>Apache Cassandra 的 git 仓库中的 README 文件指出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Cassandra 是一个分区行存储数据库。行被组织进带有必需主键的表中。

分区意味着 Cassandra 能够以对应用程序透明的方式跨多台机器分布您的数据。当集群中添加或移除机器时，Cassandra 会自动重新分区。

行存储意味着，与关系数据库一样，Cassandra 按行和列组织数据。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从这里我们可以得出结论，<strong>Cassandra 是一个分区行存储数据库</strong>。然而，称其为列族或宽列数据库也是恰当的，正如我们下面将看到的。</p><p><strong>列族数据模型与列式模型不同</strong>。列族数据库将所有列族存储在一起，形成一行，而列式数据库则是简单地按列而不是按行存储数据表。</p><h3 id="_2-1-行式和列式数据存储-1" tabindex="-1"><a class="header-anchor" href="#_2-1-行式和列式数据存储-1"><span>2.1 行式和列式数据存储</span></a></h3><p>以一个名为 &quot;Employees&quot; 的表为例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>  ID     Last Name  First Name Age
  1     Cooper      James      32
  2     Bell        Lisa       57
  3     Young       Joseph    45
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>行式数据库会这样存储上述数据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>1,Cooper,James,32;2,Bell,Lisa,57;3,Young,Joseph,45;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>而列式数据库会这样存储数据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>1,2,3;Cooper,Bell,Young;James,Lisa,Joseph;32,57,45;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Cassandra 不是像行式或列式数据库那样存储数据的</strong>。</p><h3 id="_2-2-分区行存储-1" tabindex="-1"><a class="header-anchor" href="#_2-2-分区行存储-1"><span>2.2 分区行存储</span></a></h3><p><strong>Cassandra 使用的是分区行存储</strong>，这意味着行包含列。列族数据库存储数据时，使用键映射到值，并将值分组到多个列族中。</p><p>在分区行存储中，&quot;Employees&quot; 数据看起来像这样：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;Employees&quot; : {
           row1 : { &quot;ID&quot;:1, &quot;Last Name&quot;:&quot;Cooper&quot;, &quot;First Name&quot;:&quot;James&quot;, &quot;Age&quot;:32},
           row2 : { &quot;ID&quot;:2, &quot;Last Name&quot;:&quot;Bell&quot;, &quot;First Name&quot;:&quot;Lisa&quot;, &quot;Age&quot;:57},
           row3 : { &quot;ID&quot;:3, &quot;Last Name&quot;:&quot;Young&quot;, &quot;First Name&quot;:&quot;Joseph&quot;, &quot;Age&quot;:45},
           ...
      }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>分区行存储的特点是行包含列，但每行的列数不必相同</strong>（类似于 BigTable）。有些行可能有数千列，而其他行可能只有一列。</p><p>我们可以将分区行存储视为<strong>二维键值存储</strong>，使用行键和列键来访问数据。<strong>要访问最小的数据单元（一个列），我们首先需要指定行名（键），然后是列名</strong>。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们了解到 Cassandra 的分区行存储意味着它是一个<strong>列族数据库</strong>，而不是列式数据库。定义列族的主要特征是<strong>列信息是数据的一部分</strong>。这是列族模型与行式和列式模型的主要区别。宽列这个术语来源于这样一个概念：自然地，持有无限数量列的表是宽的。</p><p>我们还探讨了列族数据存储中的行不需要共享列名或列数。这使得<strong>无模式</strong>或<strong>半结构化</strong>的表成为可能。</p><p>OK</p>`,49),i=[r];function d(o,l){return t(),a("div",null,i)}const c=e(n,[["render",d],["__file","2024-07-23-Is Cassandra a Column Oriented or Column Family Database .html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-23/2024-07-23-Is%20Cassandra%20a%20Column%20Oriented%20or%20Column%20Family%20Database%20.html","title":"Apache Cassandra 是列式还是列族数据库？","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Cassandra","Database"],"tag":["NoSQL","Data Model"],"head":[["meta",{"name":"keywords","content":"Apache Cassandra, Column-Oriented, Column-Family, Partitioned Row Store"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-23/2024-07-23-Is%20Cassandra%20a%20Column%20Oriented%20or%20Column%20Family%20Database%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Apache Cassandra 是列式还是列族数据库？"}],["meta",{"property":"og:description","content":"Apache Cassandra 是列式还是列族数据库？ Apache Cassandra 是一个开源的分布式 NoSQL 数据库，它被构建用于在多个数据中心处理大量数据。Cassandra 的数据模型在多个文档和论文中是讨论的话题，常常导致混淆或矛盾的信息。这是因为 Cassandra 能够分别存储和访问列族，这导致它被错误地分类为列式而不是列族。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T06:47:29.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"NoSQL"}],["meta",{"property":"article:tag","content":"Data Model"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T06:47:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache Cassandra 是列式还是列族数据库？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-23T06:47:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Apache Cassandra 是列式还是列族数据库？ Apache Cassandra 是一个开源的分布式 NoSQL 数据库，它被构建用于在多个数据中心处理大量数据。Cassandra 的数据模型在多个文档和论文中是讨论的话题，常常导致混淆或矛盾的信息。这是因为 Cassandra 能够分别存储和访问列族，这导致它被错误地分类为列式而不是列族。 ..."},"headers":[{"level":2,"title":"2. 数据库数据模型","slug":"_2-数据库数据模型","link":"#_2-数据库数据模型","children":[{"level":3,"title":"2.1. 行式和列式数据存储","slug":"_2-1-行式和列式数据存储","link":"#_2-1-行式和列式数据存储","children":[]},{"level":3,"title":"2.2. 分区行存储","slug":"_2-2-分区行存储","link":"#_2-2-分区行存储","children":[]}]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]},{"level":2,"title":"数据库数据模型","slug":"数据库数据模型","link":"#数据库数据模型","children":[{"level":3,"title":"2.1 行式和列式数据存储","slug":"_2-1-行式和列式数据存储-1","link":"#_2-1-行式和列式数据存储-1","children":[]},{"level":3,"title":"2.2 分区行存储","slug":"_2-2-分区行存储-1","link":"#_2-2-分区行存储-1","children":[]}]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1721717249000,"updatedTime":1721717249000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.6,"words":1680},"filePathRelative":"posts/baeldung/2024-07-23/2024-07-23-Is Cassandra a Column Oriented or Column Family Database .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Apache Cassandra 是一个开源的分布式 NoSQL 数据库，它被构建用于在多个数据中心处理大量数据。Cassandra 的数据模型在多个文档和论文中是讨论的话题，常常导致混淆或矛盾的信息。这是因为 Cassandra 能够分别存储和访问列族，这导致它被错误地分类为列式而不是列族。</p>\\n<p>在本教程中，我们将查看数据模型之间的差异，并确定 Cassandra 分区行存储数据模型的性质。</p>\\n<h2>2. 数据库数据模型</h2>\\n<p>Apache Cassandra git 仓库上的 README 说明如下：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>Cassandra 是一个分区行存储。行被组织成带有必需主键的表。\\n\\n分区意味着 Cassandra 可以在应用透明的条件下跨多台机器分布您的数据。Cassandra 将自动重新分区，当集群中添加或移除机器时。\\n\\n行存储意味着像关系数据库一样，Cassandra 按行和列组织数据。\\n</code></pre></div>","autoDesc":true}');export{c as comp,m as data};
