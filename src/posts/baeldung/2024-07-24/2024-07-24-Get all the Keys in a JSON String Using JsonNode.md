---
date: 2022-04-01
category:
  - Java
  - JSON
tag:
  - Jackson
  - JsonNode
head:
  - - meta
    - name: keywords
      content: Java, JSON, JsonNode, Jackson, 教程
---
# 使用JsonNode从JSON字符串中获取所有键

在本教程中，我们将探索使用_JsonNode_从JSON中提取所有嵌套键的不同方法。我们的目标是遍历一个JSON字符串并收集键名称到一个列表中。

### 1. 概述

Jackson库使用树模型来表示JSON数据。树模型为我们提供了一种有效的方式来与层次结构化的数据交互。

### 2. 引言

JSON对象在树模型中表示为节点。这使得对JSON内容执行CRUD操作变得更加容易。

#### 2.1 _ObjectMapper_

我们使用_ObjectMapper_类的方法来读取JSON内容。_ObjectMapper.readTree()_方法反序列化JSON并构建_JsonNode_实例的树。它以JSON源作为输入，并返回创建的树模型的根节点。然后，我们可以使用根节点遍历整个JSON树。

#### 2.2 _JsonNode_

_JsonNode_类表示JSON树模型中的一个节点。它可以以以下数据类型表达JSON数据：_Array, Binary, Boolean, Missing, Null, Number, Object, POJO, String._ 这些数据类型在_JsonNodeType_枚举中定义。

### 3. 从JSON中获取键

本文中我们使用以下JSON作为输入：

```json
{
  "Name": "Craig",
  "Age": 10,
  "BookInterests": [
    {
      "Book": "The Kite Runner",
      "Author": "Khaled Hosseini"
    },
    {
      "Book": "Harry Potter",
      "Author": "J. K. Rowling"
    }
  ],
  "FoodInterests": {
    "Breakfast": [
      {
        "Bread": "Whole wheat",
        "Beverage": "Fruit juice"
      },
      {
        "Sandwich": "Vegetable Sandwich",
        "Beverage": "Coffee"
      }
    ]
  }
}
```

### 4. 结论

在本文中，我们学习了从JSON内容中读取键名称的不同方法。因此，我们可以扩展在文章中讨论的遍历逻辑，以执行对JSON元素所需的其他操作。

如往常一样，示例的完整源代码可以在GitHub上找到。