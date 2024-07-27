import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CJGTm_7y.js";const p={},e=t('<h1 id="java-9-中-map-of-和-map-ofentries-的区别" tabindex="-1"><a class="header-anchor" href="#java-9-中-map-of-和-map-ofentries-的区别"><span>Java 9 中 Map.of() 和 Map.ofEntries() 的区别</span></a></h1><p>Java 9 引入了 <em>Map.of()</em> 方法，使得创建不可变映射变得更加容易，以及 <em>Map.ofEntries()</em> 方法，它具有稍微不同的功能。</p><p>在本教程中，我们将更仔细地查看这两种用于不可变映射的静态工厂方法，并解释哪一个适合哪一种用途。</p><p><em>Map.of()</em> 方法<strong>接受指定数量的键值对作为参数</strong>，并返回包含每对键值对的不可变映射。参数中的对的顺序对应于它们添加到映射中的顺序。如果我们尝试添加一个带有重复键的键值对，它将抛出一个 <em>IllegalArgumentException</em>。如果我们尝试添加一个 <em>null</em> 键或值，它将抛出一个 <em>NullPointerException</em>。</p><p>实现为重载的 <em>static</em> 工厂方法，第一个让我们创建一个空映射：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> ``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>`````````` <span class="token class-name">Map</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>`````````` <span class="token function">of</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">Map</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>``<span class="token punctuation">)</span> <span class="token class-name">ImmutableCollections</span><span class="token punctuation">.</span><span class="token constant">EMPTY_MAP</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看用法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` map <span class="token operator">=</span> <span class="token class-name">Map</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接口 <em>Map<code>&lt;K, V&gt;</code></em> 中还有一个方法，它接受一个键和一个值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> ``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>`````````` <span class="token class-name">Map</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>`````````` <span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">K</span> k1<span class="token punctuation">,</span> <span class="token class-name">V</span> v1<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ImmutableCollections<span class="token punctuation">.</span>Map1</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>k1<span class="token punctuation">,</span> v1<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们调用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` map <span class="token operator">=</span> <span class="token class-name">Map</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> <span class="token string">&quot;value1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这些工厂方法还有九个重载版本，接受最多十个键和十个值，正如我们在 OpenJDK 17 中看到的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> ``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>`````````` <span class="token class-name">Map</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>`````````` <span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">K</span> k1<span class="token punctuation">,</span> <span class="token class-name">V</span> v1<span class="token punctuation">,</span> <span class="token class-name">K</span> k2<span class="token punctuation">,</span> <span class="token class-name">V</span> v2<span class="token punctuation">,</span> <span class="token class-name">K</span> k3<span class="token punctuation">,</span> <span class="token class-name">V</span> v3<span class="token punctuation">,</span> <span class="token class-name">K</span> k4<span class="token punctuation">,</span> <span class="token class-name">V</span> v4<span class="token punctuation">,</span> <span class="token class-name">K</span> k5<span class="token punctuation">,</span> <span class="token class-name">V</span> v5<span class="token punctuation">,</span> <span class="token class-name">K</span> k6<span class="token punctuation">,</span> <span class="token class-name">V</span> v6<span class="token punctuation">,</span> <span class="token class-name">K</span> k7<span class="token punctuation">,</span> <span class="token class-name">V</span> v7<span class="token punctuation">,</span> <span class="token class-name">K</span> k8<span class="token punctuation">,</span> <span class="token class-name">V</span> v8<span class="token punctuation">,</span> <span class="token class-name">K</span> k9<span class="token punctuation">,</span> <span class="token class-name">V</span> v9<span class="token punctuation">,</span> <span class="token class-name">K</span> k10<span class="token punctuation">,</span> <span class="token class-name">V</span> v10<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ImmutableCollections<span class="token punctuation">.</span>MapN</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>k1<span class="token punctuation">,</span> v1<span class="token punctuation">,</span> k2<span class="token punctuation">,</span> v2<span class="token punctuation">,</span> k3<span class="token punctuation">,</span> v3<span class="token punctuation">,</span> k4<span class="token punctuation">,</span> v4<span class="token punctuation">,</span> k5<span class="token punctuation">,</span> v5<span class="token punctuation">,</span> k6<span class="token punctuation">,</span> v6<span class="token punctuation">,</span> k7<span class="token punctuation">,</span> v7<span class="token punctuation">,</span> k8<span class="token punctuation">,</span> v8<span class="token punctuation">,</span> k9<span class="token punctuation">,</span> v9<span class="token punctuation">,</span> k10<span class="token punctuation">,</span> v10<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管这些方法非常有用，但创建更多的方法将会变得非常混乱。此外，我们不能使用 <em>Map.of()</em> 方法从现有的键和值创建映射，因为此方法仅接受未定义的键值对作为参数。这就是 <em>Map.ofEntries()</em> 方法的用武之地。</p><h3 id="_3-map-ofentries" tabindex="-1"><a class="header-anchor" href="#_3-map-ofentries"><span>3. <em>Map.ofEntries()</em></span></a></h3><p><em>Map.ofEntries()</em> 方法<strong>接受任意数量的 <em>Map.Entry<code>&lt;K, V&gt;</code></em> 对象作为参数</strong>，并且也返回一个不可变映射。同样，参数中的对的顺序与它们添加到映射中的顺序相同。如果我们尝试添加一个带有重复键的键值对，它会抛出一个 <em>IllegalArgumentException</em>。</p><p>让我们看看 OpenJDK 17 中的静态工厂方法实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> ``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>`````````` <span class="token class-name">Map</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>`````````` <span class="token function">ofEntries</span><span class="token punctuation">(</span><span class="token class-name">Entry</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>`<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> entries<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>entries<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 隐式检查entries数组是否为空</span>\n        <span class="token keyword">var</span> map <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Map</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>``<span class="token punctuation">)</span> <span class="token class-name">ImmutableCollections</span><span class="token punctuation">.</span><span class="token constant">EMPTY_MAP</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> map<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>entries<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 隐式检查数组槽位是否为空</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ImmutableCollections<span class="token punctuation">.</span>Map1</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>entries<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> entries<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> kva <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">[</span>entries<span class="token punctuation">.</span>length <span class="token operator">&lt;&lt;</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n        <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Entry</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>` entry <span class="token operator">:</span> entries<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token comment">// 隐式检查每个数组槽位是否为空</span>\n            kva<span class="token punctuation">[</span>a<span class="token operator">++</span><span class="token punctuation">]</span> <span class="token operator">=</span> entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            kva<span class="token punctuation">[</span>a<span class="token operator">++</span><span class="token punctuation">]</span> <span class="token operator">=</span> entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ImmutableCollections<span class="token punctuation">.</span>MapN</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>kva<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可变参数实现允许我们传递可变数量的条目。</p><p>例如，我们可以创建一个空映射：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` map <span class="token operator">=</span> <span class="token class-name">Map</span><span class="token punctuation">.</span><span class="token function">ofEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者我们可以创建并填充一个映射：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` longUserMap <span class="token operator">=</span> <span class="token class-name">Map</span><span class="token punctuation">.</span><span class="token function">ofEntries</span><span class="token punctuation">(</span><span class="token class-name">Map</span><span class="token punctuation">.</span><span class="token function">entry</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> <span class="token string">&quot;User A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Map</span><span class="token punctuation">.</span><span class="token function">entry</span><span class="token punctuation">(</span><span class="token number">2L</span><span class="token punctuation">,</span> <span class="token string">&quot;User B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>Map.ofEntries()</em> 方法的一个巨大优势是，我们还可以使用它<strong>从现有的键和值创建映射</strong>。这在 <em>Map.of()</em> 方法中是不可能的，因为它只接受未定义的键值对作为参数。</p><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p><em>Map.of()</em> 方法只适合最多有10个元素的映射。这是因为它被实现为11个不同的重载方法，接受从零到十个名称-值对作为参数。<strong>另一方面，<em>Map.ofEntries()</em> 方法可以用于任何大小的映射</strong>，因为它利用了可变参数的特性。</p><p>完整的示例可以在 GitHub 上找到。</p>',28),o=[e];function c(l,u){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-11-Difference Between Map.ofEntries   and Map.of  .html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Difference%20Between%20Map.ofEntries%20%20%20and%20Map.of%20%20.html","title":"Java 9 中 Map.of() 和 Map.ofEntries() 的区别","lang":"zh-CN","frontmatter":{"date":"2024-07-12T00:00:00.000Z","category":["Java","编程"],"tag":["Java 9","Map.of()","Map.ofEntries()"],"head":[["meta",{"name":"keywords","content":"Java, Map.of(), Map.ofEntries(), 编程, 教程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Difference%20Between%20Map.ofEntries%20%20%20and%20Map.of%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 9 中 Map.of() 和 Map.ofEntries() 的区别"}],["meta",{"property":"og:description","content":"Java 9 中 Map.of() 和 Map.ofEntries() 的区别 Java 9 引入了 Map.of() 方法，使得创建不可变映射变得更加容易，以及 Map.ofEntries() 方法，它具有稍微不同的功能。 在本教程中，我们将更仔细地查看这两种用于不可变映射的静态工厂方法，并解释哪一个适合哪一种用途。 Map.of() 方法接受指定数..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T23:02:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 9"}],["meta",{"property":"article:tag","content":"Map.of()"}],["meta",{"property":"article:tag","content":"Map.ofEntries()"}],["meta",{"property":"article:published_time","content":"2024-07-12T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T23:02:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 9 中 Map.of() 和 Map.ofEntries() 的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-12T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T23:02:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 9 中 Map.of() 和 Map.ofEntries() 的区别 Java 9 引入了 Map.of() 方法，使得创建不可变映射变得更加容易，以及 Map.ofEntries() 方法，它具有稍微不同的功能。 在本教程中，我们将更仔细地查看这两种用于不可变映射的静态工厂方法，并解释哪一个适合哪一种用途。 Map.of() 方法接受指定数..."},"headers":[{"level":3,"title":"3. Map.ofEntries()","slug":"_3-map-ofentries","link":"#_3-map-ofentries","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720738959000,"updatedTime":1720738959000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.15,"words":946},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Difference Between Map.ofEntries   and Map.of  .md","localizedDate":"2024年7月12日","excerpt":"\\n<p>Java 9 引入了 <em>Map.of()</em> 方法，使得创建不可变映射变得更加容易，以及 <em>Map.ofEntries()</em> 方法，它具有稍微不同的功能。</p>\\n<p>在本教程中，我们将更仔细地查看这两种用于不可变映射的静态工厂方法，并解释哪一个适合哪一种用途。</p>\\n<p><em>Map.of()</em> 方法<strong>接受指定数量的键值对作为参数</strong>，并返回包含每对键值对的不可变映射。参数中的对的顺序对应于它们添加到映射中的顺序。如果我们尝试添加一个带有重复键的键值对，它将抛出一个 <em>IllegalArgumentException</em>。如果我们尝试添加一个 <em>null</em> 键或值，它将抛出一个 <em>NullPointerException</em>。</p>","autoDesc":true}');export{r as comp,m as data};
