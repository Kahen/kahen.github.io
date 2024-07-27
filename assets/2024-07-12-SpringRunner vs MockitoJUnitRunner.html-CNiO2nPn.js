import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CBerKIce.js";const e={},p=t(`<h1 id="springrunner与mockitojunitrunner的比较" tabindex="-1"><a class="header-anchor" href="#springrunner与mockitojunitrunner的比较"><span>SpringRunner与MockitoJUnitRunner的比较</span></a></h1><p>JUnit是Java中最受欢迎的单元测试框架之一。此外，Spring Boot将其作为其应用程序的默认测试依赖项提供。</p><p>在本教程中，我们将比较两种JUnit runner——SpringRunner和MockitoJUnitRunner。我们将理解它们的目的以及它们之间的关键区别。</p><h2 id="_2-runwith与-extendwith" tabindex="-1"><a class="header-anchor" href="#_2-runwith与-extendwith"><span>2. @RunWith与@ExtendWith</span></a></h2><p>在我们进一步讨论之前，让我们回顾一下我们如何扩展JUnit的基本功能或将其与其他库集成。</p><p><strong>JUnit 4允许我们实现自定义Runner类</strong>，通过应用额外的功能来负责运行测试。要调用自定义runner，我们使用@RunWith注解来注解测试类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RunWith</span><span class="token punctuation">(</span><span class="token class-name">CustomRunner</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">JUnit4Test</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>众所周知，JUnit 4现在处于遗留状态，由JUnit 5接替。新版本为我们带来了一个全新的引擎和重写的API。它还改变了扩展模型的概念。我们现在不是实现自定义Runner或Rule类，而是可以使用<strong>扩展API和@ExtendWith注解</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ExtendWith</span><span class="token punctuation">(</span><span class="token class-name">CustomExtensionOne</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ExtendWith</span><span class="token punctuation">(</span><span class="token class-name">CustomExtensionTwo</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">JUnit5Test</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与以前的runner模型不同，我们现在可以为单个类提供多个扩展。大多数以前提供的runner也已经被重写为它们的扩展对应物。</p><h2 id="_3-spring示例应用程序" tabindex="-1"><a class="header-anchor" href="#_3-spring示例应用程序"><span>3. Spring示例应用程序</span></a></h2><p>为了更好地理解，让我们引入一个简单的Spring Boot应用程序——一个将给定字符串转换为大写的转换器。</p><p>让我们首先实现一个数据提供者：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataProvider</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` memory <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;java&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;dummy&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Stream</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">getValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> memory<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们刚刚创建了一个带有硬编码字符串值的Spring组件。此外，它提供了一个方法来流式传输这些字符串。</p><p>其次，让我们实现一个服务类来转换我们的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StringConverter</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">DataProvider</span> dataProvider<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">public</span> <span class="token class-name">StringConverter</span><span class="token punctuation">(</span><span class="token class-name">DataProvider</span> dataProvider<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>dataProvider <span class="token operator">=</span> dataProvider<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">convert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> dataProvider<span class="token punctuation">.</span><span class="token function">getValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token operator">::</span><span class="token function">toUpperCase</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个简单的bean，它从先前创建的DataProvider获取数据并应用大写映射。</p><p>现在，我们可以使用我们的应用程序来创建JUnit测试。我们将看到SpringRunner和MockitoJUnitRunner类之间的区别。</p><p>正如我们所知，Mockito是一个模拟框架，它与其他测试框架一起使用，以返回虚拟数据并避免外部依赖。这个库为我们提供了<strong>MockitoJUnitRunner——一个专用的JUnit 4 runner，用于集成Mockito</strong>并利用库的功能。</p><p>现在让我们为StringConverter创建第一个测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StringConverterTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Mock</span>
    <span class="token keyword">private</span> <span class="token class-name">DataProvider</span> dataProvider<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@InjectMocks</span>
    <span class="token keyword">private</span> <span class="token class-name">StringConverter</span> stringConverter<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStrings_whenConvert_thenReturnUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span>dataProvider<span class="token punctuation">.</span><span class="token function">getValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;first&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;second&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        val result <span class="token operator">=</span> stringConverter<span class="token punctuation">.</span><span class="token function">convert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;FIRST&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;SECOND&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们刚刚模拟了DataProvider以返回两个字符串。但如果我们运行它，测试失败：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>NullPointerException</span><span class="token operator">:</span> <span class="token class-name">Cannot</span> invoke <span class="token string">&quot;DataProvider.getValues()&quot;</span> because <span class="token string">&quot;this.dataProvider&quot;</span> is <span class="token keyword">null</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是因为我们的模拟没有正确初始化。@Mock和@InjectMocks注解目前不起作用。我们可以通过实现init()方法来解决这个问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Before</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">MockitoAnnotations</span><span class="token punctuation">.</span><span class="token function">openMocks</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们不想使用注解，我们也可以通过Mockito API以编程方式创建和注入模拟：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Before</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dataProvider <span class="token operator">=</span> <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">DataProvider</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    stringConverter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringConverter</span><span class="token punctuation">(</span>dataProvider<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们刚刚使用Mockito API以编程方式初始化了模拟。现在，测试按预期工作，我们的断言成功。</p><p>接下来，让我们回到我们的第一版，去掉init()方法，并使用MockitoJUnitRunner注解类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RunWith</span><span class="token punctuation">(</span><span class="token class-name">MockitoJUnitRunner</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StringConverterTest</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次，测试成功。我们调用了一个自定义runner，它负责管理我们的模拟。我们不必手动初始化它们。</p><p>总结一下，<strong>MockitoJUnitRunner是一个专门为Mockito框架设计的JUnit 4 runner</strong>。<strong>它负责初始化@Mock、@Spy和@InjectMocks注解</strong>，因此不需要显式使用MockitoAnnotations.openMocks()。此外，它在每个测试方法后检测未使用的存根并验证模拟使用情况，就像Mockito.validateMockitoUsage()一样。</p><p>我们应该记住，所有runner最初都是为JUnit 4设计的。如果我们想在JUnit 5中支持Mockito注解，我们可以使用MockitoExtension：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ExtendWith</span><span class="token punctuation">(</span><span class="token class-name">MockitoExtension</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StringConverterTest</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个扩展将MockitoJUnitRunner的功能移植到新的扩展模型中。</p><h2 id="_5-springrunner" tabindex="-1"><a class="header-anchor" href="#_5-springrunner"><span>5. SpringRunner</span></a></h2><p>如果我们更深入地分析我们的测试，我们将看到，尽管我们使用了Spring，但我们根本没有启动Spring容器。现在让我们尝试修改我们的例子并初始化Spring上下文。</p><p>首先，我们不使用MockitoJUnitRunner，而是用SpringRunner类替换它，然后检查结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RunWith</span><span class="token punctuation">(</span><span class="token class-name">SpringRunner</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StringConverterTest</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和以前一样，测试成功，模拟也正确初始化了。此外，Spring上下文也启动了。我们可以得出结论，<strong>SpringRunner不仅像MockitoJUnitRunner一样启用Mockito注解，而且还初始化了Spring上下文</strong>。</p><p>当然，我们还没有看到Spring在测试中的全部潜力。我们不是构建新对象，而是可以将它们作为Spring beans注入。正如我们所知，Spring测试模块默认集成了Mockito，这也提供了@MockBean和@SpyBean注解——将模拟和bean特性结合在一起。</p><p>让我们重写我们的测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ContextConfiguration</span><span class="token punctuation">(</span>classes <span class="token operator">=</span> <span class="token class-name">StringConverter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@RunWith</span><span class="token punctuation">(</span><span class="token class-name">SpringRunner</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StringConverterTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@MockBean</span>
    <span class="token keyword">private</span> <span class="token class-name">DataProvider</span> dataProvider<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">StringConverter</span> stringConverter<span class="token punctuation">;</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们刚刚用@MockBean替换了DataProvider对象旁边的@Mock注解。它仍然是一个模拟，但现在也可以作为一个bean使用。我们还通过@ContextConfiguration类注解配置了我们的Spring上下文，并注入了StringConverter。结果，测试仍然成功，但现在它使用Spring beans和Mockito。</p><p>总结一下，<strong>SpringRunner是为JUnit 4创建的自定义runner，它提供了Spring TestContext Framework的功能</strong>。由于Mockito是与Spring堆栈集成的默认模拟框架，<strong>runner带来了MockitoJUnitRunner提供的全部支持</strong>。有时，我们也可能遇到SpringJUnit4ClassRunner，这是一个别名，我们可以交替使用。</p><p>如果我们正在寻找SpringRunner的扩展对应物，我们应该使用SpringExtension：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ExtendWith</span><span class="token punctuation">(</span><span class="token class-name">SpringExtension</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StringConverterTest</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于JUnit 5是Spring Boot堆栈中的默认测试框架，该扩展已经与许多测试片段注解集成，包括@SpringBootTest。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了SpringRunner和MockitoJUnitRunner之间的区别。</p><p>我们首先回顾了JUnit 4和JUnit 5中使用的扩展模型。JUnit 4使用专用的runner，而JUnit 5支持扩展。同时，我们可以提供一个runner或多个扩展。</p><p>然后，<strong>我们看了MockitoJUnitRunner，它使我们的JUnit 4测试支持Mockito框架</strong>。通常，我们可以通过专用的@Mock、@Spy和@InjectMocks注解配置我们的模拟，而不需要任何初始化方法。</p><p>最后，<strong>我们讨论了SpringRunner，它释放了Mockito和Spring框架合作的所有优势</strong>。它不仅支持基本的Mockito注解，而且还启用了Spring的：@MockBean和@SpyBean。以这种方式构建的模拟可以使用Spring上下文进行注入。</p><p>像往常一样，这些示例的完整实现可以在GitHub上找到。</p>`,55),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","2024-07-12-SpringRunner vs MockitoJUnitRunner.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-SpringRunner%20vs%20MockitoJUnitRunner.html","title":"SpringRunner与MockitoJUnitRunner的比较","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring","JUnit"],"tag":["SpringRunner","MockitoJUnitRunner"],"head":[["meta",{"name":"keywords","content":"SpringRunner, MockitoJUnitRunner, JUnit, Spring, 单元测试, Mock"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-SpringRunner%20vs%20MockitoJUnitRunner.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"SpringRunner与MockitoJUnitRunner的比较"}],["meta",{"property":"og:description","content":"SpringRunner与MockitoJUnitRunner的比较 JUnit是Java中最受欢迎的单元测试框架之一。此外，Spring Boot将其作为其应用程序的默认测试依赖项提供。 在本教程中，我们将比较两种JUnit runner——SpringRunner和MockitoJUnitRunner。我们将理解它们的目的以及它们之间的关键区别。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T16:03:29.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"SpringRunner"}],["meta",{"property":"article:tag","content":"MockitoJUnitRunner"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T16:03:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SpringRunner与MockitoJUnitRunner的比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T16:03:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"SpringRunner与MockitoJUnitRunner的比较 JUnit是Java中最受欢迎的单元测试框架之一。此外，Spring Boot将其作为其应用程序的默认测试依赖项提供。 在本教程中，我们将比较两种JUnit runner——SpringRunner和MockitoJUnitRunner。我们将理解它们的目的以及它们之间的关键区别。 ..."},"headers":[{"level":2,"title":"2. @RunWith与@ExtendWith","slug":"_2-runwith与-extendwith","link":"#_2-runwith与-extendwith","children":[]},{"level":2,"title":"3. Spring示例应用程序","slug":"_3-spring示例应用程序","link":"#_3-spring示例应用程序","children":[]},{"level":2,"title":"5. SpringRunner","slug":"_5-springrunner","link":"#_5-springrunner","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720800209000,"updatedTime":1720800209000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.91,"words":1774},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-SpringRunner vs MockitoJUnitRunner.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>JUnit是Java中最受欢迎的单元测试框架之一。此外，Spring Boot将其作为其应用程序的默认测试依赖项提供。</p>\\n<p>在本教程中，我们将比较两种JUnit runner——SpringRunner和MockitoJUnitRunner。我们将理解它们的目的以及它们之间的关键区别。</p>\\n<h2>2. @RunWith与@ExtendWith</h2>\\n<p>在我们进一步讨论之前，让我们回顾一下我们如何扩展JUnit的基本功能或将其与其他库集成。</p>\\n<p><strong>JUnit 4允许我们实现自定义Runner类</strong>，通过应用额外的功能来负责运行测试。要调用自定义runner，我们使用@RunWith注解来注解测试类：</p>","autoDesc":true}');export{d as comp,k as data};
