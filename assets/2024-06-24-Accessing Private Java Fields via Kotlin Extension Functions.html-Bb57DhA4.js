import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C2EXT5sr.js";const e={},o=t(`<h1 id="通过-kotlin-扩展函数访问私有-java-字段" tabindex="-1"><a class="header-anchor" href="#通过-kotlin-扩展函数访问私有-java-字段"><span>通过 Kotlin 扩展函数访问私有 Java 字段</span></a></h1><hr><p>当使用 Kotlin 时，我们有时需要从 Kotlin 扩展函数中访问私有的 Java 字段。</p><p>在本教程中，我们将探讨如何从 Kotlin 扩展函数访问私有属性。我们还将看到这所涉及的挑战，以及我们有哪些变通方法来解决这个问题。</p><p>在深入之前，我们需要简要回顾一下 Kotlin 的扩展函数 API 以及 Kotlin 如何实现它们。</p><h3 id="_2-1-扩展函数-–-api" tabindex="-1"><a class="header-anchor" href="#_2-1-扩展函数-–-api"><span>2.1 扩展函数 – API</span></a></h3><p><strong>扩展函数允许我们给定类或接口添加功能，而无需修改原始实现</strong>。当我们处理外部依赖项中的类时，这些功能特别有用。例如，在 Java 中，如果我们想给 <code>String</code> 添加一个 <code>containsIgnoreCase()</code> 方法，我们不能直接做到：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StringWrapper</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> source<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">StringWrapper</span><span class="token punctuation">(</span><span class="token class-name">String</span> source<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>source <span class="token operator">=</span> source<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">containsIgnoreCase</span><span class="token punctuation">(</span><span class="token class-name">String</span> other<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>source <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> source<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> source<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们利用了装饰器设计模式。换句话说，我们在不破坏原始接口的情况下为 <code>String</code> 添加了功能。我们需要使用这样的模式，因为在 Java 中没有办法修改 <code>String</code> 类。然而，在 Kotlin 中，扩展函数可以简洁地完成这项工作：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> String<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">containsIgnoreCase</span><span class="token punctuation">(</span>target<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token operator">:</span> Boolean <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">lowercase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>target<span class="token punctuation">.</span><span class="token function">lowercase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以直接在任何 <code>String</code> 实例上调用 <code>containsIgnoreCase()</code>。然而，它带来了一些我们将在接下来讨论的缺点。</p><h3 id="_2-2-扩展函数-–-实现细节" tabindex="-1"><a class="header-anchor" href="#_2-2-扩展函数-–-实现细节"><span>2.2 扩展函数 – 实现细节</span></a></h3><p>要了解如何从扩展函数访问私有字段，让我们探索 Kotlin 如何实现扩展函数。我们都知道 Kotlin 生成的字节码与 Java 相同。然而，我们通常不能动态地向预编译类添加方法。严格来说，有一些方法可以在 Java 中使用字节码插桩来实现这一点，但这种技术要复杂得多，并不是解决这个问题的自然方式。</p><p>那么问题是：Kotlin 如何实现扩展函数？<strong>Kotlin 通过创建一个新的静态函数来实现扩展函数，该函数接受一个调用目标对象作为参数，以及所有声明的参数</strong>。例如，在我们的例子中，反编译的 Java 方法看起来像这样：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token parameter">thisString</span> - 它是 &#39;this&#39; 对象，即在原始源代码中调用函数的对象
 * <span class="token keyword">@param</span> <span class="token parameter">target</span> - 这是在源代码中传递给原始函数的参数
 */</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> <span class="token function">containsIgnoreCase</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Nullable</span> <span class="token class-name">String</span> thisString<span class="token punctuation">,</span> <span class="token annotation punctuation">@NotNull</span> <span class="token class-name">String</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这里是实现</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在所有调用 <code>containsIgnoreCase()</code> 的地方，编译器将所有调用重定向到这个静态函数。因此，Kotlin 通过生成静态实用函数并将所有适当的调用委托给该函数来实现扩展函数。</p><h2 id="_3-隐含的限制" tabindex="-1"><a class="header-anchor" href="#_3-隐含的限制"><span>3. 隐含的限制</span></a></h2><p>这种实现很棒，但带来了一个问题：如果扩展函数编译成一个静态函数，接受目标对象作为参数，我们如何访问私有成员呢？的确，由于扩展函数在字节码中不是扩展对象的函数，它<strong>不能使用目标对象的私有字段或方法。它们对扩展函数是不可见的</strong>。因此，在这方面，扩展函数与对象的其他函数不同。</p><p>因此，我们需要问<strong>如何从外部访问类的私有成员</strong>。</p><p>通常，我们使用反射来从外部访问私有成员。例如，如果我们想访问 <code>String</code> 的私有值成员，那么以下将有效：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> String<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">containsIgnoreCase</span><span class="token punctuation">(</span>target<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token operator">:</span> Boolean <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">val</span> loadedClass <span class="token operator">=</span> String<span class="token operator">::</span><span class="token keyword">class</span>
    <span class="token keyword">val</span> valueField <span class="token operator">=</span> loadedClass<span class="token punctuation">.</span>java<span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;value&quot;</span></span><span class="token punctuation">)</span>
    valueField<span class="token operator">?</span><span class="token punctuation">.</span>isAccessible <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token keyword">val</span> actualValue <span class="token operator">=</span> valueField<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token keyword">as</span><span class="token operator">?</span> ByteArray

    <span class="token function">println</span><span class="token punctuation">(</span>actualValue<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">contentToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">lowercase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>target<span class="token punctuation">.</span><span class="token function">lowercase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是从扩展函数访问私有字段的唯一方法。具体来说，它更像是一种变通方法，而不是真正的解决方案，因为私有成员通常不能从类外部访问。<strong>因此，最好避免在扩展函数中访问私有成员</strong>。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探讨了 Kotlin 如何实现扩展函数，以及它所隐含的限制。我们还回顾了从扩展函数访问原始对象的私有成员的变通方法。<strong>Java 反射 API 帮助我们解决了这个问题。然而，这是一种变通方法，通常应该避免在类外部访问私有成员</strong>。</p><p>如往常一样，本文的源代码可在 GitHub 上找到。</p>`,25),p=[o];function i(c,l){return s(),a("div",null,p)}const d=n(e,[["render",i],["__file","2024-06-24-Accessing Private Java Fields via Kotlin Extension Functions.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Accessing%20Private%20Java%20Fields%20via%20Kotlin%20Extension%20Functions.html","title":"通过 Kotlin 扩展函数访问私有 Java 字段","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Kotlin","Java"],"tag":["Extension Functions","Private Fields"],"head":[["meta",{"name":"keywords","content":"Kotlin, Java, Extension Functions, Private Fields"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Accessing%20Private%20Java%20Fields%20via%20Kotlin%20Extension%20Functions.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"通过 Kotlin 扩展函数访问私有 Java 字段"}],["meta",{"property":"og:description","content":"通过 Kotlin 扩展函数访问私有 Java 字段 当使用 Kotlin 时，我们有时需要从 Kotlin 扩展函数中访问私有的 Java 字段。 在本教程中，我们将探讨如何从 Kotlin 扩展函数访问私有属性。我们还将看到这所涉及的挑战，以及我们有哪些变通方法来解决这个问题。 在深入之前，我们需要简要回顾一下 Kotlin 的扩展函数 API 以..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T15:50:57.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Extension Functions"}],["meta",{"property":"article:tag","content":"Private Fields"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T15:50:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"通过 Kotlin 扩展函数访问私有 Java 字段\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T15:50:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"通过 Kotlin 扩展函数访问私有 Java 字段 当使用 Kotlin 时，我们有时需要从 Kotlin 扩展函数中访问私有的 Java 字段。 在本教程中，我们将探讨如何从 Kotlin 扩展函数访问私有属性。我们还将看到这所涉及的挑战，以及我们有哪些变通方法来解决这个问题。 在深入之前，我们需要简要回顾一下 Kotlin 的扩展函数 API 以..."},"headers":[{"level":3,"title":"2.1 扩展函数 – API","slug":"_2-1-扩展函数-–-api","link":"#_2-1-扩展函数-–-api","children":[]},{"level":3,"title":"2.2 扩展函数 – 实现细节","slug":"_2-2-扩展函数-–-实现细节","link":"#_2-2-扩展函数-–-实现细节","children":[]},{"level":2,"title":"3. 隐含的限制","slug":"_3-隐含的限制","link":"#_3-隐含的限制","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719244257000,"updatedTime":1719244257000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.83,"words":1149},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Accessing Private Java Fields via Kotlin Extension Functions.md","localizedDate":"2024年6月24日","excerpt":"\\n<hr>\\n<p>当使用 Kotlin 时，我们有时需要从 Kotlin 扩展函数中访问私有的 Java 字段。</p>\\n<p>在本教程中，我们将探讨如何从 Kotlin 扩展函数访问私有属性。我们还将看到这所涉及的挑战，以及我们有哪些变通方法来解决这个问题。</p>\\n<p>在深入之前，我们需要简要回顾一下 Kotlin 的扩展函数 API 以及 Kotlin 如何实现它们。</p>\\n<h3>2.1 扩展函数 – API</h3>\\n<p><strong>扩展函数允许我们给定类或接口添加功能，而无需修改原始实现</strong>。当我们处理外部依赖项中的类时，这些功能特别有用。例如，在 Java 中，如果我们想给 <code>String</code> 添加一个 <code>containsIgnoreCase()</code> 方法，我们不能直接做到：</p>","autoDesc":true}');export{d as comp,k as data};
