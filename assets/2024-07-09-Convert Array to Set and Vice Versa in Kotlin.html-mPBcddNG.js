import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-LwwahXlT.js";const e={},p=t(`<h1 id="kotlin中数组与set的转换-baeldung关于kotlin" tabindex="-1"><a class="header-anchor" href="#kotlin中数组与set的转换-baeldung关于kotlin"><span>Kotlin中数组与Set的转换 | Baeldung关于Kotlin</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>作为软件开发人员，我们经常需要在不同的数据结构之间进行转换，以便在各种场景中高效地管理数据。Kotlin提供了多种方法来无缝地将一种数据结构转换为另一种，例如传统的循环和内置函数。</p><p>在本教程中，我们将探讨在Kotlin中将数组和_Set_之间进行转换的不同方式。</p><p>数组是一种用于有序元素集合的数据结构，而Set通过不允许重复元素来保证其唯一性。</p><p>在这一部分，让我们看看将数组转换为Set的多种方式。</p><h3 id="_2-1-使用-toset" tabindex="-1"><a class="header-anchor" href="#_2-1-使用-toset"><span>2.1. 使用 <em>toSet()</em></span></a></h3><p>我们可以使用数组上的_toSet()_ 方法将其转换为Set。让我们看一个例子：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> arr <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> <span class="token keyword">set</span> <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">toSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">setOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">set</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><em>toSet()</em> 方法内部使用_LinkedHashSet_，确保结果集中的元素顺序与输入数组的顺序相对应</strong>。由于Set不允许重复元素，结果集可能包含的元素少于输入数组。</p><h3 id="_2-2-使用-setof" tabindex="-1"><a class="header-anchor" href="#_2-2-使用-setof"><span>2.2. 使用 <em>setOf()</em></span></a></h3><p>Kotlin提供了_setOf()_ 函数，可以从vararg创建一个Set：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> arr <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> <span class="token keyword">set</span> <span class="token operator">=</span> <span class="token function">setOf</span><span class="token punctuation">(</span><span class="token operator">*</span>arr<span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">setOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">set</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，<strong>我们通过在数组上使用展开运算符来调用_setOf()<em>方法，将其转换为_vararg</em></strong>。此外，Set保留了与数组相同的元素顺序，由_LinkedHashSet_支持。</p><h3 id="_2-3-使用-linkedhashset-构造函数" tabindex="-1"><a class="header-anchor" href="#_2-3-使用-linkedhashset-构造函数"><span>2.3. 使用 <em>LinkedHashSet</em> 构造函数</span></a></h3><p>我们可以使用_LinkedHashSet_构造函数从数组创建一个新的Set：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> arr <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> <span class="token keyword">set</span> <span class="token operator">=</span> <span class="token function">LinkedHashSet</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">setOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">set</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个实现中，我们将数组转换为列表，然后使用_LinkedHashSet_构造函数创建一个实例。然而，我们应该注意到，<strong>这种实现比其他实现的性能要低，因为需要多次转换</strong>。</p><p>如果我们不关心保持插入顺序，我们也可以使用_HashSet_。</p><h3 id="_2-4-使用循环" tabindex="-1"><a class="header-anchor" href="#_2-4-使用循环"><span>2.4. 使用循环</span></a></h3><p>将数组转换为Set的另一种方法是使用循环。我们可以使用简单的_for_循环遍历数组的元素，并将元素添加到Set中：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> arr <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> mutableSet <span class="token operator">=</span> mutableSetOf\`\`<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token keyword">in</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    mutableSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">setOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> mutableSet<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为我们在循环中添加元素，所以我们选择了一个可变的Set。</p><p><strong>虽然有直接的方法可用，但这种方法可以在将元素添加到Set之前转换元素，这在某些场景中可能很有用</strong>。</p><h2 id="_3-将-set-转换为数组" tabindex="-1"><a class="header-anchor" href="#_3-将-set-转换为数组"><span>3. 将_Set_转换为数组</span></a></h2><p>在这一部分，我们将探讨将Set转换为数组的多种方式。</p><h3 id="_3-1-使用-totypedarray" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-totypedarray"><span>3.1. 使用 <em>toTypedArray()</em></span></a></h3><p>我们可以使用_Set_上的_toTypedArray()_方法将其转换为数组。让我们看一个示例代码：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> <span class="token keyword">set</span> <span class="token operator">=</span> <span class="token function">setOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> arr <span class="token operator">=</span> <span class="token keyword">set</span><span class="token punctuation">.</span><span class="token function">toTypedArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Assertions<span class="token punctuation">.</span><span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> arr<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Kotlin根据_Set_的类型自动分配数组的类型。这在我们需要使用数组而不是集合时特别有用，提供了一种方便的转换方式。</p><h3 id="_3-2-使用-array-构造函数" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-array-构造函数"><span>3.2. 使用 <em>Array</em> 构造函数</span></a></h3><p>将_Set_转换为数组的另一种方法是使用_Array()_构造函数以及_Set_上的_elementAt()_方法：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> <span class="token keyword">set</span> <span class="token operator">=</span> <span class="token function">setOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> arr <span class="token operator">=</span> <span class="token function">Array</span><span class="token punctuation">(</span><span class="token keyword">set</span><span class="token punctuation">.</span>size<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">set</span><span class="token punctuation">.</span><span class="token function">elementAt</span><span class="token punctuation">(</span>it<span class="token punctuation">)</span> <span class="token punctuation">}</span>
Assertions<span class="token punctuation">.</span><span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> arr<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们创建了一个与Set大小相同的数组。<strong>然后，我们使用一个lambda函数来初始化数组的每个元素，使其来自_Set_中的相应元素。</strong></p><h3 id="_3-3-使用循环" tabindex="-1"><a class="header-anchor" href="#_3-3-使用循环"><span>3.3. 使用循环</span></a></h3><p>我们还可以使用循环遍历Set的元素，并将它们添加到数组中：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> <span class="token keyword">set</span> <span class="token operator">=</span> <span class="token function">setOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> arr <span class="token operator">=</span> arrayOfNulls\`\`<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>\`\`<span class="token punctuation">(</span><span class="token keyword">set</span><span class="token punctuation">.</span>size<span class="token punctuation">)</span>
<span class="token keyword">var</span> index <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span>element <span class="token keyword">in</span> <span class="token keyword">set</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    arr<span class="token punctuation">[</span>index<span class="token operator">++</span><span class="token punctuation">]</span> <span class="token operator">=</span> element
<span class="token punctuation">}</span>
Assertions<span class="token punctuation">.</span><span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> arr<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们创建了一个与Set大小相同的数组，用_null_值初始化。然后，我们遍历Set的每个元素，并将其添加到数组的相应位置。</p><p>我们也可以创建一个非空数组，并用默认值初始化它：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> arr <span class="token operator">=</span> <span class="token function">Array</span><span class="token punctuation">(</span><span class="token keyword">set</span><span class="token punctuation">.</span>size<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token number">0</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用这种方法，我们可以消除对_null_值的需求，尽管<strong>这可能会导致轻微的性能开销，尤其是在处理大型数组时</strong>。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们讨论了将数组转换为Set以及反之的各种方式。此外，我们还考察了直接转换方法和基于循环的方法。因此，根据场景，我们可以选择最合适的方法。</p><p>如常，这里使用的示例代码可以在GitHub上找到。</p>`,44),o=[p];function l(c,i){return a(),s("div",null,o)}const k=n(e,[["render",l],["__file","2024-07-09-Convert Array to Set and Vice Versa in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Convert%20Array%20to%20Set%20and%20Vice%20Versa%20in%20Kotlin.html","title":"Kotlin中数组与Set的转换 | Baeldung关于Kotlin","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","数据结构"],"tag":["Kotlin","数组","Set"],"head":[["meta",{"name":"keywords","content":"Kotlin, 数组, Set, 转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Convert%20Array%20to%20Set%20and%20Vice%20Versa%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中数组与Set的转换 | Baeldung关于Kotlin"}],["meta",{"property":"og:description","content":"Kotlin中数组与Set的转换 | Baeldung关于Kotlin 1. 引言 作为软件开发人员，我们经常需要在不同的数据结构之间进行转换，以便在各种场景中高效地管理数据。Kotlin提供了多种方法来无缝地将一种数据结构转换为另一种，例如传统的循环和内置函数。 在本教程中，我们将探讨在Kotlin中将数组和_Set_之间进行转换的不同方式。 数组是..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T22:00:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"数组"}],["meta",{"property":"article:tag","content":"Set"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T22:00:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中数组与Set的转换 | Baeldung关于Kotlin\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T22:00:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中数组与Set的转换 | Baeldung关于Kotlin 1. 引言 作为软件开发人员，我们经常需要在不同的数据结构之间进行转换，以便在各种场景中高效地管理数据。Kotlin提供了多种方法来无缝地将一种数据结构转换为另一种，例如传统的循环和内置函数。 在本教程中，我们将探讨在Kotlin中将数组和_Set_之间进行转换的不同方式。 数组是..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[{"level":3,"title":"2.1. 使用 toSet()","slug":"_2-1-使用-toset","link":"#_2-1-使用-toset","children":[]},{"level":3,"title":"2.2. 使用 setOf()","slug":"_2-2-使用-setof","link":"#_2-2-使用-setof","children":[]},{"level":3,"title":"2.3. 使用 LinkedHashSet 构造函数","slug":"_2-3-使用-linkedhashset-构造函数","link":"#_2-3-使用-linkedhashset-构造函数","children":[]},{"level":3,"title":"2.4. 使用循环","slug":"_2-4-使用循环","link":"#_2-4-使用循环","children":[]}]},{"level":2,"title":"3. 将_Set_转换为数组","slug":"_3-将-set-转换为数组","link":"#_3-将-set-转换为数组","children":[{"level":3,"title":"3.1. 使用 toTypedArray()","slug":"_3-1-使用-totypedarray","link":"#_3-1-使用-totypedarray","children":[]},{"level":3,"title":"3.2. 使用 Array 构造函数","slug":"_3-2-使用-array-构造函数","link":"#_3-2-使用-array-构造函数","children":[]},{"level":3,"title":"3.3. 使用循环","slug":"_3-3-使用循环","link":"#_3-3-使用循环","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720562454000,"updatedTime":1720562454000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4,"words":1201},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Convert Array to Set and Vice Versa in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>作为软件开发人员，我们经常需要在不同的数据结构之间进行转换，以便在各种场景中高效地管理数据。Kotlin提供了多种方法来无缝地将一种数据结构转换为另一种，例如传统的循环和内置函数。</p>\\n<p>在本教程中，我们将探讨在Kotlin中将数组和_Set_之间进行转换的不同方式。</p>\\n<p>数组是一种用于有序元素集合的数据结构，而Set通过不允许重复元素来保证其唯一性。</p>\\n<p>在这一部分，让我们看看将数组转换为Set的多种方式。</p>\\n<h3>2.1. 使用 <em>toSet()</em></h3>\\n<p>我们可以使用数组上的_toSet()_ 方法将其转换为Set。让我们看一个例子：</p>","autoDesc":true}');export{k as comp,d as data};
