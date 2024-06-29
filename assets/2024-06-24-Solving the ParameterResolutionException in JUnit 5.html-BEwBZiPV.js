import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-Cjxx-itH.js";const e={},p=t(`<hr><h1 id="解决junit-5中的parameterresolutionexception问题" tabindex="-1"><a class="header-anchor" href="#解决junit-5中的parameterresolutionexception问题"><span>解决JUnit 5中的ParameterResolutionException问题</span></a></h1><p>JUnit 5引入了一些强大的功能，包括对参数化测试的支持。编写参数化测试可以节省大量时间，在许多情况下，它们可以通过简单的注解组合来启用。</p><p>然而，<strong>配置不正确可能导致难以调试的异常，因为JUnit在后台管理了许多测试执行的方面</strong>。</p><p>其中一种异常是_ParameterResolutionException_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>org.junit.jupiter.api.extension.ParameterResolutionException: No ParameterResolver registered for parameter ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在本教程中，我们将探讨这种异常的原因以及如何解决它。</p><h2 id="_2-junit-5的-parameterresolver" tabindex="-1"><a class="header-anchor" href="#_2-junit-5的-parameterresolver"><span>2. JUnit 5的_ParameterResolver_</span></a></h2><p>为了理解这个异常的原因，我们首先需要了解消息告诉我们缺少的是什么：一个_ParameterResolver_。</p><p>在JUnit 5中，引入了_ParameterResolver_接口，允许开发人员扩展JUnit的基本功能并编写接受任何类型参数的测试。让我们看一个简单的_ParameterResolver_实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FooParameterResolver</span> <span class="token keyword">implements</span> <span class="token class-name">ParameterResolver</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">supportsParameter</span><span class="token punctuation">(</span><span class="token class-name">ParameterContext</span> parameterContext<span class="token punctuation">,</span> <span class="token class-name">ExtensionContext</span> extensionContext<span class="token punctuation">)</span>
      <span class="token keyword">throws</span> <span class="token class-name">ParameterResolutionException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 参数支持逻辑</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">resolveParameter</span><span class="token punctuation">(</span><span class="token class-name">ParameterContext</span> parameterContext<span class="token punctuation">,</span> <span class="token class-name">ExtensionContext</span> extensionContext<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ParameterResolutionException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 参数解析逻辑</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到这个类有两个主要方法：</p><ul><li><em>supportsParameter()</em>: 确定是否支持参数类型</li><li><em>resolveParameter()</em>: 返回测试执行的参数</li></ul><p>因为_ParameterResolutionException_是在缺少_ParameterResolver_实现时抛出的，我们现在不会太关心实现细节。让我们首先讨论一些可能导致异常的潜在原因。</p><p>_ParameterResolutionException_可能很难调试，特别是对于那些不太熟悉参数化测试的人。</p><p>首先，让我们定义一个简单的_Book_类，我们将为其编写单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>
    <span class="token comment">// 标准getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于我们的示例，我们将为_Book_编写一些单元测试，以验证不同的标题值。让我们从两个非常简单的测试开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenWutheringHeights_whenCheckingTitleLength_thenTitleIsPopulated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Book</span> wuthering <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;Wuthering Heights&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Charlotte Bronte&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>wuthering<span class="token punctuation">.</span><span class="token function">getTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isGreaterThan</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenJaneEyre_whenCheckingTitleLength_thenTitleIsPopulated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Book</span> jane <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;Jane Eyre&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Charlotte Bronte&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>jane<span class="token punctuation">.</span><span class="token function">getTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isGreaterThan</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很容易看出这两个测试基本上在做同样的事情：设置_Book_标题并检查长度。我们可以通过将它们合并为一个参数化测试来简化测试。让我们讨论一些重构可能出错的方式。</p><h3 id="_3-1-向-test-方法传递参数" tabindex="-1"><a class="header-anchor" href="#_3-1-向-test-方法传递参数"><span>3.1. 向_@Test_方法传递参数</span></a></h3><p>采取非常快速的方法，我们可能认为向_@Test_注解的方法传递参数就足够了：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenTitleAndAuthor_whenCreatingBook_thenFieldsArePopulated</span><span class="token punctuation">(</span><span class="token class-name">String</span> title<span class="token punctuation">,</span> <span class="token class-name">String</span> author<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Book</span> book <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span>title<span class="token punctuation">,</span> author<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>book<span class="token punctuation">.</span><span class="token function">getTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isGreaterThan</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>book<span class="token punctuation">.</span><span class="token function">getAuthor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isGreaterThan</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码编译并运行，但再想一想，我们应该质疑这些参数来自哪里。运行这个示例时，我们看到一个异常：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>org.junit.jupiter.api.extension.ParameterResolutionException: No ParameterResolver registered for parameter [java.lang.String arg0] in method ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>JUnit不知道应该向测试方法传递什么参数</strong>。</p><p>让我们继续重构我们的单元测试，并查看_ParameterResolutionException_的另一个原因。</p><h3 id="_3-2-竞争注解" tabindex="-1"><a class="header-anchor" href="#_3-2-竞争注解"><span>3.2. 竞争注解</span></a></h3><p>我们可以使用之前提到的_ParameterResolver_来提供缺少的参数，但让我们先从值源开始更简单地使用。由于有两个值——<em>title_和_author</em>——我们可以使用_CsvSource_来为我们的测试提供这些值。</p><p>此外，我们缺少一个关键的注解：<em>@ParameterizedTest</em>。这个注解通知JUnit我们的测试是参数化的，并且测试值被注入到其中。</p><p>让我们尝试快速重构：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@CsvSource</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;Wuthering Heights, Charlotte Bronte&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Jane Eyre, Charlotte Bronte&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenTitleAndAuthor_whenCreatingBook_thenFieldsArePopulated</span><span class="token punctuation">(</span><span class="token class-name">String</span> title<span class="token punctuation">,</span> <span class="token class-name">String</span> author<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Book</span> book <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span>title<span class="token punctuation">,</span> author<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>book<span class="token punctuation">.</span><span class="token function">getTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isGreaterThan</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>book<span class="token punctuation">.</span><span class="token function">getAuthor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isGreaterThan</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这看起来是合理的。然而，当我们运行单元测试时，我们看到一些有趣的现象：两次通过的测试运行和第三次失败的测试运行。仔细观察，我们还看到了一个警告：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>WARNING: Possible configuration error: method [...] resulted in multiple TestDescriptors [org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor, org.junit.jupiter.engine.descriptor.TestTemplateTestDescriptor].
