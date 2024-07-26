import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-C4eFoh0f.js";const t={},p=e(`<h1 id="java中的抽象类和构造器" tabindex="-1"><a class="header-anchor" href="#java中的抽象类和构造器"><span>Java中的抽象类和构造器</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>抽象类和构造器看起来可能不兼容。<strong>构造器是在类实例化时调用的方法</strong>，而<strong>抽象类不能被实例化</strong>。这听起来是不是有点反直觉？</p><p>在本文中，我们将看到抽象类为什么可以有构造器，以及在子类实例化时使用它们如何带来好处。</p><h2 id="_2-默认构造器" tabindex="-1"><a class="header-anchor" href="#_2-默认构造器"><span>2. 默认构造器</span></a></h2><p><strong>当一个类没有声明任何构造器时，编译器会为我们创建一个默认构造器</strong>。这对于抽象类来说也是成立的。即使没有显式构造器，抽象类也会有一个默认构造器可用。</p><p>在抽象类中，其派生类可以通过<code>_super()</code>调用抽象默认构造器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractClass</span> <span class="token punctuation">{</span>
    <span class="token comment">// 编译器创建一个默认构造器</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConcreteClass</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractClass</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">ConcreteClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-无参数构造器" tabindex="-1"><a class="header-anchor" href="#_3-无参数构造器"><span>3. 无参数构造器</span></a></h2><p>我们可以在抽象类中声明一个无参数的构造器。它将覆盖默认构造器，任何子类的创建都将首先在构造链中调用它。</p><p>让我们通过两个抽象类的子类来验证这种行为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractClass</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">AbstractClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Initializing AbstractClass&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConcreteClassA</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractClass</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConcreteClassB</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractClass</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ConcreteClassB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Initializing ConcreteClassB&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看调用<code>new ConcreteClassA()</code>时得到的输出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Initializing</span> <span class="token class-name">AbstractClass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>而调用<code>new ConcreteClassB()</code>的输出将是：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Initializing</span> <span class="token class-name">AbstractClass</span>
