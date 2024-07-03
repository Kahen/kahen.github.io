---
date: 2022-04-05
category:
  - Java
  - 字符串处理
tag:
  - 正则表达式
  - 字符串分割
head:
  - - meta
    - name: keywords
      content: Java, 字符串处理, 正则表达式, 字符串分割
---

# Java中将字符串分割为数字和非数字子字符串

在Java编程中，处理字符串是一项基本任务，有时我们需要将一个字符串分割成多个子字符串以供进一步处理。无论是解析用户输入还是处理数据文件，了解如何有效地拆分字符串都是至关重要的。

在本教程中，我们将探索不同的方法和技术，将输入字符串分解为包含数字和非数字字符串元素的字符串数组或列表，保持原始顺序。

## 2. 问题介绍

像往常一样，我们通过例子来理解问题。

假设我们有两个输入字符串：

```java
String INPUT1 = "01Michael Jackson23Michael Jordan42Michael Bolton999Michael Johnson000";
String INPUT2 = "Michael Jackson01Michael Jordan23Michael Bolton42Michael Johnson999Great Michaels";
```

如上述示例所示，两个字符串都包含连续的数字和非数字字符。例如，INPUT1中的连续数字子字符串是“01”，“23”，“42”，“999”和“000”。非数字子字符串是“Michael Jackson”，“Michael Jordan”，“Michael Bolton”等。

INPUT2类似。不同之处在于它以非数字字符串开头。因此，我们可以得出一些输入特征：

- 数字或非数字子字符串的长度是动态的。
- 输入字符串可以以数字或非数字子字符串开头。

我们的目标是将输入字符串分解为一个数组或列表，包含这些字符串元素：

```java
String[] EXPECTED1 = new String[] { "01", "Michael Jackson", "23", "Michael Jordan", "42", "Michael Bolton", "999", "Michael Johnson", "000" };
List````<String>```` EXPECTED_LIST1 = Arrays.asList(EXPECTED1);

String[] EXPECTED2 = new String[] { "Michael Jackson", "01", "Michael Jordan", "23", "Michael Bolton", "42", "Michael Johnson", "999", "Great Michaels" };
List````<String>```` EXPECTED_LIST2 = Arrays.asList(EXPECTED2);
```

在本教程中，我们将使用基于正则表达式和非正则表达式的方法来解决这个问题。最后，我们将讨论它们的性能。

为了简单起见，我们将使用单元测试断言来验证每种方法是否按预期工作。

## 3. 使用 _String.split()_ 方法

首先，我们使用基于正则表达式的方法来解决这个问题。我们知道 **_String.split()_ 方法是将_String_拆分成数组的便捷工具。** 例如：_“a, b, c, d”.split(“, ”)_ 返回一个字符串数组：_{“a”，“b”，“c”，“d”}_。

因此，使用_split()_方法可能是我们想到的第一个解决我们问题的方法。然后，我们需要找到一个正则表达式模式作为分隔符，并指导_split()_得到预期的结果。然而，当我们再次思考时，可能会意识到一个困难。

让我们重新审视_“a, b, c, d”._ _split()_示例。我们使用_“, ”_作为分隔符正则表达式模式，并得到了数组结果中的字符串元素：_“a”，“b”，“c”，_和_“d”_。如果我们看结果字符串元素，我们将看到**所有匹配的分隔符( _“, ”_)都不在结果字符串数组中。**

然而，如果我们看问题的输入和预期输出，**输入中的每个字符都出现在结果数组或列表中。** 因此，如果我们想使用_split()_来解决问题，**我们必须使用零长度断言的模式**，例如，前瞻(lookahead)和后瞻(lookbehind)断言。接下来，让我们分析我们的输入字符串：

```java
01[!]Michael Jackson[!]23[!]Michael Jordan[!]42[!]Michael Bolton...
```

