import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-CBerKIce.js";const t={},p=e(`<h1 id="java中测试接口合约的不同方法" tabindex="-1"><a class="header-anchor" href="#java中测试接口合约的不同方法"><span>Java中测试接口合约的不同方法</span></a></h1><p>继承是Java中的一个重要概念。接口是实现该概念的方式之一。</p><p>接口定义了一个合约，多个类可以实现它。因此，测试这些实现类以确保它们遵守相同的合约是至关重要的。</p><p>在本教程中，我们将探讨在Java中为接口编写JUnit测试的不同方法。</p><h2 id="_2-环境搭建" tabindex="-1"><a class="header-anchor" href="#_2-环境搭建"><span>2. 环境搭建</span></a></h2><p>让我们创建一个基本的环境，用于我们不同方法的测试。</p><p>首先，我们创建一个名为_Shape_的简单接口，它有一个方法_area()_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> <span class="token function">area</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其次，我们定义了一个_Circle_类，它实现了_Shape_接口。它还有一个自己的方法_circumference()_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">double</span> radius<span class="token punctuation">;</span>

    <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token keyword">double</span> radius<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>radius <span class="token operator">=</span> radius<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">area</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">3.14</span> <span class="token operator">*</span> radius <span class="token operator">*</span> radius<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">circumference</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">2</span> <span class="token operator">*</span> <span class="token number">3.14</span> <span class="token operator">*</span> radius<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们定义了另一个类_Rectangle_，它实现了_Shape_接口。它有一个额外的方法_perimeter()_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Rectangle</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">double</span> length<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">double</span> breadth<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token keyword">double</span> length<span class="token punctuation">,</span> <span class="token keyword">double</span> breadth<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>length <span class="token operator">=</span> length<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>breadth <span class="token operator">=</span> breadth<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">area</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> length <span class="token operator">*</span> breadth<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">perimeter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">2</span> <span class="token operator">*</span> <span class="token punctuation">(</span>length <span class="token operator">+</span> breadth<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-测试方法" tabindex="-1"><a class="header-anchor" href="#_3-测试方法"><span>3. 测试方法</span></a></h2><p>现在，让我们看看可以遵循的不同方法来测试实现类。</p><h3 id="_3-1-实现类的单独测试" tabindex="-1"><a class="header-anchor" href="#_3-1-实现类的单独测试"><span>3.1. 实现类的单独测试</span></a></h3><p>最受欢迎的方法之一是为接口的每个实现类创建单独的JUnit测试类。我们将测试类的两个方法——继承的方法以及类自身定义的方法。</p><p>首先，我们创建_CircleUnitTest_类，其中包含_area()_和_circumference()_方法的测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenAreaIsCalculated_thenSuccessful</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Shape</span> circle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> area <span class="token operator">=</span> circle<span class="token punctuation">.</span><span class="token function">area</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">78.5</span><span class="token punctuation">,</span> area<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenCircumferenceIsCalculated_thenSuccessful</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">Circle</span> circle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> circumference <span class="token operator">=</span> circle<span class="token punctuation">.</span><span class="token function">circumference</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">12.56</span><span class="token punctuation">,</span> circumference<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们创建_RectangleUnitTest_类，其中包含_area()_和_perimeter()_方法的测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenAreaIsCalculated_thenSuccessful</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Shape</span> rectangle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> area <span class="token operator">=</span> rectangle<span class="token punctuation">.</span><span class="token function">area</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> area<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenPerimeterIsCalculated_thenSuccessful</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Rectangle</span> rectangle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> perimeter <span class="token operator">=</span> rectangle<span class="token punctuation">.</span><span class="token function">perimeter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">,</span> perimeter<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们从上面的两个类中看到的，<strong>我们可以成功地测试接口方法以及实现类可能定义的任何额外方法。</strong></p><p>使用这种方法，我们可能需要<strong>为所有实现类重复编写相同的接口方法测试</strong>。正如我们在单独测试中看到的，相同的_area()_方法正在两个实现类中进行测试。</p><p>随着实现类的增加，测试在实现中成倍增加，接口定义的方法数量也随之增加。因此，<strong>代码复杂性和冗余也随之增加，这使得维护和随时间变化变得更加困难。</strong></p><h3 id="_3-2-参数化测试" tabindex="-1"><a class="header-anchor" href="#_3-2-参数化测试"><span>3.2. 参数化测试</span></a></h3><p>为了克服这个问题，让我们创建一个参数化测试，它接受不同实现类的实例作为输入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;data&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenShapeInstance_whenAreaIsCalculated_thenSuccessful</span><span class="token punctuation">(</span><span class="token class-name">Shape</span> shapeInstance<span class="token punctuation">,</span> <span class="token keyword">double</span> expectedArea<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">double</span> area <span class="token operator">=</span> shapeInstance<span class="token punctuation">.</span><span class="token function">area</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedArea<span class="token punctuation">,</span> area<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Collection</span>\`<span class="token operator">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>\` <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
      <span class="token punctuation">{</span> <span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">78.5</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">20</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用这种方法，<strong>我们已经成功地测试了实现类的接口合约。</strong></p><p><strong>然而，我们没有灵活性去定义接口之外的任何内容。</strong> 因此，我们可能仍然需要以其他形式测试实现类。这可能需要在它们自己的JUnit类中测试它们。</p><h3 id="_3-3-使用基础测试类" tabindex="-1"><a class="header-anchor" href="#_3-3-使用基础测试类"><span>3.3. 使用基础测试类</span></a></h3><p>使用前两种方法，我们没有足够的灵活性来扩展测试用例，除了验证接口合约之外。同时，我们也希望避免代码冗余。那么，让我们看看另一种可以解决这两个问题的方法。</p><p>在这种方法中，我们定义一个基础测试类。这个抽象测试类定义了要测试的方法，即接口合约。随后，实现类的测试类可以扩展这个抽象测试类来构建测试。</p><p>我们将使用<strong>模板方法模式</strong>，其中我们在基础测试类中定义了测试_area()_方法的算法，然后，测试子类只需要提供在算法中使用的实现。</p><p>让我们定义一个基础测试类来测试_area()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">Map</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">instantiateShapeWithExpectedArea</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenShapeInstance_whenAreaIsCalculated_thenSuccessful</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Map</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\`\` shapeAreaMap <span class="token operator">=</span> <span class="token function">instantiateShapeWithExpectedArea</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Shape</span> shape <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Shape</span><span class="token punctuation">)</span> shapeAreaMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;shape&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> expectedArea <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">double</span><span class="token punctuation">)</span> shapeAreaMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;area&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> area <span class="token operator">=</span> shape<span class="token punctuation">.</span><span class="token function">area</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedArea<span class="token punctuation">,</span> area<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们为_Circle_类创建JUnit测试类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">Map</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">instantiateShapeWithExpectedArea</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\` shapeAreaMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    shapeAreaMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;shape&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    shapeAreaMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;area&quot;</span><span class="token punctuation">,</span> <span class="token number">78.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> shapeAreaMap<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenCircumferenceIsCalculated_thenSuccessful</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">Circle</span> circle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> circumference <span class="token operator">=</span> circle<span class="token punctuation">.</span><span class="token function">circumference</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">12.56</span><span class="token punctuation">,</span> circumference<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，是_Rectangle_类的测试类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">Map</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">instantiateShapeWithExpectedArea</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\` shapeAreaMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    shapeAreaMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;shape&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    shapeAreaMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;area&quot;</span><span class="token punctuation">,</span> <span class="token number">20.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> shapeAreaMap<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenPerimeterIsCalculated_thenSuccessful</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Rectangle</span> rectangle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> perimeter <span class="token operator">=</span> rectangle<span class="token punctuation">.</span><span class="token function">perimeter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">,</span> perimeter<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，我们重写了_instantiateShapeWithExpectedArea()_方法。在这个方法中，我们提供了_Shape_实例以及预期的面积。这些参数可以由基础测试类中定义的测试方法使用来执行测试。</p><p>总结来说，使用这种方法，<strong>实现类可以拥有它们自己方法的测试，并继承接口方法的测试。</strong></p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探讨了编写JUnit测试以验证接口合约的不同方式。</p><p>首先，我们看了为每个实现类定义单独的测试类是多么直接。然而，这可能导致很多冗余代码。</p><p>然后，我们探索了如何使用参数化测试来帮助我们避免冗余，但它的灵活性较小。</p><p>最后，我们看到了基础测试类方法，它解决了其他两种方法中的问题。</p><p>如常，源代码可在GitHub上找到。</p>`,46),c=[p];function o(l,i){return s(),a("div",null,c)}const k=n(t,[["render",o],["__file","2024-06-29-Testing Interface Contract in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Testing%20Interface%20Contract%20in%20Java.html","title":"Java中测试接口合约的不同方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JUnit"],"tag":["JUnit","接口测试"],"head":[["meta",{"name":"keywords","content":"Java, JUnit, 接口合约测试"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Testing%20Interface%20Contract%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中测试接口合约的不同方法"}],["meta",{"property":"og:description","content":"Java中测试接口合约的不同方法 继承是Java中的一个重要概念。接口是实现该概念的方式之一。 接口定义了一个合约，多个类可以实现它。因此，测试这些实现类以确保它们遵守相同的合约是至关重要的。 在本教程中，我们将探讨在Java中为接口编写JUnit测试的不同方法。 2. 环境搭建 让我们创建一个基本的环境，用于我们不同方法的测试。 首先，我们创建一个名..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T17:30:50.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JUnit"}],["meta",{"property":"article:tag","content":"接口测试"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T17:30:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中测试接口合约的不同方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T17:30:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中测试接口合约的不同方法 继承是Java中的一个重要概念。接口是实现该概念的方式之一。 接口定义了一个合约，多个类可以实现它。因此，测试这些实现类以确保它们遵守相同的合约是至关重要的。 在本教程中，我们将探讨在Java中为接口编写JUnit测试的不同方法。 2. 环境搭建 让我们创建一个基本的环境，用于我们不同方法的测试。 首先，我们创建一个名..."},"headers":[{"level":2,"title":"2. 环境搭建","slug":"_2-环境搭建","link":"#_2-环境搭建","children":[]},{"level":2,"title":"3. 测试方法","slug":"_3-测试方法","link":"#_3-测试方法","children":[{"level":3,"title":"3.1. 实现类的单独测试","slug":"_3-1-实现类的单独测试","link":"#_3-1-实现类的单独测试","children":[]},{"level":3,"title":"3.2. 参数化测试","slug":"_3-2-参数化测试","link":"#_3-2-参数化测试","children":[]},{"level":3,"title":"3.3. 使用基础测试类","slug":"_3-3-使用基础测试类","link":"#_3-3-使用基础测试类","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719682250000,"updatedTime":1719682250000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.75,"words":1426},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Testing Interface Contract in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>继承是Java中的一个重要概念。接口是实现该概念的方式之一。</p>\\n<p>接口定义了一个合约，多个类可以实现它。因此，测试这些实现类以确保它们遵守相同的合约是至关重要的。</p>\\n<p>在本教程中，我们将探讨在Java中为接口编写JUnit测试的不同方法。</p>\\n<h2>2. 环境搭建</h2>\\n<p>让我们创建一个基本的环境，用于我们不同方法的测试。</p>\\n<p>首先，我们创建一个名为_Shape_的简单接口，它有一个方法_area()_：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">Shape</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">double</span> <span class=\\"token function\\">area</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
