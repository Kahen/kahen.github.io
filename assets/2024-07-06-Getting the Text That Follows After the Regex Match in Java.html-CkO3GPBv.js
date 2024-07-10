import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BmeLisJw.js";const e={},p=t(`<h1 id="在java中使用正则表达式获取匹配后的文本" tabindex="-1"><a class="header-anchor" href="#在java中使用正则表达式获取匹配后的文本"><span>在Java中使用正则表达式获取匹配后的文本</span></a></h1><hr><p>当在Java中处理文本数据时，通常需要使用正则表达式（也称为Regex）来提取特定的信息片段。然而，仅仅匹配正则表达式模式并不总是足够的。有时，我们可能需要提取正则表达式匹配后的文本。</p><p>在本教程中，我们将探讨如何在Java中实现这一点。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>首先，让我们通过一个例子快速理解问题。假设我们有一个字符串变量<code>INPUT1</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token constant">INPUT1</span> <span class="token operator">=</span> <span class="token string">&quot;Some text, targetValue=Regex is cool&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以<code>INPUT1</code>作为输入，我们的目标是获取“targetValue=”后的文本，即“Regex is cool”。</p><p>因此，在这个例子中，<strong>如果我们写一个正则表达式模式来匹配“targetValue=”，我们必须提取匹配后的所有内容</strong>。然而，问题可能有变体。让我们看看另一个输入变量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token constant">INPUT2</span> <span class="token operator">=</span> <span class="token string">&quot;Some text. targetValue=Java is cool. some other text&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如上例<code>INPUT2</code>所示，输入文本中仍然有“targetValue=”，但这次我们不想获取匹配后的所有内容。相反，我们想从匹配后的文本中提取“Java is cool”。换句话说，<strong>我们需要提取匹配到第一个句号之前的所有文本</strong>。实际上，句号字符可能是各种模式。</p><p>接下来，我们将探索解决这个问题的不同方法。当然，我们将涵盖<code>INPUT1</code>和<code>INPUT2</code>的情况。</p><p>我们将使用单元测试断言来验证解决方案是否可以提取预期的结果。同样，为了简单起见，我们将跳过输入验证部分，例如检查输入字符串是否包含正则表达式模式。</p><p>现在，让我们看看它们是如何工作的。</p><h2 id="_3-使用split-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用split-方法"><span>3. 使用<code>split()</code>方法</span></a></h2><p>标准的<code>split()</code>方法允许我们通过分隔符将一个字符串分割成多个字符串作为一个数组。此外，分隔符可以是正则表达式模式。</p><p>因此，要解决<code>INPUT1</code>问题，<strong>我们可以简单地使用“targetValue=”作为模式来分割输入字符串。然后，结果数组中的第二个元素将是结果</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token string">&quot;Some text, targetValue=Regex is cool&quot;</span> <span class="token operator">--</span>split by <span class="token string">&quot;targetValue=&quot;</span><span class="token operator">--</span><span class="token operator">&gt;</span> <span class="token punctuation">[</span> <span class="token string">&quot;Some text, &quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Regex is cool&quot;</span> <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们实现这个想法并检查它是否有效：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result1 <span class="token operator">=</span> <span class="token constant">INPUT1</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;targetValue=&quot;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Regex is cool&quot;</span><span class="token punctuation">,</span> result1<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它将通过。因此，“split和take”解决了<code>INPUT1</code>问题。</p><p>在上面的测试中，我们直接访问数组元素而没有先检查长度。这是因为我们假设输入是有效的，正如我们之前提到的。然而，如果我们在实际项目中工作，<strong>在访问数组元素之前检查长度</strong>是一个好的实践，以避免<code>ArrayIndexOutOfBoundsException</code>。</p><p>接下来，让我们看看<code>INPUT2</code>的情况。一个可能的想法是使用“targetValue=”或字面点作为<code>split()</code>方法的正则表达式模式。然后，我们仍然可以从数组结果中获取第二个元素。</p><p>然而，这个想法对我们的<code>INPUT2</code>不起作用，因为输入在“targetValue=”之前有另一个点：<code>INPUT2 = &quot;Some text. targetValue=...&quot;</code>。</p><p>如果我们调用“targetValue=”模式1和“.”字符模式2，在现实世界中，<strong>我们不能预测在文本中<code>pattern1</code>之前存在多少<code>pattern2</code>匹配</strong>。因此，简单的“split和take”方法在这里不起作用。</p><p>然而，<strong>我们可以两次分割输入来获取目标值</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token string">&quot;Some text. targetValue=Java is cool. some other text&quot;</span>
<span class="token class-name">Split</span> by <span class="token string">&quot;targetValue=&quot;</span> <span class="token operator">--</span><span class="token operator">-&gt;</span>
<span class="token punctuation">[</span> <span class="token string">&quot;Some text. &quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Java is cool. some other text&quot;</span> <span class="token punctuation">]</span>
<span class="token class-name">Take</span> the second element and split by <span class="token string">&quot;.&quot;</span> <span class="token operator">--</span><span class="token operator">-&gt;</span>
<span class="token punctuation">[</span> <span class="token string">&quot;Java is cool&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot; some other text&quot;</span> <span class="token punctuation">]</span>

