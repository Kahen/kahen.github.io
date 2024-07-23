import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-on0L14Tx.js";const i={},l=n('<h1 id="spring-6中的提前优化" tabindex="-1"><a class="header-anchor" href="#spring-6中的提前优化"><span>Spring 6中的提前优化</span></a></h1><p>Spring 6带来了一项新特性，承诺可以优化应用程序的性能：提前编译（Ahead-of-Time，AOT）支持。</p><p>在本文中，我们将探讨Spring 6的AOT优化特性如何工作，它的优势以及如何使用它。</p><h2 id="_2-提前编译" tabindex="-1"><a class="header-anchor" href="#_2-提前编译"><span>2. 提前编译</span></a></h2><h3 id="_2-1-即时编译器-jit" tabindex="-1"><a class="header-anchor" href="#_2-1-即时编译器-jit"><span>2.1. 即时编译器（JIT）</span></a></h3><p>对于最常用的Java虚拟机（JVM），比如Oracle的HotSpot JVM和OpenJDK，当我们编译源代码（.java文件）时，生成的字节码存储在.class文件中。这样，<strong>JVM使用即时编译器（JIT）将字节码转换为机器代码。</strong></p><p>此外，即时编译包括JVM对字节码的解释以及在运行时将频繁执行的代码动态编译为本地机器代码。</p><h3 id="_2-2-提前编译器-aot" tabindex="-1"><a class="header-anchor" href="#_2-2-提前编译器-aot"><span>2.2. 提前编译器（AOT）</span></a></h3><p><strong>提前编译（AOT）是一种技术，它在应用程序运行之前将字节码预编译为本地机器代码。</strong></p><p>Java虚拟机通常不支持此功能。然而，Oracle已经为HotSpot JVM在OpenJDK项目中发布了一个名为“GraalVM Native Image”的实验性AOT特性，允许提前编译。</p><p>预编译代码后，计算机的处理器可以直接执行它，消除了JVM解释字节码的需要，并提高了启动时间。</p><p>在本文中，我们不会详细查看AOT编译器。请参阅我们其他文章以获取提前编译（AOT）的概述。</p><h2 id="_3-spring-6中的aot" tabindex="-1"><a class="header-anchor" href="#_3-spring-6中的aot"><span>3. Spring 6中的AOT</span></a></h2><h3 id="_3-1-aot优化" tabindex="-1"><a class="header-anchor" href="#_3-1-aot优化"><span>3.1. AOT优化</span></a></h3><p>当我们构建Spring 6应用程序时，需要考虑三种不同的运行时选项：</p><ul><li>在JRE上运行的传统Spring应用程序。</li><li>在编译的AOT阶段生成代码并在JRE上运行。</li><li>在编译的AOT阶段生成代码并在GraalVM本地映像中运行。</li></ul><p>让我们考虑第二个选项，这是Spring 6的全新特性（第一个是传统构建，最后一个是本地映像）。</p><p>首先，我们需要设置环境，为AOT编译做好准备。</p><p><strong>通过AOT编译构建应用程序在性能和资源消耗方面有多个优势：</strong></p><ul><li>死代码消除：AOT编译器可以消除在运行时从未执行过的代码。这可以通过减少需要执行的代码量来提高性能。</li><li>内联：内联是一种技术，AOT编译器用函数的实际代码替换函数调用。这可以通过减少函数调用的开销来提高性能。</li><li>常量传播：AOT编译器通过用编译时可以确定的常量值替换变量来优化性能。这消除了运行时计算的需要，并提高了性能。</li><li>跨过程优化：AOT编译器可以通过分析程序的调用图来跨多个函数优化代码。这可以通过减少函数调用的开销和识别公共子表达式来提高性能。</li><li>Bean定义：Spring 6中的AOT编译器通过削减不必要的_BeanDefinition_实例来提高应用程序效率。</li></ul><p>让我们使用命令构建具有AOT优化的应用程序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mvn clean compile spring-boot:process-aot package\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后使用命令运行应用程序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>java -Dspring.aot.enabled=true -jar `&lt;jar-name&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以通过设置构建插件来默认启用AOT编译：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;plugin&gt;``\n     ``&lt;groupId&gt;``org.springframework.boot``&lt;/groupId&gt;``\n     ``&lt;artifactId&gt;``spring-boot-maven-plugin``&lt;/artifactId&gt;``\n     `&lt;executions&gt;`\n	`&lt;execution&gt;`\n	    `&lt;id&gt;`process-aot`&lt;/id&gt;`\n	    `&lt;goals&gt;`\n		 `&lt;goal&gt;`process-aot`&lt;/goal&gt;`\n	    `&lt;/goals&gt;`\n	`&lt;/execution&gt;`\n     `&lt;/executions&gt;`\n``&lt;/plugin&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-aot优化中的问题" tabindex="-1"><a class="header-anchor" href="#_3-2-aot优化中的问题"><span>3.2. AOT优化中的问题</span></a></h3><p>当我们决定使用AOT编译构建我们的应用程序时，我们可能会遇到一些问题，例如：</p><ul><li>反射：它允许代码在编译时未知的动态调用方法和访问字段。AOT编译器无法确定动态调用的类和方法。</li><li>属性文件：属性文件的内容可以在运行时更改。AOT编译器无法动态确定使用的属性文件。</li><li>代理：代理通过提供代理或占位符来控制对另一个对象的访问。由于代理可以用于动态重定向方法调用到其他对象，这可能使AOT编译器难以确定运行时将调用哪些类和方法。</li><li>序列化：序列化将对象的状态转换为字节流，之亦然。总体上，这可能使AOT编译器难以确定运行时将调用哪些类和方法。</li></ul><p>为了确定哪些类在Spring应用程序中引起问题，我们可以运行一个代理，提供有关反射操作的信息。</p><p>让我们配置Maven插件以包括一个JVM参数来协助此操作。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;plugin&gt;``\n    ``&lt;groupId&gt;``org.springframework.boot``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``spring-boot-maven-plugin``&lt;/artifactId&gt;``\n    `&lt;configuration&gt;`\n        `&lt;jvmArguments&gt;`\n            -agentlib:native-image-agent=config-output-dir=target/native-image\n        `&lt;/jvmArguments&gt;`\n    `&lt;/configuration&gt;`\n    `&lt;!- ... --&gt;`\n``&lt;/plugin&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用命令运行它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>./mvnw -DskipTests clean package spring-boot:run\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在<code>target/native-image/</code>中，我们将找到生成的文件，如_reflect-config.json_, _resource-config.json_等。</p><p>如果在此文件中定义了某些内容，那么是时候定义_运行时提示_以允许正确编译可执行文件了。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们介绍了Spring 6的新AOT优化特性。</p><p>如往常一样，示例的完整源代码可以在GitHub上找到。抱歉，由于原文内容较长，我将接着翻译剩余部分。</p><h2 id="_4-结论-1" tabindex="-1"><a class="header-anchor" href="#_4-结论-1"><span>4. 结论</span></a></h2><p>在本文中，我们介绍了Spring 6的新AOT优化特性。</p><p>正如往常一样，示例的完整源代码可以在GitHub上找到。</p><p><a href="kimi://action?name=cheer-on-kimi">给Kimi加油</a></p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>',45),r=[l];function s(o,p){return a(),t("div",null,r)}const c=e(i,[["render",s],["__file","2024-07-10-Ahead of Time Optimizations in Spring 6.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Ahead%20of%20Time%20Optimizations%20in%20Spring%206.html","title":"Spring 6中的提前优化","lang":"zh-CN","frontmatter":{"date":"2024-07-10T00:00:00.000Z","category":["Spring Framework","Java"],"tag":["AOT","Spring 6","Performance Optimization"],"head":[["meta",{"name":"keywords","content":"Spring 6, AOT, 性能优化, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Ahead%20of%20Time%20Optimizations%20in%20Spring%206.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring 6中的提前优化"}],["meta",{"property":"og:description","content":"Spring 6中的提前优化 Spring 6带来了一项新特性，承诺可以优化应用程序的性能：提前编译（Ahead-of-Time，AOT）支持。 在本文中，我们将探讨Spring 6的AOT优化特性如何工作，它的优势以及如何使用它。 2. 提前编译 2.1. 即时编译器（JIT） 对于最常用的Java虚拟机（JVM），比如Oracle的HotSpot ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T06:01:13.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"AOT"}],["meta",{"property":"article:tag","content":"Spring 6"}],["meta",{"property":"article:tag","content":"Performance Optimization"}],["meta",{"property":"article:published_time","content":"2024-07-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T06:01:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring 6中的提前优化\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2024-07-10T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T06:01:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring 6中的提前优化 Spring 6带来了一项新特性，承诺可以优化应用程序的性能：提前编译（Ahead-of-Time，AOT）支持。 在本文中，我们将探讨Spring 6的AOT优化特性如何工作，它的优势以及如何使用它。 2. 提前编译 2.1. 即时编译器（JIT） 对于最常用的Java虚拟机（JVM），比如Oracle的HotSpot ..."},"headers":[{"level":2,"title":"2. 提前编译","slug":"_2-提前编译","link":"#_2-提前编译","children":[{"level":3,"title":"2.1. 即时编译器（JIT）","slug":"_2-1-即时编译器-jit","link":"#_2-1-即时编译器-jit","children":[]},{"level":3,"title":"2.2. 提前编译器（AOT）","slug":"_2-2-提前编译器-aot","link":"#_2-2-提前编译器-aot","children":[]}]},{"level":2,"title":"3. Spring 6中的AOT","slug":"_3-spring-6中的aot","link":"#_3-spring-6中的aot","children":[{"level":3,"title":"3.1. AOT优化","slug":"_3-1-aot优化","link":"#_3-1-aot优化","children":[]},{"level":3,"title":"3.2. AOT优化中的问题","slug":"_3-2-aot优化中的问题","link":"#_3-2-aot优化中的问题","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论-1","link":"#_4-结论-1","children":[]}],"git":{"createdTime":1720591273000,"updatedTime":1720591273000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.76,"words":1429},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Ahead of Time Optimizations in Spring 6.md","localizedDate":"2024年7月10日","excerpt":"\\n<p>Spring 6带来了一项新特性，承诺可以优化应用程序的性能：提前编译（Ahead-of-Time，AOT）支持。</p>\\n<p>在本文中，我们将探讨Spring 6的AOT优化特性如何工作，它的优势以及如何使用它。</p>\\n<h2>2. 提前编译</h2>\\n<h3>2.1. 即时编译器（JIT）</h3>\\n<p>对于最常用的Java虚拟机（JVM），比如Oracle的HotSpot JVM和OpenJDK，当我们编译源代码（.java文件）时，生成的字节码存储在.class文件中。这样，<strong>JVM使用即时编译器（JIT）将字节码转换为机器代码。</strong></p>\\n","autoDesc":true}');export{c as comp,m as data};
