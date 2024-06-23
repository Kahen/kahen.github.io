import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-DNGMkCCj.js";const t={},p=e(`<h1 id="hibernate中的-struct注解类型-结构化用户定义类型-baeldung" tabindex="-1"><a class="header-anchor" href="#hibernate中的-struct注解类型-结构化用户定义类型-baeldung"><span>Hibernate中的@Struct注解类型 - 结构化用户定义类型 | Baeldung</span></a></h1><p>在本教程中，我们将回顾Hibernate的@Struct注解，它允许开发者创建结构化用户定义类型。</p><p>结构化用户定义类型，也称为结构化类型，是在SQL:1999标准中引入的，是对象关系（ORM）数据库的一个特性。</p><p>结构化或复合类型有其用例，特别是自SQL:2016标准引入JSON支持以来。这些结构化类型的值可以访问它们的子部分，并且不像表中的行那样具有标识符或主键。</p><h3 id="结构映射" tabindex="-1"><a class="header-anchor" href="#结构映射"><span>结构映射</span></a></h3><p><strong>Hibernate允许你通过@Struct注解类型为带有@Embeddable注解或@Embedded属性的类指定结构化类型。</strong></p><h4 id="_2-1-使用-struct映射结构化类型" tabindex="-1"><a class="header-anchor" href="#_2-1-使用-struct映射结构化类型"><span>2.1. 使用@Struct映射结构化类型</span></a></h4><p>考虑下面的例子，一个_Department_类，它有一个带有@Embedded的_Manager_类（一个结构化类型）：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Department</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> departmentName<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Embedded</span>
    <span class="token keyword">private</span> <span class="token class-name">Manager</span> manager<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用@Struct注解定义的_Manager_类如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Embeddable</span>
