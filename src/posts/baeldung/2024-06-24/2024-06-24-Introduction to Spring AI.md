---
date: 2024-06-25
category:
  - Spring AI
  - Baeldung
tag:
  - Spring Framework
  - AI Generative Prompts
head:
  - - meta
    - name: keywords
      content: Spring AI, Generative AI, Spring Boot, REST API, Baeldung
---
# Spring AI 简介 | Baeldung

## 1. 概览

Spring 框架通过 Spring AI 项目正式启用了 AI 生成式提示的强大能力。在本教程中，我们将提供 Spring Boot 应用程序中生成式 AI 集成的全面介绍，并熟悉基本的 AI 概念。

我们还将了解 Spring AI 如何与模型交互，并创建一个应用程序来展示其能力。

## 2. Spring AI 的主要概念

在我们开始之前，让我们回顾一些关键的领域术语和概念。

Spring AI 最初专注于设计用于处理语言输入并生成语言输出的模型。项目背后的理念是为开发人员提供一个抽象接口，这是将生成式 AI API 作为独立组件集成到应用程序中的基础。

其中一个抽象是 _AiClient_ 接口，它有两个基本实现，OpenAI 和 Azure OpenAI：

```
public interface AiClient {
    default String generate(String message);
    AiResponse generate(Prompt prompt);
}
```

_AiClient_ 提供了两种生成功能的选择。简化的 _generate(String message)_ 使用 _String_ 作为输入和输出，可以避免额外的 _Prompt_ 和 _AiResponse_ 类的复杂性。

现在让我们更仔细地看看它们的区别。

### 2.1. 高级的 _Prompt_ 和 _AiResponse_

在 AI 领域，提示是提供给 AI 的文本消息。它包括上下文和问题，该模型用于生成答案。

**从 Spring AI 项目的角度来看，_Prompt_ 是一个参数化的 _Message_ 列表：**

```
public class Prompt {
    private final List`<Message>` messages;
    // 构造函数和实用方法
}

public interface Message {
    String getContent();
    Map```<String, Object>``` getProperties();
    MessageType getMessageType();
}
```

**_Prompt_ 使开发人员能够更控制文本输入。** 一个好例子是提示模板，它们由预定义的文本和一组占位符构成。然后我们可以将它们与传递给 _Message_ 构造函数的 _Map```<String, Object>```_ 值一起填充：

```
Tell me a {adjective} joke about {content}.
```

_Message_ 接口还持有 AI 模型可以处理的消息类别的高级信息。例如，OpenAI 实现区分对话角色，有效地由 _MessageType_ 映射。在其他模型中，它可能反映消息格式或一些其他自定义属性。有关更多详细信息，请参阅官方文档：

```
public class AiResponse {
    private final List`<Generation>` generations;
    // getter 和 setter
}

public class Generation {
    private final String text;
    private Map```<String, Object>``` info;
}
```

_AiResponse_ 由 _Generation_ 对象列表组成，每个对象都包含相应提示的输出。此外，_Generation_ 对象提供了 AI 响应的元数据信息。

然而，尽管 Spring AI 项目仍处于测试阶段，并非所有功能都已完成和记录。我们可以通过 GitHub 存储库上的问题来跟踪进展。

## 3. 开始使用 Spring AI 项目

**首先，_AiClient_ 需要 API 密钥才能与 OpenAI 平台进行所有通信。** 为此，我们将在 API 密钥页面上创建一个令牌。

Spring AI 项目定义了配置属性 _spring.ai.openai.api-key_。我们可以在 _application.yml_ 文件中设置它：

```
spring:
  ai:
    openai.api-key: ${OPEN_AI_KEY}
```

下一步是配置依赖存储库。Spring AI 项目在 Spring Milestone 存储库中提供工件。

因此，我们需要添加存储库定义：

```
`<repositories>`
    `<repository>`
        `<id>`spring-snapshots`</id>`
        `<name>`Spring Snapshots`</name>`
        `<url>`https://repo.spring.io/snapshot`</url>`
        `<releases>`
            `<enabled>`false`</enabled>`
        `</releases>`
    `</repository>`
`</repositories>`
```

