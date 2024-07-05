import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BaAI5AMv.js";const e={},p=t(`<h1 id="spring-boot-中使用-loki-进行日志记录" tabindex="-1"><a class="header-anchor" href="#spring-boot-中使用-loki-进行日志记录"><span>Spring Boot 中使用 Loki 进行日志记录</span></a></h1><p>无论你是刚开始学习还是拥有多年经验，<strong>Spring Boot</strong> 都是构建新应用程序的绝佳选择，它让开发变得轻松。</p><p>Jmix 增强了 Spring Boot 开发者的能力，允许他们构建和交付 <strong>全栈 Web 应用程序</strong>，而无需深入前端技术。它使你能够创建从简单的 Web GUI CRUD 应用程序到复杂的企业解决方案，消除了前端/后端分离及其相关的安全问题。</p><p><strong>Jmix 平台</strong> 包括一个基于 <strong>Spring Boot, JPA, 和 Vaadin</strong> 的框架，并附带 Jmix Studio，这是一个 IntelliJ IDEA 插件，配备了一套开发者生产力工具。该平台还提供了 <strong>即开即用</strong> 的插件，用于报告生成、BPM、地图等，你可以在 Jmix 应用程序中使用它们，或者作为单独的服务。所有技术都是相互连接的，使单个 Java 开发者能够在几乎不需要开始知识的情况下，达到整个团队的水平。</p><p>另外！Jmix 可以 <strong>立即生成 CRUD Web 应用程序</strong>，包括其 JPA 数据模型和 UI，<strong>直接从现有的数据库</strong>。然后，继续在 Jmix Studio 的帮助下进行开发。</p><p>聪明地开发，而不是辛苦地开发！</p><p><strong>&gt;&gt; 成为全栈开发者</strong></p><p><strong>使用 Jmix</strong></p><p>现在，随着新版《REST With Spring -》的发布，即“<strong>REST With Spring Boot</strong>”，当前价格将在 6 月 22 日之前有效，之后将永久增加 50 美元。</p><p><strong>&gt;&gt; 立即获取访问权限</strong></p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>由 Grafana Labs 开发的 Loki 是一个受 Prometheus 启发的开源日志聚合系统。它的目的是存储和索引日志数据，便于有效查询和分析由不同应用程序和系统生成的日志。</p><p>在本文中，我们将为 Spring Boot 应用程序设置 Grafana Loki 日志记录。Loki 将收集和聚合应用程序日志，而 Grafana 将显示它们。</p><h2 id="_2-运行-loki-和-grafana-服务" tabindex="-1"><a class="header-anchor" href="#_2-运行-loki-和-grafana-服务"><span>2. 运行 Loki 和 Grafana 服务</span></a></h2><p>我们首先启动 Loki 和 Grafana 服务，以便我们可以收集和观察日志。Docker 容器将帮助我们更容易地配置和运行它们。</p><p>首先，让我们在 docker-compose 文件中组合 Loki 和 Grafana 服务：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3&quot;</span>
<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">loki</span><span class="token punctuation">:</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">loki</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> grafana/loki<span class="token punctuation">:</span>2.9.0
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;3100:3100&quot;</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">-</span>config.file=/etc/loki/local<span class="token punctuation">-</span>config.yaml
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> loki
  <span class="token key atrule">grafana</span><span class="token punctuation">:</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> GF_PATHS_PROVISIONING=/etc/grafana/provisioning
      <span class="token punctuation">-</span> GF_AUTH_ANONYMOUS_ENABLED=true
      <span class="token punctuation">-</span> GF_AUTH_ANONYMOUS_ORG_ROLE=Admin
    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> sh
      <span class="token punctuation">-</span> <span class="token punctuation">-</span>euc
      <span class="token punctuation">-</span> <span class="token punctuation">|</span><span class="token scalar string">
        mkdir -p /etc/grafana/provisioning/datasources
        cat \`&lt;&lt;EOF &gt;\` /etc/grafana/provisioning/datasources/ds.yaml
        apiVersion: 1
        datasources:
        - name: Loki
          type: loki
          access: proxy
          orgId: 1
          url: http://loki:3100
          basicAuth: false
          isDefault: true
          version: 1
          editable: false
        EOF
        /run.sh</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> grafana/grafana<span class="token punctuation">:</span>latest
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;3000:3000&quot;</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> loki
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们使用 <em>docker-compose</em> 命令启动服务：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> up
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，让我们确认两个服务是否都已启动：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">ps</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-使用-spring-boot-配置-loki" tabindex="-1"><a class="header-anchor" href="#_3-使用-spring-boot-配置-loki"><span>3. 使用 Spring Boot 配置 Loki</span></a></h2><p>一旦我们启动了 Grafana 和 Loki 服务，我们需要配置我们的应用程序将其日志发送到 Loki。我们将使用 <em>loki-logback-appender</em>，它负责将日志发送到 Loki 聚合器进行存储和索引。</p><p>首先，我们需要在 <em>pom.xml</em> 文件中添加 <em>loki-logback-appender</em>：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`com.github.loki4j\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`loki-logback-appender\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`1.4.1\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其次，我们需要在 <em>src/main/resources</em> 文件夹下创建一个 <em>logback-spring.xml</em> 文件。这个文件将控制我们的 Spring Boot 应用程序的日志行为，例如日志的格式，Loki 服务的端点等：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>\`
   \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>LOKI<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.github.loki4j.logback.Loki4jAppender<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>http</span><span class="token punctuation">&gt;</span></span>\`
            \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>\`http://localhost:3100/loki/api/v1/push\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>http</span><span class="token punctuation">&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>format</span><span class="token punctuation">&gt;</span></span>\`
            \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span><span class="token punctuation">&gt;</span></span>\`
                \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pattern</span><span class="token punctuation">&gt;</span></span>\`\`app=\${name},host=\${HOSTNAME},level=%level\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pattern</span><span class="token punctuation">&gt;</span></span>\`\`
                \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>readMarkers</span><span class="token punctuation">&gt;</span></span>\`true\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>readMarkers</span><span class="token punctuation">&gt;</span></span>\`
            \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">&gt;</span></span>\`
            \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>message</span><span class="token punctuation">&gt;</span></span>\`
                \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pattern</span><span class="token punctuation">&gt;</span></span>\`\`
                    {
                    &quot;level&quot;:&quot;%level&quot;,
                    &quot;class&quot;:&quot;%logger{36}&quot;,
                    &quot;thread&quot;:&quot;%thread&quot;,
                    &quot;message&quot;: &quot;%message&quot;,
                    &quot;requestId&quot;: &quot;%X{X-Request-ID}&quot;
                    }
                \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pattern</span><span class="token punctuation">&gt;</span></span>\`\`
            \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>message</span><span class="token punctuation">&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>format</span><span class="token punctuation">&gt;</span></span>\`
   \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>appender</span><span class="token punctuation">&gt;</span></span>\`

   \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>root</span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>INFO<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender-ref</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>LOKI<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\`
   \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>root</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们完成设置，让我们编写一个简单的服务，该服务在 INFO 级别记录数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">class</span> <span class="token class-name">DemoService</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> <span class="token constant">LOG</span> <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">DemoService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token constant">LOG</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;DemoService.log invoked&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-测试验证" tabindex="-1"><a class="header-anchor" href="#_4-测试验证"><span>4. 测试验证</span></a></h2><p>让我们通过启动 Grafana 和 Loki 容器，然后执行服务方法将日志推送到 Loki 来进行实时测试。之后，我们将使用 HTTP API 查询 Loki 以确认日志是否确实被推送。关于启动 Grafana 和 Loki 容器，请参见前一节。</p><p>首先，让我们执行 <em>DemoService.log()</em> 方法，这将调用 <em>Logger.info()</em>。这将使用 <em>loki-logback-appender</em> 发送消息，Loki 将收集它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">DemoService</span> service <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DemoService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
service<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>其次，我们将创建一个请求，调用 Loki 提供的 REST 端点。这个 GET API 接受代表 <em>query</em>、<em>start</em> 时间和 <em>end</em> 时间的查询参数。我们将这些参数作为我们的请求对象的一部分添加：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HttpHeaders</span> headers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HttpHeaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
headers<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> query <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;level\\&quot;:\\&quot;INFO\\&quot;} |= \`DemoService.log invoked\`&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// 获取 UTC 时间</span>
<span class="token class-name">LocalDateTime</span> currentDateTime <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token class-name">ZoneOffset</span><span class="token punctuation">.</span><span class="token constant">UTC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> current_time_utc <span class="token operator">=</span> currentDateTime<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd&#39;T&#39;HH:mm:ss&#39;Z&#39;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">LocalDateTime</span> tenMinsAgo <span class="token operator">=</span> currentDateTime<span class="token punctuation">.</span><span class="token function">minusMinutes</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> start_time_utc <span class="token operator">=</span> tenMinsAgo<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd&#39;T&#39;HH:mm:ss&#39;Z&#39;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">URI</span> uri <span class="token operator">=</span> <span class="token class-name">UriComponentsBuilder</span><span class="token punctuation">.</span><span class="token function">fromUriString</span><span class="token punctuation">(</span>baseUrl<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">queryParam</span><span class="token punctuation">(</span><span class="token string">&quot;query&quot;</span><span class="token punctuation">,</span> query<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">queryParam</span><span class="token punctuation">(</span><span class="token string">&quot;start&quot;</span><span class="token punctuation">,</span> start_time_utc<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">queryParam</span><span class="token punctuation">(</span><span class="token string">&quot;end&quot;</span><span class="token punctuation">,</span> current_time_utc<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">toUri</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们使用请求对象执行 REST 请求：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">RestTemplate</span> restTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ResponseEntity</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` response <span class="token operator">=</span> restTemplate<span class="token punctuation">.</span><span class="token function">exchange</span><span class="token punctuation">(</span>uri<span class="token punctuation">,</span> <span class="token class-name">HttpMethod</span><span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">HttpEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>headers<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们需要处理响应并提取我们感兴趣的日志消息。我们将使用 <em>ObjectMapper</em> 读取 JSON 响应并提取日志消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` messages <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> responseBody <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">JsonNode</span> jsonNode <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readTree</span><span class="token punctuation">(</span>responseBody<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">JsonNode</span> result <span class="token operator">=</span> jsonNode<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;data&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;result&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;values&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

result<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">forEachRemaining</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
      <span class="token class-name">Iterator</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">JsonNode</span><span class="token punctuation">&gt;</span></span>\` elements <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">elements</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      elements<span class="token punctuation">.</span><span class="token function">forEachRemaining</span><span class="token punctuation">(</span>f <span class="token operator">-&gt;</span> messages<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>f<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们断言我们在响应中收到的消息包含 <em>DemoService</em> 记录的消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span>messages<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">anyMatch</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> e<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-日志聚合和可视化" tabindex="-1"><a class="header-anchor" href="#_5-日志聚合和可视化"><span>5. 日志聚合和可视化</span></a></h2><p>由于我们使用 <em>loki-logback-appender</em> 进行了配置设置，我们的服务日志被推送到 Loki 服务。我们可以通过访问浏览器中的 <em>http://localhost:3000</em>（Grafana 服务部署的地方）来可视化它。</p><p><strong>要查看 Loki 中存储和索引的日志，我们需要使用 Grafana。Grafana 数据源提供了可配置的连接参数，我们需要输入 Loki 端点、认证机制等。</strong></p><p>首先，让我们配置日志已被推送到的 Loki 端点：</p><p>一旦我们</p>`,46),o=[p];function c(i,l){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-19-Logging in Spring Boot With Loki.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-19-Logging%20in%20Spring%20Boot%20With%20Loki.html","title":"Spring Boot 中使用 Loki 进行日志记录","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Spring Boot","Logging"],"tag":["Loki","Grafana"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Loki, Grafana, Logging"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-19-Logging%20in%20Spring%20Boot%20With%20Loki.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Boot 中使用 Loki 进行日志记录"}],["meta",{"property":"og:description","content":"Spring Boot 中使用 Loki 进行日志记录 无论你是刚开始学习还是拥有多年经验，Spring Boot 都是构建新应用程序的绝佳选择，它让开发变得轻松。 Jmix 增强了 Spring Boot 开发者的能力，允许他们构建和交付 全栈 Web 应用程序，而无需深入前端技术。它使你能够创建从简单的 Web GUI CRUD 应用程序到复杂的企..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Loki"}],["meta",{"property":"article:tag","content":"Grafana"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot 中使用 Loki 进行日志记录\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Boot 中使用 Loki 进行日志记录 无论你是刚开始学习还是拥有多年经验，Spring Boot 都是构建新应用程序的绝佳选择，它让开发变得轻松。 Jmix 增强了 Spring Boot 开发者的能力，允许他们构建和交付 全栈 Web 应用程序，而无需深入前端技术。它使你能够创建从简单的 Web GUI CRUD 应用程序到复杂的企..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 运行 Loki 和 Grafana 服务","slug":"_2-运行-loki-和-grafana-服务","link":"#_2-运行-loki-和-grafana-服务","children":[]},{"level":2,"title":"3. 使用 Spring Boot 配置 Loki","slug":"_3-使用-spring-boot-配置-loki","link":"#_3-使用-spring-boot-配置-loki","children":[]},{"level":2,"title":"4. 测试验证","slug":"_4-测试验证","link":"#_4-测试验证","children":[]},{"level":2,"title":"5. 日志聚合和可视化","slug":"_5-日志聚合和可视化","link":"#_5-日志聚合和可视化","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.96,"words":1489},"filePathRelative":"posts/baeldung/Archive/2024-06-19-Logging in Spring Boot With Loki.md","localizedDate":"2024年6月20日","excerpt":"\\n<p>无论你是刚开始学习还是拥有多年经验，<strong>Spring Boot</strong> 都是构建新应用程序的绝佳选择，它让开发变得轻松。</p>\\n<p>Jmix 增强了 Spring Boot 开发者的能力，允许他们构建和交付 <strong>全栈 Web 应用程序</strong>，而无需深入前端技术。它使你能够创建从简单的 Web GUI CRUD 应用程序到复杂的企业解决方案，消除了前端/后端分离及其相关的安全问题。</p>\\n<p><strong>Jmix 平台</strong> 包括一个基于 <strong>Spring Boot, JPA, 和 Vaadin</strong> 的框架，并附带 Jmix Studio，这是一个 IntelliJ IDEA 插件，配备了一套开发者生产力工具。该平台还提供了 <strong>即开即用</strong> 的插件，用于报告生成、BPM、地图等，你可以在 Jmix 应用程序中使用它们，或者作为单独的服务。所有技术都是相互连接的，使单个 Java 开发者能够在几乎不需要开始知识的情况下，达到整个团队的水平。</p>","autoDesc":true}');export{k as comp,d as data};
