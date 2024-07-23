import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-LwwahXlT.js";const p={},e=t(`<hr><h1 id="java中将字符串arraylist转换为字符串数组" tabindex="-1"><a class="header-anchor" href="#java中将字符串arraylist转换为字符串数组"><span>Java中将字符串ArrayList转换为字符串数组</span></a></h1><p>在Java中，数据操作经常涉及到将数据结构从一种形式转换为另一种形式。一个常见的任务是将字符串ArrayList转换为字符串数组。</p><p>在本教程中，我们将探讨如何使用Java内置的方法和技术无缝完成这种转换。</p><h3 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h3><p>一个示例可以帮助我们快速理解问题。假设我们有以下ArrayList，其中包含一些艺术家的名字：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token constant">INPUT_LIST</span> <span class="token operator">=</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token string">&quot;Michael Bolton&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Michael Jackson&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Guns and Roses&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Bryan Adams&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Air Supply&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们想要将这个ArrayList转换为一个包含相同艺术家名字的字符串数组，顺序相同：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token constant">EXPECTED_ARRAY</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;Michael Bolton&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Michael Jackson&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Guns and Roses&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Bryan Adams&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Air Supply&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这看起来是一个简单的任务，因为Java标准库提供了Collection.toArray()方法来将集合转换为数组。toArray()方法返回一个Object[]数组。由于列表的类型是List<code>&lt;String&gt;</code>，所有元素都是字符串。所以我们可能认为将对象数组转换为String[]是安全的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token constant">INPUT_LIST</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们运行这行代码，我们可以看到这样的输出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>ClassCastException</span><span class="token operator">:</span> <span class="token keyword">class</span> <span class="token punctuation">[</span><span class="token class-name">Ljava</span><span class="token punctuation">.</span>lang<span class="token punctuation">.</span>Object<span class="token punctuation">;</span> cannot be cast <span class="token keyword">to</span> <span class="token keyword">class</span> <span class="token punctuation">[</span><span class="token class-name">Ljava</span><span class="token punctuation">.</span>lang<span class="token punctuation">.</span>String<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如我们所看到的，抛出了ClassCastException。这是因为Java的泛型类型只在编译时存在。也就是说，在运行时，toArray()方法返回的数组不知道其元素的具体类型。它们可能是String、Integer，甚至是由于Object类是所有其他类型的超类，所以可能由不同类型混合而成。因此，Java抛出ClassCastException并拒绝Object[]到String[]的转换。</p><p>接下来，让我们看看将字符串ArrayList转换为字符串数组的正确方法。为了简单起见，我们将使用单元测试断言来验证每种方法是否返回预期的结果。</p><h3 id="_3-在循环中填充预先声明的字符串数组" tabindex="-1"><a class="header-anchor" href="#_3-在循环中填充预先声明的字符串数组"><span>3. 在循环中填充预先声明的字符串数组</span></a></h3><p>解决我们问题的直接方法是遍历字符串ArrayList，取出每个元素，并填充一个预先声明的字符串数组。接下来，让我们实现它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token constant">INPUT_LIST</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> <span class="token constant">INPUT_LIST</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token constant">INPUT_LIST</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_ARRAY</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的实现中，我们首先声明了一个字符串数组，其长度与给定ArrayList的大小相同。然后，在for循环中填充数组。</p><h3 id="_4-使用toarray-t-a-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用toarray-t-a-方法"><span>4. 使用toArray(T[] a)方法</span></a></h3><p>我们之前在使用Collection.toArray()方法时遇到了ClassCastException。Collection接口还定义了另一个带有参数T[] a的toArray()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\` <span class="token class-name">T</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">toArray</span><span class="token punctuation">(</span><span class="token class-name">T</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>方法签名显示该方法返回T[]而不是Object[]。接下来，让我们看看如何使用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token constant">INPUT_LIST</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token constant">INPUT_LIST</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_ARRAY</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，我们创建了一个新的字符串数组，其大小足以容纳列表中的元素。因此，在将其传递给toArray()之后，数组被列表中的元素填充。</p><p>然而，如果我们传递给toArray()的字符串数组没有足够的空间来容纳列表中的元素，我们将从toArray()得到一个新的数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result2 <span class="token operator">=</span> <span class="token constant">INPUT_LIST</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_ARRAY</span><span class="token punctuation">,</span> result2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-使用stream-api" tabindex="-1"><a class="header-anchor" href="#_5-使用stream-api"><span>5. 使用Stream API</span></a></h3><p>假设我们使用Java 8或更高版本。我们还可以使用Stream API来解决这个问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token constant">INPUT_LIST</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_ARRAY</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Stream的toArray()方法接受一个生成器函数，该函数在所需的类型中分配返回的数组。在这种情况下，我们可以简单地取String[]的构造函数作为方法引用，并将其作为函数传递给toArray()。</p><h3 id="_6-java-11" tabindex="-1"><a class="header-anchor" href="#_6-java-11"><span>6. Java 11+</span></a></h3><p>最后，如果我们使用Java 11或更高版本，我们可以直接调用Collection.toArray(generatorFunc)来获取转换后的数组，而无需先将列表转换为Stream：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token constant">INPUT_LIST</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_ARRAY</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h3><p>在本文中，我们首先讨论了为什么(String[])myList.toArray()会抛出ClassCastException。然后，我们通过示例学习了将String ArrayList转换为String数组的不同方法。</p><p>如往常一样，示例的完整源代码可在GitHub上找到。</p>`,37),o=[e];function c(l,i){return s(),n("div",null,o)}const k=a(p,[["render",c],["__file","2024-07-01-Convert an ArrayList of String to a String Array in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Convert%20an%20ArrayList%20of%20String%20to%20a%20String%20Array%20in%20Java.html","title":"Java中将字符串ArrayList转换为字符串数组","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","ArrayList"],"tag":["Java","ArrayList","String Array"],"head":[["meta",{"name":"keywords","content":"Java, ArrayList, String Array, Conversion"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Convert%20an%20ArrayList%20of%20String%20to%20a%20String%20Array%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将字符串ArrayList转换为字符串数组"}],["meta",{"property":"og:description","content":"Java中将字符串ArrayList转换为字符串数组 在Java中，数据操作经常涉及到将数据结构从一种形式转换为另一种形式。一个常见的任务是将字符串ArrayList转换为字符串数组。 在本教程中，我们将探讨如何使用Java内置的方法和技术无缝完成这种转换。 2. 问题介绍 一个示例可以帮助我们快速理解问题。假设我们有以下ArrayList，其中包含一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T18:36:41.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"ArrayList"}],["meta",{"property":"article:tag","content":"String Array"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T18:36:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将字符串ArrayList转换为字符串数组\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T18:36:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将字符串ArrayList转换为字符串数组 在Java中，数据操作经常涉及到将数据结构从一种形式转换为另一种形式。一个常见的任务是将字符串ArrayList转换为字符串数组。 在本教程中，我们将探讨如何使用Java内置的方法和技术无缝完成这种转换。 2. 问题介绍 一个示例可以帮助我们快速理解问题。假设我们有以下ArrayList，其中包含一..."},"headers":[{"level":3,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":3,"title":"3. 在循环中填充预先声明的字符串数组","slug":"_3-在循环中填充预先声明的字符串数组","link":"#_3-在循环中填充预先声明的字符串数组","children":[]},{"level":3,"title":"4. 使用toArray(T[] a)方法","slug":"_4-使用toarray-t-a-方法","link":"#_4-使用toarray-t-a-方法","children":[]},{"level":3,"title":"5. 使用Stream API","slug":"_5-使用stream-api","link":"#_5-使用stream-api","children":[]},{"level":3,"title":"6. Java 11+","slug":"_6-java-11","link":"#_6-java-11","children":[]},{"level":3,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719859001000,"updatedTime":1719859001000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.61,"words":1083},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Convert an ArrayList of String to a String Array in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中将字符串ArrayList转换为字符串数组</h1>\\n<p>在Java中，数据操作经常涉及到将数据结构从一种形式转换为另一种形式。一个常见的任务是将字符串ArrayList转换为字符串数组。</p>\\n<p>在本教程中，我们将探讨如何使用Java内置的方法和技术无缝完成这种转换。</p>\\n<h3>2. 问题介绍</h3>\\n<p>一个示例可以帮助我们快速理解问题。假设我们有以下ArrayList，其中包含一些艺术家的名字：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">List</span>``<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>`` <span class=\\"token constant\\">INPUT_LIST</span> <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Lists</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">newArrayList</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Michael Bolton\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Michael Jackson\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Guns and Roses\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Bryan Adams\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Air Supply\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
