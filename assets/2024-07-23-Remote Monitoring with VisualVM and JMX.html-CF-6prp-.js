import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as t,a as n}from"./app-8nJ1rqSf.js";const i={},s=n(`<h1 id="使用visualvm和jmx进行远程监控" tabindex="-1"><a class="header-anchor" href="#使用visualvm和jmx进行远程监控"><span>使用VisualVM和JMX进行远程监控</span></a></h1><p>在本文中，我们将学习如何使用VisualVM和Java管理扩展（JMX）对Java应用程序进行远程监控。</p><p>JMX是<strong>用于管理和监控JVM应用程序的标准API</strong>。JVM具有内置的仪器化工具，JMX可以利用这些工具进行管理与监控。因此，我们通常将这些工具称为“开箱即用的管理工具”或者在这种情况下称为“JMX代理”。</p><h2 id="_3-visualvm" tabindex="-1"><a class="header-anchor" href="#_3-visualvm"><span>3. VisualVM</span></a></h2><p>VisualVM是一个提供JVM轻量级分析功能的视觉工具。市场上有许多其他主流的分析工具。然而，<strong>VisualVM是免费的</strong>，并且从JDK 6U7版本开始捆绑发布，直到JDK 8的早期更新。对于其他版本，Java VisualVM作为一个独立的应用程序提供。</p><p>VisualVM<strong>允许我们连接到本地和远程JVM应用程序</strong>进行监控。</p><p>在任何机器上启动时，它<strong>自动发现并开始监控所有本地运行的JVM应用程序</strong>。然而，我们需要显式连接远程应用程序。</p><h3 id="_3-1-jvm连接模式" tabindex="-1"><a class="header-anchor" href="#_3-1-jvm连接模式"><span>3.1. JVM连接模式</span></a></h3><p>JVM通过诸如_jstatd_或JMX等工具暴露自身以供监控。这些工具反过来为VisualVM等工具提供API以获取分析数据。</p><p>_jstatd_程序是一个与JDK捆绑的守护进程。然而，它的功能有限。例如，我们不能监控CPU使用情况，也不能获取线程转储。</p><p>另一方面，JMX技术不需要在JVM上运行任何守护进程。此外，它可以用来分析本地和远程JVM应用程序。但是，我们需要使用特殊的属性启动JVM以启用开箱即用的监控功能。在本文中，我们将只关注JMX模式。</p><h3 id="_3-2-启动" tabindex="-1"><a class="header-anchor" href="#_3-2-启动"><span><strong>3.2. 启动</strong></span></a></h3><p>正如我之前看到的，我们的JDK版本可能捆绑了VisualVM，也可能没有。无论哪种情况，我们都可以通过执行适当的二进制文件来启动它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>./jvisualvm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果二进制文件存在于_$JAVA_HOME/bin_文件夹中，那么上述命令将打开VisualVM界面，如果单独安装，则可能在不同的文件夹中。</p><p>默认情况下，VisualVM启动时会加载所有本地运行的Java应用程序：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/12/visualvm-launch.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_3-3-特性" tabindex="-1"><a class="header-anchor" href="#_3-3-特性"><span><strong>3.3. 特性</strong></span></a></h3><p>VisualVM提供了几个有用的特性：</p><ul><li>显示本地和远程Java应用程序进程</li><li>监控进程性能，包括CPU使用情况、GC活动、加载的类数量等指标</li><li>在所有进程中可视化线程以及它们在不同状态（如睡眠和等待）中花费的时间</li><li>获取并显示线程转储，以便立即了解被监控进程的内部情况</li></ul><p>VisualVM特性页面有更全面的可用特性列表。像所有设计良好的软件一样，通过在_插件_标签上安装第三方插件，VisualVM可以扩展以访问更高级和独特的特性。</p><h2 id="_4-远程监控" tabindex="-1"><a class="header-anchor" href="#_4-远程监控"><span><strong>4. 远程监控</strong></span></a></h2><p>在本节中，我们将演示如何使用VisualVM和JMX远程监控Java应用程序。我们还有机会探索所有必要的配置和JVM启动选项。</p><h3 id="_4-1-应用程序配置" tabindex="-1"><a class="header-anchor" href="#_4-1-应用程序配置"><span><strong>4.1. 应用程序配置</strong></span></a></h3><p>我们大多数，如果不是全部Java应用程序，都是通过启动脚本启动的。在这个脚本中，启动命令通常向JVM传递必要的参数，以指定应用程序的需求，例如最大和最小内存要求。</p><p>假设我们有一个打包为_MyApp.jar_的应用程序，让我们看看一个包含主要JMX配置参数的示例启动命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>java -Dcom.sun.management.jmxremote.port=8080 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false -Xms1024m -Xmx1024m -jar MyApp.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的命令中，_MyApp.jar_通过端口8080配置了开箱即用的监控能力。此外，为了简单起见，我们停用了SSL加密和密码认证。</p><p>在公共网络中，我们理想上应该在VisualVM和JVM应用程序之间的通信中进行安全设置。</p><h3 id="_4-2-visualvm配置" tabindex="-1"><a class="header-anchor" href="#_4-2-visualvm配置"><span><strong>4.2. VisualVM配置</strong></span></a></h3><p>现在我们已经在本地运行了VisualVM，并且_MyApp.jar_在远程服务器上运行，我们可以开始我们的远程监控会话。</p><p>右键点击左侧面板，选择_添加JMX连接_：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/12/visualvm-jmx-connection.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在弹出的对话框中的_连接_字段中输入_host:port_组合，然后点击_OK_。</p><p>如果成功，我们现在应该能够通过双击左侧面板中的新连接看到一个监控窗口：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/12/visualvm-remote-monitor.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span><strong>5. 结论</strong></span></a></h2><p>在本文中，我们探讨了使用VisualVM和JMX对Java应用程序进行远程监控。</p>`,38),l=[s];function o(r,p){return t(),e("div",null,l)}const m=a(i,[["render",o],["__file","2024-07-23-Remote Monitoring with VisualVM and JMX.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-23/2024-07-23-Remote%20Monitoring%20with%20VisualVM%20and%20JMX.html","title":"使用VisualVM和JMX进行远程监控","lang":"zh-CN","frontmatter":{"date":"2021-12-01T00:00:00.000Z","category":["Java","VisualVM"],"tag":["Java","VisualVM","JMX","远程监控"],"head":[["meta",{"name":"keywords","content":"Java, VisualVM, JMX, 远程监控, JVM"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-23/2024-07-23-Remote%20Monitoring%20with%20VisualVM%20and%20JMX.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用VisualVM和JMX进行远程监控"}],["meta",{"property":"og:description","content":"使用VisualVM和JMX进行远程监控 在本文中，我们将学习如何使用VisualVM和Java管理扩展（JMX）对Java应用程序进行远程监控。 JMX是用于管理和监控JVM应用程序的标准API。JVM具有内置的仪器化工具，JMX可以利用这些工具进行管理与监控。因此，我们通常将这些工具称为“开箱即用的管理工具”或者在这种情况下称为“JMX代理”。 3..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2021/12/visualvm-launch.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T13:28:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"VisualVM"}],["meta",{"property":"article:tag","content":"JMX"}],["meta",{"property":"article:tag","content":"远程监控"}],["meta",{"property":"article:published_time","content":"2021-12-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T13:28:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用VisualVM和JMX进行远程监控\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2021/12/visualvm-launch.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/12/visualvm-jmx-connection.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/12/visualvm-remote-monitor.png\\"],\\"datePublished\\":\\"2021-12-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-23T13:28:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用VisualVM和JMX进行远程监控 在本文中，我们将学习如何使用VisualVM和Java管理扩展（JMX）对Java应用程序进行远程监控。 JMX是用于管理和监控JVM应用程序的标准API。JVM具有内置的仪器化工具，JMX可以利用这些工具进行管理与监控。因此，我们通常将这些工具称为“开箱即用的管理工具”或者在这种情况下称为“JMX代理”。 3..."},"headers":[{"level":2,"title":"3. VisualVM","slug":"_3-visualvm","link":"#_3-visualvm","children":[{"level":3,"title":"3.1. JVM连接模式","slug":"_3-1-jvm连接模式","link":"#_3-1-jvm连接模式","children":[]},{"level":3,"title":"3.2. 启动","slug":"_3-2-启动","link":"#_3-2-启动","children":[]},{"level":3,"title":"3.3. 特性","slug":"_3-3-特性","link":"#_3-3-特性","children":[]}]},{"level":2,"title":"4. 远程监控","slug":"_4-远程监控","link":"#_4-远程监控","children":[{"level":3,"title":"4.1. 应用程序配置","slug":"_4-1-应用程序配置","link":"#_4-1-应用程序配置","children":[]},{"level":3,"title":"4.2. VisualVM配置","slug":"_4-2-visualvm配置","link":"#_4-2-visualvm配置","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721741319000,"updatedTime":1721741319000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4,"words":1200},"filePathRelative":"posts/baeldung/2024-07-23/2024-07-23-Remote Monitoring with VisualVM and JMX.md","localizedDate":"2021年12月1日","excerpt":"\\n<p>在本文中，我们将学习如何使用VisualVM和Java管理扩展（JMX）对Java应用程序进行远程监控。</p>\\n<p>JMX是<strong>用于管理和监控JVM应用程序的标准API</strong>。JVM具有内置的仪器化工具，JMX可以利用这些工具进行管理与监控。因此，我们通常将这些工具称为“开箱即用的管理工具”或者在这种情况下称为“JMX代理”。</p>\\n<h2>3. VisualVM</h2>\\n<p>VisualVM是一个提供JVM轻量级分析功能的视觉工具。市场上有许多其他主流的分析工具。然而，<strong>VisualVM是免费的</strong>，并且从JDK 6U7版本开始捆绑发布，直到JDK 8的早期更新。对于其他版本，Java VisualVM作为一个独立的应用程序提供。</p>","autoDesc":true}');export{m as comp,d as data};
