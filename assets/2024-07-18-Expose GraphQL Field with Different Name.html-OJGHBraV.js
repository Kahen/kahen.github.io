import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-C4eFoh0f.js";const p={},e=t(`<hr><h1 id="graphql字段名称不同" tabindex="-1"><a class="header-anchor" href="#graphql字段名称不同"><span>GraphQL字段名称不同</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>GraphQL 已被广泛用作网络服务中的通信模式。<strong>GraphQL 的基本前提是通过客户端应用程序灵活使用。</strong></p><p>在本教程中，我们将探讨灵活性的另一个方面。我们还将探索如何以不同的名称公开 GraphQL 字段。</p><h2 id="_2-graphql-schema" tabindex="-1"><a class="header-anchor" href="#_2-graphql-schema"><span>2. GraphQL Schema</span></a></h2><p>让我们以一个拥有不同《作者》的《帖子》的博客为例。GraphQL 模式看起来像这样：</p><div class="language-graphql line-numbers-mode" data-ext="graphql" data-title="graphql"><pre class="language-graphql"><code><span class="token keyword">query</span> <span class="token punctuation">{</span>
    <span class="token property-query">recentPosts</span><span class="token punctuation">(</span><span class="token attr-name">count</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token attr-name">offset</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token property">id</span>
        <span class="token property">title</span>
        <span class="token property">text</span>
        <span class="token property">category</span>
        <span class="token object">author</span> <span class="token punctuation">{</span>
            <span class="token property">id</span>
            <span class="token property">name</span>
            <span class="token property">thumbnail</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">Post</span> <span class="token punctuation">{</span>
    <span class="token attr-name">id</span><span class="token punctuation">:</span> <span class="token scalar">ID</span><span class="token operator">!</span>
    <span class="token attr-name">title</span><span class="token punctuation">:</span> <span class="token scalar">String</span><span class="token operator">!</span>
    <span class="token attr-name">text</span><span class="token punctuation">:</span> <span class="token scalar">String</span><span class="token operator">!</span>
    <span class="token attr-name">category</span><span class="token punctuation">:</span> <span class="token scalar">String</span>
    <span class="token attr-name">authorId</span><span class="token punctuation">:</span> <span class="token class-name">Author</span><span class="token operator">!</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">Author</span> <span class="token punctuation">{</span>
    <span class="token attr-name">id</span><span class="token punctuation">:</span> <span class="token scalar">ID</span><span class="token operator">!</span>
    <span class="token attr-name">name</span><span class="token punctuation">:</span> <span class="token scalar">String</span><span class="token operator">!</span>
    <span class="token attr-name">thumbnail</span><span class="token punctuation">:</span> <span class="token scalar">String</span>
    <span class="token attr-name">posts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token class-name">Post</span><span class="token punctuation">]</span><span class="token operator">!</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里我们可以获取最近的帖子。<strong>每个 <em>帖子</em> 都会伴随其 <em>作者</em>。</strong> 查询的结果如下：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;recentPosts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Post00&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Post 0:0&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Post 0 + by author 0&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;category&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
                <span class="token property">&quot;author&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Author0&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Author 0&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;thumbnail&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http://example.com/authors/0&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-以不同的名称公开-graphql-字段" tabindex="-1"><a class="header-anchor" href="#_3-以不同的名称公开-graphql-字段"><span>3. 以不同的名称公开 GraphQL 字段</span></a></h2><p>客户端应用程序可能需要使用字段 <em>first_author</em>。目前它使用的是 <em>author</em>。为了满足这个要求，我们有两个解决方案：</p><ul><li>更改 GraphQL 服务器中的模式定义</li><li>利用 GraphQL 中的别名概念</li></ul><p>让我们逐一看看两者。</p><h3 id="_3-1-更改模式" tabindex="-1"><a class="header-anchor" href="#_3-1-更改模式"><span>3.1. 更改模式</span></a></h3><p>让我们更新 <em>帖子</em> 的模式定义：</p><div class="language-graphql line-numbers-mode" data-ext="graphql" data-title="graphql"><pre class="language-graphql"><code><span class="token keyword">type</span> <span class="token class-name">Post</span> <span class="token punctuation">{</span>
    <span class="token attr-name">id</span><span class="token punctuation">:</span> <span class="token scalar">ID</span><span class="token operator">!</span>
    <span class="token attr-name">title</span><span class="token punctuation">:</span> <span class="token scalar">String</span><span class="token operator">!</span>
    <span class="token attr-name">text</span><span class="token punctuation">:</span> <span class="token scalar">String</span><span class="token operator">!</span>
    <span class="token attr-name">category</span><span class="token punctuation">:</span> <span class="token scalar">String</span>
    <span class="token attr-name">first_author</span><span class="token punctuation">:</span> <span class="token class-name">Author</span><span class="token operator">!</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>author</em> 不是一个简单的字段。它是一个复杂的字段。我们还需要更新处理方法以适应这种变化。</p><p><strong>标记为 @SchemaMapping 的 <em>author(Post post)</em> 方法需要更新为 <em>getFirst_author(Post post)</em>。或者，需要在 @SchemaMapping 中添加 <em>field</em> 属性以反映新的字段名称。</strong></p><p>这是查询：</p><div class="language-graphql line-numbers-mode" data-ext="graphql" data-title="graphql"><pre class="language-graphql"><code><span class="token keyword">query</span><span class="token punctuation">{</span>
    <span class="token property-query">recentPosts</span><span class="token punctuation">(</span><span class="token attr-name">count</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span><span class="token attr-name">offset</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token property">id</span>
        <span class="token property">title</span>
        <span class="token property">text</span>
        <span class="token property">category</span>
        <span class="token object">first_author</span><span class="token punctuation">{</span>
            <span class="token property">id</span>
            <span class="token property">name</span>
            <span class="token property">thumbnail</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询的结果如下：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;recentPosts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Post00&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Post 0:0&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Post 0 + by author 0&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;category&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
                <span class="token property">&quot;first_author&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Author0&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Author 0&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;thumbnail&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http://example.com/authors/0&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个解决方案有两个主要问题：</p><ul><li>它引入了模式和服务器端实现的更改</li><li>它迫使其他客户端应用程序遵循这个更新的模式定义</li></ul><p>这些问题与 GraphQL 提供的灵活性特性相矛盾。</p><h3 id="_3-2-graphql-别名" tabindex="-1"><a class="header-anchor" href="#_3-2-graphql-别名"><span>3.2. GraphQL 别名</span></a></h3><p><strong>在 GraphQL 中，别名让我们可以将字段的结果重命名为我们想要的任何名称，而不需要更改模式定义。</strong> 要在查询中引入别名，别名和冒号符号 (😃 必须在 GraphQL 字段之前。</p><p>这是查询的演示：</p><div class="language-graphql line-numbers-mode" data-ext="graphql" data-title="graphql"><pre class="language-graphql"><code><span class="token keyword">query</span> <span class="token punctuation">{</span>
    <span class="token property-query">recentPosts</span><span class="token punctuation">(</span><span class="token attr-name">count</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span><span class="token attr-name">offset</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token property">id</span>
        <span class="token property">title</span>
        <span class="token property">text</span>
        <span class="token property">category</span>
        <span class="token attr-name">first_author</span><span class="token punctuation">:</span><span class="token object">author</span> <span class="token punctuation">{</span>
            <span class="token property">id</span>
            <span class="token property">name</span>
            <span class="token property">thumbnail</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询的结果如下：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;recentPosts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Post00&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Post 0:0&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Post 0 + by author 0&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;category&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
                <span class="token property">&quot;first_author&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Author0&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Author 0&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;thumbnail&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http://example.com/authors/0&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们注意到查询本身是请求第一篇帖子。另一个客户端应用程序可能会请求 <em>first_post</em> 而不是 <em>recentPosts</em>。再次，别名将派上用场。</p><div class="language-graphql line-numbers-mode" data-ext="graphql" data-title="graphql"><pre class="language-graphql"><code><span class="token keyword">query</span> <span class="token punctuation">{</span>
    <span class="token attr-name">first_post</span><span class="token punctuation">:</span> <span class="token property-query">recentPosts</span><span class="token punctuation">(</span><span class="token attr-name">count</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span><span class="token attr-name">offset</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token property">id</span>
        <span class="token property">title</span>
        <span class="token property">text</span>
        <span class="token property">category</span>
        <span class="token object">author</span> <span class="token punctuation">{</span>
            <span class="token property">id</span>
            <span class="token property">name</span>
            <span class="token property">thumbnail</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询的结果如下：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;first_post&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Post00&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Post 0:0&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Post 0 + by author 0&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;category&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
                <span class="token property">&quot;author&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Author0&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Author 0&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;thumbnail&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http://example.com/authors/0&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这两个例子清楚地展示了使用 GraphQL 的灵活性。</strong> 每个客户端应用程序都可以根据要求进行更新。同时，服务器端的模式定义和实现保持不变。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探讨了两种以不同名称公开 GraphQL 字段的方法。我们通过示例介绍了别名的概念，并解释了为什么这是正确的方法。</p><p>一如既往，本文的示例代码可在 GitHub 上找到。</p>`,40),o=[e];function l(c,i){return a(),s("div",null,o)}const d=n(p,[["render",l],["__file","2024-07-18-Expose GraphQL Field with Different Name.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Expose%20GraphQL%20Field%20with%20Different%20Name.html","title":"GraphQL字段名称不同","lang":"zh-CN","frontmatter":{"date":"2024-07-18T00:00:00.000Z","category":["GraphQL","Web Services"],"tag":["GraphQL","Schema","Aliases"],"head":[["meta",{"name":"keywords","content":"GraphQL, Web Services, Schema, Aliases"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Expose%20GraphQL%20Field%20with%20Different%20Name.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"GraphQL字段名称不同"}],["meta",{"property":"og:description","content":"GraphQL字段名称不同 1. 概述 GraphQL 已被广泛用作网络服务中的通信模式。GraphQL 的基本前提是通过客户端应用程序灵活使用。 在本教程中，我们将探讨灵活性的另一个方面。我们还将探索如何以不同的名称公开 GraphQL 字段。 2. GraphQL Schema 让我们以一个拥有不同《作者》的《帖子》的博客为例。GraphQL 模式..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T06:09:26.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"GraphQL"}],["meta",{"property":"article:tag","content":"Schema"}],["meta",{"property":"article:tag","content":"Aliases"}],["meta",{"property":"article:published_time","content":"2024-07-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T06:09:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"GraphQL字段名称不同\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T06:09:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"GraphQL字段名称不同 1. 概述 GraphQL 已被广泛用作网络服务中的通信模式。GraphQL 的基本前提是通过客户端应用程序灵活使用。 在本教程中，我们将探讨灵活性的另一个方面。我们还将探索如何以不同的名称公开 GraphQL 字段。 2. GraphQL Schema 让我们以一个拥有不同《作者》的《帖子》的博客为例。GraphQL 模式..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. GraphQL Schema","slug":"_2-graphql-schema","link":"#_2-graphql-schema","children":[]},{"level":2,"title":"3. 以不同的名称公开 GraphQL 字段","slug":"_3-以不同的名称公开-graphql-字段","link":"#_3-以不同的名称公开-graphql-字段","children":[{"level":3,"title":"3.1. 更改模式","slug":"_3-1-更改模式","link":"#_3-1-更改模式","children":[]},{"level":3,"title":"3.2. GraphQL 别名","slug":"_3-2-graphql-别名","link":"#_3-2-graphql-别名","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721282966000,"updatedTime":1721282966000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.02,"words":905},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Expose GraphQL Field with Different Name.md","localizedDate":"2024年7月18日","excerpt":"<hr>\\n<h1>GraphQL字段名称不同</h1>\\n<h2>1. 概述</h2>\\n<p>GraphQL 已被广泛用作网络服务中的通信模式。<strong>GraphQL 的基本前提是通过客户端应用程序灵活使用。</strong></p>\\n<p>在本教程中，我们将探讨灵活性的另一个方面。我们还将探索如何以不同的名称公开 GraphQL 字段。</p>\\n<h2>2. GraphQL Schema</h2>\\n<p>让我们以一个拥有不同《作者》的《帖子》的博客为例。GraphQL 模式看起来像这样：</p>\\n<div class=\\"language-graphql\\" data-ext=\\"graphql\\" data-title=\\"graphql\\"><pre class=\\"language-graphql\\"><code><span class=\\"token keyword\\">query</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token property-query\\">recentPosts</span><span class=\\"token punctuation\\">(</span><span class=\\"token attr-name\\">count</span><span class=\\"token punctuation\\">:</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token attr-name\\">offset</span><span class=\\"token punctuation\\">:</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token property\\">id</span>\\n        <span class=\\"token property\\">title</span>\\n        <span class=\\"token property\\">text</span>\\n        <span class=\\"token property\\">category</span>\\n        <span class=\\"token object\\">author</span> <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token property\\">id</span>\\n            <span class=\\"token property\\">name</span>\\n            <span class=\\"token property\\">thumbnail</span>\\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">type</span> <span class=\\"token class-name\\">Post</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token attr-name\\">id</span><span class=\\"token punctuation\\">:</span> <span class=\\"token scalar\\">ID</span><span class=\\"token operator\\">!</span>\\n    <span class=\\"token attr-name\\">title</span><span class=\\"token punctuation\\">:</span> <span class=\\"token scalar\\">String</span><span class=\\"token operator\\">!</span>\\n    <span class=\\"token attr-name\\">text</span><span class=\\"token punctuation\\">:</span> <span class=\\"token scalar\\">String</span><span class=\\"token operator\\">!</span>\\n    <span class=\\"token attr-name\\">category</span><span class=\\"token punctuation\\">:</span> <span class=\\"token scalar\\">String</span>\\n    <span class=\\"token attr-name\\">authorId</span><span class=\\"token punctuation\\">:</span> <span class=\\"token class-name\\">Author</span><span class=\\"token operator\\">!</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">type</span> <span class=\\"token class-name\\">Author</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token attr-name\\">id</span><span class=\\"token punctuation\\">:</span> <span class=\\"token scalar\\">ID</span><span class=\\"token operator\\">!</span>\\n    <span class=\\"token attr-name\\">name</span><span class=\\"token punctuation\\">:</span> <span class=\\"token scalar\\">String</span><span class=\\"token operator\\">!</span>\\n    <span class=\\"token attr-name\\">thumbnail</span><span class=\\"token punctuation\\">:</span> <span class=\\"token scalar\\">String</span>\\n    <span class=\\"token attr-name\\">posts</span><span class=\\"token punctuation\\">:</span> <span class=\\"token punctuation\\">[</span><span class=\\"token class-name\\">Post</span><span class=\\"token punctuation\\">]</span><span class=\\"token operator\\">!</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
