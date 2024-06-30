---
date: 2022-04-01
category:
  - Java
  - JUnit
tag:
  - JUnit
  - Testing
  - main method
head:
  - - meta
    - name: keywords
      content: JUnit, Testing, main method, Java
------
# 使用JUnit测试main方法

## 1. 概述

main()方法是每个Java应用程序的起始点，根据应用程序的类型，它的外观可能会有所不同。在常规的Web应用程序中，main()方法将负责启动上下文，但在某些控制台应用程序中，我们将业务逻辑放入其中。

测试main()方法相当复杂，因为我们有一个只接受字符串参数且不返回任何内容的静态方法。

在本文中，我们将重点讨论如何测试main方法，特别是关注命令行参数和输入流。

## 2. Maven依赖

对于本教程，我们需要几个测试库（Junit和Mockito）以及Apache Commons CLI来处理参数：

```xml
```<dependency>```
    ```<groupId>```commons-cli```</groupId>```
    ```<artifactId>```commons-cli```</artifactId>```
    ```<version>```1.6.0```</version>```
```</dependency>```
```<dependency>```
    ```<groupId>```org.junit.jupiter```</groupId>```
    ```<artifactId>```junit-jupiter-api```</artifactId>```
    ```<version>```5.10.0```</version>```
    ``<scope>``test``</scope>``
```</dependency>```
```<dependency>```
    ```<groupId>```org.mockito```</groupId>```
    ```<artifactId>```mockito-core```</artifactId>```
    ```<version>```5.5.0```</version>```
    ``<scope>``test``</scope>``
```</dependency>```
```

我们可以在Maven中央仓库中找到JUnit、Mockito和Apache Commons CLI的最新版本。

## 3. 设置场景

为了说明main()方法的测试，让我们定义一个实际场景。想象我们被要求开发一个简单的应用程序，旨在计算提供的数字之和。它应该能够读取输入，无论是从控制台交互式地读取还是从文件中读取，这取决于提供的参数。程序输入包括一系列数字。

根据我们的场景，程序应该根据用户定义的参数动态适应其行为，导致执行不同的工作流程。

### 3.1. 使用Apache Commons CLI定义程序参数

我们需要为描述的场景定义两个基本参数：“i”和“f”。“i”选项指定输入源，有两个可能的值（FILE和CONSOLE）。同时，“f”选项允许我们指定要读取的文件名，它仅在“i”选项被指定为FILE时有效。

为了简化我们与这些参数的交互，我们可以依赖Apache Commons CLI库。这个工具不仅验证参数，还促进值的解析。以下是使用Apache的Option构建器定义“i”选项的示例：

```java
Option inputTypeOption = Option.builder("i")
  .longOpt("input")
  .required(true)
  .desc("The input type")
  .type(InputType.class)
  .hasArg()
  .build();
```

一旦我们定义了我们的选项，Apache Commons CLI将帮助解析输入参数，以分支业务逻辑的工作流程：

```java
Options options = getOptions();
CommandLineParser parser = new DefaultParser();
CommandLine commandLine = parser.parse(options, args);

if (commandLine.hasOption("i")) {
    System.out.print("Option i is present. The value is: " + commandLine.getOptionValue("i") + " \n");
    String optionValue = commandLine.getOptionValue("i");
    InputType inputType = InputType.valueOf(optionValue);

    String fileName = null;
    if (commandLine.hasOption("f")) {
        fileName = commandLine.getOptionValue("f");
    }
    String inputString = inputReader.read(inputType, fileName);
    int calculatedSum = calculator.calculateSum(inputString);
}
```

为了保持清晰和简单，我们将责任划分为不同的类。_InputType_枚举封装了可能的输入参数值。_InputReader_类根据_InputType_检索输入字符串，_Calculator_根据解析的字符串计算总和。

有了这样的分离，我们可以保持一个简单的主类，如下所示：

```java
public static void main(String[] args) {
    Bootstrapper bootstrapper = new Bootstrapper(new InputReader(), new Calculator());

    bootstrapper.processRequest(args);
}
```

## 4. 如何测试Main方法

main()方法的签名和行为与我们在应用程序中使用的常规方法不同。**因此，我们需要结合多种特定于测试静态方法、void方法、输入流和参数的测试策略。**

我们将在以下段落中介绍每个概念，但首先让我们看看main()方法的业务逻辑可能是如何构建的。

当我们在开发一个新应用程序，并且我们可以完全控制其架构时，那么main()方法不应该有任何复杂的逻辑，而只是初始化所需的工作流程。有了这样的架构，我们可以对每个工作流程部分（_Bootstrapper_、_InputReader_和_Calculator_可以单独测试）进行适当的单元测试。

另一方面，当涉及到有历史的旧应用程序时，事情可能会变得有点棘手。特别是当以前的开发人员直接在主类的静态上下文中放置了很多业务逻辑时。遗留代码并不总是可以更改的，我们应该使用已经编写的内容。

### 4.1. 如何测试静态方法

在过去，使用Mockito处理静态上下文相当具有挑战性，通常需要使用像PowerMockito这样的库。然而，在Mockito的最新版本中，这个限制已经被克服。**随着3.4.0版本中Mockito.mockStatic的引入，我们现在可以轻松地模拟和验证静态方法，而不需要额外的库。**这个增强功能简化了涉及静态方法的测试场景，使我们的测试过程更加流畅和高效。

使用_MockedStatic_我们可以执行与常规Mock相同的操作：

