import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as i}from"./app-CcODlQJt.js";const r={},s=i(`<h1 id="在spring-boot-filter中获取响应体" tabindex="-1"><a class="header-anchor" href="#在spring-boot-filter中获取响应体"><span>在Spring Boot Filter中获取响应体</span></a></h1><p>无论你是刚开始学习还是拥有多年经验，<strong>Spring Boot</strong> 是构建新应用程序的绝佳选择，它让一切变得简单。</p><p>Jmix增强了Spring Boot开发者的能力，允许他们构建和交付<strong>全栈Web****应用程序</strong>，而无需涉足前端技术。它使你能够从简单的Web GUI CRUD应用程序到复杂的企业解决方案，消除了前端/后端分离及相关安全问题。</p><p><strong>Jmix平台</strong>包括一个构建在<strong>Spring Boot, JPA, 和 Vaadin</strong>之上的框架，并带有Jmix Studio，<strong>一个IntelliJ IDEA插件</strong>，配备了一套开发者生产力工具。该平台还提供了<strong>现成的</strong>插件，用于报告生成、BPM、地图等，你可以在Jmix应用程序中使用它们，或者作为单独的服务。所有技术都是相互连接的，使单个Java开发者能够以整个团队的水平执行任务，<strong>入门所需的知识最少</strong>。</p><p>另外！Jmix可以<strong>立即生成一个CRUD Web应用程序</strong>，包括其JPA数据模型和UI，<strong>直接从现有数据库</strong>。然后，在Jmix Studio的帮助下继续开发。</p><p>智能开发，不费力！</p><p><strong>&gt;&gt; 成为全栈开发者</strong></p><p><strong>与Jmix一起</strong></p><p>既然《REST With Spring -_ &quot;REST With Spring Boot&quot;_<strong>的新版本终于发布了，当前的价格将在6月22日之前</strong>有效**，之后将永久增加50美元。</p><p><strong>&gt;&gt; 立即获取访问权限</strong></p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本文中，我们将探讨如何在Spring Boot过滤器中从_ServletResponse_检索响应体。</p><p>本质上，我们将定义问题，然后我们将使用一个解决方案，该解决方案缓存响应体，使其在Spring Boot过滤器中可用。让我们开始。</p><h2 id="_2-理解问题" tabindex="-1"><a class="header-anchor" href="#_2-理解问题"><span>2. 理解问题</span></a></h2><p>首先，让我们理解我们试图解决的问题。</p><p>在使用Spring Boot过滤器时，从_ServletResponse_访问响应体是棘手的。<strong>这是因为响应体不容易获得，因为它是在过滤器链完成执行后写入输出流的</strong>。</p><p>然而，一些操作，如生成哈希签名，需要在将响应发送给客户端之前获取响应体的内容。因此，我们需要找到一种方法来读取体的内容。</p><h2 id="_3-在过滤器中使用-contentcachingresponsewrapper" tabindex="-1"><a class="header-anchor" href="#_3-在过滤器中使用-contentcachingresponsewrapper"><span>3. 在过滤器中使用_ContentCachingResponseWrapper_</span></a></h2><p>为了克服前面定义的问题，我们将创建一个自定义过滤器并使用Spring框架提供的_ContentCachingResponseWrapper_类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Override
public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
  throws IOException, ServletException {
    ContentCachingResponseWrapper responseCacheWrapperObject =
      new ContentCachingResponseWrapper((HttpServletResponse) servletResponse);
    filterChain.doFilter(servletRequest, responseCacheWrapperObject);
    byte[] responseBody = responseCacheWrapperObject.getContentAsByteArray();
    MessageDigest md5Digest = MessageDigest.getInstance(&quot;MD5&quot;);
    byte[] md5Hash = md5Digest.digest(responseBody);
    String md5HashString = DatatypeConverter.printHexBinary(md5Hash);
    responseCacheWrapperObject.getResponse().setHeader(&quot;Response-Body-MD5&quot;, md5HashString);
    // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，包装器类允许我们包装_HttpServletResponse_来缓存响应体内容，并调用_doFilter()_将请求传递给下一个过滤器。</p><p>请记住，我们在这里必须不要忘记_doFilter()_调用。否则，传入的请求将不会进入Spring过滤器链中的下一个过滤器，应用程序也不会按我们预期的方式处理请求。实际上，<strong>不调用_doFilter()_是违反servlet规范的</strong>。</p><p>此外，我们不要忘记使用_responseCacheWrapperObject_调用_doFilter()_。否则，响应体将不会被缓存。简而言之，_ContentCachingResponseWrapper_将过滤器置于响应输出流和发起HTTP请求的客户端之间。因此，在创建响应体输出流之后，这种情况下是在_doFilter()_调用之后，内容在过滤器内可用以进行处理。</p><p>使用包装器后，可以使用_getContentAsByteArray()_方法在过滤器内获取响应体。我们使用这种方法来计算MD5哈希。</p><p>首先，我们使用_MessageDigest_类创建响应体的MD5哈希。其次，我们将字节数组转换为十六进制字符串。第三，我们使用_setHeader()_方法将结果哈希字符串设置为响应对象的标头。</p><p>如果需要，我们可以将字节数组转换为字符串，使主体的内容更加明确。</p><p>最后，在退出_doFilter()_方法之前，至关重要的是调用_copyBodyToResponse()_以将更新后的响应体复制回原始响应：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>responseCacheWrapperObject.copyBodyToResponse();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>在退出_doFilter()_方法之前调用_copyBodyToResponse()_至关重要。否则，客户端将不会收到完整的响应</strong>。</p><h2 id="_4-配置过滤器" tabindex="-1"><a class="header-anchor" href="#_4-配置过滤器"><span>4. 配置过滤器</span></a></h2><p>现在，我们需要在Spring Boot中添加过滤器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
public FilterRegistrationBean loggingFilter() {
    FilterRegistrationBean registrationBean = new FilterRegistrationBean&lt;&gt;();
    registrationBean.setFilter(new MD5Filter());
    return registrationBean;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们配置创建_FilterRegistrationBean_，使用我们之前创建的过滤器的实现。</p><h2 id="_5-测试md5" tabindex="-1"><a class="header-anchor" href="#_5-测试md5"><span>5. 测试MD5</span></a></h2><p>最后，我们可以使用Spring中的集成测试来测试一切是否按预期工作：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void whenExampleApiCallThenResponseHasMd5Header() throws Exception {
    String endpoint = &quot;/api/example&quot;;
    String expectedResponse = &quot;Hello, World!&quot;;
    String expectedMD5 = getMD5Hash(expectedResponse);

    MvcResult mvcResult = mockMvc.perform(get(endpoint).accept(MediaType.TEXT_PLAIN_VALUE))
      .andExpect(status().isOk())
      .andReturn();

    String md5Header = mvcResult.getResponse()
      .getHeader(&quot;Response-Body-MD5&quot;);
    assertThat(md5Header).isEqualTo(expectedMD5);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们调用返回正文中的“Hello, World!”文本的_/api/example_控制器。我们定义了_getMD5Hash()_方法，它将响应转换为与我们在过滤器中使用的类似的MD5：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private String getMD5Hash(String input) throws NoSuchAlgorithmException {
    MessageDigest md5Digest = MessageDigest.getInstance(&quot;MD5&quot;);
    byte[] md5Hash = md5Digest.digest(input.getBytes(StandardCharsets.UTF_8));
    return DatatypeConverter.printHexBinary(md5Hash);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了如何使用_ContentCachingResponseWrapper_类在Spring Boot过滤器中从_ServletResponse_检索响应体。我们使用这种机制展示了如何在HTTP响应头中实现主体的MD5编码。</p><p>如常，我们可以在GitHub上找到完整的代码。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。</p><p>OK</p>`,43),a=[s];function o(p,l){return n(),t("div",null,a)}const g=e(r,[["render",o],["__file","Get the Response Body in Spring Boot Filter.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/Archive/Get%20the%20Response%20Body%20in%20Spring%20Boot%20Filter.html","title":"在Spring Boot Filter中获取响应体","lang":"zh-CN","frontmatter":{"date":"2024-06-19T00:00:00.000Z","category":["Spring Boot","Java"],"tag":["Spring Boot","Filter","Response Body"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Filter, Response Body, Java, Web Applications"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Get%20the%20Response%20Body%20in%20Spring%20Boot%20Filter.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Spring Boot Filter中获取响应体"}],["meta",{"property":"og:description","content":"在Spring Boot Filter中获取响应体 无论你是刚开始学习还是拥有多年经验，Spring Boot 是构建新应用程序的绝佳选择，它让一切变得简单。 Jmix增强了Spring Boot开发者的能力，允许他们构建和交付全栈Web****应用程序，而无需涉足前端技术。它使你能够从简单的Web GUI CRUD应用程序到复杂的企业解决方案，消除了..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Filter"}],["meta",{"property":"article:tag","content":"Response Body"}],["meta",{"property":"article:published_time","content":"2024-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Spring Boot Filter中获取响应体\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Spring Boot Filter中获取响应体 无论你是刚开始学习还是拥有多年经验，Spring Boot 是构建新应用程序的绝佳选择，它让一切变得简单。 Jmix增强了Spring Boot开发者的能力，允许他们构建和交付全栈Web****应用程序，而无需涉足前端技术。它使你能够从简单的Web GUI CRUD应用程序到复杂的企业解决方案，消除了..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 理解问题","slug":"_2-理解问题","link":"#_2-理解问题","children":[]},{"level":2,"title":"3. 在过滤器中使用_ContentCachingResponseWrapper_","slug":"_3-在过滤器中使用-contentcachingresponsewrapper","link":"#_3-在过滤器中使用-contentcachingresponsewrapper","children":[]},{"level":2,"title":"4. 配置过滤器","slug":"_4-配置过滤器","link":"#_4-配置过滤器","children":[]},{"level":2,"title":"5. 测试MD5","slug":"_5-测试md5","link":"#_5-测试md5","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.74,"words":1423},"filePathRelative":"posts/baeldung/Archive/Get the Response Body in Spring Boot Filter.md","localizedDate":"2024年6月19日","excerpt":"\\n<p>无论你是刚开始学习还是拥有多年经验，<strong>Spring Boot</strong> 是构建新应用程序的绝佳选择，它让一切变得简单。</p>\\n<p>Jmix增强了Spring Boot开发者的能力，允许他们构建和交付<strong>全栈Web****应用程序</strong>，而无需涉足前端技术。它使你能够从简单的Web GUI CRUD应用程序到复杂的企业解决方案，消除了前端/后端分离及相关安全问题。</p>\\n<p><strong>Jmix平台</strong>包括一个构建在<strong>Spring Boot, JPA, 和 Vaadin</strong>之上的框架，并带有Jmix Studio，<strong>一个IntelliJ IDEA插件</strong>，配备了一套开发者生产力工具。该平台还提供了<strong>现成的</strong>插件，用于报告生成、BPM、地图等，你可以在Jmix应用程序中使用它们，或者作为单独的服务。所有技术都是相互连接的，使单个Java开发者能够以整个团队的水平执行任务，<strong>入门所需的知识最少</strong>。</p>","autoDesc":true}');export{g as comp,m as data};
