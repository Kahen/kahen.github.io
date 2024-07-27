import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as l}from"./app-CBerKIce.js";const a={},s=l(`<hr><h1 id="kotlin-中-flow-的-collect-和-collectlatest-的区别" tabindex="-1"><a class="header-anchor" href="#kotlin-中-flow-的-collect-和-collectlatest-的区别"><span>Kotlin 中 Flow 的 collect() 和 collectLatest() 的区别</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Kotlin 的 <em>Flow</em>，作为 Kotlin 协程库的一部分，已经成为 Kotlin 中异步编程的重要工具。它提供了一种简洁且富有表现力的方式来处理异步数据流。在使用 Flow 收集数据时，两个常用函数是 <em>collect()</em> 和 <em>collectLatest()</em>。尽管这两个终端操作符都用于收集由 Flow 发出的数据，但它们具有不同的特性和用例。</p><p>在本教程中，我们将深入探讨 <em>collect()</em> 和 <em>collectLatest()</em> 之间的区别。</p><h2 id="_2-kotlin-flow-概述" tabindex="-1"><a class="header-anchor" href="#_2-kotlin-flow-概述"><span>2. Kotlin Flow 概述</span></a></h2><p>在深入讨论 <em>collect()</em> 和 <em>collectLatest()</em> 的具体内容之前，让我们简要回顾一下 Kotlin Flow 是什么。一个 <em>Flow</em> 是一个可以被转换、组合和反应性消费的异步值流。它是 Kotlin 协程的一部分，并提供了一种结构化和简洁的方法来处理异步数据流。</p><p>在使用 <em>Flow</em> 时，我们需要一个活动的协程上下文或 <em>suspend</em> 函数来进行大多数操作。</p><h2 id="_3-collect-的基础知识" tabindex="-1"><a class="header-anchor" href="#_3-collect-的基础知识"><span>3. <em>collect()</em> 的基础知识</span></a></h2><p><em>collect()</em> 函数是用于消费由 Flow 发出值的基本方法。<strong>调用 <em>collect()</em></strong> <strong>在 Flow 上启动收集过程，并阻塞协程直到 Flow 完成</strong>。这意味着当 Flow 发出多个值时，这个收集器会按顺序处理每个值。让我们看看 <em>collect()</em> 函数的使用，这是一个 <em>suspend</em> 函数，需要在 <em>runBlocking()</em> lambda 中使用，以便我们有一个活动的协程上下文：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    runBlocking <span class="token punctuation">{</span>
        <span class="token function">flowOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">collect</span> <span class="token punctuation">{</span> value <span class="token operator">-&gt;</span>
                <span class="token function">println</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，<em>collect()</em> 函数将按 Flow 发出的顺序打印每个值“1”，“2”和“3”。</p><h2 id="_4-理解-collectlatest" tabindex="-1"><a class="header-anchor" href="#_4-理解-collectlatest"><span>4. 理解 <em>collectLatest()</em></span></a></h2><p><em>collectLatest()</em> 函数引入了不同的行为。与 <em>collect()</em> 不同，<strong><em>collectLatest()</em> 取消或忽略 Flow 中的早期值，并仅优先考虑最近发出的值</strong>。</p><p>像之前的示例一样，我们需要将 <em>collectLatest()</em> 的使用封装在 <em>runBlocking()</em> 中以提供协程上下文：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    runBlocking <span class="token punctuation">{</span>
        <span class="token function">flowOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">collectLatest</span> <span class="token punctuation">{</span> value <span class="token operator">-&gt;</span>
                <span class="token function">println</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，如果 Flow 快速连续发出值“1”，“2”和“3”，<em>collectLatest()</em> 将忽略除“3”之外的所有值，因为处理值“1”和“2”将被取消。这意味着只有“3”会被打印。<em>runBlocking()</em> lambda 将我们的代码封装在协程上下文中，因为 <em>collectLatest()</em> 是一个 <em>suspend</em> 函数。</p><h2 id="_5-使用考虑" tabindex="-1"><a class="header-anchor" href="#_5-使用考虑"><span>5. 使用考虑</span></a></h2><p>选择 <em>collect()</em> 和 <em>collectLatest()</em> 可以影响我们应用程序的性能。如果处理每个发出的值至关重要且顺序重要，则 <em>collect()</em> 是更好的选择。另一方面，如果我们处理的是快速变化的数据，并且只关心最新值，则 <em>collectLatest()</em> 可以通过取消不必要的处理来帮助提高效率。</p><p>一个现实世界的数据集可以帮助说明这些差异，如果我们正在构建一个温度站。我们会使用 <em>collect()</em> 获取所有温度以显示时间图。而我们会使用 <em>collectLatest()</em> 仅获取当前温度。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>Kotlin <em>Flow</em> 是 Kotlin 协程库的强大组件。它提供了一种有效的方式来处理异步数据流。<em>collect()</em> 函数允许按顺序处理每个发出的值并阻塞协程直到 Flow 完成。另一方面，<em>collectLatest()</em> 独特地取消 Flow 中的先前值，仅优先考虑最近发出的值。当优先考虑最新发出的值并丢弃不必要的处理时，这个特性特别有利。</p><p>如往常一样，这些示例的完整实现可以在 GitHub 上找到。</p>`,23),o=[s];function c(i,p){return n(),t("div",null,o)}const u=e(a,[["render",c],["__file","2024-07-17-Difference Between collect   and collectLatest   in Kotlin Flows.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Difference%20Between%20collect%20%20%20and%20collectLatest%20%20%20in%20Kotlin%20Flows.html","title":"Kotlin 中 Flow 的 collect() 和 collectLatest() 的区别","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Coroutines"],"tag":["Kotlin Flow","collect()","collectLatest()"],"head":[["meta",{"name":"keywords","content":"Kotlin, Coroutines, Flow, collect(), collectLatest()"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Difference%20Between%20collect%20%20%20and%20collectLatest%20%20%20in%20Kotlin%20Flows.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin 中 Flow 的 collect() 和 collectLatest() 的区别"}],["meta",{"property":"og:description","content":"Kotlin 中 Flow 的 collect() 和 collectLatest() 的区别 1. 引言 Kotlin 的 Flow，作为 Kotlin 协程库的一部分，已经成为 Kotlin 中异步编程的重要工具。它提供了一种简洁且富有表现力的方式来处理异步数据流。在使用 Flow 收集数据时，两个常用函数是 collect() 和 collect..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T04:27:40.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin Flow"}],["meta",{"property":"article:tag","content":"collect()"}],["meta",{"property":"article:tag","content":"collectLatest()"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T04:27:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin 中 Flow 的 collect() 和 collectLatest() 的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T04:27:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin 中 Flow 的 collect() 和 collectLatest() 的区别 1. 引言 Kotlin 的 Flow，作为 Kotlin 协程库的一部分，已经成为 Kotlin 中异步编程的重要工具。它提供了一种简洁且富有表现力的方式来处理异步数据流。在使用 Flow 收集数据时，两个常用函数是 collect() 和 collect..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. Kotlin Flow 概述","slug":"_2-kotlin-flow-概述","link":"#_2-kotlin-flow-概述","children":[]},{"level":2,"title":"3. collect() 的基础知识","slug":"_3-collect-的基础知识","link":"#_3-collect-的基础知识","children":[]},{"level":2,"title":"4. 理解 collectLatest()","slug":"_4-理解-collectlatest","link":"#_4-理解-collectlatest","children":[]},{"level":2,"title":"5. 使用考虑","slug":"_5-使用考虑","link":"#_5-使用考虑","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721190460000,"updatedTime":1721190460000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.1,"words":931},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Difference Between collect   and collectLatest   in Kotlin Flows.md","localizedDate":"2022年11月1日","excerpt":"<hr>\\n<h1>Kotlin 中 Flow 的 collect() 和 collectLatest() 的区别</h1>\\n<h2>1. 引言</h2>\\n<p>Kotlin 的 <em>Flow</em>，作为 Kotlin 协程库的一部分，已经成为 Kotlin 中异步编程的重要工具。它提供了一种简洁且富有表现力的方式来处理异步数据流。在使用 Flow 收集数据时，两个常用函数是 <em>collect()</em> 和 <em>collectLatest()</em>。尽管这两个终端操作符都用于收集由 Flow 发出的数据，但它们具有不同的特性和用例。</p>\\n<p>在本教程中，我们将深入探讨 <em>collect()</em> 和 <em>collectLatest()</em> 之间的区别。</p>","autoDesc":true}');export{u as comp,d as data};
