import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as i}from"./app-C0LGuTy7.js";const r={},s=i(`<h1 id="在spring-boot中修改到达控制器之前的请求体" tabindex="-1"><a class="header-anchor" href="#在spring-boot中修改到达控制器之前的请求体"><span>在Spring Boot中修改到达控制器之前的请求体</span></a></h1><p>无论你是刚开始学习还是拥有多年经验，<strong>Spring Boot</strong> 显然是构建Web应用程序的极佳选择。</p><p>Jmix基于这个功能强大且成熟的Boot堆栈构建，允许开发人员构建并交付<strong>全栈Web</strong> <strong>应用程序</strong>，而无需编写前端代码。非常灵活，从简单的Web GUI CRUD应用程序到复杂的企业解决方案。</p><p>具体来说，<strong>Jmix平台</strong>包括一个框架，该框架建立在<strong>Spring Boot, JPA和Vaadin</strong>之上，并配备了Jmix Studio，<strong>一个IntelliJ IDEA插件</strong>，配备了一套开发者生产力工具。</p><p>该平台配备了相互连接的<strong>开箱即用</strong> <strong>插件</strong>，用于报告生成、BPM、地图、从数据库即时生成Web应用程序等：</p><p><strong>&gt;&gt; 成为一个高效的全栈开发人员与Jmix</strong></p><p>既然新版的 <em>REST With Spring -</em> <strong>“REST With Spring Boot”</strong> 终于发布了，当前价格将在本周五之前有效，之后将永久增加50美元。</p><p><strong>&gt;&gt; 立即获取访问权限</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将学习如何在Spring Boot应用程序中，在HTTP请求到达控制器之前对其进行修改。Web应用程序和RESTful Web服务经常使用这种技术来解决常见的问题，比如在实际控制器处理之前转换或丰富传入的HTTP请求。这促进了松散耦合，并显著减少了开发工作量。</p><h2 id="_2-使用过滤器修改请求" tabindex="-1"><a class="header-anchor" href="#_2-使用过滤器修改请求"><span>2. 使用过滤器修改请求</span></a></h2><p>通常，应用程序需要执行一些通用操作，如身份验证、记录日志、转义HTML字符等。<strong>过滤器是处理任何Servlet容器中运行的应用程序的通用问题的绝佳选择</strong>。让我们看看过滤器是如何工作的：</p><p>在Spring Boot应用程序中，可以注册过滤器以按特定顺序调用：</p><ul><li><strong>修改请求</strong></li><li><strong>记录请求</strong></li><li><strong>检查请求是否经过身份验证或包含恶意脚本</strong></li><li><strong>决定是拒绝请求还是将其转发到下一个过滤器或控制器</strong></li></ul><p>假设我们想要从HTTP请求体中转义所有HTML字符以防止XSS攻击。让我们首先定义过滤器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Component
@Order(1)
public class EscapeHtmlFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
      throws IOException, ServletException {
        filterChain.doFilter(new HtmlEscapeRequestWrapper((HttpServletRequest) servletRequest), servletResponse);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>@Order</code>注解中的值_1_表示所有HTTP请求首先通过过滤器_EscapeHtmlFilter_。我们还可以通过在Spring Boot配置类中定义的_FilterRegistrationBean_来注册过滤器。通过这种方式，我们还可以为过滤器定义URL模式。</p><p><code>doFilter()</code>方法将原始_ServletRequest_包装在一个自定义包装器_EscapeHtmlRequestWrapper_中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class EscapeHtmlRequestWrapper extends HttpServletRequestWrapper {
    private String body = null;
    public HtmlEscapeRequestWrapper(HttpServletRequest request) throws IOException {
        super(request);
        this.body = this.escapeHtml(request);
    }

    @Override
    public ServletInputStream getInputStream() throws IOException {
        final ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(body.getBytes());
        ServletInputStream servletInputStream = new ServletInputStream() {
            @Override
            public int read() throws IOException {
                return byteArrayInputStream.read();
            }
        //Other implemented methods...
        };
        return servletInputStream;
    }

    @Override
    public BufferedReader getReader() {
        return new BufferedReader(new InputStreamReader(this.getInputStream()));
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>包装器是必需的，因为我们不能修改原始的HTTP请求。如果没有这个，servlet容器会拒绝请求</strong>。</p><p>在自定义包装器中，我们重写了<code>getInputStream()</code>方法以返回一个新的_ServletInputStream_。基本上，我们给它分配了使用<code>escapeHtml()</code>方法转义HTML字符后的修改请求体。</p><p>让我们定义一个_UserController_类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@RestController
@RequestMapping(&quot;/&quot;)
public class UserController {
    @PostMapping(value = &quot;save&quot;)
    public ResponseEntity\`\`&lt;String&gt;\`\` saveUser(@RequestBody String user) {
        logger.info(&quot;save user info into database&quot;);
        ResponseEntity\`\`&lt;String&gt;\`\` responseEntity = new ResponseEntity&lt;&gt;(user, HttpStatus.CREATED);
        return responseEntity;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于这个演示，控制器在/save端点返回它接收到的请求体_user_。</p><p>让我们看看过滤器是否有效：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenFilter_whenEscapeHtmlFilter_thenEscapeHtml() throws Exception {

    Map\`\`\`\`\`&lt;String, String&gt;\`\`\`\`\` requestBody = Map.of(
      &quot;name&quot;, &quot;James Cameron&quot;,
      &quot;email&quot;, &quot;\`\`\`&lt;script&gt;\`\`\`alert()\`\`\`&lt;/script&gt;\`\`\`james@gmail.com&quot;
    );

    Map\`\`\`\`\`&lt;String, String&gt;\`\`\`\`\` expectedResponseBody = Map.of(
      &quot;name&quot;, &quot;James Cameron&quot;,
      &quot;email&quot;, &quot;&amp;\`\`&lt;sc&gt;\`\`ript&gt;al\`\`&lt;er&gt;\`\`t()\`\`&lt;/sc&gt;\`\`ript&gt;;james@gmail.com&quot;
    );

    ObjectMapper objectMapper = new ObjectMapper();

    mockMvc.perform(MockMvcRequestBuilders.post(URI.create(&quot;/save&quot;))
      .contentType(MediaType.APPLICATION_JSON)
      .content(objectMapper.writeValueAsString(requestBody)))
      .andExpect(MockMvcResultMatchers.status().isCreated())
      .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(expectedResponseBody)));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好吧，过滤器在到达UserController类中定义的/save URL之前成功地转义了HTML字符。</p><h2 id="_3-使用spring-aop" tabindex="-1"><a class="header-anchor" href="#_3-使用spring-aop"><span>3. 使用Spring AOP</span></a></h2><p>Spring框架中的_RequestBodyAdvice_接口和_@RestControllerAdvice_注解帮助将全局建议应用于Spring应用程序中的所有REST控制器。让我们使用它们在HTTP请求到达控制器之前从请求中转义HTML字符：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@RestControllerAdvice
public class EscapeHtmlAspect implements RequestBodyAdvice {
    @Override
    public HttpInputMessage beforeBodyRead(HttpInputMessage inputMessage,
      MethodParameter parameter, Type targetType, Class\`\`\`\`&lt;? extends HttpMessageConverter&lt;?&gt;\`\`\`\`&gt; converterType) throws IOException {
        InputStream inputStream = inputMessage.getBody();
        return new HttpInputMessage() {
            @Override
            public InputStream getBody() throws IOException {
                return new ByteArrayInputStream(escapeHtml(inputStream).getBytes(StandardCharsets.UTF_8));
            }

            @Override
            public HttpHeaders getHeaders() {
                return inputMessage.getHeaders();
            }
        };
    }

    @Override
    public boolean supports(MethodParameter methodParameter,
      Type targetType, Class\`\`\`\`&lt;? extends HttpMessageConverter&lt;?&gt;\`\`\`\`&gt; converterType) {
        return true;
    }

    @Override
    public Object afterBodyRead(Object body, HttpInputMessage inputMessage,
      MethodParameter parameter, Type targetType, Class\`\`\`\`&lt;? extends HttpMessageConverter&lt;?&gt;\`\`\`\`&gt; converterType) {
        return body;
    }

    @Override
    public Object handleEmptyBody(Object body, HttpInputMessage inputMessage,
      MethodParameter parameter, Type targetType, Class\`\`\`\`&lt;? extends HttpMessageConverter&lt;?&gt;\`\`\`\`&gt; converterType) {
        return body;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>beforeBodyRead()_方法在HTTP请求到达控制器之前被调用</strong>。因此我们在其中转义了HTML字符。<strong>support()<em>方法返回_true</em>，这意味着它将建议应用于所有的REST控制器</strong>。</p><p>让我们看看它是否有效：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenAspect_whenEscapeHtmlAspect_thenEscapeHtml() throws Exception {

    Map\`\`\`\`\`&lt;String, String&gt;\`\`\`\`\` requestBody = Map.of(
      &quot;name&quot;, &quot;James Cameron&quot;,
      &quot;email&quot;, &quot;\`\`\`&lt;script&gt;\`\`\`alert()\`\`\`&lt;/script&gt;\`\`\`james@gmail.com&quot;
    );

    Map\`\`\`\`\`&lt;String, String&gt;\`\`\`\`\` expectedResponseBody = Map.of(
      &quot;name&quot;, &quot;James Cameron&quot;,
      &quot;email&quot;, &quot;&amp;\`\`&lt;sc&gt;\`\`ript&gt;al\`\`&lt;er&gt;\`\`t()\`\`&lt;/sc&gt;\`\`ript&gt;;james@gmail.com&quot;
    );

    ObjectMapper objectMapper = new ObjectMapper();

    mockMvc.perform(MockMvcRequestBuilders.post(URI.create(&quot;/save&quot;))
      .contentType(MediaType.APPLICATION_JSON)
      .content(objectMapper.writeValueAsString(requestBody)))
      .andExpect(MockMvcResultMatchers.status().isCreated())
      .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(expectedResponseBody)));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，所有的HTML字符都被转义了。</p><p>我们还可以使用自定义AOP注解，这些注解可以用于控制器方法上，以更细粒度地应用建议。</p><h2 id="_4-使用拦截器修改请求" tabindex="-1"><a class="header-anchor" href="#_4-使用拦截器修改请求"><span>4. 使用拦截器修改请求</span></a></h2><p>Spring拦截器是一个可以拦截传入的HTTP请求并在控制器处理它们之前处理它们的类。拦截器用于各种目的，如身份验证、授权、记录日志和缓存。<strong>此外，拦截器特定于Spring MVC框架，它们可以访问Spring <em>ApplicationContext</em></strong>。</p><p>让我们看看拦截器是如何工作的：</p><p>DispatcherServlet将HTTP请求转发到拦截器。进一步处理后，拦截器可以将请求转发到控制器或拒绝它。由于这个原因，<strong>存在一个普遍的误解，即拦截器可以修改HTTP请求。然而，我们将演示这个观点是错误的</strong>。</p><p>让我们考虑在前面部分讨论的从HTTP请求中转义HTML字符的示例。让我们看看是否可以使用Spring MVC拦截器来实现这一点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class EscapeHtmlRequestInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HtmlEscapeRequestWrapper htmlEscapeRequestWrapper = new HtmlEscapeRequestWrapper(request);
        return HandlerInterceptor.super.preHandle(htmlEscapeRequestWrapper, response, handler);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有拦截器都必须实现_HandleInterceptor_接口。<strong>在拦截器中，_preHandle()_方法在请求转发到目标控制器之前被调用</strong>。因此，我们已经将_HttpServletRequest_object包装在_EscapeHtmlRequestWrapper_中，并且负责转义HTML字符。</p><p>此外，我们还必须将拦截器注册到适当的URL模式：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Configuration
@EnableWebMvc
public class WebMvcConfiguration implements WebMvcConfigurer {
    private static final Logger logger = LoggerFactory.getLogger(WebMvcConfiguration.class);
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        logger.info(&quot;addInterceptors() called&quot;);
        registry.addInterceptor(new HtmlEscapeRequestInterceptor()).addPathPatterns(&quot;/**&quot;);

        WebMvcConfigurer.super.addInterceptors(registry);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，<em>WebMvcConfiguration_类实现了_WebMvcConfigurer</em>。在类中，我们重写了_addInterceptors()_方法。在方法中，我们使用_addPathPatterns()<em>方法为所有传入的HTTP请求注册了拦截器_EscapeHtmlRequestInterceptor</em>。</p><p>令人惊讶的是，<em>HtmlEscapeRequestInterceptor_未能转发修改后的请求体并调用处理器</em>/save_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenInterceptor_whenEscapeHtmlInterceptor_thenEscapeHtml() throws Exception {
    Map\`\`\`\`\`&lt;String, String&gt;\`\`\`\`\` requestBody = Map.of(
      &quot;name&quot;, &quot;James Cameron&quot;,
      &quot;email&quot;, &quot;\`\`\`&lt;script&gt;\`\`\`alert()\`\`\`&lt;/script&gt;\`\`\`james@gmail.com&quot;
    );

    ObjectMapper objectMapper = new ObjectMapper();
    mockMvc.perform(MockMvcRequestBuilders.post(URI.create(&quot;/save&quot;))
      .contentType(MediaType.APPLICATION_JSON)
      .content(objectMapper.writeValueAsString(requestBody)))
      .andExpect(MockMvcResultMatchers.status().is4xxClientError());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在HTTP请求体中推送了一些JavaScript字符。出乎意料地，请求以HTTP错误代码400失败了。因此，<strong>尽管拦截器可以像过滤器一样起作用，但它们不适合修改HTTP请求。相反，当我们需要修改Spring应用程序上下文中的对象时，它们非常有用</strong>。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了在Spring Boot应用程序中在HTTP请求到达控制器之前修改请求体的各种方式。根据普遍的看法，拦截器可以帮助完成这项工作，但我们发现它失败了。然而，我们看到了过滤器和AOP如何成功地在HTTP请求到达控制器之前修改请求体。</p><p>像往常一样，示例的源代码可以在GitHub上找到。 OK</p>`,51),a=[s];function l(d,o){return n(),t("div",null,a)}const v=e(r,[["render",l],["__file","2024-06-26-Modify Request Body Before Reaching Controller in Spring Boot.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Modify%20Request%20Body%20Before%20Reaching%20Controller%20in%20Spring%20Boot.html","title":"在Spring Boot中修改到达控制器之前的请求体","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Spring Boot","Web开发"],"tag":["Spring Boot","请求修改","AOP","过滤器","拦截器"],"head":[["meta",{"name":"keywords","content":"Spring Boot, 修改请求, AOP, 过滤器, 拦截器"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Modify%20Request%20Body%20Before%20Reaching%20Controller%20in%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Spring Boot中修改到达控制器之前的请求体"}],["meta",{"property":"og:description","content":"在Spring Boot中修改到达控制器之前的请求体 无论你是刚开始学习还是拥有多年经验，Spring Boot 显然是构建Web应用程序的极佳选择。 Jmix基于这个功能强大且成熟的Boot堆栈构建，允许开发人员构建并交付全栈Web 应用程序，而无需编写前端代码。非常灵活，从简单的Web GUI CRUD应用程序到复杂的企业解决方案。 具体来说，Jm..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T21:55:04.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"请求修改"}],["meta",{"property":"article:tag","content":"AOP"}],["meta",{"property":"article:tag","content":"过滤器"}],["meta",{"property":"article:tag","content":"拦截器"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T21:55:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Spring Boot中修改到达控制器之前的请求体\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T21:55:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Spring Boot中修改到达控制器之前的请求体 无论你是刚开始学习还是拥有多年经验，Spring Boot 显然是构建Web应用程序的极佳选择。 Jmix基于这个功能强大且成熟的Boot堆栈构建，允许开发人员构建并交付全栈Web 应用程序，而无需编写前端代码。非常灵活，从简单的Web GUI CRUD应用程序到复杂的企业解决方案。 具体来说，Jm..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用过滤器修改请求","slug":"_2-使用过滤器修改请求","link":"#_2-使用过滤器修改请求","children":[]},{"level":2,"title":"3. 使用Spring AOP","slug":"_3-使用spring-aop","link":"#_3-使用spring-aop","children":[]},{"level":2,"title":"4. 使用拦截器修改请求","slug":"_4-使用拦截器修改请求","link":"#_4-使用拦截器修改请求","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719438904000,"updatedTime":1719438904000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.88,"words":2065},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Modify Request Body Before Reaching Controller in Spring Boot.md","localizedDate":"2024年6月27日","excerpt":"\\n<p>无论你是刚开始学习还是拥有多年经验，<strong>Spring Boot</strong> 显然是构建Web应用程序的极佳选择。</p>\\n<p>Jmix基于这个功能强大且成熟的Boot堆栈构建，允许开发人员构建并交付<strong>全栈Web</strong> <strong>应用程序</strong>，而无需编写前端代码。非常灵活，从简单的Web GUI CRUD应用程序到复杂的企业解决方案。</p>\\n<p>具体来说，<strong>Jmix平台</strong>包括一个框架，该框架建立在<strong>Spring Boot, JPA和Vaadin</strong>之上，并配备了Jmix Studio，<strong>一个IntelliJ IDEA插件</strong>，配备了一套开发者生产力工具。</p>","autoDesc":true}');export{v as comp,u as data};
