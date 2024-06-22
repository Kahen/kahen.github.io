---
date: 2024-06-22
category:
  - Java
  - String Algorithms
tag:
  - String Rotation
  - Java
head:
  - - meta
    - name: keywords
      content: Java, String Rotation, Algorithm
------
# 如何检查两个字符串是否是彼此的旋转

在本教程中，我们将学习如何检查一个字符串是否是另一个字符串的旋转。

我们将简要讨论什么是字符串旋转。然后，我们将查看一些算法来解决这个问题，并进行代码洞察和复杂度分析。

## 2. 字符串旋转简介

在深入一些解决方案之前，让我们讨论一下字符串旋转以及我们应该为算法测试什么。

### 2.1. 字符串和字符串旋转

字符串是原始字符的序列，在Java中，它被包装在_String_类中。尽管两个字符串可能是不同的对象，我们可以比较它们的内部字符，并检查，例如，它们是否相等或包含共同的模式。

**字符串的旋转是一个包含相同字符但顺序不同的字符串。具体来说，一个或多个字符从原始位置移动。** 例如，字符串“cdab”是“abcd”的旋转。这可以通过两个步骤看到：

- _abcd_ -> _dabc_ 将最后一个_d_移动到第一个位置
- _dabc_ -> _cdab_ 将最后一个_c_移动到第一个位置

这是通过从右侧移动完成的，但也可以从未端进行。

值得注意的是，如果两个字符串的长度不同，它们就不能是彼此的旋转。

### 2.2. 变量名称

为了演示，我们将始终将_旋转_称为潜在的字符串候选项，以检查它是否是_原始_字符串的实际旋转。

### 2.3. 单元测试

我们只有两种情况来测试一个字符串是否是旋转。值得注意的是，一个字符串是它自己的旋转。因此，我们可能还想测试那个角落的情况。

## 3. 旋转包含在加倍的字符串中

**我们可以简单地认为，如果我们将原始字符串加倍，那么在某个时候，它将包含一个旋转。** 我们可以直观地想象这一点：

### 3.1. 算法

算法很简单：

```java
boolean doubledOriginContainsRotation(String origin, String rotation) {
    if (origin.length() == rotation.length()) {
        return origin.concat(origin)
          .contains(rotation);
    }

    return false;
}
```

### 3.2. 代码洞察

我们连接原始字符串，并检查它是否包含潜在的旋转：

```java
return origin.concat(origin).contains(rotation);
```

让我们看看算法的复杂度：

- 时间复杂度：O(n*m) 其中n是连接的长度，m是旋转的长度
- 空间复杂度：O(n) 与字符串的长度成比例

### 3.3. 单元测试

让我们测试当旋转包含在加倍的原始字符串中时旋转是正确的。我们还将测试原始字符串与旋转完全相同的情况：

```java
@Test
void givenDoubledOrigin_whenCheckIfOriginContainsRotation_thenIsRotation() {
    assertTrue(doubledOriginContainsRotation("abcd", "cdab"));
    assertTrue(doubledOriginContainsRotation("abcd", "abcd"));
}
```

让我们测试当旋转不包含时。我们还将测试当旋转比原始字符串长时：

```java
@Test
void givenDoubledOrigin_whenCheckIfOriginContainsRotation_thenNoRotation() {
    assertFalse(doubledOriginContainsRotation("abcd", "bbbb"));
    assertFalse(doubledOriginContainsRotation("abcd", "abcde"));
}
```

## 4. 从与原始字符串共同的起始点旋转

我们可以使用前面的方法并构建一个更详细的算法。

**首先，让我们收集旋转中原始字符串起始字符的所有索引。最后，我们循环遍历原始字符串并在移位位置比较字符串。** 让我们更详细地想象这些步骤：

### 4.1. 算法

一旦我们知道了共同的字符，我们就可以检查字符串是否继续相等：

