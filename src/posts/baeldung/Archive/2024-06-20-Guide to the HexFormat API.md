---
date: 2024-06-20
category:
  - Kotlin
  - HexFormat API
tag:
  - Hexadecimal
  - String
  - Parse
head:
  - - meta
    - name: keywords
      content: Kotlin, HexFormat API, Hexadecimal, String, Parse
---
# Kotlin中HexFormat API指南

十六进制表示因其人类可读性和紧凑性而被广泛使用，这使得它成为在Kotlin中表示二进制数据的一种高效且直接的方式。因此，Kotlin引入了HexFormat API作为一个方便的数据格式化为十六进制字符串形式并解析回原始数据的包。

在本教程中，**我们将探索HexFormat API并解决一些涉及十六进制表示的常见用例**。

### 2.1. HexFormat类
在Kotlin的标准库中，**_HexFormat_类位于_kotlin.text_包中，它表示十六进制格式化的总体配置**。让我们快速看一下它的定义：

```kotlin
@ExperimentalStdlibApi
@SinceKotlin("1.9")
public class HexFormat internal constructor(
    val upperCase: Boolean,
    val bytes: BytesHexFormat,
    val number: NumberHexFormat
) {
    // 其他方法和属性
}
```

我们必须注意，_@ExperimentalStdlibApi_注解将其标记为实验性功能，因此我们必须**在调用方法或类中添加_@OptIn(ExperimentalStdlibApi::class)_注解**。

此外，它包含三个属性，即_upperCase_、_bytes_和_number_，用于指定不同类型的十六进制表示的不同格式化选项。而_upperCase_适用于两种类型，_bytes_和_number_属性分别特定于各自的类型。

### 2.2. NumberHexFormat和BytesHexFormat
在HexFormat API中，**_NumberHexFormat_类定义了数值的格式化选项**。让我们更详细地查看_NumberHexFormat_类：

```kotlin
public class NumberHexFormat internal constructor(
    val prefix: String,
    val suffix: String,
    val removeLeadingZeros: Boolean
) {
    // 其他方法和属性
}
```

我们可以在格式化数值时指定_prefix_和_suffix_字符串。此外，我们可以使用_removeLeadingZeros_选项来修剪前导零。

进一步地，让我们看看**_BytesHexFormat_类，在定义_ByteArray_值的格式化选项中起着至关重要的作用**：

```kotlin
public class BytesHexFormat internal constructor(
    val bytesPerLine: Int,
    val bytesPerGroup: Int,
    val groupSeparator: String,
    val byteSeparator: String,
    val bytePrefix: String,
    val byteSuffix: String
) {
    // 其他方法和属性
}
```

它提供了几个选项，如_bytesPerLine_、_bytesPerGroup_、_groupSeparator_等，用于自定义十六进制格式化并控制其布局。

现在我们已经讨论了基础知识，我们准备深入探索HexFormat API的一些常见用例。

### 3. 将数字格式化为十六进制值
在这一部分，我们将学习如何使用HexFormat API将不同类型的数字格式化为十六进制字符串。

### 3.1. 默认HexFormat
让我们首先初始化_number_变量为_Byte_类型：

```kotlin
val number: Byte = 63
```

现在，我们可以**使用_toHexString()_扩展函数将数值格式化为十六进制字符串**：

```kotlin
assertEquals("3f", number.toHexString())
```

在这种情况下，我们没有显式使用_HexFormat_的实例，因此Kotlin在内部应用了默认实例进行格式化。

或者，我们可以显式将_HexFormat.Default_实例作为参数传递给_toHexString()_扩展函数：

```kotlin
assertEquals("3f", number.toHexString(HexFormat.Default))
```

正如预期的那样，我们得到了相同的输出。

最后，重要的是要注意，我们可以应用_toHexString()_扩展函数来格式化其他数值类型，如_Short_、_Int_和_Long_。

### 3.2. 添加前缀
对于一些用例，例如URL编码，我们在字符的ASCII值的十六进制表示之前添加一个前缀。

让我们创建_prefixNumberFormat_作为_HexFormat_类的实例：

```kotlin
val prefixNumberFormat = HexFormat {
    number.prefix = "%"
}
```

我们**使用%字符初始化了_number.prefix_属性**。

现在，我们可以调用_toHexString()_扩展函数将_number_变量格式化为其十六进制表示：

```kotlin
assertEquals("%3f", number.toHexString(prefixNumberFormat))
```

我们可以注意到%字符被添加为十六进制字符串的前缀。

### 3.3. 移除前导零
首先，让我们将_number_变量初始化为_Long_类型：

