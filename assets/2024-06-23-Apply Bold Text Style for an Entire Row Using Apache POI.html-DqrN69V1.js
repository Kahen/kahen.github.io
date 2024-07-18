import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CE5go3V-.js";const p={},e=t(`<h1 id="使用apache-poi为整个行应用粗体文本样式" tabindex="-1"><a class="header-anchor" href="#使用apache-poi为整个行应用粗体文本样式"><span>使用Apache POI为整个行应用粗体文本样式</span></a></h1><p>在这个快速教程中，我们将探索使用Apache POI库在Excel工作表中为整行应用粗体字体样式的有效方法。通过简单的例子和有价值的见解，我们将了解每种方法的细微差别。</p><h2 id="_2-依赖性" tabindex="-1"><a class="header-anchor" href="#_2-依赖性"><span>2. 依赖性</span></a></h2><p>让我们从编写和加载Excel文件所需的依赖性开始，poi：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.apache.poi\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`poi\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`5.2.5\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-场景和辅助方法" tabindex="-1"><a class="header-anchor" href="#_3-场景和辅助方法"><span>3. 场景和辅助方法</span></a></h2><p>我们的场景涉及创建一个带有标题行和一些数据行的工作表。然后，我们将为标题行中使用的字体定义一个粗体样式。最重要的是，我们将创建一些方法来设置这种粗体样式。我们将看到为什么我们需要多个方法来做到这一点，因为显而易见的选择（<em>setRowStyle()</em>）并没有按预期工作。</p><p><strong>为了便于工作表的创建，我们将从一个工具类开始。</strong> 让我们编写几个方法来创建带有单元格的单元格和行：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PoiUtils</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">newCell</span><span class="token punctuation">(</span><span class="token class-name">Row</span> row<span class="token punctuation">,</span> <span class="token class-name">String</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">short</span> cellNum <span class="token operator">=</span> row<span class="token punctuation">.</span><span class="token function">getLastCellNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cellNum <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
            cellNum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token class-name">Cell</span> cell <span class="token operator">=</span> row<span class="token punctuation">.</span><span class="token function">createCell</span><span class="token punctuation">(</span>cellNum<span class="token punctuation">)</span><span class="token punctuation">;</span>
        cell<span class="token punctuation">.</span><span class="token function">setCellValue</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Row</span> <span class="token function">newRow</span><span class="token punctuation">(</span><span class="token class-name">Sheet</span> sheet<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> rowValues<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Row</span> row <span class="token operator">=</span> sheet<span class="token punctuation">.</span><span class="token function">createRow</span><span class="token punctuation">(</span>sheet<span class="token punctuation">.</span><span class="token function">getLastRowNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> value <span class="token operator">:</span> rowValues<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">newCell</span><span class="token punctuation">(</span>row<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> row<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>然后，要创建粗体字体样式，我们首先将从我们的_Workbook_创建一个字体，然后调用_setBold(true)_。</strong> 其次，我们将创建一个将使用我们的粗体字体的_CellStyle_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">CellStyle</span> <span class="token function">boldFontStyle</span><span class="token punctuation">(</span><span class="token class-name">Workbook</span> workbook<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Font</span> boldFont <span class="token operator">=</span> workbook<span class="token punctuation">.</span><span class="token function">createFont</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    boldFont<span class="token punctuation">.</span><span class="token function">setBold</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">CellStyle</span> boldStyle <span class="token operator">=</span> workbook<span class="token punctuation">.</span><span class="token function">createCellStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    boldStyle<span class="token punctuation">.</span><span class="token function">setFont</span><span class="token punctuation">(</span>boldFont<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> boldStyle<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，要将我们的工作表写入文件，我们需要在我们的_Workbook_上调用_write()_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token class-name">Workbook</span> workbook<span class="token punctuation">,</span> <span class="token class-name">Path</span> path<span class="token punctuation">)</span>
  <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">FileOutputStream</span> fileOut <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">toFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        workbook<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>fileOut<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用-setrowstyle-的注意事项" tabindex="-1"><a class="header-anchor" href="#_4-使用-setrowstyle-的注意事项"><span>4. 使用_setRowStyle()_的注意事项</span></a></h2><p>在查看POI API时，我们任务的最明显选择是_Row.setRowStyle()_。<strong>不幸的是，这种方法并不可靠，并且目前有一个漏洞是开放的。</strong> <strong>问题似乎是Microsoft Office渲染器忽略了行样式，只关心单元格样式。</strong></p><p><strong>另一方面，它在OpenOffice中有效，但只有在我们使用_SXSSFWorkbook_实现时，这是为大文件设计的。</strong> 为了测试这一点，我们将从一个示例工作表方法开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">writeSampleSheet</span><span class="token punctuation">(</span><span class="token class-name">Path</span> destination<span class="token punctuation">,</span> <span class="token class-name">Workbook</span> workbook<span class="token punctuation">)</span>
  <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Sheet</span> sheet <span class="token operator">=</span> workbook<span class="token punctuation">.</span><span class="token function">createSheet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">CellStyle</span> boldStyle <span class="token operator">=</span> <span class="token class-name">PoiUtils</span><span class="token punctuation">.</span><span class="token function">boldFontStyle</span><span class="token punctuation">(</span>workbook<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Row</span> header <span class="token operator">=</span> <span class="token class-name">PoiUtils</span><span class="token punctuation">.</span><span class="token function">newRow</span><span class="token punctuation">(</span>sheet<span class="token punctuation">,</span> <span class="token string">&quot;Name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Value&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Details&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    header<span class="token punctuation">.</span><span class="token function">setRowStyle</span><span class="token punctuation">(</span>boldStyle<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">PoiUtils</span><span class="token punctuation">.</span><span class="token function">newRow</span><span class="token punctuation">(</span>sheet<span class="token punctuation">,</span> <span class="token string">&quot;Albert&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;First&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">PoiUtils</span><span class="token punctuation">.</span><span class="token function">newRow</span><span class="token punctuation">(</span>sheet<span class="token punctuation">,</span> <span class="token string">&quot;Jane&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Second&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">PoiUtils</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>workbook<span class="token punctuation">,</span> destination<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，使用断言方法来检查第一行和第二行上的样式。<strong>首先，我们断言第一_Row_具有粗体字体样式。然后，对于其中的每个单元格，我们断言默认样式与我们为第一_Row_设置的样式不同。这断言我们的行样式具有优先权。</strong> 最后，我们断言第二_Row_没有应用任何样式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">assertRowStyleAppliedAndDefaultCellStylesDontMatch</span><span class="token punctuation">(</span><span class="token class-name">Path</span> sheetFile<span class="token punctuation">)</span>
  <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">InvalidFormatException</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Workbook</span> workbook <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XSSFWorkbook</span><span class="token punctuation">(</span>sheetFile<span class="token punctuation">.</span><span class="token function">toFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Sheet</span> sheet <span class="token operator">=</span> workbook<span class="token punctuation">.</span><span class="token function">getSheetAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Row</span> row0 <span class="token operator">=</span> sheet<span class="token punctuation">.</span><span class="token function">getRow</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">XSSFCellStyle</span> rowStyle <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">XSSFCellStyle</span><span class="token punctuation">)</span> row0<span class="token punctuation">.</span><span class="token function">getRowStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertTrue</span><span class="token punctuation">(</span>rowStyle<span class="token punctuation">.</span><span class="token function">getFont</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBold</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        row0<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>cell <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token class-name">XSSFCellStyle</span> style <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">XSSFCellStyle</span><span class="token punctuation">)</span> cell<span class="token punctuation">.</span><span class="token function">getCellStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">assertNotEquals</span><span class="token punctuation">(</span>rowStyle<span class="token punctuation">,</span> style<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Row</span> row1 <span class="token operator">=</span> sheet<span class="token punctuation">.</span><span class="token function">getRow</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">XSSFCellStyle</span> row1Style <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">XSSFCellStyle</span><span class="token punctuation">)</span> row1<span class="token punctuation">.</span><span class="token function">getRowStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertNull</span><span class="token punctuation">(</span>row1Style<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>sheetFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终，我们的测试包括将工作表写入临时文件，然后再次读取它。我们确保应用了我们的风格，测试了第一行和第二行上的风格，然后删除了文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenXssfWorkbook_whenSetRowStyle1stRow_thenOnly1stRowStyled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">InvalidFormatException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Path</span> sheetFile <span class="token operator">=</span> <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">createTempFile</span><span class="token punctuation">(</span><span class="token string">&quot;xssf-row-style&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.xlsx&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Workbook</span> workbook <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XSSFWorkbook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">writeSampleSheet</span><span class="token punctuation">(</span>sheetFile<span class="token punctuation">,</span> workbook<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">assertRowStyleAppliedAndDefaultCellStylesDontMatch</span><span class="token punctuation">(</span>sheetFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>现在运行此测试时，我们可以检查我们只对第一行应用了粗体样式，这正是我们打算做的。</strong></p><h2 id="_5-在行中使用-setcellstyle-单元格" tabindex="-1"><a class="header-anchor" href="#_5-在行中使用-setcellstyle-单元格"><span>5. 在行中使用_setCellStyle()_单元格</span></a></h2><p>鉴于_setRowStyle()<em>的问题，我们只剩下_setCellStyle()</em>。我们需要它来为我们要应用粗体样式的行中的每个单元格设置样式。所以，<strong>让我们通过遍历标题中的每个单元格并使用我们的粗体样式调用_setCellStyle()_来修改我们的原始代码</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenXssfWorkbook_whenSetCellStyleForEachRow_thenAllCellsContainStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">InvalidFormatException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Path</span> sheetFile <span class="token operator">=</span> <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">createTempFile</span><span class="token punctuation">(</span><span class="token string">&quot;xssf-cell-style&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.xlsx&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Workbook</span> workbook <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XSSFWorkbook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Sheet</span> sheet <span class="token operator">=</span> workbook<span class="token punctuation">.</span><span class="token function">createSheet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">CellStyle</span> boldStyle <span class="token operator">=</span> <span class="token class-name">PoiUtils</span><span class="token punctuation">.</span><span class="token function">boldFontStyle</span><span class="token punctuation">(</span>workbook<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Row</span> header <span class="token operator">=</span> <span class="token class-name">PoiUtils</span><span class="token punctuation">.</span><span class="token function">newRow</span><span class="token punctuation">(</span>sheet<span class="token punctuation">,</span> <span class="token string">&quot;Name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Value&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Details&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        header<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>cell <span class="token operator">-&gt;</span> cell<span class="token punctuation">.</span><span class="token function">setCellStyle</span><span class="token punctuation">(</span>boldStyle<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">PoiUtils</span><span class="token punctuation">.</span><span class="token function">newRow</span><span class="token punctuation">(</span>sheet<span class="token punctuation">,</span> <span class="token string">&quot;Albert&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;First&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">PoiUtils</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>workbook<span class="token punctuation">,</span> sheetFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这样，我们可以保证我们的风格在格式和平台上一致地应用。</strong> 让我们通过断言行样式没有设置，并且第一行的每个单元格都包含粗体字体样式来完成我们的测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Workbook</span> workbook <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XSSFWorkbook</span><span class="token punctuation">(</span>sheetFile<span class="token punctuation">.</span><span class="token function">toFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Sheet</span> sheet <span class="token operator">=</span> workbook<span class="token punctuation">.</span><span class="token function">getSheetAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Row</span> row0 <span class="token operator">=</span> sheet<span class="token punctuation">.</span><span class="token function">getRow</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">XSSFCellStyle</span> rowStyle <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">XSSFCellStyle</span><span class="token punctuation">)</span> row0<span class="token punctuation">.</span><span class="token function">getRowStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNull</span><span class="token punctuation">(</span>rowStyle<span class="token punctuation">)</span><span class="token punctuation">;</span>

    row0<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>cell <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token class-name">XSSFCellStyle</span> style <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">XSSFCellStyle</span><span class="token punctuation">)</span> cell<span class="token punctuation">.</span><span class="token function">getCellStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertTrue</span><span class="token punctuation">(</span>style<span class="token punctuation">.</span><span class="token function">getFont</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBold</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Row</span> row1 <span class="token operator">=</span> sheet<span class="token punctuation">.</span><span class="token function">getRow</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    rowStyle <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">XSSFCellStyle</span><span class="token punctuation">)</span> row1<span class="token punctuation">.</span><span class="token function">getRowStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNull</span><span class="token punctuation">(</span>rowStyle<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>sheetFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，我们这里只使用_XSSFWorkbook_是为了方便。这种方法在所有_Workbook_实现中都一致有效。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇文章中，我们了解到虽然_setRowStyle()_可能不可靠地实现我们的目标，但我们发现了一个使用_setCellStyle()_的稳健替代方案。现在我们可以自信地格式化Excel工作表中的行，确保在各种平台上获得一致且视觉上有影响力的结果。</p><p>如常，源代码可在GitHub上找到。</p>`,31),o=[e];function c(l,i){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-23-Apply Bold Text Style for an Entire Row Using Apache POI.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Apply%20Bold%20Text%20Style%20for%20an%20Entire%20Row%20Using%20Apache%20POI.html","title":"使用Apache POI为整个行应用粗体文本样式","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Apache POI","Excel"],"tag":["教程","Java"],"head":[["meta",{"name":"keywords","content":"Apache POI, Excel, Java, 教程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Apply%20Bold%20Text%20Style%20for%20an%20Entire%20Row%20Using%20Apache%20POI.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Apache POI为整个行应用粗体文本样式"}],["meta",{"property":"og:description","content":"使用Apache POI为整个行应用粗体文本样式 在这个快速教程中，我们将探索使用Apache POI库在Excel工作表中为整行应用粗体字体样式的有效方法。通过简单的例子和有价值的见解，我们将了解每种方法的细微差别。 2. 依赖性 让我们从编写和加载Excel文件所需的依赖性开始，poi： 3. 场景和辅助方法 我们的场景涉及创建一个带有标题行和一些..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T19:25:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"教程"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T19:25:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Apache POI为整个行应用粗体文本样式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T19:25:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Apache POI为整个行应用粗体文本样式 在这个快速教程中，我们将探索使用Apache POI库在Excel工作表中为整行应用粗体字体样式的有效方法。通过简单的例子和有价值的见解，我们将了解每种方法的细微差别。 2. 依赖性 让我们从编写和加载Excel文件所需的依赖性开始，poi： 3. 场景和辅助方法 我们的场景涉及创建一个带有标题行和一些..."},"headers":[{"level":2,"title":"2. 依赖性","slug":"_2-依赖性","link":"#_2-依赖性","children":[]},{"level":2,"title":"3. 场景和辅助方法","slug":"_3-场景和辅助方法","link":"#_3-场景和辅助方法","children":[]},{"level":2,"title":"4. 使用_setRowStyle()_的注意事项","slug":"_4-使用-setrowstyle-的注意事项","link":"#_4-使用-setrowstyle-的注意事项","children":[]},{"level":2,"title":"5. 在行中使用_setCellStyle()_单元格","slug":"_5-在行中使用-setcellstyle-单元格","link":"#_5-在行中使用-setcellstyle-单元格","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719170722000,"updatedTime":1719170722000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.37,"words":1310},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Apply Bold Text Style for an Entire Row Using Apache POI.md","localizedDate":"2024年6月24日","excerpt":"\\n<p>在这个快速教程中，我们将探索使用Apache POI库在Excel工作表中为整行应用粗体字体样式的有效方法。通过简单的例子和有价值的见解，我们将了解每种方法的细微差别。</p>\\n<h2>2. 依赖性</h2>\\n<p>让我们从编写和加载Excel文件所需的依赖性开始，poi：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`org.apache.poi`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`poi`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`5.2.5`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
