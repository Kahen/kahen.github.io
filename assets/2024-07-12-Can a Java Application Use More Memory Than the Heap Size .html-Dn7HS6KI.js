import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as n,a as e}from"./app-DpYLEM_u.js";const p={},t=e('<h1 id="java应用程序可以使用超过堆大小的内存吗-baeldung" tabindex="-1"><a class="header-anchor" href="#java应用程序可以使用超过堆大小的内存吗-baeldung"><span>Java应用程序可以使用超过堆大小的内存吗？ | Baeldung</span></a></h1><p>Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK中的CRaC（检查点时协调恢复）项目可以通过创建应用程序的峰值性能检查点并恢复JVM实例到该点来帮助改善这些问题。</p><p>为了充分利用这一特性，BellSoft提供了为Java应用程序高度优化的容器。这些容器打包了Alpaquita Linux（一个为Java和云环境优化的全功能操作系统）和Liberica JDK（基于OpenJDK的开源Java运行时）。</p><p>这些现成的映像使我们能够轻松地在Spring Boot应用程序中集成CRaC：</p><p><strong>使用CRaC支持提高Java应用程序性能</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>我们可能都注意到，在内存消耗方面，我们的Java应用程序的内存使用并不遵循我们基于-Xmx（最大堆大小）选项的严格指令。实际上，JVM不仅仅有堆这一个内存区域。</p><p>为了限制总内存使用，还有一些额外的内存设置需要注意，让我们从Java应用程序的内存结构和内存分配的来源开始。</p><h2 id="_2-java进程的内存结构" tabindex="-1"><a class="header-anchor" href="#_2-java进程的内存结构"><span>2. Java进程的内存结构</span></a></h2><p>Java虚拟机（JVM）的内存分为两个主要类别：堆和非堆。</p><p>堆内存是JVM内存中最知名的部分。它存储由应用程序创建的对象。JVM在启动时初始化堆。当应用程序创建新的对象实例时，该对象驻留在堆中，直到应用程序释放该实例。然后，垃圾收集器（GC）释放实例持有的内存。因此，堆大小根据负载变化，尽管我们可以使用-Xmx选项配置JVM的最大堆大小。</p><p>非堆内存构成了其余部分。它允许我们的应用程序使用超过配置的堆大小的内存。JVM的非堆内存被划分为几个不同的区域。像JVM代码和内部结构、加载的分析代理代码、每个类的常量池结构、字段和方法的元数据以及方法和构造函数的代码，以及保留的字符串等数据都被归类为非堆内存。</p><p>值得一提的是，我们可以使用-XX选项调整非堆内存的某些区域，如-XX:MaxMetaspaceSize（在Java 7及更早版本中等同于-XX:MaxPermSize）。我们将在本教程中看到更多的标志。</p><p>除了JVM本身，还有其他区域的Java进程消耗内存。例如，堆外技术通常使用直接ByteBuffer来处理大内存，并将其保持在GC的控制之外。另一个来源是本地库使用的内存。</p><h2 id="_3-jvm的非堆内存区域" tabindex="-1"><a class="header-anchor" href="#_3-jvm的非堆内存区域"><span>3. JVM的非堆内存区域</span></a></h2><p>让我们继续了解JVM的非堆内存区域。</p><h3 id="_3-1-metaspace" tabindex="-1"><a class="header-anchor" href="#_3-1-metaspace"><span>3.1. Metaspace</span></a></h3><p>Metaspace是一个本地内存区域，用于存储类的元数据。当一个类被加载时，JVM将类的元数据，即其运行时表示，分配到Metaspace中。每当类加载器及其所有类从堆中移除时，它们在Metaspace中的分配可以被认为是由GC释放了。</p><p><strong>然而，释放的Metaspace并不一定返回给操作系统。</strong> JVM可能会保留全部或部分内存，以便将来类加载时重用。</p><p>在Java 8之前的版本中，Metaspace被称为永久代（PermGen）。然而，与位于堆内存区域的Metaspace不同，PermGen位于一个特殊的堆区域。</p><h3 id="_3-2-代码缓存" tabindex="-1"><a class="header-anchor" href="#_3-2-代码缓存"><span>3.2. 代码缓存</span></a></h3><p>即时编译器（JIT）将其输出存储在代码缓存区域。JIT编译器将字节码编译为频繁执行的部分的本地代码，即热点。分层编译是在Java 7中引入的，它通过客户端编译器（C1）编译带有仪器的代码，然后服务器端编译器（C2）使用分析数据以优化方式编译代码。</p><p>分层编译的目标是混合使用C1和C2编译器，以实现快速启动时间和良好的长期性能。分层编译通过最多四倍增加需要在内存中缓存的代码量。从Java 8开始，默认情况下启用了JIT的分层编译，尽管我们仍然可以禁用分层编译。</p><h3 id="_3-3-线程" tabindex="-1"><a class="header-anchor" href="#_3-3-线程"><span>3.3. 线程</span></a></h3><p>线程栈包含每个执行方法的所有局部变量以及线程调用以到达当前执行点的方法。线程栈只能由创建它的线程访问。</p><p>从理论上讲，由于线程栈内存是运行线程数量的函数，并且线程数量没有限制，线程区域是无界的，可以占用大量的内存。实际上，操作系统限制了线程的数量，并且JVM根据平台为每个线程的栈内存大小设置了默认值。</p><h3 id="_3-4-垃圾收集" tabindex="-1"><a class="header-anchor" href="#_3-4-垃圾收集"><span>3.4. 垃圾收集</span></a></h3><p>JVM提供了一组GC算法，我们可以根据应用程序的用例选择使用。无论我们使用哪种算法，都会为GC进程分配一定量的本地内存，但使用的内存量会根据使用的垃圾收集器而变化。</p><h3 id="_3-5-符号" tabindex="-1"><a class="header-anchor" href="#_3-5-符号"><span>3.5. 符号</span></a></h3><p>JVM使用符号区域存储诸如字段名称、方法签名和保留的字符串等符号。在Java开发工具包（JDK）中，<strong>符号存储在三个不同的表中</strong>：</p><ul><li>系统字典包含所有加载的类型信息，如Java类。</li><li>常量池使用符号表数据结构保存类、方法、字段和可枚举类型的加载符号。JVM维护一个称为运行时常量池的每个类型常量池，其中包含从编译时常量到运行时方法甚至字段引用的各种常量。</li><li>字符串表包含对所有常量字符串的引用，也称为保留字符串。</li></ul><p>要了解字符串表，我们需要更多地了解字符串池。字符串池是JVM优化分配给_String_的内存量的机制，通过在池中仅存储每个文字_String_的一个副本，通过称为保留的过程。字符串池有两个部分：</p><ul><li>保留字符串的内容作为常规_String_对象生活在Java堆中。</li><li>哈希表，即所谓的字符串表，被分配在堆外，并包含对保留字符串的引用。</li></ul><p>换句话说，字符串池既有堆内部分也有堆外部分。堆外部分是字符串表。尽管它通常较小，但当我们有更多保留的字符串时，它仍然可能占用大量的额外内存。</p><h3 id="_3-6-arena" tabindex="-1"><a class="header-anchor" href="#_3-6-arena"><span>3.6. Arena</span></a></h3><p>Arena是JVM自己的基于Arena的内存管理实现，与glibc的Arena内存管理不同。它被JVM的一些子系统使用，如编译器和符号，或者当本地代码使用依赖于JVM Arenas的内部对象时。</p><h3 id="_3-7-其他" tabindex="-1"><a class="header-anchor" href="#_3-7-其他"><span>3.7. 其他</span></a></h3><p>所有其他无法归入本地内存区域的内存使用都归入这一部分。例如，《DirectByteBuffer》的使用在这里间接可见。</p><p>现在我们已经发现Java内存使用不仅仅局限于堆，我们将研究跟踪总内存使用的方法。发现可以通过使用随JDK提供的分析和内存监视工具来完成，然后，我们可以使用一些特定的调整来调整总使用量。</p><p>让们快速查看一下我们可以用于JVM内存监视的工具：</p><ul><li><em>jmap_是一个命令行实用程序，用于打印运行中的VM或核心文件的内存映射。我们可以使用_jmap_来查询远程机器上的进程。然而，在JDK8引入_jcmd_之后，建议使用_jcmd_而不是_jmap</em>，以增强诊断并减少性能开销。</li><li>_jcmd_用于向JVM发送诊断命令请求，这些请求对于控制Java飞行记录、故障排除和诊断JVM和Java应用程序非常有用。<strong>_jcmd_不适用于远程进程</strong>。我们将在本文中看到一些_jcmd_的特定用法。</li><li><em>jhat_通过启动本地web服务器来可视化堆转储文件。有几种方法可以创建堆转储，比如使用_jmap -dump_或_jcmd GC.heap_dump filename</em>。</li><li>_hprof_能够展示CPU使用情况、堆分配统计和监视争用配置文件。根据请求的分析类型，_hprof_指示虚拟机收集相关的JVM工具接口（JVM TI）事件，并将事件数据处理成分析信息。</li></ul><p>除了JVM附带的工具外，还有特定于操作系统的命令来检查进程的内存。_pmap_是Linux发行版中可用的工具，它提供了Java进程使用的内存的完整视图。</p><h2 id="_5-本地内存跟踪" tabindex="-1"><a class="header-anchor" href="#_5-本地内存跟踪"><span>5. 本地内存跟踪</span></a></h2><p>本地内存跟踪（NMT）是我们可以用来跟踪VM内部内存使用情况的JVM特性。NMT不跟踪所有本地内存使用情况，如第三方本地代码内存分配，但对于大量典型应用程序来说已经足够了。</p><p>要开始使用NMT，我们必须为我们的应用程序启用它：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-XX:NativeMemoryTracking</span><span class="token operator">=</span>summary <span class="token parameter variable">-jar</span> app.jar\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>-XX:NativeMemoryTracking_的其他可用值是_off_和_detail</em>。请注意，启用NMT会有开销成本，这将影响性能。此外，NMT在所有malloced内存上添加了两个机器字作为malloc头。</p><p>然后我们可以使用_jps_或不带参数的_jcmd_来找到我们应用程序的进程ID（pid）：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>jcmd\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在我们找到应用程序的pid之后，我们可以继续使用_jcmd_，它提供了一长串选项来监视。让我们请求_jcmd_帮助查看可用选项：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>jcmd ```````<span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span><span class="token variable">`</span></span>``````` <span class="token builtin class-name">help</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从输出中，我们可以看到_jcmd_支持不同的类别，如编译器、GC、JFR、JVMTI、ManagementAgent和VM。一些选项，如_VM.metaspace_、_VM.native_memory_可以帮助我们进行内存跟踪。让我们探索其中的一些。</p><h3 id="_5-1-本地内存摘要报告" tabindex="-1"><a class="header-anchor" href="#_5-1-本地内存摘要报告"><span>5.1. 本地内存摘要报告</span></a></h3><p>最方便的是_VM.native_memory_。我们可以使用它来查看应用程序VM内部本地内存使用的摘要：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>jcmd ```````<span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span><span class="token variable">`</span></span>``````` VM.native_memory summary\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>```````<span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span><span class="token variable">`</span></span>```````:\nNative Memory Tracking:\n\nTotal: <span class="token assign-left variable">reserved</span><span class="token operator">=</span>1779287KB, <span class="token assign-left variable">committed</span><span class="token operator">=</span>503683KB\n- Java Heap <span class="token punctuation">(</span>reserved<span class="token operator">=</span>307200KB, <span class="token assign-left variable">committed</span><span class="token operator">=</span>307200KB<span class="token punctuation">)</span>\n  <span class="token punctuation">..</span>.\n- Class <span class="token punctuation">(</span>reserved<span class="token operator">=</span>1089000KB, <span class="token assign-left variable">committed</span><span class="token operator">=</span>44824KB<span class="token punctuation">)</span>\n  <span class="token punctuation">..</span>.\n- Thread <span class="token punctuation">(</span>reserved<span class="token operator">=</span>41139KB, <span class="token assign-left variable">committed</span><span class="token operator">=</span>41139KB<span class="token punctuation">)</span>\n  <span class="token punctuation">..</span>.\n- Code <span class="token punctuation">(</span>reserved<span class="token operator">=</span>248600KB, <span class="token assign-left variable">committed</span><span class="token operator">=</span>17172KB<span class="token punctuation">)</span>\n  <span class="token punctuation">..</span>.\n- GC <span class="token punctuation">(</span>reserved<span class="token operator">=</span>62198KB, <span class="token assign-left variable">committed</span><span class="token operator">=</span>62198KB<span class="token punctuation">)</span>\n  <span class="token punctuation">..</span>.\n- Compiler <span class="token punctuation">(</span>reserved<span class="token operator">=</span>175KB, <span class="token assign-left variable">committed</span><span class="token operator">=</span>175KB<span class="token punctuation">)</span>\n  <span class="token punctuation">..</span>.\n- Internal <span class="token punctuation">(</span>reserved<span class="token operator">=</span>691KB, <span class="token assign-left variable">committed</span><span class="token operator">=</span>691KB<span class="token punctuation">)</span>\n  <span class="token punctuation">..</span>.\n- Other <span class="token punctuation">(</span>reserved<span class="token operator">=</span>16KB, <span class="token assign-left variable">committed</span><span class="token operator">=</span>16KB<span class="token punctuation">)</span>\n  <span class="token punctuation">..</span>.\n- Symbol <span class="token punctuation">(</span>reserved<span class="token operator">=</span>9704KB, <span class="token assign-left variable">committed</span><span class="token operator">=</span>9704KB<span class="token punctuation">)</span>\n  <span class="token punctuation">..</span>.\n- Native Memory Tracking <span class="token punctuation">(</span>reserved<span class="token operator">=</span>4812KB, <span class="token assign-left variable">committed</span><span class="token operator">=</span>4812KB<span class="token punctuation">)</span>\n  <span class="token punctuation">..</span>.\n- Shared class space <span class="token punctuation">(</span>reserved<span class="token operator">=</span>11136KB, <span class="token assign-left variable">committed</span><span class="token operator">=</span>11136KB<span class="token punctuation">)</span>\n  <span class="token punctuation">..</span>.\n- Arena Chunk <span class="token punctuation">(</span>reserved<span class="token operator">=</span>176KB, <span class="token assign-left variable">committed</span><span class="token operator">=</span>176KB<span class="token punctuation">)</span>\n  <span class="token punctuation">..</span>.\n- Logging <span class="token punctuation">(</span>reserved<span class="token operator">=</span>4KB, <span class="token assign-left variable">committed</span><span class="token operator">=</span>4KB<span class="token punctuation">)</span>\n  <span class="token punctuation">..</span>.\n- Arguments <span class="token punctuation">(</span>reserved<span class="token operator">=</span>18KB, <span class="token assign-left variable">committed</span><span class="token operator">=</span>18KB<span class="token punctuation">)</span>\n  <span class="token punctuation">..</span>.\n- Module <span class="token punctuation">(</span>reserved<span class="token operator">=</span>175KB, <span class="token assign-left variable">committed</span><span class="token operator">=</span>175KB<span class="token punctuation">)</span>\n  <span class="token punctuation">..</span>.\n- Safepoint <span class="token punctuation">(</span>reserved<span class="token operator">=</span>8KB, <span class="token assign-left variable">committed</span><span class="token operator">=</span>8KB<span class="token punctuation">)</span>\n  <span class="token punctuation">..</span>.\n- Synchronization <span class="token punctuation">(</span>reserved<span class="token operator">=</span>4235KB, <span class="token assign-left variable">committed</span><span class="token operator">=</span>4235KB<span class="token punctuation">)</span>\n  <span class="token punctuation">..</span>.\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从输出中，我们可以看到JVM内存区域的摘要，如Java堆、GC和线程。“reserved”内存意味着通过_malloc_或_mmap_预先映射的总地址范围，因此这是该区域的最大可寻址内存。“committed”意味着正在积极使用的内存。</p><p>在这里，我们可以找到输出的详细解释。要查看内存使用的变化，我们可以使用_VM.native_memory baseline_和_VM.native_memory summary.diff_依次。</p><h3 id="_5-2-metaspace和字符串表报告" tabindex="-1"><a class="header-anchor" href="#_5-2-metaspace和字符串表报告"><span>5.2. Metaspace和字符串表报告</span></a></h3><p>我们可以尝试其他VM选项的_jcmd_，以了解本地内存的特定区域的概述，如Metaspace、符号和保留的字符串。</p><p>让我们尝试Metaspace：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>jcmd ```````<span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span><span class="token variable">`</span></span>``````` VM.metaspace\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们的输出看起来像这样：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>```````<span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span><span class="token variable">`</span></span>```````:\nTotal Usage - <span class="token number">1072</span> loaders, <span class="token number">9474</span> classes <span class="token punctuation">(</span><span class="token number">1176</span> shared<span class="token punctuation">)</span>:\n<span class="token punctuation">..</span>.\nVirtual space:\n  Non-class space:       <span class="token number">38.00</span> MB reserved,      <span class="token number">36.67</span> MB <span class="token punctuation">(</span> <span class="token number">97</span>%<span class="token punctuation">)</span> committed\n      Class space:        <span class="token number">1.00</span> GB reserved,       <span class="token number">5.62</span> MB <span class="token punctuation">(</span> <span class="token operator">&lt;</span><span class="token number">1</span>%<span class="token punctuation">)</span> committed\n             Both:        <span class="token number">1.04</span> GB reserved,      <span class="token number">42.30</span> MB <span class="token punctuation">(</span>  <span class="token number">4</span>%<span class="token punctuation">)</span> committed\nChunk freelists:\n   Non-Class: <span class="token punctuation">..</span>.\n       Class: <span class="token punctuation">..</span>.\nWaste <span class="token punctuation">(</span>percentages refer to total committed size <span class="token number">42.30</span> MB<span class="token punctuation">)</span>:\n              Committed unused:    <span class="token number">192.00</span> KB <span class="token punctuation">(</span> <span class="token operator">&lt;</span><span class="token number">1</span>%<span class="token punctuation">)</span>\n        Waste <span class="token keyword">in</span> chunks <span class="token keyword">in</span> use:      <span class="token number">2.98</span> KB <span class="token punctuation">(</span> <span class="token operator">&lt;</span><span class="token number">1</span>%<span class="token punctuation">)</span>\n         Free <span class="token keyword">in</span> chunks <span class="token keyword">in</span> use:      <span class="token number">1.05</span> MB <span class="token punctuation">(</span>  <span class="token number">2</span>%<span class="token punctuation">)</span>\n     Overhead <span class="token keyword">in</span> chunks <span class="token keyword">in</span> use:    <span class="token number">232.12</span> KB <span class="token punctuation">(</span> <span class="token operator">&lt;</span><span class="token number">1</span>%<span class="token punctuation">)</span>\n                In <span class="token function">free</span> chunks:     <span class="token number">77.00</span> KB <span class="token punctuation">(</span> <span class="token operator">&lt;</span><span class="token number">1</span>%<span class="token punctuation">)</span>\nDeallocated from chunks <span class="token keyword">in</span> use:    <span class="token number">191.62</span> KB <span class="token punctuation">(</span> <span class="token operator">&lt;</span><span class="token number">1</span>%<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token number">890</span> blocks<span class="token punctuation">)</span>\n                       -total-:      <span class="token number">1.73</span> MB <span class="token punctuation">(</span>  <span class="token number">4</span>%<span class="token punctuation">)</span>\nMaxMetaspaceSize: unlimited\nCompressedClassSpaceSize: <span class="token number">1.00</span> GB\nInitialBootClassLoaderMetaspaceSize: <span class="token number">4.00</span> MB\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们看看我们应用程序的字符串表：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>jcmd ```````<span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span><span class="token variable">`</span></span>``````` VM.stringtable\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们看看输出：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>```````<span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span><span class="token variable">`</span></span>```````:\nStringTable statistics:\nNumber of buckets <span class="token builtin class-name">:</span> <span class="token number">65536</span> <span class="token operator">=</span> <span class="token number">524288</span> bytes, each <span class="token number">8</span>\nNumber of entries <span class="token builtin class-name">:</span> <span class="token number">20046</span> <span class="token operator">=</span> <span class="token number">320736</span> bytes, each <span class="token number">16</span>\nNumber of literals <span class="token builtin class-name">:</span> <span class="token number">20046</span> <span class="token operator">=</span> <span class="token number">1507448</span> bytes, avg <span class="token number">75.000</span>\nTotal footprint <span class="token builtin class-name">:</span> <span class="token operator">=</span> <span class="token number">2352472</span> bytes\nAverage bucket size <span class="token builtin class-name">:</span> <span class="token number">0.306</span>\nVariance of bucket size <span class="token builtin class-name">:</span> <span class="token number">0.307</span>\nStd. dev. of bucket size: <span class="token number">0.554</span>\nMaximum bucket size <span class="token builtin class-name">:</span> <span class="token number">4</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-jvm内存调整" tabindex="-1"><a class="header-anchor" href="#_6-jvm内存调整"><span>6. JVM内存调整</span></a></h2><p>我们知道Java应用程序使用的总内存是堆分配和JVM或第三方库的一堆非堆分配的总和。</p><p>非堆内存在负载下不太可能改变大小。通常，我们的应用程序有稳定的非堆内存使用，一旦所有使用的类都加载了，JIT完全预热了。但是，我们可以使用一些标志来指示JVM如何在某些区域管理内存使用。</p><p><strong>_jcmd_提供了一个_VM.flag_选项，可以看到我们的Java进程已经拥有的哪些标志，包括默认值，因此我们可以用它作为工具来检查默认配置，并了解JVM是如何配置的：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>jcmd ```````<span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span><span class="token variable">`</span></span>``````` VM.flags\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，我们看到了使用的旗帜及其值：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>```````<span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span><span class="token variable">`</span></span>```````:\n<span class="token parameter variable">-XX:CICompilerCount</span><span class="token operator">=</span><span class="token number">4</span>\n<span class="token parameter variable">-XX:ConcGCThreads</span><span class="token operator">=</span><span class="token number">2</span>\n<span class="token parameter variable">-XX:G1ConcRefinementThreads</span><span class="token operator">=</span><span class="token number">8</span>\n<span class="token parameter variable">-XX:G1HeapRegionSize</span><span class="token operator">=</span><span class="token number">1048576</span>\n<span class="token parameter variable">-XX:InitialHeapSize</span><span class="token operator">=</span><span class="token number">314572800</span>\n<span class="token punctuation">..</span>.\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看一些VM标志，用于不同区域的内存调整。</p><h3 id="_6-1-堆" tabindex="-1"><a class="header-anchor" href="#_6-1-堆"><span><strong>6.1. 堆</strong></span></a></h3><p>我们有很多标志用于调整JVM堆。要配置最小和最大堆大小，我们有_Xms_（<em>XX:InitialHeapSize</em>）和_Xmx_（<em>XX:MaxHeapSize</em>）。如果我们希望将堆大小设置为物理内存的百分比，我们可以使用_XX:MinRAMPercentage_和_XX:MaxRAMPercentage_。<strong>重要的是要知道，当我们分别使用_Xms_和_Xmx_选项时，JVM会忽略这两个。</strong></p><p>另一个可能影响内存分配模式的选项是_XX:+AlwaysPreTouch_。默认情况下，JVM最大堆在虚拟内存中分配，而不是物理内存。操作系统可能决定在没有写操作之前不分配内存。为了绕过这一点（特别是在有巨大的_DirectByteBuffers_的情况下，重新分配可能需要一些时间来重新排列操作系统的内存页），我们可以启用-XX:+AlwaysPreTouch。Pretouching在所有页面上写入“0”，迫使操作系统分配内存，而不仅仅是保留它。<strong>Pretouching会导致JVM启动延迟，因为它以单线程工作。</strong></p><h3 id="_6-2-线程栈" tabindex="-1"><a class="header-anchor" href="#_6-2-线程栈"><span><strong>6.2. 线程栈</strong></span></a></h3><p>线程栈是每个执行方法的所有局部变量的每个线程存储。我们使用**-Xss或_XX:ThreadStackSize_**选项来配置每个线程的栈大小。默认线程栈大小取决于平台，但在大多数现代64位操作系统中，它高达1 MB。</p><h3 id="_6-3-垃圾收集" tabindex="-1"><a class="header-anchor" href="#_6-3-垃圾收集"><span>6.3. 垃圾收集</span></a></h3><p>我们可以使用这些标志之一来设置应用程序的GC算法：<em>-XX:+UseSerialGC</em>、<em>-XX:+UseParallelGC</em>、<em>-XX:+UseParallelOldGC</em>、<em>-XX:+UseConcMarkSweepGC_或</em>-XX:+UseG1GC_。</p><p>如果我们选择G1作为GC，我们可以选择通过_-XX:+UseStringDeduplication_启用字符串去重。它可以节省相当大比例的内存。字符串去重仅适用于长期存在的实例。为了绕过这一点，我们可以使用_-XX:StringDeduplicationAgeThreshold_配置实例的有效年龄。_XX:StringDeduplicationAgeThreshold_的值表示GC周期存活的数量。</p><h3 id="_6-4-代码缓存" tabindex="-1"><a class="header-anchor" href="#_6-4-代码缓存"><span><strong>6.4. 代码缓存</strong></span></a></h3><p>从Java 9开始，JVM将代码缓存分为三个区域。因此，JVM提供了特定的选项来调整它们中的每一个：</p><ul><li>_-XX:NonNMethodCodeHeapSize_配置非方法段，这是与JVM内部相关的代码。默认情况下，它大约是5 MB。</li><li>_-XX:ProfiledCodeHeapSize_配置配置文件代码段，这是C1编译的代码，可能具有短暂的生命周期。默认大小约为122 MB。</li><li>_-XX:NonProfiledCodeHeapSize_设置非配置文件段的大小，这是C2编译的代码，可能具有较长的生命周期。默认大小约为122 MB。</li></ul><h3 id="_6-5-分配器" tabindex="-1"><a class="header-anchor" href="#_6-5-分配器"><span><strong>6.5. 分配器</strong></span></a></h3><p>JVM首先预留内存，然后通过使用glibc的malloc和mmap修改内存映射，使这个“预留”的部分可用。预留和释放内存块的行为可能导致碎片化。分配内存的碎片化可能导致内存中有很多未使用的区域。</p><p>除了malloc，我们还可以使用其他分配器，如jemalloc或tcmalloc。jemalloc是一种通用的malloc实现，强调避免碎片化和可扩展的并发支持，因此它通常看起来比常规的glibc的malloc更智能</p>',90),l=[t];function i(o,c){return n(),s("div",null,l)}const u=a(p,[["render",i],["__file","2024-07-12-Can a Java Application Use More Memory Than the Heap Size .html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Can%20a%20Java%20Application%20Use%20More%20Memory%20Than%20the%20Heap%20Size%20.html","title":"Java应用程序可以使用超过堆大小的内存吗？ | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JVM"],"tag":["Java应用","内存","堆外内存"],"head":[["meta",{"name":"keywords","content":"Java, JVM, 内存管理, 堆内存, 非堆内存"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Can%20a%20Java%20Application%20Use%20More%20Memory%20Than%20the%20Heap%20Size%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java应用程序可以使用超过堆大小的内存吗？ | Baeldung"}],["meta",{"property":"og:description","content":"Java应用程序可以使用超过堆大小的内存吗？ | Baeldung Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK中的CRaC（检查点时协调恢复）项目可以通过创建应用程序的峰值性能检查点并恢复JVM实例到该点来帮助改善这些问题。 为了充分利用这一特性，BellSoft提供了为Java应用程序高度优化的容器。这些容器打包了Alpaquit..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T22:24:52.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java应用"}],["meta",{"property":"article:tag","content":"内存"}],["meta",{"property":"article:tag","content":"堆外内存"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T22:24:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java应用程序可以使用超过堆大小的内存吗？ | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T22:24:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java应用程序可以使用超过堆大小的内存吗？ | Baeldung Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK中的CRaC（检查点时协调恢复）项目可以通过创建应用程序的峰值性能检查点并恢复JVM实例到该点来帮助改善这些问题。 为了充分利用这一特性，BellSoft提供了为Java应用程序高度优化的容器。这些容器打包了Alpaquit..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Java进程的内存结构","slug":"_2-java进程的内存结构","link":"#_2-java进程的内存结构","children":[]},{"level":2,"title":"3. JVM的非堆内存区域","slug":"_3-jvm的非堆内存区域","link":"#_3-jvm的非堆内存区域","children":[{"level":3,"title":"3.1. Metaspace","slug":"_3-1-metaspace","link":"#_3-1-metaspace","children":[]},{"level":3,"title":"3.2. 代码缓存","slug":"_3-2-代码缓存","link":"#_3-2-代码缓存","children":[]},{"level":3,"title":"3.3. 线程","slug":"_3-3-线程","link":"#_3-3-线程","children":[]},{"level":3,"title":"3.4. 垃圾收集","slug":"_3-4-垃圾收集","link":"#_3-4-垃圾收集","children":[]},{"level":3,"title":"3.5. 符号","slug":"_3-5-符号","link":"#_3-5-符号","children":[]},{"level":3,"title":"3.6. Arena","slug":"_3-6-arena","link":"#_3-6-arena","children":[]},{"level":3,"title":"3.7. 其他","slug":"_3-7-其他","link":"#_3-7-其他","children":[]}]},{"level":2,"title":"5. 本地内存跟踪","slug":"_5-本地内存跟踪","link":"#_5-本地内存跟踪","children":[{"level":3,"title":"5.1. 本地内存摘要报告","slug":"_5-1-本地内存摘要报告","link":"#_5-1-本地内存摘要报告","children":[]},{"level":3,"title":"5.2. Metaspace和字符串表报告","slug":"_5-2-metaspace和字符串表报告","link":"#_5-2-metaspace和字符串表报告","children":[]}]},{"level":2,"title":"6. JVM内存调整","slug":"_6-jvm内存调整","link":"#_6-jvm内存调整","children":[{"level":3,"title":"6.1. 堆","slug":"_6-1-堆","link":"#_6-1-堆","children":[]},{"level":3,"title":"6.2. 线程栈","slug":"_6-2-线程栈","link":"#_6-2-线程栈","children":[]},{"level":3,"title":"6.3. 垃圾收集","slug":"_6-3-垃圾收集","link":"#_6-3-垃圾收集","children":[]},{"level":3,"title":"6.4. 代码缓存","slug":"_6-4-代码缓存","link":"#_6-4-代码缓存","children":[]},{"level":3,"title":"6.5. 分配器","slug":"_6-5-分配器","link":"#_6-5-分配器","children":[]}]}],"git":{"createdTime":1720823092000,"updatedTime":1720823092000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":13.63,"words":4090},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Can a Java Application Use More Memory Than the Heap Size .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK中的CRaC（检查点时协调恢复）项目可以通过创建应用程序的峰值性能检查点并恢复JVM实例到该点来帮助改善这些问题。</p>\\n<p>为了充分利用这一特性，BellSoft提供了为Java应用程序高度优化的容器。这些容器打包了Alpaquita Linux（一个为Java和云环境优化的全功能操作系统）和Liberica JDK（基于OpenJDK的开源Java运行时）。</p>\\n<p>这些现成的映像使我们能够轻松地在Spring Boot应用程序中集成CRaC：</p>\\n<p><strong>使用CRaC支持提高Java应用程序性能</strong></p>","autoDesc":true}');export{u as comp,m as data};
