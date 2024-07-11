import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-uizvaz9h.js";const e={},p=t(`<hr><h1 id="mockito中模拟私有字段" tabindex="-1"><a class="header-anchor" href="#mockito中模拟私有字段"><span>Mockito中模拟私有字段</span></a></h1><p>在本教程中，我们将学习如何在Mockito中模拟私有字段。Mockito是一个流行的模拟框架，通常与JUnit一起在Java中用于创建模拟对象。它本身不支持模拟私有字段；然而，我们可以使用不同的方法来模拟Mockito中的私有字段。 让我们来检查其中的一些方法。</p><h2 id="_2-项目设置" tabindex="-1"><a class="header-anchor" href="#_2-项目设置"><span>2. 项目设置</span></a></h2><p>我们将通过创建示例中使用的类来开始。我们将创建一个带有私有字段的类和一个测试类来测试它。</p><h3 id="_2-1-源代码类" tabindex="-1"><a class="header-anchor" href="#_2-1-源代码类"><span>2.1. 源代码类</span></a></h3><p>首先，我们将创建一个带有私有字段的简单类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MockService</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Person</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> person<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>MockService_类有一个类型为_Person_的私有字段__person</em>_。它还有一个方法_getName()_，返回该人的名字。正如我们所看到的，_person_字段没有设置器方法。因此我们不能直接设置字段，或者更改字段的值。</p><p>现在我们将创建_Person_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_Person_类有一个私有字段__name__和一个获取字段的getter方法。</p><h3 id="_2-2-测试类" tabindex="-1"><a class="header-anchor" href="#_2-2-测试类"><span>2.2. 测试类</span></a></h3><p>接下来，我们将创建一个测试类来测试_MockService_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MockServiceUnitTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Person</span> mockedPerson<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@BeforeEach</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        mockedPerson <span class="token operator">=</span> <span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建了_Person_类的实例，并使用Mockito进行模拟。在接下来的部分中，我们将看看如何使用这个模拟实例来替换_MockService_类的私有字段。</p><h2 id="_3-使用java反射api启用模拟" tabindex="-1"><a class="header-anchor" href="#_3-使用java反射api启用模拟"><span>3. 使用Java反射API启用模拟</span></a></h2><p>设置私有字段的一种方法是使用Java反射API。这是一个很好的方法，因为它不需要任何额外的依赖。<strong>我们首先可以使字段可访问，然后设置字段的值为模拟实例。</strong></p><p>让我们看看如何做到这一点的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenNameChangedWithReflection_whenGetName_thenReturnName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">Class</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\` mockServiceClass <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">&quot;com.baeldung.mockprivate.MockService&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">MockService</span> mockService <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">MockService</span><span class="token punctuation">)</span> mockServiceClass<span class="token punctuation">.</span><span class="token function">getDeclaredConstructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Field</span> field <span class="token operator">=</span> mockServiceClass<span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">&quot;person&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    field<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    field<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>mockService<span class="token punctuation">,</span> mockedPerson<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">when</span><span class="token punctuation">(</span>mockedPerson<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;Jane Doe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Jane Doe&quot;</span><span class="token punctuation">,</span> mockService<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用_Class.forName()_方法获取_MockService_类的类对象。然后我们使用_getDeclaredConstructor()_方法创建_MockService_类的实例。</p><p>接下来，我们使用_getDeclaredField()_方法获取_MockService_类的__person__字段。<strong>我们使用_setAccessible()_方法使字段可访问，并使用_set()_方法将字段的值设置为模拟实例。</strong></p><p>最后，我们可以模拟_Person_类的_getName()_方法，并测试_MockService_类的_getName()_方法以返回模拟值。</p><h2 id="_4-使用junit-5启用模拟" tabindex="-1"><a class="header-anchor" href="#_4-使用junit-5启用模拟"><span>4. 使用JUnit 5启用模拟</span></a></h2><p>与Java反射API类似，JUnit 5还提供了实用方法来设置私有字段。我们可以使用JUnit 5的_ReflectionUtils_类来设置私有字段的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenNameChangedWithReflectionUtils_whenGetName_thenReturnName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">MockService</span> mockService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MockService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Field</span> field <span class="token operator">=</span> <span class="token class-name">ReflectionUtils</span>
      <span class="token punctuation">.</span><span class="token function">findFields</span><span class="token punctuation">(</span><span class="token class-name">MockService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> f <span class="token operator">-&gt;</span> f<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;person&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token class-name">ReflectionUtils<span class="token punctuation">.</span>HierarchyTraversalMode</span><span class="token punctuation">.</span><span class="token constant">TOP_DOWN</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    field<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    field<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>mockService<span class="token punctuation">,</span> mockedPerson<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">when</span><span class="token punctuation">(</span>mockedPerson<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;Jane Doe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Jane Doe&quot;</span><span class="token punctuation">,</span> mockService<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法的工作原理与前一种方法相同。主要的区别是我们如何获取字段：</p><ul><li>我们使用_ReflectionUtils.findFields()_方法来获取字段。</li><li>它需要_MockService_类的类对象和一个谓词来找到字段。我们在这里使用的谓词是找到名为_“person”_的字段。</li><li>此外，我们需要指定_HierarchyTraversalMode_。当我们有一个类的层次结构，并且我们想要在层次结构中找到字段时，这很重要。</li><li>在我们的情况下，我们只有一个类，所以我们可以使用任何__TOP_DOWN__或__BOTTOM_UP__模式。</li></ul><p>这给了我们字段，我们可以再次设置字段的值并执行测试。</p><h2 id="_5-使用spring-test启用模拟" tabindex="-1"><a class="header-anchor" href="#_5-使用spring-test启用模拟"><span>5. 使用Spring Test启用模拟</span></a></h2><p>如果我们的项目中使用了Spring，Spring Test提供了一个实用类_ReflectionTestUtils_来设置私有字段。</p><h3 id="_5-1-依赖性" tabindex="-1"><a class="header-anchor" href="#_5-1-依赖性"><span>5.1. 依赖性</span></a></h3><p>让我们首先向我们的项目添加Spring Test依赖性：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.springframework\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`spring-test\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`5.3.25\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>\`test\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，如果使用Spring Boot，我们可以使用Spring Boot Starter Test依赖性来执行相同的操作。</p><h3 id="_5-2-测试用例" tabindex="-1"><a class="header-anchor" href="#_5-2-测试用例"><span>5.2. 测试用例</span></a></h3><p>接下来，让我们在我们的测试中使用这个类来启用模拟：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenNameChangedWithReflectionTestUtils_whenGetName_thenReturnName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">MockService</span> mockService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MockService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">ReflectionTestUtils</span><span class="token punctuation">.</span><span class="token function">setField</span><span class="token punctuation">(</span>mockService<span class="token punctuation">,</span> <span class="token string">&quot;person&quot;</span><span class="token punctuation">,</span> mockedPerson<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">when</span><span class="token punctuation">(</span>mockedPerson<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;Jane Doe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Jane Doe&quot;</span><span class="token punctuation">,</span> mockService<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_ReflectionTestUtils.setField()_方法来设置私有字段。在内部，这也使用Java反射API来设置字段，但去除了样板代码的需求。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们查看了使用Mockito模拟私有字段的不同方式。我们探索了Java反射API、JUnit 5和Spring Test来模拟私有字段。</p><p>如常，示例的代码可以在GitHub上找到。</p>`,42),o=[p];function c(i,l){return a(),s("div",null,o)}const r=n(e,[["render",c],["__file","2024-07-04-Mocking Private Fields With Mockito.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Mocking%20Private%20Fields%20With%20Mockito.html","title":"Mockito中模拟私有字段","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Mockito"],"tag":["私有字段","反射","JUnit"],"head":[["meta",{"name":"keywords","content":"Mockito, Java, 私有字段, 反射, 测试"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Mocking%20Private%20Fields%20With%20Mockito.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Mockito中模拟私有字段"}],["meta",{"property":"og:description","content":"Mockito中模拟私有字段 在本教程中，我们将学习如何在Mockito中模拟私有字段。Mockito是一个流行的模拟框架，通常与JUnit一起在Java中用于创建模拟对象。它本身不支持模拟私有字段；然而，我们可以使用不同的方法来模拟Mockito中的私有字段。 让我们来检查其中的一些方法。 2. 项目设置 我们将通过创建示例中使用的类来开始。我们将创..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T18:39:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"私有字段"}],["meta",{"property":"article:tag","content":"反射"}],["meta",{"property":"article:tag","content":"JUnit"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T18:39:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mockito中模拟私有字段\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T18:39:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Mockito中模拟私有字段 在本教程中，我们将学习如何在Mockito中模拟私有字段。Mockito是一个流行的模拟框架，通常与JUnit一起在Java中用于创建模拟对象。它本身不支持模拟私有字段；然而，我们可以使用不同的方法来模拟Mockito中的私有字段。 让我们来检查其中的一些方法。 2. 项目设置 我们将通过创建示例中使用的类来开始。我们将创..."},"headers":[{"level":2,"title":"2. 项目设置","slug":"_2-项目设置","link":"#_2-项目设置","children":[{"level":3,"title":"2.1. 源代码类","slug":"_2-1-源代码类","link":"#_2-1-源代码类","children":[]},{"level":3,"title":"2.2. 测试类","slug":"_2-2-测试类","link":"#_2-2-测试类","children":[]}]},{"level":2,"title":"3. 使用Java反射API启用模拟","slug":"_3-使用java反射api启用模拟","link":"#_3-使用java反射api启用模拟","children":[]},{"level":2,"title":"4. 使用JUnit 5启用模拟","slug":"_4-使用junit-5启用模拟","link":"#_4-使用junit-5启用模拟","children":[]},{"level":2,"title":"5. 使用Spring Test启用模拟","slug":"_5-使用spring-test启用模拟","link":"#_5-使用spring-test启用模拟","children":[{"level":3,"title":"5.1. 依赖性","slug":"_5-1-依赖性","link":"#_5-1-依赖性","children":[]},{"level":3,"title":"5.2. 测试用例","slug":"_5-2-测试用例","link":"#_5-2-测试用例","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720118363000,"updatedTime":1720118363000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4,"words":1199},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Mocking Private Fields With Mockito.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Mockito中模拟私有字段</h1>\\n<p>在本教程中，我们将学习如何在Mockito中模拟私有字段。Mockito是一个流行的模拟框架，通常与JUnit一起在Java中用于创建模拟对象。它本身不支持模拟私有字段；然而，我们可以使用不同的方法来模拟Mockito中的私有字段。\\n让我们来检查其中的一些方法。</p>\\n<h2>2. 项目设置</h2>\\n<p>我们将通过创建示例中使用的类来开始。我们将创建一个带有私有字段的类和一个测试类来测试它。</p>\\n<h3>2.1. 源代码类</h3>\\n<p>首先，我们将创建一个带有私有字段的简单类：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">MockService</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">Person</span> person <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Person</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"John Doe\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">String</span> <span class=\\"token function\\">getName</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> person<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getName</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
