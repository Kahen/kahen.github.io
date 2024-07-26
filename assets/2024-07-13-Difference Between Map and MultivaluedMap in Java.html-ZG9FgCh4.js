import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DpYLEM_u.js";const p={},e=t(`<h1 id="java中map和multivaluedmap的区别" tabindex="-1"><a class="header-anchor" href="#java中map和multivaluedmap的区别"><span>Java中Map和MultivaluedMap的区别</span></a></h1><p>在本教程中，我们将学习Java中Map和MultivaluedMap的区别。但在此之前，让我们看一些例子。</p><h3 id="_2-map的例子" tabindex="-1"><a class="header-anchor" href="#_2-map的例子"><span>2. Map的例子</span></a></h3><p>HashMap实现了Map接口，并且它也允许null值和null键：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenHashMap_whenEquals_thenTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\` map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 将键值对放入我们的map中。</span>
    map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;first&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;third&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 断言语句。最后一个参数是如果断言失败将打印的内容。</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>map<span class="token punctuation">,</span> <span class="token string">&quot;The HashMap is null!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;first&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;The key isn&#39;t mapped to the right value!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;HashMap didn&#39;t accept null as key!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;third&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;HashMap didn&#39;t accept null value!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述单元测试成功通过。正如我们所看到的，每个键都映射到一个确切的值。</p><h3 id="_3-如何将multivaluedmap添加到我们的项目" tabindex="-1"><a class="header-anchor" href="#_3-如何将multivaluedmap添加到我们的项目"><span>3. 如何将MultivaluedMap添加到我们的项目？</span></a></h3><p>在开始使用MultivaluedMap接口及其实现类之前，我们需要添加它的库，Jakarta RESTful WS API，到我们的Maven项目中。为此，我们需要在项目的pom.xml文件中声明一个依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`jakarta.ws.rs\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`jakarta.ws.rs-api\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`3.1.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们已经成功地将库添加到了我们的项目中。</p><h3 id="_4-multivaluedmap的例子" tabindex="-1"><a class="header-anchor" href="#_4-multivaluedmap的例子"><span>4. MultivaluedMap的例子</span></a></h3><p>MultivaluedHashMap实现了MultivaluedMap接口，并且它允许null值和null键：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenMultivaluedHashMap_whenEquals_thenTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">MultivaluedMap</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\` mulmap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MultivaluedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 将键映射到值。</span>
    mulmap<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span><span class="token string">&quot;first&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    mulmap<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 断言语句。最后一个参数是如果断言失败将打印的内容。</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>mulmap<span class="token punctuation">,</span> <span class="token string">&quot;The MultivaluedHashMap is null!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> mulmap<span class="token punctuation">.</span><span class="token function">getFirst</span><span class="token punctuation">(</span><span class="token string">&quot;first&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;The key isn&#39;t mapped to the right values!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> mulmap<span class="token punctuation">.</span><span class="token function">getFirst</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;MultivaluedHashMap didn&#39;t accept null!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述单元测试成功通过。在这里，每个键都映射到一个值的列表，该列表可以包含零个或多个元素。</p><h3 id="_5-差异是什么" tabindex="-1"><a class="header-anchor" href="#_5-差异是什么"><span>5. 差异是什么？</span></a></h3><p>在Java生态系统中，Map和MultivaluedMap都是接口。<strong>差异在于，在Map中，每个键都映射到一个确切的对象。然而，在MultivaluedMap中，我们可以有零个或多个对象与同一个键关联。</strong></p><p>此外，MultivaluedMap是Map的一个子接口，因此它拥有其所有方法以及一些自己的方法。一些实现Map的类包括HashMap、LinkedHashMap、ConcurrentHashMap、WeakHashMap、EnumMap和TreeMap。此外，MultivaluedHashMap是一个同时实现了Map和MultivaluedMap的类。</p><p>例如，<em>addFirst(K key, V value)</em> 是MultivaluedMap的方法之一，它将一个值添加到当前键的值列表的第一个位置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">MultivaluedMap</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` mulmap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MultivaluedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
mulmap<span class="token punctuation">.</span><span class="token function">addFirst</span><span class="token punctuation">(</span><span class="token string">&quot;firstKey&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;firstValue&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>另一方面，<em>getFirst(K key)</em> 获取提供的键的第一个值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> value <span class="token operator">=</span> mulmap<span class="token punctuation">.</span><span class="token function">getFirst</span><span class="token punctuation">(</span><span class="token string">&quot;firstKey&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，<em>addAll(K key, V… newValues)</em> 为当前键的值列表添加多个值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>mulmap<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span><span class="token string">&quot;firstKey&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;secondValue&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;thirdValue&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6-总结" tabindex="-1"><a class="header-anchor" href="#_6-总结"><span>6. 总结</span></a></h3><p>在本文中，我们看到了Map和MultivaluedMap之间的区别。</p><p>如常，完整的源代码可以在GitHub上找到。翻译已经完成，以下是剩余部分：</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,28),l=[e];function o(c,u){return s(),a("div",null,l)}const d=n(p,[["render",o],["__file","2024-07-13-Difference Between Map and MultivaluedMap in Java.html.vue"]]),r=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Difference%20Between%20Map%20and%20MultivaluedMap%20in%20Java.html","title":"Java中Map和MultivaluedMap的区别","lang":"zh-CN","frontmatter":{"date":"2024-07-13T00:00:00.000Z","category":["Java"],"tag":["Map","MultivaluedMap"],"head":[["meta",{"name":"keywords","content":"Java, Map, MultivaluedMap, HashMap, MultivaluedHashMap, 区别"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Difference%20Between%20Map%20and%20MultivaluedMap%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中Map和MultivaluedMap的区别"}],["meta",{"property":"og:description","content":"Java中Map和MultivaluedMap的区别 在本教程中，我们将学习Java中Map和MultivaluedMap的区别。但在此之前，让我们看一些例子。 2. Map的例子 HashMap实现了Map接口，并且它也允许null值和null键： 上述单元测试成功通过。正如我们所看到的，每个键都映射到一个确切的值。 3. 如何将Multivalue..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T01:54:46.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Map"}],["meta",{"property":"article:tag","content":"MultivaluedMap"}],["meta",{"property":"article:published_time","content":"2024-07-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T01:54:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中Map和MultivaluedMap的区别\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2024-07-13T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T01:54:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中Map和MultivaluedMap的区别 在本教程中，我们将学习Java中Map和MultivaluedMap的区别。但在此之前，让我们看一些例子。 2. Map的例子 HashMap实现了Map接口，并且它也允许null值和null键： 上述单元测试成功通过。正如我们所看到的，每个键都映射到一个确切的值。 3. 如何将Multivalue..."},"headers":[{"level":3,"title":"2. Map的例子","slug":"_2-map的例子","link":"#_2-map的例子","children":[]},{"level":3,"title":"3. 如何将MultivaluedMap添加到我们的项目？","slug":"_3-如何将multivaluedmap添加到我们的项目","link":"#_3-如何将multivaluedmap添加到我们的项目","children":[]},{"level":3,"title":"4. MultivaluedMap的例子","slug":"_4-multivaluedmap的例子","link":"#_4-multivaluedmap的例子","children":[]},{"level":3,"title":"5. 差异是什么？","slug":"_5-差异是什么","link":"#_5-差异是什么","children":[]},{"level":3,"title":"6. 总结","slug":"_6-总结","link":"#_6-总结","children":[]}],"git":{"createdTime":1720835686000,"updatedTime":1720835686000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.55,"words":764},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Difference Between Map and MultivaluedMap in Java.md","localizedDate":"2024年7月13日","excerpt":"\\n<p>在本教程中，我们将学习Java中Map和MultivaluedMap的区别。但在此之前，让我们看一些例子。</p>\\n<h3>2. Map的例子</h3>\\n<p>HashMap实现了Map接口，并且它也允许null值和null键：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenHashMap_whenEquals_thenTrue</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">Map</span>``<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">&gt;</span></span>`` map <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">HashMap</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    \\n    <span class=\\"token comment\\">// 将键值对放入我们的map中。</span>\\n    map<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"first\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    map<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    map<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"third\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    \\n    <span class=\\"token comment\\">// 断言语句。最后一个参数是如果断言失败将打印的内容。</span>\\n    <span class=\\"token function\\">assertNotNull</span><span class=\\"token punctuation\\">(</span>map<span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"The HashMap is null!\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> map<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"first\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"The key isn\'t mapped to the right value!\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> map<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"HashMap didn\'t accept null as key!\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> map<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"third\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"HashMap didn\'t accept null value!\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,r as data};
