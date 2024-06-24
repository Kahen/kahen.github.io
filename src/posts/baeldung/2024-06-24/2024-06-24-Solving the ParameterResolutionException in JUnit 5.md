---
date: 2024-06-24
category:
  - Java
  - JUnit
tag:
  - JUnit 5
  - ParameterResolutionException
head:
  - - meta
    - name: keywords
      content: JUnit 5, Parameterized Testing, ParameterResolver, ParameterResolutionException
------
# 解决JUnit 5中的ParameterResolutionException问题

JUnit 5引入了一些强大的功能，包括对参数化测试的支持。编写参数化测试可以节省大量时间，在许多情况下，它们可以通过简单的注解组合来启用。

然而，**配置不正确可能导致难以调试的异常，因为JUnit在后台管理了许多测试执行的方面**。

其中一种异常是_ParameterResolutionException_：
```
org.junit.jupiter.api.extension.ParameterResolutionException: No ParameterResolver registered for parameter ...
```

在本教程中，我们将探讨这种异常的原因以及如何解决它。

## 2. JUnit 5的_ParameterResolver_

为了理解这个异常的原因，我们首先需要了解消息告诉我们缺少的是什么：一个_ParameterResolver_。

在JUnit 5中，引入了_ParameterResolver_接口，允许开发人员扩展JUnit的基本功能并编写接受任何类型参数的测试。让我们看一个简单的_ParameterResolver_实现：
```java
public class FooParameterResolver implements ParameterResolver {
    @Override
    public boolean supportsParameter(ParameterContext parameterContext, ExtensionContext extensionContext)
      throws ParameterResolutionException {
        // 参数支持逻辑
    }

    @Override
    public Object resolveParameter(ParameterContext parameterContext, ExtensionContext extensionContext) throws ParameterResolutionException {
        // 参数解析逻辑
    }
}
```
我们可以看到这个类有两个主要方法：
- _supportsParameter()_: 确定是否支持参数类型
- _resolveParameter()_: 返回测试执行的参数

因为_ParameterResolutionException_是在缺少_ParameterResolver_实现时抛出的，我们现在不会太关心实现细节。让我们首先讨论一些可能导致异常的潜在原因。

_ParameterResolutionException_可能很难调试，特别是对于那些不太熟悉参数化测试的人。

首先，让我们定义一个简单的_Book_类，我们将为其编写单元测试：
```java
public class Book {
    private String title;
    private String author;
    // 标准getter和setter
}
```

对于我们的示例，我们将为_Book_编写一些单元测试，以验证不同的标题值。让我们从两个非常简单的测试开始：
```java
@Test
void givenWutheringHeights_whenCheckingTitleLength_thenTitleIsPopulated() {
    Book wuthering = new Book("Wuthering Heights", "Charlotte Bronte");
    assertThat(wuthering.getTitle().length()).isGreaterThan(0);
}

@Test
void givenJaneEyre_whenCheckingTitleLength_thenTitleIsPopulated() {
    Book jane = new Book("Jane Eyre", "Charlotte Bronte");
    assertThat(jane.getTitle().length()).isGreaterThan(0);
}
```

很容易看出这两个测试基本上在做同样的事情：设置_Book_标题并检查长度。我们可以通过将它们合并为一个参数化测试来简化测试。让我们讨论一些重构可能出错的方式。

### 3.1. 向_@Test_方法传递参数

采取非常快速的方法，我们可能认为向_@Test_注解的方法传递参数就足够了：
```java
@Test
void givenTitleAndAuthor_whenCreatingBook_thenFieldsArePopulated(String title, String author) {
    Book book = new Book(title, author);
    assertThat(book.getTitle().length()).isGreaterThan(0);
    assertThat(book.getAuthor().length()).isGreaterThan(0);
}
```

代码编译并运行，但再想一想，我们应该质疑这些参数来自哪里。运行这个示例时，我们看到一个异常：
```
org.junit.jupiter.api.extension.ParameterResolutionException: No ParameterResolver registered for parameter [java.lang.String arg0] in method ...
```

