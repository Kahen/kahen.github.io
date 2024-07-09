import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as n,a as t}from"./app-_uhw5edP.js";const l={},r=t(`<h1 id="java-21-中的代际-zgc-baeldung" tabindex="-1"><a class="header-anchor" href="#java-21-中的代际-zgc-baeldung"><span>Java 21 中的代际 ZGC | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><strong>Java 21 在 2023 年 9 月首次亮相，同时引入了代际 ZGC（Generational Z Garbage Collector）。</strong> 在 Z 垃圾收集器的效率基础上，此更新通过为年轻和老年对象引入不同的代来优化内存管理。</p><p>在本文中，我们将仔细检查这一新增功能，探讨其潜在的好处、工作原理以及如何使用它。</p><h2 id="_2-垃圾收集" tabindex="-1"><a class="header-anchor" href="#_2-垃圾收集"><span>2. 垃圾收集</span></a></h2><p>开始我们的探索之前，让我们深入了解内存管理领域。<strong>垃圾收集是程序尝试释放不再被对象使用的分配内存的过程。</strong> 如果程序的某个部分仍然保持对它的指针，则对象被认为是“在使用中”或“被引用”的。相反，如果程序的任何部分都不再访问的“未使用”或“未被引用”的对象，则可以回收它所占用的内存。</p><p>例如，在 Java 中，垃圾收集器负责释放堆内存，这是 Java 对象存储的地方。</p><p><strong>这有助于防止内存泄漏，并确保高效的资源使用。</strong> 它还解放了我们手动管理程序内存的需要，这可能会导致潜在的错误。一些编程语言，如 Java 或 C#，内置了此功能，而其他语言，如 C 或 C++，则可能依赖于外部库提供类似的功能。</p><h2 id="_3-代际垃圾收集" tabindex="-1"><a class="header-anchor" href="#_3-代际垃圾收集"><span>3. 代际垃圾收集</span></a></h2><p>在内存管理的背景下，<strong>一代指的是根据它们分配的时间对对象进行分类。</strong></p><p>让我们将注意力转向代际垃圾收集。这是一种内存管理策略，通过根据分配时间将对象划分为不同的代，并根据它们的代应用不同的方法。</p><p>在 Java 的背景下，内存被划分为两个主要代：年轻代和老年代。新创建的对象位于年轻代，这里经常进行垃圾收集。在多个垃圾收集周期后仍然存在的对象被提升到老年代。<strong>这种划分通过承认大多数对象的短暂生命周期来优化效率。</strong></p><p>有关 Java 中代际垃圾收集的更多信息，请参见文章“Java 垃圾收集基础”。</p><h2 id="_4-z-垃圾收集器" tabindex="-1"><a class="header-anchor" href="#_4-z-垃圾收集器"><span>4. Z 垃圾收集器</span></a></h2><p>Z 垃圾收集器，也称为 ZGC，是<strong>一种可扩展、低延迟的垃圾收集器。</strong> 它最初在 Java 11 中作为实验性功能引入，并在 Java 15 中成为生产就绪功能。</p><p>此特性的目的是最小化或消除长时间的垃圾收集暂停，从而提高应用程序的响应性，并适应现代系统不断增长的内存容量。</p><p>作为一种非代际方法，它将所有对象存储在一起，不论年龄大小，因此每个周期都会收集所有对象。</p><h2 id="_5-代际-z-垃圾收集器" tabindex="-1"><a class="header-anchor" href="#_5-代际-z-垃圾收集器"><span>5. 代际 Z 垃圾收集器</span></a></h2><p>代际 ZGC <strong>旨在通过为年轻和老年代对象维护单独的代来提高应用程序性能。</strong></p><h3 id="_5-1-动机" tabindex="-1"><a class="header-anchor" href="#_5-1-动机"><span>5.1. 动机</span></a></h3><p><strong>对于大多数用例，ZGC 足以解决与垃圾收集相关的延迟问题。</strong> 只要有足够的资源确保垃圾收集器能够比我们的程序消耗内存更快地回收内存，这种方法就有效。</p><p>然而，弱代际假设指出，大多数对象都是早死的。因此，收集和回收这些短命的年轻资源需要较少的计算资源。这个过程可以更快地解锁更多内存。</p><p>另一方面，收集那些存活了多个周期并且有更长生命周期的老年代对象需要更多的计算资源。然而，通过收集老年代对象解锁的内存量相对较少。这种策略在快速释放内存方面更有效，有助于提高整体应用程序性能。</p><h3 id="_5-2-目标" tabindex="-1"><a class="header-anchor" href="#_5-2-目标"><span>5.2. 目标</span></a></h3><p>与非代际 ZGC 相比，代际 ZGC 旨在提供一些关键的<strong>优势</strong>：</p><ul><li>降低分配停滞的风险</li><li>减少堆内存开销要求</li><li>降低垃圾收集 CPU 开销</li></ul><p>此外，目标是在保留使用非代际方法的现有好处的同时增加这些优势：</p><ul><li>暂停时间低于一毫秒</li><li>支持高达数太字节的堆大小</li><li>最小化手动配置</li></ul><p>为了保持最后一点，新的 GC 不需要手动配置代的大小、使用的线程数量或对象在年轻代中停留的时间。</p><h3 id="_5-3-描述" tabindex="-1"><a class="header-anchor" href="#_5-3-描述"><span>5.3. 描述</span></a></h3><p>代际 ZGC 引入了一个两代堆结构：年轻代用于近期对象，老年代用于长寿命对象。每一代都独立收集，优先考虑年轻对象的频繁收集。</p><p><strong>与非代际 ZGC 类似的并发收集，依赖于彩色指针、加载屏障和存储屏障来获得一致的对象图视图。</strong> 彩色指针包含元数据，有助于高效使用 64 位对象指针。加载屏障解释元数据，而存储屏障处理元数据的添加，维护记忆集，并标记对象为活跃状态。</p><h3 id="_5-4-启用代际-zgc" tabindex="-1"><a class="header-anchor" href="#_5-4-启用代际-zgc"><span>5.4. 启用代际 ZGC</span></a></h3><p>为了平稳过渡，代际 ZGC 将与非代际 ZGC 一起提供。<em>-XX:UseZGC</em> 命令行选项将选择非代际 ZGC。要选择代际 ZGC，我们需要添加 <em>-XX:+ZGenerational</em> 选项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>java -XX:+UseZGC -XX:+ZGenerational ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>代际 ZGC 预计将成为未来 Java 版本中的默认 GC。</strong> 此外，在更晚的版本中，非代际 ZGC 可能会被完全移除。</p><h3 id="_5-5-风险" tabindex="-1"><a class="header-anchor" href="#_5-5-风险"><span>5.5. 风险</span></a></h3><p>新 GC 中的屏障和彩色指针的集成引入了更高的复杂性，超过了其非代际对应物。代际 ZGC 还同时运行两个垃圾收集器。这些收集器并不完全独立，因为它们在某些情况下会交互，增加了实现的复杂性。</p><p>尽管预计在大多数用例中都能表现出色，但<strong>某些工作负载存在轻微性能下降的风险。</strong> 为了解决这个问题，将根据基准测试和用户反馈持续发展和优化代际 ZGC，旨在随着时间的推移解决和减轻这些已识别的风险。</p><h2 id="_6-代际-zgc-设计差异" tabindex="-1"><a class="header-anchor" href="#_6-代际-zgc-设计差异"><span>6. 代际 ZGC 设计差异</span></a></h2><p>代际 ZGC 引入了几个设计差异，与非代际对应物相比，提高了垃圾收集效率和用户适应性。</p><h3 id="_6-1-通过优化屏障提高性能" tabindex="-1"><a class="header-anchor" href="#_6-1-通过优化屏障提高性能"><span>6.1. 通过优化屏障提高性能</span></a></h3><p>代际 ZGC 放弃了多映射内存，转而使用加载和存储屏障中的显式代码。为了适应存储屏障和修订的加载屏障责任，代际 ZGC 使用了高度优化的屏障代码。利用快速路径和慢速路径等技术，优化的屏障<strong>确保了应用程序即使在高负载下也能实现最大吞吐量和性能。</strong></p><h3 id="_6-2-高效的代际间指针跟踪" tabindex="-1"><a class="header-anchor" href="#_6-2-高效的代际间指针跟踪"><span>6.2. 高效的代际间指针跟踪</span></a></h3><p>双缓冲记忆集 —— 为每个老年代区域成对组织 —— 使用位图有效跟踪代际间指针。这种设计选择<strong>促进了应用程序和垃圾收集线程的并发工作</strong>，无需额外的内存屏障，<strong>从而实现更流畅的执行。</strong></p><h3 id="_6-3-优化年轻代收集" tabindex="-1"><a class="header-anchor" href="#_6-3-优化年轻代收集"><span>6.3. 优化年轻代收集</span></a></h3><p>通过分析年轻代区域的密度，代际 ZGC 选择性地疏散区域，减少了年轻代收集所需的工作量。这种优化有助于更快、更有效地进行垃圾收集周期，<strong>提高了应用程序的响应性。</strong></p><h3 id="_6-4-大对象的灵活处理" tabindex="-1"><a class="header-anchor" href="#_6-4-大对象的灵活处理"><span>6.4. 大对象的灵活处理</span></a></h3><p>代际 ZGC 引入了<strong>对大对象处理的灵活性</strong>，允许将它们分配到年轻代。这消除了预先分配到老年代的需要，提高了内存效率。现在，如果大对象是短命的，可以在年轻代中收集，或者如果长命的，则有效地提升到老年代。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>正如我们在整个文章中学到的，Java 21 带来了一个强大的特性，即代际 ZGC。在仔细考虑潜在风险并致力于基于用户反馈的持续改进的基础上，<strong>预计它将提供增强的效率和响应性</strong>，使其成为 Java 不断发展生态系统中的宝贵补充。</p>`,51),s=[r];function i(o,p){return n(),e("div",null,s)}const d=a(l,[["render",i],["__file","2024-06-24-Generational ZGC in Java 21.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Generational%20ZGC%20in%20Java%2021.html","title":"Java 21 中的代际 ZGC | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Java","垃圾收集器"],"tag":["Java 21","Generational ZGC"],"head":[["meta",{"name":"keywords","content":"Java 21, Generational ZGC, 垃圾收集, 内存管理"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Generational%20ZGC%20in%20Java%2021.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 21 中的代际 ZGC | Baeldung"}],["meta",{"property":"og:description","content":"Java 21 中的代际 ZGC | Baeldung 1. 概述 Java 21 在 2023 年 9 月首次亮相，同时引入了代际 ZGC（Generational Z Garbage Collector）。 在 Z 垃圾收集器的效率基础上，此更新通过为年轻和老年对象引入不同的代来优化内存管理。 在本文中，我们将仔细检查这一新增功能，探讨其潜在的好处..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T18:33:35.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 21"}],["meta",{"property":"article:tag","content":"Generational ZGC"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T18:33:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 21 中的代际 ZGC | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T18:33:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 21 中的代际 ZGC | Baeldung 1. 概述 Java 21 在 2023 年 9 月首次亮相，同时引入了代际 ZGC（Generational Z Garbage Collector）。 在 Z 垃圾收集器的效率基础上，此更新通过为年轻和老年对象引入不同的代来优化内存管理。 在本文中，我们将仔细检查这一新增功能，探讨其潜在的好处..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 垃圾收集","slug":"_2-垃圾收集","link":"#_2-垃圾收集","children":[]},{"level":2,"title":"3. 代际垃圾收集","slug":"_3-代际垃圾收集","link":"#_3-代际垃圾收集","children":[]},{"level":2,"title":"4. Z 垃圾收集器","slug":"_4-z-垃圾收集器","link":"#_4-z-垃圾收集器","children":[]},{"level":2,"title":"5. 代际 Z 垃圾收集器","slug":"_5-代际-z-垃圾收集器","link":"#_5-代际-z-垃圾收集器","children":[{"level":3,"title":"5.1. 动机","slug":"_5-1-动机","link":"#_5-1-动机","children":[]},{"level":3,"title":"5.2. 目标","slug":"_5-2-目标","link":"#_5-2-目标","children":[]},{"level":3,"title":"5.3. 描述","slug":"_5-3-描述","link":"#_5-3-描述","children":[]},{"level":3,"title":"5.4. 启用代际 ZGC","slug":"_5-4-启用代际-zgc","link":"#_5-4-启用代际-zgc","children":[]},{"level":3,"title":"5.5. 风险","slug":"_5-5-风险","link":"#_5-5-风险","children":[]}]},{"level":2,"title":"6. 代际 ZGC 设计差异","slug":"_6-代际-zgc-设计差异","link":"#_6-代际-zgc-设计差异","children":[{"level":3,"title":"6.1. 通过优化屏障提高性能","slug":"_6-1-通过优化屏障提高性能","link":"#_6-1-通过优化屏障提高性能","children":[]},{"level":3,"title":"6.2. 高效的代际间指针跟踪","slug":"_6-2-高效的代际间指针跟踪","link":"#_6-2-高效的代际间指针跟踪","children":[]},{"level":3,"title":"6.3. 优化年轻代收集","slug":"_6-3-优化年轻代收集","link":"#_6-3-优化年轻代收集","children":[]},{"level":3,"title":"6.4. 大对象的灵活处理","slug":"_6-4-大对象的灵活处理","link":"#_6-4-大对象的灵活处理","children":[]}]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719254015000,"updatedTime":1719254015000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7,"words":2099},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Generational ZGC in Java 21.md","localizedDate":"2024年6月25日","excerpt":"\\n<h2>1. 概述</h2>\\n<p><strong>Java 21 在 2023 年 9 月首次亮相，同时引入了代际 ZGC（Generational Z Garbage Collector）。</strong> 在 Z 垃圾收集器的效率基础上，此更新通过为年轻和老年对象引入不同的代来优化内存管理。</p>\\n<p>在本文中，我们将仔细检查这一新增功能，探讨其潜在的好处、工作原理以及如何使用它。</p>\\n<h2>2. 垃圾收集</h2>\\n<p>开始我们的探索之前，让我们深入了解内存管理领域。<strong>垃圾收集是程序尝试释放不再被对象使用的分配内存的过程。</strong> 如果程序的某个部分仍然保持对它的指针，则对象被认为是“在使用中”或“被引用”的。相反，如果程序的任何部分都不再访问的“未使用”或“未被引用”的对象，则可以回收它所占用的内存。</p>","autoDesc":true}');export{d as comp,g as data};
