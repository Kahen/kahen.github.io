---
date: 2022-04-01
category:
  - Java
  - INI文件解析
tag:
  - INI文件
  - Java解析
  - 库
  - Apache Commons
  - ini4j
head:
  - - meta
    - name: keywords
      content: Java, INI文件解析, 配置文件, Apache Commons, ini4j
---

# 如何在Java中解析INI文件

INI文件是Windows或MS-DOS的初始化或配置文件。它们具有纯文本内容，由节中的键值对组成。虽然我们可能更倾向于使用Java的原生.properties文件或其他格式来配置我们的应用程序，但有时我们可能需要从现有的INI文件中获取数据。

在本教程中，我们将查看一些可以帮助我们的库。我们还将查看如何使用INI文件中的数据来填充POJO。

## 2. 创建一个示例INI文件

让我们从一个示例INI文件开始，_sample.ini_：

```
; 16位应用程序支持
[fonts]
letter=bold
text-size=28

[background]
color=white

[RequestResult]
RequestCode=1

[ResponseResult]
ResultCode=0
```

此文件有四个节，命名使用了小写、短横线命名法和大驼峰命名法的混合。它的值要么是字符串，要么是数字。

## 3. 使用_ini4j_解析INI文件

_ini4j_是一个用于从INI文件中读取配置的轻量级库。自2015年以来它没有更新过。

### 3.1. 安装_ini4j_

要使用_ini4j_库，首先，我们应该在_pom.xml_中添加它的依赖项：

```
`````<dependency>`````
    `````<groupId>`````org.ini4j`````</groupId>`````
    `````<artifactId>`````ini4j`````</artifactId>`````
    `````<version>`````0.5.4`````</version>`````
`````</dependency>`````
```

### 3.2. 在_ini4j_中打开INI文件

**我们可以通过构造一个_Ini_对象来在_ini4j_中打开INI文件**：

```
File fileToParse = new File("sample.ini");
Ini ini = new Ini(fileToParse);
```

这个对象现在包含了节和键。

### 3.3. 读取节中的键

我们可以使用_Ini_类的_get()_函数从INI文件中读取节中的键：

```
assertThat(ini.get("fonts", "letter"))
  .isEqualTo("bold");
```

### 3.4. 转换为Map

让我们看看将整个INI文件转换为_Map``<String, Map``<String, String>````>_有多容易，这是Java的本地数据结构，代表了INI文件的层次结构：

```
public static Map``<String, Map``<String, String>````> parseIniFile(File fileToParse)
  throws IOException {
    Ini ini = new Ini(fileToParse);
    return ini.entrySet().stream()
      .collect(toMap(Map.Entry::getKey, Map.Entry::getValue));
}
```

在这里，_Ini_对象的_entrySet_本质上是_String_和_Map``<String, String>``_的键值对。_Ini_的内部表示几乎是一个_Map_，所以它很容易通过使用_stream()_和_toMap()_收集器转换为一个简单的_Map_。

我们现在可以使用_get()_从这个映射中读取节：

```
assertThat(result.get("fonts").get("letter"))
  .isEqualTo("bold");
```

_Ini_类开箱即用非常简单，转换为_Map_可能不是必需的，尽管我们稍后会找到它的用途。

然而，_ini4j_是一个旧的库，看起来维护得不是很好。让我们考虑另一个选项。

## 4. 使用Apache Commons解析INI文件

Apache Commons提供了一个更复杂的工具来处理INI文件。这个工具能够对整个文件进行读写建模，尽管我们只关注它的解析能力。

### 4.1. 安装Commons Configuration

让我们从在_pom.xml_中添加所需的依赖项开始：

```
`````<dependency>`````
    `````<groupId>`````org.apache.commons`````</groupId>`````
    `````<artifactId>`````commons-configuration2`````</artifactId>`````
    `````<version>`````2.8.0`````</version>`````
`````</dependency>`````
```

2.8.0版本在2022年更新，比_ini4j_更新。

### 4.2. 打开INI文件

我们可以通过声明一个_INIConfiguration_对象并传递一个_Reader_来打开INI文件：

```
INIConfiguration iniConfiguration = new INIConfiguration();
try (FileReader fileReader = new FileReader(fileToParse)) {
    iniConfiguration.read(fileReader);
}
```

这里我们使用了try-with-resources模式来打开一个_FileReader_，然后要求_INIConfiguration_对象使用_read_函数读取它。

### 4.3. 读取节中的键

_INIConfiguration_类有一个_getSection()_函数来读取一个节，以及返回对象上的_getProperty()_函数来读取一个键：

```
String value = iniConfiguration.getSection("fonts")
  .getProperty("letter")
  .toString();
assertThat(value)
  .isEqualTo("bold");
```

我们应该注意_getProperty()_返回的是_Object_而不是_String_，所以需要转换为_String_。

### 4.4. 转换为Map

