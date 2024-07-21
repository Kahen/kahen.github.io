import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CXN34Kw1.js";const e={},o=t(`<h1 id="reactor-核心库中的-flux-和-mono-的区别" tabindex="-1"><a class="header-anchor" href="#reactor-核心库中的-flux-和-mono-的区别"><span>Reactor 核心库中的 Flux 和 Mono 的区别</span></a></h1><p>在本教程中，我们将学习 Reactor 核心库中 Flux 和 Mono 的区别。</p><h2 id="_2-mono-是什么" tabindex="-1"><a class="header-anchor" href="#_2-mono-是什么"><span>2. Mono 是什么？</span></a></h2><p>Mono 是一种特殊的 Publisher。<strong>Mono 对象表示单个或空值</strong>。这意味着它最多只能为 onNext() 请求发出一个值，然后以 onComplete() 信号终止。如果出现故障，它只发出一个 onError() 信号。</p><p>让我们看一个带有完成信号的 Mono 示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenMonoPublisher_whenSubscribeThenReturnSingleValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Mono</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` helloMono <span class="token operator">=</span> <span class="token class-name">Mono</span><span class="token punctuation">.</span><span class="token function">just</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StepVerifier</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>helloMono<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">expectNext</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">expectComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到，当 helloMono 被订阅时，它只发出一个值，然后发送完成信号。</p><h2 id="_3-flux-是什么" tabindex="-1"><a class="header-anchor" href="#_3-flux-是什么"><span>3. Flux 是什么？</span></a></h2><p>Flux 是一个标准的 Publisher，代表 0 到 N 个异步序列值。这意味着它可以发出 0 到多个值，对于 onNext() 请求，可能是无限值，然后以完成或错误信号终止。</p><p>让我们看一个带有完成信号的 Flux 示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenFluxPublisher_whenSubscribedThenReturnMultipleValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Flux</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` stringFlux <span class="token operator">=</span> <span class="token class-name">Flux</span><span class="token punctuation">.</span><span class="token function">just</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StepVerifier</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>stringFlux<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">expectNext</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">expectNext</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">expectComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们看一个带有错误信号的 Flux 示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenFluxPublisher_whenSubscribeThenReturnMultipleValuesWithError</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Flux</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` stringFlux <span class="token operator">=</span> <span class="token class-name">Flux</span><span class="token punctuation">.</span><span class="token function">just</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Error&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>str <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>str<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;Error&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
              <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;Throwing Error&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">return</span> str<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StepVerifier</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>stringFlux<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">expectNext</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">expectNext</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">expectError</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到，在从 Flux 获取两个值之后，我们遇到了一个错误。</p><h2 id="_4-mono-与-flux" tabindex="-1"><a class="header-anchor" href="#_4-mono-与-flux"><span>4. Mono 与 Flux</span></a></h2><p>Mono 和 Flux 都是 Publisher 接口的实现。简单来说，当我们进行计算或向数据库或外部服务发出请求，并期望最多一个结果时，我们应该使用 Mono。</p><p>当我们期望从计算、数据库或外部服务调用中获得多个结果时，我们应该使用 Flux。</p><p>Mono 更类似于 Java 中的 Optional 类，因为它包含 0 或 1 个值，而 Flux 更类似于 List，因为它可以有 N 个值。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了 Mono 和 Flux 之间的区别。</p><p>如往常一样，示例的完整源代码可在 GitHub 上获取。</p>`,21),p=[o];function c(l,u){return a(),s("div",null,p)}const k=n(e,[["render",c],["__file","2024-07-13-Difference Between Flux and Mono.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Difference%20Between%20Flux%20and%20Mono.html","title":"Reactor 核心库中的 Flux 和 Mono 的区别","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Reactor"],"tag":["Mono","Flux"],"head":[["meta",{"name":"keywords","content":"Java, Reactor, Mono, Flux"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Difference%20Between%20Flux%20and%20Mono.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Reactor 核心库中的 Flux 和 Mono 的区别"}],["meta",{"property":"og:description","content":"Reactor 核心库中的 Flux 和 Mono 的区别 在本教程中，我们将学习 Reactor 核心库中 Flux 和 Mono 的区别。 2. Mono 是什么？ Mono 是一种特殊的 Publisher。Mono 对象表示单个或空值。这意味着它最多只能为 onNext() 请求发出一个值，然后以 onComplete() 信号终止。如果出现故..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T00:04:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Mono"}],["meta",{"property":"article:tag","content":"Flux"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T00:04:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Reactor 核心库中的 Flux 和 Mono 的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T00:04:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Reactor 核心库中的 Flux 和 Mono 的区别 在本教程中，我们将学习 Reactor 核心库中 Flux 和 Mono 的区别。 2. Mono 是什么？ Mono 是一种特殊的 Publisher。Mono 对象表示单个或空值。这意味着它最多只能为 onNext() 请求发出一个值，然后以 onComplete() 信号终止。如果出现故..."},"headers":[{"level":2,"title":"2. Mono 是什么？","slug":"_2-mono-是什么","link":"#_2-mono-是什么","children":[]},{"level":2,"title":"3. Flux 是什么？","slug":"_3-flux-是什么","link":"#_3-flux-是什么","children":[]},{"level":2,"title":"4. Mono 与 Flux","slug":"_4-mono-与-flux","link":"#_4-mono-与-flux","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720915471000,"updatedTime":1720915471000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.7,"words":511},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Difference Between Flux and Mono.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将学习 Reactor 核心库中 Flux 和 Mono 的区别。</p>\\n<h2>2. Mono 是什么？</h2>\\n<p>Mono 是一种特殊的 Publisher。<strong>Mono 对象表示单个或空值</strong>。这意味着它最多只能为 onNext() 请求发出一个值，然后以 onComplete() 信号终止。如果出现故障，它只发出一个 onError() 信号。</p>\\n<p>让我们看一个带有完成信号的 Mono 示例：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenMonoPublisher_whenSubscribeThenReturnSingleValue</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">Mono</span>```<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>``` helloMono <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Mono</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">just</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Hello\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">StepVerifier</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">create</span><span class=\\"token punctuation\\">(</span>helloMono<span class=\\"token punctuation\\">)</span>\\n      <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">expectNext</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Hello\\"</span><span class=\\"token punctuation\\">)</span>\\n      <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">expectComplete</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n      <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">verify</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
