import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-8nJ1rqSf.js";const e={},p=t(`<hr><h1 id="jackson-映射中为-null-字段设置默认值" tabindex="-1"><a class="header-anchor" href="#jackson-映射中为-null-字段设置默认值"><span>Jackson 映射中为 Null 字段设置默认值</span></a></h1><p>在本教程中，我们将探讨使用 Jackson 解析 JSON 字符串时处理空值或缺失值的不同方法。我们将详细探讨三种提供不同控制级别的选项。</p><h2 id="_2-在类级别设置默认值" tabindex="-1"><a class="header-anchor" href="#_2-在类级别设置默认值"><span>2. 在类级别设置默认值</span></a></h2><p>我们将看到的第一个示例是如何在 POJO 中获取默认值，当它们完全缺失于传入的 JSON 字符串中。让我们创建一个对象，包含两个字段，一个是必需的，另一个我们将为其设置默认值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">NonAnnotatedDefaultValue</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> required<span class="token punctuation">;</span>
    <span class="token class-name">String</span> optional <span class="token operator">=</span> <span class="token string">&quot;defaultValue&quot;</span><span class="token punctuation">;</span>
    <span class="token comment">// 标准 getter 和 setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在这里为名为 <code>optional</code> 的字段分配了一个值。这将导致 Jackson 在 JSON 中缺少该字段时使用该字符串。现在让我们使用 <code>ObjectMapper</code> 对象及其 <code>readValue()</code> 方法来使用该对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAClassWithADefaultValue_whenReadingJsonWithoutOptionalValue_thenExpectDefaultValueInResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
    <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> noOptionalField <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;required\\&quot;: \\&quot;value\\&quot;}&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">NonAnnotatedDefaultValue</span> createdObject <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>noOptionalField<span class="token punctuation">,</span> <span class="token class-name">NonAnnotatedDefaultValue</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">assert</span><span class="token punctuation">(</span>createdObject<span class="token punctuation">.</span><span class="token function">getRequired</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">assert</span><span class="token punctuation">(</span>createdObject<span class="token punctuation">.</span><span class="token function">getOptional</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;defaultValue&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从断言中我们可以看到，结果对象既有来自 JSON 的值，也有我们之前指定的默认值。</p><p>**这种方法的缺点是，如果传入的 JSON 中属性完全缺失，它才能工作。**如果属性存在但值为 null，则 Jackson 不会应用默认值。在接下来的部分中，我们将看到让我们更好地处理 null 的方法。</p><h2 id="_3-实现-setter-方法以获得最大控制" tabindex="-1"><a class="header-anchor" href="#_3-实现-setter-方法以获得最大控制"><span>3. 实现 Setter 方法以获得最大控制</span></a></h2><p>我们可以通过实现字段的 setter 方法来完全控制映射过程。让我们创建一个带有 Jackson 在创建对象时将使用的必要 setter 的对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">SetterDefaultValue</span> <span class="token punctuation">{</span>
   <span class="token class-name">String</span> required<span class="token punctuation">;</span>
   <span class="token class-name">String</span> optional <span class="token operator">=</span> <span class="token string">&quot;valueIfMissingEntirely&quot;</span><span class="token punctuation">;</span>

   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setOptional</span><span class="token punctuation">(</span><span class="token class-name">String</span> optional<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span>optional <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
           <span class="token keyword">this</span><span class="token punctuation">.</span>optional <span class="token operator">=</span> <span class="token string">&quot;valueIfNull&quot;</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
   <span class="token comment">// 标准 getter 和 setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里我们像之前一样在类级别提供了默认值。然而，我们还提供了一个 setter 方法。在那个 setter 方法中，我们现在可以做任何我们想做的事情。在这个例子中，我们明确提供了如果值为 null 时预期的行为。如果在我们的 JSON 中没有包含该属性，Jackson 现在将把 <code>optional</code> 设置为 <code>valueIfMissingEntirely</code>，或者如果它被包含但设置为 null，则设置为 <code>valueIfNull</code>。</p><p>如果这符合我们的要求，我们可以将两个值都设为相同。让我们看看它在实践中的表现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAClassWithASetter_whenReadingJsonWithNullOptionalValue_thenExpectDefaultValueInResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
    <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> nullOptionalField <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;required\\&quot;: \\&quot;value\\&quot;, \\&quot;optional\\&quot;: null}&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">JsonSetterDefaultValue</span> createdObject <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>nullOptionalField<span class="token punctuation">,</span> <span class="token class-name">JsonSetterDefaultValue</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">assert</span><span class="token punctuation">(</span>createdObject<span class="token punctuation">.</span><span class="token function">getRequired</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">assert</span><span class="token punctuation">(</span>createdObject<span class="token punctuation">.</span><span class="token function">getOptional</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;valueIfNull&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里我们提供了一个 JSON，其中名为 <code>optional</code> 的字段被设置为 null。<strong>从断言中我们可以看到，在由 Jackson 创建的结果对象中，该字段已被设置为 <code>valueIfNull</code>，这得益于我们的注解。</strong> 这个选项为我们的方法提供了巨大的灵活性。如果我们愿意，我们也可以检查空字符串并以相同的方式应用默认值。</p><h2 id="_4-使用-jsonsetter-与-nulls-skip" tabindex="-1"><a class="header-anchor" href="#_4-使用-jsonsetter-与-nulls-skip"><span>4. 使用 @JsonSetter 与 Nulls.SKIP</span></a></h2><p>我们最后的选项是使用 @JsonSetter 并扩展其使用，以告诉它忽略 null。让我们创建一个新的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">NullsSkipDefaultValue</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> required<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@JsonSetter</span><span class="token punctuation">(</span>nulls <span class="token operator">=</span> <span class="token class-name">Nulls</span><span class="token punctuation">.</span><span class="token constant">SKIP</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> optional <span class="token operator">=</span> <span class="token string">&quot;defaultValue&quot;</span><span class="token punctuation">;</span>
    <span class="token comment">// 标准 getter 和 setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_Nulls.SKIP 参数告诉 @JsonSetter 跳过任何输入值为 null 的情况。</strong> 然后 Jackson 使用提供的默认值。在 Nulls 枚举中我们可以使用几种其他选项。例如，Nulls.SET 将告诉 Jackson 将 JSON 中的 null 转换为 POJO 中的 Java null。今天我们将坚持使用 Nulls.SKIP：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAClassWithAJsonSetterNullsSkip_whenReadingJsonWithNullOptionalValue_thenExpectDefaultValueInResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> nullOptionalField <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;required\\&quot;: \\&quot;value\\&quot;, \\&quot;optional\\&quot;: null}&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">NullsSkipDefaultValue</span> createdObject <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>nullOptionalField<span class="token punctuation">,</span> <span class="token class-name">NullsSkipDefaultValue</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">assert</span><span class="token punctuation">(</span>createdObject<span class="token punctuation">.</span><span class="token function">getRequired</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">assert</span><span class="token punctuation">(</span>createdObject<span class="token punctuation">.</span><span class="token function">getOptional</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;defaultValue&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面，我们可以看到，考虑到与第 3 节中相同的输入 JSON，其中 <code>optional</code> 字段被赋值为 null，我们得到了我们想要的默认值。如果我们没有提供可选字段，也会得到相同的结果。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了使用 Jackson 解析 JSON 时处理缺失或 null 值的三种方式。</p><p>在类级别设置值很有用，但如果我们有一个 null 值，它就会失败。我们可以改为实现一个 setter 方法以获得最大控制。或者，我们可以使用 @JsonSetter 覆盖字段声明以简单地忽略 nulls。所有三种方法都可能适合我们的情况，这取决于我们希望应用程序如何处理值为 null 的属性。</p><p>正如往常一样，示例的完整代码可在 GitHub 上找到。</p>`,27),o=[p];function l(c,u){return s(),a("div",null,o)}const d=n(e,[["render",l],["__file","2024-07-03-Setting Default Values to Null Fields in Jackson Mapping.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Setting%20Default%20Values%20to%20Null%20Fields%20in%20Jackson%20Mapping.html","title":"Jackson 映射中为 Null 字段设置默认值","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Jackson"],"tag":["JSON","POJO","Default Values"],"head":[["meta",{"name":"keywords","content":"Jackson, JSON, Default Values, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Setting%20Default%20Values%20to%20Null%20Fields%20in%20Jackson%20Mapping.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Jackson 映射中为 Null 字段设置默认值"}],["meta",{"property":"og:description","content":"Jackson 映射中为 Null 字段设置默认值 在本教程中，我们将探讨使用 Jackson 解析 JSON 字符串时处理空值或缺失值的不同方法。我们将详细探讨三种提供不同控制级别的选项。 2. 在类级别设置默认值 我们将看到的第一个示例是如何在 POJO 中获取默认值，当它们完全缺失于传入的 JSON 字符串中。让我们创建一个对象，包含两个字段，一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T23:33:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JSON"}],["meta",{"property":"article:tag","content":"POJO"}],["meta",{"property":"article:tag","content":"Default Values"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T23:33:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Jackson 映射中为 Null 字段设置默认值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T23:33:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Jackson 映射中为 Null 字段设置默认值 在本教程中，我们将探讨使用 Jackson 解析 JSON 字符串时处理空值或缺失值的不同方法。我们将详细探讨三种提供不同控制级别的选项。 2. 在类级别设置默认值 我们将看到的第一个示例是如何在 POJO 中获取默认值，当它们完全缺失于传入的 JSON 字符串中。让我们创建一个对象，包含两个字段，一..."},"headers":[{"level":2,"title":"2. 在类级别设置默认值","slug":"_2-在类级别设置默认值","link":"#_2-在类级别设置默认值","children":[]},{"level":2,"title":"3. 实现 Setter 方法以获得最大控制","slug":"_3-实现-setter-方法以获得最大控制","link":"#_3-实现-setter-方法以获得最大控制","children":[]},{"level":2,"title":"4. 使用 @JsonSetter 与 Nulls.SKIP","slug":"_4-使用-jsonsetter-与-nulls-skip","link":"#_4-使用-jsonsetter-与-nulls-skip","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720049616000,"updatedTime":1720049616000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.81,"words":1144},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Setting Default Values to Null Fields in Jackson Mapping.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Jackson 映射中为 Null 字段设置默认值</h1>\\n<p>在本教程中，我们将探讨使用 Jackson 解析 JSON 字符串时处理空值或缺失值的不同方法。我们将详细探讨三种提供不同控制级别的选项。</p>\\n<h2>2. 在类级别设置默认值</h2>\\n<p>我们将看到的第一个示例是如何在 POJO 中获取默认值，当它们完全缺失于传入的 JSON 字符串中。让我们创建一个对象，包含两个字段，一个是必需的，另一个我们将为其设置默认值：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">NonAnnotatedDefaultValue</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">String</span> required<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">String</span> optional <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"defaultValue\\"</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">// 标准 getter 和 setter</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
