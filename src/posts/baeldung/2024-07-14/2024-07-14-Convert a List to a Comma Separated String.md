---
date: 2022-04-01
category:
  - Java
  - Lists
tag:
  - Java 8
  - String
  - List
head:
  - - meta
    - name: keywords
      content: Java, List, String, comma-separated, StringUtils, Apache Commons, Spring, Google Guava
---
# 将列表转换为逗号分隔的字符串

列表转换仍然是一个热门话题，因为这是Java开发人员经常进行的操作。在本教程中，我们将学习如何使用四种不同的方法将字符串列表转换为逗号分隔的字符串。

## 1. 引言

## 2. 使用Java 8+
我们将使用Java 8中可用的三个不同类及其方法进行转换。

让我们以下面的列表作为即将到来的例子的输入：

```java
List``<String>`` arraysAsList = Arrays.asList("ONE", "TWO", "THREE");
```

**首先，我们将使用String类，它具有许多用于字符串处理的实用程序，并提供了join()转换方法：**

```java
String commaSeparatedString = String.join(",", arraysAsList);

assertThat(commaSeparatedString).isEqualTo("ONE,TWO,THREE");
```

**其次，我们将使用StringJoiner类，它有一个构造函数，接受一个CharSequence分隔符作为参数：**

```java
StringJoiner stringJoiner = new StringJoiner(",");
arraysAsList.forEach(stringJoiner::add);
String commaSeparatedString = stringJoiner.toString();

assertThat(commaSeparatedString).isEqualTo("ONE,TWO,THREE");
```

**还有一个构造函数，它接受一个CharSequence分隔符，一个CharSequence作为前缀，另一个作为后缀：**

```java
StringJoiner stringJoinerWithDelimiterPrefixSuffix = new StringJoiner(",", "[", "]");
arraysAsList.forEach(stringJoinerWithDelimiterPrefixSuffix::add);
String commaSeparatedStringWithDelimiterPrefixSuffix = stringJoinerWithDelimiterPrefixSuffix.toString();

assertThat(commaSeparatedStringWithDelimiterPrefixSuffix).isEqualTo("[ONE,TWO,THREE]");
```

**第三，Collectors类提供了各种实用程序和joining()方法，具有不同的签名。**

首先，让我们看看如何将collect()方法应用到Stream上，使用Collectors.joining()方法，它以CharSequence分隔符作为输入：

```java
String commaSeparatedUsingCollect = arraysAsList.stream()
  .collect(Collectors.joining(","));

assertThat(commaSeparatedUsingCollect).isEqualTo("ONE,TWO,THREE");
```

接下来的例子中，我们将看到如何使用map()方法将列表中的每个对象转换为字符串，然后应用collect()和Collectors.joining()方法：

```java
String commaSeparatedObjectToString = arraysAsList.stream()
  .map(Object::toString)
  .collect(Collectors.joining(","));

assertThat(commaSeparatedObjectToString).isEqualTo("ONE,TWO,THREE");
```

接下来，我们将使用map()方法将列表元素转换为字符串，然后应用collect()和Collectors.joining()方法：

```java
String commaSeparatedStringValueOf = arraysAsList.stream()
  .map(String::valueOf)
  .collect(Collectors.joining(","));

assertThat(commaSeparatedStringValueOf).isEqualTo("ONE,TWO,THREE");
```

现在，让我们使用上述的map()，然后使用Collectors.joining()方法，该方法输入一个CharSequence分隔符，一个CharSequence作为前缀，和一个CharSequence作为后缀：

```java
String commaSeparatedStringValueOfWithDelimiterPrefixSuffix = arraysAsList.stream()
  .map(String::valueOf)
  .collect(Collectors.joining(",", "[", "]"));

assertThat(commaSeparatedStringValueOfWithDelimiterPrefixSuffix).isEqualTo("[ONE,TWO,THREE]");
```

最后，我们将看到如何使用reduce()方法而不是collect()来转换列表：

```java
String commaSeparatedUsingReduce = arraysAsList.stream()
  .reduce((x, y) -> x + "," + y)
  .get();

assertThat(commaSeparatedUsingReduce).isEqualTo("ONE,TWO,THREE");
```

