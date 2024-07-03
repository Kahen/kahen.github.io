import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D5eVDadB.js";const p={},e=t('<h1 id="java中将字符串转换为字符列表的方法" tabindex="-1"><a class="header-anchor" href="#java中将字符串转换为字符列表的方法"><span>Java中将字符串转换为字符列表的方法</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Java提供了多种操作字符串的方法。</p><p><strong>在本教程中，我们将探索一个常见的需求，即将字符串转换为字符列表。</strong></p><h2 id="_2-使用-tochararray" tabindex="-1"><a class="header-anchor" href="#_2-使用-tochararray"><span>2. 使用 toCharArray()</span></a></h2><p>toCharArray() 是将字符串转换为字符数组的直接方式。</p><p>让我们看看以下代码示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenString_whenUsingToCharArray_thenConvertToCharList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> charArray <span class="token operator">=</span> inputString<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>`````` charList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> c <span class="token operator">:</span> charArray<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        charList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>inputString<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> charList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，我们使用 toCharArray() 方法将提供的 inputString 系统地转换为字符数组。<strong>然后，我们遍历这个字符数组，系统地将一个名为 charList 的 List<code>&lt;Character&gt;</code> 填充，以有效地表示原始字符串中的每个字符。</strong></p><p>为了验证这种转换的准确性，然后使用断言来确保原始 inputString 和结果 charList 长度的相等性。</p><h2 id="_3-使用-java-流" tabindex="-1"><a class="header-anchor" href="#_3-使用-java-流"><span>3. 使用 Java 流</span></a></h2><p>随着 Java 8 的推出，我们可以利用流以更简洁和功能性的方式实现转换。</p><p>让我们看看这个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenString_whenUsingMapToObj_thenConvertToCharList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>`````` charList <span class="token operator">=</span> inputString<span class="token punctuation">.</span><span class="token function">chars</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">mapToObj</span><span class="token punctuation">(</span>c <span class="token operator">-&gt;</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> c<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>inputString<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> charList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们对 inputString 使用 mapToObj() 操作来处理其 Unicode 码点。**具体来说，这允许我们将每个码点转换为其对应的字符。**然后，我们使用 toList() 方法将这些转换后的字符有效地收集到 charList 中。</p><h2 id="_4-使用-arrays-aslist" tabindex="-1"><a class="header-anchor" href="#_4-使用-arrays-aslist"><span>4. 使用 Arrays.asList()</span></a></h2><p>为了执行转换，我们可以使用 Arrays.asList() 方法与 split() 方法结合使用。以下是一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenString_whenUsingSplit_thenConvertToStringList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> charArray <span class="token operator">=</span> inputString<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` charList <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>charArray<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>inputString<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> charList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试方法中，我们首先使用 split() 方法将 inputString 分解为单独的字符串数组。随后，我们使用 asList() 方法将这个数组转换为 List<code>&lt;String&gt;</code>，其中每个字符都表示为一个单独的元素。</p><h2 id="_5-使用-guava-的-lists-charactersof" tabindex="-1"><a class="header-anchor" href="#_5-使用-guava-的-lists-charactersof"><span>5. 使用 Guava 的 Lists.charactersOf()</span></a></h2><p>Guava 是一个广泛使用的 Java 库，它提供了一个方便的方法来将字符串转换为字符列表。</p><p>让我们看看以下代码示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenString_whenUsingGuavaLists_thenConvertToCharList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>`````` charList <span class="token operator">=</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">charactersOf</span><span class="token punctuation">(</span>inputString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>inputString<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> charList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们利用 Guava 的 charactersOf() 将给定的字符串转换为字符列表。这种方法简化了流程，提供了一种简洁和表达性强的方式来直接从字符串创建 List<code>&lt;Character&gt;</code>，增强了代码的可读性。</p><h2 id="_6-使用-java-9-的-codepoints" tabindex="-1"><a class="header-anchor" href="#_6-使用-java-9-的-codepoints"><span>6. 使用 Java 9+ 的 codePoints()</span></a></h2><p>在 Java 9 及更高版本中，可以使用 codePoints() 方法来处理 Unicode 字符。让我们看一个简单的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenString_whenUsingCodePoints_thenConvertToCharList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>`````` charList <span class="token operator">=</span> inputString<span class="token punctuation">.</span><span class="token function">codePoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">mapToObj</span><span class="token punctuation">(</span>c <span class="token operator">-&gt;</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> c<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>inputString<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> charList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码片段中，我们使用 codePoints() 方法获取给定字符串中字符的 Unicode 码点。之后，我们使用 mapToObj 操作将每个码点转换为其对应的字符，从而得到 charList。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>总之，在Java中将字符串转换为字符列表可以通过多种方法实现，每种方法都有其自身的优势。</p><p>根据我们的特定需求和我们使用的Java版本，选择最适合我们需求的方法。</p><p>如常，本文的完整代码示例可以在 GitHub 上找到。</p>',32),c=[e];function o(i,l){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","2024-06-25-Convert a String to a List of Characters in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-Convert%20a%20String%20to%20a%20List%20of%20Characters%20in%20Java.html","title":"Java中将字符串转换为字符列表的方法","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","编程"],"tag":["Java字符串","字符串转字符列表"],"head":[["meta",{"name":"keywords","content":"Java, 字符串, 字符列表, 转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-Convert%20a%20String%20to%20a%20List%20of%20Characters%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将字符串转换为字符列表的方法"}],["meta",{"property":"og:description","content":"Java中将字符串转换为字符列表的方法 1. 引言 Java提供了多种操作字符串的方法。 在本教程中，我们将探索一个常见的需求，即将字符串转换为字符列表。 2. 使用 toCharArray() toCharArray() 是将字符串转换为字符数组的直接方式。 让我们看看以下代码示例： 在这种方法中，我们使用 toCharArray() 方法将提供的 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T21:26:07.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java字符串"}],["meta",{"property":"article:tag","content":"字符串转字符列表"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T21:26:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将字符串转换为字符列表的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T21:26:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将字符串转换为字符列表的方法 1. 引言 Java提供了多种操作字符串的方法。 在本教程中，我们将探索一个常见的需求，即将字符串转换为字符列表。 2. 使用 toCharArray() toCharArray() 是将字符串转换为字符数组的直接方式。 让我们看看以下代码示例： 在这种方法中，我们使用 toCharArray() 方法将提供的 ..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用 toCharArray()","slug":"_2-使用-tochararray","link":"#_2-使用-tochararray","children":[]},{"level":2,"title":"3. 使用 Java 流","slug":"_3-使用-java-流","link":"#_3-使用-java-流","children":[]},{"level":2,"title":"4. 使用 Arrays.asList()","slug":"_4-使用-arrays-aslist","link":"#_4-使用-arrays-aslist","children":[]},{"level":2,"title":"5. 使用 Guava 的 Lists.charactersOf()","slug":"_5-使用-guava-的-lists-charactersof","link":"#_5-使用-guava-的-lists-charactersof","children":[]},{"level":2,"title":"6. 使用 Java 9+ 的 codePoints()","slug":"_6-使用-java-9-的-codepoints","link":"#_6-使用-java-9-的-codepoints","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719350767000,"updatedTime":1719350767000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.79,"words":837},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-Convert a String to a List of Characters in Java.md","localizedDate":"2024年6月26日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>Java提供了多种操作字符串的方法。</p>\\n<p><strong>在本教程中，我们将探索一个常见的需求，即将字符串转换为字符列表。</strong></p>\\n<h2>2. 使用 toCharArray()</h2>\\n<p>toCharArray() 是将字符串转换为字符数组的直接方式。</p>\\n<p>让我们看看以下代码示例：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenString_whenUsingToCharArray_thenConvertToCharList</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">char</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> charArray <span class=\\"token operator\\">=</span> inputString<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toCharArray</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token class-name\\">List</span>``````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Character</span><span class=\\"token punctuation\\">&gt;</span></span>`````` charList <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">char</span> c <span class=\\"token operator\\">:</span> charArray<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        charList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span>c<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span>inputString<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">length</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> charList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">size</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
