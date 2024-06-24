import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-DAOx5Ihl.js";const i={},t=e(`<h1 id="spock-与-gradle-的设置和使用" tabindex="-1"><a class="header-anchor" href="#spock-与-gradle-的设置和使用"><span>Spock 与 Gradle 的设置和使用</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Spock 框架是用于 Java 和 Groovy 应用程序的测试和规范框架。Gradle 是一个流行的构建工具，是 Maven 的替代品。</p><p>在本教程中，我们将展示如何使用 Gradle 设置项目并添加 Spock 测试依赖项。我们还将快速查看并逐步完全集成 Spock 与 Spring，同时仍使用 Gradle 构建过程。</p><p>我们需要创建一个 Gradle 项目并添加 Spock 依赖项。</p><h3 id="_2-1-设置-gradle-项目" tabindex="-1"><a class="header-anchor" href="#_2-1-设置-gradle-项目"><span>2.1. 设置 Gradle 项目</span></a></h3><p>首先，让我们在系统上安装 Gradle。然后可以使用 <em>gradle init</em> 命令初始化 Gradle 项目。创建应用程序或库的不同选项，例如使用 Java 或 Kotlin。</p><p>无论如何，Gradle 项目总是会从以下配置中获取：</p><ul><li><strong><em>build.gradle</em></strong>。它包含有关构建过程的信息，例如 Java 版本或用于实现或测试的库。我们将将其称为构建文件。</li><li><strong><em>settings.gradle</em></strong>。它添加项目范围的信息，例如项目名称或子模块结构。我们将将其称为设置文件。</li></ul><p>Gradle 使用 JVM 插件来实现项目的编译、测试和打包功能。</p><p>如果我们选择 Java，我们将通过使用 <em>‘java‘</em> 插件来保持简单，因为这将是最终扩展的基础。</p><p>让我们看看一个 Java 17 项目的简单构建骨架：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>plugins <span class="token punctuation">{</span>
    id <span class="token string">&#39;java&#39;</span>
<span class="token punctuation">}</span>

