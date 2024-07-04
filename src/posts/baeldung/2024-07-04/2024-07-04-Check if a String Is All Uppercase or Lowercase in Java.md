---
date: 2022-04-01
category:
  - Java
  - String Manipulation
tag:
  - Java
  - String
  - Uppercase
  - Lowercase
head:
  - - meta
    - name: keywords
      content: Java, String, Uppercase, Lowercase, Case Check
---
# 在Java中检查字符串是否全部为大写或小写

当在Java中处理字符串时，确定一个字符串是否完全由大写或小写字符组成通常是必要的。

在本教程中，我们将探索执行此检查的不同方法。

## 2. 问题介绍

首先，让我们准备三个输入字符串：

```java
static final String UPPER_INPUT = "1: COOL!";
static final String LOWER_INPUT = "2: cool!";
static final String MIXED_INPUT = "3: Cool!";
```

如我们所见，上面的每个字符串都包含一个空格和两个标点符号。非字母字符，如数字和标点符号，是否属于大写/小写取决于要求。**在本教程中，我们认为非字母字符既是大写也是小写字符。**

我们将在`CaseCheck`类中创建静态检查方法：

```java
class CaseChecker {
    static boolean allUpperX(String input){...}
    static boolean allLowerX(String input){...}
    ...
}
```

我们可以利用Java的`String`类和字符操作的强大功能，轻松执行这些检查并处理各种用例。

为了简单起见，我们将使用单元测试断言来验证每种方法是否返回预期的结果。

现在，让我们深入研究！

## 3. 转换和比较

我们知道`String`类为我们提供了两个方法：`toUpperCase()`和`toLowerCase()`。**如果一个字符串（s）的字符是大写的，那么字符串（s）必须等于s.toUpperCase()的结果。** 因此，根据这个想法，让我们创建两个检查方法，一个用于大写检查，另一个用于小写检查：

```java
static boolean allUpper1(String input) {
    return input.equals(input.toUpperCase());
}

static boolean allLower1(String input) {
    return input.equals(input.toLowerCase());
}
```

接下来，让我们使用我们准备的输入字符串测试这些方法：

```java
assertTrue(CaseChecker.allLower1(LOWER_INPUT));
assertFalse(CaseChecker.allLower1(UPPER_INPUT));
assertFalse(CaseChecker.allLower1(MIXED_INPUT));

assertFalse(CaseChecker.allUpper1(LOWER_INPUT));
assertTrue(CaseChecker.allUpper1(UPPER_INPUT));
assertFalse(CaseChecker.allUpper1(MIXED_INPUT));
```

如果我们执行它，测试就会通过。所以检查方法解决了问题。

## 4. 检查每个字符

尽管我们使用转换和比较方法成功地解决了问题，例如`input.equals(input.toUpperCase())`，但这种方法在处理长输入字符串时可能不是最优的。它转换每个字符的大小写。因此，**这个过程可能变得耗时，对于长输入字符串来说可能是不必要的。**

另一个想法是遍历输入字符串中的字符。我们可以在检测到不是大写/小写的字符时确定结果。所以**我们可以跳过任何进一步的检查。**

我们可以使用`String.toCharArray()`将字符串分解为`char`数组。`Character.isLowerCase()`和`Character.isUpperCase()`方法可以告诉我们一个`char`是否是小写/大写字符。

接下来，让我们结合这两种方法并创建我们的检查方法：

```java
static boolean allUpper2(String input) {
    for (char c : input.toCharArray()) {
        // 不要这样写：if (!Character.isUpperCase(c))
        if (Character.isLowerCase(c)) {
            return false;
        }
    }
    return true;
}

static boolean allLower2(String input) {
    for (char c : input.toCharArray()) {
        // 不要这样写：if (!Character.isLowerCase(c))
        if (Character.isUpperCase(c)) {
            return false;
        }
    }
    return true;
}
```

实现不难理解。然而，人们可能会对上述代码中的注释感到好奇。例如，在`allUpper2()`中，为什么我们不应该写“if (!Character.isUpperCase(c)) return false;”？

这是因为**任何非字母字符，如‘.’或‘7’，`Character`的`isUpperCase()`和`isLowerCase()`都返回`false`。** 但根据要求，我们需要在大写/小写检查逻辑中忽略非字母字符。因此，使用“if (Character.isLowerCase(c)) return false;”而不是“if (!Character.isUpperCase(c)) return false;”更合适。

测试表明我们的检查方法也能完成工作：

```java
assertTrue(CaseChecker.allLower2(LOWER_INPUT));
assertFalse(CaseChecker.allLower2(UPPER_INPUT));
assertFalse(CaseChecker.allLower2(MIXED_INPUT));

assertFalse(CaseChecker.allUpper2(LOWER_INPUT));
assertTrue(CaseChecker.allUpper2(UPPER_INPUT));
assertFalse(CaseChecker.allUpper2(MIXED_INPUT));
```

或者，我们可以使用Stream API实现相同的逻辑：

```java
static boolean allUpper3(String input) {
    return input.chars().noneMatch(Character::isLowerCase);
}

static boolean allLower3(String input) {
    return input.chars().noneMatch(Character::isUpperCase);
}
```

## 5. 关于Apache Commons Lang 3库中的StringUtils

Apache Commons Lang 3提供了方便的`StringUtils`类。这个实用类有两个方法：`isAllLowerCase()`和`isAllUpperCase()`。

值得注意的是**这些方法认为非字母字符既不是大写也不是小写：**

```java
assertFalse(StringUtils.isAllLowerCase(LOWER_INPUT));
assertFalse(StringUtils.isAllLowerCase(UPPER_INPUT));
assertFalse(StringUtils.isAllLowerCase(MIXED_INPUT));

assertFalse(StringUtils.isAllLowerCase("a b"));
assertTrue(StringUtils.isAllLowerCase("ab"));

assertFalse(StringUtils.isAllUpperCase(LOWER_INPUT));
assertFalse(StringUtils.isAllUpperCase(UPPER_INPUT));
assertFalse(StringUtils.isAllUpperCase(MIXED_INPUT));

assertFalse(StringUtils.isAllUpperCase("A B"));
assertTrue(StringUtils.isAllUpperCase("AB"));
```

当我们使用它们时，我们应该记住这一点。

## 6. 结论

在本文中，我们探讨了在Java中检查字符串是否全部为大写或小写的不同方法。转换和比较方法是直接的。但如果输入字符串很长，我们可能希望通过检查字符并尽早退出来获得更好的性能。

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。