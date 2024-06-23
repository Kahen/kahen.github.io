---
date: 2024-06-23
category:
  - Java
  - Environment Variables
tag:
  - Java
  - Environment Variables
  - Runtime
  - Testing
head:
  - - meta
    - name: keywords
      content: Java, Environment Variables, Runtime, Testing, Reflection API, ProcessBuilder, Docker
---
# 在Java中在运行时设置环境变量

Java提供了一种简单的与环境变量交互的方式。我们可以访问它们，但不容易改变它们。然而，在某些情况下，我们需要更多地控制环境变量，特别是在测试场景中。

在本教程中，我们将学习如何解决这个问题，并以编程方式设置或更改环境变量。**我们只会讨论在测试上下文中使用它。** 使用动态环境变量进行领域逻辑应该被劝阻，因为它容易出现问题。

## 2. 访问环境变量

访问环境变量的过程非常简单。_System_类为我们提供了这样的功能：

```java
@Test
void givenOS_whenGetPath_thenVariableIsPresent() {
    String classPath = System.getenv("PATH");
    assertThat(classPath).isNotNull();
}
```

如果我们需要访问所有变量，可以这样做：

```java
@Test
void givenOS_whenGetEnv_thenVariablesArePresent() {
    Map``<String, String>`` environment = System.getenv();
    assertThat(environment).isNotNull();
}
```

然而，_System_没有公开任何setters，我们收到的_Map_是不可修改的。

## 3. 更改环境变量

我们可能有不同的情况想要更改或设置环境变量。**由于我们的进程涉及层次结构，因此我们有三个选项：**

- 子进程更改/设置父进程的环境变量
- 进程更改/设置其环境变量
- 父进程更改/设置子进程的环境变量

我们只会讨论最后两个案例。第一个案例复杂，不能轻易地为测试目的合理化。此外，它通常不能在纯Java中实现，通常涉及一些高级的C/C++编码。

**我们将只关注Java解决方案。** 尽管JNI是Java的一部分，但它更复杂，解决方案应该在C/C++中实现。此外，解决方案可能存在与可移植性有关的问题。这就是为什么我们不会详细研究这些方法。

## 4. 当前进程

在这里，我们有几种选择。其中一些可能被视为hack，因为不能保证它们在所有平台上都能工作。

### 4.1. 使用反射API

从技术上讲，我们可以使用反射API来改变_System_类，以确保它为我们提供所需的值：

```java
@SuppressWarnings("unchecked")
private static Map``<String, String>`` getModifiableEnvironment()
  throws ClassNotFoundException, NoSuchFieldException, IllegalAccessException {
    // ...（省略部分代码）
}
```

**然而，这种方法会破坏模块的界限。** 因此，在Java 9及以上版本，它可能会产生警告，但代码会编译。而在Java 16及以上版本，它会抛出错误：

```java
java.lang.reflect.InaccessibleObjectException:
Unable to make field private static final java.util.Map java.lang.ProcessEnvironment.theUnmodifiableEnvironment accessible:
module java.base does not "opens java.lang" to unnamed module @2c9f9fb0
```

为了解决后一个问题，我们需要为反射访问打开系统模块。我们可以使用以下VM选项：

```java
--add-opens java.base/java.util=ALL-UNNAMED
--add-opens java.base/java.lang=ALL-UNNAMED
```

当从模块运行此代码时，我们可以使用其名称而不是ALL-UNNAMED。

然而，_getenv(String)_实现可能因平台而异。**此外，我们无法保证内部类的API，因此解决方案可能在所有设置中都不工作。**

为了节省一些打字，我们可以使用JUnit Pioneer库中已经实现的解决方案：

```xml
`<dependency>`
    `<groupId>`org.junit-pioneer`</groupId>`
    `<artifactId>`junit-pioneer`</artifactId>`
    `<version>`2.2.0`</version>`
    `<scope>`test`</scope>`
`</dependency>`
```