repositories <span class="token punctuation">{</span>
    <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

dependencies <span class="token punctuation">{</span>
    <span class="token comment">// 测试依赖</span>
    testImplementation <span class="token string">&#39;org.junit.jupiter:junit-jupiter:5.9.2&#39;</span>
    testRuntimeOnly <span class="token string">&#39;org.junit.platform:junit-platform-launcher&#39;</span>
<span class="token punctuation">}</span>

java <span class="token punctuation">{</span>
    toolchain <span class="token punctuation">{</span>
        languageVersion <span class="token operator">=</span> JavaLanguageVersion<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">17</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

test <span class="token punctuation">{</span>
    <span class="token function">useJUnitPlatform</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    testLogging <span class="token punctuation">{</span>
        events <span class="token interpolation-string"><span class="token string">&quot;started&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;passed&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;skipped&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;failed&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个文件是核心组件，定义了构建项目所需的任务。</p><p>我们添加了 JUnit5 测试依赖项：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>testImplementation <span class="token string">&#39;org.junit.jupiter:junit-jupiter:5.9.2&#39;</span>
testRuntimeOnly <span class="token string">&#39;org.junit.platform:junit-platform-launcher&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要在测试任务中添加 <em>useJUnitPlatform()</em> 规范来运行测试。我们还为测试日志添加了一些属性，以便在任务运行时有输出：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>test <span class="token punctuation">{</span>
    <span class="token function">useJUnitPlatform</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    testLogging <span class="token punctuation">{</span>
        events <span class="token interpolation-string"><span class="token string">&quot;started&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;passed&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;skipped&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;failed&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还看到我们的项目如何使用 <em>mavenCentral()</em> 仓库下载依赖项：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>repositories <span class="token punctuation">{</span>
    <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，一些人可能会发现，与基于 XML 的 <em>pom.xml</em> 构建配置的 Maven 项目相比，配置更具可读性。</p><p>最后，让我们也看看设置文件：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>rootProject<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;spring-boot-testing-spock&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是非常简单的，只配置了项目名称。然而，它可以包含相关信息，例如子模块包含或插件定义。</p><p>我们可以查看 Gradle DSL 参考以获取有关 <em>build</em> 或 <em>settings</em> 脚本的更多信息。</p><h3 id="_2-2-添加-spock-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-2-添加-spock-依赖项"><span>2.2. 添加 Spock 依赖项</span></a></h3><p>将 Spock 添加到我们的 Gradle 项目中需要两个简单的步骤：</p><ul><li>添加 <em>‘groovy’</em> 插件</li><li>将 Spock 添加到测试依赖项</li></ul><p>让我们看看构建文件：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>plugins <span class="token punctuation">{</span>
    id <span class="token string">&#39;java&#39;</span>
    id <span class="token string">&#39;groovy&#39;</span>
<span class="token punctuation">}</span>

repositories <span class="token punctuation">{</span>
    <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

dependencies <span class="token punctuation">{</span>
    <span class="token comment">// Spock 测试依赖</span>
    testImplementation <span class="token string">&#39;org.spockframework:spock-core:2.4-M1-groovy-4.0&#39;</span>
    <span class="token comment">// JUnit 依赖</span>
    testImplementation <span class="token string">&#39;org.junit.jupiter:junit-jupiter:5.9.2&#39;</span>
    testRuntimeOnly <span class="token string">&#39;org.junit.platform:junit-platform-launcher&#39;</span>
<span class="token punctuation">}</span>

java <span class="token punctuation">{</span>
    toolchain <span class="token punctuation">{</span>
        languageVersion <span class="token operator">=</span> JavaLanguageVersion<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">17</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

test <span class="token punctuation">{</span>
    <span class="token function">useJUnitPlatform</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    testLogging <span class="token punctuation">{</span>
        events <span class="token interpolation-string"><span class="token string">&quot;started&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;passed&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;skipped&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;failed&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们必须通过添加 <em>org.spockframework:spock-core</em> 测试依赖项来更新我们的依赖项：</strong></p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>testImplementation <span class="token string">&#39;org.spockframework:spock-core:2.4-M1-groovy-4.0&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>值得注意的是，我们不需要像 Maven 项目那样配置 GMavenPlus 插件。</p><h3 id="_2-3-运行测试" tabindex="-1"><a class="header-anchor" href="#_2-3-运行测试"><span>2.3. 运行测试</span></a></h3><p>我们可以使用 Spock 进行不同类型的测试。让我们看看一个简单的测试用例：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code><span class="token keyword">class</span> <span class="token class-name">SpockTest</span> <span class="token keyword">extends</span> <span class="token class-name">Specification</span> <span class="token punctuation">{</span>
    <span class="token keyword">def</span> <span class="token interpolation-string"><span class="token string">&quot;one plus one should equal two&quot;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token spock-block">expect:</span>
        <span class="token number">1</span> <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">==</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个测试都必须扩展 <em>Specification</em> 类。此外，测试被定义为使用 Groovy <em>def</em> 语法的函数。</p><p>如果我们习惯于使用 Java 编程，<strong>我们需要记住 Spock 测试默认情况下在不同的包中，并且有另一个类扩展</strong>。如果我们没有特别指定，必须将测试放在 <em>test/groovy</em> 文件夹中。此外，类将具有 <em>.groovy</em> 扩展名，例如 <em>SpockTest.groovy</em>。</p><p>要运行测试，我们需要使用 IDE 或命令行执行测试任务：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>gradle <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们检查一些示例输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Starting a Gradle Daemon (subsequent builds will be faster)

&gt; Task :test

SpockTest &gt; one plus one should equal two STARTED

SpockTest &gt; one plus one should equal two PASSED

BUILD SUCCESSFUL in 15s
7 actionable tasks: 7 executed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Gradle 使用缓存系统，并且只有在上次执行以来发生变化的测试才会重新运行。</p><h2 id="_3-使用-spock、gradle-和-spring" tabindex="-1"><a class="header-anchor" href="#_3-使用-spock、gradle-和-spring"><span>3. 使用 Spock、Gradle 和 Spring</span></a></h2><p>我们可能想要将 Spock 添加到 Spring 项目中。Spock 有一个特定的模块用于此。</p><p>让我们看看 Spock 与基本 Spring 配置的使用。稍后，我们还将看看 Spring Boot 设置。从现在开始，我们将省略构建文件中的 <em>java</em> 和 <em>test</em> 部分，以简洁起见，因为它们不会改变。</p><h3 id="_3-1-spock-和-spring" tabindex="-1"><a class="header-anchor" href="#_3-1-spock-和-spring"><span>3.1. Spock 和 Spring</span></a></h3><p>假设我们有一个 Spring 项目，并希望切换或采用 Spock 进行测试。</p><p>构建文件中的依赖结构现在变得更加复杂，让我们正确地注释每个部分：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>plugins <span class="token punctuation">{</span>
    id <span class="token string">&#39;java&#39;</span>
    id <span class="token string">&#39;groovy&#39;</span>
<span class="token punctuation">}</span>

repositories <span class="token punctuation">{</span>
    <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

dependencies <span class="token punctuation">{</span>
    <span class="token comment">// Spring 实现依赖</span>
    implementation <span class="token string">&#39;org.springframework:spring-web:6.1.0&#39;</span>

    <span class="token comment">// Spring 测试依赖</span>
    testImplementation <span class="token string">&#39;org.springframework:spring-test:6.1.0&#39;</span>

    <span class="token comment">// Spring Spock 测试依赖</span>
    testImplementation <span class="token string">&#39;org.spockframework:spock-spring:2.4-M1-groovy-4.0&#39;</span>

    <span class="token comment">// Spock 核心测试依赖</span>
    testImplementation <span class="token string">&#39;org.spockframework:spock-core:2.4-M1-groovy-4.0&#39;</span>

    <span class="token comment">// JUnit 测试依赖</span>
    testImplementation <span class="token string">&#39;org.junit.jupiter:junit-jupiter:5.9.2&#39;</span>
    testRuntimeOnly <span class="token string">&#39;org.junit.platform:junit-platform-launcher&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们添加了 <em>org.springframework:spring-web</em> 来演示一个简单的 Spring 依赖。此外，如果我们想使用 Spring 测试特性，我们必须添加 <em>org.springframework:spring-test</em> 测试依赖：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code><span class="token comment">// Spring 实现依赖</span>
implementation <span class="token string">&#39;org.springframework:spring-web:6.1.0&#39;</span>

<span class="token comment">// Spring 测试依赖</span>
testImplementation <span class="token string">&#39;org.springframework:spring-test:6.1.0&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>最后，让我们添加 <em>org.spockframework:spock-spring</em> 依赖项。这是我们唯一需要集成 Spock 和 Spring 的依赖项：</strong></p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code><span class="token comment">// Spring Spock 测试依赖</span>
testImplementation <span class="token string">&#39;org.spockframework:spock-spring:2.4-M1-groovy-4.0&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-spock-和-spring-boot" tabindex="-1"><a class="header-anchor" href="#_3-2-spock-和-spring-boot"><span>3.2. Spock 和 Spring Boot</span></a></h3><p>我们只需要用 Spring Boot 的依赖项替换之前的 Spring 基本依赖项。</p><p>让我们看看构建文件：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>plugins <span class="token punctuation">{</span>
    id <span class="token string">&#39;java&#39;</span>
    id <span class="token string">&#39;groovy&#39;</span>
<span class="token punctuation">}</span>

repositories <span class="token punctuation">{</span>
    <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

dependencies <span class="token punctuation">{</span>
    <span class="token comment">// Spring 实现依赖</span>
    implementation <span class="token string">&#39;org.springframework.boot:spring-boot-starter-web:3.0.0&#39;</span>

    <span class="token comment">// Spring 测试依赖</span>
    testImplementation <span class="token string">&#39;org.springframework.boot:spring-boot-starter-test:3.0.0&#39;</span>

    <span class="token comment">// Spring Spock 测试依赖</span>
    testImplementation <span class="token string">&#39;org.spockframework:spock-spring:2.4-M1-groovy-4.0&#39;</span>

    <span class="token comment">// Spring 核心测试依赖</span>
    testImplementation <span class="token string">&#39;org.spockframework:spock-core:2.4-M1-groovy-4.0&#39;</span>

    <span class="token comment">// JUnit 测试依赖</span>
    testImplementation</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,58),o=[t];function p(l,r){return a(),s("div",null,o)}const u=n(i,[["render",p],["__file","2024-06-23-Setting up and Using Spock With Gradle.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Setting%20up%20and%20Using%20Spock%20With%20Gradle.html","title":"Spock 与 Gradle 的设置和使用","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Java","Spock"],"tag":["Spock","Gradle"],"head":[["meta",{"name":"keywords","content":"Spock, Gradle, Java, 测试框架, 构建工具"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Setting%20up%20and%20Using%20Spock%20With%20Gradle.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spock 与 Gradle 的设置和使用"}],["meta",{"property":"og:description","content":"Spock 与 Gradle 的设置和使用 1. 概述 Spock 框架是用于 Java 和 Groovy 应用程序的测试和规范框架。Gradle 是一个流行的构建工具，是 Maven 的替代品。 在本教程中，我们将展示如何使用 Gradle 设置项目并添加 Spock 测试依赖项。我们还将快速查看并逐步完全集成 Spock 与 Spring，同时仍使..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T22:50:29.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spock"}],["meta",{"property":"article:tag","content":"Gradle"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T22:50:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spock 与 Gradle 的设置和使用\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T22:50:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spock 与 Gradle 的设置和使用 1. 概述 Spock 框架是用于 Java 和 Groovy 应用程序的测试和规范框架。Gradle 是一个流行的构建工具，是 Maven 的替代品。 在本教程中，我们将展示如何使用 Gradle 设置项目并添加 Spock 测试依赖项。我们还将快速查看并逐步完全集成 Spock 与 Spring，同时仍使..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[{"level":3,"title":"2.1. 设置 Gradle 项目","slug":"_2-1-设置-gradle-项目","link":"#_2-1-设置-gradle-项目","children":[]},{"level":3,"title":"2.2. 添加 Spock 依赖项","slug":"_2-2-添加-spock-依赖项","link":"#_2-2-添加-spock-依赖项","children":[]},{"level":3,"title":"2.3. 运行测试","slug":"_2-3-运行测试","link":"#_2-3-运行测试","children":[]}]},{"level":2,"title":"3. 使用 Spock、Gradle 和 Spring","slug":"_3-使用-spock、gradle-和-spring","link":"#_3-使用-spock、gradle-和-spring","children":[{"level":3,"title":"3.1. Spock 和 Spring","slug":"_3-1-spock-和-spring","link":"#_3-1-spock-和-spring","children":[]},{"level":3,"title":"3.2. Spock 和 Spring Boot","slug":"_3-2-spock-和-spring-boot","link":"#_3-2-spock-和-spring-boot","children":[]}]}],"git":{"createdTime":1719183029000,"updatedTime":1719183029000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.07,"words":1521},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Setting up and Using Spock With Gradle.md","localizedDate":"2024年6月24日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>Spock 框架是用于 Java 和 Groovy 应用程序的测试和规范框架。Gradle 是一个流行的构建工具，是 Maven 的替代品。</p>\\n<p>在本教程中，我们将展示如何使用 Gradle 设置项目并添加 Spock 测试依赖项。我们还将快速查看并逐步完全集成 Spock 与 Spring，同时仍使用 Gradle 构建过程。</p>\\n<p>我们需要创建一个 Gradle 项目并添加 Spock 依赖项。</p>\\n<h3>2.1. 设置 Gradle 项目</h3>\\n<p>首先，让我们在系统上安装 Gradle。然后可以使用 <em>gradle init</em> 命令初始化 Gradle 项目。创建应用程序或库的不同选项，例如使用 Java 或 Kotlin。</p>","autoDesc":true}');export{u as comp,v as data};
