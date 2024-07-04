---
date: 2023-06-01
category:
  - Java
  - Apache POI
tag:
  - Word文档
  - 文档模板
  - 文本替换
head:
  - - meta
    - name: keywords
      content: Java, Apache POI, Word文档, 文档模板, 文本替换
---

# 在Java中使用Apache POI库替换Word文档模板中的变量

在本教程中，我们将在Word文档的多个位置替换一个模式。我们将使用.doc和.docx文件格式进行操作。

## 2. Apache POI 库

**Apache POI 库为Java提供了操作Microsoft Office应用程序使用的多种文件格式的API**，例如Excel电子表格、Word文档和PowerPoint演示文稿。它允许我们以编程方式读取、写入和修改这些文件。

为了编辑.docx文件，我们将在pom.xml中添加最新版本的poi-ooxml：

```
``<dependency>``
    ``<groupId>``org.apache.poi``</groupId>``
    ``<artifactId>``poi-ooxml``</artifactId>``
    ``<version>``5.2.5``</version>``
``</dependency>``
```

此外，我们还需要最新版本的poi-scratchpad来处理.doc文件：

```
``<dependency>``
    ``<groupId>``org.apache.poi``</groupId>``
    ``<artifactId>``poi-scratchpad``</artifactId>``
    ``<version>``5.2.5``</version>``
``</dependency>``
```

## 3. 文件处理

我们想要创建示例文件，读取它们，在文件中替换一些文本，然后写入结果文件。让我们首先讨论所有与文件处理有关的内容。

### 3.1. 示例文件

让我们创建一个Word文档。**我们想要将文档中的单词"Baeldung"替换为"Hello"。** 因此，我们将在文件的多个位置写入"Baeldung"，特别是在表格、不同的文档部分和段落中。我们还想使用不同的格式化样式，包括单词内部格式变化的一个出现。我们将使用相同的文档，一次保存为.doc文件，一次保存为.docx：

