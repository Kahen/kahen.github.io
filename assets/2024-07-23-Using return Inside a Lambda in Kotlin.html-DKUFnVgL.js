import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BkL9UgS7.js";const e={},p=t(`<h1 id="kotlin中lambda内使用return的用法" tabindex="-1"><a class="header-anchor" href="#kotlin中lambda内使用return的用法"><span>Kotlin中Lambda内使用return的用法</span></a></h1><p>在Kotlin中，函数是一等公民。此外，Lambda表达式提供了一种简洁而强大的方式表达功能。这些匿名函数使我们能够编写更具表现力的代码。</p><p>然而，由于Lambda的特性及其隐含的返回行为，Lambda内使用_return_关键字最初可能看起来令人困惑。在本教程中，我们将探索Kotlin中Lambda内_return_的使用。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>虽然Lambda通常依赖于隐式返回，但有时可能需要显式返回以处理复杂逻辑或跳出嵌套结构。</p><p>接下来，让我们看一个在Lambda中使用_return_的例子。</p><h3 id="_2-1-一个例子" tabindex="-1"><a class="header-anchor" href="#_2-1-一个例子"><span>2.1. 一个例子</span></a></h3><p>假设我们从另一个系统接收到一个字符串消息：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> input <span class="token operator">=</span> <span class="token string-literal multiline"><span class="token string">&quot;&quot;&quot;
    T, T, T, T, T, T
    F, O, F, O, F, O
    T, F, O, F
    T, O, T, O, T, O
    T, X, T, X, T, X
    F, F, F, F, F, F
