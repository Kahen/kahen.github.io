---
date: 2024-07-13
category:
  - Java
  - Selenium
tag:
  - WebDriver
  - Error
head:
  - - meta
    - name: keywords
      content: Selenium WebDriver, 路径错误, 浏览器驱动, Java
---

# 解决Selenium WebDriver可执行文件路径错误

在本教程中，我们将探讨Selenium的常见错误：“必须通过webdriver.chrome.driver系统属性设置驱动程序可执行文件的路径。”此错误阻止了Selenium启动浏览器。这是由于配置不完整造成的。我们将学习如何通过手动或自动的正确设置来解决这个问题。

## 2. 错误原因

在我们能够使用Selenium之前，需要进行一些设置步骤，例如设置WebDriver的路径。**如果我们没有配置WebDriver的路径，我们就不能运行它来控制浏览器，我们将得到一个java.lang.IllegalStateException。**

让我们看看导致此错误的不完整设置：

```java
WebDriver driver = new ChromeDriver();
```

通过这个语句，我们想要创建一个新的_ChromeDriver_实例，但由于我们没有提供_WebDriver_的路径，Selenium无法运行它，并以错误“java.lang.IllegalStateException: 必须通过webdriver.chrome.driver系统属性设置驱动程序可执行文件的路径”失败。

为了解决这个问题，我们需要执行正确的设置。我们可以手动或使用专用库自动完成此操作。

## 3. 手动设置

首先，我们需要为我们的浏览器下载正确的WebDriver。下载正确版本的WebDriver至关重要，因为否则在运行时可能会出现不可预见的问题。

可以从以下网站下载正确的WebDriver：
- Chrome: https://chromedriver.chromium.org/downloads
- Edge: https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/
- Firefox: https://github.com/mozilla/geckodriver/releases

然后Selenium需要下载的驱动程序的路径，以便它可以运行它来控制浏览器。**我们可以通过系统属性设置驱动程序的路径。**每个浏览器的属性键不同：
- Chrome: webdriver.chrome.driver
- Firefox: webdriver.gecko.driver
- Edge: webdriver.edge.driver

让我们看看Chrome的手动设置。我们设置先前下载的WebDriver的路径，然后创建一个_ChromeDriver_实例：

```java
WebDriver driver;

void setupChromeDriver() {
    System.setProperty("webdriver.chrome.driver", "src/test/resources/chromedriver.exe");
    driver = new ChromeDriver();
    options();
}

void options() {
    driver.manage().window().maximize();
}
```

路径可以是相对的或绝对的。此外，我们可以设置各种设置，如上面的示例中最大化浏览器窗口。

其他浏览器的设置非常相似。正如我们下面看到的，我们只需要替换驱动程序设置方法，并为相应的驱动程序设置路径：

```java
void setupGeckoDriver() {
    System.setProperty("webdriver.gecko.driver", "src/test/resources/geckodriver.exe");
    driver = new FirefoxDriver();
    options();
}

void setupEdgeDriver() {
    System.setProperty("webdriver.edge.driver", "src/test/resources/msedgedriver.exe");
    driver = new EdgeDriver();
    options();
}
```

我们可以通过在https://www.baeldung.com上进行一个小检查来验证设置：

```java
String TITLE_XPATH = "//a[@href='/']";
String URL = "https://www.baeldung.com";

@Test
void givenChromeDriver_whenNavigateToBaeldung_thenFindTitleIsSuccessful() {
    setupChromeDriver();
    driver.get(URL);
    final WebElement title = driver.findElement(By.xpath(TITLE_XPATH));

    assertEquals("Baeldung", title.getAttribute("title"));
}
```

**如果设置仍然不起作用，我们需要确保WebDriver的路径是正确的。**

## 4. 自动设置

手动设置可能会很繁琐，因为我们需要手动下载特定的WebDriver。我们还需要确保我们使用的是正确版本。如果安装的浏览器启用了自动更新，这可能需要我们定期用更新版本的WebDriver替换它。

为了克服这个问题，我们可以利用WebDriverManager库，每次运行时它都会为我们处理这些任务。

首先，我们需要将依赖项添加到我们的_pom.xml_：

```xml
`<dependency>`
    `<groupId>`io.github.bonigarcia`</groupId>`
    `<artifactId>`webdrivermanager`</artifactId>`
    `<version>`5.3.0`</version>`
`</dependency>`
```

使用库进行设置非常简单，只需要一行代码：

```java
WebDriver driver;

void setupChromeDriver() {
    WebDriverManager.chromedriver().setup();
    driver = new ChromeDriver();
    options();
}

void options() {
    driver.manage().window().maximize();
}
```

在设置期间，_WebDriverManager_检查安装的浏览器版本，并自动下载正确的WebDriver版本。它设置系统属性然后运行浏览器。

适应其他浏览器的设置也很简单：

```java
void setupGeckoDriver() {
    WebDriverManager.firefoxdriver().setup();
    driver = new FirefoxDriver();
    options();
}

void setupEdgeDriver() {
    WebDriverManager.edgedriver().setup();
    driver = new EdgeDriver();
    options();
}
```

同样，我们可以通过在https://www.baeldung.com上进行一个小测试来验证这个设置：

```java
String TITLE_XPATH = "//a[@href='/']";
String URL = "https://www.baeldung.com";

@Test
void givenChromeDriver_whenNavigateToBaeldung_thenFindTitleIsSuccessful() {
    setupChromeDriver();
    driver.get(URL);
    final WebElement title = driver.findElement(By.xpath(TITLE_XPATH));

    assertEquals("Baeldung", title.getAttribute("title"));
}
```

## 5. 结论

在本文中，我们看到了导致Selenium错误“必须通过webdriver.chrome.driver系统属性设置驱动程序可执行文件的路径”的原因以及如何解决它。

我们可以进行手动设置，但这会导致一些维护工作。使用WebDriverManager库的自动设置减少了使用Selenium时的维护工作。

如常，所有这些示例的实现都可以在GitHub上找到。