它使用类似的想法，但提供了更声明性的方法：

```java
@Test
@SetEnvironmentVariable(key = ENV_VARIABLE_NAME, value = ENV_VARIABLE_VALUE)
void givenVariableSet_whenGetEnvironmentVariable_thenReturnsCorrectValue() {
    String actual = System.getenv(ENV_VARIABLE_NAME);
    assertThat(actual).isEqualTo(ENV_VARIABLE_VALUE);
}
```

_@SetEnvironmentVariable_帮助我们定义环境变量。然而，由于它使用反射，我们必须像以前一样提供对封闭模块的访问。

### 4.2. JNI

另一种方法是使用JNI并使用C/C++实现代码，该代码将使用C/C++设置环境变量。**这是一种更具侵入性的方法，需要最少的C/C++技能。** 同时，它没有反射访问问题。

然而，我们不能保证它将在Java运行时更新变量。**我们的应用程序可以在启动时缓存变量，任何进一步的更改都不会有任何效果。** 我们在使用反射更改底层_Map_时没有这个问题，因为它只改变Java方面的值。

**此外，这种方法将需要为不同平台定制解决方案。** 因为所有操作系统都以不同的方式处理环境变量，解决方案不会像纯Java实现那样跨平台。

## 5. 子进程

_ProcessBuilder_可以帮助我们直接从Java创建子进程。我们可以使用它来运行任何进程。然而，我们将使用它来运行我们的JUnit测试：

```java
@Test
void givenChildProcessTestRunner_whenRunTheTest_thenAllSucceed()
  throws IOException, InterruptedException {
    // ...（省略部分代码）
}
```

**_ProcessBuilder_提供API来访问环境变量并启动单独的进程。** 我们甚至可以运行Maven测试目标并确定我们要执行哪些测试：

```java
// ...（省略部分代码）
```

这个过程选择了具有特定标签的同一类中的测试：

```java
@Test
@EnabledIfEnvironmentVariable(named = CHILD_PROCESS_CONDITION, matches = CHILD_PROCESS_VALUE)
@Tag(CHILD_PROCESS_TAG)
void givenChildProcess_whenGetEnvironmentVariable_thenReturnsCorrectValue() {
    String actual = System.getenv(ENVIRONMENT_VARIABLE_NAME);
    assertThat(actual).isEqualTo(ENVIRONMENT_VARIABLE_VALUE);
}
```

可以定制此解决方案并根据特定要求进行调整。

## 6. Docker环境

然而，如果我们需要更多的配置或更特定的环境，最好使用Docker和Testcontainers。它将为我们提供更多的控制，特别是在集成测试中。让我们首先概述Dockerfile：

```java
// ...（省略部分代码）
```

我们将复制所需的测试并在容器内运行它。同样，我们也在同一文件中提供环境变量。

我们可以使用CI/CD设置来拾取容器或Testcontainers在我们的测试中运行测试。**虽然这不是最优雅的解决方案，但它可能帮助我们一键运行所有测试。** 让我们考虑一个简单的例子：

```java
// ...（省略部分代码）
```

然而，容器没有提供方便的API来复制文件夹以获取所有报告。最简单的方法是使用_withFileSystemBind()_方法，但它已被弃用。另一种方法是直接在Dockerfile中创建绑定。

我们可以使用_ProcessBuillder_重写示例。**主要思想是将Docker和常规测试绑定到同一个套件中。**

## 7. 结论

Java允许我们直接使用环境变量。然而，更改它们的值或设置新的并不简单。

**如果我们在领域逻辑中需要这样做，这通常意味着我们违反了几个SOLID原则。** 然而，在测试期间，对环境变量的更多控制可能会简化流程并允许我们检查更特定的情况。

尽管我们可以使用反射，启动新进程或使用Docker构建一个全新的环境是更合适的解决方案。

像往常一样，本教程的所有代码都可以在GitHub上找到。