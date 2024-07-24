import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-B6f8H54y.js";const p={},e=t(`<h1 id="仅当所有optional变量都可用时执行操作-baeldung" tabindex="-1"><a class="header-anchor" href="#仅当所有optional变量都可用时执行操作-baeldung"><span>仅当所有Optional变量都可用时执行操作 | Baeldung</span></a></h1><p>介绍</p><p>空引用和空值多年来一直困扰着程序员。空引用的发明者Tony Hoare曾称他的发明是一个“价值十亿美元的错误”。特别是Java，一直在与空值和可怕的_NullPointerException_作斗争。</p><p>Java 8引入了_Optional_类来解决这一挑战，并确保正确处理空和空结果。在本教程中，我们将探讨仅当所有_Optional_变量都包含值时才执行操作，否则忽略该操作。</p><p>假设</p><p>本教程演示了使用三个_Optional_变量，但这些概念可以很容易地扩展到处理更多变量。此外，让我们声明这些变量，我们将在本文中使用它们：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Jean-Luc Picard&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> designation <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Captain&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> ship <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;USS Enterprise D&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，为了简化，我们定义了_Optional<code>&lt;String&gt;</code>_。尽管如此，文章中讨论的原则同样适用于其他引用类型。</p><p>使用_isPresent()_</p><p><em>Optional_提供了一个有用的方法_isPresent()</em>，用于确定是否包含值。如果存在值则返回true，如果_Optional_为空则返回false。让我们看看实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">var</span> action <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>name<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> designation<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> ship<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    action <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们使用_Optional.of()<em>创建了_Optional_实例。随后，我们在每个实例上使用_isPresent()</em>，并且仅当所有值都存在时才采取行动。<strong>虽然这种方法非常简单易读，但在处理多个变量时会变得繁琐。</strong></p><p>使用_flatMap()_和_map()</p><p>Java 8将函数式编程概念引入了语言。有了像_flatMap()_和_map()<em>这样的方法，我们现在可以在容器类型中执行操作，例如_Optional</em>。利用_flatMap()<em>和_map()</em>，我们可以有效地检查并在所有值都存在时执行操作。</p><p>让我们看看使用这种方法的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">var</span> action <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>n <span class="token operator">-&gt;</span> designation<span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>d <span class="token operator">-&gt;</span> ship<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>action<span class="token punctuation">,</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们使用_flatMap()_和_map()_链接了各种_Optional_实例。<strong>这些函数设计为短路；如果在链中的任何步骤中不存在值，则操作立即终止，并返回空结果。</strong></p><p>我们可以通过引入另一个测试用例来验证这种行为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Jean-Luc Picard&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> designation <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Captain&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> ship <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> action <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>n <span class="token operator">-&gt;</span> designation<span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>d <span class="token operator">-&gt;</span> ship<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>action<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以看到_action_变量为空，因为ship没有值。</p><p>虽然这种方法很强大，但当需要链接许多值时，它往往会变得更加冗长。</p><p>使用_ifPresent()_</p><p>或者，<strong>当我们不需要返回值，并且仅在所有值都存在时才执行操作时，我们可以利用_ifPresent()_和lambda表达式</strong>。让我们看看示例代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>name<span class="token punctuation">.</span><span class="token function">ifPresent</span><span class="token punctuation">(</span>n <span class="token operator">-&gt;</span> designation<span class="token punctuation">.</span><span class="token function">ifPresent</span><span class="token punctuation">(</span>d <span class="token operator">-&gt;</span> ship<span class="token punctuation">.</span><span class="token function">ifPresent</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Perform action instead!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这种情况下，我们使用_ifPresent()_链接每个_Optional_实例，并仅当所有值都存在时执行操作。</p><p>使用_Stream.of()_</p><p>Java Streams提供了另一种确保仅在所有值都存在时才执行操作的方法。我们可以使用_Stream.of()_创建一个_Optional_值的流，并使用_allMatch()_方法检查流中的每个元素是否包含值。</p><p>让我们看看实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">var</span> status <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> allPresent <span class="token operator">=</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> designation<span class="token punctuation">,</span> ship<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">allMatch</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token operator">::</span><span class="token function">isPresent</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>allPresent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果所有值都存在，则执行操作</span>
    status <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<strong>我们使用_allMatch()_和_Optional.isPresent()_来验证流中的所有元素是否存在</strong>。</p><p>这提供了一种简洁的方式来执行所需的验证。与其他方法不同，添加更多的可选值不会降低可读性。这使得_Streams_成为处理越来越多的可选值的高可扩展解决方案。</p><p>结论</p><p>在本教程中，我们探讨了仅当所有可选值都可用时执行操作的不同方法。我们首先检查了简单的_if…else_条件，然后探索了利用函数式编程概念和Streams API的替代技术。最终，最合适的方法取决于手头具体情况的具体背景。</p><p>正如往常一样，本文中使用的示例代码可在GitHub上获得。</p><p>文章发布后的30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。</p>`,35),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","Perform Action Only if All Optionals Are Available.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Perform%20Action%20Only%20if%20All%20Optionals%20Are%20Available.html","title":"仅当所有Optional变量都可用时执行操作 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-16T00:00:00.000Z","category":["Java","Programming"],"tag":["Java 8","Optional","Functional Programming"],"description":"仅当所有Optional变量都可用时执行操作 | Baeldung 介绍 空引用和空值多年来一直困扰着程序员。空引用的发明者Tony Hoare曾称他的发明是一个“价值十亿美元的错误”。特别是Java，一直在与空值和可怕的_NullPointerException_作斗争。 Java 8引入了_Optional_类来解决这一挑战，并确保正确处理空和空结...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Perform%20Action%20Only%20if%20All%20Optionals%20Are%20Available.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"仅当所有Optional变量都可用时执行操作 | Baeldung"}],["meta",{"property":"og:description","content":"仅当所有Optional变量都可用时执行操作 | Baeldung 介绍 空引用和空值多年来一直困扰着程序员。空引用的发明者Tony Hoare曾称他的发明是一个“价值十亿美元的错误”。特别是Java，一直在与空值和可怕的_NullPointerException_作斗争。 Java 8引入了_Optional_类来解决这一挑战，并确保正确处理空和空结..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"Optional"}],["meta",{"property":"article:tag","content":"Functional Programming"}],["meta",{"property":"article:published_time","content":"2024-06-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"仅当所有Optional变量都可用时执行操作 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.74,"words":1121},"filePathRelative":"posts/baeldung/Archive/Perform Action Only if All Optionals Are Available.md","localizedDate":"2024年6月16日","excerpt":"\\n<p>介绍</p>\\n<p>空引用和空值多年来一直困扰着程序员。空引用的发明者Tony Hoare曾称他的发明是一个“价值十亿美元的错误”。特别是Java，一直在与空值和可怕的_NullPointerException_作斗争。</p>\\n<p>Java 8引入了_Optional_类来解决这一挑战，并确保正确处理空和空结果。在本教程中，我们将探讨仅当所有_Optional_变量都包含值时才执行操作，否则忽略该操作。</p>\\n<p>假设</p>\\n<p>本教程演示了使用三个_Optional_变量，但这些概念可以很容易地扩展到处理更多变量。此外，让我们声明这些变量，我们将在本文中使用它们：</p>","autoDesc":true}');export{k as comp,d as data};
