---
date: 2024-06-28
category:
  - Tutorial
  - Language Models
tag:
  - LangChain
  - Java
head:
  - - meta
    - name: keywords
      content: LangChain, Java, language models, framework, applications
---
# LangChain 简介

在本教程中，我们将探讨 LangChain 的细节，这是一个用于开发由语言模型驱动的应用程序的框架。我们将首先收集语言模型的基本概念，这些概念将有助于本教程。

尽管 LangChain 主要在 Python 和 JavaScript/TypeScript 版本中可用，但也有在 Java 中使用 LangChain 的选项。我们将讨论 LangChain 作为框架的构建块，然后继续在 Java 中进行实验。

## 2. 背景

在我们深入探讨为什么需要一个框架来构建由语言模型驱动的应用程序之前，我们首先必须理解什么是语言模型。我们还将涵盖使用语言模型时遇到的一些典型复杂性。

### 2.1. 大型语言模型

语言模型是自然语言的**概率模型**，能够生成一系列单词的概率。大型语言模型（LLM）是一种因其庞大规模而闻名的语言模型。它们是具有可能数十亿参数的人工神经网络。

LLM 通常在大量未标记数据上使用自监督和半监督学习技术进行**预训练**。然后，使用各种技术如微调和提示工程将预训练模型适应特定任务：好的，我将继续翻译剩余部分。

