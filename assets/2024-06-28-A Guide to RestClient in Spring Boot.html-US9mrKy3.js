import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DfO5Xg_k.js";const e={},p=t(`<h1 id="spring-boot-中的-restclient-指南" tabindex="-1"><a class="header-anchor" href="#spring-boot-中的-restclient-指南"><span>Spring Boot 中的 RestClient 指南</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p><em>RestClient</em> 是 Spring Framework 6.1 M2 中引入的同步 HTTP 客户端，它取代了 <em>RestTemplate</em>。同步 HTTP 客户端以阻塞方式发送和接收 HTTP 请求和响应，这意味着它在继续下一个请求之前会等待每个请求完成。</p><p>在本教程中，我们将探讨 <em>RestClient</em> 提供了什么，以及它与 <em>RestTemplate</em> 的比较。</p><h2 id="_2-restclient-与-resttemplate" tabindex="-1"><a class="header-anchor" href="#_2-restclient-与-resttemplate"><span>2. <em>RestClient</em> 与 <em>RestTemplate</em></span></a></h2><p><em>RestTemplate</em>，顾名思义，是建立在模板设计模式之上的。它是一种行为设计模式，通过在方法中定义算法的框架，允许子类为某些步骤提供特定的实现。虽然它是一种强大的模式，但它创建了重载的需求，这可能会很不方便。</p><p>为了改进这一点，<em>RestClient</em> 采用了流畅的 API。流畅的 API 是一种设计模式，它允许通过顺序调用对象上的方法来实现方法链，通常不需要中间变量，使代码更易于阅读和表达。</p><p>让我们从创建一个基本的 <em>RestClient</em> 开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">RestClient</span> restClient <span class="token operator">=</span> <span class="token class-name">RestClient</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-使用-http-请求方法进行简单获取" tabindex="-1"><a class="header-anchor" href="#_3-使用-http-请求方法进行简单获取"><span>3. 使用 HTTP 请求方法进行简单获取</span></a></h2><p>与 <em>RestTemplate</em> 或任何其他 REST 客户端类似，<strong><em>RestClient</em> 允许我们使用请求方法进行 HTTP 调用</strong>。让我们通过不同的 HTTP 方法来创建、检索、修改和删除资源。</p><p>我们将操作一个基本的 <em>Article</em> 类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Article</span> <span class="token punctuation">{</span>
    <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>
    <span class="token class-name">String</span> title<span class="token punctuation">;</span>
    <span class="token comment">// 构造函数和获取器</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-使用-get-检索资源" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-get-检索资源"><span>3.1. 使用 GET 检索资源</span></a></h3><p><strong>我们将使用 GET HTTP 方法从 web 服务器上的指定资源请求并检索数据，而不会修改它。</strong> 它主要用于 web 应用程序中的只读操作。</p><p>首先，让我们获取一个简单的 <em>String</em> 作为响应，而不进行任何序列化到我们自定义的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result <span class="token operator">=</span> restClient<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span>uriBase <span class="token operator">+</span> <span class="token string">&quot;/articles&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">retrieve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-使用-post-创建资源" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-post-创建资源"><span>3.2. 使用 POST 创建资源</span></a></h3><p><strong>我们将使用 POST HTTP 方法向 web 服务器上的资源提交数据，通常用于在 web 应用程序中创建新记录或资源。</strong> 与检索数据的 GET 方法不同，POST 旨在发送要由服务器处理的数据，例如提交 web 表单时。</p><p>URI 应该定义我们想要处理的资源。</p><p>让我们向服务器发送一个 ID 等于 1 的简单 Article：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Article</span> article <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;如何使用 RestClient&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ResponseEntity</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">&gt;</span></span>\`\`\` response <span class="token operator">=</span> restClient<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span>uriBase <span class="token operator">+</span> <span class="token string">&quot;/articles&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">contentType</span><span class="token punctuation">(</span><span class="token constant">APPLICATION_JSON</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span>article<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">retrieve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">toBodilessEntity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为我们指定了 &quot;<em>APPLICATION_JSON</em>&quot; 内容类型，<em>Article</em> 类的实例将由底层的 Jackson 库自动序列化为 JSON。在这个例子中，我们使用 <em>toBodilessEntity()</em> 方法忽略了响应体。POST 端点不需要，通常也不返回任何有效载荷。</p><h3 id="_3-3-使用-put-更新资源" tabindex="-1"><a class="header-anchor" href="#_3-3-使用-put-更新资源"><span>3.3. 使用 PUT 更新资源</span></a></h3><p>接下来，<strong>我们将看看 PUT HTTP 方法，它用于使用提供的数据更新或替换现有资源。</strong> 它通常用于修改 web 应用程序中的现有实体或其他资源。通常，我们需要指定要更新的资源，确保完全替换。</p><p>让我们修改我们在前一段中创建的文章。我们提供的 URI 应该识别我们想要更改的资源：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Article</span> article <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;如何更好地使用 RestClient&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ResponseEntity</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">&gt;</span></span>\`\`\` response <span class="token operator">=</span> restClient<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span>uriBase <span class="token operator">+</span> <span class="token string">&quot;/articles/1&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">contentType</span><span class="token punctuation">(</span><span class="token constant">APPLICATION_JSON</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span>article<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">retrieve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">toBodilessEntity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与前一段类似，我们将依赖 <em>RestClient</em> 来序列化我们的负载并忽略响应。</p><h3 id="_3-4-使用-delete-删除资源" tabindex="-1"><a class="header-anchor" href="#_3-4-使用-delete-删除资源"><span>3.4. 使用 DELETE 删除资源</span></a></h3><p><strong>我们将使用 DELETE HTTP 方法请求从 web 服务器中删除指定的资源。</strong> 类似于 GET 端点，我们通常不提供请求的任何负载，并依赖于 URI 中编码的参数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ResponseEntity</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">&gt;</span></span>\`\`\` response <span class="token operator">=</span> restClient<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span>uriBase <span class="token operator">+</span> <span class="token string">&quot;/articles/1&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">retrieve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">toBodilessEntity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-反序列化响应" tabindex="-1"><a class="header-anchor" href="#_4-反序列化响应"><span>4. 反序列化响应</span></a></h2><p>我们经常想要序列化请求并反序列化响应到我们可以高效操作的某些类。<strong><em>RestClient</em> 配备了执行 JSON 到对象转换的能力</strong>，这是由 Jackson 库提供的功能。</p><p>此外，由于共享消息转换器的使用，我们可以使用 <em>RestTemplate</em> 支持的所有数据类型。</p><p>让我们通过其 ID 检索文章，并将序列化到 <em>Article</em> 类的实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Article</span> article <span class="token operator">=</span> restClient<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span>uriBase <span class="token operator">+</span> <span class="token string">&quot;/articles/1&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">retrieve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token class-name">Article</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们想要获得某个泛型类的实例时，指定主体的类就有点复杂了，例如 <em>List</em>。例如，如果我们想要获取所有文章，我们将获得 <em>List<code>&lt;Article&gt;</code></em> 对象。在这种情况下，我们可以使用 <em>ParameterizedTypeReference</em> 抽象类来告诉 <em>RestClient</em> 我们将获得什么对象。</p><p>我们甚至不需要指定泛型类型，Java 会为我们推断类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>\`\`\` articles <span class="token operator">=</span> restClient<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span>uriBase <span class="token operator">+</span> <span class="token string">&quot;/articles&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">retrieve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ParameterizedTypeReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用-exchange-解析响应" tabindex="-1"><a class="header-anchor" href="#_5-使用-exchange-解析响应"><span>5. 使用 Exchange 解析响应</span></a></h2><p><strong><em>RestClient</em> 包括 <em>exchange()</em> 方法，用于通过提供对底层 HTTP 请求和响应的访问来处理更复杂的情况。</strong> 因此，库不会应用默认处理程序，我们必须自己处理状态。</p><p>假设我们正在通信的服务在数据库中没有文章时返回 204 状态代码。由于这种稍微非标准的行为，我们想要以特殊的方式处理它。当状态代码等于 204 时，我们将抛出一个 <em>ArticleNotFoundException</em> 异常，并且在状态代码不等于 200 时，抛出一个更通用的异常：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>\`\`\` articles <span class="token operator">=</span> restClient<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span>uriBase <span class="token operator">+</span> <span class="token string">&quot;/articles&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">exchange</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">getStatusCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isSameCodeAs</span><span class="token punctuation">(</span><span class="token class-name">HttpStatusCode</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">204</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ArticleNotFoundException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">getStatusCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isSameCodeAs</span><span class="token punctuation">(</span><span class="token class-name">HttpStatusCode</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> objectMapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">TypeReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">InvalidArticleResponseException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为我们在这里使用原始响应，我们还需要使用 <em>ObjectMapper</em> 自己反序列化响应体。</p><h2 id="_6-错误处理" tabindex="-1"><a class="header-anchor" href="#_6-错误处理"><span>6. 错误处理</span></a></h2><p>默认情况下，当 <em>RestClient</em> 在 HTTP 响应中遇到 4xx 或 5xx 状态代码时，它会抛出一个 <em>RestClientException</em> 的子类异常。<strong>我们可以通过实现我们的状态处理器来覆盖这种行为。</strong></p><p>让我们编写一个当我们找不到文章时抛出自定义异常的状态处理器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Article</span> article <span class="token operator">=</span> restClient<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span>uriBase <span class="token operator">+</span> <span class="token string">&quot;/articles/1234&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">retrieve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">onStatus</span><span class="token punctuation">(</span>status <span class="token operator">-&gt;</span> status<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">404</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ArticleNotFoundException</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token class-name">Article</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-从-resttemplate-构建-restclient" tabindex="-1"><a class="header-anchor" href="#_7-从-resttemplate-构建-restclient"><span>7. 从 <em>RestTemplate</em> 构建 <em>RestClient</em></span></a></h2><p><em>RestClient</em> 是 <em>RestTemplate</em> 的继任者，在旧的代码库中，我们很可能会碰到使用 <em>RestTemplate</em> 的实现。</p><p>幸运的是，使用旧的 <em>RestTemplate</em> 配置创建一个 <em>RestClient</em> 实例非常简单：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">RestTemplate</span> oldRestTemplate<span class="token punctuation">;</span>
