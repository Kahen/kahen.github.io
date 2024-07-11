import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BEVMBw2k.js";const e={},p=t(`<h1 id="java-project-panama-指南" tabindex="-1"><a class="header-anchor" href="#java-project-panama-指南"><span>Java Project Panama 指南</span></a></h1><p>在本教程中，我们将深入了解 Project Panama 的组件。首先，我们将探索外部函数和内存 API。然后，我们将看到 JExtract 工具如何促进其使用。</p><h2 id="_2-什么是-project-panama" tabindex="-1"><a class="header-anchor" href="#_2-什么是-project-panama"><span>2. 什么是 Project Panama？</span></a></h2><p>Project Panama 的目标是简化 Java 与外部（非 Java）API 之间的交互，即用 C、C++ 等编写的本地代码。</p><p>到目前为止，使用 Java 原生接口（JNI）是从 Java 调用外部函数的解决方案。但 JNI 存在一些缺点，Project Panama 通过以下方式解决了这些问题：</p><ul><li>消除了编写 Java 中间本地代码包装器的需要</li><li>用更具有未来性的内存 API 替代了 ByteBuffer API</li><li>引入了一种平台无关、安全且内存高效的从 Java 调用本地代码的方法</li></ul><p>为了实现其目标，Panama 包括一组 API 和工具：</p><ul><li>外部函数和内存 API：适用于分配和访问堆外内存，并直接从 Java 代码调用外部函数</li><li>向量 API：使高级开发人员能够在 Java 中表达复杂的数据并行算法</li><li>JExtract：一个工具，用于从一组本地头文件中自动派生 Java 绑定</li></ul><h2 id="_3-先决条件" tabindex="-1"><a class="header-anchor" href="#_3-先决条件"><span>3. 先决条件</span></a></h2><p>要使用外部函数和内存 API，让我们下载 Project Panama 早期访问构建。在本文撰写时，我们使用了 <em>Build 19-panama+1-13 (2022/1/18)</em>。接下来，根据使用的系统设置 <em>JAVA_HOME</em>。</p><p>由于外部函数和内存 API 是预览 API，我们必须通过添加 <em>–enable-preview</em> 标志来启用预览功能，即通过在 <em>java</em> 和 <em>javac</em> 中添加标志来编译和运行我们的代码。</p><h2 id="_4-外部函数和内存-api" tabindex="-1"><a class="header-anchor" href="#_4-外部函数和内存-api"><span>4. 外部函数和内存 API</span></a></h2><p>外部函数和内存 API 帮助 Java 程序与 Java 运行时之外的代码和数据互操作。</p><p>它通过高效地调用外部函数（即 JVM 之外的代码）和安全地访问外部内存（即 JVM 未管理的内存）来实现这一点。</p><p>它结合了两个早期孵化的 API：外部内存访问 API 和外部链接器 API。</p><p>API 提供了一组类和接口来执行这些操作：</p><ul><li>使用 <em>MemorySegment</em>、<em>MemoryAddress</em> 和 <em>SegmentAllocator</em> 分配外部内存</li><li>通过 <em>Arena</em>（从 JDK20 开始，MemorySession 被拆分为 Arena 和 SegmentScope）控制外部内存的分配和释放</li><li>使用 <em>MemoryLayout</em> 操作结构化外部内存</li><li>通过 VarHandles 访问结构化外部内存</li><li>感谢 <em>Linker</em>、<em>FunctionDescriptor</em> 和 <em>SymbolLookup</em> 调用外部函数</li></ul><h3 id="_4-1-外部内存分配" tabindex="-1"><a class="header-anchor" href="#_4-1-外部内存分配"><span>4.1. 外部内存分配</span></a></h3><p>首先，让我们探索内存分配。在这里，主要的抽象是 <em>MemorySegment</em>。它模拟了位于堆外或堆内的一个连续内存区域。<em>MemoryAddress</em> 是段内的偏移量。简单来说，内存段由内存地址组成，一个内存段可以包含其他内存段。</p><p>此外，内存段绑定到它们封装的 <em>Arena</em> 并在不再需要时被释放。<em>Arena</em> 管理段的生命周期，并确保它们在被多个线程访问时被正确释放。</p><p>让我们在内存段中创建四个连续偏移的 <em>bytes</em>，然后设置一个值为 <em>6</em> 的浮点数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Arena</span> memorySession <span class="token operator">=</span> <span class="token class-name">Arena</span><span class="token punctuation">.</span><span class="token function">ofConfined</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> byteSize <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token keyword">float</span> value <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span><span class="token punctuation">(</span><span class="token class-name">Arena</span> arena <span class="token operator">=</span> <span class="token class-name">Arena</span><span class="token punctuation">.</span><span class="token function">ofAuto</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MemorySegment</span> segment <span class="token operator">=</span> arena<span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span>byteSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
        segment<span class="token punctuation">.</span><span class="token function">setAtIndex</span><span class="token punctuation">(</span><span class="token constant">JAVA_FLOAT</span><span class="token punctuation">,</span> index<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">float</span> result <span class="token operator">=</span> segment<span class="token punctuation">.</span><span class="token function">getAtIndex</span><span class="token punctuation">(</span><span class="token constant">JAVA_FLOAT</span><span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Float value is:&quot;</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，一个 <em>confined</em> 内存会话限制了创建会话的线程的访问，而一个 <em>shared</em> 内存会话允许任何线程访问。</p><p>此外，《JAVA_FLOAT ValueLayout_ 指定了解引用操作的属性：类型映射的正确性和要解引用的字节数。</p><p><em>SegmentAllocator</em> 抽象定义了有用的操作来分配和初始化内存段。当我们的代码管理大量的堆外段时，它可能非常有用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> greetingStrings <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;panama&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;baeldung&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">try</span><span class="token punctuation">(</span><span class="token class-name">Arena</span> arena <span class="token operator">=</span> <span class="token class-name">Arena</span><span class="token punctuation">.</span><span class="token function">ofAuto</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">MemorySegment</span> offHeapSegment <span class="token operator">=</span> arena<span class="token punctuation">.</span><span class="token function">allocateArray</span><span class="token punctuation">(</span><span class="token class-name">ValueLayout</span><span class="token punctuation">.</span><span class="token constant">ADDRESS</span><span class="token punctuation">,</span> greetingStrings<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> greetingStrings<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 在堆外分配一个字符串，然后存储指向它的指针</span>
        <span class="token class-name">MemorySegment</span> cString <span class="token operator">=</span> arena<span class="token punctuation">.</span><span class="token function">allocateUtf8String</span><span class="token punctuation">(</span>greetingStrings<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        offHeapSegment<span class="token punctuation">.</span><span class="token function">setAtIndex</span><span class="token punctuation">(</span><span class="token class-name">ValueLayout</span><span class="token punctuation">.</span><span class="token constant">ADDRESS</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> cString<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-外部内存操作" tabindex="-1"><a class="header-anchor" href="#_4-2-外部内存操作"><span>4.2. 外部内存操作</span></a></h3><p>接下来，我们深入使用内存布局进行内存操作。一个 <em>MemoryLayout</em> 描述了一个段的内容。它对于操作本地代码的高级数据结构（如 <em>struct</em>、指针和指向 <em>struct</em> 的指针）非常有用。</p><p>让我们使用 <em>GroupLayout</em> 在堆外分配一个表示具有 <em>x</em> 和 <em>y</em> 坐标的 C <em>struct</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">GroupLayout</span> pointLayout <span class="token operator">=</span> <span class="token function">structLayout</span><span class="token punctuation">(</span>
    <span class="token constant">JAVA_DOUBLE</span><span class="token punctuation">.</span><span class="token function">withName</span><span class="token punctuation">(</span><span class="token string">&quot;x&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token constant">JAVA_DOUBLE</span><span class="token punctuation">.</span><span class="token function">withName</span><span class="token punctuation">(</span><span class="token string">&quot;y&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">VarHandle</span> xvarHandle <span class="token operator">=</span> pointLayout<span class="token punctuation">.</span><span class="token function">varHandle</span><span class="token punctuation">(</span><span class="token class-name">PathElement</span><span class="token punctuation">.</span><span class="token function">groupElement</span><span class="token punctuation">(</span><span class="token string">&quot;x&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">VarHandle</span> yvarHandle <span class="token operator">=</span> pointLayout<span class="token punctuation">.</span><span class="token function">varHandle</span><span class="token punctuation">(</span><span class="token class-name">PathElement</span><span class="token punctuation">.</span><span class="token function">groupElement</span><span class="token punctuation">(</span><span class="token string">&quot;y&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Arena</span> memorySession <span class="token operator">=</span> <span class="token class-name">Arena</span><span class="token punctuation">.</span><span class="token function">ofConfined</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">MemorySegment</span> pointSegment <span class="token operator">=</span> memorySession<span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span>pointLayout<span class="token punctuation">)</span><span class="token punctuation">;</span>
    xvarHandle<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>pointSegment<span class="token punctuation">,</span> <span class="token number">3d</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    yvarHandle<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>pointSegment<span class="token punctuation">,</span> <span class="token number">4d</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>pointSegment<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，由于使用了不同的 <em>VarHandle</em> 来初始化每个点坐标，因此不需要进行偏移计算。</p><p>我们还可以使用 <em>SequenceLayout</em> 构建数据数组。以下是如何获取五个点的列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">SequenceLayout</span> ptsLayout <span class="token operator">=</span> <span class="token function">sequenceLayout</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> pointLayout<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-3-从-java-调用本地函数" tabindex="-1"><a class="header-anchor" href="#_4-3-从-java-调用本地函数"><span>4.3. 从 Java 调用本地函数</span></a></h3><p>外部函数 API 允许 Java 开发人员使用任何本地库，而无需依赖第三方包装器。它严重依赖于 Method Handles，并提供了三个主要类：<em>Linker</em>、<em>FunctionDescriptor</em> 和 <em>SymbolLookup</em>。</p><p>让我们考虑通过调用 C <em>printf()</em> 函数打印一个 “ <em>Hello world</em>” 消息：</p><div class="language-c line-numbers-mode" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span><span class="token expression">\`</span></span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World from Project Panama Baeldung Article&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们在标准库的类加载器中查找该函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Linker</span> nativeLinker <span class="token operator">=</span> <span class="token class-name">Linker</span><span class="token punctuation">.</span><span class="token function">nativeLinker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">SymbolLookup</span> stdlibLookup <span class="token operator">=</span> nativeLinker<span class="token punctuation">.</span><span class="token function">defaultLookup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">SymbolLookup</span> loaderLookup <span class="token operator">=</span> <span class="token class-name">SymbolLookup</span><span class="token punctuation">.</span><span class="token function">loaderLookup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>Linker</em> 是 JVM 和 C/C++ 本地代码（也称为 C ABI）两个二进制接口之间的桥梁。</p><p>接下来，我们需要描述函数原型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">FunctionDescriptor</span> printfDescriptor <span class="token operator">=</span> <span class="token class-name">FunctionDescriptor</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token constant">JAVA_INT</span><span class="token punctuation">,</span> <span class="token constant">ADDRESS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>值布局 <em>JAVA_INT</em> 和 <em>ADDRESS</em> 分别对应于 C <em>printf()</em> 函数的返回类型和输入：</p><div class="language-c line-numbers-mode" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">printf</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span> __restrict<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，我们获取方法句柄：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> symbolName <span class="token operator">=</span> <span class="token string">&quot;printf&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> greeting <span class="token operator">=</span> <span class="token string">&quot;Hello World from Project Panama Baeldung Article&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">MethodHandle</span> methodHandle <span class="token operator">=</span> loaderLookup<span class="token punctuation">.</span><span class="token function">lookup</span><span class="token punctuation">(</span>symbolName<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">or</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> stdlibLookup<span class="token punctuation">.</span><span class="token function">lookup</span><span class="token punctuation">(</span>symbolName<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>symbolSegment <span class="token operator">-&gt;</span> nativeLinker<span class="token punctuation">.</span><span class="token function">downcallHandle</span><span class="token punctuation">(</span>symbolSegment<span class="token punctuation">,</span> printfDescriptor<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>Linker</em> 接口支持 downcalls（从 Java 代码到本地代码的调用）和 upcalls（从本地代码回 Java 代码的调用）。最后，我们调用本地函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Arena</span> memorySession <span class="token operator">=</span> <span class="token class-name">Arena</span><span class="token punctuation">.</span><span class="token function">ofConfined</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">MemorySegment</span> greetingSegment <span class="token operator">=</span> memorySession<span class="token punctuation">.</span><span class="token function">allocateUtf8String</span><span class="token punctuation">(</span>greeting<span class="token punctuation">)</span><span class="token punctuation">;</span>
    methodHandle<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span>greetingSegment<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了 JExtract，我们不需要直接使用大多数外部函数 &amp; 内存 API 抽象。让我们重新创建上面打印我们的 “ <em>Hello World”</em> 示例。</p><p>首先，我们需要从标准库头文件生成 Java 类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>jextract --source --output src/main -t foreign.c -I c:\\mingw\\include c:\\mingw\\include\\stdio.h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>更新到目标操作系统中的 <em>stdio</em> 路径。接下来，我们可以简单地从 Java <em>import</em> 本地 <em>printf()</em> 函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token keyword">static</span> <span class="token import static"><span class="token namespace">foreign<span class="token punctuation">.</span>c<span class="token punctuation">.</span>stdio_h<span class="token punctuation">.</span>printf</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Greetings</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> greeting <span class="token operator">=</span> <span class="token string">&quot;Hello World from Project Panama Baeldung Article, using JExtract!&quot;</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Arena</span> memorySession <span class="token operator">=</span> <span class="token class-name">Arena</span><span class="token punctuation">.</span><span class="token function">ofConfined</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">MemorySegment</span> greetingSegment <span class="token operator">=</span> memorySession<span class="token punctuation">.</span><span class="token function">allocateUtf8String</span><span class="token punctuation">(</span>greeting<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 在取消注释之前生成JExtract bindings before uncommenting</span>
<span class="token comment">// printf(greetingSegment);</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token class-name">Running</span> the code prints the greeting <span class="token keyword">to</span> <span class="token namespace">the</span> console<span class="token operator">:</span>

\`\`\`java
java <span class="token operator">--</span>enable<span class="token operator">-</span>preview <span class="token operator">--</span>source <span class="token number">21</span> <span class="token punctuation">.</span>\\src\\main\\java\\com\\baeldung\\java\\panama\\jextract\\<span class="token class-name">Greetings</span><span class="token punctuation">.</span>java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了 Project Panama 的关键特性。</p><p>首先，我们探索了使用外部函数和内存 API 进行本地内存管理。然后我们使用 <em>MethodHandles</em> 调用外部函数。最后，我们使用了 JExtract 工具来隐藏外部函数和内存 API 的复杂性。</p><p>Project Panama 还有更多值得探索的地方，特别是从本地代码调用 Java，调用第三方库以及向量 API。</p><p>像往常一样，示例代码可以在 GitHub 上找到。</p><p>OK</p>`,59),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-08-Guide to Java Project Panama.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Guide%20to%20Java%20Project%20Panama.html","title":"Java Project Panama 指南","lang":"zh-CN","frontmatter":{"date":"2022-01-18T00:00:00.000Z","category":["Java","Project Panama"],"tag":["Java","JNI","Foreign Function","Memory API"],"head":[["meta",{"name":"keywords","content":"Java, Project Panama, Foreign Function, Memory API, JExtract"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Guide%20to%20Java%20Project%20Panama.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java Project Panama 指南"}],["meta",{"property":"og:description","content":"Java Project Panama 指南 在本教程中，我们将深入了解 Project Panama 的组件。首先，我们将探索外部函数和内存 API。然后，我们将看到 JExtract 工具如何促进其使用。 2. 什么是 Project Panama？ Project Panama 的目标是简化 Java 与外部（非 Java）API 之间的交互，即..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T21:07:53.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JNI"}],["meta",{"property":"article:tag","content":"Foreign Function"}],["meta",{"property":"article:tag","content":"Memory API"}],["meta",{"property":"article:published_time","content":"2022-01-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T21:07:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java Project Panama 指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-01-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T21:07:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java Project Panama 指南 在本教程中，我们将深入了解 Project Panama 的组件。首先，我们将探索外部函数和内存 API。然后，我们将看到 JExtract 工具如何促进其使用。 2. 什么是 Project Panama？ Project Panama 的目标是简化 Java 与外部（非 Java）API 之间的交互，即..."},"headers":[{"level":2,"title":"2. 什么是 Project Panama？","slug":"_2-什么是-project-panama","link":"#_2-什么是-project-panama","children":[]},{"level":2,"title":"3. 先决条件","slug":"_3-先决条件","link":"#_3-先决条件","children":[]},{"level":2,"title":"4. 外部函数和内存 API","slug":"_4-外部函数和内存-api","link":"#_4-外部函数和内存-api","children":[{"level":3,"title":"4.1. 外部内存分配","slug":"_4-1-外部内存分配","link":"#_4-1-外部内存分配","children":[]},{"level":3,"title":"4.2. 外部内存操作","slug":"_4-2-外部内存操作","link":"#_4-2-外部内存操作","children":[]},{"level":3,"title":"4.3. 从 Java 调用本地函数","slug":"_4-3-从-java-调用本地函数","link":"#_4-3-从-java-调用本地函数","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720472873000,"updatedTime":1720472873000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.08,"words":1824},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Guide to Java Project Panama.md","localizedDate":"2022年1月18日","excerpt":"\\n<p>在本教程中，我们将深入了解 Project Panama 的组件。首先，我们将探索外部函数和内存 API。然后，我们将看到 JExtract 工具如何促进其使用。</p>\\n<h2>2. 什么是 Project Panama？</h2>\\n<p>Project Panama 的目标是简化 Java 与外部（非 Java）API 之间的交互，即用 C、C++ 等编写的本地代码。</p>\\n<p>到目前为止，使用 Java 原生接口（JNI）是从 Java 调用外部函数的解决方案。但 JNI 存在一些缺点，Project Panama 通过以下方式解决了这些问题：</p>\\n<ul>\\n<li>消除了编写 Java 中间本地代码包装器的需要</li>\\n<li>用更具有未来性的内存 API 替代了 ByteBuffer API</li>\\n<li>引入了一种平台无关、安全且内存高效的从 Java 调用本地代码的方法</li>\\n</ul>","autoDesc":true}');export{k as comp,d as data};
