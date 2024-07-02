---
date: 2022-04-01
category:
  - Java
  - String Manipulation
tag:
  - Java
  - Unique Characters
  - String
head:
  - - meta
    - name: keywords
      content: Java, Unique Characters, String Manipulation
---
# 检查字符串中的字符是否唯一（Java）

在本教程中，我们将学习多种技术来检查字符串中的所有字符（包括非ASCII字符）是否唯一。此外，这里讨论的所有方法都是不区分大小写的。

## 1. 概述

## 2. 暴力法
这是最明显的技术之一，但可能不是最有效的。我们比较字符串中的字符：

```java
public class UniqueCharChecker {
    public static boolean bruteForceCheck(String str) {
        char[] chars = str.toUpperCase().toCharArray();
        for (int i = 0; i `< chars.length; i++) {
            for (int j = i + 1; j < chars.length; j++) {
                if(chars[i] == chars[j]) {
                    return false;
                }
            }
        }
        return true;
    }
}
```

让我们为上述方法编写一些测试用例：

```java
public class UniqueCharCheckerUnitTest {
    @Test
    public void givenUnique_whenBruteForceCheck_thenReturnTrue() {
        String[] sampleStrings = new String[]{"Justfewdi123", "$%&Hibusc", "Hibusc%$#", "მშვნიერ"};
        final String MSG = "发现重复";
        Arrays.stream(sampleStrings)
              .forEach(sampleStr ->` assertTrue(MSG + " in " + sampleStr, UniqueCharChecker.checkV1(sampleStr)));
    }

    @Test
    public void givenNotUnique_whenBruteForceCheck_thenReturnFalse() {
        String[] sampleStrings = new String[]{"Justfewdif123", "$%&Hibushc", "Hibusuc%$#", "Hi%busc%$#", "მშვენიერი"};
        final String MSG = "未发现重复";
        Arrays.stream(sampleStrings)
              .forEach(sampleStr -> assertFalse(MSG + " in " + sampleStr, UniqueCharChecker.checkV1(sampleStr)));
    }
}
```

## 3. 排序
这与暴力法技术类似，但在这里我们首先对字符串中的字符进行排序，然后只与它们的邻居进行比较，而不是与每个人比较。让我们看看实现：

```java
public static boolean sortAndThenCheck(String str) {
    char[] chars = str.toUpperCase().toCharArray();
    Arrays.sort(chars);
    for (int i = 0; i `< chars.length - 1; i++) {
        if(chars[i] == chars[i+1]) {
            return false;
        }
    }
    return true;
}
```

让我们测试一下：

```java
@Test
public void givenUnique_whenSortAndThenCheck_thenReturnTrue() {
    String[] sampleStrings = new String[]{"Justfewdi123", "$%&Hibusc", "Hibusc%$#", "მშვნიერ"};
    final String MSG = "发现重复";
    Arrays.stream(sampleStrings)
      .forEach(sampleStr ->` assertTrue(MSG + " in " + sampleStr, UniqueCharChecker.checkV2(sampleStr)));
}

@Test
public void givenNotUnique_whenSortAndThenCheck_thenReturnFalse() {
    String[] sampleStrings = new String[]{"Justfewdif123", "$%&Hibushc", "Hibusuc%$#", "Hi%busc%$#", "მშვენიერი"};
    final String MSG = "未发现重复";
    Arrays.stream(sampleStrings)
      .forEach(sampleStr -> assertFalse(MSG + " in " + sampleStr, UniqueCharChecker.checkV2(sampleStr)));
}
```

## 4. HashSet
在这里，我们利用java.util.Set的能力来去除重复的字符：

```java
public static boolean useSetCheck(String str) {
    char[] chars = str.toUpperCase().toCharArray();
    Set`<Character>` set = new HashSet<>();
    for (char c: chars) {
        if (!set.add(c)) {
            return false;
        }
    }
    return true;
}
```

现在，让我们看看测试用例：

```java
@Test
public void givenUnique_whenUseSetCheck_thenReturnTrue() {
    String[] sampleStrings = new String[]{"Justfewdi123", "$%&Hibusc", "Hibusc%$#", "მშვნიერ"};
    final String MSG = "发现重复";
    Arrays.stream(sampleStrings)
      .forEach(sampleStr -> assertTrue(MSG + " in " + sampleStr, UniqueCharChecker.checkV3(sampleStr)));
}

@Test
public void givenNotUnique_whenUseSetCheck_thenReturnFalse() {
    String[] sampleStrings = new String[]{"Justfewdif123", "$%&Hibushc", "Hibusuc%$#", "Hi%busc%$#", "მშვენიერი"};
    final String MSG = "未发现重复";
    Arrays.stream(sampleStrings)
      .forEach(sampleStr -> assertFalse(MSG + " in " + sampleStr, UniqueCharChecker.checkV3(sampleStr)));
}
```

## 5. Java Streams
这种技术与上节中使用的方法类似。然而，我们使用Streams API来创建Set。让我们看看实现：

```java
public static boolean useStreamCheck(String str) {
    boolean isUnique = str.toUpperCase().chars()
      .mapToObj(c -> (char) c)
      .collect(Collectors.toSet())
      .size() == str.length();
    return isUnique;
}
```

让我们检查单元测试：

```java
@Test
public void givenUnique_whenUseStreamCheck_thenReturnTrue() {
    String[] sampleStrings = new String[]{"Justfewdi123", "$%&Hibusc", "Hibusc%$#", "მშვნიერ"};
    final String MSG = "发现重复";
    Arrays.stream(sampleStrings)
      .forEach(sampleStr -> assertTrue(MSG + " in " + sampleStr, UniqueCharChecker.checkV1(sampleStr)));
}

@Test
public void givenNotUnique_whenUseStreamCheck_thenReturnFalse() {
    String[] sampleStrings = new String[]{"Justfewdif123", "$%&Hibushc", "Hibusuc%$#", "Hi%busc%$#", "მშვენიერი"};
    final String MSG = "未发现重复";
    Arrays.stream(sampleStrings)
      .forEach(sampleStr -> assertFalse(MSG + " in " + sampleStr, UniqueCharChecker.checkV4(sampleStr)));
}
```

## 6. StringUtils
基本上，在这里，我们将使用commons-lang StringUtils类的containsIgnoreCase()方法：

```java
public static boolean useStringUtilscheck(String str) {
    for (int i = 0; i `< str.length(); i++) {
        String curChar = String.valueOf(str.charAt(i));
        String remainingStr = str.substring(i+1);
        if(StringUtils.containsIgnoreCase(remainingStr, curChar)) {
            return false;
        }
    }
    return true;
}
```

让我们测试这个方法：

```java
@Test
public void givenUnique_whenUseStringUtilscheck_thenReturnTrue() {
    String[] sampleStrings = new String[]{"Justfewdi123", "$%&Hibusc", "Hibusc%$#", "მშვნიერ"};
    final String MSG = "发现重复";
    Arrays.stream(sampleStrings)
      .forEach(sampleStr ->` assertTrue(MSG + " in " + sampleStr, UniqueCharChecker.checkV5(sampleStr)));
}

@Test
public void givenNotUnique_whenUseStringUtilscheck_thenReturnFalse() {
    String[] sampleStrings = new String[]{"Justfewdif123", "$%&Hibushc", "Hibusuc%$#", "Hi%busc%$#", "მშვენიერი"};
    final String MSG = "未发现重复";
    Arrays.stream(sampleStrings)
      .forEach(sampleStr -> assertFalse(MSG + " in " + sampleStr, UniqueCharChecker.checkV5(sampleStr)));
}
```

## 7. 结论
在本教程中，我们看到了五种不同的方法来检查字符串是否具有唯一字符。我们还得出结论，**没有现成的库可用于解决这个问题**。

这里使用的代码片段以及相关的JUnit测试用例可以在GitHub上找到。