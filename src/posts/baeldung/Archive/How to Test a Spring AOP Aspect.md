---
date: 2024-06-17
category:
  - Spring AOP
  - Testing
tag:
  - AOP
  - Testing
  - Spring Boot
---
# 如何测试Spring AOP切面 | Baeldung

现在，新版的《REST With Spring - "REST With Spring Boot"》终于发布了，当前价格将在6月22日之前有效，之后将永久上涨50美元。

**>获取访问权限**

**现在**

## 1. 概述

面向切面编程（AOP）通过将跨领域关注点分离到一个基本单元，称为切面，从而改善程序设计，这个单元与主应用程序逻辑分开。Spring AOP是一个框架，它帮助我们轻松实现切面。

AOP切面与其他软件组件没有什么不同。它们需要不同的测试来验证它们的正确性。在本教程中，我们将学习如何对Spring AOP切面进行单元测试和集成测试。

## 2. AOP是什么？

AOP是一种编程范式，它补充了面向对象编程（OOP），将跨应用程序的特定功能模块化，这些功能是跨应用程序的。**在OOP中，类是基本单元，而在AOP中，切面是基本单元。** 日志记录和事务管理是跨领域关注点的典型例子。

一个切面由两个组成部分组成。一个是定义跨领域关注点逻辑的advice，另一个是指定在应用程序执行期间何时应用逻辑的pointcut。

下表提供了常见AOP术语的概述：

| 术语 | 描述 |
| --- | --- |
| 关注点 | 应用程序的特定功能。 |
| 跨领域关注点 | 跨越应用程序多个部分的特定功能。 |
| 切面 | 包含advice和pointcut以实现跨领域关注点的AOP基本单元。 |
| Advice | 我们想要在跨领域关注点中调用的特定逻辑。 |
| Pointcut | 选择将应用advice的连接点的表达式。 |
| 连接点 | 应用程序的执行点，例如方法。 |

## 3. 执行时间记录

在这一部分，让我们创建一个示例切面，记录连接点周围的执行时间。

### 3.1. Maven依赖项

**有不同的Java AOP框架，例如Spring AOP和AspectJ。** 在本教程中，我们将使用Spring AOP，并在我们的_pom.xml_中包含以下依赖项：

```xml
```<dependency>```
    ```<groupId>```org.springframework.boot```</groupId>```
    ```<artifactId>```spring-boot-starter-aop```</artifactId>```
    ```<version>```3.2.5```</version>```
```</dependency>```
```

对于日志记录部分，我们选择SLF4J作为API和SLF4J简单提供者作为日志实现。SLF4J是一个门面，提供不同日志实现的统一API。

因此，我们还在_pom.xml_中包含SLF4J API和SLF4J简单提供者依赖项：

```xml
```<dependency>```
    ```<groupId>```org.slf4j```</groupId>```
    ```<artifactId>```slf4j-api```</artifactId>```
    ```<version>```2.0.13```</version>```
```</dependency>```
```<dependency>```
    ```<groupId>```org.slf4j```</groupId>```
    ```<artifactId>```slf4j-simple```</artifactId>```
    ```<version>```2.0.13```</version>```
```</dependency>```
```

### 3.2. 执行时间切面

我们的_ExecutionTimeAspect_类很简单，只包含一个advice _logExecutionTime()_。**我们使用_@Aspect_和_@Component_注解来声明它是一个切面，并使Spring能够管理它：**

```java
@Aspect
@Component
public class ExecutionTimeAspect {
    private Logger log = LoggerFactory.getLogger(ExecutionTimeAspect.class);

    @Around("execution(* com.baeldung.unittest.ArraySorting.sort(..))")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long t = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        log.info("Execution time=" + (System.currentTimeMillis() - t) + "ms");
        return result;
    }
}
```

**_@Around_注解指示advice _logExecutionTime()_围绕由pointcut表达式_execution(…)_定义的目标连接点运行。** 在Spring AOP中，连接点总是一个方法。

## 4. 对切面的单元测试

