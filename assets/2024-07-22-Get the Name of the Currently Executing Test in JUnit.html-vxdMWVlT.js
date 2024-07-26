import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-8nJ1rqSf.js";const e={},p=t(`<h1 id="在junit中获取当前执行测试的名称" tabindex="-1"><a class="header-anchor" href="#在junit中获取当前执行测试的名称"><span>在JUnit中获取当前执行测试的名称</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在使用JUnit时，我们可能需要让我们的测试能够访问它们的名称。这可能有助于错误消息的生成，特别是对于具有系统生成名称的测试。</p><p>在这个简短的教程中，我们将看看如何在JUnit 4和JUnit 5中获取当前测试用例的名称。</p><h2 id="_2-junit-5-方法" tabindex="-1"><a class="header-anchor" href="#_2-junit-5-方法"><span>2. JUnit 5 方法</span></a></h2><p>让我们看两个场景。首先，我们将看到如何获取单个测试的名称。这个名称通常是可预测的，因为它可能是函数的名称或_@DisplayName_注解的值。然而，如果我们使用参数化测试或显示名称生成器，那么我们可能需要知道JUnit提供的名称。</p><p><strong>JUnit 5可以将一个_TestInfo_对象注入到我们的测试中</strong>，以显示当前测试用例的名称。</p><h3 id="_2-1-单个测试" tabindex="-1"><a class="header-anchor" href="#_2-1-单个测试"><span>2.1. 单个测试</span></a></h3><p>让我们将一个_TestInfo_对象注入到我们的测试函数中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenNumbers_whenOddCheck_thenVerify</span><span class="token punctuation">(</span><span class="token class-name">TestInfo</span> testInfo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;displayName = &quot;</span> <span class="token operator">+</span> testInfo<span class="token punctuation">.</span><span class="token function">getDisplayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> number <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">oddCheck</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用了接口_TestInfo_的**_getDisplayName_方法来显示测试的名称**。当我们运行测试时，我们得到了测试名称：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>displayName = givenNumbers_whenOddCheck_thenVerify(TestInfo)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-2-参数化测试" tabindex="-1"><a class="header-anchor" href="#_2-2-参数化测试"><span>2.2. 参数化测试</span></a></h3><p>让我们尝试使用参数化测试。这里我们将使用_@ParameterizedTest_注解的_name_字段来描述JUnit如何为我们生成测试名称：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">TestInfo</span> testInfo<span class="token punctuation">;</span>

