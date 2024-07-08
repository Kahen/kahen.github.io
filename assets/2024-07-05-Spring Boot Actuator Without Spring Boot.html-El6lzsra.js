import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as s}from"./app-C_fPDS1x.js";const e={},o=s(`<h1 id="spring-boot-actuator-在没有-spring-boot-的情况下" tabindex="-1"><a class="header-anchor" href="#spring-boot-actuator-在没有-spring-boot-的情况下"><span>Spring Boot Actuator 在没有 Spring Boot 的情况下</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Spring Boot 项目提供了创建独立基于 Spring 的应用程序以及支持云原生开发的功能。因此，它是 Spring 框架的一个非常有用的扩展。</p><p>有时，我们不想使用 Spring Boot，比如当我们将 Spring 框架集成到 Jakarta EE 应用程序中时，但我们仍然想从所谓的“可观测性”的生产就绪功能中受益，比如度量和健康检查。（我们可以在文章“Spring Boot 3 中的可观测性”中找到详细信息。）</p><p>由 Spring Boot Actuator 提供的可观测性特性是 Spring Boot 的一个子项目。在本文中，我们将找出如何将 Actuator 集成到不使用 Spring Boot 的应用程序中。</p><h2 id="_2-项目配置" tabindex="-1"><a class="header-anchor" href="#_2-项目配置"><span>2. 项目配置</span></a></h2><p>当排除 Spring Boot 时，我们需要自己处理应用程序打包和服务器运行时的配置，并且我们需要自己外部化配置。Spring Boot 提供的这些功能对于在我们的基于 Spring 的应用程序中使用 Actuator 并不是必需的。而且，虽然我们绝对需要项目依赖项，但我们不能使用 Spring Boot 的启动器依赖项（在这种情况下是 <em>spring-boot-starter-actuator</em>）。除此之外，我们还需要向应用程序上下文中添加必要的 bean。</p><p>我们可以手动完成这些操作，也可以使用自动配置。由于 Actuator 的配置相当复杂，并且没有详细记录，<strong>我们应该更倾向于自动配置。这是我们需要从 Spring Boot 中获取的一部分，所以我们不能完全排除 Spring Boot。</strong></p><h3 id="_2-1-添加项目依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-添加项目依赖项"><span>2.1. 添加项目依赖项</span></a></h3><p>为了集成 Actuator，<strong>我们需要 <em>spring-boot-actuator-autoconfigure</em> 依赖项：</strong></p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.springframework.boot\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`spring-boot-actuator-autoconfigure\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`3.0.6\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这也会将 <em>spring-boot-actuator</em>、 <em>spring-boot</em> 和 <em>spring-boot-autoconfigure</em> 作为传递依赖项包含进来。</p><h3 id="_2-2-启用自动配置" tabindex="-1"><a class="header-anchor" href="#_2-2-启用自动配置"><span>2.2. 启用自动配置</span></a></h3><p>然后，我们启用自动配置。这可以通过在应用程序的配置中添加 <em>@EnableAutoConfiguration</em> 来轻松完成：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@EnableAutoConfiguration</span>
<span class="token comment">// ... @ComponentScan, @Import 或任何其他应用程序配置</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppConfig</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们应该意识到这可能会影响整个应用程序，因为如果类路径中存在其他自动配置类，这也将自动配置框架的其他部分。</strong></p><h3 id="_2-3-启用端点" tabindex="-1"><a class="header-anchor" href="#_2-3-启用端点"><span>2.3. 启用端点</span></a></h3><p>默认情况下，只有健康端点被启用。Actuator 的自动配置类使用配置属性。例如，<em>WebEndpointAutoConfiguration</em> 使用映射到具有 <em>“management.endpoints.web”</em> 前缀的属性的 <em>WebEndpointProperties</em>。要启用所有端点，我们需要：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">management.endpoints.web.exposure.include</span><span class="token punctuation">=</span><span class="token value attr-value">*</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>属性必须对上下文可用 - 例如，通过将它们放置在 <em>application.properties</em> 文件中，并使用 <em>@PropertySource</em> 注解我们的配置类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@EnableAutoConfiguration</span>
<span class="token annotation punctuation">@PropertySource</span><span class="token punctuation">(</span><span class="token string">&quot;classpath:application.properties&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// ... @ComponentScan, @Import 或任何其他应用程序配置</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppConfig</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-测试项目配置" tabindex="-1"><a class="header-anchor" href="#_2-4-测试项目配置"><span>2.4. 测试项目配置</span></a></h3><p>现在，我们准备好调用 actuator 端点了。我们可以通过这个属性启用健康详情：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">management.endpoint.health.show-details</span><span class="token punctuation">=</span><span class="token value attr-value">always</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以实现一个自定义的健康端点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ActuatorConfiguration</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">HealthIndicator</span> <span class="token function">sampleHealthIndicator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Health</span><span class="token punctuation">.</span><span class="token function">up</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">withDetail</span><span class="token punctuation">(</span><span class="token string">&quot;info&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Sample Health&quot;</span><span class="token punctuation">)</span>
          <span class="token operator">::</span><span class="token function">build</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后对 <em>“{url_to_project}/actuator/health”</em> 的调用将带来如下输出：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/05/actuator_health.gif" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在本教程中，我们看到了如何在非 Boot 应用程序中集成 Spring Boot Actuator。像往常一样，所有代码实现都可以在 GitHub 上找到。</p><p>OK</p>`,31),p=[o];function i(r,c){return t(),a("div",null,p)}const d=n(e,[["render",i],["__file","2024-07-05-Spring Boot Actuator Without Spring Boot.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Spring%20Boot%20Actuator%20Without%20Spring%20Boot.html","title":"Spring Boot Actuator 在没有 Spring Boot 的情况下","lang":"zh-CN","frontmatter":{"date":"2023-05-01T00:00:00.000Z","category":["Spring Boot","Actuator"],"tag":["Spring Boot Actuator","Spring Framework"],"head":[["meta",{"name":"keywords","content":"Spring Boot Actuator, Spring Framework, Observability, Health Checks"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Spring%20Boot%20Actuator%20Without%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Boot Actuator 在没有 Spring Boot 的情况下"}],["meta",{"property":"og:description","content":"Spring Boot Actuator 在没有 Spring Boot 的情况下 1. 概述 Spring Boot 项目提供了创建独立基于 Spring 的应用程序以及支持云原生开发的功能。因此，它是 Spring 框架的一个非常有用的扩展。 有时，我们不想使用 Spring Boot，比如当我们将 Spring 框架集成到 Jakarta EE ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/05/actuator_health.gif"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T07:56:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot Actuator"}],["meta",{"property":"article:tag","content":"Spring Framework"}],["meta",{"property":"article:published_time","content":"2023-05-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T07:56:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot Actuator 在没有 Spring Boot 的情况下\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/05/actuator_health.gif\\"],\\"datePublished\\":\\"2023-05-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T07:56:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Boot Actuator 在没有 Spring Boot 的情况下 1. 概述 Spring Boot 项目提供了创建独立基于 Spring 的应用程序以及支持云原生开发的功能。因此，它是 Spring 框架的一个非常有用的扩展。 有时，我们不想使用 Spring Boot，比如当我们将 Spring 框架集成到 Jakarta EE ..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 项目配置","slug":"_2-项目配置","link":"#_2-项目配置","children":[{"level":3,"title":"2.1. 添加项目依赖项","slug":"_2-1-添加项目依赖项","link":"#_2-1-添加项目依赖项","children":[]},{"level":3,"title":"2.2. 启用自动配置","slug":"_2-2-启用自动配置","link":"#_2-2-启用自动配置","children":[]},{"level":3,"title":"2.3. 启用端点","slug":"_2-3-启用端点","link":"#_2-3-启用端点","children":[]},{"level":3,"title":"2.4. 测试项目配置","slug":"_2-4-测试项目配置","link":"#_2-4-测试项目配置","children":[]}]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1720166188000,"updatedTime":1720166188000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.97,"words":890},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Spring Boot Actuator Without Spring Boot.md","localizedDate":"2023年5月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>Spring Boot 项目提供了创建独立基于 Spring 的应用程序以及支持云原生开发的功能。因此，它是 Spring 框架的一个非常有用的扩展。</p>\\n<p>有时，我们不想使用 Spring Boot，比如当我们将 Spring 框架集成到 Jakarta EE 应用程序中时，但我们仍然想从所谓的“可观测性”的生产就绪功能中受益，比如度量和健康检查。（我们可以在文章“Spring Boot 3 中的可观测性”中找到详细信息。）</p>\\n<p>由 Spring Boot Actuator 提供的可观测性特性是 Spring Boot 的一个子项目。在本文中，我们将找出如何将 Actuator 集成到不使用 Spring Boot 的应用程序中。</p>","autoDesc":true}');export{d as comp,g as data};
