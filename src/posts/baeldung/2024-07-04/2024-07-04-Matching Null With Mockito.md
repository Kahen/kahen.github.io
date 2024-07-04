---
date: 2022-04-01
category:
  - Mockito
  - Testing
tag:
  - Mockito
  - Testing
head:
  - - meta
    - name: keywords
      content: Mockito, Testing, Java, Unit Test
---
# 使用Mockito匹配空值

在这个简短的教程中，我们将使用Mockito来检查是否将空值作为参数传递给方法。我们将看到如何直接匹配空值以及如何使用ArgumentMatchers进行匹配。

## 2. 示例设置

首先，我们创建一个简单的Helper类，它有一个单独的concat()方法，返回两个字符串的连接：

```java
class Helper {
    String concat(String a, String b) {
        return a + b;
    }
}
```

现在我们将添加一个Main类。它的methodUnderTest()方法调用concat()来连接字符串"Baeldung"和null：

```java
class Main {
    Helper helper = new Helper();

    String methodUnderTest() {
        return helper.concat("Baeldung", null);
    }
}
```

## 3. 仅使用确切值

让我们设置测试类：

```java
class MainUnitTest {
    @Mock
    Helper helper;

    @InjectMocks
    Main main;

    @BeforeEach
    void openMocks() {
        MockitoAnnotations.openMocks(this);
    }

    // 添加测试方法
}
```

我们通过@Mock创建了一个模拟的Helper。然后我们通过@InjectMocks将其注入到我们的Main实例中。最后，我们调用MockitoAnnotations.openMocks()来启用Mockito注解。

我们的目标是编写一个单元测试来验证methodUnderTest()是否委托给concat()。此外，我们希望确保第二个参数是null。让我们保持简单，检查调用的第一个参数是"Baeldung"，而第二个是null：

```java
@Test
void whenMethodUnderTest_thenSecondParameterNull() {
    main.methodUnderTest();
    Mockito.verify(helper)
      .concat("Baeldung", null);
}
```

我们调用Mockito.verify()来检查参数值是否符合预期。

## 4. 使用匹配器

现在我们将使用Mockito的ArgumentMatchers来检查传递的值。由于第一个值在我们的示例不相关，我们将使用any()匹配器：因此，任何输入都会通过。要检查第二个参数是null，我们可以简单地使用isNull()：

```java
@Test
void whenMethodUnderTest_thenSecondParameterNullWithMatchers() {
    main.methodUnderTest();
    Mockito.verify(helper)
      .concat(any(), isNull());
}
```

## 5. 结论

在本文中，我们学习了如何使用Mockito验证传递给方法的参数是否为null。我们通过检查确切值和使用ArgumentMatchers来完成这一点。

和往常一样，代码可以在GitHub上找到。---
date: 2022-04-01
category:
  - Mockito
  - 测试
tag:
  - Mockito
  - 测试
head:
  - - meta
    - name: keywords
      content: Mockito, 测试, Java, 单元测试
---
# 使用Mockito匹配空值

在这篇简短的教程中，我们将使用Mockito来检查是否将`null`作为参数传递给方法。我们将看到如何直接匹配`null`以及如何使用`ArgumentMatchers`。

## 2. 示例设置

首先，我们创建一个简单的`Helper`类，其中包含一个单独的`concat()`方法，该方法返回两个`String`的连接：

```java
class Helper {
    String concat(String a, String b) {
        return a + b;
    }
}
```

接下来，我们将添加一个`Main`类。它的方法`methodUnderTest()`调用`concat()`来连接字符串"Baeldung"和`null`：

```java
class Main {
    Helper helper = new Helper();

    String methodUnderTest() {
        return helper.concat("Baeldung", null);
    }
}
```

## 3. 仅使用确切值

让我们设置测试类：

```java
class MainUnitTest {
    @Mock
    Helper helper;

    @InjectMocks
    Main main;

    @BeforeEach
    void openMocks() {
        MockitoAnnotations.openMocks(this);
    }

    // 添加测试方法
}
```

我们通过`@Mock`创建了一个模拟的`Helper`。然后我们通过`@InjectMocks`将其注入到我们的`Main`实例中。最后，我们调用`MockitoAnnotations.openMocks()`来启用Mockito注解。

我们的目标是编写一个单元测试来验证`methodUnderTest()`是否委托给`concat()`。此外，我们想要确保第二个参数是`null`。让我们保持简单，检查调用的第一个参数是"Baeldung"，而第二个是`null`：

```java
@Test
void whenMethodUnderTest_thenSecondParameterNull() {
    main.methodUnderTest();
    Mockito.verify(helper)
      .concat("Baeldung", null);
}
```

我们调用了`Mockito.verify()`来检查参数值是否符合预期。

## 4. 使用匹配器

现在我们将使用Mockito的`ArgumentMatchers`来检查传递的值。由于第一个值在我们的示例中不相关，我们将使用`any()`匹配器：因此，任何输入都会通过。要检查第二个参数是`null`，我们可以简单地使用`isNull()`：

```java
@Test
void whenMethodUnderTest_thenSecondParameterNullWithMatchers() {
    main.methodUnderTest();
    Mockito.verify(helper)
      .concat(any(), isNull());
}
```

## 5. 结论

在这篇文章中，我们学习了如何使用Mockito验证传递给方法的参数是否为`null`。我们通过检查确切值和使用`ArgumentMatchers`来完成这一点。

正如往常，代码可以在GitHub上找到。

OK