import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-DzJ3ruqA.js";const p={},e=t('<h1 id="如何在java中反转map" tabindex="-1"><a class="header-anchor" href="#如何在java中反转map"><span>如何在Java中反转Map</span></a></h1><p>在这篇文章中，我们将快速了解如何在Java中反转一个Map。我们的目标是为给定的Map<code>&lt;K, V&gt;</code>类型创建一个新的Map<code>&lt;V, K&gt;</code>实例。此外，我们还将看到如何处理源Map中存在重复值的情况。</p><h2 id="_2-定义问题" tabindex="-1"><a class="header-anchor" href="#_2-定义问题"><span>2. 定义问题</span></a></h2><p>让我们考虑我们有一个包含几个键值对的Map：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>` map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;first&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;second&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>原始Map将存储如下项目：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{first=1, second=2}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>相反，我们希望将键反转为值，反之亦然，到一个新的Map对象中。结果将是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{1=first, 2=second}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-使用传统的for循环" tabindex="-1"><a class="header-anchor" href="#_3-使用传统的for循环"><span>3. 使用传统的for循环</span></a></h2><p>首先，让我们看看如何使用for循环反转Map：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> `````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">,</span> <span class="token class-name">K</span><span class="token punctuation">&gt;</span></span>````````` <span class="token class-name">Map</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">,</span> <span class="token class-name">K</span><span class="token punctuation">&gt;</span></span>````````` <span class="token function">invertMapUsingForLoop</span><span class="token punctuation">(</span><span class="token class-name">Map</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>``````` map<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Map</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">,</span> <span class="token class-name">K</span><span class="token punctuation">&gt;</span></span>````````` inversedMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Entry</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>``````` entry <span class="token operator">:</span> map<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        inversedMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> inversedMap<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们遍历Map对象的entrySet()。之后，我们将原始的值作为新的键，原始的键作为新的值添加到inversedMap对象中。换句话说，我们通过替换键和值来复制Map的内容。此外，这种方法适用于Java 8之前的版本，尽管我们应该注意到这种方法<strong>只有在源Map的值是唯一的时才有效</strong>。</p><h2 id="_4-使用stream-api反转map" tabindex="-1"><a class="header-anchor" href="#_4-使用stream-api反转map"><span>4. 使用Stream API反转Map</span></a></h2><p>Java 8提供了Stream API的便捷方法，以更函数式的风格反转Map。让我们看看其中的一些。</p><h3 id="_4-1-collectors-tomap" tabindex="-1"><a class="header-anchor" href="#_4-1-collectors-tomap"><span>4.1. Collectors.toMap()</span></a></h3><p>如果我们的源Map中没有任何重复的值，我们可以使用Collectors.toMap()：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> `````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">,</span> <span class="token class-name">K</span><span class="token punctuation">&gt;</span></span>````````` <span class="token class-name">Map</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">,</span> <span class="token class-name">K</span><span class="token punctuation">&gt;</span></span>````````` <span class="token function">invertMapUsingStreams</span><span class="token punctuation">(</span><span class="token class-name">Map</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>``````` map<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Map</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">,</span> <span class="token class-name">K</span><span class="token punctuation">&gt;</span></span>````````` inversedMap <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">Entry</span><span class="token operator">::</span><span class="token function">getValue</span><span class="token punctuation">,</span> <span class="token class-name">Entry</span><span class="token operator">::</span><span class="token function">getKey</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> inversedMap<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，将entrySet()转换为对象流。随后，我们使用Collectors.toMap()将键和值收集到inversedMap对象中。</p><p>让我们考虑源Map包含重复值的情况。在这种情况下，我们可以使用一个映射函数来应用自定义规则到输入元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> ```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>``````` <span class="token class-name">Map</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">,</span> <span class="token class-name">K</span><span class="token punctuation">&gt;</span></span>````````` <span class="token function">invertMapUsingMapper</span><span class="token punctuation">(</span><span class="token class-name">Map</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>``````` sourceMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> sourceMap<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span>\n            <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">Entry</span><span class="token operator">::</span><span class="token function">getValue</span><span class="token punctuation">,</span> <span class="token class-name">Entry</span><span class="token operator">::</span><span class="token function">getKey</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>oldValue<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> oldValue<span class="token punctuation">)</span>\n        <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个方法中，Collectors.toMap()的最后一个参数是一个映射函数。使用这个，我们可以自定义在有重复项的情况下应该添加哪个键。在上面的例子中，如果Map包含重复的值，我们保留第一个值作为键。然而，如果值重复，我们可以只保留一个键。</p><h3 id="_4-2-collectors-groupingby" tabindex="-1"><a class="header-anchor" href="#_4-2-collectors-groupingby"><span>4.2. Collectors.groupingBy()</span></a></h3><p>有时，即使源Map包含重复的值，我们也可能需要所有的键。或者，Collectors.groupingBy()提供了更好的控制来处理重复的值。</p><p>例如，让我们考虑我们有以下键值对：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">{</span>first<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> second<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> two<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，值“2”对于不同的键重复了两次。在这些情况下，我们可以使用groupingBy()方法来实现对值对象的级联“分组”操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> `````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">,</span> <span class="token class-name">K</span><span class="token punctuation">&gt;</span></span>````````` <span class="token class-name">Map</span>``<span class="token operator">&lt;</span><span class="token class-name">V</span><span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">&gt;</span></span>``<span class="token operator">&gt;</span> <span class="token function">invertMapUsingGroupingBy</span><span class="token punctuation">(</span><span class="token class-name">Map</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>``````` map<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Map</span>``<span class="token operator">&lt;</span><span class="token class-name">V</span><span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">&gt;</span></span>``<span class="token operator">&gt;</span> inversedMap <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">groupingBy</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getValue</span><span class="token punctuation">,</span> <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">mapping</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getKey</span><span class="token punctuation">,</span> <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> inversedMap<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>稍微解释一下，Collectors.mapping()函数使用指定的收集器对与给定键相关联的值执行归约操作。groupingBy()收集器将重复的值收集到一个List中，<strong>结果是一个MultiMap</strong>。现在的输出将是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{1=[first], 2=[two, second]}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇文章中，我们快速回顾了几种内置的反转HashMap的方法，并给出了示例。同时，我们也看到了在反转Map对象时如何处理重复的值。</p><p>与此同时，一些外部库在Map接口之上提供了额外的功能。我们之前演示了如何使用Google Guava BiMap和Apache BidiMap来反转Map。</p><p>像往常一样，这些示例的代码可以在GitHub上找到。</p>',34),c=[e];function o(l,i){return s(),n("div",null,c)}const k=a(p,[["render",o],["__file","2024-07-21-How to Invert a Map in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-How%20to%20Invert%20a%20Map%20in%20Java.html","title":"如何在Java中反转Map","lang":"zh-CN","frontmatter":{"date":"2024-07-21T00:00:00.000Z","category":["Java","编程技巧"],"tag":["Java","集合","逆向映射"],"head":[["meta",{"name":"keywords","content":"Java, 逆向映射, 集合, 编程技巧"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-How%20to%20Invert%20a%20Map%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java中反转Map"}],["meta",{"property":"og:description","content":"如何在Java中反转Map 在这篇文章中，我们将快速了解如何在Java中反转一个Map。我们的目标是为给定的Map<K, V>类型创建一个新的Map<V, K>实例。此外，我们还将看到如何处理源Map中存在重复值的情况。 2. 定义问题 让我们考虑我们有一个包含几个键值对的Map： 原始Map将存储如下项目： 相反，我们希望将键反转为值，反之亦然，到一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T13:49:45.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"集合"}],["meta",{"property":"article:tag","content":"逆向映射"}],["meta",{"property":"article:published_time","content":"2024-07-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T13:49:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java中反转Map\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T13:49:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Java中反转Map 在这篇文章中，我们将快速了解如何在Java中反转一个Map。我们的目标是为给定的Map<K, V>类型创建一个新的Map<V, K>实例。此外，我们还将看到如何处理源Map中存在重复值的情况。 2. 定义问题 让我们考虑我们有一个包含几个键值对的Map： 原始Map将存储如下项目： 相反，我们希望将键反转为值，反之亦然，到一..."},"headers":[{"level":2,"title":"2. 定义问题","slug":"_2-定义问题","link":"#_2-定义问题","children":[]},{"level":2,"title":"3. 使用传统的for循环","slug":"_3-使用传统的for循环","link":"#_3-使用传统的for循环","children":[]},{"level":2,"title":"4. 使用Stream API反转Map","slug":"_4-使用stream-api反转map","link":"#_4-使用stream-api反转map","children":[{"level":3,"title":"4.1. Collectors.toMap()","slug":"_4-1-collectors-tomap","link":"#_4-1-collectors-tomap","children":[]},{"level":3,"title":"4.2. Collectors.groupingBy()","slug":"_4-2-collectors-groupingby","link":"#_4-2-collectors-groupingby","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721569785000,"updatedTime":1721569785000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.24,"words":971},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-How to Invert a Map in Java.md","localizedDate":"2024年7月21日","excerpt":"\\n<p>在这篇文章中，我们将快速了解如何在Java中反转一个Map。我们的目标是为给定的Map<code>&lt;K, V&gt;</code>类型创建一个新的Map<code>&lt;V, K&gt;</code>实例。此外，我们还将看到如何处理源Map中存在重复值的情况。</p>\\n<h2>2. 定义问题</h2>\\n<p>让我们考虑我们有一个包含几个键值对的Map：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">Map</span>`<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">&gt;</span></span>` map <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">HashMap</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nmap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"first\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nmap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"second\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
