---
date: 2022-04-01
category:
  - Java
  - JDBC
tag:
  - null
  - database
  - Java
head:
  - - meta
    - name: keywords
      content: JDBC, null, database, Java
---
# 使用JDBC向整数列插入空值

在本文中，我们将探讨如何使用纯JDBC在数据库中存储空值。我们将首先描述使用空值的原因，然后提供几个代码示例。

## 2. 使用空值

空值是一个超越所有编程语言的关键字。它表示一个特殊值。**普遍的看法是空值没有值或代表无**。在数据库列中存储一个空值意味着在硬盘上保留了空间。如果适当的值变得可用，我们可以将其存储在那个空间中。

**另一种看法是空值等于零或一个空字符串**。在特定上下文中，零或空字符串可能具有含义，例如，仓库中的零项。我们还可以执行如求和或连接等操作。但是，这些操作在处理空值时没有意义。

使用空值来表示我们数据中的特殊情况有许多优点。其中之一的优点是大多数数据库引擎会从内部函数如求和或平均值中排除空值。另一方面，当空值在我们的代码中时，我们可以编程特殊的操作来减轻缺失值。

将空值带到表格中也会带来一些缺点。当编写处理包含空值数据的代码时，我们必须以不同的方式处理这些数据。这可能导致代码难看、杂乱和错误。此外，空值在数据库中可能具有可变长度。存储在整数和字节列中的空值将具有不同的长度。

## 3. 实现

对于我们的示例，我们将使用一个简单的Maven模块，使用H2内存数据库。不需要其他依赖项。

首先，让我们创建一个名为_Person_的POJO类。这个类将有四个字段。用作我们数据库的主键的_Id_，以及是字符串的_name_和_lastName_，以及表示为_Integer_的_age_。**_Age_不是必需字段，可以是空值：**

```java
public class Person {
    private Integer id;
    private String name;
    private String lastName;
    private Integer age;
    //getters and setters
}
```

为了创建一个反映这个Java类的数据库表，我们将使用以下SQL查询：

```sql
CREATE TABLE Person (id INTEGER not null, name VARCHAR(50), lastName VARCHAR(50), age INTEGER, PRIMARY KEY (id));
```

所有这些都处理完毕后，现在我们可以专注于我们的主要目标。要将空值设置到_Integer_列中，有两种在_PreparedStatement_接口中定义的方法。

### 3.1. 使用_setNull_方法

使用_setNull_方法，**我们在执行SQL查询之前总是确保我们的字段值是空的**。这为我们的代码提供了更多的灵活性。

使用列索引，我们还**必须向_PreparedStatement_实例提供有关底层列类型的信息**。在我们的情况下，这是_java.sql.Types.INTEGER_。

这种方法仅适用于空值。对于其他任何情况，我们必须使用_PreparedStatement_实例的适当方法：

```java
@Test
public void givenNewPerson_whenSetNullIsUsed_thenNewRecordIsCreated() throws SQLException {
    Person person = new Person(1, "John", "Doe", null);

    try (PreparedStatement preparedStatement = DBConfig.getConnection().prepareStatement(SQL)) {
        preparedStatement.setInt(1, person.getId());
        preparedStatement.setString(2, person.getName());
        preparedStatement.setString(3, person.getLastName());
        if (person.getAge() == null) {
            preparedStatement.setNull(4, Types.INTEGER);
        }
        else {
            preparedStatement.setInt(4, person.getAge());
        }
        int noOfRows = preparedStatement.executeUpdate();

        assertThat(noOfRows, equalTo(1));
    }
}
```

如果我们不检查_getAge_方法是否返回空值并使用空值调用_setInt_方法，我们将得到一个_NullPointerException_。

### 3.2. 使用_setObject_方法

_setObject_方法为我们处理代码中的缺失数据提供了较少的灵活性。我们可以传递我们拥有的数据，**底层结构将映射Java _Object_类型到SQL类型**。

请注意，并非所有数据库都允许在不指定SQL类型的情况下传递空值。例如，JDBC驱动程序不能从空值中推断SQL类型。

为了安全起见使用这种方法，最好向_setObject_方法传递一个SQL类型：

```java
@Test
public void givenNewPerson_whenSetObjectIsUsed_thenNewRecordIsCreated() throws SQLException {
    Person person = new Person(2, "John", "Doe", null);

    try (PreparedStatement preparedStatement = DBConfig.getConnection().prepareStatement(SQL)) {
        preparedStatement.setInt(1, person.getId());
        preparedStatement.setString(2, person.getName());
        preparedStatement.setString(3, person.getLastName());
        preparedStatement.setObject(4, person.getAge(), Types.INTEGER);
        int noOfRows = preparedStatement.executeUpdate();

        assertThat(noOfRows, equalTo(1));
    }
}
```

## 4. 结论

在本教程中，我们解释了数据库中空值的一些基本用法。然后我们提供了示例，展示了如何使用纯JDBC在_Integer_列中存储空值。

如常，所有代码都可以在GitHub上找到。