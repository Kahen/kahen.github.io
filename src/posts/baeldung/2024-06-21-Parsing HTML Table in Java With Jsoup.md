---
date: 2024-06-21
category:
  - Java
  - Jsoup
tag:
  - HTML
  - 网页抓取
head:
  - - meta
    - name: keywords
      content: Jsoup, HTML表格解析, Java, 数据提取
------
# Java中使用Jsoup解析HTML表格

Jsoup是一个开源库，用于抓取HTML页面。它提供了一个API，使用DOM API方法进行数据解析、提取和操作。

在本文中，我们将看到如何使用Jsoup解析HTML表格。**我们将检索和更新HTML表格中的数据，并且，使用Jsoup向表格中添加和删除行。**

### 2. 依赖性
要使用Jsoup库，请将以下依赖项添加到项目中：

```xml
`<dependency>`
    `<groupId>`org.jsoup`</groupId>`
    `<artifactId>`jsoup`</artifactId>`
    `<version>`1.17.2`</version>`
`</dependency>`
```

我们可以在Maven中央仓库中找到Jsoup库的最新版本。

### 3. 表格结构
为了通过jsoup解析HTML表格，我们将使用一个示例HTML结构。完整的HTML结构可以在文章末尾提到的GitHub存储库中找到。这里，我们展示了一个只有两行数据的表格，以示例说明：

```html
`<table>`
    `<thead>`
        ``<tr>``
            ````<th>````Name````</th>````
            ````<th>````Maths````</th>````
            ````<th>````English````</th>````
            ````<th>````Science````</th>````
        ``</tr>``
    `</thead>`
    `<tbody>`
        ``<tr>``
            ````<td>````Student 1````</td>````
            ````<td>````90````</td>````
            ````<td>````85````</td>````
            ````<td>````92````</td>````
        ``</tr>``
    `</tbody>`
`</table>`
```

如我们所见，我们解析的表格有一个带有_thead_标签的标题行，后面是_tbody_标签中的数据行。我们假设HTML文档中的表格将采用上述格式。

首先，为了从解析后的文档中选择一个HTML表格，我们可以使用以下代码片段：

```java
Element table = doc.select("table");
Elements rows = table.select("tr");
Elements first = rows.get(0).select("th,td");
```

如我们所见，表格元素是从文档中选择的，然后，为了获取行元素，_tr_是从表格元素中选择的。由于表格中有多个行，我们选择了第一行中的_th_或_td_元素。使用这些函数，我们可以编写以下函数来解析表格数据。

这里，我们假设表格中没有使用_colspan_或_rowspan_元素，并且第一行存在带有标题_th_标签。

以下是解析表格的代码：

