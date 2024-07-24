import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-BkL9UgS7.js";const t={},c=e(`<h1 id="使用mockito匹配空值" tabindex="-1"><a class="header-anchor" href="#使用mockito匹配空值"><span>使用Mockito匹配空值</span></a></h1><p>在这个简短的教程中，我们将使用Mockito来检查是否将空值作为参数传递给方法。我们将看到如何直接匹配空值以及如何使用ArgumentMatchers进行匹配。</p><h2 id="_2-示例设置" tabindex="-1"><a class="header-anchor" href="#_2-示例设置"><span>2. 示例设置</span></a></h2><p>首先，我们创建一个简单的Helper类，它有一个单独的concat()方法，返回两个字符串的连接：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Helper</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">concat</span><span class="token punctuation">(</span><span class="token class-name">String</span> a<span class="token punctuation">,</span> <span class="token class-name">String</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们将添加一个Main类。它的methodUnderTest()方法调用concat()来连接字符串&quot;Baeldung&quot;和null：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
    <span class="token class-name">Helper</span> helper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Helper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> <span class="token function">methodUnderTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> helper<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-仅使用确切值" tabindex="-1"><a class="header-anchor" href="#_3-仅使用确切值"><span>3. 仅使用确切值</span></a></h2><p>让我们设置测试类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">MainUnitTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Mock</span>
    <span class="token class-name">Helper</span> helper<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@InjectMocks</span>
    <span class="token class-name">Main</span> main<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@BeforeEach</span>
    <span class="token keyword">void</span> <span class="token function">openMocks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MockitoAnnotations</span><span class="token punctuation">.</span><span class="token function">openMocks</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 添加测试方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们通过@Mock创建了一个模拟的Helper。然后我们通过@InjectMocks将其注入到我们的Main实例中。最后，我们调用MockitoAnnotations.openMocks()来启用Mockito注解。</p><p>我们的目标是编写一个单元测试来验证methodUnderTest()是否委托给concat()。此外，我们希望确保第二个参数是null。让我们保持简单，检查调用的第一个参数是&quot;Baeldung&quot;，而第二个是null：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenMethodUnderTest_thenSecondParameterNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    main<span class="token punctuation">.</span><span class="token function">methodUnderTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span>helper<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们调用Mockito.verify()来检查参数值是否符合预期。</p><h2 id="_4-使用匹配器" tabindex="-1"><a class="header-anchor" href="#_4-使用匹配器"><span>4. 使用匹配器</span></a></h2><p>现在我们将使用Mockito的ArgumentMatchers来检查传递的值。由于第一个值在我们的示例不相关，我们将使用any()匹配器：因此，任何输入都会通过。要检查第二个参数是null，我们可以简单地使用isNull()：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenMethodUnderTest_thenSecondParameterNullWithMatchers</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    main<span class="token punctuation">.</span><span class="token function">methodUnderTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span>helper<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">isNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何使用Mockito验证传递给方法的参数是否为null。我们通过检查确切值和使用ArgumentMatchers来完成这一点。</p><p>和往常一样，代码可以在GitHub上找到。--- date: 2022-04-01 category:</p><ul><li>Mockito</li><li>测试 tag:</li><li>Mockito</li><li>测试 head:</li><li><ul><li>meta</li><li>name: keywords content: Mockito, 测试, Java, 单元测试</li></ul></li></ul><hr><h1 id="使用mockito匹配空值-1" tabindex="-1"><a class="header-anchor" href="#使用mockito匹配空值-1"><span>使用Mockito匹配空值</span></a></h1><p>在这篇简短的教程中，我们将使用Mockito来检查是否将<code>null</code>作为参数传递给方法。我们将看到如何直接匹配<code>null</code>以及如何使用<code>ArgumentMatchers</code>。</p><h2 id="_2-示例设置-1" tabindex="-1"><a class="header-anchor" href="#_2-示例设置-1"><span>2. 示例设置</span></a></h2><p>首先，我们创建一个简单的<code>Helper</code>类，其中包含一个单独的<code>concat()</code>方法，该方法返回两个<code>String</code>的连接：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Helper</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">concat</span><span class="token punctuation">(</span><span class="token class-name">String</span> a<span class="token punctuation">,</span> <span class="token class-name">String</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将添加一个<code>Main</code>类。它的方法<code>methodUnderTest()</code>调用<code>concat()</code>来连接字符串&quot;Baeldung&quot;和<code>null</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
    <span class="token class-name">Helper</span> helper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Helper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> <span class="token function">methodUnderTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> helper<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-仅使用确切值-1" tabindex="-1"><a class="header-anchor" href="#_3-仅使用确切值-1"><span>3. 仅使用确切值</span></a></h2><p>让我们设置测试类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">MainUnitTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Mock</span>
    <span class="token class-name">Helper</span> helper<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@InjectMocks</span>
    <span class="token class-name">Main</span> main<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@BeforeEach</span>
    <span class="token keyword">void</span> <span class="token function">openMocks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MockitoAnnotations</span><span class="token punctuation">.</span><span class="token function">openMocks</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 添加测试方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们通过<code>@Mock</code>创建了一个模拟的<code>Helper</code>。然后我们通过<code>@InjectMocks</code>将其注入到我们的<code>Main</code>实例中。最后，我们调用<code>MockitoAnnotations.openMocks()</code>来启用Mockito注解。</p><p>我们的目标是编写一个单元测试来验证<code>methodUnderTest()</code>是否委托给<code>concat()</code>。此外，我们想要确保第二个参数是<code>null</code>。让我们保持简单，检查调用的第一个参数是&quot;Baeldung&quot;，而第二个是<code>null</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenMethodUnderTest_thenSecondParameterNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    main<span class="token punctuation">.</span><span class="token function">methodUnderTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span>helper<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们调用了<code>Mockito.verify()</code>来检查参数值是否符合预期。</p><h2 id="_4-使用匹配器-1" tabindex="-1"><a class="header-anchor" href="#_4-使用匹配器-1"><span>4. 使用匹配器</span></a></h2><p>现在我们将使用Mockito的<code>ArgumentMatchers</code>来检查传递的值。由于第一个值在我们的示例中不相关，我们将使用<code>any()</code>匹配器：因此，任何输入都会通过。要检查第二个参数是<code>null</code>，我们可以简单地使用<code>isNull()</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenMethodUnderTest_thenSecondParameterNullWithMatchers</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    main<span class="token punctuation">.</span><span class="token function">methodUnderTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span>helper<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">isNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论-1" tabindex="-1"><a class="header-anchor" href="#_5-结论-1"><span>5. 结论</span></a></h2><p>在这篇文章中，我们学习了如何使用Mockito验证传递给方法的参数是否为<code>null</code>。我们通过检查确切值和使用<code>ArgumentMatchers</code>来完成这一点。</p><p>正如往常，代码可以在GitHub上找到。</p><p>OK</p>`,43),o=[c];function p(i,l){return s(),a("div",null,o)}const r=n(t,[["render",p],["__file","2024-07-04-Matching Null With Mockito.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Matching%20Null%20With%20Mockito.html","title":"使用Mockito匹配空值","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Mockito","Testing"],"tag":["Mockito","Testing"],"head":[["meta",{"name":"keywords","content":"Mockito, Testing, Java, Unit Test"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Matching%20Null%20With%20Mockito.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Mockito匹配空值"}],["meta",{"property":"og:description","content":"使用Mockito匹配空值 在这个简短的教程中，我们将使用Mockito来检查是否将空值作为参数传递给方法。我们将看到如何直接匹配空值以及如何使用ArgumentMatchers进行匹配。 2. 示例设置 首先，我们创建一个简单的Helper类，它有一个单独的concat()方法，返回两个字符串的连接： 现在我们将添加一个Main类。它的methodU..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T05:36:20.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Mockito"}],["meta",{"property":"article:tag","content":"Testing"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T05:36:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Mockito匹配空值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T05:36:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Mockito匹配空值 在这个简短的教程中，我们将使用Mockito来检查是否将空值作为参数传递给方法。我们将看到如何直接匹配空值以及如何使用ArgumentMatchers进行匹配。 2. 示例设置 首先，我们创建一个简单的Helper类，它有一个单独的concat()方法，返回两个字符串的连接： 现在我们将添加一个Main类。它的methodU..."},"headers":[{"level":2,"title":"2. 示例设置","slug":"_2-示例设置","link":"#_2-示例设置","children":[]},{"level":2,"title":"3. 仅使用确切值","slug":"_3-仅使用确切值","link":"#_3-仅使用确切值","children":[]},{"level":2,"title":"4. 使用匹配器","slug":"_4-使用匹配器","link":"#_4-使用匹配器","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":2,"title":"2. 示例设置","slug":"_2-示例设置-1","link":"#_2-示例设置-1","children":[]},{"level":2,"title":"3. 仅使用确切值","slug":"_3-仅使用确切值-1","link":"#_3-仅使用确切值-1","children":[]},{"level":2,"title":"4. 使用匹配器","slug":"_4-使用匹配器-1","link":"#_4-使用匹配器-1","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论-1","link":"#_5-结论-1","children":[]}],"git":{"createdTime":1720071380000,"updatedTime":1720071380000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.34,"words":1003},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Matching Null With Mockito.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这个简短的教程中，我们将使用Mockito来检查是否将空值作为参数传递给方法。我们将看到如何直接匹配空值以及如何使用ArgumentMatchers进行匹配。</p>\\n<h2>2. 示例设置</h2>\\n<p>首先，我们创建一个简单的Helper类，它有一个单独的concat()方法，返回两个字符串的连接：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Helper</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">String</span> <span class=\\"token function\\">concat</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> a<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">String</span> b<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> a <span class=\\"token operator\\">+</span> b<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,k as data};
