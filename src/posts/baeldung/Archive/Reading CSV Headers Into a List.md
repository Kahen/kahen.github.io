---
date: 2024-06-13
category:
  - Java
  - CSV
tag:
  - Java
  - CSV
  - OpenCSV
  - Apache Commons CSV
---
# 在Java中读取CSV头部到列表的不同方式

在这篇简短的教程中，我们将探讨在Java中将CSV头部读取到列表的不同方法。

首先，我们将学习如何使用JDK类来完成这项任务。然后，我们将看到如何使用如OpenCSV和Apache Commons CSV等外部库来实现相同的目标。

## 2. 使用BufferedReader

BufferedReader类为我们的挑战提供了最简单的解决方案。它提供了一种快速高效的方式来读取CSV文件，因为它通过分块读取内容来减少IO操作的次数。

让我们看看它的实际应用：

```java
class CsvHeadersAsListUnitTest {

    private static final String CSV_FILE = "src/test/resources/employees.csv";
    private static final String COMMA_DELIMITER = ",";
    private static final List\<String\> EXPECTED_HEADERS = List.of("ID", "First name", "Last name", "Salary");

    @Test
    void givenCsvFile_whenUsingBufferedReader_thenGetHeadersAsList() throws IOException {
        try (BufferedReader reader = new BufferedReader(new FileReader(CSV_FILE))) {
            String csvHeadersLine = reader.readLine();
            List\<String\> headers = Arrays.asList(csvHeadersLine.split(COMMA_DELIMITER));
            assertThat(headers).containsExactlyElementsOf(EXPECTED_HEADERS);
        }
    }
}
```

如我们所见，我们使用try-with-resources来创建一个BufferedReader实例。这样，我们确保文件在之后被关闭。此外，我们调用readLine()方法一次以提取表示头部的第一行。最后，我们使用split()方法和Arrays#asList来将头部作为列表获取。

## 3. 使用Scanner

Scanner类提供了另一种解决方案来实现相同的结果。顾名思义，它扫描并读取给定文件的内容。让我们添加另一个测试用例，看看如何使用Scanner读取CSV文件头部：

```java
@Test
void givenCsvFile_whenUsingScanner_thenGetHeadersAsList() throws IOException {
    try(Scanner scanner = new Scanner(new File(CSV_FILE))) {
        String csvHeadersLine = scanner.nextLine();
        List\<String\> headers = Arrays.asList(csvHeadersLine.split(COMMA_DELIMITER));
        assertThat(headers).containsExactlyElementsOf(EXPECTED_HEADERS);
    }
}
```

同样，Scanner类有nextLine()方法，我们可以使用它来获取输入文件的第一行。在这里，第一行代表我们CSV文件的头部。

## 4. 使用OpenCSV

另外，我们可以使用OpenCSV库来读取特定CSV文件的头部。在深入细节之前，让我们将Maven依赖项添加到pom.xml文件中：

```xml
\<dependency\>
    \<groupId\>com.opencsv\</groupId\>
    \<artifactId\>opencsv\</artifactId\>
    \<version\>5.9\</version\>
\</dependency\>
```

通常，OpenCSV带有一套现成的类和方法，用于读取和解析CSV文件。让我们通过一个实际的例子来说明这个库的使用：

```java
@Test
void givenCsvFile_whenUsingOpenCSV_thenGetHeadersAsList() throws CsvValidationException, IOException {
    try (CSVReader csvReader = new CSVReader(new FileReader(CSV_FILE))) {
        List\<String\> headers = Arrays.asList(csvReader.readNext());
        assertThat(headers).containsExactlyElementsOf(EXPECTED_HEADERS);
    }
}
```

如上所见，OpenCSV提供了CSVReader类来读取给定文件的内容。CSVReader类提供了readNext()方法，直接将下一行作为String数组检索。

## 5. 使用Apache Commons CSV

另一种解决方案是使用Apache Commons CSV库。顾名思义，它为创建和读取CSV文件提供了几种便利的功能。

首先，我们需要将最新版本的依赖项添加到pom.xml中：

```xml
\<dependency\>
    \<groupId\>org.apache.commons\</groupId\>
    \<artifactId\>commons-csv\</artifactId\>
    \<version\>1.11.0\</version\>
\</dependency\>
```

简而言之，Apache Commons CSV的CSVParser类提供了getHeaderNames()方法来返回一个只读的头部名称列表：

```java
@Test
void givenCsvFile_whenUsingApacheCommonsCsv_thenGetHeadersAsList() throws IOException {
    CSVFormat csvFormat = CSVFormat.DEFAULT.builder()
      .setDelimiter(COMMA_DELIMITER)
      .setHeader()
      .build();

    try (BufferedReader reader = new BufferedReader(new FileReader(CSV_FILE));
        CSVParser parser = CSVParser.parse(reader, csvFormat)) {
        List\<String\> headers = parser.getHeaderNames();
        assertThat(headers).containsExactlyElementsOf(EXPECTED_HEADERS);
    }
}
```

在这里，我们使用CSVParser类根据指定的格式解析输入文件。头部通过setHeader()方法的帮助自动从输入文件中解析。

## 6. 结论

在这篇短文中，我们探讨了将CSV文件头部作为列表读取的不同解决方案。

首先，我们学习了如何使用JDK来做到这一点。然后，我们看到如何使用外部库来实现相同的目标。

如常，本文中使用的代码可以在GitHub上找到。
