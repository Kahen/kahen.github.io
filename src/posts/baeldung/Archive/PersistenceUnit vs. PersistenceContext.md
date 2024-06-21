---
date: 2024-06-18
category:
  - Java Persistence
  - JPA
tag:
  - PersistenceUnit
  - PersistenceContext
---
# 持久化上下文与持久化单元 | Baeldung

持久化上下文和持久化单元是JPA中用于管理应用程序中实体生命周期的两个重要概念。

在本教程中，我们将简要介绍实体管理器和实体管理器工厂。接下来，我们将看到持久化上下文的重要性及其用例。最后，我们将看到持久化单元的作用及其用例。

### 实体管理器和实体管理器工厂
在深入细节之前，有必要基本了解实体管理器和实体管理器工厂接口。正如我们将看到的，它们在管理持久性、实体和数据库交互中扮演着重要角色。

#### 实体管理器
实体管理器是一个与持久化上下文交互的接口。它对实体执行CRUD操作，跟踪变更，并确保在事务提交时与数据库同步。实体管理器代表一个持久化上下文，并在事务的作用域内操作。

#### 实体管理器工厂
实体管理器工厂是一个创建实体管理器的接口，实际上充当工厂的角色。创建后，实体管理器工厂与特定的持久化单元关联，从而能够创建实体管理器的实例。

持久化上下文是一个短暂存在、事务作用域内的上下文，用于管理实体的生命周期。它代表一组存储在内存中作为实体管理器一级缓存的托管实体。如果事务开始，持久化上下文被创建，并在事务提交或回滚时最终被关闭或清除。

持久化上下文自动检测对托管实体所做的更改，并确保所有实体更改与持久性存储同步。

我们可以使用@PersistenceContext注解定义持久化上下文的类型：

```java
@PersistenceContext
private EntityManager entityManager;
```

JPA中有两类持久化上下文：TRANSACTION和EXTENDED。

让我们首先使用@Entity注解创建与PRODUCT表对应的实体：

```java
@Entity
@Table(name = "PRODUCT")
public class Product {

    @Id
    private Long id;

    private String name;

    private double price;

    // 标准构造函数，getter和setter
}
```

现在，让我们创建我们的服务类PersistenceContextProductService：

```java
@Service
public class PersistenceContextProductService {

    @PersistenceContext(type = PersistenceContextType.TRANSACTION)
    private EntityManager entityManagerTransactionType;

    @PersistenceContext(type = PersistenceContextType.EXTENDED)
    private EntityManager entityManagerExtendedType;

    @Transactional
    void insertProductWithTransactionTypePersistenceContext(Product product) {
        entityManagerTransactionType.persist(product);
    }

    Product findWithTransactionTypePersistenceContext(long id) {
        return entityManagerTransactionType.find(Product.class, id);
    }

    void insertProductWithExtendedTypePersistenceContext(Product product) {
        entityManagerExtendedType.persist(product);
    }

    Product findWithExtendedTypePersistenceContext(long id) {
        return entityManagerExtendedType.find(Product.class, id);
    }
}
```

### 事务作用域的持久化上下文
TRANSACTION类型的持久化上下文是JPA中的默认持久化上下文类型。在此类型中，持久化上下文绑定到事务。这意味着每个事务创建和销毁持久化上下文。

让我们使用TRANSACTION类型的持久化上下文持久化产品。我们将保存Product实体，更改将在事务提交时自动持久化：

```java
@Test
void whenProductPersistWithTransactionPersistenceContext_thenShouldPersist() {
    Product p = new Product(1L, "Product 1", 100.0);
    persistenceContextProductService.insertProductWithTransactionTypePersistenceContext(p);

    Product productFromTransactionScoped = persistenceContextProductService.findWithTransactionTypePersistenceContext(1L);
    Assertions.assertNotNull(productFromTransactionScoped);

    Product productFromExtendedScoped = persistenceContextProductService.findWithExtendedTypePersistenceContext(1L);
    Assertions.assertNotNull(productFromExtendedScoped);
}
```

### 扩展持久化上下文
EXTENDED类型的持久化上下文将持久化上下文的作用域扩展到事务边界之外。我们可以通过使用EXTENDED类型的@PersistenceContext注解来创建它。

现在，让我们使用EXTENDED类型的持久化上下文持久化产品，而不使用事务。Product将仅保存在持久化上下文中：

