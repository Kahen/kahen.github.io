---
date: 2021-07-28
category:
  - Java
  - Maven
tag:
  - Maven
  - Source Directories
head:
  - - meta
    - name: keywords
      content: Maven, Source Directories, Java Project
---
# Maven中添加额外源目录

在本教程中，我们将解释如何在基于Maven的Java项目中添加多个源目录。

假设我们需要在_src/main_中添加一个_/newsrc_源目录：

首先，让我们在_src/main/newsrc/_文件夹中创建一个简单的Java类文件_DataConnection.java_：

```java
public class DataConnection {
    public static String temp() {
        return "secondary source directory";
    }
}
```

之后，让我们在_src/main/java_目录中创建另一个使用我们在另一个文件夹中创建的_DataConnection_类的类文件：

```java
public class MainApp {
    public static void main(String args[]){
        System.out.println(DataConnection.temp());
    }
}
```

在尝试编译我们的Maven项目之前，让我们快速查看项目的目录结构：

现在，**如果我们尝试编译它，我们将得到一个编译错误**：

```plaintext
[ERROR] BuilderHelper/src/main/java/com/baeldung/maven/plugin/MainApp.java:[3,29] package com.baeldung.database does not exist
[ERROR] BuilderHelper/src/main/java/com/baeldung/database/MainApp.java:[9,28] cannot find symbol
[ERROR] symbol: variable DataConnection
[ERROR] location: class com.baeldung.MainApp
```

我们可以明白错误信息的根本原因——我们在一般项目目录配置之外定义了_DataConnection_类。

**Maven默认只支持一个源文件夹**。要配置多个源目录，**我们需要使用一个名为_build-helper-maven-plugin_的Maven插件**。

### 3. 使用_build-helper-maven-plugin_添加源目录

我们将使用_build-helper-maven-plugin_来添加源目录以解决上述错误。这个插件帮助我们用最少的配置实现我们的目标。

由于我们有一个与_src/main_文件夹相邻的兄弟目录，我们现在将**添加第二个源目录**：

```xml
`<build>`
    `<plugins>`
        `<plugin>`
            `<groupId>`org.codehaus.mojo`</groupId>`
            `<artifactId>`build-helper-maven-plugin`</artifactId>`
            `<version>`3.2.0`</version>`
            `<executions>`
                `<execution>`
                    `<id>`add-source`</id>`
                    `<phase>`generate-sources`</phase>`
                    `<goals>`
                        `<goal>`add-source`</goal>`
                    `</goals>`
                    `<configuration>`
                        `<sources>`
                            `<source>`src/main/newsrc/`</source>`
                        `</sources>`
                    `</configuration>`
                `</execution>`
            `</executions>`
        `</plugin>`
    `</plugins>`
`</build>`
```

在这里，我们在_generate-sources_阶段运行了_add-source_目标。我们还在一个_configuration.sources.source_标签中指定了源目录。

我们知道，Maven的默认生命周期包含编译之前的几个阶段：_validate_, _initialize_, _generate-sources_, _process-sources_, _generate-resources_, _process-resources_, 和 _compile_。所以，在这里，我们在Maven编译源代码之前添加了一个新的源目录。

现在，我们将编译项目，然后构建成功。之后，**当我们检查目标文件夹时，我们将看到插件从两个源目录生成了类**：

我们可以在Maven Central上找到这个插件的最新版本。**我们在示例中只添加了一个源目录，但插件允许我们添加任意多个**。

### 4. 结论

在本教程中，我们学习了如何使用_build-helper-maven-plugin_添加多个源目录。

如往常一样，示例的完整源代码可在GitHub上找到。