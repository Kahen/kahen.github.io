---
date: 2024-06-22
category:
  - Spring Boot
  - Pagination
tag:
  - Spring Data
  - JPA
head:
  - - meta
    - name: keywords
      content: Spring Boot, Pagination, Spring Data, JPA
------
# 在Spring Boot分页查询方法中一次性获取所有结果

在Spring Boot应用程序中，我们经常需要将表格数据以每次20行或50行的块呈现给客户端。分页是返回大型数据集中一部分数据的常见做法。然而，在某些场景下，我们需要一次性获取所有结果。

在本教程中，我们首先回顾了如何在Spring Boot中使用分页来检索数据。接下来，我们将探讨如何一次性从数据库表中检索所有结果。最后，我们将深入到一个更复杂的情景，即检索具有关系的数据显示。

## 2. 仓库（Repository）

仓库是Spring Data接口，提供了数据访问抽象。根据我们选择的仓库子接口，抽象提供了一组预定义的数据库操作。我们不需要为标准数据库操作如选择、保存和删除编写代码。我们所需做的只是为我们的实体创建一个接口，并将其扩展到所选的仓库子接口。

在运行时，Spring Data为我们的仓库创建了一个代理实现，该代理处理我们仓库的方法调用。当我们在仓库接口上调用一个方法时，Spring Data会根据方法和参数动态生成查询。

Spring Data在仓库中定义了三个常见的子接口：

- CrudRepository - Spring Data提供的最基本的仓库接口。它提供了CRUD（创建、读取、更新和删除）实体操作。
- PagingAndSortingRepository - 它扩展了CrudRepository接口，并增加了支持分页访问和结果排序的附加方法。
- JpaRepository - 它扩展了PagingAndSortingRepository接口，并引入了JPA特定的操作，例如保存和刷新实体以及批量删除实体。

## 3. 获取分页数据

让我们从一个简单的场景开始，使用分页从数据库获取数据。我们首先创建一个Student实体类：

```java
@Entity
@Table(name = "student")
public class Student {
    @Id
    @Column(name = "student_id")
    private String id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;
}
```

随后，我们将为从数据库检索Student实体创建一个StudentRepository。JpaRepository接口默认包含findAll(Pageable pageable)方法。因此，我们不需要定义额外的方法，假设我们只想以分页的方式检索数据而不选择字段：

```java
public interface StudentRepository extends JpaRepository````<Student, String>```` {
}
```

我们可以通过在StudentRepository上调用findAll(Pageable)来获取Student的第一页，每页10行。第一个参数表示当前页，从零开始索引，而第二个参数表示每页获取的记录数：

```java
Pageable pageable = PageRequest.of(0, 10);
Page`````````<Student>````````` studentPage = studentRepository.findAll(pageable);
```

通常，我们需要返回按特定字段排序的分页结果。在这种情况下，我们在创建Pageable实例时提供一个Sort实例。这个例子显示我们将按Student中的id字段升序排序页面结果：

```java
Sort sort = Sort.by(Sort.Direction.ASC, "id");
Pageable pageable = PageRequest.of(0, 10).withSort(sort);
Page`````````<Student>````````` studentPage = studentRepository.findAll(pageable);
```

## 4. 获取所有数据

一个常见的问题经常会出现：如果我们想一次性检索所有数据怎么办？我们需要调用findAll()来获取所有数据吗？答案是不。Pageable接口定义了一个静态方法unpaged()，它返回一个不包含分页信息的预定义Pageable实例。我们可以通过调用带有该Pageable实例的findAll(Pageable)来获取所有数据：

```java
Page`````````<Student>````````` studentPage = studentRepository.findAll(Pageable.unpaged());
```

如果我们需要对结果进行排序，我们可以从Spring Boot 3.2开始，将Sort实例作为参数传递给unpaged()方法。例如，假设我们想按lastName字段升序排序结果：

