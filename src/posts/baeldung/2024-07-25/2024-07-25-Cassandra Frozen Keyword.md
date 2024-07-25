---
date: 2022-04-01
category:
  - Database
  - Apache Cassandra
tag:
  - frozen keyword
  - collections
  - user-defined types
head:
  - - meta
    - name: keywords
      content: Cassandra, frozen keyword, database, collections, user-defined types
---
# Apache Cassandra数据库中的冻结关键字

在这个教程中，我们将讨论Apache Cassandra数据库中的_冻结_关键字。首先，我们将展示如何声明冻结的集合或用户定义类型（UDT）。接下来，我们将讨论使用示例以及它如何影响持久存储的基本操作。

## 2. Cassandra数据库配置

让我们使用docker镜像创建一个数据库，并使用_cqlsh_连接到数据库。接下来，我们应该创建一个_keyspace_：

```cql
CREATE KEYSPACE mykeyspace WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};
```

在这个教程中，我们创建了一个_keyspace_，数据只有一份副本。现在，让我们将客户端会话连接到一个_keyspace_：

```cql
USE mykeyspace;
```

## 3. 冻结集合类型

**一个列的类型如果是冻结集合（_set_, _map_, 或 _list_），那么它的值只能整体替换。** 换句话说，我们不能像在非冻结集合类型中那样添加、更新或删除集合中的单个元素。因此，当我们想要保护集合不受单个值更新的影响时，_冻结_关键字可能会很有用。

此外，**由于冻结，我们可以将冻结集合用作表中的主键。** 我们可以通过使用集合类型如_set_, _list_, 或 _map_来声明集合列。然后我们添加集合的类型。

要声明一个_冻结_集合，我们必须在集合定义之前添加关键字：

```cql
CREATE TABLE mykeyspace.users
(
    id         uuid PRIMARY KEY,
    ip_numbers frozen``<set<inet>``>,
    addresses  frozen``<map<text, tuple<text>``>>,
    emails     frozen``<list<varchar>``>,
);
```

让我们插入一些数据：

```cql
INSERT INTO mykeyspace.users (id, ip_numbers)
VALUES (6ab09bec-e68e-48d9-a5f8-97e6fb4c9b47, {'10.10.11.1', '10.10.10.1', '10.10.12.1'});
```

重要的是，正如我们上面提到的，一个_冻结_集合只能整体替换。这意味着我们不能添加或删除元素。让我们尝试向_ip_numbers_集合中添加一个新元素：

```cql
UPDATE mykeyspace.users
SET ip_numbers = ip_numbers + {'10.10.14.1'}
WHERE id = 6ab09bec-e68e-48d9-a5f8-97e6fb4c9b47;

```

执行更新后，我们会得到错误：

```cql
InvalidRequest: Error from server: code=2200 [Invalid query] message="Invalid operation (ip_numbers = ip_numbers + {'10.10.14.1'}) for frozen collection column ip_numbers"
```

如果我们想更新集合中的数据，我们需要更新整个集合：

```cql
UPDATE mykeyspace.users
SET ip_numbers = {'11.10.11.1', '11.10.10.1', '11.10.12.1'}
WHERE id = 6ab09bec-e68e-48d9-a5f8-97e6fb4c9b47;
```

### 3.1. 嵌套集合

有时我们需要在Cassandra数据库中使用嵌套集合。**嵌套集合只有在我们将其标记为_冻结_时才可能**。这意味着这个集合将是不可变的。我们可以在_冻结_和_非冻结_集合中冻结嵌套集合。让我们看一个例子：

```cql
CREATE TABLE mykeyspace.users_score
(
    id    uuid PRIMARY KEY,
    score set``<frozen<set<int>``>>
);
```

## 4. 冻结用户定义类型

用户定义类型（UDT）可以将多个数据字段，每个字段都有名称和类型，附加到单个列。用于创建用户定义类型的字段可以是任何有效的数据类型，包括集合或其他UDT。让我们创建我们的UDT：

```cql
CREATE TYPE mykeyspace.address (
    city text,
    street text,
    streetNo int,
    zipcode text
);
```