```java
boolean isRotationUsingCommonStartWithOrigin(String origin, String rotation) {
    if (origin.length() == rotation.length()) {
        List`<Integer>` indexes = IntStream.range(0, origin.length())
          .filter(i -> rotation.charAt(i) == origin.charAt(0))
          .boxed()
          .collect(Collectors.toList());

        for (int startingAt : indexes) {
            if (isRotation(startingAt, rotation, origin)) {
                return true;
            }
        }
    }

    return false;
}

boolean isRotation(int startingAt, String rotation, String origin) {
    for (int i = 0; i < origin.length(); i++) {
        if (rotation.charAt((startingAt + i) % origin.length()) != origin.charAt(i)) {
            return false;
        }
    }

    return true;
}
```

### 4.2. 代码洞察

有两个主要点需要关注。第一个是我们收集索引的地方：

```java
List`<Integer>` indexes = IntStream.range(0, origin.length())
  .filter(i -> rotation.charAt(i) == origin.charAt(0))
  .boxed()
  .collect(Collectors.toList());
```

这些是在旋转中我们可以找到原始字符串起始字符的位置。

然后，我们循环遍历字符串并在移位位置进行检查：

```java
for (int i = 0; i `< origin.length(); i++) {
    if (rotation.charAt((startingAt + i) % origin.length()) != origin.charAt(i)) {
        return false;
    }
}
```

值得注意的是，我们使用模运算(%)在超出旋转长度时返回到第一个索引。

让我们看看算法的复杂度：

- 时间复杂度：O(n*m) 其中n是原始字符串的长度，m是找到的索引数量
- 空间复杂度：O(n)

### 4.3. 单元测试

让我们测试当旋转与原始字符串有共同的起始字符并且字符串的其余部分相等时：

```java
@Test
void givenOriginAndRotationInput_whenCheckingCommonStartWithOrigin_thenIsRotation() {
    assertTrue(isRotationUsingCommonStartWithOrigin("abcd", "cdab"));
    assertTrue(isRotationUsingCommonStartWithOrigin("abcd", "abcd"));
}
```

让我们测试当旋转有共同的起始字符，但是它要么太长，要么其余部分不匹配时：

```java
@Test
void givenOriginAndRotationInput_whenCheckingCommonStartWithOrigin_thenNoRotation() {
    assertFalse(isRotationUsingCommonStartWithOrigin("abcd", "bbbb"));
    assertFalse(isRotationUsingCommonStartWithOrigin("abcd", "abcde"));
}
```

## 5. 通过前缀和后缀比较旋转

**如果我们找到原始字符串和旋转的共同起始字符，我们也可以说我们的字符串在该匹配点之前和之后将相等。** 例如，我们的原始字符串“_abcd”在位置2上与“_cdab”有共同的**c**。然而，前缀和后缀需要相应地对字符串的其余部分相等：

### 5.1. 算法

每当我们找到一个共同的字符，我们就可以比较那些剩余字符段的前缀和后缀，反转原始字符串和旋转：

```java
boolean isRotationUsingSuffixAndPrefix(String origin, String rotation) {
    if (origin.length() == rotation.length()) {
        return checkPrefixAndSuffix(origin, rotation);
    }

    return false;
}

boolean checkPrefixAndSuffix(String origin, String rotation) {
    if (origin.length() == rotation.length()) {
        for (int i = 0; i < origin.length(); i++) {
            if (origin.charAt(i) == rotation.charAt(0)) {
                if (checkRotationPrefixWithOriginSuffix(origin, rotation, i)) {
                    if (checkOriginPrefixWithRotationSuffix(origin, rotation, i)) {
                        return true;
                    }
                }
            }
        }
    }

    return false;
}

boolean checkRotationPrefixWithOriginSuffix(String origin, String rotation, int i) {
    return origin.substring(i)
      .equals(rotation.substring(0, origin.length() - i));
}

boolean checkOriginPrefixWithRotationSuffix(String origin, String rotation, int i) {
    return origin.substring(0, i)
      .equals(rotation.substring(origin.length() - i));
}
```

### 5.2. 代码洞察

我们有两个检查要做。首先，我们比较旋转的前缀与原始字符串的后缀：

```java
return origin.substring(i)
  .equals(rotation.substring(0, origin.length() - i));
```

然后，我们比较旋转的后缀与原始字符串的前缀：

```java
return origin.substring(0, i)
  .equals(rotation.substring(origin.length() - i));
