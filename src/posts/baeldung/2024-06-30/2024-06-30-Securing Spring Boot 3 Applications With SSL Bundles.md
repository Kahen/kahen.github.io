---
date: 2022-04-01
category:
  - Spring Boot
  - Security
tag:
  - SSL
  - Spring Security
head:
  - - meta
    - name: keywords
      content: Spring Boot, Spring Security, SSL Bundles, Security, Java
---
# 使用SSL Bundles保护Spring Boot 3应用程序

如果您正在处理Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程。

**>> 学习Spring**
**安全**

## 1. 引言

在Spring Boot应用程序中管理安全通信通常涉及处理复杂的配置。挑战通常从处理信任材料开始，如证书和私钥，它们以JKS、PKCS #12或PEM等各种格式出现。每种格式都有其自身的处理要求。

幸运的是，Spring Boot 3.1引入了SSL Bundles，这是一个旨在简化这些复杂性的功能。在本教程中，我们将探讨SSL Bundles是什么以及它们如何简化Spring Boot应用程序的SSL配置任务。

通常，一旦我们获得了信任材料，我们需要将其转换为应用程序可以使用的Java对象。这通常意味着要处理诸如_java.security.KeyStore_用于存储密钥材料、_javax.net.ssl.KeyManager_用于管理这些密钥材料，以及_javax.net.ssl.SSLContext_用于创建安全套接字连接的类。

每个这些类都需要另一层理解和配置，使过程变得繁琐且容易出错。不同的Spring Boot组件也可能需要深入到不同的抽象层次来应用这些设置，为任务增加了另一层难度。

**SSL Bundle将所有信任材料和配置设置，如密钥库、证书和私钥，封装到一个单一的、易于管理的单元中。** 一旦配置了SSL Bundle，它可以应用于一个或多个网络连接，无论是传入的还是传出的。

SSL Bundle的配置属性位于_application.yaml_或_application.properties_配置文件中的_spring.ssl.bundle_前缀下。

让我们从JKS Bundles开始。我们使用_spring.ssl.bundle.jks_来配置使用Java Keystore文件的Bundle：

```
spring:
  ssl:
    bundle:
      jks:
        server:
          key:
            alias: "server"
          keystore:
            location: "classpath:server.p12"
            password: "secret"
            type: "PKCS12"
```

在PEM Bundles的情况下，我们使用_spring.ssl.bundle.pem_来配置使用PEM编码文本文件的Bundle：

```
spring:
  ssl:
    bundle:
      pem:
        client:
          truststore:
            certificate: "classpath:client.crt"
```

一旦这些Bundle配置完成，它们就可以跨微服务应用——无论是需要安全访问数据库的库存服务，需要安全API调用的用户认证服务，还是与支付网关安全通信的支付处理服务。

**Spring Boot根据SSL Bundle配置自动创建Java对象，如_KeyStore_、_KeyManager_和_SSLContext_。** 这消除了手动创建和管理这些对象的需要，使过程更直接，错误更少。

## 3. 使用SSL Bundles保护RestTemplate

让我们从使用RestTemplate bean时利用SSL Bundles开始。为此，我们将使用一个示例Spring Boot应用程序，但首先，我们需要生成将用作SSL Bundle的密钥。

我们将使用通常与git一起安装的_openssl_二进制文件通过执行以下命令从项目根目录生成密钥：

```
$ openssl req -x509 -newkey rsa:4096 -keyout src/main/resources/key.pem -out src/main/resources/cert.pem -days 365 -passout pass:FooBar
```

现在，让我们将此密钥转换为PKCS12格式：

```
$ openssl pkcs12 -export -in src/main/resources/cert.pem -inkey src/main/resources/key.pem -out src/main/resources/keystore.p12 -name secure-service -passin pass:FooBar -passout pass:FooBar
```

结果，我们拥有配置SSL bundles所需的一切；让我们在_application.yml_文件中定义一个名为_“secure-service”_的Bundle：

```
spring:
 ssl:
   bundle:
     jks:
       secure-service:
         key:
           alias: "secure-service"
         keystore:
           location: "classpath:keystore.p12"
           password: "FooBar"
           type: "PKCS12"
```

接下来，我们可以通过调用_setSslBundle()_方法将我们的Bundle设置在RestTemplate上：

```
@Bean
public RestTemplate restTemplate(RestTemplateBuilder restTemplateBuilder, SslBundles sslBundles) {
    return restTemplateBuilder.setSslBundle(sslBundles.getBundle("secure-service")).build();
}
```

最后，我们可以使用配置好的RestTemplate bean调用API：

```
@Service
public class SecureServiceRestApi {
    private final RestTemplate restTemplate;

    @Autowired
    public SecureServiceRestApi(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String fetchData(String dataId) {
        ResponseEntity`<String>` response = restTemplate.exchange(
          "https://secure-service.com/api/data/{id}",
          HttpMethod.GET,
          null,
          String.class,
          dataId
        );
        return response.getBody();
    }
}
```

**我们的Spring Boot应用程序中的SSL Bundle用于验证_secure-service_的证书，确保加密和安全的通信通道。** 然而，这并不限制我们在API端使用客户端证书进行身份验证。我们将在后面看到如何获取_SSLContext_来配置自定义客户端。

## 4. 利用Spring Boot的自动配置_SSLBundles_

