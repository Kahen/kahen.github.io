import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-CBerKIce.js";const t={},o=e(`<h1 id="java中切换布尔变量" tabindex="-1"><a class="header-anchor" href="#java中切换布尔变量"><span>Java中切换布尔变量</span></a></h1><p>布尔是Java中的基本数据类型。通常，它只能有两个值，<em>true_或_false</em>。</p><p>在本教程中，我们将讨论如何切换给定布尔变量的值。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>这个问题相当直接。简单来说，我们想要反转布尔变量的值。例如，切换后_true_变为_false_。</p><p>然而，<strong>我们应该注意Java中有两种“不同”的布尔类型，原始的_boolean_和包装的_Boolean_。</strong> 因此，理想的切换方法应该适用于两种类型。</p><p>在本教程中，我们将讨论如何实现这样的方法。</p><p>另外，为了简单起见，我们将使用单元测试断言来验证我们的实现是否符合预期。</p><p>那么，接下来，让我们从切换原始_boolean_变量开始，这是我们最终_toggle()_方法的基础。</p><h2 id="_3-切换原始-boolean-变量" tabindex="-1"><a class="header-anchor" href="#_3-切换原始-boolean-变量"><span>3. 切换原始_boolean_变量</span></a></h2><p><strong>切换原始_boolean_变量最直接的方法就是使用NOT运算符( <em>!</em>)。</strong></p><p>让我们创建一个测试来看看它是如何工作的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> b <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
b <span class="token operator">=</span> <span class="token operator">!</span>b<span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>

b <span class="token operator">=</span> <span class="token operator">!</span>b<span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行这个测试，它会通过。因此，每次我们对一个_boolean_变量执行NOT运算符，它的值就会被反转。</p><p>或者，XOR运算符( <em>^</em>)也可以反转布尔值。在考虑实现之前，让我们快速了解一下XOR运算符是如何工作的。</p><p><strong>给定两个_boolean_变量_b1_和_b2_，<em>b1 ^ b2_只有在_b1_和_b2_的值不同时才为_true</em></strong>，例如：</p><ul><li><em>true ^ true = false</em></li><li><em>false ^ false = false</em></li><li><em>true ^ false = true</em></li></ul><p>因此，我们可以利用XOR的特性，执行_b ^ true_来反转_b_的值：</p><ul><li><em>b = true -&gt; b ^ true_变为_true ^ true = false</em></li><li><em>b = false -&gt; b ^ true_变为_false ^ true = true</em></li></ul><p>现在我们理解了XOR的逻辑，将其翻译成Java代码对我们来说并不是一个挑战：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> b <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
b <span class="token operator">^=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>

