import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as i}from"./app-c243dxVF.js";const n={},r=i(`<hr><h1 id="使用java中的selenium-webdriver打开新标签页" tabindex="-1"><a class="header-anchor" href="#使用java中的selenium-webdriver打开新标签页"><span>使用Java中的Selenium WebDriver打开新标签页</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Selenium WebDriver是一个流行的自动化网络测试工具，具有许多功能。在自动化网页操作中，一个常见的动作是在浏览器窗口中打开一个新标签页。</p><p>打开新标签页在多种场景下都非常有用，包括测试多页面工作流程、验证新标签页中打开的外部链接、与弹出窗口交互，以及在并行运行测试时模拟多个用户与应用程序的不同部分同时交互。</p><p>早期的解决方案是自定义脚本，例如发送组合键“Ctrl”+“T”，这通常会因浏览器和操作系统的不同而导致不同的结果。</p><p>在本教程中，我们将探讨<strong>打开新标签页的稳定方法——Selenium 4中引入的_newWindow()_ API和JavaScript代码执行</strong>。</p><h2 id="_2-使用-newwindow-api" tabindex="-1"><a class="header-anchor" href="#_2-使用-newwindow-api"><span>2. 使用_newWindow()_ API</span></a></h2><p>Selenium 4引入了一个强大且灵活的API方法_newWindow()_，用于在当前浏览器会话中创建一个新窗口。<strong>它允许我们打开一个新的浏览器标签页并自动切换到它</strong>。这个方法接受一个_WindowType_参数_WINDOW_或_TAB_来创建它。语法非常直接：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>driver.switchTo().newWindow(WindowType.TAB);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-使用javascript" tabindex="-1"><a class="header-anchor" href="#_3-使用javascript"><span>3. 使用JavaScript</span></a></h2><p>使用Selenium WebDriver打开新标签页的另一种方法是执行JavaScript代码。它涉及使用_JavascriptExecutor_接口的_executeScript()_方法，这允许我们直接在浏览器内运行JavaScript代码。<strong>当我们想要更多地控制新标签页的打开方式时，比如指定要打开的URL，_window.open()_脚本非常有用</strong>。</p><p>以下是使用这种方法打开新标签页的示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>((JavascriptExecutor) driver).executeScript(&quot;window.open()&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以及如何使用URL打开新标签页：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>((JavascriptExecutor) driver).executeScript(&quot;window.open(&#39;https://google.com&#39;)&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>需要注意的是，在执行_window.open()_方法后，driver仍然会聚焦在原始标签页上</strong>。为了与新标签页上的元素交互，我们需要使用_driver.switchTo().window()_方法将driver的焦点切换到那个标签页。</p><p>以下是在用JavaScript打开新标签页后切换到它的示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String newTab = driver.getWindowHandles()
  .stream()
  .filter(handle -&gt; !handle.equals(originalTab))
  .findFirst()
  .get();
driver.switchTo().window(newTab);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探讨了使用Selenium打开新标签页的两种方法：Selenium 4中引入的_newWindow()_方法和使用JavaScript执行的_window.open()_方法。</p><p>_newWindow()_方法是Selenium 4中引入的新API，它使创建新标签页或窗口变得简单直观。另一方面，使用JavaScript执行_window.open()_提供了更大的控制权，可以用于更早版本的Selenium。然而，它可能需要更多的代码，并且对于初学者来说可能更难使用。</p><p>如常，代码示例可在GitHub上找到。</p>`,23),l=[r];function d(o,s){return t(),a("div",null,l)}const v=e(n,[["render",d],["__file","2024-07-05-Opening a New Tab Using Selenium WebDriver in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Opening%20a%20New%20Tab%20Using%20Selenium%20WebDriver%20in%20Java.html","title":"使用Java中的Selenium WebDriver打开新标签页","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Selenium WebDriver","Java"],"tag":["Selenium","WebDriver","Java","新建标签页"],"head":[["meta",{"name":"keywords","content":"Selenium WebDriver, Java, 新建标签页, 自动化测试"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Opening%20a%20New%20Tab%20Using%20Selenium%20WebDriver%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Java中的Selenium WebDriver打开新标签页"}],["meta",{"property":"og:description","content":"使用Java中的Selenium WebDriver打开新标签页 1. 引言 Selenium WebDriver是一个流行的自动化网络测试工具，具有许多功能。在自动化网页操作中，一个常见的动作是在浏览器窗口中打开一个新标签页。 打开新标签页在多种场景下都非常有用，包括测试多页面工作流程、验证新标签页中打开的外部链接、与弹出窗口交互，以及在并行运行测试..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T19:28:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Selenium"}],["meta",{"property":"article:tag","content":"WebDriver"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"新建标签页"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T19:28:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Java中的Selenium WebDriver打开新标签页\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T19:28:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Java中的Selenium WebDriver打开新标签页 1. 引言 Selenium WebDriver是一个流行的自动化网络测试工具，具有许多功能。在自动化网页操作中，一个常见的动作是在浏览器窗口中打开一个新标签页。 打开新标签页在多种场景下都非常有用，包括测试多页面工作流程、验证新标签页中打开的外部链接、与弹出窗口交互，以及在并行运行测试..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用_newWindow()_ API","slug":"_2-使用-newwindow-api","link":"#_2-使用-newwindow-api","children":[]},{"level":2,"title":"3. 使用JavaScript","slug":"_3-使用javascript","link":"#_3-使用javascript","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720207734000,"updatedTime":1720207734000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.46,"words":737},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Opening a New Tab Using Selenium WebDriver in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>使用Java中的Selenium WebDriver打开新标签页</h1>\\n<h2>1. 引言</h2>\\n<p>Selenium WebDriver是一个流行的自动化网络测试工具，具有许多功能。在自动化网页操作中，一个常见的动作是在浏览器窗口中打开一个新标签页。</p>\\n<p>打开新标签页在多种场景下都非常有用，包括测试多页面工作流程、验证新标签页中打开的外部链接、与弹出窗口交互，以及在并行运行测试时模拟多个用户与应用程序的不同部分同时交互。</p>\\n<p>早期的解决方案是自定义脚本，例如发送组合键“Ctrl”+“T”，这通常会因浏览器和操作系统的不同而导致不同的结果。</p>","autoDesc":true}');export{v as comp,m as data};
