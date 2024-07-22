---
date: 2022-04-01
category:
  - JUnit
  - Testing
tag:
  - JUnit 4
  - JUnit 5
  - Test Case
head:
  - - meta
    - name: keywords
      content: JUnit, Test Case, TestName, TestInfo, Parameterized Test
---
# 在JUnit中获取当前执行测试的名称

## 1. 概述

在使用JUnit时，我们可能需要让我们的测试能够访问它们的名称。这可能有助于错误消息的生成，特别是对于具有系统生成名称的测试。

在这个简短的教程中，我们将看看如何在JUnit 4和JUnit 5中获取当前测试用例的名称。

## 2. JUnit 5 方法

让我们看两个场景。首先，我们将看到如何获取单个测试的名称。这个名称通常是可预测的，因为它可能是函数的名称或_@DisplayName_注解的值。然而，如果我们使用参数化测试或显示名称生成器，那么我们可能需要知道JUnit提供的名称。

**JUnit 5可以将一个_TestInfo_对象注入到我们的测试中**，以显示当前测试用例的名称。

### 2.1. 单个测试

让我们将一个_TestInfo_对象注入到我们的测试函数中：

```java
@Test
void givenNumbers_whenOddCheck_thenVerify(TestInfo testInfo) {
    System.out.println("displayName = " + testInfo.getDisplayName());
    int number = 5;
    assertTrue(oddCheck(number));
}
```

在这里，我们使用了接口_TestInfo_的**_getDisplayName_方法来显示测试的名称**。当我们运行测试时，我们得到了测试名称：

```
displayName = givenNumbers_whenOddCheck_thenVerify(TestInfo)
```

### 2.2. 参数化测试

让我们尝试使用参数化测试。这里我们将使用_@ParameterizedTest_注解的_name_字段来描述JUnit如何为我们生成测试名称：

```java
private TestInfo testInfo;

@BeforeEach
void init(TestInfo testInfo) {
    this.testInfo = testInfo;
}

@ParameterizedTest(name = "givenNumbers_whenOddCheck_thenVerify{0}")
@ValueSource(ints = { 1, 3, 5, -3, 15 })
void givenNumbers_whenOddCheck_thenVerify(int number) {
    System.out.println("displayName = " + testInfo.getDisplayName());
    assertTrue(oddCheck(number));
}
```

我们应该注意到，与单个测试不同，我们不能将_TestInfo_注入到函数中。这是因为函数参数必须与参数化数据相关。为了解决这个问题，我们需要通过_beforeEach_方法将_TestInfo_存储在测试类的字段中。

当我们运行测试时，我们得到了测试名称：

```
displayName = givenNumbers_whenOddCheck_thenVerify5
displayName = givenNumbers_whenOddCheck_thenVerify-3
displayName = givenNumbers_whenOddCheck_thenVerify3
displayName = givenNumbers_whenOddCheck_thenVerify1
displayName = givenNumbers_whenOddCheck_thenVerify15
```

## 3. JUnit 4 方法

**JUnit 4可以在我们的测试中填充一个_TestName_对象**。_TestName_是JUnit的一个规则，规则是作为JUnit测试执行的一部分执行的，沿途显示当前运行测试的详细信息。

### 3.1. 单个测试

让我们考虑一个单个测试：

```java
@Rule
public TestName name = new TestName();

@Test
public void givenString_whenSort_thenVerifySortForString() {
    System.out.println("displayName = " + name.getMethodName());
    String s = "abc";
    assertEquals(s, sortCharacters("cba"));
}
```

如上所示，我们可以使用类_TestName_的**_getMethodName_方法来显示测试的名称**。

让我们运行测试：

```
displayName = givenString_whenSort_thenVerifySortForString
```

### 3.2. 参数化测试

现在让我们使用相同的方法来显示为参数化测试生成的测试名称。首先，我们需要使用特殊的测试运行器注释测试：

```java
@RunWith(Parameterized.class)
public class JUnit4ParameterizedTestNameUnitTest {
}
```

然后我们可以实施测试，同时使用_TestName_规则以及字段和构造函数来分配当前测试的参数值：

```java
@Rule
public TestName name = new TestName();
```

```java
private String input;
private String expected;

public JUnit4ParameterizedTestNameUnitTest(String input, String expected) {
    this.input = input;
    this.expected = expected;
}

@Parameterized.Parameters(name = "{0}")
public static Collection`<Object[]>` suppliedData() {
    return Arrays.asList(new Object[][] {
      { "abc", "abc" }, { "cba", "abc" }, { "onm", "mno" }, { "a", "a" }, { "zyx", "xyz" }});
}

@Test
public void givenString_whenSort_thenVerifySortForString() {
    System.out.println("displayName = " + name.getMethodName());
    assertEquals(expected, sortCharacters(input));
}
```

在这个测试中，我们提供了包含输入字符串和预期字符串的测试数据_Collection_。这是通过带有_@Parameterized.Parameters_注解的_suppliedData_函数完成的。这个注解还允许我们描述测试名称。

当我们运行测试时，_TestName_规则为我们提供了每个测试的名称，让我们可以看到：

```
displayName = givenString_whenSort_thenVerifySortForString[abc]
displayName = givenString_whenSort_thenVerifySortForString[cba]
displayName = givenString_whenSort_thenVerifySortForString[onm]
displayName = givenString_whenSort_thenVerifySortForString[a]
displayName = givenString_whenSort_thenVerifySortForString[zyx]
```

## 4. 结论

在这篇文章中，我们讨论了如何在JUnit 4和5中找到当前测试的名称。

我们看到了如何为单个测试和参数化测试做到这一点。

像往常一样，完整的源代码可以在GitHub上找到。