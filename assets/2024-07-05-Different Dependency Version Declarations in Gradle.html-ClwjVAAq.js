import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-yRPSFQJx.js";const t={},p=e(`<h1 id="gradle中不同的依赖版本声明方式" tabindex="-1"><a class="header-anchor" href="#gradle中不同的依赖版本声明方式"><span>Gradle中不同的依赖版本声明方式</span></a></h1><p>Gradle是JVM项目中最流行的构建工具之一。它提供了多种方式来声明和控制我们的依赖版本。</p><p>在这个简短的教程中，我们将看到如何在Gradle中定义最新的依赖版本。</p><p>首先，我们将探讨我们可能想要定义依赖版本的不同方式。然后，我们将创建一个小的Gradle项目，在其中我们将指定一些第三方库。最后，我们将分析Gradle的依赖树，并看看Gradle如何处理不同的版本声明。</p><h3 id="_2-1-精确版本声明" tabindex="-1"><a class="header-anchor" href="#_2-1-精确版本声明"><span>2.1 精确版本声明</span></a></h3><p>这是声明依赖版本的最直接方式。我们所要做的就是指定我们想要在应用程序中使用的确切版本，例如_1.0_。</p><p>大多数官方依赖通常只使用数字版本，如_3.2.1.<em>。然而，依赖版本是一个字符串，所以它也可以包含字符。例如，Spring有一个版本是_5.2.22.RELEASE</em>。</p><h3 id="_2-2-maven风格的版本范围" tabindex="-1"><a class="header-anchor" href="#_2-2-maven风格的版本范围"><span>2.2 Maven风格的版本范围</span></a></h3><p>如果我们不想指定确切的依赖版本，我们可以使用Maven风格的版本范围，例如_[1.0, 2.0), (1.0, 2.0)_。</p><p>方括号_[<em>和</em>]<em>表示包含边界。相反，圆括号</em>(<em>)和</em>)_表示不包含边界。此外，我们可以在版本声明中混合使用不同的括号。</p><h3 id="_2-3-前缀-通配符版本范围" tabindex="-1"><a class="header-anchor" href="#_2-3-前缀-通配符版本范围"><span>2.3 前缀/通配符版本范围</span></a></h3><p>我们可以使用+通配符来指定依赖版本范围 - 例如，<em>1.+.</em>。<strong>Gradle将寻找版本与+通配符前的部分完全匹配的依赖项</strong>。</p><h3 id="_2-4-使用-latest-版本关键字" tabindex="-1"><a class="header-anchor" href="#_2-4-使用-latest-版本关键字"><span>2.4 使用_latest_版本关键字</span></a></h3><p>Gradle为我们的任何依赖提供了两个特殊的版本关键字：</p><ul><li>_latest.integration_将匹配最高版本的SNAPSHOT模块</li><li>_latest.release_将匹配最高版本的非SNAPSHOT模块</li></ul><h3 id="_3-版本范围的优缺点" tabindex="-1"><a class="header-anchor" href="#_3-版本范围的优缺点"><span>3. 版本范围的优缺点</span></a></h3><p>使用Maven风格或通配符版本范围作为依赖版本可能很有用。然而，我们必须考虑这种方法的优缺点。</p><p>版本范围的最大优势是<strong>我们总是有最新的依赖可用</strong>。我们不必每次构建应用程序时都搜索新的依赖版本。</p><p>然而，总是有最新的依赖可用也可能是一个很大的劣势。<strong>我们的应用程序可能因为应用程序中使用的某些第三方依赖的新版本在版本之间更改了行为而从一个构建到下一个构建行为不同</strong>，而我们却没有意识到。</p><p>根据我们的要求，为依赖指定版本范围可能很有帮助。然而，在使用之前，我们必须小心并确定依赖项遵循的版本算法。</p><h3 id="_4-创建测试应用程序" tabindex="-1"><a class="header-anchor" href="#_4-创建测试应用程序"><span>4. 创建测试应用程序</span></a></h3><p>让我们创建一个简单的Gradle应用程序，尝试使用不同版本声明的几个依赖项。</p><p>我们的应用程序将只包含一个文件，<em>build.gradle</em>：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>plugins <span class="token punctuation">{</span>
    id <span class="token string">&#39;java&#39;</span>
<span class="token punctuation">}</span>

group <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;com.baeldung.gradle&quot;</span></span>
version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;1.0.0-SNAPSHOT&quot;</span></span>
sourceCompatibility <span class="token operator">=</span> JavaVersion<span class="token punctuation">.</span>VERSION_17

