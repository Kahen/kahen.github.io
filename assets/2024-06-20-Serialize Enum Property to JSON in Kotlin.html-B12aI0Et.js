import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BFSC0J8L.js";const e={},o=t(`<h1 id="在kotlin中将枚举属性序列化为json" tabindex="-1"><a class="header-anchor" href="#在kotlin中将枚举属性序列化为json"><span>在Kotlin中将枚举属性序列化为JSON</span></a></h1><p>在Kotlin中，处理JSON序列化通常需要处理枚举。当将这些枚举序列化为JSON时，我们需要确保它们正确地转换为字符串表示形式。</p><p>在本教程中，我们将探讨如何使用一些流行的JSON序列化库在Kotlin中将枚举字段序列化为JSON。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>像往常一样，让我们通过一个例子来理解问题。假设我们有一个表示不同编程语言的枚举类：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">enum</span> <span class="token keyword">class</span> <span class="token function">Language</span><span class="token punctuation">(</span><span class="token keyword">val</span> description<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">KOTLIN</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin_is_awesome&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">JAVA</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Java_is_great&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">GO</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Go_is_nice&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示的_Language_枚举，它有一个_String_属性：<em>description</em>。</p><p>接下来，让我们创建一个使用_Language_枚举的数据类：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">Dev</span><span class="token punctuation">(</span><span class="token keyword">val</span> name<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">val</span> language<span class="token operator">:</span> Language<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一个_Dev_实例代表一个开发者，包括他/她的名字和他/她主要使用的编程语言。</p><p>现在，让我们创建一个_Dev_实例并将对象序列化为JSON：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> mapper <span class="token operator">=</span> <span class="token function">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">registerModule</span><span class="token punctuation">(</span>KotlinModule<span class="token punctuation">.</span><span class="token function">Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> dev <span class="token operator">=</span> <span class="token function">Dev</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kai&quot;</span></span><span class="token punctuation">,</span> Language<span class="token punctuation">.</span>KOTLIN<span class="token punctuation">)</span>
<span class="token keyword">val</span> json <span class="token operator">=</span> mapper<span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>dev<span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal multiline"><span class="token string">&quot;&quot;&quot;{&quot;name&quot;:&quot;Kai&quot;,&quot;language&quot;:&quot;KOTLIN&quot;}&quot;&quot;&quot;</span></span><span class="token punctuation">,</span> json<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述测试显示，默认情况下<strong>枚举的_name_用于表示序列化JSON中的枚举对象</strong>。</p><p>我们以流行的Jackson库为例来序列化_dev_对象。<strong>其他JSON序列化方法，如Gson和kotlinx.serialization，遵循相同的默认行为。</strong></p><p>然而，有时我们希望<strong>在JSON中使用枚举属性的值而不是其名称作为序列化结果</strong>，例如，Language的_description_。</p><p>接下来，让我们看看如何使用不同的序列化库来实现它。</p><h2 id="_3-使用jackson库" tabindex="-1"><a class="header-anchor" href="#_3-使用jackson库"><span>3. 使用Jackson库</span></a></h2><p><strong>Jackson的_@JsonValue_注解允许我们使用注解属性的值作为结果JSON中的序列化输出。</strong></p><p>所以，让我们在_description_属性上放置_@JsonValue_：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">enum</span> <span class="token keyword">class</span> <span class="token function">Language</span><span class="token punctuation">(</span><span class="token annotation builtin">@JsonValue</span> <span class="token keyword">val</span> description<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">KOTLIN</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin_is_awesome&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">JAVA</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Java_is_great&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">GO</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Go_is_nice&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">data</span> <span class="token keyword">class</span> Dev <span class="token operator">..</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们创建一个测试来验证序列化的结果：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> mapper <span class="token operator">=</span> <span class="token function">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">registerModule</span><span class="token punctuation">(</span>KotlinModule<span class="token punctuation">.</span><span class="token function">Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> dev <span class="token operator">=</span> <span class="token function">Dev</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kai&quot;</span></span><span class="token punctuation">,</span> Language<span class="token punctuation">.</span>KOTLIN<span class="token punctuation">)</span>
<span class="token keyword">val</span> json <span class="token operator">=</span> mapper<span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>dev<span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal multiline"><span class="token string">&quot;&quot;&quot;{&quot;name&quot;:&quot;Kai&quot;,&quot;language&quot;:&quot;Kotlin_is_awesome&quot;}&quot;&quot;&quot;</span></span><span class="token punctuation">,</span> json<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如测试所示，_@JsonValue_注解解决了问题。</p><h2 id="_4-使用gson库" tabindex="-1"><a class="header-anchor" href="#_4-使用gson库"><span>4. 使用Gson库</span></a></h2><p>Gson是另一个流行的JSON库。有两种方法可以用来自定义Gson序列化枚举的方式：使用_@SerializedName_注解和创建自定义序列化器。</p><p>接下来，让我们更详细地看看这些方法。</p><h3 id="_4-1-使用-serializedname-注解" tabindex="-1"><a class="header-anchor" href="#_4-1-使用-serializedname-注解"><span>4.1. 使用_@SerializedName_注解</span></a></h3><p>Gson的_@SerializedName_允许我们在序列化JSON中使用提供的名称来标注注解成员。</p><p>因此，<strong>我们可以在枚举的每个实例上标注_@SerializedName，并使用相应的属性值作为名称</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">enum</span> <span class="token keyword">class</span> <span class="token function">Language</span><span class="token punctuation">(</span><span class="token keyword">val</span> description<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token annotation builtin">@SerializedName</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin_is_awesome&quot;</span></span><span class="token punctuation">)</span>
    <span class="token function">KOTLIN</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin_is_awesome&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token annotation builtin">@SerializedName</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Java_is_great&quot;</span></span><span class="token punctuation">)</span>
    <span class="token function">JAVA</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Java_is_great&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token annotation builtin">@SerializedName</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Go_is_nice&quot;</span></span><span class="token punctuation">)</span>
    <span class="token function">GO</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Go_is_nice&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">data</span> <span class="token keyword">class</span> Dev <span class="token operator">..</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与Jackson的_@JsonValue_不同，Gson的_@SerializedName_不能动态获取属性的值作为名称。因此，正如枚举代码所示，<strong>我们必须将属性值复制到每个_@SerializedName_注解中</strong>。</p><p>现在，如果我们使用Gson序列化一个_Dev_对象，Language.description的值将出现在JSON中，表示引用的_Language_对象：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> dev <span class="token operator">=</span> <span class="token function">Dev</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kai&quot;</span></span><span class="token punctuation">,</span> Language<span class="token punctuation">.</span>GO<span class="token punctuation">)</span>
