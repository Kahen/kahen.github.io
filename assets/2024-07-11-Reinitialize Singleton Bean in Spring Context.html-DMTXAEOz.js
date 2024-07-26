import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-8nJ1rqSf.js";const e={},p=t(`<h1 id="在spring上下文中重新初始化单例bean" tabindex="-1"><a class="header-anchor" href="#在spring上下文中重新初始化单例bean"><span>在Spring上下文中重新初始化单例Bean</span></a></h1><p>在本教程中，我们将探讨在运行时重新初始化Spring单例Bean的方法。默认情况下，Spring应用程序生命周期中不会重新初始化具有单例作用域的Bean。然而，在某些情况下，可能需要重新创建Bean，例如当更新属性时。我们将查看几种实现此目的的方法。</p><h2 id="_2-代码设置" tabindex="-1"><a class="header-anchor" href="#_2-代码设置"><span>2. 代码设置</span></a></h2><p>为了更好地理解这一点，我们将创建一个小项目。我们将创建一个Bean，它从配置文件中读取配置属性，并将它们保存在内存中以实现更快的访问。如果文件中的属性发生变化，可能需要重新加载配置。</p><h3 id="_2-1-单例bean" tabindex="-1"><a class="header-anchor" href="#_2-1-单例bean"><span>2.1. 单例Bean</span></a></h3><p>让我们首先创建_ConfigManager_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span><span class="token punctuation">(</span><span class="token string">&quot;ConfigManager&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigManager</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Log</span> <span class="token constant">LOG</span> <span class="token operator">=</span> <span class="token class-name">LogFactory</span><span class="token punctuation">.</span><span class="token function">getLog</span><span class="token punctuation">(</span><span class="token class-name">ConfigManager</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Map</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\` config<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> filePath<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">ConfigManager</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${config.file.path}&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> filePath<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>filePath <span class="token operator">=</span> filePath<span class="token punctuation">;</span>
        <span class="token function">initConfigs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">initConfigs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Properties</span> properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            properties<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">newInputStream</span><span class="token punctuation">(</span><span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>filePath<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token constant">LOG</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;Error loading configuration:&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        config <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\` entry <span class="token operator">:</span> properties<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            config<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">getConfig</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> config<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于这个类，有几点需要注意：</p><ul><li>从构造函数中调用_initConfigs()_方法，一旦Bean构建完成，就立即加载文件。</li><li>_initConfigs()<em>方法将文件内容转换为名为_config_的_Map</em>。</li><li>_getConfig()_方法用于通过其键读取属性。</li></ul><p><strong>另一个需要注意的点是构造函数依赖注入。稍后，当我们需要替换Bean时，我们将使用它。</strong></p><p>配置文件位于路径_src/main/resources/config.properties_，并包含一个属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>property1=value1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-2-控制器" tabindex="-1"><a class="header-anchor" href="#_2-2-控制器"><span>2.2. 控制器</span></a></h3><p>为了测试_ConfigManager_，让我们创建一个控制器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/config&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">ConfigManager</span> configManager<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/{key}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> configManager<span class="token punctuation">.</span><span class="token function">getConfig</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以运行应用程序，并通过访问URL <em>http://localhost:8080/config/property1</em> 来读取配置。</p><p>接下来，我们希望更改文件中的属性值，并在我们再次读取配置时反映这一变化。让我们看看实现这一点的几种方法。</p><h2 id="_3-使用公共方法重新加载属性" tabindex="-1"><a class="header-anchor" href="#_3-使用公共方法重新加载属性"><span>3. 使用公共方法重新加载属性</span></a></h2><p><strong>如果我们想要重新加载属性而不是重新创建对象本身，我们可以简单地创建一个公共方法来再次初始化映射表。</strong> 在我们的_ConfigManager_中，让我们添加一个调用_initConfigs()_方法的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">reinitializeConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">initConfigs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，当我们想要重新加载属性时，可以调用这个方法。让我们在控制器类中公开另一个调用_reinitializeConfig()_方法的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/reinitializeConfig&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">reinitializeConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    configManager<span class="token punctuation">.</span><span class="token function">reinitializeConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以运行应用程序并通过以下简单步骤进行测试：</p><ul><li>访问URL <em>http://localhost:8080/config/property1</em> 返回_value1_。</li><li>然后我们将_property1_的值从_value1_更改为_value2_。</li><li>然后我们可以访问URL <em>http://localhost:8080/config/reinitializeConfig</em> 来重新初始化配置映射表。</li><li>如果我们再次访问URL <em>http://localhost:8080/config/property1</em>，我们将发现返回的值是_value2_。</li></ul><h2 id="_4-重新初始化单例bean" tabindex="-1"><a class="header-anchor" href="#_4-重新初始化单例bean"><span>4. 重新初始化单例Bean</span></a></h2><p>重新初始化Bean的另一种方式是通过在上下文中重新创建它。可以通过使用自定义代码调用构造函数或通过删除Bean并让上下文自动重新初始化它来完成。让我们看看这两种方法。</p><h3 id="_4-1-在上下文中替换bean" tabindex="-1"><a class="header-anchor" href="#_4-1-在上下文中替换bean"><span>4.1. 在上下文中替换Bean</span></a></h3><p>我们可以从上下文中删除Bean，并用新的_ConfigManager_实例替换它。让我们在我们的控制器中定义另一种方法来实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/reinitializeBean&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">reinitializeBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">DefaultSingletonBeanRegistry</span> registry <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">DefaultSingletonBeanRegistry</span><span class="token punctuation">)</span> applicationContext<span class="token punctuation">.</span><span class="token function">getAutowireCapableBeanFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    registry<span class="token punctuation">.</span><span class="token function">destroySingleton</span><span class="token punctuation">(</span><span class="token string">&quot;ConfigManager&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    registry<span class="token punctuation">.</span><span class="token function">registerSingleton</span><span class="token punctuation">(</span><span class="token string">&quot;ConfigManager&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">ConfigManager</span><span class="token punctuation">(</span>filePath<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们从应用程序上下文中获取_DefaultSingletonBeanRegistry_的实例。接下来，我们调用_destroySingleton()_方法来销毁名为_ConfigManager_的Bean实例。最后，我们创建一个新的_ConfigManager_实例，并通过调用_registerSingleton()_方法将其注册到工厂中。</p><p>要创建新实例，我们使用了在_ConfigManager_中定义的构造函数。<strong>Bean依赖的任何依赖项都必须通过构造函数传递。</strong></p><p>_registerSingleton()_方法不仅在上下文中创建了Bean，还将其自动装配到依赖对象中。</p><p>调用_/reinitializeBean_端点更新了控制器中的_ConfigManager_ Bean。我们可以使用与前面方法相同的步骤测试重新初始化行为。</p><h3 id="_4-2-在上下文中销毁bean" tabindex="-1"><a class="header-anchor" href="#_4-2-在上下文中销毁bean"><span>4.2. 在上下文中销毁Bean</span></a></h3><p>在前面的方法中，我们需要通过构造函数传递依赖项。有时，我们可能不需要创建Bean的新实例，或者可能没有访问所需的依赖项。在这种情况下，<strong>另一种可能性只是销毁上下文中的Bean。</strong></p><p><strong>上下文会在再次请求Bean时再次创建它。在这种情况下，它将使用与初始Bean创建相同的步骤来创建它。</strong></p><p>为了演示这一点，让我们创建一个新的控制器方法，销毁Bean但不再次创建它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/destroyBean&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">destroyBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">DefaultSingletonBeanRegistry</span> registry <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">DefaultSingletonBeanRegistry</span><span class="token punctuation">)</span> applicationContext<span class="token punctuation">.</span><span class="token function">getAutowireCapableBeanFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    registry<span class="token punctuation">.</span><span class="token function">destroySingleton</span><span class="token punctuation">(</span><span class="token string">&quot;ConfigManager&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这不会改变控制器已经持有的Bean的引用。<strong>要访问最新状态，我们需要直接从上下文中读取它。</strong></p><p>让我们创建一个新的控制器来读取配置。这个控制器将依赖于上下文中最新的_ConfigManager_ Bean：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/context/{key}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">getFromContext</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ConfigManager</span> dynamicConfigManager <span class="token operator">=</span> applicationContext<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">ConfigManager</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> dynamicConfigManager<span class="token punctuation">.</span><span class="token function">getConfig</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用以下简单步骤测试上述方法：</p><ul><li>访问URL <em>http://localhost:8080/config/context/property1</em> 返回_value1_。</li><li>然后我们可以访问URL <em>http://localhost:8080/config/destroyBean</em> 来销毁_ConfigManager_。</li><li>然后我们将_property1_的值从_value1_更改为_value2_。</li><li>如果我们再次访问URL <em>http://localhost:8080/config/context/property1</em>，我们将发现返回的值是_value2_。</li></ul><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了重新初始化单例Bean的方法。我们查看了一种在不重新创建它的情况下更改Bean属性的方法。我们还查看了在上下文中强制重新创建Bean的方法。</p><p>如常，本文中使用的所有代码示例都可以在GitHub上找到。</p>`,46),o=[p];function i(c,l){return s(),a("div",null,o)}const k=n(e,[["render",i],["__file","2024-07-11-Reinitialize Singleton Bean in Spring Context.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Reinitialize%20Singleton%20Bean%20in%20Spring%20Context.html","title":"在Spring上下文中重新初始化单例Bean","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring","Java"],"tag":["Spring Framework","Singleton Bean"],"head":[["meta",{"name":"keywords","content":"Spring, Singleton Bean, Configuration, Reinitialization"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Reinitialize%20Singleton%20Bean%20in%20Spring%20Context.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Spring上下文中重新初始化单例Bean"}],["meta",{"property":"og:description","content":"在Spring上下文中重新初始化单例Bean 在本教程中，我们将探讨在运行时重新初始化Spring单例Bean的方法。默认情况下，Spring应用程序生命周期中不会重新初始化具有单例作用域的Bean。然而，在某些情况下，可能需要重新创建Bean，例如当更新属性时。我们将查看几种实现此目的的方法。 2. 代码设置 为了更好地理解这一点，我们将创建一个小项..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T19:36:27.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Framework"}],["meta",{"property":"article:tag","content":"Singleton Bean"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T19:36:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Spring上下文中重新初始化单例Bean\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T19:36:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Spring上下文中重新初始化单例Bean 在本教程中，我们将探讨在运行时重新初始化Spring单例Bean的方法。默认情况下，Spring应用程序生命周期中不会重新初始化具有单例作用域的Bean。然而，在某些情况下，可能需要重新创建Bean，例如当更新属性时。我们将查看几种实现此目的的方法。 2. 代码设置 为了更好地理解这一点，我们将创建一个小项..."},"headers":[{"level":2,"title":"2. 代码设置","slug":"_2-代码设置","link":"#_2-代码设置","children":[{"level":3,"title":"2.1. 单例Bean","slug":"_2-1-单例bean","link":"#_2-1-单例bean","children":[]},{"level":3,"title":"2.2. 控制器","slug":"_2-2-控制器","link":"#_2-2-控制器","children":[]}]},{"level":2,"title":"3. 使用公共方法重新加载属性","slug":"_3-使用公共方法重新加载属性","link":"#_3-使用公共方法重新加载属性","children":[]},{"level":2,"title":"4. 重新初始化单例Bean","slug":"_4-重新初始化单例bean","link":"#_4-重新初始化单例bean","children":[{"level":3,"title":"4.1. 在上下文中替换Bean","slug":"_4-1-在上下文中替换bean","link":"#_4-1-在上下文中替换bean","children":[]},{"level":3,"title":"4.2. 在上下文中销毁Bean","slug":"_4-2-在上下文中销毁bean","link":"#_4-2-在上下文中销毁bean","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720726587000,"updatedTime":1720726587000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.12,"words":1536},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Reinitialize Singleton Bean in Spring Context.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨在运行时重新初始化Spring单例Bean的方法。默认情况下，Spring应用程序生命周期中不会重新初始化具有单例作用域的Bean。然而，在某些情况下，可能需要重新创建Bean，例如当更新属性时。我们将查看几种实现此目的的方法。</p>\\n<h2>2. 代码设置</h2>\\n<p>为了更好地理解这一点，我们将创建一个小项目。我们将创建一个Bean，它从配置文件中读取配置属性，并将它们保存在内存中以实现更快的访问。如果文件中的属性发生变化，可能需要重新加载配置。</p>\\n<h3>2.1. 单例Bean</h3>\\n<p>让我们首先创建_ConfigManager_类：</p>","autoDesc":true}');export{k as comp,d as data};
