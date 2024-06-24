import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CLcIWzo_.js";const p={},e=t(`<h1 id="在java中计算一个数的二进制补码" tabindex="-1"><a class="header-anchor" href="#在java中计算一个数的二进制补码"><span>在Java中计算一个数的二进制补码</span></a></h1><ol><li>引言</li></ol><p>二进制补码是计算机科学中的一个基本概念，特别是在处理有符号二进制数时。它允许在固定数量的位内表示正整数和负整数。</p><p>在本教程中，我们将学习如何在Java中计算一个数的二进制补码。</p><ol start="2"><li>什么是二进制补码？</li></ol><p>在计算机系统中，值是通过一系列由0和1组成的二进制数字来表示的。存在不同的方式在二进制表示中编码这些值，例如符号-数值表示法、1的补码、2的补码等。</p><p><strong>二进制补码表示法是一种非常高效的方式来存储和操作有符号数</strong>。在这里，最高有效位（MSB）表示数字的符号，0表示正数，1表示负数。这种表示简化了二进制数的加法和减法操作。</p><ol start="3"><li>算法</li></ol><p>让我们看看计算一个数的二进制补码的算法。<strong>对于正数，其二进制补码值与其二进制表示相同</strong>。然而，对于负数，我们可以使用以下算法来确定其二进制补码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>if number &gt;= 0
  convert to binary and return
