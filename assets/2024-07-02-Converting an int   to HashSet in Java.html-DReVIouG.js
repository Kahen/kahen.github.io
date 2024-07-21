import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-CXN34Kw1.js";const e={},p=t('<h1 id="java中将int-转换为hashset" tabindex="-1"><a class="header-anchor" href="#java中将int-转换为hashset"><span>Java中将int[]转换为HashSet</span></a></h1><p>数组和HashSet有一个共同的特点——它们都用于存储元素集合。然而，它们在底层实现和适用用例上有所不同。此外，一个区别是我们可以在数组中存储原始类型，但不能在HashSet中存储。</p><p>在本教程中，我们将学习如何使用多种方法将int[]转换为Java中的HashSet<code>&lt;Integer&gt;</code>。</p><h3 id="_2-理解场景" tabindex="-1"><a class="header-anchor" href="#_2-理解场景"><span>2. 理解场景</span></a></h3><p>首先，我们通过一些元素初始化一个int[]，arr：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们在expected变量中定义我们期望的结果，类型为HashSet<code>&lt;Integer&gt;</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HashSet</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````````` expected <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们看看我们是否可以使用Arrays.asList()方法来创建一个列表，并将其传递给HashSet的构造函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HashSet</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````````` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>不幸的是，编译器不允许这样做，并给出了一个错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>java<span class="token operator">:</span> incompatible types<span class="token operator">:</span> cannot infer type arguments <span class="token keyword">for</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span>\n    reason<span class="token operator">:</span> inference variable <span class="token class-name">E</span> has incompatible bounds\n      equality constraints<span class="token operator">:</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>Integer</span>\n      lower bounds<span class="token operator">:</span> <span class="token class-name">T</span><span class="token punctuation">,</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到它未能正确推断类型。</p><p>最后，让我们确认这种方法给我们一个int[]类型的HashSet，而不是HashSet<code>&lt;Integer&gt;</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HashSet</span>`<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> result<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertNotEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，我们在HashSet中得到了一个int[]类型的单一元素。</p><h3 id="_3-使用循环" tabindex="-1"><a class="header-anchor" href="#_3-使用循环"><span>3. 使用循环</span></a></h3><p>解决这个用例最直接的方法是编写一个for循环，遍历数组并将每个成员添加到result HashSet中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HashSet</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````````` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们可以通过断言result等于expected HashSet来验证我们的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>太好了！它按预期工作。</p><h3 id="_4-使用java-streams" tabindex="-1"><a class="header-anchor" href="#_4-使用java-streams"><span>4. 使用Java Streams</span></a></h3><p>使用Java 8或更高版本，我们可以使用streams来实现我们的目标。</p><p>让我们使用Arrays.stream()方法从我们的int数组创建一个整数流，并通过中间处理将每个整数收集到HashSet中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HashSet</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````````` result <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">boxed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toCollection</span><span class="token punctuation">(</span><span class="token class-name">HashSet</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重要的是要注意我们使用了boxed()方法将int类型转换为Integer类型。</p><p>最后，让我们验证我们的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>完美！它给出了正确的结果。</p><h3 id="_5-使用commons-lang库" tabindex="-1"><a class="header-anchor" href="#_5-使用commons-lang库"><span>5. 使用Commons Lang库</span></a></h3><p>在这一部分，我们将学习如何使用Commons Lang库解决我们的用例。</p><h4 id="_5-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_5-1-maven依赖"><span>5.1. Maven依赖</span></a></h4><p>让我们首先在pom.xml文件中添加commons-lang3工件的依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.commons``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``commons-lang3``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``3.14.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>太好了！我们现在可以使用这个库了。</p><h4 id="_5-2-使用arrayutils-toobject-方法" tabindex="-1"><a class="header-anchor" href="#_5-2-使用arrayutils-toobject-方法"><span>5.2. 使用ArrayUtils.toObject()方法</span></a></h4><p>现在，让我们使用ArrayUtils.toObject()方法将数组从int类型转换为Integer类型。</p><p>进一步地，我们可以将对象类型传递给Arrays.asList()方法并创建HashSet对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HashSet</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````````` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token class-name">ArrayUtils</span><span class="token punctuation">.</span><span class="token function">toObject</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>像以前一样，用一个简单的测试来增强我们代码的信心是一个好习惯：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>太棒了！看来我们搞定了这个问题。</p><h3 id="_6-使用guava库" tabindex="-1"><a class="header-anchor" href="#_6-使用guava库"><span>6. 使用Guava库</span></a></h3><p>继续，让我们探索如何使用Guava库解决这个问题。</p><h4 id="_6-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_6-1-maven依赖"><span>6.1. Maven依赖</span></a></h4><p>在我们可以使用库方法之前，让我们在项目的pom.xml文件中添加guava工件的依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.google.guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``32.1.2-jre``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在可以使用这个库了。</p><h4 id="_6-2-使用ints-aslist-方法" tabindex="-1"><a class="header-anchor" href="#_6-2-使用ints-aslist-方法"><span>6.2. 使用Ints.asList()方法</span></a></h4><p>我们可以使用Ints.asList()方法从int数组中获取一个包含所有成员的Integer列表。因此，在这个办法中我们不需要Arrays.asList()方法。</p><p>那么，让我们继续通过传递Integer类型的列表来创建结果HashSet：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HashSet</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````````` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Ints</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>另外，我们不要忘记测试我们的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它按预期工作。</p><h3 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h3><p>在这篇文章中，我们<strong>学习了如何将int[]转换为HashSet集合</strong>以改善数据处理。</p><p>一方面，我们使用了循环结构和Java流等原生方法来解决用例。另一方面，我们还探索了Apache Commons Lang和Google Guava等流行库来解决这个问题。</p><p>如常，完整的教程源代码可在GitHub上找到。</p>',60),c=[p];function o(l,i){return s(),n("div",null,c)}const d=a(e,[["render",o],["__file","2024-07-02-Converting an int   to HashSet in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Converting%20an%20int%20%20%20to%20HashSet%20in%20Java.html","title":"Java中将int[]转换为HashSet","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Collections"],"tag":["Java","HashSet","Arrays"],"head":[["meta",{"name":"keywords","content":"Java, int[], HashSet, Arrays, Collections"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Converting%20an%20int%20%20%20to%20HashSet%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将int[]转换为HashSet"}],["meta",{"property":"og:description","content":"Java中将int[]转换为HashSet 数组和HashSet有一个共同的特点——它们都用于存储元素集合。然而，它们在底层实现和适用用例上有所不同。此外，一个区别是我们可以在数组中存储原始类型，但不能在HashSet中存储。 在本教程中，我们将学习如何使用多种方法将int[]转换为Java中的HashSet<Integer>。 2. 理解场景 首先，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T04:36:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"HashSet"}],["meta",{"property":"article:tag","content":"Arrays"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T04:36:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将int[]转换为HashSet\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T04:36:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将int[]转换为HashSet 数组和HashSet有一个共同的特点——它们都用于存储元素集合。然而，它们在底层实现和适用用例上有所不同。此外，一个区别是我们可以在数组中存储原始类型，但不能在HashSet中存储。 在本教程中，我们将学习如何使用多种方法将int[]转换为Java中的HashSet<Integer>。 2. 理解场景 首先，..."},"headers":[{"level":3,"title":"2. 理解场景","slug":"_2-理解场景","link":"#_2-理解场景","children":[]},{"level":3,"title":"3. 使用循环","slug":"_3-使用循环","link":"#_3-使用循环","children":[]},{"level":3,"title":"4. 使用Java Streams","slug":"_4-使用java-streams","link":"#_4-使用java-streams","children":[]},{"level":3,"title":"5. 使用Commons Lang库","slug":"_5-使用commons-lang库","link":"#_5-使用commons-lang库","children":[]},{"level":3,"title":"6. 使用Guava库","slug":"_6-使用guava库","link":"#_6-使用guava库","children":[]},{"level":3,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719894984000,"updatedTime":1719894984000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.54,"words":1063},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Converting an int   to HashSet in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>数组和HashSet有一个共同的特点——它们都用于存储元素集合。然而，它们在底层实现和适用用例上有所不同。此外，一个区别是我们可以在数组中存储原始类型，但不能在HashSet中存储。</p>\\n<p>在本教程中，我们将学习如何使用多种方法将int[]转换为Java中的HashSet<code>&lt;Integer&gt;</code>。</p>\\n<h3>2. 理解场景</h3>\\n<p>首先，我们通过一些元素初始化一个int[]，arr：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> arr <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">4</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">5</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
