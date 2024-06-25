import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-C7BF_WGE.js";const t={},p=e(`<h1 id="kotlin中的变量遮蔽" tabindex="-1"><a class="header-anchor" href="#kotlin中的变量遮蔽"><span>Kotlin中的变量遮蔽</span></a></h1><p>在Kotlin中，每个在作用域内声明的变量都会遮蔽作用域外同名的变量。这适用于所有作用域级别，例如函数内、类内或代码块中。</p><p>有时，变量遮蔽是有用的——例如，用于将我们的代码与系统的其他部分隔离。然而，对于不熟悉它的人来说，这可能会造成混淆。尽管Kotlin允许这样做，但它强烈建议尽可能避免使用遮蔽。如果我们使用像IntelliJ IDEA这样的IDE，我们将很容易发现为我们突出显示的警告。</p><p>在本教程中，<strong>我们将讨论一些在Kotlin中可能发生遮蔽的情况。</strong></p><h3 id="类成员变量遮蔽" tabindex="-1"><a class="header-anchor" href="#类成员变量遮蔽"><span>类成员变量遮蔽</span></a></h3><p>这种情况发生在我们有一个类的成员变量，然后我们在函数作用域或代码块内创建了另一个同名的变量：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> Car <span class="token punctuation">{</span>
    <span class="token keyword">val</span> speed<span class="token operator">:</span> Int <span class="token operator">=</span> <span class="token number">100</span>

    <span class="token keyword">fun</span> <span class="token function">upSpeed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Int <span class="token punctuation">{</span>
        <span class="token keyword">val</span> speed <span class="token operator">=</span> speed <span class="token operator">*</span> <span class="token number">2</span>
        <span class="token keyword">return</span> speed
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token function">Car</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>speed<span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token function">Car</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">upSpeed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如，<code>Car</code>类有一个初始值为100的<code>speed</code>属性。然后，我们有一个<code>upSpeed()</code>函数，在函数内将局部<code>speed</code>值翻倍，但不会改变<code>Car</code>对象的<code>speed</code>属性值。</p><p><code>upSpeed()</code>函数中的局部变量<code>speed</code>导致局部变量覆盖（遮蔽）<code>Car</code>类的<code>speed</code>变量。因此，当在<code>upSpeed()</code>函数中使用<code>speed</code>时，访问的是局部变量，而不是<code>Car</code>对象的<code>speed</code>属性。</p><p>为了避免遮蔽，我们可以在<code>upSpeed()</code>函数中使用变量名<code>newSpeed</code>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">upSpeed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Int <span class="token punctuation">{</span>
    <span class="token keyword">val</span> newSpeed <span class="token operator">=</span> speed <span class="token operator">*</span> <span class="token number">2</span> <span class="token comment">// 使用新变量名以避免遮蔽</span>
    <span class="token keyword">return</span> newSpeed
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除非我们实际上想要访问<code>Car</code>类中的<code>speed</code>，在这种情况下，我们应该使用<code>this</code>关键字以明确：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">upSpeed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Int <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>speed <span class="token operator">*</span> <span class="token number">2</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用<code>this</code>关键字访问<code>speed</code>字段。</p><h3 id="参数遮蔽" tabindex="-1"><a class="header-anchor" href="#参数遮蔽"><span>参数遮蔽</span></a></h3><p>参数遮蔽可能发生在我们声明一个函数参数，其名称与封闭作用域中的变量或参数名称相同：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">calculateTotalPrice</span><span class="token punctuation">(</span>discount<span class="token operator">:</span> Int<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> discount <span class="token operator">=</span> discount <span class="token operator">+</span> <span class="token number">10</span> <span class="token comment">// 遮蔽参数 &#39;discount&#39;</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在函数中，我们有一个局部<code>discount</code>变量，其值是将10加到接收到的<code>discount</code>参数值的结果。这导致<code>discount</code>参数被同名的局部变量遮蔽。</p><p>这可能会造成混淆和潜在的错误，如果我们不小心的话。我们应该避免像这样的情况下的遮蔽：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">calculateTotalPrice</span><span class="token punctuation">(</span>discount<span class="token operator">:</span> Int<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> updatedDiscount <span class="token operator">=</span> discount <span class="token operator">+</span> <span class="token number">10</span> <span class="token comment">// 使用新变量名以避免遮蔽</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用不同的变量名是一个好主意，以防止潜在的错误并使代码更容易理解。</p><h3 id="局部变量遮蔽" tabindex="-1"><a class="header-anchor" href="#局部变量遮蔽"><span>局部变量遮蔽</span></a></h3><p>在Kotlin中，每个在作用域内声明的变量都会遮蔽作用域外同名的变量。因此，在嵌套函数中，它也会发生：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> price <span class="token operator">=</span> <span class="token number">100</span> <span class="token comment">// 局部变量</span>
<span class="token keyword">val</span> discountRate <span class="token operator">=</span> <span class="token number">0.1</span>

<span class="token keyword">fun</span> <span class="token function">applyDiscount</span><span class="token punctuation">(</span>price<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token operator">:</span> Double <span class="token punctuation">{</span> <span class="token comment">// 嵌套函数，参数名为 &#39;price&#39;</span>
    <span class="token keyword">val</span> discountRate <span class="token operator">=</span> <span class="token number">0.2</span>  <span class="token comment">// 遮蔽外部变量 discountRate</span>
    <span class="token keyword">return</span> price <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> discountRate<span class="token punctuation">)</span> <span class="token comment">// 这里的 &#39;price&#39; 指的是参数，而不是外部变量</span>
<span class="token punctuation">}</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">80.0</span><span class="token punctuation">,</span> <span class="token function">applyDiscount</span><span class="token punctuation">(</span>price<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>applyDiscount()</code>嵌套函数有一个名为<code>discountRate</code>的局部变量，值为0.2。这在嵌套函数的作用域内遮蔽了外部<code>discountRate</code>变量（值为0.1）。</p><p>为了避免遮蔽，只需在<code>applyDiscount()</code>中为折扣率变量选择一个不同的名称。例如，让我们使用<code>innerDiscountRate</code>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">applyDiscount</span><span class="token punctuation">(</span>price<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token operator">:</span> Double <span class="token punctuation">{</span>
    <span class="token keyword">val</span> innerDiscountRate <span class="token operator">=</span> <span class="token number">0.2</span> <span class="token comment">// 使用不同的名称以避免遮蔽</span>
    <span class="token keyword">return</span> price <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> innerDiscountRate<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果内部函数确实需要来自外部作用域的折扣率，我们可以直接访问它，而不需要引入一个单独的变量：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">applyDiscount</span><span class="token punctuation">(</span>price<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token operator">:</span> Double <span class="token punctuation">{</span>
    <span class="token keyword">return</span> price <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> discountRate<span class="token punctuation">)</span> <span class="token comment">// 直接使用外部的 discountRate</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样看起来更合理，减少了混淆。</p><p>变量遮蔽也可以在循环中发生，当我们在循环中声明一个变量作为迭代器，并且它与循环外的变量具有相同的名称时：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> numbers <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span>number <span class="token keyword">in</span> numbers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> number <span class="token operator">=</span> number <span class="token operator">*</span> <span class="token number">2</span> <span class="token comment">// 遮蔽循环变量 &#39;number&#39;</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如，在循环内部，我们有一个局部变量<code>number</code>，它覆盖了同名的循环变量。在这种情况下，局部变量<code>number</code>经历了循环变量的遮蔽。</p><p>这也会造成混淆。如果我们改为使用类似<code>newNumber</code>的名称会更好：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">for</span> <span class="token punctuation">(</span>number <span class="token keyword">in</span> numbers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> newNumber <span class="token operator">=</span> number <span class="token operator">*</span> <span class="token number">2</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用<code>newNumber</code>变量来存储乘法的结果，避免了遮蔽问题。</p><h3 id="扩展函数遮蔽" tabindex="-1"><a class="header-anchor" href="#扩展函数遮蔽"><span>扩展函数遮蔽</span></a></h3><p>在Kotlin中，我们可以向内置数据类型添加扩展，并赋予它们与内置函数相同的名称。然而，扩展函数将根据上下文被调用：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> numbers <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// ...</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span> numbers<span class="token punctuation">.</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">fun</span> List\`\`\`<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>\`\`\`<span class="token punctuation">.</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Int <span class="token punctuation">{</span> <span class="token comment">// 遮蔽内置函数 sum()</span>
    <span class="token keyword">var</span> sum <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span> sum <span class="token operator">+=</span> it <span class="token operator">*</span> <span class="token number">2</span> <span class="token punctuation">}</span>
    <span class="token keyword">return</span> sum
<span class="token punctuation">}</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> numbers<span class="token punctuation">.</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，如果我们在<code>List\`\`\`&lt;Int&gt;\`\`\`\`对象上调用</code>sum()<code>，**它将调用我们定义的扩展函数，而不是内置的Kotlin函数**</code>sum()\`。</p><p>这与遮蔽有类似的效果，所以我们在使用这种方法时必须小心。</p><p>为了避免遮蔽，我们可以使用另一个名称：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> List\`\`\`<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>\`\`\`<span class="token punctuation">.</span><span class="token function">sumByTwo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Int <span class="token punctuation">{</span> <span class="token comment">// 重命名以避免遮蔽</span>
    <span class="token keyword">var</span> sum <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span> sum <span class="token operator">+=</span> it <span class="token operator">*</span> <span class="token number">2</span> <span class="token punctuation">}</span>
    <span class="token keyword">return</span> sum
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，我们可以直接使用<code>sumOf()</code>函数，然后在lambda内部修改它：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> doubledSum <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">sumOf</span> <span class="token punctuation">{</span> it <span class="token operator">*</span> <span class="token number">2</span> <span class="token punctuation">}</span> <span class="token comment">// 在sumOf中修改lambda</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> doubledSum<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>是的，我们已经减少了混淆，我们的代码看起来更简单，更有表现力。</p><h3 id="lambda中的变量遮蔽" tabindex="-1"><a class="header-anchor" href="#lambda中的变量遮蔽"><span>Lambda中的变量遮蔽</span></a></h3><p>Lambda表达式本质上是我们可以将它们视为值的匿名函数。因此，lambda有自己的作用域，以至于在lambda中声明的变量只能从lambda内部访问。然而，lambda可以访问作用域外的变量，这导致了遮蔽的可能性：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> number <span class="token operator">=</span> <span class="token number">10</span>
<span class="token keyword">val</span> lambda <span class="token operator">=</span> <span class="token punctuation">{</span> number<span class="token operator">:</span> Int <span class="token operator">-&gt;</span>
    <span class="token keyword">val</span> number <span class="token operator">=</span> <span class="token number">1</span> <span class="token comment">// Lambda中的局部变量</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Lambda接收的参数也被认为是在其局部作用域内。这些参数可以在lambda体内部被访问和引用。因此，这也允许在lambda中发生参数遮蔽：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> numbers <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// ...</span>
<span class="token keyword">var</span> sum <span class="token operator">=</span> <span class="token number">0</span>

numbers<span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span> number <span class="token operator">-&gt;</span>
    <span class="token keyword">val</span> number <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">// 遮蔽值</span>
    sum <span class="token operator">+=</span> number
<span class="token punctuation">}</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> sum<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如，在每次迭代中，我们有一个局部变量<code>number</code>，它覆盖了lambda参数的<code>number</code>变量，导致遮蔽。</p><p>为了避免遮蔽，我们需要考虑上下文。如果目标是对所有元素求和，那么我们需要直接将当前元素添加到<code>sum</code>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>numbers<span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span> number <span class="token operator">-&gt;</span>
    sum <span class="token operator">+=</span> number <span class="token comment">// 直接访问循环中的当前元素</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，每个元素都在循环中直接访问并添加到<code>sum</code>变量。</p><h3 id="顶级函数变量遮蔽" tabindex="-1"><a class="header-anchor" href="#顶级函数变量遮蔽"><span>顶级函数变量遮蔽</span></a></h3><p>在Kotlin中，我们可以不创建类就编写代码，所以变量遮蔽也可能发生在顶级函数中：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> number <span class="token operator">=</span> <span class="token number">10</span> <span class="token comment">// 顶级变量</span>

<span class="token keyword">fun</span> <span class="token function">upNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Int <span class="token punctuation">{</span> <span class="token comment">// 顶级函数</span>
    <span class="token keyword">val</span> number <span class="token operator">=</span> <span class="token number">20</span> <span class="token comment">// 遮蔽顶级变量</span>
    <span class="token keyword">return</span> number
<span class="token punctuation">}</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token function">upNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> number<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码定义了一个值为10的顶级<code>number</code>变量。然后，我们有一个<code>upNumber()</code>函数，它也定义了一个名为<code>number</code>的局部变量，值为20，这导致遮蔽了顶级<code>number</code>变量。</p><p>解决方案与其他遮蔽情况类似，但<strong>在这种情况下，顶级变量不能使用<code>this</code>关键字访问</strong>。</p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在本文中，我们讨论了一些在Kotlin中允许变量遮蔽的情况。虽然有时有点用，但它通常会让代码更难阅读，引入潜在的逻辑错误，并且更难调试。</p><p>为了避免它的缺点，通常应该避免使用遮蔽。我们可以依靠我们的IDE警告来帮助我们注意它。</p><p>我们还提供了可能的解决方案，比如使用不同的变量名或者如果可能的话使用<code>this</code>关键字。</p><p>如常，代码示例可以在GitHub上找到。</p><p>OK</p>`,66),o=[p];function c(l,i){return a(),s("div",null,o)}const r=n(t,[["render",c],["__file","2024-06-20-Variable Shadowing in Kotlin.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Variable%20Shadowing%20in%20Kotlin.html","title":"Kotlin中的变量遮蔽","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Kotlin"],"tag":["Variable Shadowing","Programming"],"head":[["meta",{"name":"keywords","content":"Kotlin, Variable Shadowing, Programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Variable%20Shadowing%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中的变量遮蔽"}],["meta",{"property":"og:description","content":"Kotlin中的变量遮蔽 在Kotlin中，每个在作用域内声明的变量都会遮蔽作用域外同名的变量。这适用于所有作用域级别，例如函数内、类内或代码块中。 有时，变量遮蔽是有用的——例如，用于将我们的代码与系统的其他部分隔离。然而，对于不熟悉它的人来说，这可能会造成混淆。尽管Kotlin允许这样做，但它强烈建议尽可能避免使用遮蔽。如果我们使用像Intelli..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Variable Shadowing"}],["meta",{"property":"article:tag","content":"Programming"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中的变量遮蔽\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中的变量遮蔽 在Kotlin中，每个在作用域内声明的变量都会遮蔽作用域外同名的变量。这适用于所有作用域级别，例如函数内、类内或代码块中。 有时，变量遮蔽是有用的——例如，用于将我们的代码与系统的其他部分隔离。然而，对于不熟悉它的人来说，这可能会造成混淆。尽管Kotlin允许这样做，但它强烈建议尽可能避免使用遮蔽。如果我们使用像Intelli..."},"headers":[{"level":3,"title":"类成员变量遮蔽","slug":"类成员变量遮蔽","link":"#类成员变量遮蔽","children":[]},{"level":3,"title":"参数遮蔽","slug":"参数遮蔽","link":"#参数遮蔽","children":[]},{"level":3,"title":"局部变量遮蔽","slug":"局部变量遮蔽","link":"#局部变量遮蔽","children":[]},{"level":3,"title":"扩展函数遮蔽","slug":"扩展函数遮蔽","link":"#扩展函数遮蔽","children":[]},{"level":3,"title":"Lambda中的变量遮蔽","slug":"lambda中的变量遮蔽","link":"#lambda中的变量遮蔽","children":[]},{"level":3,"title":"顶级函数变量遮蔽","slug":"顶级函数变量遮蔽","link":"#顶级函数变量遮蔽","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.79,"words":2036},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Variable Shadowing in Kotlin.md","localizedDate":"2024年6月20日","excerpt":"\\n<p>在Kotlin中，每个在作用域内声明的变量都会遮蔽作用域外同名的变量。这适用于所有作用域级别，例如函数内、类内或代码块中。</p>\\n<p>有时，变量遮蔽是有用的——例如，用于将我们的代码与系统的其他部分隔离。然而，对于不熟悉它的人来说，这可能会造成混淆。尽管Kotlin允许这样做，但它强烈建议尽可能避免使用遮蔽。如果我们使用像IntelliJ IDEA这样的IDE，我们将很容易发现为我们突出显示的警告。</p>\\n<p>在本教程中，<strong>我们将讨论一些在Kotlin中可能发生遮蔽的情况。</strong></p>\\n<h3>类成员变量遮蔽</h3>\\n<p>这种情况发生在我们有一个类的成员变量，然后我们在函数作用域或代码块内创建了另一个同名的变量：</p>","autoDesc":true}');export{r as comp,k as data};