<span class="token annotation punctuation">@BeforeEach</span>
<span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token class-name">TestInfo</span> testInfo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>testInfo <span class="token operator">=</span> testInfo<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@ParameterizedTest</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;givenNumbers_whenOddCheck_thenVerify{0}&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ValueSource</span><span class="token punctuation">(</span>ints <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">15</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenNumbers_whenOddCheck_thenVerify</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;displayName = &quot;</span> <span class="token operator">+</span> testInfo<span class="token punctuation">.</span><span class="token function">getDisplayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">oddCheck</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意到，与单个测试不同，我们不能将_TestInfo_注入到函数中。这是因为函数参数必须与参数化数据相关。为了解决这个问题，我们需要通过_beforeEach_方法将_TestInfo_存储在测试类的字段中。</p><p>当我们运行测试时，我们得到了测试名称：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>displayName = givenNumbers_whenOddCheck_thenVerify5
displayName = givenNumbers_whenOddCheck_thenVerify-3
displayName = givenNumbers_whenOddCheck_thenVerify3
displayName = givenNumbers_whenOddCheck_thenVerify1
displayName = givenNumbers_whenOddCheck_thenVerify15
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-junit-4-方法" tabindex="-1"><a class="header-anchor" href="#_3-junit-4-方法"><span>3. JUnit 4 方法</span></a></h2><p><strong>JUnit 4可以在我们的测试中填充一个_TestName_对象</strong>。_TestName_是JUnit的一个规则，规则是作为JUnit测试执行的一部分执行的，沿途显示当前运行测试的详细信息。</p><h3 id="_3-1-单个测试" tabindex="-1"><a class="header-anchor" href="#_3-1-单个测试"><span>3.1. 单个测试</span></a></h3><p>让我们考虑一个单个测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Rule</span>
<span class="token keyword">public</span> <span class="token class-name">TestName</span> name <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TestName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenString_whenSort_thenVerifySortForString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;displayName = &quot;</span> <span class="token operator">+</span> name<span class="token punctuation">.</span><span class="token function">getMethodName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token string">&quot;abc&quot;</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token function">sortCharacters</span><span class="token punctuation">(</span><span class="token string">&quot;cba&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，我们可以使用类_TestName_的**_getMethodName_方法来显示测试的名称**。</p><p>让我们运行测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>displayName = givenString_whenSort_thenVerifySortForString
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-2-参数化测试" tabindex="-1"><a class="header-anchor" href="#_3-2-参数化测试"><span>3.2. 参数化测试</span></a></h3><p>现在让我们使用相同的方法来显示为参数化测试生成的测试名称。首先，我们需要使用特殊的测试运行器注释测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RunWith</span><span class="token punctuation">(</span><span class="token class-name">Parameterized</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JUnit4ParameterizedTestNameUnitTest</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们可以实施测试，同时使用_TestName_规则以及字段和构造函数来分配当前测试的参数值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Rule</span>
<span class="token keyword">public</span> <span class="token class-name">TestName</span> name <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TestName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">String</span> input<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">String</span> expected<span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token class-name">JUnit4ParameterizedTestNameUnitTest</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">,</span> <span class="token class-name">String</span> expected<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>input <span class="token operator">=</span> input<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>expected <span class="token operator">=</span> expected<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Parameterized.Parameters</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;{0}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Collection</span>\`<span class="token operator">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>\` <span class="token function">suppliedData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
      <span class="token punctuation">{</span> <span class="token string">&quot;abc&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;abc&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token string">&quot;cba&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;abc&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token string">&quot;onm&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;mno&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token string">&quot;zyx&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;xyz&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenString_whenSort_thenVerifySortForString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;displayName = &quot;</span> <span class="token operator">+</span> name<span class="token punctuation">.</span><span class="token function">getMethodName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> <span class="token function">sortCharacters</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们提供了包含输入字符串和预期字符串的测试数据_Collection_。这是通过带有_@Parameterized.Parameters_注解的_suppliedData_函数完成的。这个注解还允许我们描述测试名称。</p><p>当我们运行测试时，_TestName_规则为我们提供了每个测试的名称，让我们可以看到：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>displayName = givenString_whenSort_thenVerifySortForString[abc]
displayName = givenString_whenSort_thenVerifySortForString[cba]
displayName = givenString_whenSort_thenVerifySortForString[onm]
displayName = givenString_whenSort_thenVerifySortForString[a]
displayName = givenString_whenSort_thenVerifySortForString[zyx]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在这篇文章中，我们讨论了如何在JUnit 4和5中找到当前测试的名称。</p><p>我们看到了如何为单个测试和参数化测试做到这一点。</p><p>像往常一样，完整的源代码可以在GitHub上找到。</p>`,39),i=[p];function o(c,l){return s(),a("div",null,i)}const d=n(e,[["render",o],["__file","2024-07-22-Get the Name of the Currently Executing Test in JUnit.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-Get%20the%20Name%20of%20the%20Currently%20Executing%20Test%20in%20JUnit.html","title":"在JUnit中获取当前执行测试的名称","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["JUnit","Testing"],"tag":["JUnit 4","JUnit 5","Test Case"],"head":[["meta",{"name":"keywords","content":"JUnit, Test Case, TestName, TestInfo, Parameterized Test"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-Get%20the%20Name%20of%20the%20Currently%20Executing%20Test%20in%20JUnit.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在JUnit中获取当前执行测试的名称"}],["meta",{"property":"og:description","content":"在JUnit中获取当前执行测试的名称 1. 概述 在使用JUnit时，我们可能需要让我们的测试能够访问它们的名称。这可能有助于错误消息的生成，特别是对于具有系统生成名称的测试。 在这个简短的教程中，我们将看看如何在JUnit 4和JUnit 5中获取当前测试用例的名称。 2. JUnit 5 方法 让我们看两个场景。首先，我们将看到如何获取单个测试的名..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T13:57:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JUnit 4"}],["meta",{"property":"article:tag","content":"JUnit 5"}],["meta",{"property":"article:tag","content":"Test Case"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T13:57:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在JUnit中获取当前执行测试的名称\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T13:57:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在JUnit中获取当前执行测试的名称 1. 概述 在使用JUnit时，我们可能需要让我们的测试能够访问它们的名称。这可能有助于错误消息的生成，特别是对于具有系统生成名称的测试。 在这个简短的教程中，我们将看看如何在JUnit 4和JUnit 5中获取当前测试用例的名称。 2. JUnit 5 方法 让我们看两个场景。首先，我们将看到如何获取单个测试的名..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. JUnit 5 方法","slug":"_2-junit-5-方法","link":"#_2-junit-5-方法","children":[{"level":3,"title":"2.1. 单个测试","slug":"_2-1-单个测试","link":"#_2-1-单个测试","children":[]},{"level":3,"title":"2.2. 参数化测试","slug":"_2-2-参数化测试","link":"#_2-2-参数化测试","children":[]}]},{"level":2,"title":"3. JUnit 4 方法","slug":"_3-junit-4-方法","link":"#_3-junit-4-方法","children":[{"level":3,"title":"3.1. 单个测试","slug":"_3-1-单个测试","link":"#_3-1-单个测试","children":[]},{"level":3,"title":"3.2. 参数化测试","slug":"_3-2-参数化测试","link":"#_3-2-参数化测试","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721656679000,"updatedTime":1721656679000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.29,"words":988},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-Get the Name of the Currently Executing Test in JUnit.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在使用JUnit时，我们可能需要让我们的测试能够访问它们的名称。这可能有助于错误消息的生成，特别是对于具有系统生成名称的测试。</p>\\n<p>在这个简短的教程中，我们将看看如何在JUnit 4和JUnit 5中获取当前测试用例的名称。</p>\\n<h2>2. JUnit 5 方法</h2>\\n<p>让我们看两个场景。首先，我们将看到如何获取单个测试的名称。这个名称通常是可预测的，因为它可能是函数的名称或_@DisplayName_注解的值。然而，如果我们使用参数化测试或显示名称生成器，那么我们可能需要知道JUnit提供的名称。</p>\\n<p><strong>JUnit 5可以将一个_TestInfo_对象注入到我们的测试中</strong>，以显示当前测试用例的名称。</p>","autoDesc":true}');export{d as comp,k as data};
