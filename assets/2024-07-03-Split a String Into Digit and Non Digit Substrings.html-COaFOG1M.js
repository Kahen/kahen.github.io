import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CxQif-dU.js";const p={},e=t(`<h1 id="java中将字符串分割为数字和非数字子字符串" tabindex="-1"><a class="header-anchor" href="#java中将字符串分割为数字和非数字子字符串"><span>Java中将字符串分割为数字和非数字子字符串</span></a></h1><p>在Java编程中，处理字符串是一项基本任务，有时我们需要将一个字符串分割成多个子字符串以供进一步处理。无论是解析用户输入还是处理数据文件，了解如何有效地拆分字符串都是至关重要的。</p><p>在本教程中，我们将探索不同的方法和技术，将输入字符串分解为包含数字和非数字字符串元素的字符串数组或列表，保持原始顺序。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>像往常一样，我们通过例子来理解问题。</p><p>假设我们有两个输入字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token constant">INPUT1</span> <span class="token operator">=</span> <span class="token string">&quot;01Michael Jackson23Michael Jordan42Michael Bolton999Michael Johnson000&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> <span class="token constant">INPUT2</span> <span class="token operator">=</span> <span class="token string">&quot;Michael Jackson01Michael Jordan23Michael Bolton42Michael Johnson999Great Michaels&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如上述示例所示，两个字符串都包含连续的数字和非数字字符。例如，INPUT1中的连续数字子字符串是“01”，“23”，“42”，“999”和“000”。非数字子字符串是“Michael Jackson”，“Michael Jordan”，“Michael Bolton”等。</p><p>INPUT2类似。不同之处在于它以非数字字符串开头。因此，我们可以得出一些输入特征：</p><ul><li>数字或非数字子字符串的长度是动态的。</li><li>输入字符串可以以数字或非数字子字符串开头。</li></ul><p>我们的目标是将输入字符串分解为一个数组或列表，包含这些字符串元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token constant">EXPECTED1</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;01&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Michael Jackson&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;23&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Michael Jordan&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;42&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Michael Bolton&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;999&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Michael Johnson&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;000&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token constant">EXPECTED_LIST1</span> <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token constant">EXPECTED1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token constant">EXPECTED2</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;Michael Jackson&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;01&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Michael Jordan&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;23&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Michael Bolton&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;42&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Michael Johnson&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;999&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Great Michaels&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token constant">EXPECTED_LIST2</span> <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token constant">EXPECTED2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在本教程中，我们将使用基于正则表达式和非正则表达式的方法来解决这个问题。最后，我们将讨论它们的性能。</p><p>为了简单起见，我们将使用单元测试断言来验证每种方法是否按预期工作。</p><h2 id="_3-使用-string-split-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用-string-split-方法"><span>3. 使用 <em>String.split()</em> 方法</span></a></h2><p>首先，我们使用基于正则表达式的方法来解决这个问题。我们知道 <strong><em>String.split()</em> 方法是将_String_拆分成数组的便捷工具。</strong> 例如：<em>“a, b, c, d”.split(“, ”)</em> 返回一个字符串数组：<em>{“a”，“b”，“c”，“d”}</em>。</p><p>因此，使用_split()_方法可能是我们想到的第一个解决我们问题的方法。然后，我们需要找到一个正则表达式模式作为分隔符，并指导_split()_得到预期的结果。然而，当我们再次思考时，可能会意识到一个困难。</p><p>让我们重新审视_“a, b, c, d”._ <em>split()<em>示例。我们使用</em>“, ”<em>作为分隔符正则表达式模式，并得到了数组结果中的字符串元素：</em>“a”，“b”，“c”，<em>和</em>“d”</em>。如果我们看结果字符串元素，我们将看到<strong>所有匹配的分隔符( <em>“, ”</em>)都不在结果字符串数组中。</strong></p><p>然而，如果我们看问题的输入和预期输出，<strong>输入中的每个字符都出现在结果数组或列表中。</strong> 因此，如果我们想使用_split()_来解决问题，<strong>我们必须使用零长度断言的模式</strong>，例如，前瞻(lookahead)和后瞻(lookbehind)断言。接下来，让我们分析我们的输入字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token number">01</span><span class="token punctuation">[</span><span class="token operator">!</span><span class="token punctuation">]</span><span class="token class-name">Michael</span> <span class="token class-name">Jackson</span><span class="token punctuation">[</span><span class="token operator">!</span><span class="token punctuation">]</span><span class="token number">23</span><span class="token punctuation">[</span><span class="token operator">!</span><span class="token punctuation">]</span><span class="token class-name">Michael</span> <span class="token class-name">Jordan</span><span class="token punctuation">[</span><span class="token operator">!</span><span class="token punctuation">]</span><span class="token number">42</span><span class="token punctuation">[</span><span class="token operator">!</span><span class="token punctuation">]</span><span class="token class-name">Michael</span> <span class="token class-name">Bolton</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了清楚起见，我们使用‘ <em>[!]</em>‘标记了输入中的期望分隔符。<strong>每个分隔符要么位于_\\D_（非数字字符）和_\\d_（数字字符）之间，要么位于_\\d_和_\\D_之间。如果我们将其转换为后瞻正则表达式模式，它是_(?&lt;=\\D)(?=\\d)|（?&lt;=\\d)(?=\\D)_。</strong></p><p>接下来，让我们编写一个测试来验证是否使用_split()_，带有这个模式，在两个输入上产生预期的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> splitRE <span class="token operator">=</span> <span class="token string">&quot;(?&lt;=\\\\D)(?=\\\\d)|(?&lt;=\\\\d)(?=\\\\D)&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result1 <span class="token operator">=</span> <span class="token constant">INPUT1</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span>splitRE<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED1</span><span class="token punctuation">,</span> result1<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result2 <span class="token operator">=</span> <span class="token constant">INPUT2</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span>splitRE<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED2</span><span class="token punctuation">,</span> result2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。所以，我们已经使用_split()_方法解决了问题。</p><p>接下来，让我们使用非正则表达式方法来解决问题。</p><h2 id="_4-非正则表达式方法" tabindex="-1"><a class="header-anchor" href="#_4-非正则表达式方法"><span>4. 非正则表达式方法</span></a></h2><p>我们已经看到了如何使用基于正则表达式的_split()_方法来解决问题。或者，我们可以不使用模式匹配来解决它。</p><p>实现这一点的想法是从输入字符串的开头检查所有字符。接下来，让我们首先看看实现，并了解它的工作原理：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">enum</span> <span class="token class-name">State</span> <span class="token punctuation">{</span>
    <span class="token constant">INIT</span><span class="token punctuation">,</span> <span class="token constant">PARSING_DIGIT</span><span class="token punctuation">,</span> <span class="token constant">PARSING_NON_DIGIT</span>
