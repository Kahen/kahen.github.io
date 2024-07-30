import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CbPcg273.js";const e={},p=t(`<h1 id="java中integer-tostring-与string-valueof-的比较-baeldung" tabindex="-1"><a class="header-anchor" href="#java中integer-tostring-与string-valueof-的比较-baeldung"><span>Java中Integer.toString()与String.valueOf()的比较 | Baeldung</span></a></h1><p>正如我们所知，在Java中将int转换为String是一个非常常见的操作。</p><p>在这个简短的教程中，我们将介绍两种非常流行的转换方法：Integer类的toString()方法和String类的valueOf()方法。此外，我们还将通过一些示例来更好地理解这两种方法。</p><h3 id="_2-integer-tostring-方法" tabindex="-1"><a class="header-anchor" href="#_2-integer-tostring-方法"><span>2. Integer.toString()方法</span></a></h3><p>这个方法<strong>接受一个原始数据类型int的整数作为参数，并返回一个表示指定整数的String对象。</strong></p><p>让我们看看它的签名：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们将通过一些示例，传递有符号/无符号整数作为参数，来理解整数到字符串的转换是如何发生的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenValidIntIsPassed_thenShouldConvertToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;11&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;11&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token operator">+</span><span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;-11&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-string-valueof-方法" tabindex="-1"><a class="header-anchor" href="#_3-string-valueof-方法"><span>3. String.valueOf()方法</span></a></h3><p>这个方法也接受一个原始数据类型int的整数作为参数，并返回一个String对象。有趣的是，<strong>返回的字符串表示与Integer.toString(int i)方法返回的完全相同。这是因为它在内部使用了Integer.toString()方法。</strong></p><p>让我们看看java.lang.String类的内部实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 返回int参数的字符串表示。
 * \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>\`
 * 表示与一个参数的<span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">Integer</span><span class="token punctuation">.</span>toString</span></span><span class="token punctuation">}</span>方法返回的完全相同。
 *
 * <span class="token keyword">@param</span>   <span class="token parameter">i</span>   一个<span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token keyword">int</span></span></span><span class="token punctuation">}</span>。
 * <span class="token keyword">@return</span>  int参数的字符串表示。
 * <span class="token keyword">@see</span>     <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">Integer</span><span class="token punctuation">#</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">)</span></span>
 */</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了更好地理解，我们将通过一些示例，传递有符号/无符号整数作为参数，来理解整数到字符串的转换是如何发生的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenValidIntIsPassed_thenShouldConvertToValidString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;11&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;11&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token operator">+</span><span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;-11&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-integer-tostring-和string-valueof-之间的差异" tabindex="-1"><a class="header-anchor" href="#_4-integer-tostring-和string-valueof-之间的差异"><span>4. Integer.toString()和String.valueOf()之间的差异</span></a></h3><p>总结来说，这两种方法实际上没有区别，但我们应该了解以下几点以避免混淆。</p><p>使用String.valueOf()方法时，调用堆栈跟踪中会多出一个调用，因为它内部使用了相同的Integer.toString()方法。</p><p>当传递一个null对象给valueOf()方法时可能会有一些混淆，因为，<strong>当传递一个原始int给valueOf()方法时看起来是相同的，但实际的方法调用会去到一个不同的重载方法。</strong></p><p><strong>Integer.toString()如果给定的Integer对象是null可能会抛出NullPointerException。String.valueOf()不会抛出异常，因为它会去到String.valueOf(Object obj)方法并返回null。请注意，原始int传递给String.valueOf(int i)永远不会是null，但由于存在另一个方法String.valueOf(Object obj)，我们可能会在两个重载方法之间混淆。</strong></p><p>让我们通过以下示例来理解最后一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span><span class="token punctuation">(</span>expected <span class="token operator">=</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenNullIntegerObjectIsPassed_thenShouldThrowException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Integer</span> i <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，原始int永远不会是null，我们在这里检查是以防下面的方法抛出异常。</p><h3 id="_5-jvm方法内联对string-valueof-方法的影响" tabindex="-1"><a class="header-anchor" href="#_5-jvm方法内联对string-valueof-方法的影响"><span>5. JVM方法内联对String.valueOf()方法的影响</span></a></h3><p>正如我们之前讨论的，String.valueOf()方法涉及一个额外的调用。但是，JVM可以通过方法内联来消除调用堆栈中的这个额外调用。</p><p>然而，这完全取决于JVM是否选择内联该方法。有关更详细的描述，请访问我们关于JVM中方法内联的文章。</p><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p>在本文中，我们学习了Integer.toString()和String.valueOf()方法。我们还查看了一些我们应该集中注意力以避免编程时混淆的要点。</p><p>如往常一样，本文的完整代码示例可以在GitHub上找到。头文件中的日期和类别、标签信息需要从网页中获取，但当前提供的网页内容中并没有这些信息。因此，我将使用网页中实际存在的信息来完成翻译。以下是翻译的剩余部分：</p><h3 id="_4-integer-tostring-和string-valueof-之间的差异-1" tabindex="-1"><a class="header-anchor" href="#_4-integer-tostring-和string-valueof-之间的差异-1"><span>4. Integer.toString()和String.valueOf()之间的差异</span></a></h3><p>为了总结，这两种方法实际上没有区别，但我们应该理解以下几点以避免混淆。</p><p>当我们使用String.valueOf()方法时，调用栈中会多出一个调用，因为它内部使用了相同的Integer.toString()方法。</p><p>如果传递一个null对象给valueOf()方法，可能会产生一些混淆，因为<strong>当传递一个原始int给valueOf()方法时，看起来是相同的，但实际上方法调用会转向另一个重载的方法。</strong></p><p><strong>如果给Integer.toString()传入的Integer对象是null，可能会抛出NullPointerException。String.valueOf()不会抛出异常，因为它会调用String.valueOf(Object obj)方法并返回null。请注意，传递给String.valueOf(int i)的原始int永远不会是null，但由于存在另一个方法String.valueOf(Object obj)，我们可能会在这两个重载方法之间混淆。</strong></p><p>让我们通过以下示例来理解最后一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span><span class="token punctuation">(</span>expected <span class="token operator">=</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenNullIntegerObjectIsPassed_thenShouldThrowException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Integer</span> i <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 这里会调用String.valueOf(Object obj)并返回&quot;null&quot;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 这里会抛出NullPointerException，因为i是null</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，原始int永远不会是null，我们在这里检查它，以防下面的方法抛出异常。</p><h3 id="_5-jvm方法内联对string-valueof-方法的影响-1" tabindex="-1"><a class="header-anchor" href="#_5-jvm方法内联对string-valueof-方法的影响-1"><span>5. JVM方法内联对String.valueOf()方法的影响</span></a></h3><p>正如我们之前讨论的，String.valueOf()方法涉及一个额外的调用。但是，JVM可以通过方法内联来消除调用栈中的这个额外调用。</p><p>但这完全取决于JVM是否选择内联该方法。有关更详细的描述，请访问我们关于JVM中方法内联的文章。</p><h3 id="_6-结论-1" tabindex="-1"><a class="header-anchor" href="#_6-结论-1"><span>6. 结论</span></a></h3><p>在这篇文章中，我们学习了Integer.toString()和String.valueOf()方法。我们还看了一我们应该集中注意力以避免编程时混淆的要点。</p><p>如往常一样，这篇文章的完整代码示例可以在GitHub上找到。</p><p>OK</p>`,44),o=[p];function i(l,c){return s(),a("div",null,o)}const g=n(e,[["render",i],["__file","2024-07-16-Integer.toString   vs String.valueOf   in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Integer.toString%20%20%20vs%20String.valueOf%20%20%20in%20Java.html","title":"Java中Integer.toString()与String.valueOf()的比较 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Integer.toString()","String.valueOf()"],"head":[["meta",{"name":"keywords","content":"Java, toString, String, valueOf, 转换, 方法, 性能"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Integer.toString%20%20%20vs%20String.valueOf%20%20%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中Integer.toString()与String.valueOf()的比较 | Baeldung"}],["meta",{"property":"og:description","content":"Java中Integer.toString()与String.valueOf()的比较 | Baeldung 正如我们所知，在Java中将int转换为String是一个非常常见的操作。 在这个简短的教程中，我们将介绍两种非常流行的转换方法：Integer类的toString()方法和String类的valueOf()方法。此外，我们还将通过一些示例来更..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T05:26:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Integer.toString()"}],["meta",{"property":"article:tag","content":"String.valueOf()"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T05:26:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中Integer.toString()与String.valueOf()的比较 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T05:26:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中Integer.toString()与String.valueOf()的比较 | Baeldung 正如我们所知，在Java中将int转换为String是一个非常常见的操作。 在这个简短的教程中，我们将介绍两种非常流行的转换方法：Integer类的toString()方法和String类的valueOf()方法。此外，我们还将通过一些示例来更..."},"headers":[{"level":3,"title":"2. Integer.toString()方法","slug":"_2-integer-tostring-方法","link":"#_2-integer-tostring-方法","children":[]},{"level":3,"title":"3. String.valueOf()方法","slug":"_3-string-valueof-方法","link":"#_3-string-valueof-方法","children":[]},{"level":3,"title":"4. Integer.toString()和String.valueOf()之间的差异","slug":"_4-integer-tostring-和string-valueof-之间的差异","link":"#_4-integer-tostring-和string-valueof-之间的差异","children":[]},{"level":3,"title":"5. JVM方法内联对String.valueOf()方法的影响","slug":"_5-jvm方法内联对string-valueof-方法的影响","link":"#_5-jvm方法内联对string-valueof-方法的影响","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]},{"level":3,"title":"4. Integer.toString()和String.valueOf()之间的差异","slug":"_4-integer-tostring-和string-valueof-之间的差异-1","link":"#_4-integer-tostring-和string-valueof-之间的差异-1","children":[]},{"level":3,"title":"5. JVM方法内联对String.valueOf()方法的影响","slug":"_5-jvm方法内联对string-valueof-方法的影响-1","link":"#_5-jvm方法内联对string-valueof-方法的影响-1","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论-1","link":"#_6-结论-1","children":[]}],"git":{"createdTime":1721107566000,"updatedTime":1721107566000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.87,"words":1462},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Integer.toString   vs String.valueOf   in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>正如我们所知，在Java中将int转换为String是一个非常常见的操作。</p>\\n<p>在这个简短的教程中，我们将介绍两种非常流行的转换方法：Integer类的toString()方法和String类的valueOf()方法。此外，我们还将通过一些示例来更好地理解这两种方法。</p>\\n<h3>2. Integer.toString()方法</h3>\\n<p>这个方法<strong>接受一个原始数据类型int的整数作为参数，并返回一个表示指定整数的String对象。</strong></p>\\n<p>让我们看看它的签名：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token class-name\\">String</span> <span class=\\"token function\\">toString</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> i<span class=\\"token punctuation\\">)</span>\\n</code></pre></div>","autoDesc":true}');export{g as comp,k as data};
