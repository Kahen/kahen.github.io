import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-c243dxVF.js";const p={},e=t(`<h1 id="java-中的辅助类与工具类" tabindex="-1"><a class="header-anchor" href="#java-中的辅助类与工具类"><span>Java 中的辅助类与工具类</span></a></h1><p>在本教程中，我们将探讨Java中的辅助类（helper class）和工具类（utility class）之间的区别。我们首先检查每种类的含义以及如何创建它们。</p><p>辅助类提供了Java程序整体运行所需的功能。辅助类<strong>包含其他类用来执行重复任务的方法，这些任务并不是应用程序的核心目的</strong>。</p><p>正如其名，它们通过提供一些功能来帮助其他类，这些功能补充了这些类所提供的服务。</p><p>它们包含实现平凡和重复任务的方法，使整个代码库模块化，并且可以在多个类中重用。</p><p>辅助类可以被实例化，并且可能包含实例变量、实例和静态方法。</p><p>在我们的应用程序中可以存在辅助类的多个实例。当不同的类具有共同的功能时，我们可以将这些功能组合在一起，形成一个在应用程序的某些类中可访问的辅助类。</p><h3 id="_2-1-如何创建java辅助类" tabindex="-1"><a class="header-anchor" href="#_2-1-如何创建java辅助类"><span>2.1. 如何创建Java辅助类</span></a></h3><p>我们将创建一个示例辅助类以进一步理解这个概念。</p><p>要创建一个辅助类，我们使用类的默认访问修饰符。默认访问修饰符确保只有同一包中的类才能访问此类、其方法和变量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">MyHelperClass</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">double</span> discount<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">MyHelperClass</span><span class="token punctuation">(</span><span class="token keyword">double</span> discount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>discount <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> discount \`<span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>discount <span class="token operator">=</span> discount<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">discountedPrice</span><span class="token punctuation">(</span><span class="token keyword">double</span> price<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> price <span class="token operator">-</span> <span class="token punctuation">(</span>price <span class="token operator">*</span> discount<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getMaxNumber</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> numbers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>numbers<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Ensure array is not empty&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">int</span> max <span class="token operator">=</span> numbers<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> numbers<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>numbers<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&gt;</span>\` max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                max <span class="token operator">=</span> numbers<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> max<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getMinNumber</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> numbers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>numbers<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Ensure array is not empty&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">int</span> min <span class="token operator">=</span> numbers<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> numbers<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>numbers<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;</span> min<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                min <span class="token operator">=</span> numbers<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> min<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在定义了类之后，我们可以添加任意多的相关的实例和静态方法。</p><p>辅助类可以有实例方法，因为它们可以被实例化。</p><p>如上述代码片段所示，我们在_MyHelperClass_中既有实例方法也有静态方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenCreatingHelperObject_thenHelperObjectShouldBeCreated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">MyHelperClass</span> myHelperClassObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyHelperClass</span><span class="token punctuation">(</span><span class="token number">0.10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>myHelperClassObject<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">90</span><span class="token punctuation">,</span> myHelperClassObject<span class="token punctuation">.</span><span class="token function">discountedPrice</span><span class="token punctuation">(</span><span class="token number">100.00</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> numberArray <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">66</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">51</span><span class="token punctuation">,</span> <span class="token number">79</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">79</span><span class="token punctuation">,</span> <span class="token class-name">MyHelperClass</span><span class="token punctuation">.</span><span class="token function">getMaxNumber</span><span class="token punctuation">(</span>numberArray<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token class-name">MyHelperClass</span><span class="token punctuation">.</span><span class="token function">getMinNumber</span><span class="token punctuation">(</span>numberArray<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从测试中我们可以看到，创建了一个辅助对象。辅助类中的静态方法是通过类名访问的。</p><h2 id="_3-java工具类" tabindex="-1"><a class="header-anchor" href="#_3-java工具类"><span>3. Java工具类</span></a></h2><p>Java中的工具类是一个提供静态方法的类，这些方法可以在应用程序中使用。工具类中的静态方法用于执行应用程序中的常见例程。</p><p><strong>工具类不能被实例化</strong>，有时是无状态的，没有静态变量。我们声明工具类为_final_，并且它的所有方法必须是_static_。</p><p>由于我们不希望工具类被实例化，因此引入了私有构造函数。有<strong>私有构造函数意味着Java不会为我们的工具类创建默认构造函数</strong>。构造函数可以为空。</p><p><strong>工具类的目的是提供执行程序中某些功能的方法</strong>，而主类专注于它解决的核心问题。</p><p>工具类的方法通过类名访问。它使我们的代码在使用时更加灵活，同时保持模块化。</p><p>Java有诸如_java.util.Arrays_、<em>java.lang.Math</em>、<em>java.util.Scanner</em>、_java.util.Collections_等工具类。</p><h3 id="_3-1-如何创建java工具类" tabindex="-1"><a class="header-anchor" href="#_3-1-如何创建java工具类"><span>3.1. 如何创建Java工具类</span></a></h3><p>创建工具类与创建辅助类没有太大不同。创建工具类时，有一些事情需要稍微不同地处理。</p><p>要创建一个工具类，<strong>我们使用_public_访问修饰符，并将类声明为_final_</strong>。创建工具类时使用的_final_关键字意味着该类将保持不变。它不能被继承或实例化。</p><p>让我们创建一个名为_MyUtilityClass_的工具类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">MyUtilityClass</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">MyUtilityClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">returnUpperCase</span><span class="token punctuation">(</span><span class="token class-name">String</span> stringInput<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> stringInput<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">returnLowerCase</span><span class="token punctuation">(</span><span class="token class-name">String</span> stringInput<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> stringInput<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">splitStringInput</span><span class="token punctuation">(</span><span class="token class-name">String</span> stringInput<span class="token punctuation">,</span> <span class="token class-name">String</span> delimiter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> stringInput<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span>delimiter<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要遵守的另一个规则是，工具类的所有方法都是_static_，具有_public_访问修饰符。</p><p>由于工具类中只有静态方法，这些方法只能通过类名访问：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingUtilityMethods_thenAccessMethodsViaClassName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">MyUtilityClass</span><span class="token punctuation">.</span><span class="token function">returnUpperCase</span><span class="token punctuation">(</span><span class="token string">&quot;iniubong&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;INIUBONG&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">MyUtilityClass</span><span class="token punctuation">.</span><span class="token function">returnLowerCase</span><span class="token punctuation">(</span><span class="token string">&quot;AcCrA&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;accra&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所见，工具类中的_returnUpperCase()_和_returnLowerCase()_方法只能通过类名由其调用者访问。</p><h2 id="_4-java辅助类与工具类" tabindex="-1"><a class="header-anchor" href="#_4-java辅助类与工具类"><span>4. Java辅助类与工具类</span></a></h2><p>Java中的辅助类和工具类通常具有相同的目的。<strong>工具类是一个通用的辅助类。开发人员有时交替使用这些术语</strong>。</p><p>这是因为它们通过提供处理应用程序核心功能之外的某些任务的方法来补充其他类。</p><p>尽管它们非常相似，但它们之间存在一些微妙的区别：</p><ul><li>辅助类可以被实例化，而工具类不能被实例化，因为它们有私有构造函数。</li><li>辅助类可以有实例变量，也可以有实例和静态方法。</li><li>工具类只有静态变量和方法。</li><li>工具类通常在应用程序中具有全局作用域，而辅助类总是被赋予包作用域。</li></ul><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了Java中的辅助类和工具类是什么。我们还发现，由于它们在应用程序中的使用方式，辅助类和工具类在性质上非常相似。</p><p>我们详细讨论了如何创建辅助类或工具类。</p><p>在Java中创建健壮的应用程序时，我们应该始终记得将执行重复任务的相似但独立的相似方法分组到辅助类或工具类中。有时创建工具类或辅助类可能会违背Java的面向对象编程范式。然而，它们使我们的代码库非常模块化和可重用。</p><p>如常，本教程的代码可以在GitHub上找到。</p><p>OK</p>`,43),o=[e];function c(l,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-07-Java Helper vs. Utility Classes.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Java%20Helper%20vs.%20Utility%20Classes.html","title":"Java 中的辅助类与工具类","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["helper class","utility class"],"head":[["meta",{"name":"keywords","content":"Java helper class, utility class, Java programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Java%20Helper%20vs.%20Utility%20Classes.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 中的辅助类与工具类"}],["meta",{"property":"og:description","content":"Java 中的辅助类与工具类 在本教程中，我们将探讨Java中的辅助类（helper class）和工具类（utility class）之间的区别。我们首先检查每种类的含义以及如何创建它们。 辅助类提供了Java程序整体运行所需的功能。辅助类包含其他类用来执行重复任务的方法，这些任务并不是应用程序的核心目的。 正如其名，它们通过提供一些功能来帮助其他类..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T15:36:13.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"helper class"}],["meta",{"property":"article:tag","content":"utility class"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T15:36:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 中的辅助类与工具类\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T15:36:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 中的辅助类与工具类 在本教程中，我们将探讨Java中的辅助类（helper class）和工具类（utility class）之间的区别。我们首先检查每种类的含义以及如何创建它们。 辅助类提供了Java程序整体运行所需的功能。辅助类包含其他类用来执行重复任务的方法，这些任务并不是应用程序的核心目的。 正如其名，它们通过提供一些功能来帮助其他类..."},"headers":[{"level":3,"title":"2.1. 如何创建Java辅助类","slug":"_2-1-如何创建java辅助类","link":"#_2-1-如何创建java辅助类","children":[]},{"level":2,"title":"3. Java工具类","slug":"_3-java工具类","link":"#_3-java工具类","children":[{"level":3,"title":"3.1. 如何创建Java工具类","slug":"_3-1-如何创建java工具类","link":"#_3-1-如何创建java工具类","children":[]}]},{"level":2,"title":"4. Java辅助类与工具类","slug":"_4-java辅助类与工具类","link":"#_4-java辅助类与工具类","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720366573000,"updatedTime":1720366573000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.04,"words":1511},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Java Helper vs. Utility Classes.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨Java中的辅助类（helper class）和工具类（utility class）之间的区别。我们首先检查每种类的含义以及如何创建它们。</p>\\n<p>辅助类提供了Java程序整体运行所需的功能。辅助类<strong>包含其他类用来执行重复任务的方法，这些任务并不是应用程序的核心目的</strong>。</p>\\n<p>正如其名，它们通过提供一些功能来帮助其他类，这些功能补充了这些类所提供的服务。</p>\\n<p>它们包含实现平凡和重复任务的方法，使整个代码库模块化，并且可以在多个类中重用。</p>\\n<p>辅助类可以被实例化，并且可能包含实例变量、实例和静态方法。</p>","autoDesc":true}');export{k as comp,d as data};
