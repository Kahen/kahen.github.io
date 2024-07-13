---
date: 2022-10-01
category:
  - Java
  - SBE
tag:
  - Simple Binary Encoding
  - Java编码
head:
  - - meta
    - name: keywords
      content: Java, SBE, Simple Binary Encoding, 编码, 解码, 金融数据, 消息结构
---
# Simple Binary Encoding 指南

效率和性能是现代数据服务的两个重要方面，尤其是当我们流式传输大量数据时。当然，通过高效的编码来减小消息大小是实现这一目标的关键。

然而，自行开发的编码/解码算法可能既繁琐又脆弱，这使得它们在长期维护中变得困难。

幸运的是，Simple Binary Encoding（SBE）可以帮助我们以实际的方式实现和维护一个量身定制的编码/解码系统。

在本教程中，我们将讨论Simple Binary Encoding（SBE）是什么以及如何使用它，以及代码示例。

## 2. SBE 是什么？

SBE 是一种二进制表示，用于编码/解码消息以支持低延迟流式传输。它也是FIX SBE标准的参考实现，这是金融数据编码的标准。

### 2.1. 消息结构

为了保持流式传输的语义，**消息必须能够顺序读写，不回头**。这消除了额外的操作——比如解引用、处理位置指针、管理附加状态等——并更好地利用硬件支持，以保持最大性能和效率。

