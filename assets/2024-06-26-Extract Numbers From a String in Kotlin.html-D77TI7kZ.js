import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-B5SPsEv6.js";const p={},e=t('<h1 id="在kotlin中从字符串中提取数字" tabindex="-1"><a class="header-anchor" href="#在kotlin中从字符串中提取数字"><span>在Kotlin中从字符串中提取数字</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在数据分析和处理中，从文本中提取数字信息是一个关键且基本的任务。这对于解析标识符、提取电话号码、解释邮政编码等任务至关重要。</p><p>在本教程中，我们将探讨在Kotlin中从字符串中提取数字的不同方法。</p><h2 id="_2-假设" tabindex="-1"><a class="header-anchor" href="#_2-假设"><span>2. 假设</span></a></h2><p>对于手头的问题，我们将仅关注提取可以转换为_BigInteger_数据类型的十进制正整数。小数和非十进制数字不在提取方法的范围内。</p><h2 id="_3-使用循环" tabindex="-1"><a class="header-anchor" href="#_3-使用循环"><span>3. 使用循环</span></a></h2><p>我们可以使用传统的_for_循环来遍历文本中的每个字符并提取数字。让我们看看实现：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">extractNumbersUsingLoop</span><span class="token punctuation">(</span>str<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> List`````<span class="token operator">&lt;</span>BigInteger<span class="token operator">&gt;</span>````` <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> numbers <span class="token operator">=</span> mutableListOf`````<span class="token operator">&lt;</span>BigInteger<span class="token operator">&gt;</span>`````<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> currentNumber <span class="token operator">=</span> <span class="token function">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span>char <span class="token keyword">in</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>char<span class="token punctuation">.</span><span class="token function">isDigit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            currentNumber<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>char<span class="token punctuation">)</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>currentNumber<span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            numbers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>currentNumber<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBigInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n            currentNumber<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>currentNumber<span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        numbers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>currentNumber<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBigInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> numbers\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，我们遍历文本中的每个字符。我们使用_StringBuilder_在迭代过程中高效地构建数字子字符串并提取连续的数字。然后，这些提取的数字被追加到我们从方法返回的列表中。<strong>注意我们使用_toBigInteger()_方法将字符串转换为数字，以确保正确处理非常大的数字</strong>。</p><h2 id="_4-使用正则表达式" tabindex="-1"><a class="header-anchor" href="#_4-使用正则表达式"><span>4. 使用正则表达式</span></a></h2><p>正则表达式是查找文本中特定模式的强大工具。我们可以使用正则表达式从字符串中提取数字，而无需手动遍历文本中的每个字符：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">extractMultipleUsingRegex</span><span class="token punctuation">(</span>str<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> List`````<span class="token operator">&lt;</span>BigInteger<span class="token operator">&gt;</span>````` <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">Regex</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;\\\\d+&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">toBigInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，<strong>我们使用正则表达式_\\d_来匹配字符串中的数字字符</strong>。_apply()_函数应用于_Regex_对象时，识别所有这些数字的实例并生成一系列_MatchResult_对象。通过迭代这个序列并映射元素，我们可以将_String_转换为_BigInteger_的列表。</p><h2 id="_5-使用-split" tabindex="-1"><a class="header-anchor" href="#_5-使用-split"><span>5. 使用_split()_</span></a></h2><p>另一种提取数字的方法是使用带正则表达式的_split()_方法。正则表达式方法使实现比迭代方法更灵活和简洁。</p><p>让我们看看实现：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">extractNumbersUsingSplitAndRegex</span><span class="token punctuation">(</span>str<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> List`````<span class="token operator">&lt;</span>BigInteger<span class="token operator">&gt;</span>````` <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token function">Regex</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;\\\\D+&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">filter</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">isNotBlank</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>\n        <span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">toBigInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们使用正则表达式_\\D+<em>来分割字符串。**这个正则表达式</em>\\D_匹配任何非数字字符，而正则表达式_\\d_匹配数字。加号_+<em>指定我们想要匹配一个或多个随后的数字。**在分割字符串后，我们移除空结果，并将_String_转换为_BigInteger</em>。</p><h2 id="_6-测试实现" tabindex="-1"><a class="header-anchor" href="#_6-测试实现"><span>6. 测试实现</span></a></h2><p>实现了从字符串中提取数字的不同方法后，让我们编写单元测试以确保实现的正确性。<strong>我们可以利用参数化测试来覆盖各种情况</strong>。</p><p>让我们添加依赖项以包含_junit-jupiter-params_库来编写参数化测试：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`org.junit.jupiter`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`junit-jupiter-params`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`5.10.2`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>`test`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了简洁，我们将在本文中仅展示一个实现的测试：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@ParameterizedTest</span>\n<span class="token annotation builtin">@CsvSource</span><span class="token punctuation">(</span>\n    <span class="token string-literal singleline"><span class="token string">&quot;string with 123 and 333 in the text, 123:333&quot;</span></span><span class="token punctuation">,</span>\n    <span class="token string-literal singleline"><span class="token string">&quot;another string with 456 and 789, 456:789&quot;</span></span><span class="token punctuation">,</span>\n    <span class="token string-literal singleline"><span class="token string">&quot;string 123-234, 123:234&quot;</span></span><span class="token punctuation">,</span>\n    <span class="token string-literal singleline"><span class="token string">&quot;no numbers,&quot;</span></span><span class="token punctuation">,</span>\n    <span class="token string-literal singleline"><span class="token string">&quot;3 4 50 numbers6, 3&quot;</span></span><span class="token punctuation">,</span>\n    <span class="token string-literal singleline"><span class="token string">&quot;91234567891011121314151617181920number, 91234567891011121314151617181920&quot;</span></span><span class="token punctuation">,</span>\n    <span class="token string-literal singleline"><span class="token string">&quot;123456789large numbers0, 123456789&quot;</span></span>\n<span class="token punctuation">)</span>\n<span class="token keyword">fun</span> <span class="token function">`extract all occurrences of numbers from string using regex`</span><span class="token punctuation">(</span>str<span class="token operator">:</span> String<span class="token punctuation">,</span> expected<span class="token operator">:</span> String<span class="token operator">?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> numbers <span class="token operator">=</span> <span class="token function">extractMultipleUsingRegex</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span>\n    <span class="token keyword">val</span> expectedList <span class="token operator">=</span> expected<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;:&quot;</span></span><span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">toBigInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span> <span class="token operator">?:</span> <span class="token function">emptyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    Assertions<span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedList<span class="token punctuation">,</span> numbers<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在这里，我们使用_@CsvSource_注解和自定义分隔符_:_来定义每个案例的不同数据</strong>。在测试中，我们分割这个字符串并将其与方法的结果进行比较。测试套件涵盖了各种场景，包括包含非常大数字的字符串、数字和字符的混合、特殊字符等。</p><p>同样，我们也可以为其他实现编写测试。</p><p>此外，当在_@CsvSource_中定义测试数据变得笨拙时，由于它处理数据的方式，选择传统的单元测试提供了一个简单的解决方案。例如，让我们编写<strong>一个简单的单元测试来检查空字符串场景</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`check empty string scenario for split`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> numbers <span class="token operator">=</span> <span class="token function">extractNumbersUsingSplitAndRegex</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">)</span>\n    Assertions<span class="token punctuation">.</span><span class="token function">assertIterableEquals</span><span class="token punctuation">(</span>numbers<span class="token punctuation">,</span> listOf`````<span class="token operator">&lt;</span>BigInteger<span class="token operator">&gt;</span>`````<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们探讨了在Kotlin中从字符串中提取数字的不同方法，包括正则表达式和_for_循环。此外，我们强调了测试的重要性，利用参数化测试和单独的测试用例来彻底验证实现。</p><p>如往常一样，本文中使用的示例代码可在GitHub上找到。</p><p>OK</p>',33),o=[e];function c(i,l){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-06-26-Extract Numbers From a String in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Extract%20Numbers%20From%20a%20String%20in%20Kotlin.html","title":"在Kotlin中从字符串中提取数字","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Kotlin","编程"],"tag":["Kotlin","字符串","数字提取"],"head":[["meta",{"name":"keywords","content":"Kotlin, 字符串, 数字提取, 正则表达式, for循环"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Extract%20Numbers%20From%20a%20String%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Kotlin中从字符串中提取数字"}],["meta",{"property":"og:description","content":"在Kotlin中从字符串中提取数字 1. 引言 在数据分析和处理中，从文本中提取数字信息是一个关键且基本的任务。这对于解析标识符、提取电话号码、解释邮政编码等任务至关重要。 在本教程中，我们将探讨在Kotlin中从字符串中提取数字的不同方法。 2. 假设 对于手头的问题，我们将仅关注提取可以转换为_BigInteger_数据类型的十进制正整数。小数和非..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T02:41:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"字符串"}],["meta",{"property":"article:tag","content":"数字提取"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T02:41:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Kotlin中从字符串中提取数字\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T02:41:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Kotlin中从字符串中提取数字 1. 引言 在数据分析和处理中，从文本中提取数字信息是一个关键且基本的任务。这对于解析标识符、提取电话号码、解释邮政编码等任务至关重要。 在本教程中，我们将探讨在Kotlin中从字符串中提取数字的不同方法。 2. 假设 对于手头的问题，我们将仅关注提取可以转换为_BigInteger_数据类型的十进制正整数。小数和非..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 假设","slug":"_2-假设","link":"#_2-假设","children":[]},{"level":2,"title":"3. 使用循环","slug":"_3-使用循环","link":"#_3-使用循环","children":[]},{"level":2,"title":"4. 使用正则表达式","slug":"_4-使用正则表达式","link":"#_4-使用正则表达式","children":[]},{"level":2,"title":"5. 使用_split()_","slug":"_5-使用-split","link":"#_5-使用-split","children":[]},{"level":2,"title":"6. 测试实现","slug":"_6-测试实现","link":"#_6-测试实现","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719369684000,"updatedTime":1719369684000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.94,"words":1183},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Extract Numbers From a String in Kotlin.md","localizedDate":"2024年6月26日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在数据分析和处理中，从文本中提取数字信息是一个关键且基本的任务。这对于解析标识符、提取电话号码、解释邮政编码等任务至关重要。</p>\\n<p>在本教程中，我们将探讨在Kotlin中从字符串中提取数字的不同方法。</p>\\n<h2>2. 假设</h2>\\n<p>对于手头的问题，我们将仅关注提取可以转换为_BigInteger_数据类型的十进制正整数。小数和非十进制数字不在提取方法的范围内。</p>\\n<h2>3. 使用循环</h2>\\n<p>我们可以使用传统的_for_循环来遍历文本中的每个字符并提取数字。让我们看看实现：</p>\\n<div class=\\"language-kotlin\\" data-ext=\\"kt\\" data-title=\\"kt\\"><pre class=\\"language-kotlin\\"><code><span class=\\"token keyword\\">fun</span> <span class=\\"token function\\">extractNumbersUsingLoop</span><span class=\\"token punctuation\\">(</span>str<span class=\\"token operator\\">:</span> String<span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">:</span> List`````<span class=\\"token operator\\">&lt;</span>BigInteger<span class=\\"token operator\\">&gt;</span>````` <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">val</span> numbers <span class=\\"token operator\\">=</span> mutableListOf`````<span class=\\"token operator\\">&lt;</span>BigInteger<span class=\\"token operator\\">&gt;</span>`````<span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">val</span> currentNumber <span class=\\"token operator\\">=</span> <span class=\\"token function\\">StringBuilder</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span>char <span class=\\"token keyword\\">in</span> str<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>char<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isDigit</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            currentNumber<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">append</span><span class=\\"token punctuation\\">(</span>char<span class=\\"token punctuation\\">)</span>\\n        <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">else</span> <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>currentNumber<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isNotEmpty</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            numbers<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span>currentNumber<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toString</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toBigInteger</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span>\\n            currentNumber<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">clear</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>currentNumber<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isNotEmpty</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        numbers<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span>currentNumber<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toString</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toBigInteger</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token keyword\\">return</span> numbers\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
