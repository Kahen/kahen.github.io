---
date: 2022-04-01
category:
  - Java
  - MapStruct
tag:
  - Enum Mapping
  - Exception Handling
head:
  - - meta
    - name: keywords
      content: MapStruct, Enum, Java, Exception
------
# 使用MapStruct为枚举映射时抛出异常处理意外输入

在这个教程中，我们将看到如何使用MapStruct将一个枚举的值映射到另一个枚举的值。我们还将学习当另一个枚举中没有对应的值时如何抛出异常。

## 2. MapStruct库
**MapStruct是一个代码生成工具，简化了Java Bean的映射。** 最新版本的MapStruct库可以在Maven中央仓库中找到。

让我们将依赖项添加到我们的_pom.xml_：

```xml
`<dependency>`
    ```<groupId>```org.mapstruct```</groupId>```
    ```<artifactId>```mapstruct```</artifactId>```
    ```<version>```1.6.0.Beta1```</version>```
`</dependency>`
```

此外，我们需要在_maven-compiler-plugin_插件中添加_annotationProcessorPaths_以自动生成项目_target_文件夹中的方法：

```xml
`<plugin>`
    ```<groupId>```org.apache.maven.plugins```</groupId>```
    ```<artifactId>```maven-compiler-plugin```</artifactId>```
    ```<version>```3.5.1```</version>```
    `<configuration>`
        `<source>`1.8`</source>`
        `<target>`1.8`</target>`
        `<annotationProcessorPaths>`
            `<path>`
                ```<groupId>```org.mapstruct```</groupId>```
                ```<artifactId>```mapstruct```</artifactId>```
                ```<version>```1.6.0.Beta1```</version>```
            `</path>`
        `</annotationProcessorPaths>`
    `</configuration>`
`</plugin>`
```

## 3. 问题介绍

首先，让我们创建我们的源枚举。我们将命名为_InputLevel_，它将有三个可能的值：_LOW_，_MEDIUM_和_HIGH_：

```java
enum InputLevel {
    LOW, MEDIUM, HIGH
}
```

现在我们可以添加目标枚举。这个只包含两个值_HIGH_和_LOW_：

```java
enum OutputLevel {
    LOW, HIGH
}
```

我们的目标是将_InputLevel_转换为_OutputLevel_。例如，输入_InputLevel.LOW_给我们_OutputLevel.LOW_。**然而，没有匹配的值对应于_MEDIUM_。** 因此，在这种情况下，我们想要抛出一个异常。

## 4. 当源没有对应的目标时抛出异常

我们将使用_Mapper_注解并创建一个映射器接口。**从MapStruct库的1.5.0.Beta1版本开始，我们可以使用_@ValueMapping_注解来实现我们的目标：**

```java
@Mapper
interface LevelMapper {
    @ValueMapping(source = MappingConstants.ANY_REMAINING, target = MappingConstants.THROW_EXCEPTION)
    OutputLevel inputLevelToOutputLevel(InputLevel inputLevel);
}
```

正如我们所看到的，我们配置了注解，以便在源中映射任何没有对应目标的值将导致一个异常。

现在让我们快速检查一下，当给定_InputLevel.HIGH_时，该方法是否正确返回_OutputLevel.HIGH_：

```java
LevelMapper levelMapper = Mappers.getMapper(LevelMapper.class);

@Test
void givenHighInputLevel_WhenInputLevelToOutputLevel_ThenHighOutputLevel() {
    assertEquals(OutputLevel.HIGH, levelMapper.inputLevelToOutputLevel(InputLevel.HIGH));
}
```

最后，我们将确认当我们尝试将_InputLevel.MEDIUM_转换为_OutputLevel_时，会抛出一个异常。具体来说，它抛出了一个_IllegalArgumentException_：

```java
@Test
void givenMediumInputLevel_WhenInputLevelToOutputLevel_ThenThrows() {
    assertThrows(IllegalArgumentException.class, () -> levelMapper.inputLevelToOutputLevel(InputLevel.MEDIUM));
}
```

## 5. 结论

在本文中，我们使用MapStruct库将源枚举的值映射到目标枚举。此外，我们配置了我们的映射器，如果源值在目标枚举中没有匹配项，则抛出一个异常。

像往常一样，代码可以在GitHub上找到。