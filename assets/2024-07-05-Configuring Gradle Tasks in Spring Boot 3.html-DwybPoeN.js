import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as n,a as t}from"./app-bN4DcMMr.js";const i={},r=t(`<p>根据您提供的要求，我将直接翻译网页标题并给出相应的格式。由于我无法访问外部链接以获取实际的日期、类别、标签和SEO内容，我将使用示例值来展示格式。您可以根据实际网页内容替换这些值。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>---
date: 2024-07-05
category:
  - Spring Boot
  - Gradle
tag:
  - Configuration
  - Tasks
head:
  - - meta
    - name: keywords
      content: Spring Boot, Gradle, Configuration, Tasks
------
# Spring Boot 3与Gradle配置任务
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，这只是一个示例，实际的翻译和内容应基于网页的实际内容。您可以使用这个格式作为模板，并在获取实际信息后进行相应的替换。## 1. 引言</p><p>Spring Boot Gradle插件为Gradle提供了Spring Boot支持。它允许我们打包可执行的JAR或war归档文件，运行Spring Boot应用程序，并使用由_spring-boot-dependencies_提供的依赖管理。Spring Boot 3 Gradle插件需要Gradle 7.x（7.5或更高版本）或8.x，并可以与Gradle的配置缓存一起使用。</p><p>在本教程中，我们将学习Spring Boot 3 Gradle插件任务配置。Spring Boot 3 Gradle插件中有几个Gradle任务。我们将使用一个简单的Spring Boot应用程序来演示配置一些任务。为了演示目的，我们不会向我们的Spring Boot应用程序添加任何安全或数据功能。现在，让我们深入定义和配置任务的更多细节。</p><h2 id="_2-配置-bootjar-gradle任务" tabindex="-1"><a class="header-anchor" href="#_2-配置-bootjar-gradle任务"><span>2. 配置_bootJar_ Gradle任务</span></a></h2><p>在Spring Boot 3 Gradle插件中，Gradle任务已经比以往版本有所改进。一些常见的Gradle任务包括_bootJar_、<em>bootWar</em>、<em>bootRun_和_bootBuildImage</em>。让我们深入了解_bootJar_并看看如何配置_bootJar_任务。</p><p>要配置_bootJar_任务，我们必须<strong>在我们的_build.gradle_文件中添加一个_bootJar_配置块</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>tasks.named(&quot;bootJar&quot;) {
    launchScript{
        enabled = true
    }
    enabled = true
    archiveFileName = &quot;bael-6094.\${archiveExtension.get()}&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个配置块为_bootJar_任务设置了几个选项。</p><p><em>property launchScript_生成一个打包在结果JAR中的启动脚本。这允许像运行任何其他命令一样运行JAR。例如，我们可以不显式使用_java -jar <code>&lt;jarname&gt;</code></em>，而是使用_jarname_或_./jarname_来运行JAR。要禁用_bootjar_任务，我们将属性_enabled_设置为_false_。默认情况下它被设置为_true_。</p><p>我们可以<strong>使用_archiveFileName_属性定义输出JAR的名称</strong>。现在，我们已经准备好运行_bootJar_任务了：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>gradlew bootJar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将在_build/libs_文件夹中生成一个完全可执行的JAR。在我们的例子中，JAR的名称将是_bael-6094.jar_。</p><h2 id="_3-分层jar生成" tabindex="-1"><a class="header-anchor" href="#_3-分层jar生成"><span>3. 分层JAR生成</span></a></h2><p>Spring Boot Gradle插件提供支持构建分层JAR。这有助于减少内存使用并促进关注点分离。</p><p>让我们配置_bootJar_任务以使用分层架构。我们将我们的JAR分为两个层，一个_application_层和一个_springBoot_层：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>bootJar {
    layered {
        enabled = true
        application {
            layer = &#39;application&#39;
            dependencies {
                // 在application层中添加任何应该包含的依赖项
            }
        }
        springBoot {
            layer = &#39;spring-boot&#39;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，分层特性被启用，并且<strong>定义了两个层：_application_层和_springBoot_层</strong>。_application_层包含应用程序代码和任何指定的依赖项，而_springBoot_层包含Spring Boot框架及其依赖项。</p><p>接下来，让我们使用_bootJar_任务构建我们的Spring Boot应用程序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>./gradlew bootJar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将在_build/libs_目录中创建一个名为_{projectName}-{projectVersion}-layers.jar_的分层JAR文件。</p><p>通过在分层架构中将应用程序代码与Spring Boot框架代码分开，我们获得了更快的启动时间和更低的内存使用。此外，正如我们的分层JAR文件中，应用程序和框架有单独的层。因此，我们可以在多个应用程序之间共享框架层。这导致代码重复和资源的减少。</p><h2 id="_4-配置-bootbuildimage-任务" tabindex="-1"><a class="header-anchor" href="#_4-配置-bootbuildimage-任务"><span>4. 配置_bootBuildImage_任务</span></a></h2><p>现在让我们使用_bootBuildImage_任务来构建我们的Docker镜像。<strong>新插件使用Cloud Native Buildpacks (CNB)创建OCI镜像</strong>。</p><p><em>bootBuildImage_任务<strong>需要访问一个_docker_守护进程</strong>。它将通过默认的本地连接与Docker守护进程通信。这在所有支持的平台上与Docker Engine一起工作，无需任何特定配置。我们可以使用诸如_DOCKER_HOST</em>、<em>DOCKER_TLS_VERIFY</em>、_DOCKER_CERT_PATH_等环境变量来更改默认设置。此外，我们还可以使用插件配置不同的属性。</p><p>让我们在_build.gradle_中添加一个典型的_bootBuildImage_任务，并自定义配置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>tasks.named(&quot;bootBuildImage&quot;) {
    imageName = &#39;bael-6094:latest&#39;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们运行_bootBuildImage_命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>gradlew.bat bootBuildImage
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们确保我们的_docker_服务在我们的操作系统上运行。Docker适用于所有主要操作系统，无论是Windows、Linux还是macOS。运行_bootBuildImage_任务的结果，我们会在我们的Docker环境中得到一个镜像。让我们列出我们本地环境中可用的Docker镜像，以验证我们新构建的镜像：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们准备运行我们的容器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run -p 8080:8080 bael-6094:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>_p 8080:8080_将我们的主机端口8080映射到容器端口8080。默认情况下，Spring Boot在容器内运行应用程序的端口为8080，并且容器将其暴露给外部映射。_bootBuildImage_任务中还有许多其他配置选项，我们可以使用它们来实现不同的功能。</p><p>现在让我们在浏览器中导航到_http://localhost:8080/hello_来验证输出。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们介绍了一些Spring Boot 3 Gradle插件任务。这些任务比之前的版本有许多改进。像往常一样，文章的代码可以在GitHub上找到。</p><p>OK</p>`,39),d=[r];function l(o,s){return n(),a("div",null,d)}const u=e(i,[["render",l],["__file","2024-07-05-Configuring Gradle Tasks in Spring Boot 3.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Configuring%20Gradle%20Tasks%20in%20Spring%20Boot%203.html","title":"","lang":"zh-CN","frontmatter":{"description":"根据您提供的要求，我将直接翻译网页标题并给出相应的格式。由于我无法访问外部链接以获取实际的日期、类别、标签和SEO内容，我将使用示例值来展示格式。您可以根据实际网页内容替换这些值。 请注意，这只是一个示例，实际的翻译和内容应基于网页的实际内容。您可以使用这个格式作为模板，并在获取实际信息后进行相应的替换。## 1. 引言 Spring Boot Gra...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Configuring%20Gradle%20Tasks%20in%20Spring%20Boot%203.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:description","content":"根据您提供的要求，我将直接翻译网页标题并给出相应的格式。由于我无法访问外部链接以获取实际的日期、类别、标签和SEO内容，我将使用示例值来展示格式。您可以根据实际网页内容替换这些值。 请注意，这只是一个示例，实际的翻译和内容应基于网页的实际内容。您可以使用这个格式作为模板，并在获取实际信息后进行相应的替换。## 1. 引言 Spring Boot Gra..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T01:55:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:modified_time","content":"2024-07-05T01:55:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-07-05T01:55:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"2. 配置_bootJar_ Gradle任务","slug":"_2-配置-bootjar-gradle任务","link":"#_2-配置-bootjar-gradle任务","children":[]},{"level":2,"title":"3. 分层JAR生成","slug":"_3-分层jar生成","link":"#_3-分层jar生成","children":[]},{"level":2,"title":"4. 配置_bootBuildImage_任务","slug":"_4-配置-bootbuildimage-任务","link":"#_4-配置-bootbuildimage-任务","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720144531000,"updatedTime":1720144531000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.69,"words":1406},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Configuring Gradle Tasks in Spring Boot 3.md","localizedDate":"2024年7月5日","excerpt":"<p>根据您提供的要求，我将直接翻译网页标题并给出相应的格式。由于我无法访问外部链接以获取实际的日期、类别、标签和SEO内容，我将使用示例值来展示格式。您可以根据实际网页内容替换这些值。</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>---\\ndate: 2024-07-05\\ncategory:\\n  - Spring Boot\\n  - Gradle\\ntag:\\n  - Configuration\\n  - Tasks\\nhead:\\n  - - meta\\n    - name: keywords\\n      content: Spring Boot, Gradle, Configuration, Tasks\\n------\\n# Spring Boot 3与Gradle配置任务\\n</code></pre></div>","autoDesc":true}');export{u as comp,g as data};
