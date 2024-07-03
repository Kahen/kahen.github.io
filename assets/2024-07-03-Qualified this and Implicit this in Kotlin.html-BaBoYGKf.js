import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DlW52zYa.js";const e={},p=t(`<h1 id="kotlin-中的显式-this-和隐式-this" tabindex="-1"><a class="header-anchor" href="#kotlin-中的显式-this-和隐式-this"><span>Kotlin 中的显式 this 和隐式 this</span></a></h1><p>在 Kotlin 中，我们已经知道关键字 <em>this</em> 指的是我们正在操作的当前对象。</p><p>在本文中，我们将讨论与 <em>this</em> 使用相关的两个概念，即隐式 <em>this</em> 和显式 <em>this</em>。</p><h2 id="_2-接收者" tabindex="-1"><a class="header-anchor" href="#_2-接收者"><span>2. 接收者</span></a></h2><p>this 的接收者是使用 <em>this</em> 时的上下文对象。当我们在 Kotlin 中的函数或方法中使用 <em>this</em> 时，我们指的是对象本身或接收动作的对象：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> Outer <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">checkThis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">val</span> b <span class="token operator">=</span> <span class="token keyword">this</span>
        <span class="token comment">// 其他代码...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个上下文中，this 将引用 Outer 类的一个实例。</p><p>如果我们使用像 IntelliJ IDEA 这样的 IDE，那么我们可以通过快速导航到符号声明来轻松找到 this 的接收者。</p><h3 id="_3-1-访问当前类实例" tabindex="-1"><a class="header-anchor" href="#_3-1-访问当前类实例"><span>3.1. 访问当前类实例</span></a></h3><p>隐式 this 的最简单用例是我们访问当前实例：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> Outer <span class="token punctuation">{</span>
    <span class="token keyword">val</span> a <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token comment">// ...</span>
    <span class="token keyword">fun</span> <span class="token function">checkThis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">val</span> b <span class="token operator">=</span> <span class="token keyword">this</span>
        <span class="token comment">// ...</span>
        <span class="token keyword">fun</span> <span class="token function">checkThisToo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">val</span> c <span class="token operator">=</span> <span class="token keyword">this</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用 this 来引用 Outer 类本身的实例。我们还可以看到，嵌套函数不会影响隐式 this 的接收者。</p><h3 id="_3-2-访问当前类的成员对象" tabindex="-1"><a class="header-anchor" href="#_3-2-访问当前类的成员对象"><span>3.2. 访问当前类的成员对象</span></a></h3><p>让我们也看看使用 this 来访问类成员：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> Outer <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">printLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;成员函数&quot;</span></span>
    <span class="token keyword">val</span> x <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token comment">// ...</span>
    <span class="token keyword">fun</span> <span class="token function">checkThis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
        <span class="token comment">// ...</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;成员函数&quot;</span></span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">printLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;成员函数&quot;</span></span><span class="token punctuation">,</span> <span class="token function">printLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们在 this 上调用成员对象或函数时，我们可以跳过 this 部分。</p><p>但是，如果我们有一个同名的非成员对象或函数，请谨慎使用 this，因为在某些情况下，它可能会被调用代替：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> x <span class="token operator">=</span> <span class="token number">5</span>
