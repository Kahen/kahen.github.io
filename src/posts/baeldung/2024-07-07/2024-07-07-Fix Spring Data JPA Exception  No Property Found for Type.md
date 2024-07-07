---
date: 2022-04-01
category:
  - Spring Data JPA
  - Exception Handling
tag:
  - PropertyReferenceException
  - Spring Data
  - JPA
head:
  - - meta
    - name: keywords
      content: Spring Data JPA, JPA Exception, PropertyReferenceException
---

# 解决Spring Data JPA异常：未找到类型的属性

在这篇简短的文章中，我们将解释如何修复Spring Data JPA异常_"PropertyReferenceException: 未找到类型的属性"_。

首先，我们将解释导致此异常的主要原因。然后，我们将通过实际示例说明如何重现它，以及如何修复它。

## 2. 原因

在深入了解细节之前，让我们尝试理解异常的含义。

"未找到类型的属性"的堆栈跟踪简单地告诉我们，未找到指定的属性。当Spring Data无法访问不存在或未定义的属性时，会抛出此异常。

通常，Spring Data根据派生查询方法的名称自动生成SQL查询。因此，导致异常的最常见原因是**使用无效属性定义查询方法**。

另一个原因可能是**在访问属性时拼写属性名称错误**。

## 3. 重现异常

现在我们知道了异常的含义，让我们看看如何在实践中重现它。

例如，让我们考虑_Person_实体类：

```java
@Entity
public class Person {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String firstName;
    private String lastName;

    // 标准getter和setter
}
```

现在，让我们为我们的_Person_类创建一个Spring Data JPA仓库：

```java
@Repository
public interface PersonRepository extends JpaRepository`<Person, Integer>` {
}
```

接下来，我们将添加一个按名字查询人的查询方法。但是，让我们假设我们拼错了_firstName_属性。

例如，让我们写成_firsttName_：

```java
Person findByFirsttName(String lastName);
```

现在，如果我们启动Spring Boot应用程序，我们会得到：

```java
org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'personRepository' defined in com.baeldung.nopropertyfound.repository.PersonRepository ...
...
Caused by: java.lang.IllegalArgumentException: Failed to create query for method public abstract com.baeldung.nopropertyfound.model.Person com.baeldung.nopropertyfound.repository.PersonRepository.findByFirsttName(java.lang.String)!
No property 'firsttName' found for type 'Person'; Did you mean 'firstName'
...
Caused by: org.springframework.data.mapping.PropertyReferenceException: No property 'firsttName' found for type 'Person'; Did you mean 'firstName'
...
```

正如我们在日志中看到的，Spring Boot因_"PropertyReferenceException: 未找到Person类型的'firsttName'属性"_而失败。

**Spring Data在启动时自动检查生成的SQL查询是否有效**。

由于我们使用的属性不存在(_firsttName_)，Spring Data无法生成SQL查询，因此出现了异常。

## 4. **解决案**

**修复异常的唯一方法是：在定义查询方法时使用确切的属性名称**。

因此，要修复这个问题，我们需要将_findByFirsttName()_重命名为_findByFirstName()_。

```java
Person findByFirstName(String firstName);
```

现在，让我们通过一个测试用例来确认一切按预期工作：

```java
@Test
void givenQueryMethod_whenUsingValidProperty_thenCorrect() {

    Person person = personRepository.findByFirstName("Azhrioun");

    assertNotNull(person);
    assertEquals("Abderrahim", person.getLastName());
}
```

如上所示，查询方法_findByFirstName()_没有失败，并且能够按名字返回一个人。

总之，这里有一些关键点需要注意以避免_"PropertyReferenceException"_：

- 在定义查询方法时使用确切的属性名称。
- 避免使用缩写或拼写错误的名字。
- 再次检查实体类，确保我们要引用的属性存在并且拼写正确。
- 使用具有自动完成功能的代码编辑器，以减少拼写错误属性名称的风险。
- 为查询方法编写单元或集成测试，以确保它们返回预期结果。

## 5. 结论

总之，我们详细讨论了什么导致Spring Data抛出_"PropertyReferenceException: 未找到类型的属性"_。

在此过程中，我们使用实际示例说明了如何产生异常以及如何修复它。

如常，示例的完整源代码可在GitHub上获得。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/9a8dd50c78e0b9d049466e9097331198?s=50&r=g)![img](https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png)

OK