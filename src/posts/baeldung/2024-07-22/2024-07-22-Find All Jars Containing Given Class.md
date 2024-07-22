---
date: 2022-04-01
category:
  - Java
  - Maven
tag:
  - Java
  - Maven
  - JAR
  - Classpath
head:
  - - meta
    - name: keywords
      content: Java, Maven, JAR, Classpath
------
# 查找包含特定类的JAR文件

## 1. 引言

在本文中，我们将学习如何查找包含特定类的JAR文件。我们将使用两种不同的方法来演示，即基于命令的方法和基于程序的方法。

## **2. 基于命令的方法**

在这种方法中，我们将使用shell命令来识别本地Maven仓库中包含_ObjectMapper_类的JAR文件。让我们首先编写一个脚本来识别JAR中的类。该脚本使用_jar_和_grep_命令来打印相应的JAR：

```
jar -tf $1 | grep $2 && echo "Found in : $1"
```

这里$1是JAR文件路径，$2是类名。在这种情况下，类名始终是_com.fasterxml.jackson.databind.ObjectMapper_。让我们将上述命令保存在bash文件_findJar.sh_中。之后，我们将运行以下_find_命令在本地Maven仓库中，使用_findJar.sh_来获取结果JAR：

```
$ find ~/.m2/repository -type f -name '*.jar' -exec ./findJar.sh {} com.fasterxml.jackson.databind.ObjectMapper \;
com/spotify/docker/client/shaded/com/fasterxml/jackson/databind/ObjectMapper$1.class
com/spotify/docker/client/shaded/com/fasterxml/jackson/databind/ObjectMapper$2.class
com/spotify/docker/client/shaded/com/fasterxml/jackson/databind/ObjectMapper$3.class
com/spotify/docker/client/shaded/com/fasterxml/jackson/databind/ObjectMapper$DefaultTypeResolverBuilder.class
com/spotify/docker/client/shaded/com/fasterxml/jackson/databind/ObjectMapper$DefaultTyping.class
com/spotify/docker/client/shaded/com/fasterxml/jackson/databind/ObjectMapper.class
Found in : /home/user/.m2/repository/com/spotify/docker-client/8.16.0/docker-client-8.16.0-shaded.jar
com/fasterxml/jackson/databind/ObjectMapper$1.class
com/fasterxml/jackson/databind/ObjectMapper$2.class
com/fasterxml/jackson/databind/ObjectMapper$3.class
com/fasterxml/jackson/databind/ObjectMapper$DefaultTypeResolverBuilder.class
com/fasterxml/jackson/databind/ObjectMapper$DefaultTyping.class
com/fasterxml/jackson/databind/ObjectMapper.class
Found in : /home/user/.m2/repository/com/fasterxml/jackson/core/jackson-databind/2.12.3/jackson-databind-2.12.3.jar
```

## 3. 基于程序的方法

在基于程序的方法中，**我们将编写一个Java类来在Java类路径中查找_ObjectMapper_类。** 我们可以像以下程序所示显示JAR：

```java
public class App {
    public static void main(String[] args) {
        Class klass = ObjectMapper.class;
        URL path = klass.getProtectionDomain().getCodeSource().getLocation();
        System.out.println(path);
    }
}
```

输出：

```
file:/Users/home/.m2/repository/com/fasterxml/jackson/core/jackson-databind/2.12.3/jackson-databind-2.12.3.jar
```

这里我们看到每个_Class_类都有_getProtectionDomain().getCodeSource().getLocation()_。这个方法提供了包含所需类的JAR文件。因此，我们可以使用它来获取包含类的JAR文件。

## 4. 结论

在本文中，我们学习了从JAR列表中查找类的命令和程序方法。

首先我们从一个示例开始。之后，我们探索了一种基于命令的方法来从本地Maven仓库中识别给定的类。然后，在第二种方法中，我们学习了如何编写程序来从运行时的类路径中找到用于实例化类的JAR。

两种方法都很有效，但它们各自有自己的用例。