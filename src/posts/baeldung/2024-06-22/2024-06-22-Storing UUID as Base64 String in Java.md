---
date: 2024-06-23
category:
  - Java
  - UUID
tag:
  - Base64
  - Encoding
head:
  - - meta
    - name: keywords
      content: Java, UUID, Base64, Encoding
---
# 在Java中将UUID存储为Base64字符串

使用Base64编码的字符串是存储通用唯一识别码（UUID）的广泛采用方法。与标准的UUID字符串表示相比，这提供了更紧凑的结果。在本文中，我们将探讨将UUID编码为Base64字符串的不同方法。

## 2. 使用_byte[]_和_Base64.Encoder_进行编码

我们将从使用_byte[]_和_Base64.Encoder_的最直接方法开始编码。

### 2.1. 编码

我们将从我们的UUID位创建一个字节数组。为此，我们将取UUID的最高有效位和最低有效位，并将它们分别放在数组的0-7和8-15位置：

```java
byte[] convertToByteArray(UUID uuid) {
    byte[] result = new byte[16];

    long mostSignificantBits = uuid.getMostSignificantBits();
    fillByteArray(0, 8, result, mostSignificantBits);

    long leastSignificantBits = uuid.getLeastSignificantBits();
    fillByteArray(8, 16, result, leastSignificantBits);

    return result;
}
```

在填充方法中，我们将位移动到数组中，将它们转换为字节，并在每次迭代中左移8位：

