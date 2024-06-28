---
date: 2024-06-28
category:
  - Java
  - CSV
tag:
  - POJO
  - OpenCSV
  - CSV文件
head:
  - - meta
    - name: keywords
      content: Java, CSV, POJO, OpenCSV, 自定义列头, 自定义位置
---
# 如何使用自定义列头和位置从POJO创建CSV文件

CSV是系统和应用程序之间常见的数据交换格式之一。一个常见的用例是构建处理这些CSV文件的Java应用程序。在将数据写入CSV文件时，我们需要将我们的普通旧Java对象（POJO）映射到CSV格式。

在本教程中，我们将学习如何使用自定义位置和标题名称将POJO映射到CSV格式。

## 2. OpenCSV库

OpenCSV是处理CSV文件的非常流行的库。我们首先需要向我们的项目添加Maven依赖项：

```xml
`<dependency>`
    `<groupId>`com.opencsv`</groupId>`
    `<artifactId>`opencsv`</artifactId>`
    `<version>`5.9`</version>`
`</dependency>`
```

## 3. 生成输入记录

对于本文，我们将生成样本输入记录，我们将将其映射到CSV记录。

### 3.1. 应用程序记录

应用程序记录是一个简单的POJO，包含_id, name, age,_ 和 _created_at_ 字段：

```java
public record Application(String id, String name, Integer age, String created_at) {}
```

### 3.2. 应用程序列表

我们将生成稍后将转换为CSV格式的应用程序列表：

```java
List````````<Application>```````` applications = List.of(
  new Application("123", "Sam", 34, "2023-08-11"),
  new Application("456", "Tam", 44, "2023-02-11"),
  new Application("890", "Jam", 54, "2023-03-11")
);
```

默认的POJO到CSV的映射是直接的。我们可以使用定义了分隔符和其他配置的_StatefulBeanToCsvBuilder_，然后我们可以使用_FilerWriter_来写入：

```java
public static void beanToCSVWithDefault(List````````<Application>```````` applications) throws Exception {
    try (FileWriter writer = new FileWriter("application.csv")) {
      var builder = new StatefulBeanToCsvBuilder````````<Application>````````(writer)
        .withQuotechar(CSVWriter.NO_QUOTE_CHARACTER)
        .withSeparator(',')
        .build();

      builder.write(applications);
    }
}
```

**默认映射将POJO转换为按字段名称升序排列的CSV，但如果我们想要自定义格式的标题，这并不理想。**

如果我们想要带有自定义标题的输出CSV文件，我们可以在写入CSV文件时定义并使用自定义标题策略。

例如，如果我们想要带有小写名称的标题，我们可以覆盖_generateHeader_：

```java
public class CustomCSVWriterStrategy````<T>```` extends HeaderColumnNameMappingStrategy````<T>```` {
    @Override
    public String[] generateHeader(T bean) throws CsvRequiredFieldEmptyException {
        String[] header = super.generateHeader(bean);
        return Arrays.stream(header)
          .map(String::toLowerCase)
          .toArray(String[]::new);
    }
}
```

一旦我们有了自定义的标题映射策略，我们就可以构建_StatefulBeanToCsvBuilder_，然后以CSV格式将POJO写入CSV文件：

```java
public static void beanToCSVWithCustomHeaderStrategy(List````````<Application>```````` applications)
  throws IOException, CsvRequiredFieldEmptyException, CsvDataTypeMismatchException {
    try (FileWriter writer = new FileWriter("application.csv")){
      var mappingStrategy = new CustomCSVWriterStrategy````````<Application>````````();
      mappingStrategy.setType(Application.class);

      var builder = new StatefulBeanToCsvBuilder````````<Application>````````(writer)
        .withQuotechar(CSVWriter.NO_QUOTE_CHARACTER)
        .withMappingStrategy(mappingStrategy)
        .build();
      builder.write(applications);
    }
}
```

### 4.2. 自定义位置策略

**使用具有特定定义位置的CSV字段写入CSV文件也是可能的。** 我们所要做的就是使用所需字段位置注解应用程序记录属性：

```java
public record Application(
    @CsvBindByPosition(position = 0)
    String id,
    @CsvBindByPosition(position = 1)
    String name,
    @CsvBindByPosition(position = 2)
    Integer age,
    @CsvBindByPosition(position = 3)
    String created_at) {}
```

现在，我们可以使用注解的_Application_记录将_POJO_写入_CSV_格式：

```java
public static void beanToCSVWithCustomPositionStrategy(List````````<Application>```````` applications) throws Exception {
    try (FileWriter writer = new FileWriter("application3.csv")) {
      var builder = new StatefulBeanToCsvBuilder````````<Application>````````(writer)
        .withQuotechar(CSVWriter.NO_QUOTE_CHARACTER)
        .build();

      builder.write(applications);
   }
}
```

### 4.3. 自定义位置策略和标题名称

**如果我们想要CSV字段以及特定位置的标题，我们可以使用自定义列定位策略来实现。**

首先，我们需要使用位置和标题名称注解应用程序记录类属性：

```java
public record Application1(
    @CsvBindByName(column = "id", required = true)
    @CsvBindByPosition(position = 1)
    String id,
    @CsvBindByName(column = "name", required = true)
    @CsvBindByPosition(position = 0)
    String name,
    @CsvBindByName(column = "age", required = true)
    @CsvBindByPosition(position = 2)
    Integer age,
    @CsvBindByName(column = "created_at", required = true)
    @CsvBindByPosition(position = 3)
    String created_at) {}
```

记录类准备好后，我们需要编写自定义列定位策略。

这个策略将包括生成标题和字段位置的逻辑：

```java
public class CustomColumnPositionStrategy````<T>```` extends ColumnPositionMappingStrategy````<T>```` {
    @Override
    public String[] generateHeader(T bean) throws CsvRequiredFieldEmptyException {
        super.generateHeader(bean);
        return super.getColumnMapping();
    }
}
```

现在我们已经完成了记录和列定位策略，我们准备在客户端逻辑中使用它们并生成CSV文件：

```java
public static void beanToCSVWithCustomHeaderAndPositionStrategy(List```<Application1>``` applications)
  throws IOException, CsvRequiredFieldEmptyException, CsvDataTypeMismatchException {
    try (FileWriter writer = new FileWriter("application4.csv")){
        var mappingStrategy = new CustomColumnPositionStrategy```<Application1>```();
        mappingStrategy.setType(Application1.class);

        var builder = new StatefulBeanToCsvBuilder```<Application1>```(writer)
          .withQuotechar(CSVWriter.NO_QUOTE_CHARACTER)
          .withMappingStrategy(mappingStrategy)
          .build();
        builder.write(applications);
    }
}
```

## 5. 结论

在本教程中，我们学习了如何将POJO转换为CSV格式并写入CSV文件。我们讨论并编写了包括标题在内的CSV字段的例子。此外，我们还编写了自定义标题和定位策略。

OpenCSV没有提供开箱即用的解决方案来自定义CSV文件的位置和标题，但编写自定义策略以包含所需位置的字段和标题很容易。

像往常一样，示例代码可以在GitHub上找到。