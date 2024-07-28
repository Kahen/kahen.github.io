import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-D4B8YWfq.js";const t={},i=e(`<hr><h1 id="如何使用spring-boot和docker运行java应用程序" tabindex="-1"><a class="header-anchor" href="#如何使用spring-boot和docker运行java应用程序"><span>如何使用Spring Boot和Docker运行Java应用程序</span></a></h1><p>在本教程中，我们将探索使用Docker容器运行使用Spring Boot创建的标准Java应用程序的方法。更具体地说，我们将使用基于Alpaquita Linux的Liberica JDK来创建将运行我们应用程序的Docker镜像。</p><p>Liberica JDK和Alpaquita Linux是BellSoft的产品提供的一部分。BellSoft是一个致力于使Java成为云原生应用程序首选语言的组织。通过他们的目标性产品，他们承诺提供更低的成本和更好的体验。</p><h2 id="_2-一个简单的spring-boot应用程序" tabindex="-1"><a class="header-anchor" href="#_2-一个简单的spring-boot应用程序"><span>2. 一个简单的Spring Boot应用程序</span></a></h2><p>让我们从创建一个简单的Java应用程序开始，然后我们将对其进行容器化处理。我们将使用Spring Boot来创建这个应用程序。<strong>Spring Boot使得创建独立的、生产级别的基于Spring的应用程序变得容易</strong>，只需最少的配置。</p><p>初始化Spring Boot应用程序的最简单方式是使用Spring Boot CLI。它允许我们通过命令行使用start.spring.io来创建一个新项目：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ spring init <span class="token parameter variable">--build</span><span class="token operator">=</span>gradle <span class="token parameter variable">--dependencies</span><span class="token operator">=</span>web spring-bellsoft
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，我们添加了_web_作为依赖项，这使我们能够构建具有RESTful API的应用程序，并使用Apache Tomcat作为默认的嵌入式容器。我们在这里选择了Gradle作为构建工具。但是，它默认选择了Java作为语言和许多其他选项。</p><p>然后，<strong>我们可以将生成的项目导入我们喜欢的IDE</strong>，比如IntelliJ Idea，并开始开发应用程序。正如前面提到的，我们将保持这个非常简单。因此，我们将添加一个简单的REST API，它接受一个数字作为输入，并返回等于或小于该数字的斐波那契数列：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DemoController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/api/v1/fibs&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">getFibonacciSeriesBelowGivenInteger</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\` result<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>input <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
            result <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> n <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token keyword">int</span> m <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>m <span class="token operator">&lt;=</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span><span class="token punctuation">;</span>
                m <span class="token operator">=</span> n <span class="token operator">+</span> m<span class="token punctuation">;</span> n <span class="token operator">=</span> m <span class="token operator">-</span> n<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用之前生成的Gradle包装器构建应用程序非常简单：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>./gradlew clean build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>生成项目的默认打包格式是JAR</strong>，这意味着上述命令成功后，最终的可执行JAR文件将被创建在输出目录“<em>./build/libs</em>”中。我们可以使用这个JAR文件启动应用程序：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-jar</span> ./build/libs/spring-bellsoft-0.0.1-SNAPSHOT.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，我们可以调用我们的API并查看它是否正常工作：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> http://localhost:8080/api/v1/fibs?input<span class="token operator">=</span><span class="token number">5</span>
