import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-D1jsmMBg.js";const t={},p=e(`<h1 id="java-中的-yield-关键字指南" tabindex="-1"><a class="header-anchor" href="#java-中的-yield-关键字指南"><span>Java 中的 yield 关键字指南</span></a></h1><ol><li>概述 在Java的早期版本中，我们经常使用_switch_语句来将一个值转换为另一个值。这通常需要我们将_switch_嵌入到一个单独的函数中，并从每个_case_使用_return_语句，或者需要我们从每个_case_分配一个临时变量以供函数稍后使用。 自Java 14起，_switch_表达式中的_yield_关键字为我们提供了一种更好的方法。 <em>yield_关键字允许我们通过返回一个值来退出_switch_表达式，该值成为_switch_表达式的值。 这意味着我们可以将_switch_表达式的值分配给一个变量。 最后，通过在_switch_表达式中使用_yield</em>，我们得到了一个隐式检查，以确保我们覆盖了我们的案例，这使我们的代码更加健壮。 让我们看一些例子。</li></ol><p>2.1 使用箭头操作符的 <em>yield</em> 首先，假设我们有以下_enum_和_switch_语句：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">Number</span> <span class="token punctuation">{</span>
    <span class="token constant">ONE</span><span class="token punctuation">,</span> <span class="token constant">TWO</span><span class="token punctuation">,</span> <span class="token constant">THREE</span><span class="token punctuation">,</span> <span class="token constant">FOUR</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">String</span> message<span class="token punctuation">;</span>
<span class="token keyword">switch</span> <span class="token punctuation">(</span>number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token constant">ONE</span><span class="token operator">:</span>
        message <span class="token operator">=</span> <span class="token string">&quot;Got a 1&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token constant">TWO</span><span class="token operator">:</span>
        message <span class="token operator">=</span> <span class="token string">&quot;Got a 2&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
        message <span class="token operator">=</span> <span class="token string">&quot;More than 2&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们将其转换为_switch_表达式，并使用箭头操作符和_yield_关键字：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> message <span class="token operator">=</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token constant">ONE</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">yield</span> <span class="token string">&quot;Got a 1&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">case</span> <span class="token constant">TWO</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">yield</span> <span class="token string">&quot;Got a 2&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">yield</span> <span class="token string">&quot;More than 2&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_yield_根据_number_的值设置_switch_表达式的值。</p><p>2.2 使用冒号分隔符的 <em>yield</em> 我们还可以使用冒号分隔符创建使用_yield_的_switch_表达式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> message <span class="token operator">=</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token constant">ONE</span><span class="token operator">:</span>
        <span class="token keyword">yield</span> <span class="token string">&quot;Got a 1&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token constant">TWO</span><span class="token operator">:</span>
        <span class="token keyword">yield</span> <span class="token string">&quot;Got a 2&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token keyword">yield</span> <span class="token string">&quot;More than 2&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码的行为与前一节相同。但是，箭头操作符更清晰，也不太可能忘记_yield_（或_break_）语句。 我们应该注意，我们不能在同一个_switch_表达式中混合使用冒号和箭头分隔符。</p><ol start="3"><li>穷尽性 使用_switch_表达式和_yield_的另一个好处是，如果我们缺少案例覆盖，我们将看到一个编译错误。让我们从箭头操作符_switch_表达式中删除_default_案例来看看：</li></ol><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> message <span class="token operator">=</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token constant">ONE</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">yield</span> <span class="token string">&quot;Got a 1&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">case</span> <span class="token constant">TWO</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">yield</span> <span class="token string">&quot;Got a 2&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码在_number_上给出了一个错误：“<em>switch_表达式没有覆盖所有可能的输入值</em>”。 我们可以将_default_案例加回去，或者我们可以特别覆盖_number_的其余可能值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> message <span class="token operator">=</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token constant">ONE</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">yield</span> <span class="token string">&quot;Got a 1&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">case</span> <span class="token constant">TWO</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">yield</span> <span class="token string">&quot;Got a 2&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">case</span> <span class="token constant">THREE</span><span class="token punctuation">,</span> <span class="token constant">FOUR</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">yield</span> <span class="token string">&quot;More than 2&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_switch_表达式强制我们的案例覆盖是穷尽的。</p><ol start="4"><li>结论 在本文中，我们探讨了Java中的_yield_关键字，它的用法以及它的一些好处。 如常，我们示例的完整源代码可以在GitHub上找到。</li></ol>`,16),o=[p];function i(c,l){return s(),a("div",null,o)}const u=n(t,[["render",i],["__file","2024-07-02-Guide to the yield Keyword in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Guide%20to%20the%20yield%20Keyword%20in%20Java.html","title":"Java 中的 yield 关键字指南","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["yield","switch","Java 14"],"head":[["meta",{"name":"keywords","content":"Java, yield, switch expression, Java 14, Baeldung"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Guide%20to%20the%20yield%20Keyword%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 中的 yield 关键字指南"}],["meta",{"property":"og:description","content":"Java 中的 yield 关键字指南 概述 在Java的早期版本中，我们经常使用_switch_语句来将一个值转换为另一个值。这通常需要我们将_switch_嵌入到一个单独的函数中，并从每个_case_使用_return_语句，或者需要我们从每个_case_分配一个临时变量以供函数稍后使用。 自Java 14起，_switch_表达式中的_yield..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T03:33:12.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"yield"}],["meta",{"property":"article:tag","content":"switch"}],["meta",{"property":"article:tag","content":"Java 14"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T03:33:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 中的 yield 关键字指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T03:33:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 中的 yield 关键字指南 概述 在Java的早期版本中，我们经常使用_switch_语句来将一个值转换为另一个值。这通常需要我们将_switch_嵌入到一个单独的函数中，并从每个_case_使用_return_语句，或者需要我们从每个_case_分配一个临时变量以供函数稍后使用。 自Java 14起，_switch_表达式中的_yield..."},"headers":[],"git":{"createdTime":1719891192000,"updatedTime":1719891192000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.41,"words":723},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Guide to the yield Keyword in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<ol>\\n<li>概述\\n在Java的早期版本中，我们经常使用_switch_语句来将一个值转换为另一个值。这通常需要我们将_switch_嵌入到一个单独的函数中，并从每个_case_使用_return_语句，或者需要我们从每个_case_分配一个临时变量以供函数稍后使用。\\n自Java 14起，_switch_表达式中的_yield_关键字为我们提供了一种更好的方法。\\n<em>yield_关键字允许我们通过返回一个值来退出_switch_表达式，该值成为_switch_表达式的值。\\n这意味着我们可以将_switch_表达式的值分配给一个变量。\\n最后，通过在_switch_表达式中使用_yield</em>，我们得到了一个隐式检查，以确保我们覆盖了我们的案例，这使我们的代码更加健壮。\\n让我们看一些例子。</li>\\n</ol>","autoDesc":true}');export{u as comp,k as data};
