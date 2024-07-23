import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as n,a as t}from"./app-LwwahXlT.js";const a={},r=t(`<h1 id="domain-graph-service-dgs-框架简介" tabindex="-1"><a class="header-anchor" href="#domain-graph-service-dgs-框架简介"><span>Domain Graph Service (DGS) 框架简介</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在过去几年中，客户端/服务器通信方面最重要的范式变化之一是 GraphQL，它是一种开源的查询语言和运行时，用于操作 API。我们可以使用它来请求我们所需的确切数据，从而限制我们需要的请求数量。</p><p>Netflix 创建了一个域图服务框架（DGS），以使事情更加容易。在这个快速教程中，我们将涵盖 DGS 框架的关键特性。我们将看到如何将此框架添加到我们的应用程序中，并检查其基本注释的工作原理。要了解更多关于 GraphQL 本身的信息，请查看我们的 GraphQL 介绍文章。</p><p>Netflix DGS（域图服务）是一个用 Kotlin 编写并基于 Spring Boot 的 GraphQL 服务器框架。它旨在除了 Spring 框架之外具有最小的外部依赖性。</p><p><strong>Netflix DGS 框架使用了一个基于 Spring Boot 的注释式 GraphQL Java 库。</strong> 除了基于注释的编程模型外，它还提供了几个有用的特性。<strong>它允许从 GraphQL 架构生成源代码。</strong> <strong>让我们总结一下一些关键特性：</strong></p><ul><li>基于注释的 Spring Boot 编程模型</li><li>用于将查询测试编写为单元测试的测试框架</li><li>Gradle/Maven 代码生成插件，用于根据架构创建类型</li><li>与 GraphQL 联合的轻松集成</li><li>与 Spring Security 的集成</li><li>GraphQL 订阅（WebSockets 和 SSE）</li><li>文件上传</li><li>错误处理</li><li>许多扩展点</li></ul><h2 id="_3-配置" tabindex="-1"><a class="header-anchor" href="#_3-配置"><span>3. 配置</span></a></h2><p>首先，由于 DGS 框架基于 Spring Boot，让我们创建一个 Spring Boot 应用程序。然后，让我们将 DGS 依赖项添加到我们的项目中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`com.netflix.graphql.dgs\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`graphql-dgs-spring-boot-starter\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`4.9.16\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-架构" tabindex="-1"><a class="header-anchor" href="#_4-架构"><span>4. 架构</span></a></h2><h3 id="_4-1-开发方法" tabindex="-1"><a class="header-anchor" href="#_4-1-开发方法"><span>4.1. 开发方法</span></a></h3><p><strong>DGS 框架支持架构优先和代码优先两种开发方法。</strong> 但推荐的方法是基于架构的，主要是因为它更容易跟上数据模型的变化。架构优先意味着我们首先为 GraphQL 服务定义架构，然后我们通过匹配架构中的定义来实现代码。框架默认会获取 <em>src/main/resources/schema</em> 文件夹中的任何架构文件。</p><h3 id="_4-2-实现" tabindex="-1"><a class="header-anchor" href="#_4-2-实现"><span>4.2. 实现</span></a></h3><p>让我们使用架构定义语言（SDL）为我们的示例应用程序创建一个简单的 GraphQL 架构：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>type Query {
    albums(titleFilter: String): [Album]
}

