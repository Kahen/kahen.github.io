import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-BDZ-trJf.js";const e={},p=t(`<h1 id="intellij-idea中禁用通配符导入" tabindex="-1"><a class="header-anchor" href="#intellij-idea中禁用通配符导入"><span>IntelliJ IDEA中禁用通配符导入</span></a></h1><ol><li>概述 在Java开发中，正确的导入语句对于保持代码可读性和避免潜在冲突非常重要。</li></ol><p>IntelliJ IDEA是一个流行的Java集成开发环境（IDE）。因此，在这个快速教程中，我们将探讨如何在IntelliJ IDEA中禁用通配符导入。</p><ol start="2"><li>IntelliJ的优化导入功能 IntelliJ自带了“优化导入”功能，它可以自动重新排列导入语句，例如应用预定义样式、调整顺序、清理未使用的导入等。</li></ol><p>我们可以通过菜单项：_Code -&gt; 优化导入_来对当前Java文件应用“优化导入”：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/05/optimizeImportMenu.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>当然，我们也可以在当前Java文件中使用快捷键来优化导入。</p><ol start="3"><li>IntelliJ中的导入设置 通配符导入是一种常见的做法，它导入包中的所有类，例如<code>import java.util.*</code>。通配符导入可以节省按键次数。但是，它们可能会引入歧义，使代码更难理解。</li></ol><p>要禁用通配符导入，我们打开设置弹出窗口：<em>File -&gt; 设置</em>（或macOS上的“<em>Preferences</em>”）。</p><p>然后，在设置窗口中，<strong>我们导航到Java导入设置标签：</strong> _<strong>Editor -&gt; Code Style -&gt; Java -&gt; Imports</strong>：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/05/javaImportSettings-1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在“<em>Imports</em>”标签下，有三个设置可以影响IntelliJ在Java文件中是否使用通配符导入：</p><p>接下来，让我们更仔细地看看它们。</p><ol start="4"><li>通用开关 – “使用单个类导入” 第一个复选框，“<em>使用单个类导入</em>”，是指定我们是否要在Java源文件中启用通配符导入的通用开关。<strong>如果我们不勾选此选项，IntelliJ总是使用通配符导入</strong>。</li></ol><p>假设一个Java文件只有两个导入语句：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span><span class="token class-name">Instant</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们不勾选“<em>使用单个类导入</em>”选项，并让IntelliJ为我们“<em>优化导入</em>”。上述两个导入将变成这样：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>因此，如果我们想要在Java源文件中禁用通配符导入，我们应该勾选“<em>使用单个类导入</em>”选项。</strong></p><ol start="5"><li>“<em>使用‘*’的类计数</em>”选项 接下来，让我们看看“<em>使用‘*’的类计数</em>”配置。我们可以将此选项的值设置为所需的数字。<strong>当导入的类的数量超过给定值时，IntelliJ会自动从显式导入切换到通配符导入。</strong></li></ol><p>考虑我们Java文件中的导入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span><span class="token class-name">Instant</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Arrays</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">HashSet</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Collections</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Date</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>function<span class="token punctuation">.</span></span><span class="token class-name">Supplier</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>stream<span class="token punctuation">.</span></span><span class="token class-name">Collectors</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>stream<span class="token punctuation">.</span></span><span class="token class-name">IntStream</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设我们在IntelliJ中有以下两个设置：</p><ul><li>“<em>使用单个类导入</em>”选项 – 已勾选</li><li>“<em>使用‘*’的类计数</em>” – 5</li></ul><p>现在，如果我们要求IntelliJ自动优化导入，我们将看到以下内容：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span><span class="token class-name">Instant</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>function<span class="token punctuation">.</span></span><span class="token class-name">Supplier</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>stream<span class="token punctuation">.</span></span><span class="token class-name">Collectors</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>stream<span class="token punctuation">.</span></span><span class="token class-name">IntStream</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，因为我们从_java.util_包中导入了超过五个类，所以导入语句变成了_java.util.*_。</p><p>所以，如果我们想要禁用通配符导入，<strong>我们可以将“<em>使用‘*’的类计数</em>”的值设置为一个大数字，例如_100_或甚至_999_。</strong></p><ol start="6"><li>例外：“<em>使用‘*’的包</em>”表 最后，让我们看看“<em>使用‘*’的包</em>”表。<strong>该表允许我们添加始终使用通配符导入的包，无论我们是否勾选了“<em>使用单个类导入</em>”选项，或者我们为“<em>使用‘*’的类计数</em>”配置设置了哪个数字。</strong></li></ol><p>假设我们在IntelliJ中有以下设置：</p><ul><li>“<em>使用单个类导入</em>”选项 – 已勾选</li><li>“<em>使用‘*’的类计数</em>” – <em>100</em></li><li>“<em>使用‘*’的包</em>” – java.util.*（包括子包）</li></ul><p>现在，如果我们优化上一节中的Java文件的导入，我们将得到以下内容：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span><span class="token class-name">Instant</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>function<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>stream<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们在“<em>使用‘*’的包</em>”表中有“<em>java.util.*</em>”条目，IntelliJ使用通配符导入_java.util_包中的任何类。</p><p>因此，<strong>如果我们想要完全禁用通配符导入，这个表应该是空的。</strong></p><ol start="7"><li>结论 在本文中，我们讨论了如何设置三个主要的配置选项，以在IntelliJ中的Java文件中完全禁用通配符导入：</li></ol><ul><li>“<em>使用单个类导入</em>”选项 – 勾选选项</li><li>“<em>使用‘*’的类计数</em>” – <em>100</em>（或999）</li><li>“<em>使用‘*’的包</em>” – 保持此表为空</li></ul><p>OK</p>`,38),l=[p];function o(i,c){return s(),n("div",null,l)}const m=a(e,[["render",o],["__file","2024-07-03-Disable Wildcard Import in IntelliJ.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Disable%20Wildcard%20Import%20in%20IntelliJ.html","title":"IntelliJ IDEA中禁用通配符导入","lang":"zh-CN","frontmatter":{"category":["IntelliJ IDEA","Java"],"tag":["代码编辑","导入优化"],"head":[["meta",{"name":"keywords","content":"IntelliJ IDEA, Java, 导入优化, 代码编辑"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Disable%20Wildcard%20Import%20in%20IntelliJ.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"IntelliJ IDEA中禁用通配符导入"}],["meta",{"property":"og:description","content":"IntelliJ IDEA中禁用通配符导入 概述 在Java开发中，正确的导入语句对于保持代码可读性和避免潜在冲突非常重要。 IntelliJ IDEA是一个流行的Java集成开发环境（IDE）。因此，在这个快速教程中，我们将探讨如何在IntelliJ IDEA中禁用通配符导入。 IntelliJ的优化导入功能 IntelliJ自带了“优化导入”功能，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/05/optimizeImportMenu.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T22:35:47.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"代码编辑"}],["meta",{"property":"article:tag","content":"导入优化"}],["meta",{"property":"article:modified_time","content":"2024-07-03T22:35:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"IntelliJ IDEA中禁用通配符导入\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/05/optimizeImportMenu.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2023/05/javaImportSettings-1.jpg\\"],\\"dateModified\\":\\"2024-07-03T22:35:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"IntelliJ IDEA中禁用通配符导入 概述 在Java开发中，正确的导入语句对于保持代码可读性和避免潜在冲突非常重要。 IntelliJ IDEA是一个流行的Java集成开发环境（IDE）。因此，在这个快速教程中，我们将探讨如何在IntelliJ IDEA中禁用通配符导入。 IntelliJ的优化导入功能 IntelliJ自带了“优化导入”功能，..."},"headers":[],"git":{"createdTime":1720046147000,"updatedTime":1720046147000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.82,"words":1145},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Disable Wildcard Import in IntelliJ.md","localizedDate":"2024年7月3日","excerpt":"\\n<ol>\\n<li>概述\\n在Java开发中，正确的导入语句对于保持代码可读性和避免潜在冲突非常重要。</li>\\n</ol>\\n<p>IntelliJ IDEA是一个流行的Java集成开发环境（IDE）。因此，在这个快速教程中，我们将探讨如何在IntelliJ IDEA中禁用通配符导入。</p>\\n<ol start=\\"2\\">\\n<li>IntelliJ的优化导入功能\\nIntelliJ自带了“优化导入”功能，它可以自动重新排列导入语句，例如应用预定义样式、调整顺序、清理未使用的导入等。</li>\\n</ol>\\n<p>我们可以通过菜单项：_Code -&gt; 优化导入_来对当前Java文件应用“优化导入”：</p>","autoDesc":true}');export{m as comp,k as data};
