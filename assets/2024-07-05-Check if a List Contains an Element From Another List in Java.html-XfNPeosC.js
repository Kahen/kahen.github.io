import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BkL9UgS7.js";const e={},p=t(`<h1 id="java中检查一个列表是否包含另一个列表中的元素" tabindex="-1"><a class="header-anchor" href="#java中检查一个列表是否包含另一个列表中的元素"><span>Java中检查一个列表是否包含另一个列表中的元素</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将探讨Java中几种检查一个列表中的元素是否也出现在另一个列表中的方法。我们将使用Java Stream、Collections的disjoint()方法以及Apache Commons来实现这一功能。</p><h2 id="_2-检查基本等价性" tabindex="-1"><a class="header-anchor" href="#_2-检查基本等价性"><span>2. 检查基本等价性</span></a></h2><p>这个问题最简单的版本是，如果我们想检查一个列表中的元素是否与另一个列表中的元素<strong>等价</strong>。这可以是原始值或对象，假设我们已经设置了对象的比较方式。让我们创建一些要比较的列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` listOfLetters <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;d&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` listOfLettersWithOverlap <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;d&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;e&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;f&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;g&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` listOfCities <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;London&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Berlin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Paris&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Brussels&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>字符串“d”出现在前两个列表中，因此我们期望任何解决此问题的方案都能检测到这一点。我们还期望将前两个列表与listOfCities进行比较时返回一个否定的结果。</p><h3 id="_2-1-使用disjoints" tabindex="-1"><a class="header-anchor" href="#_2-1-使用disjoints"><span>2.1. 使用Disjoints</span></a></h3><p>我们将看到的第一个选项是Java Collections库中的disjoint()方法。<strong>disjoint()方法返回true，如果两个指定的Collections没有共同的元素</strong>。因此，由于我们要找到两个Collections确实有共同元素时，我们将使用非运算符来反转结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenValuesToCompare_whenUsingCollectionsDisjoint_thenDetectElementsInTwoLists</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">boolean</span> shouldBeTrue <span class="token operator">=</span> <span class="token operator">!</span><span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">disjoint</span><span class="token punctuation">(</span>listOfLetters<span class="token punctuation">,</span> listOfLettersWithOverlap<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>shouldBeTrue<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">boolean</span> shouldBeFalse <span class="token operator">=</span> <span class="token operator">!</span><span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">disjoint</span><span class="token punctuation">(</span>listOfLetters<span class="token punctuation">,</span> listOfCities<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span>shouldBeFalse<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面，我们看到预期的重叠字母列表返回_true_，并且在与城市列表进行比较后返回_false_值。</p><h3 id="_2-2-使用streams" tabindex="-1"><a class="header-anchor" href="#_2-2-使用streams"><span>2.2. 使用Streams</span></a></h3><p>Java中我们可以使用的第二种方式是使用Streams。<strong>特别是，我们将使用anyMatch()方法，如果Stream中的任何元素与给定的谓词匹配，则返回true</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenValuesToCompare_whenUsingStreams_thenDetectElementsInTwoLists</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">boolean</span> shouldBeTrue <span class="token operator">=</span> listOfLetters<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">anyMatch</span><span class="token punctuation">(</span>listOfLettersWithOverlap<span class="token operator">::</span><span class="token function">contains</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>shouldBeTrue<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">boolean</span> shouldBeFalse <span class="token operator">=</span> listOfLetters<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">anyMatch</span><span class="token punctuation">(</span>listOfCities<span class="token operator">::</span><span class="token function">contains</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span>shouldBeFalse<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提供给_anyMatch()<em>的谓词是对_Collections_的contains()方法的调用。如果Collections包含指定的元素，则返回_true</em>。</p><h3 id="_2-3-使用apache-commons" tabindex="-1"><a class="header-anchor" href="#_2-3-使用apache-commons"><span>2.3. 使用Apache Commons</span></a></h3><p>我们的最后一种方法是使用Apache Commons的CollectionUtils方法_containsAny()<em>。为了使用这个方法，我们首先需要将依赖项导入我们的_pom.xml</em>：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.apache.commons\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`commons-collections4\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`4.4\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以在Maven Repository中找到最新版本。准备好之后，我们就可以使用这个库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">givenValuesToCompare_whenUsingApacheCollectionUtils_thenDetectElementsInTwoLists</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">boolean</span> shouldBeTrue <span class="token operator">=</span> <span class="token class-name">CollectionUtils</span><span class="token punctuation">.</span><span class="token function">containsAny</span><span class="token punctuation">(</span>listOfLetters<span class="token punctuation">,</span> listOfLettersWithOverlap<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>shouldBeTrue<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">boolean</span> shouldBeFalse <span class="token operator">=</span> <span class="token class-name">CollectionUtils</span><span class="token punctuation">.</span><span class="token function">containsAny</span><span class="token punctuation">(</span>listOfLetters<span class="token punctuation">,</span> listOfCities<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span>shouldBeFalse<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法简单易读。然而，我们可能只有在已经使用Apache导入的情况下才会使用它，因为Java有内置的方法。</p><h2 id="_3-检查对象内的属性" tabindex="-1"><a class="header-anchor" href="#_3-检查对象内的属性"><span>3. 检查对象内的属性</span></a></h2><p>这个问题的更复杂版本是，如果我们想检查两个列表中的任何对象是否具有匹配的属性。让我们创建一个示例对象，用于此：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Country</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token class-name">String</span> language<span class="token punctuation">;</span>
    <span class="token comment">// 标准getter, setter和构造函数</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们可以创建一些Country类的实例，并将它们放入两个列表中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Country</span> france <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Country</span><span class="token punctuation">(</span><span class="token string">&quot;France&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;French&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Country</span> mexico <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Country</span><span class="token punctuation">(</span><span class="token string">&quot;Mexico&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Spanish&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Country</span> spain <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Country</span><span class="token punctuation">(</span><span class="token string">&quot;Spain&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Spanish&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Country</span><span class="token punctuation">&gt;</span></span>\`\` franceAndMexico <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>france<span class="token punctuation">,</span> mexico<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Country</span><span class="token punctuation">&gt;</span></span>\`\` franceAndSpain <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>france<span class="token punctuation">,</span> spain<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>两个列表都有一个说西班牙语的国家，所以我们应该能够在比较它们时检测到这一点。</p><h3 id="_3-1-使用streams" tabindex="-1"><a class="header-anchor" href="#_3-1-使用streams"><span>3.1. 使用Streams</span></a></h3><p>让我们使用上述列表，检查我们是否在两个列表中都有说同一种语言的国家。我们可以使用Streams来完成这个任务，类似于我们在第2.2节中看到的方式。<strong>主要的区别是我们使用map()来提取我们感兴趣的属性</strong>，在这个例子中是语言：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenPropertiesInObjectsToCompare_whenUsingStreams_thenDetectElementsInTwoLists</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">boolean</span> shouldBeTrue <span class="token operator">=</span> franceAndMexico<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Country</span><span class="token operator">::</span><span class="token function">getLanguage</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">anyMatch</span><span class="token punctuation">(</span>franceAndSpain<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Country</span><span class="token operator">::</span><span class="token function">getLanguage</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">toSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">::</span><span class="token function">contains</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertTrue</span><span class="token punctuation">(</span>shouldBeTrue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们再次使用_anyMatch()_。然而，这次我们把语言收集到一个_Set_中，并使用_contains()_来检查当前语言是否在_Set_中。如上所示，我们找到了一个匹配项，因为两个列表都包含了一个说西班牙语的国家。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们看到了Streams是解决这个问题最通用的解决方案。我们可以轻松地使用它们来比较整个对象或对象内的属性。此外，我们还看了Java的disjoint()和Apache的containsAny()的替代方案，它们都易于使用并产生可读的代码。</p><p>如往常一样，示例的完整代码可以在GitHub上找到。</p><p>OK</p>`,35),o=[p];function c(l,i){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-05-Check if a List Contains an Element From Another List in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Check%20if%20a%20List%20Contains%20an%20Element%20From%20Another%20List%20in%20Java.html","title":"Java中检查一个列表是否包含另一个列表中的元素","lang":"zh-CN","frontmatter":{"date":"2024-07-05T00:00:00.000Z","category":["Java","编程"],"tag":["Java List","集合操作"],"head":[["meta",{"name":"keywords","content":"Java, List, 集合操作, 元素检查"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Check%20if%20a%20List%20Contains%20an%20Element%20From%20Another%20List%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中检查一个列表是否包含另一个列表中的元素"}],["meta",{"property":"og:description","content":"Java中检查一个列表是否包含另一个列表中的元素 1. 概述 在本教程中，我们将探讨Java中几种检查一个列表中的元素是否也出现在另一个列表中的方法。我们将使用Java Stream、Collections的disjoint()方法以及Apache Commons来实现这一功能。 2. 检查基本等价性 这个问题最简单的版本是，如果我们想检查一个列表中的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T07:31:13.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java List"}],["meta",{"property":"article:tag","content":"集合操作"}],["meta",{"property":"article:published_time","content":"2024-07-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T07:31:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中检查一个列表是否包含另一个列表中的元素\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-05T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T07:31:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中检查一个列表是否包含另一个列表中的元素 1. 概述 在本教程中，我们将探讨Java中几种检查一个列表中的元素是否也出现在另一个列表中的方法。我们将使用Java Stream、Collections的disjoint()方法以及Apache Commons来实现这一功能。 2. 检查基本等价性 这个问题最简单的版本是，如果我们想检查一个列表中的..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 检查基本等价性","slug":"_2-检查基本等价性","link":"#_2-检查基本等价性","children":[{"level":3,"title":"2.1. 使用Disjoints","slug":"_2-1-使用disjoints","link":"#_2-1-使用disjoints","children":[]},{"level":3,"title":"2.2. 使用Streams","slug":"_2-2-使用streams","link":"#_2-2-使用streams","children":[]},{"level":3,"title":"2.3. 使用Apache Commons","slug":"_2-3-使用apache-commons","link":"#_2-3-使用apache-commons","children":[]}]},{"level":2,"title":"3. 检查对象内的属性","slug":"_3-检查对象内的属性","link":"#_3-检查对象内的属性","children":[{"level":3,"title":"3.1. 使用Streams","slug":"_3-1-使用streams","link":"#_3-1-使用streams","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720164673000,"updatedTime":1720164673000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.83,"words":1150},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Check if a List Contains an Element From Another List in Java.md","localizedDate":"2024年7月5日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将探讨Java中几种检查一个列表中的元素是否也出现在另一个列表中的方法。我们将使用Java Stream、Collections的disjoint()方法以及Apache Commons来实现这一功能。</p>\\n<h2>2. 检查基本等价性</h2>\\n<p>这个问题最简单的版本是，如果我们想检查一个列表中的元素是否与另一个列表中的元素<strong>等价</strong>。这可以是原始值或对象，假设我们已经设置了对象的比较方式。让我们创建一些要比较的列表：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">List</span>```<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>``` listOfLetters <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Arrays</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">asList</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"a\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"b\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"c\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"d\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">List</span>```<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>``` listOfLettersWithOverlap <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Arrays</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">asList</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"d\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"e\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"f\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"g\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">List</span>```<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>``` listOfCities <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Arrays</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">asList</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"London\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Berlin\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Paris\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Brussels\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
