import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DqNnL-2T.js";const e={},p=t(`<h1 id="java中utf-8到iso-8859-1的编码转换" tabindex="-1"><a class="header-anchor" href="#java中utf-8到iso-8859-1的编码转换"><span>Java中UTF-8到ISO-8859-1的编码转换</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>字符编码问题对于Java编程至关重要，尤其是在与多个系统和数据源一起工作时。</p><h3 id="在本教程中-我们将讨论如何将utf-8编码的字符串转换为拉丁-1编码-这通常被称为iso-8859-1编码。" tabindex="-1"><a class="header-anchor" href="#在本教程中-我们将讨论如何将utf-8编码的字符串转换为拉丁-1编码-这通常被称为iso-8859-1编码。"><span>在本教程中，我们将讨论如何将UTF-8编码的字符串转换为拉丁-1编码，这通常被称为ISO-8859-1编码。</span></a></h3><h2 id="_2-问题定义" tabindex="-1"><a class="header-anchor" href="#_2-问题定义"><span>2. 问题定义</span></a></h2><p>将UTF-8字符串转换为ISO-8859-1编码环境可能会出奇地困难。如果字符映射方式不同，可能会导致数据损坏或丢失。</p><p>为了使这个问题更容易理解，假设我们有需要转换为ISO-8859-1的UTF-8编码字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> string <span class="token operator">=</span> <span class="token string">&quot;âabcd&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-使用-getbytes-方法的直接方法" tabindex="-1"><a class="header-anchor" href="#_3-使用-getbytes-方法的直接方法"><span>3. 使用_getBytes()_方法的直接方法</span></a></h2><p>我们可以直接使用_getBytes()_方法从UTF-8编码的字符串中获取ISO-8859-1字节，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> expectedBytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token number">0xE2</span><span class="token punctuation">,</span> <span class="token number">0x61</span><span class="token punctuation">,</span> <span class="token number">0x62</span><span class="token punctuation">,</span> <span class="token number">0x63</span><span class="token punctuation">,</span> <span class="token number">0x64</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenUtf8String_whenUsingGetByte_thenIsoBytesShouldBeEqual</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> iso88591bytes <span class="token operator">=</span> string<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">ISO_8859_1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedBytes<span class="token punctuation">,</span> iso88591bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，我们有一个名为_string_的UTF-8编码字符串，包含_âabcd_，预期的字节数组_expectedBytes_表示这个字符串的_ISO-8859-1_编码。</p><h3 id="我们调用-string-对象上的-getbytes-方法-并使用iso-8859-1字符集-这将返回字节数组-iso88591bytes。" tabindex="-1"><a class="header-anchor" href="#我们调用-string-对象上的-getbytes-方法-并使用iso-8859-1字符集-这将返回字节数组-iso88591bytes。"><span>我们调用_string_对象上的_getBytes()<em>方法，并使用ISO-8859-1字符集，这将返回字节数组_iso88591bytes</em>。</span></a></h3><p>最后，我们使用_assertArrayEquals()_将_iso88591bytes_与_expectedBytes_进行比较，以确保转换结果符合我们的预期。</p><h3 id="这种方法提供了一种直接获取所需字节数组表示的简便方式。" tabindex="-1"><a class="header-anchor" href="#这种方法提供了一种直接获取所需字节数组表示的简便方式。"><span>这种方法提供了一种直接获取所需字节数组表示的简便方式。</span></a></h3><h2 id="_4-数据处理方法" tabindex="-1"><a class="header-anchor" href="#_4-数据处理方法"><span>4. 数据处理方法</span></a></h2><p>当处理大型数据集或需要分块数据处理的场景时，控制转换方法变得非常宝贵。使用Java NIO包中的_ByteBuffer_和_CharBuffer_可以对UTF-8字节进行解码成字符，然后再次将它们编码成ISO-8859-1字节。</p><p>让我们考虑以下示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenString_whenUsingByteBufferCharBufferConvertToIso_thenBytesShouldBeEqual</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ByteBuffer</span> inputBuffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span>string<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">CharBuffer</span> data <span class="token operator">=</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>inputBuffer<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">ByteBuffer</span> outputBuffer <span class="token operator">=</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">ISO_8859_1</span><span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> outputData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span>outputBuffer<span class="token punctuation">.</span><span class="token function">remaining</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    outputBuffer<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>outputData<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedBytes<span class="token punctuation">,</span> outputData<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们首先将字符串的UTF-8编码字节包装到_ByteBuffer_中。然后，使用_decode()_方法，我们使用UTF-8字符集将这些字节解码成字符。</p><p>接下来，我们使用_encode()_方法将字符重新编码成ISO-8859-1字符集的字节，并将结果存储在_outputData_中。</p><h3 id="这种方法提供了对转换过程的精细控制-特别适用于需要部分数据处理或操作的场景。" tabindex="-1"><a class="header-anchor" href="#这种方法提供了对转换过程的精细控制-特别适用于需要部分数据处理或操作的场景。"><span>这种方法提供了对转换过程的精细控制，特别适用于需要部分数据处理或操作的场景。</span></a></h3><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总之，我们讨论了将UTF-8编码的字符串转换为ISO-8859-1的两种方法。直接字节转换方法使用_getBytes()_方法，提供了更简单的转换机制。</p><p>另一方面，部分数据处理方法利用_ByteBuffer_和_CharBuffer_，提供了对转换过程的更精细控制。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>`,26),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-20-Converting UTF 8 to ISO 8859 1 in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Converting%20UTF%208%20to%20ISO%208859%201%20in%20Java.html","title":"Java中UTF-8到ISO-8859-1的编码转换","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Java","编码转换"],"tag":["UTF-8","ISO-8859-1"],"head":[["meta",{"name":"keywords","content":"Java, 编码转换, UTF-8, ISO-8859-1"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Converting%20UTF%208%20to%20ISO%208859%201%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中UTF-8到ISO-8859-1的编码转换"}],["meta",{"property":"og:description","content":"Java中UTF-8到ISO-8859-1的编码转换 1. 引言 字符编码问题对于Java编程至关重要，尤其是在与多个系统和数据源一起工作时。 在本教程中，我们将讨论如何将UTF-8编码的字符串转换为拉丁-1编码，这通常被称为ISO-8859-1编码。 2. 问题定义 将UTF-8字符串转换为ISO-8859-1编码环境可能会出奇地困难。如果字符映射方..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"UTF-8"}],["meta",{"property":"article:tag","content":"ISO-8859-1"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中UTF-8到ISO-8859-1的编码转换\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中UTF-8到ISO-8859-1的编码转换 1. 引言 字符编码问题对于Java编程至关重要，尤其是在与多个系统和数据源一起工作时。 在本教程中，我们将讨论如何将UTF-8编码的字符串转换为拉丁-1编码，这通常被称为ISO-8859-1编码。 2. 问题定义 将UTF-8字符串转换为ISO-8859-1编码环境可能会出奇地困难。如果字符映射方..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[{"level":3,"title":"在本教程中，我们将讨论如何将UTF-8编码的字符串转换为拉丁-1编码，这通常被称为ISO-8859-1编码。","slug":"在本教程中-我们将讨论如何将utf-8编码的字符串转换为拉丁-1编码-这通常被称为iso-8859-1编码。","link":"#在本教程中-我们将讨论如何将utf-8编码的字符串转换为拉丁-1编码-这通常被称为iso-8859-1编码。","children":[]}]},{"level":2,"title":"2. 问题定义","slug":"_2-问题定义","link":"#_2-问题定义","children":[]},{"level":2,"title":"3. 使用_getBytes()_方法的直接方法","slug":"_3-使用-getbytes-方法的直接方法","link":"#_3-使用-getbytes-方法的直接方法","children":[{"level":3,"title":"我们调用_string_对象上的_getBytes()方法，并使用ISO-8859-1字符集，这将返回字节数组_iso88591bytes。","slug":"我们调用-string-对象上的-getbytes-方法-并使用iso-8859-1字符集-这将返回字节数组-iso88591bytes。","link":"#我们调用-string-对象上的-getbytes-方法-并使用iso-8859-1字符集-这将返回字节数组-iso88591bytes。","children":[]},{"level":3,"title":"这种方法提供了一种直接获取所需字节数组表示的简便方式。","slug":"这种方法提供了一种直接获取所需字节数组表示的简便方式。","link":"#这种方法提供了一种直接获取所需字节数组表示的简便方式。","children":[]}]},{"level":2,"title":"4. 数据处理方法","slug":"_4-数据处理方法","link":"#_4-数据处理方法","children":[{"level":3,"title":"这种方法提供了对转换过程的精细控制，特别适用于需要部分数据处理或操作的场景。","slug":"这种方法提供了对转换过程的精细控制-特别适用于需要部分数据处理或操作的场景。","link":"#这种方法提供了对转换过程的精细控制-特别适用于需要部分数据处理或操作的场景。","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.5,"words":749},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Converting UTF 8 to ISO 8859 1 in Java.md","localizedDate":"2024年6月20日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>字符编码问题对于Java编程至关重要，尤其是在与多个系统和数据源一起工作时。</p>\\n<h3>在本教程中，我们将讨论如何将UTF-8编码的字符串转换为拉丁-1编码，这通常被称为ISO-8859-1编码。</h3>\\n<h2>2. 问题定义</h2>\\n<p>将UTF-8字符串转换为ISO-8859-1编码环境可能会出奇地困难。如果字符映射方式不同，可能会导致数据损坏或丢失。</p>\\n<p>为了使这个问题更容易理解，假设我们有需要转换为ISO-8859-1的UTF-8编码字符串：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> string <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"âabcd\\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
