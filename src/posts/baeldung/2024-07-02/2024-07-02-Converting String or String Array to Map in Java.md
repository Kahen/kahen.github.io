---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java
  - Map
  - String
head:
  - - meta
    - name: keywords
      content: Java, Map, String, Conversion, Programming
---
# Java中将字符串或字符串数组转换为Map的方法

处理基于键值对的数据是在各种Java应用程序中常见的需求。通常，数据以字符串或字符串数组的形式到达，将其转换为Map进行高效处理变得至关重要。在相同的背景下，Map提供了一种通过键值对访问和操作数据的便捷方式，使它们成为这些场景的强大数据结构。

在本文中，我们将探讨将字符串和字符串数组转换为Map的不同技术。我们还将讨论在将字符串数组转换为具有列表值的Map时如何处理重复键。此外，为了确保我们实现的正确性。

当我们有一个包含键值对的字符串时，我们可以将其转换为Map。字符串中的键值对必须由分隔符分隔，这可以是任何字符，例如逗号、分号或等号。

让我们看以下示例：

```java
public Map````````<String, String>```````` convertStringToMap(String data) {
    Map````````<String, String>```````` map = new HashMap<>();
    StringTokenizer tokenizer = new StringTokenizer(data, " ");
    while (tokenizer.hasMoreTokens()) {
        String token = tokenizer.nextToken();
        String[] keyValue = token.split("=");
        map.put(keyValue[0], keyValue[1]);
    }
    return map;
}
```

在这种方法中，我们使用StringTokenizer()通过分隔符（此例中为逗号）拆分字符串，然后使用split("=")提取键和值。结果的键值对被添加到Map中。请注意，我们修剪了token以去除任何前导或尾随空格。

现在，我们将测试convertStringToMap()方法，该方法采用包含键值对的字符串并将其转换为Map，如下所示：

```java
@Test
public void given_StringWithKeyValuePairs_whenUsing_convertStringToMap_thenMapCreated() {
    String data = "name=John age=30 city=NewYork";
    Map````````<String, String>```````` expectedMap = new HashMap<>();
    expectedMap.put("name", "John");
    expectedMap.put("age", "30");
    expectedMap.put("city", "NewYork");
    Map````````<String, String>```````` resultMap = convertStringToMap(data);
    assertEquals(expectedMap, resultMap);
}
```

这个测试方法首先定义了一个示例输入数据，这是一个用空格分隔的包含键值对的字符串。然后，它创建了一个expectedMap，代表转换后期望的输出。

测试继续通过调用convertStringToMap(data)方法来获得resultMap中的实际结果。最后，使用assertEquals()方法比较expectedMap和resultMap，以确保转换正确执行，并且输出Map与期望的匹配。

### 3. 将字符串数组转换为Map

如果我们有一个字符串数组，其中每个元素表示一个键值对，我们可以将其转换为Map：

```java
public Map````````<String, String>```````` convertStringArrayToMap(String[] data) {
    Map````````<String, String>```````` map = new HashMap<>();
    for (String keyValue : data) {
        String[] parts = keyValue.split("=");
        map.put(parts[0], parts[1]);
    }
    return map;
}
```

在这种方法中，我们遍历字符串数组，并将每个元素拆分为键和值。接下来，将结果的键值对添加到Map中。

以下测试方法用于验证convertStringArrayToMap()方法：

```java
@Test
public void given_StringArrayWithKeyValuePairs_whenUsing_convertStringArrayToMap_thenMapCreated() {
    String[] data = {"name=John", "age=30", "city=NewYork"};
    Map````````<String, String>```````` expectedMap = new HashMap<>();
    expectedMap.put("name", "John");
    expectedMap.put("age", "30");
    expectedMap.put("city", "NewYork");
    Map````````<String, String>```````` resultMap = convertStringArrayToMap(data);
    assertEquals(expectedMap, resultMap);
}
```

测试方法通过创建一个包含键值对的字符串数组来准备示例输入。然后，它生成一个expectedMap来表示转换后的期望输出。

此外，它调用convertStringArrayToMap(data)方法来获取resultMap中的实际结果。最后，测试使用assertEquals()确保转换正确，并且输出Map与期望的匹配。

### 4. 处理重复键

**在某些情况下，字符串数组可能包含重复的键，我们可能需要在Map中存储与每个键关联的多个值。** 为了实现这一点，我们可以使用具有值列表的Map，如下所示：

```java
public Map``<String, List``<String>````> convertStringArrayToMapWithDuplicates(String[] data) {
    Map``<String, List``<String>````> map = new HashMap<>();
    for (String keyValue : data) {
        String[] parts = keyValue.split("=");
        String key = parts[0];
        String value = parts[1];

        if (map.containsKey(key)) {
            List``<String>`` valuesList = map.get(key);
            valuesList.add(value);
        } else {
            List``<String>`` valuesList = new ArrayList<>();
            valuesList.add(value);
            map.put(key, valuesList);
        }
    }
    return map;
}
```

在这种方法中，我们检查Map中是否已经存在键。如果存在，我们检索现有的值列表，并将新值追加到其中。否则，我们使用包含值的新列表在Map中创建一个新的条目。

以下测试方法旨在测试convertStringArrayToMapWithDuplicates()：

```java
@Test
public void given_StringArrayWithKeyValuePairsWithDuplicates_whenUsing_convertStringArrayToMapWithDuplicates_thenMapCreatedWithLists() {
    String[] data = {"name=John", "age=30", "city=NewYork", "age=31"};
    Map``<String, List``<String>````> expectedMap = new HashMap<>();
    expectedMap.put("name", Collections.singletonList("John"));
    expectedMap.put("age", Arrays.asList("30", "31"));
    expectedMap.put("city", Collections.singletonList("NewYork"));
    Map``<String, List``<String>````> resultMap = convertStringArrayToMapWithDuplicates(data);
    assertEquals(expectedMap, resultMap);
}
```

测试方法定义了一个包含一些重复键的示例输入数据。然后，它创建了一个expectedMap，代表转换后的期望输出。expectedMap包括输入数据中重复键的值列表。

测试通过调用convertStringArrayToMapWithDuplicates(data)方法来获得resultMap中的实际结果。最后，使用assertEquals()方法比较expectedMap和resultMap，以确保转换正确执行，并且输出的带有值列表的Map与期望的匹配。

### 5. 结论

在本文中，我们探讨了在Java中将字符串和字符串数组转换为Map的不同技术。我们涵盖了基本转换、处理重复键，并提供了JUnit测试示例以确保实现的正确性。

通过了解这些转换技术，我们可以有效地处理Java应用程序中的基于键值的数据。记得根据我们项目的具体要求选择适当的转换方法。

如常，本文的完整代码示例可以在GitHub上找到。