import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CjxGxM8Y.js";const e={},p=t(`<hr><h1 id="在java中动态添加camel路由" tabindex="-1"><a class="header-anchor" href="#在java中动态添加camel路由"><span>在Java中动态添加Camel路由</span></a></h1><p>Apache Camel是一个Java框架，它简化了各种企业集成模式（EIPs）的实现，为企业提供解决方案。</p><p>在集成模式中，一个常见的任务是根据特定规则和条件在运行时确定消息路由。Apache Camel通过提供实现动态路由器EIP的方法简化了这一过程。</p><p>在本教程中，我们将深入了解如何在Apache Camel中实现动态路由，并演示一个示例。</p><h3 id="_2-理解动态路由器" tabindex="-1"><a class="header-anchor" href="#_2-理解动态路由器"><span>2. 理解动态路由器</span></a></h3><p>有时，我们希望根据运行时的特定规则和条件将消息发送到不同的路由。像路由滑片EIP这样的解决方案可以帮助解决问题，但由于它使用试错法，效率较低。</p><p>在路由滑片EIP中，消息包含按定义顺序路由的端点列表。这需要预先配置端点列表，并使用试错法通过每个端点发送消息。</p><p>动态路由器EIP提供了更好的实现，可以在运行时添加路由，特别是在我们有多个接收者或根本没有接收者的情况下。它提供了在没有预先配置严格端点的情况下路由消息的灵活性。</p><p>此外，它知道每个目的地和将消息路由到特定目的地的规则。<strong>此外，它有一个控制通道，潜在目的地通过在启动时宣布它们的存在和参与规则来进行通信。</strong></p><p>它还在规则库中存储了所有可能目的地的规则。一旦消息到达，它就会检查规则库并满足接收者的请求。</p><p>这里有一张显示动态路由器EIP内部结构的图片：</p><p><strong>此外，一个常见的用例是动态服务发现，客户端应用程序可以通过发送包含服务名称的消息来访问服务。</strong></p><p>动态路由器EIP的核心目标是将路由决策推迟到运行时，而不是提前构建静态规则。</p><h3 id="_3-maven依赖" tabindex="-1"><a class="header-anchor" href="#_3-maven依赖"><span>3. Maven依赖</span></a></h3><p>让我们通过向_pom.xml_添加_camel-core_和_camel-test-junit5_来启动一个简单的Apache Camel项目：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.apache.camel\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`camel-core\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`4.3.0\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`

