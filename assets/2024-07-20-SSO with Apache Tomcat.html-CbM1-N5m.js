import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-CBerKIce.js";const p={},e=t('<hr><h1 id="apache-tomcat-单点登录" tabindex="-1"><a class="header-anchor" href="#apache-tomcat-单点登录"><span>Apache Tomcat 单点登录</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本文中，我们将学习 Tomcat 服务器的基础知识，它是如何工作的，以及如何启用 Tomcat 的单点登录（SSO）功能。我们将探索 Tomcat 服务器和 Web 应用程序所需的配置。</p><h2 id="_2-tomcat-架构" tabindex="-1"><a class="header-anchor" href="#_2-tomcat-架构"><span>2. Tomcat 架构</span></a></h2><p>组成 Catalina servlet 容器的主要部分是包含定义连接器的服务的服务器，以及由主机构成的引擎，最终这些主机将包含上下文或 Web 应用程序。</p><p>连接器监听客户端的请求并发送响应。在 Tomcat 10 中，我们可以找到以下协议的连接器：HTTP/1.1、HTTP/2 和 AJP。</p><p>引擎将处理由连接器接收的请求并生成输出。它将包含一个处理管道，这是一个按请求执行的进程链，以生成响应。这些进程是 Tomcat 的阀门。例如，Tomcat 上的 SSO 是作为阀门实现的。</p><p>之后，我们发现主机定义了将网络名称与服务器关联的虚拟主机。这是定义 SSO 阀门的级别，因此主机下的所有上下文都将处于 SSO 下。</p><p>最后，我们将拥有与主机关联的上下文元素。这些上下文是在服务器上运行的 Web 应用程序。上下文必须遵循 servlet 规范 2.3 或更高版本。</p><h2 id="_3-tomcat-上的单点登录" tabindex="-1"><a class="header-anchor" href="#_3-tomcat-上的单点登录"><span>3. Tomcat 上的单点登录</span></a></h2><p>Tomcat 在一个阀门中实现了单点登录功能，必须在主机级别配置该阀门。它的工作原理是 SSO 阀门将存储用户凭据，并在需要时传递它们，因此用户不需要再次登录。</p><p><strong>SSO 阀门需要满足以下要求</strong>：</p><ul><li>领域或“用户数据库”必须由虚拟主机下的所有 Web 应用程序共享。</li><li>Web 应用程序的认证机制必须是标准认证器之一：基本、摘要、表单、SSL 或 SPNEGO。</li><li>当客户端请求受保护的资源时，服务器将执行 Web 应用程序的认证机制。</li><li>服务器将使用经过认证的用户的角色来访问虚拟主机下 Web 应用程序的受保护资源，而无需再次登录。</li><li>当用户从 Web 应用程序注销时，服务器将在所有 Web 应用程序中使用户会话失效。</li><li>客户端必须接受 cookie。Cookie 存储将请求与用户凭据关联的令牌。</li></ul><h3 id="_3-1-tomcat-服务器配置" tabindex="-1"><a class="header-anchor" href="#_3-1-tomcat-服务器配置"><span>3.1. Tomcat 服务器配置</span></a></h3><p><strong>在服务器端，我们需要配置 <em>SingleSignOn</em> 阀门和领域或“用户数据库”</strong>。这些配置位于 Tomcat 安装文件夹的 conf 文件夹中的 server.xml 文件中。要添加 SSO 阀门，我们需要取消注释以下行：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Valve</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>org.apache.catalina.authenticator.SingleSignOn<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对于本文的示例，<strong>我们将依赖默认配置的领域，并只需要将用户添加到数据库中</strong>。领域定义如下：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Realm</span>\n  <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>org.apache.catalina.realm.UserDatabaseRealm<span class="token punctuation">&quot;</span></span>\n  <span class="token attr-name">resourceName</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UserDatabase<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此配置使用全局 JNDI 资源来定义用户数据库的来源：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Resource</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UserDatabase<span class="token punctuation">&quot;</span></span> <span class="token attr-name">auth</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Container<span class="token punctuation">&quot;</span></span>\n  <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>org.apache.catalina.UserDatabase<span class="token punctuation">&quot;</span></span>\n  <span class="token attr-name">description</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>可以更新和保存的用户数据库<span class="token punctuation">&quot;</span></span>\n  <span class="token attr-name">factory</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>org.apache.catalina.users.MemoryUserDatabaseFactory<span class="token punctuation">&quot;</span></span>\n  <span class="token attr-name">pathname</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>conf/tomcat-users.xml<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该资源将实例化一个 <em>org.apache.catalina.UserDatabase</em> 类型的对象，并使用工厂类 <em>org.apache.catalina.users.MemoryUserDatabaseFactory</em> 从 tomcat-users.xml 文件中填充它。</p><p>最后，我们看看如何添加示例文章所需的具有管理员角色的用户。我们需要修改 tomcat-users.xml 文件：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tomcat-users</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://tomcat.apache.org/xml<span class="token punctuation">&quot;</span></span>\n  <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">&quot;</span></span>\n  <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://tomcat.apache.org/xml tomcat-users.xsd<span class="token punctuation">&quot;</span></span>\n  <span class="token attr-name">version</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>role</span> <span class="token attr-name">rolename</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>admin<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>user</span> <span class="token attr-name">username</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>demo<span class="token punctuation">&quot;</span></span> <span class="token attr-name">password</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>demo<span class="token punctuation">&quot;</span></span> <span class="token attr-name">roles</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>admin<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tomcat-users</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-web-应用程序配置" tabindex="-1"><a class="header-anchor" href="#_3-2-web-应用程序配置"><span>3.2. Web 应用程序配置</span></a></h3><p>配置好服务器后，让我们通过每个 servlet 的 WEB-INF 文件夹中的 web.xml 配置文件来配置 servlet。</p><p><strong>所有需要 SSO 的 Web 应用程序必须有受保护的资源，并使用 Tomcat 认证方法之一</strong>。<strong>如 Servlet API 规范 2.3 所定义，Web 应用程序的认证机制在 <em>web-app</em> 元素内的 login-config 元素中定义</strong>。此元素将包含一个需要使用以下值之一的 auth-method 表单：BASIC、DIGEST、FORM 或 CLIENT-CERT。每种认证方法将有不同的配置，但我们将在 Tomcat Web 应用程序配置部分仅讨论 DIGEST 和 FORM 认证方法。</p><p><strong>要完成 Web 应用程序配置，我们需要设置受保护的区域</strong>。在 web.xml 文件的 web-app 元素下，我们可以添加尽可能多的 <em>security-constraint</em> 元素。每个安全约束定义受保护资源的 URL 模式，并设置允许的角色。此外，我们需要定义所有角色的安全角色元素，并且它们必须与 tomcat-users.xml 文件中的定义匹配。我们将在下一节中看到示例。</p><h2 id="_4-示例认证机制" tabindex="-1"><a class="header-anchor" href="#_4-示例认证机制"><span>4. 示例认证机制</span></a></h2><p>现在我们知道了如何配置 Web 应用程序，让我们看两个示例：Ping 和 Pong。<strong>我们选择了不同的认证机制来展示 SSO 如何与不同的机制良好工作</strong>。</p><h3 id="_4-1-ping-认证机制" tabindex="-1"><a class="header-anchor" href="#_4-1-ping-认证机制"><span>4.1. Ping 认证机制</span></a></h3><p>在 ping Web 应用程序中，我们使用表单认证方法。<strong>表单认证方法需要一个登录表单，登录失败的网页</strong>。例如，当我们要自定义登录页面以使其看起来像 Web 应用程序时，这种方法将很有用，配置如下：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>login-config</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>auth-method</span><span class="token punctuation">&gt;</span></span>``FORM``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>auth-method</span><span class="token punctuation">&gt;</span></span>``\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form-login-config</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form-login-page</span><span class="token punctuation">&gt;</span></span>`/logging.html`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form-login-page</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form-error-page</span><span class="token punctuation">&gt;</span></span>`/logging_error.html`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form-error-page</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form-login-config</span><span class="token punctuation">&gt;</span></span>`\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>login-config</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>登录页面必须遵循 servlet 规范 2.3 中登录表单注释中定义的严格规则</strong>，因为我们不能选择表单或输入字段的名称。它们必须是 <em>j_security_check</em>、<em>j_username</em> 和 <em>j_password</em>。这是为了使登录表单能够与所有类型的资源一起工作，并消除在服务器中配置出站表单的动作字段的需要。这里我们可以看到它必须看起来像什么：</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code>`<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>`Ping - 登录`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>post<span class="token punctuation">&quot;</span></span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>j_security_check<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>table</span><span class="token punctuation">&gt;</span></span>`\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span><span class="token punctuation">&gt;</span></span>``\n                ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">&gt;</span></span>````用户名：````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">&gt;</span></span>````\n                ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">&gt;</span></span>`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text<span class="token punctuation">&quot;</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>j_username<span class="token punctuation">&quot;</span></span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>20<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">&gt;</span></span>````\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">&gt;</span></span>``\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span><span class="token punctuation">&gt;</span></span>``\n                ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">&gt;</span></span>````密码：````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">&gt;</span></span>````\n                ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">&gt;</span></span>`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>password<span class="token punctuation">&quot;</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>j_password<span class="token punctuation">&quot;</span></span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>20<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">&gt;</span></span>````\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">&gt;</span></span>``\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>table</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>submit<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>提交<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`\n        <span class="token entity named-entity" title=" ">&amp;nbsp;</span>\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>reset<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>重置<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要了解服务器在接收到表单认证 Web 应用程序的受保护资源请求时会发生什么，让我们总结一下这种认证机制的流程。</p><p>首先，客户端请求受保护的资源。如果服务器不包含有效的 SSO 会话 ID，则服务器将重定向客户端到登录表单。在用户填写表单并将其凭据发送到服务器后，认证机制将开始。</p><p>在用户认证成功后，服务器将检查用户的角色，如果安全约束允许至少一个，则服务器将重定向客户端到请求的 URL。在另一种情况下，服务器将重定向客户端到错误页面。</p><h3 id="_4-2-pong-认证机制" tabindex="-1"><a class="header-anchor" href="#_4-2-pong-认证机制"><span>4.2. Pong 认证机制</span></a></h3><p>在 Pong Web 应用程序中，我们使用摘要认证机制，配置如下：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>login-config</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>auth-method</span><span class="token punctuation">&gt;</span></span>``DIGEST``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>auth-method</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>login-config</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**摘要认证机制的流程类似于 BASIC 认证：**当客户端请求受保护的资源时，服务器返回一个对话框以请求用户凭据。如果认证成功，则服务器返回请求的资源，但在另一种情况下，服务器再次发送认证对话框。</p><p><strong>尽管摘要和 BASIC 认证方法相似，但有一个重要区别：密码保留在服务器中。</strong></p><h3 id="_4-3-web-应用程序安全约束配置" tabindex="-1"><a class="header-anchor" href="#_4-3-web-应用程序安全约束配置"><span>4.3. Web 应用程序安全约束配置</span></a></h3><p>在这一点上，我们不会区分 Ping 和 Pong。尽管它们具有不同值的元素，但配置的重要部分在两个应用程序中将保持相同：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>security-constraint</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>display-name</span><span class="token punctuation">&gt;</span></span>`Ping 登录认证`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>display-name</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>web-resource-collection</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>web-resource-name</span><span class="token punctuation">&gt;</span></span>`PingRestrictedAccess`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>web-resource-name</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url-pattern</span><span class="token punctuation">&gt;</span></span>`/private/*`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url-pattern</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>web-resource-collection</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>auth-constraint</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>role-name</span><span class="token punctuation">&gt;</span></span>`admin`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>role-name</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>auth-constraint</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>user-data-constraint</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>transport-guarantee</span><span class="token punctuation">&gt;</span></span>`NONE`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>transport-guarantee</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>user-data-constraint</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>security-constraint</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安全约束定义了 private 文件夹下的所有内容都是受保护的资源，并定义了需要具有管理员角色才能访问资源。</p><h2 id="_5-运行示例" tabindex="-1"><a class="header-anchor" href="#_5-运行示例"><span>5. 运行示例</span></a></h2><p>现在我们需要安装一个 Tomcat 10 服务器，根据文章中显示的配置进行调整，并将 Ping 和 Pong Web 应用程序放在 Tomcat 的 Web 应用程序文件夹下。</p><p>一旦服务器启动并运行，并且两个应用程序都已部署，请求资源 http://localhost:8080/ping/private。服务器将显示登录认证，因为我们尚未登录：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/03/ping_app_login_request.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>然后我们需要输入在 Tomcat 服务器配置部分配置的凭据并提交表单。如果服务器验证了凭据，我们将看到一个带有指向 pong 的私有部分链接的网页：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/03/ping_app_private_page.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>如果服务器没有验证访问，我们将看到登录错误页面。</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/03/ping_app_login_error.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在成功登录到 Ping 应用程序后，我们可以看到 SSO 机制在起作用，点击链接到 pong 的私有部分。如果会话已经激活，服务器将发送 Pong 的受保护资源，而无需我们再次登录。</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/03/pong_app_private_page.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>最后，我们可以检查会话过期后，服务器将再次显示登录页面。我们可以通过等待几分钟并点击链接到 ping 的私有部分来做到这一点。</p><h2 id="_6-其他-sso-解决方案" tabindex="-1"><a class="header-anchor" href="#_6-其他-sso-解决方案"><span>6. 其他 SSO 解决方案</span></a></h2><p>在本文中，我们介绍了由 Tomcat 服务器实现的 Web-SSO。如果我们想探索其他 SSO 选项，这里有一些流行的选项：</p><ul><li>Spring Security 和 OpenID Connect</li><li>Spring Security OAuth 与 KeyCloak</li><li>使用 Spring Security 的 SAML</li><li>Apereo Central Authentication Service</li></ul><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本教程中，我们学习了 Tomcat 架构的基础知识。稍后，我们回顾了如何配置服务器。最后，我们回顾了必须包含在 SSO 下的 servlet 或 Web 应用程序的配置。</p><p>像往常一样，完整的源代码可以在 GitHub 上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"> OK</p>',65),o=[e];function c(l,i){return s(),n("div",null,o)}const g=a(p,[["render",c],["__file","2024-07-20-SSO with Apache Tomcat.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-SSO%20with%20Apache%20Tomcat.html","title":"Apache Tomcat 单点登录","lang":"zh-CN","frontmatter":{"date":"2022-03-01T00:00:00.000Z","category":["Apache Tomcat","SSO"],"tag":["Single Sign-On","Tomcat Configuration"],"head":[["meta",{"name":"keywords","content":"Apache Tomcat, SSO, Tomcat Configuration"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-SSO%20with%20Apache%20Tomcat.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Apache Tomcat 单点登录"}],["meta",{"property":"og:description","content":"Apache Tomcat 单点登录 1. 概述 在本文中，我们将学习 Tomcat 服务器的基础知识，它是如何工作的，以及如何启用 Tomcat 的单点登录（SSO）功能。我们将探索 Tomcat 服务器和 Web 应用程序所需的配置。 2. Tomcat 架构 组成 Catalina servlet 容器的主要部分是包含定义连接器的服务的服务器，以..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/03/ping_app_login_request.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T16:13:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Single Sign-On"}],["meta",{"property":"article:tag","content":"Tomcat Configuration"}],["meta",{"property":"article:published_time","content":"2022-03-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T16:13:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache Tomcat 单点登录\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/03/ping_app_login_request.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/03/ping_app_private_page.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/03/ping_app_login_error.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/03/pong_app_private_page.png\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\"],\\"datePublished\\":\\"2022-03-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T16:13:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Apache Tomcat 单点登录 1. 概述 在本文中，我们将学习 Tomcat 服务器的基础知识，它是如何工作的，以及如何启用 Tomcat 的单点登录（SSO）功能。我们将探索 Tomcat 服务器和 Web 应用程序所需的配置。 2. Tomcat 架构 组成 Catalina servlet 容器的主要部分是包含定义连接器的服务的服务器，以..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Tomcat 架构","slug":"_2-tomcat-架构","link":"#_2-tomcat-架构","children":[]},{"level":2,"title":"3. Tomcat 上的单点登录","slug":"_3-tomcat-上的单点登录","link":"#_3-tomcat-上的单点登录","children":[{"level":3,"title":"3.1. Tomcat 服务器配置","slug":"_3-1-tomcat-服务器配置","link":"#_3-1-tomcat-服务器配置","children":[]},{"level":3,"title":"3.2. Web 应用程序配置","slug":"_3-2-web-应用程序配置","link":"#_3-2-web-应用程序配置","children":[]}]},{"level":2,"title":"4. 示例认证机制","slug":"_4-示例认证机制","link":"#_4-示例认证机制","children":[{"level":3,"title":"4.1. Ping 认证机制","slug":"_4-1-ping-认证机制","link":"#_4-1-ping-认证机制","children":[]},{"level":3,"title":"4.2. Pong 认证机制","slug":"_4-2-pong-认证机制","link":"#_4-2-pong-认证机制","children":[]},{"level":3,"title":"4.3. Web 应用程序安全约束配置","slug":"_4-3-web-应用程序安全约束配置","link":"#_4-3-web-应用程序安全约束配置","children":[]}]},{"level":2,"title":"5. 运行示例","slug":"_5-运行示例","link":"#_5-运行示例","children":[]},{"level":2,"title":"6. 其他 SSO 解决方案","slug":"_6-其他-sso-解决方案","link":"#_6-其他-sso-解决方案","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1721492011000,"updatedTime":1721492011000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":8.42,"words":2527},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-SSO with Apache Tomcat.md","localizedDate":"2022年3月1日","excerpt":"<hr>\\n<h1>Apache Tomcat 单点登录</h1>\\n<h2>1. 概述</h2>\\n<p>在本文中，我们将学习 Tomcat 服务器的基础知识，它是如何工作的，以及如何启用 Tomcat 的单点登录（SSO）功能。我们将探索 Tomcat 服务器和 Web 应用程序所需的配置。</p>\\n<h2>2. Tomcat 架构</h2>\\n<p>组成 Catalina servlet 容器的主要部分是包含定义连接器的服务的服务器，以及由主机构成的引擎，最终这些主机将包含上下文或 Web 应用程序。</p>\\n<p>连接器监听客户端的请求并发送响应。在 Tomcat 10 中，我们可以找到以下协议的连接器：HTTP/1.1、HTTP/2 和 AJP。</p>","autoDesc":true}');export{g as comp,k as data};