**从单元测试的角度来看，我们只测试切面内部的逻辑，不包括任何依赖项，包括Spring应用程序上下文。** 在这个例子中，我们使用Mockito来模拟_joinPoint_和logger，然后将模拟注入我们的测试切面。

单元测试类用_@ExtendWith(MockitoExtension.class)_注解，以启用JUnit 5的Mockito功能。它自动初始化模拟对象，并将它们注入到我们用_@InjectMocks_注解的测试单元中：

```java
@ExtendWith(MockitoExtension.class)
class ExecutionTimeAspectUnitTest {
    @Mock
    private ProceedingJoinPoint joinPoint;

    @Mock
    private Logger logger;

    @InjectMocks
    private ExecutionTimeAspect aspect;

    @Test
    void whenExecuteJoinPoint_thenLoggerInfoIsCalled() throws Throwable {
        when(joinPoint.proceed()).thenReturn(null);
        aspect.logExecutionTime(joinPoint);
        verify(joinPoint, times(1)).proceed();
        verify(logger, times(1)).info(anyString());
    }
}
```

在这个测试用例中，我们期望切面中的_joinPoint.proceed()_方法被调用一次。同样，logger的_info()_方法也应该被调用一次，以记录执行时间。

为了更精确地验证日志消息，我们可以使用_ArgumentCaptor_类来捕获日志消息。这使我们能够断言消息以“ _Execution time=_“开头：

```java
ArgumentCaptor`<String>` argumentCaptor = ArgumentCaptor.forClass(String.class);
verify(logger, times(1)).info(argumentCaptor.capture());
assertThat(argumentCaptor.getValue()).startsWith("Execution time=");
```

## 5. 对切面的集成测试

从集成测试的角度来看，我们需要类实现_ArraySorting_通过pointcut表达式将我们的advice应用于目标类。_sort()_方法简单地调用静态方法_Collections.sort()_对列表进行排序：

```java
@Component
public class ArraySorting {
    public `<T extends Comparable<? super T>`> void sort(List`<T>` list) {
        Collections.sort(list);
    }
}
```

可能会出现一个问题：我们为什么不将我们的advice应用于静态方法_Collections.sort()_呢？**这是Spring AOP的一个限制，它不能在静态方法上工作。** Spring AOP创建动态代理来拦截方法调用。这种机制需要在目标对象上调用实际的方法，而静态方法可以在没有对象的情况下调用。**如果我们需要拦截静态方法，我们必须采用另一种AOP框架，比如AspectJ，它支持编译时编织。**

**在集成测试中，我们需要Spring应用程序上下文来创建代理对象，以拦截目标方法并应用advice。** 我们用_@SpringBootTest_注解集成测试类，以加载应用程序上下文，启用AOP和依赖注入功能：

```java
@SpringBootTest
class ExecutionTimeAspectIntegrationTest {
    @Autowired
    private ArraySorting arraySorting;

    private List``<Integer>`` getRandomNumberList(int size) {
        List``<Integer>`` numberList = new ArrayList<>();
        for (int n = 0; n < size; n++) {
            numberList.add((int) Math.round(Math.random() * size));
        }
        return numberList;
    }

    @Test
    void whenSort_thenExecutionTimeIsPrinted() {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PrintStream originalSystemOut = System.out;
        System.setOut(new PrintStream(baos));

        arraySorting.sort(getRandomNumberList(10000));

        System.setOut(originalSystemOut);
        String logOutput = baos.toString();
        assertThat(logOutput).contains("Execution time=");
    }
}
```

测试方法可以分为三部分。最初，它将输出流重定向到专用缓冲区，以便稍后进行断言。随后，它调用_sort()_方法，该方法在切面中调用advice。重要的是通过_@Autowired_注入_ArraySorting_实例，而不是使用_new ArraySorting()_实例化。这确保了Spring AOP在目标类上激活。最后，它断言日志是否存在于缓冲区中。

## 6. 结论

在本文中，我们讨论了AOP的基本概念，并看到了如何在目标类上使用Spring AOP切面。我们还研究了如何使用单元测试和集成测试来测试切面，以验证切面的正确性。

如往常一样，代码示例可在GitHub上找到。

发表帖子后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。