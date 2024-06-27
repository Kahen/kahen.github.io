import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DRCKM-lz.js";const l={},b=t('<h1 id="如何将java编译为wasm-web-assembly-baeldung" tabindex="-1"><a class="header-anchor" href="#如何将java编译为wasm-web-assembly-baeldung"><span>如何将Java编译为WASM（Web Assembly） | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在快节奏的Web开发世界中，WASM（WebAssembly）的引入为开发者带来了新的可能性。它允许他们在Web平台上利用编译语言的速度和适应性。</p><p>在本教程中，我们将探讨将Java编译为WebAssembly的过程，并研究可用的工具和方法。</p><h2 id="_2-wasm-webassembly-是什么" tabindex="-1"><a class="header-anchor" href="#_2-wasm-webassembly-是什么"><span>2. WASM（WebAssembly）是什么</span></a></h2><p>WebAssembly是一种低级的二进制指令格式，可以在现代Web浏览器中运行。它允许开发者在Web浏览器中以接近原生速度运行用C、C++等语言编写的代码。WebAssembly旨在与JavaScript一起运行，允许两者协同工作。</p><p>WebAssembly不打算手写。相反，它被设计为源语言如C、C++和Rust的有效编译目标。我们可以将WebAssembly模块导入Web（或Node.js）应用程序，从而通过JavaScript使用其功能。</p><p>我们需要一个专门的编译器将源代码转换为WASM格式，以使用原生语言与WebAssembly。要在浏览器中执行该格式，我们必须使用JavaScript加载和初始化二进制文件。下图展示了从原生代码到WASM文件的路径：</p><p>JS作为WASM、HTML和CSS之间的中心接口，因为WASM目前缺乏对网页文档对象模型（DOM）的直接访问。WASM提供导入和导出以与JS交互。导出包括编译为WASM的源代码中的函数，JS可以访问并像JS函数一样执行。导入允许JS函数在WASM中被引用。</p><p>Java，作为最受欢迎的编程语言之一，也通过各种工具和框架进入了这个生态系统。现在，我们将看看将Java代码转换为WebAssembly的不同突出工具：</p><h3 id="_3-1-teavm" tabindex="-1"><a class="header-anchor" href="#_3-1-teavm"><span>3.1. TeaVM</span></a></h3><p>TeaVM是一个Java字节码的即时编译器（AOT），它生成JavaScript和在浏览器中运行的WebAssembly。源代码不需要是Java，因此TeaVM支持任何JVM语言，包括Kotlin和Scala。TeaVM生成更小的JavaScript，使其在浏览器中表现更好。</p><p>TeaVM优化器可以消除死代码并生成非常小的JavaScript。它重构方法的原始结构，生成几乎与我们手动编写的JavaScript相似的代码。它还支持线程并且非常快。</p><h3 id="_3-2-jwebassembly" tabindex="-1"><a class="header-anchor" href="#_3-2-jwebassembly"><span>3.2. JWebAssembly</span></a></h3><p>JWebAssembly专门将Java字节码编译为WebAssembly代码。它可以编译任何编译为Java字节码的语言，如Groovy、Kotlin和Scala。JWebAssembly利用LLVM工具链生成优化的WebAssembly输出。</p><p>它还支持诸如本地方法、异常处理和垃圾回收等功能。JWebAssembly优化器在转译后微调各个方法的WebAssembly输出。它确保在最终确定输出之前达到最佳性能。</p><h3 id="_3-3-cheerpj" tabindex="-1"><a class="header-anchor" href="#_3-3-cheerpj"><span>3.3. CheerpJ</span></a></h3><p>CheerpJ是一个基于WebAssembly的浏览器JVM。它可以在不需要Java安装的情况下从浏览器执行Java应用程序。</p><p>CheerpJ可以运行任何Java应用程序、小程序和库在现代浏览器上。CheerpJ支持100%的Java 8 SE运行时，以及原生反射和动态类创建。它还支持文件访问、网络、剪贴板、音频和打印。它还与Java Swing、Oracle Forms、EBS和其他第三方框架兼容。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们了解了WASM，并概述了用于将Java代码转换为WebAssembly的工具。</p><p>TeaVM非常适合编写针对浏览器的新Java应用程序，而JWebAssembly具有有限的运行时，适合从头开始编写新应用程序。CheerpJ不需要对应用程序的源代码进行任何更改；它旨在将现有的Java应用程序转换为HTML5。</p><p>选择Java作为WASM工具的选择取决于项目需求、性能考虑和开发者偏好。通过了解每个工具的功能和权衡，我们可以决定适当的框架。</p>',23),p=[b];function n(r,m){return s(),a("div",null,p)}const c=e(l,[["render",n],["__file","How to Compile Java to WASM  Web Assembly .html.vue"]]),W=JSON.parse('{"path":"/posts/baeldung/Archive/How%20to%20Compile%20Java%20to%20WASM%20%20Web%20Assembly%20.html","title":"如何将Java编译为WASM（Web Assembly） | Baeldung","lang":"zh-CN","frontmatter":{"date":"2023-09-01T00:00:00.000Z","category":["Web Development"],"tag":["WebAssembly","Java"],"description":"如何将Java编译为WASM（Web Assembly） | Baeldung 1. 概述 在快节奏的Web开发世界中，WASM（WebAssembly）的引入为开发者带来了新的可能性。它允许他们在Web平台上利用编译语言的速度和适应性。 在本教程中，我们将探讨将Java编译为WebAssembly的过程，并研究可用的工具和方法。 2. WASM（We...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/How%20to%20Compile%20Java%20to%20WASM%20%20Web%20Assembly%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何将Java编译为WASM（Web Assembly） | Baeldung"}],["meta",{"property":"og:description","content":"如何将Java编译为WASM（Web Assembly） | Baeldung 1. 概述 在快节奏的Web开发世界中，WASM（WebAssembly）的引入为开发者带来了新的可能性。它允许他们在Web平台上利用编译语言的速度和适应性。 在本教程中，我们将探讨将Java编译为WebAssembly的过程，并研究可用的工具和方法。 2. WASM（We..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"WebAssembly"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2023-09-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何将Java编译为WASM（Web Assembly） | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-09-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. WASM（WebAssembly）是什么","slug":"_2-wasm-webassembly-是什么","link":"#_2-wasm-webassembly-是什么","children":[{"level":3,"title":"3.1. TeaVM","slug":"_3-1-teavm","link":"#_3-1-teavm","children":[]},{"level":3,"title":"3.2. JWebAssembly","slug":"_3-2-jwebassembly","link":"#_3-2-jwebassembly","children":[]},{"level":3,"title":"3.3. CheerpJ","slug":"_3-3-cheerpj","link":"#_3-3-cheerpj","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.29,"words":988},"filePathRelative":"posts/baeldung/Archive/How to Compile Java to WASM  Web Assembly .md","localizedDate":"2023年9月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在快节奏的Web开发世界中，WASM（WebAssembly）的引入为开发者带来了新的可能性。它允许他们在Web平台上利用编译语言的速度和适应性。</p>\\n<p>在本教程中，我们将探讨将Java编译为WebAssembly的过程，并研究可用的工具和方法。</p>\\n<h2>2. WASM（WebAssembly）是什么</h2>\\n<p>WebAssembly是一种低级的二进制指令格式，可以在现代Web浏览器中运行。它允许开发者在Web浏览器中以接近原生速度运行用C、C++等语言编写的代码。WebAssembly旨在与JavaScript一起运行，允许两者协同工作。</p>","autoDesc":true}');export{c as comp,W as data};
