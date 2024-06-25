---
date: 2024-06-26
category:
  - Java
  - Programming
tag:
  - Java
  - String Comparison
  - Set
  - List
  - Stream
head:
  - - meta
    - name: keywords
      content: Java, String Comparison, Set, List, Stream, Performance Benchmark
------
# 在Java中使用单一表达式比较一个字符串与多个值

在本教程中，我们将讨论使用单一表达式在一组字符串中查找一个字符串的各种方法。

假设我们有一个水果"Apple"和一组水果"Mango"、"Papaya"、"Apple"、"Pineapple"等。现在我们将探索各种方法，以查看字符串"Apple"是否在这些水果组中。

### 2. 问题介绍

在我们进入涵盖单一表达式解决方案的下一节之前，让我们看看使用_if_条件的实现方式：

```java
boolean compareWithMultipleStringsUsingIf(String str, String ... strs) {
    for(String s : strs) {
        if (str.equals(s)) {
            return true;
        }
    }
    return false;
}
```

这是一种非常基本的实现，也许是所有实现中最受欢迎的。我们遍历字符串数组，并在字符串str与strs中的任何一个元素匹配时返回true。

让我们看看这个方法是如何工作的：

```java
@Test
void givenStrings_whenCompareWithMultipleStringsUsingIf_thenSuccess() {
    String presentString = "Apple";
    String notPresentString = "Avocado";

    assertTrue(compareWithMultipleStringsUsingIf(presentString, "Mango", "Papaya", "Pineapple", "Apple"));
    assertFalse(compareWithMultipleStringsUsingIf(notPresentString, "Mango", "Papaya", "Pineapple", "Apple"));
}
```

我们正在查找如"Apple"和"Avocado"这样的字符串是否存在于一组水果中。但这涉及到多行代码。因此，让我们看看接下来的部分，了解涉及单一表达式的解决方案。

### 3. 使用Set匹配

java.util.Set具有contains()方法，用于检查集合中是否存在元素。因此，我们将在我们的用例中使用java.util.Set进行单一表达式：

```java
boolean compareWithMultipleStringsUsingSet(String str, String ... strs) {
    return Set.of(strs).contains(str);
}
```

**使用单一表达式，我们初始化了一个Set，然后使用contains()方法来查看str是否存在于Set中**。然而，我们不能使用Set实现单一表达式的不区分大小写的匹配方法。

让我们测试一下compareWithMultipleStringsUsingSet()方法：

```java
@Test
void givenStrings_whenCompareWithMultipleStringsUsingSet_thenSuccess() {
    String presentString = "Apple";
    String notPresentString = "Avocado";

    assertTrue(compareWithMultipleStringsUsingSet(presentString, "Mango", "Papaya", "Pineapple", "Apple"));
    assertFalse(compareWithMultipleStringsUsingSet(notPresentString, "Mango", "Papaya", "Pineapple", "Apple"));
}
```

就像之前一样，我们首先传递"Apple"给方法，它返回true，当我们传递"Avocado"时，它返回false。因此，这个方法运作得很好。

### 4. 使用List匹配

**与Set类似，List也有contains()方法**。因此让我们看看使用List的实现：

```java
boolean compareWithMultipleStringsUsingList(String str, String ... strs) {
    return List.of(strs).contains(str);
}
```

没有太大的区别，我们用List替换了Set。

让我们也看看它的实际应用：

```java
@Test
void givenStrings_whenCompareWithMultipleStringsUsingList_thenSuccess() {
    String presentString = "Apple";
    String notPresentString = "Avocado";

    assertTrue(compareWithMultipleStringsUsingList(presentString, "Mango", "Papaya", "Pineapple", "Apple"));
    assertFalse(compareWithMultipleStringsUsingList(notPresentString, "Mango", "Papaya", "Pineapple", "Apple"));
}
```

contains()方法按预期工作，返回正确的结果。

### 5. 使用Stream匹配

**Stream API鼓励使用声明性语句，因此它可以帮助我们实现单一表达式方法**：

```java
boolean compareWithMultipleStringsUsingStream(String str, String ... strs) {
    return Arrays.stream(strs).anyMatch(str::equals);
}
```

在单一表达式中，我们将字符串数组转换为Stream，然后使用anyMatch()方法。anyMatch()方法是Stream管道中的一个终端操作。Stream中的每个元素都与字符串str进行比较。然而，anyMatch()方法返回第一个匹配项。

让我们看看这个方法的实际应用：

```java
@Test
void givenStrings_whenCompareWithMultipleStringsUsingStream_thenSuccess() {
    String presentString = "Apple";
    String notPresentString = "Avocado";

    assertTrue(compareWithMultipleStringsUsingStream(presentString, "Mango", "Papaya", "Pineapple", "Apple"));
    assertFalse(compareWithMultipleStringsUsingStream(notPresentString, "Mango", "Papaya", "Pineapple", "Apple"));
}
```

该方法按预期工作，当"Apple"和"Avocado"作为第一个参数时，分别返回true和false。

让我们看看使用Stream的不区分大小写的版本：