else
  take the absolute value and convert to binary
  calculate 1&#39;s complement by flipping 1s and 0s
  Add 1 to the 1&#39;s complement and return the value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个算法计算给定数字的二进制补码值。</p><ol start="4"><li>实现</li></ol><p>我们可以在Java中实现上述算法。</p><h3 id="_4-1-算法实现" tabindex="-1"><a class="header-anchor" href="#_4-1-算法实现"><span>4.1. 算法实现</span></a></h3><p>我们将根据算法定义的步骤逐步实现逻辑。我们从用户那里获取表示所需的位数和数字本身。此外，我们使用_BigInteger_来表示输入数字以支持更大的数字。</p><p>首先，我们检查数字是否为负。如果它是非负的，我们可以将其转换为二进制格式并返回结果。否则，我们继续通过调用相应的方法计算二进制补码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">decimalToTwosComplementBinary</span><span class="token punctuation">(</span><span class="token class-name">BigInteger</span> num<span class="token punctuation">,</span> <span class="token keyword">int</span> numBits<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">canRepresentInNBits</span><span class="token punctuation">(</span>num<span class="token punctuation">,</span> numBits<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span>numBits <span class="token operator">+</span> <span class="token string">&quot; bits is not enough to represent the number &quot;</span> <span class="token operator">+</span> num<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">var</span> isNegative <span class="token operator">=</span> num<span class="token punctuation">.</span><span class="token function">signum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> absNum <span class="token operator">=</span> num<span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// Convert the abs value of the number to its binary representation</span>
    <span class="token class-name">String</span> binary <span class="token operator">=</span> absNum<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// Pad the binary representation with zeros to make it numBits long</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>binary<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> \`<span class="token operator">&lt;</span> numBits<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        binary <span class="token operator">=</span> <span class="token string">&quot;0&quot;</span> <span class="token operator">+</span> binary<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// If the input number is negative, calculate two&#39;s complement</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isNegative<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        binary <span class="token operator">=</span> <span class="token function">performTwosComplement</span><span class="token punctuation">(</span>binary<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">formatInNibbles</span><span class="token punctuation">(</span>binary<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们可以使用_toString()_方法，基数值为2，将_BigInteger_转换为其二进制表示</strong>。在转换之前，我们取输入的绝对值，因为对于正数和负数，二进制补码的逻辑是不同的。此外，我们向二进制值的左侧添加额外的零，以确保其与指定的位数对齐。此外，我们验证数字是否可以在给定的位数内表示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">canRepresentInNBits</span><span class="token punctuation">(</span><span class="token class-name">BigInteger</span> number<span class="token punctuation">,</span> <span class="token keyword">int</span> numBits<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">BigInteger</span> minValue <span class="token operator">=</span> <span class="token class-name">BigInteger</span><span class="token punctuation">.</span><span class="token constant">ONE</span><span class="token punctuation">.</span><span class="token function">shiftLeft</span><span class="token punctuation">(</span>numBits <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">negate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// -2^(numBits-1)</span>
    <span class="token class-name">BigInteger</span> maxValue <span class="token operator">=</span> <span class="token class-name">BigInteger</span><span class="token punctuation">.</span><span class="token constant">ONE</span><span class="token punctuation">.</span><span class="token function">shiftLeft</span><span class="token punctuation">(</span>numBits <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">subtract</span><span class="token punctuation">(</span><span class="token class-name">BigInteger</span><span class="token punctuation">.</span><span class="token constant">ONE</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2^(numBits-1) - 1</span>
    <span class="token keyword">return</span> number<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>minValue<span class="token punctuation">)</span> <span class="token operator">&gt;</span>\`<span class="token operator">=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> number<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>maxValue<span class="token punctuation">)</span> \`<span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们看看_performTwosComplement()_方法的实现，它计算负数的二进制补码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">performTwosComplement</span><span class="token punctuation">(</span><span class="token class-name">String</span> binary<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringBuilder</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">boolean</span> carry <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token comment">// Perform one&#39;s complement</span>
    <span class="token class-name">StringBuilder</span> onesComplement <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> binary<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;</span>\`<span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">char</span> bit <span class="token operator">=</span> binary<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        onesComplement<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> bit <span class="token operator">==</span> <span class="token char">&#39;0&#39;</span> <span class="token operator">?</span> <span class="token char">&#39;1&#39;</span> <span class="token operator">:</span> <span class="token char">&#39;0&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// Addition by 1</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> onesComplement<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">char</span> bit <span class="token operator">=</span> onesComplement<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>bit <span class="token operator">==</span> <span class="token char">&#39;1&#39;</span> <span class="token operator">&amp;&amp;</span> carry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            result<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token char">&#39;0&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>bit <span class="token operator">==</span> <span class="token char">&#39;0&#39;</span> <span class="token operator">&amp;&amp;</span> carry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            result<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token char">&#39;1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            carry <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            result<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> bit<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>carry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token char">&#39;1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> result<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个方法中，我们首先通过将1翻转为0，反之亦然，计算给定二进制数的1的补码。随后，我们通过给1的补码结果加一，得到给定二进制字符串的二进制补码值。</p><p>为了更好的可读性，我们可以实现一个方法，将二进制字符串格式化为每组4位（半字节）：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">formatInNibbles</span><span class="token punctuation">(</span><span class="token class-name">String</span> binary<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringBuilder</span> formattedBin <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;=</span> binary<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">%</span> <span class="token number">4</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> i <span class="token operator">!=</span> binary<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            formattedBin<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>binary<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            formattedBin<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>binary<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> formattedBin<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，计算二进制补码的算法已经完全实现。</p><h3 id="_4-2-替代实现" tabindex="-1"><a class="header-anchor" href="#_4-2-替代实现"><span>4.2. 替代实现</span></a></h3><p>另外，基于二进制加法的性质，我们可以更简单地计算二进制补码。在这种方法中，我们从二进制字符串的最右侧开始迭代。<strong>一旦检测到第一个1，我们就反转这个位左侧的所有位</strong>。让我们继续实现这种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">performTwosComplementUsingShortCut</span><span class="token punctuation">(</span><span class="token class-name">String</span> binary<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> firstOneIndexFromRight <span class="token operator">=</span> binary<span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span><span class="token char">&#39;1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>firstOneIndexFromRight <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> binary<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">String</span> rightPart <span class="token operator">=</span> binary<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>firstOneIndexFromRight<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> leftPart <span class="token operator">=</span> binary<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> firstOneIndexFromRight<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> leftWithOnes <span class="token operator">=</span> leftPart<span class="token punctuation">.</span><span class="token function">chars</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mapToObj</span><span class="token punctuation">(</span>c <span class="token operator">-&gt;</span>\` c <span class="token operator">==</span> <span class="token char">&#39;0&#39;</span> <span class="token operator">?</span> <span class="token char">&#39;1&#39;</span> <span class="token operator">:</span> <span class="token char">&#39;0&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token operator">::</span><span class="token function">valueOf</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">joining</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> leftWithOnes <span class="token operator">+</span> rightPart<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法提供了一种更简单的计算给定数字的二进制补码的方法。</p><ol start="5"><li>测试实现</li></ol><p>现在实现已经准备好了，让我们编写单元测试来检查它们的准确性。我们可以使用JUnit的参数化测试来在一个测试中覆盖多个案例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Twos Complement of {0} with number of bits {1}&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@CsvSource</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token string">&quot;0, 4, 0000&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;1, 4, 0001&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;-1, 4, 1111&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;7, 4, 0111&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;-7, 4, 1001&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;12345, 16, 0011 0000 0011 1001&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;-12345, 16, 1100 1111 1100 0111&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenNumberAndBits_getTwosComplement</span><span class="token punctuation">(</span><span class="token class-name">String</span> number<span class="token punctuation">,</span> <span class="token keyword">int</span> noOfBits<span class="token punctuation">,</span> <span class="token class-name">String</span> expected<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> twosComplement <span class="token operator">=</span> <span class="token class-name">TwosComplement</span><span class="token punctuation">.</span><span class="token function">decimalToTwosComplementBinary</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BigInteger</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">,</span> noOfBits<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> twosComplement<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个单一测试中，我们包含了各种输入数字的案例。</p><p>同样，我们也可以为第二种方法编写测试。</p><ol start="6"><li>结论</li></ol><p>在本文中，我们讨论了给定数字的二进制补码的计算。除了传统算法，我们还介绍了一种更简单的计算替代方法。此外，我们还通过参数化测试覆盖了实现的准确性。</p><p>如常，本文中使用的示例代码可以在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于超过此日期的任何问题，请使用网站上的联系表单。</p><p>OK</p>`,39),o=[e];function c(l,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","Get 2 s Complement of a Number in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Get%202%20s%20Complement%20of%20a%20Number%20in%20Java.html","title":"在Java中计算一个数的二进制补码","lang":"zh-CN","frontmatter":{"date":"2024-06-18T00:00:00.000Z","category":["Java","计算机科学"],"tag":["二进制","补码"],"description":"在Java中计算一个数的二进制补码 引言 二进制补码是计算机科学中的一个基本概念，特别是在处理有符号二进制数时。它允许在固定数量的位内表示正整数和负整数。 在本教程中，我们将学习如何在Java中计算一个数的二进制补码。 什么是二进制补码？ 在计算机系统中，值是通过一系列由0和1组成的二进制数字来表示的。存在不同的方式在二进制表示中编码这些值，例如符号-...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Get%202%20s%20Complement%20of%20a%20Number%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中计算一个数的二进制补码"}],["meta",{"property":"og:description","content":"在Java中计算一个数的二进制补码 引言 二进制补码是计算机科学中的一个基本概念，特别是在处理有符号二进制数时。它允许在固定数量的位内表示正整数和负整数。 在本教程中，我们将学习如何在Java中计算一个数的二进制补码。 什么是二进制补码？ 在计算机系统中，值是通过一系列由0和1组成的二进制数字来表示的。存在不同的方式在二进制表示中编码这些值，例如符号-..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"二进制"}],["meta",{"property":"article:tag","content":"补码"}],["meta",{"property":"article:published_time","content":"2024-06-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中计算一个数的二进制补码\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":3,"title":"4.1. 算法实现","slug":"_4-1-算法实现","link":"#_4-1-算法实现","children":[]},{"level":3,"title":"4.2. 替代实现","slug":"_4-2-替代实现","link":"#_4-2-替代实现","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.9,"words":1470},"filePathRelative":"posts/baeldung/Archive/Get 2 s Complement of a Number in Java.md","localizedDate":"2024年6月18日","excerpt":"\\n<ol>\\n<li>引言</li>\\n</ol>\\n<p>二进制补码是计算机科学中的一个基本概念，特别是在处理有符号二进制数时。它允许在固定数量的位内表示正整数和负整数。</p>\\n<p>在本教程中，我们将学习如何在Java中计算一个数的二进制补码。</p>\\n<ol start=\\"2\\">\\n<li>什么是二进制补码？</li>\\n</ol>\\n<p>在计算机系统中，值是通过一系列由0和1组成的二进制数字来表示的。存在不同的方式在二进制表示中编码这些值，例如符号-数值表示法、1的补码、2的补码等。</p>\\n<p><strong>二进制补码表示法是一种非常高效的方式来存储和操作有符号数</strong>。在这里，最高有效位（MSB）表示数字的符号，0表示正数，1表示负数。这种表示简化了二进制数的加法和减法操作。</p>","autoDesc":true}');export{k as comp,d as data};
