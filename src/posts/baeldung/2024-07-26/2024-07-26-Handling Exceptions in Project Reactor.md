---
date: 2022-04-01
category:
  - Java
  - Reactive Programming
tag:
  - Project Reactor
  - Exception Handling
head:
  - - meta
    - name: keywords
      content: Reactive Streams, Exception Handling, Java, Project Reactor
---
# 在Project Reactor中处理异常 

在本教程中，我们将探讨在Project Reactor中处理异常的几种方式。代码示例中引入的操作符在_Mono_和_Flux_类中都有定义。然而，**我们将只关注_Flux_类中的方法**。

## 2. Maven依赖
让我们从添加Reactor核心依赖开始：
```xml
`<dependency>`
    `<groupId>`io.projectreactor`</groupId>`
    `<artifactId>`reactor-core`</artifactId>`
    `<version>`3.6.0`</version>`
`</dependency>`
```

## 3. 在流水线操作符中直接抛出异常
处理_Exception_的最简单的方式是通过抛出它。如果在处理流元素期间发生了异常情况，我们可以像执行普通方法一样使用_throw_关键字抛出一个_Exception_。

假设我们需要将流中的_String_转换为_Integer_。如果某个元素不是数字_String_，我们需要抛出一个_Exception_。

通常我们会使用_map_操作符来进行这样的转换：
```java
Function``<String, Integer>`` mapper = input -> {
    if (input.matches("\\D")) {
        throw new NumberFormatException();
    } else {
        return Integer.parseInt(input);
    }
};

Flux````<String>```` inFlux = Flux.just("1", "1.5", "2");
Flux````<Integer>```` outFlux = inFlux.map(mapper);
```

如我们所见，如果输入元素无效，操作符就会抛出一个_Exception_。当我们这样抛出_Exception_时，**Reactor会捕获它并向下游发出错误信号**：
```java
StepVerifier.create(outFlux)
    .expectNext(1)
    .expectError(NumberFormatException.class)
    .verify();
```

这个解决方案是可行的，但并不优雅。正如Reactive Streams规范2.13规则所指定的，操作符必须正常返回。Reactor通过将_Exception_转换为错误信号来帮助我们。然而，我们可以做得更好。

本质上，**响应式流依赖于_onError_方法来指示失败条件**。在大多数情况下，这种情况**必须由对_Publisher_的_error_方法的调用触发**。对于这个用例使用_Exception_将我们带回了传统的编程方式。

## 4. 在_handle_操作符中处理异常
与_map_操作符类似，我们可以使用_handle_操作符逐个处理流中的项目。不同之处在于，**Reactor为_handle_操作符提供了一个输出接收器**，允许我们应用更复杂的转换。

让我们更新前一节的示例，使用_handle_操作符：
```java
BiConsumer<String, SynchronousSink````<Integer>````> handler = (input, sink) -> {
    if (input.matches("\\D")) {
        sink.error(new NumberFormatException());
    } else {
        sink.next(Integer.parseInt(input));
    }
};

Flux````<String>```` inFlux = Flux.just("1", "1.5", "2");
Flux````<Integer>```` outFlux = inFlux.handle(handler);
```

与_map_操作符不同，**_handle_操作符接收一个函数式消费者，每个元素调用一次**。这个消费者有两个参数：来自上游的元素和一个_SynchronousSink_，用于构建要发送到下游的输出。

如果输入元素是数字_String_，我们在接收器上调用_next_方法，并提供从输入转换而来的_Integer_。如果它不是数字_String_，我们将通过在接收器上调用_error_方法并传递一个_Exception_对象来指示情况。

请注意，**调用_error_方法将取消对上游的订阅，并在下游调用_onError_方法**。_error_和_onError_的这种协作是响应式流中处理_Exception_的标准方式。

让我们验证输出流：
```java
StepVerifier.create(outFlux)
    .expectNext(1)
    .expectError(NumberFormatException.class)
    .verify();
```

## 5. 在_flatMap_操作符中处理异常
**另一个常用且支持错误处理的操作符是_flatMap_**。这个操作符将输入元素转换为_Publisher_s，然后将_Publisher_s展平为一个新的流。我们可以利用这些_Publisher_s来表示错误状态。

让我们尝试使用_flatMap_进行相同的示例：
```java
Function<String, Publisher````<Integer>````> mapper = input -> {
    if (input.matches("\\D")) {
        return Mono.error(new NumberFormatException());
    } else {
        return Mono.just(Integer.parseInt(input));
    }
};

Flux````<String>```` inFlux = Flux.just("1", "1.5", "2");
Flux````<Integer>```` outFlux = inFlux.flatMap(mapper);

StepVerifier.create(outFlux)
    .expectNext(1)
    .expectError(NumberFormatException.class)
    .verify();
```

不出所料，结果与之前相同。

注意**_handle_和_flatMap_在错误处理方面的唯一区别在于_handle_操作符在接收器上调用_error_方法，而_flatMap_在_Publisher_上调用它**。

**如果我们处理的流由_Flux_对象表示，我们还可以使用_concatMap_来处理错误**。这个方法的行为与_flatMap_非常相似，但它不支持异步处理。

## 6. 避免_NullPointerException_
本节涵盖了处理_null_引用的处理，这经常导致_NullPointerException_s，这是Java中常见的_Exception_。为了避免这种异常，我们通常会将变量与_null_进行比较，如果该变量实际上是_null_，则将执行引导到不同的方式。在响应式流中做同样的事情可能很诱人：
```java
Function``<String, Integer>`` mapper = input -> {
    if (input == null) {
        return 0;
    } else {
        return Integer.parseInt(input);
    }
};
```

我们可能认为，因为我们已经处理了输入值为_null_的情况，所以_NullPointerException_不会发生。然而，实际情况告诉我们一个不同的故事：
```java
Flux````<String>```` inFlux = Flux.just("1", null, "2");
Flux````<Integer>```` outFlux = inFlux.map(mapper);

StepVerifier.create(outFlux)
    .expectNext(1)
    .expectError(NullPointerException.class)
    .verify();
```

显然，**一个_NullPointerException_触发了下游的错误，这意味着我们的_null_检查没有起作用**。

要理解为什么会发生这种情况，我们需要回顾Reactive Streams规范。规范的2.13规则规定，“调用_onSubscribe_、_onNext_、_onError_或_onComplete_时，除非提供的参数是_null_，否则必须正常返回，如果参数是_null_，则必须向调用者抛出_java.lang.NullPointerException_”。

**根据规范的要求，当一个_null_值到达_map_函数时，Reactor会抛出一个_NullPointerException_**。

因此，当一个_null_值到达某个流时，我们无法处理它或在将其传递给下游之前将其转换为非_null_值。因此，**避免_NullPointerException_的唯一方法是确保_null_值不会进入管道**。

## 7. 结论
在本文中，我们走过了Project Reactor中的_Exception_处理。我们讨论了一些示例并澄清了过程。我们还涵盖了在处理响应式流时可能发生的一个特殊情况的异常 — _NullPointerException_。

像往常一样，我们应用程序的源代码可以在GitHub上找到。