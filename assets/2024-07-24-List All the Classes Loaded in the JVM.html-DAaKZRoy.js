import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-CJGTm_7y.js";const i={},l=n('<h1 id="jvm中列出所有已加载的类" tabindex="-1"><a class="header-anchor" href="#jvm中列出所有已加载的类"><span>JVM中列出所有已加载的类</span></a></h1><p>Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK的CRaC（在检查点协调恢复）项目可以通过<strong>创建应用程序在性能峰值时的检查点</strong>并<strong>将JVM实例恢复到该点</strong>来帮助改善这些问题。</p><p>为了充分利用这一特性，BellSoft提供了为Java应用程序高度优化的容器。这些容器打包了Alpaquita Linux（一个为Java和云环境优化的全功能操作系统）和Liberica JDK（基于OpenJDK的开源Java运行时）。</p><p>这些即用型镜像允许我们轻松地在Spring Boot应用程序中<strong>集成CRaC</strong>：</p><p><strong>使用CRaC支持提高Java应用程序性能</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将学习不同的技术来列出JVM中加载的所有类。例如，我们可以加载JVM的堆转储或将运行中的应用程序连接到各种工具，并列出在该工具中加载的所有类。此外，还有各种库可以以编程方式完成此操作。</p><p>我们将探索非编程和编程方法。</p><h2 id="_2-非编程方法" tabindex="-1"><a class="header-anchor" href="#_2-非编程方法"><span>2. 非编程方法</span></a></h2><h3 id="_2-1-使用vm参数" tabindex="-1"><a class="header-anchor" href="#_2-1-使用vm参数"><span>2.1. 使用VM参数</span></a></h3><p>列出所有加载的类最直接的方法可能是在控制台输出或文件中记录。</p><p>我们将使用以下JVM参数运行Java应用程序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>java ``&lt;app_name&gt;`` --verbose:class\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[Opened /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]\n[Loaded java.lang.Object from /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]\n[Loaded java.io.Serializable from /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]\n[Loaded java.lang.Comparable from /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]\n[Loaded java.lang.CharSequence from /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]\n[Loaded java.lang.String from /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]\n[Loaded java.lang.reflect.AnnotatedElement from /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]\n[Loaded java.lang.reflect.GenericDeclaration from /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]\n[Loaded java.lang.reflect.Type from /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]\n[Loaded java.lang.Class from /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]\n................................\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于Java 9，我们将使用<code>-Xlog</code> JVM参数将加载的类记录到文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>java ``&lt;app_name&gt;`` -Xlog:class+load=info:classloaded.txt\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-2-使用堆转储" tabindex="-1"><a class="header-anchor" href="#_2-2-使用堆转储"><span>2.2. 使用堆转储</span></a></h3><p>我们将看到不同的工具如何使用JVM堆转储来提取类加载信息。但首先，我们将使用以下命令生成堆转储：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>jmap -dump:format=b,file=/opt/tmp/heapdump.bin `&lt;app_pid&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述堆转储可以在各种工具中打开以获取不同的指标。</p><p>在Eclipse中，我们将在Eclipse Memory Analyzer中加载堆转储文件<code>heapdump.bin</code>，并使用直方图接口：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/11/eclipse-histogram.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>现在，我们将在Java VisualVM界面中打开堆转储文件<code>heapdump.bin</code>，并使用按实例或大小分类的类选项：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/11/heapdump-visualvm.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_2-3-jprofiler" tabindex="-1"><a class="header-anchor" href="#_2-3-jprofiler"><span>2.3. JProfiler</span></a></h3><p>JProfiler是顶级的Java应用程序分析器之一，具有丰富的功能集，可以查看不同的指标。</p><p>在JProfiler中，我们可以<strong>附加到运行的JVM或加载堆转储文件</strong>并获取所有与JVM相关的指标，包括所有加载的类的名称。</p><p>我们将使用附加进程功能让JProfiler连接到运行中的应用程序_ListLoadedClass_：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/11/jprofiler-attach-process.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>然后，我们将拍摄应用程序的快照，并使用它来获取所有加载的类：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/11/jprofiler-snapshot.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>下面，我们可以使用堆步行者功能查看加载的类的实例计数：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/11/jprofiler-heapwalker.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_3-编程方法" tabindex="-1"><a class="header-anchor" href="#_3-编程方法"><span>3. 编程方法</span></a></h2><h3 id="_3-1-仪器化api" tabindex="-1"><a class="header-anchor" href="#_3-1-仪器化api"><span>3.1. 仪器化API</span></a></h3><p>Java提供了Instrumentation API，有助于获取应用程序的有价值指标。首先，我们需要创建并加载一个Java代理以获取应用程序中的_Instrumentation_接口实例。Java代理是一个在JVM上运行的程序的工具。</p><p>然后，我们需要调用_Instrumentation_方法_getInitiatedClasses(Classloader loader)_以获取特定类加载器类型的所有加载的类。</p><h3 id="_3-2-google-guava" tabindex="-1"><a class="header-anchor" href="#_3-2-google-guava"><span>3.2. Google Guava</span></a></h3><p>我们将看到Guava库如何使用当前类加载器获取加载到JVM中的所有类的列表。</p><p>让我们首先向我们的Maven项目添加Guava依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependency&gt;`\n    ``&lt;groupId&gt;``com.google.guava``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``guava``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``31.0.1-jre``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将使用当前类加载器实例初始化_ClassPath_对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ClassPath classPath = ClassPath.from(ListLoadedClass.class.getClassLoader());\nSet`&lt;ClassInfo&gt;` classes = classPath.getAllClasses();\nAssertions.assertTrue(4 &lt; classes.size());\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-反射api" tabindex="-1"><a class="header-anchor" href="#_3-3-反射api"><span>3.3. 反射API</span></a></h3><p>我们将使用Reflections库扫描当前类路径并允许我们在运行时查询它。</p><p>让我们首先向我们的Maven项目添加_reflections_依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependency&gt;`\n    ``&lt;groupId&gt;``org.reflections``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``reflections``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``0.10.2``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们将查看示例代码，该代码返回一个包下的类集合：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Reflections reflections = new Reflections(packageName, new SubTypesScanner(false));\nSet`&lt;Class&gt;` classes = reflections.getSubTypesOf(Object.class)\n  .stream()\n  .collect(Collectors.toSet());\nAssertions.assertEquals(4, classes.size());\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了列出JVM中加载的所有类的各种方法。首先，我们看到了如何使用VM参数记录加载的类列表。</p><p>然后，我们探索了各种工具如何加载堆转储或连接到JVM以显示各种指标，包括加载的类。最后，我们涵盖了一些Java库。</p><p>像往常一样，所有的代码都可以在GitHub上找到。</p>',53),s=[l];function r(d,o){return t(),a("div",null,s)}const g=e(i,[["render",r],["__file","2024-07-24-List All the Classes Loaded in the JVM.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-24/2024-07-24-List%20All%20the%20Classes%20Loaded%20in%20the%20JVM.html","title":"JVM中列出所有已加载的类","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["JVM","Java"],"tag":["CRaC","性能优化"],"head":[["meta",{"name":"keywords","content":"JVM, Java, CRaC, 性能优化, 类加载"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-24/2024-07-24-List%20All%20the%20Classes%20Loaded%20in%20the%20JVM.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JVM中列出所有已加载的类"}],["meta",{"property":"og:description","content":"JVM中列出所有已加载的类 Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK的CRaC（在检查点协调恢复）项目可以通过创建应用程序在性能峰值时的检查点并将JVM实例恢复到该点来帮助改善这些问题。 为了充分利用这一特性，BellSoft提供了为Java应用程序高度优化的容器。这些容器打包了Alpaquita Linux（一个为Java和云环..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2021/11/eclipse-histogram.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-24T14:53:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"CRaC"}],["meta",{"property":"article:tag","content":"性能优化"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-24T14:53:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JVM中列出所有已加载的类\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2021/11/eclipse-histogram.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/11/heapdump-visualvm.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/11/jprofiler-attach-process.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/11/jprofiler-snapshot.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/11/jprofiler-heapwalker.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-24T14:53:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"JVM中列出所有已加载的类 Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK的CRaC（在检查点协调恢复）项目可以通过创建应用程序在性能峰值时的检查点并将JVM实例恢复到该点来帮助改善这些问题。 为了充分利用这一特性，BellSoft提供了为Java应用程序高度优化的容器。这些容器打包了Alpaquita Linux（一个为Java和云环..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 非编程方法","slug":"_2-非编程方法","link":"#_2-非编程方法","children":[{"level":3,"title":"2.1. 使用VM参数","slug":"_2-1-使用vm参数","link":"#_2-1-使用vm参数","children":[]},{"level":3,"title":"2.2. 使用堆转储","slug":"_2-2-使用堆转储","link":"#_2-2-使用堆转储","children":[]},{"level":3,"title":"2.3. JProfiler","slug":"_2-3-jprofiler","link":"#_2-3-jprofiler","children":[]}]},{"level":2,"title":"3. 编程方法","slug":"_3-编程方法","link":"#_3-编程方法","children":[{"level":3,"title":"3.1. 仪器化API","slug":"_3-1-仪器化api","link":"#_3-1-仪器化api","children":[]},{"level":3,"title":"3.2. Google Guava","slug":"_3-2-google-guava","link":"#_3-2-google-guava","children":[]},{"level":3,"title":"3.3. 反射API","slug":"_3-3-反射api","link":"#_3-3-反射api","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721832834000,"updatedTime":1721832834000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.99,"words":1197},"filePathRelative":"posts/baeldung/2024-07-24/2024-07-24-List All the Classes Loaded in the JVM.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK的CRaC（在检查点协调恢复）项目可以通过<strong>创建应用程序在性能峰值时的检查点</strong>并<strong>将JVM实例恢复到该点</strong>来帮助改善这些问题。</p>\\n<p>为了充分利用这一特性，BellSoft提供了为Java应用程序高度优化的容器。这些容器打包了Alpaquita Linux（一个为Java和云环境优化的全功能操作系统）和Liberica JDK（基于OpenJDK的开源Java运行时）。</p>\\n<p>这些即用型镜像允许我们轻松地在Spring Boot应用程序中<strong>集成CRaC</strong>：</p>","autoDesc":true}');export{g as comp,v as data};
