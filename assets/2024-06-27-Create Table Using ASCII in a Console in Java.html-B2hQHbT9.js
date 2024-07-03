import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-B5SPsEv6.js";const e={},p=t(`<h1 id="使用ascii在java控制台中创建表格-baeldung" tabindex="-1"><a class="header-anchor" href="#使用ascii在java控制台中创建表格-baeldung"><span>使用ASCII在Java控制台中创建表格 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Java标准库提供了<code>printf()</code>和<code>format()</code>方法，用于将格式化数据输出到控制台。这两种方法使得在控制台应用程序中使用ASCII字符创建表格成为可能。此外，还有一个名为AsciiTable的第三方库，进一步简化了这项任务。</p><p>在本教程中，我们将学习如何使用Java标准API和第三方API在Java中使用ASCII字符创建表格。</p><h2 id="_2-项目设置" tabindex="-1"><a class="header-anchor" href="#_2-项目设置"><span>2. 项目设置</span></a></h2><p>为了理解如何在Java中将表格输出到控制台，让我们创建一个简单的项目，将一个人的姓名、身高、体重和体重指数（BMI）输出到控制台。</p><p>首先，让我们创建一个名为<code>BodyMassIndex</code>的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">BodyMassIndex</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">double</span> height<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">double</span> weight<span class="token punctuation">;</span>

    <span class="token comment">// 构造函数，getter和setter</span>

    <span class="token keyword">double</span> <span class="token function">calculate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">double</span> bmi <span class="token operator">=</span> weight <span class="token operator">/</span> <span class="token punctuation">(</span>height <span class="token operator">*</span> height<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> formattedBmi <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%.2f&quot;</span><span class="token punctuation">,</span> bmi<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">Double</span><span class="token punctuation">.</span><span class="token function">parseDouble</span><span class="token punctuation">(</span>formattedBmi<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个名为<code>BodyMassIndex</code>的类。它的构造函数接受<code>name</code>、<code>height</code>和<code>weight</code>作为参数。我们还定义了一个名为<code>calculate()</code>的方法来计算体重指数。</p><p>我们还将创建一个名为<code>BodyMassIndexApplication</code>的新类，它将使用<code>BodyMassIndex</code>对象使用ASCII字符构建表格。</p><p>接下来，让我们在类中创建<code>BodyMassIndex</code>对象并将它们存储在<code>ArrayList</code>中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BodyMassIndex</span><span class="token punctuation">&gt;</span></span>\` bodyMassIndices <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
bodyMassIndices<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BodyMassIndex</span><span class="token punctuation">(</span><span class="token string">&quot;Tom&quot;</span><span class="token punctuation">,</span> <span class="token number">1.8</span><span class="token punctuation">,</span> <span class="token number">80</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
bodyMassIndices<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BodyMassIndex</span><span class="token punctuation">(</span><span class="token string">&quot;Elton&quot;</span><span class="token punctuation">,</span> <span class="token number">1.9</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
bodyMassIndices<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BodyMassIndex</span><span class="token punctuation">(</span><span class="token string">&quot;Harry&quot;</span><span class="token punctuation">,</span> <span class="token number">1.9</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
bodyMassIndices<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BodyMassIndex</span><span class="token punctuation">(</span><span class="token string">&quot;Hannah&quot;</span><span class="token punctuation">,</span> <span class="token number">1.9</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在后续部分中，我们将使用<code>System.out.format()</code>和AsciiTable以表格形式将数据输出到控制台。</p><h2 id="_3-使用system-out-format-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用system-out-format-方法"><span>3. 使用<code>System.out.format()</code>方法</span></a></h2><p>Java <code>PrintStream</code>对象<code>System.out</code>提供了<code>format()</code>和<code>print()</code>等方法，用于将格式化字符串输出到控制台。这两种方法都非常适合使用ASCII字符构建表格。我们可以使用这些方法仔细放置ASCII字符以绘制线条和定位数据。</p><h3 id="_3-1-system-out-format" tabindex="-1"><a class="header-anchor" href="#_3-1-system-out-format"><span>3.1. <code>System.out.format()</code></span></a></h3><p>我们将使用格式说明符正确地放置数据列。让我们看一个示例代码，使用ASCII字符将表格输出到控制台：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;+---------+---------+---------+-------+%n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;| Name    | Height  |  Weight | BMI   |%n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;+---------+---------+---------+-------+%n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> leftAlignment <span class="token operator">=</span> <span class="token string">&quot;| %-7s | %-7.2f | %-7.2f | %-5.2f |%n&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">BodyMassIndex</span> bodyMassIndex <span class="token operator">:</span> bodyMassIndices<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>leftAlignment<span class="token punctuation">,</span> bodyMassIndex<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> bodyMassIndex<span class="token punctuation">.</span><span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> bodyMassIndex<span class="token punctuation">.</span><span class="token function">getWeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> bodyMassIndex<span class="token punctuation">.</span><span class="token function">calculate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;+---------+---------+---------+-------+%n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们为表格创建了四列的标题。首先，我们使用加号表示每列的开始和结束。接下来，我们使用连字符绘制水平线。然后，我们使用换行字符结束每行。</p><p>此外，我们使用管道符号绘制垂直线。字符<code>+</code>、<code>-</code>和<code>|</code>根据表格的结构进行排列。</p><p>最后，我们声明一个名为<code>leftAlignment</code>的字符串变量，并将其分配给格式<code>String</code>的值。格式字符串有助于将输出格式化到控制台。格式字符串包含以下元素：</p><ul><li><code>|</code> – 在输出中分隔列</li><li><code>%-7s</code> – 有助于左对齐字符串，并使用最小字段宽度为7个字符</li><li><code>%-7.2f</code> – 有助于左对齐浮点数，并使用最小字段宽度为7个字符和2个小数位</li><li><code>%-5.2f</code> – 有助于设置最小字段宽度为5个字符和2个小数位</li><li><code>%n</code> – 换行字符</li></ul><p><strong>或者，我们可以使用<code>System.out.printf()</code>代替<code>System.out.format()</code>。两种方法提供相同的结果。</strong></p><h3 id="_3-2-输出" tabindex="-1"><a class="header-anchor" href="#_3-2-输出"><span>3.2. 输出</span></a></h3><p>这是生成的表格：</p><p>控制台显示了使用ASCII字符构建的表格。表格根据我们的规格在控制台上呈现。</p><h2 id="_4-使用asciitable库" tabindex="-1"><a class="header-anchor" href="#_4-使用asciitable库"><span>4. 使用AsciiTable库</span></a></h2><p>AsciiTable是一个第三方库，可以轻松创建外观漂亮的ASCII表格。</p><h3 id="_4-1-asciitable库" tabindex="-1"><a class="header-anchor" href="#_4-1-asciitable库"><span>4.1. AsciiTable库</span></a></h3><p>要使用AsciiTable库，让我们将其依赖项添加到_pom.xml_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`de.vandermeer\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`asciitable\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`0.3.2\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们看一个示例代码，使用该库以ASCII格式创建BMI数据表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">AsciiTable</span> asciiTable <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AsciiTable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
asciiTable<span class="token punctuation">.</span><span class="token function">addRule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
asciiTable<span class="token punctuation">.</span><span class="token function">addRow</span><span class="token punctuation">(</span><span class="token string">&quot;Name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Height&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Weight&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;BMI&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
asciiTable<span class="token punctuation">.</span><span class="token function">addRule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">BodyMassIndex</span> bodyMassIndex <span class="token operator">:</span> bodyMassIndices<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    asciiTable<span class="token punctuation">.</span><span class="token function">addRow</span><span class="token punctuation">(</span>bodyMassIndex<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> bodyMassIndex<span class="token punctuation">.</span><span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> bodyMassIndex<span class="token punctuation">.</span><span class="token function">getWeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> bodyMassIndex<span class="token punctuation">.</span><span class="token function">calculate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    asciiTable<span class="token punctuation">.</span><span class="token function">addRule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
asciiTable<span class="token punctuation">.</span><span class="token function">setTextAlignment</span><span class="token punctuation">(</span><span class="token class-name">TextAlignment</span><span class="token punctuation">.</span><span class="token constant">CENTER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> render <span class="token operator">=</span> asciiTable<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>render<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们创建了一个<code>AsciiTable</code>对象。接下来，我们调用它的<code>addRule()</code>方法来添加一条水平线。然后，我们使用<code>addRow()</code>方法将数据填充到<code>AsciiTable</code>表对象中。</p><p>**此外，<code>AsciiTable</code>类提供了格式化数据的方法。我们通过调用<code>setTextAlignment()</code>方法将数据居中对齐。**该方法接受一个枚举作为参数，以指定文本对齐方式。</p><p>最后，我们调用<code>render()</code>方法，它返回<code>AsciiTable</code>对象上的一个字符串。</p><h3 id="_4-2-输出" tabindex="-1"><a class="header-anchor" href="#_4-2-输出"><span>4.2. 输出</span></a></h3><p>这是控制台上的输出：</p><p>AsciiTable库提供了一种简单的方法，用最少的代码在控制台创建外观漂亮的ASCII表格。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何使用内置的<code>System.out.format()</code>方法和AsciiTable库将表格输出到控制台。</p><p>两种方法都提供了实现任务的工作方式。<strong>然而，使用AsciiTable库需要较少的工作来正确对齐列，而<code>System.out.format()</code>方法提供了更直接的样式控制。</strong></p><p>像往常一样，示例的完整源代码可以在GitHub上找到。</p>`,43),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-27-Create Table Using ASCII in a Console in Java.html.vue"]]),r=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Create%20Table%20Using%20ASCII%20in%20a%20Console%20in%20Java.html","title":"使用ASCII在Java控制台中创建表格 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","ASCII"],"tag":["Java","ASCII","控制台","表格"],"head":[["meta",{"name":"keywords","content":"Java ASCII 控制台 表格"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Create%20Table%20Using%20ASCII%20in%20a%20Console%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用ASCII在Java控制台中创建表格 | Baeldung"}],["meta",{"property":"og:description","content":"使用ASCII在Java控制台中创建表格 | Baeldung 1. 概述 Java标准库提供了printf()和format()方法，用于将格式化数据输出到控制台。这两种方法使得在控制台应用程序中使用ASCII字符创建表格成为可能。此外，还有一个名为AsciiTable的第三方库，进一步简化了这项任务。 在本教程中，我们将学习如何使用Java标准AP..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T10:51:51.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"ASCII"}],["meta",{"property":"article:tag","content":"控制台"}],["meta",{"property":"article:tag","content":"表格"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T10:51:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用ASCII在Java控制台中创建表格 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T10:51:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用ASCII在Java控制台中创建表格 | Baeldung 1. 概述 Java标准库提供了printf()和format()方法，用于将格式化数据输出到控制台。这两种方法使得在控制台应用程序中使用ASCII字符创建表格成为可能。此外，还有一个名为AsciiTable的第三方库，进一步简化了这项任务。 在本教程中，我们将学习如何使用Java标准AP..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 项目设置","slug":"_2-项目设置","link":"#_2-项目设置","children":[]},{"level":2,"title":"3. 使用System.out.format()方法","slug":"_3-使用system-out-format-方法","link":"#_3-使用system-out-format-方法","children":[{"level":3,"title":"3.1. System.out.format()","slug":"_3-1-system-out-format","link":"#_3-1-system-out-format","children":[]},{"level":3,"title":"3.2. 输出","slug":"_3-2-输出","link":"#_3-2-输出","children":[]}]},{"level":2,"title":"4. 使用AsciiTable库","slug":"_4-使用asciitable库","link":"#_4-使用asciitable库","children":[{"level":3,"title":"4.1. AsciiTable库","slug":"_4-1-asciitable库","link":"#_4-1-asciitable库","children":[]},{"level":3,"title":"4.2. 输出","slug":"_4-2-输出","link":"#_4-2-输出","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719485511000,"updatedTime":1719485511000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.28,"words":1285},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Create Table Using ASCII in a Console in Java.md","localizedDate":"2024年6月27日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>Java标准库提供了<code>printf()</code>和<code>format()</code>方法，用于将格式化数据输出到控制台。这两种方法使得在控制台应用程序中使用ASCII字符创建表格成为可能。此外，还有一个名为AsciiTable的第三方库，进一步简化了这项任务。</p>\\n<p>在本教程中，我们将学习如何使用Java标准API和第三方API在Java中使用ASCII字符创建表格。</p>\\n<h2>2. 项目设置</h2>\\n<p>为了理解如何在Java中将表格输出到控制台，让我们创建一个简单的项目，将一个人的姓名、身高、体重和体重指数（BMI）输出到控制台。</p>","autoDesc":true}');export{k as comp,r as data};
