---
date: 2022-04-01
category:
  - Spring JPA
  - flush()
tag:
  - flush()
  - JPA
  - EntityManager
head:
  - - meta
    - name: description
      content: 这篇教程详细解释了Spring JPA中flush()方法的正确使用方法，包括EntityManager和flush模式的基本概念，以及flush()在不同场景下如何工作。
---

# Spring JPA中flush()的正确使用

在本教程中，我们将简要了解Spring JPA提供的_flush()_方法。

首先，我们将学习涉及的关键抽象概念，包括_实体管理器_和_flush模式_。接下来，我们将使用_Customer_和_CustomerAddress_实体设置一个示例。然后，我们将编写集成测试，以查看两个flush模式下_flush()_的工作原理。最后，我们将探讨使用显式_flush()_的一些关键好处以及一些考虑因素。

## 2. flush()是什么？

本质上_flush()_方法是JPA中_实体管理器_接口的一部分。_实体管理器_可以用来与JPA中的持久化上下文交互。它提供了管理实体生命周期、查询实体以及对数据库执行CRUD操作的方法。

_flush()_方法用于将持久化上下文中对实体所做的任何更改与底层数据库同步。当我们在_实体管理器_上调用_flush()_时，JPA提供程序反过来执行任何必要的SQL语句，以在数据库中持久化或更新实体。

在进一步探讨这种方法的正确使用之前，让我们先了解一下与_flush()_工作密切相关的一个概念，即JPA提供的不同的flush模式。

JPA中的flush模式决定了何时将持久化上下文中对实体所做的更改与数据库同步。JPA提供的两种主要flush模式是_AUTO_和_COMMIT_。

_AUTO_是默认的flush模式。这意味着对实体所做的更改在必要时会自动与数据库同步，例如在事务提交时，或者在执行需要最新数据的查询时。

另一方面，_COMMIT_模式将同步延迟到事务提交。这意味着对实体所做的更改在当前事务提交之前不会对其他事务可见。

## 3. 示例设置

让我们考虑两个实体的简单示例，_Customer_和_CustomerAddress_。_CustomerAddress_实体包含一个_long_类型的_customer_id_。让我们首先定义_Customer_实体：

```java
@Entity
public class Customer {
    private String name;
    private int age;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // getters and setters
}
```

接下来，让我们定义_Address_实体：

```java
@Entity
public class CustomerAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String street;
    private String city;
    private long customer_id;

    // ... getters and setters
}
```

稍后，我们将使用这两个类来测试可能需要使用_flush()_的各种场景。

### 3.1. 设置_实体管理器_

在我们设置_实体管理器_之前，我们需要获得一个实现_实体管理器工厂_接口的类的实例：

```java
@Bean
public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource) {
    LocalContainerEntityManagerFactoryBean emf = new LocalContainerEntityManagerFactoryBean();
    emf.setDataSource(dataSource);
    emf.setPackagesToScan("com.baeldung.flush");
    emf.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
    emf.setJpaProperties(getHibernateProperties());
    return emf;
}
```

为了设置_实体管理器工厂_，我们需要提供数据源和JPA属性。

让我们使用H2嵌入式数据库作为我们的示例数据库：

```java
@Bean
public DataSource dataSource() {
    return new EmbeddedDatabaseBuilder().setType(EmbeddedDatabaseType.H2)
        .build();
```

接下来，我们设置属性：

```java
Properties getHibernateProperties() {
    Properties properties = new Properties();
    properties.setProperty("hibernate.hbm2ddl.auto", "create");
    properties.setProperty("hibernate.dialect", "org.hibernate.dialect.H2Dialect");
    return properties;
}
```

在后续部分，我们将使用这个_实体管理器工厂_来创建_实体管理器_的实例。我们将使用这个_实体管理器_来测试事务中使用和不使用_flush()_的各种场景。

## 4. 使用_FlushModeType.COMMIT_

让我们首先将_FlushModeType_设置为_COMMIT_：

```java
entityManager.setFlushMode(FlushModeType.COMMIT);
```

正如我们一开始提到的，_FlushModeType.COMMIT_将数据库的刷新延迟到事务提交。这可以通过减少事务期间发送到数据库的SQL语句数量来提高性能，但如果其他事务修改了相同的数据，它也增加了数据不一致的风险。

为了理解在结合使用_EntityManager_类的_persist()_和_flush()_时需要_flush()_的必要性，让我们首先测试我们的_Customer_创建，并尝试在不调用_flush()_的情况下查询数据库中的新创建_Customer_：

