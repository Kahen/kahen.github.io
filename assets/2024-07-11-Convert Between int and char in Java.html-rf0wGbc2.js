import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D4B8YWfq.js";const e={},p=t(`<h1 id="java中int与char类型转换" tabindex="-1"><a class="header-anchor" href="#java中int与char类型转换"><span>Java中int与char类型转换</span></a></h1><p>在本教程中，我们将了解如何在Java中将int转换为char以及如何反向转换。我们将简要讨论字符的表示方式，以便更好地理解文章后面的代码。</p><p>Java内部将每个char存储为16位的Unicode编码值：</p><table><thead><tr><th>字符</th><th>2字节</th><th>十进制（基数10）</th><th>十六进制（基数16）</th></tr></thead><tbody><tr><td>A</td><td>00000000 01000001</td><td>65</td><td>41</td></tr><tr><td>a</td><td>00000000 01100001</td><td>61</td><td>97</td></tr><tr><td>1</td><td>00000000 00110001</td><td>49</td><td>31</td></tr><tr><td>Z</td><td>00000000 01011010</td><td>90</td><td>5A</td></tr></tbody></table><p>我们可以通过将char值强制转换为int来轻松检查这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">65</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token char">&#39;A&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>ASCII码是Unicode编码的一个子集，主要表示英文字母。</p><h3 id="将int转换为char" tabindex="-1"><a class="header-anchor" href="#将int转换为char"><span>将int转换为char</span></a></h3><p>假设我们有一个值为7的int变量，我们想将其转换为其char对应物‘7’。我们有几种方法可以做到这一点。</p><p><strong>简单地将其强制转换为char是不行的，因为这会将其转换为以二进制表示为0111的字符，这在UTF-16中是U+0007或字符‘BELL’。</strong></p><h4 id="_3-1-通过-0-进行偏移" tabindex="-1"><a class="header-anchor" href="#_3-1-通过-0-进行偏移"><span>3.1. 通过‘0’进行偏移</span></a></h4><p>UTF-16中的字符以连续顺序表示。所以我们可以简单地将‘0’字符偏移7位以获得‘7’字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAnInt_whenAdding0_thenExpectedCharType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> num <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">;</span>

    <span class="token keyword">char</span> c <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token char">&#39;0&#39;</span> <span class="token operator">+</span> num<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token char">&#39;7&#39;</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-使用character-fordigit-方法" tabindex="-1"><a class="header-anchor" href="#_3-2-使用character-fordigit-方法"><span>3.2. 使用Character.forDigit()方法</span></a></h4><p>加‘0’有效，但看起来有点hackish。幸运的是，我们有一种更干净的方法，即使用Character.forDigit()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAnInt_whenUsingForDigit_thenExpectedCharType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> num <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">;</span>

    <span class="token keyword">char</span> c <span class="token operator">=</span> <span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">forDigit</span><span class="token punctuation">(</span>num <span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token char">&#39;7&#39;</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以注意到forDigit()方法接受第二个参数，基数（radix），它表示我们想要转换的数字的基数表示。在我们的例子中，是10。</p><h4 id="_3-3-使用integer-tostring-方法" tabindex="-1"><a class="header-anchor" href="#_3-3-使用integer-tostring-方法"><span>3.3. 使用Integer.toString()方法</span></a></h4><p>我们可以使用包装类Integer，它有一个toString()方法，将给定的int转换为其字符串表示。当然，这可以用于将多位数字转换为String。但是，我们也可以通过链接charAt()方法并选择第一个char来将其转换为单个数字的char：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAnInt_whenUsingToString_thenExpectedCharType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> num <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">;</span>

    <span class="token keyword">char</span> c <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token char">&#39;7&#39;</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="将char转换为int" tabindex="-1"><a class="header-anchor" href="#将char转换为int"><span>将char转换为int</span></a></h3><p>之前，我们看到了如何将int转换为char。让我们看看如何获得char的int值。正如我们所预期的，<strong>将char强制转换为int是不行的，因为这会给我们字符的UTF-16编码的十进制表示：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAChar_whenCastingFromCharToInt_thenExpectedUnicodeRepresentation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">char</span> c <span class="token operator">=</span> <span class="token char">&#39;7&#39;</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">55</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-1-减去-0" tabindex="-1"><a class="header-anchor" href="#_4-1-减去-0"><span>4.1. 减去‘0’</span></a></h4><p>如果我们通过加‘0’得到char，那么相反地通过减去‘0’的十进制值，我们应该得到int：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAChar_whenSubtracting0_thenExpectedNumericType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">char</span> c <span class="token operator">=</span> <span class="token char">&#39;7&#39;</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> n <span class="token operator">=</span> c <span class="token operator">-</span> <span class="token char">&#39;0&#39;</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这确实有效，但有更好的、更简单的方法可以做到这一点。</p><h4 id="_4-2-使用character-getnumericvalue-方法" tabindex="-1"><a class="header-anchor" href="#_4-2-使用character-getnumericvalue-方法"><span>4.2. 使用Character.getNumericValue()方法</span></a></h4><p>Character类再次提供了另一个辅助方法getNumericValue()，它基本上做了它所说的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAChar_whenUsingGetNumericValue_thenExpectedNumericType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">char</span> c <span class="token operator">=</span> <span class="token char">&#39;7&#39;</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> n <span class="token operator">=</span> <span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">getNumericValue</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-3-使用integer-parseint" tabindex="-1"><a class="header-anchor" href="#_4-3-使用integer-parseint"><span>4.3. 使用Integer.parseInt()</span></a></h4><p>我们可以使用Integer.parseInt()将String转换为数字表示。正如之前一样，虽然我们可以使用它将整个多位数转换为int表示，但我们也可以使用它来转换单个数字：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAChar_whenUsingParseInt_thenExpectedNumericType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">char</span> c <span class="token operator">=</span> <span class="token char">&#39;7&#39;</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> n <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>确实，语法有点繁琐，主要是因为它涉及多次转换，但它按预期工作。</p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在本文中，我们学习了Java中字符的内部表示方式，以及如何将int转换为char以及如何反向转换。</p><p>如往常一样，本文的完整代码示例可以在GitHub上找到。</p>`,37),c=[p];function i(o,l){return s(),a("div",null,c)}const u=n(e,[["render",i],["__file","2024-07-11-Convert Between int and char in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Convert%20Between%20int%20and%20char%20in%20Java.html","title":"Java中int与char类型转换","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["int","char","转换"],"head":[["meta",{"name":"keywords","content":"Java, int, char, 转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Convert%20Between%20int%20and%20char%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中int与char类型转换"}],["meta",{"property":"og:description","content":"Java中int与char类型转换 在本教程中，我们将了解如何在Java中将int转换为char以及如何反向转换。我们将简要讨论字符的表示方式，以便更好地理解文章后面的代码。 Java内部将每个char存储为16位的Unicode编码值： 我们可以通过将char值强制转换为int来轻松检查这一点： ASCII码是Unicode编码的一个子集，主要表示英..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T10:02:16.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"int"}],["meta",{"property":"article:tag","content":"char"}],["meta",{"property":"article:tag","content":"转换"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T10:02:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中int与char类型转换\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T10:02:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中int与char类型转换 在本教程中，我们将了解如何在Java中将int转换为char以及如何反向转换。我们将简要讨论字符的表示方式，以便更好地理解文章后面的代码。 Java内部将每个char存储为16位的Unicode编码值： 我们可以通过将char值强制转换为int来轻松检查这一点： ASCII码是Unicode编码的一个子集，主要表示英..."},"headers":[{"level":3,"title":"将int转换为char","slug":"将int转换为char","link":"#将int转换为char","children":[]},{"level":3,"title":"将char转换为int","slug":"将char转换为int","link":"#将char转换为int","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720692136000,"updatedTime":1720692136000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.07,"words":921},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Convert Between int and char in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将了解如何在Java中将int转换为char以及如何反向转换。我们将简要讨论字符的表示方式，以便更好地理解文章后面的代码。</p>\\n<p>Java内部将每个char存储为16位的Unicode编码值：</p>\\n<table>\\n<thead>\\n<tr>\\n<th>字符</th>\\n<th>2字节</th>\\n<th>十进制（基数10）</th>\\n<th>十六进制（基数16）</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>A</td>\\n<td>00000000 01000001</td>\\n<td>65</td>\\n<td>41</td>\\n</tr>\\n<tr>\\n<td>a</td>\\n<td>00000000 01100001</td>\\n<td>61</td>\\n<td>97</td>\\n</tr>\\n<tr>\\n<td>1</td>\\n<td>00000000 00110001</td>\\n<td>49</td>\\n<td>31</td>\\n</tr>\\n<tr>\\n<td>Z</td>\\n<td>00000000 01011010</td>\\n<td>90</td>\\n<td>5A</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{u as comp,k as data};
