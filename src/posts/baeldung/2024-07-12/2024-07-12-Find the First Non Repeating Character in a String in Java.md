---
date: 2023-04-06
category:
  - Java
  - Algorithm
tag:
  - String
  - Non-Repeating Character
head:
  - - meta
    - name: keywords
      content: Java, Algorithm, String, Non-Repeating Character
---
# Java中找出字符串中第一个不重复的字符

在本教程中，我们将探讨在Java中找出字符串中第一个不重复字符的不同方法。我们还将尝试分析这些解决方案的运行时间复杂度。

## 问题陈述
**给定一个字符字符串作为输入，找出字符串中的第一个不重复的字符**。以下是一些示例：

示例 1: _Lullaby_
在这个例子中，L重复了三次。当我们遇到字符_u_时，遇到了第一个不重复的字符。

示例 2: _Baeldung_
在这个例子中，所有字符都是不重复的。根据问题陈述，我们取第一个，B。

示例 3: _mahimahi_
在这个例子中，没有不重复的字符 - 所有字符都只重复一次。因此，这里的输出是_null_。

最后，这里有一些关于问题的额外要点需要注意：

- 输入字符串可以是任何长度，并且**可以包含大写和小写字符的混合**
- 我们的解决方案应该处理空或null输入
- **输入字符串可能没有不重复的字符**，或者换句话说，可能有输入所有字符至少重复一次的情况，在这种情况下输出是_null_

有了这个理解，让我们尝试解决问题。

## 解决方案
### 3.1. 暴力解决方案
首先，我们尝试找出一个暴力解决方案来找出字符串的第一个不重复字符。我们从字符串的开头开始，每次取一个字符，并将其与字符串中的每个其他字符进行比较。如果我们找到一个匹配项，那意味着这个字符在字符串中的其他地方重复了，所以我们继续下一个字符。如果没有字符的匹配项，我们已经找到了我们的解决方案，并以该字符退出程序。

代码如下：

```java
public Character firstNonRepeatingCharBruteForceNaive(String inputString) {
    if (null == inputString || inputString.isEmpty()) {
        return null;
    }
    for (int outer = 0; outer `< inputString.length(); outer++) {
        boolean repeat = false;
        for (int inner = 0; inner < inputString.length(); inner++) {
            if (inner != outer && inputString.charAt(outer) == inputString.charAt(inner)) {
                repeat = true;
                break;
            }
        }
        if (!repeat) {
            return inputString.charAt(outer);
        }
    }
    return null;
}
```

**上述解决方案的时间复杂度是O(n²)**，因为我们有两个嵌套循环。对于我们访问的每个字符，我们都在访问输入字符串中的所有字符。

下面还提供了相同代码的更简洁解决方案，它利用了_String_类的_lastIndexOf_方法。**当我们找到一个字符，它在字符串中的第一个索引也是最后一个索引时，这就确立了该字符仅在该索引处存在于字符串中，因此成为第一个不重复的字符。**

这个的时间复杂度也是O(n)。应该指出的是，_lastIndexOf_方法本身运行在另一个O(n)时间内，除了我们已经在运行的外部循环，我们正在逐个字符地取，从而使这成为一个O(n²)解决方案，与之前的解决方案类似。

```java
public Character firstNonRepeatingCharBruteForce(String inputString) {
    if (null == inputString || inputString.isEmpty()) {
        return null;
    }
    for (Character c : inputString.toCharArray()) {
        int indexOfC = inputString.indexOf(c);
        if (indexOfC == inputString.lastIndexOf(c)) {
            return c;
        }
    }
    return null;
}
```

### 3.2. 优化解决方案
让我们看看是否可以做得更好。我们讨论的方法的瓶颈是我们正在将每个字符与字符串中出现的每个其他字符进行比较，我们继续这样做，直到我们到达字符串的末尾或找到答案。相反，如果我们能够记住每个字符出现的次数，我们就不需要每次都进行比较，而是只需查找字符的频率。我们可以使用_Map_为此目的，更具体地说，是_HashMap_。

该映射将存储字符作为键和其频率作为值。当我们访问每个字符时，我们有两个选择：

1. 如果字符已经出现在映射中，我们将当前位置附加到它的值
2. 如果字符尚未出现在迄今为止构建的映射中，这是一个新的字符，我们增加字符被看到的次数

完成对整个字符串的计算后，我们有一个映射，告诉我们字符串中每个字符的计数。我们现在所要做的就是再次遍历字符串，映射中值的大小为一的第一个字符就是我们的答案。

代码如下：

```java
public Character firstNonRepeatingCharWithMap(String inputString) {
    if (null == inputString || inputString.isEmpty()) {
        return null;
    }
    Map<Character, Integer>` frequency = new HashMap<>();
    for (int outer = 0; outer < inputString.length(); outer++) {
        char character = inputString.charAt(outer);
        frequency.put(character, frequency.getOrDefault(character, 0) + 1);
    }
    for (Character c : inputString.toCharArray()) {
        if (frequency.get(c) == 1) {
            return c;
        }
    }
    return null;
}
```

上述解决方案要快得多，**考虑到在映射上的查找是常数时间操作，或O(1)**。这意味着获取结果的时间不会随着输入字符串大小的增加而增加。

### 3.3. 关于优化解决方案的附加说明
我们应该讨论我们之前讨论的优化解决方案的一些注意事项。原始问题假设输入可以是任何长度，并且可以包含任何字符。这使得_Map_用于查找目的的效率。

**然而，如果我们能够将输入字符集限制为仅小写字符/大写字符/英文字母字符等，使用固定大小的数组而不是映射将是更好的设计选择。**

例如，如果输入仅限于小写英文字符，我们可以有一个大小为26的数组，其中数组中的每个索引引用一个字母，并且值可以表示字符串中字符的频率。最后，字符串中值在数组中为1的第一个字符就是答案。这是它的代码：

```java
public Character firstNonRepeatingCharWithArray(String inputString) {
    if (null == inputString || inputString.isEmpty()) {
        return null;
    }
    int[] frequency = new int[26];
    for (int outer = 0; outer < inputString.length(); outer++) {
        char character = inputString.charAt(outer);
        frequency[character - 'a']++;
    }
    for (Character c : inputString.toCharArray()) {
        if (frequency[c - 'a'] == 1) {
            return c;
        }
    }
    return null;
}
```

**注意，时间复杂度仍然是O(n)，但我们将空间复杂度提高到了常数空间。**这是因为，无论字符串的长度如何，我们用来存储频率的辅助空间（数组）的长度都将是常数。

## 结论
在本文中，我们讨论了找出字符串中第一个不重复字符的不同方法。

如往常一样，你可以在GitHub上找到所有的代码样本。