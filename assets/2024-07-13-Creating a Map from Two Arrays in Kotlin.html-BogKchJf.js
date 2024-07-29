import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BUAgDejY.js";const p={},e=t(`<h1 id="kotlin中从两个数组创建map的多种方法" tabindex="-1"><a class="header-anchor" href="#kotlin中从两个数组创建map的多种方法"><span>Kotlin中从两个数组创建Map的多种方法</span></a></h1><p>在Kotlin中，一个_Map_是一个键值对集合，每个键都是唯一的。我们可以通过使用键作为索引来访问与键关联的值。当然，我们可能会遇到需要从两个数组创建一个map的情况。简单来说，我们使用一个数组的值作为map的键，另一个数组的值作为map的值。</p><p>在本教程中，我们将探索在Kotlin中从两个数组创建map的各种方法。</p><h2 id="_2-假设" tabindex="-1"><a class="header-anchor" href="#_2-假设"><span>2. 假设</span></a></h2><p>为了有效地从两个数组创建一个map，我们需要强调一些假设和边缘情况，这些将指导我们很快要查看的解决方案：</p><ul><li>我们应该期望我们讨论的两个数组长度相同。</li><li>第一个数组包含键，第二个数组包含相应的值。</li><li>构成map键的数组包含唯一元素。如果遇到重复元素，map中的最新键将覆盖具有相同键的先前条目。</li></ul><h2 id="_3-使用-for-循环" tabindex="-1"><a class="header-anchor" href="#_3-使用-for-循环"><span>3. 使用_for()_循环</span></a></h2><p>_for()<em>循环是创建两个数组map的直接方法。**我们可以通过创建一个辅助方法来实现，该方法接受两个数组作为参数并返回一个_Map</em>**：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">createMap</span><span class="token punctuation">(</span>keys<span class="token operator">:</span> Array\`<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>\`<span class="token punctuation">,</span> values<span class="token operator">:</span> Array\`<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>\`<span class="token punctuation">)</span><span class="token operator">:</span> Map\`\`<span class="token operator">&lt;</span>String<span class="token punctuation">,</span> Int<span class="token operator">&gt;</span>\`\` <span class="token punctuation">{</span>
    <span class="token keyword">val</span> map <span class="token operator">=</span> mutableMapOf\`\`<span class="token operator">&lt;</span>String<span class="token punctuation">,</span> Int<span class="token operator">&gt;</span>\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token keyword">in</span> keys<span class="token punctuation">.</span>indices<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        map<span class="token punctuation">[</span>keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> values<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> map
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们使用_mutableMapOf()<em>方法创建了一个空的_MutableMap</em>。接下来，我们使用_for()_循环遍历两个数组的索引，并将每个键值对添加到map中。</p><p>测试我们的代码始终是一个好的实践，以确保它正确工作：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`creates a map from two arrays using a custom approach\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> keys <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> values <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

    <span class="token keyword">val</span> map <span class="token operator">=</span> <span class="token function">createMap</span><span class="token punctuation">(</span>keys<span class="token punctuation">,</span> values<span class="token punctuation">)</span>
    <span class="token keyword">val</span> expected <span class="token operator">=</span> <span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span> <span class="token keyword">to</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span> <span class="token keyword">to</span> <span class="token number">3</span><span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> map<span class="token punctuation">.</span>size<span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> map<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从这个单元测试中，我们看到我们正在构建一个具有_String_键和_Int_值的_Map_。</p><h2 id="_4-使用-zip-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-zip-方法"><span>4. 使用_zip()_方法</span></a></h2><p>内置的_zip()<em>方法为我们的问题提供了另一个简单的解决方案。**它操作一个_Array</em>，接受另一个_Array_作为参数，并返回一个对列表，该列表可以使用_toMap()<em>方法转换为_Map</em>**：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`creates a map from two arrays using zip() method\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> keys <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> values <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

    <span class="token keyword">val</span> map <span class="token operator">=</span> keys<span class="token punctuation">.</span><span class="token function">zip</span><span class="token punctuation">(</span>values<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> expected <span class="token operator">=</span> <span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span> <span class="token keyword">to</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span> <span class="token keyword">to</span> <span class="token number">3</span><span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> map<span class="token punctuation">.</span>size<span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> map<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如前面解释的，我们使用_zip()_方法与两个数组结合，并使用_toMap()_方法来获取我们的map。注意断言语句，它们向我们展示了map中每个键的预期值。</p><h2 id="_5-使用-associatewith-方法" tabindex="-1"><a class="header-anchor" href="#_5-使用-associatewith-方法"><span>5. 使用_associateWith()_方法</span></a></h2><p>第三，我们可以利用_associateWith()_方法从两个数组创建map。<strong>此方法通过索引将键数组中的每个键与值数组中的相应值关联起来创建map</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`creates a map from two arrays using the associateWith() method\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> keys <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> values <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

    <span class="token keyword">val</span> map <span class="token operator">=</span> keys<span class="token punctuation">.</span><span class="token function">associateWith</span> <span class="token punctuation">{</span> key <span class="token operator">-&gt;</span> values<span class="token punctuation">[</span>keys<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token punctuation">}</span>
    <span class="token keyword">val</span> expected <span class="token operator">=</span> <span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span> <span class="token keyword">to</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span> <span class="token keyword">to</span> <span class="token number">3</span><span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> map<span class="token punctuation">.</span>size<span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> map<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个单元测试中，我们使用_associateWith()_方法通过将键数组中的每个键与第二个数组中的相应值关联起来来创建map。最后，我们使用断言语句确保正确的值映射到第一个数组中的特定键。</p><p>与其他方法不同，这种方法对处理重复键的方式不同。<strong>当遇到重复键时，它不会用现有map条目替换，而是保留第一个map条目</strong>。这是因为它使用了_indexOf()_方法，该方法始终返回每个键的第一个索引。</p><h2 id="_6-使用-mapindexed-方法" tabindex="-1"><a class="header-anchor" href="#_6-使用-mapindexed-方法"><span>6. 使用_mapIndexed()_方法</span></a></h2><p>我们还可以使用_mapIndexed()_方法从两个数组创建map。<strong>此方法接受一个lambda函数，然后将其应用于原始数组的每个元素</strong>。最后，它返回键值对列表：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`creates a map from two arrays using the mapIndexed() method\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> keys <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> values <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

    <span class="token keyword">val</span> pairs <span class="token operator">=</span> keys<span class="token punctuation">.</span><span class="token function">mapIndexed</span> <span class="token punctuation">{</span> index<span class="token punctuation">,</span> key <span class="token operator">-&gt;</span> key <span class="token keyword">to</span> values<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token punctuation">}</span>

    <span class="token keyword">val</span> map <span class="token operator">=</span> pairs<span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> expected <span class="token operator">=</span> <span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span> <span class="token keyword">to</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span> <span class="token keyword">to</span> <span class="token number">3</span><span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> map<span class="token punctuation">.</span>size<span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> map<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码片段展示了我们如何通过调用_mapIndexed()_方法在第一个数组上获得一对列表。此外，我们向该方法提供了一个lambda函数，该函数使用它们的索引将一个键映射到第二个数组中的相应值。最后，我们使用_toMap()_方法将一对列表转换为map。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们探索了在Kotlin中从两个数组创建map的各种方式。虽然基于循环的方法更加灵活，但其他方法提供了简单和优雅。</p><p>例如，_zip()_方法非常简单，而_associateWith()_和_mapIndex()_方法则更加简洁。因此，选择最适合我们项目用例的方法非常重要。根据项目的复杂性，一种方法可能比另一种方法更适合。</p><p>如常，本文中使用的代码可以在GitHub上找到。</p>`,30),o=[e];function l(i,c){return a(),s("div",null,o)}const k=n(p,[["render",l],["__file","2024-07-13-Creating a Map from Two Arrays in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Creating%20a%20Map%20from%20Two%20Arrays%20in%20Kotlin.html","title":"Kotlin中从两个数组创建Map的多种方法","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin"],"tag":["Map","Arrays"],"head":[["meta",{"name":"keywords","content":"Kotlin, Map, Arrays, create map, two arrays"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Creating%20a%20Map%20from%20Two%20Arrays%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中从两个数组创建Map的多种方法"}],["meta",{"property":"og:description","content":"Kotlin中从两个数组创建Map的多种方法 在Kotlin中，一个_Map_是一个键值对集合，每个键都是唯一的。我们可以通过使用键作为索引来访问与键关联的值。当然，我们可能会遇到需要从两个数组创建一个map的情况。简单来说，我们使用一个数组的值作为map的键，另一个数组的值作为map的值。 在本教程中，我们将探索在Kotlin中从两个数组创建map的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T02:54:41.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Map"}],["meta",{"property":"article:tag","content":"Arrays"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T02:54:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中从两个数组创建Map的多种方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T02:54:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中从两个数组创建Map的多种方法 在Kotlin中，一个_Map_是一个键值对集合，每个键都是唯一的。我们可以通过使用键作为索引来访问与键关联的值。当然，我们可能会遇到需要从两个数组创建一个map的情况。简单来说，我们使用一个数组的值作为map的键，另一个数组的值作为map的值。 在本教程中，我们将探索在Kotlin中从两个数组创建map的..."},"headers":[{"level":2,"title":"2. 假设","slug":"_2-假设","link":"#_2-假设","children":[]},{"level":2,"title":"3. 使用_for()_循环","slug":"_3-使用-for-循环","link":"#_3-使用-for-循环","children":[]},{"level":2,"title":"4. 使用_zip()_方法","slug":"_4-使用-zip-方法","link":"#_4-使用-zip-方法","children":[]},{"level":2,"title":"5. 使用_associateWith()_方法","slug":"_5-使用-associatewith-方法","link":"#_5-使用-associatewith-方法","children":[]},{"level":2,"title":"6. 使用_mapIndexed()_方法","slug":"_6-使用-mapindexed-方法","link":"#_6-使用-mapindexed-方法","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720839281000,"updatedTime":1720839281000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.41,"words":1323},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Creating a Map from Two Arrays in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>在Kotlin中，一个_Map_是一个键值对集合，每个键都是唯一的。我们可以通过使用键作为索引来访问与键关联的值。当然，我们可能会遇到需要从两个数组创建一个map的情况。简单来说，我们使用一个数组的值作为map的键，另一个数组的值作为map的值。</p>\\n<p>在本教程中，我们将探索在Kotlin中从两个数组创建map的各种方法。</p>\\n<h2>2. 假设</h2>\\n<p>为了有效地从两个数组创建一个map，我们需要强调一些假设和边缘情况，这些将指导我们很快要查看的解决方案：</p>\\n<ul>\\n<li>我们应该期望我们讨论的两个数组长度相同。</li>\\n<li>第一个数组包含键，第二个数组包含相应的值。</li>\\n<li>构成map键的数组包含唯一元素。如果遇到重复元素，map中的最新键将覆盖具有相同键的先前条目。</li>\\n</ul>","autoDesc":true}');export{k as comp,d as data};
