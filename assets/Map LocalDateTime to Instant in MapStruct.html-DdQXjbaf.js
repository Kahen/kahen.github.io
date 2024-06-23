import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CPbsBEaw.js";const e={},p=t(`<h1 id="使用mapstruct映射localdatetime到instant-baeldung" tabindex="-1"><a class="header-anchor" href="#使用mapstruct映射localdatetime到instant-baeldung"><span>使用MapStruct映射LocalDateTime到Instant | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在Java中处理日期和时间时，我们经常会遇到不同的格式，例如_LocalDateTime_和_Instant_。_LocalDateTime_表示没有时区的日期时间，而_Instant_表示通常参考自纪元（1970年1月1日，00:00:00 UTC）的特定时间点。在许多场景中，我们需要在这两种类型之间进行映射。幸运的是，MapStruct，一个强大的Java映射框架，允许我们轻松地做到这一点。</p><p>在本教程中，我们将学习如何在MapStruct中将_LocalDateTime_映射到_Instant_。</p><h2 id="_2-理解-localdatetime-和-instant" tabindex="-1"><a class="header-anchor" href="#_2-理解-localdatetime-和-instant"><span>2. 理解_LocalDateTime_和_Instant_</span></a></h2><p>我们可能需要将_LocalDateTime_映射到_Instant_有几种原因。</p><p>_LocalDateTime_适用于表示在特定本地时间发生的事件，不考虑时区。我们通常用它来在数据库和日志文件中存储时间戳。<strong>_LocalDateTime_是在所有用户都在同一时区操作的应用程序中存储时间戳的好选择。</strong></p><p><strong>_Instant_非常适合跟踪全球事件，确保时区一致性，并为与外部系统或API交互提供可靠的格式。</strong> 此外，它还适用于在需要时区一致性的数据库中存储时间戳。</p><p>我们将频繁处理_LocalDateTime_和_Instant_值并进行转换。</p><h2 id="_3-映射场景" tabindex="-1"><a class="header-anchor" href="#_3-映射场景"><span>3. 映射场景</span></a></h2><p>假设我们正在实现一个订单处理服务。我们有两种类型的订单——订单和本地订单。_Order_使用_Instant_来支持全球订单处理，而本地订单使用_LocalDateTime_来表示本地时间。</p><p>这是订单模型的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Order</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Instant</span> created<span class="token punctuation">;</span>
    <span class="token comment">// 其他字段</span>
    <span class="token comment">// getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们有本地订单的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LocalOrder</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> created<span class="token punctuation">;</span>
    <span class="token comment">// 其他字段</span>
    <span class="token comment">// getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-映射-localdatetime-到-instant" tabindex="-1"><a class="header-anchor" href="#_4-映射-localdatetime-到-instant"><span>4. 映射_LocalDateTime_到_Instant_</span></a></h2><p>现在让我们学习如何实现将_LocalDateTime_转换为_Instant_的映射器。</p><p>让我们从_OrderMapper_接口开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">OrderMapper</span> <span class="token punctuation">{</span>
    <span class="token class-name">OrderMapper</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token class-name">Mappers</span><span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">OrderMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">ZoneOffset</span> <span class="token constant">DEFAULT_ZONE</span> <span class="token operator">=</span> <span class="token class-name">ZoneOffset</span><span class="token punctuation">.</span><span class="token constant">UTC</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Named</span><span class="token punctuation">(</span><span class="token string">&quot;localDateTimeToInstant&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">default</span> <span class="token class-name">Instant</span> <span class="token function">localDateTimeToInstant</span><span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span> localDateTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> localDateTime<span class="token punctuation">.</span><span class="token function">toInstant</span><span class="token punctuation">(</span><span class="token constant">DEFAULT_ZONE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Mapping</span><span class="token punctuation">(</span>target <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span> source <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Mapping</span><span class="token punctuation">(</span>target <span class="token operator">=</span> <span class="token string">&quot;created&quot;</span><span class="token punctuation">,</span> source <span class="token operator">=</span> <span class="token string">&quot;created&quot;</span><span class="token punctuation">,</span> qualifiedByName <span class="token operator">=</span> <span class="token string">&quot;localDateTimeToInstant&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">Order</span> <span class="token function">toOrder</span><span class="token punctuation">(</span><span class="token class-name">LocalOrder</span> source<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个_OrderMapper_接口是一个MapStruct映射器，它在处理日期时间字段的自定义转换的同时，将_LocalOrder_对象转换为_Order_对象。它声明了一个常量_DEFAULT_ZONE_，值为_ZoneOffset.UTC_，表示UTC时区。</p><p>用_@Named_注解的_localDateTimeToInstant()<em>方法将_LocalDateTime_转换为使用指定_ZoneOffset_的_Instant</em>。</p><p><em>toOrder()<em>方法映射_LocalOrder_到_Order</em>。它使用</em>@Mapping_来定义字段如何映射。<em>id_字段直接从_source_映射到_target</em>。<strong>对于_created_字段，它通过指定_qualifiedByName = &quot;localDateTimeToInstant&quot;_应用自定义_localDateTimeToInstant()_方法。</strong> 这确保了_LocalOrder_中的_LocalDateTime_正确转换为_Order_中的_Instant_。</p><p>MapStruct使用约定来映射数据类型。映射具有嵌套属性的复杂对象或在某些数据类型之间进行转换可能会引发错误。<strong>MapStruct接口中的默认方法可以定义MapStruct不原生支持的类型之间的显式转换。</strong> 这些方法解决歧义并为转换提供必要的指令。这确保了准确可靠的映射。此外，它们也适用于复杂或嵌套属性映射。总之，它们是维护MapStruct映射中干净、可维护代码的最佳实践。</p><p>让我们测试我们的映射器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">OrderMapperUnitTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">OrderMapper</span> mapper <span class="token operator">=</span> <span class="token class-name">OrderMapper</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">whenLocalOrderIsMapped_thenGetsOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">LocalDateTime</span> localDateTime <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">long</span> sourceEpochSecond <span class="token operator">=</span> localDateTime<span class="token punctuation">.</span><span class="token function">toEpochSecond</span><span class="token punctuation">(</span><span class="token class-name">OrderMapper</span><span class="token punctuation">.</span><span class="token constant">DEFAULT_ZONE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">LocalOrder</span> localOrder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LocalOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        localOrder<span class="token punctuation">.</span><span class="token function">setCreated</span><span class="token punctuation">(</span>localDateTime<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Order</span> target <span class="token operator">=</span> mapper<span class="token punctuation">.</span><span class="token function">toOrder</span><span class="token punctuation">(</span>localOrder<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertNotNull</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">long</span> targetEpochSecond <span class="token operator">=</span> target<span class="token punctuation">.</span><span class="token function">getCreated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getEpochSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>sourceEpochSecond<span class="token punctuation">,</span> targetEpochSecond<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个测试用例检查_OrderMapper_是否正确地将_LocalOrder_转换为_Order，_重点是从_LocalDateTime_到_Instant_的_created_字段映射。它创建了一个_LocalDateTime，_计算了它的纪元秒值，将其设置为一个新的_LocalOrder，_将其映射到一个_Order，<em>并检查结果是否不是_null。</em> 最后，它比较了_LocalOrder_中的_LocalDateTime_和_Order_中的_Instant_的纪元秒值。如果它们匹配，测试通过。</p><h2 id="_5-映射-instant-到-localdatetime" tabindex="-1"><a class="header-anchor" href="#_5-映射-instant-到-localdatetime"><span>5. 映射_Instant_到_LocalDateTime_</span></a></h2><p>现在我们将看到如何将_Instant_映射回_LocalDateTime_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">OrderMapper</span> <span class="token punctuation">{</span>
    <span class="token class-name">OrderMapper</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token class-name">Mappers</span><span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">OrderMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ZoneOffset</span> <span class="token constant">DEFAULT_ZONE</span> <span class="token operator">=</span> <span class="token class-name">ZoneOffset</span><span class="token punctuation">.</span><span class="token constant">UTC</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Named</span><span class="token punctuation">(</span><span class="token string">&quot;instantToLocalDateTime&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">default</span> <span class="token class-name">LocalDateTime</span> <span class="token function">instantToLocalDateTime</span><span class="token punctuation">(</span><span class="token class-name">Instant</span> instant<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">ofInstant</span><span class="token punctuation">(</span>instant<span class="token punctuation">,</span> <span class="token constant">DEFAULT_ZONE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Mapping</span><span class="token punctuation">(</span>target <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span> source <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Mapping</span><span class="token punctuation">(</span>target <span class="token operator">=</span> <span class="token string">&quot;created&quot;</span><span class="token punctuation">,</span> source <span class="token operator">=</span> <span class="token string">&quot;created&quot;</span><span class="token punctuation">,</span> qualifiedByName <span class="token operator">=</span> <span class="token string">&quot;instantToLocalDateTime&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">LocalOrder</span> <span class="token function">toLocalOrder</span><span class="token punctuation">(</span><span class="token class-name">Order</span> source<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>OrderMapper_现在定义了一个将_Order_对象转换为_LocalOrder_对象的映射。它包括一个自定义映射方法_instantToLocalDateTime()</em>，使用预定义的_ZoneOffset (UTC)<em>将_Instant_转换为_LocalDateTime</em>。</p><p><em>toLocalOrder()<em>中的</em>@Mapping_注解表明_id_字段直接从_Order_映射到_LocalOrder。然后**它使用自定义方法</em>(qualifiedByName = &quot;instantToLocalDateTime&quot;)_对于_created_字段，并将_Instant_转换为_LocalDateTime。**</p><p>让我们验证我们的映射：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenOrderIsMapped_thenGetsLocalOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Instant</span> source <span class="token operator">=</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> sourceEpochSecond <span class="token operator">=</span> source<span class="token punctuation">.</span><span class="token function">getEpochSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Order</span> order <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Order</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    order<span class="token punctuation">.</span><span class="token function">setCreated</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">LocalOrder</span> target <span class="token operator">=</span> mapper<span class="token punctuation">.</span><span class="token function">toLocalOrder</span><span class="token punctuation">(</span>order<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertNotNull</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> targetEpochSecond <span class="token operator">=</span> target<span class="token punctuation">.</span><span class="token function">getCreated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEpochSecond</span><span class="token punctuation">(</span><span class="token class-name">OrderMapper</span><span class="token punctuation">.</span><span class="token constant">DEFAULT_ZONE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>sourceEpochSecond<span class="token punctuation">,</span> targetEpochSecond<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个测试验证了_OrderMapper_是否正确地将_Order_对象转换为_LocalOrder_对象，重点是映射_Instant_到_LocalDateTime。_</p><p>测试创建了一个带有当前时间戳的_Instant_对象并计算了它的纪元秒。然后它创建了一个_Order_对象，并将_Instant_值设置为其_created_字段。</p><p>测试使用_mapper.toLocalOrder()<em>将_Order_对象映射到_LocalOrder。</em> 它检查结果的_LocalOrder_不是_null，并验证_LocalOrder_中的_LocalDateTime_的纪元秒与_Order_中的_Instant_的纪元秒是否匹配，确保使用指定的_ZoneOffset_正确映射。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了如何使用MapStruct将_LocalDateTime_映射到_Instant_以及反之。我们看到了如何使用_@Named_创建自定义映射方法来转换这些类型，以及正确使用_@Mapping_和_qualifiedByName_。这种方法确保了Java应用程序中的数据转换顺畅和时区一致性。</p><p>如往常一样，本文的完整代码示例可以在GitHub上找到。翻译工作已完成，以下是翻译的剩余部分：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 测试验证_OrderMapper_是否正确地将_Order_对象转换为_LocalOrder_对象，重点是映射_Instant_到_LocalDateTime_。</span>
<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenOrderIsMapped_thenGetsLocalOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Instant</span> source <span class="token operator">=</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> sourceEpochSecond <span class="token operator">=</span> source<span class="token punctuation">.</span><span class="token function">getEpochSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Order</span> order <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Order</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    order<span class="token punctuation">.</span><span class="token function">setCreated</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">LocalOrder</span> target <span class="token operator">=</span> mapper<span class="token punctuation">.</span><span class="token function">toLocalOrder</span><span class="token punctuation">(</span>order<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertNotNull</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> targetEpochSecond <span class="token operator">=</span> target<span class="token punctuation">.</span><span class="token function">getCreated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEpochSecond</span><span class="token punctuation">(</span><span class="token class-name">OrderMapper</span><span class="token punctuation">.</span><span class="token constant">DEFAULT_ZONE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>sourceEpochSecond<span class="token punctuation">,</span> targetEpochSecond<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个测试验证了_OrderMapper_是否正确地将_Order_对象转换为_LocalOrder_对象，重点是映射_Instant_到_LocalDateTime_。</p><p>测试创建了一个带有当前时间戳的_Instant_对象并计算了它的纪元秒。然后它创建了一个_Order_对象，并将_Instant_值设置为其_created_字段。</p><p>测试使用_mapper.toLocalOrder()<em>将_Order_对象映射到_LocalOrder。</em> 它检查结果的_LocalOrder_不是_null，并验证_LocalOrder_中的_LocalDateTime_的纪元秒与_Order_中的_Instant_的纪元秒是否匹配，确保使用指定的_ZoneOffset_正确映射。</p><h2 id="_6-结论-1" tabindex="-1"><a class="header-anchor" href="#_6-结论-1"><span>6. 结论</span></a></h2><p>在本文中，我们学习了如何使用MapStruct将_LocalDateTime_映射到_Instant_以及反之。我们看到了如何使用_@Named_创建自定义映射方法来转换这些类型，以及正确使用_@Mapping_和_qualifiedByName_。这种方法确保了Java应用程序中的数据转换顺畅和时区一致性。</p><p>如往常一样，本文的完整代码示例可以在GitHub上找到。</p><p>OK</p>`,47),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","Map LocalDateTime to Instant in MapStruct.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/Map%20LocalDateTime%20to%20Instant%20in%20MapStruct.html","title":"使用MapStruct映射LocalDateTime到Instant | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-14T00:00:00.000Z","category":["Java"],"tag":["MapStruct","LocalDateTime","Instant"],"description":"使用MapStruct映射LocalDateTime到Instant | Baeldung 1. 概述 在Java中处理日期和时间时，我们经常会遇到不同的格式，例如_LocalDateTime_和_Instant_。_LocalDateTime_表示没有时区的日期时间，而_Instant_表示通常参考自纪元（1970年1月1日，00:00:00 UTC...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Map%20LocalDateTime%20to%20Instant%20in%20MapStruct.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用MapStruct映射LocalDateTime到Instant | Baeldung"}],["meta",{"property":"og:description","content":"使用MapStruct映射LocalDateTime到Instant | Baeldung 1. 概述 在Java中处理日期和时间时，我们经常会遇到不同的格式，例如_LocalDateTime_和_Instant_。_LocalDateTime_表示没有时区的日期时间，而_Instant_表示通常参考自纪元（1970年1月1日，00:00:00 UTC..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MapStruct"}],["meta",{"property":"article:tag","content":"LocalDateTime"}],["meta",{"property":"article:tag","content":"Instant"}],["meta",{"property":"article:published_time","content":"2024-06-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用MapStruct映射LocalDateTime到Instant | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 理解_LocalDateTime_和_Instant_","slug":"_2-理解-localdatetime-和-instant","link":"#_2-理解-localdatetime-和-instant","children":[]},{"level":2,"title":"3. 映射场景","slug":"_3-映射场景","link":"#_3-映射场景","children":[]},{"level":2,"title":"4. 映射_LocalDateTime_到_Instant_","slug":"_4-映射-localdatetime-到-instant","link":"#_4-映射-localdatetime-到-instant","children":[]},{"level":2,"title":"5. 映射_Instant_到_LocalDateTime_","slug":"_5-映射-instant-到-localdatetime","link":"#_5-映射-instant-到-localdatetime","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论-1","link":"#_6-结论-1","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.87,"words":1762},"filePathRelative":"posts/baeldung/Archive/Map LocalDateTime to Instant in MapStruct.md","localizedDate":"2024年6月14日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在Java中处理日期和时间时，我们经常会遇到不同的格式，例如_LocalDateTime_和_Instant_。_LocalDateTime_表示没有时区的日期时间，而_Instant_表示通常参考自纪元（1970年1月1日，00:00:00 UTC）的特定时间点。在许多场景中，我们需要在这两种类型之间进行映射。幸运的是，MapStruct，一个强大的Java映射框架，允许我们轻松地做到这一点。</p>\\n<p>在本教程中，我们将学习如何在MapStruct中将_LocalDateTime_映射到_Instant_。</p>\\n<h2>2. 理解_LocalDateTime_和_Instant_</h2>","autoDesc":true}');export{d as comp,k as data};
