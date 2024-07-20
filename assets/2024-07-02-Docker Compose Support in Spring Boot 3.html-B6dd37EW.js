import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-DfO5Xg_k.js";const t={},o=e('<h1 id="docker-compose-在-spring-boot-3-中的支持" tabindex="-1"><a class="header-anchor" href="#docker-compose-在-spring-boot-3-中的支持"><span>Docker Compose 在 Spring Boot 3 中的支持</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Spring Boot 3 引入了新特性，比如将应用程序构建为 GraalVM 原生映像或 Java 17 基线版本。然而，另一个重要的支持是 Docker Compose 的集成。</p><p>在本教程中，我们将看到如何将 Docker Compose 工作流程与 Spring Boot 3 集成。</p><h2 id="_2-spring-boot-3-对-docker-compose-的支持提供了什么" tabindex="-1"><a class="header-anchor" href="#_2-spring-boot-3-对-docker-compose-的支持提供了什么"><span>2. Spring Boot 3 对 Docker Compose 的支持提供了什么？</span></a></h2><p>通常，我们会运行 <code>docker-compose up</code> 来启动容器，并使用 <code>docker-compose down</code> 来停止基于 <code>docker-compose.yml</code> 的容器。现在，我们可以将这些 Docker Compose 命令委托给 Spring Boot 3。当 Spring Boot 应用程序启动或停止时，它也将管理我们的容器。</p><p><strong>此外，它内置了对多个服务的管理，如 SQL 数据库、MongoDB、Cassandra 等。因此，我们可能不需要在应用程序资源文件中重复配置类或属性。</strong></p><p>最后，我们将看到我们可以将这种支持与自定义 Docker 映像和 Docker Compose 配置文件一起使用。</p><h2 id="_3-设置" tabindex="-1"><a class="header-anchor" href="#_3-设置"><span>3. 设置</span></a></h2><p>我们需要 Docker Compose 和 Spring Boot 3 来探索这种新支持。</p><h3 id="_3-1-docker-compose" tabindex="-1"><a class="header-anchor" href="#_3-1-docker-compose"><span>3.1. Docker Compose</span></a></h3><p>Docker Compose 需要已经安装的 Docker 引擎。它们很容易安装，尽管根据操作系统可能会有所不同。</p><p>Docker 在我们的主机上作为服务运行。我们可以从 Docker 镜像中在我们的系统中运行容器作为轻量级进程。我们可以将镜像视为在最小的 Linux 内核之上的多层镜像。</p><h3 id="_3-2-spring-boot-3" tabindex="-1"><a class="header-anchor" href="#_3-2-spring-boot-3"><span>3.2. Spring Boot 3</span></a></h3><p>有几种设置 Spring Boot 3 项目的方法。例如，我们可以使用版本 3.1.0 的 Spring 初始化器。然而，我们总是需要 Spring Boot 3 启动器库来包含项目中的依赖项。</p><p>首先，我们添加一个父 POM：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">&gt;</span></span>`\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````org.springframework.boot`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````spring-boot-starter-parent`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>relativePath</span> <span class="token punctuation">/&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们希望为我们的应用程序使用 REST 端点，所以我们需要 web 依赖项；</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````org.springframework.boot`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````spring-boot-starter-web`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将连接到一个示例数据库。有多种内置支持。我们将使用 MongoDB：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````org.springframework.boot`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````spring-boot-starter-data-mongodb`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了检查我们的应用程序是否正常运行，我们将使用 Spring Boot Actuator 进行健康检查：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````org.springframework.boot`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````spring-boot-starter-actuator`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将添加 Docker Compose 依赖项。如果我们想使用其他项目功能但排除 Docker Compose 支持，我们可以将 <em>optional</em> 标签设置为 <em>true</em>：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````org.springframework.boot`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````spring-boot-docker-compose`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`3.1.1`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们使用 Gradle，我们可能会考虑使用 Spring Boot Gradle 插件进行 BOM 类似的依赖管理。</p><h2 id="_4-spring-boot-3-与-docker-compose-应用程序快速启动" tabindex="-1"><a class="header-anchor" href="#_4-spring-boot-3-与-docker-compose-应用程序快速启动"><span>4. Spring Boot 3 与 Docker Compose 应用程序快速启动</span></a></h2><p>我们将使用 MongoDB 数据库创建一个 Spring Boot 3 应用程序。<strong>一旦我们在启动时有了 <code>spring-boot-docker-compose</code> 依赖项，我们的应用程序就会在 <code>docker-compose.yml</code> 文件中启动所有服务。</strong></p><h3 id="_4-1-docker-compose-文件" tabindex="-1"><a class="header-anchor" href="#_4-1-docker-compose-文件"><span>4.1. Docker Compose 文件</span></a></h3><p>首先，让我们创建一个 <code>docker-compose.yml</code> 文件：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span>\n<span class="token key atrule">services</span><span class="token punctuation">:</span>\n  <span class="token key atrule">db</span><span class="token punctuation">:</span>\n    <span class="token key atrule">image</span><span class="token punctuation">:</span> mongo<span class="token punctuation">:</span>latest\n    <span class="token key atrule">ports</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> <span class="token string">&#39;27017:27017&#39;</span>\n    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> db<span class="token punctuation">:</span>/data/db\n<span class="token key atrule">volumes</span><span class="token punctuation">:</span>\n  <span class="token key atrule">db</span><span class="token punctuation">:</span>\n    <span class="token key atrule">driver</span><span class="token punctuation">:</span> local\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-spring-配置文件" tabindex="-1"><a class="header-anchor" href="#_4-2-spring-配置文件"><span>4.2. Spring 配置文件</span></a></h3><p>我们需要告诉 Spring Boot 3 Docker Compose 文件的名称和路径。我们可以在一个 <code>application-{profile}</code> 属性或 YAML 文件中添加这个信息。我们将使用一个 <code>docker-compose</code> Spring 配置文件。因此，我们将创建一个 <code>application-docker-compose.yml</code> 配置文件：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>\n  <span class="token key atrule">docker</span><span class="token punctuation">:</span>\n    <span class="token key atrule">compose</span><span class="token punctuation">:</span>\n      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>\n      <span class="token key atrule">file</span><span class="token punctuation">:</span> docker<span class="token punctuation">-</span>compose.yml\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-数据库配置" tabindex="-1"><a class="header-anchor" href="#_4-3-数据库配置"><span>4.3. 数据库配置</span></a></h3><p>我们不需要数据库配置。Docker Compose 支持将创建一个默认配置。然而，我们仍然可以使用配置文件添加我们的 MongoDB 配置，例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Profile</span><span class="token punctuation">(</span><span class="token string">&quot;!docker-compose&quot;</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样，我们可以选择是否使用 Docker Compose 支持。如果我们不使用配置文件，应用程序将期望数据库已经在运行。</p><h3 id="_4-4-模型" tabindex="-1"><a class="header-anchor" href="#_4-4-模型"><span>4.4. 模型</span></a></h3><p>然后，我们为一个通用项目创建一个简单的 <code>Document</code> 类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Document</span><span class="token punctuation">(</span><span class="token string">&quot;item&quot;</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@Data</span>\n<span class="token annotation punctuation">@NoArgsConstructor</span>\n<span class="token annotation punctuation">@AllArgsConstructor</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Item</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Id</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">int</span> quantity<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> category<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-5-rest-控制器" tabindex="-1"><a class="header-anchor" href="#_4-5-rest-控制器"><span>4.5. REST 控制器</span></a></h3><p>最后，让我们定义一个带有一些 CRUD 操作的控制器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>\n<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/item&quot;</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@RequiredArgsConstructor</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ItemController</span> <span class="token punctuation">{</span>\n    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\n    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span>consumes <span class="token operator">=</span> <span class="token constant">APPLICATION_JSON_VALUE</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">&gt;</span></span>` <span class="token function">save</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">Item</span> item<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>itemRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token comment">// 其他端点</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-应用程序测试" tabindex="-1"><a class="header-anchor" href="#_5-应用程序测试"><span>5. 应用程序测试</span></a></h2><p>我们可以通过从我们喜欢的 IDE 或命令行启动主 Spring Boot 3 类来启动应用程序。</p><h3 id="_5-1-应用程序启动" tabindex="-1"><a class="header-anchor" href="#_5-1-应用程序启动"><span>5.1. 应用程序启动</span></a></h3><p>让我们记得提到一个 Spring 配置文件。例如，从命令行，我们可以使用 Spring Boot maven 插件：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mvn spring-boot:run -Pdocker-compose -Dspring-boot.run.profiles<span class="token operator">=</span>docker-compose\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们还添加了一个专用的 Maven 构建配置文件（<code>-Pdocker-compose</code>），以防存在其他配置文件。</p><p>现在，如果我们执行 <code>docker ps</code>，我们将看到我们的 MongoDB 容器正在运行：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>CONTAINER ID   IMAGE             COMMAND                  CREATED        STATUS            PORTS                                           NAMES\n77a9667b291a   mongo:latest      <span class="token string">&quot;docker-entrypoint.s…&quot;</span>   <span class="token number">21</span> hours ago   Up <span class="token number">10</span> minutes     <span class="token number">0.0</span>.0.0:27017-<span class="token operator">&gt;</span><span class="token number">27017</span>/tcp, :::27017-<span class="token operator">&gt;</span><span class="token number">27017</span>/tcp   classes-db-1\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以对应用程序进行一些实时测试。</p><h3 id="_5-2-应用程序检查" tabindex="-1"><a class="header-anchor" href="#_5-2-应用程序检查"><span>5.2. 应用程序检查</span></a></h3><p>我们可以使用 actuator 端点检查我们的应用程序是否正常运行：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">--location</span> <span class="token string">&#39;http://localhost:8080/actuator/health&#39;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果一切正常，我们应该得到一个 <code>200</code> 状态：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>\n    <span class="token property">&quot;status&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UP&quot;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于数据库检查，让我们在端点 <code>http://localhost:8080/item</code> 上使用 POST 调用添加一些项目。例如，让我们看看一个 <code>curl</code> Post 请求：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">--location</span> <span class="token string">&#39;http://localhost:8080/item&#39;</span> <span class="token punctuation">\\</span>\n<span class="token parameter variable">--header</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> <span class="token punctuation">\\</span>\n<span class="token parameter variable">--data</span> <span class="token string">&#39;{\n    &quot;name&quot; : &quot;Tennis Ball&quot;,\n    &quot;quantity&quot; : 5,\n    &quot;category&quot; : &quot;sport&quot;\n}&#39;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将得到一个带有生成的项目 <code>id</code> 的响应：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>\n    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;64b117b6a805f7296d8412d9&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Tennis Ball&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;quantity&quot;</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;category&quot;</span><span class="token operator">:</span> <span class="token string">&quot;sport&quot;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-应用程序关闭" tabindex="-1"><a class="header-anchor" href="#_5-3-应用程序关闭"><span>5.3. 应用程序关闭</span></a></h3><p>最后，关闭 Spring Boot 3 应用程序也将停止我们的容器。我们可以通过执行 <code>docker ps -a</code> 来看到这一点：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>CONTAINER ID   IMAGE             COMMAND                  CREATED        STATUS                     PORTS     NAMES\n77a9667b291a   mongo:latest      <span class="token string">&quot;docker-entrypoint.s…&quot;</span>   <span class="token number">22</span> hours ago   Exited <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token number">5</span> seconds ago             classes-db-1\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-docker-compose-支持特性" tabindex="-1"><a class="header-anchor" href="#_6-docker-compose-支持特性"><span>6. Docker Compose 支持特性</span></a></h2><p>让我们快速说明 Docker Compose 支持的一些最相关特性。</p><h3 id="_6-1-服务连接" tabindex="-1"><a class="header-anchor" href="#_6-1-服务连接"><span>6.1. 服务连接</span></a></h3><p>这种支持将在启动时自动发现多个服务。我们已经看到了 MongoDB。然而，还有其他的，比如 Redis 或 ElasticSearch。服务连接将找到并使用本地映射的端口。我们可以跳过配置类或属性。这是通过 Spring Boot 使用 <code>ConnectionDetails</code> 抽象来完成的。</p><h3 id="_6-2-自定义映像" tabindex="-1"><a class="header-anchor" href="#_6-2-自定义映像"><span>6.2. 自定义映像</span></a></h3><p>我们可以通过应用一个 <code>label</code> 来使用自定义 Docker 映像：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span>\n<span class="token key atrule">services</span><span class="token punctuation">:</span>\n  <span class="token key atrule">db</span><span class="token punctuation">:</span>\n    <span class="token key atrule">image</span><span class="token punctuation">:</span> our<span class="token punctuation">-</span>custom<span class="token punctuation">-</span>mongo<span class="token punctuation">-</span>image\n    <span class="token key atrule">ports</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> <span class="token string">&#39;27017:27017&#39;</span>\n    volumes```yaml\n      <span class="token punctuation">-</span> db<span class="token punctuation">:</span>/data/db\n    <span class="token key atrule">labels</span><span class="token punctuation">:</span>\n      <span class="token key atrule">org.springframework.boot.service-connection</span><span class="token punctuation">:</span> mongo\n<span class="token key atrule">volumes</span><span class="token punctuation">:</span>\n  <span class="token key atrule">db</span><span class="token punctuation">:</span>\n    <span class="token key atrule">driver</span><span class="token punctuation">:</span> local\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-等待容器就绪" tabindex="-1"><a class="header-anchor" href="#_6-3-等待容器就绪"><span>6.3. 等待容器就绪</span></a></h3><p>有趣的是，Spring Boot 3 将自动检查容器的就绪状态。容器可能需要一些时间才能完全准备好。因此，这个特性让我们可以使用 <code>healthcheck</code> 命令来查看容器是否已经准备好。</p><h3 id="_6-4-激活-docker-compose-配置文件" tabindex="-1"><a class="header-anchor" href="#_6-4-激活-docker-compose-配置文件"><span>6.4. 激活 Docker Compose 配置文件</span></a></h3><p>我们可以在运行时在不同的 Docker Compose 配置文件之间切换。我们的服务定义可能很复杂，所以我们可能想要选择启用哪个配置文件，例如，如果我们在调试或生产环境中。我们可以通过使用配置属性来实现这一点：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code>spring.docker.compose.profiles.active=myprofile\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_7-docker-compose-支持的优势" tabindex="-1"><a class="header-anchor" href="#_7-docker-compose-支持的优势"><span>7. Docker Compose 支持的优势</span></a></h2><p>在生产环境中，我们的 Docker 服务可能会分布在不同的实例上。因此，在这种情况下，我们可能不需要这种支持。然而，我们可以激活一个 Spring 配置文件，该文件仅从 <code>_docker-compose.yml_</code> 定义中加载本地开发环境。</p><p><strong>这种支持与我们的 IDE 集成得很好，我们将不会在命令行之间来回切换来启动和停止 Docker 服务。</strong></p><p>支持从版本 3.1 开始。总的来说，已经有不错的特性，例如多服务连接、默认的服务就绪性检查，以及使用 Docker Compose 配置文件的可能性。</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们学习了 Spring Boot 3.1.0 中新的 Docker Compose 支持。我们看到了如何设置并创建一个使用它的 Spring Boot 3 应用程序。</p><p>遵循 Spring Boot 的开发便利性，这种支持非常实用，并且已经具有不错的特性。在启动和停止应用程序的同时，Spring Boot 3 管理了我们的 Docker 服务的生命周期。</p><p>如常，本文中展示的代码可以在 GitHub 上找到。</p><p>OK</p>',86),p=[o];function c(l,i){return a(),s("div",null,p)}const u=n(t,[["render",c],["__file","2024-07-02-Docker Compose Support in Spring Boot 3.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Docker%20Compose%20Support%20in%20Spring%20Boot%203.html","title":"Docker Compose 在 Spring Boot 3 中的支持","lang":"zh-CN","frontmatter":{"date":"2024-07-03T00:00:00.000Z","category":["Spring Boot","Docker Compose"],"tag":["Spring Boot 3","Docker Compose 支持"],"head":[["meta",{"name":"keywords","content":"Spring Boot 3, Docker Compose, 集成, 教程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Docker%20Compose%20Support%20in%20Spring%20Boot%203.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Docker Compose 在 Spring Boot 3 中的支持"}],["meta",{"property":"og:description","content":"Docker Compose 在 Spring Boot 3 中的支持 1. 概述 Spring Boot 3 引入了新特性，比如将应用程序构建为 GraalVM 原生映像或 Java 17 基线版本。然而，另一个重要的支持是 Docker Compose 的集成。 在本教程中，我们将看到如何将 Docker Compose 工作流程与 Spring ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T16:39:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot 3"}],["meta",{"property":"article:tag","content":"Docker Compose 支持"}],["meta",{"property":"article:published_time","content":"2024-07-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T16:39:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Docker Compose 在 Spring Boot 3 中的支持\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-03T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T16:39:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Docker Compose 在 Spring Boot 3 中的支持 1. 概述 Spring Boot 3 引入了新特性，比如将应用程序构建为 GraalVM 原生映像或 Java 17 基线版本。然而，另一个重要的支持是 Docker Compose 的集成。 在本教程中，我们将看到如何将 Docker Compose 工作流程与 Spring ..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Spring Boot 3 对 Docker Compose 的支持提供了什么？","slug":"_2-spring-boot-3-对-docker-compose-的支持提供了什么","link":"#_2-spring-boot-3-对-docker-compose-的支持提供了什么","children":[]},{"level":2,"title":"3. 设置","slug":"_3-设置","link":"#_3-设置","children":[{"level":3,"title":"3.1. Docker Compose","slug":"_3-1-docker-compose","link":"#_3-1-docker-compose","children":[]},{"level":3,"title":"3.2. Spring Boot 3","slug":"_3-2-spring-boot-3","link":"#_3-2-spring-boot-3","children":[]}]},{"level":2,"title":"4. Spring Boot 3 与 Docker Compose 应用程序快速启动","slug":"_4-spring-boot-3-与-docker-compose-应用程序快速启动","link":"#_4-spring-boot-3-与-docker-compose-应用程序快速启动","children":[{"level":3,"title":"4.1. Docker Compose 文件","slug":"_4-1-docker-compose-文件","link":"#_4-1-docker-compose-文件","children":[]},{"level":3,"title":"4.2. Spring 配置文件","slug":"_4-2-spring-配置文件","link":"#_4-2-spring-配置文件","children":[]},{"level":3,"title":"4.3. 数据库配置","slug":"_4-3-数据库配置","link":"#_4-3-数据库配置","children":[]},{"level":3,"title":"4.4. 模型","slug":"_4-4-模型","link":"#_4-4-模型","children":[]},{"level":3,"title":"4.5. REST 控制器","slug":"_4-5-rest-控制器","link":"#_4-5-rest-控制器","children":[]}]},{"level":2,"title":"5. 应用程序测试","slug":"_5-应用程序测试","link":"#_5-应用程序测试","children":[{"level":3,"title":"5.1. 应用程序启动","slug":"_5-1-应用程序启动","link":"#_5-1-应用程序启动","children":[]},{"level":3,"title":"5.2. 应用程序检查","slug":"_5-2-应用程序检查","link":"#_5-2-应用程序检查","children":[]},{"level":3,"title":"5.3. 应用程序关闭","slug":"_5-3-应用程序关闭","link":"#_5-3-应用程序关闭","children":[]}]},{"level":2,"title":"6. Docker Compose 支持特性","slug":"_6-docker-compose-支持特性","link":"#_6-docker-compose-支持特性","children":[{"level":3,"title":"6.1. 服务连接","slug":"_6-1-服务连接","link":"#_6-1-服务连接","children":[]},{"level":3,"title":"6.2. 自定义映像","slug":"_6-2-自定义映像","link":"#_6-2-自定义映像","children":[]},{"level":3,"title":"6.3. 等待容器就绪","slug":"_6-3-等待容器就绪","link":"#_6-3-等待容器就绪","children":[]},{"level":3,"title":"6.4. 激活 Docker Compose 配置文件","slug":"_6-4-激活-docker-compose-配置文件","link":"#_6-4-激活-docker-compose-配置文件","children":[]}]},{"level":2,"title":"7. Docker Compose 支持的优势","slug":"_7-docker-compose-支持的优势","link":"#_7-docker-compose-支持的优势","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1719938379000,"updatedTime":1719938379000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.09,"words":2126},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Docker Compose Support in Spring Boot 3.md","localizedDate":"2024年7月3日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>Spring Boot 3 引入了新特性，比如将应用程序构建为 GraalVM 原生映像或 Java 17 基线版本。然而，另一个重要的支持是 Docker Compose 的集成。</p>\\n<p>在本教程中，我们将看到如何将 Docker Compose 工作流程与 Spring Boot 3 集成。</p>\\n<h2>2. Spring Boot 3 对 Docker Compose 的支持提供了什么？</h2>\\n<p>通常，我们会运行 <code>docker-compose up</code> 来启动容器，并使用 <code>docker-compose down</code> 来停止基于 <code>docker-compose.yml</code> 的容器。现在，我们可以将这些 Docker Compose 命令委托给 Spring Boot 3。当 Spring Boot 应用程序启动或停止时，它也将管理我们的容器。</p>","autoDesc":true}');export{u as comp,k as data};
