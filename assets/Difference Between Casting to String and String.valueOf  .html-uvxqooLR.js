import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BMOUrRO4.js";const e={},p=t(`<h1 id="java中字符串转换-类型转换与string-valueof-方法的区别" tabindex="-1"><a class="header-anchor" href="#java中字符串转换-类型转换与string-valueof-方法的区别"><span>Java中字符串转换：类型转换与String.valueOf()方法的区别</span></a></h1><p>在Java中操作字符串是一项基本任务。我们经常需要将其他数据类型转换为字符串。实现这一目标的两种常见方法是将对象类型转换为String和使用String.valueOf()方法。它们在表面上可能看起来相似，但两种方法之间的一些差异可能会影响我们代码的行为。</p><p>在这个快速教程中，让我们讨论它们之间的区别。</p><p>首先，让我们看一个例子。假设我们将一个字符串值分配给一个类型为Object的变量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Object</span> obj <span class="token operator">=</span> <span class="token string">&quot;Baeldung is awesome!&quot;</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们想将obj转换为String，我们可以直接进行类型转换：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> castResult <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> obj<span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung is awesome!&quot;</span><span class="token punctuation">,</span> castResult<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，我们可以使用标准库提供的String.valueOf()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> valueOfResult <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung is awesome!&quot;</span><span class="token punctuation">,</span> valueOfResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，两种方法都按预期工作。</p><p>尽管这两种方法乍一看可能看起来相似，但它们实际上有一些显著的差异。</p><p>接下来，让我们深入探讨它们。</p><h3 id="当转换非字符串对象时" tabindex="-1"><a class="header-anchor" href="#当转换非字符串对象时"><span>当转换非字符串对象时</span></a></h3><p>我们刚刚将一个字符串值分配给了一个Object变量。将String转换和String.valueOf()可以将obj转换为String实例。</p><p>接下来，让我们<strong>将一些非字符串值分配给Object变量</strong>，看看它们是否仍然按预期工作。</p><p>首先，让我们测试将非字符串对象直接转换为String：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Object</span> obj <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">ClassCastException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span><span class="token class-name">String</span> castResult <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> obj<span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Object</span> obj2 <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;is&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;awesome&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">ClassCastException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span><span class="token class-name">String</span> castResult <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> obj2<span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们将一个整数值(42)分配给了obj，而obj2包含了一个String值的列表。正如演示的那样，当对象不是String类型时，直接转换为String会抛出ClassCastException。这是很容易理解的：<strong>由于String是一个最终类，只有我们知道对象是String或null时，转换为String才是有效的。</strong></p><p>接下来，让我们看看String.valueOf()方法是否抛出相同的异常：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> valueOfResult <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;42&quot;</span><span class="token punctuation">,</span> valueOfResult<span class="token punctuation">)</span><span class="token punctuation">;</span>

