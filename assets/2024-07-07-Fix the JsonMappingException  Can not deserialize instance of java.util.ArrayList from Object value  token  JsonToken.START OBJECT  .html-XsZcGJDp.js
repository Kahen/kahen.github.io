import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CbPcg273.js";const e={},o=t(`<h1 id="解决-jsonmappingexception-无法从对象值-token-jsontoken-start-object-反序列化-java-util-arraylist-实例-baeldung" tabindex="-1"><a class="header-anchor" href="#解决-jsonmappingexception-无法从对象值-token-jsontoken-start-object-反序列化-java-util-arraylist-实例-baeldung"><span>解决 JsonMappingException：无法从对象值（token <code>JsonToken.START_OBJECT</code>）反序列化 java.util.ArrayList 实例 | Baeldung</span></a></h1><p>在这篇简短的教程中，我们将解释如何解决异常 <em>JsonMappingException: Can not deserialize instance of java.util.ArrayList from Object value (token <code>JsonToken.START_OBJECT</code>)</em>。</p><p>首先，我们将强调异常的主要原因。然后，我们将展示如何在实践中重现它，以及最终如何解决它。</p><h3 id="_2-理解异常" tabindex="-1"><a class="header-anchor" href="#_2-理解异常"><span>2. 理解异常</span></a></h3><p>通常，Jackson 在反序列化 JSON 字符串时抛出 <em>JsonMappingException</em> 来<strong>表示一个致命的映射错误</strong>。因此，堆栈跟踪 “<em>Can not deserialize instance of java.util.ArrayList</em>” 表明 Jackson 未能将 JSON 属性映射到 <em>ArrayList</em> 的一个实例。</p><p>简而言之，这种异常最常见的原因是<strong>使用花括号 <em>“{…}”</em> 而不是方括号 <em>“[ ]”</em> 来表示集合</strong>。</p><h3 id="_3-重现异常" tabindex="-1"><a class="header-anchor" href="#_3-重现异常"><span>3. 重现异常</span></a></h3><p>现在我们知道了什么导致 Jackson 抛出 <em>JsonMappingException</em>，让我们通过一个实际的例子来看看如何重现它。</p><p>让我们考虑 <em>Country</em> 类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Country</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` cities<span class="token punctuation">;</span>

    <span class="token comment">// 标准 getter 和 setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，一个国家由名称和城市列表定义。</p><p>接下来，让我们假设在 JSON 字符串中使用花括号来定义城市：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Netherlands&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;cities&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token string">&quot;Amsterdam&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Tamassint&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在尝试将 JSON 字符串反序列化为 <em>Country</em> 类型的对象将导致以下错误：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>Cannot deserialize value of type \`java.util.ArrayList\`\`\`&lt;java.lang.String&gt;\`\`\`\` from Object value (token \`JsonToken.START_OBJECT\`)
