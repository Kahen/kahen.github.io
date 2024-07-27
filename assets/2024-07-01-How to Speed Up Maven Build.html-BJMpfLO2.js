import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-CJGTm_7y.js";const e={},p=t('<h1 id="如何加速maven构建" tabindex="-1"><a class="header-anchor" href="#如何加速maven构建"><span>如何加速Maven构建</span></a></h1><p>在本教程中，我们将学习如何加速我们的Maven构建。我们将介绍各种优化构建时间的技术，并评论它们的优点和缺点。</p><h2 id="_2-一般建议" tabindex="-1"><a class="header-anchor" href="#_2-一般建议"><span>2. 一般建议</span></a></h2><p>在进行任何优化尝试之前，让我们回顾一下，<strong>使用正确的Maven阶段可以节省我们大量的时间</strong>。为什么我们要运行完整的_install_并污染我们的本地仓库，而我们只需要编译代码呢？</p><p>另一方面，在多模块项目中，我们只能重新构建更改过的模块以及依赖它们的模块。例如，如果我们只在_module1_和_module2_中进行更改，我们可以运行：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn clean <span class="token function">install</span> <span class="token parameter variable">-pl</span> module1,module2 <span class="token parameter variable">-am</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-使用多线程" tabindex="-1"><a class="header-anchor" href="#_3-使用多线程"><span>3. 使用多线程</span></a></h2><p>默认情况下，Maven构建在单线程中顺序运行。然而，现在所有的计算机都有多个核心。让我们利用这一点，使用_-T_选项，并<strong>并行构建我们的模块</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn clean <span class="token function">install</span> <span class="token parameter variable">-T</span> 1C\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>_-T 1C_意味着Maven将使用每个可用核心的一个线程。</li><li>_-T 4_将强制Maven使用四个线程。</li></ul><p>最后但同样重要的是，Maven Reactor确保所有相互依赖的模块将按顺序运行。</p><h2 id="_4-优化测试" tabindex="-1"><a class="header-anchor" href="#_4-优化测试"><span>4. 优化测试</span></a></h2><p>测试是软件开发的重要组成部分。然而，减少运行它们的时间可以节省大量时间。</p><h3 id="_4-1-并行运行测试" tabindex="-1"><a class="header-anchor" href="#_4-1-并行运行测试"><span>4.1. 并行运行测试</span></a></h3><p>默认情况下，Surefire插件按顺序运行单元测试。然而，我们可以将其配置为并行运行。例如，<strong>要并行运行所有测试套件并使用每个可用核心的一个线程，我们将运行</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mvn clean <span class="token function">install</span> <span class="token parameter variable">-Dparallel</span><span class="token operator">=</span>all <span class="token parameter variable">-DperCoreThreadCount</span><span class="token operator">=</span>true\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，如果我们的项目中没有很多单元测试，那么并行化的开销成本可能会抵消速度增益。</p><h3 id="_4-2-跳过测试执行" tabindex="-1"><a class="header-anchor" href="#_4-2-跳过测试执行"><span>4.2. 跳过测试执行</span></a></h3><p>有时我们不需要在本地环境中运行测试。<strong>Maven <em>-DskipTests</em> 选项在仍然编译测试文件夹的同时跳过测试执行</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn clean <span class="token function">install</span> <span class="token parameter variable">-DskipTests</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在一个高度测试的项目中，当我们不需要它们时跳过测试可以节省时间！</p><h3 id="_4-3-跳过测试编译" tabindex="-1"><a class="header-anchor" href="#_4-3-跳过测试编译"><span>4.3. 跳过测试编译</span></a></h3><p><strong>此外，我们可以通过使用 <em>-Dmaven.test.skip=true</em> 选项跳过测试执行，甚至不编译它们</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn clean <span class="token function">install</span> <span class="token parameter variable">-Dmaven.test.skip</span><span class="token operator">=</span>true\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种方法进一步减少了总构建时间。</p><h2 id="_5-优化jvm参数" tabindex="-1"><a class="header-anchor" href="#_5-优化jvm参数"><span>5. 优化JVM参数</span></a></h2><p><strong>默认情况下，HotSpot JVM使用分层编译</strong>：它使用客户端和服务器编译器来优化Java字节码。这种功能优化了服务器上的长寿命进程。然而，构建是一系列短命进程的连续。因此，让我们使用以下JVM参数：</p><ul><li><em>-XX:-TieredCompilation</em>：JVM不会使用分层编译</li><li><em>-XX:TieredStopAtLevel=1</em>：JVM将只使用客户端编译器</li></ul><p>我们可以通过创建一个包含以下内容的_.mvn/jvm.config_文件来让Maven使用这些选项：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token parameter variable">-XX:-TieredCompilation</span> <span class="token parameter variable">-XX:TieredStopAtLevel</span><span class="token operator">=</span><span class="token number">1</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>实际上，Maven使用缓存和增量构建技术来避免重新编译未更改的代码。因此，Maven需要编译的新代码越多，这种技术就越有效。</p><h2 id="_6-离线模式" tabindex="-1"><a class="header-anchor" href="#_6-离线模式"><span>6. 离线模式</span></a></h2><p><strong>Maven在构建过程中会多次往返服务器，例如，用于依赖解析和插件下载</strong>。特别是，它每次都会检查新的快照更新。我们可以通过进入离线模式来避免这种情况：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn clean <span class="token function">install</span> <span class="token parameter variable">-o</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>显然，当我们需要更新一些依赖时，我们不能使用离线模式。</p><h2 id="_7-识别瓶颈" tabindex="-1"><a class="header-anchor" href="#_7-识别瓶颈"><span>7. 识别瓶颈</span></a></h2><p>如果前面的技术不能帮助我们将构建时间恢复到可接受的水平，<strong>我们可以通过分析器来排查我们的构建</strong>。首先，让我们创建一个新的Maven项目。然后，我们将按照Maven分析器项目的GitHub上的说明进行安装。最后，我们需要在_pom.xml_中添加依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span>``\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.apache.maven.plugins```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```maven-profiler-plugin```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``1.7``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以使用它来通过启动命令来更深入地了解我们的构建时间：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn clean <span class="token function">install</span> <span class="token parameter variable">-Dprofile</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>构建完成后，我们可以在_.profiler_文件夹内找到HTML文本形式的报告。让我们来看一下：</p><h2 id="" tabindex="-1"><a class="header-anchor" href="#"><span><img src="https://www.baeldung.com/wp-content/uploads/2023/08/maven_profiler_results_05_08-300x241.png" alt="img" loading="lazy"></span></a></h2><p>正如我们所看到的，分析器列出了所有插件执行并记录了它们所花费的时间。第二部分列出了下载的工件。这些信息可以帮助我们识别在目标环境中运行时间很长但提供很少或没有价值的插件。</p><h2 id="_8-使用maven配置文件" tabindex="-1"><a class="header-anchor" href="#_8-使用maven配置文件"><span>8. 使用Maven配置文件</span></a></h2><p>一旦我们识别出瓶颈，我们就可以<strong>使用Maven配置文件按需跳过它们并节省时间</strong>。例如，执行集成测试通常非常长。此外，在本地环境中每次运行它们是没有用的。</p><p>让我们在_pom.xml_中添加_failsafe_插件配置：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.apache.maven.plugins```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```maven-failsafe-plugin```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``3.1.2``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>executions</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span>`\n                ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>``integration-test``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>``\n                ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>``verify``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>``\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>executions</span><span class="token punctuation">&gt;</span></span>`\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以添加一个用于跳过它们的配置文件：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>profiles</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>profile</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>`skipITs`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>`\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">&gt;</span></span>``\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span>``\n                ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n                    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.apache.maven.plugins```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n                    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```maven-failsafe-plugin```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n                    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n                        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>skip</span><span class="token punctuation">&gt;</span></span>`true`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>skip</span><span class="token punctuation">&gt;</span></span>`\n                    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n                ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">&gt;</span></span>``\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>profile</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>profiles</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>借助配置覆盖，通过激活_skipITs_配置文件，集成测试现在被跳过了：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn clean <span class="token function">install</span> <span class="token parameter variable">-PskipITs</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_9-使用maven守护进程" tabindex="-1"><a class="header-anchor" href="#_9-使用maven守护进程"><span>9. 使用Maven守护进程</span></a></h2><p><strong>Maven守护进程旨在提高Maven构建的速度</strong>。守护进程是一个长寿命的后台进程，即使构建完成后也会保持活跃。它通过保持关键组件在内存中来减少构建开销，通过避免重复的启动和初始化过程来实现更快的项目构建。要安装它，我们可以按照项目GitHub页面上的说明进行。现在让我们使用它来启动构建：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvnd clean <span class="token function">install</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果守护进程需要启动，构建时间会略高。最后但同样重要的是，我们可以将前面的技术与Maven守护进程结合起来。例如，我们可以通过守护进程构建并跳过测试：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvnd clean <span class="token function">install</span> <span class="token parameter variable">-Dmaven.test.skip</span><span class="token operator">=</span>true\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，让我们指出，由于Maven守护进程是一个长寿命进程，像我们之前那样设置JVM参数可能会弊大于利。</p><h2 id="_10-结论" tabindex="-1"><a class="header-anchor" href="#_10-结论"><span>10. 结论</span></a></h2><p>在本文中，我们展示了各种技术来减少Maven的构建时间。简而言之，我们应该开始使用Maven守护进程。然后，让我们记住在不需要运行测试时跳过它们。我们还可以分析构建并使用Maven配置文件来排除耗时低价值的任务。如果这些还不够，我们可以尝试文章中描述的其他技术。</p><p>如往常一样，代码可以在GitHub上找到。</p>',60),l=[p];function i(c,o){return s(),n("div",null,l)}const r=a(e,[["render",i],["__file","2024-07-01-How to Speed Up Maven Build.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-How%20to%20Speed%20Up%20Maven%20Build.html","title":"如何加速Maven构建","lang":"zh-CN","frontmatter":{"date":"2023-08-05T00:00:00.000Z","category":["Maven","Build Optimization"],"tag":["Maven Build","Performance"],"head":[["meta",{"name":"keywords","content":"Maven, Build Optimization, Performance"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-How%20to%20Speed%20Up%20Maven%20Build.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何加速Maven构建"}],["meta",{"property":"og:description","content":"如何加速Maven构建 在本教程中，我们将学习如何加速我们的Maven构建。我们将介绍各种优化构建时间的技术，并评论它们的优点和缺点。 2. 一般建议 在进行任何优化尝试之前，让我们回顾一下，使用正确的Maven阶段可以节省我们大量的时间。为什么我们要运行完整的_install_并污染我们的本地仓库，而我们只需要编译代码呢？ 另一方面，在多模块项目中，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/08/maven_profiler_results_05_08-300x241.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T21:53:52.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Maven Build"}],["meta",{"property":"article:tag","content":"Performance"}],["meta",{"property":"article:published_time","content":"2023-08-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T21:53:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何加速Maven构建\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/08/maven_profiler_results_05_08-300x241.png\\"],\\"datePublished\\":\\"2023-08-05T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T21:53:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何加速Maven构建 在本教程中，我们将学习如何加速我们的Maven构建。我们将介绍各种优化构建时间的技术，并评论它们的优点和缺点。 2. 一般建议 在进行任何优化尝试之前，让我们回顾一下，使用正确的Maven阶段可以节省我们大量的时间。为什么我们要运行完整的_install_并污染我们的本地仓库，而我们只需要编译代码呢？ 另一方面，在多模块项目中，..."},"headers":[{"level":2,"title":"2. 一般建议","slug":"_2-一般建议","link":"#_2-一般建议","children":[]},{"level":2,"title":"3. 使用多线程","slug":"_3-使用多线程","link":"#_3-使用多线程","children":[]},{"level":2,"title":"4. 优化测试","slug":"_4-优化测试","link":"#_4-优化测试","children":[{"level":3,"title":"4.1. 并行运行测试","slug":"_4-1-并行运行测试","link":"#_4-1-并行运行测试","children":[]},{"level":3,"title":"4.2. 跳过测试执行","slug":"_4-2-跳过测试执行","link":"#_4-2-跳过测试执行","children":[]},{"level":3,"title":"4.3. 跳过测试编译","slug":"_4-3-跳过测试编译","link":"#_4-3-跳过测试编译","children":[]}]},{"level":2,"title":"5. 优化JVM参数","slug":"_5-优化jvm参数","link":"#_5-优化jvm参数","children":[]},{"level":2,"title":"6. 离线模式","slug":"_6-离线模式","link":"#_6-离线模式","children":[]},{"level":2,"title":"7. 识别瓶颈","slug":"_7-识别瓶颈","link":"#_7-识别瓶颈","children":[]},{"level":2,"title":"","slug":"","link":"#","children":[]},{"level":2,"title":"8. 使用Maven配置文件","slug":"_8-使用maven配置文件","link":"#_8-使用maven配置文件","children":[]},{"level":2,"title":"9. 使用Maven守护进程","slug":"_9-使用maven守护进程","link":"#_9-使用maven守护进程","children":[]},{"level":2,"title":"10. 结论","slug":"_10-结论","link":"#_10-结论","children":[]}],"git":{"createdTime":1719870832000,"updatedTime":1719870832000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.87,"words":1762},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-How to Speed Up Maven Build.md","localizedDate":"2023年8月5日","excerpt":"\\n<p>在本教程中，我们将学习如何加速我们的Maven构建。我们将介绍各种优化构建时间的技术，并评论它们的优点和缺点。</p>\\n<h2>2. 一般建议</h2>\\n<p>在进行任何优化尝试之前，让我们回顾一下，<strong>使用正确的Maven阶段可以节省我们大量的时间</strong>。为什么我们要运行完整的_install_并污染我们的本地仓库，而我们只需要编译代码呢？</p>\\n<p>另一方面，在多模块项目中，我们只能重新构建更改过的模块以及依赖它们的模块。例如，如果我们只在_module1_和_module2_中进行更改，我们可以运行：</p>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code>$ mvn clean <span class=\\"token function\\">install</span> <span class=\\"token parameter variable\\">-pl</span> module1,module2 <span class=\\"token parameter variable\\">-am</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,g as data};