## 3. 使用Apache Commons Lang
另外，我们也可以不使用Java的实用类，而是使用Apache Commons Lang库提供的实用类。

**我们必须在pom.xml文件中添加依赖以使用Apache的StringUtils类：**

```xml
```<dependency>```
    ```<groupId>```org.apache.commons```</groupId>```
    ```<artifactId>```commons-lang3```</artifactId>```
    ```<version>```3.14.0```</version>```
```</dependency>```
```

**join()方法有多种实现，它接受像一系列元素、值的Iterator，以及以多种形式的分隔符，如String或char：**

```java
String commaSeparatedString = StringUtils.join(arraysAsList, ",");
assertThat(commaSeparatedString).isEqualTo("ONE,TWO,THREE");
```

**如果传递给join()的信息是一个Object数组，它还接受一个int作为startIndex和一个int作为endIndex：**

```java
String commaSeparatedStringIndex = StringUtils.join(arraysAsList.toArray(), ",", 0, 3);
assertThat(commaSeparatedStringIndex).isEqualTo("ONE,TWO,THREE");
```

## 4. 使用Spring Core
Spring Core库同样提供了一个具有此类转换方法的实用类。

**我们首先在pom.xml文件中添加依赖以使用Spring的Core StringUtils类：**

```xml
```<dependency>```
    ```<groupId>```org.springframework```</groupId>```
    ```<artifactId>```spring-core```</artifactId>```
    ```<version>```5.3.22```</version>```
```</dependency>```
```

**Spring的Core StringUtils类提供了一个方法，collectionToCommaDelimitedString()，它以逗号作为默认分隔符，并接受一个Collection作为参数进行转换：**

```java
String collectionToCommaDelimitedString = StringUtils.collectionToCommaDelimitedString(arraysAsList);
assertThat(collectionToCommaDelimitedString).isEqualTo("ONE,TWO,THREE");
```

**第二个方法，collectionToDelimitedString()，接受一个Collection进行转换和一个String分隔符作为参数：**

```java
String collectionToDelimitedString = StringUtils.collectionToDelimitedString(arraysAsList, ",");
assertThat(collectionToDelimitedString).isEqualTo("ONE,TWO,THREE");
```

## 5. 使用Google Guava
最后，我们将使用Google Guava库。

**我们必须在pom.xml文件中添加依赖以使用Google的Guava Joiner类：**

```xml
```<dependency>```
    ```<groupId>```com.google.guava```</groupId>```
    ```<artifactId>```guava```</artifactId>```
    ```<version>```31.1-jre```</version>```
```</dependency>```
```

Google的Guava Joiner类提供了我们可以连续应用的多种方法。

**第一个方法是on()，它接受一个String作为分隔符参数，然后是join()方法，它接受一个Iterable作为要转换的值的参数：**

```java
String commaSeparatedString = Joiner.on(",")
  .join(arraysAsList);

assertThat(commaSeparatedString).isEqualTo("ONE,TWO,THREE");
```

让我们再举一个包含一些null值的列表的例子：

```java
List``<String>`` arraysAsListWithNull = Arrays.asList("ONE", null, "TWO", null, "THREE");
```

**鉴于此，我们可以在on()和join()之间使用其他方法，其中之一是skipNulls()方法。我们可以使用它来避免转换Iterable内的null值：**

```java
String commaSeparatedStringSkipNulls = Joiner.on(",")
  .skipNulls()
  .join(arraysAsListWithNull);

assertThat(commaSeparatedStringSkipNulls).isEqualTo("ONE,TWO,THREE");
```

**另一个选项是使用useForNull()，它接受一个String值作为参数，以替换Iterable内要转换的null值：**

```java
String commaSeparatedStringUseForNull = Joiner.on(",")
  .useForNull(" ")
  .join(arraysAsListWithNull);

assertThat(commaSeparatedStringUseForNull).isEqualTo("ONE, ,TWO, ,THREE");
```

## 6. 结论
在本文中，我们已经看到了将字符串列表转换为逗号分隔字符串的各种示例。最后，选择哪个库和实用类更适合我们的目的取决于我们自己。

如常，本文的完整代码示例可以在GitHub上找到。