<span class="token punctuation">[</span><span class="token number">0,1</span>,1,2,3,5<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这结束了我们为教程其余部分创建简单应用程序的努力。我们将使用这个可部署的应用程序进行容器化。</p><h2 id="_3-容器化我们的应用程序" tabindex="-1"><a class="header-anchor" href="#_3-容器化我们的应用程序"><span>3. 容器化我们的应用程序</span></a></h2><p>容器是<strong>一种标准软件单元，它将代码及其所有依赖项打包在一起</strong>。它是一种操作系统虚拟化形式，提供了一种一致的方式来部署应用程序。如今，它已成为在云环境中运行任何应用程序的默认选择。</p><p>我们需要一个容器平台来将我们的简单应用程序作为容器运行。容器平台除了其他功能外，提供了一个容器引擎来创建和管理容器。Docker是最流行的平台，旨在构建、共享和运行容器应用程序。</p><p>容器引擎从容器镜像创建容器。<strong>容器镜像是一个不可变的静态文件，包含了容器运行所需的一切</strong>。然而，它共享了主机的操作系统内核。因此，它提供了完整的隔离，但仍然轻量级：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/09/Docker-Container-Stack.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>创建Docker镜像的一种方式是<strong>将创建镜像的配方描述为Dockerfile</strong>。然后，我们可以使用Docker守护进程从Dockerfile创建镜像。Docker的原始镜像格式现在已成为开放容器倡议（OCI）镜像规范。</p><p>将应用程序作为容器运行的一个关键优势是，它提供了跨多个环境的一致部署体验。例如，想象我们交付了一个使用Java 17构建的简单应用程序，但是在具有Java 11运行时的环境中部署。</p><p>为了避免这种意外，容器镜像<strong>允许我们为应用程序打包所有关键依赖项</strong>，如操作系统二进制/库和Java运行时。通过这样做，我们可以确保我们的应用程序将表现得一样，无论它被部署到哪个环境。</p><h2 id="_4-liberica运行时容器" tabindex="-1"><a class="header-anchor" href="#_4-liberica运行时容器"><span>4. Liberica运行时容器</span></a></h2><p>容器镜像由多层堆叠在一起组成。每一层都表示对文件系统的特定修改。通常，我们从最符合我们应用程序要求的基础镜像开始，并在其上构建其他层。</p><p><strong>BellSoft提供了几种高度优化的镜像，用于在基于云的环境中运行Java应用程序</strong>。它们是使用Alpaquita Linux和Liberica JDK构建的。在使用这些镜像之前，让我们检查一下BellSoft组件的好处。</p><h3 id="_4-1-alpaquita-linux的好处" tabindex="-1"><a class="header-anchor" href="#_4-1-alpaquita-linux的好处"><span>4.1. Alpaquita Linux的好处</span></a></h3><p>Alpaquita Linux是<strong>一个基于Alpine Linux的轻量级操作系统</strong>。它是为Java量身定制的，并针对云原生应用程序的部署进行了优化。它产生的基础镜像大小为3.22 MB，运行时需要的资源很少。</p><p>Alpaquita Linux有两个版本，一个基于优化的musl libc，另一个基于glibc。在这里，libc指的是ISO C标准中指定的C编程语言的标准库。它为多项任务提供宏、类型定义和函数。</p><p>除了针对Java应用程序进行优化外，Alpaquita Linux还<strong>为我们的部署提供了多种安全功能</strong>。这些包括网络功能、自定义构建选项和进程隔离。它还包括像内核锁定和内核模块签名这样的内核加固。</p><p>此外，Alpaquita Linux针对部署进行了优化，因为它使用内核模块压缩来减小包的大小。它提供了一个可靠和快速的堆栈来运行应用程序，具有像内核优化和内存管理这样的性能特性。</p><p>Alpaquita Linux<strong>只打包了少量的操作系统组件</strong>。然而，我们可以从Alpaquita APK仓库安装额外的模块和附加包。最重要的是，Alpaquita Linux的LTS版本有四年的支持生命周期。</p><h3 id="_4-2-liberica-jdk的好处" tabindex="-1"><a class="header-anchor" href="#_4-2-liberica-jdk的好处"><span>4.2. Liberica JDK的好处</span></a></h3><p>Liberica JDK是<strong>一个开源Java运行时，用于现代Java部署</strong>。它来自BellSoft，是OpenJDK的关键贡献者，并承诺为Java应用程序提供单一运行时，用于云、服务器和桌面使用。它也推荐用于基于Spring的Java应用程序。</p><p>Liberica JDK支持多种架构，如x86 64/32位、ARM、PowerPC和SPARC。它还支持多个操作系统，如Windows、macOS和大多数Linux发行版。此外，它支持几乎所有当前使用的Java版本。</p><p>Liberica JDK的一个关键优势是它非常轻量级。基于Alpaquita Linux的Java 17的Liberica运行时容器小于70 MB。它<strong>承诺在减少流量、存储、内存消耗和总成本的同时提供更好的性能</strong>。</p><p>它还具有多种工具，用于处理JDK运行时。有完整的工具访问权限，用于监控和更新。此外，用户还可以访问Liberica管理控制台（LAC），这是一个用于运行时监控、许可证控制和安全更新的企业工具。</p><p>Liberica JDK已经通过了Java SE规范的TCK验证，并在每个版本发布之前经过了彻底的测试。此外，BellSoft<strong>保证至少八年的Liberica JDK生命周期</strong>，包括错误修复、安全补丁和其他必要的改进。</p><h2 id="_5-创建容器镜像" tabindex="-1"><a class="header-anchor" href="#_5-创建容器镜像"><span>5. 创建容器镜像</span></a></h2><p>现在，我们已经准备好使用Alpaquita Linux和Liberica JDK来容器化我们的简单应用程序。第一步是选择一个带有这些依赖项的基础镜像。我们总是可以创建我们自己的基础镜像，但幸运的是，BellSoft在Docker Hub上维护了几个可供选择的镜像。</p><h3 id="_5-1-选择liberica运行时容器" tabindex="-1"><a class="header-anchor" href="#_5-1-选择liberica运行时容器"><span>5.1. 选择Liberica运行时容器</span></a></h3><p>这些是带有不同选项的Alpaquita Linux镜像，可以选择Liberica JDK Lite和Liberica JRE。我们通常可以从标签中识别这一点，其中可能包含以下之一：</p><ul><li>jdk：带有Liberica JDK Lite版本的Alpaquita Linux镜像</li><li>jdk-all：包含Liberica JDK，可以使用jlink工具创建自定义运行时</li><li>jre：仅包含运行Java应用程序所需的Liberica JRE</li></ul><p>在这里，<strong>镜像的标签除了包含它所包含的JDK版本信息之外，还揭示了镜像的其他信息</strong>。让我们看看BellSoft使用的镜像标签的约定：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>JDK type<span class="token punctuation">]</span>-Java version-<span class="token punctuation">[</span>slim<span class="token punctuation">]</span>-<span class="token punctuation">[</span>OS release<span class="token punctuation">]</span>-<span class="token punctuation">[</span>libc type<span class="token punctuation">]</span>-<span class="token punctuation">[</span>date<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，标签的不同部分告诉了镜像的特定方面，并帮助我们从许多可用的镜像中选择正确的一个：</p><ul><li>JDK类型：JDK的类型（如前所述的JDK、jdk-all和jre）</li><li>Java版本：JDK符合的Java版本</li><li>slim：表示镜像是否是精简版</li><li>OS版本：操作系统version: 目前它只是_stream_版本</li><li>libc类型：标准C库的类型（如前所述的glibc或musl）</li><li>date: 镜像的发布日期</li></ul><h3 id="_5-2-容器化我们的应用程序" tabindex="-1"><a class="header-anchor" href="#_5-2-容器化我们的应用程序"><span>5.2. 容器化我们的应用程序</span></a></h3><p>现在，我们已经拥有了镜像标签中的所有信息来选择正确的一个。例如，如果我们想要Java 17和glibc的应用程序，我们必须选择标签“<em>jdk-17-glibc</em>”。</p><p>一旦我们选择了正确的基础镜像标签，下一步是创建一个Dockerfile来定义我们如何创建应用程序的容器镜像：</p><div class="language-Dockerfile line-numbers-mode" data-ext="Dockerfile" data-title="Dockerfile"><pre class="language-Dockerfile"><code>FROM bellsoft/liberica-runtime-container:jdk-17-glibc
VOLUME /tmp
ARG JAR_FILE=build/libs/java-bellsoft-0.0.1-SNAPSHOT.jar
COPY \${JAR_FILE} app.jar
ENTRYPOINT [&quot;java&quot;, &quot;-jar&quot;, &quot;/app.jar&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个相当简单的Dockerfile说明我们希望<strong>从提到的Liberica运行时容器开始，并复制我们的应用程序胖JAR</strong>。我们还定义了入口点，指令是在容器实例化后运行我们的应用程序。</p><p>我们应该将这个Dockerfile放在应用程序代码库目录的根目录下。然后，我们可以使用以下命令在我们的本地仓库中创建容器镜像：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> buildx build <span class="token parameter variable">-t</span> spring-bellsoft <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将默认从注册表，Docker Hub中拉取基础镜像，并为我们的应用程序创建容器镜像。然后，我们可以将这个镜像作为容器运行：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--name</span> fibonacci <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 spring-bellsoft
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>请注意，我们已经将本地端口8080与容器端口8080映射。因此，我们可以像教程前面那样访问我们的应用程序：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> http://localhost:8080/api/v1/fibs?input<span class="token operator">=</span><span class="token number">5</span>
<span class="token punctuation">[</span><span class="token number">0,1</span>,1,2,3,5<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这结束了我们使用BellSoft发布的Liberica运行时容器容器化我们在教程中早些时候创建的简单应用程序的努力。当然，<strong>尝试更复杂的应用程序和其他Liberica运行时容器的变体</strong>将会很有趣。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本教程中，我们经历了为基于Spring Boot的简单Java应用程序创建容器的基础知识。我们探索了选择BellSoft Liberica运行时容器的选项。在这个过程中，我们创建了一个简单的应用程序并将其容器化。</p><p>这帮助我们理解了Alpaquita Linux和Liberica JDK的好处，它们是Liberica运行时容器的组成部分。这些是BellSoft的一些核心产品，致力于优化基于云环境的Java应用程序。</p><p><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2023/09/Docker-Container-Stack.jpg" alt="img" loading="lazy"></p><p>OK</p>`,67),p=[i];function l(o,c){return s(),n("div",null,p)}const d=a(t,[["render",l],["__file","2024-06-29-Spring Boot Application on Liberica Runtime Container.html.vue"]]),b=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Spring%20Boot%20Application%20on%20Liberica%20Runtime%20Container.html","title":"如何使用Spring Boot和Docker运行Java应用程序","lang":"zh-CN","frontmatter":{"date":"2023-09-26T00:00:00.000Z","category":["Spring Boot","Docker"],"tag":["Java","Liberica JDK","Alpaquita Linux"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Docker, Java, Liberica JDK, Alpaquita Linux"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Spring%20Boot%20Application%20on%20Liberica%20Runtime%20Container.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何使用Spring Boot和Docker运行Java应用程序"}],["meta",{"property":"og:description","content":"如何使用Spring Boot和Docker运行Java应用程序 在本教程中，我们将探索使用Docker容器运行使用Spring Boot创建的标准Java应用程序的方法。更具体地说，我们将使用基于Alpaquita Linux的Liberica JDK来创建将运行我们应用程序的Docker镜像。 Liberica JDK和Alpaquita Linu..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/09/Docker-Container-Stack.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T23:29:48.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Liberica JDK"}],["meta",{"property":"article:tag","content":"Alpaquita Linux"}],["meta",{"property":"article:published_time","content":"2023-09-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T23:29:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何使用Spring Boot和Docker运行Java应用程序\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/09/Docker-Container-Stack.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/09/Docker-Container-Stack.jpg\\"],\\"datePublished\\":\\"2023-09-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T23:29:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何使用Spring Boot和Docker运行Java应用程序 在本教程中，我们将探索使用Docker容器运行使用Spring Boot创建的标准Java应用程序的方法。更具体地说，我们将使用基于Alpaquita Linux的Liberica JDK来创建将运行我们应用程序的Docker镜像。 Liberica JDK和Alpaquita Linu..."},"headers":[{"level":2,"title":"2. 一个简单的Spring Boot应用程序","slug":"_2-一个简单的spring-boot应用程序","link":"#_2-一个简单的spring-boot应用程序","children":[]},{"level":2,"title":"3. 容器化我们的应用程序","slug":"_3-容器化我们的应用程序","link":"#_3-容器化我们的应用程序","children":[]},{"level":2,"title":"4. Liberica运行时容器","slug":"_4-liberica运行时容器","link":"#_4-liberica运行时容器","children":[{"level":3,"title":"4.1. Alpaquita Linux的好处","slug":"_4-1-alpaquita-linux的好处","link":"#_4-1-alpaquita-linux的好处","children":[]},{"level":3,"title":"4.2. Liberica JDK的好处","slug":"_4-2-liberica-jdk的好处","link":"#_4-2-liberica-jdk的好处","children":[]}]},{"level":2,"title":"5. 创建容器镜像","slug":"_5-创建容器镜像","link":"#_5-创建容器镜像","children":[{"level":3,"title":"5.1. 选择Liberica运行时容器","slug":"_5-1-选择liberica运行时容器","link":"#_5-1-选择liberica运行时容器","children":[]},{"level":3,"title":"5.2. 容器化我们的应用程序","slug":"_5-2-容器化我们的应用程序","link":"#_5-2-容器化我们的应用程序","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719703788000,"updatedTime":1719703788000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":9.9,"words":2971},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Spring Boot Application on Liberica Runtime Container.md","localizedDate":"2023年9月26日","excerpt":"<hr>\\n<h1>如何使用Spring Boot和Docker运行Java应用程序</h1>\\n<p>在本教程中，我们将探索使用Docker容器运行使用Spring Boot创建的标准Java应用程序的方法。更具体地说，我们将使用基于Alpaquita Linux的Liberica JDK来创建将运行我们应用程序的Docker镜像。</p>\\n<p>Liberica JDK和Alpaquita Linux是BellSoft的产品提供的一部分。BellSoft是一个致力于使Java成为云原生应用程序首选语言的组织。通过他们的目标性产品，他们承诺提供更低的成本和更好的体验。</p>\\n<h2>2. 一个简单的Spring Boot应用程序</h2>","autoDesc":true}');export{d as comp,b as data};
