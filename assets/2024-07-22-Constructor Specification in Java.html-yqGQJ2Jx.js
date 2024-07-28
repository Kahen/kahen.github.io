import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-D4B8YWfq.js";const t={},p=e(`<h1 id="java中的构造器规范-baeldung" tabindex="-1"><a class="header-anchor" href="#java中的构造器规范-baeldung"><span>Java中的构造器规范 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将学习Java如何处理构造器，并从Java语言规范中回顾一些与之相关的规则。</p><h2 id="_2-构造器声明" tabindex="-1"><a class="header-anchor" href="#_2-构造器声明"><span>2. 构造器声明</span></a></h2><p>在Java中，每个类都必须有一个构造器。它的结构看起来类似于一个方法，但它有不同的目的。</p><p>让我们看看构造器的规范：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>\`<span class="token operator">&lt;</span>构造器修饰符<span class="token operator">&gt;</span>\` \`<span class="token operator">&lt;</span>构造器声明器<span class="token operator">&gt;</span>\` <span class="token punctuation">[</span>抛出子句<span class="token punctuation">]</span> \`<span class="token operator">&lt;</span>构造器体<span class="token operator">&gt;</span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们分别看看每个部分。</p><h3 id="_2-1-构造器修饰符" tabindex="-1"><a class="header-anchor" href="#_2-1-构造器修饰符"><span>2.1. 构造器修饰符</span></a></h3><p>构造器声明以访问修饰符开始：它们可以是_public_、<em>private</em>、_protected_或包访问，基于其他访问修饰符。</p><p><strong>为了防止编译错误，构造器声明不能有多个_private_、_protected_或_public_访问修饰符。</strong></p><p>与方法不同，构造器不能是_abstract_、<em>static</em>、<em>final</em>、<em>native_或_synchronized</em>：</p><ul><li>没有必要声明构造器为_final_，因为它们不是类成员，它们不继承。</li><li>抽象是不必要的，因为我们必须实现构造器。</li><li>静态构造器不是必需的，因为每个构造器都是用对象调用的。</li><li>正在构造的对象不应该被_synchronized_，因为这样会在对象正在构造时锁定对象，这通常不会在所有构造器完成工作之前提供给其他线程。</li><li>Java中没有_native_构造器，因为这是一种语言设计决定，旨在确保在对象创建期间始终调用超类构造器。</li></ul><h3 id="_2-2-构造器声明器" tabindex="-1"><a class="header-anchor" href="#_2-2-构造器声明器"><span>2.2. 构造器声明器</span></a></h3><p>让我们检查构造器声明器的语法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>构造器名称（参数列表）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>构造器声明器中的构造器名称必须与包含构造器声明的类的名称匹配，否则会发生编译时错误。</p><h3 id="_2-3-抛出子句" tabindex="-1"><a class="header-anchor" href="#_2-3-抛出子句"><span>2.3. 抛出子句</span></a></h3><p>方法和构造器的_throws_子句的结构和行为都是相同的。</p><h3 id="_2-4-构造器体" tabindex="-1"><a class="header-anchor" href="#_2-4-构造器体"><span>2.4. 构造器体</span></a></h3><p>构造器体的语法是：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>构造器体：<span class="token punctuation">{</span> <span class="token punctuation">[</span>显式构造器调用<span class="token punctuation">]</span> <span class="token punctuation">[</span>块语句<span class="token punctuation">]</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以显式地调用同一类中的另一个构造器，或者调用直接超类的构造器，作为构造器体中的第一个命令。不允许直接或间接调用同一个构造器。</p><h2 id="_3-显式构造器调用" tabindex="-1"><a class="header-anchor" href="#_3-显式构造器调用"><span>3. 显式构造器调用</span></a></h2><p>我们可以将构造器的调用分为两种类型：</p><ul><li>替代构造器调用以关键字_this_开头。它们用于调用同一类的替代构造器。</li><li>超类构造器调用以关键字_super_开头。</li></ul><p>让我们看一个例子，展示如何使用_this_和_super_关键字调用另一个构造器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token string">&quot;Arash&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">//显式构造器调用</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，_Employee_的第一个构造器调用其超类_Person_的构造器，并传递id：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> id<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token keyword">extends</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-构造器调用规则" tabindex="-1"><a class="header-anchor" href="#_4-构造器调用规则"><span>4. 构造器调用规则</span></a></h2><h3 id="_4-1-this-或-super-必须是构造器中的第一个语句" tabindex="-1"><a class="header-anchor" href="#_4-1-this-或-super-必须是构造器中的第一个语句"><span>4.1. _this_或_super_必须是构造器中的第一个语句</span></a></h3><p>每当我们调用一个构造器时，它必须调用其基类的构造器。此外，你可以在类中调用另一个构造器。<strong>Java通过使构造器中的第一个调用是_this_或_super_来强制执行这个规则。</strong></p><p>让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token keyword">extends</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个构造器编译的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">.</span><span class="token keyword">class</span> <span class="token class-name">Employee</span>
<span class="token punctuation">.</span><span class="token keyword">super</span> <span class="token class-name">Person</span>
<span class="token punctuation">;</span> 一个不接受参数的构造器
<span class="token punctuation">.</span>method \`\`\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span>init<span class="token punctuation">&gt;</span></span>\`\`\`\`\`\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token class-name">V</span>
aload_0
invokespecial <span class="token class-name">Person</span><span class="token operator">/</span>\`\`\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span>init<span class="token punctuation">&gt;</span></span>\`\`\`\`\`\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token class-name">V</span>
<span class="token keyword">return</span>
<span class="token punctuation">.</span>end method
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构造器编译类似于编译任何其他方法，只是生成的方法名称为_<code>&lt;init&gt;</code><em>。验证</em><code>&lt;init&gt;</code>_方法的一个要求是，调用超类构造器（或当前类中的另一个构造器）必须是方法中的第一步。</p><p>正如我们上面看到的，<em>Person_类必须调用其超类构造器，依此类推，直到_java.lang.Object</em>。</p><p><strong>当类必须调用其超类构造器时，它确保它们永远不会在适当的初始化之前被使用。JVM的安全性取决于此，因为一些方法在类被初始化之前不会工作。</strong></p><h3 id="_4-2-不要在构造器中同时使用-this-和-super" tabindex="-1"><a class="header-anchor" href="#_4-2-不要在构造器中同时使用-this-和-super"><span>4.2. 不要在构造器中同时使用_this_和_super_</span></a></h3><p>想象一下，如果我们可以在构造器体中同时使用_this_和_super_。</p><p>让我们通过一个例子看看会发生什么：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token string">&quot;Arash&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token keyword">extends</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> id<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 语法错误</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们不能执行上述代码，因为<strong>会出现编译时错误</strong>。Java编译器当然有其逻辑解释。</p><p>让我们看看构造器调用序列：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/01/uu-2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><strong>Java编译器不允许编译此程序，因为初始化不明确。</strong></p><h3 id="_4-3-递归构造器调用" tabindex="-1"><a class="header-anchor" href="#_4-3-递归构造器调用"><span>4.3. 递归构造器调用</span></a></h3><p>如果构造器调用自身，编译器会抛出错误。例如，在以下Java代码中，编译器会抛出错误，因为我们试图在构造器内调用同一个构造器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RecursiveConstructorInvocation</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">RecursiveConstructorInvocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管Java编译器有此限制，我们可以通过稍微更改代码来编译程序，但我们会以这种方式遇到堆栈溢出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RecursiveConstructorInvocation</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">RecursiveConstructorInvocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">RecursiveConstructorInvocation</span> rci <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RecursiveConstructorInvocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">RecursiveConstructorInvocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们创建了一个_RecursiveConstructorInvocation_对象，该对象通过调用构造器进行初始化。然后构造器创建了另一个_RecursiveConstructorInvocation_对象，该对象再次通过调用构造器进行初始化，直到堆栈溢出。</strong></p><p>现在，让我们看看输出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Exception</span> in thread <span class="token string">&quot;main&quot;</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>StackOverflowError</span>
    at <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>example<span class="token punctuation">.</span></span>RecursiveConstructorInvocation</span><span class="token punctuation">.</span>\`\`\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span>init<span class="token punctuation">&gt;</span></span>\`\`\`\`\`\`\`<span class="token punctuation">(</span><span class="token class-name">RecursiveConstructorInvocation</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">29</span><span class="token punctuation">)</span>
    at <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>example<span class="token punctuation">.</span></span>RecursiveConstructorInvocation</span><span class="token punctuation">.</span>\`\`\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span>init<span class="token punctuation">&gt;</span></span>\`\`\`\`\`\`\`<span class="token punctuation">(</span><span class="token class-name">RecursiveConstructorInvocation</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">29</span><span class="token punctuation">)</span>
    at <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>example<span class="token punctuation">.</span></span>RecursiveConstructorInvocation</span><span class="token punctuation">.</span>\`\`\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span>init<span class="token punctuation">&gt;</span></span>\`\`\`\`\`\`\`<span class="token punctuation">(</span><span class="token class-name">RecursiveConstructorInvocation</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">29</span><span class="token punctuation">)</span>
<span class="token comment">//...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们讨论了Java中构造器的规范，并回顾了一些规则，以便理解类和超类中构造器的调用。</p><p>如常，代码示例可以在GitHub上找到。</p>`,59),c=[p];function o(l,i){return s(),a("div",null,c)}const d=n(t,[["render",o],["__file","2024-07-22-Constructor Specification in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-Constructor%20Specification%20in%20Java.html","title":"Java中的构造器规范 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-01-01T00:00:00.000Z","category":["Java","Constructor"],"tag":["Java","Constructor"],"head":[["meta",{"name":"keywords","content":"Java, Constructor, Specification, Baeldung"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-Constructor%20Specification%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的构造器规范 | Baeldung"}],["meta",{"property":"og:description","content":"Java中的构造器规范 | Baeldung 1. 概述 在本教程中，我们将学习Java如何处理构造器，并从Java语言规范中回顾一些与之相关的规则。 2. 构造器声明 在Java中，每个类都必须有一个构造器。它的结构看起来类似于一个方法，但它有不同的目的。 让我们看看构造器的规范： 让我们分别看看每个部分。 2.1. 构造器修饰符 构造器声明以访问修..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/01/uu-2.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T11:43:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Constructor"}],["meta",{"property":"article:published_time","content":"2022-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T11:43:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的构造器规范 | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/01/uu-2.png\\"],\\"datePublished\\":\\"2022-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T11:43:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的构造器规范 | Baeldung 1. 概述 在本教程中，我们将学习Java如何处理构造器，并从Java语言规范中回顾一些与之相关的规则。 2. 构造器声明 在Java中，每个类都必须有一个构造器。它的结构看起来类似于一个方法，但它有不同的目的。 让我们看看构造器的规范： 让我们分别看看每个部分。 2.1. 构造器修饰符 构造器声明以访问修..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 构造器声明","slug":"_2-构造器声明","link":"#_2-构造器声明","children":[{"level":3,"title":"2.1. 构造器修饰符","slug":"_2-1-构造器修饰符","link":"#_2-1-构造器修饰符","children":[]},{"level":3,"title":"2.2. 构造器声明器","slug":"_2-2-构造器声明器","link":"#_2-2-构造器声明器","children":[]},{"level":3,"title":"2.3. 抛出子句","slug":"_2-3-抛出子句","link":"#_2-3-抛出子句","children":[]},{"level":3,"title":"2.4. 构造器体","slug":"_2-4-构造器体","link":"#_2-4-构造器体","children":[]}]},{"level":2,"title":"3. 显式构造器调用","slug":"_3-显式构造器调用","link":"#_3-显式构造器调用","children":[]},{"level":2,"title":"4. 构造器调用规则","slug":"_4-构造器调用规则","link":"#_4-构造器调用规则","children":[{"level":3,"title":"4.1. _this_或_super_必须是构造器中的第一个语句","slug":"_4-1-this-或-super-必须是构造器中的第一个语句","link":"#_4-1-this-或-super-必须是构造器中的第一个语句","children":[]},{"level":3,"title":"4.2. 不要在构造器中同时使用_this_和_super_","slug":"_4-2-不要在构造器中同时使用-this-和-super","link":"#_4-2-不要在构造器中同时使用-this-和-super","children":[]},{"level":3,"title":"4.3. 递归构造器调用","slug":"_4-3-递归构造器调用","link":"#_4-3-递归构造器调用","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721648608000,"updatedTime":1721648608000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.09,"words":1526},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-Constructor Specification in Java.md","localizedDate":"2022年1月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将学习Java如何处理构造器，并从Java语言规范中回顾一些与之相关的规则。</p>\\n<h2>2. 构造器声明</h2>\\n<p>在Java中，每个类都必须有一个构造器。它的结构看起来类似于一个方法，但它有不同的目的。</p>\\n<p>让我们看看构造器的规范：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code>`<span class=\\"token operator\\">&lt;</span>构造器修饰符<span class=\\"token operator\\">&gt;</span>` `<span class=\\"token operator\\">&lt;</span>构造器声明器<span class=\\"token operator\\">&gt;</span>` <span class=\\"token punctuation\\">[</span>抛出子句<span class=\\"token punctuation\\">]</span> `<span class=\\"token operator\\">&lt;</span>构造器体<span class=\\"token operator\\">&gt;</span>`\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
