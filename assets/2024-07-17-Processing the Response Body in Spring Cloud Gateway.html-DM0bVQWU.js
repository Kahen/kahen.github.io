import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CtR6X2Br.js";const e={},p=t(`<hr><h1 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h1><p>在本教程中，我们将探讨如何使用 Spring Cloud Gateway 在将响应体发送回客户端之前对其进行检查和/或修改。</p><h1 id="_2-spring-cloud-gateway-快速回顾" tabindex="-1"><a class="header-anchor" href="#_2-spring-cloud-gateway-快速回顾"><span>2. Spring Cloud Gateway 快速回顾</span></a></h1><p>Spring Cloud Gateway，简称 SCG，是 Spring Cloud 家族的一个子项目，它提供了一个基于反应式 Web 堆栈构建的 API 网关。我们之前已经在早期教程中介绍了其基本用法，因此这里不会再涉及这些方面。</p><p><strong>相反，这次我们将专注于在围绕 API 网关设计解决方案时偶尔会出现的一个特定使用场景：如何在将响应发送回客户端之前处理后端响应有效载荷？</strong></p><p>以下是我们可能需要使用此功能的一些情况：</p><ul><li>在允许后端发展的同时保持与现有客户端的兼容性</li><li>根据像 PCI 或 GDPR 这样的法规要求，屏蔽某些字段</li></ul><p>更具体地说，满足这些要求意味着我们需要实现一个过滤器来处理后端响应。由于过滤器是 SCG 的核心概念，我们所需要做的只是实现一个自定义过滤器，应用所需的转换。</p><p>此外，一旦我们创建了我们的过滤器组件，我们可以将其应用于任何声明的路由。</p><h1 id="_3-实现数据清洗过滤器" tabindex="-1"><a class="header-anchor" href="#_3-实现数据清洗过滤器"><span>3. 实现数据清洗过滤器</span></a></h1><p>为了更好地说明响应体操作的工作原理，让我们创建一个简单的过滤器，用于屏蔽基于 JSON 的响应中的值。例如，给定一个具有名为“ssn”的字段的 JSON：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;ssn&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;123-45-9999&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;account&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;9999888877770000&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们希望用一个固定的值替换它们，从而防止数据泄露：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;ssn&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;****&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;account&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;9999888877770000&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-实现-gatewayfilterfactory" tabindex="-1"><a class="header-anchor" href="#_3-1-实现-gatewayfilterfactory"><span>3.1. 实现 <em>GatewayFilterFactory</em></span></a></h3><p><em>GatewayFilterFactory</em> 顾名思义，是特定时间过滤器的工厂。在启动时，Spring 会查找任何使用 <em>@Component</em> 注解的类，这些类实现了这个接口。然后它会构建一个可用过滤器的注册表，我们可以在声明路由时使用：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> rewrite_with_scrub
        <span class="token key atrule">uri</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>rewrite.backend.uri<span class="token punctuation">:</span>http<span class="token punctuation">:</span>//example.com<span class="token punctuation">}</span>
        <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> Path=/v1/customer/<span class="token important">**</span>
        <span class="token key atrule">filters</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> RewritePath=/v1/customer/(<span class="token punctuation">?</span>\`&lt;segment<span class="token punctuation">&gt;</span>\`.<span class="token important">*)</span><span class="token punctuation">,</span>/api/$\\<span class="token punctuation">{</span>segment<span class="token punctuation">}</span>
        <span class="token punctuation">-</span> ScrubResponse=ssn<span class="token punctuation">,</span><span class="token important">***</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意，当使用基于配置的方法定义路由时，根据 SCG 的预期命名约定命名我们的工厂非常重要</strong>：<em>FilterNameGatewayFilterFactory</em>。考虑到这一点，我们将我们的工厂命名为 <em>ScrubResponseGatewayFilterFactory.</em></p><p>SCG 已经有几个实用类，我们可以使用它们来实现这个工厂。这里，我们将使用一个通常由现成过滤器使用的类：<em>AbstractGatewayFilterFactory<code>&lt;T&gt;</code></em>，这是一个模板基类，其中 T 代表与我们的过滤器实例关联的配置类。在我们的情况下，我们只需要两个配置属性：</p><ul><li><em>fields</em>：用于匹配字段名称的正则表达式</li><li><em>replacement</em>：将替换原始值的字符串</li></ul><p><strong>我们必须实现的关键方法是 <em>apply()</em></strong>。SCG 会为使用我们过滤器的每个路由定义调用此方法。例如，在上述配置中，由于只有一个路由定义，<em>apply()</em> 将只被调用一次。</p><p>在我们的情况下，实现非常简单：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">GatewayFilter</span> <span class="token function">apply</span><span class="token punctuation">(</span><span class="token class-name">Config</span> config<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> modifyResponseBodyFilterFactory
       <span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>c <span class="token operator">-&gt;</span> c<span class="token punctuation">.</span><span class="token function">setRewriteFunction</span><span class="token punctuation">(</span><span class="token class-name">JsonNode</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">JsonNode</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Scrubber</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，它之所以简单，是因为我们使用了另一个内置过滤器 <em>ModifyResponseBodyGatewayFilterFactory</em>，我们将所有与解析和类型转换相关的繁重工作委托给它。我们使用构造函数注入来获取这个工厂的实例，在 <em>apply()</em> 中，我们将创建 <em>GatewayFilter</em> 实例的任务委托给它。</p><p><strong>关键是使用 <em>apply()</em> 方法的变体，它不是接受一个配置对象，而是期望一个配置的 <em>Consumer</em></strong>。同样重要的是，这个配置是 <em>ModifyResponseBodyGatewayFilterFactory</em> 的一个。这个配置对象提供了我们在代码中调用的 <em>setRewriteFunction()</em> 方法。</p><h3 id="_3-2-使用-setrewritefunction" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-setrewritefunction"><span>3.2. 使用 <em>setRewriteFunction()</em></span></a></h3><p>现在，让我们更深入地了解 <em>setRewriteFunction()</em>。</p><p>这个方法接受三个参数：两个类（输入和输出）和一个可以转换输入类型到输出类型的函数。在我们的情况下，我们没有转换类型，因此输入和输出都使用相同的类：<em>JsonNode</em>。这个类来自 Jackson 库，是用于表示 JSON 中不同节点类型（如对象节点、数组节点等）的类层次结构的顶部。使用 <em>JsonNode</em> 作为输入/输出类型允许我们处理任何有效的 JSON 负载，这正是我们想要的。</p><p>对于转换器类，我们传递一个我们的 <em>Scrubber</em> 的实例，它在其 <em>apply()</em> 方法中实现了所需的 <em>RewriteFunction</em> 接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Scrubber</span> <span class="token keyword">implements</span> <span class="token class-name">RewriteFunction</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">JsonNode</span><span class="token punctuation">,</span> <span class="token class-name">JsonNode</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token punctuation">{</span>
    <span class="token comment">// ... 字段和构造函数省略</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Publisher</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">JsonNode</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">apply</span><span class="token punctuation">(</span><span class="token class-name">ServerWebExchange</span> t<span class="token punctuation">,</span> <span class="token class-name">JsonNode</span> u<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Mono</span><span class="token punctuation">.</span><span class="token function">just</span><span class="token punctuation">(</span><span class="token function">scrubRecursively</span><span class="token punctuation">(</span>u<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ... 清洗实现省略</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>apply()</em> 传递的第一个参数是当前的 <em>ServerWebExchange</em>，它为我们提供了到目前为止的请求处理上下文。我们这里不会使用它，但知道我们有这个能力是好的。下一个参数是已经转换为通知的类的接收体。</p><p>预期的返回是一个实例的 <em>Publisher</em>，这些实例是通知的输出类。因此，只要我们不做任何阻塞 I/O 操作，我们可以在重写函数中做一些复杂的工作。</p><h3 id="_3-3-scrubber-实现" tabindex="-1"><a class="header-anchor" href="#_3-3-scrubber-实现"><span>3.3. <em>Scrubber</em> 实现</span></a></h3><p>现在我们知道了重写函数的合同，让我们最终实现我们的清洗逻辑。<strong>这里，我们假设负载相对较小，所以我们不必担心存储接收到的对象的内存需求</strong>。</p><p>它的实现只是递归地遍历所有节点，查找匹配配置模式的属性，并将相应的值替换为掩码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Scrubber</span> <span class="token keyword">implements</span> <span class="token class-name">RewriteFunction</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">JsonNode</span><span class="token punctuation">,</span> <span class="token class-name">JsonNode</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token punctuation">{</span>
    <span class="token comment">// ... 字段和构造函数省略</span>
    <span class="token keyword">private</span> <span class="token class-name">JsonNode</span> <span class="token function">scrubRecursively</span><span class="token punctuation">(</span><span class="token class-name">JsonNode</span> u<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>u<span class="token punctuation">.</span><span class="token function">isContainerNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> u<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>u<span class="token punctuation">.</span><span class="token function">isObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ObjectNode</span> node <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ObjectNode</span><span class="token punctuation">)</span>u<span class="token punctuation">;</span>
            node<span class="token punctuation">.</span><span class="token function">fields</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEachRemaining</span><span class="token punctuation">(</span>f <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>fields<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>f<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> f<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTextual</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    f<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span><span class="token class-name">TextNode</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>replacement<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    f<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span><span class="token function">scrubRecursively</span><span class="token punctuation">(</span>f<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>u<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ArrayNode</span> array <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ArrayNode</span><span class="token punctuation">)</span>u<span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> array<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                array<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token function">scrubRecursively</span><span class="token punctuation">(</span>array<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> u<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_4-测试" tabindex="-1"><a class="header-anchor" href="#_4-测试"><span>4. 测试</span></a></h1><p>我们在示例代码中包含了两个测试：一个简单的单元测试和一个集成测试。第一个只是一个常规的 JUnit 测试，用作对清洗器的健全性检查。<strong>集成测试更有趣，因为它展示了 SCG 开发环境中的有用技术</strong>。</p><p>首先，有一个提供实际后端的问题，可以发送消息。一种可能性是使用像 Postman 或类似工具，这在典型的 CI/CD 场景中会带来一些问题。相反，我们将使用 JDK 的鲜为人知的 <em>HttpServer</em> 类，它实现了一个简单的 HTTP 服务器。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">HttpServer</span> <span class="token function">mockServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">HttpServer</span> server <span class="token operator">=</span> <span class="token class-name">HttpServer</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InetSocketAddress</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    server<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span><span class="token string">&quot;/customer&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>exchange<span class="token punctuation">)</span> <span class="token operator">-&gt;</span>\` <span class="token punctuation">{</span>
        exchange<span class="token punctuation">.</span><span class="token function">getResponseHeaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;application/json&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> response <span class="token operator">=</span> <span class="token constant">JSON_WITH_FIELDS_TO_SCRUB</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        exchange<span class="token punctuation">.</span><span class="token function">sendResponseHeaders</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span>response<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        exchange<span class="token punctuation">.</span><span class="token function">getResponseBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    server<span class="token punctuation">.</span><span class="token function">setExecutor</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    server<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> server<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个服务器将处理 <em>/customer</em> 的请求，并返回我们在测试中使用的固定 JSON 响应。注意返回的服务器已经启动，并将在随机端口监听传入请求。我们还指示服务器创建一个新的默认 <em>Executor</em> 来管理用于处理请求的线程。</p><p>其次，我们以编程方式创建一个包含我们过滤器的路由 <em>@Bean</em>。这相当于使用配置属性构建路由，但允许我们完全控制测试路由的所有方面：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">RouteLocator</span> <span class="token function">scrubSsnRoute</span><span class="token punctuation">(</span>
  <span class="token class-name">RouteLocatorBuilder</span> builder<span class="token punctuation">,</span>
  <span class="token class-name">ScrubResponseGatewayFilterFactory</span> scrubFilterFactory<span class="token punctuation">,</span>
  <span class="token class-name">SetPathGatewayFilterFactory</span> pathFilterFactory<span class="token punctuation">,</span>
  <span class="token class-name">HttpServer</span> server<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> mockServerPort <span class="token operator">=</span> server<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ScrubResponseGatewayFilterFactory<span class="token punctuation">.</span>Config</span> config <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ScrubResponseGatewayFilterFactory<span class="token punctuation">.</span>Config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span>setFields\`\`\`java
    config<span class="token punctuation">.</span><span class="token function">setFields</span><span class="token punctuation">(</span><span class="token string">&quot;ssn&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span><span class="token function">setReplacement</span><span class="token punctuation">(</span><span class="token string">&quot;*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">SetPathGatewayFilterFactory<span class="token punctuation">.</span>Config</span> pathConfig <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SetPathGatewayFilterFactory<span class="token punctuation">.</span>Config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    pathConfig<span class="token punctuation">.</span><span class="token function">setTemplate</span><span class="token punctuation">(</span><span class="token string">&quot;/customer&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> builder<span class="token punctuation">.</span><span class="token function">routes</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">route</span><span class="token punctuation">(</span><span class="token string">&quot;scrub_ssn&quot;</span><span class="token punctuation">,</span>
         r <span class="token operator">-&gt;</span> r<span class="token punctuation">.</span><span class="token function">path</span><span class="token punctuation">(</span><span class="token string">&quot;/scrub&quot;</span><span class="token punctuation">)</span>
           <span class="token punctuation">.</span><span class="token function">filters</span><span class="token punctuation">(</span>
              f <span class="token operator">-&gt;</span> f
                <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>scrubFilterFactory<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>pathFilterFactory<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>pathConfig<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
           <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token string">&quot;http://localhost:&quot;</span> <span class="token operator">+</span> mockServerPort <span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，有了这些 beans 现在成为 <em>@TestConfiguration</em> 的一部分，我们可以将它们注入到实际的测试中，连同 <em>WebTestClient</em>。实际的测试使用这个 <em>WebTestClient</em> 来驱动两者：旋转的 SCG 和后端：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenRequestToScrubRoute_thenResponseScrubbed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    client<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token string">&quot;/scrub&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">exchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">expectStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">is2xxSuccessful</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">expectHeader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">contentType</span><span class="token punctuation">(</span><span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">expectBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token constant">JSON_WITH_SCRUBBED_FIELDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h1><p>在本文中，我们展示了如何使用 Spring Cloud Gateway 库访问后端服务的响应体并对其进行修改。像往常一样，所有代码都可以在 GitHub 上找到。</p>`,48),o=[p];function c(i,u){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-17-Processing the Response Body in Spring Cloud Gateway.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Processing%20the%20Response%20Body%20in%20Spring%20Cloud%20Gateway.html","title":"1. 引言","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Cloud Gateway","Web Development"],"tag":["Spring Cloud Gateway","API Gateway","Response Body Manipulation","Java","Reactive Programming"],"head":[["meta",{"name":"keywords","content":"Spring Cloud Gateway, API Gateway, Response Body Manipulation, Java, Reactive Programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Processing%20the%20Response%20Body%20in%20Spring%20Cloud%20Gateway.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"1. 引言"}],["meta",{"property":"og:description","content":"1. 引言 在本教程中，我们将探讨如何使用 Spring Cloud Gateway 在将响应体发送回客户端之前对其进行检查和/或修改。 2. Spring Cloud Gateway 快速回顾 Spring Cloud Gateway，简称 SCG，是 Spring Cloud 家族的一个子项目，它提供了一个基于反应式 Web 堆栈构建的 API 网..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T13:42:03.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Cloud Gateway"}],["meta",{"property":"article:tag","content":"API Gateway"}],["meta",{"property":"article:tag","content":"Response Body Manipulation"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Reactive Programming"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T13:42:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"1. 引言\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T13:42:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"1. 引言 在本教程中，我们将探讨如何使用 Spring Cloud Gateway 在将响应体发送回客户端之前对其进行检查和/或修改。 2. Spring Cloud Gateway 快速回顾 Spring Cloud Gateway，简称 SCG，是 Spring Cloud 家族的一个子项目，它提供了一个基于反应式 Web 堆栈构建的 API 网..."},"headers":[{"level":3,"title":"3.1. 实现 GatewayFilterFactory","slug":"_3-1-实现-gatewayfilterfactory","link":"#_3-1-实现-gatewayfilterfactory","children":[]},{"level":3,"title":"3.2. 使用 setRewriteFunction()","slug":"_3-2-使用-setrewritefunction","link":"#_3-2-使用-setrewritefunction","children":[]},{"level":3,"title":"3.3. Scrubber 实现","slug":"_3-3-scrubber-实现","link":"#_3-3-scrubber-实现","children":[]}],"git":{"createdTime":1721223723000,"updatedTime":1721223723000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.96,"words":2088},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Processing the Response Body in Spring Cloud Gateway.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>1. 引言</h1>\\n<p>在本教程中，我们将探讨如何使用 Spring Cloud Gateway 在将响应体发送回客户端之前对其进行检查和/或修改。</p>\\n<h1>2. Spring Cloud Gateway 快速回顾</h1>\\n<p>Spring Cloud Gateway，简称 SCG，是 Spring Cloud 家族的一个子项目，它提供了一个基于反应式 Web 堆栈构建的 API 网关。我们之前已经在早期教程中介绍了其基本用法，因此这里不会再涉及这些方面。</p>\\n<p><strong>相反，这次我们将专注于在围绕 API 网关设计解决方案时偶尔会出现的一个特定使用场景：如何在将响应发送回客户端之前处理后端响应有效载荷？</strong></p>","autoDesc":true}');export{k as comp,d as data};
