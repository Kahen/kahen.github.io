---
date: 2022-04-01
category:
  - Java
  - Jackson
tag:
  - JSON
  - Deserialization
head:
  - - meta
    - name: keywords
      content: Jackson, JSON, Deserialization, Camel Case, Snake Case
------
# 使用Jackson将蛇形命名法JSON反序列化为驼峰命名法字段

字段名在JSON对象中可以有多种格式。当我们想要将这些加载到我们的POJOs中时，我们可能会遇到一个问题，即我们Java代码中的属性名与JSON中的命名约定不匹配。

在这个简短的教程中，我们将看到如何使用**Jackson**将蛇形命名法JSON反序列化为驼峰命名法字段。

## 2. 安装Jackson

让我们从向我们的_pom.xml_文件中添加Jackson依赖开始：

```xml
`<dependency>`
    `<groupId>`com.fasterxml.jackson.core`</groupId>`
    `<artifactId>`jackson-databind`</artifactId>`
    `<version>`2.13`</version>`
`</dependency>`
```

## 3. 使用默认值进行反序列化

让我们考虑一个示例_User_类：

```java
public class User {
    private String firstName;
    private String lastName;

    // 标准的getter和setter
}
```

让我们尝试加载这个使用蛇形命名法标准（由下划线分隔的小写名称）的JSON：

```json
{
    "first_name": "Jackie",
    "last_name": "Chan"
}
```

首先，我们需要使用_ObjectMapper_来反序列化这个JSON：

```java
ObjectMapper objectMapper = new ObjectMapper();
User user = objectMapper.readValue(JSON, User.class);

```

然而，当我们尝试这样做时，我们会得到一个错误：

```java
com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException: Unrecognized field "first_name" (class com.baeldung.jackson.snakecase.User), not marked as ignorable (2 known properties: "lastName", "firstName"])
```

不幸的是，Jackson无法完全匹配JSON中的名称与_User_中的字段名。

接下来，我们将学习三种解决这个问题的方法。

## 4. 使用_@JsonProperty_注解

我们可以在我们的类字段上使用_@JsonProperty_注解，将字段映射为我们JSON中的确切名称：

```java
public class UserWithPropertyNames {
    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    // 标准的getter和setter
}
```

现在我们可以将我们的JSON反序列化为_UserWithPropertyNames_：

```java
ObjectMapper objectMapper = new ObjectMapper();
UserWithPropertyNames user = objectMapper.readValue(JSON, UserWithPropertyNames.class);
assertEquals("Jackie", user.getFirstName());
assertEquals("Chan", user.getLastName());
```

## 5. 使用_@JsonNaming_注解

接下来，我们可以使用_@JsonNaming_注解在类上，并**所有字段都将使用蛇形命名法进行反序列化**：

```java
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class UserWithSnakeStrategy {
    private String firstName;
    private String lastName;

    // 标准的getter和setter
}
```

然后再次反序列化我们的JSON：

```java
ObjectMapper objectMapper = new ObjectMapper();
UserWithSnakeStrategy user = objectMapper.readValue(JSON, UserWithSnakeStrategy.class);
assertEquals("Jackie", user.getFirstName());
assertEquals("Chan", user.getLastName());
```

## 6. 配置_ObjectMapper_

最后，我们可以使用_ObjectMapper_上的_setPropertyNamingStrategy_方法来配置它，以用于所有序列化：

```java
ObjectMapper objectMapper = new ObjectMapper()
  .setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
User user = objectMapper.readValue(JSON, User.class);
assertEquals("Jackie", user.getFirstName());
assertEquals("Chan", user.getLastName());
```

正如我们所看到的，我们现在可以将我们的JSON反序列化到原始的_User_对象中，即使_User_类没有任何注解。

我们应该注意到还有其他的命名约定（例如kebab case），上述解决方案也适用于它们。

## 7. 结论

在这篇文章中，我们看到了使用Jackson将蛇形命名法JSON反序列化为驼峰命名法字段的不同方法。

首先，我们明确命名了字段。然后我们在POJO本身上设置了命名策略。

最后，我们向_ObjectMapper_添加了全局配置。

如常，本文的示例代码可以在GitHub上找到。