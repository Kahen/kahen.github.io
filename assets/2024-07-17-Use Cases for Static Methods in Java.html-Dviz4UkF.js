import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-8nJ1rqSf.js";const e={},p=t(`<h1 id="java中静态方法的使用案例" tabindex="-1"><a class="header-anchor" href="#java中静态方法的使用案例"><span>Java中静态方法的使用案例</span></a></h1><p>静态方法是大多数面向对象编程语言中常见的，包括Java。静态方法与实例方法的区别在于它们没有拥有它们的实例对象。相反，<strong>静态方法是在类级别定义的，可以在不创建实例的情况下使用</strong>。</p><p>在本教程中，我们将了解Java中静态方法的定义以及它们的限制。然后，我们将看看使用静态方法的常见用例，并推荐何时在我们的代码中应用它们。最后，我们将看到如何测试静态方法以及如何模拟它们。</p><p>实例方法是根据对象的运行时类型进行多态解析的。另一方面，<strong>静态方法是在编译时根据它们定义的类解析的</strong>。</p><h3 id="_2-1-类级别" tabindex="-1"><a class="header-anchor" href="#_2-1-类级别"><span>2.1 类级别</span></a></h3><p>Java中的静态方法是类定义的一部分。我们可以通过添加_static_关键字来定义一个静态方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> counter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">incrementCounter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">++</span>counter<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getCounterValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> counter<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要访问静态方法，我们<strong>使用类名后跟点和方法名</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> oldValue <span class="token operator">=</span> <span class="token class-name">StaticCounter</span><span class="token punctuation">.</span><span class="token function">getCounterValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> newValue <span class="token operator">=</span> <span class="token class-name">StaticCounter</span><span class="token punctuation">.</span><span class="token function">incrementCounter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>oldValue <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意到这个静态方法可以访问_StaticCounter_类的静态状态。通常静态方法是无状态的，但它们可以作为包括单例模式在内的各种技术的一部分来使用类级数据。</p><p>尽管也可以使用对象引用静态方法，但这种反模式通常被Sonar等工具标记为错误。</p><h3 id="_2-2-限制" tabindex="-1"><a class="header-anchor" href="#_2-2-限制"><span>2.2 限制</span></a></h3><p>由于<strong>静态方法不操作实例成员</strong>，我们应该注意一些限制：</p><ul><li>静态方法不能直接引用实例成员变量</li><li>静态方法不能直接调用实例方法</li><li>子类不能覆盖静态方法</li><li>我们不能在静态方法中使用关键字_this_和_super_</li></ul><p>上述每一项都会导致编译时错误。我们还应该注意，如果我们在子类中声明了与基类同名的静态方法，它不会覆盖而是隐藏基类方法。</p><h2 id="_3-使用案例" tabindex="-1"><a class="header-anchor" href="#_3-使用案例"><span>3. 使用案例</span></a></h2><p>现在让我们来看看何时在我们的Java代码中应用静态方法的常见用例。</p><h3 id="_3-1-标准行为" tabindex="-1"><a class="header-anchor" href="#_3-1-标准行为"><span>3.1 标准行为</span></a></h3><p>当我们开发<strong>具有标准行为的方法</strong>，这些方法操作它们的输入参数时，使用静态方法是有意义的。</p><p>Apache _StringUtils_中的_String_操作是一个很好的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">capitalize</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个好例子是_Collections_类，因为它包含操作不同集合的常用方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` list <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span><span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-跨实例重用" tabindex="-1"><a class="header-anchor" href="#_3-2-跨实例重用"><span>3.2 跨实例重用</span></a></h3><p>使用静态方法的一个有效理由是当我们<strong>在不同类的实例之间重用标准行为</strong>时。</p><p>例如，我们通常在领域和业务类中使用Java _Collections_和Apache <em>StringUtils</em>：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/07/utils_demo2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>由于这些函数没有自己的状态，并且不绑定到我们业务逻辑的特定部分，因此将它们放在一个模块中共享是有意义的。</p><h3 id="_3-3-不改变状态" tabindex="-1"><a class="header-anchor" href="#_3-3-不改变状态"><span>3.3 不改变状态</span></a></h3><p>由于静态方法不能引用实例成员变量，它们是<strong>不需要任何对象状态操作的方法</strong>的好选择。</p><p>当我们在不管理状态的操作中使用静态方法时，方法调用就更加实用。调用者可以直接调用方法而无需创建实例。</p><p>当我们像静态计数器的情况一样通过类的所有实例共享状态时，操作该状态的方法应该是静态的。管理全局状态可能是错误之源，因此当实例方法直接写入静态字段时，Sonar会报告一个严重问题。</p><h3 id="_3-4-纯函数" tabindex="-1"><a class="header-anchor" href="#_3-4-纯函数"><span>3.4 纯函数</span></a></h3><p>如果一个函数的<strong>返回值仅依赖于传递的输入参数</strong>，则称为纯函数。纯函数从它们的参数中获取所有数据并从该数据计算出某些东西。</p><p>纯函数不操作任何实例或静态变量。因此，执行纯函数也应该没有副作用。</p><p>由于静态方法不允许覆盖并且引用实例变量，它们是Java中实现纯函数的好选择。</p><h2 id="_4-实用类" tabindex="-1"><a class="header-anchor" href="#_4-实用类"><span>4. 实用类</span></a></h2><p>由于Java没有为存放一组函数设置特定的类型，我们经常创建一个实用类。实用类<strong>为纯静态函数提供家园</strong>。我们不是一遍又一遍地编写相同的逻辑，而是可以将我们在项目中重复使用的纯函数组合在一起。</p><p>Java中的实用类是一个无状态的类，我们永远不应该实例化它。因此，建议将其声明为_final_，以便它不能被子类化（这不会添加价值）。另外，为了防止任何人尝试实例化它，我们可以添加一个私有构造函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">CustomStringUtils</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">CustomStringUtils</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token class-name">CharSequence</span> cs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> cs <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> cs<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意到我们放在实用类中的所有方法都应该是_static_。</p><h2 id="_5-测试" tabindex="-1"><a class="header-anchor" href="#_5-测试"><span>5. 测试</span></a></h2><p>让我们检查一下如何使用JUnit对Java中的静态方法进行单元测试和模拟。</p><h3 id="_5-1-单元测试" tabindex="-1"><a class="header-anchor" href="#_5-1-单元测试"><span>5.1 单元测试</span></a></h3><p>使用JUnit对设计良好的纯静态方法进行单元测试非常简单。我们可以使用类名调用我们的静态方法并传递一些测试参数。</p><p>我们的测试对象将根据其输入参数计算结果。因此，我们可以<strong>对结果进行断言并测试不同的输入输出组合</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenNonEmptyString_whenIsEmptyMethodIsCalled_thenFalseIsReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">boolean</span> empty <span class="token operator">=</span> <span class="token class-name">CustomStringUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>empty<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isFalse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-模拟" tabindex="-1"><a class="header-anchor" href="#_5-2-模拟"><span>5.2 模拟</span></a></h3><p>大多数时候，<strong>我们不需要模拟静态方法</strong>，我们可以在测试中简单地使用实际的函数实现。需要模拟静态方法通常暗示着代码设计问题。</p><p>如果我们必须这样做，那么我们可以使用Mockito模拟静态函数。然而，我们需要在我们的pom.xml中添加一个额外的_mockito-inline_依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.mockito\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`mockito-inline\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`3.8.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>\`test\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以使用_Mockito.mockStatic_方法模拟对静态方法调用的调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">MockedStatic</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">StringUtils</span><span class="token punctuation">&gt;</span></span>\` utilities <span class="token operator">=</span> <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">mockStatic</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    utilities<span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">capitalize</span><span class="token punctuation">(</span><span class="token string">&quot;karoq&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;Karoq&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Car</span> car1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Car</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;karoq&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>car1<span class="token punctuation">.</span><span class="token function">getModelCapitalized</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Karoq&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，<strong>我们探讨了在我们的Java代码中使用静态方法的常见用例</strong>。我们学习了Java中静态方法的定义以及它们的限制。</p><p>我们还探讨了何时在我们的代码中使用静态方法是有意义的。我们看到静态方法是具有标准行为的纯函数的好选择，这些函数在实例之间重复使用但不改变它们的状态。最后，我们查看了如何测试和模拟静态方法。</p><p>如常，完整的源代码可在GitHub上获得。</p>`,57),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-17-Use Cases for Static Methods in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Use%20Cases%20for%20Static%20Methods%20in%20Java.html","title":"Java中静态方法的使用案例","lang":"zh-CN","frontmatter":{"date":"2022-07-01T00:00:00.000Z","category":["Java","编程"],"tag":["静态方法","Java"],"head":[["meta",{"name":"keywords","content":"Java, 静态方法, 编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Use%20Cases%20for%20Static%20Methods%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中静态方法的使用案例"}],["meta",{"property":"og:description","content":"Java中静态方法的使用案例 静态方法是大多数面向对象编程语言中常见的，包括Java。静态方法与实例方法的区别在于它们没有拥有它们的实例对象。相反，静态方法是在类级别定义的，可以在不创建实例的情况下使用。 在本教程中，我们将了解Java中静态方法的定义以及它们的限制。然后，我们将看看使用静态方法的常见用例，并推荐何时在我们的代码中应用它们。最后，我们将..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/07/utils_demo2.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T10:29:47.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"静态方法"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-07-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T10:29:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中静态方法的使用案例\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/07/utils_demo2.png\\"],\\"datePublished\\":\\"2022-07-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T10:29:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中静态方法的使用案例 静态方法是大多数面向对象编程语言中常见的，包括Java。静态方法与实例方法的区别在于它们没有拥有它们的实例对象。相反，静态方法是在类级别定义的，可以在不创建实例的情况下使用。 在本教程中，我们将了解Java中静态方法的定义以及它们的限制。然后，我们将看看使用静态方法的常见用例，并推荐何时在我们的代码中应用它们。最后，我们将..."},"headers":[{"level":3,"title":"2.1 类级别","slug":"_2-1-类级别","link":"#_2-1-类级别","children":[]},{"level":3,"title":"2.2 限制","slug":"_2-2-限制","link":"#_2-2-限制","children":[]},{"level":2,"title":"3. 使用案例","slug":"_3-使用案例","link":"#_3-使用案例","children":[{"level":3,"title":"3.1 标准行为","slug":"_3-1-标准行为","link":"#_3-1-标准行为","children":[]},{"level":3,"title":"3.2 跨实例重用","slug":"_3-2-跨实例重用","link":"#_3-2-跨实例重用","children":[]},{"level":3,"title":"3.3 不改变状态","slug":"_3-3-不改变状态","link":"#_3-3-不改变状态","children":[]},{"level":3,"title":"3.4 纯函数","slug":"_3-4-纯函数","link":"#_3-4-纯函数","children":[]}]},{"level":2,"title":"4. 实用类","slug":"_4-实用类","link":"#_4-实用类","children":[]},{"level":2,"title":"5. 测试","slug":"_5-测试","link":"#_5-测试","children":[{"level":3,"title":"5.1 单元测试","slug":"_5-1-单元测试","link":"#_5-1-单元测试","children":[]},{"level":3,"title":"5.2 模拟","slug":"_5-2-模拟","link":"#_5-2-模拟","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721212187000,"updatedTime":1721212187000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.98,"words":1795},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Use Cases for Static Methods in Java.md","localizedDate":"2022年7月1日","excerpt":"\\n<p>静态方法是大多数面向对象编程语言中常见的，包括Java。静态方法与实例方法的区别在于它们没有拥有它们的实例对象。相反，<strong>静态方法是在类级别定义的，可以在不创建实例的情况下使用</strong>。</p>\\n<p>在本教程中，我们将了解Java中静态方法的定义以及它们的限制。然后，我们将看看使用静态方法的常见用例，并推荐何时在我们的代码中应用它们。最后，我们将看到如何测试静态方法以及如何模拟它们。</p>\\n<p>实例方法是根据对象的运行时类型进行多态解析的。另一方面，<strong>静态方法是在编译时根据它们定义的类解析的</strong>。</p>\\n<h3>2.1 类级别</h3>","autoDesc":true}');export{d as comp,k as data};