<span class="token class-name">Initializing</span> <span class="token class-name">ConcreteClassB</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-安全初始化" tabindex="-1"><a class="header-anchor" href="#_3-1-安全初始化"><span>3.1. 安全初始化</span></a></h3><p>声明一个无参数的抽象构造器对于安全初始化很有帮助。</p><p>下面的<code>Counter</code>类是自然数计数的超类。我们需要它的值从零开始。</p><p>让我们看看如何使用无参数构造器来确保安全初始化：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>

    <span class="token keyword">int</span> value<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">abstract</span> <span class="token keyword">int</span> <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的<code>SimpleCounter</code>子类用<code>++</code>运算符实现了<code>increment()</code>方法。每次调用时，它将<code>value</code>增加一：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SimpleCounter</span> <span class="token keyword">extends</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">int</span> <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token operator">++</span>value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意<code>SimpleCounter</code>没有声明任何构造器。它的创建依赖于计数器的无参数构造器默认被调用。</p><p>以下单元测试演示了构造器安全初始化<code>value</code>属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenNoArgAbstractConstructor_whenSubclassCreation_thenCalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Counter</span> counter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleCounter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>counter<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> counter<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-防止访问" tabindex="-1"><a class="header-anchor" href="#_3-2-防止访问"><span>3.2. 防止访问</span></a></h3><p>我们的<code>Counter</code>初始化工作得很好，但假设我们不希望子类覆盖这种安全初始化。</p><p>首先，我们需要使构造器变为私有以防止子类访问：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Counter No-Arguments constructor&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其次，让我们为子类创建另一个构造器来调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Counter</span><span class="token punctuation">(</span><span class="token keyword">int</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Parametrized Counter constructor&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们的<code>SimpleCounter</code>需要覆盖参数化构造器，否则它将无法编译：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SimpleCounter</span> <span class="token keyword">extends</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">SimpleCounter</span><span class="token punctuation">(</span><span class="token keyword">int</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 具体方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意编译器期望我们在该构造器上调用<code>super(value)</code>，以限制对我们的私有无参数构造器的访问。</p><h2 id="_4-参数化构造器" tabindex="-1"><a class="header-anchor" href="#_4-参数化构造器"><span>4. 参数化构造器</span></a></h2><p>抽象类中构造器最常见的用途之一是避免冗余。让我们通过汽车的例子来看看如何利用参数化构造器。</p><p>我们从一个抽象的<code>Car</code>类开始，代表所有类型的汽车。我们还需要一个<code>distance</code>属性，以知道它行驶了多少距离：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Car</span> <span class="token punctuation">{</span>

    <span class="token keyword">int</span> distance<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Car</span><span class="token punctuation">(</span><span class="token keyword">int</span> distance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>distance <span class="token operator">=</span> distance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的超类看起来不错，但我们不希望<code>distance</code>属性用非零值初始化。我们还希望防止子类更改<code>distance</code>属性或覆盖参数化构造器。</p><p>让我们看看如何限制对<code>distance</code>的访问并使用构造器安全地初始化它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Car</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> distance<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Car</span><span class="token punctuation">(</span><span class="token keyword">int</span> distance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>distance <span class="token operator">=</span> distance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Car</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Car default constructor&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// getters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们的<code>distance</code>属性和参数化构造器是私有的。有一个公共默认构造器<code>Car()</code>，它委托给私有构造器以初始化<code>distance</code>。</p><p>为了使用我们的<code>distance</code>属性，让我们添加一些行为来获取和显示汽车的基本信息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">abstract</span> <span class="token class-name">String</span> <span class="token function">getInformation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> info <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token function">getInformation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;\\nDistance: &quot;</span> <span class="token operator">+</span> <span class="token function">getDistance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>info<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有子类都需要提供<code>getInformation()</code>的实现，<code>display()</code>方法将使用它来打印所有详细信息。</p><p>现在让我们创建<code>ElectricCar</code>和<code>FuelCar</code>子类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ElectricCar</span> <span class="token keyword">extends</span> <span class="token class-name">Car</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> chargingTime<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">ElectricCar</span><span class="token punctuation">(</span><span class="token keyword">int</span> chargingTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>chargingTime <span class="token operator">=</span> chargingTime<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token class-name">String</span> <span class="token function">getInformation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;Electric Car&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;\\nCharging Time: &quot;</span> <span class="token operator">+</span> chargingTime<span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FuelCar</span> <span class="token keyword">extends</span> <span class="token class-name">Car</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> fuel<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">FuelCar</span><span class="token punctuation">(</span><span class="token class-name">String</span> fuel<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>fuel <span class="token operator">=</span> fuel<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token class-name">String</span> <span class="token function">getInformation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;Fuel Car&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;\\nFuel type: &quot;</span> <span class="token operator">+</span> fuel<span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看这些子类在行动中的表现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ElectricCar</span> electricCar <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ElectricCar</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
electricCar<span class="token punctuation">.</span><span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">FuelCar</span> fuelCar <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FuelCar</span><span class="token punctuation">(</span><span class="token string">&quot;Gasoline&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
fuelCar<span class="token punctuation">.</span><span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>产生的输出看起来像这样：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Car</span> <span class="token keyword">default</span> constructor
<span class="token class-name">Electric</span> <span class="token class-name">Car</span>
<span class="token class-name">Charging</span> <span class="token class-name">Time</span><span class="token operator">:</span> <span class="token number">8</span>
<span class="token class-name">Distance</span><span class="token operator">:</span> <span class="token number">0</span>

<span class="token class-name">Car</span> <span class="token keyword">default</span> constructor
<span class="token class-name">Fuel</span> <span class="token class-name">Car</span>
<span class="token class-name">Fuel</span> type<span class="token operator">:</span> <span class="token class-name">Gasoline</span>
<span class="token class-name">Distance</span><span class="token operator">:</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>像Java中的任何其他类一样，抽象类也可以有构造器，即使它们只从它们的具体子类中被调用。</p><p>在本文中，我们从抽象类的角度讨论了每种类型的构造器——它们与具体子类的关联以及我们如何在实际用例中使用它们。</p><p>如常，代码示例可以在GitHub上找到。</p>`,56),c=[p];function l(o,i){return a(),s("div",null,c)}const r=n(t,[["render",l],["__file","2024-07-24-Constructors in Java Abstract Classes.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-24/2024-07-24-Constructors%20in%20Java%20Abstract%20Classes.html","title":"Java中的抽象类和构造器","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Abstract Classes"],"tag":["Constructors","Java Abstract Classes"],"head":[["meta",{"name":"keywords","content":"Java, Abstract Classes, Constructors, Java Abstract Classes Constructors"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-24/2024-07-24-Constructors%20in%20Java%20Abstract%20Classes.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的抽象类和构造器"}],["meta",{"property":"og:description","content":"Java中的抽象类和构造器 1. 概述 抽象类和构造器看起来可能不兼容。构造器是在类实例化时调用的方法，而抽象类不能被实例化。这听起来是不是有点反直觉？ 在本文中，我们将看到抽象类为什么可以有构造器，以及在子类实例化时使用它们如何带来好处。 2. 默认构造器 当一个类没有声明任何构造器时，编译器会为我们创建一个默认构造器。这对于抽象类来说也是成立的。即..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-24T08:51:34.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Constructors"}],["meta",{"property":"article:tag","content":"Java Abstract Classes"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-24T08:51:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的抽象类和构造器\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-24T08:51:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的抽象类和构造器 1. 概述 抽象类和构造器看起来可能不兼容。构造器是在类实例化时调用的方法，而抽象类不能被实例化。这听起来是不是有点反直觉？ 在本文中，我们将看到抽象类为什么可以有构造器，以及在子类实例化时使用它们如何带来好处。 2. 默认构造器 当一个类没有声明任何构造器时，编译器会为我们创建一个默认构造器。这对于抽象类来说也是成立的。即..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 默认构造器","slug":"_2-默认构造器","link":"#_2-默认构造器","children":[]},{"level":2,"title":"3. 无参数构造器","slug":"_3-无参数构造器","link":"#_3-无参数构造器","children":[{"level":3,"title":"3.1. 安全初始化","slug":"_3-1-安全初始化","link":"#_3-1-安全初始化","children":[]},{"level":3,"title":"3.2. 防止访问","slug":"_3-2-防止访问","link":"#_3-2-防止访问","children":[]}]},{"level":2,"title":"4. 参数化构造器","slug":"_4-参数化构造器","link":"#_4-参数化构造器","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721811094000,"updatedTime":1721811094000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.39,"words":1316},"filePathRelative":"posts/baeldung/2024-07-24/2024-07-24-Constructors in Java Abstract Classes.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>抽象类和构造器看起来可能不兼容。<strong>构造器是在类实例化时调用的方法</strong>，而<strong>抽象类不能被实例化</strong>。这听起来是不是有点反直觉？</p>\\n<p>在本文中，我们将看到抽象类为什么可以有构造器，以及在子类实例化时使用它们如何带来好处。</p>\\n<h2>2. 默认构造器</h2>\\n<p><strong>当一个类没有声明任何构造器时，编译器会为我们创建一个默认构造器</strong>。这对于抽象类来说也是成立的。即使没有显式构造器，抽象类也会有一个默认构造器可用。</p>\\n<p>在抽象类中，其派生类可以通过<code>_super()</code>调用抽象默认构造器：</p>","autoDesc":true}');export{r as comp,k as data};
