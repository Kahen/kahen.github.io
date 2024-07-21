import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CXN34Kw1.js";const p={},e=t('<h1 id="java中excel转json的转换方法" tabindex="-1"><a class="header-anchor" href="#java中excel转json的转换方法"><span>Java中Excel转JSON的转换方法</span></a></h1><p>将Excel数据转换为JSON格式在许多Java应用程序中很常见，特别是在处理不同系统之间的数据交换时。</p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将探讨在Java中将Excel文件转换为JSON的两种方法。</p><h2 id="_2-使用apache-poi库与json" tabindex="-1"><a class="header-anchor" href="#_2-使用apache-poi库与json"><span>2. 使用Apache POI库与JSON</span></a></h2><p>Apache POI是一个流行的Java库，用于读写Microsoft Office文件格式，包括Excel。因此，我们可以使用POI来读取Excel文件并将数据转换为JSON格式。</p><h3 id="_2-1-添加apache-poi和json依赖" tabindex="-1"><a class="header-anchor" href="#_2-1-添加apache-poi和json依赖"><span>2.1. 添加Apache POI和JSON依赖</span></a></h3><p>首先，我们需要将Apache POI和JSON依赖添加到我们的项目中。如果我们使用Maven，请在_pom.xml_中包含以下依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.apache.poi```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```poi```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```5.2.5```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.json```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```json```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```20230227```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-读取excel数据并转换为json" tabindex="-1"><a class="header-anchor" href="#_2-2-读取excel数据并转换为json"><span>2.2. 读取Excel数据并转换为JSON</span></a></h3><p>以下是使用Apache POI读取Excel文件并将数据转换为JSON的示例Java代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">JSONArray</span> jsonArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">public</span> <span class="token class-name">String</span> expectedJson <span class="token operator">=</span> <span class="token string">&quot;[[&quot;</span><span class="token constant">C1</span><span class="token string">&quot;,&quot;</span><span class="token constant">C2</span><span class="token string">&quot;,&quot;</span><span class="token constant">C3</span><span class="token string">&quot;,&quot;</span><span class="token constant">C4</span><span class="token string">&quot;,&quot;</span><span class="token constant">C5</span><span class="token string">&quot;],&quot;</span> <span class="token operator">+</span>\n  <span class="token string">&quot;[&quot;</span><span class="token number">1.0</span><span class="token string">&quot;,&quot;</span><span class="token number">2.0</span><span class="token string">&quot;,&quot;</span><span class="token number">3.0</span><span class="token string">&quot;,&quot;</span><span class="token number">4.0</span><span class="token string">&quot;,&quot;</span><span class="token number">5.0</span><span class="token string">&quot;],&quot;</span> <span class="token operator">+</span>\n  <span class="token string">&quot;[&quot;</span><span class="token number">1.0</span><span class="token string">&quot;,&quot;</span><span class="token number">2.0</span><span class="token string">&quot;,&quot;</span><span class="token number">3.0</span><span class="token string">&quot;,&quot;</span><span class="token number">4.0</span><span class="token string">&quot;,&quot;</span><span class="token number">5.0</span><span class="token string">&quot;],&quot;</span> <span class="token operator">+</span>\n  <span class="token string">&quot;[&quot;</span><span class="token number">1.0</span><span class="token string">&quot;,&quot;</span><span class="token number">2.0</span><span class="token string">&quot;,&quot;</span><span class="token number">3.0</span><span class="token string">&quot;,&quot;</span><span class="token number">4.0</span><span class="token string">&quot;,&quot;</span><span class="token number">5.0</span><span class="token string">&quot;],&quot;</span> <span class="token operator">+</span>\n  <span class="token string">&quot;[&quot;</span><span class="token number">1.0</span><span class="token string">&quot;,&quot;</span><span class="token number">2.0</span><span class="token string">&quot;,&quot;</span><span class="token number">3.0</span><span class="token string">&quot;,&quot;</span><span class="token number">4.0</span><span class="token string">&quot;,&quot;</span><span class="token number">5.0</span><span class="token string">&quot;]]&quot;</span><span class="token punctuation">;</span>\n<span class="token keyword">private</span> <span class="token class-name">Workbook</span> workbook<span class="token punctuation">;</span>\n<span class="token keyword">private</span> <span class="token class-name">Sheet</span> sheet<span class="token punctuation">;</span>\n<span class="token keyword">private</span> <span class="token class-name">InputStream</span> inputStream<span class="token punctuation">;</span>\n\n<span class="token keyword">public</span> <span class="token class-name">ExcelToJsonUnitTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n    inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>filePath<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    workbook <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XSSFWorkbook</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    sheet <span class="token operator">=</span> workbook<span class="token punctuation">.</span><span class="token function">getSheetAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将Excel转换为JSON首先需要初始化一个_InputStream_，它以_filePath_为参数来读取Excel文件。</p><p>然后，我们将这个文件加载到一个_Workbook_对象中，明确使用_.xlsx_文件的_XSSFWorkbook_实现。有了_workbook_变量后，可以通过_getSheetAt(0)_方法访问所需的工作表，假设它是第一个工作表。</p><p>现在，让我们通过使用Apache POI功能遍历工作表中的每行和每个单元格来处理Excel数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Row</span> headerRow <span class="token operator">=</span> sheet<span class="token punctuation">.</span><span class="token function">getRow</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` headers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Cell</span> cell <span class="token operator">:</span> headerRow<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    headers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>cell<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\njsonArray<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>headers<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最初，我们使用_sheet.getRow(0)<em>检索Excel工作表的_headerRow</em>，并使用_headerRow.cellIterator()<em>方法遍历标题行中的每个_cell</em>。对于每个_cell_，我们使用_cell.toString()_方法提取其内容作为字符串并存储在_jsonArray_列表中。此过程确保我们准确捕获所有标题值。</p><p>随后，我们将使用for循环遍历Excel工作表的每一行（不包括标题行）：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> sheet<span class="token punctuation">.</span><span class="token function">getLastRowNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Row</span> row <span class="token operator">=</span> sheet<span class="token punctuation">.</span><span class="token function">getRow</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` rowData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Cell</span> cell <span class="token operator">:</span> row<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        rowData<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>cell<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    jsonArray<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>rowData<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_sheet.getRow(i)<em>检索每一行。此外，我们遍历当前_row_中的每个_cell</em>，并将内容添加到_rowData_。这个列表代表Excel文件中的行，然后使用_jsonArray.put()<em>添加到_JSONArray</em>。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedJson<span class="token punctuation">,</span> jsonArray<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，我们使用assertEquals()断言它与预期的JSON字符串相等。</p><h2 id="_3-使用apache-poi库与jackson" tabindex="-1"><a class="header-anchor" href="#_3-使用apache-poi库与jackson"><span>3. 使用Apache POI库与Jackson</span></a></h2><p>Jackson是一个流行的Java JSON处理库。它为将Java对象转换为JSON以及反之提供了强大的数据绑定特性。</p><h3 id="_3-1-添加jackson依赖" tabindex="-1"><a class="header-anchor" href="#_3-1-添加jackson依赖"><span>3.1. 添加Jackson依赖</span></a></h3><p>我们首先通过在_pom.xml_中添加以下依赖来开始：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```com.fasterxml.jackson.core```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```jackson-databind```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```2.17.0```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-读取excel数据并转换为json" tabindex="-1"><a class="header-anchor" href="#_3-2-读取excel数据并转换为json"><span>3.2. 读取Excel数据并转换为JSON</span></a></h3><p>这里的转换过程有所不同，因为它侧重于将Excel数据结构化为Java对象，然后序列化为JSON。Jackson的_ObjectMapper_类在这里至关重要，因为它可以轻松地将Java对象转换为JSON字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenExcelFile_whenUsingJacksonConversion_thenConvertToJson</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span><span class="token operator">&lt;</span><span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``<span class="token operator">&gt;</span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Row</span> headerRow <span class="token operator">=</span> sheet<span class="token punctuation">.</span><span class="token function">getRow</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` headers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Cell</span> cell <span class="token operator">:</span> headerRow<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        headers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>cell<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    data<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>headers<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> sheet<span class="token punctuation">.</span><span class="token function">getLastRowNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Row</span> row <span class="token operator">=</span> sheet<span class="token punctuation">.</span><span class="token function">getRow</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` rowData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Cell</span> cell <span class="token operator">:</span> row<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            rowData<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>cell<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        data<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>rowData<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> json <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedJson<span class="token punctuation">,</span> json<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们初始化一个名为_data_的空数据列表，以结构化的方式保存Excel数据。然后，它遍历Excel工作表的每一行，将_cell_值转换为字符串并存储在_data_列表中。收集完所有数据后，我们使用Jackson的_ObjectMapper_将结构化列表转换为JSON字符串，使用_writeValueAsString()_方法。</p><p>Jackson的优势在于其强大的数据绑定能力，非常适合处理复杂的对象结构，并提供高度的抽象。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们讨论了在Java中将Excel文件转换为JSON格式的两种方法：使用Apache POI读取和处理Excel数据，然后使用_JSON_和Jackson库将其转换为JSON。</p><p>这两个库都提供了方便的方式来读取Excel文件并操作它们的数据，使我们能够无缝地将Excel数据转换为JSON对象，以便在我们的Java应用程序中进一步处理。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>',37),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-20-How to Convert Excel to JSON in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-How%20to%20Convert%20Excel%20to%20JSON%20in%20Java.html","title":"Java中Excel转JSON的转换方法","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java","Excel"],"tag":["JSON","Apache POI","Jackson"],"head":[["meta",{"name":"keywords","content":"Java, Excel, JSON, Apache POI, Jackson"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-How%20to%20Convert%20Excel%20to%20JSON%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中Excel转JSON的转换方法"}],["meta",{"property":"og:description","content":"Java中Excel转JSON的转换方法 将Excel数据转换为JSON格式在许多Java应用程序中很常见，特别是在处理不同系统之间的数据交换时。 1. 引言 在本教程中，我们将探讨在Java中将Excel文件转换为JSON的两种方法。 2. 使用Apache POI库与JSON Apache POI是一个流行的Java库，用于读写Microsoft ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JSON"}],["meta",{"property":"article:tag","content":"Apache POI"}],["meta",{"property":"article:tag","content":"Jackson"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中Excel转JSON的转换方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中Excel转JSON的转换方法 将Excel数据转换为JSON格式在许多Java应用程序中很常见，特别是在处理不同系统之间的数据交换时。 1. 引言 在本教程中，我们将探讨在Java中将Excel文件转换为JSON的两种方法。 2. 使用Apache POI库与JSON Apache POI是一个流行的Java库，用于读写Microsoft ..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用Apache POI库与JSON","slug":"_2-使用apache-poi库与json","link":"#_2-使用apache-poi库与json","children":[{"level":3,"title":"2.1. 添加Apache POI和JSON依赖","slug":"_2-1-添加apache-poi和json依赖","link":"#_2-1-添加apache-poi和json依赖","children":[]},{"level":3,"title":"2.2. 读取Excel数据并转换为JSON","slug":"_2-2-读取excel数据并转换为json","link":"#_2-2-读取excel数据并转换为json","children":[]}]},{"level":2,"title":"3. 使用Apache POI库与Jackson","slug":"_3-使用apache-poi库与jackson","link":"#_3-使用apache-poi库与jackson","children":[{"level":3,"title":"3.1. 添加Jackson依赖","slug":"_3-1-添加jackson依赖","link":"#_3-1-添加jackson依赖","children":[]},{"level":3,"title":"3.2. 读取Excel数据并转换为JSON","slug":"_3-2-读取excel数据并转换为json","link":"#_3-2-读取excel数据并转换为json","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.91,"words":1173},"filePathRelative":"posts/baeldung/Archive/2024-06-20-How to Convert Excel to JSON in Java.md","localizedDate":"2024年6月21日","excerpt":"\\n<p>将Excel数据转换为JSON格式在许多Java应用程序中很常见，特别是在处理不同系统之间的数据交换时。</p>\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将探讨在Java中将Excel文件转换为JSON的两种方法。</p>\\n<h2>2. 使用Apache POI库与JSON</h2>\\n<p>Apache POI是一个流行的Java库，用于读写Microsoft Office文件格式，包括Excel。因此，我们可以使用POI来读取Excel文件并将数据转换为JSON格式。</p>\\n<h3>2.1. 添加Apache POI和JSON依赖</h3>\\n<p>首先，我们需要将Apache POI和JSON依赖添加到我们的项目中。如果我们使用Maven，请在_pom.xml_中包含以下依赖：</p>","autoDesc":true}');export{r as comp,d as data};
