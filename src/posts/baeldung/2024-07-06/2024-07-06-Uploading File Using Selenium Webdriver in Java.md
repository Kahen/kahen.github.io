---
date: 2022-04-01
category:
  - Java
  - Selenium
tag:
  - WebDriver
  - Java
head:
  - - meta
    - name: keywords
      content: Selenium WebDriver, Java, 文件上传, 自动化测试
---
# 使用Java中的Selenium WebDriver上传文件

Selenium WebDriver是一个可以自动化与Web浏览器的用户交互以测试Web应用程序的工具。它可以自动化文件上传、获取输入值、抓取HTML内容等过程。

在本教程中，我们将探讨如何使用Selenium中的_sendKeys()_方法上传文件。

### 2. 使用_sendKeys()_上传文件

简单来说，文件上传是许多Web应用程序的常见功能。然而，**使用Selenium WebDriver测试文件上传可能会很棘手，因为它涉及到与操作系统的本地文件系统的交互。为了克服这个挑战，我们可以使用_sendKeys()_方法。**

_sendKeys()_方法有助于模拟键盘操作。此方法可以将数据作为输入发送到HTML表单元素中。

_sendKeys()_接受_String_作为参数，并将其插入到选定的HTML元素中。这是自动化测试中的一个重要方法。常见的用例包括填写Web表单和在Web页面上搜索特定项目。

在本教程中，我们将使用_sendKeys()_填写Web表单，重点关注将文件上传到Web页面。让我们看一个使用_sendKeys()_上传图像文件的示例：

```java
class FileUploadWebDriverUnitTest {
    private WebDriver driver;
    private static final String URL = "http://www.csm-testcenter.org/test?do=show&subdo=common&test=file_upload";
    private static final String INPUT_NAME = "file_upload";

    @BeforeEach
    public void setUp() {
        WebDriverManager.firefoxdriver().setup();
        driver = new FirefoxDriver();
    }

    @AfterEach
    public void tearDown() {
        driver.quit();
    }

    @Test
    public void givenFileUploadPage_whenInputFilePath_thenFileUploadEndsWithFilename() {
        driver.get(URL);

        String filePath = System.getProperty("user.dir") + "/1688web.png";
        WebElement inputElement = driver.findElement(By.name(INPUT_NAME));
        WebElement submitButton = driver.findElement(By.name("http_submit"));

        inputElement.sendKeys(filePath);
        String actualFilePath = inputElement.getAttribute("value");
        String fileName = filePath.substring(filePath.lastIndexOf("/") + 1);

        WebElement submitButton = driver.findElement(By.name("submit"));
        submitButton.click();
        Assert.assertTrue(actualFilePath.endsWith(fileName));
    }
}
```

首先，我们配置_WebDriver_使用Mozilla Firefox，并编写一个_teardown()_方法，在测试完成后关闭浏览器。接下来，我们声明一个名为_URL_的字段，其中包含URL “_http://www.csm-testcenter.org/test do=show&subdo=common&test=file_upload_”，我们可以在这里上传文件。然后我们找到接受文件的HTML输入元素的名称属性。图像位于项目的根目录中。

此外，我们创建了_WebElement_实例以访问输入字段和提交按钮的名称属性。我们还指定了文件路径，并在_inputElement_上调用了_sendKeys()_方法，将图像路径输入到输入字段中。

最后，我们通过在_submitButton_上执行鼠标点击来启动上传操作。我们验证上传的文件具有与原始文件相同的名称和扩展名。

### 3. 结论

在本文中，我们学习了如何使用Selenium WebDriver上传文件。此外，我们使用_sendKeys()_方法向HTML输入元素发送命令。这项技能对于自动化Web测试和与不同的Web元素交互非常有用。

如往常一样，示例的完整源代码可在GitHub上获得。