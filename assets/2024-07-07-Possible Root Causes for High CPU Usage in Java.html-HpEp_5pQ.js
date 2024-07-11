import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-BEVMBw2k.js";const t={},p=e(`<h1 id="java程序高cpu使用率的可能根本原因" tabindex="-1"><a class="header-anchor" href="#java程序高cpu使用率的可能根本原因"><span>Java程序高CPU使用率的可能根本原因</span></a></h1><p>在本教程中，我们将处理Java程序中的高CPU使用率问题。我们将探讨潜在的根本原因以及如何排查这些场景。</p><h2 id="_2-什么是高cpu使用率" tabindex="-1"><a class="header-anchor" href="#_2-什么是高cpu使用率"><span>2. 什么是高CPU使用率</span></a></h2><p>在我们进一步讨论之前，我们必须定义我们认为的高CPU使用率是什么。毕竟，这个指标取决于程序正在做什么，并且可能会有很大的波动，甚至高达100%。</p><p>对于本文，我们将考虑这样一些情况：Windows任务管理器或Unix/Linux的<code>top</code>命令显示CPU使用率在90-100%之间长时间（从几分钟到几小时）的持续使用。此外，这种使用应该是不合理的——换句话说，程序不应该在进行密集的工作。</p><h3 id="_3-1-实现错误" tabindex="-1"><a class="header-anchor" href="#_3-1-实现错误"><span>3.1. 实现错误</span></a></h3><p>我们首先应该检查的是我们代码中可能存在的无限循环。由于多线程的工作方式，即使在这些情况下，我们的程序仍然可以保持响应。</p><p>一个潜在的陷阱是运行在应用程序服务器上（例如Tomcat这样的Servlet容器）的Web应用程序。尽管我们可能没有在代码中显式创建新线程，但应用程序服务器在单独的线程中处理每个请求。因此，即使一些请求陷入了循环，服务器仍然可以正确地处理新请求。<strong>这可能会给我们一个错误的印象，认为一切运行正常，而实际上应用程序表现不佳，如果足够多的线程最终被阻塞，甚至可能会崩溃</strong>。</p><h3 id="_3-2-糟糕的算法或数据结构" tabindex="-1"><a class="header-anchor" href="#_3-2-糟糕的算法或数据结构"><span>3.2. 糟糕的算法或数据结构</span></a></h3><p>另一个可能的实现问题是引入了性能差或与我们特定用例不兼容的算法或数据结构。</p><p>让我们看一个简单的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">generateList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">10000000</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">parallel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">IntUnaryOperator</span><span class="token punctuation">.</span><span class="token function">identity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token operator">::</span><span class="token function">addAll</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用<code>ArrayList</code>实现生成一个包含1000万个数字的简单列表。</p><p>接下来，让我们访问列表末尾附近的一个条目：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` list <span class="token operator">=</span> <span class="token function">generateList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">long</span> start <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> value <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">9500000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Found value %d in %d nanos\\n&quot;</span><span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们使用的是<code>ArrayList</code>，索引访问非常快，我们得到一个消息表明了这一点：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>Found value 9500000 in 49100 nanos
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们看看如果列表实现从<code>ArrayList</code>更改为<code>LinkedList</code>会发生什么：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">generateList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">10000000</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">parallel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">IntUnaryOperator</span><span class="token punctuation">.</span><span class="token function">identity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">LinkedList</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token operator">::</span><span class="token function">addAll</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在运行我们的程序，发现访问时间慢了很多：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>Found value 9500000 in 4825900 nanos
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>我们可以看到，仅仅通过一个小小的改变，我们的程序就变慢了100倍</strong>。</p><p>尽管我们自己永远不会引入这样的改变，但其他开发人员可能不了解我们如何使用<code>generateList</code>，可能会这样做。<strong>此外，我们可能甚至不拥有<code>generateList</code> API实现的所有权，因此无法控制它</strong>。</p><h3 id="_3-3-大型和连续的gc周期" tabindex="-1"><a class="header-anchor" href="#_3-3-大型和连续的gc周期"><span>3.3. 大型和连续的GC周期</span></a></h3><p><strong>还有一些原因与我们的实现无关，甚至可能超出我们的控制范围</strong>。其中之一是大型和连续的垃圾收集。</p><p>这取决于我们正在工作的系统类型及其使用情况。一个例子是一个聊天室应用程序，用户为每个发布的消息接收通知。在小规模上，一个简单的实现会工作得很好。</p><p>然而，如果我们的应用程序开始发展到数百万用户，每个用户都是多个房间的成员，<strong>生成的通知对象的数量和速率将急剧增加</strong>。这可以迅速饱和我们的堆，并触发停止世界的垃圾收集。当JVM在清理堆时，我们的系统停止响应，这降低了用户体验。</p><h2 id="_4-排查cpu问题" tabindex="-1"><a class="header-anchor" href="#_4-排查cpu问题"><span>4. 排查CPU问题</span></a></h2><p>正如上述示例所示，排查这些问题不能总是通过检查或调试代码来完成。然而，有一些工具我们可以使用，以获取我们的程序发生了什么以及可能的原因。</p><h3 id="_4-1-使用分析器" tabindex="-1"><a class="header-anchor" href="#_4-1-使用分析器"><span>4.1. 使用分析器</span></a></h3><p><strong>使用分析器始终是一个有效且安全的选择</strong>。无论是GC周期还是无限循环，分析器都会迅速指向热点代码路径。</p><p>市场上有许多分析器，包括商业和开源的。Java Flight Recorder以及Java Mission Control和诊断命令工具是一套帮助我们直观排查这些问题的工具。</p><h3 id="_4-2-运行线程分析" tabindex="-1"><a class="header-anchor" href="#_4-2-运行线程分析"><span>4.2. 运行线程分析</span></a></h3><p>如果分析器不可用，<strong>我们可以进行一些线程分析以识别罪魁祸首</strong>。根据主机操作系统和环境，我们可以使用不同的工具，但通常有两个步骤：</p><ol><li>使用一个显示所有运行线程及其PID和CPU百分比的工具，以识别有问题的线程。</li><li>使用一个JVM工具显示所有线程及其当前堆栈信息，以找到有问题的PID。</li></ol><p>Linux的<code>top</code>命令就是这样一个工具。如果我们使用<code>top</code>命令，我们可以看到当前运行的进程，其中包括我们的Java进程：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>PID  USER       PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
3296 User       20   0 6162828   1.9g  25668 S 806.3  25.6   0:30.88 java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们注意到_PID_值3296。这个视图帮助我们从我们的程序中识别出高CPU使用率，但我们需要进一步挖掘，找出哪些线程有问题。</p><p>运行<code>top -H</code>给我们一个所有运行线程的列表：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code> PID USER       PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
3335 User       20   0 6162828   2.0g  26484 R  65.3  26.8   0:02.77 Thread-1
3298 User       20   0 6162828   2.0g  26484 R  64.7  26.8   0:02.94 GC Thread#0
3334 User       20   0 6162828   2.0g  26484 R  64.3  26.8   0:02.74 GC Thread#8
3327 User       20   0 6162828   2.0g  26484 R  64.0  26.8   0:02.93 GC Thread#3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看到多个GC线程占用了CPU时间，以及我们的一个线程_Thread-1_，PID为3335。</p><p>要获取线程转储，我们可以使用_jstack_。如果我们运行_jstack -e 3296_，我们可以得到我们程序的线程转储。我们可以通过使用它的名称或其十六进制的PID来找到_Thread-1_：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>&quot;Thread-1&quot; #13 prio=5 os_prio=0 cpu=9430.54ms elapsed=171.26s allocated=19256B defined_classes=0 tid=0x00007f673c188000 nid=0xd07 runnable [0x00007f671c25c000]
   java.lang.Thread.State: RUNNABLE
        at com.baeldung.highcpu.Application.highCPUMethod(Application.java:40)
        at com.baeldung.highcpu.Application.lambda$main$1(Application.java:61)
        at com.baeldung.highcpu.Application$$Lambda$2/0x0000000840061040.run(Unknown Source)
        at java.lang.Thread.run(java.base@11.0.18/Thread.java:829)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意PID 3335对应于十六进制的0xd07，并且是线程的_nid_值</strong>。</p><p>使用线程转储的堆栈信息，我们现在可以锁定有问题的代码并开始修复它。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了Java程序中高CPU使用率的潜在根本原因。我们通过一些示例，并介绍了几种我们可以排查这些场景的方法。</p><p>如往常一样，本文的源代码可在GitHub上找到。</p>`,48),o=[p];function c(l,i){return s(),n("div",null,o)}const d=a(t,[["render",c],["__file","2024-07-07-Possible Root Causes for High CPU Usage in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Possible%20Root%20Causes%20for%20High%20CPU%20Usage%20in%20Java.html","title":"Java程序高CPU使用率的可能根本原因","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Performance"],"tag":["CPU","Troubleshooting"],"head":[["meta",{"name":"keywords","content":"Java, CPU, Performance, Troubleshooting"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Possible%20Root%20Causes%20for%20High%20CPU%20Usage%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java程序高CPU使用率的可能根本原因"}],["meta",{"property":"og:description","content":"Java程序高CPU使用率的可能根本原因 在本教程中，我们将处理Java程序中的高CPU使用率问题。我们将探讨潜在的根本原因以及如何排查这些场景。 2. 什么是高CPU使用率 在我们进一步讨论之前，我们必须定义我们认为的高CPU使用率是什么。毕竟，这个指标取决于程序正在做什么，并且可能会有很大的波动，甚至高达100%。 对于本文，我们将考虑这样一些情况..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T08:58:57.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"CPU"}],["meta",{"property":"article:tag","content":"Troubleshooting"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T08:58:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java程序高CPU使用率的可能根本原因\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T08:58:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java程序高CPU使用率的可能根本原因 在本教程中，我们将处理Java程序中的高CPU使用率问题。我们将探讨潜在的根本原因以及如何排查这些场景。 2. 什么是高CPU使用率 在我们进一步讨论之前，我们必须定义我们认为的高CPU使用率是什么。毕竟，这个指标取决于程序正在做什么，并且可能会有很大的波动，甚至高达100%。 对于本文，我们将考虑这样一些情况..."},"headers":[{"level":2,"title":"2. 什么是高CPU使用率","slug":"_2-什么是高cpu使用率","link":"#_2-什么是高cpu使用率","children":[{"level":3,"title":"3.1. 实现错误","slug":"_3-1-实现错误","link":"#_3-1-实现错误","children":[]},{"level":3,"title":"3.2. 糟糕的算法或数据结构","slug":"_3-2-糟糕的算法或数据结构","link":"#_3-2-糟糕的算法或数据结构","children":[]},{"level":3,"title":"3.3. 大型和连续的GC周期","slug":"_3-3-大型和连续的gc周期","link":"#_3-3-大型和连续的gc周期","children":[]}]},{"level":2,"title":"4. 排查CPU问题","slug":"_4-排查cpu问题","link":"#_4-排查cpu问题","children":[{"level":3,"title":"4.1. 使用分析器","slug":"_4-1-使用分析器","link":"#_4-1-使用分析器","children":[]},{"level":3,"title":"4.2. 运行线程分析","slug":"_4-2-运行线程分析","link":"#_4-2-运行线程分析","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720342737000,"updatedTime":1720342737000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.91,"words":1774},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Possible Root Causes for High CPU Usage in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将处理Java程序中的高CPU使用率问题。我们将探讨潜在的根本原因以及如何排查这些场景。</p>\\n<h2>2. 什么是高CPU使用率</h2>\\n<p>在我们进一步讨论之前，我们必须定义我们认为的高CPU使用率是什么。毕竟，这个指标取决于程序正在做什么，并且可能会有很大的波动，甚至高达100%。</p>\\n<p>对于本文，我们将考虑这样一些情况：Windows任务管理器或Unix/Linux的<code>top</code>命令显示CPU使用率在90-100%之间长时间（从几分钟到几小时）的持续使用。此外，这种使用应该是不合理的——换句话说，程序不应该在进行密集的工作。</p>","autoDesc":true}');export{d as comp,k as data};
