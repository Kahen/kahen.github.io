---
date: 2022-04-01
category:
  - Java Collections
  - Data Structures
tag:
  - Set
  - List
head:
  - - meta
    - name: keywords
      content: Java, Set, List, Collections, Data Structures
---
# Java中的Set与List对比

在本教程中，我们将通过一个简单的例子讨论Java中Set和List的差异。此外，我们还将从性能和内存分配的角度比较这两种数据结构。

## 2. 概念差异

List和Set都是Java Collections的成员。然而，它们之间有一些重要的区别：

- List可以包含重复项，但Set不能。
- List会保留插入顺序，但Set可能保留也可能不保留。
- 由于Set可能不保留顺序，因此它不允许像List那样基于索引的访问。

请注意，有一些Set接口的实现确实保留了顺序，例如LinkedHashSet。

## 3. 代码示例

### 3.1. 允许重复项
对于List，允许添加重复项。然而，对于Set则不允许：

```java
@Test
public void givenList_whenDuplicates_thenAllowed(){
    List```````<Integer>``````` integerList = new ArrayList<>();
    integerList.add(2);
    integerList.add(3);
    integerList.add(4);
    integerList.add(4);
    assertEquals(integerList.size(), 4);
}

@Test
public void givenSet_whenDuplicates_thenNotAllowed(){
    Set```````<Integer>``````` integerSet = new HashSet<>();
    integerSet.add(2);
    integerSet.add(3);
    integerSet.add(4);
    integerSet.add(4);
    assertEquals(integerSet.size(), 3);
}
```

### 3.2. 保持插入顺序
Set是否保持顺序取决于实现。例如，HashSet不能保证保留顺序，但LinkedHashSet可以。让我们看看使用LinkedHashSet的顺序示例：

```java
@Test
public void givenSet_whenOrdering_thenMayBeAllowed(){
    Set```````<Integer>``````` set1 = new LinkedHashSet<>();
    set1.add(2);
    set1.add(3);
    set1.add(4);
    Set```````<Integer>``````` set2 = new LinkedHashSet<>();
    set2.add(2);
    set2.add(3);
    set2.add(4);
    Assert.assertArrayEquals(set1.toArray(), set2.toArray());
}
```

由于Set不能保证保持顺序，因此它不能被索引。

## 4. List和Set之间的性能比较

让我们使用Java Microbench Harness (JMH)来比较List和Set数据结构的性能。首先，我们将创建两个类：ListAndSetAddBenchmark和ListAndSetContainBenchmark。然后，我们将测量List和Set数据结构的add()和contains()方法的执行时间。

### 4.1. JMH参数
我们将使用以下参数执行基准测试：

```java
@BenchmarkMode(Mode.SingleShotTime)
@Warmup(iterations = 3, time = 10, timeUnit = TimeUnit.MILLISECONDS)
@Measurement(iterations = 3, time = 10, timeUnit = TimeUnit.MILLISECONDS)
public class ListAndSetAddBenchmark {
}
```

在上面的类中，我们指定了基准测试的模式。@BenchmarkMode(Mode.SingleShotTime)注解设置了基准测试运行的模式。在我们的例子中，模式是SingleShotTime，这意味着基准测试将运行一次并测量执行所需的时间。

@Warmup注解指定了预热阶段的迭代次数和每次迭代的运行时间。在我们的情况下，预热阶段将由三次迭代组成，每次迭代运行10毫秒。

此外，@Measurement注解指定了测量阶段的迭代次数和每次迭代的运行时间。我们的例子类显示，测量阶段将由三次迭代组成，每次迭代运行10毫秒。

### 4.2. add()
首先，让我们创建一个内部类来声明基准测试方法将使用的变量：

```java
@State(Scope.Benchmark)
public static class Params {
    public int addNumber = 10000000;
    public List```````<Integer>``````` arrayList = new ArrayList<>();
    public Set```````<Integer>``````` hashSet = new HashSet<>();
}
```

@State注解有助于使类成为状态类。状态类保存基准测试方法用于计算的数据。

接下来，让我们测试ArrayList()的add()操作：

```java
@Benchmark
public void addElementsToArrayList(Params param, Blackhole blackhole) {
    param.arrayList.clear();
    for (int i = 0; i < param.addNumber; i++) {
        blackhole.consume(arrayList.add(i));
    }
}
```

上述方法测量向ArrayList添加元素所需的时间。@Benchmark注解表示它是一个基准测试方法。Blackhole参数用于消耗基准测试方法的结果。

此外，让我们测试向HashSet()添加元素：

```java
@Benchmark
public void addElementToHashSet(Params param, Blackhole blackhole) {
    param.hashSet.clear();
    for (int i = 0; i < param.addNumber; i++) {
        blackhole.consume(hashSet.add(i));
    }
}
```

在这里，我们测量向HashSet添加10000000个元素所需的时间。@Benchmark注解表示该方法是基准测试方法。当JMH遇到该方法时，它会生成代码来测量方法的性能。