```java
Sort sort = Sort.by(Sort.Direction.ASC, "lastName");
Page`````````<Student>````````` studentPage = studentRepository.findAll(Pageable.unpaged(sort));
```

然而，在3.2以下的版本中实现相同的功能有点棘手，因为unpaged()不接受任何参数。相反，我们必须创建一个带有最大页面大小和Sort参数的PageRequest：

```java
Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE).withSort(sort);
Page`````````<Student>````````` studentPage = studentRepository.getStudents(pageable);
```

## 5. 获取具有关系的数据

我们经常在对象关系映射（ORM）框架中定义实体之间的关系。使用JPA等ORM框架可以帮助开发人员快速建模实体和关系，并且无需编写SQL查询。

然而，如果我们不完全理解其工作原理，尝试从具有关系的实体中检索一系列结果可能会引起潜在问题，这可能会导致性能影响，特别是当获取所有数据时。

### 5.1. N+1问题

让我们通过一个例子来说明问题。考虑我们的Student实体有一个额外的多对一映射：

```java
@Entity
@Table(name = "student")
public class Student {
    @Id
    @Column(name = "student_id")
    private String id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id", referencedColumnName = "school_id")
    private School school;

    // getters and setters
}
```

现在，每个Student都与一个School关联，我们定义School实体如下：

```java
@Entity
@Table(name = "school")
public class School {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "school_id")
    private Integer id;

    private String name;

    // getters and setters
}
```

现在，我们想从数据库中检索所有Student记录，并调查JPA实际发出的SQL查询数量。Hypersistence Utilities是一个数据库实用程序库，它提供了assertSelectCount()方法来识别执行的select查询数量。让我们在pom.xml文件中包含它的Maven依赖项：

```xml
`<dependency>`
    `<groupId>`io.hypersistence`</groupId>`
    `<artifactId>`hypersistence-utils-hibernate-62`</artifactId>`
    `<version>`3.7.0`</version>`
`</dependency>`
```

现在，我们创建一个测试用例来检索所有Student记录：

```java
@Test
public void whenGetStudentsWithSchool_thenMultipleSelectQueriesAreExecuted() {
    Page`````````<Student>````````` studentPage = studentRepository.findAll(Pageable.unpaged());
    List`<StudentWithSchoolNameDTO>` list = studentPage.getContent()
      .stream()
      .map(student -> modelMapper.map(student, StudentWithSchoolNameDTO.class))
      .collect(Collectors.toList());
    assertSelectCount((int) studentPage.getContent().size() + 1);
}
```

在完整的应用程序中，我们不想向客户端公开我们的内部实体。我们通常会将内部实体映射到外部DTO，然后将其返回给客户端。在这个例子中，我们采用ModelMapper将Student转换为StudentWithSchoolNameDTO，它包含来自Student的所有字段和来自School的名称字段：

```java
public class StudentWithSchoolNameDTO {
    private String id;
    private String firstName;
    private String lastName;
    private String schoolName;

    // constructor, getters and setters
}
```

让我们在执行测试用例后观察Hibernate日志：

```sql
Hibernate: select studentent0_.student_id as student_1_1_, studentent0_.first_name as first_na2_1_, studentent0_.last_name as last_nam3_1_, studentent0_.school_id as school_i4_1_ from student studentent0_
Hibernate: select schoolenti0_.school_id as school_i1_0_0_, schoolenti0_.name as name2_0_0_ from school schoolenti0_ where schoolenti0_.school_id=?
Hibernate: select schoolenti0_.school_id as school_i1_0_0_, schoolenti0_.name as name2_0_0_ from school schoolenti0_ where schoolenti0_.school_id=?
...
```

假设我们从数据库检索了N条Student记录。JPA不是执行对Student表的单个select查询，而是对School表执行了额外的N个查询，以获取每个Student的关联记录。