&quot;&quot;&quot;</span></span><span class="token punctuation">.</span><span class="token function">trimIndent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，输入是一个多行字符串。我们的任务是解析这个输入，并将有效值提取到所需的数据格式。</p><p>每行应该恰好包含六个用逗号分隔的字段。<strong>我们放弃包含多于或少于六个字段的行</strong>，例如输入中的第三行。</p><p>**有效的字段值是_T（真）_, _F（假）<em>和_O（空）</em>。**我们将它们映射到_Answer_枚举：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">enum</span> <span class="token keyword">class</span> Answer <span class="token punctuation">{</span>
    True<span class="token punctuation">,</span> False<span class="token punctuation">,</span> Empty
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于外部系统故障，某些行包含无效字段。例如，第五行包含三个_X_字母。只要行有六个字段，<strong>我们取有效字段并跳过无效的</strong>。</p><p>因此，如果我们解析了输入示例，我们应该得到一个列表列表：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> expectedResult <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span>
    <span class="token function">listOf</span><span class="token punctuation">(</span>True<span class="token punctuation">,</span> True<span class="token punctuation">,</span> True<span class="token punctuation">,</span> True<span class="token punctuation">,</span> True<span class="token punctuation">,</span> True<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">listOf</span><span class="token punctuation">(</span>False<span class="token punctuation">,</span> Empty<span class="token punctuation">,</span> False<span class="token punctuation">,</span> Empty<span class="token punctuation">,</span> False<span class="token punctuation">,</span> Empty<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">listOf</span><span class="token punctuation">(</span>True<span class="token punctuation">,</span> Empty<span class="token punctuation">,</span> True<span class="token punctuation">,</span> Empty<span class="token punctuation">,</span> True<span class="token punctuation">,</span> Empty<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">listOf</span><span class="token punctuation">(</span>True<span class="token punctuation">,</span> True<span class="token punctuation">,</span> True<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">listOf</span><span class="token punctuation">(</span>False<span class="token punctuation">,</span> False<span class="token punctuation">,</span> False<span class="token punctuation">,</span> False<span class="token punctuation">,</span> False<span class="token punctuation">,</span> False<span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们编写一个函数来解析输入。</p><h3 id="_2-2-处理输入" tabindex="-1"><a class="header-anchor" href="#_2-2-处理输入"><span>2.2. 处理输入</span></a></h3><p>我们将创建一个函数来解析输入并填充一个预先声明的_resultList_变量：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">lateinit</span> <span class="token keyword">var</span> resultList<span class="token operator">:</span> MutableList\`<span class="token operator">&lt;</span>List\`\`\`\`<span class="token operator">&lt;</span>Answer<span class="token operator">&gt;</span>\`\`\`\`\`<span class="token operator">&gt;</span>
<span class="token keyword">fun</span> <span class="token function">processInputV1</span><span class="token punctuation">(</span>input<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    resultList <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    input<span class="token punctuation">.</span><span class="token function">lines</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span> line <span class="token operator">-&gt;</span>
        <span class="token keyword">val</span> fields <span class="token operator">=</span> line<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;, &quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>fields<span class="token punctuation">.</span>size <span class="token operator">!=</span> <span class="token number">6</span><span class="token punctuation">)</span> <span class="token keyword">return</span>
        <span class="token keyword">val</span> answerList<span class="token operator">:</span> MutableList\`\`\`\`<span class="token operator">&lt;</span>Answer<span class="token operator">&gt;</span>\`\`\`\` <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        fields<span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span> field <span class="token operator">-&gt;</span>
            answerList <span class="token operator">+=</span> <span class="token keyword">when</span> <span class="token punctuation">(</span>field<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token string-literal singleline"><span class="token string">&quot;T&quot;</span></span> <span class="token operator">-&gt;</span> True
                <span class="token string-literal singleline"><span class="token string">&quot;F&quot;</span></span> <span class="token operator">-&gt;</span> False
                <span class="token string-literal singleline"><span class="token string">&quot;O&quot;</span></span> <span class="token operator">-&gt;</span> Empty
                <span class="token keyword">else</span> <span class="token operator">-&gt;</span> <span class="token keyword">return</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        resultList <span class="token operator">+=</span> answerList
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的函数中，我们使用嵌套的_forEach_来解析输入。此外，我们两次使用_return_关键字：</p><ul><li>在外部_forEach_ - “<em>if (fields.size != 6) return</em>”如果字段数量不是六则跳过整行</li><li>在内部_forEach_ - _when(field){ … else -&gt; return}_如果当前字段无效则跳过当前字段</li></ul><p>接下来，让我们测试我们的函数，看看它是否按预期工作。</p><h3 id="_2-3-测试函数" tabindex="-1"><a class="header-anchor" href="#_2-3-测试函数"><span>2.3. 测试函数</span></a></h3><p>让我们首先创建一个函数来“漂亮打印”_resultList_内容。</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">printResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>
        <span class="token string-literal singleline"><span class="token string">&quot;&quot;</span></span>&quot;
           |处理后的结果：
           |<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
           |$<span class="token punctuation">{</span>resultList<span class="token punctuation">.</span><span class="token function">joinToString</span><span class="token punctuation">(</span>separator <span class="token operator">=</span> System<span class="token punctuation">.</span><span class="token function">lineSeparator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token string-literal singleline"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">it</span></span><span class="token string">&quot;</span></span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
           |<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
        <span class="token string-literal singleline"><span class="token string">&quot;&quot;</span></span>&quot;<span class="token punctuation">.</span><span class="token function">trimMargin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们将输入传递给我们的_processInputV1()_，结果表明函数没有按预期工作：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">processInputV1</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span>
<span class="token function">assertNotEquals</span><span class="token punctuation">(</span>expectedResult<span class="token punctuation">,</span> resultList<span class="token punctuation">)</span>
<span class="token function">printResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看_resultList_的值：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>处理后的结果：
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
<span class="token punctuation">[</span>True<span class="token punctuation">,</span> True<span class="token punctuation">,</span> True<span class="token punctuation">,</span> True<span class="token punctuation">,</span> True<span class="token punctuation">,</span> True<span class="token punctuation">]</span>
<span class="token punctuation">[</span>False<span class="token punctuation">,</span> Empty<span class="token punctuation">,</span> False<span class="token punctuation">,</span> Empty<span class="token punctuation">,</span> False<span class="token punctuation">,</span> Empty<span class="token punctuation">]</span>
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>输出显示我们丢弃了第三行，这是我们想要的。但是，整个过程就停在那里了。</strong></p><p>接下来，让我们找出为什么会发生这种情况以及如何修复这个问题。</p><h2 id="_3-返回到标签" tabindex="-1"><a class="header-anchor" href="#_3-返回到标签"><span>3. 返回到标签</span></a></h2><p>我们的处理在外部_forEach_中的_return_语句处停止了。这是因为**<em>return_语句使包含函数_processInputV1()</em>“返回”**。但我们希望_return_语句返回当前Lambda以跳过当前行，并从外部_forEach_中取下一行。</p><p>所以接下来，让我们看看如何实现它。</p><h3 id="_3-1-返回到-foreach-标签" tabindex="-1"><a class="header-anchor" href="#_3-1-返回到-foreach-标签"><span>3.1. 返回到_forEach_标签</span></a></h3><p>在Kotlin中，<strong>当我们在Lambda表达式中使用_return_关键字时，我们可以选择是返回当前Lambda表达式还是使用标签返回包含函数</strong>。</p><p>例如，如果我们想_返回_外部_forEach_的当前Lambda，我们可以使用_return@forEach_：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">processInputV2</span><span class="token punctuation">(</span>input<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    resultList <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    input<span class="token punctuation">.</span><span class="token function">lines</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span> line <span class="token operator">-&gt;</span>
        <span class="token keyword">val</span> fields <span class="token operator">=</span> line<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;, &quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>fields<span class="token punctuation">.</span>size <span class="token operator">!=</span> <span class="token number">6</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token label symbol">@forEach</span>
        <span class="token keyword">val</span> answerList<span class="token operator">:</span> MutableList\`\`\`\`<span class="token operator">&lt;</span>Answer<span class="token operator">&gt;</span>\`\`\`\` <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        fields<span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span> field <span class="token operator">-&gt;</span>
            answerList <span class="token operator">+=</span> <span class="token keyword">when</span> <span class="token punctuation">(</span>field<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token string-literal singleline"><span class="token string">&quot;T&quot;</span></span> <span class="token operator">-&gt;</span> True
                <span class="token string-literal singleline"><span class="token string">&quot;F&quot;</span></span> <span class="token operator">-&gt;</span> False
                <span class="token string-literal singleline"><span class="token string">&quot;O&quot;</span></span> <span class="token operator">-&gt;</span> Empty
                <span class="token keyword">else</span> <span class="token operator">-&gt;</span> <span class="token keyword">return</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        resultList <span class="token operator">+=</span> answerList
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们用_processInputV2()_函数解析输入。它仍然没有按预期工作：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">processInputV2</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span>
<span class="token function">assertNotEquals</span><span class="token punctuation">(</span>expectedResult<span class="token punctuation">,</span> resultList<span class="token punctuation">)</span>
<span class="token function">printResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们看看处理在哪里停止了：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>处理后的结果：
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
<span class="token punctuation">[</span>True<span class="token punctuation">,</span> True<span class="token punctuation">,</span> True<span class="token punctuation">,</span> True<span class="token punctuation">,</span> True<span class="token punctuation">,</span> True<span class="token punctuation">]</span>
<span class="token punctuation">[</span>False<span class="token punctuation">,</span> Empty<span class="token punctuation">,</span> False<span class="token punctuation">,</span> Empty<span class="token punctuation">,</span> False<span class="token punctuation">,</span> Empty<span class="token punctuation">]</span>
<span class="token punctuation">[</span>True<span class="token punctuation">,</span> Empty<span class="token punctuation">,</span> True<span class="token punctuation">,</span> Empty<span class="token punctuation">,</span> True<span class="token punctuation">,</span> Empty<span class="token punctuation">]</span>
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出显示我们已经跳过了输入中的第三行。但是内部的_forEach_中的_return_语句返回了包含函数_processInputV2_。这次，我们知道如何修复问题。所以，让我们<strong>将_@forEach_标签添加到_return_关键字</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">processInputV3</span><span class="token punctuation">(</span>input<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    resultList <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    input<span class="token punctuation">.</span><span class="token function">lines</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span> line <span class="token operator">-&gt;</span>
        <span class="token keyword">val</span> fields <span class="token operator">=</span> line<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;, &quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>fields<span class="token punctuation">.</span>size <span class="token operator">!=</span> <span class="token number">6</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token label symbol">@forEach</span>
        <span class="token keyword">val</span> answerList<span class="token operator">:</span> MutableList\`\`\`\`<span class="token operator">&lt;</span>Answer<span class="token operator">&gt;</span>\`\`\`\` <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        fields<span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span> field <span class="token operator">-&gt;</span>
            answerList <span class="token operator">+=</span> <span class="token keyword">when</span> <span class="token punctuation">(</span>field<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token string-literal singleline"><span class="token string">&quot;T&quot;</span></span> <span class="token operator">-&gt;</span> True
                <span class="token string-literal singleline"><span class="token string">&quot;F&quot;</span></span> <span class="token operator">-&gt;</span> False
                <span class="token string-literal singleline"><span class="token string">&quot;O&quot;</span></span> <span class="token operator">-&gt;</span> Empty
                <span class="token keyword">else</span> <span class="token operator">-&gt;</span> <span class="token keyword">return</span><span class="token label symbol">@forEach</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        resultList <span class="token operator">+=</span> answerList
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，如果我们运行测试，我们得到预期的结果：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">processInputV3</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedResult<span class="token punctuation">,</span> resultList<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可能已经意识到<strong>两个_return_语句都带有_@forEach_标签</strong>。当然，编译器知道哪个_@forEach_标签指示哪个Lambda。然而，当我们阅读代码时，<strong>带有相同标签的多个返回可能不容易理解</strong>。</p><p>接下来，让我们改进这一点。</p><h3 id="_3-2-返回到自定义标签" tabindex="-1"><a class="header-anchor" href="#_3-2-返回到自定义标签"><span>3.2. 返回到自定义标签</span></a></h3><p>Kotlin允许我们在Lambda之前定义我们自己的标签，按照“<em>labelName@</em>”格式，并在_return_语句中引用定义的标签。接下来，让我们在输入处理函数中添加两个有意义的标签：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">processInputV4</span><span class="token punctuation">(</span>input<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    resultList <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    input<span class="token punctuation">.</span><span class="token function">lines</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>forEach <span class="token label symbol">lineProcessing@</span><span class="token punctuation">{</span> line <span class="token operator">-&gt;</span>
        <span class="token keyword">val</span> fields <span class="token operator">=</span> line<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;, &quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>fields<span class="token punctuation">.</span>size <span class="token operator">!=</span> <span class="token number">6</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token label symbol">@lineProcessing</span>
        <span class="token keyword">val</span> answerList<span class="token operator">:</span> MutableList\`\`\`\`<span class="token operator">&lt;</span>Answer<span class="token operator">&gt;</span>\`\`\`\` <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        fields<span class="token punctuation">.</span>forEach <span class="token label symbol">answerProcessing@</span><span class="token punctuation">{</span> field <span class="token operator">-&gt;</span>
            answerList <span class="token operator">+=</span> <span class="token keyword">when</span> <span class="token punctuation">(</span>field<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token string-literal singleline"><span class="token string">&quot;T&quot;</span></span> <span class="token operator">-&gt;</span> True
                <span class="token string-literal singleline"><span class="token string">&quot;F&quot;</span></span> <span class="token operator">-&gt;</span> False
                <span class="token string-literal singleline"><span class="token string">&quot;O&quot;</span></span> <span class="token operator">-&gt;</span> Empty
                <span class="token keyword">else</span> <span class="token operator">-&gt;</span> <span class="token keyword">return</span><span class="token label symbol">@answerProcessing</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        resultList <span class="token operator">+=</span> answerList
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，带有自定义标签的_processInputV4()_函数通过了测试：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">processInputV4</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedResult<span class="token punctuation">,</span> resultList<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探讨了如何在Kotlin中Lambda内使用_return_关键字。</p><p>Kotlin的返回到标签功能使我们能够编写更灵活和富有表现力的代码，平衡了简洁性和控制。</p>`,57),o=[p];function l(i,c){return a(),s("div",null,o)}const k=n(e,[["render",l],["__file","2024-07-23-Using return Inside a Lambda in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-23/2024-07-23-Using%20return%20Inside%20a%20Lambda%20in%20Kotlin.html","title":"Kotlin中Lambda内使用return的用法","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Programming"],"tag":["Kotlin","Lambda","Return"],"head":[["meta",{"name":"keywords","content":"Kotlin, Lambda, Return, Functional Programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-23/2024-07-23-Using%20return%20Inside%20a%20Lambda%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中Lambda内使用return的用法"}],["meta",{"property":"og:description","content":"Kotlin中Lambda内使用return的用法 在Kotlin中，函数是一等公民。此外，Lambda表达式提供了一种简洁而强大的方式表达功能。这些匿名函数使我们能够编写更具表现力的代码。 然而，由于Lambda的特性及其隐含的返回行为，Lambda内使用_return_关键字最初可能看起来令人困惑。在本教程中，我们将探索Kotlin中Lambda内..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T23:48:57.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Lambda"}],["meta",{"property":"article:tag","content":"Return"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T23:48:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中Lambda内使用return的用法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-23T23:48:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中Lambda内使用return的用法 在Kotlin中，函数是一等公民。此外，Lambda表达式提供了一种简洁而强大的方式表达功能。这些匿名函数使我们能够编写更具表现力的代码。 然而，由于Lambda的特性及其隐含的返回行为，Lambda内使用_return_关键字最初可能看起来令人困惑。在本教程中，我们将探索Kotlin中Lambda内..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[{"level":3,"title":"2.1. 一个例子","slug":"_2-1-一个例子","link":"#_2-1-一个例子","children":[]},{"level":3,"title":"2.2. 处理输入","slug":"_2-2-处理输入","link":"#_2-2-处理输入","children":[]},{"level":3,"title":"2.3. 测试函数","slug":"_2-3-测试函数","link":"#_2-3-测试函数","children":[]}]},{"level":2,"title":"3. 返回到标签","slug":"_3-返回到标签","link":"#_3-返回到标签","children":[{"level":3,"title":"3.1. 返回到_forEach_标签","slug":"_3-1-返回到-foreach-标签","link":"#_3-1-返回到-foreach-标签","children":[]},{"level":3,"title":"3.2. 返回到自定义标签","slug":"_3-2-返回到自定义标签","link":"#_3-2-返回到自定义标签","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721778537000,"updatedTime":1721778537000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.05,"words":1516},"filePathRelative":"posts/baeldung/2024-07-23/2024-07-23-Using return Inside a Lambda in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>在Kotlin中，函数是一等公民。此外，Lambda表达式提供了一种简洁而强大的方式表达功能。这些匿名函数使我们能够编写更具表现力的代码。</p>\\n<p>然而，由于Lambda的特性及其隐含的返回行为，Lambda内使用_return_关键字最初可能看起来令人困惑。在本教程中，我们将探索Kotlin中Lambda内_return_的使用。</p>\\n<h2>2. 问题介绍</h2>\\n<p>虽然Lambda通常依赖于隐式返回，但有时可能需要显式返回以处理复杂逻辑或跳出嵌套结构。</p>\\n<p>接下来，让我们看一个在Lambda中使用_return_的例子。</p>\\n<h3>2.1. 一个例子</h3>","autoDesc":true}');export{k as comp,d as data};
