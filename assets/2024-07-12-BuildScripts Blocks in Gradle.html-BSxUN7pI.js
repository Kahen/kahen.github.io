import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as l,a as t}from"./app-BMOUrRO4.js";const a={},r=t(`<hr><h1 id="gradle构建脚本块" tabindex="-1"><a class="header-anchor" href="#gradle构建脚本块"><span>Gradle构建脚本块</span></a></h1><ol><li>概述</li></ol><p>在本教程中，我们将学习Gradle构建脚本块（在_build.gradle_文件中的脚本）并详细了解_buildScript_块的目的。</p><ol start="2"><li>引言</li></ol><p>2.1. Gradle是什么？</p><p>它是一个构建自动化工具，可以执行编译、打包、测试、部署、发布、依赖解析等任务。如果没有这个工具，我们将不得不手动执行这些任务，这相当复杂且耗时。在当今的软件开发中，很难不使用这样的构建工具。</p><p>2.2. Gradle的常见构建脚本块</p><p>在这一部分，我们将简要了解最常见的构建脚本块。<em>allProjects</em>、<em>subProjects</em>、<em>plugins</em>、<em>dependencies</em>、<em>repositories</em>、_publishing_和_buildScript_是最常见的构建脚本块。给出的列表介绍了这些块的概念：</p><ul><li>_allProjects_块配置根项目和每个子项目。</li><li>_subProjects_块与_allProjects_不同，只配置子项目。</li><li>_plugins_通过引入一组有用的功能来扩展Gradle的功能。例如，_java_插件添加了assemble、build、clean、jar、documentation等任务，等等。</li><li>顾名思义，_dependencies_是声明项目所需的所有jar的地方。</li><li>_repositories_块包含Gradle将从哪里下载_dependencies_块中声明的jar的位置。可以声明多个位置，按声明顺序执行。</li><li>当我们开发一个库并希望发布它时，声明_publishing_块。这个块包含库jar的坐标和包含发布位置的_repositories_块。</li></ul><p>现在，让我们考虑一个用例，我们想在构建脚本中使用一个库。在这种情况下，我们不能使用_dependencies_块，因为它包含项目类路径上所需的jar。</p><p>由于我们想在构建脚本本身中使用该库，因此需要将此库添加到脚本类路径上。这就是_buildScript_的作用。下一节将深入讨论_buildScript_块，并提供用例。</p><ol start="3"><li>BuildScript块的目的</li></ol><p>考虑到上述定义的用例，假设在Spring Boot应用程序中，我们想在构建脚本中读取application.yml文件中定义的属性。为了实现这一点，我们可以使用一个名为_snakeyaml_的库，该库解析YAML文件并轻松读取属性。</p><p>正如我们在上一节中讨论的，我们需要将此库添加到脚本类路径上。解决方案是在_buildScript_块中将其添加为依赖。</p><p>脚本显示如何读取application.yml文件中的_temp.files.path_属性。_buildScript_块包含_snakeyaml_库的依赖项和下载它的_repositories_位置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>import org.yaml.snakeyaml.Yaml

buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath group: &#39;org.yaml&#39;, name: &#39;snakeyaml&#39;, version: &#39;1.19&#39;
    }
}

plugins {
    //plugins
}

def prop = new Yaml().loadAll(new File(&quot;$projectDir/src/main/resources/application.yml&quot;)
  .newInputStream()).first()
var path = prop.temp.files.path
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>path变量包含_temp.files.path_的值。</p><p>更多关于_buildScript_块的信息：</p><ul><li>它可以包含任何类型的依赖项，除了项目类型依赖项。</li><li>对于多项目构建，声明的依赖项对所有子项目的构建脚本都可用。</li><li>要将作为外部jar可用的二进制插件添加到项目中，我们应该将其添加到构建脚本类路径上，然后应用插件。</li></ul><ol start="4"><li>结论</li></ol><p>在本教程中，我们学习了Gradle的使用，构建脚本最常见的块的目的，并深入研究了_buildScript_块及其用例。</p>`,22),n=[r];function d(p,s){return l(),i("div",null,n)}const m=e(a,[["render",d],["__file","2024-07-12-BuildScripts Blocks in Gradle.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-BuildScripts%20Blocks%20in%20Gradle.html","title":"Gradle构建脚本块","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Gradle","Build Automation"],"tag":["Gradle","Build Scripts","Build Automation"],"head":[["meta",{"name":"keywords","content":"Gradle, Build Scripts, Build Automation, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-BuildScripts%20Blocks%20in%20Gradle.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Gradle构建脚本块"}],["meta",{"property":"og:description","content":"Gradle构建脚本块 概述 在本教程中，我们将学习Gradle构建脚本块（在_build.gradle_文件中的脚本）并详细了解_buildScript_块的目的。 引言 2.1. Gradle是什么？ 它是一个构建自动化工具，可以执行编译、打包、测试、部署、发布、依赖解析等任务。如果没有这个工具，我们将不得不手动执行这些任务，这相当复杂且耗时。在当..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T07:39:00.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Gradle"}],["meta",{"property":"article:tag","content":"Build Scripts"}],["meta",{"property":"article:tag","content":"Build Automation"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T07:39:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Gradle构建脚本块\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T07:39:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Gradle构建脚本块 概述 在本教程中，我们将学习Gradle构建脚本块（在_build.gradle_文件中的脚本）并详细了解_buildScript_块的目的。 引言 2.1. Gradle是什么？ 它是一个构建自动化工具，可以执行编译、打包、测试、部署、发布、依赖解析等任务。如果没有这个工具，我们将不得不手动执行这些任务，这相当复杂且耗时。在当..."},"headers":[],"git":{"createdTime":1720769940000,"updatedTime":1720769940000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.75,"words":824},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-BuildScripts Blocks in Gradle.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Gradle构建脚本块</h1>\\n<ol>\\n<li>概述</li>\\n</ol>\\n<p>在本教程中，我们将学习Gradle构建脚本块（在_build.gradle_文件中的脚本）并详细了解_buildScript_块的目的。</p>\\n<ol start=\\"2\\">\\n<li>引言</li>\\n</ol>\\n<p>2.1. Gradle是什么？</p>\\n<p>它是一个构建自动化工具，可以执行编译、打包、测试、部署、发布、依赖解析等任务。如果没有这个工具，我们将不得不手动执行这些任务，这相当复杂且耗时。在当今的软件开发中，很难不使用这样的构建工具。</p>\\n<p>2.2. Gradle的常见构建脚本块</p>","autoDesc":true}');export{m as comp,u as data};
