---
date: 2022-04-22
category:
  - Hibernate
  - JPA
tag:
  - Hibernate
  - JPA
  - addScalar
head:
  - - meta
    - name: keywords
      content: Hibernate, addScalar, JPA, SQL, performance
---
# Hibernate中addScalar()方法的使用

## 1. 概述

在本快速教程中，我们将通过一个示例讨论Hibernate中使用的_addScalar()_方法。我们将学习如何使用这个方法以及使用它的好处。

## 2. _addScalar()_解决的问题是什么？

通常，在Hibernate中使用原生SQL查询获取结果时，我们使用_createNativeQuery()_方法，然后是_list()_方法：
```
session.createNativeQuery("SELECT * FROM Student student")
  .list();
```
在这种情况下，Hibernate使用_ResultSetMetadata_来查找列详情，并返回_Object_数组的列表。

但是，**过度使用_ResultSetMetadata_可能导致性能不佳**，这就是_addScalar()_方法的用处所在。

通过**使用_addScalar()_方法，我们可以防止Hibernate使用_ResultSetMetadata_**。

## 3. 如何使用_addScalar()_？

让我们创建一个新方法，使用_addScalar()_方法获取学生列表：
```
public List``<Object[]>`` fetchColumnWithScalar() {
    return session.createNativeQuery("SELECT * FROM Student student")
      .addScalar("studentId", StandardBasicTypes.LONG)
      .addScalar("name", StandardBasicTypes.STRING)
      .addScalar("age", StandardBasicTypes.INTEGER)
      .list();
}
```
在这里，我们需要将列名及其数据类型作为参数指定给_addScalar()_方法。

现在，Hibernate将不会使用_ResultSetMetadata_来获取列详情，因为我们已经在_addScalar()_中预先定义了它。因此，与之前的方法相比，我们将获得更好的性能。

## 4. 其他优势

让我们看看一些我们可以在其中使用_addScalar()_方法的更多用例。

### 4.1. 限制返回的列数

我们还可以使用_addScalar()_方法**限制我们的查询返回的列数**。

让我们编写另一个方法_fetchLimitedColumnWithScalar()_来仅获取学生名称列：
```
public List``<String>`` fetchLimitedColumnWithScalar() {
    return session.createNativeQuery("SELECT * FROM Student student")
      .addScalar("name", StandardBasicTypes.STRING)
      .list();
}
```
在这里，我们在查询中使用了星号来获取学生列表：
```
SELECT * FROM Student student
```
但是，它不会获取所有列，只会返回_list_中的单个列_名称_，因为我们只在_addScalar()_方法中指定了单个列。

让我们创建一个JUnit方法来验证_fetchLimitedColumnWithScalar()_方法返回的列：
```
List``<String>`` list = scalarExample.fetchLimitedColumnWithScalar();
for (String colValue : list) {
    assertTrue(colValue.startsWith("John"));
}
```
正如我们所看到的，这将返回字符串的_List_而不是_Object_数组。此外，在我们的示例数据中，我们保留了所有以“John”开头的学生名称，这就是为什么我们在上面的单元测试中对列值进行断言的原因。

这使我们的代码在返回内容方面更加明确。

### 4.2. 返回单个标量值

我们还可以使用_addScalar()_方法**直接返回单个标量值**，而不是列表。

让我们创建一个方法，返回所有学生的平均年龄：
```
public Double fetchAvgAgeWithScalar() {
    return (Double) session.createNativeQuery("SELECT AVG(age) as avgAge FROM Student student")
      .addScalar("avgAge")
      .uniqueResult();
}
```
现在，让我们用单元测试方法来验证同样的事情：
```
Double avgAge = scalarExample.fetchAvgAgeWithScalar();
assertEquals(true, (avgAge >= 5 && avgAge <= 24));
```
正如我们所看到的，_fetchAvgAgeScalar()_方法直接返回_Integer_值，我们正在断言它。

在我们的示例数据中，我们提供了学生年龄在5到24岁之间的随机年龄。因此，在断言期间，我们期望平均年龄在5到24之间。

类似地，我们可以使用SQL中的任何其他聚合函数，直接使用_addScalar()_方法直接获取_count_、_max_、_min_、_sum_或任何其他单个标量值。

## 5. _addScalar()_方法的重载

我们还有**一个重载的_addScalar()_方法，它只接受列名作为其单一参数**。

让我们创建一个新方法，并使用重载的_addScalar()_方法，它获取“_age_”列而不指定其类型：
```
public List``<Object[]>`` fetchWithOverloadedScalar() {
    return session.createNativeQuery("SELECT * FROM Student student")
      .addScalar("name", StandardBasicTypes.STRING)
      .addScalar("age")
      .list();
}
```
现在，让我们编写另一个JUnit方法来验证我们的方法是否返回了两列或更多列：
```
List``<Object[]>`` list = scalarExample.fetchColumnWithOverloadedScalar();
for (Object[] colArray : list) {
    assertEquals(2, colArray.length);
}
```
正如我们所看到的，这返回了一个_Object_数组的_List_，数组的大小是两个，它代表了列表中的名称和年龄列。

## 6. 结论

在本文中，我们看到了Hibernate中_addScalar()_方法的用途，如何使用它以及何时使用它，以及一个示例。

如常，这些示例的代码可以在GitHub上找到。