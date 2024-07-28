import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-D4B8YWfq.js";const t={},o=e(`<h1 id="java中整数除法得到浮点数结果" tabindex="-1"><a class="header-anchor" href="#java中整数除法得到浮点数结果"><span>Java中整数除法得到浮点数结果</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在Java中，我们可以使用除法运算符（/）来将左侧的值除以右侧的值。例如，<code>int number = 10 / 5</code>。</p><p>在这个快速教程中，我们将探讨如何从整数除法操作中得到一个浮点数结果。</p><h2 id="_2-问题的介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题的介绍"><span>2. 问题的介绍</span></a></h2><p>首先，为了简单起见，我们将在这个教程中使用单元测试断言来验证计算结果。</p><p>我们可能已经意识到，当我们像<code>a/b</code>这样对两个整数应用除法运算符时，即使<code>a</code>不能被<code>b</code>整除，它总是返回一个整数，例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。所以，<code>10 / 4</code>产生的是2而不是2.5。而且，即使我们将计算结果赋值给一个浮点变量，结果仍然是两个：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">float</span> x <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么接下来，我们首先理解为什么会这样，然后找出如何得到我们想要的浮点结果，例如在这种情况下的2.5。</p><h2 id="_3-为什么java中两个整数的除法总是得到一个整数" tabindex="-1"><a class="header-anchor" href="#_3-为什么java中两个整数的除法总是得到一个整数"><span>3. 为什么Java中两个整数的除法总是得到一个整数？</span></a></h2><p>为了理解为什么<code>10 / 4 = 2</code>在Java中，我们需要查看JLS（Java语言规范）中的除法运算符部分，了解除法运算符的行为是如何定义的。</p><p>首先，规范指出整数除法是向零舍入的。换句话说，两个整数的除法操作的结果只包括商值，不包括余数。</p><p>因此，当我们计算<code>10 / 4</code>时，我们得到2而不是2.5。</p><p>接下来，让我们看看如果两个整数不能整除，如何得到预期的浮点结果。</p><p>现在我们已经了解了两个整数的除法运算符是如何工作的。JLS还在二元数值提升中定义了原始操作数转换规则。</p><p><strong>二元数值提升在<code>*</code>、<code>/</code>和<code>%</code>运算符上执行</strong>。因此，除法操作遵循操作数转换规则。</p><p>那么接下来，让我们仔细看看操作数转换规则。</p><p>根据JLS，当我们计算<code>a/b</code>时：</p><ul><li>如果任一操作数是<code>double</code>类型，另一个将被转换为<code>double</code>。</li><li>否则，如果任一操作数是<code>float</code>类型，另一个将被转换为<code>float</code>。</li><li>否则，如果任一操作数是<code>long</code>类型，另一个将被转换为<code>long</code>。</li><li>否则，两个操作数都被转换为<code>int</code>类型。</li></ul><p>根据上述规则，如果我们想要使<code>a/b</code>操作的结果是一个浮点数，至少一个操作数应该是<code>float</code>类型。</p><p>那么接下来，让我们看看当我们将一个操作数强制转换为<code>float</code>时，我们是否可以得到预期的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">float</span> x <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span> <span class="token number">10</span> <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2.5</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">float</span> y <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span> <span class="token number">8</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1.25</span><span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行上述测试，它会通过。因此，<strong>将任何操作数强制转换为<code>float</code>可以使除法产生浮点结果</strong>。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇文章中，我们讨论了为什么Java中整数的除法总是得到整数。</p><p>此外，我们解决了如何从整数除法中得到预期的浮点结果。这在不可整除的情况下特别有用。</p><p>像往常一样，文章中展示的所有代码片段都可以在GitHub上找到。--- date: 2022-04-01 category:</p><ul><li>Java tag:</li><li>Java</li><li>整数除法</li><li>浮点数结果 head:</li><li><ul><li>meta</li><li>name: keywords content: Java, 整数除法, 浮点数结果, 编程技巧</li></ul></li></ul><hr><h1 id="java中整数除法得到浮点数结果-1" tabindex="-1"><a class="header-anchor" href="#java中整数除法得到浮点数结果-1"><span>Java中整数除法得到浮点数结果</span></a></h1><h2 id="_1-概述-1" tabindex="-1"><a class="header-anchor" href="#_1-概述-1"><span>1. 概述</span></a></h2><p>在Java中，我们可以使用除法运算符（/）来将左侧的值除以右侧的值。例如，<code>int number = 10 / 5</code>。</p><p>在这个快速教程中，我们将探讨如何从整数除法操作中得到一个浮点数结果。</p><h2 id="_2-问题的介绍-1" tabindex="-1"><a class="header-anchor" href="#_2-问题的介绍-1"><span>2. 问题的介绍</span></a></h2><p>首先，为了简单起见，我们将在这个教程中使用单元测试断言来验证计算结果。</p><p>我们可能已经意识到，当我们像<code>a/b</code>这样对两个整数应用除法运算符时，即使<code>a</code>不能被<code>b</code>整除，它总是返回一个整数，例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。所以，<code>10 / 4</code>产生的是2而不是2.5。而且，即使我们将计算结果赋值给一个浮点变量，结果仍然是两个：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">float</span> x <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>那么接下来，我们首先理解为什么会这样，然后找出如何得到我们想要的浮点结果，例如在这种情况下的2.5。</p><h2 id="_3-为什么java中两个整数的除法总是得到一个整数-1" tabindex="-1"><a class="header-anchor" href="#_3-为什么java中两个整数的除法总是得到一个整数-1"><span>3. 为什么Java中两个整数的除法总是得到一个整数？</span></a></h2><p>为了理解为什么<code>10 / 4 = 2</code>在Java中，我们需要查看JLS（Java语言规范）中的除法运算符部分，了解除法运算符的行为是如何定义的。</p><p>首先，规范指出整数除法是向零舍入的。换句话说，两个整数的除法操作的结果只包括商值，不包括余数。</p><p>因此，当我们计算<code>10 / 4</code>时，我们得到2而不是2.5。</p><p>接下来，让我们看看如果两个整数不能整除，如何得到预期的浮点结果。</p><p>现在我们已经了解了两个整数的除法运算符是如何工作的。JLS还在二元数值提升中定义了原始操作数转换规则。</p><p><strong>二元数值提升在<code>*</code>、<code>/</code>和<code>%</code>运算符上执行</strong>。因此，除法操作遵循操作数转换规则。</p><p>那么接下来，让我们仔细看看操作数转换规则。</p><p>根据JLS，当我们计算<code>a/b</code>时：</p><ul><li>如果任一操作数是<code>double</code>类型，另一个将被转换为<code>double</code>。</li><li>否则，如果任一操作数是<code>float</code>类型，另一个将被转换为<code>float</code>。</li><li>否则，如果任一操作数是<code>long</code>类型，另一个将被转换为<code>long</code>。</li><li>否则，两个操作数都被转换为<code>int</code>类型。</li></ul><p>根据上述规则，如果我们想要使<code>a/b</code>操作的结果是一个浮点数，至少一个操作数应该是<code>float</code>类型。</p><p>那么接下来，让我们看看当我们将一个操作数强制转换为<code>float</code>时，我们是否可以得到预期的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">float</span> x <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span> <span class="token number">10</span> <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2.5</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">float</span> y <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span> <span class="token number">8</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1.25</span><span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行上述测试，它会通过。因此，<strong>将任何操作数强制转换为<code>float</code>可以使除法产生浮点结果</strong>。</p><h2 id="_5-结论-1" tabindex="-1"><a class="header-anchor" href="#_5-结论-1"><span>5. 结论</span></a></h2><p>在这篇文章中，我们讨论了为什么Java中整数的除法总是得到整数。</p><p>此外，我们解决了如何从整数除法中得到预期的浮点结果。这在不可整除的情况下特别有用。</p><p>像往常一样，文章中展示的所有代码片段都可以在GitHub上找到。</p><p>OK</p>`,61),p=[o];function c(l,i){return s(),n("div",null,p)}const u=a(t,[["render",c],["__file","2024-07-15-Make Division of Two Integers Result in a Float.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-15/2024-07-15-Make%20Division%20of%20Two%20Integers%20Result%20in%20a%20Float.html","title":"Java中整数除法得到浮点数结果","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["Java","整数除法","浮点数结果"],"head":[["meta",{"name":"keywords","content":"Java, 整数除法, 浮点数结果, 编程技巧"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-15/2024-07-15-Make%20Division%20of%20Two%20Integers%20Result%20in%20a%20Float.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中整数除法得到浮点数结果"}],["meta",{"property":"og:description","content":"Java中整数除法得到浮点数结果 1. 概述 在Java中，我们可以使用除法运算符（/）来将左侧的值除以右侧的值。例如，int number = 10 / 5。 在这个快速教程中，我们将探讨如何从整数除法操作中得到一个浮点数结果。 2. 问题的介绍 首先，为了简单起见，我们将在这个教程中使用单元测试断言来验证计算结果。 我们可能已经意识到，当我们像a/..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-15T04:06:11.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"整数除法"}],["meta",{"property":"article:tag","content":"浮点数结果"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-15T04:06:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中整数除法得到浮点数结果\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-15T04:06:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中整数除法得到浮点数结果 1. 概述 在Java中，我们可以使用除法运算符（/）来将左侧的值除以右侧的值。例如，int number = 10 / 5。 在这个快速教程中，我们将探讨如何从整数除法操作中得到一个浮点数结果。 2. 问题的介绍 首先，为了简单起见，我们将在这个教程中使用单元测试断言来验证计算结果。 我们可能已经意识到，当我们像a/..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题的介绍","slug":"_2-问题的介绍","link":"#_2-问题的介绍","children":[]},{"level":2,"title":"3. 为什么Java中两个整数的除法总是得到一个整数？","slug":"_3-为什么java中两个整数的除法总是得到一个整数","link":"#_3-为什么java中两个整数的除法总是得到一个整数","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":2,"title":"1. 概述","slug":"_1-概述-1","link":"#_1-概述-1","children":[]},{"level":2,"title":"2. 问题的介绍","slug":"_2-问题的介绍-1","link":"#_2-问题的介绍-1","children":[]},{"level":2,"title":"3. 为什么Java中两个整数的除法总是得到一个整数？","slug":"_3-为什么java中两个整数的除法总是得到一个整数-1","link":"#_3-为什么java中两个整数的除法总是得到一个整数-1","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论-1","link":"#_5-结论-1","children":[]}],"git":{"createdTime":1721016371000,"updatedTime":1721016371000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.98,"words":1793},"filePathRelative":"posts/baeldung/2024-07-15/2024-07-15-Make Division of Two Integers Result in a Float.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在Java中，我们可以使用除法运算符（/）来将左侧的值除以右侧的值。例如，<code>int number = 10 / 5</code>。</p>\\n<p>在这个快速教程中，我们将探讨如何从整数除法操作中得到一个浮点数结果。</p>\\n<h2>2. 问题的介绍</h2>\\n<p>首先，为了简单起见，我们将在这个教程中使用单元测试断言来验证计算结果。</p>\\n<p>我们可能已经意识到，当我们像<code>a/b</code>这样对两个整数应用除法运算符时，即使<code>a</code>不能被<code>b</code>整除，它总是返回一个整数，例如：</p>\\n","autoDesc":true}');export{u as comp,v as data};
