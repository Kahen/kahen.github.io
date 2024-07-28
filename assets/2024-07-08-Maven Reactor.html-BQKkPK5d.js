import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D4B8YWfq.js";const p={},e=t('<h1 id="maven-reactor-简介" tabindex="-1"><a class="header-anchor" href="#maven-reactor-简介"><span>Maven Reactor 简介</span></a></h1><p>在本教程中，我们将快速了解 Maven Reactor 的基本概念以及其在 Maven 生态系统中的位置。</p><p>我们将从 Maven Reactor 的介绍开始。接下来，我们将设置一个具有模块间依赖的简单多模块 Maven 项目的示例，并看到 Reactor 如何运作以确定构建依赖。我们将触及一些可用的标志，这些标志可以微调 Maven Reactor 的行为。最后，我们将总结使用 Reactor 的一些好处。</p><h2 id="maven-reactor-的基础知识" tabindex="-1"><a class="header-anchor" href="#maven-reactor-的基础知识"><span>Maven Reactor 的基础知识</span></a></h2><p><strong>Maven Reactor 是 Maven 的内置部分，负责管理项目依赖和构建。</strong> <strong>它负责执行 Maven 构建，并确保项目以正确的顺序构建以满足依赖。在具有许多模块间依赖的复杂多模块项目中，可以真正体会到 Maven Reactor 的好处。</strong></p><p><strong>Reactor 使用有向无环图（DAG）来确定项目的构建顺序。</strong></p><p>它作为 Maven 核心的一部分执行以下功能：</p><ul><li>收集所有可供构建的模块</li><li>将项目组织到适当的构建顺序中</li><li>按顺序依次执行选定的项目</li></ul><h2 id="示例用例" tabindex="-1"><a class="header-anchor" href="#示例用例"><span>示例用例</span></a></h2><p>让我们考虑一个涉及开发用于管理患者信息的基于 Web 的应用程序的项目。该项目由三个模块组成：</p><ol><li><strong>patient-web 模块</strong> - 这个模块作为应用程序的用户界面</li><li><strong>patient-data 模块</strong> - 这个模块处理所有数据库 CRUD 操作</li><li><strong>patient-domain 模块</strong> - 这个模块包含应用程序使用的领域实体</li></ol><p>在这个项目中，<strong>patient-web 模块</strong> 依赖于其他两个模块，因为它从持久存储中检索和显示数据。另一方面，<strong>patient-data 模块</strong> 依赖于 <strong>patient-domain 模块</strong>，因为它需要访问领域实体以执行 CRUD 操作。重要的是要注意，<strong>patient-data 模块</strong> 独立于其他两个模块。</p><h3 id="_4-1-maven-设置" tabindex="-1"><a class="header-anchor" href="#_4-1-maven-设置"><span>4.1 Maven 设置</span></a></h3><p>为了实现我们的简单示例，让我们设置一个名为 <strong>sample-reactor-project</strong> 的多模块项目，包含三个模块。每个模块将服务于前面提到的目的：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/03/Maven-reactor-project-300x169.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在这一点上，让我们窥视一下项目 <strong>POM</strong>：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````maven-reactor``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````\n````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````1.0-SNAPSHOT````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>````maven-reactor````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span>````\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>packaging</span><span class="token punctuation">&gt;</span></span>`pom`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>packaging</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modules</span><span class="token punctuation">&gt;</span></span>`\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>module</span><span class="token punctuation">&gt;</span></span>````patient-web````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>module</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>module</span><span class="token punctuation">&gt;</span></span>````patient-data````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>module</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>module</span><span class="token punctuation">&gt;</span></span>````patient-domain````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>module</span><span class="token punctuation">&gt;</span></span>````\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modules</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>本质上，我们在这里定义了一个多模块项目，并在项目 <strong>pom</strong> 中的 <em><code>&lt;module&gt;</code> .. <code>&lt;/module&gt;</code></em> 标签内声明了所有三个模块。</strong></p><p>现在，让我们看看 <strong>patient-data 模块</strong> 的 <strong>POM</strong>：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````patient-data``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>````patient-data````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span>````\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">&gt;</span></span>```\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``````com.baeldung``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``````\n    ``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````maven-reactor``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````1.0-SNAPSHOT````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">&gt;</span></span>```\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>``\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n        ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``````com.baeldung``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``````\n        ``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````patient-domain``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````1.0-SNAPSHOT````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**在这里，我们可以看到 <strong>patient data</strong> 依赖于 <strong>patient-domain。</strong></p><p>对于我们的用例，我们将假设 <strong>patient-domain 模块</strong> 独立于其他模块，并且可以独立构建。它的 <strong>POM</strong> 如下所示：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````patient-domain``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>````patient-domain````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span>````\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">&gt;</span></span>```\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``````com.baeldung``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``````\n    ``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````maven-reactor``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````1.0-SNAPSHOT````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**最后，<strong>patient-web</strong> 应该依赖于 <strong>patient-data</strong> 和 <strong>patient-domain</strong>：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````patient-web``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````\n````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````1.0-SNAPSHOT````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>````patient-web````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span>````\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">&gt;</span></span>```\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``````com.baeldung``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``````\n    ``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````maven-reactor``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````1.0-SNAPSHOT````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">&gt;</span></span>```\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>``\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n        ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``````com.baeldung``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``````\n        ``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````patient-data``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````1.0-SNAPSHOT````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n        ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``````com.baeldung``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``````\n        ``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````patient-domain``````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````1.0-SNAPSHOT````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-maven-reactor-在行动" tabindex="-1"><a class="header-anchor" href="#_4-2-maven-reactor-在行动"><span>4.2 Maven Reactor 在行动</span></a></h3><p>要看到 Reactor 在行动，让我们进入项目的父目录 <strong>(maven-reactor)</strong> 并执行 <strong>mvn clean install</strong>。</p><p>此时，Maven 将使用 Reactor 执行以下任务：</p><ol><li>收集项目中的所有可用模块（在本例中为 <strong>patient-web</strong>、<strong>patient-data</strong> 和 <strong>patient-domain</strong>）</li><li><strong>根据它们的依赖确定构建模块的正确顺序（在本例中，<strong>patient-domain</strong> 必须在 <strong>patient-data</strong> 之前构建，<strong>patient-data</strong> 必须在 <strong>patient-web</strong> 之前构建）</strong></li><li>按正确的顺序构建每个模块，确保正确解析依赖</li></ol><p>这是成功的构建顺序的 Reactor 构建顺序：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/03/build-order.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_5-配置-reactor" tabindex="-1"><a class="header-anchor" href="#_5-配置-reactor"><span>5. 配置 Reactor</span></a></h2><p>尽管 Reactor 默认是 Maven 的一部分，但我们仍然可以通过使用几个命令行开关来修改其行为。这些开关被认为是必需的，因为它们允许我们控制 Reactor 如何构建我们的项目。一些需要考虑的重要开关包括：</p><ul><li><strong>–resume-from:</strong> 允许我们在构建中途失败时从特定项目恢复 reactor</li><li><strong>–also-make:</strong> 构建指定的项目及其 reactor 中的任何依赖项</li><li><strong>–also-make-dependents:</strong> 构建指定的项目以及依赖它们的任何项目</li><li><strong>–fail-fast:</strong> 每当模块构建失败时立即停止整体构建（默认）</li><li><strong>–fail-at-end:</strong> 即使特定模块构建失败，此选项也会继续 reactor 构建，并在最后报告所有失败的模块</li><li><strong>–non-recursive:</strong> 使用此选项，我们可以禁用 Reactor 构建，并仅构建当前目录中的项目，即使项目的 pom 声明了其他模块</li></ul><p>通过使用这些选项，我们可以微调 reactor 的行为，并以我们需要的方式构建我们的项目。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们快速了解了使用 Maven Reactor 作为 Apache Maven 生态系统的一部分来构建多模块复杂项目的好处，它从开发者那里接管了解析依赖和构建顺序的责任，同时也减少了构建时间。</p><p>像往常一样，本教程中展示的所有代码示例都可以在 GitHub 上找到。</p>',38),o=[e];function c(l,i){return s(),a("div",null,o)}const g=n(p,[["render",c],["__file","2024-07-08-Maven Reactor.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Maven%20Reactor.html","title":"Maven Reactor 简介","lang":"zh-CN","frontmatter":{"date":"2023-03-01T00:00:00.000Z","category":["Java","Maven"],"tag":["Maven Reactor","多模块项目"],"head":[["meta",{"name":"keywords","content":"Maven, Maven Reactor, 多模块项目, 构建依赖"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Maven%20Reactor.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Maven Reactor 简介"}],["meta",{"property":"og:description","content":"Maven Reactor 简介 在本教程中，我们将快速了解 Maven Reactor 的基本概念以及其在 Maven 生态系统中的位置。 我们将从 Maven Reactor 的介绍开始。接下来，我们将设置一个具有模块间依赖的简单多模块 Maven 项目的示例，并看到 Reactor 如何运作以确定构建依赖。我们将触及一些可用的标志，这些标志可以微..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/03/Maven-reactor-project-300x169.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T13:43:49.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Maven Reactor"}],["meta",{"property":"article:tag","content":"多模块项目"}],["meta",{"property":"article:published_time","content":"2023-03-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T13:43:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Maven Reactor 简介\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/03/Maven-reactor-project-300x169.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/03/build-order.png\\"],\\"datePublished\\":\\"2023-03-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T13:43:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Maven Reactor 简介 在本教程中，我们将快速了解 Maven Reactor 的基本概念以及其在 Maven 生态系统中的位置。 我们将从 Maven Reactor 的介绍开始。接下来，我们将设置一个具有模块间依赖的简单多模块 Maven 项目的示例，并看到 Reactor 如何运作以确定构建依赖。我们将触及一些可用的标志，这些标志可以微..."},"headers":[{"level":2,"title":"Maven Reactor 的基础知识","slug":"maven-reactor-的基础知识","link":"#maven-reactor-的基础知识","children":[]},{"level":2,"title":"示例用例","slug":"示例用例","link":"#示例用例","children":[{"level":3,"title":"4.1 Maven 设置","slug":"_4-1-maven-设置","link":"#_4-1-maven-设置","children":[]},{"level":3,"title":"4.2 Maven Reactor 在行动","slug":"_4-2-maven-reactor-在行动","link":"#_4-2-maven-reactor-在行动","children":[]}]},{"level":2,"title":"5. 配置 Reactor","slug":"_5-配置-reactor","link":"#_5-配置-reactor","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720446229000,"updatedTime":1720446229000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.63,"words":1388},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Maven Reactor.md","localizedDate":"2023年3月1日","excerpt":"\\n<p>在本教程中，我们将快速了解 Maven Reactor 的基本概念以及其在 Maven 生态系统中的位置。</p>\\n<p>我们将从 Maven Reactor 的介绍开始。接下来，我们将设置一个具有模块间依赖的简单多模块 Maven 项目的示例，并看到 Reactor 如何运作以确定构建依赖。我们将触及一些可用的标志，这些标志可以微调 Maven Reactor 的行为。最后，我们将总结使用 Reactor 的一些好处。</p>\\n<h2>Maven Reactor 的基础知识</h2>\\n<p><strong>Maven Reactor 是 Maven 的内置部分，负责管理项目依赖和构建。</strong> <strong>它负责执行 Maven 构建，并确保项目以正确的顺序构建以满足依赖。在具有许多模块间依赖的复杂多模块项目中，可以真正体会到 Maven Reactor 的好处。</strong></p>","autoDesc":true}');export{g as comp,k as data};
