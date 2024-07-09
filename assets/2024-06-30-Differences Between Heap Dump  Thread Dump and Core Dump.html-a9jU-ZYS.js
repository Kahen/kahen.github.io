import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-_uhw5edP.js";const t={},p=e(`<h1 id="java中的堆转储、线程转储和核心转储的区别" tabindex="-1"><a class="header-anchor" href="#java中的堆转储、线程转储和核心转储的区别"><span>Java中的堆转储、线程转储和核心转储的区别</span></a></h1><p>在Java虚拟机（JVM）的帮助下，Java程序的内存管理变得简单。当出现错误时，我们可以从JVM获取转储文件以诊断错误。本教程将探讨三种常见的Java转储文件——堆转储、线程转储和核心转储——并了解它们的使用场景。</p><p>在运行时，JVM创建堆，其中包含运行中的Java应用程序中使用的对象的引用。堆转储包含了运行时所有使用中对象的当前状态的保存副本。</p><p>此外，它用于分析Java中的_OutOfMemoryError_错误。堆转储可以有两种格式——经典格式和便携式堆格式（PHD）。经典格式是可读的，而PHD是二进制的，需要工具进行进一步分析。此外，PHD是堆转储的默认格式。</p><p>现代堆转储还包含一些线程信息。从Java 6更新14开始，堆转储还包含线程的堆栈跟踪。堆转储中的堆栈跟踪将对象连接到使用它们的线程。</p><p>像Eclipse Memory Analyzer这样的分析工具包括支持检索这些信息。</p><h3 id="_2-1-使用场景" tabindex="-1"><a class="header-anchor" href="#_2-1-使用场景"><span>2.1. 使用场景</span></a></h3><p>堆转储可以帮助分析Java应用程序中的_OutOfMemoryError_。</p><p>让我们看一些示例代码，这些代码会抛出_OutOfMemoryError_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HeapDump</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` numbers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                numbers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">OutOfMemoryError</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;内存溢出错误发生了！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例代码中，我们创建了一个无限循环，直到堆内存被填满。我们知道，在Java中，<code>new</code>关键字有助于在堆上分配内存。</p><p>要捕获上述代码的堆转储，我们需要一个工具。<strong>最常用的工具之一是_jmap_</strong>。</p><p>首先，我们需要通过运行_jps_命令获取我们机器上所有运行中的Java进程的进程ID：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ jps
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述命令将输出所有运行中的Java进程：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token number">12789</span> Launcher
<span class="token number">13302</span> Jps
<span class="token number">7517</span> HeapDump
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们感兴趣的是_HeapDump_进程。因此，让我们使用_jmap_命令和_HeapDump_进程ID来捕获堆转储：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ jmap -dump:live,file<span class="token operator">=</span>hdump.hprof <span class="token number">7517</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述命令在项目根目录下生成_hdump.hprof_文件。</p><p>最后，<strong>我们可以使用像Eclipse Memory Analyzer这样的工具来分析转储文件</strong>。</p><h2 id="_3-线程转储" tabindex="-1"><a class="header-anchor" href="#_3-线程转储"><span>3. 线程转储</span></a></h2><p><strong>线程转储包含了运行中的Java程序中所有线程在特定瞬间的快照</strong>。</p><p>线程是进程的最小部分，它通过并发运行多个任务来帮助程序高效运行。</p><p>此外，线程转储可以帮助诊断Java应用程序中的效率问题。因此，它是分析性能问题的重要工具，特别是当应用程序运行缓慢时。</p><p>此外，它可以帮助检测陷入无限循环的线程。它还可以帮助识别死锁，即多个线程等待彼此释放资源。</p><p>此外，它可以识别某些线程没有获得足够CPU时间的情况。这可以帮助识别性能瓶颈。</p><h3 id="_3-1-使用场景" tabindex="-1"><a class="header-anchor" href="#_3-1-使用场景"><span>3.1. 使用场景</span></a></h3><p>这里有一个示例程序，可能由于长时间运行的任务而性能缓慢：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ThreadDump</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">longRunningTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">longRunningTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isInterrupted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;中断了！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例代码中，我们创建了一个方法，它循环到_Integer.MAX_VALUE_并将值输出到控制台。<strong>这是一个长时间运行的操作，可能会成为性能问题</strong>。</p><p><strong>为了分析性能，我们可以捕获线程转储</strong>。首先，让我们找到所有运行中的Java程序的进程ID：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ jps
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>_jps_命令将所有Java进程输出到控制台：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token number">3042</span> ThreadDump
<span class="token number">964</span> Main
<span class="token number">3032</span> Launcher
<span class="token number">3119</span> Jps
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们对_ThreadDump_进程ID感兴趣。接下来，<strong>让我们使用_jstack_命令和进程ID来获取线程转储</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ jstack <span class="token parameter variable">-l</span> <span class="token number">3042</span> <span class="token operator">&gt;</span>\` slow-running-task-thread-dump.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述命令捕获线程转储并将其保存在_txt_文件中，以便进一步分析。</p><h2 id="_4-核心转储" tabindex="-1"><a class="header-anchor" href="#_4-核心转储"><span>4. 核心转储</span></a></h2><p><strong>核心转储，也称为崩溃转储，包含了程序崩溃或突然终止时的快照</strong>。</p><p>JVM运行字节码而不是本地代码。因此，Java代码不能导致核心转储。</p><p>然而，一些Java程序使用Java本地接口（JNI）直接运行本地代码。JNI可能因为外部库崩溃而导致JVM崩溃。我们可以在那一刻获取核心转储并分析它。</p><p>此外，<strong>核心转储是操作系统级别的转储，可以用来找到JVM崩溃时本地调用的详细信息</strong>。</p><h3 id="_4-1-使用场景" tabindex="-1"><a class="header-anchor" href="#_4-1-使用场景"><span>4.1. 使用场景</span></a></h3><p>让我们看一个使用JNI生成核心转储的示例。</p><p>首先，让我们创建一个名为_CoreDump_的类来加载本地库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CoreDump</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">native</span> <span class="token keyword">void</span> <span class="token function">core</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">CoreDump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">core</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">loadLibrary</span><span class="token punctuation">(</span><span class="token string">&quot;nativelib&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们使用_javac_命令编译Java代码：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ javac CoreDump.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，让我们通过运行_javac -h_命令为本地方法实现生成头文件：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ javac <span class="token parameter variable">-h</span> <span class="token builtin class-name">.</span> CoreDump.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，让我们用C实现一个将使JVM崩溃的本地方法：</p><div class="language-c line-numbers-mode" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token expression">\`<span class="token operator">&lt;</span>jni<span class="token punctuation">.</span>h<span class="token operator">&gt;</span>\`</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;CoreDump.h&quot;</span></span>

<span class="token keyword">void</span> <span class="token function">core</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> <span class="token operator">*</span>p <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
    <span class="token operator">*</span>p <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

JNIEXPORT <span class="token keyword">void</span> JNICALL <span class="token function">Java_CoreDump_core</span><span class="token punctuation">(</span>JNIEnv <span class="token operator">*</span>env<span class="token punctuation">,</span> jobject obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">core</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们通过运行_gcc_命令编译本地代码：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ gcc <span class="token parameter variable">-fPIC</span> -I<span class="token string">&quot;/usr/lib/jvm/java-17-graalvm/include&quot;</span> -I<span class="token string">&quot;/usr/lib/jvm/java-17-graalvm/include/linux&quot;</span> <span class="token parameter variable">-shared</span> <span class="token parameter variable">-o</span> libnativelib.so CoreDump.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将生成名为_libnativelib.so_的共享库。接下来，让我们使用共享库编译Java代码：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-Djava.library.path</span><span class="token operator">=</span>. CoreDump
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>本地方法使JVM崩溃并在项目目录中生成了核心转储：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>// <span class="token punctuation">..</span>.
<span class="token comment"># A fatal error has been detected by the Java Runtime Environment:</span>
<span class="token comment"># SIGSEGV (0xb) at pc=0x00007f9c48878119, pid=65743, tid=65744</span>
<span class="token comment"># C  [libnativelib.so+0x1119]  core+0x10</span>
<span class="token comment"># Core dump will be written. Default location: Core dumps may be processed with</span>
<span class="token comment"># &quot;/usr/lib/systemd/systemd-coredump %P %u %g %s %t %c %h&quot; (or dumping to /core-java-perf/core.65743)</span>
<span class="token comment"># An error report file with more information is saved as:</span>
<span class="token comment"># ~/core-java-perf/hs_err_pid65743.log</span>
// <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述输出显示了崩溃信息和转储文件的位置。</p><h2 id="_5-关键差异" tabindex="-1"><a class="header-anchor" href="#_5-关键差异"><span>5. 关键差异</span></a></h2><p>以下是显示三种Java转储文件关键差异的摘要表：</p><table><thead><tr><th>转储类型</th><th>使用场景</th><th>包含内容</th></tr></thead><tbody><tr><td>堆转储</td><td>诊断内存问题，如_OutOfMemoryError_</td><td>Java堆中对象的快照</td></tr><tr><td>线程转储</td><td>排查性能问题、线程死锁和无限循环</td><td>JVM中所有线程状态的快照</td></tr><tr><td>核心转储</td><td>调试由本地库引起的崩溃</td><td>JVM崩溃时的进程状态</td></tr></tbody></table><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们通过查看它们的用途，学习了堆转储、线程转储和核心转储之间的区别。此外，我们看到了具有不同问题的示例代码，并生成了转储文件以供进一步分析。每种转储文件都为排查Java应用程序的不同目的服务。</p><p>如常，示例的源代码可在GitHub上获得。</p>`,65),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","2024-06-30-Differences Between Heap Dump  Thread Dump and Core Dump.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Differences%20Between%20Heap%20Dump%20%20Thread%20Dump%20and%20Core%20Dump.html","title":"Java中的堆转储、线程转储和核心转储的区别","lang":"zh-CN","frontmatter":{"date":"2024-07-01T00:00:00.000Z","category":["Java","性能监控"],"tag":["堆转储","线程转储","核心转储"],"head":[["meta",{"name":"keywords","content":"Java, 堆转储, 线程转储, 核心转储, JVM, 性能分析, 错误诊断"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Differences%20Between%20Heap%20Dump%20%20Thread%20Dump%20and%20Core%20Dump.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的堆转储、线程转储和核心转储的区别"}],["meta",{"property":"og:description","content":"Java中的堆转储、线程转储和核心转储的区别 在Java虚拟机（JVM）的帮助下，Java程序的内存管理变得简单。当出现错误时，我们可以从JVM获取转储文件以诊断错误。本教程将探讨三种常见的Java转储文件——堆转储、线程转储和核心转储——并了解它们的使用场景。 在运行时，JVM创建堆，其中包含运行中的Java应用程序中使用的对象的引用。堆转储包含了运..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T17:31:05.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"堆转储"}],["meta",{"property":"article:tag","content":"线程转储"}],["meta",{"property":"article:tag","content":"核心转储"}],["meta",{"property":"article:published_time","content":"2024-07-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T17:31:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的堆转储、线程转储和核心转储的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T17:31:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的堆转储、线程转储和核心转储的区别 在Java虚拟机（JVM）的帮助下，Java程序的内存管理变得简单。当出现错误时，我们可以从JVM获取转储文件以诊断错误。本教程将探讨三种常见的Java转储文件——堆转储、线程转储和核心转储——并了解它们的使用场景。 在运行时，JVM创建堆，其中包含运行中的Java应用程序中使用的对象的引用。堆转储包含了运..."},"headers":[{"level":3,"title":"2.1. 使用场景","slug":"_2-1-使用场景","link":"#_2-1-使用场景","children":[]},{"level":2,"title":"3. 线程转储","slug":"_3-线程转储","link":"#_3-线程转储","children":[{"level":3,"title":"3.1. 使用场景","slug":"_3-1-使用场景","link":"#_3-1-使用场景","children":[]}]},{"level":2,"title":"4. 核心转储","slug":"_4-核心转储","link":"#_4-核心转储","children":[{"level":3,"title":"4.1. 使用场景","slug":"_4-1-使用场景","link":"#_4-1-使用场景","children":[]}]},{"level":2,"title":"5. 关键差异","slug":"_5-关键差异","link":"#_5-关键差异","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719768665000,"updatedTime":1719768665000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.92,"words":1777},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Differences Between Heap Dump  Thread Dump and Core Dump.md","localizedDate":"2024年7月1日","excerpt":"\\n<p>在Java虚拟机（JVM）的帮助下，Java程序的内存管理变得简单。当出现错误时，我们可以从JVM获取转储文件以诊断错误。本教程将探讨三种常见的Java转储文件——堆转储、线程转储和核心转储——并了解它们的使用场景。</p>\\n<p>在运行时，JVM创建堆，其中包含运行中的Java应用程序中使用的对象的引用。堆转储包含了运行时所有使用中对象的当前状态的保存副本。</p>\\n<p>此外，它用于分析Java中的_OutOfMemoryError_错误。堆转储可以有两种格式——经典格式和便携式堆格式（PHD）。经典格式是可读的，而PHD是二进制的，需要工具进行进一步分析。此外，PHD是堆转储的默认格式。</p>","autoDesc":true}');export{d as comp,v as data};
