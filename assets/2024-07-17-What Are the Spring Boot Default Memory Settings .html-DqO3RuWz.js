import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as n,a as t}from"./app-LwwahXlT.js";const s={},r=t(`<hr><h1 id="spring-boot-默认内存设置是什么" tabindex="-1"><a class="header-anchor" href="#spring-boot-默认内存设置是什么"><span>Spring Boot 默认内存设置是什么？</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将了解 Spring Boot 应用程序使用的默认内存设置。</p><p>通常，Spring 没有特定的内存配置，它运行在底层 Java 进程的配置下。因此，以下是我们可以配置 Java 应用程序内存的方式。</p><p>Java 进程或 JVM 的内存被分配到堆、栈、元空间、JIT 代码缓存和共享库中。</p><h3 id="_2-1-堆" tabindex="-1"><a class="header-anchor" href="#_2-1-堆"><span>2.1. 堆</span></a></h3><p>堆是对象存放直到被垃圾收集器收集的那部分内存。</p><p>默认的最小堆大小是 <strong>8 MB 或物理内存的 1/64，范围在 8 MB 到 1 GB 之间</strong>。</p><p>默认的最大堆大小是 <strong>对于大于 192 MB 的物理内存，是物理内存的 1/4，否则是物理内存的 1/2</strong>。</p><p>在堆内部，我们有托儿所大小限制，当超过这个限制时，会触发新生代垃圾收集。<strong>其默认值是平台特定的</strong>。</p><p>我们还有保留区域限制。这是总堆大小的百分比，当达到这个百分比时，足够长寿的对象会从新生代提升到老年代。<strong>其默认值是 25%</strong>。</p><p>自 Java 8 以来，我们还有元空间作为堆的一部分，所有类元数据都存储在这里。默认情况下，其 <strong>最小值是平台依赖的，最大值是无限的</strong>。</p><p>要覆盖最小堆、最大堆和元空间大小的默认值，请参阅有关配置堆大小的帖子。</p><p>我们可以使用 <em>-Xns</em> 参数覆盖托儿所大小限制。由于托儿所是堆的一部分，其值不应大于 <em>-Xmx</em> 值：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-Xns:10m</span> MyApplication
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们还可以使用 <em>-XXkeepAreaRatio</em> 参数覆盖保留区域限制的默认值。例如，我们可以将其设置为 10%：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-XXkeepAreaRatio:10</span> MyApplication
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，这是如何在 Linux 上检查堆大小：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-XX:+PrintFlagsFinal</span> <span class="token parameter variable">-version</span> <span class="token operator">|</span> <span class="token function">grep</span> HeapSize
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 Windows 上检查堆大小的命令将是：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-XX:+PrintFlagsFinal</span> <span class="token parameter variable">-version</span> <span class="token operator">|</span> findstr HeapSize
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-2-栈" tabindex="-1"><a class="header-anchor" href="#_2-2-栈"><span>2.2. 栈</span></a></h3><p>它是为每个线程执行提供的内存量。<strong>其默认值是平台特定的</strong>。</p><p>因此，我们可以使用 <em>-Xss</em> 参数定义线程栈大小。例如，我们可以将其分配为 512 kB：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-Xss:512k</span> MyApplication
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我们可以在 Linux 上检查线程栈大小：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-XX:+PrintFlagsFinal</span> <span class="token parameter variable">-version</span> <span class="token operator">|</span> <span class="token function">grep</span> ThreadStackSize
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者在 Windows 机器上做同样的事情：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-XX:+PrintFlagsFinal</span> <span class="token parameter variable">-version</span> <span class="token operator">|</span> findstr ThreadStackSize
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在本文中，我们学习了 Java 应用程序可用的各种堆和栈内存配置选项的默认值。</p><p>因此，在启动我们的 Spring Boot 应用程序时，我们可以根据我们的需求定义这些参数。</p><p>对于进一步的调整选项，我们参考官方指南。另外，有关所有配置参数的列表，请参阅此文档。</p>`,34),i=[r];function p(o,l){return n(),e("div",null,i)}const h=a(s,[["render",p],["__file","2024-07-17-What Are the Spring Boot Default Memory Settings .html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-What%20Are%20the%20Spring%20Boot%20Default%20Memory%20Settings%20.html","title":"Spring Boot 默认内存设置是什么？","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Boot","Java"],"tag":["Spring Boot","Memory Settings"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Java, Memory Settings"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-What%20Are%20the%20Spring%20Boot%20Default%20Memory%20Settings%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Boot 默认内存设置是什么？"}],["meta",{"property":"og:description","content":"Spring Boot 默认内存设置是什么？ 1. 概述 在本教程中，我们将了解 Spring Boot 应用程序使用的默认内存设置。 通常，Spring 没有特定的内存配置，它运行在底层 Java 进程的配置下。因此，以下是我们可以配置 Java 应用程序内存的方式。 Java 进程或 JVM 的内存被分配到堆、栈、元空间、JIT 代码缓存和共享库中..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T19:10:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Memory Settings"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T19:10:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot 默认内存设置是什么？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T19:10:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Boot 默认内存设置是什么？ 1. 概述 在本教程中，我们将了解 Spring Boot 应用程序使用的默认内存设置。 通常，Spring 没有特定的内存配置，它运行在底层 Java 进程的配置下。因此，以下是我们可以配置 Java 应用程序内存的方式。 Java 进程或 JVM 的内存被分配到堆、栈、元空间、JIT 代码缓存和共享库中..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[{"level":3,"title":"2.1. 堆","slug":"_2-1-堆","link":"#_2-1-堆","children":[]},{"level":3,"title":"2.2. 栈","slug":"_2-2-栈","link":"#_2-2-栈","children":[]}]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1721243431000,"updatedTime":1721243431000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.46,"words":739},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-What Are the Spring Boot Default Memory Settings .md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Spring Boot 默认内存设置是什么？</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将了解 Spring Boot 应用程序使用的默认内存设置。</p>\\n<p>通常，Spring 没有特定的内存配置，它运行在底层 Java 进程的配置下。因此，以下是我们可以配置 Java 应用程序内存的方式。</p>\\n<p>Java 进程或 JVM 的内存被分配到堆、栈、元空间、JIT 代码缓存和共享库中。</p>\\n<h3>2.1. 堆</h3>\\n<p>堆是对象存放直到被垃圾收集器收集的那部分内存。</p>\\n<p>默认的最小堆大小是 <strong>8 MB 或物理内存的 1/64，范围在 8 MB 到 1 GB 之间</strong>。</p>","autoDesc":true}');export{h as comp,g as data};
