---
date: 2022-04-01
category:
  - Selenium
  - Web Testing
tag:
  - StaleElementReferenceException
  - Selenium WebDriver
head:
  - - meta
    - name: keywords
      content: Selenium, StaleElementReferenceException, Web Testing, WebDriver
---

# Selenium中的StaleElementReferenceException

## 1. 概述

在使用Selenium测试Web应用程序时，我们经常会遇到一个名为**StaleElementReferenceException**的常见错误。当我们引用一个过时的元素时，Selenium会抛出**StaleElementReferenceException**。一个元素由于页面刷新或DOM更新而变得过时。

在本教程中，我们将学习Selenium中的**StaleElementReferenceException**是什么以及为什么会发生。然后，我们将看看如何在我们的Selenium测试中避免这个异常。

## 2. 避免StaleElementReferenceException的策略

为了避免**StaleElementReferenceException**，确保动态地定位和与元素交互而不是存储对它们的引用是至关重要的。这意味着我们应该在每次需要时找到元素，而不是将它们保存在变量中。

在某些情况下，这种方法是不可能的，我们需要在再次与之交互之前刷新元素。因此，我们的解决方案是在捕获**StaleElementReferenceException**后执行重试并刷新元素。我们可以直接在测试中这样做，也可以为所有测试全局实现。

对于我们的测试，我们将为定位器定义几个常量：

```
By LOCATOR_REFRESH = By.xpath("//a[.='click here']");
By LOCATOR_DYNAMIC_CONTENT = By.xpath("(//div[@id='content']//div[@class='large-10 columns'])[1]");
```

对于设置，我们使用WebDriverManager的自动化方法。

### 2.1. 生成StaleElementReferenceException

首先，我们将看看一个以**StaleElementReferenceException**结束的测试：

```
void givenDynamicPage_whenRefreshingAndAccessingSavedElement_thenSERE() {
    driver.navigate().to("https://the-internet.herokuapp.com/dynamic_content?with_content=static");
    final WebElement element = driver.findElement(LOCATOR_DYNAMIC_CONTENT);

    driver.findElement(LOCATOR_REFRESH).click();
    Assertions.assertThrows(StaleElementReferenceException.class, element::getText);
}
```

这个测试存储了一个元素，并通过点击页面上的链接来更新DOM。当重新访问该元素时，由于它不再存在，会抛出**StaleElementReferenceException**。

### 2.2. 刷新元素

让我们使用重试逻辑，在重新访问之前刷新元素：

```
boolean retryingFindClick(By locator) {
    boolean result = false;
    int attempts = 0;
    while (attempts `< 5) {
       try {
            driver.findElement(locator).click();
            result = true;
            break;
        } catch (StaleElementReferenceException ex) {
            System.out.println(ex.getMessage());
        }
        attempts++;
    }
    return result;
}
```

每当发生**StaleElementReferenceException**时，我们将使用存储的元素定位器再次定位元素，然后再执行点击。

现在，让我们更新测试以使用新的重试逻辑：

```
void givenDynamicPage_whenRefreshingAndAccessingSavedElement_thenHandleSERE() {
    driver.navigate().to("https://the-internet.herokuapp.com/dynamic_content?with_content=static");
    final WebElement element = driver.findElement(LOCATOR_DYNAMIC_CONTENT);

    if (!retryingFindClick(LOCATOR_REFRESH)) {
        Assertions.fail("Element is still stale after 5 attempts");
    }
    Assertions.assertDoesNotThrow(() ->` retryingGetText(LOCATOR_DYNAMIC_CONTENT));
}
```

我们发现，如果需要为许多测试执行此操作，更新测试将变得繁琐。幸运的是，我们可以在不需要更新所有测试的中央位置使用此逻辑。

## 3. 避免StaleElementReferenceException的通用策略

我们将为通用解决方案创建两个新类：**RobustWebDriver**和**RobustWebElement**。

### 3.1. RobustWebDriver

首先，我们需要创建一个实现**WebDriver**实例的新类。我们将它作为一个包装器来编写**WebDriver**。它调用**WebDriver**方法，并且方法**findElement**和**findElements**将返回**RobustWebElement**：

```
class RobustWebDriver implements WebDriver {

    WebDriver originalWebDriver;

    RobustWebDriver(WebDriver webDriver) {
        this.originalWebDriver = webDriver;
    }
    ...
    @Override
    public List```<WebElement>``` findElements(By by) {
        return originalWebDriver.findElements(by)
                 .stream().map(e -> new RobustWebElement(e, by, this))
                 .collect(Collectors.toList());
    }

    @Override
    public WebElement findElement(By by) {
        return new RobustWebElement(originalWebDriver.findElement(by), by, this);
    }
    ...
}
```

### 3.2. RobustWebElement

**RobustWebElement**是**WebElement**的包装器。这个类实现了**WebElement**接口，并包含重试逻辑：

```
class RobustWebElement implements WebElement {

    WebElement originalElement;
    RobustWebDriver driver;
    By by;

    int MAX_RETRIES = 10;
    String SERE = "Element is no longer attached to the DOM";

    RobustWebElement(WebElement element, By by, RobustWebDriver driver) {
        originalElement = element;
        by = by;
        driver = driver;
    }
    ...
}
```

我们必须实现**WebElement**接口的每个方法，以便在抛出**StaleElementReferenceException**时刷新元素。为此，让我们引入一些包含刷新逻辑的帮助方法。我们将从这些覆盖的方法中调用它们。

我们可以利用函数式接口，并创建一个帮助类来调用**WebElement**的各种方法：

```
class WebElementUtils {

    private WebElementUtils(){
    }

    static void callMethod(WebElement element, Consumer```<WebElement>``` method) {
        method.accept(element);
    }

    static ``<U>`` void callMethod(WebElement element, BiConsumer``<WebElement, U>`` method, U parameter) {
        method.accept(element, parameter);
    }

    static ``<T>`` T callMethodWithReturn(WebElement element, Function``<WebElement, T>`` method) {
        return method.apply(element);
    }

    static ``<T, U>`` T callMethodWithReturn(WebElement element, BiFunction``<WebElement, U, T>`` method, U parameter) {
        return method.apply(element, parameter);
    }
}
```

在**WebElement**中，我们实现四种包含刷新逻辑的方法，并调用前面引入的**WebElementUtils**：

```
void executeMethodWithRetries(Consumer```<WebElement>``` method) { ... }

``<T>`` T executeMethodWithRetries(Function``<WebElement, T>`` method) { ... }

``<U>`` void executeMethodWithRetriesVoid(BiConsumer``<WebElement, U>`` method, U parameter) { ... }

``<T, U>`` T executeMethodWithRetries(BiFunction``<WebElement, U, T>`` method, U parameter) { ... }
```

**click**方法将如下所示：

```
@Override
public void click() {
    executeMethodWithRetries(WebElement::click);
}
```

现，我们只需要更改测试中的**WebDriver**实例：

```
driver = new RobustWebDriver(new ChromeDriver(options));
```

其他一切都可以保持不变，**StaleElementReferenceException**应该不再发生。

## 4. 结论

在本教程中，我们了解到**StaleElementReferenceException**可能在DOM更改后访问元素而没有刷新时发生。我们在测试中引入了重试逻辑，以便在每次发生**StaleElementReferenceException**时刷新元素。

如常，所有这些示例的实现都可以在GitHub上找到。
OK