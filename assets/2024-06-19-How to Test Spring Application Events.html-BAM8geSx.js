import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-uCPH-HyI.js";const e={},p=t(`<hr><h1 id="如何测试spring应用程序事件" tabindex="-1"><a class="header-anchor" href="#如何测试spring应用程序事件"><span>如何测试Spring应用程序事件</span></a></h1><p>在本教程中，我们将讨论使用Spring应用程序事件的代码测试。我们将从手动创建测试工具开始，这些工具帮助我们在测试目的下发布和收集应用程序事件。</p><p>之后，我们将探索Spring Modulith的测试库，并使用其流畅的场景API来讨论常见的测试案例。使用这种声明性DSL，我们将编写富有表现力的测试，这些测试可以轻松地产生和消费应用程序事件。</p><p><strong>Spring Framework提供应用程序事件，以允许组件在保持松散耦合的同时相互通信。</strong> 我们可以使用_ApplicationEventPublisher_ bean来发布内部事件，这些事件是普通的Java对象。因此，所有注册的监听器都会收到通知。</p><p>例如，<em>OrderService_组件可以在成功下单时发布_OrderCompletedEvent</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderService</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ApplicationEventPublisher</span> eventPublisher<span class="token punctuation">;</span>

    <span class="token comment">// 构造函数</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">placeOrder</span><span class="token punctuation">(</span><span class="token class-name">String</span> customerId<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> productIds<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Order</span> order <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Order</span><span class="token punctuation">(</span>customerId<span class="token punctuation">,</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>productIds<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 业务逻辑来验证和下单</span>

        <span class="token class-name">OrderCompletedEvent</span> event <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OrderCompletedEvent</span><span class="token punctuation">(</span>savedOrder<span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> savedOrder<span class="token punctuation">.</span><span class="token function">customerId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> savedOrder<span class="token punctuation">.</span><span class="token function">timestamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        eventPublisher<span class="token punctuation">.</span><span class="token function">publishEvent</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，完成的订单现在被发布为应用程序事件。因此，来自不同模块的组件现在可以监听这些事件并相应地做出反应。</p><p>假设_LoyaltyPointsService_对这些事件做出反应，以奖励客户忠诚度积分。为了实现这一点，我们可以利用Spring的_@EventListener_注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LoyaltyPointsService</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">ORDER_COMPLETED_POINTS</span> <span class="token operator">=</span> <span class="token number">60</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">LoyalCustomersRepository</span> loyalCustomers<span class="token punctuation">;</span>

    <span class="token comment">// 构造函数</span>

    <span class="token annotation punctuation">@EventListener</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onOrderCompleted</span><span class="token punctuation">(</span><span class="token class-name">OrderCompletedEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 业务逻辑来奖励客户</span>
        loyalCustomers<span class="token punctuation">.</span><span class="token function">awardPoints</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span><span class="token function">customerId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">ORDER_COMPLETED_POINTS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用应用程序事件而不是直接方法调用允许我们保持更松散的耦合，并反转两个模块之间的依赖关系</strong>。换句话说，&quot;orders&quot;模块没有对&quot;rewards&quot;模块中的类源代码的依赖。</p><h2 id="_3-测试事件监听器" tabindex="-1"><a class="header-anchor" href="#_3-测试事件监听器"><span>3. 测试事件监听器</span></a></h2><p><strong>我们可以通过在测试本身内部发布应用程序事件来测试使用_@EventListener_的组件。</strong></p><p>要测试_LoyaltyPointsService_，我们需要创建一个_@SpringBootTest,_ 注入_ApplicationEventPublisher_ bean，并使用它来发布_OrderCompletedEvent_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">EventListenerUnitTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">LoyalCustomersRepository</span> customers<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">ApplicationEventPublisher</span> testEventPublisher<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">whenPublishingOrderCompletedEvent_thenRewardCustomerWithLoyaltyPoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">OrderCompletedEvent</span> event <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OrderCompletedEvent</span><span class="token punctuation">(</span><span class="token string">&quot;order-1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;customer-1&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        testEventPublisher<span class="token punctuation">.</span><span class="token function">publishEvent</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 断言</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们需要断言_LoyaltyPointsService_消费了事件，并以正确的积分数量奖励了客户。让我们使用_LoyalCustomersRepository_来看看这个客户获得了多少忠诚度积分：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenPublishingOrderCompletedEvent_thenRewardCustomerWithLoyaltyPoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">OrderCompletedEvent</span> event <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OrderCompletedEvent</span><span class="token punctuation">(</span><span class="token string">&quot;order-1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;customer-1&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    testEventPublisher<span class="token punctuation">.</span><span class="token function">publishEvent</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>customers<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&quot;customer-1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">hasFieldOrPropertyWithValue</span><span class="token punctuation">(</span><span class="token string">&quot;customerId&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;customer-1&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">hasFieldOrPropertyWithValue</span><span class="token punctuation">(</span><span class="token string">&quot;points&quot;</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，测试通过了：事件被接收并由&quot;rewards&quot;模块处理，奖金被应用。</p><h2 id="_4-测试事件发布者" tabindex="-1"><a class="header-anchor" href="#_4-测试事件发布者"><span>4. 测试事件发布者</span></a></h2><p><strong>我们可以通过在测试包中创建自定义事件监听器来测试发布应用程序事件的组件。</strong> 这个监听器也将使用_@EventHandler_注解，类似于生产实现。然而，这次我们将把所有传入的事件收集到一个列表中，该列表将通过一个getter公开：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">class</span> <span class="token class-name">TestEventListener</span> <span class="token punctuation">{</span>

    <span class="token keyword">final</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">OrderCompletedEvent</span><span class="token punctuation">&gt;</span></span>\` events <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// getter</span>

    <span class="token annotation punctuation">@EventListener</span>
    <span class="token keyword">void</span> <span class="token function">onEvent</span><span class="token punctuation">(</span><span class="token class-name">OrderCompletedEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        events<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        events<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所观察到的，我们还可以添加实用程序_reset()<em>。我们可以在每个测试之前调用它，以清除上一个测试产生的事件。让我们创建Spring Boot测试并</em>@Autowire_我们的_TestEventListener_组件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">EventPublisherUnitTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">OrderService</span> orderService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">TestEventListener</span> testEventListener<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@BeforeEach</span>
    <span class="token keyword">void</span> <span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        testEventListener<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">whenPlacingOrder_thenPublishApplicationEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 下单</span>

        <span class="token function">assertThat</span><span class="token punctuation">(</span>testEventListener<span class="token punctuation">.</span><span class="token function">getEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token comment">// 验证发布的事件</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了完成测试，我们需要使用_OrderService_组件下订单。之后，我们将断言_testEventListener_收到了恰好一个应用程序事件，具有适当的属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenPlacingOrder_thenPublishApplicationEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    orderService<span class="token punctuation">.</span><span class="token function">placeOrder</span><span class="token punctuation">(</span><span class="token string">&quot;customer1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;product1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;product2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>testEventListener<span class="token punctuation">.</span><span class="token function">getEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">hasSize</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">hasFieldOrPropertyWithValue</span><span class="token punctuation">(</span><span class="token string">&quot;customerId&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;customer1&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">hasFieldOrProperty</span><span class="token punctuation">(</span><span class="token string">&quot;orderId&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">hasFieldOrProperty</span><span class="token punctuation">(</span><span class="token string">&quot;timestamp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们仔细观察，我们会注意到这两个测试的设置和验证是互补的。这个测试模拟了一个方法调用并监听发布的事件，而前一个测试发布一个事件并验证状态变化。换句话说，<strong>我们通过仅使用两个测试来测试整个过程：每个测试覆盖一个不同的部分，在逻辑模块边界处分割。</strong></p><h2 id="_5-spring-modulith的测试支持" tabindex="-1"><a class="header-anchor" href="#_5-spring-modulith的测试支持"><span>5. Spring Modulith的测试支持</span></a></h2><p>Spring Modulith提供了一组可以独立使用的工具。这些库提供了一系列功能，主要旨在在应用程序内建立清晰的逻辑模块边界。</p><h3 id="_5-1-场景api" tabindex="-1"><a class="header-anchor" href="#_5-1-场景api"><span>5.1. 场景API</span></a></h3><p>这种架构风格通过使用应用程序事件促进模块之间的灵活交互。因此，<strong>Spring Modulith中的一个工具提供了对涉及应用程序事件的测试流程的支持。</strong></p><p>让我们将_spring-modulith-starter-test_ maven依赖项添加到我们的_pom.xml_中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.springframework.modulith\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`spring-modulith-starter-test\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`1.1.3\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这使我们能够以声明性方式编写测试，使用场景API。首先，我们将创建一个测试类，并用_@ApplcationModuleTest_进行注解。结果，我们将能够在任何测试方法中注入_Scenario_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ApplicationModuleTest</span>
<span class="token keyword">class</span> <span class="token class-name">SpringModulithScenarioApiUnitTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token class-name">Scenario</span> scenario<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单来说，这个特性提供了一个方便的DSL，允许我们测试最常见的用例。例如，它使启动测试和评估其结果变得容易：</p><ul><li>执行方法调用</li><li>发布应用程序事件</li><li>验证状态变化</li><li>捕获和验证传出事件</li></ul><p>此外，API还提供了一些其他实用程序，例如：</p><ul><li>轮询和等待异步应用程序事件</li><li>定义超时</li><li>对捕获的事件执行过滤和映射</li><li>创建自定义断言</li></ul><h3 id="_5-2-使用场景api测试事件监听器" tabindex="-1"><a class="header-anchor" href="#_5-2-使用场景api测试事件监听器"><span>5.2. 使用场景API测试事件监听器</span></a></h3><p>要测试使用_@EventListener_方法的组件，我们必须注入_ApplicationEventPublisher_ bean并发布_OrderCompletedEvent_。然而，Spring Modulith的测试DSL通过_scenario.publish()_提供了一个更简单的解决方案：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenReceivingPublishOrderCompletedEvent_thenRewardCustomerWithLoyaltyPoints</span><span class="token punctuation">(</span><span class="token class-name">Scenario</span> scenario<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    scenario<span class="token punctuation">.</span><span class="token function">publish</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">OrderCompletedEvent</span><span class="token punctuation">(</span><span class="token string">&quot;order-1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;customer-1&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">andWaitForStateChange</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> loyalCustomers<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&quot;customer-1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">andVerify</span><span class="token punctuation">(</span>it <span class="token operator">-&gt;</span> <span class="token function">assertThat</span><span class="token punctuation">(</span>it<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">hasFieldOrPropertyWithValue</span><span class="token punctuation">(</span><span class="token string">&quot;customerId&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;customer-1&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">hasFieldOrPropertyWithValue</span><span class="token punctuation">(</span><span class="token string">&quot;points&quot;</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_andWaitforStateChange()<em>方法接受一个lambda表达式，它会重试执行，直到返回一个非_null_对象或非空_Optional</em>。这种机制对于异步方法调用特别有用。</p><p>总之，<strong>我们定义了一个场景，我们发布一个事件，等待状态变化，然后验证系统的最终状态。</strong></p><h3 id="_5-3-使用场景api测试事件发布者" tabindex="-1"><a class="header-anchor" href="#_5-3-使用场景api测试事件发布者"><span>5.3. 使用场景API测试事件发布者</span></a></h3><p><strong>我们还可以使用场景API模拟方法调用，并拦截并验证传出的应用程序事件。</strong> 让我们使用DSL编写一个测试，验证“<em>order</em>”模块的行为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenPlacingOrder_thenPublishOrderCompletedEvent</span><span class="token punctuation">(</span><span class="token class-name">Scenario</span> scenario<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    scenario<span class="token punctuation">.</span><span class="token function">stimulate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> orderService<span class="token punctuation">.</span><span class="token function">placeOrder</span><span class="token punctuation">(</span><span class="token string">&quot;customer-1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;product-1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;product-2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">andWaitForEventOfType</span><span class="token punctuation">(</span><span class="token class-name">OrderCompletedEvent</span><span class="token punctuation">.</span><span class="token function">classtoArriveAndVerify</span><span class="token punctuation">(</span>evt <span class="token operator">-&gt;</span> <span class="token function">assertThat</span><span class="token punctuation">(</span>evt<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">hasFieldOrPropertyWithValue</span><span class="token punctuation">(</span><span class="token string">&quot;customerId&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;customer-1&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">hasFieldOrProperty</span><span class="token punctuation">(</span><span class="token string">&quot;orderId&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">hasFieldOrProperty</span><span class="token punctuation">(</span><span class="token string">&quot;timestamp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，_andWaitforEventOfType()_方法允许我们声明我们想要捕获的事件类型。之后，_toArriveAndVerify()_被用来等待事件并执行相关的断言。</p><h1 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h1><p>在本文中，我们看到了使用Spring应用程序事件测试代码的多种方式。在我们的第一个测试中，我们使用_ApplicationEventPublisher_手动发布应用程序事件。</p><p>同样，我们创建了一个自定义_TestEventListener_，使用_@EventHandler_注解来捕获所有传出的事件。我们使用这个辅助组件在测试期间捕获并验证应用程序产生的事件。</p><p>之后，我们学习了Spring Modulith的测试支持，并使用场景API以声明性方式编写了相同的测试。流畅的DSL允许我们发布和捕获应用程序事件，模拟方法调用，并等待状态变化。</p><p>如常，完整的源代码可以在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。</p><p>OK</p>`,54),o=[p];function i(c,l){return a(),s("div",null,o)}const d=n(e,[["render",i],["__file","2024-06-19-How to Test Spring Application Events.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-19-How%20to%20Test%20Spring%20Application%20Events.html","title":"如何测试Spring应用程序事件","lang":"zh-CN","frontmatter":{"date":"2024-06-19T00:00:00.000Z","category":["Spring Framework","Testing"],"tag":["Testing","Events","Spring","Application Events"],"head":[["meta",{"name":"keywords","content":"Spring, Testing, Application Events, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-19-How%20to%20Test%20Spring%20Application%20Events.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何测试Spring应用程序事件"}],["meta",{"property":"og:description","content":"如何测试Spring应用程序事件 在本教程中，我们将讨论使用Spring应用程序事件的代码测试。我们将从手动创建测试工具开始，这些工具帮助我们在测试目的下发布和收集应用程序事件。 之后，我们将探索Spring Modulith的测试库，并使用其流畅的场景API来讨论常见的测试案例。使用这种声明性DSL，我们将编写富有表现力的测试，这些测试可以轻松地产生..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Testing"}],["meta",{"property":"article:tag","content":"Events"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:tag","content":"Application Events"}],["meta",{"property":"article:published_time","content":"2024-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何测试Spring应用程序事件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何测试Spring应用程序事件 在本教程中，我们将讨论使用Spring应用程序事件的代码测试。我们将从手动创建测试工具开始，这些工具帮助我们在测试目的下发布和收集应用程序事件。 之后，我们将探索Spring Modulith的测试库，并使用其流畅的场景API来讨论常见的测试案例。使用这种声明性DSL，我们将编写富有表现力的测试，这些测试可以轻松地产生..."},"headers":[{"level":2,"title":"3. 测试事件监听器","slug":"_3-测试事件监听器","link":"#_3-测试事件监听器","children":[]},{"level":2,"title":"4. 测试事件发布者","slug":"_4-测试事件发布者","link":"#_4-测试事件发布者","children":[]},{"level":2,"title":"5. Spring Modulith的测试支持","slug":"_5-spring-modulith的测试支持","link":"#_5-spring-modulith的测试支持","children":[{"level":3,"title":"5.1. 场景API","slug":"_5-1-场景api","link":"#_5-1-场景api","children":[]},{"level":3,"title":"5.2. 使用场景API测试事件监听器","slug":"_5-2-使用场景api测试事件监听器","link":"#_5-2-使用场景api测试事件监听器","children":[]},{"level":3,"title":"5.3. 使用场景API测试事件发布者","slug":"_5-3-使用场景api测试事件发布者","link":"#_5-3-使用场景api测试事件发布者","children":[]}]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.65,"words":1995},"filePathRelative":"posts/baeldung/Archive/2024-06-19-How to Test Spring Application Events.md","localizedDate":"2024年6月19日","excerpt":"<hr>\\n<h1>如何测试Spring应用程序事件</h1>\\n<p>在本教程中，我们将讨论使用Spring应用程序事件的代码测试。我们将从手动创建测试工具开始，这些工具帮助我们在测试目的下发布和收集应用程序事件。</p>\\n<p>之后，我们将探索Spring Modulith的测试库，并使用其流畅的场景API来讨论常见的测试案例。使用这种声明性DSL，我们将编写富有表现力的测试，这些测试可以轻松地产生和消费应用程序事件。</p>\\n<p><strong>Spring Framework提供应用程序事件，以允许组件在保持松散耦合的同时相互通信。</strong> 我们可以使用_ApplicationEventPublisher_ bean来发布内部事件，这些事件是普通的Java对象。因此，所有注册的监听器都会收到通知。</p>","autoDesc":true}');export{d as comp,k as data};
