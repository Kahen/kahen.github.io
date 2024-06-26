---
date: 2024-06-26
category:
  - Java
  - Error Prone
tag:
  - Error Prone
  - Java库
head:
  - - meta
    - name: keywords
      content: Error Prone, Java, 代码质量, 编译期错误检测
---

# 使用Java中的Error Prone库捕获常见错误 | Baeldung

## **1. 引言**

**确保代码质量对我们应用程序的成功部署至关重要。** 错误和缺陷的存在可能会显著妨碍软件的功能和稳定性。这里有一个有价值的工具可以帮助识别这些错误：Error Prone。

Error Prone是由Google维护并内部使用的一个库。它帮助Java开发者在编译阶段检测和修复常见的编程错误。

在本教程中，我们将探索Error Prone库的功能，从安装到定制，以及它在提高代码质量和健壮性方面提供的好处。

## **2. 安装**

该库可在Maven中央仓库中获取。我们将添加一个新的构建配置，以配置我们的应用程序编译器运行Error Prone检查：

```xml
``<build>``
    ``<plugins>``
        ``<plugin>``
            ````````<groupId>````````org.apache.maven.plugins````````</groupId>````````
            ````````<artifactId>````````maven-compiler-plugin````````</artifactId>````````
            ```````<version>```````3.12.1```````</version>```````
            ``<configuration>``
                `<release>`17`</release>`
                `<encoding>`UTF-8`</encoding>`
                ``<compilerArgs>``
                    ````````````<arg>````````````-XDcompilePolicy=simple````````````</arg>````````````
                    ````````````<arg>````````````-Xplugin:ErrorProne````````````</arg>````````````
                ``</compilerArgs>``
                ```<annotationProcessorPaths>```
                    ```<path>```
                        ````````<groupId>````````com.google.errorprone````````</groupId>````````
                        ````````<artifactId>````````error_prone_core````````</artifactId>````````
                        ```````<version>```````2.23.0```````</version>```````
                    ``</path>``
                ``</annotationProcessorPaths>``
            ``</configuration>``
        ``</plugin>``
    ``</plugins>``
``</build>``
```

由于JDK内部的强封装在版本16中增加，我们需要添加一些标志以允许插件运行。一种选择是创建一个新文件`.mvn/jvm.config`（如果尚不存在）并添加插件所需的标志：

```shell
--add-exports jdk.compiler/com.sun.tools.javac.api=ALL-UNNAMED
--add-exports jdk.compiler/com.sun.tools.javac.file=ALL-UNNAMED
--add-exports jdk.compiler/com.sun.tools.javac.main=ALL-UNNAMED
--add-exports jdk.compiler/com.sun.tools.javac.model=ALL-UNNAMED
--add-exports jdk.compiler/com.sun.tools.javac.parser=ALL-UNNAMED
--add-exports jdk.compiler/com.sun.tools.javac.processing=ALL-UNNAMED
--add-exports jdk.compiler/com.sun.tools.javac.tree=ALL-UNNAMED
--add-exports jdk.compiler/com.sun.tools.javac.util=ALL-UNNAMED
--add-opens jdk.compiler/com.sun.tools.javac.code=ALL-UNNAMED
--add-opens jdk.compiler/com.sun.tools.javac.comp=ALL-UNNAMED
```

如果我们的`maven-compiler-plugin`使用外部可执行文件或启用了`maven-toolchains-plugin`，我们应该将`exports`和`opens`作为`compilerArgs`添加：

```xml
``<compilerArgs>``
    `<!-- ... -->`
    ````````````<arg>````````````-J--add-exports=jdk.compiler/com.sun.tools.javac.api=ALL-UNNAMED````````````</arg>````````````
    ````````````<arg>````````````-J--add-exports=jdk.compiler/com.sun.tools.javac.file=ALL-UNNAMED````````````</arg>````````````
    ````````````<arg>````````````-J--add-exports=jdk.compiler/com.sun.tools.javac.main=ALL-UNNAMED````````````</arg>````````````
    ````````````<arg>````````````-J--add-exports=jdk.compiler/com.sun.tools.javac.model=ALL-UNNAMED````````````</arg>````````````
    ````````````<arg>````````````-J--add-exports=jdk.compiler/com.sun.tools.javac.parser=ALL-UNNAMED````````````</arg>````````````
    ````````````<arg>````````````-J--add-exports=jdk.compiler/com.sun.tools.javac.processing=ALL-UNNAMED````````````</arg>````````````
    ````````````<arg>````````````-J--add-exports=jdk.compiler/com.sun.tools.javac.tree=ALL-UNNAMED````````````</arg>````````````
    ````````````<arg>````````````-J--add-exports=jdk.compiler/com.sun.tools.javac.util=ALL-UNNAMED````````````</arg>````````````
    ````````````<arg>````````````-J--add-opens=jdk.compiler/com.sun.tools.javac.code=ALL-UNNAMED````````````</arg>````````````
    ````````````<arg>````````````-J--add-opens=jdk.compiler/com.sun.tools.javac.comp=ALL-UNNAMED````````````</arg>````````````
``</compilerArgs>``
```

