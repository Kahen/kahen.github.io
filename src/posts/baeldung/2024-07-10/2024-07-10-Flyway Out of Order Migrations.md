---
date: 2022-04-01
category:
  - Database
  - Spring Boot
tag:
  - Flyway
  - Migrations
head:
  - - meta
    - name: keywords
      content: Flyway, Database Migrations, Spring Boot, Out of Order Migrations
---
# Flyway 无序迁移教程

在本教程中，我们将学习使用 Flyway 进行数据库迁移的基础知识，并看到一个特定的用例，即当我们需要按非顺序运行迁移时。

## 2. Flyway 简介

**Flyway 是一个通过迁移帮助进行数据库版本控制的工具。** 我们可以创建改变数据库状态的脚本，这些脚本被称为迁移。

我们需要迁移的情况有几种。例如，我们可能需要从先前的数据源填充我们的数据库。或者我们有一个已经发布的应用程序，它已经使用了一个数据库，我们需要部署一个依赖于修改后的数据库模式的新版本。在这两种情况下，我们都可以使用迁移来实现所需的结果。

**使用 Flyway，我们甚至可以将这些脚本上传到版本控制系统，以便我们能够追踪何时以及为什么需要引入特定的修改。**

## 3. 示例迁移

以我们的示例，我们将使用一个简单的 Spring Boot 应用程序，并以 Flyway 作为起点。

### 3.1. Maven 插件

首先，让我们将 Flyway Maven 插件添加到我们的 _pom.xml_：

```xml
`<build>`
    ...
    `<plugin>`
        `<groupId>`org.flywaydb`</groupId>`
        `<artifactId>`flyway-maven-plugin`</artifactId>`
        `<version>`10.7.1`</version>`
    `</plugin>`
    ...
`</build>`
```

我们需要这个插件来运行不同的 Flyway 目标。然而，在我们使用它之前，我们需要配置这个插件。这可能包括设置数据库 URL、用户名和密码等。

### 3.2. 迁移脚本

**让我们在项目中 _db/out-of-order-migration_ 目录下创建两个 SQL 迁移。** 我们必须遵循这些文件的命名约定。让我们将我们的第一个脚本命名为 _V1\_0\_\_create\_city\_table.sql_：

```sql
create table city (
  id numeric,
  name varchar(50),
  constraint pk_city primary key (id)
);
```

然后，创建另一个名为 _V2\_0\_\_create\_person\_table.sql_ 的脚本：

```sql
create table person (
  id numeric,
  name varchar(50),
  constraint pk_person primary key (id)
);
```

让我们执行这些迁移：

```shell
mvn -Dflyway.user=sa -Dflyway.url=jdbc:h2:file:./database -Dflyway.locations=filesystem:db/out-of-order-migration flyway:migrate
```

**在这个命令中，我们使用了 flyway 插件的 _migrate_ 目标** 并带有与数据库相关的三个参数。首先，我们设置了用户名，然后是数据库所在的 URL，最后是迁移脚本的位置。

作为这个命令的结果，Flyway 成功运行了我们的两个脚本。我们甚至可以检查状态：

```shell
mvn -Dflyway.user=sa -Dflyway.url=jdbc:h2:file:./database -Dflyway.locations=filesystem:db/out-of-order-migration flyway:info
```

这将打印以下消息：

```
Schema version: 2.0
+-----------+---------+---------------------+------+---------------------+---------+
| Category  | Version | Description         | Type | Installed On        | State   |
+-----------+---------+---------------------+------+---------------------+---------+
| Versioned | 1.0     | create city table   | SQL  | 2023-01-02 21:08:45 | Success |
| Versioned | 2.0     | create person table | SQL  | 2023-01-02 21:08:45 | Success |
+-----------+---------+---------------------+------+---------------------+---------+
```

当我们添加新的迁移时，Flyway 可以检测到变化并执行最新的迁移。**然而，当最新脚本的版本号不是最高的时候，这就成了问题。** 换句话说，它是无序的。

默认情况下，Flyway 会忽略我们最新的迁移。幸运的是，我们可以解决这个问题。**我们可以使用 _outOfOrder_ 配置参数来告诉 Flyway 运行这些脚本而不是跳过它们。**

