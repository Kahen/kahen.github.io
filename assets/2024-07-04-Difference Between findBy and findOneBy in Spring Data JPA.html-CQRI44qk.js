import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-BDZ-trJf.js";const t={},p=e(`<hr><h1 id="spring-data-jpa-中-findby-和-findoneby-的区别" tabindex="-1"><a class="header-anchor" href="#spring-data-jpa-中-findby-和-findoneby-的区别"><span>Spring Data JPA 中 findBy 和 findOneBy 的区别</span></a></h1><p>Spring Data 仓库提供了大量简化数据访问逻辑实现的方法。然而，选择适当的方法并不总是像我们期望的那样容易。</p><p>一个例子是带有 <em>findBy</em> 和 <em>findOneBy</em> 前缀的方法。尽管它们的名字看起来基于相同的事情，但它们有点不同。</p><p>Spring Data JPA 以其派生查询方法功能而广受赞誉。这些方法提供了一种从方法名称派生特定查询的方式。例如，如果我们想通过 <em>foo</em> 属性检索数据，我们可以简单地写 <em>findByFoo()</em>。</p><p>通常，我们可以使用多个前缀来构建派生查询方法。这些前缀中包括 <em>findBy</em> 和 <em>findOneBy</em>。让我们在实践中看看它们。</p><p>首先，让我们考虑 <em>Person</em> 实体类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>

    <span class="token comment">// 标准 getter 和 setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们将使用 H2 作为我们的数据库。让我们使用一个基本的 SQL 脚本来为数据库填充数据：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> person <span class="token punctuation">(</span>id<span class="token punctuation">,</span> first_name<span class="token punctuation">,</span> last_name<span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;Azhrioun&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Abderrahim&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> person <span class="token punctuation">(</span>id<span class="token punctuation">,</span> first_name<span class="token punctuation">,</span> last_name<span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;Brian&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Wheeler&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> person <span class="token punctuation">(</span>id<span class="token punctuation">,</span> first_name<span class="token punctuation">,</span> last_name<span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&#39;Stella&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Anderson&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> person <span class="token punctuation">(</span>id<span class="token punctuation">,</span> first_name<span class="token punctuation">,</span> last_name<span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">&#39;Stella&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Wheeler&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们创建一个 JPA 仓库来管理我们的 <em>Person</em> 实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PersonRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-findby-前缀" tabindex="-1"><a class="header-anchor" href="#_3-1-findby-前缀"><span>3.1. <em>findBy</em> 前缀</span></a></h3><p><em>findBy</em> 是创建派生查询方法最常用的前缀之一，表示搜索查询。</p><p><strong>动词 <em>“find”</em> 告诉 Spring Data 生成一个 <em>select</em> 查询。另一方面，关键字 <em>“By”</em> 作为 <em>where</em> 子句，因为它过滤返回的结果。</strong></p><p>接下来，让我们向我们的 <em>PersonRepository</em> 添加一个派生查询方法，根据名字获取一个人：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Person</span> <span class="token function">findByFirstName</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如我们所看到的，我们的方法返回一个单一的 <em>Person</em> 对象。现在，让我们为 <em>findByFirstName()</em> 添加一个测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenFirstName_whenCallingFindByFirstName_ThenReturnOnePerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Person</span> person <span class="token operator">=</span> personRepository<span class="token punctuation">.</span><span class="token function">findByFirstName</span><span class="token punctuation">(</span><span class="token string">&quot;Azhrioun&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Abderrahim&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">.</span><span class="token function">getLastName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们已经看到了如何使用 <em>findBy</em> 创建一个返回单个对象的查询方法，让我们看看我们是否可以使用它来获取一系列对象。为此，我们将向我们的 <em>PersonRepository</em> 添加另一个查询方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">findByLastName</span><span class="token punctuation">(</span><span class="token class-name">String</span> lastName<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>顾名思义，这个新方法将帮助我们找到所有具有相同姓氏的对象。</p><p>同样，让我们使用另一个测试用例测试 <em>findByLastName()</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenLastName_whenCallingFindByLastName_ThenReturnList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span>\`\`\`\` person <span class="token operator">=</span> personRepository<span class="token punctuation">.</span><span class="token function">findByLastName</span><span class="token punctuation">(</span><span class="token string">&quot;Wheeler&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> person<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>毫不奇怪，测试成功通过。</p><p>简而言之，<strong>我们可以使用 <em>findBy</em> 来获取一个对象或一系列对象。</strong><strong>这里的区别在于查询方法的返回类型。Spring Data 通过查看方法的返回类型来决定返回一个还是多个对象。</strong></p><h3 id="_3-2-findoneby-前缀" tabindex="-1"><a class="header-anchor" href="#_3-2-findoneby-前缀"><span>3.2. <em>findOneBy</em> 前缀</span></a></h3><p>通常，<em>oneBy</em> 只是 <em>findBy</em> 的一个特定变体。**它明确表示寻找确切一条记录的意图。**让我们看看它是如何工作的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Person</span> <span class="token function">findOneByFirstName</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，我们将添加另一个测试来确认我们的方法工作正常：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenFirstName_whenCallingFindOneByFirstName_ThenReturnOnePerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Person</span> person <span class="token operator">=</span> personRepository<span class="token punctuation">.</span><span class="token function">findOneByFirstName</span><span class="token punctuation">(</span><span class="token string">&quot;Azhrioun&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Abderrahim&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">.</span><span class="token function">getLastName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，<strong>如果我们使用 <em>findOneBy</em> 来获取一系列对象会发生什么</strong>？让我们找出答案！</p><p>首先，我们将添加另一个查询方法来查找所有具有相同姓氏的 <em>Person</em> 对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">findOneByLastName</span><span class="token punctuation">(</span><span class="token class-name">String</span> lastName<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们使用一个测试用例测试我们的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenLastName_whenCallingFindOneByLastName_ThenReturnList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span>\`\`\`\` persons <span class="token operator">=</span> personRepository<span class="token punctuation">.</span><span class="token function">findOneByLastName</span><span class="token punctuation">(</span><span class="token string">&quot;Wheeler&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> persons<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，<em>oneByLastName()</em> 返回一个列表，没有抛出任何异常。</p><p>从技术角度来看，<em>oneBy</em> 和 <em>findBy</em> 之间没有区别。然而，<strong>使用前缀 <em>findOneBy</em> 创建返回集合的查询方法在语义上没有意义。</strong></p><p>简而言之，前缀 <em>findOneBy</em> 仅提供了返回一个对象的语义描述。</p><p>Spring Data 依赖于这个正则表达式来忽略动词 <em>“find”</em> 和关键字 <em>“By”</em> 之间的所有字符。因此，<em>findBy</em>, <em>findOneBy</em>, <em>findXyzBy</em>… 都是相似的。</p><p>在使用 <em>find</em> 关键字创建派生查询方法时，需要注意几个关键点：</p><ul><li>派生查询方法的重要部分是关键字 <em>find</em> 和 <em>By</em>。</li><li>我们可以在 <em>find</em> 和 <em>By</em> 之间添加单词以表示语义。</li><li>Spring Data 根据方法的返回类型决定返回一个对象还是集合。</li></ul><h2 id="_4-incorrectresultsizedataaccessexception" tabindex="-1"><a class="header-anchor" href="#_4-incorrectresultsizedataaccessexception"><span>4. <em>IncorrectResultSizeDataAccessException</em></span></a></h2><p><strong>这里需要提到的一个重要警告是，无论是 <em>findByLastName()</em> 还是 <em>findOneByLastName()</em> 方法，在返回结果不是预期大小时都会抛出 <em>IncorrectResultSizeDataAccessException</em>。</strong></p><p>例如，<em>Person findByFirstName(String firstName)</em> 如果有多个给定名字的 <em>Person</em> 对象，将会抛出异常。</p><p>所以，让我们使用一个测试用例来确认这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenFirstName_whenCallingFindByFirstName_ThenThrowException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">IncorrectResultSizeDataAccessException</span> exception <span class="token operator">=</span> <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">IncorrectResultSizeDataAccessException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> personRepository<span class="token punctuation">.</span><span class="token function">findByFirstName</span><span class="token punctuation">(</span><span class="token string">&quot;Stella&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;query did not return a unique result: 2&quot;</span><span class="token punctuation">,</span> exception<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>异常的原因是尽管我们声明我们的方法返回一个对象，但执行的查询返回了多条记录。</p><p>同样，让我们使用一个测试用例确认 <em>findOneByFirstName()</em> 抛出 <em>IncorrectResultSizeDataAccessException</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenFirstName_whenCallingFindOneByFirstName_ThenThrowException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">IncorrectResultSizeDataAccessException</span> exception <span class="token operator">=</span> <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">IncorrectResultSizeDataAccessException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> personRepository<span class="token punctuation">.</span><span class="token function">findOneByFirstName</span><span class="token punctuation">(</span><span class="token string">&quot;Stella&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;query did not return a unique result: 2&quot;</span><span class="token punctuation">,</span> exception<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇文章中，我们详细探讨了 Spring Data JPA 中 <em>findBy</em> 和 <em>findOneBy</em> 前缀的相似之处和不同之处。</p><p>在此过程中，我们解释了 Spring Data JPA 中的派生查询方法。然后，我们强调了尽管 <em>findBy</em> 和 <em>findOneBy</em> 之间有不同的语义意图，但它们在内部是相同的。</p><p>最后，我们展示了如果我们选择了错误的返回类型，两者都会抛出 <em>IncorrectResultSizeDataAccessException</em>。</p><p>如往常一样，本文的完整代码可以在 GitHub 上找到。</p>`,55),i=[p];function o(c,l){return s(),a("div",null,i)}const d=n(t,[["render",o],["__file","2024-07-04-Difference Between findBy and findOneBy in Spring Data JPA.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Difference%20Between%20findBy%20and%20findOneBy%20in%20Spring%20Data%20JPA.html","title":"Spring Data JPA 中 findBy 和 findOneBy 的区别","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Data JPA","findBy vs findOneBy"],"tag":["Spring Data","JPA","findBy","findOneBy"],"head":[["meta",{"name":"keywords","content":"Spring Data JPA, findBy, findOneBy, 查询方法, 数据访问"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Difference%20Between%20findBy%20and%20findOneBy%20in%20Spring%20Data%20JPA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Data JPA 中 findBy 和 findOneBy 的区别"}],["meta",{"property":"og:description","content":"Spring Data JPA 中 findBy 和 findOneBy 的区别 Spring Data 仓库提供了大量简化数据访问逻辑实现的方法。然而，选择适当的方法并不总是像我们期望的那样容易。 一个例子是带有 findBy 和 findOneBy 前缀的方法。尽管它们的名字看起来基于相同的事情，但它们有点不同。 Spring Data JPA 以..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T01:46:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Data"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:tag","content":"findBy"}],["meta",{"property":"article:tag","content":"findOneBy"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T01:46:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Data JPA 中 findBy 和 findOneBy 的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T01:46:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Data JPA 中 findBy 和 findOneBy 的区别 Spring Data 仓库提供了大量简化数据访问逻辑实现的方法。然而，选择适当的方法并不总是像我们期望的那样容易。 一个例子是带有 findBy 和 findOneBy 前缀的方法。尽管它们的名字看起来基于相同的事情，但它们有点不同。 Spring Data JPA 以..."},"headers":[{"level":3,"title":"3.1. findBy 前缀","slug":"_3-1-findby-前缀","link":"#_3-1-findby-前缀","children":[]},{"level":3,"title":"3.2. findOneBy 前缀","slug":"_3-2-findoneby-前缀","link":"#_3-2-findoneby-前缀","children":[]},{"level":2,"title":"4. IncorrectResultSizeDataAccessException","slug":"_4-incorrectresultsizedataaccessexception","link":"#_4-incorrectresultsizedataaccessexception","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720057616000,"updatedTime":1720057616000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.87,"words":1462},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Difference Between findBy and findOneBy in Spring Data JPA.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Spring Data JPA 中 findBy 和 findOneBy 的区别</h1>\\n<p>Spring Data 仓库提供了大量简化数据访问逻辑实现的方法。然而，选择适当的方法并不总是像我们期望的那样容易。</p>\\n<p>一个例子是带有 <em>findBy</em> 和 <em>findOneBy</em> 前缀的方法。尽管它们的名字看起来基于相同的事情，但它们有点不同。</p>\\n<p>Spring Data JPA 以其派生查询方法功能而广受赞誉。这些方法提供了一种从方法名称派生特定查询的方式。例如，如果我们想通过 <em>foo</em> 属性检索数据，我们可以简单地写 <em>findByFoo()</em>。</p>","autoDesc":true}');export{d as comp,k as data};
