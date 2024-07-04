import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,a as t}from"./app-BOJj4F50.js";const i={},l=t('<hr><h1 id="apache-maven-中-mvn-install-与-mvn-verify-的区别" tabindex="-1"><a class="header-anchor" href="#apache-maven-中-mvn-install-与-mvn-verify-的区别"><span>Apache Maven 中 mvn install 与 mvn verify 的区别</span></a></h1><p>Apache Maven 是一个强大的构建管理工具，它为项目构建生命周期提供了结构化的方式。Maven 构建由生命周期组成，这些生命周期明确定义了项目的构建和分发方式。</p><p>在构建过程中，两个非常有用的命令是 <em>mvn install</em> 和 <em>mvn verify</em>。在本教程中，我们将比较和对比这两个命令，理解它们之间的区别。</p><h2 id="_2-maven-生命周期" tabindex="-1"><a class="header-anchor" href="#_2-maven-生命周期"><span>2. Maven 生命周期</span></a></h2><p>Maven 定义了三个标准生命周期 — 清洁（clean）、默认（default）和站点（site） — 每个都有不同的目的：</p><ul><li>清洁（clean）生命周期负责清理项目。</li><li>默认（default）生命周期用于构建和部署。</li><li>站点（site）生命周期用于创建项目的网站文档。</li></ul><p>每个生命周期由阶段组成，每个阶段代表生命周期的一个阶段。</p><h3 id="_2-1-maven-的默认生命周期" tabindex="-1"><a class="header-anchor" href="#_2-1-maven-的默认生命周期"><span>2.1. Maven 的默认生命周期</span></a></h3><p>默认生命周期处理构建过程，从项目编译开始到部署构件结束。它由 23 个阶段组成，下面是六个主要阶段：</p><ol><li>验证（validate）：验证项目以确保所有必要的信息都可用于构建。</li><li>编译（compile）：源代码被编译成字节码。</li><li>测试（test）：执行单元测试以确保代码的正确性。</li><li>打包（package）：编译后的代码被打包成 JAR 或 WAR 文件，具体取决于项目类型。</li><li>验证（verify）：运行额外的验证检查，通常是集成测试或插件指定的测试。</li><li>安装（install）：打包后的构件被安装到本地 Maven 仓库 <em>~/.m2/repository</em> 中，使其对同一台机器上的其他项目可用。</li></ol><p><strong>运行命令时，我们只需要调用我们想要执行的最后一个构建阶段。</strong> 例如，运行 <em>mvn test</em> 将依次执行验证（validate）、编译（compile）和测试（test）阶段。</p><h2 id="_3-设置" tabindex="-1"><a class="header-anchor" href="#_3-设置"><span>3. 设置</span></a></h2><p>在我们的 <em>pom.xml</em> 中，让我们导入 <em>maven-surefire-plugin</em> 的依赖，该插件在测试阶段运行单元测试时需要：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;plugin&gt;``\n    ``&lt;groupId&gt;``org.apache.maven.plugins``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``maven-surefire-plugin``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``3.1.2``&lt;/version&gt;``\n``&lt;/plugin&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们也导入并配置 <em>maven-failsafe-plugin</em> 的依赖，将集成测试（integration-test）目标绑定到集成测试阶段，并将验证（verify）目标绑定到验证阶段：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;plugin&gt;``\n    ``&lt;groupId&gt;``org.apache.maven.plugins``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``maven-failsafe-plugin``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``3.1.2``&lt;/version&gt;``\n    `&lt;executions&gt;`\n        `&lt;execution&gt;`\n            `&lt;goals&gt;`\n                ``&lt;goal&gt;``integration-test``&lt;/goal&gt;``\n                ``&lt;goal&gt;``verify``&lt;/goal&gt;``\n            `&lt;/goals&gt;`\n        `&lt;/execution&gt;`\n    `&lt;/executions&gt;`\n``&lt;/plugin&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们编写一个简单的 Java 程序，当执行时返回一个 <em>String</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class CourseApp {\n    String getCourse() {\n        return &quot;Baeldung Spring Masterclass&quot;;\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将定义一个单元测试，它将作为测试阶段的一部分执行：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid whenGetCourse_ThenCourseShouldBePresent() {\n    CourseApp courseApp = new CourseApp();\n\n    assertEquals(&quot;Baeldung Spring Masterclass&quot;, courseApp.getCourse());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似地，一个简单的集成测试将作为验证阶段的集成测试目标的一部分执行。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenIntegrationTest_whenGetCourse_ThenCourseShouldBePresent() {\n    CourseApp courseApp = new CourseApp();\n\n    assertEquals(&quot;Baeldung Spring Masterclass&quot;, courseApp.getCourse());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-maven-验证阶段" tabindex="-1"><a class="header-anchor" href="#_4-maven-验证阶段"><span>4. Maven 验证阶段</span></a></h2><p><em>mvn verify</em> 命令触发五个阶段：验证（validate）、编译（compile）、测试（test）、打包（package）和验证（verify）。验证阶段旨在用于验证项目的完整性和质量。</p><p>由于我们使用 <em>maven-failsafe-plugin</em> 将验证阶段绑定到集成测试（integration-test）目标，我们的集成测试将运行。<strong>只有当单元测试和集成测试都通过时，Maven 才认为项目已验证</strong>：</p><p>通过执行验证阶段，我们可以确保我们的项目在打包成构件并分发之前，包括集成测试在内的彻底测试。这个阶段可以帮助我们维护应用程序的可靠性和质量。</p><h2 id="_5-maven-安装阶段" tabindex="-1"><a class="header-anchor" href="#_5-maven-安装阶段"><span>5. Maven 安装阶段</span></a></h2><p>另一方面，<em>mvn install</em> 负责将项目的构件安装到本地仓库中。它触发安装（install）阶段，该阶段直接在验证（verify）之后。<strong>因此，它具有双重目的：验证我们的代码质量和在本地安装我们的构件</strong>。</p><p>当我们运行 <em>mvn install</em> 时，Maven 除了执行验证阶段的所有先前步骤外，还执行安装阶段：</p><p>这在处理彼此依赖的多个项目时特别有用，因为它避免了手动在项目之间复制 JAR 文件。</p><h2 id="_6-mvn-install-和-mvn-verify-之间的区别" tabindex="-1"><a class="header-anchor" href="#_6-mvn-install-和-mvn-verify-之间的区别"><span>6. <em>mvn install</em> 和 <em>mvn verify</em> 之间的区别</span></a></h2><p>虽然 <em>mvn install</em> 和 <em>mvn verify</em> 都有助于默认生命周期并共享共同的阶段，但它们服务于略有不同的目的：</p><ul><li><em>mvn verify</em> 专注于执行超出简单单元测试的质量检查，如集成测试和通过插件配置的自定义检查。当目标是确保项目满足特定的质量标准时，建议使用它。</li><li><em>mvn install</em> 主要用于将项目的构件安装到本地仓库中。它通常在开发中使用，用于在同一台机器上的项目之间共享构件。</li></ul><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>了解不同的 Maven 生命周期和阶段对于在 Maven 驱动的构建环境中进行有效的项目管理和协作至关重要。</p><p>在本文中，我们讨论了 <em>mvn install</em> 是本地开发和依赖管理的首选命令。相比之下，我们看到了如何使用 <em>mvn verify</em> 来对我们的项目进行完整性和质量检查。</p><p>如常，代码可在 GitHub 上获取。</p>',38),s=[l];function v(r,m){return a(),n("div",null,s)}const c=e(i,[["render",v],["__file","2024-06-23-Difference Between mvn install and mvn verify.html.vue"]]),o=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Difference%20Between%20mvn%20install%20and%20mvn%20verify.html","title":"Apache Maven 中 mvn install 与 mvn verify 的区别","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Maven","构建工具"],"tag":["mvn install","mvn verify"],"head":[["meta",{"name":"keywords","content":"Maven, mvn install, mvn verify, 构建生命周期"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Difference%20Between%20mvn%20install%20and%20mvn%20verify.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Apache Maven 中 mvn install 与 mvn verify 的区别"}],["meta",{"property":"og:description","content":"Apache Maven 中 mvn install 与 mvn verify 的区别 Apache Maven 是一个强大的构建管理工具，它为项目构建生命周期提供了结构化的方式。Maven 构建由生命周期组成，这些生命周期明确定义了项目的构建和分发方式。 在构建过程中，两个非常有用的命令是 mvn install 和 mvn verify。在本教程中..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T20:28:37.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"mvn install"}],["meta",{"property":"article:tag","content":"mvn verify"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T20:28:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache Maven 中 mvn install 与 mvn verify 的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T20:28:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Apache Maven 中 mvn install 与 mvn verify 的区别 Apache Maven 是一个强大的构建管理工具，它为项目构建生命周期提供了结构化的方式。Maven 构建由生命周期组成，这些生命周期明确定义了项目的构建和分发方式。 在构建过程中，两个非常有用的命令是 mvn install 和 mvn verify。在本教程中..."},"headers":[{"level":2,"title":"2. Maven 生命周期","slug":"_2-maven-生命周期","link":"#_2-maven-生命周期","children":[{"level":3,"title":"2.1. Maven 的默认生命周期","slug":"_2-1-maven-的默认生命周期","link":"#_2-1-maven-的默认生命周期","children":[]}]},{"level":2,"title":"3. 设置","slug":"_3-设置","link":"#_3-设置","children":[]},{"level":2,"title":"4. Maven 验证阶段","slug":"_4-maven-验证阶段","link":"#_4-maven-验证阶段","children":[]},{"level":2,"title":"5. Maven 安装阶段","slug":"_5-maven-安装阶段","link":"#_5-maven-安装阶段","children":[]},{"level":2,"title":"6. mvn install 和 mvn verify 之间的区别","slug":"_6-mvn-install-和-mvn-verify-之间的区别","link":"#_6-mvn-install-和-mvn-verify-之间的区别","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719174517000,"updatedTime":1719174517000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.47,"words":1342},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Difference Between mvn install and mvn verify.md","localizedDate":"2024年6月24日","excerpt":"<hr>\\n<h1>Apache Maven 中 mvn install 与 mvn verify 的区别</h1>\\n<p>Apache Maven 是一个强大的构建管理工具，它为项目构建生命周期提供了结构化的方式。Maven 构建由生命周期组成，这些生命周期明确定义了项目的构建和分发方式。</p>\\n<p>在构建过程中，两个非常有用的命令是 <em>mvn install</em> 和 <em>mvn verify</em>。在本教程中，我们将比较和对比这两个命令，理解它们之间的区别。</p>\\n<h2>2. Maven 生命周期</h2>\\n<p>Maven 定义了三个标准生命周期 — 清洁（clean）、默认（default）和站点（site） — 每个都有不同的目的：</p>","autoDesc":true}');export{c as comp,o as data};
