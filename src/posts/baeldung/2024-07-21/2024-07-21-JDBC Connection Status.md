---
date: 2022-04-01
category:
  - JDBC
  - 数据库连接
tag:
  - JDBC
  - 数据库连接状态
head:
  - - meta
    - name: keywords
      content: JDBC, 数据库连接, 连接状态, 连接验证
------
# JDBC连接状态

在本文中，我们将讨论JDBC连接状态的某些方面。首先，我们将看到连接丢失的最常见原因。然后，我们将学习如何确定连接状态。

我们还将学习在运行SQL语句之前如何验证连接。

Connection类负责与数据源通信。连接可能因各种原因丢失：
- 数据库服务器宕机
- 网络连接问题
- 重用已关闭的连接

在连接丢失上运行任何数据库操作都将导致SQLException。此外，我们可以检查异常以获取有关问题的细节。

### 3. 检查连接

有多种方法可以检查连接。我们将看看这些方法以决定何时使用每种方法。

#### 3.1. 连接状态

我们可以使用isClosed()方法检查Connection状态。使用此方法，不能授予SQL操作。但是，它有助于检查连接是否打开。

让我们在运行SQL语句之前创建一个状态条件：

```java
public static void runIfOpened(Connection connection) throws SQLException {
    if (connection != null && !connection.isClosed()) {
        // 运行sql语句
    } else {
        // 处理已关闭的连接路径
    }
}
```

#### 3.2. 连接验证

即使连接已打开，它也可能因上一节中描述的原因而丢失。因此，可能需要在运行任何SQL语句之前验证连接。

自1.6版本以来，Connection类提供了一个验证方法。首先，它向数据库提交一个验证查询。其次，它使用timeout参数作为操作的阈值。最后，如果操作在timeout内成功，则将连接标记为有效。

让我们看看如何在运行任何语句之前验证连接：

```java
public static void runIfValid(Connection connection)
        throws SQLException {
    if (connection.isValid(5)) {
        // 运行sql语句
    }
    else {
        // 处理无效连接
    }
}
```

在这种情况下，timeout为5秒。值为零表示不适用timeout。另一方面，值小于零将抛出SQLException。

#### 3.3. 自定义验证

有充分的理由创建自定义验证方法。例如，我们可能正在使用没有验证方法的旧版JDBC。同样，我们的项目可能需要在所有语句之前运行自定义验证查询。

让我们创建一个方法来运行预定义的验证查询：

```java
public static boolean isConnectionValid(Connection connection) {
    try {
        if (connection != null && !connection.isClosed()) {
            // 运行一个简单的验证查询
            connection.prepareStatement("SELECT 1");
            return true;
        }
    }
    catch (SQLException e) {
        // 在这里记录一些有用的数据
    }
    return false;
}
```

首先，该方法检查连接状态。其次，它尝试运行验证查询并在成功时返回true。最后，如果验证查询无法运行或失败，则返回false。

现在，我们可以使用自定义验证在运行任何语句之前：

```java
public static void runIfConnectionValid(Connection connection) {
    if (isConnectionValid(connection)) {
        // 运行sql语句
    }
    else {
        // 处理无效连接
    }
}
```

当然，运行一个简单的查询是验证数据库连接性的良好选择。然而，根据目标驱动程序和数据库，**还有许多其他有用的方法**：

- 自动提交 - 使用_connection.getAutocommit()_和_connection.setAutocommit()_
- 元数据 - 使用_connection.getMetaData()_

### 4. 连接池

数据库连接在资源方面是昂贵的。**连接池是管理和配置这些连接的好策略。**简而言之，它们可以减少连接生命周期的成本。

所有Java连接池框架都有自己的连接验证实现。此外，它们大多数使用可参数化的验证查询。

以下是一些最受欢迎的框架：

- Apache Commons DBCP - validationQuery, validationQueryTimeout
- Hikari CP - connectionTestQuery, validationTimeout
- C3P0 - preferredTestQuery

### 5. 结论

在本文中，我们了解了JDBC连接状态的基础知识。我们回顾了Connection类的一些有用方法。之后，我们描述了在运行SQL语句之前验证连接的一些替代方法。

像往常一样，本文中显示的所有代码示例都可以在GitHub上找到。