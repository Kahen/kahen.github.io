---
date: 2022-04-01
category:
  - Java
  - JUnit
tag:
  - JUnit 4
  - 测试
head:
  - - meta
    - name: keywords
      content: JUnit 4, 测试, 忽略基类
------
# 如何在JUnit 4中忽略基测试类

## 1. 概述

本教程将讨论在JUnit 4中跳过运行基测试类中测试的可能解决方案。在本教程中，**基类仅包含辅助方法，而子类将扩展它并运行实际测试**。

## 2. 绕过基测试类

假设我们有一个包含一些辅助方法的_BaseUnitTest_类：

```java
public class BaseUnitTest {
    public void helperMethod() {
        // ...
    }
}
```

现在，我们用一个包含测试的类来扩展它：

```java
public class ExtendedBaseUnitTest extends BaseUnitTest {
    @Test
    public void whenDoTest_thenAssert() {
        // ...
    }
}
```

如果我们运行测试，无论是使用IDE还是Maven构建，**我们可能会收到一个错误，告诉我们_BaseUnitTest_中没有可运行的测试方法**。**我们不想在此类中运行测试**，所以我们正在寻找一种避免这种错误的方法。

我们将查看三种不同的可能性。如果使用IDE运行测试，结果可能会有所不同，这取决于我们的IDE插件以及我们如何配置它来运行JUnit测试。

### 2.1. 重命名类

我们可以将类名重命名为构建约定将排除的名称。例如，如果我们使用Maven，我们可以检查Maven Surefire插件的默认设置。

**我们可以将名称从_BaseUnitTest_更改为_BaseUnitTestHelper_或类似**：

```java
public class BaseUnitTestHelper {
    public void helperMethod() {
        // ...
    }
}
```

### 2.2. 忽略

第二个选项是**使用JUnit的_@Ignore_注解暂时禁用测试。我们可以在类级别添加它以禁用类中的所有测试**：

```java
@Ignore("Class not ready for tests")
public class IgnoreClassUnitTest {
    @Test
    public void whenDoTest_thenAssert() {
        // ...
    }
}
```

同样，**我们可以在方法级别添加它**，以防我们仍然需要在类中运行其他测试，但只想排除一个或几个：

```java
public class IgnoreMethodTest {
    @Ignore("This method not ready yet")
    @Test
    public void whenMethodIsIgnored_thenTestsDoNotRun() {
        // ...
    }
}
```

如果使用Maven运行，我们将看到类似这样的输出：

```plaintext
Tests run: 1, Failures: 0, Errors: 0, Skipped: 1, Time elapsed: 0.041 s - in com.baeldung.IgnoreMethodTest
```

**自JUnit 5起，_@Disabled_注解取代了_@Ignore_**。

### 2.3. 使基类_抽象_

可能**最好的方法是使基测试类_抽象_**。抽象将要求一个具体类来扩展它。这就是为什么JUnit在任何情况下都不会将其视为测试实例。

让我们将我们的_BaseUnitTest_类设为抽象：

```java
public abstract class BaseUnitTest {
    public void helperMethod() {
        // ...
    }
}
```

## 3. 结论

在本文中，**我们看到了一些在JUnit 4中排除运行基测试类的示例**。最好的方法是创建抽象类。

JUnit的_@Ignore_注解也被广泛使用，但被认为是一种不良实践。**通过忽略测试，我们可能会忘记它们以及忽略它们的原因**。

一如既往，本文中展示的代码可以在GitHub上找到。