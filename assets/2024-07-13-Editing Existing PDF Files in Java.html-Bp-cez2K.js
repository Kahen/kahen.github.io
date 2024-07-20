import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DfO5Xg_k.js";const e={},p=t('<h1 id="java中编辑现有pdf文件" tabindex="-1"><a class="header-anchor" href="#java中编辑现有pdf文件"><span>Java中编辑现有PDF文件</span></a></h1><p>在这篇文章中，我们将看到如何在Java中编辑现有PDF文件的内容。首先，我们将只添加新内容。然后，我们将专注于移除或替换一些现有的内容。</p><h2 id="_2-添加itext7依赖" tabindex="-1"><a class="header-anchor" href="#_2-添加itext7依赖"><span>2. 添加iText7依赖</span></a></h2><p><strong>我们将使用iText7库来向PDF文件添加内容。</strong> 稍后，我们将使用pdfSweep插件来移除或替换内容。</p><p><strong>请注意，iText是在AGPL许可下授权的，这可能会限制商业应用程序的分发：iText许可模型。</strong></p><p>首先，让我们将这些依赖项添加到我们的_pom.xml_中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``com.itextpdf``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``itext7-core``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``7.2.3``&lt;/version&gt;``\n    `&lt;type&gt;`pom`&lt;/type&gt;`\n``&lt;/dependency&gt;``\n``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``com.itextpdf``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``cleanup``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``3.0.1``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-文件处理" tabindex="-1"><a class="header-anchor" href="#_3-文件处理"><span>3. 文件处理</span></a></h2><p>让我们了解使用iText7处理PDF的步骤：</p><ul><li>首先，我们打开一个_PdfReader_来读取源文件的内容。如果在读取文件时发生任何错误，这将抛出一个_IOException_。</li><li>然后，我们向目标文件打开一个_PdfWriter_。如果此文件不存在或无法创建，则会抛出一个_FileNotFoundException_。</li><li>之后，我们将打开一个使用我们的_PdfReader_和_PdfWriter_的_PdfDocument_。</li><li>最后，关闭_PdfDocument_将同时关闭底层的_PdfReader_和_PdfWriter_。</li></ul><p>让我们编写一个_main()<em>方法来运行我们的整个处理。为了简单起见，我们将重新抛出可能发生的任何_Exception</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n    <span class="token class-name">PdfReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PdfReader</span><span class="token punctuation">(</span><span class="token string">&quot;src/main/resources/baeldung.pdf&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">PdfWriter</span> writer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PdfWriter</span><span class="token punctuation">(</span><span class="token string">&quot;src/main/resources/baeldung-modified.pdf&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">PdfDocument</span> pdfDocument <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PdfDocument</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> writer<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">addContentToDocument</span><span class="token punctuation">(</span>pdfDocument<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    pdfDocument<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在接下来的部分中，我们将逐步完成_addContentToDocument()_方法，以便用新内容填充我们的PDF。源文档是一个只包含文本“Hello Baeldung _“_在左上角的PDF文件。目标文件将由程序创建。</p><h2 id="_4-向文件添加内容" tabindex="-1"><a class="header-anchor" href="#_4-向文件添加内容"><span>4. 向文件添加内容</span></a></h2><p>现在我们将向文件添加各种类型的内容。</p><h3 id="_4-1-添加一个表单" tabindex="-1"><a class="header-anchor" href="#_4-1-添加一个表单"><span>4.1. 添加一个表单</span></a></h3><p><strong>我们将首先向文件添加一个表单。</strong> 我们的表单将非常简单，只包含一个名为_name_的字段。</p><p>此外，我们需要告诉iText在哪里放置该字段。在这种情况下，我们将把它放在以下位置：<em>(35,400)</em>。坐标_(0,0)<em>指的是文档的左下角。最后，我们将设置字段的尺寸为_100×30</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">PdfFormField</span> personal <span class="token operator">=</span> <span class="token class-name">PdfFormField</span><span class="token punctuation">.</span><span class="token function">createEmptyField</span><span class="token punctuation">(</span>pdfDocument<span class="token punctuation">)</span><span class="token punctuation">;</span>\npersonal<span class="token punctuation">.</span><span class="token function">setFieldName</span><span class="token punctuation">(</span><span class="token string">&quot;information&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">PdfTextFormField</span> name <span class="token operator">=</span> <span class="token class-name">PdfFormField</span><span class="token punctuation">.</span><span class="token function">createText</span><span class="token punctuation">(</span>pdfDocument<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token number">35</span><span class="token punctuation">,</span> <span class="token number">400</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\npersonal<span class="token punctuation">.</span><span class="token function">addKid</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">PdfAcroForm</span><span class="token punctuation">.</span><span class="token function">getAcroForm</span><span class="token punctuation">(</span>pdfDocument<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">addField</span><span class="token punctuation">(</span>personal<span class="token punctuation">,</span> pdfDocument<span class="token punctuation">.</span><span class="token function">getFirstPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们明确指定iText将表单添加到文档的第一页。</p><h3 id="_4-2-添加一个新页面" tabindex="-1"><a class="header-anchor" href="#_4-2-添加一个新页面"><span>4.2. 添加一个新页面</span></a></h3><p>现在让我们看看如何向文档添加一个新页面。<strong>我们将使用_addNewPage()_方法。</strong></p><p>这个方法可以接受添加页面的索引，如果我们想要指定它。例如，我们可以在文档的开头添加一个新页面：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>pdfDocument<span class="token punctuation">.</span><span class="token function">addNewPage</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-3-添加注释" tabindex="-1"><a class="header-anchor" href="#_4-3-添加注释"><span>4.3. 添加注释</span></a></h3><p>现在我们想要向文档添加一个注释。<strong>具体来说，注释看起来像一个正方形的漫画气泡。</strong></p><p>我们将在现在位于文档第二页的表单上方添加它。因此，我们将把它放在坐标_(40,435)_。此外，我们将给它一个简单的名字和内容。这些只有在悬停在注释上时才会显示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">PdfAnnotation</span> ann <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PdfTextAnnotation</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">,</span> <span class="token number">435</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setTitle</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PdfString</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">setContents</span><span class="token punctuation">(</span><span class="token string">&quot;Your name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\npdfDocument<span class="token punctuation">.</span><span class="token function">getPage</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">addAnnotation</span><span class="token punctuation">(</span>ann<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是我们现在第二页中间的样子：</p><h3 id="_4-4-添加图像" tabindex="-1"><a class="header-anchor" href="#_4-4-添加图像"><span>4.4. 添加图像</span></a></h3><p>从现在开始，我们将向页面添加布局元素。为了做到这一点，我们将无法再直接操作_PdfDocument_。我们将创建一个从中的_Document_并使用它。此外，我们将在最后关闭_Document_。<strong>关闭_Document_会自动关闭基础_PdfDocument._</strong> 所以我们可以去掉我们之前关闭_PdfDocument_的部分：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Document</span> document <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span>pdfDocument<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// add layout elements</span>\ndocument<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>现在，要添加图像，我们需要从其位置加载它。</strong> 我们将使用_ImageDataFactory_类的_create()<em>方法来实现。如果传递的文件URL无法解析，这将抛出一个_MalformedURLException</em>。在这个例子中，我们将使用位于资源目录中的Baeldung的标志图像：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ImageData</span> imageData <span class="token operator">=</span> <span class="token class-name">ImageDataFactory</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string">&quot;src/main/resources/baeldung.png&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下一步将是在文件中设置图像的属性。我们将将其大小设置为_550×100_。我们将把它放在我们PDF的第一页，在_(10,50)_坐标上。让我们看看添加图像的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Image</span> image <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span>imageData<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">scaleAbsolute</span><span class="token punctuation">(</span><span class="token number">550</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">setFixedPosition</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ndocument<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>image<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>图像自动调整为给定的大小。所以它在文档中看起来是这样的：</p><h3 id="_4-5-添加段落" tabindex="-1"><a class="header-anchor" href="#_4-5-添加段落"><span>4.5. 添加段落</span></a></h3><p><strong>iText库带来了一些工具来向文件添加文本。</strong> 字体可以在段落本身上参数化，也可以直接在_Paragraph_元素上。</p><p>例如，让我们在第一页的顶部添加以下句子：<em>这是来自Baeldung教程的演示。</em> 我们将这句话的开始字体大小设置为_16_，并将_Paragraph_的全局字体大小设置为_8_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Text</span> title <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string">&quot;这是一次演示&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setFontSize</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Text</span> author <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung教程。&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Paragraph</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Paragraph</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setFontSize</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>title<span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;来自&quot;</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>author<span class="token punctuation">)</span><span class="token punctuation">;</span>\ndocument<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-6-添加表格" tabindex="-1"><a class="header-anchor" href="#_4-6-添加表格"><span>4.6. 添加表格</span></a></h3><p><strong>最后但同样重要的是，我们也可以向文件添加一个表格。</strong> 例如，我们将定义一个双列表格，上面有两行和两个标题。我们不会指定任何位置。所以它将自然地添加在文档的顶部，就在我们刚刚添加的_Paragraph_之后：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Table</span> table <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Table</span><span class="token punctuation">(</span><span class="token class-name">UnitValue</span><span class="token punctuation">.</span><span class="token function">createPercentArray</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ntable<span class="token punctuation">.</span><span class="token function">addHeaderCell</span><span class="token punctuation">(</span><span class="token string">&quot;#&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ntable<span class="token punctuation">.</span><span class="token function">addHeaderCell</span><span class="token punctuation">(</span><span class="token string">&quot;公司&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ntable<span class="token punctuation">.</span><span class="token function">addCell</span><span class="token punctuation">(</span><span class="token string">&quot;名字&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ntable<span class="token punctuation">.</span><span class="token function">addCell</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ndocument<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>table<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看现在文档第一页的开头：</p><h2 id="_5-从文件中移除内容" tabindex="-1"><a class="header-anchor" href="#_5-从文件中移除内容"><span>5. 从文件中移除内容</span></a></h2><p>现在让我们看看如何从PDF文件中移除内容。为了保持简单，我们将编写另一个_main()_方法。</p><p>我们的源PDF文件将是_baeldung-modified.pdf_文件，目标将是一个新的_baeldung-cleaned.pdf_文件。我们将直接在_PdfDocument_对象上工作。从现在开始，我们将使用iText的pdfSweep插件。</p><h3 id="_5-1-从文件中移除文本" tabindex="-1"><a class="header-anchor" href="#_5-1-从文件中移除文本"><span>5.1. 从文件中移除文本</span></a></h3><p><strong>为了从文件中移除给定的文本，我们需要定义一个清理策略。</strong> 在这个例子中，策略将简单地找到所有匹配_Baeldung_的文本。最后一步是调用_PdfCleaner_的_autoSweepCleanUp()<em>静态方法。这个方法将创建一个自定义_PdfCleanUpTool</em>，如果在文件处理过程中发生任何错误，将抛出一个_IOException_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompositeCleanupStrategy</span> strategy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CompositeCleanupStrategy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nstrategy<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RegexBasedCleanupStrategy</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">PdfCleaner</span><span class="token punctuation">.</span><span class="token function">autoSweepCleanUp</span><span class="token punctuation">(</span>pdfDocument<span class="token punctuation">,</span> strategy<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，源文件中_Baeldung_一词的出现被黑色矩形覆盖在结果文件中。这种行为适合于数据匿名化：</p><h3 id="_5-2-从文件中移除其他内容" tabindex="-1"><a class="header-anchor" href="#_5-2-从文件中移除其他内容"><span>5.2. 从文件中移除其他内容</span></a></h3><p>不幸的是，检测文件中的任何非文本内容是非常困难的。<strong>然而，pdfSweep提供了擦除文件一部分内容的可能性。</strong> 因此，如果我们知道我们想要移除的内容位于哪里，我们将能够利用这种可能性。</p><p>例如，我们将擦除位于第二页_(35,400)<em>的尺寸为_100×35_的矩形内的内容。这意味着我们将摆脱所有表单和注释的内容。此外，我们将擦除第一页</em>(10,50)_的尺寸为_90×70_的矩形。这基本上移除了Baeldung的标志中的&quot;B&quot;。使用_PdfCleanUpTool_类，以下是执行所有操作的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">PdfCleanUpLocation</span><span class="token punctuation">&gt;</span></span>` cleanUpLocations <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>\n    <span class="token keyword">new</span> <span class="token class-name">PdfCleanUpLocation</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token number">70</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token keyword">new</span> <span class="token class-name">PdfCleanUpLocation</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token number">35</span><span class="token punctuation">,</span> <span class="token number">400</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">35</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">PdfCleanUpTool</span> cleaner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PdfCleanUpTool</span><span class="token punctuation">(</span>pdfDocument<span class="token punctuation">,</span> cleanUpLocations<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">CleanUpProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ncleaner<span class="token punctuation">.</span><span class="token function">cleanUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以在_baeldung-cleaned.pdf_中看到以下图像：</p><h2 id="_6-在文件中替换内容" tabindex="-1"><a class="header-anchor" href="#_6-在文件中替换内容"><span>6. 在文件中替换内容</span></a></h2><p>在这一部分，我们将做与之前相同的工作，只是<strong>我们将用新文本替换旧文本，而不仅仅是擦除它</strong>。</p><p>为了更清晰，我们将再次使用一个新的_main()_方法。我们的源文件将是_baeldung-modified.pdf_文件。我们的目标文件将是一个新的_baeldung-fixed.pdf_文件。</p><p>早些时候我们看到移除的文本被黑色背景覆盖。然而，这种颜色是可配置的。由于我们知道文件中文本的背景是白色的，我们将强制覆盖为白色。处理的开始将与我们之前做的类似，只是我们将搜索文本_Baeldung tutorials_。</p><p><strong>然而，在调用_autoSweepCleanUp()_之后，我们将查询策略以获取移除代码的位置。</strong> 然后我们将实例化一个_PdfCanvas_，其中包含替换文本_HIDDEN_。此外，我们将去除上边距，以便它与原始文本更好地对齐。默认的对齐确实不太好。让我们看看结果代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompositeCleanupStrategy</span> strategy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CompositeCleanupStrategy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nstrategy<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RegexBasedCleanupStrategy</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setRedactionColor</span><span class="token punctuation">(</span><span class="token class-name">ColorConstants</span><span class="token punctuation">.</span><span class="token constant">WHITE</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">PdfCleaner</span><span class="token punctuation">.</span><span class="token function">autoSweepCleanUp</span><span class="token punctuation">(</span>pdfDocument<span class="token punctuation">,</span> strategy<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">IPdfTextLocation</span> location <span class="token operator">:</span> strategy<span class="token punctuation">.</span><span class="token function">getResultantLocations</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">PdfPage</span> page <span class="token operator">=</span> pdfDocument<span class="token punctuation">.</span><span class="token function">getPage</span><span class="token punctuation">(</span>location<span class="token punctuation">.</span><span class="token function">getPageNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">PdfCanvas</span> pdfCanvas <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PdfCanvas</span><span class="token punctuation">(</span>page<span class="token punctuation">.</span><span class="token function">newContentStreamAfter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> page<span class="token punctuation">.</span><span class="token function">getResources</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> page<span class="token punctuation">.</span><span class="token function">getDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Canvas</span> canvas <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Canvas</span><span class="token punctuation">(</span>pdfCanvas<span class="token punctuation">,</span> location<span class="token punctuation">.</span><span class="token function">getRectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    canvas<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Paragraph</span><span class="token punctuation">(</span><span class="token string">&quot;HIDDEN&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setFontSize</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">setMarginTop</span><span class="token punctuation">(</span><span class="token number">0f</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以查看文件：</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本教程中，我们看到了如何编辑PDF文件的内容。我们看到我们可以添加新内容，移除现有内容，甚至可以用新文本替换原始文件中的文本。</p><p>一如既往，本文的代码可以在GitHub上找到。</p>',67),o=[p];function c(l,i){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","2024-07-13-Editing Existing PDF Files in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Editing%20Existing%20PDF%20Files%20in%20Java.html","title":"Java中编辑现有PDF文件","lang":"zh-CN","frontmatter":{"date":"2022-10-01T00:00:00.000Z","category":["Java","PDF"],"tag":["iText7","PDF编辑"],"head":[["meta",{"name":"keywords","content":"Java, PDF编辑, iText7, 编辑现有PDF文件"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Editing%20Existing%20PDF%20Files%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中编辑现有PDF文件"}],["meta",{"property":"og:description","content":"Java中编辑现有PDF文件 在这篇文章中，我们将看到如何在Java中编辑现有PDF文件的内容。首先，我们将只添加新内容。然后，我们将专注于移除或替换一些现有的内容。 2. 添加iText7依赖 我们将使用iText7库来向PDF文件添加内容。 稍后，我们将使用pdfSweep插件来移除或替换内容。 请注意，iText是在AGPL许可下授权的，这可能会..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T17:05:32.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"iText7"}],["meta",{"property":"article:tag","content":"PDF编辑"}],["meta",{"property":"article:published_time","content":"2022-10-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T17:05:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中编辑现有PDF文件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-10-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T17:05:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中编辑现有PDF文件 在这篇文章中，我们将看到如何在Java中编辑现有PDF文件的内容。首先，我们将只添加新内容。然后，我们将专注于移除或替换一些现有的内容。 2. 添加iText7依赖 我们将使用iText7库来向PDF文件添加内容。 稍后，我们将使用pdfSweep插件来移除或替换内容。 请注意，iText是在AGPL许可下授权的，这可能会..."},"headers":[{"level":2,"title":"2. 添加iText7依赖","slug":"_2-添加itext7依赖","link":"#_2-添加itext7依赖","children":[]},{"level":2,"title":"3. 文件处理","slug":"_3-文件处理","link":"#_3-文件处理","children":[]},{"level":2,"title":"4. 向文件添加内容","slug":"_4-向文件添加内容","link":"#_4-向文件添加内容","children":[{"level":3,"title":"4.1. 添加一个表单","slug":"_4-1-添加一个表单","link":"#_4-1-添加一个表单","children":[]},{"level":3,"title":"4.2. 添加一个新页面","slug":"_4-2-添加一个新页面","link":"#_4-2-添加一个新页面","children":[]},{"level":3,"title":"4.3. 添加注释","slug":"_4-3-添加注释","link":"#_4-3-添加注释","children":[]},{"level":3,"title":"4.4. 添加图像","slug":"_4-4-添加图像","link":"#_4-4-添加图像","children":[]},{"level":3,"title":"4.5. 添加段落","slug":"_4-5-添加段落","link":"#_4-5-添加段落","children":[]},{"level":3,"title":"4.6. 添加表格","slug":"_4-6-添加表格","link":"#_4-6-添加表格","children":[]}]},{"level":2,"title":"5. 从文件中移除内容","slug":"_5-从文件中移除内容","link":"#_5-从文件中移除内容","children":[{"level":3,"title":"5.1. 从文件中移除文本","slug":"_5-1-从文件中移除文本","link":"#_5-1-从文件中移除文本","children":[]},{"level":3,"title":"5.2. 从文件中移除其他内容","slug":"_5-2-从文件中移除其他内容","link":"#_5-2-从文件中移除其他内容","children":[]}]},{"level":2,"title":"6. 在文件中替换内容","slug":"_6-在文件中替换内容","link":"#_6-在文件中替换内容","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720890332000,"updatedTime":1720890332000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.75,"words":2324},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Editing Existing PDF Files in Java.md","localizedDate":"2022年10月1日","excerpt":"\\n<p>在这篇文章中，我们将看到如何在Java中编辑现有PDF文件的内容。首先，我们将只添加新内容。然后，我们将专注于移除或替换一些现有的内容。</p>\\n<h2>2. 添加iText7依赖</h2>\\n<p><strong>我们将使用iText7库来向PDF文件添加内容。</strong> 稍后，我们将使用pdfSweep插件来移除或替换内容。</p>\\n<p><strong>请注意，iText是在AGPL许可下授权的，这可能会限制商业应用程序的分发：iText许可模型。</strong></p>\\n<p>首先，让我们将这些依赖项添加到我们的_pom.xml_中：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>``&lt;dependency&gt;``\\n    ``&lt;groupId&gt;``com.itextpdf``&lt;/groupId&gt;``\\n    ``&lt;artifactId&gt;``itext7-core``&lt;/artifactId&gt;``\\n    ``&lt;version&gt;``7.2.3``&lt;/version&gt;``\\n    `&lt;type&gt;`pom`&lt;/type&gt;`\\n``&lt;/dependency&gt;``\\n``&lt;dependency&gt;``\\n    ``&lt;groupId&gt;``com.itextpdf``&lt;/groupId&gt;``\\n    ``&lt;artifactId&gt;``cleanup``&lt;/artifactId&gt;``\\n    ``&lt;version&gt;``3.0.1``&lt;/version&gt;``\\n``&lt;/dependency&gt;``\\n</code></pre></div>","autoDesc":true}');export{r as comp,k as data};
