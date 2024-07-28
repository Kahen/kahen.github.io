import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DzJ3ruqA.js";const e={},p=t(`<h1 id="mockk中使用spy的指南" tabindex="-1"><a class="header-anchor" href="#mockk中使用spy的指南"><span>MockK中使用Spy的指南</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>模拟是单元测试的一个重要方面。它允许我们隔离组件，确保代码库的每个部分都能按预期工作。在Kotlin中，有一个强大的测试框架叫做MockK，它提供了一个称为间谍（spies）的特性。间谍是一种高级用例，我们可以用模拟框架来观察真实对象。</p><p>在本教程中，我们将探讨MockK中间谍的概念以及它们如何增强我们的单元测试过程。</p><h2 id="_2-理解模拟和间谍" tabindex="-1"><a class="header-anchor" href="#_2-理解模拟和间谍"><span>2. 理解模拟和间谍</span></a></h2><p>在我们深入间谍之前，让我们简要回顾一下模拟的概念。<strong>在单元测试中，模拟是创建模仿真实对象行为的假对象</strong>。这允许开发人员在不依赖依赖对象的实际实现的情况下测试组件的隔离。我们可以使用<code>mockk&lt;&gt;</code>创建一个模拟：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> mock <span class="token operator">=</span> mockk\`\`<span class="token operator">&lt;</span>Any<span class="token operator">&gt;</span>\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在MockK的上下文中，间谍是一种允许部分模拟的模拟类型。这意味着我们可以使用间谍来模拟真实对象的特定方法，同时保留其余方法的原始行为。这种能力使间谍成为单元测试中的一种多功能工具，使开发人员能够在不完全隔离被测试组件的情况下测试代码的某些方面。我们可以使用<code>spyk&lt;&gt;</code>创建一个间谍：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> spy <span class="token operator">=</span> spyk\`\`<span class="token operator">&lt;</span>Any<span class="token operator">&gt;</span>\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-1-mockk依赖性" tabindex="-1"><a class="header-anchor" href="#_2-1-mockk依赖性"><span>2.1. MockK依赖性</span></a></h3><p>为了使用这些特性，我们需要将MockK添加到我们的项目中。我们可以在<code>build.gradle</code>或<code>build.gradle.kts</code>文件中的依赖项中添加它：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>dependencies <span class="token punctuation">{</span>
    testImplementation <span class="token interpolation-string"><span class="token string">&quot;io.mockk:mockk:1.12.0&quot;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-在kotlin中使用间谍" tabindex="-1"><a class="header-anchor" href="#_3-在kotlin中使用间谍"><span>3. 在Kotlin中使用间谍</span></a></h2><p>现在，让我们探索如何在Kotlin中使用MockK的间谍。假设我们有一个名为_Calculator_的简单类，它具有各种数学运算：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">add</span><span class="token punctuation">(</span>a<span class="token operator">:</span> Int<span class="token punctuation">,</span> b<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token operator">:</span> Int <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a<span class="token operator">+</span>b
