---
date: 2024-07-01
category:
  - Java
  - JSON Schema
tag:
  - Java
  - JSON Schema
  - 自动生成
head:
  - - meta
    - name: keywords
      content: Java, JSON Schema, 自动生成, Maven插件
---

# Java中自动生成JSON Schema的程序化方法

在本教程中，我们将使用Java JSON Schema Generator库从Java创建JSON Schema。

首先，我们将看到如何生成简单和递归的JSON Schema。接下来，我们将查看可用的不同模式配置。然后，我们将从库的一些模块中逐步派生出JSON Schema：Jackson和Jakarta验证。最后，我们将设置一个Maven插件，以便在Maven _generate_ 目标下拥有JSON Schema。

## 2. 设置

让我们为我们的项目设置必要的依赖项。

### 2.1. 核心依赖项

首先，让我们安装_jsonschema-generator_：

```xml
```<dependency>```
    `````<groupId>`````com.github.victools`````</groupId>`````
    `````<artifactId>`````jsonschema-generator`````</artifactId>`````
    `````<version>`````4.31.1`````</version>`````
```</dependency>```
```

它包含用于模式生成和配置的主要API。

### 2.2. 模块

接下来，我们将安装三个模块，以从类注解生成JSON Schema属性。让我们先添加_jsonschema-module-jackson_：

```xml
```<dependency>```
    `````<groupId>`````com.github.victools`````</groupId>`````
    `````<artifactId>`````jsonschema-module-jackson`````</artifactId>`````
    `````<version>`````4.31.1`````</version>`````
```</dependency>```
```

这个模块从Jackson注解派生JSON Schema属性。

继续，我们将安装_jsonschema-module-jakarta-validation_以从Jakarta验证注解获取模式：

```xml
```<dependency>```
    `````<groupId>`````com.github.victools`````</groupId>`````
    `````<artifactId>`````jsonschema-module-jakarta-validation`````</artifactId>`````
    `````<version>`````4.31.1`````</version>`````
```</dependency>```
```

### 2.3. Maven插件

最后，让我们添加_jsonschema-maven-plugin_：

```xml
``<plugin>``
    `````<groupId>`````com.github.victools`````</groupId>`````
    `````<artifactId>`````jsonschema-maven-plugin`````</artifactId>`````
    `````<version>`````4.31.1`````</version>`````
    ``<executions>``
        ``<execution>``
            ``<goals>``
                ``<goal>``generate``</goal>``
            ``</goals>``
        ``</execution>``
    ``</executions>``
``</plugin>``
```

稍后，我们将定义 _configuration_ 条目。它采用用于生成模式的类，模式配置以及要使用的模块。

**请注意，自Java JSON Schema Generator版本4.7以来，强烈建议模块和插件使用与核心依赖项相同的版本。**

## 3. 基础

在本节中，我们将通过创建简单和递归模式来探索jsonschema-generator的构建块。

### 3.1. 简单模式

让我们定义一个_Article_：

```java
public class Article {
    private UUID id;
    private String title;
    private String content;
    private Date createdAt;
    private Area area;
    // 省略getter和setter
}
```

我们将从_Article_类生成一个模式：

```java
SchemaGeneratorConfigBuilder configBuilder = new SchemaGeneratorConfigBuilder(SchemaVersion.DRAFT_2020_12, OptionPreset.PLAIN_JSON);
SchemaGeneratorConfig config = configBuilder.with(Option.EXTRA_OPEN_API_FORMAT_VALUES)
  .without(Option.FLATTENED_ENUMS_FROM_TOSTRING)
  .build();

SchemaGenerator generator = new SchemaGenerator(config);
JsonNode jsonSchema = generator.generateSchema(Article.class);
```

在这里，我们针对的是_DRAFT_2020-12_，这是目前最新的JSON Schema草案。如果未指定，则将使用_DRAFT-7_规范生成模式。

_PLAIN_JSON_ _OptionPreset_ 包含许多默认配置，用于使用每个非静态类字段进行模式生成。其他可用的预设是_JAVA_OBJECT_和_FULL_DOCUMENTATION_。第一个包括模式中的公共字段和方法，而第二个包括所有字段和公共方法。**如果未指定，预设默认为** _**FULL_DOCUMENTATION**。

生成的模式遵循_DRAFT_2020-12_结构：

```json
{
    "$schema":"https://json-schema.org/draft/2020-12/schema",
    "type":"object",
    "properties":{
        "area":{
            "type":"string",
            "enum":[
                "JAVA",
                "KOTLIN",
                "SCALA",
                "LINUX"
            ]
        },
        "content":{
            "type":"string"
        },
        "createdAt":{
            "type":"string",
            "format":"date-time"
        },
        "id":{
            "type":"string",
            "format":"uuid"
        },
        "title":{
            "type":"string"
        }
    }
}
```

