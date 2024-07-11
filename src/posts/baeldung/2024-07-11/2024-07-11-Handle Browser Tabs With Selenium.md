---
date: 2022-04-01
category:
  - Selenium
  - Java
tag:
  - Browser Automation
  - Selenium WebDriver
head:
  - - meta
    - name: keywords
      content: Selenium, Java, Browser Automation, WebDriver, ChromeDriver
---

# 使用Selenium管理浏览器标签页

在本教程中，我们将探讨如何使用Selenium来管理浏览器标签页。有时点击链接或按钮会在新标签页中打开页面。在这些情况下，我们必须正确处理标签页以继续我们的测试。本教程涵盖了在新标签页中打开页面、在标签页之间切换以及关闭标签页。我们的示例将使用https://testpages.herokuapp.com。

## 2. 设置

根据_WebDriver_的设置，我们将创建一个处理_WebDriver_设置和清理的_SeleniumTestBase_类。我们的测试类将扩展这个类。我们还将定义一个帮助类来处理Selenium中的标签页。这个帮助类将包含打开、切换和关闭标签页的方法。这些方法将在以下部分展示并解释。我们将在_SeleniumTestBase_中初始化该帮助类的实例。所有示例都使用JUnit5。

初始化在需要用_@BeforeAll_注解的_init()_方法中完成：

```java
@BeforeAll
public static void init() {
    setupChromeDriver();
}
```

清理或结束方法将在所有测试后关闭整个浏览器：

```java
@AfterAll
public static void cleanup() {
    if (driver != null) {
        driver.quit();
    }
}
```

## 3. 基础

### 3.1. 链接目标属性

我们需要处理标签页的一个典型情况是，当点击链接或按钮时会打开一个新标签页。具有将目标属性设置为__blank_的网站链接将在新标签页中打开，例如：

```html
`<a href="/" target="_blank">`Baeldung.com`</a>`
```

这样的链接将在新标签页中打开目标，例如，https://www.baeldung.com。

### 3.2. 窗口句柄

在Selenium中，每个标签页都有一个窗口句柄，这是一个唯一的字符串。对于Chrome标签页，该字符串以_CDwindow_开头，后跟32个十六进制字符，例如，_CDwindow-CDE9BEF919431FDAA0FC9CB7EBBD4E1A_。**在切换到特定标签页时我们需要窗口句柄。** 因此，我们需要在测试期间存储窗口句柄。

我们可以使用_WebDriver_的以下方法来检索窗口句柄集和活动标签页的窗口句柄：

```java
driver.getWindowHandles();
driver.getWindowHandle()
```

借助这些方法，我们可以在_TabHelper_类中实现一个帮助方法。它在新标签页中打开链接并切换到该标签页。只有在打开新标签页时才会执行标签页切换。

```java
String openLinkAndSwitchToNewTab(By link) {
    String windowHandle = driver.getWindowHandle();
    Set```<String>``` windowHandlesBefore = driver.getWindowHandles();

    driver.findElement(link).click();
    Set```<String>``` windowHandlesAfter = driver.getWindowHandles();
    windowHandlesAfter.removeAll(windowHandlesBefore);

    Optional```<String>``` newWindowHandle = windowHandlesAfter.stream().findFirst();
    newWindowHandle.ifPresent(s -> driver.switchTo().window(s));

    return windowHandle;
}
```

通过在点击链接前后检索窗口句柄集来找到窗口句柄。点击链接前的窗口句柄集将从点击链接后的窗口句柄集中移除。结果将是新标签页的窗口句柄或空集。该方法还返回切换前的标签页窗口句柄。

### 4.2. 切换标签页

每当我们有多个标签页打开时，我们需要手动在它们之间切换。我们可以使用以下语句切换到特定标签页，其中_destinationWindowHandle_代表我们想要切换到的标签页的窗口句柄：

```java
driver.switchTo().window(destinationWindowHandle)
```

可以实施一个帮助方法，它接受目标窗口句柄作为参数并切换到相应的标签页。此外，该方法在切换前返回活动标签页的窗口句柄：

```java
public String switchToTab(String destinationWindowHandle) {
    String currentWindowHandle = driver.getWindowHandle();
    driver.switchTo().window(destinationWindowHandle);
    return currentWindowHandle;
}
```

### 4.3. 关闭标签页

在我们的测试之后或当我们不再需要特定标签页时，我们需要关闭它。Selenium提供了一个语句来关闭当前标签页或如果是最后一个打开的标签页，则关闭整个浏览器：

