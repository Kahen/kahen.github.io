import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CJGTm_7y.js";const e={},p=t(`<h1 id="graphql-查询中返回-map-的方法" tabindex="-1"><a class="header-anchor" href="#graphql-查询中返回-map-的方法"><span>GraphQL 查询中返回 Map 的方法</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>多年来，GraphQL 已被广泛接受为 Web 服务通信的模式之一。尽管它在使用上丰富且灵活，但在某些场景中可能会带来挑战。其中一个挑战是从查询中返回一个 <em>Map</em>，这本身就是一个挑战，因为 <em>Map</em> 在 GraphQL 中并不是一个类型。</p><p>在本教程中，我们将学习从 GraphQL 查询返回 <em>Map</em> 的技术。</p><h2 id="_2-示例" tabindex="-1"><a class="header-anchor" href="#_2-示例"><span>2. 示例</span></a></h2><p>让我们以一个产品数据库为例，该数据库具有不确定数量的自定义属性。</p><p>作为一个数据库实体的 <em>Product</em>，可能有一些固定的字段，如 <em>name</em>、<em>price</em>、<em>category</em> 等。但是，它也可能有因类别而异的属性。这些属性应该以一种方式返回给客户端，以便保留它们的标识键。</p><p>为此，我们可以将 <em>Map</em> 作为这些属性的类型。</p><p>为了返回一个 Map，我们有三个选项：</p><ul><li>作为 JSON <em>String</em> 返回</li><li>使用 GraphQL 自定义标量类型</li><li>作为 <em>List</em> 的键值对返回</li></ul><p>对于前两个选项，我们将使用以下 GraphQL 查询：</p><div class="language-graphql line-numbers-mode" data-ext="graphql" data-title="graphql"><pre class="language-graphql"><code><span class="token keyword">query</span> <span class="token punctuation">{</span>
    <span class="token property-query">product</span><span class="token punctuation">(</span><span class="token attr-name">id</span><span class="token punctuation">:</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token property">id</span>
        <span class="token property">name</span>
        <span class="token property">description</span>
        <span class="token property">attributes</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数 <em>attributes</em> 将以 <em>Map</em> 格式表示。</p><p>接下来，让我们看看所有三个选项。</p><h3 id="_3-1-json-字符串" tabindex="-1"><a class="header-anchor" href="#_3-1-json-字符串"><span>3.1. JSON 字符串</span></a></h3><p>这是最简单的选项。我们将在 <em>Product</em> 解析器中将 <em>Map</em> 序列化为 JSON <em>String</em> 格式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> attributes <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>product<span class="token punctuation">.</span><span class="token function">getAttributes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>GraphQL 模式本身如下：</p><div class="language-graphql line-numbers-mode" data-ext="graphql" data-title="graphql"><pre class="language-graphql"><code><span class="token keyword">type</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>
    <span class="token attr-name">id</span><span class="token punctuation">:</span> <span class="token scalar">ID</span>
    <span class="token attr-name">name</span><span class="token punctuation">:</span> <span class="token scalar">String</span><span class="token operator">!</span>
    <span class="token attr-name">description</span><span class="token punctuation">:</span> <span class="token scalar">String</span>
    <span class="token attr-name">attributes</span><span class="token punctuation">:</span><span class="token scalar">String</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是实施后的查询结果：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;product&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Product 1&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Product 1 description&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;attributes&quot;</span><span class="token operator">:</span> &quot;<span class="token punctuation">{</span>\\&quot;size\\&quot;<span class="token operator">:</span> <span class="token punctuation">{</span>\\&quot;name\\&quot;<span class="token operator">:</span> \\&quot;Large\\&quot;<span class="token punctuation">,</span>\\&quot;description\\&quot;<span class="token operator">:</span> \\&quot;This is custom attribute description\\&quot;<span class="token punctuation">,</span>\\&quot;unit\\&quot;<span class="token operator">:</span> \\&quot;This is custom attribute unit\\&quot;<span class="token punctuation">}</span><span class="token punctuation">,</span>\\
                   \\&quot;attribute_1\\&quot;<span class="token operator">:</span> <span class="token punctuation">{</span>\\&quot;name\\&quot;<span class="token operator">:</span> \\&quot;Attribute1 name\\&quot;<span class="token punctuation">,</span>\\&quot;description\\&quot;<span class="token operator">:</span> \\&quot;This is custom attribute description\\&quot;<span class="token punctuation">,</span>\\&quot;unit\\&quot;<span class="token operator">:</span> \\&quot;This is custom attribute unit\\&quot;<span class="token punctuation">}</span><span class="token punctuation">}</span>&quot;
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个选项有两个问题。<strong>第一个问题是 JSON 字符串需要在客户端处理成可用格式。第二个问题是我们不能对属性进行子查询。</strong></p><p>为了克服第一个问题，GraphQL 自定义标量类型的第二个选项可以帮助我们。</p><h3 id="_3-2-graphql-自定义标量类型" tabindex="-1"><a class="header-anchor" href="#_3-2-graphql-自定义标量类型"><span>3.2. GraphQL 自定义标量类型</span></a></h3><p>对于实现，我们将使用 Java 中的 Extended Scalars 库来实现 GraphQL。</p><p>首先，我们将在 <em>pom.xml</em> 中包含 graphql-java-extended-scalars 依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`com.graphql-java\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`graphql-java-extended-scalars\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`2022-04-06T00-10-27-a70541e\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们将在 GraphQL 配置组件中注册我们选择的标量类型。在这种情况下，标量类型是 <em>JSON</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">GraphQLScalarType</span> <span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">ExtendedScalars<span class="token punctuation">.</span>Json</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将相应地更新我们的 GraphQL 模式：</p><div class="language-graphql line-numbers-mode" data-ext="graphql" data-title="graphql"><pre class="language-graphql"><code><span class="token keyword">type</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>
    <span class="token attr-name">id</span><span class="token punctuation">:</span> <span class="token scalar">ID</span>
    <span class="token attr-name">name</span><span class="token punctuation">:</span> <span class="token scalar">String</span><span class="token operator">!</span>
    <span class="token attr-name">description</span><span class="token punctuation">:</span> <span class="token scalar">String</span>
    <span class="token attr-name">attributes</span><span class="token punctuation">:</span> <span class="token constant">JSON</span>
<span class="token punctuation">}</span>
<span class="token keyword">scalar</span> <span class="token constant">JSON</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是实施后的结果：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;product&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Product 1&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Product 1 description&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;attributes&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Large&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;This is custom attribute description&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;unit&quot;</span><span class="token operator">:</span> <span class="token string">&quot;This is a custom attribute unit&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;attribute_1&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Attribute1 name&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;This is custom attribute description&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;unit&quot;</span><span class="token operator">:</span> <span class="token string">&quot;This is a custom attribute unit&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这种方法，我们不需要在客户端处理属性映射。然而，标量类型也有它们自己的限制。</p><p><strong>在 GraphQL 中，标量类型是查询的叶子，这表明它们不能被进一步查询。</strong></p><h3 id="_3-3-键值对列表" tabindex="-1"><a class="header-anchor" href="#_3-3-键值对列表"><span>3.3. 键值对列表</span></a></h3><p>如果要求进一步查询 <em>Map</em>，那么这是最可行的选项。我们将 <em>Map</em> 对象转换为键值对对象的列表。</p><p>这是我们的类，表示键值对：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AttributeKeyValueModel</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> key<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Attribute</span> value<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">AttributeKeyValueModel</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">Attribute</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> key<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <em>Product</em> 解析器中，我们将添加以下实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AttributeKeyValueModel</span><span class="token punctuation">&gt;</span></span>\` attributeModelList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
product<span class="token punctuation">.</span><span class="token function">getAttributes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> val<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> attributeModelList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AttributeKeyValueModel</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将更新模式：</p><div class="language-graphql line-numbers-mode" data-ext="graphql" data-title="graphql"><pre class="language-graphql"><code><span class="token keyword">type</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>
    <span class="token attr-name">id</span><span class="token punctuation">:</span> <span class="token scalar">ID</span>
    <span class="token attr-name">name</span><span class="token punctuation">:</span> <span class="token scalar">String</span><span class="token operator">!</span>
    <span class="token attr-name">description</span><span class="token punctuation">:</span> <span class="token scalar">String</span>
    <span class="token attr-name">attributes</span><span class="token punctuation">:</span><span class="token punctuation">[</span><span class="token class-name">AttributeKeyValuePair</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">AttributeKeyValuePair</span> <span class="token punctuation">{</span>
    <span class="token attr-name">key</span><span class="token punctuation">:</span><span class="token scalar">String</span>
    <span class="token attr-name">value</span><span class="token punctuation">:</span><span class="token class-name">Attribute</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">Attribute</span> <span class="token punctuation">{</span>
    <span class="token attr-name">name</span><span class="token punctuation">:</span><span class="token scalar">String</span>
    <span class="token attr-name">description</span><span class="token punctuation">:</span><span class="token scalar">String</span>
    <span class="token attr-name">unit</span><span class="token punctuation">:</span><span class="token scalar">String</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们更新了模式，我们也将更新查询：</p><div class="language-graphql line-numbers-mode" data-ext="graphql" data-title="graphql"><pre class="language-graphql"><code><span class="token keyword">query</span> <span class="token punctuation">{</span>
    <span class="token property-query">product</span><span class="token punctuation">(</span><span class="token attr-name">id</span><span class="token punctuation">:</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token property">id</span>
         <span class="token property">name</span>
         <span class="token property">description</span>
         <span class="token object">attributes</span> <span class="token punctuation">{</span>
             <span class="token property">key</span>
             <span class="token object">value</span> <span class="token punctuation">{</span>
                 <span class="token property">name</span>
                 <span class="token property">description</span>
                 <span class="token property">unit</span>
             <span class="token punctuation">}</span>
         <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们看看结果：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;product&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Product 1&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Product 1 description&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;attributes&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;size&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Large&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;This is custom attribute description&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;unit&quot;</span><span class="token operator">:</span> <span class="token string">&quot;This is custom attribute unit&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;attribute_1&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Attribute1 name&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;This is custom attribute description&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;unit&quot;</span><span class="token operator">:</span> <span class="token string">&quot;This is custom attribute unit&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个选项也有两个问题。GraphQL 查询变得有点复杂。而且对象结构需要硬编码。未知的 <em>Map</em> 对象在这种情况下将无法工作。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探讨了从 GraphQL 查询返回 <em>Map</em> 对象的三种不同技术。我们讨论了每种技术的局限性。由于没有一种技术是完美的，它们必须根据需求使用。</p><p>正如往常一样，本文的示例代码可在 GitHub 上找到。</p>`,51),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","2024-07-19-Return Map from GraphQL.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Return%20Map%20from%20GraphQL.html","title":"GraphQL 查询中返回 Map 的方法","lang":"zh-CN","frontmatter":{"date":"2022-04-06T00:00:00.000Z","category":["Java","GraphQL"],"tag":["GraphQL","Java"],"head":[["meta",{"name":"keywords","content":"GraphQL, Java, Map, JSON, Custom Scalar Type"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Return%20Map%20from%20GraphQL.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"GraphQL 查询中返回 Map 的方法"}],["meta",{"property":"og:description","content":"GraphQL 查询中返回 Map 的方法 1. 概述 多年来，GraphQL 已被广泛接受为 Web 服务通信的模式之一。尽管它在使用上丰富且灵活，但在某些场景中可能会带来挑战。其中一个挑战是从查询中返回一个 Map，这本身就是一个挑战，因为 Map 在 GraphQL 中并不是一个类型。 在本教程中，我们将学习从 GraphQL 查询返回 Map ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T15:11:30.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"GraphQL"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T15:11:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"GraphQL 查询中返回 Map 的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T15:11:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"GraphQL 查询中返回 Map 的方法 1. 概述 多年来，GraphQL 已被广泛接受为 Web 服务通信的模式之一。尽管它在使用上丰富且灵活，但在某些场景中可能会带来挑战。其中一个挑战是从查询中返回一个 Map，这本身就是一个挑战，因为 Map 在 GraphQL 中并不是一个类型。 在本教程中，我们将学习从 GraphQL 查询返回 Map ..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 示例","slug":"_2-示例","link":"#_2-示例","children":[{"level":3,"title":"3.1. JSON 字符串","slug":"_3-1-json-字符串","link":"#_3-1-json-字符串","children":[]},{"level":3,"title":"3.2. GraphQL 自定义标量类型","slug":"_3-2-graphql-自定义标量类型","link":"#_3-2-graphql-自定义标量类型","children":[]},{"level":3,"title":"3.3. 键值对列表","slug":"_3-3-键值对列表","link":"#_3-3-键值对列表","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721401890000,"updatedTime":1721401890000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.81,"words":1143},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Return Map from GraphQL.md","localizedDate":"2022年4月6日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>多年来，GraphQL 已被广泛接受为 Web 服务通信的模式之一。尽管它在使用上丰富且灵活，但在某些场景中可能会带来挑战。其中一个挑战是从查询中返回一个 <em>Map</em>，这本身就是一个挑战，因为 <em>Map</em> 在 GraphQL 中并不是一个类型。</p>\\n<p>在本教程中，我们将学习从 GraphQL 查询返回 <em>Map</em> 的技术。</p>\\n<h2>2. 示例</h2>\\n<p>让我们以一个产品数据库为例，该数据库具有不确定数量的自定义属性。</p>\\n<p>作为一个数据库实体的 <em>Product</em>，可能有一些固定的字段，如 <em>name</em>、<em>price</em>、<em>category</em> 等。但是，它也可能有因类别而异的属性。这些属性应该以一种方式返回给客户端，以便保留它们的标识键。</p>","autoDesc":true}');export{d as comp,k as data};
