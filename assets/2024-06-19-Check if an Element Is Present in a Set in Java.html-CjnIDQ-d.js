import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-WDhPMSWc.js";const e={},o=t(`<h1 id="java中检查集合中元素是否存在的方法" tabindex="-1"><a class="header-anchor" href="#java中检查集合中元素是否存在的方法"><span>Java中检查集合中元素是否存在的方法</span></a></h1><p>在这篇简短的教程中，我们将探讨如何在Java中检查一个元素是否存在于一个集合（Set）中。</p><p>首先，我们将通过使用Java核心开发工具包（JDK）来探索解决方案。然后，我们将阐明如何使用外部库，如Apache Commons，来实现相同的结果。</p><h3 id="_2-1-使用核心jdk的set-contains-方法" tabindex="-1"><a class="header-anchor" href="#_2-1-使用核心jdk的set-contains-方法"><span>2.1 使用核心JDK的<code>Set#contains()</code>方法</span></a></h3><p>顾名思义，这个方法检查特定的集合是否包含给定的元素。这是我们可以使用的最简单的解决方案之一，以回答我们的核心问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenASet_whenUsingContainsMethod_thenCheck</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token constant">CITIES</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;London&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token constant">CITIES</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Madrid&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isFalse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常，<code>contains()</code>方法如果集合中存在给定元素，则返回<code>true</code>；否则返回<code>false</code>。</p><p>根据文档，该方法仅在以下情况下返回<code>true</code>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>object==null ? element==null : object.equals(element);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这就是为什么在集合对象所属的类中实现<code>equals()</code>方法很重要。这样，我们可以自定义等式逻辑，以适应类的所有或某些字段。</p><p>简而言之，与其他方法相比，<code>contains()</code>方法提供了最简洁直接的方式来检查一个给定集合中是否存在元素。</p><h3 id="_2-2-使用collections-disjoint-方法" tabindex="-1"><a class="header-anchor" href="#_2-2-使用collections-disjoint-方法"><span>2.2 使用<code>Collections#disjoint()</code>方法</span></a></h3><p><code>Collections</code>实用工具类提供了另一种方法，称为<code>disjoint()</code>，我们可以使用它来检查集合是否包含给定的元素。</p><p><strong>这个方法接受两个集合作为参数，并在它们没有共同元素时返回true</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenASet_whenUsingCollectionsDisjointMethod_thenCheck</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">boolean</span> isPresent <span class="token operator">=</span> <span class="token operator">!</span><span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">disjoint</span><span class="token punctuation">(</span><span class="token constant">CITIES</span><span class="token punctuation">,</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singleton</span><span class="token punctuation">(</span><span class="token string">&quot;Paris&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>isPresent<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总的来说，我们创建了一个只包含给定字符串“Paris”的不可变集合。<strong>此外，我们使用<code>disjoint()</code>方法和取反操作符来检查这两个集合是否有共同的元素</strong>。</p><h3 id="_2-3-使用stream-anymatch-方法" tabindex="-1"><a class="header-anchor" href="#_2-3-使用stream-anymatch-方法"><span>2.3 使用<code>Stream#anyMatch()</code>方法</span></a></h3><p>Stream API提供了<code>anyMatch()</code>方法，我们可以使用它来验证给定集合的任何元素是否与提供的谓词匹配。</p><p>让我们看看它在实际中的应用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">CheckIfPresentInSetUnitTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Set</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token constant">CITIES</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@BeforeAll</span>
    <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token constant">CITIES</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Paris&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token constant">CITIES</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;London&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token constant">CITIES</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Tokyo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token constant">CITIES</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Tamassint&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token constant">CITIES</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;New york&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">givenASet_whenUsingStreamAnyMatchMethod_thenCheck</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">boolean</span> isPresent <span class="token operator">=</span> <span class="token constant">CITIES</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">anyMatch</span><span class="token punctuation">(</span>city <span class="token operator">-&gt;</span> city<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;London&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">assertThat</span><span class="token punctuation">(</span>isPresent<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，我们使用了谓词<code>city.equals(&quot;London&quot;)</code>来检查流中是否有任何城市符合等于“London”的条件。</p><h3 id="_2-4-使用stream-filter-方法" tabindex="-1"><a class="header-anchor" href="#_2-4-使用stream-filter-方法"><span>2.4 使用<code>Stream#filter()</code>方法</span></a></h3><p>另一种解决方案是使用<code>filter()</code>方法。<strong>它返回一个新流，其中包含满足提供条件的元素</strong>。</p><p>换句话说，它根据指定的条件过滤流：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenASet_whenUsingStreamFilterMethod_thenCheck</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> resultCount <span class="token operator">=</span> <span class="token constant">CITIES</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>city <span class="token operator">-&gt;</span> city<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;Tamassint&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>resultCount<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isPositive</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，我们过滤了我们的集合，只包括等于值“Tamassint”的元素。然后，我们使用了终端操作<code>count()</code>来返回过滤元素的数量。</p><h3 id="_3-使用apache-commons-collections" tabindex="-1"><a class="header-anchor" href="#_3-使用apache-commons-collections"><span>3. 使用Apache Commons Collections</span></a></h3><p>如果我们想要检查一个给定的元素是否存在于集合中，Apache Commons Collections库是另一个可以考虑的选项。让我们首先通过向<code>pom.xml</code>文件添加它的依赖来开始：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.apache.commons\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`commons-collections4\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`4.4\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-使用collectionutils-containsany-方法" tabindex="-1"><a class="header-anchor" href="#_3-1-使用collectionutils-containsany-方法"><span>3.1 使用<code>CollectionUtils#containsAny()</code>方法</span></a></h3><p><code>CollectionUtils</code>提供了一组实用方法来对集合执行常见操作。在这些方法中，我们找到了<code>containsAny(Collection\`\`&lt;?&gt;\`\` coll1, Collection\`\`&lt;?&gt;\`\` coll2)</code>。<strong>如果第二个集合中至少有一个元素也包含在第一个集合中，则此方法返回true</strong>。</p><p>让我们看看它在实际中的应用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenASet_whenUsingCollectionUtilsContainsAnyMethod_thenCheck</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">boolean</span> isPresent <span class="token operator">=</span> <span class="token class-name">CollectionUtils</span><span class="token punctuation">.</span><span class="token function">containsAny</span><span class="token punctuation">(</span><span class="token constant">CITIES</span><span class="token punctuation">,</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singleton</span><span class="token punctuation">(</span><span class="token string">&quot;Paris&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>isPresent<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，我们创建了一个只包含一个元素“Paris”的单例集合。然后，我们使用了<code>containsAny()</code>方法来检查我们的集合<code>CITIES</code>是否包含给定的值“Paris”。</p><h3 id="_3-2-使用setutils-intersection-方法" tabindex="-1"><a class="header-anchor" href="#_3-2-使用setutils-intersection-方法"><span>3.2 使用<code>SetUtils#intersection()</code>方法</span></a></h3><p>或者，我们可以使用<code>SetUtils</code>实用工具类来解决我们的挑战。<strong>这个类提供了<code>intersection(Set\`\`&lt;? extends E&gt;\`\` a, Set\`\`&lt;? extends E&gt;\`\` b)</code>方法，它返回一个新的集合，其中包含在指定的两个集合中都存在的元素</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenASet_whenUsingSetUtilsIntersectionMethod_thenCheck</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Set</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` result <span class="token operator">=</span> <span class="token class-name">SetUtils</span><span class="token punctuation">.</span><span class="token function">intersection</span><span class="token punctuation">(</span><span class="token constant">CITIES</span><span class="token punctuation">,</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singleton</span><span class="token punctuation">(</span><span class="token string">&quot;Tamassint&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，这里的想法是通过检查<code>CITIES</code>和给定的单例集合之间的交集是否为空来验证城市“Tamassint”是否存在于<code>CITIES</code>中。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在这篇简短的文章中，我们探讨了如何在Java中检查一个集合是否包含给定的元素。</p><p>首先，我们看到了如何使用现成的JDK方法来做到这一点。然后，我们展示了如何使用Apache Commons Collections库来实现相同的目标。</p><p>正如往常一样，本文中使用的代码可以在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。翻译已经完成，以下是剩余部分的翻译：</p><h2 id="_4-结论-1" tabindex="-1"><a class="header-anchor" href="#_4-结论-1"><span>4. 结论</span></a></h2><p>在这篇简短的文章中，我们深入探讨了如何在Java中检查一个集合是否包含特定的元素。</p><p>首先，我们看到了如何使用Java开发工具包（JDK）中现成的方法来实现这一功能。然后，我们展示了如何使用Apache Commons Collections库来达到相同的目标。</p><p>一如既往，本文中使用的所有代码都可以在GitHub上找到。</p><p>文章发布后30天内开放评论。对于超过这个日期的任何问题，请使用网站上的联系表单。</p><p>OK</p>`,49),p=[o];function c(i,l){return a(),s("div",null,p)}const k=n(e,[["render",c],["__file","2024-06-19-Check if an Element Is Present in a Set in Java.html.vue"]]),r=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-19-Check%20if%20an%20Element%20Is%20Present%20in%20a%20Set%20in%20Java.html","title":"Java中检查集合中元素是否存在的方法","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Java","Set"],"tag":["Set Membership","Java Collection"],"head":[["meta",{"name":"keywords","content":"Java, Set, Membership, Collection, Apache Commons, Collections, Stream API"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-19-Check%20if%20an%20Element%20Is%20Present%20in%20a%20Set%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中检查集合中元素是否存在的方法"}],["meta",{"property":"og:description","content":"Java中检查集合中元素是否存在的方法 在这篇简短的教程中，我们将探讨如何在Java中检查一个元素是否存在于一个集合（Set）中。 首先，我们将通过使用Java核心开发工具包（JDK）来探索解决方案。然后，我们将阐明如何使用外部库，如Apache Commons，来实现相同的结果。 2.1 使用核心JDK的Set#contains()方法 顾名思义，这..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Set Membership"}],["meta",{"property":"article:tag","content":"Java Collection"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中检查集合中元素是否存在的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中检查集合中元素是否存在的方法 在这篇简短的教程中，我们将探讨如何在Java中检查一个元素是否存在于一个集合（Set）中。 首先，我们将通过使用Java核心开发工具包（JDK）来探索解决方案。然后，我们将阐明如何使用外部库，如Apache Commons，来实现相同的结果。 2.1 使用核心JDK的Set#contains()方法 顾名思义，这..."},"headers":[{"level":3,"title":"2.1 使用核心JDK的Set#contains()方法","slug":"_2-1-使用核心jdk的set-contains-方法","link":"#_2-1-使用核心jdk的set-contains-方法","children":[]},{"level":3,"title":"2.2 使用Collections#disjoint()方法","slug":"_2-2-使用collections-disjoint-方法","link":"#_2-2-使用collections-disjoint-方法","children":[]},{"level":3,"title":"2.3 使用Stream#anyMatch()方法","slug":"_2-3-使用stream-anymatch-方法","link":"#_2-3-使用stream-anymatch-方法","children":[]},{"level":3,"title":"2.4 使用Stream#filter()方法","slug":"_2-4-使用stream-filter-方法","link":"#_2-4-使用stream-filter-方法","children":[]},{"level":3,"title":"3. 使用Apache Commons Collections","slug":"_3-使用apache-commons-collections","link":"#_3-使用apache-commons-collections","children":[]},{"level":3,"title":"3.1 使用CollectionUtils#containsAny()方法","slug":"_3-1-使用collectionutils-containsany-方法","link":"#_3-1-使用collectionutils-containsany-方法","children":[]},{"level":3,"title":"3.2 使用SetUtils#intersection()方法","slug":"_3-2-使用setutils-intersection-方法","link":"#_3-2-使用setutils-intersection-方法","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论-1","link":"#_4-结论-1","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.67,"words":1401},"filePathRelative":"posts/baeldung/Archive/2024-06-19-Check if an Element Is Present in a Set in Java.md","localizedDate":"2024年6月20日","excerpt":"\\n<p>在这篇简短的教程中，我们将探讨如何在Java中检查一个元素是否存在于一个集合（Set）中。</p>\\n<p>首先，我们将通过使用Java核心开发工具包（JDK）来探索解决方案。然后，我们将阐明如何使用外部库，如Apache Commons，来实现相同的结果。</p>\\n<h3>2.1 使用核心JDK的<code>Set#contains()</code>方法</h3>\\n<p>顾名思义，这个方法检查特定的集合是否包含给定的元素。这是我们可以使用的最简单的解决方案之一，以回答我们的核心问题：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenASet_whenUsingContainsMethod_thenCheck</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function\\">assertThat</span><span class=\\"token punctuation\\">(</span><span class=\\"token constant\\">CITIES</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">contains</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"London\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isTrue</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">assertThat</span><span class=\\"token punctuation\\">(</span><span class=\\"token constant\\">CITIES</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">contains</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Madrid\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isFalse</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,r as data};
