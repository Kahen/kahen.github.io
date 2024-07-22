---
date: 2022-01-01
category:
  - Cassandra
  - Java
tag:
  - CQL
  - Batch
head:
  - - meta
    - name: Cassandra Java Batch
      content: 学习Cassandra批处理查询及其在Cqlsh和Java中的应用。
---
# Cassandra查询语言和Java中的Cassandra批处理

在本教程中，我们将学习Cassandra批处理查询及其不同的用例。我们将分析针对单分区和多分区表的批处理查询。

我们将探索在_Cqlsh_以及Java应用程序中的批处理。

## 2. Cassandra批处理基础

像Cassandra这样的分布式数据库与关系型数据库不同，**不支持ACID（原子性、一致性、隔离性和持久性）属性**。然而，在某些情况下，我们需要多个数据修改操作是原子的和/或隔离的操作。

批处理语句将多个数据修改语言语句（如INSERT、UPDATE和DELETE）组合在一起，以实现针对单个分区的原子性和隔离性，或者仅在针对多个分区时实现原子性。

以下是批处理查询的语法：

```
BEGIN [ ( UNLOGGED | COUNTER ) ] BATCH
[ USING TIMESTAMP [ epoch_microseconds ] ]
dml_statement [ USING TIMESTAMP [ epoch_microseconds ] ] ;
[ dml_statement [ USING TIMESTAMP [ epoch_microseconds ] ] [ ; ... ] ]
APPLY BATCH;
```

让我们通过一个例子来了解上述语法：

```
BEGIN BATCH

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f3,'banana');

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f5,'banana');

APPLY BATCH;
```

首先，我们使用不带任何可选参数如_UNLOGGED_或_USING TIMESTAMP_的_BEGIN BATCH_语句来启动批处理查询，然后包括所有的DML操作，即针对_product_表的插入语句。

最后，我们使用_APPLY BATCH_语句来执行批处理。

我们应该注意，我们将无法撤销任何批处理查询，因为**批处理查询不支持回滚功能**。

### 2.1. 单分区

**批处理语句将所有DML语句应用于单个分区，确保原子性和隔离性**。

针对单个分区的批处理可以减少客户端-服务器流量，并更有效地更新具有单行变异的表。这是因为只有在批处理操作写入单个分区时才会发生批处理隔离。

单分区批处理还可以涉及具有相同分区键并位于同一keyspace中的两个不同的表。

**单分区批处理操作默认为未记录的**，因此不会因记录而遭受性能损失。

下图描述了从协调节点_H_到分区节点_B_及其复制节点_C_、_D_的单分区批处理请求流程：

