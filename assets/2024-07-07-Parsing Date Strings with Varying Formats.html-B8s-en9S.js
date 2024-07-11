import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-BEVMBw2k.js";const e={},p=t('<h1 id="解析具有不同格式的日期字符串" tabindex="-1"><a class="header-anchor" href="#解析具有不同格式的日期字符串"><span>解析具有不同格式的日期字符串</span></a></h1><p>有时候，我们需要解析可能以多种不同格式提供的日期字符串，如‘yyyy/MM/dd’、‘yyyy-MM-dd’或‘dd-MM-yyyy’。在本教程中，我们将展示一些解析不同日期模式的选项。首先，我们将尝试使用标准的Java库：<em>SimpleDateFormat</em> 和 <em>DateTimeFormatterBuilder</em> 来解决解析问题。然后，我们将检查第三方库Apache Commons <em>DateUtils</em> 和 Joda Time。</p><h2 id="_2-使用-simpledateformat" tabindex="-1"><a class="header-anchor" href="#_2-使用-simpledateformat"><span>2. 使用 <em>SimpleDateFormat</em></span></a></h2><p>首先，我们使用Java的 <em>SimpleDateFormat</em> 来解析具有多种格式的日期。一开始，我们定义一个可能的日期格式列表，并循环遍历它们，直到找到一个与我们的_String_ 匹配的格式。当匹配时，我们返回一个 <em>java.util.Date</em>。否则，我们返回 <em>null</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Date</span> <span class="token function">parseDate</span><span class="token punctuation">(</span><span class="token class-name">String</span> dateString<span class="token punctuation">,</span> <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` formatStrings<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> formatString <span class="token operator">:</span> formatStrings<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span>formatString<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>dateString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ParseException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法有其自身的优缺点。优点是不需要外部库，实现简单直接。</p><p>然而，我们需要提前知道所有可能的匹配日期格式。此外，没有日期验证。<strong>我们可以解析按照匹配模式格式化的日期，但这些日期仍然是无效的</strong>。例如，如果我们解析‘2022-40-40’，<em>SimpleDateFormater</em> 将返回‘2025-05-10’。</p><p>让我们看一个示例，显示解析这个无效日期返回了意想不到的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenInvalidInput_thenGettingUnexpectedResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">SimpleParseDate</span> simpleParseDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleParseDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> date <span class="token operator">=</span> <span class="token string">&quot;2022-40-40&quot;</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>\n        <span class="token string">&quot;Sat May 10 00:00:00 EEST 2025&quot;</span><span class="token punctuation">,</span>\n        simpleParseDate<span class="token punctuation">.</span><span class="token function">parseDate</span><span class="token punctuation">(</span>date<span class="token punctuation">,</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;MM/dd/yyyy&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;dd.MM.yyyy&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;yyyy-MM-dd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用-datetimeformatterbuilder" tabindex="-1"><a class="header-anchor" href="#_3-使用-datetimeformatterbuilder"><span>3. 使用 <em>DateTimeFormatterBuilder</em></span></a></h2><p><em>SimpleDateFormat</em> 是Java的原始实现，并且 <em>java.util.Date</em> 有许多已弃用的方法，所以<strong>更好的选择是使用 <em>DateTimeFormatterBuilder</em></strong>。与 <em>SimpleDateFormatter</em> 不同，<em>DateTimeFormatterBuilder</em> 可以接受多个日期模式，并使用它们尝试解析给定的日期。如果有模式匹配，它将返回解析的日期，否则，它将抛出 <em>DateTimeParseException</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">LocalDate</span> <span class="token function">parseDate</span><span class="token punctuation">(</span><span class="token class-name">String</span> date<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">DateTimeFormatterBuilder</span> dateTimeFormatterBuilder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DateTimeFormatterBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">&quot;[MM/dd/yyyy]&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;[dd-MM-yyyy]&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;[yyyy-MM-dd]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">DateTimeFormatter</span> dateTimeFormatter <span class="token operator">=</span> dateTimeFormatterBuilder<span class="token punctuation">.</span><span class="token function">toFormatter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>date<span class="token punctuation">,</span> dateTimeFormatter<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用这个格式化器来解析一些日期：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenInvalidDate_thenAssertThrows</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>\n        <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>LocalDate</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2022-12-04&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        simpleDateTimeFormater<span class="token punctuation">.</span><span class="token function">parseDate</span><span class="token punctuation">(</span><span class="token string">&quot;2022-12-04&quot;</span><span class="token punctuation">)</span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">DateTimeParseException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> simpleDateTimeFormater<span class="token punctuation">.</span><span class="token function">parseDate</span><span class="token punctuation">(</span><span class="token string">&quot;2022-13-04&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-apache-commons-dateutils" tabindex="-1"><a class="header-anchor" href="#_4-apache-commons-dateutils"><span>4. Apache Commons <em>DateUtils</em></span></a></h2><p>另一个选择是使用Apache Commons库，它提供了一个 <em>DateUtils</em> 助手。首先，我们需要包含Apache Commons Lang依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.commons``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``commons-lang3``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``3.14.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>DateUtils</em> 工作方式类似于 <em>DateTimeFormatterBuilder</em>。我们可以给它提供几个日期格式，如果其中一个格式与要解析的字符串匹配，它将解析日期：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">DateUtils</span><span class="token punctuation">.</span><span class="token function">parseDateStrictly</span><span class="token punctuation">(</span><span class="token string">&quot;2022-12-29&quot;</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token string">&quot;yyyy/MM/dd&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;dd/MM/yyyy&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;yyyy-MM-dd&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们使用 <em>DateUtils</em> 来解析无效和有效的日期：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenDateIsCorrect_thenParseCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">SimpleDateUtils</span> simpleDateUtils <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateUtils</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertNull</span><span class="token punctuation">(</span>simpleDateUtils<span class="token punctuation">.</span><span class="token function">parseDate</span><span class="token punctuation">(</span><span class="token string">&quot;53/10/2014&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Wed Sep 10 00:00:00 UTC 2014&quot;</span><span class="token punctuation">,</span> simpleDateUtils<span class="token punctuation">.</span><span class="token function">parseDate</span><span class="token punctuation">(</span><span class="token string">&quot;10/09/2014&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-joda-time" tabindex="-1"><a class="header-anchor" href="#_5-joda-time"><span>5. Joda Time</span></a></h2><p>另一个第三方选择是使用Joda Time库。值得知道的是，Joda Time在Java SE 8之前是Java事实上的标准日期和时间库。首先，我们需要包含它的依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``joda-time``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``joda-time``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``2.12.5``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们为 <em>DateTimeFormat</em> 定义可用的模式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">LocalDate</span> <span class="token function">parseDate</span><span class="token punctuation">(</span><span class="token class-name">String</span> date<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` patternList <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;MM/dd/yyyy&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;dd.MM.yyyy&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;yyyy-MM-dd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> pattern <span class="token operator">:</span> patternList<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token class-name">DateTimeFormat</span><span class="token punctuation">.</span><span class="token function">forPattern</span><span class="token punctuation">(</span>pattern<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">parseLocalDate</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IllegalFieldValueException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们写一个使用Joda Time解析一些日期的测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenDateIsCorrect_thenResultCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">SimpleDateTimeFormat</span> simpleDateUtils <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateTimeFormat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertNull</span><span class="token punctuation">(</span>simpleDateUtils<span class="token punctuation">.</span><span class="token function">parseDate</span><span class="token punctuation">(</span><span class="token string">&quot;53/10/2014&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2014-10-10&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> simpleDateUtils<span class="token punctuation">.</span><span class="token function">parseDate</span><span class="token punctuation">(</span><span class="token string">&quot;2014-10-10&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了使用标准Java库解析具有多种格式的日期的选项。此外，我们还使用第三方库：Apache Commons Lang和Joda Time解决了日期解析问题。</p><p>如常，你可以在GitHub上找到这些示例。</p>',31),o=[p];function c(l,i){return s(),n("div",null,o)}const d=a(e,[["render",c],["__file","2024-07-07-Parsing Date Strings with Varying Formats.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Parsing%20Date%20Strings%20with%20Varying%20Formats.html","title":"解析具有不同格式的日期字符串","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","日期时间"],"tag":["Java日期解析","SimpleDateFormat","DateTimeFormatterBuilder","Apache Commons DateUtils","Joda Time"],"head":[["meta",{"name":"keywords","content":"Java日期解析, SimpleDateFormat, DateTimeFormatterBuilder, Apache Commons DateUtils, Joda Time"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Parsing%20Date%20Strings%20with%20Varying%20Formats.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"解析具有不同格式的日期字符串"}],["meta",{"property":"og:description","content":"解析具有不同格式的日期字符串 有时候，我们需要解析可能以多种不同格式提供的日期字符串，如‘yyyy/MM/dd’、‘yyyy-MM-dd’或‘dd-MM-yyyy’。在本教程中，我们将展示一些解析不同日期模式的选项。首先，我们将尝试使用标准的Java库：SimpleDateFormat 和 DateTimeFormatterBuilder 来解决解析问..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T07:58:47.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java日期解析"}],["meta",{"property":"article:tag","content":"SimpleDateFormat"}],["meta",{"property":"article:tag","content":"DateTimeFormatterBuilder"}],["meta",{"property":"article:tag","content":"Apache Commons DateUtils"}],["meta",{"property":"article:tag","content":"Joda Time"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T07:58:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"解析具有不同格式的日期字符串\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T07:58:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"解析具有不同格式的日期字符串 有时候，我们需要解析可能以多种不同格式提供的日期字符串，如‘yyyy/MM/dd’、‘yyyy-MM-dd’或‘dd-MM-yyyy’。在本教程中，我们将展示一些解析不同日期模式的选项。首先，我们将尝试使用标准的Java库：SimpleDateFormat 和 DateTimeFormatterBuilder 来解决解析问..."},"headers":[{"level":2,"title":"2. 使用 SimpleDateFormat","slug":"_2-使用-simpledateformat","link":"#_2-使用-simpledateformat","children":[]},{"level":2,"title":"3. 使用 DateTimeFormatterBuilder","slug":"_3-使用-datetimeformatterbuilder","link":"#_3-使用-datetimeformatterbuilder","children":[]},{"level":2,"title":"4. Apache Commons DateUtils","slug":"_4-apache-commons-dateutils","link":"#_4-apache-commons-dateutils","children":[]},{"level":2,"title":"5. Joda Time","slug":"_5-joda-time","link":"#_5-joda-time","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720339127000,"updatedTime":1720339127000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.18,"words":953},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Parsing Date Strings with Varying Formats.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>有时候，我们需要解析可能以多种不同格式提供的日期字符串，如‘yyyy/MM/dd’、‘yyyy-MM-dd’或‘dd-MM-yyyy’。在本教程中，我们将展示一些解析不同日期模式的选项。首先，我们将尝试使用标准的Java库：<em>SimpleDateFormat</em> 和 <em>DateTimeFormatterBuilder</em> 来解决解析问题。然后，我们将检查第三方库Apache Commons <em>DateUtils</em> 和 Joda Time。</p>\\n<h2>2. 使用 <em>SimpleDateFormat</em></h2>\\n<p>首先，我们使用Java的 <em>SimpleDateFormat</em> 来解析具有多种格式的日期。一开始，我们定义一个可能的日期格式列表，并循环遍历它们，直到找到一个与我们的_String_ 匹配的格式。当匹配时，我们返回一个 <em>java.util.Date</em>。否则，我们返回 <em>null</em>：</p>","autoDesc":true}');export{d as comp,k as data};
