---
date: 2024-06-20
category:
  - Java
  - JSON
tag:
  - JSON Serialization
  - Null Values
head:
  - - meta
    - name: keywords
      content: Java, JSON, Serialization, Null Values
---
# 在Java JSON序列化中包含空值

当我们使用Java对象并需要将其转换为JSON格式时，适当处理空值非常重要。从JSON输出中省略空值可能不符合我们的数据需求，特别是当数据完整性至关重要时。

**在本教程中，我们将深入探讨在Java中进行JSON序列化时包含空值的有效方法。**

## 2. 使用案例场景：客户管理系统

假设我们正在开发一个客户管理系统，其中每个客户都是一个具有名称、电子邮件和年龄等属性的Java对象。此外，一些客户可能没有电子邮件地址。

**在将客户数据序列化为JSON进行存储或传输时，包含缺失电子邮件地址的空值对于保持数据一致性至关重要。**

为了完整性，让我们定义我们示例中使用的_Customer_类：

```
public class Customer {
    @JsonProperty
    private final String name;
    @JsonProperty
    private final String address;
    @JsonProperty
    private final int age;

    public Customer(String name, String address, int age) {
        this.name = name;
        this.address = address;
        this.age = age;
    }

    // ...
}
```

这里，我们定义了_Customer_类，其中包括名称、地址和年龄字段，这些字段通过构造方法初始化。_toString()_方法还提供了对象的JSON格式字符串表示，便于调试。

**请注意，包括_@JsonProperty_注解确保所有相关字段都被准确序列化到JSON输出中，包括适用时的空值。**

## 3. 使用Jackson库

Jackson是一个著名的Java JSON处理库，默认情况下通常会从JSON输出中排除空值。然而，我们可以利用Jackson的注解明确地包含空值：

```
String expectedJson = "{\\\"name\\\":\\\"John\\\",\\\"address\\\":null,\\\"age\\\":25}";
Customer obj = new Customer("John", null, 25);

@Test
public void givenObjectWithNullField_whenJacksonUsed_thenIncludesNullValue() throws JsonProcessingException {
    ObjectMapper mapper = new ObjectMapper();
    mapper.setSerializationInclusion(JsonInclude.Include.ALWAYS);
    String json = mapper.writeValueAsString(obj);
    assertEquals(expectedJson, json);
}
```

在这种方法中，我们首先建立_expectedJson_字符串。随后，我们实例化一个_Customer_对象，其值为_John_、_null_和_25_。

**接下来，我们通过调用_setSerializationInclusion()_方法并使用参数_JsonInclude.Include.ALWAYS_来配置_ObjectMapper_实例，在序列化过程中始终包含空值。**这种精心设置确保即使地址是_null_，它也能在生成的JSON输出中被准确表示。

最后，我们使用_assertEquals()_方法来验证_json_字符串是否与_expectedJson_匹配。

## 4. 使用Gson库

Gson是另一个可用于Java JSON序列化和反序列化的库。它提供了类似的选项来明确包含空值。让我们看一个例子：

```
@Test
public void givenObjectWithNullField_whenGsonUsed_thenIncludesNullValue() {
    Gson gson = new GsonBuilder().serializeNulls().create();
    String json = gson.toJson(obj);
    assertEquals(expectedJson, json);
}
```

**在这里，我们使用_GsonBuilder_设置一个_Gson_实例，使用_serializeNulls()_方法。这种配置确保在序列化过程中包含空值，确保即使地址字段是_null_，在生成的JSON输出中也能精确表示。**

## 5. 结论

总之，在处理Java对象并将其转换为JSON格式时，适当处理空值非常重要。

在本教程中，我们学习了如何在JSON序列化过程中做到这一点。

如常，示例的源代码可以在GitHub上找到。