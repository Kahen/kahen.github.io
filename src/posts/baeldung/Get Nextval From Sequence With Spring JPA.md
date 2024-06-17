---
date: 2024-06-17
category:
  - Spring JPA
  - Database
tag:
  - Sequence
  - Nextval
---
# 使用Spring JPA从序列获取下一个值

序列是数据库中生成唯一ID的数字生成器，以避免重复条目。Spring JPA提供了在大多数情况下自动使用序列的方法。然而，在某些特定场景中，我们可能需要在持久化实体之前手动检索下一个序列值。例如，我们可能想在将发票详细信息保存到数据库之前生成一个唯一的发票号码。

在本教程中，我们将探讨使用Spring Data JPA从数据库序列获取下一个值的几种方法。

## 2. 设置项目依赖
在我们深入使用Spring Data JPA中的序列之前，让我们确保我们的项目正确设置。我们需要在我们的Maven _pom.xml_ 文件中添加Spring Data JPA和PostgreSQL驱动依赖，并在数据库中创建序列。

### 2.1. Maven依赖
首先，让我们向我们的Maven项目添加必要的依赖：

```
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-data-jpa``</artifactId>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.postgresql``</groupId>``
    ``<artifactId>``postgresql``</artifactId>``
    `<scope>`runtime`</scope>`
``</dependency>``
```

### 2.2. 测试数据
以下是我们用于在运行测试用例之前准备数据库的SQL脚本。我们可以将此脚本保存在 _.sql_ 文件中，并将其放置在我们的项目的 _src/test/resources_ 目录中：

```
DROP SEQUENCE IF EXISTS my_sequence_name;
CREATE SEQUENCE my_sequence_name START 1;
```

此命令创建一个从1开始的序列，每次调用 _NEXTVAL_ 递增1。

然后，我们使用 _@Sql_ 注解与 _executionPhase_ 属性设置为 _BEFORE_TEST_METHOD_ 在测试类中，在每个测试方法执行之前将测试数据插入数据库：

```
@Sql(scripts = "/testsequence.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
```

## 3. 使用 _@SequenceGenerator_
**Spring JPA可以在后台与序列一起工作，以在每次添加新项目时自动分配一个唯一数字。** 我们通常在JPA中使用 _@SequenceGenerator_ 注解来配置序列生成器。这个生成器可以用来自动在实体类中生成主键。

**此外，它通常与 _@GeneratedValue_ 注解结合使用，以指定生成主键值的策略。** 以下是我们如何使用 _@SequenceGenerator_ 配置主键生成的示例：

```
@Entity
public class MyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mySeqGen")
    @SequenceGenerator(name = "mySeqGen", sequenceName = "my_sequence_name", allocationSize = 1)
    private Long id;

    // 其他实体字段和方法
}
```

使用 _GenerationType.SEQUENCE_ 策略的 _@GeneratedValue_ 注解表明主键值将使用序列生成。**随后，_generator_ 属性将此策略与名为“ _mySeqGen_“的指定序列生成器关联。**

此外，_@SequenceGenerator_ 注解配置了名为“ _mySeqGen_“的序列生成器。它指定了数据库序列的名称“ _my_sequence_name_”和一个可选参数allocationSize。

**_allocationSize_ 是一个整数值，指定一次从数据库预取多少序列号码。** 例如，如果我们将 _allocationSize_ 设置为50，持久性提供者将一次性请求50个序列号码，并将它们内部存储。**然后，它使用这些预取的号码进行未来的实体ID生成。** 这对于写入量大的应用程序可能是有益的。

**有了这种配置，当我们持久化一个新的 _MyEntity_ 实例时，持久性提供者会自动从名为“ _my_sequence_name_“的序列中获取下一个值。** 检索到的序列号码随后在将其保存到数据库之前分配给实体的 _id_ 字段。

以下是在持久化实体后检索序列号码以及实体ID的示例：

```
MyEntity entity = new MyEntity();

myEntityRepository.save(entity);
long generatedId = entity.getId();

assertNotNull(generatedId);
assertEquals(1L, generatedId);
```

在保存实体后，我们可以使用实体对象上的 _getId()_ 方法访问生成的ID。

## 4. Spring Data JPA自定义查询
在某些场景中，我们可能需要在将其保存到数据库之前获取下一个数字或唯一ID。为此，Spring Data JPA提供了一种使用自定义查询查询下一个序列的方法。**这种方法涉及在存储库中使用原生SQL查询来访问序列。**

检索下一个值的具体语法取决于数据库系统。**例如，在PostgreSQL或Oracle中，我们使用 _NEXTVAL_ 函数来从序列中获取下一个值。** 以下是使用 _@Query_ 注解的示例实现：

```
@Repository
public interface MyEntityRepository extends JpaRepository`<MyEntity, Long>` {
    @Query(value = "SELECT NEXTVAL('my_sequence_name')", nativeQuery = true)
    Long getNextSequenceValue();
}
```

在示例中，我们使用 _@Query_ 注解注释了 _getNextSequenceValue()_ 方法。使用 _@Query_ 注解，我们可以指定一个原生SQL查询，使用 _NEXTVAL_ 函数从序列中检索下一个值。这使我们能够直接访问序列值：

```
@Autowired
private MyEntityRepository myEntityRepository;

long generatedId = myEntityRepository.getNextSequenceValue();

assertNotNull(generatedId);
assertEquals(1L, generatedId);
```

由于这种方法涉及编写数据库特定的代码，如果我们更改数据库，我们可能需要调整SQL查询。

## 5. 使用 _EntityManager_
或者，Spring JPA还提供了 _EntityManager_ API，我们可以使用它直接检索下一个序列值。**这种方法提供了更细粒度的控制，但绕过了JPA的对象关系映射特性。**

以下是我们如何在Spring Data JPA中使用 _EntityManager_ API检索序列的下一个值的示例：

```
@PersistenceContext
private EntityManager entityManager;

public Long getNextSequenceValue(String sequenceName) {
    BigInteger nextValue = (BigInteger) entityManager.createNativeQuery("SELECT NEXTVAL(:sequenceName)")
      .setParameter("sequenceName", sequenceName)
      .getSingleResult();
    return nextValue.longValue();
}
```

我们使用 _createNativeQuery()_ 方法创建一个原生SQL查询。在此查询中，调用 _NEXTVAL_ 函数以从序列中检索下一个值。**我们可以注意到PostgreSQL中的 _NEXTVAL_ 函数返回的是 _BigInteger_ 类型的值。因此，我们使用 _longValue()_ 方法将 _BigInteger_ 转换为 _Long_。**

有了 _getNextSequenceValue()_ 方法，我们可以这样调用它：

```
@Autowired
private MyEntityService myEntityService;

long generatedId = myEntityService.getNextSequenceValue("my_sequence_name");
assertNotNull(generatedId);
assertEquals(1L, generatedId);
```

## 6. 结论
在本文中，我们探讨了使用Spring Data JPA从数据库序列获取下一个值的各种方法。Spring JPA通过注解如 _@SequenceGenerator_ 和 _@GeneratedValue_ 提供了与数据库序列的无缝集成。在我们需要在保存实体之前获取下一个序列值的场景中，我们可以使用Spring Data JPA的自定义查询。

如常，示例的源代码可在GitHub上找到。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。