最后，让我们比较测试结果：

```java
Benchmark             Mode  Cnt  Score   Error  Units
addElementToArrayList   ss   15  0.386 ± 1.266   s/op
addElementToHashSet     ss   15  0.419 ± 2.535   s/op
```

结果表明，向ArrayList添加元素比向HashSet添加元素更快。在我们需要尽可能快地向集合添加元素的场景中，ArrayList更有效。

### 4.3. contains()
首先，让我们定义一个内部类来填充ArrayList和HashSet：

```java
@State(Scope.Benchmark)
public static class Params {
    @Param({"5000000"})
    public int searchElement;

    @Param({"10000000"})
    public int collectionSize;

    public List```````<Integer>``````` arrayList;
    public Set```````<Integer>``````` hashSet;

    @Setup(Level.Iteration)
    public void setup() {
        arrayList = new ArrayList<>();
        hashSet = new HashSet<>();
        for (int i = 0; i < collectionSize; i++) {
            arrayList.add(i);
            hashSet.add(i);
        }
    }
}
```

@Param注解指定了基准测试的参数。在这种情况下，它定义了一个名为searchElement和collectionSize的参数，每个参数都有一个单一的值。这些参数将用于配置基准测试。

@Setup注解标记了在每次迭代之前应该执行的方法。

接下来，让我们使用ArrayList测试contains()操作：

```java
@Benchmark
public void searchElementInArrayList(Params param, Blackhole blackhole) {
    for (int i = 0; i < param.containNumber; i++) {
        blackhole.consume(arrayList.contains(searchElement));
    }
}
```

searchElementInArrayList()方法在ArrayList中搜索5000000。

最后，让我们实现HashSet中的contains()操作：

```java
@Benchmark
public void searchElementInHashSet(Params param, Blackhole blackhole) {
    for (int i = 0; i < param.containNumber; i++) {
        blackhole.consume(hashSet.contains(searchElement));
    }
}
```

与searchElementInArrayList()方法一样，我们在HashSet中搜索5000000。

这是结果：

```java
Benchmark                 Mode   Cnt   Score   Error  Units
searchElementInArrayList     ss   15   0.014 ± 0.015   s/op
searchElementInHashSet       ss   15   ≈ 10⁻⁵          s/op
```

结果表明，在HashSet中搜索元素比在ArrayList中搜索元素更快。这证实了在我们需要快速高效地在集合中搜索元素的场景中，HashSet更有效。

## 5. List和Set之间的内存分配比较

在前一节中，我们看到了不同的指标，用于衡量List和Set在时间方面的性能。让我们通过在运行基准测试时指定_gc_分析器选项“-prof gc”来测量基准方法的内存分配。

让我们修改main()方法，并为两个基准测试类配置JMH运行选项：

```java
public static void main(String[] args) throws RunnerException {
    Options opt = new OptionsBuilder()
      .include(ListAndSetAddBenchmark.class.getSimpleName())
      .forks(1)
      .addProfiler("gc")
      .build();
    new Runner(opt).run();
}
```

在上面的方法中，我们创建了一个新的Options对象来配置JMH。首先，我们使用include()方法指定要运行的基准测试。接下来，我们使用fork()方法指定基准测试应该运行的次数。

此外，我们使用addProfiler()方法指定要使用的分析器。在这种情况下，我们使用的是gc分析器。

此配置适用于ListAndSetAddBenchmark类。我们还需要修改ListAndSetContainBenchmark的main()方法，以添加gc分析器：

```java
public static void main(String[] args) throws RunnerException {
    Options opt = new OptionsBuilder()
      .include(ListAndSetContainBenchmark.class.getSimpleName())
      .forks(1)
      .addProfiler("gc")
      .build();
    new Runner(opt).run();
}
```

这是测试结果：

```java
Benchmark                                         Mode  Cnt    Score     Error    Units
addElementToArrayList:·gc.alloc.rate                ss    3     172.685 ± 254.719  MB/sec
addElementToHashSet:·gc.alloc.rate                  ss    3     504.746 ± 1323.322 MB/sec
searchElementInArrayList:·gc.alloc.rate             ss    3     248.628 ± 395.569  MB/sec
searchElementInHashSet:·gc.alloc.rate               ss    3     254.192 ± 235.294  MB/sec
```

结果表明，在add()操作中，addElementToHashSet()的gc.alloc.rate为504.746 MB/sec，高于addElementToArrayList()的172.685 MB/sec。这表明HashSet在执行期间分配了更多的内存，相比之下ArrayList较少。

此外，结果还显示HashSet在搜索操作中的内存分配略高于ArrayList。

错误值表明结果存在一些变异性，这可能取决于JVM预热和代码优化等因素。

## 6. 结论

在本文中，我们了解了Java中List和Set的区别。此外，我们还看到了一个基准测试，用于比较List和Set在时间和内存分配方面的性能。根据用例，List和Set可以针对特定操作更优。

如往常一样，示例的源代码可在GitHub上获得。

OK