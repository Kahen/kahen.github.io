import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DNGMkCCj.js";const e={},p=t(`<h1 id="使用mapstruct将枚举映射为字符串" tabindex="-1"><a class="header-anchor" href="#使用mapstruct将枚举映射为字符串"><span>使用MapStruct将枚举映射为字符串</span></a></h1><p>MapStruct是一个高效、类型安全的库，它简化了Java对象之间的数据映射，消除了手动转换逻辑的需要。</p><p>在本教程中，我们将探索如何使用MapStruct将枚举映射为字符串。</p><p>使用Java枚举作为字符串而不是序数可以简化与外部API的数据交换，使数据检索更简单，并提高UI中的可读性。</p><p>假设我们想要将_DayOfWeek_枚举转换为字符串。</p><p>_DayOfWeek_是Java Date-Time API中的一个枚举，表示一周的七天，从星期一到星期日。</p><p>让我们实现MapStruct映射器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">DayOfWeekMapper</span> <span class="token punctuation">{</span>
    <span class="token class-name">DayOfWeekMapper</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token class-name">Mappers</span><span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">DayOfWeekMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token class-name">DayOfWeek</span> dayOfWeek<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 根据需要添加其他映射方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>DayOfWeekMapper_接口是一个由</em>@Mapper_指定的MapStruct映射器。我们定义了_toString()_方法，它接受一个_DayOfWeek_枚举并将其转换为字符串表示。<strong>默认情况下，MapStruct使用_name()_方法为枚举获取字符串值</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">DayOfWeekMapperUnitTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">DayOfWeekMapper</span> dayOfWeekMapper <span class="token operator">=</span> <span class="token class-name">DayOfWeekMapper</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@ParameterizedTest</span>
    <span class="token annotation punctuation">@CsvSource</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;MONDAY,MONDAY&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;TUESDAY,TUESDAY&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;WEDNESDAY,WEDNESDAY&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;THURSDAY,THURSDAY&quot;</span><span class="token punctuation">,</span>
                <span class="token string">&quot;FRIDAY,FRIDAY&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;SATURDAY,SATURDAY&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;SUNDAY,SUNDAY&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">void</span> <span class="token function">whenDayOfWeekMapped_thenGetsNameString</span><span class="token punctuation">(</span><span class="token class-name">DayOfWeek</span> source<span class="token punctuation">,</span> <span class="token class-name">String</span> expected<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> target <span class="token operator">=</span> dayOfWeekMapper<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这验证了_toString()_将_DayOfWeek_枚举值映射到它们预期的字符串名称。这种参数化测试风格还允许我们从单一测试中测试所有可能的变异。</p><h3 id="_2-1-处理-null" tabindex="-1"><a class="header-anchor" href="#_2-1-处理-null"><span>2.1. 处理_null_</span></a></h3><p>现在，让我们看看MapStruct如何处理_null_。<strong>默认情况下，MapStruct将_null_源映射到_null_目标。</strong> 但是，这种行为可以修改。</p><p>直接验证映射器对_null_输入返回_null_结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenNullDayOfWeekMapped_thenGetsNullResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> target <span class="token operator">=</span> dayOfWeekMapper<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNull</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>MapStruct提供_MappingConstants.NULL_来管理_null_值</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">DayOfWeekMapper</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@ValueMapping</span><span class="token punctuation">(</span>target <span class="token operator">=</span> <span class="token string">&quot;MONDAY&quot;</span><span class="token punctuation">,</span> source <span class="token operator">=</span> <span class="token class-name">MappingConstants</span><span class="token punctuation">.</span><span class="token constant">NULL</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> <span class="token function">toStringWithDefault</span><span class="token punctuation">(</span><span class="token class-name">DayOfWeek</span> dayOfWeek<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于_null_值，此映射返回默认值_MONDAY_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenNullDayOfWeekMappedWithDefaults_thenReturnsDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> target <span class="token operator">=</span> dayOfWeekMapper<span class="token punctuation">.</span><span class="token function">toStringWithDefault</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;MONDAY&quot;</span><span class="token punctuation">,</span> target<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-将-string-映射到-enum" tabindex="-1"><a class="header-anchor" href="#_3-将-string-映射到-enum"><span>3. 将_String_映射到_Enum_</span></a></h2><p>现在，让我们看看一个将字符串转换回枚举的映射器方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">DayOfWeekMapper</span> <span class="token punctuation">{</span>

    <span class="token class-name">DayOfWeek</span> <span class="token function">nameStringToDayOfWeek</span><span class="token punctuation">(</span><span class="token class-name">String</span> day<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个映射器将代表一周中某一天的字符串转换为相应的_DayOfWeek_枚举值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@CsvSource</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token string">&quot;MONDAY,MONDAY&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;TUESDAY,TUESDAY&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;WEDNESDAY,WEDNESDAY&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;THURSDAY,THURSDAY&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;FRIDAY,FRIDAY&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;SATURDAY,SATURDAY&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;SUNDAY,SUNDAY&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">whenNameStringMapped_thenGetsDayOfWeek</span><span class="token punctuation">(</span><span class="token class-name">String</span> source<span class="token punctuation">,</span> <span class="token class-name">DayOfWeek</span> expected<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">DayOfWeek</span> target <span class="token operator">=</span> dayOfWeekMapper<span class="token punctuation">.</span><span class="token function">nameStringToDayOfWeek</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> target<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们验证_nameStringToDayOfWeek()_将一天的字符串表示映射到其对应的枚举。</p><h3 id="_3-1-处理未映射的值" tabindex="-1"><a class="header-anchor" href="#_3-1-处理未映射的值"><span>3.1. 处理未映射的值</span></a></h3><p>如果一个字符串不匹配枚举_name_或通过_@ValueMapping_的另一个常量，MapStruct会抛出错误。通常这样做是为了确保所有值都被安全和可预测地映射。<strong>MapStruct创建的映射方法如果在发生未识别的源值时会抛出_IllegalStateException_</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenInvalidNameStringMapped_thenThrowsIllegalArgumentException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> source <span class="token operator">=</span> <span class="token string">&quot;Mon&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">IllegalArgumentException</span> exception <span class="token operator">=</span> <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        dayOfWeekMapper<span class="token punctuation">.</span><span class="token function">nameStringToDayOfWeek</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>exception<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;Unexpected enum constant: &quot;</span> <span class="token operator">+</span> source<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要更改这种行为，MapStruct还提供了_MappingConstants.ANY_UNMAPPED._ <strong>这指示MapStruct将任何未映射的源值映射到目标常量值</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">DayOfWeekMapper</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@ValueMapping</span><span class="token punctuation">(</span>target <span class="token operator">=</span> <span class="token string">&quot;MONDAY&quot;</span><span class="token punctuation">,</span> source <span class="token operator">=</span> <span class="token class-name">MappingConstants</span><span class="token punctuation">.</span><span class="token constant">ANY_UNMAPPED</span><span class="token punctuation">)</span>
    <span class="token class-name">DayOfWeek</span> <span class="token function">nameStringToDayOfWeekWithDefaults</span><span class="token punctuation">(</span><span class="token class-name">String</span> day<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，这个_@ValueMapping_注解为未映射的源设置了默认行为。因此，任何未映射的输入默认为_MONDAY_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@CsvSource</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;Mon,MONDAY&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">whenInvalidNameStringMappedWithDefaults_thenReturnsDefault</span><span class="token punctuation">(</span><span class="token class-name">String</span> source<span class="token punctuation">,</span> <span class="token class-name">DayOfWeek</span> expected<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">DayOfWeek</span> target <span class="token operator">=</span> dayOfWeekMapper<span class="token punctuation">.</span><span class="token function">nameStringToDayOfWeekWithDefaults</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> target<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-将-enum-映射到自定义-string" tabindex="-1"><a class="header-anchor" href="#_4-将-enum-映射到自定义-string"><span>4. 将_Enum_映射到自定义_String_</span></a></h2><p>现在，我们也转换枚举为_DayOfWeek_的自定义简短表示，如“Mon”，“Tue”等：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">DayOfWeekMapper</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@ValueMapping</span><span class="token punctuation">(</span>target <span class="token operator">=</span> <span class="token string">&quot;Mon&quot;</span><span class="token punctuation">,</span> source <span class="token operator">=</span> <span class="token string">&quot;MONDAY&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ValueMapping</span><span class="token punctuation">(</span>target <span class="token operator">=</span> <span class="token string">&quot;Tue&quot;</span><span class="token punctuation">,</span> source <span class="token operator">=</span> <span class="token string">&quot;TUESDAY&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ValueMapping</span><span class="token punctuation">(</span>target <span class="token operator">=</span> <span class="token string">&quot;Wed&quot;</span><span class="token punctuation">,</span> source <span class="token operator">=</span> <span class="token string">&quot;WEDNESDAY&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ValueMapping</span><span class="token punctuation">(</span>target <span class="token operator">=</span> <span class="token string">&quot;Thu&quot;</span><span class="token punctuation">,</span> source <span class="token operator">=</span> <span class="token string">&quot;THURSDAY&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ValueMapping</span><span class="token punctuation">(</span>target <span class="token operator">=</span> <span class="token string">&quot;Fri&quot;</span><span class="token punctuation">,</span> source <span class="token operator">=</span> <span class="token string">&quot;FRIDAY&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ValueMapping</span><span class="token punctuation">(</span>target <span class="token operator">=</span> <span class="token string">&quot;Sat&quot;</span><span class="token punctuation">,</span> source <span class="token operator">=</span> <span class="token string">&quot;SATURDAY&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ValueMapping</span><span class="token punctuation">(</span>target <span class="token operator">=</span> <span class="token string">&quot;Sun&quot;</span><span class="token punctuation">,</span> source <span class="token operator">=</span> <span class="token string">&quot;SUNDAY&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> <span class="token function">toShortString</span><span class="token punctuation">(</span><span class="token class-name">DayOfWeek</span> dayOfWeek<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相反，这个_toShortString()<em>映射配置使用</em>@ValueMapping_将_DayOfWeek_枚举转换为缩写字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@CsvSource</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token string">&quot;MONDAY,Mon&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;TUESDAY,Tue&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;WEDNESDAY,Wed&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;THURSDAY,Thu&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;FRIDAY,Fri&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;SATURDAY,Sat&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;SUNDAY,Sun&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">whenDayOfWeekMapped_thenGetsShortString</span><span class="token punctuation">(</span><span class="token class-name">DayOfWeek</span> source<span class="token punctuation">,</span> <span class="token class-name">String</span> expected<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> target <span class="token operator">=</span> dayOfWeekMapper<span class="token punctuation">.</span><span class="token function">toShortString</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> target<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-将自定义-string-映射到-enum" tabindex="-1"><a class="header-anchor" href="#_5-将自定义-string-映射到-enum"><span>5. 将自定义_String_映射到_Enum_</span></a></h2><p>最后，我们将看到如何将缩写字符串转换为_DayOfWeek_枚举：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">DayOfWeekMapper</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@InheritInverseConfiguration</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;toShortString&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">DayOfWeek</span> <span class="token function">shortStringToDayOfWeek</span><span class="token punctuation">(</span><span class="token class-name">String</span> day<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，_@InheritInverseConfiguration_注解定义了一个反向映射，它允许_shortStringToDayOfWeek()_从_toShortString()_方法继承其配置，将缩写的星期几名称转换为相应的_DayOfWeek_枚举：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@CsvSource</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token string">&quot;Mon,MONDAY&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Tue,TUESDAY&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Wed,WEDNESDAY&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Thu,THURSDAY&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;Fri,FRIDAY&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Sat,SATURDAY&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Sun,SUNDAY&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">whenShortStringMapped_thenGetsDayOfWeek</span><span class="token punctuation">(</span><span class="token class-name">String</span> source<span class="token punctuation">,</span> <span class="token class-name">DayOfWeek</span> expected<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">DayOfWeek</span> target <span class="token operator">=</span> dayOfWeekMapper<span class="token punctuation">.</span><span class="token function">shortStringToDayOfWeek</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> target<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了如何使用MapStruct的_@ValueMapping_注解进行枚举到字符串的映射。我们还使用了_@InheritInverseConfiguration_来保持来回映射时的一致性。使用这些技巧，我们可以顺利地处理枚举到字符串的转换，并保持代码的清晰和易于维护。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p><p>文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,46),o=[p];function c(i,u){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","Mapping Enum to String Using MapStruct.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Mapping%20Enum%20to%20String%20Using%20MapStruct.html","title":"使用MapStruct将枚举映射为字符串","lang":"zh-CN","frontmatter":{"date":"2024-06-16T00:00:00.000Z","category":["Java","MapStruct"],"tag":["数据映射","枚举"],"description":"使用MapStruct将枚举映射为字符串 MapStruct是一个高效、类型安全的库，它简化了Java对象之间的数据映射，消除了手动转换逻辑的需要。 在本教程中，我们将探索如何使用MapStruct将枚举映射为字符串。 使用Java枚举作为字符串而不是序数可以简化与外部API的数据交换，使数据检索更简单，并提高UI中的可读性。 假设我们想要将_DayO...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Mapping%20Enum%20to%20String%20Using%20MapStruct.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用MapStruct将枚举映射为字符串"}],["meta",{"property":"og:description","content":"使用MapStruct将枚举映射为字符串 MapStruct是一个高效、类型安全的库，它简化了Java对象之间的数据映射，消除了手动转换逻辑的需要。 在本教程中，我们将探索如何使用MapStruct将枚举映射为字符串。 使用Java枚举作为字符串而不是序数可以简化与外部API的数据交换，使数据检索更简单，并提高UI中的可读性。 假设我们想要将_DayO..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"数据映射"}],["meta",{"property":"article:tag","content":"枚举"}],["meta",{"property":"article:published_time","content":"2024-06-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用MapStruct将枚举映射为字符串\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":3,"title":"2.1. 处理_null_","slug":"_2-1-处理-null","link":"#_2-1-处理-null","children":[]},{"level":2,"title":"3. 将_String_映射到_Enum_","slug":"_3-将-string-映射到-enum","link":"#_3-将-string-映射到-enum","children":[{"level":3,"title":"3.1. 处理未映射的值","slug":"_3-1-处理未映射的值","link":"#_3-1-处理未映射的值","children":[]}]},{"level":2,"title":"4. 将_Enum_映射到自定义_String_","slug":"_4-将-enum-映射到自定义-string","link":"#_4-将-enum-映射到自定义-string","children":[]},{"level":2,"title":"5. 将自定义_String_映射到_Enum_","slug":"_5-将自定义-string-映射到-enum","link":"#_5-将自定义-string-映射到-enum","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4,"words":1199},"filePathRelative":"posts/baeldung/Archive/Mapping Enum to String Using MapStruct.md","localizedDate":"2024年6月16日","excerpt":"\\n<p>MapStruct是一个高效、类型安全的库，它简化了Java对象之间的数据映射，消除了手动转换逻辑的需要。</p>\\n<p>在本教程中，我们将探索如何使用MapStruct将枚举映射为字符串。</p>\\n<p>使用Java枚举作为字符串而不是序数可以简化与外部API的数据交换，使数据检索更简单，并提高UI中的可读性。</p>\\n<p>假设我们想要将_DayOfWeek_枚举转换为字符串。</p>\\n<p>_DayOfWeek_是Java Date-Time API中的一个枚举，表示一周的七天，从星期一到星期日。</p>\\n<p>让我们实现MapStruct映射器：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Mapper</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">DayOfWeekMapper</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">DayOfWeekMapper</span> <span class=\\"token constant\\">INSTANCE</span> <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Mappers</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getMapper</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">DayOfWeekMapper</span><span class=\\"token punctuation\\">.</span><span class=\\"token keyword\\">class</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token class-name\\">String</span> <span class=\\"token function\\">toString</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">DayOfWeek</span> dayOfWeek<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// 根据需要添加其他映射方法</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
