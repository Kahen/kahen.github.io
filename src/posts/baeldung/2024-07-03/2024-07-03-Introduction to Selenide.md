---
date: 2023-07-07
category:
  - Selenide
  - UI自动化测试
tag:
  - Selenide
  - Selenium WebDriver
  - UI测试
head:
  - - meta
    - name: keywords
      content: Selenide, Selenium WebDriver, UI自动化测试
---
# Selenide简介

在本文中，我们将了解用于UI自动化测试的Selenide项目。我们将看到它是什么以及如何使用它来测试我们的UI项目。

## 2. Selenide是什么？

Selenide是一个建立在Selenium WebDriver之上的免费、开源框架。它为我们提供了执行web应用程序自动化测试的所有Selenium的强大功能。然而，它大大简化了，使我们只关注重要的事情。

特别是，Selenide将简化所有web浏览器的管理。它还会在测试失败时自动捕获浏览器窗口的截图。然后，它为我们提供了一个更加简化的API，用于与web浏览器交互，包括几个不直接从Selenium提供的函数，并简化了其他可用的函数。

## 3. 入门

让我们快速看一下使用Selenide的简单示例。

### 3.1. Maven依赖

在我们能做任何事情之前，我们需要将Selenide添加到我们的项目中。这是一个我们可以添加到我们的构建中的单一依赖项：

```xml
`<dependency>`
    `<groupId>`com.codeborne`</groupId>`
    `<artifactId>`selenide`</artifactId>`
    `<version>`6.15.0`</version>`
    `<scope>`test`</scope>`
`</dependency>`
```

最新版本可以在Maven中央仓库中找到。

这将自动拉取所有必要的内容，包括适当版本的Selenium WebDriver。

我们还需要已经有一个测试框架可用——例如，JUnit。这将被用来像往常一样编写我们的测试，Selenide只是我们可以在测试代码中使用的另一个库。

### 3.2. 我们的第一次测试

现在我们已经设置了依赖项，让我们编写一个测试。我们将做一个测试，检查Baeldung是否确实是在搜索引擎搜索时的第一个结果。

我们首先需要一些导入。我们不需要这些，但它们使代码更容易阅读：

```java
import static com.codeborne.selenide.Selenide.*;
import static com.codeborne.selenide.Condition.*;
import org.openqa.selenium.By;
```

现在我们可以编写我们的测试：

```java
@Test
public void searchBaeldung() throws Exception {
    open("https://duckduckgo.com/");

    SelenideElement searchbox = $(By.id("searchbox_input"));
    searchbox.click();
    searchbox.sendKeys("Baeldung");
    searchbox.pressEnter();

    SelenideElement firstResult = $(By.id("r1-0"));
    firstResult.shouldHave(text("Baeldung"));
}
```

首先要注意的是这里的内容很少。我们没有关于浏览器管理、等待加载或其他通常使这些测试变得复杂的事情。相反，我们在这里看到的所有内容都直接与所讨论的测试有关。

我们首先打开我们的网页。然后我们点击搜索框，输入我们的搜索词，并按回车。最后，我们定位到第一个结果（我们知道从页面的HTML中_r1-0_是给第一个结果的ID）并确保它具有预期的文本。

我们在这里看到的_$()_符号是我们查询浏览器页面的方式。这需要一个选择器并返回一个_代表整个页面中第一个匹配元素的SelenideElement。我们还有_$$()_它将返回所有匹配元素的集合。

一旦我们有了_，我们就可以继续使用相同的模式变得更具体——只是这次它将是_。SelenideElement.$_和_。SelenideElement.$$_我们使用它们。

一旦我们有了_，我们就可以开始与它交互——例如使用_()_、_sendKeys()_和_pressEnter()_等方法。

我们还可以使用_should()_、_shouldBe()_和_shouldHave()_来断言元素正如我们所期望的那样。这三种方法在功能上是相同的，只是措辞不同，只是为了使测试读起来更好——例如，_firstResult.should(text("Baeldung"));_在功能上是相同的，但读起来不好。

## 4. 页面对象

页面对象是我们在UI测试中可以使用的有用模式。这涉及到编写类来封装整个网页或其部分。然后我们可以在测试中使用这些对象。好处在于，如果我们改变了页面的工作方式，我们只需要改变单个页面对象，使用它的每个测试就会自动正确。

毫不奇怪，Selenide允许我们像Selenium WebDriver一样轻松地使用页面对象模式。我们可以编写直接使用Selenide类的类，无论是通过使用_$_静态方法，允许我们与整个页面交互，还是通过包装一个_代表页面较小部分的SelenideElement值。

让我们使用这种模式重写我们最初的测试，看看它是什么样子的。首先，我们需要一个页面模型来表示搜索表单：

```java
public class SearchFormPage {
    public void open() {
        Selenide.open("http://duckduckgo.com/");
    }

    public void search(String term) {
        SelenideElement searchbox = $(By.id("searchbox_input"));
        searchbox.click();
        searchbox.sendKeys(term);
        searchbox.pressEnter();
    }
}
```

这有两个我们可以使用方法——一个用于打开搜索页面，一个用于实际执行搜索。

接下来，我们需要一个页面模型来表示搜索结果页面：

```java
public class SearchResultsPage {
    public SearchResult getResult(int index) {
        SelenideElement result = $(By.id("r1-" + index));
        result.shouldBe(visible);

        return new SearchResult(result);
    }
}
```

