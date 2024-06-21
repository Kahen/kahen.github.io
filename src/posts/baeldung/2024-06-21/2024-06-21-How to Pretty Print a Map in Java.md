---
date: 2024-06-22
category:
  - Java
  - 教程
tag:
  - Java
  - 地图
  - 格式化输出
head:
  - - meta
    - name: keywords
      content: Java, 地图, 格式化, 教程, 打印
---
# Java中漂亮打印Map的方法

漂亮打印Java中的`Map`涉及到以一种视觉上吸引人且易于阅读的方式格式化和显示Map中的键值对。尽管Java没有提供内置的漂亮打印Map的方法，我们必须实现自定义解决方案。

在本教程中，我们将学习如何实现这一目标。根据我们的偏好和详细程度，我们将探索使用标准JDK和外部库的多种方法。

## 2. 创建一个`Map`
在我们继续之前，让我们创建一个Map来操作：
```java
Map`<String, Object>` map = Map.of(
  "one", 1,
  "two", 2,
  "inner", Map.of(
    "ten", 10,
    "eleven", 11
  )
);
```
值得注意的是，我们通过添加一个内部嵌套的Map扩展了我们的示例。

## 3. 使用核心Java
正如我们所知，Java可以使用内置的`toString()`方法打印Map：
```java
{one=1, two=2, inner={eleven=11, ten=10}}
```
输出以简单的方式预格式化，在单行上用逗号分隔显示键值对。这对于简单的Map或在调试期间工作得很好。

但如果我们想要一个漂亮的打印Map，我们必须实现自定义方法。

### 3.1. 使用`for`-each循环
当我们需要遍历所有元素时，我们可以使用`for`-each循环：
```java
for (Map.Entry````<?, ?>```` entry : map.entrySet()) {
    System.out.printf("%-15s : %s%n", entry.getKey(), entry.getValue());
}
```
这个循环将打印：
```java
one             : 1
two             : 2
inner           : {ten=10, eleven=11}
```
现在输出看起来更好了，但我们的内部Map仍然没有被漂亮打印，因此我们必须手动处理复杂结构。

为了格式化我们的内部条目，让我们实现一个带有递归和左填充参数的辅助函数：
```java
void printMap(int leftPadding, Map````<?, ?>```` map) {
    for (Map.Entry````<?, ?>```` entry : map.entrySet()) {
        if (entry.getValue() instanceof Map) {
            System.out.printf("%-15s :%n", entry.getKey());
            printMap(leftPadding + 4, (Map````<?, ?>````) entry.getValue());
        } else {
            System.out.printf("%" + (leftPadding > 0 ? leftPadding : "") + "s" // 添加填充
              + "%-15s : %s%n",
              "", entry.getKey(), entry.getValue());
        }
    }
}
```
现在，如果我们通过调用`printMap(0, map)`执行该方法，它将打印：
```java
one             : 1
two             : 2
inner           
    ten             : 10
    eleven          : 11
```

通过实现我们的自定义解决方案，我们将始终在打印我们的Map时拥有完全的控制权。我们可以使用内置的格式化程序，如`Formatter`类、`String.format()`，甚至`System.out.printf()`来自定义我们的输出。另一方面，如果我们想要处理多类型或内部结构，自定义函数可能会有点复杂。

### 3.2. 使用`Stream`
在Java中，我们几乎可以将任何`for`-each循环替换为`Stream`。我们可以用一行来打印和格式化我们的Map：
```java
map.forEach((k, v) -> System.out.printf("%-15s : %s%n", k, v));
```

如果我们想要更多的控制，我们可以扩展流，并使用`map()`或`Collectors.joining()`函数：
```java
System.out.println(MAP.entrySet().stream()
  .map(entry -> String.format("%-15s : %s", entry.getKey(), entry.getValue()))
  .collect(Collectors.joining("\n")));
```

在这两个例子中，我们都将得到：
```java
one             : 1
two             : 2
inner           : {ten=10, eleven=11}
```

再次，这种方法为我们提供了更多的格式化控制，并且非常适合简单类型。我们必须记住**手动处理任何复杂结构**，就像我们之前做的那样。

## 4. 外部库
实现自定义的漂亮打印功能可能是一个不错的选择，如果我们没有复杂的Map。任何额外的映射都会使我们的代码更加复杂，不值得实现。让我们检查外部库提供的解决方案。

