import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as a,a as s}from"./app-Bp_PQ4OG.js";const t={},i=s(`<hr><h1 id="为spring-security启用日志记录" tabindex="-1"><a class="header-anchor" href="#为spring-security启用日志记录"><span>为Spring Security启用日志记录</span></a></h1><p>如果您正在使用Spring Security（特别是OAuth）实现，一定要看看《Learn Spring Security》课程。</p><p><strong>&gt;&gt; 学习Spring</strong><strong>安全</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在使用Spring Security时，我们可能需要记录比默认级别更高的日志。例如，我们可能需要检查用户的角色或如何保护端点。或者我们也可能需要更多关于认证或授权的信息，例如，查看为什么用户无法访问某个端点。</p><p>在这个简短的教程中，我们将看到如何修改Spring Security的日志记录级别。</p><h2 id="_2-配置spring-security日志记录" tabindex="-1"><a class="header-anchor" href="#_2-配置spring-security日志记录"><span>2. 配置Spring Security日志记录</span></a></h2><p><strong>像任何Spring或Java应用程序一样，我们可以使用日志库并为Spring Security模块定义一个日志级别。</strong></p><p>通常，我们可以在配置文件中写入类似以下内容：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;logger name=&quot;org.springframework.security&quot; level=&quot;DEBUG&quot; /&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>但是，如果我们正在运行一个Spring Boot应用程序</strong>，<strong>我们可以在_application.properties_文件中配置这一点：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>logging.level.org.springframework.security=DEBUG
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同样，我们可以使用_yaml_语法：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">logging</span><span class="token punctuation">:</span>
  <span class="token key atrule">level</span><span class="token punctuation">:</span>
    <span class="token key atrule">org</span><span class="token punctuation">:</span>
      <span class="token key atrule">springframework</span><span class="token punctuation">:</span>
        <span class="token key atrule">security</span><span class="token punctuation">:</span> DEBUG
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，**我们可以查看有关认证或过滤器链的日志。**此外，我们甚至可以使用_trace_级别进行更深入的调试。</p><p>此外，<strong>Spring Security提供了记录有关请求和应用过滤器的特定信息的可能性：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@EnableWebSecurity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SecurityConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${spring.websecurity.debug:false}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">boolean</span> webSecurityDebug<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">WebSecurityCustomizer</span> <span class="token function">webSecurityCustomizer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>web<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> web<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span>webSecurityDebug<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-日志样本" tabindex="-1"><a class="header-anchor" href="#_3-日志样本"><span>3. 日志样本</span></a></h2><p>最后，为了测试我们的应用程序，让我们定义一个简单的控制器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LoggingController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/logging&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">logging</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token string">&quot;logging/baeldung&quot;</span><span class="token punctuation">,</span> <span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">OK</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们访问_/logging_端点，我们可以检查我们的日志：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>2022-02-10 21:30:32.104 DEBUG 5489 --- [nio-8080-exec-1] o.s.s.w.a.i.FilterSecurityInterceptor    : Authorized filter invocation [GET /logging] with attributes [permitAll]
2022-02-10 21:30:32.105 DEBUG 5489 --- [nio-8080-exec-1] o.s.security.web.FilterChainProxy        : Secured GET /logging
2022-02-10 21:30:32.141 DEBUG 5489 --- [nio-8080-exec-1] w.c.HttpSessionSecurityContextRepository : Did not store anonymous SecurityContext
2022-02-10 21:30:32.146 DEBUG 5489 --- [nio-8080-exec-1] s.s.w.c.SecurityContextPersistenceFilter : Cleared SecurityContextHolder to complete request
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>接收到GET &#39;/logging&#39;的请求：

org.apache.catalina.connector.RequestFacade@78fe74c6

servletPath:/logging
pathInfo:null
headers:
host: localhost:8080
connection: keep-alive
sec-ch-ua: &quot; Not A;Brand&quot;;v=&quot;99&quot;, &quot;Chromium&quot;;v=&quot;98&quot;, &quot;Google Chrome&quot;;v=&quot;98&quot;
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: &quot;Linux&quot;
upgrade-insecure-requests: 1
user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36
accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
sec-fetch-site: none
sec-fetch-mode: navigate
sec-fetch-user: ?1
sec-fetch-dest: document
accept-encoding: gzip, deflate, br
accept-language: en,it;q=0.9,en-US;q=0.8
cookie: PGADMIN_LANGUAGE=en; NX-ANTI-CSRF-TOKEN=0.7130543323088452; _ga=GA1.1.1440105797.1623675414; NXSESSIONID=bec8cae2-30e2-4ad4-9333-cba1af5dc95c; JSESSIONID=1C7CD365F521609AD887B3D6C2BE26CC

安全过滤器链：[
  WebAsyncManagerIntegrationFilter
  SecurityContextPersistenceFilter
  HeaderWriterFilter
  CsrfFilter
  LogoutFilter
  RequestCacheAwareFilter
  SecurityContextHolderAwareRequestFilter
  AnonymousAuthenticationFilter
  SessionManagementFilter
  ExceptionTranslationFilter
  FilterSecurityInterceptor
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们查看了几种为Spring Security启用不同日志级别的选项。</p><p>我们已经看到了如何为Spring Security模块使用_debug_级别。我们还看到了如何记录有关单个请求的特定信息。</p><p>像往常一样，这些示例的代码可以在GitHub上找到。</p>`,28),r=[i];function l(c,o){return a(),e("div",null,r)}const d=n(t,[["render",l],["__file","2024-07-21-Enable Logging for Spring Security.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Enable%20Logging%20for%20Spring%20Security.html","title":"为Spring Security启用日志记录","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Security","Logging"],"tag":["Spring Security","Logging"],"head":[["meta",{"name":"keywords","content":"Spring Security, Logging, Spring Boot, OAuth"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Enable%20Logging%20for%20Spring%20Security.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"为Spring Security启用日志记录"}],["meta",{"property":"og:description","content":"为Spring Security启用日志记录 如果您正在使用Spring Security（特别是OAuth）实现，一定要看看《Learn Spring Security》课程。 >> 学习Spring 安全 1. 概述 在使用Spring Security时，我们可能需要记录比默认级别更高的日志。例如，我们可能需要检查用户的角色或如何保护端点。或者我..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T11:41:13.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Security"}],["meta",{"property":"article:tag","content":"Logging"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T11:41:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"为Spring Security启用日志记录\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T11:41:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"为Spring Security启用日志记录 如果您正在使用Spring Security（特别是OAuth）实现，一定要看看《Learn Spring Security》课程。 >> 学习Spring 安全 1. 概述 在使用Spring Security时，我们可能需要记录比默认级别更高的日志。例如，我们可能需要检查用户的角色或如何保护端点。或者我..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 配置Spring Security日志记录","slug":"_2-配置spring-security日志记录","link":"#_2-配置spring-security日志记录","children":[]},{"level":2,"title":"3. 日志样本","slug":"_3-日志样本","link":"#_3-日志样本","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721562073000,"updatedTime":1721562073000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.53,"words":760},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Enable Logging for Spring Security.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>为Spring Security启用日志记录</h1>\\n<p>如果您正在使用Spring Security（特别是OAuth）实现，一定要看看《Learn Spring Security》课程。</p>\\n<p><strong>&gt;&gt; 学习Spring</strong>\\n<strong>安全</strong></p>\\n<h2>1. 概述</h2>\\n<p>在使用Spring Security时，我们可能需要记录比默认级别更高的日志。例如，我们可能需要检查用户的角色或如何保护端点。或者我们也可能需要更多关于认证或授权的信息，例如，查看为什么用户无法访问某个端点。</p>\\n","autoDesc":true}');export{d as comp,g as data};
