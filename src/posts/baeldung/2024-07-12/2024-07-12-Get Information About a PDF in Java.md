---
date: 2022-04-01
category:
  - Java
  - PDF
tag:
  - iText
  - PDFBox
head:
  - - meta
    - name: keywords
      content: Java, PDF, iText, PDFBox, PDF信息获取
---
# 在Java中获取PDF文件信息

在这个教程中，我们将了解使用Java中的iText和PDFBox库获取PDF文件信息的不同方式。

### 2. 使用iText库

iText是一个用于创建和操作PDF文档的库。同时，它还提供了一个简单的方式来获取有关文档的信息。

#### 2.1. Maven依赖

首先，让我们在_pom.xml_中声明_itextpdf_依赖：

```xml
``<dependency>``
    ``<groupId>``com.itextpdf``</groupId>``
    ``<artifactId>``itextpdf``</artifactId>``
    ``<version>``5.5.13.3``</version>``
``</dependency>``
```

#### 2.2. 获取页数

让我们创建一个_PdfInfoIText_类，其中包含一个_getNumberOfPages()_方法，该方法返回PDF文档的页数：

```java
public class PdfInfoIText {

    public static int getNumberOfPages(final String pdfFile) throws IOException {
        PdfReader reader = new PdfReader(pdfFile);
        int pages = reader.getNumberOfPages();
        reader.close();
        return pages;
    }
}
```

在我们的示例中，首先，我们使用_PdfReader_类从_File_对象加载PDF。之后，我们使用_getNumberOfPages()_方法。最后，我们关闭_PdfReader_对象。让我们为它声明一个测试用例：

```java
@Test
public void givenPdf_whenGetNumberOfPages_thenOK() throws IOException {
    Assert.assertEquals(4, PdfInfoIText.getNumberOfPages(PDF_FILE));
}
```

在我们的测试用例中，我们验证了存储在测试_resources_文件夹中的给定PDF文件的页数。

#### 2.3. 获取PDF元数据

现在让我们来看看如何获取文档的元数据。我们将使用_getInfo()_方法。此方法可以获取文件的信息，如标题、作者、创建日期、创建者、生成者等。让我们将_getInfo()_方法添加到我们的_PdfInfoIText_类中：

```java
public static Map```<String, String>``` getInfo(final String pdfFile) throws IOException {
    PdfReader reader = new PdfReader(pdfFile);
    Map```<String, String>``` info = reader.getInfo();
    reader.close();
    return info;
}
```

现在，让我们为获取文档的创建者和生成者编写一个测试用例：

```java
@Test
public void givenPdf_whenGetInfo_thenOK() throws IOException {
    Map```<String, String>``` info = PdfInfoIText.getInfo(PDF_FILE);
    Assert.assertEquals("LibreOffice 4.2", info.get("Producer"));
    Assert.assertEquals("Writer", info.get("Creator"));
}
```

#### 2.4. 了解PDF密码保护

我们现在想知道文档是否有密码保护。为此，让我们向_PdfInfoIText_类添加_isEncrypted()_方法：

```java
public static boolean isPasswordRequired(final String pdfFile) throws IOException {
    PdfReader reader = new PdfReader(pdfFile);
    boolean isEncrypted = reader.isEncrypted();
    reader.close();
    return isEncrypted;
}
```

现在，让我们创建一个测试用例来看看这个方法的表现：

```java
@Test
public void givenPdf_whenIsPasswordRequired_thenOK() throws IOException {
    Assert.assertFalse(PdfInfoIText.isPasswordRequired(PDF_FILE));
}
```

在接下来的部分，我们将使用PDFBox库执行相同的工作。

### 3. 使用PDFBox库

通过使用Apache PDFBox库，我们还可以获取PDF文件的信息。

#### 3.1. Maven依赖

我们需要在项目中包含_pdfbox_ Maven依赖：

```xml
``<dependency>``
    ``<groupId>``org.apache.pdfbox``</groupId>``
    ``<artifactId>``pdfbox``</artifactId>``
    ``<version>``3.0.0``</version>``
``</dependency>``
```

#### 3.2. 获取页数

PDFBox库提供了处理PDF文档的能力。**要获取页数，我们只需使用_Loader_类及其_loadPDF()_方法从_File_对象加载文档。之后，我们使用_PDDocument_类的_getNumberOfPages()_方法**：

```java
public class PdfInfoPdfBox {

    public static int getNumberOfPages(final String pdfFile) throws IOException {
        File file = new File(pdfFile);
        PDDocument document = Loader.loadPDF(file);
        int pages = document.getNumberOfPages();
        document.close();
        return pages;
    }
}
```

让我们为它创建一个测试用例：

```java
@Test
public void givenPdf_whenGetNumberOfPages_thenOK() throws IOException {
    Assert.assertEquals(4, PdfInfoPdfBox.getNumberOfPages(PDF_FILE));
}
```

#### 3.3. 获取PDF元数据

获取PDF元数据也很简单。**我们需要使用_getDocumentInformation()_方法。此方法以_PDDocumentInformation_对象的形式返回文档元数据（例如文档的作者或创建日期）**：

```java
public static PDDocumentInformation getInfo(final String pdfFile) throws IOException {
    File file = new File(pdfFile);
    PDDocument document = Loader.loadPDF(file);
    PDDocumentInformation info = document.getDocumentInformation();
    document.close();
    return info;
}
```

让我们为它编写一个测试用例：

```java
@Test
public void givenPdf_whenGetInfo_thenOK() throws IOException {
    PDDocumentInformation info = PdfInfoPdfBox.getInfo(PDF_FILE);
    Assert.assertEquals("LibreOffice 4.2", info.getProducer());
    Assert.assertEquals("Writer", info.getCreator());
}
```

在这个测试用例中，我们只是验证了文档的生产者和创建者。

#### 3.4. 了解PDF密码保护

我们可以使用_PDDocument_类的_isEncrypted()_方法来检查PDF是否受密码保护：

```java
public static boolean isPasswordRequired(final String pdfFile) throws IOException {
    File file = new File(pdfFile);
    PDDocument document = Loader.loadPDF(file);
    boolean isEncrypted = document.isEncrypted();
    document.close();
    return isEncrypted;
}
```

让我们为密码保护的验证创建一个测试用例：

```java
@Test
public void givenPdf_whenIsPasswordRequired_thenOK() throws IOException {
    Assert.assertFalse(PdfInfoPdfBox.isPasswordRequired(PDF_FILE));
}
```

## 4. 结论

在这篇文章中，我们学习了如何使用Java中的两个流行库来获取PDF文件的信息。本文中展示的代码的可用版本可在GitHub上找到。