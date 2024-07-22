import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as n,a}from"./app-BMOUrRO4.js";const i={},l=a('<hr><h1 id="如何在map中创建一个新的条目" tabindex="-1"><a class="header-anchor" href="#如何在map中创建一个新的条目"><span>如何在Map中创建一个新的条目</span></a></h1><p>在本教程中，我们将讨论如何使用Java的内置类、第三方库以及我们自定义的实现来创建一个表示Map中键值关联的_Entry_对象。</p><h2 id="_2-使用java内置类" tabindex="-1"><a class="header-anchor" href="#_2-使用java内置类"><span>2. 使用Java内置类</span></a></h2><p>Java提供了_Map_.<em>Entry_接口，并有两个简单的实现来创建一个_Entry</em>。让我们来看一下它们。</p><h3 id="_2-1-使用-abstractmap-simpeentry" tabindex="-1"><a class="header-anchor" href="#_2-1-使用-abstractmap-simpeentry"><span>2.1. 使用_AbstractMap_.<em>SimpeEntry</em></span></a></h3><p>_SimpeEntry_类是_AbstractMap_类中的一个静态嵌套类。它提供了两个不同的构造函数来初始化一个实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>AbstractMap.SimpleEntry`````````````````````&lt;String, String&gt;````````````````````` firstEntry = new AbstractMap.SimpleEntry&lt;&gt;(&quot;key1&quot;, &quot;value1&quot;);\nAbstractMap.SimpleEntry`````````````````````&lt;String, String&gt;````````````````````` secondEntry = new AbstractMap.SimpleEntry&lt;&gt;(&quot;key2&quot;, &quot;value2&quot;);\nAbstractMap.SimpleEntry`````````````````````&lt;String, String&gt;````````````````````` thirdEntry = new AbstractMap.SimpleEntry&lt;&gt;(firstEntry);\nthirdEntry.setValue(&quot;a different value&quot;);\n\nassertThat(Stream.of(firstEntry, secondEntry, thirdEntry))\n  .extracting(&quot;key&quot;, &quot;value&quot;)\n  .containsExactly(\n    tuple(&quot;key1&quot;, &quot;value1&quot;),\n    tuple(&quot;key2&quot;, &quot;value2&quot;),\n    tuple(&quot;key1&quot;, &quot;a different value&quot;));\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在这里看到的，其中一个构造函数接受键和值，而另一个接受一个_Entry_实例来初始化一个新的_Entry_实例。</p><h3 id="_2-2-使用-abstractmap-simpeimmutableentry" tabindex="-1"><a class="header-anchor" href="#_2-2-使用-abstractmap-simpeimmutableentry"><span>2.2. 使用_AbstractMap_.<em>SimpeImmutableEntry</em></span></a></h3><p>就像_SimpeEntry_一样，我们可以使用_SimpeImmutableEntry_来创建条目：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>AbstractMap.SimpleImmutableEntry`````````````````````&lt;String, String&gt;````````````````````` firstEntry = new AbstractMap.SimpleImmutableEntry&lt;&gt;(&quot;key1&quot;, &quot;value1&quot;);\nAbstractMap.SimpleImmutableEntry`````````````````````&lt;String, String&gt;````````````````````` secondEntry = new AbstractMap.SimpleImmutableEntry&lt;&gt;(&quot;key2&quot;, &quot;value2&quot;);\nAbstractMap.SimpleImmutableEntry`````````````````````&lt;String, String&gt;````````````````````` thirdEntry = new AbstractMap.SimpleImmutableEntry&lt;&gt;(firstEntry);\n\nassertThat(Stream.of(firstEntry, secondEntry, thirdEntry))\n  .extracting(&quot;key&quot;, &quot;value&quot;)\n  .containsExactly(\n    tuple(&quot;key1&quot;, &quot;value1&quot;),\n    tuple(&quot;key2&quot;, &quot;value2&quot;),\n    tuple(&quot;key1&quot;, &quot;value1&quot;));\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与_SimpeEntry_相比，<strong>_SimpeImmutableEntry_不允许我们在初始化_Entry_实例后更改值。</strong> 如果我们尝试更改值，它会抛出_java.lang.UnsupportedOperationException_。</p><h3 id="_2-3-使用-map-entry" tabindex="-1"><a class="header-anchor" href="#_2-3-使用-map-entry"><span>2.3. 使用_Map_.<em>entry</em></span></a></h3><p>从版本9开始，Java在_Map_接口中有一个静态方法_entry()<em>来创建一个_Entry</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map.Entry`````````````````````&lt;String, String&gt;````````````````````` entry = Map.entry(&quot;key&quot;, &quot;value&quot;);\n\nassertThat(entry.getKey()).isEqualTo(&quot;key&quot;);\nassertThat(entry.getValue()).isEqualTo(&quot;value&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要记住，<strong>这样创建的条目也是不可变的</strong>，如果我们尝试在初始化后更改值，将导致_java.lang.UnsupportedOperationException_。</p><h2 id="_3-第三方库" tabindex="-1"><a class="header-anchor" href="#_3-第三方库"><span>3. 第三方库</span></a></h2><p>除了Java本身，还有一些流行的库提供了一些很好的方式来创建条目。</p><h3 id="_3-1-使用apache-commons-collections4-库" tabindex="-1"><a class="header-anchor" href="#_3-1-使用apache-commons-collections4-库"><span>3.1. 使用Apache _commons-collections4_库</span></a></h3><p>让我们首先包括我们的Maven依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``org.apache.commons``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``commons-collections4``&lt;/artifactId&gt;``\n    `&lt;version&gt;`4.5.0-M2`&lt;/version&gt;`\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该提到，除了_Entry_接口，该库还提供了一个名为_KeyValue_的接口：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map.Entry`````````````````````&lt;String, String&gt;````````````````````` firstEntry = new DefaultMapEntry&lt;&gt;(&quot;key1&quot;, &quot;value1&quot;);\nKeyValue`````````````````````&lt;String, String&gt;````````````````````` secondEntry = new DefaultMapEntry&lt;&gt;(&quot;key2&quot;, &quot;value2&quot;);\n\nKeyValue`````````````````````&lt;String, String&gt;````````````````````` thirdEntry = new DefaultMapEntry&lt;&gt;(firstEntry);\nKeyValue`````````````````````&lt;String, String&gt;````````````````````` fourthEntry = new DefaultMapEntry&lt;&gt;(secondEntry);\n\nfirstEntry.setValue(&quot;a different value&quot;);\n\nassertThat(firstEntry)\n  .extracting(&quot;key&quot;, &quot;value&quot;)\n  .containsExactly(&quot;key1&quot;, &quot;a different value&quot;);\n\nassertThat(Stream.of(secondEntry, thirdEntry, fourthEntry))\n  .extracting(&quot;key&quot;, &quot;value&quot;)\n  .containsExactly(\n    tuple(&quot;key2&quot;, &quot;value2&quot;),\n    tuple(&quot;key1&quot;, &quot;value1&quot;),\n    tuple(&quot;key2&quot;, &quot;value2&quot;));\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>DefaultMapEntry_类提供了三种不同的构造函数。第一个接受键值对，第二个和第三个接受参数类型为_Entry_和_KeyValue</em>。</p><p>_UnmodifiableMapEntry_类的行为也相同：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map.Entry`````````````````````&lt;String, String&gt;````````````````````` firstEntry = new UnmodifiableMapEntry&lt;&gt;(&quot;key1&quot;, &quot;value1&quot;);\nKeyValue`````````````````````&lt;String, String&gt;````````````````````` secondEntry = new UnmodifiableMapEntry&lt;&gt;(&quot;key2&quot;, &quot;value2&quot;);\n\nKeyValue`````````````````````&lt;String, String&gt;````````````````````` thirdEntry = new UnmodifiableMapEntry&lt;&gt;(firstEntry);\nKeyValue`````````````````````&lt;String, String&gt;````````````````````` fourthEntry = new UnmodifiableMapEntry&lt;&gt;(secondEntry);\n\nassertThat(firstEntry)\n  .extracting(&quot;key&quot;, &quot;value&quot;)\n  .containsExactly(&quot;key1&quot;, &quot;value1&quot;);\n\nassertThat(Stream.of(secondEntry, thirdEntry, fourthEntry))\n  .extracting(&quot;key&quot;, &quot;value&quot;)\n  .containsExactly(\n    tuple(&quot;key2&quot;, &quot;value2&quot;),\n    tuple(&quot;key1&quot;, &quot;value1&quot;),\n    tuple(&quot;key2&quot;, &quot;value2&quot;));\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，正如我们可以从它的名字理解的那样，<strong>_UnmodifiableMapEntry_也不允许我们在初始化后更改值</strong>。</p><h3 id="_3-2-使用google-guava库" tabindex="-1"><a class="header-anchor" href="#_3-2-使用google-guava库"><span>3.2. 使用Google Guava库</span></a></h3><p>让我们首先包括我们的Maven依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``com.google.guava``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``guava``&lt;/artifactId&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们看看我们如何使用_immutableEntry()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map.Entry`````````````````````&lt;String, String&gt;````````````````````` firstEntry = Maps.immutableEntry(&quot;key1&quot;, &quot;value1&quot;);\nMap.Entry`````````````````````&lt;String, String&gt;````````````````````` secondEntry = Maps.immutableEntry(&quot;key2&quot;, &quot;value2&quot;);\n\nassertThat(Stream.of(firstEntry, secondEntry))\n  .extracting(&quot;key&quot;, &quot;value&quot;)\n  .containsExactly(\n    tuple(&quot;key1&quot;, &quot;value1&quot;),\n    tuple(&quot;key2&quot;, &quot;value2&quot;));\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>由于它创建了一个不可变的条目，如果我们尝试更改值，它会抛出_java.lang.UnsupportedOperationException_</strong>。</p><h2 id="_4-自定义实现" tabindex="-1"><a class="header-anchor" href="#_4-自定义实现"><span>4. 自定义实现</span></a></h2><p>到目前为止，我们已经看到了一些创建_Entry_实例的选项，这些类已经被设计成必须符合_Map_接口实现（如_HashMap_）的内部逻辑。</p><p>这意味着只要我们符合相同的规则，我们就可以创建自己的_Entry_接口实现。首先，让我们添加一个简单的实现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class SimpleCustomKeyValue``&lt;K, V&gt;`` implements Map.Entry``&lt;K, V&gt;`` {\n\n    private final K key;\n    private V value;\n\n    public SimpleCustomKeyValue(K key, V value) {\n        this.key = key;\n        this.value = value;\n    }\n    // 标准getter和setter\n    // 标准equals和hashcode\n    // 标准toString\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们看一些使用示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map.Entry`````````````````````&lt;String, String&gt;````````````````````` firstEntry = new SimpleCustomKeyValue&lt;&gt;(&quot;key1&quot;, &quot;value1&quot;);\n\nMap.Entry`````````````````````&lt;String, String&gt;````````````````````` secondEntry = new SimpleCustomKeyValue&lt;&gt;(&quot;key2&quot;, &quot;value2&quot;);\nsecondEntry.setValue(&quot;different value&quot;);\n\nMap`````````````````````&lt;String, String&gt;````````````````````` map = Map.ofEntries(firstEntry, secondEntry);\n\nassertThat(map)\n  .isEqualTo(ImmutableMap.`````````````````````&lt;String, String&gt;`````````````````````builder()\n    .put(&quot;key1&quot;, &quot;value1&quot;)\n    .put(&quot;key2&quot;, &quot;different value&quot;)\n    .build());\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何使用Java提供的现有选项以及一些流行的第三方库提供的几种替代方案来创建一个_Entry_实例。此外，我们还创建了一个自定义实现，并展示了一些使用示例。</p><p>一如既往，这些示例的代码可以在GitHub上找到。</p>',43),r=[l];function s(u,d){return n(),e("div",null,r)}const v=t(i,[["render",s],["__file","2024-07-21-How to Create a New Entry in a Map.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-How%20to%20Create%20a%20New%20Entry%20in%20a%20Map.html","title":"如何在Map中创建一个新的条目","lang":"zh-CN","frontmatter":{"date":"2024-07-21T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Map","Entry"],"head":[["meta",{"name":"keywords","content":"Java Map Entry, Java Map Entry 创建方法"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-How%20to%20Create%20a%20New%20Entry%20in%20a%20Map.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Map中创建一个新的条目"}],["meta",{"property":"og:description","content":"如何在Map中创建一个新的条目 在本教程中，我们将讨论如何使用Java的内置类、第三方库以及我们自定义的实现来创建一个表示Map中键值关联的_Entry_对象。 2. 使用Java内置类 Java提供了_Map_.Entry_接口，并有两个简单的实现来创建一个_Entry。让我们来看一下它们。 2.1. 使用_AbstractMap_.SimpeEnt..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T09:50:02.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Map"}],["meta",{"property":"article:tag","content":"Entry"}],["meta",{"property":"article:published_time","content":"2024-07-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T09:50:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Map中创建一个新的条目\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T09:50:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Map中创建一个新的条目 在本教程中，我们将讨论如何使用Java的内置类、第三方库以及我们自定义的实现来创建一个表示Map中键值关联的_Entry_对象。 2. 使用Java内置类 Java提供了_Map_.Entry_接口，并有两个简单的实现来创建一个_Entry。让我们来看一下它们。 2.1. 使用_AbstractMap_.SimpeEnt..."},"headers":[{"level":2,"title":"2. 使用Java内置类","slug":"_2-使用java内置类","link":"#_2-使用java内置类","children":[{"level":3,"title":"2.1. 使用_AbstractMap_.SimpeEntry","slug":"_2-1-使用-abstractmap-simpeentry","link":"#_2-1-使用-abstractmap-simpeentry","children":[]},{"level":3,"title":"2.2. 使用_AbstractMap_.SimpeImmutableEntry","slug":"_2-2-使用-abstractmap-simpeimmutableentry","link":"#_2-2-使用-abstractmap-simpeimmutableentry","children":[]},{"level":3,"title":"2.3. 使用_Map_.entry","slug":"_2-3-使用-map-entry","link":"#_2-3-使用-map-entry","children":[]}]},{"level":2,"title":"3. 第三方库","slug":"_3-第三方库","link":"#_3-第三方库","children":[{"level":3,"title":"3.1. 使用Apache _commons-collections4_库","slug":"_3-1-使用apache-commons-collections4-库","link":"#_3-1-使用apache-commons-collections4-库","children":[]},{"level":3,"title":"3.2. 使用Google Guava库","slug":"_3-2-使用google-guava库","link":"#_3-2-使用google-guava库","children":[]}]},{"level":2,"title":"4. 自定义实现","slug":"_4-自定义实现","link":"#_4-自定义实现","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721555402000,"updatedTime":1721555402000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.72,"words":1116},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-How to Create a New Entry in a Map.md","localizedDate":"2024年7月21日","excerpt":"<hr>\\n<h1>如何在Map中创建一个新的条目</h1>\\n<p>在本教程中，我们将讨论如何使用Java的内置类、第三方库以及我们自定义的实现来创建一个表示Map中键值关联的_Entry_对象。</p>\\n<h2>2. 使用Java内置类</h2>\\n<p>Java提供了_Map_.<em>Entry_接口，并有两个简单的实现来创建一个_Entry</em>。让我们来看一下它们。</p>\\n<h3>2.1. 使用_AbstractMap_.<em>SimpeEntry</em></h3>\\n<p>_SimpeEntry_类是_AbstractMap_类中的一个静态嵌套类。它提供了两个不同的构造函数来初始化一个实例：</p>","autoDesc":true}');export{v as comp,p as data};
