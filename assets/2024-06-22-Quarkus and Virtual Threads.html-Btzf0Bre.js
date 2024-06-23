import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-DcMfr-lX.js";const e={},p=t('<h1 id="quarkus和虚拟线程" tabindex="-1"><a class="header-anchor" href="#quarkus和虚拟线程"><span>Quarkus和虚拟线程</span></a></h1><p>在Java开发领域不断发展的今天，Java 21引入了一个革命性的特性——虚拟线程。这些由Java虚拟机(JVM)管理的轻量级线程，承诺将重塑开发者在Java应用程序中处理并发的方式。长期以来，并发应用程序的开发一直充满挑战，管理传统的操作系统(OS)管理线程时常常遇到复杂性。</p><p>Quarkus框架的核心是一个现代的、以开发者为中心的工具包，专为云原生时代设计。它拥有极快的启动时间和低内存消耗，同时为开发者提供了一套广泛的工具，用于构建微服务和云原生应用程序。</p><p>在本教程中，我们将探索Quarkus如何利用Java的虚拟线程，转变Java应用程序中并发的管理方式。</p><p>Java在管理线程方面的旅程自其诞生以来历了重大转变。最初，Java使用绿色线程——由JVM管理的用户级线程——在不依赖本地操作系统能力的情况下模拟多线程。然而，这种方法寿命很短，后来的Java版本发展为集成了OS管理的线程。</p><p>依赖于OS管理线程的传统Java线程模型带来了几个挑战。命令式和响应式模型统治了开发景观，每种模型都有其优势和局限性。命令式模型在其方法上简单直接，但由于OS线程的限制，在可扩展性方面面临限制。相比之下，响应式模型虽然高效，但要求在编码模式上进行范式转变，对开发者来说既复杂又有时不够直观。</p><p>Java 21引入的虚拟线程标志着并发处理的范式转。由JVM管理的虚拟线程提供了传统OS管理线程的有力替代方案。这些线程是轻量级实体，承诺在消耗比其OS对手更少的资源的同时增强并发性。</p><p>虚拟线程带来了许多优势，包括提高的可扩展性和资源利用率。与资源密集型的OS线程不同，<strong>虚拟线程是轻量级的，可以创建更多的数量，而不会显著影响系统资源。</strong> 这种资源利用的效率为Java应用程序中更好的并发处理打开了大门。</p><p>在Quarkus框架中理解虚拟线程的集成提供了对其实际实现的洞察。Quarkus为云原生应用程序设计，强调在不牺牲开发者生产力的情况下的效率和性能。</p><p>Quarkus利用拟线程增强其并发模型，允许开发者编写命令式代码，同时受益于虚拟线程的优势。通过将虚拟线程无缝集成到其架构中，Quarkus为开发高度并发的应用程序提供了一个现代而高效的平台。</p><p>要在Quarkus中实现虚拟线程，我们可以对我们的项目进行以下调整。</p><h3 id="_5-1-依赖配置" tabindex="-1"><a class="header-anchor" href="#_5-1-依赖配置"><span>5.1 依赖配置</span></a></h3><p>我们需要在我们的_pom.xml_文件中包含必要的依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`io.quarkus`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`quarkus-resteasy-reactive`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，<strong>我们必须确保我们的项目配置为使用Java 21或更高版本</strong>：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.source</span><span class="token punctuation">&gt;</span></span>`21`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.source</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.target</span><span class="token punctuation">&gt;</span></span>`21`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.target</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-利用虚拟线程注解" tabindex="-1"><a class="header-anchor" href="#_5-2-利用虚拟线程注解"><span>5.2 利用虚拟线程注解</span></a></h3><p>当我们将虚拟线程集成到我们的Quarkus应用程序中时，<strong>关键机制是使用特定的注解，尤其是_@RunOnVirtualThread_</strong>。这个注解作为指导指令，指示系统在虚拟线程上执行指定的方法或操作，而不是传统的平台线程。</p><p>例如，为了与远程服务进行交互，创建远程服务接口是必要的。接口定义了必要的通信协议：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Path</span><span class="token punctuation">(</span><span class="token string">&quot;/greetings&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">VirtualThreadApp</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@RestClient</span>\n    <span class="token class-name">RemoteService</span> service<span class="token punctuation">;</span>\n    <span class="token annotation punctuation">@GET</span>\n    <span class="token annotation punctuation">@RunOnVirtualThread</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">var</span> response <span class="token operator">=</span> service<span class="token punctuation">.</span><span class="token function">greetings</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> response<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个类中，对_process()<em>方法选择性地应用</em>@RunOnVirtualThread_作为一个特定的指令。这个注解确保这个方法在虚拟线程上执行，允许流线化和高效地处理操作，例如调用远程服务。这种有针对性地应用虚拟线程增强了类内部的并发管理。</p><h3 id="_6-性能比较-传统与虚拟线程" tabindex="-1"><a class="header-anchor" href="#_6-性能比较-传统与虚拟线程"><span>6. 性能比较：传统与虚拟线程</span></a></h3><p>深入探索Quarkus应用程序中传统线程模型和虚拟线程之间的性能差异，为我们提供了它们操作效率的关键见解。通过对可扩展性、资源利用和不同工作负载下的响应性进行基准测试，我们可以发现虚拟线程比传统对应物提供的独特优势。</p><p>比较分析展示了虚拟线程的优越性能，突出了它们在管理并发方面的效率。基准测试结果强调了虚拟线程在增强可扩展性、优化资源利用以及在不同应用程序负载下提高响应性方面的好处。这种实证评估为开发者提供了宝贵的参考，帮助他们做出关于Quarkus应用程序并发模型的最佳决策。</p><h3 id="_7-挑战和考虑事项" tabindex="-1"><a class="header-anchor" href="#_7-挑战和考虑事项"><span>7. 挑战和考虑事项</span></a></h3><p>在虚拟线程使用的动态环境中，有几个挑战和考虑事项值得关注。这些方面在确保Quarkus应用程序中虚拟线程的无缝和优化体验中起着关键作用。</p><h4 id="_7-1-固定问题" tabindex="-1"><a class="header-anchor" href="#_7-1-固定问题"><span>7.1 固定问题</span></a></h4><p>可能会出现虚拟线程由于持有锁或本地调用而遇到阻塞的情况。克服这个挑战涉及识别这些场景并重新设计代码段，以防止载体线程阻塞。</p><h4 id="_7-2-垄断问题" tabindex="-1"><a class="header-anchor" href="#_7-2-垄断问题"><span>7.2 垄断问题</span></a></h4><p>由虚拟线程执行的长时间运行的计算可能会垄断载体线程，可能影响应用程序的响应性。管理并优化线程利用以处理密集计算的策略是必不可少的。</p><h4 id="_7-3-内存使用和线程池优化" tabindex="-1"><a class="header-anchor" href="#_7-3-内存使用和线程池优化"><span>7.3 内存使用和线程池优化</span></a></h4><p>在使用虚拟线程时，优化线程池和管理内存使用变得至关重要。仔细考虑线程池配置和内存管理，以防止线程池过度弹性和内存开销。</p><h4 id="_7-4-确保线程安全" tabindex="-1"><a class="header-anchor" href="#_7-4-确保线程安全"><span>7.4 确保线程安全</span></a></h4><p>在虚拟线程环境中维护线程安全的实现至关重要，以防止多个虚拟线程同时访问共享资源时出现数据不一致或竞态条件。</p><h3 id="_8-最佳实践和建议" tabindex="-1"><a class="header-anchor" href="#_8-最佳实践和建议"><span>8. 最佳实践和建议</span></a></h3><p>有效使用虚拟线程需要遵循最佳实践和建议，以确保最佳性能和可维护性。</p><h4 id="_8-1-优化虚拟线程使用策略" tabindex="-1"><a class="header-anchor" href="#_8-1-优化虚拟线程使用策略"><span>8.1 优化虚拟线程使用策略</span></a></h4><p>为了优化虚拟线程的使用，我们需要：</p><ul><li>**识别阻塞操作：**分析并最小化导致虚拟线程阻塞的代码段，确保更顺畅的执行。</li><li>**使用异步操作：**实现非阻塞I/O和异步处理，以增加虚拟线程的并发性和效率。</li><li>**监控线程池：**定期检查和调整线程池配置，以优化资源使用并防止不必要的扩展。</li></ul><h4 id="_8-2-开发者建议" tabindex="-1"><a class="header-anchor" href="#_8-2-开发者建议"><span>8.2 开发者建议</span></a></h4><p>以下可以视为建议：</p><ul><li>**关注线程安全：**确保共享资源的线程安全，以避免数据不一致和竞态条件。</li><li>**持续重构：**定期更新和改进代码，以实现高效、非阻塞的执行。</li><li>**分享知识：**通过分享关于虚拟线程的经验和最佳实践，进行协作学习，共同克服挑战并提高效率。</li></ul><h3 id="_9-结论" tabindex="-1"><a class="header-anchor" href="#_9-结论"><span>9. 结论</span></a></h3><p>在本文中，我们深入探讨了Quarkus中虚拟线程的采用，揭示了其众多好处，包括增强的并发性、优化的资源利用和改善的可扩展性。然而，我们看到线程固定、垄断和内存管理等挑战需要仔细考虑和战略处理，以充分获得虚拟线程的好处。</p><p>本教程的完整源代码可在GitHub上找到。</p>',45),l=[p];function c(i,o){return s(),n("div",null,l)}const d=a(e,[["render",c],["__file","2024-06-22-Quarkus and Virtual Threads.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Quarkus%20and%20Virtual%20Threads.html","title":"Quarkus和虚拟线程","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Java","Quarkus"],"tag":["Java虚拟线程","并发"],"head":[["meta",{"name":"keywords","content":"Quarkus, Java虚拟线程, 并发, 微服务, 云原生应用"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Quarkus%20and%20Virtual%20Threads.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Quarkus和虚拟线程"}],["meta",{"property":"og:description","content":"Quarkus和虚拟线程 在Java开发领域不断发展的今天，Java 21引入了一个革命性的特性——虚拟线程。这些由Java虚拟机(JVM)管理的轻量级线程，承诺将重塑开发者在Java应用程序中处理并发的方式。长期以来，并发应用程序的开发一直充满挑战，管理传统的操作系统(OS)管理线程时常常遇到复杂性。 Quarkus框架的核心是一个现代的、以开发者为..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T19:26:14.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java虚拟线程"}],["meta",{"property":"article:tag","content":"并发"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T19:26:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Quarkus和虚拟线程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T19:26:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Quarkus和虚拟线程 在Java开发领域不断发展的今天，Java 21引入了一个革命性的特性——虚拟线程。这些由Java虚拟机(JVM)管理的轻量级线程，承诺将重塑开发者在Java应用程序中处理并发的方式。长期以来，并发应用程序的开发一直充满挑战，管理传统的操作系统(OS)管理线程时常常遇到复杂性。 Quarkus框架的核心是一个现代的、以开发者为..."},"headers":[{"level":3,"title":"5.1 依赖配置","slug":"_5-1-依赖配置","link":"#_5-1-依赖配置","children":[]},{"level":3,"title":"5.2 利用虚拟线程注解","slug":"_5-2-利用虚拟线程注解","link":"#_5-2-利用虚拟线程注解","children":[]},{"level":3,"title":"6. 性能比较：传统与虚拟线程","slug":"_6-性能比较-传统与虚拟线程","link":"#_6-性能比较-传统与虚拟线程","children":[]},{"level":3,"title":"7. 挑战和考虑事项","slug":"_7-挑战和考虑事项","link":"#_7-挑战和考虑事项","children":[]},{"level":3,"title":"8. 最佳实践和建议","slug":"_8-最佳实践和建议","link":"#_8-最佳实践和建议","children":[]},{"level":3,"title":"9. 结论","slug":"_9-结论","link":"#_9-结论","children":[]}],"git":{"createdTime":1719084374000,"updatedTime":1719084374000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.85,"words":2055},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Quarkus and Virtual Threads.md","localizedDate":"2024年6月23日","excerpt":"\\n<p>在Java开发领域不断发展的今天，Java 21引入了一个革命性的特性——虚拟线程。这些由Java虚拟机(JVM)管理的轻量级线程，承诺将重塑开发者在Java应用程序中处理并发的方式。长期以来，并发应用程序的开发一直充满挑战，管理传统的操作系统(OS)管理线程时常常遇到复杂性。</p>\\n<p>Quarkus框架的核心是一个现代的、以开发者为中心的工具包，专为云原生时代设计。它拥有极快的启动时间和低内存消耗，同时为开发者提供了一套广泛的工具，用于构建微服务和云原生应用程序。</p>\\n<p>在本教程中，我们将探索Quarkus如何利用Java的虚拟线程，转变Java应用程序中并发的管理方式。</p>","autoDesc":true}');export{d as comp,k as data};
