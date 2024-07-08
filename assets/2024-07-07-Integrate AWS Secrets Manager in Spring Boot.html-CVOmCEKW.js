import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-C_fPDS1x.js";const t={},p=e('<h1 id="将-aws-secrets-manager-集成到-spring-boot-中" tabindex="-1"><a class="header-anchor" href="#将-aws-secrets-manager-集成到-spring-boot-中"><span>将 AWS Secrets Manager 集成到 Spring Boot 中</span></a></h1><p>在这个教程中，我们将把 Spring Boot 应用程序与 AWS Secrets Manager 集成起来，以便检索数据库凭据和其他类型的密钥，例如 API 密钥。</p><p>AWS Secrets Manager 是一项 AWS 服务，使我们能够安全地存储、轮换和管理凭据，例如数据库、API 密钥、令牌或我们想要管理的任何其他密钥。</p><p>我们可以区分两种类型的密钥——一种严格用于数据库凭据，另一种更通用，用于任何其他类型的密钥。</p><p>使用 AWS Secrets Manager 的一个好例子是为我们的应用程序提供一组凭据或 API 密钥。</p><p>保持密钥的一个推荐方式是以 JSON 格式。此外，如果我们想使用密钥轮换功能，我们必须使用 JSON 结构。</p><h3 id="_3-1-密钥创建" tabindex="-1"><a class="header-anchor" href="#_3-1-密钥创建"><span>3.1. 密钥创建</span></a></h3><p>让我们在 AWS Secrets Manager 中创建一个密钥。为此，我们可以使用 AWS CLI 和 <em>aws secretsmanager create-secret</em> 命令。</p><p>在我们的例子中，让我们将密钥命名为 <em>test/secret/</em> 并创建两对 API 密钥——<em>api-key1</em> 与 <em>apiKeyValue1</em> 和 <em>api-key2</em> 与 <em>apiKeyValue2</em>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>aws secretsmanager create-secret <span class="token punctuation">\\</span>\n<span class="token parameter variable">--name</span> test/secret/ <span class="token punctuation">\\</span>\n--secret-string <span class="token string">&quot;{&#39;api-key1&#39;:&#39;apiKeyValue1&#39;,&#39;api-key2&#39;:&#39;apiKeyValue2&#39;}&quot;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作为响应，我们应该得到创建密钥的 <em>ARN</em>，其名称和版本 ID：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>\n    <span class="token property">&quot;ARN&quot;</span><span class="token operator">:</span> <span class="token string">&quot;arn:aws:secretsmanager:eu-central-1:111122223333:secret:my/secret/-gLK10U&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;Name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test/secret/&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;VersionId&quot;</span><span class="token operator">:</span> <span class="token string">&quot;a04f735e-3b5f-4194-be0d-719d5386b67b&quot;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-spring-boot-应用程序集成" tabindex="-1"><a class="header-anchor" href="#_3-2-spring-boot-应用程序集成"><span>3.2. Spring Boot 应用程序集成</span></a></h3><p>为了检索我们新创建的密钥，我们必须添加 <em>spring-cloud-starter-aws-secrets-manager-config</em> 依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```io.awspring.cloud```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```spring-cloud-starter-aws-secrets-manager-config```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```2.4.4```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下一步是在我们的 <em>application.properties</em> 文件中添加一个属性：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.config.import</span><span class="token punctuation">=</span><span class="token value attr-value">aws-secretsmanager:test/secret/</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们在这里提供了我们刚刚创建的密钥的名称。有了这个设置，让我们在应用程序中使用我们的新密钥并验证它们的值。</p><p>为此，我们可以通过 <em>@Value</em> 注解将我们的密钥注入到应用程序中。在注解中，我们指定了我们在密钥创建过程中提供的密钥字段的名称。在我们的例子中，它是 <em>api-key1</em> 和 <em>api-key2</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;${api-key1}&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">private</span> <span class="token class-name">String</span> apiKeyValue1<span class="token punctuation">;</span>\n\n<span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;${api-key2}&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">private</span> <span class="token class-name">String</span> apiKeyValue2<span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了验证这个例子中的值，让我们在 <em>@PostConstruct</em> 中打印它们，在 bean 属性初始化后：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PostConstruct</span>\n<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">postConstruct</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>apiKeyValue1<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>apiKeyValue2<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意到，将密钥值输出到我们的控制台并不是一个好的实践。然而，我们可以看到在这个例子中，当我们运行应用程序时，我们的值已经被正确加载：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>2023-03-26 12:40:24.376 INFO 33504 [main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit &#39;default&#39;\napiKeyValue1\napiKeyValue2\n2023-03-26 12:40:25.306 INFO 33504 [main] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat started on port(s): 8080 (http) with context path &#39;&#39;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-特殊数据库凭据的密钥" tabindex="-1"><a class="header-anchor" href="#_4-特殊数据库凭据的密钥"><span>4. 特殊数据库凭据的密钥</span></a></h3><p>在 AWS Secrets Manager 中，有一种特殊类型的密钥用于存储数据库凭据。我们可以选择 AWS 支持的数据库之一，例如 Amazon RDS、Amazon DocumentDB 或 Amazon Redshift。对于非 Amazon 数据库，我们还可以提供服务器地址、数据库名称和端口。</p><p>通过在我们的 Spring Boot 应用程序中使用 <em>aws-secretsmanager-jdbc</em> 库，我们可以轻松地将这些凭据提供给我们的数据库。此外，如果我们在 Secrets Manager 中轮换凭据，AWS 提供的库在收到使用先前凭据的认证错误时 <strong>自动</strong> <strong>检索新的凭据集</strong>。</p><h3 id="_4-1-数据库密钥创建" tabindex="-1"><a class="header-anchor" href="#_4-1-数据库密钥创建"><span>4.1. 数据库密钥创建</span></a></h3><p>为了在 AWS Secrets Manager 中创建数据库类型的密钥，我们将再次使用 AWS CLI：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ aws secretsmanager create-secret <span class="token punctuation">\\</span>\n    <span class="token parameter variable">--name</span> rds/credentials <span class="token punctuation">\\</span>\n    --secret-string file://mycredentials.json\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的命令中，我们使用 <em>mycredentials.json</em> 文件，其中我们指定了我们数据库的所有必要属性：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;engine&quot;</span><span class="token operator">:</span> <span class="token string">&quot;mysql&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;host&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cwhgvgjbpqqa.eu-central-rds.amazonaws.com&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;username&quot;</span><span class="token operator">:</span> <span class="token string">&quot;admin&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;password&quot;</span><span class="token operator">:</span> <span class="token string">&quot;password&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;dbname&quot;</span><span class="token operator">:</span> <span class="token string">&quot;db-1&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token string">&quot;3306&quot;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-spring-boot-应用程序集成" tabindex="-1"><a class="header-anchor" href="#_4-2-spring-boot-应用程序集成"><span>4.2. Spring Boot 应用程序集成</span></a></h3><p>一旦我们创建了密钥，我们就可以在 Spring Boot 应用程序中使用它。为此，我们需要添加一些依赖项，如 <em>aws-secretsmanager-jdbc</em> 和 <em>mysql-connector-java</em>：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```com.amazonaws.secretsmanager```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```aws-secretsmanager-jdbc```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```1.0.11```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```mysql```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```mysql-connector-java```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```8.0.32```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们还需要在 <em>application.properties</em> 文件中设置一些属性：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.datasource.driver-class-name</span><span class="token punctuation">=</span><span class="token value attr-value">com.amazonaws.secretsmanager.sql.AWSSecretsManagerMySQLDriver</span>\n<span class="token key attr-name">spring.jpa.database-platform</span><span class="token punctuation">=</span><span class="token value attr-value">org.hibernate.dialect.MySQLDialect</span>\n<span class="token key attr-name">spring.datasource.url</span><span class="token punctuation">=</span><span class="token value attr-value">jdbc-secretsmanager:mysql://db-1.cwhqvgjbpgfw.eu-central-1.rds.amazonaws.com:3306</span>\n<span class="token key attr-name">spring.datasource.username</span><span class="token punctuation">=</span><span class="token value attr-value">rds/credentials</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <em>spring.datasource.driver-class-name</em> 中，我们指定了我们想要使用的驱动程序的名称。</p><p>接下来是 <em>spring.jpa.database-platform</em>，我们在这里提供了我们的方言。</p><p>当我们在 <em>spring.datasource.url</em> 中指定数据库的 URL 时，我们必须在该 URL 之前添加 <em>jdbc-secretsmanager</em> 前缀。这是必要的，因为我们正在与 AWS Secrets Manager 集成。在这个例子中，我们的 URL 引用了一个 MySQL RDS 实例，尽管它可以引用任何 MySQL 数据库。</p><p>在 <em>spring.datasource.username</em> 中，我们只需要提供我们之前设置的 AWS Secrets Manager 的密钥。根据这些属性，我们的应用程序将尝试连接到 Secrets Manager 并在连接到数据库之前检索用户名和密码。</p><p>在应用程序日志中，我们可以看到我们成功地获得了数据库连接并且 <em>EntityManager</em> 已经被初始化：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>2023-03-26 12:40:22.648 INFO 33504 --- [ main ] o.hibernate.jpa.internal.util.LogHelper : HHH000204: Processing PersistenceUnitInfo [name: default]\n2023-03-26 12:40:22.697 INFO 33504 --- [ main ] org.hibernate.Version : HHH000412: Hibernate ORM core version 5.6.12.Final\n2023-03-26 12:40:22.845 INFO 33504 --- [ main ] o.hibernate.annotations.common.Version : HCANN000001: Hibernate Commons Annotations {5.1.2.Final}\n2023-03-26 12:40:22.951 INFO 33504 --- [ main ] com.zaxxer.hikari.HikariDataSource : HikariPool-1 - Starting...\n2023-03-26 12:40:23.752 INFO 33504 --- [ main ] com.zaxxer.hikari.HikariDataSource : HikariPool-1 - Start completed.\n2023-03-26 12:40:23.783 INFO 33504 --- [ main ] org.hibernate.dialect.Dialect : HHH000400: Using dialect: org.hibernate.dialect.MySQL5Dialect\n2023-03-26 12:40:24.363 INFO 33504 --- [ main ] o.h.e.t.j.p.i.JtaPlatformInitiator : HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]\n2023-03-26 12:40:24.376 INFO 33504 --- [ main ] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit &#39;default&#39;\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，还有一个简单的 <code>UserController</code> 创建，我们可以在其中创建、读取和删除用户。</p><p>我们可以使用 <code>curl</code> 创建一个用户：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">--location</span> <span class="token string">&#39;localhost:8080/users/&#39;</span> <span class="token punctuation">\\</span>\n<span class="token parameter variable">--header</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> <span class="token punctuation">\\</span>\n<span class="token parameter variable">--data</span> <span class="token string">&#39;{\n    &quot;name&quot;: &quot;my-user-1&quot;\n}&#39;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们得到一个成功的响应：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span><span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;my-user-1&quot;</span><span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何将 Spring Boot 应用程序与 AWS Secrets Manager 集成，以及如何检索数据库凭据和其他类型的密钥。</p><p>如往常一样，示例代码可以在 GitHub 上找到。</p><p><a href="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" target="_blank" rel="noopener noreferrer">Baeldung Logo</a><a href="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" target="_blank" rel="noopener noreferrer">Gravatar Image</a><a href="https://secure.gravatar.com/avatar/6c3babf3d6ea5d49c2bc4e7957870d75?s=50&amp;r=g" target="_blank" rel="noopener noreferrer">Gravatar Image</a><a href="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" target="_blank" rel="noopener noreferrer">Announcement Icon</a><a href="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" target="_blank" rel="noopener noreferrer">Baeldung REST Post Footer</a><a href="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" target="_blank" rel="noopener noreferrer">Baeldung REST Post Footer Icon</a></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\nOK</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>',53),o=[p];function i(r,c){return s(),n("div",null,o)}const d=a(t,[["render",i],["__file","2024-07-07-Integrate AWS Secrets Manager in Spring Boot.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Integrate%20AWS%20Secrets%20Manager%20in%20Spring%20Boot.html","title":"将 AWS Secrets Manager 集成到 Spring Boot 中","lang":"zh-CN","frontmatter":{"date":"2024-07-07T00:00:00.000Z","category":["Spring Boot","AWS Secrets Manager"],"tag":["AWS","Secrets Manager","Spring Boot"],"head":[["meta",{"name":"keywords","content":"Spring Boot, AWS Secrets Manager, Integration, Database Credentials, API Keys"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Integrate%20AWS%20Secrets%20Manager%20in%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"将 AWS Secrets Manager 集成到 Spring Boot 中"}],["meta",{"property":"og:description","content":"将 AWS Secrets Manager 集成到 Spring Boot 中 在这个教程中，我们将把 Spring Boot 应用程序与 AWS Secrets Manager 集成起来，以便检索数据库凭据和其他类型的密钥，例如 API 密钥。 AWS Secrets Manager 是一项 AWS 服务，使我们能够安全地存储、轮换和管理凭据，例如数..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T13:07:26.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"AWS"}],["meta",{"property":"article:tag","content":"Secrets Manager"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:published_time","content":"2024-07-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T13:07:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"将 AWS Secrets Manager 集成到 Spring Boot 中\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-07T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T13:07:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"将 AWS Secrets Manager 集成到 Spring Boot 中 在这个教程中，我们将把 Spring Boot 应用程序与 AWS Secrets Manager 集成起来，以便检索数据库凭据和其他类型的密钥，例如 API 密钥。 AWS Secrets Manager 是一项 AWS 服务，使我们能够安全地存储、轮换和管理凭据，例如数..."},"headers":[{"level":3,"title":"3.1. 密钥创建","slug":"_3-1-密钥创建","link":"#_3-1-密钥创建","children":[]},{"level":3,"title":"3.2. Spring Boot 应用程序集成","slug":"_3-2-spring-boot-应用程序集成","link":"#_3-2-spring-boot-应用程序集成","children":[]},{"level":3,"title":"4. 特殊数据库凭据的密钥","slug":"_4-特殊数据库凭据的密钥","link":"#_4-特殊数据库凭据的密钥","children":[]},{"level":3,"title":"4.1. 数据库密钥创建","slug":"_4-1-数据库密钥创建","link":"#_4-1-数据库密钥创建","children":[]},{"level":3,"title":"4.2. Spring Boot 应用程序集成","slug":"_4-2-spring-boot-应用程序集成","link":"#_4-2-spring-boot-应用程序集成","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720357646000,"updatedTime":1720357646000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.45,"words":1634},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Integrate AWS Secrets Manager in Spring Boot.md","localizedDate":"2024年7月7日","excerpt":"\\n<p>在这个教程中，我们将把 Spring Boot 应用程序与 AWS Secrets Manager 集成起来，以便检索数据库凭据和其他类型的密钥，例如 API 密钥。</p>\\n<p>AWS Secrets Manager 是一项 AWS 服务，使我们能够安全地存储、轮换和管理凭据，例如数据库、API 密钥、令牌或我们想要管理的任何其他密钥。</p>\\n<p>我们可以区分两种类型的密钥——一种严格用于数据库凭据，另一种更通用，用于任何其他类型的密钥。</p>\\n<p>使用 AWS Secrets Manager 的一个好例子是为我们的应用程序提供一组凭据或 API 密钥。</p>\\n<p>保持密钥的一个推荐方式是以 JSON 格式。此外，如果我们想使用密钥轮换功能，我们必须使用 JSON 结构。</p>","autoDesc":true}');export{d as comp,g as data};