```kotlin
val number: Long = 63
```

现在，让我们使用_toHexString()_扩展函数将其转换为十六进制表示：

```kotlin
assertEquals("000000000000003f", number.toHexString())
```

我们可以注意到**因为_Long_为存储预留了8个字节，而值63只需要2个字节的十六进制字符串，所以在开头有14个零**。

接下来，让我们创建_prefixRemoveLeadingZerosNumberFormat_实例的_HexFormat_类：

```kotlin
val prefixRemoveLeadingZerosNumberFormat = HexFormat {
    number {
        removeLeadingZeros = true
    }
}
```

我们**将_removeLeadingZeros_属性设置为_true_**。

最后，让我们使用_prefixRemoveLeadingZerosNumberFormat_ HexFormat表示_number_的十六进制值：

```kotlin
assertEquals("3f", number.toHexString(prefixRemoveLeadingZerosNumberFormat))
```

太好了！输出中不再有前导零。

### 4. 将十六进制值解析为数字
在这一部分，让我们学习如何**使用_hexTo``<Type>``()_扩展函数将十六进制值解析为数值**，例如_hexToByte()_、_hexToShort()_等。

让我们使用_hexToByte()_扩展函数将“_3f_”十六进制字符串转换为_Byte_的数值：

```kotlin
assertEquals(63, "3f".hexToByte())
```

我们得到了正确的结果。

然而，如果我们尝试转换一个带有额外前缀的十六进制字符串，例如“_%3f_”，那么我们会得到_IllegalArgumentException_：

```kotlin
assertThrows`<IllegalArgumentException>` { "%3f".hexToByte() }
```

我们注意到这种行为是因为，在没有_HexFormat_实例的情况下，_hexToByte()_使用_HexFormat.Default_。

最后，让我们使用_prefixNumberFormat_实例的_HexFormat_与_hexToByte()_将“_%3f_”十六进制字符串转换为_Byte_值：

```kotlin
assertEquals(63, "%3f".hexToByte(prefixNumberFormat))
```

完美！这次我们做对了。

### 5. 将_ByteArray_格式化为十六进制值
在这一部分，让我们探索一个有趣的用例，即将MAC地址的字节表示格式化为其十六进制表示。

让我们创建一个名为_macAddressFormat_的_HexFormat_类实例：

```kotlin
val macAddressFormat = HexFormat {
    upperCase = true
    bytes.bytesPerGroup = 1
    bytes.groupSeparator = ":"
}
```

我们**将_bytes.bytesPerGroup_和_bytes.groupSeparator_属性设置为1和:_。此外，我们还将_upperCase_属性设置为_true_**。

现在，让我们使用_byteArrayOf()_工厂函数创建_macAddressBytes_ _ByteArray_：

```kotlin
val macAddressBytes = byteArrayOf(2, 66, -64, -117, -14, 94)
```

有趣的是，一些值是负数，因为带符号字节的范围是_-128_到_127_。

进一步地，让我们**使用_toHexString()_扩展函数将_macAddressBytes_转换为其十六进制表示**：

```kotlin
val macAddressHexValue = macAddressBytes.toHexString(macAddressFormat)
```

最后，我们必须测试我们的方法：

```kotlin
assertEquals("02:42:C0:8B:F2:5E", macAddressHexValue)
```

太好了！MAC地址格式正确。

### 6. 将十六进制值解析为_ByteArray_
我们已经学会了如何将MAC地址字节表示为其十六进制值。现在，让我们解决将MAC地址的十六进制字符串解析为_ByteArray_的用例。

首先，让我们用一个示例MAC地址十六进制字符串初始化_macAddressHexValue_：

```kotlin
val macAddressHexValue = "02:42:C0:8B:F2:5E"
```

接下来，让我们**使用_hexToByteArray()_扩展函数和_macAddressFormat_实例的_HexFormat_类**：

```kotlin
val macAddressBytes = macAddressHexValue.hexToByteArray(macAddressFormat)
```

由于十六进制字符串具有特定格式，我们传递了_macAddressFormat_。否则，它将抛出_NumberFormatException_异常。

最后，让我们确认我们已经以正确的顺序获得了所有的字节：

```kotlin
assertArrayEquals(byteArrayOf(2, 666, -64, -117, -14, 94), macAddressBytes)
```

太棒了！看起来我们这次做得很好。

### 7. 结论
在本文中，我们学习了Kotlin中的HexFormat API。进一步地，**我们探索了_toHexString()_和_hexTo``<Type>``()_扩展函数，用于将数据格式化为十六进制字符串并解析回原始数据**。

如常，本文的代码可以在GitHub上找到。

OK