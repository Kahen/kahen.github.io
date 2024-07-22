---
date: 2024-07-22
category:
  - Java
  - InstantSource
tag:
  - Java 17
  - InstantSource
head:
  - - meta
    - name: keywords
      content: Java, InstantSource, Java 17, 时间测试, 时间源抽象
---
# Java 17中InstantSource接口简介

在这个教程中，我们将深入探讨Java 17中引入的InstantSource接口，它提供了当前瞬间的可插拔表示，并避免了对时区的引用。

## 2. InstantSource接口
正如我们在原始提案和相关问题中看到的，这个接口的第一个目标是创建一个抽象，以替代java.time.Clock提供的时区。它还简化了在测试期间为代码部分创建存根以检索瞬间。

它在Java 17中被添加，以提供一种安全的方式来访问当前瞬间，如以下示例所示：

```java
class AQuickTest {
    InstantSource source;
    ...
    Instant getInstant() {
        return source.instant();
    }
}
```

然后，我们可以简单地获取一个瞬间：

```java
var quickTest = new AQuickTest(InstantSource.system());
quickTest.getInstant();
```

它的实现创建了可以在任何地方用来检索瞬间的对象，并且它为测试目的提供了一种有效的方式来创建存根实现。

让我们更深入地了解使用这个接口的好处。

## 3. 问题与解决方案
为了更好地理解InstantSource接口，让我们深入探讨它被创建来解决的问题以及它提供的解决方案。

### 3.1. 测试问题
测试涉及检索Instant的代码通常是一场噩梦，尤其是当获取该Instant的方式基于当前数据解决方案，如LocalDateTime.now()。

**为了在测试中提供一个特定的日期，我们通常会创建一些变通方法，比如创建一个外部日期工厂，并在测试中提供一个存根实例。**

让我们看以下代码作为解决这个问题的变通方法的例子。

InstantExample类使用InstantWrapper（或变通方法）来恢复一个瞬间：

```java
class InstantExample {
    InstantWrapper instantWrapper;
    Instant getCurrentInstantFromInstantWrapper() {
        return instantWrapper.instant();
    }
}
```

而我们的InstantWrapper变通类本身看起来像这样：

```java
class InstantWrapper {
    Clock clock;
    InstantWrapper() {
        this.clock = Clock.systemDefaultZone();
    }
    InstantWrapper(ZonedDateTime zonedDateTime) {
        this.clock = Clock.fixed(zonedDateTime.toInstant(), zonedDateTime.getZone());
    }
    Instant instant() {
        return clock.instant();
    }
}
```

然后，我们可以用它来为测试提供一个固定的瞬间：

```java
// given
LocalDateTime now = LocalDateTime.now();
InstantExample tested = new InstantExample(InstantWrapper.of(now), null);
Instant currentInstant = now.toInstant(ZoneOffset.UTC);
// when
Instant returnedInstant = tested.getCurrentInstantFromWrapper();
// then
assertEquals(currentInstant, returnedInstant);
```

### 3.2. 解决测试问题
本质上，我们上面应用的变通方法就是InstantSource所做的。**它提供了一个我们可以在任何需要的地方使用的外部Instant工厂。** Java 17提供了一个默认的系统范围实现（在Clock类中），我们也可以提供我们自己的：

```java
class InstantExample {
    InstantSource instantSource;
    Instant getCurrentInstantFromInstantSource() {
        return instantSource.instant();
    }
}
```

InstantSource是可插拔的。也就是说，它可以使用依赖注入框架注入，或者作为一个构造函数参数，传入我们正在测试的对象。因此，我们可以轻松地创建一个存根InstantSource，提供给它测试对象，并让它返回我们想要的瞬间进行测试：

```java
// given
LocalDateTime now = LocalDateTime.now();
InstantSource instantSource = InstantSource.fixed(now.toInstant(ZoneOffset.UTC));
InstantExample tested = new InstantExample(null, instantSource);
Instant currentInstant = instantSource.instant();
// when
Instant returnedInstant = tested.getCurrentInstantFromInstantSource();
// then
assertEquals(currentInstant, returnedInstant);
```

### 3.3. 时区问题
**当我们需要一个Instant时，我们有许多不同的地方可以获取它**，比如Instant.now()，Clock.systemDefaultZone().instant()甚至LocalDateTime.now.toInstant(zoneOffset)。问题是，根据我们选择的风味，**它可能会引入时区问题**。

