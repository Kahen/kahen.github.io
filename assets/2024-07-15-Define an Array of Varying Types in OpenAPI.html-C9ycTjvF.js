import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-CtR6X2Br.js";const t={},p=e(`<h1 id="使用openapi定义不同类型数组" tabindex="-1"><a class="header-anchor" href="#使用openapi定义不同类型数组"><span>使用OpenAPI定义不同类型数组</span></a></h1><p>OpenAPI规范，以前称为Swagger规范，有助于以标准化、机器可读的方式描述API。</p><p><strong>在本教程中，我们将学习如何使用OpenAPI规范定义不同类型的数组。</strong> 我们将在整篇文章中使用OpenAPI v3的特性。</p><p>首先，让我们定义我们将在文章中使用的例子。我们假设我们要定义一个数组，包含以下两个对象，分别代表一只狗和一只狮子：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token comment">#狗</span>
<span class="token key atrule">type</span><span class="token punctuation">:</span> object
<span class="token key atrule">properties</span><span class="token punctuation">:</span>
  <span class="token key atrule">barks</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
  <span class="token key atrule">likesSticks</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
<span class="token comment">#狮子</span>
<span class="token key atrule">type</span><span class="token punctuation">:</span> object
<span class="token key atrule">properties</span><span class="token punctuation">:</span>
  <span class="token key atrule">roars</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
  <span class="token key atrule">likesMeat</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>有三种方式来定义一个可以同时包含这些对象的数组：使用_oneOf_、_anyOf_和任意类型模式的关键字。</strong></p><h3 id="_2-1-oneof-关键字" tabindex="-1"><a class="header-anchor" href="#_2-1-oneof-关键字"><span>2.1. _oneOf_关键字</span></a></h3><p><strong>_oneOf_关键字指定数组可以包含预定义类型集中的一种类型：</strong></p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">type</span><span class="token punctuation">:</span> array
<span class="token key atrule">items</span><span class="token punctuation">:</span>
  <span class="token key atrule">oneOf</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">&#39;#/components/schemas/Dog&#39;</span>
    <span class="token punctuation">-</span> <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">&#39;#/components/schemas/Lion&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述定义的数组的一个有效示例将是：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;dogs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;barks&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token property">&quot;likesSticks&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;barks&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
      <span class="token property">&quot;likesSticks&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一方面，混合狗和狮子是不允许的：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;dogsAndLions&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;barks&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token property">&quot;likesSticks&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;barks&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
      <span class="token property">&quot;likesSticks&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;roars&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token property">&quot;likesMeat&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-anyof-关键字" tabindex="-1"><a class="header-anchor" href="#_2-2-anyof-关键字"><span>2.2. _anyOf_关键字</span></a></h3><p><strong>_anyOf_关键字指定数组可以包含预定义类型的任何组合。</strong> 这意味着只有狗、只有狮子或狗和狮子的混合可以形成一个有效的数组：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">type</span><span class="token punctuation">:</span> array
<span class="token key atrule">items</span><span class="token punctuation">:</span>
  <span class="token key atrule">anyOf</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">&#39;#/components/schemas/Dog&#39;</span>
    <span class="token punctuation">-</span> <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">&#39;#/components/schemas/Lion&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面的例子展示了三个都是有效的数组：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;onlyDogs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;barks&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token property">&quot;likesSticks&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;barks&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
      <span class="token property">&quot;likesSticks&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;onlyLions&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;roars&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token property">&quot;likesMeat&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;roars&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token property">&quot;likesMeat&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;dogsAndLions&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;barks&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token property">&quot;likesSticks&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;barks&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
      <span class="token property">&quot;likesSticks&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;roars&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token property">&quot;likesMeat&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-任意类型模式" tabindex="-1"><a class="header-anchor" href="#_2-3-任意类型模式"><span>2.3. 任意类型模式</span></a></h3><p><strong>使用任意类型模式允许定义一个数组，其中包含OpenAPI规范支持的所有类型的混合。</strong> 它还带有一个方便的简写语法，由花括号‘{}_‘组成：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">type</span><span class="token punctuation">:</span> array
