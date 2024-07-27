import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CJGTm_7y.js";const e={},p=t('<hr><h1 id="java中if语句中多个-或-条件的格式化" tabindex="-1"><a class="header-anchor" href="#java中if语句中多个-或-条件的格式化"><span>Java中if语句中多个“或”条件的格式化</span></a></h1><p>在编写if语句时，我们可能需要使用逻辑运算符如AND或OR来设置多个条件。这可能不是一个好的设计，会影响代码的可读性和认知复杂性。</p><p>在本教程中，我们将看到在if语句中格式化多个值条件的替代方法。</p><h2 id="_2-我们可以避免if语句吗" tabindex="-1"><a class="header-anchor" href="#_2-我们可以避免if语句吗"><span>2. 我们可以避免if语句吗？</span></a></h2><p>假设我们有一个电子商务平台，并为特定月份出生的人设置折扣。让我们看看以下代码片段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>month <span class="token operator">==</span> <span class="token number">10</span> <span class="token operator">||</span> month <span class="token operator">==</span> <span class="token number">11</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// doSomething()</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>month <span class="token operator">==</span> <span class="token number">4</span> <span class="token operator">||</span> month <span class="token operator">==</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// doSomething2()</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    <span class="token comment">// doSomething3()</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这可能导致一些难以阅读的代码。即使我们有良好的测试覆盖率，代码也可能难以维护，因为它迫使我们，例如，把不同的条件放在一起以执行特定的操作。</p><h3 id="_2-1-使用干净的代码" tabindex="-1"><a class="header-anchor" href="#_2-1-使用干净的代码"><span>2.1. 使用干净的代码</span></a></h3><p>我们可以应用模式来替换许多if语句。例如，我们可以将if的多个条件逻辑移动到一个类或枚举中。在运行时，我们将根据客户端输入在接口之间切换。同样，我们可以看看策略模式。</p><p>这并不严格与格式化有关，通常会导致重新思考逻辑。尽管如此，这是我们可以考虑到的，以改进我们的设计。</p><h3 id="_2-2-改进方法语法" tabindex="-1"><a class="header-anchor" href="#_2-2-改进方法语法"><span>2.2. 改进方法语法</span></a></h3><p><strong>然而，只要代码易于阅读且易于维护，使用if / else逻辑并没有什么问题。</strong> 例如，让我们考虑以下代码片段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>month <span class="token operator">==</span> <span class="token number">8</span> <span class="token operator">||</span> month <span class="token operator">==</span> <span class="token number">9</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">doSomethingElse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作为第一步，我们可以避免使用else部分：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>month <span class="token operator">==</span> <span class="token number">8</span> <span class="token operator">||</span> month <span class="token operator">==</span> <span class="token number">9</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">return</span> <span class="token function">doSomethingElse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还可以通过使用java.time包中的枚举来改进一些其他代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>month <span class="token operator">==</span> <span class="token constant">OCTOBER</span> <span class="token operator">||</span> month <span class="token operator">==</span> <span class="token constant">NOVEMBER</span> <span class="token operator">||</span> month <span class="token operator">==</span> <span class="token constant">DECEMBER</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token comment">// ...</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些都是简单但有效的代码改进。因此，在应用复杂模式之前，我们首先应该看看是否可以提高代码的可读性。</p><p>我们还将看到如何使用函数式编程。在Java中，这从版本8开始应用，使用lambda表达式语法。</p><h2 id="_3-测试传说" tabindex="-1"><a class="header-anchor" href="#_3-测试传说"><span>3. 测试传说</span></a></h2><p>按照电子商务折扣示例，我们将创建测试并检查折扣月份中的值。例如，从10月到12月。否则我们断言为假。我们将设置随机月份，这些月份要么在允许的月份内，要么不在：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Month</span> <span class="token function">monthIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">Month</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">ints</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span>findFirst\n      <span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token class-name">Month</span> <span class="token function">monthNotIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">Month</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">ints</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span>findFirst\n      <span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可能有多个if条件，尽管，为了简单起见，我们将假设只有一个if / else语句。</p><h2 id="_4-使用switch" tabindex="-1"><a class="header-anchor" href="#_4-使用switch"><span>4. 使用Switch</span></a></h2><p><strong>使用if逻辑的替代方法是switch命令。</strong> 让我们看看我们如何在示例中使用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">switchMonth</span><span class="token punctuation">(</span><span class="token class-name">Month</span> month<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">switch</span> <span class="token punctuation">(</span>month<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">case</span> <span class="token constant">OCTOBER</span><span class="token operator">:</span>\n        <span class="token keyword">case</span> <span class="token constant">NOVEMBER</span><span class="token operator">:</span>\n        <span class="token keyword">case</span> <span class="token constant">DECEMBER</span><span class="token operator">:</span>\n            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n        <span class="token keyword">default</span><span class="token operator">:</span>\n            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意它将向下移动并检查所有有效月份（如果需要）。此外，我们可以使用Java 12中的新switch语法来改进这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">return</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>month<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">case</span> <span class="token constant">OCTOBER</span><span class="token punctuation">,</span> <span class="token constant">NOVEMBER</span><span class="token punctuation">,</span> <span class="token constant">DECEMBER</span> <span class="token operator">-&gt;</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n    <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们可以进行一些测试以验证值是否在范围内或不在范围内：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">switchMonth</span><span class="token punctuation">(</span><span class="token function">monthIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token function">switchMonth</span><span class="token punctuation">(</span><span class="token function">monthNotIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用集合" tabindex="-1"><a class="header-anchor" href="#_5-使用集合"><span>5. 使用集合</span></a></h2><p><strong>我们可以使用集合来分组满足if条件的内容，并检查一个值是否属于它：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Set</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Month</span><span class="token punctuation">&gt;</span></span>``````` months <span class="token operator">=</span> <span class="token class-name">Set</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token constant">OCTOBER</span><span class="token punctuation">,</span> <span class="token constant">NOVEMBER</span><span class="token punctuation">,</span> <span class="token constant">DECEMBER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们添加一些逻辑来查看集合是否包含特定值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">contains</span><span class="token punctuation">(</span><span class="token class-name">Month</span> month<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>months<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>month<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，我们可以添加一些单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token function">monthIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token function">monthNotIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-使用函数式编程" tabindex="-1"><a class="header-anchor" href="#_6-使用函数式编程"><span>6. 使用函数式编程</span></a></h2><p><strong>我们可以使用函数式编程将if / else逻辑转换为函数。</strong> 采用这种方法，我们将有可预测的方法使用我们的语法。</p><h3 id="_6-1-简单的谓词" tabindex="-1"><a class="header-anchor" href="#_6-1-简单的谓词"><span>6.1. 简单的谓词</span></a></h3><p>让我们仍然使用contains()方法。然而，这次我们使用Predicate将其作为lambda表达式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Predicate</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Month</span><span class="token punctuation">&gt;</span></span>``````` collectionPredicate <span class="token operator">=</span> <span class="token keyword">this</span><span class="token operator">::</span><span class="token function">contains</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们现在确定Predicate是不可变的，没有中间变量。其结果是可预测的，并且在我们需要时可以在其他上下文中重复使用。</p><p>让我们使用test()方法来检查它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span>collectionPredicate<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token function">monthIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertFalse</span><span class="token punctuation">(</span>collectionPredicate<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token function">monthNotIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-谓词链" tabindex="-1"><a class="header-anchor" href="#_6-2-谓词链"><span>6.2. 谓词链</span></a></h3><p>我们可以在or条件中添加多个Predicate来添加我们的逻辑：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Predicate</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Month</span><span class="token punctuation">&gt;</span></span>``````` <span class="token function">orPredicate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Predicate</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Month</span><span class="token punctuation">&gt;</span></span>``````` predicate <span class="token operator">=</span> x <span class="token operator">-&gt;</span> x <span class="token operator">==</span> <span class="token constant">OCTOBER</span><span class="token punctuation">;</span>\n    <span class="token class-name">Predicate</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Month</span><span class="token punctuation">&gt;</span></span>``````` predicate1 <span class="token operator">=</span> x <span class="token operator">-&gt;</span> x <span class="token operator">==</span> <span class="token constant">NOVEMBER</span><span class="token punctuation">;</span>\n    <span class="token class-name">Predicate</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Month</span><span class="token punctuation">&gt;</span></span>``````` predicate2 <span class="token operator">=</span> x <span class="token operator">-&gt;</span> x <span class="token operator">==</span> <span class="token constant">DECEMBER</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> predicate<span class="token punctuation">.</span><span class="token function">or</span><span class="token punctuation">(</span>predicate1<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">or</span><span class="token punctuation">(</span>predicate2<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们可以将其插入if中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">predicateWithIf</span><span class="token punctuation">(</span><span class="token class-name">Month</span> month<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">orPredicate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>month<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们检查一下这是否有效：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">predicateWithIf</span><span class="token punctuation">(</span><span class="token function">monthIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token function">predicateWithIf</span><span class="token punctuation">(</span><span class="token function">monthNotIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-流中的谓词" tabindex="-1"><a class="header-anchor" href="#_6-3-流中的谓词"><span>6.3. 流中的谓词</span></a></h3><p>同样，我们可以使用Predicate在Stream过滤器中。同样，在过滤器中的lambda表达式将替换并增强if逻辑。if最终将消失。这是函数式编程的优势，同时仍然保持良好的性能和可读性。</p><p>让我们在解析输入月份列表时测试这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Month</span><span class="token punctuation">&gt;</span></span>``````` monthList <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token function">monthIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">monthIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">monthNotIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nmonthList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">::</span><span class="token function">contains</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>m <span class="token operator">-&gt;</span> <span class="token function">assertThat</span><span class="token punctuation">(</span>m<span class="token punctuation">,</span> <span class="token function">is</span><span class="token punctuation">(</span><span class="token function">in</span><span class="token punctuation">(</span>months<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们也可以使用predicateWithIf()代替contains()。Lambda没有限制，如果它支持方法签名。例如，它可以是一个静态方法。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本教程中，我们学习了如何提高if语句中多个条件的可读性。我们看到了如何使用switch代替它。此外，我们还看到了如何使用集合来检查它是否包含一个值。最后，我们看到了如何采用使用lambda表达式的函数式方法。Predicate和Stream更少出错，并将提高代码的可读性和可维护性。</p><p>一如既往，本文中呈现的代码可在GitHub上找到。</p>',61),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-01-Format Multiple  or  Conditions in an If Statement in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Format%20Multiple%20%20or%20%20Conditions%20in%20an%20If%20Statement%20in%20Java.html","title":"Java中if语句中多个“或”条件的格式化","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["if statement","switch statement","functional programming"],"head":[["meta",{"name":"keywords","content":"Java, if statement, switch, functional programming, code readability"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Format%20Multiple%20%20or%20%20Conditions%20in%20an%20If%20Statement%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中if语句中多个“或”条件的格式化"}],["meta",{"property":"og:description","content":"Java中if语句中多个“或”条件的格式化 在编写if语句时，我们可能需要使用逻辑运算符如AND或OR来设置多个条件。这可能不是一个好的设计，会影响代码的可读性和认知复杂性。 在本教程中，我们将看到在if语句中格式化多个值条件的替代方法。 2. 我们可以避免if语句吗？ 假设我们有一个电子商务平台，并为特定月份出生的人设置折扣。让我们看看以下代码片段：..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T06:58:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"if statement"}],["meta",{"property":"article:tag","content":"switch statement"}],["meta",{"property":"article:tag","content":"functional programming"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T06:58:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中if语句中多个“或”条件的格式化\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T06:58:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中if语句中多个“或”条件的格式化 在编写if语句时，我们可能需要使用逻辑运算符如AND或OR来设置多个条件。这可能不是一个好的设计，会影响代码的可读性和认知复杂性。 在本教程中，我们将看到在if语句中格式化多个值条件的替代方法。 2. 我们可以避免if语句吗？ 假设我们有一个电子商务平台，并为特定月份出生的人设置折扣。让我们看看以下代码片段：..."},"headers":[{"level":2,"title":"2. 我们可以避免if语句吗？","slug":"_2-我们可以避免if语句吗","link":"#_2-我们可以避免if语句吗","children":[{"level":3,"title":"2.1. 使用干净的代码","slug":"_2-1-使用干净的代码","link":"#_2-1-使用干净的代码","children":[]},{"level":3,"title":"2.2. 改进方法语法","slug":"_2-2-改进方法语法","link":"#_2-2-改进方法语法","children":[]}]},{"level":2,"title":"3. 测试传说","slug":"_3-测试传说","link":"#_3-测试传说","children":[]},{"level":2,"title":"4. 使用Switch","slug":"_4-使用switch","link":"#_4-使用switch","children":[]},{"level":2,"title":"5. 使用集合","slug":"_5-使用集合","link":"#_5-使用集合","children":[]},{"level":2,"title":"6. 使用函数式编程","slug":"_6-使用函数式编程","link":"#_6-使用函数式编程","children":[{"level":3,"title":"6.1. 简单的谓词","slug":"_6-1-简单的谓词","link":"#_6-1-简单的谓词","children":[]},{"level":3,"title":"6.2. 谓词链","slug":"_6-2-谓词链","link":"#_6-2-谓词链","children":[]},{"level":3,"title":"6.3. 流中的谓词","slug":"_6-3-流中的谓词","link":"#_6-3-流中的谓词","children":[]}]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719817086000,"updatedTime":1719817086000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.93,"words":1479},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Format Multiple  or  Conditions in an If Statement in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中if语句中多个“或”条件的格式化</h1>\\n<p>在编写if语句时，我们可能需要使用逻辑运算符如AND或OR来设置多个条件。这可能不是一个好的设计，会影响代码的可读性和认知复杂性。</p>\\n<p>在本教程中，我们将看到在if语句中格式化多个值条件的替代方法。</p>\\n<h2>2. 我们可以避免if语句吗？</h2>\\n<p>假设我们有一个电子商务平台，并为特定月份出生的人设置折扣。让我们看看以下代码片段：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>month <span class=\\"token operator\\">==</span> <span class=\\"token number\\">10</span> <span class=\\"token operator\\">||</span> month <span class=\\"token operator\\">==</span> <span class=\\"token number\\">11</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">// doSomething()</span>\\n<span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">else</span> <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>month <span class=\\"token operator\\">==</span> <span class=\\"token number\\">4</span> <span class=\\"token operator\\">||</span> month <span class=\\"token operator\\">==</span> <span class=\\"token number\\">5</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">// doSomething2()</span>\\n<span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">else</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">// doSomething3()</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
