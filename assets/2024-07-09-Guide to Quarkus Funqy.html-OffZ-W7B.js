import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-DzJ3ruqA.js";const t={},p=e(`<h1 id="quarkus-funqy-指南" tabindex="-1"><a class="header-anchor" href="#quarkus-funqy-指南"><span>Quarkus Funqy 指南</span></a></h1><ol><li>概述</li></ol><p>Quarkus 允许我们交付具有极快启动时间和较低首次接触响应时间的小体量构件。</p><p>在本教程中，我们将探索 Quarkus 框架的 Funqy 扩展。</p><ol start="2"><li>什么是 Funqy？</li></ol><p>Quarkus Funqy 是一种解决方案，旨在提供一种便携的 Java API，允许我们编写无服务器函数。我们可以轻松地将这些函数部署到 FAAS（功能即服务）环境中，如 AWS Lambda、Azure Functions、Google Cloud Functions 和 Kubernetes Knative。我们也可以将它们作为独立服务使用。</p><ol start="3"><li>实现</li></ol><p>让我们使用 Quarkus Funqy 创建一个简单的问候函数，并将其部署在 FAAS 基础设施上。我们可以使用 Quarkus Web 界面创建项目。我们也可以通过执行以下命令使用 Maven 创建项目：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ mvn io.quarkus:quarkus-maven-plugin:2.7.7.Final:create \\
  -DprojectGroupId=com.baeldung.quarkus \\
  -DprojectArtifactId=quarkus-funqy-project \\
  -Dextensions=&quot;funqy-http&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用 <code>quarkus-maven-plugin</code> 创建项目。它将生成一个带有函数类的项目框架。</p><p>让我们将此项目导入我们的 IDE 以获得以下结构：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/02/quarkus-project-1-172x300.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_3-1-java-代码" tabindex="-1"><a class="header-anchor" href="#_3-1-java-代码"><span>3.1. Java 代码</span></a></h3><p>让我们打开 <code>MyFunctions.java</code> 文件并分析内容：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyFunctions</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Funq</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token class-name">FunInput</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;Hello %s!&quot;</span><span class="token punctuation">,</span> input <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> input<span class="token punctuation">.</span>name <span class="token operator">:</span> <span class="token string">&quot;Funqy&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">FunInput</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
        <span class="token comment">// 构造函数，getter，setter</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注解 <code>@Funq</code> 标记方法作为入口点函数。</strong> 最多只能有一个方法参数，该参数可能或不返回响应。默认的函数名称是注解方法的名称；我们可以通过在 <code>@Funq</code> 注解中传递名称字符串来更新它。</p><p>让我们将名称更新为 <code>GreetUser</code> 并添加一个简单的日志语句：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Funq</span><span class="token punctuation">(</span><span class="token string">&quot;GreetUser&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token class-name">FunInput</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Function Triggered&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>部署</li></ol><p>现在让我们打开 <code>MyFunctionTest.java</code> 类并更新所有测试用例中提到的路径中的方法名称。我们首先通过运行以下命令在本地运行它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ ./mvnw quarkus:dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它将启动服务器并执行测试用例。</p><p>让我们使用 <code>curl</code> 进行测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ curl -X POST &#39;http://localhost:8080/GreetUser&#39; \\