```java
driver.close();
```

我们可以使用这个语句来关闭我们不再需要的所有标签页。以下方法可以关闭除了特定标签页之外的所有标签页：

```java
void closeAllTabsExcept(String windowHandle) {
    for (String handle : driver.getWindowHandles()) {
        if (!handle.equals(windowHandle)) {
            driver.switchTo().window(handle);
            driver.close();
        }
    }
    driver.switchTo().window(windowHandle);
}
```

在此方法中，我们循环遍历所有窗口句柄。如果窗口句柄与提供的窗口句柄不同，我们将切换到它并关闭它。最后，我们将确保再次切换到我们想要的标签页。

我们可以使用这个方法来关闭除了当前打开的标签页之外的所有标签页：

```java
void closeAllTabsExceptCurrent() {
    String currentWindow = driver.getWindowHandle();
    closeAllTabsExcept(currentWindow);
}
```

现在，我们可以使用这个方法在_SeleniumTestBase_类中的每个测试后关闭所有剩余的标签页。这在测试失败时清理浏览器以避免影响下一个测试的结果特别有用。我们将在用_@AfterEach_注解的方法中调用这个方法：

```java
@AfterEach
public void closeTabs() {
    tabHelper.closeAllTabsExceptCurrent();
}
```

### 4.4. 使用快捷键处理标签页

使用Selenium，过去可以使用浏览器快捷键来处理标签页。**不幸的是，由于_ChromeDriver_的变化，这似乎不再起作用。**

## 5. 测试

我们可以通过一些简单的测试来验证我们的_TabHelper_类的标签页处理是否按预期工作。正如本文开头提到的，我们的测试类需要扩展_SeleniumTestBase:_

```java
class SeleniumTabsLiveTest extends SeleniumTestBase {
    //...
}
```

对于这些测试，我们在测试类中声明了一些URL和定位器的常量，如下所示：

```java
By LINK_TO_ATTRIBUTES_PAGE_XPATH = By.xpath("//a[.='Attributes in new page']");
By LINK_TO_ALERT_PAGE_XPATH = By.xpath("//a[.='Alerts In A New Window From JavaScript']");

String MAIN_PAGE_URL = "https://testpages.herokuapp.com/styled/windows-test.html";
String ATTRIBUTES_PAGE_URL = "https://testpages.herokuapp.com/styled/attributes-test.html";
String ALERT_PAGE_URL = "https://testpages.herokuapp.com/styled/alerts/alert-test.html";
```

在我们的第一个测试案例中，我们正在新标签页中打开一个链接。我们验证我们有打开两个标签页并且可以在它们之间切换。注意，我们总是存储相应的窗口句柄。以下代码表示这个测试案例：

```java
void givenOneTab_whenOpenTab_thenTwoTabsOpen() {
    driver.get(MAIN_PAGE_URL);

    String mainWindow = tabHelper.openLinkAndSwitchToNewTab(LINK_TO_ATTRIBUTES_PAGE_XPATH);
    assertEquals(ATTRIBUTES_PAGE_URL, driver.getCurrentUrl());

    tabHelper.switchToTab(mainWindow);
    assertEquals(MAIN_PAGE_URL, driver.getCurrentUrl());
    assertEquals(2, driver.getWindowHandles().size());
}
```

在我们的第二个测试中，我们想要验证我们可以关闭除了我们首先打开的标签页之外的所有标签页。我们需要提供该标签页的窗口句柄。以下代码显示了这个测试案例：

```java
void givenTwoTabs_whenCloseAllExceptMainTab_thenOneTabOpen() {
    driver.get(MAIN_PAGE_URL);
    String mainWindow = tabHelper.openLinkAndSwitchToNewTab(LINK_TO_ATTRIBUTES_PAGE_XPATH);
    assertEquals(ATTRIBUTES_PAGE_URL, driver.getCurrentUrl());
    assertEquals(2, driver.getWindowHandles().size());

    tabHelper.closeAllTabsExcept(mainWindow);

    assertEquals(1, driver.getWindowHandles().size());
    assertEquals(MAIN_PAGE_URL, driver.getCurrentUrl());
}
```

## 6. 结论

在本文中，我们学习了如何使用Selenium来管理浏览器标签页。我们涵盖了如何使用各自的窗口句柄区分不同的标签页。本文涵盖了打开标签页、切换标签页以及在我们完成后关闭它们。像往常一样，所有这些示例的实现都可以在GitHub上找到。