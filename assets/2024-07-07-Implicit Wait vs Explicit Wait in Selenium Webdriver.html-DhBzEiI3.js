import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DRFG6C5y.js";const e={},p=t(`<h1 id="selenium-webdriver中的隐式等待与显式等待-baeldung" tabindex="-1"><a class="header-anchor" href="#selenium-webdriver中的隐式等待与显式等待-baeldung"><span>Selenium Webdriver中的隐式等待与显式等待 | Baeldung</span></a></h1><p>网页应用程序测试的一个挑战是处理网页的动态特性。网页可能需要时间来加载，元素可能在一段时间后才会出现。因此，Selenium提供了等待机制来帮助我们在继续测试执行之前等待元素出现、消失或可点击。</p><p>在本文中，我们将探讨等待类型的不同之处以及如何在Selenium中使用它们。我们将比较隐式等待与显式等待，并学习在Selenium测试中使用等待的一些最佳实践。</p><h2 id="_2-selenium中的等待类型" tabindex="-1"><a class="header-anchor" href="#_2-selenium中的等待类型"><span>2. Selenium中的等待类型</span></a></h2><p>Selenium提供了多种等待机制来帮助我们等待元素出现、消失或可点击。这些等待机制可以分为三种类型：隐式等待、显式等待和流畅等待。</p><p>对于我们的测试用例，我们将为我们的页面定位器定义一些常量，我们将使用它们来浏览网页：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">By</span> <span class="token constant">LOCATOR_ABOUT</span> <span class="token operator">=</span> <span class="token class-name">By</span><span class="token punctuation">.</span><span class="token function">xpath</span><span class="token punctuation">(</span><span class="token string">&quot;//a[starts-with(., &#39;About&#39;)]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">By</span> <span class="token constant">LOCATOR_ABOUT_BAELDUNG</span> <span class="token operator">=</span> <span class="token class-name">By</span><span class="token punctuation">.</span><span class="token function">xpath</span><span class="token punctuation">(</span><span class="token string">&quot;//h3[normalize-space()=&#39;About Baeldung&#39;]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">By</span> <span class="token constant">LOCATOR_ABOUT_HEADER</span> <span class="token operator">=</span> <span class="token class-name">By</span><span class="token punctuation">.</span><span class="token function">xpath</span><span class="token punctuation">(</span><span class="token string">&quot;//h1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1-隐式等待" tabindex="-1"><a class="header-anchor" href="#_2-1-隐式等待"><span>2.1. 隐式等待</span></a></h3><p><strong>隐式等待是一个全局设置，适用于Selenium脚本中的所有元素。</strong> 它在抛出异常之前等待指定的时间，如果找不到元素。我们可以在每个会话中设置一次等待，并且不能在之后更改它。默认值是 <em>0</em>。</p><p>我们可以使用以下语句将隐式等待设置为10秒。<strong>我们应该在初始化_WebDriver_实例后立即设置隐式等待：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>driver<span class="token punctuation">.</span><span class="token function">manage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">timeouts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">implicitlyWait</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofSeconds</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用隐式等待，我们不需要在测试中显式等待任何东西。</p><p>以下简单的测试导航到www.baeldung.com，并通过头部菜单导航到_About_页面。正如我们所看到的，没有显式等待指令，测试在10秒的隐式等待下通过：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">givenPage_whenNavigatingWithImplicitWait_ThenOK</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token class-name">String</span> expected <span class="token operator">=</span> <span class="token string">&quot;About Baeldung&quot;</span><span class="token punctuation">;</span>
    driver<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.baeldung.com/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    driver<span class="token punctuation">.</span><span class="token function">findElement</span><span class="token punctuation">(</span><span class="token constant">LOCATOR_ABOUT</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    driver<span class="token punctuation">.</span><span class="token function">findElement</span><span class="token punctuation">(</span><span class="token constant">LOCATOR_ABOUT_BAELDUNG</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">final</span> <span class="token class-name">String</span> actual <span class="token operator">=</span> driver<span class="token punctuation">.</span><span class="token function">findElement</span><span class="token punctuation">(</span><span class="token constant">LOCATOR_ABOUT_HEADER</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> actual<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>需要注意的是，如果不设置隐式等待，将导致测试失败。</strong></p><h3 id="_2-2-显式等待" tabindex="-1"><a class="header-anchor" href="#_2-2-显式等待"><span>2.2. 显式等待</span></a></h3><p><strong>显式等待是一种更灵活的等待，允许我们在继续测试执行之前等待特定条件得到满足。</strong></p><p>我们可以使用_ExpectedConditions_类来定义条件，例如元素的存在或不存在。如果在指定时间内条件未得到满足，则会抛出异常。</p><p><em>WebDriver_检查预期条件的轮询频率固定为_500 ms</em>。由于显式等待不是全局设置，我们可以使用不同的条件和超时时间。</p><p>查看之前的测试用例，我们注意到如果没有隐式等待，测试将失败。我们可以调整测试并引入显式等待。</p><p>首先，我们将为测试创建一个_Wait_实例，超时时间为10秒：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">WebDriverWait</span> wait <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebDriverWait</span><span class="token punctuation">(</span>driver<span class="token punctuation">,</span> <span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofSeconds</span><span class="token punctuation">(</span><span class="token constant">TIMEOUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们可以使用这个_Wait_实例，并使用_ExpectedConditions_调用_until()<em>。在这种情况下，我们可以使用_ExpectedConditions.visibilityOfElementLocated(..)</em>。</p><p>在与元素交互之前，例如点击，我们需要等待元素可见或可点击：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">givenPage_whenNavigatingWithExplicitWait_thenOK</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token class-name">String</span> expected <span class="token operator">=</span> <span class="token string">&quot;About Baeldung&quot;</span><span class="token punctuation">;</span>
    driver<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.baeldung.com/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    driver<span class="token punctuation">.</span><span class="token function">findElement</span><span class="token punctuation">(</span><span class="token constant">LOCATOR_ABOUT</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    wait<span class="token punctuation">.</span><span class="token function">until</span><span class="token punctuation">(</span><span class="token class-name">ExpectedConditions</span><span class="token punctuation">.</span><span class="token function">visibilityOfElementLocated</span><span class="token punctuation">(</span><span class="token constant">LOCATOR_ABOUT_BAELDUNG</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    driver<span class="token punctuation">.</span><span class="token function">findElement</span><span class="token punctuation">(</span><span class="token constant">LOCATOR_ABOUT_BAELDUNG</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    wait<span class="token punctuation">.</span><span class="token function">until</span><span class="token punctuation">(</span><span class="token class-name">ExpectedConditions</span><span class="token punctuation">.</span><span class="token function">visibilityOfElementLocated</span><span class="token punctuation">(</span><span class="token constant">LOCATOR_ABOUT_HEADER</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">final</span> <span class="token class-name">String</span> actual <span class="token operator">=</span> driver<span class="token punctuation">.</span><span class="token function">findElement</span><span class="token punctuation">(</span><span class="token constant">LOCATOR_ABOUT_HEADER</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> actual<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要手动管理等待，但我们更加灵活。这可以显著提高测试性能。</p><p>_ExpectedConditions_类提供了许多我们可以用于检查预期条件的方法。让我们看一些：</p><ul><li><em>elementToBeClickable()</em></li><li><em>invisibilityOf()</em></li><li><em>presenceOfElementLocated()</em></li><li><em>textToBePresentInElement()</em></li><li><em>visibilityOf()</em></li></ul><h3 id="_2-3-流畅等待" tabindex="-1"><a class="header-anchor" href="#_2-3-流畅等待"><span>2.3. 流畅等待</span></a></h3><p><strong>流畅等待是另一种类型的显式等待，它允许我们对等待机制进行更细粒度的控制。</strong> 它使我们能够定义预期条件和轮询机制，以检查特定条件是否得到满足。</p><p>我们可以再次调整之前的测试用例，并引入流畅等待。流畅等待基本上是显式等待，所以我们只需要调整_Wait_实例。我们指定轮询频率：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Wait</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">WebDriver</span><span class="token punctuation">&gt;</span></span>\` wait <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FluentWait</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>driver<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withTimeout</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofSeconds</span><span class="token punctuation">(</span><span class="token constant">TIMEOUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">pollingEvery</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofMillis</span><span class="token punctuation">(</span><span class="token constant">POLL_FREQUENCY</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试本身将与显式等待保持相同：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">givenPage_whenNavigatingWithFluentWait_thenOK</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token class-name">String</span> expected <span class="token operator">=</span> <span class="token string">&quot;About Baeldung&quot;</span><span class="token punctuation">;</span>
    driver<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.baeldung.com/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    driver<span class="token punctuation">.</span><span class="token function">findElement</span><span class="token punctuation">(</span><span class="token constant">LOCATOR_ABOUT</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    wait<span class="token punctuation">.</span><span class="token function">until</span><span class="token punctuation">(</span><span class="token class-name">ExpectedConditions</span><span class="token punctuation">.</span><span class="token function">visibilityOfElementLocated</span><span class="token punctuation">(</span><span class="token constant">LOCATOR_ABOUT_BAELDUNG</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    driver<span class="token punctuation">.</span><span class="token function">findElement</span><span class="token punctuation">(</span><span class="token constant">LOCATOR_ABOUT_BAELDUNG</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    wait<span class="token punctuation">.</span><span class="token function">until</span><span class="token punctuation">(</span><span class="token class-name">ExpectedConditions</span><span class="token punctuation">.</span><span class="token function">visibilityOfElementLocated</span><span class="token punctuation">(</span><span class="token constant">LOCATOR_ABOUT_HEADER</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">final</span> <span class="token class-name">String</span> actual <span class="token operator">=</span> driver<span class="token punctuation">.</span><span class="token function">findElement</span><span class="token punctuation">(</span><span class="token constant">LOCATOR_ABOUT_HEADER</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> actual<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>隐式和显式等待用于等待页面上元素的出现。然而，它们之间有一些不同：</p><ul><li>超时：隐式等待为整个测试运行设置默认超时时间，而显式等待为特定条件设置超时时间。</li><li>条件：隐式等待等待页面上出现元素，而显式等待等待特定条件，例如元素的存在或元素可点击。</li><li>范围：隐式等待全局应用，而显式等待局部应用于特定元素。</li><li>异常：隐式等待在_WebDriver_在指定超时时间内找不到元素时抛出_NoSuchElementException_。相比之下，显式等待在元素在指定超时时间内不满足条件时抛出_TimeoutException_。</li></ul><p>隐式等待在我们想要等待页面上元素出现一定时间时很有帮助。然而，如果我们需要等待特定条件，显式等待是更好的选择。</p><p><strong>根据Selenium文档，我们不应该混合使用它们：</strong></p><blockquote><p><em>警告：不要混合使用隐式和显式等待。这样做可能会导致不可预测的等待时间。例如，设置10秒的隐式等待和15秒的显式等待可能会导致在20秒后超时。</em></p></blockquote><h2 id="_4-最佳实践" tabindex="-1"><a class="header-anchor" href="#_4-最佳实践"><span>4. 最佳实践</span></a></h2><p>在使用Selenium中的等待时，需要注意一些最佳实践：</p><ul><li>总是使用等待：等待元素加载是自动化测试中的关键步骤。</li><li>使用显式等待而不是隐式等待：隐式等待可能会导致我们的测试在找不到元素时比必要的时间更长才能失败。显式和流畅等待更好，因为它们允许我们等待特定条件发生后再继续。</li><li>在必要时使用流畅等待：当我们需要反复验证特定条件直到它变为真时，我们应该使用流畅等待，因为它们提供了对等待机制的更大控制。</li><li>使用合理的等待时间：太短的等待时间可能会导致误报，而太长的等待时间可能会不必要地增加测试的总执行时间。</li><li>使用_ExpectedConditions_：在使用显式或流畅等待时，使用_ExpectedConditions_类定义我们想要等待的条件至关重要。通过这样做，我们可以确保我们的测试等待适当的条件，并在条件未满足时快速失败。</li></ul><h2 id="_5-staleelementreferenceexception" tabindex="-1"><a class="header-anchor" href="#_5-staleelementreferenceexception"><span>5. <em>StaleElementReferenceException</em></span></a></h2><p>_StaleElementReferenceException_是在先前定位的元素不再可用时出现的问题。</p><p>这可能发生在我们定位元素后的DOM发生变化时，例如，当等待元素满足指定条件为真时。</p><p><strong>要解决_StaleElementReferenceException_，我们需要在每次出现这个异常时重新定位元素。</strong> 每次出现_SERE (StaleElementReferenceException)_时，我们会捕获异常，重新定位元素并重试该步骤。因为我们不能确定重新加载可以解决问题，我们需要在几次尝试后停止重试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> stale <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> retries <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">while</span><span class="token punctuation">(</span>stale <span class="token operator">&amp;&amp;</span> retries <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        element<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stale <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">StaleElementReferenceException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        retries<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>stale<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Exception</span><span class="token punctuation">(</span><span class="token string">&quot;Element is still stale after 5 attempts&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于这种解决方案在到处实现时不方便，我们可以包装_WebElement_和_WebDriver_并在内部处理_StaleElementReferenceException_。</p><p>通过这种方法，我们不需要在测试代码中处理_StaleElementReferenceExceptions_。我们必须包装_WebDriver_以使用包装的_WebElement_s。所有可能抛出_StaleElementReferenceException_的_WebElement_方法都可以进行调整。</p><h2 id="_6-结" tabindex="-1"><a class="header-anchor" href="#_6-结"><span>6. 结</span></a></h2>`,50),c=[p];function o(i,l){return s(),a("div",null,c)}const r=n(e,[["render",o],["__file","2024-07-07-Implicit Wait vs Explicit Wait in Selenium Webdriver.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Implicit%20Wait%20vs%20Explicit%20Wait%20in%20Selenium%20Webdriver.html","title":"Selenium Webdriver中的隐式等待与显式等待 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Selenium","Webdriver"],"tag":["Implicit Wait","Explicit Wait"],"head":[["meta",{"name":"keywords","content":"Selenium, Webdriver, Implicit Wait, Explicit Wait"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Implicit%20Wait%20vs%20Explicit%20Wait%20in%20Selenium%20Webdriver.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Selenium Webdriver中的隐式等待与显式等待 | Baeldung"}],["meta",{"property":"og:description","content":"Selenium Webdriver中的隐式等待与显式等待 | Baeldung 网页应用程序测试的一个挑战是处理网页的动态特性。网页可能需要时间来加载，元素可能在一段时间后才会出现。因此，Selenium提供了等待机制来帮助我们在继续测试执行之前等待元素出现、消失或可点击。 在本文中，我们将探讨等待类型的不同之处以及如何在Selenium中使用它们。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T11:33:15.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Implicit Wait"}],["meta",{"property":"article:tag","content":"Explicit Wait"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T11:33:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Selenium Webdriver中的隐式等待与显式等待 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T11:33:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Selenium Webdriver中的隐式等待与显式等待 | Baeldung 网页应用程序测试的一个挑战是处理网页的动态特性。网页可能需要时间来加载，元素可能在一段时间后才会出现。因此，Selenium提供了等待机制来帮助我们在继续测试执行之前等待元素出现、消失或可点击。 在本文中，我们将探讨等待类型的不同之处以及如何在Selenium中使用它们。..."},"headers":[{"level":2,"title":"2. Selenium中的等待类型","slug":"_2-selenium中的等待类型","link":"#_2-selenium中的等待类型","children":[{"level":3,"title":"2.1. 隐式等待","slug":"_2-1-隐式等待","link":"#_2-1-隐式等待","children":[]},{"level":3,"title":"2.2. 显式等待","slug":"_2-2-显式等待","link":"#_2-2-显式等待","children":[]},{"level":3,"title":"2.3. 流畅等待","slug":"_2-3-流畅等待","link":"#_2-3-流畅等待","children":[]}]},{"level":2,"title":"4. 最佳实践","slug":"_4-最佳实践","link":"#_4-最佳实践","children":[]},{"level":2,"title":"5. StaleElementReferenceException","slug":"_5-staleelementreferenceexception","link":"#_5-staleelementreferenceexception","children":[]},{"level":2,"title":"6. 结","slug":"_6-结","link":"#_6-结","children":[]}],"git":{"createdTime":1720351995000,"updatedTime":1720351995000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.61,"words":1982},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Implicit Wait vs Explicit Wait in Selenium Webdriver.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>网页应用程序测试的一个挑战是处理网页的动态特性。网页可能需要时间来加载，元素可能在一段时间后才会出现。因此，Selenium提供了等待机制来帮助我们在继续测试执行之前等待元素出现、消失或可点击。</p>\\n<p>在本文中，我们将探讨等待类型的不同之处以及如何在Selenium中使用它们。我们将比较隐式等待与显式等待，并学习在Selenium测试中使用等待的一些最佳实践。</p>\\n<h2>2. Selenium中的等待类型</h2>\\n<p>Selenium提供了多种等待机制来帮助我们等待元素出现、消失或可点击。这些等待机制可以分为三种类型：隐式等待、显式等待和流畅等待。</p>\\n<p>对于我们的测试用例，我们将为我们的页面定位器定义一些常量，我们将使用它们来浏览网页：</p>","autoDesc":true}');export{r as comp,d as data};
