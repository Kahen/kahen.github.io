import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-CJGTm_7y.js";const i={},l=a('<h1 id="mathflux-在-spring-响应式编程中的使用" tabindex="-1"><a class="header-anchor" href="#mathflux-在-spring-响应式编程中的使用"><span>MathFlux 在 Spring 响应式编程中的使用</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Spring 响应式编程引入了一种新时代的应用，这些应用既响应迅速又可扩展。Project Reactor 是一个在该生态系统中管理异步和事件驱动编程的卓越工具包。</p><p>MathFlux 是 Project Reactor 的一个组件，它为我们提供了各种为响应式编程设计的数学函数。</p><p>在本教程中，我们将探索 Project Reactor 的 MathFlux 模块，并了解如何利用它在响应式流上执行各种数学运算。</p><h2 id="_2-maven-依赖" tabindex="-1"><a class="header-anchor" href="#_2-maven-依赖"><span>2. Maven 依赖</span></a></h2><p>让我们在我们的 IDE 中创建一个 Spring Boot 项目，并将 <em>reactor-core</em> 和 <em>reactor-extra</em> 依赖项添加到 <em>pom.xml</em> 文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```io.projectreactor```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```reactor-core```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```3.6.0```&lt;/version&gt;```\n```&lt;/dependency&gt;```\n\n```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```io.projectreactor.addons```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```reactor-extra```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```3.6.0```&lt;/version&gt;```\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们还需要包括 <em>reactor-test</em> 以有效地测试我们的代码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```io.projectreactor```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```reactor-test```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```3.6.0```&lt;/version&gt;```\n    `&lt;scope&gt;`test`&lt;/scope&gt;`\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用-mathflux-的-基本数学函数" tabindex="-1"><a class="header-anchor" href="#_3-使用-mathflux-的-基本数学函数"><span>3. 使用 MathFlux 的 <strong>基本数学函数</strong></span></a></h2><p>MathFlux 中的大多数函数需要输入基数大于一，并产生基数为一的输出。</p><p><strong>这些函数通常接受一个 <em>Flux</em> 作为输入，并返回一个 <em>Mono</em> 作为输出。</strong></p><p><em>reactor.math</em> 包包括一个名为 <em>MathFlux</em> 的静态类，这是一个包含数学运算符的 <em>Flux</em> 特化版本，例如 <em>max()</em>、<em>min()</em>、<em>sumInt()</em> 和 <em>averageDouble()</em>。</p><p>我们可以通过调用其相关方法来使用 <em>MathFlux</em> 类执行数学运算。</p><p>让我们详细探索 MathFlux 基本数学函数。</p><h3 id="_3-1-求和" tabindex="-1"><a class="header-anchor" href="#_3-1-求和"><span>3.1. 求和</span></a></h3><p><em>sumInt()</em> 方法计算 <em>Flux</em> 中整数元素的总和。它简化了在响应式流中添加数值的过程。</p><p>我们现在将为 <em>sumInt()</em> 方法创建一个单元测试。我们将使用 <em>StepVerifier</em> 来测试我们的代码。</p><p>这个单元测试确保 <em>sumInt()</em> 方法准确地计算给定 <em>Flux</em> 中元素的总和，并验证实现的正确性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenFluxOfNumbers_whenCalculatingSum_thenExpectCorrectResult() {\n    Flux````````&lt;Integer&gt;```````` numbers = Flux.just(1, 2, 3, 4, 5);\n    Mono````````&lt;Integer&gt;```````` sumMono = MathFlux.sumInt(numbers);\n    StepVerifier.create(sumMono)\n      .expectNext(15)\n      .verifyComplete();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们首先创建一个表示数据集的整数 <em>Flux</em>。然后，这个 <em>Flux</em> 作为参数传递给 <em>sumInt()</em> 方法。</p><h3 id="_3-2-平均值" tabindex="-1"><a class="header-anchor" href="#_3-2-平均值"><span>3.2. 平均值</span></a></h3><p><em>averageDouble()</em> 方法计算 <em>Flux</em> 中整数元素的平均值，这有助于计算输入的平均值。</p><p>这个单元测试计算从 <em>1</em> 到 <em>5</em> 的整数的平均值，并将其与预期结果 <em>3</em> 进行比较：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenFluxOfNumbers_whenCalculatingAverage_thenExpectCorrectResult() {\n    Flux````````&lt;Integer&gt;```````` numbers = Flux.just(1, 2, 3, 4, 5);\n    Mono`&lt;Double&gt;` averageMono = MathFlux.averageDouble(numbers);\n    StepVerifier.create(averageMono)\n      .expectNext(3.0)\n      .verifyComplete();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-最小值" tabindex="-1"><a class="header-anchor" href="#_3-3-最小值"><span>3.3. 最小值</span></a></h3><p><em>min()</em> 方法确定 <em>Flux</em> 中整数的最小值。</p><p>这个单元测试旨在验证 <em>min()</em> 方法的功能：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenFluxOfNumbers_whenFindingMinElement_thenExpectCorrectResult() {\n    Flux````````&lt;Integer&gt;```````` numbers = Flux.just(3, 1, 5, 2, 4);\n    Mono````````&lt;Integer&gt;```````` minMono = MathFlux.min(numbers);\n    StepVerifier.create(minMono)\n      .expectNext(1)\n      .verifyComplete();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-最大值" tabindex="-1"><a class="header-anchor" href="#_3-4-最大值"><span>3.4. 最大值</span></a></h3><p>我们可以使用 MathFlux 中的 <em>max()</em> 函数找到最高元素。输出封装在一个 <em>Mono<code>&lt;Integer&gt;</code></em> 中，它代表一个发出单个 <em>Integer</em> 结果的响应式流。</p><p>这个单元测试验证了在 <em>Flux</em> 中正确识别最大整数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenFluxOfNumbers_whenFindingMaxElement_thenExpectCorrectResult() {\n    Flux````````&lt;Integer&gt;```````` numbers = Flux.just(3, 1, 5, 2, 4);\n    Mono````````&lt;Integer&gt;```````` maxMono = MathFlux.max(numbers);\n    StepVerifier.create(maxMono)\n      .expectNext(5)\n      .verifyComplete();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个单元测试中的给定 <em>Flux</em> 包含 <em>3</em>、<em>1</em>、<em>5</em>、<em>2</em> 和 <em>4</em>。<em>max()</em> 方法的目的是识别最大元素，在这个例子中是 <em>5</em>。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们讨论了在 Spring 响应式编程中使用 MathFlux 的方法。通过利用其功能，我们可以简化响应式应用程序中的复杂数学任务。我们看到 MathFlux 使我们能够无缝地管理复杂的数据处理，使 Spring 响应式应用程序更加直观和健壮。</p><p>如常，本教程的源代码可在 GitHub 上获取。</p>',38),r=[l];function s(d,m){return n(),t("div",null,r)}const u=e(i,[["render",s],["__file","2024-06-27-Working With MathFlux.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Working%20With%20MathFlux.html","title":"MathFlux 在 Spring 响应式编程中的使用","lang":"zh-CN","frontmatter":{"date":"2024-06-28T00:00:00.000Z","category":["Spring","Reactive Programming"],"tag":["MathFlux","Project Reactor"],"head":[["meta",{"name":"keywords","content":"Spring, Reactive Programming, MathFlux, Project Reactor"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Working%20With%20MathFlux.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"MathFlux 在 Spring 响应式编程中的使用"}],["meta",{"property":"og:description","content":"MathFlux 在 Spring 响应式编程中的使用 1. 概述 Spring 响应式编程引入了一种新时代的应用，这些应用既响应迅速又可扩展。Project Reactor 是一个在该生态系统中管理异步和事件驱动编程的卓越工具包。 MathFlux 是 Project Reactor 的一个组件，它为我们提供了各种为响应式编程设计的数学函数。 在本教..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T23:51:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MathFlux"}],["meta",{"property":"article:tag","content":"Project Reactor"}],["meta",{"property":"article:published_time","content":"2024-06-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T23:51:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MathFlux 在 Spring 响应式编程中的使用\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T23:51:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"MathFlux 在 Spring 响应式编程中的使用 1. 概述 Spring 响应式编程引入了一种新时代的应用，这些应用既响应迅速又可扩展。Project Reactor 是一个在该生态系统中管理异步和事件驱动编程的卓越工具包。 MathFlux 是 Project Reactor 的一个组件，它为我们提供了各种为响应式编程设计的数学函数。 在本教..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Maven 依赖","slug":"_2-maven-依赖","link":"#_2-maven-依赖","children":[]},{"level":2,"title":"3. 使用 MathFlux 的 基本数学函数","slug":"_3-使用-mathflux-的-基本数学函数","link":"#_3-使用-mathflux-的-基本数学函数","children":[{"level":3,"title":"3.1. 求和","slug":"_3-1-求和","link":"#_3-1-求和","children":[]},{"level":3,"title":"3.2. 平均值","slug":"_3-2-平均值","link":"#_3-2-平均值","children":[]},{"level":3,"title":"3.3. 最小值","slug":"_3-3-最小值","link":"#_3-3-最小值","children":[]},{"level":3,"title":"3.4. 最大值","slug":"_3-4-最大值","link":"#_3-4-最大值","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719532314000,"updatedTime":1719532314000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.16,"words":948},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Working With MathFlux.md","localizedDate":"2024年6月28日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>Spring 响应式编程引入了一种新时代的应用，这些应用既响应迅速又可扩展。Project Reactor 是一个在该生态系统中管理异步和事件驱动编程的卓越工具包。</p>\\n<p>MathFlux 是 Project Reactor 的一个组件，它为我们提供了各种为响应式编程设计的数学函数。</p>\\n<p>在本教程中，我们将探索 Project Reactor 的 MathFlux 模块，并了解如何利用它在响应式流上执行各种数学运算。</p>\\n<h2>2. Maven 依赖</h2>\\n<p>让我们在我们的 IDE 中创建一个 Spring Boot 项目，并将 <em>reactor-core</em> 和 <em>reactor-extra</em> 依赖项添加到 <em>pom.xml</em> 文件中：</p>","autoDesc":true}');export{u as comp,p as data};
