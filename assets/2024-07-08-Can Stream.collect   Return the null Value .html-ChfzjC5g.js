import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CJGTm_7y.js";const p={},e=t('<h1 id="stream-collect-可以返回-null-值吗" tabindex="-1"><a class="header-anchor" href="#stream-collect-可以返回-null-值吗"><span>Stream.collect() 可以返回 null 值吗？</span></a></h1><p>在Java 8中引入的一个显著新特性是Stream API。它还附带了一系列的_收集器_（Collectors），允许我们调用_Stream.collect()<em>方法将流中的元素收集到所需的集合中，比如_List</em>、<em>Set</em>、_Map_等。</p><p>在本教程中，我们将讨论_collect()_方法是否可以返回_null_值。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>“Stream的_collect()_方法可以返回_null_吗？”这个问题有两个含义：</p><ul><li>当我们使用标准收集器时，是否需要对_null_进行检查？</li><li>如果我们真的希望_collect()<em>方法返回_null</em>，是否可能？</li></ul><p>我们的讨论将涵盖这两个视角。</p><p>首先，让我们创建一个字符串列表作为稍后演示的输入数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` <span class="token constant">LANGUAGES</span> <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;Kotlin&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">&quot;Java&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Python&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Rust&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如我们所见，列表_LANGUAGES_包含六个字符串元素。值得一提的是，列表中有两个元素是_null_值。</p><p>稍后，我们将使用这个列表作为输入构建流。同样，为了简单起见，我们将使用单元测试断言来验证_collect()_方法调用是否返回_null_值。</p><h2 id="_3-标准库附带的-收集器-不会返回-null" tabindex="-1"><a class="header-anchor" href="#_3-标准库附带的-收集器-不会返回-null"><span>3. 标准库附带的_收集器_不会返回_null_</span></a></h2><p>我们知道Java Stream API引入了一套标准收集器。首先，让我们看看标准收集器是否可以返回_null_。</p><h3 id="_3-1-null-元素不会导致-collect-方法返回-null" tabindex="-1"><a class="header-anchor" href="#_3-1-null-元素不会导致-collect-方法返回-null"><span>3.1. _null_元素不会导致_collect()<em>方法返回_null</em></span></a></h3><p>如果流包含_null_元素，<strong>它们将作为_null_值包含在_collect()_操作的结果中，而不是导致_collect()<em>方法本身返回_null</em></strong>。让我们编写一个小测试来验证它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` result <span class="token operator">=</span> <span class="token constant">LANGUAGES</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token operator">::</span><span class="token function">isNull</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertNotNull</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上述测试所示，我们首先使用_filter()_方法仅获取_null_元素。然后，我们将过滤后的_null_值收集到一个列表中。结果表明，这两个_null_元素成功地收集在结果列表中。因此，<strong>流中的_null_元素不会导致_collect()<em>方法返回_null</em></strong>。</p><h3 id="_3-2-空流不会导致-collect-方法返回-null" tabindex="-1"><a class="header-anchor" href="#_3-2-空流不会导致-collect-方法返回-null"><span>3.2. 空流不会导致_collect()<em>方法返回_null</em></span></a></h3><p><strong>即使流为空，使用标准收集器时，Java Stream API的_collect()<em>方法也不会返回_null</em></strong>。</p><p>假设要收集的流为空。在这种情况下，<em>collect()<em>方法将返回一个空的结果容器，比如一个空的_List</em>、一个空的_Map_或一个空的_array</em>，具体取决于_collect()_方法中使用的收集器。</p><p>接下来，让我们用三个常用的收集器来验证这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` result <span class="token operator">=</span> <span class="token constant">LANGUAGES</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> s <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertNotNull</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Map</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` result2 <span class="token operator">=</span> <span class="token constant">LANGUAGES</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> s <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">toMap</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Function</span><span class="token punctuation">.</span><span class="token function">identity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertNotNull</span><span class="token punctuation">(</span>result2<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>result2<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">,</span> <span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````<span class="token operator">&gt;</span> result3 <span class="token operator">=</span> <span class="token constant">LANGUAGES</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> s <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">groupingBy</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertNotNull</span><span class="token punctuation">(</span>result3<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>result3<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述测试中，_filter(s -&gt; s != null &amp;&amp; s.length() == 1)<em>方法将返回一个空流，因为没有元素符合条件。然后，我们可以看到_toList()</em>、_toMap()_和_groupingBy()<em>收集器不会返回_null</em>。相反，它们生成了一个空的列表或映射作为它们的结果。</p><p><strong>所以，所有标准收集器都不会返回_null_</strong>。</p><h2 id="_4-是否可能使-stream-collect-方法返回-null" tabindex="-1"><a class="header-anchor" href="#_4-是否可能使-stream-collect-方法返回-null"><span>4. 是否可能使_Stream.collect()<em>方法返回_null</em>？</span></a></h2><p>我们已经了解到标准收集器不会使_collect()<em>方法返回_null</em>。那么现在，让我们转到问题，如果我们希望_Stream.collect()<em>方法返回_null</em>，是否可能？简短的答案是：是的。</p><p>接下来，让我们看看如何做到这一点。</p><h3 id="_4-1-创建自定义收集器" tabindex="-1"><a class="header-anchor" href="#_4-1-创建自定义收集器"><span>4.1. 创建自定义收集器</span></a></h3><p>标准收集器不会返回_null_。因此，_Stream.collect()<em>方法也不会返回_null</em>。然而，<strong>如果我们能够创建一个返回可空结果的自定义收集器，Stream.collect()<em>也可能返回_null</em></strong>。</p><p>Stream API提供了静态_Collector.of()_方法，允许我们创建自定义收集器。_Collector.of()_方法接受四个参数：</p><ul><li>一个_Supplier_函数 - 为collect操作返回一个可变的容器。</li><li>一个累加器函数 - 修改可变容器以包含当前元素。</li><li>一个组合器函数 - 当流以并行方式处理时，将中间结果合并到单个最终结果容器中。</li><li>一个可选的整理器函数 - 取得可变结果容器，并在返回collect操作的最终结果之前对其进行所需的最终转换。</li></ul><p>我们应该注意到，最后一个参数，整理器函数是可选的。这是因为许多收集器可以简单地使用可变容器作为最终结果。然而，<strong>我们可以利用这个整理器函数要求收集器返回一个可空的容器</strong>。</p><p>接下来，让我们创建一个名为_emptyListToNullCollector_的自定义收集器。顾名思义，我们希望收集器的工作方式与标准的_toList()_收集器几乎相同，只是当结果列表为空时，收集器将返回_null_而不是空列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Collector</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">ArrayList</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````<span class="token punctuation">,</span> <span class="token class-name">ArrayList</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````<span class="token operator">&gt;</span> emptyListToNullCollector <span class="token operator">=</span> <span class="token class-name">Collector</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">,</span> <span class="token class-name">ArrayList</span><span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n    a<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> a<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> a <span class="token operator">-&gt;</span> a<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们用_LANGUAGES_输入测试我们的_emptyListToNullCollector_收集器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` notNullResult <span class="token operator">=</span> <span class="token constant">LANGUAGES</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token operator">::</span><span class="token function">isNull</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span>emptyListToNullCollector<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertNotNull</span><span class="token punctuation">(</span>notNullResult<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">,</span> notNullResult<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` nullResult <span class="token operator">=</span> <span class="token constant">LANGUAGES</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> s <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span>emptyListToNullCollector<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertNull</span><span class="token punctuation">(</span>nullResult<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在上面的测试中看到的，当流不为空时，我们的_emptyListToNullCollector_的工作方式与标准的_toList()_收集器相同。但如果流为空，它返回_null_而不是空列表。</p><h3 id="_4-2-使用-collectingandthen-方法" tabindex="-1"><a class="header-anchor" href="#_4-2-使用-collectingandthen-方法"><span>4.2. 使用_collectingAndThen()_方法</span></a></h3><p>Java Stream API提供了_collectingAndThen()_方法。<strong>这个方法允许我们对收集器的结果应用一个整理函数</strong>。它接受两个参数：</p><ul><li>一个收集器对象 - 例如，标准的_toList()_</li><li>一个整理函数 - 取得collect操作的结果，并在返回流操作的结果之前对其进行任何最终转换</li></ul><p>例如，我们可以使用_collectingAndThen()_函数使返回的列表不可修改：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` notNullResult <span class="token operator">=</span> <span class="token constant">LANGUAGES</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token operator">::</span><span class="token function">nonNull</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">collectingAndThen</span><span class="token punctuation">(</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Collections</span><span class="token operator">::</span><span class="token function">unmodifiableList</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertNotNull</span><span class="token punctuation">(</span>notNullResult<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;Kotlin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Java&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Python&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Rust&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> notNullResult<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// 结果列表变为不可变</span>\n<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> notNullResult<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Oops&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们刚刚学习了如何使用_Collector.of()<em>创建自定义收集器。这种方法允许我们自由地实现收集逻辑。此外，我们知道如果整理器函数参数返回_null</em>，_Stream.collect(ourCustomCollector)<em>也可以返回_null</em>。</p><p>如果我们想要通过添加整理器函数来扩展标准收集器，我们也可以使用方法_collectingAndThen()_。它比创建自定义收集器更简单。</p><p>接下来，让我们使用_collectingAndThen()_方法实现_emptyListToNullCollector_的功能：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` nullResult <span class="token operator">=</span> <span class="token constant">LANGUAGES</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> s <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">collectingAndThen</span><span class="token punctuation">(</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> strings <span class="token operator">-&gt;</span> strings<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> strings<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertNull</span><span class="token punctuation">(</span>nullResult<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过使用_collectingAndThen()_方法和整理器函数，我们可以看到_Stream.collect()<em>方法在流为空时返回_null</em>。</p><h3 id="_4-3-关于可空-收集器-的说明" tabindex="-1"><a class="header-anchor" href="#_4-3-关于可空-收集器-的说明"><span>4.3. 关于可空_收集器_的说明</span></a></h3><p>我们已经看到了两种方法使收集器返回_null_，以便_Stream.collect()<em>也返回_null</em>。然而，我们可能需要三思是否必须使收集器可空。</p><p>通常，<strong>除非有充分的理由，否则避免使用可空收集器被认为是一个好的实践</strong>。这是因为_null_值可能会引入意外的行为，使代码的行为更难以理解。<strong>如果使用了可空收集器，重要的是确保它的使用是一致的，并且任何下游处理都能够适当地处理_null_值</strong>。</p><p>因此，所有标准收集器都不会返回_null_。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了_Stream.collect()<em>是否可以返回_null</em>。</p><p>我们已经了解到所有标准收集器都不会返回_null_。此外，如果需要，我们可以使用_Collector.of()_或collectingAndThen()_使_Stream.collect()<em>返回_null</em>。然而，一般而言，我们应避免使用可空收集器，除非我们确实需要这么做。</p><p>正如往常，这里展示的所有代码片段都可以在GitHub上找到。</p><p><a href="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" target="_blank" rel="noopener noreferrer">Baeldung Logo</a><a href="https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&amp;r=g" target="_blank" rel="noopener noreferrer">Gravatar</a><a href="https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg" target="_blank" rel="noopener noreferrer">Eric Martin</a><a href="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" target="_blank" rel="noopener noreferrer">Announcement</a><a href="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" target="_blank" rel="noopener noreferrer">REST API</a><a href="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" target="_blank" rel="noopener noreferrer">RSS Feed</a></p><p>OK</p>',57),l=[e];function o(c,u){return a(),s("div",null,l)}const k=n(p,[["render",o],["__file","2024-07-08-Can Stream.collect   Return the null Value .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Can%20Stream.collect%20%20%20Return%20the%20null%20Value%20.html","title":"Stream.collect() 可以返回 null 值吗？","lang":"zh-CN","frontmatter":{"date":"2024-07-08T00:00:00.000Z","category":["Java","Stream API"],"head":[["meta",{"name":"keywords","content":"Java, Stream API, collect, null, 空值处理"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Can%20Stream.collect%20%20%20Return%20the%20null%20Value%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Stream.collect() 可以返回 null 值吗？"}],["meta",{"property":"og:description","content":"Stream.collect() 可以返回 null 值吗？ 在Java 8中引入的一个显著新特性是Stream API。它还附带了一系列的_收集器_（Collectors），允许我们调用_Stream.collect()方法将流中的元素收集到所需的集合中，比如_List、Set、_Map_等。 在本教程中，我们将讨论_collect()_方法是否可以..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T11:59:57.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:published_time","content":"2024-07-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T11:59:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Stream.collect() 可以返回 null 值吗？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-08T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T11:59:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Stream.collect() 可以返回 null 值吗？ 在Java 8中引入的一个显著新特性是Stream API。它还附带了一系列的_收集器_（Collectors），允许我们调用_Stream.collect()方法将流中的元素收集到所需的集合中，比如_List、Set、_Map_等。 在本教程中，我们将讨论_collect()_方法是否可以..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 标准库附带的_收集器_不会返回_null_","slug":"_3-标准库附带的-收集器-不会返回-null","link":"#_3-标准库附带的-收集器-不会返回-null","children":[{"level":3,"title":"3.1. _null_元素不会导致_collect()方法返回_null","slug":"_3-1-null-元素不会导致-collect-方法返回-null","link":"#_3-1-null-元素不会导致-collect-方法返回-null","children":[]},{"level":3,"title":"3.2. 空流不会导致_collect()方法返回_null","slug":"_3-2-空流不会导致-collect-方法返回-null","link":"#_3-2-空流不会导致-collect-方法返回-null","children":[]}]},{"level":2,"title":"4. 是否可能使_Stream.collect()方法返回_null？","slug":"_4-是否可能使-stream-collect-方法返回-null","link":"#_4-是否可能使-stream-collect-方法返回-null","children":[{"level":3,"title":"4.1. 创建自定义收集器","slug":"_4-1-创建自定义收集器","link":"#_4-1-创建自定义收集器","children":[]},{"level":3,"title":"4.2. 使用_collectingAndThen()_方法","slug":"_4-2-使用-collectingandthen-方法","link":"#_4-2-使用-collectingandthen-方法","children":[]},{"level":3,"title":"4.3. 关于可空_收集器_的说明","slug":"_4-3-关于可空-收集器-的说明","link":"#_4-3-关于可空-收集器-的说明","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720439997000,"updatedTime":1720439997000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.89,"words":2066},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Can Stream.collect   Return the null Value .md","localizedDate":"2024年7月8日","excerpt":"\\n<p>在Java 8中引入的一个显著新特性是Stream API。它还附带了一系列的_收集器_（Collectors），允许我们调用_Stream.collect()<em>方法将流中的元素收集到所需的集合中，比如_List</em>、<em>Set</em>、_Map_等。</p>\\n<p>在本教程中，我们将讨论_collect()_方法是否可以返回_null_值。</p>\\n<h2>2. 问题介绍</h2>\\n<p>“Stream的_collect()_方法可以返回_null_吗？”这个问题有两个含义：</p>\\n<ul>\\n<li>当我们使用标准收集器时，是否需要对_null_进行检查？</li>\\n<li>如果我们真的希望_collect()<em>方法返回_null</em>，是否可能？</li>\\n</ul>","autoDesc":true}');export{k as comp,d as data};
