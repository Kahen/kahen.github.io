import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as t,a as n}from"./app-BMOUrRO4.js";const i={},s=n('<h1 id="将一个hashmap中的所有键和值复制到另一个hashmap中-不替换目标hashmap中的现有键和值" tabindex="-1"><a class="header-anchor" href="#将一个hashmap中的所有键和值复制到另一个hashmap中-不替换目标hashmap中的现有键和值"><span>将一个HashMap中的所有键和值复制到另一个HashMap中，不替换目标HashMap中的现有键和值</span></a></h1><p>在本教程中，我们将探讨如何在不替换目标HashMap中的键和值的情况下，将一个HashMap复制到另一个HashMap中的方法。Java中的HashMap是Map接口的哈希表实现，是一种支持存储键值对的数据结构。</p><h2 id="问题陈述" tabindex="-1"><a class="header-anchor" href="#问题陈述"><span>问题陈述</span></a></h2><p>考虑我们有两个HashMap，sourceMap和targetMap，它们包含国家及其首都城市作为键和值。我们希望将sourceMap的内容复制到targetMap中，以便我们只有一个包含所有国家及其首都城市的地图。复制应遵循以下规则：</p><ul><li>我们应该保留targetMap的原始内容</li><li>如果出现键的冲突，例如两个映射中都存在的城市，我们应该保留targetMap中的条目</li></ul><p>让我们以以下输入为例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map```````````````````````&lt;String, String&gt;``````````````````````` sourceMap = new HashMap&lt;&gt;();\nsourceMap.put(&quot;India&quot;, &quot;Delhi&quot;);\nsourceMap.put(&quot;United States&quot;, &quot;Washington D.C.&quot;);\nsourceMap.put(&quot;United Kingdom&quot;, &quot;London D.C.&quot;);\n\nMap```````````````````````&lt;String, String&gt;``````````````````````` targetMap = new HashMap&lt;&gt;();\ntargetMap.put(&quot;Zimbabwe&quot;, &quot;Harare&quot;);\ntargetMap.put(&quot;Norway&quot;, &quot;Oslo&quot;);\ntargetMap.put(&quot;United Kingdom&quot;, &quot;London&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改后的targetMap保留其值并添加了sourceMap的所有值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;India&quot;, &quot;Delhi&quot;\n&quot;United States&quot;, &quot;Washington D.C.&quot;\n&quot;United Kingdom&quot;, &quot;London&quot;\n&quot;Zimbabwe&quot;, &quot;Harare&quot;\n&quot;Norway&quot;, &quot;Oslo&quot;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="通过hashmaps迭代" tabindex="-1"><a class="header-anchor" href="#通过hashmaps迭代"><span>通过HashMaps迭代</span></a></h2><p>解决我们问题的简单方法之一是遍历sourceMap的每个条目（键值对）并与targetMap进行比较。当我们发现只存在于sourceMap中的条目时，我们将其添加到targetMap中。结果的targetMap包含它自己和sourceMap的所有键值。</p><p>我们可以通过循环遍历sourceMap的entrySet()并检查targetMap中键的存在性，而不是循环遍历两个映射的entrySets()：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map```````````````````````&lt;String, String&gt;``````````````````````` copyByIteration(Map```````````````````````&lt;String, String&gt;``````````````````````` sourceMap, Map```````````````````````&lt;String, String&gt;``````````````````````` targetMap) {\n    for (Map.Entry```````````````````````&lt;String, String&gt;``````````````````````` entry : sourceMap.entrySet()) {\n        if (!targetMap.containsKey(entry.getKey())) {\n            targetMap.put(entry.getKey(), entry.getValue());\n        }\n    }\n    return targetMap;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用map的putifabsent" tabindex="-1"><a class="header-anchor" href="#使用map的putifabsent"><span>使用Map的putIfAbsent()</span></a></h2><p>我们可以重构上述代码，使用Java 8中添加的putIfAbsent()方法。顾名思义，该方法仅在指定条目中的键在targetMap中不存在时，将sourceMap的条目复制到targetMap：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map```````````````````````&lt;String, String&gt;``````````````````````` copyUsingPutIfAbsent(Map```````````````````````&lt;String, String&gt;``````````````````````` sourceMap, Map```````````````````````&lt;String, String&gt;``````````````````````` targetMap) {\n    for (Map.Entry```````````````````````&lt;String, String&gt;``````````````````````` entry : sourceMap.entrySet()) {\n        targetMap.putIfAbsent(entry.getKey(), entry.getValue());\n    }\n    return targetMap;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不使用循环的替代方法是利用Java 8中添加的forEach结构。我们提供一个操作，在我们的情况下，是调用targetMap的putIfAbsent()方法，它对给定HashMap的每个条目执行，直到所有元素都被处理或引发异常：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map```````````````````````&lt;String, String&gt;``````````````````````` copyUsingPutIfAbsentForEach(Map```````````````````````&lt;String, String&gt;``````````````````````` sourceMap, Map```````````````````````&lt;String, String&gt;``````````````````````` targetMap) {\n    sourceMap.forEach(targetMap::putIfAbsent);\n    return targetMap;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用map的putall" tabindex="-1"><a class="header-anchor" href="#使用map的putall"><span>使用Map的putAll()</span></a></h2><p>Map接口提供了一个putAll()方法，我们可以使用它来实现我们期望的结果。该方法将输入映射的所有键和值复制到当前映射中。<strong>我们应该注意，如果源和目标哈希映射之间的键发生冲突，源映射中的条目将替换targetMap的条目</strong>。</p><p>我们可以通过从sourceMap中显式删除公共键来解决这个问题：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map```````````````````````&lt;String, String&gt;``````````````````````` copyUsingPutAll(Map```````````````````````&lt;String, String&gt;``````````````````````` sourceMap, Map```````````````````````&lt;String, String&gt;``````````````````````` targetMap) {\n    sourceMap.keySet().removeAll(targetMap.keySet());\n    targetMap.putAll(sourceMap);\n    return targetMap;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用maps的merge" tabindex="-1"><a class="header-anchor" href="#使用maps的merge"><span>使用Maps的merge()</span></a></h2><p>Java 8在Maps接口中引入了一个merge()方法。<strong>它接受一个键、一个值和一个重新映射函数作为方法参数</strong>。</p><p>假设我们在输入中指定的键在当前映射中尚未与值关联（或与null关联）。在这种情况下，该方法将其与提供的非null值关联。</p><p>**如果键在两个映射中都存在，则将关联的值替换为给定重新映射函数的结果。**如果重新映射函数的结果是null，则它将删除键值对。</p><p>我们可以使用merge()方法来复制sourceMap到targetMap的条目：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map```````````````````````&lt;String, String&gt;``````````````````````` copyUsingMapMerge(Map```````````````````````&lt;String, String&gt;``````````````````````` sourceMap, Map```````````````````````&lt;String, String&gt;``````````````````````` targetMap) {\n    sourceMap.forEach((key, value) -&gt; targetMap.merge(key, value, (oldVal, newVal) -&gt; oldVal));\n    return targetMap;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的重新映射函数确保在发生冲突时保留targetMap中的值。</p><h2 id="使用guava的maps-difference" tabindex="-1"><a class="header-anchor" href="#使用guava的maps-difference"><span>使用Guava的Maps.difference()</span></a></h2><p>Guava库在其Maps类中使用了一个difference()方法。要使用Guava库，我们应该在我们的pom.xml中添加相应的依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependency&gt;`\n    `&lt;groupId&gt;`com.google.guava`&lt;/groupId&gt;`\n    `&lt;artifactId&gt;`guava`&lt;/artifactId&gt;`\n    `&lt;version&gt;`31.0.1-jre`&lt;/version&gt;`\n`&lt;/dependency&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>difference()方法以两个映射作为输入，并计算这两个映射之间的差异。提供的映射的键应该遵守equals()和hashCode()的约定。</strong></p><p>要解决我们的问题，我们首先评估映射之间的差异。一旦我们知道只存在于sourceMap中的条目（左侧的映射），我们就将它们放入我们的targetMap：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map```````````````````````&lt;String, String&gt;``````````````````````` copyUsingGuavaMapDifference(Map```````````````````````&lt;String, String&gt;``````````````````````` sourceMap, Map```````````````````````&lt;String, String&gt;``````````````````````` targetMap) {\n    MapDifference```````````````````````&lt;String, String&gt;``````````````````````` differenceMap = Maps.difference(sourceMap, targetMap);\n    targetMap.putAll(differenceMap.entriesOnlyOnLeft());\n    return targetMap;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们探讨了在复制一个HashMap中的条目到另一个HashMap时，如何保留目标HashMap的现有条目。我们实现了基于迭代的方法，并使用不同的Java库函数解决了问题。我们还探讨了如何使用Guava库来解决问题。</p><p>像往常一样，所有代码示例都可以在GitHub上找到。</p>',38),r=[s];function l(p,d){return t(),e("div",null,r)}const g=a(i,[["render",l],["__file","2024-07-08-Copying All Keys and Values From One Hashmap Onto Another Without Replacing Existing Keys and Values.html.vue"]]),c=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Copying%20All%20Keys%20and%20Values%20From%20One%20Hashmap%20Onto%20Another%20Without%20Replacing%20Existing%20Keys%20and%20Values.html","title":"将一个HashMap中的所有键和值复制到另一个HashMap中，不替换目标HashMap中的现有键和值","lang":"zh-CN","frontmatter":{"date":"2024-07-09T00:00:00.000Z","category":["Java","HashMap"],"tag":["Java","HashMap","复制","合并"],"head":[["meta",{"name":"keywords","content":"Java, HashMap, 复制, 合并, 不替换现有键值对"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Copying%20All%20Keys%20and%20Values%20From%20One%20Hashmap%20Onto%20Another%20Without%20Replacing%20Existing%20Keys%20and%20Values.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"将一个HashMap中的所有键和值复制到另一个HashMap中，不替换目标HashMap中的现有键和值"}],["meta",{"property":"og:description","content":"将一个HashMap中的所有键和值复制到另一个HashMap中，不替换目标HashMap中的现有键和值 在本教程中，我们将探讨如何在不替换目标HashMap中的键和值的情况下，将一个HashMap复制到另一个HashMap中的方法。Java中的HashMap是Map接口的哈希表实现，是一种支持存储键值对的数据结构。 问题陈述 考虑我们有两个HashMa..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T00:07:10.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"HashMap"}],["meta",{"property":"article:tag","content":"复制"}],["meta",{"property":"article:tag","content":"合并"}],["meta",{"property":"article:published_time","content":"2024-07-09T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T00:07:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"将一个HashMap中的所有键和值复制到另一个HashMap中，不替换目标HashMap中的现有键和值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-09T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T00:07:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"将一个HashMap中的所有键和值复制到另一个HashMap中，不替换目标HashMap中的现有键和值 在本教程中，我们将探讨如何在不替换目标HashMap中的键和值的情况下，将一个HashMap复制到另一个HashMap中的方法。Java中的HashMap是Map接口的哈希表实现，是一种支持存储键值对的数据结构。 问题陈述 考虑我们有两个HashMa..."},"headers":[{"level":2,"title":"问题陈述","slug":"问题陈述","link":"#问题陈述","children":[]},{"level":2,"title":"通过HashMaps迭代","slug":"通过hashmaps迭代","link":"#通过hashmaps迭代","children":[]},{"level":2,"title":"使用Map的putIfAbsent()","slug":"使用map的putifabsent","link":"#使用map的putifabsent","children":[]},{"level":2,"title":"使用Map的putAll()","slug":"使用map的putall","link":"#使用map的putall","children":[]},{"level":2,"title":"使用Maps的merge()","slug":"使用maps的merge","link":"#使用maps的merge","children":[]},{"level":2,"title":"使用Guava的Maps.difference()","slug":"使用guava的maps-difference","link":"#使用guava的maps-difference","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720483630000,"updatedTime":1720483630000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.21,"words":1264},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Copying All Keys and Values From One Hashmap Onto Another Without Replacing Existing Keys and Values.md","localizedDate":"2024年7月9日","excerpt":"\\n<p>在本教程中，我们将探讨如何在不替换目标HashMap中的键和值的情况下，将一个HashMap复制到另一个HashMap中的方法。Java中的HashMap是Map接口的哈希表实现，是一种支持存储键值对的数据结构。</p>\\n<h2>问题陈述</h2>\\n<p>考虑我们有两个HashMap，sourceMap和targetMap，它们包含国家及其首都城市作为键和值。我们希望将sourceMap的内容复制到targetMap中，以便我们只有一个包含所有国家及其首都城市的地图。复制应遵循以下规则：</p>\\n<ul>\\n<li>我们应该保留targetMap的原始内容</li>\\n<li>如果出现键的冲突，例如两个映射中都存在的城市，我们应该保留targetMap中的条目</li>\\n</ul>","autoDesc":true}');export{g as comp,c as data};
