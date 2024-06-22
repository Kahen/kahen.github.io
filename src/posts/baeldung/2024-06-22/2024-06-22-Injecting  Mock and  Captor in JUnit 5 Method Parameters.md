---
date: 2024-06-23
category:
  - JUnit 5
  - Mockito
tag:
  - JUnit 5
  - Mockito
  - 测试
head:
  - - meta
    - name: keywords
      content: JUnit 5, Mockito, 测试, Mock, Captor, 方法参数注入
---
# JUnit 5 方法参数注入 @Mock 和 @Captor

## 1. 概述

在本教程中，我们将了解如何在单元测试方法参数中注入 @Mock 和 @Captor 注解。

我们可以使用 @Mock 在单元测试中创建模拟对象。另一方面，我们可以使用 @Captor 捕获并存储传递给模拟方法的参数，以便稍后进行断言。JUnit 5 的引入使得将参数注入测试方法变得非常容易，从而实现了这一新特性。

## 2. 示例设置

要使用此功能，我们需要使用 JUnit 5。库的最新版本可以在 Maven Central Repository 中找到。让我们将依赖项添加到我们的 pom.xml 中：

```xml
```<dependency>```
    ```<groupId>```org.junit.jupiter```</groupId>```
    ```<artifactId>```junit-jupiter-engine```</artifactId>```
    ```<version>```5.10.2```</version>```
    ```<scope>```test```</scope>```
```</dependency>```
```

Mockito 是一个测试框架，允许我们创建动态模拟对象。**Mockito 核心提供了框架的基本功能，提供了一个表达式 API 用于创建和与模拟对象交互。** 让我们使用它的最新版本：

```xml
```<dependency>```
    ```<groupId>```org.mockito```</groupId>```
    ```<artifactId>```mockito-core```</artifactId>```
    ```<version>```5.11.0```</version>```
    ```<scope>```test```</scope>```
```</dependency>```
```

最后，我们需要使用 Mockito JUnit Jupiter 扩展，它负责将 Mockito 与 JUnit 5 集成。让我们也将这个依赖项添加到我们的 pom.xml 中：

```xml
```<dependency>```
    ```<groupId>```org.mockito```</groupId>```
    ```<artifactId>```mockito-junit-jupiter```</artifactId>```
    ```<version>```5.11.0```</version>```
    ```<scope>```test```</scope>```
```</dependency>```
```

首先，让我们将 Mockito 扩展附加到我们的单元测试类中：

```java
@ExtendWith(MockitoExtension.class)
class MethodParameterInjectionUnitTest {

    // ...
}
```

注册 Mockito 扩展允许 Mockito 框架与 JUnit 5 测试框架集成。因此，**我们现在可以将我们的模拟对象作为测试参数提供：**

```java
@Test
void whenMockInjectedViaArgumentParameters_thenSetupCorrectly(@Mock Function``````<String, String>`````` mockFunction) {
    when(mockFunction.apply("bael")).thenReturn("dung");
    assertEquals("dung", mockFunction.apply("bael"));
}
```

在这个例子中，我们的模拟函数在传递 "bael" 作为输入时返回字符串 "dung"。断言证明了模拟的行为符合我们的预期。

此外，构造函数是一种方法，所以也可以将 @Mock 作为测试类构造函数的参数注入：

```java
@ExtendWith(MockitoExtension.class)
class ConstructorInjectionUnitTest {

    Function``````<String, String>`````` function;

    public ConstructorInjectionUnitTest(@Mock Function``````<String, String>`````` function) {
        this.function = function;
    }

    @Test
    void whenInjectedViaArgumentParameters_thenSetupCorrectly() {
        when(function.apply("bael")).thenReturn("dung");
        assertEquals("dung", function.apply("bael"));
    }

}
```

总的来说，模拟注入不仅限于基本的单元测试。例如，我们也可以将模拟注入到其他可测试的方法中，如重复测试或参数化测试：

```java
@ParameterizedTest
@ValueSource(strings = {"", "bael", "dung"})
void whenInjectedInParameterizedTest_thenSetupCorrectly(String input, @Mock Function``````<String, String>`````` mockFunction) {
    when(mockFunction.apply(input)).thenReturn("baeldung");
    assertEquals("baeldung", mockFunction.apply(input));
}
```

最后，让我们注意，当我们在参数化测试中注入模拟时，方法参数的顺序很重要。注入的模拟对象 mockFunction 必须在测试参数 input 之后，以便参数解析器正确完成其工作。

## 4. 通过方法参数注入 @Captor

ArgumentCaptor 允许我们在测试中检查我们无法通过其他方式访问的对象的值。**我们现在可以通过非常类似的方式通过方法参数注入 @Captor：**

```java
@Test
void whenArgumentCaptorInjectedViaArgumentParameters_thenSetupCorrectly(@Mock Function``````<String, String>`````` mockFunction, @Captor ArgumentCaptor``<String>`` captor) {
    mockFunction.apply("baeldung");
    verify(mockFunction).apply(captor.capture());
    assertEquals("baeldung", captor.getValue());
}
```

在这个例子中，我们将模拟函数应用于字符串 "baeldung"。然后，我们使用 ArgumentCaptor 提取传递给函数调用的值。最后，我们验证这个值是正确的。

我们关于模拟注入的所有评论也适用于捕获器。特别是，让我们看看这次在 @RepeatedTest 中注入的一个例子：

```java
@RepeatedTest(2)
void whenInjectedInRepeatedTest_thenSetupCorrectly(@Mock Function``````<String, String>`````` mockFunction, @Captor ArgumentCaptor``<String>`` captor) {
    mockFunction.apply("baeldung");
    verify(mockFunction).apply(captor.capture());
    assertEquals("baeldung", captor.getValue());
}
```

## 5. 为什么要使用方法参数注入？

现在，我们将看看这个新特性的优点。首先，让我们回顾一下我们以前是如何声明我们的模拟的：

```java
Mock`<Function>` mock = mock(Mock.class)
```

在这种情况下，编译器会发出警告，因为 Mockito.mock() 无法正确创建 Function 的泛型类型。多亏了方法参数注入，我们能够保留泛型类型签名，编译器也不再发出警告。

使用方法注入的另一个巨大优势是发现依赖关系。以前，我们需要检查测试代码以了解与其他类的交互。通过方法参数注入，**方法签名显示了我们的测试系统如何与其他组件交互。** 此外，测试代码更短，更专注于其目标。

## 6. 结论

在本文中，我们看到了如何通过方法参数注入 @Mock 和 @Captor。JUnit 5 对构造器和方法依赖注入的支持使得这个特性成为可能。总之，建议使用这个新特性。它可能一开始看起来只是一个不错的功能，但它可以提高我们的代码质量和可读性。

如常，示例代码可以在 GitHub 上找到。