import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as t,a as n}from"./app-BUAgDejY.js";const l={},r=n(`<h1 id="spring-boot-3-中自定义-webflux-异常" tabindex="-1"><a class="header-anchor" href="#spring-boot-3-中自定义-webflux-异常"><span>Spring Boot 3 中自定义 WebFlux 异常</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将探索 Spring 框架中的不同错误响应格式。我们还将了解如何使用自定义属性引发和处理 RFC7807 的 <em>ProblemDetail</em>，以及如何在 Spring WebFlux 中引发自定义异常。</p><h2 id="_2-spring-boot-3-中的异常响应格式" tabindex="-1"><a class="header-anchor" href="#_2-spring-boot-3-中的异常响应格式"><span>2. Spring Boot 3 中的异常响应格式</span></a></h2><p>让我们了解 Spring Framework 3 默认支持的各种错误响应格式。</p><p>默认情况下，Spring Framework 提供了 <em>DefaultErrorAttributes</em> 类，该类实现了 <em>ErrorAttributes</em> 接口，用于在未处理错误发生时生成错误响应。在默认错误的情况下，系统会生成我们可以更仔细检查的 JSON 响应结构：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;timestamp&quot;: &quot;2023-04-01T00:00:00.000+00:00&quot;,
    &quot;status&quot;: 500,
    &quot;error&quot;: &quot;Internal Server Error&quot;,
    &quot;path&quot;: &quot;/api/example&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然这个错误响应包含了一些关键属性，但在调查问题时可能并不十分有用。幸运的是，我们可以通过在我们的 Spring WebFlux 应用程序中创建 <em>ErrorAttributes</em> 接口的自定义实现来修改这种默认行为。</p><p><strong>从 Spring Framework 6 开始，支持 <em>ProblemDetail</em> 表示 RFC7807 规范。<em>ProblemDetail</em> 包括一些定义错误细节的标准属性，还有一个用于自定义的扩展详情选项</strong>。支持的属性如下：</p><ul><li><em>type</em>（字符串）- 标识问题类型的 URI 引用</li><li><em>title</em>（字符串）- 问题类型的简短摘要</li><li><em>status</em>（数字）- HTTP 状态码</li><li><em>detail</em>（字符串）- 应该包含异常的详细信息。</li><li><em>instance</em>（字符串）- 用于标识问题特定原因的 URI 引用。例如，它可以引用导致问题发生的属性。</li></ul><p>除了上述标准属性外，《ProblemDetail》还包含一个 <em>Map<code>&lt;String, Object&gt;</code></em>，用于添加自定义参数，以提供有关问题的更详细信息。</p><p>让我们看一下带有自定义对象 <em>errors</em> 的示例错误响应结构：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
  &quot;type&quot;: &quot;https://example.com/probs/email-invalid&quot;,
  &quot;title&quot;: &quot;Invalid email address&quot;,
  &quot;detail&quot;: &quot;The email address &#39;john.doe&#39; is invalid.&quot;,
  &quot;status&quot;: 400,
  &quot;timestamp&quot;: &quot;2023-04-07T12:34:56.789Z&quot;,
  &quot;errors&quot;: [
    {
      &quot;code&quot;: &quot;123&quot;,
      &quot;message&quot;: &quot;Error message&quot;,
      &quot;reference&quot;: &quot;https//error/details#123&quot;
    }
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Spring Framework 还提供了一个名为 <em>ErrorResponseException</em> 的基础实现。这个异常封装了一个 <em>ProblemDetail</em> 对象，它生成了有关发生错误的附加信息。我们可以扩展这个异常来自定义和添加属性。</p><h2 id="_3-如何实现-rfc-7807-的-problemdetail-异常" tabindex="-1"><a class="header-anchor" href="#_3-如何实现-rfc-7807-的-problemdetail-异常"><span>3. 如何实现 RFC 7807 的 <em>ProblemDetail</em> 异常</span></a></h2><p>尽管 Spring 6+ / Spring Boot 3+ 应用程序默认支持 <em>ProblemDetail</em> 异常，但我们需要通过以下方式之一启用它。</p><h3 id="_3-1-通过属性文件启用-problemdetail-异常" tabindex="-1"><a class="header-anchor" href="#_3-1-通过属性文件启用-problemdetail-异常"><span>3.1. 通过属性文件启用 <em>ProblemDetail</em> 异常</span></a></h3><p>可以通过添加属性来启用 <em>ProblemDetail</em> 异常：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring:
  mvc:
    problemdetails:
      enabled: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-通过添加异常处理器启用-problemdetail-异常" tabindex="-1"><a class="header-anchor" href="#_3-2-通过添加异常处理器启用-problemdetail-异常"><span>3.2. 通过添加异常处理器启用 <em>ProblemDetail</em> 异常</span></a></h3><p>也可以通过扩展 <em>ResponseEntityExceptionHandler</em> 并添加自定义异常处理器（即使没有任何覆盖）来启用 <em>ProblemDetail</em> 异常：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    //...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将在本文中使用这种方法，因为我们需要添加自定义异常处理器。</p><h3 id="_3-3-实现-problemdetail-异常" tabindex="-1"><a class="header-anchor" href="#_3-3-实现-problemdetail-异常"><span>3.3. 实现 <em>ProblemDetail</em> 异常</span></a></h3><p>让我们通过考虑一个简单的应用程序来检查如何使用自定义属性引发和处理 <em>ProblemDetail</em> 异常，该应用程序提供了一些用于创建和检索 <em>User</em> 信息的端点。</p><p>我们的控制器有一个 <em>GET /v1/users/{userId}</em> 端点，根据提供的 <em>userId</em> 检索用户信息。如果找不到任何记录，代码将抛出一个名为 <em>UserNotFoundException</em> 的简单自定义异常：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@GetMapping(&quot;/v1/users/{userId}&quot;)
public Mono\`&lt;ResponseEntity&lt;User&gt;\`&gt; getUserById(@PathVariable Long userId) {
    return Mono.fromCallable(() -&gt; {
        User user = userMap.get(userId);
        if (user == null) {
            throw new UserNotFoundException(&quot;User not found with ID: &quot; + userId);
        }
        return new ResponseEntity&lt;&gt;(user, HttpStatus.OK);
    });
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的 <em>UserNotFoundException</em> 扩展了 <em>RunTimeException</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String message) {
        super(message);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们有一个扩展了 <em>ResponseEntityExceptionHandler</em> 的 <em>GlobalExceptionHandler</em> 自定义处理器，《ProblemDetail》成为默认的异常格式。为了测试这一点，我们可以尝试使用不支持的 HTTP 方法（例如 POST）访问应用程序，以查看异常格式。</p><p>当抛出 <em>MethodNotAllowedException</em> 时，《ResponseEntityExceptionHandler》将处理异常，并以 <em>ProblemDetail</em> 格式生成响应：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>curl --location --request POST &#39;localhost:8080/v1/users/1&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将得到 <em>ProblemDetail</em> 对象作为响应：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;type&quot;: &quot;about:blank&quot;,
    &quot;title&quot;: &quot;Method Not Allowed&quot;,
    &quot;status&quot;: 405,
    &quot;detail&quot;: &quot;Supported methods: [GET]&quot;,
    &quot;instance&quot;: &quot;/users/1&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-在-spring-webflux-中使用自定义属性扩展-problemdetail-异常" tabindex="-1"><a class="header-anchor" href="#_3-4-在-spring-webflux-中使用自定义属性扩展-problemdetail-异常"><span>3.4. 在 Spring WebFlux 中使用自定义属性扩展 <em>ProblemDetail</em> 异常</span></a></h3><p>让我们通过为 <em>UserNotFoundException</em> 提供一个异常处理器来扩展示例，该处理器向 <em>ProblemDetail</em> 响应中添加了一个自定义对象。</p><p><em>ProblemDetail</em> 对象包含一个 <em>properties</em> 属性，它接受一个 <em>String</em> 作为键，值可以是任何 <em>Object</em>。</p><p>我们将添加一个名为 <em>ErrorDetails</em> 的自定义对象。此对象包含错误代码和消息，以及一个带有有关解决此问题的附加详细信息和说明的错误引用 URL：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@JsonSerialize(using = ErrorDetailsSerializer.class)
public enum ErrorDetails {
    API_USER_NOT_FOUND(123, &quot;User not found&quot;, &quot;http://example.com/123&quot;);
    @Getter
    private Integer errorCode;
    @Getter
    private String errorMessage;
    @Getter
    private String referenceUrl;

    ErrorDetails(Integer errorCode, String errorMessage, String referenceUrl) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.referenceUrl = referenceUrl;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了覆盖 <em>UserNotException</em> 的错误行为，我们需要在 <em>GlobalExceptionHandler</em> 类中提供一个错误处理器。此处理器应设置 <em>ErrorDetails</em> 对象的 <em>API_USER_NOT_FOUND</em> 属性，以及 <em>ProblemDetail</em> 对象提供的任何其他错误详情：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@ExceptionHandler(UserNotFoundException.class)
protected ProblemDetail handleNotFound(RuntimeException ex) {
    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
    problemDetail.setTitle(&quot;User not found&quot;);
    problemDetail.setType(URI.create(&quot;https://example.com/problems/user-not-found&quot;));
    problemDetail.setProperty(&quot;errors&quot;, List.of(ErrorDetails.API_USER_NOT_FOUND));
    return problemDetail;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还需要一个 <em>ErrorDetailsSerializer</em> 和 <em>ProblemDetailSerializer</em> 来自定义响应格式。</p><p><em>ErrorDetailsSerializer</em> 负责使用错误代码、错误消息和引用详细信息格式化我们的自定义错误对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class ErrorDetailsSerializer extends JsonSerializer\`&lt;ErrorDetails&gt;\` {
    @Override
    public void serialize(ErrorDetails value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartObject();
        gen.writeStringField(&quot;code&quot;, value.getErrorCode().toString());
        gen.writeStringField(&quot;message&quot;, value.getErrorMessage());
        gen.writeStringField(&quot;reference&quot;, value.getReferenceUrl());
        gen.writeEndObject();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>ProblemDetailSerializer</em> 负责格式化整体 <em>ProblemDetail</em> 对象以及自定义对象（借助 <em>ErrorDetailsSerializer</em>）：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class ProblemDetailsSerializer extends JsonSerializer\`&lt;ProblemDetail&gt;\` {

    @Override
    public void serialize(ProblemDetail value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartObject();
        gen.writeObjectField(&quot;type&quot;, value.getType());
        gen.writeObjectField(&quot;title&quot;, value.getTitle());
        gen.writeObjectField(&quot;status&quot;, value.getStatus());
        gen.writeObjectField(&quot;detail&quot;, value.getDetail());
        gen.writeObjectField(&quot;instance&quot;, value.getInstance());
        gen.writeObjectField(&quot;errors&quot;, value.getProperties().get(&quot;errors&quot;));
        gen.writeEndObject();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，当我们尝试使用无效的 <em>userId</em> 访问端点时，我们应该收到带有我们自定义属性的错误消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ curl --location &#39;localhost:8080/v1/users/1&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将得到带有自定义属性的 <em>ProblemDetail</em> 对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
  &quot;type&quot;: &quot;https://example.com</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,50),a=[r];function s(d,o){return t(),i("div",null,a)}const c=e(l,[["render",s],["__file","2024-07-05-Custom WebFlux Exceptions in Spring Boot 3.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Custom%20WebFlux%20Exceptions%20in%20Spring%20Boot%203.html","title":"Spring Boot 3 中自定义 WebFlux 异常","lang":"zh-CN","frontmatter":{"date":"2024-07-05T00:00:00.000Z","category":["Spring Boot","WebFlux"],"tag":["异常处理","Spring Framework"],"head":[["meta",{"name":"keywords","content":"Spring Boot, WebFlux, 自定义异常, RFC7807, ProblemDetail, 异常响应格式"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Custom%20WebFlux%20Exceptions%20in%20Spring%20Boot%203.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Boot 3 中自定义 WebFlux 异常"}],["meta",{"property":"og:description","content":"Spring Boot 3 中自定义 WebFlux 异常 1. 引言 在本教程中，我们将探索 Spring 框架中的不同错误响应格式。我们还将了解如何使用自定义属性引发和处理 RFC7807 的 ProblemDetail，以及如何在 Spring WebFlux 中引发自定义异常。 2. Spring Boot 3 中的异常响应格式 让我们了解 S..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T13:57:45.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"异常处理"}],["meta",{"property":"article:tag","content":"Spring Framework"}],["meta",{"property":"article:published_time","content":"2024-07-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T13:57:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot 3 中自定义 WebFlux 异常\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-05T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T13:57:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Boot 3 中自定义 WebFlux 异常 1. 引言 在本教程中，我们将探索 Spring 框架中的不同错误响应格式。我们还将了解如何使用自定义属性引发和处理 RFC7807 的 ProblemDetail，以及如何在 Spring WebFlux 中引发自定义异常。 2. Spring Boot 3 中的异常响应格式 让我们了解 S..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. Spring Boot 3 中的异常响应格式","slug":"_2-spring-boot-3-中的异常响应格式","link":"#_2-spring-boot-3-中的异常响应格式","children":[]},{"level":2,"title":"3. 如何实现 RFC 7807 的 ProblemDetail 异常","slug":"_3-如何实现-rfc-7807-的-problemdetail-异常","link":"#_3-如何实现-rfc-7807-的-problemdetail-异常","children":[{"level":3,"title":"3.1. 通过属性文件启用 ProblemDetail 异常","slug":"_3-1-通过属性文件启用-problemdetail-异常","link":"#_3-1-通过属性文件启用-problemdetail-异常","children":[]},{"level":3,"title":"3.2. 通过添加异常处理器启用 ProblemDetail 异常","slug":"_3-2-通过添加异常处理器启用-problemdetail-异常","link":"#_3-2-通过添加异常处理器启用-problemdetail-异常","children":[]},{"level":3,"title":"3.3. 实现 ProblemDetail 异常","slug":"_3-3-实现-problemdetail-异常","link":"#_3-3-实现-problemdetail-异常","children":[]},{"level":3,"title":"3.4. 在 Spring WebFlux 中使用自定义属性扩展 ProblemDetail 异常","slug":"_3-4-在-spring-webflux-中使用自定义属性扩展-problemdetail-异常","link":"#_3-4-在-spring-webflux-中使用自定义属性扩展-problemdetail-异常","children":[]}]}],"git":{"createdTime":1720187865000,"updatedTime":1720187865000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.03,"words":1509},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Custom WebFlux Exceptions in Spring Boot 3.md","localizedDate":"2024年7月5日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将探索 Spring 框架中的不同错误响应格式。我们还将了解如何使用自定义属性引发和处理 RFC7807 的 <em>ProblemDetail</em>，以及如何在 Spring WebFlux 中引发自定义异常。</p>\\n<h2>2. Spring Boot 3 中的异常响应格式</h2>\\n<p>让我们了解 Spring Framework 3 默认支持的各种错误响应格式。</p>\\n<p>默认情况下，Spring Framework 提供了 <em>DefaultErrorAttributes</em> 类，该类实现了 <em>ErrorAttributes</em> 接口，用于在未处理错误发生时生成错误响应。在默认错误的情况下，系统会生成我们可以更仔细检查的 JSON 响应结构：</p>","autoDesc":true}');export{c as comp,p as data};
