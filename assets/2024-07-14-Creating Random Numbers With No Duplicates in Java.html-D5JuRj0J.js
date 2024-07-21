import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CtR6X2Br.js";const e={},p=t(`<h1 id="在java中创建没有重复的随机数" tabindex="-1"><a class="header-anchor" href="#在java中创建没有重复的随机数"><span>在Java中创建没有重复的随机数</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本快速教程中，我们将学习如何使用Java核心类生成没有重复的随机数。<strong>首先，我们将从头开始实现几种解决方案，然后利用Java 8+的特性来实现更可扩展的方法。</strong></p><h2 id="_2-小范围内的随机数" tabindex="-1"><a class="header-anchor" href="#_2-小范围内的随机数"><span>2. 小范围内的随机数</span></a></h2><p>如果我们所需的数字范围较小，我们可以一直向列表中添加连续的数字，直到达到大小_n_。**然后，我们调用_Collections.shuffle()_，它具有线性时间复杂度。之后，我们将得到一个随机排序的唯一数字列表。**让我们创建一个实用工具类来生成和使用这些数字：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UniqueRng</span> <span class="token keyword">implements</span> <span class="token class-name">Iterator</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` numbers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">UniqueRng</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            numbers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">shuffle</span><span class="token punctuation">(</span>numbers<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构造对象后，我们将获得从一到_size_的数字的随机顺序。**注意我们正在实现_Iterator_，所以我们每次调用_next()_时都会得到一个随机数字。**另外，我们可以使用_hasNext()_来检查是否还有剩余的数字。那么，让我们重写它们：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NoSuchElementException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> numbers<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">!</span>numbers<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，_remove()_返回列表中第一个被移除的项目。**同样，如果我们没有打乱我们的集合，我们可以传递给它一个随机索引。**但是，在构造时打乱有一个优势，那就是我们可以提前知道整个序列。</p><h3 id="_2-1-实际应用" tabindex="-1"><a class="header-anchor" href="#_2-1-实际应用"><span>2.1. 实际应用</span></a></h3><p>要使用它，我们只需选择我们想要的数字数量并消耗它们：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">UniqueRng</span> rng <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UniqueRng</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>rng<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>rng<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这可能会产生如下输出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token number">4</span> <span class="token number">1</span> <span class="token number">2</span> <span class="token number">5</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-大范围内的随机数" tabindex="-1"><a class="header-anchor" href="#_3-大范围内的随机数"><span>3. 大范围内的随机数</span></a></h2><p>如果我们想要一个更广泛的数字范围，只使用其中的几个，我们需要一个不同的策略。首先，我们不能依赖于向_ArrayList_添加随机数字，因为这可能会产生重复项。**所以，我们将使用_Set_，因为它保证项目是唯一的。**然后，我们将使用_LinkedHashSet_实现，因为它保持插入顺序。</p><p><strong>这次，我们将在循环中向我们的集合添加元素，直到达到_size_。同时，我们将使用_Random_从零到_max_生成随机整数：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BigUniqueRng</span> <span class="token keyword">implements</span> <span class="token class-name">Iterator</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Random</span> random <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Set</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` generated <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">BigUniqueRng</span><span class="token punctuation">(</span><span class="token keyword">int</span> size<span class="token punctuation">,</span> <span class="token keyword">int</span> max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>generated<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Integer</span> next <span class="token operator">=</span> random<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span>max<span class="token punctuation">)</span><span class="token punctuation">;</span>
            generated<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意我们不需要检查一个数字是否已经存在于我们的集合中，因为_add()<em>会这样做。**现在，由于我们不能通过索引移除项目，我们需要_Iterator_的帮助来实现_next()</em>：**</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Iterator</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` iterator <span class="token operator">=</span> generated<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Integer</span> next <span class="token operator">=</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    iterator<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-利用java-8-特性" tabindex="-1"><a class="header-anchor" href="#_4-利用java-8-特性"><span>4. 利用Java 8+特性</span></a></h2><p>虽然自定义实现更加可重用，但我们可以使用仅使用_Stream_的解决方案。**从Java 8开始，_Random_有一个_ints()<em>方法，它返回一个_IntStream</em>。我们可以流式处理它，并强加之前的要求，如范围和限制。**让我们结合这些特性并将结果_收集_到一个_Set_中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Set</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ints</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">distinct</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">limit</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">boxed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>遍历的集合可能会产生如下输出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token operator">-</span><span class="token number">5</span> <span class="token number">13</span> <span class="token number">9</span> <span class="token operator">-</span><span class="token number">4</span> <span class="token number">14</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用_ints()_，从负整数开始的范围甚至更简单。<strong>但是，我们必须小心不要最终得到一个无限流，这将发生在我们没有调用_limit()_的情况下，例如。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们编写了几种解决方案，在两种场景下生成没有重复的随机数。首先，我们使这些类可迭代，以便我们可以轻松地消耗它们。然后，我们使用流创建了一个更自然的解决方案。</p><p>如常，源代码可在GitHub上找到。</p>`,29),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-14-Creating Random Numbers With No Duplicates in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-Creating%20Random%20Numbers%20With%20No%20Duplicates%20in%20Java.html","title":"在Java中创建没有重复的随机数","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Random Numbers","Java 8"],"head":[["meta",{"name":"keywords","content":"Java, Random Numbers, Unique, Duplicates"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-Creating%20Random%20Numbers%20With%20No%20Duplicates%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中创建没有重复的随机数"}],["meta",{"property":"og:description","content":"在Java中创建没有重复的随机数 1. 引言 在本快速教程中，我们将学习如何使用Java核心类生成没有重复的随机数。首先，我们将从头开始实现几种解决方案，然后利用Java 8+的特性来实现更可扩展的方法。 2. 小范围内的随机数 如果我们所需的数字范围较小，我们可以一直向列表中添加连续的数字，直到达到大小_n_。**然后，我们调用_Collection..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T13:06:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Random Numbers"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T13:06:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中创建没有重复的随机数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T13:06:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中创建没有重复的随机数 1. 引言 在本快速教程中，我们将学习如何使用Java核心类生成没有重复的随机数。首先，我们将从头开始实现几种解决方案，然后利用Java 8+的特性来实现更可扩展的方法。 2. 小范围内的随机数 如果我们所需的数字范围较小，我们可以一直向列表中添加连续的数字，直到达到大小_n_。**然后，我们调用_Collection..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 小范围内的随机数","slug":"_2-小范围内的随机数","link":"#_2-小范围内的随机数","children":[{"level":3,"title":"2.1. 实际应用","slug":"_2-1-实际应用","link":"#_2-1-实际应用","children":[]}]},{"level":2,"title":"3. 大范围内的随机数","slug":"_3-大范围内的随机数","link":"#_3-大范围内的随机数","children":[]},{"level":2,"title":"4. 利用Java 8+特性","slug":"_4-利用java-8-特性","link":"#_4-利用java-8-特性","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720962383000,"updatedTime":1720962383000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.37,"words":1011},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-Creating Random Numbers With No Duplicates in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本快速教程中，我们将学习如何使用Java核心类生成没有重复的随机数。<strong>首先，我们将从头开始实现几种解决方案，然后利用Java 8+的特性来实现更可扩展的方法。</strong></p>\\n<h2>2. 小范围内的随机数</h2>\\n<p>如果我们所需的数字范围较小，我们可以一直向列表中添加连续的数字，直到达到大小_n_。**然后，我们调用_Collections.shuffle()_，它具有线性时间复杂度。之后，我们将得到一个随机排序的唯一数字列表。**让我们创建一个实用工具类来生成和使用这些数字：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">UniqueRng</span> <span class=\\"token keyword\\">implements</span> <span class=\\"token class-name\\">Iterator</span>````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">&gt;</span></span>```` <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">List</span>````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">&gt;</span></span>```` numbers <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">UniqueRng</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> n<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;=</span> n<span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            numbers<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n\\n        <span class=\\"token class-name\\">Collections</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">shuffle</span><span class=\\"token punctuation\\">(</span>numbers<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
