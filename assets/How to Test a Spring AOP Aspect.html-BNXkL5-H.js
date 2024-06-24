import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-vmNGnVQr.js";const p={},e=t('<h1 id="如何测试spring-aop切面-baeldung" tabindex="-1"><a class="header-anchor" href="#如何测试spring-aop切面-baeldung"><span>如何测试Spring AOP切面 | Baeldung</span></a></h1><p>现在，新版的《REST With Spring - &quot;REST With Spring Boot&quot;》终于发布了，当前价格将在6月22日之前有效，之后将永久上涨50美元。</p><p><strong>&gt;获取访问权限</strong></p><p><strong>现在</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>面向切面编程（AOP）通过将跨领域关注点分离到一个基本单元，称为切面，从而改善程序设计，这个单元与主应用程序逻辑分开。Spring AOP是一个框架，它帮助我们轻松实现切面。</p><p>AOP切面与其他软件组件没有什么不同。它们需要不同的测试来验证它们的正确性。在本教程中，我们将学习如何对Spring AOP切面进行单元测试和集成测试。</p><h2 id="_2-aop是什么" tabindex="-1"><a class="header-anchor" href="#_2-aop是什么"><span>2. AOP是什么？</span></a></h2><p>AOP是一种编程范式，它补充了面向对象编程（OOP），将跨应用程序的特定功能模块化，这些功能是跨应用程序的。<strong>在OOP中，类是基本单元，而在AOP中，切面是基本单元。</strong> 日志记录和事务管理是跨领域关注点的典型例子。</p><p>一个切面由两个组成部分组成。一个是定义跨领域关注点逻辑的advice，另一个是指定在应用程序执行期间何时应用逻辑的pointcut。</p><p>下表提供了常见AOP术语的概述：</p><table><thead><tr><th>术语</th><th>描述</th></tr></thead><tbody><tr><td>关注点</td><td>应用程序的特定功能。</td></tr><tr><td>跨领域关注点</td><td>跨越应用程序多个部分的特定功能。</td></tr><tr><td>切面</td><td>包含advice和pointcut以实现跨领域关注点的AOP基本单元。</td></tr><tr><td>Advice</td><td>我们想要在跨领域关注点中调用的特定逻辑。</td></tr><tr><td>Pointcut</td><td>选择将应用advice的连接点的表达式。</td></tr><tr><td>连接点</td><td>应用程序的执行点，例如方法。</td></tr></tbody></table><h2 id="_3-执行时间记录" tabindex="-1"><a class="header-anchor" href="#_3-执行时间记录"><span>3. 执行时间记录</span></a></h2><p>在这一部分，让我们创建一个示例切面，记录连接点周围的执行时间。</p><h3 id="_3-1-maven依赖项" tabindex="-1"><a class="header-anchor" href="#_3-1-maven依赖项"><span>3.1. Maven依赖项</span></a></h3><p><strong>有不同的Java AOP框架，例如Spring AOP和AspectJ。</strong> 在本教程中，我们将使用Spring AOP，并在我们的_pom.xml_中包含以下依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.springframework.boot```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```spring-boot-starter-aop```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```3.2.5```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于日志记录部分，我们选择SLF4J作为API和SLF4J简单提供者作为日志实现。SLF4J是一个门面，提供不同日志实现的统一API。</p><p>因此，我们还在_pom.xml_中包含SLF4J API和SLF4J简单提供者依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.slf4j```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```slf4j-api```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```2.0.13```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.slf4j```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```slf4j-simple```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```2.0.13```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-执行时间切面" tabindex="-1"><a class="header-anchor" href="#_3-2-执行时间切面"><span>3.2. 执行时间切面</span></a></h3><p>我们的_ExecutionTimeAspect_类很简单，只包含一个advice <em>logExecutionTime()</em>。<strong>我们使用_@Aspect_和_@Component_注解来声明它是一个切面，并使Spring能够管理它：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Aspect</span>\n<span class="token annotation punctuation">@Component</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExecutionTimeAspect</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">Logger</span> log <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">ExecutionTimeAspect</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Around</span><span class="token punctuation">(</span><span class="token string">&quot;execution(* com.baeldung.unittest.ArraySorting.sort(..))&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">logExecutionTime</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> joinPoint<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>\n        <span class="token keyword">long</span> t <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Object</span> result <span class="token operator">=</span> joinPoint<span class="token punctuation">.</span><span class="token function">proceed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Execution time=&quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> t<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;ms&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> result<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_@Around_注解指示advice _logExecutionTime()_围绕由pointcut表达式_execution(…)_定义的目标连接点运行。</strong> 在Spring AOP中，连接点总是一个方法。</p><h2 id="_4-对切面的单元测试" tabindex="-1"><a class="header-anchor" href="#_4-对切面的单元测试"><span>4. 对切面的单元测试</span></a></h2><p><strong>从单元测试的角度来看，我们只测试切面内部的逻辑，不包括任何依赖项，包括Spring应用程序上下文。</strong> 在这个例子中，我们使用Mockito来模拟_joinPoint_和logger，然后将模拟注入我们的测试切面。</p><p>单元测试类用_@ExtendWith(MockitoExtension.class)<em>注解，以启用JUnit 5的Mockito功能。它自动初始化模拟对象，并将它们注入到我们用</em>@InjectMocks_注解的测试单元中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ExtendWith</span><span class="token punctuation">(</span><span class="token class-name">MockitoExtension</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n<span class="token keyword">class</span> <span class="token class-name">ExecutionTimeAspectUnitTest</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Mock</span>\n    <span class="token keyword">private</span> <span class="token class-name">ProceedingJoinPoint</span> joinPoint<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Mock</span>\n    <span class="token keyword">private</span> <span class="token class-name">Logger</span> logger<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@InjectMocks</span>\n    <span class="token keyword">private</span> <span class="token class-name">ExecutionTimeAspect</span> aspect<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Test</span>\n    <span class="token keyword">void</span> <span class="token function">whenExecuteJoinPoint_thenLoggerInfoIsCalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>\n        <span class="token function">when</span><span class="token punctuation">(</span>joinPoint<span class="token punctuation">.</span><span class="token function">proceed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        aspect<span class="token punctuation">.</span><span class="token function">logExecutionTime</span><span class="token punctuation">(</span>joinPoint<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">verify</span><span class="token punctuation">(</span>joinPoint<span class="token punctuation">,</span> <span class="token function">times</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">proceed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">verify</span><span class="token punctuation">(</span>logger<span class="token punctuation">,</span> <span class="token function">times</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token function">anyString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试用例中，我们期望切面中的_joinPoint.proceed()_方法被调用一次。同样，logger的_info()_方法也应该被调用一次，以记录执行时间。</p><p>为了更精确地验证日志消息，我们可以使用_ArgumentCaptor_类来捕获日志消息。这使我们能够断言消息以“ <em>Execution time=</em>“开头：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ArgumentCaptor</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` argumentCaptor <span class="token operator">=</span> <span class="token class-name">ArgumentCaptor</span><span class="token punctuation">.</span><span class="token function">forClass</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">verify</span><span class="token punctuation">(</span>logger<span class="token punctuation">,</span> <span class="token function">times</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>argumentCaptor<span class="token punctuation">.</span><span class="token function">capture</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>argumentCaptor<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&quot;Execution time=&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-对切面的集成测试" tabindex="-1"><a class="header-anchor" href="#_5-对切面的集成测试"><span>5. 对切面的集成测试</span></a></h2><p>从集成测试的角度来看，我们需要类实现_ArraySorting_通过pointcut表达式将我们的advice应用于目标类。_sort()_方法简单地调用静态方法_Collections.sort()_对列表进行排序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ArraySorting</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> `<span class="token operator">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">Comparable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`<span class="token operator">&gt;</span> <span class="token keyword">void</span> <span class="token function">sort</span><span class="token punctuation">(</span><span class="token class-name">List</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>` list<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可能会出现一个问题：我们为什么不将我们的advice应用于静态方法_Collections.sort()_呢？<strong>这是Spring AOP的一个限制，它不能在静态方法上工作。</strong> Spring AOP创建动态代理来拦截方法调用。这种机制需要在目标对象上调用实际的方法，而静态方法可以在没有对象的情况下调用。<strong>如果我们需要拦截静态方法，我们必须采用另一种AOP框架，比如AspectJ，它支持编译时编织。</strong></p><p><strong>在集成测试中，我们需要Spring应用程序上下文来创建代理对象，以拦截目标方法并应用advice。</strong> 我们用_@SpringBootTest_注解集成测试类，以加载应用程序上下文，启用AOP和依赖注入功能：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>\n<span class="token keyword">class</span> <span class="token class-name">ExecutionTimeAspectIntegrationTest</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Autowired</span>\n    <span class="token keyword">private</span> <span class="token class-name">ArraySorting</span> arraySorting<span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`` <span class="token function">getRandomNumberList</span><span class="token punctuation">(</span><span class="token keyword">int</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`` numberList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> n <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> n <span class="token operator">&lt;</span> size<span class="token punctuation">;</span> n<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            numberList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> size<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">return</span> numberList<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Test</span>\n    <span class="token keyword">void</span> <span class="token function">whenSort_thenExecutionTimeIsPrinted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">ByteArrayOutputStream</span> baos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">PrintStream</span> originalSystemOut <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">;</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setOut</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PrintStream</span><span class="token punctuation">(</span>baos<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        arraySorting<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token function">getRandomNumberList</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setOut</span><span class="token punctuation">(</span>originalSystemOut<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">String</span> logOutput <span class="token operator">=</span> baos<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertThat</span><span class="token punctuation">(</span>logOutput<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Execution time=&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试方法可以分为三部分。最初，它将输出流重定向到专用缓冲区，以便稍后进行断言。随后，它调用_sort()<em>方法，该方法在切面中调用advice。重要的是通过</em>@Autowired_注入_ArraySorting_实例，而不是使用_new ArraySorting()_实例化。这确保了Spring AOP在目标类上激活。最后，它断言日志是否存在于缓冲区中。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们讨论了AOP的基本概念，并看到了如何在目标类上使用Spring AOP切面。我们还研究了如何使用单元测试和集成测试来测试切面，以验证切面的正确性。</p><p>如往常一样，代码示例可在GitHub上找到。</p><p>发表帖子后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>',42),o=[e];function c(i,l){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","How to Test a Spring AOP Aspect.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/How%20to%20Test%20a%20Spring%20AOP%20Aspect.html","title":"如何测试Spring AOP切面 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-17T00:00:00.000Z","category":["Spring AOP","Testing"],"tag":["AOP","Testing","Spring Boot"],"description":"如何测试Spring AOP切面 | Baeldung 现在，新版的《REST With Spring - \\"REST With Spring Boot\\"》终于发布了，当前价格将在6月22日之前有效，之后将永久上涨50美元。 >获取访问权限 现在 1. 概述 面向切面编程（AOP）通过将跨领域关注点分离到一个基本单元，称为切面，从而改善程序设计，这个单...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/How%20to%20Test%20a%20Spring%20AOP%20Aspect.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何测试Spring AOP切面 | Baeldung"}],["meta",{"property":"og:description","content":"如何测试Spring AOP切面 | Baeldung 现在，新版的《REST With Spring - \\"REST With Spring Boot\\"》终于发布了，当前价格将在6月22日之前有效，之后将永久上涨50美元。 >获取访问权限 现在 1. 概述 面向切面编程（AOP）通过将跨领域关注点分离到一个基本单元，称为切面，从而改善程序设计，这个单..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"AOP"}],["meta",{"property":"article:tag","content":"Testing"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:published_time","content":"2024-06-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何测试Spring AOP切面 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. AOP是什么？","slug":"_2-aop是什么","link":"#_2-aop是什么","children":[]},{"level":2,"title":"3. 执行时间记录","slug":"_3-执行时间记录","link":"#_3-执行时间记录","children":[{"level":3,"title":"3.1. Maven依赖项","slug":"_3-1-maven依赖项","link":"#_3-1-maven依赖项","children":[]},{"level":3,"title":"3.2. 执行时间切面","slug":"_3-2-执行时间切面","link":"#_3-2-执行时间切面","children":[]}]},{"level":2,"title":"4. 对切面的单元测试","slug":"_4-对切面的单元测试","link":"#_4-对切面的单元测试","children":[]},{"level":2,"title":"5. 对切面的集成测试","slug":"_5-对切面的集成测试","link":"#_5-对切面的集成测试","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.43,"words":1630},"filePathRelative":"posts/baeldung/Archive/How to Test a Spring AOP Aspect.md","localizedDate":"2024年6月17日","excerpt":"\\n<p>现在，新版的《REST With Spring - \\"REST With Spring Boot\\"》终于发布了，当前价格将在6月22日之前有效，之后将永久上涨50美元。</p>\\n<p><strong>&gt;获取访问权限</strong></p>\\n<p><strong>现在</strong></p>\\n<h2>1. 概述</h2>\\n<p>面向切面编程（AOP）通过将跨领域关注点分离到一个基本单元，称为切面，从而改善程序设计，这个单元与主应用程序逻辑分开。Spring AOP是一个框架，它帮助我们轻松实现切面。</p>\\n<p>AOP切面与其他软件组件没有什么不同。它们需要不同的测试来验证它们的正确性。在本教程中，我们将学习如何对Spring AOP切面进行单元测试和集成测试。</p>","autoDesc":true}');export{k as comp,d as data};
