import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as p}from"./app-DfO5Xg_k.js";const t={},e=p(`<hr><h1 id="在java中检查三个布尔值中至少有两个为真" tabindex="-1"><a class="header-anchor" href="#在java中检查三个布尔值中至少有两个为真"><span>在Java中检查三个布尔值中至少有两个为真</span></a></h1><p>布尔类型是Java的基本数据类型之一。它非常简单，只有两个值：真（true）和假（false）。</p><p>在本教程中，我们将探讨一个问题：检查给定的三个布尔值中是否至少有两个为真。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>这个问题相当直接。我们将得到三个布尔值。如果其中至少有两个为真，我们的方法应该返回真。</p><p>解决这个问题对我们来说并不难。然而，在本教程中，我们将探索一些不错的解决方案。此外，我们将讨论每种方法是否可以轻松扩展来解决一个更一般的问题：<strong>给定n个布尔值，检查其中至少有x个为真</strong>。</p><p>我们将通过单元测试来验证每种方法。因此，让我们首先创建一个Map对象来保存测试用例和预期结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Map</span>\`<span class="token operator">&lt;</span><span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token class-name">Boolean</span><span class="token operator">&gt;</span>\` <span class="token constant">TEST_CASES_AND_EXPECTED</span> <span class="token operator">=</span> <span class="token class-name">ImmutableMap</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，_TEST_CASES_AND_EXPECTED_映射包含四种场景及其预期结果。稍后，我们将遍历这个映射对象，并将每个布尔数组作为参数传递给每种方法，并验证方法是否返回预期值。</p><p>接下来，让我们看看如何解决问题。</p><h2 id="_3-遍历三个布尔值" tabindex="-1"><a class="header-anchor" href="#_3-遍历三个布尔值"><span>3. 遍历三个布尔值</span></a></h2><p>解决这个问题最直接的想法可能是<strong>遍历给定的三个布尔值并计算真值</strong>。</p><p>一旦计数器大于或等于2，我们就停止检查并返回真。否则，三个布尔值中的真值数量少于2。因此，我们返回假：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">twoOrMoreAreTrueByLoop</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> a<span class="token punctuation">,</span> <span class="token keyword">boolean</span> b<span class="token punctuation">,</span> <span class="token keyword">boolean</span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">boolean</span> i <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        count <span class="token operator">+=</span> i <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">&gt;=</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们使用_TEST_CASES_AND_EXPECTED_映射来测试这个方法是否有效：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token constant">TEST_CASES_AND_EXPECTED</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> expected<span class="token punctuation">)</span> <span class="token operator">-&gt;</span>
  <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token class-name">ThreeBooleans</span><span class="token punctuation">.</span><span class="token function">twoOrMoreAreTrueByLoop</span><span class="token punctuation">(</span>array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> array<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> array<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行这个测试，不出所料，它通过了。</p><p>这种方法非常容易理解。此外，假设我们改变方法的参数为一个布尔数组（或一个集合）和一个整数x。在这种情况下，<strong>它可以很容易地扩展成为一个通用解决方案来解决问题：给定n个布尔值，检查其中至少有x个为真</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">xOrMoreAreTrueByLoop</span><span class="token punctuation">(</span><span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span> booleans<span class="token punctuation">,</span> <span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">boolean</span> i <span class="token operator">:</span> booleans<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        count <span class="token operator">+=</span> i <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">&gt;=</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-将布尔值转换为数字" tabindex="-1"><a class="header-anchor" href="#_4-将布尔值转换为数字"><span>4. 将布尔值转换为数字</span></a></h2><p>同样，<strong>我们可以将三个布尔值转换为数字并计算它们的和，并检查它是否大于或等于2</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">twoOrMoreAreTrueBySum</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> a<span class="token punctuation">,</span> <span class="token keyword">boolean</span> b<span class="token punctuation">,</span> <span class="token keyword">boolean</span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>a <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span>b <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span>c <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们执行测试以确保它按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token constant">TEST_CASES_AND_EXPECTED</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> expected<span class="token punctuation">)</span> <span class="token operator">-&gt;</span>
  <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token class-name">ThreeBooleans</span><span class="token punctuation">.</span><span class="token function">twoOrMoreAreTrueBySum</span><span class="token punctuation">(</span>array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> array<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> array<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们也可以将这种方法转化为一个通用解决方案，以检查n个布尔值中至少有x个为真：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">xOrMoreAreTrueBySum</span><span class="token punctuation">(</span><span class="token class-name">Boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span> booleans<span class="token punctuation">,</span> <span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>booleans<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">mapToInt</span><span class="token punctuation">(</span>b <span class="token operator">-&gt;</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token constant">TRUE</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在上面的代码中使用了Stream API将每个布尔值转换为一个整数并计算总和。</p><h2 id="_5-使用逻辑运算符" tabindex="-1"><a class="header-anchor" href="#_5-使用逻辑运算符"><span>5. 使用逻辑运算符</span></a></h2><p>我们已经通过将布尔值转换为整数来解决了问题。或者，我们可以使用逻辑运算来确定至少有两个布尔值为真。</p><p>我们可以对每两个布尔值执行逻辑与（&amp;&amp;）操作。因此，我们将对给定的三个布尔值执行三次与操作。<strong>如果三个布尔值中有至少两个为真，那么至少有一个逻辑与操作的结果应该为真</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">twoOrMoreAreTrueByOpeators</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> a<span class="token punctuation">,</span> <span class="token keyword">boolean</span> b<span class="token punctuation">,</span> <span class="token keyword">boolean</span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>a <span class="token operator">&amp;&amp;</span> b<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>a <span class="token operator">&amp;&amp;</span> c<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>b <span class="token operator">&amp;&amp;</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，如果我们使用_TEST_CASES_AND_EXPECTED_映射来测试这个方法，它也会通过：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token constant">TEST_CASES_AND_EXPECTED</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> expected<span class="token punctuation">)</span> <span class="token operator">-&gt;</span>
  <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token class-name">ThreeBooleans</span><span class="token punctuation">.</span><span class="token function">twoOrMoreAreTrueByOpeators</span><span class="token punctuation">(</span>array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> array<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> array<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们考虑一下是否可以将这种方法扩展到一般情况。<strong>它仅在x为2时有效。此外，如果n足够大，我们可能需要构建一个长逻辑操作链</strong>。</p><p>因此，它不适合一般问题。</p><h2 id="_6-使用卡诺图" tabindex="-1"><a class="header-anchor" href="#_6-使用卡诺图"><span>6. 使用卡诺图</span></a></h2><p><strong>卡诺图是一种简化布尔代数表达式的方法</strong>。此外，我们可以从卡诺图中写出表达式。因此，有时它可以帮助我们解决复杂的布尔代数问题。</p><p>接下来，让我们看看如何使用卡诺图来解决这个问题。假设我们有三个布尔值，A、B和C，我们可以构建一个卡诺图：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>      | C | !C
------|---|----
 A  B | 1 | 1
 A !B | 1 | 0
!A !B | 0 | 0
!A  B | 1 | 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上表中，A、B和C表示它们的真值。相反，!A、!B和!C表示它们的假值。</p><p>因此，正如我们所见，表中涵盖了给定三个布尔值的所有可能组合。此外，我们可以找到所有至少有两个布尔值为真的组合情况。对于这些情况，我们在表中写了‘1’。因此，有两个包含一的组：第一行（组1）和第一列（组2）。</p><p><strong>因此，最终的布尔代数表达式是：（组1中所有一的表达式）||（组2中所有一的表达式）</strong>。</p><p>接下来，让我们分而治之。</p><ul><li>组1（第一行）——A和B都为真。无论C的值是什么，我们都会有一个。因此，我们有：<em>A &amp;&amp; B</em></li><li>组2（第一列）——首先，C始终为真。此外，A和B中至少有一个为真。因此，我们得到：<em>C &amp;&amp; (A || B)</em></li></ul><p>最后，让我们将两组合并并得到解决方案：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">twoorMoreAreTrueByKarnaughMap</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> a<span class="token punctuation">,</span> <span class="token keyword">boolean</span> b<span class="token punctuation">,</span> <span class="token keyword">boolean</span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>c <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>a <span class="token operator">||</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>a <span class="token operator">&amp;&amp;</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们测试一下这个方法是否按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token constant">TEST_CASES_AND_EXPECTED</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> expected<span class="token punctuation">)</span> <span class="token operator">-&gt;</span>
  <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token class-name">ThreeBooleans</span><span class="token punctuation">.</span><span class="token function">twoorMoreAreTrueByKarnaughMap</span><span class="token punctuation">(</span>array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> array<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> array<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们执行测试，它会通过。也就是说，这个方法是有效的。</p><p>然而，如果我们尝试使用这种方法来解决一般问题，当n很大时，制作表格可能会很困难。</p><p>因此，<strong>尽管卡诺图擅长解决复杂的布尔代数问题，但它不适合一些动态和一般的任务</strong>。</p><h2 id="_7-使用异或运算符" tabindex="-1"><a class="header-anchor" href="#_7-使用异或运算符"><span>7. 使用异或运算符</span></a></h2><p>最后，让我们看看另一种有趣的方法。</p><p>在这个问题中，我们得到了三个布尔值。此外，我们知道一个布尔值只能有两个不同的值：真（true）和假（false）。</p><p>因此，让我们首先从三个中取出任意两个布尔值，比如说a和b。然后，我们检查表达式_a != b_的结果：</p><ul><li>_a != b_为真——a或b为真。因此，如果c为真，那么我们就有两个真值。否则，我们有三个布尔值中的两个假值。也就是说，c的值是答案。</li><li>_a != b_为假——a和b具有相同的值。由于我们只有三个布尔值，a（或b）的值是答案。</li></ul><p>因此，我们可以得出结论：<em>a != b ? c : a</em>。此外，_a != b_检查实际上是一个异或操作。因此，解决方案可以简单到：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">twoOrMoreAreTrueByXor</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> a<span class="token punctuation">,</span> <span class="token keyword">boolean</span> b<span class="token punctuation">,</span> <span class="token keyword">boolean</span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">^</span> b <span class="token operator">?</span> c <span class="token operator">:</span> a<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们使用_TEST_CASES_AND_EXPECTED_映射来测试这个方法时，测试也会通过：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token constant">TEST_CASES_AND_EXPECTED</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> expected<span class="token punctuation">)</span> <span class="token operator">-&gt;</span>
  <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token class-name">ThreeBooleans</span><span class="token punctuation">.</span><span class="token function">twoOrMoreAreTrueByXor</span><span class="token punctuation">(</span>array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> array<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> array<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个解决方案非常紧凑且巧妙。然而，<strong>我们不能将其扩展来解决一般问题</strong>。</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们探讨了几种不同的方法来检查给定的三个布尔值中是否至少有两个为真。</p><p>此外，我们讨论了哪种方法可以轻松扩展来解决更一般的问题：检查给定的n个布尔值中是否至少有x个为真。</p><p>一如既往，完整的源代码可以在GitHub上找到。 OK</p>`,66),o=[e];function c(l,u){return s(),a("div",null,o)}const k=n(t,[["render",c],["__file","2024-07-17-Check if at Least Two Out of Three Booleans Are True in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Check%20if%20at%20Least%20Two%20Out%20of%20Three%20Booleans%20Are%20True%20in%20Java.html","title":"在Java中检查三个布尔值中至少有两个为真","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Boolean","Logic"],"head":[["meta",{"name":"keywords","content":"Java, Boolean, Programming, Logic"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Check%20if%20at%20Least%20Two%20Out%20of%20Three%20Booleans%20Are%20True%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中检查三个布尔值中至少有两个为真"}],["meta",{"property":"og:description","content":"在Java中检查三个布尔值中至少有两个为真 布尔类型是Java的基本数据类型之一。它非常简单，只有两个值：真（true）和假（false）。 在本教程中，我们将探讨一个问题：检查给定的三个布尔值中是否至少有两个为真。 2. 问题介绍 这个问题相当直接。我们将得到三个布尔值。如果其中至少有两个为真，我们的方法应该返回真。 解决这个问题对我们来说并不难。然..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T23:31:13.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Boolean"}],["meta",{"property":"article:tag","content":"Logic"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T23:31:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中检查三个布尔值中至少有两个为真\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T23:31:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中检查三个布尔值中至少有两个为真 布尔类型是Java的基本数据类型之一。它非常简单，只有两个值：真（true）和假（false）。 在本教程中，我们将探讨一个问题：检查给定的三个布尔值中是否至少有两个为真。 2. 问题介绍 这个问题相当直接。我们将得到三个布尔值。如果其中至少有两个为真，我们的方法应该返回真。 解决这个问题对我们来说并不难。然..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 遍历三个布尔值","slug":"_3-遍历三个布尔值","link":"#_3-遍历三个布尔值","children":[]},{"level":2,"title":"4. 将布尔值转换为数字","slug":"_4-将布尔值转换为数字","link":"#_4-将布尔值转换为数字","children":[]},{"level":2,"title":"5. 使用逻辑运算符","slug":"_5-使用逻辑运算符","link":"#_5-使用逻辑运算符","children":[]},{"level":2,"title":"6. 使用卡诺图","slug":"_6-使用卡诺图","link":"#_6-使用卡诺图","children":[]},{"level":2,"title":"7. 使用异或运算符","slug":"_7-使用异或运算符","link":"#_7-使用异或运算符","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1721259073000,"updatedTime":1721259073000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.78,"words":2035},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Check if at Least Two Out of Three Booleans Are True in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>在Java中检查三个布尔值中至少有两个为真</h1>\\n<p>布尔类型是Java的基本数据类型之一。它非常简单，只有两个值：真（true）和假（false）。</p>\\n<p>在本教程中，我们将探讨一个问题：检查给定的三个布尔值中是否至少有两个为真。</p>\\n<h2>2. 问题介绍</h2>\\n<p>这个问题相当直接。我们将得到三个布尔值。如果其中至少有两个为真，我们的方法应该返回真。</p>\\n<p>解决这个问题对我们来说并不难。然而，在本教程中，我们将探索一些不错的解决方案。此外，我们将讨论每种方法是否可以轻松扩展来解决一个更一般的问题：<strong>给定n个布尔值，检查其中至少有x个为真</strong>。</p>","autoDesc":true}');export{k as comp,d as data};
