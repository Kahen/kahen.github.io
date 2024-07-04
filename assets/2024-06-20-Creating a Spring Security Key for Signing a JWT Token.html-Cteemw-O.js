import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BOJj4F50.js";const p={},e=t('<h1 id="创建用于签名jwt令牌的spring-security密钥" tabindex="-1"><a class="header-anchor" href="#创建用于签名jwt令牌的spring-security密钥"><span>创建用于签名JWT令牌的Spring Security密钥</span></a></h1><p>如果您正在使用Spring Security（尤其是OAuth）实现，一定要查看《学习Spring安全》课程。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>JSON Web Tokens（JWT）是保护无状态应用程序的事实标准。Spring Security框架提供了将JWT集成以保护REST API的方法。生成令牌的一个关键过程是应用签名以保证真实性。</p><p>在本教程中，我们将探索一个使用JWT认证的无状态Spring Boot应用程序。我们将设置必要的组件并创建一个加密的_SecretKey_实例来签名和验证JWT。</p><h2 id="_2-项目设置" tabindex="-1"><a class="header-anchor" href="#_2-项目设置"><span>2. 项目设置</span></a></h2><p>首先，让我们使用Spring Security和JWT令牌来引导一个无状态的Spring Boot应用程序。<strong>值得注意的是，为了简单和简洁，我们不会展示完整的设置代码。</strong></p><h3 id="_2-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_2-1-maven依赖"><span>2.1. Maven依赖</span></a></h3><p>首先，让我们在_pom.xml_中添加_spring-boot-starter-web_, <em>spring-boot-starter-security</em>, <em>spring-boot-starter-data-jpa</em>, 和_h2_数据库依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```````org.springframework.boot```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```````spring-boot-starter-web```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```````3.2.3```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```````org.springframework.boot```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```````spring-boot-starter-security```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```````3.2.3```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```````org.springframework.boot```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```````spring-boot-starter-data-jpa```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```````3.2.3```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```````com.h2database```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```````h2```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```````2.2.224```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Spring Boot Starter Web提供了构建REST API的API。此外，Spring Boot Starter Security依赖有助于提供认证和授权。我们添加了一个内存数据库，以便快速原型设计。</p><p>接下来，让我们在_pom.xml_中添加_jjwt-api_, <em>jjwt-impl</em> 和 _jjwt-jackson_依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```````io.jsonwebtoken```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```````jjwt-api```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```````0.12.5```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```````io.jsonwebtoken```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```````jjwt-impl```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```````0.12.5```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```````io.jsonwebtoken```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```````jjwt-jackson```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```````0.12.5```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些依赖提供了生成和签名JWT的API，并将其集成到Spring Security中。</p><h3 id="_2-2-jwt配置" tabindex="-1"><a class="header-anchor" href="#_2-2-jwt配置"><span>2.2. JWT配置</span></a></h3><p>首先，让我们创建一个认证入口点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>\n<span class="token keyword">class</span> <span class="token class-name">AuthEntryPointJwt</span> <span class="token keyword">implements</span> <span class="token class-name">AuthenticationEntryPoint</span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个类来处理使用JWT认证的Spring Security应用程序中的授权访问尝试。它充当守门人，确保只有具有有效访问权限的用户才能访问受保护的资源。</p><p>然后，让我们创建一个名为_AuthTokenFilter_的类，该类拦截传入的请求，验证JWT令牌，并在存在有效令牌时对用户进行身份验证：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">AuthTokenFilter</span> <span class="token keyword">extends</span> <span class="token class-name">OncePerRequestFilter</span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们创建_JwtUtil_类，它提供创建和验证令牌的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>\n<span class="token keyword">class</span> <span class="token class-name">JwtUtils</span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个类包含了使用_signWith()_方法的逻辑。</p><h3 id="_2-3-安全配置" tabindex="-1"><a class="header-anchor" href="#_2-3-安全配置"><span>2.3. 安全配置</span></a></h3><p>最后，让我们定义_SecurityConfiguration_类并集成JWT：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>\n<span class="token annotation punctuation">@EnableWebSecurity</span>\n<span class="token annotation punctuation">@EnableMethodSecurity</span>\n<span class="token keyword">class</span> <span class="token class-name">SecurityConfiguration</span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n\n    <span class="token annotation punctuation">@Bean</span>\n    <span class="token class-name">SecurityFilterChain</span> <span class="token function">securityFilterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n        http<span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span><span class="token class-name">AbstractHttpConfigurer</span><span class="token operator">::</span><span class="token function">disable</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">cors</span><span class="token punctuation">(</span><span class="token class-name">AbstractHttpConfigurer</span><span class="token operator">::</span><span class="token function">disable</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span>req <span class="token operator">-&gt;</span> req<span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span><span class="token constant">WHITE_LIST_URL</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">exceptionHandling</span><span class="token punctuation">(</span>ex <span class="token operator">-&gt;</span> ex<span class="token punctuation">.</span><span class="token function">authenticationEntryPoint</span><span class="token punctuation">(</span>unauthorizedHandler<span class="token punctuation">)</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">sessionManagement</span><span class="token punctuation">(</span>session <span class="token operator">-&gt;</span> session<span class="token punctuation">.</span><span class="token function">sessionCreationPolicy</span><span class="token punctuation">(</span><span class="token constant">STATELESS</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">authenticationProvider</span><span class="token punctuation">(</span><span class="token function">authenticationProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">addFilterBefore</span><span class="token punctuation">(</span>\n              <span class="token function">authenticationJwtTokenFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n              <span class="token class-name">UsernamePasswordAuthenticationFilter</span><span class="token punctuation">.</span><span class="token keyword">class</span>\n          <span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们集成了JWT入口点和过滤器以激活JWT认证。</p><h2 id="_3-signwith-方法" tabindex="-1"><a class="header-anchor" href="#_3-signwith-方法"><span>3. _signWith()_方法</span></a></h2><p><strong>JJWT库提供了一个_signWith()_方法，帮助使用特定的加密算法和密钥对JWT进行签名。</strong> 这个签名过程对于确保JWT的完整性和真实性至关重要。</p><p>_signWith()_方法接受_Key_或_SecretKey_实例和签名算法作为参数。<strong>基于哈希的消息认证码（HMAC）算法是最常用的签名算法之一。</strong></p><p>重要的是，该方法需要一个密钥，通常是一个字节数组，用于签名过程。我们可以使用_Key_或_SecretKey_实例将密钥字符串转换为密钥。</p><p><strong>值得注意的是，我们可以将一个普通字符串作为密钥。然而，这缺乏加密_Key_或_SecretKey_实例的安全性和随机性。</strong></p><p>使用_SecretKey_实例确保了JWT的完整性和真实性。</p><p>我们可以使用_Key_和_SecretKey_实例创建一个强大的密钥来签名JWT。</p><h3 id="_4-1-使用-key-实例" tabindex="-1"><a class="header-anchor" href="#_4-1-使用-key-实例"><span>4.1. 使用_Key_实例</span></a></h3><p>本质上，我们可以将密钥字符串转换为_Key_实例，然后使用它来进一步加密它，然后再用它来签名JWT。</p><p>首先，让我们确保密钥字符串是Base64编码的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">String</span> jwtSecret <span class="token operator">=</span> <span class="token string">&quot;4261656C64756E67&quot;</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们创建一个_Key_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">Key</span> <span class="token function">getSigningKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> keyBytes <span class="token operator">=</span> <span class="token class-name">Decoders</span><span class="token punctuation">.</span><span class="token constant">BASE64</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>jwtSecret<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token class-name">Keys</span><span class="token punctuation">.</span><span class="token function">hmacShaKeyFor</span><span class="token punctuation">(</span>keyBytes<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们将_jwtSecret_解码为一个字节数组。接下来，我们调用接受_keyBytes_作为参数的_hmacShaKeyFor()_，它在_Keys_实例上生成一个基于HMAC算法的密钥。</p><p>如果密钥不是Base64编码的，我们可以在普通字符串上调用_getByte()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">Key</span> <span class="token function">getSigningKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> keyBytes <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>jwtSecret<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token class-name">Keys</span><span class="token punctuation">.</span><span class="token function">hmacShaKeyFor</span><span class="token punctuation">(</span>keyBytes<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，这是不推荐的，因为密钥可能格式不良，字符串可能包含非UTF-8字符。因此，我们必须确保在从它生成密钥之前，密钥字符串是Base64编码的。</p><h3 id="_4-2-使用-secretkey-实例" tabindex="-1"><a class="header-anchor" href="#_4-2-使用-secretkey-实例"><span>4.2. 使用_SecretKey_实例</span></a></h3><p>同样，我们可以使用HMAC-SHA算法创建一个_SecretKey_实例来形成一个强大的密钥。让我们创建一个返回密钥的_SecretKey_实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">SecretKey</span> <span class="token function">getSigningKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token constant">SIG</span><span class="token punctuation">.</span><span class="token constant">HS256</span><span class="token punctuation">.</span><span class="token function">key</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们直接使用HMAC-SHA算法而不使用字节数组。这形成了一个强大的签名密钥。接下来，我们可以通过将_getSigningKey()_作为参数来更新_signWith()_方法。</p><p>或者，我们可以从一个Base16编码的字符串创建一个_SecretKey_实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">SecretKey</span> <span class="token function">getSigningKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> keyBytes <span class="token operator">=</span> <span class="token class-name">Decoders</span><span class="token punctuation">.</span><span class="token constant">BASE64</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>jwtSecret<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token class-name">Keys</span><span class="token punctuation">.</span><span class="token function">hmacShaKeyFor</span><span class="token punctuation">(</span>keyBytes<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这生成了一个强大的_SecretKey_类型来签名和验证JWT。</p><p><strong>值得注意的是，使用_SecretKey_实例而不是_Key_实例是可取的，因为新的名为_verifyWith()_的方法来验证令牌接受_SecretKey_类型作为参数。</strong></p><h3 id="_4-3-应用密钥" tabindex="-1"><a class="header-anchor" href="#_4-3-应用密钥"><span>4.3. 应用密钥</span></a></h3><p>现在，让我们将密钥应用于签名我们应用程序的JWT：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">generateJwtToken</span><span class="token punctuation">(</span><span class="token class-name">Authentication</span> authentication<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">UserDetailsImpl</span> userPrincipal <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">UserDetailsImpl</span><span class="token punctuation">)</span> authentication<span class="token punctuation">.</span><span class="token function">getPrincipal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">subject</span><span class="token punctuation">(</span><span class="token punctuation">(</span>userPrincipal<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">issuedAt</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">expiration</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> jwtExpirationMs<span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">signWith</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">compact</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_signWith()_方法以_SecretKey_实例作为参数，为令牌附加一个独特的签名。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何使用Java Key和SecretKey实例创建密钥。我们还看到了一个使用JWT令牌进行令牌完整性的无状态Spring Boot应用程序，并应用了_Key_或_SecretKey_实例来签名和验证它。使用普通字符串已不再推荐。</p><p>一如既往，示例代码的完整源代码可在GitHub上获得。</p>',59),c=[e];function o(i,l){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","2024-06-20-Creating a Spring Security Key for Signing a JWT Token.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Creating%20a%20Spring%20Security%20Key%20for%20Signing%20a%20JWT%20Token.html","title":"创建用于签名JWT令牌的Spring Security密钥","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Spring Security","JWT"],"tag":["Spring","Security","JWT","Token"],"head":[["meta",{"name":"keywords","content":"Spring Security, JWT, Token Signing, Authentication"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Creating%20a%20Spring%20Security%20Key%20for%20Signing%20a%20JWT%20Token.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"创建用于签名JWT令牌的Spring Security密钥"}],["meta",{"property":"og:description","content":"创建用于签名JWT令牌的Spring Security密钥 如果您正在使用Spring Security（尤其是OAuth）实现，一定要查看《学习Spring安全》课程。 1. 概述 JSON Web Tokens（JWT）是保护无状态应用程序的事实标准。Spring Security框架提供了将JWT集成以保护REST API的方法。生成令牌的一个关..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:tag","content":"Security"}],["meta",{"property":"article:tag","content":"JWT"}],["meta",{"property":"article:tag","content":"Token"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"创建用于签名JWT令牌的Spring Security密钥\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"创建用于签名JWT令牌的Spring Security密钥 如果您正在使用Spring Security（尤其是OAuth）实现，一定要查看《学习Spring安全》课程。 1. 概述 JSON Web Tokens（JWT）是保护无状态应用程序的事实标准。Spring Security框架提供了将JWT集成以保护REST API的方法。生成令牌的一个关..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 项目设置","slug":"_2-项目设置","link":"#_2-项目设置","children":[{"level":3,"title":"2.1. Maven依赖","slug":"_2-1-maven依赖","link":"#_2-1-maven依赖","children":[]},{"level":3,"title":"2.2. JWT配置","slug":"_2-2-jwt配置","link":"#_2-2-jwt配置","children":[]},{"level":3,"title":"2.3. 安全配置","slug":"_2-3-安全配置","link":"#_2-3-安全配置","children":[]}]},{"level":2,"title":"3. _signWith()_方法","slug":"_3-signwith-方法","link":"#_3-signwith-方法","children":[{"level":3,"title":"4.1. 使用_Key_实例","slug":"_4-1-使用-key-实例","link":"#_4-1-使用-key-实例","children":[]},{"level":3,"title":"4.2. 使用_SecretKey_实例","slug":"_4-2-使用-secretkey-实例","link":"#_4-2-使用-secretkey-实例","children":[]},{"level":3,"title":"4.3. 应用密钥","slug":"_4-3-应用密钥","link":"#_4-3-应用密钥","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.36,"words":1608},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Creating a Spring Security Key for Signing a JWT Token.md","localizedDate":"2024年6月21日","excerpt":"\\n<p>如果您正在使用Spring Security（尤其是OAuth）实现，一定要查看《学习Spring安全》课程。</p>\\n<h2>1. 概述</h2>\\n<p>JSON Web Tokens（JWT）是保护无状态应用程序的事实标准。Spring Security框架提供了将JWT集成以保护REST API的方法。生成令牌的一个关键过程是应用签名以保证真实性。</p>\\n<p>在本教程中，我们将探索一个使用JWT认证的无状态Spring Boot应用程序。我们将设置必要的组件并创建一个加密的_SecretKey_实例来签名和验证JWT。</p>\\n<h2>2. 项目设置</h2>\\n<p>首先，让我们使用Spring Security和JWT令牌来引导一个无状态的Spring Boot应用程序。<strong>值得注意的是，为了简单和简洁，我们不会展示完整的设置代码。</strong></p>","autoDesc":true}');export{k as comp,d as data};
