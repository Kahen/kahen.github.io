---
date: 2024-06-16
category:
  - Spring
  - Java
tag:
  - Jackson
  - JSON
  - Collection
---
# Jackson JsonNode 转换为类型化集合 | Baeldung这篇文章是关于如何将Jackson的原始数据类型JsonNode转换为Java类型集合的。我们可以利用JsonNode本身来读取JSON，但将其转换为Java集合可能更有益处。Java集合比原始JSON数据提供的优势包括类型安全性、更快的处理速度以及更多类型特定的操作。

### 2. 示例设置

在我们的代码示例中，我们将探索将JsonNode转换为List或Map对象的不同方法。让我们设置我们示例的基础构件。

#### 2.1. 依赖性
首先，让我们在pom.xml文件中添加Jackson核心依赖性：

```
`<dependency>`
    `<groupId>`com.fasterxml.jackson.core`</groupId>`
    `<artifactId>`jackson-core`</artifactId>`
    `<version>`2.17.0`</version>`
`</dependency>`
```

#### 2.2. JSON数据
接下来，让我们定义我们的用例JSON：

```json
{
    "persons": [
        {
            "name": "John",
            "age": 30
        },
        {
            "name": "Alice",
            "age": 25
        }
    ],
    "idToPerson": {
        "1234": {
            "name": "John",
            "age": 30
        },
        "1235": {
            "name": "Alice",
            "age": 25
        }
    }
}
```

在上面的JSON中，我们有一个JSON数组persons和一个JSON对象idToPerson。我们将探讨将它们转换为Java集合的方法。

#### 2.3. 数据传输对象(DTO)
让我们定义一个Person类，我们可以在示例中使用它：

```java
public class Person {
    private String name;
    private int age;

    // 构造函数/getter/setter
}
```

#### 2.4. 将JSON字符串转换为JsonNode
如果我们想从整个JSON中读取一个对象，我们可以使用Jackson的ObjectMapper类来这样做：

```java
JsonNode rootNode = new ObjectMapper().readTree(jsonString);
JsonNode childNode = rootNode.get("persons");
```

要将整个JSON转换为JsonNode对象，我们使用readTree()方法。然后我们使用get()方法遍历JsonNode对象，该方法返回具有指定名称的嵌套对象。

## 3. 手动转换

在检查库方法之前，让我们看看如何手动将JsonNode转换为集合。

### 3.1. 手动将JsonNode转换为List
要将JsonNode转换为列表，我们可以逐个遍历它并用它创建一个List对象：

```java
List``````````<Person>`````````` manualJsonNodeToList(JsonNode personsNode) {
    List``````````<Person>`````````` people = new ArrayList<>();
    for (JsonNode node : personsNode) {
        Person person = new Person(node.get("name").asText(), node.get("age").asInt());
        people.add(person);
    }

    return people;
}
```

在这里，我们使用一个循环来遍历输入节点的所有子节点。这只有在我们的输入节点是数组时才可能。

对于每个节点，我们创建一个Person对象并将其添加到列表中。我们使用get(fieldName)方法从节点中获取name和age。JsonNode提供了多种方法将返回的值转换为原始Java类型。在这里，asText()和asInt()方法分别将值转换为String和int。

### 3.2. 手动将JsonNode转换为Map
让我们看看地图的类似转换：

```java
Map````<String, Person>```` manualJsonNodeToMap(JsonNode idToPersonsNode) {
    Map````<String, Person>```` mapOfIdToPerson = new HashMap<>();
    idToPersonsNode.fields()
        .forEachRemaining(node -> mapOfIdToPerson.put(node.getKey(),
            new Person(node.getValue().get("name").asText(), node.getValue().get("age").asInt())));

    return mapOfIdToPerson;
}
```

在这里，我们使用fields()方法迭代地图条目。它返回一个Iterator`<Map.Entry<String, JsonNode>`>对象，我们可以进一步处理。接下来，我们读取每个条目并将其放入我们的Map中。

## 4. 使用Jackson的readValue()和convertValue()

Jackson提供了多种将JsonNode转换为Java对象的方法。让我们看看其中的两个。

### 4.1. 使用readValue()
readValue()方法可以使用TypeReference转换为List或Map：

```java
List``````````<Person>`````````` readValueJsonNodeToList(JsonNode personsNode) throws IOException {
    TypeReference<List``````````<Person>``````````> typeReferenceList = new TypeReference<List``````````<Person>``````````>() {};
    return new ObjectMapper().readValue(personsNode.traverse(), typeReferenceList);
}

Map````<String, Person>```` readValueJsonNodeToMap(JsonNode idToPersonsNode) throws IOException {
    TypeReference<Map````<String, Person>````> typeReferenceMap = new TypeReference<Map````<String, Person>````>() {};
    return new ObjectMapper().readValue(idToPersonsNode.traverse(), typeReferenceMap);
}
```

