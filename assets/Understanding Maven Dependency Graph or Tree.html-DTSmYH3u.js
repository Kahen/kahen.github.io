import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-Ceves8Ok.js";const p={},e=t('<h1 id="maven依赖图或树的理解" tabindex="-1"><a class="header-anchor" href="#maven依赖图或树的理解"><span>Maven依赖图或树的理解</span></a></h1><p>在处理大型Maven项目时可能会感到畏惧，同时跟踪所有模块和库之间的依赖关系并解决它们之间的冲突也是一个挑战。</p><p>在本教程中，我们将学习有关Maven依赖图或树的知识。首先，我们将了解如何创建依赖树，过滤依赖项，并创建不同的输出格式。接下来，我们将讨论以图形方式查看依赖树的不同方法。</p><h2 id="_2-项目设置" tabindex="-1"><a class="header-anchor" href="#_2-项目设置"><span>2. 项目设置</span></a></h2><p>在现实生活的项目中，依赖树会迅速增长并变得复杂。然而，对于我们的示例，我们将创建一个包含两个模块_module1_和_module2_的小项目，每个模块都有两到三个依赖项。此外，<em>module1_依赖于_module2</em>。</p><p>我们将创建我们的第一个模块_module2，并添加_commons-collections, slf4j-api, spring-bean_和_junit_依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>``\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````commons-collections````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````commons-collections````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````3.2.2````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````org.slf4j````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````slf4j-api````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````1.7.25````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````org.springframework````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````spring-bean````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````6.1.1````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````junit````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````junit````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````4.13.2````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>`test`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>`\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````````\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们创建一个新的模块_module1，并添加_commons-collections, spring-core, slf4j-api,_以及我们的_module2_作为依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>``\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````commons-collections````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````commons-collections````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````3.2.2````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````org.springframework````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````spring-core````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````6.1.1````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````org.slf4j````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````slf4j-api````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````1.7.25````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````com.baeldung.module2````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````module2````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````1.0````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````````\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在这里不关心库的功能，而是关心它们是如何为我们的项目派生的，以检测版本冲突，识别不必要的依赖项，解决构建或运行时问题，并可视化依赖树。</p><h2 id="_3-分析依赖图或树的方法" tabindex="-1"><a class="header-anchor" href="#_3-分析依赖图或树的方法"><span>3. 分析依赖图或树的方法</span></a></h2><p>有多种方法可以分析依赖树或图。</p><h3 id="_3-1-使用maven依赖插件" tabindex="-1"><a class="header-anchor" href="#_3-1-使用maven依赖插件"><span>3.1. 使用Maven依赖插件</span></a></h3><p>_maven-dependency-plugin_默认以文本格式显示给定项目的依赖树。</p><p>让我们在_module2_目录下运行Maven命令以获取我们的_module2_的依赖树：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn dependency:tree\n// 输出片段\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> com.baeldung.module2:module2:jar:1.0\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> +- commons-collections:commons-collections:jar:3.2.2:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> +- org.slf4j:slf4j-api:jar:1.7.25:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> +- org.springframework:spring-beans:jar:6.1.1:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> <span class="token operator">|</span>  <span class="token punctuation">\\</span>- org.springframework:spring-core:jar:6.1.1:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> <span class="token operator">|</span>     <span class="token punctuation">\\</span>- org.springframework:spring-jcl:jar:6.1.1:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> <span class="token punctuation">\\</span>- junit:junit:jar:4.13.2:test\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>    <span class="token punctuation">\\</span>- org.hamcrest:hamcrest-core:jar:1.3:test\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们在_module1_目录下运行Maven命令以获取其依赖树：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn dependency:tree\n// 输出片段\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> com.baeldung.module1:module1:jar:1.0\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> +- commons-collections:commons-collections:jar:3.2.2:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> +- org.springframework:spring-core:jar:6.1.1:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> <span class="token operator">|</span>  <span class="token punctuation">\\</span>- org.springframework:spring-jcl:jar:6.1.1:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> +- org.slf4j:slf4j-api:jar:1.7.25:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> <span class="token punctuation">\\</span>- com.baeldung.module2:module2:jar:1.0:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>    <span class="token punctuation">\\</span>- org.springframework:spring-beans:jar:6.1.1:compile\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，输出是以文本格式，我们可以看到依赖项是如何被包含在我们的项目中的。</p><p><strong>我们可以通过使用这个插件来过滤依赖树输出，通过排除或包括特定的构件。</strong></p><p>例如，如果我们只需要在依赖树中包括_slf4j_，我们可以使用_-Dinclude_选项来包括所有依赖项：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn dependency:tree <span class="token parameter variable">-Dincludes</span><span class="token operator">=</span>org.slf4j\n//输出\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> com.baeldung.module1:module1:jar:1.0\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> <span class="token punctuation">\\</span>- org.slf4j:slf4j-api:jar:1.7.25:compile\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们需要在树中排除_slf4j_，我们可以使用_-Dexcludes_选项来排除所有依赖项：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn dependency:tree <span class="token parameter variable">-Dexcludes</span><span class="token operator">=</span>org.slf4j\n//输出\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> com.baeldung.module1:module1:jar:1.0\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> +- commons-collections:commons-collections:jar:3.2.2:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> +- org.springframework:spring-core:jar:6.1.1:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> <span class="token operator">|</span>  <span class="token punctuation">\\</span>- org.springframework:spring-jcl:jar:6.1.1:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> <span class="token punctuation">\\</span>- com.baeldung.module2:module2:jar:1.0:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>    <span class="token punctuation">\\</span>- org.springframework:spring-beans:jar:6.1.1:compile\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，如果我们需要<strong>详细分析所有依赖项，我们可以使用_-Dverbose_选项</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn dependency:tree <span class="token parameter variable">-Dverbose</span>\n//输出\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> com.baeldung.module1:module1:jar:1.0\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> +- commons-collections:commons-collections:jar:3.2.2:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> +- org.springframework:spring-core:jar:6.1.1:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> <span class="token operator">|</span>  <span class="token punctuation">\\</span>- org.springframework:spring-jcl:jar:6.1.1:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> +- org.slf4j:slf4j-api:jar:1.7.25:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> <span class="token punctuation">\\</span>- com.baeldung.module2:module2:jar:1.0:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>    +- <span class="token punctuation">(</span>commons-collections:commons-collections:jar:3.2.2:compile - omitted <span class="token keyword">for</span> duplicate<span class="token punctuation">)</span>\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>    +- <span class="token punctuation">(</span>org.slf4j:slf4j-api:jar:1.7.25:compile - omitted <span class="token keyword">for</span> duplicate<span class="token punctuation">)</span>\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>    <span class="token punctuation">\\</span>- org.springframework:spring-beans:jar:6.1.1:compile\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       <span class="token punctuation">\\</span>- <span class="token punctuation">(</span>org.springframework:spring-core:jar:6.1.1:compile - omitted <span class="token keyword">for</span> duplicate<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以看到_module1_中的_spring-core_被选取，而_module2_中的被移除了。</p><p>此外，对于复杂项目，阅读这种格式是繁琐的。<strong>这个插件允许我们创建另一种输出格式，如_dot_, <em>graphml</em>, 或 <em>tgf</em>，从相同的依赖树。</strong> 稍后可以使用不同的编辑器可视化这些输出格式。</p><p>现在，让我们以_graphml_格式获取相同的依赖树，并将输出存储在_dependency.graphml_：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn dependency:tree <span class="token parameter variable">-DoutputType</span><span class="token operator">=</span>graphml <span class="token parameter variable">-DoutputFile</span><span class="token operator">=</span>dependency.graphml\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，我们可以使用任何在线可用的_graphml_阅读器工具来可视化依赖树。</p><p>对于我们的示例，我们将使用yED编辑器。我们可以在_yED_编辑器中导入_dependency.graphml_文件。虽然_yED_默认不格式化图表，但它提供了我们可以使用的多种格式。</p><p>要自定义，我们将转到_Layout_ &gt; <em>Hierarchic</em> &gt; <em>Orientation</em> &gt; <em>Left to Right</em> &gt; <em>Apply</em>。我们也可以按照我们的需求在工具上进行许多其他自定义：</p><h3 id="_3-2-使用eclipse-intellij等ide" tabindex="-1"><a class="header-anchor" href="#_3-2-使用eclipse-intellij等ide"><span>3.2. 使用Eclipse/IntelliJ等IDE</span></a></h3><p>大多数开发人员使用Eclipse和IntelliJ等IDE，这些IDE具有MJD依赖树插件。首先，我们将从Eclipse的_m2e_插件开始，它提供了一个有用的依赖视图。</p><p>安装插件（如果尚未完成），我们将打开_module1_的_pom.xml_并从标签中选择_Dependency Hierarchy_。左侧显示了我们项目中的jar的层次结构（与_-Dverbose_输出相同）。解析后的列表显示在右侧。这些是我们项目中使用的jar：</p><p>IntelliJ还具有依赖分析工具。<strong>默认的IntelliJ IDEA社区版提供了与Eclipse_m2e_插件相似的视图</strong>。我们需要选择项目，右键单击它，并选择_Dependency Analyser_：</p><p>然而，IntelliJ IDEA Ultimate提供了更多选项和更高级的图形。为此，我们选择_module1_项目，右键单击它，选择_Maven_，然后单击_Show Diagram_：</p><h3 id="_3-3-使用第三方库" tabindex="-1"><a class="header-anchor" href="#_3-3-使用第三方库"><span>3.3. 使用第三方库</span></a></h3><p>我们有一些第三方工具可以帮助分析大型依赖树。它们可以导入使用_mvn dependency:tree_创建的_graphml_文件，并进一步使用它以可视化方式分析图表。</p><p>以下是我们可以用来可视化复杂依赖树的一些工具：</p><ul><li>yworks</li><li>depgraph-maven-plugin</li><li>pom-explorer</li></ul><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们讨论了如何获取Maven项目的依赖树，并学习了如何过滤依赖树。后来，我们看了一些工具和插件来可视化依赖树。</p><p>如常，所有示例的完整源代码可在GitHub上获得。 OK</p>',45),c=[e];function o(l,i){return s(),a("div",null,c)}const d=n(p,[["render",o],["__file","Understanding Maven Dependency Graph or Tree.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/Understanding%20Maven%20Dependency%20Graph%20or%20Tree.html","title":"Maven依赖图或树的理解","lang":"zh-CN","frontmatter":{"date":"2024-06-15T00:00:00.000Z","category":["Maven","依赖管理"],"tag":["Maven","依赖树","依赖图"],"description":"Maven依赖图或树的理解 在处理大型Maven项目时可能会感到畏惧，同时跟踪所有模块和库之间的依赖关系并解决它们之间的冲突也是一个挑战。 在本教程中，我们将学习有关Maven依赖图或树的知识。首先，我们将了解如何创建依赖树，过滤依赖项，并创建不同的输出格式。接下来，我们将讨论以图形方式查看依赖树的不同方法。 2. 项目设置 在现实生活的项目中，依赖树...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Understanding%20Maven%20Dependency%20Graph%20or%20Tree.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Maven依赖图或树的理解"}],["meta",{"property":"og:description","content":"Maven依赖图或树的理解 在处理大型Maven项目时可能会感到畏惧，同时跟踪所有模块和库之间的依赖关系并解决它们之间的冲突也是一个挑战。 在本教程中，我们将学习有关Maven依赖图或树的知识。首先，我们将了解如何创建依赖树，过滤依赖项，并创建不同的输出格式。接下来，我们将讨论以图形方式查看依赖树的不同方法。 2. 项目设置 在现实生活的项目中，依赖树..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Maven"}],["meta",{"property":"article:tag","content":"依赖树"}],["meta",{"property":"article:tag","content":"依赖图"}],["meta",{"property":"article:published_time","content":"2024-06-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Maven依赖图或树的理解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"2. 项目设置","slug":"_2-项目设置","link":"#_2-项目设置","children":[]},{"level":2,"title":"3. 分析依赖图或树的方法","slug":"_3-分析依赖图或树的方法","link":"#_3-分析依赖图或树的方法","children":[{"level":3,"title":"3.1. 使用Maven依赖插件","slug":"_3-1-使用maven依赖插件","link":"#_3-1-使用maven依赖插件","children":[]},{"level":3,"title":"3.2. 使用Eclipse/IntelliJ等IDE","slug":"_3-2-使用eclipse-intellij等ide","link":"#_3-2-使用eclipse-intellij等ide","children":[]},{"level":3,"title":"3.3. 使用第三方库","slug":"_3-3-使用第三方库","link":"#_3-3-使用第三方库","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.42,"words":1627},"filePathRelative":"posts/baeldung/Archive/Understanding Maven Dependency Graph or Tree.md","localizedDate":"2024年6月15日","excerpt":"\\n<p>在处理大型Maven项目时可能会感到畏惧，同时跟踪所有模块和库之间的依赖关系并解决它们之间的冲突也是一个挑战。</p>\\n<p>在本教程中，我们将学习有关Maven依赖图或树的知识。首先，我们将了解如何创建依赖树，过滤依赖项，并创建不同的输出格式。接下来，我们将讨论以图形方式查看依赖树的不同方法。</p>\\n<h2>2. 项目设置</h2>\\n<p>在现实生活的项目中，依赖树会迅速增长并变得复杂。然而，对于我们的示例，我们将创建一个包含两个模块_module1_和_module2_的小项目，每个模块都有两到三个依赖项。此外，<em>module1_依赖于_module2</em>。</p>\\n","autoDesc":true}');export{d as comp,k as data};