repositories <span class="token punctuation">{</span>
    <span class="token function">mavenLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

dependencies <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将添加一些具有不同版本声明的_org.apache.commons_依赖项。</p><p>让我们从最简单的精确版本开始：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>implementation group<span class="token punctuation">:</span> <span class="token string">&#39;org.apache.commons&#39;</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">&#39;commons-lang3&#39;</span><span class="token punctuation">,</span> version<span class="token punctuation">:</span> <span class="token string">&#39;3.12.0&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们使用Maven风格的版本范围：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>implementation group<span class="token punctuation">:</span> <span class="token string">&#39;org.apache.commons&#39;</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">&#39;commons-math3&#39;</span><span class="token punctuation">,</span> version<span class="token punctuation">:</span> <span class="token string">&#39;[3.4, 3.5)&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里我们指定，我们想要一个commons-math3依赖项，其版本将在3.4（包含）到3.5（不包含）之间。</p><p>下一个依赖项将使用通配符版本范围：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>implementation group<span class="token punctuation">:</span> <span class="token string">&#39;org.apache.commons&#39;</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">&#39;commons-collections4&#39;</span><span class="token punctuation">,</span> version<span class="token punctuation">:</span> <span class="token string">&#39;4.+&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们希望拥有最新版本的commons-collections4依赖项，其版本与4.+前缀匹配。</p><p>最后，让我们使用Gradle的_latest.release_关键字：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>implementation group<span class="token punctuation">:</span> <span class="token string">&#39;org.apache.commons&#39;</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">&#39;commons-text&#39;</span><span class="token punctuation">,</span> version<span class="token punctuation">:</span> <span class="token string">&#39;latest.release&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是我们的完整依赖项部分，来自_build.gradle_文件：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>dependencies <span class="token punctuation">{</span>
    implementation group<span class="token punctuation">:</span> <span class="token string">&#39;org.apache.commons&#39;</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">&#39;commons-lang3&#39;</span><span class="token punctuation">,</span> version<span class="token punctuation">:</span> <span class="token string">&#39;3.12.0&#39;</span>
    implementation group<span class="token punctuation">:</span> <span class="token string">&#39;org.apache.commons&#39;</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">&#39;commons-math3&#39;</span><span class="token punctuation">,</span> version<span class="token punctuation">:</span> <span class="token string">&#39;[3.4, 3.5)&#39;</span>
    implementation group<span class="token punctuation">:</span> <span class="token string">&#39;org.apache.commons&#39;</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">&#39;commons-collections4&#39;</span><span class="token punctuation">,</span> version<span class="token punctuation">:</span> <span class="token string">&#39;4.+&#39;</span>
    implementation group<span class="token punctuation">:</span> <span class="token string">&#39;org.apache.commons&#39;</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">&#39;commons-text&#39;</span><span class="token punctuation">,</span> version<span class="token punctuation">:</span> <span class="token string">&#39;latest.release&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们看看Gradle如何解决我们的版本声明。</p><h3 id="_5-显示依赖树" tabindex="-1"><a class="header-anchor" href="#_5-显示依赖树"><span>5. 显示依赖树</span></a></h3><p>让我们使用Gradle的_dependencies_任务来查看依赖报告：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ gradle dependencies

compileClasspath - Compile classpath <span class="token keyword">for</span> <span class="token builtin class-name">source</span> <span class="token builtin class-name">set</span> <span class="token string">&#39;main&#39;</span><span class="token builtin class-name">.</span>
+--- org.apache.commons:commons-lang3:3.12.0
+--- org.apache.commons:commons-collections4:4.+ -<span class="token operator">&gt;</span> <span class="token number">4.4</span>
+--- org.apache.commons:commons-math3:<span class="token punctuation">[</span><span class="token number">3.4</span>, <span class="token number">3.5</span><span class="token punctuation">)</span> -<span class="token operator">&gt;</span> <span class="token number">3.4</span>.1
<span class="token punctuation">\\</span>--- org.apache.commons:commons-text:latest.release -<span class="token operator">&gt;</span> <span class="token number">1.10</span>.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在编写本文时，与指定范围匹配的最新commons-math3依赖项版本是3.4.1。我们可以看到Gradle使用了该版本。</p><p>此外，4.4是与4.+通配符匹配的最新commons-collections4版本。</p><p>同样，1.10.0是commons-text依赖项的最新发布版本。</p><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p>在本文中，我们学习了如何在Gradle中以多种方式声明依赖版本。</p><p>首先，我们看到了如何在Gradle构建脚本中指定确切的依赖版本以及版本范围。然后，我们尝试了几种表达依赖项的方式。</p><p>最后，我们检查了Gradle如何解决这些版本。</p><p>如往常一样，示例代码可在GitHub上找到。</p>`,49),o=[p];function l(i,c){return s(),a("div",null,o)}const u=n(t,[["render",l],["__file","2024-07-05-Different Dependency Version Declarations in Gradle.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Different%20Dependency%20Version%20Declarations%20in%20Gradle.html","title":"Gradle中不同的依赖版本声明方式","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Gradle","Maven"],"tag":["依赖管理","版本控制"],"head":[["meta",{"name":"keywords","content":"Gradle, Maven, 依赖版本声明, 构建工具, JVM项目"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Different%20Dependency%20Version%20Declarations%20in%20Gradle.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Gradle中不同的依赖版本声明方式"}],["meta",{"property":"og:description","content":"Gradle中不同的依赖版本声明方式 Gradle是JVM项目中最流行的构建工具之一。它提供了多种方式来声明和控制我们的依赖版本。 在这个简短的教程中，我们将看到如何在Gradle中定义最新的依赖版本。 首先，我们将探讨我们可能想要定义依赖版本的不同方式。然后，我们将创建一个小的Gradle项目，在其中我们将指定一些第三方库。最后，我们将分析Gradl..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T10:38:44.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"依赖管理"}],["meta",{"property":"article:tag","content":"版本控制"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T10:38:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Gradle中不同的依赖版本声明方式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T10:38:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Gradle中不同的依赖版本声明方式 Gradle是JVM项目中最流行的构建工具之一。它提供了多种方式来声明和控制我们的依赖版本。 在这个简短的教程中，我们将看到如何在Gradle中定义最新的依赖版本。 首先，我们将探讨我们可能想要定义依赖版本的不同方式。然后，我们将创建一个小的Gradle项目，在其中我们将指定一些第三方库。最后，我们将分析Gradl..."},"headers":[{"level":3,"title":"2.1 精确版本声明","slug":"_2-1-精确版本声明","link":"#_2-1-精确版本声明","children":[]},{"level":3,"title":"2.2 Maven风格的版本范围","slug":"_2-2-maven风格的版本范围","link":"#_2-2-maven风格的版本范围","children":[]},{"level":3,"title":"2.3 前缀/通配符版本范围","slug":"_2-3-前缀-通配符版本范围","link":"#_2-3-前缀-通配符版本范围","children":[]},{"level":3,"title":"2.4 使用_latest_版本关键字","slug":"_2-4-使用-latest-版本关键字","link":"#_2-4-使用-latest-版本关键字","children":[]},{"level":3,"title":"3. 版本范围的优缺点","slug":"_3-版本范围的优缺点","link":"#_3-版本范围的优缺点","children":[]},{"level":3,"title":"4. 创建测试应用程序","slug":"_4-创建测试应用程序","link":"#_4-创建测试应用程序","children":[]},{"level":3,"title":"5. 显示依赖树","slug":"_5-显示依赖树","link":"#_5-显示依赖树","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720175924000,"updatedTime":1720175924000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.27,"words":1282},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Different Dependency Version Declarations in Gradle.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Gradle是JVM项目中最流行的构建工具之一。它提供了多种方式来声明和控制我们的依赖版本。</p>\\n<p>在这个简短的教程中，我们将看到如何在Gradle中定义最新的依赖版本。</p>\\n<p>首先，我们将探讨我们可能想要定义依赖版本的不同方式。然后，我们将创建一个小的Gradle项目，在其中我们将指定一些第三方库。最后，我们将分析Gradle的依赖树，并看看Gradle如何处理不同的版本声明。</p>\\n<h3>2.1 精确版本声明</h3>\\n<p>这是声明依赖版本的最直接方式。我们所要做的就是指定我们想要在应用程序中使用的确切版本，例如_1.0_。</p>\\n<p>大多数官方依赖通常只使用数字版本，如_3.2.1.<em>。然而，依赖版本是一个字符串，所以它也可以包含字符。例如，Spring有一个版本是_5.2.22.RELEASE</em>。</p>","autoDesc":true}');export{u as comp,m as data};
