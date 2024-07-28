import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D4B8YWfq.js";const e={},p=t('<h1 id="将整数列表转换为字符串列表-baeldung" tabindex="-1"><a class="header-anchor" href="#将整数列表转换为字符串列表-baeldung"><span>将整数列表转换为字符串列表 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>自Java 5版本以来，Java一直支持泛型。<strong>Java泛型带给我们的一个好处是类型安全</strong>。例如，当我们声明一个名为_myList_的_List_对象为_List<code>&lt;Integer&gt;</code>_时，我们不能将类型不是_Integer_的元素放入_myList_中。</p><p>然而，当我们使用泛型集合时，我们经常想要将_Collection<code>&lt;TypeA&gt;</code><em>转换为_Collection<code>&lt;TypeB&gt;</code></em>。</p><p>在本教程中，我们将以_List<code>&lt;Integer&gt;</code>_为例，探讨如何将_List<code>&lt;Integer&gt;</code><em>转换为_List<code>&lt;String&gt;</code></em>。</p><h2 id="_2-准备一个-list-integer-对象作为示例" tabindex="-1"><a class="header-anchor" href="#_2-准备一个-list-integer-对象作为示例"><span>2. 准备一个_List<code>&lt;Integer&gt;</code>_对象作为示例</span></a></h2><p>为了简单起见，我们将使用单元测试断言来验证我们的转换是否符合预期。因此，让我们首先初始化一个整数列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```````` <span class="token constant">INTEGER_LIST</span> <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如上所示，我们有七个整数在_INTEGER_LIST_对象中。现在，我们的目标是<strong>将_INTEGER_LIST_中的每个整数元素转换为</strong><em>String</em>，例如，1转换为“1”，2转换为“2”，依此类推。最终结果应等于：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` <span class="token constant">EXPECTED_LIST</span> <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;4&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;5&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;6&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;7&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在本教程中，我们将讨论三种不同的方法来实现这一点：</p><ul><li>使用Java 8的Stream API</li><li>使用Java _for_循环</li><li>使用Guava库</li></ul><p>接下来，让我们看看它们是如何工作的。</p><h2 id="_3-使用java-8-stream的map-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用java-8-stream的map-方法"><span>3. 使用Java 8 Stream的map()方法</span></a></h2><p>Java Stream API在Java 8及更高版本中可用。它提供了许多方便的接口，允许我们轻松地将_Collection_作为流来处理。</p><p>例如，<strong>将_List<code>&lt;TypeA&gt;</code>_转换为_List<code>&lt;TypeB&gt;</code>_的一个典型方法是Stream的map()方法</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>theList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span> <span class="token punctuation">.</span><span class="token punctuation">.</span> 转换逻辑 <span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>那么接下来，让我们看看如何使用_map()_方法将_List<code>&lt;Integer&gt;</code><em>转换为_List<code>&lt;String&gt;</code></em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` result <span class="token operator">=</span> <span class="token constant">INTEGER_LIST</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>i <span class="token operator">-&gt;</span> i<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_LIST</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示的代码示例，我们向_map()_传递了一个lambda表达式，调用每个元素（<em>Integer</em>）的_toString()<em>方法将其转换为_String</em>。</p><p>如果我们运行它，测试将通过。所以，Stream的_map()_方法完成了工作。</p><h2 id="_4-使用-for-循环" tabindex="-1"><a class="header-anchor" href="#_4-使用-for-循环"><span>4. 使用_for_循环</span></a></h2><p>我们已经看到Stream的map()方法可以解决问题。然而，正如我们提到的，Stream API仅在Java 8及更高版本中可用。因此，如果我们使用的是旧版本的Java，我们需要用另一种方式解决问题。</p><p>例如，我们可以通过一个简单的_for_循环来进行转换：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Integer</span> i <span class="token operator">:</span> <span class="token constant">INTEGER_LIST</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_LIST</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码显示，我们首先创建了一个新的_List<code>&lt;String&gt;</code>_对象，<em>result</em>。然后，我们在_for_循环中迭代_List<code>&lt;Integer&gt;</code><em>列表中的元素，将每个_Integer_元素转换为_String</em>，并将其添加到_result_列表中。</p><p>如果我们运行它，测试将通过。</p><h2 id="_5-使用guava库" tabindex="-1"><a class="header-anchor" href="#_5-使用guava库"><span>5. 使用Guava库</span></a></h2><p>由于在处理集合时转换集合的类型是一个相当标准的操作，一些流行的外部库已经提供了实用方法来进行转换。</p><p>在这一部分，我们将使用Guava来展示如何解决问题。</p><p>首先，让我们在_pom.xml_中添Guava库依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`com.google.guava`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`guava`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`31.1-jre`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，我们可以在Maven中央仓库中检查最新版本。</p><p>接下来，我们可以使用Guava的_Lists.transform()_方法来解决问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` result <span class="token operator">=</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">transform</span><span class="token punctuation">(</span><span class="token constant">INTEGER_LIST</span><span class="token punctuation">,</span> <span class="token class-name">Functions</span><span class="token punctuation">.</span><span class="token function">toStringFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_LIST</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>transform()方法对_INTEGER_LIST_中的每个元素应用_toStringFunction()_并返回转换后的列表。</strong></p><p>如果我们运行它，测试将通过。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇短文中，我们学习了三种将_List<code>&lt;Integer&gt;</code>_转换为_List<code>&lt;String&gt;</code>_的方法。<strong>如果我们的Java版本是8+，Stream API将是最直接的转换方法。</strong> 否则，我们可以通过循环或转向外部库，如Guava，来进行转换。</p><p>源代码可在GitHub上找到。</p>',40),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-11-Convert a List of Integers to a List of Strings.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Convert%20a%20List%20of%20Integers%20to%20a%20List%20of%20Strings.html","title":"将整数列表转换为字符串列表 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-11T00:00:00.000Z","category":["Java"],"tag":["编程","转换"],"head":[["meta",{"name":"keywords","content":"Java, List, Integer, String, 转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Convert%20a%20List%20of%20Integers%20to%20a%20List%20of%20Strings.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"将整数列表转换为字符串列表 | Baeldung"}],["meta",{"property":"og:description","content":"将整数列表转换为字符串列表 | Baeldung 1. 概述 自Java 5版本以来，Java一直支持泛型。Java泛型带给我们的一个好处是类型安全。例如，当我们声明一个名为_myList_的_List_对象为_List<Integer>_时，我们不能将类型不是_Integer_的元素放入_myList_中。 然而，当我们使用泛型集合时，我们经常想要将..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T04:01:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"编程"}],["meta",{"property":"article:tag","content":"转换"}],["meta",{"property":"article:published_time","content":"2024-07-11T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T04:01:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"将整数列表转换为字符串列表 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-11T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T04:01:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"将整数列表转换为字符串列表 | Baeldung 1. 概述 自Java 5版本以来，Java一直支持泛型。Java泛型带给我们的一个好处是类型安全。例如，当我们声明一个名为_myList_的_List_对象为_List<Integer>_时，我们不能将类型不是_Integer_的元素放入_myList_中。 然而，当我们使用泛型集合时，我们经常想要将..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 准备一个_List<Integer>_对象作为示例","slug":"_2-准备一个-list-integer-对象作为示例","link":"#_2-准备一个-list-integer-对象作为示例","children":[]},{"level":2,"title":"3. 使用Java 8 Stream的map()方法","slug":"_3-使用java-8-stream的map-方法","link":"#_3-使用java-8-stream的map-方法","children":[]},{"level":2,"title":"4. 使用_for_循环","slug":"_4-使用-for-循环","link":"#_4-使用-for-循环","children":[]},{"level":2,"title":"5. 使用Guava库","slug":"_5-使用guava库","link":"#_5-使用guava库","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720670478000,"updatedTime":1720670478000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.37,"words":1012},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Convert a List of Integers to a List of Strings.md","localizedDate":"2024年7月11日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>自Java 5版本以来，Java一直支持泛型。<strong>Java泛型带给我们的一个好处是类型安全</strong>。例如，当我们声明一个名为_myList_的_List_对象为_List<code>&lt;Integer&gt;</code>_时，我们不能将类型不是_Integer_的元素放入_myList_中。</p>\\n<p>然而，当我们使用泛型集合时，我们经常想要将_Collection<code>&lt;TypeA&gt;</code><em>转换为_Collection<code>&lt;TypeB&gt;</code></em>。</p>\\n","autoDesc":true}');export{d as comp,k as data};
