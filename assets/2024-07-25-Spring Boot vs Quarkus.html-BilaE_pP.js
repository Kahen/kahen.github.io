import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as n,a as p}from"./app-C4eFoh0f.js";const r={},e=p('<h1 id="spring-boot与quarkus-baeldung" tabindex="-1"><a class="header-anchor" href="#spring-boot与quarkus-baeldung"><span>Spring Boot与Quarkus | Baeldung</span></a></h1><p>在本教程中，我们将专注于两个知名的Java框架Spring Boot和Quarkus之间的简单比较。到结束时，我们将更好地理解它们的相似之处和差异，以及一些特殊性。我们还将执行一些测试来衡量它们的性能并观察它们的行为。</p><p><strong>Spring Boot是一个基于Java的框架，专注于企业应用程序</strong>。它连接了所有Spring项目，并<strong>通过提供许多生产就绪的集成来帮助加速开发人员的生产力</strong>。</p><p>通过这样做，它减少了配置和样板代码的数量。此外，<strong>得益于其约定优于配置的方法</strong>，在运行时根据类路径上可用的依赖项自动注册默认配置，Spring Boot大大减少了许多Java应用程序的上市时间。</p><h3 id="_3-quarkus" tabindex="-1"><a class="header-anchor" href="#_3-quarkus"><span>3. Quarkus</span></a></h3><p><strong>Quarkus是另一个框架，与Spring Boot有类似的方法，但额外承诺提供更小的构件、更快的启动时间、更好的资源利用和效率</strong>。</p><p>它针对云、无服务器和容器化环境进行了优化。但尽管重点略有不同，Quarkus也与大多数流行的Java框架很好地集成。</p><h3 id="_4-比较" tabindex="-1"><a class="header-anchor" href="#_4-比较"><span>4. 比较</span></a></h3><p>如上所述，两个框架都与其他项目和框架很好地集成。然而，它们的内部实现和架构是不同的。例如，Spring Boot提供两种网络功能的风味：阻塞（Servlets）和非阻塞（WebFlux）。</p><p><strong>Quarkus也提供这两种方法，但与Spring Boot不同，它允许我们同时使用阻塞和非阻塞策略</strong>。此外，<strong>Quarkus在其架构中嵌入了响应式方法</strong>。</p><p>出于这个原因，<strong>我们将使用两个完全响应式的应用程序，使用Spring WebFlux和Quarkus的响应式功能来实现，以便在我们的比较中有一个更精确的场景</strong>。</p><p>另外，两个项目中最重要的特性之一是能够创建原生映像（二进制和特定平台的可执行文件）。因此，我们也将包括比较中的两个原生映像。</p><p>需要注意的是，本项目使用了Spring Boot版本3.1.3。Spring原生映像可以配置为与以前的版本一起工作：原生映像支持处于试验阶段。然而，从版本3开始，Spring Boot有原生映像支持。为此，我们需要GraalVM。</p><h3 id="_4-1-测试应用程序" tabindex="-1"><a class="header-anchor" href="#_4-1-测试应用程序"><span>4.1. 测试应用程序</span></a></h3><p>我们的应用程序将公开三个API：一个允许用户创建邮政编码，一个查找特定邮政编码的信息，以及一个按城市查询邮政编码。这些API是使用Spring Boot和Quarkus完全使用响应式方法实现的，并使用MySQL数据库。</p><p>目标是拥有一个简单的示例应用程序，但比HelloWorld应用程序稍微复杂一些。当然，这将影响我们的比较，因为像数据库驱动程序和序列化框架这样的实现将影响结果。然而，大多数应用程序也可能处理这些事情。</p><p><strong>因此，我们的比较并不旨在成为关于哪个框架更好的终极真理，而是成为一个案例研究，将分析这些特定实现</strong>。</p><h3 id="_4-2-测试计划" tabindex="-1"><a class="header-anchor" href="#_4-2-测试计划"><span>4.2. 测试计划</span></a></h3><p>为了测试这两种实现，我们将使用Wrk进行测试，并使用其指标报告来分析我们的发现。我们还将使用VisualVM在测试执行期间监控应用程序的资源利用。</p><p>测试将持续5分钟，将调用所有API，从热身期开始，然后增加连接数，直到达到20个。Wrk可以在这个设置下产生大量的负载：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/10/test-planning-wrk.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>所有测试都在具有以下规格的机器上执行：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/10/specifications.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><strong>尽管由于缺乏与其他后台进程的隔离而不理想，但测试的目的仅在于说明所提出的比较。正如已经提到的，我们并不打算提供对两个框架性能的广泛和详细分析</strong>。</p><p>另一个值得提及的点是，根据我们的机器规格，我们可能需要调整连接数、线程数等。</p><h3 id="_4-3-了解我们的测试" tabindex="-1"><a class="header-anchor" href="#_4-3-了解我们的测试"><span>4.3. 了解我们的测试</span></a></h3><p>确保我们正在测试正确的事情至关重要，因此我们将使用Docker容器来部署我们的基础设施。这将允许我们控制应用程序和数据库的资源限制。目标是给应用程序施加压力，而不是底层系统，我们的数据库。对于这个例子，仅仅限制可用CPU的数量就足够了，但这可能会根据我们机器上可用的资源而改变。</p><p>要限制可用资源，我们可以使用Docker设置、<em>cpulimit_命令或我们喜欢的任何其他工具。此外，我们可以使用_docker stats_和_top_命令来监控系统资源。最后，关于内存，我们将测量堆使用情况以及RSS。为此，我们将使用_ps</em>（<em>ps -o pid,rss,command -p <code>&lt;pid&gt;</code></em>）命令。</p><h2 id="_5-发现" tabindex="-1"><a class="header-anchor" href="#_5-发现"><span>5. 发现</span></a></h2><p>两个项目的开发体验都很棒，但值得一提的是，Spring Boot有更好的文档和更多的在线资源。Quarkus在这方面正在改进，并拥有大量功能，有助于提高生产力。然而，在文档和Stack Overflow问题方面，它仍然落后。</p><p>在指标方面，我们有：</p><table><thead><tr><th>指标</th><th>Spring Boot JVM</th><th>Quarkus JVM</th><th>Spring Boot Native</th><th>Quarkus Native</th></tr></thead><tbody><tr><td>启动时间（秒）</td><td>5.395</td><td>4.075</td><td>0.082</td><td>0.142</td></tr><tr><td>构建构件时间（秒）</td><td>1.759</td><td>5.243</td><td>113</td><td>91</td></tr><tr><td>构件大小（MB）</td><td>30.0</td><td>31.8</td><td>94.7</td><td>80.5</td></tr><tr><td>加载的类</td><td>8861</td><td>8496</td><td>21615</td><td>16040</td></tr><tr><td>CPU使用率最大（%）</td><td>100</td><td>100</td><td>100</td><td>100</td></tr><tr><td>CPU使用率平均（%）</td><td>82</td><td>73</td><td>94</td><td>92</td></tr><tr><td>启动时堆大小（MB）</td><td>1048.57</td><td>1056.96</td><td>–</td><td>–</td></tr><tr><td>启动时使用的堆大小（MB）</td><td>193.31</td><td>157.066</td><td>84.574</td><td>60.41</td></tr><tr><td>使用的堆最大（MB）</td><td>604.1</td><td>567.854</td><td>144.984</td><td>519.526</td></tr><tr><td>使用的堆平均（MB）</td><td>434.155</td><td>362.46</td><td>114.779</td><td>289.968</td></tr><tr><td>RSS内存启动（MB）</td><td>197.7</td><td>159.1</td><td>90.5</td><td>57.1</td></tr><tr><td>最大线程数</td><td>77</td><td>47</td><td>73</td><td>42</td></tr><tr><td>每秒请求数</td><td>319</td><td>240</td><td>395</td><td>236</td></tr></tbody></table><p>通过这个实验，我们可以看到<strong>Quarkus在启动时间方面比Spring Boot更快，无论是JVM版本还是原生版本</strong>。此外，Quarkus在原生映像的情况下构建时间也快得多。构建时间是91秒（Quarkus）对113秒（Spring Boot）。JVM构建时间是5.24秒（Quarkus）对1.75秒（Spring Boot），所以Spring在这个方面得分。</p><p>关于构件大小，Spring Boot和Quarkus生成的可运行构件在JVM版本方面相似，但在原生版本的情况下，Quarkus做得更好。</p><p>然而，关于其他指标，结论并不直接。让我们更深入地看看其中的一些。</p><h3 id="_5-1-cpu" tabindex="-1"><a class="header-anchor" href="#_5-1-cpu"><span>5.1. CPU</span></a></h3><p>如果我们关注CPU使用情况，我们将看到<strong>JVM版本在热身阶段开始时消耗更多的CPU</strong>。之后，CPU使用稳定，所有版本的消耗相对相等。</p><p>这里是Spring和Quarkus在JVM和原生版本中的CPU消耗，依次为：</p><p>（Spring JVM）</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/10/spring-cpu.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>（Quarkus JVM）</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/10/quarkus-cpu.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>（Spring Native）</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/10/spring-native-cpu.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>（Quarkus Native）</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/10/quarkus-native-cpu.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>Quarkus在两种情况下都做得更好。然而，差异非常小，也可以认为是平局。另一个值得提及的点是，在图表中，我们看到的消耗基于机器中可用的CPU数量。尽管如此，为了确保我们正在强调选项而不是系统的其他部分，我们将应用程序可用的核心数量限制为三个。</p><h3 id="_5-2-内存" tabindex="-1"><a class="header-anchor" href="#_5-2-内存"><span>5.2. 内存</span></a></h3><p>关于内存，情况更加复杂。首先，<strong>两个框架的JVM版本为堆保留更多的内存，几乎相同数量的内存</strong>。关于堆使用情况，JVM版本比原生版本消耗更多的内存，但看着一对，Quarkus似乎在JVM版本中比Spring消耗略少。但是，再次强调，差异非常微小：</p><p>（Spring Boot JVM）</p><p>（Quarkus JVM）</p><p>然后，看看原生映像，情况似乎发生了变化。<strong>Spring Native版本似乎更频繁地收集内存，并保持较低的内存占用：</strong></p><p>（SpringBoot Native）</p><p>（Quarkus Native）</p><p><strong>另一个重要的亮点是，在RSS内存测量方面，Quarkus似乎在两个版本中都超过了Spring。</strong> 我们只在启动时添加了RSS比较，但我们也可以在测试期间使用相同的命令。</p><p>尽管如此，在这次比较中，我们只使用了默认参数。因此，没有对GC、JVM选项或任何其他参数进行更改。不同的应用程序可能需要不同的设置，我们在实际环境中使用它们时应记住这一点。</p><h3 id="_5-4-连接点" tabindex="-1"><a class="header-anchor" href="#_5-4-连接点"><span>5.4. 连接点</span></a></h3><p>综合考虑，两个框架都被证明是实现Java应用程序的优秀选择。</p><p>原生应用程序显示出快速和低资源消耗，使它们成为无服务器、短命应用程序以及资源消耗至关重要的环境中的理想选择。</p><p>另一方面，JVM应用程序似乎有更多的开销，但具有出色的稳定性和高吞吐量，非常适合健壮、长寿命的应用程序。</p><p><strong>最后，所有版本在比较时都表现出色，至少对于我们的例子是这样。差异非常小，我们可以认为它们具有类似的性能</strong>。当然，我们可以争论说，JVM版本在处理重负载方面在吞吐量方面更好，同时消耗更多资源，而原生版本消耗更少。然而，根据用例的不同，这种差异甚至可能并不相关。</p><p>最后，我们应该注意到，在Spring应用程序中，我们不得不更换数据库驱动程序，因为文档推荐的那一个有问题。相比之下，Quarkus开箱即用，没有任何问题。</p><h1 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h1><p>在本文中，我们比较了Spring Boot和Quarkus框架及其不同的部署模式，JVM和Native。我们还探索了这些应用程序的一些其他指标和方面。像往常一样，测试应用程序的代码和用于测试它们的脚本可以在GitHub上找到。</p><p>OK</p>',65),o=[e];function d(i,s){return n(),a("div",null,o)}const l=t(r,[["render",d],["__file","2024-07-25-Spring Boot vs Quarkus.html.vue"]]),c=JSON.parse('{"path":"/posts/baeldung/2024-07-25/2024-07-25-Spring%20Boot%20vs%20Quarkus.html","title":"Spring Boot与Quarkus | Baeldung","lang":"zh-CN","frontmatter":{"date":"2021-10-01T00:00:00.000Z","category":["Spring Boot","Quarkus"],"tag":["Java框架","性能比较"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Quarkus, Java, 性能测试, 微服务"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-25/2024-07-25-Spring%20Boot%20vs%20Quarkus.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Boot与Quarkus | Baeldung"}],["meta",{"property":"og:description","content":"Spring Boot与Quarkus | Baeldung 在本教程中，我们将专注于两个知名的Java框架Spring Boot和Quarkus之间的简单比较。到结束时，我们将更好地理解它们的相似之处和差异，以及一些特殊性。我们还将执行一些测试来衡量它们的性能并观察它们的行为。 Spring Boot是一个基于Java的框架，专注于企业应用程序。它连..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2021/10/test-planning-wrk.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-25T14:07:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java框架"}],["meta",{"property":"article:tag","content":"性能比较"}],["meta",{"property":"article:published_time","content":"2021-10-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-25T14:07:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot与Quarkus | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2021/10/test-planning-wrk.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/10/specifications.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/10/spring-cpu.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/10/quarkus-cpu.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/10/spring-native-cpu.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/10/quarkus-native-cpu.png\\"],\\"datePublished\\":\\"2021-10-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-25T14:07:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Boot与Quarkus | Baeldung 在本教程中，我们将专注于两个知名的Java框架Spring Boot和Quarkus之间的简单比较。到结束时，我们将更好地理解它们的相似之处和差异，以及一些特殊性。我们还将执行一些测试来衡量它们的性能并观察它们的行为。 Spring Boot是一个基于Java的框架，专注于企业应用程序。它连..."},"headers":[{"level":3,"title":"3. Quarkus","slug":"_3-quarkus","link":"#_3-quarkus","children":[]},{"level":3,"title":"4. 比较","slug":"_4-比较","link":"#_4-比较","children":[]},{"level":3,"title":"4.1. 测试应用程序","slug":"_4-1-测试应用程序","link":"#_4-1-测试应用程序","children":[]},{"level":3,"title":"4.2. 测试计划","slug":"_4-2-测试计划","link":"#_4-2-测试计划","children":[]},{"level":3,"title":"4.3. 了解我们的测试","slug":"_4-3-了解我们的测试","link":"#_4-3-了解我们的测试","children":[]},{"level":2,"title":"5. 发现","slug":"_5-发现","link":"#_5-发现","children":[{"level":3,"title":"5.1. CPU","slug":"_5-1-cpu","link":"#_5-1-cpu","children":[]},{"level":3,"title":"5.2. 内存","slug":"_5-2-内存","link":"#_5-2-内存","children":[]},{"level":3,"title":"5.4. 连接点","slug":"_5-4-连接点","link":"#_5-4-连接点","children":[]}]}],"git":{"createdTime":1721916442000,"updatedTime":1721916442000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":8.61,"words":2584},"filePathRelative":"posts/baeldung/2024-07-25/2024-07-25-Spring Boot vs Quarkus.md","localizedDate":"2021年10月1日","excerpt":"\\n<p>在本教程中，我们将专注于两个知名的Java框架Spring Boot和Quarkus之间的简单比较。到结束时，我们将更好地理解它们的相似之处和差异，以及一些特殊性。我们还将执行一些测试来衡量它们的性能并观察它们的行为。</p>\\n<p><strong>Spring Boot是一个基于Java的框架，专注于企业应用程序</strong>。它连接了所有Spring项目，并<strong>通过提供许多生产就绪的集成来帮助加速开发人员的生产力</strong>。</p>\\n<p>通过这样做，它减少了配置和样板代码的数量。此外，<strong>得益于其约定优于配置的方法</strong>，在运行时根据类路径上可用的依赖项自动注册默认配置，Spring Boot大大减少了许多Java应用程序的上市时间。</p>","autoDesc":true}');export{l as comp,c as data};
