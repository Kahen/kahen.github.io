import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-BkL9UgS7.js";const e={},p=t('<h1 id="apache-maven-构件是什么" tabindex="-1"><a class="header-anchor" href="#apache-maven-构件是什么"><span>Apache Maven 构件是什么？</span></a></h1><p>手动构建一个复杂项目相当繁琐。使用构建工具可以更容易地完成这项工作。众所周知，Java项目的主要构建工具之一是Maven。Maven帮助标准化应用程序的构建和部署。</p><p>在本教程中，我们将讨论Maven构件是什么以及它的关键元素是什么。我们还将查看Maven坐标、依赖管理，最后是Maven仓库。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span><strong>1. 概述</strong></span></a></h2><p>我们可以使用Maven构建和管理任何基于Java的项目。它提供了许多功能，例如：</p><ul><li>构建和编译</li><li>文档和报告</li><li>依赖管理</li><li>源代码管理</li><li>项目更新</li><li>部署</li></ul><p>每个Maven项目都有自己的POM文件。我们可以配置Maven来构建一个项目或多个项目。</p><p>通常，多项目在根目录中定义一个POM文件，并在_modules_部分列出各个项目。简而言之，<strong>Maven构建产生一个或多个构件</strong>。</p><h2 id="_3-maven构件是什么" tabindex="-1"><a class="header-anchor" href="#_3-maven构件是什么"><span><strong>3. Maven构件是什么？</strong></span></a></h2><p>构件是项目可以使用或产生的元素。在Maven术语中，<strong>一个构件</strong> <strong>是在Maven项目构建后生成的输出</strong>。例如，它可以是一个_jar_、_war_或任何其他可执行文件。</p><p>此外，Maven构件包括五个关键元素，<em>groupId</em>、<em>artifactId</em>、<em>version</em>、<em>packaging_和_classifier</em>。这些是我们用来识别构件的元素，被称为Maven坐标。</p><h2 id="_4-maven坐标" tabindex="-1"><a class="header-anchor" href="#_4-maven坐标"><span><strong>4. Maven坐标</strong></span></a></h2><p><strong>Maven坐标</strong> 是给定构件的 <em>groupId</em>、<em>artifactId</em> 和 <em>version</em> 的值的组合。此外，Maven使用坐标来查找与 <em>groupId</em>、<em>artifactId</em> 和 <em>version</em> 的值匹配的任何组件。</p><p>在坐标元素中，我们必须定义 <em>groupId</em>、<em>artifactId</em> 和 <em>version</em>。<em>packaging</em> 元素是可选的，我们不能直接定义 <em>classifier</em>。</p><p>例如，下面的 <em>pom.xml</em> 配置文件显示了一个Maven坐标的示例：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modelVersion</span><span class="token punctuation">&gt;</span></span>``4.0.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modelVersion</span><span class="token punctuation">&gt;</span></span>``\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````org.baeldung`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````org.baeldung.java`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>packaging</span><span class="token punctuation">&gt;</span></span>`jar`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>packaging</span><span class="token punctuation">&gt;</span></span>`\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`````1.0.0-SNAPSHOT`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`````\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>`org.baeldung.java`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>`http://maven.apache.org`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span>`\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>``\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n            `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````junit`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n            `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````junit`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n            `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`````4.1.2`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`````\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>``test``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>``\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们详细看看每个Maven坐标。</p><h3 id="_4-1-groupid-元素" tabindex="-1"><a class="header-anchor" href="#_4-1-groupid-元素"><span>4.1. <em>groupId</em> 元素</span></a></h3><p><strong><em>groupId</em> 元素是项目起源组的标识符</strong>。这个关键使得组织和查找项目更加容易和快速。</p><p>此外，<em>groupId</em> 遵循与Java包相同的命名规则，我们通常选择项目的顶级包名称作为 <em>groupId</em>。</p><p>例如，一个 <em>groupId</em> 为 <em>org.apache.commons</em> 对应于 <em>${repository_home}/org/apache/commons.</em>。</p><h3 id="_4-2-artifactid-元素" tabindex="-1"><a class="header-anchor" href="#_4-2-artifactid-元素"><span>4.2. <em>artifactId</em> 元素</span></a></h3><p><strong><em>artifactId</em> 元素是组内项目的标识符</strong>。它默认用于构建构件的最终名称。因此，这个名称有一些规范，因为它应该是理想的短长度。命名 <em>artifactId</em> 的最佳实践是使用实际的项目名称作为前缀。这样做的好处是它使得查找构件更加容易。</p><p>像 <em>groupId</em> 一样，<em>artifactId</em> 在表示 <em>groupId</em> 的目录树中表现为一个子目录。</p><p>例如，一个 <em>artifactId</em> 为 <em>commons-lang3</em> 在 <em>groupId</em> 为 <em>org.apache.commons</em> 下，将决定构件位于：<em>${repository_home}/org/apache/commons/commons-lang3/</em>。</p><h3 id="_4-3-version-元素" tabindex="-1"><a class="header-anchor" href="#_4-3-version-元素"><span>4.3. <em>version</em> 元素</span></a></h3><p><em>version</em> 用作构件标识符的一部分。<strong>它定义了Maven项目当前的版本</strong>。我们应该注意到Maven定义了一组版本规范，以及发布和快照的概念，我们将在后面介绍。</p><p>一个 <em>version</em> 在由 <em>groupId</em> 和 <em>artifactId</em> 形成的目录树中被表示为一个子目录。</p><p>例如，一个 <em>artifactId</em> 为 <em>commons-lang3</em> 在 <em>groupId</em> 为 <em>org.apache.commons</em> 下的版本为 <em>3.1.1</em>，将决定构件位于：<em>${repository_home}/org/apache/commons/commons-lang3/3.1.1/</em>。</p><h3 id="_4-4-packaging-元素" tabindex="-1"><a class="header-anchor" href="#_4-4-packaging-元素"><span>4.4. <em>packaging</em> 元素</span></a></h3><p>这个元素用于指定项目生成的构件类型。<strong><em>packaging</em> 可以是描述任何二进制软件格式的任何东西</strong>，包括 <em>ZIP</em>、<em>EAR</em>、<em>WAR</em>、<em>SWC</em>、<em>NAR</em>、<em>SWF</em>、<em>SAR</em>。</p><p>此外，<em>packaging</em> 定义了在项目的默认生命周期期间要执行的不同目标。例如，打包阶段为jar类型构件执行 <em>jar:jar</em> 目标，为war类型构件执行 <em>war:war</em> 目标。</p><h3 id="_4-5-classifier-元素" tabindex="-1"><a class="header-anchor" href="#_4-5-classifier-元素"><span>4.5. <em>classifier</em> 元素</span></a></h3><p>我们通常出于技术原因使用 <em>classifier</em>，当交付相同的代码但作为几个单独的构件时。</p><p>例如，如果我们想要用不同的Java编译器构建两个 <em>JAR</em> 构件，我们可以轻松地使用 <em>classifier</em> 来实现，因为它允许使用相同的 <em>groupId:artifactId:version</em> 组合生产两个不同的构件。</p><p>此外，我们还可以在打包源代码、构件的JavaDoc或组装二进制文件时使用 <em>classifier</em>。</p><p>对于我们上述的 <em>commons-lang3</em> 示例，要查找的构件是：<em>commons-lang3-3.10-javadoc.jar</em> 或 <em>commons-lang3-3.10-sources.jar</em>，在 <em>${repository_home}/org/apache/commons/commons-lang3/3.1.0/</em> 下。</p><h2 id="_5-发布版与快照版构件" tabindex="-1"><a class="header-anchor" href="#_5-发布版与快照版构件"><span>5. 发布版与快照版构件</span></a></h2><p>现在，让我们看看快照构件和发布版构件之间的区别。</p><h3 id="_5-1-发布版构件" tabindex="-1"><a class="header-anchor" href="#_5-1-发布版构件"><span>5.1. 发布版构件</span></a></h3><p>一个 <strong>发布</strong> <strong>构件</strong> 表示该版本是稳定的，并且可以在开发过程之外使用，如集成测试、客户资格认证、预生产等。</p><p>此外，一个 <strong>发布版构件是唯一的</strong>。运行 <em>mvn</em> <em>deploy</em> 命令将把我们的项目部署到仓库。但是，对具有相同版本的同一项目再次执行相同的命令将导致失败。</p><h3 id="_5-2-快照版构件" tabindex="-1"><a class="header-anchor" href="#_5-2-快照版构件"><span>5.2. 快照版构件</span></a></h3><p><strong>快照版构件</strong> 表示项目正在开发中。当我们安装或发布一个组件时，Maven会检查 <em>version</em> 属性。如果它包含字符串“SNAPSHOT”，Maven会将这个键转换为UTC（协调世界时）格式的日期和时间值。</p><p>例如，如果我们的项目版本为 1.0-SNAPSHOT，并且我们在Maven仓库上部署其构件，Maven会将这个版本转换为“1.0-202202019-230800”，假设我们在2022年2月19日23:08 UTC部署。</p><p>换句话说，当我们部署一个快照时，我们不是在交付一个软件组件，我们只是交付了它的一个快照。</p><h2 id="_6-依赖管理" tabindex="-1"><a class="header-anchor" href="#_6-依赖管理"><span><strong>6.</strong> <strong>依赖管理</strong></span></a></h2><p>在Maven世界中，依赖管理是至关重要的。例如，当一个项目在其操作过程中（编译、执行）依赖其他类时，就有必要从远程仓库中识别并导入这些依赖到本地仓库。因此，项目将依赖这些库，这些库最终将被添加到项目的类路径中。</p><p>此外，Maven的依赖管理基于几个概念：</p><ul><li>仓库：存储构件所必需的</li><li>范围：允许我们指定我们在哪个上下文中使用依赖</li><li>传递性：允许我们管理依赖的依赖</li><li>继承：从父POM继承的POM可以通过仅提供依赖的 <em>groupId</em> 和 <em>artifactId</em> 而不带 <em>version</em> 属性来设置它们的依赖。Maven从父POM文件中获取适当的版本。</li></ul><p>使用Maven，<strong>依赖管理是通过 <em>pom.xml</em> 完成的</strong>。例如，Maven项目中的依赖声明如下所示：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>``\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n        `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````org.apache.maven`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n        `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````maven-plugin-api`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n        `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`````3.8.4`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`````\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>``provided``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>``\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n        `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````org.springframework`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n        `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````spring-web`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n        `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`````5.3.15`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-maven仓库" tabindex="-1"><a class="header-anchor" href="#_7-maven仓库"><span><strong>7. Maven仓库</strong></span></a></h2><p><strong>Maven使用仓库来存储构建项目所需的依赖和插件等元素</strong>。这使得可以集中这些通常在多个项目中使用的元素。</p><p>正如我们前面提到的，仓库使用一组坐标：<em>groupId</em>、<em>artifactId</em>、<em>version</em> 和 <em>packaging</em> 来存储构件。此外，Maven使用特定的目录结构来组织仓库的内容，并允许它找到所需的元素：<em>${repository_home}/groupId/artifactIdversion</em>。</p><p>例如，让我们考虑这个POM配置。</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modelVersion</span><span class="token punctuation">&gt;</span></span>``4.0.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modelVersion</span><span class="token punctuation">&gt;</span></span>``\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````com.baeldung`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````myApp`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`````1.0.0`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`````\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用上述配置，我们的项目将存储在仓库的 <em>${repository_home}/com/baeldung/myApp/1.0.0/</em> 路径中。</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span><strong>8. 结论</strong></span></a></h2><p>在本文中，我们讨论了Maven构件及其坐标系统的概念。我们还学习了依赖和仓库等相关概念。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/0728087722c48c379bfd934fd8723735?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/06/maven-ebook-post-footer-1.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/06/maven-ebook-post-footer-icon.png" alt="img" loading="lazy"></p><p>OK</p>',62),o=[p];function c(l,i){return s(),n("div",null,o)}const u=a(e,[["render",c],["__file","2024-07-21-What Is an Apache Maven Artifact .html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-What%20Is%20an%20Apache%20Maven%20Artifact%20.html","title":"Apache Maven 构件是什么？","lang":"zh-CN","frontmatter":{"date":"2022-06-06T00:00:00.000Z","category":["Maven","Java"],"tag":["Maven Artifact","Build Tool"],"head":[["meta",{"name":"keywords","content":"Maven, Java, Build Tool, Artifact"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-What%20Is%20an%20Apache%20Maven%20Artifact%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Apache Maven 构件是什么？"}],["meta",{"property":"og:description","content":"Apache Maven 构件是什么？ 手动构建一个复杂项目相当繁琐。使用构建工具可以更容易地完成这项工作。众所周知，Java项目的主要构建工具之一是Maven。Maven帮助标准化应用程序的构建和部署。 在本教程中，我们将讨论Maven构件是什么以及它的关键元素是什么。我们还将查看Maven坐标、依赖管理，最后是Maven仓库。 1. 概述 我们可以..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T09:23:05.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Maven Artifact"}],["meta",{"property":"article:tag","content":"Build Tool"}],["meta",{"property":"article:published_time","content":"2022-06-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T09:23:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache Maven 构件是什么？\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/0728087722c48c379bfd934fd8723735?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/06/maven-ebook-post-footer-1.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2022/06/maven-ebook-post-footer-icon.png\\"],\\"datePublished\\":\\"2022-06-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T09:23:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Apache Maven 构件是什么？ 手动构建一个复杂项目相当繁琐。使用构建工具可以更容易地完成这项工作。众所周知，Java项目的主要构建工具之一是Maven。Maven帮助标准化应用程序的构建和部署。 在本教程中，我们将讨论Maven构件是什么以及它的关键元素是什么。我们还将查看Maven坐标、依赖管理，最后是Maven仓库。 1. 概述 我们可以..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"3. Maven构件是什么？","slug":"_3-maven构件是什么","link":"#_3-maven构件是什么","children":[]},{"level":2,"title":"4. Maven坐标","slug":"_4-maven坐标","link":"#_4-maven坐标","children":[{"level":3,"title":"4.1. groupId 元素","slug":"_4-1-groupid-元素","link":"#_4-1-groupid-元素","children":[]},{"level":3,"title":"4.2. artifactId 元素","slug":"_4-2-artifactid-元素","link":"#_4-2-artifactid-元素","children":[]},{"level":3,"title":"4.3. version 元素","slug":"_4-3-version-元素","link":"#_4-3-version-元素","children":[]},{"level":3,"title":"4.4. packaging 元素","slug":"_4-4-packaging-元素","link":"#_4-4-packaging-元素","children":[]},{"level":3,"title":"4.5. classifier 元素","slug":"_4-5-classifier-元素","link":"#_4-5-classifier-元素","children":[]}]},{"level":2,"title":"5. 发布版与快照版构件","slug":"_5-发布版与快照版构件","link":"#_5-发布版与快照版构件","children":[{"level":3,"title":"5.1. 发布版构件","slug":"_5-1-发布版构件","link":"#_5-1-发布版构件","children":[]},{"level":3,"title":"5.2. 快照版构件","slug":"_5-2-快照版构件","link":"#_5-2-快照版构件","children":[]}]},{"level":2,"title":"6. 依赖管理","slug":"_6-依赖管理","link":"#_6-依赖管理","children":[]},{"level":2,"title":"7. Maven仓库","slug":"_7-maven仓库","link":"#_7-maven仓库","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1721553785000,"updatedTime":1721553785000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.49,"words":1947},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-What Is an Apache Maven Artifact .md","localizedDate":"2022年6月6日","excerpt":"\\n<p>手动构建一个复杂项目相当繁琐。使用构建工具可以更容易地完成这项工作。众所周知，Java项目的主要构建工具之一是Maven。Maven帮助标准化应用程序的构建和部署。</p>\\n<p>在本教程中，我们将讨论Maven构件是什么以及它的关键元素是什么。我们还将查看Maven坐标、依赖管理，最后是Maven仓库。</p>\\n<h2><strong>1. 概述</strong></h2>\\n<p>我们可以使用Maven构建和管理任何基于Java的项目。它提供了许多功能，例如：</p>\\n<ul>\\n<li>构建和编译</li>\\n<li>文档和报告</li>\\n<li>依赖管理</li>\\n<li>源代码管理</li>\\n<li>项目更新</li>\\n<li>部署</li>\\n</ul>","autoDesc":true}');export{u as comp,m as data};
