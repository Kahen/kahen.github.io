import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as l}from"./app-CJGTm_7y.js";const i={},n=l('<h1 id="使用apache-poi在excel单元格中写入多行文本" tabindex="-1"><a class="header-anchor" href="#使用apache-poi在excel单元格中写入多行文本"><span>使用Apache POI在Excel单元格中写入多行文本</span></a></h1><ol><li>引言</li></ol><p>我们可以利用Apache POI在Microsoft Excel电子表格中以编程方式创建多行文本，但它们不会显示为多行。这是因为使用代码向单元格添加文本时，它不会自动调整单元格高度并应用所需的格式以将其转换为多行文本。</p><p>这个简短的教程将演示正确显示此类文本所需的代码。</p><ol start="2"><li>Apache POI和Maven依赖</li></ol><p>Apache POI是一个开源库，允许软件开发者创建和操作Microsoft Office文档。作为先决条件，读者可以参考我们关于使用Java操作Microsoft Excel的文章以及使用Apache POI在Excel中插入行的教程。</p><p>首先，我们需要将Apache POI依赖项添加到我们的项目_pom.xml_文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependency&gt;`\n    `&lt;groupId&gt;`org.apache.poi`&lt;/groupId&gt;`\n    `&lt;artifactId&gt;`poi`&lt;/artifactId&gt;`\n    `&lt;version&gt;`5.2.5`&lt;/version&gt;`\n`&lt;/dependency&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>添加和格式化多行文本</li></ol><p>让我们从一个包含多行文本的单元格开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>cell.setCellValue(&quot;Hello \\n world!&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们仅使用上述代码生成并保存一个Excel文件，它将看起来像下面的图片：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/10/multiline_text_before_formatting-1024x360.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们可以点击上图中1和2所指的地方，以验证文本确实是多行文本。</p><p>使用代码，格式化单元格并将其行高扩展到等于或大于两行文本的任何值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>cell.getRow()\n  .setHeightInPoints(cell.getSheet().getDefaultRowHeightInPoints() * 2);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，我们需要设置单元格样式以换行文本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CellStyle cellStyle = cell.getSheet().getWorkbook().createCellStyle();\ncellStyle.setWrapText(true);\ncell.setCellStyle(cellStyle);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用上述代码生成并查看在Microsoft Excel中的文件将显示单元格中的多行文本。</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/10/multiline_text_after_formatting-1024x449.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ol start="4"><li>总结</li></ol><p>在本教程中，我们学习了如何使用Apache POI向单元格中添加多行文本。然后我们通过对单元格应用一些格式确保它以两行文本的形式可见。否则，单元格将显示为一行。</p><p>如往常一样，文章的源代码可在GitHub上获得。</p>',23),c=[n];function o(p,r){return a(),t("div",null,c)}const g=e(i,[["render",o],["__file","2024-07-25-Multiline Text in Excel Cell Using Apache POI.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-25/2024-07-25-Multiline%20Text%20in%20Excel%20Cell%20Using%20Apache%20POI.html","title":"使用Apache POI在Excel单元格中写入多行文本","lang":"zh-CN","frontmatter":{"date":"2021-10-01T00:00:00.000Z","category":["Apache POI","Excel"],"tag":["多行文本","Java"],"head":[["meta",{"name":"keywords","content":"Apache POI, Excel, Java, 多行文本"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-25/2024-07-25-Multiline%20Text%20in%20Excel%20Cell%20Using%20Apache%20POI.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Apache POI在Excel单元格中写入多行文本"}],["meta",{"property":"og:description","content":"使用Apache POI在Excel单元格中写入多行文本 引言 我们可以利用Apache POI在Microsoft Excel电子表格中以编程方式创建多行文本，但它们不会显示为多行。这是因为使用代码向单元格添加文本时，它不会自动调整单元格高度并应用所需的格式以将其转换为多行文本。 这个简短的教程将演示正确显示此类文本所需的代码。 Apache POI..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2021/10/multiline_text_before_formatting-1024x360.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-25T00:51:03.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"多行文本"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2021-10-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-25T00:51:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Apache POI在Excel单元格中写入多行文本\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2021/10/multiline_text_before_formatting-1024x360.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/10/multiline_text_after_formatting-1024x449.png\\"],\\"datePublished\\":\\"2021-10-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-25T00:51:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Apache POI在Excel单元格中写入多行文本 引言 我们可以利用Apache POI在Microsoft Excel电子表格中以编程方式创建多行文本，但它们不会显示为多行。这是因为使用代码向单元格添加文本时，它不会自动调整单元格高度并应用所需的格式以将其转换为多行文本。 这个简短的教程将演示正确显示此类文本所需的代码。 Apache POI..."},"headers":[],"git":{"createdTime":1721868663000,"updatedTime":1721868663000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.81,"words":544},"filePathRelative":"posts/baeldung/2024-07-25/2024-07-25-Multiline Text in Excel Cell Using Apache POI.md","localizedDate":"2021年10月1日","excerpt":"\\n<ol>\\n<li>引言</li>\\n</ol>\\n<p>我们可以利用Apache POI在Microsoft Excel电子表格中以编程方式创建多行文本，但它们不会显示为多行。这是因为使用代码向单元格添加文本时，它不会自动调整单元格高度并应用所需的格式以将其转换为多行文本。</p>\\n<p>这个简短的教程将演示正确显示此类文本所需的代码。</p>\\n<ol start=\\"2\\">\\n<li>Apache POI和Maven依赖</li>\\n</ol>\\n<p>Apache POI是一个开源库，允许软件开发者创建和操作Microsoft Office文档。作为先决条件，读者可以参考我们关于使用Java操作Microsoft Excel的文章以及使用Apache POI在Excel中插入行的教程。</p>","autoDesc":true}');export{g as comp,m as data};
