---
date: 2022-04-01
category:
  - Java
tag:
  - UUID
  - Java
head:
  - - meta
    - name: keywords
      content: Java, UUID, 字符串, 唯一标识符
---
# 在Java中从字符串生成相同的UUID

我们经常需要在应用程序中为各种目的生成唯一标识符。生成唯一标识符的一种常用方法是使用通用唯一标识符（UUID）。

在本教程中，我们将探讨如何在Java中从字符串生成相同的UUID。

## 2. 问题介绍

当我们谈论从字符串生成UUID时，可能有两种情况：

- 场景1 - 输入字符串是标准的UUID字符串格式。
- 场景2 - 给定的字符串是一个自由格式的字符串。

接下来，我们将更详细地了解如何从字符串生成UUID对象。当然，我们将涵盖两种场景。

为了简化，我们将使用单元测试断言来验证每种方法是否能够产生预期的结果。

## 3. 给定字符串是标准的UUID表示

**标准UUID字符串格式由五个十六进制数字组组成，由连字符分隔**，例如：

```java
String inputStr = "bbcc4621-d88f-4a94-ae2f-b38072bf5087";
```

在这种情况下，我们希望从给定的字符串中获取一个UUID对象。此外，**生成的UUID对象的字符串表示必须等于输入字符串**。换句话说，这意味着`generatedUUID.toString()`与输入字符串相同。

因此，确切地说，我们想要“解析”标准UUID格式的输入字符串，并根据解析后的值构建一个新的UUID对象。

为了实现这一点，我们可以使用`UUID.fromString()`方法。接下来，让我们编写一个测试来看看它的工作原理：

```java
String inputStr = "bbcc4621-d88f-4a94-ae2f-b38072bf5087";

UUID uuid = UUID.fromString(inputStr);
UUID uuid2 = UUID.fromString(inputStr);
UUID uuid3 = UUID.fromString(inputStr);

assertEquals(inputStr, uuid.toString());

assertEquals(uuid, uuid2);
assertEquals(uuid, uuid3);
```

正如上面的测试所示，我们简单地调用了`UUID.fromString(inputStr)`来生成UUID对象。标准的UUID类负责输入解析和UUID生成。

此外，在我们的测试中，我们从同一个输入字符串生成了多个UUID对象，结果发现**由输入字符串生成的所有UUID对象都是相等的**。

使用`UUID.fromString()`方法很方便。然而，值得一提的是，输入字符串必须是标准的UUID格式。否则，该方法将抛出`IllegalArgumentException`：

```java
String inputStr = "I am not a standard UUID representation.";
assertThrows(IllegalArgumentException.class, () -> UUID.fromString(inputStr));
```

## 4. 给定输入是自由格式的字符串

我们已经看到`UUID.fromString()`可以方便地从标准UUID格式字符串构造UUID对象。让我们看看如何从自由格式的字符串生成UUID对象。

**UUID类为我们提供了`nameUUIDFromBytes(byte[] name)`方法来构建版本3（也称为基于名称的）UUID对象。**

由于该方法只接受字节数组（`byte[]`），我们需要将输入字符串转换为字节数组才能使用`UUID.nameUUIDFromBytes()`：

```java
String inputStr = "I am not a standard UUID representation.";

UUID uuid = UUID.nameUUIDFromBytes(inputStr.getBytes());
UUID uuid2 = UUID.nameUUIDFromBytes(inputStr.getBytes());
UUID uuid3 = UUID.nameUUIDFromBytes(inputStr.getBytes());

assertTrue(uuid != null);

assertEquals(uuid, uuid2);
assertEquals(uuid, uuid3);
```

正如上面的测试所示，我们通过三次调用`UUID.nameUUIDFromBytes()`并使用相同的输入字符串生成了三个UUID对象，这三个UUID彼此相等。

内部地，这个方法**基于输入字节数组的MD5哈希返回一个UUID对象**。因此，对于给定的输入名称，生成的UUID保证是唯一的。

此外，值得一提的是**由`UUID.nameUUIDFromBytes()`方法生成的UUID对象是版本3的UUID**。我们可以使用`version()`方法来验证它：

```java
UUID uuid = UUID.nameUUIDFromBytes(inputStr.getBytes());
...
assertEquals(3, uuid.version());
```

**版本5的UUID使用SHA-1（160位）哈希函数而不是MD5。**如果需要版本5的UUID，我们可以直接使用我们在介绍版本3和5的UUID时创建的`generateType5UUID(String name)`方法：

```java
String inputStr = "I am not a standard UUID representation.";

UUID uuid = UUIDGenerator.generateType5UUID(inputStr);
UUID uuid2 = UUIDGenerator.generateType5UUID(inputStr);
UUID uuid3 = UUIDGenerator.generateType5UUID(inputStr);

assertEquals(5, uuid.version());

assertTrue(uuid != null);

assertEquals(uuid, uuid2);
assertEquals(uuid, uuid3);
```

## 5. 结论

在本文中，我们探讨了如何从字符串生成相同的UUID对象。我们根据输入格式覆盖了两种场景：

- 标准UUID格式字符串 - 使用`UUID.fromString()`
- 自由格式字符串 - 使用`UUID.nameUUIDFromBytes()`

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。