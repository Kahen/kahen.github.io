import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CtR6X2Br.js";const e={},p=t(`<h1 id="jackson中offsetdatetime的序列化" tabindex="-1"><a class="header-anchor" href="#jackson中offsetdatetime的序列化"><span>Jackson中OffsetDateTime的序列化</span></a></h1><p>在本教程中，我们将探讨如何使用Jackson序列化OffsetDateTime。</p><p><strong>OffsetDateTime是ISO-8601日历系统中带有UTC/格林尼治标准时间偏移的日期时间的不可变表示。</strong> 例如，2023-10-31T01:30+01:00表示2023年10月31日的最后一分钟的日期时间，与UTC有一小时的偏移。</p><p>默认情况下，Jackson不序列化OffsetDateTime，因为它是Java 8日期时间类型。让我们看看如何启用它。</p><h3 id="_2-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-依赖项"><span>2.1. 依赖项</span></a></h3><p>首先，让我们通过向我们的pom.xml添加Jackson databind依赖项来开始：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`com.fasterxml.jackson.core\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`jackson-databind\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`2.14.1\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-代码示例" tabindex="-1"><a class="header-anchor" href="#_2-2-代码示例"><span>2.2. 代码示例</span></a></h3><p>首先，让我们定义我们想要序列化的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">OffsetDateTime</span> createdAt<span class="token punctuation">;</span>

    <span class="token comment">// 构造函数，getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将创建一个方法将User对象序列化为JSON：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">serializeUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    user<span class="token punctuation">.</span><span class="token function">setCreatedAt</span><span class="token punctuation">(</span><span class="token class-name">OffsetDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2021-09-30T15:30:00+01:00&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> objectMapper<span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们调用上述方法，我们将得到以下错误：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>Exception in thread &quot;main&quot; com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Java 8 date/time type \`java.time.OffsetDateTime\` not supported by default: add Module &quot;com.fasterxml.jackson.datatype:jackson-datatype-jsr310&quot; to enable handling (through reference chain: com.baeldung.offsetdatetime.User[&quot;createdAt&quot;])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如我们所看到的，Jackson默认不支持序列化OffsetDateTime。让我们看看如何修复这个问题。</p><h3 id="_3-注册javatimemodule" tabindex="-1"><a class="header-anchor" href="#_3-注册javatimemodule"><span>3. 注册JavaTimeModule</span></a></h3><p>正如错误消息所建议的，Jackson提供了一个名为JavaTimeModule的模块，我们可以使用它来以正确的格式序列化OffsetDateTime。</p><p>首先，我们需要在我们的pom.xml中包含jackson-datatype-jsr310依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`com.fasterxml.jackson.datatype\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`jackson-datatype-jsr310\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`2.14.1\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以在序列化对象之前使用registerModule()方法将此模块注册到ObjectMapper：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">serializeUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    objectMapper<span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token class-name">SerializationFeature</span><span class="token punctuation">.</span><span class="token constant">WRITE_DATES_AS_TIMESTAMPS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    objectMapper<span class="token punctuation">.</span><span class="token function">registerModule</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">JavaTimeModule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    user<span class="token punctuation">.</span><span class="token function">setCreatedAt</span><span class="token punctuation">(</span><span class="token class-name">OffsetDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2021-09-30T15:30:00+01:00&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> objectMapper<span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用registerModule()方法将JavaTimeModule注册到ObjectMapper。我们还禁用了SerializationFeature.WRITE_DATES_AS_TIMESTAMPS特性，以获取与输入格式相同的日期，而不是作为时间戳。</p><p>当我们再次调用该方法时，错误消失了，我们得到了序列化日期的输出。我们可以使用JUnit测试来测试这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenUser_whenSerialized_thenCreatedDateIsSerialized</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;{\\&quot;createdAt\\&quot;:\\&quot;2021-09-30T15:30:00+01:00\\&quot;}&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Main</span><span class="token punctuation">.</span><span class="token function">serializeUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-自定义序列化和反序列化" tabindex="-1"><a class="header-anchor" href="#_4-自定义序列化和反序列化"><span>4. 自定义序列化和反序列化</span></a></h3><p>另一种解决问题的方法是为OffsetDateTime创建自定义序列化器。如果我们还想要自定义日期的格式，这将是首选的方法。</p><h4 id="_4-1-自定义序列化器" tabindex="-1"><a class="header-anchor" href="#_4-1-自定义序列化器"><span>4.1. 自定义序列化器</span></a></h4><p>我们可以通过创建一个扩展Jackson JsonSerializer类的类并覆盖serialize()方法来实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OffsetDateTimeSerializer</span> <span class="token keyword">extends</span> <span class="token class-name">JsonSerializer</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">OffsetDateTime</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">DateTimeFormatter</span> <span class="token constant">DATE_TIME_FORMATTER</span>
      <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">&quot;dd-MM-yyyy HH:mm:ss XXX&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">serialize</span><span class="token punctuation">(</span><span class="token class-name">OffsetDateTime</span> value<span class="token punctuation">,</span> <span class="token class-name">JsonGenerator</span> jsonGenerator<span class="token punctuation">,</span> <span class="token class-name">SerializerProvider</span> serializerProvider<span class="token punctuation">)</span>
      <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IOException</span><span class="token punctuation">(</span><span class="token string">&quot;OffsetDateTime argument is null.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        jsonGenerator<span class="token punctuation">.</span><span class="token function">writeString</span><span class="token punctuation">(</span><span class="token constant">DATE_TIME_FORMATTER</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看上述代码的一些重要点：</p><ul><li>我们创建了一个DateTimeFormatter，使用我们想要的格式。这里我们使用了与默认格式不同的格式。</li><li>接下来，我们通过调用DateTimeFormatter上的format()方法来格式化日期。</li><li>最后，我们通过调用JsonGenerator上的writeString()方法将格式化的日期写入。</li></ul><p>现在我们可以在序列化对象之前将此序列化器注册到ObjectMapper：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">customSerialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    objectMapper<span class="token punctuation">.</span><span class="token function">registerModule</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SimpleModule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addSerializer</span><span class="token punctuation">(</span><span class="token class-name">OffsetDateTime</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">OffsetDateTimeSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    user<span class="token punctuation">.</span><span class="token function">setCreatedAt</span><span class="token punctuation">(</span><span class="token class-name">OffsetDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2021-09-30T15:30:00+01:00&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> objectMapper<span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在可以测试我们是否按照序列化器中指定的格式获得了日期：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenUser_whenCustomSerialized_thenCreatedDateIsSerialized</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;{\\&quot;createdAt\\&quot;:\\&quot;30-09-2021 15:30:00 +01:00\\&quot;}&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Main</span><span class="token punctuation">.</span><span class="token function">customSerialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-2-自定义反序列化器" tabindex="-1"><a class="header-anchor" href="#_4-2-自定义反序列化器"><span>4.2. 自定义反序列化器</span></a></h4><p>由于我们创建了一个自定义序列化器，我们还需要创建一个自定义反序列化器来从JSON字符串中反序列化日期。如果我们不这样做，我们会再次得到相同的InvalidDefinitionException。</p><p>我们可以通过创建一个扩展JsonDeserializer并覆盖deserialize()方法的类来实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OffsetDateTimeDeserializer</span> <span class="token keyword">extends</span> <span class="token class-name">JsonDeserializer</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">OffsetDateTime</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">DateTimeFormatter</span> <span class="token constant">DATE_TIME_FORMATTER</span>
      <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">&quot;dd-MM-yyyy HH:mm:ss XXX&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">OffsetDateTime</span> <span class="token function">deserialize</span><span class="token punctuation">(</span><span class="token class-name">JsonParser</span> jsonParser<span class="token punctuation">,</span> <span class="token class-name">DeserializationContext</span> deserializationContext<span class="token punctuation">)</span>
      <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> dateAsString <span class="token operator">=</span> jsonParser<span class="token punctuation">.</span><span class="token function">getText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>dateAsString <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IOException</span><span class="token punctuation">(</span><span class="token string">&quot;OffsetDateTime argument is null.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">OffsetDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>dateAsString<span class="token punctuation">,</span> <span class="token constant">DATE_TIME_FORMATTER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与序列化器类似，我们创建了一个DateTimeFormatter，使用我们想要的格式。最后，我们将格式化器传递给parse()方法以获取OffsetDateTime对象并返回该值。</p><p>我们可以在任何想要反序列化对象的地方将此反序列化器注册到ObjectMapper：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">customDeserialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    objectMapper<span class="token punctuation">.</span><span class="token function">registerModule</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SimpleModule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addDeserializer</span><span class="token punctuation">(</span><span class="token class-name">OffsetDateTime</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">OffsetDateTimeDeserializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;createdAt\\&quot;:\\&quot;30-09-2021 15:30:00 +01:00\\&quot;}&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token class-name">User</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> returnedUser<span class="token punctuation">.</span><span class="token function">getCreatedAt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在输出中以默认的OffsetDateTime格式获得了日期：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenUser_whenCustomDeserialized_thenCreatedDateIsDeserialized</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;2021-09-30T15:30+01:00&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Main</span><span class="token punctuation">.</span><span class="token function">customDeserialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们看到了如何使用Jackson序列化和反序列化OffsetDateTime。我们看到了两种解决Jackson默认序列化OffsetDateTime的方法——首先是使用JavaTimeModule，其次是通过定义自定义序列化器。</p><p>如常，本文的代码示例可以在GitHub上找到。</p>`,47),o=[p];function c(i,l){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-07-OffsetDateTime Serialization With Jackson.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-OffsetDateTime%20Serialization%20With%20Jackson.html","title":"Jackson中OffsetDateTime的序列化","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Jackson"],"tag":["OffsetDateTime","Serialization"],"head":[["meta",{"name":"keywords","content":"Java, Jackson, OffsetDateTime, Serialization"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-OffsetDateTime%20Serialization%20With%20Jackson.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Jackson中OffsetDateTime的序列化"}],["meta",{"property":"og:description","content":"Jackson中OffsetDateTime的序列化 在本教程中，我们将探讨如何使用Jackson序列化OffsetDateTime。 OffsetDateTime是ISO-8601日历系统中带有UTC/格林尼治标准时间偏移的日期时间的不可变表示。 例如，2023-10-31T01:30+01:00表示2023年10月31日的最后一分钟的日期时间，与U..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T20:59:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"OffsetDateTime"}],["meta",{"property":"article:tag","content":"Serialization"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T20:59:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Jackson中OffsetDateTime的序列化\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T20:59:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Jackson中OffsetDateTime的序列化 在本教程中，我们将探讨如何使用Jackson序列化OffsetDateTime。 OffsetDateTime是ISO-8601日历系统中带有UTC/格林尼治标准时间偏移的日期时间的不可变表示。 例如，2023-10-31T01:30+01:00表示2023年10月31日的最后一分钟的日期时间，与U..."},"headers":[{"level":3,"title":"2.1. 依赖项","slug":"_2-1-依赖项","link":"#_2-1-依赖项","children":[]},{"level":3,"title":"2.2. 代码示例","slug":"_2-2-代码示例","link":"#_2-2-代码示例","children":[]},{"level":3,"title":"3. 注册JavaTimeModule","slug":"_3-注册javatimemodule","link":"#_3-注册javatimemodule","children":[]},{"level":3,"title":"4. 自定义序列化和反序列化","slug":"_4-自定义序列化和反序列化","link":"#_4-自定义序列化和反序列化","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720385958000,"updatedTime":1720385958000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.31,"words":1294},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-OffsetDateTime Serialization With Jackson.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨如何使用Jackson序列化OffsetDateTime。</p>\\n<p><strong>OffsetDateTime是ISO-8601日历系统中带有UTC/格林尼治标准时间偏移的日期时间的不可变表示。</strong> 例如，2023-10-31T01:30+01:00表示2023年10月31日的最后一分钟的日期时间，与UTC有一小时的偏移。</p>\\n<p>默认情况下，Jackson不序列化OffsetDateTime，因为它是Java 8日期时间类型。让我们看看如何启用它。</p>\\n<h3>2.1. 依赖项</h3>\\n<p>首先，让我们通过向我们的pom.xml添加Jackson databind依赖项来开始：</p>","autoDesc":true}');export{k as comp,d as data};
