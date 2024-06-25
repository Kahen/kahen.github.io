---
date: 2024-06-25
category:
  - Java
  - 字符串
tag:
  - String.length()
  - String.getBytes().length
head:
  - - meta
    - name: keywords
      content: Java, 字符串, 编码, 字符编码, UTF-8, UTF-32
---
# Java中String.length()与String.getBytes().length的区别

当我们在Java中工作时，操作字符串是一项基本技能。因此，理解与字符串相关的方法是编写高效且无误代码的关键。

两个常用的方法，String.length()和String.getBytes().length，乍一看可能看起来相似，但它们服务于不同的目的。

在本教程中，我们将了解这两种方法并探讨它们之间的区别。此外，我们还将讨论何时使用每一种方法。

### String.length()和String.getBytes().length的初步了解

正如方法名所暗示的，String.length()方法返回字符串的长度。另一方面，String.getBytes()从给定的字符串中获取默认编码的字节数组。然后，String.getBytes().length报告数组的长度。

如果我们写一个测试，我们可能会看到它们返回相同的值：

```java
String s = "beautiful";
assertEquals(9, s.length());
assertEquals(9, s.getBytes().length);
```

在处理Java中的字符串时，String.length()和String.getBytes().length是否总是产生相同的值？

接下来，我们来找出答案。

### String.length()和String.getBytes().length可能返回不同的值

当前JVM的默认字符编码或字符集在决定String.getBytes().length的结果中起着重要作用。如果我们没有向String.getBytes()传递任何参数，它使用默认的编码方案进行编码。

我们可以使用Charset.defaultCharset().displayName()方法检查Java环境的默认编码。例如，当前JVM的默认编码是UTF-8：

```java
System.out.println(Charset.defaultCharset().displayName());
// 输出：UTF-8
```

接下来，让我们测试另外两个字符串，看看String.length()和String.getBytes().length是否仍然返回相同的值：

```java
String de = "schöne";
assertEquals(6, de.length());
assertEquals(7, de.getBytes().length);

String cn = "美丽";
assertEquals(2, cn.length());
assertEquals(6, cn.getBytes().length);
```

正如上述测试所示，我们首先用德语中的“beautiful”（“schöne”）进行了测试，然后我们又取了另一个字符串，这是中文中的“beautiful”（“美丽”）。结果表明，在两次测试中，String.length()和String.getBytes().length都产生了不同的值。

接下来，让我们找出为什么会发生这种情况。

### 字符编码

在了解为什么String.length()和String.getBytes().length在字符串“schöne”和“美丽”上给出了不同的值之前，让我们快速了解一下字符编码的工作原理。

有许多字符编码方案，例如UTF-8和UTF-16。我们可以将这些编码方案分为两类：

- 可变长度编码
- 固定长度编码

我们不会深入探讨字符编码。然而，对这两种编码技术的一般了解将有助于理解为什么String.getBytes().length可能与String.length()有不同的值。

接下来，让我们通过示例快速了解这两种编码类型。

#### 4.1. 固定长度编码

固定长度编码使用相同数量的字节来编码任何字符。固定长度编码的一个典型例子是UTF-32，它总是使用四个字节来编码一个字符。因此，这是用UTF-32编码“beautiful”的方式：

```java
char    byte1 byte2 byte3 byte4
 b        0     0     0     98
 e        0     0     0     101
 a        0     0     0     97
 u        0     0     0     117
 ...
 l        0     0     0     108
```

因此，**当使用UTF-32字符集调用String.getBytes()时，结果字节数组的长度将始终是字符串中字符数量的四倍：**

```java
Charset UTF_32 = Charset.forName("UTF_32");

String en = "beautiful";
assertEquals(9, en.length());
assertEquals(9 * 4, en.getBytes(UTF_32).length);

String de = "schöne";
assertEquals(6, de.length());
assertEquals(6 * 4, de.getBytes(UTF_32).length);

String cn = "美丽";
assertEquals(2, cn.length());
assertEquals(2 * 4, cn.getBytes(UTF_32).length);
```

也就是说，**如果UTF-32被设置为JVM的默认编码，String.length()和String.getBytes().length的结果总是不同的**。

有些人可能会注意到，在存储UTF-32编码的字符时，即使某些字符，如ASCII字符，只需要一个字节，我们仍然分配四个字节，其中三个填充为零。这是有点低效的。

因此，引入了可变长度字符编码。

#### 4.2. 可变长度编码

**可变长度编码使用不同数量的字节来编码不同的字符**。UTF-8是我们的默认编码。此外，它是可变长度编码方案的一个例子。让我们看看UTF-8是如何编码字符的。

**UTF-8根据字符的代码点使用一到四个字节来编码字符**。代码点是字符的整数表示。例如，'b'的代码点是十进制的98或十六进制的U+0062，这与它的ASCII代码相同。

接下来，让我们看看UTF-8如何确定用于编码字符的字节数：

| 代码点范围 | 字节数 |
| --- | --- |
| U+0000 to U+007F | 1 |
| U+0080 to U+07FF | 2 |
| U+0800 to U+FFFF | 3 |
| U+10000 to U+10FFFF | 4 |

我们知道字符'b'的代码点是U+0062，它在上表的第一行范围内。因此，UTF-8只使用一个字节来编码它。**由于U+0000到U+007F是十进制的0到127，UTF-8使用一个字节来编码所有标准ASCII字符**。这就是为什么在字符串“beautiful”上，String.length()和String.getBytes().length给出了相同的结果（9）。

然而，如果我们检查'ö'、'美'和'丽'的代码点，我们会看到UTF-8使用不同数量的字节来编码它们：

```java
assertEquals("f6", Integer.toHexString('ö'));   // U+00F6 -> 2 bytes
assertEquals("7f8e", Integer.toHexString('美')); // U+7F8E -> 3 bytes
assertEquals("4e3d", Integer.toHexString('丽')); // U+4E3D -> 3 bytes
```

因此，“schöne”.getBytes().length返回7（5 + 2），而“美丽”.getBytes().length产生6（3 + 3）。

### 如何选择String.length()和String.getBytes().length

现在，我们清楚了String.length()和String.getBytes().length返回相同值的场景以及它们何时不同。然后，可能会出现一个问题：我们应该选择哪种方法？

在决定这些方法时，我们应该考虑我们任务的上下文：

- **String.length() – 当我们使用字符和字符串的逻辑内容**，并想要获得字符串中的总字符数，例如用户输入的最大长度验证或在字符串中移动字符
- **String.bytes().length – 当我们处理以字节为单位的操作并需要知道字符串的大小**，例如从文件或网络流中读取或写入

值得注意的是，当我们使用String.bytes()时，我们应该记住**字符编码起着重要作用**。String.bytes()使用默认的编码方案对字符串进行编码。除此之外，**我们还可以向方法传递所需的字符集来对字符串进行编码**，例如String.bytes(Charset.forName("UTF_32"))或String.bytes(StandardCharsets.UTF_16)

### 结论

在本文中，我们一般了解了字符编码的工作原理，并探讨了为什么String.length()和String.getBytes().length可能会产生不同的结果。此外，我们还讨论了如何在String.length()和String.getBytes().length之间进行选择。

如常，示例的完整源代码可在GitHub上找到。