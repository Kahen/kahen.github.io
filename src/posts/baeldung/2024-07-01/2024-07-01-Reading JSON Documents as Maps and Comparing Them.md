---
date: 2022-04-01
category:
  - Java
  - JSON
tag:
  - JSON
  - Java
  - Maps
  - Comparison
head:
  - - meta
    - name: keywords
      content: Java, JSON, Maps, Comparison, Baeldung
---
# 阅读JSON文档为Map并比较它们

在本教程中，我们将探讨将JSON文档读取为Map的不同方式以及比较它们。我们还将探讨查找两个Map之间差异的方法。

## 2. 转换为Map
首先，我们将探讨将JSON文档转换为Map的不同方式。让我们看看我们将用于测试的JSON对象。

让我们创建一个名为_first.json_的文件，内容如下：

```json
{
  "name": "John",
  "age": 30,
  "cars": [
    "Ford",
    "BMW"
  ],
  "address": {
    "street": "Second Street",
    "city": "New York"
  },
  "children": [
    {
      "name": "Sara",
      "age": 5
    },
    {
      "name": "Alex",
      "age": 3
    }
  ]
}
```

类似地，让我们创建另一个名为_second.json_的文件，内容如下：

```json
{
  "name": "John",
  "age": 30,
  "cars": [
    "Ford",
    "Audi"
  ],
  "address": {
    "street": "Main Street",
    "city": "New York"
  },
  "children": [
    {
      "name": "Peter",
      "age": 5
    },
    {
      "name": "Cathy",
      "age": 10
    }
  ]
}
```

正如我们所看到的，上面的JSON文档之间有两个差异：

- _cars_数组的值不同
- _address_对象中的_street_键的值不同
- _children_数组有多个差异

### 2.1. 使用Jackson
Jackson是一个用于JSON操作的流行库。我们可以使用Jackson将JSON转换为Map。

首先，我们添加Jackson依赖项：

```xml
```<dependency>```
    ```<groupId>```com.fasterxml.jackson.core```</groupId>```
    ```<artifactId>```jackson-databind```</artifactId>```
    ```<version>```2.15.2```</version>```
```</dependency>```
```

现在我们可以使用Jackson将JSON文档转换为Map：

```java
class JsonUtils {
    public static Map`````````````<String, Object>````````````` jsonFileToMap(String path) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(new File(path), new TypeReference<Map`````````````<String, Object>`````````````>() {});
    }
}
```

在这里，我们使用_ObjectMapper_类的_readValue()_方法将JSON文档转换为Map。它将JSON文档作为_File_对象和_TypeReference_对象作为参数。

### 2.2. 使用Gson
同样，我们也可以使用方法Gson将JSON文档转换为Map。我们需要为此包含依赖项：

```xml
```<dependency>```
    ```<groupId>```com.google.code.gson```</groupId>```
    ```<artifactId>```gson```</artifactId>```
    ```<version>```2.10.1```</version>```
```</dependency>```
```

现在让我们看看将JSON转换的代码：

```java
public static Map`````````````<String, Object>````````````` jsonFileToMapGson(String path) throws IOException {
    Gson gson = new Gson();
    return gson.fromJson(new FileReader(path), new TypeToken<Map`````````````<String, Object>`````````````>() {}.getType());
}
```

在这里，我们使用_Gson_类的_fromJson()_方法将JSON文档转换为Map。它将JSON文档作为_FileReader_对象和_TypeToken_对象作为参数。

现在我们已经将JSON文档转换为Map，让我们看看比较它们的方法。

### 3.1. 使用Guava的Map.difference()
Guava提供了一个_Maps.difference()_方法，可以用来比较两个Map。要使用这个，让我们将Guava依赖项添加到我们的项目中：

```xml
```<dependency>```
    ```<groupId>```com.google.guava```</groupId>```
    ```<artifactId>```guava```</artifactId>```
    ```<version>```33.2.1-jre```</version>```
```</dependency>```
```

现在，让我们看看比较Map的代码：

```java
@Test
void givenTwoJsonFiles_whenCompared_thenTheyAreDifferent() throws IOException {
    Map`````````````<String, Object>````````````` firstMap = JsonUtils.jsonFileToMap("src/test/resources/first.json");
    Map`````````````<String, Object>````````````` secondMap = JsonUtils.jsonFileToMap("src/test/resources/second.json");

    MapDifference`````````````<String, Object>````````````` difference = Maps.difference(firstFlatMap, secondFlatMap);
    difference.entriesDiffering().forEach((key, value) -> {
        System.out.println(key + ": " + value.leftValue() + " - " + value.rightValue());
    });
    assertThat(difference.areEqual()).isFalse();
}
```

