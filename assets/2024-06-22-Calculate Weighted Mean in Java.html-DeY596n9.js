import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-Bxrsut6s.js";const e={},p=t(`<h1 id="在java中计算加权平均数" tabindex="-1"><a class="header-anchor" href="#在java中计算加权平均数"><span>在Java中计算加权平均数</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span><strong>1. 引言</strong></span></a></h2><p>在本文中，我们将探讨几种不同的方法来解决同一个问题——计算一组数值的加权平均数。</p><h2 id="_2-什么是加权平均数" tabindex="-1"><a class="header-anchor" href="#_2-什么是加权平均数"><span><strong>2. 什么是加权平均数？</strong></span></a></h2><p>我们通过将一组数字全部相加，然后除以数字的个数来计算标准平均数。例如，数字1、3、5、7、9的平均数将是(1 + 3 + 5 + 7 + 9) / 5，等于5。</p><p><strong>当我们计算加权平均数时，我们有一组每个数字都有权重的数字：</strong></p><table><thead><tr><th>数字</th><th>权重</th></tr></thead><tbody><tr><td>1</td><td>10</td></tr><tr><td>3</td><td>20</td></tr><tr><td>5</td><td>30</td></tr><tr><td>7</td><td>50</td></tr><tr><td>9</td><td>40</td></tr></tbody></table><p>在这种情况下，我们需要考虑权重。<strong>新的计算方式是将每个数字与其权重的乘积求和，然后除以所有权重的总和。</strong> 例如，这里的平均数将是((1 * 10) + (3 * 20) + (5 * 30) + (7 * 50) + (9 * 40)) / (10 + 20 + 30 + 50 + 40)，等于6.2。</p><h2 id="_3-准备设置" tabindex="-1"><a class="header-anchor" href="#_3-准备设置"><span><strong>3. 准备设置</strong></span></a></h2><p>为了这些示例，我们将进行一些初始设置。<strong>最重要的事情是我们需要一个类型来表示我们的加权值：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Values</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> value<span class="token punctuation">;</span>
    <span class="token keyword">int</span> weight<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Values</span><span class="token punctuation">(</span><span class="token keyword">int</span> value<span class="token punctuation">,</span> <span class="token keyword">int</span> weight<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>weight <span class="token operator">=</span> weight<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的示例代码中，我们还将有一组初始值和一个预期的平均结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Values</span><span class="token punctuation">&gt;</span></span>\` values <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token class-name">Values</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">Values</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">Values</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">Values</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">Values</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">private</span> <span class="token class-name">Double</span> expected <span class="token operator">=</span> <span class="token number">6.2</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-两次遍历计算" tabindex="-1"><a class="header-anchor" href="#_4-两次遍历计算"><span><strong>4. 两次遍历计算</strong></span></a></h2><p><strong>最明显的方式来计算这个就像我们上面看到的那样。我们可以遍历数字列表，分别求和我们需要的值用于除法：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">double</span> top <span class="token operator">=</span> values<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">mapToDouble</span><span class="token punctuation">(</span>v <span class="token operator">-&gt;</span> v<span class="token punctuation">.</span>value <span class="token operator">*</span> v<span class="token punctuation">.</span>weight<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">double</span> bottom <span class="token operator">=</span> values<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">mapToDouble</span><span class="token punctuation">(</span>v <span class="token operator">-&gt;</span> v<span class="token punctuation">.</span>weight<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成这个之后，我们的计算现在只是将一个除以另一个：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">double</span> result <span class="token operator">=</span> top <span class="token operator">/</span> bottom<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>我们可以进一步简化这一点，通过使用传统的_for_循环，并且边遍历边进行两次求和。</strong> 这里的不足是结果不能是不可变值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">double</span> top <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">double</span> bottom <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Values</span> v <span class="token operator">:</span> values<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    top <span class="token operator">+=</span> <span class="token punctuation">(</span>v<span class="token punctuation">.</span>value <span class="token operator">*</span> v<span class="token punctuation">.</span>weight<span class="token punctuation">)</span><span class="token punctuation">;</span>
    bottom <span class="token operator">+=</span> v<span class="token punctuation">.</span>weight<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-扩展列表" tabindex="-1"><a class="header-anchor" href="#_5-扩展列表"><span><strong>5. 扩展列表</strong></span></a></h2><p>我们可以以不同的方式考虑我们的加权平均数计算。<strong>而不是计算乘积的总和，我们可以扩展每个加权值。</strong> 例如，我们可以将列表扩展为包含10个“1”，20个“2”等等。此时，我们可以对扩展后的列表进行直接平均：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">double</span> result <span class="token operator">=</span> values<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>v <span class="token operator">-&gt;</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">nCopies</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span>weight<span class="token punctuation">,</span> v<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">mapToInt</span><span class="token punctuation">(</span>v <span class="token operator">-&gt;</span> v<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">average</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">getAsDouble</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这显然效率较低，但它可能更清晰、更容易理解。我们也可以更容易地对最终的数字集合进行其他操作——例如，找到中位数这种方式更容易理解。</p><h2 id="_6-减少列表" tabindex="-1"><a class="header-anchor" href="#_6-减少列表"><span><strong>6. 减少列表</strong></span></a></h2><p>我们看到求和乘积和权重比尝试展开值更有效率。但如果我们想在不使用可变值的情况下进行单次遍历怎么办？<strong>我们可以使用Streams的_reduce()_功能来实现这一点。特别是，我们将使用它来边进行边进行加法，将运行总数收集到一个对象中：</strong></p><p>我们首先需要一个类来收集我们的运行总数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">WeightedAverage</span> <span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token keyword">double</span> top<span class="token punctuation">;</span>
    <span class="token keyword">final</span> <span class="token keyword">double</span> bottom<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">WeightedAverage</span><span class="token punctuation">(</span><span class="token keyword">double</span> top<span class="token punctuation">,</span> <span class="token keyword">double</span> bottom<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>top <span class="token operator">=</span> top<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>bottom <span class="token operator">=</span> bottom<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">double</span> <span class="token function">average</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> top <span class="token operator">/</span> bottom<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还在这个类上包含了一个_average()_函数，它将执行我们的最终计算。现在，我们可以执行我们的缩减：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">double</span> result <span class="token operator">=</span> values<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">WeightedAverage</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span>acc<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">WeightedAverage</span><span class="token punctuation">(</span>
      acc<span class="token punctuation">.</span>top <span class="token operator">+</span> <span class="token punctuation">(</span>next<span class="token punctuation">.</span>value <span class="token operator">*</span> next<span class="token punctuation">.</span>weight<span class="token punctuation">)</span><span class="token punctuation">,</span>
      acc<span class="token punctuation">.</span>bottom <span class="token operator">+</span> next<span class="token punctuation">.</span>weight<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span>left<span class="token punctuation">,</span> right<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">WeightedAverage</span><span class="token punctuation">(</span>
      left<span class="token punctuation">.</span>top <span class="token operator">+</span> right<span class="token punctuation">.</span>top<span class="token punctuation">,</span>
      left<span class="token punctuation">.</span>bottom <span class="token operator">+</span> right<span class="token punctuation">.</span>bottom<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">average</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这看起来非常复杂，让我们分解成部分。</p><p>_reduce()_的第一个参数是我们的身份。这是值为0的加权平均数。</p><p>下一个参数是一个lambda，它接受一个_WeightedAverage_实例并添加下一个值。我们会注意到这里的总和计算方式与我们之前执行的方式相同。</p><p>最后一个参数是用于组合两个_WeightedAverage_实例的lambda。这对于某些情况下的_reduce()_是必要的，例如，如果我们在并行流上执行此操作。</p><p>_reduce()_调用的结果是一个_WeightedAverage_实例，我们可以使用它来计算结果。</p><h2 id="_7-自定义收集器" tabindex="-1"><a class="header-anchor" href="#_7-自定义收集器"><span><strong>7. 自定义收集器</strong></span></a></h2><p>我们的_reduce()_版本当然很干净，但它比其他尝试更难理解。我们最终传递了两个lambda到函数中，并且仍然需要执行一个后处理步骤来计算平均值。</p><p><strong>我们可以探索的最后一个解决方案是编写一个自定义收集器来封装这项工作。这将直接产生我们的结果，它将更简单易用。</strong></p><p>在我们编写收集器之前，让我们看看我们需要实现的接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Collector</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token class-name">A</span><span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span>
    <span class="token class-name">Supplier</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">A</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">supplier</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">BiConsumer</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">A</span><span class="token punctuation">,</span> <span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">accumulator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">BinaryOperator</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">A</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">combiner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Function</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">A</span><span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">finisher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Set</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Characteristics</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">characteristics</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里有很多内容，但我们将边构建收集器边处理它。我们还将看到这些额外的复杂性如何允许我们在并行流上使用完全相同的收集器，而不仅仅是在顺序流上。</p><p>首先要注意的是泛型类型：</p><ul><li><em>T</em> – 这是输入类型。我们的收集器始终需要与它可以收集的值的类型绑定。</li><li><em>R</em>– 这是结果类型。我们的收集器始终需要指定它将产生的类型。</li><li><em>A</em>– 这是聚合类型。这通常是收集器内部的，但对于某些函数签名是必要的。</li></ul><p><strong>这意味着我们需要定义一个聚合类型。这只是一个在我们进行时收集运行结果的类型。</strong> 我们不能直接在我们的收集器中这样做，因为我们需要支持并行流，可能会同时进行未知数量的这些操作。因此，我们定义了一个单独的类型，用于存储每个并行流的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">RunningTotals</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> top<span class="token punctuation">;</span>
    <span class="token keyword">double</span> bottom<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">RunningTotals</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>top <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>bottom <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个可变类型，但由于其使用将被限制在一个并行流内，这是可以的。</p><p><strong>现在，我们可以实现我们的收集器方法。</strong> 我们会发现这些大多数返回lambda。同样，这是为了支持并行流，其中底层流框架将根据需要调用它们的某种组合。</p><p><strong>第一个方法是_supplier()_</strong> <em>.</em> 这构造了我们的_RunningTotals_的新零实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">Supplier</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">RunningTotals</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">supplier</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">RunningTotals</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>接下来，我们有_accumulator()_</strong>。这接受一个_RunningTotals_实例和下一个要处理的_Values_实例，并将它们结合起来，就地更新我们的_RunningTotals_实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">BiConsumer</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">RunningTotals</span><span class="token punctuation">,</span> <span class="token class-name">Values</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">accumulator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>current<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        current<span class="token punctuation">.</span>top <span class="token operator">+=</span> <span class="token punctuation">(</span>next<span class="token punctuation">.</span>value <span class="token operator">*</span> next<span class="token punctuation">.</span>weight<span class="token punctuation">)</span><span class="token punctuation">;</span>
        current<span class="token punctuation">.</span>bottom <span class="token operator">+=</span> next<span class="token punctuation">.</span>weight<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们的下一个方法是_combiner()_</strong>。这接受两个_RunningTotals_实例——来自不同的并行流——并将它们合并为一个：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">BinaryOperator</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">RunningTotals</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">combiner</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>left<span class="token punctuation">,</span> right<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        left<span class="token punctuation">.</span>top <span class="token operator">+=</span> right<span class="token punctuation">.</span>top<span class="token punctuation">;</span>
        left<span class="token punctuation">.</span>bottom <span class="token operator">+=</span> right<span class="token punctuation">.</span>bottom<span class="token punctuation">;</span>

        <span class="token keyword">return</span> left<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们正在改变我们的一个输入并直接返回它。这是完全安全的，但如果返回一个新实例更容易，我们也可以这样做。</p><p>这只会在JVM决定将流处理拆分为多个并行流时使用，这取决于几个因素。但是，我们应该实现它以防这种情况发生。</p><p><strong>我们需要实现的最后一个lambda方法是_finisher()_</strong>。这接受最终的_RunningTotals_实例，在所有值都被累积并且所有并行流都被合并之后，并返回最终结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">Function</span>\`<span class="token operator">&lt;</span><span class="token class-name">RunningTotals</span>\`\`\`java
<span class="token punctuation">,</span> <span class="token class-name">Double</span><span class="token operator">&gt;</span>\` <span class="token function">finisher</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> rt <span class="token operator">-&gt;</span> rt<span class="token punctuation">.</span>top <span class="token operator">/</span> rt<span class="token punctuation">.</span>bottom<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们的_Collector_还需要一个_characteristics()_方法，返回描述收集器如何使用的特征集。</strong> _Collectors.Characteristics_枚举由三个值组成：</p><ul><li><em>CONCURRENT</em> – _accumulator()_函数可以安全地从并行线程调用到同一个聚合实例。如果指定了这一点，那么_combiner()_函数将永远不会被使用，但_aggregation()_函数必须格外小心。</li><li><em>UNORDERED</em> – 收集器可以安全地以任意顺序处理来自底层流的元素。如果没有指定这一点，那么在可能的情况下，值将按照正确的顺序提供。</li><li><em>IDENTITY_FINISH</em> – _finisher()_函数只是直接返回其输入。如果指定了这一点，那么收集过程可能会短路此调用，并直接返回值。</li></ul><p><strong>在我们的情况下，我们有一个_UNORDERED_收集器，但需要省略其他两个：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">Set</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Characteristics</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">characteristics</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singleton</span><span class="token punctuation">(</span><span class="token class-name">Characteristics</span><span class="token punctuation">.</span><span class="token constant">UNORDERED</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在可以使用我们的收集器了：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">double</span> result <span class="token operator">=</span> values<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">WeightedAverage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>虽然编写收集器比以前更复杂，但使用它要容易得多。</strong> 我们还可以不费吹灰之力地利用像并行流这样的东西，这意味着这为我们提供了一个更易用且更强大的解决方案，假设我们需要重用它。</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span><strong>8. 结论</strong></span></a></h2><p>在这里，我们已经看到了几种不同的方法来计算一组数值的加权平均数，从简单地自己遍历这些值到编写一个完整的_Collector_实例，以便在需要执行此计算时重用。下次你需要这样做时，为什么不试试其中之一呢？</p><p>和往常一样，本文的全部代码可以在GitHub上找到。</p><p>OK</p>`,68),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-22-Calculate Weighted Mean in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Calculate%20Weighted%20Mean%20in%20Java.html","title":"在Java中计算加权平均数","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Java","编程"],"tag":["权重平均数","计算"],"head":[["meta",{"name":"keywords","content":"Java, 权重平均数, 计算, 编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Calculate%20Weighted%20Mean%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中计算加权平均数"}],["meta",{"property":"og:description","content":"在Java中计算加权平均数 1. 引言 在本文中，我们将探讨几种不同的方法来解决同一个问题——计算一组数值的加权平均数。 2. 什么是加权平均数？ 我们通过将一组数字全部相加，然后除以数字的个数来计算标准平均数。例如，数字1、3、5、7、9的平均数将是(1 + 3 + 5 + 7 + 9) / 5，等于5。 当我们计算加权平均数时，我们有一组每个数字都..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T22:50:14.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"权重平均数"}],["meta",{"property":"article:tag","content":"计算"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T22:50:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中计算加权平均数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T22:50:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中计算加权平均数 1. 引言 在本文中，我们将探讨几种不同的方法来解决同一个问题——计算一组数值的加权平均数。 2. 什么是加权平均数？ 我们通过将一组数字全部相加，然后除以数字的个数来计算标准平均数。例如，数字1、3、5、7、9的平均数将是(1 + 3 + 5 + 7 + 9) / 5，等于5。 当我们计算加权平均数时，我们有一组每个数字都..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 什么是加权平均数？","slug":"_2-什么是加权平均数","link":"#_2-什么是加权平均数","children":[]},{"level":2,"title":"3. 准备设置","slug":"_3-准备设置","link":"#_3-准备设置","children":[]},{"level":2,"title":"4. 两次遍历计算","slug":"_4-两次遍历计算","link":"#_4-两次遍历计算","children":[]},{"level":2,"title":"5. 扩展列表","slug":"_5-扩展列表","link":"#_5-扩展列表","children":[]},{"level":2,"title":"6. 减少列表","slug":"_6-减少列表","link":"#_6-减少列表","children":[]},{"level":2,"title":"7. 自定义收集器","slug":"_7-自定义收集器","link":"#_7-自定义收集器","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1719096614000,"updatedTime":1719096614000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.89,"words":2367},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Calculate Weighted Mean in Java.md","localizedDate":"2024年6月23日","excerpt":"\\n<h2><strong>1. 引言</strong></h2>\\n<p>在本文中，我们将探讨几种不同的方法来解决同一个问题——计算一组数值的加权平均数。</p>\\n<h2><strong>2. 什么是加权平均数？</strong></h2>\\n<p>我们通过将一组数字全部相加，然后除以数字的个数来计算标准平均数。例如，数字1、3、5、7、9的平均数将是(1 + 3 + 5 + 7 + 9) / 5，等于5。</p>\\n<p><strong>当我们计算加权平均数时，我们有一组每个数字都有权重的数字：</strong></p>\\n<table>\\n<thead>\\n<tr>\\n<th>数字</th>\\n<th>权重</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>1</td>\\n<td>10</td>\\n</tr>\\n<tr>\\n<td>3</td>\\n<td>20</td>\\n</tr>\\n<tr>\\n<td>5</td>\\n<td>30</td>\\n</tr>\\n<tr>\\n<td>7</td>\\n<td>50</td>\\n</tr>\\n<tr>\\n<td>9</td>\\n<td>40</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{d as comp,k as data};