例如，让我们看看当我们在Clock类上请求一个瞬间会发生什么：

```java
Clock.systemDefaultZone().instant();
```

这段代码将产生以下结果：

```java
2022-01-05T06:47:15.001890204Z
```

让我们从不同的源请求相同的瞬间，看看它返回什么：

```java
LocalDateTime.now().toInstant(ZoneOffset.UTC);
```

这产生了以下输出：

```java
2022-01-05T07:47:15.001890204Z
```

我们应该得到相同的瞬间，但实际上两者之间有60分钟的差异。

最糟糕的是，可能有两三个开发人员在同一段代码中使用这两种瞬间源的不同部分。如果是这样的话，我们就有问题了。

**我们通常不想在这一点上处理时区问题**。但是，要创建瞬间，我们需要一个源，而这个源总是带有附加的时区。

### 3.4. 解决时区问题
**InstantSource抽象了我们选择瞬间源的过程**。这个选择已经为我们做好了。可能是另一位程序员设置了一个系统范围的自定义实现，或者我们正在使用Java 17提供的实现，正如我们将在下一节中看到的。

正如InstantExample所示，我们插入了一个InstantSource，我们不需要知道其他任何事情。我们可以移除我们的InstantWrapper变通方法，只是使用插入的InstantSource。

现在我们已经看到了使用这个接口的好处，让我们通过了解它的静态和实例方法来看看它还提供了什么。

## 4. 工厂方法
可以使用以下工厂方法来创建一个InstantSource对象：

- **system() –** 默认的系统范围实现
- **tick(InstantSource, Duration) –** 返回一个**截断到给定持续时间的最近表示的InstantSource**
- **fixed(Instant) –** 返回一个**总是产生相同Instant的InstantSource**
- **offset(InstantSource, Duration) –** 返回一个**提供给定偏移的Instants的InstantSource**

让我们看看这些方法的一些基本用法。

### 4.1. system()
Java 17中的当前默认实现是Clock.SystemInstantSource类。

```java
Instant i = InstantSource.system().instant();
```

### 4.2. tick()
基于前面的示例：

```java
Instant i = InstantSource.system().instant();
System.out.println(i);
```

运行这段代码后，我们将得到以下输出：

```java
2022-01-05T07:44:44.861040341Z
```

但是，如果我们应用了2小时的滴答持续时间：

```java
Instant i = InstantSource.tick(InstantSource.system(), Duration.ofHours(2)).instant();
```

然后，我们将得到以下结果：

```java
2022-01-05T06:00:00Z
```

### 4.3. fixed()
当我们需要为测试目的创建一个存根InstantSource时，这个方法非常方便：

```java
LocalDateTime fixed = LocalDateTime.of(2022, 1, 1, 0, 0);
Instant i = InstantSource.fixed(fixed.toInstant(ZoneOffset.UTC)).instant();
System.out.println(i);
```

上述总是返回相同的瞬间：

```java
2022-01-01T00:00:00Z
```

### 4.4. offset()
基于前面的示例，我们将对固定的InstantSource应用一个偏移，看看它返回什么：

```java
LocalDateTime fixed = LocalDateTime.of(2022, 1, 1, 0, 0);
InstantSource fixedSource = InstantSource.fixed(fixed.toInstant(ZoneOffset.UTC));
Instant i = InstantSource.offset(fixedSource, Duration.ofDays(5)).instant();
System.out.println(i);
```

执行这段代码后，我们将得到以下输出：

```java
2022-01-06T00:00:00Z
```

## 5. 实例方法
可用于与InstantSource实例交互的方法是：

- **instant() –** 返回由InstantSource提供的当前Instant
- **millis() –** 返回InstantSource提供的当前Instant的毫秒表示
- **withZone(ZoneId) –** 接收一个ZoneId，并返回一个基于给定InstantSource和指定ZoneId的时钟

### 5.1. instant()
这种方法的最基本用法是：

```java
Instant i = InstantSource.system().instant();
System.out.println(i);
```

运行这段代码将显示以下输出：

```java
2022-01-05T08:29:17.641839778Z
```

### 5.2. millis()
为了从InstantSource获取纪元：

```java
long m = InstantSource.system().millis();
System.out.println(m);
```

运行后，我们将得到以下结果：

```java
1641371476655
```

### 5.3. withZone()
让我们为特定的ZoneId获取一个Clock实例：

```java
Clock c = InstantSource.system().withZone(ZoneId.of("-4"));
System.out.println(c);
```

这将