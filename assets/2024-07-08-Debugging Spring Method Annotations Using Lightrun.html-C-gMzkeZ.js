import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as e,a as p}from"./app-DkA39C0B.js";const i={},a=p('<h1 id="使用lightrun调试spring方法注解" tabindex="-1"><a class="header-anchor" href="#使用lightrun调试spring方法注解"><span>使用Lightrun调试Spring方法注解</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>我们最近查看了Lightrun——一个开发者可观测性平台——来看看它如何帮助我们更好地观察和理解我们的应用程序。</p><p>Spring大量使用注解来控制各种功能，这些功能可以以多种方式工作。这可以使编写应用程序变得非常高效——我们只需要添加适当的注解来启用功能。然而，当这不起作用时，诊断可能会令人沮丧，因为没有直接的方法调用可供查看。</p><p>在本文中，我们将探讨如何使用Lightrun诊断Spring注解在我们的应用程序中的工作方式。</p><h2 id="_2-调试事务边界" tabindex="-1"><a class="header-anchor" href="#_2-调试事务边界"><span>2. 调试事务边界</span></a></h2><p>Spring使用@Transactional注解来标记应在事务中执行的方法。这是通过Spring在构造时检测到注解并构建一个JDK代理来包装我们的类实例来实现的。这个代理负责处理所有事务边界的细节。这确保了事务在我们的方法之前开始，并在它完成后正确地清理。</p><p>因此，调试事务意味着我们首先必须确定我们需要看哪里。这可以通过向我们的一个事务性方法添加快照并执行它来最轻松地完成，从而捕获一个堆栈跟踪：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/02/frames.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在这里我们可以看到我们控制器——deleteTask:74, TasksController——和我们的事务性服务——deleteTaskById: 40, TasksService——之间的整个堆栈跟踪。由于我们的代码有这个作为直接方法调用，Spring为我们插入了两者之间的所有内容。</p><p>现在我们需要确定这些中哪些是重要的。这些条目中的许多集中在代理和需要使事情工作的反射调用上。然而，中间有三个听起来非常专注于事务的：</p><ul><li>invoke:119, TransactionInterceptor</li><li>invokeWithinTransaction:388, TransactionAspectSupport</li><li>proceedWithInvocation:123, TransactionInterceptor$1</li></ul><p>进一步地，我们可以从这些方法名称大致推断出正在发生什么。<strong>invokeWithinTransaction很可能是Spring代码中管理事务边界的地方。</strong> 因此，这就是我们应该专注于调试的地方，以准确了解正在发生什么。</p><p>如果我们在IDE中打开这段代码，我们可以看到这里确切发生了什么：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/02/invokeWithinTransaction.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>为了更好地理解这如何影响我们的代码，我们可以使用Lightrun在运行时向一些适当的行添加日志。例如：</p><ul><li>在382行之后的日志显示新启动的事务。</li><li>在392行的日志显示如果异常中止了事务。</li><li>最后，在408行的日志显示事务结束时的结果。</li></ul><p>然后，如果我们向我们的控制器和服务添加日志——这样我们就可以看到事务内外的动作——然后我们就可以看到确切发生了什么：</p><p><img src="https://www.baeldung.com/wp-content/uploads/2023/02/logs.png" alt="img" loading="lazy"> <img src="https://www.baeldung.com/wp-content/uploads/2023/02/console.png" alt="img" loading="lazy"></p><p>所以，我们可以看到这里启动了三个Spring事务——一个在我们的服务调用之外，另外两个在服务内部。这两个在服务内的与我们这里涉及两个存储库调用的事实相一致。然而，因为它们都有PROPAGATION_REQUIRED，所以它们实际上参与了同一个数据库事务。</p><p>这已经给了我们关于事务何时开始和结束、是否会回滚以及输出是什么的确切信息。而且我们所有这些都是在从未中断运行中的应用程序的情况下完成的。</p><h2 id="_3-调试缓存边界" tabindex="-1"><a class="header-anchor" href="#_3-调试缓存边界"><span>3. 调试缓存边界</span></a></h2><p>Spring通过向我们的方法调用添加适当的注解来支持缓存方法结果。这样做会导致Spring自动在方法调用周围插入代码以缓存结果，并在认为适当的情况下返回缓存值，而不是实际调用方法。</p><p><strong>缓存出了名的难以调试，因为缓存命中意味着底层代码从未被调用，因此不会触发其中的任何日志。</strong> 这包括我们直接写入代码的日志以及Lightrun添加的日志。然而，Lightrun允许我们把这些日志放在我们的代码和缓存代码本身中。</p><p>和以前一样，我们可以使用快照来查看我们的代码和Spring在两者之间注入的所有部分：</p><p><img src="https://www.baeldung.com/wp-content/uploads/2023/02/snapshot-1.png" alt="img" loading="lazy"> <img src="https://www.baeldung.com/wp-content/uploads/2023/02/snapshotFrame.png" alt="img" loading="lazy"></p><p>在这里我们可以看到我们的控制器和服务以及Spring插入的所有调用。在这种情况下，感兴趣的类是CacheInterceptor和CacheAspectSupport。如果我们进一步查看，我们会看到CacheInterceptor实际上是CacheAspectSupport的一个子类，所以这实际上都是一个类。</p><p>特别是，从检查代码中，我们可以看到有趣的功能在CacheAspectSupport.execute()中：</p><p>在这中间，我们可以看到我们正在检查缓存是命中还是未命中，并相应地采取行动。<strong>因此，我们可以使用Lightrun在这里添加一些日志，以查看无论是否是缓存命中或未命中，究竟发生了什么：</strong></p><ul><li>414行的日志允许我们看到我们是否有缓存命中或未命中。</li><li>421行的日志允许我们指示我们即将调用我们的底层方法。</li><li>423行之后的日志向我们显示返回值，无论是缓存命中还是未命中。</li></ul><p>现在我们可以看到我们的缓存结果发生了什么：</p><p>在这里我们可以看到两次调用检索相同资源。第一个进来，得到一个缓存未命中，并继续调用真正的服务。第二个进来，得到一个缓存命中，所以真正的服务没有被调用。</p><p><strong>如果没有Lightrun，我们能看到的最好情况就是控制器在两种情况下都被调用，服务只在第一种情况下被调用，但我们不知道为什么会这样。</strong></p><h2 id="_4-调试请求映射" tabindex="-1"><a class="header-anchor" href="#_4-调试请求映射"><span>4. 调试请求映射</span></a></h2><p>Spring WebMVC是Spring框架的重要组成部分，对于它如何处理HTTP请求并将其转发到正确的控制器至关重要。<strong>然而，如果出现问题，弄清楚到底发生了什么可能会令人沮丧。</strong></p><p>Lightrun为我们提供了一些额外的工具，以与以前相同的方式确切地看到发生了什么。然而，这需要更多的努力来实现，因为Spring的内部在这个领域更复杂。</p><p>和以前一样，我们需要一个切入点。我们通过向任何控制器添加快照，然后触发它来获得显示导致控制器方法的调用的堆栈跟踪：</p><p>经过一些探索，我们可以看到DispatcherServlet.doDispatch()很有趣，因为它有一个调用getHandler()。这似乎是决定给定HTTP请求使用哪个处理器的地方。这向我们展示了Spring中的几个堆栈帧，这些帧导致我们的控制器。</p><p>查看这个，我们可以看到它遍历了一个_HandlerMapping_实例集合，并依次询问每个实例是否可以处理请求：</p><p>这是一个抽象方法，有一些选项，所以让我们在大约1261行添加一个日志语句，看看实际发生了什么：</p><p>这立即向我们展示了涉及的处理映射。而且，重要的是，最后一个是为这个请求返回了某些内容的，所以让我们接下来看看那里。</p><p>getHandler()的实际实现在RequestMappingHandlerMapping的超类AbstractHandlerMapping中。然而，这立即以getHandlerInternal()在AbstractHandlerMethodMapping中工作。那是以lookupHandlerMethod()为基础的，所以让我们看看那里。</p><p>第一个有趣的部分似乎是addMatchingMappings()，所以让我们在这里添加一个日志，看看到底发生了什么：</p><p>不出所料，这些大多数没有返回匹配项。然而，有一个确实如此。这表明我们有一个处理器用于“GET /{id}”，它匹配我们的请求——这正是我们所期望的。如果这些都没有返回匹配项，我们会立即知道问题是请求映射。例如，如果我们用不支持的HTTP方法或不正确的URI路径进行HTTP调用，那么我们会在这里看到所有东西都是null匹配，那将告诉我们问题所在：</p><p>有了这么远，如果我们需要的话，我们可以进一步诊断对处理器方法的调用，如果那是问题所在。但是，如果我们根本没有被调用，那么我们已经理解了为什么，可以解决问题。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p><strong>在这篇文章中，我们看了一些Spring注解的例子，以及如何使用Lightrun来诊断它们发生了什么。</strong> 特别是，我们已经看到了如何使用这些工具来理解事情何时工作，何时不工作。</p><p>这些相同的技术同样适用于任何其他库和框架。下次你需要诊断你正在使用的其他库时，为什么不试试它们呢？</p><p>如果你想更多地了解Lightrun，请查看他们的博客。</p>',49),r=[a];function o(g,s){return e(),t("div",null,r)}const h=n(i,[["render",o],["__file","2024-07-08-Debugging Spring Method Annotations Using Lightrun.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Debugging%20Spring%20Method%20Annotations%20Using%20Lightrun.html","title":"使用Lightrun调试Spring方法注解","lang":"zh-CN","frontmatter":{"date":"2023-02-01T00:00:00.000Z","category":["Spring","Debugging"],"tag":["Lightrun","Spring Method Annotations"],"head":[["meta",{"name":"keywords","content":"Spring, Debugging, Lightrun, Annotations"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Debugging%20Spring%20Method%20Annotations%20Using%20Lightrun.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Lightrun调试Spring方法注解"}],["meta",{"property":"og:description","content":"使用Lightrun调试Spring方法注解 1. 引言 我们最近查看了Lightrun——一个开发者可观测性平台——来看看它如何帮助我们更好地观察和理解我们的应用程序。 Spring大量使用注解来控制各种功能，这些功能可以以多种方式工作。这可以使编写应用程序变得非常高效——我们只需要添加适当的注解来启用功能。然而，当这不起作用时，诊断可能会令人沮丧，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/02/frames.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T20:38:02.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Lightrun"}],["meta",{"property":"article:tag","content":"Spring Method Annotations"}],["meta",{"property":"article:published_time","content":"2023-02-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T20:38:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Lightrun调试Spring方法注解\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/02/frames.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/02/invokeWithinTransaction.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/02/logs.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/02/console.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/02/snapshot-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/02/snapshotFrame.png\\"],\\"datePublished\\":\\"2023-02-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T20:38:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Lightrun调试Spring方法注解 1. 引言 我们最近查看了Lightrun——一个开发者可观测性平台——来看看它如何帮助我们更好地观察和理解我们的应用程序。 Spring大量使用注解来控制各种功能，这些功能可以以多种方式工作。这可以使编写应用程序变得非常高效——我们只需要添加适当的注解来启用功能。然而，当这不起作用时，诊断可能会令人沮丧，..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 调试事务边界","slug":"_2-调试事务边界","link":"#_2-调试事务边界","children":[]},{"level":2,"title":"3. 调试缓存边界","slug":"_3-调试缓存边界","link":"#_3-调试缓存边界","children":[]},{"level":2,"title":"4. 调试请求映射","slug":"_4-调试请求映射","link":"#_4-调试请求映射","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720471082000,"updatedTime":1720471082000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.85,"words":2356},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Debugging Spring Method Annotations Using Lightrun.md","localizedDate":"2023年2月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>我们最近查看了Lightrun——一个开发者可观测性平台——来看看它如何帮助我们更好地观察和理解我们的应用程序。</p>\\n<p>Spring大量使用注解来控制各种功能，这些功能可以以多种方式工作。这可以使编写应用程序变得非常高效——我们只需要添加适当的注解来启用功能。然而，当这不起作用时，诊断可能会令人沮丧，因为没有直接的方法调用可供查看。</p>\\n<p>在本文中，我们将探讨如何使用Lightrun诊断Spring注解在我们的应用程序中的工作方式。</p>\\n<h2>2. 调试事务边界</h2>\\n<p>Spring使用@Transactional注解来标记应在事务中执行的方法。这是通过Spring在构造时检测到注解并构建一个JDK代理来包装我们的类实例来实现的。这个代理负责处理所有事务边界的细节。这确保了事务在我们的方法之前开始，并在它完成后正确地清理。</p>","autoDesc":true}');export{h as comp,d as data};