这里需要注意几件事情。首先，Java _Date_ 和 _UUID_ 在模式中是字符串。**幸运的是，由于生成器选项 _EXTRA_OPEN_API_FORMAT_VALUES_，它们的真实类型在 _field_ 格式中被指定了。** 它为特殊的JSON Schema字符串添加了额外的信息。

**最后，Java枚举通过调用它们的 _name()_ 方法来表示。**

### 3.2. 递归模式

让我们有一个_Author_类：

```java
public class Author {
    private UUID id;
    private String name;
    private String role;
    private List`<AuthoredArticle>` articles;
    // 省略getter和setter
}
```

一个_作者_有一系列_AuthoredArticle_。相反，一个_AuthoredArticle_有一个_作者_：

```java
public class AuthoredArticle {
    private Author author;
    // 省略getter和setter
}
```

保持前一节的所有配置，_AuthoredArticle_类的模式是一个递归模式。

有趣的是，_author_属性的 _articles_ 字段引用了正在生成的实际模式：

```json
{
    "author":{
        "type":"object",
        "properties":{
            "articles":{
                "type":"array",
                "items":{
                    "$ref":"#"
                }
            }
        }
    }
}
```

**这种循环引用是规范所允许的。但是，_$ref_ 不能指向另一个 _$ref_。**

## 4. 配置

在上一节中，我们使用了一些内置的预设。现在，我们将看看如何实现细粒度的配置。

首先，我们将使用单独的配置来自定义生成的模式属性。然后，我们将窥探高级配置。

### 4.1. 单独配置

让我们为我们的_Author_类配置模式字段：

```java
configBuilder.forFields()
  .withRequiredCheck(field -> field.getAnnotationConsideringFieldAndGetter(Nullable.class) == null)
  .withArrayUniqueItemsResolver(scope -> scope.getType().getErasedType() == (List.class) ? true : null);
```

生成的模式将不是可空的属性标记为必需。它还将_articles_属性制作成唯一数组：

```json
{
    "$schema":"https://json-schema.org/draft/2020-12/schema",
    "type":"object",
    "properties":{
        "articles":{
            "uniqueItems":true,
            "type":"array",
            "items":{
                "type":"object",
                "properties":{
                    "area":{
                        "type":"string",
                        "enum":[
                            "JAVA",
                            "KOTLIN",
                            "SCALA",
                            "LINUX"
                        ]
                    },
                    "author":{
                        "$ref":"#"
                    },
                    "content":{
                        "type":"string"
                    },
                    "createdAt":{
                        "type":"string",
                        "format":"date-time",
                        "default":1690565063847
                    },
                    "id":{
                        "type":"string",
                        "format":"uuid"
                    },
                    "title":{
                        "type":"string"
                    }
                },
                "required":[
                    "area",
                    "author",
                    "content",
                    "createdAt",
                    "id",
                    "title"
                ]
            },
            "default":[

            ]
        },
        "id":{
            "type":"string",
            "format":"uuid"
        },
        "name":{
            "type":"string"
        },
        "role":{
            "type":"string"
        }
    },
    "required":[
        "articles",
        "id",
        "name",
        "role"
    ]
}
```

上面的模式还为_createdAt_和_articles_属性设置了默认值。这是由于我们对类型的配置：

```java
configBuilder.forTypesInGeneral()
  .withArrayUniqueItemsResolver(scope -> scope.getType().getErasedType() == (List.class) ? true : null)
  .withDefaultResolver(scope -> scope.getType().getErasedType() == List.class ? Collections.EMPTY_LIST : null)
  .withDefaultResolver(scope -> scope.getType().getErasedType() == Date.class ? Date.from(Instant.now()) : null);
```

_ArrayUniqueItemsResolver_确保如果数组是从_List_类型生成的，则将其标记为唯一。

就像我们已经配置了字段和类型一样，我们也能够配置方法：

```java
configBuilder.forMethods()
  .withRequiredCheck(method -> method.getAnnotationConsideringFieldAndGetter(NotNull.class) != null);
```

我们标记为必需的字段被注解为_@NotNull_。如果该注解在它们的getter上，它们也是必需的。

**此外，对于每种配置，返回_null_不会在模式中设置字段。**

### 4.2. 高级配置

在本节中，我们将使用我们的_AdvancedArticle_类：

```java
public class AdvancedArticle {
    private UUID id;
    private String title;
    private String content;
    @AllowedTypes({Timestamp.class, String.class, Date.class})
    private Object createdAt;
    private Area area;
    // 省略getter和setter
}
```

