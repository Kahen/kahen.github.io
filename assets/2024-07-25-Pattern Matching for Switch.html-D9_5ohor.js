import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DpYLEM_u.js";const p={},e=t(`<hr><h1 id="java-se-17-中的-switch-模式匹配" tabindex="-1"><a class="header-anchor" href="#java-se-17-中的-switch-模式匹配"><span>Java SE 17 中的 switch 模式匹配</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Java SE 17 版本引入了 switch 表达式和语句的模式匹配（JEP 406）作为预览特性。模式匹配<strong>为我们在定义 switch 案例的条件时提供了更多的灵活性</strong>。</p><p>除了现在的案例标签可以包含模式外，选择表达式也不再仅限于几种类型。在模式匹配之前，switch 案例仅支持对选择表达式进行简单的测试，需要完全匹配一个常量值。</p><p>在本教程中，我们将涵盖三种不同的模式类型，这些模式可以应用于 switch 语句。我们还将探索一些 switch 的特定情况，比如覆盖所有值、排序子类和处理 null 值。</p><h2 id="_2-switch-语句" tabindex="-1"><a class="header-anchor" href="#_2-switch-语句"><span>2. Switch 语句</span></a></h2><p>我们使用 Java 中的 switch 来将控制转移到几个预定义的案例语句之一。哪个语句被选中取决于 switch 选择表达式的值。</p><p>在 Java 的早期版本中，<strong>选择表达式必须是数字、字符串或常量</strong>。此外，案例标签只能包含常量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">String</span> b <span class="token operator">=</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">switch</span> <span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&quot;A&quot;</span> <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Parameter is A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> b <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Parameter is b&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Parameter is unknown&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的示例中，如果变量 b 不是 final，编译器会抛出一个常量表达式所需的错误。</p><p>模式匹配通常最早在 Java SE 14 中作为预览特性引入。</p><p>它仅限于一种模式——类型模式。一个典型的模式由类型名称和绑定结果的变量组成。</p><p><strong>将类型模式应用于 instanceof 运算符简化了类型检查和强制转换</strong>。此外，它使我们能够将两者合并为一个表达式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token keyword">instanceof</span> <span class="token class-name">String</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Object is a string %s&quot;</span><span class="token punctuation">,</span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token keyword">instanceof</span> <span class="token class-name">Number</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Object is a number %n&quot;</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种内置的语言增强帮助我们用更少的代码编写具有增强可读性的代码。</p><h2 id="_4-switch-的模式" tabindex="-1"><a class="header-anchor" href="#_4-switch-的模式"><span>4. Switch 的模式</span></a></h2><p>instanceof 的模式匹配在 Java SE 16 中成为永久特性。</p><p><strong>在 Java 17 中，模式匹配的应用现在也扩展到了 switch 表达式</strong>。</p><p>然而，它仍然是一个预览特性，所以我们需要启用预览才能使用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>java <span class="token operator">--</span>enable<span class="token operator">-</span>preview <span class="token operator">--</span>source <span class="token number">17</span> <span class="token class-name">PatternMatching</span><span class="token punctuation">.</span>java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-1-类型模式" tabindex="-1"><a class="header-anchor" href="#_4-1-类型模式"><span>4.1. 类型模式</span></a></h3><p>让我们看看类型模式和 instanceof 运算符如何在 switch 语句中应用。</p><p>作为一个示例，我们将创建一个方法，使用 if-else 语句将不同类型的对象转换为 double。我们的方法将简单地返回零，如果类型不受支持：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token function">getDoubleUsingIf</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> result<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token keyword">instanceof</span> <span class="token class-name">Integer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">)</span> o<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">doubleValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token keyword">instanceof</span> <span class="token class-name">Float</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Float</span><span class="token punctuation">)</span> o<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">doubleValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token keyword">instanceof</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result <span class="token operator">=</span> <span class="token class-name">Double</span><span class="token punctuation">.</span><span class="token function">parseDouble</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> o<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        result <span class="token operator">=</span> <span class="token number">0d</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用 switch 中的类型模式以更少的代码解决同样的问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token function">getDoubleUsingSwitch</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token class-name">Integer</span> i <span class="token operator">-&gt;</span> i<span class="token punctuation">.</span><span class="token function">doubleValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token class-name">Float</span> f <span class="token operator">-&gt;</span> f<span class="token punctuation">.</span><span class="token function">doubleValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token class-name">String</span> s <span class="token operator">-&gt;</span> <span class="token class-name">Double</span><span class="token punctuation">.</span><span class="token function">parseDouble</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token number">0d</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Java 的早期版本中，选择表达式仅限于几种类型。然而，有了类型模式，<strong>switch 选择表达式可以是任何类型</strong>。</p><h3 id="_4-2-受保护的模式" tabindex="-1"><a class="header-anchor" href="#_4-2-受保护的模式"><span>4.2. 受保护的模式</span></a></h3><p>类型模式帮助我们根据特定类型转移控制。然而，有时我们还需要<strong>对传递的值执行额外的检查</strong>。</p><p>例如，我们可以使用 if 语句来检查 String 的长度：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token function">getDoubleValueUsingIf</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token class-name">String</span> s <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">yield</span> <span class="token class-name">Double</span><span class="token punctuation">.</span><span class="token function">parseDouble</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token keyword">yield</span> <span class="token number">0d</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token number">0d</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用受保护的模式来解决同样的问题。它们使用模式和布尔表达式的组合：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token function">getDoubleValueUsingGuardedPatterns</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token class-name">String</span> s <span class="token operator">&amp;&amp;</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">-&gt;</span> <span class="token class-name">Double</span><span class="token punctuation">.</span><span class="token function">parseDouble</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token number">0d</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>受保护的模式使我们能够避免在 switch 语句中添加额外的 if 条件。相反，我们可以</strong> <strong>将我们的条件逻辑移动到案例标签</strong>。</p><h3 id="_4-3-括号模式" tabindex="-1"><a class="header-anchor" href="#_4-3-括号模式"><span>4.3. 括号模式</span></a></h3><p>除了在案例标签中具有条件逻辑外，<strong>括号模式使我们能够对它们进行分组</strong>。</p><p>我们可以在执行额外检查时简单地使用括号在我们的布尔表达式中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token function">getDoubleValueUsingParenthesizedPatterns</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token class-name">String</span> s <span class="token operator">&amp;&amp;</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;#&quot;</span><span class="token punctuation">)</span> <span class="token operator">||</span> s<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;@&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Double</span><span class="token punctuation">.</span><span class="token function">parseDouble</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token number">0d</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过使用括号，我们可以避免有额外的 if-else 语句。</p><h2 id="_5-switch-特定情况" tabindex="-1"><a class="header-anchor" href="#_5-switch-特定情况"><span>5. Switch 特定情况</span></a></h2><p>让我们现在看看在使用 switch 模式匹配时需要考虑的几个特定情况。</p><h3 id="_5-1-覆盖所有值" tabindex="-1"><a class="header-anchor" href="#_5-1-覆盖所有值"><span>5.1. 覆盖所有值</span></a></h3><p>在使用 switch 中的模式匹配时，Java <strong>编译器会检查类型覆盖</strong>。</p><p>让我们考虑一个接受任何对象但只覆盖 String 案例的示例 switch 条件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token function">getDoubleUsingSwitch</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token class-name">String</span> s <span class="token operator">-&gt;</span> <span class="token class-name">Double</span><span class="token punctuation">.</span><span class="token function">parseDouble</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的示例将导致以下编译错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">[</span><span class="token constant">ERROR</span><span class="token punctuation">]</span> <span class="token class-name">Failed</span> <span class="token keyword">to</span> <span class="token namespace">execute</span> goal <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> on project core<span class="token operator">-</span>java<span class="token operator">-</span><span class="token number">17</span><span class="token operator">:</span> <span class="token class-name">Compilation</span> failure
<span class="token punctuation">[</span><span class="token constant">ERROR</span><span class="token punctuation">]</span> <span class="token operator">/</span><span class="token class-name">D</span><span class="token operator">:</span><span class="token operator">/</span><span class="token class-name">Projects</span><span class="token operator">/</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>/<span class="token class-name">HandlingNullValuesUnitTest</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">16</span><span class="token punctuation">]</span> the <span class="token keyword">switch</span> expression does not cover all possible input values
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为 <strong>switch 案例标签需要包括选择表达式的类型</strong>。</p><p>默认案例标签也可以应用于选择表达式的特定类型。</p><h3 id="_5-2-排序子类" tabindex="-1"><a class="header-anchor" href="#_5-2-排序子类"><span>5.2. 排序子类</span></a></h3><p>在使用 switch 中的子类进行模式匹配时，<strong>案例的顺序很重要</strong>。</p><p>让我们考虑一个示例，其中 String 案例在 CharSequence 案例之后：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token function">getDoubleUsingSwitch</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token class-name">CharSequence</span> c <span class="token operator">-&gt;</span> <span class="token class-name">Double</span><span class="token punctuation">.</span><span class="token function">parseDouble</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token class-name">String</span> s <span class="token operator">-&gt;</span> <span class="token class-name">Double</span><span class="token punctuation">.</span><span class="token function">parseDouble</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token number">0d</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于 String 是 CharSequence 的子类，我们的示例将导致以下编译错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">[</span><span class="token constant">ERROR</span><span class="token punctuation">]</span> <span class="token class-name">Failed</span> <span class="token keyword">to</span> <span class="token namespace">execute</span> goal <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> on project core<span class="token operator">-</span>java<span class="token operator">-</span><span class="token number">17</span><span class="token operator">:</span> <span class="token class-name">Compilation</span> failure
<span class="token punctuation">[</span><span class="token constant">ERROR</span><span class="token punctuation">]</span> <span class="token operator">/</span><span class="token class-name">D</span><span class="token operator">:</span><span class="token operator">/</span><span class="token class-name">Projects</span><span class="token operator">/</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>/<span class="token class-name">HandlingNullValuesUnitTest</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">]</span> <span class="token keyword">this</span> <span class="token keyword">case</span> label is dominated by a preceding <span class="token keyword">case</span> label
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>错误的原因是因为 <strong>执行没有任何机会进入第二个案例</strong>，因为任何传递给方法的字符串对象都会在第一个案例中处理。</p><h3 id="_5-3-处理-null-值" tabindex="-1"><a class="header-anchor" href="#_5-3-处理-null-值"><span>5.3. 处理 Null 值</span></a></h3><p>在 Java 的早期版本中，将 null 值传递给 switch 语句会导致 NullPointerException。</p><p>然而，有了类型模式，现在可以<strong>将 null 检查作为单独的案例标签应用</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token function">getDoubleUsingSwitch</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token class-name">String</span> s <span class="token operator">-&gt;</span> <span class="token class-name">Double</span><span class="token punctuation">.</span><span class="token function">parseDouble</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token keyword">null</span> <span class="token operator">-&gt;</span> <span class="token number">0d</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token number">0d</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果没有特定的 null 案例标签，<strong>总类型模式将匹配 null 值</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token function">getDoubleUsingSwitchTotalType</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token class-name">String</span> s <span class="token operator">-&gt;</span> <span class="token class-name">Double</span><span class="token punctuation">.</span><span class="token function">parseDouble</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token class-name">Object</span> ob <span class="token operator">-&gt;</span> <span class="token number">0d</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意，switch 表达式不能同时具有 null 案例和总类型案例。</p><p>这样的 switch 语句将导致以下编译错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">[</span><span class="token constant">ERROR</span><span class="token punctuation">]</span> <span class="token class-name">Failed</span> <span class="token keyword">to</span> <span class="token namespace">execute</span> goal <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> on project core<span class="token operator">-</span>java<span class="token operator">-</span><span class="token number">17</span><span class="token operator">:</span> <span class="token class-name">Compilation</span> failure
<span class="token punctuation">[</span><span class="token constant">ERROR</span><span class="token punctuation">]</span> <span class="token operator">/</span><span class="token class-name">D</span><span class="token operator">:</span><span class="token operator">/</span><span class="token class-name">Projects</span><span class="token operator">/</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>/<span class="token class-name">HandlingNullValuesUnitTest</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token punctuation">[</span><span class="token number">14</span><span class="token punctuation">,</span><span class="token number">13</span><span class="token punctuation">]</span> <span class="token keyword">switch</span> has both a total pattern and a <span class="token keyword">default</span> label
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，使用模式匹配的 switch 语句仍然可以抛出 NullPointerException。</p><p>然而，它只有在 switch 块没有 null 匹配案例标签时才会这样做。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，<strong>我们探索了 Java SE 17 中的 switch 表达式和语句的模式匹配</strong>，这是一个预览特性。我们看到了通过在案例标签中使用模式，选择是通过模式匹配而不是简单的相等检查来确定的。</p><p>在示例中，我们涵盖了三种不同的模式类型，这些模式可以应用于 switch 语句。最后，我们探索了几个特定情况，包括覆盖所有值、排序子类和处理 null 值。</p><p>如常，完整的源代码</p>`,72),o=[e];function c(l,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-25-Pattern Matching for Switch.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-25/2024-07-25-Pattern%20Matching%20for%20Switch.html","title":"Java SE 17 中的 switch 模式匹配","lang":"zh-CN","frontmatter":{"date":"2024-07-25T00:00:00.000Z","category":["Java","Programming"],"tag":["Java SE 17","Pattern Matching","Switch"],"head":[["meta",{"name":"keywords","content":"Java, Pattern Matching, Switch, Java SE 17"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-25/2024-07-25-Pattern%20Matching%20for%20Switch.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java SE 17 中的 switch 模式匹配"}],["meta",{"property":"og:description","content":"Java SE 17 中的 switch 模式匹配 1. 概述 Java SE 17 版本引入了 switch 表达式和语句的模式匹配（JEP 406）作为预览特性。模式匹配为我们在定义 switch 案例的条件时提供了更多的灵活性。 除了现在的案例标签可以包含模式外，选择表达式也不再仅限于几种类型。在模式匹配之前，switch 案例仅支持对选择表达式..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-25T05:53:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java SE 17"}],["meta",{"property":"article:tag","content":"Pattern Matching"}],["meta",{"property":"article:tag","content":"Switch"}],["meta",{"property":"article:published_time","content":"2024-07-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-25T05:53:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java SE 17 中的 switch 模式匹配\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-25T05:53:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java SE 17 中的 switch 模式匹配 1. 概述 Java SE 17 版本引入了 switch 表达式和语句的模式匹配（JEP 406）作为预览特性。模式匹配为我们在定义 switch 案例的条件时提供了更多的灵活性。 除了现在的案例标签可以包含模式外，选择表达式也不再仅限于几种类型。在模式匹配之前，switch 案例仅支持对选择表达式..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Switch 语句","slug":"_2-switch-语句","link":"#_2-switch-语句","children":[]},{"level":2,"title":"4. Switch 的模式","slug":"_4-switch-的模式","link":"#_4-switch-的模式","children":[{"level":3,"title":"4.1. 类型模式","slug":"_4-1-类型模式","link":"#_4-1-类型模式","children":[]},{"level":3,"title":"4.2. 受保护的模式","slug":"_4-2-受保护的模式","link":"#_4-2-受保护的模式","children":[]},{"level":3,"title":"4.3. 括号模式","slug":"_4-3-括号模式","link":"#_4-3-括号模式","children":[]}]},{"level":2,"title":"5. Switch 特定情况","slug":"_5-switch-特定情况","link":"#_5-switch-特定情况","children":[{"level":3,"title":"5.1. 覆盖所有值","slug":"_5-1-覆盖所有值","link":"#_5-1-覆盖所有值","children":[]},{"level":3,"title":"5.2. 排序子类","slug":"_5-2-排序子类","link":"#_5-2-排序子类","children":[]},{"level":3,"title":"5.3. 处理 Null 值","slug":"_5-3-处理-null-值","link":"#_5-3-处理-null-值","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721886839000,"updatedTime":1721886839000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.08,"words":1825},"filePathRelative":"posts/baeldung/2024-07-25/2024-07-25-Pattern Matching for Switch.md","localizedDate":"2024年7月25日","excerpt":"<hr>\\n<h1>Java SE 17 中的 switch 模式匹配</h1>\\n<h2>1. 概述</h2>\\n<p>Java SE 17 版本引入了 switch 表达式和语句的模式匹配（JEP 406）作为预览特性。模式匹配<strong>为我们在定义 switch 案例的条件时提供了更多的灵活性</strong>。</p>\\n<p>除了现在的案例标签可以包含模式外，选择表达式也不再仅限于几种类型。在模式匹配之前，switch 案例仅支持对选择表达式进行简单的测试，需要完全匹配一个常量值。</p>\\n<p>在本教程中，我们将涵盖三种不同的模式类型，这些模式可以应用于 switch 语句。我们还将探索一些 switch 的特定情况，比如覆盖所有值、排序子类和处理 null 值。</p>","autoDesc":true}');export{k as comp,d as data};
