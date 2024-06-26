import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-BDQhVAzv.js";const r={},i=a(`<hr><h1 id="kotlin中解析带有千位分隔符的字符串" tabindex="-1"><a class="header-anchor" href="#kotlin中解析带有千位分隔符的字符串"><span>Kotlin中解析带有千位分隔符的字符串</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>当处理以字符串形式表示的数字时，通常需要将它们转换为数值以进行后续计算。当表示较大数值的字符串使用逗号（“，”）或点（“.”）作为千位分隔符时，情况就变得复杂了。Kotlin提供了几种方法将这些字符串解析为数值。</p><p>在本教程中，我们将探索将这些字符串解析为数值的几种方法。</p><h2 id="_2-decimalformatsymbols-类" tabindex="-1"><a class="header-anchor" href="#_2-decimalformatsymbols-类"><span>2. DecimalFormatSymbols 类</span></a></h2><p>DecimalFormatSymbols 类在我们的解析技术中起着至关重要的作用。<strong>它允许我们获取特定于区域设置的格式符号，例如千位分隔符</strong>。我们可以使用 groupingSeparator 获取这个符号：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>DecimalFormatSymbols.getInstance(Locale.getDefault()).groupingSeparator
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们将利用这个来检索特定于所提供区域设置的分组分隔符字符。</p><p>在整个教程中，我们将查看两个区域设置：Locale.US，它使用逗号作为千位分隔符；以及 Locale.GERMAN，它使用点作为千位分隔符。</p><h2 id="_3-使用-replace-方法与-regex" tabindex="-1"><a class="header-anchor" href="#_3-使用-replace-方法与-regex"><span>3. 使用 replace() 方法与 Regex</span></a></h2><p>解析带有千位分隔符的字符串的一个直接方法是使用 replace() 方法。<strong>此方法使用正则表达式从指定的字符串中删除特定于区域设置的千位分隔符</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>fun parseStringUsingReplace(input: String, locale: Locale): Int {
    val separator = DecimalFormatSymbols.getInstance(locale).groupingSeparator

    return input.replace(Regex(&quot;[$separator]&quot;), &quot;&quot;).toInt()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用正则表达式，我们替换掉分组分隔符的所有实例，然后将数字转换为 Int。</p><p>现在，我们需要对我们的辅助方法进行单元测试以确保正确性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`parses string with thousands separator using replace method\`(){
    val result1 = parseStringUsingReplace(&quot;1,000&quot;, Locale.US)
    val result2 = parseStringUsingReplace(&quot;25.750&quot;, Locale.German)

    assertEquals(1000, result1)
    assertEquals(25750, result2)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们解析了两种不同区域设置格式化的数字，一个使用逗号作为千位分隔符，另一个使用点。</p><h2 id="_4-使用-stringtokenizer-类" tabindex="-1"><a class="header-anchor" href="#_4-使用-stringtokenizer-类"><span>4. 使用 StringTokenizer 类</span></a></h2><p>另一种策略是使用 StringTokenizer。<strong>我们可以基于指定的分隔符将字符串分割成标记</strong>。在我们的例子中，我们将再次使用 Locale-specific groupingSeparator：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>fun parseStringUsingTokenizer(input: String, locale: Locale): Int {
    val separator = DecimalFormatSymbols.getInstance(locale).groupingSeparator
    val tokenizer = StringTokenizer(input, separator.toString())
    val builder = StringBuilder()
    while (tokenizer.hasMoreTokens()) {
        builder.append(tokenizer.nextToken())
    }
    return builder.toString().toInt()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们使用分隔符字符作为分隔符创建 StringTokenizer 的实例。<strong>然后，我们循环遍历字符串中的每个标记，并将它们追加到 StringBuilder 中</strong>。最后，我们将数字转换为 Int。</p><p>再次，我们通过解析来自两个不同 Locales 的数字来测试这个：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`parses string with thousands separator using string tokenizer\`(){
    val result1 = parseStringUsingTokenizer(&quot;1,000&quot;, Locale.US)
    val result2 = parseStringUsingTokenizer(&quot;25.750&quot;, Locale.German)

    assertEquals(1000, result1)
    assertEquals(25750, result2)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用-numberformat-类" tabindex="-1"><a class="header-anchor" href="#_5-使用-numberformat-类"><span>5. 使用 NumberFormat 类</span></a></h2><p>最后，我们可以使用 Java 标准库中的 NumberFormat 类。<strong>这个类允许我们直接使用 Locale 解析() 数字</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>fun parseStringWithSeparatorUsingNumberFormat(input: String, locale: Locale): Int {
    val number = NumberFormat.getInstance(locale)
    val num = number.parse(input)
    return num.toInt()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>像往常一样，让我们测试我们的辅助方法的正确性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`parses string with thousands separator using number format class\`(){
    val result1 = parseStringWithSeparatorUsingNumberFormat(&quot;1,000&quot;, Locale.US)
    val result2 = parseStringWithSeparatorUsingNumberFormat(&quot;25.750&quot;, Locale.German)

    assertEquals(1000, result1)
    assertEquals(25750, result2)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>特别是，<strong>向 NumberFormat 类提供正确的 Locale 会自动考虑正确的千位分隔符来解析数字</strong>。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了在 Kotlin 中解析带有千位分隔符的字符串的各种方法。</p><p>首先，我们发现了如何确定特定于区域设置的分组分隔符。然后，我们探索了 replace() 方法和正则表达式。此外，我们还检查了基于指定分隔符将字符串分割为标记的 StringTokenizer 类。最后，我们深入研究了 Java 标准库中的 NumberFormat 类。</p><p>如常，本文中使用的全部源代码可以在 GitHub 上找到。</p>`,33),s=[i];function l(o,d){return n(),t("div",null,s)}const m=e(r,[["render",l],["__file","2024-06-22-Parse String With Thousands Separator in Kotlin.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Parse%20String%20With%20Thousands%20Separator%20in%20Kotlin.html","title":"Kotlin中解析带有千位分隔符的字符串","lang":"zh-CN","frontmatter":{"category":["Kotlin","Programming"],"tag":["Kotlin","String Parsing","Number Format"],"head":[["meta",{"name":"keywords","content":"Kotlin, String Parsing, Thousands Separator, Number Format, Locale"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Parse%20String%20With%20Thousands%20Separator%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中解析带有千位分隔符的字符串"}],["meta",{"property":"og:description","content":"Kotlin中解析带有千位分隔符的字符串 1. 引言 当处理以字符串形式表示的数字时，通常需要将它们转换为数值以进行后续计算。当表示较大数值的字符串使用逗号（“，”）或点（“.”）作为千位分隔符时，情况就变得复杂了。Kotlin提供了几种方法将这些字符串解析为数值。 在本教程中，我们将探索将这些字符串解析为数值的几种方法。 2. DecimalForm..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T21:27:01.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"String Parsing"}],["meta",{"property":"article:tag","content":"Number Format"}],["meta",{"property":"article:modified_time","content":"2024-06-22T21:27:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中解析带有千位分隔符的字符串\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-22T21:27:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中解析带有千位分隔符的字符串 1. 引言 当处理以字符串形式表示的数字时，通常需要将它们转换为数值以进行后续计算。当表示较大数值的字符串使用逗号（“，”）或点（“.”）作为千位分隔符时，情况就变得复杂了。Kotlin提供了几种方法将这些字符串解析为数值。 在本教程中，我们将探索将这些字符串解析为数值的几种方法。 2. DecimalForm..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. DecimalFormatSymbols 类","slug":"_2-decimalformatsymbols-类","link":"#_2-decimalformatsymbols-类","children":[]},{"level":2,"title":"3. 使用 replace() 方法与 Regex","slug":"_3-使用-replace-方法与-regex","link":"#_3-使用-replace-方法与-regex","children":[]},{"level":2,"title":"4. 使用 StringTokenizer 类","slug":"_4-使用-stringtokenizer-类","link":"#_4-使用-stringtokenizer-类","children":[]},{"level":2,"title":"5. 使用 NumberFormat 类","slug":"_5-使用-numberformat-类","link":"#_5-使用-numberformat-类","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719091621000,"updatedTime":1719091621000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.21,"words":964},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Parse String With Thousands Separator in Kotlin.md","localizedDate":"2024年6月22日","excerpt":"<hr>\\n<h1>Kotlin中解析带有千位分隔符的字符串</h1>\\n<h2>1. 引言</h2>\\n<p>当处理以字符串形式表示的数字时，通常需要将它们转换为数值以进行后续计算。当表示较大数值的字符串使用逗号（“，”）或点（“.”）作为千位分隔符时，情况就变得复杂了。Kotlin提供了几种方法将这些字符串解析为数值。</p>\\n<p>在本教程中，我们将探索将这些字符串解析为数值的几种方法。</p>\\n<h2>2. DecimalFormatSymbols 类</h2>\\n<p>DecimalFormatSymbols 类在我们的解析技术中起着至关重要的作用。<strong>它允许我们获取特定于区域设置的格式符号，例如千位分隔符</strong>。我们可以使用 groupingSeparator 获取这个符号：</p>","autoDesc":true}');export{m as comp,p as data};