**高级配置是自定义JSON Schema生成的终极手段。当我们需要一些不是由单独配置提供的属性时，它特别有用：**

```java
configBuilder.forFields()
  .withInstanceAttributeOverride((node, field, context) -> node.put("readOnly", field.getDeclaredType().isInstanceOf(UUID.class)));
```

在这里，我们为每个属性添加了一个_readOnly_属性。它默认为_false_，除了_UUID_类：

```json
{
    "id":{
        "type":"string",
        "format":"uuid",
        "readOnly":true
    },
    "title":{
        "type":"string",
        "readOnly":false
    }
}
```

另一个有趣的配置是能够在给定字段中指定允许的类型。在我们的_AdvancedArticle_类中，_createdAt_属性接受_Date_和_Timestamp_类型：

```java
configBuilder.forFields()
  .withTargetTypeOverridesResolver(field -> Optional.ofNullable(field.getAnnotationConsideringFieldAndGetterIfSupported(AllowedTypes.class))
    .map(AllowedTypes::value)
    .map(Stream::of)
    .map(stream -> stream.map(subtype -> field.getContext().resolve(subtype)))
    .map(stream -> stream.collect(Collectors.toList()))
    .orElse(null));
```

在幕后，_TargetTypeOverride_类处理每个注解为_@AllowedTypes_的字段。然后，它将这些类型添加到结果中的_createdAt_属性：

```json
{
    "createdAt":{
        "anyOf":[
            {
                "type":"object",
                "properties":{
                    "nanos":{
                        "type":"integer",
                        "format":"int32",
                        "readOnly":false
                    }
                },
                "readOnly":false
            },
            {
                "type":"string",
                "format":"date-time",
                "readOnly":false
            }
        ]
    }
}
```

正如我们所看到的，由_anyOf_属性指定的联合类型。

**让我们记住，配置的可能性是无限的。**我们甚至可以添加自定义类型定义或自定义属性定义。选择哪个级别的自定义以满足我们的需求取决于我们。

## 5. 模块

Java JSON Schema Generator允许我们将配置分组为模块。**我们可以通过实现_Module_接口来创建我们自己的模块。**在接下来的几节中，我们将看看如何使用一些内置模块。我们将探索Jackson和Jakarta验证模块。

### 5.1. Jackson

Jackson模块处理Jackson注解以创建JSON Schema配置。让我们考虑我们的_Person_类：

```java
class Person {
    
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    UUID id;

    @JsonProperty(access = JsonProperty.Access.READ_WRITE, required = true)
    String name;

    @JsonProperty(access = JsonProperty.Access.READ_WRITE, required = true)
    String surname;

    @JsonProperty(access = JsonProperty.Access.READ_WRITE, required = true)
    Address address;

    @JsonIgnore
    String fullName;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    Date createdAt;

    @JsonProperty(access = JsonProperty.Access.READ_WRITE)
    List``<Person>`` friends;
    // 省略getter和setter
}
```

让我们将_JacksonModule_添加到我们的_SchemaGeneratorConfigBuilder_：

```java
JacksonModule module = new JacksonModule(RESPECT_JSONPROPERTY_REQUIRED);
SchemaGeneratorConfigBuilder configBuilder = new SchemaGeneratorConfigBuilder(DRAFT_2020_12, PLAIN_JSON).with(module)
  .with(EXTRA_OPEN_API_FORMAT_VALUES);

SchemaGenerator generator = new SchemaGenerator(configBuilder.build());
JsonNode jsonSchema = generator.generateSchema(Person.class);
```

该模块接受某些选项以进行进一步的自定义。_RESPECT_JSONPROPERTY_REQUIRED_选项指示模块在生成模式中的_readOnly_字段时考虑_JsonProperty.Access_。

生成的模式已经正确设置了_required_和_readOnly_字段：

```json
{
    "type":"object",
    "properties":{
        "createdAt":{
            "type":"string",
            "format":"date-time",
            "readOnly":true
        },
        "friends":{
            "type":"array",
            "items":{
                "$ref":"#"
            }
        },
        "id":{
            "type":"string",
            "format":"uuid",
            "readOnly":true
        }
    },
    "required":[
        "address",
        "name",
        "surname"
    ]
}
```

**未注解的属性和用_@JsonIgnore_注解的属性被忽略。** _Address_类的嵌套字段和_friends_属性的递归模式被正确引用。

### 5.2. Jakarta Validation

Jakarta Validation模块从_jakarta.validation.constraints_注解生成模式配置。让我们装饰我们的_Person_类：