![img](https://www.baeldung.com/wp-content/uploads/2023/06/baeldung-original-document-300x122.png)

### 3.2. 读取输入文件

首先，我们需要读取文件。**我们将把它放在资源文件夹中，以便在类路径中可用。** 这样，我们将获得一个InputStream。对于.doc文档，我们将基于此InputStream创建一个POIFSFileSystem对象。最后，我们可以检索我们将修改的HWPFDocument对象。我们将使用try-with-resources，以便InputStream和POIFSFileSystem对象自动关闭。然而，由于我们将对HWPFDocument进行修改，我们将手动关闭它：

```
public void replaceText() throws IOException {
    String filePath = getClass().getClassLoader()
      .getResource("baeldung.doc")
      .getPath();
    try (InputStream inputStream = new FileInputStream(filePath); POIFSFileSystem fileSystem = new POIFSFileSystem(inputStream)) {
        HWPFDocument doc = new HWPFDocument(fileSystem);
        // replace text in doc and save changes
        doc.close();
    }
}
```

当处理.docx文档时，过程稍微简单一些，因为我们可以直接从InputStream派生一个XWPFDocument对象：

```
public void replaceText() throws IOException {
    String filePath = getClass().getClassLoader()
      .getResource("baeldung.docx")
      .getPath();
    try (InputStream inputStream = new FileInputStream(filePath)) {
        XWPFDocument doc = new XWPFDocument(inputStream);
        // replace text in doc and save changes
        doc.close();
    }
}
```

### 3.3. 写入输出文件

我们将把输出文档写入同一个文件。结果，修改后的文件将位于target文件夹中。**HWPFDocument和XWPFDocument类都提供了一个write()方法，将文档写入OutputStream。** 例如，对于.doc文档，一切都归结为：

```
private void saveFile(String filePath, HWPFDocument doc) throws IOException {
    try (FileOutputStream out = new FileOutputStream(filePath)) {
        doc.write(out);
    }
}
```

## 4. 在.docx文档中替换文本

让我们尝试在.docx文档中替换单词"Baeldung"的出现，并看看在这个过程中我们面临什么样的挑战。

### 4.1. 简单实现

我们已经将文档解析为XWPFDocument对象。一个XWPFDocument被划分为不同的段落。文件核心中的段落可以直接使用。然而，要访问表格内部的段落，需要循环遍历表格的所有行和单元格。稍后我们将编写replaceTextInParagraph()方法，这里是我们将如何重复应用它到所有段落的示例：

```
private XWPFDocument replaceText(XWPFDocument doc, String originalText, String updatedText) {
    replaceTextInParagraphs(doc.getParagraphs(), originalText, updatedText);
    for (XWPFTable tbl : doc.getTables()) {
        for (XWPFTableRow row : tbl.getRows()) {
            for (XWPFTableCell cell : row.getTableCells()) {
                replaceTextInParagraphs(cell.getParagraphs(), originalText, updatedText);
            }
        }
    }
    return doc;
}

private void replaceTextInParagraphs(List`<XWPFParagraph>` paragraphs, String originalText, String updatedText) {
    paragraphs.forEach(paragraph -> replaceTextInParagraph(paragraph, originalText, updatedText));
}
```

在Apache POI中，段落被划分为XWPFRun对象。**首先，让我们尝试遍历所有的运行：如果我们在运行中检测到我们想要替换的文本，我们将更新运行的内容：**

```
private void replaceTextInParagraph(XWPFParagraph paragraph, String originalText, String updatedText) {
    List`<XWPFRun>` runs = paragraph.getRuns();
    for (XWPFRun run : runs) {
        String text = run.getText(0);
        if (text != null && text.contains(originalText)) {
            String updatedRunText = text.replace(originalText, updatedText);
            run.setText(updatedRunText, 0);
        }
    }
}
```

最后，我们将更新replaceText()以包括所有步骤：

```
public void replaceText() throws IOException {
    String filePath = getClass().getClassLoader()
      .getResource("baeldung-copy.docx")
      .getPath();
    try (InputStream inputStream = new FileInputStream(filePath)) {
        XWPFDocument doc = new XWPFDocument(inputStream);
        doc = replaceText(doc, "Baeldung", "Hello");
        saveFile(filePath, doc);
        doc.close();
    }
}
```

现在让我们通过单元测试运行这段代码。我们可以查看更新后的文档截图：

![img](https://www.baeldung.com/wp-content/uploads/2023/06/hello-replacement-docx-naive-document-300x122.png)

### 4.2. 限制

正如我们在截图中看到的，大多数"Baeldung"的出现已经被替换为"Hello"。然而，我们可以看到还有两个"Baeldung"剩余。

现在让我们更深入地了解XWPFRun是什么。**每个运行表示具有一组共同格式属性的连续文本序列。** 格式属性包括字体样式、大小、颜色、粗体、斜体、下划线等。每当格式变化时，就会有一个新运行。这就是为什么表格中具有各种格式的出现没有被替换的原因：它的内容分布在多个运行中。

然而，底部蓝色的"Baeldung"出现也没有被替换。实际上，Apache POI不保证具有相同格式属性的字符是同一个运行的一部分。简而言之，简单实现对于最简单的情况来说已经足够好了。在这种情况下使用这个解决方案是值得的，因为它不涉及任何复杂的决策。然而，如果我们面临这个限制，我们将需要转向另一个解决方案。

### 4.3. 处理跨越多个字符运行的文本

为了简单起见，**我们假设：当我们在段落中找到单词"Baeldung"时，我们可以丢失该段落的格式。** 因此，我们可以删除段落中的所有现有运行，并用一个新的运行替换它们。让我们重写replaceTextInParagraph()：

```
private void replaceTextInParagraph(XWPFParagraph paragraph, String originalText, String updatedText) {
    String paragraphText = paragraph.getParagraphText();
    if (paragraphText.contains(originalText)) {
        String updatedParagraphText = paragraphText.replace(originalText, updatedText);
        while (paragraph.getRuns().size() > 0) {
            paragraph.removeRun(0);
        }
        XWPFRun newRun = paragraph.createRun();
        newRun.setText(updatedParagraphText);
    }
}
```

让我们看看结果文件：

![img](https://www.baeldung.com/wp-content/uploads/2023/06/hello-replacement-docx-full-document-300x122.png)

正如预期的那样，每个出现都被替换了。然而，大部分格式都丢失了。最后一个格式没有丢失。在这种情况下，Apache POI似乎以不同的方式处理格式属性。

最后，让我们注意到，根据我们的用例，我们也可以选择保留原始段落的一些格式。然后，我们需要遍历所有的运行，并根据我们的喜好保留或更新属性。

## 5. 在.doc文档中替换文本

对于.doc文件来说，事情要简单得多。实际上，我们可以在整个文档上访问一个Range对象。**然后我们可以通过它的replaceText()方法修改范围的内容：**

```
private HWPFDocument replaceText(HWPFDocument doc, String originalText, String updatedText) {
    Range range = doc.getRange();
    range.replaceText(originalText, updatedText);
    return doc;
}
```

运行此代码将导致以下更新的文件：

![img](https://www.baeldung.com/wp-content/uploads/2023/06/hello-replacement-doc-document-300x122.png)

正如我们所看到的，替换在整个文件中进行了。我们还可以看到，跨越多个运行的文本的默认行为是保留第一个运行的格式。

## 6. 结论

在本文中，我们替换了Word文档中的一个模式。在.doc文档中，这相当直接。然而，在.docx中，我们遇到了简单实现的一些限制。我们通过提出一个简化的假设来展示了克服这个限制的一个例子。

正如往常一样，代码可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/uploads/2023/06/baeldung-logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)

OK