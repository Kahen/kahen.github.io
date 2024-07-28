import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as i,a as n}from"./app-D4B8YWfq.js";const l={},a=n('<h1 id="rxjava-single-just-与-single-fromcallable-的比较" tabindex="-1"><a class="header-anchor" href="#rxjava-single-just-与-single-fromcallable-的比较"><span>RxJava Single.just() 与 Single.fromCallable() 的比较</span></a></h1><p>在这篇简短的教程中，我们将比较在RxJava中创建一个_Single_对象的两种流行方式，并将使用_TestSubscriber_来测试这些实现。首先，我们将看到_Single.just()<em>工厂方法，并急切地使用它来创建对象的实例。之后，我们将学习_Single.fromCallable()</em>，并看看如何使用它来提高性能。</p><p>_Single.just()_是创建一个_Observable_实例的直接方式。它接受一个对象作为参数，并将其包装在RxJava的_Single_中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Single```````&lt;String&gt;``````` employee = Single.just(&quot;John Doe&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，大多数情况下，我们会以某种方式检索或计算这些数据。为了演示，让我们假设我们正在从_EmployeeRepository_类中检索员工的姓名。为了测试，我们将使用Mockito来检查与这个仓库的交互，并使用_TestSubscriber_来测试由此产生的可观察值发布的值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenASubscriber_whenUsingJust_thenReturnTheCorrectValue() {\n    TestSubscriber```````&lt;String&gt;``````` testSubscriber = new TestSubscriber&lt;&gt;();\n    Mockito.when(repository.findById(123L)).thenReturn(&quot;John Doe&quot;);\n\n    Single```````&lt;String&gt;``````` employee = Single.just(repository.findById(123L));\n    employee.subscribe(testSubscriber);\n\n    testSubscriber.assertValue(&quot;John Doe&quot;);\n    testSubscriber.assertCompleted();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，_testSubscriber_发布的值与仓库返回的值相同。另一方面，即使没有订阅者，数据仍然会被检索。让我们使用Mockito来验证与_EmployeeRepostory_的交互次数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenNoSubscriber_whenUsingJust_thenDataIsFetched() {\n    Mockito.when(repository.findById(123L)).thenReturn(&quot;John Doe&quot;);\n\n    Single```````&lt;String&gt;``````` employee = Single.just(repository.findById(123L));\n\n    Mockito.verify(repository, times(1)).findById(123L);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-single-fromcallable" tabindex="-1"><a class="header-anchor" href="#_3-single-fromcallable"><span>3. <em>Single.fromCallable()</em></span></a></h3><p>作为替代方案，我们可以使用_Single.fromCallable()_。在这种情况下，我们需要提供一个_Callable_接口的实现或一个lambda表达式。换句话说，我们可以传递一个将检索数据的函数，并且这个函数只有在有人订阅时才会被调用。因此，如果没有订阅者，就不会与_仓库_交互：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenNoSubscriber_whenUsingFromCallable_thenNoDataIsFetched() {\n    Single```````&lt;String&gt;``````` employee = Single.fromCallable(() -&gt; repository.findById(123L));\n\n    Mockito.verify(repository, never()).findById(123L);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是，一旦有人订阅了_employee_，数据就会被检索然后发布。让我们添加另一个测试并检查结果的_Single_对象是否发布了正确的值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenASubscriber_whenUsingFromCallable_thenReturnCorrectValue() {\n    TestSubscriber```````&lt;String&gt;``````` testSubscriber = new TestSubscriber&lt;&gt;();\n    Mockito.when(repository.findById(123L)).thenReturn(&quot;John Doe&quot;);\n\n    Single```````&lt;String&gt;``````` employee = Single.fromCallable(() -&gt; repository.findById(123L));\n    employee.subscribe(testSubscriber);\n\n    Mockito.verify(repository, times(1)).findById(123L);\n    testSubscriber.assertCompleted();\n    testSubscriber.assertValue(&quot;John Doe&quot;);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在这篇文章中，我们比较了_Single_的_just()_和_fromCallable()_工厂方法。我们了解到，如果我们想要利用懒加载评估来获取数据，我们应该使用_fromCallable()_选项。</p><p>项目的全部源代码，包括这里使用的所有代码示例，可以在GitHub上找到。</p>',16),s=[a];function r(o,d){return i(),t("div",null,s)}const m=e(l,[["render",r],["__file","2024-07-11-RxJava Single.just   vs Single.fromCallable  .html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-RxJava%20Single.just%20%20%20vs%20Single.fromCallable%20%20.html","title":"RxJava Single.just() 与 Single.fromCallable() 的比较","lang":"zh-CN","frontmatter":{"date":"2024-07-11T00:00:00.000Z","category":["RxJava","编程"],"tag":["RxJava","编程","性能优化"],"head":[["meta",{"name":"keywords","content":"RxJava, Single.just(), Single.fromCallable(), 性能优化, 编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-RxJava%20Single.just%20%20%20vs%20Single.fromCallable%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"RxJava Single.just() 与 Single.fromCallable() 的比较"}],["meta",{"property":"og:description","content":"RxJava Single.just() 与 Single.fromCallable() 的比较 在这篇简短的教程中，我们将比较在RxJava中创建一个_Single_对象的两种流行方式，并将使用_TestSubscriber_来测试这些实现。首先，我们将看到_Single.just()工厂方法，并急切地使用它来创建对象的实例。之后，我们将学习_Sin..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T15:01:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"RxJava"}],["meta",{"property":"article:tag","content":"编程"}],["meta",{"property":"article:tag","content":"性能优化"}],["meta",{"property":"article:published_time","content":"2024-07-11T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T15:01:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"RxJava Single.just() 与 Single.fromCallable() 的比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-11T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T15:01:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"RxJava Single.just() 与 Single.fromCallable() 的比较 在这篇简短的教程中，我们将比较在RxJava中创建一个_Single_对象的两种流行方式，并将使用_TestSubscriber_来测试这些实现。首先，我们将看到_Single.just()工厂方法，并急切地使用它来创建对象的实例。之后，我们将学习_Sin..."},"headers":[{"level":3,"title":"3. Single.fromCallable()","slug":"_3-single-fromcallable","link":"#_3-single-fromcallable","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720710119000,"updatedTime":1720710119000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.16,"words":648},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-RxJava Single.just   vs Single.fromCallable  .md","localizedDate":"2024年7月11日","excerpt":"\\n<p>在这篇简短的教程中，我们将比较在RxJava中创建一个_Single_对象的两种流行方式，并将使用_TestSubscriber_来测试这些实现。首先，我们将看到_Single.just()<em>工厂方法，并急切地使用它来创建对象的实例。之后，我们将学习_Single.fromCallable()</em>，并看看如何使用它来提高性能。</p>\\n<p>_Single.just()_是创建一个_Observable_实例的直接方式。它接受一个对象作为参数，并将其包装在RxJava的_Single_中：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>Single```````&lt;String&gt;``````` employee = Single.just(\\"John Doe\\");\\n</code></pre></div>","autoDesc":true}');export{m as comp,v as data};