让我们看看SBE中消息是如何结构化的：![img](https://www.baeldung.com/wp-content/uploads/2022/10/sbe-message-structure.png)

- 头部：包含消息版本等必填字段。必要时也可以包含更多字段。
- 根字段：消息的静态字段。它们的块大小是预定义的，不能更改。它们也可以被定义为可选的。
- 重复组：这些表示集合类型的呈现。组可以包含字段以及内部组，以能够表示更复杂的结构。
- 可变数据字段：这些是我们无法提前确定大小的字段。字符串和Blob数据类型是两个例子。它们将位于消息的末尾。

接下来，我们将看到为什么这种消息结构很重要。

### 2.2. SBE何时（不）有用？

SBE的强大之处源于其消息结构。它针对数据的顺序访问进行了优化。因此，**SBE非常适合固定大小的数据，如数字、位集、枚举和数组**。

SBE的一个常见用例是金融数据流——主要包含数字和枚举——SBE专门为此设计。

另一方面，**SBE不适合像字符串和blob这样的可变长度数据类型**。原因是我们很可能事先不知道确切的数据大小。因此，这将在流式传输时进行额外的计算以检测消息中数据的边界。毫不奇怪，如果我们谈论的是毫秒级的延迟，这可能会影响我们的业务。

尽管SBE仍然支持字符串和Blob数据类型，**它们总是被放在消息的末尾，以将可变长度计算的影响降到最低**。

## 3. 设置库

要使用SBE库，让我们在_pom.xml_文件中添加以下Maven依赖项：

```xml
`<dependency>`
    `<groupId>`uk.co.real-logic`</groupId>`
    `<artifactId>`sbe-all`</artifactId>`
    `<version>`1.27.0`</version>`
`</dependency>`
```

## 4. 生成Java存根

在我们生成Java存根之前，显然，我们需要形成我们的消息模式。**SBE提供了通过XML定义我们模式的能力**。

接下来，我们将看到如何为我们的消息定义一个模式，该消息传输样本市场交易数据。

### 4.1. 创建消息模式

我们的模式将是一个基于FIX协议特殊XSD的XML文件。它将定义我们的消息格式。

那么，让我们创建我们的模式文件：

```xml
`<?xml version="1.0" encoding="UTF-8"?>`
`<sbe:messageSchema xmlns:sbe="http://fixprotocol.io/2016/sbe"
  package="com.baeldung.sbe.stub" id="1" version="0" semanticVersion="5.2"
  description="A schema represents stock market data.">`
  `<!-- 省略类型定义和消息定义 -->`
`</sbe:messageSchema>`
```

如果我们详细查看模式，我们会发现它有两个主要部分，_types_和_sbe:message_。我们将首先定义_types_。

作为我们的第一种类型，我们创建_messageHeader_。它是必需的，并且还有四个必需字段：

```xml
`<composite name="messageHeader" description="Message identifiers and length of message root.">`
  ```<!-- 省略字段定义 -->```
```</composite>```
```

- _blockLength_: 表示消息中根字段保留的总空间。它不包括重复字段或可变长度字段，如字符串和blob。
- _templateId_: 消息模板的标识符。
- _schemaId_: 消息模式的标识符。一个模式总是包含一个模板。
- _version_: 定义消息时的消息模式版本。

接下来，我们定义一个枚举，_Market_：

```xml
`<enum name="Market" encodingType="uint8">`
  ``<!-- 省略有效值定义 -->``
``</enum>``
```

我们的目标是保存一些众所周知的交易所名称，我们可以在模式文件中硬编码。它们不经常改变或增加。因此，类型_``<enum>``_在这里是一个很好的选择。

通过设置_encodingType="uint8"_，我们为单个消息中存储市场名称预留了8位空间。这使我们能够支持_2^8 = 256_个不同的市场（0到255）——一个无符号8位整数的大小。

紧接着，我们定义了另一种类型_Symbol_。这将是一个3或4个字符的字符串，用于标识像AAPL（苹果）、MSFT（微软）等金融工具：

```xml
`<type name="Symbol" primitiveType="char" length="4" characterEncoding="ASCII" description="Instrument symbol"/>`
```

正如我们所看到的，我们用_characterEncoding="ASCII"_限制了字符——7位，最多128个字符——我们用_length="4"_设置了一个上限，不允许超过4个字符。因此，我们可以尽可能地减小大小。

之后，我们需要一个复合类型用于价格数据。所以，我们创建了类型_Decimal_：

```xml
`<composite name="Decimal">`
  ```<!-- 省略字段定义 -->```
```</composite>```
```

_Decimal_由两种类型组成：

- _mantissa_: 一个十进制数的有效数字
- _exponent_: 一个十进制数的标度

例如，值_mantissa=98765_和_exponent=-3_表示数字98.765。

接下来，非常类似于_Market_，我们创建了另一个_``<enum>``_来表示_Currency_，其值被映射为_uint8_：

```xml
`<enum name="Currency" encodingType="uint8">`
  ``<!-- 省略有效值定义 -->``
``</enum>``
```

最后，我们通过组合我们之前创建的其他类型来定义_Quote_：

```xml
`<composite name="Quote" description="A quote represents the price of an instrument in a market">`
  `<!-- 省略引用定义 -->`
```</composite>```
```

最后，我们完成了类型定义。

然而，我们仍然需要定义一个消息。所以，让我们定义我们的_TradeData_消息：

```xml
`<sbe:message name="TradeData" id="1" description="Represents a quote and amount of trade">`
  ```<!-- 省略字段定义 -->```
`</sbe:message>`
```

当然，在类型方面，我们可以从规范中找到更多细节。

在接下来的两节中，我们将讨论如何使用我们的模式来生成我们最终用于编码/解码消息的Java代码。

### 4.2. 使用_SbeTool_

使用SBE jar文件生成Java存根的一个简单方法是自动运行实用程序类_SbeTool_：

```shell
java -jar -Dsbe.output.dir=target/generated-sources/java ``<local-maven-directory>``/repository/uk/co/real-logic/sbe-all/1.26.0/sbe-all-1.26.0.jar src/main/resources/schema.xml
```

我们应该注意到，我们必须用我们的本地Maven路径调整占位符_``<local-maven-directory>``_来运行命令。

生成成功后，我们将在_folder target/generated-sources/java_中看到生成的Java代码。

### 4.3. 在Maven中使用_SbeTool_

使用_SbeTool_已经足够容易了，但我们甚至可以通过将其集成到Maven中使其更加实用。

那么，让我们在_pom.xml_中添加以下Maven插件：

```xml
`<!-- 省略插件配置 -->`
```

结果，一个典型的Maven _clean install_命令会自动为我们生成Java存根。

此外，我们始终可以查看SBE的Maven文档以获取更多配置选项。

## 5. 基本消息传递

由于我们的Java存根已经准备好了，让我们看看如何使用它们。

首先，我们需要一些数据进行测试。因此，我们创建了一个类，_MarketData_：

```java
public class MarketData {
    private int amount;
    private double price;
    private Market market;
    private Currency currency;
    private String symbol;

    // 构造函数，getter和setter
}
```

我们应该注意到我们的_MarketData_由SBE为我们生成的_Market_和_Currency_类组成。

接下来，让我们