<span class="token class-name">RestClient</span> restClient <span class="token operator">=</span> <span class="token class-name">RestClient</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>oldRestTemplate<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们重点关注了 <em>RestClient</em> 类，它是 <em>RestTemplate</em> 的后继者，作为一个同步 HTTP 客户端。我们学习了如何使用它的流畅 API 来处理简单和复杂的用例。接下来，我们开始汇总所有 HTTP 方法，然后继续讨论响应序列化和错误处理主题。</p><p>像往常一样，所有的代码示例都可以在 GitHub 上找到。</p>`,55),o=[p];function c(l,i){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-28-A Guide to RestClient in Spring Boot.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-A%20Guide%20to%20RestClient%20in%20Spring%20Boot.html","title":"Spring Boot 中的 RestClient 指南","lang":"zh-CN","frontmatter":{"date":"2024-06-28T00:00:00.000Z","category":["Spring Boot","RestClient"],"tag":["Spring Framework","HTTP Client"],"head":[["meta",{"name":"keywords","content":"RestClient, Spring Boot, HTTP Client, REST API"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-A%20Guide%20to%20RestClient%20in%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Boot 中的 RestClient 指南"}],["meta",{"property":"og:description","content":"Spring Boot 中的 RestClient 指南 1. 引言 RestClient 是 Spring Framework 6.1 M2 中引入的同步 HTTP 客户端，它取代了 RestTemplate。同步 HTTP 客户端以阻塞方式发送和接收 HTTP 请求和响应，这意味着它在继续下一个请求之前会等待每个请求完成。 在本教程中，我们将探讨 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T13:30:10.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Framework"}],["meta",{"property":"article:tag","content":"HTTP Client"}],["meta",{"property":"article:published_time","content":"2024-06-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T13:30:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot 中的 RestClient 指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T13:30:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Boot 中的 RestClient 指南 1. 引言 RestClient 是 Spring Framework 6.1 M2 中引入的同步 HTTP 客户端，它取代了 RestTemplate。同步 HTTP 客户端以阻塞方式发送和接收 HTTP 请求和响应，这意味着它在继续下一个请求之前会等待每个请求完成。 在本教程中，我们将探讨 ..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. RestClient 与 RestTemplate","slug":"_2-restclient-与-resttemplate","link":"#_2-restclient-与-resttemplate","children":[]},{"level":2,"title":"3. 使用 HTTP 请求方法进行简单获取","slug":"_3-使用-http-请求方法进行简单获取","link":"#_3-使用-http-请求方法进行简单获取","children":[{"level":3,"title":"3.1. 使用 GET 检索资源","slug":"_3-1-使用-get-检索资源","link":"#_3-1-使用-get-检索资源","children":[]},{"level":3,"title":"3.2. 使用 POST 创建资源","slug":"_3-2-使用-post-创建资源","link":"#_3-2-使用-post-创建资源","children":[]},{"level":3,"title":"3.3. 使用 PUT 更新资源","slug":"_3-3-使用-put-更新资源","link":"#_3-3-使用-put-更新资源","children":[]},{"level":3,"title":"3.4. 使用 DELETE 删除资源","slug":"_3-4-使用-delete-删除资源","link":"#_3-4-使用-delete-删除资源","children":[]}]},{"level":2,"title":"4. 反序列化响应","slug":"_4-反序列化响应","link":"#_4-反序列化响应","children":[]},{"level":2,"title":"5. 使用 Exchange 解析响应","slug":"_5-使用-exchange-解析响应","link":"#_5-使用-exchange-解析响应","children":[]},{"level":2,"title":"6. 错误处理","slug":"_6-错误处理","link":"#_6-错误处理","children":[]},{"level":2,"title":"7. 从 RestTemplate 构建 RestClient","slug":"_7-从-resttemplate-构建-restclient","link":"#_7-从-resttemplate-构建-restclient","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1719581410000,"updatedTime":1719581410000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.67,"words":1700},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-A Guide to RestClient in Spring Boot.md","localizedDate":"2024年6月28日","excerpt":"\\n<h2>1. 引言</h2>\\n<p><em>RestClient</em> 是 Spring Framework 6.1 M2 中引入的同步 HTTP 客户端，它取代了 <em>RestTemplate</em>。同步 HTTP 客户端以阻塞方式发送和接收 HTTP 请求和响应，这意味着它在继续下一个请求之前会等待每个请求完成。</p>\\n<p>在本教程中，我们将探讨 <em>RestClient</em> 提供了什么，以及它与 <em>RestTemplate</em> 的比较。</p>\\n<h2>2. <em>RestClient</em> 与 <em>RestTemplate</em></h2>","autoDesc":true}');export{k as comp,d as data};
