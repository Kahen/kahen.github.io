---
date: 2024-06-27
category:
  - Java
  - 编程
tag:
  - Java Map
  - 编程技巧
head:
  - - meta
    - name: keywords
      content: Java, Map, 编程技巧，字符频率统计
---
# 如何在Java中递增Map的值

在本教程中，我们将探讨几种在Map中与键关联的数值递增的方法。Map接口是Java集合框架的一部分，表示键值对的集合。一些常见的Map实现包括HashMap、TreeMap和LinkedHashMap。

### 问题陈述
让我们看一个例子，我们有一个字符串输入，并在Map中存储句子中每个字符出现的频率。这里是一个问题的例子和输出：

```
示例句子：
"the quick brown fox jumps over the lazy dog"

字符频率：
t: 2次
h: 2次
e: 3次
q: 1次
u: 2次
......等等
```

解决方案将涉及在Map中存储字符频率，其中键是字符，值是字符在给定字符串中出现的总次数。由于字符串中可能有重复的字符，我们需要更新与键关联的值，或者更确切地说，多次递增键的当前值。

### 解决方案
#### 3.1 使用containsKey()
解决我们问题的最简单的方法是遍历字符串，并在每一步使用containsKey()方法检查字符在Map中的存在。如果键存在，我们将值递增1，或者在Map中放入一个新的条目，键是字符，值是1：

```java
public Map``````````<Character, Integer>`````````` charFrequencyUsingContainsKey(String sentence) {
    Map``````````<Character, Integer>`````````` charMap = new HashMap<>();
    for (int c = 0; c < sentence.length(); c++) {
        int count = 0;
        if (charMap.containsKey(sentence.charAt(c))) {
            count = charMap.get(sentence.charAt(c));
        }
        charMap.put(sentence.charAt(c), count + 1);
    }
    return charMap;
}
```

#### 3.2 使用getOrDefault()
Java 8在Map中引入了getOrDefault()方法，这是一种简单的方式，用于检索Map中与键关联的值，或者如果键不存在，则返回一个预设的默认值：

```java
V getOrDefault(Object key, V defaultValue);
```

我们将使用此方法来获取与当前字符串字符（我们的键）关联的值，并递增值1。这是compared to containsKey()的一个更简单且代码更简洁的替代方法：