之后，我们准备导入 _open-ai-spring-boot-starter_：

```
`<dependency>`
    `<groupId>`org.springframework.experimental.ai`</groupId>`
    `<artifactId>`spring-ai-openai-spring-boot-starter`</artifactId>`
    `<version>`0.7.1-SNAPSHOT`</version>`
`</dependency>`
```

请注意，Spring AI 项目正在积极发展，因此请检查官方 GitHub 页面以获取最新版本。

现在让我们将概念付诸实践。

## 4. Spring AI 实践

让我们编写一个简单的 REST API 用于演示目的。它将包括两个端点，返回我们想要的任何主题和类型的诗歌：

- _/ai/cathaiku_ — 将实现基本的 _generate()_ 方法，并返回有关猫的俳句的普通字符串值
- _/ai/poetry?theme={{theme}}&genre={{genre}}_ — 将展示 _PromptTemplate_ 和 _AiResponse_ 类的能力

### 4.1. 在 Spring Boot 应用程序中注入 _AiClient_

为了保持简单，让我们从猫俳句端点开始。使用 _@RestController_ 注解，我们将设置 _PoetryController_ 并添加 _GET_ 方法映射：

```
@RestController
@RequestMapping("ai")
public class PoetryController {
    private final PoetryService poetryService;

    // 构造函数

    @GetMapping("cathaiku")
    public ResponseEntity`<String>` generateHaiku(){
        return ResponseEntity.ok(poetryService.getCatHaiku());
    }
}
```

接下来，按照 DDD 概念，服务层将定义所有领域逻辑。我们所要做的就是注入 _AiClient_ 到 _PoetryService_ 中。现在我们可以定义字符串提示，我们将在其中指定我们生成俳句的请求：

```
@Service
public class PoetryServiceImpl implements PoetryService {
    public static final String WRITE_ME_HAIKU_ABOUT_CAT = """
        Write me Haiku about cat,
        haiku should start with the word cat obligatory""";

    private final AiClient aiClient;

    // 构造函数

    @Override
    public String getCatHaiku() {
        return aiClient.generate(WRITE_ME_HAIKU_ABOUT_CAT);
    }
}
```

端点现在已经建立并准备好接收请求。响应将包含一个普通字符串：

```
Cat prowls in the night,
Whiskers twitch with keen delight,
Silent hunter's might.
```

到目前为止看起来还不错；然而，当前解决方案有一些陷阱。普通字符串的响应首先不是 REST 合约的最佳解决方案。

此外，总是用相同的旧提示查询 _ChatGPT_ 并没有太多价值。所以我们的下一步是添加参数化值：主题和类型。这时 _PromptTemplate_ 将为我们提供最好的服务。

### 4.2. 使用 _PromptTemplate_ 进行可配置查询

本质上，《PromptTemplate》的工作原理非常类似于 _StringBuilder_ 和字典的组合。与 _/cathaiku_ 端点类似，我们将首先定义提示的基本字符串。不同的是，这次我们将定义占位符，这些占位符将通过它们的名称用实际值填充：

```
String promptString = """
    Write me {genre} poetry about {theme}
    """;
PromptTemplate promptTemplate = new PromptTemplate(promptString);
promptTemplate.add("genre", genre);
promptTemplate.add("theme", theme);
```

接下来，我们可能想要标准化端点输出。为此，我们将引入一个简单的记录类 _PoetryDto_，它将包含诗歌的标题、名称和类型：

```
public record PoetryDto (String title, String poetry, String genre, String theme){}
```

进一步的步骤是在 _BeanOutputParser_ 类中注册 _PoetryDto_；它提供了序列化和反序列化 OpenAI API 输出的功能。

然后我们将这个解析器提供给 _promptTemple_，从现在起，我们的消息将被序列化为 DTO 对象。

最后，我们的生成函数将看起来像这样：

