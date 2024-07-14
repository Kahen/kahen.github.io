import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a as i}from"./app-B6uZtQDK.js";const s={},a=i(`<h1 id="在spring-boot中使用openai-chatgpt-api" tabindex="-1"><a class="header-anchor" href="#在spring-boot中使用openai-chatgpt-api"><span>在Spring Boot中使用OpenAI ChatGPT API</span></a></h1><p>在本教程中，我们将学习如何在Spring Boot中调用OpenAI ChatGPT API。我们将创建一个Spring Boot应用程序，通过调用OpenAI ChatGPT API生成对提示的响应。</p><p>在开始本教程之前，让我们先了解一下我们将在本教程中使用的OpenAI ChatGPT API。我们将调用创建聊天完成API来生成对提示的响应。</p><h3 id="_2-1-api参数和认证" tabindex="-1"><a class="header-anchor" href="#_2-1-api参数和认证"><span>2.1. API参数和认证</span></a></h3><p>让我们看看API的必填请求参数：</p><ul><li><strong>模型</strong> - 这是我们将向其发送请求的模型版本。有几个版本的模型可供选择。我们将使用_gpt-3.5-turbo_模型，这是公开可用的最新模型版本。</li><li><strong>消息</strong> - 消息是对模型的提示。每个消息需要两个字段：<strong>角色</strong>和<strong>内容</strong>。<strong>角色</strong>字段指定消息的发送者。在请求中将是“<strong>用户</strong>”，在响应中将是“<strong>助手</strong>”。<strong>内容</strong>字段是实际的消息。</li></ul><p>为了与API进行认证，我们将生成一个OpenAI API密钥。我们将在调用API时将此密钥设置在_授权_标头中。</p><p>一个cURL格式的示例请求如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ curl https://api.openai.com/v1/chat/completions \\
  -H &quot;Content-Type: application/json&quot; \\
  -H &quot;Authorization: Bearer $OPENAI_API_KEY&quot; \\
  -d &#39;{
    &quot;model&quot;: &quot;gpt-3.5-turbo&quot;,
    &quot;messages&quot;: [{&quot;role&quot;: &quot;user&quot;, &quot;content&quot;: &quot;Hello!&quot;}]
  }&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，API接受一些可选参数来修改响应。</p><p>在接下来的部分中，我们将专注于一个简单的请求，但让我们看看一些可以帮助调整响应的可选参数：</p><ul><li><strong>n</strong> - 如果我们想要增加生成的<strong>响应数量</strong>，可以指定这个参数。默认值是1。</li><li><strong>温度</strong> - 控制响应的<strong>随机性</strong>。默认值是1（最随机）。</li><li><strong>max_tokens</strong> - 用于<strong>限制响应中的最大token数</strong>。默认值是无限大，这意味着响应将尽可能长，直到模型无法生成为止。通常，将此值设置为一个合理的数字以避免生成非常长的响应并产生高成本是一个好主意。</li></ul><h3 id="_2-2-api响应" tabindex="-1"><a class="header-anchor" href="#_2-2-api响应"><span>2.2. API响应</span></a></h3><p>API响应将是一个包含一些元数据和_choices_字段的JSON对象。_choices_字段将是一个对象数组。每个对象将有一个_text_字段，其中包含对提示的响应。</p><p>_choices_数组中的对象数量将等于请求中可选的_n_参数。如果没有指定_n_参数，_choices_数组将包含一个对象。</p><p>这是一个示例响应：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
  &quot;id&quot;: &quot;chatcmpl-123&quot;,
  &quot;object&quot;: &quot;chat.completion&quot;,
  &quot;created&quot;: 1677652288,
  &quot;choices&quot;: [{
    &quot;index&quot;: 0,
    &quot;message&quot;: {
      &quot;role&quot;: &quot;assistant&quot;,
      &quot;content&quot;: &quot;\\n\\nHello there, how may I assist you today?&quot;
    },
    &quot;finish_reason&quot;: &quot;stop&quot;
  }],
  &quot;usage&quot;: {
    &quot;prompt_tokens&quot;: 9,
    &quot;completion_tokens&quot;: 12,
    &quot;total_tokens&quot;: 21
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>响应中的_usage_字段将包含在提示和响应中使用的token数量。这用于计算API调用的费用。</p><h2 id="_3-代码示例" tabindex="-1"><a class="header-anchor" href="#_3-代码示例"><span>3. 代码示例</span></a></h2><p>我们将创建一个使用OpenAI ChatGPT API的Spring Boot应用程序。为此，我们将创建一个Spring Boot Rest API，它接受一个提示作为请求参数，将其传递给OpenAI ChatGPT API，并返回响应作为响应体。</p><h3 id="_3-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_3-1-依赖项"><span>3.1. 依赖项</span></a></h3><p>首先，让我们创建一个Spring Boot项目。我们将需要这个项目的Spring Boot Starter Web依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`org.springframework.boot\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`spring-boot-starter-web\`&lt;/artifactId&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-dtos" tabindex="-1"><a class="header-anchor" href="#_3-2-dtos"><span>3.2. DTOs</span></a></h3><p>接下来，让我们创建一个对应于OpenAI ChatGPT API请求参数的DTO：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class ChatRequest {

    private String model;
    private List\`&lt;Message&gt;\` messages;
    private int n;
    private double temperature;

    public ChatRequest(String model, String prompt) {
        this.model = model;

        this.messages = new ArrayList&lt;&gt;();
        this.messages.add(new Message(&quot;user&quot;, prompt));
    }

    // getters and setters
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们也定义_Message_类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Message {

    private String role;
    private String content;

    // constructor, getters and setters
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，让我们为响应创建一个DTO：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class ChatResponse {

    private List\`&lt;Choice&gt;\` choices;

    // constructors, getters and setters

    public static class Choice {

        private int index;
        private Message message;

        // constructors, getters and setters
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-控制器" tabindex="-1"><a class="header-anchor" href="#_3-3-控制器"><span>3.3. 控制器</span></a></h3><p>接下来，让我们创建一个控制器，它将接受一个提示作为请求参数，并作为响应体返回响应：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@RestController
public class ChatController {

    @Qualifier(&quot;openaiRestTemplate&quot;)
    @Autowired
    private RestTemplate restTemplate;

    @Value(&quot;\${openai.model}&quot;)
    private String model;

    @Value(&quot;\${openai.api.url}&quot;)
    private String apiUrl;

    @GetMapping(&quot;/chat&quot;)
    public String chat(@RequestParam String prompt) {
        // 创建一个请求
        ChatRequest request = new ChatRequest(model, prompt);

        // 调用API
        ChatResponse response = restTemplate.postForObject(apiUrl, request, ChatResponse.class);

        if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
            return &quot;No response&quot;;
        }

        // 返回第一个响应
        return response.getChoices().get(0).getMessage().getContent();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看代码的一些重要部分：</p><ul><li>我们使用_@Qualifier_注解注入一个_RestTemplate_ bean，我们将在下一部分创建</li><li>使用_RestTemplate_ bean，我们使用_postForObject()_方法调用了OpenAI ChatGPT API。_postForObject()_方法需要URL、请求对象和响应类作为参数</li><li>最后，我们读取_响应的选择列表_并返回第一个回复</li></ul><h3 id="_3-4-resttemplate" tabindex="-1"><a class="header-anchor" href="#_3-4-resttemplate"><span>3.4. <em>RestTemplate</em></span></a></h3><p>接下来，让我们定义一个自定义的_RestTemplate_ bean，它将使用OpenAI API密钥进行认证：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Configuration
public class OpenAIRestTemplateConfig {

    @Value(&quot;\${openai.api.key}&quot;)
    private String openaiApiKey;

    @Bean
    @Qualifier(&quot;openaiRestTemplate&quot;)
    public RestTemplate openaiRestTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getInterceptors().add((request, body, execution) -&gt; {
            request.getHeaders().add(&quot;Authorization&quot;, &quot;Bearer &quot; + openaiApiKey);
            return execution.execute(request, body);
        });
        return restTemplate;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们向基础_RestTemplate_添加了一个拦截器，并添加了_Authorization_标头。</p><h3 id="_3-5-属性" tabindex="-1"><a class="header-anchor" href="#_3-5-属性"><span>3.5. 属性</span></a></h3><p>最后，让我们在_application.properties_文件中提供API的属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>openai.model=gpt-3.5-turbo
openai.api.url=https://api.openai.com/v1/chat/completions
openai.api.key=your-api-key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-运行应用程序" tabindex="-1"><a class="header-anchor" href="#_4-运行应用程序"><span>4. 运行应用程序</span></a></h2><p>现在我们可以运行应用程序并在浏览器中测试它：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/04/chat-gpt-response-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>正如我们所看到的，应用程序生成了对提示的响应。请注意，响应可能会有所不同，因为它是由模型生成的。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们探索了OpenAI ChatGPT API来生成对提示的响应。我们创建了一个调用API生成提示响应的Spring Boot应用程序。</p><p>本教程的代码示例可在GitHub上找到。</p>`,49),l=[a];function r(d,o){return t(),n("div",null,l)}const c=e(s,[["render",r],["__file","2024-07-06-Using OpenAI ChatGPT APIs in Spring Boot.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Using%20OpenAI%20ChatGPT%20APIs%20in%20Spring%20Boot.html","title":"在Spring Boot中使用OpenAI ChatGPT API","lang":"zh-CN","frontmatter":{"date":"2023-04-04T00:00:00.000Z","category":["Spring Boot","OpenAI"],"tag":["ChatGPT","API"],"head":[["meta",{"name":"ChatGPT API","content":"学习如何在Spring Boot中调用OpenAI ChatGPT API来生成提示的响应。"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Using%20OpenAI%20ChatGPT%20APIs%20in%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Spring Boot中使用OpenAI ChatGPT API"}],["meta",{"property":"og:description","content":"在Spring Boot中使用OpenAI ChatGPT API 在本教程中，我们将学习如何在Spring Boot中调用OpenAI ChatGPT API。我们将创建一个Spring Boot应用程序，通过调用OpenAI ChatGPT API生成对提示的响应。 在开始本教程之前，让我们先了解一下我们将在本教程中使用的OpenAI ChatGP..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/04/chat-gpt-response-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T15:57:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ChatGPT"}],["meta",{"property":"article:tag","content":"API"}],["meta",{"property":"article:published_time","content":"2023-04-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T15:57:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Spring Boot中使用OpenAI ChatGPT API\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/04/chat-gpt-response-1.png\\"],\\"datePublished\\":\\"2023-04-04T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T15:57:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Spring Boot中使用OpenAI ChatGPT API 在本教程中，我们将学习如何在Spring Boot中调用OpenAI ChatGPT API。我们将创建一个Spring Boot应用程序，通过调用OpenAI ChatGPT API生成对提示的响应。 在开始本教程之前，让我们先了解一下我们将在本教程中使用的OpenAI ChatGP..."},"headers":[{"level":3,"title":"2.1. API参数和认证","slug":"_2-1-api参数和认证","link":"#_2-1-api参数和认证","children":[]},{"level":3,"title":"2.2. API响应","slug":"_2-2-api响应","link":"#_2-2-api响应","children":[]},{"level":2,"title":"3. 代码示例","slug":"_3-代码示例","link":"#_3-代码示例","children":[{"level":3,"title":"3.1. 依赖项","slug":"_3-1-依赖项","link":"#_3-1-依赖项","children":[]},{"level":3,"title":"3.2. DTOs","slug":"_3-2-dtos","link":"#_3-2-dtos","children":[]},{"level":3,"title":"3.3. 控制器","slug":"_3-3-控制器","link":"#_3-3-控制器","children":[]},{"level":3,"title":"3.4. RestTemplate","slug":"_3-4-resttemplate","link":"#_3-4-resttemplate","children":[]},{"level":3,"title":"3.5. 属性","slug":"_3-5-属性","link":"#_3-5-属性","children":[]}]},{"level":2,"title":"4. 运行应用程序","slug":"_4-运行应用程序","link":"#_4-运行应用程序","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720281456000,"updatedTime":1720281456000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.74,"words":1421},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Using OpenAI ChatGPT APIs in Spring Boot.md","localizedDate":"2023年4月4日","excerpt":"\\n<p>在本教程中，我们将学习如何在Spring Boot中调用OpenAI ChatGPT API。我们将创建一个Spring Boot应用程序，通过调用OpenAI ChatGPT API生成对提示的响应。</p>\\n<p>在开始本教程之前，让我们先了解一下我们将在本教程中使用的OpenAI ChatGPT API。我们将调用创建聊天完成API来生成对提示的响应。</p>\\n<h3>2.1. API参数和认证</h3>\\n<p>让我们看看API的必填请求参数：</p>\\n<ul>\\n<li><strong>模型</strong> - 这是我们将向其发送请求的模型版本。有几个版本的模型可供选择。我们将使用_gpt-3.5-turbo_模型，这是公开可用的最新模型版本。</li>\\n<li><strong>消息</strong> - 消息是对模型的提示。每个消息需要两个字段：<strong>角色</strong>和<strong>内容</strong>。<strong>角色</strong>字段指定消息的发送者。在请求中将是“<strong>用户</strong>”，在响应中将是“<strong>助手</strong>”。<strong>内容</strong>字段是实际的消息。</li>\\n</ul>","autoDesc":true}');export{c as comp,v as data};
