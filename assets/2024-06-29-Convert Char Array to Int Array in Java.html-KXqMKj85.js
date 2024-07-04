import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CM1q4_9A.js";const p={},e=t(`<hr><h1 id="java中将字符数组转换为整数数组" tabindex="-1"><a class="header-anchor" href="#java中将字符数组转换为整数数组"><span>Java中将字符数组转换为整数数组</span></a></h1><p>在这篇简短的教程中，我们将探索在Java中将字符数组转换为整数数组的不同方法。</p><p>首先，我们将使用Java 7中的方法和类。然后，我们将看到如何使用Java 8的Stream API来实现相同的目标。</p><h3 id="_2-1-使用character类的getnumericvalue-方法" tabindex="-1"><a class="header-anchor" href="#_2-1-使用character类的getnumericvalue-方法"><span>2.1 使用Character类的getNumericValue()方法</span></a></h3><p>这个方法提供了一种直接且简洁的方式来返回给定字符的整数值。例如，字符‘6’将返回6。</p><p>让我们看看实际操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> 使用<span class="token class-name">GetNumericValue</span>方法<span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>chars <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> ints <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>chars<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> chars<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ints<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">getNumericValue</span><span class="token punctuation">(</span>chars<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> ints<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，我们遍历了字符数组。然后，我们调用getNumericValue()来获取每个字符的整数值。</p><p><strong>一个重要的警告是，如果指定的字符没有任何整数值，则返回-1代替。</strong></p><p>请记住，我们可以将我们的传统循环以更函数式的方式重写：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">setAll</span><span class="token punctuation">(</span>ints<span class="token punctuation">,</span> i <span class="token operator">-&gt;</span>\` <span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">getNumericValue</span><span class="token punctuation">(</span>chars<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们添加一个测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> 给定字符数组_when使用<span class="token class-name">GetNumericValue</span>方法_应返回整数数组<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> expected <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token char">&#39;2&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;3&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;4&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;5&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token class-name">CharArrayToIntArrayUtils</span><span class="token punctuation">.</span>使用<span class="token class-name">GetNumericValue</span>方法<span class="token punctuation">(</span>chars<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-使用character类的digit-方法" tabindex="-1"><a class="header-anchor" href="#_2-2-使用character类的digit-方法"><span>2.2 使用Character类的digit()方法</span></a></h3><p>通常，digit(char ch, int radix)是另一种我们可以用来解决我们中心问题的方法。这个方法根据指定的基数返回给定字符的数值。</p><p>现在，让我们举例说明如何使用digit()将字符数组转换为整数数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> 使用<span class="token class-name">Digit</span>方法<span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> ints <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>chars<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> chars<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ints<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">digit</span><span class="token punctuation">(</span>chars<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> ints<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简而言之，最常见的基数是10，它表示十进制系统（0-9）。例如，在基数10中，字符‘7’简单地等于7。</strong></p><p>最后，我们将创建另一个测试用例来确认我们的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> 给定字符数组_when使用<span class="token class-name">Digit</span>方法_应返回整数数组<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> expected <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">6</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token char">&#39;1&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;2&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;3&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;6&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token class-name">CharArrayToIntArrayUtils</span><span class="token punctuation">.</span>使用<span class="token class-name">Digit</span>方法<span class="token punctuation">(</span>chars<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-使用stream-api" tabindex="-1"><a class="header-anchor" href="#_3-使用stream-api"><span>3. 使用Stream API</span></a></h3><p>另外，我们可以使用Stream API来处理字符数组到整数数组的转换。让我们在实践中看看：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> 使用<span class="token class-name">StreamApi</span>方法<span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>chars<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">chars</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>c <span class="token operator">-&gt;</span>\` c <span class="token operator">-</span> <span class="token number">48</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，我们从字符数组创建了一个String对象。然后，我们使用chars()和map()方法将每个字符转换为整数值。</p><p><strong>请注意，字符‘0’在ASCII中是48，‘1’是49，依此类推。因此，‘0’ - 48等于0，依此类推。这就是为什么减去48将字符‘0’..’9’转换为值0..9的原因。</strong></p><p>接下来，让我们添加另一个测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> 给定字符数组_when使用<span class="token class-name">StreamApi_</span>应返回整数数组<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> expected <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">6</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token char">&#39;9&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;8&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;7&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;6&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token class-name">CharArrayToIntArrayUtils</span><span class="token punctuation">.</span>使用<span class="token class-name">StreamApi</span>方法<span class="token punctuation">(</span>chars<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-使用integer类的parseint-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用integer类的parseint-方法"><span>4. 使用Integer类的parseInt()方法</span></a></h3><p>parseInt()是另一个在将字符转换为整数时需要考虑的极佳选项。这个方法让我们得到给定字符串的原始整数值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> 使用<span class="token class-name">ParseInt</span>方法<span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> ints <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>chars<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> chars<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ints<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>chars<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> ints<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们需要先将每个字符转换为字符串，然后返回整数值。</p><p>像往常一样，我们将创建一个测试用例来单元测试我们的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> 给定字符数组_when使用<span class="token class-name">ParseInt</span>方法_应返回整数数组<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> expected <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">6</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token char">&#39;9&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;8&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;7&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;6&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token class-name">CharArrayToIntArrayUtils</span><span class="token punctuation">.</span>使用<span class="token class-name">ParseInt</span>方法<span class="token punctuation">(</span>chars<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在这篇简短的文章中，我们详细解释了如何在Java中将字符数组转换为整数数组。</p><p>一如既往，文章中使用的全部代码可以在GitHub上找到。</p>`,37),c=[e];function o(l,i){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","2024-06-29-Convert Char Array to Int Array in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Convert%20Char%20Array%20to%20Int%20Array%20in%20Java.html","title":"Java中将字符数组转换为整数数组","lang":"zh-CN","frontmatter":{"date":"2024-06-29T00:00:00.000Z","category":["Java","Programming"],"tag":["char array","int array","Java 7","Java 8","Stream API"],"head":[["meta",{"name":"keywords","content":"Java, char to int, Character class, Stream API, parseInt"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Convert%20Char%20Array%20to%20Int%20Array%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将字符数组转换为整数数组"}],["meta",{"property":"og:description","content":"Java中将字符数组转换为整数数组 在这篇简短的教程中，我们将探索在Java中将字符数组转换为整数数组的不同方法。 首先，我们将使用Java 7中的方法和类。然后，我们将看到如何使用Java 8的Stream API来实现相同的目标。 2.1 使用Character类的getNumericValue()方法 这个方法提供了一种直接且简洁的方式来返回给定..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T10:32:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"char array"}],["meta",{"property":"article:tag","content":"int array"}],["meta",{"property":"article:tag","content":"Java 7"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"Stream API"}],["meta",{"property":"article:published_time","content":"2024-06-29T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T10:32:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将字符数组转换为整数数组\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-29T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T10:32:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将字符数组转换为整数数组 在这篇简短的教程中，我们将探索在Java中将字符数组转换为整数数组的不同方法。 首先，我们将使用Java 7中的方法和类。然后，我们将看到如何使用Java 8的Stream API来实现相同的目标。 2.1 使用Character类的getNumericValue()方法 这个方法提供了一种直接且简洁的方式来返回给定..."},"headers":[{"level":3,"title":"2.1 使用Character类的getNumericValue()方法","slug":"_2-1-使用character类的getnumericvalue-方法","link":"#_2-1-使用character类的getnumericvalue-方法","children":[]},{"level":3,"title":"2.2 使用Character类的digit()方法","slug":"_2-2-使用character类的digit-方法","link":"#_2-2-使用character类的digit-方法","children":[]},{"level":3,"title":"3. 使用Stream API","slug":"_3-使用stream-api","link":"#_3-使用stream-api","children":[]},{"level":3,"title":"4. 使用Integer类的parseInt()方法","slug":"_4-使用integer类的parseint-方法","link":"#_4-使用integer类的parseint-方法","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719657176000,"updatedTime":1719657176000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.42,"words":1026},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Convert Char Array to Int Array in Java.md","localizedDate":"2024年6月29日","excerpt":"<hr>\\n<h1>Java中将字符数组转换为整数数组</h1>\\n<p>在这篇简短的教程中，我们将探索在Java中将字符数组转换为整数数组的不同方法。</p>\\n<p>首先，我们将使用Java 7中的方法和类。然后，我们将看到如何使用Java 8的Stream API来实现相同的目标。</p>\\n<h3>2.1 使用Character类的getNumericValue()方法</h3>\\n<p>这个方法提供了一种直接且简洁的方式来返回给定字符的整数值。例如，字符‘6’将返回6。</p>\\n<p>让我们看看实际操作：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> 使用<span class=\\"token class-name\\">GetNumericValue</span>方法<span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">char</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> chars<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>chars <span class=\\"token operator\\">==</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> ints <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">[</span>chars<span class=\\"token punctuation\\">.</span>length<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i `<span class=\\"token operator\\">&lt;</span> chars<span class=\\"token punctuation\\">.</span>length<span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        ints<span class=\\"token punctuation\\">[</span>i<span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Character</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getNumericValue</span><span class=\\"token punctuation\\">(</span>chars<span class=\\"token punctuation\\">[</span>i<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token keyword\\">return</span> ints<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
