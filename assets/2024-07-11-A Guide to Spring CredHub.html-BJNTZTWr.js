import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-BMOUrRO4.js";const t={},p=e(`<h1 id="spring-credhub-指南" tabindex="-1"><a class="header-anchor" href="#spring-credhub-指南"><span>Spring CredHub 指南</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将实现 Spring CredHub，这是 CredHub 的 Spring 抽象，用于存储具有访问控制规则的秘密，这些规则将凭证资源映射到用户和操作。请注意，在运行代码之前，我们需要确保我们的应用程序在已安装 CredHub 的 Cloud Foundry 平台上运行。</p><h2 id="_2-maven-依赖" tabindex="-1"><a class="header-anchor" href="#_2-maven-依赖"><span>2. Maven 依赖</span></a></h2><p>首先，我们需要安装 <code>spring-credhub-starter</code> 依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`org.springframework.credhub\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`spring-credhub-starter\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`2.2.0\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-凭证管理的重要性" tabindex="-1"><a class="header-anchor" href="#_3-凭证管理的重要性"><span>3. 凭证管理的重要性</span></a></h2><p><strong>凭证管理是安全、集中地处理凭证在其整个生命周期中的过程，主要包括生成、创建、轮换和撤销。</strong> 尽管每家公司的应用程序和信息技术环境都各不相同，但有一件事是一致的：每个应用程序都需要凭证来访问其他应用程序、数据库或工具。</p><p><strong>凭证管理对数据安全至关重要，因为它为用户和应用程序提供了访问敏感信息的权限。</strong> 因此，确保它们在传输和静态存储时的安全非常重要。一种最佳策略是用 API 调用来替代硬编码凭证及其手动管理，使用像 CredHub 这样的专用凭证管理工具以编程方式检索它们。</p><h2 id="_4-credhub-api" tabindex="-1"><a class="header-anchor" href="#_4-credhub-api"><span>4. CredHub API</span></a></h2><h3 id="_4-1-认证" tabindex="-1"><a class="header-anchor" href="#_4-1-认证"><span>4.1. 认证</span></a></h3><p><strong>CredHub API 的认证有两种方式：UAA(OAuth2) 和双向 TLS。</strong></p><p>默认情况下，CredHub 提供集成的双向 TLS 认证。要使用此方案，请在应用程序属性中指定 CredHub 服务器的 URL：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring:
  credhub:
    url: \`\`&lt;CredHub URL&gt;\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 UAA 认证 API 的另一种方法是需要客户端凭据授权令牌来获取访问令牌：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring:
  credhub:
    url: \`\`&lt;CredHub URL&gt;\`\`
    oauth2:
      registration-id: \`&lt;credhub-client&gt;\`
  security:
    oauth2:
      client:
        registration:
          credhub-client:
            provider: uaa
            client-id: \`&lt;OAuth2 client ID&gt;\`
            client-secret: \`&lt;OAuth2 client secret&gt;\`
            authorization-grant-type: \`&lt;client_credentials&gt;\`
        provider:
          uaa:
            token-uri: \`&lt;UAA token server endpoint&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后可以将访问令牌传递到授权标头。</p><h3 id="_4-2-凭证-api" tabindex="-1"><a class="header-anchor" href="#_4-2-凭证-api"><span>4.2. 凭证 API</span></a></h3><p><strong>使用 <code>CredHubCredentialOperations</code> 接口，我们可以调用 CredHub API 来创建、更新、检索和删除凭证。</strong> CredHub 支持的凭证类型包括：</p><ul><li><code>value</code> – 用于单个配置的字符串</li><li><code>json</code> – 用于静态配置的 JSON 对象</li><li><code>user</code> – 3 个字符串 – 用户名、密码和密码哈希</li><li><code>password</code> – 用于密码和其他字符串凭证的字符串</li><li><code>certificate</code> – 包含根 CA、证书和私钥的对象</li><li><code>rsa</code> – 包含公钥和私钥的对象</li><li><code>ssh</code> – 包含 SSH 格式的公钥和私钥的对象</li></ul><h3 id="_4-2-权限-api" tabindex="-1"><a class="header-anchor" href="#_4-2-权限-api"><span>4.2. 权限 API</span></a></h3><p>在写入凭证时提供权限，以控制用户可以访问、更新或检索什么。Spring <strong>CredHub 提供 <code>CredHubPermissionV2Operations</code> 接口来创建、更新、检索和删除权限。</strong> 用户被允许对凭证执行的操作有：<code>read</code>、<code>write</code> 和 <code>delete</code>。</p><h2 id="_5-credhub-集成" tabindex="-1"><a class="header-anchor" href="#_5-credhub-集成"><span>5. CredHub 集成</span></a></h2><p>现在我们将实现一个 Spring Boot 应用程序，该程序返回订单详情，并展示一些示例来解释凭证管理的完整生命周期。</p><h3 id="_5-1-credhuboperations-接口" tabindex="-1"><a class="header-anchor" href="#_5-1-credhuboperations-接口"><span>5.1. <code>CredHubOperations</code> 接口</span></a></h3><p><strong><code>CredHubOperations</code> 接口位于 <code>org.springframework.credhub.core</code> 包中。它是 Spring 的 CredHub 的中心类，支持丰富的功能集与 CredHub 交互。</strong> 它提供了访问模拟整个 CredHub API 的接口，并在域对象和 CredHub 数据之间进行映射：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CredentialService</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">CredHubCredentialOperations</span> credentialOperations<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">CredHubPermissionV2Operations</span> permissionOperations<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">CredentialService</span><span class="token punctuation">(</span><span class="token class-name">CredHubOperations</span> credHubOperations<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>credentialOperations <span class="token operator">=</span> credHubOperations<span class="token punctuation">.</span><span class="token function">credentials</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>permissionOperations <span class="token operator">=</span> credHubOperations<span class="token punctuation">.</span><span class="token function">permissionsV2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-凭证创建" tabindex="-1"><a class="header-anchor" href="#_5-2-凭证创建"><span>5.2. 凭证创建</span></a></h3><p>让我们从创建一个新的 <code>password</code> 类型的凭证开始，这是使用 <code>PasswordCredentialRequest</code> 构建的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">SimpleCredentialName</span> credentialName <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleCredentialName</span><span class="token punctuation">(</span>credential<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">PasswordCredential</span> passwordCredential <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PasswordCredential</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> value<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;password&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">PasswordCredentialRequest</span> request <span class="token operator">=</span> <span class="token class-name">PasswordCredentialRequest</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span>credentialName<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span>passwordCredential<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
credentialOperations<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似地，可以使用其他 <code>CredentialRequest</code> 的实现来构建不同类型的凭证，例如 <code>ValueCredentialRequest</code> 用于 <code>value</code> 类型的凭证，<code>RsaCredentialRequest</code> 用于 <code>rsa</code> 类型的凭证，等等：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ValueCredential</span> valueCredential <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ValueCredential</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> value<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
request <span class="token operator">=</span> <span class="token class-name">ValueCredentialRequest</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span>credentialName<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span>valueCredential<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">RsaCredential</span> rsaCredential <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RsaCredential</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> value<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;public_key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> value<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;private_key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
request <span class="token operator">=</span> <span class="token class-name">RsaCredentialRequest</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span>credentialName<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span>rsaCredential<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-凭证生成" tabindex="-1"><a class="header-anchor" href="#_5-3-凭证生成"><span>5.3. 凭证生成</span></a></h3><p>Spring CredHub 还提供了一个选项，可以动态生成凭证，以避免在应用程序端管理它们所涉及的努力。这反过来又增强了数据安全性。让我们看看如何实现这个功能：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">SimpleCredentialName</span> credentialName <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleCredentialName</span><span class="token punctuation">(</span><span class="token string">&quot;api_key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">PasswordParameters</span> parameters <span class="token operator">=</span> <span class="token class-name">PasswordParameters</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">excludeUpper</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">excludeLower</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">includeSpecial</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">excludeNumber</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">CredentialDetails</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">PasswordCredential</span><span class="token punctuation">&gt;</span></span>\`\` generatedCred <span class="token operator">=</span> credentialOperations<span class="token punctuation">.</span><span class="token function">generate</span><span class="token punctuation">(</span><span class="token class-name">PasswordParametersRequest</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span>credentialName<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">parameters</span><span class="token punctuation">(</span>parameters<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> password <span class="token operator">=</span> generatedCred<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-凭证轮换和撤销" tabindex="-1"><a class="header-anchor" href="#_5-4-凭证轮换和撤销"><span>5.4. 凭证轮换和撤销</span></a></h3><p>凭证管理的另一个重要阶段是轮换凭证。下面的代码演示了如何使用 <code>password</code> 类型的凭证实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CredentialDetails</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">PasswordCredential</span><span class="token punctuation">&gt;</span></span>\`\` newPassword <span class="token operator">=</span> credentialOperations<span class="token punctuation">.</span><span class="token function">regenerate</span><span class="token punctuation">(</span>credentialName<span class="token punctuation">,</span> <span class="token class-name">PasswordCredential</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>CredHub 还允许 <code>certificate</code> 类型的凭证同时拥有多个活动版本，以便它们可以在不停机的情况下进行轮换。凭证管理的最后也是最关键的阶段是撤销凭证，可以实现如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>credentialOperations<span class="token punctuation">.</span><span class="token function">deleteByName</span><span class="token punctuation">(</span>credentialName<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-5-凭证检索" tabindex="-1"><a class="header-anchor" href="#_5-5-凭证检索"><span>5.5. 凭证检索</span></a></h3><p>现在我们已经了解了完整的凭证管理生命周期。我们将看看如何检索用于订单 API 认证的 <code>password</code> 凭证的最新版本：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span>\`<span class="token operator">&lt;</span><span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">&gt;</span></span>\`<span class="token operator">&gt;</span> <span class="token function">getAllOrders</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> apiKey <span class="token operator">=</span> credentialService<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token string">&quot;api_key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token function">getOrderList</span><span class="token punctuation">(</span>apiKey<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">OK</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">FORBIDDEN</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">SimpleCredentialName</span> credentialName <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleCredentialName</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> credentialOperations<span class="token punctuation">.</span><span class="token function">getByName</span><span class="token punctuation">(</span>credentialName<span class="token punctuation">,</span> <span class="token class-name">PasswordCredential</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-6-控制对凭证的访问" tabindex="-1"><a class="header-anchor" href="#_5-6-控制对凭证的访问"><span>5.6. 控制对凭证的访问</span></a></h3><p><strong>可以向凭证附加权限以限制访问。</strong> 例如，可以附加一个权限，允许用户 <code>u101</code> 对凭证执行 <code>READ</code> 和 <code>WRITE</code> 操作。另一个权限可以附加，允许所有用户仅对凭证执行 <code>READ</code> 操作。</p><p>让我们看看向凭证添加一个权限的示例，允许用户 <code>u101</code> 执行 <code>READ</code> 和 <code>WRITE</code> 操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Permission</span> permission <span class="token operator">=</span> <span class="token class-name">Permission</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">app</span><span class="token punctuation">(</span><span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">operations</span><span class="token punctuation">(</span><span class="token class-name">Operation</span><span class="token punctuation">.</span><span class="token constant">READ</span><span class="token punctuation">,</span> <span class="token class-name">Operation</span><span class="token punctuation">.</span><span class="token constant">WRITE</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">user</span><span class="token punctuation">(</span><span class="token string">&quot;u101&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
permissionOperations<span class="token punctuation">.</span><span class="token function">addPermissions</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> permission<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Spring CredHub 除了 <code>READ</code> 和 <code>WRITE</code> 之外还提供对其他操作的支持，允许用户：</p><ul><li><code>READ</code> – 通过 ID 和名称获取凭证</li><li><code>WRITE</code> – 通过名称设置、生成和重新生成凭证</li><li><code>DELETE</code> – 通过名称删除凭证</li><li><code>READ_ACL</code> – 通过凭证名称获取 ACL(访问控制列表)</li><li><code>WRITE_ACL</code> – 向凭证 ACL 添加和删除条目</li></ul><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本教程中，我们展示了如何使用 Spring CredHub 库将 CredHub 与 Spring Boot 集成。<strong>我们为订单应用程序集中了凭证管理，涵盖了两个关键方面：凭证生命周期和权限。</strong></p><p>本文的完整源代码可以在 GitHub 上找到。</p>`,53),c=[p];function o(i,l){return s(),a("div",null,c)}const d=n(t,[["render",o],["__file","2024-07-11-A Guide to Spring CredHub.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-A%20Guide%20to%20Spring%20CredHub.html","title":"Spring CredHub 指南","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring","Spring Boot"],"tag":["CredHub","Spring Security"],"head":[["meta",{"name":"keywords","content":"Spring, Spring Boot, CredHub, Spring Security"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-A%20Guide%20to%20Spring%20CredHub.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring CredHub 指南"}],["meta",{"property":"og:description","content":"Spring CredHub 指南 1. 概述 在本教程中，我们将实现 Spring CredHub，这是 CredHub 的 Spring 抽象，用于存储具有访问控制规则的秘密，这些规则将凭证资源映射到用户和操作。请注意，在运行代码之前，我们需要确保我们的应用程序在已安装 CredHub 的 Cloud Foundry 平台上运行。 2. Maven..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T18:03:25.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"CredHub"}],["meta",{"property":"article:tag","content":"Spring Security"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T18:03:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring CredHub 指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T18:03:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring CredHub 指南 1. 概述 在本教程中，我们将实现 Spring CredHub，这是 CredHub 的 Spring 抽象，用于存储具有访问控制规则的秘密，这些规则将凭证资源映射到用户和操作。请注意，在运行代码之前，我们需要确保我们的应用程序在已安装 CredHub 的 Cloud Foundry 平台上运行。 2. Maven..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Maven 依赖","slug":"_2-maven-依赖","link":"#_2-maven-依赖","children":[]},{"level":2,"title":"3. 凭证管理的重要性","slug":"_3-凭证管理的重要性","link":"#_3-凭证管理的重要性","children":[]},{"level":2,"title":"4. CredHub API","slug":"_4-credhub-api","link":"#_4-credhub-api","children":[{"level":3,"title":"4.1. 认证","slug":"_4-1-认证","link":"#_4-1-认证","children":[]},{"level":3,"title":"4.2. 凭证 API","slug":"_4-2-凭证-api","link":"#_4-2-凭证-api","children":[]},{"level":3,"title":"4.2. 权限 API","slug":"_4-2-权限-api","link":"#_4-2-权限-api","children":[]}]},{"level":2,"title":"5. CredHub 集成","slug":"_5-credhub-集成","link":"#_5-credhub-集成","children":[{"level":3,"title":"5.1. CredHubOperations 接口","slug":"_5-1-credhuboperations-接口","link":"#_5-1-credhuboperations-接口","children":[]},{"level":3,"title":"5.2. 凭证创建","slug":"_5-2-凭证创建","link":"#_5-2-凭证创建","children":[]},{"level":3,"title":"5.3. 凭证生成","slug":"_5-3-凭证生成","link":"#_5-3-凭证生成","children":[]},{"level":3,"title":"5.4. 凭证轮换和撤销","slug":"_5-4-凭证轮换和撤销","link":"#_5-4-凭证轮换和撤销","children":[]},{"level":3,"title":"5.5. 凭证检索","slug":"_5-5-凭证检索","link":"#_5-5-凭证检索","children":[]},{"level":3,"title":"5.6. 控制对凭证的访问","slug":"_5-6-控制对凭证的访问","link":"#_5-6-控制对凭证的访问","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720721005000,"updatedTime":1720721005000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.25,"words":1575},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-A Guide to Spring CredHub.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将实现 Spring CredHub，这是 CredHub 的 Spring 抽象，用于存储具有访问控制规则的秘密，这些规则将凭证资源映射到用户和操作。请注意，在运行代码之前，我们需要确保我们的应用程序在已安装 CredHub 的 Cloud Foundry 平台上运行。</p>\\n<h2>2. Maven 依赖</h2>\\n<p>首先，我们需要安装 <code>spring-credhub-starter</code> 依赖项：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>`&lt;dependency&gt;`\\n    `&lt;groupId&gt;`org.springframework.credhub`&lt;/groupId&gt;`\\n    `&lt;artifactId&gt;`spring-credhub-starter`&lt;/artifactId&gt;`\\n    `&lt;version&gt;`2.2.0`&lt;/version&gt;`\\n`&lt;/dependency&gt;`\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
