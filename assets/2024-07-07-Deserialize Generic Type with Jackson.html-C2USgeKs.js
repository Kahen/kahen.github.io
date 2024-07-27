import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-CBerKIce.js";const t={},p=e('<h1 id="使用jackson反序列化泛型类型" tabindex="-1"><a class="header-anchor" href="#使用jackson反序列化泛型类型"><span>使用Jackson反序列化泛型类型</span></a></h1><p>Jackson是一个流行的Java库，用于将Java对象序列化成JSON以及反之。在某些情况下，Java对象可能使用泛型类型进行定义。</p><p>在本教程中，我们将展示如何使用Jackson将JSON字符串反序列化到泛型类型。</p><h2 id="_2-模型准备" tabindex="-1"><a class="header-anchor" href="#_2-模型准备"><span>2. 模型准备</span></a></h2><p>对于要反序列化的给定JSON字符串：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span><span class="token property">&quot;result&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token property">&quot;firstName&quot;</span><span class="token operator">:</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;lastName&quot;</span><span class="token operator">:</span><span class="token string">&quot;Lewis&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们需要定义一个带有泛型类型参数的类和一个常规的POJO对象来保存数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JsonResponse</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>``` <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">T</span> result<span class="token punctuation">;</span>\n\n    <span class="token comment">// getters and setters...</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>\n\n    <span class="token comment">// getters and setters...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Jackson中，_ObjectMapper_提供了三组_readValue_方法用于JSON反序列化，它们接收以下参数：</p><ul><li>_Class<code>&lt;T&gt;</code>_作为参数传递信息类型</li><li>_TypeReference_传递类型信息</li><li>_JavaType_作为参数</li></ul><p>我们不能使用_JsonResponse<code>&lt;User&gt;</code>.class_传递给第一点中的方法，因此让我们看看如何使用_TypeReference_和_JavaType_进行泛型反序列化。</p><h3 id="_3-1-typereference" tabindex="-1"><a class="header-anchor" href="#_3-1-typereference"><span>3.1. <em>TypeReference</em></span></a></h3><p>众所周知，Java在编译期间会擦除泛型类型信息，但我们可以利用匿名内部类的力量在编译时保留类型信息。Jackson提供了抽象类_TypeReference_，以从派生子类中获取类型信息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">TypeReference</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>``` <span class="token punctuation">{</span>\n    <span class="token keyword">protected</span> <span class="token keyword">final</span> <span class="token class-name">Type</span> _type<span class="token punctuation">;</span>\n\n    <span class="token keyword">protected</span> <span class="token class-name">TypeReference</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Type</span> superClass <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getGenericSuperclass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>_type <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">ParameterizedType</span><span class="token punctuation">)</span>superClass<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getActualTypeArguments</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用_TypeReference_，我们可以为泛型类型_JsonResponse<code>&lt;User&gt;</code>_创建一个匿名内部类，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">TypeReference</span><span class="token operator">&lt;</span><span class="token class-name">JsonResponse</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>````<span class="token operator">&gt;</span> typeRef <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TypeReference</span><span class="token operator">&lt;</span><span class="token class-name">JsonResponse</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>````<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种方法保留泛型类型信息被称为超类型标记。通过使用超类型标记，Jackson将知道容器类型是_JsonResponse_，其类型参数是_User_。</p><p>以下是反序列化的完整测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenJsonObject_whenDeserializeIntoGenericTypeByTypeReference_thenCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;result\\&quot;:{\\&quot;id\\&quot;:1,\\&quot;firstName\\&quot;:\\&quot;John\\&quot;,\\&quot;lastName\\&quot;:\\&quot;Lewis\\&quot;}}&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">TypeReference</span><span class="token operator">&lt;</span><span class="token class-name">JsonResponse</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>````<span class="token operator">&gt;</span> typeRef <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TypeReference</span><span class="token operator">&lt;</span><span class="token class-name">JsonResponse</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>````<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token class-name">JsonResponse</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>```` jsonResponse <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> typeRef<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">User</span> user <span class="token operator">=</span> jsonResponse<span class="token punctuation">.</span><span class="token function">getResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getFirstName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getLastName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Lewis&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-javatype" tabindex="-1"><a class="header-anchor" href="#_3-2-javatype"><span>3.2. <em>JavaType</em></span></a></h3><p>如果类型参数_T_不是静态的，我们需要选择_JavaType_而不是_TypeReference_来传递反序列化时的类型信息。_ObjectMapper_提供了这样的方法，从Jackson 2.5开始推荐使用并可以使用_TypeFactory_构造我们的类型参数_JavaType_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">JavaType</span> javaType <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">getTypeFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">constructParametricType</span><span class="token punctuation">(</span><span class="token class-name">JsonResponse</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">User</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">JsonResponse</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>```` jsonResponse <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> javaType<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这里_User.class_作为第二个参数传递给方法_constructParametricType_，并且可以很容易地更改为其他参数化类型。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们介绍了两种简单的方法将JSON字符串反序列化到具有泛型类型的对象。</p><p>像往常一样，本文中展示的所有代码片段都可以在GitHub上找到。</p>',26),o=[p];function c(l,i){return a(),s("div",null,o)}const k=n(t,[["render",c],["__file","2024-07-07-Deserialize Generic Type with Jackson.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Deserialize%20Generic%20Type%20with%20Jackson.html","title":"使用Jackson反序列化泛型类型","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Jackson"],"tag":["JSON","Deserialization","Generic Type"],"head":[["meta",{"name":"keywords","content":"Jackson, Java, JSON, Deserialization, Generic Type"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Deserialize%20Generic%20Type%20with%20Jackson.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Jackson反序列化泛型类型"}],["meta",{"property":"og:description","content":"使用Jackson反序列化泛型类型 Jackson是一个流行的Java库，用于将Java对象序列化成JSON以及反之。在某些情况下，Java对象可能使用泛型类型进行定义。 在本教程中，我们将展示如何使用Jackson将JSON字符串反序列化到泛型类型。 2. 模型准备 对于要反序列化的给定JSON字符串： 我们需要定义一个带有泛型类型参数的类和一个常规..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T13:58:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JSON"}],["meta",{"property":"article:tag","content":"Deserialization"}],["meta",{"property":"article:tag","content":"Generic Type"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T13:58:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Jackson反序列化泛型类型\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T13:58:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Jackson反序列化泛型类型 Jackson是一个流行的Java库，用于将Java对象序列化成JSON以及反之。在某些情况下，Java对象可能使用泛型类型进行定义。 在本教程中，我们将展示如何使用Jackson将JSON字符串反序列化到泛型类型。 2. 模型准备 对于要反序列化的给定JSON字符串： 我们需要定义一个带有泛型类型参数的类和一个常规..."},"headers":[{"level":2,"title":"2. 模型准备","slug":"_2-模型准备","link":"#_2-模型准备","children":[{"level":3,"title":"3.1. TypeReference","slug":"_3-1-typereference","link":"#_3-1-typereference","children":[]},{"level":3,"title":"3.2. JavaType","slug":"_3-2-javatype","link":"#_3-2-javatype","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720360702000,"updatedTime":1720360702000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.34,"words":701},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Deserialize Generic Type with Jackson.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Jackson是一个流行的Java库，用于将Java对象序列化成JSON以及反之。在某些情况下，Java对象可能使用泛型类型进行定义。</p>\\n<p>在本教程中，我们将展示如何使用Jackson将JSON字符串反序列化到泛型类型。</p>\\n<h2>2. 模型准备</h2>\\n<p>对于要反序列化的给定JSON字符串：</p>\\n<div class=\\"language-json\\" data-ext=\\"json\\" data-title=\\"json\\"><pre class=\\"language-json\\"><code><span class=\\"token punctuation\\">{</span><span class=\\"token property\\">\\"result\\"</span><span class=\\"token operator\\">:</span><span class=\\"token punctuation\\">{</span><span class=\\"token property\\">\\"id\\"</span><span class=\\"token operator\\">:</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span><span class=\\"token property\\">\\"firstName\\"</span><span class=\\"token operator\\">:</span><span class=\\"token string\\">\\"John\\"</span><span class=\\"token punctuation\\">,</span><span class=\\"token property\\">\\"lastName\\"</span><span class=\\"token operator\\">:</span><span class=\\"token string\\">\\"Lewis\\"</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
