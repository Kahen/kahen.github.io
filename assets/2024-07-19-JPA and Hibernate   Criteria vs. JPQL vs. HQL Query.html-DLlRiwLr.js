import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-CBerKIce.js";const t={},p=e('<h1 id="jpa和hibernate-criteria查询与jpql和hql查询的比较" tabindex="-1"><a class="header-anchor" href="#jpa和hibernate-criteria查询与jpql和hql查询的比较"><span>JPA和Hibernate - Criteria查询与JPQL和HQL查询的比较</span></a></h1><p>在本教程中，我们将了解如何使用JPA和Hibernate查询，以及Criteria、JPQL和HQL查询之间的区别。Criteria查询允许用户在不使用原始SQL的情况下编写查询。除了Criteria查询，我们还将探讨编写Hibernate命名查询以及如何在Spring Data JPA中使用_Query_注解。</p><p>在我们深入之前，应该指出Hibernate Criteria API自Hibernate 5.2以来已被弃用。因此，<strong>我们将在示例中使用JPA Criteria API</strong>，因为它是编写Criteria查询的新的和首选工具。从这里开始，我们将简单地将其称为Criteria API。</p><h3 id="_2-criteria查询" tabindex="-1"><a class="header-anchor" href="#_2-criteria查询"><span>2. Criteria查询</span></a></h3><p>Criteria API通过在其上应用不同的过滤器和逻辑条件来帮助构建Criteria查询对象。这是操纵对象并从RDBMS表中返回所需数据的替代方法。</p><p>Hibernate <em>Session</em> 的 <em>createCriteria()</em> 方法返回应用程序中运行Criteria查询的持久性对象实例。简单来说，Criteria API构建了一个应用不同过滤器和逻辑条件的Criteria查询。</p><h3 id="_2-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_2-1-maven依赖"><span>2.1. Maven依赖</span></a></h3><p>让我们获取Hibernate的参考JPA依赖项的最新版本——它在Hibernate中实现了JPA——并将其添加到我们的_pom.xml_中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`org.hibernate.orm`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`hibernate-core`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`6.4.2.Final`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-使用criteria查询和表达式" tabindex="-1"><a class="header-anchor" href="#_2-2-使用criteria查询和表达式"><span>2.2. 使用Criteria查询和表达式</span></a></h3><p>根据用户的条件，<strong><em>CriteriaBuilder</em> 控制查询结果</strong>。它使用 <em>CriteriaQuery</em> 的 <em>where()</em> 方法，该方法提供 <em>CriteriaBuilder</em> 表达式。</p><p>让我们看看我们将在本文中使用的实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">Long</span> salary<span class="token punctuation">;</span>\n\n   <span class="token comment">// 标准的getter和setter</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看一个简单的Criteria查询，它将从数据库中检索所有“Employee”的行：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Session</span> session <span class="token operator">=</span> <span class="token class-name">HibernateUtil</span><span class="token punctuation">.</span><span class="token function">getHibernateSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">CriteriaBuilder</span> cb <span class="token operator">=</span> session<span class="token punctuation">.</span><span class="token function">getCriteriaBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">CriteriaQuery</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>````` cr <span class="token operator">=</span> cb<span class="token punctuation">.</span><span class="token function">createQuery</span><span class="token punctuation">(</span><span class="token class-name">Employee</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Root</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>````` root <span class="token operator">=</span> cr<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token class-name">Employee</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ncr<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Query</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>````` query <span class="token operator">=</span> session<span class="token punctuation">.</span><span class="token function">createQuery</span><span class="token punctuation">(</span>cr<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>````` results <span class="token operator">=</span> query<span class="token punctuation">.</span><span class="token function">getResultList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nsession<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">return</span> results<span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述Criteria查询返回了所有条目的集合。让我们看看它是如何工作的：</p><ol><li><em>SessionFactory</em> 对象创建 <em>Session</em> 实例</li><li><em>Session</em> 使用 <em>getCriteriaBuilder()</em> 方法返回 <em>CriteriaBuilder</em> 的实例</li><li><em>CriteriaBuilder</em> 使用 <em>createQuery()</em> 方法。这创建了 <em>CriteriaQuery()</em> 对象，进一步返回查询实例</li><li>最后，我们调用 <em>getResult()</em> 方法以获得包含结果的查询对象</li></ol><p>让我们看看 <em>CriteriaQuery</em> 的另一个表达式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>cr<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span>cb<span class="token punctuation">.</span><span class="token function">gt</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;salary&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">50000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述查询的结果是返回薪水超过50000的员工集合。</p><p>JPQL代表Java持久化查询语言。Spring Data提供了多种创建和执行查询的方法，JPQL是其中之一。它使用Spring中的_Query_注解来定义JPQL和原生SQL查询。<strong>查询定义默认使用JPQL。</strong></p><p>我们使用 <em>@Query</em> 注解在Spring中定义SQL查询。<strong>任何由 <em>@Query</em> 注解定义的查询都比用 <em>@NamedQuery</em> 注解的命名查询具有更高的优先级。</strong></p><h3 id="_3-1-使用jpql查询" tabindex="-1"><a class="header-anchor" href="#_3-1-使用jpql查询"><span>3.1. 使用JPQL查询</span></a></h3><p>让我们使用JPQL构建一个动态查询：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Query</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;SELECT e FROM Employee e&quot;</span><span class="token punctuation">)</span>\n<span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>````` <span class="token function">findAllEmployees</span><span class="token punctuation">(</span><span class="token class-name">Sort</span> sort<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>使用带有参数的JPQL查询，Spring Data按照方法声明的顺序将方法参数传递给查询。让我们看几个将方法参数传递到查询中的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Query</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT e FROM Employee e WHERE e.salary = ?1&quot;</span><span class="token punctuation">)</span>\n<span class="token class-name">Employee</span> <span class="token function">findAllEmployeesWithSalary</span><span class="token punctuation">(</span><span class="token class-name">Long</span> salary<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Query</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT e FROM Employee e WHERE e.name = ?1 and e.salary = ?2&quot;</span><span class="token punctuation">)</span>\n<span class="token class-name">Employee</span> <span class="token function">findEmployeeByNameAndSalary</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">Long</span> salary<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的查询中，<em>name</em> 方法参数作为查询参数传递，对应于索引1，而 <em>salary</em> 参数作为索引2的查询参数传递。</p><h3 id="_3-2-使用jpql原生查询" tabindex="-1"><a class="header-anchor" href="#_3-2-使用jpql原生查询"><span>3.2. 使用JPQL原生查询</span></a></h3><p>我们可以直接在数据库中执行这些SQL查询，使用原生查询，这些查询指的是实际的数据库和表对象。我们需要<strong>将 <em>nativeQuery</em> 属性的值设置为 <em>true</em> 来定义一个原生SQL查询</strong>。<strong>原生SQL查询将在注解的 <em>value</em> 属性中定义。</strong></p><p>让我们看一个显示索引参数作为查询参数传递的原生查询：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Query</span><span class="token punctuation">(</span>\n  value <span class="token operator">=</span> <span class="token string">&quot;SELECT * FROM Employee e WHERE e.salary = ?1&quot;</span><span class="token punctuation">,</span>\n  nativeQuery <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>\n<span class="token class-name">Employee</span> <span class="token function">findEmployeeBySalaryNative</span><span class="token punctuation">(</span><span class="token class-name">Long</span> salary<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**使用命名参数使查询更易于阅读，在重构时也更不容易出错。**让我们看一个简单的JPQL和原生格式的命名查询示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Query</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT e FROM Employee e WHERE e.name = :name and e.salary = :salary&quot;</span><span class="token punctuation">)</span>\n<span class="token class-name">Employee</span> <span class="token function">findEmployeeByNameAndSalaryNamedParameters</span><span class="token punctuation">(</span>\n  <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span>\n  <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">&quot;salary&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> salary<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法参数使用命名参数传递给查询。我们可以使用 @Param 注解在存储库方法声明中定义命名查询。结果，<strong>@Param 注解必须具有与相应的JPQL或SQL查询名称相匹配的字符串值。</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Query</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;SELECT * FROM Employee e WHERE e.name = :name and e.salary = :salary&quot;</span><span class="token punctuation">,</span>\n  nativeQuery <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>\n<span class="token class-name">Employee</span> <span class="token function">findUserByNameAndSalaryNamedParamsNative</span><span class="token punctuation">(</span>\n  <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span>\n  <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">&quot;salary&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> salary<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-hql" tabindex="-1"><a class="header-anchor" href="#_4-hql"><span>4. HQL</span></a></h2><p>HQL代表Hibernate查询语言。它<strong>是一种类似于SQL的面向对象语言</strong>，我们可以用它来查询数据库。然而，主要的缺点是代码的可读性差。我们可以将我们的查询定义为命名查询，并将它们放在实际访问数据库的代码中。</p><h3 id="_4-1-使用hibernate命名查询" tabindex="-1"><a class="header-anchor" href="#_4-1-使用hibernate命名查询"><span>4.1. 使用Hibernate命名查询</span></a></h3><p>命名查询定义了一个具有预定义、不可更改的查询字符串的查询。这些查询是快速失败的，因为它们在会话工厂创建期间进行了验证。让我们使用 <em>org.hibernate.annotations.NamedQuery</em> 注解定义一个命名查询：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@NamedQuery</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Employee_FindByEmployeeId&quot;</span><span class="token punctuation">,</span>\n query <span class="token operator">=</span> <span class="token string">&quot;from Employee where id = :id&quot;</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>每个 <em>@NamedQuery</em> 注解只附加到一个实体类。我们可以使用 <em>@NamedQueries</em> 注解为一个实体组合多个命名查询：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@NamedQueries</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@NamedQuery</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Employee_findByEmployeeId&quot;</span><span class="token punctuation">,</span>\n      query <span class="token operator">=</span> <span class="token string">&quot;from Employee where id = :id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token annotation punctuation">@NamedQuery</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Employee_findAllByEmployeeSalary&quot;</span><span class="token punctuation">,</span>\n      query <span class="token operator">=</span> <span class="token string">&quot;from Employee where salary = :salary&quot;</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-存储过程和表达式" tabindex="-1"><a class="header-anchor" href="#_4-2-存储过程和表达式"><span>4.2. 存储过程和表达式</span></a></h3><p>总之，我们可以使用 <em>@NamedNativeQuery</em> 注解来存储过程和函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@NamedNativeQuery</span><span class="token punctuation">(</span>\n  name <span class="token operator">=</span> <span class="token string">&quot;Employee_FindByEmployeeId&quot;</span><span class="token punctuation">,</span>\n  query <span class="token operator">=</span> <span class="token string">&quot;select * from employee emp where id=:id&quot;</span><span class="token punctuation">,</span>\n  resultClass <span class="token operator">=</span> <span class="token class-name">Employee</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-criteria查询相对于hql和jpql查询的优势" tabindex="-1"><a class="header-anchor" href="#_5-criteria查询相对于hql和jpql查询的优势"><span>5. Criteria查询相对于HQL和JPQL查询的优势</span></a></h2><p><strong>Criteria查询相对于HQL的主要优势是整洁、清晰的面向对象API</strong>。因此，我们可以在编译时检测到Criteria API中的错误。</p><p>此外，JPQL查询和Criteria查询具有相同的性能和效率。</p><p><strong>Criteria查询比HQL和JPQL更灵活，并且为编写动态查询提供了更好的支持。</strong></p><p>但是HQL和JPQL提供了Criteria查询不可能的原生查询支持。这是Criteria查询的一个缺点。</p><p>我们可以很容易地使用JPQL原生查询编写复杂的连接，<strong>而使用Criteria API应用相同的连接则变得难以管理。</strong></p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们主要查看了Hibernate和JPA中Criteria查询、JPQL查询和HQL查询的基础知识。此外，我们学习了如何使用这些查询以及每种方法的优势和劣势。</p><p>像往常一样，本文中使用的所有代码示例可以在GitHub上找到，也可以在这里找到。</p>',56),i=[p];function o(l,c){return s(),n("div",null,i)}const d=a(t,[["render",o],["__file","2024-07-19-JPA and Hibernate   Criteria vs. JPQL vs. HQL Query.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-JPA%20and%20Hibernate%20%20%20Criteria%20vs.%20JPQL%20vs.%20HQL%20Query.html","title":"JPA和Hibernate - Criteria查询与JPQL和HQL查询的比较","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["JPA","Hibernate"],"tag":["Criteria Query","JPQL","HQL"],"head":[["meta",{"name":"keywords","content":"JPA, Hibernate, Criteria API, JPQL, HQL, Query"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-JPA%20and%20Hibernate%20%20%20Criteria%20vs.%20JPQL%20vs.%20HQL%20Query.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JPA和Hibernate - Criteria查询与JPQL和HQL查询的比较"}],["meta",{"property":"og:description","content":"JPA和Hibernate - Criteria查询与JPQL和HQL查询的比较 在本教程中，我们将了解如何使用JPA和Hibernate查询，以及Criteria、JPQL和HQL查询之间的区别。Criteria查询允许用户在不使用原始SQL的情况下编写查询。除了Criteria查询，我们还将探讨编写Hibernate命名查询以及如何在Spring ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T03:15:07.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Criteria Query"}],["meta",{"property":"article:tag","content":"JPQL"}],["meta",{"property":"article:tag","content":"HQL"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T03:15:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JPA和Hibernate - Criteria查询与JPQL和HQL查询的比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T03:15:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"JPA和Hibernate - Criteria查询与JPQL和HQL查询的比较 在本教程中，我们将了解如何使用JPA和Hibernate查询，以及Criteria、JPQL和HQL查询之间的区别。Criteria查询允许用户在不使用原始SQL的情况下编写查询。除了Criteria查询，我们还将探讨编写Hibernate命名查询以及如何在Spring ..."},"headers":[{"level":3,"title":"2. Criteria查询","slug":"_2-criteria查询","link":"#_2-criteria查询","children":[]},{"level":3,"title":"2.1. Maven依赖","slug":"_2-1-maven依赖","link":"#_2-1-maven依赖","children":[]},{"level":3,"title":"2.2. 使用Criteria查询和表达式","slug":"_2-2-使用criteria查询和表达式","link":"#_2-2-使用criteria查询和表达式","children":[]},{"level":3,"title":"3.1. 使用JPQL查询","slug":"_3-1-使用jpql查询","link":"#_3-1-使用jpql查询","children":[]},{"level":3,"title":"3.2. 使用JPQL原生查询","slug":"_3-2-使用jpql原生查询","link":"#_3-2-使用jpql原生查询","children":[]},{"level":2,"title":"4. HQL","slug":"_4-hql","link":"#_4-hql","children":[{"level":3,"title":"4.1. 使用Hibernate命名查询","slug":"_4-1-使用hibernate命名查询","link":"#_4-1-使用hibernate命名查询","children":[]},{"level":3,"title":"4.2. 存储过程和表达式","slug":"_4-2-存储过程和表达式","link":"#_4-2-存储过程和表达式","children":[]}]},{"level":2,"title":"5. Criteria查询相对于HQL和JPQL查询的优势","slug":"_5-criteria查询相对于hql和jpql查询的优势","link":"#_5-criteria查询相对于hql和jpql查询的优势","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721358907000,"updatedTime":1721358907000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.78,"words":1734},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-JPA and Hibernate   Criteria vs. JPQL vs. HQL Query.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将了解如何使用JPA和Hibernate查询，以及Criteria、JPQL和HQL查询之间的区别。Criteria查询允许用户在不使用原始SQL的情况下编写查询。除了Criteria查询，我们还将探讨编写Hibernate命名查询以及如何在Spring Data JPA中使用_Query_注解。</p>\\n<p>在我们深入之前，应该指出Hibernate Criteria API自Hibernate 5.2以来已被弃用。因此，<strong>我们将在示例中使用JPA Criteria API</strong>，因为它是编写Criteria查询的新的和首选工具。从这里开始，我们将简单地将其称为Criteria API。</p>","autoDesc":true}');export{d as comp,m as data};
