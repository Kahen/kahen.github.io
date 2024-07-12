---
date: 2022-04-01
category:
  - Java
  - Optional
tag:
  - Java
  - Optional
  - API
head:
  - - meta
    - name: keywords
      content: Java, Optional, API, Optional类, Java编程
---
# Java中Optional类的用途

在本教程中，我们将探讨Java中_Optional_类的目的以及在构建应用程序时使用它的一些优势。

## 2. Java中_Optional`<T>`_的目的

_Optional_类是一个表示某物存在或不存在的类。从技术上讲，_Optional_是一个泛型类型_T_的包装类，如果_T_为_null_，则_Optional_实例为空。否则，它是满的。

根据Java 11文档，_Optional_的**目的是在返回类型中提供一个可以表示值缺失的场景，其中返回_null_可能会导致意外的错误，**比如著名的_NullPointerException_。

### 2.1. 有用的方法

_Optional_类提供了有用的方法来帮助我们使用该API。本文中重要的方法是_of()_、_orElse()_和_empty()_方法：

- _of(T value)_返回一个包含值的_Optional_实例
- _orElse(T other)_返回_Optional_中的值，否则返回_other_
- 最后，_empty()_返回一个空的_Optional_实例

我们将看到这些方法在行动中，以构建返回_Optional_的代码和使用它的代码。

## 3. _Optional_的优势

我们已经看了_Optional_的目的和它的一些方法。但是，我们如何在我们的程序中从这个类中受益呢？在这一部分中，我们将看到一些使用它的方式，这有助于我们创建清晰和健壮的API。

### 3.1. _Optional_与_null_

在创建_Optional_类之前，我们表示值的缺失的方式是使用_null_。语言并不强制我们适当地处理_null_案例。换句话说，**_null_检查有时是必要的，但不是强制性的**。因此，创建返回_null_的方法被证明是一种产生意外的运行时错误的方式，比如_NullPointerException_。

另一方面，**_Optional_的实例应该在编译时总是被适当处理以获取其内部的值**。这种在编译时处理_Optional_的义务导致更少的意外_NullPointerException_s。

让我们尝试一个模拟数据库的_用户_的例子：

```java
public class User {
    public User(String id, String name) {
        this.id = id;
        this.name = name;
    }

    private String id;
    private String name;

    public String getName() {
        return name;
    }

    public String getId() {
        return id;
    }
}
```

让我们也定义一个返回_用户_的存储库类，如果没有找到，则返回_null_：

```java
public class UserRepositoryWithNull {
    private final List```<User>``` dbUsers = Arrays.asList(new User("1", "John"), new User("2", "Maria"), new User("3", "Daniel"));

    public User findById(String id) {
        for (User u : dbUsers) {
            if (u.getId().equals(id)) {
                return u;
            }
        }

        return null;
    }
}
```

现在，我们将编写一个单元测试，展示如果我们不使用_null_检查来解决_null_，代码将如何因_NullPointerException_而中断：

```java
@Test
public void givenNonExistentUserId_whenSearchForUser_andNoNullCheck_thenThrowException() {
    UserRepositoryWithNull userRepositoryWithNull = new UserRepositoryWithNull();
    String nonExistentUserId = "4";

    assertThrows(NullPointerException.class, () -> {
        System.out.println("User name: " + userRepositoryWithNull.findById(nonExistentUserId)
          .getName());
    });
}
```

**Java允许我们使用_findById()_返回的对象的_getName()_方法而不进行_null_检查。在这种情况下，我们只能在运行时发现问题。**

为了避免这种情况，我们可以创建另一个存储库，如果我们找到_用户_，我们就返回一个满的_Optional_。否则，我们返回一个空的。让我们在实践中看看这个：

```java
public class UserRepositoryWithOptional {
    private final List```<User>``` dbUsers = Arrays.asList(new User("1", "John"), new User("2", "Maria"), new User("3", "Daniel"));

    public Optional```<User>``` findById(String id) {
        for (User u : dbUsers) {
            if (u.getId().equals(id)) {
                return Optional.of(u);
            }
        }

        return Optional.empty();
    }
}
```

现在，当我们重写我们的单元测试时，我们可以看到我们必须首先处理_Optional_才能在找不到任何_用户_时获取它的值：

