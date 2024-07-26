import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C4eFoh0f.js";const p={},e=t(`<hr><h1 id="java中的无状态对象" tabindex="-1"><a class="header-anchor" href="#java中的无状态对象"><span>Java中的无状态对象</span></a></h1><p>在本教程中，我们将讨论如何在Java中实现无状态对象。<strong>无状态对象是没有实例字段的类实例</strong>。</p><p>在Java中，我们所有的代码都必须放在一个类中。在编写算法时，我们可能只需要在类中提供静态方法来实现这一点。</p><p>然而，有时我们可能希望将我们的算法绑定到一个无状态对象上。</p><p>当我们考虑Java中的对象时，我们通常想到的是包含字段状态的对象，以及操作该状态以提供行为的方法。</p><p>除此之外，我们可以创建具有不可修改字段的对象。这些对象在创建时定义了它们的状态，然后是不可变的，因为它们的状态不会改变。在并发操作中，不可变对象与无状态对象一样受益。</p><p>最后，我们有<strong>完全没有字段或只有编译时常量字段的对象</strong>。这些对象是无状态的。</p><p>让我们看看为什么我们可能想要使用一个无状态对象。</p><p>以我们的示例为例，让我们采用一个没有状态的排序算法。让我们选择冒泡排序作为我们的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> n <span class="token operator">=</span> array<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> n <span class="token operator">-</span> i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>array<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&gt;</span>\` array<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">int</span> swap <span class="token operator">=</span> array<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
                array<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> array<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                array<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> swap<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-多种无状态排序实现" tabindex="-1"><a class="header-anchor" href="#_3-1-多种无状态排序实现"><span>3.1 多种无状态排序实现</span></a></h3><p>我们现在想要增加使用其他排序算法进行排序的可能性，所以我们考虑了快速排序算法，它也是无状态的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">quickSort</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> array<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">quickSort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">,</span> <span class="token keyword">int</span> begin<span class="token punctuation">,</span> <span class="token keyword">int</span> end<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>begin <span class="token operator">&lt;</span> end<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> pi <span class="token operator">=</span> <span class="token function">partition</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> begin<span class="token punctuation">,</span> end<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">quickSort</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> begin<span class="token punctuation">,</span> pi <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">quickSort</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> pi <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> end<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">partition</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">,</span> <span class="token keyword">int</span> low<span class="token punctuation">,</span> <span class="token keyword">int</span> high<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> pivot <span class="token operator">=</span> array<span class="token punctuation">[</span>high<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> low <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> low<span class="token punctuation">;</span> j <span class="token operator">&lt;</span> high<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>array<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&lt;</span> pivot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            i<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> swap <span class="token operator">=</span> array<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            array<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> array<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
            array<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> swap<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> swap <span class="token operator">=</span> array<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    array<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> array<span class="token punctuation">[</span>high<span class="token punctuation">]</span><span class="token punctuation">;</span>
    array<span class="token punctuation">[</span>high<span class="token punctuation">]</span> <span class="token operator">=</span> swap<span class="token punctuation">;</span>
    <span class="token keyword">return</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-选择实现" tabindex="-1"><a class="header-anchor" href="#_3-2-选择实现"><span>3.2 选择实现</span></a></h3><p>假设决定使用哪种算法是在运行时做出的。</p><p>我们需要一种方法在运行时选择正确的排序算法。为此，我们使用一种称为策略设计模式的设计模式。</p><p>在我们的案例中实现策略模式，我们将创建一个名为_SortingStrategy_的接口，其中包含_sort()_方法的签名：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">SortingStrategy</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在可以将我们的每个排序策略实现为实现此接口的无状态对象。这允许我们在消费代码中使用传递给它的任何排序对象，同时切换到我们喜欢的任何实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BubbleSort</span> <span class="token keyword">implements</span> <span class="token class-name">SortingStrategy</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 冒泡排序实现</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">QuickSort</span> <span class="token keyword">implements</span> <span class="token class-name">SortingStrategy</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 快速排序实现</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 其他有用方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们的类没有字段，因此没有状态。然而，由于有一个对象，它可以满足我们为所有排序算法定义的公共接口——<em>SortingStrategy</em>。</p><h3 id="_3-3-单例无状态实现" tabindex="-1"><a class="header-anchor" href="#_3-3-单例无状态实现"><span>3.3 单例无状态实现</span></a></h3><p>我们想要引入一种方法，为用户提供所选的排序策略。由于类是无状态的，我们不需要它们的任何实例多于一个。因此，我们可以使用单例设计模式来实现这一点。</p><p>我们可以通过使用Java _enum_来实现策略实例的这种模式。</p><p>让我们从_class_类型切换到_enum_并添加一个常量——<em>INSTANCE</em>。这个常量实际上是特定排序算法的单个无状态实例。由于_enum_可以实现Java <em>interface</em>，这是提供策略对象单例的简洁方式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">BubbleSort</span> <span class="token keyword">implements</span> <span class="token class-name">SortingStrategy</span> <span class="token punctuation">{</span>

    <span class="token constant">INSTANCE</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 冒泡排序实现</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">QuickSort</span> <span class="token keyword">implements</span> <span class="token class-name">SortingStrategy</span> <span class="token punctuation">{</span>

    <span class="token constant">INSTANCE</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 快速排序实现</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 其他有用方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-测试排序策略" tabindex="-1"><a class="header-anchor" href="#_3-4-测试排序策略"><span>3.4 测试排序策略</span></a></h3><p>最后，我们编写测试以确保两种排序策略都能工作，并且可以轻松维护：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenArray_whenBubbleSorting_thenSorted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arrayToSort <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">41</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">9</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> sortedArray <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token operator">-</span><span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">41</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token class-name">SortingStrategy</span> sortingStrategy <span class="token operator">=</span> <span class="token class-name">BubbleSort</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
    sortingStrategy<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>arrayToSort<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>sortedArray<span class="token punctuation">,</span> arrayToSort<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenArray_whenQuickSortSorting_thenSorted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arrayToSort <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">41</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">9</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> sortedArray <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token operator">-</span><span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">41</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token class-name">SortingStrategy</span> sortingStrategy <span class="token operator">=</span> <span class="token class-name">QuickSort</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
    sortingStrategy<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>arrayToSort<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>sortedArray<span class="token punctuation">,</span> arrayToSort<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探讨了Java语言中的无状态对象。</p><p>我们看到了无状态对象对于保持不需要状态的算法非常有用，我们还研究了如何实现策略模式。</p><p>像往常一样，代码片段可以在GitHub上找到。</p>`,34),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-02-Stateless Object in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Stateless%20Object%20in%20Java.html","title":"Java中的无状态对象","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["Stateless Object","Java"],"head":[["meta",{"name":"keywords","content":"Java, Stateless Object, Strategy Pattern, Singleton Pattern"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Stateless%20Object%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的无状态对象"}],["meta",{"property":"og:description","content":"Java中的无状态对象 在本教程中，我们将讨论如何在Java中实现无状态对象。无状态对象是没有实例字段的类实例。 在Java中，我们所有的代码都必须放在一个类中。在编写算法时，我们可能只需要在类中提供静态方法来实现这一点。 然而，有时我们可能希望将我们的算法绑定到一个无状态对象上。 当我们考虑Java中的对象时，我们通常想到的是包含字段状态的对象，以及..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T18:37:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Stateless Object"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T18:37:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的无状态对象\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T18:37:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的无状态对象 在本教程中，我们将讨论如何在Java中实现无状态对象。无状态对象是没有实例字段的类实例。 在Java中，我们所有的代码都必须放在一个类中。在编写算法时，我们可能只需要在类中提供静态方法来实现这一点。 然而，有时我们可能希望将我们的算法绑定到一个无状态对象上。 当我们考虑Java中的对象时，我们通常想到的是包含字段状态的对象，以及..."},"headers":[{"level":3,"title":"3.1 多种无状态排序实现","slug":"_3-1-多种无状态排序实现","link":"#_3-1-多种无状态排序实现","children":[]},{"level":3,"title":"3.2 选择实现","slug":"_3-2-选择实现","link":"#_3-2-选择实现","children":[]},{"level":3,"title":"3.3 单例无状态实现","slug":"_3-3-单例无状态实现","link":"#_3-3-单例无状态实现","children":[]},{"level":3,"title":"3.4 测试排序策略","slug":"_3-4-测试排序策略","link":"#_3-4-测试排序策略","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719945458000,"updatedTime":1719945458000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.02,"words":1205},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Stateless Object in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中的无状态对象</h1>\\n<p>在本教程中，我们将讨论如何在Java中实现无状态对象。<strong>无状态对象是没有实例字段的类实例</strong>。</p>\\n<p>在Java中，我们所有的代码都必须放在一个类中。在编写算法时，我们可能只需要在类中提供静态方法来实现这一点。</p>\\n<p>然而，有时我们可能希望将我们的算法绑定到一个无状态对象上。</p>\\n<p>当我们考虑Java中的对象时，我们通常想到的是包含字段状态的对象，以及操作该状态以提供行为的方法。</p>\\n<p>除此之外，我们可以创建具有不可修改字段的对象。这些对象在创建时定义了它们的状态，然后是不可变的，因为它们的状态不会改变。在并发操作中，不可变对象与无状态对象一样受益。</p>","autoDesc":true}');export{k as comp,d as data};
