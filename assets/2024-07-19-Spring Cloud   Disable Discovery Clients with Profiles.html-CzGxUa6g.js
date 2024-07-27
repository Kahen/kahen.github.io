import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-CBerKIce.js";const t={},p=e('<hr><h1 id="spring-cloud-–-使用配置文件禁用发现客户端" tabindex="-1"><a class="header-anchor" href="#spring-cloud-–-使用配置文件禁用发现客户端"><span>Spring Cloud – 使用配置文件禁用发现客户端</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将探讨如何使用配置文件禁用 Spring Cloud 的发现客户端。这在某些情况下非常有用，比如我们希望在不更改代码的情况下启用/禁用服务发现。</p><h2 id="_2-设置-eureka-服务器和-eureka-客户端" tabindex="-1"><a class="header-anchor" href="#_2-设置-eureka-服务器和-eureka-客户端"><span>2. 设置 Eureka 服务器和 Eureka 客户端</span></a></h2><p>首先，我们创建一个 Eureka 服务器和一个发现客户端。</p><h3 id="_2-1-发现客户端设置" tabindex="-1"><a class="header-anchor" href="#_2-1-发现客户端设置"><span>2.1. 发现客户端设置</span></a></h3><p>接下来，我们需要创建另一个应用程序，该应用程序将在服务器上注册自己。让我们将此应用程序设置为发现客户端。</p><p>让我们在 <em>pom.xml</em> 中添加 Web 和 Eureka 客户端启动依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>``\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.springframework.cloud```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```spring-cloud-starter-netflix-eureka-client```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.springframework.boot```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```spring-boot-starter-web```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还需要确保我们的云启动器在依赖管理部分存在，并且设置了 Spring Cloud 版本。</p><p>如果使用 Spring Initializr 创建项目，这些将已经设置好。如果没有，我们可以将它们添加到我们的 <em>pom.xml</em> 文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>`\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>``\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.springframework.cloud```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```spring-cloud-starter-parent```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`${spring-cloud-dependencies.version}`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>type</span><span class="token punctuation">&gt;</span></span>`pom`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>type</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>`import`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>`\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>``\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>`\n\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>spring-cloud-dependencies.version</span><span class="token punctuation">&gt;</span></span>`2021.0.3`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>spring-cloud-dependencies.version</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-添加配置属性" tabindex="-1"><a class="header-anchor" href="#_2-2-添加配置属性"><span>2.2. 添加配置属性</span></a></h3><p>一旦我们有了依赖项，我们所要做的就是将我们新客户端应用程序的配置属性添加到 <em>application.properties</em> 文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>eureka.client.serviceUrl.defaultZone=${EUREKA_URI:http://localhost:8761/eureka}\neureka.instance.preferIpAddress=false\nspring.application.name=spring-cloud-eureka-client\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将确保当应用程序启动时，它将在上述 URL 上注册到 Eureka 服务器。它将被称为 <em>spring-cloud-eureka-client</em>。</p><p>我们应该注意到，通常我们还会在配置类上使用 <em>@EnableDiscoveryClient</em> 注解来启用发现客户端。但是，如果我们使用 Spring Cloud 启动器，我们不需要该注解。发现客户端默认启用。此外，当它在类路径上找到 Netflix Eureka 客户端时，它将自动配置它。</p><h3 id="_2-3-hello-world-控制器" tabindex="-1"><a class="header-anchor" href="#_2-3-hello-world-控制器"><span>2.3. Hello World 控制器</span></a></h3><p>为了测试我们的应用程序，我们需要一个我们可以访问的示例 URL。让我们创建一个简单的控制器，它将返回一个问候消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorldController</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/hello&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token string">&quot;Hello World!&quot;</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，是时候运行 Eureka 服务器和发现客户端了。当我们运行应用程序时，发现客户端将向 Eureka 服务器注册。我们可以在 Eureka 服务器仪表板上看到相同的内容：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/04/Screenshot-2022-03-07-at-1.13.16-PM.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_3-基于配置文件的配置" tabindex="-1"><a class="header-anchor" href="#_3-基于配置文件的配置"><span>3. 基于配置文件的配置</span></a></h2><p>有时我们可能希望禁用服务注册。一个原因可能是环境。</p><p>例如，我们可能希望在本地开发环境中禁用发现客户端，因为每次我们想在本地测试时运行 Eureka 服务器可能是不必要的。让我们看看如何实现这一点。</p><p>我们将在 <em>application.properties</em> 文件中更改属性，以按配置文件启用和禁用发现客户端。</p><h3 id="_3-1-使用单独的属性文件" tabindex="-1"><a class="header-anchor" href="#_3-1-使用单独的属性文件"><span>3.1. 使用单独的属性文件</span></a></h3><p>一种简单且流行的方法是根据环境使用单独的属性文件。</p><p>所以，让我们创建另一个名为 <em>application-dev.properties</em> 的属性文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.cloud.discovery.enabled=false\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以使用 <em>spring.cloud.discovery.enabled</em> 属性来启用/禁用发现客户端。我们将其设置为 <em>false</em> 以禁用发现客户端。</p><p>当 <em>dev</em> 配置文件处于活动状态时，将使用此文件而不是原始属性文件。</p><h3 id="_3-2-使用多文档文件" tabindex="-1"><a class="header-anchor" href="#_3-2-使用多文档文件"><span>3.2. 使用多文档文件</span></a></h3><p>如果我们不想为每个环境使用单独的文件，另一个选择是使用多文档属性文件。</p><p>我们将添加两个属性来实现这一点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#---\nspring.config.activate.on-profile=dev\nspring.cloud.discovery.enabled=false\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于这种技术，我们使用 <em>‘#—‘</em> 将属性文件分成两部分。此外，我们将使用 <em>spring.config.activate.on-profile</em> 属性。这两条线一起使用，<strong>指示应用程序</strong> <strong>仅在配置文件处于活动状态时读取当前部分中定义的属性</strong>。在我们的情况下，我们将使用 <em>dev</em> 配置文件。</p><p>同样，我们已将 <em>spring.cloud.discovery.enabled</em> 属性设置为 <em>false</em>。</p><p>这将在 <em>dev</em> 配置文件中禁用发现客户端，但在配置文件不活动时保持启用。</p><h2 id="_4-测试" tabindex="-1"><a class="header-anchor" href="#_4-测试"><span>4. 测试</span></a></h2><p>现在，是时候运行 Eureka 服务器和发现客户端并测试一切是否按预期工作。我们还没有添加配置文件。当我们运行应用程序时，发现客户端将向 Eureka 服务器注册。我们可以在 Eureka 服务器仪表板上看到相同的内容：</p><h3 id="_4-1-使用配置文件进行测试" tabindex="-1"><a class="header-anchor" href="#_4-1-使用配置文件进行测试"><span>4.1. 使用配置文件进行测试</span></a></h3><p>接下来，我们将在运行应用程序时添加配置文件。我们可以添加命令行参数 <em>-Dspring.profiles.active=dev</em> 来启用 <em>dev</em> 配置文件。当我们运行应用程序时，这次我们可以看到客户端没有向 Eureka 服务器注册：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/04/Screenshot-2022-03-10-at-10.50.44-AM.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们学习了如何使用属性根据配置文件添加配置。我们使用了相同的方法根据活动配置文件禁用发现客户端。</p><p>一如既往，本教程的代码可在 GitHub 上获取。</p>',48),l=[p];function i(o,c){return s(),a("div",null,l)}const d=n(t,[["render",i],["__file","2024-07-19-Spring Cloud   Disable Discovery Clients with Profiles.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Spring%20Cloud%20%20%20Disable%20Discovery%20Clients%20with%20Profiles.html","title":"Spring Cloud – 使用配置文件禁用发现客户端","lang":"zh-CN","frontmatter":{"date":"2022-04-07T00:00:00.000Z","category":["Spring Cloud","Eureka"],"tag":["Spring Cloud","Eureka","Discovery Client"],"head":[["meta",{"name":"keywords","content":"Spring Cloud, Eureka, Discovery Client, 服务发现"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Spring%20Cloud%20%20%20Disable%20Discovery%20Clients%20with%20Profiles.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Cloud – 使用配置文件禁用发现客户端"}],["meta",{"property":"og:description","content":"Spring Cloud – 使用配置文件禁用发现客户端 1. 概述 在本教程中，我们将探讨如何使用配置文件禁用 Spring Cloud 的发现客户端。这在某些情况下非常有用，比如我们希望在不更改代码的情况下启用/禁用服务发现。 2. 设置 Eureka 服务器和 Eureka 客户端 首先，我们创建一个 Eureka 服务器和一个发现客户端。 2...."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/04/Screenshot-2022-03-07-at-1.13.16-PM.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T20:35:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Cloud"}],["meta",{"property":"article:tag","content":"Eureka"}],["meta",{"property":"article:tag","content":"Discovery Client"}],["meta",{"property":"article:published_time","content":"2022-04-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T20:35:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Cloud – 使用配置文件禁用发现客户端\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/04/Screenshot-2022-03-07-at-1.13.16-PM.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/Screenshot-2022-03-10-at-10.50.44-AM.png\\"],\\"datePublished\\":\\"2022-04-07T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T20:35:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Cloud – 使用配置文件禁用发现客户端 1. 概述 在本教程中，我们将探讨如何使用配置文件禁用 Spring Cloud 的发现客户端。这在某些情况下非常有用，比如我们希望在不更改代码的情况下启用/禁用服务发现。 2. 设置 Eureka 服务器和 Eureka 客户端 首先，我们创建一个 Eureka 服务器和一个发现客户端。 2...."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 设置 Eureka 服务器和 Eureka 客户端","slug":"_2-设置-eureka-服务器和-eureka-客户端","link":"#_2-设置-eureka-服务器和-eureka-客户端","children":[{"level":3,"title":"2.1. 发现客户端设置","slug":"_2-1-发现客户端设置","link":"#_2-1-发现客户端设置","children":[]},{"level":3,"title":"2.2. 添加配置属性","slug":"_2-2-添加配置属性","link":"#_2-2-添加配置属性","children":[]},{"level":3,"title":"2.3. Hello World 控制器","slug":"_2-3-hello-world-控制器","link":"#_2-3-hello-world-控制器","children":[]}]},{"level":2,"title":"3. 基于配置文件的配置","slug":"_3-基于配置文件的配置","link":"#_3-基于配置文件的配置","children":[{"level":3,"title":"3.1. 使用单独的属性文件","slug":"_3-1-使用单独的属性文件","link":"#_3-1-使用单独的属性文件","children":[]},{"level":3,"title":"3.2. 使用多文档文件","slug":"_3-2-使用多文档文件","link":"#_3-2-使用多文档文件","children":[]}]},{"level":2,"title":"4. 测试","slug":"_4-测试","link":"#_4-测试","children":[{"level":3,"title":"4.1. 使用配置文件进行测试","slug":"_4-1-使用配置文件进行测试","link":"#_4-1-使用配置文件进行测试","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721421359000,"updatedTime":1721421359000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.51,"words":1353},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Spring Cloud   Disable Discovery Clients with Profiles.md","localizedDate":"2022年4月7日","excerpt":"<hr>\\n<h1>Spring Cloud – 使用配置文件禁用发现客户端</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将探讨如何使用配置文件禁用 Spring Cloud 的发现客户端。这在某些情况下非常有用，比如我们希望在不更改代码的情况下启用/禁用服务发现。</p>\\n<h2>2. 设置 Eureka 服务器和 Eureka 客户端</h2>\\n<p>首先，我们创建一个 Eureka 服务器和一个发现客户端。</p>\\n<h3>2.1. 发现客户端设置</h3>\\n<p>接下来，我们需要创建另一个应用程序，该应用程序将在服务器上注册自己。让我们将此应用程序设置为发现客户端。</p>","autoDesc":true}');export{d as comp,g as data};
