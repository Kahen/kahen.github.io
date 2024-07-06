import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-ConjvFaO.js";const e={},p=t(`<h1 id="java中url规范化" tabindex="-1"><a class="header-anchor" href="#java中url规范化"><span>Java中URL规范化</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>统一资源定位符（URLs）是Web开发的重要组成部分，它们帮助定位和获取互联网上的资源。然而，URLs可能存在不一致或格式错误，这可能导致处理和获取所需材料时出现问题。</p><p>URL规范化是将给定的数据转换为规范形式，确保一致性并促进操作性。</p><h2 id="_2-手动规范化" tabindex="-1"><a class="header-anchor" href="#_2-手动规范化"><span>2. 手动规范化</span></a></h2><p>执行手动规范化涉及应用自定义逻辑来标准化URLs。这个过程包括删除不必要的元素，如不必要的查询参数和片段标识符，将URLs蒸馏到其核心本质。假设我们有以下URL：</p><p><em>https://www.example.com:8080/path/to/resource?param1=value1&amp;param2=value2#fragment</em></p><p>规范化后的URL应该如下：</p><p><em>https://www.example.com:8080/path/to/resource</em></p><p>注意我们认为“？”之后的所有内容都是不必要的，因为我们只对按资源分组感兴趣。但这将根据用例而变化。</p><h2 id="_3-使用apache-commons-validator" tabindex="-1"><a class="header-anchor" href="#_3-使用apache-commons-validator"><span>3. 使用Apache Commons Validator</span></a></h2><p>Apache Commons Validator库中的_UrlValidator_类是验证和规范化URLs的便捷方法。首先，我们应该确保我们的项目包括Apache Commons Validator依赖项，如下所示：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`commons-validator\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`commons-validator\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`1.8.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>\`test\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们准备实现一个简单的Java代码示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> originalUrl <span class="token operator">=</span> <span class="token string">&quot;https://www.example.com:8080/path/to/resource?param1=value1&amp;param2=value2#fragment&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> expectedNormalizedUrl <span class="token operator">=</span> <span class="token string">&quot;https://www.example.com:8080/path/to/resource&quot;</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenOriginalUrl_whenUsingApacheCommonsValidator_thenValidatedAndMaybeManuallyNormalized</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">UrlValidator</span> urlValidator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UrlValidator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>urlValidator<span class="token punctuation">.</span><span class="token function">isValid</span><span class="token punctuation">(</span>originalUrl<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> normalizedUrl <span class="token operator">=</span> originalUrl<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\?&quot;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedNormalizedUrl<span class="token punctuation">,</span> manuallyNormalizedUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">fail</span><span class="token punctuation">(</span>originalUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们首先实例化一个_UrlValidator_对象。然后，我们使用_isValid()_方法来确定原始URL是否符合之前提到的验证规则。</p><p>如果URL被证明是合法的，我们通过手工标准化它并删除查询参数和片段，特别是“？”之后的所有内容。最后，我们使用_assertEquals()_方法来验证_expectedNormalizedUrl_和_normalizedUrl_的等价性。</p><h2 id="_4-使用java的uri类" tabindex="-1"><a class="header-anchor" href="#_4-使用java的uri类"><span>4. 使用Java的URI类</span></a></h2><p>在java.net包中建立Java _URI_类提供了其他管理URIs的功能，包括规范化。让我们看一个简单的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenOriginalUrl_whenUsingJavaURIClass_thenNormalizedUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">URISyntaxException</span> <span class="token punctuation">{</span>
    <span class="token class-name">URI</span> uri <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URI</span><span class="token punctuation">(</span>originalUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">URI</span> normalizedUri <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URI</span><span class="token punctuation">(</span>uri<span class="token punctuation">.</span><span class="token function">getScheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> uri<span class="token punctuation">.</span><span class="token function">getAuthority</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> uri<span class="token punctuation">.</span><span class="token function">getPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> normalizedUrl <span class="token operator">=</span> normalizedUri<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedNormalizedUrl<span class="token punctuation">,</span> normalizedUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们将_originalUrl_传递给_URI_对象，并由此派生出一个规范化的_URI_，通过提取和重新组装特定的组件，如scheme、authority和path。</p><h2 id="_5-使用正则表达式" tabindex="-1"><a class="header-anchor" href="#_5-使用正则表达式"><span>5. 使用正则表达式</span></a></h2><p>正则表达式是Java中URL规范化的一种非常有用机制。它们允许您指定许多模式和转换，这些模式匹配URLs并根据您的需求进行更改。这是一个简单的代码示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenOriginalUrl_whenUsingRegularExpression_thenNormalizedUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">URISyntaxException</span><span class="token punctuation">,</span> <span class="token class-name">UnsupportedEncodingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> regex <span class="token operator">=</span> <span class="token string">&quot;^(https?://[^/]+/[^?#]+)&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Pattern</span> pattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>regex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> pattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>originalUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> normalizedUrl <span class="token operator">=</span> matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedNormalizedUrl<span class="token punctuation">,</span> normalizedUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">fail</span><span class="token punctuation">(</span>originalUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码示例中，我们首先创建一个匹配URL的scheme、域和路径组件的正则表达式_pattern_。然后，我们将这个模式转换为表示正则表达式的_Pattern_对象。同样，我们使用_Matcher_来匹配原始URL与给定模式。</p><p>此外，我们使用_matcher.find()_方法来查找输入序列中定义的模式的下一个子序列。如果_matcher.find()_方法返回true，_matcher.group(1)_提取出与_regex_匹配的子字符串。在这种情况下，它特别捕获了_regex_中第一个捕获组的内容（由括号表示），这被认为是规范化的URL。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>总之，我们探索了几种URL规范化的方法，如手动规范化、Apache Commons Validator库、Java的URI类和正则表达式。</p><p>如常，相关的源代码可以在GitHub上找到。 OK</p>`,29),o=[p];function c(l,i){return s(),n("div",null,o)}const d=a(e,[["render",c],["__file","2024-06-23-Normalize a URL in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Normalize%20a%20URL%20in%20Java.html","title":"Java中URL规范化","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Java","Web开发"],"tag":["URL规范化","Java","Apache Commons Validator","URI类","正则表达式"],"head":[["meta",{"name":"keywords","content":"Java, URL规范化, Web开发, Apache Commons Validator, URI类, 正则表达式"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Normalize%20a%20URL%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中URL规范化"}],["meta",{"property":"og:description","content":"Java中URL规范化 1. 引言 统一资源定位符（URLs）是Web开发的重要组成部分，它们帮助定位和获取互联网上的资源。然而，URLs可能存在不一致或格式错误，这可能导致处理和获取所需材料时出现问题。 URL规范化是将给定的数据转换为规范形式，确保一致性并促进操作性。 2. 手动规范化 执行手动规范化涉及应用自定义逻辑来标准化URLs。这个过程包括..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T02:52:58.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"URL规范化"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Apache Commons Validator"}],["meta",{"property":"article:tag","content":"URI类"}],["meta",{"property":"article:tag","content":"正则表达式"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T02:52:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中URL规范化\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T02:52:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中URL规范化 1. 引言 统一资源定位符（URLs）是Web开发的重要组成部分，它们帮助定位和获取互联网上的资源。然而，URLs可能存在不一致或格式错误，这可能导致处理和获取所需材料时出现问题。 URL规范化是将给定的数据转换为规范形式，确保一致性并促进操作性。 2. 手动规范化 执行手动规范化涉及应用自定义逻辑来标准化URLs。这个过程包括..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 手动规范化","slug":"_2-手动规范化","link":"#_2-手动规范化","children":[]},{"level":2,"title":"3. 使用Apache Commons Validator","slug":"_3-使用apache-commons-validator","link":"#_3-使用apache-commons-validator","children":[]},{"level":2,"title":"4. 使用Java的URI类","slug":"_4-使用java的uri类","link":"#_4-使用java的uri类","children":[]},{"level":2,"title":"5. 使用正则表达式","slug":"_5-使用正则表达式","link":"#_5-使用正则表达式","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719111178000,"updatedTime":1719111178000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.23,"words":968},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Normalize a URL in Java.md","localizedDate":"2024年6月23日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>统一资源定位符（URLs）是Web开发的重要组成部分，它们帮助定位和获取互联网上的资源。然而，URLs可能存在不一致或格式错误，这可能导致处理和获取所需材料时出现问题。</p>\\n<p>URL规范化是将给定的数据转换为规范形式，确保一致性并促进操作性。</p>\\n<h2>2. 手动规范化</h2>\\n<p>执行手动规范化涉及应用自定义逻辑来标准化URLs。这个过程包括删除不必要的元素，如不必要的查询参数和片段标识符，将URLs蒸馏到其核心本质。假设我们有以下URL：</p>\\n<p><em>https://www.example.com:8080/path/to/resource?param1=value1&amp;param2=value2#fragment</em></p>","autoDesc":true}');export{d as comp,k as data};
