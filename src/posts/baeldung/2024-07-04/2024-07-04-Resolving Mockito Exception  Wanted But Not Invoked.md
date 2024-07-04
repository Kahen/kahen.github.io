---
date: 2022-04-01
category:
  - Mockito
  - Testing
tag:
  - Mockito
  - Testing
  - Exception
head:
  - - meta
    - name: keywords
      content: Mockito, Testing, Exception, Java
------
# 解决Mockito异常：期望调用但未被调用

在本教程中，我们将讨论在使用Mockito时可能遇到的一个常见错误。异常信息是：
```
期望调用但未被调用：
// 类名和位置
实际上，与此模拟对象没有交互。
```

让我们了解这个错误的潜在来源以及如何修复它。

## 2. 示例设置

首先，让我们创建稍后我们将模拟的类。它包含一个总是返回字符串"Baeldung"的方法：

```java
class Helper {
    String getBaeldungString() {
        return "Baeldung";
    }
}
```

现在让我们创建主类。它在类级别声明了一个Helper实例。**我们希望在单元测试期间模拟这个实例：**

```java
class Main {
    Helper helper = new Helper();

    String methodUnderTest(int i) {
        if (i > 5) {
            return helper.getBaeldungString();
        }
        return "Hello";
    }
}
```

除此之外，我们定义了一个接受一个整数作为参数并返回以下结果的方法：

- 如果整数大于5，则返回调用getBaeldungString()的结果
- 如果整数小于或等于5，则返回一个常量

## 3. 调用了实际方法而不是模拟方法

让我们尝试为我们的方法编写一个单元测试。我们将使用@Mock注解来创建一个模拟的Helper。我们还将调用MockitoAnnotations.openMocks()以启用Mockito注解。在测试方法中，我们将使用参数7调用methodUnderTest()并检查它是否委托给getBaeldungString()：

```java
class MainUnitTest {

    @Mock
    Helper helper;

    Main main = new Main();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void givenValueUpperThan5_WhenMethodUnderTest_ThenDelegatesToHelperClass() {
        main.methodUnderTest(7);
        Mockito.verify(helper)
          .getBaeldungString();
    }

}
```

现在让我们运行我们的测试：

```
期望调用但未被调用：
helper.getBaeldungString();
-> 在 com.baeldung.wantedbutnotinvocked.Helper.getBaeldungString(Helper.java:6)
实际上，与这个模拟对象没有交互。
```

问题是我们调用了构造函数来实例化一个Main对象。因此，Helper实例是通过调用new()创建的。**因此，我们使用了一个真实的Helper对象而不是我们的模拟。** 为了解决这个问题，我们需要在我们的Main对象创建上添加@InjectMocks：

```java
@InjectMocks
Main main = new Main();
```

作为旁注，如果我们在methodUnderTest()的任何时候用一个真实的对象替换模拟实例，我们将再次遇到同样的问题：

```java
String methodUnderTest(int i) {
    helper = new Helper();
    if (i > 5) {
        return helper.getBaeldungString();
    }
    return "Hello";
}
```

简而言之，我们这里有两个注意事项：

- 模拟应该被正确创建并注入。
- 模拟在任何时候都不应被其他对象替换。

## 4. 方法未被调用

我们现在将编写一个新的单元测试。它将检查传递3作为参数给methodUnderTest()是否会导致调用getBaeldungString()：

```java
@Test
void givenValueLowerThan5_WhenMethodUnderTest_ThenDelegatesToGetBaeldungString() {
    main.methodUnderTest(3);
    Mockito.verify(helper)
      .getBaeldungString();
}
```

再次运行测试：

```
期望调用但未被调用：
helper.getBaeldungString();
-> 在 com.baeldung.wantedbutnotinvocked.Helper.getBaeldungString(Helper.java:6)
实际上，与这个模拟对象没有交互。
```

这一次，让我们仔细阅读错误消息。它说我们没有与模拟交互。现在让我们回顾一下方法的规范：3小于5，所以methodUnderTest()返回一个常量而不是委托给getBaeldungString()。**因此，我们的测试与规范相矛盾。**

在这种情况下，我们只有两个可能的结论：

- 规范是正确的：我们需要修复我们的测试，因为验证是无用的。
- 测试是正确的：我们的代码中有一个我们需要解决的bug。

## 5. 结论

在这篇文章中，我们在没有与模拟交互的情况下调用了Mockito.verify()并得到了一个错误。我们指出了我们需要正确地注入和使用模拟。我们还看到了由于测试不一致而出现这个错误。

