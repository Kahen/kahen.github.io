import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CNQ479je.js";const e={},p=t('<h1 id="使用apache-poi扩展列宽" tabindex="-1"><a class="header-anchor" href="#使用apache-poi扩展列宽"><span>使用Apache POI扩展列宽</span></a></h1><p>Apache POI是一个流行的Java API，用于以编程方式操作不同类型的Microsoft Office文档，如Word、Excel和PowerPoint。</p><p><strong>我们经常需要在Excel电子表格中扩展列宽。这是制作电子表格供人们阅读时的一个常见需求。</strong> 这有助于读者更好地可视化列中的内容，而这在默认列宽下是做不到的。</p><p>在本教程中，我们将学习如何使用API手动和自动调整Excel电子表格中的列宽。</p><h2 id="_2-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-依赖项"><span>2. 依赖项</span></a></h2><p>首先，我们需要在Maven的_pom.xml_中添加以下Apache POI依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.poi``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``poi``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``5.2.5``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.poi``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``poi-ooxml``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``5.2.5``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-电子表格准备" tabindex="-1"><a class="header-anchor" href="#_3-电子表格准备"><span>3. 电子表格准备</span></a></h2><p>让我们先快速回顾一下创建Excel电子表格的过程。我们将准备一个Excel电子表格并填充一些数据以供演示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Workbook</span> workbook <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XSSFWorkbook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Sheet</span> sheet <span class="token operator">=</span> workbook<span class="token punctuation">.</span><span class="token function">createSheet</span><span class="token punctuation">(</span><span class="token string">&quot;NewSheet&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Row</span> headerRow <span class="token operator">=</span> sheet<span class="token punctuation">.</span><span class="token function">createRow</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Cell</span> headerCell1 <span class="token operator">=</span> headerRow<span class="token punctuation">.</span><span class="token function">createCell</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nheaderCell1<span class="token punctuation">.</span><span class="token function">setCellValue</span><span class="token punctuation">(</span><span class="token string">&quot;Full Name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Cell</span> headerCell2 <span class="token operator">=</span> headerRow<span class="token punctuation">.</span><span class="token function">createCell</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nheaderCell2<span class="token punctuation">.</span><span class="token function">setCellValue</span><span class="token punctuation">(</span><span class="token string">&quot;Abbreviation&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Row</span> dataRow <span class="token operator">=</span> sheet<span class="token punctuation">.</span><span class="token function">createRow</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Cell</span> dataCell1 <span class="token operator">=</span> dataRow<span class="token punctuation">.</span><span class="token function">createCell</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ndataCell1<span class="token punctuation">.</span><span class="token function">setCellValue</span><span class="token punctuation">(</span><span class="token string">&quot;Java Virtual Machine&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Cell</span> dataCell2 <span class="token operator">=</span> dataRow<span class="token punctuation">.</span><span class="token function">createCell</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ndataCell2<span class="token punctuation">.</span><span class="token function">setCellValue</span><span class="token punctuation">(</span><span class="token string">&quot;JVM&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// 在此处创建更多数据行...</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，如果我们在Excel中打开生成的电子表格，我们将看到每个列都有相同的默认宽度：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/09/poi-default-columns.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>显然，由于列宽有限，第一列中的内容太长而被截断。</p><h2 id="_4-宽度调整" tabindex="-1"><a class="header-anchor" href="#_4-宽度调整"><span>4. 宽度调整</span></a></h2><p>Apache POI提供了两种不同的方法来调整列宽。我们可以根据我们自己的需求选择任何一种方法。现在让我们探索这两种方法。</p><h3 id="_4-1-固定宽度调整" tabindex="-1"><a class="header-anchor" href="#_4-1-固定宽度调整"><span>4.1. 固定宽度调整</span></a></h3><p><strong>我们可以通过在目标_Sheet_实例上调用_setColumnWidth()_来扩展特定列到固定宽度。</strong> 此方法有两个参数，分别是_columnIndex_和_width_。</p><p><strong>手动推导出显示所有内容的列宽是复杂的，因为这取决于各种因素，如字体类型和大小。</strong> 根据API文档中_setColumnWidth()_的定义，_width_参数是以1/256个字符宽度为单位。</p><p>考虑到Excel中默认的字体Calibri字体大小为11，我们可以使用单元格中的字符数 * 256作为列宽的粗略估计：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> cellValue <span class="token operator">=</span> row<span class="token punctuation">.</span><span class="token function">getCell</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getStringCellValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nsheet<span class="token punctuation">.</span><span class="token function">setColumnWidth</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> cellValue<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>调整后，我们将看到第一列中的全部内容：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/09/poi-fixed-width-column.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>自己推导出列宽有点麻烦。特别是当我们处理包含大量数据行的电子表格时。我们必须逐行检查以确定最大字符计数。包含不同字体和大小的列的存在进一步增加了宽度计算的复杂性。</p><h3 id="_4-2-自动宽度调整" tabindex="-1"><a class="header-anchor" href="#_4-2-自动宽度调整"><span>4.2. 自动宽度调整</span></a></h3><p>幸运的是，<strong>Apache POI提供了一个方便的方法，<em>autoSizeColumn()</em>，来自动调整列宽。</strong> 这确保了列的内容可以完全被读者看到。</p><p>_autoSizeColumn()_只需要一个参数，即零基列索引。我们可以使用以下代码自动调整第一列的列宽：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>sheet<span class="token punctuation">.</span><span class="token function">autoSizeColumn</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们对每个列都应用_autoSizeColumn()_，我们会看到以下情况。现在所有列的内容都完全可见，没有任何截断：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/09/poi-auto-size-columns.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了Apache POI中调整Excel电子表格列宽的两种不同方法：固定宽度调整和自动宽度调整。调整列宽对于提高可读性和创建用户友好的Excel电子表格至关重要。</p><p>像往常一样，文章的源代码可以在GitHub上找到。</p>',32),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-30-Expand Columns with Apache POI.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Expand%20Columns%20with%20Apache%20POI.html","title":"使用Apache POI扩展列宽","lang":"zh-CN","frontmatter":{"date":"2023-09-01T00:00:00.000Z","category":["Java","Apache POI"],"tag":["Excel","Spreadsheet"],"head":[["meta",{"name":"keywords","content":"Apache POI, Excel, 列宽调整, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Expand%20Columns%20with%20Apache%20POI.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Apache POI扩展列宽"}],["meta",{"property":"og:description","content":"使用Apache POI扩展列宽 Apache POI是一个流行的Java API，用于以编程方式操作不同类型的Microsoft Office文档，如Word、Excel和PowerPoint。 我们经常需要在Excel电子表格中扩展列宽。这是制作电子表格供人们阅读时的一个常见需求。 这有助于读者更好地可视化列中的内容，而这在默认列宽下是做不到的。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/09/poi-default-columns.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T02:57:52.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Excel"}],["meta",{"property":"article:tag","content":"Spreadsheet"}],["meta",{"property":"article:published_time","content":"2023-09-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T02:57:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Apache POI扩展列宽\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/09/poi-default-columns.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2023/09/poi-fixed-width-column.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2023/09/poi-auto-size-columns.jpg\\"],\\"datePublished\\":\\"2023-09-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T02:57:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Apache POI扩展列宽 Apache POI是一个流行的Java API，用于以编程方式操作不同类型的Microsoft Office文档，如Word、Excel和PowerPoint。 我们经常需要在Excel电子表格中扩展列宽。这是制作电子表格供人们阅读时的一个常见需求。 这有助于读者更好地可视化列中的内容，而这在默认列宽下是做不到的。 ..."},"headers":[{"level":2,"title":"2. 依赖项","slug":"_2-依赖项","link":"#_2-依赖项","children":[]},{"level":2,"title":"3. 电子表格准备","slug":"_3-电子表格准备","link":"#_3-电子表格准备","children":[]},{"level":2,"title":"4. 宽度调整","slug":"_4-宽度调整","link":"#_4-宽度调整","children":[{"level":3,"title":"4.1. 固定宽度调整","slug":"_4-1-固定宽度调整","link":"#_4-1-固定宽度调整","children":[]},{"level":3,"title":"4.2. 自动宽度调整","slug":"_4-2-自动宽度调整","link":"#_4-2-自动宽度调整","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719716272000,"updatedTime":1719716272000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.07,"words":922},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Expand Columns with Apache POI.md","localizedDate":"2023年9月1日","excerpt":"\\n<p>Apache POI是一个流行的Java API，用于以编程方式操作不同类型的Microsoft Office文档，如Word、Excel和PowerPoint。</p>\\n<p><strong>我们经常需要在Excel电子表格中扩展列宽。这是制作电子表格供人们阅读时的一个常见需求。</strong> 这有助于读者更好地可视化列中的内容，而这在默认列宽下是做不到的。</p>\\n<p>在本教程中，我们将学习如何使用API手动和自动调整Excel电子表格中的列宽。</p>\\n<h2>2. 依赖项</h2>\\n<p>首先，我们需要在Maven的_pom.xml_中添加以下Apache POI依赖项：</p>","autoDesc":true}');export{d as comp,k as data};