This is typically the result of annotating a method with multiple competing annotations such as @Test, @RepeatedTest, @ParameterizedTest, @TestFactory, etc.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>通过添加竞争测试注解，我们无意中创建了多个_TestDescriptor_ s</strong>。这意味着JUnit仍然在运行我们原始的_@Test_版本的测试以及我们的新参数化测试。</p><p>简单地<strong>移除_@Test_注解可以解决这个问题</strong>。</p><h3 id="_3-3-使用-parameterresolver" tabindex="-1"><a class="header-anchor" href="#_3-3-使用-parameterresolver"><span>3.3. 使用_ParameterResolver_</span></a></h3><p>之前，我们讨论了一个简单的_ParameterResolver_实现示例。现在我们有一个工作正常的测试，让我们引入一个_BookParameterResolver_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BookParameterResolver</span> <span class="token keyword">implements</span> <span class="token class-name">ParameterResolver</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">supportsParameter</span><span class="token punctuation">(</span><span class="token class-name">ParameterContext</span> parameterContext<span class="token punctuation">,</span> <span class="token class-name">ExtensionContext</span> extensionContext<span class="token punctuation">)</span>
      <span class="token keyword">throws</span> <span class="token class-name">ParameterResolutionException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> parameterContext<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token class-name">Book</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">resolveParameter</span><span class="token punctuation">(</span><span class="token class-name">ParameterContext</span> parameterContext<span class="token punctuation">,</span> <span class="token class-name">ExtensionContext</span> extensionContext<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ParameterResolutionException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> parameterContext<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token class-name">Book</span><span class="token punctuation">.</span><span class="token keyword">class</span>
            <span class="token operator">?</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;Wuthering Heights&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Charlotte Bronte&quot;</span><span class="token punctuation">)</span>
            <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个简单的例子，它只为测试返回一个单一的_Book_实例。现在我们有一个_ParameterResolver_来为我们提供测试值，我们应该能够回到我们的第一个测试。同样，我们可能会尝试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenTitleAndAuthor_whenCreatingBook_thenFieldsArePopulated</span><span class="token punctuation">(</span><span class="token class-name">String</span> title<span class="token punctuation">,</span> <span class="token class-name">String</span> author<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Book</span> book <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span>title<span class="token punctuation">,</span> author<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>book<span class="token punctuation">.</span><span class="token function">getTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isGreaterThan</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>book<span class="token punctuation">.</span><span class="token function">getAuthor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isGreaterThan</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是当我们运行这个测试时，同样的异常仍然存在。不过，原因略有不同——<strong>现在我们有了_ParameterResolver_，我们仍然需要告诉JUnit如何使用它</strong>。</p><p>幸运的是，这就像<strong>在包含我们测试方法的外部类上添加_@ExtendWith_注解一样简单</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ExtendWith</span><span class="token punctuation">(</span><span class="token class-name">BookParameterResolver</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BookUnitTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">givenTitleAndAuthor_whenCreatingBook_thenFieldsArePopulated</span><span class="token punctuation">(</span><span class="token class-name">String</span> title<span class="token punctuation">,</span> <span class="token class-name">String</span> author<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 测试内容...</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 其他单元测试</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次运行，我们看到测试执行成功。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们讨论了JUnit 5的_ParameterResolutionException_以及缺失或竞争配置可能导致这种异常。像往常一样，文章的所有代码都可以在GitHub上找到。</p>`,47),o=[p];function c(i,l){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-24-Solving the ParameterResolutionException in JUnit 5.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Solving%20the%20ParameterResolutionException%20in%20JUnit%205.html","title":"解决JUnit 5中的ParameterResolutionException问题","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Java","JUnit"],"tag":["JUnit 5","ParameterResolutionException"],"head":[["meta",{"name":"keywords","content":"JUnit 5, Parameterized Testing, ParameterResolver, ParameterResolutionException"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Solving%20the%20ParameterResolutionException%20in%20JUnit%205.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"解决JUnit 5中的ParameterResolutionException问题"}],["meta",{"property":"og:description","content":"解决JUnit 5中的ParameterResolutionException问题 JUnit 5引入了一些强大的功能，包括对参数化测试的支持。编写参数化测试可以节省大量时间，在许多情况下，它们可以通过简单的注解组合来启用。 然而，配置不正确可能导致难以调试的异常，因为JUnit在后台管理了许多测试执行的方面。 其中一种异常是_ParameterRes..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T12:47:52.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JUnit 5"}],["meta",{"property":"article:tag","content":"ParameterResolutionException"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T12:47:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"解决JUnit 5中的ParameterResolutionException问题\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T12:47:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"解决JUnit 5中的ParameterResolutionException问题 JUnit 5引入了一些强大的功能，包括对参数化测试的支持。编写参数化测试可以节省大量时间，在许多情况下，它们可以通过简单的注解组合来启用。 然而，配置不正确可能导致难以调试的异常，因为JUnit在后台管理了许多测试执行的方面。 其中一种异常是_ParameterRes..."},"headers":[{"level":2,"title":"2. JUnit 5的_ParameterResolver_","slug":"_2-junit-5的-parameterresolver","link":"#_2-junit-5的-parameterresolver","children":[{"level":3,"title":"3.1. 向_@Test_方法传递参数","slug":"_3-1-向-test-方法传递参数","link":"#_3-1-向-test-方法传递参数","children":[]},{"level":3,"title":"3.2. 竞争注解","slug":"_3-2-竞争注解","link":"#_3-2-竞争注解","children":[]},{"level":3,"title":"3.3. 使用_ParameterResolver_","slug":"_3-3-使用-parameterresolver","link":"#_3-3-使用-parameterresolver","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719233272000,"updatedTime":1719233272000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.73,"words":1419},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Solving the ParameterResolutionException in JUnit 5.md","localizedDate":"2024年6月24日","excerpt":"<hr>\\n<h1>解决JUnit 5中的ParameterResolutionException问题</h1>\\n<p>JUnit 5引入了一些强大的功能，包括对参数化测试的支持。编写参数化测试可以节省大量时间，在许多情况下，它们可以通过简单的注解组合来启用。</p>\\n<p>然而，<strong>配置不正确可能导致难以调试的异常，因为JUnit在后台管理了许多测试执行的方面</strong>。</p>\\n<p>其中一种异常是_ParameterResolutionException_：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>org.junit.jupiter.api.extension.ParameterResolutionException: No ParameterResolver registered for parameter ...\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
