import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CE5go3V-.js";const p={},e=t('<hr><h1 id="java中将两个列表合并为一个map" tabindex="-1"><a class="header-anchor" href="#java中将两个列表合并为一个map"><span>Java中将两个列表合并为一个Map</span></a></h1><p>在Java中工作时，通常需要将两个单独的列表关联起来。换句话说，我们有两个列表，一个包含键，另一个携带值。然后我们想要得到一个_映射_（Map），它将键列表中的每个元素与值列表中的相应元素关联起来。</p><p>在本教程中，我们将探索不同的实现方式。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>像往常一样，我们通过一个例子来理解问题。假设我们有两个列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` <span class="token constant">KEY_LIST</span> <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;Number One&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Number Two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Number Three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Number Four&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Number Five&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">final</span> <span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``` <span class="token constant">VALUE_LIST</span> <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们希望将上述两个列表与一个_映射_关联起来。但首先，让我们初始化一个包含预期键值对的_哈希映射_（HashMap）：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">Map</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` <span class="token constant">EXPECTED_MAP</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>\n    <span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Number One&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Number Two&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Number Three&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Number Four&quot;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Number Five&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，组合两个列表的规则非常简单。接下来，让我们看看如何实现它。</p><h2 id="_3-关于验证的说明" tabindex="-1"><a class="header-anchor" href="#_3-关于验证的说明"><span>3. 关于验证的说明</span></a></h2><p>现在我们已经理解了问题，我们可能意识到给定的两个列表必须包含相同数量的元素，就像_KEY_LIST_和_VALUE_LIST_一样。然而，在实践中，由于我们无法预测我们得到的数据质量，<strong>两个给定的列表可能有不同大小</strong>。如果出现这种情况，我们必须按照要求执行进一步的操作。通常，有两种选择：</p><ul><li>抛出异常并中断关联操作</li><li>将不匹配问题报告为警告，并继续创建_映射_对象以仅包含匹配的元素</li></ul><p>我们可以使用一个简单的_if_检查来实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> size <span class="token operator">=</span> <span class="token constant">KEY_LIST</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token constant">KEY_LIST</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token constant">VALUE_LIST</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 抛出异常或打印警告，并继续使用较小的大小：</span>\n    size <span class="token operator">=</span> <span class="token function">min</span><span class="token punctuation">(</span><span class="token constant">KEY_LIST</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">VALUE_LIST</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// 使用size变量进行进一步处理</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了简单起见，我们将假设两个列表始终具有相同的大小，并在后续的代码示例中省略此验证。此外，我们将使用单元测试断言来验证方法是否返回预期的结果。</p><h2 id="_4-在循环中填充-映射" tabindex="-1"><a class="header-anchor" href="#_4-在循环中填充-映射"><span>4. 在循环中填充_映射_</span></a></h2><p><strong>由于两个输入列表具有相同的大小，我们可以使用单个循环将两个列表与_映射_关联</strong>。接下来，让我们看看如何操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token constant">KEY_LIST</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    result<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token constant">KEY_LIST</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">VALUE_LIST</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_MAP</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上例所示，我们创建了一个新的_哈希映射_（HashMap）称为_result_。然后我们使用_for_循环遍历_KEY_LIST_中的每个元素，并对于每个元素，我们使用相同的索引_i_从_VALUE_LIST_中检索相应的元素。然后，_put()_方法将键值对填充到_result_映射中。</p><h2 id="_5-使用stream-api" tabindex="-1"><a class="header-anchor" href="#_5-使用stream-api"><span>5. 使用Stream API</span></a></h2><p>Stream API提供了许多简洁高效的方式来操作Java集合。接下来，让我们使用Java Stream API来关联两个列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` result <span class="token operator">=</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token constant">KEY_LIST</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">boxed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token constant">KEY_LIST</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">,</span> <span class="token constant">VALUE_LIST</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_MAP</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，_IntStream.range()_方法生成了一个从_0_到_KEY_LIST_大小的整数流。值得一提的是，<strong>_IntStream_是一个原始流</strong>。因此，我们使用_boxed()<em>方法将_IntStream_转换为_Stream<code>&lt;Integer&gt;</code></em>，这允许我们使用_collect()_方法将元素收集到一个_映射_中。</p><h2 id="_6-使用-iterator" tabindex="-1"><a class="header-anchor" href="#_6-使用-iterator"><span>6. 使用_Iterator_</span></a></h2><p>我们已经学习了两种将两个列表关联并得到一个_映射_作为结果的方法。然而，如果我们仔细看看这两种解决方案，我们会发现两种方法都使用了_List.get()_方法。换句话说，<strong>我们在构建关联时调用_List.get(i)_通过索引访问元素</strong>。这称为随机访问。</p><p>如果我们的列表是_ArrayList_，这可能是最常见的情况，数据由数组支持。因此，随机访问是快速的。</p><p>然而，如果我们有两个大的_LinkedList_，通过索引访问元素可能会很慢。这是因为**_LinkedList_需要从列表开头迭代到所需的索引**。</p><p>因此，使用_Iterator_可能是更有效的方式来遍历列表，特别是对于大列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Iterator</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` ik <span class="token operator">=</span> <span class="token constant">KEY_LIST</span><span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Iterator</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``` iv <span class="token operator">=</span> <span class="token constant">VALUE_LIST</span><span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">while</span> <span class="token punctuation">(</span>ik<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> iv<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    result<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>ik<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> iv<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_MAP</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们为每个列表创建了两个_Iterator_对象。然后，我们使用_while_循环同时遍历两个列表，使用每个_Iterator_的_next()_方法检索列表中的下一个元素。对于每对元素，我们将键和值放入结果_哈希映射_中，就像前面的示例一样。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们通过示例学习了三种将两个给定列表合并为映射的方法。</p><p>首先，我们使用_for_循环和基于列表的随机访问解决了问题。然后，我们讨论了当我们的输入是_LinkedList_时，随机访问方法的性能问题。</p><p>最后，我们看到了基于_Iterator_的解决方案，这样无论我们有哪种_列表_实现，都可以有更好的性能。</p><p>像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</p>',36),o=[e];function c(l,u){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-09-Combining Two Lists Into a Map in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Combining%20Two%20Lists%20Into%20a%20Map%20in%20Java.html","title":"Java中将两个列表合并为一个Map","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Map","List"],"head":[["meta",{"name":"keywords","content":"Java, Map, List, Combine"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Combining%20Two%20Lists%20Into%20a%20Map%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将两个列表合并为一个Map"}],["meta",{"property":"og:description","content":"Java中将两个列表合并为一个Map 在Java中工作时，通常需要将两个单独的列表关联起来。换句话说，我们有两个列表，一个包含键，另一个携带值。然后我们想要得到一个_映射_（Map），它将键列表中的每个元素与值列表中的相应元素关联起来。 在本教程中，我们将探索不同的实现方式。 2. 问题介绍 像往常一样，我们通过一个例子来理解问题。假设我们有两个列表：..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T05:40:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Map"}],["meta",{"property":"article:tag","content":"List"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T05:40:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将两个列表合并为一个Map\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T05:40:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将两个列表合并为一个Map 在Java中工作时，通常需要将两个单独的列表关联起来。换句话说，我们有两个列表，一个包含键，另一个携带值。然后我们想要得到一个_映射_（Map），它将键列表中的每个元素与值列表中的相应元素关联起来。 在本教程中，我们将探索不同的实现方式。 2. 问题介绍 像往常一样，我们通过一个例子来理解问题。假设我们有两个列表：..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 关于验证的说明","slug":"_3-关于验证的说明","link":"#_3-关于验证的说明","children":[]},{"level":2,"title":"4. 在循环中填充_映射_","slug":"_4-在循环中填充-映射","link":"#_4-在循环中填充-映射","children":[]},{"level":2,"title":"5. 使用Stream API","slug":"_5-使用stream-api","link":"#_5-使用stream-api","children":[]},{"level":2,"title":"6. 使用_Iterator_","slug":"_6-使用-iterator","link":"#_6-使用-iterator","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720503642000,"updatedTime":1720503642000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.59,"words":1377},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Combining Two Lists Into a Map in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中将两个列表合并为一个Map</h1>\\n<p>在Java中工作时，通常需要将两个单独的列表关联起来。换句话说，我们有两个列表，一个包含键，另一个携带值。然后我们想要得到一个_映射_（Map），它将键列表中的每个元素与值列表中的相应元素关联起来。</p>\\n<p>在本教程中，我们将探索不同的实现方式。</p>\\n<h2>2. 问题介绍</h2>\\n<p>像往常一样，我们通过一个例子来理解问题。假设我们有两个列表：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">List</span>``<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>`` <span class=\\"token constant\\">KEY_LIST</span> <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Arrays</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">asList</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Number One\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Number Two\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Number Three\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Number Four\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Number Five\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">List</span>```<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">&gt;</span></span>``` <span class=\\"token constant\\">VALUE_LIST</span> <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Arrays</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">asList</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">4</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">5</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
