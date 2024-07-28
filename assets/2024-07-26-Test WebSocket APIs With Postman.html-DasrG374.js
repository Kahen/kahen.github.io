import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as s}from"./app-D4B8YWfq.js";const a={},i=s(`<h1 id="使用postman测试websocket-api" tabindex="-1"><a class="header-anchor" href="#使用postman测试websocket-api"><span>使用Postman测试WebSocket API</span></a></h1><p>在本文中，我们将创建一个带有WebSocket的应用程序，并使用Postman进行测试。</p><h2 id="_2-java-websockets" tabindex="-1"><a class="header-anchor" href="#_2-java-websockets"><span>2. Java WebSockets</span></a></h2><p><strong>WebSocket是在Web浏览器和服务器之间建立的双向、全双工、持久的连接</strong>。一旦WebSocket连接建立，连接就会保持开放状态，直到客户端或服务器决定关闭此连接。</p><p>WebSocket协议是我们应用程序处理实时消息的一种方式。最常见的替代方案是长轮询和服务器发送的事件。每种解决方案都有其优缺点。</p><p>在Spring中使用WebSocket的一种方式是使用STOMP子协议。<strong>然而，在本文中，我们将使用原始WebSocket，因为到目前为止，Postman中尚不支持STOMP。</strong></p><h2 id="_3-postman设置" tabindex="-1"><a class="header-anchor" href="#_3-postman设置"><span>3. Postman设置</span></a></h2><p>Postman是一个用于构建和使用API的平台。使用Postman时，我们不需要编写HTTP客户端基础设施代码，只是为了测试。相反，我们创建称为集合的测试套件，并让Postman与我们的API进行交互。</p><h2 id="_4-使用websocket的应用程序" tabindex="-1"><a class="header-anchor" href="#_4-使用websocket的应用程序"><span>4. 使用WebSocket的应用程序</span></a></h2><p>我们将构建一个简单的应用程序。我们应用程序的工作流程将是：</p><ul><li>服务器向客户端发送一次性消息</li><li>它向客户端发送定期消息</li><li>收到客户端的消息后，将其记录并发送回客户端</li><li>客户端向服务器发送不定期消息</li><li>客户端接收来自服务器的消息并记录它们</li></ul><p>工作流程图如下：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/09/p1.svg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_5-spring-websocket" tabindex="-1"><a class="header-anchor" href="#_5-spring-websocket"><span>5. Spring WebSocket</span></a></h2><p>我们的服务器由两部分组成。<strong>Spring WebSocket事件处理器和Spring WebSocket配置</strong>。我们将分别讨论它们：</p><h3 id="_5-1-spring-websocket配置" tabindex="-1"><a class="header-anchor" href="#_5-1-spring-websocket配置"><span>5.1. Spring WebSocket配置</span></a></h3><p>我们可以通过添加_@EnableWebSocket_注解来在Spring服务器中启用WebSocket支持。</p><p><strong>在同一配置中，我们还将注册实现的WebSocket处理器用于WebSocket端点：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Configuration
@EnableWebSocket
public class ServerWebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler(), &quot;/websocket&quot;);
    }

    @Bean
    public WebSocketHandler webSocketHandler() {
        return new ServerWebSocketHandler();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-spring-websocket处理器" tabindex="-1"><a class="header-anchor" href="#_5-2-spring-websocket处理器"><span>5.2. Spring WebSocket处理器</span></a></h3><p>WebSocket处理器类扩展了_TextWebSocketHandler_。<strong>此处理器使用_handleTextMessage_回调方法从客户端接收消息</strong>。_sendMessage_方法向客户端回送消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Override
public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    String request = message.getPayload();
    logger.info(&quot;Server received: {}&quot;, request);

    String response = String.format(&quot;response from server to &#39;%s&#39;&quot;, HtmlUtils.htmlEscape(request));
    logger.info(&quot;Server sends: {}&quot;, response);
    session.sendMessage(new TextMessage(response));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_@Scheduled_方法使用相同的_sendMessage_方法向活跃的客户端广播定期消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Scheduled(fixedRate = 10000)
void sendPeriodicMessages() throws IOException {
    for (WebSocketSession session : sessions) {
        if (session.isOpen()) {
            String broadcast = &quot;server periodic message &quot; + LocalTime.now();
            logger.info(&quot;Server sends: {}&quot;, broadcast);
            session.sendMessage(new TextMessage(broadcast));
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将用于测试的端点将是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ws://localhost:8080/websocket
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_6-使用postman进行测试" tabindex="-1"><a class="header-anchor" href="#_6-使用postman进行测试"><span>6. 使用Postman进行测试</span></a></h2><p>现在我们的端点已经准备好了，我们可以使用Postman进行测试。<strong>要测试WebSocket，我们必须拥有8.5.0或更高版本。</strong></p><p>在开始使用Postman的过程之前，我们将运行我们的服务器。现在让我们继续。</p><p>首先，启动Postman应用程序。一旦启动，我们可以继续。</p><p>从UI加载后选择新建：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/09/postman_ws1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>将打开一个新的弹出窗口。<strong>从那里</strong> <strong>选择WebSocket请求：</strong></p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/09/postman_ws2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><strong>我们将</strong> <strong>测试原始WebSocket请求</strong>。屏幕应该看起来像这样：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/09/postman_ws3.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>现在让我们添加我们的_URL。按下连接按钮并测试连接：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/09/postman_ws_4.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>所以，连接工作正常。正如我们从控制台看到的，我们正在从服务器接收响应。现在让我们尝试发送消息，服务器将响应回来：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/09/postman_ws5.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>测试完成后，我们可以通过点击断开连接按钮来简单地断开连接。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们创建了一个简单的应用程序来测试与WebSocket的连接，并使用Postman进行了测试。</p><p>最后，相关代码可以在GitHub上找到。</p>`,44),o=[i];function r(c,l){return n(),t("div",null,o)}const g=e(a,[["render",r],["__file","2024-07-26-Test WebSocket APIs With Postman.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-26/2024-07-26-Test%20WebSocket%20APIs%20With%20Postman.html","title":"使用Postman测试WebSocket API","lang":"zh-CN","frontmatter":{"date":"2021-09-01T00:00:00.000Z","category":["Web Development"],"tag":["Postman","WebSocket"],"head":[["meta",{"name":"keywords","content":"WebSocket, Postman, API Testing"}],["meta",{"name":"description","content":"Learn how to test WebSocket APIs using Postman, an API platform for building and testing APIs."}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-26/2024-07-26-Test%20WebSocket%20APIs%20With%20Postman.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Postman测试WebSocket API"}],["meta",{"property":"og:description","content":"使用Postman测试WebSocket API 在本文中，我们将创建一个带有WebSocket的应用程序，并使用Postman进行测试。 2. Java WebSockets WebSocket是在Web浏览器和服务器之间建立的双向、全双工、持久的连接。一旦WebSocket连接建立，连接就会保持开放状态，直到客户端或服务器决定关闭此连接。 WebS..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2021/09/p1.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-26T12:21:14.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Postman"}],["meta",{"property":"article:tag","content":"WebSocket"}],["meta",{"property":"article:published_time","content":"2021-09-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-26T12:21:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Postman测试WebSocket API\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2021/09/p1.svg\\",\\"https://www.baeldung.com/wp-content/uploads/2021/09/postman_ws1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/09/postman_ws2.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/09/postman_ws3.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/09/postman_ws_4.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/09/postman_ws5.png\\"],\\"datePublished\\":\\"2021-09-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-26T12:21:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Postman测试WebSocket API 在本文中，我们将创建一个带有WebSocket的应用程序，并使用Postman进行测试。 2. Java WebSockets WebSocket是在Web浏览器和服务器之间建立的双向、全双工、持久的连接。一旦WebSocket连接建立，连接就会保持开放状态，直到客户端或服务器决定关闭此连接。 WebS..."},"headers":[{"level":2,"title":"2. Java WebSockets","slug":"_2-java-websockets","link":"#_2-java-websockets","children":[]},{"level":2,"title":"3. Postman设置","slug":"_3-postman设置","link":"#_3-postman设置","children":[]},{"level":2,"title":"4. 使用WebSocket的应用程序","slug":"_4-使用websocket的应用程序","link":"#_4-使用websocket的应用程序","children":[]},{"level":2,"title":"5. Spring WebSocket","slug":"_5-spring-websocket","link":"#_5-spring-websocket","children":[{"level":3,"title":"5.1. Spring WebSocket配置","slug":"_5-1-spring-websocket配置","link":"#_5-1-spring-websocket配置","children":[]},{"level":3,"title":"5.2. Spring WebSocket处理器","slug":"_5-2-spring-websocket处理器","link":"#_5-2-spring-websocket处理器","children":[]}]},{"level":2,"title":"6. 使用Postman进行测试","slug":"_6-使用postman进行测试","link":"#_6-使用postman进行测试","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1721996474000,"updatedTime":1721996474000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.34,"words":1003},"filePathRelative":"posts/baeldung/2024-07-26/2024-07-26-Test WebSocket APIs With Postman.md","localizedDate":"2021年9月1日","excerpt":"\\n<p>在本文中，我们将创建一个带有WebSocket的应用程序，并使用Postman进行测试。</p>\\n<h2>2. Java WebSockets</h2>\\n<p><strong>WebSocket是在Web浏览器和服务器之间建立的双向、全双工、持久的连接</strong>。一旦WebSocket连接建立，连接就会保持开放状态，直到客户端或服务器决定关闭此连接。</p>\\n<p>WebSocket协议是我们应用程序处理实时消息的一种方式。最常见的替代方案是长轮询和服务器发送的事件。每种解决方案都有其优缺点。</p>\\n<p>在Spring中使用WebSocket的一种方式是使用STOMP子协议。<strong>然而，在本文中，我们将使用原始WebSocket，因为到目前为止，Postman中尚不支持STOMP。</strong></p>","autoDesc":true}');export{g as comp,m as data};
