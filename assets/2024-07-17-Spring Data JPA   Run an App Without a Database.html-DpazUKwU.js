import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-CXN34Kw1.js";const e={},p=t('<hr><h1 id="spring-data-jpa-–-不需要数据库运行应用程序" tabindex="-1"><a class="header-anchor" href="#spring-data-jpa-–-不需要数据库运行应用程序"><span>Spring Data JPA – 不需要数据库运行应用程序</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，<strong>我们将学习如何在没有运行数据库的情况下启动 Spring Boot 应用程序。</strong></p><p>默认情况下，如果我们有一个包含 Spring Data JPA 的 Spring Boot 应用程序，那么应用程序将自动尝试创建数据库连接。然而，在应用程序启动时数据库不可用的情况下，可能需要避免这种情况。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>我们将使用一个简单的使用 MySQL 的 Spring Boot 应用程序。让我们看看设置应用程序的步骤。</p><h3 id="_2-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-依赖项"><span>2.1. 依赖项</span></a></h3><p>让我们将 Spring Data JPA 启动器和 MySQL 连接器依赖项添加到 <em>pom.xml</em> 文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.springframework.boot```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```spring-boot-starter-data-jpa```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```mysql```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```mysql-connector-java```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>`runtime`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>`\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将把 JPA、MySQL 连接器和 Hibernate 添加到类路径中。</p><p>此外，我们希望在应用程序启动时有一个任务持续运行。为此，让我们将 Web 启动器添加到 <em>pom.xml</em> 文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.springframework.boot```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```spring-boot-starter-web```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将在端口 8080 上启动一个 web 服务器并保持应用程序运行。</p><h3 id="_2-2-属性" tabindex="-1"><a class="header-anchor" href="#_2-2-属性"><span>2.2. 属性</span></a></h3><p><strong>在启动应用程序之前，我们需要在 <em>application.properties</em> 文件中设置一些必需的属性</strong>：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.datasource.url</span><span class="token punctuation">=</span><span class="token value attr-value">jdbc:mysql://localhost:3306/myDb</span>\n<span class="token key attr-name">spring.datasource.driver-class-name</span><span class="token punctuation">=</span><span class="token value attr-value">com.mysql.cj.jdbc.Driver</span>\n<span class="token key attr-name">spring.jpa.properties.hibernate.dialect</span><span class="token punctuation">=</span><span class="token value attr-value">org.hibernate.dialect.MySQLDialect</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们理解我们设置的属性：</p><ul><li><em>spring.datasource.url</em>: 服务器的 URL 和数据库的名称。</li><li><em>spring.datasource.driver-class-name</em>: 驱动程序类名。MySQL 连接器提供此驱动程序。</li><li><em>spring.jpa.properties.hibernate.dialect</em>: 我们将其设置为 MySQL。这告诉 JPA 提供者使用 MySQL 方言。</li></ul><p><strong>此外，我们需要设置连接到数据库所需的用户名和密码</strong>：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.datasource.username</span><span class="token punctuation">=</span><span class="token value attr-value">root</span>\n<span class="token key attr-name">spring.datasource.password</span><span class="token punctuation">=</span><span class="token value attr-value">root</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-启动应用程序" tabindex="-1"><a class="header-anchor" href="#_2-3-启动应用程序"><span>2.3. 启动应用程序</span></a></h3><p>如果我们启动应用程序，我们将看到以下错误：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>HHH000342: Could not obtain connection to query metadata\ncom.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure\nThe last packet sent successfully to the server was 0 milliseconds ago. The driver has not received any packets from the server.\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为我们在指定的 URL 上没有运行数据库服务器。然而，应用程序的默认行为是执行以下两个操作：</p><ul><li><strong>JPA 尝试连接到数据库服务器并获取元数据</strong></li><li><strong>Hibernate 会尝试创建数据库（如果不存在）。</strong> 这是由于属性 <em>spring.jpa.hibernate.ddl-auto</em> 默认设置为 <em>create</em>。</li></ul><h2 id="_3-不需要数据库运行" tabindex="-1"><a class="header-anchor" href="#_3-不需要数据库运行"><span>3. 不需要数据库运行</span></a></h2><p>为了在没有数据库的情况下继续，我们需要通过覆盖上述两个属性来修复默认行为。</p><p>首先，<strong>让我们禁用元数据获取</strong>：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.jpa.properties.hibernate.temp.use_jdbc_metadata_defaults</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，<strong>我们禁用自动数据库创建</strong>：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.jpa.hibernate.ddl-auto</span><span class="token punctuation">=</span><span class="token value attr-value">none</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过设置此属性，<strong>我们已禁用数据库的创建。因此，应用程序没有理由创建连接。</strong></p><p>与之前不同，现在，当我们启动应用程序时，它在没有任何错误的情况下启动。<strong>除非操作需要与数据库交互，否则不会启动连接。</strong></p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了如何在不需要运行数据库的情况下启动 Spring Boot 应用程序。</p><p>我们查看了应用程序查找数据库连接的默认行为。然后我们通过覆盖两个属性来修复默认行为。</p><p>一如既往，本文中使用的所有代码示例都可以在 GitHub 上找到。</p>',38),i=[p];function o(l,r){return s(),n("div",null,i)}const u=a(e,[["render",o],["__file","2024-07-17-Spring Data JPA   Run an App Without a Database.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Spring%20Data%20JPA%20%20%20Run%20an%20App%20Without%20a%20Database.html","title":"Spring Data JPA – 不需要数据库运行应用程序","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Data JPA","Spring Boot"],"tag":["JPA","Hibernate","MySQL"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Spring Data JPA, Hibernate, MySQL, JPA"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Spring%20Data%20JPA%20%20%20Run%20an%20App%20Without%20a%20Database.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Data JPA – 不需要数据库运行应用程序"}],["meta",{"property":"og:description","content":"Spring Data JPA – 不需要数据库运行应用程序 1. 概述 在本教程中，我们将学习如何在没有运行数据库的情况下启动 Spring Boot 应用程序。 默认情况下，如果我们有一个包含 Spring Data JPA 的 Spring Boot 应用程序，那么应用程序将自动尝试创建数据库连接。然而，在应用程序启动时数据库不可用的情况下，可能..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T20:08:48.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:tag","content":"Hibernate"}],["meta",{"property":"article:tag","content":"MySQL"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T20:08:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Data JPA – 不需要数据库运行应用程序\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T20:08:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Data JPA – 不需要数据库运行应用程序 1. 概述 在本教程中，我们将学习如何在没有运行数据库的情况下启动 Spring Boot 应用程序。 默认情况下，如果我们有一个包含 Spring Data JPA 的 Spring Boot 应用程序，那么应用程序将自动尝试创建数据库连接。然而，在应用程序启动时数据库不可用的情况下，可能..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[{"level":3,"title":"2.1. 依赖项","slug":"_2-1-依赖项","link":"#_2-1-依赖项","children":[]},{"level":3,"title":"2.2. 属性","slug":"_2-2-属性","link":"#_2-2-属性","children":[]},{"level":3,"title":"2.3. 启动应用程序","slug":"_2-3-启动应用程序","link":"#_2-3-启动应用程序","children":[]}]},{"level":2,"title":"3. 不需要数据库运行","slug":"_3-不需要数据库运行","link":"#_3-不需要数据库运行","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721246928000,"updatedTime":1721246928000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.92,"words":876},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Spring Data JPA   Run an App Without a Database.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Spring Data JPA – 不需要数据库运行应用程序</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，<strong>我们将学习如何在没有运行数据库的情况下启动 Spring Boot 应用程序。</strong></p>\\n<p>默认情况下，如果我们有一个包含 Spring Data JPA 的 Spring Boot 应用程序，那么应用程序将自动尝试创建数据库连接。然而，在应用程序启动时数据库不可用的情况下，可能需要避免这种情况。</p>\\n<h2>2. 设置</h2>\\n<p>我们将使用一个简单的使用 MySQL 的 Spring Boot 应用程序。让我们看看设置应用程序的步骤。</p>","autoDesc":true}');export{u as comp,g as data};
