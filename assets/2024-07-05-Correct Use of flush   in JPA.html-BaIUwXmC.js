import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-on0L14Tx.js";const e={},p=t(`<h1 id="spring-jpa中flush-的正确使用" tabindex="-1"><a class="header-anchor" href="#spring-jpa中flush-的正确使用"><span>Spring JPA中flush()的正确使用</span></a></h1><p>在本教程中，我们将简要了解Spring JPA提供的_flush()_方法。</p><p>首先，我们将学习涉及的关键抽象概念，包括_实体管理器_和_flush模式_。接下来，我们将使用_Customer_和_CustomerAddress_实体设置一个示例。然后，我们将编写集成测试，以查看两个flush模式下_flush()_的工作原理。最后，我们将探讨使用显式_flush()_的一些关键好处以及一些考虑因素。</p><h2 id="_2-flush-是什么" tabindex="-1"><a class="header-anchor" href="#_2-flush-是什么"><span>2. flush()是什么？</span></a></h2><p>本质上_flush()_方法是JPA中_实体管理器_接口的一部分。_实体管理器_可以用来与JPA中的持久化上下文交互。它提供了管理实体生命周期、查询实体以及对数据库执行CRUD操作的方法。</p><p>_flush()_方法用于将持久化上下文中对实体所做的任何更改与底层数据库同步。当我们在_实体管理器_上调用_flush()_时，JPA提供程序反过来执行任何必要的SQL语句，以在数据库中持久化或更新实体。</p><p>在进一步探讨这种方法的正确使用之前，让我们先了解一下与_flush()_工作密切相关的一个概念，即JPA提供的不同的flush模式。</p><p>JPA中的flush模式决定了何时将持久化上下文中对实体所做的更改与数据库同步。JPA提供的两种主要flush模式是_AUTO_和_COMMIT_。</p><p>_AUTO_是默认的flush模式。这意味着对实体所做的更改在必要时会自动与数据库同步，例如在事务提交时，或者在执行需要最新数据的查询时。</p><p>另一方面，_COMMIT_模式将同步延迟到事务提交。这意味着对实体所做的更改在当前事务提交之前不会对其他事务可见。</p><h2 id="_3-示例设置" tabindex="-1"><a class="header-anchor" href="#_3-示例设置"><span>3. 示例设置</span></a></h2><p>让我们考虑两个实体的简单示例，<em>Customer_和_CustomerAddress</em>。<em>CustomerAddress_实体包含一个_long_类型的_customer_id</em>。让我们首先定义_Customer_实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Customer</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">AUTO</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们定义_Address_实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomerAddress</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> street<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> city<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> customer_id<span class="token punctuation">;</span>

    <span class="token comment">// ... getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>稍后，我们将使用这两个类来测试可能需要使用_flush()_的各种场景。</p><h3 id="_3-1-设置-实体管理器" tabindex="-1"><a class="header-anchor" href="#_3-1-设置-实体管理器"><span>3.1. 设置_实体管理器_</span></a></h3><p>在我们设置_实体管理器_之前，我们需要获得一个实现_实体管理器工厂_接口的类的实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">LocalContainerEntityManagerFactoryBean</span> <span class="token function">entityManagerFactory</span><span class="token punctuation">(</span><span class="token class-name">DataSource</span> dataSource<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">LocalContainerEntityManagerFactoryBean</span> emf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LocalContainerEntityManagerFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    emf<span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    emf<span class="token punctuation">.</span><span class="token function">setPackagesToScan</span><span class="token punctuation">(</span><span class="token string">&quot;com.baeldung.flush&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    emf<span class="token punctuation">.</span><span class="token function">setJpaVendorAdapter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">HibernateJpaVendorAdapter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    emf<span class="token punctuation">.</span><span class="token function">setJpaProperties</span><span class="token punctuation">(</span><span class="token function">getHibernateProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> emf<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了设置_实体管理器工厂_，我们需要提供数据源和JPA属性。</p><p>让我们使用H2嵌入式数据库作为我们的示例数据库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">dataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">EmbeddedDatabaseBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setType</span><span class="token punctuation">(</span><span class="token class-name">EmbeddedDatabaseType</span><span class="token punctuation">.</span><span class="token constant">H2</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们设置属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Properties</span> <span class="token function">getHibernateProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Properties</span> properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    properties<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;hibernate.hbm2ddl.auto&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;create&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    properties<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;hibernate.dialect&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;org.hibernate.dialect.H2Dialect&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> properties<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在后续部分，我们将使用这个_实体管理器工厂_来创建_实体管理器_的实例。我们将使用这个_实体管理器_来测试事务中使用和不使用_flush()_的各种场景。</p><h2 id="_4-使用-flushmodetype-commit" tabindex="-1"><a class="header-anchor" href="#_4-使用-flushmodetype-commit"><span>4. 使用_FlushModeType.COMMIT_</span></a></h2><p>让我们首先将_FlushModeType_设置为_COMMIT_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>entityManager<span class="token punctuation">.</span><span class="token function">setFlushMode</span><span class="token punctuation">(</span><span class="token class-name">FlushModeType</span><span class="token punctuation">.</span><span class="token constant">COMMIT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如我们一开始提到的，_FlushModeType.COMMIT_将数据库的刷新延迟到事务提交。这可以通过减少事务期间发送到数据库的SQL语句数量来提高性能，但如果其他事务修改了相同的数据，它也增加了数据不一致的风险。</p><p>为了理解在结合使用_EntityManager_类的_persist()_和_flush()_时需要_flush()_的必要性，让我们首先测试我们的_Customer_创建，并尝试在不调用_flush()<em>的情况下查询数据库中的新创建_Customer</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenANewCustomer_whenPersistAndNoFlush_thenDatabaseNotSynchronizedWithPersistentContextUsingCommitFlushMode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    entityManager<span class="token punctuation">.</span><span class="token function">setFlushMode</span><span class="token punctuation">(</span><span class="token class-name">FlushModeType</span><span class="token punctuation">.</span><span class="token constant">COMMIT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">EntityTransaction</span> transaction <span class="token operator">=</span> <span class="token function">getTransaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Customer</span> customer <span class="token operator">=</span> <span class="token function">saveCustomerInPersistentContext</span><span class="token punctuation">(</span><span class="token string">&quot;Alice&quot;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Customer</span> customerInContext <span class="token operator">=</span> entityManager<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token class-name">Customer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> customer<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertDataInPersitentContext</span><span class="token punctuation">(</span>customerInContext<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">TypedQuery</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Customer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` retrievedCustomer <span class="token operator">=</span> entityManager<span class="token punctuation">.</span><span class="token function">createQuery</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT c FROM Customer c WHERE c.name = &#39;Alice&#39;&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Customer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Customer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` resultList <span class="token operator">=</span> retrievedCustomer<span class="token punctuation">.</span><span class="token function">getResultList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>resultList<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    transaction<span class="token punctuation">.</span><span class="token function">rollback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基本上，这里我们使用之前配置的_EntityManager_类型的bean来获取_Transaction_的实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">EntityTransaction</span> <span class="token function">getTransaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">EntityTransaction</span> transaction <span class="token operator">=</span> entityManager<span class="token punctuation">.</span><span class="token function">getTransaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    transaction<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> transaction<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们创建_Customer_并使用_entityManager.persist(customer)_进行持久化：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Customer</span> <span class="token function">saveCustomerInPersistentContext</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Customer</span> customer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Customer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    customer<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    customer<span class="token punctuation">.</span><span class="token function">setAge</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
    entityManager<span class="token punctuation">.</span><span class="token function">persist</span><span class="token punctuation">(</span>customer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> customer<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们查询数据库以检索新创建的Customer对象。</p><p>我们发现查询结果转换为_List<code>&lt;Customer&gt;</code>_是一个空列表，这意味着由于事务尚未提交，持久化上下文与底层数据库尚未同步。</p><p>接下来，保持_FlushModeType_为_COMMIT_，让我们确保在调用实体管理器上的_persist()<em>之后调用_flush()</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenANewCustomer_whenPersistAndFlush_thenDatabaseSynchronizedWithPersistentContextUsingCommitFlushMode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    entityManager<span class="token punctuation">.</span><span class="token function">setFlushMode</span><span class="token punctuation">(</span><span class="token class-name">FlushModeType</span><span class="token punctuation">.</span><span class="token constant">COMMIT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">EntityTransaction</span> transaction <span class="token operator">=</span> <span class="token function">getTransaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Customer</span> customer <span class="token operator">=</span> <span class="token function">saveCustomerInPersistentContext</span><span class="token punctuation">(</span><span class="token string">&quot;Alice&quot;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    entityManager<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Long</span> generatedCustomerID <span class="token operator">=</span> customer<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Customer</span> customerInContext <span class="token operator">=</span> entityManager<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token class-name">Customer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> generatedCustomerID<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertDataInPersitentContext</span><span class="token punctuation">(</span>customerInContext<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">TypedQuery</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Customer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` retrievedCustomer <span class="token operator">=</span> entityManager<span class="token punctuation">.</span><span class="token function">createQuery</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT c FROM Customer c WHERE c.name = &#39;Alice&#39;&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Customer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Customer</span> result <span class="token operator">=</span> retrievedCustomer<span class="token punctuation">.</span><span class="token function">getSingleResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_CUSTOMER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    transaction<span class="token punctuation">.</span><span class="token function">rollback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以看到，通过在调用_persist()_之后添加对_flush()_的调用，数据库与持久化上下文中的事务同步。我们将查询数据库并得到结果，该结果等于新创建的客户实体。重要的是，即使_FlushModeType_是_COMMIT_并且事务本身尚未提交，新的_Customer_实体已经被保存在数据库中。</p><h3 id="_4-1-跨两个实体的查询" tabindex="-1"><a class="header-anchor" href="#_4-1-跨两个实体的查询"><span>4.1. 跨两个实体的查询</span></a></h3><p>现在，让我们扩展我们的简单示例，包括_CustomerAddress_实体。<strong>我们想要看到我们可能想要显式调用涉及跨数据库多表查询的_flush()_的潜在案例。</strong></p><p><em>CustomerAddress_包含一个名为_customer_id_的字段，该字段在创建客户实体后自动生成。我们可以看到，我们想要保存一个_Customer</em>，查询数据库以获取_id_，并使用自动生成的_id_在_CustomerAddress_实体中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenANewCustomer_whenPersistAndFlush_thenCustomerIdGeneratedToBeAddedInAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    entityManager<span class="token punctuation">.</span><span class="token function">setFlushMode</span><span class="token punctuation">(</span><span class="token class-name">FlushModeType</span><span class="token punctuation">.</span><span class="token constant">COMMIT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">EntityTransaction</span> transaction <span class="token operator">=</span> <span class="token function">getTransaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">saveCustomerInPersistentContext</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    entityManager<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Customer</span> retrievedCustomer <span class="token operator">=</span> entityManager<span class="token punctuation">.</span><span class="token function">createQuery</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT c FROM Customer c WHERE c.name = &#39;John&#39;&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Customer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">getSingleResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Long</span> customerId <span class="token operator">=</span> retrievedCustomer<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">CustomerAddress</span> address <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CustomerAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    address<span class="token punctuation">.</span><span class="token function">setCustomer_id</span><span class="token punctuation">(</span>customerId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    entityManager<span class="token punctuation">.</span><span class="token function">persist</span><span class="token punctuation">(</span>address<span class="token punctuation">)</span><span class="token punctuation">;</span>
    entityManager<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">CustomerAddress</span> customerAddress <span class="token operator">=</span> entityManager<span class="token punctuation">.</span><span class="token function">createQuery</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT a FROM CustomerAddress a WHERE a.customer_id = :customerID&quot;</span><span class="token punctuation">,</span> <span class="token class-name">CustomerAddress</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">setParameter</span><span class="token punctuation">(</span><span class="token string">&quot;customerID&quot;</span><span class="token punctuation">,</span> customerId<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">getSingleResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>customerAddress<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    transaction<span class="token punctuation">.</span><span class="token function">rollback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们简要谈谈与_flush()_方法相关的_rollback()_的使用。本质上，当我们调用_rollback()<em>时，事务中所做的任何更改都会被撤销。数据库恢复到事务开始之前的状态。在我们上面测试的所有场景中，我们都在最后调用了_rollback()</em>。这可以防止任何部分更改被提交到数据库，这可能导致数据不一致或损坏。</p><h2 id="_5-使用-flushmodetype-auto-的-flush" tabindex="-1"><a class="header-anchor" href="#_5-使用-flushmodetype-auto-的-flush"><span>5. 使用_FlushModeType.AUTO_的_flush()</span></a></h2><p>接下来，让我们看看当我们将_FlushModeType_设置</p>`,47),o=[p];function c(u,l){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-05-Correct Use of flush   in JPA.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Correct%20Use%20of%20flush%20%20%20in%20JPA.html","title":"Spring JPA中flush()的正确使用","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring JPA","flush()"],"tag":["flush()","JPA","EntityManager"],"head":[["meta",{"name":"description","content":"这篇教程详细解释了Spring JPA中flush()方法的正确使用方法，包括EntityManager和flush模式的基本概念，以及flush()在不同场景下如何工作。"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Correct%20Use%20of%20flush%20%20%20in%20JPA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring JPA中flush()的正确使用"}],["meta",{"property":"og:description","content":"Spring JPA中flush()的正确使用 在本教程中，我们将简要了解Spring JPA提供的_flush()_方法。 首先，我们将学习涉及的关键抽象概念，包括_实体管理器_和_flush模式_。接下来，我们将使用_Customer_和_CustomerAddress_实体设置一个示例。然后，我们将编写集成测试，以查看两个flush模式下_flu..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T04:40:16.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"flush()"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:tag","content":"EntityManager"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T04:40:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring JPA中flush()的正确使用\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T04:40:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring JPA中flush()的正确使用 在本教程中，我们将简要了解Spring JPA提供的_flush()_方法。 首先，我们将学习涉及的关键抽象概念，包括_实体管理器_和_flush模式_。接下来，我们将使用_Customer_和_CustomerAddress_实体设置一个示例。然后，我们将编写集成测试，以查看两个flush模式下_flu..."},"headers":[{"level":2,"title":"2. flush()是什么？","slug":"_2-flush-是什么","link":"#_2-flush-是什么","children":[]},{"level":2,"title":"3. 示例设置","slug":"_3-示例设置","link":"#_3-示例设置","children":[{"level":3,"title":"3.1. 设置_实体管理器_","slug":"_3-1-设置-实体管理器","link":"#_3-1-设置-实体管理器","children":[]}]},{"level":2,"title":"4. 使用_FlushModeType.COMMIT_","slug":"_4-使用-flushmodetype-commit","link":"#_4-使用-flushmodetype-commit","children":[{"level":3,"title":"4.1. 跨两个实体的查询","slug":"_4-1-跨两个实体的查询","link":"#_4-1-跨两个实体的查询","children":[]}]},{"level":2,"title":"5. 使用_FlushModeType.AUTO_的_flush()","slug":"_5-使用-flushmodetype-auto-的-flush","link":"#_5-使用-flushmodetype-auto-的-flush","children":[]}],"git":{"createdTime":1720154416000,"updatedTime":1720154416000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.87,"words":1760},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Correct Use of flush   in JPA.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将简要了解Spring JPA提供的_flush()_方法。</p>\\n<p>首先，我们将学习涉及的关键抽象概念，包括_实体管理器_和_flush模式_。接下来，我们将使用_Customer_和_CustomerAddress_实体设置一个示例。然后，我们将编写集成测试，以查看两个flush模式下_flush()_的工作原理。最后，我们将探讨使用显式_flush()_的一些关键好处以及一些考虑因素。</p>\\n<h2>2. flush()是什么？</h2>\\n<p>本质上_flush()_方法是JPA中_实体管理器_接口的一部分。_实体管理器_可以用来与JPA中的持久化上下文交互。它提供了管理实体生命周期、查询实体以及对数据库执行CRUD操作的方法。</p>","autoDesc":true}');export{d as comp,k as data};
