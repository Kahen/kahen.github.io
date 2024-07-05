import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-B_xdonR7.js";const i={},l=n(`<h1 id="在java中使用apache-poi库替换word文档模板中的变量" tabindex="-1"><a class="header-anchor" href="#在java中使用apache-poi库替换word文档模板中的变量"><span>在Java中使用Apache POI库替换Word文档模板中的变量</span></a></h1><p>在本教程中，我们将在Word文档的多个位置替换一个模式。我们将使用.doc和.docx文件格式进行操作。</p><h2 id="_2-apache-poi-库" tabindex="-1"><a class="header-anchor" href="#_2-apache-poi-库"><span>2. Apache POI 库</span></a></h2><p><strong>Apache POI 库为Java提供了操作Microsoft Office应用程序使用的多种文件格式的API</strong>，例如Excel电子表格、Word文档和PowerPoint演示文稿。它允许我们以编程方式读取、写入和修改这些文件。</p><p>为了编辑.docx文件，我们将在pom.xml中添加最新版本的poi-ooxml：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`\`&lt;dependency&gt;\`\`
    \`\`&lt;groupId&gt;\`\`org.apache.poi\`\`&lt;/groupId&gt;\`\`
    \`\`&lt;artifactId&gt;\`\`poi-ooxml\`\`&lt;/artifactId&gt;\`\`
    \`\`&lt;version&gt;\`\`5.2.5\`\`&lt;/version&gt;\`\`
\`\`&lt;/dependency&gt;\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们还需要最新版本的poi-scratchpad来处理.doc文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`\`&lt;dependency&gt;\`\`
    \`\`&lt;groupId&gt;\`\`org.apache.poi\`\`&lt;/groupId&gt;\`\`
    \`\`&lt;artifactId&gt;\`\`poi-scratchpad\`\`&lt;/artifactId&gt;\`\`
    \`\`&lt;version&gt;\`\`5.2.5\`\`&lt;/version&gt;\`\`
\`\`&lt;/dependency&gt;\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-文件处理" tabindex="-1"><a class="header-anchor" href="#_3-文件处理"><span>3. 文件处理</span></a></h2><p>我们想要创建示例文件，读取它们，在文件中替换一些文本，然后写入结果文件。让我们首先讨论所有与文件处理有关的内容。</p><h3 id="_3-1-示例文件" tabindex="-1"><a class="header-anchor" href="#_3-1-示例文件"><span>3.1. 示例文件</span></a></h3><p>让我们创建一个Word文档。<strong>我们想要将文档中的单词&quot;Baeldung&quot;替换为&quot;Hello&quot;。</strong> 因此，我们将在文件的多个位置写入&quot;Baeldung&quot;，特别是在表格、不同的文档部分和段落中。我们还想使用不同的格式化样式，包括单词内部格式变化的一个出现。我们将使用相同的文档，一次保存为.doc文件，一次保存为.docx：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/06/baeldung-original-document-300x122.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_3-2-读取输入文件" tabindex="-1"><a class="header-anchor" href="#_3-2-读取输入文件"><span>3.2. 读取输入文件</span></a></h3><p>首先，我们需要读取文件。<strong>我们将把它放在资源文件夹中，以便在类路径中可用。</strong> 这样，我们将获得一个InputStream。对于.doc文档，我们将基于此InputStream创建一个POIFSFileSystem对象。最后，我们可以检索我们将修改的HWPFDocument对象。我们将使用try-with-resources，以便InputStream和POIFSFileSystem对象自动关闭。然而，由于我们将对HWPFDocument进行修改，我们将手动关闭它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public void replaceText() throws IOException {
    String filePath = getClass().getClassLoader()
      .getResource(&quot;baeldung.doc&quot;)
      .getPath();
    try (InputStream inputStream = new FileInputStream(filePath); POIFSFileSystem fileSystem = new POIFSFileSystem(inputStream)) {
        HWPFDocument doc = new HWPFDocument(fileSystem);
        // replace text in doc and save changes
        doc.close();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当处理.docx文档时，过程稍微简单一些，因为我们可以直接从InputStream派生一个XWPFDocument对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public void replaceText() throws IOException {
    String filePath = getClass().getClassLoader()
      .getResource(&quot;baeldung.docx&quot;)
      .getPath();
    try (InputStream inputStream = new FileInputStream(filePath)) {
        XWPFDocument doc = new XWPFDocument(inputStream);
        // replace text in doc and save changes
        doc.close();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-写入输出文件" tabindex="-1"><a class="header-anchor" href="#_3-3-写入输出文件"><span>3.3. 写入输出文件</span></a></h3><p>我们将把输出文档写入同一个文件。结果，修改后的文件将位于target文件夹中。<strong>HWPFDocument和XWPFDocument类都提供了一个write()方法，将文档写入OutputStream。</strong> 例如，对于.doc文档，一切都归结为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private void saveFile(String filePath, HWPFDocument doc) throws IOException {
    try (FileOutputStream out = new FileOutputStream(filePath)) {
        doc.write(out);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-在-docx文档中替换文本" tabindex="-1"><a class="header-anchor" href="#_4-在-docx文档中替换文本"><span>4. 在.docx文档中替换文本</span></a></h2><p>让我们尝试在.docx文档中替换单词&quot;Baeldung&quot;的出现，并看看在这个过程中我们面临什么样的挑战。</p><h3 id="_4-1-简单实现" tabindex="-1"><a class="header-anchor" href="#_4-1-简单实现"><span>4.1. 简单实现</span></a></h3><p>我们已经将文档解析为XWPFDocument对象。一个XWPFDocument被划分为不同的段落。文件核心中的段落可以直接使用。然而，要访问表格内部的段落，需要循环遍历表格的所有行和单元格。稍后我们将编写replaceTextInParagraph()方法，这里是我们将如何重复应用它到所有段落的示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private XWPFDocument replaceText(XWPFDocument doc, String originalText, String updatedText) {
    replaceTextInParagraphs(doc.getParagraphs(), originalText, updatedText);
    for (XWPFTable tbl : doc.getTables()) {
        for (XWPFTableRow row : tbl.getRows()) {
            for (XWPFTableCell cell : row.getTableCells()) {
                replaceTextInParagraphs(cell.getParagraphs(), originalText, updatedText);
            }
        }
    }
    return doc;
}

private void replaceTextInParagraphs(List\`&lt;XWPFParagraph&gt;\` paragraphs, String originalText, String updatedText) {
    paragraphs.forEach(paragraph -&gt; replaceTextInParagraph(paragraph, originalText, updatedText));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Apache POI中，段落被划分为XWPFRun对象。<strong>首先，让我们尝试遍历所有的运行：如果我们在运行中检测到我们想要替换的文本，我们将更新运行的内容：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private void replaceTextInParagraph(XWPFParagraph paragraph, String originalText, String updatedText) {
    List\`&lt;XWPFRun&gt;\` runs = paragraph.getRuns();
    for (XWPFRun run : runs) {
        String text = run.getText(0);
        if (text != null &amp;&amp; text.contains(originalText)) {
            String updatedRunText = text.replace(originalText, updatedText);
            run.setText(updatedRunText, 0);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将更新replaceText()以包括所有步骤：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public void replaceText() throws IOException {
    String filePath = getClass().getClassLoader()
      .getResource(&quot;baeldung-copy.docx&quot;)
      .getPath();
    try (InputStream inputStream = new FileInputStream(filePath)) {
        XWPFDocument doc = new XWPFDocument(inputStream);
        doc = replaceText(doc, &quot;Baeldung&quot;, &quot;Hello&quot;);
        saveFile(filePath, doc);
        doc.close();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们通过单元测试运行这段代码。我们可以查看更新后的文档截图：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/06/hello-replacement-docx-naive-document-300x122.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_4-2-限制" tabindex="-1"><a class="header-anchor" href="#_4-2-限制"><span>4.2. 限制</span></a></h3><p>正如我们在截图中看到的，大多数&quot;Baeldung&quot;的出现已经被替换为&quot;Hello&quot;。然而，我们可以看到还有两个&quot;Baeldung&quot;剩余。</p><p>现在让我们更深入地了解XWPFRun是什么。<strong>每个运行表示具有一组共同格式属性的连续文本序列。</strong> 格式属性包括字体样式、大小、颜色、粗体、斜体、下划线等。每当格式变化时，就会有一个新运行。这就是为什么表格中具有各种格式的出现没有被替换的原因：它的内容分布在多个运行中。</p><p>然而，底部蓝色的&quot;Baeldung&quot;出现也没有被替换。实际上，Apache POI不保证具有相同格式属性的字符是同一个运行的一部分。简而言之，简单实现对于最简单的情况来说已经足够好了。在这种情况下使用这个解决方案是值得的，因为它不涉及任何复杂的决策。然而，如果我们面临这个限制，我们将需要转向另一个解决方案。</p><h3 id="_4-3-处理跨越多个字符运行的文本" tabindex="-1"><a class="header-anchor" href="#_4-3-处理跨越多个字符运行的文本"><span>4.3. 处理跨越多个字符运行的文本</span></a></h3><p>为了简单起见，<strong>我们假设：当我们在段落中找到单词&quot;Baeldung&quot;时，我们可以丢失该段落的格式。</strong> 因此，我们可以删除段落中的所有现有运行，并用一个新的运行替换它们。让我们重写replaceTextInParagraph()：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private void replaceTextInParagraph(XWPFParagraph paragraph, String originalText, String updatedText) {
    String paragraphText = paragraph.getParagraphText();
    if (paragraphText.contains(originalText)) {
        String updatedParagraphText = paragraphText.replace(originalText, updatedText);
        while (paragraph.getRuns().size() &gt; 0) {
            paragraph.removeRun(0);
        }
        XWPFRun newRun = paragraph.createRun();
        newRun.setText(updatedParagraphText);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看结果文件：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/06/hello-replacement-docx-full-document-300x122.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>正如预期的那样，每个出现都被替换了。然而，大部分格式都丢失了。最后一个格式没有丢失。在这种情况下，Apache POI似乎以不同的方式处理格式属性。</p><p>最后，让我们注意到，根据我们的用例，我们也可以选择保留原始段落的一些格式。然后，我们需要遍历所有的运行，并根据我们的喜好保留或更新属性。</p><h2 id="_5-在-doc文档中替换文本" tabindex="-1"><a class="header-anchor" href="#_5-在-doc文档中替换文本"><span>5. 在.doc文档中替换文本</span></a></h2><p>对于.doc文件来说，事情要简单得多。实际上，我们可以在整个文档上访问一个Range对象。<strong>然后我们可以通过它的replaceText()方法修改范围的内容：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private HWPFDocument replaceText(HWPFDocument doc, String originalText, String updatedText) {
    Range range = doc.getRange();
    range.replaceText(originalText, updatedText);
    return doc;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行此代码将导致以下更新的文件：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/06/hello-replacement-doc-document-300x122.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>正如我们所看到的，替换在整个文件中进行了。我们还可以看到，跨越多个运行的文本的默认行为是保留第一个运行的格式。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们替换了Word文档中的一个模式。在.doc文档中，这相当直接。然而，在.docx中，我们遇到了简单实现的一些限制。我们通过提出一个简化的假设来展示了克服这个限制的一个例子。</p><p>正如往常一样，代码可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/uploads/2023/06/baeldung-logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"></p><p>OK</p>`,54),d=[l];function r(s,c){return t(),a("div",null,d)}const u=e(i,[["render",r],["__file","2024-07-04-Replacing Variables in a Document Template with Java.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Replacing%20Variables%20in%20a%20Document%20Template%20with%20Java.html","title":"在Java中使用Apache POI库替换Word文档模板中的变量","lang":"zh-CN","frontmatter":{"date":"2023-06-01T00:00:00.000Z","category":["Java","Apache POI"],"tag":["Word文档","文档模板","文本替换"],"head":[["meta",{"name":"keywords","content":"Java, Apache POI, Word文档, 文档模板, 文本替换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Replacing%20Variables%20in%20a%20Document%20Template%20with%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中使用Apache POI库替换Word文档模板中的变量"}],["meta",{"property":"og:description","content":"在Java中使用Apache POI库替换Word文档模板中的变量 在本教程中，我们将在Word文档的多个位置替换一个模式。我们将使用.doc和.docx文件格式进行操作。 2. Apache POI 库 Apache POI 库为Java提供了操作Microsoft Office应用程序使用的多种文件格式的API，例如Excel电子表格、Word文档..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/06/baeldung-original-document-300x122.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T19:56:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Word文档"}],["meta",{"property":"article:tag","content":"文档模板"}],["meta",{"property":"article:tag","content":"文本替换"}],["meta",{"property":"article:published_time","content":"2023-06-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T19:56:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中使用Apache POI库替换Word文档模板中的变量\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/06/baeldung-original-document-300x122.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/06/hello-replacement-docx-naive-document-300x122.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/06/hello-replacement-docx-full-document-300x122.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/06/hello-replacement-doc-document-300x122.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/06/baeldung-logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\"],\\"datePublished\\":\\"2023-06-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T19:56:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中使用Apache POI库替换Word文档模板中的变量 在本教程中，我们将在Word文档的多个位置替换一个模式。我们将使用.doc和.docx文件格式进行操作。 2. Apache POI 库 Apache POI 库为Java提供了操作Microsoft Office应用程序使用的多种文件格式的API，例如Excel电子表格、Word文档..."},"headers":[{"level":2,"title":"2. Apache POI 库","slug":"_2-apache-poi-库","link":"#_2-apache-poi-库","children":[]},{"level":2,"title":"3. 文件处理","slug":"_3-文件处理","link":"#_3-文件处理","children":[{"level":3,"title":"3.1. 示例文件","slug":"_3-1-示例文件","link":"#_3-1-示例文件","children":[]},{"level":3,"title":"3.2. 读取输入文件","slug":"_3-2-读取输入文件","link":"#_3-2-读取输入文件","children":[]},{"level":3,"title":"3.3. 写入输出文件","slug":"_3-3-写入输出文件","link":"#_3-3-写入输出文件","children":[]}]},{"level":2,"title":"4. 在.docx文档中替换文本","slug":"_4-在-docx文档中替换文本","link":"#_4-在-docx文档中替换文本","children":[{"level":3,"title":"4.1. 简单实现","slug":"_4-1-简单实现","link":"#_4-1-简单实现","children":[]},{"level":3,"title":"4.2. 限制","slug":"_4-2-限制","link":"#_4-2-限制","children":[]},{"level":3,"title":"4.3. 处理跨越多个字符运行的文本","slug":"_4-3-处理跨越多个字符运行的文本","link":"#_4-3-处理跨越多个字符运行的文本","children":[]}]},{"level":2,"title":"5. 在.doc文档中替换文本","slug":"_5-在-doc文档中替换文本","link":"#_5-在-doc文档中替换文本","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720123019000,"updatedTime":1720123019000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.32,"words":1897},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Replacing Variables in a Document Template with Java.md","localizedDate":"2023年6月1日","excerpt":"\\n<p>在本教程中，我们将在Word文档的多个位置替换一个模式。我们将使用.doc和.docx文件格式进行操作。</p>\\n<h2>2. Apache POI 库</h2>\\n<p><strong>Apache POI 库为Java提供了操作Microsoft Office应用程序使用的多种文件格式的API</strong>，例如Excel电子表格、Word文档和PowerPoint演示文稿。它允许我们以编程方式读取、写入和修改这些文件。</p>\\n<p>为了编辑.docx文件，我们将在pom.xml中添加最新版本的poi-ooxml：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>``&lt;dependency&gt;``\\n    ``&lt;groupId&gt;``org.apache.poi``&lt;/groupId&gt;``\\n    ``&lt;artifactId&gt;``poi-ooxml``&lt;/artifactId&gt;``\\n    ``&lt;version&gt;``5.2.5``&lt;/version&gt;``\\n``&lt;/dependency&gt;``\\n</code></pre></div>","autoDesc":true}');export{u as comp,g as data};
