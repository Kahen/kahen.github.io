---
date: 2022-04-01
category:
  - Java
  - UUID
tag:
  - Java
  - UUID
  - Byte Array
head:
  - - meta
    - name: keywords
      content: Java, UUID, Byte Array, Conversion
------
# Java中在字节数组和UUID之间转换

## 1. 概述

在这篇简短的教程中，我们将看到如何在Java中**在字节数组和_UUID_之间进行转换**。

我们可以很容易地使用纯Java将_UUID_转换为字节数组：

```java
public static byte[] convertUUIDToBytes(UUID uuid) {
    ByteBuffer bb = ByteBuffer.wrap(new byte[16]);
    bb.putLong(uuid.getMostSignificantBits());
    bb.putLong(uuid.getLeastSignificantBits());
    return bb.array();
}
```

## 3. 将字节数组转换为_UUID_

将字节数组转换为_UUID_同样简单：

```java
public static UUID convertBytesToUUID(byte[] bytes) {
    ByteBuffer byteBuffer = ByteBuffer.wrap(bytes);
    long high = byteBuffer.getLong();
    long low = byteBuffer.getLong();
    return new UUID(high, low);
}
```

## 4. 测试我们的方法

让我们测试我们的方法：

```java
UUID uuid = UUID.randomUUID();
System.out.println("Original UUID: " + uuid);

byte[] bytes = convertUUIDToBytes(uuid);
System.out.println("Converted byte array: " + Arrays.toString(bytes));

UUID uuidNew = convertBytesToUUID(bytes);
System.out.println("Converted UUID: " + uuidNew);
```

结果看起来可能是这样的：

```
Original UUID: bd9c7f32-8010-4cfe-97c0-82371e3276fa
Converted byte array: [-67, -100, 127, 50, -128, 16, 76, -2, -105, -64, -126, 55, 30, 50, 118, -6]
Converted UUID: bd9c7f32-8010-4cfe-97c0-82371e3276fa
```

## 5. 结论

在这个快速教程中，我们学习了如何在Java中**在字节数组和_UUID_之间进行转换**。

正如往常一样，本文的示例代码可以在GitHub上找到。