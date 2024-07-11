import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-uizvaz9h.js";const t={},p=e(`<h1 id="如何使用mapstruct进行条件映射" tabindex="-1"><a class="header-anchor" href="#如何使用mapstruct进行条件映射"><span>如何使用MapStruct进行条件映射</span></a></h1><p>MapStruct 是一个代码生成工具，它简化了Java Bean类型之间的映射。在本文中，我们将探讨如何使用MapStruct进行条件映射，并查看实现它的不同配置。</p><p>在对象之间映射数据时，我们经常需要根据某些条件映射一个属性，MapStruct提供了一些配置选项来实现这一点。</p><p>让我们检查一个目标_License_对象的实例，它需要根据几个条件映射属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">License</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">UUID</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">OffsetDateTime</span> startDate<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">OffsetDateTime</span> endDate<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> active<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> renewalRequired<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">LicenseType</span> licenseType<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">LicenseType</span> <span class="token punctuation">{</span>
        <span class="token constant">INDIVIDUAL</span><span class="token punctuation">,</span> <span class="token constant">FAMILY</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输入_LicenseDto_包含一个可选的_startDate_、<em>endDate_和_licenseType</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LicenseDto</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">UUID</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> startDate<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> endDate<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> licenseType<span class="token punctuation">;</span>
    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从_LicenseDto_到_License_的映射规则如下：</p><ul><li><em>id</em> – 如果输入_LicenseDto_有_id_</li><li><em>startDate</em> – 如果输入_LicenseDto_在请求中没有_startDate_，让我们将_startDate_设置为当前日期</li><li><em>endDate</em> – 如果输入_LicenseDto_在请求中没有_endDate_，让我们将_endDate_设置为从当前日期起的一年</li><li><em>active</em> – 如果_endDate_在未来，我们将这个设置为_true_</li><li><em>renewalRequired</em> – 如果_endDate_在接下来的两周内，我们将这个设置为_true_</li><li><em>licenseType</em> – 如果输入_licenseType_可用并且是预期值INDIVIDUAL或FAMILY之一。</li></ul><p>让我们探索一些使用MapStruct提供的配置实现这一点的方法。</p><h3 id="_2-1-使用表达式" tabindex="-1"><a class="header-anchor" href="#_2-1-使用表达式"><span>2.1. 使用表达式</span></a></h3><p>MapStruct提供了在映射表达式中使用任何有效的Java表达式的能力来生成映射。让我们利用这个特性来映射_startDate_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mapping</span><span class="token punctuation">(</span>target <span class="token operator">=</span> <span class="token string">&quot;startDate&quot;</span><span class="token punctuation">,</span> expression <span class="token operator">=</span> <span class="token string">&quot;java(mapStartDate(licenseDto))&quot;</span><span class="token punctuation">)</span>
