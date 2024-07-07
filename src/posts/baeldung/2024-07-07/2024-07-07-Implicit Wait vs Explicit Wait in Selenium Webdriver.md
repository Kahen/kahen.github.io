---
date: 2022-04-01
category:
  - Selenium
  - Webdriver
tag:
  - Implicit Wait
  - Explicit Wait
head:
  - - meta
    - name: keywords
      content: Selenium, Webdriver, Implicit Wait, Explicit Wait
---
# Selenium Webdriver中的隐式等待与显式等待 | Baeldung

网页应用程序测试的一个挑战是处理网页的动态特性。网页可能需要时间来加载，元素可能在一段时间后才会出现。因此，Selenium提供了等待机制来帮助我们在继续测试执行之前等待元素出现、消失或可点击。

在本文中，我们将探讨等待类型的不同之处以及如何在Selenium中使用它们。我们将比较隐式等待与显式等待，并学习在Selenium测试中使用等待的一些最佳实践。

## 2. Selenium中的等待类型

Selenium提供了多种等待机制来帮助我们等待元素出现、消失或可点击。这些等待机制可以分为三种类型：隐式等待、显式等待和流畅等待。

对于我们的测试用例，我们将为我们的页面定位器定义一些常量，我们将使用它们来浏览网页：

```java
private static final By LOCATOR_ABOUT = By.xpath("//a[starts-with(., 'About')]");
private static final By LOCATOR_ABOUT_BAELDUNG = By.xpath("//h3[normalize-space()='About Baeldung']");
private static final By LOCATOR_ABOUT_HEADER = By.xpath("//h1");
```

### 2.1. 隐式等待

**隐式等待是一个全局设置，适用于Selenium脚本中的所有元素。** 它在抛出异常之前等待指定的时间，如果找不到元素。我们可以在每个会话中设置一次等待，并且不能在之后更改它。默认值是 _0_。

我们可以使用以下语句将隐式等待设置为10秒。**我们应该在初始化_WebDriver_实例后立即设置隐式等待：**

```java
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
```

使用隐式等待，我们不需要在测试中显式等待任何东西。

以下简单的测试导航到www.baeldung.com，并通过头部菜单导航到_About_页面。正如我们所看到的，没有显式等待指令，测试在10秒的隐式等待下通过：

```java
void givenPage_whenNavigatingWithImplicitWait_ThenOK() {
    final String expected = "About Baeldung";
    driver.navigate().to("https://www.baeldung.com/");

    driver.findElement(LOCATOR_ABOUT).click();
    driver.findElement(LOCATOR_ABOUT_BAELDUNG).click();

    final String actual = driver.findElement(LOCATOR_ABOUT_HEADER).getText();
    assertEquals(expected, actual);
}
```

**需要注意的是，如果不设置隐式等待，将导致测试失败。**

### 2.2. 显式等待

**显式等待是一种更灵活的等待，允许我们在继续测试执行之前等待特定条件得到满足。**

我们可以使用_ExpectedConditions_类来定义条件，例如元素的存在或不存在。如果在指定时间内条件未得到满足，则会抛出异常。

_WebDriver_检查预期条件的轮询频率固定为_500 ms_。由于显式等待不是全局设置，我们可以使用不同的条件和超时时间。

查看之前的测试用例，我们注意到如果没有隐式等待，测试将失败。我们可以调整测试并引入显式等待。

首先，我们将为测试创建一个_Wait_实例，超时时间为10秒：

```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(TIMEOUT));
```

现在，我们可以使用这个_Wait_实例，并使用_ExpectedConditions_调用_until()_。在这种情况下，我们可以使用_ExpectedConditions.visibilityOfElementLocated(..)_。

在与元素交互之前，例如点击，我们需要等待元素可见或可点击：

```java
void givenPage_whenNavigatingWithExplicitWait_thenOK() {
    final String expected = "About Baeldung";
    driver.navigate().to("https://www.baeldung.com/");

    driver.findElement(LOCATOR_ABOUT).click();
    wait.until(ExpectedConditions.visibilityOfElementLocated(LOCATOR_ABOUT_BAELDUNG));

    driver.findElement(LOCATOR_ABOUT_BAELDUNG).click();
    wait.until(ExpectedConditions.visibilityOfElementLocated(LOCATOR_ABOUT_HEADER));

    final String actual = driver.findElement(LOCATOR_ABOUT_HEADER).getText();
    assertEquals(expected, actual);
}
```

我们需要手动管理等待，但我们更加灵活。这可以显著提高测试性能。

_ExpectedConditions_类提供了许多我们可以用于检查预期条件的方法。让我们看一些：

