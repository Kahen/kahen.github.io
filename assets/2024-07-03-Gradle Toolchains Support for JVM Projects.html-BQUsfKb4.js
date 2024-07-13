import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DkA39C0B.js";const e={},o=t(`<h1 id="gradle工具链支持jvm项目" tabindex="-1"><a class="header-anchor" href="#gradle工具链支持jvm项目"><span>Gradle工具链支持JVM项目</span></a></h1><p>在本教程中，我们将探索Gradle对JVM项目的工具链支持。</p><p>我们首先理解这一特性背后的动机。然后，我们将定义它，并用实际的例子来尝试它。</p><p>在讨论什么是工具链之前，我们需要谈论它存在的原因。假设我们要写一个Java项目。我们的Java项目可能包含一些测试。因此，我们至少想要编译我们的代码并运行测试。我们添加了内置的Gradle Java插件，并指定了我们想要的字节码版本：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>plugins <span class="token punctuation">{</span>
    id <span class="token string">&#39;java&#39;</span>
<span class="token punctuation">}</span>

java <span class="token punctuation">{</span>
    sourceCompatibility <span class="token operator">=</span> JavaVersion<span class="token punctuation">.</span>VERSION_1_8
    targetCompatibility <span class="token operator">=</span> JavaVersion<span class="token punctuation">.</span>VERSION_1_8
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，如果需要，我们还可以告诉Gradle将我们的测试类编译成不同的字节码版本：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>tasks <span class="token punctuation">{</span>
    compileTestJava <span class="token punctuation">{</span>
        sourceCompatibility <span class="token operator">=</span> JavaVersion<span class="token punctuation">.</span>VERSION_1_7
        targetCompatibility <span class="token operator">=</span> JavaVersion<span class="token punctuation">.</span>VERSION_1_7
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到目前为止，一切都很好。<strong>唯一的细微差别是，Gradle编译我们的源代码/测试类时，使用的是它自己的JDK，即它运行时相同的JDK</strong>。我们可以通过指定要使用的确切可执行文件来解决这个问题：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>compileTestJava<span class="token punctuation">.</span><span class="token function">getOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setFork</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
compileTestJava<span class="token punctuation">.</span><span class="token function">getOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getForkOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setExecutable</span><span class="token punctuation">(</span><span class="token string">&#39;/home/mpolivaha/.jdks/corretto-17.0.4.1/bin/javac&#39;</span><span class="token punctuation">)</span>

compileJava<span class="token punctuation">.</span><span class="token function">getOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setFork</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
compileJava<span class="token punctuation">.</span><span class="token function">getOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getForkOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setExecutable</span><span class="token punctuation">(</span><span class="token string">&#39;/home/mpolivaha/.jdks/corretto-17.0.4.1/bin/javac&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，<strong>如果我们在构建过程中使用不同的JDKs</strong>，就会出现问题。</p><p>例如，假设我们在发布之前必须在我们的客户的JDKs上测试我们的Java应用程序。这些JDKs可能来自不同的供应商，尽管符合规范，但在细节上可能有所不同。我们理论上可以不使用工具链来解决这个问题，但这将是一个更复杂的解决方案。工具链使配置构建变得更容易，这些构建需要不同目的的不同JDKs。</p><p>从6.7版本开始，Gradle引入了JVM工具链特性。工具链的概念并不新鲜，它在Maven中已经存在了一段时间。一般来说，<strong>工具链是构建、测试和运行软件所需的一套工具和二进制文件</strong>。因此，在Java中，我们可以将JDK视为Java工具链，因为它允许编译、测试和运行Java程序。</p><p>我们可以在项目级别定义工具链，例如，在这种情况下，它看起来像这样：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>java <span class="token punctuation">{</span>
    toolchain <span class="token punctuation">{</span>
        languageVersion <span class="token operator">=</span> JavaLanguageVersion<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">17</span><span class="token punctuation">)</span>
        vendor <span class="token operator">=</span> JvmVendorSpec<span class="token punctuation">.</span>AMAZON
        implementation <span class="token operator">=</span> JvmImplementation<span class="token punctuation">.</span>VENDOR_SPECIFIC
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，我们可以指定所需的Java版本、JDK供应商以及这个供应商的特定JVM实现。为了使工具链规范正确，我们至少必须设置版本。</p><p>当Gradle处理工具链时，它的操作很简单。首先，它会尝试在本地找到请求的工具链；这里有一个特定的算法。如果Gradle在本地找不到所需的工具链，它会尝试远程查找并下载它。如果Gradle无法远程找到所需的工具链，构建将失败。</p><p>还值得一提的是，有时我们可能想要禁用自动配置。我们可以通过向Gradle可执行文件传递<code>-Porg.gradle.java.installations.auto-download=false</code>来实现这一点。在这种情况下，如果找不到本地工具链，Gradle构建将失败。</p><p>工具链的真正威力在于能够按任务方式指定JDK安装：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>tasks<span class="token punctuation">.</span><span class="token function">named</span><span class="token punctuation">(</span><span class="token string">&#39;compileJava&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>configure <span class="token punctuation">{</span>
    javaCompiler <span class="token operator">=</span> javaToolchains<span class="token punctuation">.</span>compilerFor <span class="token punctuation">{</span>
        languageVersion <span class="token operator">=</span> JavaLanguageVersion<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">17</span><span class="token punctuation">)</span>
        vendor <span class="token operator">=</span> JvmVendorSpec<span class="token punctuation">.</span>AMAZON
        implementation <span class="token operator">=</span> JvmImplementation<span class="token punctuation">.</span>VENDOR_SPECIFIC
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

tasks<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;testOnAmazonJdk&quot;</span></span><span class="token punctuation">,</span> Test<span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    javaLauncher <span class="token operator">=</span> javaToolchains<span class="token punctuation">.</span>launcherFor <span class="token punctuation">{</span>
        languageVersion <span class="token operator">=</span> JavaLanguageVersion<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">17</span><span class="token punctuation">)</span>
        vendor <span class="token operator">=</span> JvmVendorSpec<span class="token punctuation">.</span>AMAZON
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

tasks<span class="token punctuation">.</span><span class="token function">named</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;testClasses&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">finalizedBy</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;testOnAmazonJdk&quot;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们配置了compileJava任务在Oracle JDK 15上运行。我们还创建了testOnAmazonJdk任务，它将在testClasses任务之后立即运行。注意，这个新任务也在一个单独的JDK上执行。</p><p>最后，Gradle允许我们使用以下命令查看当前项目可用的本地工具链安装：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>gradle javaToolchains
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>首先，Gradle将在当前位置搜索构建文件。然后，它将根据构建文件中指定的位置/规则列出找到的工具链。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这个快速教程中，我们回顾了Gradle工具链特性。如果适用，这个特性简化了在构建过程中使用不同的JDKs的工作。它从Gradle 6.7开始可用，并且我们可以在任务级别应用它，这使得这个特性非常有价值。</p><p>如常，本文的源代码可以在GitHub上找到。</p>`,26),p=[o];function i(c,l){return s(),a("div",null,p)}const d=n(e,[["render",i],["__file","2024-07-03-Gradle Toolchains Support for JVM Projects.html.vue"]]),v=JSON.parse(`{"path":"/posts/baeldung/2024-07-03/2024-07-03-Gradle%20Toolchains%20Support%20for%20JVM%20Projects.html","title":"Gradle工具链支持JVM项目","lang":"zh-CN","frontmatter":{"date":"2024-07-03T00:00:00.000Z","category":["Java","Gradle"],"tag":["JVM","Toolchains"],"head":[["meta",{"name":"keywords","content":"Java, Gradle, Toolchains, JVM, 编译, 构建"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Gradle%20Toolchains%20Support%20for%20JVM%20Projects.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Gradle工具链支持JVM项目"}],["meta",{"property":"og:description","content":"Gradle工具链支持JVM项目 在本教程中，我们将探索Gradle对JVM项目的工具链支持。 我们首先理解这一特性背后的动机。然后，我们将定义它，并用实际的例子来尝试它。 在讨论什么是工具链之前，我们需要谈论它存在的原因。假设我们要写一个Java项目。我们的Java项目可能包含一些测试。因此，我们至少想要编译我们的代码并运行测试。我们添加了内置的Gr..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T03:34:14.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JVM"}],["meta",{"property":"article:tag","content":"Toolchains"}],["meta",{"property":"article:published_time","content":"2024-07-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T03:34:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Gradle工具链支持JVM项目\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-03T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T03:34:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Gradle工具链支持JVM项目 在本教程中，我们将探索Gradle对JVM项目的工具链支持。 我们首先理解这一特性背后的动机。然后，我们将定义它，并用实际的例子来尝试它。 在讨论什么是工具链之前，我们需要谈论它存在的原因。假设我们要写一个Java项目。我们的Java项目可能包含一些测试。因此，我们至少想要编译我们的代码并运行测试。我们添加了内置的Gr..."},"headers":[{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719977654000,"updatedTime":1719977654000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.66,"words":1099},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Gradle Toolchains Support for JVM Projects.md","localizedDate":"2024年7月3日","excerpt":"\\n<p>在本教程中，我们将探索Gradle对JVM项目的工具链支持。</p>\\n<p>我们首先理解这一特性背后的动机。然后，我们将定义它，并用实际的例子来尝试它。</p>\\n<p>在讨论什么是工具链之前，我们需要谈论它存在的原因。假设我们要写一个Java项目。我们的Java项目可能包含一些测试。因此，我们至少想要编译我们的代码并运行测试。我们添加了内置的Gradle Java插件，并指定了我们想要的字节码版本：</p>\\n<div class=\\"language-groovy\\" data-ext=\\"groovy\\" data-title=\\"groovy\\"><pre class=\\"language-groovy\\"><code>plugins <span class=\\"token punctuation\\">{</span>\\n    id <span class=\\"token string\\">'java'</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\njava <span class=\\"token punctuation\\">{</span>\\n    sourceCompatibility <span class=\\"token operator\\">=</span> JavaVersion<span class=\\"token punctuation\\">.</span>VERSION_1_8\\n    targetCompatibility <span class=\\"token operator\\">=</span> JavaVersion<span class=\\"token punctuation\\">.</span>VERSION_1_8\\n<span class=\\"token punctuation\\">}</span>\\n\\n</code></pre></div>","autoDesc":true}`);export{d as comp,v as data};
