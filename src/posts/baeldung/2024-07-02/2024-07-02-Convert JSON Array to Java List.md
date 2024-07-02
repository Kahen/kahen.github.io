---
date: 2024-07-02
category:
  - Java
  - JSON
tag:
  - Gson
  - Jackson
head:
  - - meta
    - name: keywords
      content: Java, JSON, List, Gson, Jackson
---
# 将 JSON 数组转换为 Java 列表 | Baeldung

## 1. 引言

JSON 是一种流行的数据交换格式，用于在服务器和客户端之间传输数据。然而，在许多情况下，我们可能需要将 JSON 数组转换为 Java _List_ 对象，以便进一步处理或数据操作。

在本教程中，我们将比较使用 Java 中两个流行的 JSON 库 - Gson 和 Jackson 来实现这种转换的不同方法。

## 2. 使用 Gson 库

Gson 是一个广泛使用的 JSON 库，用于将 Java 对象序列化和反序列化到 JSON。它提供了一个简单的方法来将 JSON 数组转换为 _List_ 对象。

### 2.1. Gson Maven 依赖

我们需要将 Gson 库添加到项目依赖中：

```xml
``<dependency>``
    ``<groupId>``com.google.code.gson``</groupId>``
    ``<artifactId>``gson``</artifactId>``
    ``<version>``2.10.1``</version>``
``</dependency>``
```

### 2.2. 将 JSON 数组转换为 Java _List_

在本节中，我们将讨论如何使用 Gson 将 JSON 数组转换为 _List_。

让我们考虑一个 JSON 数组的示例：

```json
[
  {"id":1,"name":"Icecream","description":"Sweet and cold"},
  {"id":2,"name":"Apple","description":"Red and sweet"},
  {"id":3,"name":"Carrot","description":"Good for eyes"}
]
```

上述 JSON 数组表示 _Product_ 类的 _List_：

```java
public class Product {
    private int id;
    private String name;
    private String description;

    public Product(int id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
    // getter 和 setter
}
```

现在我们有了 JSON 数组，让我们尝试理解将其转换为 _List_：

```java
@Test
public void whenUsingGsonLibrary_thenCompareTwoProducts() {
    Gson gson = new Gson();
    Type listType = new TypeToken`<List````<Product>`````>() {}.getType();

    List````<Product>```` gsonList = gson.fromJson(jsonArray, listType);
    Assert.assertEquals(1, gsonList.get(0).getId());
    Assert.assertEquals("Sweet and cold", gsonList.get(0).getDescription());
    Assert.assertEquals("Icecream", gsonList.get(0).getName());
}
```

首先，我们需要创建 _Gson_ 类的实例，它提供了 JSON 序列化和反序列化的方法。

我们可以使用 _TypeToken_ 类来指定目标 _List_ 的类型。在上面的例子中，我们定义了目标类型为 _List````<Product>````_。

然后，我们使用 _Gson_ 对象的 _fromJson()_ 方法将 JSON 数组 _String_ 转换为 _List_。

由于我们已经将 JSON 数组转换为 _List_，让我们也尝试分析断言。在断言中，我们正在比较 _String_ JSON 数组中的特定字段，如 ID 或描述，与转换后的 _gsonList_，它表示 _Product_ 类的 _List_。

## 3. 使用 Jackson 库

Jackson 是 Java 的另一个广泛使用的 JSON 库。在本节中，我们将讨论如何使用 Jackson 库将 JSON 数组转换为 _List_。

### 3.1. Jackson Maven 依赖

我们需要将下面的 Jackson 库添加到项目依赖中：

```xml
``<dependency>``
    ``<groupId>``com.fasterxml.jackson.core``</groupId>``
    ``<artifactId>``jackson-databind``</artifactId>``
    ``<version>``2.15.2``</version>``
``</dependency>``
```

### 3.2. 将 JSON 数组转换为 Java _List_

在本节中，我们将讨论如何使用 Jackson 将 JSON 数组转换为 _List_：

```java
@Test
public void whenUsingJacksonLibrary_thenCompareTwoProducts() throws JsonProcessingException {

    // jsonArray 是上面示例中的相同 JSON 数组
    ObjectMapper objectMapper = new ObjectMapper();
    TypeReference`<List````<Product>`````> jacksonTypeReference = new TypeReference`<List````<Product>`````>() {};

    List````<Product>```` jacksonList = objectMapper.readValue(jsonArray, jacksonTypeReference);
    Assert.assertEquals(1, jacksonList.get(0).getId());
    Assert.assertEquals("Sweet and cold", jacksonList.get(0).getDescription());
    Assert.assertEquals("Icecream", jacksonList.get(0).getName());
}
```

我们创建了 _ObjectMapper_ 类的实例，它是 Jackson 库中用于数据操作的核心类。

我们可以使用 _TypeReference_ 类来指定目标 _List_ 的类型。在上面的例子中，我们定义了目标类型为 _List````<Product>````_。

然后，我们使用 _ObjectMapper_ 对象的 _readValue()_ 方法将 JSON 数组 _String_ 转换为 _List_。

与之前讨论的断言类似，最后我们比较 _String_ JSON 数组中的特定字段与 _jacksonList_ 对应字段。

## 4. 结论

在本文中，我们讨论了如何使用两个流行的库：Gson 和 Jackson 将 JSON 数组转换为 Java _List_。

Gson 提供了一种直接的方法，而 Jackson 提供了高级功能和高性能。选择 Gson 还是 Jackson 取决于具体的项目需求和偏好。

如往常一样，示例中使用的代码片段可以在 GitHub 上找到。