为了清楚起见，我们使用‘ _[!]_‘标记了输入中的期望分隔符。**每个分隔符要么位于_\D_（非数字字符）和_\d_（数字字符）之间，要么位于_\d_和_\D_之间。如果我们将其转换为后瞻正则表达式模式，它是_(?<=\D)(?=\d)|（?<=\d)(?=\D)_。**

接下来，让我们编写一个测试来验证是否使用_split()_，带有这个模式，在两个输入上产生预期的结果：

```java
String splitRE = "(?<=\\D)(?=\\d)|(?<=\\d)(?=\\D)";
String[] result1 = INPUT1.split(splitRE);
assertArrayEquals(EXPECTED1, result1);

String[] result2 = INPUT2.split(splitRE);
assertArrayEquals(EXPECTED2, result2);
```

如果我们运行测试，它会通过。所以，我们已经使用_split()_方法解决了问题。

接下来，让我们使用非正则表达式方法来解决问题。

## 4. 非正则表达式方法

我们已经看到了如何使用基于正则表达式的_split()_方法来解决问题。或者，我们可以不使用模式匹配来解决它。

实现这一点的想法是从输入字符串的开头检查所有字符。接下来，让我们首先看看实现，并了解它的工作原理：

```java
enum State {
    INIT, PARSING_DIGIT, PARSING_NON_DIGIT
}

List````<String>```` parseString(String input) {
    List````<String>```` result = new ArrayList<>();
    int start = 0;
    State state = INIT;
    for (int i = 0; i `< input.length(); i++) {
        if (input.charAt(i) >`= '0' && input.charAt(i) <= '9') {
            if (state == PARSING_NON_DIGIT) { // 非数字到数字，获取子字符串作为元素
                result.add(input.substring(start, i));
                start = i;
            }
            state = PARSING_DIGIT;
        } else {
            if (state == PARSING_DIGIT) { // 数字到非数字，获取子字符串作为元素
                result.add(input.substring(start, i));
                start = i;
            }
            state = PARSING_NON_DIGIT;
        }
    }
    result.add(input.substring(start)); // 添加最后一部分
    return result;
}
```

现在，让我们快速浏览一下上面的代码，并了解它的工作原理：

- 首先，我们初始化一个名为_result_的空_ArrayList_来存储提取的元素。
- _int start = 0; –_ 这个变量_start_在后续迭代中跟踪每个子字符串的起始索引。
- _state_变量是一个枚举，它表示在遍历字符串时的状态。
- 然后，我们使用_for_循环遍历输入字符串的字符，并检查每个字符的类型。
- **如果当前字符是一个数字( _0_– _9_)并且是非数字到数字的转换，这意味着一个元素已经结束**。所以，我们把从_start_到_i_（不包括_i_）的子字符串添加到_result_列表中。同时，我们更新_start_索引为当前索引_i_并将_state_设置为_PARSING_DIGIT_状态。
- _else_块遵循类似的逻辑，并处理数字到非数字的转换场景。
- _for_循环结束后，我们不应该忘记使用_input.substring(start)_将字符串的最后一部分添加到_result_列表中。

接下来，让我们用我们的两个输入测试_parseString()_方法：

```java
List````<String>```` result1 = parseString(INPUT1);
assertEquals(EXPECTED_LIST1, result1);

List````<String>```` result2 = parseString(INPUT2);
assertEquals(EXPECTED_LIST2, result2);
```

如果我们运行测试，它会通过。所以，我们的_parseString()_方法完成了工作。

## 5. 性能

到目前为止，我们已经解决了问题的两种解决方案，基于正则表达式的和非正则表达式的。基于正则表达式的_split()_解决方案非常简洁明了。相反，我们的十几行自制_parseString()_方法需要手动控制输入中的每个字符。然后，我们中的一些人可能会问，为什么我们引入甚至使用自制的方法来解决问题？

答案是“性能”。

尽管我们的_parseString()_解决方案看起来冗长并且需要手动控制每个字符，但它比基于正则表达式的解决方案**更快**。让我们了解其中的原因：

- _split()_解决方案**需要**编译正则表达式并应用模式匹配。**这些操作被认为是计算上昂贵的，特别是对于复杂模式。** 然而，另一方面，_parseString()_方法使用一个简单的基于枚举的状态机来跟踪数字和非数字字符之间的转换。它允许直接比较并避免了正则表达式模式匹配和后瞻的复杂性。
- 在_parseString()_方法中，子字符串是直接使用_substring()_方法提取的。这种方法避免了使用正则表达式_split()_方法时可能发生的不必要的对象创建和内存分配。此外，**通过使用已知索引直接提取子字符串，_parseString()_方法优化了内存使用，并可能提高了性能。**

然而，如果输入字符串不是相当长，性能差异可能是可以忽略的。

接下来，让我们对这两种方法的性能进行基准测试。我们将使用JMH（Java Microbenchmark Harness）来进行基准测试。**这是因为JMH允许我们轻松处理基准测试因素**，例如JVM预热、死代码消除等：

```java
@State(Scope.Benchmark)
@Threads(1)
@BenchmarkMode(Mode.Throughput)
@Fork(warmups = 1, value = 1)
@Warmup(iterations = 2, time = 10, timeUnit = TimeUnit.MILLISECONDS)
@OutputTimeUnit(TimeUnit.MILLISECONDS)
public class BenchmarkLiveTest {
    private static final String INPUT = "01Michael Jackson23Michael Jordan42Michael Bolton999Michael Johnson000";

    @Param({"10000"})
    public int iterations;

    @Benchmark
    public void regexBased(Blackhole blackhole) {
        blackhole.consume(INPUT.split("(?<=\\D)(?=\\d)|(?<=\\d)(?=\\D)"));
    }

    @Benchmark
    public void nonRegexBased(Blackhole blackhole) {
        blackhole.consume(parseString(INPUT));
    }

    @Test
    public void benchmark() throws Exception {
        String[] argv = {};
        org.openjdk.jmh.Main.main(argv);
    }
}
```

如上类所示，我们使用相同的输入对这两种方法进行了10k次迭代的基准测试。当然，我们不会深入JMH并了解每个JMH注解的含义。但两个注解对我们理解最终报告很重要：_@OutputTimeUnit(TimeUnit.MILLISECONDS)_和_@BenchmarkMode(Mode.Throughput)_。这种组合意味着**我们测量每种方法每秒可以运行多少次。**

接下来，让我们看看JMH生成的结果：

```java
Benchmark                        (iterations)   Mode  Cnt     Score     Error   Units
BenchmarkLiveTest.nonRegexBased         10000  thrpt    5  3880.989 ± 134.021  ops/ms
BenchmarkLiveTest.regexBased            10000  thrpt    5   297.282 ±  24.818  ops/ms
```

如我们所见，**非正则表达式解决方案的吞吐量是正则表达式解决方案的13倍多（3880/297 = 13.06）。** 因此，**当我们需要在性能关键型应用程序中处理长字符串时，我们应该选择_parseString()_而不是_split()_解决方案。**

## 6. 结论

在本文中，我们探讨了基于正则表达式（_split()_）和非正则表达式（_parseString()_）的方法，将输入字符串分解为包含数字元素和非数字字符串元素的字符串数组或列表，保持原始顺序。

_split()_解决方案紧凑且直接。然而，在处理长输入字符串时，它可能比自制的_parseString()_解决方案慢得多。

像往常一样，文章中展示的所有代码片段都可以在GitHub上找到。

[![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)](https://www.baeldung.com)
[![img](https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&r=g)](https://www.baeldung.com/)
[![img](https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg)](https://www.baeldung.com/)
[![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)](https://www.baeldung.com/)
[![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)](https://www.baeldung.com/)
[![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)](https://www.baeldung.com/)

OK