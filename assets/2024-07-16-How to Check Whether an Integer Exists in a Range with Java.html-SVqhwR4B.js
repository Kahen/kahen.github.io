import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-yRPSFQJx.js";const p={},t=e('<h1 id="如何使用java检查整数是否存在于给定范围内" tabindex="-1"><a class="header-anchor" href="#如何使用java检查整数是否存在于给定范围内"><span>如何使用Java检查整数是否存在于给定范围内</span></a></h1><p>在本教程中，我们将探讨一些检查整数是否存在于给定范围内的方法。我们将使用运算符以及几个工具类来实现这一点。</p><h2 id="_2-范围类型" tabindex="-1"><a class="header-anchor" href="#_2-范围类型"><span>2. 范围类型</span></a></h2><p>在我们使用这些方法之前，我们需要清楚我们所谈论的是什么类型范围。在本教程中，我们将专注于这四种有界范围类型：</p><ul><li><strong>封闭范围</strong> – <strong>包括其下限和上限</strong></li><li><strong>开放范围</strong> – <strong>不包括其下限和上限</strong></li><li><strong>左开右闭范围</strong> – <strong>包括其上限并排除其下限</strong></li><li><strong>左闭右开范围</strong> – <strong>包括其下限并排除其上限</strong></li></ul><p>例如，假设我们想知道整数20是否出现在这两个范围内：<em>R1 = [10, 20)</em>，一个左闭右开范围，和 <em>R2 = (10, 20]</em>，一个左开右闭范围。由于 <em>R1</em> 不包含其上限，整数20仅存在于 <em>R2</em> 中。</p><h2 id="_3-使用-和-运算符" tabindex="-1"><a class="header-anchor" href="#_3-使用-和-运算符"><span>3. 使用 <em>`&lt;</em> 和 <em>&lt;=</em> 运算符</span></a></h2><p>我们的目标是确定一个数字是否在给定的下限和上限之间。我们将首先使用基本的Java运算符来检查这一点。</p><p>让我们定义一个类，用于检查所有四种类型范围：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IntRangeOperators</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isInClosedRange</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> number<span class="token punctuation">,</span> <span class="token class-name">Integer</span> lowerBound<span class="token punctuation">,</span> <span class="token class-name">Integer</span> upperBound<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">(</span>lowerBound <span class="token operator">&lt;=</span> number <span class="token operator">&amp;&amp;</span> number <span class="token operator">&lt;=</span> upperBound<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isInOpenRange</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> number<span class="token punctuation">,</span> <span class="token class-name">Integer</span> lowerBound<span class="token punctuation">,</span> <span class="token class-name">Integer</span> upperBound<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">(</span>lowerBound <span class="token operator">&lt;</span> number <span class="token operator">&amp;&amp;</span> number <span class="token operator">&lt;</span> upperBound<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isInOpenClosedRange</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> number<span class="token punctuation">,</span> <span class="token class-name">Integer</span> lowerBound<span class="token punctuation">,</span> <span class="token class-name">Integer</span> upperBound<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">(</span>lowerBound <span class="token operator">&lt;</span> number <span class="token operator">&amp;&amp;</span> number <span class="token operator">&lt;=</span> upperBound<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isInClosedOpenRange</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> number<span class="token punctuation">,</span> <span class="token class-name">Integer</span> lowerBound<span class="token punctuation">,</span> <span class="token class-name">Integer</span> upperBound<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">(</span>lowerBound <span class="token operator">&lt;=</span> number <span class="token operator">&amp;&amp;</span> number <span class="token operator">&lt;</span> upperBound<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，<strong>通过改变运算符以包含或排除界限，我们可以调整区间为开放、封闭或半开放。</strong></p><p>让我们测试我们的 <em>static</em> <em>isInOpenClosedRange()</em> 方法。我们将指定左开右闭范围 <em>(10,20]</em> 通过传入10作为下限和20作为上限：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">IntRangeClassic</span><span class="token punctuation">.</span><span class="token function">isInOpenClosedRange</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">IntRangeClassic</span><span class="token punctuation">.</span><span class="token function">isInOpenClosedRange</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在第一次测试中，我们成功验证了整数20存在于 <em>(10,20]</em> 范围内，该范围包括其上限。然后我们确认整数10不存在于同一范围内，该范围排除了其下限。</p><h2 id="_4-使用范围类" tabindex="-1"><a class="header-anchor" href="#_4-使用范围类"><span>4. 使用范围类</span></a></h2><p>作为使用Java运算符的替代方案，我们还可以使用表示范围的实用工具类。使用预定义类的主要用途是 <strong>范围类提供了一些或全部上述范围类型的即用型实现。</strong></p><p>此外，<strong>我们可以配置一个范围对象，用我们定义的界限，并在其他方法或类中重用该对象。</strong> 通过一次定义范围，如果我们需要在整个代码库中对同一范围进行多次检查，我们的代码就不太可能出错。</p><p>另一方面，我们将要查看的两个范围类在外部库中，我们必须在项目中导入它们之后才能使用它们。</p><h3 id="_4-1-使用-java-time-temporal-valuerange" tabindex="-1"><a class="header-anchor" href="#_4-1-使用-java-time-temporal-valuerange"><span>4.1. 使用 <em>java.time.temporal.ValueRange</em></span></a></h3><p>不需要导入外部库的范围类是 <em>java.time.temporal.ValueRange</em>，在JDK 1.8中引入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IntRangeValueRange</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isInClosedRange</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> number<span class="token punctuation">,</span> <span class="token class-name">Integer</span> lowerBound<span class="token punctuation">,</span> <span class="token class-name">Integer</span> upperBound<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">final</span> <span class="token class-name">ValueRange</span> range <span class="token operator">=</span> <span class="token class-name">ValueRange</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>lowerBound<span class="token punctuation">,</span> upperBound<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> range<span class="token punctuation">.</span><span class="token function">isValidIntValue</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isInOpenRange</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> number<span class="token punctuation">,</span> <span class="token class-name">Integer</span> lowerBound<span class="token punctuation">,</span> <span class="token class-name">Integer</span> upperBound<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">final</span> <span class="token class-name">ValueRange</span> range <span class="token operator">=</span> <span class="token class-name">ValueRange</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>lowerBound <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> upperBound <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> range<span class="token punctuation">.</span><span class="token function">isValidIntValue</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isInOpenClosedRange</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> number<span class="token punctuation">,</span> <span class="token class-name">Integer</span> lowerBound<span class="token punctuation">,</span> <span class="token class-name">Integer</span> upperBound<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">final</span> <span class="token class-name">ValueRange</span> range <span class="token operator">=</span> <span class="token class-name">ValueRange</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>lowerBound <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> upperBound<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> range<span class="token punctuation">.</span><span class="token function">isValidIntValue</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isInClosedOpenRange</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> number<span class="token punctuation">,</span> <span class="token class-name">Integer</span> lowerBound<span class="token punctuation">,</span> <span class="token class-name">Integer</span> upperBound<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">final</span> <span class="token class-name">ValueRange</span> range <span class="token operator">=</span> <span class="token class-name">ValueRange</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>lowerBound<span class="token punctuation">,</span> upperBound <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> range<span class="token punctuation">.</span><span class="token function">isValidIntValue</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，我们通过将 <em>lowerBound</em> 和 <em>upperBound</em> 传递给 <em>static</em> <em>of()</em> 方法来创建 <em>ValueRange</em> 对象。然后我们使用每个对象的 <em>isValidIntValue()</em> 方法检查 <em>number</em> 是否存在于每个范围内。</p><p>我们应该注意到 <strong><em>ValueRange</em> 仅支持封闭范围检查开箱即用</strong>。因此，<strong>我们必须通过增加 <em>lowerBound</em> 来验证左开范围，并通过对 <em>upperBound</em> 减一来验证右开范围</strong>，正如我们上面所做的。</p><h3 id="_4-2-使用apache-commons" tabindex="-1"><a class="header-anchor" href="#_4-2-使用apache-commons"><span>4.2. 使用Apache Commons</span></a></h3><p>让我们继续使用我们可以从第三方库中使用的某些范围类。首先，我们将添加Apache Commons依赖项到我们的项目中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.commons``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``commons-lang3``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``3.12.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用Apache Commons <em>Range</em> 类实现与之前相同的行为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IntRangeApacheCommons</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isInClosedRange</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> number<span class="token punctuation">,</span> <span class="token class-name">Integer</span> lowerBound<span class="token punctuation">,</span> <span class="token class-name">Integer</span> upperBound<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">final</span> <span class="token class-name">Range</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```````` range <span class="token operator">=</span> <span class="token class-name">Range</span><span class="token punctuation">.</span><span class="token function">between</span><span class="token punctuation">(</span>lowerBound<span class="token punctuation">,</span> upperBound<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> range<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isInOpenRange</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> number<span class="token punctuation">,</span> <span class="token class-name">Integer</span> lowerBound<span class="token punctuation">,</span> <span class="token class-name">Integer</span> upperBound<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">final</span> <span class="token class-name">Range</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```````` range <span class="token operator">=</span> <span class="token class-name">Range</span><span class="token punctuation">.</span><span class="token function">between</span><span class="token punctuation">(</span>lowerBound <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> upperBound <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> range<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isInOpenClosedRange</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> number<span class="token punctuation">,</span> <span class="token class-name">Integer</span> lowerBound<span class="token punctuation">,</span> <span class="token class-name">Integer</span> upperBound<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">final</span> <span class="token class-name">Range</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```````` range <span class="token operator">=</span> <span class="token class-name">Range</span><span class="token punctuation">.</span><span class="token function">between</span><span class="token punctuation">(</span>lowerBound <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> upperBound<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> range<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isInClosedOpenRange</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> number<span class="token punctuation">,</span> <span class="token class-name">Integer</span> lowerBound<span class="token punctuation">,</span> <span class="token class-name">Integer</span> upperBound<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">final</span> <span class="token class-name">Range</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```````` range <span class="token operator">=</span> <span class="token class-name">Range</span><span class="token punctuation">.</span><span class="token function">between</span><span class="token punctuation">(</span>lowerBound<span class="token punctuation">,</span> upperBound <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> range<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与 <em>ValueRange</em> 的 <em>of()</em> 方法一样，我们传递 <em>lowerBound</em> 和 <em>upperBound</em> 到 <em>Range</em> 的 <em>static between()</em> 方法来创建 <em>Range</em> 对象。然后我们使用 <em>contains()</em> 方法检查 <em>number</em> 是否存在于每个对象的范围内。</p><p><strong>Apache Commons <em>Range</em> 类也仅支持封闭间隔</strong>，但我们再次调整了 <em>lowerBound</em> 和 <em>upperBound</em>，正如我们对 <em>ValueRange</em> 所做的。</p><p>此外，作为一个泛型类，<em>Range</em> 不仅可以用于 <em>Integer</em>，还可以用于任何实现了 <em>Comparable</em> 的其他类型。</p><h3 id="_4-3-使用google-guava" tabindex="-1"><a class="header-anchor" href="#_4-3-使用google-guava"><span>4.3. 使用Google Guava</span></a></h3><p>最后，让我们添加Google Guava依赖项到我们的项目中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.google.guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``33.0.0-jre``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用Guava的 <em>Range</em> 类来重新实现与之前相同的行为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IntRangeGoogleGuava</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isInClosedRange</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> number<span class="token punctuation">,</span> <span class="token class-name">Integer</span> lowerBound<span class="token punctuation">,</span> <span class="token class-name">Integer</span> upperBound<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">final</span> <span class="token class-name">Range</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```````` range <span class="token operator">=</span> <span class="token class-name">Range</span><span class="token punctuation">.</span><span class="token function">closed</span><span class="token punctuation">(</span>lowerBound<span class="token punctuation">,</span> upperBound<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> range<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isInOpenRange</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> number<span class="token punctuation">,</span> <span class="token class-name">Integer</span> lowerBound<span class="token punctuation">,</span> <span class="token class-name">Integer</span> upperBound<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">final</span> <span class="token class-name">Range</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```````` range <span class="token operator">=</span> <span class="token class-name">Range</span><span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span>lowerBound<span class="token punctuation">,</span> upperBound<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> range<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isInOpenClosedRange</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> number<span class="token punctuation">,</span> <span class="token class-name">Integer</span> lowerBound<span class="token punctuation">,</span> <span class="token class-name">Integer</span> upperBound<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">final</span> <span class="token class-name">Range</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```````` range <span class="token operator">=</span> <span class="token class-name">Range</span><span class="token punctuation">.</span><span class="token function">openClosed</span><span class="token punctuation">(</span>lowerBound<span class="token punctuation">,</span> upperBound<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> range<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isInClosedOpenRange</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> number<span class="token punctuation">,</span> <span class="token class-name">Integer</span> lowerBound<span class="token punctuation">,</span> <span class="token class-name">Integer</span> upperBound<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">final</span> <span class="token class-name">Range</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```````` range <span class="token operator">=</span> <span class="token class-name">Range</span><span class="token punctuation">.</span><span class="token function">closedOpen</span><span class="token punctuation">(</span>lowerBound<span class="token punctuation">,</span> upperBound<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> range<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，Guava的 <em>Range</em> 类有四种不同的方法来创建我们之前讨论的每种范围类型。也就是说，与其他我们迄今为止看到的范围类不同，<strong>Guava的 <em>Range</em> 类本地支持开放和半开放范围</strong>。例如，要指定一个不包含其上限的半开区间，我们将 <em>lowerBound</em> 和 <em>upperBound</em> 传递给 <em>static</em> <em>closedOpen()</em> 方法。对于不包含其下限的半开区间，我们使用了 <em>openClosed()</em>。然后我们使用 <em>contains()</em> 方法检查 <em>number</em> 是否存在于每个范围内。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何使用基本运算符和范围类来检查一个整数是否落在给定的范围内。我们还探讨了各种方法的优缺点。</p><p>如常，这些示例的源代码可在GitHub上找到。</p>',40),o=[t];function c(l,u){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-16-How to Check Whether an Integer Exists in a Range with Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-How%20to%20Check%20Whether%20an%20Integer%20Exists%20in%20a%20Range%20with%20Java.html","title":"如何使用Java检查整数是否存在于给定范围内","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Range","Interval"],"head":[["meta",{"name":"keywords","content":"Java, Range, Interval, Integer, Check"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-How%20to%20Check%20Whether%20an%20Integer%20Exists%20in%20a%20Range%20with%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何使用Java检查整数是否存在于给定范围内"}],["meta",{"property":"og:description","content":"如何使用Java检查整数是否存在于给定范围内 在本教程中，我们将探讨一些检查整数是否存在于给定范围内的方法。我们将使用运算符以及几个工具类来实现这一点。 2. 范围类型 在我们使用这些方法之前，我们需要清楚我们所谈论的是什么类型范围。在本教程中，我们将专注于这四种有界范围类型： 封闭范围 – 包括其下限和上限 开放范围 – 不包括其下限和上限 左开右闭..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T15:26:52.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Range"}],["meta",{"property":"article:tag","content":"Interval"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T15:26:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何使用Java检查整数是否存在于给定范围内\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T15:26:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何使用Java检查整数是否存在于给定范围内 在本教程中，我们将探讨一些检查整数是否存在于给定范围内的方法。我们将使用运算符以及几个工具类来实现这一点。 2. 范围类型 在我们使用这些方法之前，我们需要清楚我们所谈论的是什么类型范围。在本教程中，我们将专注于这四种有界范围类型： 封闭范围 – 包括其下限和上限 开放范围 – 不包括其下限和上限 左开右闭..."},"headers":[{"level":2,"title":"2. 范围类型","slug":"_2-范围类型","link":"#_2-范围类型","children":[]},{"level":2,"title":"3. 使用 `< 和 <= 运算符","slug":"_3-使用-和-运算符","link":"#_3-使用-和-运算符","children":[]},{"level":2,"title":"4. 使用范围类","slug":"_4-使用范围类","link":"#_4-使用范围类","children":[{"level":3,"title":"4.1. 使用 java.time.temporal.ValueRange","slug":"_4-1-使用-java-time-temporal-valuerange","link":"#_4-1-使用-java-time-temporal-valuerange","children":[]},{"level":3,"title":"4.2. 使用Apache Commons","slug":"_4-2-使用apache-commons","link":"#_4-2-使用apache-commons","children":[]},{"level":3,"title":"4.3. 使用Google Guava","slug":"_4-3-使用google-guava","link":"#_4-3-使用google-guava","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721143612000,"updatedTime":1721143612000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.39,"words":1617},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-How to Check Whether an Integer Exists in a Range with Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨一些检查整数是否存在于给定范围内的方法。我们将使用运算符以及几个工具类来实现这一点。</p>\\n<h2>2. 范围类型</h2>\\n<p>在我们使用这些方法之前，我们需要清楚我们所谈论的是什么类型范围。在本教程中，我们将专注于这四种有界范围类型：</p>\\n<ul>\\n<li><strong>封闭范围</strong> – <strong>包括其下限和上限</strong></li>\\n<li><strong>开放范围</strong> – <strong>不包括其下限和上限</strong></li>\\n<li><strong>左开右闭范围</strong> – <strong>包括其上限并排除其下限</strong></li>\\n<li><strong>左闭右开范围</strong> – <strong>包括其下限并排除其上限</strong></li>\\n</ul>","autoDesc":true}');export{k as comp,d as data};
