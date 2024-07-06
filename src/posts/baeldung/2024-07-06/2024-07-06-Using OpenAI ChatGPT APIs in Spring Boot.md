---
date: 2023-04-04
category:
  - Spring Boot
  - OpenAI
tag:
  - ChatGPT
  - API
head:
  - - meta
    - name: ChatGPT API
      content: 学习如何在Spring Boot中调用OpenAI ChatGPT API来生成提示的响应。
---
# 在Spring Boot中使用OpenAI ChatGPT API

在本教程中，我们将学习如何在Spring Boot中调用OpenAI ChatGPT API。我们将创建一个Spring Boot应用程序，通过调用OpenAI ChatGPT API生成对提示的响应。

在开始本教程之前，让我们先了解一下我们将在本教程中使用的OpenAI ChatGPT API。我们将调用创建聊天完成API来生成对提示的响应。

### 2.1. API参数和认证
让我们看看API的必填请求参数：

- **模型** - 这是我们将向其发送请求的模型版本。有几个版本的模型可供选择。我们将使用_gpt-3.5-turbo_模型，这是公开可用的最新模型版本。
- **消息** - 消息是对模型的提示。每个消息需要两个字段：**角色**和**内容**。**角色**字段指定消息的发送者。在请求中将是“**用户**”，在响应中将是“**助手**”。**内容**字段是实际的消息。

为了与API进行认证，我们将生成一个OpenAI API密钥。我们将在调用API时将此密钥设置在_授权_标头中。

一个cURL格式的示例请求如下：

```
$ curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

此外，API接受一些可选参数来修改响应。

在接下来的部分中，我们将专注于一个简单的请求，但让我们看看一些可以帮助调整响应的可选参数：

- **n** - 如果我们想要增加生成的**响应数量**，可以指定这个参数。默认值是1。
- **温度** - 控制响应的**随机性**。默认值是1（最随机）。
- **max_tokens** - 用于**限制响应中的最大token数**。默认值是无限大，这意味着响应将尽可能长，直到模型无法生成为止。通常，将此值设置为一个合理的数字以避免生成非常长的响应并产生高成本是一个好主意。

### 2.2. API响应
API响应将是一个包含一些元数据和_choices_字段的JSON对象。_choices_字段将是一个对象数组。每个对象将有一个_text_字段，其中包含对提示的响应。

_choices_数组中的对象数量将等于请求中可选的_n_参数。如果没有指定_n_参数，_choices_数组将包含一个对象。

这是一个示例响应：

```
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "\n\nHello there, how may I assist you today?"
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 12,
    "total_tokens": 21
  }
}
```

响应中的_usage_字段将包含在提示和响应中使用的token数量。这用于计算API调用的费用。

## 3. 代码示例
我们将创建一个使用OpenAI ChatGPT API的Spring Boot应用程序。为此，我们将创建一个Spring Boot Rest API，它接受一个提示作为请求参数，将其传递给OpenAI ChatGPT API，并返回响应作为响应体。

### 3.1. 依赖项
首先，让我们创建一个Spring Boot项目。我们将需要这个项目的Spring Boot Starter Web依赖项：

```
`<dependency>`
    `<groupId>`org.springframework.boot`</groupId>`
    `<artifactId>`spring-boot-starter-web`</artifactId>`
`</dependency>`
```

### 3.2. DTOs
接下来，让我们创建一个对应于OpenAI ChatGPT API请求参数的DTO：

```
public class ChatRequest {

    private String model;
    private List`<Message>` messages;
    private int n;
    private double temperature;

    public ChatRequest(String model, String prompt) {
        this.model = model;

        this.messages = new ArrayList<>();
        this.messages.add(new Message("user", prompt));
    }

    // getters and setters
}
```

让我们也定义_Message_类：

```
public class Message {

    private String role;
    private String content;

    // constructor, getters and setters
}
```

同样，让我们为响应创建一个DTO：

```
public class ChatResponse {

    private List`<Choice>` choices;

    // constructors, getters and setters

    public static class Choice {

        private int index;
        private Message message;

        // constructors, getters and setters
    }
}
```

### 3.3. 控制器
接下来，让我们创建一个控制器，它将接受一个提示作为请求参数，并作为响应体返回响应：

```
@RestController
public class ChatController {

    @Qualifier("openaiRestTemplate")
    @Autowired
    private RestTemplate restTemplate;

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiUrl;

    @GetMapping("/chat")
    public String chat(@RequestParam String prompt) {
        // 创建一个请求
        ChatRequest request = new ChatRequest(model, prompt);

        // 调用API
        ChatResponse response = restTemplate.postForObject(apiUrl, request, ChatResponse.class);

        if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
            return "No response";
        }

        // 返回第一个响应
        return response.getChoices().get(0).getMessage().getContent();
    }
}
```

让我们看看代码的一些重要部分：

- 我们使用_@Qualifier_注解注入一个_RestTemplate_ bean，我们将在下一部分创建
- 使用_RestTemplate_ bean，我们使用_postForObject()_方法调用了OpenAI ChatGPT API。_postForObject()_方法需要URL、请求对象和响应类作为参数
- 最后，我们读取_响应的选择列表_并返回第一个回复

### 3.4. _RestTemplate_
接下来，让我们定义一个自定义的_RestTemplate_ bean，它将使用OpenAI API密钥进行认证：

```
@Configuration
public class OpenAIRestTemplateConfig {

    @Value("${openai.api.key}")
    private String openaiApiKey;

    @Bean
    @Qualifier("openaiRestTemplate")
    public RestTemplate openaiRestTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getInterceptors().add((request, body, execution) -> {
            request.getHeaders().add("Authorization", "Bearer " + openaiApiKey);
            return execution.execute(request, body);
        });
        return restTemplate;
    }
}
```

在这里，我们向基础_RestTemplate_添加了一个拦截器，并添加了_Authorization_标头。

### 3.5. 属性
最后，让我们在_application.properties_文件中提供API的属性：

```
openai.model=gpt-3.5-turbo
openai.api.url=https://api.openai.com/v1/chat/completions
openai.api.key=your-api-key
```

## 4. 运行应用程序
现在我们可以运行应用程序并在浏览器中测试它：

![img](https://www.baeldung.com/wp-content/uploads/2023/04/chat-gpt-response-1.png)

正如我们所看到的，应用程序生成了对提示的响应。请注意，响应可能会有所不同，因为它是由模型生成的。

## 5. 结论
在本教程中，我们探索了OpenAI ChatGPT API来生成对提示的响应。我们创建了一个调用API生成提示响应的Spring Boot应用程序。

本教程的代码示例可在GitHub上找到。