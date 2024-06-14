---
date: 2023-10-10
category:
  - JPA
  - Hibernate
tag:
  - JPA
  - Hibernate
  - 持久化上下文
  - 清除管理实体
---
# JPA/Hibernate 中清除管理实体的指南

## 1. 概述

在本教程中，我们将回顾JPA中实体是如何被管理的，然后探讨一个场景，即由于外部变化，持久化上下文可能不会返回最新数据。

## 2. 持久化上下文

每个_EntityManager_都与一个持久化上下文相关联，该上下文在内存中存储管理实体。每当我们通过_EntityManager_对实体执行任何数据操作时，该实体就会由持久化上下文管理。

当我们再次检索实体时，JPA会从持久化上下文中返回管理实体，而不是从数据库中获取。这种缓存机制有助于提高性能，避免了从数据库中重复获取相同的数据。

**持久化上下文在JPA中也被称为一级（L1）缓存。**

## 3. 场景设置

首先，我们创建一个简单的实体类：

```java
@Entity
@Table(name = "person")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;

    // 构造函数，getter和setter
}
```

接下来，我们将创建一个_Person_实体并将其持久化到数据库：

```java
EntityTransaction transaction = entityManager.getTransaction();
transaction.begin();

Person person = new Person();
person.setName("David Jones");
entityManager.persist(person);

transaction.commit();
```

## 4. 不清除管理实体

我们的示例数据已经准备好了。让我们使用SQL更新查询来遮蔽_Person_的_name_字段。我们从_EntityManager_获取一个JDBC连接并执行更新查询：

```java
Session session = entityManager.unwrap(Session.class);
session.doWork(connection -> {
    try (PreparedStatement pStmt = connection.prepareStatement("UPDATE person SET name=? WHERE id=?")) {
        pStmt.setString(1, "*****");
        pStmt.setLong(2, 1);
        pStmt.executeUpdate();
    }
});
```

现在，我们可以通过_EntityManager_再次检索相同的实体：

```java
Person updatedPerson = entityManager.find(Person.class, 1);
```

直观地，我们可能会认为检索到的_Person_实体的名称已经被更新查询遮蔽了。然而，当我们验证实体的名称时，名称仍然是“_David Jones_”：

```java
assertThat(updatedPerson.getName()).isNotEqualTo("*****");
```

这种情况发生的原因是JPA从持久化上下文中检索管理实体，而自JDBC数据更新以来，持久化上下文并没有相应地更新。**当数据变更发生在_EntityManager_之外时，它并不知情，也无法更新相应的管理实体。**

## 5. 清除管理实体

**因此，每当我们在不使用_EntityManager_的情况下对数据库数据进行任何更改时，我们必须强制JPA从持久化上下文中清除所有管理实体，以便可以再次从数据库中获取实体。**

为此，我们调用_EntityManager_的_clear()_方法：

```java
entityManager.clear();
```

这个操作将所有管理实体从持久化上下文中分离出来，确保JPA不再跟踪这些实体。

随后，我们可以再次使用_EntityManager_检索相同的实体。如果我们在持久化单元配置中启用了_hibernate.show_sql_选项，我们将在控制台日志中看到以下SQL被执行：

```sql
Hibernate:
    select
        p1_0.id,
        p1_0.name
    from
        person p1_0
    where
        p1_0.id=?
```

这个SQL语句表明_EntityManager_执行了一个选择查询，从数据库中检索最新数据。我们可以期待这次_Person_实体的名称已经被遮蔽了：

```java
assertThat(updatedPerson.getName()).isEqualTo("*****");
```

## 6. 结论

在本文中，我们学习了JPA中持久化上下文的作用。如果我们在不涉及_EntityManager_的情况下执行数据变更，持久化上下文不会重新加载实体。我们需要调用_EntityManager_的_clear()_方法来移除所有管理实体，并允许再次从数据库中重新加载实体。

如常，示例的完整源代码可以在GitHub上找到。