<span class="token key atrule">items</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看上述定义的显式语法：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">type</span><span class="token punctuation">:</span> array
<span class="token key atrule">items</span><span class="token punctuation">:</span>
  <span class="token key atrule">anyOf</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> string
    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> number
    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> array
      <span class="token key atrule">items</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> object
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们看看一个包含字符串、数字、整数、布尔值、数组和一个随机对象的示例数组：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;arbitraryStuff&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;Hello world&quot;</span><span class="token punctuation">,</span>
    <span class="token number">42.1</span><span class="token punctuation">,</span>
    <span class="token number">42</span><span class="token punctuation">,</span>
    <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Randy Random&quot;</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Robbi Random&quot;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在本文中，我们学习了如何使用OpenAPI规范定义不同类型的数组。</p><p>首先，我们看到了如何使用_oneOf_关键字为数组定义一种预定义类型的集合。然后，我们讨论了如何使用_anyOf_关键字定义包含多个预定义类型的数组。</p><p>最后，我们了解到可以使用任意类型模式来定义一个可以包含任意类型的数组。</p>`,29),o=[p];function l(i,c){return a(),s("div",null,o)}const d=n(t,[["render",l],["__file","2024-07-15-Define an Array of Varying Types in OpenAPI.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-15/2024-07-15-Define%20an%20Array%20of%20Varying%20Types%20in%20OpenAPI.html","title":"使用OpenAPI定义不同类型数组","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["OpenAPI","API设计"],"tag":["OpenAPI","API"],"head":[["meta",{"name":"keywords","content":"OpenAPI, API设计, 多类型数组定义"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-15/2024-07-15-Define%20an%20Array%20of%20Varying%20Types%20in%20OpenAPI.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用OpenAPI定义不同类型数组"}],["meta",{"property":"og:description","content":"使用OpenAPI定义不同类型数组 OpenAPI规范，以前称为Swagger规范，有助于以标准化、机器可读的方式描述API。 在本教程中，我们将学习如何使用OpenAPI规范定义不同类型的数组。 我们将在整篇文章中使用OpenAPI v3的特性。 首先，让我们定义我们将在文章中使用的例子。我们假设我们要定义一个数组，包含以下两个对象，分别代表一只狗和..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-15T21:10:48.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"OpenAPI"}],["meta",{"property":"article:tag","content":"API"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-15T21:10:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用OpenAPI定义不同类型数组\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-15T21:10:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用OpenAPI定义不同类型数组 OpenAPI规范，以前称为Swagger规范，有助于以标准化、机器可读的方式描述API。 在本教程中，我们将学习如何使用OpenAPI规范定义不同类型的数组。 我们将在整篇文章中使用OpenAPI v3的特性。 首先，让我们定义我们将在文章中使用的例子。我们假设我们要定义一个数组，包含以下两个对象，分别代表一只狗和..."},"headers":[{"level":3,"title":"2.1. _oneOf_关键字","slug":"_2-1-oneof-关键字","link":"#_2-1-oneof-关键字","children":[]},{"level":3,"title":"2.2. _anyOf_关键字","slug":"_2-2-anyof-关键字","link":"#_2-2-anyof-关键字","children":[]},{"level":3,"title":"2.3. 任意类型模式","slug":"_2-3-任意类型模式","link":"#_2-3-任意类型模式","children":[]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1721077848000,"updatedTime":1721077848000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.31,"words":692},"filePathRelative":"posts/baeldung/2024-07-15/2024-07-15-Define an Array of Varying Types in OpenAPI.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>OpenAPI规范，以前称为Swagger规范，有助于以标准化、机器可读的方式描述API。</p>\\n<p><strong>在本教程中，我们将学习如何使用OpenAPI规范定义不同类型的数组。</strong> 我们将在整篇文章中使用OpenAPI v3的特性。</p>\\n<p>首先，让我们定义我们将在文章中使用的例子。我们假设我们要定义一个数组，包含以下两个对象，分别代表一只狗和一只狮子：</p>\\n<div class=\\"language-yaml\\" data-ext=\\"yml\\" data-title=\\"yml\\"><pre class=\\"language-yaml\\"><code><span class=\\"token comment\\">#狗</span>\\n<span class=\\"token key atrule\\">type</span><span class=\\"token punctuation\\">:</span> object\\n<span class=\\"token key atrule\\">properties</span><span class=\\"token punctuation\\">:</span>\\n  <span class=\\"token key atrule\\">barks</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token key atrule\\">type</span><span class=\\"token punctuation\\">:</span> boolean\\n  <span class=\\"token key atrule\\">likesSticks</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token key atrule\\">type</span><span class=\\"token punctuation\\">:</span> boolean\\n<span class=\\"token comment\\">#狮子</span>\\n<span class=\\"token key atrule\\">type</span><span class=\\"token punctuation\\">:</span> object\\n<span class=\\"token key atrule\\">properties</span><span class=\\"token punctuation\\">:</span>\\n  <span class=\\"token key atrule\\">roars</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token key atrule\\">type</span><span class=\\"token punctuation\\">:</span> boolean\\n  <span class=\\"token key atrule\\">likesMeat</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token key atrule\\">type</span><span class=\\"token punctuation\\">:</span> boolean\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
