import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-B6f8H54y.js";const e={},p=t('<hr><h1 id="如何模拟-httpservletrequest-对象" tabindex="-1"><a class="header-anchor" href="#如何模拟-httpservletrequest-对象"><span>如何模拟 HttpServletRequest 对象</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本快速教程中，<strong>我们将探讨几种模拟 <em>HttpServletRequest</em> 对象的方法</strong>。</p><p>首先，我们将从 Spring 测试库中的完全功能模拟类型——<em>MockHttpServletRequest</em> 开始。然后，我们将看到如何使用两个流行的模拟库——Mockito 和 JMockit 进行测试。最后，我们将看到如何使用匿名子类进行测试。</p><h2 id="_2-测试-httpservletrequest" tabindex="-1"><a class="header-anchor" href="#_2-测试-httpservletrequest"><span>2. 测试 <em>HttpServletRequest</em></span></a></h2><p>当我们要模拟客户端请求信息如 <em>HttpServletRequest</em> 时，测试 Servlet 可能会变得棘手。此外，这个接口定义了各种方法，并且有不同的方式来模拟这些方法。</p><p>让我们看看我们想要测试的目标 <em>UserServlet</em> 类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserServlet</span> <span class="token keyword">extends</span> <span class="token class-name">HttpServlet</span> <span class="token punctuation">{</span>\n    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doGet</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n        <span class="token class-name">String</span> firstName <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">&quot;firstName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">String</span> lastName <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">&quot;lastName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        response<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;Full Name: &quot;</span> <span class="token operator">+</span> firstName <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> lastName<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了单元测试 <em>doGet()</em> 方法，我们需要模拟 <em>request</em> 和 <em>response</em> 参数以模拟实际运行时的行为。</p><h2 id="_3-使用-spring-中的-mockhttpservletrequest" tabindex="-1"><a class="header-anchor" href="#_3-使用-spring-中的-mockhttpservletrequest"><span>3. 使用 Spring 中的 <em>MockHttpServletRequest</em></span></a></h2><p>Spring-Test 库提供了一个完全功能的类 <em>MockHttpServletRequest</em>，它实现了 <em>HttpServletRequest</em> 接口。</p><p>尽管这个库主要针对测试 Spring 应用程序，<strong>我们可以使用它的 <em>MockHttpServletRequest</em> 类而不实现任何 Spring 特定的功能。换句话说，即使应用程序不使用 Spring，我们仍然可以仅依赖这个库来模拟 <em>HttpServletRequest</em> 对象</strong>。</p><p>让我们将这个依赖项添加到 pom.xml：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.springframework```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```spring-test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```5.3.20```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们看看如何使用这个类来测试 <em>UserServlet</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenHttpServletRequest_whenUsingMockHttpServletRequest_thenReturnsParameterValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n    <span class="token class-name">MockHttpServletRequest</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MockHttpServletRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    request<span class="token punctuation">.</span><span class="token function">setParameter</span><span class="token punctuation">(</span><span class="token string">&quot;firstName&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Spring&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    request<span class="token punctuation">.</span><span class="token function">setParameter</span><span class="token punctuation">(</span><span class="token string">&quot;lastName&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">MockHttpServletResponse</span> response <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MockHttpServletResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    servlet<span class="token punctuation">.</span><span class="token function">doGet</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">getContentAsString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Full Name: Spring Test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以注意到实际上并没有涉及模拟。我们使用了完全功能的请求和响应对象，并仅用几行代码测试了目标类。<strong>因此，测试代码是干净、可读和可维护的</strong>。</p><h2 id="_4-使用模拟框架" tabindex="-1"><a class="header-anchor" href="#_4-使用模拟框架"><span>4. 使用模拟框架</span></a></h2><p>或者，<strong>模拟框架提供了一个干净且简单的 API 来测试模拟对象，这些对象模仿原始对象的运行时行为</strong>。</p><p>它们的优点包括它们的表达能力和开箱即用的能力来模拟 <em>静态</em> 和 <em>私有</em> 方法。此外，我们可以避免大部分需要模拟的样板代码（与自定义实现相比），而是专注于测试。</p><h3 id="_4-1-使用-mockito" tabindex="-1"><a class="header-anchor" href="#_4-1-使用-mockito"><span>4.1. 使用 Mockito</span></a></h3><p>Mockito 是一个流行的开源测试自动化框架，它内部使用 Java 反射 API 来创建模拟对象。</p><p>让我们从将 mockito-core 依赖项添加到我们的 <em>pom.xml</em> 开始：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.mockito```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```mockito-core```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```4.4.0```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们看看如何模拟 <em>HttpServletRequest</em> 对象的 <em>getParameter()</em> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenHttpServletRequest_whenMockedWithMockito_thenReturnsParameterValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 模拟 HttpServletRequest 和 HttpServletResponse</span>\n    <span class="token class-name">HttpServletRequest</span> request <span class="token operator">=</span> <span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">HttpServletResponse</span> response <span class="token operator">=</span> <span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// 模拟 request.getParameterMap() 返回的值</span>\n    <span class="token function">when</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">&quot;firstName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;Mockito&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">when</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">&quot;lastName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;Test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">when</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span>writer<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    servlet<span class="token punctuation">.</span><span class="token function">doGet</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>writer<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Full Name: Mockito Test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-使用-jmockit" tabindex="-1"><a class="header-anchor" href="#_4-2-使用-jmockit"><span>4.2. 使用 JMockit</span></a></h3><p>JMockit 是一个提供有用记录和验证语法的模拟 API（我们可以用它来测试 JUnit 和 TestNG）。它是 Java EE 和基于 Spring 的应用程序的容器外集成测试库。让我们看看如何使用 JMockit 模拟 <em>HttpServletRequest</em>。</p><p>首先，我们将 <em>jmockit</em> 依赖项添加到我们的项目中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.jmockit```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```jmockit```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```1.49```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们继续在测试类中进行模拟实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mocked</span>\n<span class="token class-name">HttpServletRequest</span> mockRequest<span class="token punctuation">;</span>\n<span class="token annotation punctuation">@Mocked</span>\n<span class="token class-name">HttpServletResponse</span> mockResponse<span class="token punctuation">;</span>\n\n<span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenHttpServletRequest_whenMockedWithJMockit_thenReturnsParameterValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n    <span class="token keyword">new</span> <span class="token class-name">Expectations</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>\n        mockRequest<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">&quot;firstName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> result <span class="token operator">=</span> <span class="token string">&quot;JMockit&quot;</span><span class="token punctuation">;</span>\n        mockRequest<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">&quot;lastName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> result <span class="token operator">=</span> <span class="token string">&quot;Test&quot;</span><span class="token punctuation">;</span>\n        mockResponse<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span>writer<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    servlet<span class="token punctuation">.</span><span class="token function">doGet</span><span class="token punctuation">(</span>mockRequest<span class="token punctuation">,</span> mockResponse<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>writer<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Full Name: JMockit Test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在上面看到的，通过几行设置，我们成功地使用模拟 <em>HttpServletRequest</em> 对象测试了目标类。</p><p>因此，<strong>模拟框架可以为我们节省大量的工作量，并使单元测试更快地编写</strong>。相反，要使用模拟对象，需要理解模拟 API，通常需要一个单独的框架。</p><h2 id="_5-使用匿名子类" tabindex="-1"><a class="header-anchor" href="#_5-使用匿名子类"><span>5. 使用匿名子类</span></a></h2><p>一些项目可能有依赖约束或更喜欢直接控制他们自己的测试类实现。具体来说，这在更大的 servlet 代码库中可能很有用，其中自定义实现的可重用性很重要。在这些情况下，匿名类很有用。</p><p><strong>匿名类是没有名称的内部类</strong>。<strong>此外，它们实现起来很快，并提供对实际对象的直接控制</strong>。如果我们不想为测试包含额外的依赖项，可以考虑这种方法。</p><p>现在，让我们创建一个实现 <em>HttpServletRequest</em> 接口的匿名子类，并使用它来测试 <em>doGet()</em> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">HttpServletRequest</span> <span class="token function">getRequest</span><span class="token punctuation">(</span><span class="token class-name">Map</span>```<span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>``` params<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">HttpServletRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">public</span> <span class="token class-name">Map</span>```<span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>``` <span class="token function">getParameterMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> params<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> values <span class="token operator">=</span> params<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>values <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> values<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n            <span class="token keyword">return</span> values<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token comment">// 更多方法需要实现</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们将这个请求传递给正在测试的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenHttpServletRequest_whenUsingAnonymousClass_thenReturnsParameterValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n    <span class="token keyword">final</span> <span class="token class-name">Map</span>```<span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>``` params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    params<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;firstName&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token string">&quot;Anonymous Class&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    params<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;lastName&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token string">&quot;Test&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    servlet<span class="token punctuation">.</span><span class="token function">doGet</span><span class="token punctuation">(</span><span class="token function">getRequest</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">getResponse</span><span class="token punctuation">(</span>writer<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>writer<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Full Name: Anonymous Class Test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这种方法的缺点是需要为所有抽象方法创建一个带有虚拟实现的匿名类。此外，嵌套对象如 <em>HttpSession</em> 可能需要特定的实现</strong>。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们讨论了在为 servlet 编写单元测试时模拟 <em>HttpServletRequest</em> 对象的几个选项。除了使用模拟框架，我们看到了使用 <em>MockHttpServletRequest</em> 类进行测试似乎比自定义实现更干净和高效。</p><p>一如既往，这些示例的代码可以在 GitHub 上找到。</p>',46),o=[p];function c(l,u){return a(),s("div",null,o)}const r=n(e,[["render",c],["__file","2024-07-18-How to Mock HttpServletRequest.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-How%20to%20Mock%20HttpServletRequest.html","title":"如何模拟 HttpServletRequest 对象","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Testing & Mocking","Java Servlets"],"tag":["Java","Testing","Mockito","JMockit","Spring"],"head":[["meta",{"name":"keywords","content":"Java, Testing, Mockito, JMockit, Spring, HttpServletRequest"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-How%20to%20Mock%20HttpServletRequest.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何模拟 HttpServletRequest 对象"}],["meta",{"property":"og:description","content":"如何模拟 HttpServletRequest 对象 1. 概述 在本快速教程中，我们将探讨几种模拟 HttpServletRequest 对象的方法。 首先，我们将从 Spring 测试库中的完全功能模拟类型——MockHttpServletRequest 开始。然后，我们将看到如何使用两个流行的模拟库——Mockito 和 JMockit 进行测试..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T04:09:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Testing"}],["meta",{"property":"article:tag","content":"Mockito"}],["meta",{"property":"article:tag","content":"JMockit"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T04:09:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何模拟 HttpServletRequest 对象\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T04:09:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何模拟 HttpServletRequest 对象 1. 概述 在本快速教程中，我们将探讨几种模拟 HttpServletRequest 对象的方法。 首先，我们将从 Spring 测试库中的完全功能模拟类型——MockHttpServletRequest 开始。然后，我们将看到如何使用两个流行的模拟库——Mockito 和 JMockit 进行测试..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 测试 HttpServletRequest","slug":"_2-测试-httpservletrequest","link":"#_2-测试-httpservletrequest","children":[]},{"level":2,"title":"3. 使用 Spring 中的 MockHttpServletRequest","slug":"_3-使用-spring-中的-mockhttpservletrequest","link":"#_3-使用-spring-中的-mockhttpservletrequest","children":[]},{"level":2,"title":"4. 使用模拟框架","slug":"_4-使用模拟框架","link":"#_4-使用模拟框架","children":[{"level":3,"title":"4.1. 使用 Mockito","slug":"_4-1-使用-mockito","link":"#_4-1-使用-mockito","children":[]},{"level":3,"title":"4.2. 使用 JMockit","slug":"_4-2-使用-jmockit","link":"#_4-2-使用-jmockit","children":[]}]},{"level":2,"title":"5. 使用匿名子类","slug":"_5-使用匿名子类","link":"#_5-使用匿名子类","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721275782000,"updatedTime":1721275782000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.75,"words":1426},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-How to Mock HttpServletRequest.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>如何模拟 HttpServletRequest 对象</h1>\\n<h2>1. 概述</h2>\\n<p>在本快速教程中，<strong>我们将探讨几种模拟 <em>HttpServletRequest</em> 对象的方法</strong>。</p>\\n<p>首先，我们将从 Spring 测试库中的完全功能模拟类型——<em>MockHttpServletRequest</em> 开始。然后，我们将看到如何使用两个流行的模拟库——Mockito 和 JMockit 进行测试。最后，我们将看到如何使用匿名子类进行测试。</p>\\n<h2>2. 测试 <em>HttpServletRequest</em></h2>","autoDesc":true}');export{r as comp,d as data};
