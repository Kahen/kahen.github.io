import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BEVMBw2k.js";const p={},e=t('<h1 id="java中从hashmap中移除重复值" tabindex="-1"><a class="header-anchor" href="#java中从hashmap中移除重复值"><span>Java中从HashMap中移除重复值</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><em>HashMap</em> 是Java编程中存储和管理键值对的强大工具。然而，有时我们的数据可能在值上包含重复项。</p><p>在本教程中，我们将探讨如何从_HashMap_中移除重复的值。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p><strong>_HashMap_允许多个键具有相同的值</strong>，这在某些场景下使得重复项不可避免。让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` <span class="token function">initDevMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Map</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` devMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    devMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Tom&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Linux&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    devMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Kent&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Linux&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    devMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Bob&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;MacOS&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    devMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;MacOS&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    devMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Peter&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Windows&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    devMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Saajan&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Windows&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    devMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Jan&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Windows&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    devMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Kevin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;FreeBSD&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> devMap<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，<code>initDevMap()</code>方法初始化了一个新的_HashMap_，它包含了开发者名称和他们所使用的操作系统（OS）之间的关联。假设我们想要从映射中移除重复的操作系统名称。那么，<strong>我们将得到一个只包含四个条目的映射。</strong></p><p>一个直接的方法可能是遍历映射，跟踪值，并在发现重复项时删除映射条目。此外，我们可能想要使用_Iterator_来遍历映射并移除条目，以避免_ConcurrentModificationException_。</p><p>然而，在本教程中，我们将学习一种不同的方法。此外，我们将涵盖两种去重场景：</p><ul><li>只要结果只包含唯一值，我们不关心哪些条目被移除。</li><li>对于去重，我们应该遵循特定规则，如保留“A-Z排序”中的第一个/最后一个键，保留最长/最短名称等。</li></ul><h2 id="_3-两次反转映射" tabindex="-1"><a class="header-anchor" href="#_3-两次反转映射"><span>3. 两次反转映射</span></a></h2><p>我们知道**_HashMap_不允许重复的键**。因此，**如果我们将输入映射从“<em>开发者 -&gt; OS</em>”反转为“<em>OS -&gt; 开发者</em>”，相同的操作系统名称将被移除。**然后，我们可以再次反转映射以获得最终结果。</p><p>接下来，让我们实现这个“两次反转”的想法，并检查它是否按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` devMap <span class="token operator">=</span> <span class="token function">initDevMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Map</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` tmpReverseMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Map</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> name <span class="token operator">:</span> devMap<span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    tmpReverseMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>devMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> os <span class="token operator">:</span> tmpReverseMap<span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    result<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>tmpReverseMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>os<span class="token punctuation">)</span><span class="token punctuation">,</span> os<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasSize</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">containsExactlyInAnyOrder</span><span class="token punctuation">(</span><span class="token string">&quot;Windows&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;MacOS&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Linux&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;FreeBSD&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，我们使用两个_for_循环来两次反转映射。然后，我们使用方便的assertj库来验证结果。</p><h2 id="_4-使用stream-api" tabindex="-1"><a class="header-anchor" href="#_4-使用stream-api"><span>4. 使用Stream API</span></a></h2><p>如果我们使用Java 8或更高版本，我们可以使用Stream API来实现“两次反转”的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` devMap <span class="token operator">=</span> <span class="token function">initDevMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Map</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` result <span class="token operator">=</span> devMap<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getValue</span><span class="token punctuation">,</span> <span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getKey</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>keyInMap<span class="token punctuation">,</span> keyNew<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> keyInMap<span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getValue</span><span class="token punctuation">,</span> <span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getKey</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasSize</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">containsExactlyInAnyOrder</span><span class="token punctuation">(</span><span class="token string">&quot;Windows&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;MacOS&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Linux&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;FreeBSD&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基于流的实现比两个_for_循环的实现更加流畅。值得注意的是，<strong>我们使用了_Collector.toMap()_方法来进行反转操作</strong>。第一次反转的目的是移除重复的值。由于我们有重复的值，在键值反转后，我们有键（操作系统名称）冲突。因此，**我们在合并函数中处理键冲突。**此外，由于我们在去重后不关心映射中哪个条目被保留，我们让合并函数返回已经在映射中的键。换句话说，<strong>我们丢弃后来的重复值。</strong></p><h2 id="_5-适应特定的去重需求" tabindex="-1"><a class="header-anchor" href="#_5-适应特定的去重需求"><span>5. 适应特定的去重需求</span></a></h2><p>由于**_HashMap_不保证条目顺序，使用到目前为止的解决方案，我们不能决定去重后哪个条目被保留在映射中。**</p><p>然而，我们可以通过调整合并函数来满足不同的需求。接下来，让我们看一个例子。</p><p>假设我们有一个新的需求：如果多个开发者使用相同的操作系统，**具有最长名称的开发者应该保留在映射中。**所以预期的结果是：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` expected <span class="token operator">=</span> <span class="token class-name">ImmutableMap</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>\n  <span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;MacOS&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;Kent&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Linux&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;Saajan&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Windows&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;Kevin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;FreeBSD&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们看看如何实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` result <span class="token operator">=</span> devMap<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getValue</span><span class="token punctuation">,</span> <span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getKey</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>k1<span class="token punctuation">,</span> k2<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> k1<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> k2<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> k1 <span class="token operator">:</span> k2<span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getValue</span><span class="token punctuation">,</span> <span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getKey</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasSize</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，我们采用了之前的基于流的实现，并且只修改了_toMap()_中的合并函数，以便在发生冲突时返回更长的键。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了使用“两次反转”的方法来移除_HashMap_中的重复值。我们还看到了如何修改_toMap()_的合并函数以适应特定的去重需求。</p><p>一如既往，示例的完整源代码可以在GitHub上找到。</p>',31),o=[e];function c(u,l){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-02-Remove Duplicate Values From HashMap in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Remove%20Duplicate%20Values%20From%20HashMap%20in%20Java.html","title":"Java中从HashMap中移除重复值","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","HashMap"],"tag":["HashMap","Java","去重"],"head":[["meta",{"name":"keywords","content":"Java, HashMap, 去重"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Remove%20Duplicate%20Values%20From%20HashMap%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中从HashMap中移除重复值"}],["meta",{"property":"og:description","content":"Java中从HashMap中移除重复值 1. 概述 HashMap 是Java编程中存储和管理键值对的强大工具。然而，有时我们的数据可能在值上包含重复项。 在本教程中，我们将探讨如何从_HashMap_中移除重复的值。 2. 问题介绍 _HashMap_允许多个键具有相同的值，这在某些场景下使得重复项不可避免。让我们看一个例子： 在上面的例子中，ini..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T05:54:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"HashMap"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"去重"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T05:54:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中从HashMap中移除重复值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T05:54:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中从HashMap中移除重复值 1. 概述 HashMap 是Java编程中存储和管理键值对的强大工具。然而，有时我们的数据可能在值上包含重复项。 在本教程中，我们将探讨如何从_HashMap_中移除重复的值。 2. 问题介绍 _HashMap_允许多个键具有相同的值，这在某些场景下使得重复项不可避免。让我们看一个例子： 在上面的例子中，ini..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 两次反转映射","slug":"_3-两次反转映射","link":"#_3-两次反转映射","children":[]},{"level":2,"title":"4. 使用Stream API","slug":"_4-使用stream-api","link":"#_4-使用stream-api","children":[]},{"level":2,"title":"5. 适应特定的去重需求","slug":"_5-适应特定的去重需求","link":"#_5-适应特定的去重需求","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719899646000,"updatedTime":1719899646000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.79,"words":1138},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Remove Duplicate Values From HashMap in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p><em>HashMap</em> 是Java编程中存储和管理键值对的强大工具。然而，有时我们的数据可能在值上包含重复项。</p>\\n<p>在本教程中，我们将探讨如何从_HashMap_中移除重复的值。</p>\\n<h2>2. 问题介绍</h2>\\n<p><strong>_HashMap_允许多个键具有相同的值</strong>，这在某些场景下使得重复项不可避免。让我们看一个例子：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">Map</span>`````````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>````````` <span class=\\"token function\\">initDevMap</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">Map</span>`````````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>````````` devMap <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">HashMap</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    devMap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Tom\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Linux\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    devMap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Kent\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Linux\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    devMap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Bob\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"MacOS\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    devMap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Eric\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"MacOS\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    devMap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Peter\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Windows\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    devMap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Saajan\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Windows\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    devMap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Jan\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Windows\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    devMap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Kevin\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"FreeBSD\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">return</span> devMap<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
