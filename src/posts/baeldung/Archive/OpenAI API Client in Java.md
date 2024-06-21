---
date: 2024-06-13
category:
  - Java
  - OpenAI API
tag:
  - Java
  - AI
  - ChatGPT
  - API
---

# Java中的OpenAI API客户端 | Baeldung

## 1. 概述

随着生成性AI的广泛使用，特别是ChatGPT，许多语言都开始提供与OpenAI API交互的库。Java也不例外。

在本教程中，我们将讨论_openai-java_。这是一个客户端，允许我们更方便地与OpenAI API进行通信。然而，在一篇文章中回顾整个库是不可能的。**因此，我们将使用一个实际的例子，构建一个连接到ChatGPT的简单控制台工具。**

## 2. 依赖项

首先，我们必须为我们的项目导入所需的依赖项。我们可以在Maven仓库中找到这些库。**这三个模块专门用于交互的不同方面：**

```xml
\<dependency\>
    \<groupId\>com.theokanning.openai-gpt3-java\</groupId\>
    \<artifactId\>service\</artifactId\>
    \<version\>0.18.2\</version\>
\</dependency\>

\<dependency\>
    \<groupId\>com.theokanning.openai-gpt3-java\</groupId\>
    \<artifactId\>api\</artifactId\>
    \<version\>0.18.2\</version\>
\</dependency\>

\<dependency\>
    \<groupId\>com.theokanning.openai-gpt3-java\</groupId\>
    \<artifactId\>client\</artifactId\>
    \<version\>0.18.2\</version\>
\</dependency\>
```

请注意，名称明确提到了GPT3，但它也适用于GPT4。

## 3. Baeldung Tutor

**在本教程中，我们将构建一个工具，帮助我们根据我们最喜欢的学习平台上的文章和教程来创建我们的课程，或者至少尝试这样做。** 虽然互联网为我们提供了无限的资源，我们可以在线找到几乎所有东西，但整理信息已经变得更加困难。

学习新事物变得越来越令人不知所措，因为很难确定最佳的学习路径并筛选出对我们没有帮助的东西。**为了解决这个问题，我们将构建一个简单的客户端与ChatGPT交互，并要求它在我们庞大的Baeldung文章海洋中指导我们。**

## 4. OpenAI API令牌

第一步是将我们的应用程序连接到OpenAI API。为此，我们需要提供一个可以在网站上生成的OpenAI令牌：

**然而，我们应该小心令牌并避免暴露它。** _openai-java_ 示例使用环境变量来实现这一点。**这可能不是生产环境的最佳解决方案，但对于小型实验效果很好。**
在运行过程中，我们不必为我们的整个机器识别环境变量；我们可以使用IDE中的配置。例如，IntelliJ IDEA提供了一种简单的方法。

**我们可以生成两种类型的令牌：个人和服务账户。** 个人令牌是不言而喻的。服务账户的令牌用于可以连接到OpenAI项目的机器人或应用程序。尽管两者都可以工作，但个人令牌对我们的目的来说已经足够了。

## 5. _OpenAiService_

OpenAI API的入口点是方便地命名为_OpenAiService_的类。**这个类的实例允许我们与API交互并从ChatGPT接收响应。** 要创建它，我们应该传递我们在前一步生成的令牌：

```java
String token = System.getenv("OPENAI_TOKEN");
OpenAiService service = new OpenAiService(token);
```

这是我们旅程的第一步；我们需要识别信息并填充请求。

### 5.1. _ChatCompletionRequest_

我们使用_ChatCompletionRequest_创建一个请求。最低配置要求我们只需提供消息和模型：

```java
ChatCompletionRequest chatCompletionRequest = ChatCompletionRequest
  .builder()
  .model(GPT_3_5_TURBO_0301.getName())
  .messages(messages)
  .build();
```

让我们逐步审查这些参数。

### 5.2. 模型

**选择适合我们需求的模型至关重要，这也会影响成本。** 因此，我们需要做出合理的选择。例如，通常没有必要使用最先进的模型来清理文本或根据一些简单格式解析它。同时，更复杂或重要的任务需要更高级的模型来实现我们的目标。

虽然我们可以直接传递模型名称，但最好使用_ModelEnum_：

