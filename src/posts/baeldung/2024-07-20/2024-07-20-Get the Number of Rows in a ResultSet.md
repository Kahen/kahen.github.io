---
date: 2022-04-01
category:
  - Java
  - JDBC
tag:
  - ResultSet
  - 行数
head:
  - - meta
    - name: keywords
      content: Java, JDBC, ResultSet, 行数统计
---

# 获取ResultSet中的行数

在本文中，我们将探讨不同的方法来**统计JDBC ResultSet中的行数**。

## 2. 统计ResultSet行数

统计ResultSet中的行数并不直接，因为没有API方法提供这个信息。这是因为**JDBC查询不会立即获取所有结果**。结果行是在我们使用ResultSet.next方法请求时从数据库加载的。

当我们执行JDBC查询时，我们无法预先知道将有多少结果。相反，我们需要遍历它们，只有在到达结尾时，我们才能确定可用的行数。

我们有两种方法可以做到这一点，使用标准或可滚动的ResultSet。

## 3. 标准ResultSet

统计查询结果的最直接方式是**遍历它们并为每个结果递增计数器变量**。

让我们创建一个名为StandardRowCounter的类，它接受一个数据库连接作为单一参数：

```java
class StandardRowCounter {
    Connection conn;

    StandardRowCounter(Connection conn) {
        this.conn = conn;
    }
}
```

我们的类将包含一个单一方法，该方法将接受一个SQL查询作为String，并在遍历ResultSet时，通过为每个结果递增计数器变量来返回行数。

让我们将我们的计数器方法命名为getQueryRowCount：

```java
int getQueryRowCount(String query) throws SQLException {
    try (Statement statement = conn.createStatement();
         ResultSet standardRS = statement.executeQuery(query)) {
        int size = 0;
        while (standardRS.next()) {
            size++;
        }
        return size;
    }
}
```

请注意，我们使用try-with-resources块自动关闭JDBC资源。

为了测试我们的实现，我们将利用一个内存数据库快速生成一个包含3个条目的表。

有了这个，让我们创建一个RowCounterApp，它有一个简单的main方法：

```java
class RowCounterApp {

    public static void main(String[] args) throws SQLException {
        Connection conn = createDummyDB();

        String selectQuery = "SELECT * FROM STORAGE";

        StandardRowCounter standardCounter = new StandardRowCounter(conn);
        assert standardCounter.getQueryRowCount(selectQuery) == 3;
    }

    static Connection createDummyDB() throws SQLException {
        ...
    }
}
```

上述方法**适用于任何数据库**。然而，如果数据库驱动程序支持，我们可以使用一些更高级的API来实现相同的结果。

通过使用重载的Statement方法createStatement，我们可以在查询执行后请求创建一个可滚动的ResultSet。使用可滚动版本，我们可以使用更高级的遍历方法，如previous向后移动。在我们的情况下，我们将使用last方法移动到ResultSet的末尾，并使用getRow方法获取最后一个条目的行号。

让我们创建一个ScrollableRowCounter类：

```java
class ScrollableRowCounter {
    Connection conn;

    ScrollableRowCounter(Connection conn) {
        this.conn = conn;
    }
}
```

像我们的StandardRowCounter一样，我们将使用的唯一字段是数据库连接。

再次，我们将使用getQueryRowCount方法：

```java
int getQueryRowCount(String query) throws SQLException {
    try (Statement statement = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
         ResultSet scrollableRS = statement.executeQuery(query)) {
        scrollableRS.last();
        return scrollableRS.getRow();
    }
}
```

要获取可滚动的ResultSet，我们必须向createStatement方法提供ResultSet.TYPE_SCROLL_INSENSITIVE常量。此外，我们必须为并发模式提供值，但由于它与我们的案例无关，我们使用默认的ResultSet.CONCUR_READ_ONLY常量。如果JDBC驱动程序不支持这种操作模式，它将抛出异常。

让我们使用RowCountApp测试我们的新实现：

```java
ScrollableRowCounter scrollableCounter = new ScrollableRowCounter(conn);
assert scrollableCounter.getQueryRowCount(selectQuery) == 3;
```

## 5. 性能考虑

尽管上述实现简单，但**它们没有最佳性能**，因为必须遍历ResultSet。因此，通常建议使用COUNT类型查询来执行行数操作。

一个简单的例子是：

`SELECT COUNT(*) FROM STORAGE`

这返回一个单行单列，其中包含STORAGE表中的行数。

## 6. 结论

在本文中，我们探讨了获取ResultSet中行数的不同方法。

如往常一样，本文的源代码可在GitHub上找到。