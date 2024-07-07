---
date: 2022-04-01
category:
  - Java
  - Jackson
tag:
  - JSON
  - Deserialization
  - Generic Type
head:
  - - meta
    - name: keywords
      content: Jackson, Java, JSON, Deserialization, Generic Type
---
# 使用Jackson反序列化泛型类型

Jackson是一个流行的Java库，用于将Java对象序列化成JSON以及反之。在某些情况下，Java对象可能使用泛型类型进行定义。

在本教程中，我们将展示如何使用Jackson将JSON字符串反序列化到泛型类型。

## 2. 模型准备

对于要反序列化的给定JSON字符串：
```json
{"result":{"id":1,"firstName":"John","lastName":"Lewis"}}
```
我们需要定义一个带有泛型类型参数的类和一个常规的POJO对象来保存数据：
```java
public class JsonResponse```<T>``` {
    private T result;

    // getters and setters...
}

public class User {
    private Long id;
    private String firstName;
    private String lastName;

    // getters and setters...
}
```
在Jackson中，_ObjectMapper_提供了三组_readValue_方法用于JSON反序列化，它们接收以下参数：

- _Class```<T>```_作为参数传递信息类型
- _TypeReference_传递类型信息
- _JavaType_作为参数

我们不能使用_JsonResponse````<User>````.class_传递给第一点中的方法，因此让我们看看如何使用_TypeReference_和_JavaType_进行泛型反序列化。

### 3.1. _TypeReference_

众所周知，Java在编译期间会擦除泛型类型信息，但我们可以利用匿名内部类的力量在编译时保留类型信息。Jackson提供了抽象类_TypeReference_，以从派生子类中获取类型信息：
```java
public abstract class TypeReference```<T>``` {
    protected final Type _type;

    protected TypeReference() {
        Type superClass = this.getClass().getGenericSuperclass();
        this._type = ((ParameterizedType)superClass).getActualTypeArguments()[0];
    }
}
```
使用_TypeReference_，我们可以为泛型类型_JsonResponse````<User>````_创建一个匿名内部类，如下所示：
```java
TypeReference<JsonResponse````<User>````> typeRef = new TypeReference<JsonResponse````<User>````>() {};
```
这种方法保留泛型类型信息被称为超类型标记。通过使用超类型标记，Jackson将知道容器类型是_JsonResponse_，其类型参数是_User_。

以下是反序列化的完整测试用例：
```java
@Test
void givenJsonObject_whenDeserializeIntoGenericTypeByTypeReference_thenCorrect() throws JsonProcessingException {
    String json = "{\"result\":{\"id\":1,\"firstName\":\"John\",\"lastName\":\"Lewis\"}}";

    TypeReference<JsonResponse````<User>````> typeRef = new TypeReference<JsonResponse````<User>````>() {};
    JsonResponse````<User>```` jsonResponse = objectMapper.readValue(json, typeRef);
    User user = jsonResponse.getResult();

    assertThat(user.getId()).isEqualTo(1);
    assertThat(user.getFirstName()).isEqualTo("John");
    assertThat(user.getLastName()).isEqualTo("Lewis");
}
```

### 3.2. _JavaType_

如果类型参数_T_不是静态的，我们需要选择_JavaType_而不是_TypeReference_来传递反序列化时的类型信息。_ObjectMapper_提供了这样的方法，从Jackson 2.5开始推荐使用并可以使用_TypeFactory_构造我们的类型参数_JavaType_对象：
```java
JavaType javaType = objectMapper.getTypeFactory().constructParametricType(JsonResponse.class, User.class);
JsonResponse````<User>```` jsonResponse = objectMapper.readValue(json, javaType);
```
这里_User.class_作为第二个参数传递给方法_constructParametricType_，并且可以很容易地更改为其他参数化类型。

## 4. 结论

在本文中，我们介绍了两种简单的方法将JSON字符串反序列化到具有泛型类型的对象。

像往常一样，本文中展示的所有代码片段都可以在GitHub上找到。