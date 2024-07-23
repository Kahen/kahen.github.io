import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-LwwahXlT.js";const m={},r=n(`<h1 id="java-home-与-path-环境变量的区别" tabindex="-1"><a class="header-anchor" href="#java-home-与-path-环境变量的区别"><span>JAVA_HOME 与 PATH 环境变量的区别</span></a></h1><p>在本教程中，我们将探讨使用 <em>JAVA_HOME</em> 和 <em>PATH</em> 环境变量之间的主要区别。尽管大多数Java程序需要这两个变量才能成功编译和运行，但每个变量都服务于不同的目的。让我们逐一了解它们。</p><h2 id="_2-java-home-环境变量" tabindex="-1"><a class="header-anchor" href="#_2-java-home-环境变量"><span>2. <em>JAVA_HOME</em> 环境变量</span></a></h2><p><strong><em>JAVA_HOME</em> 环境变量指向 JDK 安装目录</strong>。随后，其他依赖Java的程序可以使用这个变量来访问 JDK/JRE 路径。</p><p>通常，Apache Tomcat 和其他 Java EE 应用程序服务器，以及 Maven 或 Gradle 等构建工具，使用 <em>JAVA_HOME</em> 作为命名约定来定位 Java。</p><p>在大多数情况下，<strong><em>JAVA_HOME</em> 设置为指向 JDK 路径而不是 JRE</strong>。这对于需要访问编译器、调试器、文档生成器等的现代开发工具非常有用。</p><p>以下是我们通过命令行设置 <em>JAVA_HOME</em> 变量的方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>set JAVA_HOME=C:\\Program Files\\Java\\jdk-17
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>另外，我们还可以通过系统设置来设置这个变量。Windows 用户可以在 &quot;系统属性 -&gt; 高级 -&gt; 环境变量&quot; 下找到此设置。</p><h2 id="_3-path-环境变量" tabindex="-1"><a class="header-anchor" href="#_3-path-环境变量"><span>3. <em>PATH</em> 环境变量</span></a></h2><p><strong>操作系统使用 <em>PATH</em> 环境变量来查找要运行的本地可执行程序</strong>。</p><p>在 Windows 中，可执行程序以 <em>.exe</em> 扩展名结尾。一旦我们将可执行程序的目录指向 <em>PATH</em>，我们就可以在命令行中调用它而无需指定其完整路径。</p><p><strong>为了运行 Java 程序，我们需要在 <em>PATH</em> 变量中列出 JDK 安装目录以及 <em>bin</em> 目录</strong>。<em>bin</em> 目录包含 Java 可执行文件。</p><p>我们可以通过命令行设置 <em>PATH</em> 环境变量：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>set PATH=C:\\Program Files\\Java\\jdk-17\\bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如前一节所见，我们也可以通过系统设置来实现相同的效果。通常，<em>PATH</em> 变量包含指向不同目录的多个路径。因此，此设置不仅限于 Java。</p><h2 id="_4-同时使用-java-home-和-path" tabindex="-1"><a class="header-anchor" href="#_4-同时使用-java-home-和-path"><span>4. 同时使用 <em>JAVA_HOME</em> 和 <em>PATH</em></span></a></h2><p>现代程序足够智能，可以选取 <em>JAVA_HOME</em> 或 <em>PATH</em> 变量中的一个来成功运行。然而，像 Eclipse 这样的一些程序需要 <em>PATH</em> 变量才能启动。</p><p><strong>作为最佳实践，始终推荐设置 <em>JAVA_HOME</em> 和 <em>PATH</em> 环境变量</strong>。这样，我们可以消除使用旧程序和新程序之间的兼容性问题。</p><p>另外，为了避免重复 JDK 安装路径两次，我们可以在声明中重用其中一个变量：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>set PATH=%JAVA_HOME%\\bin;%PATH%
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，此设置还消除了在 JDK 安装目录发生变化时更改所有受影响的环境变量的风险。</p><h2 id="_5-常见问题" tabindex="-1"><a class="header-anchor" href="#_5-常见问题"><span>5. 常见问题</span></a></h2><p>某些程序依赖于特定的变量来启动。例如，如果未设置 <em>JAVA_HOME</em>，则依赖此变量的程序可能无法定位 JDK。</p><p>随后，像 Tomcat、Maven 和 Gradle 这样的程序可能无法正常执行。同样的问题也适用于依赖 <em>PATH</em> 变量的程序。</p><p>具体来说，当我们尝试从命令行运行 Java 程序时，操作系统会查看 <em>PATH</em> 变量以定位并运行 JVM。如果 <em>PATH</em> 变量中没有 JDK，则命令以错误结束：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>C:\\Users\\palan&gt;java HelloWorld
&#39;java&#39; 不是内部或外部命令，也不是可运行的程序或批处理文件。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个常见问题是在 <em>PATH</em> 变量中有不同版本的 JDK。在这种情况下，<strong>操作系统会考虑 <em>PATH</em> 变量中 JDK 的第一个出现用于执行</strong>。然而，最好从 <em>PATH</em> 变量中移除多个版本，以避免后期的混淆。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了使用 <em>JAVA_HOME</em> 和 <em>PATH</em> 环境变量之间的差异。</p><p>总之，<strong><em>JAVA_HOME</em> 环境变量主要由面向开发工具的程序使用</strong>。另一方面，<strong>面向用户的应用程序需要 <em>PATH</em> 环境变量来知道 JVM 的位置</strong>。</p>`,31),s=[r];function i(o,p){return t(),a("div",null,s)}const d=e(m,[["render",i],["__file","2024-07-06-JAVA HOME vs PATH Environment Variables.html.vue"]]),c=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-JAVA%20HOME%20vs%20PATH%20Environment%20Variables.html","title":"JAVA_HOME 与 PATH 环境变量的区别","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","环境变量"],"tag":["JAVA_HOME","PATH"],"head":[["meta",{"name":"keywords","content":"JAVA_HOME, PATH, 环境变量, Java, 教程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-JAVA%20HOME%20vs%20PATH%20Environment%20Variables.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JAVA_HOME 与 PATH 环境变量的区别"}],["meta",{"property":"og:description","content":"JAVA_HOME 与 PATH 环境变量的区别 在本教程中，我们将探讨使用 JAVA_HOME 和 PATH 环境变量之间的主要区别。尽管大多数Java程序需要这两个变量才能成功编译和运行，但每个变量都服务于不同的目的。让我们逐一了解它们。 2. JAVA_HOME 环境变量 JAVA_HOME 环境变量指向 JDK 安装目录。随后，其他依赖Java..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T17:33:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JAVA_HOME"}],["meta",{"property":"article:tag","content":"PATH"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T17:33:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JAVA_HOME 与 PATH 环境变量的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T17:33:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"JAVA_HOME 与 PATH 环境变量的区别 在本教程中，我们将探讨使用 JAVA_HOME 和 PATH 环境变量之间的主要区别。尽管大多数Java程序需要这两个变量才能成功编译和运行，但每个变量都服务于不同的目的。让我们逐一了解它们。 2. JAVA_HOME 环境变量 JAVA_HOME 环境变量指向 JDK 安装目录。随后，其他依赖Java..."},"headers":[{"level":2,"title":"2. JAVA_HOME 环境变量","slug":"_2-java-home-环境变量","link":"#_2-java-home-环境变量","children":[]},{"level":2,"title":"3. PATH 环境变量","slug":"_3-path-环境变量","link":"#_3-path-环境变量","children":[]},{"level":2,"title":"4. 同时使用 JAVA_HOME 和 PATH","slug":"_4-同时使用-java-home-和-path","link":"#_4-同时使用-java-home-和-path","children":[]},{"level":2,"title":"5. 常见问题","slug":"_5-常见问题","link":"#_5-常见问题","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720287198000,"updatedTime":1720287198000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.3,"words":989},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-JAVA HOME vs PATH Environment Variables.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨使用 <em>JAVA_HOME</em> 和 <em>PATH</em> 环境变量之间的主要区别。尽管大多数Java程序需要这两个变量才能成功编译和运行，但每个变量都服务于不同的目的。让我们逐一了解它们。</p>\\n<h2>2. <em>JAVA_HOME</em> 环境变量</h2>\\n<p><strong><em>JAVA_HOME</em> 环境变量指向 JDK 安装目录</strong>。随后，其他依赖Java的程序可以使用这个变量来访问 JDK/JRE 路径。</p>\\n<p>通常，Apache Tomcat 和其他 Java EE 应用程序服务器，以及 Maven 或 Gradle 等构建工具，使用 <em>JAVA_HOME</em> 作为命名约定来定位 Java。</p>","autoDesc":true}');export{d as comp,c as data};
