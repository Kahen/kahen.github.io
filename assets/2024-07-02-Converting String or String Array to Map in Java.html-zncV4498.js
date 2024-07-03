import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BtbBZiJO.js";const p={},e=t('<h1 id="java中将字符串或字符串数组转换为map的方法" tabindex="-1"><a class="header-anchor" href="#java中将字符串或字符串数组转换为map的方法"><span>Java中将字符串或字符串数组转换为Map的方法</span></a></h1><p>处理基于键值对的数据是在各种Java应用程序中常见的需求。通常，数据以字符串或字符串数组的形式到达，将其转换为Map进行高效处理变得至关重要。在相同的背景下，Map提供了一种通过键值对访问和操作数据的便捷方式，使它们成为这些场景的强大数据结构。</p><p>在本文中，我们将探讨将字符串和字符串数组转换为Map的不同技术。我们还将讨论在将字符串数组转换为具有列表值的Map时如何处理重复键。此外，为了确保我们实现的正确性。</p><p>当我们有一个包含键值对的字符串时，我们可以将其转换为Map。字符串中的键值对必须由分隔符分隔，这可以是任何字符，例如逗号、分号或等号。</p><p>让我们看以下示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Map</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` <span class="token function">convertStringToMap</span><span class="token punctuation">(</span><span class="token class-name">String</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Map</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">StringTokenizer</span> tokenizer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringTokenizer</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">while</span> <span class="token punctuation">(</span>tokenizer<span class="token punctuation">.</span><span class="token function">hasMoreTokens</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">String</span> token <span class="token operator">=</span> tokenizer<span class="token punctuation">.</span><span class="token function">nextToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> keyValue <span class="token operator">=</span> token<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;=&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>keyValue<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> keyValue<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> map<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，我们使用StringTokenizer()通过分隔符（此例中为逗号）拆分字符串，然后使用split(&quot;=&quot;)提取键和值。结果的键值对被添加到Map中。请注意，我们修剪了token以去除任何前导或尾随空格。</p><p>现在，我们将测试convertStringToMap()方法，该方法采用包含键值对的字符串并将其转换为Map，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">given_StringWithKeyValuePairs_whenUsing_convertStringToMap_thenMapCreated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> data <span class="token operator">=</span> <span class="token string">&quot;name=John age=30 city=NewYork&quot;</span><span class="token punctuation">;</span>\n    <span class="token class-name">Map</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` expectedMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expectedMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expectedMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;30&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expectedMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;city&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;NewYork&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Map</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` resultMap <span class="token operator">=</span> <span class="token function">convertStringToMap</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedMap<span class="token punctuation">,</span> resultMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个测试方法首先定义了一个示例输入数据，这是一个用空格分隔的包含键值对的字符串。然后，它创建了一个expectedMap，代表转换后期望的输出。</p><p>测试继续通过调用convertStringToMap(data)方法来获得resultMap中的实际结果。最后，使用assertEquals()方法比较expectedMap和resultMap，以确保转换正确执行，并且输出Map与期望的匹配。</p><h3 id="_3-将字符串数组转换为map" tabindex="-1"><a class="header-anchor" href="#_3-将字符串数组转换为map"><span>3. 将字符串数组转换为Map</span></a></h3><p>如果我们有一个字符串数组，其中每个元素表示一个键值对，我们可以将其转换为Map：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Map</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` <span class="token function">convertStringArrayToMap</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Map</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> keyValue <span class="token operator">:</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> parts <span class="token operator">=</span> keyValue<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;=&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>parts<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> parts<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> map<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，我们遍历字符串数组，并将每个元素拆分为键和值。接下来，将结果的键值对添加到Map中。</p><p>以下测试方法用于验证convertStringArrayToMap()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">given_StringArrayWithKeyValuePairs_whenUsing_convertStringArrayToMap_thenMapCreated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;name=John&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;age=30&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;city=NewYork&quot;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token class-name">Map</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` expectedMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expectedMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expectedMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;30&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expectedMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;city&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;NewYork&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Map</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` resultMap <span class="token operator">=</span> <span class="token function">convertStringArrayToMap</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedMap<span class="token punctuation">,</span> resultMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试方法通过创建一个包含键值对的字符串数组来准备示例输入。然后，它生成一个expectedMap来表示转换后的期望输出。</p><p>此外，它调用convertStringArrayToMap(data)方法来获取resultMap中的实际结果。最后，测试使用assertEquals()确保转换正确，并且输出Map与期望的匹配。</p><h3 id="_4-处理重复键" tabindex="-1"><a class="header-anchor" href="#_4-处理重复键"><span>4. 处理重复键</span></a></h3><p><strong>在某些情况下，字符串数组可能包含重复的键，我们可能需要在Map中存储与每个键关联的多个值。</strong> 为了实现这一点，我们可以使用具有值列表的Map，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Map</span>``<span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````<span class="token operator">&gt;</span> <span class="token function">convertStringArrayToMapWithDuplicates</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Map</span>``<span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````<span class="token operator">&gt;</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> keyValue <span class="token operator">:</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> parts <span class="token operator">=</span> keyValue<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;=&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">String</span> key <span class="token operator">=</span> parts<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n        <span class="token class-name">String</span> value <span class="token operator">=</span> parts<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>map<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` valuesList <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            valuesList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n            <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` valuesList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            valuesList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> valuesList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> map<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，我们检查Map中是否已经存在键。如果存在，我们检索现有的值列表，并将新值追加到其中。否则，我们使用包含值的新列表在Map中创建一个新的条目。</p><p>以下测试方法旨在测试convertStringArrayToMapWithDuplicates()：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">given_StringArrayWithKeyValuePairsWithDuplicates_whenUsing_convertStringArrayToMapWithDuplicates_thenMapCreatedWithLists</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;name=John&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;age=30&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;city=NewYork&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;age=31&quot;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token class-name">Map</span>``<span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````<span class="token operator">&gt;</span> expectedMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expectedMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expectedMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;30&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;31&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expectedMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;city&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span><span class="token string">&quot;NewYork&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Map</span>``<span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````<span class="token operator">&gt;</span> resultMap <span class="token operator">=</span> <span class="token function">convertStringArrayToMapWithDuplicates</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedMap<span class="token punctuation">,</span> resultMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试方法定义了一个包含一些重复键的示例输入数据。然后，它创建了一个expectedMap，代表转换后的期望输出。expectedMap包括输入数据中重复键的值列表。</p><p>测试通过调用convertStringArrayToMapWithDuplicates(data)方法来获得resultMap中的实际结果。最后，使用assertEquals()方法比较expectedMap和resultMap，以确保转换正确执行，并且输出的带有值列表的Map与期望的匹配。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们探讨了在Java中将字符串和字符串数组转换为Map的不同技术。我们涵盖了基本转换、处理重复键，并提供了JUnit测试示例以确保实现的正确性。</p><p>通过了解这些转换技术，我们可以有效地处理Java应用程序中的基于键值的数据。记得根据我们项目的具体要求选择适当的转换方法。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>',31),o=[e];function c(l,u){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-02-Converting String or String Array to Map in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Converting%20String%20or%20String%20Array%20to%20Map%20in%20Java.html","title":"Java中将字符串或字符串数组转换为Map的方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Map","String"],"head":[["meta",{"name":"keywords","content":"Java, Map, String, Conversion, Programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Converting%20String%20or%20String%20Array%20to%20Map%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将字符串或字符串数组转换为Map的方法"}],["meta",{"property":"og:description","content":"Java中将字符串或字符串数组转换为Map的方法 处理基于键值对的数据是在各种Java应用程序中常见的需求。通常，数据以字符串或字符串数组的形式到达，将其转换为Map进行高效处理变得至关重要。在相同的背景下，Map提供了一种通过键值对访问和操作数据的便捷方式，使它们成为这些场景的强大数据结构。 在本文中，我们将探讨将字符串和字符串数组转换为Map的不同..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T06:39:47.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Map"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T06:39:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将字符串或字符串数组转换为Map的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T06:39:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将字符串或字符串数组转换为Map的方法 处理基于键值对的数据是在各种Java应用程序中常见的需求。通常，数据以字符串或字符串数组的形式到达，将其转换为Map进行高效处理变得至关重要。在相同的背景下，Map提供了一种通过键值对访问和操作数据的便捷方式，使它们成为这些场景的强大数据结构。 在本文中，我们将探讨将字符串和字符串数组转换为Map的不同..."},"headers":[{"level":3,"title":"3. 将字符串数组转换为Map","slug":"_3-将字符串数组转换为map","link":"#_3-将字符串数组转换为map","children":[]},{"level":3,"title":"4. 处理重复键","slug":"_4-处理重复键","link":"#_4-处理重复键","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719902387000,"updatedTime":1719902387000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.44,"words":1332},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Converting String or String Array to Map in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>处理基于键值对的数据是在各种Java应用程序中常见的需求。通常，数据以字符串或字符串数组的形式到达，将其转换为Map进行高效处理变得至关重要。在相同的背景下，Map提供了一种通过键值对访问和操作数据的便捷方式，使它们成为这些场景的强大数据结构。</p>\\n<p>在本文中，我们将探讨将字符串和字符串数组转换为Map的不同技术。我们还将讨论在将字符串数组转换为具有列表值的Map时如何处理重复键。此外，为了确保我们实现的正确性。</p>\\n<p>当我们有一个包含键值对的字符串时，我们可以将其转换为Map。字符串中的键值对必须由分隔符分隔，这可以是任何字符，例如逗号、分号或等号。</p>\\n<p>让我们看以下示例：</p>","autoDesc":true}');export{r as comp,d as data};
