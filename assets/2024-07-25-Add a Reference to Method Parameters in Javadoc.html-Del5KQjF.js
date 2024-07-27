import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-CBerKIce.js";const t={},o=e('<h1 id="在javadoc中添加方法参数引用" tabindex="-1"><a class="header-anchor" href="#在javadoc中添加方法参数引用"><span>在Javadoc中添加方法参数引用</span></a></h1><p>在Java语言中，我们可以使用Javadoc从Java源代码生成HTML格式的文档。本教程将介绍在Javadoc中添加方法参数引用的不同方式。</p><h2 id="不同的在javadoc中添加方法参数引用的方式" tabindex="-1"><a class="header-anchor" href="#不同的在javadoc中添加方法参数引用的方式"><span>不同的在Javadoc中添加方法参数引用的方式</span></a></h2><p>在这一部分，我们将讨论如何在Javadoc中添加方法参数的引用。我们将看到内联标签<code>{@code}</code>和HTML样式标签<code>&lt;code&gt;</code>在Javadoc中的使用。</p><p>此外，我们将看到<code>{@code}</code>和<code>&lt;code&gt;</code>标签如何处理一些特殊情况：</p><ul><li>显示特殊字符‘<code>&lt;’，‘&gt;</code>’和‘@’</li><li>缩进和换行的处理</li><li>处理HTML代码的转义 — 例如，<code>&amp;lt;</code>转换为符号‘&lt;’</li></ul><h3 id="_2-1-code-标签" tabindex="-1"><a class="header-anchor" href="#_2-1-code-标签"><span>2.1. <code>{@code}</code>标签</span></a></h3><p><code>{@code}</code>是一个内联标签，包含在JDK 1.5中。</p><p><code>{@code}</code>标签以代码字体格式化文本。<code>{@code abc}</code>等同于````````````<code>```````````{@literal abc}`````</code>``````。</p><p><strong>我们不需要手动转义<code>{@code}</code>标签内使用的任何特殊字符。</strong></p><p>当我们使用<code>{@code}</code>标签时，它：</p><ul><li>正确显示‘<code>&lt;’和‘&gt;</code>’</li><li>正确显示‘@’</li><li>不需要通过HTML数字代码转义特殊字符</li><li>更易读且简洁</li></ul><p>让我们在一个类中创建一个简单的方法，并使用<code>{@code}</code>标签添加一些Javadoc：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**\n  * 这个方法接受一个<span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">String</span></span></span><span class="token punctuation">}</span>\n  * 并在给定的列表<span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````</span></span><span class="token punctuation">}</span>中搜索\n  *\n  * <span class="token keyword">@param</span> <span class="token parameter">name</span> 人的名字\n  * <span class="token keyword">@param</span> <span class="token parameter">avengers</span> 复仇者名单列表\n  * <span class="token keyword">@return</span> 如果找到返回true，否则返回false\n  */</span>\n<span class="token keyword">public</span> <span class="token class-name">Boolean</span> <span class="token function">isAvenger</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` avengers<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> avengers<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在这里，我们可以看到我们不需要转义特殊字符‘<code>&lt;’和‘&gt;</code>’。</strong></p><p>生成的Javadoc将渲染HTML输出为：</p><p><strong><img src="https://www.baeldung.com/wp-content/uploads/2021/09/method1-1024x482-1.png" alt="img" loading="lazy"></strong></p><p><strong>同样，我们可以看到我们不需要转义‘@’字符：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**\n  * 这是显示@使用示例，无需任何手动转义。\n  * <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token annotation punctuation">@AnyAnnotation</span></span></span><span class="token punctuation">}</span>\n  */</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">javadocTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将渲染为HTML Javadoc为：</p><p><strong><img src="https://www.baeldung.com/wp-content/uploads/2021/09/method2-1024x320-1.png" alt="img" loading="lazy"></strong></p><p>在Javadoc中的多行代码片段的情况下，<code>{@code}</code>不会保持缩进和换行。为了克服这个问题，我们可以使用HTML标签<code>&lt;pre&gt;</code>与<code>{@code}</code>一起使用。然而，在这种情况下我们需要转义‘@’字符。</p><h3 id="_2-2-code-标签" tabindex="-1"><a class="header-anchor" href="#_2-2-code-标签"><span>2.2. <code>&lt;code&gt;</code>标签</span></a></h3><p><code>&lt;code&gt;</code>是Javadoc支持的HTML样式标签。</p><p>当我们使用<code>&lt;code&gt;</code>标签时，它：</p><ul><li>不正确显示‘<code>&lt;’和‘&gt;</code>’</li><li>需要通过HTML数字代码转义特殊字符</li><li>不那么易读</li></ul><p>让我们再次考虑同一个例子。我们可以看到<strong>生成的Javadoc HTML缺少了我们段落中_List_后的_<code>&lt;String&gt;</code>_参数化类型：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**\n  * 这个方法接受一个```````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">```````````<span class="token class-name">String</span>`````</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>`````\n  * 并在给定的```````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">```````````<span class="token class-name">List</span>```````</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>String</span><span class="token punctuation">&gt;</span></span><span class="token code language-java">````````````</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>`````中搜索\n  *\n  * <span class="token keyword">@param</span> <span class="token parameter">name</span> 人的名字\n  * <span class="token keyword">@param</span> <span class="token parameter">avengers</span> 复仇者名单列表\n  * <span class="token keyword">@return</span> 如果找到返回true，否则返回false\n  */</span>\n<span class="token keyword">public</span> <span class="token class-name">Boolean</span> <span class="token function">isAvenger</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` avengers<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> avengers<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><img src="https://www.baeldung.com/wp-content/uploads/2021/09/method3-1024x459-1.png" alt="img" loading="lazy"></strong></p><p>在这里，如果我们在方法注释中转义特殊字符‘<code>&lt;’和‘&gt;</code>’，那么它将在Javadoc中正确渲染_<code>&lt;String&gt;</code>_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**\n  * 这个方法接受一个```````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">```````````<span class="token class-name">String</span>`````</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>`````\n  * 并在给定的```````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">```````````<span class="token class-name">List</span></span><span class="token entity named-entity" title="&lt;">&amp;lt;</span><span class="token code language-java"><span class="token class-name">String</span></span><span class="token entity named-entity" title="&gt;">&amp;gt;</span><span class="token code language-java">`````</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>`````中搜索\n  *\n  * <span class="token keyword">@param</span> <span class="token parameter">name</span> 人的名字\n  * <span class="token keyword">@param</span> <span class="token parameter">avengers</span> 复仇者名单列表\n  * <span class="token keyword">@return</span> 如果找到返回true，否则返回false\n  */</span>\n<span class="token keyword">public</span> <span class="token class-name">Boolean</span> <span class="token function">isAvenger</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` avengers<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> avengers<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><img src="https://www.baeldung.com/wp-content/uploads/2021/09/method4-1024x482-1.png" alt="img" loading="lazy"></strong></p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本教程中，我们首先讨论了如何在Javadoc中使用<code>{@code}</code>和<code>&lt;code&gt;</code>来引用方法参数。然后我们描述了这些标签对特殊字符的处理。总之，我们现在理解了如何在Javadoc中添加方法参数的引用，并且<strong>我们可以看到<code>{@code}</code>在任何时候都比<code>&lt;code&gt;</code>更好</strong>。</p>',34),c=[o];function p(l,d){return s(),n("div",null,c)}const u=a(t,[["render",p],["__file","2024-07-25-Add a Reference to Method Parameters in Javadoc.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-25/2024-07-25-Add%20a%20Reference%20to%20Method%20Parameters%20in%20Javadoc.html","title":"在Javadoc中添加方法参数引用","lang":"zh-CN","frontmatter":{"date":"2021-09-01T00:00:00.000Z","category":["Java","Javadoc"],"tag":["Java","Javadoc","Method Parameters"],"head":[["meta",{"name":"keywords","content":"Java, Javadoc, Method Parameters, Documentation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-25/2024-07-25-Add%20a%20Reference%20to%20Method%20Parameters%20in%20Javadoc.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Javadoc中添加方法参数引用"}],["meta",{"property":"og:description","content":"在Javadoc中添加方法参数引用 在Java语言中，我们可以使用Javadoc从Java源代码生成HTML格式的文档。本教程将介绍在Javadoc中添加方法参数引用的不同方式。 不同的在Javadoc中添加方法参数引用的方式 在这一部分，我们将讨论如何在Javadoc中添加方法参数的引用。我们将看到内联标签{@code}和HTML样式标签<code>..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2021/09/method1-1024x482-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-25T18:53:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Javadoc"}],["meta",{"property":"article:tag","content":"Method Parameters"}],["meta",{"property":"article:published_time","content":"2021-09-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-25T18:53:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Javadoc中添加方法参数引用\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2021/09/method1-1024x482-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/09/method2-1024x320-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/09/method3-1024x459-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/09/method4-1024x482-1.png\\"],\\"datePublished\\":\\"2021-09-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-25T18:53:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Javadoc中添加方法参数引用 在Java语言中，我们可以使用Javadoc从Java源代码生成HTML格式的文档。本教程将介绍在Javadoc中添加方法参数引用的不同方式。 不同的在Javadoc中添加方法参数引用的方式 在这一部分，我们将讨论如何在Javadoc中添加方法参数的引用。我们将看到内联标签{@code}和HTML样式标签<code>..."},"headers":[{"level":2,"title":"不同的在Javadoc中添加方法参数引用的方式","slug":"不同的在javadoc中添加方法参数引用的方式","link":"#不同的在javadoc中添加方法参数引用的方式","children":[{"level":3,"title":"2.1. {@code}标签","slug":"_2-1-code-标签","link":"#_2-1-code-标签","children":[]},{"level":3,"title":"2.2. <code>标签","slug":"_2-2-code-标签","link":"#_2-2-code-标签","children":[]}]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1721933603000,"updatedTime":1721933603000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.06,"words":918},"filePathRelative":"posts/baeldung/2024-07-25/2024-07-25-Add a Reference to Method Parameters in Javadoc.md","localizedDate":"2021年9月1日","excerpt":"\\n<p>在Java语言中，我们可以使用Javadoc从Java源代码生成HTML格式的文档。本教程将介绍在Javadoc中添加方法参数引用的不同方式。</p>\\n<h2>不同的在Javadoc中添加方法参数引用的方式</h2>\\n<p>在这一部分，我们将讨论如何在Javadoc中添加方法参数的引用。我们将看到内联标签<code>{@code}</code>和HTML样式标签<code>&lt;code&gt;</code>在Javadoc中的使用。</p>\\n<p>此外，我们将看到<code>{@code}</code>和<code>&lt;code&gt;</code>标签如何处理一些特殊情况：</p>","autoDesc":true}');export{u as comp,v as data};