这为我们提供了一个获取单个结果的方法。这次返回了另一个页面对象，它包装了页面中的一个_。

```java
public class SearchResult {
    private SelenideElement result;

    public SearchResult(SelenideElement result) {
        this.result = result;
    }

    public String getText() {
        return result.getText();
    }
}
```

然后这个页面对象包装了那个_并允许我们准确地与它交互。在这种情况下，通过获取搜索结果的文本。

现在我们可以实际编写一个测试：

```java
@Test
public void searchBaeldung() {
    SearchFormPage searchFormPage = new SearchFormPage();
    searchFormPage.open();
    searchFormPage.search("Baeldung");

    SearchResultsPage results = new SearchResultsPage();

    SearchResult firstResult = results.getResult(0);
    assertTrue(firstResult.getText().contains("Baeldung"));
}
```

这个测试和之前的一样，但现在我们正在用类来写它，这些类更好地解释了发生了什么。这使得测试对于那些不知道HTML是如何渲染的人来说更容易阅读。

它还使我们能够轻松地更改页面的交互方式。例如，如果查找单个搜索结果的方式发生了变化，那么我们只需要更改这里的_getResult()_方法，而不是单独更改许多不同的测试。

## 5. 失败的测试

我们在编写测试时的一个重要细节是能够轻松地识别它们失败的原因。如果没有这个，我们可能会花费大量的努力来确定出了什么问题。

让我们尝试改变我们最初的测试，使其失败。我们将通过调整它来搜索错误的术语来实现这一点：

```java
SelenideElement searchbox = $(By.id("searchbox_input"));
searchbox.click();
searchbox.sendKeys("Something Else");
searchbox.pressEnter();
```

显然，运行这个测试会失败——搜索“Something Else”不会找到Baeldung作为第一个结果。但是，当它失败时是什么样子呢？

毫不奇怪，失败发生在我们的第一个断言上：

![img](https://www.baeldung.com/wp-content/uploads/2023/07/2_Screenshot-2023-07-07-at-07.38.47.png)

但实际的错误是什么样子的呢？

![img](https://www.baeldung.com/wp-content/uploads/2023/07/1_Screenshot-2023-07-07-at-07.54.04-1024x393.png)

从这里，我们可以立即看到我们正在断言的确切HTML元素，以及它的确切值。在这种情况下，我们正在对文本内容进行断言，所以我们看到的就是这个。

但还有更多。**我们已经捕获了截图和页面源文件。**我们可以打开这些来查看错误发生时网页的确切状态：

![img](https://www.baeldung.com/wp-content/uploads/2023/07/1_1688712818012.0-1024x516.png)

立即查看这个截图，我们可以看到我们搜索了错误的东西，所以我们得到了错误的搜索结果。这可以帮助我们识别问题并轻松地修复测试。

或者，它实际上可能突出了应用程序的预期行为。在这种情况下，测试是好的，但已经识别了我们代码中的回归。

## 6. 配置Selenide

我们刚刚看到Selenide为失败的测试保存了截图。但它需要知道把截图放在哪里。

**Selenide开箱即用具有合理的默认行为。**例如，默认情况下，我们的截图存储在_build/reports/tests_中。

**然而，这些默认设置并不总是适用于每种情况，所以我们必须能够调整它们。**我们可以通过以下三种方式之一来做到这一点：

- 使用属性文件
- 使用系统属性
- 在代码中以编程方式

我们可以控制这些设置的最高优先级方式是在代码中。我们通过在测试期间更改_com.codeborne.selenide.Configuration_对象上的属性来实现。这可以直接在测试本身中完成，在_@BeforeEach_方法中，或者在任何执行适当时间的地方。所有这些属性都有JavaDoc解释它们的含义，以便我们可以正确地更改它们。

其次是使用系统属性。我们可以以我们为运行测试提供系统属性的标准方式提供这些属性。属性名称与_Configuration_类中的字段名称完全相同，只是加上了“_selenide._”前缀。例如，_selenide.reportsFolder_对应于_Configuration.reportsFolder_。

最后，我们可以在类路径根目录下的_selenide.properties_文件中定义所有这些属性。例如，在maven项目中，这将位于_src/test/resources_。此文件具有与系统属性名称完全相同的属性，但它们存在于项目内部，而系统属性可以从外部指定——例如，由我们的CI系统指定。

这里最重要的属性是那些关于如何使用web浏览器以及存储文件的位置。例如，我们可以通过以下方式使用Firefox而不是Chrome：

- 在我们的代码中以编程方式设置_Configuration.browser = “firefox”;_。
- 在命令行中添加_-Dselenide.browser=firefox_。
- 在_selenide.properties_文件中添加_selenide.browser=firefox_。

这三种方式都将具有相同的效果。这意味着，例如，我们可以使用系统属性方法在CI构建中以各种不同的web浏览器运行完全相同的测试。

## 7. 结论

**在这里，我们已经看到了Selenide库的介绍以及如何使用它来编写UI自动化测试。**下次你进行UI测试时，为什么不试试呢？

正如往常一样，我们可以在GitHub上找到本文的所有代码。

![img](https://www.baeldung.com/wp-content/uploads/2023/07/2_Screenshot-2023-07-07-at-07.38.47.png)
![img](https://www.baeldung.com/wp-content/uploads/2023/07/1_Screenshot-2023-07-07-at-07.54.04-1024x393.png)
![img](https://www.baeldung.com/wp-content/uploads/2023/07/1_1688712818012.0-1024x516.png)

OK