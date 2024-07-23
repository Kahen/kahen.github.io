import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a}from"./app-Ib5f7i4X.js";const d={},t=a(`<h1 id="如何在gradle中配置条件依赖" tabindex="-1"><a class="header-anchor" href="#如何在gradle中配置条件依赖"><span>如何在Gradle中配置条件依赖</span></a></h1><p>在本教程中，我们将看到如何在Gradle项目中配置条件依赖。</p><h2 id="_2-项目设置" tabindex="-1"><a class="header-anchor" href="#_2-项目设置"><span>2. 项目设置</span></a></h2><p>我们将为演示设置一个多模块项目。让我们前往_start.spring.io_并创建我们的根项目_conditional-dependency-demo_。我们将使用Gradle和Java以及Spring Boot。</p><p>我们还添加了两个提供者模块_provider1_和_provider2_，以及两个消费者模块_consumer1_和_consumer2_：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/08/conditional-dependency-project-structure-1024x1022.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_3-配置条件依赖" tabindex="-1"><a class="header-anchor" href="#_3-配置条件依赖"><span>3. 配置条件依赖</span></a></h2><p>假设，基于一个项目属性，我们想要包含两个提供者模块中的一个。对于我们的_consumer1_模块，如果指定了属性_isLocal_，我们想要包含_provider1_模块。否则，应该包含_provider2_模块。</p><p>为此，让我们在_consumer1_模块的_gradle.settings.kts_文件中添加以下内容：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>plugins {
    id(&quot;java&quot;)
}

group = &quot;com.baeldung.gradle&quot;
version = &quot;0.0.1-SNAPSHOT&quot;

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(&quot;org.junit.jupiter:junit-jupiter-api:5.7.0&quot;)
    testRuntimeOnly (&quot;org.junit.jupiter:junit-jupiter-engine:5.7.0&quot;)

    if (project.hasProperty(&quot;isLocal&quot;)) {
        implementation(&quot;com.baeldung.gradle:provider1&quot;)
    } else {
        implementation(&quot;com.baeldung.gradle:provider2&quot;)
    }
}

tasks.getByName\`\`&lt;Test&gt;\`\`(&quot;test&quot;) {
    useJUnitPlatform()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们运行依赖任务来看看哪个提供者模块被选中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>gradle -PisLocal dependencies --configuration implementation
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&gt; Task :consumer1:dependencies

------------------------------------------------------------

Project &#39;:consumer1&#39;

------------------------------------------------------------

implementation - 仅用于源集&#39;main&#39;的实现依赖。 (n)
\\--- com.baeldung.gradle:provider1 (n)

(n) - 未解析（配置不打算被解析）

通过添加--scan选项，可以获取基于Web的、可搜索的依赖报告。

BUILD SUCCESSFUL in 591ms
1 actionable task: 1 executed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，传递属性导致了_provider1_模块的包含。现在让我们在未指定任何属性的情况下运行依赖任务：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>gradle dependencies --configuration implementation
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&gt; Task :consumer1:dependencies

------------------------------------------------------------

Project &#39;:consumer1&#39;

------------------------------------------------------------

implementation - 仅用于源集&#39;main&#39;的实现依赖。 (n)
\\--- com.baeldung.gradle:provider2 (n)

(n) - 未解析（配置不打算被解析）

通过添加--scan选项，可以获取基于Web的、可搜索的依赖报告。

BUILD SUCCESSFUL in 649ms
1 actionable task: 1 executed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，现在_provider2_正在被包含。</p><h2 id="_4-通过模块替换配置条件依赖" tabindex="-1"><a class="header-anchor" href="#_4-通过模块替换配置条件依赖"><span>4. 通过模块替换配置条件依赖</span></a></h2><p>让我们看看通过依赖替换条件配置依赖的另一种方法。对于我们的_consumer2_模块，如果指定了_isLocal_属性，我们想要包含_provider2_模块。否则，应该使用模块_provider1_。</p><p>让我们添加以下配置到我们的_consumer2_模块以实现这个目标：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>plugins {
    id(&quot;java&quot;)
}

group = &quot;com.baeldung.gradle&quot;
version = &quot;0.0.1-SNAPSHOT&quot;

repositories {
    mavenCentral()
}

configurations.all {
    resolutionStrategy.dependencySubstitution {
        if (project.hasProperty(&quot;isLocal&quot;))
            substitute(project(&quot;com.baeldung.gradle:provider1&quot;))
              .using(project(&quot;:provider2&quot;))
              .because(&quot;Project property override(isLocal).&quot;)
    }
}

dependencies {
    implementation(project(&quot;:provider1&quot;))

    testImplementation(&quot;org.junit.jupiter:junit-jupiter-api:5.7.0&quot;)
    testRuntimeOnly(&quot;org.junit.jupiter:junit-jupiter-engine:5.7.0&quot;)
}

tasks.getByName\`\`&lt;Test&gt;\`\`(&quot;test&quot;) {
    useJUnitPlatform()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，如果我们再次运行相同的命令，我们应该得到类似的结果。让我们首先在指定_isLocal_属性的情况下运行：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>gradle -PisLocal dependencies --configuration compilePath
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&gt; Task :consumer2:dependencies

------------------------------------------------------------

Project &#39;:consumer2&#39;

------------------------------------------------------------

compileClasspath - 源集&#39;main&#39;的编译类路径。
\\--- project :provider1 -&gt; project :provider2

通过添加--scan选项，可以获取基于Web的、可搜索的依赖报告。

BUILD SUCCESSFUL in 1s
1 actionable task: 1 executed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>果不其然，我们看到_provider1_项目被_provider2_项目替换了。现在让我们在未指定属性的情况下尝试这个：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>gradle dependencies --configuration compilePath
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&gt; Task :consumer2:dependencies

------------------------------------------------------------

Project &#39;:consumer2&#39;

------------------------------------------------------------

compileClasspath - 源集&#39;main&#39;的编译类路径。
\\--- project :provider1

通过添加--scan选项，可以获取基于Web的、可搜索的依赖报告。

BUILD SUCCESSFUL in 623ms
1 actionable task: 1 executed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，这次没有发生替换，_provider1_被包含了。</p><h2 id="_5-两种方法之间的区别" tabindex="-1"><a class="header-anchor" href="#_5-两种方法之间的区别"><span>5. 两种方法之间的区别</span></a></h2><p>正如我们在上面的演示中看到的，两种方法都帮助我们实现了条件配置依赖的目标。让我们来谈谈两种方法之间的一些区别。</p><p>首先，<strong>直接编写条件逻辑看起来更简单，与第二种方法相比配置更少。</strong></p><p>其次，**尽管第二种方法涉及更多的配置，但它看起来更符合Gradle的习惯用法。**在第二种方法中，我们利用了Gradle自身提供的替换机制。它还允许我们指定替换的原因。此外，在日志中，我们可以注意到替换的发生，而在第一种方法中没有这样的信息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>compileClasspath - 源集&#39;main&#39;的编译类路径。
\\--- project :provider1 -&gt; project :provider2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们还注意到，在第一种方法中，不需要依赖解析。我们可以通过以下方式获得结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>gradle -PisLocal dependencies --configuration implementation
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>而在第二种方法中，如果我们检查_implementation_配置，我们将看不到预期的结果。原因是它只有在依赖解析发生时才有效。因此，它在_compilePath_配置中可用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>gradle -PisLocal dependencies --configuration compilePath
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>通过这篇文章，我们可以得出结论。在这篇文章中，我们看到了两种在Gradle中条件配置依赖的方法。我们还分析了两者之间的区别。</p><p>Gradle提供的依赖替换配置似乎是更符合习惯用法的方法。像往常一样，完整的代码和Gradle配置可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/0118f8036c29b33058560c2d939e3e3f?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/08/conditional-dependency-project-structure-1024x1022.png" alt="img" loading="lazy"></p>`,41),l=[t];function s(r,c){return i(),n("div",null,l)}const v=e(d,[["render",s],["__file","2024-07-16-How to Configure Conditional Dependencies in Gradle.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-How%20to%20Configure%20Conditional%20Dependencies%20in%20Gradle.html","title":"如何在Gradle中配置条件依赖","lang":"zh-CN","frontmatter":{"date":"2022-08-01T00:00:00.000Z","category":["Gradle","教程"],"tag":["条件依赖","配置"],"head":[["meta",{"name":"keywords","content":"Gradle, 条件依赖, 配置, Java, Spring Boot"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-How%20to%20Configure%20Conditional%20Dependencies%20in%20Gradle.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Gradle中配置条件依赖"}],["meta",{"property":"og:description","content":"如何在Gradle中配置条件依赖 在本教程中，我们将看到如何在Gradle项目中配置条件依赖。 2. 项目设置 我们将为演示设置一个多模块项目。让我们前往_start.spring.io_并创建我们的根项目_conditional-dependency-demo_。我们将使用Gradle和Java以及Spring Boot。 我们还添加了两个提供者模块..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/08/conditional-dependency-project-structure-1024x1022.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T11:26:40.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"条件依赖"}],["meta",{"property":"article:tag","content":"配置"}],["meta",{"property":"article:published_time","content":"2022-08-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T11:26:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Gradle中配置条件依赖\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/08/conditional-dependency-project-structure-1024x1022.png\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/0118f8036c29b33058560c2d939e3e3f?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/08/conditional-dependency-project-structure-1024x1022.png\\"],\\"datePublished\\":\\"2022-08-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T11:26:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Gradle中配置条件依赖 在本教程中，我们将看到如何在Gradle项目中配置条件依赖。 2. 项目设置 我们将为演示设置一个多模块项目。让我们前往_start.spring.io_并创建我们的根项目_conditional-dependency-demo_。我们将使用Gradle和Java以及Spring Boot。 我们还添加了两个提供者模块..."},"headers":[{"level":2,"title":"2. 项目设置","slug":"_2-项目设置","link":"#_2-项目设置","children":[]},{"level":2,"title":"3. 配置条件依赖","slug":"_3-配置条件依赖","link":"#_3-配置条件依赖","children":[]},{"level":2,"title":"4. 通过模块替换配置条件依赖","slug":"_4-通过模块替换配置条件依赖","link":"#_4-通过模块替换配置条件依赖","children":[]},{"level":2,"title":"5. 两种方法之间的区别","slug":"_5-两种方法之间的区别","link":"#_5-两种方法之间的区别","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721129200000,"updatedTime":1721129200000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.27,"words":1280},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-How to Configure Conditional Dependencies in Gradle.md","localizedDate":"2022年8月1日","excerpt":"\\n<p>在本教程中，我们将看到如何在Gradle项目中配置条件依赖。</p>\\n<h2>2. 项目设置</h2>\\n<p>我们将为演示设置一个多模块项目。让我们前往_start.spring.io_并创建我们的根项目_conditional-dependency-demo_。我们将使用Gradle和Java以及Spring Boot。</p>\\n<p>我们还添加了两个提供者模块_provider1_和_provider2_，以及两个消费者模块_consumer1_和_consumer2_：</p>\\n<figure><img src=\\"https://www.baeldung.com/wp-content/uploads/2022/08/conditional-dependency-project-structure-1024x1022.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>","autoDesc":true}');export{v as comp,m as data};
