---
date: 2024-06-18
category:
  - Java
  - Testing
tag:
  - TestNG
  - SoftAssert
---
# TestNG中在断言失败后继续测试 | Baeldung

## 1. 概述

TestNG是一个流行的Java测试框架，它是JUnit的替代品。虽然两个框架都提供了自己的范例，但它们都有断言的概念：如果逻辑语句评估为false，则会停止程序执行，测试失败。TestNG中的一个简单断言可能看起来像这样：

```java
@Test
void testNotNull() {
    assertNotNull("My String");
}
```

但如果我们需要在单个测试中进行多个断言呢？**在本文中，我们将探讨TestNG的_SoftAssert_，这是一种一起执行多个断言的技术。**

## 2. 设置

为了我们的练习，让我们定义一个简单的_Book_类：

```java
public class Book {
    private String isbn;
    private String title;
    private String author;

    // 标准getter和setter...
}
```

我们还可以定义一个接口，模拟一个基于ISBN查找_Book_的简单服务：

```java
interface BookService {
    Book getBook(String isbn);
}
```

然后我们可以在单元测试中模拟这个服务，我们将在后面定义。这个设置让我们可以以现实的方式定义一个场景进行测试：一个服务返回的对象可能是null或者其成员变量可能是null。让我们开始为这个编写单元测试。

## 3. 基本断言与TestNG的_SoftAssert_

为了说明_SoftAssert_的好处，我们将首先使用失败的基本TestNG断言创建一个单元测试，并比较我们得到的反馈与使用_SoftAssert_的相同测试。

### 3.1. 使用传统断言

首先，我们将使用_assertNotNull()_创建一个测试，它接受一个要测试的值和一个可选的消息：

```java
@Test
void givenBook_whenCheckingFields_thenAssertNotNull() {
    Book gatsby = bookService.getBook("9780743273565");

    assertNotNull(gatsby.isbn, "ISBN");
    assertNotNull(gatsby.title, "title");
    assertNotNull(gatsby.author, "author");
}
```

然后，我们将定义一个使用Mockito的_BookService_的模拟实现，它返回一个_Book_实例：

```java
@BeforeMethod
void setup() {
    bookService = mock(BookService.class);
    Book book = new Book();
    when(bookService.getBook(any())).thenReturn(book);
}
```

运行我们的测试，我们可以看到我们忽略了设置_isbn_字段：

```java
java.lang.AssertionError: ISBN expected object to not be null
```

让我们在我们的模拟中修复这个问题，然后再次运行测试：

```java
@BeforeMethod void setup() {
    bookService = mock(BookService.class);
    Book book = new Book();
    book.setIsbn("9780743273565");
    when(bookService.getBook(any())).thenReturn(book);
}
```

我们现在收到了一个不同的错误：

```java
java.lang.AssertionError: title expected object to not be null
```

再次，我们在模拟中忘记了初始化字段，导致另一个必要的更改。

正如我们所看到的，**这种测试、更改和重新运行测试的循环不仅令人沮丧，而且耗时**。当然，这个效果会随着类的规模和复杂性的增加而倍增。在集成测试中，远程部署环境中的故障可能很难或无法本地重现。集成测试通常更复杂，因此执行时间更长。再加上部署测试更改所需的时间，意味着每次额外测试重新运行的周期时间成本很高。

幸运的是，**我们可以通过使用_SoftAssert_来评估多个断言而不立即停止程序执行来避免这个问题。**

### 3.2. 使用_SoftAssert_进行断言分组

让我们更新上面的例子，使用_SoftAssert_：

```java
@Test void givenBook_whenCheckingFields_thenAssertNotNull() {
    Book gatsby = bookService.getBook("9780743273565");

    SoftAssert softAssert = new SoftAssert();
    softAssert.assertNotNull(gatsby.isbn, "ISBN");
    softAssert.assertNotNull(gatsby.title, "title");
    softAssert.assertNotNull(gatsby.author, "author");
    softAssert.assertAll();
}
```

让我们分解一下：

- 首先，我们创建一个_SoftAssert_的实例
- 接下来，我们进行一个关键的更改：**我们对_SoftAssert_实例进行断言**，而不是使用TestNG的基本_assertNonNull()_方法
- 最后，同样重要的是要注意，一旦我们准备好获取我们所有断言的结果，我们需要调用_SoftAssert_实例上的_assertAll()_方法

现在，如果我们用我们最初的模拟运行这个测试，忽略了为_Book_设置任何成员变量值，我们将看到一个包含所有断言失败的单一错误消息：

```java
java.lang.AssertionError: The following asserts failed:
    ISBN expected object to not be null,
    title expected object to not be null,
    author expected object to not be null
```

这展示了当单个测试需要多个断言时，使用_SoftAssert_是一个好习惯。

### 3.3. _SoftAssert_的考虑事项

虽然_SoftAssert_很容易设置和使用，但有一个重要的考虑事项需要记住：有状态性。因为_SoftAssert_在内部记录每个断言的失败，所以它不适合在多个测试方法之间共享。因此，**我们应该确保在每个测试方法中创建一个新的_SoftAssert_实例。**

## 4. 结论

在本教程中，我们学习了如何使用TestNG的_SoftAssert_进行多个断言，以及这如何成为编写干净测试并减少调试时间的有价值工具。我们还了解到_SoftAssert_是有状态的，实例不应该在多个测试之间共享。

如常，所有的代码都可以在GitHub上找到。

发表文章后的30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。