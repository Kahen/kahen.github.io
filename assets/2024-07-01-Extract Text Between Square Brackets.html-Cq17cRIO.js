import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BOJj4F50.js";const p={},e=t(`<h1 id="java中提取方括号内的内容" tabindex="-1"><a class="header-anchor" href="#java中提取方括号内的内容"><span>Java中提取方括号内的内容</span></a></h1><p>提取特定模式内的内容是文本处理中常见的需求。有时，处理使用方括号来封装有价值信息的数据时，提取方括号内的文字可能对我们来说是一个挑战。</p><p>在本教程中，我们将探讨提取方括号内容的技术和方法。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>首先，为了简化问题，让我们对问题提出两个先决条件：</p><ul><li><strong>没有嵌套的方括号对</strong> - 例如，像“..[value1 [value2]]..”这样的模式不会作为我们的输入。</li><li><strong>方括号总是正确配对</strong> - 例如，“..[value1 …”是无效的输入。</li></ul><p>在讨论被方括号包围的输入数据时，我们会遇到两种可能的情况：</p><ul><li>输入包含单个方括号对，如“..[value]...”。</li><li>输入包含多个方括号对，由“..[value1]...[value2]...[value3]…”示例说明。</li></ul><p>接下来，我们将首先关注解决单个对场景，然后我们将调整解决方案以适应涉及多对方括号对的情况。在本教程中，<strong>我们将主要使用Java正则表达式（regex）来解决这些挑战。</strong></p><h2 id="_3-输入包含单个方括号对" tabindex="-1"><a class="header-anchor" href="#_3-输入包含单个方括号对"><span>3. 输入包含单个方括号对</span></a></h2><p>假设我们有以下文本输入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token constant">INPUT1</span> <span class="token operator">=</span> <span class="token string">&quot;some text [THE IMPORTANT MESSAGE] something else&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如我们所见，输入只包含一对方括号，我们的目标是获取它们之间的文本：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token constant">EXPECTED1</span> <span class="token operator">=</span> <span class="token string">&quot;THE IMPORTANT MESSAGE&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们看看如何实现这一点。</p><h3 id="_3-1-直接使用-的思想" tabindex="-1"><a class="header-anchor" href="#_3-1-直接使用-的思想"><span>3.1. 直接使用[.*]的思想</span></a></h3><p>直接解决这个问题的方法是提取&#39;[&#39;和&#39;]&#39;字符之间的内容。因此，我们可能会想到正则表达式模式“[.*]”。</p><p>然而，我们不能直接在代码中使用这个模式，因为<strong>正则表达式使用&#39;[&#39;和&#39;]&#39;用于字符类定义。<strong>例如，“[0-9]”类匹配任何数字字符。我们必须转义它们以</strong>匹配字面的&#39;[&#39;或&#39;]&#39;。</strong></p><p>此外，我们的任务是提取而不是匹配。因此，我们可以将目标匹配放在一个捕获组中，这样以后引用和提取就更容易了：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> rePattern <span class="token operator">=</span> <span class="token string">&quot;\\\\[(.*)\\\\]&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">Pattern</span> p <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>rePattern<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Matcher</span> m <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span><span class="token constant">INPUT1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result <span class="token operator">=</span> m<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token constant">EXPECTED1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>敏锐的眼睛可能会注意到我们只在上述代码中转义了开括号&#39;[&#39;。这是因为，对于括号和花括号，**如果一个闭合括号或花括号没有在其对应的开括号之前，正则表达式引擎将其解释为字面量。**在我们的示例中，我们转义了&#39;\\[&quot;，所以&#39;]&#39;没有被任何开括号&#39;[&#39;前导。因此，&#39;]&#39;将被视为字面的&#39;]&#39;字符。</p><h3 id="_3-2-使用nor字符类" tabindex="-1"><a class="header-anchor" href="#_3-2-使用nor字符类"><span>3.2. 使用NOR字符类</span></a></h3><p>我们已经通过提取&#39;[&#39;和&#39;]&#39;之间的“一切”解决了问题。这里的“一切”由不是&#39;]&#39;的字符组成。</p><p>正则表达式支持NOR类。例如，“[<sup>0-9]”匹配任何非数字字符。因此，我们可以通过使用正则表达式NOR类来优雅地解决这个问题，结果是模式“[([</sup>]]*)]”：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> rePattern <span class="token operator">=</span> <span class="token string">&quot;\\\\[([^]]*)\\\\]&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">Pattern</span> p <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>rePattern<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Matcher</span> m <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span><span class="token constant">INPUT1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result <span class="token operator">=</span> m<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token constant">EXPECTED1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-使用split-方法" tabindex="-1"><a class="header-anchor" href="#_3-3-使用split-方法"><span>3.3. 使用split()方法</span></a></h3><p>Java提供了强大的String.split()方法来将输入字符串拆分成片段。split()支持正则表达式作为分隔符。接下来，让我们看看我们的问题是否可以通过split()方法解决。</p><p>考虑“prefix[value]suffix”的场景。如果我们将&#39;[&#39;或&#39;]&#39;指定为分隔符，split()将产生一个数组：{“prefix”，“value”，“suffix”}。下一步相对简单。我们可以简单地从数组中取出中间元素作为结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> strArray <span class="token operator">=</span> <span class="token constant">INPUT1</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\[\\\\]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> result <span class="token operator">=</span> strArray<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">3</span> <span class="token operator">?</span> strArray<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token constant">EXPECTED1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们确保在取出数组的第二个元素之前，split()的结果应该始终有三个元素。</p><p>当我们运行测试时，测试通过。然而，<strong>如果输入以&#39;]&#39;结尾，这个解决方案可能会失败：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> strArray <span class="token operator">=</span> <span class="token string">&quot;[THE IMPORTANT MESSAGE]&quot;</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\[\\\\]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>strArray<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasSize</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;THE IMPORTANT MESSAGE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上述测试所示，我们的输入这次没有“prefix”和“suffix”。默认情况下，<strong>split()丢弃尾随的空字符串</strong>。为了解决这个问题，我们可以<strong>向split()传递一个负的limit，告诉split()保留空字符串元素：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>strArray <span class="token operator">=</span> <span class="token string">&quot;[THE IMPORTANT MESSAGE]&quot;</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\[\\\\]&quot;</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>strArray<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasSize</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;THE IMPORTANT MESSAGE&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，我们可以改变我们的解决方案以覆盖这个边缘情况：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> strArray <span class="token operator">=</span> <span class="token constant">INPUT1</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\[\\\\]&quot;</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> result <span class="token operator">=</span> strArray<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">3</span> <span class="token operator">?</span> strArray<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-输入包含多个方括号对" tabindex="-1"><a class="header-anchor" href="#_4-输入包含多个方括号对"><span>4. 输入包含多个方括号对</span></a></h2><p>解决了单个“[..]”对的案例后，将解决方案扩展到处理多个“[..]”对的案例对我们来说不会是一个挑战。让我们以一个新的输入示例为例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">INPUT2</span> <span class="token operator">=</span> <span class="token string">&quot;[La La Land], [The last Emperor], and [Life of Pi] are all great movies.&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们从中提取三个电影标题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token constant">EXPECTED2</span> <span class="token operator">=</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token string">&quot;La La Land&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;The last Emperor&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Life of Pi&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-1-非贪婪版本的-思想" tabindex="-1"><a class="header-anchor" href="#_4-1-非贪婪版本的-思想"><span>4.1. 非贪婪版本的[(.*)]思想</span></a></h3><p>模式“[(.<em>)]”有效地促进了从单个“[..]”对中提取所需内容。但这不会适用于包含多个“[..]”对的输入。这是因为<strong>正则表达式默认进行贪婪匹配</strong>。换句话说，如果我们用“[(.</em>)]”匹配INPUT2，捕获组将包含第一个&#39;[&#39;和最后一个&#39;]&#39;之间的文本：“La La Land], [The last Emperor], [Life of Pi”。</p><p>然而，<strong>我们可以在&#39;*&#39;后添加一个&#39;?&#39;以确保正则表达式进行非贪婪匹配</strong>。此外，由于我们将提取多个目标值，让我们将if (m.find())更改为while循环：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> rePattern <span class="token operator">=</span> <span class="token string">&quot;\\\\[(.*?)\\\\]&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">Pattern</span> p <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>rePattern<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Matcher</span> m <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span><span class="token constant">INPUT2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token constant">EXPECTED2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-使用字符类" tabindex="-1"><a class="header-anchor" href="#_4-2-使用字符类"><span>4.2. 使用字符类</span></a></h3><p><strong>NOR字符类解决方案也适用于包含多个“[..]”对的输入</strong>。我们只需要将_if_语句更改为_while_循环：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> rePattern <span class="token operator">=</span> <span class="token string">&quot;\\\\[([^]]*)\\\\]&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">Pattern</span> p <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>rePattern<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Matcher</span> m <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span><span class="token constant">INPUT2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token constant">EXPECTED2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-使用split-方法" tabindex="-1"><a class="header-anchor" href="#_4-3-使用split-方法"><span>4.3. 使用split()方法</span></a></h3><p>对于包含多个“[..]”的输入，如果我们使用相同的正则表达式进行_split()_，<strong>结果数组应该有多于三个的元素</strong>。因此，我们不能简单地取出中间的（索引=1）：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Input</span><span class="token operator">:</span> <span class="token string">&quot;---[value1]---[value2]---[value3]---&quot;</span>
<span class="token class-name">Array</span><span class="token operator">:</span> <span class="token string">&quot;---&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value1&quot;</span><span class="token punctuation">,</span>  <span class="token string">&quot;---&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;---&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;---&quot;</span>
<span class="token class-name">Index</span><span class="token operator">:</span>  <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>     <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>       <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>      <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span>     <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span>      <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span>     <span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，如果我们看看索引，我们会发现<strong>所有奇数索引的元素都是我们的目标值</strong>。因此，我们可以编写一个循环来从split()的结果中获取所需的元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> strArray <span class="token operator">=</span> <span class="token constant">INPUT2</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\[\\\\]&quot;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> strArray<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">+=</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>strArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token constant">EXPECTED2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何在Java中提取方括号之间的文本。我们学习了不同的与正则表达式相关的解决方法来应对挑战，有效地处理了两种问题场景。</p><h2 id="如常-示例的完整源代码可在github上获得。" tabindex="-1"><a class="header-anchor" href="#如常-示例的完整源代码可在github上获得。"><span>如常，示例的完整源代码可在GitHub上获得。</span></a></h2>`,56),o=[e];function c(l,u){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-01-Extract Text Between Square Brackets.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Extract%20Text%20Between%20Square%20Brackets.html","title":"Java中提取方括号内的内容","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","正则表达式"],"tag":["文本处理","正则表达式"],"head":[["meta",{"name":"keywords","content":"Java, 正则表达式, 文本处理, 提取方括号内文本"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Extract%20Text%20Between%20Square%20Brackets.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中提取方括号内的内容"}],["meta",{"property":"og:description","content":"Java中提取方括号内的内容 提取特定模式内的内容是文本处理中常见的需求。有时，处理使用方括号来封装有价值信息的数据时，提取方括号内的文字可能对我们来说是一个挑战。 在本教程中，我们将探讨提取方括号内容的技术和方法。 2. 问题介绍 首先，为了简化问题，让我们对问题提出两个先决条件： 没有嵌套的方括号对 - 例如，像“..[value1 [value2..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T11:27:44.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"文本处理"}],["meta",{"property":"article:tag","content":"正则表达式"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T11:27:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中提取方括号内的内容\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T11:27:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中提取方括号内的内容 提取特定模式内的内容是文本处理中常见的需求。有时，处理使用方括号来封装有价值信息的数据时，提取方括号内的文字可能对我们来说是一个挑战。 在本教程中，我们将探讨提取方括号内容的技术和方法。 2. 问题介绍 首先，为了简化问题，让我们对问题提出两个先决条件： 没有嵌套的方括号对 - 例如，像“..[value1 [value2..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 输入包含单个方括号对","slug":"_3-输入包含单个方括号对","link":"#_3-输入包含单个方括号对","children":[{"level":3,"title":"3.1. 直接使用[.*]的思想","slug":"_3-1-直接使用-的思想","link":"#_3-1-直接使用-的思想","children":[]},{"level":3,"title":"3.2. 使用NOR字符类","slug":"_3-2-使用nor字符类","link":"#_3-2-使用nor字符类","children":[]},{"level":3,"title":"3.3. 使用split()方法","slug":"_3-3-使用split-方法","link":"#_3-3-使用split-方法","children":[]}]},{"level":2,"title":"4. 输入包含多个方括号对","slug":"_4-输入包含多个方括号对","link":"#_4-输入包含多个方括号对","children":[{"level":3,"title":"4.1. 非贪婪版本的[(.*)]思想","slug":"_4-1-非贪婪版本的-思想","link":"#_4-1-非贪婪版本的-思想","children":[]},{"level":3,"title":"4.2. 使用字符类","slug":"_4-2-使用字符类","link":"#_4-2-使用字符类","children":[]},{"level":3,"title":"4.3. 使用split()方法","slug":"_4-3-使用split-方法","link":"#_4-3-使用split-方法","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":2,"title":"如常，示例的完整源代码可在GitHub上获得。","slug":"如常-示例的完整源代码可在github上获得。","link":"#如常-示例的完整源代码可在github上获得。","children":[]}],"git":{"createdTime":1719833264000,"updatedTime":1719833264000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.98,"words":1793},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Extract Text Between Square Brackets.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>提取特定模式内的内容是文本处理中常见的需求。有时，处理使用方括号来封装有价值信息的数据时，提取方括号内的文字可能对我们来说是一个挑战。</p>\\n<p>在本教程中，我们将探讨提取方括号内容的技术和方法。</p>\\n<h2>2. 问题介绍</h2>\\n<p>首先，为了简化问题，让我们对问题提出两个先决条件：</p>\\n<ul>\\n<li><strong>没有嵌套的方括号对</strong> - 例如，像“..[value1 [value2]]..”这样的模式不会作为我们的输入。</li>\\n<li><strong>方括号总是正确配对</strong> - 例如，“..[value1 …”是无效的输入。</li>\\n</ul>","autoDesc":true}');export{k as comp,d as data};
