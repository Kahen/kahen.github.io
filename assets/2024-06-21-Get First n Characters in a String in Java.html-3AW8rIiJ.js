import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CNQ479je.js";const e={},p=t('<h1 id="java中获取字符串前n个字符的不同方法" tabindex="-1"><a class="header-anchor" href="#java中获取字符串前n个字符的不同方法"><span>Java中获取字符串前n个字符的不同方法</span></a></h1><p>在这篇简短的教程中，我们将探讨在Java中获取字符串前n个字符的不同方法。</p><p>首先，我们将学习如何使用Java核心开发工具包（JDK）的方法和类来实现这一目标。然后，我们将看到如何使用如Apache Commons Lang和Guava等外部库来达到相同的结果。</p><h3 id="使用java核心开发工具包-jdk" tabindex="-1"><a class="header-anchor" href="#使用java核心开发工具包-jdk"><span>使用Java核心开发工具包（JDK）</span></a></h3><p>JDK提供了几种我们可以用于获取给定字符串的前n个字符的方法。让我们仔细看看每个选项。</p><h4 id="_2-1-使用string-substring方法" tabindex="-1"><a class="header-anchor" href="#_2-1-使用string-substring方法"><span>2.1 使用String#substring方法</span></a></h4><p>String类的substring()方法提供了一个简单的解决方案来回答我们的中心问题。顾名思义，这个方法返回给定字符串的一个子集作为一个新的字符串。</p><p>让我们看看它在实际中的应用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenString_whenUsingSubstringMethod_thenGetFirstChars</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> givenInput <span class="token operator">=</span> <span class="token string">&quot;Hello Baeldung Readers&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;He&quot;</span><span class="token punctuation">,</span> givenInput<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法接受两个参数，beginIndex和endIndex。beginIndex表示第一个字符的索引，endIndex代表最后一个索引，该索引是排除在外的。</p><p>也就是说，返回的子字符串从指定的endIndex开始，并扩展到索引endIndex - 1的字符。</p><h4 id="_2-2-使用string-subsequence方法" tabindex="-1"><a class="header-anchor" href="#_2-2-使用string-subsequence方法"><span>2.2 使用String#subSequence方法</span></a></h4><p>另一种解决方案是使用subSequence()方法。它返回一个CharSequence对象，该对象包含指定字符串的一部分。</p><p><strong>调用subSequence(start, end)的行为与调用substring(start, end)方法完全相同。</strong> 让我们看看它在实际中的应用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenString_whenUsingSubSequenceMethod_thenGetFirstChars</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> givenInput <span class="token operator">=</span> <span class="token string">&quot;Welcome&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Wel&quot;</span><span class="token punctuation">,</span> givenInput<span class="token punctuation">.</span><span class="token function">subSequence</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，该方法返回字符串“Welcome”中的前三个字符“Wel”。我们应该记住，如果beginIndex或endIndex是负数，或者endIndex大于字符串长度，或者当beginIndex大于endIndex时，这个方法会抛出IndexOutOfBoundsException。</p><h4 id="_2-3-使用string-chars方法" tabindex="-1"><a class="header-anchor" href="#_2-3-使用string-chars方法"><span>2.3 使用String#chars方法</span></a></h4><p>String类提供了chars()作为检索前n个字符的另一种选项。<strong>这个方法是在Java 9中引入的，用于将给定字符串作为Stream进行操作。</strong></p><p>让我们通过另一个测试用例来说明chars()方法的使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenString_whenUsingStreamApi_thenGetFirstChars</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> givenInput <span class="token operator">=</span> <span class="token string">&quot;The world is beautiful&quot;</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> result <span class="token operator">=</span> givenInput<span class="token punctuation">.</span><span class="token function">chars</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">limit</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">StringBuilder</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">,</span> <span class="token class-name">StringBuilder</span><span class="token operator">::</span><span class="token function">appendCodePoint</span><span class="token punctuation">,</span> <span class="token class-name">StringBuilder</span><span class="token operator">::</span><span class="token function">append</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;The&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，chars()返回一个IntStream，包含字符串输入的char值。此外，我们使用limit(3)方法检索前三个值。然后，我们使用collect()与StringBuilder构建从返回值生成的字符串。</p><h3 id="使用apache-commons-lang" tabindex="-1"><a class="header-anchor" href="#使用apache-commons-lang"><span>使用Apache Commons Lang</span></a></h3><p>另外，我们可以使用Apache Commons Lang库来解决我们的挑战。它提供了一组实用类，如StringUtils，我们可以使用它们来执行字符串操作。</p><p>首先，让我们将它的依赖项添加到pom.xml文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.commons``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``commons-lang3``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``3.14.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-1-使用stringutils-substring方法" tabindex="-1"><a class="header-anchor" href="#_3-1-使用stringutils-substring方法"><span>3.1 使用StringUtils#substring方法</span></a></h4><p>通常，StringUtils提供了它自己的substring()方法版本。这个方法的特点是它与String#substring相比是null安全的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenString_whenUsingStringUtilsSubstringMethod_thenGetFirstChars</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> givenInput <span class="token operator">=</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Baeld&quot;</span><span class="token punctuation">,</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>givenInput<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，返回的子字符串“Baeld”从位置零的字符开始，并在位置5之前结束。</p><h4 id="_3-2-使用stringutils-left方法" tabindex="-1"><a class="header-anchor" href="#_3-2-使用stringutils-left方法"><span>3.2 使用StringUtils#left方法</span></a></h4><p>同样，我们可以使用left()方法来实现相同的结果。这个方法返回给定字符串的左n个字符。</p><p>让我们通过一个实际的例子来说明如何使用StringUtils#left：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenString_whenUsingStringUtilsLeftMethod_thenGetFirstChars</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> givenInput <span class="token operator">=</span> <span class="token string">&quot;kindness always wins&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;kind&quot;</span><span class="token punctuation">,</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">left</span><span class="token punctuation">(</span>givenInput<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法的好处是它是null安全的，如果指定的字符串输入为null，它会返回null。</p><h3 id="使用guava" tabindex="-1"><a class="header-anchor" href="#使用guava"><span>使用Guava</span></a></h3><p>另一种解决方案是使用Guava。像往常一样，在开始使用这个库之前，我们需要将其依赖项添加到pom.xml中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.google.guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``33.0.0-jre``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Guava提供了Ascii#truncate方法，我们可以将其用作获取字符串前几个字符的替代方法：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenString_whenUsingGuavaTruncateMethod_thenGetFirstChars</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> givenInput <span class="token operator">=</span> <span class="token string">&quot;Tamassint&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Tama&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Ascii</span><span class="token punctuation">.</span><span class="token function">truncate</span><span class="token punctuation">(</span>givenInput<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，这个方法将给定的字符串截断到指定的最大长度4，在我们的例子中。</p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在这篇简短的文章中，我们探索了在Java中获取给定字符串的前n个字符的各种方法。</p><p>沿途，我们看到了如何使用JDK方法和类。然后，我们学习了如何使用如Apache Commons Lang和Guava等外部库来实现相同的目标。</p><p>一如既往，本文中使用的代码可以在GitHub上找到。</p>',44),i=[p];function o(c,l){return s(),a("div",null,i)}const d=n(e,[["render",o],["__file","2024-06-21-Get First n Characters in a String in Java.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-06-21/2024-06-21-Get%20First%20n%20Characters%20in%20a%20String%20in%20Java.html","title":"Java中获取字符串前n个字符的不同方法","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Java","String Manipulation"],"tag":["Java","String","substring","Apache Commons Lang","Guava"],"head":[["meta",{"name":"keywords","content":"Java, String, substring, subSequence, chars, Apache Commons Lang, StringUtils, left, Ascii, truncate"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-21/2024-06-21-Get%20First%20n%20Characters%20in%20a%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中获取字符串前n个字符的不同方法"}],["meta",{"property":"og:description","content":"Java中获取字符串前n个字符的不同方法 在这篇简短的教程中，我们将探讨在Java中获取字符串前n个字符的不同方法。 首先，我们将学习如何使用Java核心开发工具包（JDK）的方法和类来实现这一目标。然后，我们将看到如何使用如Apache Commons Lang和Guava等外部库来达到相同的结果。 使用Java核心开发工具包（JDK） JDK提供了..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T20:29:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:tag","content":"substring"}],["meta",{"property":"article:tag","content":"Apache Commons Lang"}],["meta",{"property":"article:tag","content":"Guava"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T20:29:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中获取字符串前n个字符的不同方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T20:29:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中获取字符串前n个字符的不同方法 在这篇简短的教程中，我们将探讨在Java中获取字符串前n个字符的不同方法。 首先，我们将学习如何使用Java核心开发工具包（JDK）的方法和类来实现这一目标。然后，我们将看到如何使用如Apache Commons Lang和Guava等外部库来达到相同的结果。 使用Java核心开发工具包（JDK） JDK提供了..."},"headers":[{"level":3,"title":"使用Java核心开发工具包（JDK）","slug":"使用java核心开发工具包-jdk","link":"#使用java核心开发工具包-jdk","children":[]},{"level":3,"title":"使用Apache Commons Lang","slug":"使用apache-commons-lang","link":"#使用apache-commons-lang","children":[]},{"level":3,"title":"使用Guava","slug":"使用guava","link":"#使用guava","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719001762000,"updatedTime":1719001762000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.9,"words":1169},"filePathRelative":"posts/baeldung/2024-06-21/2024-06-21-Get First n Characters in a String in Java.md","localizedDate":"2024年6月22日","excerpt":"\\n<p>在这篇简短的教程中，我们将探讨在Java中获取字符串前n个字符的不同方法。</p>\\n<p>首先，我们将学习如何使用Java核心开发工具包（JDK）的方法和类来实现这一目标。然后，我们将看到如何使用如Apache Commons Lang和Guava等外部库来达到相同的结果。</p>\\n<h3>使用Java核心开发工具包（JDK）</h3>\\n<p>JDK提供了几种我们可以用于获取给定字符串的前n个字符的方法。让我们仔细看看每个选项。</p>\\n<h4>2.1 使用String#substring方法</h4>\\n<p>String类的substring()方法提供了一个简单的解决方案来回答我们的中心问题。顾名思义，这个方法返回给定字符串的一个子集作为一个新的字符串。</p>","autoDesc":true}');export{d as comp,g as data};
