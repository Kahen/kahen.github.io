import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-bN4DcMMr.js";const p={},e=t(`<h1 id="在java中查找字符串中子字符串的第n次出现" tabindex="-1"><a class="header-anchor" href="#在java中查找字符串中子字符串的第n次出现"><span>在Java中查找字符串中子字符串的第n次出现</span></a></h1><p>定位字符串中的子字符串是我们在使用Java时的常见操作。通常，我们可以使用_indexOf()_方法找到子字符串的索引。</p><p>在本教程中，我们将探索解决一个有趣且实用问题的不同方法：在较长的字符串中找到子字符串的第n次出现。</p><h3 id="问题介绍" tabindex="-1"><a class="header-anchor" href="#问题介绍"><span>问题介绍</span></a></h3><p>标准的_indexOf()<em>方法可以给我们子字符串在字符串中的索引。例如，我们可以找到子字符串</em>“a”_在“<em>This is a word.</em>”中的索引（<em>8</em>）：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> firstIdx <span class="token operator">=</span> <span class="token string">&quot;This is a word.&quot;</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> firstIdx<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，<strong>_indexOf(substring)_方法总是返回子字符串第一次出现的索引。</strong> 因此，当我们想要知道子字符串的第n次出现索引时，这种方法有时就不太方便。让我们来看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token constant">INPUT</span> <span class="token operator">=</span> <span class="token string">&quot;a word, a word, a word, a word&quot;</span><span class="token punctuation">;</span>
<span class="token comment">// &quot;a&quot;的索引：&quot;0       8       16      24 &quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如上例所示，_INPUT_包含四个“<em>a</em>”。我们可以通过直接调用_indexOf(&quot;a&quot;)_获得第一个“a”的索引（<em>0</em>）。然而，我们可能需要解决方案来获取“a”的其他出现索引，比如8、16和24。</p><p>接下来，让我们看看如何解决这个问题。</p><p>为了简单起见，我们将使用单元测试断言来验证每种方法是否返回预期的结果。</p><p>在我们解决“查找第n次出现”的问题之前，让我们首先找到子字符串“a”的第二次出现索引。然后，我们将“查找第二次出现”的解决方案扩展到“第n次出现”的解决方案。</p><p>我们知道_indexOf(&quot;a&quot;)_返回“a”第一次出现的索引。此外，我们可以将_fromIndex int_参数传递给_indexOf()_方法。<strong>_fromIndex_参数指示我们开始搜索的字符索引。</strong></p><p>因此，一个直接的想法是两次调用_indexOf()_来获取第二次出现的索引：</p><ul><li>通过调用_indexOf(substring)<em>并保存结果到一个变量，比如说_firstIdx</em></li><li>通过调用_indexOf(substring, firstIdx + substring.length())_来获取第二次出现的索引</li></ul><p>接下来，让我们实现这种方法并用我们的_INPUT_字符串进行测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> firstIdx <span class="token operator">=</span> <span class="token constant">INPUT</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> secondIdx <span class="token operator">=</span> <span class="token constant">INPUT</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> firstIdx <span class="token operator">+</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> secondIdx<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，有些人可能意识到<strong>我们可以调用indexOf() n次，并使用相应的_fromIdx_参数来获取第n次出现的索引。</strong> 例如，我们可以在上述测试中添加另一个_indexOf()_调用以获取第三次出现的索引：<em>thirdIdx = INPUT.indexOf(&quot;a&quot;, secondIdx + &quot;a&quot;.length());</em>。</p><p>接下来，让我们将“查找第二次出现”的解决方案扩展到“查找第n次出现”。</p><h3 id="查找子字符串的第n次出现" tabindex="-1"><a class="header-anchor" href="#查找子字符串的第n次出现"><span>查找子字符串的第n次出现</span></a></h3><p>通常，我们会使用递归或循环来实现重复操作。</p><h4 id="_4-1-递归方法" tabindex="-1"><a class="header-anchor" href="#_4-1-递归方法"><span>4.1. 递归方法</span></a></h4><p>那么，让我们首先实现递归解决方案：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">nthIndexOf</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">,</span> <span class="token class-name">String</span> substring<span class="token punctuation">,</span> <span class="token keyword">int</span> nth<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nth <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> input<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>substring<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> input<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>substring<span class="token punctuation">,</span> <span class="token function">nthIndexOf</span><span class="token punctuation">(</span>input<span class="token punctuation">,</span> substring<span class="token punctuation">,</span> nth <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> substring<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现非常简单。<strong>_nth_变量作为一个计数器。我们在每次递归步骤中减少它的值。</strong></p><p>接下来，让我们用我们的例子数据测试这个方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> result1 <span class="token operator">=</span> <span class="token function">nthIndexOf</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> result1<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> result2 <span class="token operator">=</span> <span class="token function">nthIndexOf</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> result2<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> result3 <span class="token operator">=</span> <span class="token function">nthIndexOf</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">,</span> result3<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> result4 <span class="token operator">=</span> <span class="token function">nthIndexOf</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">,</span> result4<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> result5 <span class="token operator">=</span> <span class="token function">nthIndexOf</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> result5<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，测试会通过。同样，如我们所见，当总出现次数小于_nth_值时，该方法返回_-1_。</p><h4 id="_4-2-迭代方法" tabindex="-1"><a class="header-anchor" href="#_4-2-迭代方法"><span>4.2. 迭代方法</span></a></h4><p>类似地，我们可以在迭代方法中实现相同的想法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">nthIndexOf2</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">,</span> <span class="token class-name">String</span> substring<span class="token punctuation">,</span> <span class="token keyword">int</span> nth<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>nth <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        index <span class="token operator">=</span> input<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>substring<span class="token punctuation">,</span> index <span class="token operator">+</span> substring<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        nth<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> index<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用相同输入的测试也通过了：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> result1 <span class="token operator">=</span> <span class="token function">nthIndexOf2</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> result1<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> result2 <span class="token operator">=</span> <span class="token function">nthIndexOf2</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> result2<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> result3 <span class="token operator">=</span> <span class="token function">nthIndexOf2</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">,</span> result3<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> result4 <span class="token operator">=</span> <span class="token function">nthIndexOf2</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">,</span> result4<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> result5 <span class="token operator">=</span> <span class="token function">nthIndexOf2</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> result5<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-基于正则表达式的解决方案" tabindex="-1"><a class="header-anchor" href="#_5-基于正则表达式的解决方案"><span>5. 基于正则表达式的解决方案</span></a></h3><p>我们已经看到了如何使用_indexOf()_方法解决问题。另外，我们可以使用Java的正则表达式API来解决问题。</p><p><strong>_Matcher.find()_允许我们在输入字符串中找到下一个匹配的出现。</strong> 因此，我们可以调用_Matcher.find()_ n次来获取第n次匹配。同样，<strong>我们可以使用_Matcher.start()_获取每个匹配的起始索引：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">nthOccurrenceIndex</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">,</span> <span class="token class-name">String</span> regexPattern<span class="token punctuation">,</span> <span class="token keyword">int</span> nth<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>regexPattern<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> nth<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> matcher<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们创建一个测试来验证基于正则表达式的解决方案是否正确执行：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> result1 <span class="token operator">=</span> <span class="token function">nthOccurrenceIndex</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> result1<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> result2 <span class="token operator">=</span> <span class="token function">nthOccurrenceIndex</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> result2<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> result3 <span class="token operator">=</span> <span class="token function">nthOccurrenceIndex</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">,</span> result3<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> result4 <span class="token operator">=</span> <span class="token function">nthOccurrenceIndex</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">,</span> result4<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> result5 <span class="token operator">=</span> <span class="token function">nthOccurrenceIndex</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> result5<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，这种解决方案允许我们匹配输入中符合模式的动态子字符串。然而，另一方面，基于_indexOf()_的方法只适用于固定子字符串。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了在字符串中定位子字符串的第n次出现的各种方法：</p><ul><li>基于_indexOf()_方法的递归解决方案</li><li>基于_indexOf()_方法的迭代解决方案</li><li>基于正则表达式的解决方案</li></ul><p>如往常一样，示例的完整源代码可在GitHub上找到。</p>`,44),o=[e];function c(u,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-06-27-Finding the N th Occurrence of a Substring in a String in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Finding%20the%20N%20th%20Occurrence%20of%20a%20Substring%20in%20a%20String%20in%20Java.html","title":"在Java中查找字符串中子字符串的第n次出现","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","String Manipulation"],"tag":["indexOf()","substring","regex"],"head":[["meta",{"name":"keywords","content":"Java, String, indexOf, substring, regex"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Finding%20the%20N%20th%20Occurrence%20of%20a%20Substring%20in%20a%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中查找字符串中子字符串的第n次出现"}],["meta",{"property":"og:description","content":"在Java中查找字符串中子字符串的第n次出现 定位字符串中的子字符串是我们在使用Java时的常见操作。通常，我们可以使用_indexOf()_方法找到子字符串的索引。 在本教程中，我们将探索解决一个有趣且实用问题的不同方法：在较长的字符串中找到子字符串的第n次出现。 问题介绍 标准的_indexOf()方法可以给我们子字符串在字符串中的索引。例如，我们..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T19:25:41.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"indexOf()"}],["meta",{"property":"article:tag","content":"substring"}],["meta",{"property":"article:tag","content":"regex"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T19:25:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中查找字符串中子字符串的第n次出现\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T19:25:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中查找字符串中子字符串的第n次出现 定位字符串中的子字符串是我们在使用Java时的常见操作。通常，我们可以使用_indexOf()_方法找到子字符串的索引。 在本教程中，我们将探索解决一个有趣且实用问题的不同方法：在较长的字符串中找到子字符串的第n次出现。 问题介绍 标准的_indexOf()方法可以给我们子字符串在字符串中的索引。例如，我们..."},"headers":[{"level":3,"title":"问题介绍","slug":"问题介绍","link":"#问题介绍","children":[]},{"level":3,"title":"查找子字符串的第n次出现","slug":"查找子字符串的第n次出现","link":"#查找子字符串的第n次出现","children":[]},{"level":3,"title":"5. 基于正则表达式的解决方案","slug":"_5-基于正则表达式的解决方案","link":"#_5-基于正则表达式的解决方案","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719516341000,"updatedTime":1719516341000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.75,"words":1424},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Finding the N th Occurrence of a Substring in a String in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>定位字符串中的子字符串是我们在使用Java时的常见操作。通常，我们可以使用_indexOf()_方法找到子字符串的索引。</p>\\n<p>在本教程中，我们将探索解决一个有趣且实用问题的不同方法：在较长的字符串中找到子字符串的第n次出现。</p>\\n<h3>问题介绍</h3>\\n<p>标准的_indexOf()<em>方法可以给我们子字符串在字符串中的索引。例如，我们可以找到子字符串</em>“a”_在“<em>This is a word.</em>”中的索引（<em>8</em>）：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">int</span> firstIdx <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"This is a word.\\"</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">indexOf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"a\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">8</span><span class=\\"token punctuation\\">,</span> firstIdx<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