这种行为出现在ModelMapper转换过程中，当它尝试读取Student实例中的school字段时。这种在对象关系映射性能中的问题被称为N+1问题。

值得一提的是，JPA并不总是在每个Student获取时对School表发出N个查询。实际数量取决于数据。JPA具有一级缓存机制，确保它不会再次从数据库中获取缓存的School实例。

### 5.2. 避免获取关系

当返回DTO给客户端时，并不总是需要在实体类中包含所有字段。大多数情况下，我们只需要它们的一个子集。为了避免在实体中触发与关联关系的额外查询，我们只应该提取必要的字段。

在我们的示例中，我们可以创建一个指定的DTO类，其中仅包括来自Student表的字段。如果我们不访问school字段，JPA将不会对School执行任何额外的查询：

```java
public class StudentDTO {
    private String id;
    private String firstName;
    private String lastName;

    // constructor, getters and setters
}
```

这种方法假设我们在查询的实体类上定义的关联获取fetch type设置为执行关联实体的延迟获取：

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "school_id", referencedColumnName = "school_id")
private School school;
```

重要的是要注意，如果fetch属性设置为FetchType.EAGER，JPA将在获取Student记录后积极执行额外的查询，尽管之后没有访问该字段。

### 5.3. 自定义查询

每当DTO中需要School字段时，我们可以定义一个自定义查询，指示JPA在初始Student查询中执行fetch join，以积极地检索关联的School实体：

```java
public interface StudentRepository extends JpaRepository````<Student, String>```` {
    @Query(value = "SELECT stu FROM Student stu LEFT JOIN FETCH stu.school",
      countQuery = "SELECT COUNT(stu) FROM Student stu")
    Page`````````<Student>````````` findAll(Pageable pageable);
}
```

执行相同的测试用例时，我们可以从Hibernate日志中观察到现在只有一个连接Student和School表的查询被执行：

```sql
Hibernate: select s1_0.student_id,s1_0.first_name,s1_0.last_name,s2_0.school_id,s2_0.name
from student s1_0 left join school s2_0 on s2_0.school_id=s1_0.school_id
```

### 5.4. 实体图

一个更整洁的解决方案是使用@EntityGraph注解。这有助于通过在单个查询中获取实体而不是为每个关联执行额外的查询来优化检索性能。JPA使用此注解指定应积极获取哪些关联实体。

让我们看一个即席实体图示例，它定义了attributePaths来指示JPA在查询Student记录时获取School关联：

```java
public interface StudentRepository extends JpaRepository````<Student, String>```` {
    @EntityGraph(attributePaths = "school")
    Page`````````<Student>````````` findAll(Pageable pageable);
}
```

定义实体图的另一种方式是在Student实体上放置@NamedEntityGraph注解：

```java
@Entity
@Table(name = "student")
@NamedEntityGraph(name = "Student.school", attributeNodes = @NamedAttributeNode("school"))
public class Student {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id", referencedColumnName = "school_id")
    private School school;

    // 其他字段，getter和setter
}
```

随后，我们在StudentRepository的findAll()方法上添加@EntityGraph注解，并引用我们在Student类中定义的命名实体图：

```java
public interface StudentRepository extends JpaRepository````<Student, String>```` {
    @EntityGraph(value = "Student.school")
    Page`````````<Student>````````` findAll(Pageable pageable);
}
```

执行测试用例时，我们将看到JPA执行的连接查询与自定义查询方法相同：

```sql
Hibernate: select s1_0.student_id,s1_0.first_name,s1_0.last_name,s2_0.school_id,s2_0.name
from student s1_0 left join school s2_0 on s2_0.school_id=s1_0.school_id
```

## 6. 结论

在本文中，我们学习了如何在Spring Boot中对查询结果进行分页和排序，包括检索部分数据和全部数据。我们还学习了一些在Spring Boot中高效检索数据的做法，特别是处理关系时。

像往常一样，示例代码可在GitHub上找到。
OK