---
date: 2022-05-23
category:
  - Spark
  - DataFrame
tag:
  - Spark
  - DataFrame
  - Java
  - 数据处理
head:
  - - meta
    - name: keywords
      content: Spark, DataFrame, Java, 数据处理
---
# Apache Spark DataFrame 教程

Apache Spark 是一个开源的分布式分析和处理系统，它通过提供统一的 API 来简化面向分析的应用程序的开发，支持数据传输、大规模转换和分布式处理。

DataFrame 是 Spark API 中一个重要且必不可少的组件。本教程将通过一个简单的客户数据示例，探讨一些 Spark DataFrame API。

从逻辑上讲，**DataFrame 是一个不可变的记录集合，这些记录被组织成名为列**。它与 RDBMS 中的表或 Java 中的 ResultSet 有相似之处。

作为 API，DataFrame 提供了统一的访问多个 Spark 库的方式，包括 Spark SQL、Spark Streaming、MLlib 和 GraphX。

**在 Java 中，我们使用 Dataset``````````````<Row>`````````````` 来表示 DataFrame。**

本质上，Row 使用了一种称为 Tungsten 的高效存储方式，与前身相比，这极大地优化了 Spark 操作。

## 3. Maven 依赖项

让我们首先通过在我们的 pom.xml 中添加 spark-core 和 spark-sql 依赖项来开始：

```xml
``<dependency>``
    ``<groupId>``org.apache.spark``</groupId>``
    ``<artifactId>``spark-core_2.11``</artifactId>``
    ``<version>``2.4.8``</version>``
``</dependency>``

``<dependency>``
    ``<groupId>``org.apache.spark``</groupId>``
    ``<artifactId>``spark-sql_2.11``</artifactId>``
    ``<version>``2.4.8``</version>``
``</dependency>``
```

## 4. DataFrame 和 Schema

本质上，DataFrame 是一个带有 schema 的 RDD。schema 可以是推断出来的，也可以定义为 StructType。

**StructType 是 Spark SQL 中的内置数据类型，我们用它来表示 StructField 对象的集合。**

让我们定义一个示例 Customer schema StructType：

```java
public static StructType minimumCustomerDataSchema() {
    return DataTypes.createStructType(new StructField[] {
      DataTypes.createStructField("id", DataTypes.StringType, true),
      DataTypes.createStructField("name", DataTypes.StringType, true),
      DataTypes.createStructField("gender", DataTypes.StringType, true),
      DataTypes.createStructField("transaction_amount", DataTypes.IntegerType, true) }
    );
}
```

在这里，每个 StructField 都有一个名称，表示 DataFrame 列名称，类型，以及表示它是否可为空的布尔值。

## 5. 构建 DataFrames

每个 Spark 应用程序的首要操作是通过对 master 获取 SparkSession。

**它为我们提供了访问 DataFrames 的入口点。** 让我们首先创建 SparkSession：

```java
public static SparkSession getSparkSession() {
    return SparkSession.builder()
      .appName("Customer Aggregation pipeline")
      .master("local")
      .getOrCreate();
}
```

注意这里我们使用本地 master 连接到 Spark。如果我们想要连接到集群，我们将提供集群地址。

一旦我们有了 SparkSession，我们可以使用各种方法创建 DataFrame。让我们简要看看其中的一些。

### 5.1. 从 List`<POJO>` 创建 DataFrame

让我们首先构建一个 List``````<Customer>``````：

```java
List``````<Customer>`````` customers = Arrays.asList(
  aCustomerWith("01", "jo", "Female", 2000),
  aCustomerWith("02", "jack", "Male", 1200)
);
```

接下来，让我们使用 createDataFrame 从 List``````<Customer>`````` 构建 DataFrame：

```java
Dataset``````````````<Row>`````````````` df = SPARK_SESSION
  .createDataFrame(customerList, Customer.class);
```

### 5.2. 从 Dataset 创建 DataFrame

如果我们有一个 Dataset，我们可以很容易地通过在 Dataset 上调用 toDF 将其转换为 DataFrame。

让我们首先使用 createDataset 创建一个 Dataset``````<Customer>``````，它采用 org.apache.spark.sql.Encoders：

```java
Dataset``````<Customer>`````` customerPOJODataSet = SPARK_SESSION
  .createDataset(CUSTOMERS, Encoders.bean(Customer.class));
```

接下来，让我们将其转换为 DataFrame：

```java
Dataset``````````````<Row>`````````````` df = customerPOJODataSet.toDF();
```

### 5.3. 使用 RowFactory 从 POJO 创建 Row

由于 DataFrame 本质上是 Dataset``````````````<Row>``````````````，让我们看看如何从 Customer POJO 创建 Row。

基本上，通过实现 MapFunction``<Customer, Row>`` 并重写 call 方法，我们可以使用 RowFactory.create 将每个 Customer 映射到一个 Row：

