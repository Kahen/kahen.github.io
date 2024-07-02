---
date: 2022-04-01
category:
  - Java
  - JUnit
tag:
  - System.in
  - Unit Testing
head:
  - - meta
    - name: keywords
      content: Java, JUnit, System.in, Unit Testing, System Rules, System Lambda, System Stubs
---
# 使用JUnit对System.in进行单元测试

当涉及到测试依赖于控制台用户输入的代码时，这个过程可能会变得相当具有挑战性。此外，测试用户输入场景是控制台基础或独立应用程序的一个关键部分，因为我们需要确保正确处理不同的输入。

在本教程中，我们将探讨如何使用JUnit测试_System.in_。

## 2. 理解_System_类

在我们深入研究之前，让我们先看看_System_类。它是一个来自_java.lang_包的最终类。

该类通过_in_和_out_变量提供了对标准输入和输出流的访问。与_out_变量类似，_System_类还有一个_err_变量，代表标准错误输出流。

此外，这些变量允许我们从控制台读取和写入。使用这些流，我们允许用户从控制台与我们的应用程序进行交互。

接下来，_System.in_返回一个_InputStream_，该流已经打开，可以从标准输入读取数据。使用_System.in_，我们可以将从键盘到CPU的输入流重定向到我们的应用程序。

## 3. 示例输入

让我们从我们将在整个教程中使用的简单示例开始：

```java
public static final String NAME = "Name: ";

public static String readName() {
    Scanner scanner = new Scanner(System.in);
    String input = scanner.next();
    return NAME.concat(input);
}
```

Java提供了_Scanner_类，它允许我们从各种来源读取输入，包括标准键盘输入。此外，它提供了读取用户输入的最简单方式。使用_Scanner_，我们可以读取任何原始数据类型或_String_。

在我们的示例方法中，我们使用_next()_方法从用户读取输入。此外，该方法将输入中的下一个单词作为_String_读取。

## 4. 使用核心Java

测试标准输入的第一个方法包括Java API提供的功能。

**我们可以利用_System.in_创建自定义_InputStream_并在测试期间模拟用户输入。**

然而，在编写单元测试之前，让我们在我们的测试类中编写_provideInput()_辅助方法：

```java
void provideInput(String data) {
    ByteArrayInputStream testIn = new ByteArrayInputStream(data.getBytes());
    System.setIn(testIn);
}
```

在方法内部，我们创建一个新的_ByteArrayInputStream_并将我们期望的输入作为_byte_数组传递。

**此外，我们使用_System.setIn()_方法将自定义输入流设置为_System.in_的输入。**

现在，让我们为我们的示例方法编写一个单元测试。我们可以调用我们的应用程序类的_readName()_方法，它现在读取我们的自定义输入：

```java
@Test
void givenName_whenReadFromInput_thenReturnCorrectResult() {
    provideInput("Baeldung");
    String input = Application.readName();
    assertEquals(NAME.concat("Baeldung"), input);
}
```

## 5. 使用System Rules库和JUnit 4

现在，让我们看看如何使用System Rules库和JUnit 4测试标准输入。

首先，让我们向我们的_pom.xml_添加所需的依赖项：

```xml
````<dependency>````
    ````<groupId>````com.github.stefanbirkner````</groupId>````
    ````<artifactId>````system-rules````</artifactId>````
    ````<version>````1.19.0````</version>````
    ```<scope>```test```</scope>```
````</dependency>````
```

该库为依赖于_System.in_和_System.out_的代码提供了JUnit规则。

此外，它允许我们在测试执行期间重定向输入和输出流，这使得模拟用户输入变得容易。

其次，要测试_System.in_，我们需要定义一个新的_TextFromStandardInputStream_规则。我们将使用_emptyStandardInputStream()_方法来使用空输入流初始化变量：

```java
@Rule
public final TextFromStandardInputStream systemIn = emptyStandardInputStream();
```

最后，让我们编写单元测试：

```java
@Test
public void givenName_whenReadWithSystemRules_thenReturnCorrectResult() {
    systemIn.provideLines("Baeldung");
    assertEquals(NAME.concat("Baeldung"), Application.readName());
}
```

此外，我们使用_accepts varargs_的_provideLines()_方法并将它们设置为输入。

此外，原始的_System.in_在测试执行后会恢复。

## 6. 使用System Lambda库和JUnit 5

重要的是要注意，System Rules默认不支持JUnit 5。然而，它们提供了一个System Lambda库，我们可以与JUnit 5一起使用。

我们需要在_pom.xml_中添加一个额外的依赖项：

```xml
````<dependency>````
    ````<groupId>````com.github.stefanbirkner````</groupId>````
    ````<artifactId>````system-lambda````</artifactId>````
    ````<version>````1.2.1````</version>````
    ```<scope>```test```</scope>```
````</dependency>````
```

现在，让我们在测试中使用System Lambda：

```java
@Test
void givenName_whenReadWithSystemLambda_thenReturnCorrectResult() throws Exception {
    withTextFromSystemIn("Baeldung")
      .execute(() -> assertEquals(NAME.concat("Baeldung"), Application.readName()));
}
```

在这里，我们使用_SystemLambda_类中提供的_withTextFromSystemIn()_静态方法来设置将从_System.in_可用的输入行。

## 7. 使用System Stubs库和JUnit 4

此外，我们可以使用JUnit 4和System Stubs库测试标准输入。

让我们添加所需的依赖项：

```xml
````<dependency>````
    ````<groupId>````uk.org.webcompere````</groupId>````
    ````<artifactId>````system-stubs-junit4````</artifactId>````
    ````<version>````2.0.2````</version>````
    ```<scope>```test```</scope>```
````</dependency>````
```

接下来，让我们创建_SystemInRule_并传递期望的输入值：

```java
@Rule
public SystemInRule systemInRule = new SystemInRule("Baeldung");
```

现在，我们可以使用创建的规则在我们的单元测试中：

```java
@Test
public void givenName_whenReadWithSystemStubs_thenReturnCorrectResult() {
    assertThat(Application.readName()).isEqualTo(NAME.concat("Baeldung"));
}
```

## 8. 使用System Stubs库和JUnit 5

要使用System Stubs和JUnit 5测试_System.in_，我们需要添加另一个依赖项：

```xml
````<dependency>````
    ````<groupId>````uk.org.webcompere````</groupId>````
    ````<artifactId>````system-stubs-jupiter````</artifactId>````
    ````<version>````2.0.2````</version>````
````</dependency>````
```

为了提供输入值，我们将使用_withTextFromSystemIn()_方法：

```java
@Test
void givenName_whenReadWithSystemStubs_thenReturnCorrectResult() throws Exception {
    SystemStubs.withTextFromSystemIn("Baeldung")
      .execute(() -> {
        assertThat(Application.readName())
          .isEqualTo(NAME.concat("Baeldung"));
      });
}
```

## 9. 结论

在本文中，我们学习了如何使用JUnit 4和JUnit 5测试_System.in_。

通过第一种方法，我们学习了如何使用Java核心特性自定义_System.in_。在第二种方法中，我们看到了如何使用System Rules库。接下来，我们学习了如何使用System Lambda库编写JUnit 5的测试。最后，我们看到了如何使用System Stubs库。

如常，本文的全部源代码可在GitHub上找到。