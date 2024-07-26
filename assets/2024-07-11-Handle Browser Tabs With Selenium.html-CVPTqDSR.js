import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-8nJ1rqSf.js";const e={},p=t(`<h1 id="使用selenium管理浏览器标签页" tabindex="-1"><a class="header-anchor" href="#使用selenium管理浏览器标签页"><span>使用Selenium管理浏览器标签页</span></a></h1><p>在本教程中，我们将探讨如何使用Selenium来管理浏览器标签页。有时点击链接或按钮会在新标签页中打开页面。在这些情况下，我们必须正确处理标签页以继续我们的测试。本教程涵盖了在新标签页中打开页面、在标签页之间切换以及关闭标签页。我们的示例将使用https://testpages.herokuapp.com。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>根据_WebDriver_的设置，我们将创建一个处理_WebDriver_设置和清理的_SeleniumTestBase_类。我们的测试类将扩展这个类。我们还将定义一个帮助类来处理Selenium中的标签页。这个帮助类将包含打开、切换和关闭标签页的方法。这些方法将在以下部分展示并解释。我们将在_SeleniumTestBase_中初始化该帮助类的实例。所有示例都使用JUnit5。</p><p>初始化在需要用_@BeforeAll_注解的_init()_方法中完成：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@BeforeAll</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setupChromeDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>清理或结束方法将在所有测试后关闭整个浏览器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@AfterAll</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>driver <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        driver<span class="token punctuation">.</span><span class="token function">quit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-基础" tabindex="-1"><a class="header-anchor" href="#_3-基础"><span>3. 基础</span></a></h2><h3 id="_3-1-链接目标属性" tabindex="-1"><a class="header-anchor" href="#_3-1-链接目标属性"><span>3.1. 链接目标属性</span></a></h3><p>我们需要处理标签页的一个典型情况是，当点击链接或按钮时会打开一个新标签页。具有将目标属性设置为__blank_的网站链接将在新标签页中打开，例如：</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/<span class="token punctuation">&quot;</span></span> <span class="token attr-name">target</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>_blank<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\`Baeldung.com\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样的链接将在新标签页中打开目标，例如，https://www.baeldung.com。</p><h3 id="_3-2-窗口句柄" tabindex="-1"><a class="header-anchor" href="#_3-2-窗口句柄"><span>3.2. 窗口句柄</span></a></h3><p>在Selenium中，每个标签页都有一个窗口句柄，这是一个唯一的字符串。对于Chrome标签页，该字符串以_CDwindow_开头，后跟32个十六进制字符，例如，<em>CDwindow-CDE9BEF919431FDAA0FC9CB7EBBD4E1A</em>。<strong>在切换到特定标签页时我们需要窗口句柄。</strong> 因此，我们需要在测试期间存储窗口句柄。</p><p>我们可以使用_WebDriver_的以下方法来检索窗口句柄集和活动标签页的窗口句柄：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>driver<span class="token punctuation">.</span><span class="token function">getWindowHandles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
driver<span class="token punctuation">.</span><span class="token function">getWindowHandle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>借助这些方法，我们可以在_TabHelper_类中实现一个帮助方法。它在新标签页中打开链接并切换到该标签页。只有在打开新标签页时才会执行标签页切换。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">openLinkAndSwitchToNewTab</span><span class="token punctuation">(</span><span class="token class-name">By</span> link<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> windowHandle <span class="token operator">=</span> driver<span class="token punctuation">.</span><span class="token function">getWindowHandle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Set</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` windowHandlesBefore <span class="token operator">=</span> driver<span class="token punctuation">.</span><span class="token function">getWindowHandles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    driver<span class="token punctuation">.</span><span class="token function">findElement</span><span class="token punctuation">(</span>link<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Set</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` windowHandlesAfter <span class="token operator">=</span> driver<span class="token punctuation">.</span><span class="token function">getWindowHandles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    windowHandlesAfter<span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span>windowHandlesBefore<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Optional</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` newWindowHandle <span class="token operator">=</span> windowHandlesAfter<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    newWindowHandle<span class="token punctuation">.</span><span class="token function">ifPresent</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> driver<span class="token punctuation">.</span><span class="token function">switchTo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">window</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> windowHandle<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过在点击链接前后检索窗口句柄集来找到窗口句柄。点击链接前的窗口句柄集将从点击链接后的窗口句柄集中移除。结果将是新标签页的窗口句柄或空集。该方法还返回切换前的标签页窗口句柄。</p><h3 id="_4-2-切换标签页" tabindex="-1"><a class="header-anchor" href="#_4-2-切换标签页"><span>4.2. 切换标签页</span></a></h3><p>每当我们有多个标签页打开时，我们需要手动在它们之间切换。我们可以使用以下语句切换到特定标签页，其中_destinationWindowHandle_代表我们想要切换到的标签页的窗口句柄：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>driver<span class="token punctuation">.</span><span class="token function">switchTo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">window</span><span class="token punctuation">(</span>destinationWindowHandle<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以实施一个帮助方法，它接受目标窗口句柄作为参数并切换到相应的标签页。此外，该方法在切换前返回活动标签页的窗口句柄：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">switchToTab</span><span class="token punctuation">(</span><span class="token class-name">String</span> destinationWindowHandle<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> currentWindowHandle <span class="token operator">=</span> driver<span class="token punctuation">.</span><span class="token function">getWindowHandle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    driver<span class="token punctuation">.</span><span class="token function">switchTo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">window</span><span class="token punctuation">(</span>destinationWindowHandle<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> currentWindowHandle<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-关闭标签页" tabindex="-1"><a class="header-anchor" href="#_4-3-关闭标签页"><span>4.3. 关闭标签页</span></a></h3><p>在我们的测试之后或当我们不再需要特定标签页时，我们需要关闭它。Selenium提供了一个语句来关闭当前标签页或如果是最后一个打开的标签页，则关闭整个浏览器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>driver<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以使用这个语句来关闭我们不再需要的所有标签页。以下方法可以关闭除了特定标签页之外的所有标签页：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">closeAllTabsExcept</span><span class="token punctuation">(</span><span class="token class-name">String</span> windowHandle<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> handle <span class="token operator">:</span> driver<span class="token punctuation">.</span><span class="token function">getWindowHandles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>handle<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>windowHandle<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            driver<span class="token punctuation">.</span><span class="token function">switchTo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">window</span><span class="token punctuation">(</span>handle<span class="token punctuation">)</span><span class="token punctuation">;</span>
            driver<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    driver<span class="token punctuation">.</span><span class="token function">switchTo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">window</span><span class="token punctuation">(</span>windowHandle<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在此方法中，我们循环遍历所有窗口句柄。如果窗口句柄与提供的窗口句柄不同，我们将切换到它并关闭它。最后，我们将确保再次切换到我们想要的标签页。</p><p>我们可以使用这个方法来关闭除了当前打开的标签页之外的所有标签页：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">closeAllTabsExceptCurrent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> currentWindow <span class="token operator">=</span> driver<span class="token punctuation">.</span><span class="token function">getWindowHandle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">closeAllTabsExcept</span><span class="token punctuation">(</span>currentWindow<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以使用这个方法在_SeleniumTestBase_类中的每个测试后关闭所有剩余的标签页。这在测试失败时清理浏览器以避免影响下一个测试的结果特别有用。我们将在用_@AfterEach_注解的方法中调用这个方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@AfterEach</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">closeTabs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    tabHelper<span class="token punctuation">.</span><span class="token function">closeAllTabsExceptCurrent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-使用快捷键处理标签页" tabindex="-1"><a class="header-anchor" href="#_4-4-使用快捷键处理标签页"><span>4.4. 使用快捷键处理标签页</span></a></h3><p>使用Selenium，过去可以使用浏览器快捷键来处理标签页。<strong>不幸的是，由于_ChromeDriver_的变化，这似乎不再起作用。</strong></p><h2 id="_5-测试" tabindex="-1"><a class="header-anchor" href="#_5-测试"><span>5. 测试</span></a></h2><p>我们可以通过一些简单的测试来验证我们的_TabHelper_类的标签页处理是否按预期工作。正如本文开头提到的，我们的测试类需要扩展_SeleniumTestBase:_</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">SeleniumTabsLiveTest</span> <span class="token keyword">extends</span> <span class="token class-name">SeleniumTestBase</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于这些测试，我们在测试类中声明了一些URL和定位器的常量，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">By</span> <span class="token constant">LINK_TO_ATTRIBUTES_PAGE_XPATH</span> <span class="token operator">=</span> <span class="token class-name">By</span><span class="token punctuation">.</span><span class="token function">xpath</span><span class="token punctuation">(</span><span class="token string">&quot;//a[.=&#39;Attributes in new page&#39;]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">By</span> <span class="token constant">LINK_TO_ALERT_PAGE_XPATH</span> <span class="token operator">=</span> <span class="token class-name">By</span><span class="token punctuation">.</span><span class="token function">xpath</span><span class="token punctuation">(</span><span class="token string">&quot;//a[.=&#39;Alerts In A New Window From JavaScript&#39;]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> <span class="token constant">MAIN_PAGE_URL</span> <span class="token operator">=</span> <span class="token string">&quot;https://testpages.herokuapp.com/styled/windows-test.html&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> <span class="token constant">ATTRIBUTES_PAGE_URL</span> <span class="token operator">=</span> <span class="token string">&quot;https://testpages.herokuapp.com/styled/attributes-test.html&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> <span class="token constant">ALERT_PAGE_URL</span> <span class="token operator">=</span> <span class="token string">&quot;https://testpages.herokuapp.com/styled/alerts/alert-test.html&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的第一个测试案例中，我们正在新标签页中打开一个链接。我们验证我们有打开两个标签页并且可以在它们之间切换。注意，我们总是存储相应的窗口句柄。以下代码表示这个测试案例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">givenOneTab_whenOpenTab_thenTwoTabsOpen</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    driver<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">MAIN_PAGE_URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> mainWindow <span class="token operator">=</span> tabHelper<span class="token punctuation">.</span><span class="token function">openLinkAndSwitchToNewTab</span><span class="token punctuation">(</span><span class="token constant">LINK_TO_ATTRIBUTES_PAGE_XPATH</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">ATTRIBUTES_PAGE_URL</span><span class="token punctuation">,</span> driver<span class="token punctuation">.</span><span class="token function">getCurrentUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    tabHelper<span class="token punctuation">.</span><span class="token function">switchToTab</span><span class="token punctuation">(</span>mainWindow<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">MAIN_PAGE_URL</span><span class="token punctuation">,</span> driver<span class="token punctuation">.</span><span class="token function">getCurrentUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> driver<span class="token punctuation">.</span><span class="token function">getWindowHandles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的第二个测试中，我们想要验证我们可以关闭除了我们首先打开的标签页之外的所有标签页。我们需要提供该标签页的窗口句柄。以下代码显示了这个测试案例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">givenTwoTabs_whenCloseAllExceptMainTab_thenOneTabOpen</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    driver<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">MAIN_PAGE_URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> mainWindow <span class="token operator">=</span> tabHelper<span class="token punctuation">.</span><span class="token function">openLinkAndSwitchToNewTab</span><span class="token punctuation">(</span><span class="token constant">LINK_TO_ATTRIBUTES_PAGE_XPATH</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">ATTRIBUTES_PAGE_URL</span><span class="token punctuation">,</span> driver<span class="token punctuation">.</span><span class="token function">getCurrentUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> driver<span class="token punctuation">.</span><span class="token function">getWindowHandles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    tabHelper<span class="token punctuation">.</span><span class="token function">closeAllTabsExcept</span><span class="token punctuation">(</span>mainWindow<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> driver<span class="token punctuation">.</span><span class="token function">getWindowHandles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">MAIN_PAGE_URL</span><span class="token punctuation">,</span> driver<span class="token punctuation">.</span><span class="token function">getCurrentUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了如何使用Selenium来管理浏览器标签页。我们涵盖了如何使用各自的窗口句柄区分不同的标签页。本文涵盖了打开标签页、切换标签页以及在我们完成后关闭它们。像往常一样，所有这些示例的实现都可以在GitHub上找到。</p>`,48),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","2024-07-11-Handle Browser Tabs With Selenium.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Handle%20Browser%20Tabs%20With%20Selenium.html","title":"使用Selenium管理浏览器标签页","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Selenium","Java"],"tag":["Browser Automation","Selenium WebDriver"],"head":[["meta",{"name":"keywords","content":"Selenium, Java, Browser Automation, WebDriver, ChromeDriver"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Handle%20Browser%20Tabs%20With%20Selenium.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Selenium管理浏览器标签页"}],["meta",{"property":"og:description","content":"使用Selenium管理浏览器标签页 在本教程中，我们将探讨如何使用Selenium来管理浏览器标签页。有时点击链接或按钮会在新标签页中打开页面。在这些情况下，我们必须正确处理标签页以继续我们的测试。本教程涵盖了在新标签页中打开页面、在标签页之间切换以及关闭标签页。我们的示例将使用https://testpages.herokuapp.com。 2. ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T16:03:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Browser Automation"}],["meta",{"property":"article:tag","content":"Selenium WebDriver"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T16:03:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Selenium管理浏览器标签页\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T16:03:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Selenium管理浏览器标签页 在本教程中，我们将探讨如何使用Selenium来管理浏览器标签页。有时点击链接或按钮会在新标签页中打开页面。在这些情况下，我们必须正确处理标签页以继续我们的测试。本教程涵盖了在新标签页中打开页面、在标签页之间切换以及关闭标签页。我们的示例将使用https://testpages.herokuapp.com。 2. ..."},"headers":[{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[]},{"level":2,"title":"3. 基础","slug":"_3-基础","link":"#_3-基础","children":[{"level":3,"title":"3.1. 链接目标属性","slug":"_3-1-链接目标属性","link":"#_3-1-链接目标属性","children":[]},{"level":3,"title":"3.2. 窗口句柄","slug":"_3-2-窗口句柄","link":"#_3-2-窗口句柄","children":[]},{"level":3,"title":"4.2. 切换标签页","slug":"_4-2-切换标签页","link":"#_4-2-切换标签页","children":[]},{"level":3,"title":"4.3. 关闭标签页","slug":"_4-3-关闭标签页","link":"#_4-3-关闭标签页","children":[]},{"level":3,"title":"4.4. 使用快捷键处理标签页","slug":"_4-4-使用快捷键处理标签页","link":"#_4-4-使用快捷键处理标签页","children":[]}]},{"level":2,"title":"5. 测试","slug":"_5-测试","link":"#_5-测试","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720713802000,"updatedTime":1720713802000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.57,"words":1671},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Handle Browser Tabs With Selenium.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨如何使用Selenium来管理浏览器标签页。有时点击链接或按钮会在新标签页中打开页面。在这些情况下，我们必须正确处理标签页以继续我们的测试。本教程涵盖了在新标签页中打开页面、在标签页之间切换以及关闭标签页。我们的示例将使用https://testpages.herokuapp.com。</p>\\n<h2>2. 设置</h2>\\n<p>根据_WebDriver_的设置，我们将创建一个处理_WebDriver_设置和清理的_SeleniumTestBase_类。我们的测试类将扩展这个类。我们还将定义一个帮助类来处理Selenium中的标签页。这个帮助类将包含打开、切换和关闭标签页的方法。这些方法将在以下部分展示并解释。我们将在_SeleniumTestBase_中初始化该帮助类的实例。所有示例都使用JUnit5。</p>","autoDesc":true}');export{r as comp,k as data};