![img](https://www.baeldung.com/wp-content/uploads/2023/10/Large-Language-Model.jpg)

这些 LLM 能够执行几种自然语言处理任务，如语言翻译和内容摘要。它们也**能够生成内容**。因此，它们在像回答问题这样的应用程序中非常有价值。

几乎所有**主要的云服务提供商**都已在其服务产品中包含了大型语言模型。例如，Microsoft Azure 提供像 Llama 2 和 OpenAI GPT-4 这样的 LLM。Amazon Bedrock 提供来自 AI21 Labs、Anthropic、Cohere、Meta 和 Stability AI 的模型。

### 2.2. 提示工程

LLM 是在大量文本数据集上训练的基础模型。因此，它们能够捕捉人类语言固有的语法和语义。但是，它们**必须适应执行我们希望它们执行的特定任务**。

提示工程是适应 LLM 的最快方式之一。它是**一种结构化文本的过程，可以被 LLM 解释和理解**。在这里，我们使用自然语言文本来描述我们期望 LLM 执行的任务：

![img](https://www.baeldung.com/wp-content/uploads/2023/10/Prompt-Engineering.jpg)

我们创建的提示帮助 LLM 执行**上下文学习**，这是暂时的。我们可以使用提示工程来促进 LLM 的安全使用，并构建新的能力，比如通过领域知识和外部工具增强 LLM。

这是一个积极的研究领域，新技术不断涌现。然而，像**思维链提示**这样的技术已经变得相当流行。这里的理念是让 LLM 在给出最终答案之前，将解决问题的过程分解为一系列中间步骤。

### 2.3. 词嵌入

正如我们所看到的，LLM 能够处理大量的自然语言文本。如果我们将自然语言中的单词表示为词嵌入，LLM 的性能将大大提升。这是一种**能够编码单词含义的实数值向量**。

通常，词嵌入是使用像 Tomáš Mikolov 的 Word2vec 或斯坦福大学的 GloVe 这样的算法生成的。GloVe 是一种**无监督学习算法**，它根据语料库中的全局单词-单词共现统计数据进行训练：

![img](https://www.baeldung.com/wp-content/uploads/2023/10/Word-Embedding-Illustration.jpg)

在提示工程中，我们将提示转换为其词嵌入，使模型更好地理解并响应提示。此外，它在**增强我们为模型提供的上下文**方面也非常有帮助，使它们能够提供更具上下文的答案。

例如，我们可以从未处理过的数据集中生成词嵌入，并将它们存储在向量数据库中。进一步，我们可以使用用户提供的输入来对这个向量数据库执行**语义搜索**。然后，我们可以使用搜索结果作为模型的附加上下文。

# 3. LangChain 中的 LLM 技术栈

正如我们已经看到的，**创建有效的提示是成功利用任何应用程序中 LLM 能力的关键元素**。这包括使与语言模型的交互具有上下文感知能力，并能够依赖语言模型进行推理。

为此，我们需要执行**几个任务，比如创建提示模板，调用语言模型，并从多个来源向语言模型提供用户特定数据**。为了简化这些任务，我们需要像 LangChain 这样的框架作为我们 LLM 技术栈的一部分：

![img](https://www.baeldung.com/wp-content/uploads/2023/10/LLM-Tech-Stack-with-LangChain.jpg)

该框架还有助于开发需要**链接多个语言模型**的应用程序，并**能够回忆与语言模型的过去交互信息**。然后，还有更复杂的用例，涉及使用语言模型作为推理引擎。

最后，我们可以**执行日志记录、监控、流媒体和其他维护和故障排除的基本任务**。LLM 技术栈正在迅速发展，以解决许多这些关注点。然而，LangChain 正在迅速成为 LLM 技术栈的宝贵部分。

# 4. Java 中的 LangChain

LangChain 于 **2022 年作为开源项目启动**，并很快通过社区支持获得了动力。它最初由 Harrison Chase 用 Python 开发，并很快成为 AI 领域增长最快的初创公司之一。

2023 年初，紧随 Python 版本之后，**出现了 LangChain 的 JavaScript/TypeScript 版本**。它很快变得非常流行，并开始支持多个 JavaScript 环境，如 Node.js、Web 浏览器、CloudFlare 工作者、Vercel/Next.js、Deno 和 Supabase 边缘函数。

不幸的是，**没有官方的 Java 版本的 LangChain** 可用于 Java/Spring 应用程序。然而，**有一个社区版本的 Java LangChain 叫做 LangChain4j**。它与 Java 8 或更高版本兼容，并支持 Spring Boot 2 和 3。

LangChain 的各种依赖项可在 Maven Central 获得。我们可能需要根据我们使用的功能**在我们的应用程序中添加一个或多个依赖项**：

```
`<dependency>`
    `<groupId>`dev.langchain4j`</groupId>`
    `<artifactId>`langchain4j`</artifactId>`
    `<version>`0.23.0`</version>`
`</dependency>`
```

例如，我们还需要支持与 OpenAI 模型集成、提供嵌入支持以及像 all-MiniLM-L6-v2 这样的句子转换器模型的依赖项，在本教程的后续部分中。

与 LangChain 类似的设计目标，LangChain4j **提供了简单且一致的抽象层**以及其众多实现。它已经支持几个语言模型提供商，如 OpenAI，以及像 Pinecone 这样的嵌入存储提供商。

然而，由于 **LangChain 和 LangChain4j 都在快速发展**，可能 Python 或 JS/TS 版本中支持的功能在 Java 版本中尚未出现。尽管如此，基本概念、总体结构和词汇在很大程度上是相同的。

# 5. LangChain 的构建块

LangChain 为我们的应用程序提供了几个价值主张，这些价值主张作为模块组件提供。模块组件为使用语言模型提供了有用的抽象以及一系列实现。让我们讨论其中的一些模块，并在 Java 中举例说明。

### 5.1. 模型 I/O

当使用任何语言模型时，我们需要与它接口的能力。LangChain 提供了必要的构建块，比如**能够模板化提示并动态选择和管理模型输入**。我们还可以使用输出解析器从模型输出中提取信息：

![img](https://www.baeldung.com/wp-content/uploads/2023/10/LangChain-Model-IO.jpg)

提示模板是为语言模型生成提示的预定义配方，可能包括指令、少量示例和特定上下文：

```
PromptTemplate promptTemplate = PromptTemplate
  .from("Tell me a {{adjective}} joke about {{content}}..");
Map`<String, Object>` variables = new HashMap<>();
variables.put("adjective", "funny");
variables.put("content", "computers");
Prompt prompt = promptTemplate.apply(variables);
```

在这里，我们创建了一个能够接受多个变量的提示模板。变量是我们从用户输入中接收并提供给提示模板的东西。

LangChain 支持与两种类型的模型集成，语言模型和聊天模型。聊天模型也由语言模型支持，但提供聊天功能：

```
ChatLanguageModel model = OpenAiChatModel.builder()
  .apiKey(`<OPENAI_API_KEY>`)
  .modelName(GPT_3_5_TURBO)
  .temperature(0.3)
  .build();
String response = model.generate(prompt.text());
```

在这里，我们使用特定的 OpenAI 模型和相关 API 密钥创建了一个聊天模型。我们可以通过免费注册 OpenAI 获得 API 密钥。温度参数用于控制模型输出的随机性。

最后，来自语言模型的输出可能不足以呈现。LangChain 提供**输出解析器帮助我们结构化语言模型响应** - 例如，将输出中的信息提取为 Java 中的 POJO。

### 5.2. 记忆

通常，利用 LLM 的应用程序具有对话界面。对话中的一个重要方面是能够**引用对话中早期引入的信息**。存储有关过去交互的信息的能力称为记忆：

![img](https://www.baeldung.com/wp-content/uploads/2023/10/LangChain-Memory.jpg)

LangChain 提供了为应用程序添加记忆的关键功能。例如，我们需要从记忆中读取以增强用户输入的能力。然后，我们需要将当前运行的输入和输出写入记忆的能力：

```
ChatMemory chatMemory = TokenWindowChatMemory
  .withMaxTokens(300, new OpenAiTokenizer(GPT_3_5_TURBO));
chatMemory.add(userMessage("Hello, my name is Kumar"));
AiMessage answer = model.generate(chatMemory.messages()).content();
System.out.println(answer.text()); // Hello Kumar! How can I assist you today?
chatMemory.add(answer);
chatMemory.add(userMessage("What is my name?"));
AiMessage answerWithName = model.generate(chatMemory.messages()).content();
System.out.println(answer.text()); // Your name is Kumar.
chatMemory.add(answerWithName);
```

在这里，我们使用 _TokenWindowChatMemory_ 实现了一个固定窗口聊天记忆，允许我们读取和写入我们与语言模型交换的聊天消息。

LangChain 还提供了**更复杂的数据结构和算法，以返回选定的消息**，而不是返回所有内容。例如，它