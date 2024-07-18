import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-c243dxVF.js";const p={},e=t('<h1 id="将-entryset-流收集到-linkedhashmap" tabindex="-1"><a class="header-anchor" href="#将-entryset-流收集到-linkedhashmap"><span>将 entrySet() 流收集到 LinkedHashMap</span></a></h1><p>在本教程中，我们将探讨将 Map.Entry 对象的流以不同方式收集到 LinkedHashMap 中。LinkedHashMap 与 HashMap 类似，但不同之处在于它保持插入顺序。</p><h2 id="_2-理解问题" tabindex="-1"><a class="header-anchor" href="#_2-理解问题"><span>2. 理解问题</span></a></h2><p>我们可以通过调用 entrySet() 方法后跟 stream() 方法来获取地图条目的流。这个流使我们能够处理每个条目。</p><p>处理是通过中间操作实现的，可以涉及使用 filter() 方法进行过滤或使用 map() 方法进行转换。<strong>最终，我们必须通过适当的终端操作来决定如何处理我们的流。</strong> 在我们的情况下，我们面临的挑战是将流收集到 LinkedHashMap 中。</p><p>假设我们有以下地图用于本教程：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` map <span class="token operator">=</span> <span class="token class-name">Map</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;value 1&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;value 2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们将流式传输并收集地图条目到 LinkedHashMap，并旨在满足以下断言：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">isExactlyInstanceOf</span><span class="token punctuation">(</span><span class="token class-name">LinkedHashMap</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">containsOnly</span><span class="token punctuation">(</span><span class="token function">entry</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;value 1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">entry</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;value 2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用-collectors-tomap-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用-collectors-tomap-方法"><span>3. 使用 Collectors.toMap() 方法</span></a></h2><p>我们可以使用 Collectors.toMap() 方法的重载版本将我们的流收集到我们选择的映射中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> `<span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">U</span><span class="token punctuation">,</span> <span class="token class-name">M</span> <span class="token keyword">extends</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">U</span><span class="token punctuation">&gt;</span></span>`<span class="token operator">&gt;</span>\n    <span class="token class-name">Collector</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">,</span> <span class="token class-name">M</span><span class="token punctuation">&gt;</span></span>`` <span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">Function</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">K</span><span class="token punctuation">&gt;</span></span>`` keyMapper<span class="token punctuation">,</span> <span class="token class-name">Function</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">U</span><span class="token punctuation">&gt;</span></span>` valueMapper<span class="token punctuation">,</span>\n        <span class="token class-name">BinaryOperator</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">U</span><span class="token punctuation">&gt;</span></span>` mergeFunction<span class="token punctuation">,</span> <span class="token class-name">Supplier</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">M</span><span class="token punctuation">&gt;</span></span>`` mapFactory<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，我们使用此收集器作为我们流的终端 collect() 操作的一部分：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>map\n  <span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getKey</span><span class="token punctuation">,</span> <span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getValue</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>e1<span class="token punctuation">,</span> e2<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span><span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name">LinkedHashMap</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了保留每个条目的键值对，我们使用方法引用 Map.Entry::getKey 和 Map.Entry::getValue 作为 keyMapper 和 valueMapper 函数。mergeFunction 允许我们处理具有相同键的条目之间的任何冲突。因此，我们抛出 RuntimeException，因为我们的用例中不应该有任何冲突。<strong>最后，我们使用 LinkedHashMap 构造函数引用作为 mapFactory 来提供将收集条目的映射。</strong></p><p>我们应该注意到，可以使用其他 toMap() 重载方法来实现我们的目标。然而，这些方法的 mapFactory 参数不存在，因此流在内部被收集到 HashMap 中。因此，我们可以使用 LinkedHashMap 的构造函数将 HashMap 转换为我们所需的类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>map\n  <span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getKey</span><span class="token punctuation">,</span> <span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getValue</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>然而，由于这创建了两个映射实例来实现我们的目标，首选初始方法。</strong></p><h2 id="_4-使用-collectors-groupingby-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-collectors-groupingby-方法"><span>4. 使用 Collectors.groupingBy() 方法</span></a></h2><p>我们可以使用 Collectors.groupingBy() 方法的重载版本来指定分组收集的映射：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> `<span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">D</span><span class="token punctuation">,</span> <span class="token class-name">A</span><span class="token punctuation">,</span> <span class="token class-name">M</span> <span class="token keyword">extends</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">D</span><span class="token punctuation">&gt;</span></span>`<span class="token operator">&gt;</span> <span class="token class-name">Collector</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">,</span> <span class="token class-name">M</span><span class="token punctuation">&gt;</span></span>``\n    <span class="token function">groupingBy</span><span class="token punctuation">(</span><span class="token class-name">Function</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">K</span><span class="token punctuation">&gt;</span></span>`` classifier<span class="token punctuation">,</span> <span class="token class-name">Supplier</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">M</span><span class="token punctuation">&gt;</span></span>`` mapFactory<span class="token punctuation">,</span>\n        <span class="token class-name">Collector</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token class-name">A</span><span class="token punctuation">,</span> <span class="token class-name">D</span><span class="token punctuation">&gt;</span></span>` downstream<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设我们有一个现有的城市到国家的条目映射：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` cityToCountry <span class="token operator">=</span> <span class="token class-name">Map</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Paris&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;France&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Nice&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;France&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Madrid&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Spain&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，我们想按国家分组城市。因此，我们使用 groupingBy() 与 collect() 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>`<span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`<span class="token operator">&gt;</span> countryToCities <span class="token operator">=</span> cityToCountry\n  <span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">groupingBy</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getValue</span><span class="token punctuation">,</span> <span class="token class-name">LinkedHashMap</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">,</span> <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">mapping</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getKey</span><span class="token punctuation">,</span> <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertThat</span><span class="token punctuation">(</span>countryToCities<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">isExactlyInstanceOf</span><span class="token punctuation">(</span><span class="token class-name">LinkedHashMap</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">containsOnly</span><span class="token punctuation">(</span><span class="token function">entry</span><span class="token punctuation">(</span><span class="token string">&quot;France&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Set</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Paris&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Nice&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">entry</span><span class="token punctuation">(</span><span class="token string">&quot;Spain&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Set</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Madrid&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用 Map.Entry::getValue 方法引用作为 classifier 函数按国家分组。<strong>我们通过使用 LinkedHashMap::new 为 mapFactory 来说明收集分组的所需映射。</strong> 最后，我们使用 Collectors.mapping() 方法作为下游收集器，从我们的条目中提取键，收集到每个集合中。</p><h2 id="_5-使用-put-方法" tabindex="-1"><a class="header-anchor" href="#_5-使用-put-方法"><span>5. 使用 put() 方法</span></a></h2><p>我们可以使用终端 forEach() 操作和 put() 方法将我们的流收集到现有的 LinkedHashMap 中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nmap\n  <span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>entry <span class="token operator">-&gt;</span> result<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，我们可以完全避免流式传输，并使用 Set 对象可用的 forEach()：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>map\n  <span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>entry <span class="token operator">-&gt;</span> result<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了进一步简化，我们可以直接在映射上使用 forEach()：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>map<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> result<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>然而，我们应该注意到，这些每个都引入了我们的函数编程的副作用操作，通过修改现有的映射。</strong> 因此，使用更命令式的风格更合适：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` entry <span class="token operator">:</span> map<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    result<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用增强的 for 循环来迭代并将每个条目的键值添加到现有的 LinkedHashMap 中。</p><h2 id="_6-使用-linkedhashmap-的构造函数" tabindex="-1"><a class="header-anchor" href="#_6-使用-linkedhashmap-的构造函数"><span>6. 使用 LinkedHashMap 的构造函数</span></a></h2><p>如果我们想简单地将映射转换为 LinkedHashMap，不需要流式传输条目就可以做到这一点。<strong>我们可以使用 LinkedHashMap 的构造函数直接转换映射：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们探讨了将映射条目的流收集到 LinkedHashMap 的各种方式。我们探索了使用不同的终端操作和替代流式传输的方法来实现我们的目标。</p><p>正如本文中使用的代码示例可以在 GitHub 上找到。</p>',42),o=[e];function c(l,u){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-22-Collect Stream of entrySet   to a LinkedHashMap.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Collect%20Stream%20of%20entrySet%20%20%20to%20a%20LinkedHashMap.html","title":"将 entrySet() 流收集到 LinkedHashMap","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Java","Tutorial"],"tag":["LinkedHashMap","Stream","Java 8"],"head":[["meta",{"name":"keywords","content":"Java,Java 8,LinkedHashMap,Stream,教程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Collect%20Stream%20of%20entrySet%20%20%20to%20a%20LinkedHashMap.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"将 entrySet() 流收集到 LinkedHashMap"}],["meta",{"property":"og:description","content":"将 entrySet() 流收集到 LinkedHashMap 在本教程中，我们将探讨将 Map.Entry 对象的流以不同方式收集到 LinkedHashMap 中。LinkedHashMap 与 HashMap 类似，但不同之处在于它保持插入顺序。 2. 理解问题 我们可以通过调用 entrySet() 方法后跟 stream() 方法来获取地图条..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T12:46:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"LinkedHashMap"}],["meta",{"property":"article:tag","content":"Stream"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T12:46:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"将 entrySet() 流收集到 LinkedHashMap\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T12:46:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"将 entrySet() 流收集到 LinkedHashMap 在本教程中，我们将探讨将 Map.Entry 对象的流以不同方式收集到 LinkedHashMap 中。LinkedHashMap 与 HashMap 类似，但不同之处在于它保持插入顺序。 2. 理解问题 我们可以通过调用 entrySet() 方法后跟 stream() 方法来获取地图条..."},"headers":[{"level":2,"title":"2. 理解问题","slug":"_2-理解问题","link":"#_2-理解问题","children":[]},{"level":2,"title":"3. 使用 Collectors.toMap() 方法","slug":"_3-使用-collectors-tomap-方法","link":"#_3-使用-collectors-tomap-方法","children":[]},{"level":2,"title":"4. 使用 Collectors.groupingBy() 方法","slug":"_4-使用-collectors-groupingby-方法","link":"#_4-使用-collectors-groupingby-方法","children":[]},{"level":2,"title":"5. 使用 put() 方法","slug":"_5-使用-put-方法","link":"#_5-使用-put-方法","children":[]},{"level":2,"title":"6. 使用 LinkedHashMap 的构造函数","slug":"_6-使用-linkedhashmap-的构造函数","link":"#_6-使用-linkedhashmap-的构造函数","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719060399000,"updatedTime":1719060399000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.89,"words":1166},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Collect Stream of entrySet   to a LinkedHashMap.md","localizedDate":"2024年6月22日","excerpt":"\\n<p>在本教程中，我们将探讨将 Map.Entry 对象的流以不同方式收集到 LinkedHashMap 中。LinkedHashMap 与 HashMap 类似，但不同之处在于它保持插入顺序。</p>\\n<h2>2. 理解问题</h2>\\n<p>我们可以通过调用 entrySet() 方法后跟 stream() 方法来获取地图条目的流。这个流使我们能够处理每个条目。</p>\\n<p>处理是通过中间操作实现的，可以涉及使用 filter() 方法进行过滤或使用 map() 方法进行转换。<strong>最终，我们必须通过适当的终端操作来决定如何处理我们的流。</strong> 在我们的情况下，我们面临的挑战是将流收集到 LinkedHashMap 中。</p>","autoDesc":true}');export{r as comp,d as data};
