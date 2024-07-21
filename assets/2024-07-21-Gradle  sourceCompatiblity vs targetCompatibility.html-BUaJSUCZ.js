import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-CXN34Kw1.js";const e={},o=t(`<h1 id="gradle-sourcecompatibility-与-targetcompatibility-baeldung" tabindex="-1"><a class="header-anchor" href="#gradle-sourcecompatibility-与-targetcompatibility-baeldung"><span>Gradle: sourceCompatibility 与 targetCompatibility | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本文中，我们将探讨 Java 配置中的 <strong><em>sourceCompatibility</em></strong> 和 <strong><em>targetCompatibility</em></strong> 之间的差异以及它们在 Gradle 中的使用方式。</p><p>你可以查看我们关于 Gradle 入门的文章来了解更多基础知识。</p><h2 id="_2-java-中的版本处理" tabindex="-1"><a class="header-anchor" href="#_2-java-中的版本处理"><span>2. Java 中的版本处理</span></a></h2><p>当我们使用 <strong><em>javac</em></strong> 编译 Java 程序时，我们可以提供版本处理的编译选项。有两种可用的选项：</p><ul><li><strong>--source</strong> 其值与 Java 版本匹配，<strong>直至我们用于编译的 JDK 版本</strong>（例如，JDK8 的 1.8）。我们提供的版本值将<strong>限制我们可以在源代码中使用的 Java 语言特性</strong>。</li><li><strong>--target</strong> 类似，但控制生成的类文件的版本。这意味着我们提供的版本值将是<strong>我们的程序能够运行的最低 Java 版本</strong>。</li></ul><p>例如：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>javac HelloWorld.java <span class="token parameter variable">-source</span> <span class="token number">1.6</span> <span class="token parameter variable">-target</span> <span class="token number">1.8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将生成一个类文件，<strong>需要 Java 8 或更高版本才能运行</strong>。此外，源代码<strong>不能包含 lambda 表达式或 Java 6 中不可用的特性</strong>。</p><h2 id="_3-使用-gradle-处理版本" tabindex="-1"><a class="header-anchor" href="#_3-使用-gradle-处理版本"><span>3. 使用 Gradle 处理版本</span></a></h2><p>Gradle 以及 Java 插件允许我们使用 <strong>java</strong> 任务的 <strong><em>sourceCompatibility</em></strong> 和 <strong><em>targetCompatibility</em></strong> 配置来设置 <strong><em>source</em></strong> 和 <strong><em>target</em></strong> 选项。同样，<strong>我们使用与</strong> <strong>javac</strong> <strong>相同的值</strong>。</p><p>让我们设置 <strong>build.gradle</strong> 文件：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>plugins <span class="token punctuation">{</span>
    id <span class="token string">&#39;java&#39;</span>
<span class="token punctuation">}</span>

group <span class="token string">&#39;com.baeldung&#39;</span>

