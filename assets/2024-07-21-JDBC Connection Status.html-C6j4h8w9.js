import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-DpYLEM_u.js";const t={},p=e(`<hr><h1 id="jdbc连接状态" tabindex="-1"><a class="header-anchor" href="#jdbc连接状态"><span>JDBC连接状态</span></a></h1><p>在本文中，我们将讨论JDBC连接状态的某些方面。首先，我们将看到连接丢失的最常见原因。然后，我们将学习如何确定连接状态。</p><p>我们还将学习在运行SQL语句之前如何验证连接。</p><p>Connection类负责与数据源通信。连接可能因各种原因丢失：</p><ul><li>数据库服务器宕机</li><li>网络连接问题</li><li>重用已关闭的连接</li></ul><p>在连接丢失上运行任何数据库操作都将导致SQLException。此外，我们可以检查异常以获取有关问题的细节。</p><h3 id="_3-检查连接" tabindex="-1"><a class="header-anchor" href="#_3-检查连接"><span>3. 检查连接</span></a></h3><p>有多种方法可以检查连接。我们将看看这些方法以决定何时使用每种方法。</p><h4 id="_3-1-连接状态" tabindex="-1"><a class="header-anchor" href="#_3-1-连接状态"><span>3.1. 连接状态</span></a></h4><p>我们可以使用isClosed()方法检查Connection状态。使用此方法，不能授予SQL操作。但是，它有助于检查连接是否打开。</p><p>让我们在运行SQL语句之前创建一个状态条件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">runIfOpened</span><span class="token punctuation">(</span><span class="token class-name">Connection</span> connection<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>connection <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>connection<span class="token punctuation">.</span><span class="token function">isClosed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 运行sql语句</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 处理已关闭的连接路径</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-连接验证" tabindex="-1"><a class="header-anchor" href="#_3-2-连接验证"><span>3.2. 连接验证</span></a></h4><p>即使连接已打开，它也可能因上一节中描述的原因而丢失。因此，可能需要在运行任何SQL语句之前验证连接。</p><p>自1.6版本以来，Connection类提供了一个验证方法。首先，它向数据库提交一个验证查询。其次，它使用timeout参数作为操作的阈值。最后，如果操作在timeout内成功，则将连接标记为有效。</p><p>让我们看看如何在运行任何语句之前验证连接：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">runIfValid</span><span class="token punctuation">(</span><span class="token class-name">Connection</span> connection<span class="token punctuation">)</span>
        <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>connection<span class="token punctuation">.</span><span class="token function">isValid</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 运行sql语句</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 处理无效连接</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，timeout为5秒。值为零表示不适用timeout。另一方面，值小于零将抛出SQLException。</p><h4 id="_3-3-自定义验证" tabindex="-1"><a class="header-anchor" href="#_3-3-自定义验证"><span>3.3. 自定义验证</span></a></h4><p>有充分的理由创建自定义验证方法。例如，我们可能正在使用没有验证方法的旧版JDBC。同样，我们的项目可能需要在所有语句之前运行自定义验证查询。</p><p>让我们创建一个方法来运行预定义的验证查询：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isConnectionValid</span><span class="token punctuation">(</span><span class="token class-name">Connection</span> connection<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>connection <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>connection<span class="token punctuation">.</span><span class="token function">isClosed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 运行一个简单的验证查询</span>
            connection<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT 1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 在这里记录一些有用的数据</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，该方法检查连接状态。其次，它尝试运行验证查询并在成功时返回true。最后，如果验证查询无法运行或失败，则返回false。</p><p>现在，我们可以使用自定义验证在运行任何语句之前：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">runIfConnectionValid</span><span class="token punctuation">(</span><span class="token class-name">Connection</span> connection<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isConnectionValid</span><span class="token punctuation">(</span>connection<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 运行sql语句</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 处理无效连接</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，运行一个简单的查询是验证数据库连接性的良好选择。然而，根据目标驱动程序和数据库，<strong>还有许多其他有用的方法</strong>：</p><ul><li>自动提交 - 使用_connection.getAutocommit()<em>和_connection.setAutocommit()</em></li><li>元数据 - 使用_connection.getMetaData()_</li></ul><h3 id="_4-连接池" tabindex="-1"><a class="header-anchor" href="#_4-连接池"><span>4. 连接池</span></a></h3><p>数据库连接在资源方面是昂贵的。**连接池是管理和配置这些连接的好策略。**简而言之，它们可以减少连接生命周期的成本。</p><p>所有Java连接池框架都有自己的连接验证实现。此外，它们大多数使用可参数化的验证查询。</p><p>以下是一些最受欢迎的框架：</p><ul><li>Apache Commons DBCP - validationQuery, validationQueryTimeout</li><li>Hikari CP - connectionTestQuery, validationTimeout</li><li>C3P0 - preferredTestQuery</li></ul><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们了解了JDBC连接状态的基础知识。我们回顾了Connection类的一些有用方法。之后，我们描述了在运行SQL语句之前验证连接的一些替代方法。</p><p>像往常一样，本文中显示的所有代码示例都可以在GitHub上找到。</p>`,36),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","2024-07-21-JDBC Connection Status.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-JDBC%20Connection%20Status.html","title":"JDBC连接状态","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["JDBC","数据库连接"],"tag":["JDBC","数据库连接状态"],"head":[["meta",{"name":"keywords","content":"JDBC, 数据库连接, 连接状态, 连接验证"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-JDBC%20Connection%20Status.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JDBC连接状态"}],["meta",{"property":"og:description","content":"JDBC连接状态 在本文中，我们将讨论JDBC连接状态的某些方面。首先，我们将看到连接丢失的最常见原因。然后，我们将学习如何确定连接状态。 我们还将学习在运行SQL语句之前如何验证连接。 Connection类负责与数据源通信。连接可能因各种原因丢失： 数据库服务器宕机 网络连接问题 重用已关闭的连接 在连接丢失上运行任何数据库操作都将导致SQLExc..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T00:13:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JDBC"}],["meta",{"property":"article:tag","content":"数据库连接状态"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T00:13:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JDBC连接状态\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T00:13:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"JDBC连接状态 在本文中，我们将讨论JDBC连接状态的某些方面。首先，我们将看到连接丢失的最常见原因。然后，我们将学习如何确定连接状态。 我们还将学习在运行SQL语句之前如何验证连接。 Connection类负责与数据源通信。连接可能因各种原因丢失： 数据库服务器宕机 网络连接问题 重用已关闭的连接 在连接丢失上运行任何数据库操作都将导致SQLExc..."},"headers":[{"level":3,"title":"3. 检查连接","slug":"_3-检查连接","link":"#_3-检查连接","children":[]},{"level":3,"title":"4. 连接池","slug":"_4-连接池","link":"#_4-连接池","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721607218000,"updatedTime":1721607218000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.4,"words":1021},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-JDBC Connection Status.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>JDBC连接状态</h1>\\n<p>在本文中，我们将讨论JDBC连接状态的某些方面。首先，我们将看到连接丢失的最常见原因。然后，我们将学习如何确定连接状态。</p>\\n<p>我们还将学习在运行SQL语句之前如何验证连接。</p>\\n<p>Connection类负责与数据源通信。连接可能因各种原因丢失：</p>\\n<ul>\\n<li>数据库服务器宕机</li>\\n<li>网络连接问题</li>\\n<li>重用已关闭的连接</li>\\n</ul>\\n<p>在连接丢失上运行任何数据库操作都将导致SQLException。此外，我们可以检查异常以获取有关问题的细节。</p>\\n<h3>3. 检查连接</h3>","autoDesc":true}');export{r as comp,k as data};
