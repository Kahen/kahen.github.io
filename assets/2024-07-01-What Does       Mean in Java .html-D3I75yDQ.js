import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BX3-P94R.js";const e={},p=t(`<h1 id="java中-的含义是什么" tabindex="-1"><a class="header-anchor" href="#java中-的含义是什么"><span>Java中“-- &gt;”的含义是什么？</span></a></h1><p>当我们阅读他人的代码时，有时会看到一些有趣且新颖的方法，我们以前从未见过。了解这些技巧可以显著提高我们对代码库的理解，并鼓励我们探索对Java编程的看法。</p><p>在本教程中，我们将讨论Java中的一个有趣用法：<code>-- &gt;</code>。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>像往常一样，让我们从一个例子开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 循环中的一些处理</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>乍一看，这段代码非常简单。一个while循环重复执行一些逻辑。</p><p>然而，如果我们更仔细地看看while语句，表达式<code>i-- &gt; 0</code>是做什么的？我们可能以前没有见过<code>-- &gt;</code>运算符的使用。如果我们在Java文档中搜索，我们可以找到的最接近的运算符是lambda表达式中使用的‘-&gt;’运算符。但显然，示例中的代码与lambda表达式无关。</p><p>那么，接下来，我们首先弄清楚<code>-- &gt;</code>的作用。然后，我们将进行一个简短的测验，测试其他类似的技巧。</p><p>为了简化，我们将使用单元测试断言来展示变量值，而不是在本教程中打印它们。</p><h2 id="_3-理解" tabindex="-1"><a class="header-anchor" href="#_3-理解"><span>3. 理解‘<code>-- &gt;</code>’</span></a></h2><p>首先，<strong>(i-- &gt; 0)中的“<code>-- &gt;</code>”不是Java运算符。<strong>实际上，</strong><code>(i-- &gt; 0)</code>与<code>(i-- &gt; 0)</code>或更清晰的格式：<code>((i--) &gt; 0)</code>是相同的。</strong></p><p>因此，它执行两个操作：<strong>对i进行后减和“大于0”的检查。</strong></p><p>当我们用值6初始化变量i时，循环内会生成一系列数字：5, 4, 3, 2, 1和0。按照这个序列，i变为-1，导致循环终止：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` resultWhile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    resultWhile<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> resultWhile<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，我们可以在for循环中使用相同的技巧：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` resultFor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span> j<span class="token operator">--</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    resultFor<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> resultFor<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们已经清楚地了解了<code>-- &gt;</code>的作用。让我们在接下来的测验部分探索和试验一些类似的技巧。</p><h2 id="_4-测验时间" tabindex="-1"><a class="header-anchor" href="#_4-测验时间"><span>4. 测验时间！</span></a></h2><p>测验有四个挑战。</p><p>假设我们有一个整数列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对于每个挑战，整数列表将被重置，然后逐步在while循环中插入数字。我们的目标是<strong>确定循环执行后列表中的数字。</strong></p><p>第一个挑战是理解<code>++ </code>&lt;\`。</p><h3 id="_4-1-理解" tabindex="-1"><a class="header-anchor" href="#_4-1-理解"><span>4.1. 理解‘<code>++ &lt;</code>’</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">++</span> <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与<code>-- &gt;\`\`类似，**‘i++ </code>&lt; 5’对i进行后增，并随后与5进行比较。**由于i的初始值为-1，我们将在结果中得到0到5：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们解释另一个表达式<code>&lt; --</code>。</p><h3 id="_4-2-理解" tabindex="-1"><a class="header-anchor" href="#_4-2-理解"><span>4.2. 理解‘<code>&lt; --</code>’</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>result<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">0</span> <span class="token operator">&lt;</span> <span class="token operator">--</span>j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次，正如上面的代码所示，**将后减操作更改为预减。**因此，循环将9到1填充到列表中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，让我们看看一个类似的表达式<code>&gt;</code> ++\`。</p><h3 id="_4-3-理解" tabindex="-1"><a class="header-anchor" href="#_4-3-理解"><span>4.3. 理解 ‘<code>&gt; ++</code>’</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>result<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> n <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">6</span> <span class="token operator">&gt;</span> <span class="token operator">++</span>n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在代码片段中看到的，**‘6 &gt; ++n’在每个循环步骤中预增i，然后与6进行比较。**因此，我们将得到1到5的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，让我们看看一个看起来有点不同的挑战。</p><h3 id="_4-4-理解" tabindex="-1"><a class="header-anchor" href="#_4-4-理解"><span>4.4. 理解 ‘<code>&gt;&gt;=</code>’</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>result<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> x <span class="token operator">=</span> <span class="token number">32</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>x <span class="token operator">&gt;&gt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个挑战与其他挑战不同。<code>x &gt;&gt;= 1</code>与预/后增或预/后减无关。<strong><code>&gt;&gt;=</code>是无符号右移运算符。</strong></p><p>因此，<code>x &gt;&gt;= 1</code>右移一位，结果与x/2相同。进一步地，**<code>x &gt;&gt;= 1</code>执行移位操作，并将结果重新赋值给变量x。**考虑到x=32，结果列表包含16, 8, 4和2：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>到目前为止，我们已经完成了挑战，并理解了‘<code>-- &gt;</code>’和类似的技巧。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了Java中<code>-- &gt;</code>的作用。此外，我们通过测验，探索了一些类似的技巧。</p><p>值得指出的是，当使用这些格式时，**建议在两个运算符之间插入空格或括号。这种做法提高了代码的可读性。**例如，最好写<code>i-- &gt; 0</code>或<code>(i--) &gt; 0</code>而不是<code>i-- &gt;0</code>。</p><p>像往常一样，示例的完整源代码可以在GitHub上找到。</p>`,49),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-01-What Does       Mean in Java .html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-What%20Does%20%20%20%20%20%20%20Mean%20in%20Java%20.html","title":"Java中“-- >”的含义是什么？","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["Java","编程技巧"],"head":[["meta",{"name":"keywords","content":"Java, 编程技巧, -- > 操作符"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-What%20Does%20%20%20%20%20%20%20Mean%20in%20Java%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中“-- >”的含义是什么？"}],["meta",{"property":"og:description","content":"Java中“-- >”的含义是什么？ 当我们阅读他人的代码时，有时会看到一些有趣且新颖的方法，我们以前从未见过。了解这些技巧可以显著提高我们对代码库的理解，并鼓励我们探索对Java编程的看法。 在本教程中，我们将讨论Java中的一个有趣用法：-- >。 2. 问题介绍 像往常一样，让我们从一个例子开始： 乍一看，这段代码非常简单。一个while循环重复..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T01:53:14.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"编程技巧"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T01:53:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中“-- >”的含义是什么？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T01:53:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中“-- >”的含义是什么？ 当我们阅读他人的代码时，有时会看到一些有趣且新颖的方法，我们以前从未见过。了解这些技巧可以显著提高我们对代码库的理解，并鼓励我们探索对Java编程的看法。 在本教程中，我们将讨论Java中的一个有趣用法：-- >。 2. 问题介绍 像往常一样，让我们从一个例子开始： 乍一看，这段代码非常简单。一个while循环重复..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 理解‘-- >’","slug":"_3-理解","link":"#_3-理解","children":[]},{"level":2,"title":"4. 测验时间！","slug":"_4-测验时间","link":"#_4-测验时间","children":[{"level":3,"title":"4.1. 理解‘++ <’","slug":"_4-1-理解","link":"#_4-1-理解","children":[]},{"level":3,"title":"4.2. 理解‘< --’","slug":"_4-2-理解","link":"#_4-2-理解","children":[]},{"level":3,"title":"4.3. 理解 ‘> ++’","slug":"_4-3-理解","link":"#_4-3-理解","children":[]},{"level":3,"title":"4.4. 理解 ‘>>=’","slug":"_4-4-理解","link":"#_4-4-理解","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719798794000,"updatedTime":1719798794000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.75,"words":1126},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-What Does       Mean in Java .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>当我们阅读他人的代码时，有时会看到一些有趣且新颖的方法，我们以前从未见过。了解这些技巧可以显著提高我们对代码库的理解，并鼓励我们探索对Java编程的看法。</p>\\n<p>在本教程中，我们将讨论Java中的一个有趣用法：<code>-- &gt;</code>。</p>\\n<h2>2. 问题介绍</h2>\\n<p>像往常一样，让我们从一个例子开始：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">int</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">6</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span>i<span class=\\"token operator\\">--</span> <span class=\\"token operator\\">&gt;</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">// 循环中的一些处理</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
