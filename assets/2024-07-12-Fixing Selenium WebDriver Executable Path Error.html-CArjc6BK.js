import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-D5kFWV-m.js";const t={},p=e(`<h1 id="解决selenium-webdriver可执行文件路径错误" tabindex="-1"><a class="header-anchor" href="#解决selenium-webdriver可执行文件路径错误"><span>解决Selenium WebDriver可执行文件路径错误</span></a></h1><p>在本教程中，我们将探讨Selenium的常见错误：“必须通过webdriver.chrome.driver系统属性设置驱动程序可执行文件的路径。”此错误阻止了Selenium启动浏览器。这是由于配置不完整造成的。我们将学习如何通过手动或自动的正确设置来解决这个问题。</p><h2 id="_2-错误原因" tabindex="-1"><a class="header-anchor" href="#_2-错误原因"><span>2. 错误原因</span></a></h2><p>在我们能够使用Selenium之前，需要进行一些设置步骤，例如设置WebDriver的路径。<strong>如果我们没有配置WebDriver的路径，我们就不能运行它来控制浏览器，我们将得到一个java.lang.IllegalStateException。</strong></p><p>让我们看看导致此错误的不完整设置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">WebDriver</span> driver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ChromeDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过这个语句，我们想要创建一个新的_ChromeDriver_实例，但由于我们没有提供_WebDriver_的路径，Selenium无法运行它，并以错误“java.lang.IllegalStateException: 必须通过webdriver.chrome.driver系统属性设置驱动程序可执行文件的路径”失败。</p><p>为了解决这个问题，我们需要执行正确的设置。我们可以手动或使用专用库自动完成此操作。</p><h2 id="_3-手动设置" tabindex="-1"><a class="header-anchor" href="#_3-手动设置"><span>3. 手动设置</span></a></h2><p>首先，我们需要为我们的浏览器下载正确的WebDriver。下载正确版本的WebDriver至关重要，因为否则在运行时可能会出现不可预见的问题。</p><p>可以从以下网站下载正确的WebDriver：</p><ul><li>Chrome: https://chromedriver.chromium.org/downloads</li><li>Edge: https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/</li><li>Firefox: https://github.com/mozilla/geckodriver/releases</li></ul><p>然后Selenium需要下载的驱动程序的路径，以便它可以运行它来控制浏览器。**我们可以通过系统属性设置驱动程序的路径。**每个浏览器的属性键不同：</p><ul><li>Chrome: webdriver.chrome.driver</li><li>Firefox: webdriver.gecko.driver</li><li>Edge: webdriver.edge.driver</li></ul><p>让我们看看Chrome的手动设置。我们设置先前下载的WebDriver的路径，然后创建一个_ChromeDriver_实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">WebDriver</span> driver<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">setupChromeDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;webdriver.chrome.driver&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;src/test/resources/chromedriver.exe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    driver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ChromeDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">options</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    driver<span class="token punctuation">.</span><span class="token function">manage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">window</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">maximize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>路径可以是相对的或绝对的。此外，我们可以设置各种设置，如上面的示例中最大化浏览器窗口。</p><p>其他浏览器的设置非常相似。正如我们下面看到的，我们只需要替换驱动程序设置方法，并为相应的驱动程序设置路径：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">setupGeckoDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;webdriver.gecko.driver&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;src/test/resources/geckodriver.exe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    driver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FirefoxDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">setupEdgeDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;webdriver.edge.driver&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;src/test/resources/msedgedriver.exe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    driver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EdgeDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以通过在https://www.baeldung.com上进行一个小检查来验证设置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token constant">TITLE_XPATH</span> <span class="token operator">=</span> <span class="token string">&quot;//a[@href=&#39;/&#39;]&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> <span class="token constant">URL</span> <span class="token operator">=</span> <span class="token string">&quot;https://www.baeldung.com&quot;</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenChromeDriver_whenNavigateToBaeldung_thenFindTitleIsSuccessful</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setupChromeDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    driver<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">final</span> <span class="token class-name">WebElement</span> title <span class="token operator">=</span> driver<span class="token punctuation">.</span><span class="token function">findElement</span><span class="token punctuation">(</span><span class="token class-name">By</span><span class="token punctuation">.</span><span class="token function">xpath</span><span class="token punctuation">(</span><span class="token constant">TITLE_XPATH</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> title<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;title&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如果设置仍然不起作用，我们需要确保WebDriver的路径是正确的。</strong></p><h2 id="_4-自动设置" tabindex="-1"><a class="header-anchor" href="#_4-自动设置"><span>4. 自动设置</span></a></h2><p>手动设置可能会很繁琐，因为我们需要手动下载特定的WebDriver。我们还需要确保我们使用的是正确版本。如果安装的浏览器启用了自动更新，这可能需要我们定期用更新版本的WebDriver替换它。</p><p>为了克服这个问题，我们可以利用WebDriverManager库，每次运行时它都会为我们处理这些任务。</p><p>首先，我们需要将依赖项添加到我们的_pom.xml_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`io.github.bonigarcia\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`webdrivermanager\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`5.3.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用库进行设置非常简单，只需要一行代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">WebDriver</span> driver<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">setupChromeDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">WebDriverManager</span><span class="token punctuation">.</span><span class="token function">chromedriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    driver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ChromeDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">options</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    driver<span class="token punctuation">.</span><span class="token function">manage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">window</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">maximize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在设置期间，_WebDriverManager_检查安装的浏览器版本，并自动下载正确的WebDriver版本。它设置系统属性然后运行浏览器。</p><p>适应其他浏览器的设置也很简单：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">setupGeckoDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">WebDriverManager</span><span class="token punctuation">.</span><span class="token function">firefoxdriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    driver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FirefoxDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">setupEdgeDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">WebDriverManager</span><span class="token punctuation">.</span><span class="token function">edgedriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    driver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EdgeDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，我们可以通过在https://www.baeldung.com上进行一个小测试来验证这个设置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token constant">TITLE_XPATH</span> <span class="token operator">=</span> <span class="token string">&quot;//a[@href=&#39;/&#39;]&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> <span class="token constant">URL</span> <span class="token operator">=</span> <span class="token string">&quot;https://www.baeldung.com&quot;</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenChromeDriver_whenNavigateToBaeldung_thenFindTitleIsSuccessful</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setupChromeDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    driver<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">final</span> <span class="token class-name">WebElement</span> title <span class="token operator">=</span> driver<span class="token punctuation">.</span><span class="token function">findElement</span><span class="token punctuation">(</span><span class="token class-name">By</span><span class="token punctuation">.</span><span class="token function">xpath</span><span class="token punctuation">(</span><span class="token constant">TITLE_XPATH</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> title<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;title&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们看到了导致Selenium错误“必须通过webdriver.chrome.driver系统属性设置驱动程序可执行文件的路径”的原因以及如何解决它。</p><p>我们可以进行手动设置，但这会导致一些维护工作。使用WebDriverManager库的自动设置减少了使用Selenium时的维护工作。</p><p>如常，所有这些示例的实现都可以在GitHub上找到。</p>`,38),o=[p];function i(c,l){return a(),s("div",null,o)}const d=n(t,[["render",i],["__file","2024-07-12-Fixing Selenium WebDriver Executable Path Error.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Fixing%20Selenium%20WebDriver%20Executable%20Path%20Error.html","title":"解决Selenium WebDriver可执行文件路径错误","lang":"zh-CN","frontmatter":{"date":"2024-07-13T00:00:00.000Z","category":["Java","Selenium"],"tag":["WebDriver","Error"],"head":[["meta",{"name":"keywords","content":"Selenium WebDriver, 路径错误, 浏览器驱动, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Fixing%20Selenium%20WebDriver%20Executable%20Path%20Error.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"解决Selenium WebDriver可执行文件路径错误"}],["meta",{"property":"og:description","content":"解决Selenium WebDriver可执行文件路径错误 在本教程中，我们将探讨Selenium的常见错误：“必须通过webdriver.chrome.driver系统属性设置驱动程序可执行文件的路径。”此错误阻止了Selenium启动浏览器。这是由于配置不完整造成的。我们将学习如何通过手动或自动的正确设置来解决这个问题。 2. 错误原因 在我们能够..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T18:48:40.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"WebDriver"}],["meta",{"property":"article:tag","content":"Error"}],["meta",{"property":"article:published_time","content":"2024-07-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T18:48:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"解决Selenium WebDriver可执行文件路径错误\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-13T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T18:48:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"解决Selenium WebDriver可执行文件路径错误 在本教程中，我们将探讨Selenium的常见错误：“必须通过webdriver.chrome.driver系统属性设置驱动程序可执行文件的路径。”此错误阻止了Selenium启动浏览器。这是由于配置不完整造成的。我们将学习如何通过手动或自动的正确设置来解决这个问题。 2. 错误原因 在我们能够..."},"headers":[{"level":2,"title":"2. 错误原因","slug":"_2-错误原因","link":"#_2-错误原因","children":[]},{"level":2,"title":"3. 手动设置","slug":"_3-手动设置","link":"#_3-手动设置","children":[]},{"level":2,"title":"4. 自动设置","slug":"_4-自动设置","link":"#_4-自动设置","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720810120000,"updatedTime":1720810120000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.69,"words":1108},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Fixing Selenium WebDriver Executable Path Error.md","localizedDate":"2024年7月13日","excerpt":"\\n<p>在本教程中，我们将探讨Selenium的常见错误：“必须通过webdriver.chrome.driver系统属性设置驱动程序可执行文件的路径。”此错误阻止了Selenium启动浏览器。这是由于配置不完整造成的。我们将学习如何通过手动或自动的正确设置来解决这个问题。</p>\\n<h2>2. 错误原因</h2>\\n<p>在我们能够使用Selenium之前，需要进行一些设置步骤，例如设置WebDriver的路径。<strong>如果我们没有配置WebDriver的路径，我们就不能运行它来控制浏览器，我们将得到一个java.lang.IllegalStateException。</strong></p>","autoDesc":true}');export{d as comp,k as data};
