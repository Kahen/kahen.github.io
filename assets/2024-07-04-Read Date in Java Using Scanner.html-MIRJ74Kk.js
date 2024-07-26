import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DpYLEM_u.js";const e={},p=t(`<hr><h1 id="java中使用scanner读取日期" tabindex="-1"><a class="header-anchor" href="#java中使用scanner读取日期"><span>Java中使用Scanner读取日期</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本快速教程中，我们将学习如何从Scanner读取日期。我们将假设日期格式为yyyy-MM-dd，并且日期是Scanner的唯一内容。</p><h2 id="_2-将输入解析为localdate" tabindex="-1"><a class="header-anchor" href="#_2-将输入解析为localdate"><span>2. 将输入解析为LocalDate</span></a></h2><p>Scanner API提供了一个简单的文本扫描器。由于我们的Scanner有一个独特元素，我们将使用next()方法来获取它。否则，我们可能需要先做一些初步工作来解析它。</p><p>此外，Java 8引入了一个全新的日期/时间API。<strong>让我们创建一个DateTimeFormatter，并用给定的格式解析结果LocalDate：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LocalDate</span> <span class="token function">scanToLocalDate</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> dateString <span class="token operator">=</span> scanner<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">DateTimeFormatter</span> formatter <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>dateString<span class="token punctuation">,</span> formatter<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Scanner类实现了AutoCloseable接口，所以我们可以使用try-with-resources来创建我们的Scanner。这个代码块负责自动关闭Scanner资源。</p><p>总之，我们可以检查我们的代码是否返回了与直接解析输入相同的LocalDate。假设我们的类名为DateScanner：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenScanToLocalDate_ThenCorrectLocalDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> dateString <span class="token operator">=</span> <span class="token string">&quot;2018-09-09&quot;</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>dateString<span class="token punctuation">,</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">DateScanner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">scanToLocalDate</span><span class="token punctuation">(</span>dateString<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-将输入解析为date" tabindex="-1"><a class="header-anchor" href="#_3-将输入解析为date"><span>3. 将输入解析为Date</span></a></h2><p>使用Java 8之前的版本，我们可以使用原始的Date API。主要的区别是<strong>我们现在需要创建一个DateFormat来解析我们的Date：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Date</span> <span class="token function">scanToDate</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ParseException</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> dateString <span class="token operator">=</span> scanner<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">DateFormat</span> formatter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> formatter<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>dateString<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，我们可以测试方法输出的一致性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenScanToDate_ThenCorrectDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ParseException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> dateString <span class="token operator">=</span> <span class="token string">&quot;2018-09-09&quot;</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>dateString<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">DateScanner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">scanToDate</span><span class="token punctuation">(</span>dateString<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，让我们指出try-with-resources是在Java 7中引入的。在之前的版本中，我们需要手动关闭Scanner资源。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们将Scanner输入解析为LocalDate。然后，我们看到了使用Java早期Date API的等效代码。</p><p>如往常一样，代码可在GitHub上找到。</p>`,20),c=[p];function o(l,i){return s(),a("div",null,c)}const d=n(e,[["render",o],["__file","2024-07-04-Read Date in Java Using Scanner.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Read%20Date%20in%20Java%20Using%20Scanner.html","title":"Java中使用Scanner读取日期","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Scanner"],"tag":["Java","Scanner","LocalDate","DateFormat"],"head":[["meta",{"name":"keywords","content":"Java, Scanner, LocalDate, DateFormat, Date Parsing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Read%20Date%20in%20Java%20Using%20Scanner.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中使用Scanner读取日期"}],["meta",{"property":"og:description","content":"Java中使用Scanner读取日期 1. 概述 在本快速教程中，我们将学习如何从Scanner读取日期。我们将假设日期格式为yyyy-MM-dd，并且日期是Scanner的唯一内容。 2. 将输入解析为LocalDate Scanner API提供了一个简单的文本扫描器。由于我们的Scanner有一个独特元素，我们将使用next()方法来获取它。否则..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T03:55:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Scanner"}],["meta",{"property":"article:tag","content":"LocalDate"}],["meta",{"property":"article:tag","content":"DateFormat"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T03:55:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中使用Scanner读取日期\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T03:55:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中使用Scanner读取日期 1. 概述 在本快速教程中，我们将学习如何从Scanner读取日期。我们将假设日期格式为yyyy-MM-dd，并且日期是Scanner的唯一内容。 2. 将输入解析为LocalDate Scanner API提供了一个简单的文本扫描器。由于我们的Scanner有一个独特元素，我们将使用next()方法来获取它。否则..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 将输入解析为LocalDate","slug":"_2-将输入解析为localdate","link":"#_2-将输入解析为localdate","children":[]},{"level":2,"title":"3. 将输入解析为Date","slug":"_3-将输入解析为date","link":"#_3-将输入解析为date","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720065322000,"updatedTime":1720065322000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.7,"words":509},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Read Date in Java Using Scanner.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中使用Scanner读取日期</h1>\\n<h2>1. 概述</h2>\\n<p>在本快速教程中，我们将学习如何从Scanner读取日期。我们将假设日期格式为yyyy-MM-dd，并且日期是Scanner的唯一内容。</p>\\n<h2>2. 将输入解析为LocalDate</h2>\\n<p>Scanner API提供了一个简单的文本扫描器。由于我们的Scanner有一个独特元素，我们将使用next()方法来获取它。否则，我们可能需要先做一些初步工作来解析它。</p>\\n<p>此外，Java 8引入了一个全新的日期/时间API。<strong>让我们创建一个DateTimeFormatter，并用给定的格式解析结果LocalDate：</strong></p>","autoDesc":true}');export{d as comp,k as data};
