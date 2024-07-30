---
date: 2022-04-01
category:
  - JPA
  - Hibernate
tag:
  - JPA
  - ID生成
  - Hibernate
  - 数据库
head:
  - - meta
    - name: keywords
      content: JPA, Hibernate, ID生成, 数据库
------
# 使用JPA返回自动生成的ID

## 1. 引言

在本教程中，我们将讨论**如何处理JPA中的自动生成ID**。在我们看一个实际的例子之前，必须理解两个关键概念，即生命周期和ID生成策略。

## 2. 实体生命周期和ID生成

每个实体在其生命周期中有四种可能的状态。这些状态是**新**、**托管**、**分离**和**删除**。我们的重点将放在**新**和**托管**状态。**在对象创建期间，实体处于新状态**。因此，**EntityManager**不知道这个对象。调用**EntityManager**上的**persist**方法，对象从**新**转变为**托管**状态。此方法需要一个活动的事务。

JPA定义了四种ID生成策略。我们可以将这四种策略分为两类：
- ID在**提交**之前预先分配并可用于**EntityManager**
- ID在事务**提交**后分配

有关每种ID生成策略的更多详细信息，请参阅我们的文章《JPA何时设置主键》。

## 3. 问题陈述

返回对象的ID可能成为一个繁琐的任务。我们需要理解上一节中提到的原则以避免问题。**根据JPA配置，服务可能会返回ID等于零（或null）的对象**。重点将放在服务类实现以及不同的修改如何为我们提供解决方案。

我们将创建一个带有JPA规范和Hibernate作为其实现的Maven模块。为了简单起见，我们将使用H2内存数据库。

让我们从创建一个领域实体并将其映射到数据库表开始。在这个例子中，我们将创建一个带有一些基本属性的_User_实体：

```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String password;

    //...
}
```

在领域类之后，我们将创建一个_UserService_类。这个简单的服务将有一个对_EntityManager_的引用和一个将_User_对象保存到数据库的方法：

```java
public class UserService {
    EntityManager entityManager;

    public UserService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Transactional
    public long saveUser(User user){
        entityManager.persist(user);
        return user.getId();
    }
}
```

这种设置是我们之前提到的常见陷阱。我们可以通过测试证明_saveUser_方法的返回值为零：

```java
@Test
public void whenNewUserIsPersisted_thenEntityHasNoId() {
    User user = new User();
    user.setUsername("test");
    user.setPassword(UUID.randomUUID().toString());

    long index = service.saveUser(user);

    Assert.assertEquals(0L, index);
}
```

在接下来的几节中，我们将回顾为什么会发生这种情况，以及如何解决它。

## 4. 手动事务控制

在对象创建后，我们的_User_实体处于**新**状态。在_saveUser_方法中调用**persist**方法后，实体状态变为**托管**。我们从回顾部分记得**托管对象在事务提交后获得ID**。由于_saveUser_方法仍在运行，由_@Transactional_注释创建的事务尚未提交。我们的托管实体在_saveUser_完成执行时获得ID。

一个可能的解决方案是**手动调用_EntityManager_上的_flush_方法**。另一方面，我们可以**手动控制事务**并确保我们的方法正确返回ID。我们可以使用_EntityManager_做到这一点：

```java
@Test
public void whenTransactionIsControlled_thenEntityHasId() {
    User user = new User();
    user.setUsername("test");
    user.setPassword(UUID.randomUUID().toString());

    entityManager.getTransaction().begin();
    long index = service.saveUser(user);
    entityManager.getTransaction().commit();

    Assert.assertEquals(2L, index);
}
```

## 5. 使用ID生成策略

到目前为止，我们使用了第二类策略，其中ID分配发生在事务**提交**之后。**预分配策略可以在事务提交之前为我们提供ID，因为它们在内存中保留一些ID**。这种选项并不总是可能实现，因为并非所有数据库引擎都支持所有生成策略。将策略更改为_GenerationType.SEQUENCE_可以解决我们的问题。这种策略使用数据库序列而不是_GenerationType.IDENTITY_中的自增列。

要更改策略，我们将编辑我们的领域实体类：

```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    //...
}
```

## 6. 结论

在本文中，我们涵盖了JPA中的ID生成技术。首先，我们回顾了ID生成的最重要的关键方面。然后我们涵盖了JPA中使用的常见配置，以及它们的优点和缺点。本文中引用的所有代码都可以在GitHub上找到。头文件中的"Last updated"日期为2022-04-01，因此翻译的日期应为2022-04-01。根据您提供的链接和要求，翻译内容如下：

