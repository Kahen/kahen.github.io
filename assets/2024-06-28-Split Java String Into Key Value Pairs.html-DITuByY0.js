import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DI0Ohe7a.js";const p={},e=t(`<h1 id="java中将字符串分割成键值对" tabindex="-1"><a class="header-anchor" href="#java中将字符串分割成键值对"><span>Java中将字符串分割成键值对</span></a></h1><p>在处理像CSV（逗号分隔值）或自定义分隔数据这样的格式时，经常需要在Java中将字符串分割成键值对。本教程将通过代码示例和解释，探讨如何将Java文本分割成键值对。</p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><h2 id="_2-使用-stringtokenizer" tabindex="-1"><a class="header-anchor" href="#_2-使用-stringtokenizer"><span>2. 使用_StringTokenizer_</span></a></h2><p>_StringTokenizer_类我们能够根据提供的分隔符将字符串分解为标记，这是一种将字符串分割成键值对的方法。</p><p>让我们以一个例子为例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStringData_whenUsingTokenizer_thenTokenizeAndValidate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> data <span class="token operator">=</span> <span class="token string">&quot;name=John age=30 city=NewYork&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">StringTokenizer</span> tokenizer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringTokenizer</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 创建一个存储键值对的映射</span>
    <span class="token class-name">Map</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` keyValueMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>tokenizer<span class="token punctuation">.</span><span class="token function">hasMoreTokens</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> token <span class="token operator">=</span> tokenizer<span class="token punctuation">.</span><span class="token function">nextToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> keyValue <span class="token operator">=</span> token<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;=&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>keyValue<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> key <span class="token operator">=</span> keyValue<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> value <span class="token operator">=</span> keyValue<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

            <span class="token comment">// 将键值对存储在映射中</span>
            keyValueMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 使用断言来验证映射中的键值对</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> keyValueMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;30&quot;</span><span class="token punctuation">,</span> keyValueMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;NewYork&quot;</span><span class="token punctuation">,</span> keyValueMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;city&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，创建一个_StringTokenizer_对象时指定了输入字符串数据和默认分隔符（空格）。然后，通过迭代标记，我们使用等号符号(=)作为分隔符将每个标记分割成键值对。</p><h2 id="_3-使用正则表达式" tabindex="-1"><a class="header-anchor" href="#_3-使用正则表达式"><span>3. 使用正则表达式</span></a></h2><p>使用_Pattern_和_Matcher_类的正则表达式是将字符串分割成键值对的另一种方法。幸运的是，这种方法在处理各种分隔符和模式时提供了额外的灵活性。</p><p>让我们以一个例子为例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenDataWithPattern_whenUsingMatcher_thenPerformPatternMatching</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> data <span class="token operator">=</span> <span class="token string">&quot;name=John,age=30;city=NewYork&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Pattern</span> pattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\b(\\\\w+)=(\\\\w+)\\\\b&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> pattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 创建一个存储键值对的映射</span>
    <span class="token class-name">Map</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` keyValueMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> key <span class="token operator">=</span> matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> value <span class="token operator">=</span> matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 将键值对存储在映射中</span>
        keyValueMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 使用断言来验证映射中的键值对</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> keyValueMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;30&quot;</span><span class="token punctuation">,</span> keyValueMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;NewYork&quot;</span><span class="token punctuation">,</span> keyValueMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;city&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们使用_Pattern_类生成一个正则表达式模式<code>\\b(\\w+)=(\\w+)\\b</code>，用于定位和提取文本中的键值对。此外，它识别了一个由字母、数字或下划线组成的键后面跟着等号&#39;=&#39;的模式，捕获了相关的值，该值同样由字母、数字或下划线组成。</p><p>注意，_\\b_标记确保找到完整的键值对，这使得这个正则表达式对于解析给定字符串中的结构化数据在“key=value”格式中非常有用。</p><p>然后，使用输入字符串，我们使用_Matcher_定位和提取这些对。</p><h2 id="_4-使用java-streams" tabindex="-1"><a class="header-anchor" href="#_4-使用java-streams"><span>4. 使用Java Streams</span></a></h2><p>如果我们使用Java 8或更高版本，我们可以使用Java Streams清晰地将文本分割成键值对。</p><p>让我们以一个例子为例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStringData_whenUsingJavaMap_thenSplitAndValidate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> data <span class="token operator">=</span> <span class="token string">&quot;name=John age=30 city=NewYork&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Map</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` keyValueMap <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>kv <span class="token operator">-&gt;</span> kv<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;=&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>kvArray <span class="token operator">-&gt;</span> kvArray<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span>kv <span class="token operator">-&gt;</span> kv<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> kv <span class="token operator">-&gt;</span> kv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> keyValueMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;30&quot;</span><span class="token punctuation">,</span> keyValueMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;NewYork&quot;</span><span class="token punctuation">,</span> keyValueMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;city&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们使用空格作为分隔符将输入字符串分割成一个键值对数组。然后，我们使用_map_过程进一步使用等号符号(=)分割每一对。最后，我们移除任何不包含正好两个元素的配对，并将剩余的配对编译成一个带有相关键和值的_Map_。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>Java Streams、_StringTokenizer_和正则表达式只是将Java字符串分割成键值对的一些技术。</p><p>我们的需求和我们正在处理的数据格式的复杂性将决定我们选择的解决方案。通过了解这些策略，我们可以有效地提取和处理Java程序中以键值对形式存储的数据。</p><p>如往常一样，本文的完整代码示例可以在GitHub上找到。</p>`,24),o=[e];function c(l,u){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-28-Split Java String Into Key Value Pairs.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Split%20Java%20String%20Into%20Key%20Value%20Pairs.html","title":"Java中将字符串分割成键值对","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","String Manipulation"],"tag":["Java","String Split","Key-Value Pairs"],"head":[["meta",{"name":"keywords","content":"Java, String, Split, Key-Value Pairs, CSV, StringTokenizer, Regular Expressions, Java Streams"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Split%20Java%20String%20Into%20Key%20Value%20Pairs.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将字符串分割成键值对"}],["meta",{"property":"og:description","content":"Java中将字符串分割成键值对 在处理像CSV（逗号分隔值）或自定义分隔数据这样的格式时，经常需要在Java中将字符串分割成键值对。本教程将通过代码示例和解释，探讨如何将Java文本分割成键值对。 1. 引言 2. 使用_StringTokenizer_ _StringTokenizer_类我们能够根据提供的分隔符将字符串分解为标记，这是一种将字符串分..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T22:32:15.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"String Split"}],["meta",{"property":"article:tag","content":"Key-Value Pairs"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T22:32:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将字符串分割成键值对\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T22:32:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将字符串分割成键值对 在处理像CSV（逗号分隔值）或自定义分隔数据这样的格式时，经常需要在Java中将字符串分割成键值对。本教程将通过代码示例和解释，探讨如何将Java文本分割成键值对。 1. 引言 2. 使用_StringTokenizer_ _StringTokenizer_类我们能够根据提供的分隔符将字符串分解为标记，这是一种将字符串分..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用_StringTokenizer_","slug":"_2-使用-stringtokenizer","link":"#_2-使用-stringtokenizer","children":[]},{"level":2,"title":"3. 使用正则表达式","slug":"_3-使用正则表达式","link":"#_3-使用正则表达式","children":[]},{"level":2,"title":"4. 使用Java Streams","slug":"_4-使用java-streams","link":"#_4-使用java-streams","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719613935000,"updatedTime":1719613935000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.26,"words":977},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Split Java String Into Key Value Pairs.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在处理像CSV（逗号分隔值）或自定义分隔数据这样的格式时，经常需要在Java中将字符串分割成键值对。本教程将通过代码示例和解释，探讨如何将Java文本分割成键值对。</p>\\n<h2>1. 引言</h2>\\n<h2>2. 使用_StringTokenizer_</h2>\\n<p>_StringTokenizer_类我们能够根据提供的分隔符将字符串分解为标记，这是一种将字符串分割成键值对的方法。</p>\\n<p>让我们以一个例子为例：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenStringData_whenUsingTokenizer_thenTokenizeAndValidate</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">String</span> data <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"name=John age=30 city=NewYork\\"</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">StringTokenizer</span> tokenizer <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">StringTokenizer</span><span class=\\"token punctuation\\">(</span>data<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// 创建一个存储键值对的映射</span>\\n    <span class=\\"token class-name\\">Map</span>```<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>``` keyValueMap <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">HashMap</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span>tokenizer<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">hasMoreTokens</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token class-name\\">String</span> token <span class=\\"token operator\\">=</span> tokenizer<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">nextToken</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> keyValue <span class=\\"token operator\\">=</span> token<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">split</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"=\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>keyValue<span class=\\"token punctuation\\">.</span>length <span class=\\"token operator\\">==</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token class-name\\">String</span> key <span class=\\"token operator\\">=</span> keyValue<span class=\\"token punctuation\\">[</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n            <span class=\\"token class-name\\">String</span> value <span class=\\"token operator\\">=</span> keyValue<span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n\\n            <span class=\\"token comment\\">// 将键值对存储在映射中</span>\\n            keyValueMap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span>key<span class=\\"token punctuation\\">,</span> value<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token comment\\">// 使用断言来验证映射中的键值对</span>\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"John\\"</span><span class=\\"token punctuation\\">,</span> keyValueMap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"name\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"30\\"</span><span class=\\"token punctuation\\">,</span> keyValueMap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"age\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"NewYork\\"</span><span class=\\"token punctuation\\">,</span> keyValueMap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"city\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
