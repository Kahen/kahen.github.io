import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as r,a as t}from"./app-8nJ1rqSf.js";const n={},o=t('<h1 id="解决-java-lang-outofmemoryerror-permgen-space-错误" tabindex="-1"><a class="header-anchor" href="#解决-java-lang-outofmemoryerror-permgen-space-错误"><span>解决“java.lang.OutOfMemoryError: PermGen space”错误</span></a></h1><p>Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK的CRaC（检查点协调恢复）项目可以通过<strong>创建应用程序峰值性能的检查点</strong>并恢复JVM实例到该点来帮助改善这些问题。</p><p>为了充分利用这一特性，BellSoft提供了高度优化的Java应用程序容器。这些容器打包了Alpaquita Linux（一个为Java和云环境优化的全功能操作系统）和Liberica JDK（基于OpenJDK的开源Java运行时）。</p><p>这些即用型映像使我们能够轻松地在Spring Boot应用程序中<strong>集成CRaC</strong>：</p><p><strong>使用CRaC支持提高Java应用程序性能</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>PermGen（持久代）是为运行基于JVM的应用程序分配的一块特殊内存。PermGen错误是_java.lang.OutOfMemoryError_系列之一，它表明资源（内存）耗尽。</p><p>在这个快速教程中，我们将看看是什么导致了_java.lang.OutOfMemoryError: Permgen space_错误以及如何解决它。</p><h2 id="_2-java内存类型" tabindex="-1"><a class="header-anchor" href="#_2-java内存类型"><span>2. Java内存类型</span></a></h2><p>JVM使用两种类型的内存：栈和堆。栈仅用于存储原始类型和对象地址。堆则包含对象的值。<strong>当我们谈论内存错误时，我们总是指的是堆。PermGen实际上是堆内存的一部分，但与JVM的主内存分开并不同方式处理。</strong> 需要理解的最重要的概念是，即使堆中还有很多可用空间，仍然可能耗尽perm gen内存。</p><p>PermGen的主要作用是存储Java应用程序运行时的静态内容：特别是，它包含静态方法、静态变量、对静态对象的引用和类文件。</p><p><strong>简单来说，当分配给PermGen的空间不再能够存储对象时，就会发生此错误。这是因为PermGen不是动态分配的，并且有一个固定的最大容量。</strong> 默认大小对于64位JVM版本是82Mb，对于旧的32位JVM是64Mb。</p><p>导致PemGen耗尽的最频繁的原因之一是与类加载器相关的内存泄漏。事实上，PermGen包含类文件，类加载器负责加载Java类。在应用程序服务器中，为了实现各种应用程序的独立部署，通常会实例化多个类加载器。</p><p>当应用程序被卸载，服务器容器保留一个或多个类的引用时，问题就会出现。如果发生这种情况，类加载器本身不能被垃圾回收，从而用其类文件饱和PermGen内存。另一个常见的导致PermGen崩溃的原因是应用程序线程在应用程序被卸载后继续运行，从而保持在内存中分配的多个对象。</p><h2 id="_4-处理错误" tabindex="-1"><a class="header-anchor" href="#_4-处理错误"><span>4. 处理错误</span></a></h2><h3 id="_4-1-调整正确的jvm参数" tabindex="-1"><a class="header-anchor" href="#_4-1-调整正确的jvm参数"><span>4.1. 调整正确的JVM参数</span></a></h3><p>关于有限的内存空间，首先要做的是尽可能增加该空间的大小。通过使用特定标志，可以增加PermGen空间的默认大小。具有数千个类或大量Java字符串的大型应用程序通常需要更大的PermGen空间。通过使用JVM参数–_XX:MaxPermSize_可以为这个内存区域指定更大的空间。</p><p><strong>既然我们提到了JVM标志，还值得提一个不常用的标志，它可能会触发此错误。</strong> 当在JVM启动时指定–<em>Xnoclassgc</em> JVM参数时，显式地将类文件从要被丢弃的实体列表中移除。在应用程序服务器和现代框架中，每个应用程序的生命周期中加载和卸载类数千次，这可能会非常快地耗尽PermGen空间。</p><p>在Java的旧版本中，类是堆的永久部分，这意味着一旦加载，它们就保留在内存中。通过指定_JVM参数CMSClassUnloadingEnabled_（对于Java 1.5或_JVM参数CMSPermGenSweepingEnabled_对于Java 1.6），可以启用类的垃圾回收。如果我们碰巧使用Java 1.6，必须将_UseConcMarkSweepGC_设置为_true_。否则，_JVM参数CMSClassUnloadingEnabled_的参数将被忽略。</p><h3 id="_4-2-升级到jvm-8" tabindex="-1"><a class="header-anchor" href="#_4-2-升级到jvm-8"><span>4.2. 升级到JVM 8+</span></a></h3><p>解决这种错误的另一种方法是升级到较新版本的Java。从Java版本8开始，Permgen已被Metaspace完全取代，Metaspace具有自动可调整大小的空间和高级功能，可以清理死亡类。</p><h3 id="_4-3-堆分析" tabindex="-1"><a class="header-anchor" href="#_4-3-堆分析"><span>4.3. 堆分析</span></a></h3><p>如果发生内存泄漏，那么提供的所有解决方案都不足以解决问题。内存将耗尽，无论大小有多大。即使是Metaspace也有有限的内存可用。深度堆分析有时是唯一的解决方案，可以使用VisualGC或JPROFILER等工具进行。</p><h2 id="_5-总结" tabindex="-1"><a class="header-anchor" href="#_5-总结"><span>5. 总结</span></a></h2><p>在这个快速的写作中，我们已经看到了PermGen内存的目的以及与堆内存的主要区别。接下来，我们看到了_java.lang.OutOfMemoryError: Permgen_错误的含义以及在什么特殊情况下触发。在最后一节中，我们专注于在尝试解决这个特殊问题时可以采取的各种解决方案。</p>',25),p=[o];function l(s,i){return r(),a("div",null,p)}const h=e(n,[["render",l],["__file","2024-07-13-Dealing with  java.lang.OutOfMemoryError  PermGen space  Error.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Dealing%20with%20%20java.lang.OutOfMemoryError%20%20PermGen%20space%20%20Error.html","title":"解决“java.lang.OutOfMemoryError: PermGen space”错误","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JVM"],"tag":["PermGen","OutOfMemoryError"],"head":[["meta",{"name":"keywords","content":"Java, JVM, PermGen, OutOfMemoryError, CRaC, Java性能优化"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Dealing%20with%20%20java.lang.OutOfMemoryError%20%20PermGen%20space%20%20Error.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"解决“java.lang.OutOfMemoryError: PermGen space”错误"}],["meta",{"property":"og:description","content":"解决“java.lang.OutOfMemoryError: PermGen space”错误 Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK的CRaC（检查点协调恢复）项目可以通过创建应用程序峰值性能的检查点并恢复JVM实例到该点来帮助改善这些问题。 为了充分利用这一特性，BellSoft提供了高度优化的Java应用程序容器。这些容器..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T23:04:47.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"PermGen"}],["meta",{"property":"article:tag","content":"OutOfMemoryError"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T23:04:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"解决“java.lang.OutOfMemoryError: PermGen space”错误\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T23:04:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"解决“java.lang.OutOfMemoryError: PermGen space”错误 Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK的CRaC（检查点协调恢复）项目可以通过创建应用程序峰值性能的检查点并恢复JVM实例到该点来帮助改善这些问题。 为了充分利用这一特性，BellSoft提供了高度优化的Java应用程序容器。这些容器..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Java内存类型","slug":"_2-java内存类型","link":"#_2-java内存类型","children":[]},{"level":2,"title":"4. 处理错误","slug":"_4-处理错误","link":"#_4-处理错误","children":[{"level":3,"title":"4.1. 调整正确的JVM参数","slug":"_4-1-调整正确的jvm参数","link":"#_4-1-调整正确的jvm参数","children":[]},{"level":3,"title":"4.2. 升级到JVM 8+","slug":"_4-2-升级到jvm-8","link":"#_4-2-升级到jvm-8","children":[]},{"level":3,"title":"4.3. 堆分析","slug":"_4-3-堆分析","link":"#_4-3-堆分析","children":[]}]},{"level":2,"title":"5. 总结","slug":"_5-总结","link":"#_5-总结","children":[]}],"git":{"createdTime":1720911887000,"updatedTime":1720911887000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.3,"words":1291},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Dealing with  java.lang.OutOfMemoryError  PermGen space  Error.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK的CRaC（检查点协调恢复）项目可以通过<strong>创建应用程序峰值性能的检查点</strong>并恢复JVM实例到该点来帮助改善这些问题。</p>\\n<p>为了充分利用这一特性，BellSoft提供了高度优化的Java应用程序容器。这些容器打包了Alpaquita Linux（一个为Java和云环境优化的全功能操作系统）和Liberica JDK（基于OpenJDK的开源Java运行时）。</p>\\n<p>这些即用型映像使我们能够轻松地在Spring Boot应用程序中<strong>集成CRaC</strong>：</p>","autoDesc":true}');export{h as comp,g as data};
