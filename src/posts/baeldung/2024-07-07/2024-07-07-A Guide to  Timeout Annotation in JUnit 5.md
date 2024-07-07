---
date: 2022-04-01
category:
  - Java
  - JUnit 5
tag:
  - Timeout Annotation
  - Unit Test
head:
  - - meta
    - name: keywords
      content: JUnit 5, @Timeout, Unit Test, Java
---
# JUnit 5 中 @Timeout 注解指南

在这篇简短的教程中，我们将使用 JUnit5 的 @Timeout 注解以声明式的方式来为单元测试设置超时时间。我们将讨论使用它的不同方式，然后我们将看到它如何与 @Parameterized 和 @Nested 测试进行交互。

我们可以将 JUnit5 的 @Timeout 注解标注在单元测试上，以指定它最多可以运行的秒数；如果超出这个值，测试将因 java.util.concurrent.TimeoutException 而失败：

```java
@Test
@Timeout(1)
void shouldFailAfterOneSecond() throws InterruptedException {
    Thread.sleep(10_000);
}
```

### 2.1. value 和 unit 属性

我们已经学会了如何通过指定它失败后的秒数来指定测试的超时时间。然而，我们可以利用注解的 value 和 unit 属性来指定不同的度量单位：

```java
@Test
@Timeout(value = 2, unit = TimeUnit.MINUTES)
void shouldFailAfterTwoMinutes() throws InterruptedException {
    Thread.sleep(10_000);
}
```

### 2.2. threadMode 属性

假设我们有一个慢速测试，因此有一个大的超时时间。为了有效地运行这个测试，我们应该在不同的线程上运行这个测试，而不是阻塞其他测试。通过使用 JUnit5 的并行测试执行，我们可以实现这一点。

另一方面，@Timeout 注解本身允许我们通过其 threadMode 属性优雅地做到这一点：

```java
@Test
@Timeout(value = 5, unit = TimeUnit.MINUTES, threadMode = Timeout.ThreadMode.SEPARATE_THREAD)
void shouldUseADifferentThread() throws InterruptedException {
    System.out.println(Thread.currentThread().getName());
    Thread.sleep(10_000);
}
```

我们可以通过运行测试并打印当前线程的名称来检查这一点；它应该打印类似于 "junit-timeout-thread-1" 这样的内容。

## 3. @Timeout 的目标

正如前面所强调的，@Timeout 注解可以方便地应用于单个测试方法。然而，也可以通过在类级别放置注解来为每个测试指定默认的超时持续时间。结果，未覆盖类级别超时的测试如果超出该值将失败：

```java
@Timeout(5)
class TimeoutUnitTest {

    @Test
    @Timeout(1)
    void shouldFailAfterOneSecond() throws InterruptedException {
        Thread.sleep(10_000);
    }

    @Test
    void shouldFailAfterDefaultTimeoutOfFiveSeconds() throws InterruptedException {
        Thread.sleep(10_000);
    }
}
```

### 3.1. @Timeout 和 @Nested 测试

JUnit5 的 @Nested 注解可以为单元测试创建内部类。我们可以将此与 @Timeout 结合使用。如果父类定义了默认的超时值，它也将由内部类的测试使用：

```java
@Timeout(5)
class TimeoutUnitTest {

    @Nested
    class NestedClassWithoutTimeout {
        @Test
        void shouldFailAfterParentsDefaultTimeoutOfFiveSeconds() throws InterruptedException {
            Thread.sleep(10_000);
        }
    }
}
```

然而，这个值可以在嵌套类级别或方法级别被覆盖：

```java
@Nested
@Timeout(3)
class NestedClassWithTimeout {

    @Test
    void shouldFailAfterNestedClassTimeoutOfThreeSeconds() throws InterruptedException {
        Thread.sleep(10_000);
    }

    @Test
    @Timeout(1)
    void shouldFailAfterOneSecond() throws InterruptedException {
        Thread.sleep(10_000);
    }
}
```

### 3.2. @Timeout 和 @ParameterizedTest

我们可以利用 @ParameterizedTest 注解来根据给定的输入值集合执行多个测试。我们可以将 @Timeout 注解标注在参数化测试上，结果，每个生成的测试都将使用超时值。

例如，如果我们有一个将执行五个测试的 @ParameterizedTest 并且我们用 @Timeout(1) 标注它，那么每个生成的五个测试如果超过一秒钟就会失败：

```java
@Timeout(1)
@ParameterizedTest
@ValueSource(ints = {1, 2, 3, 4, 5})
void eachTestShouldFailAfterOneSecond(int input) throws InterruptedException {
    Thread.sleep(1100);
}
```

## 4. 结论

在本文中，我们讨论了 JUnit5 的新 @Timeout 注解。我们学习了如何配置它并使用它以声明式方式为我们的单元测试设置超时值。

如往常一样，本文的完整源代码可在 GitHub 上找到。翻译已经完成，以下是翻译的结尾部分：

```java
@Timeout(1)
@ParameterizedTest
@ValueSource(ints = {1, 2, 3, 4, 5})
void eachTestShouldFailAfterOneSecond(int input) throws InterruptedException {
    Thread.sleep(1100);
}
```

## 4. 结论

在本文中，我们讨论了 JUnit5 的新 @Timeout 注解。我们学习了如何配置它并使用它以声明式方式为我们的单元测试设置超时值。

如往常一样，本文的完整源代码可在 GitHub 上找到。

OK