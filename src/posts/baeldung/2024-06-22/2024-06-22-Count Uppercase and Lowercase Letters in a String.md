---
date: {Last updated of the page}
category:
  - Java
  - String Manipulation
tag:
  - uppercase
  - lowercase
  - count
head:
  - - meta
    - name: keywords
      content: Java, String, uppercase, lowercase, count
---
# 在Java中统计字符串中的大写和小写字母

当在Java中使用字符串类型时，经常需要分析其中的字符组成。一个常见的任务是计算给定字符串中的大写字母和小写字母的数量。

在本教程中，我们将探索使用Java实现这一任务的几种简单实用的方法。

## 2. 问题介绍

在深入代码之前，我们首先明确手头的问题。我们想要创建一个Java方法，它接受一个字符串作为输入，并同时计算大写字母和小写字母的数量。换句话说，**解决方案将产生包含两个计数器的结果**。

例如，我们将以下面的字符串作为输入：

```
static final String MY_STRING = "Hi, Welcome to Baeldung! Let's count letters!";
```

大写字母是'A'到'Z'的字符，小写字母是'a'到'z'的字符。也就是说，示例字符串中的**特殊字符如‘,’和‘!’既不被视为大写字母也不被视为小写字母**。

观察示例，我们在_MY_STRING_中有四个大写字母和31个小写字母。

由于我们将同时计算两个计数器，让我们创建一个简单的结果类来携带这两个计数器，这样我们可以更容易地验证结果：

```
class LetterCount {
    private int uppercaseCount;
    private int lowercaseCount;

    private LetterCount(int uppercaseCount, int lowercaseCount) {
        this.uppercaseCount = uppercaseCount;
        this.lowercaseCount = lowercaseCount;
    }

    public int getUppercaseCount() {
        return uppercaseCount;
    }

    public int getLowercaseCount() {
        return lowercaseCount;
    }
    // ...计数解决方案稍后添加...
}
```

稍后，我们将把计数解决方案作为静态方法添加到这个类中。

所以，如果一个方法正确地计算了字母，它应该产生一个_LetterCount_对象，其中_uppercaseCount = 4_和_lowercaseCount = 31_。

接下来，让我们计算字母。

## 3. 使用字符范围

要解决这个问题，我们将**遍历给定字符串中的每个字符，并通过检查它是否落在相应的字符范围内来确定它是大写字母还是小写字母**：

```
static LetterCount countByCharacterRange(String input) {
    int upperCount = 0;
    int lowerCount = 0;
    for (char c : input.toCharArray()) {
        if (c >= 'A' && c `<= 'Z') {
            upperCount++;
        }
        if (c >`= 'a' && c <= 'z') {
            lowerCount++;
        }
    }
    return new LetterCount(upperCount, lowerCount);
}
```

如上述代码所示，我们**为大写字母和小写字母维护单独的计数器，并在迭代过程中相应地增加它们**。在遍历输入字符串之后，我们使用这两个计数器创建_LetterCount_对象，并将其作为结果返回：

```
LetterCount result = LetterCount.countByCharacterRange(MY_STRING);
assertEquals(4, result.getUppercaseCount());
assertEquals(31, result.getLowercaseCount());
```

值得注意的是，**这种方法仅适用于由ASCII字符组成的字符串输入**。

## 4. 使用_Character_类的_isUpperCase()_和_isLowerCase()_方法

在之前的解决方案中，我们通过检查字符的范围来确定它是否是大写或小写字母。实际上，**_Character_类为此检查提供了_isUpperCase()_和_isLowerCase()_方法**。

重要的是要强调，**_isUpperCase()_和_isLowerCase()_也适用于Unicode字符**：

```
assertTrue(Character.isLowerCase('ä'));
assertTrue(Character.isUpperCase('Ä'));
```

让我们用_Character_类的案例检查方法替换范围检查：

```
static LetterCount countByCharacterIsUpperLower(String input) {
    int upperCount = 0;
    int lowerCount = 0;
    for (char c : input.toCharArray()) {
        if (Character.isUpperCase(c)) {
            upperCount++;
        }
        if (Character.isLowerCase(c)) {
            lowerCount++;
        }
    }
    return new LetterCount(upperCount, lowerCount);
}
```

正如我们所看到的，这两个案例检查方法使代码更容易理解，并且它们产生了预期的结果：

```
LetterCount result = LetterCount.countByCharacterIsUpperLower(MY_STRING);
assertEquals(4, result.getUppercaseCount());
assertEquals(31, result.getLowercaseCount());
```

## 5. 使用Stream API的_filter()_和_count()_方法

Stream API是在Java 8中引入的一个显著特性。

接下来，让我们**使用Stream API中的_filter()_和_count()_来解决这个问题**：

```
static LetterCount countByStreamAPI(String input) {
    return new LetterCount(
        (int) input.chars().filter(Character::isUpperCase).count(),
        (int) input.chars().filter(Character::isLowerCase).count()
    );
}
```

由于**_count()_方法返回一个_long_值**，我们必须将其转换为_int_以实例化_LetterCount_对象。

乍一看，这种解决方案看起来简单明了，比基于循环的其他方法更加紧凑。然而，值得注意的是，**这种方法会两次遍历输入字符串中的字符**。

最后，让我们编写一个测试来验证这种方法是否产生了预期的结果：

```
LetterCount result = LetterCount.countByStreamAPI(MY_STRING);
assertEquals(4, result.getUppercaseCount());
assertEquals(31, result.getLowercaseCount());
```

## 6. 结论

在本文中，我们探讨了在给定字符串中计算大写字母和小写字母的不同方法。

这些简单而有效的方法为现实世界工作中更复杂的字符串分析任务提供了基础。

如往常一样，示例的完整源代码可在GitHub上找到。