import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CM1q4_9A.js";const e={},p=t(`<h1 id="持久化上下文与持久化单元-baeldung" tabindex="-1"><a class="header-anchor" href="#持久化上下文与持久化单元-baeldung"><span>持久化上下文与持久化单元 | Baeldung</span></a></h1><p>持久化上下文和持久化单元是JPA中用于管理应用程序中实体生命周期的两个重要概念。</p><p>在本教程中，我们将简要介绍实体管理器和实体管理器工厂。接下来，我们将看到持久化上下文的重要性及其用例。最后，我们将看到持久化单元的作用及其用例。</p><h3 id="实体管理器和实体管理器工厂" tabindex="-1"><a class="header-anchor" href="#实体管理器和实体管理器工厂"><span>实体管理器和实体管理器工厂</span></a></h3><p>在深入细节之前，有必要基本了解实体管理器和实体管理器工厂接口。正如我们将看到的，它们在管理持久性、实体和数据库交互中扮演着重要角色。</p><h4 id="实体管理器" tabindex="-1"><a class="header-anchor" href="#实体管理器"><span>实体管理器</span></a></h4><p>实体管理器是一个与持久化上下文交互的接口。它对实体执行CRUD操作，跟踪变更，并确保在事务提交时与数据库同步。实体管理器代表一个持久化上下文，并在事务的作用域内操作。</p><h4 id="实体管理器工厂" tabindex="-1"><a class="header-anchor" href="#实体管理器工厂"><span>实体管理器工厂</span></a></h4><p>实体管理器工厂是一个创建实体管理器的接口，实际上充当工厂的角色。创建后，实体管理器工厂与特定的持久化单元关联，从而能够创建实体管理器的实例。</p><p>持久化上下文是一个短暂存在、事务作用域内的上下文，用于管理实体的生命周期。它代表一组存储在内存中作为实体管理器一级缓存的托管实体。如果事务开始，持久化上下文被创建，并在事务提交或回滚时最终被关闭或清除。</p><p>持久化上下文自动检测对托管实体所做的更改，并确保所有实体更改与持久性存储同步。</p><p>我们可以使用@PersistenceContext注解定义持久化上下文的类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PersistenceContext</span>
<span class="token keyword">private</span> <span class="token class-name">EntityManager</span> entityManager<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>JPA中有两类持久化上下文：TRANSACTION和EXTENDED。</p><p>让我们首先使用@Entity注解创建与PRODUCT表对应的实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;PRODUCT&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">double</span> price<span class="token punctuation">;</span>

    <span class="token comment">// 标准构造函数，getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们创建我们的服务类PersistenceContextProductService：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PersistenceContextProductService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@PersistenceContext</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">PersistenceContextType</span><span class="token punctuation">.</span><span class="token constant">TRANSACTION</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">EntityManager</span> entityManagerTransactionType<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@PersistenceContext</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">PersistenceContextType</span><span class="token punctuation">.</span><span class="token constant">EXTENDED</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">EntityManager</span> entityManagerExtendedType<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Transactional</span>
    <span class="token keyword">void</span> <span class="token function">insertProductWithTransactionTypePersistenceContext</span><span class="token punctuation">(</span><span class="token class-name">Product</span> product<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        entityManagerTransactionType<span class="token punctuation">.</span><span class="token function">persist</span><span class="token punctuation">(</span>product<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">Product</span> <span class="token function">findWithTransactionTypePersistenceContext</span><span class="token punctuation">(</span><span class="token keyword">long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> entityManagerTransactionType<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token class-name">Product</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">insertProductWithExtendedTypePersistenceContext</span><span class="token punctuation">(</span><span class="token class-name">Product</span> product<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        entityManagerExtendedType<span class="token punctuation">.</span><span class="token function">persist</span><span class="token punctuation">(</span>product<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">Product</span> <span class="token function">findWithExtendedTypePersistenceContext</span><span class="token punctuation">(</span><span class="token keyword">long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> entityManagerExtendedType<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token class-name">Product</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="事务作用域的持久化上下文" tabindex="-1"><a class="header-anchor" href="#事务作用域的持久化上下文"><span>事务作用域的持久化上下文</span></a></h3><p>TRANSACTION类型的持久化上下文是JPA中的默认持久化上下文类型。在此类型中，持久化上下文绑定到事务。这意味着每个事务创建和销毁持久化上下文。</p><p>让我们使用TRANSACTION类型的持久化上下文持久化产品。我们将保存Product实体，更改将在事务提交时自动持久化：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenProductPersistWithTransactionPersistenceContext_thenShouldPersist</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Product</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> <span class="token string">&quot;Product 1&quot;</span><span class="token punctuation">,</span> <span class="token number">100.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    persistenceContextProductService<span class="token punctuation">.</span><span class="token function">insertProductWithTransactionTypePersistenceContext</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Product</span> productFromTransactionScoped <span class="token operator">=</span> persistenceContextProductService<span class="token punctuation">.</span><span class="token function">findWithTransactionTypePersistenceContext</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertNotNull</span><span class="token punctuation">(</span>productFromTransactionScoped<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Product</span> productFromExtendedScoped <span class="token operator">=</span> persistenceContextProductService<span class="token punctuation">.</span><span class="token function">findWithExtendedTypePersistenceContext</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertNotNull</span><span class="token punctuation">(</span>productFromExtendedScoped<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="扩展持久化上下文" tabindex="-1"><a class="header-anchor" href="#扩展持久化上下文"><span>扩展持久化上下文</span></a></h3><p>EXTENDED类型的持久化上下文将持久化上下文的作用域扩展到事务边界之外。我们可以通过使用EXTENDED类型的@PersistenceContext注解来创建它。</p><p>现在，让我们使用EXTENDED类型的持久化上下文持久化产品，而不使用事务。Product将仅保存在持久化上下文中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenProductPersistWithExtendedPersistence_thenShouldPersist</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Product</span> product <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token number">2L</span><span class="token punctuation">,</span> <span class="token string">&quot;Product 1&quot;</span><span class="token punctuation">,</span> <span class="token number">100.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    persistenceContextProductService<span class="token punctuation">.</span><span class="token function">insertProductWithExtendedTypePersistenceContext</span><span class="token punctuation">(</span>product<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Product</span> productFromExtendedScoped <span class="token operator">=</span> persistenceContextProductService<span class="token punctuation">.</span><span class="token function">findWithExtendedTypePersistenceContext</span><span class="token punctuation">(</span><span class="token number">2L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertNotNull</span><span class="token punctuation">(</span>productFromExtendedScoped<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Product</span> productFromTransactionScoped <span class="token operator">=</span> persistenceContextProductService<span class="token punctuation">.</span><span class="token function">findWithTransactionTypePersistenceContext</span><span class="token punctuation">(</span><span class="token number">2L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertNull</span><span class="token punctuation">(</span>productFromTransactionScoped<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>应用程序在移除bean或故意关闭扩展持久化上下文时提交更改。</p><h2 id="持久化单元" tabindex="-1"><a class="header-anchor" href="#持久化单元"><span>持久化单元</span></a></h2><p>持久化单元定义了实体类的集合及其配置，并代表实体管理器管理的这些实体的逻辑分组。我们可以通过创建persistence.xml文件或扩展PersistenceUnitInfo接口来创建持久化单元。</p><p>@PersistenceUnit JPA注解将实体管理器工厂注入到bean中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PersistenceUnit</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;persistence-unit-name&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">EntityManagerFactory</span> entityManagerFactory<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>持久化单元支持两种类型：RESOURCE_LOCAL和JTA。</p><p>持久化单元的一个巨大优势是我们可以在同一应用程序中定义多个持久化单元，每个单元都适应系统的不同部分甚至不同的数据库。</p><h3 id="资源本地持久化单元" tabindex="-1"><a class="header-anchor" href="#资源本地持久化单元"><span>资源本地持久化单元</span></a></h3><p>默认情况下，Spring应用程序使用资源本地持久化单元。在资源本地持久化单元中，我们负责管理事务。它不依赖于外部事务管理器。</p><p>让我们声明一个位于类路径上的META-INF/persistence.xml的persistence.xml文件：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>persistence-unit</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.baeldung.contextvsunit.h2_persistence_unit<span class="token punctuation">&quot;</span></span> <span class="token attr-name">transaction-type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>RESOURCE_LOCAL<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>description</span><span class="token punctuation">&gt;</span></span>\`EntityManager serializable persistence unit\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>description</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>class</span><span class="token punctuation">&gt;</span></span>\`com.baeldung.contextvsunit.entity.Product\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>class</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclude-unlisted-classes</span><span class="token punctuation">&gt;</span></span>\`true\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclude-unlisted-classes</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>hibernate.hbm2ddl.auto<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>update<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>hibernate.show_sql<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>hibernate.generate_statistics<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>hibernate.dialect<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>org.hibernate.dialect.H2Dialect<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>jakarta.persistence.jdbc.driver<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>org.h2.Driver<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>jakarta.persistence.jdbc.url<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>jdbc:h2:mem:db2;DB_CLOSE_DELAY=-1<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>jakarta.persistence.jdbc.user<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>sa<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>jakarta.persistence.jdbc.password<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>persistence-unit</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，我们使用数据库连接属性定义了持久化单元。此外，我们配置了Hibernate属性，包括方言、事务设置和其他持久化操作属性。每次应用程序与数据库交互时，它都在持久化单元的上下文中操作。我们在持久化单元内定义了Java实体和数据库表之间的映射。</p><p>现在，让我们在我们的PersistenceUnitProductService类中使用这个持久化单元：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PersistenceUnitProductService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@PersistenceUnit</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;com.baeldung.contextvsunit.h2_persistence_unit&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">EntityManagerFactory</span> emf<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Transactional</span>
    <span class="token keyword">void</span> <span class="token function">insertProduct</span><span class="token punctuation">(</span><span class="token class-name">Product</span> product<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">EntityManager</span> entityManager <span class="token operator">=</span> emf<span class="token punctuation">.</span><span class="token function">createEntityManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        entityManager<span class="token punctuation">.</span><span class="token function">persist</span><span class="token punctuation">(</span>product<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">Product</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token keyword">long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">EntityManager</span> entityManager <span class="token operator">=</span> emf<span class="token punctuation">.</span><span class="token function">createEntityManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> entityManager<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token class-name">Product</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们持久化一个_Product_实体，以验证一切是否按我们预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenProductPersistWithEntityManagerFactory_thenShouldPersist</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Product</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> <span class="token string">&quot;Product 1&quot;</span><span class="token punctuation">,</span> <span class="token number">100.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    persistenceUnitProductService<span class="token punctuation">.</span><span class="token function">insertProduct</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Product</span> createdProduct <span class="token operator">=</span> persistenceUnitProductService<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>createdProduct<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="jta持久化单元" tabindex="-1"><a class="header-anchor" href="#jta持久化单元"><span>JTA持久化单元</span></a></h3><p>使用JTA意味着我们将工作委托给容器。因此，我们不能通过EntityManagerFactory获得EntityManager。相反，我们必须使用容器提供并通过@PersistenceContext注解注入的EntityManager。</p><p>企业应用程序通常在部署到Java EE容器如TomEE和WildFly时使用JTA持久化单元。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们学习了持久化单元和持久化上下文之间的区别。</p><p>我们首先简要介绍了EntityManager和EntityManagerFactory以了解它们的角色。接下来，我们检查了持久化上下文，深入研究了其作用域和可用类型。</p><p>最后，我们将注意力转向持久化单元，它作为实体的中央配置单元，促进了高效的数据管理。</p><p>如往常一样，这些示例的完整实现可以在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,51),c=[p];function o(i,l){return a(),s("div",null,c)}const d=n(e,[["render",o],["__file","PersistenceUnit vs. PersistenceContext.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/PersistenceUnit%20vs.%20PersistenceContext.html","title":"持久化上下文与持久化单元 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-18T00:00:00.000Z","category":["Java Persistence","JPA"],"tag":["PersistenceUnit","PersistenceContext"],"description":"持久化上下文与持久化单元 | Baeldung 持久化上下文和持久化单元是JPA中用于管理应用程序中实体生命周期的两个重要概念。 在本教程中，我们将简要介绍实体管理器和实体管理器工厂。接下来，我们将看到持久化上下文的重要性及其用例。最后，我们将看到持久化单元的作用及其用例。 实体管理器和实体管理器工厂 在深入细节之前，有必要基本了解实体管理器和实体管理...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/PersistenceUnit%20vs.%20PersistenceContext.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"持久化上下文与持久化单元 | Baeldung"}],["meta",{"property":"og:description","content":"持久化上下文与持久化单元 | Baeldung 持久化上下文和持久化单元是JPA中用于管理应用程序中实体生命周期的两个重要概念。 在本教程中，我们将简要介绍实体管理器和实体管理器工厂。接下来，我们将看到持久化上下文的重要性及其用例。最后，我们将看到持久化单元的作用及其用例。 实体管理器和实体管理器工厂 在深入细节之前，有必要基本了解实体管理器和实体管理..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"PersistenceUnit"}],["meta",{"property":"article:tag","content":"PersistenceContext"}],["meta",{"property":"article:published_time","content":"2024-06-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"持久化上下文与持久化单元 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":3,"title":"实体管理器和实体管理器工厂","slug":"实体管理器和实体管理器工厂","link":"#实体管理器和实体管理器工厂","children":[]},{"level":3,"title":"事务作用域的持久化上下文","slug":"事务作用域的持久化上下文","link":"#事务作用域的持久化上下文","children":[]},{"level":3,"title":"扩展持久化上下文","slug":"扩展持久化上下文","link":"#扩展持久化上下文","children":[]},{"level":2,"title":"持久化单元","slug":"持久化单元","link":"#持久化单元","children":[{"level":3,"title":"资源本地持久化单元","slug":"资源本地持久化单元","link":"#资源本地持久化单元","children":[]},{"level":3,"title":"JTA持久化单元","slug":"jta持久化单元","link":"#jta持久化单元","children":[]}]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.67,"words":1702},"filePathRelative":"posts/baeldung/Archive/PersistenceUnit vs. PersistenceContext.md","localizedDate":"2024年6月18日","excerpt":"\\n<p>持久化上下文和持久化单元是JPA中用于管理应用程序中实体生命周期的两个重要概念。</p>\\n<p>在本教程中，我们将简要介绍实体管理器和实体管理器工厂。接下来，我们将看到持久化上下文的重要性及其用例。最后，我们将看到持久化单元的作用及其用例。</p>\\n<h3>实体管理器和实体管理器工厂</h3>\\n<p>在深入细节之前，有必要基本了解实体管理器和实体管理器工厂接口。正如我们将看到的，它们在管理持久性、实体和数据库交互中扮演着重要角色。</p>\\n<h4>实体管理器</h4>\\n<p>实体管理器是一个与持久化上下文交互的接口。它对实体执行CRUD操作，跟踪变更，并确保在事务提交时与数据库同步。实体管理器代表一个持久化上下文，并在事务的作用域内操作。</p>","autoDesc":true}');export{d as comp,k as data};
