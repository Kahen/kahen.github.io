import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CJGTm_7y.js";const e={},p=t('<h1 id="处理findfirst-方法中第一个元素为null时的nullpointerexception" tabindex="-1"><a class="header-anchor" href="#处理findfirst-方法中第一个元素为null时的nullpointerexception"><span>处理findFirst()方法中第一个元素为Null时的NullPointerException</span></a></h1><p>在这个简短的教程中，我们将探讨在使用findFirst()方法时避免NullPointerException的不同方法。</p><p>首先，我们将解释导致该方法因NullPointerException失败的原因。然后，我们将通过实际示例演示如何重现并修复异常。</p><h3 id="解释问题" tabindex="-1"><a class="header-anchor" href="#解释问题"><span>解释问题</span></a></h3><p>简而言之，NullPointerException被抛出以表明我们在需要对象的地方使用了null进行了某些操作。</p><p>通常，我们使用findFirst()来返回一个包含给定流的第一个元素的Optional实例。然而，<strong>根据文档，如果返回的第一个元素是null，该方法会抛出NullPointerException</strong>。</p><p>因此，这里的主要问题是如何在流的第一个元素为null时避免NullPointerException异常。在深入解答我们的问题之前，让我们先重现异常。</p><h3 id="重现nullpointerexception" tabindex="-1"><a class="header-anchor" href="#重现nullpointerexception"><span>重现NullPointerException</span></a></h3><p>例如，假设我们有一个String对象列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` inputs <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">&quot;foo&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;bar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们尝试使用findFirst()方法获取我们的列表的第一个元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span><span class="token punctuation">(</span>expected <span class="token operator">=</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStream_whenCallingFindFirst_thenThrowNullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Optional</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` firstElement <span class="token operator">=</span> inputs<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所见，测试用例因NullPointerException失败，因为我们列表中选定的第一个元素是null。</p><p><strong>Optional API声明，调用者有责任确保值不是null，因为它没有提供任何方法来区分“值存在但设置为null”和“值不存在”</strong>。这就是为什么文档禁止在使用findFirst()时返回null的场景。</p><h3 id="避免异常" tabindex="-1"><a class="header-anchor" href="#避免异常"><span>避免异常</span></a></h3><p>在这种情况下，避免NullPointerException的最简单方法是在调用findFirst()方法之前对流进行过滤。</p><p>让我们看看如何在实践中做到这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStream_whenUsingFilterBeforeFindFirst_thenCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Optional</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` firstNotNullElement <span class="token operator">=</span> inputs<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token operator">::</span><span class="token function">nonNull</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertTrue</span><span class="token punctuation">(</span>firstNotNullElement<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用Objects#nonNull方法来过滤所有非null的对象。<strong>这样，我们确保选定的第一个元素不是null。因此，我们避免了NullPointerException</strong>。</p><p>另一个选择是在调用findFirst()方法之前使用Optional#ofNullable方法。</p><p><strong>此方法如果指定的值不是null，则返回一个带有该值的Optional实例。否则，它返回一个空的Optional</strong>。</p><p>让我们看看它在实际中的应用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStream_whenUsingOfNullableBeforeFindFirst_thenCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Optional</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` firstElement <span class="token operator">=</span> inputs<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token operator">::</span><span class="token function">ofNullable</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token class-name">Function</span><span class="token punctuation">.</span><span class="token function">identity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertTrue</span><span class="token punctuation">(</span>firstElement<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，我们使用ofNullable()方法将每个元素映射成一个接受null的Optional对象。然后，我们使用findFirst()获取第一个映射的元素。</p><p>返回的元素表示一个Optional的Optional，因为findFirst()返回一个Optional。这就是我们使用flatMap()来展平嵌套的Optional的原因。</p><p>请注意，Function#identity总是返回其输入参数。在我们的例子中，该方法返回null，因为它是我们列表中的第一个元素。</p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在这篇短文中，我们解释了如何在使用findFirst()方法时避免NullPointerException。</p><p>在此过程中，我们展示了如何使用实际示例重现和解决异常。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>',30),i=[p];function l(o,c){return a(),s("div",null,i)}const d=n(e,[["render",l],["__file","2024-06-26-Handling NullPointerException in findFirst   When the First Element Is Null.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Handling%20NullPointerException%20in%20findFirst%20%20%20When%20the%20First%20Element%20Is%20Null.html","title":"处理findFirst()方法中第一个元素为Null时的NullPointerException","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","Exception Handling"],"tag":["NullPointerException","findFirst()","Optional"],"head":[["meta",{"name":"keywords","content":"Java, Exception Handling, NullPointerException, findFirst(), Optional"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Handling%20NullPointerException%20in%20findFirst%20%20%20When%20the%20First%20Element%20Is%20Null.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"处理findFirst()方法中第一个元素为Null时的NullPointerException"}],["meta",{"property":"og:description","content":"处理findFirst()方法中第一个元素为Null时的NullPointerException 在这个简短的教程中，我们将探讨在使用findFirst()方法时避免NullPointerException的不同方法。 首先，我们将解释导致该方法因NullPointerException失败的原因。然后，我们将通过实际示例演示如何重现并修复异常。 解释..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T03:31:46.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"NullPointerException"}],["meta",{"property":"article:tag","content":"findFirst()"}],["meta",{"property":"article:tag","content":"Optional"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T03:31:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"处理findFirst()方法中第一个元素为Null时的NullPointerException\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T03:31:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"处理findFirst()方法中第一个元素为Null时的NullPointerException 在这个简短的教程中，我们将探讨在使用findFirst()方法时避免NullPointerException的不同方法。 首先，我们将解释导致该方法因NullPointerException失败的原因。然后，我们将通过实际示例演示如何重现并修复异常。 解释..."},"headers":[{"level":3,"title":"解释问题","slug":"解释问题","link":"#解释问题","children":[]},{"level":3,"title":"重现NullPointerException","slug":"重现nullpointerexception","link":"#重现nullpointerexception","children":[]},{"level":3,"title":"避免异常","slug":"避免异常","link":"#避免异常","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719372706000,"updatedTime":1719372706000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.63,"words":789},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Handling NullPointerException in findFirst   When the First Element Is Null.md","localizedDate":"2024年6月26日","excerpt":"\\n<p>在这个简短的教程中，我们将探讨在使用findFirst()方法时避免NullPointerException的不同方法。</p>\\n<p>首先，我们将解释导致该方法因NullPointerException失败的原因。然后，我们将通过实际示例演示如何重现并修复异常。</p>\\n<h3>解释问题</h3>\\n<p>简而言之，NullPointerException被抛出以表明我们在需要对象的地方使用了null进行了某些操作。</p>\\n<p>通常，我们使用findFirst()来返回一个包含给定流的第一个元素的Optional实例。然而，<strong>根据文档，如果返回的第一个元素是null，该方法会抛出NullPointerException</strong>。</p>","autoDesc":true}');export{d as comp,k as data};
