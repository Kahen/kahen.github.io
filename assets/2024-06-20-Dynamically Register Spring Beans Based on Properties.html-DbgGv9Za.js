import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-D1jsmMBg.js";const e={},p=t(`<h1 id="基于属性动态注册spring-bean" tabindex="-1"><a class="header-anchor" href="#基于属性动态注册spring-bean"><span>基于属性动态注册Spring Bean</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将探讨如何根据自定义属性动态注册Bean。我们将探索_BeanDefinitionRegistryPostProcessor_接口以及我们如何使用它来向应用程序上下文中添加Bean。</p><h2 id="_2-代码设置" tabindex="-1"><a class="header-anchor" href="#_2-代码设置"><span>2. 代码设置</span></a></h2><p>让我们先创建一个简单的Spring Boot应用程序。</p><p>首先，我们将定义一个我们想要动态注册的Bean。然后，<strong>我们将提供一个属性来决定如何注册Bean</strong>。最后，我们将定义一个配置类，根据我们的自定义属性来注册Bean。</p><h3 id="_2-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-依赖项"><span>2.1. 依赖项</span></a></h3><p>让我们首先添加Maven依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.springframework.boot\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`spring-boot-starter\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`3.2.3\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.springframework.boot\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`spring-boot-starter-test\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`3.2.3\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>\`test\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要添加_spring-boot-starter_和_spring-boot-starter-test_依赖项。</p><h3 id="_2-2-bean类" tabindex="-1"><a class="header-anchor" href="#_2-2-bean类"><span>2.2. Bean类</span></a></h3><p>接下来，我们定义一个我们想要根据自定义应用程序属性注册的API客户端：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApiClient</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> url<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> key<span class="token punctuation">;</span>
    <span class="token comment">// 标准getter, setter和构造函数</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getConnectionProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Connecting to &quot;</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">&quot; at &quot;</span> <span class="token operator">+</span> url<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设我们想使用这个Bean连接到不同的API，根据我们提供的属性。我们不想为每个API创建类定义。相反，我们想要定义属性并为每个API动态注册Bean。</p><p><strong>我们不应该用_@Component_或_@Service_注解_ApiClient_类，因为我们不想使用组件扫描来注册它作为Bean。</strong></p><h3 id="_2-3-属性" tabindex="-1"><a class="header-anchor" href="#_2-3-属性"><span>2.3. 属性</span></a></h3><p>让我们添加一个属性，决定Bean应该为哪些API注册。我们将在_application.yml_文件中定义这个属性：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">api</span><span class="token punctuation">:</span>
  <span class="token key atrule">clients</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> example
      <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//api.example.com
      <span class="token key atrule">key</span><span class="token punctuation">:</span> <span class="token number">12345</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> anotherexample
      <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//api.anotherexample.com
      <span class="token key atrule">key</span><span class="token punctuation">:</span> <span class="token number">67890</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们定义了两个客户端及其各自的属性。我们将在注册Bean时使用这些属性。</p><h2 id="_3-动态注册bean" tabindex="-1"><a class="header-anchor" href="#_3-动态注册bean"><span>3. 动态注册Bean</span></a></h2><p>Spring提供了一种使用_BeanDefinitionRegistryPostProcessor_接口动态注册Bean的方式。**这个接口允许我们在注解的Bean定义注册后添加或修改Bean定义。**由于它发生在Bean实例化之前，因此在应用程序上下文完全初始化之前，Bean就已经注册了。</p><h3 id="_3-1-beandefinitionregistrypostprocessor" tabindex="-1"><a class="header-anchor" href="#_3-1-beandefinitionregistrypostprocessor"><span>3.1. <em>BeanDefinitionRegistryPostProcessor</em></span></a></h3><p>让我们定义一个配置类，将根据自定义属性<strong>注册_ApiClient_ Bean</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApiClientConfiguration</span> <span class="token keyword">implements</span> <span class="token class-name">BeanDefinitionRegistryPostProcessor</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">API_CLIENT_BEAN_NAME</span> <span class="token operator">=</span> <span class="token string">&quot;apiClient_&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ApiClient</span><span class="token punctuation">&gt;</span></span>\` clients<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">ApiClientConfiguration</span><span class="token punctuation">(</span><span class="token class-name">Environment</span> environment<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Binder</span> binder <span class="token operator">=</span> <span class="token class-name">Binder</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>environment<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">HashMap</span><span class="token punctuation">&gt;</span></span>\` properties <span class="token operator">=</span> binder<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token string">&quot;api.clients&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Bindable</span><span class="token punctuation">.</span><span class="token function">listOf</span><span class="token punctuation">(</span><span class="token class-name">HashMap</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        clients <span class="token operator">=</span> properties<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>client <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">ApiClient</span><span class="token punctuation">(</span>
                <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>client<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>client<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;url&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>client<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">postProcessBeanDefinitionRegistry</span><span class="token punctuation">(</span><span class="token class-name">BeanDefinitionRegistry</span> registry<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
        clients<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>client <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token class-name">BeanDefinitionBuilder</span> builder <span class="token operator">=</span> <span class="token class-name">BeanDefinitionBuilder</span><span class="token punctuation">.</span><span class="token function">genericBeanDefinition</span><span class="token punctuation">(</span><span class="token class-name">ApiClient</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            builder<span class="token punctuation">.</span><span class="token function">addPropertyValue</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> client<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            builder<span class="token punctuation">.</span><span class="token function">addPropertyValue</span><span class="token punctuation">(</span><span class="token string">&quot;url&quot;</span><span class="token punctuation">,</span> client<span class="token punctuation">.</span><span class="token function">getUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            builder<span class="token punctuation">.</span><span class="token function">addPropertyValue</span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">,</span> client<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 注意这里应该是getKey()，原文中可能是个笔误</span>
            registry<span class="token punctuation">.</span><span class="token function">registerBeanDefinition</span><span class="token punctuation">(</span><span class="token constant">API_CLIENT_BEAN_NAME</span> <span class="token operator">+</span> client<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> builder<span class="token punctuation">.</span><span class="token function">getBeanDefinition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">postProcessBeanFactory</span><span class="token punctuation">(</span><span class="token class-name">ConfigurableListableBeanFactory</span> beanFactory<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在这里，我们实现了_BeanDefinitionRegistryPostProcessor_接口。我们重写了_postProcessBeanDefinitionRegistry_方法，该方法负责根据我们的自定义属性注册Bean。</strong></p><p>首先，我们定义了一个常量_API_CLIENT_BEAN_NAME_，它将用作Bean名称的前缀。在构造函数中，我们使用_Binder_ API从_Environment_对象中读取属性。然后，我们使用属性创建_ApiClient_对象。</p><p>在实现_postProcessBeanDefinitionRegistry()<em>方法时，我们遍历属性，并使用_BeanDefinitionRegistry_对象注册_ApiClient</em> Bean。</p><p>我们使用_BeanDefinitionBuilder_创建Bean。它要求我们定义Bean类。然后，它允许我们使用字段名称逐个设置Bean属性。</p><p><strong>请注意，我们为每个Bean注册了一个唯一名称 - API_CLIENT_BEAN_NAME + client.getName()。这将帮助我们想要从上下文中读取我们选择的Bean时。</strong></p><h3 id="_3-2-主应用程序类" tabindex="-1"><a class="header-anchor" href="#_3-2-主应用程序类"><span>3.2. 主应用程序类</span></a></h3><p>最后，我们需要定义主应用程序类，并用_@SpringBootApplication_注解它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RegistryPostProcessorApplication</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">RegistryPostProcessorApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">ApiClientConfiguration</span> <span class="token function">apiClientConfiguration</span><span class="token punctuation">(</span><span class="token class-name">ConfigurableEnvironment</span> environment<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ApiClientConfiguration</span><span class="token punctuation">(</span>environment<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们定义了_ApiClientConfiguration_ Bean，并将_ConfigurableEnvironment_对象传递给构造函数。这将帮助我们在_ApiClientConfiguration_类中读取属性。</p><h2 id="_4-测试" tabindex="-1"><a class="header-anchor" href="#_4-测试"><span>4. 测试</span></a></h2><p>现在Bean已经注册了，**让我们测试一下它们是否具有正确的属性来连接到API。**为此，我们将编写一个简单的测试类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">ApiClientConfigurationTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">ApplicationContext</span> context<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">givenBeansRegistered_whenConnect_thenConnected</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ApiClient</span> exampleClient <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ApiClient</span><span class="token punctuation">)</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">&quot;apiClient_example&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Connecting to example at https://api.example.com&quot;</span><span class="token punctuation">,</span> exampleClient<span class="token punctuation">.</span><span class="token function">getConnectionProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">ApiClient</span> anotherExampleClient <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ApiClient</span><span class="token punctuation">)</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">&quot;apiClient_anotherexample&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Connecting to anotherexample at https://api.anotherexample.com&quot;</span><span class="token punctuation">,</span> anotherExampleClient<span class="token punctuation">.</span><span class="token function">getConnectionProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_@SpringBootTest_注解来加载应用程序上下文。然后，我们使用_ApplicationContext_对象使用_getBean()_方法从上下文中获取Bean。_getBean()_方法接受唯一的Bean名称作为参数，并从上下文中返回Bean。</p><p>测试检查Bean是否正确注册并设置了正确的连接属性。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们探讨了如何使用_BeanDefinitionRegistryPostProcessor_接口根据自定义属性动态注册Spring Bean。我们还编写了一个简单的测试用例，展示了如何从上下文中检索Bean并使用它们。</p><p>如常，示例代码可在GitHub上找到。 OK</p>`,41),o=[p];function i(c,l){return a(),s("div",null,o)}const k=n(e,[["render",i],["__file","2024-06-20-Dynamically Register Spring Beans Based on Properties.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Dynamically%20Register%20Spring%20Beans%20Based%20on%20Properties.html","title":"基于属性动态注册Spring Bean","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Spring","Java"],"tag":["Spring Beans","Dynamic Registration"],"head":[["meta",{"name":"keywords","content":"Spring, Beans, Dynamic Registration, Properties"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Dynamically%20Register%20Spring%20Beans%20Based%20on%20Properties.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"基于属性动态注册Spring Bean"}],["meta",{"property":"og:description","content":"基于属性动态注册Spring Bean 1. 概述 在本教程中，我们将探讨如何根据自定义属性动态注册Bean。我们将探索_BeanDefinitionRegistryPostProcessor_接口以及我们如何使用它来向应用程序上下文中添加Bean。 2. 代码设置 让我们先创建一个简单的Spring Boot应用程序。 首先，我们将定义一个我们想要动..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Beans"}],["meta",{"property":"article:tag","content":"Dynamic Registration"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"基于属性动态注册Spring Bean\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"基于属性动态注册Spring Bean 1. 概述 在本教程中，我们将探讨如何根据自定义属性动态注册Bean。我们将探索_BeanDefinitionRegistryPostProcessor_接口以及我们如何使用它来向应用程序上下文中添加Bean。 2. 代码设置 让我们先创建一个简单的Spring Boot应用程序。 首先，我们将定义一个我们想要动..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 代码设置","slug":"_2-代码设置","link":"#_2-代码设置","children":[{"level":3,"title":"2.1. 依赖项","slug":"_2-1-依赖项","link":"#_2-1-依赖项","children":[]},{"level":3,"title":"2.2. Bean类","slug":"_2-2-bean类","link":"#_2-2-bean类","children":[]},{"level":3,"title":"2.3. 属性","slug":"_2-3-属性","link":"#_2-3-属性","children":[]}]},{"level":2,"title":"3. 动态注册Bean","slug":"_3-动态注册bean","link":"#_3-动态注册bean","children":[{"level":3,"title":"3.1. BeanDefinitionRegistryPostProcessor","slug":"_3-1-beandefinitionregistrypostprocessor","link":"#_3-1-beandefinitionregistrypostprocessor","children":[]},{"level":3,"title":"3.2. 主应用程序类","slug":"_3-2-主应用程序类","link":"#_3-2-主应用程序类","children":[]}]},{"level":2,"title":"4. 测试","slug":"_4-测试","link":"#_4-测试","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.11,"words":1232},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Dynamically Register Spring Beans Based on Properties.md","localizedDate":"2024年6月21日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将探讨如何根据自定义属性动态注册Bean。我们将探索_BeanDefinitionRegistryPostProcessor_接口以及我们如何使用它来向应用程序上下文中添加Bean。</p>\\n<h2>2. 代码设置</h2>\\n<p>让我们先创建一个简单的Spring Boot应用程序。</p>\\n<p>首先，我们将定义一个我们想要动态注册的Bean。然后，<strong>我们将提供一个属性来决定如何注册Bean</strong>。最后，我们将定义一个配置类，根据我们的自定义属性来注册Bean。</p>\\n<h3>2.1. 依赖项</h3>\\n<p>让我们首先添加Maven依赖项：</p>","autoDesc":true}');export{k as comp,d as data};
