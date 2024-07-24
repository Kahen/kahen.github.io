import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-B6f8H54y.js";const e={},p=t(`<h1 id="spring-boot内置的testcontainers支持" tabindex="-1"><a class="header-anchor" href="#spring-boot内置的testcontainers支持"><span>Spring Boot内置的Testcontainers支持</span></a></h1><p>在本教程中，我们将讨论Spring Boot 3.1中引入的增强型Testcontainers支持。</p><p>此更新提供了一种更为流畅的配置容器的方法，并允许我们为本地开发目的启动它们。结果，使用Testcontainers进行开发和运行测试变得无缝且高效。</p><h2 id="_2-springboot-3-1之前的testcontainers" tabindex="-1"><a class="header-anchor" href="#_2-springboot-3-1之前的testcontainers"><span>2. SpringBoot 3.1之前的Testcontainers</span></a></h2><p>我们可以使用Testcontainers在测试阶段创建一个类似生产环境的环境。通过这样做，我们将消除对模拟的需求，并编写出不依赖于实现细节的高质量自动化测试。</p><p>对于本文的代码示例，我们将使用一个简单的Web应用程序，它使用MongoDB数据库作为持久层，并有一个小型REST接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;characters&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MiddleEarthCharactersController</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">MiddleEarthCharactersRepository</span> repository<span class="token punctuation">;</span>

    <span class="token comment">// 构造函数未显示</span>

    <span class="token annotation punctuation">@GetMapping</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MiddleEarthCharacter</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">findByRace</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span> <span class="token class-name">String</span> race<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> repository<span class="token punctuation">.</span><span class="token function">findAllByRace</span><span class="token punctuation">(</span>race<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@PostMapping</span>
    <span class="token keyword">public</span> <span class="token class-name">MiddleEarthCharacter</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">MiddleEarthCharacter</span> character<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> repository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>character<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在集成测试期间，我们将启动一个包含数据库服务器的Docker容器。由于容器暴露的数据库端口将被动态分配，我们不能在属性文件中定义数据库URL。<strong>结果，对于3.1之前的Spring Boot应用程序，我们需要使用_@DynamicPropertySource_注解以便向_DynamicPropertyRegistry_添加这些属性：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Testcontainers</span>
