import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CBerKIce.js";const p={},e=t(`<h1 id="java中的函子" tabindex="-1"><a class="header-anchor" href="#java中的函子"><span>Java中的函子</span></a></h1><p>在本教程中，我们将演示如何在Java中创建函子。首先，让我们通过一些关于“函子”这个术语的具体细节来开始，然后我们将查看一些代码示例，展示它在Java中的使用方式。</p><h2 id="_2-什么是函子" tabindex="-1"><a class="header-anchor" href="#_2-什么是函子"><span>2. 什么是函子？</span></a></h2><p>“函子”这个术语来自数学领域，特别是来自一个称为“范畴论”的子领域。在计算机编程中，函子可以被认为是一个实用类，它允许我们将值映射到特定的上下文中。此外，它代表了两个范畴之间的结构保持映射。</p><p>函子受两个法则的约束：</p><ul><li>恒等性：当一个函子通过一个恒等函数进行映射时，恒等函数是一个返回与其传入参数相同值的函数，我们需要得到最初的函子（容器及其内容保持不变）。</li><li>组合/结合律：当一个函子用于映射两个部分的复合体时，它应该与分别映射到一个函数后再映射到另一个函数的结果相同。</li></ul><h2 id="_3-函数式编程中的函子" tabindex="-1"><a class="header-anchor" href="#_3-函数式编程中的函子"><span>3. 函数式编程中的函子</span></a></h2><p><strong>函子是受范畴论中定义启发的函数式编程中使用的一种设计模式。</strong> <strong>它使得一个通用类型能够在不影响其结构的情况下应用内部的函数。</strong> 在Scala等编程语言中，我们可以找到许多使用函子的例子。</p><p>Java和大多数其他现代编程语言不包括任何被认为是适合的内置函子等价物。然而，自从Java 8以来，函数式编程元素被引入到该语言中。函数式编程的概念在Java编程语言中仍然是相对较新的。</p><p>在Java中，可以使用java.util.function包中的Function接口来实现函子。下面是一个接受Function对象并将其应用于值的Functor类的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Functor</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">T</span> value<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">Functor</span><span class="token punctuation">(</span><span class="token class-name">T</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> \`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">R</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token class-name">Functor</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">R</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Function</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">&gt;</span></span>\` mapper<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Functor</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">R</span><span class="token punctuation">&gt;</span></span>\`\`\`<span class="token punctuation">(</span>mapper<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// getter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所注意到的，map()方法负责执行操作。对于这个新类，我们定义了一个final值属性。这个属性是函数将要应用的地方。此外，我们需要一个方法来比较值。让我们将这个函数添加到Functor类中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Functor</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token punctuation">{</span>
    <span class="token comment">// 定义</span>
    <span class="token keyword">boolean</span> <span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">T</span> other<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> value<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>other<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// Getter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，Functor类是泛型的，因为它接受一个类型参数T，该参数指定了存储在类中的值的类型。map方法接受一个Function对象，该对象接受一个类型为T的值，并返回一个类型为R的值。map方法然后通过将函数应用于原始值并返回它来创建一个新的Functor对象。</p><p>下面是一个如何使用这个functor类的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenProvideAValue_ShouldMapTheValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Functor</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\` functor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Functor</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Function</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` addThree <span class="token operator">=</span> <span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> num <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token class-name">Functor</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\` mappedFunctor <span class="token operator">=</span> functor<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>addThree<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> mappedFunctor<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-法则验证器" tabindex="-1"><a class="header-anchor" href="#_5-法则验证器"><span>5. 法则验证器</span></a></h2><p>那么，我们需要将事情付诸实践。在我们的第一次尝试之后，让我们使用我们的Functor类来演示Functor法则。首先是恒等法则。在这种情况下，我们的代码片段是：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenApplyAnIdentityToAFunctor_thenResultIsEqualsToInitialValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> value <span class="token operator">=</span> <span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">;</span>
    <span class="token comment">// 恒等</span>
    <span class="token class-name">Functor</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` identity <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Functor</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Function</span><span class="token punctuation">.</span><span class="token function">identity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>identity<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在刚才展示的例子中，我们使用了Function类中可用的identity方法。结果Functor返回的值不受影响，保持与作为参数传递的值相同。这种行为证明了恒等法则正在被遵循。</p><p>接下来，我们应用第二个法则。在跳入我们的实现之前，我们需要定义一些假设。</p><ul><li>f是一个将类型T和R相互映射的函数。</li><li>g是一个将类型R和U相互映射的函数。</li></ul><p>之后，我们准备实现我们的测试，以演示组合/结合律。这是我们实现的代码片段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenApplyAFunctionToOtherFunction_thenResultIsEqualsBetweenBoth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> value <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
    <span class="token class-name">Function</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` f <span class="token operator">=</span> <span class="token class-name">Object</span><span class="token operator">::</span><span class="token function">toString</span><span class="token punctuation">;</span>
    <span class="token class-name">Function</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>\` g <span class="token operator">=</span> <span class="token class-name">Long</span><span class="token operator">::</span><span class="token function">valueOf</span><span class="token punctuation">;</span>
    <span class="token class-name">Functor</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>\`\` left <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Functor</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>g<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Functor</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>\`\` right <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Functor</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>f<span class="token punctuation">.</span><span class="token function">andThen</span><span class="token punctuation">(</span>g<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token number">100L</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>right<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token number">100L</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从我们的代码片段中，我们定义了两个标记为f和g的函数。之后，我们使用两种不同的映射策略构建了两个Functor，一个名为left，另一个称为right。两个Functor最终都产生了相同的输出。因此，我们成功地应用了第二个法则的实现。</p><h2 id="_6-java-8之前的函子" tabindex="-1"><a class="header-anchor" href="#_6-java-8之前的函子"><span>6. Java 8之前的函子</span></a></h2><p>到目前为止，我们已经看到了使用java.util.function.Function接口的代码示例，该接口是在Java 8中引入的。假设我们使用的是Java的早期版本。在这种情况下，我们可以使用类似的接口或创建我们自己的函数式接口来表示一个接受单个参数并返回结果的函数。</p><p>另一方面，我们可以通过使用枚举的能力来设计一个Functor。虽然这不是最佳答案，但它确实符合Functor法则，也许最重要的是，它完成了工作。让我们定义我们的EnumFunctor类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">EnumFunctor</span> <span class="token punctuation">{</span>
    <span class="token constant">PLUS</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token constant">MINUS</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> a <span class="token operator">-</span> b<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token constant">MULTIPLY</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> a <span class="token operator">*</span> b<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token constant">DIVIDE</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> a <span class="token operator">/</span> b<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">int</span> <span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>apply方法在这个例子中被调用，有两个整数作为参数。该方法执行必要的数学运算并返回结果。此外，在这个例子中使用了abstract关键字，以表明apply过程不是在枚举本身中实现的，而必须由每个常量值实现。现在，让我们测试我们的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenApplyOperationsToEnumFunctors_thenGetTheProperResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span> <span class="token class-name">EnumFunctor</span><span class="token punctuation">.</span><span class="token constant">PLUS</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token class-name">EnumFunctor</span><span class="token punctuation">.</span><span class="token constant">MINUS</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token class-name">EnumFunctor</span><span class="token punctuation">.</span><span class="token constant">MULTIPLY</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token class-name">EnumFunctor</span><span class="token punctuation">.</span><span class="token constant">DIVIDE</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们首先描述了什么是Functor。然后，我们进入了它的法则定义。之后，我们在Java 8中实现了一些代码示例来演示Functor的使用。此外，我们通过示例展示了Functor的两个法则。最后，我们简要解释了如何在Java 8之前的版本中使用Functor，并提供了一个使用枚举的例子。</p><p>像往常一样，代码可以在GitHub上找到。</p>`,34),c=[e];function o(l,u){return a(),s("div",null,c)}const r=n(p,[["render",o],["__file","2024-07-11-Functors in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Functors%20in%20Java.html","title":"Java中的函子","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","函数式编程"],"tag":["Functor","Java","函数式编程"],"head":[["meta",{"name":"keywords","content":"Java, Functor, 函数式编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Functors%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的函子"}],["meta",{"property":"og:description","content":"Java中的函子 在本教程中，我们将演示如何在Java中创建函子。首先，让我们通过一些关于“函子”这个术语的具体细节来开始，然后我们将查看一些代码示例，展示它在Java中的使用方式。 2. 什么是函子？ “函子”这个术语来自数学领域，特别是来自一个称为“范畴论”的子领域。在计算机编程中，函子可以被认为是一个实用类，它允许我们将值映射到特定的上下文中。此..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T15:41:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Functor"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"函数式编程"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T15:41:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的函子\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T15:41:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的函子 在本教程中，我们将演示如何在Java中创建函子。首先，让我们通过一些关于“函子”这个术语的具体细节来开始，然后我们将查看一些代码示例，展示它在Java中的使用方式。 2. 什么是函子？ “函子”这个术语来自数学领域，特别是来自一个称为“范畴论”的子领域。在计算机编程中，函子可以被认为是一个实用类，它允许我们将值映射到特定的上下文中。此..."},"headers":[{"level":2,"title":"2. 什么是函子？","slug":"_2-什么是函子","link":"#_2-什么是函子","children":[]},{"level":2,"title":"3. 函数式编程中的函子","slug":"_3-函数式编程中的函子","link":"#_3-函数式编程中的函子","children":[]},{"level":2,"title":"5. 法则验证器","slug":"_5-法则验证器","link":"#_5-法则验证器","children":[]},{"level":2,"title":"6. Java 8之前的函子","slug":"_6-java-8之前的函子","link":"#_6-java-8之前的函子","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720712482000,"updatedTime":1720712482000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.5,"words":1651},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Functors in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将演示如何在Java中创建函子。首先，让我们通过一些关于“函子”这个术语的具体细节来开始，然后我们将查看一些代码示例，展示它在Java中的使用方式。</p>\\n<h2>2. 什么是函子？</h2>\\n<p>“函子”这个术语来自数学领域，特别是来自一个称为“范畴论”的子领域。在计算机编程中，函子可以被认为是一个实用类，它允许我们将值映射到特定的上下文中。此外，它代表了两个范畴之间的结构保持映射。</p>\\n<p>函子受两个法则的约束：</p>\\n<ul>\\n<li>恒等性：当一个函子通过一个恒等函数进行映射时，恒等函数是一个返回与其传入参数相同值的函数，我们需要得到最初的函子（容器及其内容保持不变）。</li>\\n<li>组合/结合律：当一个函子用于映射两个部分的复合体时，它应该与分别映射到一个函数后再映射到另一个函数的结果相同。</li>\\n</ul>","autoDesc":true}');export{r as comp,d as data};
