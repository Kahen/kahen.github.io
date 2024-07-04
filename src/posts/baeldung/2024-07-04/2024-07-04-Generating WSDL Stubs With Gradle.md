---
date: 2023-06-01
category:
  - Java
  - Web Services
tag:
  - WSDL
  - Gradle
  - Web Services
head:
  - - meta
    - name: keywords
      content: WSDL, Gradle, Web Services, Java, Stubs Generation
---

# 使用Gradle生成WSDL存根

## 1. 概述

简单来说，**Web服务描述语言（WSDL）是一种基于XML的语言，用于描述Web服务提供的功能**。WSDL存根是从WSDL文件生成的代理类，使得与Web服务的交互更加容易，无需手动创建和管理SOAP消息。

在本教程中，我们将学习如何使用Gradle生成WSDL存根。同时，我们将看到一个示例WSDL文件并从中生成存根。

## 2. 示例设置

要开始生成，让我们创建一个新的Gradle项目，该项目从WSDL文件生成WSDL存根。接下来，我们将为WSDL文件创建目录结构：

```shell
$ mkdir -p src/main/resources/wsdl
```

我们将使用一个公共WSDL文件，该文件将数字转换为其文字等价物。让我们下载WSDL文件并将其放置在_wdsl_文件夹中：

```shell
$ curl -o src/main/resources/wsdl/NumberConversion.wsdl https://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL
```

上述命令从_dataacess.com_下载WSDL文件并将其放置在指定的文件夹中。

在下一节中，我们将配置_build.gradle_以生成我们可以在示例程序中交互的类。

## 3. Gradle配置

要从WSDL文件生成Java类，我们需要一个使用Apache CXF库的插件。这样的插件之一是_com.github.bjornvester.wsdl2java_，我们将在本教程中使用。这个插件简化了过程，并允许我们配置_gradle.build_：

```groovy
plugins {
    id 'java'
    id("com.github.bjornvester.wsdl2java") version "1.2"
}
```

项目需要两个插件。Java插件帮助我们编译代码、运行测试和创建JAR文件。WSDL插件帮助我们从WSDL文件生成Java类。我们知道，WSDL文件是描述Web服务的XML文档。

我们可以使用_wsdl2java_扩展配置WSDL插件：

```groovy
wsdl2java {
    // ...
}
```

此外，我们可以配置CXF版本：

```groovy
wsdl2java {
    cxfVersion.set("3.4.4")
}
```

**默认情况下，插件在_resources_文件夹中为所有WSDL文件创建存根**。我们还可以通过指定其位置来配置它以创建特定WSDL文件的存根：

```groovy
wsdl2java {
    // ...
    includes = [
        "src/main/resources/wsdl/NumberConversion.wsdl",
    ]
    // ...
}
```

**此外，生成的类保存在_build/generated/sources/wsdl2java_文件夹中**，但我们可以通过指定自己的文件夹来覆盖它：

```groovy
wsdl2java {
    // ...
    generatedSourceDir.set(layout.projectDirectory.dir("src/generated/wsdl2java"))
    // ...
}
```

在上面的代码中，我们指定了存储生成类的地点，而不是使用默认文件夹。

配置完成后，我们需要运行Gradle _wsdl2java_命令以生成存根：

```shell
$ ./gradlew wsdl2java
```

上面的命令生成了Java类，我们现在可以在程序中与它们交互。

## 4. 从WSDL文件生成WSDL存根

首先，让我们检查我们示例项目的_build.gradle_文件：

```groovy
plugins {
    id 'java'
    id("com.github.bjornvester.wsdl2java") version "1.2"
}
repositories {
    mavenCentral()
}
dependencies {
    implementation 'com.sun.xml.ws:jaxws-ri:4.0.1'
    testImplementation 'org.junit.jupiter:junit-jupiter-api:5.8.2'
    testRuntimeOnly 'org.junit.jupiter:junit-jupiter-engine:5.8.2'
}
test {
    useJUnitPlatform()
}
wsdl2java {
    cxfVersion.set("3.4.4")
}
```

上面的示例代码展示了如何配置WSDL插件以使用CXF版本3.4.4。插件在默认位置生成存根，并在_src/main/resources/wsdl_中查找WSDL文件。这是我们之前放置WSDL文件的地方。

此外，我们需要Java API for XML Web Services (JAX-WS)依赖项来与服务交互并执行单元测试。

要从WSDL文件生成Java类，我们可以执行Gradle _wsdl2java_命令：

```shell
$ ./gradlew wsdl2java
```

这里是生成的Java类：

![img](https://www.baeldung.com/wp-content/uploads/2023/06/stubs-generated-from-wsdl.png)

生成的类存储在默认位置。接下来，让我们通过编写单元测试与类交互：

```java
@Test
public void givenNumberConversionService_whenConvertingNumberToWords_thenReturnCorrectWords() {
    NumberConversion service = new NumberConversion();
    NumberConversionSoapType numberConversionSoapType = service.getNumberConversionSoap();
    String numberInWords = numberConversionSoapType.numberToWords(BigInteger.valueOf(10000000));

    assertEquals("ten million", numberInWords);
}
```

在上面的示例单元测试中，我们创建了一个新的_NumberConversion_实例，并在_service_对象上调用_getNumberConversionSoap()_方法以获取对_NumberConversionSoapType_对象的引用。

此外，我们在_numberConversionSoapType_上调用_numberToWords()_方法，并将值_1000000_作为参数传递。

最后，我们断言预期值等于输出。

## 5. 结论

在本文中，我们学习了如何使用Gradle生成WSDL存根。此外，我们看到了如何自定义插件配置，例如指定CXF版本和生成类的输出目录。我们还讨论了如何通过编写单元测试与生成的类交互。

如常，示例的完整源代码可在GitHub上找到。

OK