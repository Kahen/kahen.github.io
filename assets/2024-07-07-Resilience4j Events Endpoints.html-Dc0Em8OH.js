import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as i,a as n}from"./app-D33GRqBS.js";const r={},a=n(`<h1 id="resilience4j-事件端点" tabindex="-1"><a class="header-anchor" href="#resilience4j-事件端点"><span>Resilience4j 事件端点</span></a></h1><p>在本文中，我们将探讨 Resilience4j 用于其提供的弹性机制的内部事件，以及在 SpringBoot 应用程序中列出这些事件的端点是什么。</p><p>我们将重用我们关于 Spring Boot 中 Resilience4j 指南的文章中的项目，来展示 Resilience4j 如何在执行器端点下列出不同的模式事件。</p><h2 id="_2-模式事件" tabindex="-1"><a class="header-anchor" href="#_2-模式事件"><span>2. 模式事件</span></a></h2><p>该库使用事件来驱动弹性模式的行为（允许或拒绝调用），作为一种通信机制。此外，事件为监控和可观察性提供了有价值的详细信息，同时也有助于故障排除。</p><p>此外，断路器、重试、限流器、舱壁和时间限制器实例发出的事件分别存储在循环事件消费者缓冲区中。缓冲区的大小可以根据 <code>eventConsumerBufferSize</code> 属性进行配置，默认为 100 个事件。</p><p>我们将查看在执行器端点下为每种模式列出的特定发出的事件。</p><h2 id="_3-断路器" tabindex="-1"><a class="header-anchor" href="#_3-断路器"><span>3. 断路器</span></a></h2><h3 id="_3-1-配置" tabindex="-1"><a class="header-anchor" href="#_3-1-配置"><span>3.1. 配置</span></a></h3><p>我们将为我们的 <code>/api/circuit-breaker</code> 端点定义的断路器实例提供默认配置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>resilience4j.circuitbreaker:
  configs:
    default:
      registerHealthIndicator: true
      slidingWindowSize: 10
      minimumNumberOfCalls: 5
      permittedNumberOfCallsInHalfOpenState: 3
      automaticTransitionFromOpenToHalfOpenEnabled: true
      waitDurationInOpenState: 5s
      failureRateThreshold: 50
      eventConsumerBufferSize: 50
  instances:
    externalService:
      baseConfig: default
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-事件" tabindex="-1"><a class="header-anchor" href="#_3-2-事件"><span>3.2. 事件</span></a></h3><p>Resilience4j 在执行器端点下暴露了与断路器相关的事件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>http://localhost:8080/actuator/circuitbreakers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>断路器是定义最复杂的弹性机制，并且定义了最多的事件类型</strong>。由于其实现依赖于状态机的概念，它使用事件来信号状态转换。因此，让我们看看在执行器事件端点下从初始的 <code>CLOSED</code> 状态转换到 <code>OPEN</code> 状态，然后再回到 <code>CLOSED</code> 状态时列出的事件。</p><p>对于成功的调用，我们可以看到 <code>CircuitBreakerOnSuccess</code> 事件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;circuitBreakerName&quot;: &quot;externalService&quot;,
    &quot;type&quot;: &quot;SUCCESS&quot;,
    &quot;creationTime&quot;: &quot;2023-03-22T16:45:26.349252+02:00&quot;,
    &quot;errorMessage&quot;: null,
    &quot;durationInMs&quot;: 526,
    &quot;stateTransition&quot;: null
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看当断路器实例处理失败请求时会发生什么：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void testCircuitBreakerEvents() throws Exception {
    EXTERNAL_SERVICE.stubFor(WireMock.get(&quot;/api/external&quot;)
      .willReturn(serverError()));

    IntStream.rangeClosed(1, 5)
      .forEach(i -&gt;
        {
            ResponseEntity\`\`&lt;String&gt;\`\` response = restTemplate.getForEntity(&quot;/api/circuit-breaker&quot;, String.class);
            assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        });
    ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们观察到的，<strong>失败的请求触发了 <code>CircuitBreakerOnErrorEvent</code></strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
&quot;circuitBreakerName&quot;: &quot;externalService&quot;,
&quot;type&quot;: &quot;ERROR&quot;,
&quot;creationTime&quot;: &quot;2023-03-19T20:13:05.069002+02:00&quot;,
&quot;errorMessage&quot;: &quot;org.springframework.web.client.HttpServerErrorException$InternalServerError: 500 Server Error: \\&quot;{\\&quot;error\\&quot;: \\&quot;Internal Server Error\\&quot;}\\&quot;&quot;,
&quot;durationInMs&quot;: 519,
&quot;stateTransition&quot;: null
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，这些成功/错误事件包含了 <code>durationInMs</code> 属性，这是一个可以有用的性能指标。</p><p>当失败率超过配置的阈值时，实例触发 <code>CircuitBreakerOnFailureRateExceededEvent</code>，决定转换到 <code>OPEN</code> 状态，并触发 <code>CircuitBreakerOnStateTransitionEvent</code> 事件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
&quot;circuitBreakerName&quot;: &quot;externalService&quot;,
&quot;type&quot;: &quot;FAILURE_RATE_EXCEEDED&quot;,
&quot;creationTime&quot;: &quot;2023-03-19T20:13:07.554813+02:00&quot;,
&quot;errorMessage&quot;: null,
&quot;durationInMs&quot;: null,
&quot;stateTransition&quot;: null
},
{
&quot;circuitBreakerName&quot;: &quot;externalService&quot;,
&quot;type&quot;: &quot;STATE_TRANSITION&quot;,
&quot;creationTime&quot;: &quot;2023-03-19T20:13:07.563623+02:00&quot;,
&quot;errorMessage&quot;: null,
&quot;durationInMs&quot;: null,
&quot;stateTransition&quot;: &quot;CLOSED_TO_OPEN&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看最后一个事件的 <code>stateTransition</code> 属性，断路器处于 <code>OPEN</code> 状态。一个新的调用尝试引发了 <code>CallNotPermittedException</code>，进而触发了 <code>CircuitBreakerOnCallNotPermittedEvent</code>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;circuitBreakerName&quot;: &quot;externalService&quot;,
    &quot;type&quot;: &quot;NOT_PERMITTED&quot;,
    &quot;creationTime&quot;: &quot;2023-03-22T16:50:11.897977+02:00&quot;,
    &quot;errorMessage&quot;: null,
    &quot;durationInMs&quot;: null,
    &quot;stateTransition&quot;: null
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在配置的 <code>waitDuration</code> 经过后，断路器将转换到中间的 <code>OPEN_TO_HALF_OPEN</code> 状态，并通过 <code>CircuitBreakerOnStateTransitionEvent</code> 再次发出信号：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;circuitBreakerName&quot;: &quot;externalService&quot;,
    &quot;type&quot;: &quot;STATE_TRANSITION&quot;,
    &quot;creationTime&quot;: &quot;2023-03-22T16:50:14.787381+02:00&quot;,
    &quot;errorMessage&quot;: null,
    &quot;durationInMs&quot;: null,
    &quot;stateTransition&quot;: &quot;OPEN_TO_HALF_OPEN&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code>OPEN_TO_HALF_OPEN</code> 状态下，如果配置的 <code>minimumNumberOfCalls</code> 成功，则再次触发 <code>CircuitBreakerOnStateTransitionEvent</code> 以切换回 <code>CLOSED</code> 状态：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;circuitBreakerName&quot;: &quot;externalService&quot;,
    &quot;type&quot;: &quot;STATE_TRANSITION&quot;,
    &quot;creationTime&quot;: &quot;2023-03-22T17:48:45.931978+02:00&quot;,
    &quot;errorMessage&quot;: null,
    &quot;durationInMs&quot;: null,
    &quot;stateTransition&quot;: &quot;HALF_OPEN_TO_CLOSED&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>断路器相关的事件提供了实例如何执行和处理请求的洞察。因此，我们可以通过分析断路器事件来<strong>识别潜在问题并跟踪性能指标</strong>。</p><h2 id="_4-重试" tabindex="-1"><a class="header-anchor" href="#_4-重试"><span>4. 重试</span></a></h2><h3 id="_4-1-配置" tabindex="-1"><a class="header-anchor" href="#_4-1-配置"><span>4.1. 配置</span></a></h3><p>为我们的 <code>/api/retry</code> 端点，我们将使用以下配置创建一个重试实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>resilience4j.retry:
  configs:
    default:
      maxAttempts: 3
      waitDuration: 100
  instances:
    externalService:
      baseConfig: default
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-事件" tabindex="-1"><a class="header-anchor" href="#_4-2-事件"><span>4.2. 事件</span></a></h3><p>让我们检查重试模式在执行器端点下列出的事件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>http://localhost:8080/actuator/retryevents
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例如，当一个调用失败时，它将根据配置进行重试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void testRetryEvents()throws Exception {
    EXTERNAL_SERVICE.stubFor(WireMock.get(&quot;/api/external&quot;)
      .willReturn(serverError()));
    ResponseEntity\`\`&lt;String&gt;\`\` response = restTemplate.getForEntity(&quot;/api/retry&quot;, String.class);

    ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，<strong>对于每次重试尝试，都会发出一个 <code>RetryOnErrorEvent</code>，并且重试实例根据其配置安排另一次重试</strong>。正如我们所看到的，事件有一个 <code>numberOfAttempts</code> 计数字段：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
&quot;retryName&quot;: &quot;retryApi&quot;,
&quot;type&quot;: &quot;RETRY&quot;,
&quot;creationTime&quot;: &quot;2023-03-19T22:57:51.458811+02:00&quot;,
&quot;errorMessage&quot;: &quot;org.springframework.web.client.HttpServerErrorException$InternalServerError: 500 Server Error: \\&quot;{\\&quot;error\\&quot;: \\&quot;Internal Server Error\\&quot;}\\&quot;&quot;,
&quot;numberOfAttempts&quot;: 1
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，一旦配置的尝试次数耗尽，重试实例发布一个 <code>RetryOnFailedEvent</code>，同时允许底层异常传播：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
&quot;retryName&quot;: &quot;retryApi&quot;,
&quot;type&quot;: &quot;ERROR&quot;,
&quot;creationTime&quot;: &quot;2023-03-19T23:30:11</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,44),s=[a];function l(d,o){return i(),t("div",null,s)}const v=e(r,[["render",l],["__file","2024-07-07-Resilience4j Events Endpoints.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Resilience4j%20Events%20Endpoints.html","title":"Resilience4j 事件端点","lang":"zh-CN","frontmatter":{"date":"2024-07-07T00:00:00.000Z","category":["Spring Boot","Resilience4j"],"tag":["Resilience4j","Spring Boot","Circuit Breaker","Retry","Rate Limiter","Bulkhead","Time Limiter"],"head":[["meta",{"name":"keywords","content":"Resilience4j, Spring Boot, Circuit Breaker, Retry, Rate Limiter, Bulkhead, Time Limiter"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Resilience4j%20Events%20Endpoints.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Resilience4j 事件端点"}],["meta",{"property":"og:description","content":"Resilience4j 事件端点 在本文中，我们将探讨 Resilience4j 用于其提供的弹性机制的内部事件，以及在 SpringBoot 应用程序中列出这些事件的端点是什么。 我们将重用我们关于 Spring Boot 中 Resilience4j 指南的文章中的项目，来展示 Resilience4j 如何在执行器端点下列出不同的模式事件。 2..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T11:59:04.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Resilience4j"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Circuit Breaker"}],["meta",{"property":"article:tag","content":"Retry"}],["meta",{"property":"article:tag","content":"Rate Limiter"}],["meta",{"property":"article:tag","content":"Bulkhead"}],["meta",{"property":"article:tag","content":"Time Limiter"}],["meta",{"property":"article:published_time","content":"2024-07-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T11:59:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Resilience4j 事件端点\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-07T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T11:59:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Resilience4j 事件端点 在本文中，我们将探讨 Resilience4j 用于其提供的弹性机制的内部事件，以及在 SpringBoot 应用程序中列出这些事件的端点是什么。 我们将重用我们关于 Spring Boot 中 Resilience4j 指南的文章中的项目，来展示 Resilience4j 如何在执行器端点下列出不同的模式事件。 2..."},"headers":[{"level":2,"title":"2. 模式事件","slug":"_2-模式事件","link":"#_2-模式事件","children":[]},{"level":2,"title":"3. 断路器","slug":"_3-断路器","link":"#_3-断路器","children":[{"level":3,"title":"3.1. 配置","slug":"_3-1-配置","link":"#_3-1-配置","children":[]},{"level":3,"title":"3.2. 事件","slug":"_3-2-事件","link":"#_3-2-事件","children":[]}]},{"level":2,"title":"4. 重试","slug":"_4-重试","link":"#_4-重试","children":[{"level":3,"title":"4.1. 配置","slug":"_4-1-配置","link":"#_4-1-配置","children":[]},{"level":3,"title":"4.2. 事件","slug":"_4-2-事件","link":"#_4-2-事件","children":[]}]}],"git":{"createdTime":1720353544000,"updatedTime":1720353544000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.73,"words":1119},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Resilience4j Events Endpoints.md","localizedDate":"2024年7月7日","excerpt":"\\n<p>在本文中，我们将探讨 Resilience4j 用于其提供的弹性机制的内部事件，以及在 SpringBoot 应用程序中列出这些事件的端点是什么。</p>\\n<p>我们将重用我们关于 Spring Boot 中 Resilience4j 指南的文章中的项目，来展示 Resilience4j 如何在执行器端点下列出不同的模式事件。</p>\\n<h2>2. 模式事件</h2>\\n<p>该库使用事件来驱动弹性模式的行为（允许或拒绝调用），作为一种通信机制。此外，事件为监控和可观察性提供了有价值的详细信息，同时也有助于故障排除。</p>\\n<p>此外，断路器、重试、限流器、舱壁和时间限制器实例发出的事件分别存储在循环事件消费者缓冲区中。缓冲区的大小可以根据 <code>eventConsumerBufferSize</code> 属性进行配置，默认为 100 个事件。</p>","autoDesc":true}');export{v as comp,m as data};
