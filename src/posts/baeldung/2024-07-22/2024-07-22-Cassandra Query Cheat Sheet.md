---
date: 2022-04-01
category:
  - Database
  - Cassandra
tag:
  - CQL
  - Cheat Sheet
head:
  - - meta
    - name: Cassandra Query Language
      content: A quick reference guide for essential concepts of Cassandra query language (CQL) and its application.
---
# Cassandra查询备忘单 | Baeldung

1. 引言

有时，我们需要一个快速参考指南来开始我们的学习路径。特别是，备忘单是一个包含所有关键信息的文档。

在本教程中，我们将学习Cassandra查询语言（CQL）的基本概念以及如何使用我们将逐步构建的备忘单来应用它们。

2. Cassandra概览

Apache Cassandra是一个开源的、NoSQL的、分布式数据存储系统。这意味着它不仅可以在一台服务器上运行，而是可以跨越多个服务器。它还以其高可用性和分区容错性而闻名。

换句话说，Cassandra数据库的设计灵感来自于CAP定理中的“AP”。

此外，Cassandra是一个无主架构，具有巨大的可扩展性，最重要的是，它提供了简单的故障检测和恢复。

3. 数据类型

通常，Cassandra支持丰富的数据类型。这些包括原生类型、集合类型、用户定义类型和元组，以及自定义类型。

### 3.1. 原生类型

原生类型是内置类型，为Cassandra提供了一系列的常量支持。

首先，字符串是编程世界中非常流行的数据类型。

CQL为字符串提供了四种不同的数据类型：

| 数据类型 | 支持的常量 | 描述 |
| --- | --- | --- |
| ascii | _string_ | ASCII字符字符串 |
| inet | _string_ | IPv4或IPv6地址字符串 |
| text | _string_ | UTF8编码的字符串 |
| varchar | _string_ | UTF8编码的字符串 |

布尔值有两种可能的值，要么是_true_要么是_false_：

| 数据类型 | 支持的常量 | 描述 |
| --- | --- | --- |
| boolean | _boolean_ | _true_或_false_ |

使用blob数据类型，我们可以将图像或多媒体数据作为数据库中的二进制流存储：

| 数据类型 | 支持的常量 | 描述 |
| --- | --- | --- |
| blob | _blob_ | 任意字节 |

Duration是一个三符号整数，表示月份、天数和纳秒：

| 数据类型 | 支持的常量 | 描述 |
| --- | --- | --- |
| duration | _duration_ | 持续时间值 |

Cassandra为整数数据提供了广泛的数据类型：

| 数据类型 | 支持的常量 | 描述 |
| --- | --- | --- |
| tinyint | _integer_ | 8位有符号整数 |
| smallint | _integer_ | 16位有符号整数 |
| int | _integer_ | 32位有符号整数 |
| bigint | _integer_ | 64位有符号长整数 |
| variant | _integer_ | 任意精度整数 |
| counter | _integer_ | 计数器列（64位有符号） |

对于整数和小数，我们有三种数据类型：

| 数据类型 | 支持的常量 | 描述 |
| --- | --- | --- |
| decimal | _integer, float_ | 可变精度小数 |
| double | _integer, float_ | 64位浮点数 |
| float | _integer, float_ | 32位浮点数 |

对于日期和时间相关的需求，Cassandra提供了三种数据类型：

| 数据类型 | 支持的常量 | 描述 |
| --- | --- | --- |
| date | _integer, string_ | 一个日期值（没有时间） |
| time | _integer, string_ | 一个时间值（没有日期） |
| timestamp | _integer, string_ | 一个时间戳（带有日期和时间） |

通常，在使用INSERT或UPDATE命令时，我们必须避免冲突：

| 数据类型 | 支持的常量 | 描述 |
| --- | --- | --- |
| uuid | _uuid_ | 一个UUID（任何版本） |
| timeuuid | _uuid_ | 版本1的UUID |

### 3.2. 集合类型

当用户在关系数据库中的一个字段中拥有多个值时，通常将它们存储在单独的表中。例如，用户有多个银行账户、联系信息或电子邮件地址。因此，在这种情况下，我们需要在两个表之间应用连接以检索所有数据。

**Cassandra提供了一种使用集合类型在列中分组和存储数据的方法。**

让我们快速看看这些类型：

- _set –_ 唯一值；以无序方式存储
- _list –_ 可以包含重复值；顺序很重要
- _map –_ 以键值对的形式存储数据

### 3.3. 用户定义类型

用户定义类型允许我们在单个列中附加多个数据字段：

```sql
CREATE TYPE student.basic_info (
  birthday timestamp,
  race text,
  weight text,
  height text
);
```

### 3.4. 元组类型

元组是用户定义类型的替代品。它使用尖括号创建，并使用逗号分隔符来分隔它包含的元素类型。

这里是一些简单的元组命令：

```sql
-- 创建一个元组
CREATE TABLE subjects (
  k int PRIMARY KEY,
  v tuple`<int, text, float>`
);

-- 插入值
INSERT INTO subjects (k, v) VALUES(0, (3, 'cs', 2.1));

-- 检索值
SELECT * FROM subjects;
```

4. Cassandra CQL命令

让我们看看几个类别的CQL命令。

### 4.1. 键空间命令

**首先要记住的是，在Cassandra中，键空间就像RDBMS中的数据库一样。** 它是数据的最外层容器，定义了复制策略和其他选项，特别是对于键空间中的所有表。有了这个想法，一个好的通用规则是一个应用程序一个键空间。

