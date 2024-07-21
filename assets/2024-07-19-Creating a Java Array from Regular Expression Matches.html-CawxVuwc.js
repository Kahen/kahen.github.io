import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-CXN34Kw1.js";const e={},p=t(`<hr><h1 id="java中使用正则表达式匹配并创建数组" tabindex="-1"><a class="header-anchor" href="#java中使用正则表达式匹配并创建数组"><span>Java中使用正则表达式匹配并创建数组</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将学习如何从正则表达式（regex）输出中创建一个数组。</p><h2 id="_2-引言" tabindex="-1"><a class="header-anchor" href="#_2-引言"><span>2. 引言</span></a></h2><p>以我们的示例为例，我们将解析一个长字符串。我们将找到包含10位数字的电话号码的模式。然后，我们将生成的输出作为数组。</p><p>Oracle为其正则表达式实现提供了_java.util.regex_包。我们将使用此包中可用的类进行我们的演示。一旦我们找到匹配项，我们将使用该输出并创建一个数组。</p><p>数组是固定大小的变量。在使用它们之前，我们必须声明它们的大小。如果数组没有正确实现，也可能会浪费内存。因此，我们首先从_List_开始，然后动态地将_List_转换为数组。</p><h2 id="_3-实现" tabindex="-1"><a class="header-anchor" href="#_3-实现"><span>3. 实现</span></a></h2><p>让我们逐步通过代码来实现这个解决方案。首先，让我们创建一个_ArrayList_来存储匹配项：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` matchesList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们将按照以下方式存储一个嵌入电话号码的长字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> stringToSearch <span class="token operator">=</span>
  <span class="token string">&quot;7801111111blahblah  780222222 mumbojumbo7803333333 thisnthat 7804444444&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用_Pattern_类的静态工厂方法_compile()_。它返回一个等效的_regex_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Pattern</span> p1 <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;780{1}\\\\d{7}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一旦我们有了_Pattern_对象，我们就使用_matcher()_方法创建一个_Matcher_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Matcher</span> m1 <span class="token operator">=</span> p1<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>stringToSearch<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，我们可以使用_Matcher_类的_find()<em>方法，如果找到匹配项，它将返回一个_boolean</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">while</span> <span class="token punctuation">(</span>m1<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    matchesList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>m1<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们刚刚使用的_group()<em>方法在_Matcher_类中。它产生一个代表匹配模式的_String</em>。</p><p>要将_matchesList_转换为数组，我们找到我们匹配的项目数量。然后我们在使用它创建一个新数组来存储结果时使用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> sizeOfNewArray <span class="token operator">=</span> matchesList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> newArrayOfMatches<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span>sizeOfNewArray<span class="token punctuation">]</span><span class="token punctuation">;</span>
matchesList<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span>newArrayOfMatches<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们看看我们的代码如何通过一些示例工作。如果我们传递一个包含四个匹配模式的_String_，我们的代码将产生一个新的_String_数组，包含这四个匹配项：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">RegexMatches</span> rm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegexMatches</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> actual<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> rm<span class="token punctuation">.</span><span class="token function">regexMatch</span><span class="token punctuation">(</span><span class="token string">&quot;7801111211fsdafasdfa  7802222222  sadfsadfsda7803333333 sadfdasfasd 7804444444&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token string">&quot;7801111211&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;7802222222&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;7803333333&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;7804444444&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span> actual<span class="token punctuation">,</span> <span class="token string">&quot;success&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们传递一个没有匹配项的_String_，我们将得到一个空的_String_数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> actual<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> rm<span class="token punctuation">.</span><span class="token function">regexMatch</span><span class="token punctuation">(</span><span class="token string">&quot;78011111fsdafasdfa  780222222  sadfsadfsda78033333 sadfdasfasd 7804444&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> actual<span class="token punctuation">,</span> <span class="token string">&quot;success&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本教程中，我们学习了如何在Java中的文本字符串中查找模式。我们还找到了一种将输出列表在数组中的方法。</p><p>源代码可在GitHub上获取。</p>`,29),c=[p];function o(i,l){return s(),n("div",null,c)}const d=a(e,[["render",o],["__file","2024-07-19-Creating a Java Array from Regular Expression Matches.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Creating%20a%20Java%20Array%20from%20Regular%20Expression%20Matches.html","title":"Java中使用正则表达式匹配并创建数组","lang":"zh-CN","frontmatter":{"date":"2024-07-19T00:00:00.000Z","category":["Java","Regular Expressions"],"tag":["Java","Regex","Array"],"head":[["meta",{"name":"keywords","content":"Java, Regular Expressions, Array"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Creating%20a%20Java%20Array%20from%20Regular%20Expression%20Matches.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中使用正则表达式匹配并创建数组"}],["meta",{"property":"og:description","content":"Java中使用正则表达式匹配并创建数组 1. 概述 在本教程中，我们将学习如何从正则表达式（regex）输出中创建一个数组。 2. 引言 以我们的示例为例，我们将解析一个长字符串。我们将找到包含10位数字的电话号码的模式。然后，我们将生成的输出作为数组。 Oracle为其正则表达式实现提供了_java.util.regex_包。我们将使用此包中可用的类..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T16:12:17.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Regex"}],["meta",{"property":"article:tag","content":"Array"}],["meta",{"property":"article:published_time","content":"2024-07-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T16:12:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中使用正则表达式匹配并创建数组\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T16:12:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中使用正则表达式匹配并创建数组 1. 概述 在本教程中，我们将学习如何从正则表达式（regex）输出中创建一个数组。 2. 引言 以我们的示例为例，我们将解析一个长字符串。我们将找到包含10位数字的电话号码的模式。然后，我们将生成的输出作为数组。 Oracle为其正则表达式实现提供了_java.util.regex_包。我们将使用此包中可用的类..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 引言","slug":"_2-引言","link":"#_2-引言","children":[]},{"level":2,"title":"3. 实现","slug":"_3-实现","link":"#_3-实现","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721405537000,"updatedTime":1721405537000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.31,"words":692},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Creating a Java Array from Regular Expression Matches.md","localizedDate":"2024年7月19日","excerpt":"<hr>\\n<h1>Java中使用正则表达式匹配并创建数组</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将学习如何从正则表达式（regex）输出中创建一个数组。</p>\\n<h2>2. 引言</h2>\\n<p>以我们的示例为例，我们将解析一个长字符串。我们将找到包含10位数字的电话号码的模式。然后，我们将生成的输出作为数组。</p>\\n<p>Oracle为其正则表达式实现提供了_java.util.regex_包。我们将使用此包中可用的类进行我们的演示。一旦我们找到匹配项，我们将使用该输出并创建一个数组。</p>\\n<p>数组是固定大小的变量。在使用它们之前，我们必须声明它们的大小。如果数组没有正确实现，也可能会浪费内存。因此，我们首先从_List_开始，然后动态地将_List_转换为数组。</p>","autoDesc":true}');export{d as comp,k as data};
