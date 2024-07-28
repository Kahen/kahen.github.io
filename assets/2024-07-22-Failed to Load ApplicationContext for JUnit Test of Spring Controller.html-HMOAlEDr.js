import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DzJ3ruqA.js";const e={},o=t(`<hr><h1 id="spring-boot应用中junit测试控制器加载applicationcontext失败" tabindex="-1"><a class="header-anchor" href="#spring-boot应用中junit测试控制器加载applicationcontext失败"><span>Spring Boot应用中JUnit测试控制器加载ApplicationContext失败</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在Spring Boot应用中，<strong>混合定义Bean的方式包括基于注解和基于XML的配置</strong>。在这种环境下，我们可能想要在测试类中使用基于XML的配置。然而，在这种情况下，有时我们可能会遇到“<strong>加载ApplicationContext失败</strong>”的应用程序上下文加载错误。这个错误出现在测试类中，因为测试环境中没有加载应用程序上下文。</p><p>在本教程中，我们将讨论如何在Spring Boot应用中将XML应用程序上下文集成到测试中。</p><p>让我们通过在Spring Boot应用中集成基于XML的应用程序上下文来重现错误。</p><p>首先，假设我们有一个定义了服务Bean的_application-context.xml_文件：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>\`\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.springframework.org/schema/beans<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>
    http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\`

    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>employeeServiceImpl<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.baeldung.xmlapplicationcontext.service.EmployeeServiceImpl<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以将_application-context.xml_文件添加到_webapp/WEB-INF/_位置：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/01/ApplicationContextDirecory.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们还将创建服务接口和类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">EmployeeService</span> <span class="token punctuation">{</span>
    <span class="token class-name">Employee</span> <span class="token function">getEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmployeeServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">EmployeeService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Employee</span> <span class="token function">getEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Admin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将创建一个测试用例，用于从应用程序上下文中获取_EmployeeService_ Bean：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RunWith</span><span class="token punctuation">(</span><span class="token class-name">SpringRunner</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ContextConfiguration</span><span class="token punctuation">(</span>locations<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">&quot;classpath:WEB-INF/application-context.xml&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmployeeServiceAppContextIntegrationTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">EmployeeService</span> service<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenContextLoads_thenServiceISNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">assertThat</span><span class="token punctuation">(</span>service<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在如果我们尝试运行这个测试，我们会观察到错误：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>java.lang.IllegalStateException: Failed to load ApplicationContext
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个错误出现在测试类中，因为测试上下文中没有加载应用程序上下文。此外，<strong>根本原因是_WEB-INF_没有包含在类路径中</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ContextConfiguration</span><span class="token punctuation">(</span>locations<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">&quot;classpath:WEB-INF/application-context.xml&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-在测试中使用基于xml的-applicationcontext" tabindex="-1"><a class="header-anchor" href="#_3-在测试中使用基于xml的-applicationcontext"><span>3. 在测试中使用基于XML的_ApplicationContext_</span></a></h2><p>让我们看看如何在测试类中使用基于XML的_ApplicationContext_。<strong>我们有两种选项在测试中使用基于XML的_ApplicationContext_</strong>：<em>@SpringBootTest_和</em>@ContextConfiguration_注解。</p><h3 id="_3-1-使用-springboottest-和-importresource-进行测试" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-springboottest-和-importresource-进行测试"><span>3.1. 使用_@SpringBootTest_和_@ImportResource_进行测试</span></a></h3><p>Spring Boot提供了_@SpringBootTest_注解，我们可以使用它来创建一个用于测试的应用程序上下文。此外，<strong>我们必须在Spring Boot主类中使用_@ImportResource_来读取XML Bean</strong>。这个注解允许我们导入一个或多个包含Bean定义的资源。</p><p>首先，让我们在主类中使用_@ImportResource_注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@ImportResource</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;classpath*:application-context.xml&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们为从应用程序上下文中获取_EmployeeService_ Bean创建一个测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RunWith</span><span class="token punctuation">(</span><span class="token class-name">SpringRunner</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@SpringBootTest</span><span class="token punctuation">(</span>classes <span class="token operator">=</span> <span class="token class-name">XmlBeanApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmployeeServiceAppContextIntegrationTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">EmployeeService</span> service<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenContextLoads_thenServiceISNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">assertThat</span><span class="token punctuation">(</span>service<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>@ImportResource_注解加载位于_resource_目录中的XML Bean。此外，</em>@SpringBootTest_注解加载整个应用的Bean到测试类中。因此，我们能够在测试类中访问_EmployeeService_ Bean。</p><h3 id="_3-2-使用-contextconfiguration-与-resources-进行测试" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-contextconfiguration-与-resources-进行测试"><span>3.2. 使用_@ContextConfiguration_与_resources_进行测试</span></a></h3><p><strong>我们可以通过将测试配置文件放置在_src/test/resources_目录中来创建具有不同Bean配置的测试上下文</strong>。</p><p>在这种情况下，我们<strong>使用_@ContextConfiguration_注解从_src/test/resources_目录加载测试上下文</strong>。</p><p>首先，让我们从_EmployeeService_接口创建另一个Bean：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmployeeServiceTestImpl</span> <span class="token keyword">implements</span> <span class="token class-name">EmployeeService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Employee</span> <span class="token function">getEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung-Test&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Admin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们将在_src/test/resources_目录中创建_test-context.xml_文件：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>\`\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.springframework.org/schema/beans<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\`

    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>employeeServiceTestImpl<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>process.service.EmployeeServiceTestImpl<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将创建测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token annotation punctuation">@ContextConfiguration</span><span class="token punctuation">(</span>locations <span class="token operator">=</span> <span class="token string">&quot;/test-context.xml&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmployeeServiceTestContextIntegrationTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">&quot;employeeServiceTestImpl&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">EmployeeService</span> serviceTest<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenTestContextLoads_thenServiceTestISNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">assertThat</span><span class="token punctuation">(</span>serviceTest<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里我们使用_@ContextConfiguration_注解从_test-context.xml_加载了_employeeServiceTestImpl_。</p><h3 id="_3-3-使用-contextconfiguration-与-web-inf-进行测试" tabindex="-1"><a class="header-anchor" href="#_3-3-使用-contextconfiguration-与-web-inf-进行测试"><span>3.3. 使用_@ContextConfiguration_与_WEB-INF_进行测试</span></a></h3><p><strong>我们也可以从_WEB-INF_目录导入应用程序上下文到测试类中</strong>。为此，我们可以使用其_file_ URL来定位应用程序上下文：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RunWith</span><span class="token punctuation">(</span><span class="token class-name">SpringRunner</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ContextConfiguration</span><span class="token punctuation">(</span>locations <span class="token operator">=</span> <span class="token string">&quot;file:src/main/webapp/WEB-INF/application-context.xml&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了如何在Spring Boot应用的测试类中使用基于XML的配置文件。和往常一样，本文中使用的所有源代码都可以在GitHub上找到。</p>`,42),p=[o];function i(c,l){return s(),a("div",null,p)}const d=n(e,[["render",i],["__file","2024-07-22-Failed to Load ApplicationContext for JUnit Test of Spring Controller.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-Failed%20to%20Load%20ApplicationContext%20for%20JUnit%20Test%20of%20Spring%20Controller.html","title":"Spring Boot应用中JUnit测试控制器加载ApplicationContext失败","lang":"zh-CN","frontmatter":{"date":"2022-01-01T00:00:00.000Z","category":["Spring Boot","JUnit"],"tag":["ApplicationContext","XML Configuration"],"head":[["meta",{"name":"keywords","content":"Spring Boot, JUnit, ApplicationContext, XML Configuration"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-Failed%20to%20Load%20ApplicationContext%20for%20JUnit%20Test%20of%20Spring%20Controller.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Boot应用中JUnit测试控制器加载ApplicationContext失败"}],["meta",{"property":"og:description","content":"Spring Boot应用中JUnit测试控制器加载ApplicationContext失败 1. 概述 在Spring Boot应用中，混合定义Bean的方式包括基于注解和基于XML的配置。在这种环境下，我们可能想要在测试类中使用基于XML的配置。然而，在这种情况下，有时我们可能会遇到“加载ApplicationContext失败”的应用程序上下文加..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/01/ApplicationContextDirecory.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T17:53:15.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ApplicationContext"}],["meta",{"property":"article:tag","content":"XML Configuration"}],["meta",{"property":"article:published_time","content":"2022-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T17:53:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot应用中JUnit测试控制器加载ApplicationContext失败\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/01/ApplicationContextDirecory.png\\"],\\"datePublished\\":\\"2022-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T17:53:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Boot应用中JUnit测试控制器加载ApplicationContext失败 1. 概述 在Spring Boot应用中，混合定义Bean的方式包括基于注解和基于XML的配置。在这种环境下，我们可能想要在测试类中使用基于XML的配置。然而，在这种情况下，有时我们可能会遇到“加载ApplicationContext失败”的应用程序上下文加..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"3. 在测试中使用基于XML的_ApplicationContext_","slug":"_3-在测试中使用基于xml的-applicationcontext","link":"#_3-在测试中使用基于xml的-applicationcontext","children":[{"level":3,"title":"3.1. 使用_@SpringBootTest_和_@ImportResource_进行测试","slug":"_3-1-使用-springboottest-和-importresource-进行测试","link":"#_3-1-使用-springboottest-和-importresource-进行测试","children":[]},{"level":3,"title":"3.2. 使用_@ContextConfiguration_与_resources_进行测试","slug":"_3-2-使用-contextconfiguration-与-resources-进行测试","link":"#_3-2-使用-contextconfiguration-与-resources-进行测试","children":[]},{"level":3,"title":"3.3. 使用_@ContextConfiguration_与_WEB-INF_进行测试","slug":"_3-3-使用-contextconfiguration-与-web-inf-进行测试","link":"#_3-3-使用-contextconfiguration-与-web-inf-进行测试","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721670795000,"updatedTime":1721670795000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.43,"words":1029},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-Failed to Load ApplicationContext for JUnit Test of Spring Controller.md","localizedDate":"2022年1月1日","excerpt":"<hr>\\n<h1>Spring Boot应用中JUnit测试控制器加载ApplicationContext失败</h1>\\n<h2>1. 概述</h2>\\n<p>在Spring Boot应用中，<strong>混合定义Bean的方式包括基于注解和基于XML的配置</strong>。在这种环境下，我们可能想要在测试类中使用基于XML的配置。然而，在这种情况下，有时我们可能会遇到“<strong>加载ApplicationContext失败</strong>”的应用程序上下文加载错误。这个错误出现在测试类中，因为测试环境中没有加载应用程序上下文。</p>\\n<p>在本教程中，我们将讨论如何在Spring Boot应用中将XML应用程序上下文集成到测试中。</p>","autoDesc":true}');export{d as comp,k as data};
