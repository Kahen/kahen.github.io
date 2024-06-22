---
date: 2024-06-22
category:
  - Spring
  - AOP
tag:
  - Logging
  - Aspect-Oriented Programming
head:
  - - meta
    - name: keywords
      content: Spring, AOP, Logging, Aspect-Oriented Programming
---
# 使用Spring AOP进行日志记录

我们经常使用日志记录来记录程序执行过程中有意义的步骤和有价值的信息。它允许我们记录以后可用于调试和分析代码的数据。

此外，面向切面编程（简称AOP）是一种范式，它让我们能够在不扰乱业务逻辑的情况下，将事务管理或日志记录等跨领域关注点分离到整个应用程序中。

在本教程中，我们将学习如何使用AOP和Spring框架实现日志记录。

## 2. 无AOP的日志记录

在日志记录方面，我们通常在方法的开始和结束处放置日志。这样，我们可以轻松地跟踪应用程序的执行流程。此外，我们可以捕获传递给特定方法的值以及它们返回的值。

为了演示，让我们创建一个带有`greet()`方法的`GreetingService`类：

```java
public String greet(String name) {
    logger.debug(">> greet() - {}", name);
    String result = String.format("Hello %s", name);
    logger.debug("``<< greet() - {}", result);
    return result;
}
```

尽管上述实现看起来像是一个标准的解决方案，但**日志语句可能会让我们的代码看起来像是不必要的杂乱**。

此外，我们为代码引入了额外的复杂性。如果没有日志记录，我们可以将这个方法重写为一行代码：

```java
public String greet(String name) {
    return String.format("Hello %s", name);
}
```

## 3. 面向切面编程

顾名思义，面向切面编程侧重于切面而不是对象和类。**我们使用AOP为特定应用程序部分实现额外的功能，而无需修改它们当前的实现**。

### 3.1. AOP概念

在我们深入研究之前，让我们在非常高的层次上检查一下AOP的基本概念。

- 切面：我们希望在整个应用程序中应用的跨领域关注点或功能。
- 连接点：我们想要应用切面的应用程序流程点。
- 通知：应该在特定连接点执行的操作。
- 切点：应该应用切面的连接点集合。

此外，**值得注意的是Spring AOP仅支持方法执行的连接点**。我们应该考虑使用编译时库，如AspectJ，为字段、构造函数、静态初始化器等创建切面。

### 3.2. Maven依赖

要使用Spring AOP，让我们在`pom.xml`中添加`spring-boot-starter-aop`依赖：

```xml
<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-aop``</artifactId>``
``</dependency>``
```

在Spring中实现AOP的一种方法是使用带有`@Aspect`注解的Spring Bean：

```java
@Aspect
@Component
public class LoggingAspect {
}
```

`@Aspect`注解作为标记注解，因此Spring不会自动将其视为组件。为了指示它应该由Spring管理并通过组件扫描检测到，我们还使用`@Component`注解来注解这个类。

接下来，让我们定义一个切点。简单来说，切点允许我们指定我们想要用切面拦截的连接点执行：

```java
@Pointcut("execution(public * com.baeldung.logging.*.*(..))")
private void publicMethodsFromLoggingPackage() {
}
```

在这里，我们定义了一个切点表达式，它只包括`com.baeldung.logging`包中的公共方法。

接下来，让我们看看如何定义通知以记录方法执行的开始和结束。

### 4.1. 使用_Around_通知

我们将从更通用的通知类型开始——_Around_通知。**它允许我们在方法调用之前和之后实现自定义行为**。此外，有了这个通知，我们可以决定是否继续特定的连接点，返回自定义结果或抛出异常。

让我们使用`@Around`注解定义通知：

```java
@Around("publicMethodsFromLoggingPackage()")
public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
    Object[] args = joinPoint.getArgs();
    String methodName = joinPoint.getSignature().getName();
    logger.debug(">> {}() - {}", methodName, Arrays.toString(args));
    Object result = joinPoint.proceed();
    logger.debug("``<< {}() - {}", methodName, result);
    return result;
}
```

`value`属性将这个_Around_通知与之前定义的切点关联起来。通知在由`publicMethodsFromLoggingPackage()`切点签名匹配的方法执行周围运行。