我们也可以像以前一样将_INIConfiguration_转换为_Map_。这比使用_ini4j_要复杂一些：

```
Map``<String, Map``<String, String>````> iniFileContents = new HashMap<>();
for (String section : iniConfiguration.getSections()) {
    Map``<String, String>`` subSectionMap = new HashMap<>();
    SubnodeConfiguration confSection = iniConfiguration.getSection(section);
    Iterator`<String>` keyIterator = confSection.getKeys();
    while (keyIterator.hasNext()) {
        String key = keyIterator.next();
        String value = confSection.getProperty(key).toString();
        subSectionMap.put(key, value);
    }
    iniFileContents.put(section, subSectionMap);
}
```

要获取所有节，我们需要使用_getSections()_来找到它们的名称。然后_getSection()_可以给我们每个节。

然后我们可以使用提供节的所有键的_Iterator_，并使用每个_getProperty()_来获取键值对。

虽然在这里生成_Map_更困难，但更简单的数据结构的优势是我们可以隐藏INI文件解析系统其他部分的解析。或者，我们可以将配置转换为POJO。

## 5. 将INI文件转换为POJO

我们可以使用Jackson将我们的_Map_结构转换为POJO。我们可以用反序列化注释装饰我们的POJO，以帮助Jackson理解原始INI文件中各种命名约定。

### 5.1. 导入Jackson

我们需要在_pom.xml_中添加Jackson：

```
`````<dependency>`````
    `````<groupId>`````com.fasterxml.jackson.core`````</groupId>`````
    `````<artifactId>`````jackson-annotations`````</artifactId>`````
    `````<version>`````2.13.1`````</version>`````
`````</dependency>`````
`````<dependency>`````
    `````<groupId>`````com.fasterxml.jackson.core`````</groupId>`````
    `````<artifactId>`````jackson-core`````</artifactId>`````
    `````<version>`````2.13.1`````</version>`````
`````</dependency>`````
`````<dependency>`````
    `````<groupId>`````com.fasterxml.jackson.core`````</groupId>`````
    `````<artifactId>`````jackson-databind`````</artifactId>`````
    `````<version>`````2.13.1`````</version>`````
`````</dependency>`````
```

### 5.2. 定义一些POJOs

我们的示例文件的_fonts_节使用kebab-case为其属性。让我们定义一个类来表示该节：

```
@JsonNaming(PropertyNamingStrategies.KebabCaseStrategy.class)
public static class Fonts {
    private String letter;
    private int textSize;

    // getters and setters
}
```

这里我们使用了_JsonNaming_注解来描述属性中使用的案例。

类似地，_RequestResult_节的属性使用大驼峰命名法：

```
@JsonNaming(PropertyNamingStrategies.UpperCamelCaseStrategy.class)
public static class RequestResult {
    private int requestCode;

    // getters and setters
}
```

节名本身是各种情况，所以我们可以在父对象中声明每个节，使用_JsonProperty_注释来显示与默认小驼峰命名法的偏差：

```
public class MyConfiguration {
    private Fonts fonts;
    private Background background;

    @JsonProperty("RequestResult")
    private RequestResult requestResult;

    @JsonProperty("ResponseResult")
    private ResponseResult responseResult;

    // getters and setters
}
```

### 5.3. 从Map转换为POJO

现在我们有能力使用我们的库之一将INI文件读取为_Map_，并且能够将文件内容建模为POJO，我们可以使用Jackson的_ObjectMapper_来执行转换：

```
ObjectMapper objectMapper = new ObjectMapper();
Map``<String, Map``<String, String>````> iniKeys = parseIniFile(TEST_FILE);
MyConfiguration config = objectMapper.convertValue(iniKeys, MyConfiguration.class);
```

让我们检查整个文件是否正确加载：

```
assertThat(config.getFonts().getLetter()).isEqualTo("bold");
assertThat(config.getFonts().getTextSize()).isEqualTo(28);
assertThat(config.getBackground().getColor()).isEqualTo("white");
assertThat(config.getRequestResult().getRequestCode()).isEqualTo(1);
assertThat(config.getResponseResult().getResultCode()).isZero();
```

我们应该注意，数字属性，如_textSize_和_requestCode_已加载到我们的POJO中作为数字属性，例如_textSize_和_requestCode_，已经被加载到我们的POJO中为数字。

## 6. 库和方法的比较

_ini4j_库非常容易使用，本质上是一个简单的_Map_结构。然而，这是一个没有定期更新的旧库。

Apache Commons解决方案功能更全面，并且有定期更新，但使用起来需要更多的工作。

## 7. 结论

在本文中，我们看到了如何使用几个开源库来读取INI文件。我们看到了如何读取单个键以及如何遍历整个文件以生成_Map_。

然后我们看到了如何使用Jackson将_Map_转换为POJO。

像往常一样，示例代码可以在GitHub上找到。

[给Kimi加油](kimi://action?name=cheer-on-kimi)

OK