```java
try (MockedStatic`<SimpleMain>` mockedStatic = Mockito.mockStatic(StaticMain.class)) {
    mockedStatic.verify(() -> StaticMain.calculateSum(stringArgumentCaptor.capture()));
    mockedStatic.when(() -> StaticMain.calculateSum(any())).thenReturn(24);
}
```

为了强制_MockedStatic_作为Spy工作，我们需要添加一个配置参数：

```java
MockedStatic`<StaticMain>` mockedStatic = Mockito.mockStatic(StaticMain.class, Mockito.CALLS_REAL_METHODS)
```

一旦我们根据需要配置了_MockedStatic_，我们就可以彻底测试静态方法。

### 4.2. 如何测试Void方法

遵循功能开发方法，方法应该符合几个要求。它们应该是独立的，不应该修改传入的参数，并应该返回处理结果。

有了这样的行为，我们可以根据返回结果的验证轻松编写单元测试。**然而，测试void方法则不同，重点转移到了方法执行引起的副作用和状态变化上。**

### 4.3. 如何测试程序参数

我们可以像调用任何其他标准Java方法一样，从测试类中调用main()方法。为了评估它与不同参数集的行为，我们只需要在调用期间提供这些参数。

考虑到前一段中定义的_Options_，我们可以用短参数_i_调用我们的main()：

```java
String[] arguments = new String[] { "-i", "CONSOLE" };
SimpleMain.main(arguments);
```

同样，我们可以用_i_参数的长形式调用main方法：

```java
String[] arguments = new String[] { "--input", "CONSOLE" };
SimpleMain.main(arguments);
```

### 4.4. 如何测试数据输入流

通常，从控制台读取是使用_System.in_构建的：

```java
private static String readFromConsole() {
    System.out.println("Enter values for calculation: \n");
    return new Scanner(System.in).nextLine();
}
```

_System.in_是主机环境指定的“标准”输入流，通常对应于键盘输入。我们不能在测试中提供键盘输入，但我们可以更改由_System.in_引用的流类型：

```java
InputStream fips = new ByteArrayInputStream("1 2 3".getBytes());
System.setIn(fips);
```

在这个例子中，我们更改了默认输入类型，以便应用程序将从_ByteArrayInputStream_读取，而不会一直等待用户输入。

我们可以在测试中使用任何其他类型的_InputStream_，例如，我们可以从文件中读取：

```java
InputStream fips = getClass().getClassLoader().getResourceAsStream("test-input.txt");
System.setIn(fips);
```

此外，采用相同的方法，我们可以替换输出流以验证程序写入的内容：

```java
ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
PrintStream out = new PrintStream(byteArrayOutputStream);
System.setOut(out);
```

采用这种方法，我们将看不到控制台输出，因为_System.out_将把所有数据发送到_ByteArrayOutputStream_而不是控制台。

## 5. 完整的测试示例

让我们结合前几段收集的所有知识来编写一个完整的测试。我们将执行以下步骤：

1. 将我们的主类作为spy进行模拟
2. 将输入参数定义为_String_数组
3. 替换_System.in_中的默认流
4. 验证程序在静态上下文中调用了所有必需的方法，或者程序将必要的结果写入控制台。
5. 将_System.in_和_System.out_流替换回原始状态，以便流替换不会影响其他测试

在这个例子中，我们有一个测试_StaticMain_类的测试，其中所有逻辑都放在静态上下文中。我们用_ByteArrayInputStream_替换了_System.in_，并基于_verify()_构建了我们的验证：

```java
@Test
public void givenArgumentasConsoleInput_WhenReadFromSubstitutedByteArrayInputStream_ThenSuccessfullyCalculate() throws IOException {
    String[] arguments = new String[] { "-i", "CONSOLE" };
    try (MockedStatic mockedStatic = Mockito.mockStatic(StaticMain.class, Mockito.CALLS_REAL_METHODS);
      InputStream fips = new ByteArrayInputStream("1 2 3".getBytes())) {

        InputStream original = System.in;

        System.setIn(fips);

        ArgumentCaptor stringArgumentCaptor = ArgumentCaptor.forClass(String.class);

        StaticMain.main(arguments);

        mockedStatic.verify(() -> StaticMain.calculateSum(stringArgumentCaptor.capture()));

        System.setIn(original);
    }
}

// 我们可以为_SimpleMain_类使用稍微不同的策略，因为这里我们通过其他类分发了所有业务逻辑。

// 在这种情况下，我们甚至不需要模拟_SimpleMain_类，因为里面没有其他方法。我们用文件流替换_System.in_，并基于传播到_ByteArrayOutputStream_的控制台输出构建我们的验证：

@Test
public void givenArgumentAsConsoleInput_WhenReadFromSubstitutedFileStream_ThenSuccessfullyCalculate() throws IOException {
    String[] arguments = new String[] { "-i", "CONSOLE" };

    InputStream fips = getClass().getClassLoader().getResourceAsStream("test-input.txt");
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    PrintStream out = new PrintStream(byteArrayOutputStream);

    System.setIn(fips);
    System.setOut(out);

    SimpleMain.main(arguments);

    String consoleOutput = byteArrayOutputStream.toString(Charset.defaultCharset());
    assertTrue(consoleOutput.contains("Calculated sum: 10"));

    fips.close();
    out.close();
}

## 6. 结论

在本文中，我们探讨了几种main方法设计及其相应的测试方法。我们涵盖了静态和void方法的测试，处理参数和更改默认系统流。

完整的示例可以在GitHub上找到。
```

OK