---
date: 2022-04-01
category:
  - JPA
  - Hibernate
tag:
  - JPA
  - ID生成
  - Hibernate
  - 数据库
head:
  - - meta
    - name: keywords
      content: JPA, Hibernate, ID生成, 数据库
---

# 使用JPA返回自动生成的ID

## 1. 引言

在本教程中，我们将讨论**如何处理JPA中的自动生成ID**。在我们看一个实际的例子之前，必须理解两个关键概念，即生命周期和ID生成策略。

## 2. 实体生命周期和ID生成

每个实体在其生命周期中有四种可能的状态。这些状态是**新**、**托管**、**分离**和**删除**。我们的重点将放在**新**和**托管**状态。**在对象创建期间，实体处于新状态**。因此，**EntityManager**不知道这个对象。调用**EntityManager**上的**persist**方法，对象从**新**转变为**托管**状态。此方法需要一个活动的事务。

JPA定义了四种ID生成策略。我们可以将这四种策略分为两类：
- ID在**提交**之前预先分配并可用于**EntityManager**
- ID在事务**提交**后分配

有关每种ID生成策略的更多详细信息，请参阅我们的文章《JPA何时设置主键》。

## 3. 问题陈述

返回对象的ID可能成为一个繁琐的任务。我们需要理解上一节中提到的原则以避免问题。**根据JPA配置，服务可能会返回ID等于零（或null）的对象**。重点将放在服务类实现以及不同的修改如何为我们提供解决方案。

我们将创建一个带有JPA规范和Hibernate作为其实现的Maven模块。为了简单起见，我们将使用H2内存数据库。

让我们从创建一个领域实体并将其映射到数据库表开始。在这个例子中，我们将创建一个带有一些基本属性的_User_实体：

```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String password;

    //...
}
```

在领域类之后，我们将创建一个_UserService_类。这个简单的服务将有一个对_EntityManager_的引用和一个将_User_对象保存到数据库的方法：

```java
public class UserService {
    EntityManager entityManager;

    public UserService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Transactional
    public long saveUser(User user){
        entityManager.persist(user);
        return user.getId();
    }
}
```

这种设置是我们之前提到的常见陷阱。我们可以通过测试证明_saveUser_方法的返回值为零：

```java
@Test
public void whenNewUserIsPersisted_thenEntityHasNoId() {
    User user = new User();
    user.setUsername("test");
    user.setPassword(UUID.randomUUID().toString());

    long index = service.saveUser(user);

    Assert.assertEquals(0L, index);
}
```

在接下来的几节中，我们将回顾为什么会发生这种情况，以及如何解决它。

## 4. 手动事务控制

在对象创建后，我们的_User_实体处于**新**状态。在_saveUser_方法中调用**persist**方法后，实体状态变为**托管**。我们从回顾部分记得**托管对象在事务提交后获得ID**。由于_saveUser_方法仍在运行，由_@Transactional_注释创建的事务尚未提交。我们的托管实体在_saveUser_完成执行时获得ID。

一个可能的解决方案是**手动调用_EntityManager_上的_flush_方法**。另一方面，我们可以**手动控制事务**并确保我们的方法正确返回ID。我们可以使用_EntityManager_做到这一点：

```java
@Test
public void whenTransactionIsControlled_thenEntityHasId() {
    User user = new User();
    user.setUsername("test");
    user.setPassword(UUID.randomUUID().toString());

    entityManager.getTransaction().begin();
    long index = service.saveUser(user);
    entityManager.getTransaction().commit();

    Assert.assertEquals(2L, index);
}
```

## 5. 使用ID生成策略

到目前为止，我们使用了第二类策略，其中ID分配发生在事务**提交**之后。**预分配策略可以在事务提交之前为我们提供ID，因为它们在内存中保留一些ID**。这种选项并不总是可能实现，因为并非所有数据库引擎都支持所有生成策略。将策略更改为_GenerationType.SEQUENCE_可以解决我们的问题。这种策略使用数据库序列而不是_GenerationType.IDENTITY_中的自增列。

要更改策略，我们将编辑我们的领域实体类：

```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    //...
}
```

## 6. 结论

在本文中，我们涵盖了JPA中的ID生成技术。首先，我们回顾了ID生成的最重要的关键方面。然后我们涵盖了JPA中使用的常见配置，以及它们的优点和缺点。本文中引用的所有代码都可以在GitHub上找到。

OK