--header &#39;Content-Type: application/json&#39; \\
--data-raw &#39;{
    &quot;name&quot;: &quot;Baeldung&quot;
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它将给我们问候的响应。</p><h3 id="_4-1-kubernetes-knative" tabindex="-1"><a class="header-anchor" href="#_4-1-kubernetes-knative"><span>4.1. Kubernetes Knative</span></a></h3><p>现在让我们在 Kubernetes Knative 上部署它。我们将在 <code>pom.xml</code> 文件中添加 <code>quarkus-funqy-knative-events</code> 依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`io.quarkus\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`quarkus-funqy-knative-events\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`3.0.0.Alpha3\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们用一个单元测试来测试它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenFunctionAPI_whenCallWithEvent_thenShouldReturn200</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">RestAssured</span><span class="token punctuation">.</span><span class="token function">given</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contentType</span><span class="token punctuation">(</span><span class="token string">&quot;application/json&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">&quot;ce-specversion&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1.0&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">&quot;ce-id&quot;</span><span class="token punctuation">,</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">&quot;ce-type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;GreetUser&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">&quot;ce-source&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token string">&quot;{ \\&quot;name\\&quot;: \\&quot;Baeldung\\&quot; }&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">statusCode</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们创建我们的应用程序的构建和镜像：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ ./mvnw install
$ docker build -f src/main/docker/Dockerfile.jvm -t \`\`\`&lt;ourDockerAccountName&gt;\`\`\`/quarkus-funqy-project .
$ docker push \`\`\`&lt;ourDockerAccountName&gt;\`\`\`/quarkus-funqy-project
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将在 <code>src/main/kubernetes</code> 目录中创建 Kubernetes Knative 配置 <code>knative.yaml</code> 文件，用于资源创建：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> serving.knative.dev/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> quarkus<span class="token punctuation">-</span>funqy<span class="token punctuation">-</span>project
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> quarkus<span class="token punctuation">-</span>funqy<span class="token punctuation">-</span>project<span class="token punctuation">-</span>v1
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.io/\`\`\`&lt;ourDockerAccountName<span class="token punctuation">&gt;</span>\`\`\`/quarkus<span class="token punctuation">-</span>funqy<span class="token punctuation">-</span>project
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们只需要创建一个代理，代理事件配置 YAML 文件，并部署所有这些。</p><p>让我们创建一个 <code>knative-trigger.yaml</code> 文件：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> eventing.knative.dev/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Trigger
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> baeldung<span class="token punctuation">-</span>event
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">broker</span><span class="token punctuation">:</span> baeldung
  <span class="token key atrule">filter</span><span class="token punctuation">:</span>
    <span class="token key atrule">attributes</span><span class="token punctuation">:</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> GreetUser
  <span class="token key atrule">subscriber</span><span class="token punctuation">:</span>
    <span class="token key atrule">ref</span><span class="token punctuation">:</span>
      <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> serving.knative.dev/v1
      <span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
      <span class="token key atrule">name</span><span class="token punctuation">:</span> quarkus<span class="token punctuation">-</span>funqy<span class="token punctuation">-</span>project
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ kn broker create baeldung
$ kubectl apply -f src/main/kubernetes/knative.yaml
$ kubectl apply -f src/main/kubernetes/knative-trigger.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们验证 pod 和 pod 日志，因为 pod 应该正在运行。如果我们没有发送任何事件，pod 将自动缩放到零。让我们获取代理 URL 以发送事件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ kubectl get broker baeldung -o jsonpath=&#39;{.status.address.url}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们可以从任何 pod 发送事件到这个 URL，并看到如果我们的 Quarkus 应用程序已经关闭，它将启动一个新的 pod。我们还可以通过检查日志来验证我们的函数是否被触发：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ curl -v &quot;\`&lt;our_broker_url&gt;\`&quot;
  -X POST
  -H &quot;Ce-Id: 1234&quot;
  -H &quot;Ce-Specversion: 1.0&quot;
  -H &quot;Ce-Type: GreetUser&quot;
  -H &quot;Ce-Source: curl&quot;
  -H &quot;Content-Type: application/json&quot;
  -d &quot;{ \\&quot;name\\&quot;: \\&quot;Baeldung\\&quot; }&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-云部署" tabindex="-1"><a class="header-anchor" href="#_4-2-云部署"><span>4.2. 云部署</span></a></h3><p>我们可以类似地更新我们的应用程序以部署在云平台上。然而，<strong>每个云部署只能导出一个 Funqy 函数</strong>。如果我们的应用程序有多个 Funqy 方法，我们可以通过在 application.properties 文件中添加以下内容来指定活动函数（将 <em>GreetUser</em> 替换为活动函数名称）：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">quarkus.funqy.export</span><span class="token punctuation">=</span><span class="token value attr-value">GreetUser</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5"><li>结论</li></ol><p>在本文中，我们看到了 Quarkus Funqy 是一个很棒的补充，它帮助我们在无服务器基础设施上轻松运行 Java 函数。我们学习了 Quarkus Funqy 以及如何在无服务器环境中实现、部署和测试它。</p><p>如常，示例的完整源代码可在 GitHub 上获得。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2023/02/quarkus-project-1-172x300.png" alt="img" loading="lazy"></p><p>OK</p>`,50),u=[p];function o(i,c){return s(),a("div",null,u)}const d=n(t,[["render",o],["__file","2024-07-09-Guide to Quarkus Funqy.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Guide%20to%20Quarkus%20Funqy.html","title":"Quarkus Funqy 指南","lang":"zh-CN","frontmatter":{"date":"2024-07-09T00:00:00.000Z","category":["Java","Quarkus"],"tag":["Funqy","Serverless"],"head":[["meta",{"name":"keywords","content":"Java, Quarkus, Funqy, Serverless, Deployment, Kubernetes, Knative, FAAS"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Guide%20to%20Quarkus%20Funqy.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Quarkus Funqy 指南"}],["meta",{"property":"og:description","content":"Quarkus Funqy 指南 概述 Quarkus 允许我们交付具有极快启动时间和较低首次接触响应时间的小体量构件。 在本教程中，我们将探索 Quarkus 框架的 Funqy 扩展。 什么是 Funqy？ Quarkus Funqy 是一种解决方案，旨在提供一种便携的 Java API，允许我们编写无服务器函数。我们可以轻松地将这些函数部署到 F..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/02/quarkus-project-1-172x300.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T10:55:09.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Funqy"}],["meta",{"property":"article:tag","content":"Serverless"}],["meta",{"property":"article:published_time","content":"2024-07-09T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T10:55:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Quarkus Funqy 指南\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/02/quarkus-project-1-172x300.png\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/02/quarkus-project-1-172x300.png\\"],\\"datePublished\\":\\"2024-07-09T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T10:55:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Quarkus Funqy 指南 概述 Quarkus 允许我们交付具有极快启动时间和较低首次接触响应时间的小体量构件。 在本教程中，我们将探索 Quarkus 框架的 Funqy 扩展。 什么是 Funqy？ Quarkus Funqy 是一种解决方案，旨在提供一种便携的 Java API，允许我们编写无服务器函数。我们可以轻松地将这些函数部署到 F..."},"headers":[{"level":3,"title":"3.1. Java 代码","slug":"_3-1-java-代码","link":"#_3-1-java-代码","children":[]},{"level":3,"title":"4.1. Kubernetes Knative","slug":"_4-1-kubernetes-knative","link":"#_4-1-kubernetes-knative","children":[]},{"level":3,"title":"4.2. 云部署","slug":"_4-2-云部署","link":"#_4-2-云部署","children":[]}],"git":{"createdTime":1720522509000,"updatedTime":1720522509000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.97,"words":1192},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Guide to Quarkus Funqy.md","localizedDate":"2024年7月9日","excerpt":"\\n<ol>\\n<li>概述</li>\\n</ol>\\n<p>Quarkus 允许我们交付具有极快启动时间和较低首次接触响应时间的小体量构件。</p>\\n<p>在本教程中，我们将探索 Quarkus 框架的 Funqy 扩展。</p>\\n<ol start=\\"2\\">\\n<li>什么是 Funqy？</li>\\n</ol>\\n<p>Quarkus Funqy 是一种解决方案，旨在提供一种便携的 Java API，允许我们编写无服务器函数。我们可以轻松地将这些函数部署到 FAAS（功能即服务）环境中，如 AWS Lambda、Azure Functions、Google Cloud Functions 和 Kubernetes Knative。我们也可以将它们作为独立服务使用。</p>","autoDesc":true}');export{d as comp,k as data};