**Guava只能比较Map的一级。这对我们的情况不起作用，因为我们有一个嵌套的Map。**

让我们看看我们如何比较我们的嵌套Map。我们使用_entriesDiffering()_方法来获取Map之间的差异。这返回一个差异的Map，其中键是值的路径，值是一个_MapDifference.ValueDifference_对象。这个对象包含了两个Map的值。如果我们运行测试，我们将看到Map之间不同的键和它们的值：

```
cars: [Ford, BMW] - [Ford, Audi]
address: {street=Second Street, city=New York} - {street=Main Street, city=New York}
children: [{name=Sara, age=5}, {name=Alex, age=3}] - [{name=Peter, age=5}, {name=Cathy, age=10}]
```

正如我们所看到的，这显示了_cars, address_和_children_字段是不同的，并且列出了差异。然而，这并没有指出导致这些差异的嵌套字段。例如，它没有指出_address_对象中的_street_字段是不同的。

### 3.2. 扁平化Map
为了精确指出嵌套Map之间的差异，我们将扁平化Map，以便每个键都是值的路径。例如，_address_对象中的_street_键将被扁平化为_address.street_等。

让我们看看这个的代码：

```java
class FlattenUtils {
    public static Map`````````````<String, Object>````````````` flatten(Map`````````````<String, Object>````````````` map) {
        return flatten(map, null);
    }

    private static Map`````````````<String, Object>````````````` flatten(Map`````````````<String, Object>````````````` map, String prefix) {
        Map`````````````<String, Object>````````````` flatMap = new HashMap<>();
        map.forEach((key, value) -> {
            String newKey = prefix != null ? prefix + "." + key : key;
            if (value instanceof Map) {
                flatMap.putAll(flatten((Map`````````````<String, Object>`````````````) value, newKey));
            } else if (value instanceof List) {
                // 检查原始列表
                Object element = ((List`<?>`) value).get(0);
                if (element instanceof String || element instanceof Number || element instanceof Boolean) {
                    flatMap.put(newKey, value);
                } else {
                    // 检查对象列表
                    List<Map`````````````<String, Object>`````````````> list = (List<Map`````````````<String, Object>`````````````>) value;
                    for (int i = 0; i < list.size(); i++) {
                        flatMap.putAll(flatten(list.get(i), newKey + "[" + i + "]"));
                    }
                }
            } else {
                flatMap.put(newKey, value);
            }
        });
        return flatMap;
    }
}
```

在这里，我们使用递归来扁平化Map。对于任何字段，以下条件之一将为真：

- 值可能是一个_Map_（嵌套的JSON对象）。在这种情况下，我们将使用值作为参数递归调用_flatten()_方法。例如，_address_对象将被扁平化为_address.street_和_address.city_。
- 接下来，我们可以检查值是否是_List_（JSON数组）。如果列表包含原始值，我们将将键和值添加到扁平化的Map中。
- 如果列表包含对象，我们将使用每个对象作为参数递归调用_flatten()_方法。例如，_children_数组将被扁平化为_children[0].name_, _children[0].age_, _children[1].name_和_children[1].age_。
- 如果值既不是_Map_也不是_List_，我们将将键和值添加到扁平化的Map中。

这将是递归的，直到我们达到Map的最后一级。此时，我们将有一个扁平化的Map，其中每个键都是值的路径。

### 3.3. 测试
现在我们已经扁平化了Map，让我们看看我们如何使用_Maps.difference()_来比较它们：

```java
@Test
void givenTwoJsonFiles_whenCompared_thenTheyAreDifferent() throws IOException {
    Map`````````````<String, Object>````````````` firstFlatMap = FlattenUtils.flatten(JsonUtils.jsonFileToMap("src/test/resources/first.json"));
    Map`````````````<String, Object>````````````` secondFlatMap = FlattenUtils.flatten(JsonUtils.jsonFileToMap("src/test/resources/second.json"));

    MapDifference`````````````<String, Object>````````````` difference = Maps.difference(firstFlatMap, secondFlatMap);
    difference.entriesDiffering().forEach((key, value) -> {
        System.out.println(key + ": " + value.leftValue() + " -