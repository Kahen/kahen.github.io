import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CbPcg273.js";const e={},p=t('<h1 id="从java-arraylist中获取唯一值的方法" tabindex="-1"><a class="header-anchor" href="#从java-arraylist中获取唯一值的方法"><span>从Java ArrayList中获取唯一值的方法</span></a></h1><p>我们了解到，在Java中，ArrayList可以包含重复的值。 在本快速教程中，我们将探讨几种从Java ArrayList中获取唯一值的技术。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>有时，我们需要从ArrayList中提取唯一值——例如，为了增强数据分析、提高效率或简化进一步处理。 假设我们有一个列表，携带一些操作系统名称：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` <span class="token constant">MY_LIST</span> <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span>\n  <span class="token string">&quot;Microsoft Windows&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;Mac OS&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;GNU Linux&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;Free BSD&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;GNU Linux&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;Mac OS&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们从数组初始化了MY_LIST ArrayList。我们的目标是<strong>从MY_LIST中获取唯一的操作系统名称列表</strong>。 我们将讨论解决这个问题的两种不同方法。为了简单起见，我们将使用单元测试和AssertJ断言来验证每种方法是否产生预期的结果。 接下来，让我们看看它们是如何工作的。</p><h2 id="_3-使用set消除重复元素" tabindex="-1"><a class="header-anchor" href="#_3-使用set消除重复元素"><span>3. 使用Set消除重复元素</span></a></h2><p>Set和List接口之间的一个重要区别是，<strong>Set不能持有重复元素</strong>。因此，要获取MY_LIST的唯一元素，我们可以<strong>首先将MY_LIST转换为Set，然后将Set转换回List</strong>。 让我们创建一个测试来看看这是如何工作的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token constant">MY_LIST</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactlyInAnyOrder</span><span class="token punctuation">(</span><span class="token string">&quot;Free BSD&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Microsoft Windows&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Mac OS&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;GNU Linux&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>敏锐的眼睛可能已经注意到我们使用了AssertJ的containsExactlyInAnyOrder()方法进行验证。这是因为我们将MY_LIST转换为HashSet，而<strong>HashSet不维护插入顺序</strong>。</p><p><strong>当需要保留插入顺序时，我们可以转而将列表转换为LinkedHashSet</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LinkedHashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token constant">MY_LIST</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span><span class="token string">&quot;Microsoft Windows&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Mac OS&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;GNU Linux&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Free BSD&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，这次我们使用了containsExactly()方法来验证结果。它不仅检查元素值，还检查它们的顺序。</p><h2 id="_4-使用stream-api" tabindex="-1"><a class="header-anchor" href="#_4-使用stream-api"><span>4. 使用Stream API</span></a></h2><p>Stream API是Java 8的一个重大新特性。它允许我们处理一组元素。 要从流中删除重复项，我们可以简单地调用distinct()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` result <span class="token operator">=</span> <span class="token constant">MY_LIST</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">distinct</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span><span class="token string">&quot;Microsoft Windows&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Mac OS&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;GNU Linux&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Free BSD&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们运行测试时，测试通过。</p><p>值得一提的是，<strong>Collectors.toList()总是保留流的原始顺序</strong>，除非我们将流转换为无序模式，例如，通过调用unordered()或使用Collectors.toSet()将其转换为HashSet。因此，我们使用containsExactly()方法来验证结果列表。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>从列表中获取唯一值是Java开发中的一个常见需求。在本文中，我们深入探讨了解决这个问题的两种方法：</p><ul><li>将List转换为Set，然后将Set转换回List</li><li>使用Stream API的distinct()功能 通过全面的例子，我们展示了如何有效地从列表中提取不同的元素。 此外，我们还讨论了保持结果列表中元素顺序的方法，使其与原始输入列表对齐。 像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</li></ul>',21),o=[p];function c(i,l){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-04-Get Unique Values From an ArrayList in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Get%20Unique%20Values%20From%20an%20ArrayList%20in%20Java.html","title":"从Java ArrayList中获取唯一值的方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Collections"],"tag":["ArrayList","Set","Stream API"],"head":[["meta",{"name":"keywords","content":"Java, ArrayList, unique values, Set, Stream API"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Get%20Unique%20Values%20From%20an%20ArrayList%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从Java ArrayList中获取唯一值的方法"}],["meta",{"property":"og:description","content":"从Java ArrayList中获取唯一值的方法 我们了解到，在Java中，ArrayList可以包含重复的值。 在本快速教程中，我们将探讨几种从Java ArrayList中获取唯一值的技术。 2. 问题介绍 有时，我们需要从ArrayList中提取唯一值——例如，为了增强数据分析、提高效率或简化进一步处理。 假设我们有一个列表，携带一些操作系统名称..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T16:56:11.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ArrayList"}],["meta",{"property":"article:tag","content":"Set"}],["meta",{"property":"article:tag","content":"Stream API"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T16:56:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从Java ArrayList中获取唯一值的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T16:56:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从Java ArrayList中获取唯一值的方法 我们了解到，在Java中，ArrayList可以包含重复的值。 在本快速教程中，我们将探讨几种从Java ArrayList中获取唯一值的技术。 2. 问题介绍 有时，我们需要从ArrayList中提取唯一值——例如，为了增强数据分析、提高效率或简化进一步处理。 假设我们有一个列表，携带一些操作系统名称..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用Set消除重复元素","slug":"_3-使用set消除重复元素","link":"#_3-使用set消除重复元素","children":[]},{"level":2,"title":"4. 使用Stream API","slug":"_4-使用stream-api","link":"#_4-使用stream-api","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720112171000,"updatedTime":1720112171000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.65,"words":795},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Get Unique Values From an ArrayList in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>我们了解到，在Java中，ArrayList可以包含重复的值。\\n在本快速教程中，我们将探讨几种从Java ArrayList中获取唯一值的技术。</p>\\n<h2>2. 问题介绍</h2>\\n<p>有时，我们需要从ArrayList中提取唯一值——例如，为了增强数据分析、提高效率或简化进一步处理。\\n假设我们有一个列表，携带一些操作系统名称：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">List</span>```<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>``` <span class=\\"token constant\\">MY_LIST</span> <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Arrays</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">asList</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token string\\">\\"Microsoft Windows\\"</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token string\\">\\"Mac OS\\"</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token string\\">\\"GNU Linux\\"</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token string\\">\\"Free BSD\\"</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token string\\">\\"GNU Linux\\"</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token string\\">\\"Mac OS\\"</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
