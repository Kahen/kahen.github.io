import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-CGDivSS1.js";const t={},o=e(`<hr><h1 id="mockito-多级模拟注入到spy对象" tabindex="-1"><a class="header-anchor" href="#mockito-多级模拟注入到spy对象"><span>Mockito 多级模拟注入到Spy对象</span></a></h1><p>在本教程中，我们将讨论众所周知的Mockito注解_@InjectMocks_、<em>@Mock_和</em>@Spy_，并理解它们在多级注入场景中的协同工作方式。我们将讨论重要的测试概念，并学习如何进行适当的测试配置。</p><h2 id="_2-多级注入概念" tabindex="-1"><a class="header-anchor" href="#_2-多级注入概念"><span>2. 多级注入概念</span></a></h2><p>多级注入是一个强大的概念，但如果误用可能会很危险。让我们在继续实现之前回顾一下重要的理论概念。</p><h3 id="_2-1-单元测试概念" tabindex="-1"><a class="header-anchor" href="#_2-1-单元测试概念"><span>2.1. 单元测试概念</span></a></h3><p><strong>根据定义，单元测试是覆盖源代码一个单元的测试。</strong> 在Java世界中，我们可以将单元测试视为覆盖某个特定类—服务、仓库、工具等的测试。</p><p>在测试一个类时，我们只想测试它的业务逻辑，而不是它的依赖项的行为。为了处理依赖项，例如，模拟它们或验证它们的使用，我们通常使用模拟框架—Mockito。它被设计为扩展现有的测试引擎（JUnit、TestNG），并帮助为具有多个依赖项的类构建适当的单元测试。</p><h3 id="_2-2-spy-概念" tabindex="-1"><a class="header-anchor" href="#_2-2-spy-概念"><span>2.2. @ <em>Spy</em> 概念</span></a></h3><p><em>Spy</em> 是Mockito的一个重要支柱，它有助于有效地处理依赖项。</p><p><em>Mock</em> 是一个完整的存根，在调用方法时不执行任何操作，也不会触及实际对象。相反，<em>Spy</em> 默认将所有调用委托给实际对象的方法。并且当指定时，spy方法可以表现得像一个mock，并拥有其所有特性。</p><p><strong>我们需要根据其默认行为设置spy对象的必要依赖项，因为它是一个真实对象。</strong> Mockito尝试隐式地将依赖项注入到spy对象中。然而，当需要时，我们可以显式设置依赖项。</p><h3 id="_2-3-多级注入风险" tabindex="-1"><a class="header-anchor" href="#_2-3-多级注入风险"><span>2.3. 多级注入风险</span></a></h3><p>Mockito中的多级注入指的是测试类需要一个spy，而这个spy依赖于特定的mock进行注入，从而创建了一个嵌套的注入结构。</p><p>在某些场景中，我们可能面临多级模拟的需求。例如，我们正在测试某个_ServiceA_，它依赖于某个复杂的_MapperA_，而_MapperA_又依赖于不同的_ServiceB_。通常，将_MapperA_作为spy并注入_ServiceB_作为mock会更容易。然而，这种方法打破了单元测试的概念。<strong>当我们需要在一个测试中覆盖多个服务时，我们应该坚持使用完整的集成测试。</strong></p><p><strong>如果我们经常需要多级注入，这可能是测试方法不正确或代码设计复杂的迹象，应该进行重构。</strong></p><h2 id="_3-设置一个示例场景" tabindex="-1"><a class="header-anchor" href="#_3-设置一个示例场景"><span>3. 设置一个示例场景</span></a></h2><p>在我们继续测试用例之前，让我们定义一个示例代码，展示我们如何使用Mockito来测试我们的代码库。</p><p>我们将使用图书馆的概念，其中有一个主要的_Book_实体，它被多个服务处理。这里最重要的收获是类之间的依赖关系。</p><p>处理的入口点是_BookStorageService_，它旨在存储有关借出/归还书籍的信息，并通过_BookControlService_验证书籍状态：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BookStorageService</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">BookControlService</span> bookControlService<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>\` availableBooks<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一方面，_BookControlService_依赖于另外两个类，<em>StatisticService_和_RepairService</em>，它们应该计算处理过的书籍数量，并检查书籍是否应该被修理：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BookControlService</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">StatisticService</span> statisticService<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">RepairService</span> repairService<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-深入了解-injectmocks-注解" tabindex="-1"><a class="header-anchor" href="#_4-深入了解-injectmocks-注解"><span>4. 深入了解_@InjectMocks_注解</span></a></h2><p>当我们考虑将一个Mockito管理的类注入到另一个类中时，_@InjectMocks_注解看起来是最直观的机制。然而，它的能力是有限。文档强调，Mockito不应被视为依赖注入框架。<strong>它不是为处理对象网络的复杂注入而设计的。</strong></p><p>此外，Mockito不会报告任何注入失败。换句话说，当Mockito无法将mock注入到字段时，该字段将保持null。因此，如果测试类设置不正确，我们将最终遇到多个_NullPointerException_ (NPE)。</p><p><strong>_@InjectMocks_在不同的配置中表现不同，并非每种设置都能按预期工作。</strong> 让我们详细回顾一下注解使用的特点。</p><h3 id="_4-1-injectmocks-和-spy-不起作用的配置" tabindex="-1"><a class="header-anchor" href="#_4-1-injectmocks-和-spy-不起作用的配置"><span>4.1. _@InjectMocks_和@ <em>Spy</em> 不起作用的配置</span></a></h3><p>在一个类中使用多个_@InjectMocks_注解可能是直观的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MultipleInjectMockDoestWorkTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@InjectMocks</span>
    <span class="token keyword">private</span> <span class="token class-name">BookStorageService</span> bookStorageService<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Spy</span>
    <span class="token annotation punctuation">@InjectMocks</span>
    <span class="token keyword">private</span> <span class="token class-name">BookControlService</span> bookControlService<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Mock</span>
    <span class="token keyword">private</span> <span class="token class-name">StatisticService</span> statisticService<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种配置的目的是将_statisticService_ mock注入到_bookControlService_ spy中，并将_bookControlService_注入到_bookStorageService_中。<strong>然而，这种配置不起作用，并在较新的Mockito版本中导致NPE。</strong></p><p>在幕后，框架的当前版本（5.10.0）将所有注解对象收集到两个集合中。第一个集合是用于带有_@InjectMocks_注解的mock依赖字段（<em>bookStorageService_和_bookControlService</em>）。</p><p>第二个集合是所有候选注入实体，它们都是mock和合格的spy。<strong>然而，同时标记为@ <em>Spy</em> 和 <em>@InjectMock</em> 的字段永远不会被视为注入候选。</strong> 结果是，Mockito不知道应该将_bookControlService_注入到_bookStorageService_中。</p><p>上述配置的另一个问题是概念上的。使用_@InjectMocks_注解，我们针对两个类（<em>BookStorageService_和_BookControlService</em>）进行测试，这违反了单元测试方法。</p><h3 id="_4-2-injectmocks-和-spy-起作用的配置" tabindex="-1"><a class="header-anchor" href="#_4-2-injectmocks-和-spy-起作用的配置"><span>4.2. <em>@InjectMocks_和</em>@Spy_ 起作用的配置</span></a></h3><p>同时，只要类中只有一个_@InjectMocks_注解，就没有限制使用_@Spy_和_@InjectMocks_一起：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Spy</span>