该方法接受一个`ProceedingJoinPoint`参数。它是`JoinPoint`类的子类，允许我们调用`proceed()`方法来执行下一个通知（如果存在）或目标方法。

我们在`joinPoint`上调用`getArgs()`方法以检索方法参数数组。此外，我们使用`getSignature().getName()`方法来获取我们正在拦截的方法的名称。

接下来，我们调用`proceed()`方法来执行目标方法并检索结果。

最后，让我们调用我们之前提到的`greet()`方法：

```java
@Test
void givenName_whenGreet_thenReturnCorrectResult() {
    String result = greetingService.greet("Baeldung");
    assertNotNull(result);
    assertEquals("Hello Baeldung", result);
}
```

运行我们的测试后，我们可以在控制台看到以下结果：

```shell
>``> greet() - [Baeldung]
``<< greet() - Hello Baeldung
```

## 5. 使用最少侵入性的通知

**在决定使用哪种类型的通知时，建议我们使用最不强大的通知来满足我们的需求**。如果我们选择一个通用的通知，如_Around_通知，我们更有可能遇到潜在的错误和性能问题。

也就是说，让我们看看如何使用_Before_和_After_通知来实现相同的功能。与_Around_通知不同，它们不会包装方法执行，因此没有必要显式调用`proceed()`方法来继续连接点执行。具体来说，我们使用这些类型的通知在方法执行之前或之后立即拦截方法。

### 5.1. 使用_Before_通知

**要在方法执行之前拦截它，我们将使用`@Before`注解创建一个通知：**

```java
@Before("publicMethodsFromLoggingPackage()")
public void logBefore(JoinPoint joinPoint) {
    Object[] args = joinPoint.getArgs();
    String methodName = joinPoint.getSignature().getName();
    logger.debug(">``> {}() - {}", methodName, Arrays.toString(args));
}
```

与之前的例子类似，我们使用`getArgs()`方法获取方法参数，并使用`getSignature().getName()`方法获取方法名称。

### 5.2. 使用_AfterReturning_通知

进一步地，**为了在方法执行后添加日志，我们将创建一个`@AfterReturning`通知，如果方法执行完成且没有抛出任何异常，则会运行它：**

