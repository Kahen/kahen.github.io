import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-on0L14Tx.js";const p={},e=t(`<h1 id="在java中获取pdf文件信息" tabindex="-1"><a class="header-anchor" href="#在java中获取pdf文件信息"><span>在Java中获取PDF文件信息</span></a></h1><p>在这个教程中，我们将了解使用Java中的iText和PDFBox库获取PDF文件信息的不同方式。</p><h3 id="_2-使用itext库" tabindex="-1"><a class="header-anchor" href="#_2-使用itext库"><span>2. 使用iText库</span></a></h3><p>iText是一个用于创建和操作PDF文档的库。同时，它还提供了一个简单的方式来获取有关文档的信息。</p><h4 id="_2-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_2-1-maven依赖"><span>2.1. Maven依赖</span></a></h4><p>首先，让我们在_pom.xml_中声明_itextpdf_依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`com.itextpdf\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`itextpdf\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`5.5.13.3\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-获取页数" tabindex="-1"><a class="header-anchor" href="#_2-2-获取页数"><span>2.2. 获取页数</span></a></h4><p>让我们创建一个_PdfInfoIText_类，其中包含一个_getNumberOfPages()_方法，该方法返回PDF文档的页数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PdfInfoIText</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getNumberOfPages</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> pdfFile<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">PdfReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PdfReader</span><span class="token punctuation">(</span>pdfFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> pages <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">getNumberOfPages</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        reader<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> pages<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的示例中，首先，我们使用_PdfReader_类从_File_对象加载PDF。之后，我们使用_getNumberOfPages()_方法。最后，我们关闭_PdfReader_对象。让我们为它声明一个测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenPdf_whenGetNumberOfPages_thenOK</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token class-name">PdfInfoIText</span><span class="token punctuation">.</span><span class="token function">getNumberOfPages</span><span class="token punctuation">(</span><span class="token constant">PDF_FILE</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的测试用例中，我们验证了存储在测试_resources_文件夹中的给定PDF文件的页数。</p><h4 id="_2-3-获取pdf元数据" tabindex="-1"><a class="header-anchor" href="#_2-3-获取pdf元数据"><span>2.3. 获取PDF元数据</span></a></h4><p>现在让我们来看看如何获取文档的元数据。我们将使用_getInfo()_方法。此方法可以获取文件的信息，如标题、作者、创建日期、创建者、生成者等。让我们将_getInfo()_方法添加到我们的_PdfInfoIText_类中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Map</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> pdfFile<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">PdfReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PdfReader</span><span class="token punctuation">(</span>pdfFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Map</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` info <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    reader<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> info<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们为获取文档的创建者和生成者编写一个测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenPdf_whenGetInfo_thenOK</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Map</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` info <span class="token operator">=</span> <span class="token class-name">PdfInfoIText</span><span class="token punctuation">.</span><span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token constant">PDF_FILE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;LibreOffice 4.2&quot;</span><span class="token punctuation">,</span> info<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;Producer&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Writer&quot;</span><span class="token punctuation">,</span> info<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;Creator&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-4-了解pdf密码保护" tabindex="-1"><a class="header-anchor" href="#_2-4-了解pdf密码保护"><span>2.4. 了解PDF密码保护</span></a></h4><p>我们现在想知道文档是否有密码保护。为此，让我们向_PdfInfoIText_类添加_isEncrypted()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isPasswordRequired</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> pdfFile<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">PdfReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PdfReader</span><span class="token punctuation">(</span>pdfFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">boolean</span> isEncrypted <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">isEncrypted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    reader<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> isEncrypted<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们创建一个测试用例来看看这个方法的表现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenPdf_whenIsPasswordRequired_thenOK</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">PdfInfoIText</span><span class="token punctuation">.</span><span class="token function">isPasswordRequired</span><span class="token punctuation">(</span><span class="token constant">PDF_FILE</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在接下来的部分，我们将使用PDFBox库执行相同的工作。</p><h3 id="_3-使用pdfbox库" tabindex="-1"><a class="header-anchor" href="#_3-使用pdfbox库"><span>3. 使用PDFBox库</span></a></h3><p>通过使用Apache PDFBox库，我们还可以获取PDF文件的信息。</p><h4 id="_3-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_3-1-maven依赖"><span>3.1. Maven依赖</span></a></h4><p>我们需要在项目中包含_pdfbox_ Maven依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.apache.pdfbox\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`pdfbox\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`3.0.0\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-获取页数" tabindex="-1"><a class="header-anchor" href="#_3-2-获取页数"><span>3.2. 获取页数</span></a></h4><p>PDFBox库提供了处理PDF文档的能力。<strong>要获取页数，我们只需使用_Loader_类及其_loadPDF()_方法从_File_对象加载文档。之后，我们使用_PDDocument_类的_getNumberOfPages()_方法</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PdfInfoPdfBox</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getNumberOfPages</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> pdfFile<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>pdfFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">PDDocument</span> document <span class="token operator">=</span> <span class="token class-name">Loader</span><span class="token punctuation">.</span><span class="token function">loadPDF</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> pages <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getNumberOfPages</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        document<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> pages<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们为它创建一个测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenPdf_whenGetNumberOfPages_thenOK</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token class-name">PdfInfoPdfBox</span><span class="token punctuation">.</span><span class="token function">getNumberOfPages</span><span class="token punctuation">(</span><span class="token constant">PDF_FILE</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-3-获取pdf元数据" tabindex="-1"><a class="header-anchor" href="#_3-3-获取pdf元数据"><span>3.3. 获取PDF元数据</span></a></h4><p>获取PDF元数据也很简单。<strong>我们需要使用_getDocumentInformation()_方法。此方法以_PDDocumentInformation_对象的形式返回文档元数据（例如文档的作者或创建日期）</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">PDDocumentInformation</span> <span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> pdfFile<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>pdfFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">PDDocument</span> document <span class="token operator">=</span> <span class="token class-name">Loader</span><span class="token punctuation">.</span><span class="token function">loadPDF</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">PDDocumentInformation</span> info <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getDocumentInformation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    document<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> info<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们为它编写一个测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenPdf_whenGetInfo_thenOK</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">PDDocumentInformation</span> info <span class="token operator">=</span> <span class="token class-name">PdfInfoPdfBox</span><span class="token punctuation">.</span><span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token constant">PDF_FILE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;LibreOffice 4.2&quot;</span><span class="token punctuation">,</span> info<span class="token punctuation">.</span><span class="token function">getProducer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Writer&quot;</span><span class="token punctuation">,</span> info<span class="token punctuation">.</span><span class="token function">getCreator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试用例中，我们只是验证了文档的生产者和创建者。</p><h4 id="_3-4-了解pdf密码保护" tabindex="-1"><a class="header-anchor" href="#_3-4-了解pdf密码保护"><span>3.4. 了解PDF密码保护</span></a></h4><p>我们可以使用_PDDocument_类的_isEncrypted()_方法来检查PDF是否受密码保护：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isPasswordRequired</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> pdfFile<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>pdfFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">PDDocument</span> document <span class="token operator">=</span> <span class="token class-name">Loader</span><span class="token punctuation">.</span><span class="token function">loadPDF</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">boolean</span> isEncrypted <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">isEncrypted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    document<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> isEncrypted<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们为密码保护的验证创建一个测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenPdf_whenIsPasswordRequired_thenOK</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">PdfInfoPdfBox</span><span class="token punctuation">.</span><span class="token function">isPasswordRequired</span><span class="token punctuation">(</span><span class="token constant">PDF_FILE</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在这篇文章中，我们学习了如何使用Java中的两个流行库来获取PDF文件的信息。本文中展示的代码的可用版本可在GitHub上找到。</p>`,47),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-12-Get Information About a PDF in Java.html.vue"]]),r=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Get%20Information%20About%20a%20PDF%20in%20Java.html","title":"在Java中获取PDF文件信息","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","PDF"],"tag":["iText","PDFBox"],"head":[["meta",{"name":"keywords","content":"Java, PDF, iText, PDFBox, PDF信息获取"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Get%20Information%20About%20a%20PDF%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中获取PDF文件信息"}],["meta",{"property":"og:description","content":"在Java中获取PDF文件信息 在这个教程中，我们将了解使用Java中的iText和PDFBox库获取PDF文件信息的不同方式。 2. 使用iText库 iText是一个用于创建和操作PDF文档的库。同时，它还提供了一个简单的方式来获取有关文档的信息。 2.1. Maven依赖 首先，让我们在_pom.xml_中声明_itextpdf_依赖： 2.2...."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T10:04:02.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"iText"}],["meta",{"property":"article:tag","content":"PDFBox"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T10:04:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中获取PDF文件信息\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T10:04:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中获取PDF文件信息 在这个教程中，我们将了解使用Java中的iText和PDFBox库获取PDF文件信息的不同方式。 2. 使用iText库 iText是一个用于创建和操作PDF文档的库。同时，它还提供了一个简单的方式来获取有关文档的信息。 2.1. Maven依赖 首先，让我们在_pom.xml_中声明_itextpdf_依赖： 2.2...."},"headers":[{"level":3,"title":"2. 使用iText库","slug":"_2-使用itext库","link":"#_2-使用itext库","children":[]},{"level":3,"title":"3. 使用PDFBox库","slug":"_3-使用pdfbox库","link":"#_3-使用pdfbox库","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720778642000,"updatedTime":1720778642000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.35,"words":1004},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Get Information About a PDF in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这个教程中，我们将了解使用Java中的iText和PDFBox库获取PDF文件信息的不同方式。</p>\\n<h3>2. 使用iText库</h3>\\n<p>iText是一个用于创建和操作PDF文档的库。同时，它还提供了一个简单的方式来获取有关文档的信息。</p>\\n<h4>2.1. Maven依赖</h4>\\n<p>首先，让我们在_pom.xml_中声明_itextpdf_依赖：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``com.itextpdf``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``itextpdf``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>``5.5.13.3``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n</code></pre></div>","autoDesc":true}');export{k as comp,r as data};
