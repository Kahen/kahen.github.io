---
date: 2024-06-19
category:
  - Spring WebFlux
  - Reactive Programming
tag:
  - Exception Handling
  - Mono.error()
head:
  - - meta
    - name: keywords
      content: Spring WebFlux, Reactive Programming, Exception Handling, Mono.error()
---
# Spring WebFlux中抛出异常与Mono.error()的区别

错误处理是使用Spring WebFlux进行响应式编程的一个关键方面。开发者通常依赖两种主要方法来处理错误：抛出异常或使用Project Reactor提供的_Mono.error()_方法。这两种方法都用于信号错误，但它们具有不同的特点和用例。

在本教程中，我们将解释在Spring WebFlux中抛出异常和使用_Mono.error()_的区别。我们将提供说明性的Java代码示例，以使其更易于理解。

## 2. 传统方法：抛出异常

多年来，抛出异常一直是管理Java应用程序中错误的可靠方式。这是一种简单的方法，可以中断程序的正常流程，并将错误传达给应用程序的更高层。Spring WebFlux与这种传统的错误处理方法无缝集成，使开发者能够在其响应式端点中抛出异常。下面的代码代表了传统方法的一个例子：

```java
public Mono``<User>`` getUserByIdThrowingException(String id) {
    User user = userRepository.findById(id);
    if (user == null) {
       throw new NotFoundException("用户未找到");
    }
    return Mono.justOrEmpty(user);
}
```

在这个特定场景中，_getUserByIdThrowingException()_方法尝试根据_UserRepository_提供的ID检索用户数据。如果找不到用户，该方法将抛出一个_NotFoundException_，在响应式管道中发出错误信号。

为了进行单元测试，我们从_org.junit.jupiter.api.Assertions_导入_assertThrows_方法。这测试了如果数据库中找不到用户，_getUserByIdThrowingException()_是否抛出_NotFoundException_。我们使用带lambda的_assertThrows_来执行应该抛出异常的方法调用。

如果抛出了异常，代码将验证抛出的异常是否为预期类型。然而，如果该方法没有抛出异常，测试将失败：

```java
@Test
public void givenNonExistUser_whenFailureCall_then_Throws_exception() {
    assertThrows(
        NotFoundException.class,
        () -> userService.getUserByIdThrowingException("3")
    );
}
```

## 3. 拥抱响应性：_Mono.error()_

与传统的抛出异常方法相比，Project Reactor通过_Mono.error()_方法引入了一种响应式替代方案。**这个方法生成一个立即以错误信号终止的Mono，与响应式编程范式完美对齐。**

让我们检查使用_Mono.error()_修改后的例子：

```java
public Mono``<User>`` getUserByIdUsingMonoError(String id) {
    User user = userRepository.findById(id);
    return (user != null)
      ? Mono.justOrEmpty(user)
      : Mono.error(new NotFoundException("用户未找到"));
}
```

为了保持流畅的用户体验和一致的响应流，我们使用_Mono.error()_而不是直接抛出异常，用于处理数据库中未找到的用户。

这是这个方法的单元测试：

```java
@Test public void givenNonExistUser_whenFailureCall_then_returnMonoError() {
    Mono result = userService.getUserByIdUsingMonoError("3");
    StepVerifier.create(result)
      .expectError(NotFoundException.class)
      .verify();
}
```

## 4. 理解关键差异和用例

### 4.1. 控制流中断

我们使用异常与try-catch或响应式操作符如_onErrorResume_、_onErrorReturn_或_onErrorMap_，当_Mono.error()_发出信号时。

### 4.2. 延迟性

_Mono.error()_现在支持异常的延迟实例化，这在构造异常涉及资源密集型操作的场景中是有益的。

### 4.3. 响应式错误处理

_Mono.error()_与响应式编程范式很好地对齐，促进了响应流中的响应式错误处理。

## 5. 结论

在本文中，我们讨论了在Spring WebFlux中使用响应式应用程序进行错误处理时，抛出异常和使用_Mono.error()_之间的基本差异；尽管这两种方法都用于信号错误，但它们在控制流和与响应式管道的集成方面有显著不同。

抛出异常中断执行流程，并将控制权转移到最近的异常处理器，适用于命令式代码路径。相反，_Mono.error()_与响应式流无缝集成，实现异步错误信号，而不会中断执行流程。

在使用Spring WebFlux开发响应式应用程序时，根据上下文和需求选择正确的错误处理机制至关重要。我们在响应式管道中使用_Mono.error()_来保持其响应式特性，我们使用异常处理命令式代码路径。如常，本教程的源代码可在GitHub上获得。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。