<span class="token annotation punctuation">@InjectMocks</span>
<span class="token keyword">private</span> <span class="token class-name">BookControlService</span> bookControlService<span class="token punctuation">;</span>
<span class="token annotation punctuation">@Mock</span>
<span class="token keyword">private</span> <span class="token class-name">StatisticService</span> statisticService<span class="token punctuation">;</span>
<span class="token annotation punctuation">@Spy</span>
<span class="token keyword">private</span> <span class="token class-name">RepairService</span> repairService<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这种配置，我们就有了一个正确构建且可测试的层次结构：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenOneInjectMockWithSpy_thenHierarchySuccessfullyInitialized</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">Book</span> book <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;Some name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Some author&quot;</span><span class="token punctuation">,</span> <span class="token number">355</span><span class="token punctuation">,</span> <span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    bookControlService<span class="token punctuation">.</span><span class="token function">returnBook</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertNull</span><span class="token punctuation">(</span>book<span class="token punctuation">.</span><span class="token function">getReturnDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span>statisticService<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">calculateAdded</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span>repairService<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">shouldRepair</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-通过-injectmocks和手动spy进行多级注入" tabindex="-1"><a class="header-anchor" href="#_5-通过-injectmocks和手动spy进行多级注入"><span>5. 通过@InjectMocks和手动Spy进行多级注入</span></a></h2><p><strong>解决多级注入的一个选项是在Mockito初始化之前手动实例化spy对象。</strong> 正如我们已经讨论的，Mockito不能将所有依赖项注入到同时带有_@Spy_和_@InjectMocks_注解的字段中。然而，即使这个对象是spy，框架也可以将依赖项注入到仅带有_@InjectMocks_注解的对象中。</p><p>我们可以使用_@ExtendWith(MockitoExtension.class)_在类级别上，并在字段中初始化spy：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@InjectMocks</span>
<span class="token keyword">private</span> <span class="token class-name">BookControlService</span> bookControlService <span class="token operator">=</span> <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">spy</span><span class="token punctuation">(</span><span class="token class-name">BookControlService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>或者我们可以使用_MockitoAnnotations.openMocks(this)<em>并在</em>@BeforeEach_方法中初始化spy：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@BeforeEach</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">openMocks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    bookControlService <span class="token operator">=</span> <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">spy</span><span class="token punctuation">(</span><span class="token class-name">BookControlService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    closeable <span class="token operator">=</span> <span class="token class-name">MockitoAnnotations</span><span class="token punctuation">.</span><span class="token function">openMocks</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在这两种情况下，spy应该在Mockito初始化之前创建。</strong></p><p>有了上述设置，Mockito处理手动创建的spy上的_@InjectMocks_并注入所有需要的mocks：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@InjectMocks</span>
<span class="token keyword">private</span> <span class="token class-name">BookStorageService</span> bookStorageService<span class="token punctuation">;</span>
<span class="token annotation punctuation">@InjectMocks</span>
<span class="token keyword">private</span> <span class="token class-name">BookControlService</span> bookControlService<span class="token punctuation">;</span>
<span class="token annotation punctuation">@Mock</span>
<span class="token keyword">private</span> <span class="token class-name">StatisticService</span> statisticService<span class="token punctuation">;</span>
<span class="token annotation punctuation">@Mock</span>
<span class="token keyword">private</span> <span class="token class-name">RepairService</span> repairService<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试成功执行：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenSpyIsManuallyCreated_thenInjectMocksWorks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Book</span> book <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;Some name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Some author&quot;</span><span class="token punctuation">,</span> <span class="token number">355</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    bookStorageService<span class="token punctuation">.</span><span class="token function">returnBook</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> bookStorageService<span class="token punctuation">.</span><span class="token function">getAvailableBooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span>bookControlService<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">returnBook</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span>statisticService<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">calculateAdded</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span>repairService<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">shouldRepair</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-通过反射进行多级注入" tabindex="-1"><a class="header-anchor" href="#_6-通过反射进行多级注入"><span>6. 通过反射进行多级注入</span></a></h2><p>处理复杂测试设置的另一种可能方法是手动创建所需的spy对象，然后将其注入到被测试对象中。<strong>利用反射机制，我们可以更新Mockito创建的对象所需的spy。</strong></p><p>以下示例中，我们没有用@ <em>InjectMocks_注解_BookControlService</em>，而是手动配置了一切。为确保在spy初始化期间Mockito创建的mocks可用，必须首先初始化Mockito上下文。否则，在mocks被使用的地方可能会发生_NullPointerException_。</p><p>一旦_BookControlService_ spy配置了所有mocks，我们就通过反射将其注入到_BookStorageService_中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@InjectMocks</span>
<span class="token keyword">private</span> <span class="token class-name">BookStorageService</span> bookStorageService<span class="token punctuation">;</span>
<span class="token annotation punctuation">@Mock</span>
<span class="token keyword">private</span> <span class="token class-name">StatisticService</span> statisticService<span class="token punctuation">;</span>
<span class="token annotation punctuation">@Mock</span>
<span class="token keyword">private</span> <span class="token class-name">RepairService</span> repairService<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">BookControlService</span> bookControlService<span class="token punctuation">;</span>