<span class="token keyword">fun</span> <span class="token function">printLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;顶级函数&quot;</span></span>
<span class="token comment">// ...</span>
<span class="token keyword">class</span> Outer <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">printLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;成员函数&quot;</span></span>
    <span class="token keyword">val</span> x <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token comment">// ...</span>
    <span class="token keyword">fun</span> <span class="token function">checkThis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
        <span class="token comment">// ...</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;成员函数&quot;</span></span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">printLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;顶级函数&quot;</span></span><span class="token punctuation">,</span> <span class="token function">printLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-在扩展函数内部" tabindex="-1"><a class="header-anchor" href="#_3-3-在扩展函数内部"><span>3.3. 在扩展函数内部</span></a></h3><p>扩展函数将影响其中包含的 this 的行为。</p><p>在 Kotlin 中的扩展函数中的 this 接收者指的是扩展的接收者对象：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> Outer <span class="token punctuation">{</span>
    <span class="token keyword">inner</span> <span class="token keyword">class</span> Inner <span class="token punctuation">{</span>
        <span class="token keyword">fun</span> Int<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// ...</span>
            <span class="token keyword">val</span> y <span class="token operator">=</span> <span class="token keyword">this</span>
            <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
            <span class="token comment">// ...</span>
            <span class="token keyword">val</span> funLit <span class="token operator">=</span> <span class="token keyword">fun</span> String<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// ...</span>
                <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;test.funLit()&quot;</span></span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// ...</span>
            <span class="token keyword">val</span> increase <span class="token operator">=</span> <span class="token keyword">fun</span><span class="token punctuation">(</span>x<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token operator">:</span> Int <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">this</span> <span class="token operator">+</span> x
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-在-lambda-表达式内部" tabindex="-1"><a class="header-anchor" href="#_3-4-在-lambda-表达式内部"><span>3.4. 在 Lambda 表达式内部</span></a></h3><p>如果 lambda 表达式中使用了 this，则接收者是当前上下文，可能是：</p><ul><li><strong>类</strong>：如果 lambda 在类内定义，隐式 this 引用该类的实例。</li><li><strong>对象</strong>：如果 lambda 在对象内定义，隐式 this 引用该对象。</li><li><strong>扩展函数</strong>：如果 lambda 在扩展函数内定义，隐式 this 引用函数的作用域。</li></ul><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> Outer <span class="token punctuation">{</span>
    <span class="token keyword">inner</span> <span class="token keyword">class</span> Inner <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
        <span class="token keyword">fun</span> <span class="token function">checkInner</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">val</span> funInnerLambda <span class="token operator">=</span> <span class="token punctuation">{</span> _<span class="token operator">:</span> String <span class="token operator">-&gt;</span>
                <span class="token keyword">val</span> r <span class="token operator">=</span> <span class="token keyword">this</span>
                <span class="token function">assertEquals</span><span class="token punctuation">(</span>Inner<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">.</span>name<span class="token punctuation">,</span> r<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// ...</span>
            <span class="token function">funInnerLambda</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;test inner lambda&quot;</span></span><span class="token punctuation">)</span>

            <span class="token keyword">val</span> someNumber <span class="token operator">=</span> <span class="token number">10</span>
            someNumber<span class="token punctuation">.</span><span class="token function">run</span> <span class="token punctuation">{</span>
                <span class="token keyword">val</span> numberLambda <span class="token operator">=</span> <span class="token punctuation">{</span> _<span class="token operator">:</span> String <span class="token operator">-&gt;</span>
                    <span class="token function">assertEquals</span><span class="token punctuation">(</span>someNumber<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
                <span class="token function">numberLambda</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;numberLambda&quot;</span></span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">val</span> someObject <span class="token operator">=</span> <span class="token keyword">object</span> <span class="token punctuation">{</span>
                <span class="token keyword">val</span> name <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;John&quot;</span></span>
                <span class="token keyword">val</span> age <span class="token operator">=</span> <span class="token number">30</span>
            <span class="token punctuation">}</span>

            someObject<span class="token punctuation">.</span><span class="token function">run</span> <span class="token punctuation">{</span>
                <span class="token comment">// ...</span>
                <span class="token function">assertEquals</span><span class="token punctuation">(</span>someObject<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
                <span class="token comment">// ...</span>
                <span class="token keyword">val</span> someLambda <span class="token operator">=</span> <span class="token punctuation">{</span> _<span class="token operator">:</span> String <span class="token operator">-&gt;</span>
                    <span class="token function">assertEquals</span><span class="token punctuation">(</span>someObject<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
                    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token punctuation">)</span>
                    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;John&quot;</span></span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>

                <span class="token function">someLambda</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;someLambda&quot;</span></span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <em>checkInner()</em> 函数内的 lambda 表达式中的第一个 this 将指向 Inner 类的实例。</p><p>下面，在 someNumber 对象的 lambda 中的 this 引用 someNumber。同样，在 someObject 对象的 lambda 中的 this 引用 someObject。</p><p>同时，在 foo() 扩展函数的 lambda 表达式中的 this 将引用被扩展的 Int 对象。</p><h2 id="_4-显式-this" tabindex="-1"><a class="header-anchor" href="#_4-显式-this"><span>4. 显式 this</span></a></h2><p>在 Kotlin 中，显式 this 指的是使用关键字 <em>“this@”</em> 来标记上下文 <em>“this”</em> 的限定。</p><p>通过使用显式 this，我们可以明确指出我们想要访问类本身的属性或方法，而不是来自可能有相同名称的局部变量或其他类。</p><h3 id="_4-1-访问特定类" tabindex="-1"><a class="header-anchor" href="#_4-1-访问特定类"><span>4.1. 访问特定类</span></a></h3><p>通过使用 <em>this@ClassName</em>，我们明确指出我们想要访问特定 <em>ClassName</em> 类的上下文：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> Outer <span class="token punctuation">{</span>
    <span class="token keyword">inner</span> <span class="token keyword">class</span> Inner <span class="token punctuation">{</span>
        <span class="token keyword">fun</span> Int<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// ...</span>
            <span class="token function">assertEquals</span><span class="token punctuation">(</span>Inner<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token label symbol">@Inner</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
            <span class="token function">assertEquals</span><span class="token punctuation">(</span>Outer<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token label symbol">@Outer</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
            <span class="token comment">// ...</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-访问特定类的成员" tabindex="-1"><a class="header-anchor" href="#_4-2-访问特定类的成员"><span>4.2. 访问特定类的成员</span></a></h3><p>通过使用 <em>this@Outer</em>，我们可以在内部类中明确引用外部类的上下文来访问其成员：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> Outer <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> Int <span class="token operator">=</span> <span class="token number">30</span>
    <span class="token keyword">val</span> x <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token comment">// ...</span>
    <span class="token keyword">inner</span> <span class="token keyword">class</span> Inner <span class="token punctuation">{</span>
        <span class="token keyword">val</span> x <span class="token operator">=</span> <span class="token number">1</span>
        <span class="token comment">// ...</span>
        <span class="token keyword">fun</span> Int<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// ...</span>
            <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token label symbol">@Inner</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span>
            <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token label symbol">@Outer</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span>
            <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token label symbol">@Outer</span><span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token comment">// ...</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-访问特定的扩展函数" tabindex="-1"><a class="header-anchor" href="#_4-3-访问特定的扩展函数"><span>4.3. 访问特定的扩展函数</span></a></h3><p>我们也可以访问特定的扩展函数与显式 this：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> Outer <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token keyword">inner</span> <span class="token keyword">class</span> Inner <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
        <span class="token keyword">fun</span> Int<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// ...</span>
            <span class="token keyword">fun</span> Int<span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// ...</span>
                <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
                <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token label symbol">@foo</span><span class="token punctuation">)</span>
                <span class="token comment">// ...</span>
                <span class="token keyword">fun</span> Int<span class="token punctuation">.</span><span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token comment">// ...</span>
                    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
                    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token label symbol">@foo</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
                <span class="token number">20</span><span class="token punctuation">.</span><span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token number">32</span><span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于扩展函数会影响 this，为了访问特定的上下文，我们必须使用显式 this。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了 this 关键字在各种案例中的行为方式。我们还了解了显式 this 的使用。</p><p>当对 this 的含义毫无疑问，并且它清楚地指向当前函数或类实例的所有者时，<strong>使用隐式 this</strong>。</p><p>同时，<strong>使用显式 this 来避免与参数或其他名为 this 的变量的歧义</strong>，或者明确访问特定的类实例，特别是内部类或 lambda 表达式。</p><p>如常，代码示例可以在 GitHub 上找到。</p>`,47),o=[p];function i(l,c){return a(),s("div",null,o)}const r=n(e,[["render",i],["__file","2024-07-03-Qualified this and Implicit this in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Qualified%20this%20and%20Implicit%20this%20in%20Kotlin.html","title":"Kotlin 中的显式 this 和隐式 this","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","this 关键字"],"tag":["Kotlin","this"],"head":[["meta",{"name":"keywords","content":"Kotlin, this 关键字, 显式 this, 隐式 this"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Qualified%20this%20and%20Implicit%20this%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin 中的显式 this 和隐式 this"}],["meta",{"property":"og:description","content":"Kotlin 中的显式 this 和隐式 this 在 Kotlin 中，我们已经知道关键字 this 指的是我们正在操作的当前对象。 在本文中，我们将讨论与 this 使用相关的两个概念，即隐式 this 和显式 this。 2. 接收者 this 的接收者是使用 this 时的上下文对象。当我们在 Kotlin 中的函数或方法中使用 this 时，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T02:45:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"this"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T02:45:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin 中的显式 this 和隐式 this\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T02:45:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin 中的显式 this 和隐式 this 在 Kotlin 中，我们已经知道关键字 this 指的是我们正在操作的当前对象。 在本文中，我们将讨论与 this 使用相关的两个概念，即隐式 this 和显式 this。 2. 接收者 this 的接收者是使用 this 时的上下文对象。当我们在 Kotlin 中的函数或方法中使用 this 时，..."},"headers":[{"level":2,"title":"2. 接收者","slug":"_2-接收者","link":"#_2-接收者","children":[{"level":3,"title":"3.1. 访问当前类实例","slug":"_3-1-访问当前类实例","link":"#_3-1-访问当前类实例","children":[]},{"level":3,"title":"3.2. 访问当前类的成员对象","slug":"_3-2-访问当前类的成员对象","link":"#_3-2-访问当前类的成员对象","children":[]},{"level":3,"title":"3.3. 在扩展函数内部","slug":"_3-3-在扩展函数内部","link":"#_3-3-在扩展函数内部","children":[]},{"level":3,"title":"3.4. 在 Lambda 表达式内部","slug":"_3-4-在-lambda-表达式内部","link":"#_3-4-在-lambda-表达式内部","children":[]}]},{"level":2,"title":"4. 显式 this","slug":"_4-显式-this","link":"#_4-显式-this","children":[{"level":3,"title":"4.1. 访问特定类","slug":"_4-1-访问特定类","link":"#_4-1-访问特定类","children":[]},{"level":3,"title":"4.2. 访问特定类的成员","slug":"_4-2-访问特定类的成员","link":"#_4-2-访问特定类的成员","children":[]},{"level":3,"title":"4.3. 访问特定的扩展函数","slug":"_4-3-访问特定的扩展函数","link":"#_4-3-访问特定的扩展函数","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719974708000,"updatedTime":1719974708000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.21,"words":1262},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Qualified this and Implicit this in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>在 Kotlin 中，我们已经知道关键字 <em>this</em> 指的是我们正在操作的当前对象。</p>\\n<p>在本文中，我们将讨论与 <em>this</em> 使用相关的两个概念，即隐式 <em>this</em> 和显式 <em>this</em>。</p>\\n<h2>2. 接收者</h2>\\n<p>this 的接收者是使用 <em>this</em> 时的上下文对象。当我们在 Kotlin 中的函数或方法中使用 <em>this</em> 时，我们指的是对象本身或接收动作的对象：</p>\\n<div class=\\"language-kotlin\\" data-ext=\\"kt\\" data-title=\\"kt\\"><pre class=\\"language-kotlin\\"><code><span class=\\"token keyword\\">class</span> Outer <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">fun</span> <span class=\\"token function\\">checkThis</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">val</span> b <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">this</span>\\n        <span class=\\"token comment\\">// 其他代码...</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
