import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as e,a}from"./app-CbPcg273.js";const t={},p=a(`<hr><h1 id="spring-web-service-集成测试与-webserviceservertest" tabindex="-1"><a class="header-anchor" href="#spring-web-service-集成测试与-webserviceservertest"><span>Spring Web Service 集成测试与 @WebServiceServerTest</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本文中，我们将看到如何为使用 Spring Boot 构建的 SOAP Web 服务编写集成测试。</p><p>我们已经知道如何为应用程序类编写单元测试，并且我们已经在我们的 Spring Boot 测试教程中涵盖了一般的测试概念。因此，这里我们将专注于<strong>仅使用 <em>@WebServiceServerTest</em> 进行 Web 服务层的集成测试</strong>。</p><h2 id="_2-测试-spring-web-服务" tabindex="-1"><a class="header-anchor" href="#_2-测试-spring-web-服务"><span>2. 测试 Spring Web 服务</span></a></h2><p>在 Spring Web 服务中，端点是服务器端服务实现的关键概念。专门的 <em>@Endpoint</em> 注解将被注释的类标记为 Web 服务端点。重要的是，这些<strong>端点负责接收 XML 请求消息，调用所需的业务逻辑，并返回结果作为响应消息</strong>。</p><h3 id="_2-1-spring-web-服务测试支持" tabindex="-1"><a class="header-anchor" href="#_2-1-spring-web-服务测试支持"><span>2.1. Spring Web 服务测试支持</span></a></h3><p>为了测试这些端点，我们可以通过传入所需的参数或模拟对象轻松创建单元测试。然而，主要的缺点是这实际上并不测试通过线路发送的 XML 消息的内容。替代方法是<strong>创建集成测试以验证消息的 XML 内容</strong>。</p><p>Spring Web Services 2.0 引入了对这些端点的集成测试支持。<strong>提供此支持的核心类是 <em>MockWebServiceClient</em></strong>。它提供了一个流畅的 API，用于将 XML 消息发送到 Spring 应用程序上下文中配置的适当端点。此外，我们可以设置响应期望，验证响应 XML，并对我们的端点进行全面的集成测试。</p><p>然而，这需要启动整个应用程序上下文，这会减慢测试执行。这通常是不可取的，特别是如果我们希望为特定的 Web 服务端点创建快速和隔离的测试。</p><h3 id="_2-2-spring-boot-webserviceservertest" tabindex="-1"><a class="header-anchor" href="#_2-2-spring-boot-webserviceservertest"><span>2.2. Spring Boot <em>@WebServiceServerTest</em></span></a></h3><p>Spring Boot 2.6 通过 <em>@WebServiceServerTest</em> 注解扩展了 Web 服务测试支持。</p><p>我们可以使用它来进行<strong>仅关注 Web 服务层的测试，而不是加载整个应用程序上下文</strong>。换句话说，我们可以创建一个测试切片，其中只包含所需的 <em>@Endpoint</em> beans，并且我们可以使用 <em>@MockBean</em> 模拟任何依赖项。</p><p>这非常类似于 Spring Boot 已经提供的便捷测试切片注解，如 <em>@WebMvcTest</em>, <em>@DataJpaTest</em> 等。</p><h2 id="_3-设置示例项目" tabindex="-1"><a class="header-anchor" href="#_3-设置示例项目"><span>3. 设置示例项目</span></a></h2><h3 id="_3-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_3-1-依赖项"><span>3.1. 依赖项</span></a></h3><p>正如我们已经详细涵盖了 Spring Boot Web 服务项目，这里我们只包括我们项目所需的额外测试范围的 spring-ws-test 依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`org.springframework.ws\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`spring-ws-test\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`4.0.10\`&lt;/version&gt;\`
    \`&lt;scope&gt;\`test\`&lt;/scope&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-示例-web-服务" tabindex="-1"><a class="header-anchor" href="#_3-2-示例-web-服务"><span>3.2. 示例 Web 服务</span></a></h3><p>接下来，让我们创建一个简单的服务，用于返回指定产品 ID 的一些产品数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Endpoint</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProductEndpoint</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">ProductRepository</span> productRepository<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@ResponsePayload</span>
    <span class="token keyword">public</span> <span class="token class-name">GetProductResponse</span> <span class="token function">getProduct</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestPayload</span> <span class="token class-name">GetProductRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">GetProductResponse</span> response <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GetProductResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        response<span class="token punctuation">.</span><span class="token function">setProduct</span><span class="token punctuation">(</span>productRepository<span class="token punctuation">.</span><span class="token function">findProduct</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> response<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们用 <em>@Endpoint</em> 注解了 <em>ProductEndpoint</em> 组件，这将其注册为处理适当的 XML 请求。</p><p><em>getProduct</em> 方法接收请求对象，并从存储库获取产品数据，然后返回响应。存储库的细节在这里不重要。在我们的案例中，我们可以使用一个简单的内存实现来保持应用程序的简单性，并专注于我们的测试策略。</p><h2 id="_4-端点测试" tabindex="-1"><a class="header-anchor" href="#_4-端点测试"><span>4. 端点测试</span></a></h2><p>最后，我们可以创建一个测试切片，并验证 Web 服务层中我们的 XML 消息的正确处理：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@WebServiceServerTest</span>
<span class="token keyword">class</span> <span class="token class-name">ProductEndpointIntegrationTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">MockWebServiceClient</span> client<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@MockBean</span>
    <span class="token keyword">private</span> <span class="token class-name">ProductRepository</span> productRepository<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">givenXmlRequest_whenServiceInvoked_thenValidResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Product</span> product <span class="token operator">=</span> <span class="token function">createProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">when</span><span class="token punctuation">(</span>productRepository<span class="token punctuation">.</span><span class="token function">findProduct</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span>product<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">StringSource</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringSource</span><span class="token punctuation">(</span>
            <span class="token string">&quot;\`&lt;bd:getProductRequest xmlns:bd=&#39;http://baeldung.com/spring-boot-web-service&#39;&gt;\`&quot;</span> <span class="token operator">+</span>
            <span class="token string">&quot;\`\`&lt;bd:id&gt;\`\`1\`\`&lt;/bd:id&gt;\`\`&quot;</span> <span class="token operator">+</span>
            <span class="token string">&quot;\`&lt;/bd:getProductRequest&gt;\`&quot;</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">StringSource</span> expectedResponse <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringSource</span><span class="token punctuation">(</span>
            <span class="token string">&quot;\`&lt;bd:getProductResponse xmlns:bd=&#39;http://baeldung.com/spring-boot-web-service&#39;&gt;\`&quot;</span> <span class="token operator">+</span>
            <span class="token string">&quot;\`&lt;bd:product&gt;\`&quot;</span> <span class="token operator">+</span>
            <span class="token string">&quot;\`\`&lt;bd:id&gt;\`\`1\`\`&lt;/bd:id&gt;\`\`&quot;</span> <span class="token operator">+</span>
            <span class="token string">&quot;\`&lt;bd:name&gt;\`Product 1\`&lt;/bd:name&gt;\`&quot;</span> <span class="token operator">+</span>
            <span class="token string">&quot;\`&lt;/bd:product&gt;\`&quot;</span> <span class="token operator">+</span>
            <span class="token string">&quot;\`&lt;/bd:getProductResponse&gt;\`&quot;</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>

        client<span class="token punctuation">.</span><span class="token function">sendRequest</span><span class="token punctuation">(</span><span class="token function">withPayload</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">noFault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">validPayload</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ClassPathResource</span><span class="token punctuation">(</span><span class="token string">&quot;webservice/products.xsd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">payload</span><span class="token punctuation">(</span>expectedResponse<span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">xpath</span><span class="token punctuation">(</span><span class="token string">&quot;/bd:getProductResponse/bd:product[1]/bd:name&quot;</span><span class="token punctuation">,</span> <span class="token constant">NAMESPACE_MAPPING</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">evaluatesTo</span><span class="token punctuation">(</span><span class="token string">&quot;Product 1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们只配置了应用程序中带有 <em>@Endpoint</em> 注解的 beans 用于我们的集成测试。换句话说，<strong>这个测试切片创建了一个减少的应用程序上下文</strong>。这有助于我们构建有针对性的和快速的集成测试，而不需要反复加载整个应用程序上下文所带来的性能损失。</p><p>重要的是，<strong>这个注解还配置了一个 <em>MockWebServiceClient</em> 以及其他相关的自动配置</strong>。因此，我们可以将此客户端连接到我们的测试中，并使用它发送 <em>getProductRequest</em> XML 请求，然后是各种流畅的期望。</p><p>期望验证响应 XML 符合给定的 XSD 模式，并且与预期的 XML 响应匹配。我们还可以使用 XPath 表达式来评估和比较响应 XML 中的各种值。</p><h3 id="_4-1-端点协作者" tabindex="-1"><a class="header-anchor" href="#_4-1-端点协作者"><span>4.1. 端点协作者</span></a></h3><p>在我们的示例中，我们使用了 <em>@MockBean</em> 来模拟 <em>ProductEndpoint</em> 中所需的存储库。如果没有这个模拟，应用程序上下文无法启动，因为完全自动配置被禁用。换句话说，<strong>测试框架在测试执行之前不会配置任何 <em>@Component</em>, <em>@Service,</em> 或 <em>@Repository</em> beans</strong>。</p><p>然而，如果我们确实需要实际的协作者而不是模拟对象，那么我们可以声明这些使用 <em>@Import</em>。Spring 将查找这些类，然后将它们连接到端点，如所需的。</p><h3 id="_4-2-加载整个上下文" tabindex="-1"><a class="header-anchor" href="#_4-2-加载整个上下文"><span>4.2. 加载整个上下文</span></a></h3><p>正如之前提到的，<em>@WebServiceServerTest</em> 不会加载整个应用程序上下文。如果我们确实需要为测试加载整个应用程序上下文，那么我们应该考虑使用 <em>@SpringBootTest</em> 结合 <em>@AutoConfigureMockWebServiceClient.</em> 然后我们可以使用这个客户端以类似的方式发送请求并验证响应，如之前所示。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们查看了 Spring Boot 中引入的 <em>@WebServiceServerTest</em> 注解。</p><p>最初，我们讨论了 Web 服务应用程序中的 Spring Boot 测试支持。随后，我们看到了如何使用此注解为 Web 服务层创建测试切片，这有助于构建快速和专注的集成测试。</p><p>像往常一样，完整的源代码可以在 GitHub 上找到。</p>`,39),o=[p];function i(c,r){return e(),s("div",null,o)}const d=n(t,[["render",i],["__file","2024-07-18-Spring Web Service Integration Tests with  WebServiceServerTest.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Spring%20Web%20Service%20Integration%20Tests%20with%20%20WebServiceServerTest.html","title":"Spring Web Service 集成测试与 @WebServiceServerTest","lang":"zh-CN","frontmatter":{"date":"2024-07-18T00:00:00.000Z","category":["Spring Boot","Web Services"],"tag":["Spring Web Services","Integration Testing"],"head":[["meta",{"name":"keywords","content":"Spring Web Service Integration Tests, @WebServiceServerTest, Spring Boot, Web Services Testing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Spring%20Web%20Service%20Integration%20Tests%20with%20%20WebServiceServerTest.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Web Service 集成测试与 @WebServiceServerTest"}],["meta",{"property":"og:description","content":"Spring Web Service 集成测试与 @WebServiceServerTest 1. 引言 在本文中，我们将看到如何为使用 Spring Boot 构建的 SOAP Web 服务编写集成测试。 我们已经知道如何为应用程序类编写单元测试，并且我们已经在我们的 Spring Boot 测试教程中涵盖了一般的测试概念。因此，这里我们将专注于仅使..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T11:08:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Web Services"}],["meta",{"property":"article:tag","content":"Integration Testing"}],["meta",{"property":"article:published_time","content":"2024-07-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T11:08:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Web Service 集成测试与 @WebServiceServerTest\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T11:08:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Web Service 集成测试与 @WebServiceServerTest 1. 引言 在本文中，我们将看到如何为使用 Spring Boot 构建的 SOAP Web 服务编写集成测试。 我们已经知道如何为应用程序类编写单元测试，并且我们已经在我们的 Spring Boot 测试教程中涵盖了一般的测试概念。因此，这里我们将专注于仅使..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 测试 Spring Web 服务","slug":"_2-测试-spring-web-服务","link":"#_2-测试-spring-web-服务","children":[{"level":3,"title":"2.1. Spring Web 服务测试支持","slug":"_2-1-spring-web-服务测试支持","link":"#_2-1-spring-web-服务测试支持","children":[]},{"level":3,"title":"2.2. Spring Boot @WebServiceServerTest","slug":"_2-2-spring-boot-webserviceservertest","link":"#_2-2-spring-boot-webserviceservertest","children":[]}]},{"level":2,"title":"3. 设置示例项目","slug":"_3-设置示例项目","link":"#_3-设置示例项目","children":[{"level":3,"title":"3.1. 依赖项","slug":"_3-1-依赖项","link":"#_3-1-依赖项","children":[]},{"level":3,"title":"3.2. 示例 Web 服务","slug":"_3-2-示例-web-服务","link":"#_3-2-示例-web-服务","children":[]}]},{"level":2,"title":"4. 端点测试","slug":"_4-端点测试","link":"#_4-端点测试","children":[{"level":3,"title":"4.1. 端点协作者","slug":"_4-1-端点协作者","link":"#_4-1-端点协作者","children":[]},{"level":3,"title":"4.2. 加载整个上下文","slug":"_4-2-加载整个上下文","link":"#_4-2-加载整个上下文","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721300939000,"updatedTime":1721300939000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.15,"words":1546},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Spring Web Service Integration Tests with  WebServiceServerTest.md","localizedDate":"2024年7月18日","excerpt":"<hr>\\n<h1>Spring Web Service 集成测试与 @WebServiceServerTest</h1>\\n<h2>1. 引言</h2>\\n<p>在本文中，我们将看到如何为使用 Spring Boot 构建的 SOAP Web 服务编写集成测试。</p>\\n<p>我们已经知道如何为应用程序类编写单元测试，并且我们已经在我们的 Spring Boot 测试教程中涵盖了一般的测试概念。因此，这里我们将专注于<strong>仅使用 <em>@WebServiceServerTest</em> 进行 Web 服务层的集成测试</strong>。</p>\\n<h2>2. 测试 Spring Web 服务</h2>","autoDesc":true}');export{d as comp,v as data};
