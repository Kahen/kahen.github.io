import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-C6rqSDgP.js";const e={},p=t(`<hr><h1 id="spring-data-rest-序列化实体id" tabindex="-1"><a class="header-anchor" href="#spring-data-rest-序列化实体id"><span>Spring Data Rest - 序列化实体ID</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>众所周知，当我们想要快速开始使用RESTful Web服务时，Spring Data Rest模块可以使我们的生活更轻松。然而，这个模块具有默认的行为，有时可能会让人感到困惑。</p><p>在本教程中，我们将<strong>学习为什么Spring Data Rest默认不序列化实体ID。同时，我们将讨论改变这种行为的各种解决方案</strong>。</p><h2 id="_2-默认行为" tabindex="-1"><a class="header-anchor" href="#_2-默认行为"><span>2. 默认行为</span></a></h2><p>在我们详细讨论之前，让我们通过一个快速的例子来理解什么是序列化实体ID。</p><p>这里有一个示例实体，<em>Person</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们有一个仓库，<em>PersonRepository</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PersonRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们使用Spring Boot，只需添加_spring-boot-starter-data-rest_依赖项即可启用Spring Data Rest模块：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.springframework.boot\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`spring-boot-starter-data-rest\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这两个类和Spring Boot的自动配置，我们的REST控制器就可以自动使用了。</p><p>下一步，让我们请求资源，<em>http://localhost:8080/persons</em>，并检查框架生成的默认JSON响应：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;_embedded&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;persons&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;_links&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;self&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">&quot;href&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;http://localhost:8080/persons/1&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token property">&quot;person&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">&quot;href&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;http://localhost:8080/persons/1{?projection}&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;templated&quot;</span> <span class="token operator">:</span> <span class="token boolean">true</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> ...<span class="token punctuation">]</span>
    ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们省略了一些部分以简洁。正如我们所注意到的，实体_Person_的__name__字段被序列化了。不知何故，__id__字段被剥离了。</p><p>因此，这是Spring Data Rest的设计决策。<strong>在大多数情况下，暴露我们的内部ID并不理想，因为它们对外部系统没有意义</strong>。</p><p>在理想的情况下，<strong>身份是RESTful架构中该资源的URL</strong>。</p><p>我们还应该看到，这仅在使用Spring Data Rest的端点时才会出现。除非我们使用Spring HATEOAS的_RepresentationModel_及其子类——如_CollectionModel_和_EntityModel_——来构建我们的响应，否则我们的自定义_@Controller_或_@RestController_端点不受影响。</p><p>幸运的是，暴露实体ID是可配置的。因此，我们仍然具有启用它的灵活性。</p><p>在接下来的部分中，我们将看到在Spring Data Rest中暴露实体ID的不同方法。</p><h2 id="_3-使用-repositoryrestconfigurer" tabindex="-1"><a class="header-anchor" href="#_3-使用-repositoryrestconfigurer"><span>3. 使用 <em>RepositoryRestConfigurer</em></span></a></h2><p><strong>暴露实体ID最常见的解决方案是配置_RepositoryRestConfigurer_</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RestConfiguration</span> <span class="token keyword">implements</span> <span class="token class-name">RepositoryRestConfigurer</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configureRepositoryRestConfiguration</span><span class="token punctuation">(</span>
        <span class="token class-name">RepositoryRestConfiguration</span> config<span class="token punctuation">,</span> <span class="token class-name">CorsRegistry</span> cors<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        config<span class="token punctuation">.</span><span class="token function">exposeIdsFor</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在Spring Data Rest版本3.1之前——或Spring Boot版本2.1之前——我们会使用_RepositoryRestConfigurerAdapter_</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RestConfiguration</span> <span class="token keyword">extends</span> <span class="token class-name">RepositoryRestConfigurerAdapter</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configureRepositoryRestConfiguration</span><span class="token punctuation">(</span><span class="token class-name">RepositoryRestConfiguration</span> config<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        config<span class="token punctuation">.</span><span class="token function">exposeIdsFor</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管它们相似，但我们应该注意版本。顺便说一句，自Spring Data Rest版本3.1起，_RepositoryRestConfigurerAdapter_已被弃用，并在最新的4.0.x分支中被移除。</p><p>在我们为实体_Person_配置之后，响应也会包含__id__字段：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;_embedded&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;persons&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;_links&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;self&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">&quot;href&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;http://localhost:8080/persons/1&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token property">&quot;person&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">&quot;href&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;http://localhost:8080/persons/1{?projection}&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;templated&quot;</span> <span class="token operator">:</span> <span class="token boolean">true</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> ...<span class="token punctuation">]</span>
    ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>显然，当我们想要为所有实体启用ID暴露时，如果我们有许多实体，这种解决方案并不实用。</p><p>因此，让我们通过一种通用方法改进我们的_RestConfiguration_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RestConfiguration</span> <span class="token keyword">implements</span> <span class="token class-name">RepositoryRestConfigurer</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">EntityManager</span> entityManager<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configureRepositoryRestConfiguration</span><span class="token punctuation">(</span>
        <span class="token class-name">RepositoryRestConfiguration</span> config<span class="token punctuation">,</span> <span class="token class-name">CorsRegistry</span> cors<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Class</span><span class="token punctuation">[</span><span class="token punctuation">]</span> classes <span class="token operator">=</span> entityManager<span class="token punctuation">.</span><span class="token function">getMetamodel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">getEntities</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Type</span><span class="token operator">::</span><span class="token function">getJavaType</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        config<span class="token punctuation">.</span><span class="token function">exposeIdsFor</span><span class="token punctuation">(</span>classes<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们使用JPA来管理持久性，我们可以以通用方式访问实体的元数据。JPA的_EntityManager_已经存储了我们需要的元数据。因此，<strong>我们可以通过_entityManager.getMetamodel()_方法实际收集实体类类型</strong>。</p><p>因此，这是一种更全面的解决方案，因为每个实体的ID暴露是自动启用的。</p><h2 id="_4-使用-projection" tabindex="-1"><a class="header-anchor" href="#_4-使用-projection"><span>4. 使用 <em>@Projection</em></span></a></h2><p>另一种解决方案是使用_@Projection_注解。通过定义一个_PersonView_接口，我们也可以暴露__id__字段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Projection</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;person-view&quot;</span><span class="token punctuation">,</span> types <span class="token operator">=</span> <span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PersonView</span> <span class="token punctuation">{</span>

    <span class="token class-name">Long</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，我们现在需要使用不同的请求来测试，<em>http://localhost:8080/persons?projection=person-view</em>：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;_embedded&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;persons&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;_links&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;self&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">&quot;href&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;http://localhost:8080/persons/1&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token property">&quot;person&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">&quot;href&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;http://localhost:8080/persons/1{?projection}&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;templated&quot;</span> <span class="token operator">:</span> <span class="token boolean">true</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> ...<span class="token punctuation">]</span>
    ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>要为由仓库生成的所有端点启用投影，我们可以使用_@RepositoryRestResource_注解</strong>在_PersonRepository_上：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RepositoryRestResource</span><span class="token punctuation">(</span>excerptProjection <span class="token operator">=</span> <span class="token class-name">PersonView</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PersonRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种变化之后，我们可以使用我们通常的请求，<em>http://localhost:8080/persons</em>，来列出人员实体。</p><p><strong>然而，我们应该注意到_excerptProjection_不会自动应用于单个项目资源</strong>。我们仍然需要使用_http://localhost:8080/persons/1?projection=person-view_来获取单个_Person_的响应及其实体ID。</p><p>此外，我们应该记住我们投影中定义的字段并不总是按顺序排列的：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    ...
    <span class="token property">&quot;persons&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        ...
    <span class="token punctuation">}</span><span class="token punctuation">,</span> ...<span class="token punctuation">]</span>
    ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了<strong>保持字段顺序，我们可以在我们的_PersonView_类上放置_@JsonPropertyOrder_注解</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@JsonPropertyOrder</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Projection</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;person-view&quot;</span><span class="token punctuation">,</span> types <span class="token operator">=</span> <span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PersonView</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用dto覆盖rest仓库" tabindex="-1"><a class="header-anchor" href="#_5-使用dto覆盖rest仓库"><span>5. 使用DTO覆盖Rest仓库</span></a></h2><p>覆盖rest控制器处理程序是另一种解决方案。Spring Data Rest允许我们插入自定义处理程序。因此，<strong>我们仍然可以使用底层仓库来获取数据，但在响应到达客户端之前覆盖响应</strong>。在这种情况下，我们将编写更多的代码，但我们将拥有完全自定义的能力。</p><h3 id="_5-1-实现" tabindex="-1"><a class="header-anchor" href="#_5-1-实现"><span>5.1. 实现</span></a></h3><p>首先，我们定义一个DTO对象来表示我们的_Person_实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PersonDto</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">PersonDto</span><span class="token punctuation">(</span><span class="token class-name">Person</span> person<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> person<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> person<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们在这里添加了一个__id__字段，它对应于_Person_的实体ID。</p><p>接下来，我们将使用一些内置辅助类来重用Spring Data Rest的响应构建机制，同时尽可能保持响应结构相同。</p><p>因此，让我们定义我们的_PersonController_来覆盖内置端点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RepositoryRestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PersonController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">PersonRepository</span> repository<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/persons&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">ResponseEntity</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">persons</span><span class="token punctuation">(</span><span class="token class-name">PagedResourcesAssembler</span> resourcesAssembler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Page</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span>\` persons <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>repository<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token class-name">Pageable</span><span class="token punctuation">.</span><span class="token function">ofSize</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Page</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">PersonDto</span><span class="token punctuation">&gt;</span></span>\` personDtos <span class="token operator">=</span> persons<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">PersonDto</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">PagedModel</span><span class="token operator">&lt;</span><span class="token class-name">EntityModel</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">PersonDto</span><span class="token punctuation">&gt;</span></span>\`<span class="token operator">&gt;</span> pagedModel <span class="token operator">=</span> resourcesAssembler<span class="token punctuation">.</span><span class="token function">toModel</span><span class="token punctuation">(</span>personDtos<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>pagedModel<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意到一些要点，以确保Spring将我们的控制器类识别为插件，而不是独立的控制器：</p><ol><li>必须使用_@RepositoryRestController_而不是_@RestController_或_@Controller_</li><li>_PersonController_类必须放置在Spring的组件扫描可以拾取的包中</li></ol>`,59),o=[p];function i(c,l){return a(),s("div",null,o)}const d=n(e,[["render",i],["__file","2024-07-17-Spring Data Rest   Serializing the Entity ID.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Spring%20Data%20Rest%20%20%20Serializing%20the%20Entity%20ID.html","title":"Spring Data Rest - 序列化实体ID","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Data Rest","RESTful Web Services"],"tag":["Spring Data Rest","Entity IDs","Serialization"],"head":[["meta",{"name":"keywords","content":"Spring Data Rest, RESTful Web Services, Entity IDs, Serialization"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Spring%20Data%20Rest%20%20%20Serializing%20the%20Entity%20ID.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Data Rest - 序列化实体ID"}],["meta",{"property":"og:description","content":"Spring Data Rest - 序列化实体ID 1. 概述 众所周知，当我们想要快速开始使用RESTful Web服务时，Spring Data Rest模块可以使我们的生活更轻松。然而，这个模块具有默认的行为，有时可能会让人感到困惑。 在本教程中，我们将学习为什么Spring Data Rest默认不序列化实体ID。同时，我们将讨论改变这种行为..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T03:12:07.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Data Rest"}],["meta",{"property":"article:tag","content":"Entity IDs"}],["meta",{"property":"article:tag","content":"Serialization"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T03:12:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Data Rest - 序列化实体ID\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T03:12:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Data Rest - 序列化实体ID 1. 概述 众所周知，当我们想要快速开始使用RESTful Web服务时，Spring Data Rest模块可以使我们的生活更轻松。然而，这个模块具有默认的行为，有时可能会让人感到困惑。 在本教程中，我们将学习为什么Spring Data Rest默认不序列化实体ID。同时，我们将讨论改变这种行为..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 默认行为","slug":"_2-默认行为","link":"#_2-默认行为","children":[]},{"level":2,"title":"3. 使用 RepositoryRestConfigurer","slug":"_3-使用-repositoryrestconfigurer","link":"#_3-使用-repositoryrestconfigurer","children":[]},{"level":2,"title":"4. 使用 @Projection","slug":"_4-使用-projection","link":"#_4-使用-projection","children":[]},{"level":2,"title":"5. 使用DTO覆盖Rest仓库","slug":"_5-使用dto覆盖rest仓库","link":"#_5-使用dto覆盖rest仓库","children":[{"level":3,"title":"5.1. 实现","slug":"_5-1-实现","link":"#_5-1-实现","children":[]}]}],"git":{"createdTime":1721185927000,"updatedTime":1721185927000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.24,"words":1573},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Spring Data Rest   Serializing the Entity ID.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Spring Data Rest - 序列化实体ID</h1>\\n<h2>1. 概述</h2>\\n<p>众所周知，当我们想要快速开始使用RESTful Web服务时，Spring Data Rest模块可以使我们的生活更轻松。然而，这个模块具有默认的行为，有时可能会让人感到困惑。</p>\\n<p>在本教程中，我们将<strong>学习为什么Spring Data Rest默认不序列化实体ID。同时，我们将讨论改变这种行为的各种解决方案</strong>。</p>\\n<h2>2. 默认行为</h2>\\n<p>在我们详细讨论之前，让我们通过一个快速的例子来理解什么是序列化实体ID。</p>","autoDesc":true}');export{d as comp,k as data};
