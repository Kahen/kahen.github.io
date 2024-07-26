import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C4eFoh0f.js";const p={},e=t(`<hr><h1 id="java中从excel读取数据值" tabindex="-1"><a class="header-anchor" href="#java中从excel读取数据值"><span>Java中从Excel读取数据值</span></a></h1><p>当涉及到Microsoft Excel文件时，从不同单元格读取值可能有点棘手。Excel文件是按行和单元格组织的电子表格，可以包含字符串、数值、日期、布尔值，甚至是公式类型的值。Apache POI是一个提供一整套工具来处理不同Excel文件和值类型的库。</p><p>在本教程中，我们将专注于学习如何处理Excel文件，遍历行和单元格，并使用正确的方法读取每种单元格值类型。</p><h3 id="_2-maven依赖项" tabindex="-1"><a class="header-anchor" href="#_2-maven依赖项"><span>2. Maven依赖项</span></a></h3><p>让我们从向pom.xml添加Apache POI依赖项开始：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.apache.poi\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`poi-ooxml\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`5.2.5\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以在Maven Central找到poi-ooxml的最新版本。</p><h3 id="_3-apache-poi概述" tabindex="-1"><a class="header-anchor" href="#_3-apache-poi概述"><span>3. Apache POI概述</span></a></h3><p>层次结构从工作簿开始，它代表整个Excel文件。每个文件可以包含一个或多个工作表，这些工作表是行和单元格的集合。根据Excel文件的版本，HSSF是表示旧版Excel文件(.xls)的类的前缀，而XSSF用于最新版本(.xlsx)。因此我们有：</p><ul><li>XSSFWorkbook和HSSFWorkbook类代表Excel工作簿</li><li>Sheet接口代表Excel工作表</li><li>Row接口代表行</li><li>Cell接口代表单元格</li></ul><h3 id="_3-1-处理excel文件" tabindex="-1"><a class="header-anchor" href="#_3-1-处理excel文件"><span>3.1. 处理Excel文件</span></a></h3><p>首先，我们打开要读取的文件，将其转换为FileInputStream以进行进一步处理。FileInputStream构造函数会抛出java.io.FileNotFoundException，因此我们需要将其包装在try-catch块中，并在最后关闭流：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">readExcel</span><span class="token punctuation">(</span><span class="token class-name">String</span> filePath<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>filePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">FileInputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        inputStream<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-遍历excel文件" tabindex="-1"><a class="header-anchor" href="#_3-2-遍历excel文件"><span>3.2. 遍历Excel文件</span></a></h3><p>成功打开InputStream后，是时候创建XSSFWorkbook并遍历每个工作表的行和单元格了。如果我们知道确切的工作表数量或特定工作表的名称，我们可以使用XSSFWorkbook的getSheetAt(int index)和getSheet(String sheetName)方法。</p><p>由于我们想要读取任何类型的Excel文件，我们将使用三个嵌套的for循环遍历所有工作表，一个用于工作表，一个用于每个工作表的行，最后一个用于每个工作表的单元格。</p><p>为了本教程的目的，我们只会将数据打印到控制台：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">FileInputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Workbook</span> baeuldungWorkBook <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XSSFWorkbook</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Sheet</span> sheet <span class="token operator">:</span> baeuldungWorkBook<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，为了遍历工作表的行，我们需要找到第一行和最后一行的索引，我们从工作表对象中获取它们：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> firstRow <span class="token operator">=</span> sheet<span class="token punctuation">.</span><span class="token function">getFirstRowNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> lastRow <span class="token operator">=</span> sheet<span class="token punctuation">.</span><span class="token function">getLastRowNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> index <span class="token operator">=</span> firstRow <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> index <span class="token operator">&lt;=</span> lastRow<span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Row</span> row <span class="token operator">=</span> sheet<span class="token punctuation">.</span><span class="token function">getRow</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们对单元格做同样的操作。同时，在访问每个单元格时，我们可以可选地传递一个MissingCellPolicy，它基本上告诉POI当单元格值为空或null时返回什么。MissingCellPolicy枚举包含三个枚举值：</p><ul><li>RETURN_NULL_AND_BLANK</li><li>RETURN_BLANK_AS_NULL</li><li>CREATE_NULL_AS_BLANK;</li></ul><p>单元格迭代的代码如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> cellIndex <span class="token operator">=</span> row<span class="token punctuation">.</span><span class="token function">getFirstCellNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> cellIndex <span class="token operator">&lt;</span> row<span class="token punctuation">.</span><span class="token function">getLastCellNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> cellIndex<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Cell</span> cell <span class="token operator">=</span> row<span class="token punctuation">.</span><span class="token function">getCell</span><span class="token punctuation">(</span>cellIndex<span class="token punctuation">,</span> <span class="token class-name">Row<span class="token punctuation">.</span>MissingCellPolicy</span><span class="token punctuation">.</span><span class="token constant">CREATE_NULL_AS_BLANK</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-读取excel中的单元格值" tabindex="-1"><a class="header-anchor" href="#_3-3-读取excel中的单元格值"><span>3.3. 读取Excel中的单元格值</span></a></h3><p>正如我们之前提到的，Microsoft Excel的单元格可以包含不同类型的值，因此能够区分一个单元格值类型与另一个并使用适当的方法提取值非常重要。下面有一个所有值类型的列表：</p><ul><li>NONE</li><li>NUMERIC</li><li>STRING</li><li>FORMULA</li><li>BLANK</li><li>BOOLEAN</li><li>ERROR</li></ul><p>我们将专注于四种主要的单元格值类型：Numeric, String, Boolean和Formula，最后一个包含一个计算值，属于前三种类型之一。</p><p>让我们创建一个辅助方法，它基本上会检查每种值类型，并基于此使用适当的方法访问值。也可以将单元格值视为字符串，并使用相应的方法检索它。</p><p>有两件重要的事情值得注意。首先，日期值存储为数值，而且如果单元格的值类型是FORMULA，我们需要使用getCachedFormulaResultType()而不是getCellType()方法来检查公式的计算结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printCellValue</span><span class="token punctuation">(</span><span class="token class-name">Cell</span> cell<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">CellType</span> cellType <span class="token operator">=</span> cell<span class="token punctuation">.</span><span class="token function">getCellType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">CellType</span><span class="token punctuation">.</span><span class="token constant">FORMULA</span><span class="token punctuation">)</span>
      <span class="token operator">?</span> cell<span class="token punctuation">.</span><span class="token function">getCachedFormulaResultType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> cell<span class="token punctuation">.</span><span class="token function">getCellType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cellType<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">CellType</span><span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>cell<span class="token punctuation">.</span><span class="token function">getStringCellValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; | &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cellType<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">CellType</span><span class="token punctuation">.</span><span class="token constant">NUMERIC</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">DateUtil</span><span class="token punctuation">.</span><span class="token function">isCellDateFormatted</span><span class="token punctuation">(</span>cell<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>cell<span class="token punctuation">.</span><span class="token function">getDateCellValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; | &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>cell<span class="token punctuation">.</span><span class="token function">getNumericCellValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; | &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cellType<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">CellType</span><span class="token punctuation">.</span><span class="token constant">BOOLEAN</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>cell<span class="token punctuation">.</span><span class="token function">getBooleanCellValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; | &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们所要做的就是在单元格循环内调用printCellValue方法，我们就完成了。下面是完整代码的片段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> cellIndex <span class="token operator">=</span> row<span class="token punctuation">.</span><span class="token function">getFirstCellNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> cellIndex <span class="token operator">&lt;</span> row<span class="token punctuation">.</span><span class="token function">getLastCellNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> cellIndex<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Cell</span> cell <span class="token operator">=</span> row<span class="token punctuation">.</span><span class="token function">getCell</span><span class="token punctuation">(</span>cellIndex<span class="token punctuation">,</span> <span class="token class-name">Row<span class="token punctuation">.</span>MissingCellPolicy</span><span class="token punctuation">.</span><span class="token constant">CREATE_NULL_AS_BLANK</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printCellValue</span><span class="token punctuation">(</span>cell<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们展示了一个示例项目，使用Apache POI读取Excel文件并访问不同的单元格值。</p><p>完整的源代码可以在GitHub上找到。</p>`,37),c=[e];function o(l,i){return s(),a("div",null,c)}const r=n(p,[["render",o],["__file","2024-07-23-Reading Values From Excel in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-23/2024-07-23-Reading%20Values%20From%20Excel%20in%20Java.html","title":"Java中从Excel读取数据值","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Apache POI"],"tag":["Excel","Java","教程"],"head":[["meta",{"name":"keywords","content":"Java, Apache POI, Excel, 教程, 阅读Excel日期"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-23/2024-07-23-Reading%20Values%20From%20Excel%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中从Excel读取数据值"}],["meta",{"property":"og:description","content":"Java中从Excel读取数据值 当涉及到Microsoft Excel文件时，从不同单元格读取值可能有点棘手。Excel文件是按行和单元格组织的电子表格，可以包含字符串、数值、日期、布尔值，甚至是公式类型的值。Apache POI是一个提供一整套工具来处理不同Excel文件和值类型的库。 在本教程中，我们将专注于学习如何处理Excel文件，遍历行和单..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T14:47:45.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Excel"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"教程"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T14:47:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中从Excel读取数据值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-23T14:47:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中从Excel读取数据值 当涉及到Microsoft Excel文件时，从不同单元格读取值可能有点棘手。Excel文件是按行和单元格组织的电子表格，可以包含字符串、数值、日期、布尔值，甚至是公式类型的值。Apache POI是一个提供一整套工具来处理不同Excel文件和值类型的库。 在本教程中，我们将专注于学习如何处理Excel文件，遍历行和单..."},"headers":[{"level":3,"title":"2. Maven依赖项","slug":"_2-maven依赖项","link":"#_2-maven依赖项","children":[]},{"level":3,"title":"3. Apache POI概述","slug":"_3-apache-poi概述","link":"#_3-apache-poi概述","children":[]},{"level":3,"title":"3.1. 处理Excel文件","slug":"_3-1-处理excel文件","link":"#_3-1-处理excel文件","children":[]},{"level":3,"title":"3.2. 遍历Excel文件","slug":"_3-2-遍历excel文件","link":"#_3-2-遍历excel文件","children":[]},{"level":3,"title":"3.3. 读取Excel中的单元格值","slug":"_3-3-读取excel中的单元格值","link":"#_3-3-读取excel中的单元格值","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721746065000,"updatedTime":1721746065000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.84,"words":1153},"filePathRelative":"posts/baeldung/2024-07-23/2024-07-23-Reading Values From Excel in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中从Excel读取数据值</h1>\\n<p>当涉及到Microsoft Excel文件时，从不同单元格读取值可能有点棘手。Excel文件是按行和单元格组织的电子表格，可以包含字符串、数值、日期、布尔值，甚至是公式类型的值。Apache POI是一个提供一整套工具来处理不同Excel文件和值类型的库。</p>\\n<p>在本教程中，我们将专注于学习如何处理Excel文件，遍历行和单元格，并使用正确的方法读取每种单元格值类型。</p>\\n<h3>2. Maven依赖项</h3>\\n<p>让我们从向pom.xml添加Apache POI依赖项开始：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`org.apache.poi`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`poi-ooxml`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`5.2.5`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
