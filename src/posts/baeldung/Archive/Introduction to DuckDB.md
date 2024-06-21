---
date: 2024-06-19
category:
  - Database
  - Java
tag:
  - DuckDB
  - SQL
  - CSV
  - JSON
head:
  - - meta
    - name: keywords
      content: DuckDB, relational database, SQL, data analysis, Java integration, CSV import, JSON import
---

# DuckDB数据库简介

1. 概览

在本教程中，我们将学习一个名为DuckDB的分析型关系数据库。我们将探索它的优势，并了解它如何成为分析任务的高效解决方案。然后，我们将介绍安装过程和一些基本操作。

2. DuckDB是什么？

**DuckDB是一个主要设计用于数据分析的内存分析关系数据库。** 由于其列存储特性，即将每个列的数据分别存储，因此被认为是分析数据库。相比之下，传统关系数据库使用基于行的存储，按行存储数据。

DuckDB的优势包括：

- 快速查询——DuckDB利用列向量化查询执行引擎，优化了批量数据查询。
- SQL兼容性——DuckDB支持标准SQL查询，例如聚合和窗口函数，非常适合熟悉SQL的数据分析人员。
- 快速部署——DuckDB外部依赖性很小，并且可以在应用程序进程内运行，无需单独的数据库实例，使得部署和集成变得简单。
- 免费——DuckDB是一个开源项目，对所有人免费开放。其全部源代码在GitHub上可供探索和贡献。

3. DuckDB安装

DuckDB提供了多种安装选项以适应我们的环境。这里我们将演示两种常见的安装方法。

### 3.1. 命令行

**对于Windows用户，我们可以使用WinGet包管理器安装DuckDB。** 我们只需要以管理员权限打开命令提示符并执行以下命令：

```
winget install DuckDB.cli
```

**在Mac OS上，我们可以使用Homebrew进行安装：**

```
brew install duckdb
```

完成DuckDB CLI的安装后，brew会自动将二进制路径添加到现有的环境变量中。我们可以打开一个新的shell会话，并通过运行以下命令运行DuckDB CLI：

```
duckdb
```

### 3.2. Java

DuckDB可以与Java集成，无需安装单独的数据库实例。要开始使用，我们在_pom.xml_中包含以下DuckDB JDBC依赖项：

```
`<dependency>`
    `<groupId>`org.duckdb`</groupId>`
    `<artifactId>`duckdb_jdbc`</artifactId>`
    `<version>`0.10.0`</version>`
`</dependency>`
```

我们可以加载DuckDB JDBC驱动程序，然后通过以下JDBC URL创建JDBC连接：

```
Class.forName("org.duckdb.DuckDBDriver");
Connection conn = DriverManager.getConnection("jdbc:duckdb:");
```

默认情况下，当我们连接到DuckDB时，DuckDB会自动创建一个内存数据库实例。但是，一旦DuckDB进程完成，实例中持久化的所有数据都会丢失。要将我们的数据保存到磁盘，我们可以在连接URL后的冒号后附加数据库名称：

```
Connection conn = DriverManager.getConnection("jdbc:duckdb:/test_duckdb");
```

在这个例子中，DuckDB在根目录下创建了一个名为_test_duckdb_的数据库文件。由于这是一个JDBC库，我们可以通过创建SQL _Statement_ 并执行它来查询数据，以获取 _ResultSet_。以下是一个简单的JDBC示例，用于获取当前日期：

```
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery("SELECT current_date");
Date currentDate = rs.next() ? rs.getDate(1) : null;
```

在本教程的后续部分中，我们可以使用相同的JDBC方法在Java中执行SQL语句。

4. 数据导入

让我们继续将一些数据导入DuckDB。它可以处理各种数据格式，简化了从外部数据源的导入。

### 4.1. CSV文件

CSV是存储表格数据的常见数据格式。假设我们有以下包含客户数据的CSV文件：

```
CustomerId,FirstName,LastName,Gender
101,John,Smith,Male
102,Sarah,Jones,Female
...
```

我们可以使用SQL函数_read_csv_从CSV文件导入数据到DuckDB表_customer_：

```
CREATE TABLE customer AS
SELECT * FROM read_csv('customer.csv')
```

