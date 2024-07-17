import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-YddbDb53.js";const t={},p=e(`<p>标题：Spring Boot中使用Caffeine缓存获取所有键</p><hr><p>date: 2024-07-07 category:</p><ul><li>Spring Boot</li><li>Caching tag:</li><li>Caffeine</li><li>Cache</li><li>Spring head:</li><li><ul><li>meta</li><li>name: keywords content: Spring Boot, Caffeine, Cache, Java</li></ul></li></ul><hr><h1 id="spring-boot中使用caffeine缓存获取所有键" tabindex="-1"><a class="header-anchor" href="#spring-boot中使用caffeine缓存获取所有键"><span>Spring Boot中使用Caffeine缓存获取所有键</span></a></h1><p>请注意，由于网络问题，未能成功解析上述链接中的页面内容。上述翻译基于链接标题进行翻译，并未包含页面的具体内容。如果需要进一步的翻译或解析，请确保链接有效并可访问。## 概述</p><p>在本文中，我们将学习如何在Spring的缓存抽象层中使用Caffeine缓存时获取所有缓存键。</p><h2 id="spring缓存" tabindex="-1"><a class="header-anchor" href="#spring缓存"><span>Spring缓存</span></a></h2><p>缓存是Spring框架的一个不可分割的部分。自3.1版本以来，它一直是Spring生态系统的一部分。因此，它有一套定义良好且经过实战测试的接口。</p><p>让我们看看两个主要的接口：<em>CacheManager_和_Cache</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">interface</span> <span class="token class-name">CacheManager</span> <span class="token punctuation">{</span>
    <span class="token class-name">Cache</span> <span class="token function">getCache</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Collection</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">getCacheNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Cache</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Object</span> <span class="token function">getNativeCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ValueWrapper</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    \`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token class-name">T</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">,</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">Class</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\`\`\` type<span class="token punctuation">)</span><span class="token punctuation">;</span>
    \`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token class-name">T</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">,</span> <span class="token class-name">Callable</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\`\`\` valueLoader<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">,</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ValueWrapper</span> <span class="token function">putIfAbsent</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">,</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">evict</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，<em>CacheManager</em> 仅仅是一个包装器。应用程序中可用的缓存区域的注册表。另一方面，<em>Cache</em> 对象是区域内的一组键值对。</p><p><strong>然而，它们都没有提供列出可用键的方法。</strong></p><h2 id="设置" tabindex="-1"><a class="header-anchor" href="#设置"><span>设置</span></a></h2><p>在我们探索访问所有可用键的集合的选项之前，让我们定义我们的测试应用程序使用的_CaffeineCacheManager_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableCaching</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AllKeysConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token class-name">CacheManager</span> <span class="token function">cacheManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CaffeineCacheManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们创建一个慢服务，每次调用时都会填充缓存：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SlowServiceWithCache</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@CachePut</span><span class="token punctuation">(</span>cacheNames <span class="token operator">=</span> <span class="token string">&quot;slowServiceCache&quot;</span><span class="token punctuation">,</span> key <span class="token operator">=</span> <span class="token string">&quot;#name&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> details<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> details<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了管理器和服务，我们就准备在_slowServiceCache_区域中查找键。</p><h2 id="访问所有缓存键" tabindex="-1"><a class="header-anchor" href="#访问所有缓存键"><span>访问所有缓存键</span></a></h2><p>正如我们已经了解到的，<em>CacheManager</em> 没有暴露任何访问所有可用键的方法。<em>Cache</em> 接口也没有。</p><p><strong>因此，我们需要使用我们在应用程序中定义的实际缓存实现的知识。</strong> 让我们将Spring的通用接口转换为适当的_Caffeine_实现。</p><p>我们首先需要注入_CacheManager_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token class-name">CacheManager</span> cacheManager<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后让我们进行一些简单的转换操作以访问原生_Caffeine Cache_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CaffeineCacheManager</span> caffeineCacheManager <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">CaffeineCacheManager</span><span class="token punctuation">)</span> cacheManager<span class="token punctuation">;</span>
<span class="token class-name">CaffeineCache</span> cache <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">CaffeineCache</span><span class="token punctuation">)</span> caffeineCacheManager<span class="token punctuation">.</span><span class="token function">getCache</span><span class="token punctuation">(</span><span class="token string">&quot;slowServiceCache&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Cache</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\` caffeine <span class="token operator">=</span> cache<span class="token punctuation">.</span><span class="token function">getNativeCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们调用_caffeine.asMap()_。因为它是一个映射，我们可以通过调用_caffeine.asMap().keySet()_来简单地访问键：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenCaffeineCacheCachingSlowCalls_whenCacheManagerProperlyCasted_thenAllKeysAreAccessible</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    slowServiceWithCache<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token string">&quot;first&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;some-value-first&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    slowServiceWithCache<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token string">&quot;second&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;other-value-second&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Cache</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\` caffeine <span class="token operator">=</span> <span class="token function">getNativeCaffeineCacheForSlowService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>caffeine<span class="token punctuation">.</span><span class="token function">asMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsOnly</span><span class="token punctuation">(</span><span class="token string">&quot;first&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;second&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们学习了如何访问与Spring缓存一起使用的Caffeine缓存中的所有可用键的集合。了解我们正在处理的实际缓存，访问所有可用键只需要几个简单的转换操作。</p><p>正如往常一样，本文的代码可以在GitHub上找到。</p><p>OK</p>`,33),c=[p];function o(i,l){return s(),a("div",null,c)}const k=n(t,[["render",o],["__file","2024-07-07-Get All Cached Keys with Caffeine Cache in Spring Boot.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Get%20All%20Cached%20Keys%20with%20Caffeine%20Cache%20in%20Spring%20Boot.html","title":"Spring Boot中使用Caffeine缓存获取所有键","lang":"zh-CN","frontmatter":{"description":"标题：Spring Boot中使用Caffeine缓存获取所有键 date: 2024-07-07 category: Spring Boot Caching tag: Caffeine Cache Spring head: meta name: keywords content: Spring Boot, Caffeine, Cache, Java ...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Get%20All%20Cached%20Keys%20with%20Caffeine%20Cache%20in%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Boot中使用Caffeine缓存获取所有键"}],["meta",{"property":"og:description","content":"标题：Spring Boot中使用Caffeine缓存获取所有键 date: 2024-07-07 category: Spring Boot Caching tag: Caffeine Cache Spring head: meta name: keywords content: Spring Boot, Caffeine, Cache, Java ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T06:58:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:modified_time","content":"2024-07-07T06:58:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot中使用Caffeine缓存获取所有键\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-07-07T06:58:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"Spring缓存","slug":"spring缓存","link":"#spring缓存","children":[]},{"level":2,"title":"设置","slug":"设置","link":"#设置","children":[]},{"level":2,"title":"访问所有缓存键","slug":"访问所有缓存键","link":"#访问所有缓存键","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720335486000,"updatedTime":1720335486000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.52,"words":755},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Get All Cached Keys with Caffeine Cache in Spring Boot.md","localizedDate":"2024年7月7日","excerpt":"<p>标题：Spring Boot中使用Caffeine缓存获取所有键</p>\\n<hr>\\n<p>date: 2024-07-07\\ncategory:</p>\\n<ul>\\n<li>Spring Boot</li>\\n<li>Caching\\ntag:</li>\\n<li>Caffeine</li>\\n<li>Cache</li>\\n<li>Spring\\nhead:</li>\\n<li>\\n<ul>\\n<li>meta</li>\\n<li>name: keywords\\ncontent: Spring Boot, Caffeine, Cache, Java</li>\\n</ul>\\n</li>\\n</ul>\\n<hr>\\n<h1>Spring Boot中使用Caffeine缓存获取所有键</h1>","autoDesc":true}');export{k as comp,d as data};
