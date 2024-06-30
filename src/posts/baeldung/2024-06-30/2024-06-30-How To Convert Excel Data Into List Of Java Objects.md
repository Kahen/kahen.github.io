---
date: 2024-06-30
category:
  - Java
  - Excel
tag:
  - Apache POI
  - Poiji
  - FastExcel
  - JExcelApi
head:
  - - meta
    - name: keywords
      content: Java, Excel, 数据转换, 列表, 对象
---

# 如何将Excel数据转换为Java对象列表 | Baeldung

## 1. 引言

在软件开发中，理解数据映射是至关重要的。Excel是一种广泛使用的数据管理软件，因此对于Java开发人员来说，了解如何在Excel和Java对象之间映射数据至关重要。

在本教程中，我们将探讨如何将Excel数据转换为Java对象列表。

在Maven仓库中有几种Java库可用于在Java中处理Excel文件，其中Apache POI是最常见的。然而，在本教程中，我们将使用四种Java Excel库，包括Apache POI、Poiji、FastExcel和JExcelApi (Jxl)，将Excel数据转换为Java对象列表。

## 2. 模型设置

要开始，我们需要创建我们对象的蓝图，即_FoodInfo_类：

```java
public class FoodInfo {
    private String category;
    private String name;
    private String measure;
    private double calories;

    // 标准构造函数，toString，getter和setter
}
```

## 3. Apache POI

Apache POI (Poor Obfuscation Implementation) 是一个用于Microsoft文档的Java API。它是一系列用于从/向Microsoft Office文件（如Word、Outlook、Excel等）读取和写入数据的纯Java库。

### 3.1. Maven依赖

让我们将我们的Maven依赖项添加到_pom.xml_文件中：

```xml
``````<dependency>``````
    ```````<groupId>```````org.apache.poi```````</groupId>```````
    ```````<artifactId>```````poi```````</artifactId>```````
    ```````<version>```````5.2.5```````</version>```````
```````</dependency>```````
``````<dependency>``````
    ```````<groupId>```````org.apache.poi```````</groupId>```````
    ```````<artifactId>```````poi-ooxml```````</artifactId>```````
    ```````<version>```````5.2.5```````</version>```````
```````</dependency>```````
``````<dependency>``````
    ```````<groupId>```````org.apache.poi```````</groupId>```````
    ```````<artifactId>```````poi-ooxml-schemas```````</artifactId>```````
    ```````<version>```````4.1.2```````</version>```````
```````</dependency>```````
```

### 3.2. 将Excel数据转换为对象列表

通过使用其_Workbook_接口，我们可以访问各种功能来读取Excel文件的表格和单元格。这个接口有两个实现，每个Excel格式一个——_HSSFWorkbook_用于_.xls_和_XSSFWorkbook_用于_.xlsx_。

这段代码片段使用Apache POI库从_.xlsx_文件读取并转换Excel数据到_FoodInfo_对象列表：

```java
public static List`````````````<FoodInfo>````````````` excelDataToListOfObjets_withApachePOI(String fileLocation)
    throws IOException {
    FileInputStream file = new FileInputStream(new File(fileLocation));
    Workbook workbook = new XSSFWorkbook(file);
    Sheet sheet = workbook.getSheetAt(0);
    List`````````````<FoodInfo>````````````` foodData = new ArrayList`````````````<FoodInfo>`````````````();
    DataFormatter dataFormatter = new DataFormatter();
    for (int n = 1; n < sheet.getPhysicalNumberOfRows(); n++) {
        Row row = sheet.getRow(n);
        FoodInfo foodInfo = new FoodInfo();
        int i = row.getFirstCellNum();

        foodInfo.setCategory(dataFormatter.formatCellValue(row.getCell(i)));
        foodInfo.setName(dataFormatter.formatCellValue(row.getCell(++i)));
        foodInfo.setMeasure(dataFormatter.formatCellValue(row.getCell(++i)));
        foodInfo.setCalories(row.getCell(++i).getNumericCellValue());

        foodData.add(foodInfo);
    }
    return foodData;
}
```

## 4. Poiji

Poiji是一个线程安全的Java库，提供了一个从Excel表格到Java类的单向数据映射API。它建立在Apache POI库之上。但与Apache POI不同，它更易于使用，并且直接将每个Excel行转换为Java对象。

### 4.1. 设置Maven依赖

这是我们需要添加到_pom.xml_文件中的Poiji Maven依赖：

```xml
``````<dependency>``````
    ```````<groupId>```````com.github.ozlerhakan```````</groupId>```````
    ```````<artifactId>```````poiji```````</artifactId>```````
    ```````<version>```````4.1.1```````</version>```````
```````</dependency>```````
```

### 4.2. 使用注解设置类

Poiji库通过要求类字段使用_@ExcelCellName(String cellName)_或_@ExcelCell(int cellIndex)_进行注解，简化了Excel数据检索。

