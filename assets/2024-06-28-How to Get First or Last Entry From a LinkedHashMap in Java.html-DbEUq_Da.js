import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-_uhw5edP.js";const p={},e=t('<hr><h1 id="如何在java中从linkedhashmap获取首或尾条目" tabindex="-1"><a class="header-anchor" href="#如何在java中从linkedhashmap获取首或尾条目"><span>如何在Java中从LinkedHashMap获取首或尾条目</span></a></h1><p>在Java中，<em>LinkedHashMap</em> 是一个强大的工具，用于维护键值对的同时保持插入顺序。一个常见的需求是访问 <em>LinkedHashMap</em> 中的第一个或最后一个条目。</p><p>在本教程中，我们将探讨实现这一点的各种方法。</p><h2 id="_2-准备一个-linkedhashmap-示例" tabindex="-1"><a class="header-anchor" href="#_2-准备一个-linkedhashmap-示例"><span>2. 准备一个 <em>LinkedHashMap</em> 示例</span></a></h2><p>在深入实现访问 <em>LinkedHashMap</em> 中第一个和最后一个条目的方法之前，让我们简要回顾一下 <em>LinkedHashMap</em> 的特性。</p><p>首先，<em>LinkedHashMap</em> 是Java Collections Framework的一部分，并且扩展了 <em>HashMap</em> 类。此外，与常规的 <em>HashMap</em> 不同，<strong><em>LinkedHashMap</em> 保持元素的插入顺序。</strong></p><p>根据我们使用的构造函数，这个顺序可以是插入顺序或访问顺序。简单来说，插入顺序意味着元素根据它们被添加到 <em>LinkedHashMap</em> 的时间来排序，而访问顺序意味着元素根据访问频率排序，最近访问的元素出现在最后。</p><p>在本教程中，我们将以插入顺序的 <em>LinkedHashMap</em> 为例，演示如何获取第一个和最后一个条目。但是，这些解决方案也适用于访问顺序的 <em>LinkedHashMap</em>。</p><p>接下来，让我们准备一个 <em>LinkedHashMap</em> 对象示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">LinkedHashMap</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````````` <span class="token constant">THE_MAP</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">static</span> <span class="token punctuation">{</span>\n    <span class="token constant">THE_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;key one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a1 b1 c1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">THE_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;key two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a2 b2 c2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">THE_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;key three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a3 b3 c3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">THE_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;key four&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a4 b4 c4&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上例所示，我们使用静态块来初始化 <em>THE_MAP</em> 对象。</p><p>为了简单起见，在本教程中，我们假设 <em>LinkedHashMap</em> 对象不为空或null。此外，我们将利用单元测试断言来验证每种方法是否产生了预期的结果。</p><h2 id="_3-遍历映射条目" tabindex="-1"><a class="header-anchor" href="#_3-遍历映射条目"><span>3. 遍历映射条目</span></a></h2><p>我们知道 <em>Map</em> 的 <em>entrySet()</em> 方法返回由映射支持的所有条目集合。此外，<strong>对于 <em>LinkedHashMap</em>，返回的集合中的条目遵循映射对象中的条目顺序。</strong></p><p>因此，我们可以通过迭代 <em>entrySet()</em> 的结果来轻松访问 <em>LinkedHashMap</em> 中的任何条目。例如，<strong><em>linkedHashMap.entrySet().iterator().next()</em> 返回映射中的第一个元素：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Entry</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````````` firstEntry <span class="token operator">=</span> <span class="token constant">THE_MAP</span><span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;key one&quot;</span><span class="token punctuation">,</span> firstEntry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;a1 b1 c1&quot;</span><span class="token punctuation">,</span> firstEntry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，获取最后一个条目并不像我们检索第一个条目那样简单。<strong>我们必须迭代到集合中的最后一个元素才能获取最后一个映射条目：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Entry</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````````` lastEntry <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n<span class="token class-name">Iterator</span><span class="token operator">&lt;</span><span class="token class-name">Entry</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````<span class="token operator">&gt;</span> it <span class="token operator">=</span> <span class="token constant">THE_MAP</span><span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">while</span> <span class="token punctuation">(</span>it<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    lastEntry <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token function">assertNotNull</span><span class="token punctuation">(</span>lastEntry<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;key four&quot;</span><span class="token punctuation">,</span> lastEntry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;a4 b4 c4&quot;</span><span class="token punctuation">,</span> lastEntry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们使用 <em>Iterator</em> 对象遍历 <em>LinkedHashMap</em> 并不断更新 <em>lastEntry</em> 变量，直到我们到达最后一个条目。</p><p>我们的例子显示这种方法对于插入顺序的 <em>LinkedHashMaps</em> 是有效的。一些人可能会问，这种方法是否也适用于访问顺序的 <em>LinkedHashMap</em>，因为在访问顺序的 <em>LinkedHashMap</em> 中访问条目可能会改变它们的顺序。</p><p>因此，值得注意的是，迭代映射的视图不会影响支持映射的迭代顺序。这是因为**只有对映射的显式访问操作才会影响顺序，例如 <em>map.get(key)</em>。**所以，这种方法也适用于访问顺序的 <em>LinkedHashMap</em>。</p><h2 id="_4-将映射条目转换为数组" tabindex="-1"><a class="header-anchor" href="#_4-将映射条目转换为数组"><span>4. 将映射条目转换为数组</span></a></h2><p>我们知道数组对于随机访问非常高效。所以，如果我们能够将 <em>LinkedHashMap</em> 条目转换为数组，我们就可以高效地访问数组的第一个和最后一个元素。</p><p>我们已经了解到，我们可以通过调用 <em>entrySet()</em> 获取所有映射条目集合。因此，Java <em>Collection</em> 的 <em>toArray()</em> 方法帮助我们从集合中获得数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Entry</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````<span class="token punctuation">[</span><span class="token punctuation">]</span> theArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token constant">THE_MAP</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token constant">THE_MAP</span><span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span>theArray<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，访问数组中的第一个和最后一个元素对我们来说不是挑战：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Entry</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````````` firstEntry <span class="token operator">=</span> theArray<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;key one&quot;</span><span class="token punctuation">,</span> firstEntry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;a1 b1 c1&quot;</span><span class="token punctuation">,</span> firstEntry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Entry</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````````` lastEntry <span class="token operator">=</span> theArray<span class="token punctuation">[</span><span class="token constant">THE_MAP</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;key four&quot;</span><span class="token punctuation">,</span> lastEntry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;a4 b4 c4&quot;</span><span class="token punctuation">,</span> lastEntry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用stream-api" tabindex="-1"><a class="header-anchor" href="#_5-使用stream-api"><span>5. 使用Stream API</span></a></h2><p>自Java 8以来引入的Stream API提供了一系列的便捷方法，允许我们轻松处理集合。</p><p>接下来，让我们看看如何使用Java <em>Stream</em> 从 <em>LinkedHashMap</em> 中获取第一个条目：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Entry</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````````` firstEntry <span class="token operator">=</span> <span class="token constant">THE_MAP</span><span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;key one&quot;</span><span class="token punctuation">,</span> firstEntry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;a1 b1 c1&quot;</span><span class="token punctuation">,</span> firstEntry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，**我们在 <em>entrySet()</em> 结果上调用了 <em>stream()</em> 方法以获取映射条目的流对象。**然后，<em>findFirst()</em> 给我们提供了流中的第一个元素。值得注意的是，<em>findFirst()</em> 方法返回一个 <em>Optional</em> 对象。由于我们知道映射不会为空，我们直接调用 <em>get()</em> 方法从 <em>Optional</em> 对象中检索映射条目。</p><p>有多种方法可以从流实例中获取最后一个元素。例如，我们可以使用 <em>skip()</em> 函数来解决问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Entry</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````````` lastEntry <span class="token operator">=</span> <span class="token constant">THE_MAP</span><span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">skip</span><span class="token punctuation">(</span><span class="token constant">THE_MAP</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertNotNull</span><span class="token punctuation">(</span>lastEntry<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;key four&quot;</span><span class="token punctuation">,</span> lastEntry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;a4 b4 c4&quot;</span><span class="token punctuation">,</span> lastEntry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>skip()</em> 方法接受一个 <em>int</em> 参数。顾名思义，**<em>skip(n)</em> 返回一个流，丢弃原始流中的前 <em>n</em> 个元素。**因此，我们传递 <em>THE_MAP.size() – 1</em> 到 <em>skip()</em> 方法以 <strong>获得只包含最后一个元素的流，即 <em>THE_MAP</em> 的最后一个条目。</strong></p><h2 id="_6-使用反射api" tabindex="-1"><a class="header-anchor" href="#_6-使用反射api"><span>6. 使用反射API</span></a></h2><p>直到Java 21，<em>LinkedHashMap</em> 的实现维护了一个双向链表来保存键值条目。此外，<strong><em>head</em> 和 <em>tail</em> 变量引用了映射的第一个和最后一个条目：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**\n * 双向链表的头部（最老的）。\n */</span>\n<span class="token keyword">transient</span> <span class="token class-name">LinkedHashMap<span class="token punctuation">.</span>Entry</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>`` head<span class="token punctuation">;</span>\n\n<span class="token doc-comment comment">/**\n * 双向链表的尾部（最新的）。\n */</span>\n<span class="token keyword">transient</span> <span class="token class-name">LinkedHashMap<span class="token punctuation">.</span>Entry</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>`` tail<span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，我们可以简单地读取这两个变量以获取所需的条目。然而，<em>head</em> 和 <em>tail</em> 并不是公共变量。所以，我们不能直接在 <em>java.util</em> 包之外访问它们。</p><p>幸运的是，我们有一个强大的工具：Java反射API，它允许我们在运行时读取或写入类的属性。例如，我们可以使用反射来读取 <em>head</em> 和 <em>tail</em> 字段以获取映射的第一个和最后一个条目：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Field</span> head <span class="token operator">=</span> <span class="token constant">THE_MAP</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">&quot;head&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nhead<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Entry</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````````` firstEntry <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Entry</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````<span class="token punctuation">)</span> head<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">THE_MAP</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;key one&quot;</span><span class="token punctuation">,</span> firstEntry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;a1 b1 c1&quot;</span><span class="token punctuation">,</span> firstEntry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Field</span> tail <span class="token operator">=</span> <span class="token constant">THE_MAP</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">&quot;tail&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ntail<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Entry</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````````` lastEntry <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Entry</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````<span class="token punctuation">)</span> tail<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">THE_MAP</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;key four&quot;</span><span class="token punctuation">,</span> lastEntry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;a4 b4 c4&quot;</span><span class="token punctuation">,</span> lastEntry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意，当我们在Java版本9或更高版本上运行上述测试时，测试会因以下错误消息而失败：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span></span>InaccessibleObjectException</span><span class="token operator">:</span> <span class="token class-name">Unable</span> <span class="token keyword">to</span> <span class="token namespace">make</span> field <span class="token keyword">transient</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>LinkedHashMap</span>$<span class="token class-name">Entry</span>\n<span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>LinkedHashMap</span><span class="token punctuation">.</span>head accessible<span class="token operator">:</span> <span class="token keyword">module</span> <span class="token namespace">java<span class="token punctuation">.</span>base</span> does not <span class="token string">&quot;opens java.util&quot;</span> <span class="token keyword">to</span> <span class="token namespace">unnamed</span> <span class="token keyword">module</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为，<strong>自版本9以来，Java引入了模块系统，合理地限制了反射API。</strong></p><p>为了解决反射非法访问问题，我们可以将“ <em>–add-opens java.base/java.util=ALL-UNNAMED</em>”添加到Java命令行中。<strong>由于我们使用Apache Maven作为构建工具，我们可以将此选项添加到surefire-plugin配置中，以确保使用反射的测试在使用“ <em>mvn test</em>”时顺利运行：</strong></p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`org.apache.maven.plugins`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`maven-surefire-plugin`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>argLine</span><span class="token punctuation">&gt;</span></span>`\n                    --add-opens java.base/java.util=ALL-UNNAMED\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>argLine</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，重要的是要记住这种方法依赖于 <em>LinkedHashMap</em> 实现中存在“ <em>head</em>”和“ <em>tail</em>”字段。在Java未来版本中，如果这些字段被移除或重命名，这种解决方案可能不再有效。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们首先简要了解了 <em>LinkedHashMap</em> 的关键特性。然后，我们深入实际示例，展示了从 <em>LinkedHashMap</em> 中检索首和尾键值对的各种方法。</p><p>如往常一样，示例的完整源代码可在GitHub上获得。</p><p><a href="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" target="_blank" rel="noopener noreferrer">Baeldung Logo</a><a href="https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&amp;r=g" target="_blank" rel="noopener noreferrer">Gravatar Logo</a><a href="https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg" target="_blank" rel="noopener noreferrer">Eric Martin</a><a href="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" target="_blank" rel="noopener noreferrer">Announcement Icon</a><a href="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" target="_blank" rel="noopener noreferrer">Baeldung REST API</a><a href="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" target="_blank" rel="noopener noreferrer">Baeldung REST API Icon</a></p><p>OK</p>',53),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-28-How to Get First or Last Entry From a LinkedHashMap in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-How%20to%20Get%20First%20or%20Last%20Entry%20From%20a%20LinkedHashMap%20in%20Java.html","title":"如何在Java中从LinkedHashMap获取首或尾条目","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java Collections","LinkedHashMap"],"tag":["Java","LinkedHashMap","Entry"],"head":[["meta",{"name":"keywords","content":"Java, LinkedHashMap, Java Collections, Entry, First, Last, Key-Value Pair"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-How%20to%20Get%20First%20or%20Last%20Entry%20From%20a%20LinkedHashMap%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java中从LinkedHashMap获取首或尾条目"}],["meta",{"property":"og:description","content":"如何在Java中从LinkedHashMap获取首或尾条目 在Java中，LinkedHashMap 是一个强大的工具，用于维护键值对的同时保持插入顺序。一个常见的需求是访问 LinkedHashMap 中的第一个或最后一个条目。 在本教程中，我们将探讨实现这一点的各种方法。 2. 准备一个 LinkedHashMap 示例 在深入实现访问 Linke..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T04:33:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"LinkedHashMap"}],["meta",{"property":"article:tag","content":"Entry"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T04:33:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java中从LinkedHashMap获取首或尾条目\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T04:33:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Java中从LinkedHashMap获取首或尾条目 在Java中，LinkedHashMap 是一个强大的工具，用于维护键值对的同时保持插入顺序。一个常见的需求是访问 LinkedHashMap 中的第一个或最后一个条目。 在本教程中，我们将探讨实现这一点的各种方法。 2. 准备一个 LinkedHashMap 示例 在深入实现访问 Linke..."},"headers":[{"level":2,"title":"2. 准备一个 LinkedHashMap 示例","slug":"_2-准备一个-linkedhashmap-示例","link":"#_2-准备一个-linkedhashmap-示例","children":[]},{"level":2,"title":"3. 遍历映射条目","slug":"_3-遍历映射条目","link":"#_3-遍历映射条目","children":[]},{"level":2,"title":"4. 将映射条目转换为数组","slug":"_4-将映射条目转换为数组","link":"#_4-将映射条目转换为数组","children":[]},{"level":2,"title":"5. 使用Stream API","slug":"_5-使用stream-api","link":"#_5-使用stream-api","children":[]},{"level":2,"title":"6. 使用反射API","slug":"_6-使用反射api","link":"#_6-使用反射api","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719549204000,"updatedTime":1719549204000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.53,"words":1959},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-How to Get First or Last Entry From a LinkedHashMap in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>如何在Java中从LinkedHashMap获取首或尾条目</h1>\\n<p>在Java中，<em>LinkedHashMap</em> 是一个强大的工具，用于维护键值对的同时保持插入顺序。一个常见的需求是访问 <em>LinkedHashMap</em> 中的第一个或最后一个条目。</p>\\n<p>在本教程中，我们将探讨实现这一点的各种方法。</p>\\n<h2>2. 准备一个 <em>LinkedHashMap</em> 示例</h2>\\n<p>在深入实现访问 <em>LinkedHashMap</em> 中第一个和最后一个条目的方法之前，让我们简要回顾一下 <em>LinkedHashMap</em> 的特性。</p>","autoDesc":true}');export{r as comp,d as data};
