import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-LwwahXlT.js";const e={},p=t('<hr><h1 id="java-scanner-usedelimiter-示例-baeldung-1-概述" tabindex="-1"><a class="header-anchor" href="#java-scanner-usedelimiter-示例-baeldung-1-概述"><span>Java Scanner useDelimiter 示例 | Baeldung## 1. 概述</span></a></h1><p>在本教程中，我们将看到如何使用_Scanner_类的_useDelimiter_方法。</p><h2 id="_2-java-util-scanner-简介" tabindex="-1"><a class="header-anchor" href="#_2-java-util-scanner-简介"><span>2. _java.util.Scanner_简介</span></a></h2><p><em>Scanner</em> API 提供了一个简单的文本扫描器。</p><p><strong>默认情况下，_Scanner_使用空格作为分隔符来分割其输入。</strong> 让我们编写一个函数，将输入传递给_Scanner_，然后遍历_Scanner_以将令牌收集到一个列表中。</p><p>让我们看看基本的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">List</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` <span class="token function">baseScanner</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scan <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">List</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        scan<span class="token punctuation">.</span><span class="token function">forEachRemaining</span><span class="token punctuation">(</span>result<span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> result<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们注意，在这段代码中我们使用了_try-with-resources_来创建我们的_Scanner_。这是因为_Scanner_类实现了_AutoCloseable_接口。这个代码块自动负责关闭_Scanner_资源。在Java 7之前，我们不能使用_try-with-resources_，因此将不得不手动处理它。</p><p>我们还可以注意到，为了遍历_Scanner_元素，我们使用了_forEachRemaining_方法。这个方法是在Java 8中引入的。<em>Scanner_实现了_Iterator</em>，如果我们使用的是较旧的Java版本，我们将不得不利用这一点来遍历元素。</p><p>正如我们所说，_Scanner_默认会使用空格来解析其输入。例如，使用以下输入调用我们的_baseScanner_方法：“Welcome to Baeldung”，应该返回一个包含以下有序元素的列表：“Welcome”，“to”，“Baeldung”。</p><p>让我们编写一个测试来检查我们的方法是否按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenBaseScanner_ThenWhitespacesAreUsedAsDelimiters</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Welcome&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;to&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">baseScanner</span><span class="token punctuation">(</span><span class="token string">&quot;Welcome to Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用自定义分隔符" tabindex="-1"><a class="header-anchor" href="#_3-使用自定义分隔符"><span>3. 使用自定义分隔符</span></a></h2><p>现在让我们设置我们的扫描器以使用自定义分隔符。<strong>我们将传入一个_字符串_，该字符串将被_Scanner_用来断开输入。</strong></p><p>让我们看看如何做到这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">List</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` <span class="token function">scannerWithDelimiter</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">,</span> <span class="token class-name">String</span> delimiter<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scan <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        scan<span class="token punctuation">.</span><span class="token function">useDelimiter</span><span class="token punctuation">(</span>delimiter<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">List</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        scan<span class="token punctuation">.</span><span class="token function">forEachRemaining</span><span class="token punctuation">(</span>result<span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> result<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们评论一些示例：</p><ul><li>我们可以使用单个字符作为分隔符：如果需要，必须转义该字符。例如，如果我们想要模仿基本行为并使用空格作为分隔符，我们将使用“\\s”</li><li>我们可以使用任何单词/短语作为分隔符</li><li>我们可以使用多个可能的字符作为分隔符：为此，我们必须用“|”将它们分开。例如，如果我们想要在每个空格和每个换行符之间分割输入，我们将使用以下分隔符：“\\n|\\s”</li><li>简言之，我们可以使用任何类型的正则表达式作为分隔符：例如，“a+”是一个有效的分隔符</li></ul><p>让我们看看我们如何测试第一种情况：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenSimpleCharacterDelimiter_whenScannerWithDelimiter_ThenInputIsCorrectlyParsed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Welcome&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;to&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">scannerWithDelimiter</span><span class="token punctuation">(</span><span class="token string">&quot;Welcome to Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\\\\s&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>实际上，在幕后，_useDelimiter_方法将将其输入转换为一个封装在_Pattern_对象中的正则表达式。</strong> 另外，我们也可以自己处理_Pattern_的实例化。为此我们需要使用覆盖的_useDelimiter(Pattern pattern)_，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">List</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` <span class="token function">scannerWithDelimiterUsingPattern</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">,</span> <span class="token class-name">Pattern</span> delimiter<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scan <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        scan<span class="token punctuation">.</span><span class="token function">useDelimiter</span><span class="token punctuation">(</span>delimiter<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">List</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        scan<span class="token punctuation">.</span><span class="token function">forEachRemaining</span><span class="token punctuation">(</span>result<span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> result<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要实例化一个_Pattern_，我们可以使用_compile_方法，如下所示的测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenStringDelimiter_whenScannerWithDelimiterUsingPattern_ThenInputIsCorrectlyParsed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Welcome&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;to&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">DelimiterDemo</span><span class="token punctuation">.</span><span class="token function">scannerWithDelimiterUsingPattern</span><span class="token punctuation">(</span><span class="token string">&quot;Welcome to Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\s&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们展示了一些可以用于调用_useDelimiter_函数的模式示例。我们注意到，默认情况下，_Scanner_使用空格分隔符，我们指出我们可以在那里使用任何类型的正则表达式。</p><p>一如既往，完整的代码可以在GitHub上找到。</p><p>OK</p>',29),c=[p];function o(i,l){return s(),a("div",null,c)}const k=n(e,[["render",o],["__file","2024-07-18-Java Scanner useDelimiter with Examples.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Java%20Scanner%20useDelimiter%20with%20Examples.html","title":"Java Scanner useDelimiter 示例 | Baeldung## 1. 概述","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Scanner"],"tag":["Java","Scanner","useDelimiter"],"head":[["meta",{"name":"keywords","content":"Java Scanner, useDelimiter, 示例"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Java%20Scanner%20useDelimiter%20with%20Examples.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java Scanner useDelimiter 示例 | Baeldung## 1. 概述"}],["meta",{"property":"og:description","content":"Java Scanner useDelimiter 示例 | Baeldung## 1. 概述 在本教程中，我们将看到如何使用_Scanner_类的_useDelimiter_方法。 2. _java.util.Scanner_简介 Scanner API 提供了一个简单的文本扫描器。 默认情况下，_Scanner_使用空格作为分隔符来分割其输入。 让..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T19:37:34.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Scanner"}],["meta",{"property":"article:tag","content":"useDelimiter"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T19:37:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java Scanner useDelimiter 示例 | Baeldung## 1. 概述\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T19:37:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java Scanner useDelimiter 示例 | Baeldung## 1. 概述 在本教程中，我们将看到如何使用_Scanner_类的_useDelimiter_方法。 2. _java.util.Scanner_简介 Scanner API 提供了一个简单的文本扫描器。 默认情况下，_Scanner_使用空格作为分隔符来分割其输入。 让..."},"headers":[{"level":2,"title":"2. _java.util.Scanner_简介","slug":"_2-java-util-scanner-简介","link":"#_2-java-util-scanner-简介","children":[]},{"level":2,"title":"3. 使用自定义分隔符","slug":"_3-使用自定义分隔符","link":"#_3-使用自定义分隔符","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721331454000,"updatedTime":1721331454000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.11,"words":934},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Java Scanner useDelimiter with Examples.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java Scanner useDelimiter 示例 | Baeldung## 1. 概述</h1>\\n<p>在本教程中，我们将看到如何使用_Scanner_类的_useDelimiter_方法。</p>\\n<h2>2. _java.util.Scanner_简介</h2>\\n<p><em>Scanner</em> API 提供了一个简单的文本扫描器。</p>\\n<p><strong>默认情况下，_Scanner_使用空格作为分隔符来分割其输入。</strong> 让我们编写一个函数，将输入传递给_Scanner_，然后遍历_Scanner_以将令牌收集到一个列表中。</p>\\n<p>让我们看看基本的实现：</p>","autoDesc":true}');export{k as comp,d as data};
