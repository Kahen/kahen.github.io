import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-Bp_dtxf0.js";const e={},p=t(`<hr><h1 id="解决mockito中的模糊方法调用错误" tabindex="-1"><a class="header-anchor" href="#解决mockito中的模糊方法调用错误"><span>解决Mockito中的模糊方法调用错误</span></a></h1><p>在本教程中，我们将了解如何在Mockito框架的特定上下文中避免模糊方法调用。</p><p>在Java中，方法重载允许一个类拥有多个具有相同名称但不同参数的方法。当编译器无法根据提供的参数确定要调用的具体方法时，就会发生模糊方法调用。</p><h2 id="_2-mockito的-argumentmatchers-介绍" tabindex="-1"><a class="header-anchor" href="#_2-mockito的-argumentmatchers-介绍"><span>2. Mockito的_ArgumentMatchers_介绍</span></a></h2><p>Mockito是一个用于单元测试Java应用程序的模拟框架。您可以在Maven中央仓库中找到该库的最新版本。让我们将依赖项添加到我们的_pom.xml_中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.mockito\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`mockito-core\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`5.11.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>\`test\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_ArgumentMatchers_是Mockito框架的一部分：得益于它们，我们可以在参数匹配给定条件时指定模拟方法的行为。</strong></p><h2 id="_3-重载方法定义" tabindex="-1"><a class="header-anchor" href="#_3-重载方法定义"><span>3. 重载方法定义</span></a></h2><p>首先，让我们定义一个接受_Integer_作为参数并总是返回_1_作为结果的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Integer</span> <span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了我们的演示，我们希望我们的重载方法使用自定义类型。因此，让我们定义这个虚拟类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">MyOwnType</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在我们可以添加一个接受_MyOwnType_对象作为参数并总是返回_baeldung_作为结果的重载_myMethod()_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token class-name">MyOwnType</span> myOwnType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>直观地说，如果我们向_myMethod()_传递一个_null_参数，编译器将不知道应该使用哪个版本。</strong> 此外，我们可以注意到方法的返回类型对这个问题没有影响。</p><h2 id="_4-使用-isnull-的模糊调用" tabindex="-1"><a class="header-anchor" href="#_4-使用-isnull-的模糊调用"><span>4. 使用_isNull()_的模糊调用</span></a></h2><p>让我们尝试使用基本的_isNull()_ _ArgumentMatcher_来模拟一个带有null参数的_myMethod()_调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenMockedMyMethod_whenMyMethod_ThenMockedResult</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Mock</span> <span class="token class-name">MyClass</span> myClass<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">when</span><span class="token punctuation">(</span>myClass<span class="token punctuation">.</span><span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token function">isNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设我们调用定义_myMethod()<em>的类_MyClass</em>，我们通过测试方法的参数漂亮地注入了一个模拟的_MyClass_对象。我们还可以注意到我们还没有向测试添加任何断言。让我们运行这段代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>Error</span><span class="token operator">:</span> <span class="token class-name">Unresolved</span> compilation问题<span class="token operator">:</span>
<span class="token class-name">The</span> method <span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">)</span> is ambiguous <span class="token keyword">for</span> the type <span class="token class-name">MyClass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所见，编译器无法决定使用哪个版本的_myMethod()<em>，因此抛出了一个错误。让我们强调，编译器的决定仅基于方法参数。由于我们在指令中写入了_thenReturn(1)</em>，作为读者，我们可以猜测意图是使用返回_Integer_的_myMethod()_版本。然而，编译器在决策过程中不会使用指令的这一部分。</p><p><strong>要解决这个问题，我们需要使用接受类作为参数的重载_isNull()_ <em>ArgumentMatcher</em>。</strong> 例如，要告诉编译器它应该使用以_Integer_作为参数的版本，我们可以这样写：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenMockedMyMethod_whenMyMethod_ThenMockedResult</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Mock</span> <span class="token class-name">MyClass</span> myClass<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">when</span><span class="token punctuation">(</span>myClass<span class="token punctuation">.</span><span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token function">isNull</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> myClass<span class="token punctuation">.</span><span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">)</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们添加了一个断言来完成测试，现在它成功运行了。同样，我们可以修改我们的测试以使用方法的另一个版本：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenCorrectlyMockedNullMatcher_whenMyMethod_ThenMockedResult</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Mock</span> <span class="token class-name">MyClass</span> myClass<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">when</span><span class="token punctuation">(</span>myClass<span class="token punctuation">.</span><span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token function">isNull</span><span class="token punctuation">(</span><span class="token class-name">MyOwnType</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">,</span> myClass<span class="token punctuation">.</span><span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">MyOwnType</span><span class="token punctuation">)</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们注意到我们在断言中的_myMethod()_调用中也需要给出null的类型。否则，也会因为同样的原因抛出错误！</p><h2 id="_5-使用-any-的模糊调用" tabindex="-1"><a class="header-anchor" href="#_5-使用-any-的模糊调用"><span>5. 使用_any()_的模糊调用</span></a></h2><p>同样，我们可以尝试使用_any()_ _ArgumentMatcher_来模拟一个接受任何参数的_myMethod()_调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenMockedMyMethod_whenMyMethod_ThenMockedResult</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Mock</span> <span class="token class-name">MyClass</span> myClass<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">when</span><span class="token punctuation">(</span>myClass<span class="token punctuation">.</span><span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次运行这段代码，结果是一个模糊方法调用错误。我们在前一个案例中提出的所有评论在这里仍然有效。特别是，编译器在查看_thenReturn()_方法的参数之前就失败了。</p><p>解决方案也是类似的：<strong>我们需要使用一个明确说明预期参数类型的_any()_ _ArgumentMatcher_版本：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenMockedMyMethod_whenMyMethod_ThenMockedResult</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Mock</span> <span class="token class-name">MyClass</span> myClass<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">when</span><span class="token punctuation">(</span>myClass<span class="token punctuation">.</span><span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token function">anyInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> myClass<span class="token punctuation">.</span><span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大多数基本Java类型已经为这个目的定义了Mockito方法。在我们的案例中，_anyInt()_方法将接受任何_Integer_参数。另一方面，_myMethod()<em>的另一个版本接受我们的自定义_MyOwnType_类型的参数。因此，我们需要使用接受对象类型作为参数的重载版本_any()</em> <em>ArgumentMatcher</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenCorrectlyMockedNullMatcher_whenMyMethod_ThenMockedResult</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Mock</span> <span class="token class-name">MyClass</span> myClass<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">when</span><span class="token punctuation">(</span>myClass<span class="token punctuation">.</span><span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token class-name">MyOwnType</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">,</span> myClass<span class="token punctuation">.</span><span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">MyOwnType</span><span class="token punctuation">)</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们的测试工作正常：我们成功地消除了模糊方法调用错误！</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们了解了为什么在使用Mockito框架时可能会遇到模糊方法调用错误。此外，我们展示了解决问题的方案。在现实生活中，当我们拥有大量参数的重载方法时，这种问题最有可能发生，我们决定使用约束性较低的_isNull()<em>或_any()</em> <em>ArgumentMatcher</em>，因为某些参数的值与我们的测试无关。在简单的情况下，大多数现代IDE甚至在我们运行测试之前就能指出问题。</p><p>如常，代码可以在GitHub上找到。</p>`,39),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-20-Fix Ambiguous Method Call Error in Mockito.html.vue"]]),r=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Fix%20Ambiguous%20Method%20Call%20Error%20in%20Mockito.html","title":"解决Mockito中的模糊方法调用错误","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Java","Mockito"],"tag":["Ambiguous Method Call","Mockito","Unit Testing"],"head":[["meta",{"name":"keywords","content":"Mockito, Ambiguous Method Call, Unit Testing, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Fix%20Ambiguous%20Method%20Call%20Error%20in%20Mockito.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"解决Mockito中的模糊方法调用错误"}],["meta",{"property":"og:description","content":"解决Mockito中的模糊方法调用错误 在本教程中，我们将了解如何在Mockito框架的特定上下文中避免模糊方法调用。 在Java中，方法重载允许一个类拥有多个具有相同名称但不同参数的方法。当编译器无法根据提供的参数确定要调用的具体方法时，就会发生模糊方法调用。 2. Mockito的_ArgumentMatchers_介绍 Mockito是一个用于单..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Ambiguous Method Call"}],["meta",{"property":"article:tag","content":"Mockito"}],["meta",{"property":"article:tag","content":"Unit Testing"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"解决Mockito中的模糊方法调用错误\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"解决Mockito中的模糊方法调用错误 在本教程中，我们将了解如何在Mockito框架的特定上下文中避免模糊方法调用。 在Java中，方法重载允许一个类拥有多个具有相同名称但不同参数的方法。当编译器无法根据提供的参数确定要调用的具体方法时，就会发生模糊方法调用。 2. Mockito的_ArgumentMatchers_介绍 Mockito是一个用于单..."},"headers":[{"level":2,"title":"2. Mockito的_ArgumentMatchers_介绍","slug":"_2-mockito的-argumentmatchers-介绍","link":"#_2-mockito的-argumentmatchers-介绍","children":[]},{"level":2,"title":"3. 重载方法定义","slug":"_3-重载方法定义","link":"#_3-重载方法定义","children":[]},{"level":2,"title":"4. 使用_isNull()_的模糊调用","slug":"_4-使用-isnull-的模糊调用","link":"#_4-使用-isnull-的模糊调用","children":[]},{"level":2,"title":"5. 使用_any()_的模糊调用","slug":"_5-使用-any-的模糊调用","link":"#_5-使用-any-的模糊调用","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.37,"words":1311},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Fix Ambiguous Method Call Error in Mockito.md","localizedDate":"2024年6月20日","excerpt":"<hr>\\n<h1>解决Mockito中的模糊方法调用错误</h1>\\n<p>在本教程中，我们将了解如何在Mockito框架的特定上下文中避免模糊方法调用。</p>\\n<p>在Java中，方法重载允许一个类拥有多个具有相同名称但不同参数的方法。当编译器无法根据提供的参数确定要调用的具体方法时，就会发生模糊方法调用。</p>\\n<h2>2. Mockito的_ArgumentMatchers_介绍</h2>\\n<p>Mockito是一个用于单元测试Java应用程序的模拟框架。您可以在Maven中央仓库中找到该库的最新版本。让我们将依赖项添加到我们的_pom.xml_中：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`org.mockito`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`mockito-core`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`5.11.0`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>scope</span><span class=\\"token punctuation\\">&gt;</span></span>`test`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>scope</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n</code></pre></div>","autoDesc":true}');export{d as comp,r as data};
