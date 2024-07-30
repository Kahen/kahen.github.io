import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-CbPcg273.js";const t={},p=e(`<h1 id="java-17-新特性概览" tabindex="-1"><a class="header-anchor" href="#java-17-新特性概览"><span>Java 17 新特性概览</span></a></h1><p>在本教程中，我们将讨论Java生态系统新版本Java SE 17的相关信息，包括新特性以及其发布过程、长期支持(LTS)和许可证的变更。</p><h2 id="从java-8迁移到java-17" tabindex="-1"><a class="header-anchor" href="#从java-8迁移到java-17"><span>从Java 8迁移到Java 17</span></a></h2><p>探索Java较新版本中提供的极为有用的特性。这些特性不仅易于学习，而且在计划从Java 8迁移到Java 17时，也可以快速实施，几乎不需要太多努力。</p><h2 id="jep列表" tabindex="-1"><a class="header-anchor" href="#jep列表"><span>JEP列表</span></a></h2><p>首先，让我们谈谈可能影响Java开发者日常工作的变化。</p><h3 id="_2-1-恢复始终严格的浮点运算语义-jep-306" tabindex="-1"><a class="header-anchor" href="#_2-1-恢复始终严格的浮点运算语义-jep-306"><span>2.1. 恢复始终严格的浮点运算语义 (JEP 306)</span></a></h3><p>这个JEP主要是针对科学应用，它使浮点运算始终严格一致。<strong>默认的浮点运算现在是_strict_或_strictfp_，两者都保证了在每个平台上进行浮点计算时得到相同的结果。</strong></p><p>在Java 1.2之前，默认行为也是_strictfp_。然而，由于硬件问题，架构师改变了这一行为，需要使用关键字_strictfp_来重新启用这种行为。因此，现在不再需要使用这个关键字了。</p><h3 id="_2-2-增强的伪随机数生成器-jep-356" tabindex="-1"><a class="header-anchor" href="#_2-2-增强的伪随机数生成器-jep-356"><span>2.2. 增强的伪随机数生成器 (JEP 356)</span></a></h3><p>同样与更特殊的用例相关，JEP 356为伪随机数生成器(PRNG)提供了新的接口和实现。</p><p>因此，更容易交替使用不同的算法，并且它还为基于流的编程提供了更好的支持：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">IntStream</span> <span class="token function">getPseudoInts</span><span class="token punctuation">(</span><span class="token class-name">String</span> algorithm<span class="token punctuation">,</span> <span class="token keyword">int</span> streamSize<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 返回一个大小为@streamSize的IntStream，使用@algorithm生成的随机数</span>
    <span class="token comment">// 其中下限是0，上限是100（不包括）</span>
    <span class="token keyword">return</span> <span class="token class-name">RandomGeneratorFactory</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>algorithm<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">ints</span><span class="token punctuation">(</span>streamSize<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>旧的随机类，如_java.util.Random_、_SplittableRandom_和_SecureRandom_现在扩展了新的_RandomGenerator_接口。</p><h3 id="_2-3-新的macos渲染管线-jep-382" tabindex="-1"><a class="header-anchor" href="#_2-3-新的macos渲染管线-jep-382"><span>2.3. 新的macOS渲染管线 (JEP 382)</span></a></h3><p>由于Apple在其macOS 10.14中弃用了OpenGL API（Swing GUI内部使用），这个JEP实现了Java 2D内部渲染管线。新实现使用了Apple Metal API，除了内部引擎外，现有API没有变化。</p><h3 id="_2-4-macos-aarch64端口-jep-391" tabindex="-1"><a class="header-anchor" href="#_2-4-macos-aarch64端口-jep-391"><span>2.4. macOS/AArch64端口 (JEP 391)</span></a></h3><p>Apple宣布了一个长期计划，将其计算机产品线从X64过渡到AArch64。这个JEP将JDK移植到在macOS平台上运行AArch64。</p><h3 id="_2-5-弃用applet-api以供移除-jep-398" tabindex="-1"><a class="header-anchor" href="#_2-5-弃用applet-api以供移除-jep-398"><span>2.5. 弃用Applet API以供移除 (JEP 398)</span></a></h3><p>尽管这可能让许多使用Applet API开始其开发生涯的Java开发者感到悲伤，但许多网络浏览器已经移除了对Java插件的支持。由于API变得不再相关，即使自版本9以来已被标记为弃用，这个版本还是将其标记为移除。</p><h3 id="_2-6-强封装jdk内部-jep-403" tabindex="-1"><a class="header-anchor" href="#_2-6-强封装jdk内部-jep-403"><span>2.6. 强封装JDK内部 (JEP 403)</span></a></h3><p>JEP 403是向强封装JDK内部迈出的又一步，因为它移除了_–illegal-access_标志。平台将忽略该标志，如果存在该标志，控制台将发出消息，通知标志的终止。</p><p><strong>这个特性将防止JDK用户访问内部API，除了像_sun.misc.Unsafe_这样关键的API。</strong></p><h3 id="_2-7-switch的模式匹配-预览-jep-406" tabindex="-1"><a class="header-anchor" href="#_2-7-switch的模式匹配-预览-jep-406"><span>2.7. Switch的模式匹配（预览） (JEP 406)</span></a></h3><p>这是通过增强switch表达式和语句的模式匹配，向模式匹配迈出的另一步。它减少了定义这些表达式所需的样板代码，并提高了语言的表达能力。</p><p>让我们看两个新功能的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">record</span> <span class="token class-name">Human</span> <span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">,</span> <span class="token class-name">String</span> profession<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">checkObject</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token class-name">Human</span> h <span class="token operator">-&gt;</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;Name: %s, age: %s and profession: %s&quot;</span><span class="token punctuation">,</span> h<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> h<span class="token punctuation">.</span><span class="token function">age</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> h<span class="token punctuation">.</span><span class="token function">profession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token class-name">Circle</span> c <span class="token operator">-&gt;</span> <span class="token string">&quot;This is a circle&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token class-name">Shape</span> s <span class="token operator">-&gt;</span> <span class="token string">&quot;It is just a shape&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token keyword">null</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;It is null&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;It is an object&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">checkShape</span><span class="token punctuation">(</span><span class="token class-name">Shape</span> shape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>shape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token class-name">Triangle</span> t <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token function">getNumberOfSides</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;This is a weird triangle&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token class-name">Circle</span> c <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">getNumberOfSides</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;This is a weird circle&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;Just a normal shape&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-8-移除rmi激活-jep-407" tabindex="-1"><a class="header-anchor" href="#_2-8-移除rmi激活-jep-407"><span>2.8. 移除RMI激活 (JEP 407)</span></a></h3><p>在版本15中被标记为移除的这个JEP，在版本17中从平台中移除了RMI激活API。</p><h3 id="_2-9-密封类-jep-409" tabindex="-1"><a class="header-anchor" href="#_2-9-密封类-jep-409"><span>2.9. 密封类 (JEP 409)</span></a></h3><p>密封类是Project Amber的一部分，这个JEP正式引入了语言中的一个新特性，尽管它在JDK版本15和16中以预览模式提供。</p><p>这个特性限制了哪些其他类或接口可以扩展或实现一个密封组件。展示与JEP 406结合的另一个改进将允许更复杂、更清洁的类型检查、类型转换和行为代码模式。</p><p>让我们看看它在行动中的样子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">getNumberOfSides</span><span class="token punctuation">(</span><span class="token class-name">Shape</span> shape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>shape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token class-name">WeirdTriangle</span> t <span class="token operator">-&gt;</span> t<span class="token punctuation">.</span><span class="token function">getNumberOfSides</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token class-name">Circle</span> c <span class="token operator">-&gt;</span> c<span class="token punctuation">.</span><span class="token function">getNumberOfSides</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token class-name">Triangle</span> t <span class="token operator">-&gt;</span> t<span class="token punctuation">.</span><span class="token function">getNumberOfSides</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token class-name">Rectangle</span> r <span class="token operator">-&gt;</span> r<span class="token punctuation">.</span><span class="token function">getNumberOfSides</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token class-name">Square</span> s <span class="token operator">-&gt;</span> s<span class="token punctuation">.</span><span class="token function">getNumberOfSides</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-10-移除实验性的aot和jit编译器-jep-410" tabindex="-1"><a class="header-anchor" href="#_2-10-移除实验性的aot和jit编译器-jep-410"><span>2.10. 移除实验性的AOT和JIT编译器 (JEP 410)</span></a></h3><p>分别作为实验特性在JDK 9和JDK 10中引入的Ahead-Of-Time (AOT)编译（JEP 295）和来自GraalVM的Just-In-Time (JIT)编译器（JEP-317）具有很高的维护成本。</p><p>另一方面，它们没有得到显著的采用。因此，这个JEP从平台中移除了它们，但开发者仍然可以利用GraalVM使用它们。</p><h3 id="_2-11-弃用安全管理员以供移除-jep-411" tabindex="-1"><a class="header-anchor" href="#_2-11-弃用安全管理员以供移除-jep-411"><span>2.11. 弃用安全管理员以供移除 (JEP 411)</span></a></h3><p>旨在保护客户端Java代码的安全管理员是另一个由于不再相关而被标记为移除的特性。</p><h3 id="_2-12-外部函数和内存api-孵化器-jep-412" tabindex="-1"><a class="header-anchor" href="#_2-12-外部函数和内存api-孵化器-jep-412"><span>2.12. 外部函数和内存API（孵化器） (JEP 412)</span></a></h3><p>外部函数和内存API允许Java开发者访问JVM外部的代码并管理堆外内存。目标是替换JNI API并提高与旧API相比的安全性和性能。</p><p>这个API是Project Panama开发的另一个特性，它已经发展并由JEPs 393、389、383和370预先发展。</p><p>有了这个特性，我们可以从Java类调用C库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">SymbolLookup</span> libLookup<span class="token punctuation">;</span>

