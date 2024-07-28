import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DzJ3ruqA.js";const e={},o=t(`<h1 id="kotlin中的条件性异常抛出" tabindex="-1"><a class="header-anchor" href="#kotlin中的条件性异常抛出"><span>Kotlin中的条件性异常抛出</span></a></h1><p>异常处理是软件开发中不可或缺的一部分。</p><p>在本教程中，我们将深入探讨Kotlin中条件性异常抛出的习惯用法，Kotlin是一种现代且简洁的编程语言。</p><h2 id="_2-理解条件性抛出" tabindex="-1"><a class="header-anchor" href="#_2-理解条件性抛出"><span>2. 理解条件性抛出</span></a></h2><p>条件性抛出是指基于特定条件抛出异常的做法：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>condition<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token function">SomeException</span><span class="token punctuation">(</span><span class="token operator">..</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与传统的<code>if</code>块检查条件并抛出异常不同，Kotlin允许我们以更简洁的方式表达这个逻辑，使我们的代码更易读，并减少了样板代码。</p><p>在本教程中，我们将看到Kotlin中处理条件性抛出的多种方式。</p><h2 id="_3-使用标准的require-和check-函数" tabindex="-1"><a class="header-anchor" href="#_3-使用标准的require-和check-函数"><span>3. 使用标准的<code>require()</code>和<code>check()</code>函数</span></a></h2><p>Kotlin提供了<code>require()</code>, <code>requireNotNull()</code>, <code>check()</code>和<code>checkNotNull()</code>函数来进行条件性抛出。</p><p><strong>如果我们想抛出一个<code>IllegalArgumentException</code>，我们可以考虑使用<code>require()</code>或<code>requireNotNull()</code>函数。</strong></p><p>接下来，让我们看一些使用这两个函数的例子：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> str <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;a b c&quot;</span></span>
assertThrows\`\`<span class="token operator">&lt;</span>IllegalArgumentException<span class="token operator">&gt;</span>\`\` <span class="token punctuation">{</span>
    <span class="token function">require</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token string-literal singleline"><span class="token string">&quot;The string is too short.&quot;</span></span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>require()</code>是一个简单的函数。但由于它的返回类型是<code>Unit</code>，<strong>我们不能在<code>require()</code>检查之后无缝地执行额外的操作</strong>。要克服这个限制，我们可以<strong>利用作用域函数，如<code>also()</code></strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> upperStr <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">also</span> <span class="token punctuation">{</span>
    <span class="token function">require</span><span class="token punctuation">(</span>it<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot; &quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>size <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token string-literal singleline"><span class="token string">&quot;Format not supported&quot;</span></span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">uppercase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;A B C&quot;</span></span><span class="token punctuation">,</span> upperStr<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们在<code>require()</code>检查之后流畅地调用了<code>uppercase()</code>。</p><p><strong><code>requireNotNull(value) { optionalMessage }</code>如果<code>value</code>为<code>null</code>，则抛出带有给定消息的<code>IllegalArgumentException</code>：</strong></p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">var</span> nullableValue<span class="token operator">:</span> String<span class="token operator">?</span> <span class="token operator">=</span> <span class="token keyword">null</span>
assertThrows\`\`<span class="token operator">&lt;</span>IllegalArgumentException<span class="token operator">&gt;</span>\`\` <span class="token punctuation">{</span>
    <span class="token function">requireNotNull</span><span class="token punctuation">(</span>nullableValue<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token string-literal singleline"><span class="token string">&quot;Null is not allowed&quot;</span></span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与<code>require()</code>不同，<code>requireNotNull()</code>返回<code>value</code>。<strong>这允许我们在<code>requireNotNull()</code>检查之后流畅地执行进一步的操作</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>nullableValue <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;a b c&quot;</span></span>
<span class="token keyword">val</span> uppercaseValue <span class="token operator">=</span> <span class="token function">requireNotNull</span><span class="token punctuation">(</span>nullableValue<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">uppercase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;A B C&quot;</span></span><span class="token punctuation">,</span> uppercaseValue<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>check()</code>和<code>checkNotNull()</code>与<code>require()</code>和<code>requireNotNull()</code>非常相似。唯一的区别是**<code>check()</code>和<code>checkNotNull()</code>抛出的是<code>IllegalStateException</code>而不是<code>IllegalArgumentException</code>**：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> str <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;a b c&quot;</span></span>
assertThrows\`\`\`<span class="token operator">&lt;</span>IllegalStateException<span class="token operator">&gt;</span>\`\`\` <span class="token punctuation">{</span>
    <span class="token function">check</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token string-literal singleline"><span class="token string">&quot;The string is too short.&quot;</span></span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> nullableValue<span class="token operator">:</span> String<span class="token operator">?</span> <span class="token operator">=</span> <span class="token keyword">null</span>
assertThrows\`\`\`<span class="token operator">&lt;</span>IllegalStateException<span class="token operator">&gt;</span>\`\`\` <span class="token punctuation">{</span>
    <span class="token function">checkNotNull</span><span class="token punctuation">(</span>nullableValue<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token string-literal singleline"><span class="token string">&quot;Null is not allowed&quot;</span></span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

nullableValue <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;a b c&quot;</span></span>
<span class="token keyword">val</span> uppercaseValue <span class="token operator">=</span> <span class="token function">checkNotNull</span><span class="token punctuation">(</span>nullableValue<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">uppercase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;A B C&quot;</span></span><span class="token punctuation">,</span> uppercaseValue<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用takeif-throw" tabindex="-1"><a class="header-anchor" href="#_4-使用takeif-throw"><span>4. 使用<code>takeIf() ?: throw …</code></span></a></h2><p>虽然像<code>require()</code>和<code>check()</code>这样的内置函数提供了便利，但<strong>它们仅限于抛出<code>IllegalArgumentException</code>或<code>IllegalStateException</code></strong>。但我们经常需要处理不同的异常，例如，自定义的异常类型：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> <span class="token function">MyException</span><span class="token punctuation">(</span>msg<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">Exception</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>解决这个问题的一种方法是使用<code>takeIf()</code>和Kotlin的Elvis运算符（<code>?:</code>）：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>takeIf<span class="token punctuation">{</span> precondition lambda <span class="token punctuation">}</span> <span class="token operator">?:</span> <span class="token keyword">throw</span> <span class="token function">SomeException</span><span class="token punctuation">(</span><span class="token operator">..</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>我们依赖<code>takeIf()</code>在不满足前提条件时返回<code>null</code>，这将触发Elvis运算符的参数。</strong></p><p>接下来，让我们看一个例子：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> str <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;a b c&quot;</span></span>
assertThrows\`\`\`<span class="token operator">&lt;</span>MyException<span class="token operator">&gt;</span>\`\`\` <span class="token punctuation">{</span>
    str<span class="token punctuation">.</span><span class="token function">takeIf</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">10</span> <span class="token punctuation">}</span> <span class="token operator">?:</span> <span class="token keyword">throw</span> <span class="token function">MyException</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;The string is too short.&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了支持所有异常类型，由于<code>takeIf()</code>是一个扩展函数，<strong>我们可以从接收者对象</strong>（本例中的<code>str</code>）<strong>直接调用它，并在<code>takeIf()</code>的lambda中轻松引用接收者对象</strong>。</p><p>然而，这种方法有一个限制：<strong>它不能处理我们认为<code>null</code>是有效值的情况。<strong>这是因为</strong>“<code>?: throw …</code>”将在<code>receiverObj.takeIf(precondition)</code>返回<code>null</code>时触发</strong>，并且**<code>receiverObj.takeIf(precondition)</code>返回<code>null</code>有两种情况**：</p><ul><li>前提函数返回<code>false</code></li><li>前提函数返回<code>true</code>，但<code>receiverObj</code>是<code>null</code></li></ul><p>一个例子可以清楚地展示这个场景：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> nullIsValid<span class="token operator">:</span> String<span class="token operator">?</span> <span class="token operator">=</span> <span class="token keyword">null</span>
assertThrows\`\`\`<span class="token operator">&lt;</span>MyException<span class="token operator">&gt;</span>\`\`\` <span class="token punctuation">{</span>
    nullIsValid<span class="token punctuation">.</span><span class="token function">takeIf</span> <span class="token punctuation">{</span> <span class="token boolean">true</span> <span class="token punctuation">}</span> <span class="token operator">?:</span> <span class="token keyword">throw</span> <span class="token function">MyException</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;The string is too short.&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，<strong>如果<code>null</code>是一个有效的情况，我们不应该使用这种方法</strong>。</p><h2 id="_5-throwif-函数" tabindex="-1"><a class="header-anchor" href="#_5-throwif-函数"><span>5. <code>throwIf()</code>函数</span></a></h2><p>执行条件性抛出的另一个想法是<strong>创建一个包装“<code>if (…) throw …</code>”块的函数，使其更易于使用</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">inline</span> <span class="token keyword">fun</span> <span class="token function">throwIf</span><span class="token punctuation">(</span>throwCondition<span class="token operator">:</span> Boolean<span class="token punctuation">,</span> exProvider<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> Exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>throwCondition<span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token function">exProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，<code>throwIf()</code>函数有两个参数。第一个是<code>Boolean</code>中的条件，另一个是<strong>提供<code>Exception</code>实例的函数</strong>。</p><p>接下来，让我们通过一个例子看看如何使用<code>throwIf()</code>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> str <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;a b c&quot;</span></span>
assertThrows\`\`\`<span class="token operator">&lt;</span>MyException<span class="token operator">&gt;</span>\`\`\` <span class="token punctuation">{</span>
    <span class="token function">throwIf</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span>length \`<span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">MyException</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;The string is too short.&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，<code>throwIf()</code>提高了条件性抛出的可读性。值得一提的是，由于<code>exProvider</code>参数是一个函数，<strong>_{MyException(“…”)}_只有在<code>throwCondition</code>为<code>true</code>时才执行</strong>。本质上，<strong><code>exProvider</code>懒加载地提供<code>Exception</code>实例，从而避免了创建不必要的对象</strong>。</p><p>由于<code>throwIf()</code>返回<code>Unit</code>，如果我们想在<code>throwIf()</code>之后无缝执行进一步的操作，我们可以使用同样的技巧，通过<strong>利用<code>also()</code>函数</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> uppercaseValue <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">also</span> <span class="token punctuation">{</span>
    <span class="token function">throwIf</span><span class="token punctuation">(</span>it<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot; &quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>size <span class="token operator">!=</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">MyException</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Format not supported&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">uppercase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;A B C&quot;</span></span><span class="token punctuation">,</span> uppercaseValue<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-musthave-函数" tabindex="-1"><a class="header-anchor" href="#_6-musthave-函数"><span>6. <code>mustHave()</code>函数</span></a></h2><p>到目前为止，我们已经看到了执行Kotlin中习惯用法的条件性抛出的不同方法。它们可能对我们日常任务的大部分都足够了。然而，如果我们仔细考虑，它们有各种缺点：</p><ul><li>异常类型限制——<code>check()/require()</code></li><li>不是功能性/流畅的API——<code>check()/require()</code>和<code>throwIf()</code></li><li><code>null</code>处理限制——<code>takeIf()</code></li></ul><p>所以，接下来，让我们总结一下<strong>我们希望条件性抛出函数具备的理想特性</strong>：</p><ul><li>支持所有异常类型</li><li>扩展函数——使任何对象都能成为接收者并直接调用它</li><li>如果没有抛出异常，则返回接收者对象——允许流畅地链接操作</li><li>异常提供者作为函数——支持复杂的错误处理逻辑和延迟对象实例化</li><li>条件作为函数——适应更复杂的检查</li><li>接收者作为异常提供者和条件函数中的参数——简化了在这些函数中引用接收者</li></ul><p>接下来，让我们尝试创建一个满足我们需求的函数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">inline</span> <span class="token keyword">fun</span> <span class="token operator">&lt;</span>T <span class="token operator">:</span> Any<span class="token operator">?</span><span class="token operator">&gt;</span>\` T<span class="token punctuation">.</span><span class="token function">mustHave</span><span class="token punctuation">(</span>
    otherwiseThrow<span class="token operator">:</span> <span class="token punctuation">(</span>T<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> Exception <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token function">IllegalStateException</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;mustHave check failed: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">it</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    require<span class="token operator">:</span> <span class="token punctuation">(</span>T<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> Boolean
<span class="token punctuation">)</span><span class="token operator">:</span> T <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token function">otherwiseThrow</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>mustHave()</code>函数接受两个参数，都是函数。<code>otherwiseThrow</code><strong>有一个默认值，一个返回<code>IllegalStateException</code>对象的函数</strong>。也就是说，<strong>如果没有指定特定的异常提供者，如果<code>require</code>不满足，将抛出<code>IllegalStateException</code></strong>。</p><p>接下来，让我们通过例子看看如何使用<code>mustHave()</code>。假设我们有一个简单的数据类<code>Player</code>，以及<code>InvalidPlayerException</code>类：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">Player</span><span class="token punctuation">(</span><span class="token keyword">val</span> id<span class="token operator">:</span> Int<span class="token punctuation">,</span> <span class="token keyword">val</span> name<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">val</span> score<span class="token operator">:</span> Int<span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token function">InvalidPlayerException</span><span class="token punctuation">(</span>message<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">RuntimeException</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们想要在玩家的分数为负数时抛出异常：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> kai <span class="token operator">=</span> <span class="token function">Player</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Kai&quot;</span></span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">)</span>
assertThrows\`\`\`<span class="token operator">&lt;</span>IllegalStateException<span class="token operator">&gt;</span>\`\`\` <span class="token punctuation">{</span> kai<span class="token punctuation">.</span><span class="token function">mustHave</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>score <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token punctuation">}</span>
    <span class="token punctuation">.</span><span class="token function">also</span> <span class="token punctuation">{</span> ex <span class="token operator">-&gt;</span> <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;mustHave check failed: Player(id=1, name=Kai, score=-5)&quot;</span></span><span class="token punctuation">,</span> ex<span class="token punctuation">.</span>message<span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们提供了一个lambda来检查玩家是否有效。在这个例子中，我们简单地检查了<code>score</code>值。如果需要，<strong>lambda可以包含复杂的实现</strong>继续翻译：</p><p>当然，我们没有指定<code>otherwiseThrow</code>参数，所以默认抛出了<code>IllegalStateException</code>。当然，我们可以传递一个函数来要求<code>mustHave()</code>抛出指定的异常：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>assertThrows\`<span class="token operator">&lt;</span>InvalidPlayerException<span class="token operator">&gt;</span>\` <span class="token punctuation">{</span>
    kai<span class="token punctuation">.</span><span class="token function">mustHave</span><span class="token punctuation">(</span>
        require <span class="token operator">=</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>score <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        otherwiseThrow <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token function">InvalidPlayerException</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Player [id=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">it<span class="token punctuation">.</span>id</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, name=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">it<span class="token punctuation">.</span>name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">] is invalid&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">also</span> <span class="token punctuation">{</span> ex <span class="token operator">-&gt;</span> <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Player [id=1, name=Kai] is invalid&quot;</span></span><span class="token punctuation">,</span> ex<span class="token punctuation">.</span>message<span class="token punctuation">)</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们使用命名参数使代码易于阅读</strong>。另外值得一提的是，由于接收者是<code>require</code>和<code>otherwiseThrow</code>函数的参数，我们可以在lambda表达式中轻松引用接收者。例如，<strong>我们可以在两个lambda表达式中使用隐式变量“<em>it</em>”</strong>。</p><p>最后，如果接收者对象通过了<code>require</code>检查，<strong><code>mustHave()</code>允许我们无缝地链接进一步的操作来处理接收者</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> liam <span class="token operator">=</span> <span class="token function">Player</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Liam&quot;</span></span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> upperDescription <span class="token operator">=</span> liam<span class="token punctuation">.</span><span class="token function">mustHave</span><span class="token punctuation">(</span>
    require <span class="token operator">=</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>score <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    otherwiseThrow <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token function">InvalidPlayerException</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Player [id=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">it<span class="token punctuation">.</span>id</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, name=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">it<span class="token punctuation">.</span>name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">] is invalid&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">let</span> <span class="token punctuation">{</span> <span class="token string-literal singleline"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">it<span class="token punctuation">.</span>name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> : </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">it<span class="token punctuation">.</span>score</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">.</span><span class="token function">uppercase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;LIAM : 42&quot;</span></span><span class="token punctuation">,</span> upperDescription<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们旨在发现Kotlin中处理条件性异常抛出的简洁和习惯用法。我们探讨了内置选项和几种自定义函数，如<code>throwIf()</code>和<code>mustHave()</code>。</p><p>如往常一样，示例的完整源代码可在GitHub上获得。</p><p><img src="https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/whiteleaf.svg" alt="img" loading="lazy"></p><p>OK</p>`,68),p=[o];function l(c,i){return a(),s("div",null,p)}const d=n(e,[["render",l],["__file","2024-06-28-Conditional Exception Throwing in Kotlin.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Conditional%20Exception%20Throwing%20in%20Kotlin.html","title":"Kotlin中的条件性异常抛出","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Exception Handling"],"tag":["Kotlin","Exception","Conditional Throwing"],"head":[["meta",{"name":"keywords","content":"Kotlin, Exception Handling, Conditional Throwing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Conditional%20Exception%20Throwing%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中的条件性异常抛出"}],["meta",{"property":"og:description","content":"Kotlin中的条件性异常抛出 异常处理是软件开发中不可或缺的一部分。 在本教程中，我们将深入探讨Kotlin中条件性异常抛出的习惯用法，Kotlin是一种现代且简洁的编程语言。 2. 理解条件性抛出 条件性抛出是指基于特定条件抛出异常的做法： 与传统的if块检查条件并抛出异常不同，Kotlin允许我们以更简洁的方式表达这个逻辑，使我们的代码更易读，并..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T21:53:32.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Exception"}],["meta",{"property":"article:tag","content":"Conditional Throwing"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T21:53:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中的条件性异常抛出\\",\\"image\\":[\\"https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png\\",\\"https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&r=g\\",\\"https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/whiteleaf.svg\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T21:53:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中的条件性异常抛出 异常处理是软件开发中不可或缺的一部分。 在本教程中，我们将深入探讨Kotlin中条件性异常抛出的习惯用法，Kotlin是一种现代且简洁的编程语言。 2. 理解条件性抛出 条件性抛出是指基于特定条件抛出异常的做法： 与传统的if块检查条件并抛出异常不同，Kotlin允许我们以更简洁的方式表达这个逻辑，使我们的代码更易读，并..."},"headers":[{"level":2,"title":"2. 理解条件性抛出","slug":"_2-理解条件性抛出","link":"#_2-理解条件性抛出","children":[]},{"level":2,"title":"3. 使用标准的require()和check()函数","slug":"_3-使用标准的require-和check-函数","link":"#_3-使用标准的require-和check-函数","children":[]},{"level":2,"title":"4. 使用takeIf() ?: throw …","slug":"_4-使用takeif-throw","link":"#_4-使用takeif-throw","children":[]},{"level":2,"title":"5. throwIf()函数","slug":"_5-throwif-函数","link":"#_5-throwif-函数","children":[]},{"level":2,"title":"6. mustHave()函数","slug":"_6-musthave-函数","link":"#_6-musthave-函数","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719611612000,"updatedTime":1719611612000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.53,"words":1960},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Conditional Exception Throwing in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>异常处理是软件开发中不可或缺的一部分。</p>\\n<p>在本教程中，我们将深入探讨Kotlin中条件性异常抛出的习惯用法，Kotlin是一种现代且简洁的编程语言。</p>\\n<h2>2. 理解条件性抛出</h2>\\n<p>条件性抛出是指基于特定条件抛出异常的做法：</p>\\n<div class=\\"language-kotlin\\" data-ext=\\"kt\\" data-title=\\"kt\\"><pre class=\\"language-kotlin\\"><code><span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>condition<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">throw</span> <span class=\\"token function\\">SomeException</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">..</span><span class=\\"token punctuation\\">.</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
