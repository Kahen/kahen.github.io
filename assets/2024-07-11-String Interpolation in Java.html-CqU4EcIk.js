import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-on0L14Tx.js";const e={},p=t(`<h1 id="java中字符串插值" tabindex="-1"><a class="header-anchor" href="#java中字符串插值"><span>Java中字符串插值</span></a></h1><p>在本教程中，我们将讨论Java中<strong>字符串插值</strong>的主题。我们将看几个不同的例子，然后详细了解。<strong>字符串插值是一种直接且精确的方法，可以将变量值注入到字符串中</strong>。它允许用户直接在处理过的字符串文字中嵌入变量引用。与Scala等语言相比，Java缺乏对<strong>字符串插值</strong>的原生支持。</p><p>然而，有一些方法可以在Java中实现这种行为。在接下来的部分中，我们将解释这些方法中的每一种。</p><h2 id="_3-加号运算符" tabindex="-1"><a class="header-anchor" href="#_3-加号运算符"><span>3. 加号运算符</span></a></h2><p>首先，我们有“+”运算符。我们可以使用“+”运算符来连接我们的变量和字符串值。变量被替换为其值，因此我们实现了插值或字符串的连接：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTwoString_thenInterpolateWithPlusSign</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token constant">EXPECTED_STRING</span> <span class="token operator">=</span> <span class="token string">&quot;使用一些Java示例的Java中的字符串插值。&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> first <span class="token operator">=</span> <span class="token string">&quot;插值&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> second <span class="token operator">=</span> <span class="token string">&quot;Java&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token string">&quot;String &quot;</span> <span class="token operator">+</span> first <span class="token operator">+</span> <span class="token string">&quot; in &quot;</span> <span class="token operator">+</span> second <span class="token operator">+</span> <span class="token string">&quot; with some &quot;</span> <span class="token operator">+</span> second <span class="token operator">+</span> <span class="token string">&quot; examples.&quot;</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_STRING</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在前面的例子中看到的，使用这个运算符，结果字符串包含了变量的值与其他字符串值。由于它可以调整以适应特定的需求，这种字符串连接方法是最简单和最有价值的。使用运算符时，我们不需要将文本放在引号内。</p><h2 id="_4-format-函数" tabindex="-1"><a class="header-anchor" href="#_4-format-函数"><span>4. format()函数</span></a></h2><p>另一种方法是使用String类的format()方法。与“+”运算符不同，在这种情况下我们需要使用占位符来获得字符串插值中的预期结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTwoString_thenInterpolateWithFormat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token constant">EXPECTED_STRING</span> <span class="token operator">=</span> <span class="token string">&quot;使用一些Java示例的Java中的字符串插值。&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> first <span class="token operator">=</span> <span class="token string">&quot;插值&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> second <span class="token operator">=</span> <span class="token string">&quot;Java&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;String %s in %s with some %s examples.&quot;</span><span class="token punctuation">,</span> first<span class="token punctuation">,</span> second<span class="token punctuation">,</span> second<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_STRING</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，如果我们想避免在format调用中重复变量，我们可以引用特定参数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTwoString_thenInterpolateWithFormatStringReference</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token constant">EXPECTED_STRING</span> <span class="token operator">=</span> <span class="token string">&quot;使用一些Java示例的Java中的字符串插值。&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> first <span class="token operator">=</span> <span class="token string">&quot;插值&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> second <span class="token operator">=</span> <span class="token string">&quot;Java&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;String %1$s in %2$s with some %2$s examples.&quot;</span><span class="token punctuation">,</span> first<span class="token punctuation">,</span> second<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_STRING</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们减少了不必要的变量重复，而是使用了参数列表中的参数索引。</p><h2 id="_5-stringbuilder类" tabindex="-1"><a class="header-anchor" href="#_5-stringbuilder类"><span>5. StringBuilder类</span></a></h2><p>我们接下来的方法是StringBuilder类。我们实例化一个StringBuilder对象，然后调用append()函数来构建字符串。在这个过程中，我们的变量被添加到结果字符串中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTwoString_thenInterpolateWithStringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token constant">EXPECTED_STRING</span> <span class="token operator">=</span> <span class="token string">&quot;使用一些Java示例的Java中的字符串插值。&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> first <span class="token operator">=</span> <span class="token string">&quot;插值&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> second <span class="token operator">=</span> <span class="token string">&quot;Java&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">StringBuilder</span> builder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    builder<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;String &quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>first<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot; in &quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>second<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot; with some &quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>second<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot; examples.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> builder<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_STRING</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码示例所示，我们可以通过链式调用append函数来插值字符串，该函数接受参数作为变量（在这种情况下，是两个字符串）。</p><h2 id="_6-messageformat类" tabindex="-1"><a class="header-anchor" href="#_6-messageformat类"><span>6. MessageFormat类</span></a></h2><p>使用MessageFormat类是获得Java中字符串插值的一个较少为人知的方法。有了MessageFormat，我们可以创建连接的消息，而不必担心底层语言。这是创建面向用户的消息的标准方法。它接受一个对象集合，格式化其中包含的字符串，并将它们插入到模式中的适当位置。</p><p>MessageFormat的format方法几乎与String的format方法相同，只是占位符的写法不同。在这个函数中，索引如{0}、{1}、{2}等代表占位符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTwoString_thenInterpolateWithMessageFormat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token constant">EXPECTED_STRING</span> <span class="token operator">=</span> <span class="token string">&quot;使用一些Java示例的Java中的字符串插值。&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> first <span class="token operator">=</span> <span class="token string">&quot;插值&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> second <span class="token operator">=</span> <span class="token string">&quot;Java&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">MessageFormat</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;String {0} in {1} with some {1} examples.&quot;</span><span class="token punctuation">,</span> first<span class="token punctuation">,</span> second<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_STRING</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于性能，StringBuilder只向动态缓冲区追加文本；然而，MessageFormat在追加数据之前解析给定的格式。因此，StringBuilder在效率方面优于MessageFormat。</p><h2 id="_7-apache-commons" tabindex="-1"><a class="header-anchor" href="#_7-apache-commons"><span>7. Apache Commons</span></a></h2><p>最后，我们有来自Apache Commons的StringSubstitutor。在这个类的上下文中，值被替换为包含在String中的变量。这个类接受一段文本并替换所有的变量。变量的默认定义是\${variableName}。构造函数和设置方法可以用来改变前缀和后缀。<strong>变量值的解析通常涉及使用一个映射</strong>。然而，我们可以通过使用系统属性或提供专门的变量解析器来解析它们：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTwoString_thenInterpolateWithStringSubstitutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token constant">EXPECTED_STRING</span> <span class="token operator">=</span> <span class="token string">&quot;使用一些Java示例的Java中的字符串插值。&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> baseString <span class="token operator">=</span> <span class="token string">&quot;String \${first} in \${second} with some \${second} examples.&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> first <span class="token operator">=</span> <span class="token string">&quot;插值&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> second <span class="token operator">=</span> <span class="token string">&quot;Java&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Map</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` parameters <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    parameters<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;first&quot;</span><span class="token punctuation">,</span> first<span class="token punctuation">)</span><span class="token punctuation">;</span>
    parameters<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;second&quot;</span><span class="token punctuation">,</span> second<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StringSubstitutor</span> substitutor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringSubstitutor</span><span class="token punctuation">(</span>parameters<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> substitutor<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>baseString<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_STRING</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从我们的代码示例中，我们可以看到我们创建了一个Map。键名与我们要在String中替换的变量名称相同。然后我们将每个键的相应值放入Map中。接下来，我们将它作为构造函数参数传递给StringSubstitutor类。最后，实例化的对象调用replace()函数。这个函数接收带有占位符的文本作为参数。结果，我们得到了一个插值后的文本。就这么简单。</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们简要描述了什么是字符串插值。然后我们学习了如何在Java语言中使用原生Java运算符、String类的format()方法来实现这一点。最后，我们探索了较少为人知的选项，如MessageFormat和来自Apache Commons的StringSubstitutor。</p><p>像往常一样，代码可以在GitHub上找到。</p>`,29),o=[p];function c(i,l){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-11-String Interpolation in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-String%20Interpolation%20in%20Java.html","title":"Java中字符串插值","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","String Interpolation"],"tag":["Java","String","Interpolation"],"head":[["meta",{"name":"keywords","content":"Java, String Interpolation, Format, StringBuilder, MessageFormat, Apache Commons"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-String%20Interpolation%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中字符串插值"}],["meta",{"property":"og:description","content":"Java中字符串插值 在本教程中，我们将讨论Java中字符串插值的主题。我们将看几个不同的例子，然后详细了解。字符串插值是一种直接且精确的方法，可以将变量值注入到字符串中。它允许用户直接在处理过的字符串文字中嵌入变量引用。与Scala等语言相比，Java缺乏对字符串插值的原生支持。 然而，有一些方法可以在Java中实现这种行为。在接下来的部分中，我们将..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T22:02:55.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:tag","content":"Interpolation"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T22:02:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中字符串插值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T22:02:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中字符串插值 在本教程中，我们将讨论Java中字符串插值的主题。我们将看几个不同的例子，然后详细了解。字符串插值是一种直接且精确的方法，可以将变量值注入到字符串中。它允许用户直接在处理过的字符串文字中嵌入变量引用。与Scala等语言相比，Java缺乏对字符串插值的原生支持。 然而，有一些方法可以在Java中实现这种行为。在接下来的部分中，我们将..."},"headers":[{"level":2,"title":"3. 加号运算符","slug":"_3-加号运算符","link":"#_3-加号运算符","children":[]},{"level":2,"title":"4. format()函数","slug":"_4-format-函数","link":"#_4-format-函数","children":[]},{"level":2,"title":"5. StringBuilder类","slug":"_5-stringbuilder类","link":"#_5-stringbuilder类","children":[]},{"level":2,"title":"6. MessageFormat类","slug":"_6-messageformat类","link":"#_6-messageformat类","children":[]},{"level":2,"title":"7. Apache Commons","slug":"_7-apache-commons","link":"#_7-apache-commons","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1720735375000,"updatedTime":1720735375000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.67,"words":1401},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-String Interpolation in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将讨论Java中<strong>字符串插值</strong>的主题。我们将看几个不同的例子，然后详细了解。<strong>字符串插值是一种直接且精确的方法，可以将变量值注入到字符串中</strong>。它允许用户直接在处理过的字符串文字中嵌入变量引用。与Scala等语言相比，Java缺乏对<strong>字符串插值</strong>的原生支持。</p>\\n<p>然而，有一些方法可以在Java中实现这种行为。在接下来的部分中，我们将解释这些方法中的每一种。</p>\\n<h2>3. 加号运算符</h2>\\n<p>首先，我们有“+”运算符。我们可以使用“+”运算符来连接我们的变量和字符串值。变量被替换为其值，因此我们实现了插值或字符串的连接：</p>","autoDesc":true}');export{k as comp,d as data};
