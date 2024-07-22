import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BMOUrRO4.js";const e={},p=t('<hr><h1 id="kotlin中类型参数的下划线操作符" tabindex="-1"><a class="header-anchor" href="#kotlin中类型参数的下划线操作符"><span>Kotlin中类型参数的下划线操作符</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Kotlin的下划线操作符是该语言的一个独特工具，它有几种不同的用途。传统用法主要集中在lambda中的未使用变量或变量解构上。然而，<strong>我们应该注意的是 Kotlin 1.7 中的一个新特性，即类型参数的下划线操作符</strong>。具体来说，现在下划线操作符可以触发泛型类型的自动类型推断。</p><p>在本教程中，我们将深入探讨Kotlin中用于类型推断的下划线操作符，并探索它如何简化我们的代码并使其更易于阅读。</p><p>类型参数指定泛型类型或函数的实际类型。泛型提供了一种创建可以在不牺牲类型安全性的情况下操作不同类型数据的类、接口和函数的方法。</p><p>在定义泛型类时，我们可以使用类型参数来表示稍后将指定的类型：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> Box``````<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>``````<span class="token punctuation">(</span><span class="token keyword">val</span> content<span class="token operator">:</span> T<span class="token punctuation">)</span>\n<span class="token keyword">val</span> stringBox<span class="token operator">:</span> Box``````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>`````` <span class="token operator">=</span> <span class="token function">Box</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Hello, Kotlin!&quot;</span></span><span class="token punctuation">)</span>\n<span class="token keyword">val</span> intBox<span class="token operator">:</span> Box````<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>```` <span class="token operator">=</span> <span class="token function">Box</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，_T_是我们_Box_类的类型参数，而_String_和_Int_是类型参数。</p><h2 id="_3-理解下划线操作符" tabindex="-1"><a class="header-anchor" href="#_3-理解下划线操作符"><span>3. 理解下划线操作符</span></a></h2><p>在Kotlin 1.7之前，下划线操作符只能作为lambda函数中的占位符或在变量解构中使用，以指示未使用的变量。</p><h3 id="_3-1-使用下划线的未使用lambda参数" tabindex="-1"><a class="header-anchor" href="#_3-1-使用下划线的未使用lambda参数"><span>3.1. 使用下划线的未使用Lambda参数</span></a></h3><p>当我们声明一个lambda函数并且我们不需要其中的变量时，我们可以用下划线替换它：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">main</span><span class="token punctuation">(</span>args<span class="token operator">:</span> Array``````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>``````<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> list <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;hi&quot;</span></span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> list2 <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">mapIndexed</span> <span class="token punctuation">{</span> _<span class="token punctuation">,</span> item <span class="token operator">-&gt;</span> item <span class="token punctuation">}</span>\n    <span class="token function">println</span><span class="token punctuation">(</span>list2<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，_mapIndexed()_函数需要两个参数：<em>index_和_item</em>。<strong>然而，我们只对_item_感兴趣，所以我们用下划线作为占位符来明确表示我们忽略了_index_参数</strong>。</p><h3 id="_3-2-使用下划线的变量解构" tabindex="-1"><a class="header-anchor" href="#_3-2-使用下划线的变量解构"><span>3.2. 使用下划线的变量解构</span></a></h3><p>类似地，当解构变量时，如果我们想忽略第一个变量并只提取第二个变量，我们可以用下划线替换第一个变量：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">main</span><span class="token punctuation">(</span>args<span class="token operator">:</span> Array``````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>``````<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> <span class="token punctuation">(</span>_<span class="token punctuation">,</span> second<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;ignored&quot;</span></span> <span class="token keyword">to</span> <span class="token string-literal singleline"><span class="token string">&quot;hello&quot;</span></span>\n    <span class="token function">println</span><span class="token punctuation">(</span>second<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们使用了一个_Pair_的变量解构。下划线用于忽略_Pair_中的第一个值。这种语法特别允许我们提取我们感兴趣的值并丢弃我们不需要的值。</p><h2 id="_4-类型推断辅助" tabindex="-1"><a class="header-anchor" href="#_4-类型推断辅助"><span>4. 类型推断辅助</span></a></h2><p><strong>在Kotlin 1.7中，下划线操作符引入了一种方便的方式来替换定义泛型类型时的类型声明</strong>。因此，这个操作符允许我们有意省略类型参数，并让编译器推断类型。</p><h3 id="_4-1-声明泛型值" tabindex="-1"><a class="header-anchor" href="#_4-1-声明泛型值"><span>4.1. 声明泛型值</span></a></h3><p>在Kotlin 1.7之前，类型参数是必需的。如果我们在代码中输入一个泛型类，我们必须指定一个有效的类型参数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token comment">// 在Kotlin 1.7之前</span>\n<span class="token keyword">class</span> Box``````<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>``````<span class="token punctuation">(</span>value<span class="token operator">:</span> T<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 一些类实现</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fun</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> intBox<span class="token operator">:</span> Box````<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>```` <span class="token operator">=</span> <span class="token function">Box</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> anyBox<span class="token operator">:</span> Box``<span class="token operator">&lt;</span>Any<span class="token operator">&gt;</span>`` <span class="token operator">=</span> <span class="token function">Box</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Some value&quot;</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下一部分，我们将看到我们如何在Kotlin代码中使用下划线操作符。</p><h3 id="_4-2-使用下划线的类型声明" tabindex="-1"><a class="header-anchor" href="#_4-2-使用下划线的类型声明"><span>4.2. 使用下划线的类型声明</span></a></h3><p><strong>Kotlin中的下划线操作符通过允许编译器根据周围上下文推断类型来辅助类型推断</strong>。这不是关于省略类型信息，而是向编译器发出信号，当有足够周围的信息时推断类型。</p><p>让我们在泛型函数的上下文中看一个例子：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">inline</span> <span class="token keyword">fun</span> ``````<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>`````` <span class="token function">printElementInfo</span><span class="token punctuation">(</span>element<span class="token operator">:</span> T<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Element: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">element</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fun</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    printElementInfo````<span class="token operator">&lt;</span>_<span class="token operator">&gt;</span>````<span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span>\n    printElementInfo````<span class="token operator">&lt;</span>_<span class="token operator">&gt;</span>````<span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Hello&quot;</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，_printElementInfo()_函数是一个高阶函数，它打印给定元素的值。下划线操作符允许编译器在调用函数时推断类型参数。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>Kotlin 1.7中的类型推断下划线操作符是一个有价值的补充，有助于编写更简洁和富有表现力的代码。它通过允许编译器处理类型推断，赋予开发者编写更干净、更易于维护的代码的能力。这特别适用于可以从周围上下文中推断出类型的情境，当类型参数显而易见时，它作为一种简写。--- date: 2022-11-01 category:</p><ul><li>Kotlin</li><li>Programming tag:</li><li>Kotlin</li><li>Type Inference</li><li>Underscore Operator head:</li><li><ul><li>meta</li><li>name: keywords content: Kotlin, Type Inference, Underscore Operator</li></ul></li></ul><hr><h1 id="kotlin中类型参数的下划线操作符-1" tabindex="-1"><a class="header-anchor" href="#kotlin中类型参数的下划线操作符-1"><span>Kotlin中类型参数的下划线操作符</span></a></h1><h2 id="_1-引言-1" tabindex="-1"><a class="header-anchor" href="#_1-引言-1"><span>1. 引言</span></a></h2><p>Kotlin的下划线操作符是该语言的一个独特工具，它有几种不同的用途。传统用法主要集中在lambda中的未使用变量或变量解构上。然而，<strong>我们应该注意的是 Kotlin 1.7 中的一个新特性，即类型参数的下划线操作符</strong>。具体来说，现在下划线操作符可以触发泛型类型的自动类型推断。</p><p>在本教程中，我们将深入探讨Kotlin中用于类型推断的下划线操作符，并探索它如何简化我们的代码并使其更易于阅读。</p><p>类型参数指定泛型类型或函数的实际类型。泛型提供了一种创建可以在不牺牲类型安全性的情况下操作不同类型数据的类、接口和函数的方法。</p><p>在定义泛型类时，我们可以使用类型参数来表示稍后将指定的类型：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> Box``````<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>``````<span class="token punctuation">(</span><span class="token keyword">val</span> content<span class="token operator">:</span> T<span class="token punctuation">)</span>\n<span class="token keyword">val</span> stringBox<span class="token operator">:</span> Box``````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>`````` <span class="token operator">=</span> <span class="token function">Box</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Hello, Kotlin!&quot;</span></span><span class="token punctuation">)</span>\n<span class="token keyword">val</span> intBox<span class="token operator">:</span> Box````<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>```` <span class="token operator">=</span> <span class="token function">Box</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，_T_是我们_Box_类的类型参数，而_String_和_Int_是类型参数。</p><h2 id="_3-理解下划线操作符-1" tabindex="-1"><a class="header-anchor" href="#_3-理解下划线操作符-1"><span>3. 理解下划线操作符</span></a></h2><p>在Kotlin 1.7之前，下划线操作符只能作为lambda函数中的占位符或在变量解构中使用，以指示未使用的变量。</p><h3 id="_3-1-使用下划线的未使用lambda参数-1" tabindex="-1"><a class="header-anchor" href="#_3-1-使用下划线的未使用lambda参数-1"><span>3.1. 使用下划线的未使用Lambda参数</span></a></h3><p>当我们声明一个lambda函数并且我们不需要其中的变量时，我们可以用下划线替换它：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">main</span><span class="token punctuation">(</span>args<span class="token operator">:</span> Array``````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>``````<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> list <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;hi&quot;</span></span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> list2 <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">mapIndexed</span> <span class="token punctuation">{</span> _<span class="token punctuation">,</span> item <span class="token operator">-&gt;</span> item <span class="token punctuation">}</span>\n    <span class="token function">println</span><span class="token punctuation">(</span>list2<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，_mapIndexed()_函数需要两个参数：<em>index_和_item</em>。<strong>然而，我们只对_item_感兴趣，所以我们用下划线作为占位符来明确表示我们忽略了_index_参数</strong>。</p><h3 id="_3-2-使用下划线的变量解构-1" tabindex="-1"><a class="header-anchor" href="#_3-2-使用下划线的变量解构-1"><span>3.2. 使用下划线的变量解构</span></a></h3><p>类似地，当解构变量时，如果我们想忽略第一个变量并只提取第二个变量，我们可以用下划线替换第一个变量：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">main</span><span class="token punctuation">(</span>args<span class="token operator">:</span> Array``````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>``````<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> <span class="token punctuation">(</span>_<span class="token punctuation">,</span> second<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;ignored&quot;</span></span> <span class="token keyword">to</span> <span class="token string-literal singleline"><span class="token string">&quot;hello&quot;</span></span>\n    <span class="token function">println</span><span class="token punctuation">(</span>second<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们使用了一个_Pair_的变量解构。下划线用于忽略_Pair_中的第一个值。这种语法特别允许我们提取我们感兴趣的值并丢弃我们不需要的值。</p><h2 id="_4-类型推断辅助-1" tabindex="-1"><a class="header-anchor" href="#_4-类型推断辅助-1"><span>4. 类型推断辅助</span></a></h2><p><strong>在Kotlin 1.7中，下划线操作符引入了一种方便的方式来替换定义泛型类型时的类型声明</strong>。因此，这个操作符允许我们有意省略类型参数，并让编译器推断类型。</p><h3 id="_4-1-声明泛型值-1" tabindex="-1"><a class="header-anchor" href="#_4-1-声明泛型值-1"><span>4.1. 声明泛型值</span></a></h3><p>在Kotlin 1.7之前，类型参数是必需的。如果我们在代码中输入一个泛型类，我们必须指定一个有效的类型参数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token comment">// 在Kotlin 1.7之前</span>\n<span class="token keyword">class</span> Box``````<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>``````<span class="token punctuation">(</span>value<span class="token operator">:</span> T<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 一些类实现</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fun</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> intBox<span class="token operator">:</span> Box````<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>```` <span class="token operator">=</span> <span class="token function">Box</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> anyBox<span class="token operator">:</span> Box``<span class="token operator">&lt;</span>Any<span class="token operator">&gt;</span>`` <span class="token operator">=</span> <span class="token function">Box</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Some value&quot;</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下一部分，我们将看到我们如何在Kotlin代码中使用下划线操作符。</p><h3 id="_4-2-使用下划线的类型声明-1" tabindex="-1"><a class="header-anchor" href="#_4-2-使用下划线的类型声明-1"><span>4.2. 使用下划线的类型声明</span></a></h3><p><strong>Kotlin中的下划线操作符通过允许编译器根据周围上下文推断类型来辅助类型推断</strong>。这不是关于省略类型信息，而是向编译器发出信号，当有足够周围的信息时推断类型。</p><p>让我们在泛型函数的上下文中看一个例子：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">inline</span> <span class="token keyword">fun</span> ``````<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>`````` <span class="token function">printElementInfo</span><span class="token punctuation">(</span>element<span class="token operator">:</span> T<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Element: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">element</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fun</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    printElementInfo````<span class="token operator">&lt;</span>_<span class="token operator">&gt;</span>````<span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span>\n    printElementInfo````<span class="token operator">&lt;</span>_<span class="token operator">&gt;</span>````<span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Hello&quot;</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，_printElementInfo()_函数是一个高阶函数，它打印给定元素的值。下划线操作符允许编译器在调用函数时推断类型参数。</p><h2 id="_5-结论-1" tabindex="-1"><a class="header-anchor" href="#_5-结论-1"><span>5. 结论</span></a></h2><p>Kotlin 1.7中的类型推断下划线操作符是一个有价值的补充，有助于编写更简洁和富有表现力的代码。它通过允许编译器处理类型推断，赋予开发者编写更干净、更易于维护的代码的能力。这特别适用于可以从周围上下文中推断出类型的情境，当类型参数显而易见时，它作为一种简写。</p><p>如往常一样，这些示例的完整实现可以在GitHub上找到。</p><p>OK</p>',67),o=[p];function l(i,c){return a(),s("div",null,o)}const d=n(e,[["render",l],["__file","2024-07-20-Underscore Operator for Type Arguments in Kotlin.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Underscore%20Operator%20for%20Type%20Arguments%20in%20Kotlin.html","title":"Kotlin中类型参数的下划线操作符","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Programming"],"tag":["Kotlin","Type Inference","Underscore Operator"],"head":[["meta",{"name":"keywords","content":"Kotlin, Type Inference, Underscore Operator"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Underscore%20Operator%20for%20Type%20Arguments%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中类型参数的下划线操作符"}],["meta",{"property":"og:description","content":"Kotlin中类型参数的下划线操作符 1. 引言 Kotlin的下划线操作符是该语言的一个独特工具，它有几种不同的用途。传统用法主要集中在lambda中的未使用变量或变量解构上。然而，我们应该注意的是 Kotlin 1.7 中的一个新特性，即类型参数的下划线操作符。具体来说，现在下划线操作符可以触发泛型类型的自动类型推断。 在本教程中，我们将深入探讨K..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T14:37:57.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Type Inference"}],["meta",{"property":"article:tag","content":"Underscore Operator"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T14:37:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中类型参数的下划线操作符\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T14:37:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中类型参数的下划线操作符 1. 引言 Kotlin的下划线操作符是该语言的一个独特工具，它有几种不同的用途。传统用法主要集中在lambda中的未使用变量或变量解构上。然而，我们应该注意的是 Kotlin 1.7 中的一个新特性，即类型参数的下划线操作符。具体来说，现在下划线操作符可以触发泛型类型的自动类型推断。 在本教程中，我们将深入探讨K..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"3. 理解下划线操作符","slug":"_3-理解下划线操作符","link":"#_3-理解下划线操作符","children":[{"level":3,"title":"3.1. 使用下划线的未使用Lambda参数","slug":"_3-1-使用下划线的未使用lambda参数","link":"#_3-1-使用下划线的未使用lambda参数","children":[]},{"level":3,"title":"3.2. 使用下划线的变量解构","slug":"_3-2-使用下划线的变量解构","link":"#_3-2-使用下划线的变量解构","children":[]}]},{"level":2,"title":"4. 类型推断辅助","slug":"_4-类型推断辅助","link":"#_4-类型推断辅助","children":[{"level":3,"title":"4.1. 声明泛型值","slug":"_4-1-声明泛型值","link":"#_4-1-声明泛型值","children":[]},{"level":3,"title":"4.2. 使用下划线的类型声明","slug":"_4-2-使用下划线的类型声明","link":"#_4-2-使用下划线的类型声明","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":2,"title":"1. 引言","slug":"_1-引言-1","link":"#_1-引言-1","children":[]},{"level":2,"title":"3. 理解下划线操作符","slug":"_3-理解下划线操作符-1","link":"#_3-理解下划线操作符-1","children":[{"level":3,"title":"3.1. 使用下划线的未使用Lambda参数","slug":"_3-1-使用下划线的未使用lambda参数-1","link":"#_3-1-使用下划线的未使用lambda参数-1","children":[]},{"level":3,"title":"3.2. 使用下划线的变量解构","slug":"_3-2-使用下划线的变量解构-1","link":"#_3-2-使用下划线的变量解构-1","children":[]}]},{"level":2,"title":"4. 类型推断辅助","slug":"_4-类型推断辅助-1","link":"#_4-类型推断辅助-1","children":[{"level":3,"title":"4.1. 声明泛型值","slug":"_4-1-声明泛型值-1","link":"#_4-1-声明泛型值-1","children":[]},{"level":3,"title":"4.2. 使用下划线的类型声明","slug":"_4-2-使用下划线的类型声明-1","link":"#_4-2-使用下划线的类型声明-1","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论-1","link":"#_5-结论-1","children":[]}],"git":{"createdTime":1721486277000,"updatedTime":1721486277000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.37,"words":2210},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Underscore Operator for Type Arguments in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"<hr>\\n<h1>Kotlin中类型参数的下划线操作符</h1>\\n<h2>1. 引言</h2>\\n<p>Kotlin的下划线操作符是该语言的一个独特工具，它有几种不同的用途。传统用法主要集中在lambda中的未使用变量或变量解构上。然而，<strong>我们应该注意的是 Kotlin 1.7 中的一个新特性，即类型参数的下划线操作符</strong>。具体来说，现在下划线操作符可以触发泛型类型的自动类型推断。</p>\\n<p>在本教程中，我们将深入探讨Kotlin中用于类型推断的下划线操作符，并探索它如何简化我们的代码并使其更易于阅读。</p>\\n<p>类型参数指定泛型类型或函数的实际类型。泛型提供了一种创建可以在不牺牲类型安全性的情况下操作不同类型数据的类、接口和函数的方法。</p>","autoDesc":true}');export{d as comp,k as data};