b <span class="token operator">^=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们运行测试时，它不出所料地通过了。</p><h2 id="_4-创建-toggle-方法" tabindex="-1"><a class="header-anchor" href="#_4-创建-toggle-方法"><span>4. 创建_toggle()_方法</span></a></h2><p>我们已经看到原始_boolean_变量只能有两个值：<em>true_和_false</em>。然而，与原始_boolean_不同，<strong>包装的_Boolean_变量可以持有_null_值。</strong></p><p>Java在执行NOT或XOR操作时会自动将_Boolean_拆箱为_boolean_。但如果我们没有正确处理_null_情况，我们将遇到_NullPointerException_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThatThrownBy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token class-name">Boolean</span> b <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    b <span class="token operator">=</span> <span class="token operator">!</span>b<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isInstanceOf</span><span class="token punctuation">(</span><span class="token class-name">NullPointerException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们执行上述测试，它会通过。不幸的是，这意味着执行!b时会发生_NullPointerException_。</p><p>那么接下来，让我们创建一个null安全的_toggle()_方法，用于处理_Boolean_和_boolean_变量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">Boolean</span> <span class="token function">toggle</span><span class="token punctuation">(</span><span class="token class-name">Boolean</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>b <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token operator">!</span>b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们首先进行null检查，然后使用NOT运算符来反转值。当然，如果我们喜欢，在null检查之后，我们也可以使用XOR方法来反转_b_的值。</p><p>最后，让我们创建一个测试来验证我们的_toggle()_方法是否适用于所有情况：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 包装的Boolean</span>
<span class="token class-name">Boolean</span> b <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
b <span class="token operator">=</span> <span class="token class-name">ToggleBoolean</span><span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>

b <span class="token operator">=</span> <span class="token class-name">ToggleBoolean</span><span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>

b <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
b <span class="token operator">=</span> <span class="token class-name">ToggleBoolean</span><span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertNull</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 原始的boolean</span>
<span class="token keyword">boolean</span> bb <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
bb <span class="token operator">=</span> <span class="token class-name">ToggleBoolean</span><span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span>bb<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span>bb<span class="token punctuation">)</span><span class="token punctuation">;</span>
bb <span class="token operator">=</span> <span class="token class-name">ToggleBoolean</span><span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span>bb<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>bb<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上述测试所示，我们用_Boolean_变量和_boolean_变量测试了_toggle()_方法。此外，我们还测试了_Boolean_变量_b=null_的情况。</p><p>当我们执行测试时，测试通过了。因此，我们的_toggle()_方法按预期工作。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何构建一个null安全的切换给定_boolean/Boolean_变量的方法。</p><p>如往常一样，与本文相关的代码可以在GitHub上找到。</p>`,37),p=[o];function l(c,i){return s(),a("div",null,p)}const d=n(t,[["render",l],["__file","2024-07-15-Toggle a Boolean Variable in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-15/2024-07-15-Toggle%20a%20Boolean%20Variable%20in%20Java.html","title":"Java中切换布尔变量","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["布尔变量","取反"],"head":[["meta",{"name":"keywords","content":"Java, 布尔变量, 取反, XOR, NOT"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-15/2024-07-15-Toggle%20a%20Boolean%20Variable%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中切换布尔变量"}],["meta",{"property":"og:description","content":"Java中切换布尔变量 布尔是Java中的基本数据类型。通常，它只能有两个值，true_或_false。 在本教程中，我们将讨论如何切换给定布尔变量的值。 2. 问题介绍 这个问题相当直接。简单来说，我们想要反转布尔变量的值。例如，切换后_true_变为_false_。 然而，我们应该注意Java中有两种“不同”的布尔类型，原始的_boolean_和包..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-15T20:05:58.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"布尔变量"}],["meta",{"property":"article:tag","content":"取反"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-15T20:05:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中切换布尔变量\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-15T20:05:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中切换布尔变量 布尔是Java中的基本数据类型。通常，它只能有两个值，true_或_false。 在本教程中，我们将讨论如何切换给定布尔变量的值。 2. 问题介绍 这个问题相当直接。简单来说，我们想要反转布尔变量的值。例如，切换后_true_变为_false_。 然而，我们应该注意Java中有两种“不同”的布尔类型，原始的_boolean_和包..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 切换原始_boolean_变量","slug":"_3-切换原始-boolean-变量","link":"#_3-切换原始-boolean-变量","children":[]},{"level":2,"title":"4. 创建_toggle()_方法","slug":"_4-创建-toggle-方法","link":"#_4-创建-toggle-方法","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721073958000,"updatedTime":1721073958000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.15,"words":945},"filePathRelative":"posts/baeldung/2024-07-15/2024-07-15-Toggle a Boolean Variable in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>布尔是Java中的基本数据类型。通常，它只能有两个值，<em>true_或_false</em>。</p>\\n<p>在本教程中，我们将讨论如何切换给定布尔变量的值。</p>\\n<h2>2. 问题介绍</h2>\\n<p>这个问题相当直接。简单来说，我们想要反转布尔变量的值。例如，切换后_true_变为_false_。</p>\\n<p>然而，<strong>我们应该注意Java中有两种“不同”的布尔类型，原始的_boolean_和包装的_Boolean_。</strong> 因此，理想的切换方法应该适用于两种类型。</p>\\n<p>在本教程中，我们将讨论如何实现这样的方法。</p>\\n<p>另外，为了简单起见，我们将使用单元测试断言来验证我们的实现是否符合预期。</p>","autoDesc":true}');export{d as comp,k as data};