像往常一样，代码可以在GitHub上找到。---
date: 2022-04-01
category:
  - Mockito
  - Testing
tag:
  - Mockito
  - Testing
  - Exception
head:
  - - meta
    - name: keywords
      content: Mockito, Testing, Exception, Java
---
# 解决Mockito异常：期望调用但未被调用

在本教程中，我们将讨论在使用Mockito时可能遇到的一个常见错误。异常信息是：
```
期望调用但未被调用：
// 类名和位置
实际上，与此模拟对象没有交互。
```

让我们了解这个错误的潜在来源以及如何修复它。

## 2. 示例设置

首先，让我们创建稍后我们将模拟的类。它包含一个总是返回字符串"Baeldung"的方法：

```java
class Helper {
    String getBaeldungString() {
        return "Baeldung";
    }
}
```

现在让我们创建主类。它在类级别声明了一个Helper实例。**我们希望在单元测试期间模拟这个实例：**

```java
class Main {
    Helper helper = new Helper();

    String methodUnderTest(int i) {
        if (i > 5) {
            return helper.getBaeldungString();
        }
        return "Hello";
    }
}
```

除此之外，我们定义了一个方法，它接受一个整数作为参数，并返回以下结果：

- 如果整数大于5，则返回调用`getBaeldungString()`的结果。
- 如果整数小于或等于5，则返回一个常量值。

## 3. 调用了实际方法而不是模拟方法

让我们尝试为我们的方法编写一个单元测试。我们将使用`@Mock`注解来创建一个模拟的`Helper`。我们还将调用`MockitoAnnotations.openMocks()`以启用Mockito注解。在测试方法中，我们将使用参数7调用`methodUnderTest()`并检查它是否委托给`getBaeldungString()`：

```java
class MainUnitTest {

    @Mock
    Helper helper;

    Main main = new Main();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void givenValueUpperThan5_WhenMethodUnderTest_ThenDelegatesToHelperClass() {
        when(main.helper.getBaeldungString()).thenReturn("Baeldung");
        assertEquals("Baeldung", main.methodUnderTest(7));
        verify(helper).getBaeldungString();
    }

}
```

如果我们运行这个测试，可能会遇到以下错误：

```
期望调用但未被调用：
helper.getBaeldungString();
-> 在 Helper.getBaeldungString(Helper.java:6)
实际上，与这个模拟对象没有交互。
```

问题在于我们通过调用构造函数来实例化一个`Main`对象。因此，`Helper`实例是通过调用`new()`创建的。**因此，我们使用的是一个真实的`Helper`对象而不是我们的模拟。** 为了解决这个问题，我们需要在`Main`对象创建上添加`@InjectMocks`：

```java
@InjectMocks
Main main = new Main();
```

作为补充，如果我们在`methodUnderTest()`的任何时候用一个真实的对象替换模拟实例，我们将再次遇到同样的问题：

```java
String methodUnderTest(int i) {
    helper = new Helper(); // 这里不应该替换模拟对象
    if (i > 5) {
        return helper.getBaeldungString();
    }
    return "Hello";
}
```

简而言之，我们这里有两个注意事项：

- 模拟应该被正确创建并注入。
- 模拟在任何时候都不应被其他对象替换。

## 4. 方法未被调用

我们现在将编写一个新的单元测试。它将检查传递3作为参数给`methodUnderTest()`是否会导致调用`getBaeldungString()`：

```java
@Test
void givenValueLowerThan5_WhenMethodUnderTest_ThenDoesNotDelegateToGetBaeldungString() {
    assertEquals("Hello", main.methodUnderTest(3));
    verify(helper, never()).getBaeldungString();
}
```

如果我们运行这个测试，我们可能会得到一个错误，因为根据`methodUnderTest()`的规范，当参数小于5时，它不应该调用`getBaeldungString()`。**因此，我们的测试与规范相矛盾。**

在这种情况下，我们只有两个可能的结论：

- 规范是正确的：我们需要修复我们的测试，因为验证是无用的。
- 测试是正确的：我们的代码中有一个我们需要解决的bug。

## 5. 结论

在本文中，我们调用了`Mockito.verify()`但没有与模拟交互，并得到了一个错误。我们指出了我们需要正确地注入和使用模拟。我们还看到了由于测试不一致而出现这个错误。

如往常一样，代码可以在GitHub上找到。

OK