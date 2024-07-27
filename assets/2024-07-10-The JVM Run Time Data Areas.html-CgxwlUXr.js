import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-CJGTm_7y.js";const r={},p=n('<h1 id="java虚拟机-jvm-运行时数据区" tabindex="-1"><a class="header-anchor" href="#java虚拟机-jvm-运行时数据区"><span>Java虚拟机(JVM)运行时数据区</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><strong>Java虚拟机(JVM)是一种抽象的计算机，它使计算机能够运行Java程序。</strong> JVM负责执行编译后的Java代码中的指令。为了这样做，它需要一定量的内存来存储其操作所需的数据和指令。这些内存被划分为不同的区域。</p><p>在本教程中，我们将讨论不同类型的运行时数据区及其用途。每个JVM实现都必须遵循这里解释的规范。</p><p>JVM有几个所有在JVM中运行的线程共享的数据区域。<strong>因此，不同的线程可以同时访问这些区域中的任何一个。</strong></p><h3 id="_2-1-堆" tabindex="-1"><a class="header-anchor" href="#_2-1-堆"><span>2.1. 堆</span></a></h3><p><strong>堆是运行时数据区，存储所有的Java对象。</strong> 因此，每当我们创建一个新的类实例或数组时，JVM会在堆中找到一些可用的内存，并将其分配给对象。堆的创建发生在JVM启动时，其销毁发生在退出时。</p><p>根据规范，必须由自动管理工具处理对象的存储：这个工具被称为垃圾收集器。</p><p>JVM规范中没有对堆大小的限制。内存处理也留给了JVM实现。然而，如果垃圾收集器无法回收足够的空间来创建一个新对象，JVM将抛出_OutOfMemory_错误。</p><h3 id="_2-2-方法区" tabindex="-1"><a class="header-anchor" href="#_2-2-方法区"><span>2.2. 方法区</span></a></h3><p><strong>方法区是JVM中的共享数据区，存储类和接口的定义。</strong> 它在JVM启动时创建，只有在JVM退出时才会销毁。</p><p>具体来说，类加载器加载类的字节码并将其传递给JVM。然后，JVM创建类的内部表示，该表示用于在运行时创建对象和调用方法。这个内部表示收集了有关类和接口的字段、方法和构造函数的信息。</p><p>另外，让我们指出，方法区是一个逻辑概念。因此，它可能是具体JVM实现中堆的一部分。</p><p>再次，JVM规范没有定义方法区的大小，也没有定义JVM处理内存块的方式。</p><p>如果方法区的可用空间不足以加载一个新类，JVM将抛出_OutOfMemory_错误。</p><h3 id="_2-3-运行时常量池" tabindex="-1"><a class="header-anchor" href="#_2-3-运行时常量池"><span>2.3. 运行时常量池</span></a></h3><p><strong>运行时常量池是方法区内的一个区域，包含对类和接口名称、字段名称以及方法名称的符号引用。</strong></p><p>JVM利用在方法区创建类或接口的表示的同时，为这个类创建运行时常量池。</p><p>在创建运行时常量池时，如果JVM需要的内存超过了方法区中可用的内存，将抛出_OutOfMemory_错误。</p><h2 id="_3-每个线程的数据区" tabindex="-1"><a class="header-anchor" href="#_3-每个线程的数据区"><span>3. 每个线程的数据区</span></a></h2><p>除了共享的运行时数据区外，JVM还使用每个线程的数据区来存储每个线程特定的数据。<strong>JVM确实支持同时执行多个线程。</strong></p><h3 id="_3-1-pc寄存器" tabindex="-1"><a class="header-anchor" href="#_3-1-pc寄存器"><span>3.1. PC寄存器</span></a></h3><p>每个JVM线程都有自己的PC（程序计数器）寄存器。每个线程在任何给定时间执行单个方法的代码。PC的行为取决于方法的性质：</p><ul><li><strong>对于非本地方法，PC寄存器存储当前正在执行的指令的地址</strong></li><li>对于本地方法，PC寄存器的值是未定义的</li></ul><p>最后，让我们注意到，PC寄存器的生命周期与其底层线程的生命周期相同。</p><h3 id="_3-2-jvm栈" tabindex="-1"><a class="header-anchor" href="#_3-2-jvm栈"><span>3.2. JVM栈</span></a></h3><p>同样，每个JVM线程都有自己的私有栈。JVM栈是一种数据结构，用于存储方法调用信息。<strong>每个方法调用都会在栈上触发一个新的栈帧的创建，以存储方法的局部变量和返回地址。</strong> 这些栈帧可以存储在堆中。</p><p>由于JVM栈，JVM可以跟踪程序的执行，并按需记录堆栈跟踪。</p><p>再次，JVM规范让JVM实现决定它们如何处理JVM栈的大小和内存分配。</p><p>JVM栈上的内存分配错误会导致_StackOverflow_错误。然而，如果JVM实现允许动态扩展其JVM栈的大小，并且在扩展期间发生内存错误，JVM必须抛出_OutOfMemory_错误。</p><h3 id="_3-3-本地方法栈" tabindex="-1"><a class="header-anchor" href="#_3-3-本地方法栈"><span>3.3. 本地方法栈</span></a></h3><p>本地方法是用Java以外的其他编程语言编写的方法。这些方法没有被编译成字节码，因此需要一个不同的内存区域。</p><p><strong>本地方法栈与JVM栈非常相似，但仅用于本地方法。</strong></p><p>本地方法栈的目的是跟踪本地方法的执行。</p><p>JVM实现可以自行决定本地方法栈的大小以及它如何处理内存块。</p><p>与JVM栈一样，本地方法栈上的内存分配错误会导致_StackOverflow_错误。另一方面，增加本地方法栈大小的尝试失败会导致_OutOfMemory_错误。</p><p>最后，让我们注意到，规范强调JVM实现可以决定不支持本地方法调用：这样的实现不需要实现本地方法栈。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本教程中，我们详细讨论了不同类型的运行时数据区及其用途。这些区域对于JVM的正常运行至关重要。理解它们可以帮助优化Java应用程序的性能。</p>',39),s=[p];function o(l,i){return t(),a("div",null,s)}const c=e(r,[["render",o],["__file","2024-07-10-The JVM Run Time Data Areas.html.vue"]]),M=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-The%20JVM%20Run%20Time%20Data%20Areas.html","title":"Java虚拟机(JVM)运行时数据区","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JVM"],"tag":["JVM","运行时数据区"],"head":[["meta",{"name":"keywords","content":"Java虚拟机, 运行时数据区, JVM内存管理"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-The%20JVM%20Run%20Time%20Data%20Areas.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java虚拟机(JVM)运行时数据区"}],["meta",{"property":"og:description","content":"Java虚拟机(JVM)运行时数据区 1. 概述 Java虚拟机(JVM)是一种抽象的计算机，它使计算机能够运行Java程序。 JVM负责执行编译后的Java代码中的指令。为了这样做，它需要一定量的内存来存储其操作所需的数据和指令。这些内存被划分为不同的区域。 在本教程中，我们将讨论不同类型的运行时数据区及其用途。每个JVM实现都必须遵循这里解释的规范..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T10:01:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JVM"}],["meta",{"property":"article:tag","content":"运行时数据区"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T10:01:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java虚拟机(JVM)运行时数据区\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T10:01:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java虚拟机(JVM)运行时数据区 1. 概述 Java虚拟机(JVM)是一种抽象的计算机，它使计算机能够运行Java程序。 JVM负责执行编译后的Java代码中的指令。为了这样做，它需要一定量的内存来存储其操作所需的数据和指令。这些内存被划分为不同的区域。 在本教程中，我们将讨论不同类型的运行时数据区及其用途。每个JVM实现都必须遵循这里解释的规范..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[{"level":3,"title":"2.1. 堆","slug":"_2-1-堆","link":"#_2-1-堆","children":[]},{"level":3,"title":"2.2. 方法区","slug":"_2-2-方法区","link":"#_2-2-方法区","children":[]},{"level":3,"title":"2.3. 运行时常量池","slug":"_2-3-运行时常量池","link":"#_2-3-运行时常量池","children":[]}]},{"level":2,"title":"3. 每个线程的数据区","slug":"_3-每个线程的数据区","link":"#_3-每个线程的数据区","children":[{"level":3,"title":"3.1. PC寄存器","slug":"_3-1-pc寄存器","link":"#_3-1-pc寄存器","children":[]},{"level":3,"title":"3.2. JVM栈","slug":"_3-2-jvm栈","link":"#_3-2-jvm栈","children":[]},{"level":3,"title":"3.3. 本地方法栈","slug":"_3-3-本地方法栈","link":"#_3-3-本地方法栈","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720605684000,"updatedTime":1720605684000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.54,"words":1362},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-The JVM Run Time Data Areas.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p><strong>Java虚拟机(JVM)是一种抽象的计算机，它使计算机能够运行Java程序。</strong> JVM负责执行编译后的Java代码中的指令。为了这样做，它需要一定量的内存来存储其操作所需的数据和指令。这些内存被划分为不同的区域。</p>\\n<p>在本教程中，我们将讨论不同类型的运行时数据区及其用途。每个JVM实现都必须遵循这里解释的规范。</p>\\n<p>JVM有几个所有在JVM中运行的线程共享的数据区域。<strong>因此，不同的线程可以同时访问这些区域中的任何一个。</strong></p>\\n<h3>2.1. 堆</h3>\\n<p><strong>堆是运行时数据区，存储所有的Java对象。</strong> 因此，每当我们创建一个新的类实例或数组时，JVM会在堆中找到一些可用的内存，并将其分配给对象。堆的创建发生在JVM启动时，其销毁发生在退出时。</p>","autoDesc":true}');export{c as comp,M as data};
