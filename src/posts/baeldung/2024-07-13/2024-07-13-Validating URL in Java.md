---
date: 2022-04-01
category:
  - Java
  - Web Development
tag:
  - URL Validation
  - Java
head:
  - - meta
    - name: keywords
      content: Java, URL Validation, Web Development
---

# Java中验证URL的方法

URL代表统一资源定位符，是指向网络上唯一资源的地址。

在本教程中，我们将讨论使用Java进行URL验证。在现代Web开发中，通过应用程序读取、写入或访问URL是非常常见的。因此，成功的验证确保了URL的有效性和合规性。

有多种库用于验证URL。我们将讨论两个类——来自JDK的java.net.Url和来自Apache Commons库的org.apache.commons.validator.routines.UrlValidator。

### 2. 使用JDK验证URL

让我们看看如何使用java.net.URL类来验证URL：

```java
boolean isValidURL(String url) throws MalformedURLException, URISyntaxException {
    try {
        new URL(url).toURI();
        return true;
    } catch (MalformedURLException e) {
        return false;
    } catch (URISyntaxException e) {
        return false;
    }
}
```

在上面的方法中，new URL(url).toURI();尝试使用字符串参数创建URI。如果传递的字符串不符合URL语法，库将抛出异常。

内置的URL类在发现输入字符串对象的语法不正确时抛出MalformedURLException。当字符串的格式不符合时，内置类将抛出URISyntaxException。

现在，让我们通过一个小测试来验证我们的方法是否有效：

```java
assertTrue(isValidURL("http://baeldung.com/"));
assertFalse(isValidURL("https://www.baeldung.com/ java-%%$^&& iuyi"));
```

我们必须理解URL和URI之间的区别。toURI()方法在这里很重要，因为它确保任何符合RC 2396的URL字符串都被转换为URL。然而，如果我们只使用new URL(String value)，它不会确保创建的URL完全合规。

让我们通过一个例子来看看，如果我们只使用new URL(String url)，许多不符合规范的URL将通过验证：

```java
boolean isValidUrl(String url) throws MalformedURLException {
    try {
        // 它只会检查方案和非空输入
        new URL(url);
        return true;
    } catch (MalformedURLException e) {
        return false;
    }
}
```

让我们看看上述方法对不同URL的验证效果如何：

```java
assertTrue(isValidUrl("http://baeldung.com/"));
assertTrue(isValidUrl("https://www.baeldung.com/ java-%%$^&& iuyi"));
assertFalse(isValidUrl(""));
```

在上面的方法中，new URL(url)只检查有效的协议和非空字符串作为输入。因此，如果协议正确，即使它不符合RC 2396，它也会返回一个URL对象。

因此，我们必须使用new URL(url).toURI()来确保URL有效且合规。

### 3. 使用Apache Commons验证URL

我们需要将commons-validator依赖项导入我们的pom.xml文件：

```xml
`<dependency>`
    `<groupId>`commons-validator`</groupId>`
    `<artifactId>`commons-validator`</artifactId>`
    `<version>`1.7`</version>`
`</dependency>`
```

让我们使用这个库中的UrlValidator类来验证：

```java
boolean isValidURL(String url) throws MalformedURLException {
    UrlValidator validator = new UrlValidator();
    return validator.isValid(url);
}
```

在上面的方法中，我们创建了一个URLValidator，然后使用isValid()方法来检查字符串参数的URL有效性。

让我们检查上述方法对不同输入的行为：

```java
assertFalse(isValidURL("https://www.baeldung.com/ java-%%$^&& iuyi"));
assertTrue(isValidURL("http://baeldung.com/"));
```

URLValidator允许我们微调验证URL字符串的条件。例如，如果我们使用重载构造函数UrlValidator(String[] schemes)，它只会验证提供的方案列表中的URL（http、https、ftp等）。

同样，还有一些其他的标志——ALLOW_2_SLASHES、NO_FRAGMENT和ALLOW_ALL_SCHEMES可以根据需要设置。我们可以在官方文档中找到库提供的所有选项的详细信息。

### 4. 结论

在本文中，我们学习了两种不同的URL验证方法。我们还讨论了URL(String url)和URL.toURI()之间的区别。

如果我们只需要验证协议和非空字符串，那么我们可以使用URL(String url)构造函数。然而，当我们需要进行验证并通过合规性检查时，我们需要使用URL(url).toURI()。

此外，如果我们添加了Apache Commons依赖项，我们可以使用URLValidator类来进行验证，并且类中还有额外的选项可用于微调验证规则。

如常，本文示例的源代码可在GitHub上找到。