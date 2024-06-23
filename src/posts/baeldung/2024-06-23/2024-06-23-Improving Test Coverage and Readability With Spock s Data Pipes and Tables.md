---
date: 2024-06-23
category:
  - Java
  - Spock
tag:
  - 测试覆盖率
  - 数据管道
head:
  - - meta
    - name: keywords
      content: Spock, 测试覆盖率, 数据管道, 数据表格
---
# 使用Spock的数据管道和表格提高测试覆盖率和可读性

Spock是编写测试的一个很好的框架，特别是在提高测试覆盖率方面。

在本教程中，我们将探讨Spock的数据管道以及如何通过向数据管道添加额外数据来提高我们的行和分支代码覆盖率。我们还将看看当数据变得太大时该怎么办。

## 2. 我们测试的主题

让我们从一个添加两个数字的方法开始，但有一个转折。如果第一个或第二个数字是42，则返回42：

```java
public class DataPipesSubject {
    int addWithATwist(final int first, final int second) {
        if (first == 42 || second == 42) {
            return 42;
        }
        return first + second;
    }
}
```

我们想使用各种输入组合来测试这个方法。

让我们看看如何编写和演变一个简单的测试，通过数据管道来输入我们的输入。

## 3. 准备我们的数据驱动测试

让我们创建一个测试类，用单个场景的测试开始，然后构建它以添加数据管道：

首先，让我们创建我们的_DataPipesTest_类，包含我们测试的主题：

```java
@Title("测试使用数据管道的各种方式")
class DataPipesTest extends Specification {
    @Subject
    def dataPipesSubject = new DataPipesSubject()
    // ...
}
```

我们使用Spock的_Title_注解围绕类，为我们即将进行的测试提供一些额外的上下文。

我们还使用Spock的_Subject_注解标记了我们的测试主题。注意，我们应该小心从_spock.lang_而不是_javax.security.auth_导入我们的_Subject_。

虽然不是绝对必要，但这种语法糖有助于我们快速识别正在测试的内容。

现在让我们用Spock的_given_/_when_/_then_语法创建一个测试，使用我们的前两个输入1和2：

```java
def "given two numbers when we add them then our result is the sum of the inputs"() {
    given: "some inputs"
    def first = 1
    def second = 2

    and: "an expected result"
    def expectedResult = 3

    when: "we add them together"
    def result = dataPipesSubject.addWithATwist(first, second)

    then: "we get our expected answer"
    result == expectedResult
}
```

为了准备我们的测试进行数据管道，让我们将我们的输入从_given/and_块移动到一个_where_块：

```java
def "given a where clause with our inputs when we add them then our result is the sum of the inputs"() {
    when: "we add our inputs together"
    def result = dataPipesSubject.addWithATwist(first, second)

    then: "we get our expected answer"
    result == expectedResult

    where: "we have various inputs"
    first = 1
    second = 2
    expectedResult = 3
}
```

Spock评估_where_块，并隐式地将任何变量作为参数添加到测试中。因此，Spock看到我们的方法声明如下：

```java
def "given some declared method parameters when we add our inputs then those types are used"(int first, int second, int expectedResult)
```

**注意，当我们将数据强制转换为特定类型时，我们声明类型和变量作为方法参数。**

由于我们的测试非常简单，让我们将_when_和_then_块合并到一个单独的_expect_块中：

```java
def "given an expect block to simplify our test when we add our inputs then our result is the sum of the two numbers"() {
    expect: "our addition to get the right result"
    dataPipesSubject.addWithATwist(first, second) == expectedResult

    where: "we have various inputs"
    first = 1
    second = 2
    expectedResult = 3
}
```

现在我们已经简化了我们的测试，我们准备添加我们的第一个数据管道。

## 4. 数据管道是什么？

**Spock中的数据管道是将不同的数据组合输入到我们的测试中的一种方式**。这有助于在考虑多个场景时保持我们的测试代码的可读性。

**管道可以是任何_Iterable_ - 我们甚至可以创建自己的，如果它实现了_Iterable_接口**！

### 4.1. 简单的数据管道

由于数组是_Iterable_，让我们首先将我们的单一输入转换为数组，并使用数据管道‘<<’将它们输入到我们的测试中：

```java
where: "we have various inputs"
first << [1]
second << [2]
expectedResult << [3]

```

我们可以通过向每个数组数据管道添加条目来添加额外的测试用例。