java <span class="token punctuation">{</span>
    sourceCompatibility <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;1.6&quot;</span></span>
    targetCompatibility <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;1.8&quot;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-helloworldapp-示例编译" tabindex="-1"><a class="header-anchor" href="#_4-helloworldapp-示例编译"><span>4. HelloWorldApp 示例编译</span></a></h2><p>我们可以创建一个 Hello World! 控制台应用程序，并通过使用上述脚本构建它来演示功能。</p><p>让我们创建一个非常简单的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorldApp</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们使用 <strong>gradle build</strong> 命令构建它时，Gradle 将生成一个名为 <strong>HelloWorldApp.class</strong> 的类文件。</p><p>我们可以使用 Java 附带的 <strong>javap</strong> 命令行工具来检查这个类文件生成的字节码版本：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>javap <span class="token parameter variable">-verbose</span> HelloWorldApp.class
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这打印了很多信息，但在前几行中，我们可以看到：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>public class com.baeldung.helloworld.HelloWorldApp
  minor version: <span class="token number">0</span>
  major version: <span class="token number">52</span>
  flags: ACC_PUBLIC, ACC_SUPER
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>主版本</strong> 字段的值为 52，这是 Java 8 类文件的版本号。这意味着我们的 <strong>HelloWorldApp.class</strong> <strong>只能使用 Java 8 及以上版本运行</strong>。</p><p>要测试 <strong>sourceCompatibility</strong> 配置，我们可以更改源代码并引入 Java 6 中不可用的特性。</p><p>让我们使用一个 lambda 表达式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorldApp</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Runnable</span> helloLambda <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        helloLambda<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们尝试使用 Gradle 构建我们的代码，我们将看到一个编译错误：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>error: lambda expressions are not supported <span class="token keyword">in</span> <span class="token parameter variable">-source</span> <span class="token number">1.6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>相当于 <strong>sourceCompatibility</strong> 的 <strong>-source</strong> 选项防止了我们的代码编译。基本上，它<strong>防止我们无意中使用高版本特性</strong>，如果我们不想引入它们——例如，我们可能希望我们的应用程序也能在 Java 6 运行时上运行。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们解释了如何使用 <strong>-source</strong> 和 <strong>-target</strong> 编译选项来处理我们的 Java 源代码和目标运行时的版本。此外，我们学习了这些选项如何映射到 Gradle 的 <strong>sourceCompatibility</strong> 和 <strong>targetCompatibility</strong> 配置以及 Java 插件，并在实践中演示了它们的功能。</p><p>如往常一样，本文的源代码可在 GitHub 上获取。翻译已完成，以下是文章的剩余部分：</p><hr><h2 id="_5-结论-1" tabindex="-1"><a class="header-anchor" href="#_5-结论-1"><span>5. 结论</span></a></h2><p>在本文中，我们解释了如何使用 <strong>-source</strong> 和 <strong>-target</strong> 编译选项来处理我们的 Java 源代码和目标运行时的版本。此外，我们学习了这些选项如何映射到 Gradle 的 <strong>sourceCompatibility</strong> 和 <strong>targetCompatibility</strong> 配置以及 Java 插件，并在实践中演示了它们的功能。</p><p>如往常一样，本文的源代码可在 GitHub 上获取。</p><p>OK</p>`,38),l=[o];function i(r,p){return s(),n("div",null,l)}const u=a(e,[["render",i],["__file","2024-07-21-Gradle  sourceCompatiblity vs targetCompatibility.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Gradle%20%20sourceCompatiblity%20vs%20targetCompatibility.html","title":"Gradle: sourceCompatibility 与 targetCompatibility | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-22T00:00:00.000Z","category":["编程","Java"],"tag":["Gradle","Java版本"],"head":[["meta",{"name":"keywords","content":"Gradle, Java版本, sourceCompatibility, targetCompatibility"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Gradle%20%20sourceCompatiblity%20vs%20targetCompatibility.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Gradle: sourceCompatibility 与 targetCompatibility | Baeldung"}],["meta",{"property":"og:description","content":"Gradle: sourceCompatibility 与 targetCompatibility | Baeldung 1. 概述 在本文中，我们将探讨 Java 配置中的 sourceCompatibility 和 targetCompatibility 之间的差异以及它们在 Gradle 中的使用方式。 你可以查看我们关于 Gradle 入门的文..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T20:24:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Gradle"}],["meta",{"property":"article:tag","content":"Java版本"}],["meta",{"property":"article:published_time","content":"2024-07-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T20:24:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Gradle: sourceCompatibility 与 targetCompatibility | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T20:24:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Gradle: sourceCompatibility 与 targetCompatibility | Baeldung 1. 概述 在本文中，我们将探讨 Java 配置中的 sourceCompatibility 和 targetCompatibility 之间的差异以及它们在 Gradle 中的使用方式。 你可以查看我们关于 Gradle 入门的文..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Java 中的版本处理","slug":"_2-java-中的版本处理","link":"#_2-java-中的版本处理","children":[]},{"level":2,"title":"3. 使用 Gradle 处理版本","slug":"_3-使用-gradle-处理版本","link":"#_3-使用-gradle-处理版本","children":[]},{"level":2,"title":"4. HelloWorldApp 示例编译","slug":"_4-helloworldapp-示例编译","link":"#_4-helloworldapp-示例编译","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论-1","link":"#_5-结论-1","children":[]}],"git":{"createdTime":1721593494000,"updatedTime":1721593494000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.11,"words":934},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Gradle  sourceCompatiblity vs targetCompatibility.md","localizedDate":"2024年7月22日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本文中，我们将探讨 Java 配置中的 <strong><em>sourceCompatibility</em></strong> 和 <strong><em>targetCompatibility</em></strong> 之间的差异以及它们在 Gradle 中的使用方式。</p>\\n<p>你可以查看我们关于 Gradle 入门的文章来了解更多基础知识。</p>\\n<h2>2. Java 中的版本处理</h2>\\n<p>当我们使用 <strong><em>javac</em></strong> 编译 Java 程序时，我们可以提供版本处理的编译选项。有两种可用的选项：</p>","autoDesc":true}');export{u as comp,g as data};
