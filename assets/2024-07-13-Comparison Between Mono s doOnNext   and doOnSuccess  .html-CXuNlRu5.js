import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DpYLEM_u.js";const e={},o=t(`<h1 id="spring-5-webflux-中的-mono-的-doonnext-和-doonsuccess-比较" tabindex="-1"><a class="header-anchor" href="#spring-5-webflux-中的-mono-的-doonnext-和-doonsuccess-比较"><span>Spring 5 WebFlux 中的 Mono 的 doOnNext() 和 doOnSuccess() 比较</span></a></h1><p>在这篇简短的教程中，我们将探索 Spring 5 WebFlux 中的 Mono 对象的各种监听器。我们将比较 doOnNext() 和 doOnSuccess() 方法，并发现尽管它们相似，但对于空的 Mono，它们的行为是不同的。</p><p><strong>Mono 的 doOnNext() 允许我们附加一个监听器，当数据被发出时会被触发。</strong> 在本文的代码示例中，我们将使用 PaymentService 类。在这种情况下，我们只有在 paymentMono 发出数据时，使用 doOnNext() 调用 processPayment 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAPaymentMono_whenCallingServiceOnNext_thenCallServiceWithPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Payment</span> paymentOf100 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Payment</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Mono</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">&gt;</span></span>\`\`\`\` paymentMono <span class="token operator">=</span> <span class="token class-name">Mono</span><span class="token punctuation">.</span><span class="token function">just</span><span class="token punctuation">(</span>paymentOf100<span class="token punctuation">)</span><span class="token punctuation">;</span>

    paymentMono<span class="token punctuation">.</span><span class="token function">doOnNext</span><span class="token punctuation">(</span>paymentService<span class="token operator">::</span><span class="token function">processPayment</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">block</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">verify</span><span class="token punctuation">(</span>paymentService<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">processPayment</span><span class="token punctuation">(</span>paymentOf100<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>然而，一个空的 Mono 不会发出任何数据，doOnNext 也不会被触发。</strong> 因此，如果我们使用 Mono.empty() 重复测试，processPayment 方法就不应该被调用了：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAnEmptyMono_whenCallingServiceOnNext_thenDoNotCallService</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Mono</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">&gt;</span></span>\`\`\`\` emptyMono <span class="token operator">=</span> <span class="token class-name">Mono</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    emptyMono<span class="token punctuation">.</span><span class="token function">doOnNext</span><span class="token punctuation">(</span>paymentService<span class="token operator">::</span><span class="token function">processPayment</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">block</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">verify</span><span class="token punctuation">(</span>paymentService<span class="token punctuation">,</span> <span class="token function">never</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">processPayment</span><span class="token punctuation">(</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="doonsuccess" tabindex="-1"><a class="header-anchor" href="#doonsuccess"><span>doOnSuccess</span></a></h3><p><strong>我们可以使用 doOnSuccess 来附加一个监听器，当 Mono 成功完成时会被触发。</strong> 让我们再次重复测试，但这次使用 doOnSuccess：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAPaymentMono_whenCallingServiceOnSuccess_thenCallServiceWithPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Payment</span> paymentOf100 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Payment</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Mono</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">&gt;</span></span>\`\`\`\` paymentMono <span class="token operator">=</span> <span class="token class-name">Mono</span><span class="token punctuation">.</span><span class="token function">just</span><span class="token punctuation">(</span>paymentOf100<span class="token punctuation">)</span><span class="token punctuation">;</span>

    paymentMono<span class="token punctuation">.</span><span class="token function">doOnSuccess</span><span class="token punctuation">(</span>paymentService<span class="token operator">::</span><span class="token function">processPayment</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">block</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">verify</span><span class="token punctuation">(</span>paymentService<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">processPayment</span><span class="token punctuation">(</span>paymentOf100<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>虽然，我们应该注意到即使没有发出数据，Mono 也被认为是成功完成的。</strong> 因此，对于一个空的 Mono，上述代码将使用 null Payment 调用 processPayment 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Test</span>
<span class="token keyword">void</span> <span class="token function">givenAnEmptyMono_whenCallingServiceOnSuccess_thenCallServiceWithNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Mono</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">&gt;</span></span>\`\`\`\` emptyMono <span class="token operator">=</span> <span class="token class-name">Mono</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    emptyMono<span class="token punctuation">.</span><span class="token function">doOnSuccess</span><span class="token punctuation">(</span>paymentService<span class="token operator">::</span><span class="token function">processPayment</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">block</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">verify</span><span class="token punctuation">(</span>paymentService<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">processPayment</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在这篇简短的文章中，我们学习了 Mono 的 doOnNext 和 doOnSuccess 监听器之间的区别。我们看到，如果我们想要对接收到的数据做出反应，可以使用 doOnNext。另一方面，如果我们希望在 Mono 成功完成时调用方法，无论是否发出数据，都应使用 doOnSuccess。</p><p>如常，本文的代码可以在 GitHub 上找到。</p>`,14),p=[o];function c(i,l){return a(),s("div",null,p)}const d=n(e,[["render",c],["__file","2024-07-13-Comparison Between Mono s doOnNext   and doOnSuccess  .html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Comparison%20Between%20Mono%20s%20doOnNext%20%20%20and%20doOnSuccess%20%20.html","title":"Spring 5 WebFlux 中的 Mono 的 doOnNext() 和 doOnSuccess() 比较","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring WebFlux","Reactive Programming"],"tag":["Mono","doOnNext","doOnSuccess"],"head":[["meta",{"name":"keywords","content":"Spring 5, WebFlux, doOnNext, doOnSuccess, Reactive Programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Comparison%20Between%20Mono%20s%20doOnNext%20%20%20and%20doOnSuccess%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring 5 WebFlux 中的 Mono 的 doOnNext() 和 doOnSuccess() 比较"}],["meta",{"property":"og:description","content":"Spring 5 WebFlux 中的 Mono 的 doOnNext() 和 doOnSuccess() 比较 在这篇简短的教程中，我们将探索 Spring 5 WebFlux 中的 Mono 对象的各种监听器。我们将比较 doOnNext() 和 doOnSuccess() 方法，并发现尽管它们相似，但对于空的 Mono，它们的行为是不同的。 Mo..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T22:04:33.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Mono"}],["meta",{"property":"article:tag","content":"doOnNext"}],["meta",{"property":"article:tag","content":"doOnSuccess"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T22:04:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring 5 WebFlux 中的 Mono 的 doOnNext() 和 doOnSuccess() 比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T22:04:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring 5 WebFlux 中的 Mono 的 doOnNext() 和 doOnSuccess() 比较 在这篇简短的教程中，我们将探索 Spring 5 WebFlux 中的 Mono 对象的各种监听器。我们将比较 doOnNext() 和 doOnSuccess() 方法，并发现尽管它们相似，但对于空的 Mono，它们的行为是不同的。 Mo..."},"headers":[{"level":3,"title":"doOnSuccess","slug":"doonsuccess","link":"#doonsuccess","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720908273000,"updatedTime":1720908273000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.61,"words":484},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Comparison Between Mono s doOnNext   and doOnSuccess  .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这篇简短的教程中，我们将探索 Spring 5 WebFlux 中的 Mono 对象的各种监听器。我们将比较 doOnNext() 和 doOnSuccess() 方法，并发现尽管它们相似，但对于空的 Mono，它们的行为是不同的。</p>\\n<p><strong>Mono 的 doOnNext() 允许我们附加一个监听器，当数据被发出时会被触发。</strong> 在本文的代码示例中，我们将使用 PaymentService 类。在这种情况下，我们只有在 paymentMono 发出数据时，使用 doOnNext() 调用 processPayment 方法：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenAPaymentMono_whenCallingServiceOnNext_thenCallServiceWithPayment</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">Payment</span> paymentOf100 <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Payment</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">100</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">Mono</span>````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Payment</span><span class=\\"token punctuation\\">&gt;</span></span>```` paymentMono <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Mono</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">just</span><span class=\\"token punctuation\\">(</span>paymentOf100<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    paymentMono<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">doOnNext</span><span class=\\"token punctuation\\">(</span>paymentService<span class=\\"token operator\\">::</span><span class=\\"token function\\">processPayment</span><span class=\\"token punctuation\\">)</span>\\n        <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">block</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token function\\">verify</span><span class=\\"token punctuation\\">(</span>paymentService<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">processPayment</span><span class=\\"token punctuation\\">(</span>paymentOf100<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
