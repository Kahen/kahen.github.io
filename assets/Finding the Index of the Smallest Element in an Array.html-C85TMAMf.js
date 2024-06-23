import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BB9zdWga.js";const p={},e=t(`<h1 id="在数组中找到最小元素的索引-baeldung" tabindex="-1"><a class="header-anchor" href="#在数组中找到最小元素的索引-baeldung"><span>在数组中找到最小元素的索引 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>数组操作是必不可少的，我们可能在任何应用程序中都需要它们。有时，它们隐藏在像集合API这样更便利的接口后面。然而，这是我们应该在职业生涯早期就掌握的基本知识。</p><p>在本教程中，我们将学习如何找到数组中最小元素的索引。我们将讨论如何做到这一点，无论元素的类型如何，但为了简单起见，我们将使用一个整数数组。</p><h2 id="_2-简单迭代" tabindex="-1"><a class="header-anchor" href="#_2-简单迭代"><span>2. 简单迭代</span></a></h2><p>最简单的解决方案往往是最好的。<strong>这是出于几个原因：它更容易实现、更改和理解。</strong> 让我们看看如何使用基本的_for_循环找到最小元素的索引：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;primitiveProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenArray_whenUsingForLoop_thenGetCorrectResult</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">,</span> <span class="token keyword">int</span> expectedIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> minValue <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> minIndex <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> array<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>array<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;</span> minValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            minValue <span class="token operator">=</span> array<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            minIndex <span class="token operator">=</span> i<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>minIndex<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expectedIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现相当冗长。然而，我们的目标是解决问题，而不是最小化我们使用的行数。这是一种健壮且简单的解决方案，易于阅读和更改。此外，它不需要对更高级的Java API有深入的了解。</p><p><strong>_for_循环可以被_while_或，如果我们感觉特别花哨，甚至_do-while_替换。</strong> 我们用来迭代数组的方法并不重要。</p><p>同时，如果我们使用引用类型，我们可以将这种逻辑仅应用于可比较的对象，并且不是使用&lt;运算符，而是使用_compareTo()_方法。</p><h2 id="_3-两步方法" tabindex="-1"><a class="header-anchor" href="#_3-两步方法"><span>3. 两步方法</span></a></h2><p><strong>在另一种方法中，我们可以将任务分成两个独立的步骤：找到最小元素和找到它的索引。</strong> 尽管它可能比第一个方法性能稍差，但它具有相同的时间复杂度。</p><p>让我们修改我们的第一个方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;primitiveProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenArray_whenUsingForLoopAndLookForIndex_thenGetCorrectResult</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">,</span> <span class="token keyword">int</span> expectedIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> minValue <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> number <span class="token operator">:</span> array<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">&lt;</span> minValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            minValue <span class="token operator">=</span> number<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> minIndex <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> array<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>array<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> minValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            minIndex <span class="token operator">=</span> i<span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>minIndex<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expectedIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们需要使用两个单独的循环。同时，我们可以简化第一个循环，因为我们不需要索引，并且可以提前退出第二个循环。请注意，与第一种方法相比，它并没有提高性能。</p><h2 id="_4-原始流" tabindex="-1"><a class="header-anchor" href="#_4-原始流"><span>4. 原始流</span></a></h2><p>我们可以从前一种方法中消除第一个循环。在这种情况下，我们可以使用Stream API，特别是_IntStream_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;primitiveProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenArray_whenUsingIntStreamAndLookForIndex_thenGetCorrectResult</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">,</span> <span class="token keyword">int</span> expectedIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> minValue <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>array<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> minIndex <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> array<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>array<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> minValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            minIndex <span class="token operator">=</span> i<span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>minIndex<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expectedIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_IntStreams_提供了方便的方法来对一系列原始值进行操作。我们使用了_min()_方法，并将我们的命令式循环转换为声明式流。</p><p>让我们尝试将第二个循环重构为声明式循环：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;primitiveProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenArray_whenUsingIntStreamAndLookForIndexWithIntStream_thenGetCorrectResult</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">,</span> <span class="token keyword">int</span> expectedIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> minValue <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>array<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> minIndex <span class="token operator">=</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> array<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>index <span class="token operator">-&gt;</span>\` array<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">==</span> minValue<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>minIndex<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expectedIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们使用_IntStream.range()_进行迭代，并将元素与最小值进行比较。这种方法是声明式的，应该被认为是前进的方式。<strong>然而，代码的可读性受到了影响，特别是对于没有流经验的开发者。</strong></p><p>我们可以使用Apache Commons _ArrayUtils_类将找到最小元素的逻辑替换为一行代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;primitiveProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenArray_whenUsingIntStreamAndLookForIndexWithArrayUtils_thenGetCorrectResult</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">,</span> <span class="token keyword">int</span> expectedIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> minValue <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>array<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> minIndex <span class="token operator">=</span> <span class="token class-name">ArrayUtils</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> minValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>minIndex<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expectedIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这使得解决方案更易于阅读，但需要额外的依赖项。如果我们不想添加更多依赖项，我们可以使用_Lists_，因为它们默认包含_indexOf()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;referenceTypesProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenArray_whenUsingReduceAndList_thenGetCorrectResult</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">,</span> <span class="token keyword">int</span> expectedIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` list <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>array<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> minValue <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token operator">::</span><span class="token function">min</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> index <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>minValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expectedIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>然而，将数组转换为_List_将影响我们解决方案的空间复杂度，将其从常数增加到线性。</strong> 我们不会在进一步的例子中考虑这种方法，因为它没有提供任何显著的好处。</p><h2 id="_5-数组和引用类型" tabindex="-1"><a class="header-anchor" href="#_5-数组和引用类型"><span>5. 数组和引用类型</span></a></h2><p>虽然原始流为计算提供了很好的API，但它们不适用于引用类型。在这种情况下，我们可以使用_reduce()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;referenceTypesProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenArray_whenUsingReduce_thenGetCorrectResult</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">,</span> <span class="token keyword">int</span> expectedIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> minValue <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>array<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token operator">::</span><span class="token function">min</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> minIndex <span class="token operator">=</span> <span class="token class-name">ArrayUtils</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> minValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>minIndex<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expectedIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>reduce()方法采用识别的值；在我们的例子中，它是_Integer.MAX_VALUE_和_min()<em>方法的引用。<strong>我们有些非传统地使用了_reduce()_方法，进行了过滤而不是聚合。</strong> 这里，我们使用了_ArrayUtils</em>，但使用_for_循环或_filter()_的解决方案同样有效。</p><h2 id="_6-流中的索引" tabindex="-1"><a class="header-anchor" href="#_6-流中的索引"><span>6. 流中的索引</span></a></h2><p>我们可以直接在流解决方案中使用索引，就像我们之前使用_filter()_一样。这样，我们可以在_reduce()_方法内完成所有逻辑：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;primitiveProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenArray_whenUsingReduceWithRange_thenGetCorrectResult</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">,</span> <span class="token keyword">int</span> expectedIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> array<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> array<span class="token punctuation">[</span>a<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> array<span class="token punctuation">[</span>b<span class="token punctuation">]</span> <span class="token operator">?</span> a <span class="token operator">:</span> b<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expectedIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们沿着流传递最小元素的索引。<strong>然而，这种方法可能不易于阅读，并且需要对Stream API有更深入的了解。</strong></p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>数组是Java中最基础的数据结构。熟练地操作和迭代它们是一项宝贵的技能，尽管我们通常不直接使用数组。</p><p><strong>最直接的方法通常是最佳选择，因为它易于理解和明确。</strong> 使用Streams需要对函数式编程有更深入的了解，可能会以两种方式影响代码的可读性：更好或更差。因此，应该谨慎使用Stream API。</p><p>像往常一样，文章中的所有代码都可以在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。</p><p>OK</p>`,41),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","Finding the Index of the Smallest Element in an Array.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Finding%20the%20Index%20of%20the%20Smallest%20Element%20in%20an%20Array.html","title":"在数组中找到最小元素的索引 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-17T00:00:00.000Z","category":["Java","编程"],"tag":["数组","最小元素","索引"],"description":"在数组中找到最小元素的索引 | Baeldung 1. 概述 数组操作是必不可少的，我们可能在任何应用程序中都需要它们。有时，它们隐藏在像集合API这样更便利的接口后面。然而，这是我们应该在职业生涯早期就掌握的基本知识。 在本教程中，我们将学习如何找到数组中最小元素的索引。我们将讨论如何做到这一点，无论元素的类型如何，但为了简单起见，我们将使用一个整数...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Finding%20the%20Index%20of%20the%20Smallest%20Element%20in%20an%20Array.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在数组中找到最小元素的索引 | Baeldung"}],["meta",{"property":"og:description","content":"在数组中找到最小元素的索引 | Baeldung 1. 概述 数组操作是必不可少的，我们可能在任何应用程序中都需要它们。有时，它们隐藏在像集合API这样更便利的接口后面。然而，这是我们应该在职业生涯早期就掌握的基本知识。 在本教程中，我们将学习如何找到数组中最小元素的索引。我们将讨论如何做到这一点，无论元素的类型如何，但为了简单起见，我们将使用一个整数..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"数组"}],["meta",{"property":"article:tag","content":"最小元素"}],["meta",{"property":"article:tag","content":"索引"}],["meta",{"property":"article:published_time","content":"2024-06-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在数组中找到最小元素的索引 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 简单迭代","slug":"_2-简单迭代","link":"#_2-简单迭代","children":[]},{"level":2,"title":"3. 两步方法","slug":"_3-两步方法","link":"#_3-两步方法","children":[]},{"level":2,"title":"4. 原始流","slug":"_4-原始流","link":"#_4-原始流","children":[]},{"level":2,"title":"5. 数组和引用类型","slug":"_5-数组和引用类型","link":"#_5-数组和引用类型","children":[]},{"level":2,"title":"6. 流中的索引","slug":"_6-流中的索引","link":"#_6-流中的索引","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.1,"words":1529},"filePathRelative":"posts/baeldung/Archive/Finding the Index of the Smallest Element in an Array.md","localizedDate":"2024年6月17日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>数组操作是必不可少的，我们可能在任何应用程序中都需要它们。有时，它们隐藏在像集合API这样更便利的接口后面。然而，这是我们应该在职业生涯早期就掌握的基本知识。</p>\\n<p>在本教程中，我们将学习如何找到数组中最小元素的索引。我们将讨论如何做到这一点，无论元素的类型如何，但为了简单起见，我们将使用一个整数数组。</p>\\n<h2>2. 简单迭代</h2>\\n<p>最简单的解决方案往往是最好的。<strong>这是出于几个原因：它更容易实现、更改和理解。</strong> 让我们看看如何使用基本的_for_循环找到最小元素的索引：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@ParameterizedTest</span>\\n<span class=\\"token annotation punctuation\\">@MethodSource</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"primitiveProvider\\"</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenArray_whenUsingForLoop_thenGetCorrectResult</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> array<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">int</span> expectedIndex<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">int</span> minValue <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">MAX_VALUE</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">int</span> minIndex <span class=\\"token operator\\">=</span> <span class=\\"token operator\\">-</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i `<span class=\\"token operator\\">&lt;</span> array<span class=\\"token punctuation\\">.</span>length<span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>array<span class=\\"token punctuation\\">[</span>i<span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">&lt;</span> minValue<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            minValue <span class=\\"token operator\\">=</span> array<span class=\\"token punctuation\\">[</span>i<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n            minIndex <span class=\\"token operator\\">=</span> i<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token function\\">assertThat</span><span class=\\"token punctuation\\">(</span>minIndex<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isEqualTo</span><span class=\\"token punctuation\\">(</span>expectedIndex<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
