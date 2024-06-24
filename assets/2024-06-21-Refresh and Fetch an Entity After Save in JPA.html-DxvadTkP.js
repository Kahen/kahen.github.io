import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as i}from"./app-By-_aiNB.js";const r={},n=i(`<h1 id="在jpa中保存后刷新和获取实体" tabindex="-1"><a class="header-anchor" href="#在jpa中保存后刷新和获取实体"><span>在JPA中保存后刷新和获取实体</span></a></h1><p>Java持久化API（JPA）充当Java对象和关系数据库之间的桥梁，允许我们无缝地持久化和检索数据。在本教程中，我们将探讨在JPA中保存操作后有效地刷新和获取实体的各种策略和技术。### 2. Spring Data JPA中的实体管理理解</p><p>在Spring Data JPA中，实体管理围绕<code>JpaRepository</code>接口展开，它是与数据库交互的主要机制。通过扩展<code>CrudRepository</code>的<code>JpaRepository</code>接口，Spring Data JPA提供了一套强大的方法用于实体的持久化、检索、更新和删除。</p><p>此外，<strong>Spring容器会自动将_entityManager_注入到这些仓库接口中</strong>。这个组件是Spring Data JPA中JPA基础设施的一个不可分割的部分，它促进了与底层持久化上下文的交互以及执行JPA查询。</p><h4 id="_2-1-持久化上下文" tabindex="-1"><a class="header-anchor" href="#_2-1-持久化上下文"><span>2.1. 持久化上下文</span></a></h4><p>JPA中的一个关键组件是持久化上下文。想象这个上下文作为一个临时的存储区域，JPA在这里管理检索或创建的实体的状态。</p><p>它确保：</p><ul><li>实体是唯一的：在任何给定时间，具有特定主键的实体在上下文中只存在一个实例。</li><li>跟踪更改：_EntityManager_跟踪在上下文中对实体属性所做的任何修改。</li><li>维护数据一致性：_EntityManager_在事务期间将上下文中所做的更改与底层数据库同步。</li></ul><h4 id="_2-2-jpa实体的生命周期" tabindex="-1"><a class="header-anchor" href="#_2-2-jpa实体的生命周期"><span>2.2. JPA实体的生命周期</span></a></h4><p>JPA实体有四个不同的生命周期阶段：新、托管、已删除和分离。</p><p>当我们使用实体的构造函数创建一个新的实体实例时，它处于“新”状态。我们可以通过检查实体的ID（主键）是否为空来验证这一点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Order order = new Order();
if (order.getId() == null) {
    // 实体处于“新”状态
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用仓库的<code>save()</code>方法持久化实体后，它转变为“托管”状态。我们可以通过检查保存的实体是否存在于仓库中来验证这一点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Order savedOrder = repository.save(order);
if (repository.findById(savedOrder.getId()).isPresent()) {
    // 实体处于“托管”状态
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们在托管实体上调用仓库的<code>delete()</code>方法时，它转变为“已删除”状态。我们可以通过检查删除后实体是否不再存在于数据库中来验证这一点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>repository.delete(savedOrder);
if (!repository.findById(savedOrder.getId()).isPresent()) {
    // 实体处于“已删除”状态
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，一旦使用仓库的<code>detach()</code>方法分离实体，实体就不再与持久化上下文关联。**对分离实体所做的更改将不会反映在数据库中，除非显式地合并回托管状态。**我们可以通过在分离后尝试修改实体来验证这一点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>repository.detach(savedOrder);
// 修改实体
savedOrder.setName(&quot;New Order Name&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们对分离的实体调用<code>save()</code>，它将重新将实体附加到持久化上下文，并且在刷新持久化上下文时将更改持久化到数据库。</p><h2 id="_3-使用spring-data-jpa保存实体" tabindex="-1"><a class="header-anchor" href="#_3-使用spring-data-jpa保存实体"><span>3. 使用Spring Data JPA保存实体</span></a></h2><p>当我们调用<code>save()</code>时，Spring Data JPA在事务提交时计划将实体插入数据库。它将实体添加到持久化上下文中，并将其标记为托管。</p><p>这是一个简单的代码片段，演示了如何在Spring Data JPA中使用<code>save()</code>方法持久化实体：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Order order = new Order();
order.setName(&quot;New Order Name&quot;);

repository.save(order);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，<strong>需要注意的是，调用<code>save()</code>并不会立即触发数据库插入操作</strong>。相反，它只是将实体转变为持久化上下文中的托管状态。因此，如果其他事务在我们事务提交之前从数据库中读取数据，它们可能会检索到我们尚未提交的更改之前的过时数据。</p><p>为确保数据保持最新，我们可以采用两种方法：获取和刷新。</p><h2 id="_4-spring-data-jpa中获取实体" tabindex="-1"><a class="header-anchor" href="#_4-spring-data-jpa中获取实体"><span>4. Spring Data JPA中获取实体</span></a></h2><p>当我们获取实体时，我们不会丢弃在持久化上下文中对它所做的任何修改。相反，<strong>我们只是从数据库中检索实体的数据，并将其添加到持久化上下文中以进行进一步处理</strong>。</p><h3 id="_4-1-使用findbyid" tabindex="-1"><a class="header-anchor" href="#_4-1-使用findbyid"><span>4.1. 使用<code>findById()</code></span></a></h3><p>Spring Data JPA仓库提供了如<code>findById()</code>这样方便的方法来检索实体。<strong>这些方法总是从数据库中获取最新的数据，不管实体在持久化上下文中的状态如何</strong>。这种方法简化了实体检索，并消除了直接管理持久化上下文的需要。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Order order = repository.findById(1L).get();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-2-急切与延迟获取" tabindex="-1"><a class="header-anchor" href="#_4-2-急切与延迟获取"><span>4.2. 急切与延迟获取</span></a></h3><p>**在急切获取中，所有与主实体相关联的实体都会在检索主实体的同时从数据库中检索出来。**通过在<code>orderItems</code>集合上设置<code>fetch = FetchType.EAGER</code>，我们指示JPA在检索<code>Order</code>时急切地获取所有相关的<code>OrderItem</code>实体：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Entity
public class Order {
    @Id
    private Long id;

    @OneToMany(mappedBy = &quot;order&quot;, fetch = FetchType.EAGER)
    private List\`\`\`&lt;OrderItem&gt;\`\`\` orderItems;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这意味着在<code>findById()</code>调用之后，我们可以直接在<code>order</code>对象内访问<code>orderItems</code>列表，并遍历相关的<code>OrderItem</code>实体，而不需要任何额外的数据库查询：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Order order = repository.findById(1L).get();

// 在获取Order后直接访问OrderItems
if (order != null) {
    for (OrderItem item : order.getOrderItems()) {
        System.out.println(&quot;Order Item: &quot; + item.getName() + &quot;, Quantity: &quot; + item.getQuantity());
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一方面，通过设置<code>fetch = FetchType.LAZY</code>，相关实体将不会被从数据库中检索，直到它们在代码中被显式访问：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Entity
public class Order {
    @Id
    private Long id;

    @OneToMany(mappedBy = &quot;order&quot;, fetch = FetchType.LAZY)
    private List\`\`\`&lt;OrderItem&gt;\`\`\` orderItems;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**当我们调用<code>order.getOrderItems()</code>时，将执行一个单独的数据库查询来获取该订单的相关<code>OrderItem</code>实体。**这个额外的查询仅因为我们显式访问了<code>orderItems</code>列表而被触发：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Order order = repository.findById(1L).get();

if (order != null) {
    List\`\`\`&lt;OrderItem&gt;\`\`\` items = order.getOrderItems(); // 这触发了一个单独的查询来获取OrderItems
    for (OrderItem item : items) {
        System.out.println(&quot;Order Item: &quot; + item.getName() + &quot;, Quantity: &quot; + item.getQuantity());
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-使用jpql获取" tabindex="-1"><a class="header-anchor" href="#_4-3-使用jpql获取"><span>4.3. 使用JPQL获取</span></a></h3><p>**Java持久化查询语言（JPQL）允许我们编写针对实体而不是表的类似SQL的查询。**它提供了根据各种标准检索特定数据或实体的灵活性。</p><p>让我们看一个根据客户名称和订单日期范围获取订单的示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Query(&quot;SELECT o FROM Order o WHERE o.customerName = :customerName AND &quot;
  + &quot;o.orderDate BETWEEN :startDate AND :endDate&quot;)
List\`\`\`&lt;Order&gt;\`\`\` findOrdersByCustomerAndDateRange(@Param(&quot;customerName&quot;) String customerName,
  @Param(&quot;startDate&quot;) LocalDate startDate, @Param(&quot;endDate&quot;) LocalDate endDate);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-使用criteria-api获取" tabindex="-1"><a class="header-anchor" href="#_4-4-使用criteria-api获取"><span>4.4. 使用Criteria API获取</span></a></h3><p>Spring Data JPA中的Criteria API提供了一种可靠和灵活的方法来动态创建查询。<strong>它允许我们使用方法链和标准表达式安全地构建复杂查询，确保我们的查询在编译时无误。</strong></p><p>让我们考虑一个使用Criteria API根据客户名称和订单日期范围的组合标准获取订单的示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
CriteriaQuery\`\`\`&lt;Order&gt;\`\`\` criteriaQuery = criteriaBuilder.createQuery(Order.class);
Root\`\`\`&lt;Order&gt;\`\`\` root = criteriaQuery.from(Order.class);

Predicate customerPredicate = criteriaBuilder.equal(root.get(&quot;customerName&quot;), customerName);
Predicate dateRangePredicate = criteriaBuilder.between(root.get(&quot;orderDate&quot;), startDate, endDate);

criteriaQuery.where(customerPredicate, dateRangePredicate);

return entityManager.createQuery(criteriaQuery).getResultList();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用spring-data-jpa刷新实体" tabindex="-1"><a class="header-anchor" href="#_5-使用spring-data-jpa刷新实体"><span>5. 使用Spring Data JPA刷新实体</span></a></h2><p>在JPA中刷新实体确保应用程序中内存中的实体表示与数据库中存储的最新数据保持同步。**当其他事务修改或更新实体时，持久化上下文中的数据可能会变得过时。**刷新实体允许我们从数据库中检索最近的数据，防止不一致并保持数据准确性。</p><h3 id="_5-1-使用refresh-方法" tabindex="-1"><a class="header-anchor" href="#_5-1-使用refresh-方法"><span>5.1. 使用<code>refresh()</code>方法</span></a></h3><p>在JPA中，我们使用<code>EntityManager</code>提供的<code>refresh()</code>方法来刷新实体。**在托管实体上调用<code>refresh()</code>会丢弃在持久化上下文中对该实体所做的任何修改。**它从数据库重新加载实体的状态，有效地替换了自实体上次与数据库同步以来所做的任何修改。</p><p>但需要注意的是，Spring Data JPA仓库没有提供内置的<code>refresh()</code>方法。</p><p>以下是使用<code>EntityManager</code>刷新实体的方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Autowired
private EntityManager entityManager;

entityManager.refresh(order);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-处理optimisticlockexception" tabindex="-1"><a class="header-anchor" href="#_5-2-处理optimisticlockexception"><span>5.2. 处理<code>OptimisticLockException</code></span></a></h3><p>**Spring Data JPA中的<code>@Version</code>注解用于实现乐观锁。**它有助于确保当多个事务可能同时尝试更新同一个实体时的数据一致性。当我们使用<code>@Version</code>时，JPA会自动在我们的实体类上创建一个特殊字段（通常命名为<code>version</code>）。</p><p>这个字段存储了一个整数值，表示数据库中实体的版本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Entity
public class Order {
    @Id
    @GeneratedValue
    private Long id;

    @Version
    private Long version;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们从数据库中检索实体时，JPA积极获取其版本。**在更新实体时</p>`,59),d=[n];function s(l,c){return a(),t("div",null,d)}const v=e(r,[["render",s],["__file","2024-06-21-Refresh and Fetch an Entity After Save in JPA.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-21-Refresh%20and%20Fetch%20an%20Entity%20After%20Save%20in%20JPA.html","title":"在JPA中保存后刷新和获取实体","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Spring Data JPA","JPA"],"tag":["Refresh","Fetch","Entity Management"],"head":[["meta",{"name":"keywords","content":"Spring Data JPA, JPA, Refresh, Fetch, Entity Management"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-21-Refresh%20and%20Fetch%20an%20Entity%20After%20Save%20in%20JPA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在JPA中保存后刷新和获取实体"}],["meta",{"property":"og:description","content":"在JPA中保存后刷新和获取实体 Java持久化API（JPA）充当Java对象和关系数据库之间的桥梁，允许我们无缝地持久化和检索数据。在本教程中，我们将探讨在JPA中保存操作后有效地刷新和获取实体的各种策略和技术。### 2. Spring Data JPA中的实体管理理解 在Spring Data JPA中，实体管理围绕JpaRepository接口..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Refresh"}],["meta",{"property":"article:tag","content":"Fetch"}],["meta",{"property":"article:tag","content":"Entity Management"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在JPA中保存后刷新和获取实体\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在JPA中保存后刷新和获取实体 Java持久化API（JPA）充当Java对象和关系数据库之间的桥梁，允许我们无缝地持久化和检索数据。在本教程中，我们将探讨在JPA中保存操作后有效地刷新和获取实体的各种策略和技术。### 2. Spring Data JPA中的实体管理理解 在Spring Data JPA中，实体管理围绕JpaRepository接口..."},"headers":[{"level":2,"title":"3. 使用Spring Data JPA保存实体","slug":"_3-使用spring-data-jpa保存实体","link":"#_3-使用spring-data-jpa保存实体","children":[]},{"level":2,"title":"4. Spring Data JPA中获取实体","slug":"_4-spring-data-jpa中获取实体","link":"#_4-spring-data-jpa中获取实体","children":[{"level":3,"title":"4.1. 使用findById()","slug":"_4-1-使用findbyid","link":"#_4-1-使用findbyid","children":[]},{"level":3,"title":"4.2. 急切与延迟获取","slug":"_4-2-急切与延迟获取","link":"#_4-2-急切与延迟获取","children":[]},{"level":3,"title":"4.3. 使用JPQL获取","slug":"_4-3-使用jpql获取","link":"#_4-3-使用jpql获取","children":[]},{"level":3,"title":"4.4. 使用Criteria API获取","slug":"_4-4-使用criteria-api获取","link":"#_4-4-使用criteria-api获取","children":[]}]},{"level":2,"title":"5. 使用Spring Data JPA刷新实体","slug":"_5-使用spring-data-jpa刷新实体","link":"#_5-使用spring-data-jpa刷新实体","children":[{"level":3,"title":"5.1. 使用refresh()方法","slug":"_5-1-使用refresh-方法","link":"#_5-1-使用refresh-方法","children":[]},{"level":3,"title":"5.2. 处理OptimisticLockException","slug":"_5-2-处理optimisticlockexception","link":"#_5-2-处理optimisticlockexception","children":[]}]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":7.21,"words":2162},"filePathRelative":"posts/baeldung/Archive/2024-06-21-Refresh and Fetch an Entity After Save in JPA.md","localizedDate":"2024年6月21日","excerpt":"\\n<p>Java持久化API（JPA）充当Java对象和关系数据库之间的桥梁，允许我们无缝地持久化和检索数据。在本教程中，我们将探讨在JPA中保存操作后有效地刷新和获取实体的各种策略和技术。### 2. Spring Data JPA中的实体管理理解</p>\\n<p>在Spring Data JPA中，实体管理围绕<code>JpaRepository</code>接口展开，它是与数据库交互的主要机制。通过扩展<code>CrudRepository</code>的<code>JpaRepository</code>接口，Spring Data JPA提供了一套强大的方法用于实体的持久化、检索、更新和删除。</p>","autoDesc":true}');export{v as comp,u as data};
