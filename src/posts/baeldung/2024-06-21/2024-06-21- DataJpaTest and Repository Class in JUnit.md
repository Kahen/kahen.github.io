---
date: 2024-06-22
category:
  - Spring Boot
  - JUnit
tag:
  - DataJpaTest
  - Repository
head:
  - - meta
    - name: keywords
      content: Spring Data JPA, JUnit, Repository Testing

---
# @DataJpaTest 和 JUnit 中的 Repository 类

1. 引言

在使用 Spring Boot 应用程序和 Spring Data JPA 进行数据持久化时，测试与数据库交互的仓库至关重要。本教程将探讨如何使用 Spring Boot 提供的 @DataJpaTest 注解以及 JUnit 来有效测试 Spring Data JPA 仓库。

2. 理解 @DataJpaTest 和 Repository 类

在本节中，我们将深入了解 @DataJpaTest 和 Spring Boot 应用程序中类仓库之间的交互。

2.1. @DataJpaTest

@DataJpaTest 注解用于测试 Spring Boot 应用程序中的 JPA 仓库。它是一种专门的测试注解，为测试持久层提供了最小的 Spring 上下文。这个注解可以与 @RunWith 和 @SpringBootTest 等其他测试注解一起使用。

此外，@DataJpaTest 的作用域限于应用程序的 JPA 仓库层。它不会加载整个应用程序上下文，这可以使测试更快、更专注。此注解还为测试 JPA 实体提供了预配置的 EntityManager 和 TestEntityManager。

2.2. Repository 类

在 Spring Data JPA 中，仓库作为 JPA 实体之上的抽象层。它提供了一组执行 CRUD（创建、读取、更新、删除）操作和执行自定义查询的方法。这些仓库通常扩展自 JpaRepository 等接口，负责处理特定实体类型的数据库交互。

3. 可选参数

@DataJpaTest 有一些可选参数，我们可以用来自定义测试环境。

3.1. properties

此参数允许我们指定将应用于我们测试上下文的 Spring Boot 配置属性。这对于调整数据库连接详情、事务行为或与我们测试需求相关的其他应用程序属性非常有用：

```java
@DataJpaTest(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb",
    "spring.jpa.hibernate.ddl-auto=create-drop"
})
public class UserRepositoryTest {
    // ... 测试方法
}
```

3.2. showSql

这使我们的测试启用了 SQL 日志记录，并允许我们查看由仓库方法执行的实际 SQL 查询。此外，这可以帮助调试或理解 JPA 查询是如何转换的。默认情况下，SQL 日志记录是启用的。我们可以通过将值设置为 false 来关闭它：

```java
@DataJpaTest(showSql = false)
public class UserRepositoryTest {
    // ... 测试方法
}
```

3.3. includeFilters 和 excludeFilters

这些参数使我们能够在组件扫描期间包含或排除特定组件。我们可以使用它们来缩小扫描范围，并通过只关注相关组件来优化测试性能：

```java
@DataJpaTest(includeFilters = @ComponentScan.Filter(
    type = FilterType.ASSIGNABLE_TYPE,
    classes = UserRepository.class),
  excludeFilters = @ComponentScan.Filter(
    type = FilterType.ASSIGNABLE_TYPE,
    classes = SomeIrrelevantRepository.class))
public class UserRepositoryTest {
    // ... 测试方法
}
```

4. 关键特性

当涉及到在 Spring Boot 应用程序中测试 JPA 仓库时，@DataJpaTest 注解可以是一个方便的工具。让我们详细了解其关键特性和优势。

4.1. 测试环境配置

为 JPA 仓库设置适当的测试环境可能既耗时又棘手。@DataJpaTest 提供了一个现成的测试环境，包括测试 JPA 仓库所需的基本组件，如 EntityManager 和 DataSource。

这个环境专门设计用于测试 JPA 仓库。它确保我们的仓库方法在测试事务的上下文中运行，与像 H2 这样的安全、内存中的数据库交互，而不是生产数据库。

4.2. 依赖注入

@DataJpaTest 简化了我们测试类中的依赖注入过程。仓库以及其他基本 bean 自动注入到测试上下文中。这种无缝集成使开发人员能够专注于编写简洁有效的测试用例，而无需明确 bean 绑定的麻烦。

4.3. 默认回滚

此外，保持测试的独立性和可靠性至关重要。默认情况下，每个用 @DataJpaTest 注解的测试方法都在事务边界内运行。这确保了对数据库所做的更改在测试结束时自动回滚，为下一个测试留下一张干净的纸。

5. 配置和设置

要使用 @DataJpaTest，我们需要将 spring-boot-starter-test 依赖项添加到我们的项目中，范围为 "test"。这个轻量级依赖包括像 JUnit 这样的基本测试库，确保它没有包含在我们的生产构建中。