<span class="token class-name">The</span> first element is the result
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以接下来，让我们在测试中应用这个方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> afterFirstSplit <span class="token operator">=</span> <span class="token constant">INPUT2</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;targetValue=&quot;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Java is cool. some other text&quot;</span><span class="token punctuation">,</span> afterFirstSplit<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> result2 <span class="token operator">=</span> afterFirstSplit<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;[.]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Java is cool&quot;</span><span class="token punctuation">,</span> result2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得一提的是，句号字符在正则表达式中有特殊含义（匹配任何字符）。因此，在第二个<code>split()</code>调用中，<code>afterFirstSplit.split(&quot;[.]&quot;)[0]</code>，<strong>我们必须将句号字符放在字符类中或转义它（&quot;\\\\.&quot;）</strong>。否则，每个字符都将成为<code>split()</code>方法的分隔符，我们将得到一个空数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// if we use the dot as the regex for splitting, the result array is empty</span>
<span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> splitByDot <span class="token operator">=</span> <span class="token constant">INPUT2</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;targetValue=&quot;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> splitByDot<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用replaceall-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用replaceall-方法"><span>4. 使用<code>replaceAll()</code>方法</span></a></h2><p>像<code>split()</code>方法一样，<code>replaceAll()</code>方法也支持正则表达式模式。我们可以使用<code>replaceAll()</code>将我们不需要的文本替换为空字符串以获得预期的结果。</p><p>例如，要解决<code>INPUT1</code>问题，我们可以将直到<code>“targetValue=”</code>（包括）的所有内容替换为空字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result1 <span class="token operator">=</span> <span class="token constant">INPUT1</span><span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;.*targetValue=&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Regex is cool&quot;</span><span class="token punctuation">,</span> result1<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>类似于<code>split()</code>解决方案，<strong>我们可以两次调用<code>replaceAll()</code>方法来解决<code>INPUT2</code>问题</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> afterFirstReplace <span class="token operator">=</span> <span class="token constant">INPUT2</span><span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;.*targetValue=&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Java is cool. some other text&quot;</span><span class="token punctuation">,</span> afterFirstReplace<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> result2 <span class="token operator">=</span> afterFirstReplace<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;[.].*&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Java is cool&quot;</span><span class="token punctuation">,</span> result2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用捕获组" tabindex="-1"><a class="header-anchor" href="#_5-使用捕获组"><span>5. 使用捕获组</span></a></h2><p>Java正则表达式API允许我们在模式中定义捕获组。正则表达式引擎将为捕获组附加索引号码，以便我们可以使用这些索引来引用这些组。</p><p>接下来，让我们看看如何使用捕获组解决<code>INPUT1</code>问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Pattern</span> p1 <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;targetValue=(.*)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Matcher</span> m1 <span class="token operator">=</span> p1<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span><span class="token constant">INPUT1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>m1<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> result1 <span class="token operator">=</span> m1<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Regex is cool&quot;</span><span class="token punctuation">,</span> result1<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在上面的测试中看到的，我们创建了正则表达式模式“targetValue=(.*)”。因此，“targetValue=”之后的所有内容都在一个捕获组中。进一步地说，由于这是模式中的第一个组，它有索引号1。因此，<strong>在调用<code>Pattern.matcher()</code>之后，我们可以通过调用<code>matcher.group(1)</code>来获取组中的文本</strong>。</p><p>对于<code>INPUT2</code>案例，我们不会将“targetValue=”之后的所有内容都放入组中。相反，我们可以使组包含直到第一个句号的所有内容，使用非字符类“[^.]*”。接下来，让我们看看它在实践中的表现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Pattern</span> p2 <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;targetValue=([^.]*)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Matcher</span> m2 <span class="token operator">=</span> p2<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span><span class="token constant">INPUT2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>m2<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> result2 <span class="token operator">=</span> m2<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Java is cool&quot;</span><span class="token punctuation">,</span> result2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，我们可以使用非贪婪量词‘*?’来实现相同的目标：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Pattern</span> p3 <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;targetValue=(.*?)[.]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Matcher</span> m3 <span class="token operator">=</span> p3<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span><span class="token constant">INPUT2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>m3<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> result3 <span class="token operator">=</span> m3<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Java is cool&quot;</span><span class="token punctuation">,</span> result3<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们处理<code>INPUT2</code>案例时，<code>split()</code>和<code>replaceAll()</code>方法需要两个步骤来完成工作。正如我们所看到的，<strong>使用正则表达式的捕获组，我们可以一次性解决<code>INPUT2</code>问题</strong>。</p><h2 id="_6-使用零宽断言" tabindex="-1"><a class="header-anchor" href="#_6-使用零宽断言"><span>6. 使用零宽断言</span></a></h2><p>Java正则表达式API支持零宽断言。当我们想要基于周围字符匹配一个模式，而实际上不包括这些字符在匹配中时，零宽断言非常有用。</p><p>接下来，让我们探索如何使用零宽断言解决<code>INPUT1</code>案例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Pattern</span> p1 <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;(?&lt;=targetValue=).*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Matcher</span> m1 <span class="token operator">=</span> p1<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span><span class="token constant">INPUT1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>m1<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> result1 <span class="token operator">=</span> m1<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Regex is cool&quot;</span><span class="token punctuation">,</span> result1<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，<strong>我们使用了正则表达式模式中的正向后发断言：“(?&lt;=targetValue=).*”</strong>。它匹配出现在字符串“targetValue=”之后的任何字符。</p><p>类似地，我们可以将“.”更改为非字符类“[^.]”来解决<code>INPUT2</code>案例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Pattern</span> p2 <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;(?&lt;=targetValue=)[^.]*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Matcher</span> m2 <span class="token operator">=</span> p2<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span><span class="token constant">INPUT2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>m2<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> result2 <span class="token operator">=</span> m2<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Java is cool&quot;</span><span class="token punctuation">,</span> result2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，<strong>我们可以使用</strong>正向后发断言和正向先行断言来提取我们需要的文本**：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Pattern</span> p3 <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;(?&lt;=targetValue=).*(?=[.])&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Matcher</span> m3 <span class="token operator">=</span> p3<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span><span class="token constant">INPUT2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>m3<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> result3 <span class="token operator">=</span> m3<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Java is cool&quot;</span><span class="token punctuation">,</span> result3<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中：</p><ul><li><code>(?&lt;=targetValue=)</code> 是我们在解决<code>INPUT1</code>问题时看到的正向后发断言。</li><li><code>(?=[.])</code> 是正向先行断言。</li></ul><p>因此，<code>&quot;(?&lt;=targetValue=).*(?=[.])&quot;</code> 匹配“targetValue=”和句号字符之间的任何字符，这正是我们追求的结果。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，<strong>我们探讨了提取正则表达式匹配后文本的两种变体问题</strong>。一种返回匹配正则表达式之后的所有内容，另一种返回在一个正则表达式匹配之后但在第二个不同的正则表达式匹配之前的所有内容。</p><p>此外，我们通过示例学习了解决这两种场景的四种不同方法。</p><p>像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</p><p><a href="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" target="_blank" rel="noopener noreferrer">Baeldung Logo</a><a href="https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&amp;r=g" target="_blank" rel="noopener noreferrer">Gravatar Image</a><a href="https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg" target="_blank" rel="noopener noreferrer">Eric Martin Image</a><a href="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" target="_blank" rel="noopener noreferrer">Announcement Icon</a><a href="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" target="_blank" rel="noopener noreferrer">REST API Post Footer Image</a><a href="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" target="_blank" rel="noopener noreferrer">Spring Boot Logo</a></p><p>OK</p>`,65),o=[p];function c(l,u){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-06-Getting the Text That Follows After the Regex Match in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Getting%20the%20Text%20That%20Follows%20After%20the%20Regex%20Match%20in%20Java.html","title":"在Java中使用正则表达式获取匹配后的文本","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Regex"],"tag":["Java","Regex","Text Extraction"],"head":[["meta",{"name":"keywords","content":"Java, Regex, Text Extraction, Baeldung"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Getting%20the%20Text%20That%20Follows%20After%20the%20Regex%20Match%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中使用正则表达式获取匹配后的文本"}],["meta",{"property":"og:description","content":"在Java中使用正则表达式获取匹配后的文本 当在Java中处理文本数据时，通常需要使用正则表达式（也称为Regex）来提取特定的信息片段。然而，仅仅匹配正则表达式模式并不总是足够的。有时，我们可能需要提取正则表达式匹配后的文本。 在本教程中，我们将探讨如何在Java中实现这一点。 2. 问题介绍 首先，让我们通过一个例子快速理解问题。假设我们有一个字符..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T21:34:25.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Regex"}],["meta",{"property":"article:tag","content":"Text Extraction"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T21:34:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中使用正则表达式获取匹配后的文本\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T21:34:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中使用正则表达式获取匹配后的文本 当在Java中处理文本数据时，通常需要使用正则表达式（也称为Regex）来提取特定的信息片段。然而，仅仅匹配正则表达式模式并不总是足够的。有时，我们可能需要提取正则表达式匹配后的文本。 在本教程中，我们将探讨如何在Java中实现这一点。 2. 问题介绍 首先，让我们通过一个例子快速理解问题。假设我们有一个字符..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用split()方法","slug":"_3-使用split-方法","link":"#_3-使用split-方法","children":[]},{"level":2,"title":"4. 使用replaceAll()方法","slug":"_4-使用replaceall-方法","link":"#_4-使用replaceall-方法","children":[]},{"level":2,"title":"5. 使用捕获组","slug":"_5-使用捕获组","link":"#_5-使用捕获组","children":[]},{"level":2,"title":"6. 使用零宽断言","slug":"_6-使用零宽断言","link":"#_6-使用零宽断言","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720301665000,"updatedTime":1720301665000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.14,"words":2141},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Getting the Text That Follows After the Regex Match in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<hr>\\n<p>当在Java中处理文本数据时，通常需要使用正则表达式（也称为Regex）来提取特定的信息片段。然而，仅仅匹配正则表达式模式并不总是足够的。有时，我们可能需要提取正则表达式匹配后的文本。</p>\\n<p>在本教程中，我们将探讨如何在Java中实现这一点。</p>\\n<h2>2. 问题介绍</h2>\\n<p>首先，让我们通过一个例子快速理解问题。假设我们有一个字符串变量<code>INPUT1</code>：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">static</span> <span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">INPUT1</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"Some text, targetValue=Regex is cool\\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
