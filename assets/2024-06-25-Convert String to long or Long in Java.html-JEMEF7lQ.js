import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-BA-MSwOu.js";const t={},o=e('<h1 id="java中将字符串转换为long或long类型" tabindex="-1"><a class="header-anchor" href="#java中将字符串转换为long或long类型"><span>Java中将字符串转换为long或Long类型</span></a></h1><p>在本教程中，我们将探讨如何将一个字符串转换为long基本类型或Long对象。</p><p>假设我们有一个字符串，其值反映了一个数字，这个数字刚好超出了有符号int的范围。我们以Integer.MAX_VALUE + 1为例，即2,147,483,648。</p><h3 id="_2-使用long的构造函数" tabindex="-1"><a class="header-anchor" href="#_2-使用long的构造函数"><span>2. 使用Long的构造函数</span></a></h3><p>给定我们的字符串，我们可以<strong>使用接受字符串作为参数的重载Long构造函数</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Long</span> l <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Long</span><span class="token punctuation">(</span><span class="token string">&quot;2147483648&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将创建一个新的Long实例，可以通过调用longValue()方法将其转换为原始long类型。</p><p>或者，我们可以利用拆箱，在一条语句中将我们的Long对象转换为其原始等价物：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">long</span> l <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Long</span><span class="token punctuation">(</span><span class="token string">&quot;2147483648&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>然而，自Java 9以来，这种构造函数的使用已被弃用，转而推荐使用Long类的静态工厂方法valueOf()或parseLong()。</strong></p><h3 id="_3-使用long-valueof-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用long-valueof-方法"><span>3. 使用Long.valueOf()方法</span></a></h3><p>当我们想从我们的字符串中获取一个Long对象时，建议使用静态工厂方法valueOf()：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Long</span> l <span class="token operator">=</span> <span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token string">&quot;2147483648&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种方法是首选，因为它缓存了常用的Long实例，以提供更好的性能和内存开销。这与每次调用都会创建新实例的构造函数形成对比。</p><h3 id="_4-使用long-parselong-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用long-parselong-方法"><span>4. 使用Long.parseLong()方法</span></a></h3><p>当我们想要返回一个long原始类型时，我们可以使用parseLong()静态工厂方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">long</span> l <span class="token operator">=</span> <span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token function">parseLong</span><span class="token punctuation">(</span><span class="token string">&quot;2147483648&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种方法比构造函数和valueOf()更受推荐，当我们想要获得一个long原始类型时。这是因为它直接返回一个long原始类型，而不需要在转换过程中创建不必要的Long对象。</p><h3 id="_5-使用long-decode-方法" tabindex="-1"><a class="header-anchor" href="#_5-使用long-decode-方法"><span>5. 使用Long.decode()方法</span></a></h3><p>如果我们的字符串是十六进制形式，我们可以使用静态工厂方法decode()将其转换为Long对象。 假设我们有一个字符串的十六进制表示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Long</span> l <span class="token operator">=</span> <span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token string">&quot;0x80000000&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>值得注意的是，这种方法也支持十进制和八进制表示。因此，在使用这种方法时，我们必须<strong>警惕字符串中的前导零</strong>。</p><h3 id="_6-使用apache-commons的numberutils-createlong-方法" tabindex="-1"><a class="header-anchor" href="#_6-使用apache-commons的numberutils-createlong-方法"><span>6. 使用Apache Commons的NumberUtils.createLong()方法</span></a></h3><p>要使用Apache Commons Lang 3，我们需要在pom.xml中添加以下依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.commons``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``commons-lang3``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``3.14.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>静态工厂方法createLong()将字符串转换为Long对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Long</span> l <span class="token operator">=</span> <span class="token class-name">NumberUtils</span><span class="token punctuation">.</span><span class="token function">createLong</span><span class="token punctuation">(</span><span class="token string">&quot;0x80000000&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>它在底层使用Long.decode()，但有一个重要补充——如果字符串参数为null，则返回null。</strong></p><h3 id="_7-使用long-parseunsignedlong-方法" tabindex="-1"><a class="header-anchor" href="#_7-使用long-parseunsignedlong-方法"><span>7. 使用Long.parseUnsignedLong()方法</span></a></h3><p>现在，假设我们有一个字符串，它表示一个超出long原始类型有符号范围的值。我们可以使用parseUnsignedLong()静态工厂方法获得一个无符号的long，范围为0到18,446,744,073,709,551,615：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">long</span> l <span class="token operator">=</span> <span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token function">parseUnsignedLong</span><span class="token punctuation">(</span><span class="token string">&quot;9223372036854775808&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>与本文中探讨的其他选项不同，如果字符串的第一个字符是ASCII负号，将抛出NumberFormatException。</strong></p><h3 id="_8-使用google-guava的longs-tryparse-方法" tabindex="-1"><a class="header-anchor" href="#_8-使用google-guava的longs-tryparse-方法"><span>8. 使用Google Guava的Longs.tryParse()方法</span></a></h3><p>要使用Google Guava，我们需要在pom.xml中添加以下依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.google.guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``33.0.0-jre``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，给定我们的字符串，我们可以使用tryParse()将其转换为Long对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Long</span> l <span class="token operator">=</span> <span class="token class-name">Longs</span><span class="token punctuation">.</span><span class="token function">tryParse</span><span class="token punctuation">(</span><span class="token string">&quot;2147483648&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>到目前为止，我们探讨的所有选项在无法解析字符串时都会抛出NumberFormatException。</strong> 因此，如果我们想要避免抛出这个异常的可能性，我们可以使用静态工厂方法tryParse()，它返回null而不是抛出异常：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenInvalidString_whenUsingGuavaLongs_thenObtainNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token class-name">Longs</span><span class="token punctuation">.</span><span class="token function">tryParse</span><span class="token punctuation">(</span><span class="token string">&quot;Invalid String&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-结论" tabindex="-1"><a class="header-anchor" href="#_9-结论"><span>9. 结论</span></a></h3><p>在本文中，我们了解到parseLong()是获取给定字符串的long原始类型的首选方法。我们还看到valueOf()是获取给定字符串的Long对象的首选方法。</p><p>如常，本文中使用的代码示例可以在GitHub上找到。</p>',42),p=[o];function l(c,i){return s(),a("div",null,p)}const r=n(t,[["render",l],["__file","2024-06-25-Convert String to long or Long in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-Convert%20String%20to%20long%20or%20Long%20in%20Java.html","title":"Java中将字符串转换为long或Long类型","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Java","编程"],"tag":["String","Long","转换"],"head":[["meta",{"name":"keywords","content":"Java, String to Long, 转换, 编程技巧"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-Convert%20String%20to%20long%20or%20Long%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将字符串转换为long或Long类型"}],["meta",{"property":"og:description","content":"Java中将字符串转换为long或Long类型 在本教程中，我们将探讨如何将一个字符串转换为long基本类型或Long对象。 假设我们有一个字符串，其值反映了一个数字，这个数字刚好超出了有符号int的范围。我们以Integer.MAX_VALUE + 1为例，即2,147,483,648。 2. 使用Long的构造函数 给定我们的字符串，我们可以使用接..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T03:51:09.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:tag","content":"Long"}],["meta",{"property":"article:tag","content":"转换"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T03:51:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将字符串转换为long或Long类型\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T03:51:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将字符串转换为long或Long类型 在本教程中，我们将探讨如何将一个字符串转换为long基本类型或Long对象。 假设我们有一个字符串，其值反映了一个数字，这个数字刚好超出了有符号int的范围。我们以Integer.MAX_VALUE + 1为例，即2,147,483,648。 2. 使用Long的构造函数 给定我们的字符串，我们可以使用接..."},"headers":[{"level":3,"title":"2. 使用Long的构造函数","slug":"_2-使用long的构造函数","link":"#_2-使用long的构造函数","children":[]},{"level":3,"title":"3. 使用Long.valueOf()方法","slug":"_3-使用long-valueof-方法","link":"#_3-使用long-valueof-方法","children":[]},{"level":3,"title":"4. 使用Long.parseLong()方法","slug":"_4-使用long-parselong-方法","link":"#_4-使用long-parselong-方法","children":[]},{"level":3,"title":"5. 使用Long.decode()方法","slug":"_5-使用long-decode-方法","link":"#_5-使用long-decode-方法","children":[]},{"level":3,"title":"6. 使用Apache Commons的NumberUtils.createLong()方法","slug":"_6-使用apache-commons的numberutils-createlong-方法","link":"#_6-使用apache-commons的numberutils-createlong-方法","children":[]},{"level":3,"title":"7. 使用Long.parseUnsignedLong()方法","slug":"_7-使用long-parseunsignedlong-方法","link":"#_7-使用long-parseunsignedlong-方法","children":[]},{"level":3,"title":"8. 使用Google Guava的Longs.tryParse()方法","slug":"_8-使用google-guava的longs-tryparse-方法","link":"#_8-使用google-guava的longs-tryparse-方法","children":[]},{"level":3,"title":"9. 结论","slug":"_9-结论","link":"#_9-结论","children":[]}],"git":{"createdTime":1719287469000,"updatedTime":1719287469000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.35,"words":1006},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-Convert String to long or Long in Java.md","localizedDate":"2024年6月25日","excerpt":"\\n<p>在本教程中，我们将探讨如何将一个字符串转换为long基本类型或Long对象。</p>\\n<p>假设我们有一个字符串，其值反映了一个数字，这个数字刚好超出了有符号int的范围。我们以Integer.MAX_VALUE + 1为例，即2,147,483,648。</p>\\n<h3>2. 使用Long的构造函数</h3>\\n<p>给定我们的字符串，我们可以<strong>使用接受字符串作为参数的重载Long构造函数</strong>：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">Long</span> l <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Long</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"2147483648\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
