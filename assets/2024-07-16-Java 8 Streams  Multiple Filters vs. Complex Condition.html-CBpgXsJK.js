import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CXN34Kw1.js";const e={},p=t(`<h1 id="java-8-流-多重过滤器与复杂条件的比较" tabindex="-1"><a class="header-anchor" href="#java-8-流-多重过滤器与复杂条件的比较"><span>Java 8 流：多重过滤器与复杂条件的比较</span></a></h1><p>在本教程中，我们将比较不同的Java流过滤方式。首先，我们将看到哪种解决方案可以带来更易读的代码。然后，我们将从性能的角度比较这些解决方案。</p><h2 id="_2-可读性" tabindex="-1"><a class="header-anchor" href="#_2-可读性"><span>2. 可读性</span></a></h2><p>让我们从可读性的角度开始比较这两种解决方案。在本节的代码示例中，我们将使用<code>Student</code>类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> year<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` marks<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Profile</span> profile<span class="token punctuation">;</span>

    <span class="token comment">// 构造函数、getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的目标是基于以下三个规则过滤<code>Students</code>的流：</p><ul><li><code>profile</code>必须是<code>Profile.PHYSICS</code></li><li><code>marks</code>的计数应该大于3</li><li>平均<code>mark</code>应该大于50</li></ul><h3 id="_2-1-多重过滤器" tabindex="-1"><a class="header-anchor" href="#_2-1-多重过滤器"><span>2.1. 多重过滤器</span></a></h3><p>流API允许链式调用多个过滤器。我们可以利用这一点来满足上述复杂的过滤条件。如果我们想要否定条件，我们也可以使用方法<code>not</code>的<code>Predicate</code>。</p><p>这种方法将导致代码清晰易懂：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingMultipleFilters_dataShouldBeFiltered</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">&gt;</span></span>\`\`\` filteredStream <span class="token operator">=</span> students<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> s<span class="token punctuation">.</span><span class="token function">getMarksAverage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">50</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> s<span class="token punctuation">.</span><span class="token function">getMarks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">3</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token function">not</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> s<span class="token punctuation">.</span><span class="token function">getProfile</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token class-name">Student<span class="token punctuation">.</span>Profile</span><span class="token punctuation">.</span><span class="token constant">PHYSICS</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>filteredStream<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span>mathStudent<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-单一过滤器与复杂条件" tabindex="-1"><a class="header-anchor" href="#_2-2-单一过滤器与复杂条件"><span>2.2. 单一过滤器与复杂条件</span></a></h3><p>另一种选择是使用一个带有更复杂条件的单一过滤器。</p><p>不幸的是，生成的代码将更难阅读：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingSingleComplexFilter_dataShouldBeFiltered</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">&gt;</span></span>\`\`\` filteredStream <span class="token operator">=</span> students<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> s<span class="token punctuation">.</span><span class="token function">getMarksAverage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">50</span>
        <span class="token operator">&amp;&amp;</span> s<span class="token punctuation">.</span><span class="token function">getMarks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">3</span>
        <span class="token operator">&amp;&amp;</span> s<span class="token punctuation">.</span><span class="token function">getProfile</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token class-name">Student<span class="token punctuation">.</span>Profile</span><span class="token punctuation">.</span><span class="token constant">PHYSICS</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>filteredStream<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span>mathStudent<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管，我们可以通过将几个条件提取到一个单独的方法中来改善它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isEligibleForScholarship</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">getMarksAverage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">50</span>
      <span class="token operator">&amp;&amp;</span> marks<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">3</span>
      <span class="token operator">&amp;&amp;</span> profile <span class="token operator">!=</span> <span class="token class-name">Profile</span><span class="token punctuation">.</span><span class="token constant">PHYSICS</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果，我们将隐藏复杂条件，并给过滤条件赋予更多含义：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingSingleComplexFilterExtracted_dataShouldBeFiltered</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">&gt;</span></span>\`\`\` filteredStream <span class="token operator">=</span> students<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">Student</span><span class="token operator">::</span><span class="token function">isEligibleForScholarship</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>filteredStream<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span>mathStudent<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这将是一个好解决方案，特别是当我们可以将过滤逻辑封装在我们的模型内部时。</strong></p><h2 id="_3-性能" tabindex="-1"><a class="header-anchor" href="#_3-性能"><span>3. 性能</span></a></h2><p>我们已经看到使用多个过滤器可以提高我们代码的可读性。另一方面，这将意味着创建多个对象，并可能导致性能损失。为了证明这一点，我们将过滤不同大小的流并对它们的元素执行多次检查。</p><p>之后，我们将计算总处理时间（以毫秒为单位），并比较这两种解决方案。此外，我们的测试中还将包括并行流和简单的旧<code>for</code>循环：</p><p><strong><img src="https://www.baeldung.com/wp-content/uploads/2022/08/stream-filer-size-comparisson.jpg" alt="img" loading="lazy"></strong></p><p><strong>正如我们所见，使用复杂条件将带来性能提升。</strong></p><p>尽管，对于小样本大小，差异可能不明显。</p><h2 id="_4-条件的顺序" tabindex="-1"><a class="header-anchor" href="#_4-条件的顺序"><span>4. 条件的顺序</span></a></h2><p>无论我们是使用单个还是多个过滤器，如果检查没有以最佳顺序执行，过滤可能会导致性能下降。</p><h3 id="_4-1-过滤出许多元素的条件" tabindex="-1"><a class="header-anchor" href="#_4-1-过滤出许多元素的条件"><span>4.1. 过滤出许多元素的条件</span></a></h3><p>假设我们有一个包含100个整数的流，我们想要找到小于20的偶数。</p><p>如果我们首先检查数字的奇偶性，我们将总共进行150次检查。这是因为第一个条件每次都会被评估，而第二个条件只会在偶数上被评估。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenWrongFilterOrder_whenUsingMultipleFilters_shouldEvaluateManyConditions</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> filteredStreamSize <span class="token operator">=</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">boxed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">::</span><span class="token function">isEvenNumber</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">::</span><span class="token function">isSmallerThanTwenty</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>filteredStreamSize<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>numberOfOperations<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasValue</span><span class="token punctuation">(</span><span class="token number">150</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一方面，如果我们颠倒过滤器的顺序，我们只需要总共120次检查就可以正确过滤流。<strong>因此，应该首先评估过滤掉大多数元素的条件。</strong></p><h3 id="_4-2-慢或重的条件" tabindex="-1"><a class="header-anchor" href="#_4-2-慢或重的条件"><span>4.2. 慢或重的条件</span></a></h3><p>有些条件可能潜在地很慢，比如如果其中一个过滤器需要执行一些重逻辑，或者通过网络进行外部调用。为了更好的性能，我们将尽可能少地评估这些条件。基本上，我们将尝试<strong>只有在满足所有其他条件时才评估它们。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们分析了不同的Java流过滤方式。首先，我们从可读性的角度比较了这两种方法。我们发现使用多个过滤器提供了更易于理解的过滤条件。</p><p>接下来，我们从性能的角度比较了解决方案。我们了解到，使用复杂条件，因此创建更少的对象，将带来更好的整体性能。</p><p>如常，源代码可在GitHub上找到。</p>`,39),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-16-Java 8 Streams  Multiple Filters vs. Complex Condition.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Java%208%20Streams%20%20Multiple%20Filters%20vs.%20Complex%20Condition.html","title":"Java 8 流：多重过滤器与复杂条件的比较","lang":"zh-CN","frontmatter":{"date":"2022-08-01T00:00:00.000Z","category":["Java","编程"],"tag":["Java 8","性能","可读性"],"head":[["meta",{"name":"keywords","content":"Java 8, Streams, 性能, 可读性"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Java%208%20Streams%20%20Multiple%20Filters%20vs.%20Complex%20Condition.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 8 流：多重过滤器与复杂条件的比较"}],["meta",{"property":"og:description","content":"Java 8 流：多重过滤器与复杂条件的比较 在本教程中，我们将比较不同的Java流过滤方式。首先，我们将看到哪种解决方案可以带来更易读的代码。然后，我们将从性能的角度比较这些解决方案。 2. 可读性 让我们从可读性的角度开始比较这两种解决方案。在本节的代码示例中，我们将使用Student类： 我们的目标是基于以下三个规则过滤Students的流： p..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/08/stream-filer-size-comparisson.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T06:24:52.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"性能"}],["meta",{"property":"article:tag","content":"可读性"}],["meta",{"property":"article:published_time","content":"2022-08-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T06:24:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 8 流：多重过滤器与复杂条件的比较\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/08/stream-filer-size-comparisson.jpg\\"],\\"datePublished\\":\\"2022-08-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T06:24:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 8 流：多重过滤器与复杂条件的比较 在本教程中，我们将比较不同的Java流过滤方式。首先，我们将看到哪种解决方案可以带来更易读的代码。然后，我们将从性能的角度比较这些解决方案。 2. 可读性 让我们从可读性的角度开始比较这两种解决方案。在本节的代码示例中，我们将使用Student类： 我们的目标是基于以下三个规则过滤Students的流： p..."},"headers":[{"level":2,"title":"2. 可读性","slug":"_2-可读性","link":"#_2-可读性","children":[{"level":3,"title":"2.1. 多重过滤器","slug":"_2-1-多重过滤器","link":"#_2-1-多重过滤器","children":[]},{"level":3,"title":"2.2. 单一过滤器与复杂条件","slug":"_2-2-单一过滤器与复杂条件","link":"#_2-2-单一过滤器与复杂条件","children":[]}]},{"level":2,"title":"3. 性能","slug":"_3-性能","link":"#_3-性能","children":[]},{"level":2,"title":"4. 条件的顺序","slug":"_4-条件的顺序","link":"#_4-条件的顺序","children":[{"level":3,"title":"4.1. 过滤出许多元素的条件","slug":"_4-1-过滤出许多元素的条件","link":"#_4-1-过滤出许多元素的条件","children":[]},{"level":3,"title":"4.2. 慢或重的条件","slug":"_4-2-慢或重的条件","link":"#_4-2-慢或重的条件","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721111092000,"updatedTime":1721111092000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.73,"words":1118},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Java 8 Streams  Multiple Filters vs. Complex Condition.md","localizedDate":"2022年8月1日","excerpt":"\\n<p>在本教程中，我们将比较不同的Java流过滤方式。首先，我们将看到哪种解决方案可以带来更易读的代码。然后，我们将从性能的角度比较这些解决方案。</p>\\n<h2>2. 可读性</h2>\\n<p>让我们从可读性的角度开始比较这两种解决方案。在本节的代码示例中，我们将使用<code>Student</code>类：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Student</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">int</span> year<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">List</span>`<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">&gt;</span></span>` marks<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Profile</span> profile<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// 构造函数、getter和setter</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
