import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BUAgDejY.js";const e={},p=t('<h1 id="java中的utf-8编码验证" tabindex="-1"><a class="header-anchor" href="#java中的utf-8编码验证"><span>Java中的UTF-8编码验证</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在数据传输中，我们经常需要处理字节数据。如果数据是编码后的字符串而不是二进制数据，我们通常会使用Unicode编码。Unicode转换格式-8（UTF-8）是一种可变长度的编码方式，可以编码所有可能的Unicode字符。</p><p>在本教程中，我们将探讨UTF-8编码字节和字符串之间的转换。之后，我们将深入探讨在Java中对字节数据进行UTF-8验证的关键方面。</p><h2 id="_2-utf-8转换" tabindex="-1"><a class="header-anchor" href="#_2-utf-8转换"><span>2. UTF-8转换</span></a></h2><p>在我们进入验证部分之前，让我们回顾一下如何将字符串转换为UTF-8编码的字节数组，反之亦然。</p><p><strong>我们可以通过调用字符串的目标编码的_getBytes()_方法，将字符串转换为字节数组：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token constant">UTF8_STRING</span> <span class="token operator">=</span> <span class="token string">&quot;Hello 你好&quot;</span><span class="token punctuation">;</span>\n<span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token constant">UTF8_BYTES</span> <span class="token operator">=</span> <span class="token constant">UTF8_STRING</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>对于反向操作，_String_类提供了一个构造函数，通过字节数组和其源编码创建一个_String_实例：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> decodedStr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们使用的构造函数对解码过程没有太多的控制。每当字节数组包含无法映射的字符序列时，它就会用默认的替换字符替换这些字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenDecodeInvalidBytes_thenReturnReplacementChars</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> invalidUtf8Bytes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token number">0xF0</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token number">0xC1</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token number">0x8C</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token number">0xBC</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token number">0xD1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> decodedStr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>invalidUtf8Bytes<span class="token punctuation">,</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> decodedStr<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，我们不能使用这种方法来验证一个字节数组是否以UTF-8编码。</p><h2 id="_3-字节数组验证" tabindex="-1"><a class="header-anchor" href="#_3-字节数组验证"><span>3. 字节数组验证</span></a></h2><p><strong>Java提供了一种简单的方法，使用_CharsetDecoder_来验证一个字节数组是否以UTF-8编码：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CharsetDecoder</span> charsetDecoder <span class="token operator">=</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">.</span><span class="token function">newDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">CharBuffer</span> decodedCharBuffer <span class="token operator">=</span> charsetDecoder<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>nio<span class="token punctuation">.</span></span>ByteBuffer</span><span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span><span class="token constant">UTF8_BYTES</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果解码过程成功，我们认为这些字节是有效的UTF-8。否则，_decode()<em>方法会抛出_MalformedInputException</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenDecodeInvalidUTF8Bytes_thenThrowsMalformedInputException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\n   <span class="token class-name">CharsetDecoder</span> charsetDecoder <span class="token operator">=</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">.</span><span class="token function">newDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n   <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">MalformedInputException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n       charsetDecoder<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>nio<span class="token punctuation">.</span></span>ByteBuffer</span><span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span><span class="token constant">INVALID_UTF8_BYTES</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n   <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-字节流验证" tabindex="-1"><a class="header-anchor" href="#_4-字节流验证"><span>4. 字节流验证</span></a></h2><p>当我们的源数据是字节流而不是字节数组时，我们可以读取_InputStream_并将其内容放入字节数组。随后，我们可以对字节数组应用编码验证。</p><p><strong>然而，我们更倾向于直接验证_InputStream_。这避免了创建额外的字节数组，并减少了我们应用程序中的内存占用。</strong> 当我们处理一个大流时，这一点尤其重要。</p><p>在这一部分，我们将定义以下常量作为我们的源UTF-8编码_InputStream_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">InputStream</span> <span class="token constant">UTF8_INPUTSTREAM</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span><span class="token constant">UTF8_BYTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-1-使用apache-tika进行验证" tabindex="-1"><a class="header-anchor" href="#_4-1-使用apache-tika进行验证"><span>4.1 使用Apache Tika进行验证</span></a></h3><p>Apache Tika是一个开源的内容分析库，提供了一套类用于检测和从不同文件格式中提取文本内容。</p><p>我们需要在_pom.xml_中包含以下Apache Tika核心和标准解析器依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.apache.tika```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```tika-core```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```2.9.1```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.apache.tika```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```tika-parsers-standard-package```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```2.9.1```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>当我们在Apache Tika中进行UTF-8验证时，我们实例化一个_UniversalEncodingDetector_并使用它来检测_InputStream_的编码。检测器返回编码作为一个_Charset_实例。</strong> 我们只需验证_Charset_实例是否是UTF-8的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenDetectEncoding_thenReturnsUtf8</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">EncodingDetector</span> encodingDetector <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UniversalEncodingDetector</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Charset</span> detectedCharset <span class="token operator">=</span> encodingDetector<span class="token punctuation">.</span><span class="token function">detect</span><span class="token punctuation">(</span><span class="token constant">UTF8_INPUTSTREAM</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Metadata</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">,</span> detectedCharset<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>值得注意的是，当我们检测一个只包含ASCII码中前128个字符的流时，_detect()_方法返回ISO-8859-1而不是UTF-8。</strong></p><p>ISO-8859-1是一种单字节编码，用于表示ASCII字符，这些字符与前128个Unicode字符相同。由于这一特性，如果方法返回ISO-8859-1，我们仍然认为数据是以UTF-8编码的。</p><h3 id="_4-2-使用icu4j进行验证" tabindex="-1"><a class="header-anchor" href="#_4-2-使用icu4j进行验证"><span>4.2 使用ICU4J进行验证</span></a></h3><p>ICU4J代表Java的Unicode国际组件，是由IBM发布的Java库。它为软件应用程序提供Unicode和全球化支持。我们需要在_pom.xml_中包含以下ICU4J依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```com.ibm.icu```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```icu4j```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```74.1```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在ICU4J中，我们创建一个_CharsetDetector_实例来检测_InputStream_的字符集。</strong> 与使用Apache Tika进行验证类似，我们验证字符集是否为UTF-8：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenDetectEncoding_thenReturnsUtf8</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">CharsetDetector</span> detector <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CharsetDetector</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    detector<span class="token punctuation">.</span><span class="token function">setText</span><span class="token punctuation">(</span><span class="token constant">UTF8_INPUTSTREAM</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">CharsetMatch</span> charsetMatch <span class="token operator">=</span> detector<span class="token punctuation">.</span><span class="token function">detect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> charsetMatch<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ICU4J在检测只包含前128个ASCII字符的数据流的编码时，表现出相同的行为，当检测返回ISO-8859-1时。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了基于字节和流的不同类型的UTF-8验证，以及UTF-8编码的字节和字符串转换。这趟旅程为我们提供了实用的代码，以加深对Java应用程序中UTF-8的理解。</p><p>如往常一样，示例代码可在GitHub上找到。</p><p>OK</p>',41),c=[p];function o(l,i){return s(),a("div",null,c)}const r=n(e,[["render",o],["__file","2024-06-25-UTF 8 Validation in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-UTF%208%20Validation%20in%20Java.html","title":"Java中的UTF-8编码验证","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Java","UTF-8"],"tag":["UTF-8","编码","验证"],"head":[["meta",{"name":"keywords","content":"Java, UTF-8, 编码, 验证, Unicode"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-UTF%208%20Validation%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的UTF-8编码验证"}],["meta",{"property":"og:description","content":"Java中的UTF-8编码验证 1. 概述 在数据传输中，我们经常需要处理字节数据。如果数据是编码后的字符串而不是二进制数据，我们通常会使用Unicode编码。Unicode转换格式-8（UTF-8）是一种可变长度的编码方式，可以编码所有可能的Unicode字符。 在本教程中，我们将探讨UTF-8编码字节和字符串之间的转换。之后，我们将深入探讨在Jav..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T13:01:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"UTF-8"}],["meta",{"property":"article:tag","content":"编码"}],["meta",{"property":"article:tag","content":"验证"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T13:01:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的UTF-8编码验证\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T13:01:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的UTF-8编码验证 1. 概述 在数据传输中，我们经常需要处理字节数据。如果数据是编码后的字符串而不是二进制数据，我们通常会使用Unicode编码。Unicode转换格式-8（UTF-8）是一种可变长度的编码方式，可以编码所有可能的Unicode字符。 在本教程中，我们将探讨UTF-8编码字节和字符串之间的转换。之后，我们将深入探讨在Jav..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. UTF-8转换","slug":"_2-utf-8转换","link":"#_2-utf-8转换","children":[]},{"level":2,"title":"3. 字节数组验证","slug":"_3-字节数组验证","link":"#_3-字节数组验证","children":[]},{"level":2,"title":"4. 字节流验证","slug":"_4-字节流验证","link":"#_4-字节流验证","children":[{"level":3,"title":"4.1 使用Apache Tika进行验证","slug":"_4-1-使用apache-tika进行验证","link":"#_4-1-使用apache-tika进行验证","children":[]},{"level":3,"title":"4.2 使用ICU4J进行验证","slug":"_4-2-使用icu4j进行验证","link":"#_4-2-使用icu4j进行验证","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719320466000,"updatedTime":1719320466000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.94,"words":1183},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-UTF 8 Validation in Java.md","localizedDate":"2024年6月25日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在数据传输中，我们经常需要处理字节数据。如果数据是编码后的字符串而不是二进制数据，我们通常会使用Unicode编码。Unicode转换格式-8（UTF-8）是一种可变长度的编码方式，可以编码所有可能的Unicode字符。</p>\\n<p>在本教程中，我们将探讨UTF-8编码字节和字符串之间的转换。之后，我们将深入探讨在Java中对字节数据进行UTF-8验证的关键方面。</p>\\n<h2>2. UTF-8转换</h2>\\n<p>在我们进入验证部分之前，让我们回顾一下如何将字符串转换为UTF-8编码的字节数组，反之亦然。</p>\\n<p><strong>我们可以通过调用字符串的目标编码的_getBytes()_方法，将字符串转换为字节数组：</strong></p>","autoDesc":true}');export{r as comp,k as data};
