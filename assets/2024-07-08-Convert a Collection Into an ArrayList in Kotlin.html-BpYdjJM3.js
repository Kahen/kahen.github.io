import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CtR6X2Br.js";const o={},e=t('<h1 id="kotlin中将集合转换为arraylist的方法-baeldung关于kotlin的教程" tabindex="-1"><a class="header-anchor" href="#kotlin中将集合转换为arraylist的方法-baeldung关于kotlin的教程"><span>Kotlin中将集合转换为ArrayList的方法 | Baeldung关于Kotlin的教程</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在Kotlin中，我们使用集合来存储和操作一组相关对象。具体来说，<em>Collection_接口是集合层次结构的根，并且有几个类实现了它，比如_List_和_Set</em>。然而，有时我们可能需要将一个集合转换为_ArrayList_。</p><p>在本教程中，我们将探索一些在Kotlin中将_Collection_转换为_ArrayList_的方法。</p><h2 id="_2-使用-for-循环和-add-方法" tabindex="-1"><a class="header-anchor" href="#_2-使用-for-循环和-add-方法"><span>2. 使用_for_循环和_add()_方法</span></a></h2><p>将集合转换为_ArrayList_的一个直接方法是使用_for()_循环和_add()_方法：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`使用for循环和add方法将Collection转换为ArrayList`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> collection<span class="token operator">:</span> Collection````````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>```````` <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Java&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Scala&quot;</span></span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> arrayList <span class="token operator">=</span> ArrayList````````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>````````<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span>element <span class="token keyword">in</span> collection<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        arrayList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">arrayListOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Java&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Scala&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> arrayList<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们使用_listOf()_方法创建了一个字符串集合。接下来，我们遍历集合中的所有元素，并使用_add()_方法将每个元素添加到_ArrayList_中。最后，我们断言新的_ArrayList_包含了我们集合中的所有元素。</p><h2 id="_3-使用-arraylist-构造函数" tabindex="-1"><a class="header-anchor" href="#_3-使用-arraylist-构造函数"><span>3. 使用_ArrayList_构造函数</span></a></h2><p>我们还可以通过使用其构造函数将集合转换为_ArrayList_。<strong>构造函数接受一个集合作为参数，并返回一个具有与集合相同元素的_ArrayList_</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`使用ArrayList构造函数将Collection转换为ArrayList`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> collection<span class="token operator">:</span> Collection````````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>```````` <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Java&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Scala&quot;</span></span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> arrayList <span class="token operator">=</span> <span class="token function">ArrayList</span><span class="token punctuation">(</span>collection<span class="token punctuation">)</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">arrayListOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Java&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Scala&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> arrayList<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个单元测试中，我们将字符串集合传递给_ArrayList()<em>构造函数，以创建一个与原始列表具有相同元素的_ArrayList</em>。最后，我们断言数组列表包含正确的元素。</p><h2 id="_4-使用-tocollection-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-tocollection-方法"><span>4. 使用_toCollection()_方法</span></a></h2><p>另一种将集合转换为_ArrayList_的方法涉及使用_toCollection()_方法。<strong>这个方法接受一个空的_ArrayList_作为参数，它将把原始集合中的所有元素追加到_ArrayList_参数中</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`使用toCollection方法将Collection转换为ArrayList`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> collection<span class="token operator">:</span> Collection````````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>```````` <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Java&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Scala&quot;</span></span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> arrayList <span class="token operator">=</span> collection<span class="token punctuation">.</span><span class="token function">toCollection</span><span class="token punctuation">(</span><span class="token function">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">arrayListOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Java&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Scala&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> arrayList<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码中，我们使用_listOf()_方法创建了一个字符串集合。随后，我们在这些字符串集合上调用_toCollection()<em>方法，并传递一个空的_ArrayList_作为参数。这将返回一个与集合具有相同元素的_ArrayList</em>。</p><h2 id="_5-使用-arraylist-addall-方法" tabindex="-1"><a class="header-anchor" href="#_5-使用-arraylist-addall-方法"><span>5. 使用_ArrayList.addAll(_)_方法</span></a></h2><p>此外，我们可以使用_ArrayList_类的_addAll()_方法将集合的所有元素添加到一个空的_ArrayList_中：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`使用addAll方法将Collection转换为ArrayList`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> collection<span class="token operator">:</span> Collection````````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>```````` <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Java&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Scala&quot;</span></span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> arrayList <span class="token operator">=</span> ArrayList````````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>````````<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    arrayList<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>collection<span class="token punctuation">)</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">arrayListOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Java&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Scala&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> arrayList<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码片段中，我们创建了一个空的字符串_ArrayList_，并使用_addAll()_方法将一个字符串集合的所有元素添加到其中。</p><h2 id="_6-使用-mapto-方法" tabindex="-1"><a class="header-anchor" href="#_6-使用-mapto-方法"><span>6. 使用_mapTo()_方法</span></a></h2><p>要将集合转换为_ArrayList_，我们可以使用_mapTo()<em>方法，该方法接受两个参数。首先，我们需要提供我们想要创建的目标_ArrayList</em>。其次，我们需要传递一个lambda函数，该函数将原始集合中的每个元素映射到目标_ArrayList_中的相应元素：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`使用mapTo方法将Collection转换为ArrayList`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> collection<span class="token operator">:</span> Collection````````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>```````` <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Java&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Scala&quot;</span></span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> arrayList <span class="token operator">=</span> ArrayList````````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>````````<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    collection<span class="token punctuation">.</span><span class="token function">mapTo</span><span class="token punctuation">(</span>arrayList<span class="token punctuation">)</span> <span class="token punctuation">{</span> it <span class="token punctuation">}</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">arrayListOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Java&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Scala&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> arrayList<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码片段中，我们使用恒等函数作为映射函数。<strong>这个lambda函数返回每个元素不变</strong>，因此，这是一个简单高效的将元素从原始集合映射到目标_ArrayList_的方法。</p><p>最后，我们使用_assertEquals()_方法来验证转换后的_ArrayList_是否包含预期的元素。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们探讨了在Kotlin中将集合转换为_ArrayList_的各种方法。虽然有些方法比其他方法更高效和简洁，但重要的是要注意每种方法都是有效的。在选择采用哪种方法时，我们应该考虑应用程序的上下文和要求。</p><p>正如往常一样，本文中使用的代码可以在GitHub上找到。</p>',28),l=[e];function p(i,c){return a(),s("div",null,l)}const k=n(o,[["render",p],["__file","2024-07-08-Convert a Collection Into an ArrayList in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Convert%20a%20Collection%20Into%20an%20ArrayList%20in%20Kotlin.html","title":"Kotlin中将集合转换为ArrayList的方法 | Baeldung关于Kotlin的教程","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin"],"tag":["Collection","ArrayList"],"head":[["meta",{"name":"keywords","content":"Kotlin, Collection, ArrayList, Conversion"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Convert%20a%20Collection%20Into%20an%20ArrayList%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中将集合转换为ArrayList的方法 | Baeldung关于Kotlin的教程"}],["meta",{"property":"og:description","content":"Kotlin中将集合转换为ArrayList的方法 | Baeldung关于Kotlin的教程 1. 引言 在Kotlin中，我们使用集合来存储和操作一组相关对象。具体来说，Collection_接口是集合层次结构的根，并且有几个类实现了它，比如_List_和_Set。然而，有时我们可能需要将一个集合转换为_ArrayList_。 在本教程中，我们将探..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T06:59:12.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Collection"}],["meta",{"property":"article:tag","content":"ArrayList"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T06:59:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中将集合转换为ArrayList的方法 | Baeldung关于Kotlin的教程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T06:59:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中将集合转换为ArrayList的方法 | Baeldung关于Kotlin的教程 1. 引言 在Kotlin中，我们使用集合来存储和操作一组相关对象。具体来说，Collection_接口是集合层次结构的根，并且有几个类实现了它，比如_List_和_Set。然而，有时我们可能需要将一个集合转换为_ArrayList_。 在本教程中，我们将探..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用_for_循环和_add()_方法","slug":"_2-使用-for-循环和-add-方法","link":"#_2-使用-for-循环和-add-方法","children":[]},{"level":2,"title":"3. 使用_ArrayList_构造函数","slug":"_3-使用-arraylist-构造函数","link":"#_3-使用-arraylist-构造函数","children":[]},{"level":2,"title":"4. 使用_toCollection()_方法","slug":"_4-使用-tocollection-方法","link":"#_4-使用-tocollection-方法","children":[]},{"level":2,"title":"5. 使用_ArrayList.addAll(_)_方法","slug":"_5-使用-arraylist-addall-方法","link":"#_5-使用-arraylist-addall-方法","children":[]},{"level":2,"title":"6. 使用_mapTo()_方法","slug":"_6-使用-mapto-方法","link":"#_6-使用-mapto-方法","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720421952000,"updatedTime":1720421952000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.52,"words":1057},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Convert a Collection Into an ArrayList in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在Kotlin中，我们使用集合来存储和操作一组相关对象。具体来说，<em>Collection_接口是集合层次结构的根，并且有几个类实现了它，比如_List_和_Set</em>。然而，有时我们可能需要将一个集合转换为_ArrayList_。</p>\\n<p>在本教程中，我们将探索一些在Kotlin中将_Collection_转换为_ArrayList_的方法。</p>\\n<h2>2. 使用_for_循环和_add()_方法</h2>\\n<p>将集合转换为_ArrayList_的一个直接方法是使用_for()_循环和_add()_方法：</p>\\n<div class=\\"language-kotlin\\" data-ext=\\"kt\\" data-title=\\"kt\\"><pre class=\\"language-kotlin\\"><code><span class=\\"token annotation builtin\\">@Test</span>\\n<span class=\\"token keyword\\">fun</span> <span class=\\"token function\\">`使用for循环和add方法将Collection转换为ArrayList`</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">val</span> collection<span class=\\"token operator\\">:</span> Collection````````<span class=\\"token operator\\">&lt;</span>String<span class=\\"token operator\\">&gt;</span>```````` <span class=\\"token operator\\">=</span> <span class=\\"token function\\">listOf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"Kotlin\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"Java\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"Scala\\"</span></span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">val</span> arrayList <span class=\\"token operator\\">=</span> ArrayList````````<span class=\\"token operator\\">&lt;</span>String<span class=\\"token operator\\">&gt;</span>````````<span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span>element <span class=\\"token keyword\\">in</span> collection<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        arrayList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span>element<span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token function\\">arrayListOf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"Kotlin\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"Java\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"Scala\\"</span></span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> arrayList<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
