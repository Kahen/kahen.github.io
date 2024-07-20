---
date: {2022-04-01}
category:
  - Java
  - 文件操作
tag:
  - Java
  - 文件大小
  - 可读格式
head:
  - - meta
    - name: keywords
      content: Java, 文件大小, 可读格式, 转换
------
# Java中将字节大小转换为人类可读格式

当我们在Java中获取文件大小时，通常我们会得到字节值。然而，一旦文件足够大，例如123456789字节，以字节表示的长度就变得难以理解了。

在本教程中，我们将探讨如何在Java中将字节大小转换为人类可读的格式。

## 2. 问题介绍

正如我们之前讨论的，当文件的字节大小很大时，它对人类来说不容易理解。因此，当我们向人类展示数据量时，我们经常使用适当的国际单位制前缀，如KB、MB、GB等，以使大数字易于人类理解。例如，“270GB”比“282341192字节”更容易理解。

然而，当我们通过标准的Java API获取文件大小时，它通常以字节为单位。因此，要获得人类可读的格式，我们需要动态地将值从字节单位转换为相应的二进制前缀，例如将“282341192字节”转换为“207MiB”，或将“2048字节”转换为“2KiB”。

值得一提的是，有两种单位前缀的变体：

- 二进制前缀 - 它们是1024的幂；例如，1MiB = 1024KiB，1GiB = 1024MiB等
- 国际单位制(SI)前缀 - 它们是1000的幂；例如，1MB = 1000KB，1GB = 1000MB等。

**我们的教程将专注于二进制前缀和SI前缀。**

## 3. 解决问题

我们可能已经意识到，解决问题的关键是动态地找到合适的单位。

例如，如果输入小于1024，比如200，那么我们需要使用字节单位得到“200字节”。然而，当输入大于1024但小于1024*1024时，例如4096，我们应该使用KiB单位，这样我们得到“4KiB”。

但是，让我们一步一步解决问题。在我们深入单位确定逻辑之前，首先定义所有所需的单位及其边界。

### 3.1. 定义所需的单位

正如我们所知，**一个单位乘以1024将转换为下一级的单位**。因此，我们可以创建常量来指示所有所需的单位及其基本值：

