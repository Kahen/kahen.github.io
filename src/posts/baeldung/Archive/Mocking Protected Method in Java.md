---
date: 2024-06-15
category:
  - Java
  - Mockito
tag:
  - 测试
  - Mockito
  - 反射
---
# 在Java中模拟受保护的方法

## 1. 概述

在Java中模拟受保护的方法与模拟公共方法类似，但有一个问题：测试类中该方法的可见性。我们可以从同一包中的类和继承自A类的类中看到类A的受保护方法。因此，如果我们尝试从不同包中测试类A，我们将面临问题。

在本教程中，我们将探讨在测试中模拟受保护方法的情况。我们将演示两种情况：可以访问该方法和不能访问。我们将使用Mockito间谍而不是模拟，因为我们只想存根测试类中的某些行为。

当我们可以访问Mockito中的受保护方法时，模拟是直接的。我们可以通过两种方式获得访问权限。首先，将受保护的范围更改为公共，或者第二，将测试类移动到与具有受保护方法的类相同的包中。

但有时这不是一个选项，因此一个替代方案是遵循间接实践。**不使用任何外部库的最常见方法有：**

- **使用JUnit5和反射**
- **使用内部测试类扩展要测试的类**

如果我们尝试更改访问修饰符，这可能会导致不想要的行为。使用最严格的访问级别是好的实践，除非有充分的理由不这样做。同样，如果将测试移动到与具有受保护方法的类相同的包中是有意义的，那么移动它是一个简单的选项。

如果这些选项都不适用于我们的情况，当只有一类A中的一个受保护方法需要存根时，使用JUnit5和反射是一个很好的选择。**对于一个类A，如果我们需要存根多个受保护方法，创建一个内部类扩展A是更干净的解决方案。**

## 3. 模拟可见的受保护方法

在这一部分，我们将处理测试可以访问受保护方法的情况，或者我们可以更改以获得访问权限的情况。如前所述，更改可能是**将访问修饰符设为公共或将测试移动到与具有受保护方法的类相同的包中**。

让我们以一个示例来看看Movies类，它有一个受保护的方法getTitle()来检索私有字段title的值。它还包含一个公共方法getPlaceHolder()，可供客户端使用：

```java
public class Movies {
    private final String title;

    public Movies(String title) {
        this.title = title;
    }

    public String getPlaceHolder() {
        return "Movie: " + getTitle();
    }

    protected String getTitle() {
        return title;
    }
}
```

在测试类中，首先，我们断言getPlaceholder()方法的初始值是我们期望的。然后我们使用Mockito间谍存根受保护方法的功能，并断言新值getPlaceholder()返回的包含getTitle()的存根值：

```java
@Test
void givenProtectedMethod_whenMethodIsVisibleAndUseMockitoToStub_thenResponseIsStubbed() {
    Movies matrix = Mockito.spy(new Movies("The Matrix"));
    assertThat(matrix.getPlaceHolder()).isEqualTo("Movie: The Matrix");

    doReturn("something else").when(matrix).getTitle();

    assertThat(matrix.getTitle()).isEqualTo("something else");
    assertThat(matrix.getPlaceHolder()).isEqualTo("Movie: something else");
}
```

## 4. 模拟不可见的受保护方法

接下来，让我们看看当我们无法访问Mockito中的受保护方法时如何进行模拟。我们将处理的用例是测试类与我们要存根的类在不同的包中。在这种情况下，我们有两个选项：

- JUnit5与反射
- 扩展具有受保护方法的类的内部类

### 4.1. 使用JUnit和反射

**JUnit5提供了一个类_ReflectionSupport_，它处理测试中的常见反射情况**，比如查找/调用方法等。让我们看看这与我们之前的代码是如何工作的：

```java
@Test
void givenProtectedMethod_whenMethodIsVisibleAndUseMockitoToStub_thenResponseIsStubbed() throws NoSuchMethodException {
    Movies matrix = Mockito.spy(new Movies("The Matrix"));
    assertThat(matrix.getPlaceHolder()).isEqualTo("Movie: The Matrix");

    ReflectionSupport.invokeMethod(
            Movies.class.getDeclaredMethod("getTitle"),
            doReturn("something else").when(matrix));

    assertThat(matrix.getPlaceHolder()).isEqualTo("Movie: something else");
}
```

在这里，我们使用_ReflectionSupport_的_invokeMethod()_将受保护方法的值设置为被存根的_Movie_对象，当被调用时。

### 4.2. 使用内部类

**我们可以通过创建一个扩展要测试的类的内部类来克服可见性问题，并使受保护方法可见**。如果我们需要在不同的测试类中模拟同一个类的受保护方法，内部类可以是一个独立的类。

在我们的例子中，将MoviesWrapper类作为测试类的内部类是有意义的，它扩展了我们之前代码中的Movies：

```java
private static class MoviesWrapper extends Movies {
    public MoviesWrapper(String title) {
        super(title);
    }

    @Override
    protected String getTitle() {
        return super.getTitle();
    }
}
```

这样，我们通过MoviesWrapper类访问Movies的getTitle()。如果我们使用独立类而不是内部类，方法访问修饰符可能需要变为公共。

然后测试使用MoviesWrapper类作为要测试的类。这样我们就有访问getTitle()的权限，并可以轻松地使用Mockito间谍进行存根：

```java
@Test
void givenProtectedMethod_whenMethodNotVisibleAndUseInnerTestClass_thenResponseIsStubbed() {
    MoviesWrapper matrix = Mockito.spy(new MoviesWrapper("The Matrix"));
    assertThat(matrix.getPlaceHolder()).isEqualTo("Movie: The Matrix");

    doReturn("something else").when(matrix).getTitle();

    assertThat(matrix.getPlaceHolder()).isEqualTo("Movie: something else");
}
```

## 5. 结论

在本文中，我们讨论了在Java中模拟受保护方法时的可见性困难，并展示了可能的解决方案。我们可能面临的每种用例都有不同的选项，根据示例，我们应该能够每次都选择正确的一个。

如往常一样，所有源代码都可以在GitHub上找到。翻译已经完成，以下是剩余部分的翻译：

## 5. 结论

在本文中，我们讨论了在Java中模拟受保护方法时的可见性困难，并展示了可能的解决方案。我们可能面临的每种用例都有不同的选项，根据示例，我们应该能够每次都选择正确的一个。

如往常一样，所有源代码都可以在GitHub上找到。

OK