首先，我们通过传递我们需要转换到的确切类型来创建TypeReference对象。然后我们调用readValue()方法，其中JsonParser由jsonNode.traverse()提供。使用解析器，它根据我们提供的TypeReference将节点反序列化为列表或映射。

### 4.2. 使用convertValue()
同样，我们可以使用convertValue()方法：

```java
List``````````<Person>`````````` convertValueJsonNodeToList(JsonNode personsNode) {
    TypeReference<List``````````<Person>``````````> typeReferenceList = new TypeReference<List``````````<Person>``````````>() {};
    return new ObjectMapper().convertValue(personsNode, typeReferenceList);
}

Map````<String, Person>```` convertValueJsonNodeToMap(JsonNode idToPersonsNode) {
    TypeReference<Map````<String, Person>````> typeReferenceMap = new TypeReference<Map````<String, Person>````>() {};
    return new ObjectMapper().convertValue(idToPersonsNode, typeReferenceMap);
}
```

convertValue()方法通过首先序列化输入对象，然后将其反序列化为所需类型来工作。因此，它可以更灵活地用于从一个对象转换到另一个对象。例如，我们也可以使用它进行从Java对象到JsonNode的反向比较。

## 5. 自定义反序列化器

我们也可以提供一个自定义的反序列化器来执行转换。让我们看看我们如何定义一个：

```java
public class CustomPersonListDeserializer extends JsonDeserializer<List``````````<Person>``````````> {
    @Override
    public List``````````<Person>`````````` deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        ObjectMapper objectMapper = (ObjectMapper) p.getCodec();
        List``````````<Person>`````````` personList = new ArrayList<>();
        JsonNode personsNode = objectMapper.readTree(p);
        for (JsonNode node : personsNode) {
            personList.add(objectMapper.readValue(node.traverse(), Person.class));
        }

        return personList;
    }
}
```

让我们看看代码的一些重要部分：

- 首先，这个类扩展了Jackson的JsonDeserializer。
- 然后，我们覆盖了deserialize()方法并提供了我们的实现。
- 在实现中，我们从JsonParser对象中获取ObjectMapper。
- objectMapper.readTree()将解析器表示的整个树转换为JsonNode实例。
- 最后，类似于手动转换，我们通过循环遍历节点将JSON数组中的每个节点转换为Person对象。

反序列化器与其他方法类似，但它可以提供关注点的分离。此外，自定义反序列化器提供了灵活性，因为我们可以很容易地在调用代码中切换反序列化器。

我们将在下一部分中看到如何使用反序列化器。

## 6. 测试

现在我们已经准备好了不同的方法，让我们编写一些测试来验证它们。

### 6.1. 设置

让我们设置我们的测试类：

```java
public class JsonNodeToCollectionUnitTest {

    public static String jsonString = "{\"persons\":[{\"name\":\"John\",\"age\":30},{\"name\":\"Alice\",\"age\":25}],\"idToPerson\":{\"1234\":{\"name\":\"John\",\"age\":30},\"1235\":{\"name\":\"Alice\",\"age\":25}}}";

    static JsonNode completeJson;
    static JsonNode personsNode;
    static JsonNode idToPersonNode;

    @BeforeAll
    static void setup() throws JsonProcessingException {
        completeJson = new ObjectMapper().readTree(jsonString);
        personsNode = completeJson.get("persons");
        idToPersonNode = completeJson.get("idToPerson");
    }
}
```

在这里，我们定义了一个JSON字符串，我们可以将其用作测试输入。然后，我们定义了一个setup()方法，在所有测试之前执行。它设置了我们的输入JsonNode对象。

### 6.2. 测试转换方法

接下来，让我们测试我们的转换方法：

```java
@Test
void givenJsonNode_whenConvertingToList_thenFieldsAreCorrect() throws IOException {

    List``````````<Person>`````````` personList1 = JsonNodeConversionUtil.manualJsonNodeToList(personsNode);
    List``````````<Person>`````````` personList2 = JsonNodeConversionUtil.readValueJsonNodeToList(personsNode);
    List``````````<Person>`````````` personList3 = JsonNodeConversionUtil.convertValueJsonNodeToList(personsNode);

    validateList(personList1);
    validateList(personList2);
    validateList(personList3);
}

private void validateList(List``````````<Person>`````````` personList) {
    assertEquals(2, personList.size());

    Person person1 = personList.get(0);
    assertEquals("John", person1.getName());
    assertEquals(30, person1.getAge());

    Person person2 = personList.get(1);
    assertEquals("Alice", person2.getName());
    assertEquals(25, person2