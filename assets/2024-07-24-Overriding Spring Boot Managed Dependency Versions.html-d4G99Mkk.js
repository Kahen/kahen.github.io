import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a}from"./app-BUAgDejY.js";const i={},r=a('<hr><h1 id="覆盖-spring-boot-管理的依赖版本" tabindex="-1"><a class="header-anchor" href="#覆盖-spring-boot-管理的依赖版本"><span>覆盖 Spring Boot 管理的依赖版本</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Spring Boot 是一个出色的框架，用于快速启动新项目。它帮助开发者快速创建新应用程序的一种方式是通过定义一套适合大多数用户的依赖项。</p><p>然而，在某些情况下，<strong>可能需要覆盖一个或多个依赖项的版本</strong>。</p><p>在本教程中，我们将探讨如何覆盖 Spring Boot 管理的依赖项及其版本。</p><h2 id="_2-spring-boot-材料清单-bom" tabindex="-1"><a class="header-anchor" href="#_2-spring-boot-材料清单-bom"><span>2. Spring Boot 材料清单 (BOM)</span></a></h2><p>让我们首先看看 Spring Boot 如何管理依赖项。简而言之，Spring Boot 使用材料清单 (BOM) 来定义依赖项和版本。</p><p>大多数 Spring Boot 项目继承自 spring-boot-starter-parent 构件，它本身又继承自 spring-boot-dependencies 构件。<strong>后者是 Spring Boot BOM</strong>，它只是一个包含大量 <em>dependencyManagement</em> 部分的 Maven POM 文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependencyManagement&gt;`\n    `&lt;dependencies&gt;`\n        ````&lt;dependency&gt;````\n            ...\n        ````&lt;/dependency&gt;````\n        ````&lt;dependency&gt;````\n            ...\n        ````&lt;/dependency&gt;````\n    `&lt;/dependencies&gt;`\n`&lt;/dependencyManagement&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过使用 Maven 的 <em>dependencyManagement</em>，<strong>BOM 可以指定如果我们的应用程序选择使用它们，应使用的默认库版本</strong>。让我们看一个例子。</p><p>Spring Boot BOM 中的一个条目如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>````&lt;dependency&gt;````\n    ``&lt;groupId&gt;``org.apache.activemq``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``activemq-amqp``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``${activemq.version}``&lt;/version&gt;``\n````&lt;/dependency&gt;````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这意味着项目中依赖于 ActiveMQ 的任何构件都将默认使用此版本。</p><p>还请注意，<strong>版本是使用属性占位符指定的</strong>。这是 Spring Boot BOM 中的常见做法，它在自身的 <em>properties</em> 部分提供此属性及其他属性的值。</p><p>现在我们已经了解了 Spring Boot 如何管理依赖版本，让我们看看如何覆盖它们。</p><h3 id="_3-1-maven" tabindex="-1"><a class="header-anchor" href="#_3-1-maven"><span>3.1. Maven</span></a></h3><p>对于 Maven，我们有两种方法可以覆盖 Spring Boot 管理的依赖项。首先，对于 Spring Boot BOM 使用属性占位符指定版本的任何依赖项，<strong>我们只需要在我们的项目 POM 中设置该属性</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;properties&gt;`\n    `&lt;activemq.version&gt;`5.16.3`&lt;/activemq.version&gt;`\n`&lt;/properties&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将导致使用 <em>activemq.version</em> 属性的任何依赖项使用我们指定的版本，而不是 Spring Boot BOM 中的版本。</p><p>此外，如果版本在 BOM 中的 <em>dependency</em> 标签中明确指定而不是作为占位符，则我们可以简单地在我们的项目依赖项条目中明确覆盖 <em>version</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>````&lt;dependency&gt;````\n    ``&lt;groupId&gt;``org.apache.activemq``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``activemq-amqp``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``5.16.3``&lt;/version&gt;``\n````&lt;/dependency&gt;````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-gradle" tabindex="-1"><a class="header-anchor" href="#_3-2-gradle"><span>3.2. Gradle</span></a></h3><p><strong>Gradle 需要一个插件来遵守 Spring Boot BOM 的依赖管理</strong>。因此，要开始，我们必须包含插件并导入 BOM：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>apply plugin: &quot;io.spring.dependency-management&quot;\ndependencyManagement {\n    imports {\n        mavenBom &#39;io.spring.platform:platform-bom:2.5.5&#39;\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，如果我们想覆盖特定依赖项的版本，我们只需要将 BOM 中的相应属性指定为 Gradle <em>ext</em> 属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ext[&#39;activemq.version&#39;] = &#39;5.16.3&#39;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果没有 BOM 中的属性可以覆盖，我们总是可以在声明依赖项时直接指定版本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>compile &#39;org.apache.activemq:activemq-amqp:5.16.3&#39;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-3-警告" tabindex="-1"><a class="header-anchor" href="#_3-3-警告"><span>3.3. 警告</span></a></h3><p>这里值得提及几个警告。</p><p>首先，重要的是要记住，Spring Boot 是使用其 BOM 中指定的库版本构建和测试的。<strong>每次我们指定不同的库版本时，都有引入不兼容的风险</strong>。因此，每次我们偏离标准依赖版本时，都必须测试我们的应用程序。</p><p>另外，请记住，<strong>这些提示仅适用于我们使用 Spring Boot 材料清单 (BOM)</strong>。对于 Maven，这意味着使用 Spring Boot 父项目。对于 Gradle，这意味着使用 Spring 依赖插件。</p><h2 id="_4-查找依赖版本" tabindex="-1"><a class="header-anchor" href="#_4-查找依赖版本"><span>4. 查找依赖版本</span></a></h2><p>我们已经看到了 Spring Boot 如何管理依赖版本以及如何覆盖它们。在这一部分中，我们将看看如何查找项目正在使用的库的版本。<strong>这对于识别库版本并确认我们对项目的任何覆盖都得到满足非常有用</strong>。</p><h3 id="_4-1-maven" tabindex="-1"><a class="header-anchor" href="#_4-1-maven"><span>4.1. Maven</span></a></h3><p>Maven 提供了一个目标，我们可以使用它来显示所有依赖项及其版本的列表。例如，如果我们运行以下命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mvn dependency:tree\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们应该看到类似于以下的输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[INFO] com.baeldung:dependency-demo:jar:0.0.1-SNAPSHOT\n[INFO] +- org.springframework.boot:spring-boot-starter-web:jar:2.5.7-SNAPSHOT:compile\n[INFO] |  +- org.springframework.boot:spring-boot-starter:jar:2.5.7-SNAPSHOT:compile\n[INFO] |  |  +- org.springframework.boot:spring-boot:jar:2.5.7-SNAPSHOT:compile\n[INFO] |  |  +- org.springframework.boot:spring-boot-autoconfigure:jar:2.5.7-SNAPSHOT:compile\n[INFO] |  |  +- org.springframework.boot:spring-boot-starter-logging:jar:2.5.7-SNAPSHOT:compile\n[INFO] |  |  |  +- ch.qos.logback:logback-classic:jar:1.2.6:compile\n[INFO] |  |  |  |  \\- ch.qos.logback:logback-core:jar:1.2.6:compile\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出显示了项目的所有构件和版本。<strong>这些依赖项以树形结构呈现</strong>，便于识别每个构件如何被导入到项目中。</p><p>在上面的例子中，<em>logback-classic</em> 构件是 <em>spring-boot-starter-logging</em> 库的依赖项，该库本身是 <em>spring-boot-starter</em> 模块的依赖项。因此，我们可以沿着树形结构回到我们的顶级项目。</p><h3 id="_4-2-gradle" tabindex="-1"><a class="header-anchor" href="#_4-2-gradle"><span>4.2. Gradle</span></a></h3><p>Gradle 提供了一个任务，生成类似的依赖树。例如，如果我们运行以下命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>gradle dependencies\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们将获得类似于以下的输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>compileClasspath - Compile classpath for source set &#39;main&#39;.\n\\--- org.springframework.boot:spring-boot-starter-web -&gt; 1.3.8.RELEASE\n     +--- org.springframework.boot:spring-boot-starter:1.3.8.RELEASE\n     |    +--- org.springframework.boot:spring-boot:1.3.8.RELEASE\n     |    |    +--- org.springframework:spring-core:4.2.8.RELEASE\n     |    |    \\--- org.springframework:spring-context:4.2.8.RELEASE\n     |    |         +--- org.springframework:spring-aop:4.2.8.RELEASE\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就像 Maven 输出一样，我们可以轻松识别个构件被引入项目的原因以及使用的版本。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了 Spring Boot 如何管理依赖版本。我们还看到了如何在 Maven 和 Gradle 中覆盖这些依赖版本。最后，我们看到了如何验证这两种项目类型的依赖版本。</p>',50),d=[r];function s(o,l){return t(),n("div",null,d)}const c=e(i,[["render",s],["__file","2024-07-24-Overriding Spring Boot Managed Dependency Versions.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-24/2024-07-24-Overriding%20Spring%20Boot%20Managed%20Dependency%20Versions.html","title":"覆盖 Spring Boot 管理的依赖版本","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Boot","Maven"],"tag":["Spring Boot","Maven","Gradle"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Maven, Gradle, Dependency Management"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-24/2024-07-24-Overriding%20Spring%20Boot%20Managed%20Dependency%20Versions.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"覆盖 Spring Boot 管理的依赖版本"}],["meta",{"property":"og:description","content":"覆盖 Spring Boot 管理的依赖版本 1. 引言 Spring Boot 是一个出色的框架，用于快速启动新项目。它帮助开发者快速创建新应用程序的一种方式是通过定义一套适合大多数用户的依赖项。 然而，在某些情况下，可能需要覆盖一个或多个依赖项的版本。 在本教程中，我们将探讨如何覆盖 Spring Boot 管理的依赖项及其版本。 2. Sprin..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-24T22:52:52.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Maven"}],["meta",{"property":"article:tag","content":"Gradle"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-24T22:52:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"覆盖 Spring Boot 管理的依赖版本\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-24T22:52:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"覆盖 Spring Boot 管理的依赖版本 1. 引言 Spring Boot 是一个出色的框架，用于快速启动新项目。它帮助开发者快速创建新应用程序的一种方式是通过定义一套适合大多数用户的依赖项。 然而，在某些情况下，可能需要覆盖一个或多个依赖项的版本。 在本教程中，我们将探讨如何覆盖 Spring Boot 管理的依赖项及其版本。 2. Sprin..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. Spring Boot 材料清单 (BOM)","slug":"_2-spring-boot-材料清单-bom","link":"#_2-spring-boot-材料清单-bom","children":[{"level":3,"title":"3.1. Maven","slug":"_3-1-maven","link":"#_3-1-maven","children":[]},{"level":3,"title":"3.2. Gradle","slug":"_3-2-gradle","link":"#_3-2-gradle","children":[]},{"level":3,"title":"3.3. 警告","slug":"_3-3-警告","link":"#_3-3-警告","children":[]}]},{"level":2,"title":"4. 查找依赖版本","slug":"_4-查找依赖版本","link":"#_4-查找依赖版本","children":[{"level":3,"title":"4.1. Maven","slug":"_4-1-maven","link":"#_4-1-maven","children":[]},{"level":3,"title":"4.2. Gradle","slug":"_4-2-gradle","link":"#_4-2-gradle","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721861572000,"updatedTime":1721861572000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.52,"words":1355},"filePathRelative":"posts/baeldung/2024-07-24/2024-07-24-Overriding Spring Boot Managed Dependency Versions.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>覆盖 Spring Boot 管理的依赖版本</h1>\\n<h2>1. 引言</h2>\\n<p>Spring Boot 是一个出色的框架，用于快速启动新项目。它帮助开发者快速创建新应用程序的一种方式是通过定义一套适合大多数用户的依赖项。</p>\\n<p>然而，在某些情况下，<strong>可能需要覆盖一个或多个依赖项的版本</strong>。</p>\\n<p>在本教程中，我们将探讨如何覆盖 Spring Boot 管理的依赖项及其版本。</p>\\n<h2>2. Spring Boot 材料清单 (BOM)</h2>\\n<p>让我们首先看看 Spring Boot 如何管理依赖项。简而言之，Spring Boot 使用材料清单 (BOM) 来定义依赖项和版本。</p>","autoDesc":true}');export{c as comp,m as data};
