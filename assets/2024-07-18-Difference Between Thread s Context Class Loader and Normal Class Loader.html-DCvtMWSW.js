import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-CE5go3V-.js";const r={},s=n('<hr><h1 id="java-中线程上下文类加载器与普通类加载器的区别" tabindex="-1"><a class="header-anchor" href="#java-中线程上下文类加载器与普通类加载器的区别"><span>Java 中线程上下文类加载器与普通类加载器的区别</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Java 在程序执行期间使用不同类型的类加载器来加载资源。在本教程中，我们将探讨 Java 中当前类加载器和线程类加载器的行为差异。</p><h2 id="_2-类加载器的作用是什么" tabindex="-1"><a class="header-anchor" href="#_2-类加载器的作用是什么"><span>2. 类加载器的作用是什么？</span></a></h2><p>Java 类加载器定位并加载应用程序执行所需的类。如果请求的类依赖于任何其他资源，它们也会被加载。</p><p><strong>我们</strong> <strong>需要</strong> <strong>适当的类加载器在 Java 程序需要时加载不同类型的类</strong>。</p><h2 id="_3-类加载器之间的关系" tabindex="-1"><a class="header-anchor" href="#_3-类加载器之间的关系"><span>3. 类加载器之间的关系</span></a></h2><p><strong>Java 类加载器遵循层次关系</strong>。</p><p>每个查找或加载类的请求都被委托给相应的父类加载器。如果所有祖先类加载器都无法找到类，那么当前类加载器会尝试定位它。这里，“当前类”意味着当前执行方法的类。</p><p><strong>类加载器之间的关系有助于维护应用程序中资源的唯一性</strong>。此外，如果一个类已经被父类加载器加载，子类加载器就不需要重新加载它。</p><h2 id="_4-默认类加载器" tabindex="-1"><a class="header-anchor" href="#_4-默认类加载器"><span>4. 默认类加载器</span></a></h2><p>类加载器加载它们各自类路径上存在的类和资源：</p><ul><li>系统或应用程序类加载器从应用程序类路径加载类</li><li>扩展类加载器在扩展类路径（<em>JRE/lib/ext</em>）中搜索</li><li>引导类加载器查看引导类路径（<em>JRE/lib/rt.jar</em>）</li></ul><p><strong>引导类加载器或原始类加载器是所有类加载器的父加载器。它加载 Java 运行时——运行 JVM 本身所需的类</strong>。</p><p>当前类加载器以线性、层次化的方式搜索资源。如果类加载器无法定位类，它会向相应的子类加载器抛出 <em>java.lang.ClassNotFoundException</em>。然后子类加载器尝试搜索该类。</p><p>对于在层次结构中的任何类加载器的类路径上都找不到所需资源的场景，我们会收到与 <em>java.lang.ClassNotFoundException</em> 相关的错误消息。</p><p>我们也可以自定义默认的类加载行为。<strong>我们可以在动态加载类时显式指定类加载器</strong>。</p><p>然而，我们应该注意，如果我们使用不同类型的类加载器加载同一个类，这些类在 JVM 中会被视为不同的资源。</p><h2 id="_5-上下文类加载器" tabindex="-1"><a class="header-anchor" href="#_5-上下文类加载器"><span>5. 上下文类加载器</span></a></h2><p>除了默认类加载器，J2SE 还引入了上下文类加载器。</p><p><strong>每个 Java 线程都有一个关联的上下文类加载器</strong>。</p><p>我们可以使用 <em>Thread</em> 类的 <em>getContextClassLoader()</em> 和 <em>setContextClassLoader()</em> 方法来访问/修改线程的上下文类加载器。</p><p>上下文类加载器在线程创建时设置。<strong>如果没有显式设置，它默认为父线程的上下文类加载器</strong>。</p><p>上下文类加载器也遵循层次模型。在这种情况下，根类加载器是原始线程的上下文类加载器。原始线程是由操作系统创建的初始线程。</p><p>随着应用程序开始执行，可能会创建其他线程。原始线程的上下文类加载器最初设置为加载应用程序的类加载器，即系统类加载器。</p><p>假设我们在层次结构的任何级别上都不更新任何线程的上下文类加载器。因此，我们可以这样说，默认情况下，线程的上下文类加载器与系统类加载器相同。在这种情况下，如果我们执行 <em>Thread.currentThread().getContextClassLoader()</em> 和 <em>getClass().getClassLoader()</em> 操作，两者都将返回相同的对象。</p><h3 id="_5-1-处理委托问题" tabindex="-1"><a class="header-anchor" href="#_5-1-处理委托问题"><span>5.1. 处理委托问题</span></a></h3><p>当默认 Java 类加载器的类路径上不存在所需资源时，上下文类加载器就显得非常重要。因此，<strong>我们可以使用上下文类加载器从传统的线性委托模型中偏离</strong>。</p><p>在类加载器的层次模型中，父类加载器加载的资源对子类加载器可见，但反之则不然。在某些情况下，父类加载器可能需要访问子类加载器类路径上的类。</p><p>上下文类加载器是实现这一点的有用工具。我们可以在访问所需资源时将上下文类加载器设置为期望的值。因此，在上述情况下，我们可以使用子线程的上下文类加载器，并可以定位子类加载器级别的资源。</p><h3 id="_5-2-多模块环境" tabindex="-1"><a class="header-anchor" href="#_5-2-多模块环境"><span>5.2. 多模块环境</span></a></h3><p>在设置上下文类加载器属性时，<strong>我们基本上是在切换加载资源的上下文</strong>。我们不是在当前类路径上搜索，而是获取一个指向不同类路径的新类加载器。这在我们想要从第三方模块加载资源或在具有不同类命名空间的环境中工作时特别有用。</p><p>然而，<strong>我们应该在这里小心，并重置上下文类加载器属性回原始类加载器，以避免未来的不一致性</strong>。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们分析了使用上下文类加载器加载通过普通类加载器无法访问的资源的重要性。我们看到，我们还可以选择临时更新给定线程的上下文类加载器以加载所需的类。</p><p>了解当前方法的工作上下文至关重要。我们可以在不同的类路径上拥有同名资源。因此，在从多个类加载器加载资源时，我们应该小心。</p>',37),o=[s];function l(p,d){return t(),a("div",null,o)}const c=e(r,[["render",l],["__file","2024-07-18-Difference Between Thread s Context Class Loader and Normal Class Loader.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Difference%20Between%20Thread%20s%20Context%20Class%20Loader%20and%20Normal%20Class%20Loader.html","title":"Java 中线程上下文类加载器与普通类加载器的区别","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Class Loader"],"tag":["Java","Class Loader","Thread Context Class Loader"],"head":[["meta",{"name":"keywords","content":"Java, Class Loader, Thread Context Class Loader"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Difference%20Between%20Thread%20s%20Context%20Class%20Loader%20and%20Normal%20Class%20Loader.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 中线程上下文类加载器与普通类加载器的区别"}],["meta",{"property":"og:description","content":"Java 中线程上下文类加载器与普通类加载器的区别 1. 概述 Java 在程序执行期间使用不同类型的类加载器来加载资源。在本教程中，我们将探讨 Java 中当前类加载器和线程类加载器的行为差异。 2. 类加载器的作用是什么？ Java 类加载器定位并加载应用程序执行所需的类。如果请求的类依赖于任何其他资源，它们也会被加载。 我们 需要 适当的类加载器..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T10:08:16.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Class Loader"}],["meta",{"property":"article:tag","content":"Thread Context Class Loader"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T10:08:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 中线程上下文类加载器与普通类加载器的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T10:08:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 中线程上下文类加载器与普通类加载器的区别 1. 概述 Java 在程序执行期间使用不同类型的类加载器来加载资源。在本教程中，我们将探讨 Java 中当前类加载器和线程类加载器的行为差异。 2. 类加载器的作用是什么？ Java 类加载器定位并加载应用程序执行所需的类。如果请求的类依赖于任何其他资源，它们也会被加载。 我们 需要 适当的类加载器..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 类加载器的作用是什么？","slug":"_2-类加载器的作用是什么","link":"#_2-类加载器的作用是什么","children":[]},{"level":2,"title":"3. 类加载器之间的关系","slug":"_3-类加载器之间的关系","link":"#_3-类加载器之间的关系","children":[]},{"level":2,"title":"4. 默认类加载器","slug":"_4-默认类加载器","link":"#_4-默认类加载器","children":[]},{"level":2,"title":"5. 上下文类加载器","slug":"_5-上下文类加载器","link":"#_5-上下文类加载器","children":[{"level":3,"title":"5.1. 处理委托问题","slug":"_5-1-处理委托问题","link":"#_5-1-处理委托问题","children":[]},{"level":3,"title":"5.2. 多模块环境","slug":"_5-2-多模块环境","link":"#_5-2-多模块环境","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721297296000,"updatedTime":1721297296000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.84,"words":1451},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Difference Between Thread s Context Class Loader and Normal Class Loader.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java 中线程上下文类加载器与普通类加载器的区别</h1>\\n<h2>1. 概述</h2>\\n<p>Java 在程序执行期间使用不同类型的类加载器来加载资源。在本教程中，我们将探讨 Java 中当前类加载器和线程类加载器的行为差异。</p>\\n<h2>2. 类加载器的作用是什么？</h2>\\n<p>Java 类加载器定位并加载应用程序执行所需的类。如果请求的类依赖于任何其他资源，它们也会被加载。</p>\\n<p><strong>我们</strong> <strong>需要</strong> <strong>适当的类加载器在 Java 程序需要时加载不同类型的类</strong>。</p>","autoDesc":true}');export{c as comp,m as data};