<span class="token annotation punctuation">@BeforeEach</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">openMocks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    bookControlService <span class="token operator">=</span> <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">spy</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BookControlService</span><span class="token punctuation">(</span>statisticService<span class="token punctuation">,</span> repairService<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">injectSpyToTestedMock</span><span class="token punctuation">(</span>bookStorageService<span class="token punctuation">,</span> bookControlService<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">injectSpyToTestedMock</span><span class="token punctuation">(</span><span class="token class-name">BookStorageService</span> bookStorageService<span class="token punctuation">,</span> <span class="token class-name">BookControlService</span> bookControlService<span class="token punctuation">)</span>
  <span class="token keyword">throws</span> <span class="token class-name">NoSuchFieldException</span><span class="token punctuation">,</span> <span class="token class-name">IllegalAccessException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Field</span> bookControlServiceField <span class="token operator">=</span> <span class="token class-name">BookStorageService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">&quot;bookControlService&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    bookControlServiceField<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    bookControlServiceField<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>bookStorageService<span class="token punctuation">,</span> bookControlService<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这样的配置，我们可以验证_repairService_和_bookControlService_的行为。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们回顾了重要的单元测试概念，并学习了如何使用_@InjectMocks_、<em>@Spy_和</em>@Mock_注解来执行复杂的多级注入。我们发现spy可以手动配置，并且可以将其注入到被测试对象中。</p><p>如常，完整的示例可以在GitHub上找到。</p><p>文章发布后30天内开放评论。对于发布日期之后的任何问题，请使用网站上的联系表单。</p><p>OK</p>`,61),p=[o];function c(i,l){return a(),s("div",null,p)}const r=n(t,[["render",c],["__file","2024-06-19-Multiple Level Mock Injection Into Mockito Spy Objects.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-19-Multiple%20Level%20Mock%20Injection%20Into%20Mockito%20Spy%20Objects.html","title":"Mockito 多级模拟注入到Spy对象","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Testing","Mockito"],"tag":["Mockito","Testing","Java"],"head":[["meta",{"name":"keywords","content":"Mockito, Testing, Java, Spy, InjectMocks"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-19-Multiple%20Level%20Mock%20Injection%20Into%20Mockito%20Spy%20Objects.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Mockito 多级模拟注入到Spy对象"}],["meta",{"property":"og:description","content":"Mockito 多级模拟注入到Spy对象 在本教程中，我们将讨论众所周知的Mockito注解_@InjectMocks_、@Mock_和@Spy_，并理解它们在多级注入场景中的协同工作方式。我们将讨论重要的测试概念，并学习如何进行适当的测试配置。 2. 多级注入概念 多级注入是一个强大的概念，但如果误用可能会很危险。让我们在继续实现之前回顾一下重要的理..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Mockito"}],["meta",{"property":"article:tag","content":"Testing"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mockito 多级模拟注入到Spy对象\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Mockito 多级模拟注入到Spy对象 在本教程中，我们将讨论众所周知的Mockito注解_@InjectMocks_、@Mock_和@Spy_，并理解它们在多级注入场景中的协同工作方式。我们将讨论重要的测试概念，并学习如何进行适当的测试配置。 2. 多级注入概念 多级注入是一个强大的概念，但如果误用可能会很危险。让我们在继续实现之前回顾一下重要的理..."},"headers":[{"level":2,"title":"2. 多级注入概念","slug":"_2-多级注入概念","link":"#_2-多级注入概念","children":[{"level":3,"title":"2.1. 单元测试概念","slug":"_2-1-单元测试概念","link":"#_2-1-单元测试概念","children":[]},{"level":3,"title":"2.2. @ Spy 概念","slug":"_2-2-spy-概念","link":"#_2-2-spy-概念","children":[]},{"level":3,"title":"2.3. 多级注入风险","slug":"_2-3-多级注入风险","link":"#_2-3-多级注入风险","children":[]}]},{"level":2,"title":"3. 设置一个示例场景","slug":"_3-设置一个示例场景","link":"#_3-设置一个示例场景","children":[]},{"level":2,"title":"4. 深入了解_@InjectMocks_注解","slug":"_4-深入了解-injectmocks-注解","link":"#_4-深入了解-injectmocks-注解","children":[{"level":3,"title":"4.1. _@InjectMocks_和@ Spy 不起作用的配置","slug":"_4-1-injectmocks-和-spy-不起作用的配置","link":"#_4-1-injectmocks-和-spy-不起作用的配置","children":[]},{"level":3,"title":"4.2. @InjectMocks_和@Spy_ 起作用的配置","slug":"_4-2-injectmocks-和-spy-起作用的配置","link":"#_4-2-injectmocks-和-spy-起作用的配置","children":[]}]},{"level":2,"title":"5. 通过@InjectMocks和手动Spy进行多级注入","slug":"_5-通过-injectmocks和手动spy进行多级注入","link":"#_5-通过-injectmocks和手动spy进行多级注入","children":[]},{"level":2,"title":"6. 通过反射进行多级注入","slug":"_6-通过反射进行多级注入","link":"#_6-通过反射进行多级注入","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.83,"words":2049},"filePathRelative":"posts/baeldung/Archive/2024-06-19-Multiple Level Mock Injection Into Mockito Spy Objects.md","localizedDate":"2024年6月20日","excerpt":"<hr>\\n<h1>Mockito 多级模拟注入到Spy对象</h1>\\n<p>在本教程中，我们将讨论众所周知的Mockito注解_@InjectMocks_、<em>@Mock_和</em>@Spy_，并理解它们在多级注入场景中的协同工作方式。我们将讨论重要的测试概念，并学习如何进行适当的测试配置。</p>\\n<h2>2. 多级注入概念</h2>\\n<p>多级注入是一个强大的概念，但如果误用可能会很危险。让我们在继续实现之前回顾一下重要的理论概念。</p>\\n<h3>2.1. 单元测试概念</h3>\\n<p><strong>根据定义，单元测试是覆盖源代码一个单元的测试。</strong> 在Java世界中，我们可以将单元测试视为覆盖某个特定类—服务、仓库、工具等的测试。</p>","autoDesc":true}');export{r as comp,d as data};