<span class="token keyword">val</span> json <span class="token operator">=</span> <span class="token function">Gson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span>dev<span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal multiline"><span class="token string">&quot;&quot;&quot;{&quot;name&quot;:&quot;Kai&quot;,&quot;language&quot;:&quot;Go_is_nice&quot;}&quot;&quot;&quot;</span></span><span class="token punctuation">,</span> json<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如测试所示，_@SerializedName_解决了问题。但值得注意的是，我们必须手动将注解添加到每个枚举实例并复制相应的值。当一个枚举包含许多实例时，这些操作可能会出错。</p><p>为了避免这些手动步骤，我们可以创建一个自定义序列化器。</p><p>让我们接下来看看如何做到这一点。</p><h3 id="_4-2-创建自定义序列化器" tabindex="-1"><a class="header-anchor" href="#_4-2-创建自定义序列化器"><span>4.2. 创建自定义序列化器</span></a></h3><p><strong>要使用Gson创建自定义序列化器，我们可以继承_JsonSerializer_类并实现_serialize()_函数</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> LanguageSerializer <span class="token operator">:</span> JsonSerializer\`\`<span class="token operator">&lt;</span>Language<span class="token operator">&gt;</span>\`\` <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">serialize</span><span class="token punctuation">(</span>src<span class="token operator">:</span> Language<span class="token operator">?</span><span class="token punctuation">,</span> typeOfSrc<span class="token operator">:</span> Type<span class="token operator">?</span><span class="token punctuation">,</span> context<span class="token operator">:</span> JsonSerializationContext<span class="token operator">?</span><span class="token punctuation">)</span><span class="token operator">:</span> JsonElement <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">JsonPrimitive</span><span class="token punctuation">(</span><span class="token function">requireNotNull</span><span class="token punctuation">(</span>src<span class="token punctuation">)</span><span class="token punctuation">.</span>description<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于_Language.description_是_String_，我们可以使用_JsonPrimitive()<em>函数将_Language.description_的值包装为_JsonElement</em>。</p><p>如果我们通过自定义序列化器进行序列化，我们可以<strong>保持枚举和数据类原样</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">enum</span> <span class="token keyword">class</span> <span class="token function">Language</span><span class="token punctuation">(</span><span class="token keyword">val</span> description<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">KOTLIN</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin_is_awesome&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">JAVA</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Java_is_great&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">GO</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Go_is_nice&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">data</span> <span class="token keyword">class</span> Dev <span class="token operator">..</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们告诉Gson使用我们的_LanguageSerializer_并序列化一个_Dev_对象：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> gson <span class="token operator">=</span> <span class="token function">GsonBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">registerTypeAdapter</span><span class="token punctuation">(</span>Language<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">,</span> <span class="token function">LanguageSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> dev <span class="token operator">=</span> <span class="token function">Dev</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kai&quot;</span></span><span class="token punctuation">,</span> Language<span class="token punctuation">.</span>GO<span class="token punctuation">)</span>
<span class="token keyword">val</span> json <span class="token operator">=</span> gson<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span>dev<span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal multiline"><span class="token string">&quot;&quot;&quot;{&quot;name&quot;:&quot;Kai&quot;,&quot;language&quot;:&quot;Go_is_nice&quot;}&quot;&quot;&quot;</span></span><span class="token punctuation">,</span> json<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，<strong>我们通过GsonBuilder()创建了一个_Gson_对象，注册了一个_LanguageSerializer_对象作为_TypeAdapter_</strong>，并使用这个_Gson_对象来序列化_dev_实例。</p><h2 id="_5-使用kotlinx-serialization" tabindex="-1"><a class="header-anchor" href="#_5-使用kotlinx-serialization"><span>5. 使用kotlinx.serialization</span></a></h2><p>由于kotlinx.serialization是一个Kotlin原生且易于使用的序列化库，它在Kotlin项目中被广泛使用。这个库也提供了两种解决方案来解决我们的问题：使用_@SerialName_注解和创建自定义序列化器。</p><p>接下来，让我们更详细地看看它们。</p><h3 id="_5-1-使用-serialname-注解" tabindex="-1"><a class="header-anchor" href="#_5-1-使用-serialname-注解"><span>5.1. 使用_@SerialName_注解</span></a></h3><p>像Gson的_@SerializedName_注解一样，<strong>kotlinx.serialization的_@SerialName_允许我们覆盖序列化JSON中类或属性的名称。</strong></p><p>它的用法也与Gson的_@SerializedName_非常相似。例如，<strong>如果我们想在序列化JSON中使用_Language_的_description_作为名称，我们必须在每个枚举实例上添加_@SerialName_，并设置相应的_description_值作为名称。</strong> 此外，我们必须在枚举和数据类上添加_@Serializable_：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Serializable</span>
<span class="token keyword">enum</span> <span class="token keyword">class</span> <span class="token function">Language</span><span class="token punctuation">(</span><span class="token keyword">val</span> description<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token annotation builtin">@SerialName</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin_is_awesome&quot;</span></span><span class="token punctuation">)</span>
    <span class="token function">KOTLIN</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin_is_awesome&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token annotation builtin">@SerialName</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Java_is_great&quot;</span></span><span class="token punctuation">)</span>
    <span class="token function">JAVA</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Java_is_great&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token annotation builtin">@SerialName</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Go_is_nice&quot;</span></span><span class="token punctuation">)</span>
    <span class="token function">GO</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Go_is_nice&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token annotation builtin">@Serializable</span>
<span class="token keyword">data</span> <span class="token keyword">class</span> Dev <span class="token operator">..</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们序列化一个_Dev_对象，看看我们是否能得到预期的JSON：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> dev <span class="token operator">=</span> <span class="token function">Dev</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kai&quot;</span></span><span class="token punctuation">,</span> Language<span class="token punctuation">.</span>JAVA<span class="token punctuation">)</span>
<span class="token keyword">val</span> json <span class="token operator">=</span> Json<span class="token punctuation">.</span><span class="token function">encodeToString</span><span class="token punctuation">(</span>dev<span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal multiline"><span class="token string">&quot;&quot;&quot;{&quot;name&quot;:&quot;Kai&quot;,&quot;language&quot;:&quot;Java_is_great&quot;}&quot;&quot;&quot;</span></span><span class="token punctuation">,</span> json<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如测试所示，_@SerialName_解决了问题。</p><h3 id="_5-2-创建自定义序列化器" tabindex="-1"><a class="header-anchor" href="#_5-2-创建自定义序列化器"><span>5.2. 创建自定义序列化器</span></a></h3><p>或者，<strong>我们可以通过扩展_KSerializer_类来创建自定义序列化器</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> LanguageSerializer <span class="token operator">:</span> KSerializer\`\`<span class="token operator">&lt;</span>Language<span class="token operator">&gt;</span>\`\` <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">val</span> descriptor<span class="token operator">:</span> SerialDescriptor <span class="token operator">=</span> <span class="token function">PrimitiveSerialDescriptor</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Language&quot;</span></span><span class="token punctuation">,</span> PrimitiveKind<span class="token punctuation">.</span>STRING<span class="token punctuation">)</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">deserialize</span><span class="token punctuation">(</span>decoder<span class="token operator">:</span> Decoder<span class="token punctuation">)</span><span class="token operator">:</span> Language <span class="token punctuation">{</span>
        <span class="token keyword">val</span> desc <span class="token operator">=</span> decoder<span class="token punctuation">.</span><span class="token function">decodeString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> Language<span class="token punctuation">.</span>entries<span class="token punctuation">.</span><span class="token function">first</span> <span class="token punctuation">{</span> desc <span class="token operator">==</span> it<span class="token punctuation">.</span>description <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">serialize</span><span class="token punctuation">(</span>encoder<span class="token operator">:</span> Encoder<span class="token punctuation">,</span> value<span class="token operator">:</span> Language<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        encoder<span class="token punctuation">.</span><span class="token function">encodeString</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span>description<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们想要使用_LanguageSerializer_进行_Language_序列化时，我们可以<strong>将_LanguageSerializer_添加到_Language_的_@Serializable_注解中</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Serializable</span><span class="token punctuation">(</span>with <span class="token operator">=</span> LanguageSerializer<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">enum</span> <span class="token keyword">class</span> <span class="token function">Language</span><span class="token punctuation">(</span><span class="token keyword">val</span> description<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">KOTINN</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin_is_awesome&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">JAVA</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Java_is_great&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">GO</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Go_is_nice&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token annotation builtin">@Serializable</span>
<span class="token keyword">data</span> <span class="token keyword">class</span> Dev <span class="token operator">..</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们检查序列化一个_Dev_对象时得到的JSON字符串：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> dev <span class="token operator">=</span> <span class="token function">Dev</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kai&quot;</span></span><span class="token punctuation">,</span> Language<span class="token punctuation">.</span>JAVA<span class="token punctuation">)</span>
<span class="token keyword">val</span> json <span class="token operator">=</span> Json<span class="token punctuation">.</span><span class="token function">encodeToString</span><span class="token punctuation">(</span>dev<span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal multiline"><span class="token string">&quot;&quot;&quot;{&quot;name&quot;:&quot;Kai&quot;,&quot;language&quot;:&quot;Java_is_great&quot;}&quot;&quot;&quot;</span></span><span class="token punctuation">,</span> json<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，kotlinx.serialization使用了我们的_LanguageSerializer_来序列化枚举实例，我们得到了预期的结果。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了如何在Kotlin中使用流行的序列化库进行枚举的JSON序列化。有了这些知识，我们可以自信地处理在Kotlin项目中将枚举值转换为JSON。</p><p>如常，示例的完整源代码可在GitHub上获取。</p><p><a href="https://www.baeldung.com/kotlin/json-enum-serialization" target="_blank" rel="noopener noreferrer">文章链接</a></p><p>OK</p>`,68),p=[o];function i(l,c){return a(),s("div",null,p)}const k=n(e,[["render",i],["__file","2024-06-20-Serialize Enum Property to JSON in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Serialize%20Enum%20Property%20to%20JSON%20in%20Kotlin.html","title":"在Kotlin中将枚举属性序列化为JSON","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Kotlin","JSON"],"tag":["Kotlin","JSON","Serialization","Enum","Jackson","Gson","kotlinx.serialization"],"head":[["meta",{"name":"keywords","content":"Kotlin, JSON, Serialization, Enum, Jackson, Gson, kotlinx.serialization"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Serialize%20Enum%20Property%20to%20JSON%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Kotlin中将枚举属性序列化为JSON"}],["meta",{"property":"og:description","content":"在Kotlin中将枚举属性序列化为JSON 在Kotlin中，处理JSON序列化通常需要处理枚举。当将这些枚举序列化为JSON时，我们需要确保它们正确地转换为字符串表示形式。 在本教程中，我们将探讨如何使用一些流行的JSON序列化库在Kotlin中将枚举字段序列化为JSON。 2. 问题介绍 像往常一样，让我们通过一个例子来理解问题。假设我们有一个表示..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"JSON"}],["meta",{"property":"article:tag","content":"Serialization"}],["meta",{"property":"article:tag","content":"Enum"}],["meta",{"property":"article:tag","content":"Jackson"}],["meta",{"property":"article:tag","content":"Gson"}],["meta",{"property":"article:tag","content":"kotlinx.serialization"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Kotlin中将枚举属性序列化为JSON\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Kotlin中将枚举属性序列化为JSON 在Kotlin中，处理JSON序列化通常需要处理枚举。当将这些枚举序列化为JSON时，我们需要确保它们正确地转换为字符串表示形式。 在本教程中，我们将探讨如何使用一些流行的JSON序列化库在Kotlin中将枚举字段序列化为JSON。 2. 问题介绍 像往常一样，让我们通过一个例子来理解问题。假设我们有一个表示..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用Jackson库","slug":"_3-使用jackson库","link":"#_3-使用jackson库","children":[]},{"level":2,"title":"4. 使用Gson库","slug":"_4-使用gson库","link":"#_4-使用gson库","children":[{"level":3,"title":"4.1. 使用_@SerializedName_注解","slug":"_4-1-使用-serializedname-注解","link":"#_4-1-使用-serializedname-注解","children":[]},{"level":3,"title":"4.2. 创建自定义序列化器","slug":"_4-2-创建自定义序列化器","link":"#_4-2-创建自定义序列化器","children":[]}]},{"level":2,"title":"5. 使用kotlinx.serialization","slug":"_5-使用kotlinx-serialization","link":"#_5-使用kotlinx-serialization","children":[{"level":3,"title":"5.1. 使用_@SerialName_注解","slug":"_5-1-使用-serialname-注解","link":"#_5-1-使用-serialname-注解","children":[]},{"level":3,"title":"5.2. 创建自定义序列化器","slug":"_5-2-创建自定义序列化器","link":"#_5-2-创建自定义序列化器","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.65,"words":1694},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Serialize Enum Property to JSON in Kotlin.md","localizedDate":"2024年6月20日","excerpt":"\\n<p>在Kotlin中，处理JSON序列化通常需要处理枚举。当将这些枚举序列化为JSON时，我们需要确保它们正确地转换为字符串表示形式。</p>\\n<p>在本教程中，我们将探讨如何使用一些流行的JSON序列化库在Kotlin中将枚举字段序列化为JSON。</p>\\n<h2>2. 问题介绍</h2>\\n<p>像往常一样，让我们通过一个例子来理解问题。假设我们有一个表示不同编程语言的枚举类：</p>\\n<div class=\\"language-kotlin\\" data-ext=\\"kt\\" data-title=\\"kt\\"><pre class=\\"language-kotlin\\"><code><span class=\\"token keyword\\">enum</span> <span class=\\"token keyword\\">class</span> <span class=\\"token function\\">Language</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">val</span> description<span class=\\"token operator\\">:</span> String<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function\\">KOTLIN</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"Kotlin_is_awesome\\"</span></span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span>\\n    <span class=\\"token function\\">JAVA</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"Java_is_great\\"</span></span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span>\\n    <span class=\\"token function\\">GO</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"Go_is_nice\\"</span></span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
