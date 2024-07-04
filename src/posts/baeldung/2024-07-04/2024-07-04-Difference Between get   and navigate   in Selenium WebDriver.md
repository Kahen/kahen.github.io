---
date: 2022-04-01
category:
  - Selenium WebDriver
  - Web Testing
tag:
  - get()
  - navigate()
head:
  - - meta
    - name: keywords
      content: Selenium WebDriver, get() vs navigate(), web testing
  - - meta
    - name: description
      content: A comparison between the get() and navigate() methods in Selenium WebDriver for web testing.
------
# Selenium WebDriver 中 get() 和 navigate() 方法的区别

## 1. 引言

Selenium WebDriver 是一个 API，允许我们测试网页。在这个简短的教程中，我们将探讨 WebDriver 中的 _get()_ 和 _navigate()_ 方法的区别。

## 2. 关于 WebDriver

**Selenium WebDriver API 包含与不同网络浏览器交互的高级方法**。使用此 API，我们可以调用不同的操作，例如加载网页、点击链接、搜索 DOM 以查找特定元素等。

API 中的两个方法 _get()_ 和 _navigate()_ 允许我们加载网页。虽然它们在名称上相似，但**它们在行为上存在一些差异，我们将在下面看到**。

## 3. _get()_ 方法

在 WebDriver 中加载网页的最简单方式是使用 _get()_ 方法：

```java
WebDriver driver = new ChromeDriver();
driver.get("https://www.baeldung.com/");
```

这段代码创建了一个新的 Chrome WebDriver 并加载了 Baeldung 的主页。值得注意的是，**_get()_ 方法会等待直到网页被认为完全加载并准备好返回控制权**。如果页面有很多 JavaScript 或其他资源，调用可能需要一段时间。

## 4. Navigate API

WebDriver API 包括一组用于导航的独立函数。让我们看看第一个：

```java
WebDriver driver = new ChromeDriver();
driver.navigate().to("https://www.baeldung.com/");
```

功能上，**_navigate().to()_ 方法的行为与 _get()_ 方法完全相同**。实际上，它是 _get()_ 方法的别名，只是在远程网络浏览器中简单地加载指定的 URL。并且因为它只是 _get()_ 的别名，它也不会在网页完全加载之前返回。

然而，navigate API 还具有超出 _get()_ 方法提供的功能。

首先，它跟踪浏览器历史记录，并允许逐页移动：

```java
driver.navigate().forward();
driver.navigate().back();
```

navigate 接口还允许我们刷新当前 URL：

```java
driver.navigate().refresh();
```

然而，最重要的是，**每次我们使用 navigate API 时，它都会保留 cookie**。与每次调用都会丢弃会话状态的 _get()_ 方法不同，_navigate()_ 方法确实会保持状态。

这意味着我们使用 navigate API 加载的每个页面都包含之前的 cookie。这对于测试许多场景（如登录和单页应用程序）是必要的。

## 5. 结论

在这篇快速文章中，我们查看了 Selenium WebDriver API 中 _get()_ 和 _navigate()_ 方法的区别。虽然 _get()_ 更容易使用，但 _navigate()_ 有两个主要优点。

首先，_navigate()_ 提供了额外的方法用于导航页面历史记录，以及刷新当前页面。其次，它在导航到每个 URL 时保持状态，这意味着 cookie 和其他会话数据在每次页面加载中都会持续存在。

了解这些差异使我们能够根据测试的需求选择最佳方法。