\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.apache.camel\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`camel-test-junit5\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`4.3.0\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Camel Core提供了动态路由器EIP和其他路由功能，Camel Test JUnit5通过_CamelSupport_接口使测试消息路由变得更容易。</p><p>值得注意的是，我们也可以将Camel项目作为Spring Boot项目启动。</p><h3 id="_4-使用动态路由器在运行时添加路由" tabindex="-1"><a class="header-anchor" href="#_4-使用动态路由器在运行时添加路由"><span>4. 使用动态路由器在运行时添加路由</span></a></h3><p>动态路由器EIP确保我们为集成系统指定规则，以帮助在运行时正确匹配到特定路由。它检查传入消息的正文，并将其匹配到路由。</p><h4 id="_4-1-配置" tabindex="-1"><a class="header-anchor" href="#_4-1-配置"><span>4.1. 配置</span></a></h4><p>首先，让我们创建一个名为_DynamicRouteBean_的类，并添加一个方法来定义规则和条件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">DynamicRouterBean</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">route</span><span class="token punctuation">(</span><span class="token class-name">String</span> body<span class="token punctuation">,</span> <span class="token annotation punctuation">@ExchangeProperties</span> <span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\` properties<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> invoked <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> properties<span class="token punctuation">.</span><span class="token function">getOrDefault</span><span class="token punctuation">(</span><span class="token string">&quot;invoked&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>

        properties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;invoked&quot;</span><span class="token punctuation">,</span> invoked<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>invoked <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">switch</span> <span class="token punctuation">(</span>body<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">case</span> <span class="token string">&quot;mock&quot;</span><span class="token operator">:</span>
                    <span class="token keyword">return</span> <span class="token string">&quot;mock:dynamicRouter&quot;</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token string">&quot;direct&quot;</span><span class="token operator">:</span>
                    <span class="token keyword">return</span> <span class="token string">&quot;mock:directDynamicRouter&quot;</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token string">&quot;seda&quot;</span><span class="token operator">:</span>
                    <span class="token keyword">return</span> <span class="token string">&quot;mock:sedaDynamicRouter&quot;</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token string">&quot;file&quot;</span><span class="token operator">:</span>
                    <span class="token keyword">return</span> <span class="token string">&quot;mock:fileDynamicRouter&quot;</span><span class="token punctuation">;</span>
                <span class="token keyword">default</span><span class="token operator">:</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们根据传入消息正文和当前调用次数动态确定适当的路由。_route()_方法检查消息正文是否与任何预定义的关键字规则匹配，并返回相应的路由。</p><p>此外，我们在_Map_对象上使用了_@ExchangeProperties_注解。<strong>此映射用作存储和检索交换的当前状态并更新调用次数的容器。</strong></p><p>_invoked_变量表示_route()_方法被调用的次数。**如果消息匹配预定义条件，并且是第一次调用，则返回相应的路由。_invoked == 1_检查有助于在第一次调用时执行动态路由逻辑。**这简化了此特定情况下的代码，并防止了不必要的重新执行。</p><p><strong>此外，为了防止动态路由器的无限执行，_route()<em>方法在路由到适当端点后返回_null</em>。这确保了在基于消息确定路由后，动态路由将结束。</strong></p><p>简而言之，_route()<em>方法在每次交换时被调用，直到返回_null</em>。</p><p>最后，让我们在我们的Camel路由构建器中配置动态路由器EIP：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">DynamicRouterRoute</span> <span class="token keyword">extends</span> <span class="token class-name">RouteBuilder</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;direct:dynamicRouter&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">dynamicRouter</span><span class="token punctuation">(</span><span class="token function">method</span><span class="token punctuation">(</span><span class="token class-name">DynamicRouterBean</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">&quot;route&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们创建了扩展_RouteBuilder_的_DynamicRouterRoute_类。接下来，我们覆盖了configure方法，并通过调用_dyamicRouter()<em>方法将动态路由器调用连接到我们的自定义_route()</em>。</p><p>值得注意的是，我们可以在定义我们规则的方法上使用_@DynamicRouter_注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">DynamicRouterBean</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@DynamicRouter</span>
    <span class="token class-name">String</span> <span class="token function">route</span><span class="token punctuation">(</span><span class="token class-name">String</span> body<span class="token punctuation">,</span> <span class="token annotation punctuation">@ExchangeProperties</span> <span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\` properties<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该注解消除了在Camel路由中显式配置_dynamicRouter()_方法的需要：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// ...</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;direct:dynamicRouter&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">bean</span><span class="token punctuation">(</span><span class="token class-name">DynamicRouterBean</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">&quot;route&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们使用_bean()_方法指定包含路由逻辑的类。不再需要_dynamicRouter()_方法，因为_route()<em>方法带有</em>@DynamicRouter_注解。</p><h3 id="_4-2-单元测试" tabindex="-1"><a class="header-anchor" href="#_4-2-单元测试"><span>4.2. 单元测试</span></a></h3><p>让我们编写一个单元测试来断言某些条件是否为真。首先，让我们确保我们的测试类扩展_CamelTestSupport_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">DynamicRouterRouteUnitTest</span> <span class="token keyword">extends</span> <span class="token class-name">CamelTestSupport</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token class-name">RoutesBuilder</span> <span class="token function">createRouteBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DynamicRouterRoute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，为测试提供_DynamicRouterRoute_的实例，用作路由构建器。</p><p>接下来，让我们看看名为_mock_的传入消息正文：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenMockEndpointExpectedMessageCountOneAndMockAsMessageBody_thenMessageSentToDynamicRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token class-name">MockEndpoint</span> mockDynamicEndpoint <span class="token operator">=</span> <span class="token function">getMockEndpoint</span><span class="token punctuation">(</span><span class="token string">&quot;mock:dynamicRouter&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    mockDynamicEndpoint<span class="token punctuation">.</span><span class="token function">expectedMessageCount</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    template<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;direct:dynamicRouter&quot;</span><span class="token punctuation">,</span> exchange <span class="token operator">-&gt;</span> exchange<span class="token punctuation">.</span><span class="token function">getIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setBody</span><span class="token punctuation">(</span><span class="token string">&quot;mock&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">MockEndpoint</span><span class="token punctuation">.</span><span class="token function">assertIsSatisfied</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们模拟动态端点并将其期望的消息路由设置为其值。接下来，我们将期望的消息计数设置为一。最后，我们设置一个传入的消息路由，期望的正文消息，并断言_MockEndpoint_路由已满足。</p><p>同样，让我们模拟“<em>mock:directDynamicRouter</em>”消息路由：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenMockEndpointExpectedMessageCountOneAndDirectAsMessageBody_thenMessageSentToDynamicRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token class-name">MockEndpoint</span> mockDynamicEndpoint <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getEndpoint</span><span class="token punctuation">(</span><span class="token string">&quot;mock:directDynamicRouter&quot;</span><span class="token punctuation">,</span> <span class="token class-name">MockEndpoint</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    mockDynamicEndpoint<span class="token punctuation">.</span><span class="token function">expectedMessageCount</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    template<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;direct:dynamicRouter&quot;</span><span class="token punctuation">,</span> exchange <span class="token operator">-&gt;</span> exchange<span class="token punctuation">.</span><span class="token function">getIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setBody</span><span class="token punctuation">(</span><span class="token string">&quot;direct&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">MockEndpoint</span><span class="token punctuation">.</span><span class="token function">assertIsSatisfied</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此测试验证了当“<em>direct</em>”作为消息正文发送时，它会被动态路由到“<em>mock:directDynamicRouter</em>”端点。<strong>此外，我们将期望的消息计数设置为一，表示端点应接收的消息交换数量。</strong></p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们学习了如何使用Apache Camel中的动态路由器EIP在运行时添加路由。与使用试错法将消息发送到路由的路由滑片不同，动态路由器EIP提供了一个坚实的实现，根据特定的规则和条件路由到端点。</p><p>一如既往，示例的完整源代码可在GitHub上找到。</p>`,50),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-22-Add Camel Route at Runtime in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Add%20Camel%20Route%20at%20Runtime%20in%20Java.html","title":"在Java中动态添加Camel路由","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Java","Apache Camel"],"tag":["动态路由","企业集成模式"],"head":[["meta",{"name":"keywords","content":"Apache Camel, 动态路由, Java, 企业集成"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Add%20Camel%20Route%20at%20Runtime%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中动态添加Camel路由"}],["meta",{"property":"og:description","content":"在Java中动态添加Camel路由 Apache Camel是一个Java框架，它简化了各种企业集成模式（EIPs）的实现，为企业提供解决方案。 在集成模式中，一个常见的任务是根据特定规则和条件在运行时确定消息路由。Apache Camel通过提供实现动态路由器EIP的方法简化了这一过程。 在本教程中，我们将深入了解如何在Apache Camel中实现..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T08:32:01.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"动态路由"}],["meta",{"property":"article:tag","content":"企业集成模式"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T08:32:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中动态添加Camel路由\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T08:32:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中动态添加Camel路由 Apache Camel是一个Java框架，它简化了各种企业集成模式（EIPs）的实现，为企业提供解决方案。 在集成模式中，一个常见的任务是根据特定规则和条件在运行时确定消息路由。Apache Camel通过提供实现动态路由器EIP的方法简化了这一过程。 在本教程中，我们将深入了解如何在Apache Camel中实现..."},"headers":[{"level":3,"title":"2. 理解动态路由器","slug":"_2-理解动态路由器","link":"#_2-理解动态路由器","children":[]},{"level":3,"title":"3. Maven依赖","slug":"_3-maven依赖","link":"#_3-maven依赖","children":[]},{"level":3,"title":"4. 使用动态路由器在运行时添加路由","slug":"_4-使用动态路由器在运行时添加路由","link":"#_4-使用动态路由器在运行时添加路由","children":[]},{"level":3,"title":"4.2. 单元测试","slug":"_4-2-单元测试","link":"#_4-2-单元测试","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719045121000,"updatedTime":1719045121000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.7,"words":1711},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Add Camel Route at Runtime in Java.md","localizedDate":"2024年6月22日","excerpt":"<hr>\\n<h1>在Java中动态添加Camel路由</h1>\\n<p>Apache Camel是一个Java框架，它简化了各种企业集成模式（EIPs）的实现，为企业提供解决方案。</p>\\n<p>在集成模式中，一个常见的任务是根据特定规则和条件在运行时确定消息路由。Apache Camel通过提供实现动态路由器EIP的方法简化了这一过程。</p>\\n<p>在本教程中，我们将深入了解如何在Apache Camel中实现动态路由，并演示一个示例。</p>\\n<h3>2. 理解动态路由器</h3>\\n<p>有时，我们希望根据运行时的特定规则和条件将消息发送到不同的路由。像路由滑片EIP这样的解决方案可以帮助解决问题，但由于它使用试错法，效率较低。</p>","autoDesc":true}');export{d as comp,k as data};
