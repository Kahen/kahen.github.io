---
date: 2024-06-22
category:
  - Java
  - Gson
tag:
  - JSON
  - Java List
  - TypeToken
head:
  - - meta
    - name: keywords
      content: Java, Gson, JSON, TypeToken, 动态类型转换
---
# Gson 使用 TypeToken 处理动态列表项类型

在本教程中，我们将讨论如何将 JSON 数组转换为等价的 java.util.List 对象。Gson 是 Google 提供的一个 Java 库，它帮助将 JSON 字符串转换为 Java 对象，反之亦然。

这个库中的 Gson 类有一个 fromJson() 方法，它接受两个参数，第一个参数是 JSON 字符串，第二个参数是 java.lang.reflect.Type 类型。该方法将 JSON 字符串转换为由其第二个参数表示类型的等价 Java 对象。

我们将创建一个通用方法，比如 convertJsonArrayToListOfAnyType(String jsonArray, T elementType)，它可以将 JSON 数组转换为 List`````````<T>`````````，其中 T 是 List 中元素的类型。

让我们更深入地了解这一点。

假设我们有两个 JSON 数组，一个用于 Student，一个用于 School：

```json
final String jsonArrayOfStudents =
    "["
    + "{\"name\":\"John\", \"grade\":\"1\"}, "
    + "{\"name\":\"Tom\", \"grade\":\"2\"}, "
    + "{\"name\":\"Ram\", \"grade\":\"3\"}, "
    + "{\"name\":\"Sara\", \"grade\":\"1\"}"
  + "]";
final String jsonArrayOfSchools =
    "["
    + "{\"name\":\"St. John\", \"city\":\"Chicago City\"}, "
    + "{\"name\":\"St. Tom\", \"city\":\"New York City\"}, "
    + "{\"name\":\"St. Ram\", \"city\":\"Mumbai\"}, "
    + "{\"name\":\"St. Sara\", \"city\":\"Budapest\"}"
  + "]";
```

通常，我们可以使用 Gson 类将数组转换为 List 对象：

```java
@Test
void givenJsonArray_whenListElementTypeDynamic_thenConvertToJavaListUsingTypeToken() {
    Gson gson = new Gson();
    TypeToken``<List```````````<Student>`````````````> typeTokenForListOfStudents = new TypeToken``<List```````````<Student>`````````````>(){};
    TypeToken``<List`````````<School>```````````> typeTokenForListOfSchools = new TypeToken``<List`````````<School>```````````>(){};
    List```````````<Student>``````````` studentsLst = gson.fromJson(jsonArrayOfStudents, typeTokenForListOfStudents.getType());
    List`````````<School>````````` schoolLst = gson.fromJson(jsonArrayOfSchools, typeTokenForListOfSchools.getType());
    assertAll(
      () -> studentsLst.forEach(e -> assertTrue(e instanceof Student)),
      () -> schoolLst.forEach(e -> assertTrue(e instanceof School))
    );
}
```

我们为 List```````````<Student>``````````` 和 List`````````<School>````````` 创建了 TypeToken 对象。最后，使用 TypeToken 对象，我们得到了 Type 对象，然后将 JSON 数组转换为 List```````````<Student>``````````` 和 List`````````<School>`````````。

为了促进重用，让我们尝试创建一个通用类，其中包含一个方法，该方法可以接收 List 中的元素类型，并返回 Type 对象：

```java
class ListWithDynamicTypeElement`````````<T>````````` {
    Type getType() {
        TypeToken<List`````````<T>`````````> typeToken = new TypeToken<List`````````<T>`````````>(){};
        return typeToken.getType();
    }
}
```

我们为给定的元素类型 T 实例化了一个泛型 TypeToken<List`````````<T>`````````>。然后我们返回相应的 Type 对象。列表元素类型只在运行时可用。

让我们看看这个方法的实际应用：

