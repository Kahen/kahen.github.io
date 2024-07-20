import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DfO5Xg_k.js";const e={},p=t('<h1 id="java流中筛选出唯一元素的方法" tabindex="-1"><a class="header-anchor" href="#java流中筛选出唯一元素的方法"><span>Java流中筛选出唯一元素的方法</span></a></h1><p>在这篇文章中，我们将使用两种来自_Collectors_的方法来检索与给定谓词匹配的唯一元素。对于这两种方法，我们将根据以下标准定义两种方法：</p><ul><li>get方法期望有一个唯一的结果。否则，它将抛出一个_Exception_</li><li>find方法接受结果可能缺失，并在存在时返回一个_Optional_与值</li></ul><h2 id="_2-使用归约-reduction-检索唯一结果" tabindex="-1"><a class="header-anchor" href="#_2-使用归约-reduction-检索唯一结果"><span>2. 使用归约(Reduction)检索唯一结果</span></a></h2><p>**<em>Collectors.reducing_对其输入元素执行归约。**为此，它应用一个指定为_BinaryOperator_的函数。结果被描述为_Optional</em>。因此我们可以定义我们的find方法。</p><p>在我们的情况下，如果过滤后有两个或更多的元素，我们只需要丢弃结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> ``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`````````````````` <span class="token class-name">Optional</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`````````````````` <span class="token function">findUniqueElementMatchingPredicate_WithReduction</span><span class="token punctuation">(</span><span class="token class-name">Stream</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`````````````````` elements<span class="token punctuation">,</span> <span class="token class-name">Predicate</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`````````````````` predicate<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> elements<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>predicate<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">reducing</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要编写get方法，我们需要进行以下更改：</p><ul><li>如果我们检测到两个元素，我们可以直接抛出它们而不是返回null</li><li>最后，我们需要获取_Optional_的值：如果它是空的，我们也想抛出</li></ul><p>此外，在这种情况下，<strong>我们可以直接在</strong> <em><strong>Stream</strong></em> <strong>上应用归约操作：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> ``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`````````````````` <span class="token class-name">T</span> <span class="token function">getUniqueElementMatchingPredicate_WithReduction</span><span class="token punctuation">(</span><span class="token class-name">Stream</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`````````````````` elements<span class="token punctuation">,</span> <span class="token class-name">Predicate</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`````````````````` predicate<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> elements<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>predicate<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n          <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">&quot;Too many elements match the predicate&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">&quot;No element matches the predicate&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用-collectors-collectingandthen-检索唯一结果" tabindex="-1"><a class="header-anchor" href="#_3-使用-collectors-collectingandthen-检索唯一结果"><span>3. 使用_Collectors.collectingAndThen_检索唯一结果</span></a></h2><p><strong>_Collectors.collectingAndThen_对收集操作的结果_List_应用一个函数。</strong></p><p>因此，为了定义find方法，我们需要获取_List_并：</p><ul><li>如果_List_有零个或多于两个元素，返回_null_</li><li>如果_List_恰好有一个元素，返回它</li></ul><p>这是这个操作的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> ``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`````````````````` <span class="token class-name">T</span> <span class="token function">findUniqueElement</span><span class="token punctuation">(</span><span class="token class-name">List</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`````````````````` elements<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>elements<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> elements<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，find方法如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> ``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`````````````````` <span class="token class-name">Optional</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`````````````````` <span class="token function">findUniqueElementMatchingPredicate_WithCollectingAndThen</span><span class="token punctuation">(</span><span class="token class-name">Stream</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`````````````````` elements<span class="token punctuation">,</span> <span class="token class-name">Predicate</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`````````````````` predicate<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> elements<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>predicate<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">collectingAndThen</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> list <span class="token operator">-&gt;</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span><span class="token function">findUniqueElement</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了适应我们的私有方法用于get情况，我们需要在检索到的元素数量不是恰好1时抛出。让我们精确区分没有结果和太多结果的情况，就像我们使用归约时那样：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> ``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`````````````````` <span class="token class-name">T</span> <span class="token function">getUniqueElement</span><span class="token punctuation">(</span><span class="token class-name">List</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`````````````````` elements<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>elements<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">&quot;Too many elements match the predicate&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>elements<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">&quot;No element matches the predicate&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> elements<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，假设我们的类命名为_FilterUtils_，我们可以编写get方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> ``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`````````````````` <span class="token class-name">T</span> <span class="token function">getUniqueElementMatchingPredicate_WithCollectingAndThen</span><span class="token punctuation">(</span><span class="token class-name">Stream</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`````````````````` elements<span class="token punctuation">,</span> <span class="token class-name">Predicate</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`````````````````` predicate<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> elements<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>predicate<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">collectingAndThen</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">FilterUtils</span><span class="token operator">::</span><span class="token function">getUniqueElement</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-性能基准测试" tabindex="-1"><a class="header-anchor" href="#_4-性能基准测试"><span>4. 性能基准测试</span></a></h2><p><strong>让我们使用JMH对不同方法进行快速性能比较。</strong></p><p>首先，让我们将我们的方法应用到：</p><ul><li>一个包含从1到100万的所有_整数_的_Stream_</li><li>一个验证元素是否等于751879的_Predicate_</li></ul><p>在这种情况下，_Predicate_将对_Stream_中的唯一元素进行验证。让我们看看_Benchmark_的定义：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@State</span><span class="token punctuation">(</span><span class="token class-name">Scope<span class="token punctuation">.</span>Benchmark</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">MyState</span> <span class="token punctuation">{</span>\n    <span class="token keyword">final</span> <span class="token class-name">Stream</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`` <span class="token function">getIntegers</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1000000</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">boxed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">final</span> <span class="token class-name">Predicate</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`` <span class="token constant">PREDICATE</span> <span class="token operator">=</span> i <span class="token operator">-&gt;</span> i <span class="token operator">==</span> <span class="token number">751879</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token annotation punctuation">@Benchmark</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">evaluateFindUniqueElementMatchingPredicate_WithReduction</span><span class="token punctuation">(</span><span class="token class-name">Blackhole</span> blackhole<span class="token punctuation">,</span> <span class="token class-name">MyState</span> state<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span><span class="token class-name">FilterUtils</span><span class="token punctuation">.</span><span class="token function">findUniqueElementMatchingPredicate_WithReduction</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span><span class="token constant">INTEGERS</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> state<span class="token punctuation">.</span><span class="token constant">PREDICATE</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token annotation punctuation">@Benchmark</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">evaluateFindUniqueElementMatchingPredicate_WithCollectingAndThen</span><span class="token punctuation">(</span><span class="token class-name">Blackhole</span> blackhole<span class="token punctuation">,</span> <span class="token class-name">MyState</span> state<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span><span class="token class-name">FilterUtils</span><span class="token punctuation">.</span><span class="token function">findUniqueElementMatchingPredicate_WithCollectingAndThen</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span><span class="token constant">INTEGERS</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> state<span class="token punctuation">.</span><span class="token constant">PREDICATE</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token annotation punctuation">@Benchmark</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">evaluateGetUniqueElementMatchingPredicate_WithReduction</span><span class="token punctuation">(</span><span class="token class-name">Blackhole</span> blackhole<span class="token punctuation">,</span> <span class="token class-name">MyState</span> state<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token class-name">FilterUtils</span><span class="token punctuation">.</span><span class="token function">getUniqueElementMatchingPredicate_WithReduction</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span><span class="token constant">INTEGERS</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> state<span class="token punctuation">.</span><span class="token constant">PREDICATE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IllegalStateException</span> exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span>exception<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token annotation punctuation">@Benchmark</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">evaluateGetUniqueElementMatchingPredicate_WithCollectingAndThen</span><span class="token punctuation">(</span><span class="token class-name">Blackhole</span> blackhole<span class="token punctuation">,</span> <span class="token class-name">MyState</span> state<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token class-name">FilterUtils</span><span class="token punctuation">.</span><span class="token function">getUniqueElementMatchingPredicate_WithCollectingAndThen</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span><span class="token constant">INTEGERS</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> state<span class="token punctuation">.</span><span class="token constant">PREDICATE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IllegalStateException</span> exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span>exception<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们运行它。<strong>我们正在测量每秒的操作数。越高越好：</strong></p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>Benchmark                                                                          Mode  Cnt    Score    Error  Units\nBenchmarkRunner.evaluateFindUniqueElementMatchingPredicate_WithCollectingAndThen  thrpt   25  140.581 ± 28.793  ops/s\nBenchmarkRunner.evaluateFindUniqueElementMatchingPredicate_WithReduction          thrpt   25  100.171 ± 36.796  ops/s\nBenchmarkRunner.evaluateGetUniqueElementMatchingPredicate_WithCollectingAndThen   thrpt   25  145.568 ±  5.333  ops/s\nBenchmarkRunner.evaluateGetUniqueElementMatchingPredicate_WithReduction           thrpt   25  144.616 ± 12.917  ops/s\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，在这种情况下，不同的方法表现非常相似。</p><p>让我们改变我们的_Predicate_来检查_Stream_中的元素是否等于0。这个条件对于_List_中的所有元素都是错误的。我们现在可以再次运行基准测试：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>Benchmark                                                                          Mode  Cnt    Score    Error  Units\nBenchmarkRunner.evaluateFindUniqueElementMatchingPredicate_WithCollectingAndThen  thrpt   25  165.751 ± 19.816  ops/s\nBenchmarkRunner.evaluateFindUniqueElementMatchingPredicate_WithReduction          thrpt   25  174.667 ± 20.909  ops/s\nBenchmarkRunner.evaluateGetUniqueElementMatchingPredicate_WithCollectingAndThen   thrpt   25  188.293 ± 18.348  ops/s\nBenchmarkRunner.evaluateGetUniqueElementMatchingPredicate_WithReduction           thrpt   25  196.689 ±  4.155  ops/s\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，性能图表相当平衡。</p><p>最后，让我们看看如果我们使用一个返回值大于751879的_Predicate_会发生什么：这个_Predicate_匹配了_List_中的大量元素。这导致了以下基准测试：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>Benchmark                                                                          Mode  Cnt    Score    Error  Units\nBenchmarkRunner.evaluateFindUniqueElementMatchingPredicate_WithCollectingAndThen  thrpt   25   70.879 ±  6.205  ops/s\nBenchmarkRunner.evaluateFindUniqueElementMatchingPredicate_WithReduction          thrpt   25  210.142 ± 23.680  ops/s\nBenchmarkRunner.evaluateGetUniqueElementMatchingPredicate_WithCollectingAndThen   thrpt   25   83.927 ±  1.812  ops/s\nBenchmarkRunner.evaluateGetUniqueElementMatchingPredicate_WithReduction           thrpt   25  252.881 ±  2.710  ops/s\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，使用归约的变体更有效。此外，直接在过滤后的_Stream_上使用_reduce_因为异常在找到两个匹配值后立即抛出而表现突出。</p><p>总而言之，如果性能是一个问题：</p><ul><li><strong>应该优先使用归约</strong></li><li>如果我们期望找到许多潜在的匹配值，减少_Stream_的get方法要快得多</li></ul><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这个教程中，我们看到了在过滤_Stream_后检索唯一结果的不同方法，然后比较了它们的效率。</p><p>如常，代码可以在GitHub上找到。</p>',43),c=[p];function o(l,i){return s(),a("div",null,c)}const r=n(e,[["render",o],["__file","2024-07-16-Filter Java Stream to 1 and Only 1 Element.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Filter%20Java%20Stream%20to%201%20and%20Only%201%20Element.html","title":"Java流中筛选出唯一元素的方法","lang":"zh-CN","frontmatter":{"date":"2024-07-17T00:00:00.000Z","category":["Java","Stream"],"tag":["Java","Stream","Filter","Reduction"],"head":[["meta",{"name":"keywords","content":"Java, Stream, Filter, Reduction, Unique Element"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Filter%20Java%20Stream%20to%201%20and%20Only%201%20Element.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java流中筛选出唯一元素的方法"}],["meta",{"property":"og:description","content":"Java流中筛选出唯一元素的方法 在这篇文章中，我们将使用两种来自_Collectors_的方法来检索与给定谓词匹配的唯一元素。对于这两种方法，我们将根据以下标准定义两种方法： get方法期望有一个唯一的结果。否则，它将抛出一个_Exception_ find方法接受结果可能缺失，并在存在时返回一个_Optional_与值 2. 使用归约(Reduct..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T20:28:46.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Stream"}],["meta",{"property":"article:tag","content":"Filter"}],["meta",{"property":"article:tag","content":"Reduction"}],["meta",{"property":"article:published_time","content":"2024-07-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T20:28:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java流中筛选出唯一元素的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T20:28:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java流中筛选出唯一元素的方法 在这篇文章中，我们将使用两种来自_Collectors_的方法来检索与给定谓词匹配的唯一元素。对于这两种方法，我们将根据以下标准定义两种方法： get方法期望有一个唯一的结果。否则，它将抛出一个_Exception_ find方法接受结果可能缺失，并在存在时返回一个_Optional_与值 2. 使用归约(Reduct..."},"headers":[{"level":2,"title":"2. 使用归约(Reduction)检索唯一结果","slug":"_2-使用归约-reduction-检索唯一结果","link":"#_2-使用归约-reduction-检索唯一结果","children":[]},{"level":2,"title":"3. 使用_Collectors.collectingAndThen_检索唯一结果","slug":"_3-使用-collectors-collectingandthen-检索唯一结果","link":"#_3-使用-collectors-collectingandthen-检索唯一结果","children":[]},{"level":2,"title":"4. 性能基准测试","slug":"_4-性能基准测试","link":"#_4-性能基准测试","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721161726000,"updatedTime":1721161726000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.11,"words":1233},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Filter Java Stream to 1 and Only 1 Element.md","localizedDate":"2024年7月17日","excerpt":"\\n<p>在这篇文章中，我们将使用两种来自_Collectors_的方法来检索与给定谓词匹配的唯一元素。对于这两种方法，我们将根据以下标准定义两种方法：</p>\\n<ul>\\n<li>get方法期望有一个唯一的结果。否则，它将抛出一个_Exception_</li>\\n<li>find方法接受结果可能缺失，并在存在时返回一个_Optional_与值</li>\\n</ul>\\n<h2>2. 使用归约(Reduction)检索唯一结果</h2>\\n<p>**<em>Collectors.reducing_对其输入元素执行归约。**为此，它应用一个指定为_BinaryOperator_的函数。结果被描述为_Optional</em>。因此我们可以定义我们的find方法。</p>","autoDesc":true}');export{r as comp,d as data};
