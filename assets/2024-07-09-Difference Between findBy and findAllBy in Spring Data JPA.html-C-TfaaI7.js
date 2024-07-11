import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-uizvaz9h.js";const t={},p=e('<h1 id="spring-data-jpa-中-findby-与-findallby-的区别" tabindex="-1"><a class="header-anchor" href="#spring-data-jpa-中-findby-与-findallby-的区别"><span>Spring Data JPA 中 findBy 与 findAllBy 的区别</span></a></h1><p>在本教程中，我们将探讨在使用 Spring Data JPA 的派生查询 API 时，findBy 和 findAllBy 方法命名约定之间的区别。</p><h3 id="_2-1-示例应用程序" tabindex="-1"><a class="header-anchor" href="#_2-1-示例应用程序"><span>2.1 示例应用程序</span></a></h3><p>首先，我们定义一个示例 Spring Data 应用程序。然后，创建 Player 实体类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Player</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Id</span>\n    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">AUTO</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token keyword">long</span> id<span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">Integer</span> score<span class="token punctuation">;</span>\n\n    <span class="token comment">// 全参构造函数和无参构造函数</span>\n    <span class="token comment">// 重写的 equals 方法</span>\n    <span class="token comment">// getter 和 setter</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时创建 PlayerRepository 接口，它扩展了 JpaRepository 接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PlayerRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Player</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>` <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-findby-查询示例" tabindex="-1"><a class="header-anchor" href="#_2-2-findby-查询示例"><span>2.2 findBy 查询示例</span></a></h3><p>如前所述，findBy 关键字根据规则返回结果的集合。规则跟在 By 关键字之后。让我们在 PlayerRepository 类中创建一个方法来派生一个查询，找到所有得分高于给定输入的所有玩家：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Player</span><span class="token punctuation">&gt;</span></span>`````` <span class="token function">findByScoreGreaterThan</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> target<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Spring Data JPA 解析方法名称语法为 SQL 语句以派生查询。让我们看看每个关键字的作用：</p><ul><li>find 被翻译为 select 语句。</li><li>By 被解析为 where 子句。</li><li>Score 是表列名称，应该与 Player 类中定义的名称相同。</li><li>GreaterThan 在查询中添加了 &gt; 运算符，将 score 字段与 target 方法参数进行比较。</li></ul><h3 id="_2-3-findallby-查询示例" tabindex="-1"><a class="header-anchor" href="#_2-3-findallby-查询示例"><span>2.3 findAllBy 查询示例</span></a></h3><p>与 findBy 类似，让我们在 PlayerRepository 类中创建一个带有 All 关键字的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Player</span><span class="token punctuation">&gt;</span></span>`````` <span class="token function">findAllByScoreGreaterThan</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> target<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该方法的工作方式与 findByScoreGreaterThan() 方法相同——唯一的区别是 All 关键字。这个关键字只是一个命名约定，并没有为派生查询增加任何功能，正如我们将在下一节中看到的。</p><p>现在，让我们验证 findBy 和 findAllBy 关键字之间只有命名约定上的区别，并证明它们在功能上是相同的。</p><h3 id="_3-1-功能差异" tabindex="-1"><a class="header-anchor" href="#_3-1-功能差异"><span>3.1 功能差异</span></a></h3><p>为了分析这两种方法之间是否存在功能差异，让我们编写一个集成测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RunWith</span><span class="token punctuation">(</span><span class="token class-name">SpringRunner</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@SpringBootTest</span><span class="token punctuation">(</span>classes <span class="token operator">=</span> <span class="token class-name">FindByVsFindAllByApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FindByVsFindAllByIntegrationTest</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Autowired</span>\n    <span class="token keyword">private</span> <span class="token class-name">PlayerRepository</span> playerRepository<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Before</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Player</span> player1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token number">600</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Player</span> player2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Player</span> player3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        playerRepository<span class="token punctuation">.</span><span class="token function">saveAll</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>player1<span class="token punctuation">,</span> player2<span class="token punctuation">,</span> player3<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Test</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenSavedPlayer_whenUseFindByOrFindAllBy_thenReturnSameResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Player</span><span class="token punctuation">&gt;</span></span>`````` findByPlayers <span class="token operator">=</span> playerRepository<span class="token punctuation">.</span><span class="token function">findByScoreGreaterThan</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Player</span><span class="token punctuation">&gt;</span></span>`````` findAllByPlayers <span class="token operator">=</span> playerRepository<span class="token punctuation">.</span><span class="token function">findAllByScoreGreaterThan</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertEquals</span><span class="token punctuation">(</span>findByPlayers<span class="token punctuation">,</span> findAllByPlayers<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：为了让测试通过，Player 实体必须有一个重写的 equals() 方法，比较 id 和 score 字段。</p><p>两种方法返回相同的结果，如 assertEquals() 所示。因此，它们在功能上没有差异。</p><h3 id="_3-2-查询语法差异" tabindex="-1"><a class="header-anchor" href="#_3-2-查询语法差异"><span>3.2 查询语法差异</span></a></h3><p>为了完整，让我们比较这两种方法生成的查询的语法。为此，我们需要首先在 application.properties 文件中添加以下行：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.jpa.show-sql</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们重新运行集成测试，两个查询应该都会出现在控制台中。这是 findByScoreGreaterThan() 派生的查询：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">select</span>\n    player0_<span class="token punctuation">.</span>id <span class="token keyword">as</span> id1_0_<span class="token punctuation">,</span> player0_<span class="token punctuation">.</span>score <span class="token keyword">as</span> score2_0_\n<span class="token keyword">from</span>\n    player player0_\n<span class="token keyword">where</span>\n    player0_<span class="token punctuation">.</span>score <span class="token operator">&gt;</span> ?\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是 findAllByScoreGreaterThan() 派生的查询：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">select</span>\n    player0_<span class="token punctuation">.</span>id <span class="token keyword">as</span> id1_0_<span class="token punctuation">,</span> player0_<span class="token punctuation">.</span>score <span class="token keyword">as</span> score2_0_\n<span class="token keyword">from</span>\n    player player0_\n<span class="token keyword">where</span>\n    player0_<span class="token punctuation">.</span>score <span class="token operator">&gt;</span> ?\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，生成的查询的语法没有差异。因此，<strong>使用 findBy 和 findAllBy 关键字之间的唯一区别是我们想要采用的代码风格</strong>。我们可以使用它们中的任何一个，并期望得到相同的结果。</p><h2 id="_4-返回单个结果" tabindex="-1"><a class="header-anchor" href="#_4-返回单个结果"><span>4. 返回单个结果</span></a></h2><p>我们已经澄清了 findBy 和 findAllBy 之间没有差异，并且两者都返回结果的集合。如果我们改变我们的接口，从这些我们知道可以返回多个结果的派生查询中返回单个结果，我们就有可能得到 NonUniqueResultException。</p><p>在这一部分中，我们将看看 find <em>F</em> irst 和 find <em>T</em> op 关键字来派生一个返回单个结果的查询。</p><p><strong>F _irst 和 T _op 关键字应该插入在 find 和 By 关键字之间，以找到存储的第一个元素</strong>。它们也可以与 IsGreaterThan 这样的标准关键字一起使用。让我们看一个例子，找到存储的得分高于 400 的第一个 Player。首先，让我们在 PlayerRepository 类中创建我们的查询方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Player</span><span class="token punctuation">&gt;</span></span>`````` <span class="token function">findFirstByScoreGreaterThan</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> target<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Top 关键字在功能上等同于 First。它们之间唯一的区别是命名约定。因此，我们可以使用一个名为 findTopByScoreGreaterThan() 的方法来实现相同的结果。</p><p>然后，我们验证我们只得到一个结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenSavedPlayer_whenUsefindFirst_thenReturnSingleResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Optional</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Player</span><span class="token punctuation">&gt;</span></span>`````` player <span class="token operator">=</span> playerRepository<span class="token punctuation">.</span><span class="token function">findFirstByScoreGreaterThan</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertTrue</span><span class="token punctuation">(</span>player<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">600</span><span class="token punctuation">,</span> player<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getScore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>findFirstBy 查询使用 limit SQL 运算符返回匹配我们标准的第一个存储的元素</strong>，在这种情况下，是 id=1 和 score=600 的 Player。</p><p>最后，让我们看看我们的方法生成的查询：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">select</span>\n    player0_<span class="token punctuation">.</span>id <span class="token keyword">as</span> id1_0_<span class="token punctuation">,</span> player0_<span class="token punctuation">.</span>score <span class="token keyword">as</span> score2_0_\n<span class="token keyword">from</span>\n    player player0_\n<span class="token keyword">where</span>\n    player0_<span class="token punctuation">.</span>score <span class="token operator">&gt;</span> ?\n<span class="token keyword">limit</span> ?\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查询几乎与 findBy 和 findAllBy 相同，只是在末尾加上了 limit 运算符。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了 Spring Data JPA 中 findBy 和 findAllBy 关键字之间的相似之处。我们还看了如何使用 findFirstBy 关键字返回单个结果。如常，源代码可在 GitHub 上获得。</p>',44),l=[p];function i(o,c){return s(),a("div",null,l)}const u=n(t,[["render",i],["__file","2024-07-09-Difference Between findBy and findAllBy in Spring Data JPA.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Difference%20Between%20findBy%20and%20findAllBy%20in%20Spring%20Data%20JPA.html","title":"Spring Data JPA 中 findBy 与 findAllBy 的区别","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Data JPA","JPA"],"tag":["findBy","findAllBy"],"head":[["meta",{"name":"keywords","content":"Spring Data JPA, findBy, findAllBy, JPA, 查询方法"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Difference%20Between%20findBy%20and%20findAllBy%20in%20Spring%20Data%20JPA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Data JPA 中 findBy 与 findAllBy 的区别"}],["meta",{"property":"og:description","content":"Spring Data JPA 中 findBy 与 findAllBy 的区别 在本教程中，我们将探讨在使用 Spring Data JPA 的派生查询 API 时，findBy 和 findAllBy 方法命名约定之间的区别。 2.1 示例应用程序 首先，我们定义一个示例 Spring Data 应用程序。然后，创建 Player 实体类： 同时创..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T15:38:50.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"findBy"}],["meta",{"property":"article:tag","content":"findAllBy"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T15:38:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Data JPA 中 findBy 与 findAllBy 的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T15:38:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Data JPA 中 findBy 与 findAllBy 的区别 在本教程中，我们将探讨在使用 Spring Data JPA 的派生查询 API 时，findBy 和 findAllBy 方法命名约定之间的区别。 2.1 示例应用程序 首先，我们定义一个示例 Spring Data 应用程序。然后，创建 Player 实体类： 同时创..."},"headers":[{"level":3,"title":"2.1 示例应用程序","slug":"_2-1-示例应用程序","link":"#_2-1-示例应用程序","children":[]},{"level":3,"title":"2.2 findBy 查询示例","slug":"_2-2-findby-查询示例","link":"#_2-2-findby-查询示例","children":[]},{"level":3,"title":"2.3 findAllBy 查询示例","slug":"_2-3-findallby-查询示例","link":"#_2-3-findallby-查询示例","children":[]},{"level":3,"title":"3.1 功能差异","slug":"_3-1-功能差异","link":"#_3-1-功能差异","children":[]},{"level":3,"title":"3.2 查询语法差异","slug":"_3-2-查询语法差异","link":"#_3-2-查询语法差异","children":[]},{"level":2,"title":"4. 返回单个结果","slug":"_4-返回单个结果","link":"#_4-返回单个结果","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720539530000,"updatedTime":1720539530000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.22,"words":1265},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Difference Between findBy and findAllBy in Spring Data JPA.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨在使用 Spring Data JPA 的派生查询 API 时，findBy 和 findAllBy 方法命名约定之间的区别。</p>\\n<h3>2.1 示例应用程序</h3>\\n<p>首先，我们定义一个示例 Spring Data 应用程序。然后，创建 Player 实体类：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Entity</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Player</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token annotation punctuation\\">@Id</span>\\n    <span class=\\"token annotation punctuation\\">@GeneratedValue</span><span class=\\"token punctuation\\">(</span>strategy <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">GenerationType</span><span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">AUTO</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">long</span> id<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Integer</span> score<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// 全参构造函数和无参构造函数</span>\\n    <span class=\\"token comment\\">// 重写的 equals 方法</span>\\n    <span class=\\"token comment\\">// getter 和 setter</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{u as comp,k as data};