- _elementToBeClickable()_
- _invisibilityOf()_
- _presenceOfElementLocated()_
- _textToBePresentInElement()_
- _visibilityOf()_

### 2.3. 流畅等待

**流畅等待是另一种类型的显式等待，它允许我们对等待机制进行更细粒度的控制。** 它使我们能够定义预期条件和轮询机制，以检查特定条件是否得到满足。

我们可以再次调整之前的测试用例，并引入流畅等待。流畅等待基本上是显式等待，所以我们只需要调整_Wait_实例。我们指定轮询频率：

```java
Wait`<WebDriver>` wait = new FluentWait<>(driver)
  .withTimeout(Duration.ofSeconds(TIMEOUT))
  .pollingEvery(Duration.ofMillis(POLL_FREQUENCY));
```

测试本身将与显式等待保持相同：

```java
void givenPage_whenNavigatingWithFluentWait_thenOK() {
    final String expected = "About Baeldung";
    driver.navigate().to("https://www.baeldung.com/");

    driver.findElement(LOCATOR_ABOUT).click();
    wait.until(ExpectedConditions.visibilityOfElementLocated(LOCATOR_ABOUT_BAELDUNG));

    driver.findElement(LOCATOR_ABOUT_BAELDUNG).click();
    wait.until(ExpectedConditions.visibilityOfElementLocated(LOCATOR_ABOUT_HEADER));

    final String actual = driver.findElement(LOCATOR_ABOUT_HEADER).getText();
    assertEquals(expected, actual);
}
```

隐式和显式等待用于等待页面上元素的出现。然而，它们之间有一些不同：

- 超时：隐式等待为整个测试运行设置默认超时时间，而显式等待为特定条件设置超时时间。
- 条件：隐式等待等待页面上出现元素，而显式等待等待特定条件，例如元素的存在或元素可点击。
- 范围：隐式等待全局应用，而显式等待局部应用于特定元素。
- 异常：隐式等待在_WebDriver_在指定超时时间内找不到元素时抛出_NoSuchElementException_。相比之下，显式等待在元素在指定超时时间内不满足条件时抛出_TimeoutException_。

隐式等待在我们想要等待页面上元素出现一定时间时很有帮助。然而，如果我们需要等待特定条件，显式等待是更好的选择。

**根据Selenium文档，我们不应该混合使用它们：**

> _警告：不要混合使用隐式和显式等待。这样做可能会导致不可预测的等待时间。例如，设置10秒的隐式等待和15秒的显式等待可能会导致在20秒后超时。_

## 4. 最佳实践

在使用Selenium中的等待时，需要注意一些最佳实践：

- 总是使用等待：等待元素加载是自动化测试中的关键步骤。
- 使用显式等待而不是隐式等待：隐式等待可能会导致我们的测试在找不到元素时比必要的时间更长才能失败。显式和流畅等待更好，因为它们允许我们等待特定条件发生后再继续。
- 在必要时使用流畅等待：当我们需要反复验证特定条件直到它变为真时，我们应该使用流畅等待，因为它们提供了对等待机制的更大控制。
- 使用合理的等待时间：太短的等待时间可能会导致误报，而太长的等待时间可能会不必要地增加测试的总执行时间。
- 使用_ExpectedConditions_：在使用显式或流畅等待时，使用_ExpectedConditions_类定义我们想要等待的条件至关重要。通过这样做，我们可以确保我们的测试等待适当的条件，并在条件未满足时快速失败。

## 5. _StaleElementReferenceException_

_StaleElementReferenceException_是在先前定位的元素不再可用时出现的问题。

这可能发生在我们定位元素后的DOM发生变化时，例如，当等待元素满足指定条件为真时。

**要解决_StaleElementReferenceException_，我们需要在每次出现这个异常时重新定位元素。** 每次出现_SERE (StaleElementReferenceException)_时，我们会捕获异常，重新定位元素并重试该步骤。因为我们不能确定重新加载可以解决问题，我们需要在几次尝试后停止重试：

```java
boolean stale = true;
int retries = 0;
while(stale && retries < 5) {
    try {
        element.click();
        stale = false;
    } catch (StaleElementReferenceException ex) {
        retries++;
    }
}
if (stale) {
    throw new Exception("Element is still stale after 5 attempts");
}
```

由于这种解决方案在到处实现时不方便，我们可以包装_WebElement_和_WebDriver_并在内部处理_StaleElementReferenceException_。

通过这种方法，我们不需要在测试代码中处理_StaleElementReferenceExceptions_。我们必须包装_WebDriver_以使用包装的_WebElement_s。所有可能抛出_StaleElementReferenceException_的_WebElement_方法都可以进行调整。

## 6. 结