import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a}from"./app-B6f8H54y.js";const i={},r=a(`<hr><h1 id="在spring-6中使用虚拟线程" tabindex="-1"><a class="header-anchor" href="#在spring-6中使用虚拟线程"><span>在Spring 6中使用虚拟线程</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本简短的教程中，我们将看到如何在Spring Boot应用程序中利用虚拟线程的强大功能。</p><p>由Project Loom引入，并作为Java 19的预览功能提供，虚拟线程现在是官方JDK 21发布的一部分。此外，Spring 6发布集成了这一令人敬畏的功能，并允许开发人员尝试使用它。</p><p>首先，我们将看到“平台线程”和“虚拟线程”之间的主要区别。接下来，我们将使用虚拟线程从头开始构建一个Spring Boot应用程序。最后，我们将创建一个小型测试套件，以查看简单Web应用程序的吞吐量是否有所提高。</p><h2 id="_2-虚拟线程与平台线程" tabindex="-1"><a class="header-anchor" href="#_2-虚拟线程与平台线程"><span>2. 虚拟线程与平台线程</span></a></h2><p>主要的区别在于虚拟线程在其操作周期内不依赖于操作系统线程。<strong>虚拟线程与硬件解耦</strong>，因此称为“虚拟”。此外，JVM提供的抽象层授予了这种解耦。</p><p>在本教程中，我们想要验证虚拟线程的操作成本远低于平台线程。我们想要确认，创建数百万虚拟线程而不会遇到内存不足错误是可能的——这是平台线程倾向于遇到的问题。</p><p>首先，我们需要根据我们的环境配置我们的应用程序。</p><h3 id="_3-1-在spring-boot-3-2和java-21中使用虚拟线程" tabindex="-1"><a class="header-anchor" href="#_3-1-在spring-boot-3-2和java-21中使用虚拟线程"><span>3.1. 在Spring Boot 3.2和Java 21中使用虚拟线程</span></a></h3><p>从Spring Boot 3.2开始，如果我们使用Java 21，启用虚拟线程非常容易。我们将_spring.threads.virtual.enabled_属性设置为_true_，我们就可以开始了：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.threads.virtual.enabled=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>理论上，我们不需要做其他任何事情。然而，<strong>从普通线程切换到虚拟线程可能会给遗留应用程序带来不可预见的后果</strong>。因此，我们必须彻底测试我们的应用程序。</p><h3 id="_3-2-在spring-framework-6和java-19中使用虚拟线程" tabindex="-1"><a class="header-anchor" href="#_3-2-在spring-framework-6和java-19中使用虚拟线程"><span>3.2. 在Spring Framework 6和Java 19中使用虚拟线程</span></a></h3><p>然而，如果我们不能使用最新版本的Java，但正在使用Spring Framework 6，虚拟线程功能仍然可用。我们需要一些额外的配置来启用Java 19的预览功能。这意味着我们需要告诉JVM我们希望在我们的应用程序中启用它们。由于我们使用Maven构建我们的应用程序，让我们确保在_pom.xml_中包含以下代码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;build&gt;\`
    \`&lt;plugins&gt;\`
        \`&lt;plugin&gt;\`
            \`&lt;groupId&gt;\`org.apache.maven.plugins\`&lt;/groupId&gt;\`
            \`&lt;artifactId&gt;\`maven-compiler-plugin\`&lt;/artifactId&gt;\`
            \`&lt;configuration&gt;\`
                \`&lt;source&gt;\`19\`&lt;/source&gt;\`
                \`&lt;target&gt;\`19\`&lt;/target&gt;\`
                \`&lt;compilerArgs&gt;\`
                    --enable-preview
                \`&lt;/compilerArgs&gt;\`
            \`&lt;/configuration&gt;\`
        \`&lt;/plugin&gt;\`
    \`&lt;/plugins&gt;\`
\`&lt;/build&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从Java的角度来看，要使用Apache Tomcat和虚拟线程，我们需要一个简单的配置类和几个bean：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@EnableAsync
@Configuration
@ConditionalOnProperty(
  value = &quot;spring.thread-executor&quot;,
  havingValue = &quot;virtual&quot;
)
public class ThreadConfig {
    @Bean
    public AsyncTaskExecutor applicationTaskExecutor() {
        return new TaskExecutorAdapter(Executors.newVirtualThreadPerTaskExecutor());
    }

    @Bean
    public TomcatProtocolHandlerCustomizer\`&lt;?&gt;\` protocolHandlerVirtualThreadExecutorCustomizer() {
        return protocolHandler -&gt; {
            protocolHandler.setExecutor(Executors.newVirtualThreadPerTaskExecutor());
        };
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个Spring Bean，《ApplicationTaskExecutor》，替换了标准的《ApplicationTaskExecutor》。简而言之，我们想要覆盖默认的_Executor_，以便它为每个任务启动一个新的虚拟线程。第二个bean，命名为_ProtocolHandlerVirtualThreadExecutorCustomizer_，以相同的方式自定义标准的_TomcatProtocolHandler_。</p><p>此外，我们添加了_@ConditionalOnProperty_注解，以便我们可以使用_application.yaml_文件中的属性启用或禁用虚拟线程：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring:
    thread-executor: virtual
    //...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以验证我们是否正在运行虚拟线程。</p><h3 id="_3-3-验证虚拟线程正在运行" tabindex="-1"><a class="header-anchor" href="#_3-3-验证虚拟线程正在运行"><span>3.3. 验证虚拟线程正在运行</span></a></h3><p>让我们测试Spring Boot应用程序是否使用虚拟线程来处理Web请求调用。为此，我们需要构建一个简单的控制器，返回所需的信息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@RestController
@RequestMapping(&quot;/thread&quot;)
public class ThreadController {
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    @GetMapping(&quot;/name&quot;)
    public String getThreadName() {
        return Thread.currentThread().toString();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_Thread_对象的_toString()_方法返回了我们所需的所有信息：线程ID、线程名称、线程组和优先级。让我们用_curl_请求击中这个端点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ curl -s http://localhost:8080/thread/name
$ VirtualThread[#171]/runnable@ForkJoinPool-1-worker-4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，响应明确表示我们正在使用虚拟线程来处理这个Web请求。换句话说，_Thread.currentThread()_调用返回了一个_VirtualThread_类的实例。现在让我们看看虚拟线程在简单但有效的负载测试中的有效性。</p><h2 id="_4-性能比较" tabindex="-1"><a class="header-anchor" href="#_4-性能比较"><span><strong>4</strong> <strong>. 性能比较</strong></span></a></h2><p>为了比较性能，我们将使用JMeter运行负载测试。值得注意的是，这不会是一个完整的性能比较，而是我们可以从中构建具有不同参数的更多测试的起点。</p><p>在这种特定情况下，我们将调用一个_RestController_中的端点，该端点简单地将执行睡眠一秒钟，模拟一个复杂的异步任务：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@RestController
@RequestMapping(&quot;/load&quot;)
public class LoadTestController {

    private static final Logger LOG = LoggerFactory.getLogger(LoadTestController.class);

    @GetMapping
    public void doSomething() throws InterruptedException {
        LOG.info(&quot;hey, I&#39;m doing something&quot;);
        Thread.sleep(1000);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用_@ConditionalOnProperty_注解，我们可以在虚拟线程和标准线程之间切换。</p><p>JMeter测试只包含一个线程组，模拟_1000_并发用户在_100_秒内击中_/load_端点：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/04/Screenshot-2023-04-23-at-20.30.30-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>采用这个新功能的性能提升在这种情况下是明显的。让我们比较不同实现的“<em>响应时间图</em>”。这是标准线程的响应图。正如我们所看到的，完成调用所需的时间很快就会达到5000毫秒：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/04/Screenshot-2023-04-23-at-20.35.43-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这是因为平台线程是一种有限的资源。当所有计划和池化的线程都忙时，Spring应用程序只能持有请求，直到一个线程空闲。</p><p>让我们看看使用虚拟线程会发生什么：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/04/Screenshot-2023-04-23-at-20.42.40-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>结果图显示响应在1000毫秒处稳定下来。因此，虚拟线程被创建并立即使用请求，因为它们从资源角度来看非常便宜。在这种情况下，我们比较的是Spring默认的固定标准线程池的使用（默认大小为200）和Spring默认的无界虚拟线程池。</p><p>这种性能提升只有在像我们的玩具应用程序这样的简单场景中才有可能。事实上，对于CPU密集型操作，虚拟线程并不适合，因为这些任务需要最小的阻塞。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span><strong>5</strong>. 结论</span></a></h2><p>在本文中，我们学习了如何在基于Spring 6的应用程序中使用虚拟线程。首先，我们看到了如何根据应用程序使用的JDK启用虚拟线程。其次，我们创建了一个REST控制器来返回线程名称。最后，我们使用JMeter确认虚拟线程使用的资源比标准线程少。我们还看到了这如何简化处理更多请求。</p><p>像往常一样，代码可以在GitHub上找到。 <img src="https://www.baeldung.com/wp-content/uploads/2023/04/Screenshot-2023-04-23-at-20.30.30-1.png" alt="img" loading="lazy"></p>`,47),l=[r];function s(d,o){return t(),n("div",null,l)}const u=e(i,[["render",s],["__file","2024-07-06-Working with Virtual Threads in Spring 6.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Working%20with%20Virtual%20Threads%20in%20Spring%206.html","title":"在Spring 6中使用虚拟线程","lang":"zh-CN","frontmatter":{"date":"2023-04-23T00:00:00.000Z","category":["Spring","Java"],"tag":["Virtual Threads","Spring Boot","Java 19"],"head":[["meta",{"name":"keywords","content":"Spring 6, Virtual Threads, Java 19, Project Loom, Spring Boot, Java 21, Performance"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Working%20with%20Virtual%20Threads%20in%20Spring%206.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Spring 6中使用虚拟线程"}],["meta",{"property":"og:description","content":"在Spring 6中使用虚拟线程 1. 引言 在本简短的教程中，我们将看到如何在Spring Boot应用程序中利用虚拟线程的强大功能。 由Project Loom引入，并作为Java 19的预览功能提供，虚拟线程现在是官方JDK 21发布的一部分。此外，Spring 6发布集成了这一令人敬畏的功能，并允许开发人员尝试使用它。 首先，我们将看到“平台线..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/04/Screenshot-2023-04-23-at-20.30.30-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T13:58:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Virtual Threads"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Java 19"}],["meta",{"property":"article:published_time","content":"2023-04-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T13:58:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Spring 6中使用虚拟线程\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/04/Screenshot-2023-04-23-at-20.30.30-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/04/Screenshot-2023-04-23-at-20.35.43-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/04/Screenshot-2023-04-23-at-20.42.40-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/04/Screenshot-2023-04-23-at-20.30.30-1.png\\"],\\"datePublished\\":\\"2023-04-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T13:58:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Spring 6中使用虚拟线程 1. 引言 在本简短的教程中，我们将看到如何在Spring Boot应用程序中利用虚拟线程的强大功能。 由Project Loom引入，并作为Java 19的预览功能提供，虚拟线程现在是官方JDK 21发布的一部分。此外，Spring 6发布集成了这一令人敬畏的功能，并允许开发人员尝试使用它。 首先，我们将看到“平台线..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 虚拟线程与平台线程","slug":"_2-虚拟线程与平台线程","link":"#_2-虚拟线程与平台线程","children":[{"level":3,"title":"3.1. 在Spring Boot 3.2和Java 21中使用虚拟线程","slug":"_3-1-在spring-boot-3-2和java-21中使用虚拟线程","link":"#_3-1-在spring-boot-3-2和java-21中使用虚拟线程","children":[]},{"level":3,"title":"3.2. 在Spring Framework 6和Java 19中使用虚拟线程","slug":"_3-2-在spring-framework-6和java-19中使用虚拟线程","link":"#_3-2-在spring-framework-6和java-19中使用虚拟线程","children":[]},{"level":3,"title":"3.3. 验证虚拟线程正在运行","slug":"_3-3-验证虚拟线程正在运行","link":"#_3-3-验证虚拟线程正在运行","children":[]}]},{"level":2,"title":"4 . 性能比较","slug":"_4-性能比较","link":"#_4-性能比较","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720274303000,"updatedTime":1720274303000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.72,"words":1717},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Working with Virtual Threads in Spring 6.md","localizedDate":"2023年4月23日","excerpt":"<hr>\\n<h1>在Spring 6中使用虚拟线程</h1>\\n<h2>1. 引言</h2>\\n<p>在本简短的教程中，我们将看到如何在Spring Boot应用程序中利用虚拟线程的强大功能。</p>\\n<p>由Project Loom引入，并作为Java 19的预览功能提供，虚拟线程现在是官方JDK 21发布的一部分。此外，Spring 6发布集成了这一令人敬畏的功能，并允许开发人员尝试使用它。</p>\\n<p>首先，我们将看到“平台线程”和“虚拟线程”之间的主要区别。接下来，我们将使用虚拟线程从头开始构建一个Spring Boot应用程序。最后，我们将创建一个小型测试套件，以查看简单Web应用程序的吞吐量是否有所提高。</p>","autoDesc":true}');export{u as comp,g as data};
