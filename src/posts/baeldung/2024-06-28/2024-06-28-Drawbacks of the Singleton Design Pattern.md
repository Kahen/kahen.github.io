---
date: 2022-04-01
category:
  - Java
  - 设计模式
tag:
  - 单例模式
  - 设计模式
head:
  - - meta
    - name: keywords
      content: 单例设计模式, Java, 软件设计模式, 单例模式缺点
---
# 单例设计模式的缺点

单例是1994年由四人帮（Gang of Four）发布的一种创建型设计模式。

由于其简单的实现方式，我们倾向于过度使用它。因此，现在它被认为是一种反模式。在将单例模式引入我们的代码之前，我们应该自问是否真的需要它提供的功能。

在本教程中，我们将讨论单例设计模式的一般缺点，并看看我们可以使用的替代方案。

### 2. 代码示例

首先，让我们创建一个我们将在示例中使用的类：

```java
public class Logger {
    private static Logger instance;

    private PrintWriter fileWriter;

    public static Logger getInstance() {
        if (instance == null) {
            instance = new Logger();
        }
        return instance;
    }

    private Logger() {
        try {
            fileWriter = new PrintWriter(new FileWriter("app.log", true));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void log(String message) {
        String log = String.format("[%s]- %s", LocalDateTime.now(), message);
        fileWriter.println(log);
        fileWriter.flush();
    }
}
```

上面的类表示一个简化的文件记录类。我们使用延迟初始化方法实现了它作为单例。

### 3. 单例的缺点

根据定义，单例模式确保一个类只有一个实例，并额外提供对这个实例的全局访问。因此，我们应该在需要这两件事情的情况下使用它。

**从它的定义来看，我们可以注意到它违反了单一职责原则。** 该原则规定一个类应该只有一个职责。

然而，单例模式至少有两个职责——它确保类只有一个实例并包含业务逻辑。

在接下来的部分中，我们将讨论这种设计模式的其他陷阱。

#### 3.1. 全局状态

我们知道全局状态被认为是一种不良实践，因此应该避免。

尽管可能不是很明显，但单例在我们的代码中引入了全局变量，但它们被封装在一个类中。

**由于它们是全局的，每个人都可以访问和使用它们。而且，如果它们不是不可变的，每个人都可以更改它们。**

假设我们在代码的多个地方使用_Logger_类。每个人都可以访问和修改它的值。

现在，如果我们在使用方法中遇到一个问题，并发现问题是在单例本身，我们需要检查整个代码库以及使用它的每个方法，以找到问题的影响。

这很快就会成为我们应用程序的瓶颈。

#### 3.2. 代码灵活性

接下来，在软件开发方面，唯一确定的事情是我们的代码将来可能会发生变化。

当项目处于开发的早期阶段时，我们可以假设某些类不会有超过一个实例，并使用单例设计模式定义它们。

**然而，如果需求发生变化，我们的假设被证明是不正确的，我们将需要付出巨大的努力来重构我们的代码。**

让我们讨论我们工作示例中的问题。

我们假设我们只需要一个_Logger_类的实例。如果我们将来决定一个文件不够怎么办？

例如，我们可能需要为错误和信息消息分别使用不同的文件。此外，一个类的实例将不再足够。接下来，为了使修改成为可能，我们需要重构整个代码库并移除单例，这将需要大量的努力。

**使用单例，我们使代码紧密耦合且不够灵活。**

#### 3.3. 隐藏依赖

继续前进，单例促进了隐藏的依赖。

**换句话说，当我们在其他类中使用它们时，我们隐藏了这些类依赖于单例实例的事实。**

让我们考虑_sum()_方法：

```java
public static int sum(int a, int b){
    Logger logger = Logger.getInstance();
    logger.log("A simple message");
    return a + b;
}
```

如果我们没有直接查看_sum()_方法的实现，我们无法知道它使用了_Logger_类。

我们没有像通常那样将依赖项作为参数传递给构造函数或方法。

#### 3.4. 多线程

接下来，在多线程环境中，单例可能会很棘手。

**主要问题是全局变量对我们代码中的所有线程都是可见的。** 此外，每个线程都不了解其他线程对同一实例的活动。

因此，我们可能会面临不同的问题，例如竞态条件和其他同步问题。

我们之前实现的_Logger_类在多线程环境中不会很好地工作。我们的方法中没有任何东西可以防止多个线程同时访问_getInstance()_方法。结果，我们可能会拥有多个_Logger_类的实例。

让我们使用_synchronized_关键字修改_getInstance()_方法：

```java
public static Logger getInstance() {
    synchronized (Logger.class) {
        if (instance == null) {
            instance = new Logger();
        }
    }
    return instance;
}
```

我们现在强制每个线程等待轮到它。然而，我们应该意识到同步是昂贵的。此外，我们正在向我们的方法引入开销。

如果必要，我们可以通过应用双重检查锁定机制来解决我们的问题：

```java
private static volatile Logger instance;

public static Logger getInstance() {
    if (instance == null) {
        synchronized (Logger.class) {
            if (instance == null) {
                instance = new Logger();
            }
        }
    }
    return instance;
}
```

**然而，我们应该记住JVM允许访问部分构造的对象，这可能导致我们程序的意外行为。** 因此，需要向_instance_变量添加_volatile_关键字。

我们可能考虑的其他替代方案包括：

- 预先创建的实例而不是延迟的
- 枚举单例
- Bill Pugh单例

#### 3.5. 测试

进一步地，我们可以注意到单例在测试我们的代码时的缺点。

**单元测试应该只测试我们代码的一小部分，不应该依赖于可能失败的其他服务，从而导致我们的测试失败。**

让我们测试我们的_sum()_方法：

```java
@Test
void givenTwoValues_whenSum_thenReturnCorrectResult() {
    SingletonDemo singletonDemo = new SingletonDemo();
    int result = singletonDemo.sum(12, 4);
    assertEquals(16, result);
}
```

尽管我们的测试通过了，但它创建了一个日志文件，因为_sum()_方法使用了_Logger_类。

如果_Logger_类出了问题，我们的测试就会失败。现在，我们应该如何防止记录日志发生呢？

如果适用，一种解决方案是使用Mockito模拟静态_getInstance()_方法：

```java
@Test
void givenMockedLogger_whenSum_thenReturnCorrectResult() {
    Logger logger = mock(Logger.class);

    try (MockedStatic`<Logger>` loggerMockedStatic = mockStatic(Logger.class)) {
        loggerMockedStatic.when(Logger::getInstance).thenReturn(logger);
        doNothing().when(logger).log(any());

        SingletonDemo singletonDemo = new SingletonDemo();
        int result = singletonDemo.sum(12, 4);
        Assertions.assertEquals(16, result);
    }
}
```

### 4. 单例的替代方案

最后，让我们讨论一些替代方案。

在需要只有一个实例的情况下，**我们可以使用依赖注入。** 换句话说，我们可以只创建一个实例，并将其作为参数传递到需要它的地方。这样，我们将提高方法或另一个类需要正常工作所依赖的依赖项的意识。

此外，如果我们将来需要多个实例，我们将更容易地更改我们的代码。

此外，我们可以使用工厂模式来处理长期存在的对象。

### 5. 结论

在本文中，我们查看了单例设计模式的主要缺点。

总之，我们应该只在真正需要时使用这种模式。过度使用它在实际不需要单一实例的情况下引入了不必要的限制。作为替代方案，我们可以简单地使用依赖注入并将对象作为参数传递。

如常，所有示例的代码都可以在GitHub上找到。