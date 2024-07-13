import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as a,a as s}from"./app-DkA39C0B.js";const t={},i=s('<hr><h1 id="spring-cloud-config中覆盖远程属性值的方法" tabindex="-1"><a class="header-anchor" href="#spring-cloud-config中覆盖远程属性值的方法"><span>Spring Cloud Config中覆盖远程属性值的方法</span></a></h1><p>Spring Cloud Config是Spring Cloud项目的一部分。它通过集中式服务管理应用程序配置数据，使其与部署的微服务明显分离。Spring Cloud Config拥有自己的属性管理仓库，并且也与Git、Consul和Eureka等开源项目集成。</p><p>在本文中，我们将看到在Spring Cloud Config中覆盖远程属性值的不同方法，Spring从2.4版本开始施加的限制，以及3.0版本带来的变化。本教程将使用spring-boot版本3.2.2。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>创建一个Spring Config Server以外部化配置文件。它被定位为配置文件的分发服务器。本文中，我们将使用文件系统仓库。</p><h3 id="_2-1-创建配置文件" tabindex="-1"><a class="header-anchor" href="#_2-1-创建配置文件"><span>2.1 创建配置文件</span></a></h3><p>在application.properties文件中定义的配置与所有客户端应用程序共享。也可以为特定应用程序或给定配置文件定义特定配置。</p><p>首先，创建一个包含将提供给我们的客户端应用程序属性的配置文件。我们将我们的客户端应用程序命名为‘baeldung’。在_/resources/config_文件夹内，创建一个_baeldung.properties_文件。</p><h3 id="_2-2-添加属性" tabindex="-1"><a class="header-anchor" href="#_2-2-添加属性"><span>2.2 添加属性</span></a></h3><p>让我们向我们的_baeldung.properties_文件添加一些属性，然后我们将在客户端应用程序中使用它们：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>hello=你好 Jane Doe!\nwelcome=欢迎 Jane Doe!\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们也在_resources/config/application.properties_文件中添加一个共享属性，Spring将在所有客户端之间共享：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>shared-property=这个属性在所有客户端应用程序中共享\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-3-spring-boot-config-server应用程序" tabindex="-1"><a class="header-anchor" href="#_2-3-spring-boot-config-server应用程序"><span>2.3 Spring-Boot Config Server应用程序</span></a></h3><p>现在，让我们创建将为我们的配置提供服务的Spring应用程序。我们还需要_spring-cloud-config-server_依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````org.springframework.cloud````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````spring-cloud-config-server````&lt;/artifactId&gt;````\n````&lt;/dependency&gt;````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装完成后，让我们创建应用程序并启用配置服务器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>\n<span class="token annotation punctuation">@EnableConfigServer</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigServer</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">ConfigServer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们在应用程序的_application.properties_文件中添加以下属性，告诉它在端口8081上启动并加载前面定义的配置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>server.port=8081\nspring.cloud.config.server.native.searchLocations=classpath:/config\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们启动我们的服务器应用程序，激活native配置文件，并允许我们使用文件系统作为配置仓库：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mvn spring-boot:run -Dspring-boot.run.profiles=native\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们的服务器现在正在运行并提供我们的配置。让我们验证我们的共享属性是否可以访问：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ curl localhost:8081/unknownclient/default\n{\n  &quot;name&quot;: &quot;unknownclient&quot;,\n  &quot;profiles&quot;: [\n    &quot;default&quot;\n  ],\n  &quot;label&quot;: null,\n  &quot;version&quot;: null,\n  &quot;state&quot;: null,\n  &quot;propertySources&quot;: [\n    {\n      &quot;name&quot;: &quot;classpath:/config/application.properties&quot;,\n      &quot;source&quot;: {\n        &quot;shared-property&quot;: &quot;这个属性在所有客户端应用程序中共享&quot;\n      }\n    }\n  ]\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以及特定于我们应用程序的属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ curl localhost:8081/baeldung/default\n{\n  &quot;name&quot;: &quot;baeldung&quot;,\n  &quot;profiles&quot;: [\n    &quot;default&quot;\n  ],\n  &quot;label&quot;: null,\n  &quot;version&quot;: null,\n  &quot;state&quot;: null,\n  &quot;propertySources&quot;: [\n    {\n      &quot;name&quot;: &quot;classpath:/config/baeldung.properties&quot;,\n      &quot;source&quot;: {\n        &quot;hello&quot;: &quot;你好 Jane Doe!&quot;,\n        &quot;welcome&quot;: &quot;欢迎 Jane Doe!&quot;\n      }\n    },\n    {\n      &quot;name&quot;: &quot;classpath:/config/application.properties&quot;,\n      &quot;source&quot;: {\n        &quot;shared-property&quot;: &quot;这个属性在所有客户端应用程序中共享&quot;\n      }\n    }\n  ]\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们向服务器指示我们的应用程序名称以及使用的配置文件，<em>default</em>。</p><p>我们没有禁用_spring.cloud.config.server.accept-empty_属性，默认为true。如果应用程序是未知的(<em>unknownclient)</em>，配置服务器仍然返回共享属性。</p><h2 id="_3-客户端应用程序" tabindex="-1"><a class="header-anchor" href="#_3-客户端应用程序"><span>3. 客户端应用程序</span></a></h2><p>现在，让我们创建一个客户端应用程序，在启动时加载由我们的服务器提供的配置。</p><h3 id="_3-1-项目设置和依赖项" tabindex="-1"><a class="header-anchor" href="#_3-1-项目设置和依赖项"><span>3.1 项目设置和依赖项</span></a></h3><p>让我们在_pom.xml_中添加_spring-cloud-starter-config_依赖项来加载配置，并添加_spring-boot-starter-web_来创建控制器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````org.springframework.cloud````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````spring-cloud-starter-config````&lt;/artifactId&gt;````\n````&lt;/dependency&gt;````\n````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````org.springframework.boot````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````spring-boot-starter-web````&lt;/artifactId&gt;````\n````&lt;/dependency&gt;````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-创建客户端应用程序" tabindex="-1"><a class="header-anchor" href="#_3-2-创建客户端应用程序"><span>3.2 创建客户端应用程序</span></a></h3><p>接下来，让我们创建将从我们的spring-cloud-config服务器读取配置的客户端应用程序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">Client</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-获取配置" tabindex="-1"><a class="header-anchor" href="#_3-3-获取配置"><span>3.3 获取配置</span></a></h3><p>让我们修改我们的_application.properties_文件，告诉spring-boot从我们的服务器获取其配置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.cloud.config.name=baeldung\nspring.config.import=optional:configserver:http://localhost:8081\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还指定我们的应用程序名称为‘baeldung’，以利用专用属性。</p><h3 id="_3-4-添加一个简单的控制器" tabindex="-1"><a class="header-anchor" href="#_3-4-添加一个简单的控制器"><span>3.4 添加一个简单的控制器</span></a></h3><p>现在让我们创建一个控制器，负责显示我们配置的特定属性，以及共享属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloController</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;${hello}&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> hello<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;${welcome}&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> welcome<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;${shared-property}&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> shared<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>hello<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;welcome&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">welcome</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>welcome<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;shared&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">shared</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>shared<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以导航到这三个URL来验证我们的配置是否被考虑：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ curl http://localhost:8080/hello\n你好 Jane Doe!\n$ curl http://localhost:8080/welcome\n欢迎 Jane Doe!\n$ curl http://localhost:8080/shared\n这个属性在所有客户端应用程序中共享\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-在服务器端覆盖属性" tabindex="-1"><a class="header-anchor" href="#_4-在服务器端覆盖属性"><span>4. 在服务器端覆盖属性</span></a></h2><p>可以通过修改服务器配置来覆盖为特定应用程序定义的属性。</p><p>让我们编辑服务器的_resources/application.properties_文件以覆盖_hello_属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.cloud.config.server.overrides.hello=你好 Jane Doe - application.properties!\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们再次测试对_/hello_控制器的调用，以验证过载是否被考虑：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ curl http://localhost:8080/hello\n你好 Jane Doe - application.properties!\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以在_resources/config/application.properties_文件的共享配置级别添加此过载。<strong>在这种情况下，它将优先于上面定义的一个</strong>。</p><h2 id="_5-在客户端覆盖属性" tabindex="-1"><a class="header-anchor" href="#_5-在客户端覆盖属性"><span>5. 在客户端覆盖属性</span></a></h2><p>自Spring Boot版本2.4以来，不再可能通过客户端应用程序的_application.properties_文件覆盖属性。</p><h3 id="_5-1-使用spring配置文件" tabindex="-1"><a class="header-anchor" href="#_5-1-使用spring配置文件"><span>5.1 使用Spring配置文件</span></a></h3><p>然而，我们可以使用Spring配置文件。<strong>在配置文件中本地定义的属性具有比在服务器级别为应用程序定义的属性更高的优先级</strong>。</p><p>让我们为我们的客户端应用程序添加一个_application-development.properties_配置文件，覆盖_hello_属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>hello=你好本地属性!\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们通过激活开发配置文件启动我们的客户端：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mvn spring-boot:run -Drun.profiles=development\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们现在可以再次测试我们的控制器_/hello_以验证过载是否正确工作：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ curl http://localhost:8080/hello\n你好本地属性!\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-使用占位符" tabindex="-1"><a class="header-anchor" href="#_5-2-使用占位符"><span>5.2 使用占位符</span></a></h3><p>我们可以使用占位符来值属性。<strong>因此，服务器将提供一个默认值，客户端定义的属性可以覆盖它</strong>。</p><p>让我们从服务器的_resources/application.properties_文件中移除我们的_hello_属性的过载，并修改_config/baeldung.properties_中的一个以包含使用占位符：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>hello=${app.hello:你好 Jane Doe!}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，服务器提供了一个默认值，如果客户端声明了一个名为_app.hello_的属性，可以被覆盖。</p><p>让我们编辑客户端的_resources/application.properties_文件以添加属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>app.hello=你好，覆盖的本地属性!\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们再次测试我们的控制器hello，以验证过载是否正确被考虑：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ curl http://localhost:8080/hello\n你好，覆盖的本地属性!\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，如果_hello_属性也在配文件中定义，后者将优先。</p><h2 id="_6-旧版配置" tabindex="-1"><a class="header-anchor" href="#_6-旧版配置"><span>6. 旧版配置</span></a></h2><p>自spring-boot 2.4以来，可以使用“旧版配置”。<strong>这允许我们使用spring-boot 2.4版本之前更改的旧属性管理系统</strong>。</p><h3 id="_6-1-加载外部配置" tabindex="-1"><a class="header-anchor" href="#_6-1-加载外部配置"><span>6.1 加载外部配置</span></a></h3><p>在2.4版本抱歉，我将完成剩余部分的翻译。</p><h3 id="_6-1-加载外部配置-1" tabindex="-1"><a class="header-anchor" href="#_6-1-加载外部配置-1"><span>6.1 加载外部配置</span></a></h3><p>在2.4版本之前，外部配置的管理是由bootstrap确保的。我们需要_spring-cloud-starter-bootstrap_依赖项。让我们将其添加到我们的_pom.xml_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````org.springframework.cloud````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````spring-cloud-starter-bootstrap````&lt;/artifactId&gt;````\n````&lt;/dependency&gt;````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将在资源文件夹中创建一个_bootstrap.properties_文件，并配置我们服务器的访问URL：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.cloud.config.name=baeldung\nspring.cloud.config.uri=http://localhost:8081\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们在_application.properties_中启用旧版配置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.config.use-legacy-processing=true\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6-2-启用覆盖能力" tabindex="-1"><a class="header-anchor" href="#_6-2-启用覆盖能力"><span>6.2 启用覆盖能力</span></a></h3><p>在服务器端，我们需要指出属性覆盖是可能的。让我们以这种方式修改我们的_baeldung.properties_文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.cloud.config.overrideNone=true\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，外部属性将不会优先于在应用程序JAR中定义的那些。</p><h3 id="_6-3-覆盖服务器的属性" tabindex="-1"><a class="header-anchor" href="#_6-3-覆盖服务器的属性"><span>6.3 覆盖服务器的属性</span></a></h3><p>我们现在可以通过客户端应用程序的_application.properties_文件覆盖_hello_属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>hello=localproperty\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们测试我们控制器的调用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ curl http://localhost:8080/hello\nlocalproperty\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-旧版配置的弃用" tabindex="-1"><a class="header-anchor" href="#_6-4-旧版配置的弃用"><span>6.4 旧版配置的弃用</span></a></h3><p><strong>自Spring Boot版本3.0以来，不再可能启用旧版配置</strong>。在这种情况下，我们应该使用上面提出的其他方法。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，<strong>我们看到了在Spring Cloud Config中覆盖远程属性值的不同方式</strong>。</p><p>可以从服务器覆盖为特定应用程序定义的属性。<strong>也可以使用配置文件或占位符在客户端级别覆盖属性</strong>。我们还看到了如何激活旧版配置以返回旧的属性管理系统。</p><p>如往常一样，源代码可在GitHub上找到。</p><p>OK</p>',100),l=[i];function o(p,r){return a(),e("div",null,l)}const u=n(t,[["render",o],["__file","2024-07-12-Overriding the Values of Remote Properties in Spring Cloud Config.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Overriding%20the%20Values%20of%20Remote%20Properties%20in%20Spring%20Cloud%20Config.html","title":"Spring Cloud Config中覆盖远程属性值的方法","lang":"zh-CN","frontmatter":{"date":"2022-07-12T00:00:00.000Z","category":["Spring Cloud","Configuration"],"tag":["Spring Cloud Config","Remote Properties"],"head":[["meta",{"name":"keywords","content":"Spring Cloud, Configuration, Properties Override"}],["meta",{"name":"description","content":"学习如何在Spring Cloud Config中覆盖远程属性的值。"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Overriding%20the%20Values%20of%20Remote%20Properties%20in%20Spring%20Cloud%20Config.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Cloud Config中覆盖远程属性值的方法"}],["meta",{"property":"og:description","content":"Spring Cloud Config中覆盖远程属性值的方法 Spring Cloud Config是Spring Cloud项目的一部分。它通过集中式服务管理应用程序配置数据，使其与部署的微服务明显分离。Spring Cloud Config拥有自己的属性管理仓库，并且也与Git、Consul和Eureka等开源项目集成。 在本文中，我们将看到在Sp..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T01:55:04.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Cloud Config"}],["meta",{"property":"article:tag","content":"Remote Properties"}],["meta",{"property":"article:published_time","content":"2022-07-12T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T01:55:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Cloud Config中覆盖远程属性值的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-07-12T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T01:55:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Cloud Config中覆盖远程属性值的方法 Spring Cloud Config是Spring Cloud项目的一部分。它通过集中式服务管理应用程序配置数据，使其与部署的微服务明显分离。Spring Cloud Config拥有自己的属性管理仓库，并且也与Git、Consul和Eureka等开源项目集成。 在本文中，我们将看到在Sp..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[{"level":3,"title":"2.1 创建配置文件","slug":"_2-1-创建配置文件","link":"#_2-1-创建配置文件","children":[]},{"level":3,"title":"2.2 添加属性","slug":"_2-2-添加属性","link":"#_2-2-添加属性","children":[]},{"level":3,"title":"2.3 Spring-Boot Config Server应用程序","slug":"_2-3-spring-boot-config-server应用程序","link":"#_2-3-spring-boot-config-server应用程序","children":[]}]},{"level":2,"title":"3. 客户端应用程序","slug":"_3-客户端应用程序","link":"#_3-客户端应用程序","children":[{"level":3,"title":"3.1 项目设置和依赖项","slug":"_3-1-项目设置和依赖项","link":"#_3-1-项目设置和依赖项","children":[]},{"level":3,"title":"3.2 创建客户端应用程序","slug":"_3-2-创建客户端应用程序","link":"#_3-2-创建客户端应用程序","children":[]},{"level":3,"title":"3.3 获取配置","slug":"_3-3-获取配置","link":"#_3-3-获取配置","children":[]},{"level":3,"title":"3.4 添加一个简单的控制器","slug":"_3-4-添加一个简单的控制器","link":"#_3-4-添加一个简单的控制器","children":[]}]},{"level":2,"title":"4. 在服务器端覆盖属性","slug":"_4-在服务器端覆盖属性","link":"#_4-在服务器端覆盖属性","children":[]},{"level":2,"title":"5. 在客户端覆盖属性","slug":"_5-在客户端覆盖属性","link":"#_5-在客户端覆盖属性","children":[{"level":3,"title":"5.1 使用Spring配置文件","slug":"_5-1-使用spring配置文件","link":"#_5-1-使用spring配置文件","children":[]},{"level":3,"title":"5.2 使用占位符","slug":"_5-2-使用占位符","link":"#_5-2-使用占位符","children":[]}]},{"level":2,"title":"6. 旧版配置","slug":"_6-旧版配置","link":"#_6-旧版配置","children":[{"level":3,"title":"6.1 加载外部配置","slug":"_6-1-加载外部配置","link":"#_6-1-加载外部配置","children":[]},{"level":3,"title":"6.1 加载外部配置","slug":"_6-1-加载外部配置-1","link":"#_6-1-加载外部配置-1","children":[]},{"level":3,"title":"6.2 启用覆盖能力","slug":"_6-2-启用覆盖能力","link":"#_6-2-启用覆盖能力","children":[]},{"level":3,"title":"6.3 覆盖服务器的属性","slug":"_6-3-覆盖服务器的属性","link":"#_6-3-覆盖服务器的属性","children":[]},{"level":3,"title":"6.4 旧版配置的弃用","slug":"_6-4-旧版配置的弃用","link":"#_6-4-旧版配置的弃用","children":[]}]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720749304000,"updatedTime":1720749304000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.36,"words":2209},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Overriding the Values of Remote Properties in Spring Cloud Config.md","localizedDate":"2022年7月12日","excerpt":"<hr>\\n<h1>Spring Cloud Config中覆盖远程属性值的方法</h1>\\n<p>Spring Cloud Config是Spring Cloud项目的一部分。它通过集中式服务管理应用程序配置数据，使其与部署的微服务明显分离。Spring Cloud Config拥有自己的属性管理仓库，并且也与Git、Consul和Eureka等开源项目集成。</p>\\n<p>在本文中，我们将看到在Spring Cloud Config中覆盖远程属性值的不同方法，Spring从2.4版本开始施加的限制，以及3.0版本带来的变化。本教程将使用spring-boot版本3.2.2。</p>\\n<h2>1. 概述</h2>","autoDesc":true}');export{u as comp,v as data};
