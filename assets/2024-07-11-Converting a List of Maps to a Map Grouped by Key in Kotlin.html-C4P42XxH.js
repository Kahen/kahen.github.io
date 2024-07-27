import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-CJGTm_7y.js";const i={},o=n(`<hr><h1 id="kotlin中将列表中的映射转换为按键分组的映射" tabindex="-1"><a class="header-anchor" href="#kotlin中将列表中的映射转换为按键分组的映射"><span>Kotlin中将列表中的映射转换为按键分组的映射</span></a></h1><p>作为Kotlin开发者，我们经常使用列表和映射作为核心数据结构来解决不同的编程挑战。有时，我们可能需要处理列表中的映射，以获得一个不同的映射，该映射按键分组数据。也就是说，我们需要将列表中的映射转换为列表的映射。</p><p>在本教程中，我们将探索在Kotlin中将列表中的映射转换为按键分组的映射的不同方法。</p><h2 id="_2-问题解释" tabindex="-1"><a class="header-anchor" href="#_2-问题解释"><span>2. 问题解释</span></a></h2><p>为了更好地理解我们试图解决的问题，让我们考虑这个示例数据，包括所有示例的输入和预期输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>val listOfMaps = listOf(
    mapOf(&quot;name&quot; to &quot;Albert&quot;, &quot;age&quot; to &quot;18&quot;),
    mapOf(&quot;name&quot; to &quot;Naomi&quot;, &quot;age&quot; to &quot;26&quot;),
    mapOf(&quot;name&quot; to &quot;Dru&quot;, &quot;age&quot; to &quot;18&quot;),
    mapOf(&quot;name&quot; to &quot;Steve&quot;, &quot;age&quot; to &quot;30&quot;)
)
val expectedMap = mapOf(
    &quot;name&quot; to listOf(&quot;Albert&quot;, &quot;Naomi&quot;, &quot;Dru&quot;, &quot;Steve&quot;),
    &quot;age&quot; to listOf(&quot;18&quot;, &quot;26&quot;, &quot;18&quot;, &quot;30&quot;)
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码表示变量_listOfMaps_是一个包含键值对映射的列表。然而，我们想要将所有这些映射合并成单个映射，按键分组，最终得到_expectedMap_。<strong>因此，这个新的_Map_使用来自原始_listOfMaps_的所有键，并将每个键与一个_List_的值关联</strong>。这些值代表原始_listOfMaps_中与特定键关联的所有值。</p><h2 id="_3-使用-for-循环" tabindex="-1"><a class="header-anchor" href="#_3-使用-for-循环"><span>3. 使用_for()_循环</span></a></h2><p>将列表中的映射转换为按键分组的映射的一个直接方法是使用简单的_for()_循环：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>fun groupByUsingForLoop(input: List\`\`&lt;Map&lt;String, String&gt;\`\`&gt;): Map\`\`&lt;String, List&lt;String&gt;\`\`&gt; {
    val result = mutableMapOf\`&lt;String, MutableList&lt;String&gt;\`&gt;()()
    for (map in input) {
        for ((key, value) in map) {
            result.getOrPut(key) { mutableListOf() }.add(value)
        }
    }
    return result
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的辅助方法定义了一个_MutableMap_，表示将保存分组数据的映射。此外，它接受原始映射的列表中的值。</p><p>首先，我们创建一个空的可变映射来存储结果。然后，我们遍历输入列表中的每个映射。<strong>对于每个_Map_，我们还使用嵌套的_for()_循环遍历其条目</strong>。随后，我们使用_getOrPut()_方法来获取与键关联的当前值列表，或者如果键在结果映射中尚未存在，则创建一个新的空列表。最后，我们将当前值添加到列表中。</p><p>像往常一样，编写单元测试以确保我们的代码按预期工作是一个好习惯：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`converts list of maps to maps grouped by key using for loop\`() {
    assertEquals(expectedMap, groupByUsingForLoop(listOfMaps))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们首先创建一个映射列表。每个映射包含两个条目，一个_name_和一个_age_键。我们的最终目标是将这个映射列表转换为一个新的映射，其中原始映射的所有键成为新映射的键。此外，这些映射中的值应该是与给定键关联的所有值的列表。</p><h2 id="_4-使用-groupby-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-groupby-方法"><span>4. 使用_groupBy()_方法</span></a></h2><p>现在，我们将看看我们可以用内置方法解决这个问题的一些方法。Kotlin的标准库提供了一个_groupBy()_方法，可以根据键对集合中的元素进行分组。此外，此方法接受一个lambda函数，为列表中的每个元素生成一个键。<strong>结果，每个条目在结果_Map_中的值被收集到具有相同原始键的元素列表中</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`converts list of maps to maps grouped by key using groupBy method\`() {
    val result = listOfMaps
        .flatMap { map -&gt; map.entries }
        .groupBy({ it.key }, { it.value })

    assertEquals(expectedMap, result)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们获取输入的映射列表，并使用_flatMap()_方法将映射列表展平为条目列表。<strong>接下来，我们使用_groupBy()_方法按其键对条目进行分组，并创建一个列表映射</strong>。最后，它创建了一个映射，使用原始列表中的键作为自己的键。每个键与一个列表关联，该列表包含在原始输入列表中与该键关联的所有值。</p><h2 id="_5-使用-fold-方法" tabindex="-1"><a class="header-anchor" href="#_5-使用-fold-方法"><span>5. 使用_fold()_方法</span></a></h2><p>此外，我们可以使用_fold()_方法按特定键对列表中的映射进行分组。这种方法累积映射的条目到列表映射中。实际上，它接一个初始映射和一个lambda函数，并将其应用于输入列表的每个条目：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>fun groupByUsingFoldMethod(input: List\`\`&lt;Map&lt;String, String&gt;\`\`&gt;): Map\`\`&lt;String, List&lt;String&gt;\`\`&gt; {
    return input.fold(emptyMap()) { acc, map -&gt;
        acc.keys.union(map.keys).associateWith { key -&gt;
            acc.getOrDefault(key, emptyList()) + map.getOrDefault(key, &quot;&quot;)
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的辅助方法接受一个映射列表作为输入。_fold()_方法从空映射开始。<strong>输入列表中的每个映射将当前映射的键与累加器映射的键配对</strong>。</p><p>此外，我们使用_associateWith()_方法将每个键与值列表关联。列表包含累加器映射和当前映射中键的值。结果，最终映射拥有原始列表中的所有键作为其键。具体来说，每个键与一个列表关联，该列表包含在原始列表中的条目中与该键关联的所有值。</p><p>像往常一样，让我们为正确性单元测试这个方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`converts list of maps to maps grouped by key using fold method\`() {
    assertEquals(expectedMap, groupByUsingFoldMethod(listOfMaps))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过使用我们的辅助方法，我们可以确保我们获得一个精确地将所有键与值列表关联的映射。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了在Kotlin中将列表中的映射转换为按键分组的列表映射的不同方法。第一种方法使用经典的_for()_循环。另一方面，其他方法依赖于Kotlin的内置方法，如_fold()_和_groupBy()_方法。我们可以根据需要在项目中舒适地采用这些解决方案。</p><p>正如往常一样，本文中使用的代码可在GitHub上找到。</p>`,31),l=[o];function s(r,d){return a(),t("div",null,l)}const c=e(i,[["render",s],["__file","2024-07-11-Converting a List of Maps to a Map Grouped by Key in Kotlin.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Converting%20a%20List%20of%20Maps%20to%20a%20Map%20Grouped%20by%20Key%20in%20Kotlin.html","title":"Kotlin中将列表中的映射转换为按键分组的映射","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Programming"],"tag":["Kotlin","List of Maps","Map Grouping"],"head":[["meta",{"name":"keywords","content":"Kotlin, Map Grouping, List of Maps, GroupBy, Fold"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Converting%20a%20List%20of%20Maps%20to%20a%20Map%20Grouped%20by%20Key%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中将列表中的映射转换为按键分组的映射"}],["meta",{"property":"og:description","content":"Kotlin中将列表中的映射转换为按键分组的映射 作为Kotlin开发者，我们经常使用列表和映射作为核心数据结构来解决不同的编程挑战。有时，我们可能需要处理列表中的映射，以获得一个不同的映射，该映射按键分组数据。也就是说，我们需要将列表中的映射转换为列表的映射。 在本教程中，我们将探索在Kotlin中将列表中的映射转换为按键分组的映射的不同方法。 2...."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T17:42:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"List of Maps"}],["meta",{"property":"article:tag","content":"Map Grouping"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T17:42:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中将列表中的映射转换为按键分组的映射\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T17:42:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中将列表中的映射转换为按键分组的映射 作为Kotlin开发者，我们经常使用列表和映射作为核心数据结构来解决不同的编程挑战。有时，我们可能需要处理列表中的映射，以获得一个不同的映射，该映射按键分组数据。也就是说，我们需要将列表中的映射转换为列表的映射。 在本教程中，我们将探索在Kotlin中将列表中的映射转换为按键分组的映射的不同方法。 2...."},"headers":[{"level":2,"title":"2. 问题解释","slug":"_2-问题解释","link":"#_2-问题解释","children":[]},{"level":2,"title":"3. 使用_for()_循环","slug":"_3-使用-for-循环","link":"#_3-使用-for-循环","children":[]},{"level":2,"title":"4. 使用_groupBy()_方法","slug":"_4-使用-groupby-方法","link":"#_4-使用-groupby-方法","children":[]},{"level":2,"title":"5. 使用_fold()_方法","slug":"_5-使用-fold-方法","link":"#_5-使用-fold-方法","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720719776000,"updatedTime":1720719776000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.94,"words":1481},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Converting a List of Maps to a Map Grouped by Key in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"<hr>\\n<h1>Kotlin中将列表中的映射转换为按键分组的映射</h1>\\n<p>作为Kotlin开发者，我们经常使用列表和映射作为核心数据结构来解决不同的编程挑战。有时，我们可能需要处理列表中的映射，以获得一个不同的映射，该映射按键分组数据。也就是说，我们需要将列表中的映射转换为列表的映射。</p>\\n<p>在本教程中，我们将探索在Kotlin中将列表中的映射转换为按键分组的映射的不同方法。</p>\\n<h2>2. 问题解释</h2>\\n<p>为了更好地理解我们试图解决的问题，让我们考虑这个示例数据，包括所有示例的输入和预期输出：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>val listOfMaps = listOf(\\n    mapOf(\\"name\\" to \\"Albert\\", \\"age\\" to \\"18\\"),\\n    mapOf(\\"name\\" to \\"Naomi\\", \\"age\\" to \\"26\\"),\\n    mapOf(\\"name\\" to \\"Dru\\", \\"age\\" to \\"18\\"),\\n    mapOf(\\"name\\" to \\"Steve\\", \\"age\\" to \\"30\\")\\n)\\nval expectedMap = mapOf(\\n    \\"name\\" to listOf(\\"Albert\\", \\"Naomi\\", \\"Dru\\", \\"Steve\\"),\\n    \\"age\\" to listOf(\\"18\\", \\"26\\", \\"18\\", \\"30\\")\\n)\\n</code></pre></div>","autoDesc":true}');export{c as comp,m as data};