```java
boolean compareCaseInsensitiveWithMultipleStringsUsingStream(String str, String ... strs) {
    return Arrays.stream(strs).anyMatch(str::equalsIgnoreCase);
}
```

与早期版本不同，我们必须将equalsIgnoreCase()方法作为anyMatch()的谓词调用。

我们现在可以看看这个方法的实际应用：

```java
@Test
void givenStrings_whenCompareCaseInsensitiveWithMultipleStringsUsingStream_thenSuccess() {
    String presentString = "APPLE";
    String notPresentString = "AVOCADO";

    assertTrue(compareCaseInsensitiveWithMultipleStringsUsingStream(presentString, "Mango", "Papaya", "Pineapple", "Apple"));
    assertFalse(compareCaseInsensitiveWithMultipleStringsUsingStream(notPresentString, "Mango", "Papaya", "Pineapple", "Apple"));
}
```

这次它可以在"Mango"、"Papaya"、"Pineapple"和"Apple"中找到"APPLE"。

### 6. 使用StringUtils匹配

在我们使用commons-lang3库中的StringUtils类之前，让我们首先用Maven依赖更新pom.xml：

```xml
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-lang3`</artifactId>`
    `<version>`3.13.0`</version>`
`</dependency>`
```

现在，让我们使用StringUtils类：

```java
boolean compareWithMultipleStringsUsingStringUtils(String str, String ... strs) {
    return StringUtils.equalsAny(str, strs);
}
```

**StringUtils中的equalsAny()方法帮助我们用单一表达式实现我们的用例**。

让我们看看这个方法的实际应用：

```java
@Test
void givenStrings_whenCompareWithMultipleStringsUsingStringUtils_thenSuccess() {
    String presentString = "Apple";
    String notPresentString = "Avocado";

    assertTrue(compareWithMultipleStringsUsingStringUtils(presentString, "Mango", "Papaya", "Pineapple", "Apple"));
    assertFalse(compareWithMultipleStringsUsingStringUtils(notPresentString, "Mango", "Papaya", "Pineapple", "Apple"));
}
```

这也按预期工作，当"Apple"和"Mango"分别作为方法的参数时，返回true和false。

让我们也看看方法的不区分大小写版本：

```java
boolean compareCaseInsensitiveWithMultipleStringsUsingStringUtils(String str, String ... strs) {
    return StringUtils.equalsAnyIgnoreCase(str, strs);
}
```

**我们使用了StringUtils的equalsAnyIgnoreCase()方法，而不是equalsAny()方法**。

让我们看看这个方法是如何工作的：

```java
@Test
void givenStrings_whenCompareCaseInsensitiveWithMultipleStringsUsingStringUtils_thenSuccess() {
    String presentString = "APPLE";
    String notPresentString = "AVOCADO";

    assertTrue(compareCaseInsensitiveWithMultipleStringsUsingStringUtils(presentString, "Mango", "Papaya", "Pineapple", "Apple"));
    assertFalse(compareCaseInsensitiveWithMultipleStringsUsingStringUtils(notPresentString, "Mango", "Papaya", "Pineapple", "Apple"));
}
```

我们成功地在水果组中找到了字符串"APPLE"。

### 7. 使用ArrayUtils匹配

此外，我们将看到commons-lang库中的另一个类ArrayUtils：

```java
boolean compareWithMultipleStringsUsingArrayUtils(String str, String ... strs) {
    return ArrayUtils.contains(strs, str);
}
```

**ArrayUtils是一个实用工具类，用于检查一个元素是否存在于对象数组中**。因此，我们利用它来帮助我们实现涉及字符串的用例。不幸的是，ArrayUtils没有提供任何方法以不区分大小写的方式查找字符串对象。因此我们不能为此实现单一表达式。

让我们看看compareWithAnyUsingArrayUtils()方法是如何工作的：

```java
@Test
void givenStrings_whenCompareWithMultipleStringsUsingArrayUtils_thenSuccess() {
    String presentString = "Apple";
    String notPresentString = "Avocado";

    assertTrue(compareWithMultipleStringsUsingArrayUtils(```java
