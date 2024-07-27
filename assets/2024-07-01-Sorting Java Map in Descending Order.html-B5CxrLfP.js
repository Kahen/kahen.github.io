import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CBerKIce.js";const p={},e=t('<h1 id="java-map按降序排序" tabindex="-1"><a class="header-anchor" href="#java-map按降序排序"><span>Java Map按降序排序</span></a></h1><p>排序是所有编程语言中的基本操作，它允许有效地组织和检索信息。</p><p>此外，Map接口广泛用于在Java中存储键值对。然而，默认的Map迭代顺序并不总是符合应用程序的需求。通常，为了优化我们的操作，我们需要按特定顺序对数据进行排序。</p><p><strong>在本教程中，我们将探讨按键和值对Java Map进行降序排序的过程，并提供详细的解释和实际示例。</strong></p><h2 id="_2-理解map和排序" tabindex="-1"><a class="header-anchor" href="#_2-理解map和排序"><span>2. 理解Map和排序</span></a></h2><p>Java中的Map是一个接口，代表一个键值对集合。虽然数据本质上没有顺序，但有时我们需要以排序的方式显示或处理它。</p><p><strong>当按值降序排序Map时，我们需要考虑与每个键关联的值。</strong></p><h2 id="_3-使用treemap对map的键进行排序" tabindex="-1"><a class="header-anchor" href="#_3-使用treemap对map的键进行排序"><span>3. 使用TreeMap对Map的键进行排序</span></a></h2><p>TreeMap类是Java中SortedMap接口的一个排序实现。具体来说，它基于元素的自然顺序或构造函数中指定的Comparator对键进行排序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>```` sortedMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">reverseOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了证明前面的陈述，我们使用JUnit创建了一个未排序的Map，并为TreeMap的构造器提供了<strong>自定义比较器</strong>。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">given_UnsortedMap_whenUsingTreeMap_thenKeysAreInDescendingOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">SortedMap</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``` treeMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">reverseOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    treeMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    treeMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    treeMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;five&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    treeMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    treeMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;four&quot;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> treeMap<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">final</span> <span class="token class-name">Iterator</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` iterator <span class="token operator">=</span> treeMap<span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;four&quot;</span><span class="token punctuation">,</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;five&quot;</span><span class="token punctuation">,</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，Map按字母顺序对其键进行了排序。</p><h2 id="_4-使用自定义比较器对值进行排序" tabindex="-1"><a class="header-anchor" href="#_4-使用自定义比较器对值进行排序"><span>4. 使用自定义比较器对值进行排序</span></a></h2><p><strong>要按降序对Map进行排序，我们可以使用一个自定义的Comparator，它反转了值的自然顺序。</strong> 以下是一个实现示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> `<span class="token operator">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span> <span class="token keyword">extends</span> <span class="token class-name">Comparable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>`<span class="token operator">&gt;</span> <span class="token class-name">Map</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>```` <span class="token function">sortMapByValueDescending</span><span class="token punctuation">(</span><span class="token class-name">Map</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>```` map<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> map<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">sorted</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token punctuation">.</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>````<span class="token function">comparingByValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reversed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getKey</span><span class="token punctuation">,</span> <span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getValue</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>e1<span class="token punctuation">,</span> e2<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> e1<span class="token punctuation">,</span> <span class="token class-name">LinkedHashMap</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们定义了一个_sortMapByValueDescending_方法，它接受一个输入Map，并创建一个自定义Comparator，根据其值以降序比较Map.Entry对象，并初始化一个新的LinkedHashMap来保存排序后的条目。</p><p><strong>该方法通过输入Map的条目流，使用Comparator进行排序，并使用_forEach_方法将排序后的条目填充到新Map中。</strong> 结果是一个按值降序排序的Map，同时保持键值关联。</p><p>为了确保我们排序实现的正确性，我们可以利用JUnit测试。JUnit是Java应用程序广泛使用的测试框架。</p><p>让我们创建一些测试用例来验证我们的_sortMapByValueDescending_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">given_UnsortedMap_whenSortingByValueDescending_thenValuesAreInDescendingOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Map</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``` unsortedMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    unsortedMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    unsortedMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    unsortedMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;five&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    unsortedMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    unsortedMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;four&quot;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Map</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``` sortedMap <span class="token operator">=</span> <span class="token function">sortMapByValueDescending</span><span class="token punctuation">(</span>unsortedMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> sortedMap<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">final</span> <span class="token class-name">Iterator</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>` iterator <span class="token operator">=</span> sortedMap<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个测试方法来验证我们的排序方法的正确性。此外，我们定义了一个具有各种键值对的未排序Map，然后检查由我们的方法生成的排序Map是否具有正确的大小以及所有元素是否已正确排序。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>对Java Map进行降序排序是使用键值数据的程序员的一项宝贵技能。根据我们想要排序的内容，我们可以通过使用适当的Map和自定义Comparator或创建我们自己的Comparator来按值排序元素。使用<strong>TreeMap</strong>，您将能够按<strong>键</strong>对Map的元素进行排序，编写<strong>自定义Comparator</strong>，您可以定义要排序的<strong>元素，同时保持相同的键值关联</strong>。记住，平滑的过渡对于引导读者通过您的代码和解释至关重要，这增强了整体的可读性。</p><p>有了这些知识，我们可以自信地对Java Map对象进行降序排序，以优化我们的应用程序。</p><p>如往常一样，本文的完整代码示例可以在GitHub上找到。</p>',26),o=[e];function c(u,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-01-Sorting Java Map in Descending Order.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Sorting%20Java%20Map%20in%20Descending%20Order.html","title":"Java Map按降序排序","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Collections"],"tag":["Java","Map","Sorting"],"head":[["meta",{"name":"keywords","content":"Java, Map, Sorting, TreeMap, Comparator"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Sorting%20Java%20Map%20in%20Descending%20Order.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java Map按降序排序"}],["meta",{"property":"og:description","content":"Java Map按降序排序 排序是所有编程语言中的基本操作，它允许有效地组织和检索信息。 此外，Map接口广泛用于在Java中存储键值对。然而，默认的Map迭代顺序并不总是符合应用程序的需求。通常，为了优化我们的操作，我们需要按特定顺序对数据进行排序。 在本教程中，我们将探讨按键和值对Java Map进行降序排序的过程，并提供详细的解释和实际示例。 2..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T17:53:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Map"}],["meta",{"property":"article:tag","content":"Sorting"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T17:53:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java Map按降序排序\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T17:53:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java Map按降序排序 排序是所有编程语言中的基本操作，它允许有效地组织和检索信息。 此外，Map接口广泛用于在Java中存储键值对。然而，默认的Map迭代顺序并不总是符合应用程序的需求。通常，为了优化我们的操作，我们需要按特定顺序对数据进行排序。 在本教程中，我们将探讨按键和值对Java Map进行降序排序的过程，并提供详细的解释和实际示例。 2..."},"headers":[{"level":2,"title":"2. 理解Map和排序","slug":"_2-理解map和排序","link":"#_2-理解map和排序","children":[]},{"level":2,"title":"3. 使用TreeMap对Map的键进行排序","slug":"_3-使用treemap对map的键进行排序","link":"#_3-使用treemap对map的键进行排序","children":[]},{"level":2,"title":"4. 使用自定义比较器对值进行排序","slug":"_4-使用自定义比较器对值进行排序","link":"#_4-使用自定义比较器对值进行排序","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719856439000,"updatedTime":1719856439000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.51,"words":1052},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Sorting Java Map in Descending Order.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>排序是所有编程语言中的基本操作，它允许有效地组织和检索信息。</p>\\n<p>此外，Map接口广泛用于在Java中存储键值对。然而，默认的Map迭代顺序并不总是符合应用程序的需求。通常，为了优化我们的操作，我们需要按特定顺序对数据进行排序。</p>\\n<p><strong>在本教程中，我们将探讨按键和值对Java Map进行降序排序的过程，并提供详细的解释和实际示例。</strong></p>\\n<h2>2. 理解Map和排序</h2>\\n<p>Java中的Map是一个接口，代表一个键值对集合。虽然数据本质上没有顺序，但有时我们需要以排序的方式显示或处理它。</p>\\n<p><strong>当按值降序排序Map时，我们需要考虑与每个键关联的值。</strong></p>","autoDesc":true}');export{r as comp,d as data};
