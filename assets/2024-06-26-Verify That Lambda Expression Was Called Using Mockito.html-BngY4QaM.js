import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-CZdUP17Q.js";const e={},p=t(`<h1 id="使用mockito验证lambda表达式被调用" tabindex="-1"><a class="header-anchor" href="#使用mockito验证lambda表达式被调用"><span>使用Mockito验证Lambda表达式被调用</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将探讨如何测试我们的代码是否调用了Lambda函数。实现此目标有两种方法。首先，我们将检查Lambda是否使用正确的参数被调用。然后，我们将关注测试行为，检查Lambda代码是否执行并产生了预期的结果。</p><h2 id="_2-被测试的示例类" tabindex="-1"><a class="header-anchor" href="#_2-被测试的示例类"><span>2. 被测试的示例类</span></a></h2><p>首先，让我们创建一个名为_LambdaExample_的类，它包含一个我们将调用_bricksList_的_ArrayList_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">LambdaExample</span> <span class="token punctuation">{</span>
    <span class="token class-name">ArrayList</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` bricksList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们添加一个名为_BrickLayer_的内部类，它将为我们添加砖块：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">LambdaExample</span> <span class="token punctuation">{</span>
    <span class="token class-name">BrickLayer</span> brickLayer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BrickLayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">class</span> <span class="token class-name">BrickLayer</span> <span class="token punctuation">{</span>
        <span class="token keyword">void</span> <span class="token function">layBricks</span><span class="token punctuation">(</span><span class="token class-name">String</span> bricks<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            bricksList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>bricks<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_BrickLayer_并没有做太多事情。它有一个名为_layBricks()_的单一方法，将为我们向我们的_List_添加一块砖。这可以是一个外部类，但为了保持概念的集中和简单，内部类在这里起作用。</p><p>最后，我们可以向_LambdaExample_添加一个方法，通过Lambda调用_layBricks()_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">createWall</span><span class="token punctuation">(</span><span class="token class-name">String</span> bricks<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Runnable</span> build <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> brickLayer<span class="token punctuation">.</span><span class="token function">layBricks</span><span class="token punctuation">(</span>bricks<span class="token punctuation">)</span><span class="token punctuation">;</span>
    build<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次，我们保持事情简单。我们的现实世界应用程序更加复杂，但这个简化的示例将帮助解释测试方法。</p><p>在接下来的部分中，我们将测试调用_createWall()_是否会导致Lambda内预期的_layBricks()_执行。</p><h2 id="_3-测试正确的调用" tabindex="-1"><a class="header-anchor" href="#_3-测试正确的调用"><span>3. 测试正确的调用</span></a></h2><p><strong>我们首先要看的测试方法是基于确认Lambda在我们期望的时候被调用。</strong> 此外，我们需要确认它接收到了正确的参数。首先，我们需要为_BrickLayer_和_LambdaExample_创建Mocks：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mock</span>
<span class="token class-name">BrickLayer</span> brickLayer<span class="token punctuation">;</span>
<span class="token annotation punctuation">@InjectMocks</span>
<span class="token class-name">LambdaExample</span> lambdaExample<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们对_LambdaExample_应用了_@InjectMocks_注解，以便它使用模拟的_BrickLayer_对象。由于这个原因，我们将能够确认对_layBricks()_方法的调用。</p><p>现在我们可以编写我们的测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenCallingALambda_thenTheInvocationCanBeConfirmedWithCorrectArguments</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> bricks <span class="token operator">=</span> <span class="token string">&quot;red bricks&quot;</span><span class="token punctuation">;</span>
    lambdaExample<span class="token punctuation">.</span><span class="token function">createWall</span><span class="token punctuation">(</span>bricks<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">verify</span><span class="token punctuation">(</span>brickLayer<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">layBricks</span><span class="token punctuation">(</span>bricks<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们定义了我们想要添加到_bricksList_的_String_，并将其作为参数传递给_createWall()_。让我们记住，我们使用的是我们之前创建的Mock作为_LambdaExample_的实例。</p><p>然后我们使用了Mockito的_verify()_函数。<strong>_Verify()_对于这种测试非常有帮助。它确认了函数_layBricks()_被调用，并且参数是我们期望的。</strong></p><p>_verify()_可以做更多的事情。例如，确认一个方法被调用了多少次。对于我们的目的，确认我们的Lambda按预期调用了方法是足够的。</p><h2 id="_4-测试正确的行为" tabindex="-1"><a class="header-anchor" href="#_4-测试正确的行为"><span>4. 测试正确的行为</span></a></h2><p>我们可以走的第二条测试路线是不去担心什么被调用以及何时被调用。<strong>相反，我们将确认Lambda函数的预期行为发生了。</strong> 我们几乎总是有一个很好的理由来调用一个函数。也许是为了执行一个计算或获取或设置一个变量。</p><p>在我们的示例中，Lambda向一个_ArrayList_添加了一个给定的_String_。在这一部分，让我们验证Lambda是否成功执行了这项任务：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenCallingALambda_thenCorrectBehaviourIsPerformed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">LambdaExample</span> lambdaExample <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaExample</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> bricks <span class="token operator">=</span> <span class="token string">&quot;red bricks&quot;</span><span class="token punctuation">;</span>

    lambdaExample<span class="token punctuation">.</span><span class="token function">createWall</span><span class="token punctuation">(</span>bricks<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ArrayList</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` bricksList <span class="token operator">=</span> lambdaExample<span class="token punctuation">.</span><span class="token function">getBricksList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>bricks<span class="token punctuation">,</span> bricksList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个_LambdaExample_类的实例。接下来，我们调用_createWall()_向_ArrayList_添加一块砖。</p><p>现在我们应该看到_bricksList_包含了我们刚刚添加的_String_。假设代码正确执行了Lambda。我们通过从_lambdaExample_检索_bricksList_并检查内容来确认这一点。</p><p>我们可以得出结论，Lambda正在按预期执行，因为这是我们的String可能最终进入_ArrayList_的唯一方式。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了测试Lambda调用的两种方法。第一种在我们能够模拟包含函数的类并将其注入到调用它的类中时非常有用。在这种情况下，我们可以使用Mockito来验证函数调用和正确的参数。然而，这并不能保证Lambda继续做了我们期望的事情。</p><p>另一种选择是测试Lambda在被调用时是否产生了预期的结果。这提供了更多的测试覆盖率，如果能够简单地访问并确认函数调用的正确行为，通常更可取。</p><p>一如既往，示例的完整代码可以在GitHub上找到。</p>`,33),c=[p];function i(o,l){return s(),n("div",null,c)}const d=a(e,[["render",i],["__file","2024-06-26-Verify That Lambda Expression Was Called Using Mockito.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Verify%20That%20Lambda%20Expression%20Was%20Called%20Using%20Mockito.html","title":"使用Mockito验证Lambda表达式被调用","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","Testing"],"tag":["Mockito","Lambda Expression","Testing"],"head":[["meta",{"name":"keywords","content":"Java, Mockito, Lambda Expression, Unit Testing, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Verify%20That%20Lambda%20Expression%20Was%20Called%20Using%20Mockito.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Mockito验证Lambda表达式被调用"}],["meta",{"property":"og:description","content":"使用Mockito验证Lambda表达式被调用 1. 概述 在本教程中，我们将探讨如何测试我们的代码是否调用了Lambda函数。实现此目标有两种方法。首先，我们将检查Lambda是否使用正确的参数被调用。然后，我们将关注测试行为，检查Lambda代码是否执行并产生了预期的结果。 2. 被测试的示例类 首先，让我们创建一个名为_LambdaExample..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T08:33:20.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Mockito"}],["meta",{"property":"article:tag","content":"Lambda Expression"}],["meta",{"property":"article:tag","content":"Testing"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T08:33:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Mockito验证Lambda表达式被调用\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T08:33:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Mockito验证Lambda表达式被调用 1. 概述 在本教程中，我们将探讨如何测试我们的代码是否调用了Lambda函数。实现此目标有两种方法。首先，我们将检查Lambda是否使用正确的参数被调用。然后，我们将关注测试行为，检查Lambda代码是否执行并产生了预期的结果。 2. 被测试的示例类 首先，让我们创建一个名为_LambdaExample..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 被测试的示例类","slug":"_2-被测试的示例类","link":"#_2-被测试的示例类","children":[]},{"level":2,"title":"3. 测试正确的调用","slug":"_3-测试正确的调用","link":"#_3-测试正确的调用","children":[]},{"level":2,"title":"4. 测试正确的行为","slug":"_4-测试正确的行为","link":"#_4-测试正确的行为","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719390800000,"updatedTime":1719390800000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.79,"words":1138},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Verify That Lambda Expression Was Called Using Mockito.md","localizedDate":"2024年6月26日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将探讨如何测试我们的代码是否调用了Lambda函数。实现此目标有两种方法。首先，我们将检查Lambda是否使用正确的参数被调用。然后，我们将关注测试行为，检查Lambda代码是否执行并产生了预期的结果。</p>\\n<h2>2. 被测试的示例类</h2>\\n<p>首先，让我们创建一个名为_LambdaExample_的类，它包含一个我们将调用_bricksList_的_ArrayList_：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">LambdaExample</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">ArrayList</span>``<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>`` bricksList <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
