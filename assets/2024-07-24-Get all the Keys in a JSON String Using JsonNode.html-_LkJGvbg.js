import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-DpYLEM_u.js";const t={},o=e(`<h1 id="使用jsonnode从json字符串中获取所有键" tabindex="-1"><a class="header-anchor" href="#使用jsonnode从json字符串中获取所有键"><span>使用JsonNode从JSON字符串中获取所有键</span></a></h1><p>在本教程中，我们将探索使用_JsonNode_从JSON中提取所有嵌套键的不同方法。我们的目标是遍历一个JSON字符串并收集键名称到一个列表中。</p><h3 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h3><p>Jackson库使用树模型来表示JSON数据。树模型为我们提供了一种有效的方式来与层次结构化的数据交互。</p><h3 id="_2-引言" tabindex="-1"><a class="header-anchor" href="#_2-引言"><span>2. 引言</span></a></h3><p>JSON对象在树模型中表示为节点。这使得对JSON内容执行CRUD操作变得更加容易。</p><h4 id="_2-1-objectmapper" tabindex="-1"><a class="header-anchor" href="#_2-1-objectmapper"><span>2.1 <em>ObjectMapper</em></span></a></h4><p>我们使用_ObjectMapper_类的方法来读取JSON内容。_ObjectMapper.readTree()_方法反序列化JSON并构建_JsonNode_实例的树。它以JSON源作为输入，并返回创建的树模型的根节点。然后，我们可以使用根节点遍历整个JSON树。</p><h4 id="_2-2-jsonnode" tabindex="-1"><a class="header-anchor" href="#_2-2-jsonnode"><span>2.2 <em>JsonNode</em></span></a></h4><p>_JsonNode_类表示JSON树模型中的一个节点。它可以以以下数据类型表达JSON数据：<em>Array, Binary, Boolean, Missing, Null, Number, Object, POJO, String.</em> 这些数据类型在_JsonNodeType_枚举中定义。</p><h3 id="_3-从json中获取键" tabindex="-1"><a class="header-anchor" href="#_3-从json中获取键"><span>3. 从JSON中获取键</span></a></h3><p>本文中我们使用以下JSON作为输入：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;Name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Craig&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;Age&quot;</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
  <span class="token property">&quot;BookInterests&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;Book&quot;</span><span class="token operator">:</span> <span class="token string">&quot;The Kite Runner&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;Author&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Khaled Hosseini&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;Book&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Harry Potter&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;Author&quot;</span><span class="token operator">:</span> <span class="token string">&quot;J. K. Rowling&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;FoodInterests&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;Breakfast&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;Bread&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Whole wheat&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Beverage&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Fruit juice&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;Sandwich&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Vegetable Sandwich&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Beverage&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Coffee&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在本文中，我们学习了从JSON内容中读取键名称的不同方法。因此，我们可以扩展在文章中讨论的遍历逻辑，以执行对JSON元素所需的其他操作。</p><p>如往常一样，示例的完整源代码可以在GitHub上找到。</p>`,16),p=[o];function i(r,c){return a(),s("div",null,p)}const d=n(t,[["render",i],["__file","2024-07-24-Get all the Keys in a JSON String Using JsonNode.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/2024-07-24/2024-07-24-Get%20all%20the%20Keys%20in%20a%20JSON%20String%20Using%20JsonNode.html","title":"使用JsonNode从JSON字符串中获取所有键","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JSON"],"tag":["Jackson","JsonNode"],"head":[["meta",{"name":"keywords","content":"Java, JSON, JsonNode, Jackson, 教程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-24/2024-07-24-Get%20all%20the%20Keys%20in%20a%20JSON%20String%20Using%20JsonNode.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用JsonNode从JSON字符串中获取所有键"}],["meta",{"property":"og:description","content":"使用JsonNode从JSON字符串中获取所有键 在本教程中，我们将探索使用_JsonNode_从JSON中提取所有嵌套键的不同方法。我们的目标是遍历一个JSON字符串并收集键名称到一个列表中。 1. 概述 Jackson库使用树模型来表示JSON数据。树模型为我们提供了一种有效的方式来与层次结构化的数据交互。 2. 引言 JSON对象在树模型中表示为..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-24T03:55:14.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Jackson"}],["meta",{"property":"article:tag","content":"JsonNode"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-24T03:55:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用JsonNode从JSON字符串中获取所有键\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-24T03:55:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用JsonNode从JSON字符串中获取所有键 在本教程中，我们将探索使用_JsonNode_从JSON中提取所有嵌套键的不同方法。我们的目标是遍历一个JSON字符串并收集键名称到一个列表中。 1. 概述 Jackson库使用树模型来表示JSON数据。树模型为我们提供了一种有效的方式来与层次结构化的数据交互。 2. 引言 JSON对象在树模型中表示为..."},"headers":[{"level":3,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":3,"title":"2. 引言","slug":"_2-引言","link":"#_2-引言","children":[]},{"level":3,"title":"3. 从JSON中获取键","slug":"_3-从json中获取键","link":"#_3-从json中获取键","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721793314000,"updatedTime":1721793314000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.42,"words":426},"filePathRelative":"posts/baeldung/2024-07-24/2024-07-24-Get all the Keys in a JSON String Using JsonNode.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探索使用_JsonNode_从JSON中提取所有嵌套键的不同方法。我们的目标是遍历一个JSON字符串并收集键名称到一个列表中。</p>\\n<h3>1. 概述</h3>\\n<p>Jackson库使用树模型来表示JSON数据。树模型为我们提供了一种有效的方式来与层次结构化的数据交互。</p>\\n<h3>2. 引言</h3>\\n<p>JSON对象在树模型中表示为节点。这使得对JSON内容执行CRUD操作变得更加容易。</p>\\n<h4>2.1 <em>ObjectMapper</em></h4>\\n<p>我们使用_ObjectMapper_类的方法来读取JSON内容。_ObjectMapper.readTree()_方法反序列化JSON并构建_JsonNode_实例的树。它以JSON源作为输入，并返回创建的树模型的根节点。然后，我们可以使用根节点遍历整个JSON树。</p>","autoDesc":true}');export{d as comp,h as data};
