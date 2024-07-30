import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-CbPcg273.js";const t={},p=e('<hr><h1 id="使用selenium-webdriver检索html输入框的值" tabindex="-1"><a class="header-anchor" href="#使用selenium-webdriver检索html输入框的值"><span>使用Selenium WebDriver检索HTML输入框的值</span></a></h1><p>自动化测试是软件开发的重要组成部分。Selenium是一个广泛使用的工具，它使用特定于浏览器的驱动程序来自动化Web应用程序的测试。</p><p>在本教程中，我们将学习如何设置Selenium项目，并从网页中检索HTML输入字段的值。</p><h2 id="_2-selenium-webdriver是什么" tabindex="-1"><a class="header-anchor" href="#_2-selenium-webdriver是什么"><span>2. Selenium WebDriver是什么？</span></a></h2><p>Selenium WebDriver是一个开源的自动化测试框架，它以本地方式驱动Web浏览器，像真实用户一样与它们交互。它支持一系列浏览器，包括Chrome、Firefox、Edge和Safari。</p><p>它可以用于自动化各种任务，例如Web测试、Web抓取和用户验收测试。</p><p>简单来说，WebDriver是在不同编程语言中实现的应用程序编程接口（API）。驱动程序负责Selenium和浏览器之间的通信。</p><h2 id="_3-设置selenium-webdriver项目" tabindex="-1"><a class="header-anchor" href="#_3-设置selenium-webdriver项目"><span>3. 设置Selenium WebDriver项目</span></a></h2><p>要开始在任何项目中使用Selenium，我们需要安装Selenium库和浏览器驱动程序。我们可以通过将依赖项添加到_pom.xml_来使用Maven安装Selenium库：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.seleniumhq.selenium``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``selenium-java``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``4.8.3``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，要安装浏览器驱动程序，我们将使用驱动管理软件。<em>WebDriverManager_是一个提供此功能的Java库。让我们将其依赖项添加到_pom.xml</em>：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``io.github.bonigarcia``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``webdrivermanager``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``5.3.2``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，我们可以从Selenium官方网站下载浏览器驱动程序。一旦我们下载了驱动程序，我们需要将其解压，将其放置在项目根目录中，并在代码中指向其位置。</p><p>在下一节中，我们将使用Selenium脚本检索DuckDuckGo主页上的输入字段的值。</p><h2 id="_4-使用selenium-webdriver检索html输入值" tabindex="-1"><a class="header-anchor" href="#_4-使用selenium-webdriver检索html输入值"><span>4. 使用Selenium WebDriver检索HTML输入值</span></a></h2><p>首先，我们将检索DuckDuckGo搜索字段中的输入值。主页将作为我们的示例HTML页面。它有一个用于输入搜索查询的输入字段，其ID为“<em>search_form_input_homepage</em>”。</p><p>接下来，让我们编写一个Selenium脚本来检索输入字段的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">SeleniumWebDriverUnitTest</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">WebDriver</span> driver<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">URL</span> <span class="token operator">=</span> <span class="token string">&quot;https://duckduckgo.com&quot;</span><span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">INPUT_ID</span> <span class="token operator">=</span> <span class="token string">&quot;search_form_input_homepage&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@BeforeEach</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">WebDriverManager</span><span class="token punctuation">.</span><span class="token function">chromedriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        driver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ChromeDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@AfterEach</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">tearDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        driver<span class="token punctuation">.</span><span class="token function">quit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Test</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenDuckDuckGoHomePage_whenInputHelloWorld_thenInputValueIsHelloWorld</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        driver<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">WebElement</span> inputElement <span class="token operator">=</span> driver<span class="token punctuation">.</span><span class="token function">findElement</span><span class="token punctuation">(</span><span class="token class-name">By</span><span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span><span class="token constant">INPUT_ID</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        inputElement<span class="token punctuation">.</span><span class="token function">sendKeys</span><span class="token punctuation">(</span><span class="token class-name">Keys</span><span class="token punctuation">.</span><span class="token function">chord</span><span class="token punctuation">(</span><span class="token class-name">Keys</span><span class="token punctuation">.</span><span class="token constant">CONTROL</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Keys</span><span class="token punctuation">.</span><span class="token constant">DELETE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        inputElement<span class="token punctuation">.</span><span class="token function">sendKeys</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">String</span> inputValue <span class="token operator">=</span> inputElement<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World!&quot;</span><span class="token punctuation">,</span> inputValue<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，我们创建了一个_WebDriver_实例来控制Chrome Web浏览器。然后，我们使用_WebDriver_实例导航到URL为“<em>https://duckduckgo.com</em>”的网页。</p><p>此外，我们在_WebDriverManager_上调用_chromedriver().set()_来设置浏览器驱动程序。它自动为我们下载和设置Chrome驱动程序。此外，我们将_driver_初始化为_ChromeDriver_对象，这有助于调用Chrome浏览器。</p><p>接下来，我们通过调用_driver_上的_get()<em>方法导航到URL。然后，我们创建一个名为_inputElement_的_WebElement_变量，并按其_id_查找输入元素并将其分配给_inputElement</em>。<em>WebElement_是一个接口，表示Selenium WebDriver中的HTML元素。它提供了各种与元素交互的方法，例如_sendKeys()</em>、_getText()<em>等。我们可以使用不同的定位策略，例如_id</em>、_name_或_xpath_来查找Web元素。</p><p>此外，我们模拟从代码中清除输入字段，并输入“Hello World!”作为输入值。然后，我们创建一个_string_类型的_inputValue_变量，并在_inputElement_上调用_getAttribute()<em>方法，参数为“<em>value</em>”并将其分配给_inputValue</em>。</p><p>此外，我们有_tearDown()_方法，它关闭浏览器窗口并释放_ChromeDriver_对象使用的资源。</p><p>最后，我们断言预期结果等于网页上指定输入_id_的输入值。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们首先看到了如何使用驱动管理软件安装Selenium浏览器驱动程序，以及如何手动下载它。然后，我们学习了如何使用Selenium WebDriver从HTML网页获取输入值。</p><p>如常，示例的完整源代码可在GitHub上获得。</p>',28),i=[p];function l(o,c){return s(),a("div",null,i)}const d=n(t,[["render",l],["__file","2024-07-06-Retrieve the Value of an HTML Input in Selenium WebDriver.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Retrieve%20the%20Value%20of%20an%20HTML%20Input%20in%20Selenium%20WebDriver.html","title":"使用Selenium WebDriver检索HTML输入框的值","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Selenium WebDriver","Automation Testing"],"tag":["HTML Input","Selenium","WebDriver"],"head":[["meta",{"name":"keywords","content":"Selenium WebDriver, Automation, HTML Input Value, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Retrieve%20the%20Value%20of%20an%20HTML%20Input%20in%20Selenium%20WebDriver.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Selenium WebDriver检索HTML输入框的值"}],["meta",{"property":"og:description","content":"使用Selenium WebDriver检索HTML输入框的值 自动化测试是软件开发的重要组成部分。Selenium是一个广泛使用的工具，它使用特定于浏览器的驱动程序来自动化Web应用程序的测试。 在本教程中，我们将学习如何设置Selenium项目，并从网页中检索HTML输入字段的值。 2. Selenium WebDriver是什么？ Seleniu..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T11:30:15.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"HTML Input"}],["meta",{"property":"article:tag","content":"Selenium"}],["meta",{"property":"article:tag","content":"WebDriver"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T11:30:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Selenium WebDriver检索HTML输入框的值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T11:30:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Selenium WebDriver检索HTML输入框的值 自动化测试是软件开发的重要组成部分。Selenium是一个广泛使用的工具，它使用特定于浏览器的驱动程序来自动化Web应用程序的测试。 在本教程中，我们将学习如何设置Selenium项目，并从网页中检索HTML输入字段的值。 2. Selenium WebDriver是什么？ Seleniu..."},"headers":[{"level":2,"title":"2. Selenium WebDriver是什么？","slug":"_2-selenium-webdriver是什么","link":"#_2-selenium-webdriver是什么","children":[]},{"level":2,"title":"3. 设置Selenium WebDriver项目","slug":"_3-设置selenium-webdriver项目","link":"#_3-设置selenium-webdriver项目","children":[]},{"level":2,"title":"4. 使用Selenium WebDriver检索HTML输入值","slug":"_4-使用selenium-webdriver检索html输入值","link":"#_4-使用selenium-webdriver检索html输入值","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720265415000,"updatedTime":1720265415000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.42,"words":1026},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Retrieve the Value of an HTML Input in Selenium WebDriver.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>使用Selenium WebDriver检索HTML输入框的值</h1>\\n<p>自动化测试是软件开发的重要组成部分。Selenium是一个广泛使用的工具，它使用特定于浏览器的驱动程序来自动化Web应用程序的测试。</p>\\n<p>在本教程中，我们将学习如何设置Selenium项目，并从网页中检索HTML输入字段的值。</p>\\n<h2>2. Selenium WebDriver是什么？</h2>\\n<p>Selenium WebDriver是一个开源的自动化测试框架，它以本地方式驱动Web浏览器，像真实用户一样与它们交互。它支持一系列浏览器，包括Chrome、Firefox、Edge和Safari。</p>","autoDesc":true}');export{d as comp,m as data};