```java
@Test
void givenJsonArray_whenListElementTypeDynamic_thenConvertToJavaListUsingTypeTokenFails() {
    Gson gson = new Gson();
    List```````````<Student>``````````` studentsLst = gson.fromJson(jsonArrayOfStudents, new ListWithDynamicTypeElement```````````<Student>```````````().getType());
    assertFalse(studentsLst.get(0) instanceof Student);
    assertThrows(ClassCastException.class, () -> studentsLst.forEach(e -> assertTrue(e instanceof Student)));
}
```

虽然该方法可以编译，但在运行时失败，并在尝试迭代 studentLst 时引发 ClassCastException。此外，我们看到列表中的元素不是 Student 类型。

在 Gson 2.10 版本中，TypeToken 类引入了 getParamterized() 方法。这使得开发人员能够处理列表元素的类型信息在编译期间不可用的情况。

让我们看看这个新方法如何帮助返回参数化类的 Type 信息：

```java
Type getGenericTypeForListFromTypeTokenUsingGetParameterized(Class elementClass) {
    return TypeToken.getParameterized(List.class, elementClass).getType();
}
```

当在运行时调用 getParamterized() 方法时，它将返回实际的 List 对象类型及其元素类型。这将进一步帮助 Gson 类将 JSON 数组转换为具有正确元素类型信息的确切 List 对象。

让我们看看这个方法的实际应用：

```java
@Test
void givenJsonArray_whenListElementTypeDynamic_thenConvertToJavaListUsingGetParameterized() {
    Gson gson = new Gson();
    List```````````<Student>``````````` studentsLst = gson.fromJson(jsonArrayOfStudents, getGenericTypeForListFromTypeTokenUsingGetParameterized(Student.class));
    List`````````<School>````````` schoolLst = gson.fromJson(jsonArrayOfSchools, getGenericTypeForListFromTypeTokenUsingGetParameterized(School.class));
    assertAll(
      () -> studentsLst.forEach(e -> assertTrue(e instanceof Student)),
      () -> schoolLst.forEach(e -> assertTrue(e instanceof School))
    );
}
```

我们使用了 getGenericTypeForListFromTypeTokenUsingGetParameterized() 方法来获取 List```````````<Student>``````````` 和 List`````````<School>````````` 的 Type 信息。最后，使用 fromJson() 方法成功地将 JSON 数组转换为它们各自的 Java List 对象。

Gson 库有一个 JsonArray 类来表示 JSON 数组。我们将使用它将 JSON 数组转换为 List 对象：

```java
`````````<T>````````` List`````````<T>````````` createListFromJsonArray(String jsonArray, Type elementType) {
    Gson gson = new Gson();
    List`````````<T>````````` list = new ArrayList<>();
    JsonArray array = gson.fromJson(jsonArray, JsonArray.class);
    for(JsonElement element : array) {
        T item = gson.fromJson(element, elementType);
        list.add(item);
    }
    return list;
}
```

首先，我们使用 Gson 类中的常规 fromJson() 方法将 JSON 数组字符串转换为 JsonArray 对象。然后，我们将 JsonArray 对象中的每个 JsonElement 元素转换为目标 Type，该 Type 由 createListFromJsonArray() 方法的第二个参数 elementType 定义。

这些转换后的元素被放入 List 中，然后在最后返回。

现在，让我们看看这个方法的实际应用：

```java
@Test
void givenJsonArray_whenListElementTypeDynamic_thenConvertToJavaListUsingJsonArray() {
    List```````````<Student>``````````` studentsLst = createListFromJsonArray(jsonArrayOfStudents, Student.class);
    List`````````<School>````````` schoolLst = createListFromJsonArray(jsonArrayOfSchools, School.class);
    assertAll(
      () -> studentsLst.forEach(e -> assertTrue(e instanceof Student)),
      () -> schoolLst.forEach(e -> assertTrue(e instanceof School))
    );
}
```

我们使用 createListFromJsonArray() 方法成功地将学生和学校的 JSON 数组转换为 List```````````<Student>``````````` 和 List`````````<School>`````````。

与 Gson 库中的 TypeToken 类类似，Guava 中的 TypeToken 类也使开发人员能够在运行时捕获泛型类型。否则，由于 Java 中的类型擦除，这是不可能的。

