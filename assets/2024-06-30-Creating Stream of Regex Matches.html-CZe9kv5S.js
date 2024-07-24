import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as e,a as s}from"./app-BkL9UgS7.js";const t={},p=s(`<hr><h1 id="创建正则表达式匹配流" tabindex="-1"><a class="header-anchor" href="#创建正则表达式匹配流"><span>创建正则表达式匹配流</span></a></h1><p>正则表达式（regex）是模式匹配的强大工具。它们允许我们在字符串中找到特定的模式，这对于数据提取、验证和转换等任务非常有用。</p><p>在本教程中，我们将通过一个简单的例子探索如何使用正则表达式创建匹配流。</p><h3 id="_2-入门" tabindex="-1"><a class="header-anchor" href="#_2-入门"><span>2. 入门</span></a></h3><p>首先，假设我们有一个包含字母和数字的字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;There are 3 apples and 2 bananas on the table.&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们的目标是使用正则表达式提取这个字符串中的所有数字，然后创建这些匹配项的流。</p><h3 id="_3-定义正则表达式" tabindex="-1"><a class="header-anchor" href="#_3-定义正则表达式"><span>3. 定义正则表达式</span></a></h3><p>首先，我们需要定义一个可以匹配数字的正则表达式模式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> regex <span class="token operator">=</span> <span class="token string">&quot;\\\\d+&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这个正则表达式中，<code>\\d+</code> 匹配一个或多个数字。双反斜杠 <code>\\\\</code> 用于转义反斜杠字符，因为它在Java中是一个特殊字符。</p><p>接下来，我们将通过将定义的模式应用于输入字符串来创建一个 <code>Matcher</code> 对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Pattern</span> pattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>regex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> pattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们将匹配到的数字转换为流。我们将使用 <code>matcher.results()</code>，这是Java 9中引入的一个新方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Stream</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` outputStream <span class="token operator">=</span> matcher<span class="token punctuation">.</span><span class="token function">results</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">MatchResult</span><span class="token operator">::</span><span class="token function">group</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 在流中处理元素</span>
outputStream<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token operator">::</span><span class="token function">println</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>matcher.results()</code> 方法返回一个 <code>MatchResult</code> 对象的流。每个对象对应于基于正则表达式模式在输入字符串中找到的一个独特匹配。然后，我们可以使用这个对象的 <code>group()</code> 方法来获取匹配的 <code>String</code>。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们学习了如何通过一个简单的例子从字符串中提取数字来创建正则表达式匹配流。</p><p>本文的示例代码可以在GitHub上找到。</p>`,20),o=[p];function c(l,r){return e(),n("div",null,o)}const u=a(t,[["render",c],["__file","2024-06-30-Creating Stream of Regex Matches.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Creating%20Stream%20of%20Regex%20Matches.html","title":"创建正则表达式匹配流","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Regex"],"tag":["Java Stream","Regex Match"],"head":[["meta",{"name":"keywords","content":"Java, Regex, Stream, Match, Regular Expressions"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Creating%20Stream%20of%20Regex%20Matches.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"创建正则表达式匹配流"}],["meta",{"property":"og:description","content":"创建正则表达式匹配流 正则表达式（regex）是模式匹配的强大工具。它们允许我们在字符串中找到特定的模式，这对于数据提取、验证和转换等任务非常有用。 在本教程中，我们将通过一个简单的例子探索如何使用正则表达式创建匹配流。 2. 入门 首先，假设我们有一个包含字母和数字的字符串： 我们的目标是使用正则表达式提取这个字符串中的所有数字，然后创建这些匹配项的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T07:26:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java Stream"}],["meta",{"property":"article:tag","content":"Regex Match"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T07:26:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"创建正则表达式匹配流\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T07:26:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"创建正则表达式匹配流 正则表达式（regex）是模式匹配的强大工具。它们允许我们在字符串中找到特定的模式，这对于数据提取、验证和转换等任务非常有用。 在本教程中，我们将通过一个简单的例子探索如何使用正则表达式创建匹配流。 2. 入门 首先，假设我们有一个包含字母和数字的字符串： 我们的目标是使用正则表达式提取这个字符串中的所有数字，然后创建这些匹配项的..."},"headers":[{"level":3,"title":"2. 入门","slug":"_2-入门","link":"#_2-入门","children":[]},{"level":3,"title":"3. 定义正则表达式","slug":"_3-定义正则表达式","link":"#_3-定义正则表达式","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719732378000,"updatedTime":1719732378000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.63,"words":490},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Creating Stream of Regex Matches.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>创建正则表达式匹配流</h1>\\n<p>正则表达式（regex）是模式匹配的强大工具。它们允许我们在字符串中找到特定的模式，这对于数据提取、验证和转换等任务非常有用。</p>\\n<p>在本教程中，我们将通过一个简单的例子探索如何使用正则表达式创建匹配流。</p>\\n<h3>2. 入门</h3>\\n<p>首先，假设我们有一个包含字母和数字的字符串：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> input <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"There are 3 apples and 2 bananas on the table.\\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{u as comp,m as data};
