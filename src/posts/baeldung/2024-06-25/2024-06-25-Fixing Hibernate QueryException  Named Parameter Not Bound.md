---
date: 2024-06-25
category:
  - Hibernate
  - QueryException
tag:
  - QueryException
  - Named Parameter
head:
  - - meta
    - name: keywords
      content: Hibernate, QueryException, Named Parameter, SQL, Java
---

# 解决Hibernate查询异常：未绑定的命名参数

## 1. 概述

在这篇简短的教程中，我们将阐明如何解决Hibernate查询异常：“命名参数未绑定”。

首先，我们将解释异常的主要原因。然后，我们将演示如何重现它，最后，我们将学习如何修复它。

## 2. 理解异常

在跳转到解决方案之前，让我们尝试理解异常及其堆栈跟踪的含义。

简而言之，Hibernate抛出_QueryException_来表示在将Hibernate查询转换为SQL时由于无效语法而出现错误。因此，堆栈跟踪中的“命名参数未绑定”表示Hibernate无法绑定在特定查询中指定的命名参数。

通常，命名参数以冒号(:)开头，后面跟着实际值的占位符，该值需要在执行查询之前设置：

```
SELECT p FROM Person p WHERE p.firstName = :firstName;
```

我们异常最常见的原因之一是在Hibernate查询中忘记为命名参数分配值。

## 3. 重现异常

现在我们知道了异常的主要原因，让我们深入研究并使用一个实际的例子来查看如何重现它。

首先，让我们考虑这个_Person_实体类：

```
@Entity
public class Person {
    @Id
    private int id;
    private String firstName;
    private String lastName;

   // 标准的getter和setter
}
```

这里，_@Entity_注解表示我们的类是一个映射数据库表的实体。此外，_@Id_表示_id_属性代表主键。

现在，让我们创建一个带有命名参数的Hibernate查询，并假装忘记为我们的参数设置值：

```
@Test
void whenNotSettingValueToNamedParameter_thenThrowQueryException() {
    Exception exception = assertThrows(QueryException.class, () -> {
        Query``<Person>`` query = session.createQuery("FROM Person p WHERE p.firstName = :firstName", Person.class);
        query.list();
    });

    String expectedMessage = "Named parameter not bound";
    String actualMessage = exception.getMessage();

    assertTrue(actualMessage.contains(expectedMessage));
}
```

正如我们所见，测试用例因_QueryException_: "命名参数未绑定"而失败。这里的原因是Hibernate对命名参数_firstName_一无所知，并期望在执行查询之前设置此参数。

## 4. 修复异常

避免在这种情况下抛出_QueryException_的解决方案是在执行查询之前为命名参数分配一个值。为此，我们可以使用_setParameter()_方法：

```
@Test
void whenSettingValueToNamedParameter_thenDoNotThrowQueryException() {
    Query``<Person>`` query = session.createQuery("FROM Person p WHERE p.firstName = :firstName", Person.class);
    query.setParameter("firstName", "Azhrioun");

    assertNotNull(query.list());
}
```

如上所示，测试用例成功通过。_setParameter()_调用告诉Hibernate在执行查询时使用我们命名参数的哪个值。

## 5. 结论

在这篇简短的文章中，我们解释了Hibernate抛出_QueryException: “命名参数未绑定”_的原因。然后，我们使用一个实际的例子来说明如何重现异常以及如何修复它。

如往常一样，示例的完整源代码可以在GitHub上找到。
------