import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CUBmiNft.js";const e={},p=t(`<h1 id="java-统一换行符字符" tabindex="-1"><a class="header-anchor" href="#java-统一换行符字符"><span>Java 统一换行符字符</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>不同的操作系统使用不同的换行符（EOL），这在文件在不同系统间传输或处理时可能会导致问题。此外，统一EOL字符意味着使用单一格式来渲染它们，以确保跨平台的一致性。</p><p><strong>本教程提供了不同的Java方法来统一EOL字符。</strong></p><h2 id="_2-理解eol字符" tabindex="-1"><a class="header-anchor" href="#_2-理解eol字符"><span>2. 理解EOL字符</span></a></h2><p>在Java中，EOL字符代表文本文件中的一行结束。不同的操作系统使用不同的序列来表示EOL：</p><ul><li>Unix/Linux: <em>\\n</em>（换行符）</li><li>Windows: <em>\\r\\n</em>（回车后跟换行符）</li><li>旧Mac: <em>\\r</em>（回车符）</li></ul><h2 id="_3-使用-string-replaceall-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用-string-replaceall-方法"><span>3. 使用 String.replaceAll() 方法</span></a></h2><p>一种标准化EOL字符的直接方法是使用Java的String类及其replaceAll()方法。让我们来实现这种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> originalText <span class="token operator">=</span> <span class="token string">&quot;This is a text\\rwith different\\r\\nEOL characters\\n&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> expectedText <span class="token operator">=</span> <span class="token string">&quot;This is a text&quot;</span> <span class="token operator">+</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;line.separator&quot;</span><span class="token punctuation">)</span>
  <span class="token operator">+</span> <span class="token string">&quot;with different&quot;</span> <span class="token operator">+</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;line.separator&quot;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;EOL characters&quot;</span> <span class="token operator">+</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;line.separator&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenText_whenUsingStringReplace_thenEOLNormalized</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> normalizedText <span class="token operator">=</span> originalText<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;\\r\\n|\\r|\\n&quot;</span><span class="token punctuation">,</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;line.separator&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedText<span class="token punctuation">,</span> normalizedText<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试方法中，我们使用replaceAll()方法替换所有出现的（&quot;\\r\\n&quot;）、（&quot;\\r&quot;）或（&quot;\\n&quot;）为System.getProperty(&quot;line.separator&quot;），确保跨平台的EOL字符独立性。最后，我们使用assertEquals()方法验证expectedText和normalizedText之间的等价性。</p><p><strong>这种方法有效地替换了所有指定目标字符串的所有出现，使用平台特定的行分隔符。</strong></p><h2 id="_4-使用-apache-commons-lang" tabindex="-1"><a class="header-anchor" href="#_4-使用-apache-commons-lang"><span>4. 使用 Apache Commons Lang</span></a></h2><p>Apache Commons Lang提供了丰富的字符串操作工具集。通过利用StringUtils类，我们可以高效地在文本中统一EOL字符。以下是实现方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenText_whenUsingStringUtils_thenEOLNormalized</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> normalizedText <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">replaceEach</span><span class="token punctuation">(</span>
      originalText<span class="token punctuation">,</span>
      <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token string">&quot;\\r\\n&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\\r&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\\n&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;line.separator&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;line.separator&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;line.separator&quot;</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedText<span class="token punctuation">,</span> normalizedText<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，我们使用StringUtils.replaceEach()方法，并传递originalText字符串以及包含要替换的目标字符串的数组（&quot;\\r\\n&quot;、&quot;\\r&quot;、&quot;\\n&quot;）和从System.getProperty(&quot;line.separator&quot;)获得的相应替换字符串。</p><h2 id="_5-使用-java-8-stream-api" tabindex="-1"><a class="header-anchor" href="#_5-使用-java-8-stream-api"><span>5. 使用 Java 8 Stream API</span></a></h2><p>Java 8的Stream API提供了一种现代且简洁的处理集合或数组的方法。通过利用这个API，我们可以简化文本中EOL字符的统一：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenText_whenUsingStreamAPI_thenEOLNormalized</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> normalizedText <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>originalText<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\r\\n|\\r|\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">joining</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;line.separator&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedText<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> normalizedText<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最初，我们使用split()方法和一个正则表达式模式（&quot;\\r\\n|\\r|\\n&quot;）将originalText分割成一个标记数组。随后，我们使用Arrays.stream()将这个数组转换为流。最后，我们使用Collectors.joining()方法连接这些标记，使用System.getProperty(&quot;line.separator&quot;)作为分隔符。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>总之，无论是选择String.replaceAll()的简单性，Apache Commons Lang的健壮性，还是Java 8 Stream API的简洁性，目标都是一致的：统一EOL字符，以强代码的可读性和兼容性。</p><p>像往常一样，相关的源代码可以在GitHub上找到。</p>`,23),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-20-Normalizing the EOL Character in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Normalizing%20the%20EOL%20Character%20in%20Java.html","title":"Java 统一换行符字符","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Java","EOL Characters"],"tag":["EOL Normalization","String Replace","Apache Commons Lang","Java 8 Stream API"],"head":[["meta",{"name":"keywords","content":"Java, EOL Characters, String Replace, Apache Commons Lang, Java 8 Stream API"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Normalizing%20the%20EOL%20Character%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 统一换行符字符"}],["meta",{"property":"og:description","content":"Java 统一换行符字符 1. 引言 不同的操作系统使用不同的换行符（EOL），这在文件在不同系统间传输或处理时可能会导致问题。此外，统一EOL字符意味着使用单一格式来渲染它们，以确保跨平台的一致性。 本教程提供了不同的Java方法来统一EOL字符。 2. 理解EOL字符 在Java中，EOL字符代表文本文件中的一行结束。不同的操作系统使用不同的序列来..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"EOL Normalization"}],["meta",{"property":"article:tag","content":"String Replace"}],["meta",{"property":"article:tag","content":"Apache Commons Lang"}],["meta",{"property":"article:tag","content":"Java 8 Stream API"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 统一换行符字符\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 统一换行符字符 1. 引言 不同的操作系统使用不同的换行符（EOL），这在文件在不同系统间传输或处理时可能会导致问题。此外，统一EOL字符意味着使用单一格式来渲染它们，以确保跨平台的一致性。 本教程提供了不同的Java方法来统一EOL字符。 2. 理解EOL字符 在Java中，EOL字符代表文本文件中的一行结束。不同的操作系统使用不同的序列来..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 理解EOL字符","slug":"_2-理解eol字符","link":"#_2-理解eol字符","children":[]},{"level":2,"title":"3. 使用 String.replaceAll() 方法","slug":"_3-使用-string-replaceall-方法","link":"#_3-使用-string-replaceall-方法","children":[]},{"level":2,"title":"4. 使用 Apache Commons Lang","slug":"_4-使用-apache-commons-lang","link":"#_4-使用-apache-commons-lang","children":[]},{"level":2,"title":"5. 使用 Java 8 Stream API","slug":"_5-使用-java-8-stream-api","link":"#_5-使用-java-8-stream-api","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.47,"words":741},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Normalizing the EOL Character in Java.md","localizedDate":"2024年6月20日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>不同的操作系统使用不同的换行符（EOL），这在文件在不同系统间传输或处理时可能会导致问题。此外，统一EOL字符意味着使用单一格式来渲染它们，以确保跨平台的一致性。</p>\\n<p><strong>本教程提供了不同的Java方法来统一EOL字符。</strong></p>\\n<h2>2. 理解EOL字符</h2>\\n<p>在Java中，EOL字符代表文本文件中的一行结束。不同的操作系统使用不同的序列来表示EOL：</p>\\n<ul>\\n<li>Unix/Linux: <em>\\\\n</em>（换行符）</li>\\n<li>Windows: <em>\\\\r\\\\n</em>（回车后跟换行符）</li>\\n<li>旧Mac: <em>\\\\r</em>（回车符）</li>\\n</ul>","autoDesc":true}');export{k as comp,m as data};
