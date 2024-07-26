---
date: 2022-04-01
category:
  - Java
  - JSON
tag:
  - jsonschema2pojo
  - Java类
  - POJO
head:
  - - meta
    - name: keywords
      content: Java类生成, JSON, jsonschema2pojo, POJO
---
# 从JSON生成Java类 | Baeldung

## 1. 概述

在某些情况下，我们需要使用JSON文件创建Java类，也称为POJO。使用一个方便的**jsonschema2pojo**库，我们可以不必从头开始编写整个类。

在本教程中，我们将看到如何使用这个库从JSON对象创建Java类。

## 2. 设置

**我们可以使用_jsonschema2pojo-core_依赖项将JSON对象转换为Java类：**

```xml
`<dependency>`
    `<groupId>`org.jsonschema2pojo`</groupId>`
    `<artifactId>`jsonschema2pojo-core`</artifactId>`
    `<version>`1.1.1`</version>`
`</dependency>`
```

## 3. JSON到Java类转换

让我们看看如何使用_jsonschema2pojo_库编写一个程序，该程序将JSON文件转换为POJO类。

首先，我们将创建一个名为_convertJsonToJavaClass_的方法，该方法将JSON文件转换为POJO类，并接受四个参数：

- 一个_inputJson_文件URL
- 一个_outputJavaClassDirectory_，POJO将在此生成
- 一个_packageName_，POJO类将属于此包
- 一个输出POJO的_className_。

然后，我们将在这个方法中定义步骤：

- 我们将从创建一个_JCodeModel_类的对象开始，该对象将生成Java类
- 然后，我们将为_jsonschema2pojo_定义配置，这使得程序能够识别输入源文件是JSON（_getSourceType_方法）
- 此外，我们将将此配置传递给一个_RuleFactory_，它将用于为此映射创建类型生成规则
- 我们将使用此工厂以及_SchemaGenerator_对象创建一个_SchemaMapper_，该对象从提供的JSON生成Java类型
- 最后，我们将调用_JCodeModel_的_build_方法来创建输出类

让我们看看实现：

```java
public void convertJsonToJavaClass(URL inputJsonUrl, File outputJavaClassDirectory, String packageName, String javaClassName)
  throws IOException {
    JCodeModel jcodeModel = new JCodeModel();

    GenerationConfig config = new DefaultGenerationConfig() {
        @Override
        public boolean isGenerateBuilders() {
            return true;
        }

        @Override
        public SourceType getSourceType() {
            return SourceType.JSON;
        }
    };

    SchemaMapper mapper = new SchemaMapper(new RuleFactory(config, new Jackson2Annotator(config), new SchemaStore()), new SchemaGenerator());
    mapper.generate(jcodeModel, javaClassName, packageName, inputJsonUrl);

    jcodeModel.build(outputJavaClassDirectory);
}
```

## 4. 输入和输出

让我们使用这个示例JSON来执行程序：

```json
{
  "name": "Baeldung",
  "area": "tech blogs",
  "author": "Eugen",
  "id": 32134,
  "topics": [
    "java",
    "kotlin",
    "cs",
    "linux"
  ],
  "address": {
    "city": "Bucharest",
    "country": "Romania"
  }
}
```

一旦我们执行程序，它将在给定目录中创建以下Java类：

```java
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({"name", "area", "author", "id", "topics", "address"})
@Generated("jsonschema2pojo")
public class Input {

    @JsonProperty("name")
    private String name;

    @JsonProperty("area")
    private String area;

    @JsonProperty("author")
    private String author;

    @JsonProperty("id")
    private Integer id;

    @JsonProperty("topics")
    private List``<String>`` topics = new ArrayList``<String>``();

    @JsonProperty("address")
    private Address address;

    @JsonIgnore
    private Map````<String, Object>```` additionalProperties = new HashMap````<String, Object>````();

    // getters & setters
    // hashCode & equals
    // toString
}
```

**请注意，它还相应地为嵌套的JSON对象创建了一个新的_Address_类：**

```java
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({"city", "country"})
@Generated("jsonschema2pojo")
public class Address {

    @JsonProperty("city")
    private String city;

    @JsonProperty("country")
    private String country;

    @JsonIgnore
    private Map````<String, Object>```` additionalProperties = new HashMap````<String, Object>````();

    // getters & setters
    // hashCode & equals
    // toString
}
```

我们还可以通过简单地访问jsonschema2pojo.org来实现所有这些。_jsonschema2pojo_工具接受一个JSON（或YAML）模式文档，并生成DTO风格的Java类。它提供了许多选项，你可以选择在Java类中包含，包括构造函数以及_hashCode, equals,_和_toString_方法。

## 5. 结论

在本教程中，我们涵盖了如何使用_jsonschema2pojo_库从JSON创建Java类，并提供了使用该库的示例。

像往常一样，代码片段可以在GitHub上找到。