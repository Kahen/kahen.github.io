import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DpYLEM_u.js";const e={},p=t(`<h1 id="kotlin中的中介者模式-baeldung关于kotlin" tabindex="-1"><a class="header-anchor" href="#kotlin中的中介者模式-baeldung关于kotlin"><span>Kotlin中的中介者模式 | Baeldung关于Kotlin</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>开发者经常面临的一个挑战是管理系统中各个组件之间的通信。确实，这就是设计模式发挥作用的地方，它们为软件设计中常见的问题提供经过验证的解决方案。具体来说，设计模式是软件设计中特定上下文中经常出现问题的一种通用且可重用的解决方案。</p><p>在本教程中，我们将深入研究中介者模式，这是一种行为设计模式，并探索其在Kotlin中的实现。</p><p>中介者模式通过集中对象之间的通信来促进松散耦合，从而避免它们之间的直接连接。组件不是直接通信，而是通过中介者对象进行通信。此外，这个中介者封装了交互逻辑，允许组件独立且彼此不知情。</p><p>在中介者模式中，特别是关键组件协同工作以实现解耦和有组织的系统。让我们更深入地了解每个组件的角色和责任。</p><h3 id="_2-1-中介者" tabindex="-1"><a class="header-anchor" href="#_2-1-中介者"><span>2.1. 中介者</span></a></h3><p>中介者在中介者模式中充当中心枢纽，<strong>作为各种组件之间通信和协调的促进者</strong>。其主要职责包括：</p><ul><li>作为所有参与者遵守的通信接口</li><li>跟踪所有当前参与者的引用以便于它们之间的通信</li><li>在没有各个组件之间直接依赖的情况下协调参与者之间的信息流</li></ul><p>这些职责使中介者成为此模式中的中心控制点。确实，通过集中控制，中介者促进了更易于维护和扩展的系统。此外，通信逻辑的变更或新组件的添加可以在中介者中处理，减少了对各个组件的影响。</p><h3 id="_2-2-同事" tabindex="-1"><a class="header-anchor" href="#_2-2-同事"><span>2.2. 同事</span></a></h3><p><strong>同事是系统中通过中介者与其他组件交互的任何组件</strong>。其角色包括：</p><ul><li>维护对中介者的引用，以便同事可以在不直接引用其他同事的情况下发送和接收消息</li><li>通过中介者发送和接收消息以支持系统内的信息流</li></ul><p>这允许同事积极参与，通过响应消息和执行操作，同时为系统的整体行为做出贡献，而不必担心与其他组件的复杂连接。</p><h3 id="_2-3-协作动态" tabindex="-1"><a class="header-anchor" href="#_2-3-协作动态"><span>2.3. 协作动态</span></a></h3><p>中介者模式在同事之间建立了多对多的关系，允许灵活和动态的协作。<strong>同事可以通过中介者间接相互通信，促进了模块化和可扩展的架构</strong>。因此，该模式通过在中介者中封装通信逻辑，最小化了各个组件之间的依赖，增强了复杂系统的可维护性、可扩展性和可测试性。</p><h2 id="_3-在kotlin中的实现" tabindex="-1"><a class="header-anchor" href="#_3-在kotlin中的实现"><span>3. 在Kotlin中的实现</span></a></h2><p>在这一部分中，我们将在Kotlin中实现中介者模式。</p><h3 id="_3-1-没有中介者模式的紧密耦合示例" tabindex="-1"><a class="header-anchor" href="#_3-1-没有中介者模式的紧密耦合示例"><span>3.1. 没有中介者模式的紧密耦合示例</span></a></h3><p>我们将在我们的Kotlin代码中引入一个紧密耦合的场景，我们稍后将使用中介者模式来解决：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> <span class="token function">Airplane</span><span class="token punctuation">(</span><span class="token keyword">val</span> registrationNumber<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">val</span> otherAirplanes<span class="token operator">:</span> MutableList\`\`\`<span class="token operator">&lt;</span>Airplane<span class="token operator">&gt;</span>\`\`\` <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">fun</span> <span class="token function">addAirplane</span><span class="token punctuation">(</span>airplane<span class="token operator">:</span> Airplane<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        otherAirplanes<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>airplane<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">fun</span> <span class="token function">removeAirplane</span><span class="token punctuation">(</span>airplane<span class="token operator">:</span> Airplane<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        otherAirplanes<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>airplane<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">fun</span> <span class="token function">takeoff</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">registrationNumber</span></span><span class="token string"> is taking off.&quot;</span></span><span class="token punctuation">)</span>
        otherAirplanes<span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">removeAirplane</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
        otherAirplanes<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">fun</span> <span class="token function">land</span><span class="token punctuation">(</span>otherAirplanes<span class="token operator">:</span> List\`\`\`<span class="token operator">&lt;</span>Airplane<span class="token operator">&gt;</span>\`\`\`<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">registrationNumber</span></span><span class="token string"> is landing.&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>otherAirplanes<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>otherAirplanes<span class="token punctuation">)</span>
        otherAirplanes<span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">addAirplane</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，_takeoff()_方法展示了飞机之间的直接通信。它遍历其他飞机的列表，并调用它们的_removeAirplane()_方法，实质上是通知它们起飞。这在飞机之间创建了一个紧密的耦合，因为每架飞机都需要知道其他飞机及其方法。</p><p>类似地，_land()_方法通过调用它们的_addAirplane()_方法来建立与其他飞机的直接通信，通知它们着陆。</p><p><strong>这种直接通信在_Plane_对象之间创建了一个紧密的耦合，因为每架飞机都需要知道其他飞机的存在和行为。</strong></p><h3 id="_3-2-中介者模式的实现" tabindex="-1"><a class="header-anchor" href="#_3-2-中介者模式的实现"><span>3.2. 中介者模式的实现</span></a></h3><p>让我们看看如何使用中介者模式来处理相同的场景，以保持我们的代码可扩展性：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">interface</span> AirTrafficController <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">registerAirplane</span><span class="token punctuation">(</span>airplane<span class="token operator">:</span> Airplane<span class="token punctuation">)</span>
    <span class="token keyword">fun</span> <span class="token function">deregisterAirplane</span><span class="token punctuation">(</span>airplane<span class="token operator">:</span> Airplane<span class="token punctuation">)</span>
    <span class="token keyword">fun</span> <span class="token function">requestTakeOff</span><span class="token punctuation">(</span>airplane<span class="token operator">:</span> Airplane<span class="token punctuation">)</span>
    <span class="token keyword">fun</span> <span class="token function">requestLanding</span><span class="token punctuation">(</span>airplane<span class="token operator">:</span> Airplane<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token function">Airplane</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token keyword">val</span> registrationNumber<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">private</span> <span class="token keyword">val</span> controller<span class="token operator">:</span> AirTrafficController<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">takeOff</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">registrationNumber</span></span><span class="token string"> is requesting takeoff.&quot;</span></span><span class="token punctuation">)</span>
        controller<span class="token punctuation">.</span><span class="token function">requestTakeOff</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">fun</span> <span class="token function">land</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">registrationNumber</span></span><span class="token string"> is requesting landing.&quot;</span></span><span class="token punctuation">)</span>
        controller<span class="token punctuation">.</span><span class="token function">requestLanding</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">fun</span> <span class="token function">notifyTakeOff</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">registrationNumber</span></span><span class="token string"> has taken off.&quot;</span></span><span class="token punctuation">)</span>
        controller<span class="token punctuation">.</span><span class="token function">deregisterAirplane</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">fun</span> <span class="token function">notifyLanding</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">registrationNumber</span></span><span class="token string"> has landed.&quot;</span></span><span class="token punctuation">)</span>
        controller<span class="token punctuation">.</span><span class="token function">registerAirplane</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们已经引入了同事类和中介者接口，让我们看看我们的中介者的具体实现：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> AirTrafficControlTower <span class="token operator">:</span> AirTrafficController <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">val</span> registeredAirplanes<span class="token operator">:</span> MutableSet\`\`\`<span class="token operator">&lt;</span>Airplane<span class="token operator">&gt;</span>\`\`\` <span class="token operator">=</span> <span class="token function">mutableSetOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">registerAirplane</span><span class="token punctuation">(</span>airplane<span class="token operator">:</span> Airplane<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        registeredAirplanes<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>airplane<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">deregisterAirplane</span><span class="token punctuation">(</span>airplane<span class="token operator">:</span> Airplane<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        registeredAirplanes<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>airplane<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">requestTakeOff</span><span class="token punctuation">(</span>airplane<span class="token operator">:</span> Airplane<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>registeredAirplanes<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>airplane<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            airplane<span class="token punctuation">.</span><span class="token function">notifyTakeOff</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">requestLanding</span><span class="token punctuation">(</span>airplane<span class="token operator">:</span> Airplane<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>registeredAirplanes<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>airplane<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            airplane<span class="token punctuation">.</span><span class="token function">notifyLanding</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，_Plane_对象并不直接相互通信。相反，它们通过_AirTrafficController_接口进行通信。_AirTrafficControlTower_实现了_AirTrafficController_接口，并处理飞机之间的通信。</p><p>_Plane_类向_AirTrafficController_注册和注销自己，并使用控制器请求起飞和着陆。控制器决定是否批准或拒绝这些请求。</p><p>这个例子展示了飞机的解耦，允许它们通过中介者_Air Traffic Controller_进行通信，而无需了解彼此。</p><h3 id="_4-1-中介者模式的优点" tabindex="-1"><a class="header-anchor" href="#_4-1-中介者模式的优点"><span>4.1. 中介者模式的优点</span></a></h3><p>中介者模式无疑具有一些明显的优势，可以帮助处理项目复杂性：</p><ul><li>通过使用中介者，设计实现了对通信逻辑的集中控制，简化了不同组件之间的交互。<strong>值得注意的是，该模式允许在中介者内无缝修改通信逻辑，而不会对各个组件造成干扰，从而促进了适应性和易于维护，在动态的软件环境中。</strong></li><li>在具有许多交互组件和复杂通信需求的架构中，中介者模式大放异彩。这种模式允许组件通过中央中介间接通信，减少了组件之间的依赖。</li></ul><h3 id="_4-2-中介者模式的缺点" tabindex="-1"><a class="header-anchor" href="#_4-2-中介者模式的缺点"><span>4.2. 中介者模式的缺点</span></a></h3><p>虽然中介者模式在解耦和集中通信管理方面提供了各种优势，但承认其潜在的缺点也很重要：</p><ul><li>引入中介者有时可能导致整个系统复杂性的增加。随着中介者数量及其责任的增长，管理和理解组件之间的交互可能变得更加具有挑战性。</li><li>中介者成为通信的中心点。如果中介者失败或出现问题，整个系统的通信可能会受到威胁，可能导致单点故障。</li></ul><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了中介者模式，这是管理复杂系统中通信的强大工具，促进了可维护性和灵活性。在Kotlin中，其实现简洁而优雅，展示了该语言在有效表达设计模式方面的能力。因此，通过采用中介者模式，开发者可以创建模块化且易于扩展和维护的系统。</p><p>本文讨论的示例的完整源代码可在GitHub上找到。</p>`,41),o=[p];function i(l,c){return a(),s("div",null,o)}const k=n(e,[["render",i],["__file","2024-07-21-Mediator Pattern in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Mediator%20Pattern%20in%20Kotlin.html","title":"Kotlin中的中介者模式 | Baeldung关于Kotlin","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Design Patterns","Kotlin"],"tag":["Mediator Pattern","Kotlin"],"head":[["meta",{"name":"keywords","content":"design pattern, kotlin, mediator pattern, software design"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Mediator%20Pattern%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中的中介者模式 | Baeldung关于Kotlin"}],["meta",{"property":"og:description","content":"Kotlin中的中介者模式 | Baeldung关于Kotlin 1. 引言 开发者经常面临的一个挑战是管理系统中各个组件之间的通信。确实，这就是设计模式发挥作用的地方，它们为软件设计中常见的问题提供经过验证的解决方案。具体来说，设计模式是软件设计中特定上下文中经常出现问题的一种通用且可重用的解决方案。 在本教程中，我们将深入研究中介者模式，这是一种行..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T05:13:51.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Mediator Pattern"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T05:13:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中的中介者模式 | Baeldung关于Kotlin\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T05:13:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中的中介者模式 | Baeldung关于Kotlin 1. 引言 开发者经常面临的一个挑战是管理系统中各个组件之间的通信。确实，这就是设计模式发挥作用的地方，它们为软件设计中常见的问题提供经过验证的解决方案。具体来说，设计模式是软件设计中特定上下文中经常出现问题的一种通用且可重用的解决方案。 在本教程中，我们将深入研究中介者模式，这是一种行..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[{"level":3,"title":"2.1. 中介者","slug":"_2-1-中介者","link":"#_2-1-中介者","children":[]},{"level":3,"title":"2.2. 同事","slug":"_2-2-同事","link":"#_2-2-同事","children":[]},{"level":3,"title":"2.3. 协作动态","slug":"_2-3-协作动态","link":"#_2-3-协作动态","children":[]}]},{"level":2,"title":"3. 在Kotlin中的实现","slug":"_3-在kotlin中的实现","link":"#_3-在kotlin中的实现","children":[{"level":3,"title":"3.1. 没有中介者模式的紧密耦合示例","slug":"_3-1-没有中介者模式的紧密耦合示例","link":"#_3-1-没有中介者模式的紧密耦合示例","children":[]},{"level":3,"title":"3.2. 中介者模式的实现","slug":"_3-2-中介者模式的实现","link":"#_3-2-中介者模式的实现","children":[]},{"level":3,"title":"4.1. 中介者模式的优点","slug":"_4-1-中介者模式的优点","link":"#_4-1-中介者模式的优点","children":[]},{"level":3,"title":"4.2. 中介者模式的缺点","slug":"_4-2-中介者模式的缺点","link":"#_4-2-中介者模式的缺点","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721538831000,"updatedTime":1721538831000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.06,"words":1817},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Mediator Pattern in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>开发者经常面临的一个挑战是管理系统中各个组件之间的通信。确实，这就是设计模式发挥作用的地方，它们为软件设计中常见的问题提供经过验证的解决方案。具体来说，设计模式是软件设计中特定上下文中经常出现问题的一种通用且可重用的解决方案。</p>\\n<p>在本教程中，我们将深入研究中介者模式，这是一种行为设计模式，并探索其在Kotlin中的实现。</p>\\n<p>中介者模式通过集中对象之间的通信来促进松散耦合，从而避免它们之间的直接连接。组件不是直接通信，而是通过中介者对象进行通信。此外，这个中介者封装了交互逻辑，允许组件独立且彼此不知情。</p>\\n<p>在中介者模式中，特别是关键组件协同工作以实现解耦和有组织的系统。让我们更深入地了解每个组件的角色和责任。</p>","autoDesc":true}');export{k as comp,d as data};
