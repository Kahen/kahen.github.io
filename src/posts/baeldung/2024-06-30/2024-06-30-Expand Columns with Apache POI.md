---
date: 2023-09-01
category:
  - Java
  - Apache POI
tag:
  - Excel
  - Spreadsheet
head:
  - - meta
    - name: keywords
      content: Apache POI, Excel, 列宽调整, Java
---

# 使用Apache POI扩展列宽

Apache POI是一个流行的Java API，用于以编程方式操作不同类型的Microsoft Office文档，如Word、Excel和PowerPoint。

**我们经常需要在Excel电子表格中扩展列宽。这是制作电子表格供人们阅读时的一个常见需求。** 这有助于读者更好地可视化列中的内容，而这在默认列宽下是做不到的。

在本教程中，我们将学习如何使用API手动和自动调整Excel电子表格中的列宽。

## 2. 依赖项

首先，我们需要在Maven的_pom.xml_中添加以下Apache POI依赖项：

```xml
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

## 3. 电子表格准备

让我们先快速回顾一下创建Excel电子表格的过程。我们将准备一个Excel电子表格并填充一些数据以供演示：

```java
Workbook workbook = new XSSFWorkbook();
Sheet sheet = workbook.createSheet("NewSheet");

Row headerRow = sheet.createRow(0);
Cell headerCell1 = headerRow.createCell(0);
headerCell1.setCellValue("Full Name");
Cell headerCell2 = headerRow.createCell(1);
headerCell2.setCellValue("Abbreviation");

Row dataRow = sheet.createRow(1);
Cell dataCell1 = dataRow.createCell(0);
dataCell1.setCellValue("Java Virtual Machine");
Cell dataCell2 = dataRow.createCell(1);
dataCell2.setCellValue("JVM");

// 在此处创建更多数据行...
```

现在，如果我们在Excel中打开生成的电子表格，我们将看到每个列都有相同的默认宽度：

![img](https://www.baeldung.com/wp-content/uploads/2023/09/poi-default-columns.jpg)

显然，由于列宽有限，第一列中的内容太长而被截断。

## 4. 宽度调整

Apache POI提供了两种不同的方法来调整列宽。我们可以根据我们自己的需求选择任何一种方法。现在让我们探索这两种方法。

### 4.1. 固定宽度调整

**我们可以通过在目标_Sheet_实例上调用_setColumnWidth()_来扩展特定列到固定宽度。** 此方法有两个参数，分别是_columnIndex_和_width_。

**手动推导出显示所有内容的列宽是复杂的，因为这取决于各种因素，如字体类型和大小。** 根据API文档中_setColumnWidth()_的定义，_width_参数是以1/256个字符宽度为单位。

考虑到Excel中默认的字体Calibri字体大小为11，我们可以使用单元格中的字符数 * 256作为列宽的粗略估计：

```java
String cellValue = row.getCell(0).getStringCellValue();
sheet.setColumnWidth(0, cellValue.length() * 256);
```

调整后，我们将看到第一列中的全部内容：

![img](https://www.baeldung.com/wp-content/uploads/2023/09/poi-fixed-width-column.jpg)

自己推导出列宽有点麻烦。特别是当我们处理包含大量数据行的电子表格时。我们必须逐行检查以确定最大字符计数。包含不同字体和大小的列的存在进一步增加了宽度计算的复杂性。

### 4.2. 自动宽度调整

幸运的是，**Apache POI提供了一个方便的方法，_autoSizeColumn()_，来自动调整列宽。** 这确保了列的内容可以完全被读者看到。

_autoSizeColumn()_只需要一个参数，即零基列索引。我们可以使用以下代码自动调整第一列的列宽：

```java
sheet.autoSizeColumn(0);
```

如果我们对每个列都应用_autoSizeColumn()_，我们会看到以下情况。现在所有列的内容都完全可见，没有任何截断：

![img](https://www.baeldung.com/wp-content/uploads/2023/09/poi-auto-size-columns.jpg)

## 5. 结论

在本文中，我们探讨了Apache POI中调整Excel电子表格列宽的两种不同方法：固定宽度调整和自动宽度调整。调整列宽对于提高可读性和创建用户友好的Excel电子表格至关重要。

像往常一样，文章的源代码可以在GitHub上找到。