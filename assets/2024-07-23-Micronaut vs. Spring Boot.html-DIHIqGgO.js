import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a as i}from"./app-B72DhG69.js";const r={},a=i(`<h1 id="micronaut与spring-boot的比较" tabindex="-1"><a class="header-anchor" href="#micronaut与spring-boot的比较"><span>Micronaut与Spring Boot的比较</span></a></h1><p>在本教程中，我们将比较Micronaut和Spring Boot。Spring Boot是流行的Spring框架的一部分，用于快速启动Spring应用程序。Micronaut是一个基于JVM的框架，旨在解决Spring/Spring Boot的一些弱点。</p><p>我们将在几个领域比较这两个框架。首先，我们将比较创建新应用程序的便捷性、语言支持和其他配置选项。然后，我们将查看两个简单的REST应用程序。最后，我们将比较代码并测量性能差异。</p><h3 id="_2-功能" tabindex="-1"><a class="header-anchor" href="#_2-功能"><span>2. 功能</span></a></h3><p>在以下部分中，我们将分解两个框架中的几个功能。</p><h4 id="_2-1-设置" tabindex="-1"><a class="header-anchor" href="#_2-1-设置"><span>2.1. 设置</span></a></h4><p>首先，我们将比较在这两个框架中启动新应用程序的便捷性。</p><p>Micronaut和Spring Boot都提供了多种便捷的方法来创建新应用程序。例如，我们可以使用命令行界面使用任一框架创建新应用程序。或者，我们可以使用Spring Boot的Spring Initializr或Micronaut的类似工具Launch。</p><p>在IDE支持方面，我们可以为大多数流行的IDE使用Spring Boot插件，包括Eclipse Spring Tools Suite。如果我们使用IntelliJ，我们可以使用Micronaut插件。</p><h4 id="_2-2-语言支持" tabindex="-1"><a class="header-anchor" href="#_2-2-语言支持"><span>2.2. 语言支持</span></a></h4><p>当我们转向语言支持时，我们将发现Spring Boot和Micronaut几乎相同。对于两个框架，我们可以选择Java、Groovy或Kotlin。如果我们选择Java，两个框架都支持Java 8、11和17。此外，我们可以使用Gradle或Maven与两个框架。</p><h4 id="_2-3-servlet容器" tabindex="-1"><a class="header-anchor" href="#_2-3-servlet容器"><span>2.3. Servlet容器</span></a></h4><p>使用Spring Boot，我们的应用程序将默认使用Tomcat。但是，我们可以配置Spring Boot使用Jetty或Undertow。</p><p>我们的Micronaut应用程序默认将在基于Netty的HTTP服务器上运行。但是，我们可以选择将应用程序切换到Tomcat、Jetty或Undertow上运行。</p><h4 id="_2-4-属性配置" tabindex="-1"><a class="header-anchor" href="#_2-4-属性配置"><span>2.4. 属性配置</span></a></h4><p>对于Spring Boot，我们可以在_application.properties_或_application.yml_中定义我们的属性。我们可以使用_application-{env}.properties_约定为不同的环境提供不同的属性。此外，我们可以使用系统属性、环境变量或JNDI属性覆盖这些应用程序文件提供的属性。</p><p>在Micronaut中，我们可以使用_application.properties_、_application.yml_和_application.json_作为我们的属性文件。我们也可以为提供特定环境的属性文件使用相同的约定。如果我们需要覆盖任何属性，我们可以使用系统属性或环境变量。</p><h4 id="_2-5-消息支持" tabindex="-1"><a class="header-anchor" href="#_2-5-消息支持"><span>2.5. 消息支持</span></a></h4><p>如果我们使用Spring Boot进行消息传递，我们可以选择Active MQ、Artemis、Rabbit MQ和Apache Kafka。</p><p>在Micronaut方面，我们有Apache Kafka、Rabbit MQ和Nats.io作为选项。</p><h4 id="_2-6-安全性" tabindex="-1"><a class="header-anchor" href="#_2-6-安全性"><span>2.6. 安全性</span></a></h4><p>Spring Boot提供了五种授权策略：基本、表单登录、JWT、SAML和LDAP。如果我们使用Micronaut，我们有相同的选项，除了SAML。</p><p>两个框架都为我们提供了OAuth2支持。</p><p>在实际应用安全性方面，两个框架都允许我们使用注解来保护方法。</p><h4 id="_2-7-管理和监控" tabindex="-1"><a class="header-anchor" href="#_2-7-管理和监控"><span>2.7. 管理和监控</span></a></h4><p>两个框架都提供了在我们的应用程序中监控各种指标和统计信息的能力。我们可以在两个框架中定义自定义端点。我们也可以配置端点安全。</p><p>然而，Spring Boot的actuator比Micronaut提供了更多的内置端点。</p><h4 id="_2-8-模板语言" tabindex="-1"><a class="header-anchor" href="#_2-8-模板语言"><span>2.8. 模板语言</span></a></h4><p>我们可以使用两个框架提供的模板语言来创建完整的全栈应用程序，以呈现前端。</p><p>对于Spring Boot，我们的选择是Thymeleaf、Apache Freemarker、Mustache和Groovy。我们也可以使用方法不鼓励的JSP。</p><p>在Micronaut中，我们有更多的选项：Thymeleaf、Handlebars、Apache Velocity、Apache Freemarker、Rocker、Soy/Closure和Pebbles。</p><h4 id="_2-9-云支持" tabindex="-1"><a class="header-anchor" href="#_2-9-云支持"><span>2.9. 云支持</span></a></h4><p>Spring Boot应用程序依赖第三方库来实现许多云特定功能。</p><p>Micronaut是为云微服务本地设计的。Micronaut将本地处理的云概念包括分布式配置、服务发现、客户端负载均衡、分布式跟踪和无服务器功能。</p><h3 id="_3-代码" tabindex="-1"><a class="header-anchor" href="#_3-代码"><span>3. 代码</span></a></h3><p>现在我们已经比较了两个框架的一些基本功能，让我们创建并比较两个应用程序。为了保持简单，我们将创建一个简单的REST API来解决基本的算术问题。我们的服务层将由一个实际为我们做数学运算的类组成。我们的控制器类将包含一个用于加法、减法、乘法和除法的端点。</p><p>在我们深入代码之前，让我们考虑Spring Boot和Micronaut之间的一个显著差异。尽管两个框架都提供依赖注入，但它们的实现方式不同。我们的Spring Boot应用程序使用反射和代理在运行时处理依赖注入。相比之下，我们的Micronaut应用程序在编译时构建依赖注入数据。</p><h4 id="_3-1-spring-boot应用程序" tabindex="-1"><a class="header-anchor" href="#_3-1-spring-boot应用程序"><span>3.1. Spring Boot应用程序</span></a></h4><p>首先，让我们在我们的Spring Boot应用程序中定义一个名为_ArithmeticService_的类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Service
public class ArithmeticService {
    public float add(float number1, float number2) {
        return number1 + number2;
    }

    public float subtract(float number1, float number2) {
        return number1 - number2;
    }

    public float multiply(float number1, float number2) {
        return number1 * number2;
    }

    public float divide(float number1, float number2) {
        if (number2 == 0) {
            throw new IllegalArgumentException(&quot;&#39;number2&#39;不能为零&quot;);
        }
        return number1 / number2;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们创建我们的REST控制器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@RestController
@RequestMapping(&quot;math&quot;)
public class ArithmeticController {
    @Autowired
    private ArithmeticService arithmeticService;

    @GetMapping(&quot;/sum/{number1}/{number2}&quot;)
    public float getSum(@PathVariable(&quot;number1&quot;) float number1, @PathVariable(&quot;number2&quot;) float number2) {
        return arithmeticService.add(number1, number2);
    }

    @GetMapping(&quot;/subtract/{number1}/{number2}&quot;)
    public float getDifference(@PathVariable(&quot;number1&quot;) float number1, @PathVariable(&quot;number2&quot;) float number2) {
        return arithmeticService.subtract(number1, number2);
    }

    @GetMapping(&quot;/multiply/{number1}/{number2}&quot;)
    public float getMultiplication(@PathVariable(&quot;number1&quot;) float number1, @PathVariable(&quot;number2&quot;) float number2) {
        return arithmeticService.multiply(number1, number2);
    }

    @GetMapping(&quot;/divide/{number1}/{number2}&quot;)
    public float getDivision(@PathVariable(&quot;number1&quot;) float number1, @PathVariable(&quot;number2&quot;) float number2) {
        return arithmeticService.divide(number1, number2);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的控制器为四个算术函数中的每一个都有一个端点。</p><h4 id="_3-2-micronaut应用程序" tabindex="-1"><a class="header-anchor" href="#_3-2-micronaut应用程序"><span>3.2. Micronaut应用程序</span></a></h4><p>现在，让我们创建Micronaut应用程序的服务层：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Singleton
public class ArithmeticService {
    // 实现与Spring Boot服务层相同
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将编写具有与Spring Boot应用程序相同的四个端点的REST控制器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Controller(&quot;math&quot;)
public class ArithmeticController {
    @Inject
    private ArithmeticService arithmeticService;

    @Get(&quot;/sum/{number1}/{number2}&quot;)
    public float getSum(float number1, float number2) {
        return arithmeticService.add(number1, number2);
    }

    @Get(&quot;/subtract/{number1}/{number2}&quot;)
    public float getDifference(float number1, float number2) {
        return arithmeticService.subtract(number1, number2);
    }

    @Get(&quot;/multiply/{number1}/{number2}&quot;)
    public float getMultiplication(float number1, float number2) {
        return arithmeticService.multiply(number1, number2);
    }

    @Get(&quot;/divide/{number1}/{number2}&quot;)
    public float getDivision(float number1, float number2) {
        return arithmeticService.divide(number1, number2);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到，我们非常简单的示例应用程序之间有很多相似之处。在差异方面，我们看到Micronaut利用了Java的注解进行注入，而Spring Boot有自己的注解。此外，我们的Micronaut REST端点不需要对传递到方法中的路径变量进行任何特殊注解。</p><h4 id="_3-3-基本性能比较" tabindex="-1"><a class="header-anchor" href="#_3-3-基本性能比较"><span>3.3. 基本性能比较</span></a></h4><p>Micronaut宣传快速启动时间，让我们比较一下我们的两个应用程序。</p><p>首先，让我们启动Spring Boot应用程序，看看它需要多长时间：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[main] INFO c.b.m.v.s.CompareApplication - Started CompareApplication in 3.179 seconds (JVM running for 4.164)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们看看我们的Micronaut应用程序启动有多快：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>21:22:49.267 [main] INFO io.micronaut.runtime.Micronaut - Startup completed in 1278ms. Server Running: http://localhost:57535
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以看到，我们的Spring Boot应用程序启动时间略超过三秒，而Micronaut在一秒多一点。现在我们已经看了启动时间，让我们稍微测试一下我们的API，然后检查一些基本的内存统计。我们将在启动应用程序时使用默认的内存设置。</p><p>我们将从Spring Boot应用程序开始。首先，让我们调用四个算术端点中的每一个，然后拉取我们的内存端点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Initial: 0.25GB
Used: 0.02 GB
Max: 4.00 GB
Committed: 0.06 GB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们用同样的练习运行我们的Micronaut应用程序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Initial: 0.25 GB
Used: 0.01 GB
Max: 4.00 GB
Committed: 0.03 GB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个有限的例子中，两个应用程序都使用了很少的内存，但Micronaut使用的内存大约是Spring Boot应用程序的一半。</p><h2 id="_4-比较" tabindex="-1"><a class="header-anchor" href="#_4-比较"><span>4. 比较</span></a></h2><p>没有单一的“最佳”框架适用于所有应用程序。最佳选择将取决于应用程序的具体要求和开发人员的偏好。</p><p>然而，以下表格可以提供一些可能有助于做出决策的信息：</p><table><thead><tr><th>功能</th><th>Micronaut</th><th>Spring Boot</th></tr></thead><tbody><tr><td><strong>大小</strong></td><td>更小的JAR文件</td><td>更大的JAR文件</td></tr><tr><td><strong>Actuator</strong></td><td>不支持</td><td>是，提供健康检查、指标等</td></tr><tr><td><strong>构建时间</strong></td><td>更快</td><td>更慢</td></tr><tr><td><strong>启动时间</strong></td><td>更快的构建时间</td><td>更慢的构建时间</td></tr><tr><td><strong>性能</strong></td><td>比Spring Boot好得多</td><td>一般</td></tr><tr><td><strong>原生镜像</strong></td><td>是</td><td>没有默认支持</td></tr><tr><td><strong>自动配置</strong></td><td>较少</td><td>更多</td></tr><tr><td><strong>启动依赖</strong></td><td>更少的启动依赖</td><td>更多的启动依赖</td></tr><tr><td><strong>依赖注入</strong></td><td>注解基础</td><td>属性基础</td></tr><tr><td><strong>社区</strong></td><td>更小的社区</td><td>更大的社区</td></tr><tr><td><strong>文档</strong></td><td>良好的文档</td><td>优秀的文档</td></tr></tbody></table><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们比较了Spring Boot和Micronaut。首先，我们从两个框架的概述开始。然后，我们比较了几个功能和选项。最后，我们将两个简单的示例应用程序进行了对比。我们查看了两个应用程序的代码，然后查看了启动和内存性能。</p><p>如常，示例代码在GitHub上对Spring Boot和Micronaut应用程序都可用。</p><p>OK</p>`,69),d=[a];function o(l,s){return t(),n("div",null,d)}const p=e(r,[["render",o],["__file","2024-07-23-Micronaut vs. Spring Boot.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-23/2024-07-23-Micronaut%20vs.%20Spring%20Boot.html","title":"Micronaut与Spring Boot的比较","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Micronaut","Spring Boot"],"tag":["Java","Framework"],"head":[["meta",{"name":"keywords","content":"Micronaut, Spring Boot, Java, Framework, Comparison"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-23/2024-07-23-Micronaut%20vs.%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Micronaut与Spring Boot的比较"}],["meta",{"property":"og:description","content":"Micronaut与Spring Boot的比较 在本教程中，我们将比较Micronaut和Spring Boot。Spring Boot是流行的Spring框架的一部分，用于快速启动Spring应用程序。Micronaut是一个基于JVM的框架，旨在解决Spring/Spring Boot的一些弱点。 我们将在几个领域比较这两个框架。首先，我们将比较..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T10:18:07.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Framework"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T10:18:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Micronaut与Spring Boot的比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-23T10:18:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Micronaut与Spring Boot的比较 在本教程中，我们将比较Micronaut和Spring Boot。Spring Boot是流行的Spring框架的一部分，用于快速启动Spring应用程序。Micronaut是一个基于JVM的框架，旨在解决Spring/Spring Boot的一些弱点。 我们将在几个领域比较这两个框架。首先，我们将比较..."},"headers":[{"level":3,"title":"2. 功能","slug":"_2-功能","link":"#_2-功能","children":[]},{"level":3,"title":"3. 代码","slug":"_3-代码","link":"#_3-代码","children":[]},{"level":2,"title":"4. 比较","slug":"_4-比较","link":"#_4-比较","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721729887000,"updatedTime":1721729887000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.81,"words":2344},"filePathRelative":"posts/baeldung/2024-07-23/2024-07-23-Micronaut vs. Spring Boot.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将比较Micronaut和Spring Boot。Spring Boot是流行的Spring框架的一部分，用于快速启动Spring应用程序。Micronaut是一个基于JVM的框架，旨在解决Spring/Spring Boot的一些弱点。</p>\\n<p>我们将在几个领域比较这两个框架。首先，我们将比较创建新应用程序的便捷性、语言支持和其他配置选项。然后，我们将查看两个简单的REST应用程序。最后，我们将比较代码并测量性能差异。</p>\\n<h3>2. 功能</h3>\\n<p>在以下部分中，我们将分解两个框架中的几个功能。</p>\\n<h4>2.1. 设置</h4>\\n<p>首先，我们将比较在这两个框架中启动新应用程序的便捷性。</p>","autoDesc":true}');export{p as comp,m as data};
