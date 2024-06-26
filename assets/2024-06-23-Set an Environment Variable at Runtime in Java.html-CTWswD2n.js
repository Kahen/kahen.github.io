import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DMZJIPds.js";const e={},p=t(`<h1 id="在java中在运行时设置环境变量" tabindex="-1"><a class="header-anchor" href="#在java中在运行时设置环境变量"><span>在Java中在运行时设置环境变量</span></a></h1><p>Java提供了一种简单的与环境变量交互的方式。我们可以访问它们，但不容易改变它们。然而，在某些情况下，我们需要更多地控制环境变量，特别是在测试场景中。</p><p>在本教程中，我们将学习如何解决这个问题，并以编程方式设置或更改环境变量。<strong>我们只会讨论在测试上下文中使用它。</strong> 使用动态环境变量进行领域逻辑应该被劝阻，因为它容易出现问题。</p><h2 id="_2-访问环境变量" tabindex="-1"><a class="header-anchor" href="#_2-访问环境变量"><span>2. 访问环境变量</span></a></h2><p>访问环境变量的过程非常简单。_System_类为我们提供了这样的功能：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenOS_whenGetPath_thenVariableIsPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> classPath <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getenv</span><span class="token punctuation">(</span><span class="token string">&quot;PATH&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>classPath<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们需要访问所有变量，可以这样做：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenOS_whenGetEnv_thenVariablesArePresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` environment <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getenv</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>environment<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，_System_没有公开任何setters，我们收到的_Map_是不可修改的。</p><h2 id="_3-更改环境变量" tabindex="-1"><a class="header-anchor" href="#_3-更改环境变量"><span>3. 更改环境变量</span></a></h2><p>我们可能有不同的情况想要更改或设置环境变量。<strong>由于我们的进程涉及层次结构，因此我们有三个选项：</strong></p><ul><li>子进程更改/设置父进程的环境变量</li><li>进程更改/设置其环境变量</li><li>父进程更改/设置子进程的环境变量</li></ul><p>我们只会讨论最后两个案例。第一个案例复杂，不能轻易地为测试目的合理化。此外，它通常不能在纯Java中实现，通常涉及一些高级的C/C++编码。</p><p><strong>我们将只关注Java解决方案。</strong> 尽管JNI是Java的一部分，但它更复杂，解决方案应该在C/C++中实现。此外，解决方案可能存在与可移植性有关的问题。这就是为什么我们不会详细研究这些方法。</p><h2 id="_4-当前进程" tabindex="-1"><a class="header-anchor" href="#_4-当前进程"><span>4. 当前进程</span></a></h2><p>在这里，我们有几种选择。其中一些可能被视为hack，因为不能保证它们在所有平台上都能工作。</p><h3 id="_4-1-使用反射api" tabindex="-1"><a class="header-anchor" href="#_4-1-使用反射api"><span>4.1. 使用反射API</span></a></h3><p>从技术上讲，我们可以使用反射API来改变_System_类，以确保它为我们提供所需的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;unchecked&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">getModifiableEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">throws</span> <span class="token class-name">ClassNotFoundException</span><span class="token punctuation">,</span> <span class="token class-name">NoSuchFieldException</span><span class="token punctuation">,</span> <span class="token class-name">IllegalAccessException</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...（省略部分代码）</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>然而，这种方法会破坏模块的界限。</strong> 因此，在Java 9及以上版本，它可能会产生警告，但代码会编译。而在Java 16及以上版本，它会抛出错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span></span>InaccessibleObjectException</span><span class="token operator">:</span>
<span class="token class-name">Unable</span> <span class="token keyword">to</span> <span class="token namespace">make</span> field <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>Map</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>ProcessEnvironment</span><span class="token punctuation">.</span>theUnmodifiableEnvironment accessible<span class="token operator">:</span>
<span class="token keyword">module</span> <span class="token namespace">java<span class="token punctuation">.</span>base</span> does not <span class="token string">&quot;opens java.lang&quot;</span> <span class="token keyword">to</span> <span class="token namespace">unnamed</span> <span class="token keyword">module</span> <span class="token annotation punctuation">@2c9f9fb0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了解决后一个问题，我们需要为反射访问打开系统模块。我们可以使用以下VM选项：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token operator">--</span>add<span class="token operator">-</span><span class="token keyword">opens</span> <span class="token namespace">java<span class="token punctuation">.</span>base</span><span class="token operator">/</span>java<span class="token punctuation">.</span>util<span class="token operator">=</span><span class="token constant">ALL</span><span class="token operator">-</span><span class="token constant">UNNAMED</span>
<span class="token operator">--</span>add<span class="token operator">-</span><span class="token keyword">opens</span> <span class="token namespace">java<span class="token punctuation">.</span>base</span><span class="token operator">/</span>java<span class="token punctuation">.</span>lang<span class="token operator">=</span><span class="token constant">ALL</span><span class="token operator">-</span><span class="token constant">UNNAMED</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当从模块运行此代码时，我们可以使用其名称而不是ALL-UNNAMED。</p><p>然而，_getenv(String)_实现可能因平台而异。<strong>此外，我们无法保证内部类的API，因此解决方案可能在所有设置中都不工作。</strong></p><p>为了节省一些打字，我们可以使用JUnit Pioneer库中已经实现的解决方案：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.junit-pioneer\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`junit-pioneer\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`2.2.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>\`test\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它使用类似的想法，但提供了更声明性的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token annotation punctuation">@SetEnvironmentVariable</span><span class="token punctuation">(</span>key <span class="token operator">=</span> <span class="token constant">ENV_VARIABLE_NAME</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token constant">ENV_VARIABLE_VALUE</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenVariableSet_whenGetEnvironmentVariable_thenReturnsCorrectValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> actual <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getenv</span><span class="token punctuation">(</span><span class="token constant">ENV_VARIABLE_NAME</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token constant">ENV_VARIABLE_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_@SetEnvironmentVariable_帮助我们定义环境变量。然而，由于它使用反射，我们必须像以前一样提供对封闭模块的访问。</p><h3 id="_4-2-jni" tabindex="-1"><a class="header-anchor" href="#_4-2-jni"><span>4.2. JNI</span></a></h3><p>另一种方法是使用JNI并使用C/C++实现代码，该代码将使用C/C++设置环境变量。<strong>这是一种更具侵入性的方法，需要最少的C/C++技能。</strong> 同时，它没有反射访问问题。</p><p>然而，我们不能保证它将在Java运行时更新变量。<strong>我们的应用程序可以在启动时缓存变量，任何进一步的更改都不会有任何效果。</strong> 我们在使用反射更改底层_Map_时没有这个问题，因为它只改变Java方面的值。</p><p><strong>此外，这种方法将需要为不同平台定制解决方案。</strong> 因为所有操作系统都以不同的方式处理环境变量，解决方案不会像纯Java实现那样跨平台。</p><h2 id="_5-子进程" tabindex="-1"><a class="header-anchor" href="#_5-子进程"><span>5. 子进程</span></a></h2><p>_ProcessBuilder_可以帮助我们直接从Java创建子进程。我们可以使用它来运行任何进程。然而，我们将使用它来运行我们的JUnit测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenChildProcessTestRunner_whenRunTheTest_thenAllSucceed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...（省略部分代码）</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_ProcessBuilder_提供API来访问环境变量并启动单独的进程。</strong> 我们甚至可以运行Maven测试目标并确定我们要执行哪些测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// ...（省略部分代码）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个过程选择了具有特定标签的同一类中的测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token annotation punctuation">@EnabledIfEnvironmentVariable</span><span class="token punctuation">(</span>named <span class="token operator">=</span> <span class="token constant">CHILD_PROCESS_CONDITION</span><span class="token punctuation">,</span> matches <span class="token operator">=</span> <span class="token constant">CHILD_PROCESS_VALUE</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Tag</span><span class="token punctuation">(</span><span class="token constant">CHILD_PROCESS_TAG</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenChildProcess_whenGetEnvironmentVariable_thenReturnsCorrectValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> actual <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getenv</span><span class="token punctuation">(</span><span class="token constant">ENVIRONMENT_VARIABLE_NAME</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token constant">ENVIRONMENT_VARIABLE_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以定制此解决方案并根据特定要求进行调整。</p><h2 id="_6-docker环境" tabindex="-1"><a class="header-anchor" href="#_6-docker环境"><span>6. Docker环境</span></a></h2><p>然而，如果我们需要更多的配置或更特定的环境，最好使用Docker和Testcontainers。它将为我们提供更多的控制，特别是在集成测试中。让我们首先概述Dockerfile：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// ...（省略部分代码）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们将复制所需的测试并在容器内运行它。同样，我们也在同一文件中提供环境变量。</p><p>我们可以使用CI/CD设置来拾取容器或Testcontainers在我们的测试中运行测试。<strong>虽然这不是最优雅的解决方案，但它可能帮助我们一键运行所有测试。</strong> 让我们考虑一个简单的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// ...（省略部分代码）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，容器没有提供方便的API来复制文件夹以获取所有报告。最简单的方法是使用_withFileSystemBind()_方法，但它已被弃用。另一种方法是直接在Dockerfile中创建绑定。</p><p>我们可以使用_ProcessBuillder_重写示例。<strong>主要思想是将Docker和常规测试绑定到同一个套件中。</strong></p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>Java允许我们直接使用环境变量。然而，更改它们的值或设置新的并不简单。</p><p><strong>如果我们在领域逻辑中需要这样做，这通常意味着我们违反了几个SOLID原则。</strong> 然而，在测试期间，对环境变量的更多控制可能会简化流程并允许我们检查更特定的情况。</p><p>尽管我们可以使用反射，启动新进程或使用Docker构建一个全新的环境是更合适的解决方案。</p><p>像往常一样，本教程的所有代码都可以在GitHub上找到。</p>`,55),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-23-Set an Environment Variable at Runtime in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Set%20an%20Environment%20Variable%20at%20Runtime%20in%20Java.html","title":"在Java中在运行时设置环境变量","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Java","Environment Variables"],"tag":["Java","Environment Variables","Runtime","Testing"],"head":[["meta",{"name":"keywords","content":"Java, Environment Variables, Runtime, Testing, Reflection API, ProcessBuilder, Docker"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Set%20an%20Environment%20Variable%20at%20Runtime%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中在运行时设置环境变量"}],["meta",{"property":"og:description","content":"在Java中在运行时设置环境变量 Java提供了一种简单的与环境变量交互的方式。我们可以访问它们，但不容易改变它们。然而，在某些情况下，我们需要更多地控制环境变量，特别是在测试场景中。 在本教程中，我们将学习如何解决这个问题，并以编程方式设置或更改环境变量。我们只会讨论在测试上下文中使用它。 使用动态环境变量进行领域逻辑应该被劝阻，因为它容易出现问题。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T11:25:14.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Environment Variables"}],["meta",{"property":"article:tag","content":"Runtime"}],["meta",{"property":"article:tag","content":"Testing"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T11:25:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中在运行时设置环境变量\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T11:25:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中在运行时设置环境变量 Java提供了一种简单的与环境变量交互的方式。我们可以访问它们，但不容易改变它们。然而，在某些情况下，我们需要更多地控制环境变量，特别是在测试场景中。 在本教程中，我们将学习如何解决这个问题，并以编程方式设置或更改环境变量。我们只会讨论在测试上下文中使用它。 使用动态环境变量进行领域逻辑应该被劝阻，因为它容易出现问题。..."},"headers":[{"level":2,"title":"2. 访问环境变量","slug":"_2-访问环境变量","link":"#_2-访问环境变量","children":[]},{"level":2,"title":"3. 更改环境变量","slug":"_3-更改环境变量","link":"#_3-更改环境变量","children":[]},{"level":2,"title":"4. 当前进程","slug":"_4-当前进程","link":"#_4-当前进程","children":[{"level":3,"title":"4.1. 使用反射API","slug":"_4-1-使用反射api","link":"#_4-1-使用反射api","children":[]},{"level":3,"title":"4.2. JNI","slug":"_4-2-jni","link":"#_4-2-jni","children":[]}]},{"level":2,"title":"5. 子进程","slug":"_5-子进程","link":"#_5-子进程","children":[]},{"level":2,"title":"6. Docker环境","slug":"_6-docker环境","link":"#_6-docker环境","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719141914000,"updatedTime":1719141914000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.75,"words":1726},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Set an Environment Variable at Runtime in Java.md","localizedDate":"2024年6月23日","excerpt":"\\n<p>Java提供了一种简单的与环境变量交互的方式。我们可以访问它们，但不容易改变它们。然而，在某些情况下，我们需要更多地控制环境变量，特别是在测试场景中。</p>\\n<p>在本教程中，我们将学习如何解决这个问题，并以编程方式设置或更改环境变量。<strong>我们只会讨论在测试上下文中使用它。</strong> 使用动态环境变量进行领域逻辑应该被劝阻，因为它容易出现问题。</p>\\n<h2>2. 访问环境变量</h2>\\n<p>访问环境变量的过程非常简单。_System_类为我们提供了这样的功能：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenOS_whenGetPath_thenVariableIsPresent</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">String</span> classPath <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getenv</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"PATH\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">assertThat</span><span class=\\"token punctuation\\">(</span>classPath<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isNotNull</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
