import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as e,a as t}from"./app-BBuWtJOD.js";const s={},o=t(`<h1 id="如何在java中重用testcontainers" tabindex="-1"><a class="header-anchor" href="#如何在java中重用testcontainers"><span>如何在Java中重用Testcontainers</span></a></h1><p>在本教程中，我们将学习如何在本地开发和测试环境中设置环境时重用Testcontainers。</p><p>首先，我们必须确保在应用程序停止或测试套件完成时不关闭容器。之后，我们将讨论Testcontainer特定的配置，并讨论使用Testcontainers桌面应用程序的好处。最后，我们需要记住，重用Testcontainers是一个实验性功能，目前还不适合在CI流水线中使用。</p><h2 id="_2-确保testcontainer不被停止" tabindex="-1"><a class="header-anchor" href="#_2-确保testcontainer不被停止"><span>2. 确保Testcontainer不被停止</span></a></h2><p>通过@_Testcontainers和@_Container注解，我们可以简单地为我们的单元测试启用Testcontainers。</p><p>让我们编写一个测试，启动一个Spring Boot应用程序，并允许它连接到在Docker容器中运行的MongoDB数据库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Testcontainers</span>
<span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">ReusableContainersLiveTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Container</span>
    <span class="token keyword">static</span> <span class="token class-name">MongoDBContainer</span> mongoDBContainer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MongoDBContainer</span><span class="token punctuation">(</span><span class="token class-name">DockerImageName</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;mongo:4.0.10&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 动态属性和测试用例</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，Testcontainer的JUnit5扩展在自动启动_MongoDBContainer_时也会在测试后关闭它。因此，让我们移除_@Testcontainers_和@_Container_注解，并手动启动容器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">ReusableContainersLiveTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token class-name">MongoDBContainer</span> mongoDBContainer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MongoDBContainer</span><span class="token punctuation">(</span><span class="token class-name">DockerImageName</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;mongo:4.0.10&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@BeforeAll</span>
    <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">beforeAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mongoDBContainer<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 动态属性和测试用例</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一方面，我们可能在本地开发期间使用Spring Boot内置的Testcontainers支持。在这种情况下，我们不会使用JUnit 5扩展，这一步是不必要的。</p><h2 id="_3-管理testcontainer生命周期" tabindex="-1"><a class="header-anchor" href="#_3-管理testcontainer生命周期"><span>3. 管理Testcontainer生命周期</span></a></h2><p>现在，我们可以完全控制容器的生命周期。我们可以配置应用程序重用现有的Testcontainer，并且我们可以手动从终端停止它。</p><h3 id="_3-1-withreuse-方法" tabindex="-1"><a class="header-anchor" href="#_3-1-withreuse-方法"><span>3.1. withReuse()方法</span></a></h3><p>我们可以通过使用其流畅API的_withReuse()_方法将Testcontainer标记为可重用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">MongoDBContainer</span> mongoDBContainer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MongoDBContainer</span><span class="token punctuation">(</span><span class="token class-name">DockerImageName</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;mongo:4.0.10&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withReuse</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们第一次运行测试时，我们将看到Testcontainers日志中关于启动_MongoDBContainer_的常规信息。这通常需要几秒钟：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>23:56:42.383 [main] INFO tc.mongo:4.0.10 - Creating container for image: mongo:4.0.10
23:56:42.892 [main] INFO tc.mongo:4.0.10 - Container mongo:4.0.10 is starting: d5fa298bf6...
23:56:45.470 [main] INFO tc.mongo:4.0.10 - Container mongo:4.0.10 started in PT3.11239S
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试完成后，我们应该能够看到容器仍在运行。例如，我们可以使用_docker ps_命令从终端进行检查：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/10/reusing_testcontainers-300x136.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>此外，当我们重新运行测试时，只要配置没有改变，容器就会被重用。结果，容器设置时间显著减少：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>00:12:23.859 [main] INFO tc.mongo:4.0.10 - Creating container for image: mongo:4.0.10
00:12:24.190 [main] INFO tc.mongo:4.0.10 - Reusing container with ID: d5fa298b... and hash: 0702144b...
00:12:24.191 [main] INFO tc.mongo:4.0.10 - Reusing existing container (d5fa298b...) and not creating a new one
00:12:24.398 [main] INFO tc.mongo:4.0.10 - Container mongo:4.0.10 started in PT0.5555088S
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，重用的数据库包含之前插入的文档。虽然这可能对本地开发有用，但可能对测试有害。如果我们需要重新开始，我们可以在每个测试之前简单地清除集合。</p><h3 id="_3-2-testcontainers配置" tabindex="-1"><a class="header-anchor" href="#_3-2-testcontainers配置"><span>3.2. Testcontainers配置</span></a></h3><p>在某些情况下，可能会发生警告，指出“请求重用，但环境不支持容器的重用”。当在我们的本地Testcontainers配置中禁用重用时会发生这种情况：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>00:23:09.461 [main] INFO tc.mongo:4.0.10 - Creating container for image: mongo:4.0.10
00:23:09.463 [main] WARN tc.mongo:4.0.10 - Reuse was requested but the environment does not support the reuse of containers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>要解决这个问题，我们可以简单地编辑_.testcontainers.properties_文件，并将_reuse_设置为启用：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/10/enable_tc_reuse_from_properties-300x110.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_3-3-停止容器" tabindex="-1"><a class="header-anchor" href="#_3-3-停止容器"><span>3.3. 停止容器</span></a></h3><p>我们可以随时从终端手动停止Docker容器。为此，我们只需要运行_docker stop_命令，然后是容器ID。应用程序的后续执行将启动一个新的Docker容器。</p><h2 id="_4-testcontainers桌面" tabindex="-1"><a class="header-anchor" href="#_4-testcontainers桌面"><span>4. Testcontainers桌面</span></a></h2><p>我们可以安装Testcontainers桌面应用程序来轻松管理Testcontainers的生命周期和配置。</p><p>该应用程序需要身份验证，但我们可以使用GitHub账户轻松登录。登录后，我们将在工具栏中看到Testcontainers图标。如果我们点击它，我们将有几个选项可供选择：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/10/testcontainers_desktop-1-249x300.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>现在，执行前面演示的步骤就像点击按钮一样简单。例如，我们可以通过_Preferences &gt; Enable reusable containers_轻松启用或禁用可重用容器。此外，如果我们需要更多的调试，我们有能力在关闭之前终止容器或冻结它们。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何在Java中重用Testcontainers。我们发现JUnit 5可能会在完成执行之前尝试关闭容器。我们通过手动启动容器而不是依赖Testcontainers的JUnit 5扩展来避免这个问题。</p><p>之后，我们讨论了_withReuse()_方法和其他Testcontainer特定的配置。最后，我们安装了Testcontainers桌面应用程序，并看到了它在管理Testcontainers生命周期时如何成为宝贵的资产。</p><p>如往常一样，本文中使用的全部代码可以在GitHub上找到。翻译已经完成，以下是文章的结尾部分：</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/475d4408e78071b2289e763a5887e617?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/custom_avatars/david-martinez-150x150.png" alt="img" loading="lazy"></p><p>OK</p>`,40),i=[o];function c(p,r){return e(),a("div",null,i)}const u=n(s,[["render",c],["__file","2024-06-28-How to Reuse Testcontainers in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-How%20to%20Reuse%20Testcontainers%20in%20Java.html","title":"如何在Java中重用Testcontainers","lang":"zh-CN","frontmatter":{"date":"2023-10-23T00:00:00.000Z","category":["Java","Testcontainers"],"tag":["Java","Testcontainers","Reuse","Local Development","Testing"],"head":[["meta",{"name":"keywords","content":"Java, Testcontainers, Reuse, Local Development, Testing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-How%20to%20Reuse%20Testcontainers%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java中重用Testcontainers"}],["meta",{"property":"og:description","content":"如何在Java中重用Testcontainers 在本教程中，我们将学习如何在本地开发和测试环境中设置环境时重用Testcontainers。 首先，我们必须确保在应用程序停止或测试套件完成时不关闭容器。之后，我们将讨论Testcontainer特定的配置，并讨论使用Testcontainers桌面应用程序的好处。最后，我们需要记住，重用Testcon..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/10/reusing_testcontainers-300x136.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T23:53:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Testcontainers"}],["meta",{"property":"article:tag","content":"Reuse"}],["meta",{"property":"article:tag","content":"Local Development"}],["meta",{"property":"article:tag","content":"Testing"}],["meta",{"property":"article:published_time","content":"2023-10-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T23:53:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java中重用Testcontainers\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/10/reusing_testcontainers-300x136.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/10/enable_tc_reuse_from_properties-300x110.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/10/testcontainers_desktop-1-249x300.png\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/475d4408e78071b2289e763a5887e617?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/custom_avatars/david-martinez-150x150.png\\"],\\"datePublished\\":\\"2023-10-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T23:53:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Java中重用Testcontainers 在本教程中，我们将学习如何在本地开发和测试环境中设置环境时重用Testcontainers。 首先，我们必须确保在应用程序停止或测试套件完成时不关闭容器。之后，我们将讨论Testcontainer特定的配置，并讨论使用Testcontainers桌面应用程序的好处。最后，我们需要记住，重用Testcon..."},"headers":[{"level":2,"title":"2. 确保Testcontainer不被停止","slug":"_2-确保testcontainer不被停止","link":"#_2-确保testcontainer不被停止","children":[]},{"level":2,"title":"3. 管理Testcontainer生命周期","slug":"_3-管理testcontainer生命周期","link":"#_3-管理testcontainer生命周期","children":[{"level":3,"title":"3.1. withReuse()方法","slug":"_3-1-withreuse-方法","link":"#_3-1-withreuse-方法","children":[]},{"level":3,"title":"3.2. Testcontainers配置","slug":"_3-2-testcontainers配置","link":"#_3-2-testcontainers配置","children":[]},{"level":3,"title":"3.3. 停止容器","slug":"_3-3-停止容器","link":"#_3-3-停止容器","children":[]}]},{"level":2,"title":"4. Testcontainers桌面","slug":"_4-testcontainers桌面","link":"#_4-testcontainers桌面","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719618786000,"updatedTime":1719618786000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.28,"words":1284},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-How to Reuse Testcontainers in Java.md","localizedDate":"2023年10月23日","excerpt":"\\n<p>在本教程中，我们将学习如何在本地开发和测试环境中设置环境时重用Testcontainers。</p>\\n<p>首先，我们必须确保在应用程序停止或测试套件完成时不关闭容器。之后，我们将讨论Testcontainer特定的配置，并讨论使用Testcontainers桌面应用程序的好处。最后，我们需要记住，重用Testcontainers是一个实验性功能，目前还不适合在CI流水线中使用。</p>\\n<h2>2. 确保Testcontainer不被停止</h2>\\n<p>通过@_Testcontainers和@_Container注解，我们可以简单地为我们的单元测试启用Testcontainers。</p>","autoDesc":true}');export{u as comp,m as data};
