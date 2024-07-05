import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as l}from"./app-C4Y6naXm.js";const n={},i=l('<hr><h1 id="使用apache-poi锁定excel表头行" tabindex="-1"><a class="header-anchor" href="#使用apache-poi锁定excel表头行"><span>使用Apache POI锁定Excel表头行</span></a></h1><p>Apache POI是一个在Java社区中广受欢迎的开源库，用于处理Microsoft Office文档。它允许开发人员轻松地以编程方式操作Word文档和Excel电子表格文件。</p><p>锁定表头行是我们处理大型Excel电子表格时常见的操作。这为数据导航和分析提供了更加友好的用户体验。</p><p>在本教程中，我们将学习如何使用Apache POI来锁定Excel电子表格中的表头行。</p><h3 id="_2-依赖性" tabindex="-1"><a class="header-anchor" href="#_2-依赖性"><span>2. 依赖性</span></a></h3><p>首先，让我们向_pom.xml_文件中添加以下Maven依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``org.apache.poi``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``poi``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``5.2.5``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``org.apache.poi``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``poi-ooxml``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``5.2.5``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>poi_是处理旧版二进制Excel文件（xls）所必需的。如果我们需要处理基于XML的Excel文件（xlsx），我们还需要额外的_poi-ooxml</em>。</p><h3 id="_3-工作簿创建" tabindex="-1"><a class="header-anchor" href="#_3-工作簿创建"><span>3. 工作簿创建</span></a></h3><p>在我们深入锁定表头行之前，让我们快速了解一下如何使用Apache POI创建Excel工作表并用数据填充它。</p><p>首先，我们需要设置_Workbook_和_Sheet_实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Workbook workbook = new XSSFWorkbook();\nSheet sheet = workbook.createSheet(&quot;MySheet&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们希望创建一个二进制Excel文件而不是基于XML的文件，我们可以将_XSSFWorkbook_替换为_HSSFWorkbook_。</p><p>接下来，我们将创建表头行并添加表头单元格值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Row headerRow = sheet.createRow(0);\nCell headerCell1 = headerRow.createCell(0);\nheaderCell1.setCellValue(&quot;Header 1&quot;);\nCell headerCell2 = headerRow.createCell(1);\nheaderCell2.setCellValue(&quot;Header 2&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们设置好表头行，我们将向工作表中添加更多数据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Row dataRow = sheet.createRow(1);\nCell dataCell1 = dataRow.createCell(0);\ndataCell1.setCellValue(&quot;Data 1&quot;);\nCell dataCell2 = dataRow.createCell(1);\ndataCell2.setCellValue(&quot;Data 2&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-锁定" tabindex="-1"><a class="header-anchor" href="#_4-锁定"><span>4. 锁定</span></a></h3><p>现在，让我们进入关键部分。Apache POI提供了一个简单的方法叫做_createFreezePane()_来锁定行和列。</p><p>_createFreezePane()_方法接受两个参数：<em>colSplit_和_rowSplit</em>。_colSplit_参数表示将保持未锁定的列索引，而_rowSplit_参数表示将锁定的行索引。</p><h4 id="_4-1-锁定单行" tabindex="-1"><a class="header-anchor" href="#_4-1-锁定单行"><span>4.1. 锁定单行</span></a></h4><p>在大多数情况下，我们希望锁定第一行，以便在滚动数据时始终能看到表头行：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>sheet.createFreezePane(0, 1);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们注意到，当我们向下滚动时，第一行保持锁定并固定在顶部：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/poi-lock-1st-row-1-300x140.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/poi-lock-1st-row-2-300x138.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h4 id="_4-2-锁定多行" tabindex="-1"><a class="header-anchor" href="#_4-2-锁定多行"><span>4.2. 锁定多行</span></a></h4><p>在某些情况下，我们可能希望锁定多行，以便用户在浏览数据时获得更多上下文。为了实现这一点，我们可以相应地<strong>调整_rowSplit_参数</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>sheet.createFreezePane(0, 2);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这个例子中，前两行在滚动时保持可见。</p><h4 id="_4-3-锁定列" tabindex="-1"><a class="header-anchor" href="#_4-3-锁定列"><span>4.3. 锁定列</span></a></h4><p>除了锁定行之外，Apache POI还允许我们锁定列。这在我们有大量列并且希望保持特定列可见以供参考时非常有用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>sheet.createFreezePane(1, 0);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这种情况下，工作表中的第一列被锁定。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们看到了如何使用Apache POI，这是一个强大的Java库，用于处理Microsoft Office文档来锁定表头行。</p><p>**通过使用_createFreezePane()_方法，我们可以定制锁定行为以满足我们的特定需求。这可以是保持标题固定，锁定多行以提供上下文，或锁定列。**这增强了数据导航和分析中的用户体验。</p><p>像往常一样，本文的源代码可以在GitHub上找到。</p>',39),d=[i];function r(c,o){return a(),t("div",null,d)}const h=e(n,[["render",r],["__file","2024-07-01-Lock Header Rows With Apache POI.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Lock%20Header%20Rows%20With%20Apache%20POI.html","title":"使用Apache POI锁定Excel表头行","lang":"zh-CN","frontmatter":{"date":"2023-08-01T00:00:00.000Z","category":["Java","Apache POI"],"tag":["Excel","锁定","表头"],"head":[["meta",{"name":"keywords","content":"Apache POI, Excel, 锁定表头, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Lock%20Header%20Rows%20With%20Apache%20POI.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Apache POI锁定Excel表头行"}],["meta",{"property":"og:description","content":"使用Apache POI锁定Excel表头行 Apache POI是一个在Java社区中广受欢迎的开源库，用于处理Microsoft Office文档。它允许开发人员轻松地以编程方式操作Word文档和Excel电子表格文件。 锁定表头行是我们处理大型Excel电子表格时常见的操作。这为数据导航和分析提供了更加友好的用户体验。 在本教程中，我们将学习如何..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/08/poi-lock-1st-row-1-300x140.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T23:29:50.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Excel"}],["meta",{"property":"article:tag","content":"锁定"}],["meta",{"property":"article:tag","content":"表头"}],["meta",{"property":"article:published_time","content":"2023-08-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T23:29:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Apache POI锁定Excel表头行\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/08/poi-lock-1st-row-1-300x140.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/poi-lock-1st-row-2-300x138.jpg\\"],\\"datePublished\\":\\"2023-08-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T23:29:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Apache POI锁定Excel表头行 Apache POI是一个在Java社区中广受欢迎的开源库，用于处理Microsoft Office文档。它允许开发人员轻松地以编程方式操作Word文档和Excel电子表格文件。 锁定表头行是我们处理大型Excel电子表格时常见的操作。这为数据导航和分析提供了更加友好的用户体验。 在本教程中，我们将学习如何..."},"headers":[{"level":3,"title":"2. 依赖性","slug":"_2-依赖性","link":"#_2-依赖性","children":[]},{"level":3,"title":"3. 工作簿创建","slug":"_3-工作簿创建","link":"#_3-工作簿创建","children":[]},{"level":3,"title":"4. 锁定","slug":"_4-锁定","link":"#_4-锁定","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719876590000,"updatedTime":1719876590000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.9,"words":869},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Lock Header Rows With Apache POI.md","localizedDate":"2023年8月1日","excerpt":"<hr>\\n<h1>使用Apache POI锁定Excel表头行</h1>\\n<p>Apache POI是一个在Java社区中广受欢迎的开源库，用于处理Microsoft Office文档。它允许开发人员轻松地以编程方式操作Word文档和Excel电子表格文件。</p>\\n<p>锁定表头行是我们处理大型Excel电子表格时常见的操作。这为数据导航和分析提供了更加友好的用户体验。</p>\\n<p>在本教程中，我们将学习如何使用Apache POI来锁定Excel电子表格中的表头行。</p>\\n<h3>2. 依赖性</h3>\\n<p>首先，让我们向_pom.xml_文件中添加以下Maven依赖项：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>``&lt;dependency&gt;``\\n    ``&lt;groupId&gt;``org.apache.poi``&lt;/groupId&gt;``\\n    ``&lt;artifactId&gt;``poi``&lt;/artifactId&gt;``\\n    ``&lt;version&gt;``5.2.5``&lt;/version&gt;``\\n``&lt;/dependency&gt;``\\n``&lt;dependency&gt;``\\n    ``&lt;groupId&gt;``org.apache.poi``&lt;/groupId&gt;``\\n    ``&lt;artifactId&gt;``poi-ooxml``&lt;/artifactId&gt;``\\n    ``&lt;version&gt;``5.2.5``&lt;/version&gt;``\\n``&lt;/dependency&gt;``\\n</code></pre></div>","autoDesc":true}');export{h as comp,g as data};
