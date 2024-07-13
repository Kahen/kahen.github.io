import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-BDZ-trJf.js";const p={},i=n('<h1 id="java中的流水线设计模式-baeldung" tabindex="-1"><a class="header-anchor" href="#java中的流水线设计模式-baeldung"><span>Java中的流水线设计模式 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将回顾一个有趣的模式，它不是经典GoF模式的一部分——流水线模式。</p><p>它功能强大，可以帮助解决棘手的问题并改善应用程序的设计。此外，Java还有一些内置的解决方案来帮助实现这种模式；我们将在最后讨论它们。</p><p>通常，流水线模式与责任链模式进行比较。流水线在很多方面与装饰者模式也有共同之处。在某些方面，它比责任链更接近装饰者。让我们回顾一下这些模式之间的相似之处和不同之处。</p><h3 id="_2-1-责任链" tabindex="-1"><a class="header-anchor" href="#_2-1-责任链"><span>2.1. 责任链</span></a></h3><p><strong>由于两种模式都明确声明了逐步过程，因此经常将流水线与责任链进行比较。</strong> 流水线和责任链之间的第一个区别是，后者通常没有从其_handleRequest()_方法返回值：</p><p>不过，没有什么能阻止我们从_handleRequest()_方法返回值。在这种情况下，它将被定义为_Handler_接口的一部分。</p><h3 id="_2-2-装饰者" tabindex="-1"><a class="header-anchor" href="#_2-2-装饰者"><span>2.2. 装饰者</span></a></h3><p>装饰者模式一开始并不直接与流水线模式相似，因为它没有明确其链式结构。<strong>然而，通过其委托和递归嵌套，行为与责任链或流水线非常相似：</strong></p><p>在经典的（GoF）实现中，这种模式添加了行为，并且没有为操作返回任何值。然而，这是一个合理的选择，以改变对象的状态或使用不同的组件处理数据。<strong>通常，改变状态的解决方案可能过于复杂，因为我们可以用更直接的结构来实现结果。</strong> 同时，装饰者提供了管理临时依赖项并保持执行顺序的功能。</p><p>流水线模式背后的主要思想是创建一组操作（流水线）并传递数据。尽管责任链和装饰者可以部分处理这项任务。<strong>流水线的主要优势在于它对其结果类型的灵活性。</strong></p><p>责任链和装饰者分别只返回在Handler和Component接口中定义的类型。另一方面，流水线可以处理任何类型的输入和输出。这种模式的灵活性是其主要特点。</p><h3 id="_3-1-不可变流水线" tabindex="-1"><a class="header-anchor" href="#_3-1-不可变流水线"><span>3.1. 不可变流水线</span></a></h3><p>让我们为不可变流水线创建一个简单的示例。我们将从_Pipe_接口开始：</p><p>这是一个非常简单的接口，只有一个方法，它接受输入并产生输出。<strong>该接口是参数化的，我们可以在其中提供任何实现。</strong> 另外请注意，文章中的例子将偏离官方的类型参数命名约定。这是为了更好地区分方法级别和类级别的参数。现在让我们创建一个类，它将在流水线中保存管道：</p><p>构造函数和静态工厂非常简单，所以让我们集中讨论_withNextPipe_方法：</p><p>由于我们需要一定程度的类型安全性，不允许添加会导致流水线失败的管道，我们需要存储有关当前输入和输出类型的信息。<strong>这些信息存储在_Pipeline_对象中。然而，在添加新的_Pipe_时，我们需要更新这些信息，我们不能在同一个对象上完成。</strong> 这就是为什么决定使_Pipeline_不可变，并添加一个新的_Pipe_将产生一个新的单独的_Pipeline_。</p><p>_Pipeline_的处理部分相当简单：</p><p>然而，在这个案例中，我们需要使用原始类型。我们确保管道被正确传递，所以应该没有问题。最终，我们必须将结果转换为预期的类型。</p><h3 id="_3-2-简单的管道" tabindex="-1"><a class="header-anchor" href="#_3-2-简单的管道"><span>3.2. 简单的管道</span></a></h3><p>我们可以简化上面的例子，完全摆脱_Pipeline_类：</p><p>这个实现更接近之前讨论的模式（装饰者和责任链），因为它有一个递归结构，从一个管道委托到另一个管道。<strong>然而，所有的管道都隐藏在这个方法调用中，所以获取整个流水线是困难的。</strong> 同时，这个解决方案与之前的_Pipeline_实现相比，简单且灵活。</p><h3 id="_3-3-函数式解决方案" tabindex="-1"><a class="header-anchor" href="#_3-3-函数式解决方案"><span>3.3. 函数式解决方案</span></a></h3><p>我们可以迭代之前的解决方案，并使用纯Java进行改进。让我们再次看看_Pipe_接口：</p><p>这是一个带有默认方法的函数接口。我们可以用已经存在的_Function_接口来替换它：</p><p><em>Function_接口还包含一些有用的方法，其中之一是_andThen</em>：</p><p>我们可以用它来代替我们之前的_add_方法。此外，_Function_接口提供了一种将函数添加到我们流水线开头的方法：</p><p>通过使用_Function_，我们可以创建非常灵活且易于使用的流水线：</p><p>流水线直接接受参数，使这种方法非常干净。作为额外的好处，我们可以用_BiFunctions_扩展我们的流水线：</p><p>因为_andThen_方法接受_Function，所以我们必须使用柯里化将_mul_ BiFunction 转换为函数。尽管我们在函数内部而不是在调用流水线时提供参数，但这个解决方案仍然简单明了。流API中也使用了相同的方法，流中的操作序列被称为流水线。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们讨论了流水线模式作为一种强大的工具，虽然它不流行，也没有包括在经典（GoF）已知模式列表中。</p><p><strong>我们可以通过多种方式实现这种模式，而且Java还提供了一个极好的选项来利用它通过Stream API。</strong> 在大多数情况下，Java提供的解决方案已经足够。在特定流水线的情况下，可以从零开始实现它们。</p><p>这种模式的主要好处是它允许简化逻辑，使代码更加易于维护，同时保持简洁和清晰。这个例子的完整源码可以在GitHub上找到。</p><p>OK</p>',36),r=[i];function o(l,s){return t(),a("div",null,r)}const c=e(p,[["render",o],["__file","2024-07-08-Pipeline Design Pattern in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Pipeline%20Design%20Pattern%20in%20Java.html","title":"Java中的流水线设计模式 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2023-03-01T00:00:00.000Z","category":["Java","设计模式"],"tag":["Pipeline","设计模式"],"head":[["meta",{"name":"keywords","content":"Java, 设计模式, Pipeline"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Pipeline%20Design%20Pattern%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的流水线设计模式 | Baeldung"}],["meta",{"property":"og:description","content":"Java中的流水线设计模式 | Baeldung 1. 概述 在本教程中，我们将回顾一个有趣的模式，它不是经典GoF模式的一部分——流水线模式。 它功能强大，可以帮助解决棘手的问题并改善应用程序的设计。此外，Java还有一些内置的解决方案来帮助实现这种模式；我们将在最后讨论它们。 通常，流水线模式与责任链模式进行比较。流水线在很多方面与装饰者模式也有共..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T16:42:00.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Pipeline"}],["meta",{"property":"article:tag","content":"设计模式"}],["meta",{"property":"article:published_time","content":"2023-03-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T16:42:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的流水线设计模式 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T16:42:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的流水线设计模式 | Baeldung 1. 概述 在本教程中，我们将回顾一个有趣的模式，它不是经典GoF模式的一部分——流水线模式。 它功能强大，可以帮助解决棘手的问题并改善应用程序的设计。此外，Java还有一些内置的解决方案来帮助实现这种模式；我们将在最后讨论它们。 通常，流水线模式与责任链模式进行比较。流水线在很多方面与装饰者模式也有共..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[{"level":3,"title":"2.1. 责任链","slug":"_2-1-责任链","link":"#_2-1-责任链","children":[]},{"level":3,"title":"2.2. 装饰者","slug":"_2-2-装饰者","link":"#_2-2-装饰者","children":[]},{"level":3,"title":"3.1. 不可变流水线","slug":"_3-1-不可变流水线","link":"#_3-1-不可变流水线","children":[]},{"level":3,"title":"3.2. 简单的管道","slug":"_3-2-简单的管道","link":"#_3-2-简单的管道","children":[]},{"level":3,"title":"3.3. 函数式解决方案","slug":"_3-3-函数式解决方案","link":"#_3-3-函数式解决方案","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720456920000,"updatedTime":1720456920000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.23,"words":1570},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Pipeline Design Pattern in Java.md","localizedDate":"2023年3月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将回顾一个有趣的模式，它不是经典GoF模式的一部分——流水线模式。</p>\\n<p>它功能强大，可以帮助解决棘手的问题并改善应用程序的设计。此外，Java还有一些内置的解决方案来帮助实现这种模式；我们将在最后讨论它们。</p>\\n<p>通常，流水线模式与责任链模式进行比较。流水线在很多方面与装饰者模式也有共同之处。在某些方面，它比责任链更接近装饰者。让我们回顾一下这些模式之间的相似之处和不同之处。</p>\\n<h3>2.1. 责任链</h3>\\n<p><strong>由于两种模式都明确声明了逐步过程，因此经常将流水线与责任链进行比较。</strong> 流水线和责任链之间的第一个区别是，后者通常没有从其_handleRequest()_方法返回值：</p>","autoDesc":true}');export{c as comp,d as data};
