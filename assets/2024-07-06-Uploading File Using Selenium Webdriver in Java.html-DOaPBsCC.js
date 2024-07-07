import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-B0JIQbDY.js";const t={},p=e(`<h1 id="使用java中的selenium-webdriver上传文件" tabindex="-1"><a class="header-anchor" href="#使用java中的selenium-webdriver上传文件"><span>使用Java中的Selenium WebDriver上传文件</span></a></h1><p>Selenium WebDriver是一个可以自动化与Web浏览器的用户交互以测试Web应用程序的工具。它可以自动化文件上传、获取输入值、抓取HTML内容等过程。</p><p>在本教程中，我们将探讨如何使用Selenium中的_sendKeys()_方法上传文件。</p><h3 id="_2-使用-sendkeys-上传文件" tabindex="-1"><a class="header-anchor" href="#_2-使用-sendkeys-上传文件"><span>2. 使用_sendKeys()_上传文件</span></a></h3><p>简单来说，文件上传是许多Web应用程序的常见功能。然而，<strong>使用Selenium WebDriver测试文件上传可能会很棘手，因为它涉及到与操作系统的本地文件系统的交互。为了克服这个挑战，我们可以使用_sendKeys()_方法。</strong></p><p>_sendKeys()_方法有助于模拟键盘操作。此方法可以将数据作为输入发送到HTML表单元素中。</p><p>_sendKeys()_接受_String_作为参数，并将其插入到选定的HTML元素中。这是自动化测试中的一个重要方法。常见的用例包括填写Web表单和在Web页面上搜索特定项目。</p><p>在本教程中，我们将使用_sendKeys()_填写Web表单，重点关注将文件上传到Web页面。让我们看一个使用_sendKeys()_上传图像文件的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">FileUploadWebDriverUnitTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">WebDriver</span> driver<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">URL</span> <span class="token operator">=</span> <span class="token string">&quot;http://www.csm-testcenter.org/test?do=show&amp;subdo=common&amp;test=file_upload&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">INPUT_NAME</span> <span class="token operator">=</span> <span class="token string">&quot;file_upload&quot;</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@BeforeEach</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">WebDriverManager</span><span class="token punctuation">.</span><span class="token function">firefoxdriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        driver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FirefoxDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@AfterEach</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">tearDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        driver<span class="token punctuation">.</span><span class="token function">quit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenFileUploadPage_whenInputFilePath_thenFileUploadEndsWithFilename</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        driver<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">String</span> filePath <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;user.dir&quot;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;/1688web.png&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">WebElement</span> inputElement <span class="token operator">=</span> driver<span class="token punctuation">.</span><span class="token function">findElement</span><span class="token punctuation">(</span><span class="token class-name">By</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token constant">INPUT_NAME</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">WebElement</span> submitButton <span class="token operator">=</span> driver<span class="token punctuation">.</span><span class="token function">findElement</span><span class="token punctuation">(</span><span class="token class-name">By</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">&quot;http_submit&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        inputElement<span class="token punctuation">.</span><span class="token function">sendKeys</span><span class="token punctuation">(</span>filePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> actualFilePath <span class="token operator">=</span> inputElement<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> fileName <span class="token operator">=</span> filePath<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>filePath<span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">WebElement</span> submitButton <span class="token operator">=</span> driver<span class="token punctuation">.</span><span class="token function">findElement</span><span class="token punctuation">(</span><span class="token class-name">By</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">&quot;submit&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        submitButton<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>actualFilePath<span class="token punctuation">.</span><span class="token function">endsWith</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们配置_WebDriver_使用Mozilla Firefox，并编写一个_teardown()_方法，在测试完成后关闭浏览器。接下来，我们声明一个名为_URL_的字段，其中包含URL “<em>http://www.csm-testcenter.org/test do=show&amp;subdo=common&amp;test=file_upload</em>”，我们可以在这里上传文件。然后我们找到接受文件的HTML输入元素的名称属性。图像位于项目的根目录中。</p><p>此外，我们创建了_WebElement_实例以访问输入字段和提交按钮的名称属性。我们还指定了文件路径，并在_inputElement_上调用了_sendKeys()_方法，将图像路径输入到输入字段中。</p><p>最后，我们通过在_submitButton_上执行鼠标点击来启动上传操作。我们验证上传的文件具有与原始文件相同的名称和扩展名。</p><h3 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h3><p>在本文中，我们学习了如何使用Selenium WebDriver上传文件。此外，我们使用_sendKeys()_方法向HTML输入元素发送命令。这项技能对于自动化Web测试和与不同的Web元素交互非常有用。</p><p>如往常一样，示例的完整源代码可在GitHub上获得。</p>`,15),o=[p];function i(c,l){return a(),s("div",null,o)}const d=n(t,[["render",i],["__file","2024-07-06-Uploading File Using Selenium Webdriver in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Uploading%20File%20Using%20Selenium%20Webdriver%20in%20Java.html","title":"使用Java中的Selenium WebDriver上传文件","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Selenium"],"tag":["WebDriver","Java"],"head":[["meta",{"name":"keywords","content":"Selenium WebDriver, Java, 文件上传, 自动化测试"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Uploading%20File%20Using%20Selenium%20Webdriver%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Java中的Selenium WebDriver上传文件"}],["meta",{"property":"og:description","content":"使用Java中的Selenium WebDriver上传文件 Selenium WebDriver是一个可以自动化与Web浏览器的用户交互以测试Web应用程序的工具。它可以自动化文件上传、获取输入值、抓取HTML内容等过程。 在本教程中，我们将探讨如何使用Selenium中的_sendKeys()_方法上传文件。 2. 使用_sendKeys()_上传..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T03:57:01.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"WebDriver"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T03:57:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Java中的Selenium WebDriver上传文件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T03:57:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Java中的Selenium WebDriver上传文件 Selenium WebDriver是一个可以自动化与Web浏览器的用户交互以测试Web应用程序的工具。它可以自动化文件上传、获取输入值、抓取HTML内容等过程。 在本教程中，我们将探讨如何使用Selenium中的_sendKeys()_方法上传文件。 2. 使用_sendKeys()_上传..."},"headers":[{"level":3,"title":"2. 使用_sendKeys()_上传文件","slug":"_2-使用-sendkeys-上传文件","link":"#_2-使用-sendkeys-上传文件","children":[]},{"level":3,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1720238221000,"updatedTime":1720238221000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.43,"words":728},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Uploading File Using Selenium Webdriver in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Selenium WebDriver是一个可以自动化与Web浏览器的用户交互以测试Web应用程序的工具。它可以自动化文件上传、获取输入值、抓取HTML内容等过程。</p>\\n<p>在本教程中，我们将探讨如何使用Selenium中的_sendKeys()_方法上传文件。</p>\\n<h3>2. 使用_sendKeys()_上传文件</h3>\\n<p>简单来说，文件上传是许多Web应用程序的常见功能。然而，<strong>使用Selenium WebDriver测试文件上传可能会很棘手，因为它涉及到与操作系统的本地文件系统的交互。为了克服这个挑战，我们可以使用_sendKeys()_方法。</strong></p>","autoDesc":true}');export{d as comp,k as data};
