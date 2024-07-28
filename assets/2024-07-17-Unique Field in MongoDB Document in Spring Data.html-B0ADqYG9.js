import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DzJ3ruqA.js";const e={},p=t(`<hr><h1 id="mongodb文档中使用spring-data定义唯一字段" tabindex="-1"><a class="header-anchor" href="#mongodb文档中使用spring-data定义唯一字段"><span>MongoDB文档中使用Spring Data定义唯一字段</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将学习如何使用Spring Data在MongoDB中定义唯一字段。唯一字段是数据库设计的重要组成部分。它们同时保证了一致性和性能，防止在不应该有重复值的地方出现重复值。</p><h2 id="_2-配置" tabindex="-1"><a class="header-anchor" href="#_2-配置"><span>2. 配置</span></a></h2><p>与关系型数据库不同，MongoDB不提供创建约束的选项。<strong>因此，我们唯一的选择是创建唯一索引。</strong> 但是，默认情况下，Spring Data中的自动索引创建是关闭的。首先，让我们在_application.properties_中启用它：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.data.mongodb.auto-index-creation</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>有了这个配置，如果索引尚不存在，它们将在启动时创建。<strong>但我们必须记住，我们不能在已经有重复值后创建唯一索引。</strong> 这将导致在应用程序启动期间抛出异常。</p><h2 id="_3-indexed-注解" tabindex="-1"><a class="header-anchor" href="#_3-indexed-注解"><span>3. <em>@Indexed</em> 注解</span></a></h2><p><em>@Indexed</em> 注解允许我们将字段标记为具有索引。由于我们配置了自动索引创建，我们不必自己创建它们。<strong>默认情况下，索引不是唯一的。</strong> 因此，我们通过_unique_属性来启用它。让我们通过创建第一个示例来看看它是如何工作的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Document</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Company</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Indexed</span><span class="token punctuation">(</span>unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意我们仍然可以有_@Id_注解，它与我们的索引完全独立。<strong>这就是我们需要拥有一个具有唯一字段的文档的全部。</strong> 因此，如果我们插入多个具有相同_email_的文档，将导致_DuplicateKeyException_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> givenUniqueIndex_whenInsertingDupe_thenExceptionIsThrown <span class="token punctuation">{</span>
    <span class="token class-name">Company</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Company</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    a<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;Name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    a<span class="token punctuation">.</span><span class="token function">setEmail</span><span class="token punctuation">(</span><span class="token string">&quot;a@mail.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    companyRepo<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Company</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Company</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    b<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;Other&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    b<span class="token punctuation">.</span><span class="token function">setEmail</span><span class="token punctuation">(</span><span class="token string">&quot;a@mail.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">DuplicateKeyException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        companyRepo<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法在我们想要强制执行唯一性但仍然有一个自动生成的唯一ID字段时非常有用。</p><h3 id="_3-1-注释多个字段" tabindex="-1"><a class="header-anchor" href="#_3-1-注释多个字段"><span>3.1. 注释多个字段</span></a></h3><p>我们还可以将注释添加到多个字段。让我们继续创建第二个示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Document</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Asset</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Indexed</span><span class="token punctuation">(</span>unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Indexed</span><span class="token punctuation">(</span>unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> number<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意我们没有显式设置任何字段的_@Id_。MongoDB仍然会为我们自动设置一个“ <em>_id</em>”字段，但它对我们的应用程序不可访问。<strong>但是，我们不能将_@Id_与标记为_unique_的_@Indexed_注解放在同一个字段上。</strong> 这将导致应用程序尝试创建索引时抛出异常。</p><p>此外，我们现在有两个唯一字段。<strong>请注意，这并不意味着它是一个复合索引。</strong> 因此，任何字段的多次插入相同值都将导致重复键。让我们测试一下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> givenMultipleIndexes_whenAnyFieldDupe_thenExceptionIsThrown <span class="token punctuation">{</span>
    <span class="token class-name">Asset</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Asset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    a<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;Name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    a<span class="token punctuation">.</span><span class="token function">setNumber</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    assetRepo<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">DuplicateKeyException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token class-name">Asset</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Asset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        b<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;Name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        b<span class="token punctuation">.</span><span class="token function">setNumber</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        assetRepo<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">DuplicateKeyException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token class-name">Asset</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Asset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        b<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;Other&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        b<span class="token punctuation">.</span><span class="token function">setNumber</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        assetRepo<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们希望只有组合值形成唯一索引，我们必须创建一个复合索引。</p><h3 id="_3-2-使用自定义类型作为索引" tabindex="-1"><a class="header-anchor" href="#_3-2-使用自定义类型作为索引"><span>3.2. 使用自定义类型作为索引</span></a></h3><p><strong>同样，我们可以注释自定义类型的字段。这将实现复合索引的效果。</strong> 让我们从_SaleId_类开始，表示我们的复合索引：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SaleId</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> item<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> date<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们创建_Sale_类来使用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Document</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Sale</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Indexed</span><span class="token punctuation">(</span>unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">SaleId</span> saleId<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Double</span> value<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，每次我们尝试添加具有相同_SaleId_的新_Sale_时，我们都会得到一个重复的键。让我们测试一下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> givenCustomTypeIndex_whenInsertingDupe_thenExceptionIsThrown <span class="token punctuation">{</span>
    <span class="token class-name">SaleId</span> id <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SaleId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    id<span class="token punctuation">.</span><span class="token function">setDate</span><span class="token punctuation">(</span><span class="token string">&quot;2022-06-15&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    id<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Sale</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sale</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    a<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span><span class="token number">53.94</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    saleRepo<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">DuplicateKeyException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token class-name">Sale</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sale</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        b<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span><span class="token number">100.00</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        saleRepo<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法的优点是将索引定义分开。<strong>这允许我们在不重新创建或更新索引的情况下，从_SaleId_中添加或删除新字段。</strong> 它也非常类似于复合键。但是，索引与键不同，因为它们可以有一个空值。</p><h2 id="_4-compoundindex-注解" tabindex="-1"><a class="header-anchor" href="#_4-compoundindex-注解"><span>4. <em>@CompoundIndex</em> 注解</span></a></h2><p>要创建一个由多个字段组成的唯一索引而不使用自定义类，我们必须创建一个复合索引。<strong>为此，我们直接在类中使用_@CompoundIndex_注解。</strong> 这个注解包含一个_def_属性，我们将使用它来包含我们需要的字段。让我们创建一个定义了_storeId_和_number_字段唯一索引的_Customer_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Document</span>
<span class="token annotation punctuation">@CompoundIndex</span><span class="token punctuation">(</span>def <span class="token operator">=</span> <span class="token string">&quot;{&#39;storeId&#39;: 1, &#39;number&#39;: 1}&quot;</span><span class="token punctuation">,</span> unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Customer</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Long</span> storeId<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> number<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这与在多个字段上使用_@Indexed_不同。这种方法只有在我们尝试插入具有相同_storeId_和_number_值的客户时，才会导致_DuplicateKeyException_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> givenCompoundIndex_whenDupeInsert_thenExceptionIsThrown <span class="token punctuation">{</span>
    <span class="token class-name">Customer</span> customerA <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Customer</span><span class="token punctuation">(</span><span class="token string">&quot;Name A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    customerA<span class="token punctuation">.</span><span class="token function">setNumber</span><span class="token punctuation">(</span><span class="token number">1l</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    customerA<span class="token punctuation">.</span><span class="token function">setStoreId</span><span class="token punctuation">(</span><span class="token number">2l</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Customer</span> customerB <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Customer</span><span class="token punctuation">(</span><span class="token string">&quot;Name B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    customerB<span class="token punctuation">.</span><span class="token function">setNumber</span><span class="token punctuation">(</span><span class="token number">1l</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    customerB<span class="token punctuation">.</span><span class="token function">setStoreId</span><span class="token punctuation">(</span><span class="token number">2l</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    customerRepo<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>customerA<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">DuplicateKeyException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        customerRepo<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>customerB<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法的优点是我们不必仅为了索引而创建另一个类。<strong>此外，可以将_@Id_注解添加到复合索引定义中的字段。</strong> 然而，与_@Indexed_不同，它不会导致异常。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何为我们的文档定义唯一字段。<strong>因此，我们了解到我们唯一的选择是使用唯一索引。</strong> 此外，使用Spring Data，我们可以轻松配置应用程序自动创建我们的索引。我们还看到了使用_@Indexed_和_@CompoundIndex_注解的多种方式。</p><p>如往常一样，源代码可在GitHub上获取。</p>`,38),o=[p];function c(i,l){return a(),s("div",null,o)}const r=n(e,[["render",c],["__file","2024-07-17-Unique Field in MongoDB Document in Spring Data.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Unique%20Field%20in%20MongoDB%20Document%20in%20Spring%20Data.html","title":"MongoDB文档中使用Spring Data定义唯一字段","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Data","MongoDB"],"tag":["MongoDB","Unique Index","Spring Data"],"head":[["meta",{"name":"keywords","content":"MongoDB, Spring Data, Unique Index"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Unique%20Field%20in%20MongoDB%20Document%20in%20Spring%20Data.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"MongoDB文档中使用Spring Data定义唯一字段"}],["meta",{"property":"og:description","content":"MongoDB文档中使用Spring Data定义唯一字段 1. 引言 在本教程中，我们将学习如何使用Spring Data在MongoDB中定义唯一字段。唯一字段是数据库设计的重要组成部分。它们同时保证了一致性和性能，防止在不应该有重复值的地方出现重复值。 2. 配置 与关系型数据库不同，MongoDB不提供创建约束的选项。因此，我们唯一的选择是创建..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T14:08:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MongoDB"}],["meta",{"property":"article:tag","content":"Unique Index"}],["meta",{"property":"article:tag","content":"Spring Data"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T14:08:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MongoDB文档中使用Spring Data定义唯一字段\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T14:08:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"MongoDB文档中使用Spring Data定义唯一字段 1. 引言 在本教程中，我们将学习如何使用Spring Data在MongoDB中定义唯一字段。唯一字段是数据库设计的重要组成部分。它们同时保证了一致性和性能，防止在不应该有重复值的地方出现重复值。 2. 配置 与关系型数据库不同，MongoDB不提供创建约束的选项。因此，我们唯一的选择是创建..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 配置","slug":"_2-配置","link":"#_2-配置","children":[]},{"level":2,"title":"3. @Indexed 注解","slug":"_3-indexed-注解","link":"#_3-indexed-注解","children":[{"level":3,"title":"3.1. 注释多个字段","slug":"_3-1-注释多个字段","link":"#_3-1-注释多个字段","children":[]},{"level":3,"title":"3.2. 使用自定义类型作为索引","slug":"_3-2-使用自定义类型作为索引","link":"#_3-2-使用自定义类型作为索引","children":[]}]},{"level":2,"title":"4. @CompoundIndex 注解","slug":"_4-compoundindex-注解","link":"#_4-compoundindex-注解","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721225316000,"updatedTime":1721225316000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.63,"words":1389},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Unique Field in MongoDB Document in Spring Data.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>MongoDB文档中使用Spring Data定义唯一字段</h1>\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将学习如何使用Spring Data在MongoDB中定义唯一字段。唯一字段是数据库设计的重要组成部分。它们同时保证了一致性和性能，防止在不应该有重复值的地方出现重复值。</p>\\n<h2>2. 配置</h2>\\n<p>与关系型数据库不同，MongoDB不提供创建约束的选项。<strong>因此，我们唯一的选择是创建唯一索引。</strong> 但是，默认情况下，Spring Data中的自动索引创建是关闭的。首先，让我们在_application.properties_中启用它：</p>","autoDesc":true}');export{r as comp,k as data};