at [Source: (String)&quot;{\\&quot;name\\&quot;:\\&quot;Netherlands\\&quot;,\\&quot;cities\\&quot;:{\\&quot;Amsterdam\\&quot;, \\&quot;Tamassint\\&quot;}}; line: 1, column: 32] 
(through reference chain: com.baeldung.mappingexception.Country[&quot;cities&quot;])
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将创建一个测试用例来确认这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">givenJsonWithInvalidList_whenDeserializing_thenThrowException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonParseException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;Netherlands\\&quot;,\\&quot;cities\\&quot;:{\\&quot;Amsterdam\\&quot;, \\&quot;Tamassint\\&quot;}}&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">ObjectMapper</span> mapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Exception</span> exception <span class="token operator">=</span> <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">JsonMappingException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> mapper<span class="token punctuation">.</span><span class="token function">reader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">forType</span><span class="token punctuation">(</span><span class="token class-name">Country</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertTrue</span><span class="token punctuation">(</span>exception<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Cannot deserialize value of type \`java.util.ArrayList\`\`\`&lt;java.lang.String&gt;\`\`\`\`&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，Jackson 因 “_Cannot deserialize value of type \`java.util.ArrayList\`\`\`&lt;java.lang.String&gt;\`\`\`\`” 而失败。</p><p>这里的主要原因是我们使用花括号来表示城市列表。对于 Jackson 来说，{“Amsterdam”, “Tamassint”} 不是一个 JSON 数组。</p><h3 id="_4-修复异常" tabindex="-1"><a class="header-anchor" href="#_4-修复异常"><span>4. 修复异常</span></a></h3><p>避免异常的最简单方法是使用方括号而不是花括号来定义元素集合。因此，要解决异常，我们首先需要修复我们的 JSON 字符串：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Netherlands&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;cities&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Amsterdam&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Tamassint&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们使用一个测试用例来验证一切是否按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">givenJsonWithValidList_whenDeserializing_thenCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonParseException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;Netherlands\\&quot;,\\&quot;cities\\&quot;:[\\&quot;Amsterdam\\&quot;, \\&quot;Tamassint\\&quot;]}&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">ObjectMapper</span> mapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Country</span> country <span class="token operator">=</span> mapper<span class="token punctuation">.</span><span class="token function">reader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">forType</span><span class="token punctuation">(</span><span class="token class-name">Country</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Netherlands&quot;</span><span class="token punctuation">,</span> country<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;Amsterdam&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Tamassint&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> country<span class="token punctuation">.</span><span class="token function">getCities</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，新的 JSON 字符串已成功反序列化为 <em>Country</em> 对象。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在这篇简短的文章中，我们讨论了 <em>JsonMappingException: Can not deserialize instance of java.util.ArrayList from Object value (token <code>JsonToken.START_OBJECT</code>)</em> 的主要原因。然后我们展示了如何产生异常，以及如何解决它。</p><p>如常，示例的完整源代码可以在 GitHub 上找到。</p>`,28),p=[o];function i(c,l){return s(),a("div",null,p)}const d=n(e,[["render",i],["__file","2024-07-07-Fix the JsonMappingException  Can not deserialize instance of java.util.ArrayList from Object value  token  JsonToken.START OBJECT  .html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Fix%20the%20JsonMappingException%20%20Can%20not%20deserialize%20instance%20of%20java.util.ArrayList%20from%20Object%20value%20%20token%20%20JsonToken.START%20OBJECT%20%20.html","title":"解决 JsonMappingException：无法从对象值（token JsonToken.START_OBJECT）反序列化 java.util.ArrayList 实例 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Jackson"],"tag":["JsonMappingException","Deserialization"],"head":[["meta",{"name":"keywords","content":"Jackson, JsonMappingException, Deserialization, ArrayList, JSON"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Fix%20the%20JsonMappingException%20%20Can%20not%20deserialize%20instance%20of%20java.util.ArrayList%20from%20Object%20value%20%20token%20%20JsonToken.START%20OBJECT%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"解决 JsonMappingException：无法从对象值（token JsonToken.START_OBJECT）反序列化 java.util.ArrayList 实例 | Baeldung"}],["meta",{"property":"og:description","content":"解决 JsonMappingException：无法从对象值（token JsonToken.START_OBJECT）反序列化 java.util.ArrayList 实例 | Baeldung 在这篇简短的教程中，我们将解释如何解决异常 JsonMappingException: Can not deserialize instance of ja..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T03:37:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JsonMappingException"}],["meta",{"property":"article:tag","content":"Deserialization"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T03:37:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"解决 JsonMappingException：无法从对象值（token JsonToken.START_OBJECT）反序列化 java.util.ArrayList 实例 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T03:37:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"解决 JsonMappingException：无法从对象值（token JsonToken.START_OBJECT）反序列化 java.util.ArrayList 实例 | Baeldung 在这篇简短的教程中，我们将解释如何解决异常 JsonMappingException: Can not deserialize instance of ja..."},"headers":[{"level":3,"title":"2. 理解异常","slug":"_2-理解异常","link":"#_2-理解异常","children":[]},{"level":3,"title":"3. 重现异常","slug":"_3-重现异常","link":"#_3-重现异常","children":[]},{"level":3,"title":"4. 修复异常","slug":"_4-修复异常","link":"#_4-修复异常","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720323456000,"updatedTime":1720323456000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.35,"words":706},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Fix the JsonMappingException  Can not deserialize instance of java.util.ArrayList from Object value  token  JsonToken.START OBJECT  .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这篇简短的教程中，我们将解释如何解决异常 <em>JsonMappingException: Can not deserialize instance of java.util.ArrayList from Object value (token <code>JsonToken.START_OBJECT</code>)</em>。</p>\\n<p>首先，我们将强调异常的主要原因。然后，我们将展示如何在实践中重现它，以及最终如何解决它。</p>\\n<h3>2. 理解异常</h3>\\n<p>通常，Jackson 在反序列化 JSON 字符串时抛出 <em>JsonMappingException</em> 来<strong>表示一个致命的映射错误</strong>。因此，堆栈跟踪 “<em>Can not deserialize instance of java.util.ArrayList</em>” 表明 Jackson 未能将 JSON 属性映射到 <em>ArrayList</em> 的一个实例。</p>","autoDesc":true}');export{d as comp,k as data};
