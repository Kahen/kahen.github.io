import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-COaDJFIk.js";const m={},r=a(`<hr><h1 id="将-outputstream-转换为-inputstream-baeldung" tabindex="-1"><a class="header-anchor" href="#将-outputstream-转换为-inputstream-baeldung"><span>将 OutputStream 转换为 InputStream | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><em>InputStream</em> 和 <em>OutputStream</em> 是 Java IO 中的两个基本类。有时，我们需要在这两类流之间进行转换。在之前的教程中，我们讨论了将 <em>InputStream</em> 写入 <em>OutputStream</em> 的问题。</p><p>在这个快速教程中，我们将看向相反的方向。我们将探讨如何将 <em>OutputStream</em> 转换为 <em>InputStream</em>。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>有时，将 <em>OutputStream</em> 转换为 <em>InputStream</em> 是必要的。这种转换在多种情况下都很有帮助，例如当我们需要读取写入 <em>OutputStream</em> 的数据时。</p><p>在本文中，我们将探索两种执行此转换的不同方法：</p><ul><li>使用字节数组</li><li>使用管道</li></ul><p>为了简单起见，我们将在示例中使用 <em>ByteArrayOutputStream</em> 作为 <em>OutputStream</em> 类型。同时，我们将使用单元测试断言来验证我们是否能够从转换后的 <em>InputStream</em> 对象中读取预期的数据。</p><p>接下来，让我们看看它们的实际应用。</p><h2 id="_3-使用字节数组" tabindex="-1"><a class="header-anchor" href="#_3-使用字节数组"><span>3. 使用字节数组</span></a></h2><p>当我们考虑这个问题时，最直接的方法可能是：</p><ul><li>第 1 步 - 从给定的 <em>OutputStream</em> 读取数据，并将其保存在缓冲区中，例如字节数组</li><li>第 2 步 - 使用字节数组创建一个 <em>InputStream</em></li></ul><p>接下来，让我们将这个想法实现为一个测试，并检查它是否按预期工作：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void whenUsingByteArray_thenGetExpectedInputStream() throws IOException {
    String content = &quot;I&#39;m an important message.&quot;;
    try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
        out.write(content.getBytes());
        try (ByteArrayInputStream in = new ByteArrayInputStream(out.toByteArray())) {
            String inContent = new String(in.readAllBytes());

            assertEquals(content, inContent);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们准备了一个 <em>OutputStream</em> 对象（<em>out</em>）并写入了一个字符串（<em>content</em>）。接下来，我们通过调用 <em>out.toByteArray()</em> 从 <em>OutputStream</em> 获取数据作为字节数组，并从数组创建一个 <em>InputStream</em>。</p><p>如果我们运行测试，它会通过。因此，转换是成功的。</p><p>值得一提的是，我们使用了 <em>try-with-resources</em> 语句以确保 <em>InputStream</em> 和 <em>OutputStream</em> 在读写操作后被关闭。同时，我们的 <em>try</em> 块没有 <em>catch</em> 块，因为我们已经声明了测试方法抛出 <em>IOException</em>。</p><p>这种方法简单易实现。然而，缺点是它需要在能够作为输入回读之前将整个输出存储在内存中。换句话说，如果输出非常大，它可能会导致显著的内存消耗，并可能引起 <em>OutOfMemoryError</em>。</p><h2 id="_4-通过管道" tabindex="-1"><a class="header-anchor" href="#_4-通过管道"><span>4. 通过管道</span></a></h2><p>我们经常一起使用 <em>PipedOutputStream</em> 和 <em>PipedInputStream</em> 类来允许数据从 <em>OutputStream</em> 传递到 <em>InputStream</em>。因此，我们首先可以连接一个 <em>PipedOutputStream</em> 和一个 <em>PipedInputStream</em>，以便 <em>PipedInputStream</em> 可以从 <em>PipedOutputStream</em> 读取数据。接下来，我们可以将给定的 <em>OutputStream</em> 的数据写入 <em>PipedOutputStream</em>。然后，在另一方面，我们可以从 <em>PipedInputStream</em> 读取数据。</p><p>接下来，让我们将其实现为一个单元测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void whenUsingPipeStream_thenGetExpectedInputStream() throws IOException {
    String content = &quot;I&#39;m going through the pipe.&quot;;

    ByteArrayOutputStream originOut = new ByteArrayOutputStream();
    originOut.write(content.getBytes());

    //connect the pipe
    PipedInputStream in = new PipedInputStream();
    PipedOutputStream out = new PipedOutputStream(in);

    try (in) {
        new Thread(() -&gt; {
            try (out) {
                originOut.writeTo(out);
            } catch (IOException iox) {
                // ...
            }
        }).start();

        String inContent = new String(in.readAllBytes());
        assertEquals(content, inContent);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上代码所示，首先，我们准备了 <em>OutputStream</em>（<em>originOut</em>）。接下来，我们创建了一个 <em>PipedInputStream</em>（<em>in</em>）和一个 <em>PipedOutputStream</em>（<em>out</em>）并将它们连接起来。这样，就建立了一个管道。</p><p>然后，我们使用 <em>ByteArrayOutputStream.writeTo()</em> 方法将数据从给定的 <em>OutputStream</em> 转发到 <em>PipedOutputStream</em>。我们应该注意，我们创建了一个新的线程来写入 <em>PipedOutputStream</em>。这是因为 <strong>从同一个线程使用 <em>PipedInputStream</em> 和 <em>PipedOutputStream</em> 对象是不建议的。这可能导致死锁</strong>。</p><p>最后，如果我们执行测试，它会通过。因此，成功将 <em>OutputStream</em> 转换为 <em>PipedInputStream</em>。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了将 <em>OutputStream</em> 转换为 <em>InputStream</em> 的两种方法：</p><ul><li>字节数组作为缓冲区 - 这是直接的。然而，它有 <em>OutOfMemoryError</em> 的潜在风险</li><li>使用管道 - 将输出写入 <em>PipedOutputStream</em> 使数据流向 <em>PipedInputStream</em></li></ul><p>像往常一样，这里展示的所有代码片段都可以在 GitHub 上找到。</p>`,31),i=[r];function u(p,l){return n(),t("div",null,i)}const o=e(m,[["render",u],["__file","2024-07-05-Convert an OutputStream to an InputStream.html.vue"]]),c=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Convert%20an%20OutputStream%20to%20an%20InputStream.html","title":"将 OutputStream 转换为 InputStream | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","IO"],"tag":["OutputStream","InputStream"],"head":[["meta",{"name":"keywords","content":"Java, OutputStream, InputStream, 转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Convert%20an%20OutputStream%20to%20an%20InputStream.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"将 OutputStream 转换为 InputStream | Baeldung"}],["meta",{"property":"og:description","content":"将 OutputStream 转换为 InputStream | Baeldung 1. 概述 InputStream 和 OutputStream 是 Java IO 中的两个基本类。有时，我们需要在这两类流之间进行转换。在之前的教程中，我们讨论了将 InputStream 写入 OutputStream 的问题。 在这个快速教程中，我们将看向相反的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T22:02:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"OutputStream"}],["meta",{"property":"article:tag","content":"InputStream"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T22:02:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"将 OutputStream 转换为 InputStream | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T22:02:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"将 OutputStream 转换为 InputStream | Baeldung 1. 概述 InputStream 和 OutputStream 是 Java IO 中的两个基本类。有时，我们需要在这两类流之间进行转换。在之前的教程中，我们讨论了将 InputStream 写入 OutputStream 的问题。 在这个快速教程中，我们将看向相反的..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用字节数组","slug":"_3-使用字节数组","link":"#_3-使用字节数组","children":[]},{"level":2,"title":"4. 通过管道","slug":"_4-通过管道","link":"#_4-通过管道","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720216928000,"updatedTime":1720216928000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.3,"words":990},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Convert an OutputStream to an InputStream.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>将 OutputStream 转换为 InputStream | Baeldung</h1>\\n<h2>1. 概述</h2>\\n<p><em>InputStream</em> 和 <em>OutputStream</em> 是 Java IO 中的两个基本类。有时，我们需要在这两类流之间进行转换。在之前的教程中，我们讨论了将 <em>InputStream</em> 写入 <em>OutputStream</em> 的问题。</p>\\n<p>在这个快速教程中，我们将看向相反的方向。我们将探讨如何将 <em>OutputStream</em> 转换为 <em>InputStream</em>。</p>","autoDesc":true}');export{o as comp,c as data};