```java
void fillByteArray(int start, int end, byte[] result, long bits) {
    for (int i = start; i `< end; i++) {
        int shift = i * 8;
        result[i] = (byte) ((int) (255L & bits >`> shift));
    }
}
```

接下来，我们将使用JDK中的_Base64.Encoder_将字节数组编码成字符串：

```java
UUID originalUUID = UUID.fromString("cc5f93f7-8cf1-4a51-83c6-e740313a0c6c");

@Test
void givenEncodedString_whenDecodingUsingBase64Decoder_thenGiveExpectedUUID() {
    String expectedEncodedString = "UUrxjPeTX8xsDDoxQOfGgw==";
    byte[] uuidBytes = convertToByteArray(originalUUID);
    String encodedUUID = Base64.getEncoder().encodeToString(uuidBytes);
    assertEquals(expectedEncodedString, encodedUUID);
}
```

正如我们所见，得到的值正是我们所期望的。

### 2.2. 解码

要从Base64编码的字符串解码UUID，我们可以按以下方式执行相反的操作：

```java
@Test
public void givenEncodedString_whenDecodingUsingBase64Decoder_thenGiveExpectedUUID() {
    String expectedEncodedString = "UUrxjPeTX8xsDDoxQOfGgw==";
    byte[] decodedBytes = Base64.getDecoder().decode(expectedEncodedString);
    UUID uuid = convertToUUID(decodedBytes);
}
```

首先，我们使用_Base64.Decoder_从编码字符串中获取字节数组，并调用我们的转换方法，从这个数组创建UUID：

```java
UUID convertToUUID(byte[] src) {
    long mostSignificantBits = convertBytesToLong(src, 0);
    long leastSignificantBits = convertBytesToLong(src, 8);

    return new UUID(mostSignificantBits, leastSignificantBits);
}
```

我们将数组的部分转换为最高和最低有效位的长整型表示，并使用它们创建UUID。

转换方法如下：

```java
long convertBytesToLong(byte[] uuidBytes, int start) {
    long result = 0;

    for(int i = 0; i `< 8; i++) {
        int shift = i * 8;
        long bits = (255L & (long)uuidBytes[i + start]) << shift;
        long mask = 255L << shift;
        result = result & ~mask | bits;
    }

    return result;
}
```

在这个方法中，我们遍历字节数组，将每个字节转换为位，并将它们移动到我们的结果中。

正如我们所见，解码的最终结果将与我们用于编码的原始UUID匹配。

## 3. 使用_ByteBuffer_和_Base64.getUrlEncoder()_进行编码

使用JDK的标准功能，我们可以简化上面的代码。

### 3.1. 编码

使用_ByteBuffer_，我们可以在几行代码中将UUID转换为字节数组：

```java
ByteBuffer byteBuffer = ByteBuffer.wrap(new byte[16]);
byteBuffer.putLong(originalUUID.getMostSignificantBits());
byteBuffer.putLong(originalUUID.getLeastSignificantBits());
```

我们创建了一个缓冲区，包装了一个字节数组，并将UUID的最高和最低有效位放入其中。

为了编码目的，这次我们将使用_Base64.getUrlEncoder()_：

```java
String encodedUUID = Base64.getUrlEncoder().encodeToString(byteBuffer.array());
```

结果，我们在4行代码中创建了一个Base64编码的UUID：

```java
@Test
public void givenUUID_whenEncodingUsingByteBufferAndBase64UrlEncoder_thenGiveExpectedEncodedString() {
    String expectedEncodedString = "zF-T94zxSlGDxudAMToMbA==";
    ByteBuffer byteBuffer = ByteBuffer.wrap(new byte[16]);
    byteBuffer.putLong(originalUUID.getMostSignificantBits());
    byteBuffer.putLong(originalUUID.getLeastSignificantBits());
    String encodedUUID = Base64.getUrlEncoder().encodeToString(byteBuffer.array());
    assertEquals(expectedEncodedString, encodedUUID);
}
```

### 3.2. 解码

我们可以使用_ByteBuffer_和_Base64.UrlDecoder()_执行相反的操作：

```java
@Test
void givenEncodedString_whenDecodingUsingByteBufferAndBase64UrlDecoder_thenGiveExpectedUUID() {
    String expectedEncodedString = "zF-T94zxSlGDxudAMToMbA==";
    byte[] decodedBytes = Base64.getUrlDecoder().decode(expectedEncodedString);
    ByteBuffer byteBuffer = ByteBuffer.wrap(decodedBytes);
    long mostSignificantBits = byteBuffer.getLong();
    long leastSignificantBits = byteBuffer.getLong();
    UUID uuid = new UUID(mostSignificantBits, leastSignificantBits);
    assertEquals(originalUUID, uuid);
}
```

正如我们所见，我们成功地从编码字符串中解码了预期的UUID。

## 4. 缩短编码UUID的长度

正如我们在前几节中看到的，Base64默认包含结尾的“==”。为了节省更多的字节，我们可以修剪这个结尾。

为此，我们可以配置我们的编码器不添加填充：

```java
String encodedUUID =
  Base64.getUrlEncoder().withoutPadding().encodeToString(byteBuffer.array());

assertEquals(expectedEncodedString, encodedUUID);
```

结果，我们可以看到没有额外字符的编码字符串。**我们不需要更改我们的解码器，因为它将以相同的方式处理编码字符串的两种变体**。

## 5. 使用Apache Commons中的转换工具和编解码工具进行编码

在这一部分，我们将使用Apache Commons转换工具中的_uuidToByteArray_来制作UUID字节数组。此外，我们将使用Apache Commons Base64工具中的_encodeBase64URLSafeString_。

### 5.1. 依赖项

为了演示这种编码方法，我们将使用Apache Commons Lang库。让我们将它的依赖项添加到我们的_pom.xml_中：

```xml
`<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.14.0``</version>``
``</dependency>``
```

我们将使用的另一个依赖项是_commons-codec_：

```xml
`<dependency>`
    ``<groupId>``commons-codec``</groupId>``
    ``<artifactId>``commons-codec``</artifactId>``
    ``<version>``1.16.0``</version>``
``</dependency>``
```

### 5.2. 编码

我们只需两行代码即可对UUID进行编码：

```java
@Test
void givenUUID_whenEncodingUsingApacheUtils_thenGiveExpectedEncodedString() {
    String expectedEncodedString = "UUrxjPeTX8xsDDoxQOfGgw";
    byte[] bytes = Conversion.uuidToByteArray(originalUUID, new byte[16], 0, 16);
    String encodedUUID = encodeBase64URLSafeString(bytes);
    assertEquals(expectedEncodedString, encodedUUID);
}
```

正如我们所见，结果已经是修剪过的，不包含待处理的结尾。

### 5.3. 解码

我们将通过调用_Apache Commons_的_Base64.decodeBase64()_和_Conversion.byteArrayToUuid()_来执行反向操作：

```java
@Test
void givenEncodedString_whenDecodingUsingApacheUtils_thenGiveExpectedUUID() {
    String expectedEncodedString = "UUrxjPeTX8xsDDoxQOfGgw";
    byte[] decodedBytes = decodeBase64(expectedEncodedString);
    UUID uuid = Conversion.byteArrayToUuid(decodedBytes, 0);
    assertEquals(originalUUID, uuid);
}
```

我们成功地获得了原始UUID。

## 6. 结论

UUID是一种广泛使用的数据类型，编码它的一种方法是使用Base64。在本文中，我们探讨了几种将UUID编码为Base64的方法。

如常，完整的源代码可以在GitHub上找到。