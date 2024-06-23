import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-C3BVsZqC.js";const p={},e=t(`<h1 id="java中将二维数组转换为一维数组" tabindex="-1"><a class="header-anchor" href="#java中将二维数组转换为一维数组"><span>Java中将二维数组转换为一维数组</span></a></h1><p>数组是任何语言中最基本的数据结构。<strong>尽管我们大多数情况下不直接操作它们，但知道如何有效操作它们可以显著提高我们的代码效率。</strong></p><p>在本教程中，我们将学习如何将二维数组转换为一维数组，通常被称为扁平化。例如，我们将转换 { {1, 2, 3}, {4, 5, 6}, {7, 8, 9} } 为 {1, 2, 3, 4, 5, 6, 7, 8, 9}。</p><p>尽管我们将使用二维数组进行操作，但本教程中概述的思想可以应用于任何维度的数组。在本文中，我们将使用原始整数数组作为示例，但这些思想可以应用于任何数组。</p><h2 id="_2-循环和原始数组" tabindex="-1"><a class="header-anchor" href="#_2-循环和原始数组"><span>2. 循环和原始数组</span></a></h2><p>解决这个问题的最简单方法是使用_for_循环，我们可以使用它将一个数组中的元素转移到另一个数组。然而，为了提高性能，我们必须确定元素的总数以创建目标数组。</p><p>如果所有数组具有相同数量的元素，这是一个微不足道的任务。在这种情况下，我们可以使用简单的数学来进行计算。<strong>然而，如果我们处理的是锯齿形数组，我们需要逐个遍历这些数组：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;arrayProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">giveTwoDimensionalArray_whenFlatWithForLoopAndTotalNumberOfElements_thenGetCorrectResult</span><span class="token punctuation">(</span>
  <span class="token keyword">int</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> initialArray<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> expected<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> totalNumberOfElements <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> numbers <span class="token operator">:</span> initialArray<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        totalNumberOfElements <span class="token operator">+=</span> numbers<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> actual <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>totalNumberOfElements<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> position <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> numbers <span class="token operator">:</span> initialArray<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> number <span class="token operator">:</span> numbers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            actual<span class="token punctuation">[</span>position<span class="token punctuation">]</span> <span class="token operator">=</span> number<span class="token punctuation">;</span>
            <span class="token operator">++</span>position<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们也可以进行一些改进，并在第二个_for_循环中使用_System.arrayCopy()_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;arrayProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">giveTwoDimensionalArray_whenFlatWithArrayCopyAndTotalNumberOfElements_thenGetCorrectResult</span><span class="token punctuation">(</span>
  <span class="token keyword">int</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> initialArray<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> expected<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> totalNumberOfElements <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> numbers <span class="token operator">:</span> initialArray<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        totalNumberOfElements <span class="token operator">+=</span> numbers<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> actual <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>totalNumberOfElements<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> position <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> numbers <span class="token operator">:</span> initialArray<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">arraycopy</span><span class="token punctuation">(</span>numbers<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> actual<span class="token punctuation">,</span>  position<span class="token punctuation">,</span> numbers<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        position <span class="token operator">+=</span> numbers<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_System.arrayCopy()_相对较快，并且是推荐的方式来复制数组，以及_clone()_方法。</strong> 然而，我们需要谨慎使用这些方法在引用类型的数组上，因为它们执行的是浅拷贝。</p><p>从技术上讲，我们可以避免在第一个循环中计算元素数量，并在必要时扩展数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;arrayProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">giveTwoDimensionalArray_whenFlatWithArrayCopy_thenGetCorrectResult</span><span class="token punctuation">(</span>
  <span class="token keyword">int</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> initialArray<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> expected<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> actual <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> position <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> numbers <span class="token operator">:</span> initialArray<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>actual<span class="token punctuation">.</span>length \`<span class="token operator">&lt;</span> position <span class="token operator">+</span> numbers<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> newArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>actual<span class="token punctuation">.</span>length <span class="token operator">+</span> numbers<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">arraycopy</span><span class="token punctuation">(</span>actual<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> newArray<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> actual<span class="token punctuation">.</span>length <span class="token punctuation">)</span><span class="token punctuation">;</span>
            actual <span class="token operator">=</span> newArray<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">arraycopy</span><span class="token punctuation">(</span>numbers<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> actual<span class="token punctuation">,</span>  position<span class="token punctuation">,</span> numbers<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        position <span class="token operator">+=</span> numbers<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>然而，这种方法会降低我们的性能，并将初始的时间复杂度从_O(n)<em>变为_O(n^2)</em>。</strong> 因此，应该避免使用，或者我们需要使用更优化的算法来增加数组大小，类似于List的实现。</p><h2 id="_3-lists" tabindex="-1"><a class="header-anchor" href="#_3-lists"><span>3. <em>Lists</em></span></a></h2><p>关于列表，Java Collection API提供了一种更方便的方式来管理元素集合。因此，如果我们使用_List_作为我们扁平化逻辑的返回类型，或者至少作为一个中间值持有者，我们可以简化代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;arrayProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">giveTwoDimensionalArray_whenFlatWithForLoopAndAdditionalList_thenGetCorrectResult</span><span class="token punctuation">(</span>
  <span class="token keyword">int</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> initialArray<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> intArray<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` expected <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>intArray<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">boxed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` actual <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> numbers <span class="token operator">:</span> initialArray<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> number <span class="token operator">:</span> numbers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            actual<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们不需要处理目标数组的扩展，_List_会透明地处理它。我们还可以使用_addAll()<em>方法将第二维数组转换为_Lists</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;arrayProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">giveTwoDimensionalArray_whenFlatWithForLoopAndLists_thenGetCorrectResult</span><span class="token punctuation">(</span>
  <span class="token keyword">int</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> initialArray<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> intArray<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` expected <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>intArray<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">boxed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` actual <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> numbers <span class="token operator">:</span> initialArray<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` listOfNumbers <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>numbers<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">boxed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        actual<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>listOfNumbers<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>由于我们不能在_Collections_中使用原始类型，装箱创建了显著的开销，我们应该谨慎使用它。</strong> 当数组中的元素数量很大或性能关键时，最好避免使用包装类。</p><h2 id="_4-stream-api" tabindex="-1"><a class="header-anchor" href="#_4-stream-api"><span>4. Stream API</span></a></h2><p>因为这类问题相当常见，Stream API提供了一种更方便的方法来进行扁平化：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;arrayProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">giveTwoDimensionalArray_whenFlatWithStream_thenGetCorrectResult</span><span class="token punctuation">(</span>
  <span class="token keyword">int</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> initialArray<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> expected<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> actual <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>initialArray<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">flatMapToInt</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token operator">::</span><span class="token function">stream</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们之所以只使用_flatMapToInt()_方法，是因为我们正在处理原始数组。<strong>对于引用类型，解决方案将是类似的，但我们应该使用_flatMap()_方法。</strong> 这是最直接和最易读的选项。然而，需要对Stream API有一定的理解。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>我们通常不直接操作数组。然而，它们是最基础的数据结构，知道如何操作它们是必不可少的。</p><p>_System_类、Collection和Stream API提供了许多方便的方法与数组交互。<strong>然而，我们应该始终考虑这些方法的缺点，并为我们的特定情况选择最合适的方法。</strong></p><p>像往常一样，代码可以在GitHub上找到。</p><p>文章发布后30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。翻译已经完成。</p><p>OK</p>`,30),o=[e];function c(i,l){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","Convert 2D Array Into 1D Array.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Convert%202D%20Array%20Into%201D%20Array.html","title":"Java中将二维数组转换为一维数组","lang":"zh-CN","frontmatter":{"date":"2024-06-17T00:00:00.000Z","category":["Java","编程"],"tag":["数组","2D数组","1D数组"],"description":"Java中将二维数组转换为一维数组 数组是任何语言中最基本的数据结构。尽管我们大多数情况下不直接操作它们，但知道如何有效操作它们可以显著提高我们的代码效率。 在本教程中，我们将学习如何将二维数组转换为一维数组，通常被称为扁平化。例如，我们将转换 { {1, 2, 3}, {4, 5, 6}, {7, 8, 9} } 为 {1, 2, 3, 4, 5, ...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Convert%202D%20Array%20Into%201D%20Array.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将二维数组转换为一维数组"}],["meta",{"property":"og:description","content":"Java中将二维数组转换为一维数组 数组是任何语言中最基本的数据结构。尽管我们大多数情况下不直接操作它们，但知道如何有效操作它们可以显著提高我们的代码效率。 在本教程中，我们将学习如何将二维数组转换为一维数组，通常被称为扁平化。例如，我们将转换 { {1, 2, 3}, {4, 5, 6}, {7, 8, 9} } 为 {1, 2, 3, 4, 5, ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"数组"}],["meta",{"property":"article:tag","content":"2D数组"}],["meta",{"property":"article:tag","content":"1D数组"}],["meta",{"property":"article:published_time","content":"2024-06-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将二维数组转换为一维数组\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"2. 循环和原始数组","slug":"_2-循环和原始数组","link":"#_2-循环和原始数组","children":[]},{"level":2,"title":"3. Lists","slug":"_3-lists","link":"#_3-lists","children":[]},{"level":2,"title":"4. Stream API","slug":"_4-stream-api","link":"#_4-stream-api","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.1,"words":1231},"filePathRelative":"posts/baeldung/Archive/Convert 2D Array Into 1D Array.md","localizedDate":"2024年6月17日","excerpt":"\\n<p>数组是任何语言中最基本的数据结构。<strong>尽管我们大多数情况下不直接操作它们，但知道如何有效操作它们可以显著提高我们的代码效率。</strong></p>\\n<p>在本教程中，我们将学习如何将二维数组转换为一维数组，通常被称为扁平化。例如，我们将转换 { {1, 2, 3}, {4, 5, 6}, {7, 8, 9} } 为 {1, 2, 3, 4, 5, 6, 7, 8, 9}。</p>\\n<p>尽管我们将使用二维数组进行操作，但本教程中概述的思想可以应用于任何维度的数组。在本文中，我们将使用原始整数数组作为示例，但这些思想可以应用于任何数组。</p>\\n<h2>2. 循环和原始数组</h2>","autoDesc":true}');export{k as comp,d as data};
