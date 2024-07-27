import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CBerKIce.js";const e={},p=t(`<h1 id="hibernate自然id在spring-boot中的使用" tabindex="-1"><a class="header-anchor" href="#hibernate自然id在spring-boot中的使用"><span>Hibernate自然ID在Spring Boot中的使用</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>一些数据库条目拥有自然标识符，例如书籍的ISBN或个人的社保号。除了传统的数据库ID外，Hibernate允许我们将某些字段声明为自然ID，并基于这些属性轻松查询。</p><p>在本教程中，我们将讨论<code>@NaturalId</code>注解，并学习如何在Spring Boot项目中使用和实现它。</p><h2 id="_2-简单的自然id" tabindex="-1"><a class="header-anchor" href="#_2-简单的自然id"><span>2. 简单的自然ID</span></a></h2><p><strong>我们可以通过简单地用<code>@NaturalId</code>注解标注字段来指定自然标识符。这允许我们使用Hibernate的API无缝地查询相关列。</strong></p><p>在本文的代码示例中，我们将使用<code>HotelRoom</code>和<code>ConferenceRoom</code>数据模型。在第一个示例中，我们将实现<code>ConferenceRoom</code>实体，它可以通过其唯一的<code>name</code>属性来区分：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConferenceRoom</span> <span class="token punctuation">{</span>
    
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@NaturalId</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> capacity<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">ConferenceRoom</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> capacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>capacity <span class="token operator">=</span> capacity<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token class-name">ConferenceRoom</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// getters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们需要用<code>@NaturalId</code>注解<code>name</code>字段。让我们注意到该字段是不可变的：它在构造函数中声明，并且不公开setter。此外，Hibernate需要一个无参数构造函数，但我们可以使它为<code>protected</code>并避免使用它。</p><p><strong>现在，我们可以使用<code>bySimpleNaturalId</code>方法轻松地使用其名称作为自然标识符搜索会议室：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HotelRoomsService</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">EntityManager</span> entityManager<span class="token punctuation">;</span>

    <span class="token comment">// constructor</span>

    <span class="token keyword">public</span> <span class="token class-name">Optional</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ConferenceRoom</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">conferenceRoom</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Session</span> session <span class="token operator">=</span> entityManager<span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token class-name">Session</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> session<span class="token punctuation">.</span><span class="token function">bySimpleNaturalId</span><span class="token punctuation">(</span><span class="token class-name">ConferenceRoom</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">loadOptional</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们运行一个测试并检查生成的SQL以确认预期的行为。为了查看Hibernate/JPA SQL日志，我们将添加适当的日志配置：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">logging.level.org.hibernate.SQL</span><span class="token punctuation">=</span><span class="token value attr-value">DEBUG</span>
<span class="token key attr-name">logging.level.org.hibernate.type.descriptor.sql.BasicBinder</span><span class="token punctuation">=</span><span class="token value attr-value">TRACE</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们调用将查询具有自然ID“Colorado”的会议室的<code>conferenceRoom</code>方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenWeFindBySimpleNaturalKey_thenEntityIsReturnedCorrectly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    conferenceRoomRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ConferenceRoom</span><span class="token punctuation">(</span><span class="token string">&quot;Colorado&quot;</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Optional</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ConferenceRoom</span><span class="token punctuation">&gt;</span></span>\`\` result <span class="token operator">=</span> service<span class="token punctuation">.</span><span class="token function">conferenceRoom</span><span class="token punctuation">(</span><span class="token string">&quot;Colorado&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">hasValueSatisfying</span><span class="token punctuation">(</span>room <span class="token operator">-&gt;</span> <span class="token string">&quot;Colorado&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>room<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以检查生成的SQL，并期望它使用自然ID，即<code>name</code>列来查询<code>conference_room</code>表：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">select</span> c1_0<span class="token punctuation">.</span>id<span class="token punctuation">,</span>c1_0<span class="token punctuation">.</span>capacity<span class="token punctuation">,</span>c1_0<span class="token punctuation">.</span>name
<span class="token keyword">from</span> conference_room c1_0
<span class="token keyword">where</span> c1_0<span class="token punctuation">.</span>name<span class="token operator">=</span>?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-复合自然id" tabindex="-1"><a class="header-anchor" href="#_3-复合自然id"><span>3. 复合自然ID</span></a></h2><p><strong>自然标识符也可以由多个字段组成。在这种情况下，我们可以用<code>@NaturalId</code>注解标注所有相关字段。</strong></p><p>例如，让我们考虑<code>GuestRoom</code>实体，它具有由<code>roomNumber</code>和<code>floor</code>字段组成的复合自然键：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GuestRoom</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@NaturalId</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> roomNumber<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@NaturalId</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> floor<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> capacity<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">GuestRoom</span><span class="token punctuation">(</span><span class="token keyword">int</span> roomNumber<span class="token punctuation">,</span> <span class="token keyword">int</span> floor<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> capacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>roomNumber <span class="token operator">=</span> roomNumber<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>floor <span class="token operator">=</span> floor<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>capacity <span class="token operator">=</span> capacity<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token class-name">GuestRoom</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// getters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与第一个示例类似，我们现在将使用Hibernate的<code>Session</code>中的<code>byNaturalId</code>方法。之后，<strong>我们将使用流畅的API来指定组成复合键的字段的值：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Optional</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">GuestRoom</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">guestRoom</span><span class="token punctuation">(</span><span class="token keyword">int</span> roomNumber<span class="token punctuation">,</span> <span class="token keyword">int</span> floor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Session</span> session <span class="token operator">=</span> entityManager<span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token class-name">Session</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> session<span class="token punctuation">.</span><span class="token function">byNaturalId</span><span class="token punctuation">(</span><span class="token class-name">GuestRoom</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">using</span><span class="token punctuation">(</span><span class="token string">&quot;roomNumber&quot;</span><span class="token punctuation">,</span> roomNumber<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">using</span><span class="token punctuation">(</span><span class="token string">&quot;floor&quot;</span><span class="token punctuation">,</span> floor<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">loadOptional</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们通过尝试查询编号为23，位于三楼的<code>GuestRoom</code>来测试该方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenWeFindByNaturalKey_thenEntityIsReturnedCorrectly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    guestRoomJpaRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">GuestRoom</span><span class="token punctuation">(</span><span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&quot;B-423&quot;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Optional</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">GuestRoom</span><span class="token punctuation">&gt;</span></span>\`\` result <span class="token operator">=</span> service<span class="token punctuation">.</span><span class="token function">guestRoom</span><span class="token punctuation">(</span><span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">hasValueSatisfying</span><span class="token punctuation">(</span>room <span class="token operator">-&gt;</span> <span class="token string">&quot;B-423&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>room<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们现在检查SQL，我们应该看到一个直接使用复合键的简单查询：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">select</span> g1_0<span class="token punctuation">.</span>id<span class="token punctuation">,</span>g1_0<span class="token punctuation">.</span>capacity<span class="token punctuation">,</span>g1_0<span class="token punctuation">.</span>floor<span class="token punctuation">,</span>g1_0<span class="token punctuation">.</span>name<span class="token punctuation">,</span>g1_0<span class="token punctuation">.</span>room_number
<span class="token keyword">from</span> guest_room g1_0
<span class="token keyword">where</span> g1_0<span class="token punctuation">.</span>floor<span class="token operator">=</span>?
<span class="token operator">and</span> g1_0<span class="token punctuation">.</span>room_number<span class="token operator">=</span>?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-与spring-data集成" tabindex="-1"><a class="header-anchor" href="#_4-与spring-data集成"><span>4. 与Spring Data集成</span></a></h2><p><strong>Spring Data的<code>JpaRepository</code>开箱即用并不支持按自然标识符查询。尽管如此，我们可以通过添加额外的方法来扩展这些接口以启用此类查询。</strong> 为了实现这一点，我们首先必须声明丰富的接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@NoRepositoryBean</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">NaturalIdRepository</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> ID<span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> ID<span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token punctuation">{</span>
    <span class="token class-name">Optional</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">naturalId</span><span class="token punctuation">(</span><span class="token class-name">ID</span> naturalId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在此之后，我们将创建这个接口的通用实现。此外，我们需要将通用类型转换为域实体。为了实现这一点，我们可以扩展JPA的<code>SimpleJpaRepository</code>，并利用它的<code>getDomainClass</code>方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NaturalIdRepositoryImpl</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> ID <span class="token keyword">extends</span> <span class="token class-name">Serializable</span><span class="token punctuation">&gt;</span></span>\` <span class="token keyword">extends</span> <span class="token class-name">SimpleJpaRepository</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> ID<span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token keyword">implements</span> <span class="token class-name">NaturalIdRepository</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> ID<span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">EntityManager</span> entityManager<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">NaturalIdRepositoryImpl</span><span class="token punctuation">(</span><span class="token class-name">JpaEntityInformation</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\` entityInformation<span class="token punctuation">,</span> <span class="token class-name">EntityManager</span> entityManager<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>entityInformation<span class="token punctuation">,</span> entityManager<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>entityManager <span class="token operator">=</span> entityManager<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Optional</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">naturalId</span><span class="token punctuation">(</span><span class="token class-name">ID</span> naturalId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> entityManager<span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token class-name">Session</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">bySimpleNaturalId</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getDomainClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">loadOptional</span><span class="token punctuation">(</span>naturalId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们需要添加<code>@EnableJpaRepositories</code>注解，允许Spring扫描整个包并注册我们的自定义存储库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableJpaRepositories</span><span class="token punctuation">(</span>repositoryBaseClass <span class="token operator">=</span> <span class="token class-name">NaturalIdRepositoryImpl</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NaturalIdRepositoryConfig</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将允许我们扩展<code>NaturalIdRepository</code>接口，为我们拥有自然ID的实体创建存储库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ConferenceRoomRepository</span> <span class="token keyword">extends</span> <span class="token class-name">NaturalIdRepository</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ConferenceRoom</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果，我们将能够使用丰富的存储库API，并利用<code>naturalId</code>方法进行简单查询：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenNaturalIdRepository_whenWeFindBySimpleNaturalKey_thenEntityIsReturnedCorrectly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    conferenceRoomJpaRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ConferenceRoom</span><span class="token punctuation">(</span><span class="token string">&quot;Nevada&quot;</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Optional</span> result <span class="token operator">=</span> conferenceRoomRepository<span class="token punctuation">.</span><span class="token function">naturalId</span><span class="token punctuation">(</span><span class="token string">&quot;Nevada&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">hasValueSatisfying</span><span class="token punctuation">(</span>room <span class="token operator">-&gt;</span> <span class="token string">&quot;Nevada&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>room<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们检查生成的SQL语句：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">select</span> c1_0<span class="token punctuation">.</span>id<span class="token punctuation">,</span>c1_0<span class="token punctuation">.</span>capacity<span class="token punctuation">,</span>c1_0<span class="token punctuation">.</span>name
<span class="token keyword">from</span> conference_room c1_0
<span class="token keyword">where</span> c1_0<span class="token punctuation">.</span>name<span class="token operator">=</span>?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了拥有自然标识符的实体，并发现Hibernate的API允许我们轻松地通过这些特殊标识符进行查询。之后，我们创建了一个通用的Spring Data JPA存储库，并丰富了它以利用Hibernate的这一特性。</p><p>如常，本文的代码示例可以在GitHub上找到。</p><p>OK</p>`,44),o=[p];function c(i,l){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-05-Hibernate Natural IDs in Spring Boot.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Hibernate%20Natural%20IDs%20in%20Spring%20Boot.html","title":"Hibernate自然ID在Spring Boot中的使用","lang":"zh-CN","frontmatter":{"date":"2024-07-06T00:00:00.000Z","category":["Hibernate","Spring Boot"],"tag":["Natural ID","JPA"],"head":[["meta",{"name":"keywords","content":"Hibernate, Spring Boot, Natural ID, JPA, Spring Data"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Hibernate%20Natural%20IDs%20in%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Hibernate自然ID在Spring Boot中的使用"}],["meta",{"property":"og:description","content":"Hibernate自然ID在Spring Boot中的使用 1. 概述 一些数据库条目拥有自然标识符，例如书籍的ISBN或个人的社保号。除了传统的数据库ID外，Hibernate允许我们将某些字段声明为自然ID，并基于这些属性轻松查询。 在本教程中，我们将讨论@NaturalId注解，并学习如何在Spring Boot项目中使用和实现它。 2. 简单的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T16:57:43.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Natural ID"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:published_time","content":"2024-07-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T16:57:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Hibernate自然ID在Spring Boot中的使用\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T16:57:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Hibernate自然ID在Spring Boot中的使用 1. 概述 一些数据库条目拥有自然标识符，例如书籍的ISBN或个人的社保号。除了传统的数据库ID外，Hibernate允许我们将某些字段声明为自然ID，并基于这些属性轻松查询。 在本教程中，我们将讨论@NaturalId注解，并学习如何在Spring Boot项目中使用和实现它。 2. 简单的..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 简单的自然ID","slug":"_2-简单的自然id","link":"#_2-简单的自然id","children":[]},{"level":2,"title":"3. 复合自然ID","slug":"_3-复合自然id","link":"#_3-复合自然id","children":[]},{"level":2,"title":"4. 与Spring Data集成","slug":"_4-与spring-data集成","link":"#_4-与spring-data集成","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720198663000,"updatedTime":1720198663000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.18,"words":1254},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Hibernate Natural IDs in Spring Boot.md","localizedDate":"2024年7月6日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>一些数据库条目拥有自然标识符，例如书籍的ISBN或个人的社保号。除了传统的数据库ID外，Hibernate允许我们将某些字段声明为自然ID，并基于这些属性轻松查询。</p>\\n<p>在本教程中，我们将讨论<code>@NaturalId</code>注解，并学习如何在Spring Boot项目中使用和实现它。</p>\\n<h2>2. 简单的自然ID</h2>\\n<p><strong>我们可以通过简单地用<code>@NaturalId</code>注解标注字段来指定自然标识符。这允许我们使用Hibernate的API无缝地查询相关列。</strong></p>\\n","autoDesc":true}');export{d as comp,k as data};
