import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-bN4DcMMr.js";const e={},i=t('<hr><h1 id="解决spring-boot中-没有主清单属性-的问题" tabindex="-1"><a class="header-anchor" href="#解决spring-boot中-没有主清单属性-的问题"><span>解决Spring Boot中“没有主清单属性”的问题</span></a></h1><p>每当我们在Spring Boot可执行jar中遇到“没有主清单属性”的消息时，这是因为我们缺少了MANIFEST.MF文件中的Main-Class元数据属性声明，该文件位于META-INF文件夹下。</p><p>在这篇简短的教程中，我们将重点讨论这个问题的原因以及如何解决它。</p><h2 id="spring-boot启动器简介" tabindex="-1"><a class="header-anchor" href="#spring-boot启动器简介"><span>Spring Boot启动器简介</span></a></h2><p>对最常见的Spring Boot启动器进行快速概述，以及如何在现实世界项目中使用它们的示例。</p><h2 id="问题发生时" tabindex="-1"><a class="header-anchor" href="#问题发生时"><span>问题发生时</span></a></h2><p>通常情况下，如果我们从Spring Initializr获取我们的pom，我们不会有任何问题。但是，如果我们通过向我们的pom.xml添加spring-boot-starter-parent手动构建我们的项目，我们可能会遇到这个问题。我们可以通过尝试进行jar的清洁构建来复制它：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn clean package\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当我们运行jar时，我们将遇到错误：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-jar</span> target<span class="token punctuation">\\</span>spring-boot-artifacts-2.jar\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>no main manifest attribute, in target\\spring-boot-artifacts-2.jar\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这个例子中，MANIFEST.MF文件的内容是：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>Manifest-Version: 1.0\nArchiver-Version: Plexus Archiver\nCreated-By: Apache Maven 3.6.3\nBuilt-By: Baeldung\nBuild-Jdk: 11.0.13\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用maven插件进行修复" tabindex="-1"><a class="header-anchor" href="#使用maven插件进行修复"><span>使用Maven插件进行修复</span></a></h2><h3 id="_3-1-添加插件" tabindex="-1"><a class="header-anchor" href="#_3-1-添加插件"><span>3.1 添加插件</span></a></h3><p>在这种情况下，最常见的问题是我们错过了在pom.xml文件中添加spring-boot-maven-plugin声明。</p><p>我们将在我们的pom.xml中添加插件定义，Main-Class声明在plugins标签下的configuration中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`org.springframework.boot`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`spring-boot-maven-plugin`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mainClass</span><span class="token punctuation">&gt;</span></span>`com.baeldung.demo.DemoApplication`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mainClass</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>layout</span><span class="token punctuation">&gt;</span></span>`JAR`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>layout</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，<strong>这可能不足以解决我们的问题</strong>。即使在重建并运行我们的jar之后，我们可能仍然会收到“没有主清单属性”的消息。</p><p>让我们看看我们有哪些额外的配置和替代方案来解决这个问题。</p><h3 id="_3-2-maven插件执行目标" tabindex="-1"><a class="header-anchor" href="#_3-2-maven插件执行目标"><span>3.2 Maven插件执行目标</span></a></h3><p>让我们在spring-boot-maven-plugin声明后的configuration标签中添加repackage目标：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>executions</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>`repackage`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>executions</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-maven属性和内联命令执行目标" tabindex="-1"><a class="header-anchor" href="#_3-3-maven属性和内联命令执行目标"><span>3.3 Maven属性和内联命令执行目标</span></a></h3><p>或者，<strong>将start-class属性添加到我们的pom.xml文件的properties标签中，可以在构建过程中提供更多的灵活性</strong>：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>start-class</span><span class="token punctuation">&gt;</span></span>`com.baeldung.demo.DemoApplication`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>start-class</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们需要使用Maven内联命令spring-boot:repackage执行目标来构建jar：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn package spring-boot:repackage\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="检查manifest-mf文件内容" tabindex="-1"><a class="header-anchor" href="#检查manifest-mf文件内容"><span>检查MANIFEST.MF文件内容</span></a></h2><p>让我们应用我们的解决方案，构建jar，然后检查MANIFEST.MF文件。</p><p>我们将注意到Main-Class和Start-Class属性的存在：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>Manifest-Version: 1.0\nArchiver-Version: Plexus Archiver\nCreated-By: Apache Maven 3.6.3\nBuilt-By: Baeldung\nBuild-Jdk: 11.0.13\nMain-Class: org.springframework.boot.loader.JarLauncher\nStart-Class: com.baeldung.demo.DemoApplication\nSpring-Boot-Version: 2.7.5\nSpring-Boot-Classes: BOOT-INF/classes/\nSpring-Boot-Lib: BOOT-INF/lib/\nSpring-Boot-Classpath-Index: BOOT-INF/classpath.idx\nSpring-Boot-Layers-Index: BOOT-INF/layers.idx\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在执行jar，不再出现“没有主清单属性”的消息，应用程序可以运行。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们学习了如何解决执行Spring Boot可执行jar时出现的“没有主清单属性”消息。</p><p>我们展示了这个问题是如何来自手动创建的pom.xml文件的，以及如何添加和配置Spring Maven插件来修复它。</p><p>如常，示例代码可在GitHub上找到。</p>',38),p=[i];function l(o,c){return s(),a("div",null,p)}const u=n(e,[["render",l],["__file","2024-07-11-Fixing the No Main Manifest Attribute in Spring Boot.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Fixing%20the%20No%20Main%20Manifest%20Attribute%20in%20Spring%20Boot.html","title":"解决Spring Boot中“没有主清单属性”的问题","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Boot","Maven"],"tag":["Spring Boot","Maven","Executable JAR"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Maven, Executable JAR, Main Manifest Attribute"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Fixing%20the%20No%20Main%20Manifest%20Attribute%20in%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"解决Spring Boot中“没有主清单属性”的问题"}],["meta",{"property":"og:description","content":"解决Spring Boot中“没有主清单属性”的问题 每当我们在Spring Boot可执行jar中遇到“没有主清单属性”的消息时，这是因为我们缺少了MANIFEST.MF文件中的Main-Class元数据属性声明，该文件位于META-INF文件夹下。 在这篇简短的教程中，我们将重点讨论这个问题的原因以及如何解决它。 Spring Boot启动器简介 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T07:40:00.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Maven"}],["meta",{"property":"article:tag","content":"Executable JAR"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T07:40:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"解决Spring Boot中“没有主清单属性”的问题\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T07:40:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"解决Spring Boot中“没有主清单属性”的问题 每当我们在Spring Boot可执行jar中遇到“没有主清单属性”的消息时，这是因为我们缺少了MANIFEST.MF文件中的Main-Class元数据属性声明，该文件位于META-INF文件夹下。 在这篇简短的教程中，我们将重点讨论这个问题的原因以及如何解决它。 Spring Boot启动器简介 ..."},"headers":[{"level":2,"title":"Spring Boot启动器简介","slug":"spring-boot启动器简介","link":"#spring-boot启动器简介","children":[]},{"level":2,"title":"问题发生时","slug":"问题发生时","link":"#问题发生时","children":[]},{"level":2,"title":"使用Maven插件进行修复","slug":"使用maven插件进行修复","link":"#使用maven插件进行修复","children":[{"level":3,"title":"3.1 添加插件","slug":"_3-1-添加插件","link":"#_3-1-添加插件","children":[]},{"level":3,"title":"3.2 Maven插件执行目标","slug":"_3-2-maven插件执行目标","link":"#_3-2-maven插件执行目标","children":[]},{"level":3,"title":"3.3 Maven属性和内联命令执行目标","slug":"_3-3-maven属性和内联命令执行目标","link":"#_3-3-maven属性和内联命令执行目标","children":[]}]},{"level":2,"title":"检查MANIFEST.MF文件内容","slug":"检查manifest-mf文件内容","link":"#检查manifest-mf文件内容","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720683600000,"updatedTime":1720683600000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.8,"words":840},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Fixing the No Main Manifest Attribute in Spring Boot.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>解决Spring Boot中“没有主清单属性”的问题</h1>\\n<p>每当我们在Spring Boot可执行jar中遇到“没有主清单属性”的消息时，这是因为我们缺少了MANIFEST.MF文件中的Main-Class元数据属性声明，该文件位于META-INF文件夹下。</p>\\n<p>在这篇简短的教程中，我们将重点讨论这个问题的原因以及如何解决它。</p>\\n<h2>Spring Boot启动器简介</h2>\\n<p>对最常见的Spring Boot启动器进行快速概述，以及如何在现实世界项目中使用它们的示例。</p>\\n<h2>问题发生时</h2>\\n<p>通常情况下，如果我们从Spring Initializr获取我们的pom，我们不会有任何问题。但是，如果我们通过向我们的pom.xml添加spring-boot-starter-parent手动构建我们的项目，我们可能会遇到这个问题。我们可以通过尝试进行jar的清洁构建来复制它：</p>","autoDesc":true}');export{u as comp,g as data};
