import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as s,a}from"./app-DpYLEM_u.js";const i={},n=a(`<h1 id="mysql和spring-boot应用程序中的tls设置" tabindex="-1"><a class="header-anchor" href="#mysql和spring-boot应用程序中的tls设置"><span>MySQL和Spring Boot应用程序中的TLS设置</span></a></h1><p>在MySQL服务器和客户端之间的未加密连接可能会在网络上暴露传输中的数据。对于生产就绪的应用程序，我们应该通过TLS（传输层安全）协议将所有通信转移到安全连接上。</p><p>在本教程中，我们将学习如何在MySQL服务器上启用安全连接。此外，我们将配置Spring Boot应用程序使用此安全连接。</p><h2 id="_2-为什么在mysql上使用tls" tabindex="-1"><a class="header-anchor" href="#_2-为什么在mysql上使用tls"><span>2. 为什么在MySQL上使用TLS？</span></a></h2><p>首先，让我们了解一些TLS的基本知识。</p><p>TLS协议使用加密算法确保通过网络安全传输的数据可以被信任，并且没有被篡改或检查。它具有检测数据变化、丢失或重放攻击的机制。<strong>TLS还结合了使用X.509标准的提供身份验证的算法。</strong></p><p>加密连接增加了一层安全性，使网络流量中的数据不可读。</p><p>在MySQL服务器和客户端之间配置安全连接可以提供更好的身份验证、数据完整性和可信度。此外，MySQL服务器可以对客户端的身份进行额外的检查。</p><p>然而，这种安全连接由于加密而带来了性能损失。性能成本的严重程度取决于各种因素，如查询大小、数据负载、服务器硬件、网络带宽等因素。</p><h2 id="_3-在mysql服务器上配置tls连接" tabindex="-1"><a class="header-anchor" href="#_3-在mysql服务器上配置tls连接"><span>3. 在MySQL服务器上配置TLS连接</span></a></h2><p>MySQL服务器按连接进行加密，可以为给定用户设置为强制或可选。MySQL支持在运行时使用安装的OpenSSL库进行SSL加密相关操作。</p><p><strong>我们可以使用JDBC驱动程序Connector/J在初始握手后加密客户端和服务器之间的数据。</strong></p><p>MySQL服务器版本8.0.28或更高版本仅支持TLS v1.2和TLS v1.3。它不再支持早期版本的TLS（v1和v1.1）。</p><p>服务器身份验证可以通过使用受信任的根证书颁发机构签名的证书或自签名证书来启用。此外，<strong>即使在生产环境中，也常见使用我们自己的根CA文件构建MySQL</strong>。</p><p>此外，服务器可以验证和验证客户端的SSL证书，并执行对客户端身份的额外检查。</p><h3 id="_3-1-使用tls证书配置mysql服务器" tabindex="-1"><a class="header-anchor" href="#_3-1-使用tls证书配置mysql服务器"><span>3.1. 使用TLS证书配置MySQL服务器</span></a></h3><p>我们将使用属性_require_secure_transport_和默认生成的证书启用MySQL服务器上的安全传输。</p><p>让我们通过在_docker-compose.yml_中实现设置来快速启动MySQL服务器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>version: &#39;3.8&#39;

services:
  mysql-service:
    image: &quot;mysql/mysql-server:8.0.30&quot;
    container_name: mysql-db
    command: [ &quot;mysqld&quot;,
      &quot;--require_secure_transport=ON&quot;,
      &quot;--default_authentication_plugin=mysql_native_password&quot;,
      &quot;--general_log=ON&quot; ]
    ports:
      - &quot;3306:3306&quot;
    volumes:
      - type: bind
        source: ./data
        target: /var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_HOST: &quot;%&quot;
      MYSQL_ROOT_PASSWORD: &quot;Password2022&quot;
      MYSQL_DATABASE: test_db
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意，上述<strong>MySQL服务器使用的默认证书位于路径_/var/lib/mysql_</strong>。</p><p>或者，我们可以通过在_docker-compose.yml_中包含一些_mysqld_配置来覆盖默认证书：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>command: [ &quot;mysqld&quot;,
  &quot;--require_secure_transport=ON&quot;,
  &quot;--ssl-ca=/etc/certs/ca.pem&quot;,
  &quot;--ssl-cert=/etc/certs/server-cert.pem&quot;,
  &quot;--ssl-key=/etc/certs/server-key.pem&quot;,
  ....]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们使用_docker-compose_命令启动_mysql-service_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ docker-compose -p mysql-server up
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-2-创建-x509-用户" tabindex="-1"><a class="header-anchor" href="#_3-2-创建-x509-用户"><span>3.2. 创建_X509_用户</span></a></h3><p>我们可以选择使用X.509标准配置MySQL服务器进行客户端身份识别。使用_X509_，需要有效的客户端证书。这使得双向相互TLS或_mTLS_成为可能。</p><p>让我们创建一个_X509_用户并授予_test_db_数据库的权限：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mysql&gt; CREATE USER &#39;test_user&#39;@&#39;%&#39; IDENTIFIED BY &#39;Password2022&#39; require X509;
mysql&gt; GRANT ALL PRIVILEGES ON test_db.* TO &#39;test_user&#39;@&#39;%&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以设置一个不需要任何用户证书识别的TLS连接：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mysql&gt; CREATE USER &#39;test_user&#39;@&#39;%&#39; IDENTIFIED BY &#39;Password2022&#39; require SSL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们应该注意到，<strong>如果使用SSL，则客户端需要提供信任存储</strong>。</p><h2 id="_4-在spring-boot应用程序上配置tls" tabindex="-1"><a class="header-anchor" href="#_4-在spring-boot应用程序上配置tls"><span>4. 在Spring Boot应用程序上配置TLS</span></a></h2><p>Spring Boot应用程序可以通过设置JDBC URL的一些属性来配置JDBC连接上的TLS。</p><p>在之前，我们需要将信任存储和客户端证书转换为_JKS_格式。</p><h3 id="_4-1-将pem文件转换为jks格式" tabindex="-1"><a class="header-anchor" href="#_4-1-将pem文件转换为jks格式"><span>4.1. 将PEM文件转换为JKS格式</span></a></h3><p>让我们将MySQL服务器生成的_ca.pem_和_client-cert.pem_文件转换为_JKS_格式：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>keytool -importcert -alias MySQLCACert.jks -file ./data/ca.pem \\
    -keystore ./certs/truststore.jks -storepass mypassword
openssl pkcs12 -export -in ./data/client-cert.pem -inkey ./data/client-key.pem \\
    -out ./certs/certificate.p12 -name &quot;certificate&quot;
keytool -importkeystore -srckeystore ./certs/certificate.p12 -srcstoretype pkcs12 -destkeystore ./certs/client-cert.jks
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意到，<strong>从Java 9开始，默认的密钥库格式是_PKCS12_</strong>。</p><h3 id="_4-2-使用-application-yml-配置" tabindex="-1"><a class="header-anchor" href="#_4-2-使用-application-yml-配置"><span>4.2. 使用_application.yml_配置</span></a></h3><p>可以通过将_sslMode_设置为_PREFERRED_、<em>REQUIRED</em>、_VERIFY_CA_或_VERIFY_IDENTITY_来启用TLS。</p><p>_PREFERRED_模式如果服务器支持，则使用安全连接，否则回退到未加密连接。</p><p>使用_REQUIRED_模式，客户端只能使用加密连接。像_REQUIRED_一样，_VERIFY_CA_模式使用安全连接，但还额外验证服务器证书是否符合配置的证书颁发机构（CA）证书。</p><p>_VERIFY_IDENTITY_模式除了证书验证外，还对主机名进行了额外的检查。</p><p>还需要向JDBC URL添加一些_Connector/J_属性，例如_trustCertificateKeyStoreUrl_、<em>trustCertificateKeyStorePassword</em>、<em>clientCertificateKeyStoreUrl_和_clientCertificateKeyStorePassword</em>。</p><p>让我们在_application.yml_中配置JDBC URL，将_sslMode_设置为_VERIFY_CA_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring:
  profiles: &quot;dev2&quot;
  datasource:
    url: &gt;-
      jdbc:mysql://localhost:3306/test_db?
      sslMode=VERIFY_CA&amp;
      trustCertificateKeyStoreUrl=file:/\`\`&lt;project-path&gt;\`\`/mysql-server/certs/truststore.jks&amp;
      trustCertificateKeyStorePassword=mypassword&amp;
      clientCertificateKeyStoreUrl=file:/\`\`&lt;project-path&gt;\`\`/mysql-server/certs/client-cert.jks&amp;
      clientCertificateKeyStorePassword=mypassword
    username: test_user
    password: Password2022
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意到，等效于**<em>VERIFY_CA_的弃用属性是_useSSL=true_和_verifyServerCertificate=true</em>**的组合。</p><p>如果未提供信任证书文件，我们将收到一个错误提示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Caused by: java.security.cert.CertPathValidatorException: Path does not chain with any of the trust anchors
    at java.base/sun.security.provider.certpath.PKIXCertPathValidator.validate(PKIXCertPathValidator.java:157) ~[na:na]
    at java.base/sun.security.provider.certpath.PKIXCertPathValidator.engineValidate(PKIXCertPathValidator.java:83) ~[na:na]
    at java.base/java.security.cert.CertPathValidator.validate(CertPathValidator.java:309) ~[na:na]
    at com.mysql.cj.protocol.ExportControlled$X509TrustManagerWrapper.checkServerTrusted(ExportControlled.java:402) ~[mysql-connector-java-8.0.29.jar:8.0.29]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果客户端证书缺失，我们将收到不同的错误：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Caused by: java.sql.SQLException: Access denied for user &#39;test_user&#39;@&#39;172.20.0.1&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-3-使用环境变量配置tls" tabindex="-1"><a class="header-anchor" href="#_4-3-使用环境变量配置tls"><span>4.3. 使用环境变量配置TLS</span></a></h3><p>或者，我们可以将上述配置设置为环境变量，并包括SSL相关的配置作为JVM参数。</p><p>让我们将TLS和Spring相关的配置作为环境变量添加：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>export TRUSTSTORE=./mysql-server/certs/truststore.jks
export TRUSTSTORE_PASSWORD=mypassword
export KEYSTORE=./mysql-server/certs/client-cert.jks
export KEYSTORE_PASSWORD=mypassword
export SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/test_db?sslMode=VERIFY_CA
export SPRING_DATASOURCE_USERNAME=test_user
export SPRING_DATASOURCE_PASSWORD=Password2022
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们使用上述SSL配置运行应用程序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ java -Djavax.net.ssl.keyStore=$KEYSTORE \\
 -Djavax.net.ssl.keyStorePassword=$KEYSTORE_PASSWORD \\
 -Djavax.net.ssl.trustStore=$TRUSTSTORE \\
 -Djavax.net.ssl.trustStorePassword=$TRUSTSTORE_PASSWORD \\
 -jar ./target/spring-boot-mysql-0.1.0.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-验证tls连接" tabindex="-1"><a class="header-anchor" href="#_5-验证tls连接"><span>5. 验证TLS连接</span></a></h2><p>现在让我们使用上述任何方法</p>`,59),r=[n];function l(d,o){return s(),t("div",null,r)}const u=e(i,[["render",l],["__file","2024-07-13-TLS Setup in MySQL and Spring Boot Application.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-TLS%20Setup%20in%20MySQL%20and%20Spring%20Boot%20Application.html","title":"MySQL和Spring Boot应用程序中的TLS设置","lang":"zh-CN","frontmatter":{"date":"2022-09-17T00:00:00.000Z","category":["Spring Boot","MySQL"],"tag":["TLS","Security"],"head":[["meta",{"name":"keywords","content":"Spring Boot, MySQL, TLS, Security, Configuration"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-TLS%20Setup%20in%20MySQL%20and%20Spring%20Boot%20Application.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"MySQL和Spring Boot应用程序中的TLS设置"}],["meta",{"property":"og:description","content":"MySQL和Spring Boot应用程序中的TLS设置 在MySQL服务器和客户端之间的未加密连接可能会在网络上暴露传输中的数据。对于生产就绪的应用程序，我们应该通过TLS（传输层安全）协议将所有通信转移到安全连接上。 在本教程中，我们将学习如何在MySQL服务器上启用安全连接。此外，我们将配置Spring Boot应用程序使用此安全连接。 2. 为..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T08:44:20.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"TLS"}],["meta",{"property":"article:tag","content":"Security"}],["meta",{"property":"article:published_time","content":"2022-09-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T08:44:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL和Spring Boot应用程序中的TLS设置\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-09-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T08:44:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"MySQL和Spring Boot应用程序中的TLS设置 在MySQL服务器和客户端之间的未加密连接可能会在网络上暴露传输中的数据。对于生产就绪的应用程序，我们应该通过TLS（传输层安全）协议将所有通信转移到安全连接上。 在本教程中，我们将学习如何在MySQL服务器上启用安全连接。此外，我们将配置Spring Boot应用程序使用此安全连接。 2. 为..."},"headers":[{"level":2,"title":"2. 为什么在MySQL上使用TLS？","slug":"_2-为什么在mysql上使用tls","link":"#_2-为什么在mysql上使用tls","children":[]},{"level":2,"title":"3. 在MySQL服务器上配置TLS连接","slug":"_3-在mysql服务器上配置tls连接","link":"#_3-在mysql服务器上配置tls连接","children":[{"level":3,"title":"3.1. 使用TLS证书配置MySQL服务器","slug":"_3-1-使用tls证书配置mysql服务器","link":"#_3-1-使用tls证书配置mysql服务器","children":[]},{"level":3,"title":"3.2. 创建_X509_用户","slug":"_3-2-创建-x509-用户","link":"#_3-2-创建-x509-用户","children":[]}]},{"level":2,"title":"4. 在Spring Boot应用程序上配置TLS","slug":"_4-在spring-boot应用程序上配置tls","link":"#_4-在spring-boot应用程序上配置tls","children":[{"level":3,"title":"4.1. 将PEM文件转换为JKS格式","slug":"_4-1-将pem文件转换为jks格式","link":"#_4-1-将pem文件转换为jks格式","children":[]},{"level":3,"title":"4.2. 使用_application.yml_配置","slug":"_4-2-使用-application-yml-配置","link":"#_4-2-使用-application-yml-配置","children":[]},{"level":3,"title":"4.3. 使用环境变量配置TLS","slug":"_4-3-使用环境变量配置tls","link":"#_4-3-使用环境变量配置tls","children":[]}]},{"level":2,"title":"5. 验证TLS连接","slug":"_5-验证tls连接","link":"#_5-验证tls连接","children":[]}],"git":{"createdTime":1720860260000,"updatedTime":1720860260000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.23,"words":1568},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-TLS Setup in MySQL and Spring Boot Application.md","localizedDate":"2022年9月17日","excerpt":"\\n<p>在MySQL服务器和客户端之间的未加密连接可能会在网络上暴露传输中的数据。对于生产就绪的应用程序，我们应该通过TLS（传输层安全）协议将所有通信转移到安全连接上。</p>\\n<p>在本教程中，我们将学习如何在MySQL服务器上启用安全连接。此外，我们将配置Spring Boot应用程序使用此安全连接。</p>\\n<h2>2. 为什么在MySQL上使用TLS？</h2>\\n<p>首先，让我们了解一些TLS的基本知识。</p>\\n<p>TLS协议使用加密算法确保通过网络安全传输的数据可以被信任，并且没有被篡改或检查。它具有检测数据变化、丢失或重放攻击的机制。<strong>TLS还结合了使用X.509标准的提供身份验证的算法。</strong></p>","autoDesc":true}');export{u as comp,m as data};