```java
@Getter
@AllArgsConstructor
public enum ModelEnum {
    GPT_3_5_TURBO("gpt-3.5-turbo"),
    GPT_3_5_TURBO_0301("gpt-3.5-turbo-0301"),
    GPT_4("gpt-4"),
    GPT_4_0314("gpt-4-0314"),
    GPT_4_32K("gpt-4-32k"),
    GPT_4_32K_0314("gpt-4-32k-0314"),
    GPT_4_1106_preview("gpt-4-1106-preview");
    private String name;
}
```

它不包含所有模型，但在我们的案例中已经足够了。如果我们想使用不同的模型，我们可以将其名称作为_String_提供。

### 5.3. 消息

接下来是我们创建的消息。我们使用_ChatMessage_类来实现它。在我们的案例中，我们只传递角色和消息本身：

```java
List\<ChatMessage\> messages = new ArrayList\<\>();
ChatMessage systemMessage = new ChatMessage(ChatMessageRole.SYSTEM.value(), PROMPT);
messages.add(systemMessage);
```

**有趣的部分是我们发送的是消息集合。** 尽管在通常的聊天中，我们通过逐条发送消息进行交流，但在这种情况下，它更像是电子邮件线程。

系统通过完成工作并在链上附加下一条消息来工作。这样，我们可以保持对话的上下文。**我们可以将这视为一个无状态服务。** 然而，这意味着我们必须传递消息以保持上下文。

**同时，我们可以采取另一种方式并创建一个助手。** 通过这种方法，我们将消息存储在线程中，它不需要来回发送整个历史记录。

**在传递时，消息内容是合理的，但角色的目的不是。** 因为我们一次性发送所有消息，我们需要提供一种方法，根据它们的角色来识别消息和用户之间的关系。

### 5.4. 角色

**正如所提到的，角色对于ChatGPT理解对话的上下文至关重要。** 我们可以使用它们来识别消息背后的参与者。这样，我们可以帮助ChatGPT正确解释消息。**_ChatMessages_支持四种角色：chat、system、assistant和function：**

```java
public enum ChatMessageRole {
    SYSTEM("system"),
    USER("user"),
    ASSISTANT("assistant"),
    FUNCTION("function");

    private final String value;

    ChatMessageRole(final String value) {
        this.value = value;
    }

    public String value() {
        return value;
    }
}
```

**通常，SYSTEM角色指的是初始上下文或提示。** 用户代表ChatGPT的用户，助手是ChatGPT本身。这意味着，从技术上讲，我们也可以以助手的角度写消息。顾名思义，function角色识别助手可以使用的功能。

### 5.5. 令牌

虽然我们之前讨论了API的访问令牌，但在模型和消息的上下文中，它的含义是不同的。**我们可以将令牌视为我们可以处理的信息量以及我们希望在响应中获得的信息量。**

我们可以通过限制响应中的令牌数量来限制模型生成巨大的响应：

```java
ChatCompletionRequest chatCompletionRequest = ChatCompletionRequest
  .builder()
  .model(MODEL)
  .maxTokens(MAX_TOKENS)
  .messages(messages)
  .build();
```

单词和令牌之间没有直接的映射，因为每个模型对它们的处理都略有不同。此参数将答案限制在特定的令牌数量。**使用默认值可能会允许过度响应并增加使用费用。** 因此，明确配置它是一个好习惯。

我们可以在每个响应后添加有关使用令牌的信息：

```java
long usedTokens = result.getUsage().getTotalTokens();
System.out.println("Total tokens used: " + usedTokens);
```

### 5.6. 标记

在前一个示例中，我们显示了响应中使用的令牌数量。虽然这些信息很有价值，但我们通常需要估计请求的大小。为了实现这一点，我们可以使用OpenAI提供的标记器。

为了以更自动化的方式做到这一点，openai-java为我们提供了_TikTokensUtil_，我们可以将模型名称和消息传递给它，并得到令牌数量作为结果。

### 5.7. 选项

我们可以用来配置请求的另一种方法是神秘地命名为_n()_，它控制我们希望为每个请求获得多少响应。**简单来说，我们可以对同一个请求有两个不同的答案。** 默认情况下，我们只有一个。

有时，对于机器人和网站助手来说，这可能很有用。**然而，所有选项的响应都是根据所有选项的令牌计费的。**