所以让我们为我们的场景2 + 2 = 4和3 + 5 = 8添加一些数据到我们的管道：

```java
first << [1, 2, 3]
second << [2, 2, 5]
expectedResult << [3, 4, 8]
```

为了使我们的测试更易于阅读，让我们将我们的_first_和_second_输入组合成一个多变量数组数据管道，暂时将我们的_expectedResult_分开：

```java
where: "we have various inputs"
[first, second] << [
    [1, 2],
    [2, 2],
    [3, 5]
]

and: "an expected result"
expectedResult << [3, 4, 8]
```

由于**我们可以引用我们已经定义的输入**，我们可以将我们的预期结果数据管道替换为以下内容：

```java
expectedResult = first + second
```

但是让我们将其与我们的输入管道结合起来，因为我们正在测试的方法有一些微妙之处，这会破坏一个简单的加法：

```java
[first, second, expectedResult] << [
    [1, 2, 3],
    [2, 2, 4],
    [3, 5, 8]
]
```

### 4.2. 映射和方法

当我们想要更多的灵活性，并且我们使用Spock 2.2或更高版本时，我们可以使用_Map_作为我们的输入数据管道：

```java
where: "we have various inputs in the form of a map"
[first, second, expectedResult] << [
    [
        first : 1,
        second: 2,
        expectedResult: 3
    ],
    [
        first : 2,
        second: 2,
        expectedResult: 4
    ]
]
```

我们也可以从单独的方法中输入我们的数据。

```java
[first, second, expectedResult] << dataFeed()
```

让我们看看当我们将我们的映射数据管道移动到一个_dataFeed_方法时，它是什么样子：

```java
def dataFeed() {
    [
        [
            first : 1,
            second: 2,
            expectedResult: 3
        ],
        [
            first : 2,
            second: 2,
            expectedResult: 4
        ]
    ]
}
```

尽管这种方法有效，但使用多个输入仍然感觉笨拙。让我们看看Spock的DataTable如何改进这一点。

Spock的DataTable格式采用一个或多个数据管道，使它们更具视觉吸引力。

让我们将我们的测试方法中的_where_块重写为使用DataTable而不是一组数据管道：

```java
where: "we have various inputs"
first | second || expectedResult
1     | 2      || 3
2     | 2      || 4
3     | 5      || 8
```

现在，每一行都包含了特定场景的输入和预期结果，这使我们的测试场景更容易阅读。

**作为一个视觉提示和最佳实践，我们使用了双‘||’来分隔我们的输入和预期结果**。

当我们用这三个迭代的代码覆盖率运行我们的测试时，我们看到并非所有的执行行都被覆盖了。我们的_addWithATwist_方法有一个特殊情况，当任一输入是42时：

```java
if (first == 42 || second == 42) {
    return 42;
}
```

所以，让我们添加一个场景，我们的_first_输入是42，确保我们的代码执行我们的_if_语句内的行。让我们也添加一个场景，我们的_second_输入是42，以确保我们的测试覆盖所有的执行分支：

```java
42    | 10     || 42
1     | 42     || 42
```

所以这是我们最终的_where_块，迭代使我们的代码行和分支覆盖：

```java
where: "we have various inputs"
first | second || expectedResult
1     | 2      || 3
2     | 2      || 4
3     | 5      || 8
42    | 10     || 42
1     | 42     || 42
```

当我们执行这些测试时，我们的测试运行器为每次迭代渲染了一行：

```java
DataPipesTest
 - use table to supply the inputs
    - use table to supply the inputs [first: 1, second: 2, expectedResult: 3, #0]

```

## 6. 可读性改进

我们有一些技术可以使我们的测试更加易于阅读。

### 6.1. 在我们的方法名称中插入变量

**当我们想要更具表现力的测试执行时，我们可以在方法名称中添加变量。**

所以让我们通过插入来自我们表格的列标题变量，前缀为‘#’，并添加一个场景列来增强我们测试的方法名称：

```java
def "given a #scenario case when we add our inputs, #first and #second, then we get our expected result: #expectedResult"() {
    expect: "our addition to get the right result"
    dataPipesSubject.addWithATwist(first, second) == expectedResult

    where: "we have various inputs"
    scenario       | first | second || expectedResult
    "simple"       | 1     | 2      || 3
    "double 2"     | 2     | 2      || 4
    "special case" | 42    | 10     || 42
}

```