<span class="token punctuation">}</span>
<span class="token keyword">fun</span> <span class="token function">findAverage</span><span class="token punctuation">(</span>a<span class="token operator">:</span> Int<span class="token punctuation">,</span> b<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token operator">:</span> Int <span class="token punctuation">{</span>
    <span class="token keyword">val</span> total <span class="token operator">=</span> <span class="token function">add</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span>
    <span class="token keyword">return</span> total<span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码中，我们定义了两个函数：_add()_用于添加两个整数，_findAverage()_使用_add()_函数来计算两个整数的平均值。</p><p>我们使用<code>spyk()</code>函数创建我们的_Calculator_的间谍实例。<strong>这个间谍允许我们观察、拦截和验证方法调用，深入了解在测试期间这些方法是如何被调用的</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> CalculatorTest <span class="token punctuation">{</span>
    <span class="token annotation builtin">@Test</span>
    <span class="token keyword">fun</span> <span class="token function">testSpy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">val</span> spy <span class="token operator">=</span> spyk\`\`\`<span class="token operator">&lt;</span>Calculator<span class="token operator">&gt;</span>\`\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">val</span> result <span class="token operator">=</span> spy<span class="token punctuation">.</span><span class="token function">findAverage</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
        verify <span class="token punctuation">{</span> spy<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个代码中，我们的测试使用<code>spyk()</code>来观察_Calculator_的行为。具体来说，_verify()_行确保_add()_方法被调用了预期的参数，允许我们验证与间谍的交互并验证与间谍的交互。</p><h2 id="_4-使用间谍进行部分模拟" tabindex="-1"><a class="header-anchor" href="#_4-使用间谍进行部分模拟"><span>4. 使用间谍进行部分模拟</span></a></h2><p>除了观察和验证方法调用之外，MockK还允许我们在间谍上部分模拟方法。考虑我们之前的例子，并演示如何在_Calculator_间谍上模拟_add()_方法以返回特定值。这在我们想要控制某些方法的行为的同时仍然执行其他真实实现时很有帮助：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">testPartialMocking</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> spy <span class="token operator">=</span> spyk\`\`\`<span class="token operator">&lt;</span>Calculator<span class="token operator">&gt;</span>\`\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span>
    every <span class="token punctuation">{</span> spy<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">}</span> returns <span class="token number">2</span>
    <span class="token keyword">val</span> result <span class="token operator">=</span> spy<span class="token punctuation">.</span><span class="token function">findAverage</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
    verify <span class="token punctuation">{</span> spy<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们可以通过将函数传递给<code>every()</code>来控制我们的_spy_。我们可以指定特定的参数，但为了简单起见，这次我们选择了_any()_参数。最后，我们可以为间谍配置<code>returns()</code>值，在这种情况下是两个。</p><p><strong>这种部分模拟允许我们控制_add()_方法的行为，同时仍然执行_findAverage()_方法的真实实现</strong>。然后测试验证_add()_方法是否被调用了预期的参数，并且_findAverage()_的结果反映了带有模拟加法的真实行为。</p><h2 id="_5-重置间谍" tabindex="-1"><a class="header-anchor" href="#_5-重置间谍"><span>5. 重置间谍</span></a></h2><p>最后，<strong>我们可以使用_clearMocks()_来重置间谍上的模拟行为和调用记录</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">testPartialMocking</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> spy <span class="token operator">=</span> spyk\`\`\`<span class="token operator">&lt;</span>Calculator<span class="token operator">&gt;</span>\`\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span>
    every <span class="token punctuation">{</span> spy<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">}</span> returns <span class="token number">2</span>
    <span class="token keyword">val</span> result <span class="token operator">=</span> spy<span class="token punctuation">.</span><span class="token function">findAverage</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
    verify <span class="token punctuation">{</span> spy<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>
    <span class="token function">clearMocks</span><span class="token punctuation">(</span>spy<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用_clearMocks()_将重置任何使用_every()_在_spy_上配置的行为。这还将重置我们使用_verify()_检查的任何记录的调用。</p><h2 id="_6-使用间谍的好处" tabindex="-1"><a class="header-anchor" href="#_6-使用间谍的好处"><span>6. 使用间谍的好处</span></a></h2><p>间谍允许我们模拟特定方法，同时保留其余方法的原始行为。这在我们想要专注于测试类的特定部分而不需要完全隔离它时特别有用。</p><p><strong>与常规模拟不同，间谍让我们调用被监视对象的真实方法</strong>。当我们想要测试同一对象上真实方法与模拟方法的集成时，这是很有价值的。</p><p>间谍可以通过允许开发人员编写更专注和简洁的测试来增强代码的可维护性。当使用间谍时，我们可以选择模拟哪些方法以及保留哪些真实方法，从而得到更干净、更易读的测试代码。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在Kotlin的单元测试领域，间谍为开发人员提供了一个灵活而强大的工具。它们支持部分模拟，允许我们在保持其余部分原始行为的同时测试代码的特定组件。通过将间谍纳入我们的测试策略，我们可以在隔离代码进行测试和确保不同组件之间现实交互之间找到平衡。</p><p>如常，所提供的示例代码可在GitHub上找到。</p><p>OK</p>`,36),o=[p];function c(l,i){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-07-Using Spy in MockK.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Using%20Spy%20in%20MockK.html","title":"MockK中使用Spy的指南","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","MockK"],"tag":["Mocking","Spies","Unit Testing"],"head":[["meta",{"name":"keywords","content":"Kotlin, MockK, Spies, Unit Testing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Using%20Spy%20in%20MockK.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"MockK中使用Spy的指南"}],["meta",{"property":"og:description","content":"MockK中使用Spy的指南 1. 引言 模拟是单元测试的一个重要方面。它允许我们隔离组件，确保代码库的每个部分都能按预期工作。在Kotlin中，有一个强大的测试框架叫做MockK，它提供了一个称为间谍（spies）的特性。间谍是一种高级用例，我们可以用模拟框架来观察真实对象。 在本教程中，我们将探讨MockK中间谍的概念以及它们如何增强我们的单元测试..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T10:58:17.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Mocking"}],["meta",{"property":"article:tag","content":"Spies"}],["meta",{"property":"article:tag","content":"Unit Testing"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T10:58:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MockK中使用Spy的指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T10:58:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"MockK中使用Spy的指南 1. 引言 模拟是单元测试的一个重要方面。它允许我们隔离组件，确保代码库的每个部分都能按预期工作。在Kotlin中，有一个强大的测试框架叫做MockK，它提供了一个称为间谍（spies）的特性。间谍是一种高级用例，我们可以用模拟框架来观察真实对象。 在本教程中，我们将探讨MockK中间谍的概念以及它们如何增强我们的单元测试..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 理解模拟和间谍","slug":"_2-理解模拟和间谍","link":"#_2-理解模拟和间谍","children":[{"level":3,"title":"2.1. MockK依赖性","slug":"_2-1-mockk依赖性","link":"#_2-1-mockk依赖性","children":[]}]},{"level":2,"title":"3. 在Kotlin中使用间谍","slug":"_3-在kotlin中使用间谍","link":"#_3-在kotlin中使用间谍","children":[]},{"level":2,"title":"4. 使用间谍进行部分模拟","slug":"_4-使用间谍进行部分模拟","link":"#_4-使用间谍进行部分模拟","children":[]},{"level":2,"title":"5. 重置间谍","slug":"_5-重置间谍","link":"#_5-重置间谍","children":[]},{"level":2,"title":"6. 使用间谍的好处","slug":"_6-使用间谍的好处","link":"#_6-使用间谍的好处","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720349897000,"updatedTime":1720349897000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.73,"words":1420},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Using Spy in MockK.md","localizedDate":"2022年11月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>模拟是单元测试的一个重要方面。它允许我们隔离组件，确保代码库的每个部分都能按预期工作。在Kotlin中，有一个强大的测试框架叫做MockK，它提供了一个称为间谍（spies）的特性。间谍是一种高级用例，我们可以用模拟框架来观察真实对象。</p>\\n<p>在本教程中，我们将探讨MockK中间谍的概念以及它们如何增强我们的单元测试过程。</p>\\n<h2>2. 理解模拟和间谍</h2>\\n<p>在我们深入间谍之前，让我们简要回顾一下模拟的概念。<strong>在单元测试中，模拟是创建模仿真实对象行为的假对象</strong>。这允许开发人员在不依赖依赖对象的实际实现的情况下测试组件的隔离。我们可以使用<code>mockk&lt;&gt;</code>创建一个模拟：</p>","autoDesc":true}');export{k as comp,d as data};
