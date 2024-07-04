---
date: 2022-04-01
category:
  - Spring Data JPA
  - findBy vs findOneBy
tag:
  - Spring Data
  - JPA
  - findBy
  - findOneBy
head:
  - - meta
    - name: keywords
      content: Spring Data JPA, findBy, findOneBy, 查询方法, 数据访问
------
# Spring Data JPA 中 findBy 和 findOneBy 的区别

Spring Data 仓库提供了大量简化数据访问逻辑实现的方法。然而，选择适当的方法并不总是像我们期望的那样容易。

一个例子是带有 _findBy_ 和 _findOneBy_ 前缀的方法。尽管它们的名字看起来基于相同的事情，但它们有点不同。

Spring Data JPA 以其派生查询方法功能而广受赞誉。这些方法提供了一种从方法名称派生特定查询的方式。例如，如果我们想通过 _foo_ 属性检索数据，我们可以简单地写 _findByFoo()_。

通常，我们可以使用多个前缀来构建派生查询方法。这些前缀中包括 _findBy_ 和 _findOneBy_。让我们在实践中看看它们。

首先，让我们考虑 _Person_ 实体类：

```java
@Entity
public class Person {
    @Id
    private int id;
    private String firstName;
    private String lastName;

    // 标准 getter 和 setter
}
```

这里，我们将使用 H2 作为我们的数据库。让我们使用一个基本的 SQL 脚本来为数据库填充数据：

```sql
INSERT INTO person (id, first_name, last_name) VALUES(1, 'Azhrioun', 'Abderrahim');
INSERT INTO person (id, first_name, last_name) VALUES(2, 'Brian', 'Wheeler');
INSERT INTO person (id, first_name, last_name) VALUES(3, 'Stella', 'Anderson');
INSERT INTO person (id, first_name, last_name) VALUES(4, 'Stella', 'Wheeler');
```

最后，让我们创建一个 JPA 仓库来管理我们的 _Person_ 实体：

```java
@Repository
public interface PersonRepository extends JpaRepository`<Person, Integer>` {
}
```

### 3.1. _findBy_ 前缀
_findBy_ 是创建派生查询方法最常用的前缀之一，表示搜索查询。

**动词 _“find”_ 告诉 Spring Data 生成一个 _select_ 查询。另一方面，关键字 _“By”_ 作为 _where_ 子句，因为它过滤返回的结果。**

接下来，让我们向我们的 _PersonRepository_ 添加一个派生查询方法，根据名字获取一个人：

```java
Person findByFirstName(String firstName);
```

正如我们所看到的，我们的方法返回一个单一的 _Person_ 对象。现在，让我们为 _findByFirstName()_ 添加一个测试用例：

```java
@Test
void givenFirstName_whenCallingFindByFirstName_ThenReturnOnePerson() {
    Person person = personRepository.findByFirstName("Azhrioun");

    assertNotNull(person);
    assertEquals("Abderrahim", person.getLastName());
}
```

现在我们已经看到了如何使用 _findBy_ 创建一个返回单个对象的查询方法，让我们看看我们是否可以使用它来获取一系列对象。为此，我们将向我们的 _PersonRepository_ 添加另一个查询方法：

```java
List````<Person>```` findByLastName(String lastName);
```

顾名思义，这个新方法将帮助我们找到所有具有相同姓氏的对象。

同样，让我们使用另一个测试用例测试 _findByLastName()_：

```java
@Test
void givenLastName_whenCallingFindByLastName_ThenReturnList() {
    List````<Person>```` person = personRepository.findByLastName("Wheeler");

    assertEquals(2, person.size());
}
```

毫不奇怪，测试成功通过。

简而言之，**我们可以使用 _findBy_ 来获取一个对象或一系列对象。**
**这里的区别在于查询方法的返回类型。Spring Data 通过查看方法的返回类型来决定返回一个还是多个对象。**

