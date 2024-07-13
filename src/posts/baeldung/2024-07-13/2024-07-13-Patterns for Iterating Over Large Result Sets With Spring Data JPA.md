---
date: 2024-07-14
category:
  - Spring Data JPA
  - 数据库操作
tag:
  - 分页查询
  - 大数据集处理
  - 流式处理
head:
  - - meta
    - name: keywords
      content: Spring Data JPA, 大数据集, 分页, 流式处理, 数据库操作
---
# 使用Spring Data JPA迭代大型结果集的模式

在本教程中，我们将**探索使用Spring Data JPA检索大型数据集的各种方式**。

首先，我们将使用分页查询，并看到_Slice_和_Page_之间的区别。之后，我们将学习如何从数据库流式传输和处理数据，而不需要收集它。

## 2. 分页查询

对于这种情况的常见方法是使用分页查询。为此，**我们需要定义一个批量大小并执行多个查询**。结果，我们将能够以较小的批量处理所有实体，避免在内存中加载大量数据。

对于本文中的代码示例，我们将使用_Student_实体作为数据模型：

```java
@Entity
public class Student {

    @Id
    @GeneratedValue
    private Long id;

    private String firstName;
    private String lastName;

    // 构造函数，getter和setter
}
```

让我们添加一个按_firstName_查询所有学生的方法。使用Spring Data JPA，我们只需要在_JpaRepository_中添加一个接收_Pageable_作为参数并返回_Slice_的方法：

```java
@Repository
public interface StudentRepository extends JpaRepository``<Student, Long>`` {
    Slice````````<Student>```````` findAllByFirstName(String firstName, Pageable page);
}
```

**我们可以注意到返回类型是_Slice````````<Student>````````_。_Slice_对象允许我们处理第一批_Student_实体。** _slice_对象公开了一个_hasNext()_方法，允许我们检查我们正在处理的批次是否是结果集的最后一个。

此外，我们可以通过方法_nextPageable()_从一个切片移动到下一个切片。这个方法返回了请求下一个切片所需的_Pageable_对象。因此，我们可以使用while循环内的两种方法组合，逐片检索所有数据：

```java
void processStudentsByFirstName(String firstName) {
    Slice````````<Student>```````` slice = repository.findAllByFirstName(firstName, PageRequest.of(0, BATCH_SIZE));
    List````````<Student>```````` studentsInBatch = slice.getContent();
    studentsInBatch.forEach(emailService::sendEmailToStudent);

    while(slice.hasNext()) {
        slice = repository.findAllByFirstName(firstName, slice.nextPageable());
        slice.get().forEach(emailService::sendEmailToStudent);
    }
}
```

让我们使用小批量大小进行简短的测试，并跟踪SQL语句。我们期望执行多个查询：

```sql
[main] DEBUG org.hibernate.SQL - select student0_.id as id1_0_, student0_.first_name as first_na2_0_, student0_.last_name as last_nam3_0_ from student student0_ where student0_.first_name=? limit ?
[main] DEBUG org.hibernate.SQL - select student0_.id as id1_0_, student0_.first_name as first_na2_0_, student0_.last_name as last_nam3_0_ from student student0_ where student0_.first_name=? limit ? offset ?
[main] DEBUG org.hibernate.SQL - select student0_.id as id1_0_, student0_.first_name as first_na2_0_, student0_.last_name as last_nam3_0_ from student student0_ where student0_.first_name=? limit ? offset ?
```

作为_Slice_ `````< >`````的替代品，我们还可以使用_Page_ `````< >`````作为查询的返回类型：

```java
@Repository
public interface StudentRepository extends JpaRepository``<Student, Long>`` {
    Slice````````<Student>```````` findAllByFirstName(String firstName, Pageable page);
    Page````````<Student>```````` findAllByLastName(String lastName, Pageable page);
}
```

**_Page_接口扩展了_Slice,_并添加了另外两个方法：_getTotalPages()_和_getTotalElements()_。**

_Page_通常用作通过网络请求分页数据时的返回类型。这样，调用者将确切知道还剩下多少行以及需要多少额外的请求。

另一方面，使用_Page_ s作为返回类型会导致额外的查询来计数符合标准的行：

```sql
[main] DEBUG org.hibernate.SQL - select student0_.id as id1_0_, student0_.first_name as first_na2_0_, student0_.last_name as last_nam3_0_ from student student0_ where student0_.last_name=? limit ?
[main] DEBUG org.hibernate.SQL - select count(student0_.id) as col_0_0_ from student student0_ where student0_.last_name=?
[main] DEBUG org.hibernate.SQL - select student0_.id as id1_0_, student0_.first_name as first_na2_0_, student0_.last_name as last_nam3_0_ from student student0_ where student0_.last_name=? limit ? offset ?
[main] DEBUG org.hibernate.SQL - select count(student0_.id) as col_0_0_ from student student0_ where student0_.last_name=?
[main] DEBUG org.hibernate.SQL - select student0_.id as id1_0_, student0_.first_name as first_na2_0_, student0_.last_name as last_nam3_0_ from student student0_ where student0_.last_name=? limit ? offset ?
```

**因此，我们只有在需要知道实体总数时才应该使用Page `````< >`````作为返回类型。**

## 3. 从数据库流式传输

Spring Data JPA还允许我们从结果集流式传输数据：

```java
Stream````````<Student>```````` findAllByFirstName(String firstName);
```

**结果，我们将逐个处理实体，而不需要同时将它们全部加载到内存中。** 然而，我们需要手动关闭由Spring Data JPA创建的流，使用try-with-resource块。此外，我们必须将查询包装在只读事务中。

最后，即使我们逐行处理，我们也必须确保持久性上下文没有保留对所有实体的引用。我们可以通过在消费流之前手动分离实体来实现这一点：

```java
private final EntityManager entityManager;

@Transactional(readOnly = true)
public void processStudentsByFirstNameUsingStreams(String firstName) {
    try (Stream````````<Student>```````` students = repository.findAllByFirstName(firstName)) {
        students.peek(entityManager::detach)
            .forEach(emailService::sendEmailToStudent);
    }
}
```

## 4. 结论

在本文中，我们探讨了处理大型数据集的各种方式。最初，我们通过多个分页查询实现了这一点。我们了解到，当调用者需要知道元素总数时，应使用_Page `````< >`````_作为返回类型，否则使用_Slice `````< >`````_。之后，我们学习了如何从数据库流式传输行并逐个处理它们。

如往常一样，代码示例可以在GitHub上找到。