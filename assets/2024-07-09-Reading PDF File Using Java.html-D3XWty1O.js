import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as i,a}from"./app-BDZ-trJf.js";const n={},l=a('<h1 id="java中读取pdf文件的教程" tabindex="-1"><a class="header-anchor" href="#java中读取pdf文件的教程"><span>Java中读取PDF文件的教程</span></a></h1><ol><li>概述</li></ol><p>便携式文档格式（PDF）是一种用于文档的常见文件格式。它用于分发需要保留原始格式的电子文档。</p><p>在本教程中，我们将探索Java中读取PDF文件的两个最流行的库：Apache PDFBox和iText。</p><ol start="2"><li>配置</li></ol><p>我们将使用Maven来管理依赖。</p><p>此外，我们将向项目根目录添加一个示例PDF文件。该文件包含一个简单的短语“Hello World!”。</p><p>接下来，我们将读取示例PDF文件，并测试提取的文本与预期结果是否一致。</p><ol start="3"><li>使用Apache PDFBox</li></ol><p><strong>Apache PDFBox是一个用于处理和操作PDF文档的免费开源Java库</strong>。其功能包括提取文本、将PDF渲染成图像以及合并和拆分PDF。</p><p>让我们将Apache PDFBox依赖项添加到_pom.xml_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``org.apache.pdfbox``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``pdfbox``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``${pdfbox.version}``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下是使用Apache PDFBox从PDF文件中读取文本的简单示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\npublic void givenSamplePdf_whenUsingApachePdfBox_thenCompareOutput() throws IOException {\n    String expectedText = &quot;Hello World!\\n&quot;;\n    File file = new File(&quot;sample.pdf&quot;);\n    PDDocument document = PDDocument.load(file);\n    PDFTextStripper stripper = new PDFTextStripper();\n    String text = stripper.getText(document);\n    document.close();\n\n    assertEquals(expectedText, text);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，我们创建了一个新的_PDDocument_实例来将PDF文件加载到程序中。然后，我们创建了一个新的_PDFTextStripper_实例，并调用_getText()_从PDF文件中提取文本。</p><ol start="4"><li>使用iText</li></ol><p><strong>iText是一个用于在Java中生成和使用PDF文件的开源库</strong>。它提供了一个简单的API，用于从PDF文件中读取文本。</p><p>首先，让我们在_pom.xml_中包括iText依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``com.itextpdf``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``itextpdf``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``${itextpdf.version}``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看使用iText PDF库从PDF文件中提取文本的简单示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\npublic void givenSamplePdf_whenUsingiTextPdf_thenCompareOutput() throws IOException {\n    String expectedText = &quot;Hello World!&quot;;\n    PdfReader reader = new PdfReader(&quot;sample.pdf&quot;);\n    int pages = reader.getNumberOfPages();\n    StringBuilder text = new StringBuilder();\n    for (int i = 1; i &lt;= pages; i++) {\n        text.append(PdfTextExtractor.getTextFromPage(reader, i));\n    }\n    reader.close();\n\n    assertEquals(expectedText, text.toString());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，我们创建了一个新的_PdfReader_实例来打开PDF文件。然后，我们调用_getNumberOfPages()_方法来获取PDF文件的页数。最后，我们循环遍历页面，并在_PdfTextExtractor_上调用_getTextFromPage()_来提取页面的内容。</p><ol start="5"><li>结论</li></ol><p>在本文中，我们学习了在Java中读取PDF文件的两种不同方式。我们使用了iText和Apache PDFBox库从示例PDF文件中提取文本。这两个库都提供了简单有效的API来从PDF文档中提取文本。</p><p>像往常一样，示例的完整源代码可以在GitHub上找到。</p><p><a href="kimi://action?name=cheer-on-kimi">给Kimi加油</a></p>',26),d=[l];function r(s,o){return i(),t("div",null,d)}const v=e(n,[["render",r],["__file","2024-07-09-Reading PDF File Using Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Reading%20PDF%20File%20Using%20Java.html","title":"Java中读取PDF文件的教程","lang":"zh-CN","frontmatter":{"date":"2024-07-10T00:00:00.000Z","category":["Java","教程"],"tag":["PDF","Apache PDFBox","iText"],"head":[["meta",{"name":"keywords","content":"Java, PDF, Apache PDFBox, iText, 文档处理"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Reading%20PDF%20File%20Using%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中读取PDF文件的教程"}],["meta",{"property":"og:description","content":"Java中读取PDF文件的教程 概述 便携式文档格式（PDF）是一种用于文档的常见文件格式。它用于分发需要保留原始格式的电子文档。 在本教程中，我们将探索Java中读取PDF文件的两个最流行的库：Apache PDFBox和iText。 配置 我们将使用Maven来管理依赖。 此外，我们将向项目根目录添加一个示例PDF文件。该文件包含一个简单的短语“H..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T21:38:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"PDF"}],["meta",{"property":"article:tag","content":"Apache PDFBox"}],["meta",{"property":"article:tag","content":"iText"}],["meta",{"property":"article:published_time","content":"2024-07-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T21:38:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中读取PDF文件的教程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-10T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T21:38:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中读取PDF文件的教程 概述 便携式文档格式（PDF）是一种用于文档的常见文件格式。它用于分发需要保留原始格式的电子文档。 在本教程中，我们将探索Java中读取PDF文件的两个最流行的库：Apache PDFBox和iText。 配置 我们将使用Maven来管理依赖。 此外，我们将向项目根目录添加一个示例PDF文件。该文件包含一个简单的短语“H..."},"headers":[],"git":{"createdTime":1720561103000,"updatedTime":1720561103000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.25,"words":675},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Reading PDF File Using Java.md","localizedDate":"2024年7月10日","excerpt":"\\n<ol>\\n<li>概述</li>\\n</ol>\\n<p>便携式文档格式（PDF）是一种用于文档的常见文件格式。它用于分发需要保留原始格式的电子文档。</p>\\n<p>在本教程中，我们将探索Java中读取PDF文件的两个最流行的库：Apache PDFBox和iText。</p>\\n<ol start=\\"2\\">\\n<li>配置</li>\\n</ol>\\n<p>我们将使用Maven来管理依赖。</p>\\n<p>此外，我们将向项目根目录添加一个示例PDF文件。该文件包含一个简单的短语“Hello World!”。</p>\\n<p>接下来，我们将读取示例PDF文件，并测试提取的文本与预期结果是否一致。</p>\\n<ol start=\\"3\\">\\n<li>使用Apache PDFBox</li>\\n</ol>","autoDesc":true}');export{v as comp,m as data};
