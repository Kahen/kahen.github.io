import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-WRJux_nM.js";const t={},p=e(`<hr><h1 id="vigenere密码在java中的实现-baeldung" tabindex="-1"><a class="header-anchor" href="#vigenere密码在java中的实现-baeldung"><span>Vigenère密码在Java中的实现 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span><strong>1. 引言</strong></span></a></h2><p>在本文中，我们将研究Vigenère密码。我们将了解密码的工作原理，然后学习如何在Java中实现和逆向实现它。</p><h2 id="_2-vigenere密码是什么" tabindex="-1"><a class="header-anchor" href="#_2-vigenere密码是什么"><span><strong>2. Vigenère密码是什么？</strong></span></a></h2><p><strong>Vigenère密码是经典凯撒密码的一个变种，只是每个字母的位移量不同。</strong></p><p>在凯撒密码中，我们将明文中的每个字母都按照相同的量进行位移。例如，如果我们将每个字母位移三位，那么字符串&quot;BAELDUNG&quot;将变成&quot;EDHOGXQJ&quot;：</p><p>反转这个密码仅仅是将字母按照相同的量向相反方向位移。</p><p><strong>Vigenère密码与此相同，只是我们每个字母的位移量不同。</strong> 这意味着我们需要一种方法来表示密码密钥——每个字母位移的量。这通常由另一个字母字符串表示，每个字母对应其在字母表中的位移量。</p><p>例如，密钥&quot;HELLO&quot;意味着将第一个字母位移八位，第二个字母位移五位，依此类推。使用这个密钥，字符串&quot;BAELDUNG&quot;现在将变成&quot;JFQXSCSS&quot;：</p><h2 id="_3-实现vigenere密码" tabindex="-1"><a class="header-anchor" href="#_3-实现vigenere密码"><span><strong>3. 实现Vigenère密码</strong></span></a></h2><p><strong>现在我们知道了Vigenère密码的工作原理，让我们看看如何在Java中实现它。</strong></p><p>我们将从将是我们密码的方法开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">encode</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">,</span> <span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> c <span class="token operator">:</span> input<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result <span class="token operator">+=</span> c<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按照目前的写法，这个方法并不是很有用。它只是构建了一个与输入字符串相同的输出字符串。</p><p>接下来，我们想要获取我们的密钥中的字符，用于每个输入字符。我们将有一个计数器来记录我们接下来要使用的密钥位置，然后在每次传递时递增它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> keyPosition <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> c <span class="token operator">:</span> input<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span> k <span class="token operator">=</span> key<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>keyPosition <span class="token operator">%</span> key<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    keyPosition<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这看起来有点吓人，让我们一步步来理解它。首先，我们应用密钥位置的模数与密钥的总长度，这简单地意味着当它到达字符串的末尾时会重新开始。然后我们取这个位置的字符，这是我们输入字符串的这个位置的密钥字符。</p><p>最后，我们需要根据密钥字符调整我们的输入字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> characters <span class="token operator">=</span> <span class="token string">&quot;ABCDEFGHIJKLMNOPQRSTUVWXYZ&quot;</span><span class="token punctuation">;</span>
<span class="token comment">// ...</span>
<span class="token keyword">int</span> charIndex <span class="token operator">=</span> characters<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> keyIndex <span class="token operator">=</span> characters<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> newCharIndex <span class="token operator">=</span> <span class="token punctuation">(</span>charIndex <span class="token operator">+</span> keyIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> characters<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
c <span class="token operator">=</span> characters<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>newCharIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们有一个包含所有我们可以支持的字符的字符串。然后我们找到这个字符串中输入字符和密钥字符的索引。然后我们可以简单地将它们相加来得到我们的新字符位置。</p><p>注意，我们也添加了一，因为我们希望密钥中的字母是一索引而不是零索引。也就是说，密钥中的&quot;A&quot;应该作为位移一个字母，而不是位移零个字母。我们还做了另一个模数计算，以确保它再次环绕。</p><p>但这并不完全有效。特别是，这只在输入字符串和密钥中的每个字符都在我们的支持列表中时才有效。为了解决这个问题，我们需要在输入字符受支持时才增加密钥位置，并在输入和密钥字符都受支持时才生成新字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>charIndex <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>keyIndex <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> newCharIndex <span class="token operator">=</span> <span class="token punctuation">(</span>charIndex <span class="token operator">+</span> keyIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> characters<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        c <span class="token operator">=</span> characters<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>newCharIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    keyPosition<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到此为止，我们的密码就完成了并且有效。</p><h3 id="_3-1-实际演示" tabindex="-1"><a class="header-anchor" href="#_3-1-实际演示"><span><strong>3.1. 实际演示</strong></span></a></h3><p><strong>现在我们已经有一个工作的密码实现，让我们看看它在实际中是如何工作的。</strong> 我们将使用密钥&quot;BAELDUNG&quot;对字符串&quot;VIGENERE CIPHER IN JAVA&quot;进行编码。</p><p>我们从0开始__keyPosition__。我们的第一次迭代然后给我们：</p><ul><li><em>c</em> = <em>“V”</em></li><li><em>k</em> = <em>“B”</em></li><li><em>charIndex</em> = 21</li><li><em>keyIndex</em> = 1</li><li><em>newCharIndex</em> = 23</li></ul><p>这给我们的结果是字符_“X”_。</p><p>我们的第二次迭代将是：</p><ul><li><em>keyPosition</em> = 1</li><li><em>c</em> = <em>“I”</em></li><li><em>k</em> = <em>“A”</em></li><li><em>charIndex</em> = 8</li><li><em>keyIndex</em> = 0</li><li><em>newCharIndex</em> = 9</li></ul><p>这给我们的结果是“_ J_”。</p><p>让我们跳到第九个字符：</p><ul><li><em>keyPosition</em> = 9</li><li><em>c</em> = <em>” “</em></li><li><em>k</em> = <em>“B”</em>。</li><li><em>charIndex</em> = -1</li><li><em>keyIndex</em> = 1</li></ul><p>这里有两个有趣的事情。首先，我们注意到我们的密钥位置已经超过了密钥的长度，所以我们再次从开头开始环绕。其次，我们的输入字符不是受支持的，所以我们将跳过这个字符的编码。</p><p>如果我们继续到最后，我们将得到_“XJLQRZFL EJUTIM WU LBAM”_。</p><h2 id="_4-解码vigenere密码" tabindex="-1"><a class="header-anchor" href="#_4-解码vigenere密码"><span><strong>4. 解码Vigenère密码</strong></span></a></h2><p><strong>现在我们可以用Vigenère密码编码东西了，我们需要能够解码它们。</strong></p><p>也许并不令人惊讶，解码算法的绝大部分与编码相同。毕竟，我们只是根据正确的密钥位置通过一个量来移动字符。</p><p><strong>不同的是我们需要移动的方向。</strong> 我们的__newCharIndex__需要使用减法而不是加法来计算。然而，我们还需要手动进行模数计算，因为在这个方向上它不能正确工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> newCharIndex <span class="token operator">=</span> charIndex <span class="token operator">-</span> keyIndex <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>newCharIndex <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    newCharIndex <span class="token operator">=</span> characters<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> newCharIndex<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这个算法版本，我们现在可以成功地逆转密码。例如，让我们尝试使用密钥&quot;BAELDUNG&quot;解码我们之前的字符串_“XJLQRZFL EJUTIM WU LBAM”_。</p><p>和以前一样，我们的密钥位置从0开始。我们的第一个输入字符是_“X”<em>——这是字符索引23，我们的第一个密钥字符是</em>“B”_——这是字符索引1。</p><p>我们的新字符索引然后是23 - 1 - 1，这是21。这在转换回来后是一个_“V”_。</p><p>如果我们继续整个字符串，我们将得到结果_“VIGENERE CIPHER IN JAVA”_。</p><h2 id="_5-vigenere密码调整" tabindex="-1"><a class="header-anchor" href="#_5-vigenere密码调整"><span><strong>5. Vigenère密码调整</strong></span></a></h2><p><strong>现在我们已经看到了如何在Java中实现Vigenère密码，让我们看看我们可以做一些调整。</strong> 我们实际上不会在这里实现它们——这留给读者作为练习。</p><p><strong>对密码所做的任何更改都需要在编码和解码的两侧同等地进行，否则，编码的消息将无法读取。</strong> 这也意味着任何不知道我们所做的更改的攻击者将更难攻击任何编码的消息。</p><p>可以做出的第一个和最明显的更改是对我们使用的字符集。我们可以<strong>添加更多支持的字符</strong>——那些有重音、空格等。这将允许在输入字符串中使用更广泛的字符集，并且它将调整所有字符在输出字符串中的表示方式。例如，如果我们简单地将空格作为允许的字符添加，那么使用密钥&quot;BAELDUNG&quot;对_“VIGENERE CIPHER IN JAVA”<em>进行编码的结果就是</em>“XJLQRZELBDNALZEGKOEVEPO”<em>而不是</em>“XJLQRZFL EJUTIM WU LBAM”_。</p><p>我们也可以<strong>改变我们映射字符串中字符的顺序</strong>。如果它们不是严格的字母顺序，一切仍然可以工作，但结果将会不同。例如，如果我们将我们的角色字符串改为_“JQFVHPWORZSLNMKYCGBUXIEDTA”<em>，那么使用密钥</em>“HELLO”<em>对字符串</em>“BAELDUNG”<em>进行编码现在产生</em>“DERDPTZV”<em>而不是</em>“JFQXSCSS”_。</p><p>我们可以做出许多其他的改变，但这些将使我们进一步远离真正的Vigenère密码。例如，我们可以交换编码和解码算法——通过在字母表中向后移动进行编码，通过向前移动进行解码。这通常被称为变体Beaufort。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span><strong>6. 结论</strong></span></a></h2><p><strong>在这里，我们看到了Vigenère密码的介绍以及它的工作原理。我们还看到了我们如何在Java中自己实现这个来编码和解码消息。</strong> 最后，我们看到了我们可以对算法进行的一些调整以提高其安全性。为什么不尝试自己实现一些呢？</p><p>像往常一样，本文的全部代码可以在GitHub上找到。</p>`,55),o=[p];function i(c,r){return s(),a("div",null,o)}const d=n(t,[["render",i],["__file","2024-06-20-Vigen re Cipher in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Vigen%20re%20Cipher%20in%20Java.html","title":"Vigenère密码在Java中的实现 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java","密码学"],"tag":["Vigenère密码","加密","解密"],"head":[["meta",{"name":"keywords","content":"Java, Vigenère密码, 加密, 解密, 密码学"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Vigen%20re%20Cipher%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Vigenère密码在Java中的实现 | Baeldung"}],["meta",{"property":"og:description","content":"Vigenère密码在Java中的实现 | Baeldung 1. 引言 在本文中，我们将研究Vigenère密码。我们将了解密码的工作原理，然后学习如何在Java中实现和逆向实现它。 2. Vigenère密码是什么？ Vigenère密码是经典凯撒密码的一个变种，只是每个字母的位移量不同。 在凯撒密码中，我们将明文中的每个字母都按照相同的量进行位移..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Vigenère密码"}],["meta",{"property":"article:tag","content":"加密"}],["meta",{"property":"article:tag","content":"解密"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Vigenère密码在Java中的实现 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Vigenère密码在Java中的实现 | Baeldung 1. 引言 在本文中，我们将研究Vigenère密码。我们将了解密码的工作原理，然后学习如何在Java中实现和逆向实现它。 2. Vigenère密码是什么？ Vigenère密码是经典凯撒密码的一个变种，只是每个字母的位移量不同。 在凯撒密码中，我们将明文中的每个字母都按照相同的量进行位移..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. Vigenère密码是什么？","slug":"_2-vigenere密码是什么","link":"#_2-vigenere密码是什么","children":[]},{"level":2,"title":"3. 实现Vigenère密码","slug":"_3-实现vigenere密码","link":"#_3-实现vigenere密码","children":[{"level":3,"title":"3.1. 实际演示","slug":"_3-1-实际演示","link":"#_3-1-实际演示","children":[]}]},{"level":2,"title":"4. 解码Vigenère密码","slug":"_4-解码vigenere密码","link":"#_4-解码vigenere密码","children":[]},{"level":2,"title":"5. Vigenère密码调整","slug":"_5-vigenere密码调整","link":"#_5-vigenere密码调整","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.88,"words":2063},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Vigen re Cipher in Java.md","localizedDate":"2024年6月21日","excerpt":"<hr>\\n<h1>Vigenère密码在Java中的实现 | Baeldung</h1>\\n<h2><strong>1. 引言</strong></h2>\\n<p>在本文中，我们将研究Vigenère密码。我们将了解密码的工作原理，然后学习如何在Java中实现和逆向实现它。</p>\\n<h2><strong>2. Vigenère密码是什么？</strong></h2>\\n<p><strong>Vigenère密码是经典凯撒密码的一个变种，只是每个字母的位移量不同。</strong></p>\\n<p>在凯撒密码中，我们将明文中的每个字母都按照相同的量进行位移。例如，如果我们将每个字母位移三位，那么字符串\\"BAELDUNG\\"将变成\\"EDHOGXQJ\\"：</p>","autoDesc":true}');export{d as comp,k as data};
