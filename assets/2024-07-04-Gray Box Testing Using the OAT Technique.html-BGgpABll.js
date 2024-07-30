import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CbPcg273.js";const e={},p=t(`<h1 id="灰色盒子测试使用oat技术-baeldung" tabindex="-1"><a class="header-anchor" href="#灰色盒子测试使用oat技术-baeldung"><span>灰色盒子测试使用OAT技术 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>灰色盒子测试帮助我们在不测试每一种可能的场景的情况下建立充分的测试覆盖率。</p><p>在本教程中，我们将检查这种方法以及如何使用正交数组测试（OAT）技术来实现它。</p><p>最后，我们将确定使用灰色盒子测试的优点和缺点。</p><h2 id="_2-什么是灰色盒子测试" tabindex="-1"><a class="header-anchor" href="#_2-什么是灰色盒子测试"><span>2. 什么是灰色盒子测试？</span></a></h2><p>首先，我们比较白色与黑色盒子测试方法，然后理解灰色盒子测试。</p><p>白色盒子测试是指我们完全了解算法的测试部分。因此，我们可以测试该算法的所有路径。并且，由于这个原因，白色盒子测试可能会产生大量的测试场景。</p><p>黑色盒子测试意味着测试应用程序的外部视角。换句话说，我们对实现的算法一无所知，测试其所有路径更加困难。因此，我们专注于验证有限数量的测试场景。</p><p>灰色盒子测试使用有限的信息，通常是白色盒子测试中可用的信息。然后，它使用黑色盒子测试技术来使用可用的信息生成测试场景。</p><p>因此，我们最终的测试场景比白色盒子测试少。然而，<strong>这些场景覆盖的功能比黑色盒子测试多</strong>。</p><p>因此，<strong>灰色盒子测试是黑色盒子测试技术和白色盒子测试知识的混合</strong>。</p><h2 id="_3-进行灰色盒子测试" tabindex="-1"><a class="header-anchor" href="#_3-进行灰色盒子测试"><span>3. 进行灰色盒子测试</span></a></h2><p>在这一部分，我们将使用OAT技术在佣金计算器演示应用程序上进行灰色盒子测试。</p><h3 id="_3-1-创建待测试系统" tabindex="-1"><a class="header-anchor" href="#_3-1-创建待测试系统"><span>3.1. 创建待测试系统</span></a></h3><p>在测试之前，我们首先创建一个应用程序来计算销售人员基于四个属性的平均佣金：</p><ul><li>销售人员级别 - L1、L2或L3</li><li>合同类型 - 全职佣金制、承包商或自由职业者</li><li>资历 - 初级、中级、高级</li><li>销售影响 - 低、中、高</li></ul><p>为了实现这一点，让我们创建_SalaryCommissionPercentageCalculator_类来满足上述要求：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SalaryCommissionPercentageCalculator</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">BigDecimal</span> <span class="token function">calculate</span><span class="token punctuation">(</span><span class="token class-name">Level</span> level<span class="token punctuation">,</span> <span class="token class-name">Type</span> type<span class="token punctuation">,</span>
      <span class="token class-name">Seniority</span> seniority<span class="token punctuation">,</span> <span class="token class-name">SalesImpact</span> impact<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token class-name">DoubleStream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>
          level<span class="token punctuation">.</span><span class="token function">getBonus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          type<span class="token punctuation">.</span><span class="token function">getBonus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          seniority<span class="token punctuation">.</span><span class="token function">getBonus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          impact<span class="token punctuation">.</span><span class="token function">getBonus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          type<span class="token punctuation">.</span><span class="token function">getBonus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">average</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">setScale</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token class-name">RoundingMode</span><span class="token punctuation">.</span><span class="token constant">CEILING</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">Level</span> <span class="token punctuation">{</span>
        <span class="token function">L1</span><span class="token punctuation">(</span><span class="token number">0.06</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">L2</span><span class="token punctuation">(</span><span class="token number">0.12</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">L3</span><span class="token punctuation">(</span><span class="token number">0.2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">double</span> bonus<span class="token punctuation">;</span>

        <span class="token class-name">Level</span><span class="token punctuation">(</span><span class="token keyword">double</span> bonus<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>bonus <span class="token operator">=</span> bonus<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">getBonus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> bonus<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 其他枚举定义...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码定义了四个枚举来映射销售人员的属性。每个枚举包含一个表示每个属性佣金百分比的_bonus_字段。</p><p>_calculate()_方法使用双精度原始流计算所有百分比的平均值。</p><p>最后，我们使用_BigDecimal_类的_setScale()_方法将平均结果四舍五入到两位小数。</p><h3 id="_3-2-oat技术简介" tabindex="-1"><a class="header-anchor" href="#_3-2-oat技术简介"><span>3.2. OAT技术简介</span></a></h3><p>OAT技术基于田口博士提出的田口设计实验。该实验允许我们只考虑所有输入组合的一个子集来测试变量之间的交互。</p><p>这个想法是只考虑变量值之间的两个因素交互，并在构建实验时忽略重复的交互。这意味着<strong>每个变量的值在实验子集中恰好与另一个变量的值交互一次</strong>。当我们构建测试场景时，这将变得清晰。</p><p>变量及其值用于构建正交数组。<strong>正交数组是一个数字数组，其中每一行表示变量的唯一组合</strong>。列代表可以取几个值的单个变量。</p><p>我们可以将正交数组表示为_val^var_，其中_val_是它们假设的数值，_var_是输入变量的数量。在我们的例子中，我们有四个变量，每个变量假设三个值。因此，<em>val_等于_3</em>，<em>var_等于_4</em>。</p><p>最后，正确的正交数组是_3^4_，也称为田口设计中的“L9：3级4因素”。</p><h3 id="_3-3-获取正交数组" tabindex="-1"><a class="header-anchor" href="#_3-3-获取正交数组"><span>3.3. 获取正交数组</span></a></h3><p>计算正交数组可能过于复杂且计算成本高昂。为此，OAT测试的设计者通常使用已经映射好的数组列表。因此，我们可以使用这些数组目录来找到正确的一个。在我们的例子中，目录中正确的数组是L9 3级4因素数组：</p><table><thead><tr><th>场景编号</th><th>var 1</th><th>var 2</th><th>var 3</th><th>var 4</th></tr></thead><tbody><tr><td>1</td><td><em>val 1</em></td><td><em>val 1</em></td><td><em>val 1</em></td><td><em>val 1</em></td></tr><tr><td>2</td><td><em>val 1</em></td><td><em>val 2</em></td><td><em>val 3</em></td><td><em>val 2</em></td></tr><tr><td>3</td><td><em>val 1</em></td><td><em>val 3</em></td><td><em>val 2</em></td><td><em>val 3</em></td></tr><tr><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr></tbody></table><h3 id="_3-4-映射变量及其值" tabindex="-1"><a class="header-anchor" href="#_3-4-映射变量及其值"><span>3.4. 映射变量及其值</span></a></h3><p>现在，我们必须将变量及其值按照它们在代码中出现的顺序替换到我们的正交数组中。例如，<em>var 1</em> 对应于第一个定义的_enum_，<em>Level</em>，其中_Level_下的_val 0_是它的第一个值，<em>L1</em>。</p><p>映射完所有变量后，我们得到下面的填充表格：</p><table><thead><tr><th>场景编号</th><th>Level</th><th>Type</th><th>Seniority</th><th>SalesImpact</th></tr></thead><tbody><tr><td>1</td><td>L1</td><td>FULL_TIME_COMMISSIONED</td><td>JR</td><td>LOW</td></tr><tr><td>2</td><td>L1</td><td>CONTRACTOR</td><td>SR</td><td>MEDIUM</td></tr><tr><td>3</td><td>L1</td><td>FREELANCER</td><td>MID</td><td>HIGH</td></tr><tr><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr></tbody></table><h3 id="_3-5-配置junit-5" tabindex="-1"><a class="header-anchor" href="#_3-5-配置junit-5"><span>3.5. 配置JUnit 5</span></a></h3><p>本文的主要重点是使用OAT灰色盒子技术进行灰色盒子测试。因此，为了简单起见，我们将使用简单的单元测试来说明它。</p><p>首先，我们需要在我们的项目中配置JUnit 5。为此，让我们将最新依赖项junit-jupiter-engine添加到我们的_pom.xml_文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.junit.jupiter\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`junit-jupiter-engine\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`5.10.2\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>\`test\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-6-创建测试类" tabindex="-1"><a class="header-anchor" href="#_3-6-创建测试类"><span>3.6. 创建测试类</span></a></h3><p>让我们定义_SalaryCommissionPercentageCalculatorUnitTest_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">SalaryCommissionPercentageCalculatorUnitTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">SalaryCommissionPercentageCalculator</span> testTarget <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SalaryCommissionPercentageCalculator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@ParameterizedTest</span>
    <span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;provideReferenceTestScenarioTable&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">void</span> <span class="token function">givenReferenceTable_whenCalculateAverageCommission_thenReturnExpectedResult</span><span class="token punctuation">(</span><span class="token class-name">Level</span> level<span class="token punctuation">,</span>
      <span class="token class-name">Type</span> type<span class="token punctuation">,</span> <span class="token class-name">Seniority</span> seniority<span class="token punctuation">,</span> <span class="token class-name">SalesImpact</span> impact<span class="token punctuation">,</span> <span class="token keyword">double</span> expected<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">BigDecimal</span> got <span class="token operator">=</span> testTarget<span class="token punctuation">.</span><span class="token function">calculate</span><span class="token punctuation">(</span>level<span class="token punctuation">,</span> type<span class="token punctuation">,</span> seniority<span class="token punctuation">,</span> impact<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">BigDecimal</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">,</span> got<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Stream</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Arguments</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">provideReferenceTestScenarioTable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>
                <span class="token class-name">Arguments</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token constant">L1</span><span class="token punctuation">,</span> <span class="token constant">FULL_TIME_COMMISSIONED</span><span class="token punctuation">,</span> <span class="token constant">JR</span><span class="token punctuation">,</span> <span class="token constant">LOW</span><span class="token punctuation">,</span> <span class="token number">0.26</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token comment">// ... 其他参数</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要理解发生了什么，让我们分解代码。</p><p>测试方法使用JUnit 5参数化测试和_@MethodSource_注解，使用一个方法作为输入数据提供者。</p><p>_provideReferenceTestScenarioTable()<em>提供了与第3.4节中的正交数组相同的数据，作为参数的_Stream</em>。每个_Argument.of()_调用对应于一个测试场景和_calculate()_调用的预期结果。</p><p>最后，我们使用提供的参数调用_calculate()_，并使用_assertEquals()_比较实际结果与预期结果。</p><h2 id="_4-灰色盒子测试的优缺点" tabindex="-1"><a class="header-anchor" href="#_4-灰色盒子测试的优缺点"><span>4. 灰色盒子测试的优缺点</span></a></h2><p>在我们的示例中，_input of calculate()<em>的总排列数是_81</em>。<strong>我们使用OAT将其数量减少到9，同时保持良好的测试覆盖率。</strong></p><p>尝试所有输入组合可能变得困难，如果输入大小变得太大。例如，在具有10个变量和10个值的系统中，总场景数将是10 e10。测试这样高数量的场景是不切实际的。我们可以通过使用OAT来减少这个数字，避免输入的组合爆炸。</p><p>因此，<strong>OAT技术的主要优点是它提高了测试代码的可维护性和开发速度</strong>，而不失测试覆盖率。</p><p>另一方面，<strong>OAT技术和灰色盒子测试通常的缺点是没有覆盖所有可能的输入排列。</strong> 因此，我们可能会错过重要的测试场景或问题边缘情况。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们检查了OAT技术，以理解灰色盒子测试。</p><p>使用这种技术，我们大幅减少了测试场景的数量。然而，我们必须适当评估何时使用它，因为我们可能会错过重要的边缘情况。</p><p>像往常一样，示例代码可在GitHub上获得。</p>`,55),c=[p];function o(l,i){return s(),a("div",null,c)}const r=n(e,[["render",o],["__file","2024-07-04-Gray Box Testing Using the OAT Technique.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Gray%20Box%20Testing%20Using%20the%20OAT%20Technique.html","title":"灰色盒子测试使用OAT技术 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Software Testing","Java"],"tag":["Gray Box Testing","OAT","Test Coverage"],"head":[["meta",{"name":"keywords","content":"Java, Gray Box Testing, OAT, Test Coverage, Software Testing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Gray%20Box%20Testing%20Using%20the%20OAT%20Technique.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"灰色盒子测试使用OAT技术 | Baeldung"}],["meta",{"property":"og:description","content":"灰色盒子测试使用OAT技术 | Baeldung 1. 概述 灰色盒子测试帮助我们在不测试每一种可能的场景的情况下建立充分的测试覆盖率。 在本教程中，我们将检查这种方法以及如何使用正交数组测试（OAT）技术来实现它。 最后，我们将确定使用灰色盒子测试的优点和缺点。 2. 什么是灰色盒子测试？ 首先，我们比较白色与黑色盒子测试方法，然后理解灰色盒子测试。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T20:56:43.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Gray Box Testing"}],["meta",{"property":"article:tag","content":"OAT"}],["meta",{"property":"article:tag","content":"Test Coverage"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T20:56:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"灰色盒子测试使用OAT技术 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T20:56:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"灰色盒子测试使用OAT技术 | Baeldung 1. 概述 灰色盒子测试帮助我们在不测试每一种可能的场景的情况下建立充分的测试覆盖率。 在本教程中，我们将检查这种方法以及如何使用正交数组测试（OAT）技术来实现它。 最后，我们将确定使用灰色盒子测试的优点和缺点。 2. 什么是灰色盒子测试？ 首先，我们比较白色与黑色盒子测试方法，然后理解灰色盒子测试。..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 什么是灰色盒子测试？","slug":"_2-什么是灰色盒子测试","link":"#_2-什么是灰色盒子测试","children":[]},{"level":2,"title":"3. 进行灰色盒子测试","slug":"_3-进行灰色盒子测试","link":"#_3-进行灰色盒子测试","children":[{"level":3,"title":"3.1. 创建待测试系统","slug":"_3-1-创建待测试系统","link":"#_3-1-创建待测试系统","children":[]},{"level":3,"title":"3.2. OAT技术简介","slug":"_3-2-oat技术简介","link":"#_3-2-oat技术简介","children":[]},{"level":3,"title":"3.3. 获取正交数组","slug":"_3-3-获取正交数组","link":"#_3-3-获取正交数组","children":[]},{"level":3,"title":"3.4. 映射变量及其值","slug":"_3-4-映射变量及其值","link":"#_3-4-映射变量及其值","children":[]},{"level":3,"title":"3.5. 配置JUnit 5","slug":"_3-5-配置junit-5","link":"#_3-5-配置junit-5","children":[]},{"level":3,"title":"3.6. 创建测试类","slug":"_3-6-创建测试类","link":"#_3-6-创建测试类","children":[]}]},{"level":2,"title":"4. 灰色盒子测试的优缺点","slug":"_4-灰色盒子测试的优缺点","link":"#_4-灰色盒子测试的优缺点","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720126603000,"updatedTime":1720126603000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.33,"words":1900},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Gray Box Testing Using the OAT Technique.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>灰色盒子测试帮助我们在不测试每一种可能的场景的情况下建立充分的测试覆盖率。</p>\\n<p>在本教程中，我们将检查这种方法以及如何使用正交数组测试（OAT）技术来实现它。</p>\\n<p>最后，我们将确定使用灰色盒子测试的优点和缺点。</p>\\n<h2>2. 什么是灰色盒子测试？</h2>\\n<p>首先，我们比较白色与黑色盒子测试方法，然后理解灰色盒子测试。</p>\\n<p>白色盒子测试是指我们完全了解算法的测试部分。因此，我们可以测试该算法的所有路径。并且，由于这个原因，白色盒子测试可能会产生大量的测试场景。</p>\\n<p>黑色盒子测试意味着测试应用程序的外部视角。换句话说，我们对实现的算法一无所知，测试其所有路径更加困难。因此，我们专注于验证有限数量的测试场景。</p>","autoDesc":true}');export{r as comp,k as data};