让我们看看_冻结_用户定义类型的声明：

```cql
CREATE TABLE mykeyspace.building
(
    id      uuid PRIMARY KEY,
    address frozen``<address>``
);
```

当我们在用户定义类型上使用_冻结_时，Cassandra将该值视为一个blob。这个blob是通过将我们的UDT序列化为单个值获得的。所以，**我们不能更新用户定义类型值的部分**。我们必须覆盖整个值。

首先，让我们插入一些数据：

```cql
INSERT INTO mykeyspace.building (id, address)
VALUES (6ab09bec-e68e-48d9-a5f8-97e6fb4c9b48,
  {city: 'City', street: 'Street', streetNo: 2, zipcode: '02-212'});
```

让我们看看当我们尝试只更新一个字段时会发生什么：

```cql
UPDATE mykeyspace.building
SET address.city = 'City2'
WHERE id = 6ab09bec-e68e-48d9-a5f8-97e6fb4c9b48;

```

我们又会得到错误：

```cql
InvalidRequest: Error from server: code=2200 [Invalid query] message="Invalid operation (address.city = 'City2') for frozen UDT column address"
```

所以，让我们更新整个值：

```cql
UPDATE mykeyspace.building
SET address = {city : 'City2', street : 'Street2'}
WHERE id = 6ab09bec-e68e-48d9-a5f8-97e6fb4c9b48;
```

这次，地址将被更新。查询中未包括的字将用_null_值填充。

## 5. 元组

与其他组合类型不同，**元组总是冻结的**。因此，我们不必用_冻结_关键字标记元组。因此，不可能只更新元组的一些元素。与冻结集合或UDT一样，我们必须覆盖整个值。

## 6. 结论

在这个快速教程中，我们探讨了Cassandra数据库中冻结组件的基本概念。接下来，我们创建了冻结的集合和用户定义类型。然后，我们检查了这些数据结构的行为。之后，我们讨论了元组数据类型。和往常一样，文章的完整源代码可以在GitHub上找到。我已经完成了翻译，以下是翻译的完整内容：

---
date: 2022-04-01
category:
  - 数据库
  - Apache Cassandra
tag:
  - 冻结关键字
  - 集合
  - 用户定义类型
head:
  - - meta
    - name: keywords
      content: Cassandra, 冻结关键字, 数据库, 集合, 用户定义类型
---
# Apache Cassandra数据库中的冻结关键字

在这个教程中，我们将讨论Apache Cassandra数据库中的_冻结_关键字。首先，我们将展示如何声明冻结的集合或用户定义类型（UDT）。接下来，我们将讨论使用示例以及它如何影响持久存储的基本操作。

## 2. Cassandra数据库配置

让我们使用docker镜像创建一个数据库，并使用_cqlsh_连接到数据库。接下来，我们应该创建一个_keyspace_：

```cql
CREATE KEYSPACE mykeyspace WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};
```

在这个教程中，我们创建了一个_keyspace_，数据只有一份副本。现在，让我们将客户端会话连接到一个_keyspace_：

```cql
USE mykeyspace;
```

## 3. 冻结集合类型

**一个列的类型如果是冻结集合（_set_, _map_, 或 _list_），那么它的值只能整体替换。** 换句话说，我们不能像在非冻结集合类型中那样添加、更新或删除集合中的单个元素。因此，当我们想要保护集合不受单个值更新的影响时，_冻结_关键字可能会很有用。

此外，**由于冻结，我们可以将冻结集合用作表中的主键。** 我们可以通过使用集合类型如_set_, _list_, 或 _map_来声明集合列。然后我们添加集合的类型。

要声明一个_冻结_集合，我们必须在集合定义之前添加关键字：

```cql
CREATE TABLE mykeyspace.users
(
    id         uuid PRIMARY KEY,
    ip_numbers frozen``<set<inet>``>,
    addresses  frozen``<map<text, tuple<text>``>>,
    emails     frozen``<list<varchar>``>,
);
```

让我们插入一些数据：