```java
public List```<Map`<String, String>````> parseTable(Document doc, int tableOrder) {
    Element table = doc.select("table").get(tableOrder);
    Element tbody = table.select("tbody").get(0);
    Elements dataRows = tbody.select("tr");
    Elements headerRow = table.select("tr")
      .get(0)
      .select("th,td");

    List``<String>`` headers = new ArrayList``<String>``();
    for (Element header : headerRow) {
        headers.add(header.text());
    }

    List```<Map`<String, String>````> parsedDataRows = new ArrayList```<Map`<String, String>````>();
    for (int row = 0; row `< dataRows.size(); row++) {
        Elements colVals = dataRows.get(row).select("th,td");

        int colCount = 0;
        Map`<String, String>`` dataRow = new HashMap`<String, String>`();
        for (Element colVal : colVals) {
            dataRow.put(headers.get(colCount++), colVal.text());
        }
        parsedDataRows.add(dataRow);
    }
    return parsedDataRows;
}
```

在这个函数中，参数_doc_是从文件加载的HTML文档，_tableOrder_是文档中的第n个表格元素。**我们使用_List```<Map`<String, String>````>_来存储表格中_tbody_元素下的_dataRows_列表。**列表中的每个元素是一个_Map_，代表一个_dataRow_。这个_Map_存储列名称作为键，该列的行值作为映射值。使用列表的_Maps_可以方便地访问检索到的数据。

**列表索引表示行号，我们可以通过其映射键获取特定的单元格数据。**

我们可以使用以下测试用例来验证_table_数据是否正确检索：

```java
@Test
public void whenDocumentTableParsed_thenTableDataReturned() {
    JsoupTableParser jsoParser = new JsoupTableParser();
    Document doc = jsoParser.loadFromFile("Students.html");
    List```<Map`<String, String>````> tableData = jsoParser.parseTable(doc, 0);
    assertEquals("90", tableData.get(0).get("Maths"));
}
```

从JUnit测试用例中，我们可以确认，因为我们已经解析了所有表格单元格的文本，并将它们存储在_ArrayList_的_HashMap_对象中，列表中的每个元素代表表格中的一个数据行。**行由一个_HashMap_表示，其中键是列标题，单元格文本是值。使用这种结构，我们可以轻松地访问表格数据。**

### 5. 更新解析表格的元素
在解析时插入或更新元素，我们可以使用以下代码对从行中检索到的_td_元素进行操作：

```java
colVals.get(colCount++).text(updateValue);
```

或者

```java
colVals.get(colCount++).html(updateValue);
```

更新解析表格中的值的函数如下：

```java
public void updateTableData(Document doc, int tableOrder, String updateValue) {
    Element table = doc.select("table").get(tableOrder);
    Element tbody = table.select("tbody").get(0);
    Elements dataRows = tbody.select("tr");

    for (int row = 0; row < dataRows.size(); row++) {
        Elements colVals = dataRows.get(row).select("th,td");

        for (int colCount = 0; colCount < colVals.size(); colCount++) {
            colVals.get(colCount).text(updateValue);
        }
    }
}
```

在上面的函数中，我们从表格的_tbody_元素中获取数据行。该函数遍历表格的每个单元格，并将它的值设置为参数值，_updatedValue_。它将所有单元格的值更新为相同的值，以演示可以使用Jsoup更新单元格值。我们可以通过指定数据行的行和列索引来更新特定单元格的值。

下面的测试验证了更新函数：

```java
@Test
public void whenTableUpdated_thenUpdatedDataReturned() {
    JsoupTableParser jsoParser = new JsoupTableParser();
    Document doc = jsoParser.loadFromFile("Students.html");
    jsoParser.updateTableData(doc, 0, "50");
    List```<Map`<String, String>````> tableData = jsoParser.parseTable(doc, 0);
    assertEquals("50", tableData.get(2).get("Maths"));
}
```

JUnit测试用例确认了_updateTableData_操作将所有_table_单元格值更新为50。这里我们正在验证第三行数据的Maths列的数据。

同样，我们可以为表格的特定单元格设置所需的值。

### 6. 向表格添加行
我们可以使用以下函数向表格添加一行：

```java
public void addRowToTable(Document doc, int tableOrder) {
    Element table = doc.select("table").get(tableOrder);
    Element tbody = table.select("tbody").get(0);

    Elements rows = table.select("tr");
    Elements headerCols = rows.get(0).select("th,td");
    int numCols = headerCols.size();

    Elements colVals = new Elements(numCols);
    for (int colCount = 0; colCount < numCols; colCount++) {
        Element colVal = new Element("td");
        colVal.text("11");
        colVals.add(colVal);
    }
    Elements dataRows = tbody.select("tr");
    Element newDataRow = new Element("tr");
    newDataRow.appendChildren(colVals);
    dataRows.add(newDataRow);
    tbody.html(dataRows.toString());
}
```

在上面的函数中，我们从表格的_thead_行获取列数，以及从表格的_tbody_元素获取数据行。在将新行添加到_dataRows_列表后，我们使用_dataRows_更新_tbody_的HTML内容。

我们可以使用以下测试用例来验证行的添加：

```java
@Test
public void whenTableRowAdded_thenRowCountIncreased() {
    JsoupTableParser jsoParser = new JsoupTableParser();
    Document doc = jsoParser.loadFromFile("Students.html");
    List```<Map`<String, String>````> tableData = jsoParser.parseTable(doc, 0);
    int countBeforeAdd = tableData.size();
    jsoParser.addRowToTable(doc, 0);
    tableData = jsoParser.parseTable(doc, 0);
    assertEquals(countBeforeAdd + 1, tableData.size());
}
```

我们可以从JUnit测试用例中确认，_table_上的_addRowToTable_操作通过1增加了表格的行数。此操作在列表的末尾添加了新行。

**同样，我们可以通过在添加时指定索引，将行添加到任何位置。**