**JUnit不知道应该向测试方法传递什么参数**。

让我们继续重构我们的单元测试，并查看_ParameterResolutionException_的另一个原因。

### 3.2. 竞争注解

我们可以使用之前提到的_ParameterResolver_来提供缺少的参数，但让我们先从值源开始更简单地使用。由于有两个值——_title_和_author_——我们可以使用_CsvSource_来为我们的测试提供这些值。

此外，我们缺少一个关键的注解：_@ParameterizedTest_。这个注解通知JUnit我们的测试是参数化的，并且测试值被注入到其中。

让我们尝试快速重构：
```java
@ParameterizedTest
@CsvSource({"Wuthering Heights, Charlotte Bronte", "Jane Eyre, Charlotte Bronte"})
@Test
void givenTitleAndAuthor_whenCreatingBook_thenFieldsArePopulated(String title, String author) {
    Book book = new Book(title, author);
    assertThat(book.getTitle().length()).isGreaterThan(0);
    assertThat(book.getAuthor().length()).isGreaterThan(0);
}
```

这看起来是合理的。然而，当我们运行单元测试时，我们看到一些有趣的现象：两次通过的测试运行和第三次失败的测试运行。仔细观察，我们还看到了一个警告：
```
WARNING: Possible configuration error: method [...] resulted in multiple TestDescriptors [org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor, org.junit.jupiter.engine.descriptor.TestTemplateTestDescriptor].
This is typically the result of annotating a method with multiple competing annotations such as @Test, @RepeatedTest, @ParameterizedTest, @TestFactory, etc.

```

**通过添加竞争测试注解，我们无意中创建了多个_TestDescriptor_ s**。这意味着JUnit仍然在运行我们原始的_@Test_版本的测试以及我们的新参数化测试。

简单地**移除_@Test_注解可以解决这个问题**。

### 3.3. 使用_ParameterResolver_

之前，我们讨论了一个简单的_ParameterResolver_实现示例。现在我们有一个工作正常的测试，让我们引入一个_BookParameterResolver_：
```java
public class BookParameterResolver implements ParameterResolver {
    @Override
    public boolean supportsParameter(ParameterContext parameterContext, ExtensionContext extensionContext)
      throws ParameterResolutionException {
        return parameterContext.getParameter().getType() == Book.class;
    }

    @Override
    public Object resolveParameter(ParameterContext parameterContext, ExtensionContext extensionContext) throws ParameterResolutionException {
        return parameterContext.getParameter().getType() == Book.class
            ? new Book("Wuthering Heights", "Charlotte Bronte")
            : null;
    }
}
```

这是一个简单的例子，它只为测试返回一个单一的_Book_实例。现在我们有一个_ParameterResolver_来为我们提供测试值，我们应该能够回到我们的第一个测试。同样，我们可能会尝试：
```java
@Test
void givenTitleAndAuthor_whenCreatingBook_thenFieldsArePopulated(String title, String author) {
    Book book = new Book(title, author);
    assertThat(book.getTitle().length()).isGreaterThan(0);
    assertThat(book.getAuthor().length()).isGreaterThan(0);
}
```

但是当我们运行这个测试时，同样的异常仍然存在。不过，原因略有不同——**现在我们有了_ParameterResolver_，我们仍然需要告诉JUnit如何使用它**。

幸运的是，这就像**在包含我们测试方法的外部类上添加_@ExtendWith_注解一样简单**：
```java
@ExtendWith(BookParameterResolver.class)
public class BookUnitTest {
    @Test
    void givenTitleAndAuthor_whenCreatingBook_thenFieldsArePopulated(String title, String author) {
        // 测试内容...
    }
    // 其他单元测试
}
```

再次运行，我们看到测试执行成功。

## 4. 结论

在本文中，我们讨论了JUnit 5的_ParameterResolutionException_以及缺失或竞争配置可能导致这种异常。像往常一样，文章的所有代码都可以在GitHub上找到。