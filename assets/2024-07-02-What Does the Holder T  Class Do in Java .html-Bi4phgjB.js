import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-YddbDb53.js";const t={},p=e('<h1 id="java中的holder类是做什么用的-baeldung" tabindex="-1"><a class="header-anchor" href="#java中的holder类是做什么用的-baeldung"><span>Java中的Holder类是做什么用的？ | Baeldung</span></a></h1><p>在本教程中，我们将深入探讨Java中的_Holder<code>&lt;T&gt;</code>_类。尽管这不是Java内置的类，但Holder<code>&lt;T&gt;</code>的概念可以显著提高我们的开发效率。让我们了解_Holder<code>&lt;T&gt;</code>_的强大之处以及它如何增强我们的代码。</p><h2 id="_2-值传递语义的局限性" tabindex="-1"><a class="header-anchor" href="#_2-值传递语义的局限性"><span>2. 值传递语义的局限性</span></a></h2><p>为了理解我们为什么可能需要一个_Holder<code>&lt;T&gt;</code><em>类，我们首先考虑一个常见的场景：向方法传递一个简单的_Boolean</em>。我们将创建一个模拟服务方法_getSupplierByZipCode()_，期望它修改_Boolean_的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SupplierService</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">getSupplierByZipCode</span><span class="token punctuation">(</span><span class="token class-name">String</span> zip<span class="token punctuation">,</span> <span class="token class-name">Boolean</span> result<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>zip<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&quot;9&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            result <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n            result <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们使用以“<em>9</em>”开头的_zipCode_来测试这个服务，期望_result_变为_true_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenValidZipCode_whenGetSupplierByZipCode_thenTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">SupplierService</span> service <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SupplierService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Boolean</span> result <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> zipCode <span class="token operator">=</span> <span class="token string">&quot;98682&quot;</span><span class="token punctuation">;</span>\n    service<span class="token punctuation">.</span><span class="token function">getSupplierByZipCode</span><span class="token punctuation">(</span>zipCode<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertTrue</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这个测试失败了！由于Java的值传递语义，我们传入_getSupplierByZipCode()_的_result_Boolean_实际上并没有被方法改变。</strong> 当方法尝试修改_result_时，它只是在修改一个副本，而原始的_result_保持不变。</p><p>这个限制正是_Holder<code>&lt;T&gt;</code>_可以帮助我们克服的。</p><h2 id="_3-概念化-holder-t" tabindex="-1"><a class="header-anchor" href="#_3-概念化-holder-t"><span>3. 概念化_Holder<code>&lt;T&gt;</code>_</span></a></h2><p>我们可以将_Holder<code>&lt;T&gt;</code>_视为一个通用容器或包装类，能够存储和管理任何类型_T_的对象。</p><p><strong>它主要存在是为了克服Java的值传递语义，提供一种间接的方式来模拟按引用传递的行为。</strong></p><p>这里的_T_表示一个类型参数，意味着任何有效的Java引用类型都可以替换它。这允许我们有一个_Holder_类，可以适应任何数据类型。<strong>然而，需要注意的是，_Holder<code>&lt;T&gt;</code>_不应该在每种情况下都随意使用。</strong> 特别是当处理不可变对象时，使用_Holder<code>&lt;T&gt;</code>_可能不是最有效或推荐的方法。</p><p>让我们想象我们有一个简单的_Holder_类，它包装了一个类型为_T_的值。我们可能会这样定义它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Holder</span>`````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>````````````````` <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token class-name">T</span> value<span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">Holder</span><span class="token punctuation">(</span><span class="token class-name">T</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，_Holder<code>&lt;T&gt;</code>_作为一个容器来持有和管理任何类型_T_的值。</p><h2 id="_5-使用-holder-t-类" tabindex="-1"><a class="header-anchor" href="#_5-使用-holder-t-类"><span>5. 使用_Holder<code>&lt;T&gt;</code>_类</span></a></h2><p>现在，让我们调整我们的_SupplierService_来克服我们之前观察到的Java值传递语义的限制。我们不是直接将_Boolean_传递给_getSupplierByZipCode()_方法，而是使用_Holder<code>&lt;T&gt;</code><em>类。这允许方法修改_Holder_的_value</em>，模拟一个我们需要从方法中返回除返回值之外的其他信息的场景。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SupplierService</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">getSupplierByZipCode</span><span class="token punctuation">(</span><span class="token class-name">String</span> zip<span class="token punctuation">,</span> <span class="token class-name">Holder</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Boolean</span><span class="token punctuation">&gt;</span></span>``` resultHolder<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>zip<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&quot;9&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            resultHolder<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n            resultHolder<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们使用修改后的_SupplierService_重新运行我们的测试，使用_Holder<code>&lt;T&gt;</code>_。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenValidZipCode_whenGetSupplierByZipCode_thenTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">SupplierService</span> service <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SupplierService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Holder</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Boolean</span><span class="token punctuation">&gt;</span></span>``` resultHolder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Holder</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> zipCode <span class="token operator">=</span> <span class="token string">&quot;98682&quot;</span><span class="token punctuation">;</span>\n    service<span class="token punctuation">.</span><span class="token function">getSupplierByZipCode</span><span class="token punctuation">(</span>zipCode<span class="token punctuation">,</span> resultHolder<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertTrue</span><span class="token punctuation">(</span>resultHolder<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenInvalidZipCode_whenGetSupplierByZipCode_thenFalse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">SupplierService</span> service <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SupplierService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Holder</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Boolean</span><span class="token punctuation">&gt;</span></span>``` resultHolder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Holder</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> zipCode <span class="token operator">=</span> <span class="token string">&quot;12345&quot;</span><span class="token punctuation">;</span>\n    service<span class="token punctuation">.</span><span class="token function">getSupplierByZipCode</span><span class="token punctuation">(</span>zipCode<span class="token punctuation">,</span> resultHolder<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertFalse</span><span class="token punctuation">(</span>resultHolder<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次，我们的测试通过了。_Holder<code>&lt;T&gt;</code>_类通过提供额外的间接层，<strong>允许我们模拟按引用传递的语义，并在_getSupplierByZipCode()_方法中修改我们想要的变量。</strong></p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们看到了_Holder<code>&lt;T&gt;</code>_类可以作为Java中各种编程场景中的灵活而强大的工具。尽管它不是内置类，但_Holder<code>&lt;T&gt;</code>_的概念提供了一种优雅的方式来创建灵活且可重用的代码，可以处理不同类型的数据。这可以让我们克服Java的按值调用语义在某些情况下的限制。</p><p>如往常一样，这些示例的代码可以在GitHub上找到。</p>',25),o=[p];function l(c,i){return s(),a("div",null,o)}const d=n(t,[["render",l],["__file","2024-07-02-What Does the Holder T  Class Do in Java .html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-What%20Does%20the%20Holder%20T%20%20Class%20Do%20in%20Java%20.html","title":"Java中的Holder类是做什么用的？ | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Holder","Pass-by-Value","Java Generics"],"head":[["meta",{"name":"keywords","content":"Java Holder, Pass-by-Value, Generics, Java Programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-What%20Does%20the%20Holder%20T%20%20Class%20Do%20in%20Java%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的Holder类是做什么用的？ | Baeldung"}],["meta",{"property":"og:description","content":"Java中的Holder类是做什么用的？ | Baeldung 在本教程中，我们将深入探讨Java中的_Holder<T>_类。尽管这不是Java内置的类，但Holder<T>的概念可以显著提高我们的开发效率。让我们了解_Holder<T>_的强大之处以及它如何增强我们的代码。 2. 值传递语义的局限性 为了理解我们为什么可能需要一个_Holder<T..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T01:44:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Holder"}],["meta",{"property":"article:tag","content":"Pass-by-Value"}],["meta",{"property":"article:tag","content":"Java Generics"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T01:44:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的Holder类是做什么用的？ | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T01:44:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的Holder类是做什么用的？ | Baeldung 在本教程中，我们将深入探讨Java中的_Holder<T>_类。尽管这不是Java内置的类，但Holder<T>的概念可以显著提高我们的开发效率。让我们了解_Holder<T>_的强大之处以及它如何增强我们的代码。 2. 值传递语义的局限性 为了理解我们为什么可能需要一个_Holder<T..."},"headers":[{"level":2,"title":"2. 值传递语义的局限性","slug":"_2-值传递语义的局限性","link":"#_2-值传递语义的局限性","children":[]},{"level":2,"title":"3. 概念化_Holder<T>_","slug":"_3-概念化-holder-t","link":"#_3-概念化-holder-t","children":[]},{"level":2,"title":"5. 使用_Holder<T>_类","slug":"_5-使用-holder-t-类","link":"#_5-使用-holder-t-类","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719884664000,"updatedTime":1719884664000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.24,"words":972},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-What Does the Holder T  Class Do in Java .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将深入探讨Java中的_Holder<code>&lt;T&gt;</code>_类。尽管这不是Java内置的类，但Holder<code>&lt;T&gt;</code>的概念可以显著提高我们的开发效率。让我们了解_Holder<code>&lt;T&gt;</code>_的强大之处以及它如何增强我们的代码。</p>\\n<h2>2. 值传递语义的局限性</h2>\\n<p>为了理解我们为什么可能需要一个_Holder<code>&lt;T&gt;</code><em>类，我们首先考虑一个常见的场景：向方法传递一个简单的_Boolean</em>。我们将创建一个模拟服务方法_getSupplierByZipCode()_，期望它修改_Boolean_的值：</p>","autoDesc":true}');export{d as comp,k as data};
