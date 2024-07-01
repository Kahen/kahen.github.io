---
date: 2023-08-01
category:
  - Java
  - Apache POI
tag:
  - Excel
  - 锁定
  - 表头
head:
  - - meta
    - name: keywords
      content: Apache POI, Excel, 锁定表头, Java
------
# 使用Apache POI锁定Excel表头行

Apache POI是一个在Java社区中广受欢迎的开源库，用于处理Microsoft Office文档。它允许开发人员轻松地以编程方式操作Word文档和Excel电子表格文件。

锁定表头行是我们处理大型Excel电子表格时常见的操作。这为数据导航和分析提供了更加友好的用户体验。

在本教程中，我们将学习如何使用Apache POI来锁定Excel电子表格中的表头行。

### 2. 依赖性
首先，让我们向_pom.xml_文件中添加以下Maven依赖项：

```
``<dependency>``
    ``<groupId>``org.apache.poi``</groupId>``
    ``<artifactId>``poi``</artifactId>``
    ``<version>``5.2.5``</version>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.apache.poi``</groupId>``
    ``<artifactId>``poi-ooxml``</artifactId>``
    ``<version>``5.2.5``</version>``
``</dependency>``
```

_poi_是处理旧版二进制Excel文件（xls）所必需的。如果我们需要处理基于XML的Excel文件（xlsx），我们还需要额外的_poi-ooxml_。

### 3. 工作簿创建
在我们深入锁定表头行之前，让我们快速了解一下如何使用Apache POI创建Excel工作表并用数据填充它。

首先，我们需要设置_Workbook_和_Sheet_实例：

```
Workbook workbook = new XSSFWorkbook();
Sheet sheet = workbook.createSheet("MySheet");
```

如果我们希望创建一个二进制Excel文件而不是基于XML的文件，我们可以将_XSSFWorkbook_替换为_HSSFWorkbook_。

接下来，我们将创建表头行并添加表头单元格值：

```
Row headerRow = sheet.createRow(0);
Cell headerCell1 = headerRow.createCell(0);
headerCell1.setCellValue("Header 1");
Cell headerCell2 = headerRow.createCell(1);
headerCell2.setCellValue("Header 2");
```

一旦我们设置好表头行，我们将向工作表中添加更多数据：

```
Row dataRow = sheet.createRow(1);
Cell dataCell1 = dataRow.createCell(0);
dataCell1.setCellValue("Data 1");
Cell dataCell2 = dataRow.createCell(1);
dataCell2.setCellValue("Data 2");
```

### 4. 锁定
现在，让我们进入关键部分。Apache POI提供了一个简单的方法叫做_createFreezePane()_来锁定行和列。

_createFreezePane()_方法接受两个参数：_colSplit_和_rowSplit_。_colSplit_参数表示将保持未锁定的列索引，而_rowSplit_参数表示将锁定的行索引。

#### 4.1. 锁定单行
在大多数情况下，我们希望锁定第一行，以便在滚动数据时始终能看到表头行：

```
sheet.createFreezePane(0, 1);
```

我们注意到，当我们向下滚动时，第一行保持锁定并固定在顶部：

![img](https://www.baeldung.com/wp-content/uploads/2023/08/poi-lock-1st-row-1-300x140.jpg)

![img](https://www.baeldung.com/wp-content/uploads/2023/08/poi-lock-1st-row-2-300x138.jpg)

#### 4.2. 锁定多行
在某些情况下，我们可能希望锁定多行，以便用户在浏览数据时获得更多上下文。为了实现这一点，我们可以相应地**调整_rowSplit_参数**：

```
sheet.createFreezePane(0, 2);
```

在这个例子中，前两行在滚动时保持可见。

#### 4.3. 锁定列
除了锁定行之外，Apache POI还允许我们锁定列。这在我们有大量列并且希望保持特定列可见以供参考时非常有用：

```
sheet.createFreezePane(1, 0);
```

在这种情况下，工作表中的第一列被锁定。

### 5. 结论
在本文中，我们看到了如何使用Apache POI，这是一个强大的Java库，用于处理Microsoft Office文档来锁定表头行。

**通过使用_createFreezePane()_方法，我们可以定制锁定行为以满足我们的特定需求。这可以是保持标题固定，锁定多行以提供上下文，或锁定列。**这增强了数据导航和分析中的用户体验。

像往常一样，本文的源代码可以在GitHub上找到。