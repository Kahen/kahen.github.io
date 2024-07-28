---
date: 2022-04-01
category:
  - JPA
  - Hibernate
tag:
  - JPA Entities
  - Serializable
head:
  - - meta
    - name: keywords
      content: JPA, Hibernate, Serializable, Java, Entity, JPA Specification, Mapping
------
# JPA 实体和 Serializable 接口

在本教程中，我们将讨论 JPA 实体和 Java Serializable 接口是如何结合的。首先，我们将看看 java.io.Serializable 接口是什么以及为什么我们需要它。之后，我们将看看 JPA 规范以及 Hibernate 作为其最流行的实现。

### 2. Serializable 接口是什么？

Serializable 是 Java 核心库中少数几个标记接口之一。标记接口是特殊情况的接口，没有方法或常量。

**对象序列化是将 Java 对象转换为字节流的过程**。然后，我们可以将这些字节流通过线路传输或存储在持久性内存中。**反序列化是相反的过程**，我们从字节流中转换回 Java 对象。要允许对象序列化（或反序列化），一个类必须实现 Serializable 接口。否则，我们将遇到 java.io.NotSerializableException。**序列化在 RMI、JPA 和 EJB 等技术中广泛使用**。

让我们看看 JPA 规范对 Serializable 的说法以及它与 Hibernate 的关系。

### 3.1. JPA 规范

JPA 的一个核心部分是实体类。我们用 _@Entity_ 注解或 XML 描述符将这样的类标记为实体。我们的实体类必须满足几个要求，根据 JPA 规范，我们最关心的是：

> 如果实体实例要以脱离值的形式传递（例如，通过远程接口），实体类必须实现 Serializable 接口。

在实践中，**如果我们的对象要离开 JVM 的领域，它将需要序列化**。

每个实体类由持久字段和属性组成。规范要求实体的字段可以是 Java 原语、Java 可序列化类型或用户定义的可序列化类型。

一个实体类还必须有一个主键。主键可以是原语（单个持久字段）或复合的。复合键的多个规则之一是，**复合键需要是可序列化的**。

让我们使用 Hibernate、H2 内存数据库和 _User_ 领域对象以及 _UserId_ 作为复合键创建一个简单的示例：

```java
@Entity
public class User {
    @EmbeddedId UserId userId;
    String email;

    // 构造函数，getter 和 setter
}

@Embeddable
public class UserId implements Serializable {
    private String name;
    private String lastName;

    // getter 和 setter
}
```

我们可以使用集成测试来测试我们的领域定义：

```java
@Test
public void givenUser_whenPersisted_thenOperationSuccessful() {
    UserId userId = new UserId();
    userId.setName("John");
    userId.setLastName("Doe");
    User user = new User(userId, "johndoe@gmail.com");

    entityManager.persist(user);

    User userDb = entityManager.find(User.class, userId);
    assertEquals(userDb.email, "johndoe@gmail.com");
}
```

如果我们的 _UserId_ 类没有实现 _Serializable_ 接口，我们将得到一个 _MappingException_，具体消息是我们的复合键必须实现该接口。

### 3.2. Hibernate @JoinColumn 注解

Hibernate 官方文档在描述 Hibernate 中的映射时指出，当我们使用 @JoinColumn 注解中的 _referencedColumnName_ 时，**被引用的字段必须是可序列化的**。通常，这个字段是另一个实体的主键。在复杂实体类的罕见情况下，我们的引用必须是可序列化的。

让我们扩展前面的 _User_ 类，其中 _email_ 字段不再是 _String_ 而是一个独立的实体。我们还将添加一个 _Account_ 类，它将引用一个用户并有一个 _type_ 字段。每个 _User_ 可以有多个不同类型的账户。我们将通过 _email_ 映射 _Account_ ，因为按电子邮件地址搜索更自然：

```java
@Entity
public class User {
    @EmbeddedId private UserId userId;
    private Email email;
}

@Entity
public class Email implements Serializable {
    @Id
    private long id;
    private String name;
    private String domain;
}

@Entity
public class Account {
    @Id
    private long id;
    private String type;
    @ManyToOne
    @JoinColumn(referencedColumnName = "email")
    private User user;
}
```

为了测试我们的模型，我们将编写一个测试，其中我们为一个用户创建两个账户，并通过电子邮件对象查询：

```java
@Test
public void givenAssociation_whenPersisted_thenMultipleAccountsWillBeFoundByEmail() {
    // 对象创建

    entityManager.persist(user);
    entityManager.persist(account);
    entityManager.persist(account2);

    List`<Account>` userAccounts = entityManager.createQuery("select a from Account a join fetch a.user where a.user.email = :email", Account.class)
      .setParameter("email", email)
      .getResultList();

    assertEquals(userAccounts.size(), 2);
}
```

**注意：user** 是 H2 数据库中的保留字，不能用作实体的名称。

如果 _Email_ 类没有实现 _Serializable_ 接口，我们将再次得到 _MappingException_，但这次的消息有些难以理解：“Could not determine type”。

### 3.3. 将实体暴露给表示层

当我们使用 HTTP 通过线路发送对象时，我们通常会为此目的创建特定的 DTO（数据传输对象）。通过创建 DTO，我们将内部领域对象与外部服务解耦。**如果我们想直接将实体暴露给表示层而不使用 DTO，那么实体必须是可序列化的**。

我们使用 _HttpSession_ 对象来存储有助于我们在网站访问期间识别用户的相关数据。当 web 服务器在优雅地关闭或在集群环境中将会话数据传输到另一个 web 服务器时，可以存储会话数据到磁盘上。如果实体是这个过程的一部分，那么它必须是可序列化的。否则，我们将遇到 _NotSerializableException_。

## 结论

在本文中，我们介绍了 Java 序列化的基础，并看到了它如何在 JPA 中发挥作用。首先，我们回顾了 JPA 规范对 Serializable 的要求。之后，我们研了作为 JPA 最流行实现的 Hibernate。最后，我们涵盖了 JPA 实体如何与 web 服务器一起工作。

像往常一样，本文中介绍的所有代码都可以在 GitHub 上找到。