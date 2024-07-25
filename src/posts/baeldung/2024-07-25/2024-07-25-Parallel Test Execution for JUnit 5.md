---
date: 2022-04-01
category:
  - JUnit
  - 并行测试
tag:
  - JUnit 5
  - 并行执行
head:
  - - meta
    - name: keywords
      content: JUnit 5, 并行测试, 单元测试
---
# JUnit 5的并行测试执行

在这篇文章中，我们将介绍如何使用JUnit 5执行并行单元测试。首先，我们将介绍基本配置和使用此功能的最低要求。接下来，我们将展示不同情况下的代码示例，并在最后讨论共享资源的同步。

并行测试执行是一个自5.3版本以来可选加入的实验性功能。

## 2. 配置

首先，**我们需要在_src/test/resources_文件夹中创建一个_junit-platform.properties_文件以启用并行测试执行**。我们通过在上述文件中添加以下行来启用并行化特性：

```
junit.jupiter.execution.parallel.enabled = true
```

让我们通过运行一些测试来检查我们的配置。首先，我们将创建_`FirstParallelUnitTest`_类，并在其中创建两个测试：

```java
public class FirstParallelUnitTest {
    @Test
    public void first() throws Exception {
        System.out.println("FirstParallelUnitTest first() start => " + Thread.currentThread().getName());
        Thread.sleep(500);
        System.out.println("FirstParallelUnitTest first() end => " + Thread.currentThread().getName());
    }

    @Test
    public void second() throws Exception {
        System.out.println("FirstParallelUnitTest second() start => " + Thread.currentThread().getName());
        Thread.sleep(500);
        System.out.println("FirstParallelUnitTest second() end => " + Thread.currentThread().getName());
    }
}
```

当我们运行测试时，我们在控制台得到以下输出：

```
FirstParallelUnitTest second() start => ForkJoinPool-1-worker-19
FirstParallelUnitTest second() end => ForkJoinPool-1-worker-19
FirstParallelUnitTest first() start => ForkJoinPool-1-worker-19
FirstParallelUnitTest first() end => ForkJoinPool-1-worker-19
```

在这个输出中，我们可以注意到两件事。首先，我们的测试是顺序运行的。其次，我们使用ForkJoin线程池。**通过启用并行执行，JUnit引擎开始使用ForkJoin线程池。**

接下来，我们需要添加配置以利用这个线程池。我们需要选择一个并行化策略。**JUnit提供了两种实现（_dynamic_和_fixed_）以及一个自定义选项来创建我们的实现。**

动态策略根据处理器/核心数量乘以因子参数（默认为1）来确定线程数量，使用：

```
junit.jupiter.execution.parallel.config.dynamic.factor
```

另一方面，固定策略依赖于由以下指定的预定义线程数量：

```
junit.jupiter.execution.parallel.config.fixed.parallelism
```

要使用自定义策略，我们需要首先通过实现_ParallelExecutionConfigurationStrategy_接口来创建它。

## 3. 同一类中的测试并行化

我们已经启用了并行执行并选择了一个策略。现在是我们在同一类中并行执行测试的时候了。有两种配置方法。一种是使用_`@Execution(ExecutionMode.CONCURRENT)`_注解，另一种是使用属性文件和行：

```
junit.jupiter.execution.parallel.mode.default = concurrent
```

在我们选择如何配置这个并运行我们的_`FirstParallelUnitTest`_类之后，我们可以看到以下输出：

```
FirstParallelUnitTest second() start => ForkJoinPool-1-worker-5
FirstParallelUnitTest first() start => ForkJoinPool-1-worker-19
FirstParallelUnitTest second() end => ForkJoinPool-1-worker-5
FirstParallelUnitTest first() end => ForkJoinPool-1-worker-19
```

从输出中，我们可以看到两个测试同时开始，并在两个不同的线程中。请注意，输出可能会在每次运行之间改变。在使用ForkJoin线程池时，这是预期的。

还有一个选项是在同一线程中运行所有_`FirstParallelUnitTest`_类中的测试。在当前范围内，使用并行性和同一线程选项是不可行的，所以让我们在下一节中扩大我们的视野，并添加一个更多的测试类。

## 4. 同一模块中的测试并行化

在我们引入一个新的属性之前，我们将创建_`SecondParallelUnitTest`_类，它有两个方法，类似于_`FirstParallelUnitTest`_：

