import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a}from"./app-D5kFWV-m.js";const i={},r=a('<h1 id="spring-6中的rsocket接口-baeldung" tabindex="-1"><a class="header-anchor" href="#spring-6中的rsocket接口-baeldung"><span>Spring 6中的RSocket接口 | Baeldung</span></a></h1><p>寻找理想的Linux发行版，用于在云中运行现代Spring应用程序？ <strong>遇见Alpaquita Linux</strong>：轻量级、安全且功能强大，足以处理重负载工作。 这个发行版是<strong>专门为运行Java应用程序设计的</strong>。它基于Alpine构建，并具有显著的增强功能，以在高密度容器环境中表现出色，同时满足企业级安全标准。</p><p>具体来说，容器镜像大小比标准选项<strong>小约30%</strong>，并且它消耗的RAM<strong>少至30%</strong>：</p><p><strong>&gt;&gt; 立即尝试Alpaquita容器。</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将探讨如何在Spring Framework 6中使用RSocket。 随着Spring Framework 6版本中声明式RSocket客户端的引入，使用RSocket变得更加简单。这个特性消除了重复的样板代码的需要，允许开发者更有效和高效地使用RSocket。</p><h2 id="_2-maven依赖" tabindex="-1"><a class="header-anchor" href="#_2-maven依赖"><span>2. Maven依赖</span></a></h2><p>我们首先在首选的IDE中创建一个Spring Boot项目，并将_spring-boot-starter-rsocket_依赖项添加到_pom.xml_文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependency&gt;`\n    `&lt;groupId&gt;`org.springframework.boot`&lt;/groupId&gt;`\n    `&lt;artifactId&gt;`spring-boot-starter-rsocket`&lt;/artifactId&gt;`\n    `&lt;version&gt;`3.1.4`&lt;/version&gt;`\n`&lt;/dependency&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-创建rsocket服务器" tabindex="-1"><a class="header-anchor" href="#_3-创建rsocket服务器"><span>3. 创建RSocket服务器</span></a></h2><p>首先，我们将创建一个使用控制器来管理传入请求的响应器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@MessageMapping(&quot;MyDestination&quot;)\npublic Mono````````&lt;String&gt;```````` message(Mono````````&lt;String&gt;```````` input) {\n    return input.doOnNext(msg -&gt; System.out.println(&quot;请求是:&quot; + msg + &quot;,请求!&quot;))\n      .map(msg -&gt; msg + &quot;,响应!&quot;);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们将在_application.properties_文件中添加以下属性，以使服务器能够通过_MyDestination_在端口_7000_上监听：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.rsocket.server.port=7000\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-客户端代码" tabindex="-1"><a class="header-anchor" href="#_4-客户端代码"><span>4. 客户端代码</span></a></h2><p>现在，我们需要开发客户端代码。为了简单起见，我们将在同一个项目中的不同包中创建客户端代码。实际上，它们必须在唯一的项目中。</p><p>为了继续，让我们创建客户端接口：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public interface MessageClient {\n\n    @RSocketExchange(&quot;MyDestination&quot;)\n    Mono````````&lt;String&gt;```````` sendMessage(Mono````````&lt;String&gt;```````` input);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用我们的客户端接口时，我们使用_@RSocketExchange_来显示RSocket端点。基本上，这只是意味着我们需要一些信息来建立端点路径。我们可以通过在接口级别分配共享路径来做到这一点。这非常简单，并且帮助我们知道我们想要使用哪个端点。</p><h2 id="_5-测试" tabindex="-1"><a class="header-anchor" href="#_5-测试"><span>5. 测试</span></a></h2><p>每个Spring Boot项目都包括一个带有_@SpringBootApplication_注解的类。这个类在项目加载时运行。因此，我们可以使用这个类并添加一些bean来测试一个场景。</p><h3 id="_5-1-创建-rsocketserviceproxyfactory-bean" tabindex="-1"><a class="header-anchor" href="#_5-1-创建-rsocketserviceproxyfactory-bean"><span>5.1. 创建_RSocketServiceProxyFactory_ Bean</span></a></h3><p>首先，我们需要创建一个bean来生成一个_RSocketServiceProxyFactory_。</p><p>这个工厂负责创建RSocket服务接口的代理实例。它处理这些代理的创建，并通过指定服务器将接收传入连接的主机和端口，建立与RSocket服务器的必要连接：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean\npublic RSocketServiceProxyFactory getRSocketServiceProxyFactory(RSocketRequester.Builder requestBuilder) {\n    RSocketRequester requester = requestBuilder.tcp(&quot;localhost&quot;, 7000);\n    return RSocketServiceProxyFactory.builder(requester).build();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-创建消息客户端" tabindex="-1"><a class="header-anchor" href="#_5-2-创建消息客户端"><span>5.2. 创建消息客户端</span></a></h3><p>然后，我们将创建一个_Bean_，负责生成客户端接口：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean\npublic MessageClient getClient(RSocketServiceProxyFactory factory) {\n    return factory.createClient(MessageClient.class);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-创建runner-bean" tabindex="-1"><a class="header-anchor" href="#_5-3-创建runner-bean"><span>5.3. 创建Runner Bean</span></a></h3><p>最后，让我们创建一个使用_MessageClient_实例从服务器发送和接收消息的runner bean：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean\npublic ApplicationRunner runRequestResponseModel(MessageClient client) {\n    return args -&gt; {\n        client.sendMessage(Mono.just(&quot;请求-响应测试 &quot;))\n          .doOnNext(message -&gt; {\n              System.out.println(&quot;响应是 :&quot; + message);\n          })\n          .subscribe();\n    };\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-测试结果" tabindex="-1"><a class="header-anchor" href="#_5-4-测试结果"><span>5.4. 测试结果</span></a></h3><p>当我们通过命令行运行我们的Spring Boot项目时，显示以下结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&gt; Spring Boot响应器：已启动\n&gt; RSocketApplication 在 1.127 秒内启动（进程运行了 1.398）\n&gt; 请求是：请求-响应测试 ,请求!\n&gt; 响应是 :请求-响应测试 ,响应!\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-rsocket交互模型" tabindex="-1"><a class="header-anchor" href="#_6-rsocket交互模型"><span>6. RSocket交互模型</span></a></h2><p>RSocket是一个用于创建快速响应的分布式应用程序的二进制协议。它提供了不同的通信模式，用于在服务器和客户端之间交换数据。</p><p>有了这些交互模型，开发者可以设计满足特定数据流、积压和应用程序行为要求的系统。</p><p>RSocket有四种主要的交互模型可用。这些方法之间的主要区别基于输入和输出的基数。</p><h3 id="_6-1-请求-响应" tabindex="-1"><a class="header-anchor" href="#_6-1-请求-响应"><span>6.1. 请求-响应</span></a></h3><p>在这种方法中，每个请求都会收到一个单一的响应。因此，我们使用基数为一的_Mono_请求，并以相同的基数收到_Mono_响应。</p><p>到目前为止，本文中的所有代码都是基于请求-响应模型的。</p><h3 id="_6-2-请求-流" tabindex="-1"><a class="header-anchor" href="#_6-2-请求-流"><span>6.2. 请求-流</span></a></h3><p>当我们订阅新闻通讯时，我们会定期从服务器接收更新流。当客户端进行初始请求时，服务器会以数据流的形式响应。</p><p>请求可以是_Mono_或_Void_，但响应将始终是_Flux_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@MessageMapping(&quot;Counter&quot;)\npublic Flux````````&lt;String&gt;```````` Counter() {\n    return Flux.range(1, 10)\n      .map(i -&gt; &quot;计数是: &quot; + i);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-火并忘记" tabindex="-1"><a class="header-anchor" href="#_6-3-火并忘记"><span>6.3. 火并忘记</span></a></h3><p>当我们通过邮件发送信件时，我们通常只是把它投入邮箱，并不期望收到回复。类似地，在火并忘记的上下文中，响应可以是_null_或单个_Mono_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@MessageMapping(&quot;Warning&quot;)\npublic Mono`&lt;Void&gt;` Warning(Mono````````&lt;String&gt;```````` error) {\n    error.doOnNext(e -&gt; System.out.println(&quot;警告是 :&quot; + e))\n      .subscribe();\n    return Mono.empty();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-通道" tabindex="-1"><a class="header-anchor" href="#_6-4-通道"><span>6.4. 通道</span></a></h3><p>想象一下，对讲机允许双方同时进行双向通信，就像进行对话一样。这种通信依赖于发送和接收数据_Flux_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@MessageMapping(&quot;channel&quot;)\npublic Flux````````&lt;String&gt;```````` channel(Flux````````&lt;String&gt;```````` input) {\n    return input.doOnNext(i -&gt; {\n          System.out.println(&quot;收到的消息是 : &quot; + i);\n      })\n      .map(m -&gt; m.toUpperCase())\n      .doOnNext(r -&gt; {\n          System.out.println(&quot;响应是 :&quot; + r);\n      });\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们探讨了Spring 6中新的声明式RSocket客户端特性。我们还学习了如何使用_@RSocketExchange_注解。 此外，我们详细了解了如何创建和设置服务代理，以便我们可以轻松安全地使用TCP协议连接到远程端点。 此外，本教程的源代码可在GitHub上找到。由于文章内容较长，我将分两部分进行翻译。以下是第二部分的翻译：</p><h2 id="_7-结论-1" tabindex="-1"><a class="header-anchor" href="#_7-结论-1"><span>7. 结论</span></a></h2><p>在本文中，我们探索了Spring 6中新的声明式RSocket客户端特性。我们还学习了如何使用<code>@RSocketExchange</code>注解。此外，我们详细了解了如何创建和设置服务代理，以便我们可以轻松安全地使用TCP协议连接到远程端点。</p><p>此外，本教程的源代码可在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/custom_avatars/ganji-150x150.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>翻译结束。</p><p>OK。</p>',59),s=[r];function l(o,d){return t(),n("div",null,s)}const u=e(i,[["render",l],["__file","2024-06-29-RSocket Interface in Spring 6.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-RSocket%20Interface%20in%20Spring%206.html","title":"Spring 6中的RSocket接口 | Baeldung","lang":"zh-CN","frontmatter":{"category":["Spring Framework","RSocket"],"tag":["Spring 6","Alpaquita Linux","RSocket Server","RSocket Client"],"head":[["meta",{"name":"keywords","content":"Spring RSocket, Spring Framework 6, RSocket Interaction Models"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-RSocket%20Interface%20in%20Spring%206.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring 6中的RSocket接口 | Baeldung"}],["meta",{"property":"og:description","content":"Spring 6中的RSocket接口 | Baeldung 寻找理想的Linux发行版，用于在云中运行现代Spring应用程序？ 遇见Alpaquita Linux：轻量级、安全且功能强大，足以处理重负载工作。 这个发行版是专门为运行Java应用程序设计的。它基于Alpine构建，并具有显著的增强功能，以在高密度容器环境中表现出色，同时满足企业级安全..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T17:53:26.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring 6"}],["meta",{"property":"article:tag","content":"Alpaquita Linux"}],["meta",{"property":"article:tag","content":"RSocket Server"}],["meta",{"property":"article:tag","content":"RSocket Client"}],["meta",{"property":"article:modified_time","content":"2024-06-29T17:53:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring 6中的RSocket接口 | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://www.baeldung.com/wp-content/uploads/custom_avatars/ganji-150x150.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"dateModified\\":\\"2024-06-29T17:53:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring 6中的RSocket接口 | Baeldung 寻找理想的Linux发行版，用于在云中运行现代Spring应用程序？ 遇见Alpaquita Linux：轻量级、安全且功能强大，足以处理重负载工作。 这个发行版是专门为运行Java应用程序设计的。它基于Alpine构建，并具有显著的增强功能，以在高密度容器环境中表现出色，同时满足企业级安全..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Maven依赖","slug":"_2-maven依赖","link":"#_2-maven依赖","children":[]},{"level":2,"title":"3. 创建RSocket服务器","slug":"_3-创建rsocket服务器","link":"#_3-创建rsocket服务器","children":[]},{"level":2,"title":"4. 客户端代码","slug":"_4-客户端代码","link":"#_4-客户端代码","children":[]},{"level":2,"title":"5. 测试","slug":"_5-测试","link":"#_5-测试","children":[{"level":3,"title":"5.1. 创建_RSocketServiceProxyFactory_ Bean","slug":"_5-1-创建-rsocketserviceproxyfactory-bean","link":"#_5-1-创建-rsocketserviceproxyfactory-bean","children":[]},{"level":3,"title":"5.2. 创建消息客户端","slug":"_5-2-创建消息客户端","link":"#_5-2-创建消息客户端","children":[]},{"level":3,"title":"5.3. 创建Runner Bean","slug":"_5-3-创建runner-bean","link":"#_5-3-创建runner-bean","children":[]},{"level":3,"title":"5.4. 测试结果","slug":"_5-4-测试结果","link":"#_5-4-测试结果","children":[]}]},{"level":2,"title":"6. RSocket交互模型","slug":"_6-rsocket交互模型","link":"#_6-rsocket交互模型","children":[{"level":3,"title":"6.1. 请求-响应","slug":"_6-1-请求-响应","link":"#_6-1-请求-响应","children":[]},{"level":3,"title":"6.2. 请求-流","slug":"_6-2-请求-流","link":"#_6-2-请求-流","children":[]},{"level":3,"title":"6.3. 火并忘记","slug":"_6-3-火并忘记","link":"#_6-3-火并忘记","children":[]},{"level":3,"title":"6.4. 通道","slug":"_6-4-通道","link":"#_6-4-通道","children":[]}]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论-1","link":"#_7-结论-1","children":[]}],"git":{"createdTime":1719683606000,"updatedTime":1719683606000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.35,"words":1605},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-RSocket Interface in Spring 6.md","localizedDate":"2024年6月29日","excerpt":"\\n<p>寻找理想的Linux发行版，用于在云中运行现代Spring应用程序？\\n<strong>遇见Alpaquita Linux</strong>：轻量级、安全且功能强大，足以处理重负载工作。\\n这个发行版是<strong>专门为运行Java应用程序设计的</strong>。它基于Alpine构建，并具有显著的增强功能，以在高密度容器环境中表现出色，同时满足企业级安全标准。</p>\\n<p>具体来说，容器镜像大小比标准选项<strong>小约30%</strong>，并且它消耗的RAM<strong>少至30%</strong>：</p>\\n<p><strong>&gt;&gt; 立即尝试Alpaquita容器。</strong></p>","autoDesc":true}');export{u as comp,g as data};
