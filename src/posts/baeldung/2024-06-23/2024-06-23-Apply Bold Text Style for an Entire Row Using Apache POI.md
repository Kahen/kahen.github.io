---
date: 2024-06-24
category:
  - Apache POI
  - Excel
tag:
  - 教程
  - Java
head:
  - - meta
    - name: keywords
      content: Apache POI, Excel, Java, 教程
---
# 使用Apache POI为整个行应用粗体文本样式

在这个快速教程中，我们将探索使用Apache POI库在Excel工作表中为整行应用粗体字体样式的有效方法。通过简单的例子和有价值的见解，我们将了解每种方法的细微差别。

## 2. 依赖性

让我们从编写和加载Excel文件所需的依赖性开始，poi：

```xml
`<dependency>`
    `<groupId>`org.apache.poi`</groupId>`
    `<artifactId>`poi`</artifactId>`
    `<version>`5.2.5`</version>`
`</dependency>`
```

## 3. 场景和辅助方法

我们的场景涉及创建一个带有标题行和一些数据行的工作表。然后，我们将为标题行中使用的字体定义一个粗体样式。最重要的是，我们将创建一些方法来设置这种粗体样式。我们将看到为什么我们需要多个方法来做到这一点，因为显而易见的选择（_setRowStyle()_）并没有按预期工作。

**为了便于工作表的创建，我们将从一个工具类开始。** 让我们编写几个方法来创建带有单元格的单元格和行：

```java
public class PoiUtils {
    private static void newCell(Row row, String value) {
        short cellNum = row.getLastCellNum();
        if (cellNum == -1)
            cellNum = 0;

        Cell cell = row.createCell(cellNum);
        cell.setCellValue(value);
    }

    public static Row newRow(Sheet sheet, String... rowValues) {
        Row row = sheet.createRow(sheet.getLastRowNum() + 1);

        for (String value : rowValues) {
            newCell(row, value);
        }

        return row;
    }

    // ...
}
```

**然后，要创建粗体字体样式，我们首先将从我们的_Workbook_创建一个字体，然后调用_setBold(true)_。** 其次，我们将创建一个将使用我们的粗体字体的_CellStyle_：

```java
public static CellStyle boldFontStyle(Workbook workbook) {
    Font boldFont = workbook.createFont();
    boldFont.setBold(true);

    CellStyle boldStyle = workbook.createCellStyle();
    boldStyle.setFont(boldFont);

    return boldStyle;
}
```

最后，要将我们的工作表写入文件，我们需要在我们的_Workbook_上调用_write()_：

```java
public static void write(Workbook workbook, Path path)
  throws IOException {
    try (FileOutputStream fileOut = new FileOutputStream(path.toFile())) {
        workbook.write(fileOut);
    }
}
```

## 4. 使用_setRowStyle()_的注意事项

在查看POI API时，我们任务的最明显选择是_Row.setRowStyle()_。**不幸的是，这种方法并不可靠，并且目前有一个漏洞是开放的。** **问题似乎是Microsoft Office渲染器忽略了行样式，只关心单元格样式。**

**另一方面，它在OpenOffice中有效，但只有在我们使用_SXSSFWorkbook_实现时，这是为大文件设计的。** 为了测试这一点，我们将从一个示例工作表方法开始：

```java
private void writeSampleSheet(Path destination, Workbook workbook)
  throws IOException {
    Sheet sheet = workbook.createSheet();
    CellStyle boldStyle = PoiUtils.boldFontStyle(workbook);

    Row header = PoiUtils.newRow(sheet, "Name", "Value", "Details");
    header.setRowStyle(boldStyle);

    PoiUtils.newRow(sheet, "Albert", "A", "First");
    PoiUtils.newRow(sheet, "Jane", "B", "Second");

    PoiUtils.write(workbook, destination);
}
```

然后，使用断言方法来检查第一行和第二行上的样式。**首先，我们断言第一_Row_具有粗体字体样式。然后，对于其中的每个单元格，我们断言默认样式与我们为第一_Row_设置的样式不同。这断言我们的行样式具有优先权。** 最后，我们断言第二_Row_没有应用任何样式：