DuckDB可以从CSV文件的标题行推断出模式。标题名称被视为表列名，而后续行被视为数据行。

### 4.2. JSON文件

另一种存储和共享数据的流行方式是JSON。例如，让我们看看以下的_product.json_ JSON文件：

```
[
  {
    "productId": 1,
    "productName":"EZ Curl Bar",
    "category": "Sports Equipment"
  },
  {
    "productId": 2,
    "productName": "7' Barbell",
    "category": "Sports Equipment"
  }
]
```

与CSV导入类似，我们可以执行一个SQL语句将数据导入到DuckDB表_product_：

```
CREATE TABLE product AS
SELECT * FROM read_json('product.json')
```

就像CSV一样，DuckDB根据JSON文件中的JSON属性名称自动推断出模式。

### 4.3. _INSERT_语句

我们可以使用_insert_语句向DuckDB表中添加数据，因为它是一个SQL关系数据库系统。以下示例展示了创建一个_purchase_表，该表定义了_customer_和_product_之间的关系，并填充了一些数据行：

```
CREATE TABLE purchase(customerId BIGINT, productId BIGINT);
INSERT INTO purchase(customerId, productId) VALUES (101,1);
INSERT INTO purchase(customerId, productId) VALUES (102,1);
INSERT INTO purchase(customerId, productId) VALUES (102,2);
```

5. 数据查询

数据加载完成后，我们将探索查询DuckDB并分析我们的数据。

### 5.1. 连接操作

**除了将外部数据导入DuckDB外，我们还可以直接使用外部数据。** 基于前一节的示例，我们将使用前一节中的三个数据源。现在，让我们连接这些数据源以收集有关客户产品的信息。

```
SELECT C.firstName, C.lastName, P.productName
FROM read_csv('customer.csv') AS C, read_json('product.json') AS P, purchase S
WHERE S.customerId = C.customerId
AND S.productId = P.productId
```

执行后，我们将看到以下查询结果，显示客户名称及其相应的产品购买情况：

| firstName | lastName | productName |
| --- | --- | --- |
| John | Smith | EZ Curl Bar |
| Sarah | Jones | 7' Barbell |
| Sarah | Jones | EZ Curl Bar |

### 5.2. 聚合函数

DuckDB提供了丰富的聚合函数，用于对一组行执行计算。让我们通过这些函数探索一个示例：

```
SELECT P.productName, COUNT(*) AS purchaseCount
FROM customer C, product P, purchase S
WHERE S.customerId = C.customerId
AND S.productId = P.productId
GROUP BY P.productName
ORDER BY COUNT(*) DESC
```

该查询统计了每个产品的购买数量，并按购买数量降序排序：

| productName | purchaseCount |
| --- | --- |
| EZ Curl Bar | 2 |
| 7' Barbell | 1 |

6. 数据导出

在数据分析任务中，我们经常需要将聚合数据导出到其他应用程序进行进一步分析。

让我们通过DuckDB以各种格式导出数据的过程。在我们的示例中，我们首先创建一个数据库视图，以便稍后轻松说明导出过程：

```
CREATE VIEW purchase_view AS
SELECT P.productName, COUNT(*) AS purchaseCount
FROM customer C, product P, purchase S
WHERE S.customerId = C.customerId
AND S.productId = P.productId
GROUP BY P.productName
ORDER BY COUNT(*) DESC;
```

### 6.1. CSV文件

在DuckDB中将数据导出到CSV文件非常简单。我们可以执行以下简单的SQL，将我们数据库视图_purchase_view_中的所有数据复制到根目录中的CSV文件：

```
COPY purchase_view TO '/output.csv'
```

### 6.2. JSON文件

要将数据导出到JSON文件，我们需要包括一个额外的选项_array_，以指定将数据写入为JSON数组。这确保了我们导出的JSON文件具有适当的结构：

```
COPY (SELECT * FROM purchase_view WHERE purchaseCount > 1) TO '/output.json' (array true);
```

与导出所有数据不同，我们可以根据_select_查询的条件复制部分结果。

7. 结论

在本文中，我们了解了DuckDB数据库及其优势。我们还通过示例了解了一些基本操作。

如往常一样，所有代码都在GitHub上可用。

发布帖子后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。

OK
