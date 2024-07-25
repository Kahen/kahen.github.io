---
date: 2021-10-01
category:
  - Apache POI
  - Excel
tag:
  - 多行文本
  - Java
head:
  - - meta
    - name: keywords
      content: Apache POI, Excel, Java, 多行文本
---

# 使用Apache POI在Excel单元格中写入多行文本

1. 引言

我们可以利用Apache POI在Microsoft Excel电子表格中以编程方式创建多行文本，但它们不会显示为多行。这是因为使用代码向单元格添加文本时，它不会自动调整单元格高度并应用所需的格式以将其转换为多行文本。

这个简短的教程将演示正确显示此类文本所需的代码。

2. Apache POI和Maven依赖

Apache POI是一个开源库，允许软件开发者创建和操作Microsoft Office文档。作为先决条件，读者可以参考我们关于使用Java操作Microsoft Excel的文章以及使用Apache POI在Excel中插入行的教程。

首先，我们需要将Apache POI依赖项添加到我们的项目_pom.xml_文件中：

```
`<dependency>`
    `<groupId>`org.apache.poi`</groupId>`
    `<artifactId>`poi`</artifactId>`
    `<version>`5.2.5`</version>`
`</dependency>`
```

3. 添加和格式化多行文本

让我们从一个包含多行文本的单元格开始：

```
cell.setCellValue("Hello \n world!");
```

如果我们仅使用上述代码生成并保存一个Excel文件，它将看起来像下面的图片：

![img](https://www.baeldung.com/wp-content/uploads/2021/10/multiline_text_before_formatting-1024x360.png)

我们可以点击上图中1和2所指的地方，以验证文本确实是多行文本。

使用代码，格式化单元格并将其行高扩展到等于或大于两行文本的任何值：

```
cell.getRow()
  .setHeightInPoints(cell.getSheet().getDefaultRowHeightInPoints() * 2);
```

之后，我们需要设置单元格样式以换行文本：

```
CellStyle cellStyle = cell.getSheet().getWorkbook().createCellStyle();
cellStyle.setWrapText(true);
cell.setCellStyle(cellStyle);
```

使用上述代码生成并查看在Microsoft Excel中的文件将显示单元格中的多行文本。

![img](https://www.baeldung.com/wp-content/uploads/2021/10/multiline_text_after_formatting-1024x449.png)

4. 总结

在本教程中，我们学习了如何使用Apache POI向单元格中添加多行文本。然后我们通过对单元格应用一些格式确保它以两行文本的形式可见。否则，单元格将显示为一行。

如往常一样，文章的源代码可在GitHub上获得。