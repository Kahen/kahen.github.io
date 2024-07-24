import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-BkL9UgS7.js";const p={},o=t('<hr><h1 id="java中将list-long-对象转换为long-数组" tabindex="-1"><a class="header-anchor" href="#java中将list-long-对象转换为long-数组"><span>Java中将List<code>&lt;Long&gt;</code>对象转换为Long[]数组</span></a></h1><p>列表和数组是Java中存储对象的两种常见方式。在我们需要存储和操作数据的项目中，列表和数组都允许在我们的程序执行过程中存储数据。</p><p>本教程解释了如何在Java中将List<code>&lt;Long&gt;</code>对象转换为Long[]数组。</p><h3 id="_2-使用list-toarray-方法" tabindex="-1"><a class="header-anchor" href="#_2-使用list-toarray-方法"><span>2. 使用List.toArray()方法</span></a></h3><p>List接口提供了toArray()方法，该方法返回一个包含所有列表元素的数组对象。</p><p>让我们看看如何使用toArray()方法将List<code>&lt;Long&gt;</code>对象转换为Java中的Long[]数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>`````````` list <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> <span class="token number">2L</span><span class="token punctuation">,</span> <span class="token number">3L</span><span class="token punctuation">,</span> <span class="token number">4L</span><span class="token punctuation">,</span> <span class="token number">5L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Long</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Long</span><span class="token punctuation">[</span>list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\narray <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span>array<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们创建了一个新的Long值数组，其大小与我们要转换的列表相同。我们还可以通过传递一个空数组，并将内存分配委托给JVM：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>`````````` list <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> <span class="token number">2L</span><span class="token punctuation">,</span> <span class="token number">3L</span><span class="token punctuation">,</span> <span class="token number">4L</span><span class="token punctuation">,</span> <span class="token number">5L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Long</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Long</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\narray <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span>array<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-使用guava库" tabindex="-1"><a class="header-anchor" href="#_3-使用guava库"><span>3. 使用Guava库</span></a></h3><p>Guava库提供了Longs.toArray()方法，该方法将Long值的集合转换为相同顺序的Long数组。</p><p>让我们展示如何使用Guava的Longs.toArray()方法将List<code>&lt;Long&gt;</code>对象转换为Long[]数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>`````````` list <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> <span class="token number">2L</span><span class="token punctuation">,</span> <span class="token number">3L</span><span class="token punctuation">,</span> <span class="token number">4L</span><span class="token punctuation">,</span> <span class="token number">5L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">long</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array <span class="token operator">=</span> <span class="token class-name">Longs</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该意识到，如果传递的集合或其任何元素为null，Guava的Longs.toArray()方法将抛出NullPointerException。</p><h3 id="_4-使用stream-maptolong-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用stream-maptolong-方法"><span>4. 使用Stream.mapToLong()方法</span></a></h3><p>Java 8允许使用Stream API将List转换为数组。首先，我们必须使用List.stream()方法将所需的列表转换为流。其次，我们将应用Stream.mapToLong()方法以返回LongStream。最后，我们将使用Stream.toArray()方法返回包含来自流的Long元素的数组。</p><p>现在让我们看看如何在两种不同方式中实现mapToLong()方法。</p><p>首先，让我们使用lambda表达式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>`````````` list <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> <span class="token number">2L</span><span class="token punctuation">,</span> <span class="token number">3L</span><span class="token punctuation">,</span> <span class="token number">4L</span><span class="token punctuation">,</span> <span class="token number">5L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">long</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mapToLong</span><span class="token punctuation">(</span>l <span class="token operator">-&gt;</span> l<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>其次，让我们使用方法引用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>`````````` list <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> <span class="token number">2L</span><span class="token punctuation">,</span> <span class="token number">3L</span><span class="token punctuation">,</span> <span class="token number">4L</span><span class="token punctuation">,</span> <span class="token number">5L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">long</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mapToLong</span><span class="token punctuation">(</span><span class="token class-name">Long</span><span class="token operator">::</span><span class="token function">longValue</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们学习了如何使用三种方法将Java中的List<code>&lt;Long&gt;</code>对象转换为Long[]数组。第一种方法使用了List.toArray()方法。第二种，我们使用了Guava的Longs.toArray()方法。最后，我们通过mapToLong()方法使用了Java 8 Stream API。</p><p>如往常一样，代码示例可在GitHub上找到。</p>',25),e=[o];function c(l,i){return s(),n("div",null,e)}const k=a(p,[["render",c],["__file","2024-07-01-Convert List to Long   Array in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Convert%20List%20to%20Long%20%20%20Array%20in%20Java.html","title":"Java中将List<Long>对象转换为Long[]数组","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["List to Array","Java 8","Guava"],"head":[["meta",{"name":"keywords","content":"Java, List, Array, Convert, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Convert%20List%20to%20Long%20%20%20Array%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将List<Long>对象转换为Long[]数组"}],["meta",{"property":"og:description","content":"Java中将List<Long>对象转换为Long[]数组 列表和数组是Java中存储对象的两种常见方式。在我们需要存储和操作数据的项目中，列表和数组都允许在我们的程序执行过程中存储数据。 本教程解释了如何在Java中将List<Long>对象转换为Long[]数组。 2. 使用List.toArray()方法 List接口提供了toArray()方法..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T21:30:30.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"List to Array"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"Guava"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T21:30:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将List<Long>对象转换为Long[]数组\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T21:30:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将List<Long>对象转换为Long[]数组 列表和数组是Java中存储对象的两种常见方式。在我们需要存储和操作数据的项目中，列表和数组都允许在我们的程序执行过程中存储数据。 本教程解释了如何在Java中将List<Long>对象转换为Long[]数组。 2. 使用List.toArray()方法 List接口提供了toArray()方法..."},"headers":[{"level":3,"title":"2. 使用List.toArray()方法","slug":"_2-使用list-toarray-方法","link":"#_2-使用list-toarray-方法","children":[]},{"level":3,"title":"3. 使用Guava库","slug":"_3-使用guava库","link":"#_3-使用guava库","children":[]},{"level":3,"title":"4. 使用Stream.mapToLong()方法","slug":"_4-使用stream-maptolong-方法","link":"#_4-使用stream-maptolong-方法","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719869430000,"updatedTime":1719869430000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.07,"words":622},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Convert List to Long   Array in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中将List<code>&lt;Long&gt;</code>对象转换为Long[]数组</h1>\\n<p>列表和数组是Java中存储对象的两种常见方式。在我们需要存储和操作数据的项目中，列表和数组都允许在我们的程序执行过程中存储数据。</p>\\n<p>本教程解释了如何在Java中将List<code>&lt;Long&gt;</code>对象转换为Long[]数组。</p>\\n<h3>2. 使用List.toArray()方法</h3>\\n<p>List接口提供了toArray()方法，该方法返回一个包含所有列表元素的数组对象。</p>\\n<p>让我们看看如何使用toArray()方法将List<code>&lt;Long&gt;</code>对象转换为Java中的Long[]数组：</p>","autoDesc":true}');export{k as comp,d as data};