<span class="token class-name">License</span> <span class="token function">toLicense</span><span class="token punctuation">(</span><span class="token class-name">LicenseDto</span> licenseDto<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在可以定义方法_mapStartDate_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">default</span> <span class="token class-name">OffsetDateTime</span> <span class="token function">mapStartDate</span><span class="token punctuation">(</span><span class="token class-name">LicenseDto</span> licenseDto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> licenseDto<span class="token punctuation">.</span><span class="token function">getStartDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span>
      licenseDto<span class="token punctuation">.</span><span class="token function">getStartDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">atOffset</span><span class="token punctuation">(</span><span class="token class-name">ZoneOffset</span><span class="token punctuation">.</span><span class="token constant">UTC</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token class-name">OffsetDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在编译时，MapStruct生成的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">License</span> <span class="token function">toLicense</span><span class="token punctuation">(</span><span class="token class-name">LicenseDto</span> licenseDto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">License</span> license <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">License</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    license<span class="token punctuation">.</span><span class="token function">setStartDate</span><span class="token punctuation">(</span> <span class="token function">mapStartDate</span><span class="token punctuation">(</span>licenseDto<span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 其余生成的映射...</span>

    <span class="token keyword">return</span> license<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，如果不使用这个方法，方法中的三元运算可以直接传递到_expression_中，因为它是一个有效的Java表达式。</p><h3 id="_2-2-使用条件表达式" tabindex="-1"><a class="header-anchor" href="#_2-2-使用条件表达式"><span>2.2. 使用条件表达式</span></a></h3><p>类似于表达式，<strong>条件表达式是MapStruct的一个特性，它允许基于字符串内的Java代码条件表达式来映射一个属性。</strong> 生成的代码包含在_if_块中的条件，因此，让我们利用这个特性来映射_License_中的_renewalRequired_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mapping</span><span class="token punctuation">(</span>target <span class="token operator">=</span> <span class="token string">&quot;renewalRequired&quot;</span><span class="token punctuation">,</span> conditionExpression <span class="token operator">=</span> <span class="token string">&quot;java(isEndDateInTwoWeeks(licenseDto))&quot;</span><span class="token punctuation">,</span> source <span class="token operator">=</span> <span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span>
<span class="token class-name">License</span> <span class="token function">toLicense</span><span class="token punctuation">(</span><span class="token class-name">LicenseDto</span> licenseDto<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以在_java()_方法中传递任何有效的Java布尔表达式。让我们在映射器接口中定义_isEndDateInTwoWeeks_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">default</span> <span class="token keyword">boolean</span> <span class="token function">isEndDateInTwoWeeks</span><span class="token punctuation">(</span><span class="token class-name">LicenseDto</span> licenseDto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> licenseDto<span class="token punctuation">.</span><span class="token function">getEndDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span>
       <span class="token operator">&amp;&amp;</span> <span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">between</span><span class="token punctuation">(</span>licenseDto<span class="token punctuation">.</span><span class="token function">getEndDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toDays</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token number">14</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在编译时，MapStruct生成的代码将根据这个条件设置_renewalRequired_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">License</span> <span class="token function">toLicense</span><span class="token punctuation">(</span><span class="token class-name">LicenseDto</span> licenseDto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">License</span> license <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">License</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token function">isEndDateInTwoWeeks</span><span class="token punctuation">(</span>licenseDto<span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        license<span class="token punctuation">.</span><span class="token function">setRenewalRequired</span><span class="token punctuation">(</span> <span class="token function">isEndDateInTwoWeeks</span><span class="token punctuation">(</span> licenseDto <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 其余生成的映射...</span>

    <span class="token keyword">return</span> license<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以在条件匹配时从源设置属性的值。在这种情况下，映射器将使用源中的相应值填充所需的属性。</p><h3 id="_2-3-使用映射前后" tabindex="-1"><a class="header-anchor" href="#_2-3-使用映射前后"><span>2.3. 使用映射前后</span></a></h3><p><strong>在某些情况下，如果我们想在通过自定义修改对象之前或之后进行映射，我们可以利用MapStruct的_@BeforeMapping_和_@AfterMapping_注解。</strong> 让我们使用这个特性来映射_endDate_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mapping</span><span class="token punctuation">(</span>target <span class="token operator">=</span> <span class="token string">&quot;endDate&quot;</span><span class="token punctuation">,</span> ignore <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token class-name">License</span> <span class="token function">toLicense</span><span class="token punctuation">(</span><span class="token class-name">LicenseDto</span> licenseDto<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以定义_AfterMapping_注解来条件性地映射_endDate_。通过这种方式，我们可以基于特定条件控制映射：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@AfterMapping</span>
<span class="token keyword">default</span> <span class="token keyword">void</span> <span class="token function">afterMapping</span><span class="token punctuation">(</span><span class="token class-name">LicenseDto</span> licenseDto<span class="token punctuation">,</span> <span class="token annotation punctuation">@MappingTarget</span> <span class="token class-name">License</span> license<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">OffsetDateTime</span> endDate <span class="token operator">=</span> licenseDto<span class="token punctuation">.</span><span class="token function">getEndDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> licenseDto<span class="token punctuation">.</span><span class="token function">getEndDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">atOffset</span><span class="token punctuation">(</span><span class="token class-name">ZoneOffset</span><span class="token punctuation">.</span><span class="token constant">UTC</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token class-name">OffsetDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">plusYears</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    license<span class="token punctuation">.</span><span class="token function">setEndDate</span><span class="token punctuation">(</span>endDate<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要将输入_LicenseDto_和目标_License_对象作为参数传递给这个_afterMapping_方法。因此，这确保MapStruct生成的代码在返回_License_对象之前，将这个方法作为映射的最后步骤调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">License</span> <span class="token function">toLicense</span><span class="token punctuation">(</span><span class="token class-name">LicenseDto</span> licenseDto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">License</span> license <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">License</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 其余生成的映射...</span>

    <span class="token function">afterMapping</span><span class="token punctuation">(</span> licenseDto<span class="token punctuation">,</span> license <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> license<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，我们可以使用_BeforeMapping_注解来实现相同的结果。</p><h3 id="_2-4-使用-condition" tabindex="-1"><a class="header-anchor" href="#_2-4-使用-condition"><span>2.4. 使用_@Condition_</span></a></h3><p><strong>在映射时，我们可以使用_@Condition_向属性添加自定义存在性检查。默认情况下，MapStruct对每个属性执行存在性检查，但如果有可用的_@Condition_注解的方法，则会优先使用。</strong></p><p>让我们使用这个特性来映射_licenseType_。输入_LicenseDto_以_String_形式接收_licenseType_，并且在映射期间，如果它不是null并且解析为预期的枚举_INDIVIDUAL_或_FAMILY_之一，则需要将其映射到目标：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Condition</span>
<span class="token keyword">default</span> <span class="token keyword">boolean</span> <span class="token function">mapsToExpectedLicenseType</span><span class="token punctuation">(</span><span class="token class-name">String</span> licenseType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> licenseType <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token class-name">License<span class="token punctuation">.</span>LicenseType</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>licenseType<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MapStruct生成的代码将使用这个方法_mapsToExpectedLicenseType()<em>来映射_licenseType</em>，因为签名_String_与_LicenseDto_中的_licenseType_匹配：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">License</span> <span class="token function">toLicense</span><span class="token punctuation">(</span><span class="token class-name">LicenseDto</span> licenseDto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token class-name">LicenseMapper</span><span class="token punctuation">.</span><span class="token function">mapsToExpectedLicenseType</span><span class="token punctuation">(</span> licenseDto<span class="token punctuation">.</span><span class="token function">getLicenseType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        license<span class="token punctuation">.</span><span class="token function">setLicenseType</span><span class="token punctuation">(</span> <span class="token class-name">Enum</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span> <span class="token class-name">License<span class="token punctuation">.</span>LicenseType</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> licenseDto<span class="token punctuation">.</span><span class="token function">getLicenseType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 其余生成的映射...</span>

    <span class="token keyword">return</span> license<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在本文中，我们探讨了使用MapStruct条件性地在Java Bean类型之间映射属性的不同方式。</p><p>如常，示例的源代码可在GitHub上找到。</p>`,43),c=[p];function o(i,l){return s(),a("div",null,c)}const d=n(t,[["render",o],["__file","2024-06-30-How to Use Conditional Mapping With MapStruct.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-How%20to%20Use%20Conditional%20Mapping%20With%20MapStruct.html","title":"如何使用MapStruct进行条件映射","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["MapStruct","条件映射"],"head":[["meta",{"name":"keywords","content":"Java, MapStruct, 条件映射, 代码生成"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-How%20to%20Use%20Conditional%20Mapping%20With%20MapStruct.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何使用MapStruct进行条件映射"}],["meta",{"property":"og:description","content":"如何使用MapStruct进行条件映射 MapStruct 是一个代码生成工具，它简化了Java Bean类型之间的映射。在本文中，我们将探讨如何使用MapStruct进行条件映射，并查看实现它的不同配置。 在对象之间映射数据时，我们经常需要根据某些条件映射一个属性，MapStruct提供了一些配置选项来实现这一点。 让我们检查一个目标_License..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T22:32:32.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MapStruct"}],["meta",{"property":"article:tag","content":"条件映射"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T22:32:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何使用MapStruct进行条件映射\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T22:32:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何使用MapStruct进行条件映射 MapStruct 是一个代码生成工具，它简化了Java Bean类型之间的映射。在本文中，我们将探讨如何使用MapStruct进行条件映射，并查看实现它的不同配置。 在对象之间映射数据时，我们经常需要根据某些条件映射一个属性，MapStruct提供了一些配置选项来实现这一点。 让我们检查一个目标_License..."},"headers":[{"level":3,"title":"2.1. 使用表达式","slug":"_2-1-使用表达式","link":"#_2-1-使用表达式","children":[]},{"level":3,"title":"2.2. 使用条件表达式","slug":"_2-2-使用条件表达式","link":"#_2-2-使用条件表达式","children":[]},{"level":3,"title":"2.3. 使用映射前后","slug":"_2-3-使用映射前后","link":"#_2-3-使用映射前后","children":[]},{"level":3,"title":"2.4. 使用_@Condition_","slug":"_2-4-使用-condition","link":"#_2-4-使用-condition","children":[]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1719786752000,"updatedTime":1719786752000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.23,"words":1269},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-How to Use Conditional Mapping With MapStruct.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>MapStruct 是一个代码生成工具，它简化了Java Bean类型之间的映射。在本文中，我们将探讨如何使用MapStruct进行条件映射，并查看实现它的不同配置。</p>\\n<p>在对象之间映射数据时，我们经常需要根据某些条件映射一个属性，MapStruct提供了一些配置选项来实现这一点。</p>\\n<p>让我们检查一个目标_License_对象的实例，它需要根据几个条件映射属性：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">License</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">UUID</span> id<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">OffsetDateTime</span> startDate<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">OffsetDateTime</span> endDate<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">boolean</span> active<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">boolean</span> renewalRequired<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">LicenseType</span> licenseType<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">enum</span> <span class=\\"token class-name\\">LicenseType</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token constant\\">INDIVIDUAL</span><span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">FAMILY</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token comment\\">// getters and setters</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
