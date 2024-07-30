import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as a,a as s}from"./app-CbPcg273.js";const t={},i=s(`<hr><h1 id="使用-spring-boot-的属性文件中的环境变量" tabindex="-1"><a class="header-anchor" href="#使用-spring-boot-的属性文件中的环境变量"><span>使用 Spring Boot 的属性文件中的环境变量</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将讨论如何在 Spring Boot 的 <em>application.properties</em> 和 <em>application.yml</em> 文件中使用环境变量。然后，我们将学习如何在代码中引用这些属性。</p><h2 id="_2-在-application-properties-文件中使用环境变量" tabindex="-1"><a class="header-anchor" href="#_2-在-application-properties-文件中使用环境变量"><span>2. 在 <em>application.properties</em> 文件中使用环境变量</span></a></h2><p>让我们定义一个名为 <em>JAVA_HOME</em> 的全局环境变量，其值为 “ <em>C:\\Program Files\\Java\\jdk-11.0.14</em>”。</p><p>要在 Spring Boot 的 <em>application.properties</em> 中使用此变量，我们需要将其用大括号包围：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>java.home=\${JAVA_HOME}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们也可以以相同的方式使用系统属性。例如，在 Windows 上，默认定义了一个 OS 属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>environment.name=\${OS}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>还可以组合多个变量值。让我们定义另一个环境变量 <em>HELLO_BAELDUNG</em>，其值为 “ <em>Hello Baeldung</em>”。现在我们可以连接我们的两个变量：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>baeldung.presentation=\${HELLO_BAELDUNG}. Java is installed in the folder: \${JAVA_HOME}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>属性 <em>baeldung.presentation</em> 现在包含以下文本：“ <em>Hello Baeldung. Java is installed in the folder: C:\\Program Files\\Java\\jdk-11.0.14</em>”。</p><p>这样，我们的属性根据环境具有不同的值。</p><h2 id="_3-在代码中使用我们的环境特定属性" tabindex="-1"><a class="header-anchor" href="#_3-在代码中使用我们的环境特定属性"><span>3. 在代码中使用我们的环境特定属性</span></a></h2><p>假设我们启动了一个 Spring 上下文，现在我们将看到如何将属性值注入到我们的代码中。</p><h3 id="_3-1-使用-value-注入值" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-value-注入值"><span>3.1. 使用 <em>@Value</em> 注入值</span></a></h3><p>首先，我们可以使用 <em>@Value</em> 注解。 <em>@Value</em> 处理 setter、构造函数和字段注入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${baeldung.presentation}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">String</span> baeldungPresentation<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-从-spring-environment-获取它" tabindex="-1"><a class="header-anchor" href="#_3-2-从-spring-environment-获取它"><span>3.2. 从 Spring <em>Environment</em> 获取它</span></a></h3><p>我们还可以通过对 Spring 的 <em>Environment</em> 进行自动装配来获取属性值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">Environment</span> environment<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在可以通过 <em>getProperty()</em> 方法检索属性值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>environment<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung.presentation&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-3-使用-configurationproperties-分组属性" tabindex="-1"><a class="header-anchor" href="#_3-3-使用-configurationproperties-分组属性"><span>3.3. 使用 <em>@ConfigurationProperties</em> 分组属性</span></a></h3><p>如果我们想要将属性分组在一起，《@ConfigurationProperties_ 注解非常有用。我们将定义一个 <em>Component</em>，它将收集所有具有给定前缀的属性，在我们的例子中是 <em>baeldung</em>。然后，我们可以为每个属性定义一个 setter。setter 的名称是属性名称的其余部分。在我们的例子中，我们只有一个，称为 <em>presentation</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BaeldungProperties</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> presentation<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getPresentation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> presentation<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setPresentation</span><span class="token punctuation">(</span><span class="token class-name">String</span> presentation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>presentation <span class="token operator">=</span> presentation<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在可以自动装配一个 <em>BaeldungProperties</em> 对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">BaeldungProperties</span> baeldungProperties<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，要获取特定属性的值，我们需要使用相应的 getter：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>baeldungProperties<span class="token punctuation">.</span><span class="token function">getPresentation</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-在-application-yml-文件中使用环境变量" tabindex="-1"><a class="header-anchor" href="#_4-在-application-yml-文件中使用环境变量"><span>4. 在 <em>application.yml</em> 文件中使用环境变量</span></a></h2><p>就像 <em>application.properties</em> 一样，《application.yml_ 是一个定义应用程序的各种属性和设置的配置文件。要使用环境变量，<strong>我们需要在属性占位符中声明其名称</strong>。</p><p>让我们看一个带有属性占位符和变量名称的示例 <em>application.yml</em> 文件：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>DATABASE_URL<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的示例显示我们正在尝试将数据库 URL 导入我们的 Spring Boot 应用程序。 <em>\${DATABASE_URL}</em> 表达式提示 Spring Boot 查找名为 <em>DATABASE_URL</em> 的环境变量。</p><p>要在 <em>application.yml</em> 中定义环境变量，我们必须以美元符号开始，后跟一个左大括号，环境变量的名称，和一个右大括号。所有这些结合在一起构成了属性占位符和环境变量名称。</p><p>此外，我们可以像使用 <em>application.properties</em> 一样在代码中使用环境特定属性。我们可以使用 <em>@Value</em> 注解注入值。还可以使用 <em>Environment</em> 类。最后，我们可以使用 <em>@ConfigurationProperties</em> 注解。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何定义具有不同环境值的属性并在代码中使用它们。此外，我们看到了如何在 <em>application.properties</em> 和 <em>application.yml</em> 文件中定义环境变量。最后，我们查看了将定义的属性注入到示例代码中的示例。</p><p>一如既往，代码可在 GitHub 上获取。</p>`,41),p=[i];function o(l,r){return a(),e("div",null,p)}const u=n(t,[["render",o],["__file","2024-07-16-Using Environment Variables in Spring Boot s Properties Files.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Using%20Environment%20Variables%20in%20Spring%20Boot%20s%20Properties%20Files.html","title":"使用 Spring Boot 的属性文件中的环境变量","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Boot","Properties"],"tag":["Environment Variables","Spring Boot"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Properties, Environment Variables"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Using%20Environment%20Variables%20in%20Spring%20Boot%20s%20Properties%20Files.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用 Spring Boot 的属性文件中的环境变量"}],["meta",{"property":"og:description","content":"使用 Spring Boot 的属性文件中的环境变量 1. 概述 在本教程中，我们将讨论如何在 Spring Boot 的 application.properties 和 application.yml 文件中使用环境变量。然后，我们将学习如何在代码中引用这些属性。 2. 在 application.properties 文件中使用环境变量 让我们定..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T18:06:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Environment Variables"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T18:06:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用 Spring Boot 的属性文件中的环境变量\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T18:06:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用 Spring Boot 的属性文件中的环境变量 1. 概述 在本教程中，我们将讨论如何在 Spring Boot 的 application.properties 和 application.yml 文件中使用环境变量。然后，我们将学习如何在代码中引用这些属性。 2. 在 application.properties 文件中使用环境变量 让我们定..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 在 application.properties 文件中使用环境变量","slug":"_2-在-application-properties-文件中使用环境变量","link":"#_2-在-application-properties-文件中使用环境变量","children":[]},{"level":2,"title":"3. 在代码中使用我们的环境特定属性","slug":"_3-在代码中使用我们的环境特定属性","link":"#_3-在代码中使用我们的环境特定属性","children":[{"level":3,"title":"3.1. 使用 @Value 注入值","slug":"_3-1-使用-value-注入值","link":"#_3-1-使用-value-注入值","children":[]},{"level":3,"title":"3.2. 从 Spring Environment 获取它","slug":"_3-2-从-spring-environment-获取它","link":"#_3-2-从-spring-environment-获取它","children":[]},{"level":3,"title":"3.3. 使用 @ConfigurationProperties 分组属性","slug":"_3-3-使用-configurationproperties-分组属性","link":"#_3-3-使用-configurationproperties-分组属性","children":[]}]},{"level":2,"title":"4. 在 application.yml 文件中使用环境变量","slug":"_4-在-application-yml-文件中使用环境变量","link":"#_4-在-application-yml-文件中使用环境变量","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721153178000,"updatedTime":1721153178000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.16,"words":948},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Using Environment Variables in Spring Boot s Properties Files.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>使用 Spring Boot 的属性文件中的环境变量</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将讨论如何在 Spring Boot 的 <em>application.properties</em> 和 <em>application.yml</em> 文件中使用环境变量。然后，我们将学习如何在代码中引用这些属性。</p>\\n<h2>2. 在 <em>application.properties</em> 文件中使用环境变量</h2>\\n<p>让我们定义一个名为 <em>JAVA_HOME</em> 的全局环境变量，其值为 “ <em>C:\\\\Program Files\\\\Java\\\\jdk-11.0.14</em>”。</p>","autoDesc":true}');export{u as comp,m as data};
