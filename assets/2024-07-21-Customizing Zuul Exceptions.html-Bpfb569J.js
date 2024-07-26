import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as i}from"./app-Dj7PNGjp.js";const l={},u=i(`<h1 id="zuul异常自定义" tabindex="-1"><a class="header-anchor" href="#zuul异常自定义"><span>Zuul异常自定义</span></a></h1><p>Zuul是由Netflix开发的基于JVM的路由器和服务器端负载均衡器。Zuul的规则引擎提供了灵活性，允许编写规则和过滤器来增强Spring Cloud微服务架构中的路由。</p><p>在本文中，我们将探讨如何通过编写在代码执行期间发生错误时运行的自定义错误过滤器来自定义Zuul中的异常和错误响应。</p><p>在Zuul中处理的所有异常都是_ZuulExceptions_。现在，让我们明确一点，<strong><em>ZuulException_不能通过</em>@ControllerAdvice_捕获，也不能通过_@ExceptionHandling_注解方法</strong>。这是因为**_ZuulException_是从错误过滤器中抛出的**。因此，它跳过了后续的过滤器链，并且从未到达错误控制器。下图显示了Zuul中错误处理的层次结构：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/02/zuul.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>当出现_ZuulException_时，Zuul会显示以下错误响应：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;timestamp&quot;: &quot;2022-01-23T22:43:43.126+00:00&quot;,
    &quot;status&quot;: 500,
    &quot;error&quot;: &quot;Internal Server Error&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在某些场景中，我们可能需要自定义_ZuulException_响应中的错误消息或状态码。Zuul过滤器来拯救。在下一节中，我们将讨论如何扩展Zuul的错误过滤器并自定义_ZuulException_。</p><h3 id="_3-zuul异常自定义" tabindex="-1"><a class="header-anchor" href="#_3-zuul异常自定义"><span>3. Zuul异常自定义</span></a></h3><p>spring-cloud-starter-netflix-zuul的启动包包括三种类型的过滤器：pre、post和error过滤器。这里，<strong>我们将深入研究错误过滤器，并探索自定义名为_SendErrorFilter_的Zuul错误过滤器</strong>。</p><p>首先，我们将禁用自动配置的默认_SendErrorFilter_。这使我们不必担心执行顺序，因为这是唯一的Zuul默认错误过滤器。让我们在_application.yml_中添加属性以禁用它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>zuul:
  SendErrorFilter:
    post:
      disable: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们编写一个名为_CustomZuulErrorFilter_的自定义Zuul错误过滤器，如果底层服务不可用，则抛出自定义异常：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class CustomZuulErrorFilter extends ZuulFilter {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这个自定义过滤器需要扩展_com.netflix.zuul.ZuulFilter_并覆盖其中的一些方法。</p><p>首先，我们必须<strong>覆盖_filterType()<em>方法并返回类型为</em>“error”_</strong>。这是因为我们想要为错误过滤器类型配置Zuul过滤器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Override
public String filterType() {
    return &quot;error&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，我们<strong>覆盖_filterOrder()<em>并返回</em>-1_，以便该过滤器是链中的第一个</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Override
public int filterOrder() {
    return -1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们<strong>覆盖_shouldFilter()<em>方法并无条件返回_true</em></strong>，因为我们希望在所有情况下都链入这个过滤器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Override
public boolean shouldFilter() {
    return true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们<strong>覆盖_run()_方法</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Override
public Object run() {
    RequestContext context = RequestContext.getCurrentContext();
    Throwable throwable = context.getThrowable();

    if (throwable instanceof ZuulException) {
        ZuulException zuulException = (ZuulException) throwable;
        if (throwable.getCause().getCause().getCause() instanceof ConnectException) {
            context.remove(&quot;throwable&quot;);
            context.setResponseBody(RESPONSE_BODY);
            context.getResponse()
                .setContentType(&quot;application/json&quot;);
            context.setResponseStatusCode(503);
        }
    }
    return null;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们分解_run()_方法以理解它在做什么。首先，我们获取_RequestContext_的实例。接下来，我们验证从_RequestContext_获得的_throwable_是否是_ZuulException_的实例。然后，我们检查_throwable_中嵌套异常的原因是否是_ConnectException_的实例。最后，我们使用自定义属性设置上下文响应。</p><p>请注意，在设置自定义响应之前，我们<strong>从上下文中清除_throwable_，以防止后续过滤器中的进一步错误处理</strong>。</p><p>此外，我们也可以在我们的_run()_方法中设置自定义异常，以便后续过滤器处理：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>if (throwable.getCause().getCause().getCause() instanceof ConnectException) {
    ZuulException customException = new ZuulException(&quot;&quot;, 503, &quot;Service Unavailable&quot;);
    context.setThrowable(customException);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码片段将记录堆栈跟踪并继续执行下一个过滤器。</p><p>此外，我们还可以修改这个示例来处理_ZuulFilter_中的多个异常。</p><h3 id="_4-测试自定义zuul异常" tabindex="-1"><a class="header-anchor" href="#_4-测试自定义zuul异常"><span>4. 测试自定义Zuul异常</span></a></h3><p>在这一部分中，我们将在我们的_CustomZuulErrorFilter_中测试自定义Zuul异常。</p><p>假设有_ConnectException_，上述示例在Zuul API响应中的输出将是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;timestamp&quot;: &quot;2022-01-23T23:10:25.584791Z&quot;,
    &quot;status&quot;: 503,
    &quot;error&quot;: &quot;Service Unavailable&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，<strong>我们总是可以通过在_application.yml_文件中配置_error.path_属性来更改Zuul的默认错误转发路径_/error_</strong>。</p><p>现在，让我们通过一些测试用例来验证它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void whenSendRequestWithCustomErrorFilter_thenCustomError() {
    Response response = RestAssured.get(&quot;http://localhost:8080/foos/1&quot;);
    assertEquals(503, response.getStatusCode());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的测试场景中，_/foos/1_的路由被故意关闭，导致java.lang. <em>ConnectException</em>。结果，我们的自定义过滤器将拦截并以503状态响应。</p><p>现在，让我们测试一下没有注册自定义错误过滤器的情况：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void whenSendRequestWithoutCustomErrorFilter_thenError() {
    Response response = RestAssured.get(&quot;http://localhost:8080/foos/1&quot;);
    assertEquals(500, response.getStatusCode());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行上述测试用例时没有注册自定义错误过滤器，结果Zuul以状态500响应。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本教程中，我们了解了错误处理的层次结构，并深入了解了如何在Spring Zuul应用程序中配置自定义Zuul错误过滤器。这个错误过滤器提供了自定义响应体以及响应码的机会。像往常一样，示例代码可在GitHub上找到。</p>`,42),s=[u];function a(r,d){return n(),t("div",null,s)}const p=e(l,[["render",a],["__file","2024-07-21-Customizing Zuul Exceptions.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Customizing%20Zuul%20Exceptions.html","title":"Zuul异常自定义","lang":"zh-CN","frontmatter":{"date":"2022-02-01T00:00:00.000Z","category":["Spring Cloud","Zuul"],"tag":["Zuul","异常处理","微服务"],"head":[["meta",{"name":"keywords","content":"Zuul, 异常自定义, 微服务架构, Spring Cloud"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Customizing%20Zuul%20Exceptions.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Zuul异常自定义"}],["meta",{"property":"og:description","content":"Zuul异常自定义 Zuul是由Netflix开发的基于JVM的路由器和服务器端负载均衡器。Zuul的规则引擎提供了灵活性，允许编写规则和过滤器来增强Spring Cloud微服务架构中的路由。 在本文中，我们将探讨如何通过编写在代码执行期间发生错误时运行的自定义错误过滤器来自定义Zuul中的异常和错误响应。 在Zuul中处理的所有异常都是_ZuulE..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/02/zuul.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T23:40:17.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Zuul"}],["meta",{"property":"article:tag","content":"异常处理"}],["meta",{"property":"article:tag","content":"微服务"}],["meta",{"property":"article:published_time","content":"2022-02-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T23:40:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Zuul异常自定义\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/02/zuul.png\\"],\\"datePublished\\":\\"2022-02-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T23:40:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Zuul异常自定义 Zuul是由Netflix开发的基于JVM的路由器和服务器端负载均衡器。Zuul的规则引擎提供了灵活性，允许编写规则和过滤器来增强Spring Cloud微服务架构中的路由。 在本文中，我们将探讨如何通过编写在代码执行期间发生错误时运行的自定义错误过滤器来自定义Zuul中的异常和错误响应。 在Zuul中处理的所有异常都是_ZuulE..."},"headers":[{"level":3,"title":"3. Zuul异常自定义","slug":"_3-zuul异常自定义","link":"#_3-zuul异常自定义","children":[]},{"level":3,"title":"4. 测试自定义Zuul异常","slug":"_4-测试自定义zuul异常","link":"#_4-测试自定义zuul异常","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721605217000,"updatedTime":1721605217000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.16,"words":1249},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Customizing Zuul Exceptions.md","localizedDate":"2022年2月1日","excerpt":"\\n<p>Zuul是由Netflix开发的基于JVM的路由器和服务器端负载均衡器。Zuul的规则引擎提供了灵活性，允许编写规则和过滤器来增强Spring Cloud微服务架构中的路由。</p>\\n<p>在本文中，我们将探讨如何通过编写在代码执行期间发生错误时运行的自定义错误过滤器来自定义Zuul中的异常和错误响应。</p>\\n<p>在Zuul中处理的所有异常都是_ZuulExceptions_。现在，让我们明确一点，<strong><em>ZuulException_不能通过</em>@ControllerAdvice_捕获，也不能通过_@ExceptionHandling_注解方法</strong>。这是因为**_ZuulException_是从错误过滤器中抛出的**。因此，它跳过了后续的过滤器链，并且从未到达错误控制器。下图显示了Zuul中错误处理的层次结构：</p>","autoDesc":true}');export{p as comp,v as data};