### 5.8. 偏见和随机化

我们可以使用一些额外的选项来控制ChatGPT答案的随机性和偏见。例如，_logitBias()_可以使看到或不看到特定令牌的可能性更大。请注意，我们在这里谈论的是令牌，而不是特定的单词。然而，这并不意味着这个令牌不会出现100%。

我们还可以使用_topP()_和_temperature()_来随机化响应。虽然这对某些情况很有用，但我们将不会为我们的学习工具更改默认设置。

## 6. 课程

现在，让我们检查一下我们的工具在实际操作中的表现。我们将有以下整体代码：

```java
public static void main(String[] args) {
    String token = System.getenv("OPENAI_TOKEN");
    OpenAiService service = new OpenAiService(token);

    List\<ChatMessage\> messages = new ArrayList\<\>();
    ChatMessage systemMessage = new ChatMessage(ChatMessageRole.SYSTEM.value(), PROMPT);
    messages.add(systemMessage);

    System.out.print(GREETING);
    Scanner scanner = new Scanner(System.in);
    ChatMessage firstMsg = new ChatMessage(ChatMessageRole.USER.value(), scanner.nextLine());
    messages.add(firstMsg);

    while (true) {
        ChatCompletionRequest chatCompletionRequest = ChatCompletionRequest
          .builder()
          .model(GPT_3_5_TURBO_0301.getName())
          .messages(messages)
          .build();
        ChatCompletionResult result = service.createChatCompletion(chatCompletionRequest);
        long usedTokens = result.getUsage().getTotalTokens();
        ChatMessage response = result.getChoices().get(0).getMessage();

        messages.add(response);

        System.out.println(response.getContent());
        System.out.println("Total tokens used: " + usedTokens);
        System.out.print("Anything else?\n");
        String nextLine = scanner.nextLine();
        if (nextLine.equalsIgnoreCase("exit")) {
            System.exit(0);
        }
        messages.add(new ChatMessage(ChatMessageRole.USER.value(), nextLine));
    }
}

```

如果运行它，我们可以通过控制台与它进行交互：

```shell
Hello!
What do you want to learn?
```

作为响应，我们可以写我们感兴趣的主题：

```shell
$ I would like to learn about binary trees.
```

正如预期的那样，工具将为我们提供一些文章，我们可以使用它们来学习主题：

```shell
Great! Here's a suggested order for Baeldung's articles on binary trees:

1. Introduction to Binary Trees: https://www.baeldung.com/java-binary-tree-intro
2. Implementing a Binary Tree in Java: https://www.baeldung.com/java-binary-tree
3. Depth First Traversal of Binary Tree: https://www.baeldung.com/java-depth-first-binary-tree-traversal
4. Breadth First Traversal of Binary Tree: https://www.baeldung.com/java-breadth-first-binary-tree-traversal
5. Finding the Maximum Element in a Binary Tree: https://www.baeldung.com/java-binary-tree-maximum-element
6. Binary Search Trees in Java: https://www.baeldung.com/java-binary-search-tree
7. Deleting from a Binary Search Tree: https://www.baeldung.com/java-binary-search-tree-delete

I hope this helps you out!
Total tokens used: 288
Anything else?
```

通过这种方式，我们通过创建课程解决了学习新事物的问题。**然而，并非一切都那么美好；问题是只有一个文章是真实的。** 大部分情况下，ChatGPT列出了不存在的文章和适当的链接。虽然名称和链接听起来合理，但它们不会带我们去任何地方。

这是任何AI工具的一个关键方面。**生成模型很难检查信息的有效性。** 由于它们基于预测和选择最合适的下一个单词，可能很难验证信息。**我们不能完全依赖生成模型的信息。**

## **7** **. 结论**

AI工具很棒，可以帮助我们改进应用程序和自动化日常琐事，从处理电子邮件和创建购物清单到优化教育。Java提供了几种与OpenAI API交互的方式，_openai-java_就是这样一个库。

**然而，重要的是要记住，尽管生成模型相当有说服力，但它们在验证信息是否真实方面存在困难。** 因此，我们的责任是重新检查关键信息，或者提供足够的信息给模型，以便它能够给我们提供有效的答案。

像往常一样，本教程的所有代码都可以在GitHub上找到。

OK
