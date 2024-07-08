---
date: 2022-04-01
category:
  - Java
  - Web Scraping
tag:
  - Jsoup
  - HttpURLConnection
head:
  - - meta
    - name: keywords
      content: Java, Web Scraping, Jsoup, HttpURLConnection
---

# Java中下载网页的方法

在某些应用中，我们可能需要从互联网下载网页并将其内容提取为字符串。一个流行的用例是网页抓取或内容解析。

在本教程中，我们将使用Jsoup和_HttpURLConnection_来下载一个示例网页。

## 使用_HttpURLConnection_下载网页

_HttpURLConnection_是_URLConnection_的一个子类。**它有助于连接到使用HTTP协议的统一资源定位符（URL）。**该类包含不同的方法来操作HTTP请求。

让我们使用_HttpURLConnection_下载一个示例网页：

```java
@Test
void givenURLConnection_whenRetrieveWebpage_thenWebpageIsNotNullAndContainsHtmlTag() throws IOException {
    URL url = new URL("https://example.com");
    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("GET");

    try (BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
        StringBuilder responseBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            responseBuilder.append(line);
        }

        assertNotNull(responseBuilder);
        assertTrue(responseBuilder.toString()
              .contains("``<html>``"));
    }
}
```

在这里，我们创建了一个表示网页地址的_URL_对象。接下来，我们创建了一个_HttpURLConnection_的实例，并在_URL_对象上调用_openConnection()_方法。这会打开到网页的连接。此外，我们设置请求方法为GET以检索网页的内容。

然后，我们创建一个新的_BufferedReader_和_InputStreamReader_实例来帮助从网页读取数据。_InputStreamReader_类有助于将原始字节转换为可以由_BufferedReader_读取的字符。

最后，我们通过从_BufferedReader_读取并连接行来将网页转换为_String_。我们使用_StringBuilder_对象有效地连接行。

## 使用Jsoup下载网页

Jsoup是一个流行的开源Java库，用于处理HTML。它有助于获取URL并提取它们的数据。**它的一个重要优势是使用HTML DOM方法和CSS选择器从URL抓取HTML。**

要开始使用Jsoup，我们需要将其依赖项添加到我们的依赖管理器中。让我们将Jsoup依赖项添加到_pom.xml_：

```xml
`<dependency>`
    `<groupId>`org.jsoup`</groupId>`
    `<artifactId>`jsoup`</artifactId>`
    `<version>`1.17.2`</version>`
`</dependency>`
```

以下是使用Jsoup下载网页的示例：

```java
@Test
void givenJsoup_whenRetrievingWebpage_thenWebpageDocumentIsNotNullAndContainsHtmlTag() throws IOException {
    Document document = Jsoup.connect("https://www.example.com").get();
    String webpage = document.html();

    assertNotNull(webpage);
    assertTrue(webpage.contains("``<html>``"));
}
```

在这个例子中，我们创建了一个_Document_的实例，并使用_Jsoup.connect()_建立到示例网站的连接。Jsoup.connect()_有助于建立到URL的连接并将其内容作为_Document_对象检索。

接下来，我们调用_get()_方法，它向指定的URL发送GET请求。它以_Document_的形式返回响应。

最后，我们通过在_Document_对象上调用_html()_方法，将提取的内容存储到_string_类型的变量_webpage_中。

## 结论

在本文中，我们学习了在Java中下载网页的两种方法。我们使用了_HttpURLConnection_类和Jsoup来下载网页的内容。两种方法都可以使用，但Jsoup看起来更容易使用。

如常，示例的完整源代码可以在GitHub上找到。