```java
@Test
void givenANewCustomer_whenPersistAndNoFlush_thenDatabaseNotSynchronizedWithPersistentContextUsingCommitFlushMode() {
    entityManager.setFlushMode(FlushModeType.COMMIT);

    EntityTransaction transaction = getTransaction();
    Customer customer = saveCustomerInPersistentContext("Alice", 30);
    Customer customerInContext = entityManager.find(Customer.class, customer.getId());
    assertDataInPersitentContext(customerInContext);

    TypedQuery````<Customer>```` retrievedCustomer = entityManager.createQuery("SELECT c FROM Customer c WHERE c.name = 'Alice'", Customer.class);

    List````<Customer>```` resultList = retrievedCustomer.getResultList();

    assertThat(resultList).isEmpty();
    transaction.rollback();
}
```

基本上，这里我们使用之前配置的_EntityManager_类型的bean来获取_Transaction_的实例：

```java
EntityTransaction getTransaction() {
    EntityTransaction transaction = entityManager.getTransaction();
    transaction.begin();
    return transaction;
```

然后我们创建_Customer_并使用_entityManager.persist(customer)_进行持久化：

```java
Customer saveCustomerInPersistentContext(String name, int age) {
    Customer customer = new Customer();
    customer.setName(name);
    customer.setAge(age);
    entityManager.persist(customer);
    return customer;
}
```

接下来，我们查询数据库以检索新创建的Customer对象。

我们发现查询结果转换为_List````<Customer>````_是一个空列表，这意味着由于事务尚未提交，持久化上下文与底层数据库尚未同步。

接下来，保持_FlushModeType_为_COMMIT_，让我们确保在调用实体管理器上的_persist()_之后调用_flush()_：

```java
@Test
void givenANewCustomer_whenPersistAndFlush_thenDatabaseSynchronizedWithPersistentContextUsingCommitFlushMode() {
    entityManager.setFlushMode(FlushModeType.COMMIT);

    EntityTransaction transaction = getTransaction();
    Customer customer = saveCustomerInPersistentContext("Alice", 30);
    entityManager.flush();
    Long generatedCustomerID = customer.getId();

    Customer customerInContext = entityManager.find(Customer.class, generatedCustomerID);
    assertDataInPersitentContext(customerInContext);

    TypedQuery````<Customer>```` retrievedCustomer = entityManager.createQuery("SELECT c FROM Customer c WHERE c.name = 'Alice'", Customer.class);

    Customer result = retrievedCustomer.getSingleResult();
    assertThat(result).isEqualTo(EXPECTED_CUSTOMER);
    transaction.rollback();
}
```

在这里，我们可以看到，通过在调用_persist()_之后添加对_flush()_的调用，数据库与持久化上下文中的事务同步。我们将查询数据库并得到结果，该结果等于新创建的客户实体。重要的是，即使_FlushModeType_是_COMMIT_并且事务本身尚未提交，新的_Customer_实体已经被保存在数据库中。

### 4.1. 跨两个实体的查询

现在，让我们扩展我们的简单示例，包括_CustomerAddress_实体。**我们想要看到我们可能想要显式调用涉及跨数据库多表查询的_flush()_的潜在案例。**

_CustomerAddress_包含一个名为_customer_id_的字段，该字段在创建客户实体后自动生成。我们可以看到，我们想要保存一个_Customer_，查询数据库以获取_id_，并使用自动生成的_id_在_CustomerAddress_实体中：

```java
@Test
public void givenANewCustomer_whenPersistAndFlush_thenCustomerIdGeneratedToBeAddedInAddress() {
    entityManager.setFlushMode(FlushModeType.COMMIT);
    EntityTransaction transaction = getTransaction();

    saveCustomerInPersistentContext("John", 25);
    entityManager.flush();

    Customer retrievedCustomer = entityManager.createQuery("SELECT c FROM Customer c WHERE c.name = 'John'", Customer.class)
      .getSingleResult();
    Long customerId = retrievedCustomer.getId();

    CustomerAddress address = new CustomerAddress();
    address.setCustomer_id(customerId);
    entityManager.persist(address);
    entityManager.flush();

    CustomerAddress customerAddress = entityManager.createQuery("SELECT a FROM CustomerAddress a WHERE a.customer_id = :customerID", CustomerAddress.class)
      .setParameter("customerID", customerId)
      .getSingleResult();

    assertThat(customerAddress).isNotNull();
    transaction.rollback();
}
```

最后，让我们简要谈谈与_flush()_方法相关的_rollback()_的使用。本质上，当我们调用_rollback()_时，事务中所做的任何更改都会被撤销。数据库恢复到事务开始之前的状态。在我们上面测试的所有场景中，我们都在最后调用了_rollback()_。这可以防止任何部分更改被提交到数据库，这可能导致数据不一致或损坏。

## 5. 使用_FlushModeType.AUTO_的_flush()

接下来，让我们看看当我们将_FlushModeType_设置