import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-C4eFoh0f.js";const e={},p=t(`<h1 id="获取resultset中的行数" tabindex="-1"><a class="header-anchor" href="#获取resultset中的行数"><span>获取ResultSet中的行数</span></a></h1><p>在本文中，我们将探讨不同的方法来<strong>统计JDBC ResultSet中的行数</strong>。</p><h2 id="_2-统计resultset行数" tabindex="-1"><a class="header-anchor" href="#_2-统计resultset行数"><span>2. 统计ResultSet行数</span></a></h2><p>统计ResultSet中的行数并不直接，因为没有API方法提供这个信息。这是因为<strong>JDBC查询不会立即获取所有结果</strong>。结果行是在我们使用ResultSet.next方法请求时从数据库加载的。</p><p>当我们执行JDBC查询时，我们无法预先知道将有多少结果。相反，我们需要遍历它们，只有在到达结尾时，我们才能确定可用的行数。</p><p>我们有两种方法可以做到这一点，使用标准或可滚动的ResultSet。</p><h2 id="_3-标准resultset" tabindex="-1"><a class="header-anchor" href="#_3-标准resultset"><span>3. 标准ResultSet</span></a></h2><p>统计查询结果的最直接方式是<strong>遍历它们并为每个结果递增计数器变量</strong>。</p><p>让我们创建一个名为StandardRowCounter的类，它接受一个数据库连接作为单一参数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">StandardRowCounter</span> <span class="token punctuation">{</span>
    <span class="token class-name">Connection</span> conn<span class="token punctuation">;</span>

    <span class="token class-name">StandardRowCounter</span><span class="token punctuation">(</span><span class="token class-name">Connection</span> conn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>conn <span class="token operator">=</span> conn<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的类将包含一个单一方法，该方法将接受一个SQL查询作为String，并在遍历ResultSet时，通过为每个结果递增计数器变量来返回行数。</p><p>让我们将我们的计数器方法命名为getQueryRowCount：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">getQueryRowCount</span><span class="token punctuation">(</span><span class="token class-name">String</span> query<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Statement</span> statement <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">createStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token class-name">ResultSet</span> standardRS <span class="token operator">=</span> statement<span class="token punctuation">.</span><span class="token function">executeQuery</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> size <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>standardRS<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            size<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> size<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，我们使用try-with-resources块自动关闭JDBC资源。</p><p>为了测试我们的实现，我们将利用一个内存数据库快速生成一个包含3个条目的表。</p><p>有了这个，让我们创建一个RowCounterApp，它有一个简单的main方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">RowCounterApp</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Connection</span> conn <span class="token operator">=</span> <span class="token function">createDummyDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">String</span> selectQuery <span class="token operator">=</span> <span class="token string">&quot;SELECT * FROM STORAGE&quot;</span><span class="token punctuation">;</span>

        <span class="token class-name">StandardRowCounter</span> standardCounter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StandardRowCounter</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">assert</span> standardCounter<span class="token punctuation">.</span><span class="token function">getQueryRowCount</span><span class="token punctuation">(</span>selectQuery<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token class-name">Connection</span> <span class="token function">createDummyDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述方法<strong>适用于任何数据库</strong>。然而，如果数据库驱动程序支持，我们可以使用一些更高级的API来实现相同的结果。</p><p>通过使用重载的Statement方法createStatement，我们可以在查询执行后请求创建一个可滚动的ResultSet。使用可滚动版本，我们可以使用更高级的遍历方法，如previous向后移动。在我们的情况下，我们将使用last方法移动到ResultSet的末尾，并使用getRow方法获取最后一个条目的行号。</p><p>让我们创建一个ScrollableRowCounter类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ScrollableRowCounter</span> <span class="token punctuation">{</span>
    <span class="token class-name">Connection</span> conn<span class="token punctuation">;</span>

    <span class="token class-name">ScrollableRowCounter</span><span class="token punctuation">(</span><span class="token class-name">Connection</span> conn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>conn <span class="token operator">=</span> conn<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>像我们的StandardRowCounter一样，我们将使用的唯一字段是数据库连接。</p><p>再次，我们将使用getQueryRowCount方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">getQueryRowCount</span><span class="token punctuation">(</span><span class="token class-name">String</span> query<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Statement</span> statement <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">createStatement</span><span class="token punctuation">(</span><span class="token class-name">ResultSet</span><span class="token punctuation">.</span><span class="token constant">TYPE_SCROLL_INSENSITIVE</span><span class="token punctuation">,</span> <span class="token class-name">ResultSet</span><span class="token punctuation">.</span><span class="token constant">CONCUR_READ_ONLY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token class-name">ResultSet</span> scrollableRS <span class="token operator">=</span> statement<span class="token punctuation">.</span><span class="token function">executeQuery</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        scrollableRS<span class="token punctuation">.</span><span class="token function">last</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> scrollableRS<span class="token punctuation">.</span><span class="token function">getRow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要获取可滚动的ResultSet，我们必须向createStatement方法提供ResultSet.TYPE_SCROLL_INSENSITIVE常量。此外，我们必须为并发模式提供值，但由于它与我们的案例无关，我们使用默认的ResultSet.CONCUR_READ_ONLY常量。如果JDBC驱动程序不支持这种操作模式，它将抛出异常。</p><p>让我们使用RowCountApp测试我们的新实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ScrollableRowCounter</span> scrollableCounter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ScrollableRowCounter</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">assert</span> scrollableCounter<span class="token punctuation">.</span><span class="token function">getQueryRowCount</span><span class="token punctuation">(</span>selectQuery<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-性能考虑" tabindex="-1"><a class="header-anchor" href="#_5-性能考虑"><span>5. 性能考虑</span></a></h2><p>尽管上述实现简单，但<strong>它们没有最佳性能</strong>，因为必须遍历ResultSet。因此，通常建议使用COUNT类型查询来执行行数操作。</p><p>一个简单的例子是：</p><p><code>SELECT COUNT(*) FROM STORAGE</code></p><p>这返回一个单行单列，其中包含STORAGE表中的行数。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了获取ResultSet中行数的不同方法。</p><p>如往常一样，本文的源代码可在GitHub上找到。</p>`,35),o=[p];function c(l,u){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-20-Get the Number of Rows in a ResultSet.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Get%20the%20Number%20of%20Rows%20in%20a%20ResultSet.html","title":"获取ResultSet中的行数","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JDBC"],"tag":["ResultSet","行数"],"head":[["meta",{"name":"keywords","content":"Java, JDBC, ResultSet, 行数统计"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Get%20the%20Number%20of%20Rows%20in%20a%20ResultSet.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"获取ResultSet中的行数"}],["meta",{"property":"og:description","content":"获取ResultSet中的行数 在本文中，我们将探讨不同的方法来统计JDBC ResultSet中的行数。 2. 统计ResultSet行数 统计ResultSet中的行数并不直接，因为没有API方法提供这个信息。这是因为JDBC查询不会立即获取所有结果。结果行是在我们使用ResultSet.next方法请求时从数据库加载的。 当我们执行JDBC查询时..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T15:39:55.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ResultSet"}],["meta",{"property":"article:tag","content":"行数"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T15:39:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"获取ResultSet中的行数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T15:39:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"获取ResultSet中的行数 在本文中，我们将探讨不同的方法来统计JDBC ResultSet中的行数。 2. 统计ResultSet行数 统计ResultSet中的行数并不直接，因为没有API方法提供这个信息。这是因为JDBC查询不会立即获取所有结果。结果行是在我们使用ResultSet.next方法请求时从数据库加载的。 当我们执行JDBC查询时..."},"headers":[{"level":2,"title":"2. 统计ResultSet行数","slug":"_2-统计resultset行数","link":"#_2-统计resultset行数","children":[]},{"level":2,"title":"3. 标准ResultSet","slug":"_3-标准resultset","link":"#_3-标准resultset","children":[]},{"level":2,"title":"5. 性能考虑","slug":"_5-性能考虑","link":"#_5-性能考虑","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721489995000,"updatedTime":1721489995000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.03,"words":909},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Get the Number of Rows in a ResultSet.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本文中，我们将探讨不同的方法来<strong>统计JDBC ResultSet中的行数</strong>。</p>\\n<h2>2. 统计ResultSet行数</h2>\\n<p>统计ResultSet中的行数并不直接，因为没有API方法提供这个信息。这是因为<strong>JDBC查询不会立即获取所有结果</strong>。结果行是在我们使用ResultSet.next方法请求时从数据库加载的。</p>\\n<p>当我们执行JDBC查询时，我们无法预先知道将有多少结果。相反，我们需要遍历它们，只有在到达结尾时，我们才能确定可用的行数。</p>\\n<p>我们有两种方法可以做到这一点，使用标准或可滚动的ResultSet。</p>","autoDesc":true}');export{d as comp,k as data};
