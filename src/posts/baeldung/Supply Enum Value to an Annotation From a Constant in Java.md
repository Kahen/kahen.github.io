很抱歉，由于网络原因，我无法访问您提供的链接并获取网页内容。请您检查链接的有效性，并确保网页可以正常访问。如果链接有效，我将能够为您提供翻译服务。如果您有其他问题或需要帮助，请随时告诉我。---
date: 2024-06-15
category:
  - Java
  - Annotations
tag:
  - Java
  - Enum
  - Annotations
---

# Java中从常量向注解提供枚举值
在本教程中，我们将探索Java中从常量向注解提供枚举值的可能性。为了理解所提出的设计决策的主要驱动因素，我们将从问题陈述开始，然后是一个演示用例。

## 1. 引言

## 2. 问题陈述

让我们设想以下需求。**在控制器类中，两个_POST_和_PUT_端点始终需要具有相同的_Content-Type_。**现在，让我们看看如何共享两个端点定义中的相同枚举值。

为了更好地理解问题陈述，我们将继续探索一个演示用例。

## 3. 定义演示用例

为了满足要求，我们需要以下数据结构。

一个看起来像这样的_RequestContentType_枚举：

```
enum RequestContentType {
    JSON, XML, HTML
}
```

两个自定义注解，_@PutRequest_和_@PostRequest_：

```
@interface PostRequest {
    RequestContentType type();
}

@interface PutRequest {
    RequestContentType type();
}
```

最后是以下控制器类：

```
class DataController {
    @PostRequest(contentType = RequestContentType.JSON)
    String createData() {
       // ...
    }

    @PutRequest(contentType = RequestContentType.JSON)
    public String updateData() {
        // ...
    }
}
```

正如我们所观察到的，当前控制器实现通过两次引用_JSON_类型来满足要求，分别用于每个函数。尽管这种实现满足了要求，但它仍然不够健壮。**从技术上讲，_@PostRequest_可以很容易地使用与_@PutRequest_不同的_contentType_初始化。**

在下一节中，我们将探讨实现一个强类型实现的不同方法，以确保_@PostRequest_和_@PutRequest_始终共享相同的_contentType_。我们将定义理想场景，了解Java语言的限制，并最终探索我们拥有的替代方案。

## 4. 共享相同的枚举值

我们希望通过在一个地方更改_RequestContentType_，更改就会在所有引用_RequestContentType_的地方反映出来。

接下来，我们将看看通常的思维方式对我们有什么指示。

### 4.1. 理想场景

当我们第一次考虑这个需求时，我们的思维会沿着以下方向流动——让我们**定义一个类型为_RequestContentType_的常量，然后在每个注解中引用它。**看起来像这样：

```
class DataController {
    static final RequestContentType REQUEST_TYPE = RequestContentType.JSON;

    @PostRequest(contentType = REQUEST_TYPE)
    String createData() {
        // ...
    }

    @PutRequest(contentType = REQUEST_TYPE)
    String updateData() {
        // ...
    }
}
```

这是最直接和理想的实现方法。**不幸的是，它没有按预期工作。这是因为我们面临一个编译错误，指出**“属性值必须是枚举常量”**。

接下来，让我们更深入地了解为什么这个解决方案没有编译，以及Java对它施加了什么限制。

### 4.2. 理解Java的限制

正如我们在JLS-9.7.1中看到的，对于注解，如果元素类型是枚举，唯一接受的值就是枚举常量。根据Java语言规范的普遍语言，根据JLS-8.9.1，所有的枚举，如_RequestContentType_中的_JSON_、_XML_和_HTML_，已经是常量了。有关枚举的更多信息，请查看Java枚举指南。

总之，Java通过设计限制我们只能直接将枚举分配给注解。因此，理想场景是不可行的。

## 5. 实现替代方案以将枚举作为常量提供给注解

现在我们已经了解了Java语言的限制，让我们看看如何实现期望的结果。我们将探索两个选项：通过定义一个带有一组整型常量的接口来模拟枚举，另一个是使用带有嵌套静态类的枚举。最后，我们将比较这两种方法。

接下来，让我们深入了解这两种方法的细节，并了解何时使用其中之一。

### 5.1. 使用整型常量模拟枚举

让我们从模拟枚举开始，它看起来像这样：

```
interface SimulatedRequestContentType {
   static final int JSON = 1;
   static final int XML = 2;
   static final int HTML = 3;
}
```

