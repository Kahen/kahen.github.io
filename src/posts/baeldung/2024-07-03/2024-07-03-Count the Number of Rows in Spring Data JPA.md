---
date: 2022-04-01
category:
  - Spring Data JPA
  - JPA
tag:
  - row count
  - JPA Repository
  - CriteriaQuery
  - JPQL
head:
  - - meta
    - name: keywords
      content: Spring Data JPA, row count, CriteriaQuery, JPQL
---
# 使用Spring Data JPA统计行数

## 1. 概述

Spring Data JPA 实现为 Jakarta Persistence API 提供了仓库支持，用于管理持久性，以及对象关系映射和函数。

在本教程中，我们将探索使用 JPA 统计表中行数的不同方法。

## 2. 实体类

以我们的示例来说，我们将使用具有与 _Permission_ 实体一对一关系的 _Account_ 实体：

```java
@Entity
@Table(name="ACCOUNTS")
public class Account {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "accounts_seq")
    @SequenceGenerator(name = "accounts_seq", sequenceName = "accounts_seq", allocationSize = 1)
    @Column(name = "user_id")
    private int userId;
    private String username;
    private String password;
    private String email;
    private Timestamp createdOn;
    private Timestamp lastLogin;

    @OneToOne
    @JoinColumn(name = "permissions_id")
    private Permission permission;

    // getters , setters
}
```

_Permission_ 属于账户实体：

```java
@Entity
@Table(name="PERMISSIONS")
public class Permission {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "permissions_id_sq")
    @SequenceGenerator(name = "permissions_id_sq", sequenceName = "permissions_id_sq", allocationSize = 1)
    private int id;

    private String type;

    // getters , setters
}
```

## 3. 使用 JPA 仓库

Spring Data JPA 提供了一个可以扩展的仓库接口，**提供了开箱即用的查询方法和派生查询方法，例如 _findAll()_, _findBy()_, _save(),_ _saveAndFlush()_, _count()_, _countBy()_, _delete()_, 和 _deleteAll()_。**

我们将定义 _AccountRepository_ 接口，它扩展了 _JpaRepository_ 接口，这样我们就可以使用 _count_ 方法了。

如果我们需要基于一个或多个条件进行计数，例如 _countByFirstname()_, _countByPermission()_, 或 _countByPermissionAndCredtedOnGreaterThan()_，我们只需要在 _AccountRepository_ 接口中提供方法名称，然后查询派生将负责定义适当的 SQL：

```java
public interface AccountRepository extends JpaRepository`<Account, Integer>` {
    long countByUsername(String username);
    long countByPermission(Permission permission);
    long countByPermissionAndCreatedOnGreaterThan(Permission permission, Timestamp ts)
}
```

在下面的例子中，我们将在逻辑类中使用 _AccountRepository_ 来执行计数操作。

### **3.1. 统计表中的所有行**

我们将定义一个逻辑类，其中我们注入了 _AccountRepository_。对于简单的行 _count()_ 操作，我们可以使用 _accountRepository.count()_，我们将得到结果：

```java
@Service
public class AccountStatsLogic {
    @Autowired
    private AccountRepository accountRepository;

    public long getAccountCount(){
        return accountRepository.count();
    }
}
```

### 3.2. 根据单个条件统计结果行

正如我们上面定义的，_AccountRepository_ 包含了方法名 _countByPermission_ 和 _countByUsername_，因此 Spring Data JPA 查询派生将为这些方法派生查询。

我们可以在逻辑类中使用这些方法进行条件计数，我们将得到结果：

```java
@Service
public class AccountStatsLogic {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private PermissionRepository permissionRepository;

    public long getAccountCountByUsername(){
        String username = "user2";
        return accountRepository.countByUsername(username);
    }

    public long getAccountCountByPermission(){
        Permission permission = permissionRepository.findByType("reader");
        return accountRepository.countByPermission(permission);
    }
}
```

### **3.3. 根据多个条件统计结果行**

我们也可以在我们的查询派生中包括多个条件，比如下面的示例，我们包括了 _Permission_ 和 _CreatedOnGreaterThan_：

```java
@Service
public class AccountStatsLogic {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    public long getAccountCountByPermissionAndCreatedOn() throws ParseException {
        Permission permission = permissionRepository.findByType("reader");
        Date parsedDate = getDate();
        return accountRepository.countByPermissionAndCreatedOnGreaterThan(permission, new Timestamp(parsedDate.getTime()));
    }
}
```

## 4. 使用 CriteriaQuery

JPA 中统计行数的另一种方法是使用 _CriteriaQuery_ 接口。**这个接口允许我们以面向对象的方式编写查询，这样我们就可以跳过编写原始 SQL 查询的知识。**

它要求我们构建一个 _CriteriaBuilder_ 对象，然后帮助我们构建 _CriteriaQuery_ **_。** 一旦 _CriteriaQuery_ 准备好，我们就可以使用 _entityManager_ 的 _createQuery_ 方法执行查询并获取结果。

### **4.1. 统计所有行**

现在，当我们使用 _CriteriaQuery_ 构建查询时，我们可以定义一个选择查询来计数：

