import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-BMOUrRO4.js";const t={},p=e(`<h1 id="理解jpa-hibernate关联" tabindex="-1"><a class="header-anchor" href="#理解jpa-hibernate关联"><span>理解JPA/Hibernate关联</span></a></h1><p>Java持久化API（JPA）是Java应用程序的对象关系映射（ORM）规范。进一步来说，Hibernate是JPA规范的流行实现之一。</p><p>关联是ORM中的一个基本概念，允许我们定义实体之间的关系。在本教程中，我们将讨论JPA/Hibernate中单向和双向关联之间的区别。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>单向关联通常用于面向对象编程，以建立实体之间的关系。然而，重要的是要注意，在单向关联中，只有一个实体持有对另一个实体的引用。</p><p>要在Java中定义单向关联，我们可以使用诸如@ManyToOne、@OneToMany、@OneToOne和@ManyToMany等注解。通过使用这些注解，我们可以在代码中创建两个实体之间清晰且明确定义的关系。</p><h2 id="_2-单向关联" tabindex="-1"><a class="header-anchor" href="#_2-单向关联"><span>2. 单向关联</span></a></h2><h3 id="_2-1-一对多关系" tabindex="-1"><a class="header-anchor" href="#_2-1-一对多关系"><span>2.1. 一对多关系</span></a></h3><p>在一对多关系中，一个实体对另一个实体的一个或多个实例有引用。</p><p>一个常见的例子是部门（Department）与其员工（Employee）之间的关系。每个部门有多个员工，但每个员工只属于一个部门。</p><p>让我们看看如何定义一对多单向关联：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Department</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@OneToMany</span>
    <span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;department_id&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>\`\` employees<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，部门实体有一个对员工实体列表的引用。@OneToMany注解指定这是一个一对多关联。@JoinColumn注解指定了员工表中引用部门表的外键列。</p><h3 id="_2-2-多对一关系" tabindex="-1"><a class="header-anchor" href="#_2-2-多对一关系"><span>2.2. 多对一关系</span></a></h3><p>在多对一关系中，一个实体的多个实例与另一个实体的一个实例相关联。</p><p>例如，考虑学生（Student）和学校（School）。每个学生只能在一个学校注册，但每个学校可以有多个学生。</p><p>让我们看看如何定义多对一单向关联：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@ManyToOne</span>
    <span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;school_id&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">School</span> school<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">School</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们有一个学生和学校实体之间的多对一单向关联。@ManyToOne注解指定每个学生只能在一个学校注册，而@JoinColumn注解指定了连接学生和学校实体的外键列名称。</p><h3 id="_2-3-一对一关系" tabindex="-1"><a class="header-anchor" href="#_2-3-一对一关系"><span>2.3. 一对一关系</span></a></h3><p>在一对一关系中，一个实体的实例只与另一个实体的一个实例相关联。</p><p>一个常见的例子是员工（Employee）和停车位（ParkingSpot）。每个员工都有一个停车位，每个停车位属于一个员工。</p><p>让我们看看如何定义一对一单向关联：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@OneToOne</span>
    <span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;parking_spot_id&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">ParkingSpot</span> parkingSpot<span class="token punctuation">;</span>

<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ParkingSpot</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，员工实体有一个对停车位实体的引用。@OneToOne注解指定这是一个一对一关联。@JoinColumn注解指定了员工表中引用停车位表的外键列。</p><h3 id="_2-4-多对多关系" tabindex="-1"><a class="header-anchor" href="#_2-4-多对多关系"><span>2.4. 多对多关系</span></a></h3><p>在多对多关系中，一个实体的多个实例与另一个实体的多个实例相关联。</p><p>假设我们有两个实体——书籍（Book）和作者（Author）。每本书可以有多个作者，每个作者可以写多本书。在JPA中，这种关系使用@ManyToMany注解来表示。</p><p>让我们看看如何定义多对多单向关联：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@ManyToMany</span>
    <span class="token annotation punctuation">@JoinTable</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;book_author&quot;</span><span class="token punctuation">,</span>
            joinColumns <span class="token operator">=</span> <span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;book_id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            inverseJoinColumns <span class="token operator">=</span> <span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;author_id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Set</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Author</span><span class="token punctuation">&gt;</span></span>\` authors<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Author</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以看到书籍和作者实体之间的多对多单向关联。@ManyToMany注解指定每本书可以有多个作者，每个作者可以写多本书。@JoinTable注解指定了连接书籍和作者实体的连接表的名称和外键列。</p><h2 id="_3-双向关联" tabindex="-1"><a class="header-anchor" href="#_3-双向关联"><span>3. 双向关联</span></a></h2><p>双向关联是两个实体之间的关系，每个实体都有对另一个实体的引用。</p><p>为了定义双向关联，我们在@OneToMany和@ManyToMany注解中使用mappedBy属性。然而，重要的是要注意，仅依赖单向关联可能不够，因为双向关联提供了额外的好处。</p><h3 id="_3-1-一对多双向关联" tabindex="-1"><a class="header-anchor" href="#_3-1-一对多双向关联"><span>3.1. 一对多双向关联</span></a></h3><p>在一对多双向关联中，一个实体对另一个实体有引用。此外，另一个实体有一个对第一个实体的引用集合。</p><p>例如，部门实体有一个员工实体的集合。同时，员工实体有一个对它所属部门的引用。</p><p>让我们看看如何创建一对多双向关联：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Department</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@OneToMany</span><span class="token punctuation">(</span>mappedBy <span class="token operator">=</span> <span class="token string">&quot;department&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>\`\` employees<span class="token punctuation">;</span>

<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@ManyToOne</span>
    <span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;department_id&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Department</span> department<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在部门实体中，我们使用@OneToMany注解来指定部门实体和员工实体之间的关系。mappedBy属性指定了员工实体中拥有关系的属性的名称。在这种情况下，部门实体不拥有关系，因此我们指定mappedBy = &quot;department&quot;。</p><p>在员工实体中，我们使用@ManyToOne注解来指定员工实体和部门实体之间的关系。@JoinColumn注解指定了员工表中引用部门表的外键列名称。</p><h3 id="_3-2-多对多双向关联" tabindex="-1"><a class="header-anchor" href="#_3-2-多对多双向关联"><span>3.2. 多对多双向关联</span></a></h3><p>处理多对多双向关联时，重要的是要理解涉及的每个实体都将拥有对另一个实体的引用集合。</p><p>为了说明这个概念，让我们考虑一个学生实体，它有一个课程实体的集合，而课程实体反过来也有一个学生实体的集合。通过建立这样的双向关联，我们使两个实体都能意识到彼此，并使它们的关系更容易导航和管理。</p><p>以下是一个如何创建多对多双向关联的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@ManyToMany</span><span class="token punctuation">(</span>mappedBy <span class="token operator">=</span> <span class="token string">&quot;students&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Course</span><span class="token punctuation">&gt;</span></span>\` courses<span class="token punctuation">;</span>

<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Course</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@ManyToMany</span>
    <span class="token annotation punctuation">@JoinTable</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;course_student&quot;</span><span class="token punctuation">,</span>
        joinColumns <span class="token operator">=</span> <span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;course_id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        inverseJoinColumns <span class="token operator">=</span> <span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;student_id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">&gt;</span></span>\` students<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在学生实体中，我们使用@ManyToMany注解来指定学生实体和课程实体之间的关系。mappedBy属性指定了课程实体中拥有关系的属性的名称。在这种情况下，课程实体拥有关系，因此我们指定mappedBy = &quot;students&quot;。</p><p>在课程实体中，我们使用@ManyToMany注解来指定课程实体和学生实体之间的关系。@JoinTable注解指定了存储关系的连接表的名称。</p><h2 id="_4-单向与双向关联" tabindex="-1"><a class="header-anchor" href="#_4-单向与双向关联"><span>4. 单向与双向关联</span></a></h2><p>面向对象编程中的单向和双向关联在两个类之间的关系方向上有所不同。</p><p>首先，单向关联只在一个方向上有关系，而双向关联在两个方向上都有关系。这种差异可以影响软件系统的设计和功能。例如，双向关联可以使在相关类之间导航更容易，但它们也可能引入更多的复杂性和潜在的错误。</p><p>另一方面，单向关联可能更简单，不太可能出错，但它们可能需要更多的变通方法来在相关类之间导航。</p><p>总的来说，理解单向和双向关联之间的区别对于做出关于软件系统设计和实施的明智决策至关重要。</p><p>以下是一张表格，总结了数据库中单向和双向关联的区别：</p><table><thead><tr><th></th><th>单向关联</th><th>双向关联</th></tr></thead><tbody><tr><td>定义</td><td>两个表之间的关系，其中一个表有一个引用另一个表主键的外键。</td><td>两个表之间的关系，两个表都有引用另一个表主键的外键。</td></tr><tr><td>导航</td><td>只能在一个方向上导航——从子表到父表。</td><td>可以在两个方向上导航——从一个表到另一个表。</td></tr><tr><td>性能</td><td>由于表结构更简单，约束更少，通常更快。</td><td>由于额外的约束和表结构的复杂性，通常较慢。</td></tr><tr><td>数据一致性</td><td>通过子表中的外键约束来确保，引用父表中的主键。</td><td>通过子表中的外键约束来确保，引用父表中的主键。</td></tr><tr><td>灵活性</td><td>由于子表中的变更可能需要对父表架构进行更改，因此灵活性较低。</td><td>由于两个表中的任何一个都可以独立更改而不影响另一个，因此更加灵活。</td></tr></tbody></table><p><strong>值得注意的是，实现的具体细节可能会根据所使用的数据库管理系统而变化</strong>。然而，为了提供一般性的理解，上表概述了单向和双向关联之间的区别。</p><p>重要的是要认识到这些变化，因为它们可能对数据库系统的性能和功能产生重大影响。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们看到了选择单向或双向关联取决于软件的具体</p>`,59),i=[p];function o(l,c){return s(),a("div",null,i)}const r=n(t,[["render",o],["__file","2024-07-04-Understanding JPA Hibernate Associations.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Understanding%20JPA%20Hibernate%20Associations.html","title":"理解JPA/Hibernate关联","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["JPA","Hibernate"],"tag":["ORM","Associations"],"head":[["meta",{"name":"keywords","content":"JPA, Hibernate, ORM, Associations, Java, Database, Relationships"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Understanding%20JPA%20Hibernate%20Associations.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"理解JPA/Hibernate关联"}],["meta",{"property":"og:description","content":"理解JPA/Hibernate关联 Java持久化API（JPA）是Java应用程序的对象关系映射（ORM）规范。进一步来说，Hibernate是JPA规范的流行实现之一。 关联是ORM中的一个基本概念，允许我们定义实体之间的关系。在本教程中，我们将讨论JPA/Hibernate中单向和双向关联之间的区别。 1. 概述 单向关联通常用于面向对象编程，以..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T20:33:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ORM"}],["meta",{"property":"article:tag","content":"Associations"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T20:33:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"理解JPA/Hibernate关联\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T20:33:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"理解JPA/Hibernate关联 Java持久化API（JPA）是Java应用程序的对象关系映射（ORM）规范。进一步来说，Hibernate是JPA规范的流行实现之一。 关联是ORM中的一个基本概念，允许我们定义实体之间的关系。在本教程中，我们将讨论JPA/Hibernate中单向和双向关联之间的区别。 1. 概述 单向关联通常用于面向对象编程，以..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 单向关联","slug":"_2-单向关联","link":"#_2-单向关联","children":[{"level":3,"title":"2.1. 一对多关系","slug":"_2-1-一对多关系","link":"#_2-1-一对多关系","children":[]},{"level":3,"title":"2.2. 多对一关系","slug":"_2-2-多对一关系","link":"#_2-2-多对一关系","children":[]},{"level":3,"title":"2.3. 一对一关系","slug":"_2-3-一对一关系","link":"#_2-3-一对一关系","children":[]},{"level":3,"title":"2.4. 多对多关系","slug":"_2-4-多对多关系","link":"#_2-4-多对多关系","children":[]}]},{"level":2,"title":"3. 双向关联","slug":"_3-双向关联","link":"#_3-双向关联","children":[{"level":3,"title":"3.1. 一对多双向关联","slug":"_3-1-一对多双向关联","link":"#_3-1-一对多双向关联","children":[]},{"level":3,"title":"3.2. 多对多双向关联","slug":"_3-2-多对多双向关联","link":"#_3-2-多对多双向关联","children":[]}]},{"level":2,"title":"4. 单向与双向关联","slug":"_4-单向与双向关联","link":"#_4-单向与双向关联","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720125219000,"updatedTime":1720125219000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.48,"words":2244},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Understanding JPA Hibernate Associations.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Java持久化API（JPA）是Java应用程序的对象关系映射（ORM）规范。进一步来说，Hibernate是JPA规范的流行实现之一。</p>\\n<p>关联是ORM中的一个基本概念，允许我们定义实体之间的关系。在本教程中，我们将讨论JPA/Hibernate中单向和双向关联之间的区别。</p>\\n<h2>1. 概述</h2>\\n<p>单向关联通常用于面向对象编程，以建立实体之间的关系。然而，重要的是要注意，在单向关联中，只有一个实体持有对另一个实体的引用。</p>\\n<p>要在Java中定义单向关联，我们可以使用诸如@ManyToOne、@OneToMany、@OneToOne和@ManyToMany等注解。通过使用这些注解，我们可以在代码中创建两个实体之间清晰且明确定义的关系。</p>","autoDesc":true}');export{r as comp,k as data};
