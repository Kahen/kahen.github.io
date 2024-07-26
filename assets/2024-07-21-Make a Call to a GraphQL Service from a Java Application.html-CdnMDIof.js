import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-DpYLEM_u.js";const i={},l=n('<hr><h1 id="java调用graphql服务" tabindex="-1"><a class="header-anchor" href="#java调用graphql服务"><span>Java调用GraphQL服务</span></a></h1><p>GraphQL是作为REST的一种替代，用于构建Web服务的相对<strong>新概念</strong>。最近，一些Java库已经出现，用于创建和调用GraphQL服务。</p><p>在本教程中，我们将查看GraphQL模式、查询和变更。我们将看到如何在纯Java中创建和模拟一个简单的GraphQL服务器。然后，我们将探讨如何使用众所周知的HTTP库调用GraphQL服务。</p><p>最后，我们还将探讨用于调用GraphQL服务的可用第三方库。</p><p>GraphQL是一种用于Web服务的查询语言，也是用于使用类型系统执行查询的服务器端运行时。</p><p>GraphQL服务器使用GraphQL模式指定API的功能。这允许GraphQL客户端精确指定从API检索哪些数据。这可能包括子资源和单个请求中的多个查询。</p><h3 id="_2-1-graphql模式" tabindex="-1"><a class="header-anchor" href="#_2-1-graphql模式"><span>2.1. GraphQL模式</span></a></h3><p>GraphQL服务器使用一组类型定义服务。这些类型<strong>描述了您可以使用服务查询的数据集合</strong>。</p><p>GraphQL服务可以用任何语言编写。但是，GraphQL模式需要使用称为GraphQL模式语言的DSL来定义。</p><p>在我们的示例GraphQL模式中，我们将定义两种类型（<em>Book_和_Author</em>）和一个单一的查询操作以获取所有书籍（<em>allBooks</em>）：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>type Book {\n    title: String!\n    author: Author\n}\n\ntype Author {\n    name: String!\n    surname: String!\n}\n\ntype Query {\n    allBooks: [Book]\n}\n\nschema {\n    query: Query\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_Query_类型是特殊的，因为它定义了GraphQL查询的入口点。</p><h3 id="_2-2-查询和变更" tabindex="-1"><a class="header-anchor" href="#_2-2-查询和变更"><span>2.2. 查询和变更</span></a></h3><p>通过<strong>定义类型和字段，以及为不同字段提供函数</strong>来创建GraphQL服务。</p><p>在最简单的形式中，GraphQL是关于请求对象上特定字段的。例如，我们可能查询以获取所有书名：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{\n    &quot;allBooks&quot; {\n        &quot;title&quot;\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管看起来相似，但这不是JSON。它是一种特殊的GraphQL查询格式，支持参数、别名、变量等。</p><p>GraphQL服务将以如下JSON格式的响应回应上述查询：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{\n    &quot;data&quot;: {\n        &quot;allBooks&quot;: [\n            {\n                &quot;title&quot;: &quot;Title 1&quot;\n            },\n            {\n                &quot;title&quot;: &quot;Title 2&quot;\n            }\n        ]\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在本教程中，我们将专注于使用查询获取数据。然而，重要的是要提到GraphQL内部的另一个特殊概念——变异。</p><p>任何可能导致修改的操作都是使用变异类型发送的。</p><h2 id="_3-graphql服务器" tabindex="-1"><a class="header-anchor" href="#_3-graphql服务器"><span>3. GraphQL服务器</span></a></h2><p>让我们使用我们上面定义的模式，在Java中创建一个简单的GraphQL服务器。我们将使用<strong>GraphQL Java库来实现我们的GraphQL服务器</strong>。</p><p>我们将从定义我们的GraphQL查询开始，并实现我们示例GraphQL模式中指定的_allBooks_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class GraphQLQuery implements GraphQLQueryResolver {\n    private BookRepository repository;\n\n    public GraphQLQuery(BookRepository repository) {\n        this.repository = repository;\n    }\n\n    public List`&lt;Book&gt;` allBooks() {\n        return repository.getAllBooks();\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，为了暴露我们的GraphQL端点，我们将创建一个web servlet：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@WebServlet(urlPatterns = &quot;/graphql&quot;)\npublic class GraphQLEndpoint extends HttpServlet {\n    private SimpleGraphQLHttpServlet graphQLServlet;\n\n    @Override\n    protected void service(HttpServletRequest req, HttpServletResponse resp)\n      throws ServletException, IOException {\n        graphQLServlet.service(req, resp);\n    }\n\n    @Override\n    public void init() {\n        GraphQLSchema schema = SchemaParser.newParser()\n          .resolvers(new GraphQLQuery(new BookRepository()))\n          .file(&quot;schema.graphqls&quot;)\n          .build()\n          .makeExecutableSchema();\n        graphQLServlet = SimpleGraphQLHttpServlet\n          .newBuilder(schema)\n          .build();\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在servlet _init_方法中，我们将解析位于资源文件夹中的GraphQL模式。最后，使用解析后的模式，我们可以创建一个_SimpleGraphQLHttpServlet_的实例。</p><p>我们将使用_maven-war-plugin_来打包我们的应用程序，并使用_jetty-maven-plugin_来运行它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mvn jetty:run\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在我们准备好通过发送请求来运行和测试我们的GraphQL服务：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>http://localhost:8080/graphql?query={allBooks{title}}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-http客户端" tabindex="-1"><a class="header-anchor" href="#_4-http客户端"><span>4. HTTP客户端</span></a></h2><p>与REST服务一样，GraphQL服务通过HTTP协议公开。因此，我们可以<strong>使用任何Java HTTP客户端来调用GraphQL服务</strong>。</p><h3 id="_4-1-发送请求" tabindex="-1"><a class="header-anchor" href="#_4-1-发送请求"><span>4.1. 发送请求</span></a></h3><p>让我们尝试<strong>向我们在前一节中创建的GraphQL服务发送请求</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static HttpResponse callGraphQLService(String url, String query)\n  throws URISyntaxException, IOException {\n    HttpClient client = HttpClientBuilder.create().build();\n    HttpGet request = new HttpGet(url);\n    URI uri = new URIBuilder(request.getURI())\n      .addParameter(&quot;query&quot;, query)\n      .build();\n    request.setURI(uri);\n    return client.execute(request);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的示例中，我们使用了Apache HttpClient。然而，任何Java HTTP客户端都可以使用。</p><h3 id="_4-2-解析响应" tabindex="-1"><a class="header-anchor" href="#_4-2-解析响应"><span>4.2. 解析响应</span></a></h3><p>接下来，让我们解析来自GraphQL服务的响应。<strong>GraphQL服务发送JSON格式的响应</strong>，与REST服务相同：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>HttpResponse httpResponse = callGraphQLService(serviceUrl, &quot;{allBooks{title}}&quot;);\nString actualResponse = IOUtils.toString(httpResponse.getEntity().getContent(), StandardCharsets.UTF_8.name());\nResponse parsedResponse = objectMapper.readValue(actualResponse, Response.class);\nassertThat(parsedResponse.getData().getAllBooks()).hasSize(2);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的示例中，我们使用了来自流行的Jackson库的_ObjectMapper_。然而，我们可以使用任何Java库进行JSON序列化/反序列化。</p><h3 id="_4-3-模拟响应" tabindex="-1"><a class="header-anchor" href="#_4-3-模拟响应"><span>4.3. 模拟响应</span></a></h3><p>与通过HTTP公开的任何其他服务一样，<strong>我们可以模拟GraphQL服务器响应以进行测试</strong>。</p><p>我们可以利用MockServer库来存根外部GraphQL HTTP服务：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String requestQuery = &quot;{allBooks{title}}&quot;;\nString responseJson = &quot;{\\&quot;data\\&quot;:{\\&quot;allBooks\\&quot;:[{\\&quot;title\\&quot;:\\&quot;Title 1\\&quot;},{\\&quot;title\\&quot;:\\&quot;Title 2\\&quot;}]}}&quot;;\nnew MockServerClient(SERVER_ADDRESS, serverPort)\n    .when(\n      request()\n        .withPath(PATH)\n        .withQueryStringParameter(&quot;query&quot;, requestQuery),\n      exactly(1)\n    )\n    .respond(\n      response()\n        .withStatusCode(HttpStatusCode.OK_200.code())\n        .withBody(responseJson)\n    );\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的示例模拟服务器将接受GraphQL查询作为参数，并在body中用JSON响应。</p><h2 id="_5-外部库" tabindex="-1"><a class="header-anchor" href="#_5-外部库"><span>5. 外部库</span></a></h2><p>最近出现了几个Java GraphQL库，它们允许更简单的GraphQL服务调用。</p><h3 id="_5-1-美国运通-nodes" tabindex="-1"><a class="header-anchor" href="#_5-1-美国运通-nodes"><span>5.1. 美国运通_Nodes_</span></a></h3><p>_Nodes_是美国运通设计的GraphQL客户端，旨在<strong>根据标准模型定义构建查询</strong>。要开始使用它，我们首先应该添加所需的依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ```&lt;groupId&gt;```com.github.americanexpress.nodes```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```nodes```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```0.5.0```&lt;/version&gt;```\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该库目前托管在_JitPack_上，我们还应该将其添加到我们的Maven安装仓库：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;repository&gt;`\n    `&lt;id&gt;`jitpack.io`&lt;/id&gt;`\n    `&lt;url&gt;`https://jitpack.io`&lt;/url&gt;`\n`&lt;/repository&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦解决了依赖项，我们可以使用_GraphQLTemplate_来构建查询并调用我们的GraphQL服务：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static GraphQLResponseEntity``&lt;Data&gt;`` callGraphQLService(String url, String query)\n  throws IOException {\n    GraphQLTemplate graphQLTemplate = new GraphQLTemplate();\n\n    GraphQLRequestEntity requestEntity = GraphQLRequestEntity.Builder()\n      .url(StringUtils.join(url, &quot;?query=&quot;, query))\n      .request(Data.class)\n      .build();\n\n    return graphQLTemplate.query(requestEntity, Data.class);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_Nodes_将使用我们指定的类解析来自GraphQL服务的响应：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>GraphQLResponseEntity``&lt;Data&gt;`` responseEntity = callGraphQLService(serviceUrl, &quot;{allBooks{title}}&quot;);\nassertThat(responseEntity.getResponse().getAllBooks()).hasSize(2);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意到_Nodes_仍然需要我们构建自己的DTO类来解析响应。</p><h3 id="_5-2-graphql-java-generator" tabindex="-1"><a class="header-anchor" href="#_5-2-graphql-java-generator"><span>5.2. GraphQL Java Generator</span></a></h3><p>_GraphQL Java Generator_库利用了<strong>基于GraphQL模式生成Java代码的能力</strong>。</p><p>这种方法类似于SOAP服务中使用的WSDL代码生成器。要开始使用它，我们首先应该添加所需的依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ```&lt;groupId&gt;```com.graphql-java-generator```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```graphql-java-runtime```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```1.18```&lt;/version&gt;```\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们可以配置_graphql-maven-plugin_来执行_generateClientCode_目标：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;plugin&gt;`\n    ```&lt;groupId&gt;```com.graphql-java-generator```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```graphql-maven-plugin```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```1.18```&lt;/version&gt;```\n    `&lt;executions&gt;`\n        `&lt;execution&gt;`\n            `&lt;goals&gt;`\n                `&lt;goal&gt;`generateClientCode`&lt;/goal&gt;`\n            `&lt;/goals&gt;`\n        `&lt;/execution&gt;`\n    `&lt;/executions&gt;`\n    `&lt;configuration&gt;`\n        `&lt;packageName&gt;`com.baeldung.graphql.generated`&lt;/packageName&gt;`\n        `&lt;copyRuntimeSources&gt;`false`&lt;/copyRuntimeSources&gt;`\n        `&lt;generateDeprecatedRequestResponse&gt;`false`&lt;/generateDeprecatedRequestResponse&gt;`\n        `&lt;separateUtilityClasses&gt;`true`&lt;/separateUtilityClasses&gt;`\n    `&lt;/configuration&gt;`\n`&lt;/plugin&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们运行M</p>',67),r=[l];function s(d,p){return t(),a("div",null,r)}const u=e(i,[["render",s],["__file","2024-07-21-Make a Call to a GraphQL Service from a Java Application.html.vue"]]),o=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Make%20a%20Call%20to%20a%20GraphQL%20Service%20from%20a%20Java%20Application.html","title":"Java调用GraphQL服务","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","GraphQL"],"tag":["GraphQL","Java","Web服务"],"head":[["meta",{"name":"keywords","content":"Java, GraphQL, Web服务, REST, HTTP客户端"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Make%20a%20Call%20to%20a%20GraphQL%20Service%20from%20a%20Java%20Application.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java调用GraphQL服务"}],["meta",{"property":"og:description","content":"Java调用GraphQL服务 GraphQL是作为REST的一种替代，用于构建Web服务的相对新概念。最近，一些Java库已经出现，用于创建和调用GraphQL服务。 在本教程中，我们将查看GraphQL模式、查询和变更。我们将看到如何在纯Java中创建和模拟一个简单的GraphQL服务器。然后，我们将探讨如何使用众所周知的HTTP库调用GraphQ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T07:22:45.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"GraphQL"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Web服务"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T07:22:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java调用GraphQL服务\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T07:22:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java调用GraphQL服务 GraphQL是作为REST的一种替代，用于构建Web服务的相对新概念。最近，一些Java库已经出现，用于创建和调用GraphQL服务。 在本教程中，我们将查看GraphQL模式、查询和变更。我们将看到如何在纯Java中创建和模拟一个简单的GraphQL服务器。然后，我们将探讨如何使用众所周知的HTTP库调用GraphQ..."},"headers":[{"level":3,"title":"2.1. GraphQL模式","slug":"_2-1-graphql模式","link":"#_2-1-graphql模式","children":[]},{"level":3,"title":"2.2. 查询和变更","slug":"_2-2-查询和变更","link":"#_2-2-查询和变更","children":[]},{"level":2,"title":"3. GraphQL服务器","slug":"_3-graphql服务器","link":"#_3-graphql服务器","children":[]},{"level":2,"title":"4. HTTP客户端","slug":"_4-http客户端","link":"#_4-http客户端","children":[{"level":3,"title":"4.1. 发送请求","slug":"_4-1-发送请求","link":"#_4-1-发送请求","children":[]},{"level":3,"title":"4.2. 解析响应","slug":"_4-2-解析响应","link":"#_4-2-解析响应","children":[]},{"level":3,"title":"4.3. 模拟响应","slug":"_4-3-模拟响应","link":"#_4-3-模拟响应","children":[]}]},{"level":2,"title":"5. 外部库","slug":"_5-外部库","link":"#_5-外部库","children":[{"level":3,"title":"5.1. 美国运通_Nodes_","slug":"_5-1-美国运通-nodes","link":"#_5-1-美国运通-nodes","children":[]},{"level":3,"title":"5.2. GraphQL Java Generator","slug":"_5-2-graphql-java-generator","link":"#_5-2-graphql-java-generator","children":[]}]}],"git":{"createdTime":1721546565000,"updatedTime":1721546565000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.38,"words":1613},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Make a Call to a GraphQL Service from a Java Application.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java调用GraphQL服务</h1>\\n<p>GraphQL是作为REST的一种替代，用于构建Web服务的相对<strong>新概念</strong>。最近，一些Java库已经出现，用于创建和调用GraphQL服务。</p>\\n<p>在本教程中，我们将查看GraphQL模式、查询和变更。我们将看到如何在纯Java中创建和模拟一个简单的GraphQL服务器。然后，我们将探讨如何使用众所周知的HTTP库调用GraphQL服务。</p>\\n<p>最后，我们还将探讨用于调用GraphQL服务的可用第三方库。</p>\\n<p>GraphQL是一种用于Web服务的查询语言，也是用于使用类型系统执行查询的服务器端运行时。</p>","autoDesc":true}');export{u as comp,o as data};
