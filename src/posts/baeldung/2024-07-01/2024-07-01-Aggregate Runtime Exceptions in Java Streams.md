---
date: 2022-04-01
category:
  - Java
  - Stream
tag:
  - Java
  - Stream
  - Exception Handling
head:
  - - meta
    - name: keywords
      content: Java Stream, Exception Handling, Aggregate Exceptions
---
# Java Stream中聚合运行时异常

在本教程中，我们将学习如何在流管道中聚合异常。

流API本身并没有提供任何声明式的方式来处理异常。它在管道中只有一个用于处理数据的通道，并没有单独的通道用于处理异常。这意味着它没有提供一种在遇到异常时调用函数的方式。因此，我们不得不退回到使用try-catch块来捕获异常。

因此，在流管道中聚合异常并处理它们可能是一个挑战。

## 在流管道中使用try-catch块聚合异常

通常有这样的情况，必须调用某个方法以产生效果，例如，一个简单的数据库更新可能会因为连接失败而抛出异常。考虑到这一点，让我们考虑一个在管道中调用`processThrowsExAndNoOutput()`的简单例子：

```java
@Test
public void givenTryCatchInPipeline_whenFoundEx_thenSuppressExIntoRuntimeEx() {
    String[] strings = {"1", "2", "3", "a", "b", "c"};
    RuntimeException runEx = Arrays.stream(strings)
      .map(str -> {
          try {
              processThrowsExAndNoOutput(str);
              return null;
          } catch (RuntimeException e) {
              return e;
          }
      })
      .filter(Objects::nonNull)
      .collect(Collectors.collectingAndThen(Collectors.toList(), list -> {
          RuntimeException runtimeException = new RuntimeException("Errors Occurred");
          list.forEach(runtimeException::addSuppressed);
          return runtimeException;
      }));
    processExceptions(runEx);
    assertEquals("Errors Occurred", runEx.getMessage());
    assertEquals(3, runEx.getSuppressed().length);
}
```

在上面的程序中，我们把捕获的异常当作流中的数据来处理。`map()`方法返回null或者异常。使用`filter()`，只有异常被允许流向下游。最后，我们使用`addSuppressed()`将其简化为`RuntimeException`。然后我们可以调用`processExceptions()`来处理聚合异常。

这可行！但是，是否可以更声明式呢？让我们在接下来的部分中朝着这个方向努力。

让我们使实现更易读和简洁一些。为此，我们将try-catch块移动到一个方法中：

```java
static Throwable callProcessThrowsExAndNoOutput(String input) {
    try {
        processThrowsExAndNoOutput(input);
        return null;
    } catch (RuntimeException e) {
        return e;
    }
}
```

现在，我们可以在管道内部调用上述方法：

```java
@Test
public void givenExtractedMethod_whenFoundEx_thenSuppressExIntoRuntimeEx() {
    String[] strings = {"1", "2", "3", "a", "b", "c"};
    RuntimeException runEx = Arrays.stream(strings)
      .map(str -> callProcessThrowsExAndNoOutput(str))
      .filter(Objects::nonNull)
      .reduce(new RuntimeException("Errors Occurred"), (o1, o2) -> {
          o1.addSuppressed(o2);
          return o1;
      });
    // 像以前一样处理聚合异常
}
```

上述方法看起来更清晰。然而，仍然有改进的空间和更多的用例要讨论。

## 使用反射在流管道中聚合异常和输出

大多数程序必须同时处理异常和预期的输出。让我们以一个可以返回异常或一些输出的方法为例：

```java
static Object processReturnsExAndOutput(String input) {
    try {
        return Integer.parseInt(input);
    } catch (Exception e) {
        return new RuntimeException("Exception in processReturnsExAndOutput for " + input, e);
    }
}
```

现在，让我们看看管道处理：

```java
@Test
public void givenProcessMethod_whenStreamResultHasExAndOutput_thenHandleExceptionListAndOutputList() {
    List```<String>``` strings = List.of("1", "2", "3", "a", "b", "c");
    Map map = strings.stream()
      .map(s -> processReturnsExAndOutput(s))
      .collect(Collectors.partitioningBy(o -> o instanceof RuntimeException, Collectors.toList()));

    List``<RuntimeException>`` exceptions = (List``<RuntimeException>``) map.getOrDefault(Boolean.TRUE, List.of());
    List``<Integer>`` results = (List``<Integer>``) map.getOrDefault(Boolean.FALSE, List.of());
    handleExceptionsAndOutputs(exceptions, results);
}
```

上述流管道在终端`collect()`中使用了`partitioningBy()`。它利用反射将结果分割成异常列表和整数列表。程序随后调用`handleExceptionsAndOutputs()`来进一步处理异常和输出。

这次，我们没有将异常简化为聚合的`RuntimeException`。相反，我们将异常列表传递给进一步处理。这是聚合异常的另一种方式。

正如我们所看到的，这绝对不是最干净的方法，需要原始类型和强制类型转换。因此，接下来的部分将探讨更通用的解决方案来解决手头的问题。

## 使用自定义映射器聚合异常和输出

展望未来，我们将更多地专注于函数式编程。

**我们将创建一个自定义映射器函数，它包装了另一个`map()`流函数。**它返回一个`Result`对象，该对象封装了结果和异常。

首先，让我们看看`Result`类：

```java
public class Result`<R, E extends Throwable>` {
    private Optional```<R>``` result;
    private Optional``<E>`` exception;

    public Result(R result) {
        this.result = Optional.of(result);
        this.exception = Optional.empty();
    }

    public Result(E exception) {
        this.exception = Optional.of(exception);
        this.result = Optional.empty();
    }

    public Optional```<R>``` getResult() {
        return result;
    }

    public Optional``<E>`` getException() {
        return exception;
    }
}
```

