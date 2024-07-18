## 1. 概述

在这篇简短的文章中，我们将探讨在Java中从给定URL获取域名的不同方法。

## 2. 什么是域名？

简单来说，域名是一个指向IP地址的字符串。它是统一资源定位器（URL）的一部分。使用域名，用户可以通过客户端软件访问特定网站。

域名通常由两到三个部分组成，每个部分由点分隔。

从末尾开始，域名可能包括：
- 顶级域名（例如，bealdung.com中的_com_），
- 二级域名（例如，google.co.uk中的_co_或baeldung.com中的_baeldung_），
- 三级域名（例如，google.co.uk中的_google_）

域名需要遵循域名系统（DNS）指定的规则和程序。

## 3. 使用URI类

让我们看看如何使用_java.net.URI_类从URL中提取域名。_URI_类提供了_getHost()_方法，该方法返回URL的主机组件：

```java
URI uri = new URI("https://www.baeldung.com/domain");
String host = uri.getHost();
assertEquals("www.baeldung.com", host);
```

**主机包含子域名以及第三级、第二级和顶级域名。**

此外，为了获取域名，我们需要从给定的主机中移除子域名：

```java
String domainName = host.startsWith("www.") ? host.substring(4) : host;
assertEquals("baeldung.com", domainName);
```

然而，在某些情况下，我们无法使用_URI_类获取域名。例如，如果我们不知道子域名的确切值，我们将无法从URL中提取子域名。

## 4. 使用Guava库中的_InternetDomainName_类

现在我们将看到如何使用_Guava_库和_InternetDomainName_类获取域名。

_InternetDomainName_类提供了_topPrivateDomain()_方法，该方法返回给定域名中位于公共后缀下一级的部分。**换句话说，该方法将返回顶级、二级和三级域名。**

首先，我们需要从给定的URL值中提取主机。我们可以使用_URI_类：

```java
String urlString = "https://www.baeldung.com/java-tutorial";
URI uri = new URI(urlString);
String host = uri.getHost();
```

接下来，让我们使用_InternetDomainName_类及其_topPrivateDomain()_方法获取域名：

```java
InternetDomainName internetDomainName = InternetDomainName.from(host).topPrivateDomain();
String domainName = internetDomainName.toString();
assertEquals("baeldung.com", domainName);
```

与_URI_类相比，_InternetDomainName_将从返回值中省略子域名。

最后，我们也可以从给定的URL中移除顶级域名：

```java
String publicSuffix = internetDomainName.publicSuffix().toString();
String name = domainName.substring(0, domainName.lastIndexOf("." + publicSuffix));
```

此外，让我们创建一个测试来检查功能：

```java
assertEquals("baeldung", domainNameClient.getName("jira.baeldung.com"));
assertEquals("google", domainNameClient.getName("www.google.co.uk"));
```

我们可以看到，结果中既移除了子域名也移除了顶级域名。

## 5. 使用正则表达式

使用正则表达式获取域名可能是具有挑战性的。例如，如果我们不知道确切的子域名值，我们无法确定应该从给定URL中提取哪个词（如果有）。

另一方面，如果我们知道子域名值，我们可以使用正则表达式从URL中移除它：

```java
String url = "https://www.baeldung.com/domain";
String domainName =  url.replaceAll("http(s)?://|www\\.|/.*", "");
assertEquals("baeldung.com", domainName);
```

## 6. 结论

在这篇文章中，我们探讨了如何从给定的URL中提取域名。像往常一样，示例的源代码可以在GitHub上找到。

OK