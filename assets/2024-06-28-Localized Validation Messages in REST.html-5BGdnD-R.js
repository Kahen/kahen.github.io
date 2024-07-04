import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-BOJj4F50.js";const t={},p=e(`<h1 id="rest服务中的本地化验证消息" tabindex="-1"><a class="header-anchor" href="#rest服务中的本地化验证消息"><span>REST服务中的本地化验证消息</span></a></h1><hr><p>在多语言环境中设计应用程序时，我们经常需要提供本地化的消息。在这种情况下，使用用户选择的语言发送消息是一种常见做法。</p><p>当我们收到对REST Web服务的客户端请求时，我们必须确保传入的客户端请求在处理之前符合预定义的验证规则。验证的目的是维护数据完整性并增强系统安全性。当验证失败时，服务负责提供信息性消息以指示请求存在什么问题。</p><p>在本教程中，我们将探讨在REST Web服务中提供本地化验证消息的实现。</p><h2 id="_2-基本步骤" tabindex="-1"><a class="header-anchor" href="#_2-基本步骤"><span>2. 基本步骤</span></a></h2><p>我们的旅程从使用资源包作为存储本地化消息的仓库开始。然后，我们将资源包与Spring Boot集成，这允许我们在应用程序中检索本地化消息。</p><p>之后，我们将转向创建包含请求验证的Web服务。这展示了在请求过程中出现验证错误时如何使用本地化消息。</p><p>最后，我们将探索不同类型的本地化消息自定义。这些包括覆盖默认验证消息，定义我们自己的资源包以提供自定义验证消息，以及创建自定义验证注释以动态生成消息。</p><p>通过这些步骤，我们将深化对在多语言应用程序中提供精确和特定语言反馈的理解。</p><h2 id="_3-maven依赖" tabindex="-1"><a class="header-anchor" href="#_3-maven依赖"><span>3. Maven依赖</span></a></h2><p>在我们开始之前，让我们为web开发和Java Bean验证向_pom.xml_添加Spring Boot Starter Web和Spring Boot Starter Validation依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.springframework.boot\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`spring-boot-starter-web\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.springframework.boot\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`spring-boot-starter-validation\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些的最新版本可以在Maven Central找到。</p><h2 id="_4-本地化消息存储" tabindex="-1"><a class="header-anchor" href="#_4-本地化消息存储"><span>4. 本地化消息存储</span></a></h2><p>在Java应用程序开发中，属性文件通常作为国际化应用程序中本地化消息的存储库。这被认为是本地化的一种常规方法。它通常被称为属性资源包。</p><p>这些文件是包含键值对的纯文本文档。键作为消息检索的标识符，而相关的值则保存相应语言的本地化消息。</p><p>在本教程中，我们将创建两个属性文件。</p><p>_CustomValidationMessages.properties_是我们的默认属性文件，文件名不包含任何地区设置名称。当客户端指定不受支持的地区设置时，应用程序始终回退到默认语言：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">field.personalEmail</span><span class="token punctuation">=</span><span class="token value attr-value">个人邮箱</span>
<span class="token key attr-name">validation.notEmpty</span><span class="token punctuation">=</span><span class="token value attr-value">{field}不能为空</span>
<span class="token key attr-name">validation.email.notEmpty</span><span class="token punctuation">=</span><span class="token value attr-value">电子邮件不能为空</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还想创建一个额外的中文属性文件——<em>CustomValidationMessages_zh.properties</em>。当客户端指定_zh_或类似变体如_zh-tw_作为地区设置时，应用程序的语言将切换为中文：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">field.personalEmail</span><span class="token punctuation">=</span><span class="token value attr-value">个人电邮</span>
<span class="token key attr-name">validation.notEmpty</span><span class="token punctuation">=</span><span class="token value attr-value">{field}不能是空白</span>
<span class="token key attr-name">validation.email.notEmpty</span><span class="token punctuation">=</span><span class="token value attr-value">电邮不能留空</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**我们必须确保所有属性文件都使用UTF-8编码。这在处理包含非拉丁字符的消息时尤其重要，如中文、日文和韩文。**这种保证确保我们能够准确无误地显示所有消息，而不会有损坏的风险。</p><h2 id="_5-本地化消息检索" tabindex="-1"><a class="header-anchor" href="#_5-本地化消息检索"><span>5. 本地化消息检索</span></a></h2><p>Spring Boot通过_MessageSource_接口简化了本地化消息的检索。它从应用程序的资源包中解析消息，并使我们能够轻松地获取不同地区的消息。</p><p>在我们能够使用它之前，我们必须在Spring Boot中配置_MessageSource_的提供者。在本教程中，我们将使用_ReloadableResourceBundleMessageSource_作为实现。</p><p>它能够在不重启服务器的情况下重新加载消息属性文件。这在我们处于应用程序开发的初期阶段非常有用，当我们想要在不重新部署整个应用程序的情况下看到消息变化。</p><p>我们必须将默认编码与我们为属性文件使用的UTF-8编码对齐：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MessageConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">MessageSource</span> <span class="token function">messageSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ReloadableResourceBundleMessageSource</span> messageSource <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReloadableResourceBundleMessageSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        messageSource<span class="token punctuation">.</span><span class="token function">setBasename</span><span class="token punctuation">(</span><span class="token string">&quot;classpath:CustomValidationMessages&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        messageSource<span class="token punctuation">.</span><span class="token function">setDefaultEncoding</span><span class="token punctuation">(</span><span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> messageSource<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-bean验证" tabindex="-1"><a class="header-anchor" href="#_6-bean验证"><span>6. Bean验证</span></a></h2><p>在验证过程中，使用了一个名为_User_的数据传输对象(DTO)，中包含一个_email_字段。我们将应用Java Bean验证来验证这个DTO类。<em>email_字段被注解为</em>@NotEmpty_，以确保它不是空字符串。这个注解是标准的Java Bean验证注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@NotEmpty</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-rest服务" tabindex="-1"><a class="header-anchor" href="#_7-rest服务"><span>7. REST服务</span></a></h2><p>在这一部分，我们将创建一个名为_UserService_的REST服务，该服务负责根据请求体通过PUT方法更新特定用户信息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@PutMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/user&quot;</span><span class="token punctuation">,</span> produces <span class="token operator">=</span> <span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON_VALUE</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UpdateUserResponse</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">updateUser</span><span class="token punctuation">(</span>
        <span class="token annotation punctuation">@RequestBody</span> <span class="token annotation punctuation">@Valid</span> <span class="token class-name">User</span> user<span class="token punctuation">,</span>
        <span class="token class-name">BindingResult</span> bindingResult<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>bindingResult<span class="token punctuation">.</span><span class="token function">hasFieldErrors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">InputFieldError</span><span class="token punctuation">&gt;</span></span>\`\` fieldErrorList <span class="token operator">=</span> bindingResult<span class="token punctuation">.</span><span class="token function">getFieldErrors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>error <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">InputFieldError</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span><span class="token function">getField</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> error<span class="token punctuation">.</span><span class="token function">getDefaultMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">UpdateUserResponse</span> updateResponse <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UpdateUserResponse</span><span class="token punctuation">(</span>fieldErrorList<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">BAD_REQUEST</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span>updateResponse<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 更新逻辑...</span>
            <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">OK</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-1-地区选择" tabindex="-1"><a class="header-anchor" href="#_7-1-地区选择"><span>7.1. 地区选择</span></a></h3><p><strong>使用</strong> <em><strong>Accept-Language</strong></em> <strong>HTTP头来定义客户端的语言偏好是一种常见做法。</strong></p><p>我们可以通过使用Spring Boot中的_LocaleResolver_接口从HTTP请求中的_Accept-Language_头获取地区设置。在我们的案例中，我们不需要显式定义一个_LocaleResolver_。Spring Boot为我们提供了一个默认的。</p><p>然后，我们的服务根据这个头返回适当的本地化消息。在客户端指定一种我们服务不支持的语言的情况下，我们的服务简单地采用英语作为默认语言。</p><h3 id="_7-2-验证" tabindex="-1"><a class="header-anchor" href="#_7-2-验证"><span>7.2. 验证</span></a></h3><p><strong>我们在_updateUser(…)<em>方法中用</em>@Valid_注解_User_ DTO。这表明当REST Web服务被调用时，Java Bean验证将验证对象。</strong> 验证在后台进行。我们将通过_BindingResult_对象检查验证结果。</p><p>每当有任何字段错误时，由_bindingResult.hasFieldErrors()_确定，Spring Boot会根据当前地区为我们获取本地化的错误消息，并将消息封装到字段错误实例中。</p><p>我们将迭代_BindingResult_中的每个字段错误，并将它们收集到响应对象中，并将响应发送回客户端。</p><h3 id="_7-3-响应对象" tabindex="-1"><a class="header-anchor" href="#_7-3-响应对象"><span>7.3. 响应对象</span></a></h3><p>如果验证失败，服务将返回一个_UpdateResponse_对象，其中包含指定语言中的验证错误消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UpdateResponse</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">InputFieldError</span><span class="token punctuation">&gt;</span></span>\`\` fieldErrors<span class="token punctuation">;</span>

    <span class="token comment">// getter and setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_InputFieldError_是一个占位符类，用于存储哪个字段包含错误以及错误消息是什么：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">InputFieldError</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> field<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> message<span class="token punctuation">;</span>

    <span class="token comment">// getter and setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-验证消息类型" tabindex="-1"><a class="header-anchor" href="#_8-验证消息类型"><span>8. 验证消息类型</span></a></h2><p>让我们使用以下请求体向REST服务_/user_发起更新请求：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作为提醒，_User_对象必须包含一个非空的电子邮件。因此，我们期望此请求触发验证错误。</p><h3 id="_8-1-标准消息" tabindex="-1"><a class="header-anchor" href="#_8-1-标准消息"><span>8.1. 标准消息</span></a></h3><p>如果我们在请求中没有提供任何语言信息，我们将看到以下典型的英语消息响应：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;fieldErrors&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;email&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;message&quot;</span><span class="token operator">:</span> <span class="token string">&quot;must not be empty&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们使用以下_accept-language_ HTTP头发起另一个请求：</p><div class="language-http line-numbers-mode" data-ext="http" data-title="http"><pre class="language-http"><code><span class="token header"><span class="token header-name keyword">accept-language</span><span class="token punctuation">:</span> <span class="token header-value">zh-tw</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>服务解释为我们想要使用中文。它从相应的资源包中检索消息。我们将看到以下响应，其中包括中文验证消息：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;fieldErrors&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;email&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;message&quot;</span><span class="token operator">:</span> <span class="token string">&quot;不得是空的&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些是由Java Bean验证提供的标准验证消息。我们可以从Hibernate验证器那里找到详尽的消息列表，它是默认的验证实现。</p><p>然而，我们看到的消息看起来并不好看。我们可能想要更改验证消息以提供更多的清晰度。让我们采取行动修改标准化消息。</p><h3 id="_8-2-覆盖消息" tabindex="-1"><a class="header-anchor" href="#_8-2-覆盖消息"><span>8.2. 覆盖消息</span></a></h3><p><strong>我们可以覆盖Java Bean验证实现中定义的默认消息。</strong> 我们所要做的就是义一个基名为_ValidationMessages.properties_的属性文件：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">jakarta.validation.constraints.NotEmpty.message</span><span class="token punctuation">=</span><span class="token value attr-value">The field cannot be empty</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对于相同的基名，我们还将为中文创建另一个属性文件_ValidationMessages_zh.properties_：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">jakarta.validation.constraints.NotEmpty.message</span><span class="token punctuation">=</span><span class="token value attr-value">本栏不能留空</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>再次调用相同服务时，响应消息将被我们定义的消息替换：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;fieldErrors&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;email&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;message&quot;</span><span class="token operator">:</span> <span class="token string">&quot;The field cannot be empty&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，尽管覆盖了</p>`,69),o=[p];function l(i,c){return a(),s("div",null,o)}const d=n(t,[["render",l],["__file","2024-06-28-Localized Validation Messages in REST.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Localized%20Validation%20Messages%20in%20REST.html","title":"REST服务中的本地化验证消息","lang":"zh-CN","frontmatter":{"date":"2024-06-28T00:00:00.000Z","category":["REST","国际化"],"tag":["RESTful Web Services","国际化"],"head":[["meta",{"name":"keywords","content":"REST, 国际化, 本地化, 错误消息, Spring Boot, Java Bean Validation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Localized%20Validation%20Messages%20in%20REST.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"REST服务中的本地化验证消息"}],["meta",{"property":"og:description","content":"REST服务中的本地化验证消息 在多语言环境中设计应用程序时，我们经常需要提供本地化的消息。在这种情况下，使用用户选择的语言发送消息是一种常见做法。 当我们收到对REST Web服务的客户端请求时，我们必须确保传入的客户端请求在处理之前符合预定义的验证规则。验证的目的是维护数据完整性并增强系统安全性。当验证失败时，服务负责提供信息性消息以指示请求存在什..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T05:53:00.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"RESTful Web Services"}],["meta",{"property":"article:tag","content":"国际化"}],["meta",{"property":"article:published_time","content":"2024-06-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T05:53:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"REST服务中的本地化验证消息\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T05:53:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"REST服务中的本地化验证消息 在多语言环境中设计应用程序时，我们经常需要提供本地化的消息。在这种情况下，使用用户选择的语言发送消息是一种常见做法。 当我们收到对REST Web服务的客户端请求时，我们必须确保传入的客户端请求在处理之前符合预定义的验证规则。验证的目的是维护数据完整性并增强系统安全性。当验证失败时，服务负责提供信息性消息以指示请求存在什..."},"headers":[{"level":2,"title":"2. 基本步骤","slug":"_2-基本步骤","link":"#_2-基本步骤","children":[]},{"level":2,"title":"3. Maven依赖","slug":"_3-maven依赖","link":"#_3-maven依赖","children":[]},{"level":2,"title":"4. 本地化消息存储","slug":"_4-本地化消息存储","link":"#_4-本地化消息存储","children":[]},{"level":2,"title":"5. 本地化消息检索","slug":"_5-本地化消息检索","link":"#_5-本地化消息检索","children":[]},{"level":2,"title":"6. Bean验证","slug":"_6-bean验证","link":"#_6-bean验证","children":[]},{"level":2,"title":"7. REST服务","slug":"_7-rest服务","link":"#_7-rest服务","children":[{"level":3,"title":"7.1. 地区选择","slug":"_7-1-地区选择","link":"#_7-1-地区选择","children":[]},{"level":3,"title":"7.2. 验证","slug":"_7-2-验证","link":"#_7-2-验证","children":[]},{"level":3,"title":"7.3. 响应对象","slug":"_7-3-响应对象","link":"#_7-3-响应对象","children":[]}]},{"level":2,"title":"8. 验证消息类型","slug":"_8-验证消息类型","link":"#_8-验证消息类型","children":[{"level":3,"title":"8.1. 标准消息","slug":"_8-1-标准消息","link":"#_8-1-标准消息","children":[]},{"level":3,"title":"8.2. 覆盖消息","slug":"_8-2-覆盖消息","link":"#_8-2-覆盖消息","children":[]}]}],"git":{"createdTime":1719553980000,"updatedTime":1719553980000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.96,"words":2088},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Localized Validation Messages in REST.md","localizedDate":"2024年6月28日","excerpt":"\\n<hr>\\n<p>在多语言环境中设计应用程序时，我们经常需要提供本地化的消息。在这种情况下，使用用户选择的语言发送消息是一种常见做法。</p>\\n<p>当我们收到对REST Web服务的客户端请求时，我们必须确保传入的客户端请求在处理之前符合预定义的验证规则。验证的目的是维护数据完整性并增强系统安全性。当验证失败时，服务负责提供信息性消息以指示请求存在什么问题。</p>\\n<p>在本教程中，我们将探讨在REST Web服务中提供本地化验证消息的实现。</p>\\n<h2>2. 基本步骤</h2>\\n<p>我们的旅程从使用资源包作为存储本地化消息的仓库开始。然后，我们将资源包与Spring Boot集成，这允许我们在应用程序中检索本地化消息。</p>","autoDesc":true}');export{d as comp,k as data};
