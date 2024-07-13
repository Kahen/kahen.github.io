import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as i}from"./app-DkA39C0B.js";const a={},l=i('<p>根据您提供的网页内容，以下是翻译结果：</p><hr><p>date: 2024-06-25 category:</p><ul><li>Java</li><li>Web Development tag:</li><li>HTTP Request</li><li>Servlet</li><li>HttpServletRequest head:</li><li><ul><li>meta</li><li>name: keywords content: Java, HTTP, Servlet, HttpServletRequest, User-Agent, Web Development</li></ul></li></ul><hr><h1 id="在java中从http请求获取客户端信息" tabindex="-1"><a class="header-anchor" href="#在java中从http请求获取客户端信息"><span>在Java中从HTTP请求获取客户端信息</span></a></h1><p>Web应用程序主要基于请求-响应模型，该模型描述了使用HTTP协议在客户端和Web服务器之间进行数据交换。在服务器端，它接受或拒绝请求，理解发出请求的客户端非常重要。</p><p>在本教程中，我们将学习如何从HTTP请求中捕获客户端信息。</p><h2 id="http请求对象" tabindex="-1"><a class="header-anchor" href="#http请求对象"><span>HTTP请求对象</span></a></h2><p>在了解HTTP请求之前，我们首先应该了解_Servlet_。_Servlet_是Java实现的基础部分，用于扩展Web开发的能力，以便处理HTTP请求并在响应中生成动态内容。</p><p><em>HttpServletRequest_是Java Servlet API中的一个接口，代表客户端发出的HTTP请求。<strong>_HttpServletRequest_对象在捕获有关客户端的重要信息方面非常有用。</strong> HttpServletRequest提供了开箱即用的方法，如_getRemoteAddr()</em>, <em>getRemoteHost()</em>, _getHeader()<em>和_getRemoteUser()</em>，这些方法有助于提取客户端信息。</p><h3 id="_2-1-获取客户端ip地址" tabindex="-1"><a class="header-anchor" href="#_2-1-获取客户端ip地址"><span>2.1 获取客户端IP地址</span></a></h3><p>我们可以使用_getRemoteAddr()_方法获取客户端的IP地址：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String remoteAddr = request.getRemoteAddr(); // 198.167.0.1\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>需要注意的是，此方法检索到的IP地址是服务器看到的IP地址，可能并不总是代表真实的客户端IP地址，这是由于代理服务器、负载均衡器等因素。</p><h3 id="_2-2-获取远程主机" tabindex="-1"><a class="header-anchor" href="#_2-2-获取远程主机"><span>2.2 获取远程主机</span></a></h3><p>我们可以使用_getRemoteHost()_方法获取客户端的主机名：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String remoteHost = request.getRemoteHost(); // baeldung.com\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-3-获取远程用户" tabindex="-1"><a class="header-anchor" href="#_2-3-获取远程用户"><span>2.3 获取远程用户</span></a></h3><p>如果客户端经过身份验证，我们可以使用_getRemoteUser()_方法获取客户端用户名：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String remoteUser = request.getRemoteUser(); // baeldung\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>需要注意的是，如果客户端未经身份验证，那么我们可能会得到_null_。</p><p>我们可以使用_getHeader(headerName)_方法读取客户端传递的头值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String contentType = request.getHeader(&quot;content-type&quot;); // application/json\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>获取客户端信息的一个重要头是_User-Agent_头。</strong> 它包括客户端的软件、系统等信息。一些重要信息可能包括浏览器、操作系统、设备信息、插件、附加组件等。</p><p>下面是一个_User-Agent_字符串的例子：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以使用由_HttpServletRequest._提供的_getHeader(String headerName)_方法读取_User-Agent_头。解析_User-Agent_字符串可能本质上很复杂，但由于其动态性质，有多种编程语言的库可以简化这项任务。对于Java生态系统，_uap-java_是一个流行的选择。</p><p>除了上述方法外，还有其他方法，如_getSessionID()_, <em>getMethod()</em>, _getRequestURL()_等，根据用例可能有所帮助。</p><p>如前一节所讨论的，要解析_User-Agent_，我们可以使用_uap-java_库。为此，我们需要在_pom.xml_文件中添加以下XML片段：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependency&gt;`\n    `&lt;groupId&gt;`com.github.ua-parser`&lt;/groupId&gt;`\n    `&lt;artifactId&gt;`uap-java`&lt;/artifactId&gt;`\n    `&lt;version&gt;`1.5.4`&lt;/version&gt;`\n`&lt;/dependency&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们配置了依赖项，让我们创建一个简单的_AccountServlet_，它作为HTTP端点接受客户端请求：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@WebServlet(name = &quot;AccountServlet&quot;, urlPatterns = &quot;/account&quot;)\npublic class AccountServlet extends HttpServlet {\n    public static final Logger log = LoggerFactory.getLogger(AccountServlet.class);\n\n    @Override\n    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {\n        AccountLogic accountLogic = new AccountLogic();\n        Map`````&lt;String, String&gt;````` clientInfo = accountLogic.getClientInfo(request);\n        log.info(&quot;Request client info: {}, &quot; + clientInfo);\n\n        response.setStatus(HttpServletResponse.SC_OK);\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们可以将请求对象传递给_AccountLogic_，它从用户请求中提取客户端信息。然后，我们可以创建一个_AccountLogic_类，主要包含获取客户端信息的所有逻辑。我们可以使用我们之前讨论的所有常见辅助方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class AccountLogic {\n    public Map`````&lt;String, String&gt;````` getClientInfo(HttpServletRequest request) {\n        String remoteAddr = request.getRemoteAddr();\n        String remoteHost = request.getRemoteHost();\n        String remoteUser = request.getRemoteUser();\n        String contentType = request.getHeader(&quot;content-type&quot;);\n        String userAgent = request.getHeader(&quot;user-agent&quot;);\n\n        Parser uaParser = new Parser();\n        Client client = uaParser.parse(userAgent);\n\n        Map`````&lt;String, String&gt;````` clientInfo = new HashMap`````&lt;String, String&gt;`````();\n        clientInfo.put(&quot;os_family&quot;, client.os.family);\n        clientInfo.put(&quot;device_family&quot;, client.device.family);\n        clientInfo.put(&quot;userAgent_family&quot;, client.userAgent.family);\n        clientInfo.put(&quot;remote_address&quot;, remoteAddr);\n        clientInfo.put(&quot;remote_host&quot;, remoteHost);\n        clientInfo.put(&quot;remote_user&quot;, remoteUser);\n        clientInfo.put(&quot;content_type&quot;, contentType);\n        return clientInfo;\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们准备编写一个简单的单元测试来验证功能：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenMockHttpServletRequestWithHeaders_whenGetClientInfo_thenReturnsUserAGentInfo() {\n    HttpServletRequest request = Mockito.mock(HttpServletRequest.class);\n    when(request.getHeader(&quot;user-agent&quot;)).thenReturn(&quot;Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36, acceptLanguage:en-US,en;q=0.9&quot;);\n    when(request.getHeader(&quot;content-type&quot;)).thenReturn(&quot;application/json&quot;);\n    when(request.getRemoteAddr()).thenReturn(&quot;198.167.0.1&quot;);\n    when(request.getRemoteHost()).thenReturn(&quot;baeldung.com&quot;);\n    when(request.getRemoteUser()).thenReturn(&quot;baeldung&quot;);\n\n    AccountLogic accountLogic = new AccountLogic();\n    Map`````&lt;String, String&gt;````` clientInfo = accountLogic.getClientInfo(request);\n    assertThat(clientInfo.get(&quot;os_family&quot;)).isEqualTo(&quot;Mac OS X&quot;);\n    assertThat(clientInfo.get(&quot;device_family&quot;)).isEqualTo(&quot;Mac&quot;);\n    assertThat(clientInfo.get(&quot;userAgent_family&quot;)).isEqualTo(&quot;Chrome&quot;);\n    assertThat(clientInfo.get(&quot;content_type&quot;)).isEqualTo(&quot;application/json&quot;);\n    assertThat(clientInfo.get(&quot;remote_user&quot;)).isEqualTo(&quot;baeldung&quot;);\n    assertThat(clientInfo.get(&quot;remote_address&quot;)).isEqualTo(&quot;198.167.0.1&quot;);\n    assertThat(clientInfo.get(&quot;remote_host&quot;)).isEqualTo(&quot;baeldung.com&quot;);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们了解了_HttpServletRequest_对象，它提供了有助于捕获请求客户端信息的方法。我们还了解了_User-Agent_头，它提供了诸如浏览器家族、操作系统家族等客户端系统级信息。</p><p>之后，我们还实现了从请求对象捕获客户端信息的逻辑。</p><p>如往常一样，示例代码可在GitHub上找到。 OK</p>',41),s=[l];function r(o,d){return n(),t("div",null,s)}const v=e(a,[["render",r],["__file","2024-06-25-Get Client Information From HTTP Request in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-Get%20Client%20Information%20From%20HTTP%20Request%20in%20Java.html","title":"在Java中从HTTP请求获取客户端信息","lang":"zh-CN","frontmatter":{"description":"根据您提供的网页内容，以下是翻译结果： date: 2024-06-25 category: Java Web Development tag: HTTP Request Servlet HttpServletRequest head: meta name: keywords content: Java, HTTP, Servlet, HttpServ...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-Get%20Client%20Information%20From%20HTTP%20Request%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中从HTTP请求获取客户端信息"}],["meta",{"property":"og:description","content":"根据您提供的网页内容，以下是翻译结果： date: 2024-06-25 category: Java Web Development tag: HTTP Request Servlet HttpServletRequest head: meta name: keywords content: Java, HTTP, Servlet, HttpServ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T10:51:33.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:modified_time","content":"2024-06-25T10:51:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中从HTTP请求获取客户端信息\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-25T10:51:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"HTTP请求对象","slug":"http请求对象","link":"#http请求对象","children":[{"level":3,"title":"2.1 获取客户端IP地址","slug":"_2-1-获取客户端ip地址","link":"#_2-1-获取客户端ip地址","children":[]},{"level":3,"title":"2.2 获取远程主机","slug":"_2-2-获取远程主机","link":"#_2-2-获取远程主机","children":[]},{"level":3,"title":"2.3 获取远程用户","slug":"_2-3-获取远程用户","link":"#_2-3-获取远程用户","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719312693000,"updatedTime":1719312693000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.03,"words":1208},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-Get Client Information From HTTP Request in Java.md","localizedDate":"2024年6月25日","excerpt":"<p>根据您提供的网页内容，以下是翻译结果：</p>\\n<hr>\\n<p>date: 2024-06-25\\ncategory:</p>\\n<ul>\\n<li>Java</li>\\n<li>Web Development\\ntag:</li>\\n<li>HTTP Request</li>\\n<li>Servlet</li>\\n<li>HttpServletRequest\\nhead:</li>\\n<li>\\n<ul>\\n<li>meta</li>\\n<li>name: keywords\\ncontent: Java, HTTP, Servlet, HttpServletRequest, User-Agent, Web Development</li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}');export{v as comp,m as data};
