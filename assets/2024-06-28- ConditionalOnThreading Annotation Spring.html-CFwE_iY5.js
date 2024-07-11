import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as i,a}from"./app-uizvaz9h.js";const t={},r=a(`<h1 id="conditionalonthreading-注解-spring-baeldung" tabindex="-1"><a class="header-anchor" href="#conditionalonthreading-注解-spring-baeldung"><span>@ConditionalOnThreading 注解 Spring | Baeldung</span></a></h1><p>寻找适合在云中运行现代Spring应用程序的理想Linux发行版？</p><p><strong>遇见Alpaquita Linux</strong>：轻量级、安全且功能强大，足以处理重负载。</p><p>这个发行版是<strong>专门为运行Java应用程序而设计的</strong>。它基于Alpine，并具有显著的增强功能，以在高密度容器环境中表现出色，同时满足业级安全标准。</p><p>具体来说，容器镜像大小比标准选项<strong>小约30%</strong>，并且它消耗的RAM<strong>少达30%</strong>：</p><p><strong>&gt;&gt; 立即尝试</strong> <strong>Alpaquita Containers。</strong></p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在这个快速教程中，我们将研究一个相对新的Spring Boot注解，称为**@ConditionalOnThreading**。</p><p>我们将发现这个注解的条件是什么，以及如何满足它以创建bean。</p><h2 id="_2-条件注解" tabindex="-1"><a class="header-anchor" href="#_2-条件注解"><span>2. 条件注解</span></a></h2><p>尽管我们已经在Spring Boot中涵盖了条件注解，但再次非常简要地回顾它们是值得的。</p><p>条件注解提供了一种方式，只有在满足各种特定条件时才在_BeanFactory_中注册bean。开发人员通过使用_Condition_接口为每个注解单独定义这些条件。</p><p>Spring Boot带有一堆预定义的条件注解，用于常见用例。常见的示例是@<em>ConditionalOnProperty</em>、@_ConditionalOnBean_和@<em>ConditionalOnClass</em>。</p><h2 id="_3-conditionalonthreading-理论" tabindex="-1"><a class="header-anchor" href="#_3-conditionalonthreading-理论"><span>3. @ConditionalOnThreading 理论</span></a></h2><p>@ConditionalOnThreading只是Spring Boot中的另一个预定义条件注解。它在版本3.2中添加，该版本在文章创建时本身是一个候选版本。要提前访问这个候选版本，我们应该使用专用的_Spring_工件仓库。</p><p><strong>@ConditionalOnThreading注解仅在Spring配置为使用特定类型的线程内部时才允许创建bean</strong>。通过线程类型，它指的是平台线程或虚拟线程。回想一下，自Java 21以来，我们有了使用虚拟线程而不是平台线程的能力。</p><p>因此，要配置Spring使用虚拟线程内部，我们使用一个名为_spring.threads.virtual.enabled_的属性。如果此属性为_true_，并且我们正在Java 21或更高版本上运行，那么@ConditionalOnThreading注解将允许创建bean。</p><h2 id="_4-注解使用示例" tabindex="-1"><a class="header-anchor" href="#_4-注解使用示例"><span>4. 注解使用示例</span></a></h2><p>现在让我们尝试编写一些示例来演示这个注解的用例。假设我们有两个用@ConditionalOnThreading注解的bean：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Configuration
static class CurrentConfig {

    @Bean
    @ConditionalOnThreading(Threading.PLATFORM)
    ThreadingType platformBean() {
        return ThreadingType.PLATFORM;
    }

    @Bean
    @ConditionalOnThreading(Threading.VIRTUAL)
    ThreadingType virtualBean() {
        return ThreadingType.VIRTUAL;
    }
}

enum ThreadingType {
    PLATFORM, VIRTUAL
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，有了_ConditionalOnThreading_注解，我们将创建这两个bean中的一个：<em>either the platformBean or virtualBean</em>。现在让我们创建一些测试来检查这个注解的工作原理：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ApplicationContextRunner applicationContextRunner = new ApplicationContextRunner()
  .withUserConfiguration(CurrentConfig.class);

@Test
@EnabledForJreRange(max = JRE.JAVA_20)
public void whenJava20AndVirtualThreadsDisabled_thenThreadingIsPlatform() {
    applicationContextRunner.withPropertyValues(&quot;spring.threads.virtual.enabled=false&quot;).run(context -&gt; {
        Assertions.assertThat(context.getBean(ThreadingType.class)).isEqualTo(ThreadingType.PLATFORM);
    });
}

@Test
@EnabledForJreRange(min = JRE.JAVA_21)
public void whenJava21AndVirtualThreadsEnabled_thenThreadingIsVirtual() {
    applicationContextRunner.withPropertyValues(&quot;spring.threads.virtual.enabled=true&quot;).run(context -&gt; {
        Assertions.assertThat(context.getBean(ThreadingType.class)).isEqualTo(ThreadingType.VIRTUAL);
    });
}

@Test
@EnabledForJreRange(min = JRE.JAVA_21)
public void whenJava21AndVirtualThreadsDisabled_thenThreadingIsPlatform() {
    applicationContextRunner.withPropertyValues(&quot;spring.threads.virtual.enabled=false&quot;).run(context -&gt; {
        Assertions.assertThat(context.getBean(ThreadingType.class)).isEqualTo(ThreadingType.PLATFORM);
    });
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们有一个_ApplicationContextRunner_实例，它为测试创建了一个轻量级应用程序上下文。我们使用它来设置_spring_属性_spring.threads.virtual.enabled_的值。我们还用_@EnabledForJreRange_注解注释了测试。这个注解允许我们只在特定的Java版本上运行测试。</p><p>正如我们所注意到的，要使_ThreadingType_ bean为_Virtual_，我们必须将属性设置为_true_，并且至少是Java 21。在其他情况下，注解条件为_false_。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇短文中，我们探索了一个新的Spring注解——@ConditionalOnThreading。它是Spring Boot 3.2的一部分。这个注解仅在Spring通过属性配置为使用特殊类型的线程内部时才允许创建bean。</p><p>如往常一样，文章的源代码可在GitHub上找到。</p>`,27),d=[r];function l(o,s){return i(),e("div",null,d)}const c=n(t,[["render",l],["__file","2024-06-28- ConditionalOnThreading Annotation Spring.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-%20ConditionalOnThreading%20Annotation%20Spring.html","title":"@ConditionalOnThreading 注解 Spring | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring","Annotation"],"tag":["ConditionalOnThreading","Spring Boot"],"head":[["meta",{"name":"keywords","content":"Spring Boot, ConditionalOnThreading, Annotation, Java, Threading"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-%20ConditionalOnThreading%20Annotation%20Spring.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"@ConditionalOnThreading 注解 Spring | Baeldung"}],["meta",{"property":"og:description","content":"@ConditionalOnThreading 注解 Spring | Baeldung 寻找适合在云中运行现代Spring应用程序的理想Linux发行版？ 遇见Alpaquita Linux：轻量级、安全且功能强大，足以处理重负载。 这个发行版是专门为运行Java应用程序而设计的。它基于Alpine，并具有显著的增强功能，以在高密度容器环境中表现出色..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T05:31:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ConditionalOnThreading"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T05:31:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"@ConditionalOnThreading 注解 Spring | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T05:31:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"@ConditionalOnThreading 注解 Spring | Baeldung 寻找适合在云中运行现代Spring应用程序的理想Linux发行版？ 遇见Alpaquita Linux：轻量级、安全且功能强大，足以处理重负载。 这个发行版是专门为运行Java应用程序而设计的。它基于Alpine，并具有显著的增强功能，以在高密度容器环境中表现出色..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 条件注解","slug":"_2-条件注解","link":"#_2-条件注解","children":[]},{"level":2,"title":"3. @ConditionalOnThreading 理论","slug":"_3-conditionalonthreading-理论","link":"#_3-conditionalonthreading-理论","children":[]},{"level":2,"title":"4. 注解使用示例","slug":"_4-注解使用示例","link":"#_4-注解使用示例","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719552678000,"updatedTime":1719552678000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.06,"words":919},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28- ConditionalOnThreading Annotation Spring.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>寻找适合在云中运行现代Spring应用程序的理想Linux发行版？</p>\\n<p><strong>遇见Alpaquita Linux</strong>：轻量级、安全且功能强大，足以处理重负载。</p>\\n<p>这个发行版是<strong>专门为运行Java应用程序而设计的</strong>。它基于Alpine，并具有显著的增强功能，以在高密度容器环境中表现出色，同时满足业级安全标准。</p>\\n<p>具体来说，容器镜像大小比标准选项<strong>小约30%</strong>，并且它消耗的RAM<strong>少达30%</strong>：</p>\\n<p><strong>&gt;&gt; 立即尝试</strong> <strong>Alpaquita Containers。</strong></p>","autoDesc":true}');export{c as comp,u as data};
