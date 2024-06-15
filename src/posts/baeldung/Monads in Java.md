---
date: 2024-06-15
category:
  - Java
tag:
  - Monads
  - Functional Programming
---
# Java中的单子模式 | Baeldung

## 1. 概述

在本教程中，我们将学习关于单子（monads），以及它们如何帮助我们处理副作用。我们将学习到关键的方法，这些方法使我们能够连接单子和操作：_map()_和_flatMap()_。在整篇文章中，我们将探索Java生态系统中一些流行的单子的API，重点关注它们的实际应用。

## 2. 副作用

在函数式编程中，“副作用”通常指的是那些超出函数或组件作用域的操作所引起的变化。

为了在处理这些副作用的同时应用函数式编程范式，我们可以将我们的操作或数据包装在一个容器中。**我们可以将单子想象为容器，允许我们在函数作用域之外处理副作用，保持函数的纯度。**

例如，假设我们有一个函数，用于除以两个整数：
```java
double divide(int dividend, int divisor) {
    return dividend / divisor;
}
```
虽然它看起来像是一个纯函数，但当我们将零作为_divisor_参数的值时，函数通过抛出一个_ArithmeticException_产生副作用。然而，我们可以使用一个单子来包装函数的结果并包含其效果。
让我们改变这个函数，让它返回一个_Optional``<Double>``_：
```java
Optional``<Double>`` divide(int dividend, int divisor) {
    if (divisor == 0) {
        return Optional.empty();
    }
    return Optional.of(dividend / divisor);
}
```
正如我们所看到的，当我们尝试除以零时，函数不再产生副作用。

以下是一些其他流行的Java单子示例，它们帮助我们处理各种副作用：
- _Optional<>_ - 处理空值
- _List<>, Stream<>_ - 管理数据集合
- _Mono<>, CompletableFuture<>_ - 处理并发和I/O
- _Try<>, Result<>_ - 处理错误
- _Either<>_ - 处理二元性

## 3. 函子

当我们创建一个单子时，**我们需要允许它改变其封装的对象或操作，同时保持相同的容器类型。**

以Java Streams为例。如果在“现实世界”中，一个_Long_类型的实例可以通过调用方法_Instant.ofEpochSeconds()_转换为_Instant_，那么这种关系必须在_Stream_的世界中得到保留。

为了实现这一点，**Stream API公开了一个高阶函数，它“提升”了原始关系。这个概念也被称为“函子”，允许转换封装类型的方法是通常命名为“_map_”**：
```java
Stream``<Long>`` longs = Stream.of(1712000000L, 1713000000L, 1714000000L);
Stream``<Instant>`` instants = longs.map(Instant::ofEpochSecond);
```
尽管“_map_”是这种函数类型的典型术语，但特定的方法名称本身对于一个对象作为函子并不重要。例如，_CompletableFuture_单子提供了一个名为_thenApply()_的方法：
```java
CompletableFuture``<Long>`` timestamp = CompletableFuture.completedFuture(1713000000L);
CompletableFuture``<Instant>`` instant = timestamp.thenApply(Instant::ofEpochSecond);
```
正如我们所看到的，_Stream_和_CompletableFuture_容器公开了方法，使我们能够应用封装数据支持的所有操作：

## 4. 绑定

**绑定是单子的一个关键特性，它允许我们在单子上下文中链接多个计算。**换句话说，我们可以通过替换_map()_来避免双重嵌套。

### 4.1. 嵌套单子

如果我们仅依赖于函子来序列化操作，我们最终会得到嵌套的容器。**让我们使用Project Reactor的_Mono_单子作为这个例子。**

假设我们有两个方法，允许我们以响应式方式获取_Author_和_Book_实体：
```java
Mono````<Author>```` findAuthorByName(String name) { /* ... */ }
Mono````<Book>```` findLatestBookByAuthorId(Long authorId) { /* ... */ }
```
现在，如果我们从作者的名字开始，我们可以使第一个方法获取他的详细信息。结果是_Mono````<Author>````_：
```java
void findLatestBookOfAuthor(String authorName) {
    Mono````<Author>```` author = findAuthorByName(authorName);
    // ...
}
```
之后，我们可能会尝试使用_map()_方法将容器的内容从_Author_更改为他的最新的_Book_：
```java
Mono<Mono````<Book>````> book = author.map(it -> findLatestBookByAuthorId(it.authorId());
```
但是，正如我们所看到的，这导致了一个嵌套的_Mono_容器。这是因为_findLatestBookByAuthorId()_返回了一个_Mono````<Book>````_，而_map()_又将结果包装了一次。

