import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CNQ479je.js";const e={},p=t(`<h1 id="java中将十六进制转换为rgb" tabindex="-1"><a class="header-anchor" href="#java中将十六进制转换为rgb"><span>Java中将十六进制转换为RGB</span></a></h1><p>十六进制（hex）和RGB（红-绿-蓝）是图形和设计中常见的颜色代码。有时，将十六进制转换为其等效的RGB值可能是必要的，因为它在许多数字应用中被广泛使用。</p><p>在本教程中，我们将学习如何在Java中将十六进制颜色代码转换为其等效的RGB值。</p><h2 id="_2-十六进制颜色代码和rgb" tabindex="-1"><a class="header-anchor" href="#_2-十六进制颜色代码和rgb"><span>2. 十六进制颜色代码和RGB</span></a></h2><p>十六进制颜色代码由六个字符串字符组成。<strong>每个字符代表十六进制表示法中的一个值，范围在0到15之间（0-9和A-F）</strong>。</p><p>例如，深藏红花的十六进制颜色代码是_FF9933_。</p><p>RGB是红色、绿色和蓝色的组合。<strong>它每个使用8位，并具有介于0和255之间的整数值</strong>。</p><p>深藏红的RGB值是“<em>255, 153, 51</em>”。</p><p>要将十六进制颜色代码转换为其RGB等效值，<strong>重要的是要知道每对十六进制颜色代码表示红色、绿色和蓝色颜色部分之一</strong>。前两个字符代表红色部分，第二个两个代表绿色部分，最后两个代表蓝色部分。</p><p>此外，十六进制颜色代码基于16进制，而RGB颜色值基于10进制。必须将十六进制颜色代码转换为十进制，以获得RGB颜色的最终表示。</p><h2 id="_3-将十六进制转换为rgb" tabindex="-1"><a class="header-anchor" href="#_3-将十六进制转换为rgb"><span>3. 将十六进制转换为RGB</span></a></h2><p>首先，让我们将一个十六进制颜色代码转换为其RGB等效值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenHexCode_whenConvertedToRgb_thenCorrectRgbValuesAreReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> hexCode <span class="token operator">=</span> <span class="token string">&quot;FF9933&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> red <span class="token operator">=</span> <span class="token number">255</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> green <span class="token operator">=</span> <span class="token number">153</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> blue <span class="token operator">=</span> <span class="token number">51</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> resultRed <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>hexCode<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> resultGreen <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>hexCode<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> resultBlue <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>hexCode<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>red<span class="token punctuation">,</span> resultRed<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>green<span class="token punctuation">,</span> resultGreen<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>blue<span class="token punctuation">,</span> resultBlue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们声明了一个_string_类型的变量_hexCode_。该变量保存了一个十六进制颜色代码。我们将十六进制代码分割为其红色、绿色和蓝色组件。</p><p>此外，我们通过获取十六进制颜色代码的子字符串来提取组件。为了将红色、绿色和蓝色的十六进制值转换为它们的十进制值，我们调用了_Integer.valueOf()_方法。_Integer.valueOf()_允许我们解析一个数字的_string_表示，以指定的基数。在示例中的指定基数是16。</p><p>最后，我们确认提取的RGB等效值是我们预期的结果。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了一种简单的方法，将十六进制颜色代码转换为其RGB等效值。我们使用了_Integer.valueOf()_将十六进制值转换为其等效的十进制值。</p><p>如常，示例的完整源代码可以在GitHub上找到。</p><p>OK</p>`,20),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-09-Convert Hex to RGB Using Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Convert%20Hex%20to%20RGB%20Using%20Java.html","title":"Java中将十六进制转换为RGB","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","编程"],"tag":["十六进制","RGB"],"head":[["meta",{"name":"keywords","content":"Java, 十六进制转RGB, 颜色代码, 编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Convert%20Hex%20to%20RGB%20Using%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将十六进制转换为RGB"}],["meta",{"property":"og:description","content":"Java中将十六进制转换为RGB 十六进制（hex）和RGB（红-绿-蓝）是图形和设计中常见的颜色代码。有时，将十六进制转换为其等效的RGB值可能是必要的，因为它在许多数字应用中被广泛使用。 在本教程中，我们将学习如何在Java中将十六进制颜色代码转换为其等效的RGB值。 2. 十六进制颜色代码和RGB 十六进制颜色代码由六个字符串字符组成。每个字符代..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T14:00:16.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"十六进制"}],["meta",{"property":"article:tag","content":"RGB"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T14:00:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将十六进制转换为RGB\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T14:00:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将十六进制转换为RGB 十六进制（hex）和RGB（红-绿-蓝）是图形和设计中常见的颜色代码。有时，将十六进制转换为其等效的RGB值可能是必要的，因为它在许多数字应用中被广泛使用。 在本教程中，我们将学习如何在Java中将十六进制颜色代码转换为其等效的RGB值。 2. 十六进制颜色代码和RGB 十六进制颜色代码由六个字符串字符组成。每个字符代..."},"headers":[{"level":2,"title":"2. 十六进制颜色代码和RGB","slug":"_2-十六进制颜色代码和rgb","link":"#_2-十六进制颜色代码和rgb","children":[]},{"level":2,"title":"3. 将十六进制转换为RGB","slug":"_3-将十六进制转换为rgb","link":"#_3-将十六进制转换为rgb","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720533616000,"updatedTime":1720533616000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.41,"words":724},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Convert Hex to RGB Using Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>十六进制（hex）和RGB（红-绿-蓝）是图形和设计中常见的颜色代码。有时，将十六进制转换为其等效的RGB值可能是必要的，因为它在许多数字应用中被广泛使用。</p>\\n<p>在本教程中，我们将学习如何在Java中将十六进制颜色代码转换为其等效的RGB值。</p>\\n<h2>2. 十六进制颜色代码和RGB</h2>\\n<p>十六进制颜色代码由六个字符串字符组成。<strong>每个字符代表十六进制表示法中的一个值，范围在0到15之间（0-9和A-F）</strong>。</p>\\n<p>例如，深藏红花的十六进制颜色代码是_FF9933_。</p>\\n<p>RGB是红色、绿色和蓝色的组合。<strong>它每个使用8位，并具有介于0和255之间的整数值</strong>。</p>","autoDesc":true}');export{d as comp,k as data};
