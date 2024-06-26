import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a as s}from"./app-Ah-f5VnZ.js";const e={},p=s(`<h1 id="java-inputstream与inputstreamreader-baeldung" tabindex="-1"><a class="header-anchor" href="#java-inputstream与inputstreamreader-baeldung"><span>Java InputStream与InputStreamReader | Baeldung</span></a></h1><p>在本文中，我们将讨论InputStream类以及它如何处理来自不同来源的二进制信息。我们还将讨论InputStreamReader类以及它与InputStream的不同之处。</p><h2 id="_2-inputstream是什么" tabindex="-1"><a class="header-anchor" href="#_2-inputstream是什么"><span>2. InputStream是什么？</span></a></h2><p>InputStream是一个类，它以字节的形式从源读取二进制数据。因为它是一个抽象类，我们只能通过它的子类来实例化它，比如FileInputStream和ByteArrayInputStream等。</p><h2 id="_3-inputstreamreader是什么" tabindex="-1"><a class="header-anchor" href="#_3-inputstreamreader是什么"><span>3. InputStreamReader是什么？</span></a></h2><p>与InputStream类相比，InputStreamReader直接处理字符或文本。它使用给定的InputStream读取字节，然后根据某种字符集将其转换为字符。我们可以显式设置字符集，比如UTF-8、UTF-16等，或者依赖JVM的默认字符集：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAStringWrittenToAFile_whenReadByInputStreamReader_thenShouldMatchWhenRead</span><span class="token punctuation">(</span><span class="token annotation punctuation">@TempDir</span> <span class="token class-name">Path</span> tempDir<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> sampleTxt <span class="token operator">=</span> <span class="token string">&quot;Good day. This is just a test. Good bye.&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Path</span> sampleOut <span class="token operator">=</span> tempDir<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&quot;sample-out.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` lines <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>sampleTxt<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>sampleOut<span class="token punctuation">,</span> lines<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> absolutePath <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>sampleOut<span class="token punctuation">.</span><span class="token function">toAbsolutePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">InputStreamReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>absolutePath<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">boolean</span> isMatched <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> b<span class="token punctuation">;</span>
        <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>b <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>sb<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>sampleTxt<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                isMatched <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">assertThat</span><span class="token punctuation">(</span>isMatched<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码片段展示了我们如何使用StandardCharsets.UTF_8常量来显式设置InputStreamReader的编码。</p><p>我们的FileInputStream，InputStream的一种类型，被InputStreamReader包装。因此，我们可以看到InputStreamReader将InputStream解释为文本而不是原始字节信息。</p><p>InputStreamReader是从字节流到字符流的桥梁。这个类接受一个InputStream实例，读取字节，并使用字符编码将它们解码成字符。它有一个read()方法，读取一个单一的字符。这个方法通过在其底层InputStream的当前位置之前读取一个或多个字节来将字节转换为字符。当流的末尾被到达时，它返回-1。</p><p>相比之下，InputStream是所有表示字节输入流的类的超类。这个类是InputStreamReader的主要构造函数参数，意味着任何InputStream的子类都是InputStreamReader的有效字节源。</p><p>InputStream类还有一个read()方法，读取一个单个字节。然而，InputStream.read()方法不会将字节解码成字符，而InputStreamReader.read()会。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了InputStream和InputStreamReader。InputStream是一个抽象类，有各种子类专门处理二进制数据，比如FileInputStream和ByteArrayInputStream等。相比之下，InputStreamReader从InputStream读取字节并将其转换为指定编码的字符。</p><p>这两个类之间的区别很直接。当我们需要处理二进制数据时，我们应该使用InputStream。如果我们需要处理字符流，我们可能会从使用InputStreamReader中受益。</p><p>InputStream是创建InputStreamReader所需的主要构造函数参数。</p><p>文章中使用的所有代码示例都可以在GitHub上找到。</p>`,17),o=[p];function r(u,c){return t(),n("div",null,o)}const m=a(e,[["render",r],["__file","2024-06-20-Java InputStream vs. InputStreamReader.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Java%20InputStream%20vs.%20InputStreamReader.html","title":"Java InputStream与InputStreamReader | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Java","编程"],"tag":["InputStream","InputStreamReader"],"head":[["meta",{"name":"keywords","content":"Java, InputStream, InputStreamReader, 字节流, 字符流, 编码, 转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Java%20InputStream%20vs.%20InputStreamReader.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java InputStream与InputStreamReader | Baeldung"}],["meta",{"property":"og:description","content":"Java InputStream与InputStreamReader | Baeldung 在本文中，我们将讨论InputStream类以及它如何处理来自不同来源的二进制信息。我们还将讨论InputStreamReader类以及它与InputStream的不同之处。 2. InputStream是什么？ InputStream是一个类，它以字节的形式从..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"InputStream"}],["meta",{"property":"article:tag","content":"InputStreamReader"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java InputStream与InputStreamReader | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java InputStream与InputStreamReader | Baeldung 在本文中，我们将讨论InputStream类以及它如何处理来自不同来源的二进制信息。我们还将讨论InputStreamReader类以及它与InputStream的不同之处。 2. InputStream是什么？ InputStream是一个类，它以字节的形式从..."},"headers":[{"level":2,"title":"2. InputStream是什么？","slug":"_2-inputstream是什么","link":"#_2-inputstream是什么","children":[]},{"level":2,"title":"3. InputStreamReader是什么？","slug":"_3-inputstreamreader是什么","link":"#_3-inputstreamreader是什么","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.35,"words":704},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Java InputStream vs. InputStreamReader.md","localizedDate":"2024年6月20日","excerpt":"\\n<p>在本文中，我们将讨论InputStream类以及它如何处理来自不同来源的二进制信息。我们还将讨论InputStreamReader类以及它与InputStream的不同之处。</p>\\n<h2>2. InputStream是什么？</h2>\\n<p>InputStream是一个类，它以字节的形式从源读取二进制数据。因为它是一个抽象类，我们只能通过它的子类来实例化它，比如FileInputStream和ByteArrayInputStream等。</p>\\n<h2>3. InputStreamReader是什么？</h2>\\n<p>与InputStream类相比，InputStreamReader直接处理字符或文本。它使用给定的InputStream读取字节，然后根据某种字符集将其转换为字符。我们可以显式设置字符集，比如UTF-8、UTF-16等，或者依赖JVM的默认字符集：</p>","autoDesc":true}');export{m as comp,d as data};
