---
date: 2022-04-01
category:
  - Gson
  - Java
tag:
  - Gson
  - Java
head:
  - - meta
    - name: keywords
      content: Gson @Expose, Gson @SerializedName, Java, Serialization, Deserialization
---
# Gson @Expose 和 @SerializedName 的区别

在本教程中，我们将学习 Gson 库中的 @Expose 和 @SerializedName 注解。@Expose 有助于控制哪些类属性可以被序列化或反序列化，而 @SerializedName 有助于在序列化和反序列化时将对象的属性名称映射到 JSON 字符串中的属性键名，反之亦然。

有些情况下，类中的某些敏感属性值不应该被序列化为 JSON 字符串。为此，Gson 提供了 @Expose 注解，它有两个布尔属性：serialize 和 deserialize。

假设 Person 类中的 password 属性不应该序列化，因为它是敏感信息。因此，我们必须使用 @Expose(serialize=false) 注解来装饰 password 属性：

```java
public class Person {
    @Expose(serialize = true)
    private String firstName;
    @Expose(serialize = true)
    private String lastName;
    @Expose()
    private String emailAddress;
    @Expose(serialize = false)
    private String password;

    @Expose(serialize = true)
    private List`<BankAccount>` bankAccounts;
    // 通用的 getter 和 setter...
}
```

同样，BankAccount 对象中的 accountNumber 也不应该序列化，因为它也是敏感信息。因此，我们也必须使用 @Expose(serialize=false) 注解来装饰 accountNumber 属性：

```java
public class BankAccount {
    @Expose(serialize = false, deserialize = false)
    private String accountNumber;
    @Expose(serialize = true, deserialize = true)
    private String bankName;
    // 通用的 getter 和 setter...
}
```

现在，要将对象转换为 JSON 字符串，我们不能使用默认的 Gson 对象，即通过使用 new 操作符创建的 Gson 对象。我们必须使用 GsonBuilder 类，并通过 excludeFieldsWithoutExposeAnnotation() 设置来实例化 Gson 类。

让我们看看 PersonSerializer 类：

```java
public class PersonSerializer {
    private static final Gson configuredGson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
    private static final Gson defaultGson = new Gson();

    public static String serializeWithConfiguredGson(Person person) {
       return configuredGson.toJson(person);
    }

    public static String serializeWithDefaultGson(Person person) {
        return defaultGson.toJson(person);
    }
}
```

让我们测试 serializeWithConfiguredGson() 方法：

```java
public class PersonSerializerUnitTest {
    @Test
    public void whenUseCustomGson_thenDonotSerializeAccountNumAndPassword () {
        String personJson = PersonSerializer.serializeWithConfiguredGson(person);
        assertFalse("测试失败：找到了 password", personJson.contains("password"));
        assertFalse("测试失败：找到了 account number", personJson.contains("accountNumber："));
    }
}
```

正如预期的那样，我们在输出中看不到像 password 和 accountNumber 这样的敏感属性：

```
{
  "firstName":"Parthiv",
  "lastName":"Pradhan","email":"parthiv.pradhan@gmail.com",
  "bankAccounts":[{"bankName":"Bank of America"},{ "bankName":"Bank of America"}]
}
```

同样，让我们测试 serializeWithDefaultGson() 方法：

```java
@Test
public void whenUseDefaultGson_thenSerializeAccountNumAndPassword () {
    String personJson = PersonSerializer.serializeWithDefaultGson(person);

    assertTrue("测试失败：未找到 password", personJson.contains("password"));
    assertTrue("测试失败：未找到 account number", personJson.contains("accountNumber"));
}
```

正如前面讨论的，defaultGson 对象无法识别 @Expose 注解，并且如预期，输出打印了 password 和 accountNumber：

```
{
  "firstName":"James","lastName":"Cameron","email":"james.cameron@gmail.com",
  "password":"secret",
  "bankAccounts":
    [
      {"accountNumber":"4565432312","bankName":"Bank of America"},
      {"accountNumber":"4565432616","bankName":"Bank of America"}
    ]
}
```

为了更高级的用例排除序列化属性，我们可以使用 ExclusionStrategy。

### @SerializedName

@SerializedName 注解的作用有点像自定义转换器。通常，我们首先将对象转换为 JSON 字符串，然后修改其属性键，然后将其作为参数发送到 web 服务。

同样，在将 JSON 字符串转换为对象时，我们必须将其属性键映射到对象的属性名称。Gson 库通过 @SerializedName 这个单一注解巧妙地结合了这两个步骤。多么简单！

我们经常在序列化时想要生成尽可能小的有效载荷。让我们尝试序列化下面的 Country 类，使用一些比属性名称短得多的自定义键名：

```java
public class Country {
    @SerializedName(value = "name")
    private String countryName;
    @SerializedName(value = "capital")
    private String countryCapital;
    @SerializedName(value = "continent")
    private String continentName;
    // 通用的 getter 和 setter...
}
```

现在，让我们将 Country 对象转换为 JSON：

```java
public class PersonSerializer {
    private static final Gson defaultGson = new Gson();

    public static String toJsonString(Object obj) {
        return defaultGson.toJson(obj);
    }
}
```

是时候检查这个方法是否有效了：

```java
@Test
public void whenUseSerializedAnnotation_thenUseSerializedNameinJsonString() {
    String countryJson = PersonSerializer.toJsonString(country);
    logger.info(countryJson);
    assertFalse("测试失败：键没有变化", countryJson.contains("countryName"));
    assertFalse("测试失败：键没有变化", countryJson.contains("contentName"));
    assertFalse("测试失败：键没有变化", countryJson.contains("countryCapital"));

    assertTrue("测试失败：键没有变化", countryJson.contains("name"));
    assertTrue("测试失败：键没有变化", countryJson.contains("continent"));
    assertTrue("测试失败：键没有变化", countryJson.contains("capital"));
}
```

正如预期的那样，我们发现属性键与我们提供给 @SerializedName 注解的匹配：

```
{"name":"India","capital":"New Delhi","continent":"Asia"}
```

让我们看看相同的注解是否有助于将上述 JSON 转换为 Country 对象。为此，我们将使用 fromJsonString() 方法：

```java
public class PersonSerializer {
    private static final Gson defaultGson = new Gson();
    public static Country fromJsonString(String json) {
        return defaultGson.fromJson(json, Country.class);
    }
}
```

让我们检查这个方法是否有效：

```java
@Test
public void whenJsonStrCreatedWithCustomKeys_thenCreateObjUsingGson() {
    String countryJson = PersonSerializer.toJsonString(country);
    Country country = PersonSerializer.fromJsonString(countryJson);

    assertEquals("失败：对象创建失败", country.getCountryName(), "India");
    assertEquals("失败：对象创建失败", country.getCountryCapital(), "New Delhi");
    assertEquals("失败：对象创建失败", country.getContinentName(), "Asia");
}
```

该方法可以创建 Country 对象：

```
Country{countryName='India', countryCapital='New Delhi', continentName='Asia'}
```

### 结论

在本文中，我们学习了两个重要的 Gson 注解：@Expose 和 @SerializedName。我们可以肯定地说，正如这里所演示的，它们具有完全不同的功能。文章中使用的代码片段可以在 GitHub 上找到。