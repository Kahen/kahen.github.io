import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BDZ-trJf.js";const e={},p=t(`<h1 id="使用java计算整数中唯一数字的数量" tabindex="-1"><a class="header-anchor" href="#使用java计算整数中唯一数字的数量"><span>使用Java计算整数中唯一数字的数量</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在这个简短的教程中，我们将探讨如何使用Java来计算一个整数中包含的唯一数字的数量。</p><h2 id="_2-理解问题" tabindex="-1"><a class="header-anchor" href="#_2-理解问题"><span>2. 理解问题</span></a></h2><p>给定一个整数，我们的目标是计算它包含多少个不同的数字。例如，整数567890有六个不同的数字，而115577只有三个不同的数字（1、5和7）。</p><h2 id="_3-使用集合" tabindex="-1"><a class="header-anchor" href="#_3-使用集合"><span>3. 使用集合</span></a></h2><p>找到整数中唯一数字数量的最直接方式是使用集合。集合本质上可以消除重复项，这使得它们非常适合我们的需求：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">countWithSet</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    number <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Set</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>\` uniqueDigits <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> numberStr <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> digit <span class="token operator">:</span> numberStr<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        uniqueDigits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>digit<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> uniqueDigits<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们分解算法的步骤：</p><ul><li>将整数转换为字符串，以便于遍历每个数字。</li><li>遍历字符串中的每个字符并添加到<code>HashSet</code>中。</li><li>迭代完成后，<code>HashSet</code>的大小将给出唯一数字的计数。</li></ul><p>这个解决方案的时间复杂度是O(n)，其中n是整数中的数字数量。向<code>HashSet</code>中添加和检查其大小都是O(1)操作，但我们仍然需要遍历每个数字。</p><h2 id="_4-使用stream-api" tabindex="-1"><a class="header-anchor" href="#_4-使用stream-api"><span>4. 使用Stream API</span></a></h2><p>Java的Stream API提供了一种简洁现代的解决方案来计算整数中唯一数字的数量。这种方法利用了流的强大功能来处理元素序列，包括以集合的方式处理不同元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">long</span> <span class="token function">countWithStreamApi</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">chars</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">distinct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们检查涉及的步骤：</p><ul><li>将数字转换为字符串。</li><li>使用字符串的<code>chars()</code>方法获取字符流。</li><li>使用<code>distinct()</code>方法过滤掉重复的数字。</li><li>使用<code>count()</code>方法获取唯一数字的数量。</li></ul><p>时间复杂度与第一个解决方案相同。</p><h2 id="_5-使用位操作" tabindex="-1"><a class="header-anchor" href="#_5-使用位操作"><span>5. 使用位操作</span></a></h2><p>让我们探索另一种解决方案。位操作也提供了一种跟踪唯一数字的方式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">countWithBitManipulation</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    number <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> mask <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>number <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> digit <span class="token operator">=</span> number <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">;</span>
        mask <span class="token operator">|=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> digit<span class="token punctuation">;</span>
        number <span class="token operator">/=</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">bitCount</span><span class="token punctuation">(</span>mask<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次我们的代码步骤如下：</p><ul><li>初始化一个整数<code>mask</code>为0。<code>mask</code>中的每个位将代表一个0-9的数字。</li><li>遍历数字的每个数字。</li><li>对于每个数字，创建一个位表示。如果数字是d，则位表示为1&lt;&lt;d。</li><li>使用位或运算符更新<code>mask</code>。这将标记数字已被看到。</li><li>计算<code>mask</code>中设置为1的位数。这个计数就是唯一数字的数量。</li></ul><p>时间复杂度也与上述解决方案相同。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>本文提供了计算整数中唯一数字数量的不同方法及其时间复杂度。</p><p>本文的示例代码可以在GitHub上找到。</p>`,26),o=[p];function c(i,l){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-21-Count the Number of Unique Digits in an Integer using Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-21/2024-06-21-Count%20the%20Number%20of%20Unique%20Digits%20in%20an%20Integer%20using%20Java.html","title":"使用Java计算整数中唯一数字的数量","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java","数字处理"],"tag":["数字唯一性","集合","流API","位操作"],"head":[["meta",{"name":"keywords","content":"Java, 数字唯一性, 集合, 流API, 位操作"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-21/2024-06-21-Count%20the%20Number%20of%20Unique%20Digits%20in%20an%20Integer%20using%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Java计算整数中唯一数字的数量"}],["meta",{"property":"og:description","content":"使用Java计算整数中唯一数字的数量 1. 概述 在这个简短的教程中，我们将探讨如何使用Java来计算一个整数中包含的唯一数字的数量。 2. 理解问题 给定一个整数，我们的目标是计算它包含多少个不同的数字。例如，整数567890有六个不同的数字，而115577只有三个不同的数字（1、5和7）。 3. 使用集合 找到整数中唯一数字数量的最直接方式是使用集..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T15:33:20.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"数字唯一性"}],["meta",{"property":"article:tag","content":"集合"}],["meta",{"property":"article:tag","content":"流API"}],["meta",{"property":"article:tag","content":"位操作"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T15:33:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Java计算整数中唯一数字的数量\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T15:33:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Java计算整数中唯一数字的数量 1. 概述 在这个简短的教程中，我们将探讨如何使用Java来计算一个整数中包含的唯一数字的数量。 2. 理解问题 给定一个整数，我们的目标是计算它包含多少个不同的数字。例如，整数567890有六个不同的数字，而115577只有三个不同的数字（1、5和7）。 3. 使用集合 找到整数中唯一数字数量的最直接方式是使用集..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 理解问题","slug":"_2-理解问题","link":"#_2-理解问题","children":[]},{"level":2,"title":"3. 使用集合","slug":"_3-使用集合","link":"#_3-使用集合","children":[]},{"level":2,"title":"4. 使用Stream API","slug":"_4-使用stream-api","link":"#_4-使用stream-api","children":[]},{"level":2,"title":"5. 使用位操作","slug":"_5-使用位操作","link":"#_5-使用位操作","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718984000000,"updatedTime":1718984000000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.53,"words":760},"filePathRelative":"posts/baeldung/2024-06-21/2024-06-21-Count the Number of Unique Digits in an Integer using Java.md","localizedDate":"2024年6月21日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在这个简短的教程中，我们将探讨如何使用Java来计算一个整数中包含的唯一数字的数量。</p>\\n<h2>2. 理解问题</h2>\\n<p>给定一个整数，我们的目标是计算它包含多少个不同的数字。例如，整数567890有六个不同的数字，而115577只有三个不同的数字（1、5和7）。</p>\\n<h2>3. 使用集合</h2>\\n<p>找到整数中唯一数字数量的最直接方式是使用集合。集合本质上可以消除重复项，这使得它们非常适合我们的需求：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">int</span> <span class=\\"token function\\">countWithSet</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> number<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    number <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Math</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">abs</span><span class=\\"token punctuation\\">(</span>number<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">Set</span>`<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Character</span><span class=\\"token punctuation\\">&gt;</span></span>` uniqueDigits <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">HashSet</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">String</span> numberStr <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">valueOf</span><span class=\\"token punctuation\\">(</span>number<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">char</span> digit <span class=\\"token operator\\">:</span> numberStr<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toCharArray</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        uniqueDigits<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span>digit<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token keyword\\">return</span> uniqueDigits<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">size</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
