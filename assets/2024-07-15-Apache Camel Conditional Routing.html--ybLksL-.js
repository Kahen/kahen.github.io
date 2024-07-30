import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CbPcg273.js";const e={},p=t(`<hr><h1 id="apache-camel-条件路由-baeldung" tabindex="-1"><a class="header-anchor" href="#apache-camel-条件路由-baeldung"><span>Apache Camel 条件路由 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span><strong>1. 概述</strong></span></a></h2><p>Apache Camel 是一个功能强大的开源集成框架，实现了多种已知的企业集成模式。</p><p>通常在使用 Camel 进行消息路由时，我们希望根据消息内容以不同的方式处理消息。为此，Camel 提供了一个强大的特性，称为基于内容的路由器，它来自 EIP 模式集合。</p><p>在本教程中，<strong>我们将探讨几种基于某些条件路由消息的方法。</strong></p><h2 id="_2-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-依赖项"><span><strong>2. 依赖项</strong></span></a></h2><p>我们开始所需的全部是将 <em>camel-spring-boot-starter</em> 添加到我们的 <em>pom.xml</em>：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.apache.camel.springboot\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`camel-spring-boot-starter\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`4.3.0\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们需要将 <em>camel-test-spring-junit5</em> 依赖项添加到我们的 <em>pom.xml</em>：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.apache.camel\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`camel-test-spring-junit5\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`4.3.0\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>顾名思义，此依赖项专门用于我们的单元测试。</p><h2 id="_3-定义一个简单的-camel-spring-boot-应用程序" tabindex="-1"><a class="header-anchor" href="#_3-定义一个简单的-camel-spring-boot-应用程序"><span><strong>3. 定义一个简单的 Camel Spring Boot 应用程序</strong></span></a></h2><p>本教程的示例重点将是一个简单的 Apache Camel Spring Boot 应用程序。</p><p>让我们从定义我们的应用程序入口点开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConditionalRoutingSpringApplication</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">ConditionalRoutingSpringApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，这是一个标准的 Spring Boot 应用程序。</p><p>快速回顾一下，Apache Camel 中的路由是构建块的基本单元，通常由 Camel 按顺序执行的一系列步骤组成，这些步骤消费并处理消息。</p><p>例如，路由通常会使用来自磁盘上的文件或消息队列的消费者接收消息。然后，Camel 执行路由中的其余步骤，这些步骤以某种方式处理消息或将其发送到其他端点。</p><p>毫无疑问，<strong>我们希望根据某些事实有条件地路由消息。为此，Camel 提供了 <em>choice</em> 和 <em>when</em> 构造</strong>。我们可以将其视为 Java 中的 <em>if-else</em> 语句的等价物。</p><p>考虑到这一点，让我们继续创建我们的第一个带有一些条件逻辑的路由。</p><h2 id="_5-创建路由" tabindex="-1"><a class="header-anchor" href="#_5-创建路由"><span><strong>5. 创建路由</strong></span></a></h2><p>在这个例子中，我们将根据接收到的消息正文内容定义一个基本的路由：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConditionalBodyRouter</span> <span class="token keyword">extends</span> <span class="token class-name">RouteBuilder</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>

        <span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;direct:start-conditional&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">routeId</span><span class="token punctuation">(</span><span class="token string">&quot;conditional-body-route&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">choice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">setBody</span><span class="token punctuation">(</span><span class="token function">simple</span><span class="token punctuation">(</span><span class="token string">&quot;Goodbye, Baeldung!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;mock:result-body&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">otherwise</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;mock:result-body&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在我们的琐碎示例中看到的，我们配置我们的路由以从称为 <em>start-conditional</em> 的直接端点消费消息。</p><p>现在让我们浏览一下我们路由的关键部分：</p><ul><li>首先，我们使用 <em>choice()</em> 方法开始路由 - <strong>这告诉 Camel 接下来的行将包含一些要评估的条件</strong></li><li>接下来，<em>when()</em> 方法指示要评估的新条件 - 在这个例子中，我们简单地检查消息正文是否包含字符串 Baeldung。我们可以添加尽可能多的 when 条件</li><li>为了结束我们的路由，我们使用 <em>otherwise()</em> 方法定义当前面的 when 条件都不满足时应该做什么。</li><li>最后，使用 <em>end()</em> 方法终止路由，这将关闭选择块。</li></ul><p>总之，当我们运行我们的路由时，如果我们的消息正文包含字符串 <em>Baeldung</em>，我们将把消息正文设置为 <em>Goodbye, Baeldung!</em> 并将结果发送到一个称为 <em>result-body</em> 的模拟端点。</p><p>或者，我们将只将原始消息路由到我们的模拟端点。</p><h2 id="_6-测试路由" tabindex="-1"><a class="header-anchor" href="#_6-测试路由"><span><strong>6. 测试路由</strong></span></a></h2><p>考虑到上一节，让我们继续编写一个单元测试来探索我们的路由的行为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token annotation punctuation">@CamelSpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">ConditionalBodyRouterUnitTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">ProducerTemplate</span> template<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@EndpointInject</span><span class="token punctuation">(</span><span class="token string">&quot;mock:result-body&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">MockEndpoint</span> mock<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">whenSendBodyWithBaeldung_thenGoodbyeMessageReceivedSuccessfully</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        mock<span class="token punctuation">.</span><span class="token function">expectedBodiesReceived</span><span class="token punctuation">(</span><span class="token string">&quot;Goodbye, Baeldung!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        template<span class="token punctuation">.</span><span class="token function">sendBody</span><span class="token punctuation">(</span><span class="token string">&quot;direct:start-conditional&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Hello Baeldung Readers!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        mock<span class="token punctuation">.</span><span class="token function">assertIsSatisfied</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们的测试由三个简单的步骤组成：</p><ul><li>首先，让我们设置一个期望，我们的模拟端点将接收给定的消息正文</li><li>然后我们将消息发送到我们的 <em>direct:start-conditional</em> 端点，使用我们的模板。注意，我们将确保我们的消息正文包含字符串 <em>Baeldung</em></li><li>为了结束我们的测试，<strong>我们使用 <em>assertIsSatisfied</em> 方法来验证我们对模拟端点的初始期望是否已经满足</strong></li></ul><p>此测试确认我们的条件路由工作正常。太棒了！</p><p>请务必查看我们之前的教程，了解更多关于如何为我们的 Camel 路由编写可靠、自包含的单元测试的信息。</p><h2 id="_7-构建其他条件谓词" tabindex="-1"><a class="header-anchor" href="#_7-构建其他条件谓词"><span><strong>7. 构建其他条件谓词</strong></span></a></h2><p>到目前为止，我们已经探索了构建我们的 when 谓词的一个选项 - 检查我们的交换消息正文。然而，我们还有几种其他选项可用。</p><p>例如，<strong>我们也可以通过检查给定消息头的值来控制我们的条件：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConditionalHeaderRouter</span> <span class="token keyword">extends</span> <span class="token class-name">RouteBuilder</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>

        <span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;direct:start-conditional-header&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">routeId</span><span class="token punctuation">(</span><span class="token string">&quot;conditional-header-route&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">choice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">&quot;fruit&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&quot;favourite&quot;</span><span class="token punctuation">,</span> <span class="token function">simple</span><span class="token punctuation">(</span><span class="token string">&quot;Apples&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;mock:result&quot;</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">otherwise</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&quot;favourite&quot;</span><span class="token punctuation">,</span> <span class="token function">header</span><span class="token punctuation">(</span><span class="token string">&quot;fruit&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;mock:result&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次，我们已经修改了 <em>when</em> 方法以查看名为 fruit 的头的值。在我们的 when 条件中使用 Camel 提供的 Simple 语言也是完全可能的。</p><h2 id="_8-使用-java-beans" tabindex="-1"><a class="header-anchor" href="#_8-使用-java-beans"><span><strong>8. 使用 Java Beans</strong></span></a></h2><p>此外，当我们想在我们的谓词中使用 Java 方法调用的结果时，我们也可以在 Camel Bean 语言中使用它。</p><p>首先，我们需要创建一个包含返回布尔值的方法的 Java bean：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FruitBean</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isApple</span><span class="token punctuation">(</span><span class="token class-name">Exchange</span> exchange<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Apple&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>exchange<span class="token punctuation">.</span><span class="token function">getIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span><span class="token string">&quot;fruit&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在这里，我们还可以选择性地添加 <em>Exchange</em> 作为参数，以便 Camel 自动将 <em>Exchange</em> 传递给我们的方法。</strong></p><p>然后我们可以继续在我们的 <em>when</em> 块中使用我们的 <em>FruitBean</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConditionalBeanRouter</span> <span class="token keyword">extends</span> <span class="token class-name">RouteBuilder</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>

        <span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;direct:start-conditional-bean&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">routeId</span><span class="token punctuation">(</span><span class="token string">&quot;conditional-bean-route&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">choice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span><span class="token function">method</span><span class="token punctuation">(</span><span class="token class-name">FruitBean</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">&quot;isApple&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&quot;favourite&quot;</span><span class="token punctuation">,</span> <span class="token function">simple</span><span class="token punctuation">(</span><span class="token string">&quot;Apples&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;mock:result&quot;</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">otherwise</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&quot;favourite&quot;</span><span class="token punctuation">,</span> <span class="token function">header</span><span class="token punctuation">(</span><span class="token string">&quot;fruit&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;mock:result&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">endChoice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-结论" tabindex="-1"><a class="header-anchor" href="#_9-结论"><span>9. 结论</span></a></h2><p>在本文中，我们学习了如何根据我们的路由中的某种条件路由消息。首先，我们创建了一个简单的 Camel 应用程序，其中包含一个检查消息正文的路由。</p><p>然后我们学习了使用消息头和 Java beans 在我们的路由中构建谓词的其他几种技术。</p><p>如常，本文的完整源代码可在 GitHub 上获取。</p>`,52),o=[p];function c(i,l){return a(),s("div",null,o)}const r=n(e,[["render",c],["__file","2024-07-15-Apache Camel Conditional Routing.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-15/2024-07-15-Apache%20Camel%20Conditional%20Routing.html","title":"Apache Camel 条件路由 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring","Apache Camel"],"tag":["Conditional Routing","Message Routing"],"head":[["meta",{"name":"keywords","content":"Apache Camel, Conditional Routing, Spring Boot, Enterprise Integration Patterns"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-15/2024-07-15-Apache%20Camel%20Conditional%20Routing.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Apache Camel 条件路由 | Baeldung"}],["meta",{"property":"og:description","content":"Apache Camel 条件路由 | Baeldung 1. 概述 Apache Camel 是一个功能强大的开源集成框架，实现了多种已知的企业集成模式。 通常在使用 Camel 进行消息路由时，我们希望根据消息内容以不同的方式处理消息。为此，Camel 提供了一个强大的特性，称为基于内容的路由器，它来自 EIP 模式集合。 在本教程中，我们将探讨几..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-15T03:12:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Conditional Routing"}],["meta",{"property":"article:tag","content":"Message Routing"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-15T03:12:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache Camel 条件路由 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-15T03:12:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Apache Camel 条件路由 | Baeldung 1. 概述 Apache Camel 是一个功能强大的开源集成框架，实现了多种已知的企业集成模式。 通常在使用 Camel 进行消息路由时，我们希望根据消息内容以不同的方式处理消息。为此，Camel 提供了一个强大的特性，称为基于内容的路由器，它来自 EIP 模式集合。 在本教程中，我们将探讨几..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 依赖项","slug":"_2-依赖项","link":"#_2-依赖项","children":[]},{"level":2,"title":"3. 定义一个简单的 Camel Spring Boot 应用程序","slug":"_3-定义一个简单的-camel-spring-boot-应用程序","link":"#_3-定义一个简单的-camel-spring-boot-应用程序","children":[]},{"level":2,"title":"5. 创建路由","slug":"_5-创建路由","link":"#_5-创建路由","children":[]},{"level":2,"title":"6. 测试路由","slug":"_6-测试路由","link":"#_6-测试路由","children":[]},{"level":2,"title":"7. 构建其他条件谓词","slug":"_7-构建其他条件谓词","link":"#_7-构建其他条件谓词","children":[]},{"level":2,"title":"8. 使用 Java Beans","slug":"_8-使用-java-beans","link":"#_8-使用-java-beans","children":[]},{"level":2,"title":"9. 结论","slug":"_9-结论","link":"#_9-结论","children":[]}],"git":{"createdTime":1721013144000,"updatedTime":1721013144000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.41,"words":1624},"filePathRelative":"posts/baeldung/2024-07-15/2024-07-15-Apache Camel Conditional Routing.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Apache Camel 条件路由 | Baeldung</h1>\\n<h2><strong>1. 概述</strong></h2>\\n<p>Apache Camel 是一个功能强大的开源集成框架，实现了多种已知的企业集成模式。</p>\\n<p>通常在使用 Camel 进行消息路由时，我们希望根据消息内容以不同的方式处理消息。为此，Camel 提供了一个强大的特性，称为基于内容的路由器，它来自 EIP 模式集合。</p>\\n<p>在本教程中，<strong>我们将探讨几种基于某些条件路由消息的方法。</strong></p>\\n<h2><strong>2. 依赖项</strong></h2>","autoDesc":true}');export{r as comp,k as data};
