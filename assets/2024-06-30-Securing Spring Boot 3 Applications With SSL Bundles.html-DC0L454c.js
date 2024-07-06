import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-ConjvFaO.js";const i={},l=t(`<h1 id="使用ssl-bundles保护spring-boot-3应用程序" tabindex="-1"><a class="header-anchor" href="#使用ssl-bundles保护spring-boot-3应用程序"><span>使用SSL Bundles保护Spring Boot 3应用程序</span></a></h1><p>如果您正在处理Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程。</p><p><strong>&gt;&gt; 学习Spring</strong><strong>安全</strong></p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在Spring Boot应用程序中管理安全通信通常涉及处理复杂的配置。挑战通常从处理信任材料开始，如证书和私钥，它们以JKS、PKCS #12或PEM等各种格式出现。每种格式都有其自身的处理要求。</p><p>幸运的是，Spring Boot 3.1引入了SSL Bundles，这是一个旨在简化这些复杂性的功能。在本教程中，我们将探讨SSL Bundles是什么以及它们如何简化Spring Boot应用程序的SSL配置任务。</p><p>通常，一旦我们获得了信任材料，我们需要将其转换为应用程序可以使用的Java对象。这通常意味着要处理诸如_java.security.KeyStore_用于存储密钥材料、_javax.net.ssl.KeyManager_用于管理这些密钥材料，以及_javax.net.ssl.SSLContext_用于创建安全套接字连接的类。</p><p>每个这些类都需要另一层理解和配置，使过程变得繁琐且容易出错。不同的Spring Boot组件也可能需要深入到不同的抽象层次来应用这些设置，为任务增加了另一层难度。</p><p><strong>SSL Bundle将所有信任材料和配置设置，如密钥库、证书和私钥，封装到一个单一的、易于管理的单元中。</strong> 一旦配置了SSL Bundle，它可以应用于一个或多个网络连接，无论是传入的还是传出的。</p><p>SSL Bundle的配置属性位于_application.yaml_或_application.properties_配置文件中的_spring.ssl.bundle_前缀下。</p><p>让我们从JKS Bundles开始。我们使用_spring.ssl.bundle.jks_来配置使用Java Keystore文件的Bundle：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring:
  ssl:
    bundle:
      jks:
        server:
          key:
            alias: &quot;server&quot;
          keystore:
            location: &quot;classpath:server.p12&quot;
            password: &quot;secret&quot;
            type: &quot;PKCS12&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在PEM Bundles的情况下，我们使用_spring.ssl.bundle.pem_来配置使用PEM编码文本文件的Bundle：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring:
  ssl:
    bundle:
      pem:
        client:
          truststore:
            certificate: &quot;classpath:client.crt&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦这些Bundle配置完成，它们就可以跨微服务应用——无论是需要安全访问数据库的库存服务，需要安全API调用的用户认证服务，还是与支付网关安全通信的支付处理服务。</p><p><strong>Spring Boot根据SSL Bundle配置自动创建Java对象，如_KeyStore_、<em>KeyManager_和_SSLContext</em>。</strong> 这消除了手动创建和管理这些对象的需要，使过程更直接，错误更少。</p><h2 id="_3-使用ssl-bundles保护resttemplate" tabindex="-1"><a class="header-anchor" href="#_3-使用ssl-bundles保护resttemplate"><span>3. 使用SSL Bundles保护RestTemplate</span></a></h2><p>让我们从使用RestTemplate bean时利用SSL Bundles开始。为此，我们将使用一个示例Spring Boot应用程序，但首先，我们需要生成将用作SSL Bundle的密钥。</p><p>我们将使用通常与git一起安装的_openssl_二进制文件通过执行以下命令从项目根目录生成密钥：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ openssl req -x509 -newkey rsa:4096 -keyout src/main/resources/key.pem -out src/main/resources/cert.pem -days 365 -passout pass:FooBar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们将此密钥转换为PKCS12格式：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ openssl pkcs12 -export -in src/main/resources/cert.pem -inkey src/main/resources/key.pem -out src/main/resources/keystore.p12 -name secure-service -passin pass:FooBar -passout pass:FooBar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>结果，我们拥有配置SSL bundles所需的一切；让我们在_application.yml_文件中定义一个名为_“secure-service”_的Bundle：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring:
 ssl:
   bundle:
     jks:
       secure-service:
         key:
           alias: &quot;secure-service&quot;
         keystore:
           location: &quot;classpath:keystore.p12&quot;
           password: &quot;FooBar&quot;
           type: &quot;PKCS12&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们可以通过调用_setSslBundle()_方法将我们的Bundle设置在RestTemplate上：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
