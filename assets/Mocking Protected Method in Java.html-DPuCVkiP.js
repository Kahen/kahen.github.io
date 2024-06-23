import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CngNs9d-.js";const e={},p=t(`<h1 id="在java中模拟受保护的方法" tabindex="-1"><a class="header-anchor" href="#在java中模拟受保护的方法"><span>在Java中模拟受保护的方法</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在Java中模拟受保护的方法与模拟公共方法类似，但有一个问题：测试类中该方法的可见性。我们可以从同一包中的类和继承自A类的类中看到类A的受保护方法。因此，如果我们尝试从不同包中测试类A，我们将面临问题。</p><p>在本教程中，我们将探讨在测试中模拟受保护方法的情况。我们将演示两种情况：可以访问该方法和不能访问。我们将使用Mockito间谍而不是模拟，因为我们只想存根测试类中的某些行为。</p><p>当我们可以访问Mockito中的受保护方法时，模拟是直接的。我们可以通过两种方式获得访问权限。首先，将受保护的范围更改为公共，或者第二，将测试类移动到与具有受保护方法的类相同的包中。</p><p>但有时这不是一个选项，因此一个替代方案是遵循间接实践。<strong>不使用任何外部库的最常见方法有：</strong></p><ul><li><strong>使用JUnit5和反射</strong></li><li><strong>使用内部测试类扩展要测试的类</strong></li></ul><p>如果我们尝试更改访问修饰符，这可能会导致不想要的行为。使用最严格的访问级别是好的实践，除非有充分的理由不这样做。同样，如果将测试移动到与具有受保护方法的类相同的包中是有意义的，那么移动它是一个简单的选项。</p><p>如果这些选项都不适用于我们的情况，当只有一类A中的一个受保护方法需要存根时，使用JUnit5和反射是一个很好的选择。<strong>对于一个类A，如果我们需要存根多个受保护方法，创建一个内部类扩展A是更干净的解决方案。</strong></p><h2 id="_3-模拟可见的受保护方法" tabindex="-1"><a class="header-anchor" href="#_3-模拟可见的受保护方法"><span>3. 模拟可见的受保护方法</span></a></h2><p>在这一部分，我们将处理测试可以访问受保护方法的情况，或者我们可以更改以获得访问权限的情况。如前所述，更改可能是<strong>将访问修饰符设为公共或将测试移动到与具有受保护方法的类相同的包中</strong>。</p><p>让我们以一个示例来看看Movies类，它有一个受保护的方法getTitle()来检索私有字段title的值。它还包含一个公共方法getPlaceHolder()，可供客户端使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Movies</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Movies</span><span class="token punctuation">(</span><span class="token class-name">String</span> title<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>title <span class="token operator">=</span> title<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getPlaceHolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Movie: &quot;</span> <span class="token operator">+</span> <span class="token function">getTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token class-name">String</span> <span class="token function">getTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> title<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在测试类中，首先，我们断言getPlaceholder()方法的初始值是我们期望的。然后我们使用Mockito间谍存根受保护方法的功能，并断言新值getPlaceholder()返回的包含getTitle()的存根值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenProtectedMethod_whenMethodIsVisibleAndUseMockitoToStub_thenResponseIsStubbed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Movies</span> matrix <span class="token operator">=</span> <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">spy</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Movies</span><span class="token punctuation">(</span><span class="token string">&quot;The Matrix&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>matrix<span class="token punctuation">.</span><span class="token function">getPlaceHolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Movie: The Matrix&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">doReturn</span><span class="token punctuation">(</span><span class="token string">&quot;something else&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span>matrix<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>matrix<span class="token punctuation">.</span><span class="token function">getTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;something else&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>matrix<span class="token punctuation">.</span><span class="token function">getPlaceHolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Movie: something else&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-模拟不可见的受保护方法" tabindex="-1"><a class="header-anchor" href="#_4-模拟不可见的受保护方法"><span>4. 模拟不可见的受保护方法</span></a></h2><p>接下来，让我们看看当我们无法访问Mockito中的受保护方法时如何进行模拟。我们将处理的用例是测试类与我们要存根的类在不同的包中。在这种情况下，我们有两个选项：</p><ul><li>JUnit5与反射</li><li>扩展具有受保护方法的类的内部类</li></ul><h3 id="_4-1-使用junit和反射" tabindex="-1"><a class="header-anchor" href="#_4-1-使用junit和反射"><span>4.1. 使用JUnit和反射</span></a></h3><p><strong>JUnit5提供了一个类_ReflectionSupport_，它处理测试中的常见反射情况</strong>，比如查找/调用方法等。让我们看看这与我们之前的代码是如何工作的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenProtectedMethod_whenMethodIsVisibleAndUseMockitoToStub_thenResponseIsStubbed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchMethodException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Movies</span> matrix <span class="token operator">=</span> <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">spy</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Movies</span><span class="token punctuation">(</span><span class="token string">&quot;The Matrix&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>matrix<span class="token punctuation">.</span><span class="token function">getPlaceHolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Movie: The Matrix&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">ReflectionSupport</span><span class="token punctuation">.</span><span class="token function">invokeMethod</span><span class="token punctuation">(</span>
            <span class="token class-name">Movies</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDeclaredMethod</span><span class="token punctuation">(</span><span class="token string">&quot;getTitle&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token function">doReturn</span><span class="token punctuation">(</span><span class="token string">&quot;something else&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span>matrix<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>matrix<span class="token punctuation">.</span><span class="token function">getPlaceHolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Movie: something else&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_ReflectionSupport_的_invokeMethod()_将受保护方法的值设置为被存根的_Movie_对象，当被调用时。</p><h3 id="_4-2-使用内部类" tabindex="-1"><a class="header-anchor" href="#_4-2-使用内部类"><span>4.2. 使用内部类</span></a></h3><p><strong>我们可以通过创建一个扩展要测试的类的内部类来克服可见性问题，并使受保护方法可见</strong>。如果我们需要在不同的测试类中模拟同一个类的受保护方法，内部类可以是一个独立的类。</p><p>在我们的例子中，将MoviesWrapper类作为测试类的内部类是有意义的，它扩展了我们之前代码中的Movies：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">MoviesWrapper</span> <span class="token keyword">extends</span> <span class="token class-name">Movies</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">MoviesWrapper</span><span class="token punctuation">(</span><span class="token class-name">String</span> title<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>title<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token class-name">String</span> <span class="token function">getTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">getTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，我们通过MoviesWrapper类访问Movies的getTitle()。如果我们使用独立类而不是内部类，方法访问修饰符可能需要变为公共。</p><p>然后测试使用MoviesWrapper类作为要测试的类。这样我们就有访问getTitle()的权限，并可以轻松地使用Mockito间谍进行存根：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenProtectedMethod_whenMethodNotVisibleAndUseInnerTestClass_thenResponseIsStubbed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">MoviesWrapper</span> matrix <span class="token operator">=</span> <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">spy</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MoviesWrapper</span><span class="token punctuation">(</span><span class="token string">&quot;The Matrix&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>matrix<span class="token punctuation">.</span><span class="token function">getPlaceHolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Movie: The Matrix&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">doReturn</span><span class="token punctuation">(</span><span class="token string">&quot;something else&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span>matrix<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>matrix<span class="token punctuation">.</span><span class="token function">getPlaceHolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Movie: something else&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了在Java中模拟受保护方法时的可见性困难，并展示了可能的解决方案。我们可能面临的每种用例都有不同的选项，根据示例，我们应该能够每次都选择正确的一个。</p><p>如往常一样，所有源代码都可以在GitHub上找到。翻译已经完成，以下是剩余部分的翻译：</p><h2 id="_5-结论-1" tabindex="-1"><a class="header-anchor" href="#_5-结论-1"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了在Java中模拟受保护方法时的可见性困难，并展示了可能的解决方案。我们可能面临的每种用例都有不同的选项，根据示例，我们应该能够每次都选择正确的一个。</p><p>如往常一样，所有源代码都可以在GitHub上找到。</p><p>OK</p>`,36),o=[p];function c(i,l){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","Mocking Protected Method in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Mocking%20Protected%20Method%20in%20Java.html","title":"在Java中模拟受保护的方法","lang":"zh-CN","frontmatter":{"date":"2024-06-15T00:00:00.000Z","category":["Java","Mockito"],"tag":["测试","Mockito","反射"],"description":"在Java中模拟受保护的方法 1. 概述 在Java中模拟受保护的方法与模拟公共方法类似，但有一个问题：测试类中该方法的可见性。我们可以从同一包中的类和继承自A类的类中看到类A的受保护方法。因此，如果我们尝试从不同包中测试类A，我们将面临问题。 在本教程中，我们将探讨在测试中模拟受保护方法的情况。我们将演示两种情况：可以访问该方法和不能访问。我们将使用...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Mocking%20Protected%20Method%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中模拟受保护的方法"}],["meta",{"property":"og:description","content":"在Java中模拟受保护的方法 1. 概述 在Java中模拟受保护的方法与模拟公共方法类似，但有一个问题：测试类中该方法的可见性。我们可以从同一包中的类和继承自A类的类中看到类A的受保护方法。因此，如果我们尝试从不同包中测试类A，我们将面临问题。 在本教程中，我们将探讨在测试中模拟受保护方法的情况。我们将演示两种情况：可以访问该方法和不能访问。我们将使用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"测试"}],["meta",{"property":"article:tag","content":"Mockito"}],["meta",{"property":"article:tag","content":"反射"}],["meta",{"property":"article:published_time","content":"2024-06-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中模拟受保护的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"3. 模拟可见的受保护方法","slug":"_3-模拟可见的受保护方法","link":"#_3-模拟可见的受保护方法","children":[]},{"level":2,"title":"4. 模拟不可见的受保护方法","slug":"_4-模拟不可见的受保护方法","link":"#_4-模拟不可见的受保护方法","children":[{"level":3,"title":"4.1. 使用JUnit和反射","slug":"_4-1-使用junit和反射","link":"#_4-1-使用junit和反射","children":[]},{"level":3,"title":"4.2. 使用内部类","slug":"_4-2-使用内部类","link":"#_4-2-使用内部类","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论-1","link":"#_5-结论-1","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.89,"words":1466},"filePathRelative":"posts/baeldung/Archive/Mocking Protected Method in Java.md","localizedDate":"2024年6月15日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在Java中模拟受保护的方法与模拟公共方法类似，但有一个问题：测试类中该方法的可见性。我们可以从同一包中的类和继承自A类的类中看到类A的受保护方法。因此，如果我们尝试从不同包中测试类A，我们将面临问题。</p>\\n<p>在本教程中，我们将探讨在测试中模拟受保护方法的情况。我们将演示两种情况：可以访问该方法和不能访问。我们将使用Mockito间谍而不是模拟，因为我们只想存根测试类中的某些行为。</p>\\n<p>当我们可以访问Mockito中的受保护方法时，模拟是直接的。我们可以通过两种方式获得访问权限。首先，将受保护的范围更改为公共，或者第二，将测试类移动到与具有受保护方法的类相同的包中。</p>","autoDesc":true}');export{k as comp,d as data};
