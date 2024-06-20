---
date: 2024-06-21
category:
  - Java
  - Excel
tag:
  - JSON
  - Apache POI
  - Jackson
head:
  - - meta
    - name: keywords
      content: Java, Excel, JSON, Apache POI, Jackson
---

# Java中Excel转JSON的转换方法

将Excel数据转换为JSON格式在许多Java应用程序中很常见，特别是在处理不同系统之间的数据交换时。

## 1. 引言

在本教程中，我们将探讨在Java中将Excel文件转换为JSON的两种方法。

## 2. 使用Apache POI库与JSON

Apache POI是一个流行的Java库，用于读写Microsoft Office文件格式，包括Excel。因此，我们可以使用POI来读取Excel文件并将数据转换为JSON格式。

### 2.1. 添加Apache POI和JSON依赖

首先，我们需要将Apache POI和JSON依赖添加到我们的项目中。如果我们使用Maven，请在_pom.xml_中包含以下依赖：

```xml
```<dependency>```
    ```<groupId>```org.apache.poi```</groupId>```
    ```<artifactId>```poi```</artifactId>```
    ```<version>```5.2.5```</version>```
```</dependency>```
```

```xml
```<dependency>```
    ```<groupId>```org.json```</groupId>```
    ```<artifactId>```json```</artifactId>```
    ```<version>```20230227```</version>```
```</dependency>```
```

### 2.2. 读取Excel数据并转换为JSON

以下是使用Apache POI读取Excel文件并将数据转换为JSON的示例Java代码：

```java
JSONArray jsonArray = new JSONArray();
public String expectedJson = "[["C1","C2","C3","C4","C5"]," +
  "["1.0","2.0","3.0","4.0","5.0"]," +
  "["1.0","2.0","3.0","4.0","5.0"]," +
  "["1.0","2.0","3.0","4.0","5.0"]," +
  "["1.0","2.0","3.0","4.0","5.0"]]";
private Workbook workbook;
private Sheet sheet;
private InputStream inputStream;

public ExcelToJsonUnitTest() throws IOException {
    inputStream = new FileInputStream(filePath);
    workbook = new XSSFWorkbook(inputStream);
    sheet = workbook.getSheetAt(0);
}
```

将Excel转换为JSON首先需要初始化一个_InputStream_，它以_filePath_为参数来读取Excel文件。

然后，我们将这个文件加载到一个_Workbook_对象中，明确使用_.xlsx_文件的_XSSFWorkbook_实现。有了_workbook_变量后，可以通过_getSheetAt(0)_方法访问所需的工作表，假设它是第一个工作表。

现在，让我们通过使用Apache POI功能遍历工作表中的每行和每个单元格来处理Excel数据：

```java
Row headerRow = sheet.getRow(0);
List``<String>`` headers = new ArrayList<>();
for (Cell cell : headerRow) {
    headers.add(cell.toString());
}
jsonArray.put(headers);
```

最初，我们使用_sheet.getRow(0)_检索Excel工作表的_headerRow_，并使用_headerRow.cellIterator()_方法遍历标题行中的每个_cell_。对于每个_cell_，我们使用_cell.toString()_方法提取其内容作为字符串并存储在_jsonArray_列表中。此过程确保我们准确捕获所有标题值。

随后，我们将使用for循环遍历Excel工作表的每一行（不包括标题行）：

```java
for (int i = 1; i <= sheet.getLastRowNum(); i++) {
    Row row = sheet.getRow(i);
    List``<String>`` rowData = new ArrayList<>();
    for (Cell cell : row) {
        rowData.add(cell.toString());
    }
    jsonArray.put(rowData);
}
```

在这里，我们使用_sheet.getRow(i)_检索每一行。此外，我们遍历当前_row_中的每个_cell_，并将内容添加到_rowData_。这个列表代表Excel文件中的行，然后使用_jsonArray.put()_添加到_JSONArray_。

```java
assertEquals(expectedJson, jsonArray.toString());
```

最后，我们使用assertEquals()断言它与预期的JSON字符串相等。

## 3. 使用Apache POI库与Jackson

Jackson是一个流行的Java JSON处理库。它为将Java对象转换为JSON以及反之提供了强大的数据绑定特性。

### 3.1. 添加Jackson依赖

我们首先通过在_pom.xml_中添加以下依赖来开始：

```xml
```<dependency>```
    ```<groupId>```com.fasterxml.jackson.core```</groupId>```
    ```<artifactId>```jackson-databind```</artifactId>```
    ```<version>```2.17.0```</version>```
```</dependency>```
```

### 3.2. 读取Excel数据并转换为JSON

这里的转换过程有所不同，因为它侧重于将Excel数据结构化为Java对象，然后序列化为JSON。Jackson的_ObjectMapper_类在这里至关重要，因为它可以轻松地将Java对象转换为JSON字符串：

```java
@Test
public void givenExcelFile_whenUsingJacksonConversion_thenConvertToJson() throws JsonProcessingException {
    List<List``<String>``> data = new ArrayList<>();

    Row headerRow = sheet.getRow(0);
    List``<String>`` headers = new ArrayList<>();
    for (Cell cell : headerRow) {
        headers.add(cell.toString());
    }
    data.add(headers);

    for (int i = 1; i <= sheet.getLastRowNum(); i++) {
        Row row = sheet.getRow(i);
        List``<String>`` rowData = new ArrayList<>();
        for (Cell cell : row) {
            rowData.add(cell.toString());
        }
        data.add(rowData);
    }

    ObjectMapper objectMapper = new ObjectMapper();
    String json = objectMapper.writeValueAsString(data);

    assertEquals(expectedJson, json);
}
```

在这里，我们初始化一个名为_data_的空数据列表，以结构化的方式保存Excel数据。然后，它遍历Excel工作表的每一行，将_cell_值转换为字符串并存储在_data_列表中。收集完所有数据后，我们使用Jackson的_ObjectMapper_将结构化列表转换为JSON字符串，使用_writeValueAsString()_方法。

Jackson的优势在于其强大的数据绑定能力，非常适合处理复杂的对象结构，并提供高度的抽象。

## 4. 结论

在本文中，我们讨论了在Java中将Excel文件转换为JSON格式的两种方法：使用Apache POI读取和处理Excel数据，然后使用_JSON_和Jackson库将其转换为JSON。

这两个库都提供了方便的方式来读取Excel文件并操作它们的数据，使我们能够无缝地将Excel数据转换为JSON对象，以便在我们的Java应用程序中进一步处理。

如常，本文的完整代码示例可以在GitHub上找到。