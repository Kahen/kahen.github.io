import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-2zDpbLgD.js";const e={},p=t(`<h1 id="在kotlin中就地修改map条目的方法" tabindex="-1"><a class="header-anchor" href="#在kotlin中就地修改map条目的方法"><span>在Kotlin中就地修改Map条目的方法</span></a></h1><p>作为开发者，我们知道Map是一种重要的数据结构，我们可以用它来完成许多编程任务。一个典型的例子可能包括就地修改Map条目。</p><p>在本教程中，我们将探索在Kotlin中就地更改或修改Map条目的各种方法。</p><h3 id="使用-mutablemap-接口" tabindex="-1"><a class="header-anchor" href="#使用-mutablemap-接口"><span>使用_MutableMap_接口</span></a></h3><p>就地修改Map条目的最简单方法是使用_MutableMap_接口。这个接口扩展了_Map_接口，并提供了额外的方法来修改Map。</p><h4 id="_2-1-使用-put-方法" tabindex="-1"><a class="header-anchor" href="#_2-1-使用-put-方法"><span>2.1. 使用_put()_方法</span></a></h4><p><strong>要修改Map条目，我们可以使用_put()_方法，该方法替换与指定键关联的值</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用put方法修改可变Map条目\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> map <span class="token operator">=</span> <span class="token function">mutableMapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;key1&quot;</span></span> <span class="token keyword">to</span> <span class="token string-literal singleline"><span class="token string">&quot;value1&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;key2&quot;</span></span> <span class="token keyword">to</span> <span class="token string-literal singleline"><span class="token string">&quot;value2&quot;</span></span><span class="token punctuation">)</span>
    map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;key1&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;new value&quot;</span></span><span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;new value&quot;</span></span><span class="token punctuation">,</span> map<span class="token punctuation">[</span><span class="token string-literal singleline"><span class="token string">&quot;key1&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码中，我们使用_mutableMapOf()_方法构建一个包含两个条目的Map。接下来，我们使用_put()_方法修改与_key1_关联的值。<strong>实际上，我们经常使用这种方法向Map添加条目，但是，当我们使用这个方法与现有键一起使用时，相应的值将被覆盖</strong>。最后，使用断言，我们可以确认_key1_与更新后的值相关联。</p><h4 id="_2-2-使用括号运算符" tabindex="-1"><a class="header-anchor" href="#_2-2-使用括号运算符"><span>2.2. 使用括号运算符</span></a></h4><p>Kotlin提供了括号运算符，这是_set()_方法的运算符重载。我们可以使用这种方法添加和修改Map条目。具体来说，我们可以使用它就地修改Map条目：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用括号运算符修改可变Map条目\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> map <span class="token operator">=</span> <span class="token function">mutableMapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;key1&quot;</span></span> <span class="token keyword">to</span> <span class="token string-literal singleline"><span class="token string">&quot;value1&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;key2&quot;</span></span> <span class="token keyword">to</span> <span class="token string-literal singleline"><span class="token string">&quot;value2&quot;</span></span><span class="token punctuation">)</span>
    map<span class="token punctuation">[</span><span class="token string-literal singleline"><span class="token string">&quot;key1&quot;</span></span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;new value&quot;</span></span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;new value&quot;</span></span><span class="token punctuation">,</span> map<span class="token punctuation">[</span><span class="token string-literal singleline"><span class="token string">&quot;key1&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们使用_括号_运算符修改与_key1_键关联的值。</p><p>这种技术是前面方法的简化版本，使用括号运算符代替_put()_方法。</p><h3 id="使用-replace-方法" tabindex="-1"><a class="header-anchor" href="#使用-replace-方法"><span>使用_replace()_方法</span></a></h3><p>此外，我们可以利用_replace()_方法替换Map中与键关联的值。这个方法接受两个参数：键和新值。如果键在Map中存在，值将被覆盖。<strong>如果键不存在，这个方法将没有效果</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用replace方法修改可变Map条目\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> map <span class="token operator">=</span> <span class="token function">mutableMapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;key1&quot;</span></span> <span class="token keyword">to</span> <span class="token string-literal singleline"><span class="token string">&quot;value1&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;key2&quot;</span></span> <span class="token keyword">to</span> <span class="token string-literal singleline"><span class="token string">&quot;value2&quot;</span></span><span class="token punctuation">)</span>
    map<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;key1&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;new value&quot;</span></span><span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;new value&quot;</span></span><span class="token punctuation">,</span> map<span class="token punctuation">[</span><span class="token string-literal singleline"><span class="token string">&quot;key1&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的单元测试中，我们使用_replace()_方法修改与_key1_键关联的值。最后，我们使用_assertEquals()_方法确保与_key1_键关联的值已正确更新。</p><h3 id="使用-compute-方法" tabindex="-1"><a class="header-anchor" href="#使用-compute-方法"><span>使用_compute()_方法</span></a></h3><p>另一种更新_Map_中的值的方法是使用_compute()_方法。<strong>_compute()_方法也接受两个参数：键和一个lambda函数</strong>。原则上，这会根据lambda函数更新与键关联的值：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用compute方法修改可变Map条目\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> map <span class="token operator">=</span> <span class="token function">mutableMapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;key1&quot;</span></span> <span class="token keyword">to</span> <span class="token string-literal singleline"><span class="token string">&quot;value1&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;key2&quot;</span></span> <span class="token keyword">to</span> <span class="token string-literal singleline"><span class="token string">&quot;value2&quot;</span></span><span class="token punctuation">)</span>
    map<span class="token punctuation">.</span><span class="token function">compute</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;key1&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> _<span class="token punctuation">,</span> _ <span class="token operator">-&gt;</span> <span class="token string-literal singleline"><span class="token string">&quot;new value&quot;</span></span> <span class="token punctuation">}</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;new value&quot;</span></span><span class="token punctuation">,</span> map<span class="token punctuation">[</span><span class="token string-literal singleline"><span class="token string">&quot;key1&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们使用_key1_键和lambda表达式调用_compute()_方法。lambda函数接受两个参数——键和与键关联的当前值。我们不使用lambda参数，所以我们用下划线替换它们，表示它们是未使用的。如果键不在Map中，lambda函数将接收_null_作为当前值。</p><p>lambda函数返回字符串“new value”，这是应该与_key1_键关联的新值。<strong>然后_compute()_方法使用lambda函数返回的新值更新与_key1_键关联的值</strong>。</p><p>值得一提的是，_compute()_方法用lambda函数返回的新值替换与键关联的当前值，无论键是否在Map中。</p><h3 id="_4-1-使用-computeifpresent-方法" tabindex="-1"><a class="header-anchor" href="#_4-1-使用-computeifpresent-方法"><span>4.1. 使用_computeIfPresent()_方法</span></a></h3><p>或者，我们可以使用_computeIfPresent()_方法在_Map_中更新值。这个方法也接受键作为参数和一个<strong>lambda函数来有条件地更新值</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用computeIfPresent方法修改可变Map条目\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> map <span class="token operator">=</span> <span class="token function">mutableMapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;key1&quot;</span></span> <span class="token keyword">to</span> <span class="token string-literal singleline"><span class="token string">&quot;value1&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;key2&quot;</span></span> <span class="token keyword">to</span> <span class="token string-literal singleline"><span class="token string">&quot;value2&quot;</span></span><span class="token punctuation">)</span>
    map<span class="token punctuation">.</span><span class="token function">computeIfPresent</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;key1&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> key<span class="token punctuation">,</span> value <span class="token operator">-&gt;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">==</span> <span class="token string-literal singleline"><span class="token string">&quot;value1&quot;</span></span><span class="token punctuation">)</span> <span class="token string-literal singleline"><span class="token string">&quot;new value&quot;</span></span>
        <span class="token keyword">else</span> value
    <span class="token punctuation">}</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;new value&quot;</span></span><span class="token punctuation">,</span> map<span class="token punctuation">[</span><span class="token string-literal singleline"><span class="token string">&quot;key1&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们希望更新与_key1_键关联的值，所以我们使用_computeIfPresent()<em>方法并提供键作为参数。此外，如果与键关联的值是</em>“value1”_，lambda函数将更新值为“new value”。否则，lambda将返回现有值。</p><p>_computeIfPresent()_方法仅在键已经在Map中时更新值。<strong>如果键不在Map中，lambda函数不会被调用，方法也没有效果</strong>。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们探索了在Kotlin中执行Map条目就地修改的多种方法。我们使用了_put()_、<em>replace()</em>、_compute()_和_computeIfPresent()_方法以及赋值运算符技术，根据我们的需求修改Map条目。</p><p>正如往常一样，本文中使用的代码可以在GitHub上找到。</p>`,32),l=[p];function o(i,c){return s(),a("div",null,l)}const k=n(e,[["render",o],["__file","2024-07-06-In Place Modification of Map Entry in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-In%20Place%20Modification%20of%20Map%20Entry%20in%20Kotlin.html","title":"在Kotlin中就地修改Map条目的方法","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Programming"],"tag":["Map","MutableMap","Kotlin"],"head":[["meta",{"name":"keywords","content":"Kotlin, Map, MutableMap, put, replace, compute, computeIfPresent"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-In%20Place%20Modification%20of%20Map%20Entry%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Kotlin中就地修改Map条目的方法"}],["meta",{"property":"og:description","content":"在Kotlin中就地修改Map条目的方法 作为开发者，我们知道Map是一种重要的数据结构，我们可以用它来完成许多编程任务。一个典型的例子可能包括就地修改Map条目。 在本教程中，我们将探索在Kotlin中就地更改或修改Map条目的各种方法。 使用_MutableMap_接口 就地修改Map条目的最简单方法是使用_MutableMap_接口。这个接口扩展..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T09:36:05.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Map"}],["meta",{"property":"article:tag","content":"MutableMap"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T09:36:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Kotlin中就地修改Map条目的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T09:36:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Kotlin中就地修改Map条目的方法 作为开发者，我们知道Map是一种重要的数据结构，我们可以用它来完成许多编程任务。一个典型的例子可能包括就地修改Map条目。 在本教程中，我们将探索在Kotlin中就地更改或修改Map条目的各种方法。 使用_MutableMap_接口 就地修改Map条目的最简单方法是使用_MutableMap_接口。这个接口扩展..."},"headers":[{"level":3,"title":"使用_MutableMap_接口","slug":"使用-mutablemap-接口","link":"#使用-mutablemap-接口","children":[]},{"level":3,"title":"使用_replace()_方法","slug":"使用-replace-方法","link":"#使用-replace-方法","children":[]},{"level":3,"title":"使用_compute()_方法","slug":"使用-compute-方法","link":"#使用-compute-方法","children":[]},{"level":3,"title":"4.1. 使用_computeIfPresent()_方法","slug":"_4-1-使用-computeifpresent-方法","link":"#_4-1-使用-computeifpresent-方法","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720258565000,"updatedTime":1720258565000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.01,"words":1204},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-In Place Modification of Map Entry in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>作为开发者，我们知道Map是一种重要的数据结构，我们可以用它来完成许多编程任务。一个典型的例子可能包括就地修改Map条目。</p>\\n<p>在本教程中，我们将探索在Kotlin中就地更改或修改Map条目的各种方法。</p>\\n<h3>使用_MutableMap_接口</h3>\\n<p>就地修改Map条目的最简单方法是使用_MutableMap_接口。这个接口扩展了_Map_接口，并提供了额外的方法来修改Map。</p>\\n<h4>2.1. 使用_put()_方法</h4>\\n<p><strong>要修改Map条目，我们可以使用_put()_方法，该方法替换与指定键关联的值</strong>：</p>","autoDesc":true}');export{k as comp,d as data};
