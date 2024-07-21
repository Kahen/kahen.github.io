import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CtR6X2Br.js";const e={},p=t(`<hr><h1 id="java中单元测试私有方法" tabindex="-1"><a class="header-anchor" href="#java中单元测试私有方法"><span>Java中单元测试私有方法</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将简要解释为什么直接测试私有方法通常不是一个好主意。然后我们将展示如何在必要时测试Java中的私有方法。</p><h2 id="_2-我们不应该测试私有方法的原因" tabindex="-1"><a class="header-anchor" href="#_2-我们不应该测试私有方法的原因"><span>2. 我们不应该测试私有方法的原因</span></a></h2><p><strong>一般来说，我们编写的单元测试应该只检查我们的公共方法合约。</strong> 私有方法是调用我们公共方法的人不知道的实现细节。此外，改变我们的实现细节不应该导致我们改变我们的测试。</p><p>一般来说，敦促测试私有方法突出了以下问题之一：</p><ul><li>我们的私有方法中有死代码。</li><li>我们的私有方法太复杂了，应该属于另一个类。</li><li>我们的方法本来就不应该设置为私有。</li></ul><p>因此，当我们觉得需要测试一个私有方法时，我们真正应该做的是修复潜在的设计问题。</p><h2 id="_3-一个示例-从私有方法中移除死代码" tabindex="-1"><a class="header-anchor" href="#_3-一个示例-从私有方法中移除死代码"><span>3. 一个示例：从私有方法中移除死代码</span></a></h2><p>让我们展示一个快速示例。</p><p>我们将编写一个私有方法，该方法将返回一个_Integer_的两倍。对于_null_值，我们希望返回_null_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Integer</span> <span class="token function">doubleInteger</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>input <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token number">2</span> <span class="token operator">*</span> input<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们编写我们的公共方法。它将是外部进入类的唯一入口点。</p><p>这个方法接收一个_Integer_作为输入。它验证这个_Integer_不是_null_；否则，它抛出一个_IllegalArgumentException_。之后，它调用私有方法返回_Integer_的两倍值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Integer</span> <span class="token function">validateAndDouble</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>input <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;input should not be null&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">doubleInteger</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们遵循我们的良好实践并测试我们的公共方法合约。</p><p>首先，让我们编写一个测试，确保如果输入是_null_，则抛出_IllegalArgumentException_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenNull_WhenValidateAndDouble_ThenThrows</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">validateAndDouble</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们检查一个非_null_的_Integer_是否正确加倍：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenANonNullInteger_WhenValidateAndDouble_ThenDoublesIt</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token function">validateAndDouble</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看JaCoCo插件报告的覆盖率：</p><p><img src="https://www.baeldung.com/wp-content/uploads/2022/06/public-and-private-method-code-coverage.png" alt="img" loading="lazy"> 正如我们所看到的，我们私有方法中的空检查没有被我们的单元测试覆盖。那么我们是否应该测试它呢？</p><p>答案是不。重要的是要理解，我们的私有方法并不是孤立存在的。它只会在公共方法中验证数据后被调用。<strong>因此，我们私有方法中的空检查永远不会被达到；它是死代码，应该被移除。</strong></p><p>假设我们没有被吓倒，让我们具体解释如何测试我们的私有方法。</p><p>要测试它，<strong>如果我们的私有方法有另一种可见性</strong>将会很有帮助。好消息是<strong>我们可以使用反射来模拟这一点。</strong></p><p>我们的封装类叫做_Utils_。的想法是访问名为_doubleInteger_的私有方法，该方法接受一个_Integer_作为参数。然后我们将修改其可见性，使其可以从_Utils_类外部访问。让我们看看我们如何做到这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">Method</span> <span class="token function">getDoubleIntegerMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchMethodException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Method</span> method <span class="token operator">=</span> <span class="token class-name">Utils</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDeclaredMethod</span><span class="token punctuation">(</span><span class="token string">&quot;doubleInteger&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    method<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> method<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以使用这个方法了。让我们编写一个测试，确保在给定一个_null_对象时，我们的私有方法返回_null_。我们需要将这个方法应用到一个将为_null_的参数上：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenNull_WhenDoubleInteger_ThenNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InvocationTargetException</span><span class="token punctuation">,</span> <span class="token class-name">IllegalAccessException</span><span class="token punctuation">,</span> <span class="token class-name">NoSuchMethodException</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token function">getDoubleIntegerMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Integer</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token keyword">null</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们更详细地解释一下_invoke_方法的用法。第一个参数是我们应用方法的对象。由于_doubleInteger_是静态的，我们传入了一个_null_。第二个参数是参数数组。在这种情况下，我们只有一个参数，它是_null_。</p><p>最后，让我们演示我们如何也可以测试非_null_输入的情况：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenANonNullInteger_WhenDoubleInteger_ThenDoubleIt</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchMethodException</span><span class="token punctuation">,</span> <span class="token class-name">InvocationTargetException</span><span class="token punctuation">,</span> <span class="token class-name">IllegalAccessException</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">74</span><span class="token punctuation">,</span> <span class="token function">getDoubleIntegerMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">37</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了为什么一般不建议测试私有方法。然后我们演示了如何使用反射来测试Java中的私有方法。</p><p>一如既往，代码可以在GitHub上找到。</p>`,36),o=[p];function l(c,i){return s(),a("div",null,o)}const d=n(e,[["render",l],["__file","2024-07-17-Unit Test Private Methods in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Unit%20Test%20Private%20Methods%20in%20Java.html","title":"Java中单元测试私有方法","lang":"zh-CN","frontmatter":{"date":"2022-06-01T00:00:00.000Z","category":["Java","Testing"],"tag":["Unit Testing","Private Methods","Reflection"],"head":[["meta",{"name":"keywords","content":"Java, Unit Testing, Private Methods, Reflection"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Unit%20Test%20Private%20Methods%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中单元测试私有方法"}],["meta",{"property":"og:description","content":"Java中单元测试私有方法 1. 概述 在本教程中，我们将简要解释为什么直接测试私有方法通常不是一个好主意。然后我们将展示如何在必要时测试Java中的私有方法。 2. 我们不应该测试私有方法的原因 一般来说，我们编写的单元测试应该只检查我们的公共方法合约。 私有方法是调用我们公共方法的人不知道的实现细节。此外，改变我们的实现细节不应该导致我们改变我们的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/06/public-and-private-method-code-coverage.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T23:09:13.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Unit Testing"}],["meta",{"property":"article:tag","content":"Private Methods"}],["meta",{"property":"article:tag","content":"Reflection"}],["meta",{"property":"article:published_time","content":"2022-06-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T23:09:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中单元测试私有方法\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/06/public-and-private-method-code-coverage.png\\"],\\"datePublished\\":\\"2022-06-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T23:09:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中单元测试私有方法 1. 概述 在本教程中，我们将简要解释为什么直接测试私有方法通常不是一个好主意。然后我们将展示如何在必要时测试Java中的私有方法。 2. 我们不应该测试私有方法的原因 一般来说，我们编写的单元测试应该只检查我们的公共方法合约。 私有方法是调用我们公共方法的人不知道的实现细节。此外，改变我们的实现细节不应该导致我们改变我们的..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 我们不应该测试私有方法的原因","slug":"_2-我们不应该测试私有方法的原因","link":"#_2-我们不应该测试私有方法的原因","children":[]},{"level":2,"title":"3. 一个示例：从私有方法中移除死代码","slug":"_3-一个示例-从私有方法中移除死代码","link":"#_3-一个示例-从私有方法中移除死代码","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721257753000,"updatedTime":1721257753000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.62,"words":1087},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Unit Test Private Methods in Java.md","localizedDate":"2022年6月1日","excerpt":"<hr>\\n<h1>Java中单元测试私有方法</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将简要解释为什么直接测试私有方法通常不是一个好主意。然后我们将展示如何在必要时测试Java中的私有方法。</p>\\n<h2>2. 我们不应该测试私有方法的原因</h2>\\n<p><strong>一般来说，我们编写的单元测试应该只检查我们的公共方法合约。</strong> 私有方法是调用我们公共方法的人不知道的实现细节。此外，改变我们的实现细节不应该导致我们改变我们的测试。</p>\\n<p>一般来说，敦促测试私有方法突出了以下问题之一：</p>\\n<ul>\\n<li>我们的私有方法中有死代码。</li>\\n<li>我们的私有方法太复杂了，应该属于另一个类。</li>\\n<li>我们的方法本来就不应该设置为私有。</li>\\n</ul>","autoDesc":true}');export{d as comp,k as data};
