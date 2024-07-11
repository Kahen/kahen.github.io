---
date: 2022-04-01
category:
  - Java
  - Apache POI
tag:
  - Date Format
  - Excel
head:
  - - meta
    - name: keywords
      content: Apache POI, Date Format, Excel, Java
---
# 使用Apache POI设置日期格式 | Baeldung

## **1. 引言**

在使用Apache POI处理日期时，我们希望确保它们被正确格式化。

幸运的是，使用Apache POI设置日期格式非常简单。在本教程中，我们将展示如何使用Apache POI为日期定义自定义_DataFormat_作为_CellStyle_，并如何使用现有的_DataFormats_。

## **2. 起点**

我们的起点将是一个新的_XSSFWorkbook_，一个_XSSFCell_，以及一个已经创建的_CellStyle_：

```java
XSSFWorkbook wb = new XSSFWorkbook();
CellStyle cellStyle = wb.createCellStyle();
wb.createSheet();
XSSFSheet sheet = wb.getSheetAt(0);
XSSFCell dateCell = sheet.createRow(0).createCell(0);
dateCell.setCellValue(new Date());
```

因为我们还没有设置我们想要的_DataFormat_，我们的_Date_将被转换为数字，并将显示为：

> 44898,9262857176

这种表示方式对我们人类来说阅读性很差。因此，接下来我们将看看如何通过格式化来创建更好的可视化效果。

## **2. 创建自定义_DataFormat_**

首先，我们需要创建一个新的_CreationHelper_。使用_CreationHelper_，我们可以创建一个新的_DataFormat_，并指定特定的_Format_。这个_DataFormat_在内部存储，并通过一个short引用。我们必须将其添加到_CellStyle_本身，并将_CellStyle_应用到_Cell_：

```java
CreationHelper createHelper = wb.getCreationHelper();
short format = createHelper.createDataFormat().getFormat("m.d.yy h:mm");
cellStyle.setDataFormat(format);
dateCell.setCellStyle(cellStyle);
```

设置好这个自定义_CellStyle_后，我们的日期将被格式化为：

```plaintext
02.12.2022 21:30
```

然而，如果我们创建一个新的自定义_DataFormat_，我们应该始终记住Excel工作簿支持的最大cell样式数量为65,000。因此，**我们应该始终重用现有的cell样式**，并尽可能将它们应用到多个单元格。

## **3. 使用默认_DataFormat_**

正如我们所学的，Apache POI使用shorts来链接不同的_DataFormats._ Excel已经有很多**内置_DataFormats_，我们可以通过直接调用它们的short来使用**：

```java
cellStyle.setDataFormat((short) 14);
dateCell.setCellStyle(cellStyle);
```

之后，我们可以使用以下代码行获取_DataFormat_的_String_表示形式：

```java
cellStyle.getDataFormatString();
```

在我们的示例中，我们将得到以下结果：

```plaintext
m/d/yy
```

最常见的_DataFormats_是：

| Short Value | 格式 |
| --- | --- |
| 14 | m/d/yy |
| 15 | d-mmm-yy |
| 16 | d-mmm |
| 17 | mmm-yy |
| 18 | h:mm AM/PM |
| 19 | h:mm:ss AM/PM |
| 20 | h:mm |
| 21 | h:mm:ss |
| 22 | m/d/yy h:mm |

如果这些数据格式符合我们的需求，我们应该始终使用其中之一，因为Excel将它们显示为它们的格式之一，而不是自定义格式。这也将**触发Excel使用本地化的格式可视化**。

## **4. 结论**

正如我们所看到的，使用Apache POI设置日期格式既快速又简单，但也是以人类可读的方式可视化日期所必需的。下次我们在电子表格中处理日期时，我们应该尝试使用它。

完整的示例可以在GitHub上找到。