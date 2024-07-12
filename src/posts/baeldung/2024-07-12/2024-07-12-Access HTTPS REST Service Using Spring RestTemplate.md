---
date: 2022-04-01
category:
  - Spring Security
  - OAuth
tag:
  - RestTemplate
  - HTTPS
  - SSL
head:
  - - meta
    - name: keywords
      content: Spring, RestTemplate, HTTPS, SSL, 安全性
---
# 使用Spring RestTemplate访问HTTPS REST服务

如果你正在研究Spring Security（特别是OAuth）的实现，一定要看看《学习Spring安全》课程。

**>> 学习Spring**
**安全**

## 1. 概述

在本教程中，我们将看到如何使用Spring的RestTemplate来消费一个使用HTTPS保护的REST服务。

## 2. 设置

**我们知道要保护REST服务，我们需要一个证书和一个从证书生成的密钥库。** 我们可以从证书颁发机构（CA）获取证书，以确保应用程序在生产级应用中是安全和受信任的。

对于本文的目的，我们将在我们的示例应用程序中使用自签名证书。

我们将使用Spring的RestTemplate来消费HTTPS REST服务。

**首先，让我们创建一个控制器类_WelcomeController_，以及一个返回简单_String_响应的_/welcome_端点：**

```java
@RestController
public class WelcomeController {

    @GetMapping(value = "/welcome")
    public String welcome() {
       return "欢迎使用安全REST服务";
    }
}
```

**然后，让我们将密钥库添加到_src/main/resources_文件夹：**

**接下来，让我们将与密钥库相关的属性添加到我们的_application.properties_文件中：**

```properties
server.port=8443
server.servlet.context-path=/
# 密钥库使用的格式
server.ssl.key-store-type=PKCS12
# 包含证书的密钥库路径
server.ssl.key-store=classpath:keystore/baeldung.p12
# 生成证书时使用的密码
server.ssl.key-store-password=password
# 映射到证书的别名
server.ssl.key-alias=baeldung
```

我们现在可以通过这个端点访问REST服务：_https://localhost:8443/welcome_

## 3. 消费安全REST服务

Spring提供了一个方便的RestTemplate类来消费REST服务。

虽然消费一个简单的REST服务很直接，但当我们消费一个受保护的服务时，我们需要使用服务使用的证书/密钥库来定制RestTemplate。

接下来，让我们创建一个简单的RestTemplate对象，并通过添加所需的证书/密钥库来定制它。

### 3.1. 创建RestTemplate客户端

**让我们编写一个简单的控制器，使用RestTemplate来消费我们的REST服务：**

```java
@RestController
public class RestTemplateClientController {
    private static final String WELCOME_URL = "https://localhost:8443/welcome";

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/welcomeclient")
    public String greetMessage() {
        String response = restTemplate.getForObject(WELCOME_URL, String.class);
        return response;
    }
}
```

**如果我们运行我们的代码并访问_/welcomeclient_端点，我们会得到一个错误，因为没有找到访问受保护REST服务的有效证书：**

```java
javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX 路径构建失败:
sun.security.provider.certpath.SunCertPathBuilderException: 无法找到到请求目标的有效证书路径在 sun.security.ssl.Alerts.getSSLException(Alerts.java:192)
```

接下来，我们将看到如何解决这个错误。

### 3.2. 为HTTPS访问配置RestTemplate

访问受保护REST服务的客户端应用程序应该在其_resources_文件夹中包含一个安全的密钥库。此外，RestTemplate本身需要被配置。

**首先，让我们将之前提到的密钥库_baeldung.p12_作为信任库添加到_/src/main/resources_文件夹中：**

**接下来，我们需要在_application.properties_文件中添加信任库的详细信息：**

```properties
server.port=8082
#信任库位置
trust.store=classpath:keystore/baeldung.p12
#信任库密码
trust.store.password=password
```

**最后，让我们通过添加信任库来定制RestTemplate：**

```java
@Configuration
public class CustomRestTemplateConfiguration {

    @Value("${trust.store}")
    private Resource trustStore;

    @Value("${trust.store.password}")
    private String trustStorePassword;

    @Bean
    public RestTemplate restTemplate() throws KeyManagementException, NoSuchAlgorithmException, KeyStoreException, CertificateException, MalformedURLException, IOException {

        SSLContext sslContext = new SSLContextBuilder()
         .loadTrustMaterial(trustStore.getURL(), trustStorePassword.toCharArray()).build();
        SSLConnectionSocketFactory sslConFactory = new SSLConnectionSocketFactory(sslContext);
        HttpClientConnectionManager cm = PoolingHttpClientConnectionManagerBuilder.create()
                .setSSLSocketFactory(sslConFactory)
                .build();
        CloseableHttpClient httpClient = HttpClients.custom().setConnectionManager(cm).build();
        ClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory(httpClient);
        return new RestTemplate(requestFactory);
    }
}
```

让我们详细了解上述_restTemplate()_方法中的重要步骤。

首先，我们创建一个代表安全套接字协议实现的_SSLContext_对象。我们使用_SSLContextBuilder_类的_build()_方法来创建它。

我们使用_SSLContextBuilder_的_loadTrustMaterial_()方法将密钥库文件和凭据加载到_SSLContext_对象中。

然后，我们通过加载_SSLContext_来创建_SSLConnectionSocketFactory_，这是一个用于TSL和SSL连接的分层套接字工厂。这一步的目的是验证服务器是否在使用我们在前一步加载的受信任证书列表，即验证服务器。

现在，我们可以使用我们定制的RestTemplate来消费端点：_http://localhost:8082/welcomeclient_

## 4. **结论**

在本文中，我们讨论了如何使用定制的RestTemplate来消费一个受保护的REST服务。

如往常一样，源代码可在GitHub上获取。