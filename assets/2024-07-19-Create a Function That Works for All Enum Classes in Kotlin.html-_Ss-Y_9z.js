import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BUAgDejY.js";const e={},o=t('<h1 id="kotlin中为所有枚举类创建通用函数-baeldung关于kotlin" tabindex="-1"><a class="header-anchor" href="#kotlin中为所有枚举类创建通用函数-baeldung关于kotlin"><span>Kotlin中为所有枚举类创建通用函数 | Baeldung关于Kotlin</span></a></h1><p>在Kotlin中，枚举是一种强大的结构，允许我们定义一组表示不同值的命名常量。然而，在使用多个枚举类时，创建一个能够为任何枚举类提供功能的通用函数可能是具有挑战性的。</p><p>在本教程中，我们将探讨创建一个适用于任何枚举类的多功能Kotlin函数的不同方法。</p><h3 id="_2-理解挑战" tabindex="-1"><a class="header-anchor" href="#_2-理解挑战"><span>2. 理解挑战</span></a></h3><p>像往常一样，让我们通过一个例子来理解挑战。</p><p>假设我们想要有一个名为**<em>joinTheirNames()</em>**的函数，该函数适用于所有枚举类，以通过逗号连接给定枚举的实例名称。</p><p>例如，假设我们用以下_Level_枚举调用这个函数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">enum</span> <span class="token keyword">class</span> Level <span class="token punctuation">{</span>\n    A<span class="token punctuation">,</span> B<span class="token punctuation">,</span> C<span class="token punctuation">,</span> D<span class="token punctuation">,</span> E\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_joinTheirNames()_返回一个字符串：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;A, B, C, D, E&quot;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类似地，假设我们在不同的枚举上调用这个函数，该枚举的构造函数接受参数，比如_WorkingDay_：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">enum</span> <span class="token keyword">class</span> <span class="token function">WorkingDay</span><span class="token punctuation">(</span><span class="token keyword">val</span> n<span class="token operator">:</span> Int<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">MON</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">TUE</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">WED</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">THU</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">FRI</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将得到以下字符串作为结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;MON, TUE, WED, THU, FRI&quot;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>挑战在于<strong>Kotlin中的每个枚举类都是具有自己的一组常量的独立类型</strong>。此外，Kotlin不支持枚举继承，这意味着每个枚举类都是独立的。</p><p>因此，编写一个适用于所有枚举类的函数需要考虑到它们的差异，并采取周到的方法。</p><p>在本教程中，我们将以_joinTheirNames()_需求为例，探讨为所有枚举类创建函数的不同方法。</p><h3 id="_3-在-array-类上创建扩展函数" tabindex="-1"><a class="header-anchor" href="#_3-在-array-类上创建扩展函数"><span>3. 在_Array_类上创建扩展函数</span></a></h3><p><strong>在Kotlin中，对于任何枚举类型，我们都可以通过调用_values()_函数来获得它的实例数组</strong>。因此，我们可以在_Array_类上创建一个扩展函数来实现我们的目标：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> `<span class="token operator">&lt;</span>E <span class="token operator">:</span> Enum`````<span class="token operator">&lt;</span>E<span class="token operator">&gt;</span>``````<span class="token operator">&gt;</span> Array`````<span class="token operator">&lt;</span>E<span class="token operator">&gt;</span>`````<span class="token punctuation">.</span><span class="token function">joinTheirNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> joinToString <span class="token punctuation">{</span> it<span class="token punctuation">.</span>name <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，我们只想扩展包含枚举实例作为元素的数组类，而不是污染所有数组。因此，如上面的代码所示，<strong>我们引入了类型参数&lt; <em>E : Enum<code>&lt;E&gt;</code></em>&gt;，使_joinTheirNames()_函数仅适用于枚举数组（<em>Array<code>&lt;E&gt;</code></em>）。</strong></p><p>函数的实现非常简单。我们使用_joinToString()_函数来连接枚举常量的名称。</p><p>有了扩展函数，我们可以调用_AnyEnumType.values().joinTheirNames()_来获得预期的字符串结果：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;A, B, C, D, E&quot;</span></span><span class="token punctuation">,</span> Level<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">joinTheirNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;MON, TUE, WED, THU, FRI&quot;</span></span><span class="token punctuation">,</span> WorkingDay<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">joinTheirNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-在-enumentries-类上创建扩展函数" tabindex="-1"><a class="header-anchor" href="#_4-在-enumentries-类上创建扩展函数"><span>4. 在_EnumEntries_类上创建扩展函数</span></a></h3><p>自1.9.0版本以来，Kotlin已将_entries_属性引入所有枚举类型作为一个稳定的功能。此外，官方文档建议<strong>用_AnEnum.entries_替换_AnEnum.values()_函数调用。</strong></p><p>与返回数组的_values()_函数不同，<em>entries_属性的类型是_EnumEntries</em>。因此，<strong>如果我们使用Kotlin 1.9.0或更高版本，我们可以将我们的扩展函数从扩展_Array_更改为扩展_EnumEntries_类</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> EnumEntries`<span class="token operator">&lt;</span><span class="token operator">*</span><span class="token operator">&gt;</span>`<span class="token punctuation">.</span><span class="token function">joinTheirNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> joinToString <span class="token punctuation">{</span> it<span class="token punctuation">.</span>name <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，扩展函数可以使用枚举的_entries_属性调用：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;A, B, C, D, E&quot;</span></span><span class="token punctuation">,</span> Level<span class="token punctuation">.</span>entries<span class="token punctuation">.</span><span class="token function">joinTheirNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;MON, TUE, WED, THU, FRI&quot;</span></span><span class="token punctuation">,</span> WorkingDay<span class="token punctuation">.</span>entries<span class="token punctuation">.</span><span class="token function">joinTheirNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们已经讨论了两种在所有枚举上创建函数的解决方案。然而，无论是扩展_Array_还是_EnumEntries_，_joinToString()_都是通过枚举的实例而不是直接从枚举类调用的。</p><p>那么，接下来让我们看看是否可以有一个更直接的解决方案。</p><h3 id="_5-我们可以在类级别上实现-jointostring-函数吗" tabindex="-1"><a class="header-anchor" href="#_5-我们可以在类级别上实现-jointostring-函数吗"><span>5. 我们可以在类级别上实现_joinToString()_函数吗？</span></a></h3><p>能够调用像_Level.joinTheirNames()_和_WorkingDay.joinTheirNames()_这样的函数将是理想的。它简单易用。</p><p>我们知道，<strong>_Enum_类是Kotlin中所有枚举类的共同超类型</strong>。此外，我们已经看到了Kotlin扩展函数的强大。<strong>扩展函数允许我们在不真正修改类型的代码的情况下向类型添加功能</strong>。</p><p>因此，一个想法可能浮现出来：创建一个扩展函数来扩展_Enum_类。</p><p>然而，在尝试之后，我们将意识到<strong>我们无法通过在_Enum_上创建扩展函数来实现像_Level.joinTheirNames()_这样的功能</strong>。</p><p>接下来，让我们找出为什么。</p><h3 id="_5-1-为什么我们不能让-level-jointheirnames-工作" tabindex="-1"><a class="header-anchor" href="#_5-1-为什么我们不能让-level-jointheirnames-工作"><span>5.1. 为什么我们不能让_Level.joinTheirNames()_工作？</span></a></h3><p>首先，值得注意的是，Kotlin的<strong>扩展函数在实例级别上操作</strong>。例如，如果我们在_String_上创建一个扩展函数_singleCharString()_：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> String<span class="token punctuation">.</span><span class="token function">singleCharString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">1</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，<strong>_singleCharString()_函数适用于所有_String_实例</strong>。例如，我们可以这样调用它：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token string-literal singleline"><span class="token string">&quot;x y z&quot;</span></span><span class="token punctuation">.</span><span class="token function">singleCharString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// false</span>\n<span class="token string-literal singleline"><span class="token string">&quot;x&quot;</span></span><span class="token punctuation">.</span><span class="token function">singleCharString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，<strong>我们不能像_String.singleCharString()_这样从_String_类调用扩展函数</strong>。</p><p>现在，如果我们再次看看我们的“在_Enum_上扩展函数”的想法，我们的目标是拥有_Level.joinTheirNames()<em>或_WorkingDay.joinTheirNames()</em>。但是**_Level_和_WorkingDay_这里实际上是两个枚举类而不是实例**。因此，我们无法使用扩展函数来实现我们的目标。</p><p>除此之外，假设我们能够实现_WorkingDay.joinTheirNames()_。那么，_joinTheirNames()_函数将是_WorkingDay_类的静态函数。<strong>在Kotlin和Java中，静态方法不是从超类继承到子类的</strong>。</p><p>因此，即使我们可以在_Enum_类上创建静态扩展函数，该函数将仅适用于_Enum_类而不是其子类。换句话说，<strong>如果我们能够在_Enum_类上添加静态扩展_joinTheirNames()_，我们将有_Enum.joinTheirNames()<em>而不是_WorkingDay.joinTheirNames()</em></strong>。</p><p>我们可能已经注意到，如果我们能够以某种方式将具体枚举类型传递给_Enum.joinTheirNames()_，它仍然可以解决我们的问题，尽管它看起来并不像_WorkingDay.joinTheirNames()_那样直接。</p><p>然后，让我们找出我们是否可以在Kotlin中创建静态扩展函数。</p><h3 id="_5-2-我们可以创建静态扩展函数吗" tabindex="-1"><a class="header-anchor" href="#_5-2-我们可以创建静态扩展函数吗"><span>5.2. 我们可以创建静态扩展函数吗？</span></a></h3><p>目前，<strong>Kotlin不支持静态扩展函数</strong>。但这个特性在Kotlin的官方KEEP提案中。</p><p>这是否意味着我们不能创建静态_Enum_扩展？在回答这个问题之前，让我们看看Kotlin中静态函数的工作原理。</p><p><strong>Kotlin的静态函数基于Companion对象</strong>。我们不能直接创建静态扩展，但如果目标类有一个Companion对象，我们可以<strong>为Companion对象创建扩展函数</strong>。然后，我们可以像调用静态函数一样调用这个扩展函数。</p><p>让我们看看_Enum_类的实现：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> Enum`<span class="token operator">&lt;</span>E <span class="token operator">:</span> Enum`````<span class="token operator">&lt;</span>E<span class="token operator">&gt;</span>``````<span class="token operator">&gt;</span><span class="token punctuation">(</span>name<span class="token operator">:</span> String<span class="token punctuation">,</span> ordinal<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token operator">:</span> Comparable`````<span class="token operator">&lt;</span>E<span class="token operator">&gt;</span>````` <span class="token punctuation">{</span>\n    <span class="token keyword">companion</span> <span class="token keyword">object</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n    <span class="token operator">..</span><span class="token punctuation">.</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>幸运的是，_Enum_类有一个匿名的Companion对象。那么接下来，让我们通过添加_joinTheirNames()_函数来扩展这个Companion对象：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">inline</span> <span class="token keyword">fun</span> <span class="token operator">&lt;</span><span class="token keyword">reified</span> E <span class="token operator">:</span> Enum`````<span class="token operator">&lt;</span>E<span class="token operator">&gt;</span>`````<span class="token operator">&gt;</span> Enum<span class="token punctuation">.</span>Companion<span class="token punctuation">.</span><span class="token function">joinTheirNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> enumValues`````<span class="token operator">&lt;</span>E<span class="token operator">&gt;</span>`````<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">joinToString</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>name <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于函数显示，我们引入了一个类型参数来知道我们正在处理哪种具体的枚举类型。<strong>Kotlin提供了reified <em>inline</em> _enumValues()_函数来获取所有_Enum<code>&lt;T&gt;</code>_的实例：</strong></p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">inline</span> <span class="token keyword">fun</span> <span class="token operator">&lt;</span><span class="token keyword">reified</span> T <span class="token operator">:</span> Enum``<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>``<span class="token operator">&gt;</span> <span class="token function">enumValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Array``<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们在_joinTheirNames()_函数中使用了_enumValues()_函数。因此，我们需要使我们的类型参数也是reified。</p><p>现在，是时候验证这种方法是否有效了。让我们用我们的两个枚举示例进行测试：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;A, B, C, D, E&quot;</span></span><span class="token punctuation">,</span> Enum<span class="token punctuation">.</span>joinTheirNames```<span class="token operator">&lt;</span>Level<span class="token operator">&gt;</span>```<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;MON, TUE, WED, THU, FRI&quot;</span></span><span class="token punctuation">,</span> Enum<span class="token punctuation">.</span>joinTheirNames``<span class="token operator">&lt;</span>WorkingDay<span class="token operator">&gt;</span>``<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它将通过。所以，这种方法是有效的。</p><p>然而，让我们快速回顾一下函数调用：<em>Enum.joinTheirNames<code>&lt;Level&gt;</code>()</em>。如果我们已经限制了_E_必须是枚举类型，那么_Enum_类前缀是多余的。</p><p>接下来，让我们看看是否可以简化函数。</p><h3 id="_6-6-创建一个通用函数" tabindex="-1"><a class="header-anchor" href="#_6-6-创建一个通用函数"><span>6### 6. 创建一个通用函数</span></a></h3><p>正如我们之前讨论的，既然我们已经定义了_Enum.joinTheirNames()_只能与枚举类型一起工作，那么_Enum_前缀就没有必要了。因此，让我们从函数签名中删除“<em>Enum.Companion</em>”：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">inline</span> <span class="token keyword">fun</span> <span class="token operator">&lt;</span><span class="token keyword">reified</span> E <span class="token operator">:</span> Enum`````<span class="token operator">&lt;</span>E<span class="token operator">&gt;</span>`````<span class="token operator">&gt;</span> <span class="token function">joinEnumNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> enumValues`````<span class="token operator">&lt;</span>E<span class="token operator">&gt;</span>`````<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">joinToString</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>name <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，_joinEnumNames()_变成了一个常规函数。</p><p>最后，如果我们使用我们的枚举示例进行测试，它将按预期工作：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;A, B, C, D, E&quot;</span></span><span class="token punctuation">,</span> joinEnumNames```<span class="token operator">&lt;</span>Level<span class="token operator">&gt;</span>```<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;MON, TUE, WED, THU, FRI&quot;</span></span><span class="token punctuation">,</span> joinEnumNames``<span class="token operator">&lt;</span>WorkingDay<span class="token operator">&gt;</span>``<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h3><p>在本文中，我们通过示例探索了为所有枚举类创建一个可用函数的不同方法。我们在我们的实现中使用了各种Kotlin特性，如扩展函数、泛型、_reified_类型参数、_inline_函数等。</p><p>一如既往，示例的完整源代码可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/whiteleaf.svg" alt="img" loading="lazy"></p><p>OK</p>',76),p=[o];function i(l,c){return s(),a("div",null,p)}const k=n(e,[["render",i],["__file","2024-07-19-Create a Function That Works for All Enum Classes in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Create%20a%20Function%20That%20Works%20for%20All%20Enum%20Classes%20in%20Kotlin.html","title":"Kotlin中为所有枚举类创建通用函数 | Baeldung关于Kotlin","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Programming"],"tag":["Kotlin","Enum","Function"],"head":[["meta",{"name":"keywords","content":"Kotlin, Enum, Function, Enum Classes, Baeldung"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Create%20a%20Function%20That%20Works%20for%20All%20Enum%20Classes%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中为所有枚举类创建通用函数 | Baeldung关于Kotlin"}],["meta",{"property":"og:description","content":"Kotlin中为所有枚举类创建通用函数 | Baeldung关于Kotlin 在Kotlin中，枚举是一种强大的结构，允许我们定义一组表示不同值的命名常量。然而，在使用多个枚举类时，创建一个能够为任何枚举类提供功能的通用函数可能是具有挑战性的。 在本教程中，我们将探讨创建一个适用于任何枚举类的多功能Kotlin函数的不同方法。 2. 理解挑战 像往常一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T10:11:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Enum"}],["meta",{"property":"article:tag","content":"Function"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T10:11:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中为所有枚举类创建通用函数 | Baeldung关于Kotlin\\",\\"image\\":[\\"https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png\\",\\"https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg\\",\\"https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/whiteleaf.svg\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T10:11:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中为所有枚举类创建通用函数 | Baeldung关于Kotlin 在Kotlin中，枚举是一种强大的结构，允许我们定义一组表示不同值的命名常量。然而，在使用多个枚举类时，创建一个能够为任何枚举类提供功能的通用函数可能是具有挑战性的。 在本教程中，我们将探讨创建一个适用于任何枚举类的多功能Kotlin函数的不同方法。 2. 理解挑战 像往常一..."},"headers":[{"level":3,"title":"2. 理解挑战","slug":"_2-理解挑战","link":"#_2-理解挑战","children":[]},{"level":3,"title":"3. 在_Array_类上创建扩展函数","slug":"_3-在-array-类上创建扩展函数","link":"#_3-在-array-类上创建扩展函数","children":[]},{"level":3,"title":"4. 在_EnumEntries_类上创建扩展函数","slug":"_4-在-enumentries-类上创建扩展函数","link":"#_4-在-enumentries-类上创建扩展函数","children":[]},{"level":3,"title":"5. 我们可以在类级别上实现_joinToString()_函数吗？","slug":"_5-我们可以在类级别上实现-jointostring-函数吗","link":"#_5-我们可以在类级别上实现-jointostring-函数吗","children":[]},{"level":3,"title":"5.1. 为什么我们不能让_Level.joinTheirNames()_工作？","slug":"_5-1-为什么我们不能让-level-jointheirnames-工作","link":"#_5-1-为什么我们不能让-level-jointheirnames-工作","children":[]},{"level":3,"title":"5.2. 我们可以创建静态扩展函数吗？","slug":"_5-2-我们可以创建静态扩展函数吗","link":"#_5-2-我们可以创建静态扩展函数吗","children":[]},{"level":3,"title":"6### 6. 创建一个通用函数","slug":"_6-6-创建一个通用函数","link":"#_6-6-创建一个通用函数","children":[]},{"level":3,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1721383902000,"updatedTime":1721383902000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.34,"words":2201},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Create a Function That Works for All Enum Classes in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>在Kotlin中，枚举是一种强大的结构，允许我们定义一组表示不同值的命名常量。然而，在使用多个枚举类时，创建一个能够为任何枚举类提供功能的通用函数可能是具有挑战性的。</p>\\n<p>在本教程中，我们将探讨创建一个适用于任何枚举类的多功能Kotlin函数的不同方法。</p>\\n<h3>2. 理解挑战</h3>\\n<p>像往常一样，让我们通过一个例子来理解挑战。</p>\\n<p>假设我们想要有一个名为**<em>joinTheirNames()</em>**的函数，该函数适用于所有枚举类，以通过逗号连接给定枚举的实例名称。</p>\\n<p>例如，假设我们用以下_Level_枚举调用这个函数：</p>","autoDesc":true}');export{k as comp,d as data};