```

值得注意的是，这些检查可以以任何顺序进行。

让我们看看算法的复杂度：

- 时间复杂度：O(n*n) 比较两个长度为n的字符串
- 空间复杂度：O(n)

### 5.3. 单元测试

让我们测试当旋转与原始字符串在给定共同字符的情况下具有相等的后缀和前缀时：

```java
@Test
void givenOriginAndRotationInput_whenCheckingUsingSuffixAndPrefix_thenIsRotation() {
    assertTrue(isRotationUsingSuffixAndPrefix("abcd", "cdab"));
    assertTrue(isRotationUsingSuffixAndPrefix("abcd", "abcd"));
}
```

让我们测试当旋转与原始字符串没有相等的后缀和前缀时：

```java
@Test
void givenOriginAndRotationInput_whenCheckingUsingSuffixAndPrefix_thenNoRotation() {
    assertFalse(isRotationUsingSuffixAndPrefix("abcd", "bbbb"));
    assertFalse(isRotationUsingSuffixAndPrefix("abcd", "abcde"));
}
```

## 6. 通过字符队列比较旋转

**另一个看待问题的方法是将两个字符串想象成队列。然后，我们将旋转的顶部字符移至尾部并比较新的队列是否与原始字符串相等。** 让我们简单看一下队列的图片：

### 6.1. 算法

我们创建两个队列。然后，我们在每一步将旋转的顶部字符移至底部，同时检查它是否在每一步与原始字符串相等。

```java
boolean isRotationUsingQueue(String origin, String rotation) {
    if (origin.length() == rotation.length()) {
        return checkWithQueue(origin, rotation);
    }

    return false;
}

boolean checkWithQueue(String origin, String rotation) {
    if (origin.length() == rotation.length()) {
        Queue``<Character>``` originQueue = getCharactersQueue(origin);

        Queue``<Character>`` rotationQueue = getCharactersQueue(rotation);

        int k = rotation.length();
        while (k > 0 && null != rotationQueue.peek()) {
            k--;
            char ch = rotationQueue.peek();
            rotationQueue.remove();
            rotationQueue.add(ch);
            if (rotationQueue.equals(originQueue)) {
                return true;
            }
        }
    }

    return false;
}

Queue``<Character>`` getCharactersQueue(String origin) {
    return origin.chars()
      .mapToObj(c -> (char) c)
      .collect(Collectors.toCollection(LinkedList::new));
}
```

### 6.2. 代码洞察

创建队列后，相关的是如何断言我们的字符串是相等的：

```java
int k = rotation.length();
while (k > 0 && null != rotationQueue.peek()) {
    k--;
    char ch = rotationQueue.peek();
    rotationQueue.remove();
    rotationQueue.add(ch);
    if (rotationQueue.equals(originQueue)) {
        return true;
    }
}
```

将队列顶部的元素在常数时间内移动到底部，为我们提供了一个新的移位对象与原始字符串进行比较。

让我们看看算法的复杂度：

- 时间复杂度：O(n*n) 在最坏情况下，我们在与原始字符串比较时循环遍历整个队列
- 空间复杂度：O(n)

### 6.3. 单元测试

让我们测试使用队列时，将旋转从顶部移至尾部将与原始字符串匹配：

```java
@Test
void givenOriginAndRotationInput_whenCheckingUsingQueues_thenIsRotation() {
    assertTrue(isRotationUsingQueue("abcd", "cdab"));
    assertTrue(isRotationUsingQueue("abcd", "abcd"));
}
```

让我们测试使用队列时它们不会相等：

```java
@Test
void givenOriginAndRotationInput_whenCheckingUsingQueues_thenNoRotation() {
    assertFalse(isRotationUsingQueue("abcd", "bbbb"));
    assertFalse(isRotationUsingQueue("abcd", "abcde"));
}
```

## 7. 结论

在本文中，我们看到了几种检查一个字符串是否是另一个字符串旋转的算法。我们看到了如何使用加倍的原始字符串和_string.contains()_方法来搜索共同字符并断言相等。同样，我们可以使用算法来检查在移位位置处字符串的其余部分是否匹配，或者使用后缀和前缀。最后，我们还看到了一个使用队列的例子，将旋转的顶部移到尾部，直到它与原始字符串相等。

如往常一样，本文中展示的代码可在GitHub上找到。

OK