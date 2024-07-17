import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-YddbDb53.js";const p={},e=t(`<h1 id="将列中的前n个元素转换为数组-baeldung" tabindex="-1"><a class="header-anchor" href="#将列中的前n个元素转换为数组-baeldung"><span>将列中的前n个元素转换为数组 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在Java编程中，无缝操作数据的能力是一项重要技能。我们可能会遇到需要从列表中提取特定数量的元素并将它们存储在数组中的场景。</p><p>在本教程中，我们将探讨从列表中检索前n个元素并将其转换为Java数组的步骤。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>像往常一样，我们通过示例来理解问题。假设我们有一个包含七个字符串的列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` <span class="token constant">INPUT_LIST</span> <span class="token operator">=</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;four&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;five&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;six&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;seven&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> n <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们想要取出前n个元素（这里是5个）并将它们转换为字符串数组。当然，这五个元素应该保留在原始列表中的顺序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;one&quot;, &quot;two&quot;, &quot;three&quot;, &quot;four&quot;, &quot;five&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在本教程中，我们将探索实现我们目标的不同方法。为了简单起见，我们假设给定的n不会大于列表的大小。此外，我们将使用单元测试断言来验证每种方法是否产生了预期的结果。</p><p>接下来，让我们深入代码。</p><h2 id="_3-使用-for-循环" tabindex="-1"><a class="header-anchor" href="#_3-使用-for-循环"><span>3. 使用_for_循环</span></a></h2><p>解决这个问题的一个直接想法是<strong>首先创建一个长度为n的空数组，然后循环遍历列表中的前n个元素，并依次填充准备好的数组</strong>。</p><p>接下来，让我们使用_for_循环来实现这个想法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token constant">INPUT_LIST</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;four&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;five&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码非常容易理解。它完成了工作。</p><p>在我们的示例中，列表是一个_ArrayList_。顾名思义，_ArrayList_是由数组支持的。因此，<strong>_ArrayList_的随机访问复杂度是O(1)</strong>。换句话说，调用_ArrayList_的get(i)方法是高效的。</p><p>然而，并非所有_List_实现都提供O(1)的随机访问。例如，<strong>_LinkedList_总是从第一个节点导航到所需的节点。因此，它的随机访问成本是O(n)</strong>。</p><p>由于我们不是在解决_ArrayList_特定的问题，让我们稍微改进我们的代码。</p><p>由于我们需要从第一个元素迭代到第n个元素，<strong>我们可以使用_Iterator_来获取每个元素，而不是调用_get()_方法来避免随机访问调用</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token class-name">Iterator</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` iterator <span class="token operator">=</span> <span class="token constant">INPUT_LIST</span><span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n <span class="token operator">&amp;&amp;</span> iterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result2<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;four&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;five&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> result2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用-sublist-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-sublist-方法"><span>4. 使用_subList()_方法</span></a></h2><p>我们已经看到了基于_for_循环的解决方案。解决这个问题的另一个想法是将其分为两部分：</p><ul><li>获取前n个元素</li><li>将提取的元素转换为数组</li></ul><p><strong>_List_接口提供了_subList()_方法，允许我们从列表对象中检索连续的元素</strong>。因此，使用_INPUT_LIST.subList(0, n)_很容易完成第一部分。</p><p>我们可以在第二部分以多种方式将列表转换为数组。接下来，让我们看一些示例。</p><p>首先，让我们将一个准备好的数组传递给_List.toArray()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token constant">INPUT_LIST</span><span class="token punctuation">.</span><span class="token function">subList</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;four&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;five&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，如果传递给_toArray()_方法的数组参数有足够的空间容纳列表中的元素，也就是我们的情况中的子列表，<strong>_toArray()_方法用列表元素填充数组</strong>。</p><p>然而，<strong>如果数组参数没有足够的空间容纳列表元素，_toArray()_会分配一个新的数组并携带列表的元素</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result2 <span class="token operator">=</span> <span class="token constant">INPUT_LIST</span><span class="token punctuation">.</span><span class="token function">subList</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;four&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;five&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> result2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上述代码所示，我们没有用n长度分配数组。相反，当我们调用_toArray()_方法时，我们传递“<em>new String[0]</em>”作为参数。结果，_toArray()_创建并返回一个新的数组，由列表的元素填充。</p><p><strong>如果我们使用Java 11或更高版本，我们可以将生成器函数传递给_toArray()_方法</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 仅适用于java 11+</span>
<span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result3 <span class="token operator">=</span> <span class="token constant">INPUT_LIST</span><span class="token punctuation">.</span><span class="token function">subList</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;four&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;five&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> result3<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们只需要为生成器函数创建一个新的数组实例，没有更多。因此，<strong>我们使用了_String[]_构造函数的方法引用作为生成器函数</strong>。</p><h2 id="_5-使用stream-api" tabindex="-1"><a class="header-anchor" href="#_5-使用stream-api"><span>5. 使用Stream API</span></a></h2><p>此外，我们可以使用Stream API来解决问题。<strong>Stream API是Java 8带给我们的一个重要新特性。因此，它仅适用于Java 8或更高版本</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token constant">INPUT_LIST</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">limit</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;four&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;five&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，<strong>我们使用_limit(n)_方法使_Stream_只返回源列表，即INPUT_LIST中的前n个元素</strong>。然后，我们调用_Stream_的_toArray()<em>方法将流对象转换为数组。**类似于Java 11的_List.toArray()</em>，_Stream.toArray()_接受一个生成器函数**。因此，我们再次传递了“<em>String[]::new</em>”到方法中，并得到了预期的数组。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们通过示例探索了从列表中提取前n个元素并将其转换为数组的不同方法。</p><p>如往常一样，示例的完整源代码可在GitHub上找到。</p>`,42),o=[e];function c(u,l){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-01-Get the First n Elements of a List Into an Array.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Get%20the%20First%20n%20Elements%20of%20a%20List%20Into%20an%20Array.html","title":"将列中的前n个元素转换为数组 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","List","Array"],"head":[["meta",{"name":"keywords","content":"Java, List, Array, subList, Stream API"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Get%20the%20First%20n%20Elements%20of%20a%20List%20Into%20an%20Array.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"将列中的前n个元素转换为数组 | Baeldung"}],["meta",{"property":"og:description","content":"将列中的前n个元素转换为数组 | Baeldung 1. 概述 在Java编程中，无缝操作数据的能力是一项重要技能。我们可能会遇到需要从列表中提取特定数量的元素并将它们存储在数组中的场景。 在本教程中，我们将探讨从列表中检索前n个元素并将其转换为Java数组的步骤。 2. 问题介绍 像往常一样，我们通过示例来理解问题。假设我们有一个包含七个字符串的列表..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T17:34:05.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"List"}],["meta",{"property":"article:tag","content":"Array"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T17:34:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"将列中的前n个元素转换为数组 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T17:34:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"将列中的前n个元素转换为数组 | Baeldung 1. 概述 在Java编程中，无缝操作数据的能力是一项重要技能。我们可能会遇到需要从列表中提取特定数量的元素并将它们存储在数组中的场景。 在本教程中，我们将探讨从列表中检索前n个元素并将其转换为Java数组的步骤。 2. 问题介绍 像往常一样，我们通过示例来理解问题。假设我们有一个包含七个字符串的列表..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用_for_循环","slug":"_3-使用-for-循环","link":"#_3-使用-for-循环","children":[]},{"level":2,"title":"4. 使用_subList()_方法","slug":"_4-使用-sublist-方法","link":"#_4-使用-sublist-方法","children":[]},{"level":2,"title":"5. 使用Stream API","slug":"_5-使用stream-api","link":"#_5-使用stream-api","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719855245000,"updatedTime":1719855245000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.54,"words":1362},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Get the First n Elements of a List Into an Array.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在Java编程中，无缝操作数据的能力是一项重要技能。我们可能会遇到需要从列表中提取特定数量的元素并将它们存储在数组中的场景。</p>\\n<p>在本教程中，我们将探讨从列表中检索前n个元素并将其转换为Java数组的步骤。</p>\\n<h2>2. 问题介绍</h2>\\n<p>像往常一样，我们通过示例来理解问题。假设我们有一个包含七个字符串的列表：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">List</span>`<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>` <span class=\\"token constant\\">INPUT_LIST</span> <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Lists</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">newArrayList</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"one\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"two\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"three\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"four\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"five\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"six\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"seven\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">int</span> n <span class=\\"token operator\\">=</span> <span class=\\"token number\\">5</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
