import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-yRPSFQJx.js";const p={},e=t('<h1 id="java中将stream转换为map或multimap" tabindex="-1"><a class="header-anchor" href="#java中将stream转换为map或multimap"><span>Java中将Stream转换为Map或Multimap</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在Java 8发布之后，Streams成为了Java不可或缺的一部分。它们是处理数据的强大而优雅的手段。因此，有时我们可能需要将流中的元素转换为Map或Multimap。</p><p><strong>在本教程中，我们将深入探讨使用不同的方法和库将Java中的流转换为Map或Multimap的方式。</strong></p><h2 id="_2-将stream转换为map" tabindex="-1"><a class="header-anchor" href="#_2-将stream转换为map"><span>2. 将Stream转换为Map</span></a></h2><h3 id="_2-1-使用collectors-tomap" tabindex="-1"><a class="header-anchor" href="#_2-1-使用collectors-tomap"><span>2.1. 使用Collectors.toMap()</span></a></h3><p>要将流转换为Map，我们可以利用Collectors.toMap()函数。这种收集器指定了键值映射函数，相应地映射流中的每个项目。下面是一个基本示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStringStream_whenConvertingToMapWithMerge_thenExpectedMapIsGenerated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Stream</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` stringStream <span class="token operator">=</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Map</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` mergedMap <span class="token operator">=</span> stringStream<span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span>\n      <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> s<span class="token punctuation">,</span> s <span class="token operator">-&gt;</span> s<span class="token punctuation">,</span> <span class="token punctuation">(</span>s1<span class="token punctuation">,</span> s2<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> s1 <span class="token operator">+</span> <span class="token string">&quot;, &quot;</span> <span class="token operator">+</span> s2<span class="token punctuation">)</span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// 定义预期的Map</span>\n    <span class="token class-name">Map</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` expectedMap <span class="token operator">=</span> <span class="token class-name">Map</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>\n      <span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span>\n      <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two, two&quot;</span><span class="token punctuation">,</span>\n      <span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedMap<span class="token punctuation">,</span> mergedMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述测试方法首先创建了一个字符串流stringStream，然后使用Collectors.toMap()将其放入Map中。<strong>这个函数将每个字符串作为其键和值，用逗号分隔，以合并同一键的多个条目。</strong></p><h3 id="_2-2-使用stream-reduce" tabindex="-1"><a class="header-anchor" href="#_2-2-使用stream-reduce"><span>2.2. 使用Stream.reduce()</span></a></h3><p>我们还可以使用Stream.reduce()操作符。<strong>这种方法可以帮助我们使用一个标识和累积函数将流中的值构建成Map。</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStringStream_whenConvertingToMapWithStreamReduce_thenExpectedMapIsGenerated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Stream</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` stringStream <span class="token operator">=</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Map</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` resultMap <span class="token operator">=</span> stringStream<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span>\n      <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token punctuation">(</span>map<span class="token punctuation">,</span> element<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>element<span class="token punctuation">,</span> element<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> map<span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">(</span>map1<span class="token punctuation">,</span> map2<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        map1<span class="token punctuation">.</span><span class="token function">putAll</span><span class="token punctuation">(</span>map2<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> map1<span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Map</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` expectedMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expectedMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;one&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expectedMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expectedMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedMap<span class="token punctuation">,</span> resultMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，Stream.reduce()操作符遇到同一键的重复值时，它的累积方式与前一节不同。它不是用最后遇到的值覆盖现有值，而是通过为该键创建一个值列表来聚合它们。</p><p>这就是为什么“two”在结果映射中映射到包含两个“two”值的列表，而在2.1节中，它们是用逗号连接的。</p><h2 id="_3-将stream转换为multimap" tabindex="-1"><a class="header-anchor" href="#_3-将stream转换为multimap"><span>3. 将Stream转换为Multimap</span></a></h2><h3 id="_3-1-使用guava的multimap" tabindex="-1"><a class="header-anchor" href="#_3-1-使用guava的multimap"><span>3.1. 使用Guava的Multimap</span></a></h3><p>Google的Guava库中有一个Multimap接口，它将特定的键映射到多个值。首先，我们需要在项目中将其作为依赖项包含进来：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`com.google.guava`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`guava`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`32.1.3-jre`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们使用它将流转换为ListMultimap，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStringStream_whenConvertingToMultimap_thenExpectedMultimapIsGenerated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Stream</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` stringStream <span class="token operator">=</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">ListMultimap</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` multimap <span class="token operator">=</span> stringStream<span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span>\n            <span class="token class-name">ArrayListMultimap</span><span class="token operator">::</span><span class="token function">create</span><span class="token punctuation">,</span>\n            <span class="token punctuation">(</span>map<span class="token punctuation">,</span> element<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>element<span class="token punctuation">,</span> element<span class="token punctuation">)</span><span class="token punctuation">,</span>\n            <span class="token class-name">ArrayListMultimap</span><span class="token operator">::</span><span class="token function">putAll</span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">ListMultimap</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` expectedMultimap <span class="token operator">=</span> <span class="token class-name">ArrayListMultimap</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expectedMultimap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;one&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expectedMultimap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expectedMultimap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expectedMultimap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedMultimap<span class="token punctuation">,</span> multimap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在面的代码中，我们使用ArrayListMultimap::create方法来收集stringStream元素。此外，(map, element) -&gt; map.put(element, element)迭代流元素，将每个元素放入multimap中。这确保了multimap中的键和值都是相同的，保留了重复条目。第三个函数ArrayListMultimap::putAll，如果需要，将多个multimap结果合并为一个。</p><h3 id="_3-2-使用stream-reduce" tabindex="-1"><a class="header-anchor" href="#_3-2-使用stream-reduce"><span>3.2. 使用Stream.reduce()</span></a></h3><p>将流转换为Multimap的另一种方法是在流上应用reduce操作。<strong>这使我们能够通过一个标识值以及一个累积函数来完成转换任务：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStringStream_whenConvertingToMultimapWithStreamReduce_thenExpectedMultimapIsGenerated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Stream</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` stringStream <span class="token operator">=</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````<span class="token operator">&gt;</span> multimap <span class="token operator">=</span> stringStream<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span>\n      <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token punctuation">(</span>map<span class="token punctuation">,</span> element<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n          map<span class="token punctuation">.</span><span class="token function">computeIfAbsent</span><span class="token punctuation">(</span>element<span class="token punctuation">,</span> k <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token keyword">return</span> map<span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">(</span>map1<span class="token punctuation">,</span> map2<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n          map2<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> map1<span class="token punctuation">.</span><span class="token function">merge</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token punctuation">(</span>list1<span class="token punctuation">,</span> list2<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n              list1<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>list2<span class="token punctuation">)</span><span class="token punctuation">;</span>\n              <span class="token keyword">return</span> list1<span class="token punctuation">;</span>\n          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token keyword">return</span> map1<span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````<span class="token operator">&gt;</span> expectedMultimap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expectedMultimap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expectedMultimap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expectedMultimap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span><span class="token string">&quot;three&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>multimap<span class="token punctuation">,</span> expectedMultimap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，通过reduce操作，测试方法将stringStream的元素累积到multimap中，其中每个唯一的字符串都映射到其出现次数的列表中。<strong>我们还使用lambda表达式来处理映射和值的合并，然后通过断言确保转换的正确性。</strong></p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>总结来说，Java流提供了高效的数据处理能力，本教程涵盖了使用Collectors.toMap()、Stream.reduce()和Guava的Multimap将流转换为Map和Multimap的方法。这些方法使我们能够有效地处理Java中的数据，为项目需求提供选择正确方法的灵活性。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p><p>OK</p>',29),o=[e];function c(l,u){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-06-27-Convert a Stream into a Map or Multimap in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Convert%20a%20Stream%20into%20a%20Map%20or%20Multimap%20in%20Java.html","title":"Java中将Stream转换为Map或Multimap","lang":"zh-CN","frontmatter":{"date":"2024-06-28T00:00:00.000Z","category":["Java","编程"],"tag":["Java 8","Streams","Map","Multimap"],"head":[["meta",{"name":"keywords","content":"Java, Stream, Map, Multimap, 数据转换, Baeldung"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Convert%20a%20Stream%20into%20a%20Map%20or%20Multimap%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将Stream转换为Map或Multimap"}],["meta",{"property":"og:description","content":"Java中将Stream转换为Map或Multimap 1. 引言 在Java 8发布之后，Streams成为了Java不可或缺的一部分。它们是处理数据的强大而优雅的手段。因此，有时我们可能需要将流中的元素转换为Map或Multimap。 在本教程中，我们将深入探讨使用不同的方法和库将Java中的流转换为Map或Multimap的方式。 2. 将Str..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T20:29:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"Streams"}],["meta",{"property":"article:tag","content":"Map"}],["meta",{"property":"article:tag","content":"Multimap"}],["meta",{"property":"article:published_time","content":"2024-06-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T20:29:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将Stream转换为Map或Multimap\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T20:29:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将Stream转换为Map或Multimap 1. 引言 在Java 8发布之后，Streams成为了Java不可或缺的一部分。它们是处理数据的强大而优雅的手段。因此，有时我们可能需要将流中的元素转换为Map或Multimap。 在本教程中，我们将深入探讨使用不同的方法和库将Java中的流转换为Map或Multimap的方式。 2. 将Str..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 将Stream转换为Map","slug":"_2-将stream转换为map","link":"#_2-将stream转换为map","children":[{"level":3,"title":"2.1. 使用Collectors.toMap()","slug":"_2-1-使用collectors-tomap","link":"#_2-1-使用collectors-tomap","children":[]},{"level":3,"title":"2.2. 使用Stream.reduce()","slug":"_2-2-使用stream-reduce","link":"#_2-2-使用stream-reduce","children":[]}]},{"level":2,"title":"3. 将Stream转换为Multimap","slug":"_3-将stream转换为multimap","link":"#_3-将stream转换为multimap","children":[{"level":3,"title":"3.1. 使用Guava的Multimap","slug":"_3-1-使用guava的multimap","link":"#_3-1-使用guava的multimap","children":[]},{"level":3,"title":"3.2. 使用Stream.reduce()","slug":"_3-2-使用stream-reduce","link":"#_3-2-使用stream-reduce","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719520148000,"updatedTime":1719520148000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.42,"words":1026},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Convert a Stream into a Map or Multimap in Java.md","localizedDate":"2024年6月28日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在Java 8发布之后，Streams成为了Java不可或缺的一部分。它们是处理数据的强大而优雅的手段。因此，有时我们可能需要将流中的元素转换为Map或Multimap。</p>\\n<p><strong>在本教程中，我们将深入探讨使用不同的方法和库将Java中的流转换为Map或Multimap的方式。</strong></p>\\n<h2>2. 将Stream转换为Map</h2>\\n<h3>2.1. 使用Collectors.toMap()</h3>\\n<p>要将流转换为Map，我们可以利用Collectors.toMap()函数。这种收集器指定了键值映射函数，相应地映射流中的每个项目。下面是一个基本示例：</p>","autoDesc":true}');export{k as comp,m as data};