public RestTemplate restTemplate(RestTemplateBuilder restTemplateBuilder, SslBundles sslBundles) {
    return restTemplateBuilder.setSslBundle(sslBundles.getBundle(&quot;secure-service&quot;)).build();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们可以使用配置好的RestTemplate bean调用API：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Service
public class SecureServiceRestApi {
    private final RestTemplate restTemplate;

    @Autowired
    public SecureServiceRestApi(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String fetchData(String dataId) {
        ResponseEntity\`&lt;String&gt;\` response = restTemplate.exchange(
          &quot;https://secure-service.com/api/data/{id}&quot;,
          HttpMethod.GET,
          null,
          String.class,
          dataId
        );
        return response.getBody();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们的Spring Boot应用程序中的SSL Bundle用于验证_secure-service_的证书，确保加密和安全的通信通道。</strong> 然而，这并不限制我们在API端使用客户端证书进行身份验证。我们将在后面看到如何获取_SSLContext_来配置自定义客户端。</p><h2 id="_4-利用spring-boot的自动配置-sslbundles" tabindex="-1"><a class="header-anchor" href="#_4-利用spring-boot的自动配置-sslbundles"><span>4. 利用Spring Boot的自动配置_SSLBundles_</span></a></h2><p>在Spring Boot的SSL Bundles之前，开发人员通常使用支持SSL配置的经典Java类：</p><ul><li><em>java.security.KeyStore</em>：这些实例被用作密钥库和信任库，有效地充当加密密钥和证书的安全存储库。</li><li><em>javax.net.ssl.KeyManager_和_javax.net.ssl.TrustManager</em>：这些实例分别在SSL通信期间管理密钥和信任决策。</li><li><em>javax.net.ssl.SSLContext</em>：这些实例充当_SSLEngine_和_SSLSocket_对象的工厂，协调SSL配置在运行时的实现。</li></ul><p><strong>Spring Boot 3.1引入了一个结构化的抽象层，分为Java接口</strong>：</p><ul><li><em>SslStoreBundle</em>：提供对包含加密密钥和受信任证书的_KeyStore_对象的访问。</li><li><em>SslManagerBundle</em>：协调并提供管理_KeyManager_和_TrustManager_对象的方法。</li><li><em>SslBundle</em>：作为一个一站式服务，将所有这些功能聚合到与SSL生态系统的统一交互模型中。</li></ul><p>随后，Spring Boot自动配置了一个_SslBundles_ bean。因此，<strong>我们可以方便地将_SslBundle_实例注入到任何Spring Bean中</strong>。这对于为遗留代码库和自定义REST客户端配置安全通信非常有用。</p><p>例如，让我们考虑需要为自定义安全_HttpClient_定制_SSLContext_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Component
public class SecureRestTemplateConfig {
    private final SSLContext sslContext;

    @Autowired
    public SecureRestTemplateConfig(SslBundles sslBundles) throws NoSuchSslBundleException {
        SslBundle sslBundle = sslBundles.getBundle(&quot;secure-service&quot;);
        this.sslContext = sslBundle.createSslContext();
    }

    @Bean
    public RestTemplate secureRestTemplate() {
        SSLConnectionSocketFactory sslSocketFactory = SSLConnectionSocketFactoryBuilder.create().setSslContext(this.sslContext).build();
        HttpClientConnectionManager cm = PoolingHttpClientConnectionManagerBuilder.create().setSSLSocketFactory(sslSocketFactory).build();
        HttpClient httpClient = HttpClients.custom().setConnectionManager(cm).evictExpiredConnections().build();
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory(httpClient);
        return new RestTemplate(factory);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们将_SslBundles_实例注入到_Autowired_构造函数中。实际上，<em>SslBundles_为我们提供了对所有配置的SSL Bundles的访问。因此，我们检索_secure-service</em> Bundle并创建上下文。稍后，我们使用_SSLContext_实例创建自定义_HttpClient_并应用它来创建一个_RestTemplate_ bean。</p><h2 id="_5-使用ssl-bundles与数据服务" tabindex="-1"><a class="header-anchor" href="#_5-使用ssl-bundles与数据服务"><span>5. 使用SSL Bundles与数据服务</span></a></h2><p>不同的数据服务具有不同程度的SSL配置选项，在配置过程中创建复杂性。</p><p><strong>SSL Bundles引入了一种更统一的方法来跨广泛的数据服务配置SSL</strong>：</p><ul><li>Cassandra：<em>spring.cassandra.ssl</em></li><li>Couchbase：<em>spring.couchbase.env.ssl</em></li><li>Elasticsearch：<em>spring.elasticsearch.restclient.ssl</em></li><li>MongoDB：<em>spring.data.mongodb.ssl</em></li><li>Redis：<em>spring.data.redis.ssl</em></li></ul><p>现在，<strong>这些服务中的大多数支持一个_*.ssl.enabled_属性。此属性在客户端库中激活SSL支持，利用Java运行时的_cacerts_中找到的信任材料</strong>。</p><p>此外，_*.ssl.bundle_属性允许我们将命名的SSL Bundle应用于自定义信任材料，从而在多个服务连接中实现一致性和可重用性。</p><p>以这个例子为例，假设有一个名为_mongodb-ssl-bundle_的SSL Bundle。此Bundle包含连接到MongoDB实例所需的必要信任材料。</p><p>让我们定义_application.yml_文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring:
  data:
    mongodb:
      ssl:
        enabled: true
        bundle: mongodb-ssl-bundle
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过简单地添加这些属性，Spring Boot应用程序中的MongoDB客户端库自动使用在_mongodb-ssl-bundle_中指定的SSL上下文和信任材料。</p><h2 id="_6-使用ssl-bundles与嵌入式服务器" tabindex="-1"><a class="header-anchor" href="#_6-使用ssl-bundles与嵌入式服务器"><span>6. 使用SSL Bundles与嵌入式服务器</span></a></h2><p>通过使用SSL Bundles，SpringBoot中的嵌入式Web服务器的SSL配置也可以通过使用SSL Bundles来简化。</p><p>传统上，<em>server.ssl.</em>*_属性用于设置每个单独的SSL配置。<strong>有了SSL Bundles，配置可以分组在一起，然后在多个连接中重复使用，减少错误的机会，简化整体管理</strong>。</p><p>首先，让我们探索传统的单独属性方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>server:
  ssl:
    key-alias: &quot;server&quot;
    key-password: &quot;keysecret&quot;
    key-store: &quot;classpath:server.p12&quot;
    key-store-password: &quot;storesecret&quot;
    client-auth: NEED
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一方面，SSL Bundle方法允许将相同的配置封装起来：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring:
  ssl:
    bundle:
      jks:
        web-server:
          key:
            alias: &quot;server&quot;
            password: &quot;keysecret&quot;
          keystore:
            location: &quot;classpath:server.p12&quot;
            password: &quot;storesecret&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以使用定义好的Bundle来保护我们的Web服务器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>server:
  ssl:
    bundle: &quot;web-server&quot;
    client-auth: NEED
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然这两种方法都能保护嵌入式Web服务器，但SSL Bundle方法在配置管理上更为高效。此功能也适用于其他配置，如_management.server.ssl_和_spring.rsocket.server.ssl_。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们探讨了Spring Boot中的新SSL Bundles功能，它可以简化和统一配置信任材料的过程。</p><p>与传统的_server.ssl._*_属性相比，SSL Bundles提供了一种结构化的方式来管理密钥库和信任库。这对于减少配置错误风险和提高跨多个服务管理SSL的效率特别有益。</p><p>此外，<strong>SSL Bundles非常适合集中管理，允许相同的Bundle在应用程序的不同部分重复使用</strong>。</p><p>通过整合SSL Bundles，开发人员不仅可以简化配置过程，还可以提升Spring Boot应用程序中嵌入式Web服务器的安全姿态。</p><p>如常，所有代码示例都可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/8f805654477ab1c420662b9db32dba1f?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-security-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"></p><p>OK</p>`,66),a=[l];function r(d,o){return s(),n("div",null,a)}const p=e(i,[["render",r],["__file","2024-06-30-Securing Spring Boot 3 Applications With SSL Bundles.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Securing%20Spring%20Boot%203%20Applications%20With%20SSL%20Bundles.html","title":"使用SSL Bundles保护Spring Boot 3应用程序","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Boot","Security"],"tag":["SSL","Spring Security"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Spring Security, SSL Bundles, Security, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Securing%20Spring%20Boot%203%20Applications%20With%20SSL%20Bundles.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用SSL Bundles保护Spring Boot 3应用程序"}],["meta",{"property":"og:description","content":"使用SSL Bundles保护Spring Boot 3应用程序 如果您正在处理Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程。 >> 学习Spring 安全 1. 引言 在Spring Boot应用程序中管理安全通信通常涉及处理复杂的配置。挑战通常从处理信任材料开始，如证书和私钥，它们以JKS、PKCS..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T09:34:05.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"SSL"}],["meta",{"property":"article:tag","content":"Spring Security"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T09:34:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用SSL Bundles保护Spring Boot 3应用程序\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/8f805654477ab1c420662b9db32dba1f?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-security-post-footer-main-1.2.0.jpg\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T09:34:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用SSL Bundles保护Spring Boot 3应用程序 如果您正在处理Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程。 >> 学习Spring 安全 1. 引言 在Spring Boot应用程序中管理安全通信通常涉及处理复杂的配置。挑战通常从处理信任材料开始，如证书和私钥，它们以JKS、PKCS..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"3. 使用SSL Bundles保护RestTemplate","slug":"_3-使用ssl-bundles保护resttemplate","link":"#_3-使用ssl-bundles保护resttemplate","children":[]},{"level":2,"title":"4. 利用Spring Boot的自动配置_SSLBundles_","slug":"_4-利用spring-boot的自动配置-sslbundles","link":"#_4-利用spring-boot的自动配置-sslbundles","children":[]},{"level":2,"title":"5. 使用SSL Bundles与数据服务","slug":"_5-使用ssl-bundles与数据服务","link":"#_5-使用ssl-bundles与数据服务","children":[]},{"level":2,"title":"6. 使用SSL Bundles与嵌入式服务器","slug":"_6-使用ssl-bundles与嵌入式服务器","link":"#_6-使用ssl-bundles与嵌入式服务器","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719740045000,"updatedTime":1719740045000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.31,"words":2192},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Securing Spring Boot 3 Applications With SSL Bundles.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>如果您正在处理Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程。</p>\\n<p><strong>&gt;&gt; 学习Spring</strong>\\n<strong>安全</strong></p>\\n<h2>1. 引言</h2>\\n<p>在Spring Boot应用程序中管理安全通信通常涉及处理复杂的配置。挑战通常从处理信任材料开始，如证书和私钥，它们以JKS、PKCS #12或PEM等各种格式出现。每种格式都有其自身的处理要求。</p>\\n<p>幸运的是，Spring Boot 3.1引入了SSL Bundles，这是一个旨在简化这些复杂性的功能。在本教程中，我们将探讨SSL Bundles是什么以及它们如何简化Spring Boot应用程序的SSL配置任务。</p>","autoDesc":true}');export{p as comp,v as data};
