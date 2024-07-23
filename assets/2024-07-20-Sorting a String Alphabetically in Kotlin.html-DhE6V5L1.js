import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as a,a as i}from"./app-LwwahXlT.js";const n={},r=i(`<h1 id="kotlin中按字母顺序对字符串排序-baeldung关于kotlin的教程" tabindex="-1"><a class="header-anchor" href="#kotlin中按字母顺序对字符串排序-baeldung关于kotlin的教程"><span>Kotlin中按字母顺序对字符串排序 | Baeldung关于Kotlin的教程</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在软件开发中，按字母顺序对字符串进行排序通常非常重要，尤其是在搜索和展示数据时。</p><p>在本教程中，我们将讨论在Kotlin中按不同场景和复杂度对字符串进行字母排序的一些方法。</p><h2 id="_2-使用tochararray-和sorted" tabindex="-1"><a class="header-anchor" href="#_2-使用tochararray-和sorted"><span>2. 使用toCharArray()和sorted()</span></a></h2><p>第一种排序字符串的方法是最简单的，因为我们将使用Kotlin内置的函数。我们将把字符串转换为字符数组进行排序，然后再将结果转换回字符串：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private fun sortStringWithCharArrayAndSorted(input: String): String {
    return input.toCharArray().sorted().joinToString(&quot;&quot;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们使用toCharArray()将字符串分解为字符数组。然后，我们使用sorted()对这个数组进行排序。让我们看看结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[a, b, c, d, e, f, g, h, i, j, k, l]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，我们使用joinToString()将数组转换为字符串。</p><p>现在，让我们测试这个函数是否正确地按字母顺序对我们的字符串进行了排序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`using toCharArray and then sorted\`() {
    val inputString = &quot;laibkcedfgjh&quot;
    assertEquals(&quot;abcdefghijkl&quot;, sortStringWithCharArrayAndSorted(inputString))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用tochararray-sorted-和distinct" tabindex="-1"><a class="header-anchor" href="#_3-使用tochararray-sorted-和distinct"><span>3. 使用toCharArray()，sorted()和distinct()</span></a></h2><p>有时，我们可能希望在对字符串进行字母排序的同时，还去除重复的字母。我们将使用distinct()，这是Kotlin内置的从集合中移除重复元素的函数。如果字符串包含一些重复的字符，并且我们想要移除它们，<strong>这种方法很有用</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private fun sortStringWithCharArrayAnddistinct(input: String): String {
    return input.toCharArray().sorted().distinct().joinToString(&quot;&quot;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果不使用distinct()，输出将是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>abcdefgghhhijkkkl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，在调用toCharArray()和sorted()之后，我们需要调用distinct()来移除多余的重复字符。</p><p>我们也来测试这个函数，以验证它是否按预期工作：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`using sorted and distinct\`() {
    val inputString = &quot;lakibkcekdghfgjhh&quot;
    assertEquals(&quot;abcdefghijkl&quot;, sortStringWithCharArrayAnddistinct(inputString))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用tochararray-sortedwith-和compareby" tabindex="-1"><a class="header-anchor" href="#_4-使用tochararray-sortedwith-和compareby"><span>4. 使用toCharArray()，sortedWith()和compareBy()</span></a></h2><p>我们可能需要分别对字符串中的元音字母和辅音字母进行字母排序。因为这是一种独特的排序方式，我们需要使用sortedWith()来提供特殊的比较器。然后，我们将使用compareBy()来创建具有我们排序标准的比较器。这是一种<strong>用于按更复杂标准对字符串进行排序的有用方法</strong>。</p><p>例如，我们将首先对辅音字母进行排序，然后是元音字母：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private fun sortStringWithtoCharArrayAndCompareBy(input: String): String {
    val vowels = setOf(&#39;a&#39;, &#39;e&#39;, &#39;i&#39;, &#39;o&#39;, &#39;u&#39;)
    return input.toCharArray().sortedWith(compareBy\`&lt;Char&gt;\` { it in vowels }
            .thenBy { it }
        ).joinToString(&quot;&quot;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们也将测试我们的自定义排序，以确保辅音字母在前，元音字母在后，同时在这些分组之间仍然保持字母顺序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`using compareBy\`() {
    val inputString = &quot;laibkcedfgjh&quot;
    assertEquals(&quot;bcdfghjklaei&quot;, sortStringWithtoCharArrayAndCompareBy(inputString))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用扩展函数" tabindex="-1"><a class="header-anchor" href="#_5-使用扩展函数"><span>5. 使用扩展函数</span></a></h2><p>我们可以将我们在前一节中讨论的任何方法转化为扩展函数。这允许我们向类或数据类型添加新函数，而不需要修改该类的原始源代码。</p><p>例如，我们可以采用第一种解决方案，并为String类定义一个名为sortAsc()的扩展函数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private fun String.sortAsc() = toCharArray().sorted().joinToString(&quot;&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是Kotlin的一个有趣之处。<strong>现在我们已经为String定义了一个新的扩展函数，我们可以直接从字符串字面量调用它</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;cdbae&quot;.sortAsc()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，我们将测试我们的扩展函数是否按我们期望的方式对字符串进行了排序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`simplify toCharArray and sorted with extension\`() {
    assertEquals(&quot;abcde&quot;, &quot;cdbae&quot;.sortAsc())
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们讨论了使用sorted()和sortedWith()的不同变体来按字母顺序对字符串进行排序的几种方法。当然，根据我们项目的需求，可以使用这些方法中的任何一种。此外，我们还探索了使用扩展函数——Kotlin的强大且富有表现力的特性——来为我们的解决方案。</p><p>一如既往，本文的代码可以在GitHub上找到。</p>`,37),d=[r];function s(l,o){return a(),e("div",null,d)}const p=t(n,[["render",s],["__file","2024-07-20-Sorting a String Alphabetically in Kotlin.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Sorting%20a%20String%20Alphabetically%20in%20Kotlin.html","title":"Kotlin中按字母顺序对字符串排序 | Baeldung关于Kotlin的教程","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","编程"],"tag":["字符串排序","Kotlin"],"head":[["meta",{"name":"keywords","content":"Kotlin, 字符串排序, 编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Sorting%20a%20String%20Alphabetically%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中按字母顺序对字符串排序 | Baeldung关于Kotlin的教程"}],["meta",{"property":"og:description","content":"Kotlin中按字母顺序对字符串排序 | Baeldung关于Kotlin的教程 1. 概述 在软件开发中，按字母顺序对字符串进行排序通常非常重要，尤其是在搜索和展示数据时。 在本教程中，我们将讨论在Kotlin中按不同场景和复杂度对字符串进行字母排序的一些方法。 2. 使用toCharArray()和sorted() 第一种排序字符串的方法是最简单的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T05:11:34.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"字符串排序"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T05:11:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中按字母顺序对字符串排序 | Baeldung关于Kotlin的教程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T05:11:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中按字母顺序对字符串排序 | Baeldung关于Kotlin的教程 1. 概述 在软件开发中，按字母顺序对字符串进行排序通常非常重要，尤其是在搜索和展示数据时。 在本教程中，我们将讨论在Kotlin中按不同场景和复杂度对字符串进行字母排序的一些方法。 2. 使用toCharArray()和sorted() 第一种排序字符串的方法是最简单的..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用toCharArray()和sorted()","slug":"_2-使用tochararray-和sorted","link":"#_2-使用tochararray-和sorted","children":[]},{"level":2,"title":"3. 使用toCharArray()，sorted()和distinct()","slug":"_3-使用tochararray-sorted-和distinct","link":"#_3-使用tochararray-sorted-和distinct","children":[]},{"level":2,"title":"4. 使用toCharArray()，sortedWith()和compareBy()","slug":"_4-使用tochararray-sortedwith-和compareby","link":"#_4-使用tochararray-sortedwith-和compareby","children":[]},{"level":2,"title":"5. 使用扩展函数","slug":"_5-使用扩展函数","link":"#_5-使用扩展函数","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721452294000,"updatedTime":1721452294000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.41,"words":1022},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Sorting a String Alphabetically in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在软件开发中，按字母顺序对字符串进行排序通常非常重要，尤其是在搜索和展示数据时。</p>\\n<p>在本教程中，我们将讨论在Kotlin中按不同场景和复杂度对字符串进行字母排序的一些方法。</p>\\n<h2>2. 使用toCharArray()和sorted()</h2>\\n<p>第一种排序字符串的方法是最简单的，因为我们将使用Kotlin内置的函数。我们将把字符串转换为字符数组进行排序，然后再将结果转换回字符串：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>private fun sortStringWithCharArrayAndSorted(input: String): String {\\n    return input.toCharArray().sorted().joinToString(\\"\\")\\n}\\n</code></pre></div>","autoDesc":true}');export{p as comp,h as data};