现在，当我们运行测试时，我们的测试运行器将输出渲染为更具表现力的：

```java
DataPipesTest
- given a #scenario case when we add our inputs, #first and #second, then we get our expected result: #expectedResult
  - given a simple case when we add our inputs, 1 and 2, then we get our expected result: 3
  - given a double 2 case when we add our inputs, 2 and 2, then we get our expected result: 4
...

```

当我们使用这种方法，但如果输入数据管道名称错误，Spock将用类似于以下的消息失败测试：

```java
Error in @Unroll, could not find a matching variable for expression: myWrongVariableName
```

和以前一样，**我们可以在表格数据中使用我们已经声明的输入，即使在同一行中**。

所以，让我们添加一行，引用我们的列标题变量：_first_和_second_：

```java
scenario              | first | second || expectedResult
"double 2 referenced" | 2     | first  || first + second
```

### 6.2. 当表格列太宽时

我们的IDE可能包含对Spock表格的内在支持 - 我们可以使用IntelliJ的“格式化代码”功能( _Ctrl+Alt+L)_ 为我们对齐表格列！知道这一点，我们可以快速添加数据，而不必担心布局，并在之后格式化它。

然而，有时我们表格中的数据项长度会导致格式化的表格行太宽而无法适应一行。通常，这是当我们在输入中有字符串时。

为了演示这一点，让我们创建一个方法，它将字符串作为输入，然后简单地添加一个感叹号：

```java
String addExclamation(final String first) {
    return first + '!';
}
```

现在让我们用一个长字符串作为输入创建一个测试：

```java
def "given long strings when our tables our too big then we can use shared or static variables to shorten the table"() {
    expect: "our addition to get the right result"
    dataPipesSubject.addExclamation(longString) == expectedResult

    where: "we have various inputs"
    longString                                                                                                  || expectedResult
    'When we have a very long string we can use a static or @Shared variable to make our tables easier to read' || 'When we have a very long string we can use a static or @Shared variable to make our tables easier to read!'
}
```

现在，让我们通过用静态或@Shared变量替换字符串来使这个表格更紧凑。注意，我们的表格不能使用在测试中声明的变量 - **我们的表格只能使用静态，_@Shared_，或计算值。**

所以，让我们声明一个静态和共享变量，并在表格中使用这些变量：

```java
static def STATIC_VARIABLE = 'When we have a very long string we can use a static variable'
@Shared def SHARED_VARIABLE = 'When we have a very long string we can annotate our variable with @Shared'
...

scenario         | longString      || expectedResult
'use of static'  | STATIC_VARIABLE || "$STATIC_VARIABLE!"
'use of @Shared' | SHARED_VARIABLE || "$SHARED_VARIABLE!"
```

现在我们的表格更加紧凑了！我们还使用了Groovy的_String_插值，在预期结果的双引号字符串中扩展变量，以展示这如何帮助可读性。注意，对于简单的变量替换，仅使用_$_就足够了，但对于更复杂的情况，我们需要将表达式包装在花括号_{}_内。

我们可以使一个大表格更易于阅读的另一种方式是**通过使用两个或更多的下划线‘__’将表格分成多个部分**：

```java
where: "we have various inputs"
first | second
1     | 2
2     | 3
3     | 5
__
expectedResult | _
3              | _
5              | _
8              | _
```

当然，我们需要在分割的表格中具有相同数量的行。

**Spock表格至少必须有两列，但在我们分割表格后，_expectedResult_将独自一人，所以我们添加了一个空的‘_’列**以满足这个要求。

### 6.3. 替代表格分隔符

有时，我们可能不想使用‘|’作为分隔符。在这种情下，我们可以使用‘;’代替：

```java
first ; second ;; expectedResult
1     ; 2      ;; 3
2     ; 3      ;; 5
3     ; 5      ;; 8
```

但我们不能在同一个表格中混合使用‘|’和‘;’列分隔符！

## 7. 结论

在本文中，我们学习了如何在Spock的_where_块中使用数据输入。我们了解到数据表格是数据输入的更美观的表示，并且我们可以通过简单地向数据表格添加一行数据来提高测试覆盖率。我们还探索了几种使我们的数据更易于阅读的方法，特别是当处理大的数据值或当我们的表格变得太大时。

像往常一样，本文的源代码可以在GitHub上找到。
```