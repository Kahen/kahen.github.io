import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-C6rqSDgP.js";const t={},p=e('<hr><h1 id="maven编码指南" tabindex="-1"><a class="header-anchor" href="#maven编码指南"><span>Maven编码指南</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将学习如何在Maven中设置字符编码。 我们将展示如何为一些常见的Maven插件设置编码。 此外，我们将看到如何在项目级别以及通过命令行设置编码。</p><h2 id="_2-编码是什么-我们为什么要关心" tabindex="-1"><a class="header-anchor" href="#_2-编码是什么-我们为什么要关心"><span>2. 编码是什么，我们为什么要关心？</span></a></h2><p>世界上有许多不同的语言，使用不同的字符。 一个称为Unicode的字符映射系统拥有超过10万个字符、符号甚至表情符号（emoji）。 为了不使用大量的内存，<strong>我们使用一个称为编码的映射系统，将字符在位和字节之间以及屏幕上的可读字符之间进行转换。</strong> 现在有许多编码系统。<strong>要读取文件，我们必须知道使用的是哪种编码系统。</strong></p><h3 id="_2-1-如果我们在maven中不声明编码会发生什么" tabindex="-1"><a class="header-anchor" href="#_2-1-如果我们在maven中不声明编码会发生什么"><span>2.1. 如果我们在Maven中不声明编码会发生什么？</span></a></h3><p>Maven认为编码足够重要，以至于如果我们不声明编码，它会记录一个警告。 事实上，这个警告占据了Apache Maven网站上常见问题页面的首位。 为了看到这个警告，让我们向我们的构建中添加几个插件。 首先，让我们添加_maven-resources-plugin_，它将复制资源到输出目录：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>``\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.apache.maven.plugins```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```maven-resources-plugin```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``3.2.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还需要编译我们的代码文件，所以让我们添加_maven-compiler-plugin_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>``\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.apache.maven.plugins```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```maven-compiler-plugin```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们正在一个多模块项目中工作，那么父POM可能已经为我们设置了编码。为了演示目的，让我们通过覆盖它来清除编码属性（别担心，我们稍后会回到这个问题）：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project.build.sourceEncoding</span><span class="token punctuation">&gt;</span></span>``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project.build.sourceEncoding</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用标准的Maven命令运行插件：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mvn clean <span class="token function">install</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>像这样取消设置我们的编码可能会破坏构建！我们将在日志中看到以下警告：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[INFO] --- maven-resources-plugin:3.2.0:resources (default-resources) @ maven-properties ---\n  [WARNING] Using platform encoding (Cp1252 actually) to copy filtered resources, i.e. build is platform dependent!\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>警告指出，<strong>如果没有指定编码系统，Maven将使用平台默认值。</strong> 通常在Windows上，默认值是Windows-1252（也称为CP-1252或Cp1252）。 这个默认值可能会根据本地环境而改变。我们将在下面看到如何从我们的构建中移除这种平台依赖性。</p><h3 id="_2-2-如果我们在maven中声明了错误的编码会发生什么" tabindex="-1"><a class="header-anchor" href="#_2-2-如果我们在maven中声明了错误的编码会发生什么"><span>2.2. 如果我们在Maven中声明了错误的编码会发生什么？</span></a></h3><p>Maven是一个构建工具，需要能够读取源文件。 为了读取源文件，<strong>Maven必须被设置为使用源文件编码的相同编码。</strong> Maven还会产生通常分发到另一台计算机的文件。因此，使用预期的编码写入输出文件是很重要的。<strong>不在预期编码中的输出文件可能无法在不同的系统上读取。</strong> 为了展示这一点，让我们添加一个使用非ASCII字符的简单Java类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NonAsciiString</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getNonAsciiString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\n        <span class="token class-name">String</span> nonAsciiŞŧř <span class="token operator">=</span> <span class="token string">&quot;ÜÝÞßàæç&quot;</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> nonAsciiŞŧř<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的POM中，让我们将我们的构建设置为使用ASCII编码：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project.build.sourceEncoding</span><span class="token punctuation">&gt;</span></span>```US-ASCII```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project.build.sourceEncoding</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行这个使用_mvn clean install_，我们会看到许多构建错误的形式：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[ERROR] /Baeldung/tutorials/maven-modules/maven-properties/src/main/java/com/baeldung/maven/properties/NonAsciiString.java:[15,31] unmappable character (0xC3) for encoding US-ASCII\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们看到这个是因为我们的文件包含非ASCII字符，所以它们不能通过ASCII编码读取。 在可能的情况下，保持事情简单并避免使用非ASCII字符是一个好主意。 在下一节中，我们将看到将Maven设置为使用UTF-8编码以避免任何问题也是一个好主意。</p><h2 id="_3-我们如何在maven配置中设置编码" tabindex="-1"><a class="header-anchor" href="#_3-我们如何在maven配置中设置编码"><span>3. 我们如何在Maven配置中设置编码？</span></a></h2><p>首先，让我们看看我们如何在插件级别设置编码。 然后我们将看到我们可以设置项目范围的属性。这意味着我们不需要在每个插件中声明编码。</p><h3 id="_3-1-我们如何在maven插件中设置-encoding-参数" tabindex="-1"><a class="header-anchor" href="#_3-1-我们如何在maven插件中设置-encoding-参数"><span>3.1. 我们如何在Maven插件中设置_encoding_参数？</span></a></h3><p><strong>大多数插件都带有_encoding_参数</strong>，这使得这个过程非常简单。 我们需要在_maven-resources-plugin_和_maven-compiler-plugin_中设置编码。我们可以简单地将_encoding_参数添加到我们的每个Maven插件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>encoding</span><span class="token punctuation">&gt;</span></span>``UTF-8``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>encoding</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用_mvn clean install_运行这段代码并查看日志：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[INFO] --- maven-resources-plugin:3.2.0:resources (default-resources) @ maven-properties ---\n[INFO] Using &#39;UTF-8&#39; encoding to copy filtered resources.\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到插件现在正在使用UTF-8，我们已经解决了上面的警告。</p><h3 id="_3-2-我们如何在maven构建中设置项目范围的-encoding-参数" tabindex="-1"><a class="header-anchor" href="#_3-2-我们如何在maven构建中设置项目范围的-encoding-参数"><span>3.2. 我们如何在Maven构建中设置项目范围的_encoding_参数？</span></a></h3><p>记住为每个声明的插件设置编码是非常麻烦的。 幸运的是，大多数Maven插件使用相同的全局Maven属性作为其_encoding_参数的默认值。 正如我们之前看到的，让我们从我们的插件中移除_encoding_参数，而是设置：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project.build.sourceEncoding</span><span class="token punctuation">&gt;</span></span>```UTF-8```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project.build.sourceEncoding</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">&gt;</span></span>```\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行我们的构建会产生我们之前看到的相同的UTF-8日志行。 在多模块项目中，我们通常会在父POM中设置此属性。 <strong>此属性将被任何设置的插件特定属性覆盖。</strong> 重要的是要记住，插件不一定要使用这个属性。例如，早期版本（&lt;2.2）的_maven-war-plugin_会忽略这个属性。</p><h3 id="_3-3-我们如何为报告插件设置项目范围的-encoding-参数" tabindex="-1"><a class="header-anchor" href="#_3-3-我们如何为报告插件设置项目范围的-encoding-参数"><span>3.3. 我们如何为报告插件设置项目范围的_encoding_参数？</span></a></h3><p>令人惊讶的是，<strong>我们必须设置两个属性以确保我们为所有情况设置了项目范围的编码。</strong> 为了说明这一点，我们将使用_properties-maven-plugin_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>``\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.codehaus.mojo```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```properties-maven-plugin```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``1.1.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们还设置一个新的系统范围属性为空：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project.reporting.outputEncoding</span><span class="token punctuation">&gt;</span></span>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project.reporting.outputEncoding</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们现在运行_mvn clean install_，我们的构建将失败，并记录：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[ERROR] Failed to execute goal org.apache.maven.plugins:maven-pmd-plugin:3.13.0:pmd (pmd) on project maven-properties: Execution pmd of goal\n  org.apache.maven.plugins:maven-pmd-plugin:3.13.0:pmd failed: org.apache.maven.reporting.MavenReportException: : UnsupportedEncodingException -&gt;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管我们设置了_project.build.sourceEncoding_，但这个插件也使用了一个不同的属性。为了理解为什么会这样，我们必须理解Maven构建配置和Maven报告配置之间的区别。 <strong>插件可以用于构建过程或报告过程，这使用不同的属性键。</strong> 这意味着仅仅设置_project.build.sourceEncoding_是不够的。我们还需要为报告过程添加以下属性：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project.reporting.outputEncoding</span><span class="token punctuation">&gt;</span></span>``UTF-8``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project.reporting.outputEncoding</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>建议在项目范围级别设置这两个属性。</strong></p><h3 id="_3-4-我们如何在命令行上设置maven编码" tabindex="-1"><a class="header-anchor" href="#_3-4-我们如何在命令行上设置maven编码"><span>3.4. 我们如何在命令行上设置Maven编码？</span></a></h3><p>**我们可以通过命令行参数设置属性，而不需要在POM文件中添加任何配置。**我们可能会这样做，因为我们没有写入权限到pom.xml文件。 让我们运行以下命令来指定构建应该使用的编码：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mvn clean <span class="token function">install</span> <span class="token parameter variable">-Dproject.build.sourceEncoding</span><span class="token operator">=</span>UTF-8 <span class="token parameter variable">-Dproject.reporting.outputEncoding</span><span class="token operator">=</span>UTF-8\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>命令行参数覆盖任何现有的配置。</strong> 因此，即使我们删除了pom.xml文件中设置的任何编码属性，这也允许我们成功运行构建。</p><h2 id="_4-在同一个maven项目中使用多种类型的编码" tabindex="-1"><a class="header-anchor" href="#_4-在同一个maven项目中使用多种类型的编码"><span>4. 在同一个Maven项目中使用多种类型的编码</span></a></h2><p><strong>在项目中使用单一类型的编码是一个好主意。</strong> 然而，我们可能被迫在同一个构建中处理多种类型的编码。例如，我们的资源文件可能有不同的编码系统，这可能超出了我们的控制范围。 我们能这样做吗？这取决于情况。 我们看到我们可以在插件的基础上设置_encoding_参数。因此，如果我们的代码需要使用CP-1252，但希望以UTF-8输出测试结果，那么我们可以这样做。 我们甚至可以在同一个插件中使用多种类型的编码，通过使用不同的执行来实现。 特别是，我们之前看到的_maven-resources-plugin_，它内置了额外的功能。 我们之前看到了_encoding_参数。该插件还提供了一个_propertiesEncoding_参数，允许属性文件与其他资源有不同的编码：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>encoding</span><span class="token punctuation">&gt;</span></span>``UTF-8``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>encoding</span><span class="token punctuation">&gt;</span></span>``\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>propertiesEncoding</span><span class="token punctuation">&gt;</span></span>`ISO-8859-1``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n\n当使用_mvn clean install_运行构建时，这将产生：\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>[INFO] --- maven-resources-plugin:3.2.0:resources (default-resources) @ maven-properties --- [INFO] Using &#39;UTF-8&#39; encoding to copy filtered resources. [INFO] Using &#39;ISO-8859-1&#39; encoding to copy filtered properties files.</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>参考maven.apache.org的技术文档总是值得的，当调查插件如何使用编码时。\n\n## 5. 结论\n\n在本文中，我们看到了声明编码有助于**确保代码在任何环境中以相同的方式构建。**\n我们看到了我们可以在插件级别设置编码参数。\n然后，我们了解到**我们可以在项目级别设置两个属性**。它们是_project.build.sourceEncoding_和_project.reporting.outputEncoding_。\n我们还看到了**可以通过命令行传递编码**。这允许我们在不编辑Maven POM文件的情况下设置编码类型。\n最后，我们探讨了如何在同一个项目中使用多种类型的编码。\n一如既往，示例项目可在GitHub上获取。\nOK</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',57),l=[p];function i(c,o){return s(),a("div",null,l)}const r=n(t,[["render",i],["__file","2024-07-17-A Guide to Maven Encoding.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-A%20Guide%20to%20Maven%20Encoding.html","title":"Maven编码指南","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Maven","编码"],"tag":["Maven","编码"],"head":[["meta",{"name":"keywords","content":"Maven编码设置, Maven插件编码, Maven命令行编码"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-A%20Guide%20to%20Maven%20Encoding.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Maven编码指南"}],["meta",{"property":"og:description","content":"Maven编码指南 1. 概述 在本教程中，我们将学习如何在Maven中设置字符编码。 我们将展示如何为一些常见的Maven插件设置编码。 此外，我们将看到如何在项目级别以及通过命令行设置编码。 2. 编码是什么，我们为什么要关心？ 世界上有许多不同的语言，使用不同的字符。 一个称为Unicode的字符映射系统拥有超过10万个字符、符号甚至表情符号（e..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T22:09:47.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Maven"}],["meta",{"property":"article:tag","content":"编码"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T22:09:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Maven编码指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T22:09:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Maven编码指南 1. 概述 在本教程中，我们将学习如何在Maven中设置字符编码。 我们将展示如何为一些常见的Maven插件设置编码。 此外，我们将看到如何在项目级别以及通过命令行设置编码。 2. 编码是什么，我们为什么要关心？ 世界上有许多不同的语言，使用不同的字符。 一个称为Unicode的字符映射系统拥有超过10万个字符、符号甚至表情符号（e..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 编码是什么，我们为什么要关心？","slug":"_2-编码是什么-我们为什么要关心","link":"#_2-编码是什么-我们为什么要关心","children":[{"level":3,"title":"2.1. 如果我们在Maven中不声明编码会发生什么？","slug":"_2-1-如果我们在maven中不声明编码会发生什么","link":"#_2-1-如果我们在maven中不声明编码会发生什么","children":[]},{"level":3,"title":"2.2. 如果我们在Maven中声明了错误的编码会发生什么？","slug":"_2-2-如果我们在maven中声明了错误的编码会发生什么","link":"#_2-2-如果我们在maven中声明了错误的编码会发生什么","children":[]}]},{"level":2,"title":"3. 我们如何在Maven配置中设置编码？","slug":"_3-我们如何在maven配置中设置编码","link":"#_3-我们如何在maven配置中设置编码","children":[{"level":3,"title":"3.1. 我们如何在Maven插件中设置_encoding_参数？","slug":"_3-1-我们如何在maven插件中设置-encoding-参数","link":"#_3-1-我们如何在maven插件中设置-encoding-参数","children":[]},{"level":3,"title":"3.2. 我们如何在Maven构建中设置项目范围的_encoding_参数？","slug":"_3-2-我们如何在maven构建中设置项目范围的-encoding-参数","link":"#_3-2-我们如何在maven构建中设置项目范围的-encoding-参数","children":[]},{"level":3,"title":"3.3. 我们如何为报告插件设置项目范围的_encoding_参数？","slug":"_3-3-我们如何为报告插件设置项目范围的-encoding-参数","link":"#_3-3-我们如何为报告插件设置项目范围的-encoding-参数","children":[]},{"level":3,"title":"3.4. 我们如何在命令行上设置Maven编码？","slug":"_3-4-我们如何在命令行上设置maven编码","link":"#_3-4-我们如何在命令行上设置maven编码","children":[]}]},{"level":2,"title":"4. 在同一个Maven项目中使用多种类型的编码","slug":"_4-在同一个maven项目中使用多种类型的编码","link":"#_4-在同一个maven项目中使用多种类型的编码","children":[]}],"git":{"createdTime":1721254187000,"updatedTime":1721254187000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.81,"words":2343},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-A Guide to Maven Encoding.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Maven编码指南</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将学习如何在Maven中设置字符编码。\\n我们将展示如何为一些常见的Maven插件设置编码。\\n此外，我们将看到如何在项目级别以及通过命令行设置编码。</p>\\n<h2>2. 编码是什么，我们为什么要关心？</h2>\\n<p>世界上有许多不同的语言，使用不同的字符。\\n一个称为Unicode的字符映射系统拥有超过10万个字符、符号甚至表情符号（emoji）。\\n为了不使用大量的内存，<strong>我们使用一个称为编码的映射系统，将字符在位和字节之间以及屏幕上的可读字符之间进行转换。</strong>\\n现在有许多编码系统。<strong>要读取文件，我们必须知道使用的是哪种编码系统。</strong></p>","autoDesc":true}');export{r as comp,g as data};