```java
private static long BYTE = 1L;
private static long KiB = BYTE `<< 10;
private static long MiB = KiB << 10;
private static long GiB = MiB << 10;
private static long TiB = GiB << 10;
private static long PiB = TiB << 10;
private static long EiB = PiB << 10;
```

正如上面的代码所示，我们使用二进制左移运算符(<<)来计算基本值。在这里，**“_x << 10_”与“_x * 1024_”相同，因为1024是2的10次方**。

对于SI前缀**一个单位乘以1000将转换为下一级的单位**。因此，我们可以创建常量来指示所有所需的单位及其基本值：

```java
private static long KB = BYTE * 1000;
private static long MB = KB * 1000;
private static long GB = MB * 1000;
private static long TB = GB * 1000;
private static long PB = TB * 1000;
private static long EB = PB * 1000;
```

### 3.2. 确定单位

让我们首先看一下单位确定方法的实现：

```java
public static String toHumanReadableBinaryPrefixes(long size) {
    if (size `< 0)
        throw new IllegalArgumentException("Invalid file size: " + size);
    if (size >``= EiB) return formatSize(size, EiB, "EiB");
    if (size >= PiB) return formatSize(size, PiB, "PiB");
    if (size >= TiB) return formatSize(size, TiB, "TiB");
    if (size >= GiB) return formatSize(size, GiB, "GiB");
    if (size >= MiB) return formatSize(size, MiB, "MiB");
    if (size >= KiB) return formatSize(size, KiB, "KiB");
    return formatSize(size, BYTE, "Bytes");
}

public static String toHumanReadableSIPrefixes(long size) {
    if (size `< 0)
        throw new IllegalArgumentException("Invalid file size: " + size);
    if (size >`= EB) return formatSize(size, EB, "EB");
    if (size >= PB) return formatSize(size, PB, "PB");
    if (size >= TB) return formatSize(size, TB, "TB");
    if (size >= GB) return formatSize(size, GB, "GB");
    if (size >= MB) return formatSize(size, MB, "MB");
    if (size >= KB) return formatSize(size, KB, "KB");
    return formatSize(size, BYTE, "Bytes");
}
```

现在，让我们快速了解这个方法是如何工作的。

首先，我们要确保输入是一个正数。

**然后，我们从高到低（EB到Byte）检查单位。**一旦我们发现输入的_size_大于或等于当前单位的基本值，当前单位就是正确的单位。

一旦我们找到了正确的单位，我们就可以调用之前创建的_formatSize_方法来得到最终结果作为_String_。

### 3.3. 测试解决方案

现在，让我们编写一个单元测试方法来验证我们的解决方案是否按预期工作。为了简化测试方法，让我们初始化一个_Map`````<Long, String>`````_，其中包含输入和相应的预期结果：

```java
private static Map`````<Long, String>````` DATA_MAP_BINARY_PREFIXES = new HashMap`````<Long, String>`````() {{
    put(0L, "0 Bytes");
    put(1023L, "1023 Bytes");
    put(1024L, "1 KiB");
    put(12_345L, "12.06 KiB");
    put(10_123_456L, "9.65 MiB");
    put(10_123_456_798L, "9.43 GiB");
    put(1_777_777_777_777_777_777L, "1.54 EiB");
}};

private final static Map`````<Long, String>````` DATA_MAP_SI_PREFIXES = new HashMap`````<Long, String>`````() {{
    put(0L, "0 Bytes");
    put(999L, "999 Bytes");
    put(1000L, "1 KB");
    put(12_345L, "12.35 KB");
    put(10_123_456L, "10.12 MB");
    put(10_123_456_798L, "10.12 GB");
    put(1_777_777_777_777_777_777L, "1.78 EB");
}};
```

接下来，让我们通过_MAP DATA_MAP_，取每个键值作为输入，并验证我们是否能得到预期的结果：

```java
DATA_MAP.forEach((in, expected) -> Assert.assertEquals(expected, FileSizeFormatUtil.toHumanReadable(in)));
```

当我们执行单元测试时，它通过了。

## 4. 使用枚举和循环改进解决方案

到目前为止，我们已经解决了问题。解决方案相当直接。在_toHumanReadable_方法中，我们写了很多_if_语句来确定单位。

如果我们仔细考虑解决方案，可能会有几个容易出错的地方：

- 那些_if_语句的顺序必须像方法中那样固定。
- 在每个_if_语句中，我们都硬编码了单位常量和相应的名称作为_String_对象。

接下来，让我们看看如何改进解决方案。

### 4.1. 创建_SizeUnit枚举_

实际上，我们可以将单位常量转换为_enum_，这样我们就不必在方法中硬编码名称了：

```java
enum SizeUnitBinaryPrefixes {
    Bytes(1L),
    KiB(Bytes.unitBase `<< 10),
    MiB(KiB.unitBase << 10),
    GiB(MiB.unitBase << 10),
    TiB(GiB.unitBase << 10),
    PiB(TiB.unitBase << 10),
    EiB(PiB.unitBase << 10);

    private final Long unitBase;

    public static List`<SizeUnitBinaryPrefixes>`` unitsInDescending() {
        List`<SizeUnitBinaryPrefixes>` list = Arrays.asList(values());
        Collections.reverse(list);
        return list;
    }
   //getter和构造函数被省略
}

enum SizeUnitSIPrefixes {
    Bytes(1L),
    KB(Bytes.unitBase * 1000),
    MB(KB.unitBase * 1000),
    GB(MB.unitBase * 1000),
    TB(GB.unitBase * 1000),
    PB(TB.unitBase * 1000),
    EB(PB.unitBaseEB.unitBase * 1000);

    private final Long unitBase;

    public static List``<SizeUnitSIPrefixes>`` unitsInDescending() {
        List``<SizeUnitSIPrefixes>`` list = Arrays.asList(values());
        Collections.reverse(list);
        return list; 
    }
    //getter和构造函数被省略
}
```

正如上面的_enum SizeUnit_所示，一个_SizeUnit_实例持有_both unitBase and name_。

此外，由于我们稍后想要按“降序”检查单位，我们创建了一个辅助方法_unitsInDescending_，以返回所有单位所需的顺序。

**有了这个_enum_，我们就不必手动编码名称了。**

接下来，让我们看看是否可以对一组_if_语句进行一些改进。

### 4.2. 使用循环确定单位

由于我们的_SizeUnit枚举_可以按降序提供一个_List_中的所有单位，我们可以将一组_if_语句替换为_for_循环：

```java
public static String toHumanReadableWithEnum(long size) {
    List`<SizeUnit>` units = SizeUnit.unitsInDescending();
    if (size `< 0) { 
        throw new IllegalArgumentException("Invalid file size: " + size);
    }
    String result = null;
    for (SizeUnit unit : units) {
        if (size >`= unit.getUnitBase()) {
            result = formatSize(size, unit.getUnitBase(), unit.name());
            break;
        }
    }
    return result == null ? formatSize(size, SizeUnit.Bytes.getUnitBase(), SizeUnit.Bytes.name()) : result;
}
```

正如上面的代码所示，该方法遵循与第一个解决方案相同的逻辑。此外，**它避免了那些单位常量、多个_if_语句和硬编码的单位名称。**

为了确保它按预期工作，让我们测试我们的解决方案：

```java
DATA_MAP.forEach((in, expected) -> Assert.assertEquals(expected, FileSizeFormatUtil.toHumanReadableWithEnum(in)));
```

当我们执行测试时，它通过了。

## 5. 使用_Long.numberOfLeadingZeros_方法

我们已经通过逐个检查单位并采取第一个满足我们条件的单位来解决问题。

或者，我们可以使用Java标准API中的_Long.numberOfLeadingZeros_方法来确定给定大小值所属的单位。

接下来，让我们仔细看看这种有趣的方法。

### 5.1. _Long.numberOfLeadingZeros_方法介绍

**_Long.numberOfLeadingZeros_方法返回给定_Long_值的二进制表示中最左边的一位位的零位数量。**

由于**Java的_Long_类型是一个64位整数，_Long.numberOfLeadingZeros(0L) = 64_。**一些例子可能有助于我们快速理解这个方法：

```java
1L  = 00... (总共63个零) ..            0001 -> Long.numberOfLeadingZeros(1L) = 63
1024L = 00... (总共53个零) .. 0100 0000 0000 -> Long.numberOfLeadingZeros(1024L) = 53
```

现在，我们已经理解了_Long.numberOfLeadingZeros_方法。但它如何帮助我们确定单位呢？

让我们弄清楚。

### 5.2. 解决问题的想法

我们知道单位之间的因子是1024，这是2的10次幂（_2^10_）。因此，**如果我们计算每个单位的基本值的前导零位的数量，两个相邻单位之间的差异总是10**：

```java
Index  Unit\tnumberOfLeadingZeros(unit.baseValue)
----------------------------------------------------
0      Byte\t63
1      KiB  \t53
2      MiB  \t43
3      GiB  \t33
4      TiB  \t23
5      PiB  \t13
6      EiB       3
```

进一步，**我们可以计算输入值的前导零位的数量，并查看结果落在哪个单位的范围内，以找到合适的单位**。

接下来，让我们看一个例子 - 如何确定单位并计算大小为4096的单位基本值：

```java
if 4096 `< 1024 (Byte's base value)  ->` Byte
else:
    numberOfLeadingZeros(4096) = 51
    unitIdx = (numberOfLeadingZeros(1) - 51) / 10 = (63 - 51) / 10 = 1
    unitIdx = 1  -> KB (找到了单位)
    unitBase = 1 `<< (unitIdx * 10) = 1 << 10 = 1024
```

接下来，让我们将这个逻辑实现为一个方法。

### 5.3. 实现这个想法

让我们创建一个方法来实现我们刚刚讨论的想法：

```java
public static String toHumanReadableByNumOfLeadingZeros(long size) {
    if (size < 0) {
        throw new IllegalArgumentException("Invalid file size: " + size);
    }
    if (size < 1024) return size + " Bytes";
    int unitIdx = (63 - Long.numberOfLeadingZeros(size)) / 10;
    return formatSize(size, 1L << (unitIdx * 10), " KMGTPE".charAt(unitIdx) + "iB");
}
```

正如我们所看到的，上述方法非常紧凑。它不需要单位常量或_enum_。相反，**我们创建了一个包含单位的_String_：“” KMGTPE”。然后，我们使用计算出的_unitIdx_来选择正确的单位字母，并附加“iB”以构建完整的单位名称。**

值得一提的是，我们故意在_String_“” KMGTPE“”中留下第一个字符为空。这是因为单位“_Byte_”不遵循模式“_*B_”，我们单独处理了它：_if (size < 1024) return size + ” Bytes”;_

再次，让我们编写一个测试方法，以确保它按预期工作：

```java
DATA_MAP.forEach((in, expected) ->` Assert.assertEquals(expected, FileSizeFormatUtil.toHumanReadableByNumOfLeadingZeros(in)));
```

当我们执行测试时，它通过了。

## 6. 使用Apache Commons IO

到目前为止，我们已经实现了两种将文件大小值转换为人类可读格式的不同方法。

实际上，一些外部库已经提供了一个方法来解决这个问题：Apache Commons-IO。

Apache Commons-IO的_FileUtils_允许我们通过_byteCountToDisplaySize_方法将字节大小转换为人类可读的格式。

然而，**这个方法会自动四舍五入小数部分**。

最后，让我们用我们的输入数据测试_byteCountToDisplaySize_方法，看看它打印了什么：

```java
DATA_MAP.forEach((in, expected) -> System.out.println(in + " bytes -> " + FileUtils.byteCountToDisplaySize(in)));
```

测试输出：

```java
0 bytes -> 0 bytes
1024 bytes -> 1 KB
1777777777777777777 bytes -> 1 EB
12345 bytes -> 12 KB
10123456 bytes -> 9 MB
10123456798 bytes -> 9 GB
1023 bytes -> 1023 bytes
```

## 7. 结论

在本文中，我们讨论了将字节大小转换为人类可读格式的不同方法。

一如既往，本文中展示的代码可以在GitHub上找到。
```

OK