import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as i}from"./app-BEVMBw2k.js";const r={},a=i('<h1 id="spring-data-jpa-中的-findfirst-和-findtop-的区别" tabindex="-1"><a class="header-anchor" href="#spring-data-jpa-中的-findfirst-和-findtop-的区别"><span>Spring Data JPA 中的 findFirst() 和 findTop() 的区别</span></a></h1><p>在本教程中，我们将学习 Spring Data JPA 中的 <em>findFirst()</em> 和 <em>findTop()</em> 方法。这些方法提供了数据检索功能。它们映射到 SQL 中对应的选择查询。</p><p>Spring Data JPA 是 Spring 项目下的一个框架。它提供了与持久层工作的 API，即我们用它为我们的关系数据库管理系统（RDBMS）的数据访问层。</p><p><em>JpaRepository</em> 接口提供了实现数据访问层的一种方式。</p><p><em>JpaRepository</em> 是一个泛型接口。我们定义一个接口，该接口扩展了 <em>JpaRepository</em>。接口使用我们的 <em>Entity</em> 和 <em>Entity</em> 的主键进行类型化。接下来，我们在我们的仓库接口中添加方法声明。</p><p>Spring 框架随后生成接口实现。接口方法的代码是自动生成的。因此，我们得到了持久存储上的数据访问层。</p><p><strong>Spring 框架将我们的 <em>Repository</em> bean 加载到容器中。</strong> 使用 <em>@Autowired</em> 注解，我们可以在我们的组件中注入这个 <em>Repository</em> bean。<strong>这消除了编写 SQL 查询的复杂性。</strong> 我们得到了类型化的数据，增强了调试能力。Spring Data JPA 是一个巨大的生产力助推器。</p><h3 id="使用-spring-data-jpa-findfirst" tabindex="-1"><a class="header-anchor" href="#使用-spring-data-jpa-findfirst"><span>使用 Spring Data JPA _findFirst()</span></a></h3><p>数据检索是数据访问层的核心操作。正如其名称所示，<em>findFirst()</em> 是一种数据检索方法。名称中的“First”表示它从一组记录的开始检索数据。大多数情况下，我们基于某些标准需要数据记录的一个子集。</p><p>让我们以一个持有学生数据的实体 <em>Student</em> 为例。它的字段是 <em>studentId</em>、<em>name</em> 和 <em>score</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Entity\nclass Student{\n    private Long studentId;\n    private String name;\n    private Double score;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们定义相应的 <em>Repository</em>，命名为 <em>StudentRepository</em>。这是一个从 <em>JpaRepository</em> 扩展的接口。我们向 <em>JpaRepository</em> 传递 <em>Student</em> 和 <em>Long</em> 类型。这为我们的 <em>Student</em> 实体创建了一个数据访问层：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Repository\npublic interface StudentRepository extends JpaRepository```&lt;Student, Long&gt;``` {\n\n    Student findFirstByOrderByScoreDesc();\n    List````&lt;Student&gt;```` findFirst3ByOrderByScoreDesc();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-方法名称的意义" tabindex="-1"><a class="header-anchor" href="#_3-1-方法名称的意义"><span>3.1. 方法名称的意义</span></a></h3><p>方法名称 <em>findFirstByOrderByScoreDesc()</em> 并不是随机的**。方法名称 <em>findFirstByOrderByScoreDesc()</em> 的每一部分都有其意义**。</p><p>“find”意味着它映射到一个选择查询。“First”意味着它从记录列表中检索第一条记录。“OrderByScore”表示我们希望记录按 <em>score</em> 属性排序。“Desc”意味着我们希望排序是逆序的。这个方法的返回类型是 <em>Student</em> 对象**。</p><p>Spring 框架智能地评估方法名称。然后生成并执行查询以构建我们期望的输出。在我们特定的情况下，它检索第一条 <em>Student</em> 记录。它首先按 <em>score</em> 降序排序 <em>Student</em> 记录。因此，我们得到了所有 <em>Student</em> 中的最高分。</p><h3 id="_3-2-返回记录集合" tabindex="-1"><a class="header-anchor" href="#_3-2-返回记录集合"><span>3.2. 返回记录集合</span></a></h3><p>下一个方法是 <em>findFirst3ByOrderByScoreDesc()</em>。该方法的声明中有一些新特性。</p><p>首先，返回类型是 <em>Student</em> 的集合，而不是单一的 <em>Student</em> 对象。其次，“findFirst”后面的数字是3。这意味着我们期望从这个方法中得到多条记录作为输出。</p><p><strong>方法名称中的 3 定义了我们期望的确切记录数</strong>。如果总记录数少于3，则结果中就会少于3条记录。</p><p>这个方法也按 <em>score</em> 属性逆序排序。然后，它取前3条记录并将它们作为记录列表返回。因此，我们得到了按分数排名前三的 <em>Student</em>。我们可以将限制数字更改为2、4等。</p><h3 id="_3-3-混合过滤条件" tabindex="-1"><a class="header-anchor" href="#_3-3-混合过滤条件"><span>3.3. 混合过滤条件</span></a></h3><p>我们也可以在混合其他过滤条件的同时以不同的方式定义相同的限制方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Repository\npublic interface StudentRepository extends JpaRepository```&lt;Student, Long&gt;```{\n    \n    Student findFirstBy(Sort sort);\n    Student findFirstByNameLike(String name, Sort sort);\n    \n    List````&lt;Student&gt;```` findFirst2ByScoreBetween(int startScore, int endScore, Sort sort);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，<em>findFirstBy()</em> 将 <em>Sort</em> 定义为参数。这使得 <em>findFirstBy()</em> 成为一个通用方法。在调用方法之前，我们将定义排序逻辑。</p><p><em>findFirstByNameLike()</em> 在 <em>findFirstBy()</em> 功能的基础上创建了对 <em>Student</em> 名称的过滤。</p><p><em>findFirst2ByScoreBetween()</em> 定义了分数范围。它按 <em>Sort</em> 标准对 <em>Student</em> 进行排序。然后它找到 <em>start</em> 和 <em>end</em> 分数范围内的前两个 <em>Student</em>。</p><p>让我们看看如何创建一个 <em>Sort</em> 对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Sort sort = Sort.by(&quot;score&quot;).descending();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>by()</em> 方法以我们想要排序的属性名称作为字符串参数。另一方面，<em>descending()</em> 方法调用使排序逆序。</p><p>当调用 <em>findFirst()</em> 方法时，在后台执行了 <strong>以下查询</strong>，因此它限制了结果（<em>limit 1</em>）：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>select student0_.&quot;id&quot; as id1_0_, student0_.&quot;name&quot; as name2_0_, student0_.&quot;score&quot; as score3_0_ from &quot;student&quot; student0_ order by student0_.&quot;score&quot; desc limit ?\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="使用-spring-data-jpa-findtop" tabindex="-1"><a class="header-anchor" href="#使用-spring-data-jpa-findtop"><span>使用 Spring Data JPA _findTop()</span></a></h2><p>接下来是 <em>findTop()</em> 方法。<strong><em>findTop()</em> 只是同一个 <em>findFirst()</em> 方法的另一个名称</strong>。<strong>我们可以无问题地互换使用 <em>findFirst()</em> 或 <em>findTop()</em></strong>。</p><p>它们只是别名，是开发者喜好的问题，没有任何实际影响。以下是我们之前看到的相同方法的 <em>findTop()</em> 版本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Repository\npublic interface StudentRepository extends JpaRepository```&lt;Student, Long&gt;``` {\n\n    Student findTopByOrderByScoreDesc();\n    List````&lt;Student&gt;```` findTop3ByOrderByScoreDesc();\n    Student findTopBy(Sort sort);\n    Student findTopByNameLike(String name, Sort sort);\n    List````&lt;Student&gt;```` findTop2ByScoreBetween(int startScore, int endScore, Sort sort);\n    \n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当调用带有 findTop 的方法时，在后台执行了 <strong>以下查询</strong>，因此它限制了结果（<em>limit 1</em>）：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>select student0_.&quot;id&quot; as id1_0_, student0_.&quot;name&quot; as name2_0_, student0_.&quot;score&quot; as score3_0_ from &quot;student&quot; student0_ order by student0_.&quot;score&quot; desc limit ?\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如你所见，<strong><em>findFirst()</em> 执行的查询与 <em>findTop()</em> 相同</strong>。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们学习了 Spring Data JPA API 提供的两个方法，<em>findFirst()</em> 和 <em>findTop()</em>。这两种方法可以作为更复杂检索方法的基础。</p><p>我们已经看到了一些 <em>findFirst()</em> 和 <em>findTop()</em> 与其他过滤条件混合使用的例子。当 <em>findFirst()</em> 或 <em>findTop()</em> 没有数字时返回单个记录。如果 <em>findFirst()</em> 或 <em>findTop()</em> 后面附加了数字，则检索到该数字的记录。</p><p><strong>一个重要的学习点是我们可以任意使用 <em>findFirst()</em> 或 <em>findTop()</em>。</strong> 这是一个个人选择问题。<em>findFirst()</em> 和 <em>findTop()</em> 之间没有区别。</p><p>如常，示例的源代码可以在 GitHub 上找到。</p>',45),d=[a];function s(o,p){return n(),t("div",null,d)}const c=e(r,[["render",s],["__file","2024-07-10-Differences Between Spring Data JPA findFirst   and findTop  .html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Differences%20Between%20Spring%20Data%20JPA%20findFirst%20%20%20and%20findTop%20%20.html","title":"Spring Data JPA 中的 findFirst() 和 findTop() 的区别","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Data JPA","findFirst() vs findTop()"],"tag":["Spring Data JPA","findFirst()","findTop()"],"head":[["meta",{"name":"keywords","content":"Spring Data JPA, findFirst(), findTop(), 数据访问层, 方法比较"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Differences%20Between%20Spring%20Data%20JPA%20findFirst%20%20%20and%20findTop%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Data JPA 中的 findFirst() 和 findTop() 的区别"}],["meta",{"property":"og:description","content":"Spring Data JPA 中的 findFirst() 和 findTop() 的区别 在本教程中，我们将学习 Spring Data JPA 中的 findFirst() 和 findTop() 方法。这些方法提供了数据检索功能。它们映射到 SQL 中对应的选择查询。 Spring Data JPA 是 Spring 项目下的一个框架。它提供了..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T11:01:32.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Data JPA"}],["meta",{"property":"article:tag","content":"findFirst()"}],["meta",{"property":"article:tag","content":"findTop()"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T11:01:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Data JPA 中的 findFirst() 和 findTop() 的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T11:01:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Data JPA 中的 findFirst() 和 findTop() 的区别 在本教程中，我们将学习 Spring Data JPA 中的 findFirst() 和 findTop() 方法。这些方法提供了数据检索功能。它们映射到 SQL 中对应的选择查询。 Spring Data JPA 是 Spring 项目下的一个框架。它提供了..."},"headers":[{"level":3,"title":"使用 Spring Data JPA _findFirst()","slug":"使用-spring-data-jpa-findfirst","link":"#使用-spring-data-jpa-findfirst","children":[]},{"level":3,"title":"3.1. 方法名称的意义","slug":"_3-1-方法名称的意义","link":"#_3-1-方法名称的意义","children":[]},{"level":3,"title":"3.2. 返回记录集合","slug":"_3-2-返回记录集合","link":"#_3-2-返回记录集合","children":[]},{"level":3,"title":"3.3. 混合过滤条件","slug":"_3-3-混合过滤条件","link":"#_3-3-混合过滤条件","children":[]},{"level":2,"title":"使用 Spring Data JPA _findTop()","slug":"使用-spring-data-jpa-findtop","link":"#使用-spring-data-jpa-findtop","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720609292000,"updatedTime":1720609292000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.17,"words":1550},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Differences Between Spring Data JPA findFirst   and findTop  .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将学习 Spring Data JPA 中的 <em>findFirst()</em> 和 <em>findTop()</em> 方法。这些方法提供了数据检索功能。它们映射到 SQL 中对应的选择查询。</p>\\n<p>Spring Data JPA 是 Spring 项目下的一个框架。它提供了与持久层工作的 API，即我们用它为我们的关系数据库管理系统（RDBMS）的数据访问层。</p>\\n<p><em>JpaRepository</em> 接口提供了实现数据访问层的一种方式。</p>\\n<p><em>JpaRepository</em> 是一个泛型接口。我们定义一个接口，该接口扩展了 <em>JpaRepository</em>。接口使用我们的 <em>Entity</em> 和 <em>Entity</em> 的主键进行类型化。接下来，我们在我们的仓库接口中添加方法声明。</p>","autoDesc":true}');export{c as comp,u as data};
