---
date: 2022-04-01
category:
  - Java
  - Web Development
tag:
  - Java
  - URL Manipulation
head:
  - - meta
    - name: keywords
      content: Java, URL Manipulation, Query Parameters
------
# Java中URL查询参数操作

在Java中，我们可以使用几种库来动态地向URL添加查询参数，同时保持URL的有效性。
在本文中，我们将学习如何使用其中的三种。这三种执行完全相同的任务。因此，我们将看到生成的URL是相同的。

## 2. Java EE 7 UriBuilder
**最接近Java内置解决方案的是UriBuilder**，它位于javax.ws.rs-api中，我们需要将其导入到我们的pom.xml中：
```
```<dependency>```
    ```<groupId>```javax.ws.rs```</groupId>```
    ```<artifactId>```javax.ws.rs-api```</artifactId>```
    ```<version>```2.1.1```</version>```
```</dependency>```
```
可以在Maven仓库中找到最新版本。我们可能还需要导入jersey-commons以运行我们的应用程序。

UriBuilder对象提供了fromUri()方法来创建基础URI，并使用queryParam()来添加我们的查询。然后我们可以调用build()来返回一个URI：
```
@Test
void whenUsingJavaUriBuilder_thenParametersAreCorrectlyAdded() {
    String url = "baeldung.com";
    String key = "article";
    String value = "beta";
    URI uri = UriBuilder.fromUri(url)
      .queryParam(key, value)
      .build();

    assertEquals("baeldung.com?article=beta", uri.toString());
}
```
如上所示，URL看起来符合预期，查询已附加。

## 3. Apache UriBuilder
**Apache在其HttpClient包中提供了自己的UriBuilder解决方案**。要使用它，我们需要将其添加到我们的pom.xml中：
```
```<dependency>```
    ```<groupId>```org.apache.httpcomponents```</groupId>```
    ```<artifactId>```httpclient```</artifactId>```
    ```<version>```4.5.2```</version>```
```</dependency>```
```
可以在Maven仓库中找到最新版本。

使用它时，我们首先使用基础URL字符串调用URIBuilder构造函数。然后使用其构建方法addParameter()来附加我们的参数，最后调用build()：
```
@Test
void whenUsingApacheUriBuilder_thenParametersAreCorrectlyAdded() {
    String url = "baeldung.com";
    String key = "article";
    String value = "alpha";
    URI uri = new URIBuilder(url).addParameter(key, value)
      .build();

    assertEquals("baeldung.com?article=alpha", uri.toString());
}
```

## 4. Spring UriComponentsBuilder
如果我们有一个Spring应用程序，使用Spring提供的UriComponentsBuilder可能是有意义的。要使用它，我们需要在pom.xml中添加spring-web依赖项：
```
```<dependency>```
    ```<groupId>```org.springframework```</groupId>```
    ```<artifactId>```spring-web```</artifactId>```
    ```<version>```6.0.6```</version>```
```</dependency>```
```
我们可以在Maven仓库中找到最新版本。

**我们可以使用UriComponentsBuilder通过fromUriString()创建一个URI**，然后使用queryParam()附加我们的查询：
```
@Test
void whenUsingSpringUriComponentsBuilder_thenParametersAreCorrectlyAdded() {
    String url = "baeldung.com";
    String key = "article";
    String value = "charlie";
    URI uri = UriComponentsBuilder.fromUriString(url)
      .queryParam(key, value)
      .build()
      .toUri();

    assertEquals("baeldung.com?article=charlie", uri.toString());
}
```
与其它不同，build()方法返回一个UriComponents对象，所以为了完成URI，我们还需要调用toURI()。

## 5. 结论
在本文中，我们看到了在Java中操作URL的三种方式。我们可以使用Java扩展包、Apache的UriBuilder或spring-web解决方案来添加查询。每种都让我们确信URL结构将是有效的，同时允许我们动态构建它们。

因此，决定为我们的应用程序使用哪一个取决于我们有哪些可用的包和导入，以及我们已经使用了哪些。每个库都带来了一系列有用的功能，因此我们还应该考虑是否可以同时满足我们项目中的其他需求。

如往常一样，示例的完整代码可以在GitHub上找到。