import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as e,a as s}from"./app-BaAI5AMv.js";const t={},o=s(`<h1 id="使用gradle生成javadoc" tabindex="-1"><a class="header-anchor" href="#使用gradle生成javadoc"><span>使用Gradle生成Javadoc</span></a></h1><p>众所周知，创建清晰全面的文档对于代码维护至关重要。在Java中，我们可以通过使用Javadoc来实现这一点，Javadoc是一个文档生成器，它可以从Java源代码注释创建HTML文件。</p><p>在本教程中，我们将学习如何使用Gradle生成Javadoc，Gradle是一个流行的构建自动化工具。</p><h2 id="_2-设置gradle项目" tabindex="-1"><a class="header-anchor" href="#_2-设置gradle项目"><span>2. 设置Gradle项目</span></a></h2><p>简单来说，设置Gradle项目非常容易。首先，我们需要在我们的机器上安装Gradle构建工具。接下来，让我们创建一个空文件夹，并通过终端切换到该文件夹。然后，让我们通过终端初始化一个新的Gradle项目：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ gradle init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该命令会询问我们一些问题以设置项目。我们将选择应用程序模板作为生成项目的类型。接下来，我们将选择Java作为实现语言，Groovy作为构建脚本。最后，我们将使用默认的测试框架，即JUnit 4，并为我们的项目命名。</p><p><strong>或者，我们也可以使用IntelliJ IDEA生成Gradle项目</strong>。为此，我们创建一个新项目并选择Gradle作为构建系统。它会自动生成所需的所有文件夹的项目。</p><h2 id="_3-项目设置" tabindex="-1"><a class="header-anchor" href="#_3-项目设置"><span>3. 项目设置</span></a></h2><p>初始化Gradle项目后，让我们使用我们喜欢的IDE打开项目。接下来，我们将创建一个名为‘<em>addition</em>’的新包，并添加一个名为_Sum_的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>addition</span>

<span class="token doc-comment comment">/**
 * 这是一个示例类，展示了Javadoc注释。
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Sum</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 此方法返回两个整数的和。
     *
     * <span class="token keyword">@param</span> <span class="token parameter">a</span> 第一个整数
     * <span class="token keyword">@param</span> <span class="token parameter">b</span> 第二个整数
     * <span class="token keyword">@return</span> a和b的和
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个类展示了简单的加法功能。我们创建了一个_add()_方法，它接受两个参数并返回参数的和。</p><p>此外，我们在注释中添加了引言文档注释，并在注释中描述了_add()_方法。我们指定了它所接受的参数以及它返回的值。</p><p>接下来，让我们创建另一个名为‘<em>subtraction</em>’的包，并添加一个名为_Difference_的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>subtraction</span>

<span class="token doc-comment comment">/**
 * 这是一个示例类，展示了Javadoc注释。
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Difference</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 此方法返回两个整数之间的差。
     *
     * <span class="token keyword">@param</span> <span class="token parameter">a</span> 第一个整数
     * <span class="token keyword">@param</span> <span class="token parameter">b</span> 第二个整数
     * <span class="token keyword">@return</span> a和b之间的差
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">subtract</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> a <span class="token operator">-</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个类展示了一个简单的方法，用于找出两个_Integer_之间的差异。</p><p>在下一节中，我们将学习如何通过指定要包含和排除的包来生成Javadoc。</p><h2 id="_5-使用gradle生成javadoc" tabindex="-1"><a class="header-anchor" href="#_5-使用gradle生成javadoc"><span>5. 使用Gradle生成Javadoc</span></a></h2><p>现在我们已经有一个带有文档注释的示例项目，我们希望通过Gradle生成Javadoc。为此，我们需要向_gradle.build_文件添加一些配置。该文件包含项目的配置，如插件、依赖项、项目组、版本等。</p><p>首先，让我们将Java插件应用到项目中：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>plugins <span class="token punctuation">{</span>
    id <span class="token string">&#39;java&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这告诉Gradle使用Java插件。<strong>Java插件使开发Java应用程序变得更加容易，并提供了编译、代码测试、Javadoc任务等功能</strong>。</p><p>此外，我们将为Javadoc任务向_gradle.build_文件添加代码：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>javadoc <span class="token punctuation">{</span>
    destinationDir <span class="token operator">=</span> <span class="token function">file</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">buildDir</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/docs/javadoc&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这配置了Javadoc任务，并指定了存储生成文档的构建目录。</p><p>我们还可以<strong>配置Javadoc任务在运行任务时包含和排除包</strong>：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>javadoc <span class="token punctuation">{</span>
    destinationDir <span class="token operator">=</span> <span class="token function">file</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">buildDir</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/docs/javadoc&quot;</span></span><span class="token punctuation">)</span>
    include <span class="token string">&#39;com/baeldung/addition/**&#39;</span>
    exclude <span class="token string">&#39;com/baeldung/subtraction/**&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们包含了_addition_包并排除了_subtraction_包。<strong>_include_和_exclude_属性允许我们选择我们想要在Javadoc任务中的包</strong>。</p><p>最后，要生成文档，让我们打开终端并切换到根文件夹。然后，让我们运行Gradle构建命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>./gradlew javadoc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此命令执行Javadoc任务，并以HTML格式生成文档。HTML文件存储在指定的文件夹中。</p><p>这是一个HTML文件文档的示例：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/05/gradle-generated-documentation-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了如何使用Gradle构建系统生成Javadoc。此外，我们还看到了如何为两个Java类编写文档注释。我们还学习了如何配置Javadoc以包含和排除包。</p><p>如往常一样，示例的完整源代码可在GitHub上获得。</p>`,36),i=[o];function d(l,p){return e(),n("div",null,i)}const u=a(t,[["render",d],["__file","2024-07-05-Generating Javadoc With Gradle.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Generating%20Javadoc%20With%20Gradle.html","title":"使用Gradle生成Javadoc","lang":"zh-CN","frontmatter":{"date":"2023-05-01T00:00:00.000Z","category":["Java","Gradle"],"tag":["Javadoc","文档生成"],"head":[["meta",{"name":"keywords","content":"Java, Gradle, Javadoc, 文档生成, 构建自动化"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Generating%20Javadoc%20With%20Gradle.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Gradle生成Javadoc"}],["meta",{"property":"og:description","content":"使用Gradle生成Javadoc 众所周知，创建清晰全面的文档对于代码维护至关重要。在Java中，我们可以通过使用Javadoc来实现这一点，Javadoc是一个文档生成器，它可以从Java源代码注释创建HTML文件。 在本教程中，我们将学习如何使用Gradle生成Javadoc，Gradle是一个流行的构建自动化工具。 2. 设置Gradle项目 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/05/gradle-generated-documentation-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T08:56:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Javadoc"}],["meta",{"property":"article:tag","content":"文档生成"}],["meta",{"property":"article:published_time","content":"2023-05-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T08:56:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Gradle生成Javadoc\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/05/gradle-generated-documentation-1.png\\"],\\"datePublished\\":\\"2023-05-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T08:56:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Gradle生成Javadoc 众所周知，创建清晰全面的文档对于代码维护至关重要。在Java中，我们可以通过使用Javadoc来实现这一点，Javadoc是一个文档生成器，它可以从Java源代码注释创建HTML文件。 在本教程中，我们将学习如何使用Gradle生成Javadoc，Gradle是一个流行的构建自动化工具。 2. 设置Gradle项目 ..."},"headers":[{"level":2,"title":"2. 设置Gradle项目","slug":"_2-设置gradle项目","link":"#_2-设置gradle项目","children":[]},{"level":2,"title":"3. 项目设置","slug":"_3-项目设置","link":"#_3-项目设置","children":[]},{"level":2,"title":"5. 使用Gradle生成Javadoc","slug":"_5-使用gradle生成javadoc","link":"#_5-使用gradle生成javadoc","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720169784000,"updatedTime":1720169784000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.76,"words":1128},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Generating Javadoc With Gradle.md","localizedDate":"2023年5月1日","excerpt":"\\n<p>众所周知，创建清晰全面的文档对于代码维护至关重要。在Java中，我们可以通过使用Javadoc来实现这一点，Javadoc是一个文档生成器，它可以从Java源代码注释创建HTML文件。</p>\\n<p>在本教程中，我们将学习如何使用Gradle生成Javadoc，Gradle是一个流行的构建自动化工具。</p>\\n<h2>2. 设置Gradle项目</h2>\\n<p>简单来说，设置Gradle项目非常容易。首先，我们需要在我们的机器上安装Gradle构建工具。接下来，让我们创建一个空文件夹，并通过终端切换到该文件夹。然后，让我们通过终端初始化一个新的Gradle项目：</p>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code>$ gradle init\\n</code></pre></div>","autoDesc":true}');export{u as comp,v as data};
