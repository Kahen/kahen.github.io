import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DpYLEM_u.js";const e={},p=t(`<hr><h1 id="kotlin中将字符串数组转换为整数数组-baeldung关于kotlin的文章" tabindex="-1"><a class="header-anchor" href="#kotlin中将字符串数组转换为整数数组-baeldung关于kotlin的文章"><span>Kotlin中将字符串数组转换为整数数组 | Baeldung关于Kotlin的文章</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在Kotlin中，我们可能会遇到需要将字符串数组转换为整数数组的各种场景。在本文中，我们将探讨这个问题的不同解决方法。此外，我们还将展示在转换过程中如何处理可能出现的异常。</p><h2 id="_2-使用-toint-函数" tabindex="-1"><a class="header-anchor" href="#_2-使用-toint-函数"><span>2. 使用 <em>toInt()</em> 函数</span></a></h2><p>在最简单的情况下，<strong>直接的方法是遍历每个字符串数组元素并使用 <em>toInt()</em> 函数</strong>。它将每个元素转换为一个 <em>Int</em> 实例。让我们看一个例子：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`when using toInt then it converts array\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> stringArray <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;1&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;2&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;3&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;4&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;5&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> intArray <span class="token operator">=</span> stringArray<span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">toInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">toIntArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>intArray<span class="token punctuation">.</span><span class="token function">all</span> <span class="token punctuation">{</span> it <span class="token keyword">is</span> Int <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>intArray<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<em>map</em> 函数将 <em>stringArray</em> 的每个元素转换为 <em>Int</em>。之后，我们使用 <em>toIntArray()</em> 函数将结果列表转换为数组。</p><h2 id="_3-处理可能的数字格式异常" tabindex="-1"><a class="header-anchor" href="#_3-处理可能的数字格式异常"><span>3. 处理可能的数字格式异常</span></a></h2><p>虽然上述方法简洁，但它不处理由于字符串数组中无效格式而导致的转换失败的情况。让我们通过一个例子来演示：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`when using toInt then exception is thrown\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> stringArray <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;1&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;2&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;3&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;four&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;5&quot;</span></span><span class="token punctuation">)</span>
    assertThrows\`<span class="token operator">&lt;</span>NumberFormatException<span class="token operator">&gt;</span>\` <span class="token punctuation">{</span> stringArray<span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">toInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值 “four” 无法转换为 <em>Int</em> 并抛出 <em>NumberFormatException</em>。为了解决这个问题，我们将实现一种更安全的错误处理方法：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`when using toInt then exception is handled\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> stringArray <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;1&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;2&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;3&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;four&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;5&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> intList <span class="token operator">=</span> mutableListOf<span class="token function">\`&lt;Int&gt;\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>element <span class="token keyword">in</span> stringArray<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">val</span> intValue <span class="token operator">=</span> element<span class="token punctuation">.</span><span class="token function">toInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            intList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>intValue<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> NumberFormatException<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 处理提供值不是数字的情况</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">val</span> intArray <span class="token operator">=</span> intList<span class="token punctuation">.</span><span class="token function">toIntArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>intArray<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<em>try-catch</em> 块处理在转换过程中可能发生的 <em>NumberFormatException</em>。此外，这允许我们识别和处理无法转换为整数的元素。</p><h2 id="_4-利用-tointornull-函数" tabindex="-1"><a class="header-anchor" href="#_4-利用-tointornull-函数"><span>4. 利用 <em>toIntOrNull</em>() 函数</span></a></h2><p>最后，Kotlin提供了 <em>toIntOrNull()</em> 函数。<strong>这是将字符串数组转换为整数数组的最方便的方法</strong>。<strong>它处理可能的异常并返回 <em>Null</em> 而不是抛出异常</strong>。让我们看看它在实际中的应用：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`when using toIntOrNull then it converts array\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> stringArray <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;1&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;2&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;3&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;four&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;5&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> intArray <span class="token operator">=</span> stringArray<span class="token punctuation">.</span><span class="token function">mapNotNull</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">toIntOrNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">toIntArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>intArray<span class="token punctuation">.</span><span class="token function">all</span> <span class="token punctuation">{</span> it <span class="token keyword">is</span> Int <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>intArray<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，函数 <em>toIntOrNull()</em> 将每个元素转换为 <em>Int</em>。此外，如果转换失败，它返回 <em>Null</em>。之后，我们使用 <em>mapNotNull()</em> 方法过滤出无法成功转换的元素。多亏了这个方法，我们只得到整数。此外，我们可以使用 <em>toIntArray()</em> 方法将其转换为 <em>Int</em> 数组。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们展示了如何在Kotlin中将字符串数组转换为整数数组。此外，我们展示了如何处理潜在的异常。虽然 <em>toInt()</em> 函数提供了一个简洁的解决方案，处理异常或使用 <em>toIntOrNull()</em> 确保了更稳健的转换过程。</p><p>如常，示例的源代码可在GitHub上获取。</p>`,21),o=[p];function l(i,c){return a(),s("div",null,o)}const k=n(e,[["render",l],["__file","2024-07-17-Convert String Array to Int Array in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Convert%20String%20Array%20to%20Int%20Array%20in%20Kotlin.html","title":"Kotlin中将字符串数组转换为整数数组 | Baeldung关于Kotlin的文章","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin"],"tag":["String Array","Int Array"],"head":[["meta",{"name":"keywords","content":"Kotlin, String Array, Int Array, Conversion"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Convert%20String%20Array%20to%20Int%20Array%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中将字符串数组转换为整数数组 | Baeldung关于Kotlin的文章"}],["meta",{"property":"og:description","content":"Kotlin中将字符串数组转换为整数数组 | Baeldung关于Kotlin的文章 1. 概述 在Kotlin中，我们可能会遇到需要将字符串数组转换为整数数组的各种场景。在本文中，我们将探讨这个问题的不同解决方法。此外，我们还将展示在转换过程中如何处理可能出现的异常。 2. 使用 toInt() 函数 在最简单的情况下，直接的方法是遍历每个字符串数组..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T16:30:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"String Array"}],["meta",{"property":"article:tag","content":"Int Array"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T16:30:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中将字符串数组转换为整数数组 | Baeldung关于Kotlin的文章\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T16:30:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中将字符串数组转换为整数数组 | Baeldung关于Kotlin的文章 1. 概述 在Kotlin中，我们可能会遇到需要将字符串数组转换为整数数组的各种场景。在本文中，我们将探讨这个问题的不同解决方法。此外，我们还将展示在转换过程中如何处理可能出现的异常。 2. 使用 toInt() 函数 在最简单的情况下，直接的方法是遍历每个字符串数组..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用 toInt() 函数","slug":"_2-使用-toint-函数","link":"#_2-使用-toint-函数","children":[]},{"level":2,"title":"3. 处理可能的数字格式异常","slug":"_3-处理可能的数字格式异常","link":"#_3-处理可能的数字格式异常","children":[]},{"level":2,"title":"4. 利用 toIntOrNull() 函数","slug":"_4-利用-tointornull-函数","link":"#_4-利用-tointornull-函数","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721233842000,"updatedTime":1721233842000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.58,"words":773},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Convert String Array to Int Array in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"<hr>\\n<h1>Kotlin中将字符串数组转换为整数数组 | Baeldung关于Kotlin的文章</h1>\\n<h2>1. 概述</h2>\\n<p>在Kotlin中，我们可能会遇到需要将字符串数组转换为整数数组的各种场景。在本文中，我们将探讨这个问题的不同解决方法。此外，我们还将展示在转换过程中如何处理可能出现的异常。</p>\\n<h2>2. 使用 <em>toInt()</em> 函数</h2>\\n<p>在最简单的情况下，<strong>直接的方法是遍历每个字符串数组元素并使用 <em>toInt()</em> 函数</strong>。它将每个元素转换为一个 <em>Int</em> 实例。让我们看一个例子：</p>","autoDesc":true}');export{k as comp,d as data};
