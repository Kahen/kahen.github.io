import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BA-MSwOu.js";const p={},e=t('<h1 id="java中对日期字符串进行排序" tabindex="-1"><a class="header-anchor" href="#java中对日期字符串进行排序"><span>Java中对日期字符串进行排序</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在处理包含日期时间字符串格式的数据集时，在许多Java应用程序中，对这些字符串进行排序是一项常见任务。</p><p>在本教程中，我们将探索在Java中有效地对日期字符串进行排序的不同方法。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>我们可以直接按字典顺序对特定日期格式的字符串进行排序，例如ISO日期时间格式（<em>YYYY-MM-dd’T’ HH:mm:ss</em>）。然而，<strong>这不是排序日期字符串的通用解决方案</strong>。</p><p>我们不能对所有日期时间格式应用字典排序操作。例如，假设我们有如下字符串列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` dtStrings <span class="token operator">=</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span>\n  <span class="token string">&quot;01/21/2013 10:41&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;01/20/2013 10:48&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;01/22/2013 15:13&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;01/21/2013 16:37&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;01/21/2013 17:16&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;01/21/2013 17:19&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;01/20/2013 06:16&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;01/22/2013 06:19&quot;</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果列表中的字符串正确排序，结果应该如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` <span class="token constant">EXPECTED</span> <span class="token operator">=</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span>\n  <span class="token string">&quot;01/20/2013 06:16&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;01/20/2013 10:48&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;01/21/2013 10:41&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;01/21/2013 16:37&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;01/21/2013 17:16&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;01/21/2013 17:19&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;01/22/2013 06:19&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;01/22/2013 15:13&quot;</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将探索解决排序问题的不同方法。此外，为了简单起见，我们将使用单元测试断言来验证每种解决方案是否产生了预期结果。</p><p>接下来，让我们看看它们是如何工作的。</p><h2 id="_3-使用自定义-comparator" tabindex="-1"><a class="header-anchor" href="#_3-使用自定义-comparator"><span>3. 使用自定义_Comparator_</span></a></h2><p>Java标准库提供了_Collections.sort()_方法来对集合中的元素进行排序。如果我们想按字典顺序对字符串列表进行排序，我们可以简单地将列表传递给_Collections.sort()_方法。此外，该方法也接受_Comparator_对象作为第二个参数。</p><p>接下来，让我们看看如何使用自定义_Comparator_对日期时间字符串进行排序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">DateFormat</span> dfm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">&quot;MM/dd/yyyy HH:mm&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>dtStrings<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Comparator</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token class-name">String</span> o1<span class="token punctuation">,</span> <span class="token class-name">String</span> o2<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> dfm<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>o1<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>dfm<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>o2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ParseException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">,</span> dtStrings<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，首先，我们根据日期字符串格式创建了一个_SimpleDateFormat_对象。然后，当我们调用_Collections.sort()_方法时，我们将_dtStrings_列表和一个匿名_Comparator_对象一起传递。</p><p>在_compare()_方法实现中，我们<strong>首先将两个日期时间字符串解析为_Date_对象，然后比较两个_Date_对象</strong>。</p><p>如果我们的Java版本是8或更高，我们可以使用强大的lambda表达式进行比较，使我们的代码更紧凑、更易于阅读：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">DateTimeFormatter</span> dfm <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">&quot;MM/dd/yyyy HH:mm&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ndtStrings<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">comparing</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> dfm<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">,</span> dtStrings<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是，<strong>_Collections.sort()_和_list.sort()_方法都支持就地排序</strong>，这意味着<strong>直接修改原始列表，而不需要创建一个新的排序副本</strong>。这在内存效率和性能方面提供了显著的优势。</p><h2 id="_4-使用stream-api" tabindex="-1"><a class="header-anchor" href="#_4-使用stream-api"><span>4. 使用Stream API</span></a></h2><p>此外，要对日期时间字符串列表进行排序，我们可以采取三步方法：</p><ul><li>将_String_元素转换为_LocalDateTime_实例</li><li>对这些_LocalDateTime_对象进行排序</li><li>将_LocalDateTime_对象转换回_String_字符串</li></ul><p>Stream API允许我们方便地处理集合。如果我们用Stream API实现这个想法，_map()_方法可以帮助我们执行转换：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">DateTimeFormatter</span> dfm <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">&quot;MM/dd/yyyy HH:mm&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` sortedList <span class="token operator">=</span> dtStrings<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> dfm<span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">sorted</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>dfm<span class="token operator">::</span><span class="token function">format</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">,</span> sortedList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与_Collections.sort()_和_list.sort()_解决方案不同，这种方法不会改变原始列表。相反，<strong>它返回一个新的列表来保存排序后的字符串</strong>。</p><h2 id="_5-使用-treemap" tabindex="-1"><a class="header-anchor" href="#_5-使用-treemap"><span>5. 使用_TreeMap_</span></a></h2><p>**Java中的_TreeMap_类提供了基于键的自动排序条目。**通过使用这个特性，我们可以轻松地通过创建一个键值对类型为_LocalDateTime_和_String_的_TreeMap_来对日期时间字符串进行排序。</p><p>然后，如果我们从_TreeMap_中取出所有值，例如，使用_treeMap.values()_方法，我们得到排序后的结果。</p><p>接下来，让我们在测试中实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">DateTimeFormatter</span> dfm <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">&quot;MM/dd/yyyy HH:mm&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Map</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` dateFormatMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ndtStrings<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> dateFormatMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> dfm<span class="token punctuation">)</span><span class="token punctuation">,</span> s<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>dateFormatMap<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个解决方案是直接的。然而，它有一个缺点。<strong>由于标准Java _Map_不能有重复的键，重复的日期时间字符串将在排序列表中丢失</strong>。因此，在应用_TreeMap_方法对它们进行排序之前，确保列表不包含重复值是好的。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇文章中，我们探索了对日期字符串进行排序的不同通用解决方案：</p><ul><li>使用自定义_Comparator_的_Collections.sort()<em>和_list.sort</em>（就地排序）</li><li>将字符串转换为日期对象，对对象进行排序，然后将它们转换回日期字符串</li><li>_TreeMap_方法</li></ul><p>像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</p>',37),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-04-Sort Date Strings in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Sort%20Date%20Strings%20in%20Java.html","title":"Java中对日期字符串进行排序","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","日期处理"],"tag":["Java","日期字符串排序"],"head":[["meta",{"name":"keywords","content":"Java, 日期字符串排序, 排序算法"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Sort%20Date%20Strings%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中对日期字符串进行排序"}],["meta",{"property":"og:description","content":"Java中对日期字符串进行排序 1. 概述 在处理包含日期时间字符串格式的数据集时，在许多Java应用程序中，对这些字符串进行排序是一项常见任务。 在本教程中，我们将探索在Java中有效地对日期字符串进行排序的不同方法。 2. 问题介绍 我们可以直接按字典顺序对特定日期格式的字符串进行排序，例如ISO日期时间格式（YYYY-MM-dd’T’ HH:mm..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T10:40:19.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"日期字符串排序"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T10:40:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中对日期字符串进行排序\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T10:40:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中对日期字符串进行排序 1. 概述 在处理包含日期时间字符串格式的数据集时，在许多Java应用程序中，对这些字符串进行排序是一项常见任务。 在本教程中，我们将探索在Java中有效地对日期字符串进行排序的不同方法。 2. 问题介绍 我们可以直接按字典顺序对特定日期格式的字符串进行排序，例如ISO日期时间格式（YYYY-MM-dd’T’ HH:mm..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用自定义_Comparator_","slug":"_3-使用自定义-comparator","link":"#_3-使用自定义-comparator","children":[]},{"level":2,"title":"4. 使用Stream API","slug":"_4-使用stream-api","link":"#_4-使用stream-api","children":[]},{"level":2,"title":"5. 使用_TreeMap_","slug":"_5-使用-treemap","link":"#_5-使用-treemap","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720089619000,"updatedTime":1720089619000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.15,"words":1245},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Sort Date Strings in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在处理包含日期时间字符串格式的数据集时，在许多Java应用程序中，对这些字符串进行排序是一项常见任务。</p>\\n<p>在本教程中，我们将探索在Java中有效地对日期字符串进行排序的不同方法。</p>\\n<h2>2. 问题介绍</h2>\\n<p>我们可以直接按字典顺序对特定日期格式的字符串进行排序，例如ISO日期时间格式（<em>YYYY-MM-dd’T’ HH:mm:ss</em>）。然而，<strong>这不是排序日期字符串的通用解决方案</strong>。</p>\\n<p>我们不能对所有日期时间格式应用字典排序操作。例如，假设我们有如下字符串列表：</p>\\n","autoDesc":true}');export{k as comp,d as data};
