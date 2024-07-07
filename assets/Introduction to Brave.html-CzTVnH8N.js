import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as n,a}from"./app-B0JIQbDY.js";const t={},r=a('<h1 id="brave简介" tabindex="-1"><a class="header-anchor" href="#brave简介"><span>Brave简介</span></a></h1><p>在现代软件开发中，微服务架构非常流行，因此，跨多个服务跟踪和分析请求流的能力至关重要。正因如此，分布式追踪作为一种关键工具出现，为我们的系统性能和行为提供了洞察。</p><p>在本教程中，我们将介绍Brave，这是Java生态系统中一个流行的分布式追踪工具库。</p><h2 id="_2-分布式追踪的理解" tabindex="-1"><a class="header-anchor" href="#_2-分布式追踪的理解"><span>2. 分布式追踪的理解</span></a></h2><p>分布式追踪是一种用于监控和排查由相互连接的服务组成的复杂分布式系统的方法。在这些系统中，请求可能会经过多个服务，每个服务都负责执行特定的任务。因此，没有使用一些专用工具，跟踪请求的旅程可能会变得具有挑战性。</p><p>在探索分布式追踪之前，我们必须定义两个关键概念：追踪和跨度。一个追踪代表一个外部请求，由一组跨度组成。一个跨度代表一个操作；其关键属性是操作名称、开始时间和结束时间。一个跨度可以有一个或多个子跨度，代表嵌套操作。</p><p>现在，让我们探索分布式追踪的关键组成部分：工具库和分布式追踪服务器。每个服务使用的工具库的主要目的是生成和传播追踪数据。这包括捕获服务内的运营细节，例如处理传入请求、向其他服务或数据库发起出站调用以及处理数据。</p><p>另一方面，分布式追踪服务器代表追踪数据管理的中心枢纽。它提供API以接收来自工具库的追踪数据，聚合和存储数据，并提供分析、监控和故障排除的工具。</p><p>以下图表显示了分布式追踪的工作原理以及组件之间的交互：</p><h2 id="_3-zipkin" tabindex="-1"><a class="header-anchor" href="#_3-zipkin"><span>3. Zipkin</span></a></h2><p>Zipkin是一个领先的开源分布式追踪系统，最初由Twitter开发。它旨在帮助收集解决微服务架构中延迟问题所需的数据。它从工具化服务收集数据，然后提供这些数据的详细视图。</p><p>Zipkin由四个主要组成部分组成，我们将在以下小节中详细说明每个部分。</p><h3 id="_3-1-收集器" tabindex="-1"><a class="header-anchor" href="#_3-1-收集器"><span>3.1. 收集器</span></a></h3><p>当工具化服务生成追踪数据时，需要收集和处理。因此，收集器负责接收并验证Zipkin接收到的追踪。一旦追踪被验证，它们就被存储以供以后检索和分析。收集器可以通过HTTP或AMQP接收数据，使其灵活并适合各种系统架构。</p><h3 id="_3-2-存储" tabindex="-1"><a class="header-anchor" href="#_3-2-存储"><span>3.2. 存储</span></a></h3><p>Zipkin最初是使用Cassandra存储数据的，因为Cassandra高度可扩展、灵活，并且在Twitter内部广泛使用。然而，Zipkin已经更新为更具配置性，支持其他存储选项，如ElasticSearch、MySQL甚至内存存储。</p><h3 id="_3-3-api" tabindex="-1"><a class="header-anchor" href="#_3-3-api"><span>3.3. API</span></a></h3><p>一旦数据被存储，Zipkin通过RESTful接口提供了一种直观的数据提取方式。这个接口使我们能够轻松地按需定位和检索追踪。此外，API也是Zipkin Web UI的主要数据来源，后者是其数据的主要来源。</p><h3 id="_3-4-web-ui" tabindex="-1"><a class="header-anchor" href="#_3-4-web-ui"><span>3.4. Web UI</span></a></h3><p>Zipkin提供的图形用户界面（GUI）是一种视觉上易于访问的方法，用于根据服务、时间和注释检查追踪。此外，它通过允许我们深入特定追踪，促进了详细分析，这在解决涉及分布式事务的复杂问题时尤其宝贵。</p><h2 id="_4-brave" tabindex="-1"><a class="header-anchor" href="#_4-brave"><span>4. Brave</span></a></h2><p>Brave是一个分布式追踪工具库。它拦截生产请求，收集时间数据，并传播追踪上下文。它的主要目标是促进分布式系统中时间数据的相关性，从而实现对延迟问题的高效故障排除。</p><p>虽然Brave通常将追踪数据发送到Zipkin服务器，但它通过第三方插件提供了与其他服务（如Amazon X-Ray）集成的灵活性。</p><p>Brave提供了一个无依赖追踪库，与JRE6及以上版本兼容。它提供了一个基本的API，用于计时操作并用描述性属性标记它们。这个库还包括解析_X-B3-TraceId_头部的代码，进一步增强了其功能。</p><p>通常不需要直接实现追踪代码，用户可以利用Brave和Zipkin提供的现有工具。值得注意的是，对于常见的追踪场景，如JDBC、Servlet和Spring，已经有现成的库，经过精心测试和基准测试。</p><p>对于那些处理遗留应用程序的用户，Spring XML配置提供了一种无缝的追踪设置，无需自定义代码。</p><p>用户也可能寻求将追踪ID集成到日志文件或修改线程本地行为。在这种情况下，Brave提供的上下文库提供了与SLF4J等工具的无缝集成。</p><h2 id="_5-如何使用brave" tabindex="-1"><a class="header-anchor" href="#_5-如何使用brave"><span>5. 如何使用Brave</span></a></h2><p>接下来，我们将构建一个简单的Java和Spring Boot应用程序，并将其与Brave和Zipkin集成。</p><h3 id="_5-1-zipkin-slim设置" tabindex="-1"><a class="header-anchor" href="#_5-1-zipkin-slim设置"><span>5.1. Zipkin Slim设置</span></a></h3><p>首先，我们需要一个运行中的Zipkin服务器。为此，我们将使用Zipkin Slim，这是Zipkin的一个精简构建版本，它更小且启动更快。它支持内存和Elasticsearch存储，但不支持通过Kafka或RabbitMQ进行消息传递。</p><p>Zipkin的官方仓库记录了多种使用Zipkin Slim的方法。此外，我们的另一篇文章《使用Zipkin追踪服务》中也介绍了运行Zipkin服务器的其他方法。</p><p>为了简单起见，我们将假设我们的本地机器上已经安装了Docker，并使用以下命令运行它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run -d -p 9411:9411 openzipkin/zipkin-slim\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，通过访问_http://localhost:9411/zipkin/_，我们可以可视化Zipkin Web UI。</p><h3 id="_5-2-项目设置" tabindex="-1"><a class="header-anchor" href="#_5-2-项目设置"><span>5.2. 项目设置</span></a></h3><p>我们将从一个空的Spring Boot项目开始，其中包括_brave, zipkin-reporter, zipkin-sender-okhttp3,_和_zipkin-reporter-brave_依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````io.zipkin.brave````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````brave````&lt;/artifactId&gt;````\n    ````&lt;version&gt;````6.0.2````&lt;/version&gt;````\n````&lt;/dependency&gt;````\n````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````io.zipkin.reporter2````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````zipkin-reporter````&lt;/artifactId&gt;````\n    ````&lt;version&gt;````3.3.0````&lt;/version&gt;````\n````&lt;/dependency&gt;````\n````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````io.zipkin.reporter2````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````zipkin-sender-okhttp3````&lt;/artifactId&gt;````\n    ````&lt;version&gt;````3.3.0````&lt;/version&gt;````\n````&lt;/dependency&gt;````\n````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````io.zipkin.reporter2````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````zipkin-reporter-brave````&lt;/artifactId&gt;````\n    ````&lt;version&gt;````3.3.0````&lt;/version&gt;````\n````&lt;/dependency&gt;````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们需要一个配置类来实例化一个_Tracer_ bean，以便稍后使用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Configuration\npublic class TracingConfiguration {\n    @Bean\n    BytesMessageSender sender() {\n        return OkHttpSender.create(&quot;http://127.0.0.1:9411/api/v2/spans&quot;);\n    }\n\n    @Bean\n    AsyncZipkinSpanHandler zipkinSpanHandler(BytesMessageSender sender) {\n        return AsyncZipkinSpanHandler.create(sender);\n    }\n\n    @Bean\n    public Tracing tracing(AsyncZipkinSpanHandler zipkinSpanHandler) {\n        return Tracing.newBuilder()\n          .localServiceName(&quot;Dummy Service&quot;)\n          .addSpanHandler(zipkinSpanHandler)\n          .build();\n    }\n\n    @Bean\n    public Tracer tracer(Tracing tracing) {\n        return tracing.tracer();\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以直接将_Tracer_注入到我们的bean中。为了演示，<strong>我们将创建一个在初始化后将追踪发送到Zipkin的虚拟服务</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Service\npublic class TracingService {\n    private final Tracer tracer;\n\n    public TracingService(Tracer tracer) {\n        this.tracer = tracer;\n    }\n\n    @PostConstruct\n    private void postConstruct() {\n        Span span = tracer.nextSpan().name(&quot;Hello from Service&quot;).start();\n        try {\n            Thread.sleep(2000);\n        } catch (InterruptedException e) {\n            throw new RuntimeException(e);\n        } finally {\n            span.finish();\n        }\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行应用程序并检查Zipkin Web UI，我们应该能够看到我们的追踪，其中只包含一个跨度，大约需要2秒钟：</p><p><strong>请注意，这个例子只是轻微配置了追踪。在处理更复杂的情况时，建议使用Spring Cloud Sleuth。</strong></p><p>此外，《brave-example》存储库描述了追踪一个简单Web应用程序的替代方法。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>正如我们在本文中了解到的，Brave帮助我们有效地监控我们的应用程序。Brave简化了工具化过程，并由于其与Zipkin的无缝集成，在分布式系统中证明了自己的价值。</p><p>一如既往，源代码可以在GitHub上找到。</p><p>发表文章后的30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表格。</p>',49),l=[r];function d(s,p){return n(),i("div",null,l)}const o=e(t,[["render",d],["__file","Introduction to Brave.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/Archive/Introduction%20to%20Brave.html","title":"Brave简介","lang":"zh-CN","frontmatter":{"date":"2024-06-19T00:00:00.000Z","category":["Java","Spring"],"tag":["Brave","Zipkin","分布式追踪"],"head":[["meta",{"name":"keywords","content":"Java, Brave, Zipkin, 分布式追踪, 微服务"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Introduction%20to%20Brave.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Brave简介"}],["meta",{"property":"og:description","content":"Brave简介 在现代软件开发中，微服务架构非常流行，因此，跨多个服务跟踪和分析请求流的能力至关重要。正因如此，分布式追踪作为一种关键工具出现，为我们的系统性能和行为提供了洞察。 在本教程中，我们将介绍Brave，这是Java生态系统中一个流行的分布式追踪工具库。 2. 分布式追踪的理解 分布式追踪是一种用于监控和排查由相互连接的服务组成的复杂分布式系..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Brave"}],["meta",{"property":"article:tag","content":"Zipkin"}],["meta",{"property":"article:tag","content":"分布式追踪"}],["meta",{"property":"article:published_time","content":"2024-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Brave简介\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Brave简介 在现代软件开发中，微服务架构非常流行，因此，跨多个服务跟踪和分析请求流的能力至关重要。正因如此，分布式追踪作为一种关键工具出现，为我们的系统性能和行为提供了洞察。 在本教程中，我们将介绍Brave，这是Java生态系统中一个流行的分布式追踪工具库。 2. 分布式追踪的理解 分布式追踪是一种用于监控和排查由相互连接的服务组成的复杂分布式系..."},"headers":[{"level":2,"title":"2. 分布式追踪的理解","slug":"_2-分布式追踪的理解","link":"#_2-分布式追踪的理解","children":[]},{"level":2,"title":"3. Zipkin","slug":"_3-zipkin","link":"#_3-zipkin","children":[{"level":3,"title":"3.1. 收集器","slug":"_3-1-收集器","link":"#_3-1-收集器","children":[]},{"level":3,"title":"3.2. 存储","slug":"_3-2-存储","link":"#_3-2-存储","children":[]},{"level":3,"title":"3.3. API","slug":"_3-3-api","link":"#_3-3-api","children":[]},{"level":3,"title":"3.4. Web UI","slug":"_3-4-web-ui","link":"#_3-4-web-ui","children":[]}]},{"level":2,"title":"4. Brave","slug":"_4-brave","link":"#_4-brave","children":[]},{"level":2,"title":"5. 如何使用Brave","slug":"_5-如何使用brave","link":"#_5-如何使用brave","children":[{"level":3,"title":"5.1. Zipkin Slim设置","slug":"_5-1-zipkin-slim设置","link":"#_5-1-zipkin-slim设置","children":[]},{"level":3,"title":"5.2. 项目设置","slug":"_5-2-项目设置","link":"#_5-2-项目设置","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.6,"words":1980},"filePathRelative":"posts/baeldung/Archive/Introduction to Brave.md","localizedDate":"2024年6月19日","excerpt":"\\n<p>在现代软件开发中，微服务架构非常流行，因此，跨多个服务跟踪和分析请求流的能力至关重要。正因如此，分布式追踪作为一种关键工具出现，为我们的系统性能和行为提供了洞察。</p>\\n<p>在本教程中，我们将介绍Brave，这是Java生态系统中一个流行的分布式追踪工具库。</p>\\n<h2>2. 分布式追踪的理解</h2>\\n<p>分布式追踪是一种用于监控和排查由相互连接的服务组成的复杂分布式系统的方法。在这些系统中，请求可能会经过多个服务，每个服务都负责执行特定的任务。因此，没有使用一些专用工具，跟踪请求的旅程可能会变得具有挑战性。</p>\\n<p>在探索分布式追踪之前，我们必须定义两个关键概念：追踪和跨度。一个追踪代表一个外部请求，由一组跨度组成。一个跨度代表一个操作；其关键属性是操作名称、开始时间和结束时间。一个跨度可以有一个或多个子跨度，代表嵌套操作。</p>","autoDesc":true}');export{o as comp,u as data};
