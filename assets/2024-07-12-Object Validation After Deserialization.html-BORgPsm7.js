import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-D5kFWV-m.js";const t={},p=e(`<hr><h1 id="java对象反序列化后验证" tabindex="-1"><a class="header-anchor" href="#java对象反序列化后验证"><span>Java对象反序列化后验证</span></a></h1><p>在本教程中，我们将看到如何使用Java的验证API在反序列化后验证对象。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><h2 id="_2-手动触发验证" tabindex="-1"><a class="header-anchor" href="#_2-手动触发验证"><span>2. 手动触发验证</span></a></h2><p>Java的bean验证API定义在JSR 380中。它的一个常见用途是在Spring控制器中使用<code>@Valid</code>注解参数。然而，在本文中，我们将专注于控制器之外的验证。</p><p>首先，让我们编写一个方法来验证对象的内容是否符合其验证约束。为此，我们将从默认验证器工厂获取<code>Validator</code>。然后，我们将<code>validate()</code>方法应用于对象。此方法返回一个<code>ConstraintViolation</code>的<code>Set</code>。<code>ConstraintViolation</code>封装了一些有关验证错误的提示。为了保持简单，如果出现任何验证问题，我们将只抛出一个<code>ConstraintViolationException</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\` <span class="token keyword">void</span> <span class="token function">validate</span><span class="token punctuation">(</span><span class="token class-name">T</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Set</span><span class="token operator">&lt;</span><span class="token class-name">ConstraintViolation</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`<span class="token operator">&gt;</span> violations <span class="token operator">=</span> validator<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>violations<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ConstraintViolationException</span><span class="token punctuation">(</span>violations<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们在对象上调用此方法，如果对象不尊重任何验证约束，它将会抛出异常。此方法可以在任何具有附加约束的现有对象上调用。</p><h2 id="_3-将验证集成到反序列化过程中" tabindex="-1"><a class="header-anchor" href="#_3-将验证集成到反序列化过程中"><span>3. 将验证集成到反序列化过程中</span></a></h2><p>我们现在的目标是将验证集成到反序列化过程中。具体来说，我们将重写Jackson的反序列化器，在反序列化后立即执行验证。这将确保每次我们反序列化一个对象时，如果它不符合要求，我们不允许进行任何进一步的处理。</p><p>首先，我们需要重写默认的<code>BeanDeserializer</code>。<code>BeanDeserializer</code>是一个可以反序列化对象的类。我们希望调用基本的反序列化方法，然后应用我们的<code>validate()</code>方法到创建的实例。我们的<code>BeanDeserializerWithValidation</code>看起来像这样：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BeanDeserializerWithValidation</span> <span class="token keyword">extends</span> <span class="token class-name">BeanDeserializer</span> <span class="token punctuation">{</span>

    <span class="token keyword">protected</span> <span class="token class-name">BeanDeserializerWithValidation</span><span class="token punctuation">(</span><span class="token class-name">BeanDeserializerBase</span> src<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>src<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">deserialize</span><span class="token punctuation">(</span><span class="token class-name">JsonParser</span> p<span class="token punctuation">,</span> <span class="token class-name">DeserializationContext</span> ctxt<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Object</span> instance <span class="token operator">=</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">deserialize</span><span class="token punctuation">(</span>p<span class="token punctuation">,</span> ctxt<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">validate</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下一步是实现我们自己的<code>BeanDeserializerModifier</code>。这将允许我们使用在<code>BeanDeserializerWithValidation</code>中定义的行为来改变反序列化过程：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BeanDeserializerModifierWithValidation</span> <span class="token keyword">extends</span> <span class="token class-name">BeanDeserializerModifier</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">JsonDeserializer</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">modifyDeserializer</span><span class="token punctuation">(</span><span class="token class-name">DeserializationConfig</span> config<span class="token punctuation">,</span> <span class="token class-name">BeanDescription</span> beanDesc<span class="token punctuation">,</span> <span class="token class-name">JsonDeserializer</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\`\` deserializer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>deserializer <span class="token keyword">instanceof</span> <span class="token class-name">BeanDeserializer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">BeanDeserializerWithValidation</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">BeanDeserializer</span><span class="token punctuation">)</span> deserializer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> deserializer<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们需要创建一个<code>ObjectMapper</code>并将我们的<code>BeanDeserializerModifier</code>注册为一个<code>Module</code>。<code>Module</code>是扩展Jackson默认功能的一种方式。让我们将它包装在一个方法中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ObjectMapper</span> <span class="token function">getObjectMapperWithValidation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">SimpleModule</span> validationModule <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleModule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    validationModule<span class="token punctuation">.</span><span class="token function">setDeserializerModifier</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BeanDeserializerModifierWithValidation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ObjectMapper</span> mapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    mapper<span class="token punctuation">.</span><span class="token function">registerModule</span><span class="token punctuation">(</span>validationModule<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> mapper<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-示例用法-从文件读取并验证对象" tabindex="-1"><a class="header-anchor" href="#_4-示例用法-从文件读取并验证对象"><span>4. 示例用法：从文件读取并验证对象</span></a></h2><p>现在我们将展示一个小示例，展示如何使用我们的自定义<code>ObjectMapper</code>。首先，让我们定义一个<code>Student</code>对象。一个<code>Student</code>有一个名字。名字的长度必须在5到10个字符之间：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Size</span><span class="token punctuation">(</span>min <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">,</span> max <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">,</span> message <span class="token operator">=</span> <span class="token string">&quot;Student&#39;s name must be between 5 and 10 characters&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们创建一个<code>validStudent.json</code>文件，其中包含有效<code>Student</code>对象的JSON表示：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Daniel&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将以<code>InputStream</code>的形式读取此文件的内容。首先，让我们定义一个方法，将<code>InputStream</code>解析为<code>Student</code>对象并同时进行验证。为此，我们想使用我们的<code>ObjectMapper</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Student</span> <span class="token function">readStudent</span><span class="token punctuation">(</span><span class="token class-name">InputStream</span> inputStream<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">ObjectMapper</span> mapper <span class="token operator">=</span> <span class="token function">getObjectMapperWithValidation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> mapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">,</span> <span class="token class-name">Student</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以编写一个测试，我们将：</p><ul><li>首先将文件的内容读入<code>InputStream</code></li><li>将<code>InputStream</code>转换为<code>Student</code>对象</li><li>检查<code>Student</code>对象的内容是否与预期一致</li></ul><p>这个测试看起来像这样：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenValidStudent_WhenReadStudent_ThenReturnStudent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span><span class="token string">&quot;validStudent.json&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Student</span> result <span class="token operator">=</span> <span class="token function">readStudent</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Daniel&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似地，我们可以创建一个<code>invalid.json</code>文件，其中包含一个名字长度少于5个字符的<code>Student</code>的JSON表示：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Max&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们需要调整我们的测试，以检查是否真的抛出了<code>ConstraintViolationException</code>。此外，我们可以检查错误消息是否正确：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenStudentWithInvalidName_WhenReadStudent_ThenThrows</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span><span class="token string">&quot;invalidStudent.json&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ConstraintViolationException</span> constraintViolationException <span class="token operator">=</span> <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">ConstraintViolationException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">readStudent</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;name: Student&#39;s name must be between 5 and 10 characters&quot;</span><span class="token punctuation">,</span> constraintViolationException<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们看到了如何重写Jackson的配置，在反序列化后立即验证一个对象。因此，我们可以保证之后不可能使用无效的对象进行工作。</p><p>如常，相关代码可在GitHub上找到。</p>`,35),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","2024-07-12-Object Validation After Deserialization.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Object%20Validation%20After%20Deserialization.html","title":"Java对象反序列化后验证","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Jackson"],"tag":["Java","Validation API","Deserialization"],"head":[["meta",{"name":"keywords","content":"Java, Jackson, Validation API, Deserialization"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Object%20Validation%20After%20Deserialization.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java对象反序列化后验证"}],["meta",{"property":"og:description","content":"Java对象反序列化后验证 在本教程中，我们将看到如何使用Java的验证API在反序列化后验证对象。 1. 概述 2. 手动触发验证 Java的bean验证API定义在JSR 380中。它的一个常见用途是在Spring控制器中使用@Valid注解参数。然而，在本文中，我们将专注于控制器之外的验证。 首先，让我们编写一个方法来验证对象的内容是否符合其验证..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T08:45:43.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Validation API"}],["meta",{"property":"article:tag","content":"Deserialization"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T08:45:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java对象反序列化后验证\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T08:45:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java对象反序列化后验证 在本教程中，我们将看到如何使用Java的验证API在反序列化后验证对象。 1. 概述 2. 手动触发验证 Java的bean验证API定义在JSR 380中。它的一个常见用途是在Spring控制器中使用@Valid注解参数。然而，在本文中，我们将专注于控制器之外的验证。 首先，让我们编写一个方法来验证对象的内容是否符合其验证..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 手动触发验证","slug":"_2-手动触发验证","link":"#_2-手动触发验证","children":[]},{"level":2,"title":"3. 将验证集成到反序列化过程中","slug":"_3-将验证集成到反序列化过程中","link":"#_3-将验证集成到反序列化过程中","children":[]},{"level":2,"title":"4. 示例用法：从文件读取并验证对象","slug":"_4-示例用法-从文件读取并验证对象","link":"#_4-示例用法-从文件读取并验证对象","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720773943000,"updatedTime":1720773943000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.64,"words":1093},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Object Validation After Deserialization.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java对象反序列化后验证</h1>\\n<p>在本教程中，我们将看到如何使用Java的验证API在反序列化后验证对象。</p>\\n<h2>1. 概述</h2>\\n<h2>2. 手动触发验证</h2>\\n<p>Java的bean验证API定义在JSR 380中。它的一个常见用途是在Spring控制器中使用<code>@Valid</code>注解参数。然而，在本文中，我们将专注于控制器之外的验证。</p>\\n<p>首先，让我们编写一个方法来验证对象的内容是否符合其验证约束。为此，我们将从默认验证器工厂获取<code>Validator</code>。然后，我们将<code>validate()</code>方法应用于对象。此方法返回一个<code>ConstraintViolation</code>的<code>Set</code>。<code>ConstraintViolation</code>封装了一些有关验证错误的提示。为了保持简单，如果出现任何验证问题，我们将只抛出一个<code>ConstraintViolationException</code>：</p>","autoDesc":true}');export{r as comp,k as data};
