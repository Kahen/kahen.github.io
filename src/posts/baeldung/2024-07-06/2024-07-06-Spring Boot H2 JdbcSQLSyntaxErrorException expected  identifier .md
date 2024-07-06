---
date: 2022-04-01
category:
  - Spring Boot
  - H2 Database
tag:
  - SQL Syntax Error
  - Exception Handling
head:
  - - meta
    - name: keywords
      content: Spring Boot, H2 Database, SQL Syntax Error, Exception Handling
---
# Spring Boot H2 JDBC SQLSyntaxErrorException：预期的“标识符”错误

在这篇简短的教程中，我们将仔细研究异常_org.h2.jdbc.JdbcSQLSyntaxErrorException: SQL语句中预期的“标识符”的语法错误_。

首先，我们将阐明异常的主要原因。然后，我们将使用一个实际的例子来说明如何重现它，最后，如何解决问题。

## 2. 原因

在跳转到解决方案之前，让我们先理解这个异常。

通常，H2抛出_JdbcSQLSyntaxErrorException_来表示SQL语句中的语法错误。因此，"预期标识符"的消息表明SQL期望一个合适的标识符，而我们没有给出。

**这种异常最常见的原因是使用保留关键字作为标识符**。

例如，使用关键字_table_来命名特定的SQL表将导致_JdbcSQLSyntaxErrorException_。

另一个原因可能是SQL语句中缺少或错误放置关键字。

## 3. 重现异常

作为开发人员，我们经常使用"_user"这个词来表示处理用户的表。不幸的是，在H2中它是一个保留关键字。

因此，为了重现异常，我们将假设使用关键字"_user"。

首先，让我们添加一个基本的SQL脚本来初始化并使用数据填充H2数据库：

```sql
INSERT INTO user VALUES (1, 'admin', 'p@ssw@rd');
INSERT INTO user VALUES (2, 'user', 'userpasswd');
```

接下来，我们将创建一个实体类来映射_user_表：

```java
@Entity
public class User {

    @Id
    private int id;
    private String login;
    private String password;

    // 标准getter和setter
}
```

请注意，_@Entity_是一个JPA注解，用于标识一个类为实体类。

此外，_@Id_表示映射数据库主键的字段。

现在，如果我们运行主应用程序，Spring Boot将以以下方式失败：

```java
org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'dataSourceScriptDatabaseInitializer'
...
nested exception is org.h2.jdbc.JdbcSQLSyntaxErrorException: Syntax error in SQL statement "INSERT INTO [*]user VALUES (1, 'admin', 'p@ssw@rd')"; expected "identifier"; SQL statement:
INSERT INTO user VALUES (1, 'admin', 'p@ssw@rd') [42001-214]
...
```

正如我们在日志中看到的，H2对插入查询抱怨，因为关键字_user_是保留的，不能用作标识符。

## 4. 解决方案

要修复异常，我们需要确保我们不使用SQL保留关键字作为标识符。

或者，我们可以使用分隔符来转义它们。H2支持双引号作为标准标识符分隔符。

所以首先，让我们双引号关键字_user_：

```sql
INSERT INTO "user" VALUES (1, 'admin', 'p@ssw@rd');
INSERT INTO "user" VALUES (2, 'user', 'userpasswd');
```

接下来，我们将为我们的实体_User_创建一个JPA存储库：

```java
@Repository
public interface UserRepository extends JpaRepository`<User, Integer>` {
}
```

现在，让我们添加一个测试用例来确认一切按预期工作：

```java
@Test
public void givenValidInitData_whenCallingFindAll_thenReturnData() {
    List`<User>` users = userRepository.findAll();

    assertThat(users).hasSize(2);
}
```

如上所示，_findAll()_执行其工作，并且没有失败_JdbcSQLSyntaxErrorException_。

避免异常的另一个方法是将_NON_KEYWORDS=user_附加到JDBC URL：

```properties
spring.datasource.url=jdbc:h2:mem:mydb;NON_KEYWORDS=user
```

这样，**我们告诉H2将_user_关键字从保留字列表中排除**。

如果我们使用hibernate，我们可以将_hibernate.globally_quoted_identifiers_属性设置为_true_。

```properties
spring.jpa.properties.hibernate.globally_quoted_identifiers=true
```

正如属性名称所暗示的，hibernate将自动引用所有数据库标识符。

话虽如此，**在使用_Table_或_Column_注解时，我们不需要手动转义表或列名**。

简而言之，这里有一些重要的要点需要考虑：

- 确保使用正确的SQL关键字并将它们放在正确的顺序
- 避免使用保留关键字作为标识符
- 仔细检查SQL中不允许的任何特殊字符
- 确保正确转义或引用任何保留关键字

## 5. 结论

在这篇短文中，我们详细解释了异常_org.h2.jdbc.JdbcSQLSyntaxErrorException: SQL语句中预期的“标识符”的语法错误_的原因。然后，我们展示了如何产生异常以及如何修复它。

如往常一样，示例的完整源代码可在GitHub上找到。