<span class="token annotation punctuation">@Struct</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Department_Manager_Type&quot;</span><span class="token punctuation">,</span> attributes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;firstName&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;lastName&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;qualification&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Manager</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> qualification<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-embeddable和-struct注解之间的区别" tabindex="-1"><a class="header-anchor" href="#_2-2-embeddable和-struct注解之间的区别"><span>2.2. @Embeddable和@Struct注解之间的区别</span></a></h4><p>带有@Struct注解的类将类映射到数据库中的结构化用户定义类型。例如，如果没有@Struct注解，尽管@Embedded的_Manager_对象是一个单独的类型，它将成为_DEPARTMENT_表的一部分，如下所示的DDL：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> DEPARTMENT <span class="token punctuation">(</span>
  Id <span class="token keyword">BIGINT</span><span class="token punctuation">,</span>
  DepartmentName <span class="token keyword">VARCHAR</span><span class="token punctuation">,</span>
  FirstName <span class="token keyword">VARCHAR</span><span class="token punctuation">,</span>
  LastName <span class="token keyword">VARCHAR</span><span class="token punctuation">,</span>
  Qualification <span class="token keyword">VARCHAR</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>带有@Struct注解的_Manager_类将产生一个类似于以下的用户定义类型：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">type</span> Department_Manager_Type <span class="token keyword">as</span> <span class="token punctuation">(</span>
    firstName <span class="token keyword">VARCHAR</span><span class="token punctuation">,</span>
    lastName <span class="token keyword">VARCHAR</span><span class="token punctuation">,</span>
    qualification <span class="token keyword">VARCHAR</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加上@Struct注解后，_DEPARTMENT_对象如下所示的DDL：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> DEPARTMENT <span class="token punctuation">(</span>
Id <span class="token keyword">BIGINT</span><span class="token punctuation">,</span>
DepartmentName <span class="token keyword">VARCHAR</span><span class="token punctuation">,</span>
Manager Department_Manager_Type
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-struct注解和属性的顺序" tabindex="-1"><a class="header-anchor" href="#_2-3-struct注解和属性的顺序"><span>2.3. @Struct注解和属性的顺序</span></a></h4><p>由于结构化类型具有多个属性，属性的顺序对于将数据映射到正确的属性非常重要。定义属性顺序的一种方式是通过@Struct注解的“attributes”字段。</p><p>在上面的_Manager_类中，你可以看到@Struct注解的“attributes”字段，它指定Hibernate在序列化和反序列化_Manager_属性时期望的顺序是“firstName”，“lastName”和最后的“qualification”。</p><p><strong>定义属性顺序的第二种方式是使用Java记录来隐式地通过规范构造函数指定顺序，例如：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Embeddable</span>
<span class="token annotation punctuation">@Struct</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Department_Manager&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">Manager</span><span class="token punctuation">(</span><span class="token class-name">String</span> lastName<span class="token punctuation">,</span> <span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> qualification<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述的_Manager_记录属性将具有以下顺序：“lastName”，“firstName”和“qualification”。</p><h3 id="json映射" tabindex="-1"><a class="header-anchor" href="#json映射"><span>JSON映射</span></a></h3><p>由于JSON是预定义的非结构化类型，因此无需定义类型名称或属性顺序。通过使用@JdbcTypeCode(SqlTypes.JSON)注解嵌入式字段/属性，可以将@Embeddable作为JSON映射。</p><p>例如，下面的类持有一个_Manager_对象，它也是一个JSON非结构化类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Department_JsonHolder</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@JdbcTypeCode</span><span class="token punctuation">(</span><span class="token class-name">SqlTypes</span><span class="token punctuation">.</span><span class="token constant">JSON</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;department_manager_json&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Manager</span> manager<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述类的预期DDL代码如下：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> Department_JsonHolder <span class="token keyword">as</span> <span class="token punctuation">(</span>
    id <span class="token keyword">int</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">primary</span> <span class="token keyword">key</span><span class="token punctuation">,</span>
    department_manager_json json
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下是从_department_manager_json_列选择属性的示例HQL查询：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">select</span> djh<span class="token punctuation">.</span>manager<span class="token punctuation">.</span>firstName<span class="token punctuation">,</span> djh<span class="token punctuation">.</span>manager<span class="token punctuation">.</span>lastName<span class="token punctuation">,</span> djh<span class="token punctuation">.</span>manager<span class="token punctuation">.</span>qualifications
<span class="token keyword">from</span> department_jsonholder djh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>@Embeddable和@Embeddable @Struct之间的区别在于后者实际上是底层数据库中的<strong>用户定义类型</strong>。尽管许多数据库支持用户定义类型，但支持@Struct注解的hibernate方言包括：</p><ul><li>Oracle</li><li>DB2</li><li>PostgreSQL</li></ul><p>在本文中，我们讨论了Hibernate的@Struct注解，如何使用它，以及何时将其添加到域类中。</p><p>文章的源代码可在GitHub上找到。</p><p>文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,38),i=[p];function l(c,o){return s(),a("div",null,i)}const u=n(t,[["render",l],["__file","2024-06-19-The  Struct Annotation Type in Hibernate   Structured User Defined Types.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-19-The%20%20Struct%20Annotation%20Type%20in%20Hibernate%20%20%20Structured%20User%20Defined%20Types.html","title":"Hibernate中的@Struct注解类型 - 结构化用户定义类型 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Hibernate","Java"],"tag":["Struct Annotation","User-Defined Types"],"head":[["meta",{"name":"keywords","content":"Hibernate, Struct, Annotation, User-Defined Types, SQL, JSON, Database, ORM"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-19-The%20%20Struct%20Annotation%20Type%20in%20Hibernate%20%20%20Structured%20User%20Defined%20Types.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Hibernate中的@Struct注解类型 - 结构化用户定义类型 | Baeldung"}],["meta",{"property":"og:description","content":"Hibernate中的@Struct注解类型 - 结构化用户定义类型 | Baeldung 在本教程中，我们将回顾Hibernate的@Struct注解，它允许开发者创建结构化用户定义类型。 结构化用户定义类型，也称为结构化类型，是在SQL:1999标准中引入的，是对象关系（ORM）数据库的一个特性。 结构化或复合类型有其用例，特别是自SQL:2016..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Struct Annotation"}],["meta",{"property":"article:tag","content":"User-Defined Types"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Hibernate中的@Struct注解类型 - 结构化用户定义类型 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Hibernate中的@Struct注解类型 - 结构化用户定义类型 | Baeldung 在本教程中，我们将回顾Hibernate的@Struct注解，它允许开发者创建结构化用户定义类型。 结构化用户定义类型，也称为结构化类型，是在SQL:1999标准中引入的，是对象关系（ORM）数据库的一个特性。 结构化或复合类型有其用例，特别是自SQL:2016..."},"headers":[{"level":3,"title":"结构映射","slug":"结构映射","link":"#结构映射","children":[]},{"level":3,"title":"JSON映射","slug":"json映射","link":"#json映射","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.1,"words":931},"filePathRelative":"posts/baeldung/Archive/2024-06-19-The  Struct Annotation Type in Hibernate   Structured User Defined Types.md","localizedDate":"2024年6月20日","excerpt":"\\n<p>在本教程中，我们将回顾Hibernate的@Struct注解，它允许开发者创建结构化用户定义类型。</p>\\n<p>结构化用户定义类型，也称为结构化类型，是在SQL:1999标准中引入的，是对象关系（ORM）数据库的一个特性。</p>\\n<p>结构化或复合类型有其用例，特别是自SQL:2016标准引入JSON支持以来。这些结构化类型的值可以访问它们的子部分，并且不像表中的行那样具有标识符或主键。</p>\\n<h3>结构映射</h3>\\n<p><strong>Hibernate允许你通过@Struct注解类型为带有@Embeddable注解或@Embedded属性的类指定结构化类型。</strong></p>","autoDesc":true}');export{u as comp,m as data};