让我们也将注解定义更改为接受整型：

```
@interface PostRequest {
    int intContentType();
}

@interface PutRequest {
    int intContentType();
}
```

最后，使用方式看起来像这样：

```
class DataController {
    static final int REQUEST_TYPE = SimulatedRequestContentType.JSON;

    @PostRequest(intContentType = REQUEST_TYPE)
    String createData() {
        // ...
    }

    @PutRequest(intContentType = REQUEST_TYPE)
    String updateData() {
        // ...
    }
}
```

正如我们所看到的，这种替代方案解决了需求，但不再使用枚举。

让我们看看如何仍然使用枚举。

### 5.2. 通过嵌套静态类扩展枚举以定义常量

现在，让我们看看我们如何通过嵌套静态类来扩展初始枚举以定义常量。枚举_ExtendedRequestContentType_的实现看起来像这样：

```
enum ExtendedRequestContentType {
    JSON(Constants.JSON_VALUE), XML(Constants.XML_VALUE), HTML(Constants.HTML_VALUE);

    ExtendedRequestContentType(String name) {
        if (!name.equals(this.name()))
        {
            throw new IllegalArgumentException();
        }
    }

    public static class Constants {
        public static final String JSON_VALUE = "JSON";
        public static final String XML_VALUE = "XML";
        public static final String HTML_VALUE = "HTML";
    }
}
```

_Constants_类定义了每种类型的值。这些将用作注解的参数值。

一个重要的细节是枚举的构造函数期望一个名为_name_的字符串作为参数。基本上，有了这个构造函数，我们确保每当定义一个新的枚举常量时，也会定义一个同名的常量。否则，在初始化枚举时会抛出错误。**这将确保从枚举到Constants的1:1映射。**

此外，如果我们想确保更严格的双向1:1映射，我们可以编写以下单元测试：

```
@Test
public void testEnumAndConstantsSync() {
    Set```<String>``` enumValues = getEnumNames();
    List```<String>``` constantValues = getConstantValues();
    Set```<String>``` uniqueConstantValues = constantValues.stream().distinct().collect(Collectors.toSet());
    assertEquals(constantValues.size(), uniqueConstantValues.size());
    assertEquals(enumValues, uniqueConstantValues);
}
```

在这个单元测试中，我们首先获取所有枚举名称作为一个_Set_。然后，使用反射，我们获取所有公共_String_常量的值。最后，作为最后一步，我们确保没有同名的常量，并且枚举和常量之间有完全的1:1映射。

最后，让我们使用_ExtendedRequestContentType_：

```
class DataController {
    static final String EXTENDED_REQUEST_TYPE = ExtendedRequestContentType.Constants.XML_VALUE;

    @PostRequest(extendedContentType = EXTENDED_REQUEST_TYPE)
    String createData() {
        // ...
    }

    @PutRequest(extendedContentType = EXTENDED_REQUEST_TYPE)
    String updateData() {
        // ...
    }
}
```

### 5.3. 比较替代方案

正如我们所看到的，两种替代方案都使用除了枚举之外的数据类型来将值传递给注解。这是必要的，以便将此值分配给_DataController_类中的另一个常量，并在注解之间共享。

两者之间的主要区别在于，在模拟枚举的选项中，我们完全放弃了使用枚举，而在第二个选项中，我们仍然保持使用枚举，并确保与定义的常量1:1映射。

如果我们在应用程序的其他部分也使用枚举及其功能，那么保持枚举和内容同步的开销就完全有意义了。如果我们这样做，那么实现一个实用方法来从常量映射到枚举值可能非常有用：

```
static ExtendedRequestContentType toEnum(String constant) {
    return Arrays.stream(ExtendedRequestContentType.values())
      .filter(contentType -> contentType.name().equals(constant))
      .findFirst()
      .orElseThrow(IllegalArgumentException::new);
}
```

**作为底线，如果在应用程序的其他部分也需要使用枚举，请选择第二种替代方案；否则，将枚举交换为常量值。**

## 6. 结论

在本教程中，**我们学习了Java在从常量向注解提供枚举值方面的限制，并探索了我们的替代方案。**我们首先查看了这个需求有用的用例，然后深入研究了语言的限制。最后，我们实现了两种不同的替代方案，并探讨了它们的差异。

如常，本文的完整实现可以在GitHub上找到。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。

OK