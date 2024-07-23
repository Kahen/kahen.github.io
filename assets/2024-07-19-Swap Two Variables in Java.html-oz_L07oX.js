import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-LwwahXlT.js";const t={},p=e(`<h1 id="java中交换两个变量的方法-baeldung" tabindex="-1"><a class="header-anchor" href="#java中交换两个变量的方法-baeldung"><span>Java中交换两个变量的方法 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>有时，我们可能希望在代码中交换两个变量。</p><p>在本教程中，我们将看到几种交换变量的方法，这取决于我们想要交换的变量类型。然后，我们将检查每种方法的性能。</p><h2 id="_2-简单方法-使用临时变量" tabindex="-1"><a class="header-anchor" href="#_2-简单方法-使用临时变量"><span>2. 简单方法：使用临时变量</span></a></h2><p>交换两个变量的最简单方法是使用第三个变量作为临时存储：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Object</span> a<span class="token punctuation">,</span> b<span class="token punctuation">;</span>
<span class="token class-name">Object</span> temp<span class="token punctuation">;</span>
temp <span class="token operator">=</span> a<span class="token punctuation">;</span>
a <span class="token operator">=</span> b<span class="token punctuation">;</span>
b <span class="token operator">=</span> temp<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法特别易于阅读和理解，即使是初学者也容易理解。它的主要缺点是需要一个临时变量。</p><p><strong>我们应该记住，这种方法是唯一可以交换_Object_变量的方法。</strong></p><h3 id="_2-1-为什么不在方法中交换" tabindex="-1"><a class="header-anchor" href="#_2-1-为什么不在方法中交换"><span>2.1. 为什么不在方法中交换？</span></a></h3><p>如果我们要在代码的多个地方交换变量，创建一个像下面这样的交换变量的方法可能听起来很有吸引力：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">swap</span><span class="token punctuation">(</span><span class="token class-name">Object</span> a<span class="token punctuation">,</span> <span class="token class-name">Object</span> b<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>不幸的是，这在Java中是行不通的，因为在方法调用期间对象的引用会被复制。</p><p>如果我们真的想要有一个交换方法，<strong>我们必须使用一个包装类来包装你的对象</strong>，并交换包装类中包含的对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">class</span> <span class="token class-name">Wrapper</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> string<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">swap</span><span class="token punctuation">(</span><span class="token class-name">Wrapper</span> a<span class="token punctuation">,</span> <span class="token class-name">Wrapper</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> temp <span class="token operator">=</span> b<span class="token punctuation">.</span>string<span class="token punctuation">;</span>
    b<span class="token punctuation">.</span>string <span class="token operator">=</span> a<span class="token punctuation">.</span>string<span class="token punctuation">;</span>
    a<span class="token punctuation">.</span>string <span class="token operator">=</span> temp<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这种方法，封装的_Strings_将在方法返回后仍然被交换。</p><h2 id="_3-不使用临时变量" tabindex="-1"><a class="header-anchor" href="#_3-不使用临时变量"><span>3. 不使用临时变量</span></a></h2><p>如果我们的变量是原始类型，我们可以找到不使用临时变量交换它们的方法。</p><p>让我们看几个例子。</p><h3 id="_3-1-使用算术运算" tabindex="-1"><a class="header-anchor" href="#_3-1-使用算术运算"><span>3.1. 使用算术运算</span></a></h3><p>我们可以使用数学来在不使用临时变量的情况下交换变量。对于以下示例，让我们假设我们想要交换两个整数_a=5_和_b=10_。</p><p>我们可以使用加法和减法来交换：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>a <span class="token operator">=</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>  <span class="token comment">// a = 15</span>