assertTrue(compareWithMultipleStringsUsingArrayUtils(presentString, "Mango", "Papaya", "Pineapple", "Apple"));
assertFalse(compareWithMultipleStringsUsingArrayUtils(notPresentString, "Mango", "Papaya", "Pineapple", "Apple"));
}
```

毫不意外，它也工作得很好。

### 8. 使用正则表达式匹配

正则表达式有助于查找模式，因此我们将在我们的用例中使用它：

```java
boolean compareWithMultipleStringsUsingRegularExpression(String str, String ... strs) {
    return str.matches(String.join("|", strs));
}
```

String.join()方法创建了一个由竖线分隔的字符串列表，例如Mango|Papaya|Pineapple|Apple，用作正则表达式模式。在单一表达式中，我们使用字符串数组创建了正则表达式模式，然后使用matches()方法检查字符串str是否具有该模式。

是时候看看这个方法的实际应用了：

```java
@Test
void givenStrings_whenCompareWithMultipleStringsUsingRegularExpression_thenSuccess() {
    String presentString = "Apple";
    String notPresentString = "Avocado";

    assertTrue(compareWithMultipleStringsUsingRegularExpression(presentString, "Mango", "Papaya", "Pineapple", "Apple"));
    assertFalse(compareWithMultipleStringsUsingRegularExpression(notPresentString, "Mango", "Papaya", "Pineapple", "Apple"));
}
```

该方法对参数"Mango"返回true，对"Avocado"返回false。因此，我们可以说它也是有效的。**然而，正则表达式总是性能密集型的，所以最好避免使用它们**。

现在，让我们看看不区分大小写的实现：

```java
boolean compareCaseInsensitiveWithMultipleStringsUsingRegularExpression(String str, String ... strs) {
    return str.matches("(?i)" + String.join("|", strs));
}
```

我们只需要通过在正则表达式前面加上(?i)来修改正则表达式，以进行不区分大小写的模式匹配。

让我们看看这个方法的实际应用：

```java
@Test
void givenStrings_whenCompareCaseInsensitiveUsingRegularExpression_thenSuccess() {
    String presentString = "APPLE";
    String notPresentString = "AVOCADO";

    assertTrue(compareCaseInsensitiveWithMultipleStringsUsingRegularExpression(presentString, "Mango", "Papaya", "Pineapple", "Apple"));
    assertFalse(compareCaseInsensitiveWithMultipleStringsUsingRegularExpression(notPresentString, "Mango", "Papaya", "Pineapple", "Apple"));
}
```

通过使用这个方法，我们现在可以在提供的水果组中找到"APPLE"。

### 9. 基准测试

让我们使用Java Microbenchmark Harness (JMH)计算每种单一表达式方法的平均执行时间。

让我们看看为执行基准测试配置的类：

```java
@State(Scope.Benchmark)
@BenchmarkMode(Mode.AverageTime)
@Warmup(iterations = 2)
@Measurement(iterations = 5)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@Fork(value = 1)
public class CompareAnyBenchmark {
    private final String[] groupOfFruits = {"Apple", "Mango", "Dragon Fruit", "Water Melon", "Avocado", "Guava", "Orange"};
    private final String fruit = "Apple";

    @Benchmark
    public boolean compareWithMultipleStringsUsingStringUtils() {
        return StringUtils.equalsAny(fruit, groupOfFruits);
    }

    @Benchmark
    public boolean compareCaseInsensitiveWithMultipleStringsUsingStringUtils() {
        return StringUtils.equalsAnyIgnoreCase(fruit, groupOfFruits);
    }
    //其他基准测试方法...

    public static void main(String[] args) throws Exception {
        Options options = new OptionsBuilder().include(CompareAnyBenchmark.class.getSimpleName())
          .threads(1)
          .shouldFailOnError(true)
          .shouldDoGC(true)
          .jvmArgs("-server")
          .build();
        new Runner(options).run();
    }
}
```

类级别的注解设置了基准测试，以测量每种方法执行的平均时间，以纳秒为单位，运行五次。最后，main()方法是运行基准测试的。

现在，让我们看看到目前为止我们讨论的每种方法的平均执行时间：

| **方法名称**| **平均时间**| **误差(±)**| **单位**|
| ---| ---| ---| ---|
| compareWithMultipleStringsUsingArrayUtils()| 1.150| 0.031| ns/op|
| compareWithMultipleStringsUsingRegularExpression()| 1175.809| 177.940| ns/op|
| compareWithMultipleStringsUsingSet()| 96.961| 11.943| ns/op|
| compareWithMultipleStringsUsingList()| 28.718| 1.612| ns/op|
| compareWithMultipleStringsUsingStream()| 47.266| 3.968| ns/op|
| compareWithMultipleStringsUsingStringUtils| 1.507| 0.040| ns/op|
| compareCaseInsensitiveWithMultipleStringsUsingRegularExpression()| 1803.497| 645.104| ns/op|
| compareCaseInsensitiveWithMultipleStringsUsingStream()| 63.079| 56.509| ns/op|
| compareCaseInsensitiveWithMultipleStringsUsingStringUtils()| 1.521| 0.077| ns/op|

使用正则表达式的compareCaseInsensitiveWithMultipleStringsUsingRegularExpression()和compareWithMultipleStringsUsingRegularExpression()方法需要最长的执行时间。另一方面，compareWithMultipleStringsUsingArrayUtils()和compareWithMultipleStringsUsingStringUtils()方法需要的执行时间最少。

**不考虑任何外部库，compareWithMultipleStringsUsingStream()和compareCaseInsensitiveWithMultipleStringsUsingStream()方法具有最佳得分**。此外，对于不区分大小写的搜索，性能变化也不大。

### 10. 结论

在本文中，我们探讨了在一组字符串中查找一个字符串存在的各种方法。使用java.util.Set、java.util.List、java.util.Stream和正则表达式，我们没有使用JDK之外的任何外部库。因此，建议使用它们而不是像commons-lang这样的外部库。此外，List实现是JDK库中的最佳选择。

像往常一样，代码示例可以在GitHub上找到。
```

OK