import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as a,a as n}from"./app-DpYLEM_u.js";const i={},s=n(`<h1 id="java-httpclient-基础认证" tabindex="-1"><a class="header-anchor" href="#java-httpclient-基础认证"><span>Java HttpClient 基础认证</span></a></h1><p>在本简短的教程中，我们将探讨基础认证。我们将看到它是如何工作的，并配置Java <em>HttpClient</em> 使用这种类型的认证。</p><p>基础认证是一种简单的认证方法。客户端可以通过用户名和密码进行认证。这些凭据以特定的格式在_HTTP_授权头部发送。它以_Basic_关键字开头，后跟用户名和密码的_base64_编码值。冒号字符在这里很重要。头部应严格遵循此格式。</p><p>例如，要使用用户名_baeldung_和_HttpClient_密码进行认证，我们必须发送此头部：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Basic YmFlbGR1bmc6SHR0cENsaWVudA==
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以通过使用base64解码器并检查解码结果来验证它。</p><h2 id="_3-java-httpclient" tabindex="-1"><a class="header-anchor" href="#_3-java-httpclient"><span><strong>3. Java HttpClient</strong></span></a></h2><p>Java 9引入了一个新的_HttpClient_作为孵化模块，它在Java 11中被标准化。我们将使用Java 11，所以我们可以从_java.net.http_包中简单地导入它，无需任何额外的配置或依赖。</p><p>让我们首先执行一个不带任何认证的简单GET请求：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>HttpClient client = HttpClient.newHttpClient();

HttpRequest request = HttpRequest.newBuilder()
  .GET()
  .uri(new URI(&quot;https://postman-echo.com/get&quot;))
  .build();

HttpResponse\`&lt;String&gt;\` response = client.send(request, BodyHandlers.ofString());

logger.info(&quot;Status {}&quot;, response.statusCode());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们创建一个_HttpClient_，它可以用来执行HTTP请求。其次，我们使用构建器设计模式创建一个_HttpRequest_。_GET_方法设置请求的HTTP方法。_uri_方法设置我们想要发送请求的URL。</p><p>之后，我们使用我们的客户端发送请求。<em>send_方法的第二个参数是一个响应体处理器。这告诉客户端我们希望将响应体视为_String</em>。</p><p>让我们运行我们的应用程序并检查日志。输出应该像这样：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>INFO com.baeldung.httpclient.basicauthentication.HttpClientBasicAuthentication - Status 200
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们看到HTTP状态是200，这意味着我们的请求成功了。在此之后，让我们看看如何处理认证。</p><h2 id="_4-使用httpclient-authenticator" tabindex="-1"><a class="header-anchor" href="#_4-使用httpclient-authenticator"><span><strong>4. 使用HttpClient Authenticator</strong></span></a></h2><p>在我们配置认证之前，我们需要一个URL来测试它。让我们使用一个需要认证的Postman Echo端点。首先，将之前的URL更改为这个，然后再次运行应用程序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>HttpRequest request = HttpRequest.newBuilder()
  .GET()
  .uri(new URI(&quot;https://postman-echo.com/basic-auth&quot;))
  .build();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们检查日志并查找状态码。这次我们收到了HTTP状态401“未授权”。这个响应代码意味着端点需要认证，但客户端没有发送任何凭据。</p><p>让我们更改我们的客户端，以便它发送所需的认证数据。<strong>我们可以通过配置_HttpClient Builder_来做到这一点，我们的客户端将使用我们设置的凭据。</strong> 这个端点接受用户名“postman”和密码“password”。让我们向我们的客户端添加一个_authenticator_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>HttpClient client = HttpClient.newBuilder()
  .authenticator(new Authenticator() {
      @Override
      protected PasswordAuthentication getPasswordAuthentication() {
          return new PasswordAuthentication(&quot;postman&quot;, &quot;password&quot;.toCharArray());
      }
  })
  .build();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们再次运行应用程序。现在请求成功，我们收到了HTTP状态200。</p><p>我们可以使用另一种方法来访问需要认证的端点。<strong>我们从前面的部分了解到如何构建_Authorization_头部，所以我们可以手动设置它的值。</strong> 尽管这必须针对每个请求完成，而不是通过authenticator一次性设置。</p><p>让我们去掉authenticator，看看如何设置请求头部。我们需要使用base64编码来构建头部值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private static final String getBasicAuthenticationHeader(String username, String password) {
    String valueToEncode = username + &quot;:&quot; + password;
    return &quot;Basic &quot; + Base64.getEncoder().encodeToString(valueToEncode.getBytes());
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们为_Authorization_头部设置这个值并运行应用程序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>HttpRequest request = HttpRequest.newBuilder()
  .GET()
  .uri(new URI(&quot;https://postman-echo.com/basic-auth&quot;))
  .header(&quot;Authorization&quot;, getBasicAuthenticationHeader(&quot;postman&quot;, &quot;password&quot;))
  .build();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的请求成功，这意味着我们正确地构建并设置了头部值。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span><strong>6. 结论</strong></span></a></h2><p>在这个简短的教程中，我们看到了什么是基础认证以及它是如何工作的。我们通过为它设置_authenticator_来使用Java <em>HttpClient</em> 进行基础认证。我们通过手动设置HTTP头部采用了不同的认证方法。</p><p>如往常一样，这些示例的源代码可以在GitHub上找到。继续翻译：</p><p>文章的结尾部分并没有提供完整的图片链接和作者信息，因此我将省略这部分内容。下面是文章的结论部分的翻译：</p><h2 id="_6-结论-1" tabindex="-1"><a class="header-anchor" href="#_6-结论-1"><span><strong>6. 结论</strong></span></a></h2><p>在本简短的教程中，我们了解了基础认证是什么以及它的工作原理。我们展示了如何通过为Java <em>HttpClient</em> 设置一个_authenticator_ 来使用基础认证。我们还学习了一种不同的认证方法，即通过手动设置HTTP头部来进行认证。</p><p>正如通常一样，这些示例的源代码可以在GitHub上找到。</p><p>OK</p>`,36),l=[s];function r(d,c){return a(),e("div",null,l)}const u=t(i,[["render",r],["__file","2024-07-19-Java HttpClient Basic Authentication.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Java%20HttpClient%20Basic%20Authentication.html","title":"Java HttpClient 基础认证","lang":"zh-CN","frontmatter":{"date":"2024-07-20T00:00:00.000Z","category":["Java","HTTP Client"],"tag":["Basic Authentication","HttpClient"],"head":[["meta",{"name":"keywords","content":"Java, HTTP Client, Basic Authentication, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Java%20HttpClient%20Basic%20Authentication.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java HttpClient 基础认证"}],["meta",{"property":"og:description","content":"Java HttpClient 基础认证 在本简短的教程中，我们将探讨基础认证。我们将看到它是如何工作的，并配置Java HttpClient 使用这种类型的认证。 基础认证是一种简单的认证方法。客户端可以通过用户名和密码进行认证。这些凭据以特定的格式在_HTTP_授权头部发送。它以_Basic_关键字开头，后跟用户名和密码的_base64_编码值。冒..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T17:36:15.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Basic Authentication"}],["meta",{"property":"article:tag","content":"HttpClient"}],["meta",{"property":"article:published_time","content":"2024-07-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T17:36:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java HttpClient 基础认证\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T17:36:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java HttpClient 基础认证 在本简短的教程中，我们将探讨基础认证。我们将看到它是如何工作的，并配置Java HttpClient 使用这种类型的认证。 基础认证是一种简单的认证方法。客户端可以通过用户名和密码进行认证。这些凭据以特定的格式在_HTTP_授权头部发送。它以_Basic_关键字开头，后跟用户名和密码的_base64_编码值。冒..."},"headers":[{"level":2,"title":"3. Java HttpClient","slug":"_3-java-httpclient","link":"#_3-java-httpclient","children":[]},{"level":2,"title":"4. 使用HttpClient Authenticator","slug":"_4-使用httpclient-authenticator","link":"#_4-使用httpclient-authenticator","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论-1","link":"#_6-结论-1","children":[]}],"git":{"createdTime":1721410575000,"updatedTime":1721410575000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.98,"words":1193},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Java HttpClient Basic Authentication.md","localizedDate":"2024年7月20日","excerpt":"\\n<p>在本简短的教程中，我们将探讨基础认证。我们将看到它是如何工作的，并配置Java <em>HttpClient</em> 使用这种类型的认证。</p>\\n<p>基础认证是一种简单的认证方法。客户端可以通过用户名和密码进行认证。这些凭据以特定的格式在_HTTP_授权头部发送。它以_Basic_关键字开头，后跟用户名和密码的_base64_编码值。冒号字符在这里很重要。头部应严格遵循此格式。</p>\\n<p>例如，要使用用户名_baeldung_和_HttpClient_密码进行认证，我们必须发送此头部：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>Basic YmFlbGR1bmc6SHR0cENsaWVudA==\\n</code></pre></div>","autoDesc":true}');export{u as comp,v as data};