```java
public class SecondParallelUnitTest {
    @Test
    public void first() throws Exception {
        System.out.println("SecondParallelUnitTest first() start => " + Thread.currentThread().getName());
        Thread.sleep(500);
        System.out.println("SecondParallelUnitTest first() end => " + Thread.currentThread().getName());
    }

    @Test
    public void second() throws Exception {
        System.out.println("SecondParallelUnitTest second() start => " + Thread.currentThread().getName());
        Thread.sleep(500);
        System.out.println("SecondParallelUnitTest second() end => " + Thread.currentThread().getName());
    }
}
```

在我们用同一个批次运行测试之前，我们需要设置属性：

```
junit.jupiter.execution.parallel.mode.classes.default = concurrent
```

当我们运行这两个测试类时，我们得到以下输出：

```
SecondParallelUnitTest second() start => ForkJoinPool-1-worker-23
FirstParallelUnitTest first() start => ForkJoinPool-1-worker-19
FirstParallelUnitTest second() start => ForkJoinPool-1-worker-9
SecondParallelUnitTest first() start => ForkJoinPool-1-worker-5
FirstParallelUnitTest first() end => ForkJoinPool-1-worker-19
SecondParallelUnitTest first() end => ForkJoinPool-1-worker-5
FirstParallelUnitTest second() end => ForkJoinPool-1-worker-9
SecondParallelUnitTest second() end => ForkJoinPool-1-worker-23
```

从输出中，我们可以看到所有四个测试在不同的线程中并行运行。

结合我们在本节和前一节中提到的两个属性及其值（_same_thread和concurrent_），我们得到四种不同的执行模式：

1. (_same_thread, same_thread_) – 所有测试顺序运行
2. (_same_thread, concurrent_) – 一个类的测试顺序运行，但多个类并行运行
3. (_concurrent, same_thread_) – 一个类的测试并行运行，但每个类单独运行
4. (_concurrent, concurrent_) – 测试并行运行

## 5. 同步

在理想情况下，我们所有的单元测试都是独立的和隔离的。然而，有时这很难实现，因为它们依赖于共享资源。然后，在并行运行测试时，我们需要在测试中同步共同资源。JUnit5提供了这样的机制，以_`@ResourceLock`_注解的形式。

同样，让我们创建_`ParallelResourceLockUnitTest`_类：

```java
public class ParallelResourceLockUnitTest {
    private List`<String>` resources;
    @BeforeEach
    void before() {
        resources = new ArrayList<>();
        resources.add("test");
    }
    @AfterEach
    void after() {
        resources.clear();
    }
    @Test
    @ResourceLock(value = "resources")
    public void first() throws Exception {
        System.out.println("ParallelResourceLockUnitTest first() start => " + Thread.currentThread().getName());
        resources.add("first");
        System.out.println(resources);
        Thread.sleep(500);
        System.out.println("ParallelResourceLockUnitTest first() end => " + Thread.currentThread().getName());
    }
    @Test
    @ResourceLock(value = "resources")
    public void second() throws Exception {
        System.out.println("ParallelResourceLockUnitTest second() start => " + Thread.currentThread().getName());
        resources.add("second");
        System.out.println(resources);
        Thread.sleep(500);
        System.out.println("ParallelResourceLockUnitTest second() end => " + Thread.currentThread().getName());
    }
}
```

**_`@ResourceLock`_允许我们指定哪个资源是共享的以及我们想要使用的锁类型（默认是_ResourceAccessMode.READ_WRITE_）**。通过当前设置，JUnit引擎将检测到我们的测试都使用了一个共享资源，并将它们顺序执行：

```
ParallelResourceLockUnitTest second() start => ForkJoinPool-1-worker-5
[test, second]
ParallelResourceLockUnitTest second() end => ForkJoinPool-1-worker-5
ParallelResourceLockUnitTest first() start => ForkJoinPool-1-worker-19
[test, first]
ParallelResourceLockUnitTest first() end => ForkJoinPool-1-worker-19
```

## 6. 结论

在这篇文章中，我们首先介绍了如何配置并行执行。接下来，介绍了并行性的可用策略以及如何配置线程数量？之后，我们介绍了不同配置如何影响测试执行。最后，我们介绍了共享资源的同步。

如常，本文的代码可以在GitHub上找到。