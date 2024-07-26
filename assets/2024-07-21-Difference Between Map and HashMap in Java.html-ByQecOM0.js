import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as p}from"./app-DpYLEM_u.js";const t={},e=p('<h1 id="java中map与hashmap的区别-baeldung" tabindex="-1"><a class="header-anchor" href="#java中map与hashmap的区别-baeldung"><span>Java中Map与HashMap的区别 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>**Map和HashMap之间的区别在于，前者是一个接口，而后者是一个实现。**然而，在本文中，我们将更深入地探讨接口的用途。同时，我们将学习如何使用接口使代码更加灵活，以及为什么我们有相同接口的不同实现。</p><h2 id="_2-接口的目的" tabindex="-1"><a class="header-anchor" href="#_2-接口的目的"><span>2. 接口的目的</span></a></h2><p>接口是一个只定义行为的契约。**实现特定接口的每个类都应该满足这个契约。**为了更好地理解它，我们可以从现实生活中举一个例子。想象一下汽车。每个人脑海中都会有不同的形象。术语“汽车”暗示了某些品质和行为。任何具有这些品质的对象都可以被称为汽车。这就是为什么我们每个人想象的汽车都不同。</p><p>接口的工作原理相同。Map是一个抽象，定义了某些品质和行为。只有具有所有这些品质的类才能成为Map。</p><h2 id="_3-不同的实现" tabindex="-1"><a class="header-anchor" href="#_3-不同的实现"><span>3. 不同的实现</span></a></h2><p>我们有Map接口的不同实现，原因与我们有不同型号的汽车相同。所有实现都服务于不同的目的。**不可能找到总体上的最佳实现。只有针对某种目的的最佳实现。**尽管跑车速度快，看起来很酷，但它不是家庭野餐或去家具店旅行的最佳选择。</p><p>HashMap是Map接口最简单的实现，并提供了基本功能。大多数情况下，这种实现涵盖了所有需求。另外两个广泛使用的实现是TreeMap和LinkedHashMap，它们提供了额外的功能。</p><p>这里是一个更详细但不完整的层次结构：</p><h2 id="_4-针对实现编程" tabindex="-1"><a class="header-anchor" href="#_4-针对实现编程"><span>4. 针对实现编程</span></a></h2><p>想象一下，我们想在控制台打印HashMap的键和值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HashMapPrinter</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printMap</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">HashMap</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">&gt;</span></span>``````` map<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Entry</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">&gt;</span></span>``````` entry <span class="token operator">:</span> map<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个完成工作的小程序。然而，它存在一个问题。它只能与HashMap一起工作。因此，任何尝试将TreeMap或甚至是通过Map引用的HashMap传递到方法中都将导致编译错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Map</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">HashMap</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` hashMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">TreeMap</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` treeMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">HashMapPrinter</span> hashMapPrinter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMapPrinter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        hashMapPrinter<span class="token punctuation">.</span><span class="token function">printMap</span><span class="token punctuation">(</span>hashMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">//        hashMapPrinter.printMap(treeMap); 编译时错误</span>\n<span class="token comment">//        hashMapPrinter.printMap(map); 编译时错误</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们尝试理解为什么会发生这种情况。在这两种情况下，编译器不能确定在该方法内部，是否会调用HashMap特定的方法。</p><p>TreeMap位于Map实现的不同分支上（无意双关），因此它可能缺少在HashMap中定义的某些方法。</p><p>在第二种情况下，尽管实际的底层对象类型是HashMap，但它是通过Map接口引用的。因此，这个对象只能公开定义在Map中而不是在HashMap中的方法。</p><p>**因此，即使我们的HashMapPrinter是一个非常简单的类，它也太具体了。**通过这种方法，我们将需要为每种Map实现创建一个特定的Printer。</p><h2 id="_5-针对接口编程" tabindex="-1"><a class="header-anchor" href="#_5-针对接口编程"><span>5. 针对接口编程</span></a></h2><p>通常，初学者对于“针对接口编程”或“对接口编码”的表达感到困惑。让我们考虑以下示例，这将使它更清晰一些。我们将参数的类型更改为尽可能通用的类型，即Map：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MapPrinter</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printMap</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Map</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">&gt;</span></span>``````` map<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Entry</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">&gt;</span></span>``````` entry <span class="token operator">:</span> map<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，实际实现保持不变，唯一的变化是参数的类型。这表明方法没有使用HashMap的任何特定方法。所有需要的功能已经在Map接口中定义了，即entrySet()方法。</p><p>结果，这个小小的变化产生了巨的差异。现在，这个类可以与任何Map实现一起工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Map</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">HashMap</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` hashMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">TreeMap</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` treeMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">MapPrinter</span> mapPrinter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MapPrinter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        mapPrinter<span class="token punctuation">.</span><span class="token function">printMap</span><span class="token punctuation">(</span>hashMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        mapPrinter<span class="token punctuation">.</span><span class="token function">printMap</span><span class="token punctuation">(</span>treeMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        mapPrinter<span class="token punctuation">.</span><span class="token function">printMap</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**针对接口编码帮助我们创建了一个通用的类，它可以与Map接口的任何实现一起工作。**这种方法可以消除代码重复，并确保我们的类和方法具有明确定义的目的。</p><h2 id="_6-接口的使用场合" tabindex="-1"><a class="header-anchor" href="#_6-接口的使用场合"><span>6. 接口的使用场合</span></a></h2><p>总的来说，参数应该是尽可能通用的类型。我们在前面的例子中看到，方法签名的一个简单变化如何能够改善我们的代码。我们应该采用相同方法的另一个地方是构造函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MapReporter</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Map</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">&gt;</span></span>``````` map<span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">MapReporter</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Map</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">&gt;</span></span>``````` map<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>map <span class="token operator">=</span> map<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Entry</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">&gt;</span></span>``````` entry <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>map<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个类可以与任何Map实现一起工作，仅仅因为我们在构造函数中使用了正确的类型。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>总结来说，在本教程中，我们讨论了为什么接口是抽象和定义契约的绝佳手段。使用尽可能通用的类型将使代码易于重用且易于阅读。同时，这种方法减少了代码量，这总是简化代码库的好方法。</p><p>如常，代码可以在GitHub上找到。</p>',33),c=[e];function o(l,i){return s(),a("div",null,c)}const r=n(t,[["render",o],["__file","2024-07-21-Difference Between Map and HashMap in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Difference%20Between%20Map%20and%20HashMap%20in%20Java.html","title":"Java中Map与HashMap的区别 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-02-01T00:00:00.000Z","category":["Java"],"tag":["Map","HashMap"],"head":[["meta",{"name":"keywords","content":"Java, Map, HashMap, 接口, 实现, 抽象"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Difference%20Between%20Map%20and%20HashMap%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中Map与HashMap的区别 | Baeldung"}],["meta",{"property":"og:description","content":"Java中Map与HashMap的区别 | Baeldung 1. 概述 **Map和HashMap之间的区别在于，前者是一个接口，而后者是一个实现。**然而，在本文中，我们将更深入地探讨接口的用途。同时，我们将学习如何使用接口使代码更加灵活，以及为什么我们有相同接口的不同实现。 2. 接口的目的 接口是一个只定义行为的契约。**实现特定接口的每个类都..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T12:13:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Map"}],["meta",{"property":"article:tag","content":"HashMap"}],["meta",{"property":"article:published_time","content":"2022-02-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T12:13:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中Map与HashMap的区别 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-02-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T12:13:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中Map与HashMap的区别 | Baeldung 1. 概述 **Map和HashMap之间的区别在于，前者是一个接口，而后者是一个实现。**然而，在本文中，我们将更深入地探讨接口的用途。同时，我们将学习如何使用接口使代码更加灵活，以及为什么我们有相同接口的不同实现。 2. 接口的目的 接口是一个只定义行为的契约。**实现特定接口的每个类都..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 接口的目的","slug":"_2-接口的目的","link":"#_2-接口的目的","children":[]},{"level":2,"title":"3. 不同的实现","slug":"_3-不同的实现","link":"#_3-不同的实现","children":[]},{"level":2,"title":"4. 针对实现编程","slug":"_4-针对实现编程","link":"#_4-针对实现编程","children":[]},{"level":2,"title":"5. 针对接口编程","slug":"_5-针对接口编程","link":"#_5-针对接口编程","children":[]},{"level":2,"title":"6. 接口的使用场合","slug":"_6-接口的使用场合","link":"#_6-接口的使用场合","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1721564004000,"updatedTime":1721564004000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.46,"words":1338},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Difference Between Map and HashMap in Java.md","localizedDate":"2022年2月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>**Map和HashMap之间的区别在于，前者是一个接口，而后者是一个实现。**然而，在本文中，我们将更深入地探讨接口的用途。同时，我们将学习如何使用接口使代码更加灵活，以及为什么我们有相同接口的不同实现。</p>\\n<h2>2. 接口的目的</h2>\\n<p>接口是一个只定义行为的契约。**实现特定接口的每个类都应该满足这个契约。**为了更好地理解它，我们可以从现实生活中举一个例子。想象一下汽车。每个人脑海中都会有不同的形象。术语“汽车”暗示了某些品质和行为。任何具有这些品质的对象都可以被称为汽车。这就是为什么我们每个人想象的汽车都不同。</p>\\n<p>接口的工作原理相同。Map是一个抽象，定义了某些品质和行为。只有具有所有这些品质的类才能成为Map。</p>","autoDesc":true}');export{r as comp,d as data};