type Album {
    title: String
    artist: String
    recordNo: Int
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个架构允许查询专辑列表，并可选择通过 <em>title</em> 进行过滤。</p><h2 id="_5-基本注释" tabindex="-1"><a class="header-anchor" href="#_5-基本注释"><span>5. 基本注释</span></a></h2><p>让我们开始创建一个与我们的架构相对应的 <em>Album</em> 类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Album {
    private final String title;
    private final String artist;
    private final Integer recordNo;

    public Album(String title, String artist, Integer recordNo) {
        this.title = title;
        this.recordNo = recordNo;
        this.artist = artist;
    }

    // 标准 getter 方法
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-1-数据获取器" tabindex="-1"><a class="header-anchor" href="#_5-1-数据获取器"><span>5.1. 数据获取器</span></a></h3><p>数据获取器负责返回查询的数据。<strong>@DgsQuery、@DgsMutation 和 @DgsSubscription 注释是定义查询、变更和订阅类型的数据获取器的简写。</strong> 所有提到的注释等同于 @DgsData 注释。我们可以使用这些注释之一在 Java 方法上，使该方法成为数据获取器，并定义一个带有参数的类型。</p><h3 id="_5-2-实现" tabindex="-1"><a class="header-anchor" href="#_5-2-实现"><span>5.2. 实现</span></a></h3><p><strong>因此，要定义 DGS 数据获取器，我们需要在 @DgsComponent 类中创建一个查询方法。</strong> 我们想要查询示例中的 <em>Albums</em> 列表，所以让我们用 @DgsQuery 标记该方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private final List\`\`&lt;Album&gt;\`\` albums = Arrays.asList(
  new Album(&quot;Rumours&quot;, &quot;Fleetwood Mac&quot;, 20),
  new Album(&quot;What&#39;s Going On&quot;, &quot;Marvin Gaye&quot;, 10),
  new Album(&quot;Pet Sounds&quot;, &quot;The Beach Boys&quot;, 12)
  );

@DgsQuery
public List\`\`&lt;Album&gt;\`\` albums(@InputArgument String titleFilter) {
    if (titleFilter == null) {
        return albums;
    }
    return albums.stream()
      .filter(s -&gt; s.getTitle().contains(titleFilter))
      .collect(Collectors.toList());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还用 <em>@InputArgument</em> 注释标记了方法的参数。这个注释将使用方法参数的名称来匹配查询中发送的输入参数的名称。</p><h2 id="_6-代码生成插件" tabindex="-1"><a class="header-anchor" href="#_6-代码生成插件"><span>6. 代码生成插件</span></a></h2><p>DGS 还附带了一个代码生成插件，可以从 GraphQL 架构生成 Java 或 Kotlin 代码。代码生成通常与构建集成。</p><p><strong>DGS 代码生成插件可用于 Gradle 和 Maven。</strong> 插件根据我们的领域图服务的 GraphQL 架构文件在项目构建过程中生成代码。<strong>插件可以生成类型、输入类型、枚举和接口的数据类型，示例数据获取器和类型安全查询 API。</strong> 还有一个 <em>DgsConstants</em> 类，包含类型和字段的名称。</p><h2 id="_7-测试" tabindex="-1"><a class="header-anchor" href="#_7-测试"><span>7. 测试</span></a></h2><p>查询我们 API 的方便方式是 GraphiQL。<strong>GraphiQL 是一个查询编辑器，随 DGS 框架一起提供。</strong> 让我们在默认的 Spring Boot 端口启动应用程序，并检查 URL <em>http://localhost:8080/graphiql</em>。让我们尝试以下查询并测试结果：</p><p>请注意，与 REST 不同，我们必须特别列出我们希望从查询中返回的字段。让我们看看响应：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
  &quot;data&quot;: {
    &quot;albums&quot;: [
      {
        &quot;title&quot;: &quot;Rumours&quot;
      },
      {
        &quot;title&quot;: &quot;What&#39;s Going On&quot;
      },
      {
        &quot;title&quot;: &quot;Pet Sounds&quot;
      }
    ]
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>域图服务框架是使用 GraphQL 的一种简单且相当有吸引力的方式。它使用更高层次的构建块来处理查询执行等。DGS 框架使所有这些通过方便的 Spring Boot 编程模型可用。本文涵盖了此框架的一些有用特性。</p><p>我们讨论了如何在应用程序中配置 DGS，并查看了一些其基本注释。然后，我们编写了一个简单的应用程序来检查如何从架构创建数据并查询它们。最后，我们使用 GraphiQL 测试了我们的 API。示例可以在 GitHub 上找到。</p>`,36),l=[r];function s(d,o){return n(),i("div",null,l)}const u=e(a,[["render",s],["__file","2024-07-22-An Introduction to Domain Graph Service  DGS  Framework.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-An%20Introduction%20to%20Domain%20Graph%20Service%20%20DGS%20%20Framework.html","title":"Domain Graph Service (DGS) 框架简介","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Boot","GraphQL"],"tag":["Domain Graph Service","Netflix DGS"],"head":[["meta",{"name":"keywords","content":"Spring Boot, GraphQL, Domain Graph Service, Netflix DGS, DGS Framework, Kotlin, Java, Code Generation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-An%20Introduction%20to%20Domain%20Graph%20Service%20%20DGS%20%20Framework.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Domain Graph Service (DGS) 框架简介"}],["meta",{"property":"og:description","content":"Domain Graph Service (DGS) 框架简介 1. 概述 在过去几年中，客户端/服务器通信方面最重要的范式变化之一是 GraphQL，它是一种开源的查询语言和运行时，用于操作 API。我们可以使用它来请求我们所需的确切数据，从而限制我们需要的请求数量。 Netflix 创建了一个域图服务框架（DGS），以使事情更加容易。在这个快速教程..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T05:41:58.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Domain Graph Service"}],["meta",{"property":"article:tag","content":"Netflix DGS"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T05:41:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Domain Graph Service (DGS) 框架简介\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T05:41:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Domain Graph Service (DGS) 框架简介 1. 概述 在过去几年中，客户端/服务器通信方面最重要的范式变化之一是 GraphQL，它是一种开源的查询语言和运行时，用于操作 API。我们可以使用它来请求我们所需的确切数据，从而限制我们需要的请求数量。 Netflix 创建了一个域图服务框架（DGS），以使事情更加容易。在这个快速教程..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"3. 配置","slug":"_3-配置","link":"#_3-配置","children":[]},{"level":2,"title":"4. 架构","slug":"_4-架构","link":"#_4-架构","children":[{"level":3,"title":"4.1. 开发方法","slug":"_4-1-开发方法","link":"#_4-1-开发方法","children":[]},{"level":3,"title":"4.2. 实现","slug":"_4-2-实现","link":"#_4-2-实现","children":[]}]},{"level":2,"title":"5. 基本注释","slug":"_5-基本注释","link":"#_5-基本注释","children":[{"level":3,"title":"5.1. 数据获取器","slug":"_5-1-数据获取器","link":"#_5-1-数据获取器","children":[]},{"level":3,"title":"5.2. 实现","slug":"_5-2-实现","link":"#_5-2-实现","children":[]}]},{"level":2,"title":"6. 代码生成插件","slug":"_6-代码生成插件","link":"#_6-代码生成插件","children":[]},{"level":2,"title":"7. 测试","slug":"_7-测试","link":"#_7-测试","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1721626918000,"updatedTime":1721626918000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.68,"words":1404},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-An Introduction to Domain Graph Service  DGS  Framework.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在过去几年中，客户端/服务器通信方面最重要的范式变化之一是 GraphQL，它是一种开源的查询语言和运行时，用于操作 API。我们可以使用它来请求我们所需的确切数据，从而限制我们需要的请求数量。</p>\\n<p>Netflix 创建了一个域图服务框架（DGS），以使事情更加容易。在这个快速教程中，我们将涵盖 DGS 框架的关键特性。我们将看到如何将此框架添加到我们的应用程序中，并检查其基本注释的工作原理。要了解更多关于 GraphQL 本身的信息，请查看我们的 GraphQL 介绍文章。</p>\\n<p>Netflix DGS（域图服务）是一个用 Kotlin 编写并基于 Spring Boot 的 GraphQL 服务器框架。它旨在除了 Spring 框架之外具有最小的外部依赖性。</p>","autoDesc":true}');export{u as comp,m as data};