```java
class Person {
    
    @NotNull
    UUID id;

    @NotNull
    String name;

    @NotNull
    @Email
    @Pattern(regexp = "\\b[A-Za-z0-9._%+-]+@baeldung.com\\b")
    String email;

    @NotNull
    String surname;

    @NotNull
    Address address;

    @Null
    String fullName;

    @NotNull
    Date createdAt;

    @Size(max = 10)
    List``<Person>`` friends;
    // 省略getter和setter
}
```

接下来，让我们配置_JakartaValidationModule_：

```java
JakartaValidationModule module = new JakartaValidationModule(NOT_NULLABLE_FIELD_IS_REQUIRED, INCLUDE_PATTERN_EXPRESSIONS);
SchemaGeneratorConfigBuilder configBuilder = new SchemaGeneratorConfigBuilder(DRAFT_2020_12, PLAIN_JSON).with(module);

SchemaGenerator generator = new SchemaGenerator(configBuilder.build());
JsonNode jsonSchema = generator.generateSchema(Person.class);
```

**该模块可以选择性地通过其_forValidationGroups()_方法接收验证组。**

_NOT_NULLABLE_FIELD_IS_REQUIRED_选项使注解为_@NotNull_的字段成为必需。由于_INCLUDE_PATTERN_EXPRESSIONS_，生成的模式包括所有用_@Pattern_注解的属性的模式字段：

```json
{
    "type":"object",
    "properties":{
        "createdAt":{
            "type":"string"
        },
        "email":{
            "type":"string",
            "format":"email",
            "pattern":"\\b[A-Za-z0-9._%+-]+@baeldung.com\\b"
        },
        "friends":{
            "maxItems":10,
            "type":"array",
            "items":{
                "$ref":"#"
            }
        },
        "fullName":{
            "type":[
                "string",
                "null"
            ]
        }
    },
    "required":[
        "createdAt",
        "email",
        "id",
        "name",
        "surname"
    ]
}
```

让我们注意到，由于_Person_类中用_@Email_注解，_email_属性有一个_format_字段。同样，_friends_属性的_maxItems_字段被正确设置。

## 6. Maven插件

Java JSON Schema Generator有一个Maven插件，可以从我们的构建过程中生成模式。让我们配置插件：

```xml
``<plugin>``
    `````<groupId>`````com.github.victools`````</groupId>`````
    `````<artifactId>`````jsonschema-maven-plugin`````</artifactId>`````
    `````<version>`````4.31.1`````</version>`````
    ``<executions>``
        ``<execution>``
            ``<goals>``
                ``<goal>``generate``</goal>``
            ``</goals>``
        ``</execution>``
    ``</executions>``
    `<configuration>`
        `<packageNames>`
            `<packageName>`com.baeldung.jsonschemageneration.plugin`</packageName>`
        `</packageNames>`
        `<classNames>`
            `<className>`com.baeldung.jsonschemageneration.plugin.Person`</className>`
        `</classNames>`
        `<schemaVersion>`DRAFT_2020_12`</schemaVersion>`
        `<schemaFilePath>`src/main/resources/schemas`</schemaFilePath>`
        `<schemaFileName>`{1}/{0}.json`</schemaFileName>`
        `<failIfNoClassesMatch>`true`</failIfNoClassesMatch>`
        ```<options>```
            `<preset>`PLAIN_JSON`</preset>`
            `<enabled>`
                `````<option>`````DEFINITIONS_FOR_ALL_OBJECTS`````</option>`````
                `````<option>`````FORBIDDEN_ADDITIONAL_PROPERTIES_BY_DEFAULT`````</option>`````
            `</enabled>`
            `<disabled>`SCHEMA_VERSION_INDICATOR`</disabled>`
        ```</options>```
        `<modules>`
            ``<module>``
                ``<name>``Jackson``</name>``
                ```<options>```
                    `````<option>`````RESPECT_JSONPROPERTY_REQUIRED`````</option>`````
                ```</options>```
            ``</module>``
            ``<module>``
                ``<name>``JakartaValidation``</name>``
                ```<options>```
                    `````<option>`````NOT_NULLABLE_FIELD_IS_REQUIRED`````</option>`````
                    `````<option>`````INCLUDE_PATTERN_EXPRESSIONS`````</option>`````
                ```</options>```
            ``</module>``
        `</modules>`
    `</configuration>`
``</plugin>``
```

我们将根据位于_com.baeldung.jsonschemageneration.plugin_包中的_Person_类生成一个模式。我们仍然可以定义要使用的模块，并向它们传递一些选项。**然而，插件不允许为自定义模块配置