b <span class="token operator">=</span> a <span class="token operator">-</span> b<span class="token punctuation">;</span>  <span class="token comment">// b = 5</span>
a <span class="token operator">=</span> a <span class="token operator">-</span> b<span class="token punctuation">;</span>  <span class="token comment">// a = 10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，我们可以使用乘法和除法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>a <span class="token operator">=</span> a <span class="token operator">*</span> b<span class="token punctuation">;</span>  <span class="token comment">// a = 50</span>
b <span class="token operator">=</span> a <span class="token operator">/</span> b<span class="token punctuation">;</span>  <span class="token comment">// b = 5</span>
a <span class="token operator">=</span> a <span class="token operator">/</span> b<span class="token punctuation">;</span>  <span class="token comment">// a = 10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该记住，如果任何数字是0，这种方法就不起作用，因为第一个操作将导致存储一个零，使得算法的其余部分变得无用。此外，如果_b_=0，由于除以零，它将抛出一个_ArithmeticException_。</p><p>**我们还应该注意原始类型的容量，因为加法/乘法可能导致数字超过原始类型的最大值。**这可能导致在交换后出现错误，而不会抛出任何异常。</p><p>例如，如果_a_ = Integer.MAX_VALUE，那么在交换之前_a=2147483647_和_b=10_，交换后，<em>a=10</em>，<em>b=-1</em>。</p><p>如果我们使用_char_、_byte_或_short_类型的数据，我们需要进行显式转换，因为算术运算符的结果至少是_int_类型的值在Java中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>a <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span><span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
b <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span><span class="token punctuation">(</span>a <span class="token operator">-</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
a <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span><span class="token punctuation">(</span>a <span class="token operator">-</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-使用逻辑运算" tabindex="-1"><a class="header-anchor" href="#_3-2-使用逻辑运算"><span>3.2. 使用逻辑运算</span></a></h3><p>如果我们使用整数数据类型（即_char, short, byte, int, long_），我们可以使用异或位运算符（XOR）。“^”运算符将在我们变量的所有位上执行位异或操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>a <span class="token operator">=</span> a <span class="token operator">^</span> b<span class="token punctuation">;</span>  <span class="token comment">// a = 1111 (15)</span>
b <span class="token operator">=</span> a <span class="token operator">^</span> b<span class="token punctuation">;</span>  <span class="token comment">// b = 1010 (5)</span>
a <span class="token operator">=</span> a <span class="token operator">^</span> b<span class="token punctuation">;</span>  <span class="token comment">// a = 0101 (10)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们应该意识到，与算术运算符一样，位异或运算符返回的至少是_int_数据类型</strong>。因此，如果我们使用chars、bytes或shorts变量，我们必须对每行XOR的结果进行强制转换。</p><h3 id="_3-3-单行变体" tabindex="-1"><a class="header-anchor" href="#_3-3-单行变体"><span>3.3. 单行变体</span></a></h3><p><strong>我们可以使用交换方法的单行版本来减小代码大小：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>b <span class="token operator">=</span> <span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token punctuation">(</span>a <span class="token operator">=</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
a <span class="token operator">+=</span> b <span class="token operator">-</span> <span class="token punctuation">(</span>b <span class="token operator">=</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span>
a <span class="token operator">=</span> a <span class="token operator">*</span> b <span class="token operator">/</span> <span class="token punctuation">(</span>b <span class="token operator">=</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span>
a <span class="token operator">=</span> a <span class="token operator">^</span> b <span class="token operator">^</span> <span class="token punctuation">(</span>b <span class="token operator">=</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为表达式是根据运算符的优先级进行计算的。如果最初_a_ = 5和_b_ = 10，最后一个表达式等同于_a = 5 ^ 10 ^ (b = 5)_。第一个操作（5 ^ 10）正是多行算法的第一行，然后我们给_b_赋值为5（括号优先），最后，我们计算15 ^ 5，这正是算法的第三行。</p><h2 id="_4-性能分析" tabindex="-1"><a class="header-anchor" href="#_4-性能分析"><span>4. 性能分析</span></a></h2><p>我们刚刚看到Java中有几种交换两个变量的方法，但哪一种更有效？为了给出每种算法性能的趋势，我们执行了变量交换方法的循环，并测量了交换两个变量100,000次所需的时间。我们运行了10次测试来计算每种算法的平均执行时间。这是结果：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/05/swapping-variables-performance-tab.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这里的绝对时间并不重要，因为它取决于运行测试的机器。我们只看到一些算法比其他的慢。特别是乘法/除法，无论是单行还是多行版本，都明显更慢。相反，XOR算法在多行和单行版本中都是最有效的。</p><p>使用临时变量交换对象也非常高效，这是可以理解的，因为在那情况下只操作了指针。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了如何在Java中根据变量的类型交换两个变量。</p><p>我们描述了如何交换对象，然后我们研究了几种交换原始类型的方法和几种算法。最后，我们查看了每种方法的性能。</p><p>和往常一样，所有示例的源代码都可以在GitHub上找到。</p>`,47),o=[p];function c(l,i){return s(),n("div",null,o)}const d=a(t,[["render",c],["__file","2024-07-19-Swap Two Variables in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Swap%20Two%20Variables%20in%20Java.html","title":"Java中交换两个变量的方法 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-05-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Variables","Swap"],"head":[["meta",{"name":"keywords","content":"Java, Swap, Variables, Performance"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Swap%20Two%20Variables%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中交换两个变量的方法 | Baeldung"}],["meta",{"property":"og:description","content":"Java中交换两个变量的方法 | Baeldung 1. 概述 有时，我们可能希望在代码中交换两个变量。 在本教程中，我们将看到几种交换变量的方法，这取决于我们想要交换的变量类型。然后，我们将检查每种方法的性能。 2. 简单方法：使用临时变量 交换两个变量的最简单方法是使用第三个变量作为临时存储： 这种方法特别易于阅读和理解，即使是初学者也容易理解。它..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/05/swapping-variables-performance-tab.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T05:10:19.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Variables"}],["meta",{"property":"article:tag","content":"Swap"}],["meta",{"property":"article:published_time","content":"2022-05-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T05:10:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中交换两个变量的方法 | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/05/swapping-variables-performance-tab.png\\"],\\"datePublished\\":\\"2022-05-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T05:10:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中交换两个变量的方法 | Baeldung 1. 概述 有时，我们可能希望在代码中交换两个变量。 在本教程中，我们将看到几种交换变量的方法，这取决于我们想要交换的变量类型。然后，我们将检查每种方法的性能。 2. 简单方法：使用临时变量 交换两个变量的最简单方法是使用第三个变量作为临时存储： 这种方法特别易于阅读和理解，即使是初学者也容易理解。它..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 简单方法：使用临时变量","slug":"_2-简单方法-使用临时变量","link":"#_2-简单方法-使用临时变量","children":[{"level":3,"title":"2.1. 为什么不在方法中交换？","slug":"_2-1-为什么不在方法中交换","link":"#_2-1-为什么不在方法中交换","children":[]}]},{"level":2,"title":"3. 不使用临时变量","slug":"_3-不使用临时变量","link":"#_3-不使用临时变量","children":[{"level":3,"title":"3.1. 使用算术运算","slug":"_3-1-使用算术运算","link":"#_3-1-使用算术运算","children":[]},{"level":3,"title":"3.2. 使用逻辑运算","slug":"_3-2-使用逻辑运算","link":"#_3-2-使用逻辑运算","children":[]},{"level":3,"title":"3.3. 单行变体","slug":"_3-3-单行变体","link":"#_3-3-单行变体","children":[]}]},{"level":2,"title":"4. 性能分析","slug":"_4-性能分析","link":"#_4-性能分析","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721365819000,"updatedTime":1721365819000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.64,"words":1393},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Swap Two Variables in Java.md","localizedDate":"2022年5月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>有时，我们可能希望在代码中交换两个变量。</p>\\n<p>在本教程中，我们将看到几种交换变量的方法，这取决于我们想要交换的变量类型。然后，我们将检查每种方法的性能。</p>\\n<h2>2. 简单方法：使用临时变量</h2>\\n<p>交换两个变量的最简单方法是使用第三个变量作为临时存储：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">Object</span> a<span class=\\"token punctuation\\">,</span> b<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">Object</span> temp<span class=\\"token punctuation\\">;</span>\\ntemp <span class=\\"token operator\\">=</span> a<span class=\\"token punctuation\\">;</span>\\na <span class=\\"token operator\\">=</span> b<span class=\\"token punctuation\\">;</span>\\nb <span class=\\"token operator\\">=</span> temp<span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
