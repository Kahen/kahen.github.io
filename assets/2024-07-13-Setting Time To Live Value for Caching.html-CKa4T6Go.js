import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-CBerKIce.js";const t={},p=e(`<h1 id="为spring缓存设置生存时间值" tabindex="-1"><a class="header-anchor" href="#为spring缓存设置生存时间值"><span>为Spring缓存设置生存时间值</span></a></h1><p>在这个教程中，我们为一些基本的现实世界例子进行缓存操作。特别是，我们将展示如何配置这种缓存机制使其有时间限制。我们也将这种时间限制称为缓存的生存时间（TTL）。</p><h2 id="_2-spring缓存的配置" tabindex="-1"><a class="header-anchor" href="#_2-spring缓存的配置"><span>2. Spring缓存的配置</span></a></h2><p>之前，我们已经展示了如何使用Spring的@Cacheable注解。同时，缓存的一个实际用例是当一个酒店预订网站的主页频繁被打开时。这意味着提供酒店列表的REST端点经常被请求，导致频繁调用数据库。与直接从内存中提供数据相比，数据库调用较慢。</p><p>首先，我们将创建SpringCachingConfig：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableCaching</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpringCachingConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">CacheManager</span> <span class="token function">cacheManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentMapCacheManager</span><span class="token punctuation">(</span><span class="token string">&quot;hotels&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还需要SpringCacheCustomizer：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpringCacheCustomizer</span> <span class="token keyword">implements</span> <span class="token class-name">CacheManagerCustomizer</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ConcurrentMapCacheManager</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">customize</span><span class="token punctuation">(</span><span class="token class-name">ConcurrentMapCacheManager</span> cacheManager<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        cacheManager<span class="token punctuation">.</span><span class="token function">setCacheNames</span><span class="token punctuation">(</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;hotels&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用-cacheable进行缓存" tabindex="-1"><a class="header-anchor" href="#_3-使用-cacheable进行缓存"><span>3. 使用@Cacheable进行缓存</span></a></h2><p>设置完成后，我们可以利用Spring配置。我们可以通过将Hotel对象存储在内存中来减少REST端点的响应时间。我们在下面的代码片段中使用@Cacheable注解来缓存Hotel对象列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Cacheable</span><span class="token punctuation">(</span><span class="token string">&quot;hotels&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Hotel</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">getAllHotels</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> hotelRepository<span class="token punctuation">.</span><span class="token function">getAllHotels</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-为-cacheable设置ttl" tabindex="-1"><a class="header-anchor" href="#_4-为-cacheable设置ttl"><span>4. 为@Cacheable设置TTL</span></a></h2><p>然而，由于更新、删除或添加，数据库中缓存的Hotel列表可能会随时间变化。我们希望通过设置生存时间间隔（TTL）来刷新缓存，超过这个时间间隔后，现有的缓存条目将被移除，并在上述第3节中方法的第一次调用时重新填充。</p><p>我们可以通过使用@CacheEvict注解来实现这一点。例如，在下面的例子中，我们通过caching.spring.hotelListTTL变量设置TTL：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@CacheEvict</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;hotels&quot;</span><span class="token punctuation">,</span> allEntries <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Scheduled</span><span class="token punctuation">(</span>fixedRateString <span class="token operator">=</span> <span class="token string">&quot;\${caching.spring.hotelListTTL}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">emptyHotelsCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;emptying Hotels cache&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们希望TTL为12小时。以毫秒为单位的值是12 x 3600 x 1000 = 43200000。我们在环境属性中定义这个值。此外，如果我们使用基于属性的环境配置，我们可以如下设置缓存TTL：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">caching.spring.hotelListTTL</span><span class="token punctuation">=</span><span class="token value attr-value">43200000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者，如果我们使用基于YAML的设计，我们可以这样设置：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">caching</span><span class="token punctuation">:</span>
  <span class="token key atrule">spring</span><span class="token punctuation">:</span>
    <span class="token key atrule">hotelListTTL</span><span class="token punctuation">:</span> <span class="token number">43200000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了如何为基于Spring的缓存设置TTL缓存。如常，我们可以在GitHub上找到完整的代码。</p>`,21),c=[p];function o(i,l){return s(),a("div",null,c)}const d=n(t,[["render",o],["__file","2024-07-13-Setting Time To Live Value for Caching.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Setting%20Time%20To%20Live%20Value%20for%20Caching.html","title":"为Spring缓存设置生存时间值","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring","Caching"],"tag":["TTL","Cache","Spring Framework"],"head":[["meta",{"name":"keywords","content":"Spring缓存, TTL设置, 缓存机制"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Setting%20Time%20To%20Live%20Value%20for%20Caching.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"为Spring缓存设置生存时间值"}],["meta",{"property":"og:description","content":"为Spring缓存设置生存时间值 在这个教程中，我们为一些基本的现实世界例子进行缓存操作。特别是，我们将展示如何配置这种缓存机制使其有时间限制。我们也将这种时间限制称为缓存的生存时间（TTL）。 2. Spring缓存的配置 之前，我们已经展示了如何使用Spring的@Cacheable注解。同时，缓存的一个实际用例是当一个酒店预订网站的主页频繁被打开..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T19:03:55.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"TTL"}],["meta",{"property":"article:tag","content":"Cache"}],["meta",{"property":"article:tag","content":"Spring Framework"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T19:03:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"为Spring缓存设置生存时间值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T19:03:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"为Spring缓存设置生存时间值 在这个教程中，我们为一些基本的现实世界例子进行缓存操作。特别是，我们将展示如何配置这种缓存机制使其有时间限制。我们也将这种时间限制称为缓存的生存时间（TTL）。 2. Spring缓存的配置 之前，我们已经展示了如何使用Spring的@Cacheable注解。同时，缓存的一个实际用例是当一个酒店预订网站的主页频繁被打开..."},"headers":[{"level":2,"title":"2. Spring缓存的配置","slug":"_2-spring缓存的配置","link":"#_2-spring缓存的配置","children":[]},{"level":2,"title":"3. 使用@Cacheable进行缓存","slug":"_3-使用-cacheable进行缓存","link":"#_3-使用-cacheable进行缓存","children":[]},{"level":2,"title":"4. 为@Cacheable设置TTL","slug":"_4-为-cacheable设置ttl","link":"#_4-为-cacheable设置ttl","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720897435000,"updatedTime":1720897435000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.08,"words":624},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Setting Time To Live Value for Caching.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这个教程中，我们为一些基本的现实世界例子进行缓存操作。特别是，我们将展示如何配置这种缓存机制使其有时间限制。我们也将这种时间限制称为缓存的生存时间（TTL）。</p>\\n<h2>2. Spring缓存的配置</h2>\\n<p>之前，我们已经展示了如何使用Spring的@Cacheable注解。同时，缓存的一个实际用例是当一个酒店预订网站的主页频繁被打开时。这意味着提供酒店列表的REST端点经常被请求，导致频繁调用数据库。与直接从内存中提供数据相比，数据库调用较慢。</p>\\n<p>首先，我们将创建SpringCachingConfig：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Configuration</span>\\n<span class=\\"token annotation punctuation\\">@EnableCaching</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">SpringCachingConfig</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token annotation punctuation\\">@Bean</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">CacheManager</span> <span class=\\"token function\\">cacheManager</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ConcurrentMapCacheManager</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"hotels\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
