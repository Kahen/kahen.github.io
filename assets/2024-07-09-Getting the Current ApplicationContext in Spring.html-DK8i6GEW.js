import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as s}from"./app-CtR6X2Br.js";const e={},p=s(`<h1 id="在spring中获取当前的applicationcontext" tabindex="-1"><a class="header-anchor" href="#在spring中获取当前的applicationcontext"><span>在Spring中获取当前的ApplicationContext</span></a></h1><p>在这篇简短的教程中，我们将看到如何在Spring应用程序中获取当前的_ApplicationContext_。</p><p>_ApplicationContext_代表Spring IoC容器，它保存了应用程序创建的所有bean。它负责实例化、配置和创建bean。此外，它从XML或Java提供的配置元数据中获取bean的信息。</p><p>_ApplicationContext_是_BeanFactory_的子接口。除了_BeanFactory_的功能外，它还包括消息解析和国际化、资源加载和事件发布等功能。此外，它具有加载多个上下文的功能。</p><p><strong>每个bean都是在容器启动后实例化的，因为它使用急切加载。</strong></p><p>我们可能想要使用这个容器来访问我们应用程序中的其他bean和资源。我们将学习两种在Spring应用程序中获取当前_ApplicationContext_引用的方法。</p><h3 id="_3-applicationcontext-bean" tabindex="-1"><a class="header-anchor" href="#_3-applicationcontext-bean"><span>3. ApplicationContext Bean</span></a></h3><p><strong>获取当前_ApplicationContext_的最简单方式是使用_@Autowired_注解将其注入到我们的bean中。</strong></p><p>首先，让我们声明实例变量，并用_@Autowired_注解进行注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyBean</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">ApplicationContext</span> applicationContext<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">ApplicationContext</span> <span class="token function">getApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> applicationContext<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用_@Inject_注解代替_@Autowired_。</p><p>为了验证容器是否正确注入，让我们创建一个测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenGetApplicationContext_thenReturnApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>myBean<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ApplicationContext</span> context <span class="token operator">=</span> myBean<span class="token punctuation">.</span><span class="token function">getApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-applicationcontextaware-接口" tabindex="-1"><a class="header-anchor" href="#_4-applicationcontextaware-接口"><span>4. ApplicationContextAware 接口</span></a></h3><p>另一种获取当前上下文的方法是通过实现_ApplicationContextAware_接口。它包含_setApplicationContext()_方法，Spring在创建_ApplicationContext_后调用此方法。</p><p><strong>此外，当应用程序启动时，Spring会自动检测到这个接口，并将_ApplicationContext_的引用注入。</strong></p><p>现在，让我们创建实现_ApplicationContextAware_接口的_ApplicationContextProvider_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationContextProvider</span> <span class="token keyword">implements</span> <span class="token class-name">ApplicationContextAware</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ApplicationContext</span> applicationContext<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">ApplicationContext</span> applicationContext<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
        <span class="token class-name">ApplicationContextProvider</span><span class="token punctuation">.</span>applicationContext <span class="token operator">=</span> applicationContext<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ApplicationContext</span> <span class="token function">getApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> applicationContext<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们声明了_applicationContext_实例变量为_static_，这样我们可以在任何类中访问它。此外，我们创建了一个静态方法来检索对_ApplicationContext_的引用。</p><p>现在，我们可以通过调用静态的_getApplicationContext()_方法来获取当前的_ApplicationContext_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenGetApplicationContext_thenReturnApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ApplicationContext</span> context <span class="token operator">=</span> <span class="token class-name">ApplicationContextProvider</span><span class="token punctuation">.</span><span class="token function">getApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，通过实现接口，一个bean可以获得对_ApplicationContext_的引用，并访问其他bean或资源。</p><p>为了实现这一点，首先，让我们创建_ItemService_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ItemService</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其次，要从上下文中获取_ItemService_ bean，让我们在_ApplicationContext_上调用_getBean()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenGetBean_thenReturnItemServiceReference</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ApplicationContext</span> context <span class="token operator">=</span> <span class="token class-name">ApplicationContextProvider</span><span class="token punctuation">.</span><span class="token function">getApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">ItemService</span> itemService <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">ItemService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>itemService<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在这篇简短的文章中，我们学习了如何在Spring Boot应用程序中获取当前的_ApplicationContext_。总结起来，我们可以直接注入_ApplicationContext_ bean，或者实现_ApplicationContextAware_接口。</p><p>如常，所有源代码都可以在GitHub上找到。头文件中的日期、分类和标签信息需要根据网页内容来确定，而网页内容中并没有提供这些信息。考虑到这一点，我将使用通用的分类和标签来完成翻译。以下是翻译的继续部分：</p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在这篇简短的文章中，我们学习了如何在Spring Boot应用程序中获取当前的_ApplicationContext_。总结一下，我们可以直接注入_ApplicationContext_ bean，或者实现_ApplicationContextAware_接口。</p><p>正如往常一样，完整的源代码可以在GitHub上找到。</p><p><a href="kimi://action?name=cheer-on-kimi">给Kimi加油</a></p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/8b2c4148df481ca115ca7c0151fe8c93?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><hr><p>以上是翻译的完整内容。OK。</p>`,36),o=[p];function i(c,l){return t(),a("div",null,o)}const d=n(e,[["render",i],["__file","2024-07-09-Getting the Current ApplicationContext in Spring.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Getting%20the%20Current%20ApplicationContext%20in%20Spring.html","title":"在Spring中获取当前的ApplicationContext","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring","ApplicationContext"],"tag":["Spring Framework","ApplicationContext"],"head":[["meta",{"name":"keywords","content":"Spring, ApplicationContext, BeanFactory, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Getting%20the%20Current%20ApplicationContext%20in%20Spring.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Spring中获取当前的ApplicationContext"}],["meta",{"property":"og:description","content":"在Spring中获取当前的ApplicationContext 在这篇简短的教程中，我们将看到如何在Spring应用程序中获取当前的_ApplicationContext_。 _ApplicationContext_代表Spring IoC容器，它保存了应用程序创建的所有bean。它负责实例化、配置和创建bean。此外，它从XML或Java提供的配置元..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T16:48:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Framework"}],["meta",{"property":"article:tag","content":"ApplicationContext"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T16:48:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Spring中获取当前的ApplicationContext\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/8b2c4148df481ca115ca7c0151fe8c93?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T16:48:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Spring中获取当前的ApplicationContext 在这篇简短的教程中，我们将看到如何在Spring应用程序中获取当前的_ApplicationContext_。 _ApplicationContext_代表Spring IoC容器，它保存了应用程序创建的所有bean。它负责实例化、配置和创建bean。此外，它从XML或Java提供的配置元..."},"headers":[{"level":3,"title":"3. ApplicationContext Bean","slug":"_3-applicationcontext-bean","link":"#_3-applicationcontext-bean","children":[]},{"level":3,"title":"4. ApplicationContextAware 接口","slug":"_4-applicationcontextaware-接口","link":"#_4-applicationcontextaware-接口","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720543688000,"updatedTime":1720543688000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.05,"words":914},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Getting the Current ApplicationContext in Spring.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这篇简短的教程中，我们将看到如何在Spring应用程序中获取当前的_ApplicationContext_。</p>\\n<p>_ApplicationContext_代表Spring IoC容器，它保存了应用程序创建的所有bean。它负责实例化、配置和创建bean。此外，它从XML或Java提供的配置元数据中获取bean的信息。</p>\\n<p>_ApplicationContext_是_BeanFactory_的子接口。除了_BeanFactory_的功能外，它还包括消息解析和国际化、资源加载和事件发布等功能。此外，它具有加载多个上下文的功能。</p>\\n<p><strong>每个bean都是在容器启动后实例化的，因为它使用急切加载。</strong></p>","autoDesc":true}');export{d as comp,m as data};