## **3. 错误模式**

识别和理解常见的错误模式对于维护我们软件的稳定性和可靠性至关重要。通过在我们的开发过程中早期识别这些模式，我们可以积极地实施预防策略并提高我们代码的整体质量。

### **3.1. 预定义的错误模式**

**插件包含500多个预定义的错误模式。** 其中一个错误是DeadException，我们将以它为例：

```java
public static void main(String[] args) {
    if (args.length == 0 || args[0] != null) {
        new IllegalArgumentException();
    }
    // 其他使用args[0]的操作
}
```

在上面的代码中，我们要确保我们的程序接收到一个非空参数。否则，我们想要抛出一个_IllegalArgumentException_。然而，由于疏忽，我们只是创建了异常而忘记抛出它。在许多情况下，如果没有错误检查工具，这种情况可能会被忽视。

我们可以使用_maven clean verify_命令在我们的代码上运行Error Prone检查。如果我们这样做，我们将得到以下编译错误：

```shell
[ERROR] /C:/Dev/incercare_2/src/main/java/org/example/Main.java:[6,12] [DeadException] 异常创建但未抛出
    (查看 https://errorprone.info/bugpattern/DeadException)
  您是否意味着 'throw new IllegalArgumentException();'?
```

我们可以看到插件不仅检测到了我们的错误，还为我们提供了解决方案。

### **3.2. 自定义错误模式**

**Error Prone的另一个显著特性是其支持创建自定义错误检查器。** 这些自定义错误检查器使我们能够将工具定制到我们的特定代码库，并有效地解决特定领域的问题是。

要创建我们的自定义检查，我们需要初始化一个新项目。让我们称它为_my-bugchecker-plugin_。我们将通过添加错误检查器的配置来开始：

```xml
``<build>``
    ``<plugins>``
        ``<plugin>``
            ````````<groupId>````````org.apache.maven.plugins````````</groupId>````````
            ````````<artifactId>````````maven-compiler-plugin````````</artifactId>````````
            ```````<version>```````3.12.1```````</version>```````
            ``<configuration>``
                ```<annotationProcessorPaths>```
                    ```<path>```
                        ````````<groupId>````````com.google.auto.service````````</groupId>````````
                        ````````<artifactId>````````auto-service````````</artifactId>````````
                        ```````<version>```````1.0.1```````</version>```````
                    ``</path>``
                ``</annotationProcessorPaths>``
            ``</configuration>``
        ``</plugin>``
    ``</plugins>``
``</build>``

`<dependencies>`
    ```<dependency>```
        ````````<groupId>````````com.google.errorprone````````</groupId>````````
        ````````<artifactId>````````error_prone_annotation````````</artifactId>````````
        ```````<version>```````2.23.0```````</version>```````
    ```</dependency>```
    ```<dependency>```
        ````````<groupId>````````com.google.errorprone````````</groupId>````````
        ````````<artifactId>````````error_prone_check_api````````</artifactId>````````
        ```````<version>```````2.23.0```````</version>```````
    ```</dependency>```
    ```<dependency>```
        ````````<groupId>````````com.google.auto.service````````</groupId>````````
        ````````<artifactId>````````auto-service-annotations````````</artifactId>````````
        ```````<version>```````1.0.1```````</version>```````
    ```</dependency>```
`</dependencies>`
```

这次我们添加了一些额外的依赖项。正如我们所看到的，除了Error Prone依赖项之外，我们还添加了Google AutoService。Google AutoService是由Google Auto项目开发的开源代码生成器工具。这将发现并加载我们的自定义检查。

现在我们将创建我们的自定义检查，它将验证我们的代码库中是否有任何空方法：

```java
@AutoService(BugChecker.class)
@BugPattern(name = "EmptyMethodCheck", summary = "空方法应该被删除", severity = BugPattern.SeverityLevel.ERROR)
public class EmptyMethodChecker extends BugChecker implements BugChecker.MethodTreeMatcher {

    @Override
    public Description matchMethod(MethodTree methodTree, VisitorState visitorState) {
        if (methodTree.getBody()
          .getStatements()
          .isEmpty()) {
            return describeMatch(methodTree, SuggestedFix.delete(methodTree));
        }
        return Description.NO_MATCH;
    }
}
```

首先，注解_BugPattern_包含名称、简短摘要和错误的严重性。接下来，BugChecker本身是_MethodTreeMatcher_的实现，因为我们想要匹配具有空主体的方法。最后，_matchMethod()_中的逻辑应该在方法树主体没有任何语句时返回匹配。

**要在另一个项目中使用我们的自定义错误检查器，我们应该将其编译成一个单独的JAR。** 我们通过运行_maven clean install_命令来完成。之后，我们应该通过将其添加到我们主项目的构建配置中的_annotationProcessorPaths_来包含生成的JAR作为依赖项：

```xml
```<annotationProcessorPaths>```
    ```<path>```
        ````````<groupId>````````com.google.errorprone````````</groupId>````````
        ````````<artifactId>````````error_prone_core````````</artifactId>````````
