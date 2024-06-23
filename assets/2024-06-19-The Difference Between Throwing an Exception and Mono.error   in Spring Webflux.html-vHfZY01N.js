import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-j3liftxp.js";const t={},o=e(`<h1 id="spring-webflux中抛出异常与mono-error-的区别" tabindex="-1"><a class="header-anchor" href="#spring-webflux中抛出异常与mono-error-的区别"><span>Spring WebFlux中抛出异常与Mono.error()的区别</span></a></h1><p>错误处理是使用Spring WebFlux进行响应式编程的一个关键方面。开发者通常依赖两种主要方法来处理错误：抛出异常或使用Project Reactor提供的_Mono.error()_方法。这两种方法都用于信号错误，但它们具有不同的特点和用例。</p><p>在本教程中，我们将解释在Spring WebFlux中抛出异常和使用_Mono.error()_的区别。我们将提供说明性的Java代码示例，以使其更易于理解。</p><h2 id="_2-传统方法-抛出异常" tabindex="-1"><a class="header-anchor" href="#_2-传统方法-抛出异常"><span>2. 传统方法：抛出异常</span></a></h2><p>多年来，抛出异常一直是管理Java应用程序中错误的可靠方式。这是一种简单的方法，可以中断程序的正常流程，并将错误传达给应用程序的更高层。Spring WebFlux与这种传统的错误处理方法无缝集成，使开发者能够在其响应式端点中抛出异常。下面的代码代表了传统方法的一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Mono</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">getUserByIdThrowingException</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> userRepository<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>user <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NotFoundException</span><span class="token punctuation">(</span><span class="token string">&quot;用户未找到&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token class-name">Mono</span><span class="token punctuation">.</span><span class="token function">justOrEmpty</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个特定场景中，_getUserByIdThrowingException()<em>方法尝试根据_UserRepository_提供的ID检索用户数据。如果找不到用户，该方法将抛出一个_NotFoundException</em>，在响应式管道中发出错误信号。</p><p>为了进行单元测试，我们从_org.junit.jupiter.api.Assertions_导入_assertThrows_方法。这测试了如果数据库中找不到用户，_getUserByIdThrowingException()<em>是否抛出_NotFoundException</em>。我们使用带lambda的_assertThrows_来执行应该抛出异常的方法调用。</p><p>如果抛出了异常，代码将验证抛出的异常是否为预期类型。然而，如果该方法没有抛出异常，测试将失败：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenNonExistUser_whenFailureCall_then_Throws_exception</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertThrows</span><span class="token punctuation">(</span>
        <span class="token class-name">NotFoundException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>
        <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> userService<span class="token punctuation">.</span><span class="token function">getUserByIdThrowingException</span><span class="token punctuation">(</span><span class="token string">&quot;3&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-拥抱响应性-mono-error" tabindex="-1"><a class="header-anchor" href="#_3-拥抱响应性-mono-error"><span>3. 拥抱响应性：<em>Mono.error()</em></span></a></h2><p>与传统的抛出异常方法相比，Project Reactor通过_Mono.error()_方法引入了一种响应式替代方案。<strong>这个方法生成一个立即以错误信号终止的Mono，与响应式编程范式完美对齐。</strong></p><p>让我们检查使用_Mono.error()_修改后的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Mono</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">getUserByIdUsingMonoError</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> userRepository<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>user <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
      <span class="token operator">?</span> <span class="token class-name">Mono</span><span class="token punctuation">.</span><span class="token function">justOrEmpty</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
      <span class="token operator">:</span> <span class="token class-name">Mono</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">NotFoundException</span><span class="token punctuation">(</span><span class="token string">&quot;用户未找到&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了保持流畅的用户体验和一致的响应流，我们使用_Mono.error()_而不是直接抛出异常，用于处理数据库中未找到的用户。</p><p>这是这个方法的单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span> <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenNonExistUser_whenFailureCall_then_returnMonoError</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Mono</span> result <span class="token operator">=</span> userService<span class="token punctuation">.</span><span class="token function">getUserByIdUsingMonoError</span><span class="token punctuation">(</span><span class="token string">&quot;3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StepVerifier</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">expectError</span><span class="token punctuation">(</span><span class="token class-name">NotFoundException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-理解关键差异和用例" tabindex="-1"><a class="header-anchor" href="#_4-理解关键差异和用例"><span>4. 理解关键差异和用例</span></a></h2><h3 id="_4-1-控制流中断" tabindex="-1"><a class="header-anchor" href="#_4-1-控制流中断"><span>4.1. 控制流中断</span></a></h3><p>我们使用异常与try-catch或响应式操作符如_onErrorResume_、<em>onErrorReturn_或_onErrorMap</em>，当_Mono.error()_发出信号时。</p><h3 id="_4-2-延迟性" tabindex="-1"><a class="header-anchor" href="#_4-2-延迟性"><span>4.2. 延迟性</span></a></h3><p>_Mono.error()_现在支持异常的延迟实例化，这在构造异常涉及资源密集型操作的场景中是有益的。</p><h3 id="_4-3-响应式错误处理" tabindex="-1"><a class="header-anchor" href="#_4-3-响应式错误处理"><span>4.3. 响应式错误处理</span></a></h3><p>_Mono.error()_与响应式编程范式很好地对齐，促进了响应流中的响应式错误处理。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了在Spring WebFlux中使用响应式应用程序进行错误处理时，抛出异常和使用_Mono.error()_之间的基本差异；尽管这两种方法都用于信号错误，但它们在控制流和与响应式管道的集成方面有显著不同。</p><p>抛出异常中断执行流程，并将控制权转移到最近的异常处理器，适用于命令式代码路径。相反，_Mono.error()_与响应式流无缝集成，实现异步错误信号，而不会中断执行流程。</p><p>在使用Spring WebFlux开发响应式应用程序时，根据上下文和需求选择正确的错误处理机制至关重要。我们在响应式管道中使用_Mono.error()_来保持其响应式特性，我们使用异常处理命令式代码路径。如常，本教程的源代码可在GitHub上获得。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,29),p=[o];function r(c,i){return s(),a("div",null,p)}const d=n(t,[["render",r],["__file","2024-06-19-The Difference Between Throwing an Exception and Mono.error   in Spring Webflux.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-19-The%20Difference%20Between%20Throwing%20an%20Exception%20and%20Mono.error%20%20%20in%20Spring%20Webflux.html","title":"Spring WebFlux中抛出异常与Mono.error()的区别","lang":"zh-CN","frontmatter":{"date":"2024-06-19T00:00:00.000Z","category":["Spring WebFlux","Reactive Programming"],"tag":["Exception Handling","Mono.error()"],"head":[["meta",{"name":"keywords","content":"Spring WebFlux, Reactive Programming, Exception Handling, Mono.error()"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-19-The%20Difference%20Between%20Throwing%20an%20Exception%20and%20Mono.error%20%20%20in%20Spring%20Webflux.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring WebFlux中抛出异常与Mono.error()的区别"}],["meta",{"property":"og:description","content":"Spring WebFlux中抛出异常与Mono.error()的区别 错误处理是使用Spring WebFlux进行响应式编程的一个关键方面。开发者通常依赖两种主要方法来处理错误：抛出异常或使用Project Reactor提供的_Mono.error()_方法。这两种方法都用于信号错误，但它们具有不同的特点和用例。 在本教程中，我们将解释在Spri..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Exception Handling"}],["meta",{"property":"article:tag","content":"Mono.error()"}],["meta",{"property":"article:published_time","content":"2024-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring WebFlux中抛出异常与Mono.error()的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring WebFlux中抛出异常与Mono.error()的区别 错误处理是使用Spring WebFlux进行响应式编程的一个关键方面。开发者通常依赖两种主要方法来处理错误：抛出异常或使用Project Reactor提供的_Mono.error()_方法。这两种方法都用于信号错误，但它们具有不同的特点和用例。 在本教程中，我们将解释在Spri..."},"headers":[{"level":2,"title":"2. 传统方法：抛出异常","slug":"_2-传统方法-抛出异常","link":"#_2-传统方法-抛出异常","children":[]},{"level":2,"title":"3. 拥抱响应性：Mono.error()","slug":"_3-拥抱响应性-mono-error","link":"#_3-拥抱响应性-mono-error","children":[]},{"level":2,"title":"4. 理解关键差异和用例","slug":"_4-理解关键差异和用例","link":"#_4-理解关键差异和用例","children":[{"level":3,"title":"4.1. 控制流中断","slug":"_4-1-控制流中断","link":"#_4-1-控制流中断","children":[]},{"level":3,"title":"4.2. 延迟性","slug":"_4-2-延迟性","link":"#_4-2-延迟性","children":[]},{"level":3,"title":"4.3. 响应式错误处理","slug":"_4-3-响应式错误处理","link":"#_4-3-响应式错误处理","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.55,"words":1066},"filePathRelative":"posts/baeldung/Archive/2024-06-19-The Difference Between Throwing an Exception and Mono.error   in Spring Webflux.md","localizedDate":"2024年6月19日","excerpt":"\\n<p>错误处理是使用Spring WebFlux进行响应式编程的一个关键方面。开发者通常依赖两种主要方法来处理错误：抛出异常或使用Project Reactor提供的_Mono.error()_方法。这两种方法都用于信号错误，但它们具有不同的特点和用例。</p>\\n<p>在本教程中，我们将解释在Spring WebFlux中抛出异常和使用_Mono.error()_的区别。我们将提供说明性的Java代码示例，以使其更易于理解。</p>\\n<h2>2. 传统方法：抛出异常</h2>\\n<p>多年来，抛出异常一直是管理Java应用程序中错误的可靠方式。这是一种简单的方法，可以中断程序的正常流程，并将错误传达给应用程序的更高层。Spring WebFlux与这种传统的错误处理方法无缝集成，使开发者能够在其响应式端点中抛出异常。下面的代码代表了传统方法的一个例子：</p>","autoDesc":true}');export{d as comp,k as data};