<span class="token keyword">static</span> <span class="token punctuation">{</span>
    <span class="token comment">// 加载特定的C库</span>
    <span class="token keyword">var</span> path <span class="token operator">=</span> <span class="token constant">JEP412</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token string">&quot;/print_name.so&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>
    libLookup <span class="token operator">=</span> <span class="token class-name">SymbolLookup</span><span class="token punctuation">.</span><span class="token function">loaderLookup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，需要加载我们希望通过API调用的目标库。</p><p>接下来，需要指定目标方法的签名，最后调用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getPrintNameFormat</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">var</span> printMethod <span class="token operator">=</span> libLookup<span class="token punctuation">.</span><span class="token function">lookup</span><span class="token punctuation">(</span><span class="token string">&quot;printName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>printMethod<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> methodReference <span class="token operator">=</span> <span class="token class-name">CLinker</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">downcallHandle</span><span class="token punctuation">(</span>
                printMethod<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token class-name">MethodType</span><span class="token punctuation">.</span><span class="token function">methodType</span><span class="token punctuation">(</span><span class="token class-name">MemoryAddress</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">MemoryAddress</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token class-name">FunctionDescriptor</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">CLinker</span><span class="token punctuation">.</span><span class="token constant">C_POINTER</span><span class="token punctuation">,</span> <span class="token class-name">CLinker</span><span class="token punctuation">.</span><span class="token constant">C_POINTER</span><span class="token punctuation">)</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">var</span> nativeString <span class="token operator">=</span> <span class="token class-name">CLinker</span><span class="token punctuation">.</span><span class="token function">toCString</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token function">newImplicitScope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">var</span> invokeReturn <span class="token operator">=</span> methodReference<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span>nativeString<span class="token punctuation">.</span><span class="token function">address</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">var</span> memoryAddress <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">MemoryAddress</span><span class="token punctuation">)</span> invokeReturn<span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token class-name">CLinker</span><span class="token punctuation">.</span><span class="token function">toJavaString</span><span class="token punctuation">(</span>memoryAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>throwable<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;printName function not found.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-13-向量api-第二次孵化器-jep-414" tabindex="-1"><a class="header-anchor" href="#_2-13-向量api-第二次孵化器-jep-414"><span>2.13. 向量API（第二次孵化器） (JEP 414)</span></a></h3><p>向量API处理SIMD（单指令，多数据）类型的操作，意味着在并行执行多组指令。它利用支持向量指令的专用CPU硬件，并允许将这些指令作为流水线执行。</p><p>结果，新API将使开发者能够实现更高效的代码，利用底层硬件的潜力。</p><p>这种操作的日常用例包括科学代数线性应用、图像处理、字符处理以及任何需要对多个独立操作数应用操作的重算术应用或任何应用。</p><p>让我们使用API来说明一个简单的向量乘法示例：</p><p><code>java</code>java public void newVectorComputation(float[] a, float[] b, float[] c) { for (var i = 0; i &lt; a.length; i += SPECIES.length()) { var m = SPECIES.indexInRange(i, a.length); var va = FloatVector.fromArray(SPECIES, a, i, m); var vb = FloatVector.fromArray(SPECIES, b, i, m); var vc = va.mul(vb); vc.intoArray(c, i, m); } }</p><p>public void commonVectorComputation(float[] a, float[] b, float[] c) { for (var i = 0; i &lt; a.length; i++) { c[i] = a[i] * b[i]; } }</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
### 2.14. 上下文特定的反序列化过滤器 (JEP 415)

JEP 290首次在JDK 9中引入，使我们能够验证来自不受信任来源的传入序列化数据，这是许多安全问题的常见来源。该验证发生在JVM级别，提供了更多的安全性和健壮性。

有了JEP 415，应用程序可以配置在JVM级别定义的上下文特定和动态选择的反序列化过滤器。每个反序列化操作将调用这样的过滤器。

## 3. LTS定义

变化不仅仅停留在代码中——流程也在变化。

Java平台发布有着漫长而不确定的历史。尽管设计为每三年发布一次，但常常变成了四年的过程。

此外，鉴于市场新动态，创新和快速响应成为必须，负责平台发展的团队决定改变发布节奏以适应新现实。

结果，自Java 10（2018年3月20日发布）以来采用了新的六个月功能发布模型。

### 3.1. 六个月功能发布模型

新的六个月功能发布模型允许平台开发者在功能准备好时发布。这消除了将功能推入发布的压力。否则，他们将不得不等待三到四年才能使功能对平台用户可用。

新模型还改善了用户与平台架构师之间的反馈周期。这是因为功能可以以孵化模式提供，并且只有在多次交互后才发布供一般使用。

### 3.2. LTS模型

由于企业应用程序广泛使用Java，稳定性至关重要。此外，持续支持并为所有这些版本提供补丁更新的成本很高。

因此，创建了长期支持（LTS）版本，为用户提供延长支持。因此，这些版本由于错误修复、性能改进和安全补丁而自然变得更加稳定和安全。在Oracle的情况下，这种支持通常持续八年。

自从引入发布模型的变化以来，LTS版本是Java SE 11（2018年9月发布）和Java SE 17（2021年9月发布）。然而，版本17为模型带来了一些新东西。简而言之，LTS版本之间的间隔现在是两年而不是三年，使Java 21（计划于2023年9月发布）可能是下一个LTS。

另一个值得一提的要点是，这种发布模型并不新鲜。它被无耻地复制并适应于其他项目，如Mozilla Firefox、Ubuntu等，这些模型在那里已经证明了自己。

## 4. 新的发布过程

我们基于JEP 3编写了这篇文章，因为它描述了所有流程的变化。请参阅它以获取更多详细信息。我们将在这里提供一个简洁的摘要。

鉴于上述新模型，结合平台的持续发展和新的六个月发布节奏（通常是6月和12月），Java将更快地移动。JDK的开发团队将根据下面描述的过程启动下一个功能发布的发布周期。

流程从主线的分叉开始。然后，在稳定化存储库JDK/JDK$N（例如，JDK17）中继续开发，重点放在发布稳定化上。

在我们深入流程之前，让我们澄清一些术语：

- **错误**：在此上下文中，错误意味着票据或任务：
  - **当前**：这些要么是与当前版本（即将发布的新版本）相关的实际错误，要么是已经包含在此版本的新功能（新JEP）的调整。
  - **目标**：与旧版本相关，并计划在此新版本中修复或解决
- **优先级**：从P1到P5，P1最重要，重要性逐渐减少到P5

### 4.1. 新格式

稳定化过程持续三个月：

- JDK/JDK$N存储库像发布分支一样工作，在这一点上，没有新的JEP或新的JEP进入存储库。
- 接下来，这个存储库中的发展将被稳定化并移植到主线，其他发展在那里继续。
- Ramp Down Phase 1 (RDP 1)：持续四到五周。开发者放弃所有当前的P4-P5和目标的P1-P3（根据推迟、修复或增强）。这意味着P5+测试/文档错误和目标的P3+代码错误是可选的。
- Ramp Down Phase 2 (RDP 2)：持续三到四周。现在他们推迟所有当前的P3-P5和目标的P1-P3（根据推迟、修复或增强）。
- 最后，团队发布一个候选版本构建并将其提供给公众。这个阶段持续两到五周，并且只解决当前的P1修复（使用修复）。

一旦所有这些周期完成，新版本就成为通用可用性（GA）版本。

## 5. 接下来是什么？

JDK架构师继续致力于许多项目，旨在现代化平台。目标是提供更好的开发体验以及更强大和性能更好的API。

因此，JDK 18应该在六个月后发布，尽管这个版本不太可能包含重大或破坏性的变化。我们可以在官方OpenJDK项目门户中关注针对这个版本的提议JEP列表。

另一个影响当前和未来版本的相关新闻是新的无费用条款和条件许可证，适用于Oracle JDK发行版（或Hotspot）。在大多数情况下，Oracle为其发行版提供免费的生产和其他环境，但有一些例外。再次，请参考链接。

如前所述，**新流程将下一个LTS版本定位为版本21，计划在2023年9月发布。**

## 6. 结论

在本文中，我们查看了有关新Java 17版本的新闻，了解了其最新发展、新功能、支持定义和发布周期流程。

像往常一样，本文中使用的所有代码示例都可以在GitHub上找到。

OK</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,55),c=[p];function i(l,o){return s(),a("div",null,c)}const d=n(t,[["render",i],["__file","2024-07-24-New Features in Java 17.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-24/2024-07-24-New%20Features%20in%20Java%2017.html","title":"Java 17 新特性概览","lang":"zh-CN","frontmatter":{"date":"2022-04-07T00:00:00.000Z","category":["Java","Java 17"],"tag":["Java 17","新特性"],"head":[["meta",{"name":"keywords","content":"Java 17, Java 17 新特性, JEP 306, JEP 356, JEP 382, JEP 391, JEP 398, JEP 403, JEP 406, JEP 409, JEP 410, JEP 411, JEP 412, JEP 414, JEP 415, 长期支持版本, 发布周期"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-24/2024-07-24-New%20Features%20in%20Java%2017.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 17 新特性概览"}],["meta",{"property":"og:description","content":"Java 17 新特性概览 在本教程中，我们将讨论Java生态系统新版本Java SE 17的相关信息，包括新特性以及其发布过程、长期支持(LTS)和许可证的变更。 从Java 8迁移到Java 17 探索Java较新版本中提供的极为有用的特性。这些特性不仅易于学习，而且在计划从Java 8迁移到Java 17时，也可以快速实施，几乎不需要太多努力。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-24T17:54:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 17"}],["meta",{"property":"article:tag","content":"新特性"}],["meta",{"property":"article:published_time","content":"2022-04-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-24T17:54:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 17 新特性概览\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-07T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-24T17:54:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 17 新特性概览 在本教程中，我们将讨论Java生态系统新版本Java SE 17的相关信息，包括新特性以及其发布过程、长期支持(LTS)和许可证的变更。 从Java 8迁移到Java 17 探索Java较新版本中提供的极为有用的特性。这些特性不仅易于学习，而且在计划从Java 8迁移到Java 17时，也可以快速实施，几乎不需要太多努力。 ..."},"headers":[{"level":2,"title":"从Java 8迁移到Java 17","slug":"从java-8迁移到java-17","link":"#从java-8迁移到java-17","children":[]},{"level":2,"title":"JEP列表","slug":"jep列表","link":"#jep列表","children":[{"level":3,"title":"2.1. 恢复始终严格的浮点运算语义 (JEP 306)","slug":"_2-1-恢复始终严格的浮点运算语义-jep-306","link":"#_2-1-恢复始终严格的浮点运算语义-jep-306","children":[]},{"level":3,"title":"2.2. 增强的伪随机数生成器 (JEP 356)","slug":"_2-2-增强的伪随机数生成器-jep-356","link":"#_2-2-增强的伪随机数生成器-jep-356","children":[]},{"level":3,"title":"2.3. 新的macOS渲染管线 (JEP 382)","slug":"_2-3-新的macos渲染管线-jep-382","link":"#_2-3-新的macos渲染管线-jep-382","children":[]},{"level":3,"title":"2.4. macOS/AArch64端口 (JEP 391)","slug":"_2-4-macos-aarch64端口-jep-391","link":"#_2-4-macos-aarch64端口-jep-391","children":[]},{"level":3,"title":"2.5. 弃用Applet API以供移除 (JEP 398)","slug":"_2-5-弃用applet-api以供移除-jep-398","link":"#_2-5-弃用applet-api以供移除-jep-398","children":[]},{"level":3,"title":"2.6. 强封装JDK内部 (JEP 403)","slug":"_2-6-强封装jdk内部-jep-403","link":"#_2-6-强封装jdk内部-jep-403","children":[]},{"level":3,"title":"2.7. Switch的模式匹配（预览） (JEP 406)","slug":"_2-7-switch的模式匹配-预览-jep-406","link":"#_2-7-switch的模式匹配-预览-jep-406","children":[]},{"level":3,"title":"2.8. 移除RMI激活 (JEP 407)","slug":"_2-8-移除rmi激活-jep-407","link":"#_2-8-移除rmi激活-jep-407","children":[]},{"level":3,"title":"2.9. 密封类 (JEP 409)","slug":"_2-9-密封类-jep-409","link":"#_2-9-密封类-jep-409","children":[]},{"level":3,"title":"2.10. 移除实验性的AOT和JIT编译器 (JEP 410)","slug":"_2-10-移除实验性的aot和jit编译器-jep-410","link":"#_2-10-移除实验性的aot和jit编译器-jep-410","children":[]},{"level":3,"title":"2.11. 弃用安全管理员以供移除 (JEP 411)","slug":"_2-11-弃用安全管理员以供移除-jep-411","link":"#_2-11-弃用安全管理员以供移除-jep-411","children":[]},{"level":3,"title":"2.12. 外部函数和内存API（孵化器） (JEP 412)","slug":"_2-12-外部函数和内存api-孵化器-jep-412","link":"#_2-12-外部函数和内存api-孵化器-jep-412","children":[]},{"level":3,"title":"2.13. 向量API（第二次孵化器） (JEP 414)","slug":"_2-13-向量api-第二次孵化器-jep-414","link":"#_2-13-向量api-第二次孵化器-jep-414","children":[]}]}],"git":{"createdTime":1721843646000,"updatedTime":1721843646000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":11.02,"words":3306},"filePathRelative":"posts/baeldung/2024-07-24/2024-07-24-New Features in Java 17.md","localizedDate":"2022年4月7日","excerpt":"\\n<p>在本教程中，我们将讨论Java生态系统新版本Java SE 17的相关信息，包括新特性以及其发布过程、长期支持(LTS)和许可证的变更。</p>\\n<h2>从Java 8迁移到Java 17</h2>\\n<p>探索Java较新版本中提供的极为有用的特性。这些特性不仅易于学习，而且在计划从Java 8迁移到Java 17时，也可以快速实施，几乎不需要太多努力。</p>\\n<h2>JEP列表</h2>\\n<p>首先，让我们谈谈可能影响Java开发者日常工作的变化。</p>\\n<h3>2.1. 恢复始终严格的浮点运算语义 (JEP 306)</h3>\\n<p>这个JEP主要是针对科学应用，它使浮点运算始终严格一致。<strong>默认的浮点运算现在是_strict_或_strictfp_，两者都保证了在每个平台上进行浮点计算时得到相同的结果。</strong></p>","autoDesc":true}');export{d as comp,k as data};
