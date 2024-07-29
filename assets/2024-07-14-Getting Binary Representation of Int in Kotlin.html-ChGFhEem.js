import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BUAgDejY.js";const e={},p=t(`<hr><h1 id="在kotlin中获取int的二进制表示" tabindex="-1"><a class="header-anchor" href="#在kotlin中获取int的二进制表示"><span>在Kotlin中获取Int的二进制表示</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><em>Int</em> 是我们日常工作中常用的数据类型。有时，我们可能需要获取整数的二进制表示。</p><p>在本教程中，我们将探索Kotlin中可用的方法来完成这项任务，并更深入地理解整数的二进制表示。</p><h2 id="_2-使用java的-integer-tobinarystring-方法" tabindex="-1"><a class="header-anchor" href="#_2-使用java的-integer-tobinarystring-方法"><span>2. 使用Java的_Integer.toBinaryString()_方法</span></a></h2><p>当我们在JVM上运行Kotlin程序时，<strong>Java标准库提供的所有功能也适用于Kotlin</strong>。因此，我们也可以使用Java的方法来获取整数的二进制表示。</p><p><strong>一种方便的方法是使用_Integer.toBinaryString()_方法</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;10110&quot;</span></span><span class="token punctuation">,</span> Integer<span class="token punctuation">.</span><span class="token function">toBinaryString</span><span class="token punctuation">(</span><span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;101010&quot;</span></span><span class="token punctuation">,</span> Integer<span class="token punctuation">.</span><span class="token function">toBinaryString</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，我们通过将数字传递给方法来获取22和42的二进制表示。这非常简单。</p><p>有时，我们需要处理负整数。由于我们稍后将重新讨论负二进制数的表示，让我们现在快速了解如何表示负二进制数。</p><p><strong>使用二进制补码是表示负二进制数最常用的技术</strong>。</p><p>我们可以按照以下三个步骤将负十进制数转换为其二进制表示形式：</p><ul><li>用二进制表示数字的绝对值。</li><li>如果原始数字是负数，翻转所有位（将0变为1，反之亦然）。</li><li>将结果加1。</li></ul><p>让我们以-2为例，演示如何获取其二进制表示：</p><ul><li>-2的绝对值是2。在Java中，整数是32位的。因此，2的二进制表示是_00000000000000000000000000000010_。</li><li>翻转所有位：<em>11111111111111111111111111111101</em></li><li>将上述二进制数加1：<em>11111111111111111111111111111110</em></li></ul><p>如果我们将-2传递给_Integer.toBinaryString()_方法，我们将得到预期的结果：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;11111111111111111111111111111110&quot;</span></span><span class="token punctuation">,</span> Integer<span class="token punctuation">.</span><span class="token function">toBinaryString</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，_Integer.toBinaryString()_方法也适用于负整数。</p><h2 id="_3-使用-int-tostring-radix-或-uint-tostring-radix-扩展函数" tabindex="-1"><a class="header-anchor" href="#_3-使用-int-tostring-radix-或-uint-tostring-radix-扩展函数"><span>3. 使用_Int._ _toString(radix)_或_UInt.toString(radix)_扩展函数</span></a></h2><p>除了使用Java的_Integer.toBinaryString()_方法来解决问题，<strong>在Kotlin中，我们可以使用_Int.toString(radix = 2)_来获取整数的二进制表示</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;10110&quot;</span></span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>radix <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;101010&quot;</span></span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 我们可以省略参数名称&quot;radix&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，值得注意的是<strong>如果我们将负整数传递给这个函数，它不会正确地表示负整数的二进制</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;-10&quot;</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如上述测试所示，当整数为-2时，<em>toString(radix = 2)<em>函数返回</em>-10_而不是预期的_11111111111111111111111111111110</em>。</p><p>这是因为_Int.toString(radix = 2)_是一个扩展函数，内部调用Java的_Integer.toString(int, radix)_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> actual inline fun <span class="token class-name">Int</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>radix<span class="token operator">:</span> <span class="token class-name">Int</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token class-name">String</span> <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>Integer</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token function">checkRadix</span><span class="token punctuation">(</span>radix<span class="token punctuation">)</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><em>Integer.toString(int, radix)<em>方法支持动态基数参数。它不会对_radix=2_的情况应用任何特殊处理。因此，如果输入的整数是负数，这个方法会在结果前加上‘</em>–</em>’字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> radix<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>negative<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        buf<span class="token punctuation">[</span><span class="token operator">--</span>charPos<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token char">&#39;-&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token class-name">StringLatin1</span><span class="token punctuation">.</span><span class="token function">newString</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> charPos<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">33</span> <span class="token operator">-</span> charPos<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决方案是<strong>在调用_Int_的_toString(radix = 2)_扩展之前，先将负整数转换为无符号整数</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;11111111111111111111111111111110&quot;</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种方法有效，因为**_Int.toUInt()_返回一个与输入Int值具有相同二进制表示的_UInt_值**。</p><p>当然，<strong>将正整数转换为_UInts_不会影响结果</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;10110&quot;</span></span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">.</span><span class="token function">toUInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>radix <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;101010&quot;</span></span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">.</span><span class="token function">toUInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-获取32位二进制字符串" tabindex="-1"><a class="header-anchor" href="#_4-获取32位二进制字符串"><span>4. 获取32位二进制字符串</span></a></h2><p>我们已经提到Java中的整数是32位的。因此，有时我们可能想要获取32位的二进制表示。为了实现这一点，<strong>我们可以先获取整数的二进制表示，然后将二进制数字填充为32位二进制格式</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> Int<span class="token punctuation">.</span><span class="token function">to32BitBinaryString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token operator">=</span> <span class="token function">toUInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">padStart</span><span class="token punctuation">(</span>Int<span class="token punctuation">.</span>SIZE_BITS<span class="token punctuation">,</span> <span class="token char">&#39;0&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如上述代码所示，我们将实现包装在扩展函数_to32BitBinaryString()<em>中。这使我们能够直接从整数调用该函数，例如_42.to32BitBinaryString()</em>。</p><p>最后，让我们使用我们的例子测试这个扩展函数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;00000000000000000000000000010110&quot;</span></span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">.</span><span class="token function">to32BitBinaryString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;00000000000000000000000000101010&quot;</span></span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">.</span><span class="token function">to32BitBinaryString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;11111111111111111111111111111110&quot;</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">to32BitBinaryString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了在Kotlin中将整数转换为二进制表示的两种方法：</p><ul><li>Java的_Integer.toBinaryString()_在Kotlin中也是可用的。</li><li>Kotlin的_Int.toString(radix =2)_适用于正整数。<strong>在处理负整数时，我们必须首先将_Int_转换为_UInt_并调用_UInt.toString(radix =2)_以获得正确的结果。</strong></li></ul><p>如往常一样，示例的完整源代码可在GitHub上找到。</p>`,44),o=[p];function i(l,c){return s(),a("div",null,o)}const k=n(e,[["render",i],["__file","2024-07-14-Getting Binary Representation of Int in Kotlin.html.vue"]]),d=JSON.parse(`{"path":"/posts/baeldung/2024-07-14/2024-07-14-Getting%20Binary%20Representation%20of%20Int%20in%20Kotlin.html","title":"在Kotlin中获取Int的二进制表示","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin"],"tag":["Kotlin","Binary Representation"],"head":[["meta",{"name":"keywords","content":"Kotlin, Integer, Binary Representation, Java, two's complement"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-Getting%20Binary%20Representation%20of%20Int%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Kotlin中获取Int的二进制表示"}],["meta",{"property":"og:description","content":"在Kotlin中获取Int的二进制表示 1. 概述 Int 是我们日常工作中常用的数据类型。有时，我们可能需要获取整数的二进制表示。 在本教程中，我们将探索Kotlin中可用的方法来完成这项任务，并更深入地理解整数的二进制表示。 2. 使用Java的_Integer.toBinaryString()_方法 当我们在JVM上运行Kotlin程序时，Jav..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T18:10:55.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Binary Representation"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T18:10:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Kotlin中获取Int的二进制表示\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T18:10:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Kotlin中获取Int的二进制表示 1. 概述 Int 是我们日常工作中常用的数据类型。有时，我们可能需要获取整数的二进制表示。 在本教程中，我们将探索Kotlin中可用的方法来完成这项任务，并更深入地理解整数的二进制表示。 2. 使用Java的_Integer.toBinaryString()_方法 当我们在JVM上运行Kotlin程序时，Jav..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用Java的_Integer.toBinaryString()_方法","slug":"_2-使用java的-integer-tobinarystring-方法","link":"#_2-使用java的-integer-tobinarystring-方法","children":[]},{"level":2,"title":"3. 使用_Int._ _toString(radix)_或_UInt.toString(radix)_扩展函数","slug":"_3-使用-int-tostring-radix-或-uint-tostring-radix-扩展函数","link":"#_3-使用-int-tostring-radix-或-uint-tostring-radix-扩展函数","children":[]},{"level":2,"title":"4. 获取32位二进制字符串","slug":"_4-获取32位二进制字符串","link":"#_4-获取32位二进制字符串","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720980655000,"updatedTime":1720980655000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.72,"words":1115},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-Getting Binary Representation of Int in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"<hr>\\n<h1>在Kotlin中获取Int的二进制表示</h1>\\n<h2>1. 概述</h2>\\n<p><em>Int</em> 是我们日常工作中常用的数据类型。有时，我们可能需要获取整数的二进制表示。</p>\\n<p>在本教程中，我们将探索Kotlin中可用的方法来完成这项任务，并更深入地理解整数的二进制表示。</p>\\n<h2>2. 使用Java的_Integer.toBinaryString()_方法</h2>\\n<p>当我们在JVM上运行Kotlin程序时，<strong>Java标准库提供的所有功能也适用于Kotlin</strong>。因此，我们也可以使用Java的方法来获取整数的二进制表示。</p>","autoDesc":true}`);export{k as comp,d as data};
