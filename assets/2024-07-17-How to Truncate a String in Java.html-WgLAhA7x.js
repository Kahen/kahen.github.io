import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BMOUrRO4.js";const p={},e=t('<hr><h1 id="如何在java中截断字符串" tabindex="-1"><a class="header-anchor" href="#如何在java中截断字符串"><span>如何在Java中截断字符串</span></a></h1><p>在本教程中，我们将学习在Java中将字符串截断到所需字符数的多种方法。</p><p>我们将从探索使用JDK本身的方法开始。然后，我们将看看如何使用一些流行的第三方库来实现这一点。</p><h3 id="_2-1-使用string的substring-方法" tabindex="-1"><a class="header-anchor" href="#_2-1-使用string的substring-方法"><span>2.1 使用String的substring()方法</span></a></h3><p>String类带有一个方便的方法叫做substring。顾名思义，substring()返回给定字符串在指定索引之间的部分。</p><p>让我们看看它的实际应用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">usingSubstringMethod</span><span class="token punctuation">(</span><span class="token class-name">String</span> text<span class="token punctuation">,</span> <span class="token keyword">int</span> length<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>text<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> `<span class="token operator">&lt;=</span> length<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> text<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> text<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，如果指定的length大于text的长度，我们返回text本身。这是因为向substring()传递一个大于字符串中字符数的length会导致IndexOutOfBoundsException。</p><p>否则，我们返回从索引零开始到索引length之前的子字符串。</p><p>让我们使用一个测试用例来确认这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">TEXT</span> <span class="token operator">=</span> <span class="token string">&quot;Welcome to baeldung.com&quot;</span><span class="token punctuation">;</span>\n\n<span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStringAndLength_whenUsingSubstringMethod_thenTrim</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">TrimStringOnLength</span><span class="token punctuation">.</span><span class="token function">usingSubstringMethod</span><span class="token punctuation">(</span><span class="token constant">TEXT</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Welcome to&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，起始索引是包含的，结束索引是排除的。因此，索引length处的字符将不包括在返回的子字符串中。</p><h3 id="_2-2-使用string的split-方法" tabindex="-1"><a class="header-anchor" href="#_2-2-使用string的split-方法"><span>2.2 使用String的split()方法</span></a></h3><p>另一种截断字符串的方法是使用split()方法，该方法使用正则表达式将字符串分割成片段。</p><p>这里我们将使用一个名为正向后视的正则表达式特性，以匹配从字符串开头开始的指定数量的字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">usingSplitMethod</span><span class="token punctuation">(</span><span class="token class-name">String</span> text<span class="token punctuation">,</span> <span class="token keyword">int</span> length<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> results <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;(?&lt;=\\\\G.{&quot;</span> <span class="token operator">+</span> length <span class="token operator">+</span> <span class="token string">&quot;})&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> results<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>results的第一个元素将是我们截断的字符串，或者是原始的字符串，如果length比text长。</p><p>让我们测试我们的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStringAndLength_whenUsingSplitMethod_thenTrim</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">TrimStringOnLength</span><span class="token punctuation">.</span><span class="token function">usingSplitMethod</span><span class="token punctuation">(</span><span class="token constant">TEXT</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Welcome to ba&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-使用pattern类" tabindex="-1"><a class="header-anchor" href="#_2-3-使用pattern类"><span>2.3 使用Pattern类</span></a></h3><p>类似地，我们可以使用Pattern类来编译一个正表达式，该表达式匹配字符串开头到指定数量的字符。</p><p>例如，让我们使用{1,&quot; + length + &quot; }。这个正则表达式至少匹配一个，最多匹配length个字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">usingPattern</span><span class="token punctuation">(</span><span class="token class-name">String</span> text<span class="token punctuation">,</span> <span class="token keyword">int</span> length<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Optional</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` result <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;.{1,&quot;</span> <span class="token operator">+</span> length <span class="token operator">+</span> <span class="token string">&quot;}&quot;</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">results</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">MatchResult</span><span class="token operator">::</span><span class="token function">group</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> result<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> result<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token constant">EMPTY</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面看到的，将我们的正则表达式编译成Pattern后，我们可以使用Pattern的matcher()方法根据该正则表达式解释我们的字符串。然后我们能够分组结果并返回第一个，这是我们截断的字符串。</p><p>现在让我们添加一个测试用例来验证我们的代码按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStringAndLength_whenUsingPattern_thenTrim</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">TrimStringOnLength</span><span class="token punctuation">.</span><span class="token function">usingPattern</span><span class="token punctuation">(</span><span class="token constant">TEXT</span><span class="token punctuation">,</span> <span class="token number">19</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Welcome to baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-使用charsequence的codepoints-方法" tabindex="-1"><a class="header-anchor" href="#_2-4-使用charsequence的codepoints-方法"><span>2.4 使用CharSequence的codePoints()方法</span></a></h3><p>Java 9提供了一个codePoints()方法，将字符串转换为代码点值的流。</p><p>让我们看看如何使用这种方法结合流API来截断字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">usingCodePointsMethod</span><span class="token punctuation">(</span><span class="token class-name">String</span> text<span class="token punctuation">,</span> <span class="token keyword">int</span> length<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> text<span class="token punctuation">.</span><span class="token function">codePoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">limit</span><span class="token punctuation">(</span>length<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">StringBuilder</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">,</span> <span class="token class-name">StringBuilder</span><span class="token operator">::</span><span class="token function">appendCodePoint</span><span class="token punctuation">,</span> <span class="token class-name">StringBuilder</span><span class="token operator">::</span><span class="token function">append</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用limit()方法将流限制为给定的长度。然后我们使用StringBuilder来构建我们截断的字符串。</p><p>接下来，让我们验证我们的方法是否有效：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStringAndLength_whenUsingCodePointsMethod_thenTrim</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">TrimStringOnLength</span><span class="token punctuation">.</span><span class="token function">usingCodePointsMethod</span><span class="token punctuation">(</span><span class="token constant">TEXT</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Welcom&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-apache-commons库" tabindex="-1"><a class="header-anchor" href="#_3-apache-commons库"><span>3. Apache Commons库</span></a></h3><p>Apache Commons Lang库包括一个StringUtils类用于操作字符串。</p><p>首先，让我们将Apache Commons依赖项添加到我们的pom.xml中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.commons``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``commons-lang3``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``3.14.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-使用stringutils的left-方法" tabindex="-1"><a class="header-anchor" href="#_3-1-使用stringutils的left-方法"><span>3.1 使用StringUtils的left()方法</span></a></h3><p>StringUtils有一个有用的静态方法叫做left()。StringUtils.left()以null安全的方式返回字符串的最左边指定数量的字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">usingLeftMethod</span><span class="token punctuation">(</span><span class="token class-name">String</span> text<span class="token punctuation">,</span> <span class="token keyword">int</span> length<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">left</span><span class="token punctuation">(</span>text<span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-使用stringutils的truncate-方法" tabindex="-1"><a class="header-anchor" href="#_3-2-使用stringutils的truncate-方法"><span>3.2 使用StringUtils的truncate()方法</span></a></h3><p>或者，我们可以使用StringUtils.truncate()来实现相同的目标：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">usingTruncateMethod</span><span class="token punctuation">(</span><span class="token class-name">String</span> text<span class="token punctuation">,</span> <span class="token keyword">int</span> length<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">truncate</span><span class="token punctuation">(</span>text<span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-guava库" tabindex="-1"><a class="header-anchor" href="#_4-guava库"><span>4. Guava库</span></a></h3><p>除了使用Java核心方法和Apache Commons库来截断字符串，我们还可以使用Guava。让我们首先将Guava依赖项添加到我们的pom.xml文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.google.guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``31.0.1-jre``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以使用Guava的Splitter类来截断我们的字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">usingSplitter</span><span class="token punctuation">(</span><span class="token class-name">String</span> text<span class="token punctuation">,</span> <span class="token keyword">int</span> length<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Iterable</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` parts <span class="token operator">=</span> <span class="token class-name">Splitter</span><span class="token punctuation">.</span><span class="token function">fixedLength</span><span class="token punctuation">(</span>length<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> parts<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用Splitter.fixedLength()将我们的字符串分割成给定长度的多个片段。然后，我们返回结果的第一个元素。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们学习了在Java中将字符串截断到特定数量字符的多种方法。</p><p>我们查看了一些使用JDK的方法。然后我们使用了几个第三方库来截断字符串。</p><p>正如往常一样，本文中使用的代码可以在GitHub上找到。</p>',54),c=[e];function o(l,i){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","2024-07-17-How to Truncate a String in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-How%20to%20Truncate%20a%20String%20in%20Java.html","title":"如何在Java中截断字符串","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","字符串操作"],"tag":["Java","字符串截断"],"head":[["meta",{"name":"keywords","content":"Java, 字符串截断, JDK, Apache Commons, Guava, 正则表达式"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-How%20to%20Truncate%20a%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java中截断字符串"}],["meta",{"property":"og:description","content":"如何在Java中截断字符串 在本教程中，我们将学习在Java中将字符串截断到所需字符数的多种方法。 我们将从探索使用JDK本身的方法开始。然后，我们将看看如何使用一些流行的第三方库来实现这一点。 2.1 使用String的substring()方法 String类带有一个方便的方法叫做substring。顾名思义，substring()返回给定字符串在..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T05:28:44.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"字符串截断"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T05:28:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java中截断字符串\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T05:28:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Java中截断字符串 在本教程中，我们将学习在Java中将字符串截断到所需字符数的多种方法。 我们将从探索使用JDK本身的方法开始。然后，我们将看看如何使用一些流行的第三方库来实现这一点。 2.1 使用String的substring()方法 String类带有一个方便的方法叫做substring。顾名思义，substring()返回给定字符串在..."},"headers":[{"level":3,"title":"2.1 使用String的substring()方法","slug":"_2-1-使用string的substring-方法","link":"#_2-1-使用string的substring-方法","children":[]},{"level":3,"title":"2.2 使用String的split()方法","slug":"_2-2-使用string的split-方法","link":"#_2-2-使用string的split-方法","children":[]},{"level":3,"title":"2.3 使用Pattern类","slug":"_2-3-使用pattern类","link":"#_2-3-使用pattern类","children":[]},{"level":3,"title":"2.4 使用CharSequence的codePoints()方法","slug":"_2-4-使用charsequence的codepoints-方法","link":"#_2-4-使用charsequence的codepoints-方法","children":[]},{"level":3,"title":"3. Apache Commons库","slug":"_3-apache-commons库","link":"#_3-apache-commons库","children":[]},{"level":3,"title":"3.1 使用StringUtils的left()方法","slug":"_3-1-使用stringutils的left-方法","link":"#_3-1-使用stringutils的left-方法","children":[]},{"level":3,"title":"3.2 使用StringUtils的truncate()方法","slug":"_3-2-使用stringutils的truncate-方法","link":"#_3-2-使用stringutils的truncate-方法","children":[]},{"level":3,"title":"4. Guava库","slug":"_4-guava库","link":"#_4-guava库","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721194124000,"updatedTime":1721194124000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.1,"words":1230},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-How to Truncate a String in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>如何在Java中截断字符串</h1>\\n<p>在本教程中，我们将学习在Java中将字符串截断到所需字符数的多种方法。</p>\\n<p>我们将从探索使用JDK本身的方法开始。然后，我们将看看如何使用一些流行的第三方库来实现这一点。</p>\\n<h3>2.1 使用String的substring()方法</h3>\\n<p>String类带有一个方便的方法叫做substring。顾名思义，substring()返回给定字符串在指定索引之间的部分。</p>\\n<p>让我们看看它的实际应用：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">static</span> <span class=\\"token class-name\\">String</span> <span class=\\"token function\\">usingSubstringMethod</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> text<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">int</span> length<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>text<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">length</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> `<span class=\\"token operator\\">&lt;=</span> length<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> text<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">else</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> text<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">substring</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">,</span> length<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