<span class="token annotation punctuation">@SpringBootTest</span><span class="token punctuation">(</span>webEnvironment <span class="token operator">=</span> <span class="token constant">DEFINED_PORT</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">DynamicPropertiesIntegrationTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Container</span>
    <span class="token keyword">static</span> <span class="token class-name">MongoDBContainer</span> mongoDBContainer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MongoDBContainer</span><span class="token punctuation">(</span><span class="token class-name">DockerImageName</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;mongo:4.0.10&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@DynamicPropertySource</span>
    <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">setProperties</span><span class="token punctuation">(</span><span class="token class-name">DynamicPropertyRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        registry<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;spring.data.mongodb.uri&quot;</span><span class="token punctuation">,</span> mongoDBContainer<span class="token operator">::</span><span class="token function">getReplicaSetUrl</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于集成测试，我们将使用_@SpringBootTest_注解启动应用程序在配置文件中定义的端口。此外，我们将使用Testcontainers来设置环境。</p><p>最后，让我们使用REST-assured来执行HTTP请求并断言响应的有效性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenRequestingHobbits_thenReturnFrodoAndSam</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    repository<span class="token punctuation">.</span><span class="token function">saveAll</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>
        <span class="token keyword">new</span> <span class="token class-name">MiddleEarthCharacter</span><span class="token punctuation">(</span><span class="token string">&quot;Frodo&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;hobbit&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token class-name">MiddleEarthCharacter</span><span class="token punctuation">(</span><span class="token string">&quot;Samwise&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;hobbit&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token class-name">MiddleEarthCharacter</span><span class="token punctuation">(</span><span class="token string">&quot;Aragon&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;human&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token class-name">MiddleEarthCharacter</span><span class="token punctuation">(</span><span class="token string">&quot;Gandalf&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;wizzard&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">when</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/characters?race=hobbit&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">statusCode</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token function">hasItems</span><span class="token punctuation">(</span><span class="token string">&quot;Frodo&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Samwise&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用-serviceconnection-进行动态属性" tabindex="-1"><a class="header-anchor" href="#_3-使用-serviceconnection-进行动态属性"><span>3. 使用_@ServiceConnection_进行动态属性</span></a></h2><p><strong>从SpringBoot 3.1开始，我们可以利用_@ServiceConnection_注解来消除定义动态属性的样板代码。</strong></p><p>首先，我们需要在_pom.xml_中包含_spring-boot-testcontainers_依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
  \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.springframework.boot\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
  \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`spring-boot-testcontainers\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
  \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>\`\`test\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，我们可以移除注册所有动态属性的静态方法。相反，我们将简单地使用_@ServiceConnection_注解标记容器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Testcontainers</span>
<span class="token annotation punctuation">@SpringBootTest</span><span class="token punctuation">(</span>webEnvironment <span class="token operator">=</span> <span class="token constant">DEFINED_PORT</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">ServiceConnectionIntegrationTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Container</span>
    <span class="token annotation punctuation">@ServiceConnection</span>
    <span class="token keyword">static</span> <span class="token class-name">MongoDBContainer</span> mongoDBContainer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MongoDBContainer</span><span class="token punctuation">(</span><span class="token class-name">DockerImageName</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;mongo:4.0.10&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>@ServiceConncetion_允许SpringBoot的自动配置动态注册所有需要的属性。在幕后，</em>@ServiceConncetion_根据容器类或Docker镜像名称确定需要哪些属性。</p><p>所有支持此注解的容器和镜像列表可以在Spring Boot的官方文档中找到。</p><h2 id="_4-testcontainers对本地开发的支持" tabindex="-1"><a class="header-anchor" href="#_4-testcontainers对本地开发的支持"><span>4. Testcontainers对本地开发的支持</span></a></h2><p><strong>另一个令人兴奋的功能是Testcontainers与本地开发的无缝集成，配置极少。</strong> 此功能使我们能够在测试期间以及本地开发中复制生产环境。</p><p>为了启用它，我们首先需要创建一个_@TestConfiguration_并声明所有Testcontainers作为Spring Beans。让我们还添加_@ServiceConnection_注解，这将无缝地将应用程序绑定到数据库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@TestConfiguration</span><span class="token punctuation">(</span>proxyBeanMethods <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">LocalDevTestcontainersConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@ServiceConnection</span>
    <span class="token keyword">public</span> <span class="token class-name">MongoDBContainer</span> <span class="token function">mongoDBContainer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MongoDBContainer</span><span class="token punctuation">(</span><span class="token class-name">DockerImageName</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;mongo:4.0.10&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于所有的_Testcontainers_依赖项都是以_test_作用域导入的，我们需要从_test_包启动应用程序。因此，让我们在这个包中创建一个_main()_方法，调用_java_包中的实际_main()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LocalDevApplication</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token class-name">Application</span><span class="token operator">::</span><span class="token function">main</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">LocalDevTestcontainersConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就是这样。现在我们可以从_test_包中的_main()_方法启动应用程序，它将使用MongoDB数据库。</p><p>让我们从Postman发送一个POST请求，然后直接连接到数据库并检查数据是否正确持久化：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/postman_post_data-300x94.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>为了连接到数据库，我们需要找到容器暴露的端口。我们可以从应用程序日志中获取它，或者简单地运行_docker ps_命令：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/visual-diff-on-changed-files-300x60.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>最后，我们可以使用MongoDB客户端使用URL <em>mongodb://localhost:63437/test</em> 连接到数据库，并查询_characters_集合：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/mongodb_find_all-300x153.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>就是这样，我们能够连接并查询由Testcontainer为本地开发启动的数据库。</p><p>如果我们在本地开发期间经常重启应用程序，一个潜在的缺点是每次都会重启所有容器。结果，启动可能会变慢，测试数据将丢失。</p><p><strong>然而，我们可以通过利用Testcontainers与_spring-boot-devtools_的集成来在应用程序重新加载时保持容器活跃。</strong> 这是一个实验性的Testcontainers功能，它通过节省宝贵的时间和测试数据，使我们的开发体验更加顺畅和高效。</p><p>让我们首先添加_spring-boot-devtools_依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.springframework.boot\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`spring-boot-devtools\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>\`\`runtime\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>\`\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">&gt;</span></span>\`true\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">&gt;</span></span>\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以回到本地开发的测试配置，并使用_@RestartScope_注解标记Testcontainers beans：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token annotation punctuation">@RestartScope</span>
<span class="token annotation punctuation">@ServiceConnection</span>
<span class="token keyword">public</span> <span class="token class-name">MongoDBContainer</span> <span class="token function">mongoDBContainer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MongoDBContainer</span><span class="token punctuation">(</span><span class="token class-name">DockerImageName</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;mongo:4.0.10&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果，我们现在可以从_test_包中的_main()_方法启动应用程序，并利用_spring-boot-devtools_的实时重载功能。例如，我们可以从Postman保存一个条目，然后重新编译和重载应用程序：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/postmna-save-again-1-300x95.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>让我们引入一个小变化，比如将请求映射从_“characters”<em>切换到</em>“api/characters”_并重新编译：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/devtools_ive_reload-300x187.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们已经可以从应用程序日志或Docker本身看到数据库容器没有重启。然而，让我们更进一步，检查应用程序在重启后是否重新连接到了同一个数据库。例如，我们可以通过在新路径发送GET请求并期望之前插入的数据存在来做到这一点：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/app_reconnected_to_db-1-300x178.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>同样，我们可以使用Testcontainer的API中的_withReuse(true)_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token annotation punctuation">@ServiceConnection</span>
<span class="token keyword">public</span> <span class="token class-name">MongoDBContainer</span> <span class="token function">mongoDBContainer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MongoDBContainer</span><span class="token punctuation">(</span><span class="token class-name">DockerImageName</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;mongo:4.0.10&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withReuse</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这是一种更强大的替代方案，它使容器能够比应用程序活得更长。换句话说，通过启用重用，我们可以重新加载甚至完全重启应用程序，同时确保容器保持活跃。</strong></p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们讨论了SpringBoot 3.1的新Testcontainers特性。我们学习了如何使用新的_@ServiceConnection_注解，它提供了一种简化的替代方案，用于使用_@DynamicPropertySource_和样板配置。</p><p>接着，我们深入研究了如何通过在_test_包中创建额外的_main()_方法并将它们声明为Spring</p>`,52),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-01-Built in Testcontainers Support in Spring Boot.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Built%20in%20Testcontainers%20Support%20in%20Spring%20Boot.html","title":"Spring Boot内置的Testcontainers支持","lang":"zh-CN","frontmatter":{"date":"2023-08-01T00:00:00.000Z","category":["Spring Boot","Testcontainers"],"tag":["Spring Boot 3.1","集成测试"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Testcontainers, 集成测试, 服务连接, 本地开发"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Built%20in%20Testcontainers%20Support%20in%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Boot内置的Testcontainers支持"}],["meta",{"property":"og:description","content":"Spring Boot内置的Testcontainers支持 在本教程中，我们将讨论Spring Boot 3.1中引入的增强型Testcontainers支持。 此更新提供了一种更为流畅的配置容器的方法，并允许我们为本地开发目的启动它们。结果，使用Testcontainers进行开发和运行测试变得无缝且高效。 2. SpringBoot 3.1之前的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/08/postman_post_data-300x94.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T10:39:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot 3.1"}],["meta",{"property":"article:tag","content":"集成测试"}],["meta",{"property":"article:published_time","content":"2023-08-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T10:39:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot内置的Testcontainers支持\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/08/postman_post_data-300x94.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/visual-diff-on-changed-files-300x60.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/mongodb_find_all-300x153.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/postmna-save-again-1-300x95.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/devtools_ive_reload-300x187.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/app_reconnected_to_db-1-300x178.png\\"],\\"datePublished\\":\\"2023-08-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T10:39:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Boot内置的Testcontainers支持 在本教程中，我们将讨论Spring Boot 3.1中引入的增强型Testcontainers支持。 此更新提供了一种更为流畅的配置容器的方法，并允许我们为本地开发目的启动它们。结果，使用Testcontainers进行开发和运行测试变得无缝且高效。 2. SpringBoot 3.1之前的..."},"headers":[{"level":2,"title":"2. SpringBoot 3.1之前的Testcontainers","slug":"_2-springboot-3-1之前的testcontainers","link":"#_2-springboot-3-1之前的testcontainers","children":[]},{"level":2,"title":"3. 使用_@ServiceConnection_进行动态属性","slug":"_3-使用-serviceconnection-进行动态属性","link":"#_3-使用-serviceconnection-进行动态属性","children":[]},{"level":2,"title":"4. Testcontainers对本地开发的支持","slug":"_4-testcontainers对本地开发的支持","link":"#_4-testcontainers对本地开发的支持","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719830368000,"updatedTime":1719830368000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.64,"words":1692},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Built in Testcontainers Support in Spring Boot.md","localizedDate":"2023年8月1日","excerpt":"\\n<p>在本教程中，我们将讨论Spring Boot 3.1中引入的增强型Testcontainers支持。</p>\\n<p>此更新提供了一种更为流畅的配置容器的方法，并允许我们为本地开发目的启动它们。结果，使用Testcontainers进行开发和运行测试变得无缝且高效。</p>\\n<h2>2. SpringBoot 3.1之前的Testcontainers</h2>\\n<p>我们可以使用Testcontainers在测试阶段创建一个类似生产环境的环境。通过这样做，我们将消除对模拟的需求，并编写出不依赖于实现细节的高质量自动化测试。</p>\\n<p>对于本文的代码示例，我们将使用一个简单的Web应用程序，它使用MongoDB数据库作为持久层，并有一个小型REST接口：</p>","autoDesc":true}');export{d as comp,k as data};