```java
@AfterReturning(value = "publicMethodsFromLoggingPackage()", returning = "result")
public void logAfter(JoinPoint joinPoint, Object result) {
    String methodName = joinPoint.getSignature().getName();
    logger.debug("`<< {}() - {}", methodName, result);
}
```

在这里，**我们定义了`returning`属性来获取方法返回的值**。此外，我们在属性中提供的值应该与参数的名称匹配。返回值将作为参数传递给通知方法。

### 5.3. 使用_AfterThrowing_通知

另一方面，为了记录方法调用以异常完成的情况，我们可以使用`@AfterThrowing`通知：

```java
@AfterThrowing(pointcut = "publicMethodsFromLoggingPackage()", throwing = "exception")
public void logException(JoinPoint joinPoint, Throwable exception) {
    String methodName = joinPoint.getSignature().getName();
    logger.error("<< {}() - {}", methodName, exception.getMessage());
}
```

这一次，我们将在通知方法中获取抛出的异常，而不是返回值。

## 6. Spring AOP的陷阱

最后，让我们讨论一下在使用Spring AOP时应该考虑的一些关注点。

Spring AOP是一个基于代理的框架。它创建代理对象来拦截方法调用并应用在通知中定义的逻辑。**这可能会对我们应用程序的性能产生负面影响**。

为了减少AOP对性能的影响，我们应该考虑只在必要时使用AOP。我们应该避免为孤立和不频繁的操作创建切面。

最后，如果我们只为开发目的使用AOP，我们可以有条件地创建它，例如，只有在特定的Spring配置文件处于活动状态时。

## 7. 结论

在本文中，我们学习了如何使用Spring AOP进行日志记录。

总之，我们研究了如何使用_Around_通知以及_Before_和_After_通知来实现日志记录。我们还探讨了为什么使用最不强大的通知来满足我们的需求是重要的。最后，我们讨论了Spring AOP带来的一些潜在问题。

如往常一样，所有代码示例都可以在GitHub上找到。我已经完成了翻译，以下是翻译的完整内容：

---
date: 2024-06-22
category:
  - Spring
  - AOP
tag:
  - Logging
  - Aspect-Oriented Programming
head:
  - - meta
    - name: keywords
      content: Spring, AOP, Logging, Aspect-Oriented Programming
---
# 使用Spring AOP进行日志记录

我们经常使用日志记录来记录程序执行过程中有意义的步骤和有价值的信息。它允许我们记录以后可用于调试和分析代码的数据。

此外，面向切面编程（简称AOP）是一种范式，它让我们能够在不扰乱业务逻辑的情况下，将事务管理或日志记录等跨领域关注点分离到整个应用程序中。

在本教程中，我们将学习如何使用AOP和Spring框架实现日志记录。

## 2. 无AOP的日志记录

在日志记录方面，我们通常在方法的开始和结束处放置日志。这样，我们可以轻松地跟踪应用程序的执行流程。此外，我们可以捕获传递给特定方法的值以及它们返回的值。

为了演示，让我们创建一个带有`greet()`方法的`GreetingService`类：

```java
public String greet(String name) {
    logger.debug(">`> greet() - {}", name);
    String result = String.format("Hello %s", name);
    logger.debug("``<< greet() - {}", result);
    return result;
}
```

尽管上述实现看起来像是一个标准的解决方案，但**日志语句可能会让我们的代码看起来像是不必要的杂乱**。

此外，我们为代码引入了额外的复杂性。如果没有日志记录，我们可以将这个方法重写为一行代码：

```java
public String greet(String name) {
    return String.format("Hello %s", name);
}
```

## 3. 面向切面编程

顾名思义，面向切面编程侧重于切面而不是对象和类。**我们使用AOP为特定应用程序部分实现额外的功能，而无需修改它们当前的实现**。

### 3.1. AOP概念

在我们深入研究之前，让我们在非常高的层次上检查一下AOP的基本概念。

- 切面：我们希望在整个应用程序中应用的跨领域关注点或功能。
- 连接点：我们想要应用切面的应用程序流程点。
- 通知：应该在特定连接点执行的操作。
- 切点：应该应用切面的连接点集合。

此外，**值得注意的是Spring AOP仅支持方法执行的连接点**。我们应该考虑使用编译时库，如AspectJ，为字段、构造函数、静态初始化器等创建切面。

### 3.2. Maven依赖

要使用Spring AOP，让我们在`pom.xml`中添加`spring-boot-starter-aop`依赖：

```xml
<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-aop``</artifactId>``
``</dependency>``
```

在Spring中实现AOP的一种方法是使用带有`@Aspect`注解的Spring Bean：

```java
@Aspect
@Component
public class LoggingAspect {
}
```

`@Aspect`注解作为标记注解，因此Spring不会自动将其视为组件。为了指示它应该由Spring管理并通过组件扫描检测到，我们还使用`@Component`注解来注解这个类。

接下来，让我们定义一个切点。简单来说，切点允许我们指定我们想要用切面拦截的连接点执行：

```java
@Pointcut("execution(public * com.baeldung.logging.*.*(..))")
private void publicMethodsFromLoggingPackage() { }
```

在这里，我们定义了一个切点表达式，它只包括`com.baeldung.logging`包中的公共方法。

接下来，让我们看看如何定义通知以记录方法执行的开始和结束。

### 4.1. 使用_Around_通知

我们将从更通用的通知类型开始——_Around_通知。**它允许我们在方法调用之前和之后实现自定义行为**。此外，有了这个通知，我们可以决定是否继续特定的连接点，返回自定义结果或抛出异常。

让我们使用`@Around`注解定义通知：

```java
@Around("publicMethodsFromLoggingPackage()")
public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
    Object[] args = joinPoint.getArgs();
    String methodName = joinPoint.getSignature().getName();
    logger.debug(">> {}() - {}", methodName, Arrays.toString(args));
    Object result = joinPoint.proceed();
    logger.debug("``<< {}() - {}", methodName, result);
    return result;
}
```

`value`属性将这个_Around_通知与之前定义的切点关联起来。通知在由`publicMethodsFromLoggingPackage()`切点签名匹配的方法执行周围运行。

该方法接受一个`ProceedingJoinPoint`参数。它是`JoinPoint`类的子类，允许我们调用`proceed()`方法来执行下一个通知（如果存在）或目标方法。

我们在`joinPoint`上调用`getArgs()`方法以检索方法参数数组。此外，我们使用`getSignature().getName()`方法来获取我们正在拦截的方法的名称。

接下来，我们调用`proceed()`方法来执行目标方法并检索结果。

最后，让我们调用我们之前提到的`greet()`方法：

```java
@Test
void givenName_whenGreet_thenReturnCorrectResult() {
    String result = greetingService.greet("Baeldung");
    assertNotNull(result);
    assertEquals("Hello Baeldung", result);
}
```

运行我们的测试后，我们可以在控制台看到以下结果：

```shell
>``> greet() - [Baeldung]
``<< greet() - Hello Baeldung
```

## 5. 使用最少侵入性的通知

**在决定使用哪种类型的通知时，建议我们使用最不强大的通知来满足我们的需求**。如果我们选择一个通用的通知，如_Around_通知，我们更有可能遇到潜在的错误和性能问题。

也就是说，让我们看看如何使用_Before_和_After_通知来实现相同的功能。与_Around_通知不同，它们不会包装方法执行，因此没有必要显式调用`proceed()`方法来继续连接点执行。具体来说，我们使用这些类型的通知在方法执行之前或之后立即拦截方法。

### 5.1. 使用_Before_通知

**要在方法执行之前拦截它，我们将使用`@Before`注解创建一个通知：**

```java
@Before("publicMethodsFromLoggingPackage()")
public void logBefore(JoinPoint joinPoint) {
    Object[] args = joinPoint.getArgs();
    String methodName = joinPoint.getSignature().getName();
    logger.debug(">``> {}() - {}", methodName, Arrays.toString(args));
}
```

与之前的例子类似，我们使用`getArgs()`方法获取方法参数，并使用`getSignature().getName()`方法获取方法名称。

### 5.2. 使用_AfterReturning_通知

进一步地，**为了在方法执行后添加日志，我们将创建一个`@AfterReturning`通知，如果方法执行完成且没有抛出任何异常，则会运行它：**

```java
@AfterReturning(value = "publicMethodsFromLoggingPackage()", returning = "result")
public void logAfter(JoinPoint joinPoint, Object result) {
    String methodName = joinPoint.getSignature().getName();
    logger.debug("<< {}() - {}", methodName, result);
}
```

在这里，**我们定义了`returning`属性来获取方法返回的值**。此外，我们在属性中提供的值应该与参数的名称匹配。返回值将作为参数传递给通知方法。

### 5.3. 使用_AfterThrowing_通知

另一方面，为了记录方法调用以异常完成的情况，我们可以使用`@AfterThrowing`通知：

```java
@AfterThrowing(pointcut = "publicMethodsFromLoggingPackage()", throwing = "exception")
public void logException(JoinPoint joinPoint, Throwable exception) {
    String methodName = joinPoint.getSignature().getName();
    logger.error("<< {}() - {}", methodName, exception.getMessage());
}
```

这一次，我们将在通知方法中获取抛出的异常，而不是返回值。

## 6. Spring AOP的陷阱

最后，让我们讨论一下在使用Spring AOP时应该考虑的一些关注点。

Spring AOP是一个基于代理的框架。它创建代理对象来拦截方法调用并应用在通知中定义的逻辑。**这可能会对我们应用程序的性能产生负面影响**。

为了减少AOP对性能的影响，我们应该考虑只在必要时使用AOP。我们应该避免为孤立和不频繁的操作创建切面。

最后，如果我们只为开发目的使用AOP，我们可以有条件地创建它，例如，只有在特定的Spring配置文件处于活动状态时。

## 7. 结论

在本文中，我们学习了如何使用Spring AOP进行日志记录。

总之，我们研究了如何使用_Around_通知以及_Before_和_After_通知来实现日志记录。我们还探讨了为什么使用最不强大的通知来满足我们的需求是重要的。最后，我们讨论了Spring AOP带来的一些潜在问题。

如往常一样，所有代码示例都可以在GitHub上找到。

OK