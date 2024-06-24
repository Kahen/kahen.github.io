import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as i,a}from"./app-CFN0xEFv.js";const n={},l=a(`<h1 id="light-4j-简介" tabindex="-1"><a class="header-anchor" href="#light-4j-简介"><span>Light-4J 简介</span></a></h1><p>传统的框架虽然健壮，但往往引入了挑战敏捷性的复杂性。现代开发需要的框架不仅要强大，还要灵活。轻量级框架，包括 Light-4J，在采用极简设计哲学的同时，专注于提供基本功能而不带不必要的复杂性，从而降低了开发人员的学习曲线，并优先考虑快速的开发周期。</p><p>**Light-4J 是一种尖端的 Java 框架，通过结合敏捷性和性能来彻底改变开发。**它采用现代开发范式，与微服务的原则保持一致，并满足当今动态软件架构的需求。</p><p>在本教程中，我们将深入探讨其核心理念、主要功能和架构概念。我们将剖析它之所以轻量级的原因，以及这种品质如何转化为增强的开发速度和资源效率。</p><p>最后，我们将揭示它如何通过生成一个现成的 RESTful API 项目来满足当代开发需求。</p><h2 id="_2-什么是-light-4j" tabindex="-1"><a class="header-anchor" href="#_2-什么是-light-4j"><span>2. 什么是 Light-4J？</span></a></h2><p>Light 平台提供了多种框架，用于开发不同的 API 风格或微服务，这取决于合同规范。<strong>Light-4J 是 Light 平台的一部分，旨在使用不同的选项构建云原生 Web 应用程序和 API。</strong></p><p>它是一个尖端的开源微服务框架，为 Java 开发人员设计，以简化可扩展、轻量级微服务架构的开发和部署。Light-4J 专注于简单性、效率和最佳性能，使开发人员能够构建强大、模块化的应用程序，这些应用程序可以无缝适应现代软件开发的需求。</p><p>**Light-4J 的一个重要特性是优先解决云原生服务中的跨领域关注点，通过在其框架内嵌入网关。**这个网关无缝管理请求/响应链的各个方面。功能被封装到插件或中间件处理器中，并通过在服务器初始化期间的控制反转（IoC）服务集成到框架中。</p><p>重要的是，开发人员可以通过配置启用、禁用或修改这些插件的行为。这种设计理念使开发人员能够专注于编写业务逻辑，抽象出管理跨领域关注点的复杂性。</p><p>开发人员可以快速原型设计、迭代和部署应用程序，促进对不断变化的需求和市场需求的敏捷响应。此外，Light-4J <strong>通过每秒处理数百万请求来降低生产运营成本。这导致内存消耗更低，执行速度更快，这对于优化应用程序性能至关重要。</strong></p><h2 id="_3-light-4j-的特性" tabindex="-1"><a class="header-anchor" href="#_3-light-4j-的特性"><span>3. Light-4J 的特性</span></a></h2><p>让我们来审视一下 Light-4J 的核心特性：</p><ul><li><strong>微服务架构：</strong> Light-4J 以微服务架构为设计思想，允许开发人员轻松构建、部署和管理独立且可扩展的微服务，从而促进灵活性、敏捷性和更简单的维护。</li><li><strong>异步和非阻塞通信：</strong> 它利用异步和非阻塞通信模式。这提高了响应性，因为框架有效地处理并发请求，使其适合于具有高并发需求的应用程序。</li><li><strong>去中心化数据管理：</strong> 与单体架构不同，Light-4J 促进了一种去中心化的数据管理方法。每个微服务管理自己的数据，提供了在选择适合特定服务需求的数据存储解决方案方面的灵活性。</li><li><strong>高性能和低延迟：</strong> Light-4J 被设计为高性能和低延迟。通过利用异步处理和极简设计，它确保了更快的响应时间，满足了现代应用程序对速度和效率的期望。</li><li><strong>性能优化技术：</strong> Light-4J 提供了强大的缓存策略来提高应用程序的速度和效率。此外，该框架包括负载均衡功能，确保应用程序可以无缝扩展以满足不断增长的需求。</li><li><strong>安全中间件：</strong> 它无缝集成了安全中间件，用于强大的认证和授权，确保微服务和敏感数据的保护。此外，它还提供了有效的日志记录和监控中间件，提供了对应用程序行为和性能的洞察。</li><li><strong>定制能力：</strong> Light-4J 具有强大的插件系统，使开发人员能够扩展其功能。这种模块化促进了定制，允许集成额外的特性或针对特定项目需求的第三方插件。</li><li><strong>全面的文档和社区支持：</strong> 它还拥有全面的文档、教程和学习路径。开发人员可以访问丰富的资源，帮助他们理解框架，实施最佳实践，并排除故障。</li><li><strong>社区：</strong> 此外，Light-4J 受益于一个活跃且充满活力的开发人员社区。参与这个社区为使用该框架的开发人员提供了宝贵的见解、支持和协作机会。</li></ul><h2 id="_4-设计原则" tabindex="-1"><a class="header-anchor" href="#_4-设计原则"><span>4. 设计原则</span></a></h2><p>Light-4J 遵循几个设计原则，这些原则塑造了其开发并为其作为微服务框架的有效性做出了贡献。这些设计原则使 Light-4J 能够为 Java 中构建微服务提供一个轻量级、高效和灵活的平台。让我们看看指导 Light-4J 开发的一些关键设计原则。</p><p>Light-4J 专门设计以满足微服务架构的需求。因此，它必须同时在几个关键领域表现出色。这些包括实现高吞吐量以有效处理大量请求、保持低延迟以确保快速响应时间，并且轻量级以最小化资源消耗。</p><p>此外，**Light-4J 有效解决了微服务固有的各种跨领域关注点，如路由、安全、日志记录和监控，同时保持最佳性能。**这种多方面的方法对于使用 Light-4J 无缝开发和部署基于微服务的应用程序至关重要。</p><p>**Light-4J 的基础是 JBoss Undertow HTTP 服务器，以其健壮性和效率而闻名。**通过利用这个基础，它继承了 Undertow 在处理 HTTP 请求和响应方面的可靠性和性能优势。</p><p>此外，Light-4J 最小化了对第三方库的依赖，坚持了一种极简主义的方法，增强了稳定性、安全性和易于维护性。</p><h3 id="_4-1-设计优先方法" tabindex="-1"><a class="header-anchor" href="#_4-1-设计优先方法"><span>4.1. 设计优先方法</span></a></h3><p>Light-4J 从根本上采用了设计优先方法，优先考虑在任何实际实现之前仔细考虑和定义 API 合同和规范。**通过采用设计优先方法，Light-4J 鼓励我们提前精心计划和记录 API 的所需功能和行为。**这涉及到利用 OpenAPI 或 AsyncAPI 等行业标准规范以机器可读的格式定义 API 合同。</p><p>这些规范作为 API 的蓝图，详细说明了其端点、请求和响应有效载荷、认证要求以及其他相关信息。此外，它促进了参与开发过程的不同利益相关者之间的协作和一致性。</p><p>此外，**设计优先方法促进了基于 API 规范的代码和文档的自动生成。**这简化了开发过程，因为开发人员可以使用像 Light-4J 代码生成器这样的工具来搭建初始项目结构，为 API 端点生成样板代码，并从 API 合同自动生成 API 文档。我们将在接下来的部分中了解更多关于这方面的信息。</p><h3 id="_4-2-安全优先方法" tabindex="-1"><a class="header-anchor" href="#_4-2-安全优先方法"><span>4.2. 安全优先方法</span></a></h3><p>**Light-4J 还将安全作为其设计哲学的基础方面，采用“安全优先”的方法。**这确保了在框架上构建的应用程序能够强有力地抵御潜在的威胁和漏洞。这种方法的核心是 OAuth2 协议的无缝集成，用于认证和授权。这使得在我们的应用程序中轻松实现安全的认证和授权机制。</p><p>此外，**Light-4J 利用其嵌入式分布式网关，促进了 OAuth2 令牌在服务网络中的分布式验证。**分布式网关充当集中式认证和授权中心，拦截传入请求并在允许访问受保护资源之前验证 OAuth2 令牌。这种分布式的令牌验证方法确保了在微服务架构中的所有服务中一致和可靠的安全执行。</p><h2 id="_5-使用-light-4j-设置我们的开发环境" tabindex="-1"><a class="header-anchor" href="#_5-使用-light-4j-设置我们的开发环境"><span>5. 使用 Light-4J 设置我们的开发环境</span></a></h2><p>设置一个强大的开发环境是利用 Light-4J 进行微服务开发的关键步骤。这个过程包括安装和配置框架，定义与最佳实践一致的项目结构，并将 Light-4J 无缝集成到我们的工作流程中。</p><p>Light-4J 与 Java 兼容。Light-4J v1.5.x 和 v1.6.x 版本已经准备好投入生产使用，并且依赖于 Java 8，而 v2.0.x 则建立在 Java 11 上。因此，我们的机器上拥有 JDK 8 或 JDK 11 对于 Light-4J 是必不可少的。</p><p>要开始使用 Light-4J，我们有两个选项：使用 <em>light-codegen</em> 生成器或从示例项目开始。</p><h3 id="_5-1-使用-light-codegen-生成器" tabindex="-1"><a class="header-anchor" href="#_5-1-使用-light-codegen-生成器"><span>5.1. 使用 <em>light-codegen</em> 生成器</span></a></h3><p>我们可以使用 <em>light-codegen</em> 工具来促进 Light 中所有框架的项目脚手架。它由 Rocker 模板引擎驱动，既可以作为实用程序，也可以作为项目脚手架的 Web 服务。它鼓励用户在编码之前创建服务合同规范，然后根据设计的规范搭建项目。我们可以通过命令行、Docker、脚本和 Web UI 等多种方式使用它。</p><p>让我们了解如何使用这个生成器来构建一个基本的 REST API 项目，使用 Light-4J 和 OpenAPI 3.0。</p><p>首先，让我们创建一个基础目录并导航到其中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ mkdir baseDir
$ cd baseDir
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们可以将 <em>light-codegen</em> 仓库克隆到 <em>baseDir</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ git clone git@github.com:networknt/light-codegen.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同样，我们可以将 <em>model-config</em> 仓库克隆到 _baseDir_继续翻译：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ git clone git@github.com:networknt/model-config.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>这个项目包含诸如 <em>light-rest-4j</em>、<em>light-hybrid-4j-server</em>、<em>light-hybrid-4j-service</em> 和 <em>light-graphql-4j</em> 等框架的模型定义和配置文件。</strong></p><p>接下来，我们需要进入 <em>light-codegen</em> 目录并构建项目：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ cd light-codegen
$ mvn install -DskipTests
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>构建完成后，我们可以回到 <em>baseDir</em>。然后，我们可以执行 CLI 工具，根据 OpenAPI 3.0 规范生成示例 <em>PetStore</em> REST API 项目。新生成的项目将包含配置文件以部署请求-响应链：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ java -jar light-codegen/codegen-cli/target/codegen-cli.jar \\
  -f openapi \\
  -o light-example-4j/Rest/openAPI/petstore \\
  -m model-config/rest/openapi/petstore/1.0.0/openapi.yaml \\
  -c model-config/rest/openapi/petstore/1.0.0/config.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们分解这些参数和选项的含义：</p><ul><li>-f (framework) – 生成器的 REST 框架规范类型</li><li>-o (output) – 生成项目的目录</li><li>-m (model) – 每个 REST API 的请求和响应格式的 IDL 规范</li><li>-c (config) – 提供 HTTP 端口、包和要生成的项目名称等详细信息的配置文件</li></ul><p>因此，在成功执行上述命令后，我们将在 <em>baseDir</em> 中的 <em>light-example-4j</em> 文件夹内的新 <em>petstore</em> 项目：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>..... A project has been generated successfully in light-example-4j/Rest/openAPI/petstore folder. Have fun!!!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，我们可以转到新生成的 <em>light-example-4j</em> 中的 <em>petstore</em> 目录，并启动项目以访问其 REST API：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ cd light-example-4j/Rest/openAPI/petstore
$ mvn install exec:exec
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这将在 8443 端口上启动 HTTPS 服务器。因此，我们可以通过访问 API 来验证 REST 服务是否启动：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>https://127.0.0.1:8443/v1/pets
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将打印出所有的宠物：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[{&quot;id&quot;:1,&quot;name&quot;:&quot;catten&quot;,&quot;tag&quot;:&quot;cat&quot;},{&quot;id&quot;:2,&quot;name&quot;:&quot;doggy&quot;,&quot;tag&quot;:&quot;dog&quot;}]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们也可以访问特定宠物的 ID：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>https://127.0.0.1:8443/v1/pets/1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将简单地返回：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{&quot;id&quot;:1,&quot;name&quot;:&quot;catten&quot;,&quot;tag&quot;:&quot;cat&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，我们可以轻松地根据需要调整现成的配置和规范，并在 Light-4J 之上开发我们的框架。</p><p><strong>另一种本地生成脚手架项目的方式是通过 Java 命令行调用 <em>light-codegen</em>。我们可以从发布页面下载 <em>codegen-cli.jar</em>，将其放入我们的工作目录，并通过命令行运行。</strong></p><p>最后，我们可以参阅 <em>light-codegen</em> 教程，获取逐步指导，以开发各种其他 API 框架。</p><h3 id="_5-2-从示例项目开始" tabindex="-1"><a class="header-anchor" href="#_5-2-从示例项目开始"><span>5.2. 从示例项目开始</span></a></h3><p>light-example-4j 仓库包含基于 Light-4J 框架的各种功能的多种示例 API。我们可以使用这些示例来构建并开发我们自己的框架。</p><p>我们可以直接从 GitHub 克隆 <em>light-example-4J</em> 仓库到我们的本地机器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ git clone git@github.com:networknt/light-example-4j.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一旦我们克隆了仓库，我们可以根据用例选择任何可用的项目。例如，要使用 OpenAPI 3.0 规范构建 RESTful API，我们更改到克隆仓库中的以下目录：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ cd light-example-4j/rest/openapi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>否则，我们也可以使用 Swagger 2.0 构建并启动特定项目以访问其 REST API，正如我们上面讨论的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ cd light-example-4j/rest/swagger
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同样，我们可以根据需要开始使用许多其他可用的框架。</p><p>此外，我们可以参考各种教程，这些教程解释了如何根据我们的需求使用 Light 框架的每个组件的逐步过程。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>Light-4J 是一种为微服务开发设计的现代 Java 框架，强调敏捷性、性能和可扩展性。其轻量级设计哲学确保了简单性和效率，而其微服务架构促进了灵活性和更简单的维护。凭借异步通信和安全优先方法等功能，Light-4J 使开发人员能够无缝构建强大的应用程序。</p><p>在本文中，我们讨论了 Light-4J 的各种特性和设计原则。我们还了解了如何使用 <em>light-codegen</em> 工具快速搭建 REST API 项目。</p><p>随着 Light-4J 的不断发展，我们可以期待新的特性和增强，使其成为构建下一代微服务架构的首选。</p><p>文章发布后 30 天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p><p>OK</p>`,78),d=[l];function s(r,o){return i(),t("div",null,d)}const c=e(n,[["render",s],["__file","2024-06-19-Introduction to Light 4J.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-19-Introduction%20to%20Light%204J.html","title":"Light-4J 简介","lang":"zh-CN","frontmatter":{"date":"2024-06-19T00:00:00.000Z","category":["Java","Framework"],"tag":["Light-4J","Microservices"],"head":[["meta",{"name":"keywords","content":"Java, Framework, Microservices, Light-4J, Agile, Performance"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-19-Introduction%20to%20Light%204J.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Light-4J 简介"}],["meta",{"property":"og:description","content":"Light-4J 简介 传统的框架虽然健壮，但往往引入了挑战敏捷性的复杂性。现代开发需要的框架不仅要强大，还要灵活。轻量级框架，包括 Light-4J，在采用极简设计哲学的同时，专注于提供基本功能而不带不必要的复杂性，从而降低了开发人员的学习曲线，并优先考虑快速的开发周期。 **Light-4J 是一种尖端的 Java 框架，通过结合敏捷性和性能来彻底..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Light-4J"}],["meta",{"property":"article:tag","content":"Microservices"}],["meta",{"property":"article:published_time","content":"2024-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Light-4J 简介\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Light-4J 简介 传统的框架虽然健壮，但往往引入了挑战敏捷性的复杂性。现代开发需要的框架不仅要强大，还要灵活。轻量级框架，包括 Light-4J，在采用极简设计哲学的同时，专注于提供基本功能而不带不必要的复杂性，从而降低了开发人员的学习曲线，并优先考虑快速的开发周期。 **Light-4J 是一种尖端的 Java 框架，通过结合敏捷性和性能来彻底..."},"headers":[{"level":2,"title":"2. 什么是 Light-4J？","slug":"_2-什么是-light-4j","link":"#_2-什么是-light-4j","children":[]},{"level":2,"title":"3. Light-4J 的特性","slug":"_3-light-4j-的特性","link":"#_3-light-4j-的特性","children":[]},{"level":2,"title":"4. 设计原则","slug":"_4-设计原则","link":"#_4-设计原则","children":[{"level":3,"title":"4.1. 设计优先方法","slug":"_4-1-设计优先方法","link":"#_4-1-设计优先方法","children":[]},{"level":3,"title":"4.2. 安全优先方法","slug":"_4-2-安全优先方法","link":"#_4-2-安全优先方法","children":[]}]},{"level":2,"title":"5. 使用 Light-4J 设置我们的开发环境","slug":"_5-使用-light-4j-设置我们的开发环境","link":"#_5-使用-light-4j-设置我们的开发环境","children":[{"level":3,"title":"5.1. 使用 light-codegen 生成器","slug":"_5-1-使用-light-codegen-生成器","link":"#_5-1-使用-light-codegen-生成器","children":[]},{"level":3,"title":"5.2. 从示例项目开始","slug":"_5-2-从示例项目开始","link":"#_5-2-从示例项目开始","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":11.89,"words":3568},"filePathRelative":"posts/baeldung/Archive/2024-06-19-Introduction to Light 4J.md","localizedDate":"2024年6月19日","excerpt":"\\n<p>传统的框架虽然健壮，但往往引入了挑战敏捷性的复杂性。现代开发需要的框架不仅要强大，还要灵活。轻量级框架，包括 Light-4J，在采用极简设计哲学的同时，专注于提供基本功能而不带不必要的复杂性，从而降低了开发人员的学习曲线，并优先考虑快速的开发周期。</p>\\n<p>**Light-4J 是一种尖端的 Java 框架，通过结合敏捷性和性能来彻底改变开发。**它采用现代开发范式，与微服务的原则保持一致，并满足当今动态软件架构的需求。</p>\\n<p>在本教程中，我们将深入探讨其核心理念、主要功能和架构概念。我们将剖析它之所以轻量级的原因，以及这种品质如何转化为增强的开发速度和资源效率。</p>","autoDesc":true}');export{c as comp,h as data};
