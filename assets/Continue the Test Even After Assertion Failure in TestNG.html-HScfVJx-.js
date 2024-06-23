import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CngNs9d-.js";const e={},p=t(`<h1 id="testng中在断言失败后继续测试-baeldung" tabindex="-1"><a class="header-anchor" href="#testng中在断言失败后继续测试-baeldung"><span>TestNG中在断言失败后继续测试 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>TestNG是一个流行的Java测试框架，它是JUnit的替代品。虽然两个框架都提供了自己的范例，但它们都有断言的概念：如果逻辑语句评估为false，则会停止程序执行，测试失败。TestNG中的一个简单断言可能看起来像这样：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">testNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span><span class="token string">&quot;My String&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但如果我们需要在单个测试中进行多个断言呢？<strong>在本文中，我们将探讨TestNG的_SoftAssert_，这是一种一起执行多个断言的技术。</strong></p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>为了我们的练习，让我们定义一个简单的_Book_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> isbn<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>

    <span class="token comment">// 标准getter和setter...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还可以定义一个接口，模拟一个基于ISBN查找_Book_的简单服务：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">interface</span> <span class="token class-name">BookService</span> <span class="token punctuation">{</span>
    <span class="token class-name">Book</span> <span class="token function">getBook</span><span class="token punctuation">(</span><span class="token class-name">String</span> isbn<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们可以在单元测试中模拟这个服务，我们将在后面定义。这个设置让我们可以以现实的方式定义一个场景进行测试：一个服务返回的对象可能是null或者其成员变量可能是null。让我们开始为这个编写单元测试。</p><h2 id="_3-基本断言与testng的-softassert" tabindex="-1"><a class="header-anchor" href="#_3-基本断言与testng的-softassert"><span>3. 基本断言与TestNG的_SoftAssert_</span></a></h2><p>为了说明_SoftAssert_的好处，我们将首先使用失败的基本TestNG断言创建一个单元测试，并比较我们得到的反馈与使用_SoftAssert_的相同测试。</p><h3 id="_3-1-使用传统断言" tabindex="-1"><a class="header-anchor" href="#_3-1-使用传统断言"><span>3.1. 使用传统断言</span></a></h3><p>首先，我们将使用_assertNotNull()_创建一个测试，它接受一个要测试的值和一个可选的消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenBook_whenCheckingFields_thenAssertNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Book</span> gatsby <span class="token operator">=</span> bookService<span class="token punctuation">.</span><span class="token function">getBook</span><span class="token punctuation">(</span><span class="token string">&quot;9780743273565&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>gatsby<span class="token punctuation">.</span>isbn<span class="token punctuation">,</span> <span class="token string">&quot;ISBN&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>gatsby<span class="token punctuation">.</span>title<span class="token punctuation">,</span> <span class="token string">&quot;title&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>gatsby<span class="token punctuation">.</span>author<span class="token punctuation">,</span> <span class="token string">&quot;author&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们将定义一个使用Mockito的_BookService_的模拟实现，它返回一个_Book_实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@BeforeMethod</span>
<span class="token keyword">void</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    bookService <span class="token operator">=</span> <span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">BookService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Book</span> book <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">when</span><span class="token punctuation">(</span>bookService<span class="token punctuation">.</span><span class="token function">getBook</span><span class="token punctuation">(</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行我们的测试，我们可以看到我们忽略了设置_isbn_字段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>AssertionError</span><span class="token operator">:</span> <span class="token constant">ISBN</span> expected object <span class="token keyword">to</span> <span class="token namespace">not</span> be <span class="token keyword">null</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们在我们的模拟中修复这个问题，然后再次运行测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@BeforeMethod</span> <span class="token keyword">void</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    bookService <span class="token operator">=</span> <span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">BookService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Book</span> book <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    book<span class="token punctuation">.</span><span class="token function">setIsbn</span><span class="token punctuation">(</span><span class="token string">&quot;9780743273565&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">when</span><span class="token punctuation">(</span>bookService<span class="token punctuation">.</span><span class="token function">getBook</span><span class="token punctuation">(</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在收到了一个不同的错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>AssertionError</span><span class="token operator">:</span> title expected object <span class="token keyword">to</span> <span class="token namespace">not</span> be <span class="token keyword">null</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>再次，我们在模拟中忘记了初始化字段，导致另一个必要的更改。</p><p>正如我们所看到的，<strong>这种测试、更改和重新运行测试的循环不仅令人沮丧，而且耗时</strong>。当然，这个效果会随着类的规模和复杂性的增加而倍增。在集成测试中，远程部署环境中的故障可能很难或无法本地重现。集成测试通常更复杂，因此执行时间更长。再加上部署测试更改所需的时间，意味着每次额外测试重新运行的周期时间成本很高。</p><p>幸运的是，<strong>我们可以通过使用_SoftAssert_来评估多个断言而不立即停止程序执行来避免这个问题。</strong></p><h3 id="_3-2-使用-softassert-进行断言分组" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-softassert-进行断言分组"><span>3.2. 使用_SoftAssert_进行断言分组</span></a></h3><p>让我们更新上面的例子，使用_SoftAssert_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span> <span class="token keyword">void</span> <span class="token function">givenBook_whenCheckingFields_thenAssertNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Book</span> gatsby <span class="token operator">=</span> bookService<span class="token punctuation">.</span><span class="token function">getBook</span><span class="token punctuation">(</span><span class="token string">&quot;9780743273565&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">SoftAssert</span> softAssert <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SoftAssert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    softAssert<span class="token punctuation">.</span><span class="token function">assertNotNull</span><span class="token punctuation">(</span>gatsby<span class="token punctuation">.</span>isbn<span class="token punctuation">,</span> <span class="token string">&quot;ISBN&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    softAssert<span class="token punctuation">.</span><span class="token function">assertNotNull</span><span class="token punctuation">(</span>gatsby<span class="token punctuation">.</span>title<span class="token punctuation">,</span> <span class="token string">&quot;title&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    softAssert<span class="token punctuation">.</span><span class="token function">assertNotNull</span><span class="token punctuation">(</span>gatsby<span class="token punctuation">.</span>author<span class="token punctuation">,</span> <span class="token string">&quot;author&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    softAssert<span class="token punctuation">.</span><span class="token function">assertAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们分解一下：</p><ul><li>首先，我们创建一个_SoftAssert_的实例</li><li>接下来，我们进行一个关键的更改：<strong>我们对_SoftAssert_实例进行断言</strong>，而不是使用TestNG的基本_assertNonNull()_方法</li><li>最后，同样重要的是要注意，一旦我们准备好获取我们所有断言的结果，我们需要调用_SoftAssert_实例上的_assertAll()_方法</li></ul><p>现在，如果我们用我们最初的模拟运行这个测试，忽略了为_Book_设置任何成员变量值，我们将看到一个包含所有断言失败的单一错误消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>AssertionError</span><span class="token operator">:</span> <span class="token class-name">The</span> following asserts failed<span class="token operator">:</span>
    <span class="token constant">ISBN</span> expected object <span class="token keyword">to</span> <span class="token namespace">not</span> be <span class="token keyword">null</span><span class="token punctuation">,</span>
    title expected object <span class="token keyword">to</span> <span class="token namespace">not</span> be <span class="token keyword">null</span><span class="token punctuation">,</span>
    author expected object <span class="token keyword">to</span> <span class="token namespace">not</span> be <span class="token keyword">null</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这展示了当单个测试需要多个断言时，使用_SoftAssert_是一个好习惯。</p><h3 id="_3-3-softassert-的考虑事项" tabindex="-1"><a class="header-anchor" href="#_3-3-softassert-的考虑事项"><span>3.3. _SoftAssert_的考虑事项</span></a></h3><p>虽然_SoftAssert_很容易设置和使用，但有一个重要的考虑事项需要记住：有状态性。因为_SoftAssert_在内部记录每个断言的失败，所以它不适合在多个测试方法之间共享。因此，<strong>我们应该确保在每个测试方法中创建一个新的_SoftAssert_实例。</strong></p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本教程中，我们学习了如何使用TestNG的_SoftAssert_进行多个断言，以及这如何成为编写干净测试并减少调试时间的有价值工具。我们还了解到_SoftAssert_是有状态的，实例不应该在多个测试之间共享。</p><p>如常，所有的代码都可以在GitHub上找到。</p><p>发表文章后的30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,41),o=[p];function c(l,i){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","Continue the Test Even After Assertion Failure in TestNG.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/Continue%20the%20Test%20Even%20After%20Assertion%20Failure%20in%20TestNG.html","title":"TestNG中在断言失败后继续测试 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-18T00:00:00.000Z","category":["Java","Testing"],"tag":["TestNG","SoftAssert"],"description":"TestNG中在断言失败后继续测试 | Baeldung 1. 概述 TestNG是一个流行的Java测试框架，它是JUnit的替代品。虽然两个框架都提供了自己的范例，但它们都有断言的概念：如果逻辑语句评估为false，则会停止程序执行，测试失败。TestNG中的一个简单断言可能看起来像这样： 但如果我们需要在单个测试中进行多个断言呢？在本文中，我们将...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Continue%20the%20Test%20Even%20After%20Assertion%20Failure%20in%20TestNG.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"TestNG中在断言失败后继续测试 | Baeldung"}],["meta",{"property":"og:description","content":"TestNG中在断言失败后继续测试 | Baeldung 1. 概述 TestNG是一个流行的Java测试框架，它是JUnit的替代品。虽然两个框架都提供了自己的范例，但它们都有断言的概念：如果逻辑语句评估为false，则会停止程序执行，测试失败。TestNG中的一个简单断言可能看起来像这样： 但如果我们需要在单个测试中进行多个断言呢？在本文中，我们将..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"TestNG"}],["meta",{"property":"article:tag","content":"SoftAssert"}],["meta",{"property":"article:published_time","content":"2024-06-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"TestNG中在断言失败后继续测试 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[]},{"level":2,"title":"3. 基本断言与TestNG的_SoftAssert_","slug":"_3-基本断言与testng的-softassert","link":"#_3-基本断言与testng的-softassert","children":[{"level":3,"title":"3.1. 使用传统断言","slug":"_3-1-使用传统断言","link":"#_3-1-使用传统断言","children":[]},{"level":3,"title":"3.2. 使用_SoftAssert_进行断言分组","slug":"_3-2-使用-softassert-进行断言分组","link":"#_3-2-使用-softassert-进行断言分组","children":[]},{"level":3,"title":"3.3. _SoftAssert_的考虑事项","slug":"_3-3-softassert-的考虑事项","link":"#_3-3-softassert-的考虑事项","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.19,"words":1258},"filePathRelative":"posts/baeldung/Archive/Continue the Test Even After Assertion Failure in TestNG.md","localizedDate":"2024年6月18日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>TestNG是一个流行的Java测试框架，它是JUnit的替代品。虽然两个框架都提供了自己的范例，但它们都有断言的概念：如果逻辑语句评估为false，则会停止程序执行，测试失败。TestNG中的一个简单断言可能看起来像这样：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">testNotNull</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function\\">assertNotNull</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"My String\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
