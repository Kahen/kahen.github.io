import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as r}from"./app-DpYLEM_u.js";const n={},p=r('<h1 id="java-20-新特性概览" tabindex="-1"><a class="header-anchor" href="#java-20-新特性概览"><span>Java 20 新特性概览</span></a></h1><p>Java 20，于2023年3月21日发布，是迄今为止在Java 19基础上构建的最新短期增量发布。它包括JEP 2.0中提到的七个重要的JDK增强提案（JEPs）。JEP流程用于评估对JDK增强的提案。Java 20中的大多数更新是对早期版本中引入的功能的改进或增强。</p><p>此外，Oracle JDK 20不是长期支持版本。因此，它将在Java 21发布之前接收更新。</p><p>在本文中，我们将探讨这些新特性。## 2. Scoped Values (JEP 429)</p><p>Java应用程序中有大量的组件或模块需要在它们之间共享数据。通常，这些模块是基于线程的，因此我们必须保护它们共享的数据不受任何更改的影响。</p><p>我们一直在使用_ThreadLocal_类型的变量来允许组件共享数据。</p><p>但这有一些后果：</p><ul><li>_ThreadLocal_变量是可变的。<em>ThreadLocal</em> API允许访问其变量类型的_get()_和_set()_方法。</li><li>我们可能会遇到内存泄漏问题，因为_ThreadLocal_变量的值会一直保留，直到我们显式调用_remove()_方法或线程退出。因此，这些每个线程的变量没有绑定到它们的生命周期。</li><li>如果使用大量的线程，它们可能会导致内存占用过大。这是因为子线程可以继承父线程的_ThreadLocal_变量，从而为每个_ThreadLocal_变量分配内存。</li></ul><p>为了克服_ThreadLocal_变量的问题，Java 20引入了在线程内和跨线程共享数据的scoped values。</p><p><strong>Scoped values提供了一种简单、不可变且可继承的数据共享选项，特别是在我们使用大量线程的情况下。</strong></p><p>_ScopedValue_是一个不可变的值，它在线程执行的有限期间内可供读取。由于它是不可变的，它允许在有限的线程执行期间安全且容易地共享数据。此外，我们不需要将值作为方法参数传递。</p><p><strong>我们可以使用类_ScopedValue_的_where()_方法来为线程执行的有限期间设置变量的值。此外，一旦我们使用_get()_方法获取了数据，就不能再访问它了。</strong></p><p>一旦线程的_run()_方法完成执行，scoped value就会恢复到未绑定状态。我们可以使用_get()_方法在线程内读取scoped-value变量的值。</p><h2 id="_3-record-patterns-jep-432" tabindex="-1"><a class="header-anchor" href="#_3-record-patterns-jep-432"><span>3. Record Patterns (JEP 432)</span></a></h2><p>JDK 19已经作为预览功能引入了Record Patterns。</p><p>Java 20提供了改进和完善的记录模式版本。让我们看看这个版本中的一些改进：</p><ul><li>增加了对泛型记录模式参数的类型推断支持。</li><li><strong>增加了在增强的_for_循环的头部使用记录模式的支持。</strong></li><li>移除了命名记录模式的支持，我们可以使用可选的标识符来引用记录模式。</li></ul><p>这个版本本质上旨在在不改变类型模式的语法或语义的情况下，通过模式匹配表达更改进的、可组合的数据查询。</p><h2 id="_4-pattern-matching-for-switch-jep-433" tabindex="-1"><a class="header-anchor" href="#_4-pattern-matching-for-switch-jep-433"><span>4. Pattern Matching for Switch (JEP 433)</span></a></h2><p>Java 20为_switch_表达式和语句提供了模式匹配的改进版本，特别是关于_switch_表达式中使用的语法。它最初在Java 17中提供，随后在Java 18和19中进行了一些改进，从而扩大了_switch_语句和表达式的可用性和适用性。</p><p>这个版本的主要变化包括：</p><ul><li>使用_switch_表达式或模式对枚举类现在会抛出_MatchException_。以前，如果我们在运行时没有应用_switch_标签，我们会得到_IncompatibleClassChangeError_。</li><li>_switch_标签的语法有所改进。</li><li>他们增加了对_switch_表达式和语句中泛型记录模式参数的类型推断支持，以及其他支持模式的结构。</li></ul><h2 id="_5-foreign-function-and-memory-api-jep-434" tabindex="-1"><a class="header-anchor" href="#_5-foreign-function-and-memory-api-jep-434"><span>5. Foreign Function and Memory API (JEP 434)</span></a></h2><p>Java 20包含了在以前Java版本中引入的Foreign Function and Memory (FFM) API的改进和完善。这是第二个预览API。</p><p><strong>Foreign Function and Memory API允许Java开发人员访问JVM之外的代码，并管理堆外内存（即不受JVM管理的内存）。</strong> FFM API旨在提供一个安全、改进和纯Java基础的Java Native Interface (JNI)替代品。</p><p>它包括以下改进：</p><ul><li>_MemorySegment_和_MemoryAddress_的抽象被统一。这意味着我们实际上可以从其空间界限确定与段关联的内存地址范围。</li><li>他们还通过增强密封的_MemoryLayout_层次结构，促进了在_switch_表达式和语句中使用模式匹配。</li><li>此外，他们将_MemorySession_拆分为_Arena_和_SegmentScope_，以便于跨维护边界共享段。</li></ul><h2 id="_6-virtual-threads-jep-436" tabindex="-1"><a class="header-anchor" href="#_6-virtual-threads-jep-436"><span>6. Virtual Threads (JEP 436)</span></a></h2><p>虚拟线程最初在JEP 425中作为预览功能提出，并在Java 19中提供。Java 20提出了第二个预览，目的是在使用后收集更多的反馈和改进建议。</p><p>虚拟线程是轻量级线程，减少了编写、维护和观察高吞吐量并发应用程序的工作量。因此，它使使用现有的JDK工具调试和排除服务器应用程序变得容易。这可能在服务器应用程序的扩展中很有用。</p><p>然而，我们应该注意，传统的_Thread_实现仍然存在，它并不旨在取代Java的基本并发模型。</p><p>以下是自第一次预览以来的一些较小变化：</p><ul><li>他们使Thread中先前引入的方法——<em>join(Duration)</em>、_sleep(Duration)<em>和_threadId()</em>——在Java 20中变为永久性的。</li><li>类似地，Future中新引入的方法用于检查任务状态和结果——_state()<em>和_resultNow()</em>——在Java 20中变为永久性的。</li><li>此外，<em>ExecutorService_现在扩展了_AutoCloseable</em>。</li><li>在JDK 19中对线程分组的遗留API_ThreadGroup_的降级，在JEP 425中被描述为永久性的。_ThreadGroup_不适合用于虚拟线程的分组。</li></ul><h2 id="_7-structured-concurrency-jep-437" tabindex="-1"><a class="header-anchor" href="#_7-structured-concurrency-jep-437"><span>7. Structured Concurrency (JEP 437)</span></a></h2><p>Structured Concurrency是由JEP 428提出的，并在JDK 19中作为孵化API提供。这个JEP提议在JDK 20中重新孵化API，没有太多变化。因此，它允许更多的反馈时间。</p><p>目标是通过引入结构化并发的API来简化多线程编程。它通过将执行类似任务的多个线程分组为一个工作单元来提高可靠性。结果，错误处理和线程取消得到了改进。此外，它促进了一种改进的并发编程方式，旨在保护免受线程取消引起的常见风险。</p><p>然而，在这个重新孵化的API中有一个变化。<strong>我们得到了一个更新的_StructuredTaskScope_，它支持在任务范围内创建的线程继承scoped values。</strong> 因此，我们现在可以方便地在多个线程之间共享不可变数据。</p><h2 id="_8-vector-api-jep-438" tabindex="-1"><a class="header-anchor" href="#_8-vector-api-jep-438"><span>8. Vector API (JEP 438)</span></a></h2><p>Vector API最初由JEP 338提出，并作为孵化API集成到JDK 16中。这个版本（第五个孵化器）是对所有以前Java版本中的多轮孵化和集成的后续。</p><p>Vector API用于在支持的CPU架构上在Java中表达向量计算。向量计算实际上是对向量的一系列操作序列。Vector API旨在提供一种比传统标量计算更优化的向量计算方式。</p><p>这个版本与Java 19相比没有引入任何API变化。然而，它包括一些错误修复和性能增强。</p><p>最后，<strong>Vector API的开发与Project Valhalla紧密对齐，因为它旨在适应Project Valhalla未来的增强。</strong></p><h2 id="_9-结论" tabindex="-1"><a class="header-anchor" href="#_9-结论"><span>9. 结论</span></a></h2><p>Java 20在包括记录模式、_switch_表达式的模式匹配、FFM、虚拟线程等过去版本的多个功能上进行了增量构建。<strong>它还增加了像scoped values这样的新孵化功能，以及像结构化并发和Vector API这样的重新孵化功能的一些增强。</strong></p><p>在本文中，我们讨论了作为增量Java 20发布的一部分引入的一些功能和变化。Java 20的完整更改列表在JDK发布说明中。</p><p>OK</p>',46),o=[p];function i(c,l){return t(),a("div",null,o)}const d=e(n,[["render",i],["__file","2024-07-03-New Features in Java 20.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-New%20Features%20in%20Java%2020.html","title":"Java 20 新特性概览","lang":"zh-CN","frontmatter":{"date":"2024-07-03T00:00:00.000Z","category":["Java","编程"],"tag":["Java 20","新特性"],"head":[["meta",{"name":"keywords","content":"Java 20, 新特性, JDK, 编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-New%20Features%20in%20Java%2020.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 20 新特性概览"}],["meta",{"property":"og:description","content":"Java 20 新特性概览 Java 20，于2023年3月21日发布，是迄今为止在Java 19基础上构建的最新短期增量发布。它包括JEP 2.0中提到的七个重要的JDK增强提案（JEPs）。JEP流程用于评估对JDK增强的提案。Java 20中的大多数更新是对早期版本中引入的功能的改进或增强。 此外，Oracle JDK 20不是长期支持版本。因此..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T04:54:46.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 20"}],["meta",{"property":"article:tag","content":"新特性"}],["meta",{"property":"article:published_time","content":"2024-07-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T04:54:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 20 新特性概览\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-03T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T04:54:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 20 新特性概览 Java 20，于2023年3月21日发布，是迄今为止在Java 19基础上构建的最新短期增量发布。它包括JEP 2.0中提到的七个重要的JDK增强提案（JEPs）。JEP流程用于评估对JDK增强的提案。Java 20中的大多数更新是对早期版本中引入的功能的改进或增强。 此外，Oracle JDK 20不是长期支持版本。因此..."},"headers":[{"level":2,"title":"3. Record Patterns (JEP 432)","slug":"_3-record-patterns-jep-432","link":"#_3-record-patterns-jep-432","children":[]},{"level":2,"title":"4. Pattern Matching for Switch (JEP 433)","slug":"_4-pattern-matching-for-switch-jep-433","link":"#_4-pattern-matching-for-switch-jep-433","children":[]},{"level":2,"title":"5. Foreign Function and Memory API (JEP 434)","slug":"_5-foreign-function-and-memory-api-jep-434","link":"#_5-foreign-function-and-memory-api-jep-434","children":[]},{"level":2,"title":"6. Virtual Threads (JEP 436)","slug":"_6-virtual-threads-jep-436","link":"#_6-virtual-threads-jep-436","children":[]},{"level":2,"title":"7. Structured Concurrency (JEP 437)","slug":"_7-structured-concurrency-jep-437","link":"#_7-structured-concurrency-jep-437","children":[]},{"level":2,"title":"8. Vector API (JEP 438)","slug":"_8-vector-api-jep-438","link":"#_8-vector-api-jep-438","children":[]},{"level":2,"title":"9. 结论","slug":"_9-结论","link":"#_9-结论","children":[]}],"git":{"createdTime":1719982486000,"updatedTime":1719982486000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.92,"words":2077},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-New Features in Java 20.md","localizedDate":"2024年7月3日","excerpt":"\\n<p>Java 20，于2023年3月21日发布，是迄今为止在Java 19基础上构建的最新短期增量发布。它包括JEP 2.0中提到的七个重要的JDK增强提案（JEPs）。JEP流程用于评估对JDK增强的提案。Java 20中的大多数更新是对早期版本中引入的功能的改进或增强。</p>\\n<p>此外，Oracle JDK 20不是长期支持版本。因此，它将在Java 21发布之前接收更新。</p>\\n<p>在本文中，我们将探讨这些新特性。## 2. Scoped Values (JEP 429)</p>\\n<p>Java应用程序中有大量的组件或模块需要在它们之间共享数据。通常，这些模块是基于线程的，因此我们必须保护它们共享的数据不受任何更改的影响。</p>","autoDesc":true}');export{d as comp,h as data};
