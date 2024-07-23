import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-LwwahXlT.js";const e={},p=t(`<hr><h1 id="如何使用mockito进行单元测试中的构造函数模拟" tabindex="-1"><a class="header-anchor" href="#如何使用mockito进行单元测试中的构造函数模拟"><span>如何使用Mockito进行单元测试中的构造函数模拟</span></a></h1><p>在这篇简短的教程中，我们将探索使用Mockito和PowerMock在Java中有效模拟构造函数的各种选项。</p><h2 id="_2-使用powermock模拟构造函数" tabindex="-1"><a class="header-anchor" href="#_2-使用powermock模拟构造函数"><span>2. 使用PowerMock模拟构造函数</span></a></h2><p>使用Mockito版本3.3或更低版本模拟构造函数或静态方法是不可能的事情。在这种情况下，像PowerMock这样的库提供了额外的功能，允许我们模拟构造函数的行为并协调它们的交互。</p><h2 id="_3-模型" tabindex="-1"><a class="header-anchor" href="#_3-模型"><span>3. 模型</span></a></h2><p>让我们使用两个Java类来模拟一个支付处理系统。我们将创建一个<code>PaymentService</code>类，其中包含处理支付的逻辑，并提供了一个参数化构造函数以指定支付方式，以及一个带有回退模式的默认构造函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PaymentService</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> paymentMode<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">PaymentService</span><span class="token punctuation">(</span><span class="token class-name">String</span> paymentMode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>paymentMode <span class="token operator">=</span> paymentMode<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">PaymentService</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>paymentMode <span class="token operator">=</span> <span class="token string">&quot;Cash&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">processPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>paymentMode<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>PaymentProcessor</code>类依赖于<code>PaymentService</code>来执行支付处理任务，并提供了两个构造函数，一个用于默认设置，另一个用于自定义支付方式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PaymentProcessor</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">PaymentService</span> paymentService<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">PaymentProcessor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>paymentService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PaymentService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">PaymentProcessor</span><span class="token punctuation">(</span><span class="token class-name">String</span> paymentMode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>paymentMode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PaymentService</span><span class="token punctuation">(</span>paymentMode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">processPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> paymentService<span class="token punctuation">.</span><span class="token function">processPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用mockito模拟默认构造函数" tabindex="-1"><a class="header-anchor" href="#_4-使用mockito模拟默认构造函数"><span>4. 使用Mockito模拟默认构造函数</span></a></h2><p>在编写单元测试时，隔离我们想要测试的代码至关重要。构造函数经常创建我们不想在测试中涉及的依赖。模拟构造函数允许我们用模拟对象替换真实对象，确保我们正在测试的行为特定于正在检查的单元。</p><p>从Mockito版本3.4开始，我们可以使用<code>mockConstruction()</code>方法。它允许我们模拟对象的构造。我们指定我们打算模拟构造函数的类作为第一个参数。此外，我们还提供一个以<code>MockInitializer</code>回调函数形式的第二个参数。这个回调函数允许我们在构造期间定义和操作模拟的行为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenConstructorInvokedWithInitializer_ThenMockObjectShouldBeCreated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">try</span><span class="token punctuation">(</span><span class="token class-name">MockedConstruction</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">PaymentService</span><span class="token punctuation">&gt;</span></span>\`\`\`\` mockPaymentService <span class="token operator">=</span> <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">mockConstruction</span><span class="token punctuation">(</span><span class="token class-name">PaymentService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span><span class="token punctuation">(</span>mock<span class="token punctuation">,</span>context<span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span> 
        <span class="token function">when</span><span class="token punctuation">(</span>mock<span class="token punctuation">.</span><span class="token function">processPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;Credit&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">PaymentProcessor</span> paymentProcessor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PaymentProcessor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span>mockPaymentService<span class="token punctuation">.</span><span class="token function">constructed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Credit&quot;</span><span class="token punctuation">,</span> paymentProcessor<span class="token punctuation">.</span><span class="token function">processPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>mockConstruction()</code>方法有几个重载版本，每个版本都适用于不同的用例。在下面的场景中，我们没有使用<code>MockInitializer</code>来初始化模拟对象。我们正在验证构造函数被调用了一次，并且缺少初始化器确保了构造的<code>PaymentService</code>对象中<code>paymentMode</code>字段的<code>null</code>状态：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenConstructorInvokedWithoutInitializer_ThenMockObjectShouldBeCreatedWithNullFields</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">try</span><span class="token punctuation">(</span><span class="token class-name">MockedConstruction</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">PaymentService</span><span class="token punctuation">&gt;</span></span>\`\`\`\` mockPaymentService <span class="token operator">=</span> <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">mockConstruction</span><span class="token punctuation">(</span><span class="token class-name">PaymentService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">PaymentProcessor</span> paymentProcessor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PaymentProcessor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span>mockPaymentService<span class="token punctuation">.</span><span class="token function">constructed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertNull</span><span class="token punctuation">(</span>paymentProcessor<span class="token punctuation">.</span><span class="token function">processPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用mockito模拟参数化构造函数" tabindex="-1"><a class="header-anchor" href="#_5-使用mockito模拟参数化构造函数"><span>5. 使用Mockito模拟参数化构造函数</span></a></h2><p>在这个例子中，我们已经设置了<code>MockInitializer</code>并调用了参数化构造函数。我们正在验证确实创建了一个模拟，并且它在初始化期间定义了期望的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenConstructorInvokedWithParameters_ThenMockObjectShouldBeCreated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">try</span><span class="token punctuation">(</span><span class="token class-name">MockedConstruction</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">PaymentService</span><span class="token punctuation">&gt;</span></span>\`\`\`\` mockPaymentService <span class="token operator">=</span> <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">mockConstruction</span><span class="token punctuation">(</span><span class="token class-name">PaymentService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span><span class="token punctuation">(</span>mock<span class="token punctuation">,</span> context<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span> 
        <span class="token function">when</span><span class="token punctuation">(</span>mock<span class="token punctuation">.</span><span class="token function">processPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;Credit&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">PaymentProcessor</span> paymentProcessor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PaymentProcessor</span><span class="token punctuation">(</span><span class="token string">&quot;Debit&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span>mockPaymentService<span class="token punctuation">.</span><span class="token function">constructed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Credit&quot;</span><span class="token punctuation">,</span> paymentProcessor<span class="token punctuation">.</span><span class="token function">processPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-模拟构造函数的作用域" tabindex="-1"><a class="header-anchor" href="#_6-模拟构造函数的作用域"><span>6. 模拟构造函数的作用域</span></a></h2><p>Java中的try-with-resources结构允许我们限制正在创建的模拟的作用域。在此块内，对指定类的公共构造函数的任何调用都会创建模拟对象。当在块外的任何地方调用真实构造函数时，将调用真实构造函数。</p><p>在下面的例子中，我们没有定义任何初始化器，并多次调用了默认和参数化构造函数。然后，模拟的行为在构造后被定义。</p><p>我们正在验证确实创建了三个模拟对象，并且它们正在遵守我们预定义的模拟行为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenMultipleConstructorsInvoked_ThenMultipleMockObjectsShouldBeCreated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">try</span><span class="token punctuation">(</span><span class="token class-name">MockedConstruction</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">PaymentService</span><span class="token punctuation">&gt;</span></span>\`\`\`\` mockPaymentService <span class="token operator">=</span> <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">mockConstruction</span><span class="token punctuation">(</span><span class="token class-name">PaymentService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">PaymentProcessor</span> paymentProcessor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PaymentProcessor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">PaymentProcessor</span> secondPaymentProcessor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PaymentProcessor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">PaymentProcessor</span> thirdPaymentProcessor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PaymentProcessor</span><span class="token punctuation">(</span><span class="token string">&quot;Debit&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">when</span><span class="token punctuation">(</span>mockPaymentService<span class="token punctuation">.</span><span class="token function">constructed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">processPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;Credit&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">when</span><span class="token punctuation">(</span>mockPaymentService<span class="token punctuation">.</span><span class="token function">constructed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">processPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;Online Banking&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span>mockPaymentService<span class="token punctuation">.</span><span class="token function">constructed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Credit&quot;</span><span class="token punctuation">,</span> paymentProcessor<span class="token punctuation">.</span><span class="token function">processPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Online Banking&quot;</span><span class="token punctuation">,</span> secondPaymentProcessor<span class="token punctuation">.</span><span class="token function">processPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertNull</span><span class="token punctuation">(</span>thirdPaymentProcessor<span class="token punctuation">.</span><span class="token function">processPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-依赖注入和构造函数模拟" tabindex="-1"><a class="header-anchor" href="#_7-依赖注入和构造函数模拟"><span>7. 依赖注入和构造函数模拟</span></a></h2><p>当我们使用依赖注入时，我们可以直接传递模拟对象，避免了模拟构造函数的需要。通过这种方法，我们可以在实例化被测试类之前模拟依赖项，消除了模拟任何构造函数的需要。</p><p>让我们在<code>PaymentProcessor</code>类中引入第三个构造函数，其中<code>PaymentService</code>作为依赖项注入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">PaymentProcessor</span><span class="token punctuation">(</span><span class="token class-name">PaymentService</span> paymentService<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>paymentService <span class="token operator">=</span> paymentService<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们已经将依赖项从<code>PaymentProcessor</code>类中解耦，这允许我们在隔离状态下测试我们的单元，并通过模拟控制依赖项的行为，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenDependencyInjectionIsUsed_ThenMockObjectShouldBeCreated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">PaymentService</span> mockPaymentService <span class="token operator">=</span> <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">PaymentService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">when</span><span class="token punctuation">(</span>mockPaymentService<span class="token punctuation">.</span><span class="token function">processPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;Online Banking&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">PaymentProcessor</span> paymentProcessor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PaymentProcessor</span><span class="token punctuation">(</span>mockPaymentService<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Online Banking&quot;</span><span class="token punctuation">,</span> paymentProcessor<span class="token punctuation">.</span><span class="token function">processPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，在无法控制源代码中依赖项的管理方式的情况下，特别是当依赖注入不是一种选择时，<code>mockConstruction()</code>成为了有效模拟构造函数的有用工具。</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>这篇简短的文章展示了通过Mockito和PowerMock模拟构造函数的不同方式。我们还讨论了在可能的情况下优先考虑依赖注入的优势。</p><p>如常，代码可在GitHub上找到。 <img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p>`,34),o=[p];function c(i,l){return a(),s("div",null,o)}const r=n(e,[["render",c],["__file","2024-06-30-How to Mock Constructors for Unit Testing using Mockito.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-How%20to%20Mock%20Constructors%20for%20Unit%20Testing%20using%20Mockito.html","title":"如何使用Mockito进行单元测试中的构造函数模拟","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Mockito"],"tag":["Unit Testing","Mocking"],"head":[["meta",{"name":"keywords","content":"Mockito, Java, Unit Testing, Mocking Constructors"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-How%20to%20Mock%20Constructors%20for%20Unit%20Testing%20using%20Mockito.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何使用Mockito进行单元测试中的构造函数模拟"}],["meta",{"property":"og:description","content":"如何使用Mockito进行单元测试中的构造函数模拟 在这篇简短的教程中，我们将探索使用Mockito和PowerMock在Java中有效模拟构造函数的各种选项。 2. 使用PowerMock模拟构造函数 使用Mockito版本3.3或更低版本模拟构造函数或静态方法是不可能的事情。在这种情况下，像PowerMock这样的库提供了额外的功能，允许我们模拟构..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T15:55:05.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Unit Testing"}],["meta",{"property":"article:tag","content":"Mocking"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T15:55:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何使用Mockito进行单元测试中的构造函数模拟\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T15:55:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何使用Mockito进行单元测试中的构造函数模拟 在这篇简短的教程中，我们将探索使用Mockito和PowerMock在Java中有效模拟构造函数的各种选项。 2. 使用PowerMock模拟构造函数 使用Mockito版本3.3或更低版本模拟构造函数或静态方法是不可能的事情。在这种情况下，像PowerMock这样的库提供了额外的功能，允许我们模拟构..."},"headers":[{"level":2,"title":"2. 使用PowerMock模拟构造函数","slug":"_2-使用powermock模拟构造函数","link":"#_2-使用powermock模拟构造函数","children":[]},{"level":2,"title":"3. 模型","slug":"_3-模型","link":"#_3-模型","children":[]},{"level":2,"title":"4. 使用Mockito模拟默认构造函数","slug":"_4-使用mockito模拟默认构造函数","link":"#_4-使用mockito模拟默认构造函数","children":[]},{"level":2,"title":"5. 使用Mockito模拟参数化构造函数","slug":"_5-使用mockito模拟参数化构造函数","link":"#_5-使用mockito模拟参数化构造函数","children":[]},{"level":2,"title":"6. 模拟构造函数的作用域","slug":"_6-模拟构造函数的作用域","link":"#_6-模拟构造函数的作用域","children":[]},{"level":2,"title":"7. 依赖注入和构造函数模拟","slug":"_7-依赖注入和构造函数模拟","link":"#_7-依赖注入和构造函数模拟","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1719762905000,"updatedTime":1719762905000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.44,"words":1331},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-How to Mock Constructors for Unit Testing using Mockito.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>如何使用Mockito进行单元测试中的构造函数模拟</h1>\\n<p>在这篇简短的教程中，我们将探索使用Mockito和PowerMock在Java中有效模拟构造函数的各种选项。</p>\\n<h2>2. 使用PowerMock模拟构造函数</h2>\\n<p>使用Mockito版本3.3或更低版本模拟构造函数或静态方法是不可能的事情。在这种情况下，像PowerMock这样的库提供了额外的功能，允许我们模拟构造函数的行为并协调它们的交互。</p>\\n<h2>3. 模型</h2>\\n<p>让我们使用两个Java类来模拟一个支付处理系统。我们将创建一个<code>PaymentService</code>类，其中包含处理支付的逻辑，并提供了一个参数化构造函数以指定支付方式，以及一个带有回退模式的默认构造函数：</p>","autoDesc":true}');export{r as comp,d as data};
