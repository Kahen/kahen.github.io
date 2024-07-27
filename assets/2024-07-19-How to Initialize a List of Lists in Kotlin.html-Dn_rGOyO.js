import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as s,a as i}from"./app-CBerKIce.js";const a={},n=i(`<hr><h1 id="如何在-kotlin-中初始化列表的列表" tabindex="-1"><a class="header-anchor" href="#如何在-kotlin-中初始化列表的列表"><span>如何在 Kotlin 中初始化列表的列表</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>要有效地使用 Kotlin，了解如何初始化列表的列表是重要的。也被称为二维数组或矩阵，列表的列表是一种数据结构，定义为一个列表，其中的每个元素本身是一个列表。</p><p>在本教程中，我们将探索在 Kotlin 中初始化列表的列表的几种方法。</p><h2 id="_2-什么是列表的列表" tabindex="-1"><a class="header-anchor" href="#_2-什么是列表的列表"><span>2. 什么是列表的列表？</span></a></h2><p>在大多数编程语言中，包括 Kotlin，列表的列表被实现为二维数组：</p><h2 id="" tabindex="-1"><a class="header-anchor" href="#"><span><img src="https://www.baeldung.com/wp-content/uploads/sites/5/2024/01/Screenshot-2024-01-13-at-02.58.36-300x162.png" alt="img" loading="lazy"></span></a></h2><p>在上面的图形表示中，<strong>外层列表代表行，内层列表代表列</strong>。</p><h2 id="_3-使用-listof-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用-listof-方法"><span>3. 使用 <em>listOf()</em> 方法</span></a></h2><p>我们将探索的第一种方法使用 <em>listOf()</em> 方法。<strong>我们可以利用这种方法创建一个不可变的列表的列表</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`Creates an immutable list of immutable lists using listOf()\`() {
    val listOfLists = listOf(listOf(1, 2), listOf(3, 4), listOf(5, 6))

    assertEquals(3, listOfLists.size)
    assertEquals(listOf(1, 2), listOfLists[0])
    assertEquals(listOf(3, 4), listOfLists[1])
    assertEquals(listOf(5, 6), listOfLists[2])
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述单元测试中，我们使用 <em>listOf()</em> 方法创建了包含三个列表的列表，每个列表包含两个整数。随后，我们验证列表恰好包含三个列表，并确保每个内部列表包含正确的元素。</p><p><strong><em>listOf()</em> 允许我们为每个子列表指定唯一的值</strong>。</p><h2 id="_4-使用-list-构造器" tabindex="-1"><a class="header-anchor" href="#_4-使用-list-构造器"><span>4. 使用 List 构造器</span></a></h2><p>另一种初始化列表的列表的方法是使用 <em>List</em> 或 <em>MutableList</em> 构造器，这取决于我们是否需要一个可变的或不可变的列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`Creates an immutable list of mutable lists using List constructor\`() {
    val listOfLists = List(3) { MutableList\`\`&lt;Int&gt;\`\`(2) {0} }
    assertEquals(3, listOfLists.size)
    assertEquals(listOf(0, 0), listOfLists[0])
    assertEquals(listOf(0, 0), listOfLists[1])
    assertEquals(listOf(0, 0), listOfLists[2])
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个包含三个空的可变列表的不可变列表，类型为 <em>Integer</em>。然后我们断言恰好有三个内部列表，每个列表恰好有两个整数，全部为零。</p><p>与 <em>listOf()</em> 不同，<strong>使用 <em>List</em> 构造器将导致子列表具有相同的项目</strong>。</p><h2 id="_5-使用-map-方法" tabindex="-1"><a class="header-anchor" href="#_5-使用-map-方法"><span>5. 使用 <em>map()</em> 方法</span></a></h2><p>第三种实现目标的方法是使用 <em>map()</em> 方法。我们使用这种方法创建包含可变或不可变列表的列表，尽管我们获得的父列表是不可变的。</p><h3 id="_5-1-创建不可变列表的列表" tabindex="-1"><a class="header-anchor" href="#_5-1-创建不可变列表的列表"><span>5.1. 创建不可变列表的列表</span></a></h3><p>让我们使用 <em>map()</em> 方法创建包含三个内部不可变列表的列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`Creates an immutable list of immutable lists using map method\`() {
    val listOfLists = (0..2).map { _ -&gt; (0..1).map { 0 } }

    assertEquals(3, listOfLists.size)
    assertEquals(listOf(0, 0), listOfLists[0])
    assertEquals(listOf(0, 0), listOfLists[1])
    assertEquals(listOf(0, 0), listOfLists[2])
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们使用 “…” 运算符创建从零到二的整数范围，然后使用 <em>map()</em> 方法和一个匿名函数，该函数接受一个下划线作为其参数并返回另一个包含两个零的列表。</p><p>由于我们的外部 <em>map()</em> 方法运行三次，内部 <em>map()</em> 函数也将运行三次，在每一步中将创建一个包含两个零的子列表。最后，我们断言我们的列表恰好有三个子列表，每个子列表包含两个零。</p><p>就像 <em>List</em> 构造器一样，<strong><em>map()</em> 限制我们用相同的项目初始化子列表</strong>。</p><h3 id="_5-2-创建可变列表的列表" tabindex="-1"><a class="header-anchor" href="#_5-2-创建可变列表的列表"><span>5.2. 创建可变列表的列表</span></a></h3><p>仍然使用 <em>map()</em> 方法，我们也可以创建 <em>List</em> 的 <em>MutableLists</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`Creates an immutable list of mutable lists using map method\`() {
    val listOfMutableLists = (0..2).map { mutableListOf\`\`&lt;Int&gt;\`\`() }

    assertEquals(3, listOfMutableLists.size)
    assertTrue(listOfMutableLists.all { it.isEmpty() })
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们使用 <em>map()</em> 方法在零到二的范围内，并提供一个 lambda 表达式，创建三个可变列表。对于每次执行，lambda 将返回一个新的空可变列表。lambda 将总共执行三次。<strong>这种方法允许我们创建空的子列表</strong>。</p><p>最后，我们断言我们的列表恰好包含三个子列表，每个子列表都是空的。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探索了在 Kotlin 中初始化列表的列表的各种方法。</p><p>虽然一些方法限制我们用相同的元素初始化每个子列表，如 <em>map()</em> 方法，但像 <em>listOf()</em> 方法这样的方法则允许我们控制每个单独元素的值。</p><p>一如既往，本文中使用的代码可以在 GitHub 上找到。</p>`,36),l=[n];function r(d,o){return s(),t("div",null,l)}const c=e(a,[["render",r],["__file","2024-07-19-How to Initialize a List of Lists in Kotlin.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-How%20to%20Initialize%20a%20List%20of%20Lists%20in%20Kotlin.html","title":"如何在 Kotlin 中初始化列表的列表","lang":"zh-CN","frontmatter":{"date":"2024-01-13T00:00:00.000Z","category":["Kotlin"],"tag":["Kotlin","Lists","Arrays"],"head":[["meta",{"name":"keywords","content":"Kotlin, Lists of Lists, Arrays, Data Structures"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-How%20to%20Initialize%20a%20List%20of%20Lists%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在 Kotlin 中初始化列表的列表"}],["meta",{"property":"og:description","content":"如何在 Kotlin 中初始化列表的列表 1. 引言 要有效地使用 Kotlin，了解如何初始化列表的列表是重要的。也被称为二维数组或矩阵，列表的列表是一种数据结构，定义为一个列表，其中的每个元素本身是一个列表。 在本教程中，我们将探索在 Kotlin 中初始化列表的列表的几种方法。 2. 什么是列表的列表？ 在大多数编程语言中，包括 Kotlin，列..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/sites/5/2024/01/Screenshot-2024-01-13-at-02.58.36-300x162.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T15:35:20.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Lists"}],["meta",{"property":"article:tag","content":"Arrays"}],["meta",{"property":"article:published_time","content":"2024-01-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T15:35:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在 Kotlin 中初始化列表的列表\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/sites/5/2024/01/Screenshot-2024-01-13-at-02.58.36-300x162.png\\"],\\"datePublished\\":\\"2024-01-13T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T15:35:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在 Kotlin 中初始化列表的列表 1. 引言 要有效地使用 Kotlin，了解如何初始化列表的列表是重要的。也被称为二维数组或矩阵，列表的列表是一种数据结构，定义为一个列表，其中的每个元素本身是一个列表。 在本教程中，我们将探索在 Kotlin 中初始化列表的列表的几种方法。 2. 什么是列表的列表？ 在大多数编程语言中，包括 Kotlin，列..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 什么是列表的列表？","slug":"_2-什么是列表的列表","link":"#_2-什么是列表的列表","children":[]},{"level":2,"title":"","slug":"","link":"#","children":[]},{"level":2,"title":"3. 使用 listOf() 方法","slug":"_3-使用-listof-方法","link":"#_3-使用-listof-方法","children":[]},{"level":2,"title":"4. 使用 List 构造器","slug":"_4-使用-list-构造器","link":"#_4-使用-list-构造器","children":[]},{"level":2,"title":"5. 使用 map() 方法","slug":"_5-使用-map-方法","link":"#_5-使用-map-方法","children":[{"level":3,"title":"5.1. 创建不可变列表的列表","slug":"_5-1-创建不可变列表的列表","link":"#_5-1-创建不可变列表的列表","children":[]},{"level":3,"title":"5.2. 创建可变列表的列表","slug":"_5-2-创建可变列表的列表","link":"#_5-2-创建可变列表的列表","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721403320000,"updatedTime":1721403320000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.74,"words":1122},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-How to Initialize a List of Lists in Kotlin.md","localizedDate":"2024年1月13日","excerpt":"<hr>\\n<h1>如何在 Kotlin 中初始化列表的列表</h1>\\n<h2>1. 引言</h2>\\n<p>要有效地使用 Kotlin，了解如何初始化列表的列表是重要的。也被称为二维数组或矩阵，列表的列表是一种数据结构，定义为一个列表，其中的每个元素本身是一个列表。</p>\\n<p>在本教程中，我们将探索在 Kotlin 中初始化列表的列表的几种方法。</p>\\n<h2>2. 什么是列表的列表？</h2>\\n<p>在大多数编程语言中，包括 Kotlin，列表的列表被实现为二维数组：</p>\\n<h2><img src=\\"https://www.baeldung.com/wp-content/uploads/sites/5/2024/01/Screenshot-2024-01-13-at-02.58.36-300x162.png\\" alt=\\"img\\" loading=\\"lazy\\"></h2>","autoDesc":true}');export{c as comp,u as data};
