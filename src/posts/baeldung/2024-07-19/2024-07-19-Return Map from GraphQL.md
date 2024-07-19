---
date: 2022-04-06
category:
  - Java
  - GraphQL
tag:
  - GraphQL
  - Java
head:
  - - meta
    - name: keywords
      content: GraphQL, Java, Map, JSON, Custom Scalar Type
---

# GraphQL 查询中返回 Map 的方法

## 1. 概述

多年来，GraphQL 已被广泛接受为 Web 服务通信的模式之一。尽管它在使用上丰富且灵活，但在某些场景中可能会带来挑战。其中一个挑战是从查询中返回一个 _Map_，这本身就是一个挑战，因为 _Map_ 在 GraphQL 中并不是一个类型。

在本教程中，我们将学习从 GraphQL 查询返回 _Map_ 的技术。

## 2. 示例

让我们以一个产品数据库为例，该数据库具有不确定数量的自定义属性。

作为一个数据库实体的 _Product_，可能有一些固定的字段，如 _name_、_price_、_category_ 等。但是，它也可能有因类别而异的属性。这些属性应该以一种方式返回给客户端，以便保留它们的标识键。

为此，我们可以将 _Map_ 作为这些属性的类型。

为了返回一个 Map，我们有三个选项：
- 作为 JSON _String_ 返回
- 使用 GraphQL 自定义标量类型
- 作为 _List_ 的键值对返回

对于前两个选项，我们将使用以下 GraphQL 查询：

```graphql
query {
    product(id:1){
        id
        name
        description
        attributes
    }
}
```

参数 _attributes_ 将以 _Map_ 格式表示。

接下来，让我们看看所有三个选项。

### 3.1. JSON 字符串

这是最简单的选项。我们将在 _Product_ 解析器中将 _Map_ 序列化为 JSON _String_ 格式：

```java
String attributes = objectMapper.writeValueAsString(product.getAttributes());
```

GraphQL 模式本身如下：

```graphql
type Product {
    id: ID
    name: String!
    description: String
    attributes:String
}
```

这是实施后的查询结果：

```json
{
  "data": {
    "product": {
      "id": "1",
      "name": "Product 1",
      "description": "Product 1 description",
      "attributes": "{\"size\": {\"name\": \"Large\",\"description\": \"This is custom attribute description\",\"unit\": \"This is custom attribute unit\"},\
                   \"attribute_1\": {\"name\": \"Attribute1 name\",\"description\": \"This is custom attribute description\",\"unit\": \"This is custom attribute unit\"}}"
    }
  }
}
```

这个选项有两个问题。**第一个问题是 JSON 字符串需要在客户端处理成可用格式。第二个问题是我们不能对属性进行子查询。**

为了克服第一个问题，GraphQL 自定义标量类型的第二个选项可以帮助我们。

### 3.2. GraphQL 自定义标量类型

对于实现，我们将使用 Java 中的 Extended Scalars 库来实现 GraphQL。

首先，我们将在 _pom.xml_ 中包含 graphql-java-extended-scalars 依赖项：

```xml
`<dependency>`
    `<groupId>`com.graphql-java`</groupId>`
    `<artifactId>`graphql-java-extended-scalars`</artifactId>`
    `<version>`2022-04-06T00-10-27-a70541e`</version>`
`</dependency>`
```

然后，我们将在 GraphQL 配置组件中注册我们选择的标量类型。在这种情况下，标量类型是 _JSON_：

```java
@Bean
public GraphQLScalarType json() {
    return ExtendedScalars.Json;
}
```

最后，我们将相应地更新我们的 GraphQL 模式：

```graphql
type Product {
    id: ID
    name: String!
    description: String
    attributes: JSON
}
scalar JSON
```

这是实施后的结果：

```json
{
  "data": {
    "product": {
      "id": "1",
      "name": "Product 1",
      "description": "Product 1 description",
      "attributes": {
        "size": {
          "name": "Large",
          "description": "This is custom attribute description",
          "unit": "This is a custom attribute unit"
        },
        "attribute_1": {
          "name": "Attribute1 name",
          "description": "This is custom attribute description",
          "unit": "This is a custom attribute unit"
        }
      }
    }
  }
}
```

通过这种方法，我们不需要在客户端处理属性映射。然而，标量类型也有它们自己的限制。

**在 GraphQL 中，标量类型是查询的叶子，这表明它们不能被进一步查询。**

### 3.3. 键值对列表

如果要求进一步查询 _Map_，那么这是最可行的选项。我们将 _Map_ 对象转换为键值对对象的列表。

这是我们的类，表示键值对：

```java
public class AttributeKeyValueModel {
    private String key;
    private Attribute value;

    public AttributeKeyValueModel(String key, Attribute value) {
        this.key = key;
        this.value = value;
    }
}
```

在 _Product_ 解析器中，我们将添加以下实现：

```java
List`<AttributeKeyValueModel>` attributeModelList = new LinkedList<>();
product.getAttributes().forEach((key, val) -> attributeModelList.add(new AttributeKeyValueModel(key, val)));
```

最后，我们将更新模式：

```graphql
type Product {
    id: ID
    name: String!
    description: String
    attributes:[AttributeKeyValuePair]
}
type AttributeKeyValuePair {
    key:String
    value:Attribute
}
type Attribute {
    name:String
    description:String
    unit:String
}
```

由于我们更新了模式，我们也将更新查询：

```graphql
query {
    product(id:1){
         id
         name
         description
         attributes {
             key
             value {
                 name
                 description
                 unit
             }
         }
    }
}
```

现在，让我们看看结果：

```json
{
  "data": {
    "product": {
      "id": "1",
      "name": "Product 1",
      "description": "Product 1 description",
      "attributes": [
        {
          "key": "size",
          "value": {
            "name": "Large",
            "description": "This is custom attribute description",
            "unit": "This is custom attribute unit"
          }
        },
        {
          "key": "attribute_1",
          "value": {
            "name": "Attribute1 name",
            "description": "This is custom attribute description",
            "unit": "This is custom attribute unit"
          }
        }
      ]
    }
  }
}
```

这个选项也有两个问题。GraphQL 查询变得有点复杂。而且对象结构需要硬编码。未知的 _Map_ 对象在这种情况下将无法工作。

## 4. 结论

在本文中，我们探讨了从 GraphQL 查询返回 _Map_ 对象的三种不同技术。我们讨论了每种技术的局限性。由于没有一种技术是完美的，它们必须根据需求使用。

正如往常一样，本文的示例代码可在 GitHub 上找到。