下面，我们通过添加注解为Poiji库设置_FoodInfo_类：

```java
public class FoodInfo {
    @ExcelCellName("Category")
    private String category;

    @ExcelCellName("Name")
    private String name;

    @ExcelCellName("Measure")
    private String measure;

    @ExcelCellName("Calories")
    private double calories;

    // 标准构造函数，getter和setter
}
```

API支持映射具有多个表格的Excel工作簿。当我们的文件有多个表格时，我们可以在我们的类上使用_@ExcelSheet(String sheetName)_注解来指示我们想要工作的表格。其他表格将被忽略。

然而，如果我们不使用这个注解，只有工作簿中的第一个Excel表格会被考虑。

在某些情况下，我们可能不需要从我们正在针对的Excel表格中提取每一行的数据。为了解决这个问题，我们可以在我们的类中包含一个用_@ExcelRow_注解的_private int_ _rowIndex_属性。这将允许我们指定我们想要访问的行项的索引。

### 4.3. 将Excel数据转换为对象列表

与本文中提到的库不同，Poiji库默认情况下会忽略Excel表格的标题行。

以下代码片段从Excel文件中提取数据，并将其转换为_FoodInfo_列表：

```java
public class ExcelDataToListOfObjectsPOIJI {
    public static List`````````````<FoodInfo>````````````` excelDataToListOfObjets_withPOIJI(String fileLocation){
        return Poiji.fromExcel(new File(fileLocation), FoodInfo.class);
    }
}
```

程序将_fileLocation文件_的第一个Excel表格转换为_FoodInfo_类。每一行都成为_FoodInfo_类的一个实例，单元格值表示对象的属性。输出是一个_FoodInfo_对象列表，其大小等同于原始Excel表格中行数（不包括标题行）。

在某些情况下，我们的Excel表格可能受到密码保护。我们可以通过_PoijiOptionsBuilder_定义密码：

```java
PoijiOptions options = PoijiOptionsBuilder.settings()
  .password("`<excel_sheet_password>`").build();
List`````````````<FoodInfo>````````````` foodData = Poiji.fromExcel(new File(fileLocation), FoodInfo.class, options);
```

为了确保我们的代码按预期工作，我们编写一个单元测试：

```java
@Test
public void whenParsingExcelFileWithPOIJI_thenConvertsToList() throws IOException {
    List`````````````<FoodInfo>````````````` foodInfoList =
      ExcelDataToListOfObjectsPOIJI
        .excelDataToListOfObjets_withPOIJI("src\\main\\resources/food_info.xlsx");

    assertEquals("Beverages", foodInfoList.get(0).getCategory());
    assertEquals("Dairy", foodInfoList.get(3).getCategory());
}
```

## 5. FastExcel

FastExcel是一个高效的库，它使用最少的内存，并为在Java中创建和读取基本Excel工作簿提供高性能。它仅支持较新的Excel文件版本（_.xlsx_），并且与Apache POI相比，其功能有限。

它只读取单元格内容，不包括图表、样式或其他单元格格式。

### 5.1. 设置Maven依赖

下面是添加到_pom.xml_的FastExcel和FastExcel reader Maven依赖：

```xml
``````<dependency>``````
      ```````<groupId>```````org.dhatim```````</groupId>```````
      ```````<artifactId>```````fastexcel```````</artifactId>```````
      ```````<version>```````0.15.7```````</version>```````
```````</dependency>```````
``````<dependency>``````
      ```````<groupId>```````org.dhatim```````</groupId>```````
      ```````<artifactId>```````fastexcel-reader```````</artifactId>```````
      ```````<version>```````0.15.7```````</version>```````
```````</dependency>```````
```

### 5.2. 将Excel数据转换为对象列表

在处理大型文件时，FastExcel reader是一个不错的选择，尽管其功能有限。它易于使用，我们可以使用_ReadableWorkbook_类访问整个Excel工作簿。

这允许我们单独通过名称或索引检索表格。

在下面的方法中，我们从Excel表格中读取数据并将其转换为_FoodInfo_对象列表：

