import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-CBerKIce.js";const t={},p=e('<hr><h1 id="重试-feign-调用" tabindex="-1"><a class="header-anchor" href="#重试-feign-调用"><span>重试 Feign 调用</span></a></h1><p>调用外部服务通过 REST 端点是一个常见的活动，通过像 Feign 这样的库使得这个过程变得非常简单。然而，在这些调用过程中可能会发生很多问题。许多问题都是随机的或暂时的。</p><p>在本教程中，我们将学习如何重试失败的调用并使 REST 客户端更具弹性。</p><h2 id="_2-feign-客户端设置" tabindex="-1"><a class="header-anchor" href="#_2-feign-客户端设置"><span>2. Feign 客户端设置</span></a></h2><p>首先，让我们创建一个简单的 Feign 客户端构建器，我们稍后将通过重试功能对其进行增强。我们将使用 <em>OkHttpClient</em> 作为 HTTP 客户端。此外，我们将使用 <em>GsonEncoder</em> 和 <em>GsonDecoder</em> 对请求和响应进行编码和解码。最后，我们需要指定目标的 URI 和响应类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ResilientFeignClientBuilder</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> ````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```````` <span class="token class-name">T</span> <span class="token function">createClient</span><span class="token punctuation">(</span><span class="token class-name">Class</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```````` type<span class="token punctuation">,</span> <span class="token class-name">String</span> uri<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">Feign</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">client</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">OkHttpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">encoder</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">GsonEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">decoder</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">GsonDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">target</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> uri<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，如果我们使用 Spring，我们可以让它自动注入可用的 Feign 客户端。</p><h2 id="_3-feign-retryer" tabindex="-1"><a class="header-anchor" href="#_3-feign-retryer"><span>3. Feign <em>Retryer</em></span></a></h2><p>幸运的是，Feign 内置了重试功能，只需要进行配置即可。<strong>我们可以通过向客户端构建器提供 <em>Retryer</em> 接口的实现来实现这一点。</strong></p><p>它最重要的方法 <em>continueOrPropagate</em> 接受 <em>RetryableException</em> 作为参数并返回空。在执行时，它要么抛出异常，要么成功退出（通常在休眠后）。<strong>如果它没有抛出异常，Feign 将继续重试调用。</strong> 如果抛出异常，它将被传播，并将有效地以错误结束调用。</p><h3 id="_3-1-简单实现" tabindex="-1"><a class="header-anchor" href="#_3-1-简单实现"><span>3.1. 简单实现</span></a></h3><p>让我们编写一个非常简单的 Retryer 实现，它将在等待一秒钟后始终重试调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NaiveRetryer</span> <span class="token keyword">implements</span> <span class="token class-name"><span class="token namespace">feign<span class="token punctuation">.</span></span>Retryer</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">continueOrPropagate</span><span class="token punctuation">(</span><span class="token class-name">RetryableException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">throw</span> e<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为 <em>Retryer</em> 实现了 <em>Cloneable</em> 接口，我们还需要重写 <em>clone</em> 方法。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>\n<span class="token keyword">public</span> <span class="token class-name">Retryer</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">NaiveRetryer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们需要将我们的实现添加到客户端构建器中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> ````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```````` <span class="token class-name">T</span> <span class="token function">createClient</span><span class="token punctuation">(</span><span class="token class-name">Class</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```````` type<span class="token punctuation">,</span> <span class="token class-name">String</span> uri<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">Feign</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token comment">// ...</span>\n      <span class="token punctuation">.</span><span class="token function">retryer</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">NaiveRetryer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，如果我们使用 Spring，我们可以将 <em>NaiveRetryer</em> 注解为 <em>@Component</em> 注解或在配置类中定义一个 bean，并让 Spring 完成其余的工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>\n<span class="token keyword">public</span> <span class="token class-name">Retryer</span> <span class="token function">retryer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">NaiveRetryer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-默认实现" tabindex="-1"><a class="header-anchor" href="#_3-2-默认实现"><span>3.2. 默认实现</span></a></h3><p>Feign 提供了一个合理的 <em>Retryer</em> 接口的默认实现。<strong>它只会重试给定次数，将从某个时间间隔开始，然后每次重试都会增加这个间隔，直到提供的最大值。</strong> 让我们定义一个开始间隔为 100 毫秒，最大间隔为 3 秒，最大尝试次数为 5 的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> ````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```````` <span class="token class-name">T</span> <span class="token function">createClient</span><span class="token punctuation">(</span><span class="token class-name">Class</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```````` type<span class="token punctuation">,</span> <span class="token class-name">String</span> uri<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">Feign</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token comment">// ...</span>\n      <span class="token punctuation">.</span><span class="token function">retryer</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Retryer<span class="token punctuation">.</span>Default</span><span class="token punctuation">(</span><span class="token number">100L</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">.</span><span class="token function">toMillis</span><span class="token punctuation">(</span><span class="token number">3L</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-不重试" tabindex="-1"><a class="header-anchor" href="#_3-3-不重试"><span>3.3. 不重试</span></a></h3><p>如果我们不希望 Feign 重试任何调用，我们可以向客户端构建器提供 <em>Retryer.NEVER_RETRY</em> 实现。它将简单地每次都传播异常。</p><h2 id="_4-创建可重试异常" tabindex="-1"><a class="header-anchor" href="#_4-创建可重试异常"><span>4. 创建可重试异常</span></a></h2><p>在前一节中，我们学会了如何控制我们重试调用的频率。现在让我们看看如何控制我们何时想要重试调用以及何时只想抛出异常。</p><h3 id="_4-1-errordecoder-和-retryableexception" tabindex="-1"><a class="header-anchor" href="#_4-1-errordecoder-和-retryableexception"><span>4.1. <em>ErrorDecoder</em> 和 <em>RetryableException</em></span></a></h3><p>当我们收到错误响应时，Feign 会将其传递给 <em>ErrorDecoder</em> 接口的一个实例，该实例决定如何处理它。最重要的是，解码器可以将异常映射到 <em>RetryableException</em> 的一个实例，从而使 <em>Retryer</em> 可以重试调用。<strong>默认的 <em>ErrorDecoder</em> 实现仅在响应包含“Retry-After”头时才创建 <em>RetryableExeception</em> 实例。</strong> 最常见的是，在 503 服务不可用响应中找到它。</p><p>这是一个很好的默认行为，但有时我们需要更灵活。例如，我们可能正在与一个偶尔随机响应 500 内部服务器错误的外部服务通信，我们无法修复它。我们能做的是重试调用，因为我们知道下次它可能会工作。为了实现这一点，我们需要编写一个自定义的 <em>ErrorDecoder</em> 实现。</p><h3 id="_4-2-创建自定义错误解码器" tabindex="-1"><a class="header-anchor" href="#_4-2-创建自定义错误解码器"><span>4.2. 创建自定义错误解码器</span></a></h3><p>在我们的自定义解码器中，我们只需要实现一个方法：<em>decode</em>。它接受两个参数，一个 <em>String</em> 方法键和一个 <em>Response</em> 对象。它返回一个异常，应该是 <em>RetryableException</em> 的一个实例或其他异常，这取决于实现。</p><p>我们的 <em>decode</em> 方法将简单地检查响应的状态码是否大于或等于 500。如果是这样，它将创建 <em>RetryableException</em>。如果不是，它将返回使用 <em>FeignException</em> 类的 <em>errorStatus</em> 工厂函数创建的基本 <em>FeignException</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Custom5xxErrorDecoder</span> <span class="token keyword">implements</span> <span class="token class-name">ErrorDecoder</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">Exception</span> <span class="token function">decode</span><span class="token punctuation">(</span><span class="token class-name">String</span> methodKey<span class="token punctuation">,</span> <span class="token class-name">Response</span> response<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">FeignException</span> exception <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">feign<span class="token punctuation">.</span></span>FeignException</span><span class="token punctuation">.</span><span class="token function">errorStatus</span><span class="token punctuation">(</span>methodKey<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">int</span> status <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>status <span class="token operator">&gt;=</span> <span class="token number">500</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RetryableException</span><span class="token punctuation">(</span>\n              response<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n              exception<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n              response<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">httpMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n              exception<span class="token punctuation">,</span>\n              <span class="token number">50L</span><span class="token punctuation">,</span> <span class="token comment">// 重试间隔</span>\n              response<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">return</span> exception<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，在这种情况下，我们创建并返回异常，而不是抛出它。</p><p>最后，我们需要将我们的解码器插入到客户端构建器中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> ````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```````` <span class="token class-name">T</span> <span class="token function">createClient</span><span class="token punctuation">(</span><span class="token class-name">Class</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```````` type<span class="token punctuation">,</span> <span class="token class-name">String</span> uri<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">Feign</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token comment">// ...</span>\n      <span class="token punctuation">.</span><span class="token function">errorDecoder</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Custom5xxErrorDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-总结" tabindex="-1"><a class="header-anchor" href="#_5-总结"><span>5. 总结</span></a></h2><p>在本文中，我们学习了如何控制 Feign 库的重试逻辑。我们研究了 <em>Retryer</em> 接口以及如何使用它来操作重试时间和重试次数。然后我们创建了我们的 <em>ErrorDecoder</em> 来控制哪些响应需要重试。</p><p>如常，所有代码示例都可以在 GitHub 上找到。</p>',40),c=[p];function o(l,i){return a(),s("div",null,c)}const k=n(t,[["render",o],["__file","2024-07-22-Retrying Feign Calls.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-Retrying%20Feign%20Calls.html","title":"重试 Feign 调用","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Spring"],"tag":["Feign","Retry"],"head":[["meta",{"name":"keywords","content":"Feign, Retry, REST, ErrorDecoder"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-Retrying%20Feign%20Calls.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"重试 Feign 调用"}],["meta",{"property":"og:description","content":"重试 Feign 调用 调用外部服务通过 REST 端点是一个常见的活动，通过像 Feign 这样的库使得这个过程变得非常简单。然而，在这些调用过程中可能会发生很多问题。许多问题都是随机的或暂时的。 在本教程中，我们将学习如何重试失败的调用并使 REST 客户端更具弹性。 2. Feign 客户端设置 首先，让我们创建一个简单的 Feign 客户端构建..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T05:14:07.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Feign"}],["meta",{"property":"article:tag","content":"Retry"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T05:14:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"重试 Feign 调用\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T05:14:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"重试 Feign 调用 调用外部服务通过 REST 端点是一个常见的活动，通过像 Feign 这样的库使得这个过程变得非常简单。然而，在这些调用过程中可能会发生很多问题。许多问题都是随机的或暂时的。 在本教程中，我们将学习如何重试失败的调用并使 REST 客户端更具弹性。 2. Feign 客户端设置 首先，让我们创建一个简单的 Feign 客户端构建..."},"headers":[{"level":2,"title":"2. Feign 客户端设置","slug":"_2-feign-客户端设置","link":"#_2-feign-客户端设置","children":[]},{"level":2,"title":"3. Feign Retryer","slug":"_3-feign-retryer","link":"#_3-feign-retryer","children":[{"level":3,"title":"3.1. 简单实现","slug":"_3-1-简单实现","link":"#_3-1-简单实现","children":[]},{"level":3,"title":"3.2. 默认实现","slug":"_3-2-默认实现","link":"#_3-2-默认实现","children":[]},{"level":3,"title":"3.3. 不重试","slug":"_3-3-不重试","link":"#_3-3-不重试","children":[]}]},{"level":2,"title":"4. 创建可重试异常","slug":"_4-创建可重试异常","link":"#_4-创建可重试异常","children":[{"level":3,"title":"4.1. ErrorDecoder 和 RetryableException","slug":"_4-1-errordecoder-和-retryableexception","link":"#_4-1-errordecoder-和-retryableexception","children":[]},{"level":3,"title":"4.2. 创建自定义错误解码器","slug":"_4-2-创建自定义错误解码器","link":"#_4-2-创建自定义错误解码器","children":[]}]},{"level":2,"title":"5. 总结","slug":"_5-总结","link":"#_5-总结","children":[]}],"git":{"createdTime":1721625247000,"updatedTime":1721625247000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.54,"words":1363},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-Retrying Feign Calls.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>重试 Feign 调用</h1>\\n<p>调用外部服务通过 REST 端点是一个常见的活动，通过像 Feign 这样的库使得这个过程变得非常简单。然而，在这些调用过程中可能会发生很多问题。许多问题都是随机的或暂时的。</p>\\n<p>在本教程中，我们将学习如何重试失败的调用并使 REST 客户端更具弹性。</p>\\n<h2>2. Feign 客户端设置</h2>\\n<p>首先，让我们创建一个简单的 Feign 客户端构建器，我们稍后将通过重试功能对其进行增强。我们将使用 <em>OkHttpClient</em> 作为 HTTP 客户端。此外，我们将使用 <em>GsonEncoder</em> 和 <em>GsonDecoder</em> 对请求和响应进行编码和解码。最后，我们需要指定目标的 URI 和响应类型：</p>","autoDesc":true}');export{k as comp,d as data};
