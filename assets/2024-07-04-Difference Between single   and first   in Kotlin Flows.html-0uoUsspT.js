import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-2zDpbLgD.js";const t={},l=e(`<h1 id="kotlin-中-flow-的-single-与-first-的区别" tabindex="-1"><a class="header-anchor" href="#kotlin-中-flow-的-single-与-first-的区别"><span>Kotlin 中 Flow 的 single() 与 first() 的区别</span></a></h1><p>Kotlin <em>Flows</em> 已成为现代异步编程不可或缺的一部分。它们提供了一种无缝且简洁的方式来处理异步数据流。在使用 Flows 时，两个常用的终端操作符是 <em>single()</em> 和 <em>first()</em>。尽管这两个函数乍一看可能可以互换使用，但理解它们的细微差别对于编写高效且无错误的代码至关重要。</p><p>在本教程中，我们将深入探讨 Kotlin <em>Flows</em> 中 <em>single()</em> 和 <em>first()</em> 函数的区别。</p><h3 id="_2-理解-kotlin-flows" tabindex="-1"><a class="header-anchor" href="#_2-理解-kotlin-flows"><span>2. 理解 Kotlin Flows</span></a></h3><p>在深入讨论 <em>single()</em> 和 <em>first()</em> 之前，让我们简要回顾一下 Kotlin <em>Flows</em>。一个 <em>Flow</em> 是一个异步序列，它随时间发出多个值。它们以非阻塞和高效的方式处理数据流，使它们成为响应式编程的强大工具。</p><p>以下是一些突出 Flows 重要性的关键方面：</p><ul><li>Flows 通过允许我们异步表示和处理值序列来简化异步编程。</li><li>它们提供了一种处理异步操作而不阻塞线程的方式。</li><li>Kotlin <em>Flows</em> 支持取消操作。</li><li>Flows 提供了内置的错误处理支持，允许我们传播和一致地处理错误。</li><li><strong>Flows 是基于 Kotlin 协程构建的，这意味着它们与基于协程的代码无缝集成，为异步操作提供了统一和一致的编程模型</strong>。</li></ul><h3 id="_3-使用-single-函数" tabindex="-1"><a class="header-anchor" href="#_3-使用-single-函数"><span>3. 使用 <em>single()</em> 函数</span></a></h3><p><em>single()</em> 函数从一个 <em>Flow</em> 返回第一个也是唯一的项目。如果流为空，则此函数抛出一个 <em>NoSuchElementException</em>。如果流包含多于一个项目，则此函数抛出一个 <em>IllegalArgumentException</em>。</p><p><strong>这使得 <em>single()</em> 适用于我们期望 <em>Flow</em> 发出单个值，并且任何其他值组合都应该出现错误的情况</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">testSingleValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> runBlocking <span class="token punctuation">{</span>
    <span class="token keyword">val</span> multipleValuesFlow <span class="token operator">=</span> <span class="token function">flowOf</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> singleValue <span class="token operator">=</span> multipleValuesFlow<span class="token punctuation">.</span><span class="token function">single</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">,</span> singleValue<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个代码中，我们的测试用例验证了当一个包含单个值 42 的流返回这个值时。</p><p>正如前面提到的，当 <em>Flow</em> 包含多于一个值时，<em>single()</em> 抛出异常：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">testExceptionForMultipleValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> runBlocking <span class="token punctuation">{</span>
    <span class="token keyword">val</span> multipleValues <span class="token operator">=</span> <span class="token function">flowOf</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">,</span> <span class="token number">43</span><span class="token punctuation">,</span> <span class="token number">44</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> exception <span class="token operator">=</span> assertFailsWith\`<span class="token operator">&lt;</span>IllegalArgumentException<span class="token operator">&gt;</span>\` <span class="token punctuation">{</span>
        runBlocking <span class="token punctuation">{</span>
            multipleValues<span class="token punctuation">.</span><span class="token function">single</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Flow has more than one element&quot;</span></span><span class="token punctuation">,</span> exception<span class="token punctuation">.</span>message<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<em>multipleValues</em> 包含三个项目，尝试调用它的 <em>single()</em> 将抛出一个 <em>IllegalArgumentException</em>。</p><p>接下来，我们将验证空的流抛出一个 <em>NoSuchElementException</em>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">testIllegalArgumentException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> runBlocking <span class="token punctuation">{</span>
    <span class="token keyword">val</span> emptyFlow <span class="token operator">=</span> flowOf\`\`<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> exception <span class="token operator">=</span> assertFailsWith\`\`<span class="token operator">&lt;</span>NoSuchElementException<span class="token operator">&gt;</span>\`\` <span class="token punctuation">{</span>
        runBlocking <span class="token punctuation">{</span>
            emptyFlow<span class="token punctuation">.</span><span class="token function">single</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Flow is empty&quot;</span></span><span class="token punctuation">,</span> exception<span class="token punctuation">.</span>message<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这强制执行 <em>single()</em> 仅在我们期望我们的 <em>Flow</em> 有一个值时使用，并且所有其他情况都应该出现错误。</p><h3 id="_3-1-何时使用-single-函数" tabindex="-1"><a class="header-anchor" href="#_3-1-何时使用-single-函数"><span>3.1. 何时使用 <em>single()</em> 函数</span></a></h3><p>让我们看看我们应该在什么情况下使用 <em>single()</em>：</p><ul><li>当我们期望 <em>Flow</em> 恰好发出一个项目时使用 <em>single()</em>。</li><li>我们期望非唯一发射出现错误。</li></ul><h3 id="_4-使用-first-函数" tabindex="-1"><a class="header-anchor" href="#_4-使用-first-函数"><span>4. 使用 <em>first()</em> 函数</span></a></h3><p>另一方面，<em>first()</em> 函数检索 <em>Flow</em> 发出的第一个项目。<strong>它不要求只发出一个项目；相反，它返回发出的第一个项目并完成 <em>Flow</em></strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">testFirstValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> runBlocking <span class="token punctuation">{</span>
    <span class="token keyword">val</span> multipleValuesFlow <span class="token operator">=</span> <span class="token function">flowOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> firstValue <span class="token operator">=</span> multipleValuesFlow<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> firstValue<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个代码中，我们从整数 <em>Flow</em> 中获取第一个值 <em>first()</em>，在这种情况下是一。</p><p><strong>我们还将验证空的 <em>Flow</em> 抛出一个 <em>NoSuchElementException</em></strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">testFirstValueFromEmptyFlow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> runBlocking <span class="token punctuation">{</span>
    <span class="token keyword">val</span> emptyFlow <span class="token operator">=</span> emptyFlow\`\`<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> exception <span class="token operator">=</span> assertFailsWith\`\`<span class="token operator">&lt;</span>NoSuchElementException<span class="token operator">&gt;</span>\`\` <span class="token punctuation">{</span>
        runBlocking <span class="token punctuation">{</span>
            emptyFlow<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Expected at least one element&quot;</span></span><span class="token punctuation">,</span> exception<span class="token punctuation">.</span>message<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-1-何时使用-first-函数" tabindex="-1"><a class="header-anchor" href="#_4-1-何时使用-first-函数"><span>4.1. 何时使用 <em>first()</em> 函数</span></a></h3><p>让我们看看我们应该在什么情况下使用 <em>first()</em>：</p><ul><li>当我们寻找第一个发出的项目，不管 <em>Flow</em> 可能包含多少项目时。</li><li>当我们想要处理第一个发出的项目而不需要等待 <em>Flow</em> 完成时。</li></ul><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>Flows 是处理异步数据流的强大工具，允许开发人员根据我们的特定要求选择 <em>single()</em> 和 <em>first()</em> 终端函数。区别在于如何处理包含多个值的流。<em>single()</em> 函数确保只发出一个项目，而 <em>first()</em> 函数检索初始项目而不限制流的大小。如果流为空，两个函数都会出错。</p><p>如常，这些示例的完整实现可以在 GitHub 上找到。</p>`,33),o=[l];function i(p,c){return a(),s("div",null,o)}const m=n(t,[["render",i],["__file","2024-07-04-Difference Between single   and first   in Kotlin Flows.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Difference%20Between%20single%20%20%20and%20first%20%20%20in%20Kotlin%20Flows.html","title":"Kotlin 中 Flow 的 single() 与 first() 的区别","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin"],"tag":["Kotlin Flows","single() vs first()"],"head":[["meta",{"name":"keywords","content":"Kotlin, Flows, single(), first(), asynchronous programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Difference%20Between%20single%20%20%20and%20first%20%20%20in%20Kotlin%20Flows.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin 中 Flow 的 single() 与 first() 的区别"}],["meta",{"property":"og:description","content":"Kotlin 中 Flow 的 single() 与 first() 的区别 Kotlin Flows 已成为现代异步编程不可或缺的一部分。它们提供了一种无缝且简洁的方式来处理异步数据流。在使用 Flows 时，两个常用的终端操作符是 single() 和 first()。尽管这两个函数乍一看可能可以互换使用，但理解它们的细微差别对于编写高效且无错误的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T06:55:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin Flows"}],["meta",{"property":"article:tag","content":"single() vs first()"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T06:55:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin 中 Flow 的 single() 与 first() 的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T06:55:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin 中 Flow 的 single() 与 first() 的区别 Kotlin Flows 已成为现代异步编程不可或缺的一部分。它们提供了一种无缝且简洁的方式来处理异步数据流。在使用 Flows 时，两个常用的终端操作符是 single() 和 first()。尽管这两个函数乍一看可能可以互换使用，但理解它们的细微差别对于编写高效且无错误的..."},"headers":[{"level":3,"title":"2. 理解 Kotlin Flows","slug":"_2-理解-kotlin-flows","link":"#_2-理解-kotlin-flows","children":[]},{"level":3,"title":"3. 使用 single() 函数","slug":"_3-使用-single-函数","link":"#_3-使用-single-函数","children":[]},{"level":3,"title":"3.1. 何时使用 single() 函数","slug":"_3-1-何时使用-single-函数","link":"#_3-1-何时使用-single-函数","children":[]},{"level":3,"title":"4. 使用 first() 函数","slug":"_4-使用-first-函数","link":"#_4-使用-first-函数","children":[]},{"level":3,"title":"4.1. 何时使用 first() 函数","slug":"_4-1-何时使用-first-函数","link":"#_4-1-何时使用-first-函数","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720076139000,"updatedTime":1720076139000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.6,"words":1079},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Difference Between single   and first   in Kotlin Flows.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>Kotlin <em>Flows</em> 已成为现代异步编程不可或缺的一部分。它们提供了一种无缝且简洁的方式来处理异步数据流。在使用 Flows 时，两个常用的终端操作符是 <em>single()</em> 和 <em>first()</em>。尽管这两个函数乍一看可能可以互换使用，但理解它们的细微差别对于编写高效且无错误的代码至关重要。</p>\\n<p>在本教程中，我们将深入探讨 Kotlin <em>Flows</em> 中 <em>single()</em> 和 <em>first()</em> 函数的区别。</p>\\n<h3>2. 理解 Kotlin Flows</h3>\\n<p>在深入讨论 <em>single()</em> 和 <em>first()</em> 之前，让我们简要回顾一下 Kotlin <em>Flows</em>。一个 <em>Flow</em> 是一个异步序列，它随时间发出多个值。它们以非阻塞和高效的方式处理数据流，使它们成为响应式编程的强大工具。</p>","autoDesc":true}');export{m as comp,d as data};