```cql
INSERT INTO mykeyspace.users (id, ip_numbers)
VALUES (6ab09bec-e68e-48d9-a5f8-97e6fb4c9b47, {'10.10.11.1', '10.10.10.1', '10.10.12.1'});
```

重要的是，正如我们上面提到的，一个_冻结_集合只能整体替换。这意味着我们不能添加或删除元素。让我们尝试向_ip_numbers_集合中添加一个新元素：

```cql
UPDATE mykeyspace.users
SET ip_numbers = ip_numbers + {'10.10.14.1'}
WHERE id = 6ab09bec-e68e-48d9-a5f8-97e6fb4c9b47;

```

执行更新后，我们会得到错误：

```cql
InvalidRequest: Error from server: code=2200 [Invalid query] message="Invalid operation (ip_numbers = ip_numbers + {'10.10.14.1'}) for frozen collection column ip_numbers"
```

如果我们想更新集合中的数据，我们需要更新整个集合：

```cql
UPDATE mykeyspace.users
SET ip_numbers = {'11.10.11.1', '11.10.10.1', '11.10.12.1'}
WHERE id = 6ab09bec-e68e-48d9-a5f8-97e6fb4c9b47;
```

### 3.1. 嵌套集合

有时我们需要在Cassandra数据库中使用嵌套集合。**嵌套集合只有在我们将其标记为_冻结_时才可能**。这意味着这个集合将是不可变的。我们可以在_冻结_和_非冻结_集合中冻结嵌套集合。让我们看一个例子：

```cql
CREATE TABLE mykeyspace.users_score
(
    id    uuid PRIMARY KEY,
    score set``<frozen<set<int>``>>
);
```

## 4. 冻结用户定义类型

用户定义类型（UDT）可以将多个数据字段，每个字段都有名称和类型，附加到单个列。用于创建用户定义类型的字段可以是任何有效的数据类型，包括集合或其他UDT。让我们创建我们的UDT：

```cql
CREATE TYPE mykeyspace.address (
    city text,
    street text,
    streetNo int,
    zipcode text
);
```

让我们看看_冻结_用户定义类型的声明：

```cql
CREATE TABLE mykeyspace.building
(
    id      uuid PRIMARY KEY,
    address frozen``<address>``
);
```

当我们在用户定义类型上使用_冻结_时，Cassandra将该值视为一个blob。这个blob是通过将我们的UDT序列化为单个值获得的。所以，**我们不能更新用户定义类型值的部分**。我们必须覆盖整个值。

首先，让我们插入一些数据：

```cql
INSERT INTO mykeyspace.building (id, address)
VALUES (6ab09bec-e68e-48d9-a5f8-97e6fb4c9b48,
  {city: 'City', street: 'Street', streetNo: 2, zipcode: '02-212'});
```

让我们看看当我们尝试只更新一个字段时会发生什么：

```cql
UPDATE mykeyspace.building
SET address.city = 'City2'
WHERE id = 6ab09bec-e68e-48d9-a5f8-97e6fb4c9b48;

```

我们又会得到错误：

```cql
InvalidRequest: Error from server: code=2200 [Invalid query] message="Invalid operation (address.city = 'City2') for frozen UDT column address"
```

所以，让我们更新整个值：

```cql
UPDATE mykeyspace.building
SET address = {city : 'City2', street : 'Street2'}
WHERE id = 6ab09bec-e68e-48d9-a5f8-97e6fb4c9b48;
```

这次，地址将被更新。查询中未包括的字段将用_null_值填充。

## 5. 元组

与其他组合类型不同，**元组总是冻结的**。因此，我们不必用_冻结_关键字标记元组。因此，不可能只更新元组的一些元素。与冻结集合或UDT一样，我们必须覆盖整个值。

## 6. 结论

在这个快速教程中，我们探讨了Cassandra数据库中冻结组件的基本概念。接下来，我们创建了冻结的集合和用户定义类型。然后，我们检查了这些数据结构的行为。之后，我们讨论了元组数据类型。和往常一样，文章的完整源代码可以在GitHub上找到。

OK