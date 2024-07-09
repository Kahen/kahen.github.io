import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-COaDJFIk.js";const t={},p=e('<h1 id="如何在javadoc中记录泛型类型参数" tabindex="-1"><a class="header-anchor" href="#如何在javadoc中记录泛型类型参数"><span>如何在Javadoc中记录泛型类型参数</span></a></h1><p>泛型在Java中提供了灵活性，它允许在定义类、构造器、接口或方法时将类型作为参数。@param 标签是编写Java文档时记录泛型类型参数的标准标签。</p><p>在本教程中，我们将探讨使用@param 标签记录Java中泛型类型参数的最佳实践。</p><h2 id="param-标签" tabindex="-1"><a class="header-anchor" href="#param-标签"><span>@param 标签</span></a></h2><p>@param 标签是记录公共方法、构造器、类等的参数和泛型类型参数的标准标签。</p><p>一个良好的Javadoc注释必须正确描述方法参数，以便易于理解。以下是基本语法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**\n * <span class="token keyword">@param</span> [参数名称] [参数描述]\n */</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>语法以@param 标签开始，后面是方法或构造器签名中的参数名称的占位符。最后，我们有一个占位符来描述参数的目的。</p><p>对于泛型类型，语法有轻微的变化：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**\n * <span class="token keyword">@param</span> [`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>参数类型</span><span class="token punctuation">&gt;</span></span>`] [参数类型描述]\n */</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数类型必须放在尖括号内。然后，我们描述类型参数。</p><h2 id="使用带泛型类型的-param-标签" tabindex="-1"><a class="header-anchor" href="#使用带泛型类型的-param-标签"><span>使用带泛型类型的@param 标签</span></a></h2><p>让我们看一个使用带泛型类型参数的@param 的示例代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**\n *\n * <span class="token keyword">@param</span> ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>T</span><span class="token punctuation">&gt;</span></span>``````` 第一个值的类型。\n * <span class="token keyword">@param</span> `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>S</span><span class="token punctuation">&gt;</span></span>````` 第二个值的类型。\n */</span>\n<span class="token keyword">class</span> <span class="token class-name">Pair</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token class-name">S</span><span class="token punctuation">&gt;</span></span>` <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token class-name">T</span> first<span class="token punctuation">;</span>\n    <span class="token keyword">public</span> <span class="token class-name">S</span> second<span class="token punctuation">;</span>\n    <span class="token class-name">Pair</span><span class="token punctuation">(</span><span class="token class-name">T</span> a<span class="token punctuation">,</span> <span class="token class-name">S</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        first <span class="token operator">=</span> a<span class="token punctuation">;</span>\n        second <span class="token operator">=</span> b<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个名为_Pair_的新泛型类，并为类定义了两种类型。接下来，我们使用带有类型参数的@param 标签，然后描述它。</p><p><strong>值得注意的是，当记录泛型类时，类型参数必须放在尖括号内。</strong></p><p>这是生成的Javadoc：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/11/javadoc_comment_for_generic_type_parameter.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>此外，让我们编写Javadoc注释来描述构造器参数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**\n * 用指定的值构造一个新的Pair对象。\n *\n * <span class="token keyword">@param</span> <span class="token parameter">a</span> 第一个值。\n * <span class="token keyword">@param</span> <span class="token parameter">b</span> 第二个值。\n */</span>\n<span class="token class-name">Pair</span><span class="token punctuation">(</span><span class="token class-name">T</span> a<span class="token punctuation">,</span> <span class="token class-name">S</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    first <span class="token operator">=</span> a<span class="token punctuation">;</span>\n    second <span class="token operator">=</span> b<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们使用@param 标签描述构造器参数。与泛型类型参数不同，参数名称不在尖括号内。这在编写Javadoc注释时区分了类型参数和普通参数。</p><h2 id="可能的错误" tabindex="-1"><a class="header-anchor" href="#可能的错误"><span>可能的错误</span></a></h2><p>在为泛型类型生成Javadoc时可能会出现错误。<strong>首先，忘记在Javadoc注释的开头添加@param 标签会生成未知标签错误</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**\n * ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>T</span><span class="token punctuation">&gt;</span></span>``````` 第一个值的类型。\n * <span class="token keyword">@param</span> `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>S</span><span class="token punctuation">&gt;</span></span>````` 第二个值的类型。\n */</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述Javadoc注释由于第一句缺少@param 标签而生成错误消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>error<span class="token operator">:</span> unknown tag<span class="token operator">:</span> <span class="token class-name">T</span> <span class="token operator">*</span> ```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>``````` <span class="token class-name">The</span> type of the first value in the pair\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>接下来，当我们在描述中引入相同或另一种类型的参数时，可能会发生错误</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**\n * <span class="token keyword">@param</span> ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>T</span><span class="token punctuation">&gt;</span></span>``````` Pair`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>T,S</span><span class="token punctuation">&gt;</span></span>`````中第一个值的类型。\n * <span class="token keyword">@param</span> `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>S</span><span class="token punctuation">&gt;</span></span>````` Pair`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>T,S</span><span class="token punctuation">&gt;</span></span>`````中第二个值的类型。\n */</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们在描述中指定了泛型类名。然而，Javadoc生成器将描述中的标签视为HTML标签。它还期望一个闭合标签。</p><p>这是错误消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>error<span class="token operator">:</span> malformed <span class="token constant">HTML</span> <span class="token operator">*</span> <span class="token annotation punctuation">@param</span> ```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>``````` <span class="token class-name">The</span> type of the first value in the <span class="token class-name">Pair</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span><span class="token class-name">S</span><span class="token punctuation">&gt;</span></span>`````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们通过转义尖括号来解决这个错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**\n * <span class="token keyword">@param</span> ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>T</span><span class="token punctuation">&gt;</span></span>``````` Pair<span class="token entity named-entity" title="&lt;">&amp;lt;</span>T,S<span class="token entity named-entity" title="&gt;">&amp;gt;</span>中第一个值的类型。\n * <span class="token keyword">@param</span> `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>S</span><span class="token punctuation">&gt;</span></span>````` Pair<span class="token entity named-entity" title="&lt;">&amp;lt;</span>T,S<span class="token entity named-entity" title="&gt;">&amp;gt;</span>中第二个值的类型。\n */</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，尖括号“<code>&lt;”和“&gt;</code>”分别被转义为“&lt;”和“&gt;”，以避免HTML解析错误。</p><p>或者，我们可以通过在描述中使用@code 标签来解决这个错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**\n * <span class="token keyword">@param</span> ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>T</span><span class="token punctuation">&gt;</span></span>``````` <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">Pair</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span><span class="token class-name">S</span><span class="token punctuation">&gt;</span></span>`````</span></span><span class="token punctuation">}</span>中第一个值的类型。\n * <span class="token keyword">@param</span> `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>S</span><span class="token punctuation">&gt;</span></span>````` <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">Pair</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span><span class="token class-name">S</span><span class="token punctuation">&gt;</span></span>`````</span></span><span class="token punctuation">}</span>中第二个值的类型。\n */</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用@code 标签看起来更干净，更适合这个用例。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们学习了如何使用@param 标签记录泛型类型参数。此外，我们还看到了可能遇到的错误以及如何解决它们。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>',40),c=[p];function o(l,i){return s(),n("div",null,c)}const u=a(t,[["render",o],["__file","2024-06-28-How to Document Generic Type Parameters in Javadoc.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-How%20to%20Document%20Generic%20Type%20Parameters%20in%20Javadoc.html","title":"如何在Javadoc中记录泛型类型参数","lang":"zh-CN","frontmatter":{"date":"2023-11-01T00:00:00.000Z","category":["Java"],"tag":["JavaDoc","Generics"],"head":[["meta",{"name":"keywords","content":"JavaDoc, Generics, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-How%20to%20Document%20Generic%20Type%20Parameters%20in%20Javadoc.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Javadoc中记录泛型类型参数"}],["meta",{"property":"og:description","content":"如何在Javadoc中记录泛型类型参数 泛型在Java中提供了灵活性，它允许在定义类、构造器、接口或方法时将类型作为参数。@param 标签是编写Java文档时记录泛型类型参数的标准标签。 在本教程中，我们将探讨使用@param 标签记录Java中泛型类型参数的最佳实践。 @param 标签 @param 标签是记录公共方法、构造器、类等的参数和泛型类..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/11/javadoc_comment_for_generic_type_parameter.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T02:55:17.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JavaDoc"}],["meta",{"property":"article:tag","content":"Generics"}],["meta",{"property":"article:published_time","content":"2023-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T02:55:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Javadoc中记录泛型类型参数\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/11/javadoc_comment_for_generic_type_parameter.png\\"],\\"datePublished\\":\\"2023-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T02:55:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Javadoc中记录泛型类型参数 泛型在Java中提供了灵活性，它允许在定义类、构造器、接口或方法时将类型作为参数。@param 标签是编写Java文档时记录泛型类型参数的标准标签。 在本教程中，我们将探讨使用@param 标签记录Java中泛型类型参数的最佳实践。 @param 标签 @param 标签是记录公共方法、构造器、类等的参数和泛型类..."},"headers":[{"level":2,"title":"@param 标签","slug":"param-标签","link":"#param-标签","children":[]},{"level":2,"title":"使用带泛型类型的@param 标签","slug":"使用带泛型类型的-param-标签","link":"#使用带泛型类型的-param-标签","children":[]},{"level":2,"title":"可能的错误","slug":"可能的错误","link":"#可能的错误","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719543317000,"updatedTime":1719543317000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.36,"words":1007},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-How to Document Generic Type Parameters in Javadoc.md","localizedDate":"2023年11月1日","excerpt":"\\n<p>泛型在Java中提供了灵活性，它允许在定义类、构造器、接口或方法时将类型作为参数。@param 标签是编写Java文档时记录泛型类型参数的标准标签。</p>\\n<p>在本教程中，我们将探讨使用@param 标签记录Java中泛型类型参数的最佳实践。</p>\\n<h2>@param 标签</h2>\\n<p>@param 标签是记录公共方法、构造器、类等的参数和泛型类型参数的标准标签。</p>\\n<p>一个良好的Javadoc注释必须正确描述方法参数，以便易于理解。以下是基本语法：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token doc-comment comment\\">/**\\n * <span class=\\"token keyword\\">@param</span> [参数名称] [参数描述]\\n */</span>\\n</code></pre></div>","autoDesc":true}');export{u as comp,m as data};
