import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as s}from"./app-BUAgDejY.js";const i={},e=s(`<hr><h1 id="java中-final-static-与-static-final-的区别" tabindex="-1"><a class="header-anchor" href="#java中-final-static-与-static-final-的区别"><span>Java中“final static”与“static final”的区别</span></a></h1><p>关键词_final_和_static_在Java中有不同的含义，但它们可以一起使用来声明一个常量变量。</p><p>在本教程中，我们将讨论_final static_和_static final_之间的区别。</p><h2 id="_2-final-和-static-简要概述" tabindex="-1"><a class="header-anchor" href="#_2-final-和-static-简要概述"><span><strong>2. <em>final_和_static</em>：简要概述</strong></span></a></h2><p>_final_关键字表示一个变量一旦被初始化就不能重新赋值。这对于防止对重要变量的意外更改非常有用。</p><p>_static_关键字表示一个变量属于类本身，而不是类的任何特定实例。这意味着<strong>只有一个变量副本，由类的所有实例共享</strong>。</p><h2 id="_3-static-和-final-的顺序" tabindex="-1"><a class="header-anchor" href="#_3-static-和-final-的顺序"><span>3. _static_和_final_的顺序</span></a></h2><p>当我们结合使用_final_和_static_关键字时，我们创建了一个既是常量又是类级别的变量。这意味着它不能被重新赋值，并且由类的所有实例共享。</p><p>理解声明常量变量时_static_和_final_的顺序至关重要。尽管广泛接受使用_both <em>static final</em> and <em>final static</em>，但一些编码标准和工具，如Sonar和Checkstyle，可能会强制执行_static final_的顺序。因此，<strong>遵循_static final_顺序是确保代码一致性的好习惯</strong>。</p><p>让我们举例说明如何创建类级别的常量变量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token constant">MY_CONSTANT</span> <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">MY_OTHER_CONSTANT</span> <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以从任何_MyClass_类的实例或类外部使用_MyClass_类名访问_MY_CONSTANT_和_MY_OTHER_CONSTANT_变量。然而，我们不能重新赋值这两个变量。</p><h2 id="_4-何时使用-static-final" tabindex="-1"><a class="header-anchor" href="#_4-何时使用-static-final"><span><strong>4. 何时使用</strong> <em>static final</em></span></a></h2><p>我们应该使用_final stati_ c或_static fina_ l来声明我们想要保持不变的任何变量。这包括包含配置设置、数学常数或不应更改的其他值的变量。</p><p>使用_static fina_ l变量可以帮助提高我们代码的可读性和可维护性。它还有助于通过防止对重要变量的意外更改来防止错误。</p><p>我们应该如何使用_static final_的例子：</p><ul><li>声明配置设置，如数据库连接字符串或日志文件路径</li><li>声明数学常数，如π或e</li></ul><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span><strong>5. 结论</strong></span></a></h2><p>Java中的_final stati_ c和_static fina_ l关键字用于声明常量、类级别的变量。这对于防止对重要变量的意外更改和提高我们代码的可读性和可维护性非常有用。</p><p>在本文中，<strong>我们了解到_static_和_final_修饰符的顺序并不重要。然而，在实际应用中，建议使用_static final_的顺序</strong>。</p>`,21),l=[e];function c(_,p){return n(),t("div",null,l)}const f=a(i,[["render",c],["__file","2024-06-28-Difference Between  final static  and  static final .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Difference%20Between%20%20final%20static%20%20and%20%20static%20final%20.html","title":"Java中“final static”与“static final”的区别","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["final","static"],"head":[["meta",{"name":"keywords","content":"Java, static, final, constant, class-level, code consistency"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Difference%20Between%20%20final%20static%20%20and%20%20static%20final%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中“final static”与“static final”的区别"}],["meta",{"property":"og:description","content":"Java中“final static”与“static final”的区别 关键词_final_和_static_在Java中有不同的含义，但它们可以一起使用来声明一个常量变量。 在本教程中，我们将讨论_final static_和_static final_之间的区别。 2. final_和_static：简要概述 _final_关键字表示一个变量一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T03:51:15.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"final"}],["meta",{"property":"article:tag","content":"static"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T03:51:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中“final static”与“static final”的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T03:51:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中“final static”与“static final”的区别 关键词_final_和_static_在Java中有不同的含义，但它们可以一起使用来声明一个常量变量。 在本教程中，我们将讨论_final static_和_static final_之间的区别。 2. final_和_static：简要概述 _final_关键字表示一个变量一..."},"headers":[{"level":2,"title":"2. final_和_static：简要概述","slug":"_2-final-和-static-简要概述","link":"#_2-final-和-static-简要概述","children":[]},{"level":2,"title":"3. _static_和_final_的顺序","slug":"_3-static-和-final-的顺序","link":"#_3-static-和-final-的顺序","children":[]},{"level":2,"title":"4. 何时使用 static final","slug":"_4-何时使用-static-final","link":"#_4-何时使用-static-final","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719546675000,"updatedTime":1719546675000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.2,"words":659},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Difference Between  final static  and  static final .md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中“final static”与“static final”的区别</h1>\\n<p>关键词_final_和_static_在Java中有不同的含义，但它们可以一起使用来声明一个常量变量。</p>\\n<p>在本教程中，我们将讨论_final static_和_static final_之间的区别。</p>\\n<h2><strong>2. <em>final_和_static</em>：简要概述</strong></h2>\\n<p>_final_关键字表示一个变量一旦被初始化就不能重新赋值。这对于防止对重要变量的意外更改非常有用。</p>\\n<p>_static_关键字表示一个变量属于类本身，而不是类的任何特定实例。这意味着<strong>只有一个变量副本，由类的所有实例共享</strong>。</p>","autoDesc":true}');export{f as comp,d as data};
