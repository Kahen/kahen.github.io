import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-FPWt52u1.js";const p={},e=t('<h1 id="如何在java中按值对linkedhashmap进行排序-baeldung" tabindex="-1"><a class="header-anchor" href="#如何在java中按值对linkedhashmap进行排序-baeldung"><span>如何在Java中按值对LinkedHashMap进行排序 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>映射（Map）是我们在需要管理键值对关联时常用的数据类型。LinkedHashMap是一个受欢迎的选择，主要是因为它保留了元素的插入顺序。然而，在许多现实世界的场景中，我们经常需要根据值而不是键来对LinkedHashMap中的元素进行排序。</p><p>在本教程中，我们将探讨如何在Java中按值对LinkedHashMap进行排序。</p><h2 id="_2-按值排序" tabindex="-1"><a class="header-anchor" href="#_2-按值排序"><span>2. 按值排序</span></a></h2><p>LinkedHashMap的默认行为是保持元素的插入顺序。这在我们需要跟踪元素添加到映射的顺序时非常有用。然而，按值排序是一个不同的需求。我们可能希望根据与键关联的值来安排条目，无论是升序还是降序。</p><p>接下来，让我们看一个例子。假设我们有一个名为MY_MAP的LinkedHashMap：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">LinkedHashMap</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```````` <span class="token constant">MY_MAP</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">static</span> <span class="token punctuation">{</span>\n    <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;key a&quot;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;key b&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;key c&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;key d&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;key e&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的例子所示，我们使用静态块初始化了MY_MAP。映射中的值是整数。我们的目标是按值对映射进行排序，并得到一个新的LinkedHashMap，它等同于EXPECTED_MY_MAP：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">LinkedHashMap</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```````` <span class="token constant">EXPECTED_MY_MAP</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">static</span><span class="token punctuation">{</span>\n    <span class="token constant">EXPECTED_MY_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;key b&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">EXPECTED_MY_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;key d&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">EXPECTED_MY_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;key c&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">EXPECTED_MY_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;key a&quot;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">EXPECTED_MY_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;key e&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将看到几种解决问题的方法。我们将使用单元测试断言来验证每种解决方案。</p><h2 id="_3-使用collections-sort-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用collections-sort-方法"><span>3. 使用Collections.sort()方法</span></a></h2><p>首先，让我们看看如果我们的Java版本早于Java 8，如何解决这个问题。</p><p>LinkedHashMap的entrySet()提供了对所有条目的访问，同时保持它们的原始顺序。</p><p>我们还可以利用Collections.sort()方法，它允许我们根据给定的Comparator对对象集合进行排序。</p><p>让我们先看看解决方案：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span><span class="token operator">&lt;</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````````<span class="token operator">&gt;</span> entryList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>entryList<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Comparator</span><span class="token operator">&lt;</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````````<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```````` o1<span class="token punctuation">,</span> <span class="token class-name">Map<span class="token punctuation">.</span>Entry</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```````` o2<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> o1<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>o2<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">LinkedHashMap</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```````` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```````` e <span class="token operator">:</span> entryList<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    result<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_MY_MAP</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们快速浏览一下代码，以了解它的工作原理。</p><p>首先，我们将entrySet()的结果包装在一个List中。然后，我们创建了一个匿名Comparator，根据它们的值对条目进行排序，并将其传递给Collections.sort()方法。最后，我们创建了一个新的LinkedHashMap对象，并将排序后的条目放入其中。</p><h2 id="_4-使用foreachordered" tabindex="-1"><a class="header-anchor" href="#_4-使用foreachordered"><span>4. 使用forEachOrdered()</span></a></h2><p>Stream API是Java 8带给我们的一个重大新特性。它允许我们方便地操作集合。因此，如果我们使用的Java版本是8或更高版本，我们可以<strong>使用Stream API从原始映射中填充一个空的LinkedHashMap，其中包含排序后的条目</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LinkedHashMap</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```````` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">sorted</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token punctuation">.</span><span class="token function">comparingByValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">forEachOrdered</span><span class="token punctuation">(</span>entry <span class="token operator">-&gt;</span> result<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_MY_MAP</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，使用Stream API，解决方案更加流畅和紧凑。</p><p>值得注意的是，Map.Entry支持comparingByValue()方法。顾名思义，它返回一个比较条目的Comparator，根据它们的值进行比较。</p><p>由于我们示例中的Entry.value是Integer，它是Comparable，我们可以直接调用comparingByValue()。</p><h2 id="_5-使用collect" tabindex="-1"><a class="header-anchor" href="#_5-使用collect"><span>5. 使用collect()</span></a></h2><p>一种更简洁的替代方法涉及利用collect()方法，一次性创建映射并累积排序后的条目：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LinkedHashMap</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```````` result <span class="token operator">=</span> <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">sorted</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token punctuation">.</span><span class="token function">comparingByValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">LinkedHashMap</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>map<span class="token punctuation">,</span> entry<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Map</span><span class="token operator">::</span><span class="token function">putAll</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_MY_MAP</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>collect()方法是这种方法的关键。它接受三个参数：</p><ul><li>Supplier (LinkedHashMap::new) – 提供一个新的容器（LinkedHashMap）来累积结果</li><li>Accumulator ((map, entry) -&gt; map.put(entry.getKey(), entry.getValue())) – 这个函数应用于流中的每个元素，并将每个条目添加到累积的LinkedHashMap中</li><li>Combiner (Map::putAll) – 在并行处理中，它组合由多个累加器更新的容器。在这种情况下，它是不相关的，因为流是顺序处理的。</li></ul><p>因此，<strong>collect()将排序后的条目累积到一个新的LinkedHashMap中。</strong></p><h2 id="_6-当值不是comparable时" tabindex="-1"><a class="header-anchor" href="#_6-当值不是comparable时"><span>6. 当值不是Comparable时</span></a></h2><p>我们已经看到了如何按值对MY_MAP进行排序。由于Integer值是Comparable，当我们使用Stream API时，我们可以简单地调用sorted(Map.Entry.comparingByValue())。</p><p>但是，<strong>如果值不是Comparable，我们需要向comparingByValue()传递一个Comparator</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Player</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">Integer</span> score <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">Integer</span> score<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>score <span class="token operator">=</span> score<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// ... hashcode, equals, getters methods are omitted ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如代码所示，Player类没有实现<strong>Comparable</strong>。现在，让我们初始化一个LinkedHashMap<code>&lt;String, Player&gt;</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">LinkedHashMap</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Player</span><span class="token punctuation">&gt;</span></span>```` <span class="token constant">PLAYERS</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">static</span> <span class="token punctuation">{</span>\n    <span class="token constant">PLAYERS</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;player a&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">PLAYERS</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;player b&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token string">&quot;Kai&quot;</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">PLAYERS</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;player c&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token string">&quot;Amanda&quot;</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">PLAYERS</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;player d&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token string">&quot;Kevin&quot;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设我们想按玩家的分数对PLAYERS进行排序，并得到一个新的LinkedHashMap：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">LinkedHashMap</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Player</span><span class="token punctuation">&gt;</span></span>```` <span class="token constant">EXPECTED_PLAYERS</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">static</span> <span class="token punctuation">{</span>\n    <span class="token constant">EXPECTED_PLAYERS</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;player d&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token string">&quot;Kevin&quot;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">EXPECTED_PLAYERS</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;player b&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token string">&quot;Kai&quot;</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">EXPECTED_PLAYERS</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;player a&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">EXPECTED_PLAYERS</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;player c&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token string">&quot;Amanda&quot;</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么，接下来让我们看看如何实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LinkedHashMap</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Player</span><span class="token punctuation">&gt;</span></span>```` result <span class="token operator">=</span> <span class="token constant">PLAYERS</span><span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">sorted</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token punctuation">.</span><span class="token function">comparingByValue</span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">comparing</span><span class="token punctuation">(</span><span class="token class-name">Player</span><span class="token operator">::</span><span class="token function">getScore</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">LinkedHashMap</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>map<span class="token punctuation">,</span> entry<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Map</span><span class="token operator">::</span><span class="token function">putAll</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_PLAYERS</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们利用Comparator.comparing(Player::getScore)在comparingByValue()方法中。</p><p>这种结构通过实例方法引用生成一个Comparator，专门比较Player对象的score字段。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本教程中，我们探讨了不同的方式来对LinkedHashMap按值进行排序。我们还解决了在值没有实现Comparable接口的情况下的排序实现。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>',46),o=[e];function c(l,u){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-26-How to Sort LinkedHashMap by Values in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-How%20to%20Sort%20LinkedHashMap%20by%20Values%20in%20Java.html","title":"如何在Java中按值对LinkedHashMap进行排序 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","Tutorial"],"tag":["LinkedHashMap","Sorting"],"head":[["meta",{"name":"keywords","content":"Java, Sorting, LinkedHashMap, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-How%20to%20Sort%20LinkedHashMap%20by%20Values%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java中按值对LinkedHashMap进行排序 | Baeldung"}],["meta",{"property":"og:description","content":"如何在Java中按值对LinkedHashMap进行排序 | Baeldung 1. 概述 映射（Map）是我们在需要管理键值对关联时常用的数据类型。LinkedHashMap是一个受欢迎的选择，主要是因为它保留了元素的插入顺序。然而，在许多现实世界的场景中，我们经常需要根据值而不是键来对LinkedHashMap中的元素进行排序。 在本教程中，我们将..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T20:32:01.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"LinkedHashMap"}],["meta",{"property":"article:tag","content":"Sorting"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T20:32:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java中按值对LinkedHashMap进行排序 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T20:32:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Java中按值对LinkedHashMap进行排序 | Baeldung 1. 概述 映射（Map）是我们在需要管理键值对关联时常用的数据类型。LinkedHashMap是一个受欢迎的选择，主要是因为它保留了元素的插入顺序。然而，在许多现实世界的场景中，我们经常需要根据值而不是键来对LinkedHashMap中的元素进行排序。 在本教程中，我们将..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 按值排序","slug":"_2-按值排序","link":"#_2-按值排序","children":[]},{"level":2,"title":"3. 使用Collections.sort()方法","slug":"_3-使用collections-sort-方法","link":"#_3-使用collections-sort-方法","children":[]},{"level":2,"title":"4. 使用forEachOrdered()","slug":"_4-使用foreachordered","link":"#_4-使用foreachordered","children":[]},{"level":2,"title":"5. 使用collect()","slug":"_5-使用collect","link":"#_5-使用collect","children":[]},{"level":2,"title":"6. 当值不是Comparable时","slug":"_6-当值不是comparable时","link":"#_6-当值不是comparable时","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719433921000,"updatedTime":1719433921000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.68,"words":1404},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-How to Sort LinkedHashMap by Values in Java.md","localizedDate":"2024年6月27日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>映射（Map）是我们在需要管理键值对关联时常用的数据类型。LinkedHashMap是一个受欢迎的选择，主要是因为它保留了元素的插入顺序。然而，在许多现实世界的场景中，我们经常需要根据值而不是键来对LinkedHashMap中的元素进行排序。</p>\\n<p>在本教程中，我们将探讨如何在Java中按值对LinkedHashMap进行排序。</p>\\n<h2>2. 按值排序</h2>\\n<p>LinkedHashMap的默认行为是保持元素的插入顺序。这在我们需要跟踪元素添加到映射的顺序时非常有用。然而，按值排序是一个不同的需求。我们可能希望根据与键关联的值来安排条目，无论是升序还是降序。</p>","autoDesc":true}');export{r as comp,d as data};
