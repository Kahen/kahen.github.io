import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-B_xdonR7.js";const e={},p=t(`<h1 id="java中模拟相同方法的不同参数" tabindex="-1"><a class="header-anchor" href="#java中模拟相同方法的不同参数"><span>Java中模拟相同方法的不同参数</span></a></h1><p>当在Java中模拟一个方法时，根据传入的参数接收不同的响应可能是有用的。在本文中，我们将根据不同的复杂性要求，探讨实现这一目标的不同方式。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>首先，<strong>让我们创建一个我们想要模拟的示例服务</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ExampleService</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们得到了一个非常简单的服务，它有一个单一的方法。该方法有一个整数作为参数，并返回一个整数。注意，参数和返回值之间没有关系，所以默认情况下，它总是返回1。</p><h2 id="_3-连续stubbing的限制" tabindex="-1"><a class="header-anchor" href="#_3-连续stubbing的限制"><span>3. 连续Stubbing的限制</span></a></h2><p>让我们看看连续Stubbing以及我们能用它做什么和不能做什么。<strong>我们可以使用连续Stubbing来获取我们的模拟的不同的参数，而不管我们提供了什么输入。</strong> 这显然缺乏对匹配特定输入到期望输出的控制，但在许多情况下都很有用。要做到这一点，我们将想要Stub的方法传递给_when()<em>。然后我们链式调用_thenReturn()</em>，提供我们想要的顺序的响应：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAMethod_whenUsingConsecutiveStubbing_thenExpectResultsInOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">when</span><span class="token punctuation">(</span>exampleService<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token function">anyInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token number">27</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span> exampleService<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">,</span> exampleService<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">27</span><span class="token punctuation">,</span> exampleService<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">27</span><span class="token punctuation">,</span> exampleService<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们从断言中可以看到，尽管总是以1作为参数，但我们按顺序收到了预期的值</strong>。一旦所有值都返回了，所有未来的调用将返回最后一个值，就像我们在测试中的第四个调用看到的那样。</p><h2 id="_4-为不同参数stubbing调用" tabindex="-1"><a class="header-anchor" href="#_4-为不同参数stubbing调用"><span>4. 为不同参数Stubbing调用</span></a></h2><p><strong>我们可以扩展我们对_when()_和_thenReturn()_的使用，以返回不同参数的不同值</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAMethod_whenStubbingForMultipleArguments_thenExpectDifferentResults</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">when</span><span class="token punctuation">(</span>exampleService<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">when</span><span class="token punctuation">(</span>exampleService<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">when</span><span class="token punctuation">(</span>exampleService<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> exampleService<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> exampleService<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">,</span> exampleService<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_when()_的参数是我们想要Stub的方法，以及我们想要指定响应的值。通过将对_when()_的调用与_thenReturn()_链式起来，我们已经指示模拟在接收到正确的参数时返回请求的值。我们可以自由地将这些应用到我们的模拟中，以处理一系列输入。每次提供预期的输入值时，我们都会收到请求的返回值。</p><h2 id="_5-使用-thenanswer" tabindex="-1"><a class="header-anchor" href="#_5-使用-thenanswer"><span>5. 使用_thenAnswer()</span></a></h2><p><strong>一个更复杂的选项，提供最大控制，是使用_thenAnswer()_。</strong> 这允许我们获取参数，对它们执行我们想要的任何计算，然后在与模拟交互时返回将被输出的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAMethod_whenUsingThenAnswer_thenExpectDifferentResults</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">when</span><span class="token punctuation">(</span>exampleService<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token function">anyInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenAnswer</span><span class="token punctuation">(</span>invocation <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> argument <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> invocation<span class="token punctuation">.</span><span class="token function">getArguments</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> result<span class="token punctuation">;</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>argument<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token number">25</span><span class="token operator">:</span>
            result <span class="token operator">=</span> <span class="token number">125</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">50</span><span class="token operator">:</span>
            result <span class="token operator">=</span> <span class="token number">150</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">75</span><span class="token operator">:</span>
            result <span class="token operator">=</span> <span class="token number">175</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            result <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">125</span><span class="token punctuation">,</span> exampleService<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">150</span><span class="token punctuation">,</span> exampleService<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">175</span><span class="token punctuation">,</span> exampleService<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token number">75</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面，我们使用提供的invocation对象上的_getArguments()_获取了参数。我们假设这里有一个单一的整数参数，但我们本可以处理几种不同类型的参数。我们还可以检查至少有一个参数，并且将参数转换为整数是成功的。为了展示能力，我们使用_switch_语句根据输入返回不同的值。在底部，我们可以看到从断言中，我们的模拟服务返回了_switch_语句的结果。</p><p>这个选项允许我们用单个_when()_调用处理无限数量的输入。牺牲的是测试的可读性和可维护性。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本教程中，我们看到了三种配置模拟方法以返回不同值的方式。我们看了连续Stubbing，发现它对于按顺序返回已知值对于任何输入都很有用，但除此之外非常有限。使用_when()_结合_thenReturn()_对于每个可能的输入提供了一个简单的解决方案，具有改进的控制。或者，我们可以使用_thenAnswer()_来获得对给定输入和期望输出之间关系的最大程度的控制。根据测试要求，这三种都是有用的。</p><p>像往常一样，示例的完整代码可以在GitHub上找到。翻译已完成，以下是剩余部分：</p><h2 id="_6-结论-1" tabindex="-1"><a class="header-anchor" href="#_6-结论-1"><span>6. 结论</span></a></h2><p>在本教程中，我们探讨了三种配置模拟方法以返回不同值的方式。我们研究了连续Stubbing，发现它在返回任何输入的顺序已知值方面非常有用，但除此之外功能有限。使用结合了_thenReturn()_的_when()_为每个潜在的输入提供了一个更简单的解决方案，并且控制力更强。另外，我们可以使用_thenAnswer()_来获得对输入和期望输出之间关系的最大程度的控制。根据测试需求，这三种方法都很有用。</p><p>如往常一样，示例的完整代码可以在GitHub上找到。</p><p>OK</p>`,26),o=[p];function c(u,l){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-30-Mock Same Method with Different Parameters.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Mock%20Same%20Method%20with%20Different%20Parameters.html","title":"Java中模拟相同方法的不同参数","lang":"zh-CN","frontmatter":{"date":"2024-07-01T00:00:00.000Z","category":["Java","编程"],"tag":["测试","模拟"],"head":[["meta",{"name":"keywords","content":"Java, 模拟, Mockito, 测试"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Mock%20Same%20Method%20with%20Different%20Parameters.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中模拟相同方法的不同参数"}],["meta",{"property":"og:description","content":"Java中模拟相同方法的不同参数 当在Java中模拟一个方法时，根据传入的参数接收不同的响应可能是有用的。在本文中，我们将根据不同的复杂性要求，探讨实现这一目标的不同方式。 2. 设置 首先，让我们创建一个我们想要模拟的示例服务： 我们得到了一个非常简单的服务，它有一个单一的方法。该方法有一个整数作为参数，并返回一个整数。注意，参数和返回值之间没有关系..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T20:29:21.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"测试"}],["meta",{"property":"article:tag","content":"模拟"}],["meta",{"property":"article:published_time","content":"2024-07-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T20:29:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中模拟相同方法的不同参数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T20:29:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中模拟相同方法的不同参数 当在Java中模拟一个方法时，根据传入的参数接收不同的响应可能是有用的。在本文中，我们将根据不同的复杂性要求，探讨实现这一目标的不同方式。 2. 设置 首先，让我们创建一个我们想要模拟的示例服务： 我们得到了一个非常简单的服务，它有一个单一的方法。该方法有一个整数作为参数，并返回一个整数。注意，参数和返回值之间没有关系..."},"headers":[{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[]},{"level":2,"title":"3. 连续Stubbing的限制","slug":"_3-连续stubbing的限制","link":"#_3-连续stubbing的限制","children":[]},{"level":2,"title":"4. 为不同参数Stubbing调用","slug":"_4-为不同参数stubbing调用","link":"#_4-为不同参数stubbing调用","children":[]},{"level":2,"title":"5. 使用_thenAnswer()","slug":"_5-使用-thenanswer","link":"#_5-使用-thenanswer","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论-1","link":"#_6-结论-1","children":[]}],"git":{"createdTime":1719779361000,"updatedTime":1719779361000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.24,"words":1272},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Mock Same Method with Different Parameters.md","localizedDate":"2024年7月1日","excerpt":"\\n<p>当在Java中模拟一个方法时，根据传入的参数接收不同的响应可能是有用的。在本文中，我们将根据不同的复杂性要求，探讨实现这一目标的不同方式。</p>\\n<h2>2. 设置</h2>\\n<p>首先，<strong>让我们创建一个我们想要模拟的示例服务</strong>：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">ExampleService</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">int</span> <span class=\\"token function\\">getValue</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> arg<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