```java
public long getAccountsUsingCQ() throws ParseException {
    // 创建标准构建器和查询
    CriteriaBuilder builder = entityManager.getCriteriaBuilder();
    CriteriaQuery```<Long>``` criteriaQuery = builder.createQuery(Long.class);
    Root```<Account>``` accountRoot = criteriaQuery.from(Account.class);

    // 选择查询
    criteriaQuery.select(builder.count(accountRoot));

     // 执行并获取结果
    return entityManager.createQuery(criteriaQuery).getSingleResult();
}
```

### **4.2. 根据单个条件统计结果行**

我们也可以扩展选择查询以包括 _where_ 条件来过滤我们的查询。我们可以向我们的构建器实例添加一个 _Predicate_ 并将其传递到 _where_ 子句：

```java
public long getAccountsByPermissionUsingCQ() throws ParseException {
    CriteriaBuilder builder = entityManager.getCriteriaBuilder();
    CriteriaQuery```<Long>``` criteriaQuery = builder.createQuery(Long.class);
    Root```<Account>``` accountRoot = criteriaQuery.from(Account.class);

    List``<Predicate>`` predicateList = new ArrayList<>(); // 将进入 where 子句的谓词列表
    predicateList.add(builder.equal(accountRoot.get("permission"), permissionRepository.findByType("admin")));

    criteriaQuery
      .select(builder.count(accountRoot))
      .where(builder.and(predicateList.toArray(new Predicate[0])));

    return entityManager.createQuery(criteriaQuery).getSingleResult();
}
```

### **4.3. 根据多个条件统计结果行**

在我们的谓词中，我们可以为过滤我们的查询添加多个条件。构建器实例提供了条件方法，例如 _equal()_ 和 _greaterThan_ _()_，以支持查询中的条件：

```java
public long getAccountsByPermissionAndCreateOnUsingCQ() throws ParseException {
    CriteriaBuilder builder = entityManager.getCriteriaBuilder();
    CriteriaQuery```<Long>``` criteriaQuery = builder.createQuery(Long.class);
    Root```<Account>``` accountRoot = criteriaQuery.from(Account.class);

    List``<Predicate>`` predicateList = new ArrayList<>();
    predicateList.add(builder.equal(accountRoot.get("permission"), permissionRepository.findByType("reader")));
    predicateList.add(builder.greaterThan(accountRoot.get("createdOn"), new Timestamp(getDate().getTime())));

    criteriaQuery
      .select(builder.count(accountRoot))
      .where(builder.and(predicateList.toArray(new Predicate[0])));

    return entityManager.createQuery(criteriaQuery).getSingleResult();
}
```

## 5. 使用 JPQL 查询

执行计数的另一种方法是使用 JPQL。**JPQL 查询针对实体工作，而不是直接针对数据库，这或多或少看起来像 SQL 查询。** 我们总是可以编写一个 JPQL 查询来在 JPA 中计数行。

### **5.1. 统计所有行**

_entityManager_ 提供了一个 _createQuery()_ 方法，它接受 JPQL 查询作为参数，并对数据库执行该查询：

```java
public long getAccountsUsingJPQL() throws ParseException {
    Query query = entityManager.createQuery("SELECT COUNT(*) FROM Account a");
    return (long) query.getSingleResult();
}
```

### **5.2. 根据单个条件统计结果行**

在 JPQL 查询中，我们可以包括 _WHERE_ 条件，就像我们在原始 SQL 中做的那样，来过滤查询并计数返回的行：

```java
public long getAccountsByPermissionUsingJPQL() throws ParseException {
    Query query = entityManager.createQuery("SELECT COUNT(*) FROM Account a WHERE a.permission = ?1");
    query.setParameter(1, permissionRepository.findByType("admin"));
    return (long) query.getSingleResult();
}
```

### 5.3. 根据多个条件统计结果行

在 JPQL 查询中，我们可以在 _WHERE_ 子句中包括多个条件，就像我们在原始 SQL 中做的那样，来过滤查询并计数返回的行：

```java
public long getAccountsByPermissionAndCreatedOnUsingJPQL() throws ParseException {
    Query query = entityManager.createQuery("SELECT COUNT(*```java
FROM Account a WHERE a.permission = ?1 and a.createdOn > ?2");
    query.setParameter(1, permissionRepository.findByType("admin"));
    query.setParameter(2, new Timestamp(getDate().getTime()));
    return (long) query.getSingleResult();
}
```

## 6. 结论

在本文中，我们学习了在 JPA 中统计行数的不同方法。规范，如 _CriteriaBuilder_ 和 Spring Data JPA 查询派生，帮助我们轻松编写具有不同条件的计数查询。

尽管 _CriteriaQuery_ 和 Spring Data JPA 查询派生帮助我们构建不需要原始 SQL 知识的查询，但在某些用例中，我们可能想要使用 JPQL 编写原始 SQL。

如常，示例代码可在 GitHub 上找到。

[Baeldung Logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)[Gravatar Logo](https://secure.gravatar.com/avatar/d82fbabc9027e80cdaaff7c0646c9bf0?s=50&r=g)[Viniok Avatar](https://www.baeldung.com/wp-content/uploads/custom_avatars/viniok-150x150.jpg)[Announcement Icon](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)[Persistence Post Footer Main](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg)[Persistence Post Footer Icn](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png)

OK