让我们看看相关命令：

| 命令 | 示例 | 描述 |
| --- | --- | --- |
| CREATE keyspace | CREATE KEYSPACE _keyspace\_name_ WITH replication = {‘class’:’SimpleStrategy’, ‘replication\_factor’ : 2}; | 创建一个键空间。 |
| DESCRIBE keyspace | DESCRIBE KEYSPACES; | 它将列出所有的键空间。 |
| USE keyspace | USE _keyspace\_name_; | 此命令将客户端会话连接到一个键空间。 |
| ALTER keyspace | ALTER KEYSPACE _keyspace\_name_ WITH REPLICATION = { ‘class’ : ‘SimpleStrategy’, ‘replication\_factor’ : 3 } AND DURABLE\_WRITES = false; | 更改一个键空间。 |
| DROP keyspace | DROP KEYSPACE _keyspace\_name_; | 删除一个键空间。 |

### 4.2. 表命令

在Cassandra中，表也被称为列族。我们已经知道主键的重要性。然而，在创建表时必须定义主键。

让我们回顾这些命令：

| 命令 | 示例 | 描述 |
| --- | --- | --- |
| CREATE table | CREATE TABLE _table\_name_ ( _column\_name_ UUID PRIMARY KEY, _column\_name_ text, _column\_name_ text, _column\_name_ timestamp); | 创建一个表。 |
| ALTER table | ALTER TABLE _table\_name_ ADD _column\_name_ int; | 它将向表中添加一个新列。 |
| ALTER table | ALTER TABLE _table\_name_ ALTER _column\_name_ TYPE _datatype_; | 我们可以更改现有列的数据类型。 |
| ALTER table | ALTER TABLE _table\_name_ WITH caching = {‘keys’ : ‘NONE’, ‘rows\_per\_partition’ : ‘1’ }; | 此命令有助于更改表的属性。 |
| DROP table | DROP TABLE _table\_name_; | 删除一个表。 |
| TRUNCATE table | TRUNCATE _table\_name_; | 使用此命令，我们可以永久删除所有数据。 |

### 4.3. 索引命令

而不是扫描整个表并等待结果，我们可以使用索引来加速查询。但是，我们必须记住，**Cassandra中的主键已经被索引了。因此，它不能再次用于相同的目的。**

让我们看看命令：

| 命令 | 示例 | 描述 |
| --- | --- | --- |
| CREATE index | CREATE INDEX _index\_name_ on _table\_name_ ( _column\_name_); | 创建一个索引。 |
| DELETE index | DROP INDEX IF EXISTS _index\_name_; | 删除一个索引。 |

### 4.4. 基本命令

这些命令用于读取和操作表中的值：

| 命令 | 示例 | 描述 |
| --- | --- | --- |
| INSERT | INSERT INTO _table\_name_ ( _column\_name1_, _column\_name2_) VALUES( _value1_, _value2_); | 在表中插入一条记录。 |
| SELECT | SELECT \* FROM _table\_name_; | 该命令用于从特定表中获取数据。 |
| WHERE | SELECT \* FROM _table\_name_ WHERE _column\_name_ = _value_; | 它根据一个谓词过滤记录。 |
|UPDATE | 用来编辑记录。
| DELETE | DELETE _identifier_ FROM _table\_name_ WHERE _condition_; | 此语句用于从表中删除值。 |

### 4.5. 其他命令

Cassandra有两种不同类型的键：分区键和聚簇键。分区键指示存储数据的节点。

相比之下，聚簇键确定分区键内数据的顺序：

| 命令 | 示例 | 描述 |
| --- | --- | --- |
| ORDER BY | SELECT \* FROM _table\_name_ WHERE _column\_name1_ = _value_ ORDER BY _column\_name2_ ASC; | 为此，必须在WHERE子句中定义分区键。另外，ORDER BY子句表示用于排序的聚簇列。 |
| GROUP BY | SELECT _column\_name_ FROM _table\_name_ GROUP BY _condition1_, _condition2_; | 此子句仅支持使用分区键或分区键和聚簇键。 |
| LIMIT | SELECT \* FROM _table\_name_ LIMIT 3; | 对于大型表，限制检索的行数。 |

5. 运算符

Cassandra支持算术和条件类型的运算符。在算术运算符中，我们有 +, -, \*, /, % 和 –（一元）分别用于加法、减法、乘法、除法、余数和取反。

WHERE子句在Cassandra中非常重要。条件运算符在此子句中使用，并具有某些场景和限制。这些运算符是 CONTAINS, CONTAINS KEY, IN, =, >, >=, <, 和 <=。

6. 常用函数

毫无疑问，无论是聚合函数还是标量函数，在将一个值转换为另一个值中都起着重要作用。因此，Cassandra提供了多个类别的几种内置函数。

让我们看看这些函数：

- Blob转换函数
- UUID和Timeuuid函数
- Token函数
- WRITETIME函数
- TTL函数
- TOKEN函数
- MIN(), MAX(), SUM(), AVG()

除了这些内置函数外，它还允许用户定义函数和聚合。

7. 结论

在这篇短文中，我们已经看到了Cassandra查询语言的构建块。首先，我们学习了它支持的数据类型以及如何定义它们。然后，我们查看了执行数据库操作的常用命令。最后，我们讨论了语言的运算符和函数。

OK