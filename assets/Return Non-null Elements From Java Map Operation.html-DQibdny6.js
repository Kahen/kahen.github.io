import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DlW52zYa.js";const p={},e=t(`<h1 id="java流中从map操作返回非空元素" tabindex="-1"><a class="header-anchor" href="#java流中从map操作返回非空元素"><span>Java流中从map操作返回非空元素</span></a></h1><p>Java Stream API引入了许多特性，显著增强了我们代码的功能和可读性。其中，map()方法作为一个强大的工具，用于转换集合中的元素，尤为突出。一个常见的需求是确保这些换结果不包含空(null)元素。</p><p>在本教程中，我们将探讨如何有效地从Stream的map()方法中收集非空元素。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>map()方法提供了一个高层次的抽象，用于处理元素序列。它是一个中间操作，将映射函数应用于Stream的每个元素，生成一个新的转换后的元素Stream。</p><p>有时，映射函数可能会返回空值。然而，我们希望从转换结果中排除这些空值。例如，假设我们有一个字符串列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">List</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> <span class="token constant">INPUT</span> <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;f o o&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a,b,c,d&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b a r&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;w,x,y,z&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;w,o,w&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们希望使用以下映射函数来转换INPUT中的字符串元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">commaToSpace</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>input<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> input<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，commaToSpace()方法简单地将所有逗号替换为空白，并返回结果。然而，如果输入字符串不包含逗号，该方法返回空值。</p><p>现在，我们想使用commaToSpace()来转换我们的INPUT，并确保结果中不包含空值。这是我们期望的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">List</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> <span class="token constant">EXPECTED</span> <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;a b c d&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;w x y z&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;w o w&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如我们所见，INPUT列表有五个元素，但EXPECTED列表有三个。</p><p>值得一提的是，在实践中，我们可能会采取更直接的方法来完成这项任务。例如，我们可以先过滤掉不包含任何逗号的字符串元素，然后执行逗号到空格的替换。然而，由于我们想展示如何从Stream的map()方法调用中收集非空元素，我们将使用commaToSpace()方法作为映射函数，并用Stream.map()调用它。</p><p>接下来，让我们看看如何使用Stream API和map()方法来实现它。</p><h2 id="_3-使用map-filter-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用map-filter-方法"><span>3. 使用map() + filter()方法</span></a></h2><p>我们已经提到map()方法应用映射函数，在这个例子中是commaToSpace()，来完成转换。</p><p>映射函数**接受一个输入并产生一个转换后的输出，而map()方法不执行任何过滤。**因此，map()产生的Stream始终与原始Stream大小相同。换句话说，如果映射函数返回空值，这些空值就在转换后的Stream中。然而，我们可以结合使用filter()方法和map()方法来从结果Stream中移除空元素。</p><p>接下来，让我们通过一个测试来看看这是如何完成的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> result <span class="token operator">=</span> <span class="token constant">INPUT</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>str <span class="token operator">-</span>\\<span class="token operator">&gt;</span> <span class="token function">commaToSpace</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token operator">::</span><span class="token function">nonNull</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们使用带有Objects::nonNull方法引用的filter()方法来从结果Stream中移除所有空元素。</p><h2 id="_4-使用optional处理空值怎么样" tabindex="-1"><a class="header-anchor" href="#_4-使用optional处理空值怎么样"><span>4. 使用Optional处理空值怎么样？</span></a></h2><p>当涉及到处理空值时，有些人可能会考虑利用Optional类，该类旨在不显式使用空值来处理可选值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> result <span class="token operator">=</span> <span class="token constant">INPUT</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>str <span class="token operator">-</span>\\<span class="token operator">&gt;</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span><span class="token function">commaToSpace</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token operator">::</span><span class="token function">isPresent</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上述示例所示，我们首先<strong>将可空值包装在Optional对象中，结果是一个Stream&lt;Optional&lt;String&gt;&gt;</strong>。然后，我们使用filter()方法从Stream中移除所有不存在的Optional。最后，为了获得Stream&lt;Optional&lt;String&gt;&gt;中包含的字符串值，我们需要<strong>一个额外的步骤来使用map(Optional::get)提取值</strong>。</p><p>因此，正如我们所见，<strong>Optional方法对于这个问题来说并不高效，因为不必要的包装和解包Stream中的元素</strong>。</p><h2 id="_5-如果映射函数返回optional怎么办" tabindex="-1"><a class="header-anchor" href="#_5-如果映射函数返回optional怎么办"><span>5. 如果映射函数返回Optional怎么办？</span></a></h2><p>我们已经讨论了使用Optional来处理空元素对于这个问题来说是低效的。然而，在某些情况下，<strong>映射函数返回一个Optional对象而不是可空结果</strong>，例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> <span class="token function">commaToSpaceOptional</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>input<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>input<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们可以使用Optional.orElse(null)来从映射函数返回的Optional中提取元素值。<strong>这允许我们将不存在的Optional转换为map()方法中的空元素</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> result <span class="token operator">=</span> <span class="token constant">INPUT</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>str <span class="token operator">-</span>\\<span class="token operator">&gt;</span> <span class="token function">commaToSpaceOptional</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token operator">::</span><span class="token function">nonNull</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如代码所示，<strong>map()方法执行两个任务</strong>：</p><ul><li>使用映射函数转换Stream</li><li>解包每个转换后的Optional对象</li></ul><p>其余步骤与“map() + filter()”方法相同。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了如何有效地从Stream的map()中收集非空元素。此外，我们还讨论了为什么将映射函数的结果包装在Optional中可能会导致效率低下。</p><p>如往常一样，示例的完整源代码可在GitHub上找到。</p>`,37),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","Return Non-null Elements From Java Map Operation.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/Archive/Return%20Non-null%20Elements%20From%20Java%20Map%20Operation.html","title":"Java流中从map操作返回非空元素","lang":"zh-CN","frontmatter":{"date":"2024-06-14T00:00:00.000Z","category":["Java","Programming"],"tag":["Java Stream API","map","filter","Optional"],"description":"Java流中从map操作返回非空元素 Java Stream API引入了许多特性，显著增强了我们代码的功能和可读性。其中，map()方法作为一个强大的工具，用于转换集合中的元素，尤为突出。一个常见的需求是确保这些换结果不包含空(null)元素。 在本教程中，我们将探讨如何有效地从Stream的map()方法中收集非空元素。 2. 问题介绍 map()...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Return%20Non-null%20Elements%20From%20Java%20Map%20Operation.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java流中从map操作返回非空元素"}],["meta",{"property":"og:description","content":"Java流中从map操作返回非空元素 Java Stream API引入了许多特性，显著增强了我们代码的功能和可读性。其中，map()方法作为一个强大的工具，用于转换集合中的元素，尤为突出。一个常见的需求是确保这些换结果不包含空(null)元素。 在本教程中，我们将探讨如何有效地从Stream的map()方法中收集非空元素。 2. 问题介绍 map()..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java Stream API"}],["meta",{"property":"article:tag","content":"map"}],["meta",{"property":"article:tag","content":"filter"}],["meta",{"property":"article:tag","content":"Optional"}],["meta",{"property":"article:published_time","content":"2024-06-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java流中从map操作返回非空元素\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用map() + filter()方法","slug":"_3-使用map-filter-方法","link":"#_3-使用map-filter-方法","children":[]},{"level":2,"title":"4. 使用Optional处理空值怎么样？","slug":"_4-使用optional处理空值怎么样","link":"#_4-使用optional处理空值怎么样","children":[]},{"level":2,"title":"5. 如果映射函数返回Optional怎么办？","slug":"_5-如果映射函数返回optional怎么办","link":"#_5-如果映射函数返回optional怎么办","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.13,"words":1239},"filePathRelative":"posts/baeldung/Archive/Return Non-null Elements From Java Map Operation.md","localizedDate":"2024年6月14日","excerpt":"\\n<p>Java Stream API引入了许多特性，显著增强了我们代码的功能和可读性。其中，map()方法作为一个强大的工具，用于转换集合中的元素，尤为突出。一个常见的需求是确保这些换结果不包含空(null)元素。</p>\\n<p>在本教程中，我们将探讨如何有效地从Stream的map()方法中收集非空元素。</p>\\n<h2>2. 问题介绍</h2>\\n<p>map()方法提供了一个高层次的抽象，用于处理元素序列。它是一个中间操作，将映射函数应用于Stream的每个元素，生成一个新的转换后的元素Stream。</p>\\n<p>有时，映射函数可能会返回空值。然而，我们希望从转换结果中排除这些空值。例如，假设我们有一个字符串列表：</p>","autoDesc":true}');export{k as comp,m as data};
