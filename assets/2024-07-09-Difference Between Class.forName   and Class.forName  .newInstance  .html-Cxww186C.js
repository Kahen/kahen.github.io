import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-uizvaz9h.js";const t={},o=e(`<h1 id="java中class-forname-与class-forname-newinstance-的区别" tabindex="-1"><a class="header-anchor" href="#java中class-forname-与class-forname-newinstance-的区别"><span>Java中Class.forName()与Class.forName().newInstance()的区别</span></a></h1><p>在Java中，动态加载类是指在运行时而不是编译时将类加载到Java虚拟机中。这种方法在某些情况下非常有用，例如我们不知道编译时的类名，或者类加载基于用户输入或系统属性。</p><p>有几种在Java中动态加载类的方法，包括_Class.forName()_方法、_ClassLoader API_和依赖注入框架。</p><p>在本文中，我们将考虑_Class.forName()_和_Class.forName().newInstance()_方法，这些方法在Java应用程序中常用，并且对开发人员来说理解它们至关重要。</p><h2 id="_2-class-forname-方法" tabindex="-1"><a class="header-anchor" href="#_2-class-forname-方法"><span>2. _Class.forName()_方法</span></a></h2><p>_Class.forName()_方法接受类的完全限定名作为参数，并<strong>返回与加载的类关联的_Class_对象</strong>。在执行过程中，它尝试定位、加载和链接类或接口。它通常用于我们想要获取类的信息，例如字段和方法。然而，我们需要注意的是，<strong>类没有被初始化，调用它的方法是不可能的</strong>。</p><p>让我们编写一个使用_Class.forName()_方法的快速测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUseClassForNameCreatedInstanceOfClassClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">{</span>
   <span class="token class-name">Class</span> instance <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">&quot;com.baeldung.loadclass.MyClassForLoad&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token function">assertInstanceOf</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> instance<span class="token punctuation">,</span> <span class="token string">&quot;instance should be of Class.class&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样重要的是要记住，<strong>动态加载方法不会验证请求类的可访问性</strong>，这可能导致与加载、链接或初始化相关的潜在异常。正确处理它们对于避免意外行为和潜在崩溃至关重要：</p><ul><li><em>LinkageError –</em> 如果链接失败</li><li><em>ExceptionInInitializerError –</em> 如果初始化失败</li><li><em>ClassNotFoundException –</em> 如果找不到类</li></ul><h2 id="_3-class-forname-newinstance-方法" tabindex="-1"><a class="header-anchor" href="#_3-class-forname-newinstance-方法"><span>3. _Class.forName().newInstance()_方法</span></a></h2><p>当我们想要创建一个类的实例时，_Class.forName().newInstance()_方法就派上用场了。这个方法也接受类的完全限定名作为参数，并<strong>返回这个_Class_对象表示的类的一个新的实例</strong>。它就像使用空参数列表调用_MyClassForLoad_的新运算符一样。</p><p>让我们看看在单元测试中使用_Class.forName().newInstance()_方法的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> whenUseClassForNameWithNewInstanceCreatedInstanceOfTargetClass <span class="token keyword">throws</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token class-name">Object</span> instance <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">&quot;com.baeldung.loadclass.MyClassForLoad&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token function">assertInstanceOf</span><span class="token punctuation">(</span><span class="token class-name">MyClassForLoad</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> instance<span class="token punctuation">,</span> <span class="token string">&quot;instance should be of MyClassForLoad.class&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请记住，_Class.forName().newInstance()_可能会抛出几种异常：</p><ul><li><em>IllegalAccessException –</em> 如果类或其无参构造函数不可访问</li><li><em>InstantiationException –</em> 如果这个类表示一抽象类、接口、数组类、原始类型或_void_</li><li><em>ExceptionInInitializerError –</em> 如果由这个方法触发的初始化失败</li><li><em>SecurityException –</em> 当调用代码没有足够的权限访问指定的类时</li></ul><p>然而，重要的是要注意，<strong>_newInstance()_自Java 9起已被弃用</strong>，因为它传播了无参构造函数抛出的任何异常，包括检查异常。这个方法有效地绕过了编译器执行的编译时异常检查。因此，它可能导致意外的错误或漏洞，以及不那么健壮和可维护的代码库。</p><p><strong>建议调用_getDeclaredConstructor().newInstance()_</strong> <strong>构造</strong>以避免这个问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Object</span> instance <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">&quot;com.baeldung.loadclass.MyClassForLoad&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDeclaredConstructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>开发人员必须对Java中动态类加载的工作原理有深入的理解。它提供了许多好处，可以帮助提高Java应用程序的性能、可维护性和可扩展性。</p><p>在本文中，我们了解到_Class.forName()_和_Class.forName().newInstance()_是Java中的两个关键方法，允许我们在运行时加载类。这些方法之间的区别在于它们的作用和返回的内容。</p><p><strong>_Class.forName()_动态加载类并返回_Class_对象，而_Class.forName().newInstance()_加载类并创建加载类的实例。</strong></p><p>理解这些方法及其差异至关重要，因为它们经常在现实世界的场景中使用：</p><ul><li>插件开发</li><li>像Spring或Guice这样的依赖注入框架</li><li>根据使用的数据库加载JDBC驱动程序</li><li>根据输入参数加载类</li></ul><p>最后，通过了解_Class.forName()_和_Class.forName().newInstance()_之间的区别，开发人员可以做出明智的决策，如何在他们的Java项目中动态加载类，从而实现更有效和高效的代码。</p><p>完整的源代码可在GitHub上找到。</p><p>OK</p>`,28),l=[o];function p(c,i){return s(),n("div",null,l)}const m=a(t,[["render",p],["__file","2024-07-09-Difference Between Class.forName   and Class.forName  .newInstance  .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Difference%20Between%20Class.forName%20%20%20and%20Class.forName%20%20.newInstance%20%20.html","title":"Java中Class.forName()与Class.forName().newInstance()的区别","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","编程"],"tag":["Class.forName()","newInstance()"],"head":[["meta",{"name":"keywords","content":"Java,动态类加载,反射,newInstance,Class对象"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Difference%20Between%20Class.forName%20%20%20and%20Class.forName%20%20.newInstance%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中Class.forName()与Class.forName().newInstance()的区别"}],["meta",{"property":"og:description","content":"Java中Class.forName()与Class.forName().newInstance()的区别 在Java中，动态加载类是指在运行时而不是编译时将类加载到Java虚拟机中。这种方法在某些情况下非常有用，例如我们不知道编译时的类名，或者类加载基于用户输入或系统属性。 有几种在Java中动态加载类的方法，包括_Class.forName()_方..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T08:42:20.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Class.forName()"}],["meta",{"property":"article:tag","content":"newInstance()"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T08:42:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中Class.forName()与Class.forName().newInstance()的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T08:42:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中Class.forName()与Class.forName().newInstance()的区别 在Java中，动态加载类是指在运行时而不是编译时将类加载到Java虚拟机中。这种方法在某些情况下非常有用，例如我们不知道编译时的类名，或者类加载基于用户输入或系统属性。 有几种在Java中动态加载类的方法，包括_Class.forName()_方..."},"headers":[{"level":2,"title":"2. _Class.forName()_方法","slug":"_2-class-forname-方法","link":"#_2-class-forname-方法","children":[]},{"level":2,"title":"3. _Class.forName().newInstance()_方法","slug":"_3-class-forname-newinstance-方法","link":"#_3-class-forname-newinstance-方法","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720514540000,"updatedTime":1720514540000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.52,"words":1055},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Difference Between Class.forName   and Class.forName  .newInstance  .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在Java中，动态加载类是指在运行时而不是编译时将类加载到Java虚拟机中。这种方法在某些情况下非常有用，例如我们不知道编译时的类名，或者类加载基于用户输入或系统属性。</p>\\n<p>有几种在Java中动态加载类的方法，包括_Class.forName()_方法、_ClassLoader API_和依赖注入框架。</p>\\n<p>在本文中，我们将考虑_Class.forName()_和_Class.forName().newInstance()_方法，这些方法在Java应用程序中常用，并且对开发人员来说理解它们至关重要。</p>\\n<h2>2. _Class.forName()_方法</h2>","autoDesc":true}');export{m as comp,d as data};
