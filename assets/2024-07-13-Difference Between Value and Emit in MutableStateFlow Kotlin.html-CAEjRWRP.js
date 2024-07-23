import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as e}from"./app-LwwahXlT.js";const s={},l=e(`<h1 id="kotlin中mutablestateflow的value属性与emit-函数的区别-baeldung关于kotlin" tabindex="-1"><a class="header-anchor" href="#kotlin中mutablestateflow的value属性与emit-函数的区别-baeldung关于kotlin"><span>Kotlin中MutableStateFlow的value属性与emit()函数的区别 | Baeldung关于Kotlin</span></a></h1><p>Kotlin的_Flow_ API通过提供一种强大而简洁的方式来处理数据流，彻底改变了异步编程。这个API的一个关键组件是_MutableStateFlow_，这是一个可变状态持有者，它向其收集器发出值。然而，当开发者在_MutableStateFlow_的上下文中遇到_value_属性和_emit()_函数时，常常会感到困惑。</p><p>在本教程中，我们将深入探讨_value_和_emit()_之间的区别。</p><h3 id="_2-理解-mutablestateflow" tabindex="-1"><a class="header-anchor" href="#_2-理解-mutablestateflow"><span>2. 理解_MutableStateFlow_</span></a></h3><p>在深入探讨差异之前，让我们快速回顾一下_MutableStateFlow_是什么。<em>MutableStateFlow_是一种特殊的_Flow</em>，它表示一个可变的值。<strong>它持有一个当前值，并允许收集器在值改变时接收更新</strong>。具体来说，我们可以创建具有起始值的新实例：</p><p><code>val mutableStateFlow = MutableStateFlow(&quot;初始值&quot;)</code></p><p>此外，我们可以使用_collect()_函数订阅值：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> runBlocking <span class="token punctuation">{</span>
    <span class="token keyword">val</span> mutableStateFlow <span class="token operator">=</span> <span class="token function">MutableStateFlow</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;初始值&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> job <span class="token operator">=</span> launch <span class="token punctuation">{</span>
        mutableStateFlow<span class="token punctuation">.</span><span class="token function">collect</span> <span class="token punctuation">{</span> value <span class="token operator">-&gt;</span>
            <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;接收到的值: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">value</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    mutableStateFlow<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;更新后的值 1&quot;</span></span>
    mutableStateFlow<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;更新后的值 2&quot;</span></span>
    job<span class="token punctuation">.</span><span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在提供的示例中，我们使用“初始值”作为初始值创建了一个_MutableStateFlow_。然后，我们使用_launch()_函数启动一个协程。我们使用_collect()_函数订阅由_MutableStateFlow_发出的值。最终，_MutableStateFlow_的值会按顺序更新。使用_collect()_块创建的订阅者接收每个更新，并在协程内部打印每个值。</p><h3 id="_3-value-属性" tabindex="-1"><a class="header-anchor" href="#_3-value-属性"><span>3. _value_属性</span></a></h3><p>_value_属性是_MutableStateFlow_的一个可读写属性，代表其当前值。它允许我们在不订阅流的情况下设置或检索当前状态：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`初始值应该是Baeldung团队\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> mutableStateFlow <span class="token operator">=</span> <span class="token function">MutableStateFlow</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Baeldung团队&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> currentValue <span class="token operator">=</span> mutableStateFlow<span class="token punctuation">.</span>value
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Baeldung团队&quot;</span></span><span class="token punctuation">,</span> currentValue<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码中，我们使用“Baeldung团队”作为初始值创建了一个_MutableStateFlow_。通过访问_value_属性，我们获得了可变状态的某个时间点的快照，在这种情况下，它反映了初始值。此外，<strong>_value_属性是线程安全的</strong>，允许并发线程访问。</p><h3 id="_4-emit-函数" tabindex="-1"><a class="header-anchor" href="#_4-emit-函数"><span>4. _emit()_函数</span></a></h3><p>_emit()_函数用于更新_MutableStateFlow_的值。它是一个挂起函数，这意味着它必须在协程或协程上下文中调用：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`emit函数应该更新值\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> runBlocking <span class="token punctuation">{</span>
    <span class="token keyword">val</span> mutableStateFlow <span class="token operator">=</span> <span class="token function">MutableStateFlow</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Baledung团队&quot;</span></span><span class="token punctuation">)</span>
    mutableStateFlow<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Baledung团队Kotlin&quot;</span></span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Baledung团队Kotlin&quot;</span></span><span class="token punctuation">,</span> mutableStateFlow<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码演示了我们_MutableStateFlow_的简单状态更新。在创建它并使用“Baeldung团队”作为初始值之后，我们使用_emit()_将状态更新为“Baeldung团队Kotlin”。此外，我们使用_runBlocking()_创建一个父协程上下文。如果_Flow_的缓冲区已满，_emit()_将挂起，直到缓冲区有空间并且可以设置值。</p><p><strong>这个示例展示了_MutableStateFlow_如何使可变状态的异步修改成为可能</strong>。</p><h3 id="_5-tryemit-函数" tabindex="-1"><a class="header-anchor" href="#_5-tryemit-函数"><span>5. _tryEmit()_函数</span></a></h3><p><em>tryEmit()<em>函数尝试向_MutableStateFlow_发出一个新值。它返回一个布尔值，指示是否成功发出。如果发出成功，函数返回_true</em>，如果失败，返回_false</em>，这意味着调用_emit()_函数将挂起，直到有缓冲区空间可用。<strong>这个方法是线程安全的，并且可以安全地从并发线程调用，无需外部同步</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`tryEmit函数应该更新值\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> mutableStateFlow <span class="token operator">=</span> <span class="token function">MutableStateFlow</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Baledung团队Kotlin 2024&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> emitResult <span class="token operator">=</span> mutableStateFlow<span class="token punctuation">.</span><span class="token function">tryEmit</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Baledung团队Kotlin 2024&quot;</span></span><span class="token punctuation">)</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>emitResult<span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Baledung团队Kotlin 2024&quot;</span></span><span class="token punctuation">,</span> mutableStateFlow<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，我们使用初始值创建了一个_MutableStateFlow_，然后我们使用_tryEmit()_在不处于协程上下文的情况下更新值。最后，我们检查_tryEmit()_的返回值，以确保更新成功。</p><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p>_MutableStateFlow_的_value_属性提供了一种直接的方法来访问当前状态，无需订阅，允许开发者高效地检索信息。另一方面，_emit()_函数在异步更新_MutableStateFlow_的值方面发挥着重要作用，尽管它必须在协程上下文中使用。最后，我们还可以使用_tryEmit()_在没有协程上下文的情况下发布新值，尽管它可能无法发布新值。</p><p>如往常一样，这些示例的完整实现可以在GitHub上找到。</p>`,25),o=[l];function i(p,u){return t(),a("div",null,o)}const d=n(s,[["render",i],["__file","2024-07-13-Difference Between Value and Emit in MutableStateFlow Kotlin.html.vue"]]),_=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Difference%20Between%20Value%20and%20Emit%20in%20MutableStateFlow%20Kotlin.html","title":"Kotlin中MutableStateFlow的value属性与emit()函数的区别 | Baeldung关于Kotlin","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin"],"tag":["MutableStateFlow","value","emit"],"head":[["meta",{"name":"keywords","content":"Kotlin, Flow API, MutableStateFlow, value, emit"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Difference%20Between%20Value%20and%20Emit%20in%20MutableStateFlow%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中MutableStateFlow的value属性与emit()函数的区别 | Baeldung关于Kotlin"}],["meta",{"property":"og:description","content":"Kotlin中MutableStateFlow的value属性与emit()函数的区别 | Baeldung关于Kotlin Kotlin的_Flow_ API通过提供一种强大而简洁的方式来处理数据流，彻底改变了异步编程。这个API的一个关键组件是_MutableStateFlow_，这是一个可变状态持有者，它向其收集器发出值。然而，当开发者在_Mut..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T10:44:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MutableStateFlow"}],["meta",{"property":"article:tag","content":"value"}],["meta",{"property":"article:tag","content":"emit"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T10:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中MutableStateFlow的value属性与emit()函数的区别 | Baeldung关于Kotlin\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T10:44:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中MutableStateFlow的value属性与emit()函数的区别 | Baeldung关于Kotlin Kotlin的_Flow_ API通过提供一种强大而简洁的方式来处理数据流，彻底改变了异步编程。这个API的一个关键组件是_MutableStateFlow_，这是一个可变状态持有者，它向其收集器发出值。然而，当开发者在_Mut..."},"headers":[{"level":3,"title":"2. 理解_MutableStateFlow_","slug":"_2-理解-mutablestateflow","link":"#_2-理解-mutablestateflow","children":[]},{"level":3,"title":"3. _value_属性","slug":"_3-value-属性","link":"#_3-value-属性","children":[]},{"level":3,"title":"4. _emit()_函数","slug":"_4-emit-函数","link":"#_4-emit-函数","children":[]},{"level":3,"title":"5. _tryEmit()_函数","slug":"_5-tryemit-函数","link":"#_5-tryemit-函数","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720867458000,"updatedTime":1720867458000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.61,"words":1084},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Difference Between Value and Emit in MutableStateFlow Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>Kotlin的_Flow_ API通过提供一种强大而简洁的方式来处理数据流，彻底改变了异步编程。这个API的一个关键组件是_MutableStateFlow_，这是一个可变状态持有者，它向其收集器发出值。然而，当开发者在_MutableStateFlow_的上下文中遇到_value_属性和_emit()_函数时，常常会感到困惑。</p>\\n<p>在本教程中，我们将深入探讨_value_和_emit()_之间的区别。</p>\\n<h3>2. 理解_MutableStateFlow_</h3>\\n<p>在深入探讨差异之前，让我们快速回顾一下_MutableStateFlow_是什么。<em>MutableStateFlow_是一种特殊的_Flow</em>，它表示一个可变的值。<strong>它持有一个当前值，并允许收集器在值改变时接收更新</strong>。具体来说，我们可以创建具有起始值的新实例：</p>","autoDesc":true}');export{d as comp,_ as data};
