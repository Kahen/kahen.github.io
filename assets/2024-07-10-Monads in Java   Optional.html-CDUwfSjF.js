import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as p}from"./app-D5kFWV-m.js";const t={},e=p(`<h1 id="java中的monads-–-optional" tabindex="-1"><a class="header-anchor" href="#java中的monads-–-optional"><span>Java中的Monads – Optional</span></a></h1><p>在本教程中，我们将讨论Monads及其在Java中的定义。我们的目标是理解这个概念，它解决的问题，以及Java语言是如何实现它的。</p><p>通过本教程，我们希望读者能够理解Monads的概念以及如何充分利用它。</p><h2 id="_2-概念" tabindex="-1"><a class="header-anchor" href="#_2-概念"><span>2. 概念</span></a></h2><p><strong>Monad是一种在函数式编程世界中流行的设计模式</strong>。然而，它实际上起源于一个名为范畴论的数学领域。本文将重点讨论软件工程领域的Monad定义。尽管两种定义有许多相似之处，但软件定义和该领域的术语更与我们的上下文相关。</p><p><strong>简而言之，一个通用的概念是一个对象，它可以基于转换将自己映射到不同的结果</strong>。</p><h2 id="_3-设计模式" tabindex="-1"><a class="header-anchor" href="#_3-设计模式"><span>3. 设计模式</span></a></h2><p>Monads是封装值和计算的容器或结构。它们必须具有两个基本操作：</p><ul><li><strong>单元(Unit)</strong>：Monads表示一种包装给定值的类型，此操作负责包装值。例如，在Java中，此操作可以通过利用泛型接受不同类型的值。</li><li><strong>绑定(Bind)</strong>：此操作允许使用持有的值执行转换，并返回一个新的Monad值（在Monad类型中包装的值）。</li></ul><p>尽管如此，Monad必须遵守一些属性：</p><ul><li><strong>左单元性(Left identity)</strong>：当应用于Monad时，它应该产生与将转换应用于持有的值相同的结果。</li><li><strong>右单元性(Right identity)</strong>：当发送Monad转换（将值转换为Monad）时，产生的结果必须与在新Monad中包装该值相同。</li><li><strong>结合律(Associativity)</strong>：当链式转换时，转换的嵌套方式不应重要。</li></ul><p>函数式编程的一个挑战是允许在不损失可读性的情况下对此类操作进行流水线处理。这是采用Monad概念的原因之一。<strong>Monad是函数范式的基础，并有助于实现声明式编程</strong>。</p><h2 id="_4-java解释" tabindex="-1"><a class="header-anchor" href="#_4-java解释"><span>4. Java解释</span></a></h2><p>Java 8通过像_Optional_这样的类实现了Monad设计模式。但是，让我们先看一下在添加_Optional_类之前的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MonadSample1</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
    <span class="token keyword">private</span> <span class="token keyword">double</span> <span class="token function">multiplyBy2</span><span class="token punctuation">(</span><span class="token keyword">double</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> n <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">double</span> <span class="token function">divideBy2</span><span class="token punctuation">(</span><span class="token keyword">double</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> n <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">double</span> <span class="token function">add3</span><span class="token punctuation">(</span><span class="token keyword">double</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> n <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">double</span> <span class="token function">subtract1</span><span class="token punctuation">(</span><span class="token keyword">double</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">double</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">subtract1</span><span class="token punctuation">(</span><span class="token function">add3</span><span class="token punctuation">(</span><span class="token function">divideBy2</span><span class="token punctuation">(</span><span class="token function">multiplyBy2</span><span class="token punctuation">(</span><span class="token function">multiplyBy2</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MonadSampleUnitTest</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenNotUsingMonad_shouldBeOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MonadSample1</span> test <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MonadSample1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">6.0</span><span class="token punctuation">,</span> test<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0.000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所观察到的，_apply_方法看起来相当难以阅读，但是它的替代方案是什么呢？也许是这样的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MonadSample2</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">double</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">double</span> n1 <span class="token operator">=</span> <span class="token function">multiplyBy2</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">double</span> n2 <span class="token operator">=</span> <span class="token function">multiplyBy2</span><span class="token punctuation">(</span>n1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">double</span> n3 <span class="token operator">=</span> <span class="token function">divideBy2</span><span class="token punctuation">(</span>n2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">double</span> n4 <span class="token operator">=</span> <span class="token function">add3</span><span class="token punctuation">(</span>n3<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">subtract1</span><span class="token punctuation">(</span>n4<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MonadSampleUnitTest</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenNotUsingMonadButUsingTempVars_shouldBeOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MonadSample2</span> test <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MonadSample2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">6.0</span><span class="token punctuation">,</span> test<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0.000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这看起来更好，但它仍然看起来过于冗长。那么让我们看看使用_Optional_会是什么样子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MonadSample3</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">double</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>value <span class="token operator">-&gt;</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token function">multiplyBy2</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>value <span class="token operator">-&gt;</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token function">multiplyBy2</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>value <span class="token operator">-&gt;</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token function">divideBy2</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>value <span class="token operator">-&gt;</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token function">add3</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>value <span class="token operator">-&gt;</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token function">subtract1</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MonadSampleUnitTest</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingMonad_shouldBeOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MonadSample3</span> test <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MonadSample3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">6.0</span><span class="token punctuation">,</span> test<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0.000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码看起来更清晰。另一方面，这种设计允许开发人员应用尽可能多的后续转换，而不会牺牲可读性并减少临时变量声明的冗长性。</p><p>还有更多；想象一下，如果这些函数中的任何一个可以产生_null_值。在这种情况下，我们将不得不在每个转换之前添加验证，使代码更加冗长。这实际上是_Optional_类的主要目的。这个想法是避免使用_null_并提供一种易于使用的方式来应用对象的转换，以便当它们不是_null_时，一系列声明将以null安全的方式执行。还可以检查由_Optional_包装的值是否为空（值为null）。</p><h3 id="_4-1-optional的陷阱" tabindex="-1"><a class="header-anchor" href="#_4-1-optional的陷阱"><span>4.1. Optional的陷阱</span></a></h3><p>正如开头所描述的，Monad需要有一些操作和属性，让我们看看Java实现中的这些属性。首先，为什么不检查Monad必须拥有的操作：</p><ul><li><strong>对于_单元(Unit)_操作，Java提供了不同的风格，如_Optional.of()_和</strong> <em>Optional.nullable()</em>。正如我们可能想象的那样，一个接受_null_值，另一个不接受。</li><li><strong>至于_绑定(Bind)_函数，Java提供了_Optional.flatMap()_操作</strong>，在代码示例中引入。</li></ul><p>一个不在Monad定义中的特性是_map_操作。它是一个类似于_flatMap_的转换和链式操作。两者之间的区别在于_map_操作接收一个转换，返回一个原始值以供API内部包装。而_flatMap_已经返回了一个包装值，API返回以形成管道。</p><p>现在，让我们检查Monad的属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MonadSample4</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">leftIdentity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token class-name">Function</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">Optional</span><span class="token punctuation">&gt;</span></span>\`\`\` mapping <span class="token operator">=</span> value <span class="token operator">-&gt;</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>value <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>mapping<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>mapping<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">rightIdentity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token operator">::</span><span class="token function">of</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">associativity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Function</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">Optional</span><span class="token punctuation">&gt;</span></span>\`\`\` mapping <span class="token operator">=</span> value <span class="token operator">-&gt;</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>value <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Optional</span> leftSide <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>mapping<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token operator">::</span><span class="token function">of</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Optional</span> rightSide <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>v <span class="token operator">-&gt;</span> mapping<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token operator">::</span><span class="token function">of</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> leftSide<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>rightSide<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MonadSampleUnitTest</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenTestingMonadProperties_shouldBeOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MonadSample4</span> test <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MonadSample4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> test<span class="token punctuation">.</span><span class="token function">leftIdentity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> test<span class="token punctuation">.</span><span class="token function">rightIdentity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> test<span class="token punctuation">.</span><span class="token function">associativity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>乍一看，所有属性似乎都符合要求，Java有一个适当的Monad实现，但实际上并非如此。让我们再试一次测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">MonadSample5</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">fail</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Function</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">Optional</span><span class="token punctuation">&gt;</span></span>\`\`\` mapping <span class="token operator">=</span> value <span class="token operator">-&gt;</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>value <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">:</span> value <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">)</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>mapping<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>mapping<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">MonadSampleUnitTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenBreakingMonadProperties_shouldBeFalse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MonadSample5</span> test <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MonadSample5</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> test<span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>正如所观察到的，Monad的左单元性属性被打破了</strong>。<strong>实际上，这似乎是一个有意识的决定，正如这次讨论。JDK团队的一名成员说_Optional_的范围比其他语言窄，他们不打算让它超过那个范围</strong>。还有其他场景，这些属性可能不成立。</p><p>实际上，其他API，如流(stream)，有类似的设计，但也不打算完全实现Monad规范。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了Monad的概念，它们是如何在Java中引入的，以及这种实现的细微差别。</p><p>有人可能会争论说Java所拥有的实际上并不是Monad实现，并且在为null安全设计时，他们破坏了原则。然而，这种模式的许多好处仍然存在。</p><p>像往常一样，本文中使用的所有代码示例都可以在GitHub上找到。</p>`,40),o=[e];function c(l,i){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","2024-07-10-Monads in Java   Optional.html.vue"]]),r=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Monads%20in%20Java%20%20%20Optional.html","title":"Java中的Monads – Optional","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["Monad","Java 8","Optional"],"head":[["meta",{"name":"keywords","content":"Java Monad, Optional, Functional Programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Monads%20in%20Java%20%20%20Optional.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的Monads – Optional"}],["meta",{"property":"og:description","content":"Java中的Monads – Optional 在本教程中，我们将讨论Monads及其在Java中的定义。我们的目标是理解这个概念，它解决的问题，以及Java语言是如何实现它的。 通过本教程，我们希望读者能够理解Monads的概念以及如何充分利用它。 2. 概念 Monad是一种在函数式编程世界中流行的设计模式。然而，它实际上起源于一个名为范畴论的数学..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T15:01:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Monad"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"Optional"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T15:01:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的Monads – Optional\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T15:01:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的Monads – Optional 在本教程中，我们将讨论Monads及其在Java中的定义。我们的目标是理解这个概念，它解决的问题，以及Java语言是如何实现它的。 通过本教程，我们希望读者能够理解Monads的概念以及如何充分利用它。 2. 概念 Monad是一种在函数式编程世界中流行的设计模式。然而，它实际上起源于一个名为范畴论的数学..."},"headers":[{"level":2,"title":"2. 概念","slug":"_2-概念","link":"#_2-概念","children":[]},{"level":2,"title":"3. 设计模式","slug":"_3-设计模式","link":"#_3-设计模式","children":[]},{"level":2,"title":"4. Java解释","slug":"_4-java解释","link":"#_4-java解释","children":[{"level":3,"title":"4.1. Optional的陷阱","slug":"_4-1-optional的陷阱","link":"#_4-1-optional的陷阱","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720623698000,"updatedTime":1720623698000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.45,"words":1635},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Monads in Java   Optional.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将讨论Monads及其在Java中的定义。我们的目标是理解这个概念，它解决的问题，以及Java语言是如何实现它的。</p>\\n<p>通过本教程，我们希望读者能够理解Monads的概念以及如何充分利用它。</p>\\n<h2>2. 概念</h2>\\n<p><strong>Monad是一种在函数式编程世界中流行的设计模式</strong>。然而，它实际上起源于一个名为范畴论的数学领域。本文将重点讨论软件工程领域的Monad定义。尽管两种定义有许多相似之处，但软件定义和该领域的术语更与我们的上下文相关。</p>\\n<p><strong>简而言之，一个通用的概念是一个对象，它可以基于转换将自己映射到不同的结果</strong>。</p>","autoDesc":true}');export{d as comp,r as data};
