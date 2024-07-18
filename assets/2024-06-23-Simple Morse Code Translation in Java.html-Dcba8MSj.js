import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-C6rqSDgP.js";const p={},e=t(`<h1 id="简单的摩斯电码翻译在java中-baeldung" tabindex="-1"><a class="header-anchor" href="#简单的摩斯电码翻译在java中-baeldung"><span>简单的摩斯电码翻译在Java中 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>摩斯电码使用点和划的序列来表示字母、数字和标点符号。Samuel Morse 和 Alfred Vail 在 19 世纪 30 年代初为电报使用而开发了它。</p><p>在本教程中，我们将编写一个方法，将英文翻译成摩斯电码。然后，我们将编写一个相反的方法。</p><h2 id="_2-编写摩斯电码" tabindex="-1"><a class="header-anchor" href="#_2-编写摩斯电码"><span>2. 编写摩斯电码</span></a></h2><p>让我们了解摩斯电码及其字母表。</p><h3 id="_2-1-什么是摩斯电码" tabindex="-1"><a class="header-anchor" href="#_2-1-什么是摩斯电码"><span>2.1. 什么是摩斯电码？</span></a></h3><p><strong>在摩斯电码中，每个字母由独特的短信号（点）和长信号（划）组合表示</strong>，允许通过一系列开关信号进行通信。根据常见用法，我们将用“ <em>.</em>”表示点，用“ <em>–</em>”表示划。这两个字符足以写出整个摩斯字母表。</p><p>然而，我们需要更多的东西来写句子。由于摩斯电码确实针对非书面通信，流程对于解密摩斯电报至关重要。因此，负责传输摩斯电报的操作员会在每个字母之间留下短暂的停顿。此外，他会在每个单词之间留下更长的停顿。因此，不考虑到这些停顿的表示将无法解码。</p><p>一个常见的选择是使用空格“ ”来表示每个单词之间的停顿。我们还将使用“ <em>/</em>”来编码两个单词之间的空格字符。由于斜杠也是一个字符，空格将像其他字符一样包围它。</p><h3 id="_2-2-英文和摩斯电码之间的双向映射" tabindex="-1"><a class="header-anchor" href="#_2-2-英文和摩斯电码之间的双向映射"><span>2.2. 英文和摩斯电码之间的双向映射</span></a></h3><p><strong>为了能够轻松地从英文翻译到摩斯电码，反之亦然，我们希望在两种字母表之间有一个双向映射。</strong> 因此，我们将使用 Apache Commons Collection 的 <em>BidiMap</em> 数据结构。这是一个允许通过键或值访问的 <em>Map</em>。这样，我们将使用它进行两种翻译方法。然而，如果我们只对单向翻译感兴趣，我们可以直接使用一个 <em>Map</em>。</p><p>首先，让我们在 <em>pom.xml</em> 中包含库的最新版本：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.apache.commons\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`commons-collections4\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`4.4\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以创建我们的映射并在静态块中初始化它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MorseTranslator</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">BidiMap</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` morseAlphabet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DualHashBidiMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        morseAlphabet<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.-&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        morseAlphabet<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        morseAlphabet<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;C&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-.-.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        morseAlphabet<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;D&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-..&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        morseAlphabet<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;E&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        morseAlphabet<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;F&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;..-.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        morseAlphabet<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;G&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;--.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        morseAlphabet<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;H&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;....&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        morseAlphabet<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;I&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;..&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 等等</span>
        morseAlphabet<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们注意我们添加了空白字符的翻译。此外，我们限制自己只使用字母、数字和标点符号。如果我们也想使用带重音的字符，我们需要使用另一个数据结构或做出选择，因为许多带重音的字符可以匹配相同的摩斯电码。例如，“ <em>à</em>”和“ <em>å</em>”在摩斯电码中都对应“ <em>.–.-</em>”。</p><h2 id="_3-将英文翻译成摩斯电码" tabindex="-1"><a class="header-anchor" href="#_3-将英文翻译成摩斯电码"><span>3. 将英文翻译成摩斯电码</span></a></h2><p>首先，让我们编写一个方法将英文句子翻译成摩斯电码。</p><h3 id="_3-1-通用算法" tabindex="-1"><a class="header-anchor" href="#_3-1-通用算法"><span>3.1. 通用算法</span></a></h3><p>我们的 <em>BidiMap</em> 只包含大写字母，因为大写不会改变翻译。因此，我们将从将单词大写开始。然后，<strong>我们将逐个迭代字母并逐个翻译它们</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">englishToMorse</span><span class="token punctuation">(</span><span class="token class-name">String</span> english<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> upperCaseEnglish <span class="token operator">=</span> english<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> morse <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span>upperCaseEnglish<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index \`<span class="token operator">&lt;</span> upperCaseEnglish<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> morseCharacter <span class="token operator">=</span> morseAlphabet<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>upperCaseEnglish<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        morse<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> morseCharacter<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">,</span> morse<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将翻译存储在一个摩斯 <em>String</em> 数组中是方便的。这个中间数组有与输入字符数一样多的值。最后，我们使用 <em>String.join()</em> 方法将所有条目连接起来，使用空格作为分隔符。</p><p>我们现在可以测试我们的方法。由于我们想检查大写字母不重要，我们将编写一个参数化测试，使用各种输入期望相同的输出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@ValueSource</span><span class="token punctuation">(</span>strings <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;MORSE CODE!&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;morse code!&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;mOrSe cOdE!&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenAValidEnglishWordWhateverTheCapitalization_whenEnglishToMorse_thenTranslatedToMorse</span><span class="token punctuation">(</span><span class="token class-name">String</span> english<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;-- --- .-. ... . / -.-. --- -.. . -.-.-----.&quot;</span><span class="token punctuation">,</span> <span class="token class-name">MorseTranslator</span><span class="token punctuation">.</span><span class="token function">englishToMorse</span><span class="token punctuation">(</span>english<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们可以注意到两个单词之间的空格翻译为“ <em>/</em> ”，正如预期的那样。</p><h3 id="_3-2-边缘情况" tabindex="-1"><a class="header-anchor" href="#_3-2-边缘情况"><span>3.2. 边缘情况</span></a></h3><p>目前，我们的程序没有考虑到可能的格式错误的输入。然而，<strong>我们希望拒绝包含无效字符的句子。</strong> 在这种情况下，我们将抛出一个 <em>IllegalArgumentException</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> morseCharacter <span class="token operator">=</span> morseAlphabet<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>upperCaseEnglish<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>morseCharacter <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Character &quot;</span> <span class="token operator">+</span> upperCaseEnglish<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; can&#39;t be translated to morse&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
morse<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> morseCharacter<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改非常直接，因为如果一个字符是无效的，它就不会作为双向映射的键存在。因此，<em>get()</em> 方法返回 <em>null</em>。我们也可以在我们的方法顶部添加一个 <em>null</em> 安全检查。简而言之，我们的最终方法如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">englishToMorse</span><span class="token punctuation">(</span><span class="token class-name">String</span> english<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>english <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">String</span> upperCaseEnglish <span class="token operator">=</span> english<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> morse <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span>upperCaseEnglish<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index <span class="token operator">&lt;</span> upperCaseEnglish<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> morseCharacter <span class="token operator">=</span> morseAlphabet<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>upperCaseEnglish<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>morseCharacter <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Character &quot;</span> <span class="token operator">+</span> upperCaseEnglish<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; can&#39;t be translated to morse&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        morse<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> morseCharacter<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">,</span> morse<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们可以添加一个不可翻译句子的单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAnEnglishWordWithAnIllegalCharacter_whenEnglishToMorse_thenThrows</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> english <span class="token operator">=</span> <span class="token string">&quot;~This sentence starts with an illegal character&quot;</span><span class="token punctuation">;</span>
    <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span>\` <span class="token class-name">MorseTranslator</span><span class="token punctuation">.</span><span class="token function">englishToMorse</span><span class="token punctuation">(</span>english<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-将摩斯电码翻译成英文" tabindex="-1"><a class="header-anchor" href="#_4-将摩斯电码翻译成英文"><span>4. 将摩斯电码翻译成英文</span></a></h2><p>现在让我们写一个反向方法。再次强调，我们将在深入边缘情况之前关注大局。</p><h3 id="_4-1-通用算法" tabindex="-1"><a class="header-anchor" href="#_4-1-通用算法"><span>4.1. 通用算法</span></a></h3><p>概念相同：<strong>对于每个摩斯电码字符，我们在 <em>BidiMap</em> 中找到英文翻译。</strong> <em>getKey()</em> 方法允许我们这样做。然后，我们需要迭代每个摩斯电码字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">morseToEnglish</span><span class="token punctuation">(</span><span class="token class-name">String</span> morse<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> morseUnitCharacters <span class="token operator">=</span> morse<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StringBuilder</span> stringBuilder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index <span class="token operator">&lt;</span> morseUnitCharacters<span class="token punctuation">.</span>length<span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> englishCharacter <span class="token operator">=</span> morseAlphabet<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span>morseUnitCharacters<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stringBuilder<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>englishCharacter<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> stringBuilder<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们通过 <em>String.split()</em> 方法隔离了每个摩斯电码字符。将每个英文翻译附加到 <em>StringBuilder</em> 是连接结果的最有效方式。</p><p>现在让我们验证我们的方法是否返回正确的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAValidMorseWord_whenMorseToEnglish_thenTranslatedToUpperCaseEnglish</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;MORSE CODE!&quot;</span><span class="token punctuation">,</span> <span class="token class-name">MorseTranslator</span><span class="token punctuation">.</span><span class="token function">morseToEnglish</span><span class="token punctuation">(</span><span class="token string">&quot;-- --- .-. ... . / -.-. --- -.. . -.-.-----.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们可以回忆一下，输出将始终是大写字母。</p><h3 id="_4-2-边缘情况" tabindex="-1"><a class="header-anchor" href="#_4-2-边缘情况"><span>4.2. 边缘情况</span></a></h3><p>此外，<strong>我们希望拒绝包含无效摩斯电码字符的输入。</strong> 就像 <em>englishToMorse()</em> 中一样，我们将在这种情况下抛出一个 <em>IllegalArgumentException</em>。此外，我们还可以处理 <em>null</em> 输入的特殊情况。在这里，我们还必须单独处理空输入，因为 <em>split()</em> 方法的内部功能。</p><p>总而言之，让我们写下我们的最终方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span></code></pre><div class="line-numbers" aria-hidden="true"></div></div>`,46),o=[e];function c(l,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-06-23-Simple Morse Code Translation in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Simple%20Morse%20Code%20Translation%20in%20Java.html","title":"简单的摩斯电码翻译在Java中 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Java","Morse Code"],"tag":["Morse Code","Translation","Java"],"head":[["meta",{"name":"keywords","content":"Java, Morse Code, Translation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Simple%20Morse%20Code%20Translation%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"简单的摩斯电码翻译在Java中 | Baeldung"}],["meta",{"property":"og:description","content":"简单的摩斯电码翻译在Java中 | Baeldung 1. 概述 摩斯电码使用点和划的序列来表示字母、数字和标点符号。Samuel Morse 和 Alfred Vail 在 19 世纪 30 年代初为电报使用而开发了它。 在本教程中，我们将编写一个方法，将英文翻译成摩斯电码。然后，我们将编写一个相反的方法。 2. 编写摩斯电码 让我们了解摩斯电码及其..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T23:28:49.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Morse Code"}],["meta",{"property":"article:tag","content":"Translation"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T23:28:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"简单的摩斯电码翻译在Java中 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T23:28:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"简单的摩斯电码翻译在Java中 | Baeldung 1. 概述 摩斯电码使用点和划的序列来表示字母、数字和标点符号。Samuel Morse 和 Alfred Vail 在 19 世纪 30 年代初为电报使用而开发了它。 在本教程中，我们将编写一个方法，将英文翻译成摩斯电码。然后，我们将编写一个相反的方法。 2. 编写摩斯电码 让我们了解摩斯电码及其..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 编写摩斯电码","slug":"_2-编写摩斯电码","link":"#_2-编写摩斯电码","children":[{"level":3,"title":"2.1. 什么是摩斯电码？","slug":"_2-1-什么是摩斯电码","link":"#_2-1-什么是摩斯电码","children":[]},{"level":3,"title":"2.2. 英文和摩斯电码之间的双向映射","slug":"_2-2-英文和摩斯电码之间的双向映射","link":"#_2-2-英文和摩斯电码之间的双向映射","children":[]}]},{"level":2,"title":"3. 将英文翻译成摩斯电码","slug":"_3-将英文翻译成摩斯电码","link":"#_3-将英文翻译成摩斯电码","children":[{"level":3,"title":"3.1. 通用算法","slug":"_3-1-通用算法","link":"#_3-1-通用算法","children":[]},{"level":3,"title":"3.2. 边缘情况","slug":"_3-2-边缘情况","link":"#_3-2-边缘情况","children":[]}]},{"level":2,"title":"4. 将摩斯电码翻译成英文","slug":"_4-将摩斯电码翻译成英文","link":"#_4-将摩斯电码翻译成英文","children":[{"level":3,"title":"4.1. 通用算法","slug":"_4-1-通用算法","link":"#_4-1-通用算法","children":[]},{"level":3,"title":"4.2. 边缘情况","slug":"_4-2-边缘情况","link":"#_4-2-边缘情况","children":[]}]}],"git":{"createdTime":1719185329000,"updatedTime":1719185329000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.43,"words":1629},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Simple Morse Code Translation in Java.md","localizedDate":"2024年6月24日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>摩斯电码使用点和划的序列来表示字母、数字和标点符号。Samuel Morse 和 Alfred Vail 在 19 世纪 30 年代初为电报使用而开发了它。</p>\\n<p>在本教程中，我们将编写一个方法，将英文翻译成摩斯电码。然后，我们将编写一个相反的方法。</p>\\n<h2>2. 编写摩斯电码</h2>\\n<p>让我们了解摩斯电码及其字母表。</p>\\n<h3>2.1. 什么是摩斯电码？</h3>\\n<p><strong>在摩斯电码中，每个字母由独特的短信号（点）和长信号（划）组合表示</strong>，允许通过一系列开关信号进行通信。根据常见用法，我们将用“ <em>.</em>”表示点，用“ <em>–</em>”表示划。这两个字符足以写出整个摩斯字母表。</p>","autoDesc":true}');export{k as comp,d as data};
