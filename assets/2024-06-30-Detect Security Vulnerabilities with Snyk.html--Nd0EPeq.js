import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,a as t}from"./app-D1jsmMBg.js";const i={},l=t(`<hr><h1 id="使用snyk检测安全漏洞-baeldung" tabindex="-1"><a class="header-anchor" href="#使用snyk检测安全漏洞-baeldung"><span>使用Snyk检测安全漏洞 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在软件开发的快速变化领域中，确保强大的安全性是一个重要但通常棘手的任务。由于现代应用程序严重依赖开源库和依赖项，这些组件中潜藏的漏洞可能构成严重威胁。</p><p>这就是Snyk发挥作用的地方，它为开发人员提供了自动检测潜在易受攻击的代码或依赖项的工具。在本文中，我们将探讨其功能以及如何在Java项目的背景下使用它们。</p><h2 id="_2-snyk是什么" tabindex="-1"><a class="header-anchor" href="#_2-snyk是什么"><span>2. Snyk是什么？</span></a></h2><p>**Snyk是一个云原生安全平台，专注于识别和减轻开源软件组件和容器中的漏洞。**在我们深入使用特定功能之前，让我们看看本文将重点介绍的主要用途。</p><h3 id="_2-1-snyk开源" tabindex="-1"><a class="header-anchor" href="#_2-1-snyk开源"><span>2.1. Snyk开源</span></a></h3><p>Snyk开源通过分析我们的应用程序所依赖的库和包来扫描我们项目的依赖项。<strong>它将这些依赖项与已知漏洞的全面数据库进行比对。</strong> Snyk开源不仅指出漏洞，还提供可操作的补救指导。它建议可能的解决方案来解决漏洞，例如升级到安全版本或应用补丁。</p><h3 id="_2-2-snyk代码" tabindex="-1"><a class="header-anchor" href="#_2-2-snyk代码"><span>2.2. Snyk代码</span></a></h3><p>Snyk代码采用静态代码分析技术来审查源代码，识别安全漏洞和其他问题。它在不执行代码的情况下<strong>通过分析代码库中的结构、逻辑和模式来发现潜在问题</strong>。这包括来自已知安全数据库的漏洞，以及代码质量问题，如代码异味、潜在逻辑错误和配置错误。</p><h3 id="_2-3-集成" tabindex="-1"><a class="header-anchor" href="#_2-3-集成"><span>2.3. 集成</span></a></h3><p><strong>我们可以通过使用Snyk CLI按需或将其连接到版本控制系统</strong>（例如Git）来将Snyk集成到项目中。这种集成允许Snyk访问我们的代码库，并在代码更改时执行自动扫描。或者，我们可以使用构建系统（例如Gradle）的插件作为我们构建过程的一部分来执行扫描。</p><h2 id="_3-设置" tabindex="-1"><a class="header-anchor" href="#_3-设置"><span>3. 设置</span></a></h2><p>在我们深入使项目更安全之前，我们需要执行几个步骤来设置Snyk CLI及其与Snyk服务的连接。</p><h3 id="_3-1-创建账户" tabindex="-1"><a class="header-anchor" href="#_3-1-创建账户"><span>3.1. 创建账户</span></a></h3><p>**Snyk是一个云原生解决方案。我们将需要一个账户来使用它。**在撰写本文时，一个基本的Snyk账户，足以用于测试和小项目，是免费的。</p><h3 id="_3-2-安装cli" tabindex="-1"><a class="header-anchor" href="#_3-2-安装cli"><span>3.2. 安装CLI</span></a></h3><p>Snyk提供了一个命令行界面（CLI），允许我们从终端与Snyk服务交互。<strong>一旦我们安装了CLI应用程序，它只会连接到Snyk服务器，所有繁重的工作都将在云端发生。</strong></p><p>我们可以使用Node Package Manager（npm）全局安装CLI：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ npm install -g snyk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们也可以使用Snyk手册中描述的其他安装方法。</p><h3 id="_3-3-认证" tabindex="-1"><a class="header-anchor" href="#_3-3-认证"><span>3.3. 认证</span></a></h3><p>最后，我们需要进行认证，以便CLI知道应该连接到哪个账户：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ snyk auth
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-使用cli测试漏洞" tabindex="-1"><a class="header-anchor" href="#_4-使用cli测试漏洞"><span>4. 使用CLI测试漏洞</span></a></h2><p>Snyk CLI是由Snyk提供的工具，允许我们轻松连接到Snyk服务，并从命令行执行扫描。让我们来看看Snyk的两个基本功能：依赖项扫描和代码扫描。</p><h3 id="_4-1-依赖项扫描" tabindex="-1"><a class="header-anchor" href="#_4-1-依赖项扫描"><span>4.1. 依赖项扫描</span></a></h3><p>要使用Snyk CLI在我们的项目上运行依赖项扫描，我们可以简单地输入：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ snyk test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>此命令将分析您的项目的依赖项并识别任何问题。</strong> Snyk将提供一个详细的报告，显示漏洞、它们的严重级别和受影响的包：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[...]
包管理器：gradle
目标文件：build.gradle
项目名称：snyktest
开源：否
项目路径：[...]
许可证：已启用

✔ 测试了7个依赖项，未发现已知问题。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-代码扫描" tabindex="-1"><a class="header-anchor" href="#_4-2-代码扫描"><span>4.2. 代码扫描</span></a></h3><p>我们还可以在Snyk页面的设置中启用静态代码分析，并<strong>运行我们自己代码中的漏洞扫描</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ snyk code test
[...]

✔ 测试完成

组织：[...]
测试类型：静态代码分析
项目路径：[...]

摘要：

✔ 太棒了！未发现问题。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用gradle集成" tabindex="-1"><a class="header-anchor" href="#_5-使用gradle集成"><span>5. 使用Gradle集成</span></a></h2><p><strong>而不是使用Snyk CLI，我们可以使用Gradle插件并在构建过程中自动运行Snyk测试。</strong> 首先，我们需要将插件添加到_build.gradle_文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>plugins {
    id &quot;io.snyk.gradle.plugin.snykplugin&quot; version &quot;0.5&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们可以提供一些可选配置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>snyk {
    arguments = &#39;--all-sub-projects&#39;
    severity = &#39;low&#39;
    api = &#39;xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&#39;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，在大多数情况下，默认设置应该足够好。此外，如果我们之前使用CLI进行了认证，我们也不需要提供API密钥。最后，要运行测试，我们可以简单地输入：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ ./gradlew snyk-test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们还可以配置Gradle，使每次构建时都运行Snyk测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>tasks.named(&#39;build&#39;) {
    dependsOn tasks.named(&#39;snyk-test&#39;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，Snyk的免费版本每月可以运行的测试次数有限，因此每次构建都运行测试可能会浪费。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>Snyk代码是开发人员和组织提高应用程序安全性的有价值工具，它通过在开发生命周期的早期识别漏洞和代码质量问题。在本文中，我们学习了如何使用Snyk开源和代码功能扫描我们的项目以寻找可能的安全问题。此外，我们还探讨了如何将Snyk集成到Gradle构建系统中。</p>`,47),s=[l];function d(r,c){return a(),n("div",null,s)}const o=e(i,[["render",d],["__file","2024-06-30-Detect Security Vulnerabilities with Snyk.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Detect%20Security%20Vulnerabilities%20with%20Snyk.html","title":"使用Snyk检测安全漏洞 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Security"],"tag":["Snyk","Security","Java"],"head":[["meta",{"name":"keywords","content":"Java, Snyk, Security, Vulnerabilities, Code Analysis"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Detect%20Security%20Vulnerabilities%20with%20Snyk.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Snyk检测安全漏洞 | Baeldung"}],["meta",{"property":"og:description","content":"使用Snyk检测安全漏洞 | Baeldung 1. 概述 在软件开发的快速变化领域中，确保强大的安全性是一个重要但通常棘手的任务。由于现代应用程序严重依赖开源库和依赖项，这些组件中潜藏的漏洞可能构成严重威胁。 这就是Snyk发挥作用的地方，它为开发人员提供了自动检测潜在易受攻击的代码或依赖项的工具。在本文中，我们将探讨其功能以及如何在Java项目的背..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T23:53:35.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Snyk"}],["meta",{"property":"article:tag","content":"Security"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T23:53:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Snyk检测安全漏洞 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T23:53:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Snyk检测安全漏洞 | Baeldung 1. 概述 在软件开发的快速变化领域中，确保强大的安全性是一个重要但通常棘手的任务。由于现代应用程序严重依赖开源库和依赖项，这些组件中潜藏的漏洞可能构成严重威胁。 这就是Snyk发挥作用的地方，它为开发人员提供了自动检测潜在易受攻击的代码或依赖项的工具。在本文中，我们将探讨其功能以及如何在Java项目的背..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Snyk是什么？","slug":"_2-snyk是什么","link":"#_2-snyk是什么","children":[{"level":3,"title":"2.1. Snyk开源","slug":"_2-1-snyk开源","link":"#_2-1-snyk开源","children":[]},{"level":3,"title":"2.2. Snyk代码","slug":"_2-2-snyk代码","link":"#_2-2-snyk代码","children":[]},{"level":3,"title":"2.3. 集成","slug":"_2-3-集成","link":"#_2-3-集成","children":[]}]},{"level":2,"title":"3. 设置","slug":"_3-设置","link":"#_3-设置","children":[{"level":3,"title":"3.1. 创建账户","slug":"_3-1-创建账户","link":"#_3-1-创建账户","children":[]},{"level":3,"title":"3.2. 安装CLI","slug":"_3-2-安装cli","link":"#_3-2-安装cli","children":[]},{"level":3,"title":"3.3. 认证","slug":"_3-3-认证","link":"#_3-3-认证","children":[]}]},{"level":2,"title":"4. 使用CLI测试漏洞","slug":"_4-使用cli测试漏洞","link":"#_4-使用cli测试漏洞","children":[{"level":3,"title":"4.1. 依赖项扫描","slug":"_4-1-依赖项扫描","link":"#_4-1-依赖项扫描","children":[]},{"level":3,"title":"4.2. 代码扫描","slug":"_4-2-代码扫描","link":"#_4-2-代码扫描","children":[]}]},{"level":2,"title":"5. 使用Gradle集成","slug":"_5-使用gradle集成","link":"#_5-使用gradle集成","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719791615000,"updatedTime":1719791615000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.6,"words":1381},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Detect Security Vulnerabilities with Snyk.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>使用Snyk检测安全漏洞 | Baeldung</h1>\\n<h2>1. 概述</h2>\\n<p>在软件开发的快速变化领域中，确保强大的安全性是一个重要但通常棘手的任务。由于现代应用程序严重依赖开源库和依赖项，这些组件中潜藏的漏洞可能构成严重威胁。</p>\\n<p>这就是Snyk发挥作用的地方，它为开发人员提供了自动检测潜在易受攻击的代码或依赖项的工具。在本文中，我们将探讨其功能以及如何在Java项目的背景下使用它们。</p>\\n<h2>2. Snyk是什么？</h2>\\n<p>**Snyk是一个云原生安全平台，专注于识别和减轻开源软件组件和容器中的漏洞。**在我们深入使用特定功能之前，让我们看看本文将重点介绍的主要用途。</p>","autoDesc":true}');export{o as comp,h as data};
