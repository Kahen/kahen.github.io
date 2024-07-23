---
date: 2022-04-01
category:
  - Cassandra
  - Database
tag:
  - NoSQL
  - Data Model
head:
  - - meta
    - name: keywords
      content: Apache Cassandra, Column-Oriented, Column-Family, Partitioned Row Store
---
# Apache Cassandra 是列式还是列族数据库？

Apache Cassandra 是一个开源的分布式 NoSQL 数据库，它被构建用于在多个数据中心处理大量数据。Cassandra 的数据模型在多个文档和论文中是讨论的话题，常常导致混淆或矛盾的信息。这是因为 Cassandra 能够分别存储和访问列族，这导致它被错误地分类为列式而不是列族。

在本教程中，我们将查看数据模型之间的差异，并确定 Cassandra 分区行存储数据模型的性质。

## 2. 数据库数据模型

Apache Cassandra git 仓库上的 README 说明如下：

```
Cassandra 是一个分区行存储。行被组织成带有必需主键的表。

分区意味着 Cassandra 可以在应用透明的条件下跨多台机器分布您的数据。Cassandra 将自动重新分区，当集群中添加或移除机器时。

行存储意味着像关系数据库一样，Cassandra 按行和列组织数据。
```

从这，我们可以得出结论，**Cassandra 是一个 _分区行_ 存储**。然而，列族或宽列也是合适的名字，正如我们下面将要发现的。

**列族数据模型与列式模型不同**。列族数据库存储一行及其所有列族在一起，而列式数据库简单地按列而不是按行存储数据表。

### 2.1. 行式和列式数据存储

让我们以一个 _Employees_ 表为例：

```
  ID         Last    First   Age
  1          Cooper  James   32
  2          Bell    Lisa    57
  3          Young   Joseph  45
```

行式数据库存储上述数据为：

```
1,Cooper,James,32;2,Bell,Lisa,57;3,Young,Joseph,45;
```

而列式数据库存储数据为：

```
1,2,3;Cooper,Bell,Young;James,Lisa,Joseph;32,57,45;
```

**Cassandra 不像行式或列式数据库那样存储其数据**。

### 2.2. 分区行存储

**Cassandra 使用一个 _分区行存储_**，这意味着行包含列。列族数据库存储数据，键映射到值，并将值分组到多个列族中。

在 _分区行存储_ 中，《Employees》数据看起来像这样：

```
"Employees" : {
           row1 : { "ID":1, "Last":"Cooper", "First":"James", "Age":32},
           row2 : { "ID":2, "Last":"Bell", "First":"Lisa", "Age":57},
           row3 : { "ID":3, "Last":"Young", "First":"Joseph", "Age":45},
           ...
      }
```

**分区行存储有包含列的行，但每行的列数不必相同**（像 big-table）。一些行可能有数千列，而一些行可能只限于一列。

我们可以将 _分区行存储_ 想象为 _二维键值存储_，使用行键和列键来访问数据。**要访问最小的数据单元（一列），我们首先必须指定行名（键），然后是列名**。

## 3. 结论

在本文中，我们了解到 Cassandra 的 _分区行存储_ 意味着它是 **列族** 而不是 **列式**。定义 _列族_ 的主要特征是 **列信息是数据的一部分**。这是列族模型与行式和列式模型之间的主要区别。术语 _宽列_ 来自于这样一个概念：持有无限列数的表本质上是宽的。

我们还探讨了列族数据存储中的行不需要共享列名或列数。这使得 _无模式_ 或 _半结构化_ 表成为可能。Apache Cassandra 是一个开源的分布式 NoSQL 数据库，它被设计用来在多个数据中心处理大量数据。Cassandra 的数据模型在多个文档和论文中经常被讨论，但往往会导致混淆或矛盾的信息。这是因为 Cassandra 能够独立地存储和访问列族，这常常导致人们错误地将其分类为列式数据库，而不是列族数据库。

在本教程中，我们将探讨数据模型之间的差异，并确定 Cassandra 的分区行存储数据模型的本质。

## 数据库数据模型

Apache Cassandra 的 git 仓库中的 README 文件指出：

```
Cassandra 是一个分区行存储数据库。行被组织进带有必需主键的表中。

分区意味着 Cassandra 能够以对应用程序透明的方式跨多台机器分布您的数据。当集群中添加或移除机器时，Cassandra 会自动重新分区。

行存储意味着，与关系数据库一样，Cassandra 按行和列组织数据。
```

从这里我们可以得出结论，**Cassandra 是一个分区行存储数据库**。然而，称其为列族或宽列数据库也是恰当的，正如我们下面将看到的。

**列族数据模型与列式模型不同**。列族数据库将所有列族存储在一起，形成一行，而列式数据库则是简单地按列而不是按行存储数据表。

### 2.1 行式和列式数据存储

以一个名为 "Employees" 的表为例：

```
  ID     Last Name  First Name Age
  1     Cooper      James      32
  2     Bell        Lisa       57
  3     Young       Joseph    45
```

行式数据库会这样存储上述数据：

```
1,Cooper,James,32;2,Bell,Lisa,57;3,Young,Joseph,45;
```

而列式数据库会这样存储数据：

```
1,2,3;Cooper,Bell,Young;James,Lisa,Joseph;32,57,45;
```

**Cassandra 不是像行式或列式数据库那样存储数据的**。

### 2.2 分区行存储

**Cassandra 使用的是分区行存储**，这意味着行包含列。列族数据库存储数据时，使用键映射到值，并将值分组到多个列族中。

在分区行存储中，"Employees" 数据看起来像这样：

```
"Employees" : {
           row1 : { "ID":1, "Last Name":"Cooper", "First Name":"James", "Age":32},
           row2 : { "ID":2, "Last Name":"Bell", "First Name":"Lisa", "Age":57},
           row3 : { "ID":3, "Last Name":"Young", "First Name":"Joseph", "Age":45},
           ...
      }
```

**分区行存储的特点是行包含列，但每行的列数不必相同**（类似于 BigTable）。有些行可能有数千列，而其他行可能只有一列。

我们可以将分区行存储视为**二维键值存储**，使用行键和列键来访问数据。**要访问最小的数据单元（一个列），我们首先需要指定行名（键），然后是列名**。

## 结论

在本文中，我们了解到 Cassandra 的分区行存储意味着它是一个**列族数据库**，而不是列式数据库。定义列族的主要特征是**列信息是数据的一部分**。这是列族模型与行式和列式模型的主要区别。宽列这个术语来源于这样一个概念：自然地，持有无限数量列的表是宽的。

我们还探讨了列族数据存储中的行不需要共享列名或列数。这使得**无模式**或**半结构化**的表成为可能。

OK