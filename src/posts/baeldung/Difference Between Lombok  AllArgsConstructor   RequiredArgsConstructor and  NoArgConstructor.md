由于我目前无法访问外部链接，包括您提供的链接，因此无法获取网页内容来进行翻译。请您提供网页的文本内容，或者直接告诉我需要翻译的具体内容，我将为您提供翻译服务。---
date: 2024-06-17
category:
  - Java
  - Lombok
tag:
  - Lombok
  - Annotations
  - Constructors
---

# Lombok @AllArgsConstructor, @RequiredArgsConstructor 和 @NoArgsConstructor 的区别 | Baeldung

## 1. 概述

Lombok 项目通过提供注解自动生成常用的代码，从而减少了Java应用程序中的样板代码。

在本教程中，我们将探讨这个库提供的三种构造函数注解之间的区别。

## 2. 设置

为了突出这些差异，让我们首先将 _lombok_ 添加到我们的依赖中：

```xml
`<dependency>`
    `<groupId>`org.projectlombok`</groupId>`
    `<artifactId>`lombok`</artifactId>`
    `<version>`1.18.30`</version>`
    `<scope>`provided`</scope>`
`</dependency>`
```

接下来，让我们创建一个类作为我们演示的基础：

```java
public class Person {
    private int age;
    private final String race;
    @NonNull
    private String name;
    private final String nickname = "unknown";
}
```

我们故意在 _Person_ 对象中散布了各种非访问修饰符，每种构造函数注解都以不同的方式处理它们。我们将使用这个类的不同名称副本进行以下各节。

顾名思义，**@AllArgsConstructor 注解生成一个初始化所有对象字段的构造函数**。用 _@NonNull_ 注解的字段在生成的构造函数中会进行 _null_ 检查。

让我们将注解添加到我们的类中：

```java
@AllArgsConstructor
public class AllArgsPerson {
    // ...
}
```

接下来，让我们触发生成的构造函数中的 _null_ 检查：

```java
@Test
void whenUsingAllArgsConstructor_thenCheckNotNullFields() {
    assertThatThrownBy(() -> {
        new AllArgsPerson(10, "Asian", null);
    }).isInstanceOf(NullPointerException.class)
      .hasMessageContaining("name is marked non-null but is null");
}
```

@AllArgsConstructor 为我们提供了一个 _AllArgsPerson_ 构造函数，其中包含了对象的所有必要字段。

## 4. @RequiredArgsConstructor

**@RequiredArgsConstructor 生成一个只初始化标记为 _final_ 或 _@NonNull_ 的字段的构造函数**，前提是它们在声明时没有被初始化。

让我们使用 _@RequiredArgsConstructor_ 更新我们的类：

```java
@RequiredArgsConstructor
public class RequiredArgsPerson {
    // ...
}

```

对于我们的 _RequiredArgsPerson_ 对象，这将导致一个只有两个参数的构造函数：

```java
@Test
void whenUsingRequiredArgsConstructor_thenInitializedFinalFieldsWillBeIgnored() {
    RequiredArgsPerson person = new RequiredArgsPerson("Hispanic", "Isabela");
    assertEquals("unknown", person.getNickname());
}
```

由于我们初始化了 _nickname_ 字段，尽管它是 _final_ 的，它也不会成为生成的构造函数参数的一部分。相反，它像其他非 _final_ 字段和没有标记为 _@NotNull_ 的字段一样被处理。

**像 @AllArgsConstructor 一样，@RequiredArgsConstructor 注解也为用 _@NonNull_ 标记的字段进行 _null_ 检查**，正如我们的单元测试所示：

```java
@Test
void whenUsingRequiredArgsConstructor_thenCheckNotNullFields() {
    assertThatThrownBy(() -> {
        new RequiredArgsPerson("Hispanic", null);
    }).isInstanceOf(NullPointerException.class)
      .hasMessageContaining("name is marked non-null but is null");
}
```

当使用 @AllArgsConstructor 或 @RequiredArgsConstructor 时，保持对象字段顺序至关重要。例如，如果我们在 _Person_ 对象中交换了 _name_ 和 _race_ 字段，由于它们的类型相同，这不会引起编译器的投诉。然而，我们库的现有用户可能会忽视调整构造函数参数的需要。

## 5. @NoArgsConstructor

通常，如果我们没有定义构造函数，Java会提供一个默认的。同样地，**@NoArgsConstructor 生成一个类没有参数的构造函数**，类似于默认构造函数。我们指定 _force_ 参数标志以避免由于未初始化的 _final_ 字段而引起的编译错误：

```java
@NoArgsConstructor(force = true)
public class NoArgsPerson {
    // ...
}
```

接下来，让我们检查未初始化字段的默认值：

```java
@Test
void whenUsingNoArgsConstructor_thenAddDefaultValuesToUnInitializedFinalFields() {
    NoArgsPerson person = new NoArgsPerson();
    assertNull(person.getRace());
    assertEquals("unknown", person.getNickname());
}
```

与其他字段不同，由于我们在声明时初始化了 _nickname_ 字段，它没有接收到 _null_ 的默认值。

## 6. 使用多个注解

在某些情况下，不同的需求可能导致使用多个注解。例如，如果我们希望提供静态工厂方法，但仍然需要默认构造函数以兼容外部框架，如JPA，**我们可以使用两个注解：**

```java
@RequiredArgsConstructor(staticName = "construct")
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
public class SpecialPerson {
    // ...
}
```

之后，让我们用示例值调用我们的静态构造函数：

```java
@Test
void whenUsingRequiredArgsConstructorWithStaticName_thenHideTheConstructor() {
    SpecialPerson person = SpecialPerson.construct("value1", "value2");
    assertNotNull(person);
}
```

在这种情况下，尝试实例化默认构造函数将导致编译错误。

## 7. 比较总结

让我们在表格中总结一下我们讨论的内容：

| 注解       | 生成的构造函数参数 | _@NonNull_ 字段 _null_ 检查 |
| ---------- | ------------------ | ---------------------- |
| @AllArgsConstructor | 所有对象字段（除了静态和已初始化的最终字段） | 是 |
| @RequiredArgsConstructor | 只有 _final_ 或 _@NonNull_ 字段 | 是 |
| @NoArgsConstructor | 无 | 否 |

## 8. 结论

在本文中，我们探讨了 Project Lombok 提供的构造函数注解。我们了解到 @AllArgsConstructor 初始化所有对象字段，而 @RequiredArgsConstructor 仅初始化 _final_ 和 _@NotNull_ 字段。此外，我们发现 @NoArgsConstructor 生成一个类似默认的构造函数，我们还讨论了这些注解如何一起使用。

如常，所有示例的源代码都可以在 GitHub 上找到。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。

OK