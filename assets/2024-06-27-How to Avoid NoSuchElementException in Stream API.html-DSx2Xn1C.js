import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-D5kFWV-m.js";const e={},p=t('<h1 id="如何在使用stream-api时避免nosuchelementexception异常" tabindex="-1"><a class="header-anchor" href="#如何在使用stream-api时避免nosuchelementexception异常"><span>如何在使用Stream API时避免NoSuchElementException异常</span></a></h1><p>在这篇简短的教程中，我们将解释在使用Stream API时如何避免NoSuchElementException异常。</p><p>首先，我们将解释异常的主要原因。然后，我们将通过实际示例展示如何重现并修复它。</p><h2 id="_2-异常的原因" tabindex="-1"><a class="header-anchor" href="#_2-异常的原因"><span>2. 异常的原因</span></a></h2><p>在深入细节之前，让我们先了解这个异常的含义。</p><p><strong>简而言之，NoSuchElementException是在请求的元素不存在时抛出的信号</strong>。例如，尝试访问不可用或不存在的元素将导致此异常。</p><p>通常，在Stream API中使用时，调用空Optional实例上的get()法是最常见的原因之一。</p><h2 id="_3-产生异常" tabindex="-1"><a class="header-anchor" href="#_3-产生异常"><span>3. 产生异常</span></a></h2><p>现在我们知道了异常是什么，让我们深入了解如何在实践中重现它。</p><p>例如，让我们创建一个名字列表并使用Stream API进行过滤：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span><span class="token punctuation">(</span>expected <span class="token operator">=</span> <span class="token class-name">NoSuchElementException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenEmptyOptional_whenCallingGetMethod_thenThrowNoSuchElementException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` names <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;William&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Amelia&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Albert&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Philip&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Optional</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` emptyOptional <span class="token operator">=</span> names<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>name <span class="token operator">-&gt;</span> name<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;Emma&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    emptyOptional<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，我们使用filter()方法查找名字&quot;Emma&quot;。此外，我们使用findFirst()方法链接，以获取包含第一个找到的元素的Optional，或者如果过滤后的流为空，则获取一个空的Optional。</p><p>在这里，我们的列表不包含名字&quot;Emma&quot;，因此findFirst()返回一个空的Optional。<strong>测试用例因NoSuchElementException异常而失败，因为我们正在尝试获取一个不存在的名字，而空的Optional不包含任何值</strong>。</p><h2 id="_4-避免异常" tabindex="-1"><a class="header-anchor" href="#_4-避免异常"><span>4. 避免异常</span></a></h2><p>现在，让我们看看如何修复异常。最简单的方法是在调用get()方法之前检查我们的Optional实例中是否有值。</p><p>幸运的是，Stream API提供了isPresent()方法，专门用于此目的。让我们看看它的实际应用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenEmptyOptional_whenUsingIsPresentMethod_thenReturnDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` names <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Tyler&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Amelia&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;James&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Emma&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Optional</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` emptyOptional <span class="token operator">=</span> names<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>name <span class="token operator">-&gt;</span> name<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;Lucas&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string">&quot;unknown&quot;</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>emptyOptional<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        name <span class="token operator">=</span> emptyOptional<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;unknown&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在这里，我们使用isPresent()确保在调用get()方法之前Optional实例中有值</strong>。这样，我们避免了NoSuchElementException异常。</p><p>请注意，使用isPresent()的使用伴随着if-else语句的成本。那么，我们能做得更好吗？是的！</p><p>通常，最好的方法是使用orElse()方法。<strong>简而言之，如果存在值，则此方法返回该值，否则返回给定的回退参数</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenEmptyOptional_whenUsingOrElseMethod_thenReturnDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` names <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Nicholas&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Justin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;James&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Optional</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` emptyOptional <span class="token operator">=</span> names<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>name <span class="token operator">-&gt;</span> name<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;Lucas&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">String</span> name <span class="token operator">=</span> emptyOptional<span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token string">&quot;unknown&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;unknown&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，这种方法提供了一种更便捷、更直接的方式来避免NoSuchElementException。</p><p>或者，我们可以使用orElseGet()方法来实现相同的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenEmptyOptional_whenUsingOrElseGetMethod_thenReturnDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` names <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Thomas&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Catherine&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;David&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Olivia&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Optional</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` emptyOptional <span class="token operator">=</span> names<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>name <span class="token operator">-&gt;</span> name<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;Liam&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">String</span> name <span class="token operator">=</span> emptyOptional<span class="token punctuation">.</span><span class="token function">orElseGet</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;unknown&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;unknown&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与orElse()不同，orElseGet()接受一个供应商作为参数。<strong>另一个关键区别是orElse()在所有情况下都执行，即使Optional实例有值。然而，orElseGet()仅在Optional值不存在时执行</strong>。</p><p>请注意，我们关于orElse()和orElseGet()方法之间区别的文章很好地涵盖了这个话题。</p><h2 id="_5-避免nosuchelementexception的最佳实践" tabindex="-1"><a class="header-anchor" href="#_5-避免nosuchelementexception的最佳实践"><span>5. 避免NoSuchElementException的最佳实践</span></a></h2><p>简而言之，在使用Stream API避免NoSuchElementException异常时，有几个关键点需要注意：</p><ul><li>在调用get()方法之前，始终检查返回的流/可选是否不为空。</li><li>尝试使用orElse()或orElseGet()定义回退值。</li><li>在调用流的任何终端操作之前使用过滤器。</li></ul><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇短文中，我们探讨了在使用Stream API时避免NoSuchElementException异常的不同方法。</p><p>在此过程中，我们说明了如何重现异常以及如何使用实际示例来避免它。</p><p>如往常一样，示例的完整源代码可在GitHub上找到。</p>',33),o=[p];function c(i,l){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-27-How to Avoid NoSuchElementException in Stream API.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-How%20to%20Avoid%20NoSuchElementException%20in%20Stream%20API.html","title":"如何在使用Stream API时避免NoSuchElementException异常","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","编程"],"tag":["Stream API","NoSuchElementException"],"head":[["meta",{"name":"keywords","content":"Java, Stream API, NoSuchElementException, 异常处理"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-How%20to%20Avoid%20NoSuchElementException%20in%20Stream%20API.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在使用Stream API时避免NoSuchElementException异常"}],["meta",{"property":"og:description","content":"如何在使用Stream API时避免NoSuchElementException异常 在这篇简短的教程中，我们将解释在使用Stream API时如何避免NoSuchElementException异常。 首先，我们将解释异常的主要原因。然后，我们将通过实际示例展示如何重现并修复它。 2. 异常的原因 在深入细节之前，让我们先了解这个异常的含义。 简而言..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T09:51:48.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Stream API"}],["meta",{"property":"article:tag","content":"NoSuchElementException"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T09:51:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在使用Stream API时避免NoSuchElementException异常\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T09:51:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在使用Stream API时避免NoSuchElementException异常 在这篇简短的教程中，我们将解释在使用Stream API时如何避免NoSuchElementException异常。 首先，我们将解释异常的主要原因。然后，我们将通过实际示例展示如何重现并修复它。 2. 异常的原因 在深入细节之前，让我们先了解这个异常的含义。 简而言..."},"headers":[{"level":2,"title":"2. 异常的原因","slug":"_2-异常的原因","link":"#_2-异常的原因","children":[]},{"level":2,"title":"3. 产生异常","slug":"_3-产生异常","link":"#_3-产生异常","children":[]},{"level":2,"title":"4. 避免异常","slug":"_4-避免异常","link":"#_4-避免异常","children":[]},{"level":2,"title":"5. 避免NoSuchElementException的最佳实践","slug":"_5-避免nosuchelementexception的最佳实践","link":"#_5-避免nosuchelementexception的最佳实践","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719481908000,"updatedTime":1719481908000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.23,"words":968},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-How to Avoid NoSuchElementException in Stream API.md","localizedDate":"2024年6月27日","excerpt":"\\n<p>在这篇简短的教程中，我们将解释在使用Stream API时如何避免NoSuchElementException异常。</p>\\n<p>首先，我们将解释异常的主要原因。然后，我们将通过实际示例展示如何重现并修复它。</p>\\n<h2>2. 异常的原因</h2>\\n<p>在深入细节之前，让我们先了解这个异常的含义。</p>\\n<p><strong>简而言之，NoSuchElementException是在请求的元素不存在时抛出的信号</strong>。例如，尝试访问不可用或不存在的元素将导致此异常。</p>\\n<p>通常，在Stream API中使用时，调用空Optional实例上的get()法是最常见的原因之一。</p>","autoDesc":true}');export{k as comp,m as data};