### 4.2. _flatMap()_

然而，**如果我们使用绑定代替，我们可以消除额外的容器并展平结构。**“flatMap”这个名字通常被采用为绑定方法，尽管有一些例外，它被称为不同的名称：
```java
void findLatestBookOfAuthor(String authorName) {
    Mono````<Author>```` author = findAuthorByName(authorName);
    Mono````<Book>```` book = author.flatMap(it -> findLatestBookByAuthorId(it.authorId()));
    // ...
}
```
现在，我们可以通过内联操作来简化代码，并引入一个中间_map()_，它从_Author_转换到其_authorId_：
```java
void findLatestBookOfAuthor(String authorName) {
    Mono````<Book>```` book = findAuthorByName(authorName)
      .map(Author::authorId)
      .flatMap(this::findLatestBookByAuthorId);
    // ...
}
```
正如我们所看到的，**结合_map()_和_flatMap()_是使用单子的一种有效方式，允许我们以声明性的方式定义一系列转换。**

## 5. 实际用例

正如我们在前面的代码示例中看到的，单子通过提供额外的抽象层来帮助我们处理副作用。**大多数时候，它们使我们能够专注于主要场景，并在主逻辑之外处理边缘情况。**

### 5.1. “铁路”模式

像这样绑定单子也被称为“铁路”模式。**我们可以通过想象一条直线进入的铁路来可视化主流程。此外，如果发生意外情况，我们将从主铁路切换到次要的并行铁路。**

让我们考虑验证一个_Book_对象。我们首先验证书的ISBN，然后检查_authorId_，最后验证书的genre：
```java
void validateBook(Book book) {
    if (!validIsbn(book.getIsbn())) {
        throw new IllegalArgumentException("Invalid ISBN");
    }
    Author author = authorRepository.findById(book.getAuthorId());
    if (author == null) {
        throw new AuthorNotFoundException("Author not found");
    }
    if (!author.genres().contains(book.genre())) {
        throw new IllegalArgumentException("Author does not write in this genre");
    }
}
```
**我们可以使用vavr的_Try_单子并将铁路模式应用于将这些验证链接在一起**：
```java
void validateBook(Book bookToValidate) {
    Try.ofSupplier(() -> bookToValidate)
      .andThen(book -> validateIsbn(book.getIsbn()))
      .map(book -> fetchAuthor(book.getAuthorId()))
      .andThen(author -> validateBookGenre(bookToValidate.genre(), author))
      .get();
}

void validateIsbn(String isbn) { /* ... */ }

Author fetchAuthor(Long authorId) { /* ... */ }

void validateBookGenre(String genre, Author author) { /* ... */ }
```
正如我们所看到的，API公开了像_andThen()_这样的方法，对于我们不需要它们响应的函数很有用。它们的目的是检查失败，并在需要时切换到次要通道。另一方面，像_map()_和_flatMap()_这样的方法旨在进一步推动流程，创建一个新的_Try<>_单子，包装函数的响应，在这种情况下，是_Author_对象：

### 5.2. 恢复

在某些情况下，**API允许我们从次要通道恢复到主通道。**大多数时候，这需要我们提供回退值。例如，当使用_Try<>_的API时，我们可以使用_recover()_方法从“失败”通道切换回主通道：

### 5.3. 其他示例

现在我们已经学习了单子的工作原理以及如何使用铁路模式绑定它们，我们理解了各种方法的实际名称是无关紧要的。相反，我们应该关注它们的目的。大多数单子API的方法：
- 转换底层数据
- 如有需要，在通道之间切换

例如，_Optional_单子使用_map()_和_flatMap()_来转换其数据，分别使用_filter()_和_or()_在“空”和“存在”状态之间可能切换。

另一方面，_CompletableFuture_使用像_thenApply()_和_thenCombine()_而不是_map()_和_flatMap()_，并允许我们通过_exceptionally()_从失败通道中恢复。

## 6. 结论

在本文中，我们讨论了单子及其主要特性。我们使用实际示例来理解它们如何帮助我们处理副作用，例如管理集合、并发、空值、异常等。之后，我们学习了如何应用“铁路”模式来绑定单子，并将所有这些副作用推出我们组件的作用域之外。

如常，完整的源代码可以在GitHub上找到。

发表帖子后的30天内开放评论。对于任何问题过去这个日期，使用网站上的联系表单。

评论在文章发布后30天内开放。