5.1. 向 pom.xml 添加依赖

让我们向 pom.xml 添加以下依赖：

```xml
`<dependency>`
    `<groupId>`org.springframework.boot`</groupId>`
    `<artifactId>`spring-boot-starter-test`</artifactId>`
    `<scope>`test`</scope>`
`</dependency>`
```

一旦我们添加了依赖项，我们就可以在测试中使用 @DataJpaTest 注解。这个注解为我们设置了一个内存中的 H2 数据库，并为我们配置了 Spring Data JPA，允许我们编写与我们的仓库类交互的测试。

5.2. 创建实体类

现在，让我们创建 User 实体类，它将表示用户数据：

```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;

    // getters and setters
}
```

5.3. 创建仓库接口

接下来，我们定义 UserRepository，一个用于管理 User 实体的 Spring Data JPA 仓库接口：

```java
public interface UserRepository extends JpaRepository```<User, Long>``` {
    // 如有需要，添加自定义方法
}

```

通过扩展 JpaRepository```<User, Long>```，我们的 UserRepository 获得了 Spring Data JPA 立即提供的标凊 CRUD 操作。

此外，我们还可以在此接口中定义自定义查询方法，以满足特定的数据访问检索需求，例如 findByUsername()：

```java
public interface UserRepository extends JpaRepository```<User, Long>``` {
    // 通过用户名查找用户的自定义查询方法
    User findByUsername(String username);
}
```

6. 实现仓库测试

为了测试应用程序的仓库层，我们将使用 @DataJpaTest 注解。使用此注解，将设置一个内存中的 H2 数据库，并将 Spring Data JPA 配置好。这允许我们编写与我们的仓库类交互的测试。

6.1. 设置测试类

首先，让我们通过用 @DataJpaTest 注解来设置测试类。这个注解扫描用 @Entity 注解的实体类和 Spring Data JPA 仓库接口。这确保了只有相关组件被加载用于测试，提高了测试的专注度和性能：

```java
@DataJpaTest
public class UserRepositoryTest {
    // 在这里添加测试方法
}
```

要创建一个仓库测试用例，我们首先需要将我们想要测试的仓库注入到我们的测试类中。这可以使用 @Autowired 注解来完成：

```java
@Autowired
private UserRepository userRepository;
```

6.2. 测试生命周期管理

在测试生命周期管理的背景下，@BeforeEach 和 @AfterEach 注解用于在每个测试方法之前和之后执行设置和清理操作。这确保了每个测试方法在干净和隔离的环境中运行，具有一致的初始条件和清理程序。

以下是我们如何将测试生命周期管理纳入我们的测试类：

```java
private User testUser;

@BeforeEach
public void setUp() {
    // 在每个测试方法之前初始化测试数据
    testUser = new User();
    testUser.setUsername("testuser");
    testUser.setPassword("password");
    userRepository.save(testUser);
}

@AfterEach
public void tearDown() {
    // 在每个测试方法之后释放测试数据
    userRepository.delete(testUser);
}
```

用 @BeforeEach 注解的方法 setUp() 中，我们可以执行每个测试方法执行之前所需的任何设置操作。这可能包括初始化测试数据、设置模拟对象或准备测试所需的资源。

相反，在用 @AfterEach 注解的方法 tearDown() 中，我们可以在每个测试方法执行后执行清理操作。这可能涉及重置测试期间所做的任何更改、释放资源或执行任何必要的清理任务，以将测试环境恢复到原始状态。

6.3. 测试插入操作

现在，我们可以编写与 JPA 仓库交互的测试方法。例如，我们可能想要测试我们可以将新用户保存到数据库中。由于用户在每个测试之前都会自动保存，我们可以直接专注于测试与 JPA 仓库的交互：

```java
@Test
void givenUser_whenSaved_thenCanBeFoundById() {
    User savedUser = userRepository.findById(testUser.getId()).orElse(null);
    assertNotNull(savedUser);
    assertEquals(testUser.getUsername(), savedUser.getUsername());
    assertEquals(testUser.getPassword(), savedUser.getPassword());
}
```

如果我们观察测试用例的控制台日志，我们会注意到以下日志：

```plaintext
Began transaction (1) for test context
.....
Rolled back transaction for test:
```

这些日志表明 @BeforeEach 和 @AfterEach 方法按预期工作。

6.4. 测试更新操作

此外，我们可以创建一个测试用例来测试更新操作：

```java
@Test
void givenUser_whenUpdated_thenCanBeFoundByIdWithUpdatedData() {
    testUser.setUsername("updatedUsername");
    userRepository.save(testUser);

