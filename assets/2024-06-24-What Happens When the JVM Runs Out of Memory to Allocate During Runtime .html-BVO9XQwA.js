import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as r,o as a,a as t}from"./app-BDZ-trJf.js";const o={},n=t(`<h1 id="jvm运行时内存耗尽会发生什么" tabindex="-1"><a class="header-anchor" href="#jvm运行时内存耗尽会发生什么"><span>JVM运行时内存耗尽会发生什么？</span></a></h1><p>定义一个适当的JVM应用程序堆大小是关键步骤。这可能有助于我们的应用程序进行内存分配和处理高负载。然而，<strong>堆大小配置不当，无论是太小还是太大，都可能影响其性能。</strong></p><p>在本教程中，我们将了解_OutOfMemoryErrors_的原因及其与堆大小的联系。我们还将检查我们可以对这种错误做什么以及如何调查根本原因。</p><h2 id="_2-xmx-和-xms" tabindex="-1"><a class="header-anchor" href="#_2-xmx-和-xms"><span>2. -Xmx 和 -Xms</span></a></h2><p>**我们可以使用两个专用的JVM标志来控制堆分配。**第一个，-Xms，帮助我们设置堆的初始和最小大小。另一个，-Xmx，设置最大堆大小。还有其他的标志可以帮助更动态地分配，但总体上它们做类似的工作。</p><p>让我们检查这些标志如何相互关联以及它们与_OutOfMemoryError_的关系，以及它们如何引起或防止它。**首先，让我们明确一个显而易见的事情：-Xms不能大于-Xmx。**如果我们不遵循这个规则，JVM将在启动时失败应用程序：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-Xms6g</span> <span class="token parameter variable">-Xmx4g</span>
Error occurred during initialization of VM
Initial heap size <span class="token builtin class-name">set</span> to a larger value than the maximum heap size
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们考虑一个更有趣的场景。**如果我们尝试分配比我们的物理RAM更多的内存会发生什么？**这取决于JVM版本、架构、操作系统等。一些操作系统，如Linux，允许超额承诺并直接配置超额承诺。其他操作系统允许超额承诺，但这是根据它们内部的启发式规则进行的：</p><p>同时，即使我们有足够的物理内存，由于高碎片化，我们也可能无法启动应用程序。假设我们有4GB的物理RAM，其中大约3GB是可用的。<strong>分配2GB的堆可能是不可能的，因为RAM中没有这个大小的连续段：</strong></p><p>一些较新的JVM版本，特别是较新的版本，没有这样的要求。然而，它可能会影响运行时的对象分配。</p><h2 id="_3-运行时的-outofmemoryerror" tabindex="-1"><a class="header-anchor" href="#_3-运行时的-outofmemoryerror"><span>3. 运行时的 OutOfMemoryError</span></a></h2><p>假设我们顺利启动了应用程序。我们仍然有可能因为几个原因得到_OutOfMemoryError_。</p><h3 id="_3-1-耗尽堆空间" tabindex="-1"><a class="header-anchor" href="#_3-1-耗尽堆空间"><span>3.1. 耗尽堆空间</span></a></h3><p>内存消耗的增加可能是由自然原因引起的，例如，我们网店在节日季节的活动增加。**也可能是由于内存泄漏引起的。**我们通常可以通过检查GC活动来区分这两种情况。同时，可能还有更复杂的情况，例如最终化延迟或垃圾收集线程缓慢。</p><h3 id="_3-2-超额承诺" tabindex="-1"><a class="header-anchor" href="#_3-2-超额承诺"><span>3.2. 超额承诺</span></a></h3><p>由于交换空间，超额承诺是可能的。**我们可以通过在磁盘上转储一些数据来扩展我们的RAM。**这可能导致显著的减速，但同时，应用程序不会失败。然而，这可能不是解决这个问题的最佳或期望的解决方案。同时，交换内存的极端情况是抖动，这可能会冻结系统。</p><p>我们可以将超额承诺视为部分准备金银行业务。RAM并没有它承诺给应用程序的所有所需内存。然而，当应用程序开始要求它们承诺的内存时，操作系统可能会开始杀死不重要的应用程序，以确保其余的不会失败：</p><h3 id="_3-3-堆收缩" tabindex="-1"><a class="header-anchor" href="#_3-3-堆收缩"><span>3.3. 堆收缩</span></a></h3><p>这个问题与超额承诺有关，但罪魁祸首是试图最小化占用空间的垃圾收集启发式算法。<strong>即使应用程序在生命周期的某个时刻成功地声明了最大堆大小，这并不意味着下次也会得到它。</strong></p><p>垃圾收集器可能会将一些未使用的内存从堆中返回，操作系统可以将其重用于不同的目的。<strong>同时，当应用程序尝试重新获取它时，RAM可能已经被其他应用程序分配了。</strong></p><p>我们可以通过将-Xms和-Xmx设置为相同的值来控制它。这样，我们可以获得更可预测的内存消耗并避免堆收缩。然而，这可能会影响资源利用；因此，应该谨慎使用。<strong>此外，不同的JVM版本和垃圾收集器在堆收缩方面的行为可能会有所不同。</strong></p><h2 id="_4-outofmemoryerror" tabindex="-1"><a class="header-anchor" href="#_4-outofmemoryerror"><span>4. OutOfMemoryError</span></a></h2><p>并非所有的_OutOfMemoryErrors_都是一样的。我们有一堆不同的类型，了解它们之间的区别可能有助于我们确定根本原因。我们将只考虑那些与前面描述的场景相关的类型。</p><h3 id="_4-1-java堆空间" tabindex="-1"><a class="header-anchor" href="#_4-1-java堆空间"><span>4.1. Java堆空间</span></a></h3><p>我们可以在日志中看到以下消息：<em>java.lang.OutOfMemoryError: Java heap space.</em> 这清楚地描述了问题：我们的堆空间不足。这可能是由于内存泄漏或应用程序负载增加引起的。创建和移除速率的显著差异也可能引起这个问题。</p><h3 id="_4-2-gc-overhead-limit-exceeded" tabindex="-1"><a class="header-anchor" href="#_4-2-gc-overhead-limit-exceeded"><span>4.2. GC Overhead Limit Exceeded</span></a></h3><p>有时，应用程序可能会失败：<em>java.lang.OutOfMemoryError: GC Overhead limit exceeded.</em> **当应用程序花费98%的时间进行垃圾收集时，就会发生这种情况，这意味着吞吐量只有2%。**这种情况描述了垃圾收集抖动：应用程序正在运行，但没有有用的工作。</p><h3 id="_4-3-交换空间不足" tabindex="-1"><a class="header-anchor" href="#_4-3-交换空间不足"><span>4.3. 交换空间不足</span></a></h3><p>另一种类型的_OutOfMemoryError_是：<em>java.lang.OutOfMemoryError: request size bytes for reason. Out of swap space?</em> **这通常是操作系统超额承诺的指标。**在这种情况下，我们仍然有堆的容量，但操作系统无法为我们提供更多的内存。</p><h2 id="_5-根本原因" tabindex="-1"><a class="header-anchor" href="#_5-根本原因"><span>5. 根本原因</span></a></h2><p>在我们得到_OutOfMemoryError_的时候，我们的应用程序中几乎没有什么可以做的。虽然不推荐捕获错误，但在某些情况下，出于清理或记录目的可能是合理的。有时，我们可以看到处理条件逻辑的_try-catch_块的代码。<strong>这是一种相当昂贵且不可靠的hack，应该在大多数情况下避免。</strong></p><h3 id="_5-1-垃圾收集日志" tabindex="-1"><a class="header-anchor" href="#_5-1-垃圾收集日志"><span>5.1. 垃圾收集日志</span></a></h3><p>虽然_OutOfMemoryError_提供了问题的信息，但这不足以进行更深入的分析。最简单的方法是使用垃圾收集日志，它们不会创建太多开销，同时提供有关运行应用程序的重要信息。</p><h3 id="_5-2-堆转储" tabindex="-1"><a class="header-anchor" href="#_5-2-堆转储"><span>5.2. 堆转储</span></a></h3><p>堆转储是另一种查看应用程序的方法。虽然我们可以定期捕获它，但这可能会影响应用程序的性能。使用它的最经济的方式是在_OutOfMemoryError_时自动进行堆转储。幸运的是，JVM允许我们使用_-XX:+HeapDumpOnOutOfMemoryError_设置这个。我们还可以设置堆转储的路径，使用_-XX:HeapDumpPath_标志。</p><h3 id="_5-3-在-outofmemoryerror-上运行脚本" tabindex="-1"><a class="header-anchor" href="#_5-3-在-outofmemoryerror-上运行脚本"><span>5.3. 在_OutOfMemoryError_上运行脚本</span></a></h3><p>为了增强我们对_OutOfMemoryError_的体验，我们可以使用_-XX:OnOutOfMemoryError_并将其指向脚本，如果应用程序耗尽内存，脚本将运行。这可以用来实现通知系统，将堆转储发送到一些分析工具，或重新启动应用程序。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们讨论了_OutOfMemoryError_，它表明了我们应用程序之外的问题，就像其他错误一样。处理这些错误可能会造成更多的问题，使我们的应用程序不一致。处理这种情况的最佳方式是首先防止它发生。</p><p>**仔细的内存管理和JVM的配置可以帮助我们解决这个问题。**此外，分析垃圾收集日志可以帮助我们确定问题的原因。在不理解根本问题的情况下，为应用程序分配更多的内存或使用额外的技术来确保它会保持活跃，并不是正确的解决方案，可能会引起更多的问题。</p>`,40),s=[n];function i(l,p){return a(),r("div",null,s)}const c=e(o,[["render",i],["__file","2024-06-24-What Happens When the JVM Runs Out of Memory to Allocate During Runtime .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-What%20Happens%20When%20the%20JVM%20Runs%20Out%20of%20Memory%20to%20Allocate%20During%20Runtime%20.html","title":"JVM运行时内存耗尽会发生什么？","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["JVM","内存管理"],"tag":["OutOfMemoryError","堆大小"],"head":[["meta",{"name":"keywords","content":"JVM, 内存管理, OutOfMemoryError, 堆大小, 性能优化"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-What%20Happens%20When%20the%20JVM%20Runs%20Out%20of%20Memory%20to%20Allocate%20During%20Runtime%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JVM运行时内存耗尽会发生什么？"}],["meta",{"property":"og:description","content":"JVM运行时内存耗尽会发生什么？ 定义一个适当的JVM应用程序堆大小是关键步骤。这可能有助于我们的应用程序进行内存分配和处理高负载。然而，堆大小配置不当，无论是太小还是太大，都可能影响其性能。 在本教程中，我们将了解_OutOfMemoryErrors_的原因及其与堆大小的联系。我们还将检查我们可以对这种错误做什么以及如何调查根本原因。 2. -Xmx..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T21:50:41.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"OutOfMemoryError"}],["meta",{"property":"article:tag","content":"堆大小"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T21:50:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JVM运行时内存耗尽会发生什么？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T21:50:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"JVM运行时内存耗尽会发生什么？ 定义一个适当的JVM应用程序堆大小是关键步骤。这可能有助于我们的应用程序进行内存分配和处理高负载。然而，堆大小配置不当，无论是太小还是太大，都可能影响其性能。 在本教程中，我们将了解_OutOfMemoryErrors_的原因及其与堆大小的联系。我们还将检查我们可以对这种错误做什么以及如何调查根本原因。 2. -Xmx..."},"headers":[{"level":2,"title":"2. -Xmx 和 -Xms","slug":"_2-xmx-和-xms","link":"#_2-xmx-和-xms","children":[]},{"level":2,"title":"3. 运行时的 OutOfMemoryError","slug":"_3-运行时的-outofmemoryerror","link":"#_3-运行时的-outofmemoryerror","children":[{"level":3,"title":"3.1. 耗尽堆空间","slug":"_3-1-耗尽堆空间","link":"#_3-1-耗尽堆空间","children":[]},{"level":3,"title":"3.2. 超额承诺","slug":"_3-2-超额承诺","link":"#_3-2-超额承诺","children":[]},{"level":3,"title":"3.3. 堆收缩","slug":"_3-3-堆收缩","link":"#_3-3-堆收缩","children":[]}]},{"level":2,"title":"4. OutOfMemoryError","slug":"_4-outofmemoryerror","link":"#_4-outofmemoryerror","children":[{"level":3,"title":"4.1. Java堆空间","slug":"_4-1-java堆空间","link":"#_4-1-java堆空间","children":[]},{"level":3,"title":"4.2. GC Overhead Limit Exceeded","slug":"_4-2-gc-overhead-limit-exceeded","link":"#_4-2-gc-overhead-limit-exceeded","children":[]},{"level":3,"title":"4.3. 交换空间不足","slug":"_4-3-交换空间不足","link":"#_4-3-交换空间不足","children":[]}]},{"level":2,"title":"5. 根本原因","slug":"_5-根本原因","link":"#_5-根本原因","children":[{"level":3,"title":"5.1. 垃圾收集日志","slug":"_5-1-垃圾收集日志","link":"#_5-1-垃圾收集日志","children":[]},{"level":3,"title":"5.2. 堆转储","slug":"_5-2-堆转储","link":"#_5-2-堆转储","children":[]},{"level":3,"title":"5.3. 在_OutOfMemoryError_上运行脚本","slug":"_5-3-在-outofmemoryerror-上运行脚本","link":"#_5-3-在-outofmemoryerror-上运行脚本","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719265841000,"updatedTime":1719265841000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.74,"words":2021},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-What Happens When the JVM Runs Out of Memory to Allocate During Runtime .md","localizedDate":"2024年6月25日","excerpt":"\\n<p>定义一个适当的JVM应用程序堆大小是关键步骤。这可能有助于我们的应用程序进行内存分配和处理高负载。然而，<strong>堆大小配置不当，无论是太小还是太大，都可能影响其性能。</strong></p>\\n<p>在本教程中，我们将了解_OutOfMemoryErrors_的原因及其与堆大小的联系。我们还将检查我们可以对这种错误做什么以及如何调查根本原因。</p>\\n<h2>2. -Xmx 和 -Xms</h2>\\n<p>**我们可以使用两个专用的JVM标志来控制堆分配。**第一个，-Xms，帮助我们设置堆的初始和最小大小。另一个，-Xmx，设置最大堆大小。还有其他的标志可以帮助更动态地分配，但总体上它们做类似的工作。</p>","autoDesc":true}');export{c as comp,d as data};
