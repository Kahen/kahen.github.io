import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CM1q4_9A.js";const p={},e=t(`<h1 id="实体与数据传输对象-dto-的区别" tabindex="-1"><a class="header-anchor" href="#实体与数据传输对象-dto-的区别"><span>实体与数据传输对象（DTO）的区别</span></a></h1><p>在软件开发领域，实体（Entities）和数据传输对象（DTOs）之间有明显的区别。了解它们确切的角色和差异可以帮助我们构建更高效和可维护的软件。</p><p>在本文中，我们将探讨实体和DTOs之间的区别，并尝试提供对它们目的的清晰理解，以及何时在我们的软件项目中使用它们。在讨论每个概念时，我们将使用Spring Boot和JPA来构建一个简单的用户管理应用程序。</p><p>实体是我们应用程序领域中真实世界对象或概念的基本组成部分。它们通常直接对应于数据库表或领域对象。因此，它们的主要目的是封装和管理这些对象的状态和行为。</p><h3 id="_2-1-实体示例" tabindex="-1"><a class="header-anchor" href="#_2-1-实体示例"><span>2.1 实体示例</span></a></h3><p>让我们为我们的项目创建一些实体，代表一个拥有多本书的用户。我们将从创建_Book_实体开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;books&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>

    <span class="token comment">// 标准构造函数 / 获取器 / 设置器</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们需要定义我们的_User_实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;users&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">AUTO</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> address<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@OneToMany</span><span class="token punctuation">(</span>cascade<span class="token operator">=</span><span class="token class-name">CascadeType</span><span class="token punctuation">.</span><span class="token constant">ALL</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>\` books<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getNameOfMostOwnedBook</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Map</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>\` bookOwnershipCount <span class="token operator">=</span> books<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">groupingBy</span><span class="token punctuation">(</span><span class="token class-name">Book</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span> <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">counting</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> bookOwnershipCount<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token punctuation">.</span><span class="token function">comparingByValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getKey</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 标准构造函数 / 获取器 / 设置器</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-实体特性" tabindex="-1"><a class="header-anchor" href="#_2-2-实体特性"><span>2.2 实体特性</span></a></h3><p>在我们的实体中，我们可以识别一些独特的特性。首先，实体通常包含对象关系映射（ORM）注解。例如，_@Entity_注解将类标记为实体，创建Java类和数据库表之间的直接链接。</p><p><em>@Table_注解用于指定与实体关联的数据库表的名称。此外，</em>@Id_注解定义一个字段作为主键。这些ORM注解简化了数据库映射的过程。</p><p>此外，实体通常需要与他实体建立关系，反映现实世界概念之间的关联。一个常见的例子是我们使用的_@OneToMany_注解，用于定义用户和他拥有的书籍之间的一对多关系。</p><p>此外，实体不必仅作为被动数据对象，还可以包含特定领域的业务逻辑。例如，考虑一个名为_getNameOfMostOwnedBook()_的方法。此方法位于实体内部，封装特定领域的逻辑以找到用户拥有最多的书籍的名称。这种方法符合OOP原则和DDD方法，通过将特定领域的操作保留在实体中，促进代码组织和封装。</p><p>此外，实体可能还包含其他特殊性，例如验证约束或生命周期方法。</p><h2 id="_3-dtos" tabindex="-1"><a class="header-anchor" href="#_3-dtos"><span>3. DTOs</span></a></h2><p>DTOs主要作为纯数据载体，没有任何业务逻辑。它们用于在不同应用程序或同一应用程序的不同部分之间传输数据。</p><p>在简单的应用程序中，通常直接使用领域对象作为DTOs。然而，随着应用程序复杂性的增长，从安全和封装的角度来看，向外部客户端公开整个领域模型可能变得不那么可取。</p><h3 id="_3-1-dto示例" tabindex="-1"><a class="header-anchor" href="#_3-1-dto示例"><span>3.1 DTO示例</span></a></h3><p>为了使我们的应用程序尽可能简单，我们将只实现创建新用户和检索当前用户的功能。为此，让我们首先创建一个DTO来表示一本书：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BookDto</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">&quot;NAME&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">&quot;AUTHOR&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>

    <span class="token comment">// 标准构造函数 / 获取器</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于用户，让我们定义两个DTOs。一个用于创建用户，另一个用于响应目的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserCreationDto</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">&quot;FIRST_NAME&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">&quot;LAST_NAME&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">&quot;ADDRESS&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> address<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">&quot;BOOKS&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookDto</span><span class="token punctuation">&gt;</span></span>\`\` books<span class="token punctuation">;</span>

    <span class="token comment">// 标准构造函数 / 获取器</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserResponseDto</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">&quot;ID&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">&quot;FIRST_NAME&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">&quot;LAST_NAME&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">&quot;BOOKS&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookDto</span><span class="token punctuation">&gt;</span></span>\`\` books<span class="token punctuation">;</span>

    <span class="token comment">// 标准构造函数 / 获取器</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-dto特性" tabindex="-1"><a class="header-anchor" href="#_3-2-dto特性"><span>3.2 DTO特性</span></a></h3><p>根据我们的示例，我们可以识别一些特性：不可变性、验证注解和JSON映射注解。</p><p>使DTOs不可变是一种最佳实践。不可变性确保在传输过程中数据不会被意外更改。实现这一点的一种方法是通过声明所有属性为_final_并不实现_setters_。或者，可以使用<strong>Lombok</strong>的_@Value_注解或Java 14中引入的Java <em>records</em>，以简洁的方式创建不可变的DTOs。</p><p>接下来，DTOs也可以从验证中受益，以确保通过DTOs传输的数据满足特定标准。这样，我们可以在数据传输过程中尽早检测和拒绝无效数据，<strong>防止不可靠的信息污染领域</strong>。</p><p>此外，我们通常可以在DTOs中找到<strong>JSON映射注解</strong>，<strong>将JSON属性映射到我们的DTOs的字段</strong>。例如，_@JsonProperty_注解允许我们指定DTOs的JSON名称。</p><h2 id="_4-存储库、映射器和控制器" tabindex="-1"><a class="header-anchor" href="#_4-存储库、映射器和控制器"><span>4. 存储库、映射器和控制器</span></a></h2><p>为了演示在应用程序中同时使用实体和DTOs表示数据的效用，我们需要完成我们的代码。我们将从为我们的_User_实体创建一个存储库开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将创建一个映射器，以便能够相互转换：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserMapper</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">UserResponseDto</span> <span class="token function">toDto</span><span class="token punctuation">(</span><span class="token class-name">User</span> entity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">UserResponseDto</span><span class="token punctuation">(</span>
          entity<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          entity<span class="token punctuation">.</span><span class="token function">getFirstName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          entity<span class="token punctuation">.</span><span class="token function">getLastName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          entity<span class="token punctuation">.</span><span class="token function">getBooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">UserMapper</span><span class="token operator">::</span><span class="token function">toDto</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">User</span> <span class="token function">toEntity</span><span class="token punctuation">(</span><span class="token class-name">UserCreationDto</span> dto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span>
          dto<span class="token punctuation">.</span><span class="token function">getFirstName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          dto<span class="token punctuation">.</span><span class="token function">getLastName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          dto<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          dto<span class="token punctuation">.</span><span class="token function">getBooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">UserMapper</span><span class="token operator">::</span><span class="token function">toEntity</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">BookDto</span> <span class="token function">toDto</span><span class="token punctuation">(</span><span class="token class-name">Book</span> entity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">BookDto</span><span class="token punctuation">(</span>entity<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> entity<span class="token punctuation">.</span><span class="token function">getAuthor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Book</span> <span class="token function">toEntity</span><span class="token punctuation">(</span><span class="token class-name">BookDto</span> dto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span>dto<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> dto<span class="token punctuation">.</span><span class="token function">getAuthor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的示例中，我们在实体和DTOs之间手动进行了映射。对于更复杂的模型，为了避免样板代码，我们可以使用像<strong>MapStruct</strong>这样的工具。</p><p>现在，我们只需要创建控制器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/users&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserController</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">UserRepository</span> userRepository<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">UserController</span><span class="token punctuation">(</span><span class="token class-name">UserRepository</span> userRepository<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>userRepository <span class="token operator">=</span> userRepository<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserResponseDto</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">getUsers</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> userRepository<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">UserMapper</span><span class="token operator">::</span><span class="token function">toDto</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@PostMapping</span>
    <span class="token keyword">public</span> <span class="token class-name">UserResponseDto</span> <span class="token function">createUser</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">UserCreationDto</span> userCreationDto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">UserMapper</span><span class="token punctuation">.</span><span class="token function">toDto</span><span class="token punctuation">(</span>userRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token class-name">UserMapper</span><span class="token punctuation">.</span><span class="token function">toEntity</span><span class="token punctuation">(</span>userCreationDto<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，使用_findAll()_可能会对大型集合的性能产生影响。在这些情况下，包括类似分页的东西可能会有所帮助。</p><h2 id="_5-为什么我们需要实体和dtos" tabindex="-1"><a class="header-anchor" href="#_5-为什么我们需要实体和dtos"><span>5. 为什么我们需要实体和DTOs？</span></a></h2><h3 id="_5-1-职责分离" tabindex="-1"><a class="header-anchor" href="#_5-1-职责分离"><span>5.1. 职责分离</span></a></h3><p>在我们的示例中，<strong>实体与数据库架构和特定领域的操作紧密相关</strong>。另一方面，<strong>DTOs仅设计用于数据传输目的</strong>。</p><p>在某些架构范式中，如六边形架构，我们可能会发现一个额外的层，通常称为模型或领域模型。这层的重要作用是完全将领域与任何侵入性技术解耦。这样，核心业务逻辑就独立于数据库、框架或外部系统的实现细节。</p><h3 id="_5-2-隐藏敏感数据" tabindex="-1"><a class="header-anchor" href="#_5-2-隐藏敏感数据"><span>5.2. 隐藏敏感数据</span></a></h3><p>在处理外部客户端或系统时，控制向外部世界暴露哪些数据至关重要。实体可能包含敏感信息或业务逻辑，这些信息或逻辑应该对外部消费者保持隐藏。DTOs作为屏障，帮助我们只向客户端暴露安全和相关的数据。</p><h3 id="_5-3-性能" tabindex="-1"><a class="header-anchor" href="#_5-3-性能"><span>5.3. 性能</span></a></h3><p>DTO模式，正如Martin Fowler所介绍的，涉及在单个调用中批量多个参数。我们不是通过多次调用获取单个数据片段，而是可以将相关数据捆绑到DTO中，并在单个请求中传输。<strong>这种方法减少了与多个网络调用相关的开销</strong>。</p><p>实现DTO模式的一种方式是通过<strong>GraphQL</strong>，它允许客户端指定它所需的数据，允许在单个请求中进行多个查询。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p><strong>正如我们在整个文章中学到的，实体和DTOs具有不同的角色，可以非常不同</strong>。实体和DTOs的结合确保了数据安全、职责分离和复杂软件系统中的高效数据管理。这种方法导致更健壮和可维护的软件解决方案。</p><p>如常，源代码可在GitHub上获得。</p>`,50),o=[e];function c(l,i){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-26-Differences Between Entities and DTOs.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Differences%20Between%20Entities%20and%20DTOs.html","title":"实体与数据传输对象（DTO）的区别","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","Software Development"],"tag":["Entity","DTO"],"head":[["meta",{"name":"keywords","content":"Java, Entity, DTO, Software Development"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Differences%20Between%20Entities%20and%20DTOs.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"实体与数据传输对象（DTO）的区别"}],["meta",{"property":"og:description","content":"实体与数据传输对象（DTO）的区别 在软件开发领域，实体（Entities）和数据传输对象（DTOs）之间有明显的区别。了解它们确切的角色和差异可以帮助我们构建更高效和可维护的软件。 在本文中，我们将探讨实体和DTOs之间的区别，并尝试提供对它们目的的清晰理解，以及何时在我们的软件项目中使用它们。在讨论每个概念时，我们将使用Spring Boot和JP..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T03:52:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Entity"}],["meta",{"property":"article:tag","content":"DTO"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T03:52:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"实体与数据传输对象（DTO）的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T03:52:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"实体与数据传输对象（DTO）的区别 在软件开发领域，实体（Entities）和数据传输对象（DTOs）之间有明显的区别。了解它们确切的角色和差异可以帮助我们构建更高效和可维护的软件。 在本文中，我们将探讨实体和DTOs之间的区别，并尝试提供对它们目的的清晰理解，以及何时在我们的软件项目中使用它们。在讨论每个概念时，我们将使用Spring Boot和JP..."},"headers":[{"level":3,"title":"2.1 实体示例","slug":"_2-1-实体示例","link":"#_2-1-实体示例","children":[]},{"level":3,"title":"2.2 实体特性","slug":"_2-2-实体特性","link":"#_2-2-实体特性","children":[]},{"level":2,"title":"3. DTOs","slug":"_3-dtos","link":"#_3-dtos","children":[{"level":3,"title":"3.1 DTO示例","slug":"_3-1-dto示例","link":"#_3-1-dto示例","children":[]},{"level":3,"title":"3.2 DTO特性","slug":"_3-2-dto特性","link":"#_3-2-dto特性","children":[]}]},{"level":2,"title":"4. 存储库、映射器和控制器","slug":"_4-存储库、映射器和控制器","link":"#_4-存储库、映射器和控制器","children":[]},{"level":2,"title":"5. 为什么我们需要实体和DTOs？","slug":"_5-为什么我们需要实体和dtos","link":"#_5-为什么我们需要实体和dtos","children":[{"level":3,"title":"5.1. 职责分离","slug":"_5-1-职责分离","link":"#_5-1-职责分离","children":[]},{"level":3,"title":"5.2. 隐藏敏感数据","slug":"_5-2-隐藏敏感数据","link":"#_5-2-隐藏敏感数据","children":[]},{"level":3,"title":"5.3. 性能","slug":"_5-3-性能","link":"#_5-3-性能","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719373926000,"updatedTime":1719373926000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.87,"words":2062},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Differences Between Entities and DTOs.md","localizedDate":"2024年6月26日","excerpt":"\\n<p>在软件开发领域，实体（Entities）和数据传输对象（DTOs）之间有明显的区别。了解它们确切的角色和差异可以帮助我们构建更高效和可维护的软件。</p>\\n<p>在本文中，我们将探讨实体和DTOs之间的区别，并尝试提供对它们目的的清晰理解，以及何时在我们的软件项目中使用它们。在讨论每个概念时，我们将使用Spring Boot和JPA来构建一个简单的用户管理应用程序。</p>\\n<p>实体是我们应用程序领域中真实世界对象或概念的基本组成部分。它们通常直接对应于数据库表或领域对象。因此，它们的主要目的是封装和管理这些对象的状态和行为。</p>\\n<h3>2.1 实体示例</h3>\\n<p>让我们为我们的项目创建一些实体，代表一个拥有多本书的用户。我们将从创建_Book_实体开始：</p>","autoDesc":true}');export{r as comp,d as data};
