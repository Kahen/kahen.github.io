import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-C4eFoh0f.js";const t={},p=e(`<h1 id="selenide简介" tabindex="-1"><a class="header-anchor" href="#selenide简介"><span>Selenide简介</span></a></h1><p>在本文中，我们将了解用于UI自动化测试的Selenide项目。我们将看到它是什么以及如何使用它来测试我们的UI项目。</p><h2 id="_2-selenide是什么" tabindex="-1"><a class="header-anchor" href="#_2-selenide是什么"><span>2. Selenide是什么？</span></a></h2><p>Selenide是一个建立在Selenium WebDriver之上的免费、开源框架。它为我们提供了执行web应用程序自动化测试的所有Selenium的强大功能。然而，它大大简化了，使我们只关注重要的事情。</p><p>特别是，Selenide将简化所有web浏览器的管理。它还会在测试失败时自动捕获浏览器窗口的截图。然后，它为我们提供了一个更加简化的API，用于与web浏览器交互，包括几个不直接从Selenium提供的函数，并简化了其他可用的函数。</p><h2 id="_3-入门" tabindex="-1"><a class="header-anchor" href="#_3-入门"><span>3. 入门</span></a></h2><p>让我们快速看一下使用Selenide的简单示例。</p><h3 id="_3-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_3-1-maven依赖"><span>3.1. Maven依赖</span></a></h3><p>在我们能做任何事情之前，我们需要将Selenide添加到我们的项目中。这是一个我们可以添加到我们的构建中的单一依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`com.codeborne\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`selenide\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`6.15.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>\`test\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最新版本可以在Maven中央仓库中找到。</p><p>这将自动拉取所有必要的内容，包括适当版本的Selenium WebDriver。</p><p>我们还需要已经有一个测试框架可用——例如，JUnit。这将被用来像往常一样编写我们的测试，Selenide只是我们可以在测试代码中使用的另一个库。</p><h3 id="_3-2-我们的第一次测试" tabindex="-1"><a class="header-anchor" href="#_3-2-我们的第一次测试"><span>3.2. 我们的第一次测试</span></a></h3><p>现在我们已经设置了依赖项，让我们编写一个测试。我们将做一个测试，检查Baeldung是否确实是在搜索引擎搜索时的第一个结果。</p><p>我们首先需要一些导入。我们不需要这些，但它们使代码更容易阅读：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token keyword">static</span> <span class="token import static"><span class="token namespace">com<span class="token punctuation">.</span>codeborne<span class="token punctuation">.</span>selenide<span class="token punctuation">.</span></span><span class="token class-name">Selenide</span><span class="token punctuation">.</span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token keyword">static</span> <span class="token import static"><span class="token namespace">com<span class="token punctuation">.</span>codeborne<span class="token punctuation">.</span>selenide<span class="token punctuation">.</span></span><span class="token class-name">Condition</span><span class="token punctuation">.</span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>openqa<span class="token punctuation">.</span>selenium<span class="token punctuation">.</span></span><span class="token class-name">By</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以编写我们的测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">searchBaeldung</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token keyword">open</span><span class="token punctuation">(</span><span class="token string">&quot;https://duckduckgo.com/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">SelenideElement</span> searchbox <span class="token operator">=</span> $<span class="token punctuation">(</span><span class="token class-name">By</span><span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span><span class="token string">&quot;searchbox_input&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    searchbox<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    searchbox<span class="token punctuation">.</span><span class="token function">sendKeys</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    searchbox<span class="token punctuation">.</span><span class="token function">pressEnter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">SelenideElement</span> firstResult <span class="token operator">=</span> $<span class="token punctuation">(</span><span class="token class-name">By</span><span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span><span class="token string">&quot;r1-0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    firstResult<span class="token punctuation">.</span><span class="token function">shouldHave</span><span class="token punctuation">(</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先要注意的是这里的内容很少。我们没有关于浏览器管理、等待加载或其他通常使这些测试变得复杂的事情。相反，我们在这里看到的所有内容都直接与所讨论的测试有关。</p><p>我们首先打开我们的网页。然后我们点击搜索框，输入我们的搜索词，并按回车。最后，我们定位到第一个结果（我们知道从页面的HTML中_r1-0_是给第一个结果的ID）并确保它具有预期的文本。</p><p>我们在这里看到的_$()<em>符号是我们查询浏览器页面的方式。这需要一个选择器并返回一个_代表整个页面中第一个匹配元素的SelenideElement。我们还有</em>$$()_它将返回所有匹配元素的集合。</p><p>一旦我们有了_，我们就可以继续使用相同的模式变得更具体——只是这次它将是_。SelenideElement.$<em>和</em>。SelenideElement.$$_我们使用它们。</p><p>一旦我们有了_，我们就可以开始与它交互——例如使用_()_、_sendKeys()_和_pressEnter()_等方法。</p><p>我们还可以使用_should()_、_shouldBe()_和_shouldHave()_来断言元素正如我们所期望的那样。这三种方法在功能上是相同的，只是措辞不同，只是为了使测试读起来更好——例如，_firstResult.should(text(&quot;Baeldung&quot;));_在功能上是相同的，但读起来不好。</p><h2 id="_4-页面对象" tabindex="-1"><a class="header-anchor" href="#_4-页面对象"><span>4. 页面对象</span></a></h2><p>页面对象是我们在UI测试中可以使用的有用模式。这涉及到编写类来封装整个网页或其部分。然后我们可以在测试中使用这些对象。好处在于，如果我们改变了页面的工作方式，我们只需要改变单个页面对象，使用它的每个测试就会自动正确。</p><p>毫不奇怪，Selenide允许我们像Selenium WebDriver一样轻松地使用页面对象模式。我们可以编写直接使用Selenide类的类，无论是通过使用_$_静态方法，允许我们与整个页面交互，还是通过包装一个_代表页面较小部分的SelenideElement值。</p><p>让我们使用这种模式重写我们最初的测试，看看它是什么样子的。首先，我们需要一个页面模型来表示搜索表单：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SearchFormPage</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Selenide</span><span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span><span class="token string">&quot;http://duckduckgo.com/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">search</span><span class="token punctuation">(</span><span class="token class-name">String</span> term<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SelenideElement</span> searchbox <span class="token operator">=</span> $<span class="token punctuation">(</span><span class="token class-name">By</span><span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span><span class="token string">&quot;searchbox_input&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        searchbox<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        searchbox<span class="token punctuation">.</span><span class="token function">sendKeys</span><span class="token punctuation">(</span>term<span class="token punctuation">)</span><span class="token punctuation">;</span>
        searchbox<span class="token punctuation">.</span><span class="token function">pressEnter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这有两个我们可以使用方法——一个用于打开搜索页面，一个用于实际执行搜索。</p><p>接下来，我们需要一个页面模型来表示搜索结果页面：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SearchResultsPage</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">SearchResult</span> <span class="token function">getResult</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SelenideElement</span> result <span class="token operator">=</span> $<span class="token punctuation">(</span><span class="token class-name">By</span><span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span><span class="token string">&quot;r1-&quot;</span> <span class="token operator">+</span> index<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">shouldBe</span><span class="token punctuation">(</span>visible<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SearchResult</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这为我们提供了一个获取单个结果的方法。这次返回了另一个页面对象，它包装了页面中的一个_。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SearchResult</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">SelenideElement</span> result<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">SearchResult</span><span class="token punctuation">(</span><span class="token class-name">SelenideElement</span> result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getText</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> result<span class="token punctuation">.</span><span class="token function">getText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后这个页面对象包装了那个_并允许我们准确地与它交互。在这种情况下，通过获取搜索结果的文本。</p><p>现在我们可以实际编写一个测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">searchBaeldung</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">SearchFormPage</span> searchFormPage <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SearchFormPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    searchFormPage<span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    searchFormPage<span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">SearchResultsPage</span> results <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SearchResultsPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">SearchResult</span> firstResult <span class="token operator">=</span> results<span class="token punctuation">.</span><span class="token function">getResult</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>firstResult<span class="token punctuation">.</span><span class="token function">getText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个测试和之前的一样，但现在我们正在用类来写它，这些类更好地解释了发生了什么。这使得测试对于那些不知道HTML是如何渲染的人来说更容易阅读。</p><p>它还使我们能够轻松地更改页面的交互方式。例如，如果查找单个搜索结果的方式发生了变化，那么我们只需要更改这里的_getResult()_方法，而不是单独更改许多不同的测试。</p><h2 id="_5-失败的测试" tabindex="-1"><a class="header-anchor" href="#_5-失败的测试"><span>5. 失败的测试</span></a></h2><p>我们在编写测试时的一个重要细节是能够轻松地识别它们失败的原因。如果没有这个，我们可能会花费大量的努力来确定出了什么问题。</p><p>让我们尝试改变我们最初的测试，使其失败。我们将通过调整它来搜索错误的术语来实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">SelenideElement</span> searchbox <span class="token operator">=</span> $<span class="token punctuation">(</span><span class="token class-name">By</span><span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span><span class="token string">&quot;searchbox_input&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
searchbox<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
searchbox<span class="token punctuation">.</span><span class="token function">sendKeys</span><span class="token punctuation">(</span><span class="token string">&quot;Something Else&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
searchbox<span class="token punctuation">.</span><span class="token function">pressEnter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>显然，运行这个测试会失败——搜索“Something Else”不会找到Baeldung作为第一个结果。但是，当它失败时是什么样子呢？</p><p>毫不奇怪，失败发生在我们的第一个断言上：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/07/2_Screenshot-2023-07-07-at-07.38.47.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>但实际的错误是什么样子的呢？</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/07/1_Screenshot-2023-07-07-at-07.54.04-1024x393.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>从这里，我们可以立即看到我们正在断言的确切HTML元素，以及它的确切值。在这种情况下，我们正在对文本内容进行断言，所以我们看到的就是这个。</p><p>但还有更多。**我们已经捕获了截图和页面源文件。**我们可以打开这些来查看错误发生时网页的确切状态：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/07/1_1688712818012.0-1024x516.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>立即查看这个截图，我们可以看到我们搜索了错误的东西，所以我们得到了错误的搜索结果。这可以帮助我们识别问题并轻松地修复测试。</p><p>或者，它实际上可能突出了应用程序的预期行为。在这种情况下，测试是好的，但已经识别了我们代码中的回归。</p><h2 id="_6-配置selenide" tabindex="-1"><a class="header-anchor" href="#_6-配置selenide"><span>6. 配置Selenide</span></a></h2><p>我们刚刚看到Selenide为失败的测试保存了截图。但它需要知道把截图放在哪里。</p><p>**Selenide开箱即用具有合理的默认行为。**例如，默认情况下，我们的截图存储在_build/reports/tests_中。</p><p>**然而，这些默认设置并不总是适用于每种情况，所以我们必须能够调整它们。**我们可以通过以下三种方式之一来做到这一点：</p><ul><li>使用属性文件</li><li>使用系统属性</li><li>在代码中以编程方式</li></ul><p>我们可以控制这些设置的最高优先级方式是在代码中。我们通过在测试期间更改_com.codeborne.selenide.Configuration_对象上的属性来实现。这可以直接在测试本身中完成，在_@BeforeEach_方法中，或者在任何执行适当时间的地方。所有这些属性都有JavaDoc解释它们的含义，以便我们可以正确地更改它们。</p><p>其次是使用系统属性。我们可以以我们为运行测试提供系统属性的标准方式提供这些属性。属性名称与_Configuration_类中的字段名称完全相同，只是加上了“<em>selenide.</em>”前缀。例如，<em>selenide.reportsFolder_对应于_Configuration.reportsFolder</em>。</p><p>最后，我们可以在类路径根目录下的_selenide.properties_文件中定义所有这些属性。例如，在maven项目中，这将位于_src/test/resources_。此文件具有与系统属性名称完全相同的属性，但它们存在于项目内部，而系统属性可以从外部指定——例如，由我们的CI系统指定。</p><p>这里最重要的属性是那些关于如何使用web浏览器以及存储文件的位置。例如，我们可以通过以下方式使用Firefox而不是Chrome：</p><ul><li>在我们的代码中以编程方式设置_Configuration.browser = “firefox”;_。</li><li>在命令行中添加_-Dselenide.browser=firefox_。</li><li>在_selenide.properties_文件中添加_selenide.browser=firefox_。</li></ul><p>这三种方式都将具有相同的效果。这意味着，例如，我们可以使用系统属性方法在CI构建中以各种不同的web浏览器运行完全相同的测试。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>**在这里，我们已经看到了Selenide库的介绍以及如何使用它来编写UI自动化测试。**下次你进行UI测试时，为什么不试试呢？</p><p>正如往常一样，我们可以在GitHub上找到本文的所有代码。</p><p><img src="https://www.baeldung.com/wp-content/uploads/2023/07/2_Screenshot-2023-07-07-at-07.38.47.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2023/07/1_Screenshot-2023-07-07-at-07.54.04-1024x393.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2023/07/1_1688712818012.0-1024x516.png" alt="img" loading="lazy"></p><p>OK</p>`,70),o=[p];function c(l,i){return a(),s("div",null,o)}const r=n(t,[["render",c],["__file","2024-07-03-Introduction to Selenide.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Introduction%20to%20Selenide.html","title":"Selenide简介","lang":"zh-CN","frontmatter":{"date":"2023-07-07T00:00:00.000Z","category":["Selenide","UI自动化测试"],"tag":["Selenide","Selenium WebDriver","UI测试"],"head":[["meta",{"name":"keywords","content":"Selenide, Selenium WebDriver, UI自动化测试"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Introduction%20to%20Selenide.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Selenide简介"}],["meta",{"property":"og:description","content":"Selenide简介 在本文中，我们将了解用于UI自动化测试的Selenide项目。我们将看到它是什么以及如何使用它来测试我们的UI项目。 2. Selenide是什么？ Selenide是一个建立在Selenium WebDriver之上的免费、开源框架。它为我们提供了执行web应用程序自动化测试的所有Selenium的强大功能。然而，它大大简化了，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/07/2_Screenshot-2023-07-07-at-07.38.47.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T07:30:26.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Selenide"}],["meta",{"property":"article:tag","content":"Selenium WebDriver"}],["meta",{"property":"article:tag","content":"UI测试"}],["meta",{"property":"article:published_time","content":"2023-07-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T07:30:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Selenide简介\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/07/2_Screenshot-2023-07-07-at-07.38.47.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/07/1_Screenshot-2023-07-07-at-07.54.04-1024x393.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/07/1_1688712818012.0-1024x516.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/07/2_Screenshot-2023-07-07-at-07.38.47.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/07/1_Screenshot-2023-07-07-at-07.54.04-1024x393.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/07/1_1688712818012.0-1024x516.png\\"],\\"datePublished\\":\\"2023-07-07T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T07:30:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Selenide简介 在本文中，我们将了解用于UI自动化测试的Selenide项目。我们将看到它是什么以及如何使用它来测试我们的UI项目。 2. Selenide是什么？ Selenide是一个建立在Selenium WebDriver之上的免费、开源框架。它为我们提供了执行web应用程序自动化测试的所有Selenium的强大功能。然而，它大大简化了，..."},"headers":[{"level":2,"title":"2. Selenide是什么？","slug":"_2-selenide是什么","link":"#_2-selenide是什么","children":[]},{"level":2,"title":"3. 入门","slug":"_3-入门","link":"#_3-入门","children":[{"level":3,"title":"3.1. Maven依赖","slug":"_3-1-maven依赖","link":"#_3-1-maven依赖","children":[]},{"level":3,"title":"3.2. 我们的第一次测试","slug":"_3-2-我们的第一次测试","link":"#_3-2-我们的第一次测试","children":[]}]},{"level":2,"title":"4. 页面对象","slug":"_4-页面对象","link":"#_4-页面对象","children":[]},{"level":2,"title":"5. 失败的测试","slug":"_5-失败的测试","link":"#_5-失败的测试","children":[]},{"level":2,"title":"6. 配置Selenide","slug":"_6-配置selenide","link":"#_6-配置selenide","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719991826000,"updatedTime":1719991826000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":8.65,"words":2594},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Introduction to Selenide.md","localizedDate":"2023年7月7日","excerpt":"\\n<p>在本文中，我们将了解用于UI自动化测试的Selenide项目。我们将看到它是什么以及如何使用它来测试我们的UI项目。</p>\\n<h2>2. Selenide是什么？</h2>\\n<p>Selenide是一个建立在Selenium WebDriver之上的免费、开源框架。它为我们提供了执行web应用程序自动化测试的所有Selenium的强大功能。然而，它大大简化了，使我们只关注重要的事情。</p>\\n<p>特别是，Selenide将简化所有web浏览器的管理。它还会在测试失败时自动捕获浏览器窗口的截图。然后，它为我们提供了一个更加简化的API，用于与web浏览器交互，包括几个不直接从Selenium提供的函数，并简化了其他可用的函数。</p>","autoDesc":true}');export{r as comp,k as data};
