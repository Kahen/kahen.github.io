import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D5kFWV-m.js";const p={},e=t('<h1 id="junit-5-方法参数注入-mock-和-captor" tabindex="-1"><a class="header-anchor" href="#junit-5-方法参数注入-mock-和-captor"><span>JUnit 5 方法参数注入 @Mock 和 @Captor</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将了解如何在单元测试方法参数中注入 @Mock 和 @Captor 注解。</p><p>我们可以使用 @Mock 在单元测试中创建模拟对象。另一方面，我们可以使用 @Captor 捕获并存储传递给模拟方法的参数，以便稍后进行断言。JUnit 5 的引入使得将参数注入测试方法变得非常容易，从而实现了这一新特性。</p><h2 id="_2-示例设置" tabindex="-1"><a class="header-anchor" href="#_2-示例设置"><span>2. 示例设置</span></a></h2><p>要使用此功能，我们需要使用 JUnit 5。库的最新版本可以在 Maven Central Repository 中找到。让我们将依赖项添加到我们的 pom.xml 中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.junit.jupiter```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```junit-jupiter-engine```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```5.10.2```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Mockito 是一个测试框架，允许我们创建动态模拟对象。<strong>Mockito 核心提供了框架的基本功能，提供了一个表达式 API 用于创建和与模拟对象交互。</strong> 让我们使用它的最新版本：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.mockito```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```mockito-core```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```5.11.0```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们需要使用 Mockito JUnit Jupiter 扩展，它负责将 Mockito 与 JUnit 5 集成。让我们也将这个依赖项添加到我们的 pom.xml 中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.mockito```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```mockito-junit-jupiter```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```5.11.0```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，让我们将 Mockito 扩展附加到我们的单元测试类中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ExtendWith</span><span class="token punctuation">(</span><span class="token class-name">MockitoExtension</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n<span class="token keyword">class</span> <span class="token class-name">MethodParameterInjectionUnitTest</span> <span class="token punctuation">{</span>\n\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注册 Mockito 扩展允许 Mockito 框架与 JUnit 5 测试框架集成。因此，<strong>我们现在可以将我们的模拟对象作为测试参数提供：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenMockInjectedViaArgumentParameters_thenSetupCorrectly</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Mock</span> <span class="token class-name">Function</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` mockFunction<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">when</span><span class="token punctuation">(</span>mockFunction<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token string">&quot;bael&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;dung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;dung&quot;</span><span class="token punctuation">,</span> mockFunction<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token string">&quot;bael&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们的模拟函数在传递 &quot;bael&quot; 作为输入时返回字符串 &quot;dung&quot;。断言证明了模拟的行为符合我们的预期。</p><p>此外，构造函数是一种方法，所以也可以将 @Mock 作为测试类构造函数的参数注入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ExtendWith</span><span class="token punctuation">(</span><span class="token class-name">MockitoExtension</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n<span class="token keyword">class</span> <span class="token class-name">ConstructorInjectionUnitTest</span> <span class="token punctuation">{</span>\n\n    <span class="token class-name">Function</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` function<span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">ConstructorInjectionUnitTest</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Mock</span> <span class="token class-name">Function</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` function<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>function <span class="token operator">=</span> function<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Test</span>\n    <span class="token keyword">void</span> <span class="token function">whenInjectedViaArgumentParameters_thenSetupCorrectly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">when</span><span class="token punctuation">(</span>function<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token string">&quot;bael&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;dung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;dung&quot;</span><span class="token punctuation">,</span> function<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token string">&quot;bael&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总的来说，模拟注入不仅限于基本的单元测试。例如，我们也可以将模拟注入到其他可测试的方法中，如重复测试或参数化测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>\n<span class="token annotation punctuation">@ValueSource</span><span class="token punctuation">(</span>strings <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;bael&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;dung&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">void</span> <span class="token function">whenInjectedInParameterizedTest_thenSetupCorrectly</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">,</span> <span class="token annotation punctuation">@Mock</span> <span class="token class-name">Function</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` mockFunction<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">when</span><span class="token punctuation">(</span>mockFunction<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">,</span> mockFunction<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们注意，当我们在参数化测试中注入模拟时，方法参数的顺序很重要。注入的模拟对象 mockFunction 必须在测试参数 input 之后，以便参数解析器正确完成其工作。</p><h2 id="_4-通过方法参数注入-captor" tabindex="-1"><a class="header-anchor" href="#_4-通过方法参数注入-captor"><span>4. 通过方法参数注入 @Captor</span></a></h2><p>ArgumentCaptor 允许我们在测试中检查我们无法通过其他方式访问的对象的值。<strong>我们现在可以通过非常类似的方式通过方法参数注入 @Captor：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenArgumentCaptorInjectedViaArgumentParameters_thenSetupCorrectly</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Mock</span> <span class="token class-name">Function</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` mockFunction<span class="token punctuation">,</span> <span class="token annotation punctuation">@Captor</span> <span class="token class-name">ArgumentCaptor</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` captor<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    mockFunction<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">verify</span><span class="token punctuation">(</span>mockFunction<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>captor<span class="token punctuation">.</span><span class="token function">capture</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">,</span> captor<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们将模拟函数应用于字符串 &quot;baeldung&quot;。然后，我们使用 ArgumentCaptor 提取传递给函数调用的值。最后，我们验证这个值是正确的。</p><p>我们关于模拟注入的所有评论也适用于捕获器。特别是，让我们看看这次在 @RepeatedTest 中注入的一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RepeatedTest</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>\n<span class="token keyword">void</span> <span class="token function">whenInjectedInRepeatedTest_thenSetupCorrectly</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Mock</span> <span class="token class-name">Function</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` mockFunction<span class="token punctuation">,</span> <span class="token annotation punctuation">@Captor</span> <span class="token class-name">ArgumentCaptor</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` captor<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    mockFunction<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">verify</span><span class="token punctuation">(</span>mockFunction<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>captor<span class="token punctuation">.</span><span class="token function">capture</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">,</span> captor<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-为什么要使用方法参数注入" tabindex="-1"><a class="header-anchor" href="#_5-为什么要使用方法参数注入"><span>5. 为什么要使用方法参数注入？</span></a></h2><p>现在，我们将看看这个新特性的优点。首先，让我们回顾一下我们以前是如何声明我们的模拟的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Mock</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Function</span><span class="token punctuation">&gt;</span></span>` mock <span class="token operator">=</span> <span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">Mock</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这种情况下，编译器会发出警告，因为 Mockito.mock() 无法正确创建 Function 的泛型类型。多亏了方法参数注入，我们能够保留泛型类型签名，编译器也不再发出警告。</p><p>使用方法注入的另一个巨大优势是发现依赖关系。以前，我们需要检查测试代码以了解与其他类的交互。通过方法参数注入，<strong>方法签名显示了我们的测试系统如何与其他组件交互。</strong> 此外，测试代码更短，更专注于其目标。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们看到了如何通过方法参数注入 @Mock 和 @Captor。JUnit 5 对构造器和方法依赖注入的支持使得这个特性成为可能。总之，建议使用这个新特性。它可能一开始看起来只是一个不错的功能，但它可以提高我们的代码质量和可读性。</p><p>如常，示例代码可以在 GitHub 上找到。</p>',35),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-22-Injecting  Mock and  Captor in JUnit 5 Method Parameters.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Injecting%20%20Mock%20and%20%20Captor%20in%20JUnit%205%20Method%20Parameters.html","title":"JUnit 5 方法参数注入 @Mock 和 @Captor","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["JUnit 5","Mockito"],"tag":["JUnit 5","Mockito","测试"],"head":[["meta",{"name":"keywords","content":"JUnit 5, Mockito, 测试, Mock, Captor, 方法参数注入"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Injecting%20%20Mock%20and%20%20Captor%20in%20JUnit%205%20Method%20Parameters.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JUnit 5 方法参数注入 @Mock 和 @Captor"}],["meta",{"property":"og:description","content":"JUnit 5 方法参数注入 @Mock 和 @Captor 1. 概述 在本教程中，我们将了解如何在单元测试方法参数中注入 @Mock 和 @Captor 注解。 我们可以使用 @Mock 在单元测试中创建模拟对象。另一方面，我们可以使用 @Captor 捕获并存储传递给模拟方法的参数，以便稍后进行断言。JUnit 5 的引入使得将参数注入测试方法变..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T21:49:19.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JUnit 5"}],["meta",{"property":"article:tag","content":"Mockito"}],["meta",{"property":"article:tag","content":"测试"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T21:49:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JUnit 5 方法参数注入 @Mock 和 @Captor\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T21:49:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"JUnit 5 方法参数注入 @Mock 和 @Captor 1. 概述 在本教程中，我们将了解如何在单元测试方法参数中注入 @Mock 和 @Captor 注解。 我们可以使用 @Mock 在单元测试中创建模拟对象。另一方面，我们可以使用 @Captor 捕获并存储传递给模拟方法的参数，以便稍后进行断言。JUnit 5 的引入使得将参数注入测试方法变..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 示例设置","slug":"_2-示例设置","link":"#_2-示例设置","children":[]},{"level":2,"title":"4. 通过方法参数注入 @Captor","slug":"_4-通过方法参数注入-captor","link":"#_4-通过方法参数注入-captor","children":[]},{"level":2,"title":"5. 为什么要使用方法参数注入？","slug":"_5-为什么要使用方法参数注入","link":"#_5-为什么要使用方法参数注入","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719092959000,"updatedTime":1719092959000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.05,"words":1216},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Injecting  Mock and  Captor in JUnit 5 Method Parameters.md","localizedDate":"2024年6月23日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将了解如何在单元测试方法参数中注入 @Mock 和 @Captor 注解。</p>\\n<p>我们可以使用 @Mock 在单元测试中创建模拟对象。另一方面，我们可以使用 @Captor 捕获并存储传递给模拟方法的参数，以便稍后进行断言。JUnit 5 的引入使得将参数注入测试方法变得非常容易，从而实现了这一新特性。</p>\\n<h2>2. 示例设置</h2>\\n<p>要使用此功能，我们需要使用 JUnit 5。库的最新版本可以在 Maven Central Repository 中找到。让我们将依赖项添加到我们的 pom.xml 中：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n    ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>```org.junit.jupiter```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n    ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>```junit-jupiter-engine```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n    ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>```5.10.2```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n    ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>scope</span><span class=\\"token punctuation\\">&gt;</span></span>```test```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>scope</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
