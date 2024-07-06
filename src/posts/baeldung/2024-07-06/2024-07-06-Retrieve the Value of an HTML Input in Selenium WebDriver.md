---
date: 2022-04-01
category:
  - Selenium WebDriver
  - Automation Testing
tag:
  - HTML Input
  - Selenium
  - WebDriver
head:
  - - meta
    - name: keywords
      content: Selenium WebDriver, Automation, HTML Input Value, Java
------
# 使用Selenium WebDriver检索HTML输入框的值

自动化测试是软件开发的重要组成部分。Selenium是一个广泛使用的工具，它使用特定于浏览器的驱动程序来自动化Web应用程序的测试。

在本教程中，我们将学习如何设置Selenium项目，并从网页中检索HTML输入字段的值。

## 2. Selenium WebDriver是什么？

Selenium WebDriver是一个开源的自动化测试框架，它以本地方式驱动Web浏览器，像真实用户一样与它们交互。它支持一系列浏览器，包括Chrome、Firefox、Edge和Safari。

它可以用于自动化各种任务，例如Web测试、Web抓取和用户验收测试。

简单来说，WebDriver是在不同编程语言中实现的应用程序编程接口（API）。驱动程序负责Selenium和浏览器之间的通信。

## 3. 设置Selenium WebDriver项目

要开始在任何项目中使用Selenium，我们需要安装Selenium库和浏览器驱动程序。我们可以通过将依赖项添加到_pom.xml_来使用Maven安装Selenium库：

```xml
``<dependency>``
    ``<groupId>``org.seleniumhq.selenium``</groupId>``
    ``<artifactId>``selenium-java``</artifactId>``
    ``<version>``4.8.3``</version>``
``</dependency>``
```

此外，要安装浏览器驱动程序，我们将使用驱动管理软件。_WebDriverManager_是一个提供此功能的Java库。让我们将其依赖项添加到_pom.xml_：

```xml
``<dependency>``
    ``<groupId>``io.github.bonigarcia``</groupId>``
    ``<artifactId>``webdrivermanager``</artifactId>``
    ``<version>``5.3.2``</version>``
``</dependency>``
```

或者，我们可以从Selenium官方网站下载浏览器驱动程序。一旦我们下载了驱动程序，我们需要将其解压，将其放置在项目根目录中，并在代码中指向其位置。

在下一节中，我们将使用Selenium脚本检索DuckDuckGo主页上的输入字段的值。

## 4. 使用Selenium WebDriver检索HTML输入值

首先，我们将检索DuckDuckGo搜索字段中的输入值。主页将作为我们的示例HTML页面。它有一个用于输入搜索查询的输入字段，其ID为“_search_form_input_homepage_”。

接下来，让我们编写一个Selenium脚本来检索输入字段的值：

```java
class SeleniumWebDriverUnitTest {
    private WebDriver driver;
    private static final String URL = "https://duckduckgo.com";
    private static final String INPUT_ID = "search_form_input_homepage";

    @BeforeEach
    public void setUp() {
        WebDriverManager.chromedriver().set();
        driver = new ChromeDriver();
    }

    @AfterEach
    public void tearDown() {
        driver.quit();
    }

    @Test
    public void givenDuckDuckGoHomePage_whenInputHelloWorld_thenInputValueIsHelloWorld() {
        driver.get(URL);
        WebElement inputElement = driver.findElement(By.id(INPUT_ID));
        inputElement.sendKeys(Keys.chord(Keys.CONTROL, "a"), Keys.DELETE);
        inputElement.sendKeys("Hello World!");
        String inputValue = inputElement.getAttribute("value");
        Assert.assertEquals("Hello World!", inputValue);
    }
}
```

在上面的示例中，我们创建了一个_WebDriver_实例来控制Chrome Web浏览器。然后，我们使用_WebDriver_实例导航到URL为“_https://duckduckgo.com_”的网页。

此外，我们在_WebDriverManager_上调用_chromedriver().set()_来设置浏览器驱动程序。它自动为我们下载和设置Chrome驱动程序。此外，我们将_driver_初始化为_ChromeDriver_对象，这有助于调用Chrome浏览器。

接下来，我们通过调用_driver_上的_get()_方法导航到URL。然后，我们创建一个名为_inputElement_的_WebElement_变量，并按其_id_查找输入元素并将其分配给_inputElement_。_WebElement_是一个接口，表示Selenium WebDriver中的HTML元素。它提供了各种与元素交互的方法，例如_sendKeys()_、_getText()_等。我们可以使用不同的定位策略，例如_id_、_name_或_xpath_来查找Web元素。

此外，我们模拟从代码中清除输入字段，并输入“Hello World!”作为输入值。然后，我们创建一个_string_类型的_inputValue_变量，并在_inputElement_上调用_getAttribute()_方法，参数为“_value_”并将其分配给_inputValue_。

此外，我们有_tearDown()_方法，它关闭浏览器窗口并释放_ChromeDriver_对象使用的资源。

最后，我们断言预期结果等于网页上指定输入_id_的输入值。

## 5. 结论

在本文中，我们首先看到了如何使用驱动管理软件安装Selenium浏览器驱动程序，以及如何手动下载它。然后，我们学习了如何使用Selenium WebDriver从HTML网页获取输入值。

如常，示例的完整源代码可在GitHub上获得。