import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-CJGTm_7y.js";const t={},p=e('<h1 id="maven-dependencymanagement-与-dependencies-标签对比" tabindex="-1"><a class="header-anchor" href="#maven-dependencymanagement-与-dependencies-标签对比"><span>Maven dependencyManagement 与 dependencies 标签对比</span></a></h1><p>在本教程中，我们将回顾 Maven 的两个重要标签 —— <em>dependencyManagement</em> 和 <em>dependencies</em>。</p><p>这些特性对于多模块项目尤其有用。</p><p>我们将回顾这两个标签的相似之处和不同之处，并且我们还将看看开发者在使用它们时常见的一些错误，这些错误可能会导致混淆。</p><h2 id="_2-使用" tabindex="-1"><a class="header-anchor" href="#_2-使用"><span>2. 使用</span></a></h2><p>通常，我们使 <em>dependencyManagement</em> 标签来避免在 <em>dependencies</em> 标签中重复定义 <em>version</em> 和 <em>scope</em> 标签。通过这种方式，所需依赖项在中央 POM 文件中声明。</p><h3 id="_2-1-dependencymanagement" tabindex="-1"><a class="header-anchor" href="#_2-1-dependencymanagement"><span>2.1. <em>dependencyManagement</em></span></a></h3><p>这个标签由一个 <em>dependencies</em> 标签组成，该标签本身可能包含多个 <em>dependency</em> 标签。每个 <em>dependency</em> 至少应该有以下三个主要标签：<em>groupId__artifactId</em> 和 <em>version</em>。让我们看一个例子：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>````\n    `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>`````````\n        `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`````````\n            `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````````org.apache.commons`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````````\n            `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````````commons-lang3`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````````\n            `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`````3.14.0`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`````\n        `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`````````\n    `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>`````````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码仅声明了新的 artifact <em>commons-lang3</em>，但它并没有真正将其添加到项目依赖资源列表中。</p><h3 id="_2-2-dependencies" tabindex="-1"><a class="header-anchor" href="#_2-2-dependencies"><span>2.2. <em>dependencies</em></span></a></h3><p>这个标签包含 <em>dependency</em> 标签的列表。每个 <em>dependency</em> 至少应该有以下两个主要标签，分别是 <em>groupId</em> 和 <em>artifactId</em>。</p><p>让我们快速看一个例子：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>`````````\n    `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`````````\n        `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````````org.apache.commons`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````````\n        `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````````commons-lang3`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````````\n        `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`````3.14.0`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`````\n    `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`````````\n`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>`````````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如果我们之前在 POM 文件中使用了 <em>dependencyManagement</em> 标签，那么 <em>version</em> 和 <em>scope</em> 标签可以隐式继承：</strong></p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>`````````\n    `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`````````\n        `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````````org.apache.commons`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````````\n        `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````````commons-lang3`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````````\n    `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`````````\n`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>`````````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-相似之处" tabindex="-1"><a class="header-anchor" href="#_3-相似之处"><span>3. 相似之处</span></a></h2><p>这两个标签都旨在声明一些第三方或子模块依赖。它们相互补充。</p><p>事实上，我们通常只定义一次 <em>dependencyManagement</em> 标签，然后是 <em>dependencies</em> 标签。这用于在 POM 文件中声明依赖项。<strong>这种声明只是一种宣告，它并没有真正将依赖项添加到项目中。</strong></p><p>让我们看一个添加 JUnit 库依赖的示例：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>````\n    `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>`````````\n        `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`````````\n            `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````````junit`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````````\n            `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````````junit`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````````\n            `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`````4.13.2`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`````\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n        `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`````````\n    `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>`````````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在上述代码中看到的，有一个 <em>dependencyManagement</em> 标签，它本身包含另一个 <em>dependencies</em> 标签。</p><p>现在，让我们看看代码的另一面，它将实际的依赖项添加到项目中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>`````````\n    `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`````````\n        `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````````junit`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````````\n        `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````````junit`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````````\n    `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`````````\n`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>`````````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，当前标签与之前的非常相似。它们都会定义依赖项列表。当然，还有一些小的差异，我们很快就会介绍。</p><p>在两个代码片段中重复了相同的 <em>groupId</em> 和 <em>artifactId</em> 标签，它们之间有着有意义的相关性：它们都指向同一个 artifact。</p><p>正如我们所看到的，我们后面的 <em>dependency</em> 标签中没有 <em>version</em> 标签。令人惊讶的是，这是有效的语法，可以解析和编译而没有问题。原因很容易猜到：它将使用 <em>dependencyManagement</em> 声明的版本。</p><h2 id="_4-不同之处" tabindex="-1"><a class="header-anchor" href="#_4-不同之处"><span>4. 不同之处</span></a></h2><h3 id="_4-1-结构差异" tabindex="-1"><a class="header-anchor" href="#_4-1-结构差异"><span><strong>4.1. 结构差异</strong></span></a></h3><p>正如我们之前所覆盖的，这两个标签之间的主要结构差异是继承逻辑。我们在 <em>dependencyManagement</em> 标签中定义版本，然后我们可以在下一个 <em>dependencies</em> 标签中使用提到的版本，而无需指定它。</p><h3 id="_4-2-行为差异" tabindex="-1"><a class="header-anchor" href="#_4-2-行为差异"><span><strong>4.2. 行为差异</strong></span></a></h3><p><strong><em>dependencyManagement</em> 只是一个声明，它并没有真正添加依赖项。</strong> 在这一节中声明的 <em>dependencies</em> 必须由 <em>dependencies</em> 标签稍后使用。只是 <em>dependencies</em> 标签才会导致真正的依赖关系发生。在上面的示例中，<em>dependencyManagement</em> 标签不会将 <em>junit</em> 库添加到任何作用域中。它只是对未来 <em>dependencies</em> 标签的声明。</p><h2 id="_5-真实世界示例" tabindex="-1"><a class="header-anchor" href="#_5-真实世界示例"><span>5. 真实世界示例</span></a></h2><p>几乎所有基于 Maven 的开源项目都使用这种机制。</p><p>让我们看一个 Maven 项目本身的例子。我们看到 <em>hamcrest-core</em> 依赖项，它存在于 Maven 项目中。它首先在 <em>dependencyManagement</em> 标签中声明，然后由主 <em>dependencies</em> 标签导入：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>````\n    `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>`````````\n        `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`````````\n            `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````````org.hamcrest`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````````\n            `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````````hamcrest-core`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````````\n            `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`````2.2`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`````\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n        `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`````````\n    `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>`````````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>````\n\n`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>`````````\n    `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`````````\n        `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````````org.hamcrest`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````````\n        `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````````hamcrest-core`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````````\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n    `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`````````\n`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>`````````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-常见用例" tabindex="-1"><a class="header-anchor" href="#_6-常见用例"><span>6. 常见用例</span></a></h2><p>这种特性的一个非常常见的用例是多模块项目。</p><p>想象我们有一个由不同模块组成的大型项目。每个模块都有自己的依赖项，每个开发者可能会使用不同版本的依赖项。然后它可能导致不同 artifact 版本的网状结构，这也可能导致难以解决的冲突。</p><p><strong>解决这个问题的简单方法绝对是在根 POM 文件中使用 <em>dependencyManagement</em> 标签（通常称为“父”），然后在子模块的 POM 文件中（子模块）甚至父模块本身（如果适用）中使用 <em>dependencies</em>。</strong></p><p>如果我们有一个单一模块，使用这个特性是否有意义？尽管这在多模块环境中非常有用，即使在单模块项目中，也可以将其作为最佳实践来遵循。这有助于提高项目的可读性，并且也使其准备好扩展到多模块项目。</p><h2 id="_7-常见错误" tabindex="-1"><a class="header-anchor" href="#_7-常见错误"><span>7. 常见错误</span></a></h2><p>一个常见的错误是仅在 <em>dependencyManagement</em> 部分定义依赖项，而没有在 <em>dependencies</em> 标签中包含它。在这种情况下，我们将遇到编译或运行时错误，具体取决于提到的 <em>scope</em>。</p><p>让我们看一个例子：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>````\n    `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>`````````\n        `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`````````\n            `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````````org.apache.commons`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````````\n            `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````````commons-lang3`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````````\n            `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`````3.14.0`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`````\n        `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`````````\n        ...\n    `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>`````````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>想象上述 POM 代码片段。然后假设我们要在子模块源文件中使用这个库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>lang3<span class="token punctuation">.</span></span><span class="token class-name">StringUtils</span></span><span class="token punctuation">;</span>\n\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码将无法编译，因为缺少库。编译器会报错：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[ERROR] Failed to execute goal compile (default-compile) on project sample-module: Compilation failure\n[ERROR] ~/sample-module/src/main/java/com/baeldung/Main.java:[3,32] package org.apache.commons.lang3 does not exist\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>为了避免这个错误，只需在子模块 POM 文件中添加以下 <em>dependencies</em> 标签即可：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>`````````\n    `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`````````\n        `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````````org.apache.commons`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````````\n        `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````````commons-lang3`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````````\n    `````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`````````\n`````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>`````````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本教程中，我们比较了 Maven 的 <em>dependencyManagement</em> 和 <em>dependencies</em> 标签。然后，我们回顾了它们的相似之处和不同之处，并看到了它们如何协同工作。</p><p>像往常一样，这些示例的代码可以在 GitHub 上找到。</p>',54),c=[p];function l(o,i){return s(),a("div",null,c)}const g=n(t,[["render",l],["__file","2024-07-26-Maven dependencyManagement vs. dependencies Tags.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-26/2024-07-26-Maven%20dependencyManagement%20vs.%20dependencies%20Tags.html","title":"Maven dependencyManagement 与 dependencies 标签对比","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Maven","Java"],"tag":["dependencyManagement","dependencies"],"head":[["meta",{"name":"keywords","content":"Maven, dependencyManagement, dependencies, Java, POM"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-26/2024-07-26-Maven%20dependencyManagement%20vs.%20dependencies%20Tags.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Maven dependencyManagement 与 dependencies 标签对比"}],["meta",{"property":"og:description","content":"Maven dependencyManagement 与 dependencies 标签对比 在本教程中，我们将回顾 Maven 的两个重要标签 —— dependencyManagement 和 dependencies。 这些特性对于多模块项目尤其有用。 我们将回顾这两个标签的相似之处和不同之处，并且我们还将看看开发者在使用它们时常见的一些错误，这..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-26T02:22:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"dependencyManagement"}],["meta",{"property":"article:tag","content":"dependencies"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-26T02:22:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Maven dependencyManagement 与 dependencies 标签对比\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-26T02:22:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Maven dependencyManagement 与 dependencies 标签对比 在本教程中，我们将回顾 Maven 的两个重要标签 —— dependencyManagement 和 dependencies。 这些特性对于多模块项目尤其有用。 我们将回顾这两个标签的相似之处和不同之处，并且我们还将看看开发者在使用它们时常见的一些错误，这..."},"headers":[{"level":2,"title":"2. 使用","slug":"_2-使用","link":"#_2-使用","children":[{"level":3,"title":"2.1. dependencyManagement","slug":"_2-1-dependencymanagement","link":"#_2-1-dependencymanagement","children":[]},{"level":3,"title":"2.2. dependencies","slug":"_2-2-dependencies","link":"#_2-2-dependencies","children":[]}]},{"level":2,"title":"3. 相似之处","slug":"_3-相似之处","link":"#_3-相似之处","children":[]},{"level":2,"title":"4. 不同之处","slug":"_4-不同之处","link":"#_4-不同之处","children":[{"level":3,"title":"4.1. 结构差异","slug":"_4-1-结构差异","link":"#_4-1-结构差异","children":[]},{"level":3,"title":"4.2. 行为差异","slug":"_4-2-行为差异","link":"#_4-2-行为差异","children":[]}]},{"level":2,"title":"5. 真实世界示例","slug":"_5-真实世界示例","link":"#_5-真实世界示例","children":[]},{"level":2,"title":"6. 常见用例","slug":"_6-常见用例","link":"#_6-常见用例","children":[]},{"level":2,"title":"7. 常见错误","slug":"_7-常见错误","link":"#_7-常见错误","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1721960558000,"updatedTime":1721960558000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.11,"words":1534},"filePathRelative":"posts/baeldung/2024-07-26/2024-07-26-Maven dependencyManagement vs. dependencies Tags.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将回顾 Maven 的两个重要标签 —— <em>dependencyManagement</em> 和 <em>dependencies</em>。</p>\\n<p>这些特性对于多模块项目尤其有用。</p>\\n<p>我们将回顾这两个标签的相似之处和不同之处，并且我们还将看看开发者在使用它们时常见的一些错误，这些错误可能会导致混淆。</p>\\n<h2>2. 使用</h2>\\n<p>通常，我们使 <em>dependencyManagement</em> 标签来避免在 <em>dependencies</em> 标签中重复定义 <em>version</em> 和 <em>scope</em> 标签。通过这种方式，所需依赖项在中央 POM 文件中声明。</p>","autoDesc":true}');export{g as comp,k as data};
