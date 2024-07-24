import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as p}from"./app-BkL9UgS7.js";const e={},t=p(`<h1 id="从整数值获取特定位置的位" tabindex="-1"><a class="header-anchor" href="#从整数值获取特定位置的位"><span>从整数值获取特定位置的位</span></a></h1><p>有时我们需要测试一个数字中的二进制位是否被设置。这可能是因为我们使用数字作为一组标志，其中每个数字代表一个特定的布尔值。</p><p>在本教程中，我们将探讨从整数值（如字节、短整型、字符、整型和长整型）获取特定位置的位的不同方法。</p><h2 id="_2-测试特定位" tabindex="-1"><a class="header-anchor" href="#_2-测试特定位"><span>2. 测试特定位</span></a></h2><p>最常见的情况之一是我们想要使用掩码测试整数值的特定位。 例如，让我们检查字节值中的第三位是否被设置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span> val1 <span class="token operator">=</span> <span class="token number">0b0110_0100</span><span class="token punctuation">;</span>
<span class="token keyword">byte</span> mask <span class="token operator">=</span> <span class="token number">0b0000_0100</span><span class="token punctuation">;</span>
<span class="token keyword">boolean</span> isSet1 <span class="token operator">=</span> <span class="token punctuation">(</span>val1 <span class="token operator">&amp;</span> mask<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>isSet1<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里二进制数01100100被测试以查看第三位——00000100是否被设置，通过使用按位与操作。结果大于零，所以是的。我们也可以测试它是否没有被设置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span> val2 <span class="token operator">=</span> <span class="token number">0b0110_0010</span><span class="token punctuation">;</span>
<span class="token keyword">boolean</span> isSet2 <span class="token operator">=</span> <span class="token punctuation">(</span>val2 <span class="token operator">&amp;</span> mask<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span>isSet2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个例子基于字节数值类型，我们可以很容易地将其扩展到短整型、字符、整型和长整型值。</p><p>在这个解决方案中，我们硬编码了掩码。如果我们想要将解决方案泛化以检查我们数字中的任何位怎么办？</p><h2 id="_3-使用位移操作符" tabindex="-1"><a class="header-anchor" href="#_3-使用位移操作符"><span>3. 使用位移操作符</span></a></h2><p>首先，让我们定义32位整型中位位置的索引范围。最左边的位有索引31，最右边的位有索引0。这是因为我们的数字从最高位到最低位运行。例如，如果我们使用64位长整型数字，最左边的位将是63。</p><h3 id="_3-1-左移掩码" tabindex="-1"><a class="header-anchor" href="#_3-1-左移掩码"><span>3.1. 左移掩码</span></a></h3><p>我们可以通过将值1移动到正确的位置来使用左移操作符来生成掩码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> val <span class="token operator">=</span> <span class="token number">0b0110_0100</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> pos <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> mask <span class="token operator">=</span> <span class="token number">1</span> \`<span class="token operator">&lt;&lt;</span> pos<span class="token punctuation">;</span>
<span class="token keyword">boolean</span> isSet <span class="token operator">=</span> <span class="token punctuation">(</span>val <span class="token operator">&amp;</span> mask<span class="token punctuation">)</span> <span class="token operator">&gt;</span>\` <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token function">assertTrue</span><span class="token punctuation">(</span>isSet<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里我们将_pos_设置为2，尽管它可以是我们数字中的任何有效位位置。然后，我们使用左移操作符(\`&lt;&lt;)来生成我们的掩码。最后，我们对_val_和_mask_进行按位与(&amp;)操作。</p><p>如果结果大于零，这意味着目标位被设置。</p><h3 id="_3-2-左移值" tabindex="-1"><a class="header-anchor" href="#_3-2-左移值"><span>3.2. 左移值</span></a></h3><p>除了构建掩码之外，我们还可以使用我们正在测试的值上的左移操作符。而不是用掩码过滤值，我们可以将内容左移，以便感兴趣的位处于最左边的位置。</p><p>然后我们所要做的就是检查最左边的位是否被设置。由于有符号整数以二进制补码形式表示，我们可以通过检查结果位左移数是否为负来测试前导数字是否为一。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> val <span class="token operator">=</span> <span class="token number">0b0110_0100</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> pos <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">boolean</span> isSet <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>val <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span><span class="token number">31</span> <span class="token operator">-</span> pos<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertTrue</span><span class="token punctuation">(</span>isSet<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面，<em>pos_是2，最左边的位置是31，所以我们使用31减去_pos</em>，等于29。然后，我们将原始值左移29位并得到一个新的值。在这个新值中，感兴趣的位在最左边的位置。最后，我们检查新值是否小于零。</p><h3 id="_3-3-右移值" tabindex="-1"><a class="header-anchor" href="#_3-3-右移值"><span>3.3. 右移值</span></a></h3><p>类似地，我们可以使用右移操作符来测试整数值的位。将目标位移动到整数值的最右边位置，并使用掩码1，我们可以检查结果是否等于一：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> val <span class="token operator">=</span> <span class="token number">0b0110_0100</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> pos <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">boolean</span> isSet <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>val <span class="token operator">&gt;</span>\`<span class="token operator">&gt;</span> pos<span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token function">assertTrue</span><span class="token punctuation">(</span>isSet<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-优化位运算解决方案" tabindex="-1"><a class="header-anchor" href="#_4-优化位运算解决方案"><span>4. 优化位运算解决方案</span></a></h2><p>在我们可能要执行这些计算很多的情况下，我们可能希望优化我们的解决方案，以使用最少的CPU指令。</p><p>让我们看看左移解决方案的重写，这可能有助于我们实现这一点。它基于按位操作通常比算术操作更快的假设：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> isSet <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>val <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span><span class="token operator">~</span>pos <span class="token operator">&amp;</span> <span class="token number">31</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们应该注意到核心思想没有改变。只是代码的写法微妙地不同：我们使用(~pos &amp; 31)来代替之前的(31-pos)表达式。</p><p>为什么这两个表达式有相同的效果？我们可以推断这个过程：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">(</span><span class="token number">31</span> <span class="token operator">-</span> pos<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">31</span> <span class="token operator">-</span> pos<span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">31</span>
            <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">31</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token operator">-</span>pos<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">31</span>
            <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">31</span> <span class="token operator">&amp;</span> <span class="token number">31</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">-</span>pos<span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">31</span><span class="token punctuation">)</span>
            <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">31</span> <span class="token operator">&amp;</span> <span class="token number">31</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">~</span>pos <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">31</span><span class="token punctuation">)</span>
            <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">31</span> <span class="token operator">&amp;</span> <span class="token number">31</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token operator">~</span>pos <span class="token operator">&amp;</span> <span class="token number">31</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&amp;</span> <span class="token number">31</span><span class="token punctuation">)</span>
            <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">31</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">31</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token operator">~</span>pos <span class="token operator">&amp;</span> <span class="token number">31</span><span class="token punctuation">)</span>
            <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">32</span> <span class="token operator">&amp;</span> <span class="token number">31</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token operator">~</span>pos <span class="token operator">&amp;</span> <span class="token number">31</span><span class="token punctuation">)</span>
            <span class="token operator">=</span> <span class="token number">0</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token operator">~</span>pos <span class="token operator">&amp;</span> <span class="token number">31</span><span class="token punctuation">)</span>
            <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">~</span>pos <span class="token operator">&amp;</span> <span class="token number">31</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这一部分的开始，我们提到最左边的位置是31，最右边的位置是0，所以(31 – pos)应该是一个正数或零。如果我们对(31 – pos)和31进行按位与(&amp;)操作，结果保持不变。然后，我们一步一步地做。最后，我们得到了(~pos &amp; 31)表达式。</p><p>在这个过程中，还有一件事需要解释：(-pos)是如何转换为(~pos + 1)的？要获得一个整数的二进制补码表示，我们可以进行按位补码(~)操作，然后将结果加一。</p><p>更进一步，我们可以稍微简化代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> isSet <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>val <span class="token operator">&lt;&lt;</span> <span class="token operator">~</span>pos<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面，我们省略了按位与(&amp;)和31。那是因为JVM会为我们做这项工作。一个整型值有32位，JVM确保其有效的位移范围应该在0到31之间。同样，长整型值有64位，JVM也确保其有效的位移范围应该在0到63之间。</p><h2 id="_5-使用biginteger" tabindex="-1"><a class="header-anchor" href="#_5-使用biginteger"><span>5. 使用BigInteger</span></a></h2><p>虽然上述二进制数学对于内置数值类型来说计算效率最高，但我们可能需要检查超过64位的数字上的位，或者可能希望拥有更易读的代码。</p><p>BigInteger类可以解决这两个问题。它支持非常大的数字和大量的位，并提供了testBit方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> val <span class="token operator">=</span> <span class="token number">0b0110_0100</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> pos <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">boolean</span> isSet <span class="token operator">=</span> <span class="token class-name">BigInteger</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">testBit</span><span class="token punctuation">(</span>pos<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertTrue</span><span class="token punctuation">(</span>isSet<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本教程中，我们查看了一些从整数值获取特定位置的位的常用方法。</p><p>像往常一样，本教程的源代码可以在GitHub上找到。</p>`,44),o=[t];function l(c,i){return s(),n("div",null,o)}const k=a(e,[["render",l],["__file","2024-07-23-Getting a Bit at a Certain Position from Integral Values.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-23/2024-07-23-Getting%20a%20Bit%20at%20a%20Certain%20Position%20from%20Integral%20Values.html","title":"从整数值获取特定位置的位","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Bit Manipulation"],"tag":["Java","Bitwise Operations","Bit Manipulation"],"head":[["meta",{"name":"keywords","content":"Java, Bitwise, Bit Manipulation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-23/2024-07-23-Getting%20a%20Bit%20at%20a%20Certain%20Position%20from%20Integral%20Values.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从整数值获取特定位置的位"}],["meta",{"property":"og:description","content":"从整数值获取特定位置的位 有时我们需要测试一个数字中的二进制位是否被设置。这可能是因为我们使用数字作为一组标志，其中每个数字代表一个特定的布尔值。 在本教程中，我们将探讨从整数值（如字节、短整型、字符、整型和长整型）获取特定位置的位的不同方法。 2. 测试特定位 最常见的情况之一是我们想要使用掩码测试整数值的特定位。 例如，让我们检查字节值中的第三位是..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T15:48:35.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Bitwise Operations"}],["meta",{"property":"article:tag","content":"Bit Manipulation"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T15:48:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从整数值获取特定位置的位\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-23T15:48:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从整数值获取特定位置的位 有时我们需要测试一个数字中的二进制位是否被设置。这可能是因为我们使用数字作为一组标志，其中每个数字代表一个特定的布尔值。 在本教程中，我们将探讨从整数值（如字节、短整型、字符、整型和长整型）获取特定位置的位的不同方法。 2. 测试特定位 最常见的情况之一是我们想要使用掩码测试整数值的特定位。 例如，让我们检查字节值中的第三位是..."},"headers":[{"level":2,"title":"2. 测试特定位","slug":"_2-测试特定位","link":"#_2-测试特定位","children":[]},{"level":2,"title":"3. 使用位移操作符","slug":"_3-使用位移操作符","link":"#_3-使用位移操作符","children":[{"level":3,"title":"3.1. 左移掩码","slug":"_3-1-左移掩码","link":"#_3-1-左移掩码","children":[]},{"level":3,"title":"3.2. 左移值","slug":"_3-2-左移值","link":"#_3-2-左移值","children":[]},{"level":3,"title":"3.3. 右移值","slug":"_3-3-右移值","link":"#_3-3-右移值","children":[]}]},{"level":2,"title":"4. 优化位运算解决方案","slug":"_4-优化位运算解决方案","link":"#_4-优化位运算解决方案","children":[]},{"level":2,"title":"5. 使用BigInteger","slug":"_5-使用biginteger","link":"#_5-使用biginteger","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721749715000,"updatedTime":1721749715000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.97,"words":1491},"filePathRelative":"posts/baeldung/2024-07-23/2024-07-23-Getting a Bit at a Certain Position from Integral Values.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>有时我们需要测试一个数字中的二进制位是否被设置。这可能是因为我们使用数字作为一组标志，其中每个数字代表一个特定的布尔值。</p>\\n<p>在本教程中，我们将探讨从整数值（如字节、短整型、字符、整型和长整型）获取特定位置的位的不同方法。</p>\\n<h2>2. 测试特定位</h2>\\n<p>最常见的情况之一是我们想要使用掩码测试整数值的特定位。\\n例如，让我们检查字节值中的第三位是否被设置：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">byte</span> val1 <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0b0110_0100</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">byte</span> mask <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0b0000_0100</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">boolean</span> isSet1 <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span>val1 <span class=\\"token operator\\">&amp;</span> mask<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">&gt;</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token function\\">assertTrue</span><span class=\\"token punctuation\\">(</span>isSet1<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