<span class="token punctuation">}</span>

<span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">parseString</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> start <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token class-name">State</span> state <span class="token operator">=</span> <span class="token constant">INIT</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> input<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>input<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">&gt;</span>\`<span class="token operator">=</span> <span class="token char">&#39;0&#39;</span> <span class="token operator">&amp;&amp;</span> input<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token char">&#39;9&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>state <span class="token operator">==</span> <span class="token constant">PARSING_NON_DIGIT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 非数字到数字，获取子字符串作为元素</span>
                result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>input<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>start<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                start <span class="token operator">=</span> i<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            state <span class="token operator">=</span> <span class="token constant">PARSING_DIGIT</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>state <span class="token operator">==</span> <span class="token constant">PARSING_DIGIT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 数字到非数字，获取子字符串作为元素</span>
                result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>input<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>start<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                start <span class="token operator">=</span> i<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            state <span class="token operator">=</span> <span class="token constant">PARSING_NON_DIGIT</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>input<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 添加最后一部分</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们快速浏览一下上面的代码，并了解它的工作原理：</p><ul><li>首先，我们初始化一个名为_result_的空_ArrayList_来存储提取的元素。</li><li><em>int start = 0; –</em> 这个变量_start_在后续迭代中跟踪每个子字符串的起始索引。</li><li>_state_变量是一个枚举，它表示在遍历字符串时的状态。</li><li>然后，我们使用_for_循环遍历输入字符串的字符，并检查每个字符的类型。</li><li><strong>如果当前字符是一个数字( <em>0</em>– <em>9</em>)并且是非数字到数字的转换，这意味着一个元素已经结束</strong>。所以，我们把从_start_到_i_（不包括_i_）的子字符串添加到_result_列表中。同时，我们更新_start_索引为当前索引_i_并将_state_设置为_PARSING_DIGIT_状态。</li><li>_else_块遵循类似的逻辑，并处理数字到非数字的转换场景。</li><li>_for_循环结束后，我们不应该忘记使用_input.substring(start)_将字符串的最后一部分添加到_result_列表中。</li></ul><p>接下来，让我们用我们的两个输入测试_parseString()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` result1 <span class="token operator">=</span> <span class="token function">parseString</span><span class="token punctuation">(</span><span class="token constant">INPUT1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_LIST1</span><span class="token punctuation">,</span> result1<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` result2 <span class="token operator">=</span> <span class="token function">parseString</span><span class="token punctuation">(</span><span class="token constant">INPUT2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_LIST2</span><span class="token punctuation">,</span> result2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。所以，我们的_parseString()_方法完成了工作。</p><h2 id="_5-性能" tabindex="-1"><a class="header-anchor" href="#_5-性能"><span>5. 性能</span></a></h2><p>到目前为止，我们已经解决了问题的两种解决方案，基于正则表达式的和非正则表达式的。基于正则表达式的_split()_解决方案非常简洁明了。相反，我们的十几行自制_parseString()_方法需要手动控制输入中的每个字符。然后，我们中的一些人可能会问，为什么我们引入甚至使用自制的方法来解决问题？</p><p>答案是“性能”。</p><p>尽管我们的_parseString()_解决方案看起来冗长并且需要手动控制每个字符，但它比基于正则表达式的解决方案<strong>更快</strong>。让我们了解其中的原因：</p><ul><li>_split()_解决方案<strong>需要</strong>编译正则表达式并应用模式匹配。<strong>这些操作被认为是计算上昂贵的，特别是对于复杂模式。</strong> 然而，另一方面，_parseString()_方法使用一个简单的基于枚举的状态机来跟踪数字和非数字字符之间的转换。它允许直接比较并避免了正则表达式模式匹配和后瞻的复杂性。</li><li>在_parseString()_方法中，子字符串是直接使用_substring()_方法提取的。这种方法避免了使用正则表达式_split()_方法时可能发生的不必要的对象创建和内存分配。此外，<strong>通过使用已知索引直接提取子字符串，_parseString()_方法优化了内存使用，并可能提高了性能。</strong></li></ul><p>然而，如果输入字符串不是相当长，性能差异可能是可以忽略的。</p><p>接下来，让我们对这两种方法的性能进行基准测试。我们将使用JMH（Java Microbenchmark Harness）来进行基准测试。<strong>这是因为JMH允许我们轻松处理基准测试因素</strong>，例如JVM预热、死代码消除等：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@State</span><span class="token punctuation">(</span><span class="token class-name">Scope<span class="token punctuation">.</span>Benchmark</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Threads</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@BenchmarkMode</span><span class="token punctuation">(</span><span class="token class-name">Mode<span class="token punctuation">.</span>Throughput</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Fork</span><span class="token punctuation">(</span>warmups <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Warmup</span><span class="token punctuation">(</span>iterations <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span> time <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">,</span> timeUnit <span class="token operator">=</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@OutputTimeUnit</span><span class="token punctuation">(</span><span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BenchmarkLiveTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">INPUT</span> <span class="token operator">=</span> <span class="token string">&quot;01Michael Jackson23Michael Jordan42Michael Bolton999Michael Johnson000&quot;</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;10000&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> iterations<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Benchmark</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">regexBased</span><span class="token punctuation">(</span><span class="token class-name">Blackhole</span> blackhole<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;(?&lt;=\\\\D)(?=\\\\d)|(?&lt;=\\\\d)(?=\\\\D)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Benchmark</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">nonRegexBased</span><span class="token punctuation">(</span><span class="token class-name">Blackhole</span> blackhole<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span><span class="token function">parseString</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">benchmark</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> argv <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>openjdk<span class="token punctuation">.</span>jmh<span class="token punctuation">.</span></span>Main</span><span class="token punctuation">.</span><span class="token function">main</span><span class="token punctuation">(</span>argv<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上类所示，我们使用相同的输入对这两种方法进行了10k次迭代的基准测试。当然，我们不会深入JMH并了解每个JMH注解的含义。但两个注解对我们理解最终报告很重要：<em>@OutputTimeUnit(TimeUnit.MILLISECONDS)<em>和</em>@BenchmarkMode(Mode.Throughput)</em>。这种组合意味着<strong>我们测量每种方法每秒可以运行多少次。</strong></p><p>接下来，让我们看看JMH生成的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Benchmark</span>                        <span class="token punctuation">(</span>iterations<span class="token punctuation">)</span>   <span class="token class-name">Mode</span>  <span class="token class-name">Cnt</span>     <span class="token class-name">Score</span>     <span class="token class-name">Error</span>   <span class="token class-name">Units</span>
<span class="token class-name">BenchmarkLiveTest</span><span class="token punctuation">.</span>nonRegexBased         <span class="token number">10000</span>  thrpt    <span class="token number">5</span>  <span class="token number">3880.989</span> ± <span class="token number">134.021</span>  ops<span class="token operator">/</span>ms
<span class="token class-name">BenchmarkLiveTest</span><span class="token punctuation">.</span>regexBased            <span class="token number">10000</span>  thrpt    <span class="token number">5</span>   <span class="token number">297.282</span> ±  <span class="token number">24.818</span>  ops<span class="token operator">/</span>ms
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，<strong>非正则表达式解决方案的吞吐量是正则表达式解决方案的13倍多（3880/297 = 13.06）。</strong> 因此，<strong>当我们需要在性能关键型应用程序中处理长字符串时，我们应该选择_parseString()_而不是_split()_解决方案。</strong></p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了基于正则表达式（<em>split()</em>）和非正则表达式（<em>parseString()</em>）的方法，将输入字符串分解为包含数字元素和非数字字符串元素的字符串数组或列表，保持原始顺序。</p><p>_split()_解决方案紧凑且直接。然而，在处理长输入字符串时，它可能比自制的_parseString()_解决方案慢得多。</p><p>像往常一样，文章中展示的所有代码片段都可以在GitHub上找到。</p><p><a href="https://www.baeldung.com" target="_blank" rel="noopener noreferrer"><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"></a><a href="https://www.baeldung.com/" target="_blank" rel="noopener noreferrer"><img src="https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&amp;r=g" alt="img" loading="lazy"></a><a href="https://www.baeldung.com/" target="_blank" rel="noopener noreferrer"><img src="https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg" alt="img" loading="lazy"></a><a href="https://www.baeldung.com/" target="_blank" rel="noopener noreferrer"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"></a><a href="https://www.baeldung.com/" target="_blank" rel="noopener noreferrer"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"></a><a href="https://www.baeldung.com/" target="_blank" rel="noopener noreferrer"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></a></p><p>OK</p>`,52),o=[e];function c(l,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-03-Split a String Into Digit and Non Digit Substrings.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Split%20a%20String%20Into%20Digit%20and%20Non%20Digit%20Substrings.html","title":"Java中将字符串分割为数字和非数字子字符串","lang":"zh-CN","frontmatter":{"date":"2022-04-05T00:00:00.000Z","category":["Java","字符串处理"],"tag":["正则表达式","字符串分割"],"head":[["meta",{"name":"keywords","content":"Java, 字符串处理, 正则表达式, 字符串分割"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Split%20a%20String%20Into%20Digit%20and%20Non%20Digit%20Substrings.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将字符串分割为数字和非数字子字符串"}],["meta",{"property":"og:description","content":"Java中将字符串分割为数字和非数字子字符串 在Java编程中，处理字符串是一项基本任务，有时我们需要将一个字符串分割成多个子字符串以供进一步处理。无论是解析用户输入还是处理数据文件，了解如何有效地拆分字符串都是至关重要的。 在本教程中，我们将探索不同的方法和技术，将输入字符串分解为包含数字和非数字字符串元素的字符串数组或列表，保持原始顺序。 2. 问..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T13:07:00.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"正则表达式"}],["meta",{"property":"article:tag","content":"字符串分割"}],["meta",{"property":"article:published_time","content":"2022-04-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T13:07:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将字符串分割为数字和非数字子字符串\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2022-04-05T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T13:07:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将字符串分割为数字和非数字子字符串 在Java编程中，处理字符串是一项基本任务，有时我们需要将一个字符串分割成多个子字符串以供进一步处理。无论是解析用户输入还是处理数据文件，了解如何有效地拆分字符串都是至关重要的。 在本教程中，我们将探索不同的方法和技术，将输入字符串分解为包含数字和非数字字符串元素的字符串数组或列表，保持原始顺序。 2. 问..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用 String.split() 方法","slug":"_3-使用-string-split-方法","link":"#_3-使用-string-split-方法","children":[]},{"level":2,"title":"4. 非正则表达式方法","slug":"_4-非正则表达式方法","link":"#_4-非正则表达式方法","children":[]},{"level":2,"title":"5. 性能","slug":"_5-性能","link":"#_5-性能","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720012020000,"updatedTime":1720012020000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":8.6,"words":2581},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Split a String Into Digit and Non Digit Substrings.md","localizedDate":"2022年4月5日","excerpt":"\\n<p>在Java编程中，处理字符串是一项基本任务，有时我们需要将一个字符串分割成多个子字符串以供进一步处理。无论是解析用户输入还是处理数据文件，了解如何有效地拆分字符串都是至关重要的。</p>\\n<p>在本教程中，我们将探索不同的方法和技术，将输入字符串分解为包含数字和非数字字符串元素的字符串数组或列表，保持原始顺序。</p>\\n<h2>2. 问题介绍</h2>\\n<p>像往常一样，我们通过例子来理解问题。</p>\\n<p>假设我们有两个输入字符串：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">INPUT1</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"01Michael Jackson23Michael Jordan42Michael Bolton999Michael Johnson000\\"</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">INPUT2</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"Michael Jackson01Michael Jordan23Michael Bolton42Michael Johnson999Great Michaels\\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
