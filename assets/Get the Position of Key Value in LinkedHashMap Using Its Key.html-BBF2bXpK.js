import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as n,a as i}from"./app-DnJ2tmUQ.js";const t={},s=i(`<h1 id="使用其键在linkedhashmap中获取键-值的位置-baeldung" tabindex="-1"><a class="header-anchor" href="#使用其键在linkedhashmap中获取键-值的位置-baeldung"><span>使用其键在LinkedHashMap中获取键/值的位置 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p><em>LinkedHashMap</em> 类提供了一种方便的方式来保持键值对的插入顺序，同时还提供了 <em>HashMap</em> 的功能。</p><p><strong>在本教程中，我们将探讨几种在 <em>LinkedHashMap</em> 中检索位置（索引）的方法。</strong></p><h2 id="_2-linkedhashmap-概览" tabindex="-1"><a class="header-anchor" href="#_2-linkedhashmap-概览"><span>2. <em>LinkedHashMap</em> 概览</span></a></h2><p><em>LinkedHashMap</em> 是一个 Java 类，它扩展了 <em>HashMap</em> 并维护了一个插入顺序的条目链表。这意味着 <em>LinkedHashMap</em> 中元素的顺序是可预测的，并反映了键的插入顺序。</p><p>要使用 <em>LinkedHashMap</em>，我们可以创建一个实例并用键值对填充它。以下代码片段演示了如何创建一个 <em>LinkedHashMap</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>LinkedHashMap\`\`&lt;String, Integer&gt;\`\` linkedHashMap = new LinkedHashMap&lt;&gt;();
{
    linkedHashMap.put(&quot;apple&quot;, 10);
    linkedHashMap.put(&quot;orange&quot;, 20);
    linkedHashMap.put(&quot;banana&quot;, 15);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个名为 <em>linkedHashMap</em> 的 <em>LinkedHashMap</em> 并用一些键值对填充它。</p><h2 id="_3-通过迭代条目集的方法" tabindex="-1"><a class="header-anchor" href="#_3-通过迭代条目集的方法"><span>3. 通过迭代条目集的方法</span></a></h2><p>我们可以通过迭代 <em>LinkedHashMap</em> 的 <em>Entry</em> 集来找到特定键的位置（索引）。以下测试方法说明了这种方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenLinkedHashMap_whenIteratingThroughEntrySet_thenRetrievePositionByKey() {
    int position = 0;
    for (Map.Entry\`\`&lt;String, Integer&gt;\`\` entry : linkedHashMap.entrySet()) {
        if (entry.getKey().equals(&quot;orange&quot;)) {
            assertEquals(1, position);
            return;
        }
        position++;
    }
    fail(&quot;键未找到&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试方法中，我们首先使用特定的键/值对初始化一个名为 <em>linkedHashMap</em> 的 <em>LinkedHashMap</em>。然后，我们使用循环迭代这个 <em>LinkedHashMap</em> 的条目集。在每次迭代中，我们使用 <em>entry.getKey().equals()</em> 将当前条目的键与目标键 <em>orange</em> 进行比较。</p><p><strong>当找到匹配项时，我们断言当前位置（<em>position</em>）对应于 <em>LinkedHashMap</em> 中键（<em>orange</em>）的预期索引 <em>1</em> 并成功退出方法。</strong></p><p>迭代完条目集后，如果未找到键或位置不正确，测试将失败。</p><h2 id="_4-使用-java-流" tabindex="-1"><a class="header-anchor" href="#_4-使用-java-流"><span>4. 使用 Java 流</span></a></h2><p>解决这个问题的另一种方法是使用 Java 流。这是这种方法的实现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenLinkedHashMap_whenUsingJavaStreams_thenRetrievePositionByValue() {
    Optional\`\`&lt;String&gt;\`\` key = linkedHashMap.keySet().stream()
      .filter(integer -&gt; Objects.equals(integer, &quot;orange&quot;))
      .findFirst();

    assertTrue(key.isPresent());
    key.ifPresent(s -&gt; assertEquals(1, new LinkedList&lt;&gt;(linkedHashMap.keySet()).indexOf(s)));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试方法中，我们使用 <em>linkedHashMap.keySet()</em> 方法返回 <em>LinkedHashMap</em> 中包含的键的集合。然后，我们通过在这个集合上调用 <em>stream()</em> 方法来创建键的流。</p><p>之后，我们使用 <em>filter()</em> 方法根据给定的谓词缩小流元素的范围。<strong>在这种情况下，它试图找到值为 <em>orange</em> 的键。过滤后，我们调用 <em>findFirst()</em> 方法以获取第一个匹配过滤谓词的元素。</strong></p><p><em>Optional<code>&lt;String&gt;</code></em> key 表示 <em>findFirst()</em> 的结果，它可能包含或不包含值，这取决于是否找到了匹配的键。因此，我们使用 <em>assertTrue(key.isPresent())</em> 方法。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了在 Java 中获取 <em>LinkedHashMap</em> 中键值位置的不同方法。</p><p>如常，本文的完整代码示例可以在 GitHub 上找到。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,25),d=[s];function l(r,p){return n(),a("div",null,d)}const o=e(t,[["render",l],["__file","Get the Position of Key Value in LinkedHashMap Using Its Key.html.vue"]]),c=JSON.parse('{"path":"/posts/baeldung/Archive/Get%20the%20Position%20of%20Key%20Value%20in%20LinkedHashMap%20Using%20Its%20Key.html","title":"使用其键在LinkedHashMap中获取键/值的位置 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-16T00:00:00.000Z","category":["Java","LinkedHashMap"],"tag":["Java","LinkedHashMap","编程技巧"],"description":"使用其键在LinkedHashMap中获取键/值的位置 | Baeldung 1. 引言 LinkedHashMap 类提供了一种方便的方式来保持键值对的插入顺序，同时还提供了 HashMap 的功能。 在本教程中，我们将探讨几种在 LinkedHashMap 中检索位置（索引）的方法。 2. LinkedHashMap 概览 LinkedHashMa...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Get%20the%20Position%20of%20Key%20Value%20in%20LinkedHashMap%20Using%20Its%20Key.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用其键在LinkedHashMap中获取键/值的位置 | Baeldung"}],["meta",{"property":"og:description","content":"使用其键在LinkedHashMap中获取键/值的位置 | Baeldung 1. 引言 LinkedHashMap 类提供了一种方便的方式来保持键值对的插入顺序，同时还提供了 HashMap 的功能。 在本教程中，我们将探讨几种在 LinkedHashMap 中检索位置（索引）的方法。 2. LinkedHashMap 概览 LinkedHashMa..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"LinkedHashMap"}],["meta",{"property":"article:tag","content":"编程技巧"}],["meta",{"property":"article:published_time","content":"2024-06-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用其键在LinkedHashMap中获取键/值的位置 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. LinkedHashMap 概览","slug":"_2-linkedhashmap-概览","link":"#_2-linkedhashmap-概览","children":[]},{"level":2,"title":"3. 通过迭代条目集的方法","slug":"_3-通过迭代条目集的方法","link":"#_3-通过迭代条目集的方法","children":[]},{"level":2,"title":"4. 使用 Java 流","slug":"_4-使用-java-流","link":"#_4-使用-java-流","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.45,"words":735},"filePathRelative":"posts/baeldung/Archive/Get the Position of Key Value in LinkedHashMap Using Its Key.md","localizedDate":"2024年6月16日","excerpt":"\\n<h2>1. 引言</h2>\\n<p><em>LinkedHashMap</em> 类提供了一种方便的方式来保持键值对的插入顺序，同时还提供了 <em>HashMap</em> 的功能。</p>\\n<p><strong>在本教程中，我们将探讨几种在 <em>LinkedHashMap</em> 中检索位置（索引）的方法。</strong></p>\\n<h2>2. <em>LinkedHashMap</em> 概览</h2>\\n<p><em>LinkedHashMap</em> 是一个 Java 类，它扩展了 <em>HashMap</em> 并维护了一个插入顺序的条目链表。这意味着 <em>LinkedHashMap</em> 中元素的顺序是可预测的，并反映了键的插入顺序。</p>","autoDesc":true}');export{o as comp,c as data};
