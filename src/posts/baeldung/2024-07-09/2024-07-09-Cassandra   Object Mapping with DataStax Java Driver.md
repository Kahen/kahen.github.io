---
date: 2023-04-04
category:
  - Cassandra
  - Java
tag:
  - DataStax Java Driver
  - Object Mapping
head:
  - - meta
    - name: Cassandra Object Mapping with DataStax Java Driver
      content: Learn how to use the DataStax Java Driver to map objects to Cassandra tables with this tutorial.
---

# Cassandra – 使用DataStax Java Driver进行对象映射

本文将介绍如何使用DataStax Java Driver将对象映射到Cassandra表。

我们将学习如何定义实体、创建DAO，并使用Java Driver对Cassandra表执行CRUD操作。

## 2. 项目设置

我们将使用Spring Boot框架创建一个简单的应用程序，该程序将与Cassandra数据库交互。我们将使用Java Driver创建表、实体和DAO。然后，我们将使用DAO对表执行CRUD操作。

### 2.1. 依赖项

让我们从向项目添加所需的依赖项开始。我们将使用Spring Boot的Cassandra启动器来连接数据库：

```xml
``<dependency>``
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-data-cassandra````</artifactId>````
``</dependency>``
```

此外，我们将添加`java-driver-mapper-runtime`依赖项，用于将对象映射到Cassandra表：

```xml
``<dependency>``
    ````<groupId>````com.datastax.oss````</groupId>````
    ````<artifactId>````java-driver-mapper-runtime````</artifactId>````
    ```<version>```4.17.0```</version>```
``</dependency>``
```

最后，让我们配置注解处理器，以便在编译时生成DAO和映射器：

```xml
`<plugin>`
    ````<groupId>````org.apache.maven.plugins````</groupId>````
    ````<artifactId>````maven-compiler-plugin````</artifactId>````
    ```<version>```3.8.1```</version>```
    `<configuration>`
        `<annotationProcessorPaths>`
            `<path>`
                ````<groupId>````com.datastax.oss````</groupId>````
                ````<artifactId>````java-driver-mapper-processor````</artifactId>````
                ```<version>```4.13.0```</version>```
            `</path>`
        `</annotationProcessorPaths>`
    `</configuration>`
`</plugin>`
```

## 3. Cassandra 实体

让我们定义一个实体，我们可以将其映射到Cassandra表。我们将创建一个_User_类，它将代表_user_profile_表：

```java
@Entity
public class User {
    @PartitionKey
    private int id;
    private String userName;
    private int userAge;

    // getters and setters
}
```

**@Entity注解告诉映射器将这个类映射到一个表**。@PartitionKey注解告诉映射器使用_id_字段作为表的分区键。

映射器使用默认构造函数创建实体的新实例。因此，我们需要确保默认无参数构造函数是可访问的。如果我们创建了一个非默认构造函数，我们需要显式声明默认构造函数。

默认情况下，实体是可变的，所以我们必须声明getter和setter。稍后在教程中我们将看到如何改变这种行为。

### 3.1. 命名策略

**@NamingStrategy注解允许我们为表和列指定命名约定**。默认的命名策略是NamingConvention.SNAKE_CASE_INSENSITIVE。它在与数据库交互时将类名和字段名转换为蛇形命名。

例如，默认情况下，_userName_字段映射到数据库中的_user_name_列。如果我们将命名策略更改为NamingConvention.LOWER_CAMEL_CASE，_userName_字段将映射到数据库中的_userName_列。

### 3.2. 属性策略

@PropertyStrategy注解指定映射器将如何访问实体的属性。它有三个属性——mutable、getterStyle和setterStyle。

**mutable属性告诉映射器实体是否可变**。默认情况下是true。如果我们将其设置为false，映射器将使用“所有列”构造函数来创建实体的新实例。

“所有列”构造函数是一个构造函数，它以与实体中定义的顺序相同的顺序接受表的所有列作为参数。例如，如果我们有一个实体具有以下字段：_id_、_userName_和_userAge_，那么“所有列”构造函数看起来像这样：

```java
public User(int id, String userName, int userAge) {
    this.id = id;
    this.userName = userName;
    this.userAge = userAge;
}
```

除此之外，实体应该有getters但不需要有setters。可选地，并且按照惯例，字段可以是final。

