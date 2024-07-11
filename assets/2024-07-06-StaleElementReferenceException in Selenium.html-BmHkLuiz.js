import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a as i}from"./app-CGdItRLw.js";const l={},r=i(`<h1 id="selenium中的staleelementreferenceexception" tabindex="-1"><a class="header-anchor" href="#selenium中的staleelementreferenceexception"><span>Selenium中的StaleElementReferenceException</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在使用Selenium测试Web应用程序时，我们经常会遇到一个名为<strong>StaleElementReferenceException</strong>的常见错误。当我们引用一个过时的元素时，Selenium会抛出<strong>StaleElementReferenceException</strong>。一个元素由于页面刷新或DOM更新而变得过时。</p><p>在本教程中，我们将学习Selenium中的<strong>StaleElementReferenceException</strong>是什么以及为什么会发生。然后，我们将看看如何在我们的Selenium测试中避免这个异常。</p><h2 id="_2-避免staleelementreferenceexception的策略" tabindex="-1"><a class="header-anchor" href="#_2-避免staleelementreferenceexception的策略"><span>2. 避免StaleElementReferenceException的策略</span></a></h2><p>为了避免<strong>StaleElementReferenceException</strong>，确保动态地定位和与元素交互而不是存储对它们的引用是至关重要的。这意味着我们应该在每次需要时找到元素，而不是将它们保存在变量中。</p><p>在某些情况下，这种方法是不可能的，我们需要在再次与之交互之前刷新元素。因此，我们的解决方案是在捕获<strong>StaleElementReferenceException</strong>后执行重试并刷新元素。我们可以直接在测试中这样做，也可以为所有测试全局实现。</p><p>对于我们的测试，我们将为定位器定义几个常量：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>By LOCATOR_REFRESH = By.xpath(&quot;//a[.=&#39;click here&#39;]&quot;);
By LOCATOR_DYNAMIC_CONTENT = By.xpath(&quot;(//div[@id=&#39;content&#39;]//div[@class=&#39;large-10 columns&#39;])[1]&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>对于设置，我们使用WebDriverManager的自动化方法。</p><h3 id="_2-1-生成staleelementreferenceexception" tabindex="-1"><a class="header-anchor" href="#_2-1-生成staleelementreferenceexception"><span>2.1. 生成StaleElementReferenceException</span></a></h3><p>首先，我们将看看一个以<strong>StaleElementReferenceException</strong>结束的测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>void givenDynamicPage_whenRefreshingAndAccessingSavedElement_thenSERE() {
    driver.navigate().to(&quot;https://the-internet.herokuapp.com/dynamic_content?with_content=static&quot;);
    final WebElement element = driver.findElement(LOCATOR_DYNAMIC_CONTENT);

    driver.findElement(LOCATOR_REFRESH).click();
    Assertions.assertThrows(StaleElementReferenceException.class, element::getText);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个测试存储了一个元素，并通过点击页面上的链接来更新DOM。当重新访问该元素时，由于它不再存在，会抛出<strong>StaleElementReferenceException</strong>。</p><h3 id="_2-2-刷新元素" tabindex="-1"><a class="header-anchor" href="#_2-2-刷新元素"><span>2.2. 刷新元素</span></a></h3><p>让我们使用重试逻辑，在重新访问之前刷新元素：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>boolean retryingFindClick(By locator) {
    boolean result = false;
    int attempts = 0;
    while (attempts \`&lt; 5) {
       try {
            driver.findElement(locator).click();
            result = true;
            break;
        } catch (StaleElementReferenceException ex) {
            System.out.println(ex.getMessage());
        }
        attempts++;
    }
    return result;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每当发生<strong>StaleElementReferenceException</strong>时，我们将使用存储的元素定位器再次定位元素，然后再执行点击。</p><p>现在，让我们更新测试以使用新的重试逻辑：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>void givenDynamicPage_whenRefreshingAndAccessingSavedElement_thenHandleSERE() {
    driver.navigate().to(&quot;https://the-internet.herokuapp.com/dynamic_content?with_content=static&quot;);
    final WebElement element = driver.findElement(LOCATOR_DYNAMIC_CONTENT);

    if (!retryingFindClick(LOCATOR_REFRESH)) {
        Assertions.fail(&quot;Element is still stale after 5 attempts&quot;);
    }
    Assertions.assertDoesNotThrow(() -&gt;\` retryingGetText(LOCATOR_DYNAMIC_CONTENT));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们发现，如果需要为许多测试执行此操作，更新测试将变得繁琐。幸运的是，我们可以在不需要更新所有测试的中央位置使用此逻辑。</p><h2 id="_3-避免staleelementreferenceexception的通用策略" tabindex="-1"><a class="header-anchor" href="#_3-避免staleelementreferenceexception的通用策略"><span>3. 避免StaleElementReferenceException的通用策略</span></a></h2><p>我们将为通用解决方案创建两个新类：<strong>RobustWebDriver</strong>和<strong>RobustWebElement</strong>。</p><h3 id="_3-1-robustwebdriver" tabindex="-1"><a class="header-anchor" href="#_3-1-robustwebdriver"><span>3.1. RobustWebDriver</span></a></h3><p>首先，我们需要创建一个实现<strong>WebDriver</strong>实例的新类。我们将它作为一个包装器来编写<strong>WebDriver</strong>。它调用<strong>WebDriver</strong>方法，并且方法<strong>findElement</strong>和<strong>findElements</strong>将返回<strong>RobustWebElement</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class RobustWebDriver implements WebDriver {

    WebDriver originalWebDriver;

    RobustWebDriver(WebDriver webDriver) {
        this.originalWebDriver = webDriver;
    }
    ...
    @Override
    public List\`\`\`&lt;WebElement&gt;\`\`\` findElements(By by) {
        return originalWebDriver.findElements(by)
                 .stream().map(e -&gt; new RobustWebElement(e, by, this))
                 .collect(Collectors.toList());
    }

    @Override
    public WebElement findElement(By by) {
        return new RobustWebElement(originalWebDriver.findElement(by), by, this);
    }
    ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-robustwebelement" tabindex="-1"><a class="header-anchor" href="#_3-2-robustwebelement"><span>3.2. RobustWebElement</span></a></h3><p><strong>RobustWebElement</strong>是<strong>WebElement</strong>的包装器。这个类实现了<strong>WebElement</strong>接口，并包含重试逻辑：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class RobustWebElement implements WebElement {

    WebElement originalElement;
    RobustWebDriver driver;
    By by;

    int MAX_RETRIES = 10;
    String SERE = &quot;Element is no longer attached to the DOM&quot;;

    RobustWebElement(WebElement element, By by, RobustWebDriver driver) {
        originalElement = element;
        by = by;
        driver = driver;
    }
    ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们必须实现<strong>WebElement</strong>接口的每个方法，以便在抛出<strong>StaleElementReferenceException</strong>时刷新元素。为此，让我们引入一些包含刷新逻辑的帮助方法。我们将从这些覆盖的方法中调用它们。</p><p>我们可以利用函数式接口，并创建一个帮助类来调用<strong>WebElement</strong>的各种方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class WebElementUtils {

    private WebElementUtils(){
    }

    static void callMethod(WebElement element, Consumer\`\`\`&lt;WebElement&gt;\`\`\` method) {
        method.accept(element);
    }

    static \`\`&lt;U&gt;\`\` void callMethod(WebElement element, BiConsumer\`\`&lt;WebElement, U&gt;\`\` method, U parameter) {
        method.accept(element, parameter);
    }

    static \`\`&lt;T&gt;\`\` T callMethodWithReturn(WebElement element, Function\`\`&lt;WebElement, T&gt;\`\` method) {
        return method.apply(element);
    }

    static \`\`&lt;T, U&gt;\`\` T callMethodWithReturn(WebElement element, BiFunction\`\`&lt;WebElement, U, T&gt;\`\` method, U parameter) {
        return method.apply(element, parameter);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<strong>WebElement</strong>中，我们实现四种包含刷新逻辑的方法，并调用前面引入的<strong>WebElementUtils</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>void executeMethodWithRetries(Consumer\`\`\`&lt;WebElement&gt;\`\`\` method) { ... }

\`\`&lt;T&gt;\`\` T executeMethodWithRetries(Function\`\`&lt;WebElement, T&gt;\`\` method) { ... }

\`\`&lt;U&gt;\`\` void executeMethodWithRetriesVoid(BiConsumer\`\`&lt;WebElement, U&gt;\`\` method, U parameter) { ... }

\`\`&lt;T, U&gt;\`\` T executeMethodWithRetries(BiFunction\`\`&lt;WebElement, U, T&gt;\`\` method, U parameter) { ... }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>click</strong>方法将如下所示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Override
public void click() {
    executeMethodWithRetries(WebElement::click);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现，我们只需要更改测试中的<strong>WebDriver</strong>实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>driver = new RobustWebDriver(new ChromeDriver(options));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其他一切都可以保持不变，<strong>StaleElementReferenceException</strong>应该不再发生。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本教程中，我们了解到<strong>StaleElementReferenceException</strong>可能在DOM更改后访问元素而没有刷新时发生。我们在测试中引入了重试逻辑，以便在每次发生<strong>StaleElementReferenceException</strong>时刷新元素。</p><p>如常，所有这些示例的实现都可以在GitHub上找到。 OK</p>`,42),s=[r];function a(d,c){return t(),n("div",null,s)}const v=e(l,[["render",a],["__file","2024-07-06-StaleElementReferenceException in Selenium.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-StaleElementReferenceException%20in%20Selenium.html","title":"Selenium中的StaleElementReferenceException","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Selenium","Web Testing"],"tag":["StaleElementReferenceException","Selenium WebDriver"],"head":[["meta",{"name":"keywords","content":"Selenium, StaleElementReferenceException, Web Testing, WebDriver"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-StaleElementReferenceException%20in%20Selenium.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Selenium中的StaleElementReferenceException"}],["meta",{"property":"og:description","content":"Selenium中的StaleElementReferenceException 1. 概述 在使用Selenium测试Web应用程序时，我们经常会遇到一个名为StaleElementReferenceException的常见错误。当我们引用一个过时的元素时，Selenium会抛出StaleElementReferenceException。一个元素由..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T16:58:47.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"StaleElementReferenceException"}],["meta",{"property":"article:tag","content":"Selenium WebDriver"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T16:58:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Selenium中的StaleElementReferenceException\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T16:58:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Selenium中的StaleElementReferenceException 1. 概述 在使用Selenium测试Web应用程序时，我们经常会遇到一个名为StaleElementReferenceException的常见错误。当我们引用一个过时的元素时，Selenium会抛出StaleElementReferenceException。一个元素由..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 避免StaleElementReferenceException的策略","slug":"_2-避免staleelementreferenceexception的策略","link":"#_2-避免staleelementreferenceexception的策略","children":[{"level":3,"title":"2.1. 生成StaleElementReferenceException","slug":"_2-1-生成staleelementreferenceexception","link":"#_2-1-生成staleelementreferenceexception","children":[]},{"level":3,"title":"2.2. 刷新元素","slug":"_2-2-刷新元素","link":"#_2-2-刷新元素","children":[]}]},{"level":2,"title":"3. 避免StaleElementReferenceException的通用策略","slug":"_3-避免staleelementreferenceexception的通用策略","link":"#_3-避免staleelementreferenceexception的通用策略","children":[{"level":3,"title":"3.1. RobustWebDriver","slug":"_3-1-robustwebdriver","link":"#_3-1-robustwebdriver","children":[]},{"level":3,"title":"3.2. RobustWebElement","slug":"_3-2-robustwebelement","link":"#_3-2-robustwebelement","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720285127000,"updatedTime":1720285127000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.85,"words":1156},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-StaleElementReferenceException in Selenium.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在使用Selenium测试Web应用程序时，我们经常会遇到一个名为<strong>StaleElementReferenceException</strong>的常见错误。当我们引用一个过时的元素时，Selenium会抛出<strong>StaleElementReferenceException</strong>。一个元素由于页面刷新或DOM更新而变得过时。</p>\\n<p>在本教程中，我们将学习Selenium中的<strong>StaleElementReferenceException</strong>是什么以及为什么会发生。然后，我们将看看如何在我们的Selenium测试中避免这个异常。</p>","autoDesc":true}');export{v as comp,u as data};