```java
public class CustomerToRowMapper implements MapFunction``<Customer, Row>`` {

    @Override
    public Row call(Customer customer) throws Exception {
        Row row = RowFactory.create(
          customer.getId(),
          customer.getName().toUpperCase(),
          StringUtils.substring(customer.getGender(),0, 1),
          customer.getTransaction_amount()
        );
        return row;
    }
}
```

我们应该注意到，我们可以在将数据转换为 Row 之前在这里操作 Customer 数据。

### 5.4. 从 List``````````````<Row>`````````````` 创建 DataFrame

我们也可以从一个 Row 对象列表创建 DataFrame：

```java
List``````````````<Row>`````````````` rows = customer.stream()
  .map(c -> new CustomerToRowMapper().call(c))
  .collect(Collectors.toList());
```

现在，让我们将这个 List``````````````<Row>`````````````` 连同 StructType schema 一起给 SparkSession：

```java
Dataset``````````````<Row>`````````````` df = SparkDriver.getSparkSession()
  .createDataFrame(rows, SchemaFactory.minimumCustomerDataSchema());
```

注意这里，**List``````````````<Row>`````````````` 将根据 schema 定义转换为 DataFrame。** 任何不在 schema 中的字段都不会成为 DataFrame 的一部分。

### 5.5. 从结构化文件和数据库创建 DataFrame

DataFrames 可以存储列信息，比如 CSV 文件，以及嵌套字段和数组，比如 JSON 文件。

**无论我们是使用 CSV 文件、JSON 文件还是其他格式以及数据库，DataFrame API 都是相同的。**

让我们从多行 JSON 数据创建 DataFrame：

```java
Dataset``````````````<Row>`````````````` df = SparkDriver.getSparkSession()
  .read()
  .format("org.apache.spark.sql.execution.datasources.json.JsonFileFormat")
  .option("multiline", true)
  .load("data/minCustomerData.json");
```

类似地，在从数据库读取的情况下，我们将有：

```java
Dataset``````````````<Row>`````````````` df = SparkDriver.getSparkSession()
  .read()
  .option("url", "jdbc:postgresql://localhost:5432/customerdb")
  .option("dbtable", "customer")
  .option("user", "user")
  .option("password", "password")
  .option("serverTimezone", "EST")
  .format("jdbc")
  .load();
```

## 6. 将 DataFrame 转换为 Dataset

现在，让我们看看如何将我们的 DataFrame 转换为 Dataset。如果我们想要操作现有的 POJOs 以及仅适用于 DataFrame 的扩展 API，这种转换是有用的。

我们将使用上一节中从 JSON 创建的 DataFrame。

让我们调用一个映射器函数，它将 Dataset``````````````<Row>`````````````` 的每一行转换为 Customer 对象：

```java
Dataset``````<Customer>`````` ds = df.map(
  new CustomerMapper(),
  Encoders.bean(Customer.class)
);
```

在这里，CustomerMapper 实现了 MapFunction```<Row, Customer>```：

```java
public class CustomerMapper implements MapFunction```<Row, Customer>``` {

    @Override
    public Customer call(Row row) {
        Customer customer = new Customer();
        customer.setId(row.getAs("id"));
        customer.setName(row.getAs("name"));
        customer.setGender(row.getAs("gender"));
        customer.setTransaction_amount(Math.toIntExact(row.getAs("transaction_amount")));
        return customer;
    }
}
```

我们应该注意到 **MapFunction```<Row, Customer>``` 只实例化一次，无论我们要处理的记录数量有多少。**

## 7. DataFrame 操作和转换

现在，让我们使用客户数据示例构建一个简单的管道。我们想要从两个不同的文件源以 DataFrame 的形式摄取客户数据，对它们进行规范化，然后对数据执行一些转换。

最后，我们将转换后的数据写入数据库。

这些转换的目的是找出按性别和来源排序的年度支出。

### 7.1. 摄取数据

首先，让我们使用 SparkSession 的 read 方法从几个来源摄取数据，从 JSON 数据开始：

```java
Dataset``````````````<Row>`````````````` jsonDataToDF = SPARK_SESSION.read()
  .format("org.apache.spark.sql.execution.datasources.json.JsonFileFormat")
  .option("multiline", true)
  .load("data/customerData.json");
```

现在，让我们对 CSV 源执行相同的操作：

```java
Dataset``````````````<Row>`````````````` csvDataToDF = SPARK_SESSION.read()
  .format("csv")
  .option("header", "true")
  .schema(SchemaFactory.customerSchema())
  .option("dateFormat", "m/d/YYYY")
  .load("data/customerData.csv");

csvDataToDF.show();
csvDataToDF.printSchema();
return csvData;
```

重要的是，为了读取此 CSV 数据，我们提供了一个 StructType schema，它决定了列数据类型。

**一旦我们摄取了数据，我们可以使用 show 方法检查 DataFrame 的内容。**

此外，我们还可以通过在 show 方法中提供大小来限制行