getterStyle和setterStyle属性告诉映射器如何为实体找到getter和setter。它们都有两个可能的值——FLUENT和JAVA_BEANS。

如果设置为FLUENT，映射器将寻找与字段同名的方法。例如，如果字段是_userName_，映射器将寻找一个名为_userName()_的方法。

如果设置为JAVA_BEANS，映射器将寻找带有_get_或_set_前缀的方法。例如，如果字段是_userName_，映射器将寻找一个名为_getUserName()_的方法。

对于普通的Java类，getterStyle和setterStyle属性默认设置为JAVA_BEANS。然而，对于记录，它们默认设置为FLUENT。同样，对于记录，默认情况下mutable属性设置为false。

### 3.3. @CqlName

**@CqlName注解指定Cassandra数据库中表或列的名称**。由于我们想要将_User_实体映射到_user_profile_表，并将_userName_字段映射到表中的_username_列，我们可以使用@CqlName注解：

```java
@Entity
@CqlName("user_profile")
public class User {
    @PartitionKey
    private int id;
    @CqlName("username")
    private String userName;
    private int userAge;

    // getters and setters
}
```

对于遵循默认或指定命名策略的字段，不需要注解。

### 3.4. @PartitionKey 和 @ClusteringColumn

分区键和聚簇列分别使用@PartitionKey和@ClusteringColumn注解定义。在我们的例子中，_id_字段是分区键。如果我们想要按_userAge_字段对行进行排序，我们可以将@ClusteringColumn注解添加到_userAge_字段。

```java
@ClusteringColumn
private int userAge;
```

**实体中可以定义多个分区键和聚簇列**。分区顺序可以通过在注解内传递顺序来指定。例如，如果我们想要按_id_然后按_userName_对表进行分区，我们可以这样做：

```java
@PartitionKey(1)
private int id;
@PartitionKey(2)
@CqlName("username")
```

对于聚簇列也是类似的。

### 3.5. @Transient

@Transient注解告诉映射器忽略该字段。被标记为@Transient的字段将不会被映射到数据库中的列。它只会是Java对象的一部分。映射器不会尝试从数据库中读取或写入该字段的值。

除了在字段上的@Transient注解，我们还可以在实体上使用@TransientProperties注解来标记多个字段为瞬态。

### 3.6. @Computed

被标记为@Computed的字段被映射到数据库中的列，但它们不能由客户端设置。它们由存储在服务器上的数据库函数计算。

假设我们想要向实体中添加一个新字段，用于存储行的写入时间戳。我们可以添加如下实体：

```java
@Computed("writetime(userName)")
private long writeTime;
```

当_User_记录被创建时，映射器将调用_writetime()_方法，并将字段_writeTime_的值设置为函数的结果。

## 4. 层次实体

实体可以使用继承来定义。这是对具有许多共同字段的实体进行建模的好方法。

例如，我们可以有一个_user_profile_表，它具有所有用户的共同字段。然后我们可以有一个_admin_profile_表，它为管理员提供了额外的字段。

在这种情况下，我们可以为_user_profile_表定义一个实体，然后扩展它来创建_admin_profile_表的实体：

```java
@Entity
@CqlName("admin_profile")
public class Admin extends User {
    private String role;
    private String department;

    // getters and setters
}
```

_Admin_实体将拥有_User_实体的所有字段以及_role_和_department_的额外字段。我们应该注意到，@Entity注解只需要在具体类上。它不需要在抽象类或接口上。

### 4.1. 层次实体中的不可变性

如果子类被设置为不可变，子类的“所有列”构造函数需要调用父类的“所有列”构造函数。在这种情况下，参数的顺序应该是**子类的参数首先传递，然后是父类的参数**。

例如，我们可能为Admin实体创建一个“所有列”构造函数：

```java
public Admin(String role, String department, int id, String userName, int userAge) {
    super(id, userName, userAge);
    this.role = role;
    this.department = department;
}
```

### 4.2. @HierarchyScanStrategy

@HierarchyScanStrategy注解指定映射器应如何扫描实体的层次结构以查找注解。

它有三个字段：

- scanAncestors – 默认设置为true，映射器将扫描实体的整个层次结构。当设置为false时，映射器只扫描实体本身。
- highestAncestor – 当设置为一个类时，映射器将扫描实体的层次结构，直到达到