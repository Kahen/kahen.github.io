import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-Ckd2YV4o.js";const t={},p=e(`<h1 id="使用mapstruct和java在另一个mapper中使用mapper" tabindex="-1"><a class="header-anchor" href="#使用mapstruct和java在另一个mapper中使用mapper"><span>使用MapStruct和Java在另一个Mapper中使用Mapper</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>MapStruct 是一个库，它帮助我们在处理 Java Beans 映射时最小化样板代码。它仅使用提供的接口生成映射器。</p><p>在本教程中，我们将学习如何构建由简单映射器构建的复杂映射器并映射嵌套结构。</p><h2 id="_2-数据" tabindex="-1"><a class="header-anchor" href="#_2-数据"><span>2. 数据</span></a></h2><p>我们将把 <em>Article</em> 类映射到 DTO 实例。<em>Article</em> 包含一些简单字段，但也包含类型为 <em>Person</em> 的作者字段。我们也将把这个字段映射到相应的 DTO。以下是源类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Getter</span>
<span class="token annotation punctuation">@Setter</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Article</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Person</span> author<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Getter</span>
<span class="token annotation punctuation">@Setter</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以及目标类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Getter</span>
<span class="token annotation punctuation">@Setter</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ArticleDTO</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">PersonDTO</span> author<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Getter</span>
<span class="token annotation punctuation">@Setter</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PersonDTO</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-作为方法定义嵌套映射器" tabindex="-1"><a class="header-anchor" href="#_3-作为方法定义嵌套映射器"><span>3. 作为方法定义嵌套映射器</span></a></h2><p>让我们从定义一个简单的映射器开始，它将映射我们的 <em>Article</em> 类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ArticleMapper</span> <span class="token punctuation">{</span>
    <span class="token class-name">ArticleMapper</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token class-name">Mappers</span><span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">ArticleMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">ArticleDTO</span> <span class="token function">articleToArticleDto</span><span class="token punctuation">(</span><span class="token class-name">Article</span> article<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个映射器将正确映射源类中的所有字面字段，但不会映射 <em>author</em> 字段，因为它不知道如何映射。让我们定义 <em>PersonMapper</em> 接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PersonMapper</span> <span class="token punctuation">{</span>
    <span class="token class-name">PersonMapper</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token class-name">Mappers</span><span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">PersonMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">PersonDTO</span> <span class="token function">personToPersonDTO</span><span class="token punctuation">(</span><span class="token class-name">Person</span> person<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以在 <em>ArticleMapper</em> 中创建一个方法，定义从 <em>Person</em> 到 <em>PersonDTO</em> 的映射：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">default</span> <span class="token class-name">PersonDTO</span> <span class="token function">personToPersonDto</span><span class="token punctuation">(</span><span class="token class-name">Person</span> person<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Mappers</span><span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">PersonMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">personToPersonDTO</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MapStruct 将自动获取这个方法，并使用它来映射 <em>author</em> 字段。</p><h2 id="_4-使用现有的映射器" tabindex="-1"><a class="header-anchor" href="#_4-使用现有的映射器"><span>4. 使用现有的映射器</span></a></h2><p>虽然上述解决方案有效，但有点繁琐。我们可以直接在 <em>@Mapper</em> 注解中使用“uses”参数指向我们想要使用的映射器，而不是定义一个新方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mapper</span><span class="token punctuation">(</span><span class="token keyword">uses</span> <span class="token operator">=</span> <span class="token class-name">PersonMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ArticleUsingPersonMapper</span> <span class="token punctuation">{</span>
    <span class="token class-name">ArticleUsingPersonMapper</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token class-name">Mappers</span><span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">ArticleUsingPersonMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">ArticleDTO</span> <span class="token function">articleToArticleDto</span><span class="token punctuation">(</span><span class="token class-name">Article</span> article<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何在另一个映射器中使用 MapStruct 映射器。如常，代码示例可以在 GitHub 上找到。</p><p>OK</p>`,25),c=[p];function o(l,i){return s(),n("div",null,c)}const d=a(t,[["render",o],["__file","2024-07-07-Use Mapper in Another Mapper with Mapstruct and Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Use%20Mapper%20in%20Another%20Mapper%20with%20Mapstruct%20and%20Java.html","title":"使用MapStruct和Java在另一个Mapper中使用Mapper","lang":"zh-CN","frontmatter":{"date":"2024-07-07T00:00:00.000Z","category":["Java","MapStruct"],"tag":["编程","映射"],"head":[["meta",{"name":"keywords","content":"MapStruct, Java, 映射, DTO, 嵌套结构, 教程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Use%20Mapper%20in%20Another%20Mapper%20with%20Mapstruct%20and%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用MapStruct和Java在另一个Mapper中使用Mapper"}],["meta",{"property":"og:description","content":"使用MapStruct和Java在另一个Mapper中使用Mapper 1. 概述 MapStruct 是一个库，它帮助我们在处理 Java Beans 映射时最小化样板代码。它仅使用提供的接口生成映射器。 在本教程中，我们将学习如何构建由简单映射器构建的复杂映射器并映射嵌套结构。 2. 数据 我们将把 Article 类映射到 DTO 实例。Arti..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T12:51:48.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"编程"}],["meta",{"property":"article:tag","content":"映射"}],["meta",{"property":"article:published_time","content":"2024-07-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T12:51:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用MapStruct和Java在另一个Mapper中使用Mapper\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-07T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T12:51:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用MapStruct和Java在另一个Mapper中使用Mapper 1. 概述 MapStruct 是一个库，它帮助我们在处理 Java Beans 映射时最小化样板代码。它仅使用提供的接口生成映射器。 在本教程中，我们将学习如何构建由简单映射器构建的复杂映射器并映射嵌套结构。 2. 数据 我们将把 Article 类映射到 DTO 实例。Arti..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 数据","slug":"_2-数据","link":"#_2-数据","children":[]},{"level":2,"title":"3. 作为方法定义嵌套映射器","slug":"_3-作为方法定义嵌套映射器","link":"#_3-作为方法定义嵌套映射器","children":[]},{"level":2,"title":"4. 使用现有的映射器","slug":"_4-使用现有的映射器","link":"#_4-使用现有的映射器","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720356708000,"updatedTime":1720356708000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.73,"words":519},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Use Mapper in Another Mapper with Mapstruct and Java.md","localizedDate":"2024年7月7日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>MapStruct 是一个库，它帮助我们在处理 Java Beans 映射时最小化样板代码。它仅使用提供的接口生成映射器。</p>\\n<p>在本教程中，我们将学习如何构建由简单映射器构建的复杂映射器并映射嵌套结构。</p>\\n<h2>2. 数据</h2>\\n<p>我们将把 <em>Article</em> 类映射到 DTO 实例。<em>Article</em> 包含一些简单字段，但也包含类型为 <em>Person</em> 的作者字段。我们也将把这个字段映射到相应的 DTO。以下是源类：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Getter</span>\\n<span class=\\"token annotation punctuation\\">@Setter</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Article</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">int</span> id<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Person</span> author<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
