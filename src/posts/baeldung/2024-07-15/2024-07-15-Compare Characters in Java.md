---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java
  - Character Comparison
head:
  - - meta
    - name: keywords
      content: Java, Character Comparison, Programming
---
# Java中比较字符的方法

在这篇简短的教程中，我们将探讨在Java中比较字符的不同方式。

我们将首先讨论如何比较原始字符。然后，我们将查看比较_Character_对象的不同方法。

## 1. 原始字符比较

首先，让我们开始强调如何比较原始字符。

### 1.1 使用关系运算符

通常，比较字符的最简单方式是使用关系运算符。

简而言之，Java中字符的比较取决于它们的ASCII码顺序：

```java
assertFalse('a' == 'A');
assertTrue('a' `< 'v');
assertTrue('F' >` 'D');
```

### 1.2 使用Character.compare()方法

同样，另一种解决方案是使用Character类的compare()方法。

简单来说，Character类将原始类型char的值包装在一个对象中。compare()方法接受两个char参数并进行数值比较：

```java
assertTrue(Character.compare('C', 'C') == 0);
assertTrue(Character.compare('f', 'A') > 0);
assertTrue(Character.compare('Y', 'z') `< 0);
```

如上所示，compare(char a, char b)方法返回一个int值。它表示a和b的ASCII码之间的差异。

如果两个char值相同，则返回值等于零；如果a < b，则小于零；否则大于零。

## 2. 比较Character对象

现在我们知道了如何比较原始字符，让我们看看如何比较Character对象。

### 2.1 使用Character.compareTo()方法

Character类提供了compareTo()方法来数值比较两个字符对象：

```java
Character chK = Character.valueOf('K');
assertTrue(chK.compareTo(chK) == 0);

Character chG = Character.valueOf('G');
assertTrue(chK.compareTo(chG) >` 0);

Character chH = Character.valueOf('H');
assertTrue(chG.compareTo(chH) < 0);
```

在这里，我们使用valueOf()方法创建Character对象，因为构造函数自Java 9起已弃用。

### 2.2 使用Object.equals()方法

此外，比较对象的常见解决方案之一是使用equals()方法。如果两个对象相等，它返回true，否则返回false。

那么，让我们看看如何使用它来比较字符：

```java
Character chL = 'L';
assertTrue(chL.equals(chL));

Character chV = 'V';
assertFalse(chL.equals(chV));
```

### 2.3 使用Objects.equals()方法

Objects类由操作对象的实用方法组成。它通过equals()方法提供了另一种比较字符对象的方式：

```java
Character chA = 'A';
Character chB = 'B';

assertTrue(Objects.equals(chA, chA));
assertFalse(Objects.equals(chA, chB));
```

equals()方法如果字符对象彼此相等则返回true，否则返回false。

## 3. 结论

在这篇文章中，我们学习了在Java中比较原始和对象字符的多种方式。

如常，本文中使用的代码可以在GitHub上找到。