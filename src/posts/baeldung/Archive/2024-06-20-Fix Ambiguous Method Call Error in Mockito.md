---
date: 2024-06-20
category:
  - Java
  - Mockito
tag:
  - Ambiguous Method Call
  - Mockito
  - Unit Testing
head:
  - - meta
    - name: keywords
      content: Mockito, Ambiguous Method Call, Unit Testing, Java
------
# 解决Mockito中的模糊方法调用错误

在本教程中，我们将了解如何在Mockito框架的特定上下文中避免模糊方法调用。

在Java中，方法重载允许一个类拥有多个具有相同名称但不同参数的方法。当编译器无法根据提供的参数确定要调用的具体方法时，就会发生模糊方法调用。

## 2. Mockito的_ArgumentMatchers_介绍

Mockito是一个用于单元测试Java应用程序的模拟框架。您可以在Maven中央仓库中找到该库的最新版本。让我们将依赖项添加到我们的_pom.xml_中：

```xml
`<dependency>`
    `<groupId>`org.mockito`</groupId>`
    `<artifactId>`mockito-core`</artifactId>`
    `<version>`5.11.0`</version>`
    `<scope>`test`</scope>`
`</dependency>`
```

**_ArgumentMatchers_是Mockito框架的一部分：得益于它们，我们可以在参数匹配给定条件时指定模拟方法的行为。**

## 3. 重载方法定义

首先，让我们定义一个接受_Integer_作为参数并总是返回_1_作为结果的方法：

```java
Integer myMethod(Integer i) {
    return 1;
}
```

为了我们的演示，我们希望我们的重载方法使用自定义类型。因此，让我们定义这个虚拟类：

```java
class MyOwnType {}
```

现在我们可以添加一个接受_MyOwnType_对象作为参数并总是返回_baeldung_作为结果的重载_myMethod()_：

```java
String myMethod(MyOwnType myOwnType) {
    return "baeldung";
}
```

**直观地说，如果我们向_myMethod()_传递一个_null_参数，编译器将不知道应该使用哪个版本。** 此外，我们可以注意到方法的返回类型对这个问题没有影响。

## 4. 使用_isNull()_的模糊调用

让我们尝试使用基本的_isNull()_ _ArgumentMatcher_来模拟一个带有null参数的_myMethod()_调用：

```java
@Test
void givenMockedMyMethod_whenMyMethod_ThenMockedResult(@Mock MyClass myClass) {
    when(myClass.myMethod(isNull())).thenReturn(1);
}
```

假设我们调用定义_myMethod()_的类_MyClass_，我们通过测试方法的参数漂亮地注入了一个模拟的_MyClass_对象。我们还可以注意到我们还没有向测试添加任何断言。让我们运行这段代码：

```java
java.lang.Error: Unresolved compilation问题:
The method myMethod(Integer) is ambiguous for the type MyClass
```

正如我们所见，编译器无法决定使用哪个版本的_myMethod()_，因此抛出了一个错误。让我们强调，编译器的决定仅基于方法参数。由于我们在指令中写入了_thenReturn(1)_，作为读者，我们可以猜测意图是使用返回_Integer_的_myMethod()_版本。然而，编译器在决策过程中不会使用指令的这一部分。

**要解决这个问题，我们需要使用接受类作为参数的重载_isNull()_ _ArgumentMatcher_。** 例如，要告诉编译器它应该使用以_Integer_作为参数的版本，我们可以这样写：

```java
@Test
void givenMockedMyMethod_whenMyMethod_ThenMockedResult(@Mock MyClass myClass) {
    when(myClass.myMethod(isNull(Integer.class))).thenReturn(1);
    assertEquals(1, myClass.myMethod((Integer) null));
}
```

我们添加了一个断言来完成测试，现在它成功运行了。同样，我们可以修改我们的测试以使用方法的另一个版本：

```java
@Test
void givenCorrectlyMockedNullMatcher_whenMyMethod_ThenMockedResult(@Mock MyClass myClass) {
    when(myClass.myMethod(isNull(MyOwnType.class))).thenReturn("baeldung");
    assertEquals("baeldung", myClass.myMethod((MyOwnType) null));
}
```

最后，让我们注意到我们在断言中的_myMethod()_调用中也需要给出null的类型。否则，也会因为同样的原因抛出错误！

## 5. 使用_any()_的模糊调用

同样，我们可以尝试使用_any()_ _ArgumentMatcher_来模拟一个接受任何参数的_myMethod()_调用：

```java
@Test
void givenMockedMyMethod_whenMyMethod_ThenMockedResult(@Mock MyClass myClass) {
    when(myClass.myMethod(any())).thenReturn(1);
}
```

再次运行这段代码，结果是一个模糊方法调用错误。我们在前一个案例中提出的所有评论在这里仍然有效。特别是，编译器在查看_thenReturn()_方法的参数之前就失败了。

解决方案也是类似的：**我们需要使用一个明确说明预期参数类型的_any()_ _ArgumentMatcher_版本：**

```java
@Test
void givenMockedMyMethod_whenMyMethod_ThenMockedResult(@Mock MyClass myClass) {
    when(myClass.myMethod(anyInt())).thenReturn(1);
    assertEquals(1, myClass.myMethod(2));
}
```

大多数基本Java类型已经为这个目的定义了Mockito方法。在我们的案例中，_anyInt()_方法将接受任何_Integer_参数。另一方面，_myMethod()_的另一个版本接受我们的自定义_MyOwnType_类型的参数。因此，我们需要使用接受对象类型作为参数的重载版本_any()_ _ArgumentMatcher_：

```java
@Test
void givenCorrectlyMockedNullMatcher_whenMyMethod_ThenMockedResult(@Mock MyClass myClass) {
    when(myClass.myMethod(any(MyOwnType.class))).thenReturn("baeldung");
    assertEquals("baeldung", myClass.myMethod((MyOwnType) null));
}
```

现在我们的测试工作正常：我们成功地消除了模糊方法调用错误！

## 6. 结论

在本文中，我们了解了为什么在使用Mockito框架时可能会遇到模糊方法调用错误。此外，我们展示了解决问题的方案。在现实生活中，当我们拥有大量参数的重载方法时，这种问题最有可能发生，我们决定使用约束性较低的_isNull()_或_any()_ _ArgumentMatcher_，因为某些参数的值与我们的测试无关。在简单的情况下，大多数现代IDE甚至在我们运行测试之前就能指出问题。

如常，代码可以在GitHub上找到。