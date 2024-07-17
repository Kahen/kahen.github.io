import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-yRPSFQJx.js";const e={},p=t(`<h1 id="java中instanceof运算符的替代方案" tabindex="-1"><a class="header-anchor" href="#java中instanceof运算符的替代方案"><span>Java中instanceof运算符的替代方案</span></a></h1><p>在Java中，instanceof是一个操作符，用于比较一个对象的实例与一个类型。它也被称为类型比较操作符。</p><p>在本教程中，我们将探讨传统的instanceof方法的不同替代方案。我们可能需要这些替代方案来改善代码设计和可读性。</p><h2 id="_2-示例设置" tabindex="-1"><a class="header-anchor" href="#_2-示例设置"><span>2. 示例设置</span></a></h2><p>让我们开发一个简单的程序，包括一个父类<code>Dinosaur</code>和两个子类，即子类将扩展父类。</p><p>首先，让我们创建父类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Dinosaur</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们创建第一个子类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Anatotitan</span> <span class="token keyword">extends</span> <span class="token class-name">Dinosaur</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;running&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们创建第二个子类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Euraptor</span> <span class="token keyword">extends</span> <span class="token class-name">Dinosaur</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">flies</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;flying&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Dinosaur</code>类有其他子类共有的方法，但为了简单起见，我们跳过了它们。</p><p>接下来，让我们编写一个方法来创建我们对象的新实例并调用它们的移动。我们将使用instanceof来检查我们的新实例类型，然后返回结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">moveDinosaur</span><span class="token punctuation">(</span><span class="token class-name">Dinosaur</span> dinosaur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>dinosaur <span class="token keyword">instanceof</span> <span class="token class-name">Anatotitan</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Anatotitan</span> anatotitan <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Anatotitan</span><span class="token punctuation">)</span> dinosaur<span class="token punctuation">;</span>
        anatotitan<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>dinosaur <span class="token keyword">instanceof</span> <span class="token class-name">Euraptor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Euraptor</span> euraptor <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Euraptor</span><span class="token punctuation">)</span> dinosaur<span class="token punctuation">;</span>
        euraptor<span class="token punctuation">.</span><span class="token function">flies</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在接下来的部分中，我们将应用不同的替代方案。</p><h2 id="_3-使用getclass" tabindex="-1"><a class="header-anchor" href="#_3-使用getclass"><span>3. 使用getClass()</span></a></h2><p>getClass()方法有助于获取一个对象的类。我们可以使用getClass()作为instanceof的替代方案，来检查一个对象是否属于特定的类。</p><p>在我们的示例设置中，让我们保持父类和子类的结构不变。然后，让我们编写一个测试方法来实现这种方法。我们将使用getClass()而不是instanceof：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">moveDinosaurUsingGetClass</span><span class="token punctuation">(</span><span class="token class-name">Dinosaur</span> dinosaur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>dinosaur<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Anatotitan</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Anatotitan</span> anatotitan <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Anatotitan</span><span class="token punctuation">)</span> dinosaur<span class="token punctuation">;</span>
        <span class="token keyword">return</span> anatotitan<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>dinosaur<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Euraptor</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Euraptor</span> euraptor <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Euraptor</span><span class="token punctuation">)</span> dinosaur<span class="token punctuation">;</span>
        <span class="token keyword">return</span> euraptor<span class="token punctuation">.</span><span class="token function">flies</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们为这种方法编写一个单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenADinosaurSpecie_whenUsingGetClass_thenGetMovementOfEuraptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;flying&quot;</span><span class="token punctuation">,</span> <span class="token function">moveDinosaurUsingGetClass</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Euraptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种替代方案保持了我们原始的领域对象。变化的是使用getClass()。</p><h2 id="_4-使用多态性" tabindex="-1"><a class="header-anchor" href="#_4-使用多态性"><span>4. 使用多态性</span></a></h2><p>多态性的概念使得子类可以覆盖父类中的方法。<strong>我们可以利用这一概念来改变我们的示例设置，提高我们的代码设计和可读性。</strong></p><p>由于我们知道所有的恐龙都会移动，我们可以通过在父类中引入一个move()方法来改变我们的设计：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Dinosaur</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">move</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;walking&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们修改我们的子类，通过覆盖move()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Anatotitan</span> <span class="token keyword">extends</span> <span class="token class-name">Dinosaur</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token class-name">String</span> <span class="token function">move</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;running&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Euraptor</span> <span class="token keyword">extends</span> <span class="token class-name">Dinosaur</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token class-name">String</span> <span class="token function">move</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;flying&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以在不使用instanceof方法的情况下引用子类。让我们编写一个方法，它接受父类作为参数。我们将根据其种类返回恐龙的移动：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">moveDinosaurUsingPolymorphism</span><span class="token punctuation">(</span><span class="token class-name">Dinosaur</span> dinosaur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> dinosaur<span class="token punctuation">.</span><span class="token function">move</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们为这种方法编写一个单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenADinosaurSpecie_whenUsingPolymorphism_thenGetMovementOfAnatotitan</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;running&quot;</span><span class="token punctuation">,</span> <span class="token function">moveDinosaurUsingPolymorphism</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Anatotitan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当可能时，建议使用这种方法来改变我们的设计本身。使用instanceof通常表明我们的设计违反了里氏替换原则（Liskov Substitution Principle，LSP）。</p><h2 id="_5-使用枚举" tabindex="-1"><a class="header-anchor" href="#_5-使用枚举"><span>5. 使用枚举</span></a></h2><p>在枚举类型中，<strong>变量可以定义为一组预定义常量</strong>。我们可以使用这种方法来改进我们的简单程序。</p><p>首先，让我们创建一个枚举，其中包含具有方法的常量。常量的方法覆盖了枚举中的一个抽象方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">DinosaurEnum</span> <span class="token punctuation">{</span>
    <span class="token class-name">Anatotitan</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">move</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;running&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token class-name">Euraptor</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">move</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;flying&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">abstract</span> <span class="token class-name">String</span> <span class="token function">move</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>枚举常量的行为类似于其他替代方案中使用的子类。</p><p>接下来，让我们修改我们的moveDinosaur()方法，使用枚举类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">moveDinosaurUsingEnum</span><span class="token punctuation">(</span><span class="token class-name">DinosaurEnum</span> dinosaurEnum<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> dinosaurEnum<span class="token punctuation">.</span><span class="token function">move</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们为这种方法编写一个单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenADinosaurSpecie_whenUsingEnum_thenGetMovementOfEuraptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;flying&quot;</span><span class="token punctuation">,</span> <span class="token function">moveDinosaurUsingEnum</span><span class="token punctuation">(</span><span class="token class-name">DinosaurEnum<span class="token punctuation">.</span>Euraptor</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种设计使我们消除了父类和子类。这种方法在父类将具有比我们的示例设置更多的行为的复杂场景中不推荐使用。</p><h2 id="_6-使用访问者模式" tabindex="-1"><a class="header-anchor" href="#_6-使用访问者模式"><span>6. 使用访问者模式</span></a></h2><p>访问者模式有助于操作相似/相关对象。<strong>它将逻辑从对象类移动到另一个类。</strong></p><p>让我们将这种方法应用到我们的示例设置中。首先，让我们创建一个接口，其中包含一个方法，并将一个访问者作为参数传递。这将帮助我们检索我们对象的类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Dinosaur</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">move</span><span class="token punctuation">(</span><span class="token class-name">Visitor</span> visitor<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们创建一个访问者接口，并包含两个方法。这些方法接受我们的子类作为参数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Visitor</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">visit</span><span class="token punctuation">(</span><span class="token class-name">Anatotitan</span> anatotitan<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> <span class="token function">visit</span><span class="token punctuation">(</span><span class="token class-name">Euraptor</span> euraptor<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们让我们的子类实现Dinosaur接口并覆盖其方法。该方法具有访问者作为参数，以检索我们的对象类型。这个方法取代了使用instanceof：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Anatotitan</span> <span class="token keyword">implements</span> <span class="token class-name">Dinosaur</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;running&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">move</span><span class="token punctuation">(</span><span class="token class-name">Visitor</span> dinoMove<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> dinoMove<span class="token punctuation">.</span><span class="token function">visit</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们创建一个类来实现我们的访问者接口并覆盖方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DinoVisitorImpl</span> <span class="token keyword">implements</span> <span class="token class-name">Visitor</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">visit</span><span class="token punctuation">(</span><span class="token class-name">Anatotitan</span> anatotitan<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> anatotitan<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">visit</span><span class="token punctuation">(</span><span class="token class-name">Euraptor</span> euraptor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> euraptor<span class="token punctuation">.</span><span class="token function">flies</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们为这种方法编写一个测试方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">moveDinosaurUsingVisitorPattern</span><span class="token punctuation">(</span><span class="token class-name">Dinosaur</span> dinosaur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Visitor</span> visitor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DinoVisitorImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> dinosaur<span class="token punctuation">.</span><span class="token function">move</span><span class="token punctuation">(</span>visitor<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们为这种方法编写一个单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenADinosaurSpecie_whenUsingVisitorPattern_thenGetMovementOfAnatotitan</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;running&quot;</span><span class="token punctuation">,</span> <span class="token function">moveDinosaurUsingVisitorPattern</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Anatotitan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法使用了接口。访问者包含了我们的程序逻辑。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们检查了不同的instanceof替代方案。<strong>instanceof方法可能违反了里氏替换原则</strong>。采用替代方案为我们提供了更好、更稳固的设计。推荐使用多态性方法，因为它增加了更多的价值。</p><p>像往常一样，完整的源代码可在GitHub上找到。</p>`,61),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-11-Alternatives for instanceof Operator in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Alternatives%20for%20instanceof%20Operator%20in%20Java.html","title":"Java中instanceof运算符的替代方案","lang":"zh-CN","frontmatter":{"date":"2024-07-11T00:00:00.000Z","category":["Java","编程"],"tag":["instanceof","Java","替代方案"],"head":[["meta",{"name":"keywords","content":"Java, instanceof, 替代方案, 编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Alternatives%20for%20instanceof%20Operator%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中instanceof运算符的替代方案"}],["meta",{"property":"og:description","content":"Java中instanceof运算符的替代方案 在Java中，instanceof是一个操作符，用于比较一个对象的实例与一个类型。它也被称为类型比较操作符。 在本教程中，我们将探讨传统的instanceof方法的不同替代方案。我们可能需要这些替代方案来改善代码设计和可读性。 2. 示例设置 让我们开发一个简单的程序，包括一个父类Dinosaur和两个子..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T11:02:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"instanceof"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"替代方案"}],["meta",{"property":"article:published_time","content":"2024-07-11T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T11:02:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中instanceof运算符的替代方案\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-11T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T11:02:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中instanceof运算符的替代方案 在Java中，instanceof是一个操作符，用于比较一个对象的实例与一个类型。它也被称为类型比较操作符。 在本教程中，我们将探讨传统的instanceof方法的不同替代方案。我们可能需要这些替代方案来改善代码设计和可读性。 2. 示例设置 让我们开发一个简单的程序，包括一个父类Dinosaur和两个子..."},"headers":[{"level":2,"title":"2. 示例设置","slug":"_2-示例设置","link":"#_2-示例设置","children":[]},{"level":2,"title":"3. 使用getClass()","slug":"_3-使用getclass","link":"#_3-使用getclass","children":[]},{"level":2,"title":"4. 使用多态性","slug":"_4-使用多态性","link":"#_4-使用多态性","children":[]},{"level":2,"title":"5. 使用枚举","slug":"_5-使用枚举","link":"#_5-使用枚举","children":[]},{"level":2,"title":"6. 使用访问者模式","slug":"_6-使用访问者模式","link":"#_6-使用访问者模式","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720695779000,"updatedTime":1720695779000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5,"words":1501},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Alternatives for instanceof Operator in Java.md","localizedDate":"2024年7月11日","excerpt":"\\n<p>在Java中，instanceof是一个操作符，用于比较一个对象的实例与一个类型。它也被称为类型比较操作符。</p>\\n<p>在本教程中，我们将探讨传统的instanceof方法的不同替代方案。我们可能需要这些替代方案来改善代码设计和可读性。</p>\\n<h2>2. 示例设置</h2>\\n<p>让我们开发一个简单的程序，包括一个父类<code>Dinosaur</code>和两个子类，即子类将扩展父类。</p>\\n<p>首先，让我们创建父类：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Dinosaur</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
