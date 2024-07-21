import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CtR6X2Br.js";const e={},p=t('<hr><h1 id="如何禁用在父-pom-中定义的-maven-插件" tabindex="-1"><a class="header-anchor" href="#如何禁用在父-pom-中定义的-maven-插件"><span>如何禁用在父 POM 中定义的 Maven 插件</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Maven 允许我们使用继承的概念来构建项目。<strong>当父 POM 定义了一个插件时，所有的子模块都会继承它。</strong></p><p>但如果我们不想从父 POM 继承一个插件，而我们又不能修改父 POM 怎么办？</p><p>在本教程中，我们将探讨几种不同的方法来禁用在父 POM 中定义的 Maven 插件，特别是 Maven Enforcer 插件。</p><h2 id="_2-我们为什么要禁用父-pom-中定义的插件" tabindex="-1"><a class="header-anchor" href="#_2-我们为什么要禁用父-pom-中定义的插件"><span>2. 我们为什么要禁用父 POM 中定义的插件？</span></a></h2><p>在我们继续之前，让我们思考一下为什么我们可能需要这样做。</p><p><strong>Maven 偏好约定而不是配置</strong>。我们需要记住，虽然禁用插件可能是对我们来说最快的解决方案，但它可能不是对项目最好的解决方案。</p><p><strong>禁用父 POM 中的插件的需求可能源于 Maven 项目的原始作者没有预见到我们的情况，我们没有办法自己修改父模块。</strong></p><p>假设原始作者假设一个特定的文件应该始终存在。然而，对于我们的模块来说，这个文件的存在是没有意义的。例如，父 POM 可能强制要求每个模块中都存在一个许可证文件，而我们没有。与其添加一个空文件，可能会引起混淆，我们更愿意禁用规则执行。</p><p>让我们通过在我们的 Maven 项目中添加一个父模块来设置这个场景，该模块实现了 <em>maven-enforcer-plugin</em>：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`org.apache.maven.plugins`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```maven-enforcer-plugin```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`3.0.0`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们为插件添加一个执行来强制执行一个规则，即每个模块的 <em>src</em> 目录中必须存在一个名为 <em>file-that-must-exist.txt</em> 的文件：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>executions</span><span class="token punctuation">&gt;</span></span>``\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>```\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>```enforce-file-exists```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>```\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>`enforce`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span>`\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>rules</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>requireFilesExist</span><span class="token punctuation">&gt;</span></span>`\n                    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>files</span><span class="token punctuation">&gt;</span></span>`\n                        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>file</span><span class="token punctuation">&gt;</span></span>`${project.basedir}/src/file-that-must-exist.txt`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>file</span><span class="token punctuation">&gt;</span></span>`\n                    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>files</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>requireFilesExist</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>rules</span><span class="token punctuation">&gt;</span></span>`\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>```\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>executions</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果 <em>file-that-must-exist.txt</em> 不存在，则构建将失败。</p><p><strong>由于子模块从其父模块继承插件，所有子模块都必须遵守这一规则。</strong></p><p>让我们看看我们如何在子 POM 中禁用这条规则。</p><p>首先，假设重构 Maven 项目或更改父 POM 是不可接受的解决方案。<strong>如果我们能够修改父模块，那么我们可以通过在父 POM 中实现一个 <em>pluginManagement</em> 部分来解决这个问题。</strong></p><p>我们可能无法修改父模块，因为我们不拥有该项目，因此我们没有权限在我们的模块之外进行更改。这可能是由于时间限制——重构一个项目需要时间，因此在子模块中禁用一个插件更方便。</p><p>此外，**我们假设插件实际上需要被禁用。**许多插件即使在它们不打算使用的模块上运行也不会有问题。</p><p>例如，假设我们有一个复制 Java 文件的插件。如果我们有一个没有 Java 文件的子项目，那么插件可能根本不会复制任何文件。它将这样做而不会引起问题。在这种情况下，更简单和更传统的方法是让插件继续运行。</p><p>假设在考虑了上述情况后，我们确实需要在我们的模块中禁用插件。</p><p>我们可以通过配置 <em>skip</em> 参数来做到这一点。</p><h3 id="_3-1-配置-skip-参数" tabindex="-1"><a class="header-anchor" href="#_3-1-配置-skip-参数"><span>3.1. 配置 <em>Skip</em> 参数</span></a></h3><p><strong>许多插件都有一个 <em>skip</em> 参数。我们可以使用 <em>skip</em> 参数来禁用插件。</strong></p><p>如果我们查看 <em>maven-enforcer-plugin</em> 的文档，我们可以看到它有一个 <em>skip</em> 参数，我们可以实施。</p><p><strong>支持 <em>skip</em> 参数应该是我们首先检查的事情，因为它是最简单的解决方案</strong>，也是最传统的方法。</p><p>让我们添加一个只包含 POM 的空子模块。如果我们使用 <em>mvn clean install</em> 命令构建模块，我们会发现构建失败了。这是因为由于从我们的父模块继承了规则，我们的模块中不存在 <em>file-that-must-exist.txt</em>。</p><p>让我们在子 POM 中添加以下行以启用 <em>skip</em> 参数：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```maven-enforcer-plugin```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>skip</span><span class="token punctuation">&gt;</span></span>`true`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>skip</span><span class="token punctuation">&gt;</span></span>`\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，如果我们运行项目，我们会发现构建是成功的。</p><p>然而，并非所有插件都有 <em>skip</em> 参数。那么如果我们使用的插件没有 <em>skip</em> 参数，我们该怎么办？</p><h3 id="_3-2-移除-phase-参数" tabindex="-1"><a class="header-anchor" href="#_3-2-移除-phase-参数"><span>3.2. 移除 <em>Phase</em> 参数</span></a></h3><p><strong>一个 Maven 目标只有在绑定到构建阶段时才会运行。</strong></p><p>在我们的父 POM 中，我们已经配置了 enforce 目标以 id <em>enforce-file-exists</em> 运行。</p><p>由于我们没有为 <em>enforce-file-exists</em> 指定 <em>phase</em> 参数，它将使用 enforce 目标的默认值。我们可以从文档中看到，默认值是 <em>validate</em> 构建阶段。</p><p>我们可以通过为 <em>phase</em> 参数指定一个替代值来在替代的构建阶段执行目标。</p><p>利用这一点，<strong>我们可以将 <em>phase</em> 参数设置为一个不存在的值。这意味着构建阶段将永远不会被执行。</strong> 因此，目标不会被执行，有效地禁用了插件：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```maven-enforcer-plugin```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>executions</span><span class="token punctuation">&gt;</span></span>``\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>```\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>```enforce-file-exists```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>```\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>phase</span><span class="token punctuation">&gt;</span></span>`any-value-that-is-not-a-phase`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>phase</span><span class="token punctuation">&gt;</span></span>`\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>executions</span><span class="token punctuation">&gt;</span></span>``\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了让我们稍后查看代码的人更清楚，我们希望将 <em>phase</em> 设置为一个明确的名称，如“none”或“null”。</p><p>然而，可能最清楚的方式是完全清除 <em>phase</em> 参数：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>```enforce-file-exists```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>```\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>phase</span><span class="token punctuation">/&gt;</span></span>`\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于执行的 <em>phase</em> 现在是空的，目标将不会被绑定到运行的构建阶段。这有效地禁用了插件。</p><p>我们可以看到，当我们运行构建时，<em>enforce-file-exists</em> 根本不会在我们的子模块中运行。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们讨论了为什么我们可能选择禁用在父 POM 中定义的插件。我们看到了禁用插件可能并不总是最好的事情，因为 Maven 偏好约定而不是配置。</p><p>然后，我们通过一个简单的例子展示了如何禁用由父 POM 声明的 <em>maven-enforcer-plugin</em>。</p><p>首先，<strong>我们展示了如果插件有一个，我们可以配置插件的 <em>skip</em> 参数。</strong> 我们发现这是最传统的方法。</p><p>最后，<strong>我们了解到清除插件的 <em>phase</em> 参数将有效地禁用它。</strong></p><p>一如既往，示例项目在 GitHub 上可用。</p>',51),l=[p];function o(c,i){return s(),a("div",null,l)}const r=n(e,[["render",o],["__file","2024-07-19-How to Disable a Maven Plugin Defined in a Parent POM.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-How%20to%20Disable%20a%20Maven%20Plugin%20Defined%20in%20a%20Parent%20POM.html","title":"如何禁用在父 POM 中定义的 Maven 插件","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Maven"],"tag":["Maven","Parent POM","Plugin"],"head":[["meta",{"name":"keywords","content":"Maven, Parent POM, Plugin, Disable"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-How%20to%20Disable%20a%20Maven%20Plugin%20Defined%20in%20a%20Parent%20POM.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何禁用在父 POM 中定义的 Maven 插件"}],["meta",{"property":"og:description","content":"如何禁用在父 POM 中定义的 Maven 插件 1. 概述 Maven 允许我们使用继承的概念来构建项目。当父 POM 定义了一个插件时，所有的子模块都会继承它。 但如果我们不想从父 POM 继承一个插件，而我们又不能修改父 POM 怎么办？ 在本教程中，我们将探讨几种不同的方法来禁用在父 POM 中定义的 Maven 插件，特别是 Maven En..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T10:35:04.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Maven"}],["meta",{"property":"article:tag","content":"Parent POM"}],["meta",{"property":"article:tag","content":"Plugin"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T10:35:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何禁用在父 POM 中定义的 Maven 插件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T10:35:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何禁用在父 POM 中定义的 Maven 插件 1. 概述 Maven 允许我们使用继承的概念来构建项目。当父 POM 定义了一个插件时，所有的子模块都会继承它。 但如果我们不想从父 POM 继承一个插件，而我们又不能修改父 POM 怎么办？ 在本教程中，我们将探讨几种不同的方法来禁用在父 POM 中定义的 Maven 插件，特别是 Maven En..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 我们为什么要禁用父 POM 中定义的插件？","slug":"_2-我们为什么要禁用父-pom-中定义的插件","link":"#_2-我们为什么要禁用父-pom-中定义的插件","children":[{"level":3,"title":"3.1. 配置 Skip 参数","slug":"_3-1-配置-skip-参数","link":"#_3-1-配置-skip-参数","children":[]},{"level":3,"title":"3.2. 移除 Phase 参数","slug":"_3-2-移除-phase-参数","link":"#_3-2-移除-phase-参数","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721385304000,"updatedTime":1721385304000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.5,"words":1649},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-How to Disable a Maven Plugin Defined in a Parent POM.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>如何禁用在父 POM 中定义的 Maven 插件</h1>\\n<h2>1. 概述</h2>\\n<p>Maven 允许我们使用继承的概念来构建项目。<strong>当父 POM 定义了一个插件时，所有的子模块都会继承它。</strong></p>\\n<p>但如果我们不想从父 POM 继承一个插件，而我们又不能修改父 POM 怎么办？</p>\\n<p>在本教程中，我们将探讨几种不同的方法来禁用在父 POM 中定义的 Maven 插件，特别是 Maven Enforcer 插件。</p>\\n<h2>2. 我们为什么要禁用父 POM 中定义的插件？</h2>\\n<p>在我们继续之前，让我们思考一下为什么我们可能需要这样做。</p>","autoDesc":true}');export{r as comp,k as data};
