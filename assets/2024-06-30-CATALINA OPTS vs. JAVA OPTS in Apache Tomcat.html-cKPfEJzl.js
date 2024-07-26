import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as s,a as n}from"./app-DpYLEM_u.js";const t={},p=n(`<h1 id="apache-tomcat中的catalina-opts与java-opts-baeldung" tabindex="-1"><a class="header-anchor" href="#apache-tomcat中的catalina-opts与java-opts-baeldung"><span>Apache Tomcat中的CATALINA_OPTS与JAVA_OPTS | Baeldung</span></a></h1><p>Apache Tomcat是一个开源的Java Servlet Web容器服务器，用于部署基于Java的应用程序。Tomcat服务器主要执行Java Servlet和JSP，用于动态Web应用程序。<strong>在配置Tomcat服务器时，我们可以使用_CATALINA_OPTS_和_JAVA_OPTS_环境变量来进行JVM设置。</strong></p><p>在本教程中，我们将探讨在Tomcat服务器中使用_CATALINA_OPTS_和_JAVA_OPTS_的用途。</p><h2 id="_2-catalina-opts和java-opts的重要性" tabindex="-1"><a class="header-anchor" href="#_2-catalina-opts和java-opts的重要性"><span>2. CATALINA_OPTS和JAVA_OPTS的重要性</span></a></h2><p>Tomcat服务器使用_CATALINA_OPTS_和_JAVA_OPTS_环境变量进行自定义配置。这两个环境变量允许我们为Tomcat服务器自定义JVM选项，但它们的用途略有不同。自定义JVM选项对于实现Web应用程序的高性能至关重要。</p><p>我们可以使用这些环境变量来增强服务器的可扩展性和安全性。此外，我们还可以利用这些环境变量进行全局JVM配置、性能调整和配置标准化。</p><p><strong>这两个环境变量的关键区别在于，_JAVA_OPTS_的任何更改都会应用于所有正在运行的Tomcat实例，而_CATALINA_OPTS_仅对单个Tomcat实例有效。因此，我们可以使用_JAVA_OPTS_为同一JVM上运行的所有Tomcat实例设置全局JVM配置。</strong></p><h2 id="_3-使用java-opts" tabindex="-1"><a class="header-anchor" href="#_3-使用java-opts"><span>3. 使用JAVA_OPTS</span></a></h2><p>_JAVA_OPTS_是一个关键的环境变量，用于配置自定义的JVM设置。我们可以使用_JAVA_OPTS_来管理内存、GC配置和系统属性。为了理解_JAVA_OPTS_的工作方式，我们首先使用docker run命令运行一个Tomcat服务器：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 <span class="token parameter variable">--name</span> baeldung tomcat:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的命令中，我们使用名为baeldung的docker容器在8080端口上公开了一个Tomcat服务器的HTTP端口。让我们也查看一下这个Tomcat进程的默认JVM设置：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> tomcat
root         <span class="token number">1</span>     <span class="token number">0</span>  <span class="token number">7</span> <span class="token number">14</span>:42 ?        00:00:01 /opt/java/openjdk/bin/java <span class="token parameter variable">-Djava.util.logging.config.file</span><span class="token operator">=</span>/usr/local/tomcat/conf/logging.properties <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的命令中，我们可以看到Tomcat服务器以一些默认配置启动。现在，如果我们想要对这个过程进行一些更改，我们需要将自定义配置添加到_JAVA_OPTS_中。让我们更改Tomcat服务器进程的最小/最大堆内存：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA_OPTS</span><span class="token operator">=</span><span class="token string">&quot;-Xmx512m -Xms256m&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述命令将简单地更新服务器上的_max 512m_和_min 256m_内存。在Docker容器中，我们可以在运行命令本身中提供环境变量：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 <span class="token parameter variable">-e</span> <span class="token assign-left variable">JAVA_OPTS</span><span class="token operator">=</span><span class="token string">&quot;-Xmx512m -Xms256m&quot;</span> <span class="token parameter variable">--name</span> baeldung tomcat:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了验证，让我们再次检查Tomcat服务器进程的详细信息：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> tomcat
root         <span class="token number">1</span>     <span class="token number">0</span>  <span class="token number">8</span> <span class="token number">14</span>:49 ?        00:00:01 /opt/java/openjdk/bin/java <span class="token parameter variable">-Djava.util.logging.config.file</span><span class="token operator">=</span>/usr/local/tomcat/conf/logging.properties <span class="token parameter variable">-Xmx512m</span> <span class="token parameter variable">-Xms256m</span> <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的输出中，我们可以看到_max_和_min_堆分别设置为_512m_和_256m_。类似地，我们也可以为垃圾收集配置使用_JAVA_OPTS_。</p><p>简而言之，我们可以使用_JAVA_OPTS_根据服务器需求自定义JVM配置。此外，它允许我们调整内存管理、服务器分析、GC任务和Tomcat进程的资源利用。</p><h2 id="_4-使用catalina-opts" tabindex="-1"><a class="header-anchor" href="#_4-使用catalina-opts"><span>4. 使用CATALINA_OPTS</span></a></h2><p>_CATALINA_OPTS_是一个环境变量，允许我们自定义Apache服务器相关的配置。与主要用于配置JVM相关选项的_JAVA_OPTS_不同，_CATALINA_OPTS_主要配置与Tomcat服务器相关的设置。为了演示，让我们运行命令更改Tomcat服务器的HTTP端口：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8080</span>:8082 <span class="token parameter variable">-e</span> <span class="token assign-left variable">CATALINA_OPTS</span><span class="token operator">=</span><span class="token string">&quot;-Dcatalina.http.port=8082&quot;</span> <span class="token parameter variable">--name</span> baeldung tomcat:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的命令中，我们将Tomcat服务器的默认HTTP端口从_8080_更改为_8082_。为了验证，让我们查看命令以查看Tomcat服务器的更新HTTP端口：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> tomcat
root         <span class="token number">1</span>     <span class="token number">0</span>  <span class="token number">1</span> <span class="token number">15</span>:12 ?        00:00:02 /opt/java/openjdk/bin/java <span class="token parameter variable">-Djava.util.logging.config.file</span><span class="token operator">=</span>/usr/local/tomcat/conf/logging.properties <span class="token parameter variable">-Dcatalina.http.port</span><span class="token operator">=</span><span class="token number">8082</span> <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的命令输出中，我们可以看到HTTP端口已更新为_8082_。_CATALINA_OPTS_的一个主要用途是添加自定义系统属性。为了演示，让我们看看命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">CATALINA_OPTS</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$CATALINA_OPTS</span> -Dcustom.property=baeldung-example-value&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的命令中，我们为Tomcat服务器添加了一个自定义属性。设置此环境并在重启Tomcat服务器后，Java应用程序和Tomcat服务器将访问此自定义属性值。我们还可以使用此命令提供整个配置属性。为了说明，让我们看看命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">CATALINA_OPTS</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$CATALINA_OPTS</span> -Dbaeldungapp.config=/usr/local/tomcat/config/config.properties&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的命令中，我们使用_baeldungapp.config_属性文件为baeldung应用程序提供了配置文件。只需重启服务器即可使此配置生效。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了在Tomcat服务器中_CATALINA_OPTS_和_JAVA_OPTS_的应用。首先，我们使用_JAVA_OPTS_更改Tomcat服务器的JVM配置。之后，我们使用_CATALINA_OPTS_更新了Tomcat服务器的HTTP端口。</p>`,32),o=[p];function l(c,r){return s(),e("div",null,o)}const A=a(t,[["render",l],["__file","2024-06-30-CATALINA OPTS vs. JAVA OPTS in Apache Tomcat.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-CATALINA%20OPTS%20vs.%20JAVA%20OPTS%20in%20Apache%20Tomcat.html","title":"Apache Tomcat中的CATALINA_OPTS与JAVA_OPTS | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Tomcat","Java"],"tag":["CATALINA_OPTS","JAVA_OPTS"],"head":[["meta",{"name":"keywords","content":"Apache Tomcat, JVM, CATALINA_OPTS, JAVA_OPTS"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-CATALINA%20OPTS%20vs.%20JAVA%20OPTS%20in%20Apache%20Tomcat.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Apache Tomcat中的CATALINA_OPTS与JAVA_OPTS | Baeldung"}],["meta",{"property":"og:description","content":"Apache Tomcat中的CATALINA_OPTS与JAVA_OPTS | Baeldung Apache Tomcat是一个开源的Java Servlet Web容器服务器，用于部署基于Java的应用程序。Tomcat服务器主要执行Java Servlet和JSP，用于动态Web应用程序。在配置Tomcat服务器时，我们可以使用_CATALIN..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T03:33:41.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"CATALINA_OPTS"}],["meta",{"property":"article:tag","content":"JAVA_OPTS"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T03:33:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache Tomcat中的CATALINA_OPTS与JAVA_OPTS | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T03:33:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Apache Tomcat中的CATALINA_OPTS与JAVA_OPTS | Baeldung Apache Tomcat是一个开源的Java Servlet Web容器服务器，用于部署基于Java的应用程序。Tomcat服务器主要执行Java Servlet和JSP，用于动态Web应用程序。在配置Tomcat服务器时，我们可以使用_CATALIN..."},"headers":[{"level":2,"title":"2. CATALINA_OPTS和JAVA_OPTS的重要性","slug":"_2-catalina-opts和java-opts的重要性","link":"#_2-catalina-opts和java-opts的重要性","children":[]},{"level":2,"title":"3. 使用JAVA_OPTS","slug":"_3-使用java-opts","link":"#_3-使用java-opts","children":[]},{"level":2,"title":"4. 使用CATALINA_OPTS","slug":"_4-使用catalina-opts","link":"#_4-使用catalina-opts","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719718421000,"updatedTime":1719718421000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.12,"words":1235},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-CATALINA OPTS vs. JAVA OPTS in Apache Tomcat.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Apache Tomcat是一个开源的Java Servlet Web容器服务器，用于部署基于Java的应用程序。Tomcat服务器主要执行Java Servlet和JSP，用于动态Web应用程序。<strong>在配置Tomcat服务器时，我们可以使用_CATALINA_OPTS_和_JAVA_OPTS_环境变量来进行JVM设置。</strong></p>\\n<p>在本教程中，我们将探讨在Tomcat服务器中使用_CATALINA_OPTS_和_JAVA_OPTS_的用途。</p>\\n<h2>2. CATALINA_OPTS和JAVA_OPTS的重要性</h2>\\n<p>Tomcat服务器使用_CATALINA_OPTS_和_JAVA_OPTS_环境变量进行自定义配置。这两个环境变量允许我们为Tomcat服务器自定义JVM选项，但它们的用途略有不同。自定义JVM选项对于实现Web应用程序的高性能至关重要。</p>","autoDesc":true}');export{A as comp,d as data};
