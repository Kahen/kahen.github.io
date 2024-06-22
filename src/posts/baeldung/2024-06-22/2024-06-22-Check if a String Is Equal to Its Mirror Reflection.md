---
date: 2024-06-22
category:
  - Java
  - 字符串
tag:
  - 字符串反转
  - 镜像测试
head:
  - - meta
    - name: keywords
      content: Java, 字符串, 镜像测试, 反转
---
# 检查字符串是否等于其镜像反射

当我们在Java中工作时，字符串操作和比较是日常任务。

在这个快速教程中，我们将深入探讨一个有趣的问题：检查字符串是否等于其镜像反射。

## 2. 问题介绍

一个常见的误解是，获取字符串的镜像反射仅仅涉及反转其顺序。以字符串“ALL”为例。直观上，人们可能会期望它的镜像反射是“LLA”。然而，通过实际使用镜子仔细检查，我们发现“LLA”并不符合“ALL”的镜像版本。

关键的误解在于，字符串中的**每个单独字符在其镜像反射中都会发生反转**。因此，“ALL”的镜像反射实际上看起来像“⅃⅃A”。

字符可以根据其反转行为被归类为对称或不对称。**对称字符是指在反转时保持不变的字符**，例如‘A’、‘O’、‘o’、‘V’、‘v’、‘M’、‘8’、‘+’、‘-’等。相反，不对称字符与其反转形式不同，例如‘L’、‘S’、‘p’、‘h’、‘/’、‘3’等。

所以，当我们说一个字符串等于其镜像反射时，它有两个要求：

- **字符串只包含对称字符**。
- 给定的字符串必须等于其反转值。换句话说，**字符串必须是回文**，例如“MUM”。

为了简单起见，**我们将只检查由大写英文字母组成的字符串值作为本教程的示例**。然后，这些是我们需要检查的对称大写字符：

```java
final static Set```<Character>``` SYMMETRIC_LETTERS = Set.of('A', 'H', 'I', 'M', 'O', 'T', 'U', 'V', 'W', 'X', 'Y');
```

接下来，让我们探讨如何执行字符串镜像反射检查。

## 3. 解决问题的想法：结合两次检查

既然我们理解了问题的两个要求，一个直接的想法是创建一个方法来**结合对称字符检查和回文字符串检查**：

```java
boolean isMirrorImageEqual(String input) {
    return containsOnlySymmetricLetters(input) && isPalindrome(input);
}
```

接下来，让我们一步步解决这个问题。

## 4. 实现containsOnlySymmetricLetters()方法

由于我们在Set中定义了对称字母，我们需要检查**SYMMETRIC_LETTERS是否包含给定字符串中的每个字符**：

```java
boolean containsOnlySymmetricLetters(String input) {
    Set```<Character>``` characterSet = input.chars()
      .mapToObj(c -> (char) c)
      .collect(Collectors.toSet());
    characterSet.removeAll(SYMMETRIC_LETTERS);
    return characterSet.isEmpty();
}
```

如上所示，我们通过三个步骤执行此检查：

- 将输入字符串转换为名为characterSet的Set```<Character>```
- 从characterSet中移除所有所需的对称字母
- 检查移除后characterSet是否为空
- 如果集合为空，则意味着它只包含对称字符

接下来，让我们实现isPalindrome()方法。

## 5. 实现isPalindrome()方法

在Java中检查一个字符串是否是回文有多种方法。让我们采用一个直接的解决方案来完成这项工作：

```java
boolean isPalindrome(String input) {
    String reversed = new StringBuilder(input).reverse()
      .toString();
    return input.equals(reversed);
}
```

如我们所见，**我们通过检查输入字符串和反转后的输入是否相等来确定输入是否是回文**。

## 6. 测试解决方案

现在，isMirrorImageEqual()的两个构建块都已就位。最后，让我们创建一个测试来验证这个方法是否解决了我们的问题：

```java
assertFalse(isMirrorImageEqual("LOL"));
assertFalse(isMirrorImageEqual("AXY"));
assertFalse(isMirrorImageEqual("HUHU"));

assertTrue(isMirrorImageEqual(""));
assertTrue(isMirrorImageEqual("AAA"));
assertTrue(isMirrorImageEqual("HUH"));
assertTrue(isMirrorImageEqual("HIMMIH"));
assertTrue(isMirrorImageEqual("HIMIH"));
```

如我们所见，我们用各种输入字符串值测试了这个方法，我们的解决方案按预期工作。

## 7. 结论

在本文中，我们首先讨论了字符串镜像反射的特点。然后，我们探索了一个解决方案，以检查给定的字符串及其镜像反射是否相等。

如往常一样，示例的完整源代码可在GitHub上找到。