import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-LwwahXlT.js";const t={},p=e(`<h1 id="使用firebase-cloud-messaging在spring-boot应用程序中的实现" tabindex="-1"><a class="header-anchor" href="#使用firebase-cloud-messaging在spring-boot应用程序中的实现"><span>使用Firebase Cloud Messaging在Spring Boot应用程序中的实现</span></a></h1><p>在这个快速教程中，我们将展示如何使用Google的Firebase Cloud Messaging（简称FCM）向Web和移动应用程序发送推送通知。</p><h2 id="_2-fcm是什么" tabindex="-1"><a class="header-anchor" href="#_2-fcm是什么"><span>2. FCM是什么？</span></a></h2><p>Firebase Cloud Messaging，简称FCM，是一个基于云的消息服务，提供以下功能：</p><ul><li>可靠地向移动或Web应用程序发送消息，这里统称为“客户端”</li><li>使用主题或基于订阅的地址向所有或特定客户端发送消息</li><li>在服务器应用程序中接收来自客户端的消息</li></ul><p>以下是这项技术在现实世界应用的一些示例：</p><ul><li>发送具有特定产品独家优惠的目标消息</li><li>通知所有给定应用程序的用户新功能可用</li><li>即时消息/聊天应用程序</li><li>向特定客户发送直接通知</li></ul><h2 id="_3-应用程序架构" tabindex="-1"><a class="header-anchor" href="#_3-应用程序架构"><span>3. 应用程序架构</span></a></h2><p>基于FCM的应用程序的典型架构包括服务器、客户端和FCM本身：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/BAEL_5900_Architecture.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><strong>在本教程中，我们将专注于这种应用程序的服务器端</strong>。在我们的案例中，这个服务器将是一个基于Spring Boot的服务，它公开了一个REST API。这个API允许我们探索我们可以向我们（希望是庞大的）用户群发送通知的不同方式：</p><ul><li>向主题发布通知</li><li>向特定客户端发布通知</li><li>向多个主题发布通知</li></ul><p>这种应用程序的核心是客户端、主题和订阅的概念。</p><h3 id="_3-1-主题" tabindex="-1"><a class="header-anchor" href="#_3-1-主题"><span>3.1. 主题</span></a></h3><p><strong>主题是一个命名实体，作为具有某些属性的通知的中心</strong>。例如，金融应用程序可以为它交易的每种资产使用一个主题。同样，体育应用程序可以为每个团队甚至特定比赛使用一个主题。</p><h3 id="_3-2-客户端" tabindex="-1"><a class="header-anchor" href="#_3-2-客户端"><span>3.2. 客户端</span></a></h3><p><strong>客户端是我们的应用程序的一个实例，安装在给定的移动设备上或在浏览器上运行</strong>。为了接收通知，客户端使用适当的SDK API调用在我们的Firebase项目中注册自己。</p><p>成功注册后，客户端从Firebase获取一个唯一的注册令牌。通常，这个令牌被发送到服务器端，以便用于直接通知。</p><h3 id="_3-3-订阅" tabindex="-1"><a class="header-anchor" href="#_3-3-订阅"><span>3.3. 订阅</span></a></h3><p><strong>订阅表示客户端和主题之间的关联</strong>。服务器应用程序使用一个API调用创建新的订阅，该调用采用一个或多个客户端注册令牌和一个主题名称。</p><h2 id="_4-firebase项目设置" tabindex="-1"><a class="header-anchor" href="#_4-firebase项目设置"><span>4. Firebase项目设置</span></a></h2><p>Firebase项目作为我们将与应用程序一起使用的云资源的容器。Google提供了一个无成本的初始层，允许开发人员尝试可用的服务，并仅支付超出可用配额的部分。</p><p>因此，要使用FCM，我们的第一步是使用Firebase的控制台创建一个新项目。一旦我们登录，我们将获得Firebase的主页：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/BAEL_5900_Fig2-1024x384.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在这里，我们可以选择添加一个新项目或选择一个现有项目。让我们选择前者。这将启动一个向导，收集创建新项目所需的信息。</p><p>首先，我们必须为我们的项目命名：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/BAEL_5900_Fig3.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>注意，在通知的名称下，有一个带有为此项目生成的内部ID的按钮。通常，我们不需要更改它，但如果我们出于某种原因不喜欢它，我们可以点击它并使用不同的一个。<strong>还要注意，虽然项目ID是唯一的，但项目名称不是唯一的，这可能会有点令人困惑。</strong></p><p>下一步，我们可以选择为我们的项目添加分析。我们将禁用此选项，因为我们不需要本教程。如果需要，我们可以稍后启用它。</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/BAEL_5900_Fig4.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>一旦我们点击“创建项目”，Firebase将重定向我们到新创建的项目管理页面。</p><h2 id="_5-生成服务帐户" tabindex="-1"><a class="header-anchor" href="#_5-生成服务帐户"><span>5. 生成服务帐户</span></a></h2><p><strong>为了让服务器端应用程序能够对Firebase服务进行API调用，我们需要生成一个新的服务帐户并获取其凭据</strong>。我们可以通过访问项目设置页面并选择“服务帐户”选项卡来实现这一点：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/BAEL_5900_Fig6.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>任何新项目都从一个可以在这个项目中基本上做任何事情的管理员服务帐户开始。<strong>我们将在测试中使用它，但现实世界中的应用程序应该创建一个具有有限权限的专用服务帐户。</strong> 这样做需要一些IAM（Google的身份和访问管理）知识，这超出了本教程的范围。</p><p>现在，我们必须点击“生成新的私钥”按钮，以下载一个包含调用Firebase API所需数据的JSON文件。不用说，我们必须将此文件存储在安全的位置。</p><h2 id="_6-maven依赖项" tabindex="-1"><a class="header-anchor" href="#_6-maven依赖项"><span>6. Maven依赖项</span></a></h2><p>现在我们已经准备好了Firebase项目，是时候编写将发送通知的服务器组件的代码了。除了常规的Spring Boot MVC应用程序启动器之外，我们还必须添加_firebase-admin_依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`com.google.firebase\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`firebase-admin\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`9.1.1\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个依赖项的最新版本可在Maven Central上找到。</p><h2 id="_7-firebase消息配置" tabindex="-1"><a class="header-anchor" href="#_7-firebase消息配置"><span>7. Firebase消息配置</span></a></h2><p><strong>_FirebaseMessaging_类是我们使用FCM发送消息的主要接口</strong>。由于这个类是线程安全的，我们将在_@Configuration_类的_@Bean_方法中创建它的一个单一实例，并使其对我们的控制器可用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token class-name">FirebaseMessaging</span> <span class="token function">firebaseMessaging</span><span class="token punctuation">(</span><span class="token class-name">FirebaseApp</span> firebaseApp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">FirebaseMessaging</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>firebaseApp<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>非常简单，但我们现在必须提供一个_FirebaseApp_。或者，我们可以使用_getInstance()_的无参数变体，它也能完成工作，但不让我们更改任何默认参数。</p><p>为了解决这个问题，让我们创建另一个_@Bean_方法，创建一个定制的_FirebaseApp_实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token class-name">FirebaseApp</span> <span class="token function">firebaseApp</span><span class="token punctuation">(</span><span class="token class-name">GoogleCredentials</span> credentials<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">FirebaseOptions</span> options <span class="token operator">=</span> <span class="token class-name">FirebaseOptions</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">setCredentials</span><span class="token punctuation">(</span>credentials<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token class-name">FirebaseApp</span><span class="token punctuation">.</span><span class="token function">initializeApp</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，唯一的定制是使用特定的_GoogleCredentials_对象。_FirebaseOptions_的构建器允许我们调整Firebase客户端的其他方面：</p><ul><li>超时</li><li>HTTP请求工厂</li><li>特定服务的自定义端点</li><li>线程工厂</li></ul><p>最后一块配置是凭据本身。我们将创建另一个_@Bean_，使用通过配置属性提供的服务帐户或使用默认的凭据链创建_GoogleCredentials_实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token class-name">GoogleCredentials</span> <span class="token function">googleCredentials</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>firebaseProperties<span class="token punctuation">.</span><span class="token function">getServiceAccount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">InputStream</span> is <span class="token operator">=</span> firebaseProperties<span class="token punctuation">.</span><span class="token function">getServiceAccount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">GoogleCredentials</span><span class="token punctuation">.</span><span class="token function">fromStream</span><span class="token punctuation">(</span>is<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 使用标准凭据链。在GKE内部运行时很有用</span>
        <span class="token keyword">return</span> <span class="token class-name">GoogleCredentials</span><span class="token punctuation">.</span><span class="token function">getApplicationDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这种方法简化了在本地机器上的测试，我们可能有多份服务帐户文件。</strong> 我们可以使用标准的_GOOGLE_APPLICATION_CREDENTIALS_环境变量指向正确的文件，但更改它有点麻烦。</p><h2 id="_8-向主题发送消息" tabindex="-1"><a class="header-anchor" href="#_8-向主题发送消息"><span>8. 向主题发送消息</span></a></h2><p>向主题发送消息需要两个步骤：构建一个_Message_对象并使用_FirebaseMessaging_的方法之一发送它。<strong>_Message_实例是使用熟悉的构建器模式创建的：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Message</span> msg <span class="token operator">=</span> <span class="token class-name">Message</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setTopic</span><span class="token punctuation">(</span>topic<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">putData</span><span class="token punctuation">(</span><span class="token string">&quot;body&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;some data&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们有了_Message_实例，我们就使用_send()_来请求其交付：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> id <span class="token operator">=</span> fcm<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，_fcm_是我们注入到控制器类中的_FirebaseMessaging_实例。_send()_返回的值是FCM生成的消息标识符。我们可以使用这标识符进行跟踪或记录。</p><p><em>send()<em>还有一个异步版本_sendAsync()</em>，它返回一个_ApiFuture_对象。这个类扩展了Java的_Future</em>，所以我们可以很容易地用它与像Project Reactor这样的响应式框架一起使用。</p><h2 id="_9-向特定客户端发送消息" tabindex="-1"><a class="header-anchor" href="#_9-向特定客户端发送消息"><span>9. 向特定客户端发送消息</span></a></h2><p>正如我们之前提到的，每个客户端都有一个与其相关联的唯一订阅令牌。我们在构建_Message_时使用此令牌作为其“地址”，而不是主题名称：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Message</span> msg <span class="token operator">=</span> <span class="token class-name">Message</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setToken</span><span class="token punctuation">(</span>registrationToken<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">putData</span><span class="token punctuation">(</span><span class="token string">&quot;body&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;some data&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于我们想要向多个客户端发送相同消息的用例，我们可以使用_MulticastMessage_和_sendMulticast()_。它们的工作方式与单播版本相同，但允许我们在单个调用中向多达五百个客户端发送消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">MulticastMessage</span> msg <span class="token operator">=</span> <span class="token class-name">MulticastMessage</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">addAllTokens</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getRegistrationTokens</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">putData</span><span class="token punctuation">(</span><span class="token string">&quot;body&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;some data&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">BatchResponse</span> response <span class="token operator">=</span> fcm<span class="token punctuation">.</span><span class="token function">sendMulticast</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回的_BatchResponse_包含生成的消息标识符和与给定客户端的交付相关的任何错误。</p><h2 id="_10-向多个主题发送消息" tabindex="-1"><a class="header-anchor" href="#_10-向多个主题发送消息"><span>10. 向多个主题发送消息</span></a></h2><p>FCM允许我们指定一个条件来定义消息的目标受众。**_条件_是一个逻辑expression that selects clients based on topics to which they’ve subscribed (or not). For instance, given three topics (T1, T2, and T3), this expression targets devices that are subscribers of T1 or T2 but not T3:</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">(</span><span class="token char">&#39;T1&#39;</span> in topics <span class="token operator">||</span> <span class="token char">&#39;T2&#39;</span> in topics<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token punctuation">(</span><span class="token char">&#39;T3&#39;</span> in topics<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Here, the <code>topics</code> variable represents all topics a given client has subscribed to. We can now build a message addressed to clients that satisfy this condition using the <code>setCondition()</code> method available in the builder:</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Message</span> msg <span class="token operator">=</span> <span class="token class-name">Message</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setCondition</span><span class="token punctuation">(</span><span class="token string">&quot;(&#39;T1&#39; in topics || &#39;T2&#39; in topics) &amp;&amp; !(&#39;T3&#39; in topics)&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">putData</span><span class="token punctuation">(</span><span class="token string">&quot;body&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;some data&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> id <span class="token operator">=</span> fcm<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_11-subscribing-clients-to-topics" tabindex="-1"><a class="header-anchor" href="#_11-subscribing-clients-to-topics"><span>11. Subscribing Clients to Topics</span></a></h2><p>We use the <code>subscribeToTopic()</code> (or its async variant <code>subscribeToTopicAsync()</code>) method to create a subscription that associates a client with a topic. The method accepts a list of client registration tokens and a topic name as arguments:</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>fcm<span class="token punctuation">.</span><span class="token function">subscribeToTopic</span><span class="token punctuation">(</span>registrationTokens<span class="token punctuation">,</span> topic<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Notice that, in contrast to other messaging systems, the returned value has no identifier for the created subscriptions. <strong>If we want to keep track of which topics a given client has subscribed to, we must do it ourselves</strong>.</p><p>To unsubscribe a client, we use <code>unsubscribeFromTopic()</code>:</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>fcm<span class="token punctuation">.</span><span class="token function">unsubscribeFromTopic</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>registrationToken<span class="token punctuation">)</span><span class="token punctuation">,</span> topic<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_12-conclusion" tabindex="-1"><a class="header-anchor" href="#_12-conclusion"><span>12. Conclusion</span></a></h2><p>In this tutorial, we’ve shown how to send notification messages to web and mobile applications using Google’s Firebase Cloud Messaging service.</p><p>As usual, the full code is available over on GitHub.</p><figure><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>OK</p>`,80),i=[p];function o(c,l){return a(),s("div",null,i)}const d=n(t,[["render",o],["__file","2024-07-11-Using Firebase Cloud Messaging in Spring Boot Applications.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Using%20Firebase%20Cloud%20Messaging%20in%20Spring%20Boot%20Applications.html","title":"使用Firebase Cloud Messaging在Spring Boot应用程序中的实现","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Spring Boot","Firebase Cloud Messaging"],"tag":["FCM","Push Notifications"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Firebase Cloud Messaging, push notifications, web applications, mobile applications"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Using%20Firebase%20Cloud%20Messaging%20in%20Spring%20Boot%20Applications.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Firebase Cloud Messaging在Spring Boot应用程序中的实现"}],["meta",{"property":"og:description","content":"使用Firebase Cloud Messaging在Spring Boot应用程序中的实现 在这个快速教程中，我们将展示如何使用Google的Firebase Cloud Messaging（简称FCM）向Web和移动应用程序发送推送通知。 2. FCM是什么？ Firebase Cloud Messaging，简称FCM，是一个基于云的消息服务，提..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/11/BAEL_5900_Architecture.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T21:40:57.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"FCM"}],["meta",{"property":"article:tag","content":"Push Notifications"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T21:40:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Firebase Cloud Messaging在Spring Boot应用程序中的实现\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/11/BAEL_5900_Architecture.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/11/BAEL_5900_Fig2-1024x384.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/11/BAEL_5900_Fig3.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/11/BAEL_5900_Fig4.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/11/BAEL_5900_Fig6.png\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T21:40:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Firebase Cloud Messaging在Spring Boot应用程序中的实现 在这个快速教程中，我们将展示如何使用Google的Firebase Cloud Messaging（简称FCM）向Web和移动应用程序发送推送通知。 2. FCM是什么？ Firebase Cloud Messaging，简称FCM，是一个基于云的消息服务，提..."},"headers":[{"level":2,"title":"2. FCM是什么？","slug":"_2-fcm是什么","link":"#_2-fcm是什么","children":[]},{"level":2,"title":"3. 应用程序架构","slug":"_3-应用程序架构","link":"#_3-应用程序架构","children":[{"level":3,"title":"3.1. 主题","slug":"_3-1-主题","link":"#_3-1-主题","children":[]},{"level":3,"title":"3.2. 客户端","slug":"_3-2-客户端","link":"#_3-2-客户端","children":[]},{"level":3,"title":"3.3. 订阅","slug":"_3-3-订阅","link":"#_3-3-订阅","children":[]}]},{"level":2,"title":"4. Firebase项目设置","slug":"_4-firebase项目设置","link":"#_4-firebase项目设置","children":[]},{"level":2,"title":"5. 生成服务帐户","slug":"_5-生成服务帐户","link":"#_5-生成服务帐户","children":[]},{"level":2,"title":"6. Maven依赖项","slug":"_6-maven依赖项","link":"#_6-maven依赖项","children":[]},{"level":2,"title":"7. Firebase消息配置","slug":"_7-firebase消息配置","link":"#_7-firebase消息配置","children":[]},{"level":2,"title":"8. 向主题发送消息","slug":"_8-向主题发送消息","link":"#_8-向主题发送消息","children":[]},{"level":2,"title":"9. 向特定客户端发送消息","slug":"_9-向特定客户端发送消息","link":"#_9-向特定客户端发送消息","children":[]},{"level":2,"title":"10. 向多个主题发送消息","slug":"_10-向多个主题发送消息","link":"#_10-向多个主题发送消息","children":[]},{"level":2,"title":"11. Subscribing Clients to Topics","slug":"_11-subscribing-clients-to-topics","link":"#_11-subscribing-clients-to-topics","children":[]},{"level":2,"title":"12. Conclusion","slug":"_12-conclusion","link":"#_12-conclusion","children":[]}],"git":{"createdTime":1720734057000,"updatedTime":1720734057000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":8.12,"words":2436},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Using Firebase Cloud Messaging in Spring Boot Applications.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>在这个快速教程中，我们将展示如何使用Google的Firebase Cloud Messaging（简称FCM）向Web和移动应用程序发送推送通知。</p>\\n<h2>2. FCM是什么？</h2>\\n<p>Firebase Cloud Messaging，简称FCM，是一个基于云的消息服务，提供以下功能：</p>\\n<ul>\\n<li>可靠地向移动或Web应用程序发送消息，这里统称为“客户端”</li>\\n<li>使用主题或基于订阅的地址向所有或特定客户端发送消息</li>\\n<li>在服务器应用程序中接收来自客户端的消息</li>\\n</ul>\\n<p>以下是这项技术在现实世界应用的一些示例：</p>","autoDesc":true}');export{d as comp,g as data};
