import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BaAI5AMv.js";const e={},o=t(`<h1 id="使用jackson从json中移除元素" tabindex="-1"><a class="header-anchor" href="#使用jackson从json中移除元素"><span>使用Jackson从JSON中移除元素</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Jackson库是Java应用程序中处理JSON（JavaScript对象表示）的强大工具。此外，它提供了广泛的功能，用于高效地读取、写入和操作JSON数据。因此，处理JSON时的一个常见任务是从JSON结构中删除特定元素。</p><p>在本教程中，我们将探讨如何使用Jackson删除JSON元素，并通过实际示例理解这一过程。</p><h2 id="_2-设置环境" tabindex="-1"><a class="header-anchor" href="#_2-设置环境"><span>2. 设置环境</span></a></h2><p>要使用Jackson，我们首先需要在我们的_pom.xml_文件中添加_jackson-dataformat-xml_依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`com.fasterxml.jackson.core\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`jackson-dataformat-xml\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`2.15.2\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个库允许我们使用数据绑定API。</p><h2 id="_3-通过键删除json元素" tabindex="-1"><a class="header-anchor" href="#_3-通过键删除json元素"><span>3. 通过键删除JSON元素</span></a></h2><p>当涉及到删除JSON时，最简单的方法是通过其键。Jackson提供了几种方法来促进这项任务。<strong>一种常用的方法是使用_JsonNode_类，它在Jackson API中表示JSON节点。</strong></p><p>要通过键删除一个元素，我们会遵循以下步骤：</p><ul><li>使用Jackson的_ObjectMapper_解析JSON字符串或输入流</li><li>将JSON数据转换为_JsonNode_对象</li><li>在_JsonNode_对象上使用_remove(String fieldName)_方法来删除所需的元素</li><li>使用_ObjectMapper_将修改后的_JsonNode_重新转换为JSON字符串</li></ul><p>假设我们有以下JSON对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;name&quot;: &quot;John&quot;,
    &quot;age&quot;: 30,
    &quot;city&quot;: &quot;New York&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们希望从这个对象中删除_age_属性。以下是相应的代码片段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">given_JsonData_whenUsingJackson_thenRemoveElementByKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;name\\&quot;: \\&quot;John\\&quot;, \\&quot;age\\&quot;: 30, \\&quot;city\\&quot;: \\&quot;New York\\&quot;}&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">JsonNode</span> jsonNode <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readTree</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ObjectNode</span> object <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ObjectNode</span><span class="token punctuation">)</span> jsonNode<span class="token punctuation">;</span>
    object<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> updatedJson <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;John\\&quot;,\\&quot;city\\&quot;:\\&quot;New York\\&quot;}&quot;</span><span class="token punctuation">,</span> updatedJson<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的测试方法中，我们从JSON对象中删除了键为_age_的元素，并验证结果JSON字符串不包含该元素。</p><p>预期和实际的JSON输出应该是相同的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;name&quot;: &quot;John&quot;,
    &quot;city&quot;: &quot;New York&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-根据条件删除json元素" tabindex="-1"><a class="header-anchor" href="#_4-根据条件删除json元素"><span>4. 根据条件删除JSON元素</span></a></h2><p>有时，我们需要根据特定条件从集合中删除元素。例如，我们可能想要删除所有具有特定值或特定类型的元素。</p><p>幸运的是，Jackson提供了多种方法来实现这一目标。一种方法涉及<strong>使用_JsonNode_，遍历其元素，并删除满足给定条件的元素。</strong></p><p>让我们考虑以下场景，我们有以下JSON对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;name&quot;: &quot;John&quot;,
    &quot;age&quot;: 30,
    &quot;city&quot;: &quot;New York&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们希望从这个对象中删除任何是数字且值为_30_的元素。让我们看看如何做到这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">given_JsonData_whenUsingJackson_thenRemoveElementsByCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;name\\&quot;: \\&quot;John\\&quot;, \\&quot;age\\&quot;: 30, \\&quot;city\\&quot;: \\&quot;New York\\&quot;}&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">JsonNode</span> jsonNode <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readTree</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Iterator</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">JsonNode</span><span class="token punctuation">&gt;</span></span>\` elements <span class="token operator">=</span> jsonNode<span class="token punctuation">.</span><span class="token function">elements</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>elements<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">JsonNode</span> element <span class="token operator">=</span> elements<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>element<span class="token punctuation">.</span><span class="token function">isNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> element<span class="token punctuation">.</span><span class="token function">asInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">30</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            elements<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">String</span> updatedJson <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>jsonNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;John\\&quot;,\\&quot;city\\&quot;:\\&quot;New York\\&quot;}&quot;</span><span class="token punctuation">,</span> updatedJson<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们遍历_JsonNode_的元素，并删除任何是数字且值为_30_的元素。结果的JSON字符串不包含被删除的元素。</p><p>预期的JSON输出和实际的JSON输出应该是相同的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;name&quot;: &quot;John&quot;,
    &quot;city&quot;: &quot;New York&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-从复杂结构中删除json元素" tabindex="-1"><a class="header-anchor" href="#_5-从复杂结构中删除json元素"><span>5. 从复杂结构中删除JSON元素</span></a></h2><p>在某些情况下，我们可能会遇到包含嵌套对象或数组的复杂JSON结构。有效地处理这些结构需要我们能够根据我们的要求删除特定元素。</p><p>通过使用Jackson的丰富API集，<strong>我们可以遍历_JsonNode_实例的元素，并执行条件检查以识别要删除的元素。</strong></p><p>要从嵌套对象或数组中删除元素，我们遵循以下步骤：</p><ul><li>使用_ObjectMapper_解析JSON字符串或输入流</li><li>使用_JsonNode_方法如_get(String fieldName)_或_path(String fieldName)_遍历JSON结构以到达所需元素</li><li>在选定的_JsonNode_上使用适当的删除方法（<em>remove(String fieldName)</em>, _remove(int index)_等）</li><li>使用_ObjectMapper_将修改后的_JsonNode_重新转换为JSON字符串</li></ul><p>假设我们正在处理一个具有复杂结构的嵌套JSON对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;name&quot;: &quot;John&quot;,
    &quot;details&quot;: {
        &quot;age&quot;: 30,
        &quot;city&quot;: &quot;New York&quot;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们希望从_details_嵌套对象中删除键为_age_的元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">given_JsonData_whenUsingJackson_thenRemoveElementFromNestedStructure</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;name\\&quot;: \\&quot;John\\&quot;, \\&quot;details\\&quot;: {\\&quot;age\\&quot;: 30, \\&quot;city\\&quot;: \\&quot;New York\\&quot;}}&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">JsonNode</span> jsonNode <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readTree</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">JsonNode</span> detailsNode <span class="token operator">=</span> jsonNode<span class="token punctuation">.</span><span class="token function">path</span><span class="token punctuation">(</span><span class="token string">&quot;details&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">ObjectNode</span><span class="token punctuation">)</span> detailsNode<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> updatedJson <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>jsonNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;John\\&quot;,\\&quot;details\\&quot;:{\\&quot;city\\&quot;:\\&quot;New York\\&quot;}}&quot;</span><span class="token punctuation">,</span> updatedJson<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们访问嵌套对象（<em>details</em>）并删除键（<em>age</em>）的元素。结果的JSON字符串反映了修改后的结构，预期的JSON输出应该与实际的JSON输出相同：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;name&quot;: &quot;John&quot;,
    &quot;details&quot;: {
        &quot;city&quot;: &quot;New York&quot;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了使用Java中的Jackson库删除JSON元素的不同技术。我们讨论了通过键删除元素、根据条件删除元素以及从复杂的JSON结构中删除元素。</p><p>总的来说，通过使用Jackson提供的强大的功能，我们可以轻松地操作JSON数据以满足我们应用程序的要求。</p><p>像往常一样，代码示例可以在GitHub上找到。</p>`,44),p=[o];function c(i,l){return a(),s("div",null,p)}const r=n(e,[["render",c],["__file","2024-07-03-Removing JSON Elements With Jackson.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Removing%20JSON%20Elements%20With%20Jackson.html","title":"使用Jackson从JSON中移除元素","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Jackson"],"tag":["JSON","Java","Jackson"],"head":[["meta",{"name":"keywords","content":"Jackson, JSON, Java, remove elements"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Removing%20JSON%20Elements%20With%20Jackson.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Jackson从JSON中移除元素"}],["meta",{"property":"og:description","content":"使用Jackson从JSON中移除元素 1. 引言 Jackson库是Java应用程序中处理JSON（JavaScript对象表示）的强大工具。此外，它提供了广泛的功能，用于高效地读取、写入和操作JSON数据。因此，处理JSON时的一个常见任务是从JSON结构中删除特定元素。 在本教程中，我们将探讨如何使用Jackson删除JSON元素，并通过实际示例..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T18:55:49.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JSON"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Jackson"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T18:55:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Jackson从JSON中移除元素\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T18:55:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Jackson从JSON中移除元素 1. 引言 Jackson库是Java应用程序中处理JSON（JavaScript对象表示）的强大工具。此外，它提供了广泛的功能，用于高效地读取、写入和操作JSON数据。因此，处理JSON时的一个常见任务是从JSON结构中删除特定元素。 在本教程中，我们将探讨如何使用Jackson删除JSON元素，并通过实际示例..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 设置环境","slug":"_2-设置环境","link":"#_2-设置环境","children":[]},{"level":2,"title":"3. 通过键删除JSON元素","slug":"_3-通过键删除json元素","link":"#_3-通过键删除json元素","children":[]},{"level":2,"title":"4. 根据条件删除JSON元素","slug":"_4-根据条件删除json元素","link":"#_4-根据条件删除json元素","children":[]},{"level":2,"title":"5. 从复杂结构中删除JSON元素","slug":"_5-从复杂结构中删除json元素","link":"#_5-从复杂结构中删除json元素","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720032949000,"updatedTime":1720032949000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.18,"words":1255},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Removing JSON Elements With Jackson.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>Jackson库是Java应用程序中处理JSON（JavaScript对象表示）的强大工具。此外，它提供了广泛的功能，用于高效地读取、写入和操作JSON数据。因此，处理JSON时的一个常见任务是从JSON结构中删除特定元素。</p>\\n<p>在本教程中，我们将探讨如何使用Jackson删除JSON元素，并通过实际示例理解这一过程。</p>\\n<h2>2. 设置环境</h2>\\n<p>要使用Jackson，我们首先需要在我们的_pom.xml_文件中添加_jackson-dataformat-xml_依赖项：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>`&lt;dependency&gt;`\\n    `&lt;groupId&gt;`com.fasterxml.jackson.core`&lt;/groupId&gt;`\\n    `&lt;artifactId&gt;`jackson-dataformat-xml`&lt;/artifactId&gt;`\\n    `&lt;version&gt;`2.15.2`&lt;/version&gt;`\\n`&lt;/dependency&gt;`\\n</code></pre></div>","autoDesc":true}');export{r as comp,k as data};