让我们看看使用 Guava TypeToken 类的实现：

```java
`````````<T>````````` Type getTypeForListUsingTypeTokenFromGuava(Class`````````<T>````````` type) {
    return new com.google.common.reflect.TypeToken<List`````````<T>`````````>() {}
      .where(new TypeParameter`````````<T>`````````(), type)
      .getType();
}
```

where() 方法通过将类型参数替换为变量 type 中的类来返回 TypeToken 对象。

最后，我们可以看看它的实际应用：

```java
@Test
void givenJsonArray_whenListElementTypeDynamic_thenConvertToJavaListUsingTypeTokenFromGuava() {
    Gson gson = new Gson();
    List```````````<Student>``````````` studentsLst = gson.fromJson(jsonArrayOfStudents, getTypeForListUsingTypeTokenFromGuava(Student.class));
    List`````````<School>````````` schoolLst = gson.fromJson(jsonArrayOfSchools, getTypeForListUsingTypeTokenFromGuava(School.class));
    assertAll(
      () -> studentsLst.forEach(e -> assertTrue(e instanceof Student)),
      () -> schoolLst.forEach(e -> assertTrue(e instanceof School))
    );
}
```

我们再次使用 fromJson() 方法将 JSON 数组转换为各自的 List 对象。然而，我们是通过 getTypeForListUsingTypeTokenFromGuava() 方法中的 Guava 库来获取 Type 对象的。

_ParameterizedType_ 是 Java 反射 API 的一部分，它是一个接口，帮助表示参数化类型，如 Collection`<String>`。

让我们实现 ParameterizedType 来表示任何具有参数化类型的类：

```java
public class ParameterizedTypeImpl implements ParameterizedType {
    private final Class```<?>``` rawType;
    private final Type[] actualTypeArguments;

    private ParameterizedTypeImpl(Class```<?>``` rawType, Type[] actualTypeArguments) {
        this.rawType = rawType;
        this.actualTypeArguments = actualTypeArguments;
    }

    public static ParameterizedType make(Class```<?>``` rawType, Type... actualTypeArguments) {
        return new ParameterizedTypeImpl(rawType, actualTypeArguments);
    }

    @Override
    public Type[] getActualTypeArguments() {
        return actualTypeArguments;
    }

    @Override
   Type getRawType() {
        return rawType;
    }

    @Override
    public Type getOwnerType() {
        return null;
    }
}

```

actualTypeArguments 变量将存储泛型类中类型参数的类信息，而 rawType 表示泛型类本身。make() 方法返回参数化类的 Type 对象。

最后，让我们看看它的实际应用：

```java
@Test
void givenJsonArray_whenListElementTypeDynamic_thenConvertToJavaListUsingParameterizedType() {
    Gson gson = new Gson();
    List```````````<Student>``````````` studentsLst = gson.fromJson(jsonArrayOfStudents, ParameterizedTypeImpl.make(List.class, Student.class));
    List`````````<School>````````` schoolLst = gson.fromJson(jsonArrayOfSchools, ParameterizedTypeImpl.make(List.class, School.class));
    assertAll(
      () -> studentsLst.forEach(e -> assertTrue(e instanceof Student)),
      () -> schoolLst.forEach(e -> assertTrue(e instanceof School))
    );
}
```

我们使用 make() 方法获取了参数化 List 类的 Type 信息，并成功地将 JSON 数组转换为它们各自的 List 对象形式。

## 7. 结论

在本文中，我们讨论了在运行时获取 List`````````<T>````````` 对象的 Type 信息的四种不同方法。最后，我们使用 Gson 库中的 fromJson() 方法使用 Type 对象将 JSON 数组转换为 List 对象。

由于最终调用的都是 fromJson() 方法，所有这些方法的性能非常接近。然而，TypeToken.getParamterized() 方法是最简洁的，因此我们推荐使用它。

如常，使用的代码可以在 GitHub 上找到。
```

OK