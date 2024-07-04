import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,b as e,t,d as i,a,o as r}from"./app-BOJj4F50.js";const d={},p=a('<h1 id="spring-ai-简介-baeldung" tabindex="-1"><a class="header-anchor" href="#spring-ai-简介-baeldung"><span>Spring AI 简介 | Baeldung</span></a></h1><h2 id="_1-概览" tabindex="-1"><a class="header-anchor" href="#_1-概览"><span>1. 概览</span></a></h2><p>Spring 框架通过 Spring AI 项目正式启用了 AI 生成式提示的强大能力。在本教程中，我们将提供 Spring Boot 应用程序中生成式 AI 集成的全面介绍，并熟悉基本的 AI 概念。</p><p>我们还将了解 Spring AI 如何与模型交互，并创建一个应用程序来展示其能力。</p><h2 id="_2-spring-ai-的主要概念" tabindex="-1"><a class="header-anchor" href="#_2-spring-ai-的主要概念"><span>2. Spring AI 的主要概念</span></a></h2><p>在我们开始之前，让我们回顾一些关键的领域术语和概念。</p><p>Spring AI 最初专注于设计用于处理语言输入并生成语言输出的模型。项目背后的理念是为开发人员提供一个抽象接口，这是将生成式 AI API 作为独立组件集成到应用程序中的基础。</p><p>其中一个抽象是 <em>AiClient</em> 接口，它有两个基本实现，OpenAI 和 Azure OpenAI：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public interface AiClient {\n    default String generate(String message);\n    AiResponse generate(Prompt prompt);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>AiClient</em> 提供了两种生成功能的选择。简化的 <em>generate(String message)</em> 使用 <em>String</em> 作为输入和输出，可以避免额外的 <em>Prompt</em> 和 <em>AiResponse</em> 类的复杂性。</p><p>现在让我们更仔细地看看它们的区别。</p><h3 id="_2-1-高级的-prompt-和-airesponse" tabindex="-1"><a class="header-anchor" href="#_2-1-高级的-prompt-和-airesponse"><span>2.1. 高级的 <em>Prompt</em> 和 <em>AiResponse</em></span></a></h3><p>在 AI 领域，提示是提供给 AI 的文本消息。它包括上下文和问题，该模型用于生成答案。</p><p><strong>从 Spring AI 项目的角度来看，<em>Prompt</em> 是一个参数化的 <em>Message</em> 列表：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Prompt {\n    private final List`&lt;Message&gt;` messages;\n    // 构造函数和实用方法\n}\n\npublic interface Message {\n    String getContent();\n    Map```&lt;String, Object&gt;``` getProperties();\n    MessageType getMessageType();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><em>Prompt</em> 使开发人员能够更控制文本输入。</strong> 一个好例子是提示模板，它们由预定义的文本和一组占位符构成。然后我们可以将它们与传递给 <em>Message</em> 构造函数的 <em>Map<code>&lt;String, Object&gt;</code></em> 值一起填充：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Tell me a {adjective} joke about {content}.\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>Message</em> 接口还持有 AI 模型可以处理的消息类别的高级信息。例如，OpenAI 实现区分对话角色，有效地由 <em>MessageType</em> 映射。在其他模型中，它可能反映消息格式或一些其他自定义属性。有关更多详细信息，请参阅官方文档：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class AiResponse {\n    private final List`&lt;Generation&gt;` generations;\n    // getter 和 setter\n}\n\npublic class Generation {\n    private final String text;\n    private Map```&lt;String, Object&gt;``` info;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>AiResponse</em> 由 <em>Generation</em> 对象列表组成，每个对象都包含相应提示的输出。此外，<em>Generation</em> 对象提供了 AI 响应的元数据信息。</p><p>然而，尽管 Spring AI 项目仍处于测试阶段，并非所有功能都已完成和记录。我们可以通过 GitHub 存储库上的问题来跟踪进展。</p><h2 id="_3-开始使用-spring-ai-项目" tabindex="-1"><a class="header-anchor" href="#_3-开始使用-spring-ai-项目"><span>3. 开始使用 Spring AI 项目</span></a></h2><p><strong>首先，<em>AiClient</em> 需要 API 密钥才能与 OpenAI 平台进行所有通信。</strong> 为此，我们将在 API 密钥页面上创建一个令牌。</p><p>Spring AI 项目定义了配置属性 <em>spring.ai.openai.api-key</em>。我们可以在 <em>application.yml</em> 文件中设置它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring:\n  ai:\n    openai.api-key: ${OPEN_AI_KEY}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下一步是配置依赖存储库。Spring AI 项目在 Spring Milestone 存储库中提供工件。</p><p>因此，我们需要添加存储库定义：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;repositories&gt;`\n    `&lt;repository&gt;`\n        `&lt;id&gt;`spring-snapshots`&lt;/id&gt;`\n        `&lt;name&gt;`Spring Snapshots`&lt;/name&gt;`\n        `&lt;url&gt;`https://repo.spring.io/snapshot`&lt;/url&gt;`\n        `&lt;releases&gt;`\n            `&lt;enabled&gt;`false`&lt;/enabled&gt;`\n        `&lt;/releases&gt;`\n    `&lt;/repository&gt;`\n`&lt;/repositories&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，我们准备导入 <em>open-ai-spring-boot-starter</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependency&gt;`\n    `&lt;groupId&gt;`org.springframework.experimental.ai`&lt;/groupId&gt;`\n    `&lt;artifactId&gt;`spring-ai-openai-spring-boot-starter`&lt;/artifactId&gt;`\n    `&lt;version&gt;`0.7.1-SNAPSHOT`&lt;/version&gt;`\n`&lt;/dependency&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，Spring AI 项目正在积极发展，因此请检查官方 GitHub 页面以获取最新版本。</p><p>现在让我们将概念付诸实践。</p><h2 id="_4-spring-ai-实践" tabindex="-1"><a class="header-anchor" href="#_4-spring-ai-实践"><span>4. Spring AI 实践</span></a></h2><p>让我们编写一个简单的 REST API 用于演示目的。它将包括两个端点，返回我们想要的任何主题和类型的诗歌：</p>',34),o=e("li",null,[e("em",null,"/ai/cathaiku"),i(" — 将实现基本的 "),e("em",null,"generate()"),i(" 方法，并返回有关猫的俳句的普通字符串值")],-1),m=e("em",null,"PromptTemplate",-1),u=e("em",null,"AiResponse",-1),c=a(`<h3 id="_4-1-在-spring-boot-应用程序中注入-aiclient" tabindex="-1"><a class="header-anchor" href="#_4-1-在-spring-boot-应用程序中注入-aiclient"><span>4.1. 在 Spring Boot 应用程序中注入 <em>AiClient</em></span></a></h3><p>为了保持简单，让我们从猫俳句端点开始。使用 <em>@RestController</em> 注解，我们将设置 <em>PoetryController</em> 并添加 <em>GET</em> 方法映射：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@RestController
@RequestMapping(&quot;ai&quot;)
public class PoetryController {
    private final PoetryService poetryService;

    // 构造函数

    @GetMapping(&quot;cathaiku&quot;)
    public ResponseEntity\`&lt;String&gt;\` generateHaiku(){
        return ResponseEntity.ok(poetryService.getCatHaiku());
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，按照 DDD 概念，服务层将定义所有领域逻辑。我们所要做的就是注入 <em>AiClient</em> 到 <em>PoetryService</em> 中。现在我们可以定义字符串提示，我们将在其中指定我们生成俳句的请求：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Service
public class PoetryServiceImpl implements PoetryService {
    public static final String WRITE_ME_HAIKU_ABOUT_CAT = &quot;&quot;&quot;
        Write me Haiku about cat,
        haiku should start with the word cat obligatory&quot;&quot;&quot;;

    private final AiClient aiClient;

    // 构造函数

    @Override
    public String getCatHaiku() {
        return aiClient.generate(WRITE_ME_HAIKU_ABOUT_CAT);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>端点现在已经建立并准备好接收请求。响应将包含一个普通字符串：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Cat prowls in the night,
Whiskers twitch with keen delight,
Silent hunter&#39;s might.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到目前为止看起来还不错；然而，当前解决方案有一些陷阱。普通字符串的响应首先不是 REST 合约的最佳解决方案。</p><p>此外，总是用相同的旧提示查询 <em>ChatGPT</em> 并没有太多价值。所以我们的下一步是添加参数化值：主题和类型。这时 <em>PromptTemplate</em> 将为我们提供最好的服务。</p><h3 id="_4-2-使用-prompttemplate-进行可配置查询" tabindex="-1"><a class="header-anchor" href="#_4-2-使用-prompttemplate-进行可配置查询"><span>4.2. 使用 <em>PromptTemplate</em> 进行可配置查询</span></a></h3><p>本质上，《PromptTemplate》的工作原理非常类似于 <em>StringBuilder</em> 和字典的组合。与 <em>/cathaiku</em> 端点类似，我们将首先定义提示的基本字符串。不同的是，这次我们将定义占位符，这些占位符将通过它们的名称用实际值填充：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String promptString = &quot;&quot;&quot;
    Write me {genre} poetry about {theme}
    &quot;&quot;&quot;;
PromptTemplate promptTemplate = new PromptTemplate(promptString);
promptTemplate.add(&quot;genre&quot;, genre);
promptTemplate.add(&quot;theme&quot;, theme);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们可能想要标准化端点输出。为此，我们将引入一个简单的记录类 <em>PoetryDto</em>，它将包含诗歌的标题、名称和类型：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public record PoetryDto (String title, String poetry, String genre, String theme){}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进一步的步骤是在 <em>BeanOutputParser</em> 类中注册 <em>PoetryDto</em>；它提供了序列化和反序列化 OpenAI API 输出的功能。</p><p>然后我们将这个解析器提供给 <em>promptTemple</em>，从现在起，我们的消息将被序列化为 DTO 对象。</p><p>最后，我们的生成函数将看起来像这样：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Override
public PoetryDto getPoetryByGenreAndTheme(String genre, String theme) {
    BeanOutputParser\`&lt;PoetryDto&gt;\` poetryDtoBeanOutputParser = new BeanOutputParser&lt;&gt;(PoetryDto.class);

    String promptString = &quot;&quot;&quot;
        Write me {genre} poetry about {theme}
        {format}
    &quot;&quot;&quot;;

    PromptTemplate promptTemplate = new PromptTemplate(promptString);
    promptTemplate.add(&quot;genre&quot;, genre);
    promptTemplate.add(&quot;theme&quot;, theme);
    promptTemplate.add(&quot;format&quot;, poetryDtoBeanOutputParser.getFormat());
    promptTemplate.setOutputParser(poetryDtoBeanOutputParser);

    AiResponse response = aiClient.generate(promptTemplate.create());

    return poetryDtoBeanOutputParser.parse(response.getGeneration().getText());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们的客户端收到的响应看起来好多了，更重要的是，它符合 REST API 标准和最佳实践：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;title&quot;: &quot;Dancing Flames&quot;,
    &quot;poetry&quot;: &quot;In the depths of night, flames dance with grace,
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
So let us gather &#39;round, bask in their warm embrace,
For in the realm of flames, magic finds its place.
In their ethereal dance, we find solace and release,
And in their eternal glow, our spirits find peace.&quot;,
    &quot;genre&quot;: &quot;Liric&quot;,
    &quot;theme&quot;: &quot;Flames&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-错误处理" tabindex="-1"><a class="header-anchor" href="#_5-错误处理"><span>5. 错误处理</span></a></h2><p>Spring AI 项目提供了一个抽象层，用于处理 OpenAPI 错误，使用 <em>OpenAiHttpException</em> 类。<strong>不幸的是，它没有为每种错误类型提供单独的类映射。但是，由于这种抽象，我们可以使用 <em>RestControllerAdvice</em> 在一个处理器中处理所有异常。</strong></p><p>下面的代码使用了 Spring 6 框架的 <em>ProblemDetail</em> 标准。要熟悉它，请查看官方文档：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@RestControllerAdvice
public class ExceptionTranslator extends ResponseEntityExceptionHandler {
    public static final String OPEN_AI_CLIENT_RAISED_EXCEPTION = &quot;Open AI client raised exception&quot;;

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，如果 OpenAPI 响应包含错误，我们将处理它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;type&quot;: &quot;about:blank&quot;,
    &quot;title&quot;: &quot;Open AI client raised exception&quot;,
    &quot;status&quot;: 401,
    &quot;detail&quot;: &quot;Incorrect API key provided: sk-XG6GW***************************************wlmi.
       You can find your API key at https://platform.openai.com/account/api-keys.&quot;,
    &quot;instance&quot;: &quot;/ai/cathaiku&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>官方文档页面上有完整的可能异常状态列表。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们熟悉了 Spring AI 项目及其在 REST API 上下文中的能力。<strong>尽管在本文撰写时，<em>spring-ai-starter</em> 仍在积极开发中，并且以快照版本提供，但它为 Spring Boot 应用程序中的生成式 AI 集成提供了可靠的接口。</strong></p><p>在本文的背景下，我们涵盖了 Spring AI 的基本和高级集成，包括 <em>AiClient</em> 在幕后的工作原理。作为概念验证，我们实现了一个基本的 REST 应用程序来生成诗歌。除了基本的生成端点示例，我们还提供了一个使用高级 Spring AI 功能的示例：<em>PromptTemplate, AiResponse,</em> 和 <em>BeanOutputParser</em>。此外，我们实现了错误处理功能。</p><p>完整的示例可在 GitHub 上找到。 OK</p>`,31);function v(n,g){return r(),l("div",null,[p,e("ul",null,[o,e("li",null,[e("em",null,"/ai/poetry?theme="+t(n.theme)+"&genre="+t(n.genre),1),i(" — 将展示 "),m,i(" 和 "),u,i(" 类的能力")])]),c])}const A=s(d,[["render",v],["__file","2024-06-24-Introduction to Spring AI.html.vue"]]),x=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Introduction%20to%20Spring%20AI.html","title":"Spring AI 简介 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Spring AI","Baeldung"],"tag":["Spring Framework","AI Generative Prompts"],"head":[["meta",{"name":"keywords","content":"Spring AI, Generative AI, Spring Boot, REST API, Baeldung"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Introduction%20to%20Spring%20AI.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring AI 简介 | Baeldung"}],["meta",{"property":"og:description","content":"Spring AI 简介 | Baeldung 1. 概览 Spring 框架通过 Spring AI 项目正式启用了 AI 生成式提示的强大能力。在本教程中，我们将提供 Spring Boot 应用程序中生成式 AI 集成的全面介绍，并熟悉基本的 AI 概念。 我们还将了解 Spring AI 如何与模型交互，并创建一个应用程序来展示其能力。 2. ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T23:30:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Framework"}],["meta",{"property":"article:tag","content":"AI Generative Prompts"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T23:30:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring AI 简介 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T23:30:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring AI 简介 | Baeldung 1. 概览 Spring 框架通过 Spring AI 项目正式启用了 AI 生成式提示的强大能力。在本教程中，我们将提供 Spring Boot 应用程序中生成式 AI 集成的全面介绍，并熟悉基本的 AI 概念。 我们还将了解 Spring AI 如何与模型交互，并创建一个应用程序来展示其能力。 2. ..."},"headers":[{"level":2,"title":"1. 概览","slug":"_1-概览","link":"#_1-概览","children":[]},{"level":2,"title":"2. Spring AI 的主要概念","slug":"_2-spring-ai-的主要概念","link":"#_2-spring-ai-的主要概念","children":[{"level":3,"title":"2.1. 高级的 Prompt 和 AiResponse","slug":"_2-1-高级的-prompt-和-airesponse","link":"#_2-1-高级的-prompt-和-airesponse","children":[]}]},{"level":2,"title":"3. 开始使用 Spring AI 项目","slug":"_3-开始使用-spring-ai-项目","link":"#_3-开始使用-spring-ai-项目","children":[]},{"level":2,"title":"4. Spring AI 实践","slug":"_4-spring-ai-实践","link":"#_4-spring-ai-实践","children":[{"level":3,"title":"4.1. 在 Spring Boot 应用程序中注入 AiClient","slug":"_4-1-在-spring-boot-应用程序中注入-aiclient","link":"#_4-1-在-spring-boot-应用程序中注入-aiclient","children":[]},{"level":3,"title":"4.2. 使用 PromptTemplate 进行可配置查询","slug":"_4-2-使用-prompttemplate-进行可配置查询","link":"#_4-2-使用-prompttemplate-进行可配置查询","children":[]}]},{"level":2,"title":"5. 错误处理","slug":"_5-错误处理","link":"#_5-错误处理","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719271822000,"updatedTime":1719271822000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.35,"words":2204},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Introduction to Spring AI.md","localizedDate":"2024年6月25日","excerpt":"\\n<h2>1. 概览</h2>\\n<p>Spring 框架通过 Spring AI 项目正式启用了 AI 生成式提示的强大能力。在本教程中，我们将提供 Spring Boot 应用程序中生成式 AI 集成的全面介绍，并熟悉基本的 AI 概念。</p>\\n<p>我们还将了解 Spring AI 如何与模型交互，并创建一个应用程序来展示其能力。</p>\\n<h2>2. Spring AI 的主要概念</h2>\\n<p>在我们开始之前，让我们回顾一些关键的领域术语和概念。</p>\\n<p>Spring AI 最初专注于设计用于处理语言输入并生成语言输出的模型。项目背后的理念是为开发人员提供一个抽象接口，这是将生成式 AI API 作为独立组件集成到应用程序中的基础。</p>","autoDesc":true}');export{A as comp,x as data};
