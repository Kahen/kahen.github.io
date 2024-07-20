import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DfO5Xg_k.js";const e={},p=t(`<h1 id="spring-boot-应用程序中的日志属性" tabindex="-1"><a class="header-anchor" href="#spring-boot-应用程序中的日志属性"><span>Spring Boot 应用程序中的日志属性</span></a></h1><p>属性是 Spring Boot 提供的最有用机制之一。它们可以从不同的地方提供，例如专用属性文件、环境变量等。因此，有时查找并记录特定属性非常有用，例如在调试期间。</p><p>在这个简短的教程中，我们将看到几种不同的方式来查找并记录 Spring Boot 应用程序中的属性。</p><p>首先，我们将创建一个简单的测试应用程序，然后我们将尝试三种不同的方法来记录特定属性。</p><h2 id="_2-创建测试应用程序" tabindex="-1"><a class="header-anchor" href="#_2-创建测试应用程序"><span>2. 创建测试应用程序</span></a></h2><p>让我们创建一个包含三个自定义属性的简单应用程序。</p><p>我们可以使用 Spring Initializr 创建 Spring Boot 应用程序模板。我们将使用 Java 作为语言。我们也可以选择其他选项，例如 Java 版本、项目元数据等。</p><p>下一步是向我们的应用程序添加自定义属性。我们将这些属性添加到 <em>src/main/resources</em> 中的一个新的 <em>application.properties</em> 文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>app.name=MyApp
app.description=\${app.name} 是一个 Spring Boot 应用程序
bael.property=stagingValue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用上下文刷新事件记录属性" tabindex="-1"><a class="header-anchor" href="#_3-使用上下文刷新事件记录属性"><span>3. 使用上下文刷新事件记录属性</span></a></h2><p>在 Spring Boot 应用程序中记录属性的第一种方式是使用 Spring 事件，特别是 <em>org.springframework.context.event.ContextRefreshedEvent</em> 类和相应的 <em>EventListener</em>。我们将展示如何记录所有可用属性以及一个更详细的版本，该版本仅打印来自特定文件的属性。</p><h3 id="_3-1-记录所有属性" tabindex="-1"><a class="header-anchor" href="#_3-1-记录所有属性"><span>3.1. 记录所有属性</span></a></h3><p>让我们从创建一个 bean 和事件监听器方法开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppContextRefreshedEventPropertiesPrinter</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@EventListener</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handleContextRefreshed</span><span class="token punctuation">(</span><span class="token class-name">ContextRefreshedEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 事件处理逻辑</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用 <em>org.springframework.context.event.EventListener</em> 注解标记事件监听器方法。当 <em>ContextRefreshedEvent</em> 发生时，Spring 将调用标记的方法。</p><p>下一步是从触发的事件中获取 <em>org.springframework.core.env.ConfigurableEnvironment</em> 接口的实例。<strong><em>ConfigurableEnvironment</em> 接口提供了一个有用的方法 <em>getPropertySources()</em>，我们将使用它来获取所有属性源的列表</strong>，例如环境、JVM 或属性文件变量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ConfigurableEnvironment</span> env <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ConfigurableEnvironment</span><span class="token punctuation">)</span> event<span class="token punctuation">.</span><span class="token function">getApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在让我们看看如何使用它来打印所有属性，不仅仅是来自 <em>application.properties</em> 文件的属性，还包括环境、JVM 变量等：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>env<span class="token punctuation">.</span><span class="token function">getPropertySources</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>ps <span class="token operator">-&gt;</span> ps <span class="token keyword">instanceof</span> <span class="token class-name">MapPropertySource</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>ps <span class="token operator">-&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">MapPropertySource</span><span class="token punctuation">)</span> ps<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token class-name">Collection</span><span class="token operator">::</span><span class="token function">stream</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">distinct</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">sorted</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>key <span class="token operator">-&gt;</span> <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;{}={}&quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> env<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们从可用属性源创建一个 <em>Stream</em>。然后，我们使用其 <em>filter()</em> 方法遍历 <em>org.springframework.core.env.MapPropertySource</em> 类的实例的属性源。</p><p>顾名思义，该属性源中的属性存储在映射结构中。我们在下一步中使用它，其中我们使用流的 <em>map()</em> 方法来获取属性键的集合。</p><p>接下来，我们使用 <em>Stream</em> 的 <em>flatMap()</em> 方法，因为我们想要迭代单个属性键，而不是一组键。我们还想按字母顺序打印唯一属性，而不是重复的属性。</p><p>最后一步是记录属性键及其值。</p><p>当我们启动应用程序时，我们应该看到从各种来源获取的属性列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>COMMAND_MODE=unix2003
CONSOLE_LOG_CHARSET=UTF-8
...
bael.property=defaultValue
app.name=MyApp
app.description=MyApp is a Spring Boot application
...
java.class.version=52.0
java.runtime.name=OpenJDK Runtime Environment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-仅记录来自-application-properties-文件的属性" tabindex="-1"><a class="header-anchor" href="#_3-2-仅记录来自-application-properties-文件的属性"><span>3.2. 仅记录来自 <em>application.properties</em> 文件的属性</span></a></h3><p>如果我们想要记录仅在 <em>application.properties</em> 文件中找到的属性，我们可以重用几乎所有之前的代码。我们只需要更改传递给 <em>filter()</em> 方法的 lambda 函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>env<span class="token punctuation">.</span><span class="token function">getPropertySources</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>ps <span class="token operator">-&gt;</span> ps <span class="token keyword">instanceof</span> <span class="token class-name">MapPropertySource</span> <span class="token operator">&amp;&amp;</span> ps<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;application.properties&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，当我们启动应用程序时，我们应该看到以下日志：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>bael.property=defaultValue
app.name=MyApp
app.description=MyApp is a Spring Boot application
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用-environment-接口记录属性" tabindex="-1"><a class="header-anchor" href="#_4-使用-environment-接口记录属性"><span>4. 使用 <em>Environment</em> 接口记录属性</span></a></h2><p>记录属性的另一种方式是使用 <em>org.springframework.core.env.Environment</em> 接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EnvironmentPropertiesPrinter</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">Environment</span> env<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">logApplicationProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;{}={}&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;bael.property&quot;</span><span class="token punctuation">,</span> env<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;bael.property&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;{}={}&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;app.name&quot;</span><span class="token punctuation">,</span> env<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;app.name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;{}={}&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;app.description&quot;</span><span class="token punctuation">,</span> env<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;app.description&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与上下文刷新事件方法相比，唯一的限制是 <strong>我们需要知道属性名称才能获取其值</strong>。环境接口不提供列出所有属性的方法。另一方面，这绝对是一个更短且更简单的技术。</p><p>当我们启动应用程序时，我们应该看到与之前相同的输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>bael.property=defaultValue
app.name=MyApp
app.description=MyApp is a Spring Boot application
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用-spring-actuator-记录属性" tabindex="-1"><a class="header-anchor" href="#_5-使用-spring-actuator-记录属性"><span>5. 使用 Spring Actuator 记录属性</span></a></h2><p>Spring Actuator 是一个非常有用的库，它为我们的应用程序带来了生产就绪的特性。<strong><em>/env</em> REST 端点返回当前环境属性</strong>。</p><p>首先，让我们将 Spring Actuator 库添加到我们的项目中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.springframework.boot\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`spring-boot-starter-actuator\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`3.0.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们需要启用 <em>/env</em> 端点，因为它默认是禁用的。让我们打开 <em>application.properties</em> 并添加以下条目：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>management.endpoints.web.exposure.include=env
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们所要做的就是启动应用程序并转到 <em>/env</em> 端点。在我们的例子中，地址是 <em>http://localhost:8080/actuator/env.</em> 我们应该看到一个包含所有环境变量的大量 JSON，包括我们的属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
  &quot;activeProfiles&quot;: [],
  &quot;propertySources&quot;: [
    ...
    {
      &quot;name&quot;: &quot;Config resource &#39;class path resource [application.properties]&#39; via location &#39;optional:classpath:/&#39; (document #0)&quot;,
      &quot;properties&quot;: {
        &quot;app.name&quot;: {
          &quot;value&quot;: &quot;MyApp&quot;,
          &quot;origin&quot;: &quot;class path resource [application.properties] - 10:10&quot;
        },
        &quot;app.description&quot;: {
          &quot;value&quot;: &quot;MyApp is a Spring Boot application&quot;,
          &quot;origin&quot;: &quot;class path resource [application.properties] - 11:17&quot;
        },
        &quot;bael.property&quot;: {
          &quot;value&quot;: &quot;defaultValue&quot;,
          &quot;origin&quot;: &quot;class path resource [application.properties] - 13:15&quot;
        }
      }
    }
   ...
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了如何在 Spring Boot 应用程序中记录属性。</p><p>首先，我们创建了一个带有三个自定义属性的测试应用程序。然后，我们看到了三种不同的检索和记录所需属性的方式。</p><p>如往常一样，本文的完整源代码可在 GitHub 上获取。</p>`,48),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","2024-07-13-Log Properties in a Spring Boot Application.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Log%20Properties%20in%20a%20Spring%20Boot%20Application.html","title":"Spring Boot 应用程序中的日志属性","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Boot","Logging"],"tag":["Spring Boot","Logging","Properties"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Logging, Properties"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Log%20Properties%20in%20a%20Spring%20Boot%20Application.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Boot 应用程序中的日志属性"}],["meta",{"property":"og:description","content":"Spring Boot 应用程序中的日志属性 属性是 Spring Boot 提供的最有用机制之一。它们可以从不同的地方提供，例如专用属性文件、环境变量等。因此，有时查找并记录特定属性非常有用，例如在调试期间。 在这个简短的教程中，我们将看到几种不同的方式来查找并记录 Spring Boot 应用程序中的属性。 首先，我们将创建一个简单的测试应用程序，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T05:43:12.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Logging"}],["meta",{"property":"article:tag","content":"Properties"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T05:43:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot 应用程序中的日志属性\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T05:43:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Boot 应用程序中的日志属性 属性是 Spring Boot 提供的最有用机制之一。它们可以从不同的地方提供，例如专用属性文件、环境变量等。因此，有时查找并记录特定属性非常有用，例如在调试期间。 在这个简短的教程中，我们将看到几种不同的方式来查找并记录 Spring Boot 应用程序中的属性。 首先，我们将创建一个简单的测试应用程序，..."},"headers":[{"level":2,"title":"2. 创建测试应用程序","slug":"_2-创建测试应用程序","link":"#_2-创建测试应用程序","children":[]},{"level":2,"title":"3. 使用上下文刷新事件记录属性","slug":"_3-使用上下文刷新事件记录属性","link":"#_3-使用上下文刷新事件记录属性","children":[{"level":3,"title":"3.1. 记录所有属性","slug":"_3-1-记录所有属性","link":"#_3-1-记录所有属性","children":[]},{"level":3,"title":"3.2. 仅记录来自 application.properties 文件的属性","slug":"_3-2-仅记录来自-application-properties-文件的属性","link":"#_3-2-仅记录来自-application-properties-文件的属性","children":[]}]},{"level":2,"title":"4. 使用 Environment 接口记录属性","slug":"_4-使用-environment-接口记录属性","link":"#_4-使用-environment-接口记录属性","children":[]},{"level":2,"title":"5. 使用 Spring Actuator 记录属性","slug":"_5-使用-spring-actuator-记录属性","link":"#_5-使用-spring-actuator-记录属性","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720849392000,"updatedTime":1720849392000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.69,"words":1408},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Log Properties in a Spring Boot Application.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>属性是 Spring Boot 提供的最有用机制之一。它们可以从不同的地方提供，例如专用属性文件、环境变量等。因此，有时查找并记录特定属性非常有用，例如在调试期间。</p>\\n<p>在这个简短的教程中，我们将看到几种不同的方式来查找并记录 Spring Boot 应用程序中的属性。</p>\\n<p>首先，我们将创建一个简单的测试应用程序，然后我们将尝试三种不同的方法来记录特定属性。</p>\\n<h2>2. 创建测试应用程序</h2>\\n<p>让我们创建一个包含三个自定义属性的简单应用程序。</p>\\n<p>我们可以使用 Spring Initializr 创建 Spring Boot 应用程序模板。我们将使用 Java 作为语言。我们也可以选择其他选项，例如 Java 版本、项目元数据等。</p>","autoDesc":true}');export{d as comp,v as data};
