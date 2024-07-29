import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as r,a}from"./app-BUAgDejY.js";const i={},n=a(`<hr><h1 id="如何在java中将字符串写入outputstream" tabindex="-1"><a class="header-anchor" href="#如何在java中将字符串写入outputstream"><span>如何在Java中将字符串写入OutputStream</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>我们经常在需要将数据传输到外部目的地，如文件和网络时使用_OutputStream_。数据可以是二进制格式或字符串格式。<strong>我们使用_OutputStream_，这是一个字节流，来处理二进制数据，并使用_Writer_，这是一个字符流，来处理字符串数据。</strong></p><p>然而，在某些情况下，由于选定的API的限制，我们必须将字符串写入_OutputStream_。在某些情况下，API可能只提供_OutputStream_而不是_Writer_。在本教程中，我们将探讨在这种情况下将字符串写入_OutputStream_的不同方法。</p><h2 id="_2-字节转换" tabindex="-1"><a class="header-anchor" href="#_2-字节转换"><span>2. 字节转换</span></a></h2><p><strong>最直接的方法涉及将字符串转换为字节，然后将转换后的字节写入_OutputStream：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String str = &quot;Hello&quot;;
byte[] bytes = str.getBytes(StandardCharsets.UTF_8);
outputStream.write(bytes);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法简单直接，但有一个主要缺点。我们需要在每次调用_getBytes()_时显式地将字符串转换为字节，并指定字符编码。这使得我们的代码变得繁琐。</p><h2 id="_3-outputstreamwriter" tabindex="-1"><a class="header-anchor" href="#_3-outputstreamwriter"><span>3. <em>OutputStreamWriter</em></span></a></h2><p><strong>更好的方法是使用_OutputStreamWriter_来包装我们的_OutputStream_。</strong> _OutputStreamWriter_作为一个包装器，将字符流转换为字节流。写入它的字符串使用所选的字符编码编码成字节。</p><p>我们通过_write()_方法写入字符串，而不需要指定字符编码。对_OutputStreamWriter_的每次_write()_调用都隐式地将字符串转换为编码的字节，提供了一个更流畅的过程：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>try (OutputStreamWriter writer = new OutputStreamWriter(outputStream, StandardCharsets.UTF_8)) {
    writer.write(&quot;Hello&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果包装的_OutputStream_尚未缓冲，我们建议使用_BufferedWriter_来包装_OutputStreamWriter_，以使写入过程更有效：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>BufferedWriter bufferedWriter = new BufferedWriter(writer);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这通过先将数据写入缓冲区，然后一次性将缓冲的数据刷新到流中，减少了IO操作。</p><h2 id="_4-printstream" tabindex="-1"><a class="header-anchor" href="#_4-printstream"><span>4. <em>PrintStream</em></span></a></h2><p><strong>另一个选择是使用_PrintStream_，它提供了与_OutputStreamWriter_类似的功能。</strong> 与_OutputStreamWriter_类似，我们可以在实例化_PrintStream_时指定编码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>try (PrintStream printStream = new PrintStream(outputStream, true, StandardCharsets.UTF_8)) {
    printStream.print(&quot;Hello&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们在构造函数中没有明确定义字符编码，默认编码将是UTF-8：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>PrintStream printStream = new PrintStream(outputStream);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>_PrintStream_和_OutputStreamWriter_之间的不同之处在于_PrintStream_提供了额外的_print()<em>方法，用于将不同类型的数据写入_OutputStream</em>。此外，_PrintWriter_永远不会因其_print()_和_write()<em>方法而抛出_IOException</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>printStream.print(100); // 整数
printStream.print(true); // 布尔值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-printwriter" tabindex="-1"><a class="header-anchor" href="#_5-printwriter"><span>5. <em>PrintWriter</em></span></a></h2><p><strong>_PrintWriter_的用途与_PrintStream_相似，提供将数据的格式化表示写入_OutputStream_的功能：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>try (PrintWriter writer = new PrintWriter(outputStream)) {
    writer.print(&quot;Hello&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了包装_OutputStream_，<em>PrintWriter_还提供了额外的构造函数来包装_Writer</em>。它们之间的另一个区别是，_PrintWriter_提供了_write()_方法来写入字符数组，而_PrintStream_提供了_write()_方法来写入字节数组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>char[] c = new char[] {&#39;H&#39;, &#39;e&#39;, &#39;l&#39;, &#39;l&#39;, &#39;o&#39;};
try (PrintWriter writer = new PrintWriter(new StringWriter())) {
    writer.write(c);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了在Java中将字符串写入_OutputStream_的几种方法。</p><p>我们从将字符串直接转换为字节开始，这需要为每次写操作显式编码，影响代码的可维护性。随后，我们探讨了三种不同的Java类，它们围绕_OutputStream_进行包装，以无缝地将字符串编码成字节。</p><p>如往常一样，示例代码可在GitHub上找到。翻译已经完成，以下是剩余部分的翻译：</p><h2 id="_6-结论-1" tabindex="-1"><a class="header-anchor" href="#_6-结论-1"><span>6. 结论</span></a></h2><p>在这篇文章中，我们探索了在Java中将字符串写入_OutputStream_的几种方法。</p><p>我们首先从将字符串直接转换为字节开始，这种方法需要为每次写操作显式指定编码，并且会影响代码的可维护性。接着，我们探讨了三种不同的Java类，它们可以包装_OutputStream_来无缝地将字符串编码成字节。</p><p>一如既往，示例代码可以在GitHub上找到。</p><p>OK</p>`,37),u=[n];function s(p,d){return r(),e("div",null,u)}const _=t(i,[["render",s],["__file","2024-06-25-How to Write Strings to OutputStream in Java.html.vue"]]),o=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-How%20to%20Write%20Strings%20to%20OutputStream%20in%20Java.html","title":"如何在Java中将字符串写入OutputStream","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Java","OutputStream"],"tag":["Java","OutputStream","StringWriter"],"head":[["meta",{"name":"keywords","content":"Java, OutputStream, 字符串写入, 编码"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-How%20to%20Write%20Strings%20to%20OutputStream%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java中将字符串写入OutputStream"}],["meta",{"property":"og:description","content":"如何在Java中将字符串写入OutputStream 1. 概述 我们经常在需要将数据传输到外部目的地，如文件和网络时使用_OutputStream_。数据可以是二进制格式或字符串格式。我们使用_OutputStream_，这是一个字节流，来处理二进制数据，并使用_Writer_，这是一个字符流，来处理字符串数据。 然而，在某些情况下，由于选定的API..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T13:51:17.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"OutputStream"}],["meta",{"property":"article:tag","content":"StringWriter"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T13:51:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java中将字符串写入OutputStream\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T13:51:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Java中将字符串写入OutputStream 1. 概述 我们经常在需要将数据传输到外部目的地，如文件和网络时使用_OutputStream_。数据可以是二进制格式或字符串格式。我们使用_OutputStream_，这是一个字节流，来处理二进制数据，并使用_Writer_，这是一个字符流，来处理字符串数据。 然而，在某些情况下，由于选定的API..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 字节转换","slug":"_2-字节转换","link":"#_2-字节转换","children":[]},{"level":2,"title":"3. OutputStreamWriter","slug":"_3-outputstreamwriter","link":"#_3-outputstreamwriter","children":[]},{"level":2,"title":"4. PrintStream","slug":"_4-printstream","link":"#_4-printstream","children":[]},{"level":2,"title":"5. PrintWriter","slug":"_5-printwriter","link":"#_5-printwriter","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论-1","link":"#_6-结论-1","children":[]}],"git":{"createdTime":1719323477000,"updatedTime":1719323477000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.39,"words":1017},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-How to Write Strings to OutputStream in Java.md","localizedDate":"2024年6月25日","excerpt":"<hr>\\n<h1>如何在Java中将字符串写入OutputStream</h1>\\n<h2>1. 概述</h2>\\n<p>我们经常在需要将数据传输到外部目的地，如文件和网络时使用_OutputStream_。数据可以是二进制格式或字符串格式。<strong>我们使用_OutputStream_，这是一个字节流，来处理二进制数据，并使用_Writer_，这是一个字符流，来处理字符串数据。</strong></p>\\n<p>然而，在某些情况下，由于选定的API的限制，我们必须将字符串写入_OutputStream_。在某些情况下，API可能只提供_OutputStream_而不是_Writer_。在本教程中，我们将探讨在这种情况下将字符串写入_OutputStream_的不同方法。</p>","autoDesc":true}');export{_ as comp,o as data};
