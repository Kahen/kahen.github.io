---
date: 2022-04-01
category:
  - Java
  - Apache POI
tag:
  - Excel
  - Java
  - 教程
head:
  - - meta
    - name: keywords
      content: Java, Apache POI, Excel, 教程, 阅读Excel日期
------
# Java中从Excel读取数据值

当涉及到Microsoft Excel文件时，从不同单元格读取值可能有点棘手。Excel文件是按行和单元格组织的电子表格，可以包含字符串、数值、日期、布尔值，甚至是公式类型的值。Apache POI是一个提供一整套工具来处理不同Excel文件和值类型的库。

在本教程中，我们将专注于学习如何处理Excel文件，遍历行和单元格，并使用正确的方法读取每种单元格值类型。

### 2. Maven依赖项
让我们从向pom.xml添加Apache POI依赖项开始：

```xml
`<dependency>`
    `<groupId>`org.apache.poi`</groupId>`
    `<artifactId>`poi-ooxml`</artifactId>`
    `<version>`5.2.5`</version>`
`</dependency>`
```

可以在Maven Central找到poi-ooxml的最新版本。

### 3. Apache POI概述
层次结构从工作簿开始，它代表整个Excel文件。每个文件可以包含一个或多个工作表，这些工作表是行和单元格的集合。根据Excel文件的版本，HSSF是表示旧版Excel文件(.xls)的类的前缀，而XSSF用于最新版本(.xlsx)。因此我们有：

- XSSFWorkbook和HSSFWorkbook类代表Excel工作簿
- Sheet接口代表Excel工作表
- Row接口代表行
- Cell接口代表单元格

### 3.1. 处理Excel文件
首先，我们打开要读取的文件，将其转换为FileInputStream以进行进一步处理。FileInputStream构造函数会抛出java.io.FileNotFoundException，因此我们需要将其包装在try-catch块中，并在最后关闭流：

```java
public static void readExcel(String filePath) {
    File file = new File(filePath);
    try {
        FileInputStream inputStream = new FileInputStream(file);
        ...
        inputStream.close();
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

### 3.2. 遍历Excel文件
成功打开InputStream后，是时候创建XSSFWorkbook并遍历每个工作表的行和单元格了。如果我们知道确切的工作表数量或特定工作表的名称，我们可以使用XSSFWorkbook的getSheetAt(int index)和getSheet(String sheetName)方法。

由于我们想要读取任何类型的Excel文件，我们将使用三个嵌套的for循环遍历所有工作表，一个用于工作表，一个用于每个工作表的行，最后一个用于每个工作表的单元格。

为了本教程的目的，我们只会将数据打印到控制台：

```java
FileInputStream inputStream = new FileInputStream(file);
Workbook baeuldungWorkBook = new XSSFWorkbook(inputStream);
for (Sheet sheet : baeuldungWorkBook) {
...
}

```

然后，为了遍历工作表的行，我们需要找到第一行和最后一行的索引，我们从工作表对象中获取它们：

```java
int firstRow = sheet.getFirstRowNum();
int lastRow = sheet.getLastRowNum();
for (int index = firstRow + 1; index <= lastRow; index++) {
    Row row = sheet.getRow(index);
}
```

最后，我们对单元格做同样的操作。同时，在访问每个单元格时，我们可以可选地传递一个MissingCellPolicy，它基本上告诉POI当单元格值为空或null时返回什么。MissingCellPolicy枚举包含三个枚举值：

- RETURN_NULL_AND_BLANK
- RETURN_BLANK_AS_NULL
- CREATE_NULL_AS_BLANK;

单元格迭代的代码如下：

```java
for (int cellIndex = row.getFirstCellNum(); cellIndex < row.getLastCellNum(); cellIndex++) {
    Cell cell = row.getCell(cellIndex, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
    ...
}
```

### 3.3. 读取Excel中的单元格值
正如我们之前提到的，Microsoft Excel的单元格可以包含不同类型的值，因此能够区分一个单元格值类型与另一个并使用适当的方法提取值非常重要。下面有一个所有值类型的列表：

- NONE
- NUMERIC
- STRING
- FORMULA
- BLANK
- BOOLEAN
- ERROR

我们将专注于四种主要的单元格值类型：Numeric, String, Boolean和Formula，最后一个包含一个计算值，属于前三种类型之一。

让我们创建一个辅助方法，它基本上会检查每种值类型，并基于此使用适当的方法访问值。也可以将单元格值视为字符串，并使用相应的方法检索它。

有两件重要的事情值得注意。首先，日期值存储为数值，而且如果单元格的值类型是FORMULA，我们需要使用getCachedFormulaResultType()而不是getCellType()方法来检查公式的计算结果：

```java
public static void printCellValue(Cell cell) {
    CellType cellType = cell.getCellType().equals(CellType.FORMULA)
      ? cell.getCachedFormulaResultType() : cell.getCellType();
    if (cellType.equals(CellType.STRING)) {
        System.out.print(cell.getStringCellValue() + " | ");
    }
    if (cellType.equals(CellType.NUMERIC)) {
        if (DateUtil.isCellDateFormatted(cell)) {
            System.out.print(cell.getDateCellValue() + " | ");
        } else {
            System.out.print(cell.getNumericCellValue() + " | ");
        }
    }
    if (cellType.equals(CellType.BOOLEAN)) {
        System.out.print(cell.getBooleanCellValue() + " | ");
    }
}
```

现在，我们所要做的就是在单元格循环内调用printCellValue方法，我们就完成了。下面是完整代码的片段：

```java
...
for (int cellIndex = row.getFirstCellNum(); cellIndex < row.getLastCellNum(); cellIndex++) {
    Cell cell = row.getCell(cellIndex, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
    printCellValue(cell);
}
...
```

## 4. 结论
在本文中，我们展示了一个示例项目，使用Apache POI读取Excel文件并访问不同的单元格值。

完整的源代码可以在GitHub上找到。