让我们通过在我们的项目中添加一个名为 _V1\_1\_\_add\_zipcode\_to\_city.sql_ 的新迁移来尝试：

```sql
alter table city add column (
  zip varchar(10)
);
```

这个脚本的版本是 1.1，但根据 Flyway，我们已经迁移到了 2.0 版本。这意味着脚本将被忽略。我们甚至可以使用 _info_ 命令来检查它：

```shell
mvn -Dflyway.user=sa -Dflyway.url=jdbc:h2:file:./database -Dflyway.locations=filesystem:db/out-of-order-migration flyway:info
```

Flyway 识别了脚本，但状态是被忽略的：

```
+-----------+---------+---------------------+------+---------------------+---------+
| Category  | Version | Description         | Type | Installed On        | State   |
+-----------+---------+---------------------+------+---------------------+---------+
| Versioned | 1.0     | create city table   | SQL  | 2023-01-02 21:08:45 | Success |
| Versioned | 2.0     | create person table | SQL  | 2023-01-02 21:08:45 | Success |
| Versioned | 1.1     | add zipcode to city | SQL  |                     | Ignored |
+-----------+---------+---------------------+------+---------------------+---------+
```

**现在，如果我们再次获取状态但添加了 _outOfOrder_ 标志，结果会有所不同：**

```shell
mvn -Dflyway.user=sa -Dflyway.url=jdbc:h2:file:./database -Dflyway.locations=filesystem:db/out-of-order-migration -Dflyway.outOfOrder=true flyway:info
```

最新迁移的状态变为待定：

```
+-----------+---------+---------------------+------+---------------------+---------+
| Category  | Version | Description         | Type | Installed On        | State   |
+-----------+---------+---------------------+------+---------------------+---------+
| Versioned | 1.0     | create city table   | SQL  | 2023-01-02 21:08:45 | Success |
| Versioned | 2.0     | create person table | SQL  | 2023-01-02 21:08:45 | Success |
| Versioned | 1.1     | add zipcode to city | SQL  |                     | Pending |
+-----------+---------+---------------------+------+---------------------+---------+
```

这意味着我们可以运行迁移命令并应用更改。**尽管，我们也必须在这里添加 _outOfOrder_ 标志：**

```shell
mvn -Dflyway.user=sa -Dflyway.url=jdbc:h2:file:./database -Dflyway.locations=filesystem:db/out-of-order-migration -Dflyway.outOfOrder=true flyway:migrate
```

我们成功执行了新更改：

```
[INFO] Successfully validated 3 migrations (execution time 00:00.015s)
[INFO] Current version of schema "PUBLIC": 2.0
[WARNING] outOfOrder mode is active. Migration of schema "PUBLIC" may not be reproducible.
[INFO] Migrating schema "PUBLIC" to version "1.1 - add zipcode to city" [out of order]
[INFO] Successfully applied 1 migration to schema "PUBLIC", now at version v1.1 (execution time 00:00.019s)
```

**这些迁移在被 Flyway 应用后有不同的状态。** 我们的前两个迁移处于“成功”状态，但第三个即使成功也是“无序”的：

```
+-----------+---------+---------------------+------+---------------------+--------------+
| Category  | Version | Description         | Type | Installed On        | State        |
+-----------+---------+---------------------+------+---------------------+--------------+
| Versioned | 1.0     | create city table   | SQL  | 2023-01-02 21:08:45 | Success      |
| Versioned | 2.0     | create person table | SQL  | 2023-01-02 21:08:45 | Success      |
| Versioned | 1.1     | add zipcode to city | SQL  | 2023-01-02 21:17:38 | Out of Order |
+-----------+---------+---------------------+------+---------------------+--------------+
```

## 5. 结论

在本教程中，我们简要介绍了 Flyway 迁移，并专注于一个特定的用例。**我们找到了一种方法来运行那些根据它们的版本号被认为无序的迁移。** 然后，我们将这个解决方案应用到了我们的项目中。

如常，这些示例的源代码可以在 GitHub 上找到。