---
date: 2022-04-01
category:
  - Java
  - 编程
tag:
  - Java
  - 用户输入
  - 输入处理
head:
  - - meta
    - name: keywords
      content: Java, 用户输入, 多行输入, 条件判断
---
# Java中读取用户输入直到满足条件

当我们编写Java应用程序以接受用户输入时，可能有两种变体：单行输入和多行输入。在单行输入的情况下，处理起来相当直接。我们读取输入直到看到行结束。然而，我们需要以不同的方式管理多行用户输入。

在本教程中，我们将讨论如何在Java中处理多行用户输入。

## 2. 解决问题的思路

在Java中，我们可以使用_Scanner_类从用户输入中读取数据。因此，从用户输入中读取数据对我们来说并不是一个挑战。但是，如果我们允许用户输入多行数据，我们应该知道何时用户已经给出了我们应该接受的所有数据。换句话说，我们需要一个事件来知道何时我们应该停止从用户输入中读取。

一个常用的方法是**检查用户发送的数据。如果数据符合一个定义的条件，我们就停止读取输入数据。**在实践中，这个条件可以根据需求而变化。

解决这个问题的一个想法是编写一个无限循环来持续逐行读取用户输入。在循环中，我们检查用户发送的每一行。一旦条件满足，我们就中断无限循环：

```
while (true) {
    String line = ... //获取一行输入
    if (matchTheCondition(line)) {
        break;
    }
    ... 保存或使用输入数据 ...
}
```

接下来，让我们创建一个方法来实现我们的想法。

## 3. 使用无限循环解决问题

为了简单起见，**在本教程中，一旦我们的应用程序接收到字符串“ _bye_”（不区分大小写），我们就停止读取输入**。

因此，根据我们之前讨论的想法，我们可以创建一个方法来解决问题：

```
public static List``````<String>`````` readUserInput() {
    List``````<String>`````` userData = new ArrayList``````<String>``````();
    System.out.println("Please enter your data below: (send 'bye' to exit)");
    Scanner input = new Scanner(System.in);
    while (true) {
        String line = input.nextLine();
        if ("bye".equalsIgnoreCase(line)) {
            break;
        }
        userData.add(line);
    }
    return userData;
}
```

正如上面的代码所示，_readUserInput_方法从_System.in_读取用户输入，并将数据存储在_userData List_中。

一旦我们从用户那里接收到_“bye”_，我们就中断无限_while_循环。换句话说，我们停止读取用户输入并返回_userData_以供进一步处理。

接下来，让我们在_main_方法中调用_readUserInput_方法：

```
public static void main(String[] args) {
    List``````<String>`````` userData = readUserInput();
    System.out.printf("User Input Data:\n%s", String.join("\n", userData));
}
```

正如我们在_main_方法中看到的，调用_readUserInput_后，我们打印出接收到的用户输入数据。

现在，让我们启动应用程序，看看它是否按预期工作。

当应用程序启动时，它会提示我们输入：

```
Please enter your data below: (send 'bye' to exit)
```

那么，让我们发送一些文本，并在最后发送“ _bye_”：

```
Hello there,
Today is 19. Mar. 2022.
Have a nice day!
bye
```

在我们输入“ _bye_”并按_Enter_后，应用程序输出我们收集到的用户输入数据并退出：

```
User Input Data:
Hello there,
Today is 19. Mar. 2022.
Have a nice day!
```

正如我们所看到的，方法按预期工作。

## 4. 对解决方案进行单元测试

我们已经解决了问题并手动测试了它。然而，随着时间的推移，我们可能需要根据新的要求调整方法。因此，如果我们能够自动测试方法就好了。

编写_readUserInput_方法的单元测试与常规测试有所不同。这是因为**当_readUserInput_方法被调用时，应用程序被阻塞并等待用户输入**。

接下来，让我们先看看测试方法，然后解释问题是如何解决的：

```
@Test
public void givenDataInSystemIn_whenCallingReadUserInputMethod_thenHaveUserInputData() {
    String[] inputLines = new String[]{
        "The first line.",
        "The second line.",
        "The last line.",
        "bye",
        "anything after 'bye' will be ignored"
    };
    String[] expectedLines = Arrays.copyOf(inputLines, inputLines.length - 2);
    List``````<String>`````` expected = Arrays.stream(expectedLines).collect(Collectors.toList());

    InputStream stdin = System.in;
    try {
        System.setIn(new ByteArrayInputStream(String.join("\n", inputLines).getBytes()));
        List``````<String>`````` actual = UserInputHandler.readUserInput();
        assertThat(actual).isEqualTo(expected);
    } finally {
        System.setIn(stdin);
    }
}
```

现在，让我们快速浏览一下方法并理解它的工作原理。

在最开始，我们创建了一个_String_数组_inputLines_来保存我们想要用作用户输入的行。然后，我们初始化了_expected_ _List_，包含预期的数据。

接下来，棘手的部分来了。在我们备份当前_System.in_到_stdin_变量之后，我们通过调用_System.setIn_方法重新分配了系统标准输入。

在这种情况下，**我们想使用_inputLines_数组来模拟用户输入**。

因此，我们将数组转换为_InputStream_，这种情况下是一个_ByteArrayInputStream_对象，并重新分配_InputStream_对象作为系统标准输入。

然后，我们可以调用目标方法并测试结果是否符合预期。

最后，**我们不应该忘记将原始的_stdin_对象恢复为系统标准输入**。因此，我们在_finally_块中放置_System.setIn(stdin);_，以确保无论如何都会执行。

如果我们运行测试方法，它将在没有任何手动干预的情况下通过。

## 5. 结论

在本文中，我们探讨了如何编写一个Java方法来读取用户输入，直到满足条件。

两个关键技术是：
- 使用标准Java API中的_Scanner_类来读取用户输入
- 在无限循环中检查每一行输入；如果条件满足，就中断循环

此外，我们讨论了如何编写测试方法来自动测试我们的解决方案。

如常，本教程中使用的源代码可在GitHub上获得。