### 4.1. Jackson
如果我们比较JSON和Map，我们可以发现许多相似之处。在这两种情况下，键值对都被用来表示条目。

首先，让我们通过在`pom.xml`中包含它的依赖来检查Jackson，这是最受欢迎的JSON库之一：
```xml
````<dependency>````
    ````<groupId>````com.fasterxml.jackson.core````</groupId>````
    ````<artifactId>````jackson-databind````</artifactId>````
    ````<version>````2.16.1````</version>````
````</dependency>````
```

Jackson提供了一个`ObjectMapper`类，不仅可以用于处理JSON，还可以用于处理标准Map：
```java
String json = new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(map);
```

结果，Jackson API漂亮地打印了我们的Map：
```java
{
  "one" : 1,
  "two" : 2,
  "inner" : {
    "ten" : 10,
    "eleven" : 11
  }
}
```

这个解决方案**自动处理了我们的内部Map，并且比以前的方法简单得多**。不幸的是，**我们对映射没有完全的控制**。

### 4.2. Gson
当然，其他JSON库也支持Map进行漂亮打印。让我们通过添加最新版本的依赖来检查Gson：
```xml
````<dependency>````
    ````<groupId>````com.google.code.gson````</groupId>````
    ````<artifactId>````gson````</artifactId>````
    ````<version>````2.10.1````</version>````
````</dependency>````
```

就像我们之前做的那样，让我们配置一个`GsonBuilder`：
```java
String json = new GsonBuilder().setPrettyPrinting().create().toJson(MAP);
```

这是现在的结果：
```java
{
  "one": 1,
  "two": 2,
  "inner": {
    "ten": 10,
    "eleven": 11
  }
}
```

值得注意的是，我们有稍微不同的格式化（键后没有空格），但再次，**它更容易进行漂亮打印Map支持嵌套值**。

### 4.3. Apache Commons Collections
当我们知道JSON库通常支持JSON和Map进行漂亮打印时，让我们探索非JSON库提供的其他解决方案。

让我们通过向我们的项目添加依赖来检查Apache Commons Collections：
```xml
````<dependency>````
    ````<groupId>````org.apache.commons````</groupId>````
    ````<artifactId>````commons-collections4````</artifactId>````
    ````<version>````4.4````</version>````
````</dependency>````
```

该库为我们带来了`MapUtils`类。让我们使用它来打印我们的Map：
```java
MapUtils.debugPrint(System.out, "map", map);
```

结果，我们将得到这样的格式化Map：
```java
map =
{
    one = 1 java.lang.Integer
    two = 2 java.lang.Integer
    inner =
    {
        ten = 10 java.lang.Integer
        eleven = 11 java.lang.Integer
    } java.util.HashMap
} java.util.HashMap
```

我们刚刚使用了一个`debugPrint()`方法来格式化Map。如果我们想要省略我们的值的类名，我们可以使用一个`verbosePrint()`。

### 4.4. Google Guava
最后，让我们检查Google Guava库提供的方法。在开始之前，让我们更新我们的`pom.xml`：
```xml
````<dependency>````
    ````<groupId>````com.google.guava````</groupId>````
    ````<artifactId>````guava````</artifactId>````
    ````<version>````33.0.0-jre````</version>````
````</dependency>````
```

要打印我们的Map，我们可以使用`Joiner`类：
```java
String mapStr = Joiner.on(",\n").withKeyValueSeparator("=").join(map);
```

如果我们现在检查结果，我们将得到：
```java
one=1,
two=2,
inner={ten=10, eleven=11}
```

不幸的是，这种方法**不能处理嵌套条目**，但它适用于单级结构。

## 5. 结论
在这篇文章中，我们学习了在Java中漂亮打印Map的不同方法。我们知道，使用内置的`toString()`方法打印可能会产生一个难以阅读的单行字符串。

我们首先使用标准Java API实现了自定义的漂亮打印方法，特别是`for`-each循环、流和格式化程序。这种方法适合我们，如果我们有简单的、非嵌套的Map或者想要对映射有完全的控制。

之后，我们检查了像Jackson、Gson、Apache Commons Collections或Guava这样的外部库提供的解决方案。外部API总是比实现自定义解决方案**更简单**，但我们对预定义的打印格式**控制较少**。

一如既往，伴随文章的源代码可以在GitHub上找到。