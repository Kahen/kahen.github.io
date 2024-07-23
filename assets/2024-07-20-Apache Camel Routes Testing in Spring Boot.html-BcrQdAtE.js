import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-LwwahXlT.js";const i={},l=a(`<h1 id="apache-camel-路由在-spring-boot-中的测试" tabindex="-1"><a class="header-anchor" href="#apache-camel-路由在-spring-boot-中的测试"><span>Apache Camel 路由在 Spring Boot 中的测试</span></a></h1><p>Apache Camel 是一个强大的开源集成框架，实现了一些众所周知的企业集成模式。</p><p>在本教程中，<strong>我们将学习如何为我们的 Camel 路由编写可靠、自包含的单元测试</strong>。</p><p>首先，我们将创建一个使用 Spring Boot 的基本 Camel 应用程序。然后，我们将看看如何使用 Camel 的 Spring 测试支持 API 和 JUnit 5 来测试我们的应用程序。</p><h2 id="_2-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-依赖项"><span><strong>2. 依赖项</strong></span></a></h2><p>假设我们的项目已经设置并配置为与 Spring Boot 和 Camel 一起工作。</p><p>然后，我们需要在我们的 <em>pom.xml</em> 中添加 <em>camel-test-spring-junit5</em> 依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`org.apache.camel\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`camel-test-spring-junit5\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`4.3.0\`&lt;/version&gt;\`
    \`&lt;scope&gt;\`test\`&lt;/scope&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>顾名思义，这个依赖项专门用于我们的单元测试。</p><h2 id="_3-定义一个简单的-camel-spring-boot-应用程序" tabindex="-1"><a class="header-anchor" href="#_3-定义一个简单的-camel-spring-boot-应用程序"><span><strong>3. 定义一个简单的 Camel Spring Boot 应用程序</strong></span></a></h2><p>在整个教程中，我们的测试重点将是一个简单的 Apache Camel Spring Boot 应用程序。</p><p>所以让我们从定义我们的应用程序入口点开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@SpringBootApplication
public class GreetingsFileSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(GreetingsFileSpringApplication.class, args);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，这是一个标准的 Spring Boot 应用程序。</p><h3 id="_3-1-创建路由" tabindex="-1"><a class="header-anchor" href="#_3-1-创建路由"><span><strong>3.1 创建路由</strong></span></a></h3><p>接下来，我们将定义一个相当基础的路由：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Component
public class GreetingsFileRouter extends RouteBuilder {

    @Override
    public void configure() throws Exception {

        from(&quot;direct:start&quot;)
          .routeId(&quot;greetings-route&quot;)
          .setBody(constant(&quot;Hello Baeldung Readers!&quot;))
          .to(&quot;file:output&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>快速回顾一下，Apache Camel 中的路由是一个基本构建块，通常由 Camel 按顺序执行的一系列步骤组成，用于消费和处理消息。</p><p>正如我们简单示例中所看到的，我们配置我们的路由从称为 <em>start</em> 的直接端点消费消息。</p><p>然后，<strong>我们将消息体设置为包含字符串 <em>Hello Baeldung Readers!</em> 并使用文件组件将我们的消息交换内容写入名为 <em>output</em> 的文件目录</strong>。</p><p>我们还为我们的路由设置了一个名为 <em>greetings-route</em> 的 ID。在路由中使用 ID 通常被认为是一种良好的实践，可以帮助我们在测试路由时。</p><h3 id="_3-2-运行我们的应用程序" tabindex="-1"><a class="header-anchor" href="#_3-2-运行我们的应用程序"><span><strong>3.2 运行我们的应用程序</strong></span></a></h3><p>在本节的最后，如果我们运行我们的应用程序并向我们的直接消费者端点发送消息，我们应该会看到我们的问候文本在我们的输出目录中的一个文件里。如果我们没有指定文件名，Camel 将为我们创建一个：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ cat output/D97099B6B2958D2-0000000000000000
Hello Baeldung Readers!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-关于测试的说明" tabindex="-1"><a class="header-anchor" href="#_4-关于测试的说明"><span><strong>4. 关于测试的说明</strong></span></a></h2><p>通常，在编写清晰的测试时，我们不应该依赖我们可能无法控制或可能突然停止工作的外部服务或文件系统。这可能对我们的测试结果产生不利影响。</p><p>我们也不想为我们的单元测试特别编写代码。<strong>幸运的是，Camel 有一套专门用于测试的扩展和 API</strong>。所以我们可以将这看作是一种测试工具包。</p><p>这个工具包通过发送消息到路由并检查消息是否按预期接收，使测试我们的 Camel 应用程序变得更容易。</p><h2 id="_5-使用-mockendpoints-进行测试" tabindex="-1"><a class="header-anchor" href="#_5-使用-mockendpoints-进行测试"><span><strong>5. 使用 <em>@MockEndpoints</em> 进行测试</strong></span></a></h2><p>考虑到上一节的内容，让我们继续编写我们的第一个单元测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@SpringBootTest
@CamelSpringBootTest
@MockEndpoints(&quot;file:output&quot;)
class GreetingsFileRouterUnitTest {

    @Autowired
    private ProducerTemplate template;

    @EndpointInject(&quot;mock:file:output&quot;)
    private MockEndpoint mock;

    @Test
    void whenSendBody_thenGreetingReceivedSuccessfully() throws InterruptedException {
        mock.expectedBodiesReceived(&quot;Hello Baeldung Readers!&quot;);
        template.sendBody(&quot;direct:start&quot;, null);
        mock.assertIsSatisfied();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们浏览一下我们测试的关键部分。</p><p>首先，我们通过三个注解来装饰我们的测试类：</p><ul><li><em>@SpringBootTest</em> 注解将确保我们的测试引导 Spring 应用程序上下文</li><li>我们还使用 <em>@CamelSpringBootRunner,</em> 它为我们基于 Boot 的测试带来了基于 Spring 的 Camel 测试支持</li><li><strong>最后，我们添加 <em>@MockEndpoints</em> 注解，它告诉 Camel 我们想要为哪些端点制作模拟</strong></li></ul><p>接下来，我们自动装配一个 <em>ProducerTemplate</em> 对象，这是一个接口，允许我们向端点发送消息交换。</p><p>另一个关键组件是 <em>MockEndpoint</em>，我们使用 <em>@EndpointInject</em> 进行注入。<strong>使用这个注解告诉 Camel 当路由开始时，我们想要注入我们的模拟端点。</strong></p><p>现在我们已经准备好了所有的测试设置，我们可以编写我们的测试，它由三个步骤组成：</p><ul><li>首先，让我们设置一个期望，我们的模拟端点将接收给定的消息体</li><li>然后我们将使用我们的模板向 <em>direct:start</em> 端点发送消息。注意，我们将发送一个 <em>null</em> 消息体，因为我们的路由不操作传入的消息体</li><li>作为我们测试的结论，<strong>我们使用 <em>assertIsSatisfied</em> 方法来验证我们对模拟端点的初始期望是否已经满足</strong></li></ul><p>这证实了我们的测试工作正常。太棒了！我们现在有了一种使用 Camel 测试支持工具编写自包含、独立的单元测试的方法。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span><strong>6. 结论</strong></span></a></h2><p>在本文中，我们学习了如何在 Spring Boot 中测试我们的 Apache Camel 路由。首先，我们学习了如何使用 Spring Boot 创建一个带有一条路由的简单 Camel 应用程序。</p><p>然后学习了使用 Apache Camel 内置测试支持项目中可用的一些特性来测试我们的路由的推荐方法。</p><p>像往常一样，文章的完整源代码可以在 GitHub 上找到。抱歉，由于篇幅限制，翻译没有一次性完成。以下是剩余部分的翻译：</p><h2 id="_6-结论-1" tabindex="-1"><a class="header-anchor" href="#_6-结论-1"><span><strong>6. 结论</strong></span></a></h2><p>在本文中，我们学习了如何在 Spring Boot 中测试我们的 Apache Camel 路由。首先，我们学习了如何使用 Spring Boot 创建一个带有一条路由的简单 Camel 应用程序。</p><p>然后，我们学习了使用 Apache Camel 内置测试支持项目中的一些特性来测试我们的路由的推荐方法。</p><p>如往常一样，文章的完整源代码可以在 GitHub 上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/66d236ad2fbffe8cfd463ebd2b4a43c0?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,49),s=[l];function o(r,p){return n(),t("div",null,s)}const m=e(i,[["render",o],["__file","2024-07-20-Apache Camel Routes Testing in Spring Boot.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Apache%20Camel%20Routes%20Testing%20in%20Spring%20Boot.html","title":"Apache Camel 路由在 Spring Boot 中的测试","lang":"zh-CN","frontmatter":{"date":"2024-07-21T00:00:00.000Z","category":["Spring Boot","Apache Camel"],"tag":["集成测试","单元测试"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Apache Camel, 单元测试, 集成测试"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Apache%20Camel%20Routes%20Testing%20in%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Apache Camel 路由在 Spring Boot 中的测试"}],["meta",{"property":"og:description","content":"Apache Camel 路由在 Spring Boot 中的测试 Apache Camel 是一个强大的开源集成框架，实现了一些众所周知的企业集成模式。 在本教程中，我们将学习如何为我们的 Camel 路由编写可靠、自包含的单元测试。 首先，我们将创建一个使用 Spring Boot 的基本 Camel 应用程序。然后，我们将看看如何使用 Camel..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T17:13:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"集成测试"}],["meta",{"property":"article:tag","content":"单元测试"}],["meta",{"property":"article:published_time","content":"2024-07-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T17:13:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache Camel 路由在 Spring Boot 中的测试\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/66d236ad2fbffe8cfd463ebd2b4a43c0?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2024-07-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T17:13:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Apache Camel 路由在 Spring Boot 中的测试 Apache Camel 是一个强大的开源集成框架，实现了一些众所周知的企业集成模式。 在本教程中，我们将学习如何为我们的 Camel 路由编写可靠、自包含的单元测试。 首先，我们将创建一个使用 Spring Boot 的基本 Camel 应用程序。然后，我们将看看如何使用 Camel..."},"headers":[{"level":2,"title":"2. 依赖项","slug":"_2-依赖项","link":"#_2-依赖项","children":[]},{"level":2,"title":"3. 定义一个简单的 Camel Spring Boot 应用程序","slug":"_3-定义一个简单的-camel-spring-boot-应用程序","link":"#_3-定义一个简单的-camel-spring-boot-应用程序","children":[{"level":3,"title":"3.1 创建路由","slug":"_3-1-创建路由","link":"#_3-1-创建路由","children":[]},{"level":3,"title":"3.2 运行我们的应用程序","slug":"_3-2-运行我们的应用程序","link":"#_3-2-运行我们的应用程序","children":[]}]},{"level":2,"title":"4. 关于测试的说明","slug":"_4-关于测试的说明","link":"#_4-关于测试的说明","children":[]},{"level":2,"title":"5. 使用 @MockEndpoints 进行测试","slug":"_5-使用-mockendpoints-进行测试","link":"#_5-使用-mockendpoints-进行测试","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论-1","link":"#_6-结论-1","children":[]}],"git":{"createdTime":1721495603000,"updatedTime":1721495603000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.31,"words":1594},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Apache Camel Routes Testing in Spring Boot.md","localizedDate":"2024年7月21日","excerpt":"\\n<p>Apache Camel 是一个强大的开源集成框架，实现了一些众所周知的企业集成模式。</p>\\n<p>在本教程中，<strong>我们将学习如何为我们的 Camel 路由编写可靠、自包含的单元测试</strong>。</p>\\n<p>首先，我们将创建一个使用 Spring Boot 的基本 Camel 应用程序。然后，我们将看看如何使用 Camel 的 Spring 测试支持 API 和 JUnit 5 来测试我们的应用程序。</p>\\n<h2><strong>2. 依赖项</strong></h2>\\n<p>假设我们的项目已经设置并配置为与 Spring Boot 和 Camel 一起工作。</p>","autoDesc":true}');export{m as comp,g as data};
