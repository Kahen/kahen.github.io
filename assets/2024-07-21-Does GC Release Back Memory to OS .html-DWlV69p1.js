import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-CtR6X2Br.js";const o={},p=n('<p>Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK的CRaC（在检查点协调恢复）项目可以通过创建应用程序峰值性能的检查点并将JVM实例恢复到该点来帮助改善这些问题。</p><p>为了充分利用这一特性，BellSoft提供了高度优化的Java应用程序容器。这些容器打包了Alpaquita Linux（一个为Java和云环境优化的全功能操作系统）和Liberica JDK（基于OpenJDK的开源Java运行时）。</p><p>这些即用型映像使我们能够轻松地在Spring Boot应用程序中集成CRaC：</p><h3 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h3><p>垃圾收集器（GC）处理Java中的内存管理。因此，程序员不需要显式地处理内存分配和释放。</p><p>在Java中，JVM最初会保留一定数量的内存。有时，实际使用的内存明显少于保留的数量。在这种情况下，我们更愿意将多余的内存返回给操作系统。</p><p>整个过程取决于用于垃圾收集的算法。因此，我们可以根据所需行为选择GC和JVM的类型。</p><p>在本教程中，我们将探索GC的内存管理及其与操作系统的交互。</p><h3 id="_2-jvm内存组织" tabindex="-1"><a class="header-anchor" href="#_2-jvm内存组织"><span>2. JVM内存组织</span></a></h3><p>当JVM初始化时，会创建不同类型的内存区域，例如堆区域、栈区域、方法区域、程序计数器和本地方法栈。</p><p>GC处理堆存储。因此，本文将专注于与堆相关的内存交互。</p><p>我们可以使用-Xms和-Xmx标志分别指定初始和最大堆大小。如果-Xms低于-Xmx，则意味着JVM在开始时没有将所有保留的内存提交给堆。简而言之，<strong>堆大小从-Xms开始，可以扩展到-Xmx</strong>。这允许开发人员配置所需的堆内存大小。</p><p>现在，当应用程序运行时，不同的对象在堆内分配内存。在垃圾收集时，GC释放未引用的对象并释放内存。这种释放的内存目前是堆本身的一部分，因为每次释放后与操作系统交互是一个CPU密集型的过程。</p><p>对象在堆内分散存放。<strong>GC需要压缩内存并创建一个自由块以返回给操作系统</strong>。它涉及<strong>在返回内存时执行额外的进程</strong>。此外，Java应用程序可能在稍后阶段需要额外的内存。为此，<strong>我们需要再次与操作系统通信以请求更多内存</strong>。此外，<strong>我们不能确保在请求时操作系统中内存的可用性</strong>。因此，使用内部堆而不是频繁调用操作系统获取内存是一种更安全的方法。</p><p>然而，如果我们的应用程序不需要整个堆内存，我们只是在阻塞可用资源，这些资源本可以被操作系统用于其他应用程序。考虑到这一点，JVM引入了高效和自动化的内存释放技术。</p><h3 id="_3-垃圾收集器" tabindex="-1"><a class="header-anchor" href="#_3-垃圾收集器"><span>3. 垃圾收集器</span></a></h3><p>随着不同版本发布，Java引入了不同类型的GC。堆与操作系统之间的内存交互取决于JVM和GC实现。一些GC实现积极支持堆收缩。<strong>堆收缩是从堆中释放多余内存到操作系统以优化资源使用的过程</strong>。</p><p>例如，Parallel GC不轻易将未使用的内存释放回操作系统。另一方面，一些<strong>GC分析内存消耗并相应地确定是否从堆中释放一些空闲内存</strong>。G1、Serial、Shenandoah和Z GC支持堆收缩。</p><p>现在让我们探索这些过程。</p><h4 id="_3-1-垃圾优先-g1-gc" tabindex="-1"><a class="header-anchor" href="#_3-1-垃圾优先-g1-gc"><span>3.1. 垃圾优先（G1）GC</span></a></h4><p>G1自Java 9以来已成为默认的GC。它支持在不会产生长时间暂停的情况下进行压缩过程。使用内部自适应优化算法，它<strong>根据应用程序使用情况分析所需的RAM，并在需要时取消提交内存</strong>。</p><p>最初的实现支持在完全GC之后或在并发周期事件期间支持堆收缩。然而，对于理想情况，我们希望在应用程序空闲时立即将未使用的内存返回给操作系统。我们希望GC能够根据运行时应用程序的内存使用动态适应。</p><p>Java在不同的GC中包含了这些功能。对于G1，JEP 346引入了这些变化。从Java 12及更高版本，堆收缩也可以在并发备注阶段进行。<strong>G1尝试在应用程序空闲时分析堆使用情况，并根据需要触发定期的垃圾收集</strong>。G1可以基于_G1PeriodicGCInvokesConcurrent_选项启动并发周期或完全GC。执行周期后，G1需要调整堆大小并将释放的内存返回给操作系统。</p><h4 id="_3-2-串行gc" tabindex="-1"><a class="header-anchor" href="#_3-2-串行gc"><span>3.2. 串行GC</span></a></h4><p>串行GC也支持堆收缩行为。与G1相比，它需要额外的四个完整GC周期来取消提交释放的内存。</p><h4 id="_3-3-zgc" tabindex="-1"><a class="header-anchor" href="#_3-3-zgc"><span>3.3. ZGC</span></a></h4><p>ZGC是在Java 11中引入的。它也在JEP 351中增强了功能，可以返回未使用的内存到操作系统。</p><h4 id="_3-4-shenandoah-gc" tabindex="-1"><a class="header-anchor" href="#_3-4-shenandoah-gc"><span>3.4. Shenandoah GC</span></a></h4><p>Shenandoah是一种并发GC。它<strong>异步执行垃圾收集</strong>。消除了进行完全GC的需要，这在应用程序的性能优化方面大有帮助。</p><h3 id="_4-使用jvm标志" tabindex="-1"><a class="header-anchor" href="#_4-使用jvm标志"><span>4. 使用JVM标志</span></a></h3><p>我们之前已经看到，我们可以使用JVM命令行选项指定堆大小。类似地，我们可以使用不同的标志来配置GC的默认堆收缩行为：</p><ul><li><em><strong>-XX:GCTimeRatio</strong></em>：指定应用程序执行和GC执行之间期望的时间分配。我们可以使用它来使GC运行更长</li><li><em><strong>-XX:MinHeapFreeRatio</strong></em>：指定垃圾收集后堆中空闲空间的最小预期比例</li><li><em><strong>-XX:MaxHeapFreeRatio</strong></em>：指定垃圾收集后堆中空闲空间的最大预期比例</li></ul><p>如果<strong>堆中可用的空闲空间高于使用_-XX:MaxHeapFreeRatio_选项指定的比例，则GC可以将未使用的内存返回给操作系统</strong>。我们可以配置上述标志的值来限制堆中未使用内存的数量。我们有类似的选项可用于并发垃圾收集过程：</p><ul><li><em><strong>-XX:InitiatingHeapOccupancyPercent</strong></em>：指定启动并发垃圾收集所需的堆占用百分比。</li><li><em><strong>-XX:-ShrinkHeapInSteps</strong></em>：立即将堆大小减少到_-XX:MaxHeapFreeRatio_值。默认实现需要多个垃圾收集周期来完成此过程。</li></ul><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们看到了Java提供了不同类型的GC以满足不同的需求。GC可以回收并返回免费内存到主机操作系统。我们可以根据我们的要求选择GC的类型。</p><p>我们还探讨了使用JVM参数来调整GC行为以达到期望的性能水平。此外，我们可以选择通过JVM动态调整内存使用。我们应该考虑每种选择的选项与我们的应用程序和涉及的资源相关的权衡。</p><p>OK</p>',38),r=[p];function s(i,l){return t(),a("div",null,r)}const d=e(o,[["render",s],["__file","2024-07-21-Does GC Release Back Memory to OS .html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Does%20GC%20Release%20Back%20Memory%20to%20OS%20.html","title":"","lang":"zh-CN","frontmatter":{"description":"Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK的CRaC（在检查点协调恢复）项目可以通过创建应用程序峰值性能的检查点并将JVM实例恢复到该点来帮助改善这些问题。 为了充分利用这一特性，BellSoft提供了高度优化的Java应用程序容器。这些容器打包了Alpaquita Linux（一个为Java和云环境优化的全功能操作系统）和Libe...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Does%20GC%20Release%20Back%20Memory%20to%20OS%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:description","content":"Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK的CRaC（在检查点协调恢复）项目可以通过创建应用程序峰值性能的检查点并将JVM实例恢复到该点来帮助改善这些问题。 为了充分利用这一特性，BellSoft提供了高度优化的Java应用程序容器。这些容器打包了Alpaquita Linux（一个为Java和云环境优化的全功能操作系统）和Libe..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T04:13:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:modified_time","content":"2024-07-21T04:13:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-07-21T04:13:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":3,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":3,"title":"2. JVM内存组织","slug":"_2-jvm内存组织","link":"#_2-jvm内存组织","children":[]},{"level":3,"title":"3. 垃圾收集器","slug":"_3-垃圾收集器","link":"#_3-垃圾收集器","children":[]},{"level":3,"title":"4. 使用JVM标志","slug":"_4-使用jvm标志","link":"#_4-使用jvm标志","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721535198000,"updatedTime":1721535198000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.99,"words":1796},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Does GC Release Back Memory to OS .md","localizedDate":"2024年7月21日","excerpt":"<p>Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK的CRaC（在检查点协调恢复）项目可以通过创建应用程序峰值性能的检查点并将JVM实例恢复到该点来帮助改善这些问题。</p>\\n<p>为了充分利用这一特性，BellSoft提供了高度优化的Java应用程序容器。这些容器打包了Alpaquita Linux（一个为Java和云环境优化的全功能操作系统）和Liberica JDK（基于OpenJDK的开源Java运行时）。</p>\\n<p>这些即用型映像使我们能够轻松地在Spring Boot应用程序中集成CRaC：</p>\\n<h3>1. 引言</h3>\\n<p>垃圾收集器（GC）处理Java中的内存管理。因此，程序员不需要显式地处理内存分配和释放。</p>","autoDesc":true}');export{d as comp,m as data};
