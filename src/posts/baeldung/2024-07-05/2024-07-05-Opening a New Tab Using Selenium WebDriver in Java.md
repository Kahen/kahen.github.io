---
date: 2022-04-01
category:
  - Selenium WebDriver
  - Java
tag:
  - Selenium
  - WebDriver
  - Java
  - 新建标签页
head:
  - - meta
    - name: keywords
      content: Selenium WebDriver, Java, 新建标签页, 自动化测试
------
# 使用Java中的Selenium WebDriver打开新标签页

## 1. 引言

Selenium WebDriver是一个流行的自动化网络测试工具，具有许多功能。在自动化网页操作中，一个常见的动作是在浏览器窗口中打开一个新标签页。

打开新标签页在多种场景下都非常有用，包括测试多页面工作流程、验证新标签页中打开的外部链接、与弹出窗口交互，以及在并行运行测试时模拟多个用户与应用程序的不同部分同时交互。

早期的解决方案是自定义脚本，例如发送组合键“Ctrl”+“T”，这通常会因浏览器和操作系统的不同而导致不同的结果。

在本教程中，我们将探讨**打开新标签页的稳定方法——Selenium 4中引入的_newWindow()_ API和JavaScript代码执行**。

## 2. 使用_newWindow()_ API

Selenium 4引入了一个强大且灵活的API方法_newWindow()_，用于在当前浏览器会话中创建一个新窗口。**它允许我们打开一个新的浏览器标签页并自动切换到它**。这个方法接受一个_WindowType_参数_WINDOW_或_TAB_来创建它。语法非常直接：

```
driver.switchTo().newWindow(WindowType.TAB);
```

## 3. 使用JavaScript

使用Selenium WebDriver打开新标签页的另一种方法是执行JavaScript代码。它涉及使用_JavascriptExecutor_接口的_executeScript()_方法，这允许我们直接在浏览器内运行JavaScript代码。**当我们想要更多地控制新标签页的打开方式时，比如指定要打开的URL，_window.open()_脚本非常有用**。

以下是使用这种方法打开新标签页的示例：

```
((JavascriptExecutor) driver).executeScript("window.open()");
```

以及如何使用URL打开新标签页：

```
((JavascriptExecutor) driver).executeScript("window.open('https://google.com')");
```

**需要注意的是，在执行_window.open()_方法后，driver仍然会聚焦在原始标签页上**。为了与新标签页上的元素交互，我们需要使用_driver.switchTo().window()_方法将driver的焦点切换到那个标签页。

以下是在用JavaScript打开新标签页后切换到它的示例：

```
String newTab = driver.getWindowHandles()
  .stream()
  .filter(handle -> !handle.equals(originalTab))
  .findFirst()
  .get();
driver.switchTo().window(newTab);
```

## 4. 结论

在本文中，我们探讨了使用Selenium打开新标签页的两种方法：Selenium 4中引入的_newWindow()_方法和使用JavaScript执行的_window.open()_方法。

_newWindow()_方法是Selenium 4中引入的新API，它使创建新标签页或窗口变得简单直观。另一方面，使用JavaScript执行_window.open()_提供了更大的控制权，可以用于更早版本的Selenium。然而，它可能需要更多的代码，并且对于初学者来说可能更难使用。

如常，代码示例可在GitHub上找到。