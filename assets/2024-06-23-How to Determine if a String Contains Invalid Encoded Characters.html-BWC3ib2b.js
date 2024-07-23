import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-on0L14Tx.js";const e={},p=t(`<h1 id="如何确定字符串是否包含无效编码字符" tabindex="-1"><a class="header-anchor" href="#如何确定字符串是否包含无效编码字符"><span>如何确定字符串是否包含无效编码字符</span></a></h1><p>无效编码的字符可能会导致各种问题，包括数据损坏和安全漏洞。因此，在处理字符串时确保数据正确编码至关重要。特别是当处理如UTF-8或ISO-8859-1这样的字符编码时。</p><p>在本教程中，我们将介绍如何确定Java字符串是否包含无效编码字符。我们将任何非ASCII字符视为无效。</p><h2 id="_2-java中的字符编码" tabindex="-1"><a class="header-anchor" href="#_2-java中的字符编码"><span>2. Java中的字符编码</span></a></h2><p>Java支持多种字符编码。此外，《Charset》类提供了处理它们的方法——最常见的编码是UTF-8和ISO-8859-1。</p><p>让我们举一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;Hеllo, World!&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> utf8Bytes <span class="token operator">=</span> input<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> utf8String <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>utf8Bytes<span class="token punctuation">,</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>《String》类允许我们使用《getBytes》和《String》构造器在不同的编码之间进行转换。</strong></p><h2 id="_3-使用字符串编码" tabindex="-1"><a class="header-anchor" href="#_3-使用字符串编码"><span>3. 使用字符串编码</span></a></h2><p>以下代码提供了一种使用Java检测和处理给定字符串中的无效字符的方法，确保对字符编码问题进行健壮的处理：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;HÆllo, World!&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenInputString_whenUsingStringEncoding_thenFindIfInvalidCharacters</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> input<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">boolean</span> found <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">byte</span> b <span class="token operator">:</span> bytes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        found <span class="token operator">=</span> <span class="token punctuation">(</span>b <span class="token operator">&amp;</span> <span class="token number">0xFF</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">127</span> <span class="token operator">?</span> <span class="token boolean">true</span> <span class="token operator">:</span> found<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>found<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试方法中，我们首先使用UTF-8字符编码标准将《input》字符串转换为字节数组。<strong>随后，我们使用一个循环遍历每个字节，检查其值是否超过127，这是无效字符的指示。</strong></p><p>如果检测到任何无效字符，一个布尔值的《found》标志将被设置为《true》。最后，如果标志是《true》，我们使用《assertTrue()》方法断言无效字符的存在；否则，我们使用《assertFalse()》方法断言无效字符的缺失。</p><p>正则表达式提供了一种检测给定字符串中无效字符的替代方法。</p><p>这里有一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenInputString_whenUsingRegexPattern_thenFindIfInvalidCharacters</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> regexPattern <span class="token operator">=</span> <span class="token string">&quot;[^\\\\x00-\\\\x7F]+&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Pattern</span> pattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>regexPattern<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> pattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用正则表达式模式来识别任何超出ASCII范围（0到127）的字符。然后，我们使用《Pattern.compile()》方法编译定义为“[^\\x00-\\x7F]+”的《regexPattern》。<strong>这个模式针对不在这个范围内的字符。</strong></p><p>然后，我们创建一个《Matcher》对象，将《pattern》应用于《input》字符串。如果《Matcher》使用《matcher.find()》方法找到任何匹配项，表示存在无效字符。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总之，本教程提供了Java中字符编码的全面见解，并展示了两种有效的方法，利用字符串编码和正则表达式，用于检测和管理字符串中的无效字符，从而确保数据的完整性和安全性。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>`,22),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-23-How to Determine if a String Contains Invalid Encoded Characters.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-How%20to%20Determine%20if%20a%20String%20Contains%20Invalid%20Encoded%20Characters.html","title":"如何确定字符串是否包含无效编码字符","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Java","编码"],"tag":["字符串","UTF-8","ISO-8859-1"],"head":[["meta",{"name":"keywords","content":"Java, 字符串编码, UTF-8, ISO-8859-1, 无效字符检测"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-How%20to%20Determine%20if%20a%20String%20Contains%20Invalid%20Encoded%20Characters.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何确定字符串是否包含无效编码字符"}],["meta",{"property":"og:description","content":"如何确定字符串是否包含无效编码字符 无效编码的字符可能会导致各种问题，包括数据损坏和安全漏洞。因此，在处理字符串时确保数据正确编码至关重要。特别是当处理如UTF-8或ISO-8859-1这样的字符编码时。 在本教程中，我们将介绍如何确定Java字符串是否包含无效编码字符。我们将任何非ASCII字符视为无效。 2. Java中的字符编码 Java支持多种..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T15:48:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"字符串"}],["meta",{"property":"article:tag","content":"UTF-8"}],["meta",{"property":"article:tag","content":"ISO-8859-1"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T15:48:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何确定字符串是否包含无效编码字符\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T15:48:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何确定字符串是否包含无效编码字符 无效编码的字符可能会导致各种问题，包括数据损坏和安全漏洞。因此，在处理字符串时确保数据正确编码至关重要。特别是当处理如UTF-8或ISO-8859-1这样的字符编码时。 在本教程中，我们将介绍如何确定Java字符串是否包含无效编码字符。我们将任何非ASCII字符视为无效。 2. Java中的字符编码 Java支持多种..."},"headers":[{"level":2,"title":"2. Java中的字符编码","slug":"_2-java中的字符编码","link":"#_2-java中的字符编码","children":[]},{"level":2,"title":"3. 使用字符串编码","slug":"_3-使用字符串编码","link":"#_3-使用字符串编码","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719157736000,"updatedTime":1719157736000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.44,"words":733},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-How to Determine if a String Contains Invalid Encoded Characters.md","localizedDate":"2024年6月23日","excerpt":"\\n<p>无效编码的字符可能会导致各种问题，包括数据损坏和安全漏洞。因此，在处理字符串时确保数据正确编码至关重要。特别是当处理如UTF-8或ISO-8859-1这样的字符编码时。</p>\\n<p>在本教程中，我们将介绍如何确定Java字符串是否包含无效编码字符。我们将任何非ASCII字符视为无效。</p>\\n<h2>2. Java中的字符编码</h2>\\n<p>Java支持多种字符编码。此外，《Charset》类提供了处理它们的方法——最常见的编码是UTF-8和ISO-8859-1。</p>\\n<p>让我们举一个例子：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> input <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"Hеllo, World!\\"</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">byte</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> utf8Bytes <span class=\\"token operator\\">=</span> input<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getBytes</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">StandardCharsets</span><span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">UTF_8</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">String</span> utf8String <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">(</span>utf8Bytes<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">StandardCharsets</span><span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">UTF_8</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
