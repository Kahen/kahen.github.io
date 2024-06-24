import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DTROHq0C.js";const p={},o=t(`<h1 id="java中将float型arraylist转换为原始类型数组-baeldung" tabindex="-1"><a class="header-anchor" href="#java中将float型arraylist转换为原始类型数组-baeldung"><span>Java中将Float型ArrayList转换为原始类型数组 | Baeldung</span></a></h1><p>概述</p><p>数据序列是任何项目和编程语言中不可或缺的一部分。在Java中，有两种方式来表示元素序列：集合和数组。</p><p>本教程将学习如何将包装类数组列表转换为原始类型数组。尽管这听起来是一个简单的任务，但Java API中的一些怪癖使得这个过程不那么直接。</p><p>简单For循环</p><p>进行这种转换的最简单方式是使用声明性风格的for循环：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;floatListProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenListOfWrapperFloat_whenConvertToPrimitiveArray_thenGetCorrectResult</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Float</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` floats<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> actual <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">float</span><span class="token punctuation">[</span>floats<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> floats<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        actual<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> floats<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">compareSequences</span><span class="token punctuation">(</span>floats<span class="token punctuation">,</span> actual<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码的主要优点是它明确且易于理解。然而，对于这样一个简单的任务，我们必须处理太多的事情。</p><p>集合API提供了一个不错的方法将List转换为数组，但不处理拆箱。然而，它足够有用，值得在本文中考虑：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;floatListProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenListOfWrapperFloat_whenConvertToWrapperArray_thenGetCorrectResult</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Float</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` floats<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> actual <span class="token operator">=</span> floats<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Float</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertSequences</span><span class="token punctuation">(</span>floats<span class="token punctuation">,</span> actual<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>List类有toArray()方法，可以帮助我们进行转换。然而，API有点令人困惑。我们需要传递一个数组以确保正确的类型。结果将与我们传递的数组类型相同。</p><p>因为我们需要传递一个实例，所以不清楚我们应该使用什么大小，以及结果数组是否会被截断。在这种情况下，我们根本不必担心大小，toArray()将负责并根据需要扩展数组。</p><p>同时，直接传递特定大小的数组也是可以的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;floatListProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenListOfWrapperFloat_whenConvertToWrapperArrayWithPreSizedArray_thenGetCorrectResult</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Float</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` floats<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> actual <span class="token operator">=</span> floats<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Float</span><span class="token punctuation">[</span>floats<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertSequences</span><span class="token punctuation">(</span>floats<span class="token punctuation">,</span> actual<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然看起来是对前一个版本的优化，但这并不一定是真的。Java编译器会在没有问题的情况下处理大小。此外，在创建数组时调用size()可能会在多线程环境中引起问题。因此，推荐使用前面显示的空数组。</p><p>拆箱数组</p><p>虽然我们对数值和布尔值有拆箱的概念，但尝试拆箱数组将导致编译时错误。因此，我们应该分别拆箱每个元素。这是我们之前看到的例子的变体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;floatListProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenListOfWrapperFloat_whenUnboxToPrimitiveArray_thenGetCorrectResult</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Float</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` floats<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> actual <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">float</span><span class="token punctuation">[</span>floats<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token class-name">Float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> floatArray <span class="token operator">=</span> floats<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Float</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> floats<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        actual<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> floatArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertSequences</span><span class="token punctuation">(</span>floats<span class="token punctuation">,</span> actual<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里有两个问题。首先，我们为临时数组使用了额外的空间；这不会像我们无论如何都需要使用空间来获取结果一样影响时间复杂度。</p><p>第二个问题是for循环并没有做太多，因为我们在这里使用了隐式拆箱。消除它是个好主意。我们可以通过Apache Commons的实用类来实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;floatListProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenListOfWrapperFloat_whenConvertToPrimitiveArrayWithArrayUtils_thenGetCorrectResult</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Float</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` floats<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> actual <span class="token operator">=</span> <span class="token class-name">ArrayUtils</span><span class="token punctuation">.</span><span class="token function">toPrimitive</span><span class="token punctuation">(</span>floats<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Float</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertSequences</span><span class="token punctuation">(</span>floats<span class="token punctuation">,</span> actual<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，我们得到了一个漂亮的一行解决方案来解决我们的问题。toPrimitive()方法只是封装了我们之前使用的逻辑，并添加了一些额外的检查：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">toPrimitive</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>array <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>array<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">EMPTY_FLOAT_ARRAY</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">final</span> <span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">float</span><span class="token punctuation">[</span>array<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> array<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> array<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">floatValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个漂亮而干净的解决方案，但需要一些额外的库。或者，我们可以在我们的代码中实现和使用类似的方法。</p><p>流</p><p>当我们使用集合时，我们可以使用流来复制我们在循环中使用的逻辑。流API可以帮助我们同时转换List和拆箱值。然而，有一个警告：Java没有FloatStream。</p><p>如果我们对浮点数不是太挑剔，我们可以使用DoubleStream将ArrayList<code>&lt;Float&gt;</code>转换为double[]：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;floatListProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenListOfWrapperFloat_whenConvertingToPrimitiveArrayUsingStreams_thenGetCorrectResult</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Float</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` floats<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span><span class="token punctuation">[</span><span class="token punctuation">]</span> actual <span class="token operator">=</span> floats<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mapToDouble</span><span class="token punctuation">(</span><span class="token class-name">Float</span><span class="token operator">::</span><span class="token function">doubleValue</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertSequences</span><span class="token punctuation">(</span>floats<span class="token punctuation">,</span> actual<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们成功地转换了List，但以稍微不同的浮点表示。这是因为我们只有IntStream、LongStream和DoubleStream可用。</p><p>自定义收集器</p><p>同时，我们可以实施一个自定义的Collector，并将所有逻辑放在其中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FloatCollector</span> <span class="token keyword">implements</span> <span class="token class-name">Collector</span>\`\`<span class="token operator">&lt;</span><span class="token class-name">Float</span><span class="token punctuation">,</span> <span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>\`\` <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> size<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">FloatCollector</span><span class="token punctuation">(</span><span class="token keyword">int</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>size <span class="token operator">=</span> size<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Supplier</span>\`\`<span class="token operator">&lt;</span><span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>\`\` <span class="token function">supplier</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token keyword">float</span><span class="token punctuation">[</span>size<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">BiConsumer</span>\`<span class="token operator">&lt;</span><span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token class-name">Float</span><span class="token operator">&gt;</span>\` <span class="token function">accumulator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>array<span class="token punctuation">,</span> number<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            array<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> number<span class="token punctuation">;</span>
            index<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 其他不重要的方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其他不重要的方法包括一些存根，允许我们的代码运行，以及一个无操作的终结器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FloatCollector</span> <span class="token keyword">implements</span> <span class="token class-name">Collector</span>\`\`<span class="token operator">&lt;</span><span class="token class-name">Float</span><span class="token punctuation">,</span> <span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>\`\` <span class="token punctuation">{</span>
    <span class="token comment">// 重要方法</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">BinaryOperator</span>\`\`<span class="token operator">&lt;</span><span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>\`\` <span class="token function">combiner</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Function</span>\`<span class="token operator">&lt;</span><span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>\` <span class="token function">finisher</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Function</span><span class="token punctuation">.</span><span class="token function">identity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Set</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Characteristics</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">characteristics</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">emptySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以展示我们的新的和有点hacky的Collector：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;floatListProvider&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenListOfWrapperFloat_whenConvertingWithCollector_thenGetCorrectResult</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Float</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` floats<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> actual <span class="token operator">=</span> floats<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FloatCollector</span><span class="token punctuation">(</span>floats<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertSequences</span><span class="token punctuation">(</span>floats<span class="token punctuation">,</span> actual<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然玩弄Stream API接口很有趣，但这个解决方案过于复杂，并没有在这个特定的情况下提供任何好处。此外，这个收集器可能在多线程环境中工作，我们应该考虑到线程安全性。</p><p>结论</p><p>使用数组和集合是任何应用程序的常规工作。虽然列表提供了更好的接口，但有时我们需要将它们转换为简单的数组。</p><p>在这个过程中额外的拆箱使其比应该的更具挑战性。然而，一些技巧、自定义方法或第三方库可以帮助简化它。</p><p>像往常一样，本教程的所有代码都可以在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,42),e=[o];function c(l,i){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","Converting Float ArrayList to Primitive Array in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Converting%20Float%20ArrayList%20to%20Primitive%20Array%20in%20Java.html","title":"Java中将Float型ArrayList转换为原始类型数组 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-17T00:00:00.000Z","category":["Java","编程"],"tag":["ArrayList","原始类型数组","转换"],"description":"Java中将Float型ArrayList转换为原始类型数组 | Baeldung 概述 数据序列是任何项目和编程语言中不可或缺的一部分。在Java中，有两种方式来表示元素序列：集合和数组。 本教程将学习如何将包装类数组列表转换为原始类型数组。尽管这听起来是一个简单的任务，但Java API中的一些怪癖使得这个过程不那么直接。 简单For循环 进行这种...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Converting%20Float%20ArrayList%20to%20Primitive%20Array%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将Float型ArrayList转换为原始类型数组 | Baeldung"}],["meta",{"property":"og:description","content":"Java中将Float型ArrayList转换为原始类型数组 | Baeldung 概述 数据序列是任何项目和编程语言中不可或缺的一部分。在Java中，有两种方式来表示元素序列：集合和数组。 本教程将学习如何将包装类数组列表转换为原始类型数组。尽管这听起来是一个简单的任务，但Java API中的一些怪癖使得这个过程不那么直接。 简单For循环 进行这种..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ArrayList"}],["meta",{"property":"article:tag","content":"原始类型数组"}],["meta",{"property":"article:tag","content":"转换"}],["meta",{"property":"article:published_time","content":"2024-06-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将Float型ArrayList转换为原始类型数组 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.85,"words":1454},"filePathRelative":"posts/baeldung/Archive/Converting Float ArrayList to Primitive Array in Java.md","localizedDate":"2024年6月17日","excerpt":"\\n<p>概述</p>\\n<p>数据序列是任何项目和编程语言中不可或缺的一部分。在Java中，有两种方式来表示元素序列：集合和数组。</p>\\n<p>本教程将学习如何将包装类数组列表转换为原始类型数组。尽管这听起来是一个简单的任务，但Java API中的一些怪癖使得这个过程不那么直接。</p>\\n<p>简单For循环</p>\\n<p>进行这种转换的最简单方式是使用声明性风格的for循环：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@ParameterizedTest</span>\\n<span class=\\"token annotation punctuation\\">@MethodSource</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"floatListProvider\\"</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenListOfWrapperFloat_whenConvertToPrimitiveArray_thenGetCorrectResult</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">List</span>`````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Float</span><span class=\\"token punctuation\\">&gt;</span></span>````` floats<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">float</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> actual <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token keyword\\">float</span><span class=\\"token punctuation\\">[</span>floats<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">size</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> floats<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">size</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        actual<span class=\\"token punctuation\\">[</span>i<span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> floats<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token function\\">compareSequences</span><span class=\\"token punctuation\\">(</span>floats<span class=\\"token punctuation\\">,</span> actual<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
