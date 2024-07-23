import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-on0L14Tx.js";const e={},p=t(`<h1 id="在spring-boot中加载多个yaml配置文件" tabindex="-1"><a class="header-anchor" href="#在spring-boot中加载多个yaml配置文件"><span>在Spring Boot中加载多个YAML配置文件</span></a></h1><p>当设计一个Spring Boot应用程序时，我们通常希望使用外部配置来定义我们的应用程序属性。这让我们可以使用相同的代码跨不同环境。在某些情况下，我们可能希望即使对于同一个环境，也将属性定义在多个YAML配置文件中。</p><p>在本教程中，<strong>我们将学习在创建Spring Boot应用程序时加载多个YAML配置文件的两种方法</strong>。</p><h3 id="_2-1-yaml设置" tabindex="-1"><a class="header-anchor" href="#_2-1-yaml设置"><span>2.1. YAML设置</span></a></h3><p>我们的第一个文件列出了学生名单。我们将把它命名为_application-students.yml_并将其放置在_./src/main/resources_目录中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>students:
  - Jane
  - Michael
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们将第二个文件命名为_application-teachers.yml_并放置在同一个_./src/main/resources_目录中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>teachers:
  - Margo
  - Javier
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-应用程序" tabindex="-1"><a class="header-anchor" href="#_2-2-应用程序"><span>2.2. 应用程序</span></a></h3><p>现在，让我们设置我们的示例应用程序。我们将在应用程序中使用_CommandLineRunner_来查看我们的属性加载：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MultipleYamlApplication</span> <span class="token keyword">implements</span> <span class="token class-name">CommandLineRunner</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">MultipleYamlConfiguration</span> config<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span> springApp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SpringApplication</span><span class="token punctuation">(</span><span class="token class-name">MultipleYamlApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        springApp<span class="token punctuation">.</span><span class="token function">setAdditionalProfiles</span><span class="token punctuation">(</span><span class="token string">&quot;students&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;teachers&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        springApp<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Students: &quot;</span> <span class="token operator">+</span> config<span class="token punctuation">.</span><span class="token function">getStudents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Teachers: &quot;</span> <span class="token operator">+</span> config<span class="token punctuation">.</span><span class="token function">getTeachers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<strong>我们使用_setAdditionalProfiles()_方法以编程方式设置了我们的附加Spring配置文件</strong>。</p><p><strong>我们还可以使用通用_application.yml_文件中的_spring.profiles.include_参数</strong>：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">profiles</span><span class="token punctuation">:</span>
    <span class="token key atrule">include</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> teachers
      <span class="token punctuation">-</span> students
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>任一方法都可以设置配置文件，并且在应用程序启动期间，Spring会加载任何遵循_application-{profile}.yml_模式的YAML配置文件。</p><h3 id="_2-3-配置" tabindex="-1"><a class="header-anchor" href="#_2-3-配置"><span>2.3. 配置</span></a></h3><p>为了完成我们的示例，让我们创建我们的配置类。这个类从YAML文件中加载属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@ConfigurationProperties</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MultipleYamlConfiguration</span> <span class="token punctuation">{</span>

    <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` teachers<span class="token punctuation">;</span>
    <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` students<span class="token punctuation">;</span>

    <span class="token comment">// 标准setter和getter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们在运行应用程序后检查日志：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>c.b.p.m.MultipleYamlApplication : The following 2 profiles are active: &quot;teachers&quot;, &quot;students&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是输出结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Students: [Jane, Michael]
Teachers: [Margo, Javier]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然这种方法有效，但<strong>一个缺点是它以一种可能不是实现所预期的方式使用了Spring配置文件功能</strong>。</p><p>鉴于此，让我们看看包括多个YAML文件的第二种更健壮的方法。</p><h3 id="_3-使用-propertysources" tabindex="-1"><a class="header-anchor" href="#_3-使用-propertysources"><span>3. 使用@PropertySources</span></a></h3><p>我们可以通过结合使用_@PropertySources_注解和使用_@PropertySource_来加载YAML来指定多个YAML配置文件。</p><h3 id="_3-1-应用程序" tabindex="-1"><a class="header-anchor" href="#_3-1-应用程序"><span>3.1. 应用程序</span></a></h3><p>让我们再次尝试使用类似的应用程序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MultipleYamlApplication</span> <span class="token keyword">implements</span> <span class="token class-name">CommandLineRunner</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">MultipleYamlConfiguration</span> config<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">MultipleYamlApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Students: &quot;</span> <span class="token operator">+</span> config<span class="token punctuation">.</span><span class="token function">getStudents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Teachers: &quot;</span> <span class="token operator">+</span> config<span class="token punctuation">.</span><span class="token function">getTeachers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意到，在本例中，<strong>我们没有设置Spring配置文件</strong>。</p><h3 id="_3-2-配置和propertysourcefactory" tabindex="-1"><a class="header-anchor" href="#_3-2-配置和propertysourcefactory"><span>3.2. 配置和PropertySourceFactory</span></a></h3><p>现在，让我们实现我们的配置类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@ConfigurationProperties</span>
<span class="token annotation punctuation">@PropertySources</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token annotation punctuation">@PropertySource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;classpath:application-teachers.yml&quot;</span><span class="token punctuation">,</span> factory <span class="token operator">=</span> <span class="token class-name">MultipleYamlPropertySourceFactory</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token annotation punctuation">@PropertySource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;classpath:application-students.yml&quot;</span><span class="token punctuation">,</span> factory <span class="token operator">=</span> <span class="token class-name">MultipleYamlPropertySourceFactory</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MultipleYamlConfiguration</span> <span class="token punctuation">{</span>

    <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` teachers<span class="token punctuation">;</span>
    <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` students<span class="token punctuation">;</span>

    <span class="token comment">// 标准setter和getter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>@PropertySources_注解包括了我们想要在应用程序中使用的每个YAML文件的_@PropertySource_。<em>factory_是一个自定义的_PropertySourceFactory</em>，它启用了YAML文件的加载</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MultipleYamlPropertySourceFactory</span> <span class="token keyword">implements</span> <span class="token class-name">PropertySourceFactory</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">PropertySource</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">createPropertySource</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">EncodedResource</span> encodedResource<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">YamlPropertiesFactoryBean</span> factory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">YamlPropertiesFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        factory<span class="token punctuation">.</span><span class="token function">setResources</span><span class="token punctuation">(</span>encodedResource<span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Properties</span> properties <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">PropertiesPropertySource</span><span class="token punctuation">(</span>encodedResource<span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getFilename</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> properties<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行我们的_MultipleYamlApplication_，我们看到了我们预期的输出结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Students: [Jane, Michael]
Teachers: [Margo, Javier]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在本文中，我们探讨了在Spring Boot应用程序中加载多个YAML配置文件的两种可能方法。</p><p>如常，我们示例的完整源代码可在GitHub上获得。</p>`,40),o=[p];function c(i,l){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-07-Loading Multiple YAML Configuration Files in Spring Boot.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Loading%20Multiple%20YAML%20Configuration%20Files%20in%20Spring%20Boot.html","title":"在Spring Boot中加载多个YAML配置文件","lang":"zh-CN","frontmatter":{"date":"2024-07-07T00:00:00.000Z","category":["Spring Boot","YAML"],"tag":["Spring Boot","YAML","Configuration"],"head":[["meta",{"name":"keywords","content":"Spring Boot, YAML, Configuration, Multiple YAML Files"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Loading%20Multiple%20YAML%20Configuration%20Files%20in%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Spring Boot中加载多个YAML配置文件"}],["meta",{"property":"og:description","content":"在Spring Boot中加载多个YAML配置文件 当设计一个Spring Boot应用程序时，我们通常希望使用外部配置来定义我们的应用程序属性。这让我们可以使用相同的代码跨不同环境。在某些情况下，我们可能希望即使对于同一个环境，也将属性定义在多个YAML配置文件中。 在本教程中，我们将学习在创建Spring Boot应用程序时加载多个YAML配置文件..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T08:37:55.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"YAML"}],["meta",{"property":"article:tag","content":"Configuration"}],["meta",{"property":"article:published_time","content":"2024-07-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T08:37:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Spring Boot中加载多个YAML配置文件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-07T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T08:37:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Spring Boot中加载多个YAML配置文件 当设计一个Spring Boot应用程序时，我们通常希望使用外部配置来定义我们的应用程序属性。这让我们可以使用相同的代码跨不同环境。在某些情况下，我们可能希望即使对于同一个环境，也将属性定义在多个YAML配置文件中。 在本教程中，我们将学习在创建Spring Boot应用程序时加载多个YAML配置文件..."},"headers":[{"level":3,"title":"2.1. YAML设置","slug":"_2-1-yaml设置","link":"#_2-1-yaml设置","children":[]},{"level":3,"title":"2.2. 应用程序","slug":"_2-2-应用程序","link":"#_2-2-应用程序","children":[]},{"level":3,"title":"2.3. 配置","slug":"_2-3-配置","link":"#_2-3-配置","children":[]},{"level":3,"title":"3. 使用@PropertySources","slug":"_3-使用-propertysources","link":"#_3-使用-propertysources","children":[]},{"level":3,"title":"3.1. 应用程序","slug":"_3-1-应用程序","link":"#_3-1-应用程序","children":[]},{"level":3,"title":"3.2. 配置和PropertySourceFactory","slug":"_3-2-配置和propertysourcefactory","link":"#_3-2-配置和propertysourcefactory","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720341475000,"updatedTime":1720341475000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.95,"words":884},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Loading Multiple YAML Configuration Files in Spring Boot.md","localizedDate":"2024年7月7日","excerpt":"\\n<p>当设计一个Spring Boot应用程序时，我们通常希望使用外部配置来定义我们的应用程序属性。这让我们可以使用相同的代码跨不同环境。在某些情况下，我们可能希望即使对于同一个环境，也将属性定义在多个YAML配置文件中。</p>\\n<p>在本教程中，<strong>我们将学习在创建Spring Boot应用程序时加载多个YAML配置文件的两种方法</strong>。</p>\\n<h3>2.1. YAML设置</h3>\\n<p>我们的第一个文件列出了学生名单。我们将把它命名为_application-students.yml_并将其放置在_./src/main/resources_目录中：</p>","autoDesc":true}');export{d as comp,k as data};
