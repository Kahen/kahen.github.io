import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-YddbDb53.js";const t={},p=e('<h1 id="java中的强引用、弱引用、软引用和虚引用" tabindex="-1"><a class="header-anchor" href="#java中的强引用、弱引用、软引用和虚引用"><span>Java中的强引用、弱引用、软引用和虚引用</span></a></h1><p>当我们用Java编程时，我们经常使用硬引用，通常甚至不会考虑它——这是一个很好的理由，因为它们是大多数情况下的最佳选择。然而，有时我们需要对垃圾回收器清理对象的时间有更多的控制。</p><p>在本文中，我们将探讨硬引用和各种非硬引用类型之间的区别，以及我们何时可以使用它们。</p><h2 id="_2-硬引用" tabindex="-1"><a class="header-anchor" href="#_2-硬引用"><span>2. 硬引用</span></a></h2><p>硬引用（或强引用）是默认类型的引用，我们大多数时候甚至不会考虑引用对象何时以及如何被垃圾回收。假设我们创建了一个_ArrayList_对象并将其分配给_list_变量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>垃圾回收器不能回收这个列表，因为我们在_list_变量中持有它的强引用。但是，如果我们将变量置为null：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>list <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，只有现在，_ArrayList_对象才能被回收，因为没有任何引用持有它。</p><h2 id="_3-超出硬引用" tabindex="-1"><a class="header-anchor" href="#_3-超出硬引用"><span>3. 超出硬引用</span></a></h2><p>硬引用是默认的有一个很好的理由。它们让垃圾回收器按预期工作，所以我们不必担心管理内存分配。尽管如此，有些情况下我们希望即使仍然持有这些对象的引用，也要收集对象并释放内存。</p><p>软引用告诉垃圾回收器，引用的对象可以在回收器的自由裁量下被回收。该对象可以在内存中停留一段时间，直到回收器决定需要回收它。这将特别发生在JVM面临内存耗尽风险时。所有仅通过软引用可到达的对象的软引用应在抛出_OutOfMemoryError_异常之前被清除。</p><p>我们可以通过将对象包装在软引用中来轻松使用软引用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">SoftReference</span><span class="token operator">&lt;</span><span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```<span class="token operator">&gt;</span> listReference <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SoftReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ArrayList</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们想检索引用对象，我们可以使用_get_方法。由于对象可能已经被清除，我们需要检查它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` list <span class="token operator">=</span> listReference<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span>list <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 对象已经被清除</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-1-使用案例" tabindex="-1"><a class="header-anchor" href="#_4-1-使用案例"><span>4.1. 使用案例</span></a></h3><p>软引用可以用来使我们的代码对与内存不足相关的错误更加有弹性。例如，我们可以创建一个对内存敏感的缓存，当内存稀缺时自动驱逐对象。我们不需要手动管理内存，因为垃圾回收器会为我们做。</p><h2 id="_5-弱引用" tabindex="-1"><a class="header-anchor" href="#_5-弱引用"><span>5. 弱引用</span></a></h2><p><strong>仅由弱引用引用的对象不会被阻止被回收。</strong> 从垃圾回收的角度来看，它们可能根本不存在。如果一个弱引用的对象应该被保护免于被清除，它也应该被一些硬引用所引用。</p><h3 id="_5-1-使用案例" tabindex="-1"><a class="header-anchor" href="#_5-1-使用案例"><span>5.1. 使用案例</span></a></h3><p>弱引用最常用于<strong>创建规范化映射</strong>。这些映射只映射可以到达的对象。一个很好的例子是_WeakHashMap_，它的工作原理与普通的_HashMap_相同，但它的键是弱引用的，当引用对象被清除时，它们会自动被移除。</p><p>使用_WeakHashMap_，我们可以创建一个短暂存在的缓存，清除不再被代码的其他部分使用的对对象。如果我们使用普通的_HashMap_，仅仅因为键在映射中的存在就会阻止它被垃圾回收器清除。</p><h2 id="_6-虚引用" tabindex="-1"><a class="header-anchor" href="#_6-虚引用"><span>6. 虚引用</span></a></h2><p>与弱引用类似，虚引用不会阻止垃圾回收器将对象排队等待清除。不同之处在于<strong>虚引用必须从引用队列中手动轮询后才能被最终确定</strong>。这意味着我们可以在它们被清除之前决定我们想做什么。</p><h3 id="_6-1-使用案例" tabindex="-1"><a class="header-anchor" href="#_6-1-使用案例"><span>6.1. 使用案例</span></a></h3><p>如果我们需要实现一些最终确定逻辑，虚引用是很好的选择，它们比_finalize_方法更可靠和灵活。让我们编写一个简单的方法，它将遍历引用队列并对所有引用执行清理：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">clearReferences</span><span class="token punctuation">(</span><span class="token class-name">ReferenceQueue</span> queue<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Reference</span> reference <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>reference <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">break</span><span class="token punctuation">;</span> <span class="token comment">// 没有引用要清除</span>\n        <span class="token punctuation">}</span>\n        <span class="token function">cleanup</span><span class="token punctuation">(</span>reference<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虚引用不允许我们使用_get_方法检索它们的引用对象。由于这个原因，通常的做法是扩展_PhantomReference_类，以包含对我们的清理逻辑重要的信息。</p><p>虚引用的其他重要用例是<strong>调试和内存泄漏检测</strong>。即使我们不需要执行任何最终确定操作，我们可以使用虚引用来观察哪些对象正在被分配和何时。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们探讨了硬引用和不同类型的非硬引用及其用例。我们了解到软引用可以用于内存保护，弱引用用于规范化映射，虚引用用于细粒度的最终确定。</p>',32),c=[p];function o(l,i){return s(),n("div",null,c)}const d=a(t,[["render",o],["__file","2024-07-12-Strong  Weak  Soft  and Phantom References in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Strong%20%20Weak%20%20Soft%20%20and%20Phantom%20References%20in%20Java.html","title":"Java中的强引用、弱引用、软引用和虚引用","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Reference Types"],"tag":["Java","Soft Reference","Weak Reference","Phantom Reference"],"head":[["meta",{"name":"keywords","content":"Java, Reference Types, Soft Reference, Weak Reference, Phantom Reference"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Strong%20%20Weak%20%20Soft%20%20and%20Phantom%20References%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的强引用、弱引用、软引用和虚引用"}],["meta",{"property":"og:description","content":"Java中的强引用、弱引用、软引用和虚引用 当我们用Java编程时，我们经常使用硬引用，通常甚至不会考虑它——这是一个很好的理由，因为它们是大多数情况下的最佳选择。然而，有时我们需要对垃圾回收器清理对象的时间有更多的控制。 在本文中，我们将探讨硬引用和各种非硬引用类型之间的区别，以及我们何时可以使用它们。 2. 硬引用 硬引用（或强引用）是默认类型的引..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T04:42:44.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Soft Reference"}],["meta",{"property":"article:tag","content":"Weak Reference"}],["meta",{"property":"article:tag","content":"Phantom Reference"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T04:42:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的强引用、弱引用、软引用和虚引用\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T04:42:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的强引用、弱引用、软引用和虚引用 当我们用Java编程时，我们经常使用硬引用，通常甚至不会考虑它——这是一个很好的理由，因为它们是大多数情况下的最佳选择。然而，有时我们需要对垃圾回收器清理对象的时间有更多的控制。 在本文中，我们将探讨硬引用和各种非硬引用类型之间的区别，以及我们何时可以使用它们。 2. 硬引用 硬引用（或强引用）是默认类型的引..."},"headers":[{"level":2,"title":"2. 硬引用","slug":"_2-硬引用","link":"#_2-硬引用","children":[]},{"level":2,"title":"3. 超出硬引用","slug":"_3-超出硬引用","link":"#_3-超出硬引用","children":[{"level":3,"title":"4.1. 使用案例","slug":"_4-1-使用案例","link":"#_4-1-使用案例","children":[]}]},{"level":2,"title":"5. 弱引用","slug":"_5-弱引用","link":"#_5-弱引用","children":[{"level":3,"title":"5.1. 使用案例","slug":"_5-1-使用案例","link":"#_5-1-使用案例","children":[]}]},{"level":2,"title":"6. 虚引用","slug":"_6-虚引用","link":"#_6-虚引用","children":[{"level":3,"title":"6.1. 使用案例","slug":"_6-1-使用案例","link":"#_6-1-使用案例","children":[]}]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720759364000,"updatedTime":1720759364000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.2,"words":1260},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Strong  Weak  Soft  and Phantom References in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>当我们用Java编程时，我们经常使用硬引用，通常甚至不会考虑它——这是一个很好的理由，因为它们是大多数情况下的最佳选择。然而，有时我们需要对垃圾回收器清理对象的时间有更多的控制。</p>\\n<p>在本文中，我们将探讨硬引用和各种非硬引用类型之间的区别，以及我们何时可以使用它们。</p>\\n<h2>2. 硬引用</h2>\\n<p>硬引用（或强引用）是默认类型的引用，我们大多数时候甚至不会考虑引用对象何时以及如何被垃圾回收。假设我们创建了一个_ArrayList_对象并将其分配给_list_变量：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">List</span>```<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>``` list <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
