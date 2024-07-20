import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DfO5Xg_k.js";const p={},e=t('<h1 id="从hashmap获取键和值作为arraylist的值" tabindex="-1"><a class="header-anchor" href="#从hashmap获取键和值作为arraylist的值"><span>从HashMap获取键和值作为ArrayList的值</span></a></h1><p>当我们在Java中操作数据结构时，一个常见的场景是从一个HashMap中提取键和值，并将它们组织成ArrayList。</p><p>在这个快速教程中，我们将探讨实现这一目标的各种实用方法。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>首先，让我们创建一个HashMap对象作为输入示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">HashMap</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` <span class="token constant">DEV_MAP</span><span class="token punctuation">;</span>\n<span class="token keyword">static</span> <span class="token punctuation">{</span>\n    <span class="token constant">DEV_MAP</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">DEV_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Kent&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Linux&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">DEV_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;MacOS&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">DEV_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Kevin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Windows&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">DEV_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Michal&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;MacOS&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">DEV_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Saajan&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Linux&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上述代码所示，我们使用静态块初始化了一个HashMap。该映射包含一些开发人员和他们使用的主要操作系统。</p><p>当讨论从映射中提取键和值列表时，根据不同的具体要求，可能会出现不同的情况。</p><p>一种这样的情况<strong>涉及原始映射中元素_keyList[i]_和_valueList[i]<em>之间的直接关联，给定索引_i</em></strong>。本质上，在原始映射的上下文中，键和值列表中相应索引的元素表现出相关性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map:\n    k1 -&gt; v1\n    k2 -&gt; v2\n    k3 -&gt; v3\n\n索引    :  0,  1,  2\nKeyList  : k1, k2, k3\nValueList: v1, v2, v3\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二种情况相对简单。在这里，我们的目标是从提供的映射中提取一个键列表和一个值列表，而不保留对初始键值对关联的关注。</p><p>本教程将涵盖这两种情况。此外，为了确保清晰和验证，我们将使用单元测试断言来验证每种方法结果的正确性。</p><h2 id="_3-使用hashmap的keyset-和values-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用hashmap的keyset-和values-方法"><span>3. 使用HashMap的keySet()和values()方法</span></a></h2><p>首先，让我们解决更简单的情况：<strong>在不关注元素之间的关联的情况下，从DEV_MAP中获取键和值列表</strong>。</p><p>Map接口提供了两种方法，可以让我们快速解决问题：</p><ul><li>keySet() – 以Set的形式获取映射中的所有键</li><li>values() – 返回所有值作为Collection</li></ul><p><strong>我们可以将Set和Collection传递给ArrayList的构造函数，以获得预期的列表对象</strong>，例如，获取键列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` keyList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token constant">DEV_MAP</span><span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token string">&quot;Kent&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Kevin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Michal&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Saajan&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> keyList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，运行测试很可能会失败。这是因为<strong>HashMap不维护其条目的顺序</strong>。换句话说，列表中元素的顺序无法预测。</p><p>接下来，让我们使用AssertJ的containsExactlyInAnyOrder()来检查元素并忽略它们的顺序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span>keyList<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactlyInAnyOrder</span><span class="token punctuation">(</span><span class="token string">&quot;Kent&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Kevin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Michal&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Saajan&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类似地，我们可以使用Map.values()获取值列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` valueList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token constant">DEV_MAP</span><span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>valueList<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactlyInAnyOrder</span><span class="token punctuation">(</span><span class="token string">&quot;Linux&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;MacOS&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Windows&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;MacOS&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Linux&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们转向另一种情况：获取一个键列表和一个值列表，其中元素_keyList[i]_和_valueList[i]_在映射中保持相关性。</p><p>首先，让我们创建一个方法来验证这两个列表是否符合预期：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">assertKeyAndValueList</span><span class="token punctuation">(</span><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` keyList<span class="token punctuation">,</span> <span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` valueList<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>keyList<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactlyInAnyOrder</span><span class="token punctuation">(</span><span class="token string">&quot;Kent&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Kevin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Michal&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Saajan&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>valueList<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactlyInAnyOrder</span><span class="token punctuation">(</span><span class="token string">&quot;Linux&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;MacOS&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Windows&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;MacOS&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Linux&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> keyList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token constant">DEV_MAP</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsEntry</span><span class="token punctuation">(</span>keyList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span> valueList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上述方法所示，除了验证两个列表应该包含所需的元素外，我们还确保它们在DEV_MAP中的相应元素在相同索引处是关联的。</p><p>解决这个问题的一种方法是<strong>遍历映射的条目，并使用每个条目的键和值填充两个预先初始化的列表</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` keyList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` valueList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` entry <span class="token operator">:</span> <span class="token constant">DEV_MAP</span><span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    keyList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    valueList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token function">assertKeyAndValueList</span><span class="token punctuation">(</span>keyList<span class="token punctuation">,</span> valueList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，测试将通过。因此，这种方法是有效的。</p><p><strong>如果我们使用Java 8或更高版本，我们可以用forEach()调用和lambda表达式替换_for_循环</strong>，以提高代码的可读性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` keyList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` valueList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token constant">DEV_MAP</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n    keyList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    valueList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertKeyAndValueList</span><span class="token punctuation">(</span>keyList<span class="token punctuation">,</span> valueList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span><strong>5. 结论</strong></span></a></h2><p>在本文中，我们首先讨论了问题的两种情况：从HashMap中获取一个键列表和一个值列表。之后，我们探讨了如何在每种情况下解决这个问题。</p><p>如往常一样，示例的完整源代码可在GitHub上找到。</p>',35),o=[e];function c(u,i){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-01-Get Values and Keys as ArrayList From a HashMap.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Get%20Values%20and%20Keys%20as%20ArrayList%20From%20a%20HashMap.html","title":"从HashMap获取键和值作为ArrayList的值","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java Collections","HashMap"],"tag":["Java","ArrayList","HashMap"],"head":[["meta",{"name":"keywords","content":"Java, ArrayList, HashMap, Extract Keys, Extract Values"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Get%20Values%20and%20Keys%20as%20ArrayList%20From%20a%20HashMap.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从HashMap获取键和值作为ArrayList的值"}],["meta",{"property":"og:description","content":"从HashMap获取键和值作为ArrayList的值 当我们在Java中操作数据结构时，一个常见的场景是从一个HashMap中提取键和值，并将它们组织成ArrayList。 在这个快速教程中，我们将探讨实现这一目标的各种实用方法。 2. 问题介绍 首先，让我们创建一个HashMap对象作为输入示例： 如上述代码所示，我们使用静态块初始化了一个HashM..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T16:36:27.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"ArrayList"}],["meta",{"property":"article:tag","content":"HashMap"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T16:36:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从HashMap获取键和值作为ArrayList的值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T16:36:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从HashMap获取键和值作为ArrayList的值 当我们在Java中操作数据结构时，一个常见的场景是从一个HashMap中提取键和值，并将它们组织成ArrayList。 在这个快速教程中，我们将探讨实现这一目标的各种实用方法。 2. 问题介绍 首先，让我们创建一个HashMap对象作为输入示例： 如上述代码所示，我们使用静态块初始化了一个HashM..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用HashMap的keySet()和values()方法","slug":"_3-使用hashmap的keyset-和values-方法","link":"#_3-使用hashmap的keyset-和values-方法","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719851787000,"updatedTime":1719851787000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.49,"words":1047},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Get Values and Keys as ArrayList From a HashMap.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>当我们在Java中操作数据结构时，一个常见的场景是从一个HashMap中提取键和值，并将它们组织成ArrayList。</p>\\n<p>在这个快速教程中，我们将探讨实现这一目标的各种实用方法。</p>\\n<h2>2. 问题介绍</h2>\\n<p>首先，让我们创建一个HashMap对象作为输入示例：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">HashMap</span>``<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>`` <span class=\\"token constant\\">DEV_MAP</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">static</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token constant\\">DEV_MAP</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">HashMap</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token constant\\">DEV_MAP</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Kent\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Linux\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token constant\\">DEV_MAP</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Eric\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"MacOS\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token constant\\">DEV_MAP</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Kevin\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Windows\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token constant\\">DEV_MAP</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Michal\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"MacOS\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token constant\\">DEV_MAP</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Saajan\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Linux\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
