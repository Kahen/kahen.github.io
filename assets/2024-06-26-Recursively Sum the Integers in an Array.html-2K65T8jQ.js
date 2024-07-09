import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as p}from"./app-COaDJFIk.js";const t={},e=p(`<h1 id="数组中整数的递归求和-baeldung" tabindex="-1"><a class="header-anchor" href="#数组中整数的递归求和-baeldung"><span>数组中整数的递归求和 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>当我们处理数字时，对数组中的所有整数进行求和是一项常见操作。此外，递归经常提供优雅的解决方案。</p><p>在本教程中，我们将探讨如何使用递归来对数组中的整数进行求和。</p><h2 id="_2-带数组复制的递归" tabindex="-1"><a class="header-anchor" href="#_2-带数组复制的递归"><span>2. 带数组复制的递归</span></a></h2><p>首先，我们初始化一个整数数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token constant">INT_ARRAY</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>显然，上述数组中的整数之和是15。</p><p>在数组中求和数字的通常方法是sum <em>(array[0-n]) = array[0] + array[1] + array[2] + array[3] + … + array[n]</em>。</p><p>这种方法是直接的。或者，我们可以从不同的角度看待这个问题：<strong>数组中数字的和等于第一个数字加上其余数字组成的子数组的和：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">sumOf</span><span class="token punctuation">(</span>array<span class="token punctuation">[</span><span class="token number">0.</span><span class="token punctuation">.</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=</span> array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token function">sumOf</span><span class="token punctuation">(</span>subArray<span class="token punctuation">[</span><span class="token number">1.</span><span class="token punctuation">.</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，如果我们将_sumOf()_看作一个函数或方法，我们可以看到_sumOf()<em>的主体再次调用_sumOf()</em>。因此，_sumOf()_是一个递归方法。</p><p>由于Java不允许我们在创建后更改数组的长度，<strong>从技术上讲，从数组中移除一个元素是不可能的</strong>。但是Java提供了多种复制数组的方法。我们可以使用这些方法来创建子数组。</p><p>当我们实现递归方法时，定义基本情况至关重要。**基本情况是递归退出的某个点。**否则，没有基本情况，该方法将无限地递归调用自己，直到抛出_StackOverflowError_。</p><p>在我们的例子中，<strong>基本情况是当子数组只有一个元素时。这是因为在取出唯一的数字后，子数组为空</strong>。</p><p>那么接下来，让我们实现递归方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">sumIntArray1</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>array<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token function">sumIntArray1</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">copyOfRange</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> array<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在_sumIntArray1()_方法中看到的，我们使用_Arrays.copyOfRange()_方法来创建子数组。</p><p>如果我们将示例输入传递给该方法，递归步骤如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">sumIntarray1</span><span class="token punctuation">(</span>array<span class="token punctuation">)</span> <span class="token operator">=</span> array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token function">sumOfArray1</span><span class="token punctuation">(</span>arr1<span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
                    <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token punctuation">(</span>arr1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token function">sumIntarray1</span><span class="token punctuation">(</span>arr2<span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">+</span> <span class="token punctuation">(</span>arr2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token function">sumIntarray1</span><span class="token punctuation">(</span>arr3<span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">3</span> <span class="token operator">+</span> <span class="token punctuation">(</span>arr3<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token function">sumIntarray1</span><span class="token punctuation">(</span>arr4<span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> \`<span class="token operator">&lt;</span><span class="token operator">--</span> <span class="token punctuation">(</span>arr4<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> 达到基本情况
                    <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">3</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">4</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token operator">=</span> <span class="token number">15</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们使用_INT_ARRAY_测试该方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span> <span class="token function">sumIntArray1</span><span class="token punctuation">(</span><span class="token constant">INT_ARRAY</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-不创建数组副本的递归" tabindex="-1"><a class="header-anchor" href="#_3-不创建数组副本的递归"><span>3. 不创建数组副本的递归</span></a></h2><p>在_sumIntArray1()_方法中，我们使用了_Arrays.copyOfRange()_方法来初始化子数组。然而**，每次调用这个方法时都会创建一个新的数组**。如果我们面对一个庞大的整数数组，这种方法会创建许多数组对象。</p><p>我们知道应该避免创建不必要的对象以获得更好的性能。那么，接下来，让我们看看是否可以改进_sumIntArray1()_方法。</p><p>这个想法是<strong>将所需的索引传递给下一个递归步骤</strong>。然后，我们可以重用同一个数组对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">sumIntArray2</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">,</span> <span class="token keyword">int</span> lastIdx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>lastIdx <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> array<span class="token punctuation">[</span>lastIdx<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> array<span class="token punctuation">[</span>lastIdx<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token function">sumIntArray2</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> lastIdx <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们使用_INT_ARRAY_输入测试它，测试通过：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span> <span class="token function">sumIntArray2</span><span class="token punctuation">(</span><span class="token constant">INT_ARRAY</span><span class="token punctuation">,</span> <span class="token constant">INT_ARRAY</span><span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们了解_sumIntArray2()_方法的工作原理。</p><p>该方法接受两个参数：<strong>整数数组（<em>array</em>）和我们打算计算总和的最后一个索引（<em>lastIdx</em>）</strong>。这一次，递归遵循这个规则：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">sumOf</span><span class="token punctuation">(</span>array<span class="token punctuation">[</span><span class="token number">0.</span><span class="token punctuation">.</span>n<span class="token punctuation">]</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span> <span class="token operator">=</span> array<span class="token punctuation">[</span>n<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token function">sumOf</span><span class="token punctuation">(</span>array<span class="token punctuation">[</span><span class="token number">0.</span><span class="token punctuation">.</span>n<span class="token punctuation">]</span><span class="token punctuation">,</span> n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如我们所看到的，我们在每次递归步骤中重用原始数组。<strong>这种方法的基本情况是当_lastIdx_为零时，这意味着我们已经反向（从_n -&gt;\` 0_）遍历了整个数组：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">sumIntArray2</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token operator">=</span> array<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token function">sumOfArray2</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
                       <span class="token operator">=</span> <span class="token number">5</span> <span class="token operator">+</span> <span class="token punctuation">(</span>array<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token function">sumIntArray2</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                       <span class="token operator">=</span> <span class="token number">5</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">4</span> <span class="token operator">+</span> <span class="token punctuation">(</span>array<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token function">sumIntArray2</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                       <span class="token operator">=</span> <span class="token number">5</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">4</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">3</span> <span class="token operator">+</span> <span class="token punctuation">(</span>array<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token function">sumIntArray2</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                       <span class="token operator">=</span> <span class="token number">5</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">4</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">3</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">+</span> <span class="token punctuation">(</span>array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span><span class="token operator">--</span> <span class="token punctuation">(</span>idx <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> 达到基本情况
                       <span class="token operator">=</span> <span class="token number">5</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">4</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">3</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                       <span class="token operator">=</span> <span class="token number">15</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们进行性能比较，看看在相同的输入下，_sumIntArray2()_是否比_sumIntArray1()_更快。</p><h2 id="_4-两个递归解决方案的基准测试" tabindex="-1"><a class="header-anchor" href="#_4-两个递归解决方案的基准测试"><span>4. 两个递归解决方案的基准测试</span></a></h2><p>我们将使用JMH（Java Microbenchmark Harness）来对这两个递归解决方案进行基准测试。那么，让我们首先创建一个基准测试类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@BenchmarkMode</span><span class="token punctuation">(</span><span class="token class-name">Mode<span class="token punctuation">.</span>AverageTime</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@State</span><span class="token punctuation">(</span><span class="token class-name">Scope<span class="token punctuation">.</span>Thread</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@OutputTimeUnit</span><span class="token punctuation">(</span><span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">NANOSECONDS</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Warmup</span><span class="token punctuation">(</span>iterations <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Fork</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Measurement</span><span class="token punctuation">(</span>iterations <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SumArrayBenchmark</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">Options</span> options <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OptionsBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">include</span><span class="token punctuation">(</span><span class="token class-name">SumArrayBenchmark</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getSimpleName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Runner</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;10&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;10000&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> size<span class="token punctuation">;</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Setup</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        array <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>size<span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> size<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            array<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> r<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Benchmark</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">withArrayCopy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">sumIntArray1</span><span class="token punctuation">(</span>array<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Benchmark</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">withoutArrayCopy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">sumIntArray2</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> array<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的目标是对两种解决方案进行基准测试。因此，为了简洁，我们不会讨论每个JMH配置或注释。然而，至关重要的是要理解**_SumArrayBenchmark_使用两个不同的输入数组对每种解决方案进行测试：**</p><ul><li>一个包含10个随机数字的数组</li><li>一个包含10000个随机整数的数组</li></ul><p>此外，<strong>JMH对每个解决方案的每个输入数组进行五次迭代</strong>，确保对他们的性能进行全面评估。</p><p>接下来，让我们看看_SumArrayBenchmark_产生的输出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Benchmark</span>                           <span class="token punctuation">(</span>size<span class="token punctuation">)</span>  <span class="token class-name">Mode</span>  <span class="token class-name">Cnt</span>        <span class="token class-name">Score</span>       <span class="token class-name">Error</span>  <span class="token class-name">Units</span>
<span class="token class-name">SumArrayBenchmark</span><span class="token punctuation">.</span>withArrayCopy         <span class="token number">10</span>  avgt    <span class="token number">5</span>       <span class="token number">30</span><span class="token punctuation">,</span><span class="token number">576</span> ±     <span class="token number">0</span><span class="token punctuation">,</span><span class="token number">584</span>  ns<span class="token operator">/</span>op
<span class="token class-name">SumArrayBenchmark</span><span class="token punctuation">.</span>withArrayCopy      <span class="token number">10000</span>  avgt    <span class="token number">5</span>  <span class="token number">7314150</span><span class="token punctuation">,</span><span class="token number">000</span> ± <span class="token number">82516</span><span class="token punctuation">,</span><span class="token number">421</span>  ns<span class="token operator">/</span>op
<span class="token class-name">SumArrayBenchmark</span><span class="token punctuation">.</span>withoutArrayCopy      <span class="token number">10</span>  avgt    <span class="token number">5</span>        <span class="token number">6</span><span class="token punctuation">,</span><span class="token number">764</span> ±     <span class="token number">0</span><span class="token punctuation">,</span><span class="token number">032</span>  ns<span class="token operator">/</span>op
<span class="token class-name">SumArrayBenchmark</span><span class="token punctuation">.</span>withoutArrayCopy   <span class="token number">10000</span>  avgt    <span class="token number">5</span>    <span class="token number">30140</span><span class="token punctuation">,</span><span class="token number">685</span> ±    <span class="token number">91</span><span class="token punctuation">,</span><span class="token number">804</span>  ns<span class="token operator">/</span>op
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如报告所示，<strong>_withoutArrayCopy()_解决方案比_withArrayCopy()_方法快得多：</strong></p><ul><li>数组[10] ~ 快5倍 (30576/6764)</li><li>数组[10000] ~ 快242倍 (7314150/30140)</li></ul><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了两种递归求和数组中整数的方法。我们还使用JMH工具分析了它们的性能。&quot;withoutArrayCopy&quot;解决方案比&quot;withArrayCopy&quot;方法快得多。</p><p>如常，示例的完整源代码可在GitHub上获得。</p>`,48),o=[e];function c(u,l){return s(),a("div",null,o)}const k=n(t,[["render",c],["__file","2024-06-26-Recursively Sum the Integers in an Array.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Recursively%20Sum%20the%20Integers%20in%20an%20Array.html","title":"数组中整数的递归求和 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","编程"],"tag":["数组","递归"],"head":[["meta",{"name":"keywords","content":"Java, 数组求和, 递归算法"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Recursively%20Sum%20the%20Integers%20in%20an%20Array.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"数组中整数的递归求和 | Baeldung"}],["meta",{"property":"og:description","content":"数组中整数的递归求和 | Baeldung 1. 概述 当我们处理数字时，对数组中的所有整数进行求和是一项常见操作。此外，递归经常提供优雅的解决方案。 在本教程中，我们将探讨如何使用递归来对数组中的整数进行求和。 2. 带数组复制的递归 首先，我们初始化一个整数数组： 显然，上述数组中的整数之和是15。 在数组中求和数字的通常方法是sum (array..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T01:40:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"数组"}],["meta",{"property":"article:tag","content":"递归"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T01:40:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"数组中整数的递归求和 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T01:40:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"数组中整数的递归求和 | Baeldung 1. 概述 当我们处理数字时，对数组中的所有整数进行求和是一项常见操作。此外，递归经常提供优雅的解决方案。 在本教程中，我们将探讨如何使用递归来对数组中的整数进行求和。 2. 带数组复制的递归 首先，我们初始化一个整数数组： 显然，上述数组中的整数之和是15。 在数组中求和数字的通常方法是sum (array..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 带数组复制的递归","slug":"_2-带数组复制的递归","link":"#_2-带数组复制的递归","children":[]},{"level":2,"title":"3. 不创建数组副本的递归","slug":"_3-不创建数组副本的递归","link":"#_3-不创建数组副本的递归","children":[]},{"level":2,"title":"4. 两个递归解决方案的基准测试","slug":"_4-两个递归解决方案的基准测试","link":"#_4-两个递归解决方案的基准测试","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719366054000,"updatedTime":1719366054000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.91,"words":1474},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Recursively Sum the Integers in an Array.md","localizedDate":"2024年6月26日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>当我们处理数字时，对数组中的所有整数进行求和是一项常见操作。此外，递归经常提供优雅的解决方案。</p>\\n<p>在本教程中，我们将探讨如何使用递归来对数组中的整数进行求和。</p>\\n<h2>2. 带数组复制的递归</h2>\\n<p>首先，我们初始化一个整数数组：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> <span class=\\"token constant\\">INT_ARRAY</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">4</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">5</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