```java
@Test
public void givenNonExistentUserId_whenSearchForUser_thenOptionalShouldBeTreatedProperly() {
    UserRepositoryWithOptional userRepositoryWithOptional = new UserRepositoryWithOptional();
    String nonExistentUserId = "4";

    String userName = userRepositoryWithOptional.findById(nonExistentUserId)
      .orElse(new User("0", "admin"))
      .getName();

    assertEquals("admin", userName);
}
```

在上面的情况下，我们没有找到任何_用户_，所以我们可以使用_orElse()_方法返回一个默认用户。要获取它的值，必须在编译时适当处理_Optional_。有了这个，我们可以减少运行时的意外错误。

我们可以使用_orElseThrow()_代替提供默认的_orElse()_方法来抛出异常，或者使用_orElseGet()_调用_Supplier_函数。

### 3.2. 设计清晰的意图API

正如我们之前讨论的，_null_被广泛用来表示无。然而，_null_的含义只有创建API的人清楚。其他浏览该API的开发人员可能会为_null_找到不同的含义。

可能“Optional”这个名字是_Optional_在构建我们的API时成为有用工具的主要原因。**方法返回中的_Optional_提供了我们应该从该方法中期望什么的清晰意图：它返回某些东西或什么都不返回**。不需要任何文档来解释该方法的返回类型。代码自解释。

使用返回_null_的存储库，我们可能会以最坏的方式发现_null_表示数据库中没有找到_用户_。或者它可能代表其他事情，比如连接数据库时的错误，或者对象尚未初始化。很难知道。

另一方面，使用返回_Optional_实例的存储库，只需查看方法签名，就可以清楚地知道我们可能会或可能不会在数据库中找到用户。

**设计清晰API的一个重要做法是永远不要返回一个_null_ _Optional_**。方法应该总是返回一个有效的_Optional_实例，使用静态方法。

### 3.3. 声明式编程

使用_Optional_类的另一个很好的理由是能够使用一系列流畅的方法。它提供了一个类似于集合中的_stream()_的“伪流”，但只有一个值。这意味着我们可以在其上调用像_map()_和_filter()_这样的方法。这有助于创建更多的声明式程序，而不是命令式的。

假设要求是如果_用户_的名字以字母‘M’开头，则将其转换为大写。

首先，让我们看看使用不返回_Optional_的存储库的命令式方式：

```java
@Test
public void givenExistentUserId_whenFoundUserWithNameStartingWithMInRepositoryUsingNull_thenNameShouldBeUpperCased() {
    UserRepositoryWithNull userRepositoryWithNull = new UserRepositoryWithNull();

    User user = userRepositoryWithNull.findById("2");
    String upperCasedName = "";

    if (user != null) {
        if (user.getName().startsWith("M")) {
            upperCasedName = user.getName().toUpperCase();
        }
    }

    assertEquals("MARIA", upperCasedName);
}
```

现在，让我们看看使用_Optional_版本的存储库的声明式方式：

```java
@Test
public void givenExistentUserId_whenFoundUserWithNameStartingWithMInRepositoryUsingOptional_thenNameShouldBeUpperCased() {
    UserRepositoryWithOptional userRepositoryWithOptional = new UserRepositoryWithOptional();

    String upperCasedName = userRepositoryWithOptional.findById("2")
      .filter(u -> u.getName().startsWith("M"))
      .map(u -> u.getName().toUpperCase())
      .orElse("");

    assertEquals("MARIA", upperCasedName);
}
```

命令式方式需要两个嵌套的_if_语句来检查对象是否不是_null_并过滤用户名。如果未找到_用户_，则大写字符串保持为空。

在声明式方式中，我们使用lambda表达式来过滤名称，并将大写函数映射到找到的_用户_。如果未找到_用户_，我们使用_orElse()_返回一个空字符串。

使用哪一个仍然是个人偏好的问题。它们都达到了相同的结果。命令式方式需要更深入地了解代码的含义。例如，如果我们在第一个或第二个_if_语句中添加更多逻辑，可能会对该代码的意图产生一些混淆。在这种类型的情境中，**声明式编程清楚地说明了代码的意图**：返回大写名称，否则返回一个空字符串。

## 4. 结论

在本文中，我们探讨了_Optional_类的目的以及如何有效地使用它来设计清晰和健壮的API。

如往常一样，示例的源代码可在GitHub上找到。