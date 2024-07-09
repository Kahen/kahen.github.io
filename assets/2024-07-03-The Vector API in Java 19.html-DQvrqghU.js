import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DRFG6C5y.js";const p={},e=t(`<h1 id="java-19-中的-vector-api-baeldung" tabindex="-1"><a class="header-anchor" href="#java-19-中的-vector-api-baeldung"><span>Java 19 中的 Vector API | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Vector API 是 Java 生态系统中的一个孵化 API，用于在支持的 CPU 架构上用 Java 表达向量计算。它旨在提供优于等价标量替代方案的向量计算性能提升。</p><p>在 Java 19 中，作为 JEP 426 的一部分，提出了 Vector API 的第四轮孵化。</p><p>在本教程中，我们将探索 Vector API、其相关术语以及如何利用这个 API。</p><h2 id="_2-标量、向量和并行性" tabindex="-1"><a class="header-anchor" href="#_2-标量、向量和并行性"><span>2. 标量、向量和并行性</span></a></h2><p>在深入研究 Vector API 之前，理解 CPU 操作中的标量和向量的概念非常重要。</p><h3 id="_2-1-处理单元和-cpu" tabindex="-1"><a class="header-anchor" href="#_2-1-处理单元和-cpu"><span>2.1. 处理单元和 CPU</span></a></h3><p>CPU 利用多个处理单元来执行操作。<strong>一个处理单元一次只能计算一个值</strong>。<strong>这个值称为标量值，因为它就是那个值</strong>。操作可以是对单个操作数的一元操作，或者是对两个操作数的二元操作。将数字增加 1 是一元操作的一个例子，而将两个数字相加是二元操作。</p><p>一个处理单元执行这些操作需要一定数量的周期。我们以周期来衡量时间。<strong>处理单元可能在执行一个操作时需要 0 个周期，而在执行另一个操作时需要多个周期，例如加法运算</strong>。</p><h3 id="_2-2-并行性" tabindex="-1"><a class="header-anchor" href="#_2-2-并行性"><span>2.2. 并行性</span></a></h3><p>传统的现代 CPU 拥有多个核心，每个核心包含多个能够执行操作的处理单元，这提供了在这些处理单元上同时执行操作的能力。我们可以在它们的核心中运行多个线程，执行它们的程序，我们得到了操作的并行执行。</p><p>当我们有一个庞大的计算任务，例如从一个庞大的数据源中添加大量数字时，我们可以将数据分成更小的数据块，并将它们分配给多个线程，希望我们能得到更快的处理速度。这是进行并行计算的一种方式。</p><h3 id="_2-3-simd-处理器" tabindex="-1"><a class="header-anchor" href="#_2-3-simd-处理器"><span>2.3. SIMD 处理器</span></a></h3><p>我们可以通过使用所谓的 SIMD 处理器以不同的方式进行并行计算。<strong>SIMD 代表单指令多数据</strong>。在这些处理器中，没有多线程的概念。<strong>这些 SIMD 处理器依赖于多个处理单元，并且这些单元在单个 CPU 周期内执行相同的操作，即同时执行</strong>。它们共享执行的程序（指令），但不是底层数据，因此得名。它们对不同的操作数执行相同的操作。</p><p><strong>与处理器从内存中加载标量值不同，SIMD 机器将内存中的整数数组加载到寄存器上然后再进行操作</strong>。SIMD 硬件的组织方式使得数组值的加载操作可以在单个周期内发生。SIMD 机器允许我们在不依赖并发编程的情况下，对数组进行并行计算。</p><p>由于 SIMD 机器将内存视为数组或一系列值，我们称这些为 <em>向量</em>，并且 SIMD 机器执行的任何操作都成为向量操作。因此，这是利用 SIMD 架构原理进行并行处理任务的一种非常强大和高效的方式。</p><p>现在我们知道了向量是什么，让我们尝试理解 Java 提供的 <em>Vector</em> API 的基础知识。在 Java 中，一个 <em>向量</em> 由抽象类 <em>Vector<code>&lt;E&gt;</code></em> 表示。这里，<em>E</em> 是以下标量原始整型（<em>byte</em>, <em>short</em>, <em>int</em>, <em>long</em>）和浮点型（<em>float</em>, double）的包装类型。</p><h3 id="_3-1-形状、种类和通道" tabindex="-1"><a class="header-anchor" href="#_3-1-形状、种类和通道"><span>3.1. 形状、种类和通道</span></a></h3><p>我们只有预定义的空间来存储和操作向量，目前的范围从 64 到 512 位。想象一下，如果我们有一个 <em>Integer</em> 值的 <em>向量</em> 并且我们有 256 位来存储它，我们将总共有 8 个组件。这是因为原始 int 值的大小是 32 位。<strong>这些组件在 <em>Vector</em> API 的上下文中称为通道</strong>。</p><p><strong>向量的形状是向量的位大小或位数</strong>。一个具有 512 位形状的向量将有 16 个通道，并且可以一次操作 16 个 int，而一个 64 位的将只有 2 个。在这里，我们使用术语 <em>通道</em> 来表示数据在 SIMD 机器内的通道中流动的相似性。</p><p>向量的种类是向量的形状和数据类型的组合，例如 int、float 等。它由 <em>VectorSpecies<code>&lt;E&gt;</code></em> 表示。</p><h3 id="_3-2-向量上的通道操作" tabindex="-1"><a class="header-anchor" href="#_3-2-向量上的通道操作"><span>3.2. 向量上的通道操作</span></a></h3><p>大致上有两种类型的向量操作被分类为通道操作和跨通道操作。</p><p>顾名思义，通道操作只对一个或多个向量的单个通道执行标量操作。这些操作可以将一个向量的通道与第二个向量的通道结合起来，例如，在加法操作期间。</p><p>另一方面，跨通道操作可以从向量的不同通道计算或修改数据。对向量组件进行排序是跨通道操作的一个例子。跨通道操作可以从源向量产生标量或不同形状的向量。跨通道操作可以进一步分类为排列和归约操作。</p><h3 id="_3-3-vector-e-api-的层次结构" tabindex="-1"><a class="header-anchor" href="#_3-3-vector-e-api-的层次结构"><span>3.3. <em>Vector<code>&lt;E&gt;</code></em> API 的层次结构</span></a></h3><p><em>Vector<code>&lt;E&gt;</code></em> 类有六个抽象子类，分别对应于六种支持类型：<em>ByteVector, ShortVector, IntVector, LongVector, FloatVector</em> 和 <em>DoubleVector</em>。特定的实现对于 SIMD 机器很重要，这就是为什么针对每种类型的形状特定子类进一步扩展了这些类。例如 <em>Int128Vector</em>, <em>Int512Vector</em> 等。</p><h2 id="_4-使用-vector-api-进行计算" tabindex="-1"><a class="header-anchor" href="#_4-使用-vector-api-进行计算"><span>4. 使用 Vector API 进行计算</span></a></h2><p>让我们最后看看一些 <em>Vector</em> API 代码。我们将在接下来的部分中查看通道操作和跨通道操作。</p><h3 id="_4-1-添加两个数组" tabindex="-1"><a class="header-anchor" href="#_4-1-添加两个数组"><span>4.1. 添加两个数组</span></a></h3><p>我们想要添加两个整数数组，并将信息存储在第三个数组中。传统的标量方法是：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">addTwoScalarArrays</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr1<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>arr1<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> arr1<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> arr1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> arr2<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们用向量的方式编写相同的代码。Vector API 包在 <em>jdk.incubator.vector</em> 下可用，我们需要将其导入到我们的类中。</p><p>由于我们将处理向量，我们需要做的第一件事是从两个数组创建向量。我们使用 Vector API 的 <em>fromArray()</em> 方法来完成这一步。这个方法要求我们提供我们想要创建的向量的物种以及从哪里开始加载数组的起始偏移量。</p><p>在我们的案例中，偏移量将是 0，因为我们想从开始加载整个数组。我们可以使用默认的 <em>SPECIES_PREFERRED</em> 作为我们的物种，它使用适合其平台的最大位大小：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">VectorSpecies</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` <span class="token constant">SPECIES</span> <span class="token operator">=</span> <span class="token class-name">IntVector</span><span class="token punctuation">.</span><span class="token constant">SPECIES_PREFERRED</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">var</span> v1 <span class="token operator">=</span> <span class="token class-name">IntVector</span><span class="token punctuation">.</span><span class="token function">fromArray</span><span class="token punctuation">(</span><span class="token constant">SPECIES</span><span class="token punctuation">,</span> arr1<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> v2 <span class="token operator">=</span> <span class="token class-name">IntVector</span><span class="token punctuation">.</span><span class="token function">fromArray</span><span class="token punctuation">(</span><span class="token constant">SPECIES</span><span class="token punctuation">,</span> arr2<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们从数组中获得了两个向量，我们使用一个向量的 <em>add()</em> 方法通过传递第二个向量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">var</span> result <span class="token operator">=</span> v1<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>v2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，我们将向量结果转换为数组并返回：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">addTwoVectorArrays</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr1<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> v1 <span class="token operator">=</span> <span class="token class-name">IntVector</span><span class="token punctuation">.</span><span class="token function">fromArray</span><span class="token punctuation">(</span><span class="token constant">SPECIES</span><span class="token punctuation">,</span> arr1<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> v2 <span class="token operator">=</span> <span class="token class-name">IntVector</span><span class="token punctuation">.</span><span class="token function">fromArray</span><span class="token punctuation">(</span><span class="token constant">SPECIES</span><span class="token punctuation">,</span> arr2<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> result <span class="token operator">=</span> v1<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>v2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>考虑到上述代码在 SIMD 机器上运行，加法操作将在同一 CPU 周期内添加两个向量的所有通道。</p><h3 id="_4-2-vectormasks" tabindex="-1"><a class="header-anchor" href="#_4-2-vectormasks"><span>4.2. <em>VectorMasks</em></span></a></h3><p>上面演示的代码也有其局限性。它只有在向量的大小能够匹配 SIMD 机器可以处理的通道数量时才能很好地运行并提供所宣传的性能。这引入了使用向量掩码的概念，由 <em>VectorMasks<code>&lt;E&gt;</code></em> 表示，它就像一个布尔值数组。当我们无法将整个输入数据填充到我们的向量中时，我们会借助 <em>VectorMasks</em>。</p><p>掩码选择要应用操作的通道。如果通道中的相应值为 true，则应用操作；如果为 false，则执行不同的回退操作。</p><p>这些掩码帮助我们独立于向量形状和大小执行操作。我们可以使用预定义的 <em>length()</em> 方法，它将在运行时返回向量的形状。</p><p>以下是一段稍微修改过的代码，使用掩码帮助我们以向量长度为步长迭代输入数组，然后进行尾部清理：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">addTwoVectorsWithMasks</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr1<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> finalResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>arr1<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> <span class="token constant">SPECIES</span><span class="token punctuation">.</span><span class="token function">loopBound</span><span class="token punctuation">(</span>arr1<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span> i <span class="token operator">+=</span> <span class="token constant">SPECIES</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> mask <span class="token operator">=</span> <span class="token constant">SPECIES</span><span class="token punctuation">.</span><span class="token function">indexInRange</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> arr1<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> v1 <span class="token operator">=</span> <span class="token class-name">IntVector</span><span class="token punctuation">.</span><span class="token function">fromArray</span><span class="token punctuation">(</span><span class="token constant">SPECIES</span><span class="token punctuation">,</span> arr1<span class="token punctuation">,</span> i<span class="token punctuation">,</span> mask<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> v2 <span class="token operator">=</span> <span class="token class-name">IntVector</span><span class="token punctuation">.</span>fromVector<span class="token punctuation">.</span><span class="token function">fromArray</span><span class="token punctuation">(</span><span class="token constant">SPECIES</span><span class="token punctuation">,</span> arr2<span class="token punctuation">,</span> i<span class="token punctuation">,</span> mask<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> result <span class="token operator">=</span> v1<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>v2<span class="token punctuation">,</span> mask<span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">intoArray</span><span class="token punctuation">(</span>finalResult<span class="token punctuation">,</span> i<span class="token punctuation">,</span> mask<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 尾部清理循环</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr1<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        finalResult<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> arr1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> arr2<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> finalResult<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码现在更加安全地执行，并且独立于向量的形状运行。</p><h3 id="_4-3-计算向量的范数" tabindex="-1"><a class="header-anchor" href="#_4-3-计算向量的范数"><span>4.3. 计算向量的范数</span></a></h3><p>在这一部分，我们看另一个简单的数学计算，两个值的范数。范数是我们在添加两个值的平方后进行平方根的结果。</p><p>让我们先看看标量操作的样子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">scalarNormOfTwoArrays</span><span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr1<span class="token punctuation">,</span> <span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> finalResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">float</span><span class="token punctuation">[</span>arr1<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr1<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        finalResult<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span>arr1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">*</span> arr1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> arr2<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">*</span> arr2<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> finalResult<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们尝试编写上述代码的向量替代版本。</p><p>首先，我们获取我们优选的 <em>FloatVector</em> 类型的物种，这在这种情况下是最佳的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">VectorSpecies</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Float</span><span class="token punctuation">&gt;</span></span>\` <span class="token constant">PREFERRED_SPECIES</span> <span class="token operator">=</span> <span class="token class-name">FloatVector</span><span class="token punctuation">.</span><span class="token constant">SPECIES_PREFERRED</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们将使用我们在前一节中讨论的掩码的概念。我们的循环运行到第一个数组的 <em>loopBound</em> 值，并以 <em>物种</em> 长度的步长进行。在每一步中，我们将浮点值加载到向量中，并执行与我们的标量版本相同的数学运算。</p><p>最后，我们对剩余的元素进行尾部清理，使用普通的标量循环。最终的代码与我们之前的例子非常相似：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">vectorNormalForm</span><span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr1<span class="token punctuation">,</span> <span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> finalResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">float</span><span class="token punctuation">[</span>arr1<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> upperBound <span class="token operator">=</span> <span class="token constant">SPECIES</span><span class="token punctuation">.</span><span class="token function">loopBound</span><span class="token punctuation">(</span>arr1<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> upperBound<span class="token punctuation">;</span> i <span class="token operator">+=</span> <span class="token constant">SPECIES</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> va <span class="token operator">=</span> <span class="token class-name">FloatVector</span><span class="token punctuation">.</span><span class="token function">fromArray</span><span class="token punctuation">(</span><span class="token constant">PREFERRED_SPECIES</span><span class="token punctuation">,</span> arr1<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> vb <span class="token operator">=</span> <span class="token class-name">FloatVector</span><span class="token punctuation">.</span><span class="token function">fromArray</span><span class="token punctuation">(</span><span class="token constant">PREFERRED_SPECIES</span><span class="token punctuation">,</span> arr2<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> vc <span class="token operator">=</span> va<span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>va<span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>vb<span class="token punctuation">.</span><span class="token function">mul</span><span class="token punctuation">(</span>vb<span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        vc<span class="token punctuation">.</span><span class="token function">intoArray</span><span class="token punctuation">(</span>finalResult<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 尾部清理</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr1<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        finalResult<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span>arr1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">*</span> arr1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> arr2<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">*</span> arr2<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> finalResult<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-归约操作" tabindex="-1"><a class="header-anchor" href="#_4-4-归约操作"><span>4.4. 归约操作</span></a></h3><p><em>Vector</em> API 中的归约操作指的是将向量中的多个元素组合成单个结果的操作。它允许我们执行如求向量元素的和或找到向量中的最大值、最小值和平均值等计算。</p><p><em>Vector</em> API 提供了多种归约操作功能，可以利用 SIMD 架构的机器。一些常见的 API 包括：</p><ul><li><em>reduceLanes()</em>: 这个方法接受一个数学运算，如 ADD，并将向量中的所有元素组合成单个值。</li><li><em>reduceAll()</em>: 这个方法与上述类似，但它期望一个可以接收两个值并输出单个值的二元归约操作。</li><li><em>reduceLaneWise()</em>: 这个方法在特定通道中归约元素，并生成一个具有归约通道值的向量。</li></ul><p>我们将看到一个计算向量平均值的例子。</p><p>我们可以使用 <em>reduceLanes(ADD)</em> 来计算所有元素的和，然后通过数组的长度进行标量除法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">averageOfaVector</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">+=</span> <span class="token constant">SPECIES</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> mask <span class="token operator">=</span> <span class="token constant">SPECIES</span><span class="token punctuation">.</span><span class="token function">indexInRange</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> <span class="token class-name">V</span> <span class="token operator">=</span> <span class="token class-name">IntVector</span><span class="token punctuation">.</span><span class="token function">fromArray</span><span class="token punctuation">(</span><span class="token constant">SPECIES</span><span class="token punctuation">,</span> arr<span class="token punctuation">,</span> i<span class="token punctuation">,</span> mask<span class="token punctuation">)</span><span class="token punctuation">;</span>
        sum <span class="token operator">+=</span> <span class="token class-name">V</span><span class="token punctuation">.</span><span class="token function">reduceLanes</span><span class="token punctuation">(</span><span class="token class-name">VectorOperators</span><span class="token punctuation">.</span><span class="token constant">ADD</span><span class="token punctuation">,</span> mask<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> sum <span class="token operator">/</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-与-vector-api-相关的注意事项" tabindex="-1"><a class="header-anchor" href="#_5-与-vector-api-相关的注意事项"><span>5. 与 <em>Vector</em> API 相关的注意事项</span></a></h2><p>虽然我们可以欣赏 <em>Vector</em> API 的好处，但我们应该谨慎接受。首先，这个 API 仍在孵化阶段。然而，有一个计划是将向量类声明为原始类。</p><p>如上所述，<em>Vector</em> API 具有硬件依赖性，因为它依赖于 SIMD 指令。许多功能可能在其他平台和架构上不可用。此外，维护向量化操作总是比传统的标量操作有额外开销。</p><p>在不了解底层架构的情况下，在通用硬件上对向量操作进行基准比较也很困难。然而，JEP 提供了一些执行此操作的指导。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>尽管要谨慎使用，但使用 <em>Vector</em> API 的好处是巨大的。性能提升和简化的操作矢量化为图形行业、大规模计算等提供了好处。我们查看了与 <em>Vector</em> API 相关的重要术语。我们还深入探讨了一些代码示例。</p><p>像往常一样，所有代码示例都可以在 GitHub 上找到。</p><p>OK</p>`,75),o=[e];function c(l,u){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-03-The Vector API in Java 19.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-The%20Vector%20API%20in%20Java%2019.html","title":"Java 19 中的 Vector API | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-04T00:00:00.000Z","category":["Java","编程"],"tag":["Vector API","Java 19"],"head":[["meta",{"name":"keywords","content":"Java, Vector API, SIMD, 性能优化"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-The%20Vector%20API%20in%20Java%2019.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 19 中的 Vector API | Baeldung"}],["meta",{"property":"og:description","content":"Java 19 中的 Vector API | Baeldung 1. 引言 Vector API 是 Java 生态系统中的一个孵化 API，用于在支持的 CPU 架构上用 Java 表达向量计算。它旨在提供优于等价标量替代方案的向量计算性能提升。 在 Java 19 中，作为 JEP 426 的一部分，提出了 Vector API 的第四轮孵化。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T21:56:13.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Vector API"}],["meta",{"property":"article:tag","content":"Java 19"}],["meta",{"property":"article:published_time","content":"2024-07-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T21:56:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 19 中的 Vector API | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-04T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T21:56:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 19 中的 Vector API | Baeldung 1. 引言 Vector API 是 Java 生态系统中的一个孵化 API，用于在支持的 CPU 架构上用 Java 表达向量计算。它旨在提供优于等价标量替代方案的向量计算性能提升。 在 Java 19 中，作为 JEP 426 的一部分，提出了 Vector API 的第四轮孵化。 ..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 标量、向量和并行性","slug":"_2-标量、向量和并行性","link":"#_2-标量、向量和并行性","children":[{"level":3,"title":"2.1. 处理单元和 CPU","slug":"_2-1-处理单元和-cpu","link":"#_2-1-处理单元和-cpu","children":[]},{"level":3,"title":"2.2. 并行性","slug":"_2-2-并行性","link":"#_2-2-并行性","children":[]},{"level":3,"title":"2.3. SIMD 处理器","slug":"_2-3-simd-处理器","link":"#_2-3-simd-处理器","children":[]},{"level":3,"title":"3.1. 形状、种类和通道","slug":"_3-1-形状、种类和通道","link":"#_3-1-形状、种类和通道","children":[]},{"level":3,"title":"3.2. 向量上的通道操作","slug":"_3-2-向量上的通道操作","link":"#_3-2-向量上的通道操作","children":[]},{"level":3,"title":"3.3. Vector<E> API 的层次结构","slug":"_3-3-vector-e-api-的层次结构","link":"#_3-3-vector-e-api-的层次结构","children":[]}]},{"level":2,"title":"4. 使用 Vector API 进行计算","slug":"_4-使用-vector-api-进行计算","link":"#_4-使用-vector-api-进行计算","children":[{"level":3,"title":"4.1. 添加两个数组","slug":"_4-1-添加两个数组","link":"#_4-1-添加两个数组","children":[]},{"level":3,"title":"4.2. VectorMasks","slug":"_4-2-vectormasks","link":"#_4-2-vectormasks","children":[]},{"level":3,"title":"4.3. 计算向量的范数","slug":"_4-3-计算向量的范数","link":"#_4-3-计算向量的范数","children":[]},{"level":3,"title":"4.4. 归约操作","slug":"_4-4-归约操作","link":"#_4-4-归约操作","children":[]}]},{"level":2,"title":"5. 与 Vector API 相关的注意事项","slug":"_5-与-vector-api-相关的注意事项","link":"#_5-与-vector-api-相关的注意事项","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720043773000,"updatedTime":1720043773000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":10.39,"words":3117},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-The Vector API in Java 19.md","localizedDate":"2024年7月4日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>Vector API 是 Java 生态系统中的一个孵化 API，用于在支持的 CPU 架构上用 Java 表达向量计算。它旨在提供优于等价标量替代方案的向量计算性能提升。</p>\\n<p>在 Java 19 中，作为 JEP 426 的一部分，提出了 Vector API 的第四轮孵化。</p>\\n<p>在本教程中，我们将探索 Vector API、其相关术语以及如何利用这个 API。</p>\\n<h2>2. 标量、向量和并行性</h2>\\n<p>在深入研究 Vector API 之前，理解 CPU 操作中的标量和向量的概念非常重要。</p>\\n<h3>2.1. 处理单元和 CPU</h3>","autoDesc":true}');export{k as comp,d as data};
