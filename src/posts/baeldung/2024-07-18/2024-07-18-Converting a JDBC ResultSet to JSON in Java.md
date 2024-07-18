---
date: 2024-07-19
category:
  - Java
  - JDBC
tag:
  - JSON
  - 转换
  - 结果集
head:
  - - meta
    - name: keywords
      content: Java, JDBC, JSON, 结果集转换
---
# 在Java中将JDBC结果集转换为JSON

在某些场景中，我们可能需要通过API调用将数据库查询的结果发送到另一个系统或消息平台。在这种情况下，我们通常使用JSON作为数据交换格式。

在本教程中，我们将看到将JDBC `ResultSet` 对象转换为JSON格式的多种方法。

### 2. 代码示例

我们将使用H2数据库作为我们的代码示例。我们有一个示例CSV文件，我们已经使用JDBC将其读入名为 `words` 的表中。以下是示例CSV文件的三行，第一行是标题：

```
Username,Id,First name,Last name
doe1,7173,John,Doe
smith3,3722,Dana,Smith
john22,5490,John,Wang
```

形成 `ResultSet` 的代码如下：

```java
ResultSet resultSet = stmt.executeQuery("SELECT * FROM words");
```

对于JSON处理，我们使用JSON-Java（`org.json`）库。首先，我们需要将相应的依赖项添加到我们的POM文件中：

```xml
``<dependency>``
    ``<groupId>``org.json``</groupId>``
    ``<artifactId>``json``</artifactId>``
    ``<version>``20240303``</version>``
``</dependency>``
```

### 3. 不使用外部依赖

JDBC API早于现代Java集合框架。因此，我们不能使用诸如 `for-each` 迭代和 `Stream` 方法。

相反，我们必须依赖迭代器。此外，我们需要从 `ResultSet` 的元数据中提取列数和列名列表。

这导致了一个基本循环，包括为每行形成一个JSON对象，将对象添加到 `List` 中，最后将该 `List` 转换为JSON数组。所有这些功能都在 `org.json` 包中可用：

```java
ResultSetMetaData md = resultSet.getMetaData();
int numCols = md.getColumnCount();
List`<String>` colNames = IntStream.range(0, numCols)
  .mapToObj(i -> {
      try {
          return md.getColumnName(i + 1);
      } catch (SQLException e) {
          e.printStackTrace();
          return "?";
      }
  })
  .collect(Collectors.toList());

JSONArray result = new JSONArray();
while (resultSet.next()) {
    JSONObject row = new JSONObject();
    colNames.forEach(cn -> {
        try {
            row.put(cn, resultSet.getObject(cn));
        } catch (JSONException | SQLException e) {
            e.printStackTrace();
        }
    });
    result.add(row);
}
```

在这里，我们首先运行一个循环以提取每个列的名称。我们稍后在形成结果JSON对象时使用这些列名。

在第二个循环中，我们遍历实际结果，并将每个结果转换为JSON对象，使用我们在前一步计算出的列名。然后我们将所有这些对象添加到JSON数组中。

我们将列名的提取和列数计算放在循环之外。这有助于提高执行速度。

生成的JSON看起来像这样：

```json
[
   {
      "Username":"doe1",
      "First name":"John",
      "Id":"7173",
      "Last name":"Doe"
   },
   {
      "Username":"smith3",
      "First name":"Dana",
      "Id":"3722",
      "Last name":"Smith"
   },
   {
      "Username":"john22",
      "First name":"John",
      "Id":"5490",
      "Last name":"Wang"
   }
]
```

### 4. 使用jOOQ的默认设置

jOOQ框架（Java Object Oriented Querying）提供了许多方便的实用函数来处理JDBC和 `ResultSet` 对象。首先，我们需要将jOOQ依赖项添加到我们的POM文件中：

```xml
``<dependency>``
    ``<groupId>``org.jooq``</groupId>``
    ``<artifactId>``jooq``</artifactId>``
    ``<version>``3.11.11``</version>``
``</dependency>``
```

添加依赖项后，我们可以使用单行解决方案将 `ResultSet` 转换为JSON对象：

```java
JSONObject result = new JSONObject(DSL.using(dbConnection)
  .fetch(resultSet)
  .formatJSON());
```

生成的JSON元素是一个包含两个字段的对象，称为 `fields` 和 `records`，其中 `fields` 具有列的名称和类型，而 `records` 包含实际数据。这与之前的JSON对象略有不同，对于我们的示例表看起来像这样：

```json
{
  "records":[
    [
      "doe1",
      "7173",
      "John",
      "Doe"
    ],
    [
      "smith3",
      "3722",
      "Dana",
      "Smith"
    ],
    [
      "john22",
      "5490",
      "John",
      "Wang"
    ]
  ],
  "fields":[
    {
      "schema":"PUBLIC",
      "name":"Username",
      "type":"VARCHAR",
      "table":"WORDS"
    },
    {
      "schema":"PUBLIC",
      "name":"Id",
      "type":"VARCHAR",
      "table":"WORDS"
    },
    {
      "schema":"PUBLIC",
      "name":"First name",
      "type":"VARCHAR",
      "table":"WORDS"
    },
    {
      "schema":"PUBLIC",
      "name":"Last name",
      "type":"VARCHAR",
      "table":"WORDS"
    }
  ]
}
```

### 5. 使用jOOQ的自定义设置

如果我们不喜欢jOOQ生成的JSON对象的默认结构，我们可以自定义它。

我们将通过实现 `RecordMapper` 接口来实现这一点。这个接口有一个 `map()` 方法，它接收一个 `Record` 作为输入，并返回任意类型的期望对象。

然后我们将 `RecordMapper` 作为输入传递给jOOQ结果类的 `map()` 方法：

```java
List json = DSL.using(dbConnection)
  .fetch(resultSet)
  .map(new RecordMapper() {
      @Override
      public JSONObject map(Record r) {
          JSONObject obj = new JSONObject();
          colNames.forEach(cn -> obj.put(cn, r.get(cn)));
          return obj;
      }
  });
return new JSONArray(json);
```

在这里，我们从 `map()` 方法返回了一个 `JSONObject`。

生成的JSON看起来像这样，与第3节类似：

```json
[
   {
      "Username":"doe1",
      "First name":"John",
      "Id":"7173",
      "Last name":"Doe"
   },
   {
      "Username":"smith3",
      "First name":"Dana",
      "Id":"3722",
      "Last name":"Smith"
   },
   {
      "Username":"john22",
      "First name":"John",
      "Id":"5490",
      "Last name":"Wang"
   }
]
```

### 6. 结论

在本文中，我们探讨了将JDBC `ResultSet` 转换为JSON对象的三种不同方式。

每种方法都有自己的用途。我们选择哪一种取决于所需的输出JSON对象的结构，以及可能对依赖大小的限制。

如常，示例的源代码可在GitHub上找到。翻译已经完成，以下是剩余部分的翻译：

文章的源代码示例可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png)

OK