```java
@Test
void whenProductPersistWithExtendedPersistence_thenShouldPersist() {
    Product product = new Product(2L, "Product 1", 100.0);
    persistenceContextProductService.insertProductWithExtendedTypePersistenceContext(product);

    Product productFromExtendedScoped = persistenceContextProductService.findWithExtendedTypePersistenceContext(2L);
    Assertions.assertNotNull(productFromExtendedScoped);

    Product productFromTransactionScoped = persistenceContextProductService.findWithTransactionTypePersistenceContext(2L);
    Assertions.assertNull(productFromTransactionScoped);
}
```

应用程序在移除bean或故意关闭扩展持久化上下文时提交更改。

## 持久化单元
持久化单元定义了实体类的集合及其配置，并代表实体管理器管理的这些实体的逻辑分组。我们可以通过创建persistence.xml文件或扩展PersistenceUnitInfo接口来创建持久化单元。

@PersistenceUnit JPA注解将实体管理器工厂注入到bean中：

```java
@PersistenceUnit(name = "persistence-unit-name")
private EntityManagerFactory entityManagerFactory;
```

持久化单元支持两种类型：RESOURCE_LOCAL和JTA。

持久化单元的一个巨大优势是我们可以在同一应用程序中定义多个持久化单元，每个单元都适应系统的不同部分甚至不同的数据库。

### 资源本地持久化单元
默认情况下，Spring应用程序使用资源本地持久化单元。在资源本地持久化单元中，我们负责管理事务。它不依赖于外部事务管理器。

让我们声明一个位于类路径上的META-INF/persistence.xml的persistence.xml文件：

```xml
`<persistence-unit name="com.baeldung.contextvsunit.h2_persistence_unit" transaction-type="RESOURCE_LOCAL">`
    `<description>`EntityManager serializable persistence unit`</description>`
    `<class>`com.baeldung.contextvsunit.entity.Product`</class>`
    `<exclude-unlisted-classes>`true`</exclude-unlisted-classes>`
    `<properties>`
        `<property name="hibernate.hbm2ddl.auto" value="update"/>`
        `<property name="hibernate.show_sql" value="true"/>`
        `<property name="hibernate.generate_statistics" value="false"/>`
        `<property name="hibernate.dialect" value="org.hibernate.dialect.H2Dialect"/>`
        `<property name="jakarta.persistence.jdbc.driver" value="org.h2.Driver"/>`
        `<property name="jakarta.persistence.jdbc.url" value="jdbc:h2:mem:db2;DB_CLOSE_DELAY=-1"/>`
        `<property name="jakarta.persistence.jdbc.user" value="sa"/>`
        `<property name="jakarta.persistence.jdbc.password" value=""/>`
    `</properties>`
`</persistence-unit>`
```

如我们所见，我们使用数据库连接属性定义了持久化单元。此外，我们配置了Hibernate属性，包括方言、事务设置和其他持久化操作属性。每次应用程序与数据库交互时，它都在持久化单元的上下文中操作。我们在持久化单元内定义了Java实体和数据库表之间的映射。

现在，让我们在我们的PersistenceUnitProductService类中使用这个持久化单元：

```java
@Service
public class PersistenceUnitProductService {

    @PersistenceUnit(name = "com.baeldung.contextvsunit.h2_persistence_unit")
    private EntityManagerFactory emf;

    @Transactional
    void insertProduct(Product product) {
        EntityManager entityManager = emf.createEntityManager();
        entityManager.persist(product);
    }

    Product find(long id) {
        EntityManager entityManager = emf.createEntityManager();
        return entityManager.find(Product.class, id);
    }
}
```

让我们持久化一个_Product_实体，以验证一切是否按我们预期工作：

```java
@Test
void whenProductPersistWithEntityManagerFactory_thenShouldPersist() {
    Product p = new Product(1L, "Product 1", 100.0);
    persistenceUnitProductService.insertProduct(p);

    Product createdProduct = persistenceUnitProductService.find(1L);
    assertNotNull(createdProduct);
}
```

### JTA持久化单元
使用JTA意味着我们将工作委托给容器。因此，我们不能通过EntityManagerFactory获得EntityManager。相反，我们必须使用容器提供并通过@PersistenceContext注解注入的EntityManager。

企业应用程序通常在部署到Java EE容器如TomEE和WildFly时使用JTA持久化单元。

## 结论
在本文中，我们学习了持久化单元和持久化上下文之间的区别。

我们首先简要介绍了EntityManager和EntityManagerFactory以了解它们的角色。接下来，我们检查了持久化上下文，深入研究了其作用域和可用类型。

最后，我们将注意力转向持久化单元，它作为实体的中央配置单元，促进了高效的数据管理。

如往常一样，这些示例的完整实现可以在GitHub上找到。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。