valueOfResult <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>obj2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;[Baeldung, is, awesome]&quot;</span><span class="token punctuation">,</span> valueOfResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，当我们将obj和obj2传递给String.valueOf()时，<strong>它没有抛出任何异常</strong>。相反，<strong>它将非字符串对象转换为字符串值。</strong></p><p>接下来，让我们看看String.valueOf()的实现，以了解为什么会这样：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>obj <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token string">&quot;null&quot;</span> <span class="token operator">:</span> obj<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现确实很简单。<strong>String.valueOf()方法调用输入obj的toString()方法。因此，无论obj是否是String类型，它总是返回一个字符串。</strong></p><p>此外，从String.valueOf()的实现中可以看出，该方法包含了空值检查。那么，接下来让我们看看直接转换和String.valueOf()如何处理null值。</p><h3 id="处理null值" tabindex="-1"><a class="header-anchor" href="#处理null值"><span>处理null值</span></a></h3><p>让我们首先尝试将一个null对象转换为String：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Object</span> obj <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> castResult <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> obj<span class="token punctuation">;</span>
<span class="token function">assertNull</span><span class="token punctuation">(</span>castResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如示例所示，<strong>我们通过将null值转换为String来获得一个null值。</strong></p><p>由于我们已经看到了String.valueOf()方法的实现，测试结果不会令人惊讶：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> valueOfResult <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertNotNull</span><span class="token punctuation">(</span>valueOfResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;null&quot;</span><span class="token punctuation">,</span> valueOfResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与直接转换不同，<strong>String.valueOf()永远不会返回null</strong>。<strong>如果我们传递一个null值给String.valueOf()，我们会得到字符串“null”。</strong></p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>将String转换和使用String.valueOf()都可以将非字符串数据类型转换为Java中的字符串值。在本文中，我们探讨了它们之间的区别。</p><p>接下来，让我们简要总结它们的主要区别：</p><ul><li>类型灵活性 - String.valueOf()接受任何类型的输入，并在不引发异常的情况下返回它们的字符串表示。转换，另一方面，仅限于由String或其超类型引用的String值，例如CharSequence、Object等，当使用不当时会导致ClassCastException。</li><li>null处理 - String.valueOf()优雅地处理null值，将它们转换为字符串“null”。将对象转换为String时，如果被转换的对象是null，则返回null。</li><li>可读性 - String.valueOf()在其目的上更明确，使代码更容易理解。然而，将对象转换为String可能不太清晰，并且可能被误解为尝试类型转换而不是转换为String。</li></ul><p>因此，<strong>String.valueOf()方法为将不同数据类型转换为字符串提供了更健壮的解决方案。</strong></p><p>如常，示例的完整源代码可在GitHub上找到。</p><p>发表文章后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,39),o=[p];function l(c,i){return s(),a("div",null,o)}const d=n(e,[["render",l],["__file","Difference Between Casting to String and String.valueOf  .html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/Archive/Difference%20Between%20Casting%20to%20String%20and%20String.valueOf%20%20.html","title":"Java中字符串转换：类型转换与String.valueOf()方法的区别","lang":"zh-CN","frontmatter":{"date":"2024-06-18T00:00:00.000Z","category":["Java","Programming"],"tag":["Java String","String Conversion"],"head":[["meta",{"name":"keywords","content":"Java, String, Cast, ValueOf, Conversion"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Difference%20Between%20Casting%20to%20String%20and%20String.valueOf%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中字符串转换：类型转换与String.valueOf()方法的区别"}],["meta",{"property":"og:description","content":"Java中字符串转换：类型转换与String.valueOf()方法的区别 在Java中操作字符串是一项基本任务。我们经常需要将其他数据类型转换为字符串。实现这一目标的两种常见方法是将对象类型转换为String和使用String.valueOf()方法。它们在表面上可能看起来相似，但两种方法之间的一些差异可能会影响我们代码的行为。 在这个快速教程中，让..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java String"}],["meta",{"property":"article:tag","content":"String Conversion"}],["meta",{"property":"article:published_time","content":"2024-06-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中字符串转换：类型转换与String.valueOf()方法的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中字符串转换：类型转换与String.valueOf()方法的区别 在Java中操作字符串是一项基本任务。我们经常需要将其他数据类型转换为字符串。实现这一目标的两种常见方法是将对象类型转换为String和使用String.valueOf()方法。它们在表面上可能看起来相似，但两种方法之间的一些差异可能会影响我们代码的行为。 在这个快速教程中，让..."},"headers":[{"level":3,"title":"当转换非字符串对象时","slug":"当转换非字符串对象时","link":"#当转换非字符串对象时","children":[]},{"level":3,"title":"处理null值","slug":"处理null值","link":"#处理null值","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.94,"words":1181},"filePathRelative":"posts/baeldung/Archive/Difference Between Casting to String and String.valueOf  .md","localizedDate":"2024年6月18日","excerpt":"\\n<p>在Java中操作字符串是一项基本任务。我们经常需要将其他数据类型转换为字符串。实现这一目标的两种常见方法是将对象类型转换为String和使用String.valueOf()方法。它们在表面上可能看起来相似，但两种方法之间的一些差异可能会影响我们代码的行为。</p>\\n<p>在这个快速教程中，让我们讨论它们之间的区别。</p>\\n<p>首先，让我们看一个例子。假设我们将一个字符串值分配给一个类型为Object的变量：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">Object</span> obj <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"Baeldung is awesome!\\"</span><span class=\\"token punctuation\\">;</span>\\n\\n</code></pre></div>","autoDesc":true}');export{d as comp,v as data};
