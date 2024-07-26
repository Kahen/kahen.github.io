---
date: 2022-06-06
category:
  - Maven
  - Testing
tag:
  - Maven
  - Surefire Plugin
  - JUnit
  - Test
head:
  - - meta
    - name: keywords
      content: Maven, Surefire Plugin, JUnit, Testing, Run Single Test
------
# 使用Maven单独运行单个测试或方法

## 1. 概述

通常，我们使用Maven surefire插件在Maven构建过程中执行测试。

本教程将探讨如何使用此插件来运行单个测试类或测试方法。

## 2. 问题介绍

Maven surefire插件使用起来非常简单。它只有一个目标：_test_。

因此，在默认配置下，我们可以通过命令 _mvn test_ 执行项目中的所有测试。

有时，我们可能只想执行单个测试类甚至单个测试方法。

本教程将以JUnit 5作为测试提供者的例子，来说明如何实现这一点。

## 3. 示例项目

为了更直接地显示测试结果，让我们创建几个简单的测试类：

```java
class TheFirstUnitTest {
    // 声明日志记录器 ...

    @Test
    void whenTestCase_thenPass() {
        日志记录器.info("运行一个虚拟测试");
    }
}

class TheSecondUnitTest {
    // 声明日志记录器 ...

    @Test
    void whenTestCase1_thenPrintTest1_1() {
        日志记录器.info("运行When Case1: test1_1");
    }

    @Test
    void whenTestCase1_thenPrintTest1_2() {
        日志记录器.info("运行When Case1: test1_2");
    }

    @Test
    void whenTestCase1_thenPrintTest1_3() {
        日志记录器.info("运行When Case1: test1_3");
    }

    @Test
    void whenTestCase2_thenPrintTest2_1() {
        日志记录器.info("运行When Case2: test2_1");
    }
}
```

在 _TheFirstUnitTest_ 类中，我们只有一个测试方法。然而，《TheSecondUnitTest》包含四个测试方法。我们所有的方法名称都遵循“ _when…then…_ ”模式。

为了简单起见，我们让每个测试方法输出一行指示该方法正在被调用的文本。

现在，如果我们运行 _mvn test_，将执行所有测试：

```shell
$ mvn test
...
[INFO] 扫描项目...
...
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] 运行 com.baeldung.runasingletest.TheSecondUnitTest
16:58:16.444 [main] INFO ...TheSecondUnitTest - 运行When Case2: test2_1
16:58:16.448 [main] INFO ...TheSecondUnitTest - 运行When Case1: test1_1
16:58:16.449 [main] INFO ...TheSecondUnitTest - 运行When Case1: test1_2
16:58:16.450 [main] INFO ...TheSecondUnitTest - 运行When Case1: test1_3
[INFO] 测试运行：4，失败：0，错误：0，跳过：0，耗时：0.065秒 - 在 com.baeldung.runasingletest.TheSecondUnitTest
[INFO] 运行 com.baeldung.runasingletest.TheFirstUnitTest
16:58:16.453 [main] INFO ...TheFirstUnitTest - 运行一个虚拟测试
[INFO] 测试运行：1，失败：0，错误：0，跳过：0，耗时：0秒 - 在 com.baeldung.runasingletest.TheFirstUnitTest
[INFO]
[INFO] 结果：
[INFO]
[INFO] 测试运行：5，失败：0，错误：0，跳过：0
[INFO]
...
```

接下来，让我们告诉Maven只执行指定的测试。

## 4. 执行单个测试类

Maven surefire插件提供了一个 _test_ 参数，我们可以使用它来指定我们想要执行的测试类或方法。

**如果我们想执行单个测试类，我们可以执行命令 _mvn test -Dtest=”TestClassName”_。**

例如，我们可以将 _-Dtest=”TheFirstUnitTest”_ 传递给 _mvn_ 命令，以仅执行 _TheFirstUnitTest_ 类：

