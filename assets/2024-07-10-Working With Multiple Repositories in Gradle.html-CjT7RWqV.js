import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-DfO5Xg_k.js";const t={},i=e(`<h1 id="在gradle中使用多个仓库" tabindex="-1"><a class="header-anchor" href="#在gradle中使用多个仓库"><span>在Gradle中使用多个仓库</span></a></h1><p>在本教程中，我们将看到如何在Gradle项目中使用多个仓库。这在我们需要使用Maven Central上不可用的JAR文件时非常有用。我们还将看到如何使用GitHub发布Java包并在不同项目之间共享它们。</p><p>在使用Gradle作为构建工具时，我们经常在<code>build.gradle</code>的<code>repositories</code>部分遇到<code>mavenCentral()</code>。如果我们想要添加其他仓库，我们可以将它们添加到同一节中，以指示我们的库的来源：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>repositories {
    mavenLocal()
    mavenCentral()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，<code>mavenLocal()</code>用于在Maven的本地缓存中查找所有依赖项。在该缓存中未找到的任何仓库都将从Maven Central下载。</p><h3 id="_3-1-发布包到github-package-registry" tabindex="-1"><a class="header-anchor" href="#_3-1-发布包到github-package-registry"><span>3.1. 发布包到GitHub Package Registry</span></a></h3><p>我们将发布以下类到GitHub注册表，并稍后在另一个项目中使用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> dob<span class="token punctuation">;</span>

   <span class="token comment">// 标准构造函数，getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了发布我们的代码，<strong>我们需要来自GitHub的个人访问令牌</strong>。我们可以通过遵循GitHub文档中提供的说明来创建一个。然后，我们添加一个发布任务到我们的<code>build.gradle</code>文件，使用我们的用户名和这个令牌：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>publishing <span class="token punctuation">{</span>
    publications <span class="token punctuation">{</span>
        <span class="token function">register</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;jar&quot;</span></span><span class="token punctuation">,</span> MavenPublication<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">from</span><span class="token punctuation">(</span>components<span class="token punctuation">[</span><span class="token interpolation-string"><span class="token string">&quot;java&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span>
            pom <span class="token punctuation">{</span>
                url<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;https://github.com/eugenp/tutorials.git&quot;</span></span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    repositories <span class="token punctuation">{</span>
        maven <span class="token punctuation">{</span>
            name <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;GitHubPackages&quot;</span></span>
            url <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;https://maven.pkg.github.com/eugenp/tutorials&quot;</span></span>
            credentials <span class="token punctuation">{</span>
                username <span class="token operator">=</span> project<span class="token punctuation">.</span>USERNAME
                password <span class="token operator">=</span> project<span class="token punctuation">.</span>GITHUB_TOKEN
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码片段中，<strong>用户名和密码是在执行Gradle的发布任务时提供的项目级变量</strong>。</p><h3 id="_3-2-使用已发布包作为库" tabindex="-1"><a class="header-anchor" href="#_3-2-使用已发布包作为库"><span>3.2. 使用已发布包作为库</span></a></h3><p>成功发布我们的包后，<strong>我们可以将其作为来自经过身份验证的仓库的库安装</strong>。让我们在<code>build.gradle</code>中添加以下代码，以在新项目中使用已发布的包：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>repositories <span class="token punctuation">{</span>
    <span class="token comment">// 其他仓库</span>
    maven <span class="token punctuation">{</span>
        name <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;GitHubPackages&quot;</span></span>
        url <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;https://maven.pkg.github.com/eugenp/tutorials&quot;</span></span>
        credentials <span class="token punctuation">{</span>
            username <span class="token operator">=</span> project<span class="token punctuation">.</span>USERNAME
            password <span class="token operator">=</span> project<span class="token punctuation">.</span>GITHUB_TOKEN
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
dependencies <span class="token punctuation">{</span>
    <span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string">&#39;com.baeldung.gradle:publish-package:1.0.0-SNAPSHOT&#39;</span><span class="token punctuation">)</span>
    <span class="token function">testImplementation</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;org.junit.jupiter:junit-jupiter-engine:5.9.0&quot;</span></span><span class="token punctuation">)</span>
    <span class="token comment">// 其他依赖项</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将从GitHub Package Registry安装库，并允许我们在项目中扩展该类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token keyword">extends</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> studentCode<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> lastInstitution<span class="token punctuation">;</span>
    <span class="token comment">// 标准构造函数，getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用一个简单的测试方法来测试我们的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testPublishedPackage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">Student</span> student <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    student<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    student<span class="token punctuation">.</span><span class="token function">setStudentCode</span><span class="token punctuation">(</span><span class="token string">&quot;CD-875&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    student<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    student<span class="token punctuation">.</span><span class="token function">setLastInstitution</span><span class="token punctuation">(</span><span class="token string">&quot;Institute of Technology&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span> student<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们看到了如何在Gradle项目中使用来自多个仓库的库。我们还学习了如何使用GitHub Package Registry进行经过身份验证的仓库。</p><p>如常，示例的源代码可以在GitHub上找到。</p>`,21),p=[i];function o(l,c){return s(),a("div",null,p)}const d=n(t,[["render",o],["__file","2024-07-10-Working With Multiple Repositories in Gradle.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Working%20With%20Multiple%20Repositories%20in%20Gradle.html","title":"在Gradle中使用多个仓库","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Gradle"],"tag":["多仓库管理","Gradle"],"head":[["meta",{"name":"keywords","content":"Gradle, Maven, GitHub Package Registry, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Working%20With%20Multiple%20Repositories%20in%20Gradle.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Gradle中使用多个仓库"}],["meta",{"property":"og:description","content":"在Gradle中使用多个仓库 在本教程中，我们将看到如何在Gradle项目中使用多个仓库。这在我们需要使用Maven Central上不可用的JAR文件时非常有用。我们还将看到如何使用GitHub发布Java包并在不同项目之间共享它们。 在使用Gradle作为构建工具时，我们经常在build.gradle的repositories部分遇到mavenCe..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T22:42:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"多仓库管理"}],["meta",{"property":"article:tag","content":"Gradle"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T22:42:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Gradle中使用多个仓库\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T22:42:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Gradle中使用多个仓库 在本教程中，我们将看到如何在Gradle项目中使用多个仓库。这在我们需要使用Maven Central上不可用的JAR文件时非常有用。我们还将看到如何使用GitHub发布Java包并在不同项目之间共享它们。 在使用Gradle作为构建工具时，我们经常在build.gradle的repositories部分遇到mavenCe..."},"headers":[{"level":3,"title":"3.1. 发布包到GitHub Package Registry","slug":"_3-1-发布包到github-package-registry","link":"#_3-1-发布包到github-package-registry","children":[]},{"level":3,"title":"3.2. 使用已发布包作为库","slug":"_3-2-使用已发布包作为库","link":"#_3-2-使用已发布包作为库","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720651348000,"updatedTime":1720651348000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.22,"words":666},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Working With Multiple Repositories in Gradle.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将看到如何在Gradle项目中使用多个仓库。这在我们需要使用Maven Central上不可用的JAR文件时非常有用。我们还将看到如何使用GitHub发布Java包并在不同项目之间共享它们。</p>\\n<p>在使用Gradle作为构建工具时，我们经常在<code>build.gradle</code>的<code>repositories</code>部分遇到<code>mavenCentral()</code>。如果我们想要添加其他仓库，我们可以将它们添加到同一节中，以指示我们的库的来源：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>repositories {\\n    mavenLocal()\\n    mavenCentral()\\n}\\n</code></pre></div>","autoDesc":true}');export{d as comp,v as data};