`Result`类使用泛型和`Optional`。由于`result`和`exception`可以持有null或非null值，我们使用了`Optional`。随着我们进一步的进展，它的使用将变得更加清晰。

我们在本节开头讨论了自定义映射器，现在让我们看看它的实现：

```java
public class CustomMapper {
    public static `````<T, R>````` Function`<T, Result<R, Throwable>`> mapper(Function`````<T, R>````` func) {
        return arg -> {
            try {
                return new Result(func.apply(arg));
            } catch (Exception e) {
                return new Result(e);
            }
        };
    }
}
```

现在让我们来看看`mapper()`的实际应用：

```java
@Test
public void givenCustomMapper_whenStreamResultHasExAndSuccess_thenHandleExceptionListAndOutputList() {
    List```<String>``` strings = List.of("1", "2", "3", "a", "b", "c");
    strings.stream()
      .map(CustomMapper.mapper(Integer::parseInt))
      .collect(Collectors.collectingAndThen(Collectors.toList(),
        list -> handleErrorsAndOutputForResult(list)));
}
```

这次我们使用了`Collectors.CollectingAndThen()`，在管道的末端调用`handleErrorsAndOutputForResult()`，传入`Result`<Integer, Throwable>``对象列表。让我们看看`handleErrorsAndOutputForResult()`：

```java
static String handleErrorsAndOutputForResult(List<Result`<Integer, Throwable>`> successAndErrors) {
    logger.info("handle errors and output");
    successAndErrors.forEach(result -> {
        if (result.getException().isPresent()) {
            logger.error("Process Exception " + result.getException().get());
        } else {
            logger.info("Process Result" + result.getResult().get());
        }
    });
    return "Errors and Output Handled";
}
```

如上所示，我们简单地遍历`Result`列表，并借助`Optional.isPresent()`方法将成功或失败的流程分开处理。当成功和错误情况需要被明显区分处理时，这种方法可能很有用，例如向不同的用户发送通知。

**当`Stream.map()`内部要使用的函数无法修改时，例如，因为它来自外部库，我们可以使用自定义的`mapper()`函数来包装它，并以更通用的方式处理结果。**

## 使用自定义收集器聚合异常和输出

聚合管道的异常和输出是一种收集活动。因此，实现一个为此目的设计的收集器是有意义的。

让我们看看如何做到这一点：

```java
public class CustomCollector`````<T, R>````` {
    private final List```<R>``` results = new ArrayList<>();
    private final List`<Throwable>` exceptions = new ArrayList<>();

    public static `````<T, R>````` Collector<T, ?, CustomCollector`````<T, R>`````> of(Function`````<T, R>````` mapper) {
        return Collector.of(
          CustomCollector::new,
          (collector, item) -> {
              try {
                  R result = mapper.apply(item);
                  collector.results.add(result);
              } catch (Exception e) {
                  collector.exceptions.add(e);
              }
          },
          (left, right) -> {
              left.results.addAll(right.results);
              left.exceptions.addAll(right.exceptions);
              return left;
          }
        );
    }
    // 标准getter...
}
```

最后，让我们看看收集器的确切工作原理：

```java
@Test
public void givenCustomCollector_whenStreamResultHasExAndSuccess_thenHandleAggrExceptionAndResults() {
    String[] strings = {"1", "2", "3", "a", "b", "c"};
    Arrays.stream(strings)
      .collect(Collectors.collectingAndThen(CustomCollector.of(Integer::parseInt),
        col -> handleExAndResults(col.getExceptions(), col.getResults())));
}

```

## 使用Vavr库中的Try和Either聚合异常和输出

**Try是一个容器，它持有一个未捕获的异常或在成功的情况下的实际输出。**就像前面讨论的自定义映射器一样，Try也可以包装函数。

而**Either是一个更通用的容器，它持有错误类型或预期的输出类型。

让我们看看如何一起利用这些特性：

```java
@Test
public void givenVavrEitherAndTry_whenStreamResultHasExAndSuccess_thenHandleExceptionListAndOutputList() {
    List```<String>``` strings = List.of("1", "2", "3", "a", "b", "c");
    strings.stream()
      .map(str -> Try.of(() -> Integer.parseInt(str)).toEither())
      .collect(Collectors.collectingAndThen(Collectors.partitioningBy(Either::isLeft, Collectors.toList()),
        map -> handleErrorsAndOutputForEither(map)));
}
```

如我们所见，程序将Try对象转换为Either，然后收集到一个映射中，调用`handleErrorsAndOutputForEither()`：

```java
static void handleErrorsAndOutputForEither(Map`<Boolean, List<Either<Throwable, Integer>`>> map) {
    logger.info("handle errors and output");
    map.getOrDefault(Boolean.TRUE, List.of())
      .forEach(either -> logger.error("Process Exception " + either.getLeft()));
    map.getOrDefault(Boolean.FALSE, List.of())
      .forEach(either -> logger.info("Process Result " + either.get()));
}
```

如上所示，通过在Either对象上左滑或右滑，可以处理异常和输出。正如我们所见，Try和Either方法为我们提供了迄今为止最简洁的解决方案。

## 结论

在本教程中，我们探索了在处理流时聚合运行时异常的几种方式。虽然有多种方法，但重要的是要保持流处理的本质，包括简洁性、不可变性和声明式语法。

像往常一样，代码可以在GitHub上找到。

[Baeldung Logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)
[Gravatar Image](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)
[Liam Williams - Baeldung Editor](https://www.baeldung.com/wp-content/uploads/custom_avatars/Liam-Williams-Baeldung-Editor-150x150.jpeg)
[Announcement Icon](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)
[Baeldung REST Post Footer Main](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)
[Baeldung REST Post Footer Icn](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK