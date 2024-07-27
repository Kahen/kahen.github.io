import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-CJGTm_7y.js";const t={},p=e(`<hr><h1 id="jackson中-jsonsubtypes与反射用于多态反序列化的比较" tabindex="-1"><a class="header-anchor" href="#jackson中-jsonsubtypes与反射用于多态反序列化的比较"><span>Jackson中@JsonSubTypes与反射用于多态反序列化的比较</span></a></h1><p>多态反序列化是Jackson的一个特性，Jackson是一个流行的Java JSON序列化和反序列化库。它允许我们将JSON反序列化到一个Java对象层级结构中，即使在编译时不知道具体类型。当你拥有一个父类和多个子类，并且我们希望在反序列化期间确定对象的实际类型，以不丢失关于对象多态性质的任何信息时，这个特性非常有用。</p><p>在本教程中，我们将探讨两种实现方式：使用类型处理注解来指示基类的子类型，或者使用基于_Reflections_的方法来扫描和注册所有子类型。</p><h2 id="_2-使用-jsontypeinfo和-jsonsubtypes进行多态反序列化" tabindex="-1"><a class="header-anchor" href="#_2-使用-jsontypeinfo和-jsonsubtypes进行多态反序列化"><span>2. 使用@JsonTypeInfo和@JsonSubTypes进行多态反序列化</span></a></h2><p>最直接的选择之一是Jackson多态类型处理注解。</p><p>让我们看一个实现示例，我们将使用@JsonTypeInfo和@JsonSubTypes来指示Vehicle实体的子类型，并根据现有属性进行反序列化：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@JsonTypeInfo</span><span class="token punctuation">(</span>use <span class="token operator">=</span> <span class="token class-name">JsonTypeInfo<span class="token punctuation">.</span>Id</span><span class="token punctuation">.</span><span class="token constant">NAME</span><span class="token punctuation">,</span> include <span class="token operator">=</span> <span class="token class-name">JsonTypeInfo<span class="token punctuation">.</span>As</span><span class="token punctuation">.</span><span class="token constant">EXISTING_PROPERTY</span><span class="token punctuation">,</span> property <span class="token operator">=</span> <span class="token string">&quot;type&quot;</span><span class="token punctuation">,</span> visible <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@JsonSubTypes</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@JsonSubTypes.Type</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token class-name">Vehicle<span class="token punctuation">.</span>ElectricVehicle</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> name <span class="token operator">=</span> <span class="token string">&quot;ELECTRIC_VEHICLE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token annotation punctuation">@JsonSubTypes.Type</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token class-name">Vehicle<span class="token punctuation">.</span>FuelVehicle</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> name <span class="token operator">=</span> <span class="token string">&quot;FUEL_VEHICLE&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> type<span class="token punctuation">;</span>

    <span class="token comment">// 标准setter和getter</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">ElectricVehicle</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>

        <span class="token class-name">String</span> autonomy<span class="token punctuation">;</span>
        <span class="token class-name">String</span> chargingTime<span class="token punctuation">;</span>

        <span class="token comment">// 标准setter和getter</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">FuelVehicle</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>

        <span class="token class-name">String</span> fuelType<span class="token punctuation">;</span>
        <span class="token class-name">String</span> transmissionType<span class="token punctuation">;</span>

        <span class="token comment">// 标准setter和getter</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们看看如何将JSON输入反序列化为Vehicle子类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenDeserializingPolymorphic_thenCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;type\\&quot;:\\&quot;ELECTRIC_VEHICLE\\&quot;,\\&quot;autonomy\\&quot;:\\&quot;500\\&quot;,\\&quot;chargingTime\\&quot;:\\&quot;200\\&quot;}&quot;</span><span class="token punctuation">;</span>

    <span class="token class-name">Vehicle</span> vehicle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">readerFor</span><span class="token punctuation">(</span><span class="token class-name">Vehicle</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Vehicle<span class="token punctuation">.</span>ElectricVehicle</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> vehicle<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用-jsontypeinfo与reflections注册子类型进行多态反序列化" tabindex="-1"><a class="header-anchor" href="#_3-使用-jsontypeinfo与reflections注册子类型进行多态反序列化"><span>3. 使用@JsonTypeInfo与Reflections注册子类型进行多态反序列化</span></a></h2><p>接下来，让我们探索一种不同的方法，通过创建自定义注解并使用Reflections库来扫描和注册所有现有子类型。</p><h3 id="_3-1-反射介绍" tabindex="-1"><a class="header-anchor" href="#_3-1-反射介绍"><span>3.1. 反射介绍</span></a></h3><p>反射是一个强大的特性，它允许Java程序在运行时检查或操纵其结构和行为。这很有用，因为我们可以使用自定义注解来指示每个子类型的类型名称，并使用Reflections来识别和注册它们。</p><p>我们的Reflections库指南更详细地描述了它以及它的用例。</p><h3 id="_3-2-maven依赖" tabindex="-1"><a class="header-anchor" href="#_3-2-maven依赖"><span>3.2. Maven依赖</span></a></h3><p>首先，要使用Reflections，我们需要添加reflections依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.reflections\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`reflections\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`0.10.2\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以在Maven中央仓库找到它的最新版本。</p><h3 id="_3-3-创建自定义注解以指示子类型的类型名称" tabindex="-1"><a class="header-anchor" href="#_3-3-创建自定义注解以指示子类型的类型名称"><span>3.3. 创建自定义注解以指示子类型的类型名称</span></a></h3><p>Java注解是一种元数据形式，它在编译时或运行时提供有关类、方法、字段和其他程序元素的额外信息。它们不直接影响代码的逻辑，而是为编译器或运行时环境提供指令或细节。</p><p>有关自定义注解的更多信息，可以在我们的关于在Java中创建自定义注解的文章中找到。</p><p><strong>为了指示每个Vehicle子类型的类型名称，我们将创建以下注解，具有运行时可见性，并适用于类型（类）：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">VehicleSubType</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们看看我们应该如何更新现有代码来指定每个定义的子类的类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@JsonTypeInfo</span><span class="token punctuation">(</span>use <span class="token operator">=</span> <span class="token class-name">JsonTypeInfo<span class="token punctuation">.</span>Id</span><span class="token punctuation">.</span><span class="token constant">NAME</span><span class="token punctuation">,</span> include <span class="token operator">=</span> <span class="token class-name">JsonTypeInfo<span class="token punctuation">.</span>As</span><span class="token punctuation">.</span><span class="token constant">EXISTING_PROPERTY</span><span class="token punctuation">,</span> property <span class="token operator">=</span> <span class="token string">&quot;type&quot;</span><span class="token punctuation">,</span> visible <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> type<span class="token punctuation">;</span>

    <span class="token comment">// 标准setter和getter</span>

    <span class="token annotation punctuation">@VehicleSubType</span><span class="token punctuation">(</span><span class="token string">&quot;ELECTRIC_VEHICLE&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">ElectricVehicle</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>

        <span class="token class-name">String</span> autonomy<span class="token punctuation">;</span>
        <span class="token class-name">String</span> chargingTime<span class="token punctuation">;</span>

        <span class="token comment">// 标准setter和getter</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@VehicleSubType</span><span class="token punctuation">(</span><span class="token string">&quot;FUEL_VEHICLE&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">FuelVehicle</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>

        <span class="token class-name">String</span> fuelType<span class="token punctuation">;</span>
        <span class="token class-name">String</span> transmissionType<span class="token punctuation">;</span>

        <span class="token comment">// 标准setter和getter</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，我们仍然需要在父类上使用@JsonTypeInfo注解来指定用于存储类型信息的属性。</p><h3 id="_3-4-使用反射注册子类型" tabindex="-1"><a class="header-anchor" href="#_3-4-使用反射注册子类型"><span>3.4. 使用反射注册子类型</span></a></h3><p><strong>最后，我们需要自定义Jackson ObjectMapper以注册注解类作为子类型。</strong></p><p>我们将首先识别所有使用我们自定义注解@VehicleSubType注解的类。之后，对于每个找到的类，我们可以提取注解的值，并使用相关类型名称注册子类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">ObjectMapper</span> <span class="token function">getCustomObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Reflections</span> reflections <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Reflections</span><span class="token punctuation">(</span><span class="token string">&quot;com.baeldung.jackson.polymorphicdeserialization.reflection&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Set</span>\`<span class="token operator">&lt;</span><span class="token class-name">Class</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token operator">&gt;</span> subtypes <span class="token operator">=</span> reflections<span class="token punctuation">.</span><span class="token function">getTypesAnnotatedWith</span><span class="token punctuation">(</span><span class="token class-name">VehicleSubType</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Class</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\` subType <span class="token operator">:</span> subtypes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">VehicleSubType</span> annotation <span class="token operator">=</span> subType<span class="token punctuation">.</span><span class="token function">getAnnotation</span><span class="token punctuation">(</span><span class="token class-name">VehicleSubType</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>annotation <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> typeName <span class="token operator">=</span> annotation<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            objectMapper<span class="token punctuation">.</span><span class="token function">registerSubtypes</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">NamedType</span><span class="token punctuation">(</span>subType<span class="token punctuation">,</span> typeName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> objectMapper<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们使用与之前相同的输入测试我们的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenDeserializingPolymorphic_thenCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;type\\&quot;:\\&quot;ELECTRIC_VEHICLE\\&quot;,\\&quot;autonomy\\&quot;:\\&quot;500\\&quot;,\\&quot;chargingTime\\&quot;:\\&quot;200\\&quot;}&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token function">getCustomObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Vehicle</span> vehicle <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token class-name">Vehicle</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Vehicle<span class="token punctuation">.</span>ElectricVehicle</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> vehicle<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-两种方法之间的差异" tabindex="-1"><a class="header-anchor" href="#_4-两种方法之间的差异"><span>4. 两种方法之间的差异</span></a></h2><p>@JsonSubTypes方法通过注解定义子类型及其类型名称，提供显式配置。<strong>这提供了一个集中且清晰的层次结构，确保了编译时的安全性。</strong></p><p>基于Reflections的注册允许在运行时动态发现子类型。虽然它减少了样板代码，但引入了运行时开销，缺乏编译时安全性，并需要外部依赖项进行类路径扫描。然而，这种方法可能适用于处理许多子类型的情况，因为添加新子类型不会影响现有代码。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们研究了两种不同的方法，重点关注使用自定义注解和Reflections来识别和注册子类型。</p><p>总之，它们之间的选择取决于应用程序的具体要求。如果项目的子类型已经已知且稳定，@JsonSubTypes提供了一个强大且更安全的选择。相反，基于Reflections的注册可能是对于需要灵活性和运行时适应性项目更好的选择。</p><p>如常，源代码可在GitHub上获得。</p>`,40),o=[p];function c(l,i){return a(),s("div",null,o)}const k=n(t,[["render",c],["__file","2024-07-02- JsonSubTypes vs. Reflections for Polymorphic Deserialization in Jackson.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-%20JsonSubTypes%20vs.%20Reflections%20for%20Polymorphic%20Deserialization%20in%20Jackson.html","title":"Jackson中@JsonSubTypes与反射用于多态反序列化的比较","lang":"zh-CN","frontmatter":{"date":"2024-07-02T00:00:00.000Z","category":["Java","Jackson"],"tag":["Polymorphic Deserialization","JsonSubTypes","Reflections"],"head":[["meta",{"name":"keywords","content":"Jackson, Polymorphism, Deserialization, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-%20JsonSubTypes%20vs.%20Reflections%20for%20Polymorphic%20Deserialization%20in%20Jackson.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Jackson中@JsonSubTypes与反射用于多态反序列化的比较"}],["meta",{"property":"og:description","content":"Jackson中@JsonSubTypes与反射用于多态反序列化的比较 多态反序列化是Jackson的一个特性，Jackson是一个流行的Java JSON序列化和反序列化库。它允许我们将JSON反序列化到一个Java对象层级结构中，即使在编译时不知道具体类型。当你拥有一个父类和多个子类，并且我们希望在反序列化期间确定对象的实际类型，以不丢失关于对象多..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T08:37:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Polymorphic Deserialization"}],["meta",{"property":"article:tag","content":"JsonSubTypes"}],["meta",{"property":"article:tag","content":"Reflections"}],["meta",{"property":"article:published_time","content":"2024-07-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T08:37:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Jackson中@JsonSubTypes与反射用于多态反序列化的比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-02T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T08:37:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Jackson中@JsonSubTypes与反射用于多态反序列化的比较 多态反序列化是Jackson的一个特性，Jackson是一个流行的Java JSON序列化和反序列化库。它允许我们将JSON反序列化到一个Java对象层级结构中，即使在编译时不知道具体类型。当你拥有一个父类和多个子类，并且我们希望在反序列化期间确定对象的实际类型，以不丢失关于对象多..."},"headers":[{"level":2,"title":"2. 使用@JsonTypeInfo和@JsonSubTypes进行多态反序列化","slug":"_2-使用-jsontypeinfo和-jsonsubtypes进行多态反序列化","link":"#_2-使用-jsontypeinfo和-jsonsubtypes进行多态反序列化","children":[]},{"level":2,"title":"3. 使用@JsonTypeInfo与Reflections注册子类型进行多态反序列化","slug":"_3-使用-jsontypeinfo与reflections注册子类型进行多态反序列化","link":"#_3-使用-jsontypeinfo与reflections注册子类型进行多态反序列化","children":[{"level":3,"title":"3.1. 反射介绍","slug":"_3-1-反射介绍","link":"#_3-1-反射介绍","children":[]},{"level":3,"title":"3.2. Maven依赖","slug":"_3-2-maven依赖","link":"#_3-2-maven依赖","children":[]},{"level":3,"title":"3.3. 创建自定义注解以指示子类型的类型名称","slug":"_3-3-创建自定义注解以指示子类型的类型名称","link":"#_3-3-创建自定义注解以指示子类型的类型名称","children":[]},{"level":3,"title":"3.4. 使用反射注册子类型","slug":"_3-4-使用反射注册子类型","link":"#_3-4-使用反射注册子类型","children":[]}]},{"level":2,"title":"4. 两种方法之间的差异","slug":"_4-两种方法之间的差异","link":"#_4-两种方法之间的差异","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719909448000,"updatedTime":1719909448000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.6,"words":1380},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02- JsonSubTypes vs. Reflections for Polymorphic Deserialization in Jackson.md","localizedDate":"2024年7月2日","excerpt":"<hr>\\n<h1>Jackson中@JsonSubTypes与反射用于多态反序列化的比较</h1>\\n<p>多态反序列化是Jackson的一个特性，Jackson是一个流行的Java JSON序列化和反序列化库。它允许我们将JSON反序列化到一个Java对象层级结构中，即使在编译时不知道具体类型。当你拥有一个父类和多个子类，并且我们希望在反序列化期间确定对象的实际类型，以不丢失关于对象多态性质的任何信息时，这个特性非常有用。</p>\\n<p>在本教程中，我们将探讨两种实现方式：使用类型处理注解来指示基类的子类型，或者使用基于_Reflections_的方法来扫描和注册所有子类型。</p>\\n<h2>2. 使用@JsonTypeInfo和@JsonSubTypes进行多态反序列化</h2>","autoDesc":true}');export{k as comp,d as data};
