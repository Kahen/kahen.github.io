import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as i}from"./app-D4B8YWfq.js";const n={},r=i('<hr><h1 id="java中字符串的排列" tabindex="-1"><a class="header-anchor" href="#java中字符串的排列"><span>Java中字符串的排列</span></a></h1><p>排列是集合中元素的重新排列。换句话说，它是集合顺序的所有可能的变化。 在本教程中，我们将学习如何使用第三方库轻松地在Java中创建排列。更具体地说，我们将使用字符串的排列。 有时，我们需要检查字符串值的所有可能的排列，通常是为了令人困惑的在线编程练习，较少用于日常工作任务。例如，字符串“abc”将有六种不同的字符排列方式：“abc”，“acb”，“cab”，“bac”，“bca”，“cba”。</p><p>有几个明确定义的算法可以帮助我们为特定的字符串值创建所有可能的排列。例如，最著名的是Heap算法。然而，它非常复杂且不易直观理解。递归方法更是雪上加霜。</p><h3 id="_3-优雅的解决方案" tabindex="-1"><a class="header-anchor" href="#_3-优雅的解决方案"><span>3. 优雅的解决方案</span></a></h3><p>实现生成排列的算法将需要编写自定义逻辑。在实现中很容易出错，并且很难测试它是否长时间正确工作。此外，没有必要重写已经写好的东西。 另外，在使用字符串值时，如果不谨慎，可能会通过创建太多实例淹没字符串池。</p><p>目前提供此功能的库有：</p><ul><li>Apache Commons</li><li>Guava</li><li>CombinatoricsLib</li></ul><p>让我们尝试使用这些库查找字符串值的所有排列。<strong>我们将关注这些库是否允许延迟遍历排列以及它们如何处理输入值中的重复项。</strong></p><p>在下面的示例中，我们将使用_Helper.toCharacterList_方法。此方法封装了将字符串转换为字符列表的复杂性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>static List`````````&lt;Character&gt;````````` toCharacterList(final String string) {\n    return string.chars().mapToObj(s -&gt; ((char) s)).collect(Collectors.toList());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还将使用一个辅助方法将字符列表转换为字符串：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>static String toString(Collection`````````&lt;Character&gt;````````` collection) {\n    return collection.stream().map(s -&gt; s.toString()).collect(Collectors.joining());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-apache-commons" tabindex="-1"><a class="header-anchor" href="#_4-apache-commons"><span>4. Apache Commons</span></a></h3><p>首先，让我们向项目中添加Maven依赖项_commons-collections4_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```org.apache.commons```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```commons-collections4```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```4.5.0-M2```&lt;/version&gt;```\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总的来说，Apache提供了一个简单的API。<strong><em>CollectionUtils</em> 会立即创建排列，所以我们在处理长字符串值时应小心</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public List```````&lt;String&gt;``````` eagerPermutationWithRepetitions(final String string) {\n    final List`````````&lt;Character&gt;````````` characters = Helper.toCharacterList(string);\n    return CollectionUtils.permutations(characters)\n        .stream()\n        .map(Helper::toString)\n        .collect(Collectors.toList());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>同时，要使用延迟方法，我们应该使用_PermutationIterator_</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public List```````&lt;String&gt;``````` lazyPermutationWithoutRepetitions(final String string) {\n    final List`````````&lt;Character&gt;````````` characters = Helper.toCharacterList(string);\n    final PermutationIterator`````````&lt;Character&gt;````````` permutationIterator = new PermutationIterator&lt;&gt;(characters);\n    final List```````&lt;String&gt;``````` result = new ArrayList&lt;&gt;();\n    while (permutationIterator.hasNext()) {\n        result.add(Helper.toString(permutationIterator.next()));\n    }\n    return result;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这个库不处理重复项，所以字符串“aaaaaa”将产生720个排列，这通常不是我们想要的。</strong> 同时，<em>PermutationIterator</em> 没有获取排列数量的方法。在这种情况下，我们应该根据输入大小单独计算它们。</p><h3 id="_5-guava" tabindex="-1"><a class="header-anchor" href="#_5-guava"><span>5. Guava</span></a></h3><p>首先，让我们向项目中添加Guava库的Maven依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```com.google.guava```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```guava```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```33.0.0-jre```&lt;/version&gt;```\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Guava允许使用_Collections2_创建排列。API使用起来很直接：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public List```````&lt;String&gt;``````` permutationWithRepetitions(final String string) {\n    final List`````````&lt;Character&gt;````````` characters = Helper.toCharacterList(string);\n    return Collections2.permutations(characters).stream()\n        .map(Helper::toString)\n        .collect(Collectors.toList());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>Collections2.permutations_的结果是一个_PermutationCollection</em>，它允许轻松访问排列。<strong>所有排列都是延迟创建的。</strong></p><p><strong>此外，这个类提供了一个API，用于创建不重复的排列</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public List```````&lt;String&gt;``````` permutationWithoutRepetitions(final String string) {\n    final List`````````&lt;Character&gt;````````` characters = Helper.toCharacterList(string);\n    return Collections2.orderedPermutations(characters).stream()\n        .map(Helper::toString)\n        .collect(Collectors.toList());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，这些方法的问题是它们被标记为_@Beta_注解，这并不能保证这个API在未来版本中不会改变。</p><h3 id="_6-combinatoricslib" tabindex="-1"><a class="header-anchor" href="#_6-combinatoricslib"><span>6. CombinatoricsLib</span></a></h3><p>要在项目中使用它，让我们添加_combinatoricslib3_ Maven依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```com.github.dpaukov```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```combinatoricslib3```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```3.3.3```&lt;/version&gt;```\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然这是一个小型库，但它提供了许多组合工具，包括排列。API本身非常直观，并利用了Java流。让我们从特定的字符串或字符列表创建排列：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public List```````&lt;String&gt;``````` permutationWithoutRepetitions(final String string) {\n    List`````````&lt;Character&gt;````````` chars = Helper.toCharacterList(string);\n    return Generator.permutation(chars)\n      .simple()\n      .stream()\n      .map(Helper::toString)\n      .collect(Collectors.toList());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码创建了一个生成器，将为字符串提供排列。排列将被延迟检索。因此，我们只创建了一个生成器并计算了预期的排列数量。</p><p>同时，使用这个库，我们可以确定处理重复项的策略。如果我们使用字符串“aaaaaa”作为示例，我们将只得到一个而不是720个相同的排列。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public List```````&lt;String&gt;``````` permutationWithRepetitions(final String string) {\n    List`````````&lt;Character&gt;````````` chars = Helper.toCharacterList(string);\n    return Generator.permutation(chars)\n      .simple(TreatDuplicatesAs.IDENTICAL)\n      .stream()\n      .map(Helper::toString)\n      .collect(Collectors.toList());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_TreatDuplicatesAs_允许我们定义我们希望如何处理重复项。</p><h3 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h3><p>有很多方法可以处理组合学，特别是排列。所有这些库都可以在这方面提供很大的帮助。值得尝试它们所有的并决定哪一个适合你的需求。尽管有时人们被敦促编写他们所有的代码，但这并不明智，因为已经存在并提供良好功能的东西没有必要浪费时间。</p><p>像往常一样，示例的源代码可以在GitHub上找到。</p>',42),l=[r];function s(d,c){return a(),t("div",null,l)}const m=e(n,[["render",s],["__file","2024-07-16-Permutations of a String in Java.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Permutations%20of%20a%20String%20in%20Java.html","title":"Java中字符串的排列","lang":"zh-CN","frontmatter":{"date":"2024-07-16T00:00:00.000Z","category":["Java","编程"],"tag":["字符串","排列"],"head":[["meta",{"name":"keywords","content":"Java, 字符串排列, 第三方库"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Permutations%20of%20a%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中字符串的排列"}],["meta",{"property":"og:description","content":"Java中字符串的排列 排列是集合中元素的重新排列。换句话说，它是集合顺序的所有可能的变化。 在本教程中，我们将学习如何使用第三方库轻松地在Java中创建排列。更具体地说，我们将使用字符串的排列。 有时，我们需要检查字符串值的所有可能的排列，通常是为了令人困惑的在线编程练习，较少用于日常工作任务。例如，字符串“abc”将有六种不同的字符排列方式：“ab..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T05:06:32.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"字符串"}],["meta",{"property":"article:tag","content":"排列"}],["meta",{"property":"article:published_time","content":"2024-07-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T05:06:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中字符串的排列\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T05:06:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中字符串的排列 排列是集合中元素的重新排列。换句话说，它是集合顺序的所有可能的变化。 在本教程中，我们将学习如何使用第三方库轻松地在Java中创建排列。更具体地说，我们将使用字符串的排列。 有时，我们需要检查字符串值的所有可能的排列，通常是为了令人困惑的在线编程练习，较少用于日常工作任务。例如，字符串“abc”将有六种不同的字符排列方式：“ab..."},"headers":[{"level":3,"title":"3. 优雅的解决方案","slug":"_3-优雅的解决方案","link":"#_3-优雅的解决方案","children":[]},{"level":3,"title":"4. Apache Commons","slug":"_4-apache-commons","link":"#_4-apache-commons","children":[]},{"level":3,"title":"5. Guava","slug":"_5-guava","link":"#_5-guava","children":[]},{"level":3,"title":"6. CombinatoricsLib","slug":"_6-combinatoricslib","link":"#_6-combinatoricslib","children":[]},{"level":3,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1721106392000,"updatedTime":1721106392000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.26,"words":1279},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Permutations of a String in Java.md","localizedDate":"2024年7月16日","excerpt":"<hr>\\n<h1>Java中字符串的排列</h1>\\n<p>排列是集合中元素的重新排列。换句话说，它是集合顺序的所有可能的变化。\\n在本教程中，我们将学习如何使用第三方库轻松地在Java中创建排列。更具体地说，我们将使用字符串的排列。\\n有时，我们需要检查字符串值的所有可能的排列，通常是为了令人困惑的在线编程练习，较少用于日常工作任务。例如，字符串“abc”将有六种不同的字符排列方式：“abc”，“acb”，“cab”，“bac”，“bca”，“cba”。</p>\\n<p>有几个明确定义的算法可以帮助我们为特定的字符串值创建所有可能的排列。例如，最著名的是Heap算法。然而，它非常复杂且不易直观理解。递归方法更是雪上加霜。</p>","autoDesc":true}');export{m as comp,u as data};