### 3.2. _findOneBy_ 前缀
通常，_oneBy_ 只是 _findBy_ 的一个特定变体。**它明确表示寻找确切一条记录的意图。**让我们看看它是如何工作的：

```java
Person findOneByFirstName(String firstName);
```

接下来，我们将添加另一个测试来确认我们的方法工作正常：

```java
@Test
void givenFirstName_whenCallingFindOneByFirstName_ThenReturnOnePerson() {
    Person person = personRepository.findOneByFirstName("Azhrioun");

    assertNotNull(person);
    assertEquals("Abderrahim", person.getLastName());
}
```

现在，**如果我们使用 _findOneBy_ 来获取一系列对象会发生什么**？让我们找出答案！

首先，我们将添加另一个查询方法来查找所有具有相同姓氏的 _Person_ 对象：

```java
List````<Person>```` findOneByLastName(String lastName);
```

接下来，让我们使用一个测试用例测试我们的方法：

```java
@Test
void givenLastName_whenCallingFindOneByLastName_ThenReturnList() {
    List````<Person>```` persons = personRepository.findOneByLastName("Wheeler");

    assertEquals(2, persons.size());
}
```

如上所示，_oneByLastName()_ 返回一个列表，没有抛出任何异常。

从技术角度来看，_oneBy_ 和 _findBy_ 之间没有区别。然而，**使用前缀 _findOneBy_ 创建返回集合的查询方法在语义上没有意义。**

简而言之，前缀 _findOneBy_ 仅提供了返回一个对象的语义描述。

Spring Data 依赖于这个正则表达式来忽略动词 _“find”_ 和关键字 _“By”_ 之间的所有字符。因此，_findBy_, _findOneBy_, _findXyzBy_… 都是相似的。

在使用 _find_ 关键字创建派生查询方法时，需要注意几个关键点：

- 派生查询方法的重要部分是关键字 _find_ 和 _By_。
- 我们可以在 _find_ 和 _By_ 之间添加单词以表示语义。
- Spring Data 根据方法的返回类型决定返回一个对象还是集合。

## 4. _IncorrectResultSizeDataAccessException_
**这里需要提到的一个重要警告是，无论是 _findByLastName()_ 还是 _findOneByLastName()_ 方法，在返回结果不是预期大小时都会抛出 _IncorrectResultSizeDataAccessException_。**

例如，_Person findByFirstName(String firstName)_ 如果有多个给定名字的 _Person_ 对象，将会抛出异常。

所以，让我们使用一个测试用例来确认这一点：

```java
@Test
void givenFirstName_whenCallingFindByFirstName_ThenThrowException() {
    IncorrectResultSizeDataAccessException exception = assertThrows(IncorrectResultSizeDataAccessException.class, () -> personRepository.findByFirstName("Stella"));

    assertEquals("query did not return a unique result: 2", exception.getMessage());
}
```

异常的原因是尽管我们声明我们的方法返回一个对象，但执行的查询返回了多条记录。

同样，让我们使用一个测试用例确认 _findOneByFirstName()_ 抛出 _IncorrectResultSizeDataAccessException_：

```java
@Test
void givenFirstName_whenCallingFindOneByFirstName_ThenThrowException() {
    IncorrectResultSizeDataAccessException exception = assertThrows(IncorrectResultSizeDataAccessException.class, () -> personRepository.findOneByFirstName("Stella"));

    assertEquals("query did not return a unique result: 2", exception.getMessage());
}
```

## 5. 结论
在这篇文章中，我们详细探讨了 Spring Data JPA 中 _findBy_ 和 _findOneBy_ 前缀的相似之处和不同之处。

在此过程中，我们解释了 Spring Data JPA 中的派生查询方法。然后，我们强调了尽管 _findBy_ 和 _findOneBy_ 之间有不同的语义意图，但它们在内部是相同的。

最后，我们展示了如果我们选择了错误的返回类型，两者都会抛出 _IncorrectResultSizeDataAccessException_。

如往常一样，本文的完整代码可以在 GitHub 上找到。