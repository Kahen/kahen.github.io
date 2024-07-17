import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-yRPSFQJx.js";const e={},p=t(`<hr><h1 id="jackson-反序列化与-lombok" tabindex="-1"><a class="header-anchor" href="#jackson-反序列化与-lombok"><span>Jackson 反序列化与 Lombok</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span><strong>1. 概述</strong></span></a></h2><p>在大多数情况下，当我们使用 Project Lombok 时，我们会想要将我们的数据类与像 Jackson 这样的 JSON 框架结合起来。这在 JSON 在大多数现代 API 和数据服务中广泛使用的情况下尤其如此。</p><p>在这个快速教程中，<strong>我们将看看如何配置我们的 Lombok 构建器类，以便与 Jackson 无缝协作</strong>。</p><h2 id="_2-依赖" tabindex="-1"><a class="header-anchor" href="#_2-依赖"><span><strong>2. 依赖</strong></span></a></h2><p>我们开始使用的所有需要是将 <em>org.projectlombok</em> 添加到我们的 <em>pom.xml</em> 中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.projectlombok\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`lombok\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`1.18.30\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，我们还需要 <em>jackson-databind</em> 依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`com.fasterxml.jackson.core\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`jackson-databind\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`2.14.1\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-一个简单的-fruit-领域" tabindex="-1"><a class="header-anchor" href="#_3-一个简单的-fruit-领域"><span><strong>3. 一个简单的 Fruit 领域</strong></span></a></h2><p>让我们继续定义一个带有 id 和 name 的 Lombok 启用类来表示一个水果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@Builder</span>
<span class="token annotation punctuation">@Jacksonized</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Fruit</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们浏览一下我们 POJO 的关键注释：</p><ul><li>首先，我们通过向类添加 <em>@Data</em> 注解开始 - 这会生成通常与简单 POJO 相关的所有样板代码，例如 getter 和 setter。</li><li>然后，我们添加 <em>@Builder</em> 注解 - 一个使用构建者模式进行对象创建的有用机制。</li><li>最后也是最重要的，我们添加 <em>@Jacksonized</em> 注解。</li></ul><p>简要扩展一下，<em>@Jacksonized</em> 注解是 <em>@Builder</em> 的附加注解。<strong>使用此注解可以让我们自动配置生成的构建者类，以与 Jackson 的反序列化一起工作</strong>。</p><p>需要注意的是，此注解仅在同时存在 <em>@Builder</em> 或 <em>@SuperBuilder</em> 注解时才有效。</p><p>最后，我们应该提到，尽管 <em>@Jacksonized</em> 在 Lombok v1.18.14 中引入，<strong>它仍被视为一个实验性特性</strong>。</p><h2 id="_4-反序列化和序列化" tabindex="-1"><a class="header-anchor" href="#_4-反序列化和序列化"><span><strong>4. 反序列化和序列化</strong></span></a></h2><p>现在我们的领域模型已经定义好了，让我们继续写一个单元测试来使用 Jackson 反序列化一个水果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">withFruitJSON_thenDeserializeSucessfully</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;Apple\\&quot;,\\&quot;id\\&quot;:101}&quot;</span><span class="token punctuation">;</span>

    <span class="token class-name">Fruit</span> fruit <span class="token operator">=</span> <span class="token function">newObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token class-name">Fruit</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Fruit</span><span class="token punctuation">(</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">,</span> <span class="token number">101</span><span class="token punctuation">)</span><span class="token punctuation">,</span> fruit<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_ ObjectMapper_ 的简单 <em>readValue()</em> API 就足够了。我们可以使用它将 JSON 水果字符串反序列化为 <em>Fruit</em> Java 对象。</p><p>同样，我们可以使用 <em>writeValue()</em> API 将 <em>Fruit</em> 对象序列化为 JSON 输出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">withFruitObject_thenSerializeSucessfully</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Fruit</span> fruit <span class="token operator">=</span> <span class="token class-name">Fruit</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span><span class="token number">101</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token function">newObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>fruit<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;Apple\\&quot;,\\&quot;id\\&quot;:101}&quot;</span><span class="token punctuation">,</span> json<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试显示了我们如何使用 Lombok 构建器 API 构建一个 <em>Fruit</em>，并且序列化的 Java 对象与预期的 JSON 字符串匹配。</p><h2 id="_5-使用自定义构建器" tabindex="-1"><a class="header-anchor" href="#_5-使用自定义构建器"><span><strong>5. 使用自定义构建器</strong></span></a></h2><p>有时，我们可能需要使用自定义构建器实现，而不是 Lombok 为我们生成的那个。例如，<strong>当我们的 bean 的属性名称与 JSON 字符串中的字段名称不同时</strong>。</p><p>让我们想象我们要反序列化以下 JSON 字符串：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Bob&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是我们的 POJO 上的属性不匹配：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@Builder</span><span class="token punctuation">(</span>builderClassName <span class="token operator">=</span> <span class="token string">&quot;EmployeeBuilder&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@JsonDeserialize</span><span class="token punctuation">(</span>builder <span class="token operator">=</span> <span class="token class-name">Employee<span class="token punctuation">.</span>EmployeeBuilder</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> identity<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在这种情况下，我们可以使用 <em>@JsonDeserialize</em> 注解与 <em>@JsonPOJOBuilder</em> 注解</strong>，我们可以将其插入到生成的构建器类中，以覆盖 Jackson 的默认设置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@JsonPOJOBuilder</span><span class="token punctuation">(</span>buildMethodName <span class="token operator">=</span> <span class="token string">&quot;createEmployee&quot;</span><span class="token punctuation">,</span> withPrefix <span class="token operator">=</span> <span class="token string">&quot;construct&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">EmployeeBuilder</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> idValue<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> nameValue<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">EmployeeBuilder</span> <span class="token function">constructId</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        idValue <span class="token operator">=</span> id<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">EmployeeBuilder</span> <span class="token function">constructName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        nameValue <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Employee</span> <span class="token function">createEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span>idValue<span class="token punctuation">,</span> nameValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们可以像以前一样继续写测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">withEmployeeJSON_thenDeserializeSucessfully</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;id\\&quot;:5,\\&quot;name\\&quot;:\\&quot;Bob\\&quot;}&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Employee</span> employee <span class="token operator">=</span> <span class="token function">newObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token class-name">Employee</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> employee<span class="token punctuation">.</span><span class="token function">getIdentity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Bob&quot;</span><span class="token punctuation">,</span> employee<span class="token punctuation">.</span><span class="token function">getFirstName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果表明，尽管属性名称不匹配，但新的 <em>Employee</em> 数据对象已成功地从 JSON 源重新创建。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span><strong>6. 结论</strong></span></a></h2><p>在这篇简短的文章中，我们看到了两种简单的方法来配置我们的 Lombok 构建器类，以便与 Jackson 无缝协作。</p><p>如果没有 <em>@Jacksonized</em> 注解，我们将不得不特别定制我们的构建器类。然而，使用 <em>@Jacksonized</em> 让我们可以使用 Lombok 生成的构建器类。</p><p>如往常一样，文章的完整源代码可以在 GitHub 上找到。</p>`,40),o=[p];function c(l,i){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-12-Jackson s Deserialization With Lombok.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Jackson%20s%20Deserialization%20With%20Lombok.html","title":"Jackson 反序列化与 Lombok","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Jackson"],"tag":["Lombok","Deserialization"],"head":[["meta",{"name":"keywords","content":"Java, Jackson, Lombok, Deserialization"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Jackson%20s%20Deserialization%20With%20Lombok.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Jackson 反序列化与 Lombok"}],["meta",{"property":"og:description","content":"Jackson 反序列化与 Lombok 1. 概述 在大多数情况下，当我们使用 Project Lombok 时，我们会想要将我们的数据类与像 Jackson 这样的 JSON 框架结合起来。这在 JSON 在大多数现代 API 和数据服务中广泛使用的情况下尤其如此。 在这个快速教程中，我们将看看如何配置我们的 Lombok 构建器类，以便与 Jac..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T05:43:14.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Lombok"}],["meta",{"property":"article:tag","content":"Deserialization"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T05:43:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Jackson 反序列化与 Lombok\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T05:43:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Jackson 反序列化与 Lombok 1. 概述 在大多数情况下，当我们使用 Project Lombok 时，我们会想要将我们的数据类与像 Jackson 这样的 JSON 框架结合起来。这在 JSON 在大多数现代 API 和数据服务中广泛使用的情况下尤其如此。 在这个快速教程中，我们将看看如何配置我们的 Lombok 构建器类，以便与 Jac..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 依赖","slug":"_2-依赖","link":"#_2-依赖","children":[]},{"level":2,"title":"3. 一个简单的 Fruit 领域","slug":"_3-一个简单的-fruit-领域","link":"#_3-一个简单的-fruit-领域","children":[]},{"level":2,"title":"4. 反序列化和序列化","slug":"_4-反序列化和序列化","link":"#_4-反序列化和序列化","children":[]},{"level":2,"title":"5. 使用自定义构建器","slug":"_5-使用自定义构建器","link":"#_5-使用自定义构建器","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720762994000,"updatedTime":1720762994000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.4,"words":1021},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Jackson s Deserialization With Lombok.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Jackson 反序列化与 Lombok</h1>\\n<h2><strong>1. 概述</strong></h2>\\n<p>在大多数情况下，当我们使用 Project Lombok 时，我们会想要将我们的数据类与像 Jackson 这样的 JSON 框架结合起来。这在 JSON 在大多数现代 API 和数据服务中广泛使用的情况下尤其如此。</p>\\n<p>在这个快速教程中，<strong>我们将看看如何配置我们的 Lombok 构建器类，以便与 Jackson 无缝协作</strong>。</p>\\n<h2><strong>2. 依赖</strong></h2>\\n<p>我们开始使用的所有需要是将 <em>org.projectlombok</em> 添加到我们的 <em>pom.xml</em> 中：</p>","autoDesc":true}');export{k as comp,d as data};