在Spring Boot的SSL Bundles之前，开发人员通常使用支持SSL配置的经典Java类：

- _java.security.KeyStore_：这些实例被用作密钥库和信任库，有效地充当加密密钥和证书的安全存储库。
- _javax.net.ssl.KeyManager_和_javax.net.ssl.TrustManager_：这些实例分别在SSL通信期间管理密钥和信任决策。
- _javax.net.ssl.SSLContext_：这些实例充当_SSLEngine_和_SSLSocket_对象的工厂，协调SSL配置在运行时的实现。

**Spring Boot 3.1引入了一个结构化的抽象层，分为Java接口**：

- _SslStoreBundle_：提供对包含加密密钥和受信任证书的_KeyStore_对象的访问。
- _SslManagerBundle_：协调并提供管理_KeyManager_和_TrustManager_对象的方法。
- _SslBundle_：作为一个一站式服务，将所有这些功能聚合到与SSL生态系统的统一交互模型中。

随后，Spring Boot自动配置了一个_SslBundles_ bean。因此，**我们可以方便地将_SslBundle_实例注入到任何Spring Bean中**。这对于为遗留代码库和自定义REST客户端配置安全通信非常有用。

例如，让我们考虑需要为自定义安全_HttpClient_定制_SSLContext_：

```
@Component
public class SecureRestTemplateConfig {
    private final SSLContext sslContext;

    @Autowired
    public SecureRestTemplateConfig(SslBundles sslBundles) throws NoSuchSslBundleException {
        SslBundle sslBundle = sslBundles.getBundle("secure-service");
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
```

在上面的代码中，我们将_SslBundles_实例注入到_Autowired_构造函数中。实际上，_SslBundles_为我们提供了对所有配置的SSL Bundles的访问。因此，我们检索_secure-service_ Bundle并创建上下文。稍后，我们使用_SSLContext_实例创建自定义_HttpClient_并应用它来创建一个_RestTemplate_ bean。

## 5. 使用SSL Bundles与数据服务

不同的数据服务具有不同程度的SSL配置选项，在配置过程中创建复杂性。

**SSL Bundles引入了一种更统一的方法来跨广泛的数据服务配置SSL**：

- Cassandra：_spring.cassandra.ssl_
- Couchbase：_spring.couchbase.env.ssl_
- Elasticsearch：_spring.elasticsearch.restclient.ssl_
- MongoDB：_spring.data.mongodb.ssl_
- Redis：_spring.data.redis.ssl_

现在，**这些服务中的大多数支持一个_*.ssl.enabled_属性。此属性在客户端库中激活SSL支持，利用Java运行时的_cacerts_中找到的信任材料**。

此外，_*.ssl.bundle_属性允许我们将命名的SSL Bundle应用于自定义信任材料，从而在多个服务连接中实现一致性和可重用性。

以这个例子为例，假设有一个名为_mongodb-ssl-bundle_的SSL Bundle。此Bundle包含连接到MongoDB实例所需的必要信任材料。

让我们定义_application.yml_文件：

```
spring:
  data:
    mongodb:
      ssl:
        enabled: true
        bundle: mongodb-ssl-bundle
```

通过简单地添加这些属性，Spring Boot应用程序中的MongoDB客户端库自动使用在_mongodb-ssl-bundle_中指定的SSL上下文和信任材料。

## 6. 使用SSL Bundles与嵌入式服务器

通过使用SSL Bundles，SpringBoot中的嵌入式Web服务器的SSL配置也可以通过使用SSL Bundles来简化。

传统上，_server.ssl._*_属性用于设置每个单独的SSL配置。**有了SSL Bundles，配置可以分组在一起，然后在多个连接中重复使用，减少错误的机会，简化整体管理**。

首先，让我们探索传统的单独属性方法：

```
server:
  ssl:
    key-alias: "server"
    key-password: "keysecret"
    key-store: "classpath:server.p12"
    key-store-password: "storesecret"
    client-auth: NEED
```

另一方面，SSL Bundle方法允许将相同的配置封装起来：

```
spring:
  ssl:
    bundle:
      jks:
        web-server:
          key:
            alias: "server"
            password: "keysecret"
          keystore:
            location: "classpath:server.p12"
            password: "storesecret"
```

现在，我们可以使用定义好的Bundle来保护我们的Web服务器：

```
server:
  ssl:
    bundle: "web-server"
    client-auth: NEED
```

虽然这两种方法都能保护嵌入式Web服务器，但SSL Bundle方法在配置管理上更为高效。此功能也适用于其他配置，如_management.server.ssl_和_spring.rsocket.server.ssl_。

## 7. 结论

在本文中，我们探讨了Spring Boot中的新SSL Bundles功能，它可以简化和统一配置信任材料的过程。

与传统的_server.ssl._*_属性相比，SSL Bundles提供了一种结构化的方式来管理密钥库和信任库。这对于减少配置错误风险和提高跨多个服务管理SSL的效率特别有益。

此外，**SSL Bundles非常适合集中管理，允许相同的Bundle在应用程序的不同部分重复使用**。

通过整合SSL Bundles，开发人员不仅可以简化配置过程，还可以提升Spring Boot应用程序中嵌入式Web服务器的安全姿态。

如常，所有代码示例都可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/8f805654477ab1c420662b9db32dba1f?s=50&r=g)![img](https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-security-post-footer-main-1.2.0.jpg)

OK