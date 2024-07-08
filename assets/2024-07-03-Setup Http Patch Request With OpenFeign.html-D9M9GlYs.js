import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-2zDpbLgD.js";const e={},p=t('<hr><h1 id="使用openfeign设置http-patch请求" tabindex="-1"><a class="header-anchor" href="#使用openfeign设置http-patch请求"><span>使用OpenFeign设置HTTP PATCH请求</span></a></h1><p>当通过REST API更新对象时，使用PATCH方法是一个好习惯。这允许我们使用我们希望更改的字段进行部分更新。当现有的资源需要完全更改时，我们也可以使用方法PUT。</p><p>在本教程中，我们将学习如何在OpenFeign中设置HTTP PATCH方法。我们还将看到在测试Feign客户端的PATCH方法时出现的一个意外错误。最后，我们将理解根本原因并解决问题。</p><h2 id="_2-spring-boot示例应用程序" tabindex="-1"><a class="header-anchor" href="#_2-spring-boot示例应用程序"><span>2. Spring Boot示例应用程序</span></a></h2><p>让我们想象我们需要构建一个简单的微服务，该服务调用下游服务进行部分更新。</p><h3 id="_2-1-maven依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-maven依赖项"><span>2.1. Maven依赖项</span></a></h3><p>首先，我们将添加spring-boot-starter-web和spring-cloud-starter-openfeign依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````org.springframework.boot````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````spring-boot-starter-web````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````org.springframework.cloud````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````spring-cloud-starter-openfeign````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-实现feign客户端" tabindex="-1"><a class="header-anchor" href="#_2-2-实现feign客户端"><span>2.2. 实现Feign客户端</span></a></h3><p>现在，让我们使用Spring Web注解在Feign中实现PATCH方法。</p><p>首先，让我们用一些属性对_User_类进行建模：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> userId<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> userName<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将实现_UserClient接口_和_updateUser_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;user-client&quot;</span><span class="token punctuation">,</span> url <span class="token operator">=</span> <span class="token string">&quot;http://localhost:8082/api/user&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserClient</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;{userId}&quot;</span><span class="token punctuation">,</span> method <span class="token operator">=</span> <span class="token class-name">RequestMethod</span><span class="token punctuation">.</span><span class="token constant">PATCH</span><span class="token punctuation">)</span>\n    <span class="token class-name">User</span> <span class="token function">updateUser</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;userId&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> userId<span class="token punctuation">,</span> <span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的PATCH方法中，我们传递了带有仅需要更新的字段的_User_对象以及_userId_字段。这比发送整个资源表示要简单一些，节省了一些网络带宽，并避免了当多个更新针对同一对象的不同字段时的冲突。</p><p>相反，如果我们使用PUT请求，我们将不得不传递完整的资源表示来替换现有资源。</p><h2 id="_3-实现feign客户端的测试" tabindex="-1"><a class="header-anchor" href="#_3-实现feign客户端的测试"><span>3. 实现Feign客户端的测试</span></a></h2><p>现在，让我们通过模拟HTTP调用来实现_UserClient_的测试用例。</p><h3 id="_3-1-设置wiremock服务器" tabindex="-1"><a class="header-anchor" href="#_3-1-设置wiremock服务器"><span>3.1. 设置WireMock服务器</span></a></h3><p>为了进行实验，我们需要使用模拟框架来模拟我们正在调用的服务。</p><p>首先，让我们包括_WireMockServer_ Maven依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````com.github.tomakehurst````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````wiremock-jre8````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`2.35.0`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>`test`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>`\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们配置并启动_WireMockServer_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">WireMockServer</span> wireMockServer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WireMockServer</span><span class="token punctuation">(</span><span class="token number">8082</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">configureFor</span><span class="token punctuation">(</span><span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span> <span class="token number">8082</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nwireMockServer<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_WireMockServer_在Feign客户端配置使用的相同_host_和_port_上启动。</p><h3 id="_3-2-模拟patch-api" tabindex="-1"><a class="header-anchor" href="#_3-2-模拟patch-api"><span>3.2. 模拟PATCH API</span></a></h3><p>我们将模拟PATCH方法以测试更新_User_ API：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> updatedUserResponse <span class="token operator">=</span> <span class="token string">&quot;{\\n&quot;</span> <span class="token operator">+</span>\n    <span class="token string">&quot;\\&quot;userId\\&quot;: 100001,\\n&quot;</span> <span class="token operator">+</span>\n    <span class="token string">&quot;\\&quot;userName\\&quot;: \\&quot;name\\&quot;,\\n&quot;</span> <span class="token operator">+</span>\n    <span class="token string">&quot;\\&quot;email\\&quot;: \\&quot;updated-email@mail.in\\&quot;\\n&quot;</span> <span class="token operator">+</span>\n<span class="token string">&quot;}&quot;</span><span class="token punctuation">;</span>\n<span class="token function">stubFor</span><span class="token punctuation">(</span><span class="token function">patch</span><span class="token punctuation">(</span><span class="token function">urlEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;/api/user/&quot;</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token constant">USER_ID</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">willReturn</span><span class="token punctuation">(</span><span class="token function">aResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">OK</span><span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">withHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;application/json&quot;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">withBody</span><span class="token punctuation">(</span>updatedUserResponse<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-测试patch请求" tabindex="-1"><a class="header-anchor" href="#_3-3-测试patch请求"><span>3.3. 测试PATCH请求</span></a></h3><p>为了测试，我们将带有需要更新的字段的_User_对象传递给_UserClient_。</p><p>现在，让我们完成测试并验证更新功能：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nuser<span class="token punctuation">.</span><span class="token function">setUserId</span><span class="token punctuation">(</span><span class="token string">&quot;100001&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nuser<span class="token punctuation">.</span><span class="token function">setEmail</span><span class="token punctuation">(</span><span class="token string">&quot;updated-email@mail.in&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">User</span> updatedUser <span class="token operator">=</span> userClient<span class="token punctuation">.</span><span class="token function">updateUser</span><span class="token punctuation">(</span><span class="token string">&quot;100001&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertEquals</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getUserId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> updatedUser<span class="token punctuation">.</span><span class="token function">getUserId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> updatedUser<span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>预期上述测试应该通过。相反，我们将从Feign客户端收到一个意外的错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">feign<span class="token punctuation">.</span></span>RetryableException</span><span class="token operator">:</span> <span class="token class-name">Invalid</span> <span class="token constant">HTTP</span> method<span class="token operator">:</span> <span class="token constant">PATCH</span> executing <span class="token constant">PATCH</span> http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>localhost<span class="token operator">:</span><span class="token number">8082</span><span class="token operator">/</span>api<span class="token operator">/</span>user<span class="token operator">/</span><span class="token number">100001</span>\n    at <span class="token class-name"><span class="token namespace">feign<span class="token punctuation">.</span></span>FeignException</span><span class="token punctuation">.</span><span class="token function">errorExecuting</span><span class="token punctuation">(</span><span class="token class-name">FeignException</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">268</span><span class="token punctuation">)</span>\n    at <span class="token class-name"><span class="token namespace">feign<span class="token punctuation">.</span></span>SynchronousMethodHandler</span><span class="token punctuation">.</span><span class="token function">executeAndDecode</span><span class="token punctuation">(</span><span class="token class-name">SynchronousMethodHandler</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">131</span><span class="token punctuation">)</span>\n    at <span class="token class-name"><span class="token namespace">feign<span class="token punctuation">.</span></span>SynchronousMethodHandler</span><span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token class-name">SynchronousMethodHandler</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">91</span><span class="token punctuation">)</span>\n    at <span class="token class-name"><span class="token namespace">feign<span class="token punctuation">.</span></span>ReflectiveFeign</span>$<span class="token class-name">FeignInvocationHandler</span><span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token class-name">ReflectiveFeign</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">100</span><span class="token punctuation">)</span>\n    at jdk<span class="token punctuation">.</span>proxy2<span class="token operator">/</span>jdk<span class="token punctuation">.</span>proxy2<span class="token punctuation">.</span>$<span class="token class-name">Proxy80</span><span class="token punctuation">.</span><span class="token function">updateUser</span><span class="token punctuation">(</span><span class="token class-name">Unknown</span> <span class="token class-name">Source</span><span class="token punctuation">)</span>\n    at <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span>openfeign<span class="token punctuation">.</span>patcherror<span class="token punctuation">.</span>client<span class="token punctuation">.</span></span>UserClientUnitTest</span><span class="token punctuation">.</span><span class="token function">givenUserExistsAndIsValid_whenUpdateUserCalled_thenReturnSuccess</span><span class="token punctuation">(</span><span class="token class-name">UserClientUnitTest</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">64</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们详细调查错误。</p><h3 id="_3-4-无效http方法错误的原因" tabindex="-1"><a class="header-anchor" href="#_3-4-无效http方法错误的原因"><span>3.4. 无效HTTP方法错误的原因</span></a></h3><p>上述错误消息**表明请求的HTTP方法是无效的。**尽管根据HTTP标准，PATCH方法是有效的。</p><p>我们将从错误消息中看到，它是由_ProtocolException_类引起的，并从_HttpURLConnection_类传播：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Caused</span> by<span class="token operator">:</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>net<span class="token punctuation">.</span></span>ProtocolException</span><span class="token operator">:</span> <span class="token class-name">Invalid</span> <span class="token constant">HTTP</span> method<span class="token operator">:</span> <span class="token constant">PATCH</span>\n    at java<span class="token punctuation">.</span>base<span class="token operator">/</span><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>net<span class="token punctuation">.</span></span>HttpURLConnection</span><span class="token punctuation">.</span><span class="token function">setRequestMethod</span><span class="token punctuation">(</span><span class="token class-name">HttpURLConnection</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">489</span><span class="token punctuation">)</span>\n    at java<span class="token punctuation">.</span>base<span class="token operator">/</span><span class="token class-name"><span class="token namespace">sun<span class="token punctuation">.</span>net<span class="token punctuation">.</span>www<span class="token punctuation">.</span>protocol<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span>HttpURLConnection</span><span class="token punctuation">.</span><span class="token function">setRequestMethod</span><span class="token punctuation">(</span><span class="token class-name">HttpURLConnection</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">598</span><span class="token punctuation">)</span>\n    at <span class="token class-name"><span class="token namespace">feign<span class="token punctuation">.</span></span>Client</span>$<span class="token class-name">Default</span><span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span><span class="token class-name">Client</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">170</span><span class="token punctuation">)</span>\n    at <span class="token class-name"><span class="token namespace">feign<span class="token punctuation">.</span></span>Client</span>$<span class="token class-name">Default</span><span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">Client</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">104</span><span class="token punctuation">)</span>\n    at <span class="token class-name"><span class="token namespace">feign<span class="token punctuation">.</span></span>SynchronousMethodHandler</span><span class="token punctuation">.</span><span class="token function">executeAndDecode</span><span class="token punctuation">(</span><span class="token class-name">SynchronousMethodHandler</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">119</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>事实证明，默认的HTTP客户端使用_HttpURLConnection_类来建立HTTP连接。_HttpURLConnection_类有一个_setRequestMethod_方法来设置请求方法。</p><p>不幸的是，<strong>_HttpURLConnection_类不将PATCH方法识别为有效类型。</strong></p><h2 id="_4-修复patch方法错误" tabindex="-1"><a class="header-anchor" href="#_4-修复patch方法错误"><span>4. 修复PATCH方法错误</span></a></h2><p>为了修复错误，我们将添加一个支持的HTTP客户端依赖项。我们还将通过添加配置来覆盖默认的HTTP客户端。</p><h3 id="_4-1-添加-okhttpclient-依赖项" tabindex="-1"><a class="header-anchor" href="#_4-1-添加-okhttpclient-依赖项"><span>4.1. 添加_OkHttpClient_依赖项</span></a></h3><p>让我们包括_feign-okhttp_依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````io.github.openfeign````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````feign-okhttp````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意到，任何其他支持的HTTP客户端，如_ApacheHttpClient_，也将起作用。</p><h3 id="_4-2-启用-okhttpclient" tabindex="-1"><a class="header-anchor" href="#_4-2-启用-okhttpclient"><span>4.2. 启用_OkHttpClient_</span></a></h3><p>_OkHttpClient_类将PATCH方法视为有效类型，不会抛出任何异常。</p><p>让我们使用以下配置启用_OkHttpClient_类：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">feign.okhttp.enabled</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，我们将重新运行测试并验证PATCH方法是否有效。现在，我们没有从Feign客户端收到任何错误：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>UserClientUnitTest.givenUserExistsAndIsValid_whenUpdateUserCalled_thenReturnSuccess: 1 total, 1 passed\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何在OpenFeign中使用PATCH方法。我们还看到了测试时出现的意外错误，并理解了根本原因。</p><p>我们还使用_OkHttpClient_实现修复了问题。</p><p>如常，示例代码可以在GitHub上找到。</p>',58),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-03-Setup Http Patch Request With OpenFeign.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Setup%20Http%20Patch%20Request%20With%20OpenFeign.html","title":"使用OpenFeign设置HTTP PATCH请求","lang":"zh-CN","frontmatter":{"date":"2024-07-03T00:00:00.000Z","category":["Spring Boot","OpenFeign"],"tag":["HTTP PATCH","REST API"],"head":[["meta",{"name":"keywords","content":"OpenFeign, HTTP PATCH, REST API, Spring Boot, Microservice"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Setup%20Http%20Patch%20Request%20With%20OpenFeign.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用OpenFeign设置HTTP PATCH请求"}],["meta",{"property":"og:description","content":"使用OpenFeign设置HTTP PATCH请求 当通过REST API更新对象时，使用PATCH方法是一个好习惯。这允许我们使用我们希望更改的字段进行部分更新。当现有的资源需要完全更改时，我们也可以使用方法PUT。 在本教程中，我们将学习如何在OpenFeign中设置HTTP PATCH方法。我们还将看到在测试Feign客户端的PATCH方法时出现..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T09:55:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"HTTP PATCH"}],["meta",{"property":"article:tag","content":"REST API"}],["meta",{"property":"article:published_time","content":"2024-07-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T09:55:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用OpenFeign设置HTTP PATCH请求\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-03T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T09:55:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用OpenFeign设置HTTP PATCH请求 当通过REST API更新对象时，使用PATCH方法是一个好习惯。这允许我们使用我们希望更改的字段进行部分更新。当现有的资源需要完全更改时，我们也可以使用方法PUT。 在本教程中，我们将学习如何在OpenFeign中设置HTTP PATCH方法。我们还将看到在测试Feign客户端的PATCH方法时出现..."},"headers":[{"level":2,"title":"2. Spring Boot示例应用程序","slug":"_2-spring-boot示例应用程序","link":"#_2-spring-boot示例应用程序","children":[{"level":3,"title":"2.1. Maven依赖项","slug":"_2-1-maven依赖项","link":"#_2-1-maven依赖项","children":[]},{"level":3,"title":"2.2. 实现Feign客户端","slug":"_2-2-实现feign客户端","link":"#_2-2-实现feign客户端","children":[]}]},{"level":2,"title":"3. 实现Feign客户端的测试","slug":"_3-实现feign客户端的测试","link":"#_3-实现feign客户端的测试","children":[{"level":3,"title":"3.1. 设置WireMock服务器","slug":"_3-1-设置wiremock服务器","link":"#_3-1-设置wiremock服务器","children":[]},{"level":3,"title":"3.2. 模拟PATCH API","slug":"_3-2-模拟patch-api","link":"#_3-2-模拟patch-api","children":[]},{"level":3,"title":"3.3. 测试PATCH请求","slug":"_3-3-测试patch请求","link":"#_3-3-测试patch请求","children":[]},{"level":3,"title":"3.4. 无效HTTP方法错误的原因","slug":"_3-4-无效http方法错误的原因","link":"#_3-4-无效http方法错误的原因","children":[]}]},{"level":2,"title":"4. 修复PATCH方法错误","slug":"_4-修复patch方法错误","link":"#_4-修复patch方法错误","children":[{"level":3,"title":"4.1. 添加_OkHttpClient_依赖项","slug":"_4-1-添加-okhttpclient-依赖项","link":"#_4-1-添加-okhttpclient-依赖项","children":[]},{"level":3,"title":"4.2. 启用_OkHttpClient_","slug":"_4-2-启用-okhttpclient","link":"#_4-2-启用-okhttpclient","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720000522000,"updatedTime":1720000522000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.03,"words":1208},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Setup Http Patch Request With OpenFeign.md","localizedDate":"2024年7月3日","excerpt":"<hr>\\n<h1>使用OpenFeign设置HTTP PATCH请求</h1>\\n<p>当通过REST API更新对象时，使用PATCH方法是一个好习惯。这允许我们使用我们希望更改的字段进行部分更新。当现有的资源需要完全更改时，我们也可以使用方法PUT。</p>\\n<p>在本教程中，我们将学习如何在OpenFeign中设置HTTP PATCH方法。我们还将看到在测试Feign客户端的PATCH方法时出现的一个意外错误。最后，我们将理解根本原因并解决问题。</p>\\n<h2>2. Spring Boot示例应用程序</h2>\\n<p>让我们想象我们需要构建一个简单的微服务，该服务调用下游服务进行部分更新。</p>","autoDesc":true}');export{k as comp,d as data};