```
@Override
public PoetryDto getPoetryByGenreAndTheme(String genre, String theme) {
    BeanOutputParser`<PoetryDto>` poetryDtoBeanOutputParser = new BeanOutputParser<>(PoetryDto.class);

    String promptString = """
        Write me {genre} poetry about {theme}
        {format}
    """;

    PromptTemplate promptTemplate = new PromptTemplate(promptString);
    promptTemplate.add("genre", genre);
    promptTemplate.add("theme", theme);
    promptTemplate.add("format", poetryDtoBeanOutputParser.getFormat());
    promptTemplate.setOutputParser(poetryDtoBeanOutputParser);

    AiResponse response = aiClient.generate(promptTemplate.create());

    return poetryDtoBeanOutputParser.parse(response.getGeneration().getText());
}
```

现在我们的客户端收到的响应看起来好多了，更重要的是，它符合 REST API 标准和最佳实践：

```
{
    "title": "Dancing Flames",
    "poetry": "In the depths of night, flames dance with grace,
       Their golden tongues lick the air with fiery embrace.
       A symphony of warmth, a mesmerizing sight,
       In their flickeringglow, shadows take flight.
Oh, flames so vibrant, so full of life,
Burning with passion, banishing all strife.
They consume with ardor, yet do not destroy,
A paradox of power, a delicate ploy.
They whisper secrets, untold and untamed,
Their radiant hues, a kaleidoscope unnamed.
In their gentle crackling, stories unfold,
Of ancient tales and legends untold.
Flames ignite the heart, awakening desire,
They fuel the soul, setting it on fire.
With every flicker, they kindle a spark,
Guiding us through the darkness, lighting up the dark.
So let us gather 'round, bask in their warm embrace,
For in the realm of flames, magic finds its place.
In their ethereal dance, we find solace and release,
And in their eternal glow, our spirits find peace.",
    "genre": "Liric",
    "theme": "Flames"
}
```

## 5. 错误处理

Spring AI 项目提供了一个抽象层，用于处理 OpenAPI 错误，使用 _OpenAiHttpException_ 类。**不幸的是，它没有为每种错误类型提供单独的类映射。但是，由于这种抽象，我们可以使用 _RestControllerAdvice_ 在一个处理器中处理所有异常。**

下面的代码使用了 Spring 6 框架的 _ProblemDetail_ 标准。要熟悉它，请查看官方文档：

```
@RestControllerAdvice
public class ExceptionTranslator extends ResponseEntityExceptionHandler {
    public static final String OPEN_AI_CLIENT_RAISED_EXCEPTION = "Open AI client raised exception";

    @ExceptionHandler(OpenAiHttpException.class)
    ProblemDetail handleOpenAiHttpException(OpenAiHttpException ex) {
        HttpStatus status = Optional
          .ofNullable(HttpStatus.resolve(ex.statusCode))
          .orElse(HttpStatus.BAD_REQUEST);
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(status, ex.getMessage());
        problemDetail.setTitle(OPEN_AI_CLIENT_RAISED_EXCEPTION);
        return problemDetail;
    }
}
```

现在，如果 OpenAPI 响应包含错误，我们将处理它：

```
{
    "type": "about:blank",
    "title": "Open AI client raised exception",
    "status": 401,
    "detail": "Incorrect API key provided: sk-XG6GW***************************************wlmi.
       You can find your API key at https://platform.openai.com/account/api-keys.",
    "instance": "/ai/cathaiku"
}
```

官方文档页面上有完整的可能异常状态列表。

## 6. 结论

在本文中，我们熟悉了 Spring AI 项目及其在 REST API 上下文中的能力。**尽管在本文撰写时，_spring-ai-starter_ 仍在积极开发中，并且以快照版本提供，但它为 Spring Boot 应用程序中的生成式 AI 集成提供了可靠的接口。**

在本文的背景下，我们涵盖了 Spring AI 的基本和高级集成，包括 _AiClient_ 在幕后的工作原理。作为概念验证，我们实现了一个基本的 REST 应用程序来生成诗歌。除了基本的生成端点示例，我们还提供了一个使用高级 Spring AI 功能的示例：_PromptTemplate, AiResponse,_ 和 _BeanOutputParser_。此外，我们实现了错误处理功能。

完整的示例可在 GitHub 上找到。
OK