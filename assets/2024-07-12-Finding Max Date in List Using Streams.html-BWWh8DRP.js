import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C6rqSDgP.js";const e={},p=t(`<ul><li></li></ul><h1 id="使用streams查找列表中的最大日期" tabindex="-1"><a class="header-anchor" href="#使用streams查找列表中的最大日期"><span>使用Streams查找列表中的最大日期</span></a></h1><p>在本文中，我们首先创建一个包含日期的对象。然后，我们将看到如何使用_Streams_在这些对象的列表中找到最大日期。</p><h2 id="_2-示例设置" tabindex="-1"><a class="header-anchor" href="#_2-示例设置"><span>2. 示例设置</span></a></h2><p><strong>Java的原始_Date_ API仍然被广泛使用</strong>，因此我们将展示一个使用它的示例。然而，自从Java 8引入了_LocalDate_，并且大多数_Date_方法都被弃用了。因此，<strong>我们还将展示一个使用_LocalDate_的示例。</strong></p><p>首先，让我们创建一个包含单独_Date_属性的基础_Event_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Event</span> <span class="token punctuation">{</span>
    <span class="token class-name">Date</span> date<span class="token punctuation">;</span>

    <span class="token comment">// 构造函数，getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以定义三个_Event_的列表：第一个是今天发生的，第二个是明天发生的，第三个是一周后发生的。<strong>为了给_Date_添加天数，我们将使用Apache Commons的_DateUtils_方法_addDays()_</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Date</span> <span class="token constant">TODAY</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Event</span> <span class="token constant">TODAYS_EVENT</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Event</span><span class="token punctuation">(</span><span class="token constant">TODAY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Date</span> <span class="token constant">TOMORROW</span> <span class="token operator">=</span> <span class="token class-name">DateUtils</span><span class="token punctuation">.</span><span class="token function">addDays</span><span class="token punctuation">(</span><span class="token constant">TODAY</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Event</span> <span class="token constant">TOMORROWS_EVENT</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Event</span><span class="token punctuation">(</span><span class="token constant">TOMORROW</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Date</span> <span class="token constant">NEXT_WEEK</span> <span class="token operator">=</span> <span class="token class-name">DateUtils</span><span class="token punctuation">.</span><span class="token function">addDays</span><span class="token punctuation">(</span><span class="token constant">TODAY</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Event</span> <span class="token constant">NEXT_WEEK_EVENT</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Event</span><span class="token punctuation">(</span><span class="token constant">NEXT_WEEK</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Event</span><span class="token punctuation">&gt;</span></span>\`\`\` events <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token constant">TODAYS_EVENT</span><span class="token punctuation">,</span> <span class="token constant">TOMORROWS_EVENT</span><span class="token punctuation">,</span> <span class="token constant">NEXT_WEEK_EVENT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们的目标是编写一个方法，能够确定_NEXT_WEEK_EVENT_是这个_Event_列表中的最大日期。我们也将使用_LocalDate_而不是_Date_做同样的事情。我们的_LocalEvent_看起来像这样：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LocalEvent</span> <span class="token punctuation">{</span>
    <span class="token class-name">LocalDate</span> date<span class="token punctuation">;</span>

    <span class="token comment">// 构造函数，getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构建_Event_列表更加直接，因为_LocalDate_已经内置了_plusDays()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LocalDate</span> <span class="token constant">TODAY_LOCAL</span> <span class="token operator">=</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">LocalEvent</span> <span class="token constant">TODAY_LOCAL_EVENT</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LocalEvent</span><span class="token punctuation">(</span><span class="token constant">TODAY_LOCAL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">LocalDate</span> <span class="token constant">TOMORROW_LOCAL</span> <span class="token operator">=</span> <span class="token constant">TODAY_LOCAL</span><span class="token punctuation">.</span><span class="token function">plusDays</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">LocalEvent</span> <span class="token constant">TOMORROW_LOCAL_EVENT</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LocalEvent</span><span class="token punctuation">(</span><span class="token constant">TOMORROW_LOCAL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">LocalDate</span> <span class="token constant">NEXT_WEEK_LOCAL</span> <span class="token operator">=</span> <span class="token constant">TODAY_LOCAL</span><span class="token punctuation">.</span><span class="token function">plusWeeks</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">LocalEvent</span> <span class="token constant">NEXT_WEEK_LOCAL_EVENT</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LocalEvent</span><span class="token punctuation">(</span><span class="token constant">NEXT_WEEK_LOCAL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LocalEvent</span><span class="token punctuation">&gt;</span></span>\`\`\` localEvents <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token constant">TODAY_LOCAL_EVENT</span><span class="token punctuation">,</span> <span class="token constant">TOMORROW_LOCAL_EVENT</span><span class="token punctuation">,</span> <span class="token constant">NEXT_WEEK_LOCAL_EVENT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-获取最大日期" tabindex="-1"><a class="header-anchor" href="#_3-获取最大日期"><span>3. 获取最大日期</span></a></h2><p>首先，<strong>我们将使用_Stream API_来流式处理我们的_Event_列表</strong>。然后，我们需要对_Stream_的每个元素应用_Date_ getter。这样，我们将获得一个包含事件日期的_Stream_。<strong>现在我们可以使用_max()<em>函数了。这将根据提供的_Comparator_返回_Stream_中的最大_Date</em>。</strong></p><p><em>Date_类实现了_Comparable<code>&lt;Date&gt;</code></em>。因此，_compareTo()_方法定义了自然日期顺序。简单来说，可以在_max()_中等效地调用以下两个方法：</p><ul><li>_Date_的_compareTo()_可以通过方法引用来引用</li><li>_Comparator_的_naturalOrder()_可以直接使用</li></ul><p>最后，让我们注意，如果给定的_Event_列表为空或为null，我们可以直接返回null。这将确保我们在流式处理列表时不会遇到问题。</p><p>最终的方法看起来像这样：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Date</span> <span class="token function">findMaxDateOf</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Event</span><span class="token punctuation">&gt;</span></span>\`\`\` events<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>events <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> events<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> events<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Event</span><span class="token operator">::</span><span class="token function">getDate</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token class-name">Date</span><span class="token operator">::</span><span class="token function">compareTo</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，使用_naturalOrder()_，它将这样读取：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Date</span> <span class="token function">findMaxDateOf</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Event</span><span class="token punctuation">&gt;</span></span>\`\`\` events<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>events <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> events<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> events<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Event</span><span class="token operator">::</span><span class="token function">getDate</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">naturalOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总之，我们现在可以快速测试我们的方法是否为我们的列表返回了正确的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">NEXT_WEEK</span><span class="token punctuation">,</span> <span class="token function">findMaxDateOf</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token constant">TODAYS_EVENT</span><span class="token punctuation">,</span> <span class="token constant">TOMORROWS_EVENT</span><span class="token punctuation">,</span> <span class="token constant">NEXT_WEEK_EVENT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用_LocalDate_，推理是完全相同的。<em>LocalDate_确实实现了_ChronoLocalDate_接口，它扩展了_Comparable<code>&lt;ChronoLocalDate&gt;</code></em>。因此，_LocalDate_的自然顺序由_ChronoLocalDate_的_compareTo()_方法定义。</p><p>因此，方法可以写成：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LocalDate</span> <span class="token function">findMaxDateOf</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LocalEvent</span><span class="token punctuation">&gt;</span></span>\`\`\` events<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>events <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> events<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> events<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">LocalEvent</span><span class="token operator">::</span><span class="token function">getDate</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token class-name">LocalDate</span><span class="token operator">::</span><span class="token function">compareTo</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，以完全等效的方式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LocalDate</span> <span class="token function">findMaxDateOf</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LocalEvent</span><span class="token punctuation">&gt;</span></span>\`\`\` events<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>events <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> events<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> events<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">LocalEvent</span><span class="token operator">::</span><span class="token function">getDate</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">naturalOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以编写以下测试来确认它的工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">NEXT_WEEK_LOCAL</span><span class="token punctuation">,</span> <span class="token function">findMaxDateOf</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token constant">TODAY_LOCAL_EVENT</span><span class="token punctuation">,</span> <span class="token constant">TOMORROW_LOCAL_EVENT</span><span class="token punctuation">,</span> <span class="token constant">NEXT_WEEK_LOCAL_EVENT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本教程中，我们已经看到了如何在对象列表中获取最大日期。我们使用了_Date_和_LocalDate_对象。</p><p>像往常一样，代码可以在GitHub上找到。</p>`,34),c=[p];function o(l,i){return s(),a("div",null,c)}const r=n(e,[["render",o],["__file","2024-07-12-Finding Max Date in List Using Streams.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Finding%20Max%20Date%20in%20List%20Using%20Streams.html","title":"使用Streams查找列表中的最大日期","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["Java 8","Streams"],"head":[["meta",{"name":"keywords","content":"Java, Date, LocalDate, Max Date, Streams"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Finding%20Max%20Date%20in%20List%20Using%20Streams.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Streams查找列表中的最大日期"}],["meta",{"property":"og:description","content":"使用Streams查找列表中的最大日期 在本文中，我们首先创建一个包含日期的对象。然后，我们将看到如何使用_Streams_在这些对象的列表中找到最大日期。 2. 示例设置 Java的原始_Date_ API仍然被广泛使用，因此我们将展示一个使用它的示例。然而，自从Java 8引入了_LocalDate_，并且大多数_Date_方法都被弃用了。因此，我..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T17:42:20.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"Streams"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T17:42:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Streams查找列表中的最大日期\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T17:42:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Streams查找列表中的最大日期 在本文中，我们首先创建一个包含日期的对象。然后，我们将看到如何使用_Streams_在这些对象的列表中找到最大日期。 2. 示例设置 Java的原始_Date_ API仍然被广泛使用，因此我们将展示一个使用它的示例。然而，自从Java 8引入了_LocalDate_，并且大多数_Date_方法都被弃用了。因此，我..."},"headers":[{"level":2,"title":"2. 示例设置","slug":"_2-示例设置","link":"#_2-示例设置","children":[]},{"level":2,"title":"3. 获取最大日期","slug":"_3-获取最大日期","link":"#_3-获取最大日期","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720806140000,"updatedTime":1720806140000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.03,"words":909},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Finding Max Date in List Using Streams.md","localizedDate":"2022年4月1日","excerpt":"<ul>\\n<li></li>\\n</ul>\\n<h1>使用Streams查找列表中的最大日期</h1>\\n<p>在本文中，我们首先创建一个包含日期的对象。然后，我们将看到如何使用_Streams_在这些对象的列表中找到最大日期。</p>\\n<h2>2. 示例设置</h2>\\n<p><strong>Java的原始_Date_ API仍然被广泛使用</strong>，因此我们将展示一个使用它的示例。然而，自从Java 8引入了_LocalDate_，并且大多数_Date_方法都被弃用了。因此，<strong>我们还将展示一个使用_LocalDate_的示例。</strong></p>\\n<p>首先，让我们创建一个包含单独_Date_属性的基础_Event_对象：</p>","autoDesc":true}');export{r as comp,d as data};
