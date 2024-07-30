import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as e,a as n}from"./app-CbPcg273.js";const t={},l=n('<h1 id="java-flight-recorder-jfr-视图命令在-java-21-中的使用-baeldung" tabindex="-1"><a class="header-anchor" href="#java-flight-recorder-jfr-视图命令在-java-21-中的使用-baeldung"><span>Java Flight Recorder (JFR) 视图命令在 Java 21 中的使用 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Java Flight Recorder（JFR）是一个监控 JVM 及其上运行程序的性能分析和诊断工具。这是一个开发者用来监控其应用程序状态和性能的实用工具。</p><p>本教程将重点介绍 Java 21 中为 JFR 新引入的 <em>view</em> 命令。</p><h2 id="_2-java-flight-recorder-jfr" tabindex="-1"><a class="header-anchor" href="#_2-java-flight-recorder-jfr"><span>2. Java Flight Recorder (JFR)</span></a></h2><p>Java Flight Recorder（JFR）是一个在 Java 7 中引入的低开销应用程序分析框架，作为实验性特性。它允许我们分析和理解我们程序的重要指标，例如垃圾收集模式、IO 操作、内存分配等。</p><h3 id="_2-1-java-flight-recorder-是什么" tabindex="-1"><a class="header-anchor" href="#_2-1-java-flight-recorder-是什么"><span>2.1. Java Flight Recorder 是什么？</span></a></h3><p>JFR 在 Java 应用程序运行时收集 JVM 中的事件信息，我们可以使用诊断工具分析结果。</p><p>JFR 监控应用程序并将分析结果记录在记录文件中。我们有两种方式指示 JFR 监控应用程序：</p><ol><li>使用命令行启动应用程序并启用 JFR。</li><li>使用如 <em>jcmd</em> 等诊断工具对已运行的 Java 应用程序进行监控。</li></ol><p><strong>记录通常生成为 <em>.jfr</em> 文件，然后可以通过 Java Mission Control (JMC) 工具或我们将在后续部分中看到的新 <em>view</em> 命令进行分析。</strong></p><h3 id="_2-2-从命令行录制" tabindex="-1"><a class="header-anchor" href="#_2-2-从命令行录制"><span>2.2. 从命令行录制</span></a></h3><p>为了演示飞行记录，让我们编写一个小程序，它将对象插入到 <em>ArrayList</em> 中，直到抛出 <em>OutOfMemoryError</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">insertToList</span><span class="token punctuation">(</span><span class="token class-name">List</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>` list<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">OutOfMemoryError</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;内存不足。退出&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用标准 <em>javac</em> 编译器编译程序：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>javac <span class="token parameter variable">-d</span> out <span class="token parameter variable">-sourcepath</span> JFRExample.java\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一旦生成了 <em>.class</em> 文件，我们启动飞行记录器。我们向 <em>java</em> 命令传递一些额外的参数，即 <em>-XX:+FlightRecorder</em> 选项，以及一些额外参数来设置记录持续时间和记录将被存储的输出文件路径：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-XX:StartFlightRecording</span><span class="token operator">=</span>duration<span class="token operator">=</span>200s,filename<span class="token operator">=</span>flight.jfr <span class="token parameter variable">-cp</span> ./out/ com.baeldung.jfrview.JFRExample\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们的程序现在运行时启用了 JFR 以捕获事件和其他系统属性，JFR 将结果写入 <em>flight.jfr</em> 文件。</p><h3 id="_2-3-使用-jcmd-工具录制" tabindex="-1"><a class="header-anchor" href="#_2-3-使用-jcmd-工具录制"><span>2.3. 使用 <em>jcmd</em> 工具录制</span></a></h3><p><strong><em>jcmd</em> 诊断工具提供了一种替代方式来记录和分析我们的应用程序和 JVM 的性能。</strong> 我们可以使用此工具向运行中的虚拟机注册诊断事件。</p><p>要使用 <em>jcmd</em> 工具，我们需要应用程序正在运行，并且我们必须知道 <em>pid</em>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>jcmd <span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>pid<span class="token operator">|</span>MainClass<span class="token operator">&gt;</span><span class="token variable">`</span></span> <span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>command<span class="token operator">&gt;</span><span class="token variable">`</span></span> <span class="token punctuation">[</span>parameters<span class="token punctuation">]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>jcmd</em> 工具识别的几个命令包括：</p><ul><li><strong>JFR.start</strong> – 开始新的 JFR 记录</li><li><strong>JFR.check</strong> – 检查正在运行的 JFR 记录</li><li><strong>JFR.stop</strong> – 停止特定的 JFR 记录</li><li><strong>JFR.dump</strong> – 将 JFR 记录的内容复制到文件</li></ul><p>每个命令都需要额外的参数。</p><p>现在让我们使用 <em>jcmd</em> 工具创建一个记录。我们需要启动应用程序并找到正在运行进程的 <em>pid</em>。一旦我们有了 <em>pid</em>，我们开始记录：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>jcmd <span class="token number">128263</span> JFR.start <span class="token assign-left variable">filename</span><span class="token operator">=</span>recording.jfr\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当我们捕获了相关事件后，我们可以停止记录：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>jcmd <span class="token number">128263</span> JFR.stop <span class="token assign-left variable">filename</span><span class="token operator">=</span>recording.jfr\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-查看-jfr-记录文件" tabindex="-1"><a class="header-anchor" href="#_3-查看-jfr-记录文件"><span>3. 查看 JFR 记录文件</span></a></h2><p>要查看和理解 <em>jfr</em> 文件的结果，我们可以使用 Java Mission Control (JMC) 工具。JMC 工具附带了多种功能来分析和监控 Java 应用程序，<strong>包括一个可以读取 JFR 文件并显示结果的视觉表示的诊断工具</strong>：</p><h2 id="_4-jfr-命令" tabindex="-1"><a class="header-anchor" href="#_4-jfr-命令"><span>4. <em>jfr</em> 命令</span></a></h2><p><em>jfr</em> 命令解析并打印飞行记录文件（<em>jfr</em>）到标准输出。虽然我们之前使用 Mission Control 工具进行视觉表示，但 <em>jfr</em> 命令为我们提供了一种在控制台中过滤、总结并从飞行记录文件生成人类可读输出的方式。</p><h3 id="_4-1-使用-jfr-命令" tabindex="-1"><a class="header-anchor" href="#_4-1-使用-jfr-命令"><span>4.1. 使用 <em>jfr</em> 命令</span></a></h3><p><em>jfr</em> 命令位于 <em>$JAVA_HOME</em> 的 <em>bin</em> 路径中。让我们看看它的语法：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token variable">$JAVA_HOME</span>/bin/jfr <span class="token punctuation">[</span>command<span class="token punctuation">]</span> <span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>path<span class="token operator">&gt;</span><span class="token variable">`</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在接下来的部分中，我们将直接访问 <em>jfr</em>。</p><h3 id="_4-2-jfr-命令" tabindex="-1"><a class="header-anchor" href="#_4-2-jfr-命令"><span>4.2. <em>jfr</em> 命令</span></a></h3><p><em>jfr</em> 之前有五个命令，分别是 <em>print</em>、<em>summary</em>、<em>metadata</em>、<em>assemble</em> 和 <em>disassemble</em>。<strong><em>view</em> 命令是新引入的第六个 <em>jfr</em> 命令</strong>。</p><p><em>print</em> 命令用于打印飞行记录的内容，它接受几个参数，包括输出格式（<em>json</em>/ <em>xml</em> 等）、可能包括类别、事件和堆栈深度的范围过滤器：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>jfr print <span class="token punctuation">[</span>--xml<span class="token operator">|</span>--json<span class="token punctuation">]</span> <span class="token punctuation">[</span>--categories `<span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>filters<span class="token operator">&gt;</span><span class="token variable">`</span></span><span class="token variable"><span class="token variable">`</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>--events <span class="token variable">`</span></span><span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>filters<span class="token operator">&gt;</span><span class="token variable">`</span></span><span class="token variable"><span class="token variable">`</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>--stack-depth <span class="token variable">`</span></span><span class="token operator">&lt;</span>depth<span class="token operator">&gt;</span><span class="token variable"><span class="token variable">`</span><span class="token punctuation">]</span> <span class="token variable">`</span></span>```<span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>file<span class="token operator">&gt;</span><span class="token variable">`</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>summary</em> 命令顾名思义，生成记录的摘要，包括发生的事件、磁盘空间利用率等：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>jfr summary ````<span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>file<span class="token operator">&gt;</span><span class="token variable">`</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>metadata</em> 命令生成有关事件的详细信息，例如它们的名称和类别：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>jfr metadata ````<span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>file<span class="token operator">&gt;</span><span class="token variable">`</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，《assemble_ 和 <em>disassemble</em> 命令用于将块文件组装成记录文件，反之亦然：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>jfr assemble <span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>repository<span class="token operator">&gt;</span><span class="token variable">`</span></span> ````<span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>file<span class="token operator">&gt;</span><span class="token variable">`</span></span>```<span class="token variable"><span class="token variable">`</span>\njfr disassemble <span class="token punctuation">[</span>--max-chunks <span class="token variable">`</span></span><span class="token operator">&lt;</span>chunks<span class="token operator">&gt;</span><span class="token variable"><span class="token variable">`</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>--output <span class="token variable">`</span></span><span class="token operator">&lt;</span>directory<span class="token operator">&gt;</span><span class="token variable"><span class="token variable">`</span><span class="token punctuation">]</span> <span class="token variable">`</span></span>```<span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>file<span class="token operator">&gt;</span><span class="token variable">`</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-jfr-命令示例" tabindex="-1"><a class="header-anchor" href="#_4-3-jfr-命令示例"><span>4.3. <em>jfr</em> 命令示例</span></a></h3><p>现在我们将看一个 <em>jfr</em> 命令的示例，并生成我们的 JFR 文件的摘要：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token variable">$JAVA_HOME</span>/bin/jfr summary recording.jfr\n\n 版本：2.1\n 块：1\n 开始：2023-12-25 <span class="token number">17</span>:07:08 <span class="token punctuation">(</span>UTC<span class="token punctuation">)</span>\n 持续时间：1 秒\n\n 事件类型                              计数  大小（字节）\n<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>\n jdk.NativeLibrary                         <span class="token number">512</span>         <span class="token number">44522</span>\n jdk.SystemProcess                         <span class="token number">511</span>         <span class="token number">49553</span>\n jdk.ModuleExport                          <span class="token number">506</span>          <span class="token number">4921</span>\n jdk.BooleanFlag                           <span class="token number">495</span>         <span class="token number">15060</span>\n jdk.ActiveSetting                         <span class="token number">359</span>         <span class="token number">10376</span>\n jdk.GCPhaseParallel                       <span class="token number">162</span>          <span class="token number">4033</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-jdk-21-中的-view-命令" tabindex="-1"><a class="header-anchor" href="#_5-jdk-21-中的-view-命令"><span>5. JDK 21 中的 <em>view</em> 命令</span></a></h2><p>Java 21 引入了 <em>view</em> 命令，以便于从命令行分析 JFR 记录。这个新的 <em>view</em> 命令消除了将记录下载到 JMC 工具中使用的需求，并附带了超过 70 个预构建选项。这些选项，随着时间的推移可能会增加，涵盖了应用程序的几乎所有重要方面，包括 JVM、应用程序本身以及应用程序的环境。</p><h3 id="_5-1-查看选项的类别" tabindex="-1"><a class="header-anchor" href="#_5-1-查看选项的类别"><span>5.1. 查看选项的类别</span></a></h3><p>我们可以将不同的 <em>view</em> 选项大致分为三类，这些类别与 JMC 工具中显示的类似：</p><ol><li>Java 虚拟机视图</li><li>环境视图</li><li>应用程序视图</li></ol><h3 id="_5-2-jvm-视图" tabindex="-1"><a class="header-anchor" href="#_5-2-jvm-视图"><span>5.2. JVM 视图</span></a></h3><p>Java 虚拟机视图提供了对 JVM 属性的洞察，例如堆空间、垃圾收集、本地内存以及其他与编译器相关的指标。一些常见的 JVM 视图包括：</p><ul><li><em>class-modifications</em></li><li><em>gc-concurrent-phases</em></li><li><em>compiler-configuration</em></li><li><em>gc-configuration</em></li><li><em>native-memory-committed</em></li><li><em>gc-cpu-time</em></li><li><em>compiler-statistics</em></li><li><em>gc-pause-phases</em></li><li><em>heap-configuration</em></li></ul><h3 id="_5-3-环境视图" tabindex="-1"><a class="header-anchor" href="#_5-3-环境视图"><span>5.3. 环境视图</span></a></h3><p>环境视图显示了 JVM 运行的主机系统的信息，例如 CPU 信息、网络利用率、系统属性、进程和信息。一些常见的环境视图包括：</p><ul><li><em>cpu-information</em></li><li><em>cpu-load</em></li><li><em>jvm-flags</em></li><li><em>container-configuration</em></li><li><em>network-utilization</em></li><li><em>system-processes</em></li><li><em>system-properties</em></li></ul><h3 id="_5-4-应用程序视图" tabindex="-1"><a class="header-anchor" href="#_5-4-应用程序视图"><span>5.4. 应用程序视图</span></a></h3><p>应用程序视图提供了对应用程序代码的洞察，例如有关其线程使用、对象统计和内存利用的信息。一些常见的应用程序视图包括：</p><ul><li><em>exception-count</em></li><li><em>object-statistics</em></li><li><em>allocation-by-thread</em></li><li><em>memory-leaks-by-class</em></li><li><em>thread-cpu-load</em></li><li><em>thread-count</em></li><li><em>thread-allocation</em></li></ul><h3 id="_5-5-view-命令的结构" tabindex="-1"><a class="header-anchor" href="#_5-5-view-命令的结构"><span>5.5. <em>view</em> 命令的结构</span></a></h3><p>**<em>view</em> 命令期望一个视图名称和记录文件的路径</p>',67),p=[l];function r(i,o){return e(),s("div",null,p)}const m=a(t,[["render",r],["__file","2024-06-23-JFR View Command in Java 21.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-JFR%20View%20Command%20in%20Java%2021.html","title":"Java Flight Recorder (JFR) 视图命令在 Java 21 中的使用 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Java","编程"],"tag":["Java Flight Recorder","JFR","Java 21"],"head":[["meta",{"name":"keywords","content":"Java Flight Recorder, JFR, Java 21, 性能分析, 诊断工具"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-JFR%20View%20Command%20in%20Java%2021.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java Flight Recorder (JFR) 视图命令在 Java 21 中的使用 | Baeldung"}],["meta",{"property":"og:description","content":"Java Flight Recorder (JFR) 视图命令在 Java 21 中的使用 | Baeldung 1. 引言 Java Flight Recorder（JFR）是一个监控 JVM 及其上运行程序的性能分析和诊断工具。这是一个开发者用来监控其应用程序状态和性能的实用工具。 本教程将重点介绍 Java 21 中为 JFR 新引入的 view..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T20:50:19.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java Flight Recorder"}],["meta",{"property":"article:tag","content":"JFR"}],["meta",{"property":"article:tag","content":"Java 21"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T20:50:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java Flight Recorder (JFR) 视图命令在 Java 21 中的使用 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T20:50:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java Flight Recorder (JFR) 视图命令在 Java 21 中的使用 | Baeldung 1. 引言 Java Flight Recorder（JFR）是一个监控 JVM 及其上运行程序的性能分析和诊断工具。这是一个开发者用来监控其应用程序状态和性能的实用工具。 本教程将重点介绍 Java 21 中为 JFR 新引入的 view..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. Java Flight Recorder (JFR)","slug":"_2-java-flight-recorder-jfr","link":"#_2-java-flight-recorder-jfr","children":[{"level":3,"title":"2.1. Java Flight Recorder 是什么？","slug":"_2-1-java-flight-recorder-是什么","link":"#_2-1-java-flight-recorder-是什么","children":[]},{"level":3,"title":"2.2. 从命令行录制","slug":"_2-2-从命令行录制","link":"#_2-2-从命令行录制","children":[]},{"level":3,"title":"2.3. 使用 jcmd 工具录制","slug":"_2-3-使用-jcmd-工具录制","link":"#_2-3-使用-jcmd-工具录制","children":[]}]},{"level":2,"title":"3. 查看 JFR 记录文件","slug":"_3-查看-jfr-记录文件","link":"#_3-查看-jfr-记录文件","children":[]},{"level":2,"title":"4. jfr 命令","slug":"_4-jfr-命令","link":"#_4-jfr-命令","children":[{"level":3,"title":"4.1. 使用 jfr 命令","slug":"_4-1-使用-jfr-命令","link":"#_4-1-使用-jfr-命令","children":[]},{"level":3,"title":"4.2. jfr 命令","slug":"_4-2-jfr-命令","link":"#_4-2-jfr-命令","children":[]},{"level":3,"title":"4.3. jfr 命令示例","slug":"_4-3-jfr-命令示例","link":"#_4-3-jfr-命令示例","children":[]}]},{"level":2,"title":"5. JDK 21 中的 view 命令","slug":"_5-jdk-21-中的-view-命令","link":"#_5-jdk-21-中的-view-命令","children":[{"level":3,"title":"5.1. 查看选项的类别","slug":"_5-1-查看选项的类别","link":"#_5-1-查看选项的类别","children":[]},{"level":3,"title":"5.2. JVM 视图","slug":"_5-2-jvm-视图","link":"#_5-2-jvm-视图","children":[]},{"level":3,"title":"5.3. 环境视图","slug":"_5-3-环境视图","link":"#_5-3-环境视图","children":[]},{"level":3,"title":"5.4. 应用程序视图","slug":"_5-4-应用程序视图","link":"#_5-4-应用程序视图","children":[]},{"level":3,"title":"5.5. view 命令的结构","slug":"_5-5-view-命令的结构","link":"#_5-5-view-命令的结构","children":[]}]}],"git":{"createdTime":1719175819000,"updatedTime":1719175819000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.69,"words":1707},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-JFR View Command in Java 21.md","localizedDate":"2024年6月24日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>Java Flight Recorder（JFR）是一个监控 JVM 及其上运行程序的性能分析和诊断工具。这是一个开发者用来监控其应用程序状态和性能的实用工具。</p>\\n<p>本教程将重点介绍 Java 21 中为 JFR 新引入的 <em>view</em> 命令。</p>\\n<h2>2. Java Flight Recorder (JFR)</h2>\\n<p>Java Flight Recorder（JFR）是一个在 Java 7 中引入的低开销应用程序分析框架，作为实验性特性。它允许我们分析和理解我们程序的重要指标，例如垃圾收集模式、IO 操作、内存分配等。</p>","autoDesc":true}');export{m as comp,v as data};
