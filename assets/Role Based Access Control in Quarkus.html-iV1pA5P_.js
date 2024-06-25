import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DpEqAHhK.js";const p={},e=t('<h1 id="quarkus中的基于角色的访问控制" tabindex="-1"><a class="header-anchor" href="#quarkus中的基于角色的访问控制"><span>Quarkus中的基于角色的访问控制</span></a></h1><p>在本教程中，我们将讨论基于角色的访问控制（RBAC）以及如何使用Quarkus实现这一功能。</p><p>RBAC是一种广为人知的实现复杂安全系统的机制。Quarkus是一个现代的云原生全栈Java框架，它开箱即支持RBAC。</p><p>在我们开始之前，重要的是要注意角色可以以多种方式应用。在企业中，角色通常只是权限的聚合，用于识别用户可以执行的特定操作组。在Jakarta中，角色是允许执行资源操作（等同于权限）的标签。实现RBAC系统有多种不同的方式。</p><p>在本教程中，我们将使用分配给资源的权限来控制访问，而角色将组织一系列权限。</p><h2 id="_2-rbac" tabindex="-1"><a class="header-anchor" href="#_2-rbac"><span>2. RBAC</span></a></h2><p>基于角色的访问控制是一种安全模型，它根据预定义的权限授予应用程序用户访问权限。系统管理员可以在访问尝试时将这些权限分配和验证给特定资源。为了帮助管理权限，他们创建角色来组织它们：</p><p>为了演示如何使用Quarkus实现RBAC系统，我们需要一些其他工具，如JSON Web Tokens（JWT）、JPA和Quarkus安全模块。JWT帮助我们实现一种简单且自包含的方式来验证身份和授权，因此为了简单起见，我们在示例中利用它。同样，JPA将帮助我们处理域逻辑和数据库之间的通信，而Quarkus将是所有这些组件的粘合剂。</p><h2 id="_3-jwt" tabindex="-1"><a class="header-anchor" href="#_3-jwt"><span>3. JWT</span></a></h2><p>JSON Web Tokens（JWT）是一种安全地在用户和服务器之间传输信息的方式，作为紧凑、URL安全的JSON对象。此令牌经过数字签名以进行验证，通常用于基于Web的应用程序的身份验证和安全数据交换。在身份验证期间，服务器会发出一个包含用户身份和声明的JWT，客户端将在后续请求中使用它来访问受保护的资源：</p><p>客户端通过提供一些凭据来请求令牌，然后授权服务器提供签名的令牌；稍后，在尝试访问资源时，客户端提供JWT令牌，资源服务器验证并验证其所需的权限。考虑到这些基本概念，让我们探讨如何在Quarkus应用程序中集成RBAC和JWT。</p><h2 id="_4-数据设计" tabindex="-1"><a class="header-anchor" href="#_4-数据设计"><span>4. 数据设计</span></a></h2><p>为了保持简单，我们将创建一个基本的RBAC系统供此示例使用。为此，让我们使用以下表格：</p><p>这使我们能够表示用户、他们的角色以及组成每个角色的权限。JPA数据库表将表示我们的域对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>\n<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;users&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Id</span>\n    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">AUTO</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Column</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@ManyToMany</span><span class="token punctuation">(</span>fetch <span class="token operator">=</span> <span class="token class-name">FetchType</span><span class="token punctuation">.</span><span class="token constant">LAZY</span><span class="token punctuation">)</span>\n    <span class="token annotation punctuation">@JoinTable</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;user_roles&quot;</span><span class="token punctuation">,</span>\n      joinColumns <span class="token operator">=</span> <span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;user_id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      inverseJoinColumns <span class="token operator">=</span> <span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;role_name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">Set</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Role</span><span class="token punctuation">&gt;</span></span>` roles <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    \n    <span class="token comment">// Getter和Setter</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用户表保存登录凭据以及用户和角色之间的关系：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>\n<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;roles&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Role</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Id</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Roles</span>\n    <span class="token annotation punctuation">@Convert</span><span class="token punctuation">(</span>converter <span class="token operator">=</span> <span class="token class-name">PermissionConverter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">Set</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Permission</span><span class="token punctuation">&gt;</span></span>` permissions <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// Getters和Setters</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次，为了保持简单，权限以逗号分隔值的形式存储在列中，为此我们使用_PermissionConverter_。</p><h2 id="_5-json-web-token和quarkus" tabindex="-1"><a class="header-anchor" href="#_5-json-web-token和quarkus"><span>5. JSON Web Token和Quarkus</span></a></h2><p>在凭证方面，要使用JWT令牌并启用登录，我们需要以下依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````io.quarkus````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````quarkus-smallrye-jwt-build````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````3.9.4````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````io.quarkus````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````quarkus-smallrye-jwt````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````3.9.4````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````io.quarkus````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````quarkus-test-security````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>``test``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>``\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````3.9.4````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````io.quarkus````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````quarkus-test-security-jwt````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>``test``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>``\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````3.9.4````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些模块为我们提供了实现令牌生成、权限验证和测试我们实现的工具。现在，为了定义依赖项和Quarkus版本，我们将使用BOM父项目，其中包含与框架兼容的特定版本。对于这个示例，我们需要：</p><ul><li><em>quarkus-smallrye-jwt-build</em></li><li><em>quarkus-smallrye-jwt</em></li><li><em>quarkus-test-security</em></li><li><em>quarkus-test-security-jwt</em></li></ul><p>接下来，为了实现令牌签名，我们需要RSA公钥和私钥。Quarkus提供了一种简单的配置方式。生成后，我们必须配置以下属性：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">mp.jwt.verify.publickey.location</span><span class="token punctuation">=</span><span class="token value attr-value">publicKey.pem</span>\n<span class="token key attr-name">mp.jwt.verify.issuer</span><span class="token punctuation">=</span><span class="token value attr-value">my-issuer</span>\n<span class="token key attr-name">smallrye.jwt.sign.key.location</span><span class="token punctuation">=</span><span class="token value attr-value">privateKey.pem</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Quarkus默认在_/resources_或提供的绝对路径中查找。框架使用密钥来签署声明并验证令牌。</p><h2 id="_6-凭证" tabindex="-1"><a class="header-anchor" href="#_6-凭证"><span>6. 凭证</span></a></h2><p>现在，为了创建JWT令牌并设置其权限，我们需要验证用户的凭证。下面的代码是如何做到这一点的一个示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Path</span><span class="token punctuation">(</span><span class="token string">&quot;/secured&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SecureResourceController</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 其他方法...</span>\n    \n    <span class="token annotation punctuation">@POST</span>\n    <span class="token annotation punctuation">@Path</span><span class="token punctuation">(</span><span class="token string">&quot;/login&quot;</span><span class="token punctuation">)</span>\n    <span class="token annotation punctuation">@Consumes</span><span class="token punctuation">(</span><span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON</span><span class="token punctuation">)</span>\n    <span class="token annotation punctuation">@Produces</span><span class="token punctuation">(</span><span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON</span><span class="token punctuation">)</span>\n    <span class="token annotation punctuation">@PermitAll</span>\n    <span class="token keyword">public</span> <span class="token class-name">Response</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Valid</span> <span class="token keyword">final</span> <span class="token class-name">LoginDto</span> loginDto<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>userService<span class="token punctuation">.</span><span class="token function">checkUserCredentials</span><span class="token punctuation">(</span>loginDto<span class="token punctuation">.</span><span class="token function">username</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> loginDto<span class="token punctuation">.</span><span class="token function">password</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">User</span> user <span class="token operator">=</span> userService<span class="token punctuation">.</span><span class="token function">findByUsername</span><span class="token punctuation">(</span>loginDto<span class="token punctuation">.</span><span class="token function">username</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">String</span> token <span class="token operator">=</span> userService<span class="token punctuation">.</span><span class="token function">generateJwtToken</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token class-name">Response</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">entity</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">TokenResponse</span><span class="token punctuation">(</span><span class="token string">&quot;Bearer &quot;</span> <span class="token operator">+</span> token<span class="token punctuation">,</span><span class="token string">&quot;3600&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token class-name">Response</span><span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token class-name">Response<span class="token punctuation">.</span>Status</span><span class="token punctuation">.</span><span class="token constant">UNAUTHORIZED</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">entity</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Message</span><span class="token punctuation">(</span><span class="token string">&quot;Invalid credentials&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>登录端点验证用户凭证，并在成功的情况下以响应的形式发出令牌。另一个需要注意的重要事项是_@PermitAll_，它确保此端点是公开的，不需要任何身份验证。然而，我们很快就会更详细地查看权限。</p><p>这里，我们将特别关注的另一个重要代码片段是generateJwtToken方法，它创建并签名令牌。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">generateJwtToken</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Set</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` permissions <span class="token operator">=</span> user<span class="token punctuation">.</span><span class="token function">getRoles</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>role <span class="token operator">-&gt;</span> role<span class="token punctuation">.</span><span class="token function">getPermissions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Permission</span><span class="token operator">::</span><span class="token function">name</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> <span class="token class-name">Jwt</span><span class="token punctuation">.</span><span class="token function">issuer</span><span class="token punctuation">(</span>issuer<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">upn</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">groups</span><span class="token punctuation">(</span>permissions<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">expiresIn</span><span class="token punctuation">(</span><span class="token number">3600</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">claim</span><span class="token punctuation">(</span><span class="token class-name">Claims</span><span class="token punctuation">.</span>email_verified<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">sign</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个方法中，我们检索每个角色提供的权限列表，并将它们注入到令牌中。发行者还定义了令牌、重要的声明和生存时间，然后，最后，我们签名令牌。一旦用户收到它，它将被用来验证所有后续调用。令牌包含了服务器需要验证和授权相应用户的所有信息。用户只需要将承载者令牌发送到_Authentication_头以验证调用。</p><h2 id="_7-权限" tabindex="-1"><a class="header-anchor" href="#_7-权限"><span>7. 权限</span></a></h2><p>如前所述，<em>Jakarta_使用</em>@RolesAllowed_来为资源分配权限。尽管它称之为角色，但它们像权限一样工作（根据我们之前定义的概念），这意味着我们只需要用它来注解我们的端点来保护它们，像这样：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Path</span><span class="token punctuation">(</span><span class="token string">&quot;/secured&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SecureResourceController</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">UserService</span> userService<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">SecurityIdentity</span> securityIdentity<span class="token punctuation">;</span>\n\n    <span class="token comment">// 构造函数</span>\n\n    <span class="token annotation punctuation">@GET</span>\n    <span class="token annotation punctuation">@Path</span><span class="token punctuation">(</span><span class="token string">&quot;/resource&quot;</span><span class="token punctuation">)</span>\n    <span class="token annotation punctuation">@Consumes</span><span class="token punctuation">(</span><span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON</span><span class="token punctuation">)</span>\n    <span class="token annotation punctuation">@Produces</span><span class="token punctuation">(</span><span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON</span><span class="token punctuation">)</span>\n    <span class="token annotation punctuation">@RolesAllowed</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;VIEW_ADMIN_DETAILS&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token string">&quot;Hello world, here are some details about the admin!&quot;</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@GET</span>\n    <span class="token annotation punctuation">@Path</span><span class="token punctuation">(</span><span class="token string">&quot;/resource/user&quot;</span><span class="token punctuation">)</span>\n    <span class="token annotation punctuation">@Consumes</span><span class="token punctuation">(</span><span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON</span><span class="token punctuation">)</span>\n    <span class="token annotation punctuation">@Produces</span><span class="token punctuation">(</span><span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON</span><span class="token punctuation">)</span>\n    <span class="token annotation punctuation">@RolesAllowed</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;VIEW_USER_DETAILS&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">Message</span> <span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Message</span><span class="token punctuation">(</span><span class="token string">&quot;Hello &quot;</span> <span class="token operator">+</span> securityIdentity<span class="token punctuation">.</span><span class="token function">getPrincipal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">//...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看代码，我们可以看到向我们的端点添加权限控制是多么简单。在我们的例子中，/secured/resource/user现在需要_VIEW_USER_DETAILS_权限，而/secured/resource需要_VIEW_ADMIN_DETAILS_。我们还可以观察到，可以分配一个权限列表而不是只有一个。在这种情况下，Quarkus将要求至少列出的_@RolesAllowed_中的一个权限。</p><p>另一个重要的评论是，令牌包含权限和有关当前登录用户的信息（安全身份中的主体）。</p><h2 id="_8-测试" tabindex="-1"><a class="header-anchor" href="#_8-测试"><span>8. 测试</span></a></h2><p>Quarkus提供了许多工具，使我们的应用程序测试变得简单易行。使用这些工具，我们可以配置JWT的创建和设置以及它们的上下文，使测试</p>',40),o=[e];function c(l,u){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","Role Based Access Control in Quarkus.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Role%20Based%20Access%20Control%20in%20Quarkus.html","title":"Quarkus中的基于角色的访问控制","lang":"zh-CN","frontmatter":{"date":"2024-06-18T00:00:00.000Z","category":["Java","Security"],"tag":["Quarkus","RBAC","Security"],"description":"Quarkus中的基于角色的访问控制 在本教程中，我们将讨论基于角色的访问控制（RBAC）以及如何使用Quarkus实现这一功能。 RBAC是一种广为人知的实现复杂安全系统的机制。Quarkus是一个现代的云原生全栈Java框架，它开箱即支持RBAC。 在我们开始之前，重要的是要注意角色可以以多种方式应用。在企业中，角色通常只是权限的聚合，用于识别用户...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Role%20Based%20Access%20Control%20in%20Quarkus.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Quarkus中的基于角色的访问控制"}],["meta",{"property":"og:description","content":"Quarkus中的基于角色的访问控制 在本教程中，我们将讨论基于角色的访问控制（RBAC）以及如何使用Quarkus实现这一功能。 RBAC是一种广为人知的实现复杂安全系统的机制。Quarkus是一个现代的云原生全栈Java框架，它开箱即支持RBAC。 在我们开始之前，重要的是要注意角色可以以多种方式应用。在企业中，角色通常只是权限的聚合，用于识别用户..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Quarkus"}],["meta",{"property":"article:tag","content":"RBAC"}],["meta",{"property":"article:tag","content":"Security"}],["meta",{"property":"article:published_time","content":"2024-06-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Quarkus中的基于角色的访问控制\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"2. RBAC","slug":"_2-rbac","link":"#_2-rbac","children":[]},{"level":2,"title":"3. JWT","slug":"_3-jwt","link":"#_3-jwt","children":[]},{"level":2,"title":"4. 数据设计","slug":"_4-数据设计","link":"#_4-数据设计","children":[]},{"level":2,"title":"5. JSON Web Token和Quarkus","slug":"_5-json-web-token和quarkus","link":"#_5-json-web-token和quarkus","children":[]},{"level":2,"title":"6. 凭证","slug":"_6-凭证","link":"#_6-凭证","children":[]},{"level":2,"title":"7. 权限","slug":"_7-权限","link":"#_7-权限","children":[]},{"level":2,"title":"8. 测试","slug":"_8-测试","link":"#_8-测试","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.06,"words":1817},"filePathRelative":"posts/baeldung/Archive/Role Based Access Control in Quarkus.md","localizedDate":"2024年6月18日","excerpt":"\\n<p>在本教程中，我们将讨论基于角色的访问控制（RBAC）以及如何使用Quarkus实现这一功能。</p>\\n<p>RBAC是一种广为人知的实现复杂安全系统的机制。Quarkus是一个现代的云原生全栈Java框架，它开箱即支持RBAC。</p>\\n<p>在我们开始之前，重要的是要注意角色可以以多种方式应用。在企业中，角色通常只是权限的聚合，用于识别用户可以执行的特定操作组。在Jakarta中，角色是允许执行资源操作（等同于权限）的标签。实现RBAC系统有多种不同的方式。</p>\\n<p>在本教程中，我们将使用分配给资源的权限来控制访问，而角色将组织一系列权限。</p>\\n<h2>2. RBAC</h2>","autoDesc":true}');export{r as comp,d as data};
