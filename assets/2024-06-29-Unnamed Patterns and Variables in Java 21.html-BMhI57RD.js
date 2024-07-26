import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-8nJ1rqSf.js";const e={},p=t(`<h1 id="java-21-中的无命名模式和变量-baeldung" tabindex="-1"><a class="header-anchor" href="#java-21-中的无命名模式和变量-baeldung"><span>Java 21 中的无命名模式和变量 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Java 21 SE 的发布引入了一个令人兴奋的预览特性：无命名模式和变量（JEP 443）。这个新增加的特性允许我们在只关心副作用时减少样板代码。</p><p>无命名模式是对 Java 19 中的记录模式和 Switch 中的模式匹配的改进。我们还应该熟悉作为预览功能在 Java 14 中引入的记录功能。</p><p>在本教程中，我们将深入探讨如何使用这些新特性来提高我们的代码质量和可读性。</p><h2 id="_2-目的" tabindex="-1"><a class="header-anchor" href="#_2-目的"><span>2. 目的</span></a></h2><p>通常，在使用复杂对象时，我们并不总是需要它们持有的所有数据。理想情况下，我们只从对象中获取我们需要的东西，但这种情况很少见。大多数时候，我们最终只使用了我们被给予的一小部分。</p><p>这种情况在面向对象编程（OOP）中随处可见，由单一职责原则所体现。无命名模式和变量特性是 Java 在更小规模上解决这个问题的最新尝试。</p><p><strong>由于这是一个预览特性，我们必须确保我们启用它</strong>。在 Maven 中，这是通过修改编译器插件配置来完成的，包括以下编译器参数：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>compilerArgs</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>\`--enable-preview\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>compilerArgs</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然这个特性对 Java 来说是新的，但在其他语言（如 Python 和 Go）中却很受欢迎。由于 Go 并不完全是面向对象的，Java 在面向对象的世界中引入了这个特性。</p><p><strong>无命名变量用于当我们只关心操作的副作用时。它们可以根据需要定义多次，但不能从后面的点引用。</strong></p><h3 id="_3-1-增强的-for-循环" tabindex="-1"><a class="header-anchor" href="#_3-1-增强的-for-循环"><span>3.1. 增强的 for 循环</span></a></h3><p>首先，假设我们有一个简单的 Car 记录：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">Car</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，我们需要遍历一个 cars 集合来计算所有汽车的数量并执行一些其他业务逻辑：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> car <span class="token operator">:</span> cars<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    total<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>total <span class="token operator">&gt;</span> limit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 副作用</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然我们需要遍历 car 集合的每个元素，但我们并不需要使用它。命名变量会使代码更难阅读，让我们尝试使用新特性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> _ <span class="token operator">:</span> cars<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    total<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>total <span class="token operator">&gt;</span> limit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 副作用</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这清楚地表明维护者 car 没有被使用。当然，这也可以与基本的 for 循环一起使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> _ <span class="token operator">=</span> <span class="token function">sendOneTimeNotification</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> cars<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 通知汽车</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意，sendOneTimeNotification() 只被调用一次。该方法还必须返回与第一个初始化相同的类型（在我们的例子中是 i）。</strong></p><h3 id="_3-2-赋值语句" tabindex="-1"><a class="header-anchor" href="#_3-2-赋值语句"><span>3.2. 赋值语句</span></a></h3><p>我们还可以使用无命名变量与赋值语句。<strong>这在我们需要函数的副作用和一些返回值（但不是全部）时最有用。</strong></p><p>假设我们需要一个方法，它从队列中移除前三个元素并返回第一个被移除的元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">Car</span> <span class="token function">removeThreeCarsAndReturnFirstRemoved</span><span class="token punctuation">(</span><span class="token class-name">Queue</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Car</span><span class="token punctuation">&gt;</span></span>\`\` cars<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> car <span class="token operator">=</span> cars<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> _ <span class="token operator">=</span> cars<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> _ <span class="token operator">=</span> cars<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> car<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在上面的示例中看到的，我们可以在同一个块中使用多个赋值。我们也可以忽略 poll() 调用的结果，但这样，它更易于阅读。</p><h3 id="_3-3-try-catch-块" tabindex="-1"><a class="header-anchor" href="#_3-3-try-catch-块"><span>3.3. Try-Catch 块</span></a></h3><p>可能，无命名变量最有帮助的功能形式是无命名的 catch 块。<strong>很多时候，我们想要处理异常而实际上并不需要知道异常包含什么内容。</strong></p><p>有了无命名变量，我们就不再需要担心这个问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token function">someOperationThatFails</span><span class="token punctuation">(</span>car<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IllegalStateException</span> _<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Got an illegal state exception for: &quot;</span> <span class="token operator">+</span> car<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">RuntimeException</span> _<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Got a runtime exception!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它们也可以用于同一个 catch 中的多种异常类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IllegalStateException</span> <span class="token operator">|</span> <span class="token class-name">NumberFormatException</span> _<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-4-try-with-resources" tabindex="-1"><a class="header-anchor" href="#_3-4-try-with-resources"><span>3.4. Try-With Resources</span></a></h3><p>尽管 try-with 语法比 try-catch 遇到的少，但它也从这个特性中受益。例如，当使用数据库时，我们通常不需要事务对象。</p><p>让我们先创建一个模拟事务：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Transaction</span> <span class="token keyword">implements</span> <span class="token class-name">AutoCloseable</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Closed!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看这是如何工作的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">obtainTransactionAndUpdateCar</span><span class="token punctuation">(</span><span class="token class-name">Car</span> car<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token keyword">var</span> _ <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Transaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">updateCar</span><span class="token punctuation">(</span>car<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，也可以进行多个赋值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token keyword">var</span> _ <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Transaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">var</span> _ <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">&quot;/some/file&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-5-lambda-参数" tabindex="-1"><a class="header-anchor" href="#_3-5-lambda-参数"><span>3.5. Lambda 参数</span></a></h3><p><strong>Lambda 函数本质上提供了一种很好的代码重用方式</strong>。提供这种灵活性时，我们自然会遇到一些我们不感兴趣的情况。</p><p>一个很好的例子是 Map 接口中的 computeIfAbsent() 方法。它检查 map 中是否存在值，或者根据函数计算一个新的值。</p><p>虽然很有用，但我们通常不需要 lambda 的参数。它与传递给初始方法的键相同：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">Map</span>\`<span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Car</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token operator">&gt;</span> <span class="token function">getCarsByFirstLetter</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Car</span><span class="token punctuation">&gt;</span></span>\` cars<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Map</span>\`<span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Car</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token operator">&gt;</span> carMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    cars<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>car <span class="token operator">-&gt;</span>
        carMap<span class="token punctuation">.</span><span class="token function">computeIfAbsent</span><span class="token punctuation">(</span>car<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> _ <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>car<span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> carMap<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这适用于多个 lambda 和多个 lambda 参数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>map<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>_<span class="token punctuation">,</span> _<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Works!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-无命名模式" tabindex="-1"><a class="header-anchor" href="#_4-无命名模式"><span>4. 无命名模式</span></a></h2><p>无命名模式作为对记录模式匹配的增强引入。<strong>它们解决了一个相当明显的问题：我们通常不需要解构记录中的每个字段。</strong></p><p>为了探讨这个话题，让我们首先添加一个名为 Engine 的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Engine</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>引擎可以是汽油的、电动的或混合动力的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">GasEngine</span> <span class="token keyword">extends</span> <span class="token class-name">Engine</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">ElectricEngine</span> <span class="token keyword">extends</span> <span class="token class-name">Engine</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">HybridEngine</span> <span class="token keyword">extends</span> <span class="token class-name">Engine</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们扩展 Car 以支持参数化类型，以便我们可以根据引擎类型重用它。我们还将添加一个名为 color 的新字段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">Car</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">Engine</span><span class="token punctuation">&gt;</span></span>\`<span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> color<span class="token punctuation">,</span> <span class="token class-name">T</span> engine<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-1-instanceof" tabindex="-1"><a class="header-anchor" href="#_4-1-instanceof"><span>4.1. instanceof</span></a></h3><p><strong>在使用模式解构记录时，无命名模式使我们能够忽略我们不需要的字段。</strong></p><p>假设我们得到一个对象，如果它是一辆汽车，我们想要获取它的颜色：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getObjectsColor</span><span class="token punctuation">(</span><span class="token class-name">Object</span> object<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>object <span class="token keyword">instanceof</span> <span class="token class-name">Car</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> color<span class="token punctuation">,</span> <span class="token class-name">Engine</span> engine<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> color<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token string">&quot;No color!&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然这有效，但它很难阅读，我们定义了我们不需要的变量。让我们看看使用无命名模式是什么样子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getObjectsColorWithUnnamedPattern</span><span class="token punctuation">(</span><span class="token class-name">Object</span> object<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>object <span class="token keyword">instanceof</span> <span class="token class-name">Car</span><span class="token punctuation">(</span>_<span class="token punctuation">,</span> <span class="token class-name">String</span> color<span class="token punctuation">,</span> _<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> color<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token string">&quot;No color!&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在很明显我们只需要汽车的 color。</p><p>这也适用于简单的 instanceof 定义，但不太有用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>car <span class="token keyword">instanceof</span> <span class="token class-name">Car</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\` _<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-2-switch-模式" tabindex="-1"><a class="header-anchor" href="#_4-2-switch-模式"><span>4.2. Switch 模式</span></a></h3><p><strong>使用 switch 模式解构也允许我们忽略字段：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getObjectsColorWithSwitchAndUnnamedPattern</span><span class="token punctuation">(</span><span class="token class-name">Object</span> object<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>object<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token class-name">Car</span><span class="token punctuation">(</span>_<span class="token punctuation">,</span> <span class="token class-name">String</span> color<span class="token punctuation">,</span> _<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> color<span class="token punctuation">;</span>
        <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;No color!&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>此外，我们还可以处理参数化情况</strong>。例如，我们可以在不同的 switch 案例中处理不同的引擎类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">return</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>car<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token class-name">Car</span><span class="token punctuation">(</span>_<span class="token punctuation">,</span> _<span class="token punctuation">,</span> <span class="token class-name">GasEngine</span> _<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;gas&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token class-name">Car</span><span class="token punctuation">(</span>_<span class="token punctuation">,</span> _<span class="token punctuation">,</span> <span class="token class-name">ElectricEngine</span> _<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;electric&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token class-name">Car</span><span class="token punctuation">(</span>_<span class="token punctuation">,</span> _<span class="token punctuation">,</span> <span class="token class-name">HybridEngine</span> _<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;hybrid&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还可以更容易地将案例配对在一起，并且还可以带守卫：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">return</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>car<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token class-name">Car</span><span class="token punctuation">(</span>_<span class="token punctuation">,</span> _<span class="token punctuation">,</span> <span class="token class-name">GasEngine</span> _<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Car</span><span class="token punctuation">(</span>_<span class="token punctuation">,</span> _<span class="token punctuation">,</span> <span class="token class-name">ElectricEngine</span> _<span class="token punctuation">)</span> when someVariable <span class="token operator">==</span> someValue <span class="token operator">-&gt;</span> <span class="token string">&quot;not hybrid&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token class-name">Car</span><span class="token punctuation">(</span>_<span class="token punctuation">,</span> _<span class="token punctuation">,</span> <span class="token class-name">HybridEngine</span> _<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;hybrid&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>无命名模式和变量是一个伟大的补充，它解决了单一职责原则。对于 Java 8 之前的版本来说，这是一个破坏性变更，但后来的版本没有受到影响，因为命名变量 __ 是不允许的。</p><p><strong>这个特性通过减少样板代码和提高可读性，使一切看起来更简单，从而大放异彩</strong>。</p><p>如常，代码可以在 GitHub 上找到。</p>`,76),c=[p];function o(l,i){return s(),a("div",null,c)}const d=n(e,[["render",o],["__file","2024-06-29-Unnamed Patterns and Variables in Java 21.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Unnamed%20Patterns%20and%20Variables%20in%20Java%2021.html","title":"Java 21 中的无命名模式和变量 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-29T00:00:00.000Z","category":["Java","Programming"],"tag":["Java 21","Unnamed Patterns"],"head":[["meta",{"name":"keywords","content":"Java 21, Unnamed Patterns, Variables, JEP 443, Java Enhancement Proposal"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Unnamed%20Patterns%20and%20Variables%20in%20Java%2021.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 21 中的无命名模式和变量 | Baeldung"}],["meta",{"property":"og:description","content":"Java 21 中的无命名模式和变量 | Baeldung 1. 概述 Java 21 SE 的发布引入了一个令人兴奋的预览特性：无命名模式和变量（JEP 443）。这个新增加的特性允许我们在只关心副作用时减少样板代码。 无命名模式是对 Java 19 中的记录模式和 Switch 中的模式匹配的改进。我们还应该熟悉作为预览功能在 Java 14 中引..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T15:29:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 21"}],["meta",{"property":"article:tag","content":"Unnamed Patterns"}],["meta",{"property":"article:published_time","content":"2024-06-29T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T15:29:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 21 中的无命名模式和变量 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-29T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T15:29:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 21 中的无命名模式和变量 | Baeldung 1. 概述 Java 21 SE 的发布引入了一个令人兴奋的预览特性：无命名模式和变量（JEP 443）。这个新增加的特性允许我们在只关心副作用时减少样板代码。 无命名模式是对 Java 19 中的记录模式和 Switch 中的模式匹配的改进。我们还应该熟悉作为预览功能在 Java 14 中引..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 目的","slug":"_2-目的","link":"#_2-目的","children":[{"level":3,"title":"3.1. 增强的 for 循环","slug":"_3-1-增强的-for-循环","link":"#_3-1-增强的-for-循环","children":[]},{"level":3,"title":"3.2. 赋值语句","slug":"_3-2-赋值语句","link":"#_3-2-赋值语句","children":[]},{"level":3,"title":"3.3. Try-Catch 块","slug":"_3-3-try-catch-块","link":"#_3-3-try-catch-块","children":[]},{"level":3,"title":"3.4. Try-With Resources","slug":"_3-4-try-with-resources","link":"#_3-4-try-with-resources","children":[]},{"level":3,"title":"3.5. Lambda 参数","slug":"_3-5-lambda-参数","link":"#_3-5-lambda-参数","children":[]}]},{"level":2,"title":"4. 无命名模式","slug":"_4-无命名模式","link":"#_4-无命名模式","children":[{"level":3,"title":"4.1. instanceof","slug":"_4-1-instanceof","link":"#_4-1-instanceof","children":[]},{"level":3,"title":"4.2. Switch 模式","slug":"_4-2-switch-模式","link":"#_4-2-switch-模式","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719674964000,"updatedTime":1719674964000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.29,"words":1887},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Unnamed Patterns and Variables in Java 21.md","localizedDate":"2024年6月29日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>Java 21 SE 的发布引入了一个令人兴奋的预览特性：无命名模式和变量（JEP 443）。这个新增加的特性允许我们在只关心副作用时减少样板代码。</p>\\n<p>无命名模式是对 Java 19 中的记录模式和 Switch 中的模式匹配的改进。我们还应该熟悉作为预览功能在 Java 14 中引入的记录功能。</p>\\n<p>在本教程中，我们将深入探讨如何使用这些新特性来提高我们的代码质量和可读性。</p>\\n<h2>2. 目的</h2>\\n<p>通常，在使用复杂对象时，我们并不总是需要它们持有的所有数据。理想情况下，我们只从对象中获取我们需要的东西，但这种情况很少见。大多数时候，我们最终只使用了我们被给予的一小部分。</p>","autoDesc":true}');export{d as comp,k as data};