```shell
$ mvn test -Dtest="TheFirstUnitTest"
...
[INFO] 扫描项目...
...
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] 运行 com.baeldung.runasingletest.TheFirstUnitTest
17:10:35.351 [main] INFO com.baeldung.runasingletest.TheFirstUnitTest - 运行一个虚拟测试
[INFO] 测试运行：1，失败：0，错误：0，跳过：0，耗时：0.053秒 - 在 com.baeldung.runasingletest.TheFirstUnitTest
[INFO]
[INFO] 结果：
[INFO]
[INFO] 测试运行：1，失败：0，错误：0，跳过：0
[INFO]
[INFO] ------------------------------------------------------------------------ 
[INFO] 构建成功
...
```

正如输出所示，只有我们传递给 _test_ 参数的测试类被执行了。

## 5. 执行单个测试方法

此外，**我们可以通过将 _-Dtest=”TestClassName#TestMethodName”_ 传递给_mvn_命令，要求Maven surefire插件执行单个测试方法。**

现在让我们执行 _TheSecondUnitTest_ 类中的 _whenTestCase2_thenPrintTest2_1()_ 方法：

```shell
$ mvn test -Dtest="TheSecondUnitTest#whenTestCase2_thenPrintTest2_1"
...
[INFO] 扫描项目...
...
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] 运行 com.baeldung.runasingletest.TheSecondUnitTest
17:22:07.063 [main] INFO ...TheSecondUnitTest - 运行When Case2: test2_1
[INFO] 测试运行：1，失败：0，错误：0，跳过：0，耗时：0.057秒 - 在 com.baeldung.runasingletest.TheSecondUnitTest
[INFO]
[INFO] 结果：
[INFO]
[INFO] 测试运行：1，失败：0，错误：0，跳过：0
[INFO]
[INFO] ------------------------------------------------------------------------ 
[INFO] 构建成功
...
```

正如我们所看到的，这次，我们只执行了指定的测试方法。

## 6. 关于 _test_ 参数的更多信息

到目前为止，我们已经展示了如何通过相应地提供 _test_ 参数值来执行单个测试类或测试方法。

实际上，Maven surefire插件允许我们以不同的格式设置 _test_ 参数的值，以灵活地执行测试。

接下来，我们将展示一些常用的格式：

- 按名称执行多个测试类：_-Dtest=”TestClassName1, TestClassName2, TestClassName3…”_
- 按名称模式执行多个测试类：_-Dtest=”*ServiceUnitTest”_ 或 _-Dtest=”The*UnitTest, Controller*Test”_
- 指定多个测试方法的名称：_-Dtest=”ClassName#method1+method2”_
- 按名称模式指定多个方法名称：_-Dtest=”ClassName#whenSomethingHappens_*”_

最后，让我们再看一个例子。

假设我们只想执行 _TheSecondUnitTest_ 类中的所有“ _whenTestCase1…_ ”方法。

因此，根据我们上面讨论的模式，我们希望 _-Dtest=”TheSecondUnitTest#whenTestCase1*”_ 能够完成这项工作：

```shell
$ mvn test -Dtest="TheSecondUnitTest#whenTestCase1*"
...
[INFO] 扫描项目...
...
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] 运行 com.baeldung.runasingletest.TheSecondUnitTest
17:51:04.973 [main] INFO ...TheSecondUnitTest - 运行When Case1: test1_1
17:51:04.979 [main] INFO ...TheSecondUnitTest - 运行When Case1: test1_2
17:51:04.980 [main] INFO ...TheSecondUnitTest - 运行When Case1: test1_3
[INFO] 测试运行：3，失败：0，错误：0，跳过：0，耗时：0.055秒 - 在 com.baeldung.runasingletest.TheSecondUnitTest
[INFO]
[INFO] 结果：
[INFO]
[INFO] 测试运行：3，失败：0，错误：0，跳过：0
[INFO]
[INFO] ------------------------------------------------------------------------ 
[INFO] 构建成功
...
```

正如我们所期望的，只有匹配指定名称模式的三个测试方法被执行了。

## 7. 结论

Maven surefire插件提供了一个 _test_ 参数，允许我们在选择要执行的测试方面具有很大的灵活性。

在本文中，我们讨论了一些常用的 _test_ 参数值格式。

此外，我们通过示例