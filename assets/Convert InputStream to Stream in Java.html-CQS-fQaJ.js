import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-_uhw5edP.js";const e={},p=t('<h1 id="java中将inputstream转换为stream-string-baeldung" tabindex="-1"><a class="header-anchor" href="#java中将inputstream转换为stream-string-baeldung"><span>Java中将InputStream转换为Stream<code>&lt;String&gt;</code> | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在Java中处理来自不同来源的输入数据时，我们有时会遇到需要将_InputStream_转换为_Stream<code>&lt;String&gt;</code>_的情况。</p><p>在本教程中，我们将探讨实现这种转换的不同方法。</p><h2 id="_2-使用bufferedreader和lines-方法转换" tabindex="-1"><a class="header-anchor" href="#_2-使用bufferedreader和lines-方法转换"><span>2. 使用BufferedReader和lines()方法转换</span></a></h2><p>将_InputStream_转换为_Stream<code>&lt;String&gt;</code>_的一种有效方式是使用_BufferedReader_及其_lines()_方法。</p><p>首先，我们将定义一个_byte_数组_bytes_，其中包含一系列文本行：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token string">&quot;Hello\\nWorld\\nThis\\nis\\na\\ntest&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在提供的代码块中，我们创建了一个名为_bytes_的_byte_数组，以保存所提供文本行的UTF-8编码表示。然后，我们使用_ByteArrayInputStream(bytes)<em>从这个_byte_数组创建一个名为_inputStream_的_InputStream</em>。</p><p><strong>此设置允许我们模拟一个包含指定文本的_InputStream_，这将在后续示例中用于转换为_Stream<code>&lt;String&gt;</code>_。</strong></p><p>现在，让我们看看如何在测试场景中实现这种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenInputStream_whenConvertingWithBufferedReader_thenConvertInputStreamToStringStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">InputStreamReader</span> isr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">,</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n         <span class="token class-name">BufferedReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span>isr<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Stream</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` stringStream <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">lines</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">String</span> result <span class="token operator">=</span> stringStream<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>s1<span class="token punctuation">,</span> s2<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> s1 <span class="token operator">+</span> s2<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;HelloWorldThisisatest&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，<strong>我们使用_InputStreamReader_创建了一个包裹在_InputStream_上的_BufferedReader_对象。这使我们能够高效地从_InputStream_读取文本行。</strong> 此外，_BufferedReader_的_lines()<em>方法返回一个包含从输入中读取的行的_Stream<code>&lt;String&gt;</code></em>。最后，我们使用_reduce()<em>操作将这个_Stream_中的所有_String_元素连接成一个单独的结果_String</em>，并使用断言与预期内容进行验证。</p><p><strong>请注意，我们使用_try-with-resources_以确保_InputStreamReader_和_BufferedReader_在_try_块结束时自动关闭，释放相关资源。</strong></p><h2 id="_3-使用scanner转换" tabindex="-1"><a class="header-anchor" href="#_3-使用scanner转换"><span>3. 使用Scanner转换</span></a></h2><p>另一种方法是使用_Scanner_对_InputStream_进行标记化。让我们看看一个简单的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenInputStream_whenConvertingWithScannerFindAll_thenConvertInputStreamToStringStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">,</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Stream</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` stringStream <span class="token operator">=</span> scanner<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token string">&quot;.+&quot;</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">MatchResult</span><span class="token operator">::</span><span class="token function">group</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">String</span> result <span class="token operator">=</span> stringStream<span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">joining</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;HelloWorldThisisatest&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，我们使用_InputStream_初始化一个_Scanner_对象，并使用_StandardCharsets.UTF_8_配置它以使用UTF-8编码。</p><p>之后，<strong>我们使用_regex_模式“<em>.+</em>”的_findAll()<em>方法来匹配一个或多个字符，有效地将_InputStream_的内容捕获为一系列_MatchResult</em>。</strong></p><p>然后，我们使用_MatchResult::group_将每个匹配结果映射到其匹配组，结果是一个包含匹配字符串的_Stream<code>&lt;String&gt;</code>_。随后，我们使用_Collectors.joining()<em>方法将_Stream_中的所有字符串连接成一个名为_result_的单个_String</em>。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>总之，在Java中将_InputStream_转换为_Stream<code>&lt;String&gt;</code>_可以通过使用_BufferedReader_及其_lines()_方法或利用_Scanner_及其_findAll()_方法来实现。这允许我们高效地处理基于文本的数据，为我们的Java应用程序中的_InputStream_处理提供了灵活性和可扩展性。</p><p>如常，示例的源代码可在GitHub上获取。</p><p>文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>',24),o=[p];function c(r,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","Convert InputStream to Stream in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/Archive/Convert%20InputStream%20to%20Stream%20in%20Java.html","title":"Java中将InputStream转换为Stream<String> | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-15T00:00:00.000Z","category":["Java"],"tag":["InputStream","Stream"],"description":"Java中将InputStream转换为Stream<String> | Baeldung 1. 引言 在Java中处理来自不同来源的输入数据时，我们有时会遇到需要将_InputStream_转换为_Stream<String>_的情况。 在本教程中，我们将探讨实现这种转换的不同方法。 2. 使用BufferedReader和lines()方法转换 将...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Convert%20InputStream%20to%20Stream%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将InputStream转换为Stream<String> | Baeldung"}],["meta",{"property":"og:description","content":"Java中将InputStream转换为Stream<String> | Baeldung 1. 引言 在Java中处理来自不同来源的输入数据时，我们有时会遇到需要将_InputStream_转换为_Stream<String>_的情况。 在本教程中，我们将探讨实现这种转换的不同方法。 2. 使用BufferedReader和lines()方法转换 将..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"InputStream"}],["meta",{"property":"article:tag","content":"Stream"}],["meta",{"property":"article:published_time","content":"2024-06-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将InputStream转换为Stream<String> | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用BufferedReader和lines()方法转换","slug":"_2-使用bufferedreader和lines-方法转换","link":"#_2-使用bufferedreader和lines-方法转换","children":[]},{"level":2,"title":"3. 使用Scanner转换","slug":"_3-使用scanner转换","link":"#_3-使用scanner转换","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.62,"words":786},"filePathRelative":"posts/baeldung/Archive/Convert InputStream to Stream in Java.md","localizedDate":"2024年6月15日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在Java中处理来自不同来源的输入数据时，我们有时会遇到需要将_InputStream_转换为_Stream<code>&lt;String&gt;</code>_的情况。</p>\\n<p>在本教程中，我们将探讨实现这种转换的不同方法。</p>\\n<h2>2. 使用BufferedReader和lines()方法转换</h2>\\n<p>将_InputStream_转换为_Stream<code>&lt;String&gt;</code>_的一种有效方式是使用_BufferedReader_及其_lines()_方法。</p>\\n<p>首先，我们将定义一个_byte_数组_bytes_，其中包含一系列文本行：</p>","autoDesc":true}');export{d as comp,m as data};
