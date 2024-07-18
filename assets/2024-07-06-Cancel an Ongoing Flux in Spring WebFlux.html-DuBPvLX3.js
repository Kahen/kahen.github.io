import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a as t}from"./app-CE5go3V-.js";const l={},s=t('<h1 id="在spring-webflux中取消正在进行的flux" tabindex="-1"><a class="header-anchor" href="#在spring-webflux中取消正在进行的flux"><span>在Spring WebFlux中取消正在进行的Flux</span></a></h1><p>在本文中，我们将讨论Spring WebFlux提供的取消正在进行的_Flux_的各种选项。首先，我们将快速概述响应式编程中的_Flux_。接下来，我们将探讨取消正在进行的_Flux_的必要性。</p><p>我们将查看Spring WebFlux提供的各种方法，以显式和自动方式取消订阅。我们将使用JUnit测试来驱动我们的简单示例，以验证系统的行为符合预期。最后，我们将看到如何在取消后执行清理工作，使我们能够将系统重置为取消后所需的状态。</p><p>让我们首先快速概述一下_Flux_。</p><h3 id="_2-什么是flux" tabindex="-1"><a class="header-anchor" href="#_2-什么是flux"><span>2. 什么是Flux？</span></a></h3><p><strong>Spring WebFlux是一个响应式Web框架，为构建异步、非阻塞应用程序提供了强大的功能</strong>。Spring WebFlux的一个关键特性是其处理fluxes的能力。_Flux_是一个响应式数据流，它可以发出零个或多个项目。它可以从各种来源创建，例如数据库查询、网络调用或内存集合。</p><p><strong>在这个上下文中，我们应该意识到的另一个术语是订阅，它代表了一个数据源（即发布者）和数据消费者（即订阅者）之间的连接。订阅维护了一个状态，反映了订阅是否处于活动状态。它可以用来取消订阅，这将停止_Flux_发出数据并释放发布者持有的任何资源</strong>。我们可能想要取消正在进行的订阅的一些潜在场景可能是用户取消请求或超时等情况。</p><h3 id="_3-取消正在进行的flux的好处" tabindex="-1"><a class="header-anchor" href="#_3-取消正在进行的flux的好处"><span>3. 取消正在进行的Flux的好处</span></a></h3><p>在响应式Spring WebFlux中，取消正在进行的_Flux_以确保有效使用系统资源并防止潜在的内存泄漏是很重要的。以下是一些原因：</p><ul><li><strong>背压</strong>：响应式编程使用背压来调节发布者和订阅者之间的数据流。如果订阅者跟不上发布者的速度，背压用于减慢或停止数据流。<strong>如果正在进行的订阅没有被取消，即使订阅者不消费数据，它也会继续生成数据，导致背压积累并可能引起内存泄漏</strong>。</li><li><strong>资源管理</strong>：它可以持有系统资源，如内存、CPU和网络连接，如果不加以控制，可能会导致资源耗尽。<strong>通过取消订阅可以释放系统资源，然后可以用于其他任务</strong>。</li><li><strong>性能</strong>：<strong>通过提前终止订阅，系统可以避免不必要的处理并减少响应时间，从而提高整体系统性能</strong>。</li></ul><h3 id="_4-maven依赖项" tabindex="-1"><a class="header-anchor" href="#_4-maven依赖项"><span>4. Maven依赖项</span></a></h3><p>让我们以一些作为_Flux_传来的传感器数据的非常简单的例子为例，我们希望根据使用WebFlux提供的选项取消数据发射。</p><p>要开始，我们需要添加以下关键依赖项：</p><ul><li>spring-boot-starter-webflux：它捆绑了所有必需的依赖项，以使用Spring WebFlux构建响应式Web应用程序，包括用于响应式编程的反应器库和Netty作为默认的嵌入式服务器。</li><li>reactor-spring：它是反应器项目的一个模块，提供与Spring框架的集成。</li><li>reactor-test：它为响应式流提供测试支持。</li></ul><p>现在，让我们在项目POM中声明这些依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependencies&gt;`\n    ```&lt;dependency&gt;```\n        ```&lt;groupId&gt;```org.springframework.boot```&lt;/groupId&gt;```\n        ```&lt;artifactId&gt;```spring-boot-starter-webflux```&lt;/artifactId&gt;```\n    ```&lt;/dependency&gt;```\n    ```&lt;dependency&gt;```\n        ```&lt;groupId&gt;```org.projectreactor```&lt;/groupId&gt;```\n        ```&lt;artifactId&gt;```reactor-spring```&lt;/artifactId&gt;```\n        `&lt;version&gt;`${reactor-spring.version}`&lt;/version&gt;`\n    ```&lt;/dependency&gt;```\n    ```&lt;dependency&gt;```\n        ```&lt;groupId&gt;```io.projectreactor```&lt;/groupId&gt;```\n        ```&lt;artifactId&gt;```reactor-test```&lt;/artifactId&gt;```\n        `&lt;scope&gt;`test`&lt;/scope&gt;`\n    ```&lt;/dependency&gt;```\n`&lt;/dependencies&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-在webflux中取消正在进行的flux" tabindex="-1"><a class="header-anchor" href="#_5-在webflux中取消正在进行的flux"><span>5. 在WebFlux中取消正在进行的Flux</span></a></h3><p>在Spring WebFlux中，我们可以显式地使用_dispose()_进行取消，或者当使用调用_Subscription_对象上的_cancel()_的某些操作符时，它可能会隐式发生。这些操作符包括：</p><ul><li>takeUntil()</li><li>takeWhile()</li><li>take(long n)</li><li>take(Duration n)</li></ul><p><strong>更详细地看，我们将发现这些操作符在内部调用_Subscription_对象上的_cancel_()方法，作为参数传递给Subscriber的_OnSubscribe()_方法。</strong></p><p>让我们接下来讨论这些操作符。</p><h4 id="_5-1-使用-takeuntil-操作符取消" tabindex="-1"><a class="header-anchor" href="#_5-1-使用-takeuntil-操作符取消"><span>5.1. 使用_takeUntil()_操作符取消</span></a></h4><p>让我们继续以传感器数据为例。我们希望继续接收来自数据流的数据，直到我们遇到值8，此时我们希望取消任何更多的数据发射：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenOngoingFlux_whentakeUntil_thenFluxCancels() {\n    Flux```````````&lt;Integer&gt;``````````` sensorData = Flux.range(1, 10);\n    List```````````&lt;Integer&gt;``````````` result = new ArrayList&lt;&gt;();\n\n    sensorData.takeUntil(reading -&gt; reading == 8)\n      .subscribe(result::add);\n    assertThat(result).containsExactly(1, 2, 3, 4, 5, 6, 7, 8);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码片段使用_Flux_ API创建了一个整数流，并使用各种操作符进行操作。首先，使用_Flux.range()_创建了一个从1到10的整数序列。然后，应用了_takeUntil()_操作符，它期望一个谓词来指定_Flux_应该继续发射整数直到值达到8。</p><p><strong>最后，调用了_subscribe()_方法，这导致_Flux_发射值，直到_takeUntil()_谓词评估为true</strong>。在_subscribe()_方法内，每个新发射的整数都被添加到List<code>&lt;Integer&gt;</code>中，允许捕获和操作发射的值。</p><p><strong>重要的是要注意，_subscribe()_方法是触发_Flux_发射值的关键，没有它，将不会有任何值被发射，因为_Flux_将没有订阅</strong>。<strong>一旦_takeUntil()_操作符指定的条件为true，订阅将自动取消，_Flux_停止发射值</strong>。测试结果证实结果列表仅包含直到8的整数值，证明了进一步数据发射的取消。</p><h4 id="_5-2-使用-takewhile-操作符取消" tabindex="-1"><a class="header-anchor" href="#_5-2-使用-takewhile-操作符取消"><span>5.2. 使用_takeWhile()_操作符取消</span></a></h4><p><strong>接下来，让我们考虑一个场景，我们希望订阅继续发射数据，只要传感器读数保持在8以下</strong>。在这里，我们可以利用_takeWhile_()操作符，它期望一个继续谓词：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenOngoingFlux_whentakeWhile_thenFluxCancels() {\n    List```````````&lt;Integer&gt;``````````` result = new ArrayList&lt;&gt;();\n    Flux```````````&lt;Integer&gt;``````````` sensorData = Flux.range(1, 10)\n      .takeWhile(reading -&gt; reading &lt; 8)\n      .doOnNext(result::add);\n\n    sensorData.subscribe();\n    assertThat(result).containsExactly(1, 2, 3, 4, 5, 6, 7);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基本上，这里的_takeWhile()_操作符也期望一个谓词。只要谓词评估为true，数据流就发射数据。<strong>一旦谓词评估为false，订阅就会被取消，不再发射任何数据</strong>。注意，在这里，我们在设置flux时使用了_doOnNext()_方法，将每个发射的值添加到列表中。</p><p>然后，我们调用了_sensorData.subscribe()_。</p><h4 id="_5-3-使用-take-long-n-操作符取消" tabindex="-1"><a class="header-anchor" href="#_5-3-使用-take-long-n-操作符取消"><span>5.3. 使用_take(long n)_操作符取消</span></a></h4><p><strong>接下来，让我们看看_take()_操作符，它可以限制我们想要从潜在的无限响应数据流序列中获取的元素数量</strong>。让我们取一个从1到Integer最大值的Integers的_Flux_，然后取前10个元素：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenOngoingFlux_whentake_thenFluxCancels() {\n    Flux```````````&lt;Integer&gt;``````````` sensorData = Flux.range(1, Integer.MAX_VALUE);\n    List```````````&lt;Integer&gt;``````````` result = new ArrayList&lt;&gt;();\n\n    sensorData.take(10)\n      .subscribe(result::add);\n    Assertions.assertThat(result)\n      .containsExactly(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在这里，订阅在前10个元素之后再次被取消，我们的_result_列表证实了这一点。</strong></p><h4 id="_5-4-使用-take-duration-d-操作符取消" tabindex="-1"><a class="header-anchor" href="#_5-4-使用-take-duration-d-操作符取消"><span>5.4. 使用_take(Duration d)_操作符取消</span></a></h4><p><strong>另一个我们可能想要取消任何进一步数据发射的潜在场景是，当一定时间已经过去，之后我们对任何进一步的发射不再感兴趣</strong>。在这种情况下，我们查看_Flux_的持续时间，然后停止接收持续时间之外的任何内容：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenAnOnGoingFlux_whenTimeout_thenCancelsFlux() {\n    Flux```````````&lt;Integer&gt;``````````` sensorData = Flux.interval(Duration.ZERO, Duration.ofSeconds(2))\n      .map(i -&gt; i.intValue() + 10)\n      .take(5);\n\n    Flux```````````&lt;Integer&gt;``````````` canceledByTimeout = sensorData.take(Duration.ofSeconds(3));\n\n    StepVerifier.create(canceledByTimeout)\n      .expectNext(10, 11)\n      .expectComplete()\n      .verify();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们使用_interval()<em>操作符创建了一个整数的_Flux</em>，它从0开始，每2秒发射一次值。然后我们将每个发射的值映射为一个整数，通过添加10。<strong>接下来，我们使用_take()_操作符将发射的值的数量限制为5。这意味着Flux将只发射前5个值，然后完成。</strong></p><p>**然后我们通过应用带有3秒持续时间值的_take(Duration)<em>操作符创建了一个新的_Flux</em>，名为canceledByTimeout。这意味着canceledByTimeout Flux将从sensorData发射前2个值，然后完成。</p><p><strong>在这里，我们使用了StepVerifier。StepVerifier是由Reactor-Test库提供的实用程序，它通过设置对期望事件的期望，然后验证事件是否按预期的顺序和具有预期的值被发射，来帮助验证Flux或Mono流的行为。</strong></p><p>在我们的例子中，期望的顺序和值是10和11，我们还使用_expectComplete()_验证Flux是否完成，而没有发射任何额外的值。</p><p><strong>重要的是要注意，由于在调用verify()时内部调用了_subscribe()<em>方法，因此没有显式调用_subscribe()</em></strong>。<strong>这意味着事件仅在我们运行StepVerifier时被发射，而不是在我们创建_Flux_流时</strong>。</p><h4 id="_5-5-使用-dispose-方法取消" tabindex="-1"><a class="header-anchor" href="#_5-5-使用-dispose-方法取消"><span>5.5. 使用_dispose()_方法取消</span></a></h4><p>接下来，让我们看看如何通过调用_dispose()_进行显式取消，它属于Disposable接口。<strong>简单来说，_Disposable_是一个接口，作为取消的单向机制</strong>。它允许处理资源或取消订阅。</p><p>让我们设置一个示例，我们有一个从1到10发射值的_Flux_，每个值延迟1秒。我们将订阅flux以在控制台上打印值。然后我们使线程睡眠5ms，然后调用_dispose()_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid giveAnOnGoingFlux_whenDispose_thenCancelsFluxExplicitly() throws InterruptedException {\n    Flux```````````&lt;Integer&gt;``````````` flux = Flux.range(1, 10)\n      .delayElements(Duration.ofSeconds(1));\n\n    AtomicInteger count = new AtomicInteger(0);\n    Disposable disposable = flux.subscribe(i -&gt; {\n        System.out.println(&quot;Received: &quot; + i);\n        count.incrementAndGet();\n    }, e -&gt; System.err.println(&quot;Error: &quot; + e.getMessage())\n    );\n\n    Thread.sleep(5000);\n    System.out.println(&quot;Will Dispose the Flux Next&quot;);\n    disposable.dispose();\n    if(disposable.isDisposed()) {\n        System.out.println(&quot;Flux Disposed&quot;);\n    }\n    assertEquals(4, count.get());\n}\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使线程睡眠5秒，然后调用_dispose()_()。这导致订阅的取消。</p><h3 id="_6-取消后的清理" tabindex="-1"><a class="header-anchor" href="#_6-取消后的清理"><span>6. 取消后的清理</span></a></h3><p><strong>重要的是要理解，取消正在进行的订阅并不隐式释放任何相关资源</strong>。然而，在flux被取消或完成后，进行任何清理和状态重置是很重要的。我们可以使用提供的_doOnCancel()<em>和_doFinally</em>()方法来实现这一点：</p><p>为了简化我们的测试，我们将在flux被取消时打印适当的消息。<strong>然而，在现实世界的场景中，这一步可以进行任何资源清理，例如关闭连接等。</strong></p><p>让我们快速测试一下，当_Flux_被取消时，我们希望的字符串作为取消后清理的一部分被打印：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenAFluxIsCanceled_whenDoOnCancelAndDoFinally_thenMessagePrinted() throws InterruptedException {\n\n    List```````````&lt;Integer&gt;``````````` result = new ArrayList&lt;&gt;();\n    PrintStream mockPrintStream = mock(PrintStream.class);\n    System.setOut(mockPrintStream);\n\n    Flux```````````&lt;Integer&gt;``````````` sensorData = Flux.interval(Duration.ofMillis(100))\n      .doOnCancel(() -&gt; System.out.println(&quot;Flux Canceled&quot;))\n      .doFinally(signalType -&gt; {\n          if (signalType == SignalType.CANCEL) {\n              System.out.println(&quot;Flux Completed due to Cancelation&quot;);\n          } else {\n              System.out.println(&quot;Flux Completed due to Completion or Error&quot;);\n          }\n      })\n      .map(i -&gt; ThreadLocalRandom.current().nextInt(1, 1001))\n      .doOnNext(result::add);\n\n    Disposable subscription = sensorData.subscribe();\n\n    Thread.sleep(1000);\n    subscription.dispose();\n\n    ArgumentCaptor`&lt;String&gt;` captor = ArgumentCaptor.forClass(String.class);\n    Mockito.verify(mockPrintStream, times(2)).println(captor.capture());\n\n    assertThat(captor.getAllValues()).contains(&quot;Flux Canceled&quot;, &quot;Flux Completed due to Cancelation&quot;);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码调用了_doOnCancel()_和_doFinally()_操作符。<strong>重要的是要注意，_doOnCancel()_操作符仅在_Flux_序列被显式取消时执行。另一方面，_doFinally()_操作符无论它是被取消、成功完成还是以错误完成都会执行。</strong></p><p>此外，_doFinally()<em>操作符消耗一个_SignalType_接口的类型。它表示可能的信号类型，例如_OnComplete</em>、<em>OnError_和_CANCEL</em>。在这种情况下，<em>SignalType_是_CANCEL</em>，因此也捕获了“由于取消而完成的Flux”的消息。</p><h3 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h3><p>在本教程中，我们涵盖了Webflux提供的取消正在进行的_Flux_的各种方式。我们快速回顾了响应式编程中的_Flux_。我们检查了可能需要取消订阅的原因。然后，我们讨论了促进取消的各种方法。此外，我们还查看了取消后的清理。</p><p>如常，代码可以在GitHub上找到。</p><p>OK</p>',60),a=[s];function r(d,u){return i(),n("div",null,a)}const p=e(l,[["render",r],["__file","2024-07-06-Cancel an Ongoing Flux in Spring WebFlux.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Cancel%20an%20Ongoing%20Flux%20in%20Spring%20WebFlux.html","title":"在Spring WebFlux中取消正在进行的Flux","lang":"zh-CN","frontmatter":{"date":"2024-07-07T00:00:00.000Z","category":["Spring WebFlux","Reactive Programming"],"tag":["WebFlux","Flux","Reactive Streams"],"head":[["meta",{"name":"keywords","content":"Spring WebFlux, Reactive Programming, WebFlux, Flux, Reactive Streams"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Cancel%20an%20Ongoing%20Flux%20in%20Spring%20WebFlux.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Spring WebFlux中取消正在进行的Flux"}],["meta",{"property":"og:description","content":"在Spring WebFlux中取消正在进行的Flux 在本文中，我们将讨论Spring WebFlux提供的取消正在进行的_Flux_的各种选项。首先，我们将快速概述响应式编程中的_Flux_。接下来，我们将探讨取消正在进行的_Flux_的必要性。 我们将查看Spring WebFlux提供的各种方法，以显式和自动方式取消订阅。我们将使用JUnit测..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T22:38:46.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"WebFlux"}],["meta",{"property":"article:tag","content":"Flux"}],["meta",{"property":"article:tag","content":"Reactive Streams"}],["meta",{"property":"article:published_time","content":"2024-07-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T22:38:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Spring WebFlux中取消正在进行的Flux\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-07T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T22:38:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Spring WebFlux中取消正在进行的Flux 在本文中，我们将讨论Spring WebFlux提供的取消正在进行的_Flux_的各种选项。首先，我们将快速概述响应式编程中的_Flux_。接下来，我们将探讨取消正在进行的_Flux_的必要性。 我们将查看Spring WebFlux提供的各种方法，以显式和自动方式取消订阅。我们将使用JUnit测..."},"headers":[{"level":3,"title":"2. 什么是Flux？","slug":"_2-什么是flux","link":"#_2-什么是flux","children":[]},{"level":3,"title":"3. 取消正在进行的Flux的好处","slug":"_3-取消正在进行的flux的好处","link":"#_3-取消正在进行的flux的好处","children":[]},{"level":3,"title":"4. Maven依赖项","slug":"_4-maven依赖项","link":"#_4-maven依赖项","children":[]},{"level":3,"title":"5. 在WebFlux中取消正在进行的Flux","slug":"_5-在webflux中取消正在进行的flux","link":"#_5-在webflux中取消正在进行的flux","children":[]},{"level":3,"title":"6. 取消后的清理","slug":"_6-取消后的清理","link":"#_6-取消后的清理","children":[]},{"level":3,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720305526000,"updatedTime":1720305526000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":9.63,"words":2889},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Cancel an Ongoing Flux in Spring WebFlux.md","localizedDate":"2024年7月7日","excerpt":"\\n<p>在本文中，我们将讨论Spring WebFlux提供的取消正在进行的_Flux_的各种选项。首先，我们将快速概述响应式编程中的_Flux_。接下来，我们将探讨取消正在进行的_Flux_的必要性。</p>\\n<p>我们将查看Spring WebFlux提供的各种方法，以显式和自动方式取消订阅。我们将使用JUnit测试来驱动我们的简单示例，以验证系统的行为符合预期。最后，我们将看到如何在取消后执行清理工作，使我们能够将系统重置为取消后所需的状态。</p>\\n<p>让我们首先快速概述一下_Flux_。</p>\\n<h3>2. 什么是Flux？</h3>\\n<p><strong>Spring WebFlux是一个响应式Web框架，为构建异步、非阻塞应用程序提供了强大的功能</strong>。Spring WebFlux的一个关键特性是其处理fluxes的能力。_Flux_是一个响应式数据流，它可以发出零个或多个项目。它可以从各种来源创建，例如数据库查询、网络调用或内存集合。</p>","autoDesc":true}');export{p as comp,v as data};
