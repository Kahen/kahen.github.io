import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-ConjvFaO.js";const r={},i=n(`<h1 id="通过gradle-bootrun传递jvm选项" tabindex="-1"><a class="header-anchor" href="#通过gradle-bootrun传递jvm选项"><span>通过Gradle bootRun传递JVM选项</span></a></h1><p>Gradle是一个多用途的自动化构建工具，用于开发、编译和测试软件包。它支持多种语言，但我们主要用它来处理基于Java的语言，如Kotlin、Groovy和Scala。</p><p>在使用Java时，我们可能需要自定义Java应用程序中的JVM参数。由于我们使用Gradle来构建Java应用程序，我们也可以通过调整Gradle配置来自定义应用程序的JVM参数。</p><p>在本教程中，我们将学习如何从Gradle的_bootRun_向Spring Boot Java应用程序传递JVM参数。</p><h3 id="_2-理解-bootrun" tabindex="-1"><a class="header-anchor" href="#_2-理解-bootrun"><span>2. 理解_bootRun_</span></a></h3><p><strong>Gradle的_bootRun_是一个Gradle特定的任务，它随默认的Spring Boot Gradle插件一起提供。它帮助我们直接从Gradle运行Spring Boot应用程序。</strong> 执行_bootRun_命令会在开发环境中启动我们的应用程序，这对于测试和开发目的非常有用。主要来说，它用于迭代开发，因为它不需要单独的构建或部署。</p><p><strong>简而言之，它提供了一种简化的方法，在开发环境中构建应用程序，并执行与Spring Boot开发相关的任务。</strong></p><h3 id="_3-在-build-gradle-文件中使用-jvmargs" tabindex="-1"><a class="header-anchor" href="#_3-在-build-gradle-文件中使用-jvmargs"><span>3. 在_build.gradle_文件中使用_jvmArgs_</span></a></h3><p>Gradle提供了一种直接在_bootRun_命令中添加JVM参数的方法，即使用_build.gradle_文件。例如，让我们看看如何使用_bootRun_命令向Spring Boot应用程序添加JVM参数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>bootRun {
    jvmArgs([
        &quot;-Xms256m&quot;,
        &quot;-Xmx512m&quot;
    ])
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，使用_jvmArgs_选项修改了springboot应用程序的_max/min_堆。现在，让我们使用_ps_命令来验证对Spring Boot应用程序的JVM更改：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ ps -ef | grep java | grep spring
502  7870  7254   0  8:07PM ??  0:03.89 /Library/Java/JavaVirtualMachines/jdk-14.0.2.jdk/Contents/Home/bin/java
-XX:TieredStopAtLevel=1 -Xms256m -Xmx512m -Dfile.encoding=UTF-8 -Duser.country=IN
-Duser.language=en com.example.demo.DemoApplication
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的_bootRun_任务中，我们使用_jvmArgs_选项更改了Spring Boot应用程序的_max_和_min_堆。<strong>这样，JVM参数将动态附加到Spring Boot应用程序。此外，我们还可以使用_-D_选项向_bootRun_添加自定义属性。</strong> 为了演示，让我们看看_bootRun_任务：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>bootRun {
    jvmArgs([&#39;-Dbaeldung=test&#39;, &#39;-Xmx512m&#39;])
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，我们可以同时传递JVM选项和自定义属性。为了说明，让我们验证一下_jvm_参数中的自定义值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ ps -ef | grep java | grep spring
502  8423  7254   0  8:16PM ??  0:00.62 /Library/Java/JavaVirtualMachines/jdk-14.0.2.jdk/Contents/Home/bin/java
-XX:TieredStopAtLevel=1  -Dbaeldung=test -Xms256m -Xmx512m -Dfile.encoding=UTF-8 -Duser.country=IN
-Duser.language=en com.example.demo.DemoApplication
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们还可以将这些属性文件放入_gradle.properties_，然后在_build.gradle_中使用它们：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>baeldung=test
max.heap.size=512m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以在_bootRun_命令中使用它们：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>bootRun {
    jvmArgs([
        &quot;-Dbaeldung=\${project.findProperty(&#39;baeldung&#39;)}&quot;,
        &quot;-Xmx\${project.findProperty(&#39;max.heap.size&#39;)}&quot;
    ])
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用上述方法，我们可以将配置文件与主_build.gradle_文件分开。</p><h3 id="_4-使用命令行参数" tabindex="-1"><a class="header-anchor" href="#_4-使用命令行参数"><span>4. 使用命令行参数</span></a></h3><p>我们还可以直接在_./gradlew bootRun_命令中提供JVM选项。在Gradle中，可以使用_-D_标志指定系统属性，使用_-X_指定JVM选项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ ./gradlew bootRun --args=&#39;--spring-boot.run.jvmArguments=&quot;-Xmx512m&quot; --baeldung=test&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>我们可以使用此命令在运行时动态提供JVM选项，而无需修改Gradle构建文件。</strong> 为了演示，让我们使用_ps_命令验证JVM参数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ ps -ef | grep java | grep spring
 502 58504 90399   0  7:21AM ?? 0:02.95 /Library/Java/JavaVirtualMachines/jdk-14.0.2.jdk/Contents/Home/bin/java
 -XX:TieredStopAtLevel=1 -Xms256m -Xmx512m -Dfile.encoding=UTF-8 -Duser.country=IN -Duser.language=en
 com.example.demo.DemoApplication --spring-boot.run.jvmArguments=-Xmx512m --baeldung=test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述命令直接使用_./gradlew bootRun_命令设置了_jvm_参数。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们学习了将JVM选项传递给_bootRun_命令的不同方法。</p><p>首先，我们了解了_bootRun_的重要性和基本用法。然后，我们探索了使用命令行参数和_build.gradle_文件向_bootRun_提供JVM选项的方法。</p>`,30),o=[i];function d(l,s){return t(),a("div",null,o)}const m=e(r,[["render",d],["__file","2024-06-26-Passing JVM Options from Gradle bootRun.html.vue"]]),c=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Passing%20JVM%20Options%20from%20Gradle%20bootRun.html","title":"通过Gradle bootRun传递JVM选项","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","Gradle"],"tag":["JVM","Spring Boot","配置"],"head":[["meta",{"name":"keywords","content":"JVM, Spring Boot, Gradle, 配置, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Passing%20JVM%20Options%20from%20Gradle%20bootRun.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"通过Gradle bootRun传递JVM选项"}],["meta",{"property":"og:description","content":"通过Gradle bootRun传递JVM选项 Gradle是一个多用途的自动化构建工具，用于开发、编译和测试软件包。它支持多种语言，但我们主要用它来处理基于Java的语言，如Kotlin、Groovy和Scala。 在使用Java时，我们可能需要自定义Java应用程序中的JVM参数。由于我们使用Gradle来构建Java应用程序，我们也可以通过调整G..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T20:51:33.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JVM"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"配置"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T20:51:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"通过Gradle bootRun传递JVM选项\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T20:51:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"通过Gradle bootRun传递JVM选项 Gradle是一个多用途的自动化构建工具，用于开发、编译和测试软件包。它支持多种语言，但我们主要用它来处理基于Java的语言，如Kotlin、Groovy和Scala。 在使用Java时，我们可能需要自定义Java应用程序中的JVM参数。由于我们使用Gradle来构建Java应用程序，我们也可以通过调整G..."},"headers":[{"level":3,"title":"2. 理解_bootRun_","slug":"_2-理解-bootrun","link":"#_2-理解-bootrun","children":[]},{"level":3,"title":"3. 在_build.gradle_文件中使用_jvmArgs_","slug":"_3-在-build-gradle-文件中使用-jvmargs","link":"#_3-在-build-gradle-文件中使用-jvmargs","children":[]},{"level":3,"title":"4. 使用命令行参数","slug":"_4-使用命令行参数","link":"#_4-使用命令行参数","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719435093000,"updatedTime":1719435093000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.1,"words":929},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Passing JVM Options from Gradle bootRun.md","localizedDate":"2024年6月27日","excerpt":"\\n<p>Gradle是一个多用途的自动化构建工具，用于开发、编译和测试软件包。它支持多种语言，但我们主要用它来处理基于Java的语言，如Kotlin、Groovy和Scala。</p>\\n<p>在使用Java时，我们可能需要自定义Java应用程序中的JVM参数。由于我们使用Gradle来构建Java应用程序，我们也可以通过调整Gradle配置来自定义应用程序的JVM参数。</p>\\n<p>在本教程中，我们将学习如何从Gradle的_bootRun_向Spring Boot Java应用程序传递JVM参数。</p>\\n<h3>2. 理解_bootRun_</h3>\\n<p><strong>Gradle的_bootRun_是一个Gradle特定的任务，它随默认的Spring Boot Gradle插件一起提供。它帮助我们直接从Gradle运行Spring Boot应用程序。</strong> 执行_bootRun_命令会在开发环境中启动我们的应用程序，这对于测试和开发目的非常有用。主要来说，它用于迭代开发，因为它不需要单独的构建或部署。</p>","autoDesc":true}');export{m as comp,c as data};