```java
public Map``````````<Character, Integer>`````````` charFrequencyUsingGetOrDefault(String sentence) {
    Map``````````<Character, Integer>`````````` charMap = new HashMap<>();
    for (int c = 0; c `< sentence.length(); c++) {
        charMap.put(sentence.charAt(c),
            charMap.getOrDefault(sentence.charAt(c), 0) + 1);
    }
    return charMap;
}
```

#### 3.3 使用merge()
Java 8提供的merge()方法是Map中的一种方式，用于用更新后的值覆盖特定键与Map中的关联值。该方法接受一个键、一个值和一个重新映射函数，用于计算将替换Map中现有值的新更新值：

```java
default V merge(K key, V value, BiFunction<? super V,? super V,? extends V>` remappingFunction)
```

重新映射函数是一个BiFunction，这意味着它遵循Java 8的函数式编程范式。我们将我们期望的函数作为参数内联传递给merge()方法，以及参数，它执行所需的功能。

该方法期望我们定义一个默认值，该值将与重新映射函数的结果合并。因此，我们可以将我们的重新映射函数写成默认值（即1）和键当前存在的值的总和：

```java
(a, b) -> a + b
```

我们也可以使用方法引用重写相同的代码：

```java
public Map``````````<Character, Integer>`````````` charFrequencyUsingMerge(String sentence) {
    Map``````````<Character, Integer>`````````` charMap = new HashMap<>();
    for (int c = 0; c `< sentence.length(); c++) {
        charMap.merge(sentence.charAt(c), 1, Integer::sum);
    }
    return charMap;
}
```

#### 3.4 使用compute()
compute()方法与merge()方法不同之处在于，compute()方法对缺失的键没有影响，并且不会抛出异常。该方法不接受任何值，重新映射函数应该决定新值：

```java
V compute(K key, BiFunction<? super K, ? super V, ? extends V>` remappingFunction)
```

我们需要处理键缺失且值为null的情况，并将值设置为默认的1。

```java
public Map``````````<Character, Integer>`````````` charFrequencyUsingCompute(String sentence) {
    Map``````````<Character, Integer>`````````` charMap = new HashMap<>();
    for (int c = 0; c `< sentence.length(); c++) {
        charMap.compute(sentence.charAt(c), (key, value) ->` (value == null) ? 1 : value + 1);
    }
    return charMap;
}
```

#### 3.5 使用AtomicInteger的incrementAndGet()
我们可以使用AtomicInteger类型来存储字符的频率，而不是我们的常规Integer包装类。这通过引入代码的原子性来使我们受益，并且我们可以使用AtomicInteger类的incrementAndGet()方法。该方法对值执行原子递增操作，相当于++i操作。

此外，我们还应该确保使用Map的putIfAbsent()方法使键存在：

```java
public Map```<Character, AtomicInteger>``` charFrequencyWithGetAndIncrement(String sentence) {
    Map```<Character, AtomicInteger>``` charMap = new HashMap<>();
    for (int c = 0; c < sentence.length(); c++) {
        charMap.putIfAbsent(sentence.charAt(c), new AtomicInteger(0));
        charMap.get(sentence.charAt(c)).incrementAndGet();
    }
    return charMap;
}
```

注意，此方法的返回类型为AtomicInteger。

此外，我们可以通过使用computeIfAbsent()以更紧凑的方式重写相同的代码，通过传递一个重新映射函数给它：

```java
public Map```<Character, AtomicInteger>``` charFrequencyWithGetAndIncrementComputeIfAbsent(String sentence) {
    Map```<Character, AtomicInteger>``` charMap = new HashMap<>();
    for (int c = 0; c `< sentence.length(); c++) {
        charMap.computeIfAbsent(sentence.charAt(c), k->` new AtomicInteger(0)).incrementAndGet();
    }
    return charMap;
}
```

#### 3.6 使用Guava
我们也可以使用Guava库来解决问题。要使用Guava，我们首先应该将Maven库作为依赖项添加：

```xml
``<dependency>``
    ```<groupId>```com.google.guava```</groupId>```
    ```<artifactId>```guava```</artifactId>```
    ```<version>```32.1.3-jre```</version>```
```</dependency>```
```

Guava提供了一个AtomicLongMap类，它有一个内置的getAndIncrement()方法，这对我们的用例很有帮助：

```java
public Map`<Character, Long>` charFrequencyUsingAtomicMap(String sentence) {
    AtomicLongMap`<Character>` map = AtomicLongMap.create();
    for (int c = 0; c < sentence.length(); c++) {
        map.getAndIncrement(sentence.charAt(c));
    }
    return map.asMap();
}
```

### 基准测试方法
JMH是我们可以用来基准测试上述不同方法的工具。要开始，我们包括相关的依赖项：

```xml
``<dependency>``
    ```<groupId>```org.openjdk.jmh```</groupId>```
    ```<artifactId>```jmh-core```</artifactId>```
    ```<version>```1.37```</version>```
```</dependency>```
``<dependency>``
    ```<groupId>```org.openjdk.jmh```</groupId>```
    ```<artifactId>```jmh-generator-annprocess```</artifactId>```
    ```<version>```1.37```</version>```
```</dependency>```
```

可以在Maven Central找到JMH Core和JMH Annotation Processor的最新版本。

我们将每种方法包装在带有Benchmark注解的方法中，并传递一些额外的参数：

```java
@Benchmark
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@Fork(value = 1, warmups = 1)
public void benchContainsKeyMap() {
    IncrementMapValueWays im = new IncrementMapValueWays();
    im.charFrequencyUsingContainsKey(getString());
}

@Benchmark
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@Fork(value = 1, warmups = 1)
public void benchMarkComputeMethod() {
    IncrementMapValueWays im = new IncrementMapValueWays();
    im.charFrequencyUsingCompute(getString());
}
// 等等
```

**在运行基准测试后，我们看到compute()和merge()方法比其他方法表现得更好：**

```
Benchmark                                      Mode  Cnt       Score       Error  Units
BenchmarkMapMethodsJMH.benchContainsKeyMap     avgt    5   50697.511 ± 25054.056  ns/op
BenchmarkMapMethodsJMH.benchMarkComputeMethod  avgt    5   45124.359 ±   377.541  ns/op
BenchmarkMapMethodsJMH.benchMarkGuavaMap       avgt    5  121372.968 ±   853.782  ns/op
BenchmarkMapMethodsJMH.benchMarkMergeMethod    avgt    5   46185.990 ±  5446.775  ns/op
```

我们也应该注意到这些结果会略有不同，并且当键的总体范围不是那么大时可能不会太明显。由于我们的例子中只考虑了英文字符和一些特殊字符，键的范围被限制在几百个。对于其他情况，键的数量可能很大，性能将是一个大问题。

### 多线程考虑
我们上面讨论的方法没有考虑到多线程。如果有多个线程正在读取输入字符串并更新共享的Map，我们肯定会容易受到增量操作中的并发修改。这将导致我们最终结果中的计数不一致。

**我们可以通过使用ConcurrentHashMap来解决这个问题，它是我们常规HashMap的线程安全替代品。** ConcurrentHashMap提供了对并发操作的支持，不需要外部同步。

```java
Map``````````<Character, Integer>`````````` charMap = new ConcurrentHashMap<>();
```

**在我们的解决方案中，我们还应该考虑我们正在做的字符计数递增操作应该是原子的。为了确保这一点，我们应该使用像compute()和merge()这样的原子方法。**

让我们编写一个测试用例来验证我们的断言。我们将创建两个线程，它们共享一个并发哈希映射的实例。每个线程获取字符串输入的一部分并执行相同的操作：

```java
@Test
public void givenString_whenUsingConcurrentMapCompute_thenReturnFreqMap() throws InterruptedException {
    Map``````````<Character, Integer>`````````` charMap = new ConcurrentHashMap<>();
    Thread thread1 = new Thread(() -> {
        IncrementMapValueWays ic = new IncrementMapValueWays();
        ic.charFrequencyWithConcurrentMap("the quick brown", charMap);
    });

    Thread thread2 = new Thread(() -> {
        IncrementMapValueWays ic = new IncrementMapValueWays();
        ic.charFrequencyWithConcurrentMap(" fox jumps over the lazy dog", charMap);
    });

    thread1.start();
    thread2.start();
    thread1.join();
    thread2.join();

    Map``````````<Character, Integer>`````````` expectedMap = getExpectedMap();
    Assert.assertEquals(expectedMap, charMap);
}
```

### 结论
在本文中，我们探讨了递增Map条目值的不同方式。我们对方法的执行速度进行了基准测试，并查看了如何编写线程安全的解决方案。

正如往常一样，本文中使用的所有代码片段都可以在GitHub上找到。

OK