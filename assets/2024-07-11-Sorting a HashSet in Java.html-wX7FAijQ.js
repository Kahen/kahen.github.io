import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as s}from"./app-YddbDb53.js";const n={},r=s('<hr><h1 id="java中对hashset进行排序-baeldung" tabindex="-1"><a class="header-anchor" href="#java中对hashset进行排序-baeldung"><span>Java中对HashSet进行排序 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><em>HashSet</em> 是来自 <em>java.util</em> 包的集合类。此类继承自 <em>AbstractSet</em> 类并实现了 <em>Set</em> 接口。此外，<em>HashSet</em> 不保留元素的顺序，因此需要找到对这些元素进行排序的方法。</p><p>在这个快速教程中，<strong>我们将学习多种对 <em>HashSet</em> 元素进行排序的技术</strong>。</p><h2 id="_2-使用-collections-sort-方法" tabindex="-1"><a class="header-anchor" href="#_2-使用-collections-sort-方法"><span>2. 使用 <em>Collections.sort()</em> 方法</span></a></h2><p><em>Collections.sort()</em> 方法对实现 <em>java.util.List</em> 接口的对象集合进行排序。因此，我们可以将我们的 <em>HashSet</em> 转换为 <em>List</em>，然后使用 <em>Collections.sort()</em> 进行排序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>HashSet`````&lt;Integer&gt;````` numberHashSet = new HashSet&lt;&gt;();\nnumberHashSet.add(2);\nnumberHashSet.add(1);\nnumberHashSet.add(4);\nnumberHashSet.add(3);\n\n// 将HashSet转换为arraylist\nArrayList arrayList = new ArrayList(numberHashSet);\n\n// 对列表进行排序\nCollections.sort(arrayList);\n\nassertThat(arrayList).containsExactly(1, 2, 3, 4);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们首先将 <em>HashSet</em> 中的元素复制到 <em>ArrayList</em> 中。然后，我们将 <em>ArrayList</em> 作为 <em>Collections.sort()</em> 方法的参数。除了 <em>ArrayList</em>，我们还可以使用 <em>LinkedList</em> 或 <em>Vector</em>。</p><h2 id="_3-使用-treeset" tabindex="-1"><a class="header-anchor" href="#_3-使用-treeset"><span>3. 使用 <em>TreeSet</em></span></a></h2><p>使用这种方法，我们将 <em>HashSet</em> 转换为 <em>TreeSet</em>，它与 <em>HashSet</em> 类似，只是它将元素存储在升序中。因此，<strong>当 <em>HashSet</em> 转换为 <em>TreeSet</em> 时，<em>HashSet</em> 元素会被排序</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>HashSet`````&lt;Integer&gt;````` numberHashSet = new HashSet&lt;&gt;();\nnumberHashSet.add(2);\nnumberHashSet.add(1);\nnumberHashSet.add(4);\nnumberHashSet.add(3);\n\nTreeSet`````&lt;Integer&gt;````` treeSet = new TreeSet&lt;&gt;();\ntreeSet.addAll(numberHashSet);\n\nassertThat(treeSet).containsExactly(1, 2, 3, 4);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到，使用 <em>TreeSet</em> 对 <em>HashSet</em> 进行排序非常简单。我们只需要使用 <em>HashSet</em> 列表作为参数创建一个 <em>TreeSet</em> 实例。</p><h2 id="_4-使用-stream-sorted-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-stream-sorted-方法"><span>4. 使用 <em>stream().sorted()</em> 方法</span></a></h2><p>使用 Stream API 的 <em>stream().sorted()</em> 方法对 <em>HashSet</em> 进行排序是一种简洁的方式。这个 API 在 Java 8 中引入，允许我们对一组元素执行函数式操作。此外，它可以从不同的集合中获取对象，并根据我们使用的管道方法以所需的方式显示它们。</p><p>在我们的示例中，<strong>我们将使用</strong> <strong><em>stream().sorted()</em> 方法，它返回一个元素按特定顺序排序的 <em>Stream</em></strong>。需要注意的是，由于原始的 <em>HashSet</em> 保持不变，我们需要将排序结果保存到一个新的 <em>Collection</em> 中。我们将使用 <em>collect()</em> 方法将数据存储回一个新的 <em>HashSet</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>HashSet`````&lt;Integer&gt;````` numberHashSet = new HashSet&lt;&gt;();\nnumberHashSet.add(200);\nnumberHashSet.add(100);\nnumberHashSet.add(400);\nnumberHashSet.add(300);\n\nHashSet`````&lt;Integer&gt;````` sortedHashSet = numberHashSet.stream()\n  .sorted()\n  .collect(Collectors.toCollection(LinkedHashSet::new));\n\nassertThat(sortedHashSet).containsExactly(100, 200, 300, 400);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意，当我们使用不带参数的 <em>stream()</em> ._ <em>sorted()</em> 方法时，它会按照自然顺序对 <em>HashSet</em> 进行排序。我们也可以重载它并使用比较器来定义自定义排序顺序。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了使用三种方式在 Java 中对 <em>HashSet</em> 进行排序：使用 <em>Collections.sort()</em> 方法、使用 <em>TreeSet</em> 和使用 <em>stream().sorted()</em> 方法。</p><p>如常，代码片段可在 GitHub 上获取。</p>',21),i=[r];function l(m,d){return a(),t("div",null,i)}const h=e(n,[["render",l],["__file","2024-07-11-Sorting a HashSet in Java.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Sorting%20a%20HashSet%20in%20Java.html","title":"Java中对HashSet进行排序 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Collections"],"tag":["HashSet","sort"],"head":[["meta",{"name":"keywords","content":"Java, Collections, HashSet, sort"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Sorting%20a%20HashSet%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中对HashSet进行排序 | Baeldung"}],["meta",{"property":"og:description","content":"Java中对HashSet进行排序 | Baeldung 1. 概述 HashSet 是来自 java.util 包的集合类。此类继承自 AbstractSet 类并实现了 Set 接口。此外，HashSet 不保留元素的顺序，因此需要找到对这些元素进行排序的方法。 在这个快速教程中，我们将学习多种对 HashSet 元素进行排序的技术。 2. 使用 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T08:01:55.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"HashSet"}],["meta",{"property":"article:tag","content":"sort"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T08:01:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中对HashSet进行排序 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T08:01:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中对HashSet进行排序 | Baeldung 1. 概述 HashSet 是来自 java.util 包的集合类。此类继承自 AbstractSet 类并实现了 Set 接口。此外，HashSet 不保留元素的顺序，因此需要找到对这些元素进行排序的方法。 在这个快速教程中，我们将学习多种对 HashSet 元素进行排序的技术。 2. 使用 ..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用 Collections.sort() 方法","slug":"_2-使用-collections-sort-方法","link":"#_2-使用-collections-sort-方法","children":[]},{"level":2,"title":"3. 使用 TreeSet","slug":"_3-使用-treeset","link":"#_3-使用-treeset","children":[]},{"level":2,"title":"4. 使用 stream().sorted() 方法","slug":"_4-使用-stream-sorted-方法","link":"#_4-使用-stream-sorted-方法","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720684915000,"updatedTime":1720684915000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.33,"words":700},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Sorting a HashSet in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中对HashSet进行排序 | Baeldung</h1>\\n<h2>1. 概述</h2>\\n<p><em>HashSet</em> 是来自 <em>java.util</em> 包的集合类。此类继承自 <em>AbstractSet</em> 类并实现了 <em>Set</em> 接口。此外，<em>HashSet</em> 不保留元素的顺序，因此需要找到对这些元素进行排序的方法。</p>\\n<p>在这个快速教程中，<strong>我们将学习多种对 <em>HashSet</em> 元素进行排序的技术</strong>。</p>\\n<h2>2. 使用 <em>Collections.sort()</em> 方法</h2>","autoDesc":true}');export{h as comp,v as data};