![img](https://www.baeldung.com/wp-content/uploads/2022/01/single-partition.png)

版权：Datastax

### 2.2. 多分区

涉及多个分区的批处理需要精心设计，因为它涉及多个节点之间的协调。多分区批处理的最佳用例是将相同的数据写入两个相关表，即具有不同分区键但具有相同列的两个表。

多分区批处理操作**使用_batchlog_机制来确保原子性**。协调节点将批处理日志请求发送到批处理日志节点，一旦收到确认收据，它就执行批处理语句。然后，它从节点中删除_batchlog_并向客户端发送确认。

建议避免使用多分区批处理查询。这是因为这样的查询对协调节点施加了巨大压力，并严重影响了其性能。

我们只有在没有其他可行选项时才应该使用多分区批处理。

下图描述了从协调节点_H_到分区节点_B_、_E_及其各自的复制节点_C_、_D_和_F_、_G_的多分区批处理请求流程：

![img](https://www.baeldung.com/wp-content/uploads/2022/01/multi-partition.png)

版权：Datastax

## 3. 在_Cqlsh_中的批处理执行

首先，让我们创建一个_product_表来运行一些批处理查询：

```
CREATE TABLE product (
  product_id UUID,
  variant_id UUID,
  product_name text,
  description text,
  price float,
  PRIMARY KEY (product_id, variant_id)
  );
```

### 3.1. 无时间戳的单分区批处理

我们将执行下面的批处理查询，目标是_product_表的单个分区，并且不提供时间戳：

```
BEGIN BATCH

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f3,'banana') IF NOT EXISTS;

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f5,'banana') IF NOT EXISTS;

UPDATE product SET price = 7.12, description = 'banana v1'
WHERE product_id = 2c11bbcd-4587-4d15-bb57-4b23a546bd7f AND variant_id=0e9ef8f7-d32b-4926-9d37-27225933a5f3;

UPDATE product SET price = 11.90, description = 'banana v2'
WHERE product_id = 2c11bbcd-4587-4d15-bb57-4b23a546bd7f AND variant_id=0e9ef8f7-d32b-4926-9d37-27225933a5f5;

APPLY BATCH;
```

上述查询**使用比较和设置（CAS）逻辑**，即_IF NOT EXISTS_子句，所有此类条件语句必须返回_true_才能执行批处理。如果任何此类语句返回_false_，则整个批处理将不被处理。

执行上述查询后，我们将获得以下成功的确认：

![img](https://www.baeldung.com/wp-content/uploads/2022/01/useBatchExamplesAck.png)

现在让我们验证批处理执行后数据的_writetime_是否相同：

```
cqlsh:testkeyspace> select product_id, variant_id, product_name, description, price, writetime(product_name) from product;

@ Row 1
-------------------------+--------------------------------------
product_id | 3a043b68-20ee-4ece-8f4b-a07e704bc9f5
variant_id | b84b9366-9998-4b2d-9a96-7e9a59a94ae5
product_name | Banana
description | banana v1
price | 12
writetime(product_name) | 1639275574653000

@ Row 2
-------------------------+--------------------------------------
product_id | 3a043b68-20ee-4ece-8f4b-a07e704bc9f5
variant_id | facc3997-299d-419b-b133-a54b5d4dfc3b
product_name | Banana
description | banana v2
price | 12
writetime(product_name) | 1639275574653000
```

### **3.2. 使用时间戳的单分区** 批处理

现在我们将看到使用_USING TIMESTAMP_选项的批处理查询示例，以提供以微秒为单位的_epoch_时间格式的时间戳。

下面的批处理查询将相同的时间戳应用于所有DML语句：

```
BEGIN BATCH USING TIMESTAMP 1638810270

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f3,'banana');

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f5,'banana');

UPDATE product SET price = 7.12, description = 'banana v1'
WHERE product_id = 2c11bbcd-4587-4d15-bb57-4b23a546bd7fAND variant_id=0e9ef8f7-d32b-4926-9d37-27225933a5f3;

UPDATE product SET price = 11.90, description = 'banana v2'
WHERE product_id = 2c11bbcd-4587-4d15-bb57-4b23a546bd7f AND variant_id=0e9ef8f7-d32b-4926-9d37-27225933a5f5;

APPLY BATCH;
```

现在让我们指定任何单个DML语句的自定义时间戳：

```
BEGIN BATCH

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f3,'banana');

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f5,'banana') USING TIMESTAMP 1638810270;

UPDATE product SET price = 7.12, description = 'banana v1'
WHERE product_id = 2c11bbcd-4587-4d15-bb57-4b23a546bd7f AND variant_id=0e9ef8f7-d32b-4926-9d37-27225933a5f3 USING TIMESTAMP 1638810270;

UPDATE product SET price = 11.90, description = 'banana v2'
WHERE product_id = 2c11bbcd-4587-4d15-bb57-4b23a546bd7f AND variant_id=0e9ef8f7-d32b-4926-9d37-27225933a5f5;

APPLY BATCH;
```

现在我们将看到一个无效的批处理查询，其中既有自定义时间戳又有比较和设置（CAS）逻辑，即_IF NOT EXISTS_子句：

```
BEGIN BATCH USING TIMESTAMP 1638810270

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f3,'banana') IF NOT EXISTS;

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f5,'banana') IF NOT EXISTS;

UPDATE product SET price = 7.12, description = 'banana v1'
WHERE product_id = 2c11bbcd-4587-4d15-bb57-4b23a546bd7f AND variant_id=0e9ef8f7-d32b-4926-9d37-27225933a5f3;

UPDATE product SET price = 11.90, description = 'banana v2'
WHERE product_id = 2c11bbcd-4587-4d15-bb57-4b23a546bd7f AND variant_id=0e9ef8f7-d32b-4926-9d37-27225933a5f5;

APPLY BATCH;
```

执行上述查询时，我们将获得以下错误：

```
InvalidRequest: Error from server: code=2200 [Invalid query]
message="Cannot provide custom timestamp for conditional BATCH"
```

上述错误是因为客户端时间戳对于任何条件插入或更新都是禁止的。

### **3.3. 多分区** 批处理查询

**多分区批处理的最佳用例** **是将完全相同的数据插入到两个相关表中**。

让我们将相同的数据插入到具有不同分区键的_product_by_name_和_product_by_id_表中：

```
BEGIN BATCH

INSERT INTO product_by_name (product_name, product_id, description, price)
VALUES ('banana',2c11bbcd-4587-4d15-bb57-4b23a546bd7f,'banana',12.00);

INSERT INTO product_by_id (product_id, product_name, description, price)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,'banana','banana',12.00);

APPLY BATCH;
```

现在让我们启用上述查询的_UNLOGGED_选项：

```
BEGIN UNLOGGED BATCH

INSERT INTO product_by_name (product_name, product_id, description, price)
VALUES ('banana',2c11bbcd-4587-4d15-bb57-4b23a546bd7f,'banana',12.00);

INSERT INTO product_by_id (product_id, product_name, description, price)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,'banana','banana',12.00);

APPLY BATCH;
```

**上述_UNLOGGED_批处理查询不会确保原子性或隔离性**，并且不使用_batch log_来写入数据。

### 3.4. 对_Counter_更新的批处理

我们需要使用_COUNTER_选项对任何计数器列进行操作，因为**_counter_更新操作不是幂等的**。

让我们创建一个存储_sales_vol_为_Counter_数据类型的_table product_by_sales_：

```
CREATE TABLE product_by_sales (
  product_id UUID,
  sales_vol counter,
  PRIMARY KEY (product_id)
);
```

下面的_counter_批处理查询将_sales_vol_增加两次100：

```
BEGIN COUNTER BATCH

UPDATE product_by_sales
SET sales_vol = sales_vol + 100
WHERE product_id = 6ab09bec-e68e-48d9-a5f8-97e6fb4c9b47;

UPDATE product_by_sales
SET sales_vol = sales_vol + 100
WHERE product_id = 6ab09bec-e68e-48d9-a5f8-97e6fb4c9b47;

APPLY BATCH
```

## 4. Java中的批处理操作

让我们看一些在Java应用程序中构建和执行批处理查询的示例。

### 4.1. Maven依赖

首先，我们需要包括与DataStax相关的Maven依赖：

```
``<dependency>``
    ``<groupId>``com.datastax.oss``</groupId>``
    ``<artifactId>``java-driver-core``</artifactId>``
    ``<version>``4.1.0``</version>``
``</dependency>``
``<dependency>``
   ``<groupId>``com.datastax.oss``</groupId>``
   ``<artifactId>``java-driver-query-builder``</artifactId>``
   ``<version>``4.1.0``</version>``
``</dependency>``
```

### 4.2. 单分区批处理

让我们看一个示例，看看如何执行单分区数据的批处理。

我们将使用_BatchStatement_实例构建批处理查询。_BatchStatement_是通过_DefaultBatchType_枚举和_BoundStatement_实例实例化的。

首先，我们将创建一个方法，通过将_Product_属性绑定到_PreparedStatement_插入查询来获取_BoundStatement_实例：

```
BoundStatement getProductVariantInsertStatement(Product product, UUID productId) {
    String insertQuery = new StringBuilder("")
      .append("INSERT INTO ")
      .append(PRODUCT_TABLE_NAME)
      .append("(product_id, variant_id, product_name, description, price) ")
      .append("VALUES (")
      .append(":product_id")
      .append(", ")
      .append(":variant_id")
      .append(", ")
      .append(":product_name")
      .append(", ")
      .append(":description")
      .append(", ")
      .append(":price")
      .append(");")
      .toString();

    PreparedStatement preparedStatement = session.prepare(insertQuery);

    return preparedStatement.bind(
      productId,
      UUID.randomUUID(),
      product.getProductName(),
      product.getDescription(),
      product.getPrice());
}
```

现在，我们将使用相同的_Product__UUID_执行上述创建的_BoundStatement_的_BatchStatement_：

```
UUID productId = UUID.randomUUID();
BoundStatement productBoundStatement1 = this.getProductVariantInsertStatement(productVariant1, productId);
BoundStatement productBoundStatement2 = this.getProductVariantInsertStatement(productVariant2, productId);

BatchStatement batch = BatchStatement.newInstance(DefaultBatchType.UNLOGGED,
            productBoundStatement1, productBoundStatement2);

session.execute(batch);
```

上述代码使用_UNLOGGED_批处理在同一分区键上插入两个产品变体。

### 4.3. 多分区批处理

现在，让我们看看如何将相同的数据