```java
private void assertRowStyleAppliedAndDefaultCellStylesDontMatch(Path sheetFile)
  throws IOException, InvalidFormatException {
    try (Workbook workbook = new XSSFWorkbook(sheetFile.toFile())) {
        Sheet sheet = workbook.getSheetAt(0);
        Row row0 = sheet.getRow(0);

        XSSFCellStyle rowStyle = (XSSFCellStyle) row0.getRowStyle();
        assertTrue(rowStyle.getFont().getBold());

        row0.forEach(cell -> {
            XSSFCellStyle style = (XSSFCellStyle) cell.getCellStyle();
            assertNotEquals(rowStyle, style);
        });

        Row row1 = sheet.getRow(1);
        XSSFCellStyle row1Style = (XSSFCellStyle) row1.getRowStyle();
        assertNull(row1Style);

        Files.delete(sheetFile);
    }
}
```

最终，我们的测试包括将工作表写入临时文件，然后再次读取它。我们确保应用了我们的风格，测试了第一行和第二行上的风格，然后删除了文件：

```java
@Test
void givenXssfWorkbook_whenSetRowStyle1stRow_thenOnly1stRowStyled()
  throws IOException, InvalidFormatException {
    Path sheetFile = Files.createTempFile("xssf-row-style", ".xlsx");

    try (Workbook workbook = new XSSFWorkbook()) {
        writeSampleSheet(sheetFile, workbook);
    }

    assertRowStyleAppliedAndDefaultCellStylesDontMatch(sheetFile);
}
```

**现在运行此测试时，我们可以检查我们只对第一行应用了粗体样式，这正是我们打算做的。**

## 5. 在行中使用_setCellStyle()_单元格

鉴于_setRowStyle()_的问题，我们只剩下_setCellStyle()_。我们需要它来为我们要应用粗体样式的行中的每个单元格设置样式。所以，**让我们通过遍历标题中的每个单元格并使用我们的粗体样式调用_setCellStyle()_来修改我们的原始代码**：

```java
@Test
void givenXssfWorkbook_whenSetCellStyleForEachRow_thenAllCellsContainStyle()
  throws IOException, InvalidFormatException {
    Path sheetFile = Files.createTempFile("xssf-cell-style", ".xlsx");

    try (Workbook workbook = new XSSFWorkbook()) {
        Sheet sheet = workbook.createSheet();
        CellStyle boldStyle = PoiUtils.boldFontStyle(workbook);

        Row header = PoiUtils.newRow(sheet, "Name", "Value", "Details");
        header.forEach(cell -> cell.setCellStyle(boldStyle));

        PoiUtils.newRow(sheet, "Albert", "A", "First");
        PoiUtils.write(workbook, sheetFile);
    }

    // ...
}
```

**这样，我们可以保证我们的风格在格式和平台上一致地应用。** 让我们通过断言行样式没有设置，并且第一行的每个单元格都包含粗体字体样式来完成我们的测试：

```java
try (Workbook workbook = new XSSFWorkbook(sheetFile.toFile())) {
    Sheet sheet = workbook.getSheetAt(0);
    Row row0 = sheet.getRow(0);

    XSSFCellStyle rowStyle = (XSSFCellStyle) row0.getRowStyle();
    assertNull(rowStyle);

    row0.forEach(cell -> {
        XSSFCellStyle style = (XSSFCellStyle) cell.getCellStyle();
        assertTrue(style.getFont().getBold());
    });

    Row row1 = sheet.getRow(1);
    rowStyle = (XSSFCellStyle) row1.getRowStyle();
    assertNull(rowStyle);

    Files.delete(sheetFile);
}
```

注意，我们这里只使用_XSSFWorkbook_是为了方便。这种方法在所有_Workbook_实现中都一致有效。

## 6. 结论

在这篇文章中，我们了解到虽然_setRowStyle()_可能不可靠地实现我们的目标，但我们发现了一个使用_setCellStyle()_的稳健替代方案。现在我们可以自信地格式化Excel工作表中的行，确保在各种平台上获得一致且视觉上有影响力的结果。

如常，源代码可在GitHub上找到。