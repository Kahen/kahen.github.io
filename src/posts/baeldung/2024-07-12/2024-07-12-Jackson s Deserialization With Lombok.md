---
date: 2022-04-01
category:
  - Java
  - Jackson
tag:
  - Lombok
  - Deserialization
head:
  - - meta
    - name: keywords
      content: Java, Jackson, Lombok, Deserialization
------
# Jackson 反序列化与 Lombok

## **1. 概述**

在大多数情况下，当我们使用 Project Lombok 时，我们会想要将我们的数据类与像 Jackson 这样的 JSON 框架结合起来。这在 JSON 在大多数现代 API 和数据服务中广泛使用的情况下尤其如此。

在这个快速教程中，**我们将看看如何配置我们的 Lombok 构建器类，以便与 Jackson 无缝协作**。

## **2. 依赖**

我们开始使用的所有需要是将 _org.projectlombok_ 添加到我们的 _pom.xml_ 中：

```xml
``<dependency>``
    ``<groupId>``org.projectlombok``</groupId>``
    ``<artifactId>``lombok``</artifactId>``
    ``<version>``1.18.30``</version>``
``</dependency>``
```

当然，我们还需要 _jackson-databind_ 依赖项：

```xml
``<dependency>``
    ``<groupId>``com.fasterxml.jackson.core``</groupId>``
    ``<artifactId>``jackson-databind``</artifactId>``
    ``<version>``2.14.1``</version>``
``</dependency>``
```

## **3. 一个简单的 Fruit 领域**

让我们继续定义一个带有 id 和 name 的 Lombok 启用类来表示一个水果：

```java
@Data
@Builder
@Jacksonized
public class Fruit {
    private String name;
    private int id;
}
```

让我们浏览一下我们 POJO 的关键注释：

- 首先，我们通过向类添加 _@Data_ 注解开始 - 这会生成通常与简单 POJO 相关的所有样板代码，例如 getter 和 setter。
- 然后，我们添加 _@Builder_ 注解 - 一个使用构建者模式进行对象创建的有用机制。
- 最后也是最重要的，我们添加 _@Jacksonized_ 注解。

简要扩展一下，_@Jacksonized_ 注解是 _@Builder_ 的附加注解。**使用此注解可以让我们自动配置生成的构建者类，以与 Jackson 的反序列化一起工作**。

需要注意的是，此注解仅在同时存在 _@Builder_ 或 _@SuperBuilder_ 注解时才有效。

最后，我们应该提到，尽管 _@Jacksonized_ 在 Lombok v1.18.14 中引入，**它仍被视为一个实验性特性**。

## **4. 反序列化和序列化**

现在我们的领域模型已经定义好了，让我们继续写一个单元测试来使用 Jackson 反序列化一个水果：

```java
@Test
public void withFruitJSON_thenDeserializeSucessfully() throws IOException {
    String json = "{\"name\":\"Apple\",\"id\":101}";

    Fruit fruit = newObjectMapper().readValue(json, Fruit.class);
    assertEquals(new Fruit("Apple", 101), fruit);
}
```

_ ObjectMapper_ 的简单 _readValue()_ API 就足够了。我们可以使用它将 JSON 水果字符串反序列化为 _Fruit_ Java 对象。

同样，我们可以使用 _writeValue()_ API 将 _Fruit_ 对象序列化为 JSON 输出：

```java
@Test
void withFruitObject_thenSerializeSucessfully() throws IOException {
    Fruit fruit = Fruit.builder()
      .id(101)
      .name("Apple")
      .build();

    String json = newObjectMapper().writeValueAsString(fruit);
    assertEquals("{\"name\":\"Apple\",\"id\":101}", json);
}
```

测试显示了我们如何使用 Lombok 构建器 API 构建一个 _Fruit_，并且序列化的 Java 对象与预期的 JSON 字符串匹配。

## **5. 使用自定义构建器**

有时，我们可能需要使用自定义构建器实现，而不是 Lombok 为我们生成的那个。例如，**当我们的 bean 的属性名称与 JSON 字符串中的字段名称不同时**。

让我们想象我们要反序列化以下 JSON 字符串：

```json
{
    "id": 5,
    "name": "Bob"
}
```

但是我们的 POJO 上的属性不匹配：

```java
@Data
@Builder(builderClassName = "EmployeeBuilder")
@JsonDeserialize(builder = Employee.EmployeeBuilder.class)
@AllArgsConstructor
public class Employee {

    private int identity;
    private String firstName;

}
```

**在这种情况下，我们可以使用 _@JsonDeserialize_ 注解与 _@JsonPOJOBuilder_ 注解**，我们可以将其插入到生成的构建器类中，以覆盖 Jackson 的默认设置：

```java
@JsonPOJOBuilder(buildMethodName = "createEmployee", withPrefix = "construct")
public static class EmployeeBuilder {

    private int idValue;
    private String nameValue;

    public EmployeeBuilder constructId(int id) {
        idValue = id;
        return this;
    }

    public EmployeeBuilder constructName(String name) {
        nameValue = name;
        return this;
    }

    public Employee createEmployee() {
        return new Employee(idValue, nameValue);
    }
}
```

然后我们可以像以前一样继续写测试：

```java
@Test
public void withEmployeeJSON_thenDeserializeSucessfully() throws IOException {
    String json = "{\"id\":5,\"name\":\"Bob\"}";
    Employee employee = newObjectMapper().readValue(json, Employee.class);

    assertEquals(5, employee.getIdentity());
    assertEquals("Bob", employee.getFirstName());
}
```

结果表明，尽管属性名称不匹配，但新的 _Employee_ 数据对象已成功地从 JSON 源重新创建。

## **6. 结论**

在这篇简短的文章中，我们看到了两种简单的方法来配置我们的 Lombok 构建器类，以便与 Jackson 无缝协作。

如果没有 _@Jacksonized_ 注解，我们将不得不特别定制我们的构建器类。然而，使用 _@Jacksonized_ 让我们可以使用 Lombok 生成的构建器类。

如往常一样，文章的完整源代码可以在 GitHub 上找到。