```java
public static List`````````````<FoodInfo>````````````` excelDataToListOfObjets_withFastExcel(String fileLocation)
   throws IOException, NumberFormatException {
    List`````````````<FoodInfo>````````````` foodData = new ArrayList`````````````<FoodInfo>`````````````();

    try (FileInputStream file = new FileInputStream(fileLocation);
      ReadableWorkbook wb = new ReadableWorkbook(file)) {
        Sheet sheet = wb.getFirstSheet();
        for (Row row: sheet.read()) {
            if (row.getRowNum() == 1) {
                continue;
            }
            FoodInfo food = new FoodInfo();
            food.setCategory(row.getCellText(0));
            food.setName(row.getCellText(1));
                      food.setMeasure(row.getCellText(2));
            food.setCalories(Double.parseDouble(row.getCellText(3)));

            foodData.add(food);
        }
    }
    return foodData;
}

// 由于API读取了表格中的所有行(包括标题行)，我们需要在遍历行时跳过第一行(非零基索引)。
// 访问单元格可以通过实例化一个_Cell_类：_Cell cell = row.getCell()_，它有两个实现，一个接受一个_int cellIndex_，另一个接受一个_String cellAddress_（例如，“C4”）参数。或者直接获取单元格中的数据：例如，_row.getCellText()_。
// 无论哪种方式，在提取每个单元格的内容后，我们需要确保必要时将其转换为适当的_food_对象字段类型。

让我们编写一个单元测试以确保转换工作正常：

```java
@Test
public void whenParsingExcelFileWithFastExcel_thenConvertsToList() throws IOException {
    List`````````````<FoodInfo>````````````` foodInfoList = ExcelDataToListOfObjectsFastExcel
      .excelDataToListOfObjets_withFastExcel("src\\main\\resources/food_info.xlsx");

    assertEquals("Beverages", foodInfoList.get(0).getCategory());
    assertEquals("Dairy", foodInfoList.get(3).getCategory());
}
```

## 6. JExcelApi (Jxl)

**JExcelApi (或 Jxl) 是一个轻量级的Java库，用于读取、写入和修改Excel电子表格。**

### 6.1. 设置Maven依赖

让我们将JExcelApi的Maven依赖添加到_pom.xml_文件中：

```xml
``````<dependency>``````
    ```````<groupId>```````net.sourceforge.jexcelapi```````</groupId>```````
    ```````<artifactId>```````jxl```````</artifactId>```````
    ```````<version>```````2.6.12```````</version>```````
```````</dependency>```````
```

### 6.2. 将Excel数据转换为对象列表

尽管它只支持旧版本的Excel格式(._xls_)文件，JExcel库提供了一系列的类来操作Excel文件。_Workbook_类用于访问文件中的Excel表格列表。

下面的代码使用该库将数据从_.xls_文件转换为_FoodInfo_对象列表，_foodData_：

```java
public static List`````````````<FoodInfo>````````````` excelDataToListOfObjets_withJxl(String fileLocation)
  throws IOException, BiffException {

    List`````````````<FoodInfo>````````````` foodData = new ArrayList`````````````<FoodInfo>`````````````();

    Workbook workbook = Workbook.getWorkbook(new File(fileLocation));
    Sheet sheet = workbook.getSheet(0);

    int rows = sheet.getRows();

    for (int i = 1; i < rows; i++) {
        FoodInfo foodInfo = new FoodInfo();

        foodInfo.setCategory(sheet.getCell(0, i).getContents());
        foodInfo.setName(sheet.getCell(1, i).getContents());
        foodInfo.setMeasure(sheet.getCell(2, i).getContents());
        foodInfo.setCalories(Double.parseDouble(sheet.getCell(3, i).getContents()));

        foodData.add(foodInfo);
    }

    return foodData;
}
```

由于库不忽略标题行，我们必须从_i = 1_开始循环。表格对象是一个基于零的行列表。

**使用JExcel库检索单元格数据与FastExcel库非常相似。两个库都使用getCell()方法，有两个实现。**

然而，在JExcel中，这个方法是直接从_Sheet_对象而不是_Row_对象访问的。此外，getCell()方法的一个实现在JExcel中接受两个参数，_colNum_和_rowNum_，它们都是整数：_sheet.getCell(colNum, rowNum)_。

为了确保转换工作良好，让我们为我们的方法编写一个单元测试：

```java
@Test
public void whenParsingExcelFileWithJxl_thenConvertsToList()
  throws IOException, BiffException {
    List`````````````<FoodInfo>````````````` foodInfoList = ExcelDataToListOfObjectsJxl
      .excelDataToListOfObjets_withJxl("src\\main\\resources/food_info.xls");

    assertEquals("Beverages", foodInfoList.get(0).getCategory());
    assertEquals("Dairy", foodInfoList.get(3).getCategory());
}
```

## 7. 结论

在本文中，我们探讨了使用几种库，如Apache POI、Poiji、FastExcel和JExcelApi，从Excel文件读取并转换数据到Java对象。然而，选择使用哪个库取决于具体需求，考虑到每个库的优势和局限性。

例如，如果我们优先考虑从Excel文件中读取数据并直接将其转换为Java对象列表的最简单方式，我们可能会选择使用Poiji库。

当涉及到Java中Excel数据映射的性能和简单性时，FastExcel和JExcelApi库是极好的选择。然而，与支持样式和图表的功能丰富的Apache POI库相比，它们提供的功能较少。

如常，本文的完整源代码可在GitHub上找到。

[文章结束]

OK