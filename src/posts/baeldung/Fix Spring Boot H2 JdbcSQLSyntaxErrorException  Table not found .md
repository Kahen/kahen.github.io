---
date: 2024-06-16
category:
  - Spring Boot
  - H2 Database
tag:
  - SQL Syntax Error
  - Table Not Found
---
修复Spring Boot H2 JdbcSQLSyntaxErrorException “找不到表” | Baeldung

### 1. 引言

H2提供了一个简单的内存数据库和轻量级数据库，Spring Boot可以自动配置，使开发人员能够轻松测试数据访问逻辑。

通常，正如其名称所示，_org.h2.jdbc.JdbcSQLSyntaxErrorException_被抛出以表示与SQL语法相关的错误。因此，消息“找不到表”表示H2未能找到指定的表。

因此，在本简短教程中，我们将学习如何产生并修复H2异常：_JdbcSQLSyntaxErrorException: 找不到表_。

### 2. 实践示例

现在我们知道了异常背后的原因，让我们看看如何在实践中重现它。

#### 2.1. H2配置

Spring Boot配置应用程序使用嵌入式数据库H2连接，使用用户名_sa_和空密码。因此，让我们将这些属性添加到_application.properties_文件中：

```
spring.datasource.url=jdbc:h2:mem:mydb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
```

现在，让我们假设我们有一个名为_person_的表。这里，我们将使用一个基本的SQL脚本来用数据填充数据库。默认情况下，Spring Boot会拾取_data.sql_文件：

```
INSERT INTO "person" VALUES (1, 'Abderrahim', 'Azhrioun');
INSERT INTO "person" VALUES (2, 'David', 'Smith');
INSERT INTO "person" VALUES (3, 'Jean', 'Anderson');
```

#### 2.2. 对象关系映射

接下来，让我们将表_person_映射到一个实体。为此，我们将依赖JPA注解。

例如，考虑_Person_实体：

```
@Entity
public class Person {

    @Id
    private int id;
    @Column
    private String firstName;
    @Column
    private String lastName;

    // 标准getter和setter
}
```

总的来说，_@Entity_注解表示我们的类是一个映射_person_表的实体。此外，_@Id_表示_id_属性代表主键，而_@Column_注解允许将表列绑定到实体字段。

接下来，让我们为实体_Person_创建一个JPA仓库：

```
@Repository
public interface PersonRepository extends JpaRepository`<Person, Integer>` {
}
```

值得注意的是，Spring Data JPA提供了_JpaRepository_接口，以简化存储和检索数据的逻辑。

现在，让我们尝试启动我们的Spring Boot应用程序，看看会发生什么。**查看日志，我们可以看到应用程序在启动时失败，出现_org.h2.jdbc.JdbcSQLSyntaxErrorException: 找不到表“person”_**：

```
Error starting ApplicationContext. To display the condition evaluation report re-run your application with 'debug' enabled.
...
at com.baeldung.h2.tablenotfound.TableNotFoundExceptionApplication.main(TableNotFoundExceptionApplication.java:10)
...
Caused by: org.h2.jdbc.JdbcSQLSyntaxErrorException: Table "person" not found (this database is empty); SQL statement:
...
```

**这里出问题的是_data.sql_脚本在Hibernate初始化之前执行**。**这就是为什么Hibernate找不到_person_表的原因**。

通常，这是现在的默认行为，以使基于脚本的初始化与其他数据库迁移工具（如Liquibase和Flyway）保持一致。

### 3. 解决方案

幸运的是，Spring Boot提供了一种方便的方式来解决这个限制。**我们可以简单地将属性_spring.jpa.defer-datasource-initialization_设置为_true_在_application.properties_中以避免异常**：

```
spring.jpa.defer-datasource-initialization=true
```

**这样，我们覆盖了默认行为，并将数据初始化推迟到Hibernate初始化之后**。

最后，让我们添加一个测试用例来确认一切按预期工作：

```
@SpringBootTest(classes = TableNotFoundExceptionApplication.class)
class TableNotFoundExceptionIntegrationTest {

    @Autowired
    private PersonRepository personRepository;

    @Test
    void givenValidInitData_whenCallingFindAll_thenReturnData() {
        assertEquals(3, personRepository.findAll().size());
    }
}
```

不出所料，测试成功通过。

### 4. 结论

在这篇简短的文章中，我们了解了H2抛出错误_JdbcSQLSyntaxErrorException_: _Table not found_的原因。然后，我们看到了如何在实践中重现异常以及如何修复它。

如常，示例的完整源代码可在GitHub上找到。

发表文章后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。